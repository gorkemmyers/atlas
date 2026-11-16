/* app.js — kabuk: üst bölge sekmeleri, bölgenin çalışma alanı çubuğu, yönlendirme, tema, yazı tipi.
   Adresler: #ana (ana sayfa) · #<bölge> (genel bakış) · #<bölge>-<alan> (ör. #vietnam-pratik). Bölgeler regions.js'te. */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, Store = g.Store, R = g.Regions, h = U.h;

  var app = {
    launch: null,      // bir ekrandan ötekine hazır ayar taşır; açılan ekran okuyup siler
    current: null,     // açık çalışma alanının kimliği ('pratik', 'alfabe'…) · ana sayfada 'ana'
    region: null,      // açık bölge kaydı (ana sayfada null)
    section: null,
    inst: null,
    sheet: null,
    mode: 'wide',      // 'sheet' (telefon dikey) · 'rail' (telefon yan) · 'wide' (geniş ekran)
    /* her ekran: harita sahnesi + panel. Dar dikey ekranda panel haritanın üstündeki alt panel olur. */
    layout: function (root, o) {
      var stage = h('section', { 'class': 'stage', 'aria-label': 'Harita' });
      var panel = h('aside', { 'class': 'panel' + (o && o.wide ? ' panel-wide' : '') });
      var lay = h('div', { 'class': 'layout' + (o && o.wide ? ' layout-wide' : '') }, stage, panel);
      root.appendChild(lay);
      var sheet = new g.Sheet(lay, panel);
      app.sheet = sheet;
      var foot = null;
      return {
        stage: stage, panel: panel, sheet: sheet,
        bind: function (map) { sheet.bind(map); },
        /* sabit alt şerit: İpucu, Sonraki gibi her an erişilecek eylemler · boş verilirse gizlenir */
        foot: function (nodes) {
          if (!foot) { foot = h('div', { 'class': 'p-foot', hidden: true }); panel.appendChild(foot); }
          U.clear(foot);
          var list = (nodes || []).filter(Boolean);
          list.forEach(function (n) { foot.appendChild(n); });
          foot.hidden = !list.length;
          panel.classList.toggle('has-foot', list.length > 0);
          sheet.watch();
          return foot;
        }
      };
    },
    /* açık bölgedeki çalışma alanının adresi (bölge verilirse onunki): href: app.href('pratik') */
    href: function (sid, rid) {
      rid = rid || (app.region && app.region.id);
      return '#' + (rid ? R.hash(rid, sid) : 'ana');
    },
    /* go('pratik') açık bölgede alan açar · go('pratik', 'vietnam') bölgeyi de verir · go('ana') ana sayfa */
    go: function (id, rid) {
      var hsh;
      if (id === 'ana') hsh = 'ana';
      else if (rid) hsh = R.hash(rid, id);
      else if (app.region && R.section(app.region, id)) hsh = R.hash(app.region.id, id);
      else { var p = R.parse(id); hsh = p ? p.canon : 'ana'; }
      if (location.hash.slice(1) === hsh) route(); else location.hash = '#' + hsh;
    }
  };

  /* ---- ekran kipi: telefon dikey / telefon yan / geniş ---- */
  var mqSmall = null, mqRail = null;
  function computeMode() {
    if (mqRail && mqRail.matches) return 'rail';
    if (mqSmall && mqSmall.matches) return 'sheet';
    return 'wide';
  }
  function applyMode() {
    var m = computeMode();
    if (m === app.mode && document.documentElement.getAttribute('data-mode')) return;
    app.mode = m;
    document.documentElement.setAttribute('data-mode', m);
    try { g.dispatchEvent(new Event('vnmode')); } catch (e) { /* eski tarayıcı */ }
  }
  function initMode() {
    try {
      mqSmall = g.matchMedia('(max-width: 860px)');
      mqRail = g.matchMedia('(max-height: 500px) and (min-width: 561px)');
      [mqSmall, mqRail].forEach(function (m) {
        if (m.addEventListener) m.addEventListener('change', applyMode); else if (m.addListener) m.addListener(applyMode);
      });
    } catch (e) { /* matchMedia yok: geniş kip */ }
    app.mode = '';
    applyMode();
  }

  var appEl, brandEl, viewEl, regionsEl, switchBtn, quickWrap, tabsEl, themeBtn, pickEl = null, mounted = null, builtFor = undefined;

  /* ---- bölge sekmeleri ve ölçeklenebilir seçici ---- */
  function badge(r) { return h('i', { 'class': 'rbadge tone-' + r.tone }, r.code); }
  function regionHaystack(r) {
    return U.fold([r.name, r.short, r.code, r.area, r.line, r.blurb]
      .concat((r.sections || []).map(function (s) { return s.label + ' ' + (s.desc || ''); })).join(' '));
  }
  function orderedOthers(curRegion) {
    var rec = Array.isArray(Store.data.set.recent) ? Store.data.set.recent : [];
    var seen = {}, out = [];
    if (curRegion) seen[curRegion.id] = 1;
    rec.forEach(function (id) {
      var r = R.byId[id];
      if (r && !seen[r.id]) { seen[r.id] = 1; out.push(r); }
    });
    R.list.forEach(function (r) {
      if (!seen[r.id]) { seen[r.id] = 1; out.push(r); }
    });
    return out;
  }
  function buildRegions() {
    switchBtn = h('button', {
      type: 'button', 'class': 'rswitch', id: 'region-pick',
      'aria-haspopup': 'dialog', 'aria-label': 'Bölge seç veya değiştir',
      onclick: function () { openPicker(); }
    });
    quickWrap = h('div', { 'class': 'rquick', 'aria-label': 'Hızlı geçiş' });
    regionsEl = h('nav', { 'class': 'regions', 'aria-label': 'Bölge geçişi' }, switchBtn, quickWrap);
    watchStrip(quickWrap);
    return regionsEl;
  }
  function paintSwitch(region) {
    U.clear(switchBtn);
    switchBtn.className = 'rswitch' + (region ? ' on tone-' + region.tone : '');
    if (region) {
      switchBtn.appendChild(badge(region));
      switchBtn.appendChild(h('span', { 'class': 'rswitch-txt' }, region.short));
      switchBtn.title = region.name + ' · başka bölge seç';
    } else {
      switchBtn.appendChild(h('span', { 'class': 'rbadge rbadge-home', 'aria-hidden': 'true' }, UI.icon('compass', 15)));
      switchBtn.appendChild(h('span', { 'class': 'rswitch-txt' }, 'Bölgeler (' + R.list.length + ')'));
      switchBtn.title = 'Tüm bölgeler ve arama';
    }
    switchBtn.appendChild(UI.icon('chevd', 14));
  }
  function paintQuick(region) {
    U.clear(quickWrap);
    var list = orderedOthers(region);
    var maxQuick = R.list.length <= 5 ? list.length : 4;
    list.slice(0, maxQuick).forEach(function (r) {
      quickWrap.appendChild(h('a', { 'class': 'rtab tone-' + r.tone, href: '#' + r.id, 'data-id': r.id, title: r.name },
        h('i', { 'class': 'rdot', 'aria-hidden': 'true' }), h('span', { 'class': 'rname' }, r.short)));
    });
    if (list.length > maxQuick) {
      quickWrap.appendChild(h('button', { type: 'button', 'class': 'rtab rtab-more', onclick: function () { openPicker({ focusSearch: true }); } },
        '+' + (list.length - maxQuick) + ' diğer'));
    }
  }
  /* kaydırılabilir şerit: kırpılan kenarda solma + etkin sekmeyi görünür tut (UI.seg ile aynı mantık) */
  function watchStrip(el) {
    function fade() {
      var max = el.scrollWidth - el.clientWidth, x = el.scrollLeft, l = x > 4, r = x < max - 4;
      el.setAttribute('data-fade', max <= 1 ? '' : (l && r ? 'lr' : l ? 'l' : r ? 'r' : ''));
    }
    el.addEventListener('scroll', fade, { passive: true });
    if (g.ResizeObserver) new g.ResizeObserver(function () { fade(); revealOn(el); }).observe(el);
    else g.requestAnimationFrame(function () { fade(); revealOn(el); });
  }
  function revealOn(el) {
    var on = el.querySelector('.rtab.on, .tab.on');
    if (!on || el.scrollWidth <= el.clientWidth + 1) return;
    var er = el.getBoundingClientRect(), br = on.getBoundingClientRect();
    if (!er.width) return;
    var pad = 30, dl = br.left - pad - er.left, dr = br.right + pad - er.right, dx = dl < 0 ? dl : (dr > 0 ? dr : 0);
    if (!dx) return;
    var to = Math.max(0, el.scrollLeft + dx);
    if (el.scrollTo) el.scrollTo({ left: to, behavior: U.reducedMotion() ? 'auto' : 'smooth' }); else el.scrollLeft = to;
  }

  /* ---- aramalı bölge seçici penceresi ---- */
  function closePicker() {
    if (!pickEl) return;
    document.removeEventListener('keydown', pickKey, true);
    if (pickEl.parentNode) pickEl.parentNode.removeChild(pickEl);
    pickEl = null;
    if (switchBtn && switchBtn.offsetParent) { try { switchBtn.focus({ preventScroll: true }); } catch (e) { /* yok say */ } }
  }
  function pickKey(e) { if (e.key === 'Escape') { e.stopPropagation(); closePicker(); } }
  function openPicker(opts) {
    opts = opts || {};
    closePicker();
    var cur = app.region ? app.region.id : 'ana';
    var areas = R.groups();
    var activeArea = 'all';
    var searchIn = h('input', {
      type: 'search', id: 'pk-search', 'class': 'input',
      placeholder: 'Ülke, kod veya konu ara…', autocomplete: 'off', spellcheck: 'false',
      'aria-label': 'Bölge ara'
    });
    var listEl = h('div', { 'class': 'pk-list', id: 'pk-list' });
    var areaBar = null;
    if (areas.length > 1) {
      areaBar = h('div', { 'class': 'pk-areas' },
        [h('button', { type: 'button', 'class': 'chip on', 'data-area': 'all', onclick: function () { setArea('all'); } }, 'Tümü')].concat(
          areas.map(function (gr) {
            return h('button', { type: 'button', 'class': 'chip', 'data-area': gr.area, onclick: function () { setArea(gr.area); } }, gr.area);
          })));
    }
    function setArea(a) {
      activeArea = a;
      if (areaBar) U.$$('.chip', areaBar).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-area') === a); });
      renderList();
    }
    function row(href, id, lead, name, sub, extra) {
      return h('a', { 'class': 'pk-row' + (id === cur ? ' on' : ''), href: href, 'aria-current': id === cur ? 'page' : null, onclick: closePicker },
        lead,
        h('span', { 'class': 'pk-t' }, h('b', {}, name), sub ? h('small', {}, sub) : null),
        extra ? h('span', { 'class': 'pk-meta' }, extra) : null);
    }
    var firstMatchHref = null;
    function renderList() {
      U.clear(listEl);
      var q = U.fold(searchIn.value.trim());
      firstMatchHref = null;
      if (!q && activeArea === 'all') {
        listEl.appendChild(row('#ana', 'ana', h('i', { 'class': 'rbadge rbadge-home' }, UI.icon('home', 16)), 'Ana sayfa', 'Tüm bölgeler ve özet'));
      }
      var shown = 0;
      areas.forEach(function (gr) {
        if (activeArea !== 'all' && gr.area !== activeArea) return;
        var hits = gr.regions.filter(function (r) { return !q || regionHaystack(r).indexOf(q) >= 0; });
        if (!hits.length) return;
        if (areas.length > 1 || q) listEl.appendChild(h('div', { 'class': 'pk-sec' }, gr.area));
        hits.forEach(function (r) {
          shown++;
          if (!firstMatchHref) firstMatchHref = '#' + r.id;
          var pr = R.progress(r);
          var pct = pr.seen ? Math.round(pr.mean * 100) + '%' : null;
          listEl.appendChild(row('#' + r.id, r.id, badge(r), r.name, r.line, pct));
        });
      });
      if (!shown) listEl.appendChild(h('p', { 'class': 'micro pk-empty' }, 'Eşleşen bölge bulunamadı.'));
    }
    searchIn.addEventListener('input', renderList);
    searchIn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && firstMatchHref) { e.preventDefault(); closePicker(); location.hash = firstMatchHref; }
    });
    renderList();

    var card = h('div', { 'class': 'picker', id: 'picker-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Bölge seç' },
      h('div', { 'class': 'pk-head' },
        h('h3', {}, 'Bölgeler', h('small', {}, ' · ' + R.list.length)),
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Kapat', onclick: closePicker }, UI.icon('x', 18))),
      h('div', { 'class': 'search' }, UI.icon('search', 18), searchIn),
      areaBar,
      listEl);
    pickEl = h('div', { 'class': 'modal-back picker-back', onmousedown: function (e) { if (e.target === pickEl) closePicker(); } }, card);
    document.body.appendChild(pickEl);
    document.addEventListener('keydown', pickKey, true);
    if (opts.focusSearch || (app.mode === 'wide' && R.list.length > 3)) searchIn.focus();
    else {
      var on = U.$('.pk-row.on', card) || U.$('.pk-row', card);
      if (on) on.focus();
    }
  }

  /* ---- bölgenin çalışma alanları ---- */
  function buildSections(region) {
    builtFor = region ? region.id : null;
    U.clear(tabsEl);
    if (!region) return;
    var vis = R.tabs(region);
    tabsEl.style.setProperty('--n', vis.length);
    tabsEl.setAttribute('aria-label', region.name + ' çalışma alanları');
    var prevGroup = null;
    vis.forEach(function (sx) {
      var gstart = prevGroup && sx.group && sx.group !== prevGroup && sx.group !== 'discover';
      prevGroup = sx.group || prevGroup;
      tabsEl.appendChild(h('a', {
        'class': 'tab' + (gstart ? ' tab-sep' : ''),
        href: '#' + R.hash(region.id, sx.id),
        'data-id': sx.id,
        'data-group': sx.group || ''
      }, UI.icon(sx.icon, 20), h('span', {}, sx.label)));
    });
  }
  /* gizli alan (varsa) açıkken alt çubukta parlayan sekme: nereden geldiysen o konu, yoksa Genel */
  function homeTab(region, sec, from) {
    if (!sec) return null;
    if (!sec.hidden) return sec.id;
    var f = from && R.section(region, from);
    return f && !f.hidden ? f.id : (sec.parent || 'genel');
  }
  function paintNav(region, sec, from) {
    if (brandEl) {
      brandEl.classList.toggle('on', !region);
      if (!region) brandEl.setAttribute('aria-current', 'page'); else brandEl.removeAttribute('aria-current');
    }
    paintSwitch(region);
    paintQuick(region);
    if (builtFor !== (region ? region.id : null)) buildSections(region);
    var act = region ? homeTab(region, sec, from) : null;
    U.$$('.tab', tabsEl).forEach(function (b) {
      var on = !!act && b.getAttribute('data-id') === act;
      b.classList.toggle('on', on);
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    tabsEl.classList.toggle('is-empty', !region);
    appEl.classList.toggle('no-subnav', !region);
    revealOn(quickWrap);
    revealOn(tabsEl);
  }

  /* “Kaldığın yerden devam et” ve hızlı bölge sırası için son gezilenleri hatırla */
  function remember(region, sec) {
    if (!region) return;
    var rec = Array.isArray(Store.data.set.recent) ? Store.data.set.recent.filter(function (x) { return x !== region.id; }) : [];
    rec.unshift(region.id);
    if (rec.length > 8) rec.length = 8;
    Store.data.set.recent = rec;
    if (sec && sec.id !== 'genel') Store.data.set.last = { r: region.id, s: sec.id };
    Store.save();
  }

  function route() {
    var raw = location.hash.replace(/^#/, '');
    var p = R.parse(raw), hub = !p || p.hub;
    var region = hub ? null : p.region, sec = hub ? null : p.section;
    /* eski adresleri (#rehber) yeni adrese çevir: geri tuşu bozulmaz, hashchange tetiklenmez */
    if (!hub && p.canon !== raw) { try { history.replaceState(null, '', '#' + p.canon); } catch (e) { /* kısıtlı çerçeve */ } }
    closePicker();
    if (mounted) { try { mounted.destroy(); } catch (e) { /* yok say */ } mounted = null; }
    if (app.sheet) { app.sheet.destroy(); app.sheet = null; }
    U.clear(viewEl);
    viewEl.scrollTop = 0;
    app.region = region; app.section = sec; app.current = sec ? sec.id : 'ana';
    var vname = raw === 'kaynaklar' ? 'sources' : (sec ? sec.view : 'hub');
    /* konu sayfasındaki “Alıştır” gibi bağlantılar from: konu kimliği taşır; ekran açılınca hazır ayar silinir, o yüzden şimdi okunur */
    paintNav(region, sec, app.launch && app.launch.from);
    document.body.setAttribute('data-view', vname);
    if (region) {
      document.body.setAttribute('data-region', region.id);
      document.body.setAttribute('data-tone', region.tone);
    } else {
      document.body.removeAttribute('data-region');
      document.body.removeAttribute('data-tone');
    }
    document.title = region ? (sec.id === 'genel' ? region.name : region.short + ' · ' + sec.label) + ' — Atlas' : (raw === 'kaynaklar' ? 'Kaynaklar ve atıf — Atlas' : 'Atlas — GeoGuessr bölge tahmin rehberi');
    remember(region, sec);
    try {
      mounted = g.Views[vname].mount(viewEl, app);
    } catch (e) {
      console.error(e);
      viewEl.appendChild(UI.empty('Bu ekran açılamadı', String(e && e.message || e), [h('button', { type: 'button', 'class': 'btn', onclick: function () { location.reload(); } }, 'Yeniden yükle')]));
    }
    app.inst = mounted;
  }

  /* ---- tema ---- */
  function systemDark() { try { return g.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return false; } }
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : systemDark();
  }
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    paintThemeBtn();
  }
  function paintThemeBtn() {
    if (!themeBtn) return;
    U.clear(themeBtn);
    var dark = isDark();
    themeBtn.appendChild(UI.icon(dark ? 'sun' : 'moon', 18));
    themeBtn.setAttribute('aria-label', dark ? 'Açık temaya geç' : 'Koyu temaya geç');
    themeBtn.title = dark ? 'Açık tema' : 'Koyu tema';
  }

  /* marka işareti: bölgeden bağımsız hedef (tahmin işareti) */
  function brandMark() {
    return U.s('svg', { 'class': 'mark', viewBox: '0 0 32 32', 'aria-hidden': 'true' },
      U.s('circle', { cx: 16, cy: 16, r: 13, 'class': 'mark-ring' }),
      U.s('circle', { cx: 16, cy: 16, r: 6.5, 'class': 'mark-dot' }));
  }

  function loadFonts() {
    try {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap';
      document.head.appendChild(l);
    } catch (e) { /* çevrimdışı olabilir */ }
  }

  function boot() {
    initMode();
    appEl = document.getElementById('app');
    brandEl = h('a', { 'class': 'brand', id: 'brand-home', href: '#ana', 'aria-label': 'Atlas — ana sayfa' }, brandMark(),
      h('span', { 'class': 'brand-t' }, h('b', {}, 'Atlas'), h('small', {}, 'GeoGuessr rehberi')));
    appEl.appendChild(brandEl);
    appEl.appendChild(buildRegions());
    tabsEl = h('nav', { 'class': 'tabs is-empty', 'aria-label': 'Çalışma alanları' });
    watchStrip(tabsEl);
    appEl.appendChild(tabsEl);
    var findBtn = h('button', { type: 'button', 'class': 'icon-btn', id: 'btn-region-search', 'aria-label': 'Bölge ara', title: 'Bölge ara (/)', onclick: function () { openPicker({ focusSearch: true }); } }, UI.icon('search', 18));
    themeBtn = h('button', { type: 'button', 'class': 'icon-btn', id: 'theme-btn', onclick: function () {
      var t = isDark() ? 'light' : 'dark'; Store.data.set.theme = t; Store.save(); applyTheme(t);
    } });
    appEl.appendChild(h('div', { 'class': 'tools' }, findBtn, themeBtn));
    viewEl = h('main', { 'class': 'view', id: 'view', tabindex: '-1' });
    appEl.appendChild(viewEl);

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault(); openPicker({ focusSearch: true }); return;
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !pickEl) {
        var tag = document.activeElement ? document.activeElement.tagName : '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); openPicker({ focusSearch: true }); }
      }
    });

    applyTheme(Store.data.set.theme);
    try { g.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintThemeBtn); } catch (e) { /* eski tarayıcı */ }
    g.addEventListener('hashchange', route);
    window.addEventListener('beforeunload', function () { Store.flush(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) Store.flush(); });
    route();
    loadFonts();
  }

  g.VNApp = app;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);

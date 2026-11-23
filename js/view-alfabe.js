/* view-alfabe.js — Güney Asya ekranları: Keşfet (exploreAs) · Konular (guideAs: Alfabeler, Tabelalar, Eyaletler) · Pratik (practiceAs) */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.AS_DATA, G = g.AS_GEO, B = g.ASBank, Store = g.Store, SRS = g.SRS, h = U.h;
  var S = D.sById, P = D.pById;

  var DEFAULT = { kinds: B.ALL_KINDS, count: 20, fams: [], weakOnly: false, mapmode: 'mix' };

  var FAM_CLS = { north: 's0', east: 's1', south: 's5', round: 's10', hima: 's12' };
  var ZONE_ORDER = ['north', 'central', 'west', 'east', 'ne', 'south', 'hima', 'islands', 'nbr'];
  var ZONE_CLS = { north: 'q0', central: 'q1', west: 'q2', east: 'q3', ne: 'q4', south: 'q5', islands: 'q6', hima: 'q7', nbr: 'q8' };
  var ZONE_NOTE = {
    north: 'Gurmukhi (Pencap), Devanagari (Hintçe kuşağı kuzeyi) ve Chandigarh üç dilli tabelaları bir arada.',
    central: 'Hindistan’ın merkez Devanagari bloğu (Madhya Pradesh ve Chhattisgarh): tabelalar Hintçe + İngilizce.',
    west: 'Üst çizgisiz Gujarati yazısı ile Devanagari kullanan Maharashtra (Marathi ळ harfi) ve Goa bir arada.',
    east: 'Batı Bengal’de Bengali yazısı, Odisha’da yuvarlak kubbeli Odia, Jharkhand’da Devanagari ve Ol Chiki.',
    ne: 'Assam yazısı (ৰ/ৱ), Bengali (Tripura), Meetei Mayek (Manipur) ve Nagaland/Mizoram/Meghalaya’da yalnızca Latin tabelalar.',
    south: 'Güneyin dört büyük Dravid yazısı: Telugu (✓ v işaretleri), Kannada (kalın kuyruklar), Tamil (sade/köşeli) ve Malayalam (bol halkalı).',
    islands: 'Lakshadweep’te Malayalam, Andaman ve Nikobar’da İngilizce, Hintçe ve Bengali bir arada.',
    hima: 'Cammu ve Keşmir’de Urdu (Nastaliq), Ladakh’ta Tibet yazısı, Sikkim’de Nepalce (Devanagari) ve İngilizce.',
    nbr: 'Bangladeş (Bengali), Nepal (Devanagari), Butan (Tibet/Dzongkha), Sri Lanka (Sinhala + Tamil), Pakistan (Urdu) ve Myanmar (Burmese).'
  };
  var FEATURED_PAIRS = ['deva|guru', 'deva|gujr', 'beng|deva', 'asm|beng', 'beng|orya', 'knda|telu', 'mlym|taml', 'mlym|sinh', 'mymr|sinh', 'deva|tibt'];

  /* ---------------- yazı tipleri: her yazı için ayrı Google Fonts bağlantısı ---------------- */
  var FONT_FAMS = ['Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Gurmukhi', 'Noto Sans Gujarati', 'Noto Sans Oriya', 'Noto Sans Telugu', 'Noto Sans Kannada',
    'Noto Sans Malayalam', 'Noto Sans Tamil', 'Noto Sans Sinhala', 'Noto Sans Myanmar', 'Noto Serif Tibetan', 'Noto Nastaliq Urdu', 'Noto Sans Ol Chiki', 'Noto Sans Meetei Mayek'];
  var fontsLoaded = false;
  function loadFonts() {
    if (fontsLoaded) return;
    fontsLoaded = true;
    try {
      FONT_FAMS.forEach(function (f) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://fonts.googleapis.com/css2?family=' + f.replace(/ /g, '+') + '&display=swap';
        document.head.appendChild(l);
      });
    } catch (e) { /* çevrimdışı olabilir: sistem yazı tipleri kullanılır */ }
  }

  /* ---------------- küçük parçalar ---------------- */
  function sp(sid, text, cls) {
    var s = S[sid];
    return h('span', { 'class': 'sp sp-' + sid + (cls ? ' ' + cls : ''), lang: s.lang, dir: s.rtl ? 'rtl' : null }, text);
  }
  function lenCls(text, pre) {
    var n = Array.from(text).length;
    return n >= 12 ? ' ' + pre + '-xl' : n >= 9 ? ' ' + pre + '-l' : '';
  }
  function signEl(sid, text, sub, cls) {
    return h('div', { 'class': 'asign' + lenCls(text, 'asign') + (cls ? ' ' + cls : '') }, sp(sid, text, 'asign-t'), sub ? h('small', { 'class': 'asign-s' }, sub) : null);
  }
  function swatch(sid) { return h('i', { 'class': 'sw s' + S[sid].cls }); }
  function scriptChip(sid, onclick, cls) {
    var kids = [swatch(sid), S[sid].tr];
    return onclick
      ? h('button', { type: 'button', 'class': 'chip chip-sc' + (cls ? ' ' + cls : ''), onclick: function () { onclick(sid); } }, kids)
      : h('span', { 'class': 'chip chip-static chip-sc' + (cls ? ' ' + cls : '') }, kids);
  }
  function placeChip(pid, onclick, sub, cls) {
    var kids = [swatch(P[pid].main[0]), P[pid].short, sub ? h('small', {}, sub) : null];
    return onclick
      ? h('button', { type: 'button', 'class': 'chip chip-sc' + (cls ? ' ' + cls : ''), onclick: function () { onclick(pid); } }, kids)
      : h('span', { 'class': 'chip chip-static chip-sc' + (cls ? ' ' + cls : '') }, kids);
  }

  /* yazı kartı. o: { compact, noHead, onPlace(pid), onScript(sid) } */
  function scriptCard(sid, o) {
    o = o || {};
    var s = S[sid], f = B.famOf(sid), main = D.statesOf(sid, true), also = D.statesOf(sid, false).filter(function (i) { return main.indexOf(i) < 0; });
    var words = (o.compact ? s.words.slice(0, 2) : s.words.slice(0, 3));
    var el = h('article', { 'class': 'pcard acard', 'data-script': sid },
      o.noHead ? null : h('header', { 'class': 'pc-head' },
        h('div', { 'class': 'pc-title' }, h('h3', {}, s.tr), h('div', { 'class': 'pc-sub' }, s.langs)),
        h('span', { 'class': 'rchip' }, swatch(sid), f.label)),
      h('div', { 'class': 'asigns' }, words.map(function (w) { return signEl(sid, w[0], w[1] + ' · ' + w[2]); })),
      h('p', { 'class': 'cue cue-strong' }, s.gist),
      (!o.compact && g.Kit && g.PHOTO_SETS && g.PHOTO_SETS['as-' + sid] && g.PHOTO_SETS['as-' + sid].length)
        ? h('div', { 'class': 'chips-sec as-photos' }, h('h4', {}, 'Gerçek tabelalar'),
          g.Kit.carousel('as-' + sid, { label: s.tr + ' yazısıyla gerçek tabela fotoğrafları' })) : null,
      h('div', { 'class': 'chips-sec' }, h('h4', {}, 'Nasıl tanırsın'), h('ul', { 'class': 'tells' }, s.tells.map(function (t) { return h('li', {}, t); }))),
      s.conf.length ? h('div', { 'class': 'chips-sec' }, h('h4', {}, 'Karıştırabileceğin yazılar'),
        h('div', { 'class': 'confs' }, s.conf.map(function (c) {
          var t = D.pairTell(sid, c);
          return h('div', { 'class': 'conf' }, scriptChip(c, o.onScript), t ? h('p', {}, t) : null);
        }))) : null,
      !o.compact && sid !== 'latn' ? h('div', { 'class': 'chips-sec' }, h('h4', {}, 'Rakamlar'), h('div', { 'class': 'dig-row' }, sp(sid, s.dig, 'digits'))) : null,
      h('div', { 'class': 'chips-sec' }, h('h4', {}, 'Nerede görülür'),
        main.length || also.length ? h('div', { 'class': 'chips' },
          main.map(function (i) { return placeChip(i, o.onPlace); }),
          also.map(function (i) { return placeChip(i, o.onPlace, 'ikincil', 'chip-also'); }))
          : h('p', { 'class': 'micro' }, 'Baskın bölge yok; belirli topluluk tabelalarında ikincil yazı.')));
    return el;
  }

  /* yer kartı. o: { compact, onPlace(pid), onScript(sid) } */
  function placeCard(pid, o) {
    o = o || {};
    var p = P[pid], nat = D.NATIVE[pid], nb = B.nbOf(pid), m0 = p.main[0], s0 = S[m0];
    var same = nb.filter(function (i) { return P[i].main[0] === m0; }), diff = nb.filter(function (i) { return P[i].main[0] !== m0; });
    var conf = s0.conf.filter(function (c) { return D.pairTell(m0, c); }).slice(0, 2);
    return h('article', { 'class': 'pcard acard', 'data-place': pid },
      h('header', { 'class': 'pc-head' },
        h('div', { 'class': 'pc-title' }, h('h3', {}, p.short), h('div', { 'class': 'pc-sub' }, B.kindTR(p.kind) + ' · ' + D.ZONES[p.zone] + ' · başkent ' + p.cap)),
        h('span', { 'class': 'rchip' }, swatch(m0), s0.tr)),
      h('div', { 'class': 'asigns' }, signEl(nat[0], nat[1], nat[2] + ' · tabelada kendi yazısıyla')),
      h('dl', { 'class': 'facts' },
        UI.fact('Dil', p.lang),
        UI.fact('Baskın yazı', h('div', { 'class': 'chips' }, p.main.map(function (i) { return scriptChip(i, o.onScript); }))),
        p.also.length ? UI.fact('Ayrıca', h('div', { 'class': 'chips' }, p.also.map(function (i) { return scriptChip(i, o.onScript, 'chip-also'); }))) : null),
      h('p', { 'class': 'cue' }, p.note),
      conf.length ? h('div', { 'class': 'chips-sec' }, h('h4', {}, s0.tr + ' yazısını kimle karıştırırsın'),
        h('div', { 'class': 'confs' }, conf.map(function (c) { return h('div', { 'class': 'conf' }, scriptChip(c, o.onScript), h('p', {}, D.pairTell(m0, c))); }))) : null,
      nb.length ? h('div', { 'class': 'chips-sec' }, h('h4', {}, 'Komşuları ', h('small', {}, diff.length ? '(sınırı geçince yazı değişen: ' + diff.length + ')' : '(hepsi aynı yazı)')),
        h('div', { 'class': 'chips' },
          diff.map(function (i) { return placeChip(i, o.onPlace, S[P[i].main[0]].tr); }),
          same.map(function (i) { return placeChip(i, o.onPlace, 'aynı yazı', 'chip-also'); }))) : null);
  }

  function colorFill(mode, selScript, selFilter) {
    return function (id) {
      if (selScript) return B.uses(id, selScript) ? 's' + S[selScript].cls : 'qd';
      if (selFilter && selFilter.ids && selFilter.ids.indexOf(id) < 0) return 'qd';
      if (mode === 'family') return FAM_CLS[S[P[id].main[0]].fam] || 's16';
      if (mode === 'zone') return ZONE_CLS[P[id].zone] || 'qn';
      return B.mainCls(id);
    };
  }
  function labelText(mode) {
    if (mode === 'name') return function (id) { return P[id].short; };
    if (mode === 'script') return function (id) { return S[P[id].main[0]].tr; };
    return null;
  }

  /* ================================================================================================
   * 1. KEŞFET (exploreAs) — view-explore.js ile birebir aynı mimari
   * ================================================================================================ */
  function mountExploreAs(root, app) {
    loadFonts();
    var ST = Store.data.set;
    var colorMode = ['script', 'family', 'zone'].indexOf(ST.asColor) >= 0 ? ST.asColor : 'script';
    var labelMode = ['name', 'script', 'none'].indexOf(ST.asLabel) >= 0 ? ST.asLabel : 'name';
    var L = app.layout(root);
    var sel = null, selScript = null, selFilter = null;

    var map = new g.MapView(L.stage, {
      geo: G, theme: 'as', mesh: { 'in': true, rg: true, mc: true, co: true }, maxK: 14,
      tip: function (id) { return P[id].short + ' · ' + B.scriptNames(P[id].main) + ' · ' + D.ZONES[P[id].zone]; },
      onClick: function (hit) {
        var id = B.resolveTap(map, hit);
        if (id) selectPlace(id, { fit: false, scroll: true });
        else if (sel || selScript || selFilter) clearSel();
      }
    });
    L.bind(map);
    var sheet = L.sheet;

    /* ---- üst çubuk: arama ---- */
    var input = h('input', { type: 'search', id: 'as-search', 'class': 'input', placeholder: 'Eyalet, başkent, dil ya da yazı ara', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Ara', 'aria-controls': 'as-results', role: 'combobox', 'aria-expanded': 'false' });
    var results = h('ul', { id: 'as-results', 'class': 'results', role: 'listbox', hidden: true });
    var searchBox = h('div', { 'class': 'search' }, UI.icon('search', 18), input, results);

    /* harita ayarları: tüm haritalarla ortak pencere (js/kit.js); burada yalnızca satırlar doldurulur */
    var legendEl = h('div', { 'class': 'as-legend' });
    map.cfg.colors({
      options: [{ v: 'script', label: 'Baskın yazı' }, { v: 'family', label: 'Yazı ailesi' }, { v: 'zone', label: 'Kuşak' }],
      value: colorMode, def: 'script',
      onChange: function (v) { colorMode = v; ST.asColor = v; Store.save(); selFilter = null; renderLegend(); applyMap(); }
    });
    map.cfg.labels({
      options: [{ v: 'name', label: 'Ad' }, { v: 'script', label: 'Yazı' }, { v: 'none', label: 'Kapalı' }],
      value: labelMode, def: 'name',
      onChange: function (v) { labelMode = v; ST.asLabel = v; Store.save(); map.setLabels(labelText(labelMode), { size: 10.5, fit: 1.7 }); }
    });
    map.cfg.legend(function (box) { box.appendChild(legendEl); });
    function syncCfgBadge() { map.cfg.refresh(); }

    var panelTop = h('div', { 'class': 'p-top' },
      h('div', { 'class': 'row' }, searchBox));
    var detail = h('div', { 'class': 'detail', id: 'as-detail' });
    var guideLink = h('a', { 'class': 'feat-link', href: app.href('alfabe'), id: 'as-guide-link' },
      UI.icon('langs', 18), h('span', {}, h('b', {}, '17 yazıyı ve tabelaları öğren'), h('small', {}, 'Karar akışı, karışan çiftler ve 42 yer')), UI.icon('arrow', 14));
    var panelBody = h('div', { 'class': 'p-body' }, detail, guideLink);
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    function applyMap() {
      map.setMesh({ 'in': true, rg: true, mc: true, co: true });
      map.setFill(colorFill(colorMode, selScript, selFilter));
      map.setLabels(labelText(labelMode), { size: 10.5, fit: 1.7 });
      map.clearHighlight('hl-sel'); map.clearHighlight('hl-ctx');
      if (selScript) {
        var also = D.statesOf(selScript, false).filter(function (i) { return !B.uses(i, selScript); });
        if (also.length) map.highlight(also, 'hl-ctx');
      }
      if (sel) map.highlight([sel], 'hl-sel');
      map.setLocatorTarget(sel);
    }

    function renderLegend() {
      U.clear(legendEl);
      if (colorMode === 'script') {
        D.FAMS.forEach(function (f) {
          legendEl.appendChild(h('h4', { 'class': 'fam-h' }, f.label));
          D.SCRIPTS.filter(function (s) { return s.fam === f.id; }).forEach(function (s) {
            var n = D.statesOf(s.id, true).length;
            legendEl.appendChild(h('button', { type: 'button', 'class': 'lg-row' + (selScript === s.id ? ' on' : ''), 'data-script': s.id, 'aria-pressed': selScript === s.id ? 'true' : 'false', onclick: function () { selectScript(s.id); } },
              swatch(s.id), h('b', {}, s.tr), h('span', {}, sp(s.id, s.nat, 'lg-sp'), n ? ' · ' + n + ' yer' : ' · baskın yer yok')));
          });
        });
      } else if (colorMode === 'family') {
        D.FAMS.forEach(function (f) {
          var ids = D.PLACES.filter(function (p) { return S[p.main[0]].fam === f.id; }).map(function (p) { return p.id; });
          var on = selFilter && selFilter.key === 'fam:' + f.id;
          legendEl.appendChild(h('button', { type: 'button', 'class': 'lg-row' + (on ? ' on' : ''), onclick: function () { toggleFilter('fam:' + f.id, ids); } },
            h('i', { 'class': 'sw ' + FAM_CLS[f.id] }), h('b', {}, f.label), h('span', {}, f.sub + ' · ' + ids.length + ' yer')));
        });
      } else if (colorMode === 'zone') {
        ZONE_ORDER.forEach(function (zid) {
          var ids = D.PLACES.filter(function (p) { return p.zone === zid; }).map(function (p) { return p.id; });
          var on = selFilter && selFilter.key === 'zone:' + zid;
          legendEl.appendChild(h('button', { type: 'button', 'class': 'lg-row' + (on ? ' on' : ''), onclick: function () { toggleFilter('zone:' + zid, ids); } },
            h('i', { 'class': 'sw ' + ZONE_CLS[zid] }), h('b', {}, D.ZONES[zid]), h('span', {}, ids.length + ' yer')));
        });
      }
    }

    function toggleFilter(key, ids) {
      if (selFilter && selFilter.key === key) selFilter = null;
      else selFilter = { key: key, ids: ids };
      sel = null; selScript = null;
      syncCfgBadge(); renderLegend(); applyMap(); renderDetail();
      if (selFilter && ids.length) map.fitTo(ids, { pad: 44, maxK: 6 }); else map.fitAll(true);
    }

    function renderDetail() {
      U.clear(detail);
      if (sel) {
        detail.appendChild(placeCard(sel, { onPlace: function (id) { selectPlace(id, { fit: true }); }, onScript: function (sid) { selectScript(sid); } }));
        return;
      }
      if (selScript) {
        detail.appendChild(scriptCard(selScript, { onPlace: function (id) { selectPlace(id, { fit: true }); }, onScript: function (sid) { selectScript(sid); } }));
        detail.appendChild(h('button', { type: 'button', 'class': 'linkish', id: 'as-clear', onclick: clearSel }, 'Seçimi kaldır, tüm renkleri göster'));
        return;
      }
      detail.appendChild(UI.empty('Bir eyalet ya da ülke seç', 'Haritada bir yere dokun veya yukarıdan ara.'));
    }

    function fitScript(sid, anim) {
      var ids = D.statesOf(sid, true);
      if (ids.length) map.fitTo(ids, { pad: 40, maxK: 6, anim: anim });
    }
    function selectPlace(pid, o) {
      o = o || {};
      sel = pid; selScript = null; selFilter = null;
      syncCfgBadge(); applyMap(); renderLegend(); renderDetail();
      sheet.ensure('half');
      if (o.fit) map.fitTo([pid], { pad: 56, maxK: B.TINY[pid] ? 12 : 9 });
      if (o.scroll !== false) U.toPanel(detail); else U.toPanel(null);
    }
    function selectScript(sid) {
      if (selScript === sid && !sel) { clearSel(); return; }
      selScript = sid; sel = null; selFilter = null;
      syncCfgBadge(); applyMap(); renderLegend(); renderDetail();
      sheet.ensure('half');
      fitScript(sid, true);
      U.toPanel(detail);
    }
    function clearSel() {
      var had = sel || selScript || selFilter;
      sel = null; selScript = null; selFilter = null;
      syncCfgBadge(); applyMap(); renderLegend(); renderDetail();
      if (had) { U.toPanel(null); if (sheet.state === 'half') sheet.snap('peek'); map.fitAll(true); }
    }

    /* ---- arama ---- */
    var hits = [], active = -1;
    function closeResults() { results.hidden = true; input.setAttribute('aria-expanded', 'false'); active = -1; }
    function renderResults() {
      U.clear(results);
      if (!hits.length) {
        if (input.value.trim()) { results.appendChild(h('li', { 'class': 'res-empty' }, 'Sonuç yok')); results.hidden = false; input.setAttribute('aria-expanded', 'true'); } else closeResults();
        return;
      }
      hits.forEach(function (r, i) {
        results.appendChild(h('li', { role: 'option', id: 'as-r' + i, 'class': 'res' + (i === active ? ' on' : ''), 'aria-selected': i === active ? 'true' : 'false', onmousedown: function (e) { e.preventDefault(); pick(r); } },
          h('b', {}, r.label), h('span', {}, r.sub)));
      });
      results.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    function pick(r) {
      closeResults(); input.value = ''; input.blur();
      if (r.type === 'place') selectPlace(r.id, { fit: true }); else { selScript = null; selectScript(r.id); }
      sheet.snap('half');
    }
    input.addEventListener('input', function () { hits = B.search(input.value); active = -1; renderResults(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (hits.length) { active = (active + 1) % hits.length; renderResults(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (hits.length) { active = (active - 1 + hits.length) % hits.length; renderResults(); } }
      else if (e.key === 'Enter') { if (hits.length) { e.preventDefault(); pick(hits[Math.max(0, active)]); } }
      else if (e.key === 'Escape') { closeResults(); input.blur(); }
    });
    input.addEventListener('blur', function () { setTimeout(closeResults, 120); });
    input.addEventListener('focus', function () { sheet.snap('full'); });

    function onKey(e) {
      if (e.key === '/' && document.activeElement !== input && !e.ctrlKey && !e.metaKey && !e.altKey) {
        var tag = document.activeElement ? document.activeElement.tagName : '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); input.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);

    renderLegend(); applyMap(); renderDetail();
    var launch = app.launch; app.launch = null;
    if (launch && launch.select && P[launch.select]) {
      map.fitAll(false);
      selectPlace(launch.select, { fit: true, scroll: false });
    } else if (launch && launch.script && S[launch.script]) {
      map.fitAll(false);
      selectScript(launch.script);
    } else {
      sheet.snap('peek', { instant: true });
      map.fitAll(false);
    }

    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  /* ================================================================================================
   * 2. KONULAR (guideAs) — view-guide.js ile birebir aynı mimari (Alfabeler · Tabelalar · Eyaletler)
   * ================================================================================================ */
  function mountGuideAs(root, app, secArg) {
    loadFonts();
    var sec = secArg || app.section || {};
    var tab = sec.tab || 'scripts';
    var drill = sec.drill || (tab === 'pairs' ? 'cift' : tab === 'places' ? 'esy' : 'yer');
    var L = app.layout(root, { wide: true });

    var map = new g.MapView(L.stage, {
      geo: G, theme: 'as', mesh: { 'in': true, rg: true, mc: true, co: true }, maxK: 14,
      tip: function (id) { return P[id].short + ' · ' + B.scriptNames(P[id].main) + ' · ' + D.ZONES[P[id].zone]; },
      onClick: function (hit) {
        var id = B.resolveTap(map, hit);
        if (id) showStrip(id);
        else { strip.hidden = true; map.clearHighlight('hl-sel'); }
      }
    });
    L.bind(map);
    var sheet = L.sheet;

    var TITLES = { scripts: 'Alfabeler', pairs: 'Tabelalar ve karışan çiftler', places: 'Eyaletler ve kuşaklar' };
    var head = h('div', { 'class': 'topic-h' },
      h('h2', {}, TITLES[tab] || sec.label || 'Alfabeler'),
      h('a', { 'class': 'btn btn-primary btn-sm', id: 'topic-drill', href: app.href('pratik'),
        onclick: function () { app.launch = { preset: drill, from: sec.id }; } },
        UI.icon('target', 16), 'Alıştır'));
    var strip = h('div', { 'class': 'strip', hidden: true });
    var panelBody = h('div', { 'class': 'p-body guide' });
    L.panel.appendChild(h('div', { 'class': 'p-top' }, head, strip));
    L.panel.appendChild(panelBody);

    function openInExplore(pid) { app.launch = { select: pid }; app.go('kesfet'); }
    function openScriptInGuide(sid) {
      if (tab === 'scripts') {
        var d = U.$('details.ac[data-script="' + sid + '"]', panelBody);
        if (d) { d.open = true; sheet.ensure('half'); setTimeout(function () { U.toPanel(d); }, 30); return; }
      }
      app.launch = { script: sid };
      app.go('alfabe');
    }

    function showStrip(id) {
      var p = P[id], m0 = p.main[0];
      U.clear(strip); strip.hidden = false;
      strip.appendChild(h('div', { 'class': 'strip-main' },
        swatch(m0), h('b', {}, p.short), h('span', {}, S[m0].tr + ' · ' + D.ZONES[p.zone])));
      strip.appendChild(h('div', { 'class': 'row' },
        h('button', { type: 'button', 'class': 'linkish strip-link', onclick: function () { openInExplore(id); } }, 'Kartı aç'),
        h('button', { type: 'button', 'class': 'icon-btn icon-btn-sm', 'aria-label': 'Kapat', onclick: function () { strip.hidden = true; map.clearHighlight('hl-sel'); } }, UI.icon('x', 14))));
      map.highlight([id], 'hl-sel');
      map.setLocatorTarget(id);
      sheet.reflow();
    }

    function bindRow(el, ids, opts) {
      opts = opts || {};
      var maxK = opts.maxK || 6.5;
      el.tabIndex = 0;
      el.classList.add('interactive');
      el.addEventListener('mouseenter', function () { map.highlight(ids, 'hl-ctx'); });
      el.addEventListener('mouseleave', function () { map.clearHighlight('hl-ctx'); });
      function activate(e) {
        if (e && e.target && e.target.closest && e.target.closest('button, a, summary')) return;
        map.highlight(ids, 'hl-sel');
        if (ids.length === 1) { showStrip(ids[0]); map.setLocatorTarget(ids[0]); } else map.setLocatorTarget(null);
        map.fitTo(ids, { pad: 44, maxK: maxK });
        if (sheet.enabled && sheet.state === 'full') sheet.snap('half');
      }
      el.addEventListener('click', activate);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(e); } });
      return el;
    }

    var guideLbl = tab === 'places' ? 'name' : 'script';
    function applyBaseMap(selScript) {
      map.setMesh({ 'in': true, rg: true, mc: true, co: true });
      map.setFill(tab === 'places' ? colorFill('zone', null, null) : colorFill('script', selScript, null));
      map.setLabels(labelText(guideLbl), { size: 10.5, fit: 1.7 });
    }
    map.cfg.labels({
      options: [{ v: 'name', label: 'Ad' }, { v: 'script', label: 'Yazı' }, { v: 'none', label: 'Kapalı' }],
      value: guideLbl, def: guideLbl,
      onChange: function (v) { guideLbl = v; map.setLabels(labelText(guideLbl), { size: 10.5, fit: 1.7 }); }
    });
    map.cfg.lock('color', tab === 'places' ? 'Renk kuşağı gösterir' : 'Renk yazı sistemini gösterir');

    if (tab === 'scripts') buildScripts();
    else if (tab === 'pairs') buildPairs();
    else buildPlaces();

    applyBaseMap(null);
    map.fitAll(false);
    sheet.snap('half', { instant: true });

    var launch = app.launch; app.launch = null;
    if (launch && launch.script && S[launch.script] && tab === 'scripts') {
      setTimeout(function () { openScriptInGuide(launch.script); }, 0);
    }

    /* ---- Konu 1: Alfabeler (17 yazı, 5 aile, hızlı tanı akışı, Rosetta) ---- */
    function buildScripts() {
      panelBody.appendChild(h('p', { 'class': 'lead' },
        'Üst çizgi, yuvarlaklık ve ayırt edici harflerden yazıyı hızlıca daraltıp bölgesine bağla.'));

      /* aynı yer adı üç yazıyla nasıl yazılır: özgün çizimler (js/figs-india.js) */
      if (g.Kit && g.Kit.setKeys('in-dir-all').length) {
        panelBody.appendChild(UI.sec('Aynı ad, üç yazı: yön levhasında nerede yazar?',
          h('p', { 'class': 'micro' }, 'Ulusal yol levhalarında yer adı bölge yazısıyla, Hindi’yle ve İngilizceyle üst üste yazılır. İngilizce satırı anahtar olarak kullan; önce gerçek fotoğraflar, sonra şematik çizimler; kaydırarak bak.'),
          h('div', { 'class': 'dec-fig' }, g.Kit.carousel('in-dir-all', { label: 'Hindistan yön levhası çizim ve fotoğrafları' }))));
      }

      /* Hızlı tanı karar akışı */
      var flowList = h('ol', { 'class': 'flow' }, D.FLOW.map(function (f) {
        var ids = [];
        f.go.forEach(function (sid) { D.statesOf(sid, true).forEach(function (pid) { if (ids.indexOf(pid) < 0) ids.push(pid); }); });
        var li = h('li', {},
          h('b', {}, f.t),
          h('p', {}, f.b),
          h('div', { 'class': 'chips' }, f.go.map(function (sid) { return scriptChip(sid, function (x) { openScriptInGuide(x); }); })));
        if (ids.length) bindRow(li, ids, { maxK: 5 });
        return li;
      }));
      panelBody.appendChild(UI.sec('Hızlı tanı: bir tabelaya bakınca sor', flowList));

      /* 5 aile ve 17 yazı */
      var openSid = null;
      var list = h('div', { 'class': 'as-list' });
      D.FAMS.forEach(function (f) {
        list.appendChild(h('h4', { 'class': 'fam-h' }, f.label, h('small', {}, ' ' + f.sub)));
        D.SCRIPTS.filter(function (s) { return s.fam === f.id; }).forEach(function (s) {
          var mainIds = D.statesOf(s.id, true);
          var n = mainIds.length;
          var body = h('div', { 'class': 'ac-body' });
          var d = h('details', { 'class': 'ac', 'data-script': s.id },
            h('summary', {}, swatch(s.id), sp(s.id, s.nat, 'ac-nat'), h('span', { 'class': 'ac-t' }, h('b', {}, s.tr), h('small', {}, s.langs)), h('span', { 'class': 'ac-n' }, n ? n + ' yer' : 'ikincil')),
            body);
          d.addEventListener('mouseenter', function () { if (mainIds.length) map.highlight(mainIds, 'hl-ctx'); });
          d.addEventListener('mouseleave', function () { map.clearHighlight('hl-ctx'); });
          d.addEventListener('toggle', function () {
            if (d.open) {
              if (!body.firstChild) body.appendChild(scriptCard(s.id, { noHead: true, onPlace: openInExplore, onScript: openScriptInGuide }));
              U.$$('details.ac[open]', panelBody).forEach(function (o) { if (o !== d) o.open = false; });
              openSid = s.id;
              applyBaseMap(s.id);
              if (mainIds.length) map.fitTo(mainIds, { pad: 40, maxK: 6, anim: true });
            } else if (openSid === s.id) {
              openSid = null;
              applyBaseMap(null);
              map.fitAll(true);
            }
          });
          list.appendChild(d);
        });
      });
      panelBody.appendChild(UI.sec('5 yazı ailesi ve 17 yazı', list));

      /* Rosetta karşılaştırma tablosu */
      var R = D.ROSETTA;
      var head = h('tr', {}, h('th', { scope: 'col', 'class': 'ros-corner' }, ''), R.cols.map(function (c) {
        return h('th', {
          scope: 'col', 'class': 's' + S[c].cls, title: S[c].tr + ' — haritada göster', style: { cursor: 'pointer' },
          onclick: function () { openScriptInGuide(c); }
        }, h('span', { 'class': 'ros-n' }, S[c].tr.slice(0, 4)));
      }));
      var rows = R.rows.map(function (r) {
        return h('tr', {}, h('th', { scope: 'row', 'class': 'ros-r' }, r[0]), R.cols.map(function (c, i) {
          return h('td', {}, r[i + 1] === '—' ? h('span', { 'class': 'ros-na' }, '—') : sp(c, r[i + 1], 'ros-sp'));
        }));
      });
      var rosWrap = h('div', { 'class': 'ros-wrap', tabindex: '0', role: 'region', 'aria-label': 'Yazılar karşılaştırma tablosu' },
        h('table', { 'class': 'ros' }, h('thead', {}, head), h('tbody', {}, rows)));
      panelBody.appendChild(UI.sec('Aynı harf, farklı yazı (9 ünsüz × 12 yazı)',
        h('p', { 'class': 'micro' }, 'Sütun başlığına dokununca o yazının haritadaki dağılımı ve kartı açılır.'),
        rosWrap));
    }

    /* ---- Konu 2: Tabelalar ve karışan çiftler ---- */
    function buildPairs() {
      panelBody.appendChild(h('p', { 'class': 'lead' },
        'Benzer yazıları ve aynı yazıyı paylaşan komşuları yan yana ayır; karta basınca haritada vurgulanır.'));

      /* tabela çizimleri (js/figs-india.js): yön levhası ve mil taşı renkleri */
      if (g.Kit && g.Kit.setKeys('in-mile1').length) {
        panelBody.appendChild(UI.sec('Levhada yer adı nerede yazar?',
          h('p', { 'class': 'micro' }, 'Yön levhası: bölge yazısı, Hindi, İngilizce sırasıyla üst üste. Mil taşı: üst renk yolun türünü, beyaz gövde yer adını ve km’yi söyler. Çizimlerin yanında gerçek fotoğraflar da var; kaydır.'),
          h('div', { 'class': 'dec-fig' }, g.Kit.carousel(['in-dir-kn', 'in-dir-ta', 'in-dir-te-1', 'in-dir-ta-1', 'in-mile', 'in-mile-1', 'in-mile-2', 'in-mile-3'], { label: 'Hindistan tabela çizimleri ve fotoğrafları' }))));
      }

      /* En çok karışan 10 yazı çifti */
      var pairCards = h('div', { 'class': 'stack' }, FEATURED_PAIRS.map(function (pk) {
        var ab = pk.split('|'), a = ab[0], b = ab[1], tell = D.PAIRS[pk];
        var sa = S[a], sb = S[b];
        var wa = sa.words[0], wb = sb.words[0];
        var statesA = D.statesOf(a, true), statesB = D.statesOf(b, true);
        var allIds = U.uniq(statesA.concat(statesB));
        var card = h('article', { 'class': 'rule' },
          h('header', { 'class': 'rule-h' },
            h('div', { 'class': 'rule-t' },
              h('h4', {}, sa.tr + ' ↔ ' + sb.tr),
              h('p', { 'class': 'rule-gist' }, B.famOf(a).label + (sa.fam !== sb.fam ? ' · ' + B.famOf(b).label : ''))),
            h('div', { 'class': 'chips' }, scriptChip(a, openScriptInGuide), scriptChip(b, openScriptInGuide))),
          h('div', { 'class': 'asigns' },
            signEl(a, wa[0], sa.tr + ' · ' + wa[1]),
            signEl(b, wb[0], sb.tr + ' · ' + wb[1])),
          h('div', { 'class': 'rule-watch' }, UI.icon('bulb', 16), h('span', {}, tell)),
          h('div', { 'class': 'rgroup' },
            statesA.length ? h('div', { 'class': 'rg-l' }, swatch(a), h('span', {}, sa.tr + ': ' + statesA.map(function (i) { return P[i].short; }).join(', '))) : null,
            statesB.length ? h('div', { 'class': 'rg-l' }, swatch(b), h('span', {}, sb.tr + ': ' + statesB.map(function (i) { return P[i].short; }).join(', '))) : null));
        return bindRow(card, allIds.length ? allIds : ['west-bengal', 'assam'], { maxK: 5 });
      }));
      panelBody.appendChild(UI.sec('En çok karışan 10 yazı çifti', pairCards));

      /* Aynı yazı, farklı bölge: Devanagari & Bengal ayrımları */
      var sameScript = h('div', { 'class': 'stack' },
        bindRow(h('article', { 'class': 'rule' },
          h('header', { 'class': 'rule-h' },
            h('div', { 'class': 'rule-t' },
              h('h4', {}, 'Devanagari: Hintçe Kuşağı · Maharashtra · Nepal'),
              h('p', { 'class': 'rule-gist' }, 'Aynı üst çizgili yazı; harf ve sözcük ipuçları eyaleti/ülkeyi ayırır.')),
            scriptChip('deva', openScriptInGuide)),
          h('div', { 'class': 'asigns' },
            signEl('deva', 'महाराष्ट्र शासन', 'Marathi (Maharashtra) · ळ harfi ve आहे'),
            signEl('deva', 'काठमाडौँ · राजमार्ग', 'Nepalce (Nepal) · छ / को ve Devanagari rakamlar')),
          h('p', { 'class': 'rule-body' },
            '• ', h('b', {}, 'Maharashtra (Marathi): '), 'Sekiz rakamına benzeyen çift halkalı ', sp('deva', 'ळ', 'lg-sp'), ' harfi ve cümle sonundaki ', sp('deva', 'आहे', 'lg-sp'), ' Hintçe kuşağında görülmez; gördüğün an Maharashtra veya Goa sınırıdır. ',
            '• ', h('b', {}, 'Nepal: '), 'Kırmızı-mavi çerçeveli dükkân tabelaları, “Rajmarg” (karayolu) ve “Nagarpalika” (belediye) sözcükleri ile Devanagari rakamlar (०१२३).')),
          ['maharashtra', 'nepal', 'uttar-pradesh', 'madhya-pradesh', 'rajasthan'], { maxK: 4.5 }),
        bindRow(h('article', { 'class': 'rule' },
          h('header', { 'class': 'rule-h' },
            h('div', { 'class': 'rule-t' },
              h('h4', {}, 'Doğu Nagari: Batı Bengal · Assam · Bangladeş'),
              h('p', { 'class': 'rule-gist' }, 'Üçgende ৰ/ৱ harfi Assam’ı, Hintçe satırının yokluğu Bangladeş’i ayırır.')),
            h('div', { 'class': 'chips' }, scriptChip('beng', openScriptInGuide), scriptChip('asm', openScriptInGuide))),
          h('div', { 'class': 'asigns' },
            signEl('beng', 'পশ্চিমবঙ্গ · কলকাতা', 'Bengalce (Batı Bengal / Bangladeş) · র (noktalı)'),
            signEl('asm', 'অসম · গুৱাহাটী পথ', 'Assamca (Assam) · ৰ (altı kancalı) ve ৱ')),
          h('p', { 'class': 'rule-body' },
            '• ', h('b', {}, 'Assam: '), 'Altı kancalı ', sp('asm', 'ৰ', 'lg-sp'), ' ve altında çıkıntı olan ', sp('asm', 'ৱ', 'lg-sp'), ' harfleri yalnızca Assam’da çıkar; ayrıca “yol” için ', sp('asm', 'পথ', 'lg-sp'), ' (path) çok yaygındır. ',
            '• ', h('b', {}, 'Bangladeş vs Batı Bengal: '), 'Bangladeş’te tabelalar Bengali + İngilizce olup Hintçe (Devanagari) üçüncü satır hiç bulunmaz.')),
          ['west-bengal', 'assam', 'tripura', 'bangladesh'], { maxK: 5.5 }));
      panelBody.appendChild(UI.sec('Aynı yazı ailesinde eyalet ve ülke ayrımı', sameScript));

      /* Tabela düzeni ve sınır ipuçları */
      var tipsWrap = h('div', { 'class': 'stack' }, D.TIPS.map(function (t) {
        return h('article', { 'class': 'rcard' },
          h('header', {}, h('div', {}, h('h4', {}, t.t))),
          h('p', { 'class': 'cue' }, t.b));
      }));
      panelBody.appendChild(UI.sec('Tabela düzeni ve sınır geçişleri', tipsWrap));
    }

    /* ---- Konu 3: Eyaletler ve kuşaklar (9 kuşak + 42 yer tablosu) ---- */
    function buildPlaces() {
      panelBody.appendChild(h('p', { 'class': 'lead' },
        '9 coğrafi kuşak ve 42 yer. Kuşağa ya da satıra basınca haritada gösterir.'));

      var zoneCards = h('div', { 'class': 'stack' }, ZONE_ORDER.map(function (zid) {
        var places = D.PLACES.filter(function (p) { return p.zone === zid; });
        var ids = places.map(function (p) { return p.id; });
        var scripts = U.uniq(places.reduce(function (a, p) { return a.concat(p.main); }, []));
        var card = h('article', { 'class': 'rcard' },
          h('header', {},
            h('i', { 'class': 'sw sw-lg ' + ZONE_CLS[zid] }),
            h('div', {}, h('h4', {}, D.ZONES[zid]), h('small', {}, places.length + ' yer · ' + scripts.map(function (s) { return S[s].tr; }).join(', ')))),
          h('p', { 'class': 'cue' }, ZONE_NOTE[zid] || ''),
          h('div', { 'class': 'chips' }, places.map(function (p) {
            return placeChip(p.id, function (pid) { showStrip(pid); map.fitTo([pid], { pad: 56, maxK: B.TINY[pid] ? 12 : 8 }); }, S[p.main[0]].tr);
          })));
        return bindRow(card, ids, { maxK: 5.5 });
      }));
      panelBody.appendChild(UI.sec('9 coğrafi kuşak', zoneCards));

      /* 42 yer tablosu (filtre + sıralama) */
      var sortKey = 'short', sortDir = 1, qFilter = '';
      var filterIn = h('input', { type: 'search', 'class': 'input', placeholder: 'Eyalet, başkent, dil ya da yazı filtrele', 'aria-label': 'Tabloda ara' });
      var tbody = h('tbody', {});
      function thBtn(k, label) {
        return h('th', { scope: 'col' }, h('button', { type: 'button', 'class': 'th-sort', onclick: function () {
          if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = 1; }
          renderRows();
        } }, label));
      }
      function renderRows() {
        U.clear(tbody);
        var f = D.norm(qFilter);
        var rows = D.PLACES.filter(function (p) {
          if (!f) return true;
          var scTxt = p.main.concat(p.also).map(function (sid) { return S[sid].tr; }).join(' ');
          return D.norm(p.short + ' ' + p.en + ' ' + p.cap + ' ' + p.lang + ' ' + D.ZONES[p.zone] + ' ' + scTxt).indexOf(f) >= 0;
        }).slice().sort(function (a, b) {
          var va = sortKey === 'script' ? S[a.main[0]].tr : sortKey === 'zone' ? D.ZONES[a.zone] : a[sortKey];
          var vb = sortKey === 'script' ? S[b.main[0]].tr : sortKey === 'zone' ? D.ZONES[b.zone] : b[sortKey];
          return String(va).localeCompare(String(vb), 'tr') * sortDir;
        });
        rows.forEach(function (p) {
          var m0 = p.main[0];
          var tr = h('tr', {},
            h('td', {}, swatch(m0), h('b', {}, p.short)),
            h('td', {}, S[m0].tr, p.also.length ? h('small', { 'class': 'muted' }, ' +' + p.also.map(function (x) { return S[x].tr; }).join(', ')) : null),
            h('td', {}, p.lang + ' · ' + p.cap),
            h('td', {}, D.ZONES[p.zone]));
          bindRow(tr, [p.id], { maxK: B.TINY[p.id] ? 12 : 8 });
          tbody.appendChild(tr);
        });
      }
      filterIn.addEventListener('input', function () { qFilter = filterIn.value; renderRows(); });
      renderRows();
      panelBody.appendChild(UI.sec('42 eyalet ve ülke tablosu',
        filterIn,
        h('div', { 'class': 'tablewrap' },
          h('table', { 'class': 'tbl' },
            h('thead', {}, h('tr', {}, thBtn('short', 'Yer'), thBtn('script', 'Baskın yazı'), thBtn('lang', 'Dil · Başkent'), thBtn('zone', 'Kuşak'))),
            tbody))));
    }

    return { destroy: function () { map.destroy(); } };
  }

  /* ================================================================================================
   * 3. PRATİK (practiceAs) — view-practice.js ile birebir aynı mimari
   * ================================================================================================ */
  function mountPracticeAs(root, app) {
    loadFonts();
    var ST = Store.data.set;
    var cfg = Object.assign({}, DEFAULT, ST.asQuiz || {});
    cfg.kinds = (cfg.kinds || []).filter(function (k) { return B.KINDS[k]; });
    if (!cfg.kinds.length) cfg.kinds = B.ALL_KINDS.slice();
    var showColors = ST.asQuizColors !== false;

    var L = app.layout(root);
    var sess = null, q = null, phase = 'setup', hb = null, lastAnswer = null;

    var map = new g.MapView(L.stage, {
      geo: G, theme: 'as', basemapLabels: false, mesh: { 'in': true, rg: showColors, mc: true, co: true }, maxK: 14,
      tip: function (id) {
        if (phase === 'setup' || phase === 'summary') return P[id].short + ' · ' + B.scriptNames(P[id].main);
        return null;
      },
      onClick: onMapClick
    });
    L.bind(map);
    var sheet = L.sheet;

    map.cfg.lock('labels', 'Sınav sırasında kapalı');
    map.cfg.colors({
      options: [{ v: 'on', label: 'Yazı renkleri' }, { v: 'off', label: 'Sade' }],
      value: showColors ? 'on' : 'off', def: 'on',
      onChange: function (v) {
        showColors = v === 'on'; ST.asQuizColors = showColors; Store.save();
        if (phase !== 'summary') { map.setMesh(quizMesh()); map.setFill(quizFill()); }
      }
    });

    function neutral() { return !showColors || phase !== 'setup'; }
    function quizFill() {
      return function (id) {
        if (neutral()) return 'qn';
        var fam = S[P[id].main[0]].fam;
        if (cfg.fams.length && cfg.fams.indexOf(fam) < 0) return 'qd';
        return B.mainCls(id);
      };
    }
    function quizMesh() { return { 'in': true, rg: !neutral(), mc: true, co: true }; }

    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    function nameOf(id) { return P[id].short; }
    function openInExplore(pid) { app.launch = { select: pid }; app.go('kesfet'); }
    function persist() { ST.asQuiz = { kinds: cfg.kinds, count: cfg.count, fams: cfg.fams, weakOnly: cfg.weakOnly, mapmode: cfg.mapmode }; Store.save(); }

    /* =================== KURULUM =================== */
    var scopeChipsRef = null;
    function showSetup(quiet) {
      phase = 'setup'; q = null; sess = null; hb = null; lastAnswer = null;
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      if (quiet !== true) sheet.snap('full', { instant: !!sheet.first });
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      map.setMesh(quizMesh()); map.setFill(quizFill()); map.setLabels(null); map.fitAll(false);

      var today = SRS.today(), st = SRS.streak();
      panelTop.appendChild(h('div', { 'class': 'p-title' },
        h('h2', {}, 'Pratik'),
        h('span', { 'class': 'p-meta' }, UI.icon('flame', 16), 'Bugün ' + today + ' soru · seri ' + st + ' gün')));

      var presets = h('div', { 'class': 'presets' }, B.PRESETS.map(function (p) {
        var weakless = p.id === 'zayif' && !SRS.weakKeys(B.allKeys()).length;
        return h('button', { type: 'button', 'class': 'preset' + (p.feat ? ' preset-feat' : ''), 'data-preset': p.id, disabled: weakless, onclick: function () {
          start(Object.assign({}, DEFAULT, p.cfg, { fams: (p.cfg.fams || []).slice() }));
        } }, h('span', { 'class': 'pi' }, UI.icon(p.icon, 20)), h('span', { 'class': 'pt' }, h('b', {}, p.title), h('small', {}, p.sub)));
      }));

      var kindsChips = UI.multi(B.CATS.map(function (c) { return { v: c.id, label: c.label }; }),
        B.CATS.filter(function (c) { return c.kinds.some(function (k) { return cfg.kinds.indexOf(k) >= 0; }); }).map(function (c) { return c.id; }),
        function (ids) { cfg.kinds = B.CATS.filter(function (c) { return ids.indexOf(c.id) >= 0; }).reduce(function (a, c) { return a.concat(c.kinds); }, []); persist(); },
        { min: 1, label: 'Soru türleri' });
      var famChips = UI.multi(D.FAMS.map(function (f) { return { v: f.id, label: f.label }; }), cfg.fams, function (ids) { cfg.fams = ids; persist(); map.setFill(quizFill()); }, { label: 'Yazı ailesi kapsamı' });
      var mapSeg = UI.seg([{ v: 'mix', label: 'Karışık' }, { v: 'map', label: 'Haritada dokun' }, { v: 'mc', label: 'Şıklı' }], cfg.mapmode, function (v) { cfg.mapmode = v; persist(); }, { cls: 'seg-full', label: 'Yazıdan bölgeye soruları' });
      var countSeg = UI.seg([{ v: '10', label: '10' }, { v: '20', label: '20' }, { v: '50', label: '50' }, { v: '0', label: 'Sonsuz' }], String(cfg.count), function (v) { cfg.count = +v; persist(); }, { cls: 'seg-full', label: 'Soru sayısı' });
      var weakChk = h('label', { 'class': 'check' }, h('input', { type: 'checkbox', id: 'as-weak', checked: cfg.weakOnly ? true : null, onchange: function (e) { cfg.weakOnly = e.target.checked; persist(); } }), h('span', {}, 'Sadece zayıf ve yeni öğeler (kutu 0–2)'));
      var startBtn = h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'as-start', onclick: function () { start(Object.assign({}, cfg)); } }, UI.icon('arrow', 16), 'Başlat');
      function field(label, note, ctl) { return h('div', { 'class': 'field' }, h('h4', {}, label, note ? h('small', {}, ' ' + note) : null), ctl); }
      var fold = h('details', { 'class': 'fold' },
        h('summary', {}, UI.icon('list', 16), 'Özel ayarlar'),
        h('div', { 'class': 'fold-body' },
          field('Soru türleri', null, kindsChips),
          field('Yazı ailesi', '(boşsa hepsi; haritadan da dokunabilirsin)', famChips),
          field('Yazıdan bölgeye soruları', null, mapSeg),
          field('Soru sayısı', null, countSeg),
          weakChk));
      fold.addEventListener('toggle', function () { L.foot(fold.open ? [startBtn] : null); });
      panelBody.appendChild(presets);
      panelBody.appendChild(fold);
      panelBody.appendChild(h('p', { 'class': 'micro' }, 'Yanlışlar kısa süre sonra geri gelir; doğrular daha seyrek sorulur.'));
      scopeChipsRef = famChips;
    }

    /* =================== OTURUM =================== */
    function start(c) {
      cfg = Object.assign({}, DEFAULT, c);
      sess = new B.Session(cfg);
      if (sess.empty) { UI.toast('Bu ayarlarla soru bulunamadı. Kapsamı genişlet.', 'bad'); sess = null; return; }
      next();
    }
    function next() {
      q = sess.next();
      if (!q) { showSummary(); return; }
      renderQuestion();
    }

    function promptEl(pr) {
      switch (pr.t) {
        case 'spec': return h('div', { 'class': 'pr' }, signEl(pr.sid, pr.text), pr.sub ? h('div', { 'class': 'pr-sub' }, pr.sub) : null);
        case 'place': return h('div', { 'class': 'pr' }, h('div', { 'class': 'roadsign' }, pr.main), h('div', { 'class': 'pr-sub' }, pr.sub));
        default: return h('div', { 'class': 'pr' }, h('div', { 'class': 'pr-main pr-main-sm' }, pr.main), pr.sub ? h('div', { 'class': 'pr-sub' }, pr.sub) : null);
      }
    }

    var answerEl = null, feedbackEl = null, optBtns = [];

    function renderQuestion() {
      phase = 'asking'; lastAnswer = null;
      var total = sess.total, isMap = q.mode === 'map';
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      optBtns = [];
      var pct = total ? Math.round(sess.idx / total * 100) : 0;
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', id: 'q-exit', 'aria-label': 'Oturumdan çık', title: 'Çık', onclick: exitSession }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': total || 100, 'aria-valuenow': sess.idx }, h('i', { style: { width: (total ? pct : 8) + '%' } })),
          h('span', {}, (total ? (sess.idx + 1) + ' / ' + total : (sess.idx + 1) + '. soru') + (q.retry ? ' · tekrar' : ''))),
        h('div', { 'class': 'qscore', title: 'Art arda doğru' }, UI.icon('flame', 15), h('b', {}, sess.run))));

      hb = q.hints && q.hints.length ? UI.hintBox(q.hints, { onStep: onHintStep }) : null;
      var pe = promptEl(q.prompt);
      if (isMap) {
        pe.classList.add('pr-sm');
        panelTop.appendChild(h('div', { 'class': 'qprompt', 'aria-live': 'polite' }, pe));
      } else {
        panelBody.appendChild(h('div', { 'class': 'qprompt', 'aria-live': 'polite' }, h('div', { 'class': 'qtitle' }, q.title, q.retry ? h('span', { 'class': 'pill pill-retry' }, 'tekrar') : null), pe));
      }
      answerEl = h('div', { 'class': 'answer' });
      var skipBtn = h('button', { type: 'button', 'class': 'btn btn-ghost', id: 'q-skip', onclick: function () { finish('skip', {}); } }, UI.icon('skip', 14), 'Bilmiyorum');
      if (q.mode === 'mc') buildMC();
      else answerEl.appendChild(h('p', { 'class': 'micro' }, q.kind === 'loc' ? 'Haritada eyaleti bul ve dokun. Küçük yerler için yakınlaştır.' : 'Haritayı kaydır / yakınlaştır, sonra doğru yere dokun.'));
      panelBody.appendChild(answerEl);
      if (hb) panelBody.appendChild(hb.box);
      feedbackEl = h('div', { 'class': 'feedback', hidden: true });
      panelBody.appendChild(feedbackEl);
      L.foot([hb ? hb.bar : null, skipBtn]);

      sheet.snap(isMap ? 'peek' : 'fit', { max: q.focus && q.focus.length ? 0.58 : 1 });
      map.setMesh(quizMesh()); map.setFill(quizFill()); map.setLabels(null);
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      if (q.focus && q.focus.length) { map.highlight(q.focus, 'hl-q'); map.setLocatorTarget(q.focus[0]); map.focusOn(q.focus, { minPx: 60, ctx: 3.2 }); }
      else map.fitAll(true);
      map.setHint(isMap ? (q.kind === 'loc' ? 'Haritada dokun: ' + q.prompt.main : 'Haritada dokun: bu yazı nerede baskın?') : null);
    }

    function onHintStep(st, i, replay) {
      if (phase !== 'asking' || !q) return;
      if (!replay) sheet.snap('fit', { max: q.mode === 'map' || (q.focus && q.focus.length) ? 0.6 : 1 });
      if (st.ids && st.ids.length) {
        map.clearHighlight('hl-ctx'); map.highlight(st.ids, 'hl-ctx'); map.fitTo(st.ids, { pad: 56, maxK: 6 });
      }
      if (!replay) setTimeout(function () { if (hb && phase === 'asking') hb.reveal(panelBody); }, 340);
    }

    function optLabel(o) {
      if (o.kind === 'spec') return h('span', { 'class': 'opt-spec' }, sp(o.spec.sid, o.spec.text, 'opt-spec-t' + lenCls(o.spec.text, 'spec')));
      if (o.kind === 'script') return h('span', { 'class': 'opt-l' }, o.label, h('small', { 'class': 'opt-nat' }, sp(o.subScript, o.sub)));
      return h('span', { 'class': 'opt-l' }, o.label, o.sub ? h('small', {}, o.sub) : null);
    }
    function buildMC() {
      var grid = h('div', { 'class': 'opts' + (q.kind === 'pair' ? ' opts-pair' : '') });
      q.options.forEach(function (o, i) {
        var b = h('button', { type: 'button', 'class': 'opt' + (o.kind === 'spec' ? ' opt-spec-b' : ''), 'data-id': o.id, onclick: function () { choose(o); } }, h('kbd', {}, i + 1), optLabel(o));
        optBtns.push(b); grid.appendChild(b);
      });
      answerEl.appendChild(grid);
    }
    function choose(o) {
      if (phase !== 'asking') return;
      finish(String(o.id) === String(q.correct) ? 'ok' : 'bad', { chosen: o.id, chosenLabel: o.label });
    }

    function onMapClick(hit) {
      if (phase === 'setup') {
        var id0 = B.resolveTap(map, hit);
        if (!id0 || !scopeChipsRef) return;
        var fam = S[P[id0].main[0]].fam;
        var i = cfg.fams.indexOf(fam);
        if (i >= 0) cfg.fams.splice(i, 1); else cfg.fams.push(fam);
        scopeChipsRef.set(cfg.fams);
        persist();
        map.setFill(quizFill());
        UI.toast(cfg.fams.length ? 'Kapsam: ' + cfg.fams.map(function (fid) { return B.famOf(D.SCRIPTS.filter(function (s) { return s.fam === fid; })[0].id).label; }).join(', ') : 'Kapsam: tüm yazı aileleri');
        return;
      }
      if (phase !== 'asking' || !q || q.mode !== 'map') return;
      var id = B.resolveTap(map, hit);
      if (!id) { UI.toast('Bir yerin üzerine dokun.'); return; }
      var ok = q.accept.indexOf(id) >= 0;
      finish(ok ? 'ok' : 'bad', { clicked: id });
    }

    /* =================== AÇIKLAMA =================== */
    function finish(res, extra) {
      if (phase !== 'asking') return;
      phase = 'revealed';
      extra = extra || {};
      extra.ids = (q.reveal && q.reveal.ids || []).slice();
      extra.hints = hb ? hb.count : 0;
      if (hb) hb.lock();
      sess.record(q, res, extra);
      lastAnswer = { res: res, extra: extra };
      reveal(res, extra);
    }

    function reveal(res, extra) {
      var R = q.reveal, isMap = q.mode === 'map';
      optBtns.forEach(function (b) {
        b.disabled = true;
        var id = b.getAttribute('data-id');
        if (String(id) === String(q.correct)) b.classList.add('ok');
        else if (extra.chosen != null && String(id) === String(extra.chosen)) b.classList.add('bad');
        var o = q.options.filter(function (x) { return String(x.id) === String(id); })[0];
        if (o && o.kind === 'spec' && o.label) b.appendChild(h('small', { 'class': 'opt-name' }, o.label));
      });
      U.$$('.opt-nat', answerEl).forEach(function (el) { el.hidden = false; });
      if (isMap) { answerEl.hidden = true; var qp = U.$('.qprompt', panelTop); if (qp) qp.remove(); }

      map.setMesh({ 'in': true, rg: false, mc: true, co: true }); map.setFill(quizFill());
      map.clearHighlight('hl-q'); map.clearHighlight('hl-ctx'); map.clearOverlays();
      map.highlight(R.ids, 'hl-ok');
      var fitIds = R.ids.slice();
      var showLbl = R.ids.length <= 7 ? R.ids.slice() : (R.primary ? [R.primary] : []);
      if (extra.clicked && res === 'bad') { map.highlight([extra.clicked], 'hl-bad'); fitIds.push(extra.clicked); showLbl.push(extra.clicked); }
      map.setLabels(function (id) { return showLbl.indexOf(id) >= 0 ? P[id].short : null; }, { size: 11.5, fit: 1.7 });
      map.forceLabels(showLbl);
      map.setHint(null);
      map.setLocatorTarget(R.ids[0]);

      var hinted = res === 'ok' && extra.hints > 0;
      var titleTxt = res === 'ok' ? (hinted ? 'Doğru — ipucuyla' : 'Doğru') : res === 'skip' ? 'Atlandı' : 'Yanlış';
      var given = null, nearNote = null;
      if (res === 'bad') {
        if (extra.clicked) {
          given = 'Dokunduğun: ' + nameOf(extra.clicked) + ' (' + B.scriptNames(P[extra.clicked].main) + ')';
          if (q.near && q.near.indexOf(extra.clicked) >= 0) nearNote = nameOf(extra.clicked) + ' bölgesinde bu yazı da görülür ama baskın değildir.';
        } else if (extra.chosenLabel != null) given = 'Seçtiğin: ' + extra.chosenLabel;
      }
      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'q-next', onclick: next }, sess.done ? 'Sonucu gör' : 'Sonraki', UI.icon('arrow', 16));
      var cardOpts = { compact: true, onPlace: openInExplore, onScript: function (sid) { app.launch = { script: sid }; app.go('alfabe'); } };
      var card = !R.card ? null : R.card.k === 'script' ? scriptCard(R.card.id, cardOpts) : placeCard(R.card.id, cardOpts);
      U.clear(feedbackEl);
      feedbackEl.hidden = false;
      feedbackEl.className = 'feedback fb-' + res;
      feedbackEl.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(res === 'ok' ? 'check' : 'x', 18), h('b', {}, titleTxt)),
        h('p', { 'class': 'fb-ans' }, 'Cevap: ', h('b', {}, q.answerText), given ? h('span', { 'class': 'fb-given' }, ' · ' + given) : null),
        nearNote ? h('p', { 'class': 'micro' }, nearNote) : null,
        q.note ? h('p', { 'class': 'micro' }, q.note) : null,
        hinted ? h('p', { 'class': 'micro micro-hint' }, UI.icon('bulb', 13), 'İpucu kullandın: bu soru ustalığa sayılmadı, birkaç soru sonra ipucusuz yeniden gelecek.') : null));
      if (card) feedbackEl.appendChild(h('div', { 'class': 'compact' }, card));
      L.foot([nextBtn]);
      sheet.snap('fit', { max: 0.62 });
      map.fitTo(fitIds, { pad: 56, maxK: 8 });
      nextBtn.focus({ preventScroll: true });
      U.toPanel(feedbackEl, true);
    }

    /* =================== ÖZET =================== */
    function exitSession() {
      if (!sess || !sess.log.length) { showSetup(); return; }
      UI.modal({ title: 'Oturum bitsin mi?', body: h('p', {}, sess.log.length + ' soru cevapladın. İlerlemen kaydedildi; şimdi bitirirsen özet görürsün.'),
        actions: [{ label: 'Devam et', value: false }, { label: 'Özeti gör', primary: true, value: true }] }).then(function (v) { if (v) showSummary(); });
    }
    function missedLabel(l) {
      var pr = l.prompt || {};
      if (pr.t === 'spec') return h('span', { 'class': 'm-q' }, sp(pr.sid, pr.text));
      if (pr.t === 'place') return h('span', { 'class': 'm-q' }, pr.main);
      return h('span', { 'class': 'm-q' }, pr.main || l.key);
    }
    function showSummary() {
      phase = 'summary';
      var log = sess.log, n = log.length, secs = (Date.now() - sess.t0) / 1000;
      if (n) {
        Store.data.sessions = Store.data.sessions || [];
        Store.data.sessions.push({ t: Date.now(), n: n, ok: sess.clean, h: sess.hinted, secs: Math.round(secs), src: 'as' });
        if (Store.data.sessions.length > 60) Store.data.sessions.shift();
        Store.data.stats.bestRun = Math.max(Store.data.stats.bestRun || 0, sess.bestRun);
        Store.flush();
      }
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      U.toPanel(null);
      map.setMesh(quizMesh()); map.setHint(null);
      map.clearHighlight(); map.clearOverlays(); map.setLabels(null); map.setLocatorTarget(null);
      var res = {};
      log.forEach(function (l) { (l.ids || []).forEach(function (id) { if (P[id]) res[id] = (res[id] === 'bad' || l.res !== 'ok') ? 'bad' : 'ok'; }); });
      map.setFill(function (id) { return res[id] === 'ok' ? 'sok' : res[id] === 'bad' ? 'sbad' : 'qn'; });

      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Oturum özeti')));
      var clean = sess.clean, hinted = sess.hinted, frac = n ? clean / n : 0, cats = {};
      log.forEach(function (l) { var c = B.catOfKind(l.kind), k = c ? c.label : l.kind; cats[k] = cats[k] || { n: 0, ok: 0 }; cats[k].n++; if (l.res === 'ok' && !(l.hints > 0)) cats[k].ok++; });
      var missed = log.filter(function (l) { return l.res !== 'ok' || l.hints > 0; });
      panelBody.appendChild(h('div', { 'class': 'sum-head' }, UI.ring(frac, 104, 'Doğruluk ' + Math.round(frac * 100) + ' yüzde'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, clean + ' / ' + n), h('small', {}, hinted ? 'ipucusuz doğru' : 'doğru')),
          hinted ? h('div', {}, h('b', {}, hinted), h('small', {}, 'ipucuyla doğru')) : null,
          h('div', {}, h('b', {}, U.fmtTime(secs)), h('small', {}, 'süre')),
          h('div', {}, h('b', {}, sess.bestRun), h('small', {}, 'en uzun seri')))));
      panelBody.appendChild(UI.sec('Kategoriler', h('div', { 'class': 'bars' }, Object.keys(cats).map(function (k) {
        var c = cats[k];
        return h('div', { 'class': 'barrow' }, h('span', {}, k), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(c.ok / c.n * 100) + '%' } })), h('b', {}, c.ok + '/' + c.n));
      }))));
      if (missed.length) {
        var seen = {};
        var uniqMissed = missed.filter(function (l) { if (seen[l.key]) return false; seen[l.key] = 1; return true; });
        panelBody.appendChild(h('section', { 'class': 'sec' },
          h('h4', {}, 'Tekrar edilecekler ', h('small', {}, '(' + uniqMissed.length + (hinted ? ' · ipucuyla bildiklerin dahil' : '') + ')')),
          h('ul', { 'class': 'missed' }, uniqMissed.map(function (l) {
            return h('li', {}, missedLabel(l), UI.icon('arrow', 14), h('b', {}, l.label), l.res === 'ok' ? h('span', { 'class': 'pill pill-hint' }, 'ipucuyla') : null);
          }))));
      } else if (n) panelBody.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, h('b', {}, 'Hatasız oturum. '), 'Doğru öğeler daha seyrek sorulacak.')));
      var retryKeys = U.uniq(missed.map(function (l) { return l.key; }));
      var retryBtn = retryKeys.length ? h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sum-retry', onclick: function () {
        start(Object.assign({}, cfg, { keys: retryKeys, count: 0 }));
      } }, UI.icon('refresh', 16), 'Hataları tekrar et') : null;
      var newBtn = h('button', { type: 'button', 'class': 'btn' + (retryKeys.length ? '' : ' btn-primary'), id: 'sum-new', onclick: function () { showSetup(); } }, 'Yeni oturum');
      panelBody.appendChild(h('a', { 'class': 'btn btn-ghost', href: app.href('ilerleme'), style: { alignSelf: 'flex-start' } }, 'İlerlemeye bak'));
      L.foot([retryBtn, newBtn]);
      sheet.snap('half');
      map.fitAll(true);
    }

    /* =================== KLAVYE =================== */
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (phase === 'asking' && hb && (e.key === 'h' || e.key === 'H') && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); hb.press(); }
      else if (phase === 'asking' && q && q.mode === 'mc' && /^[1-9]$/.test(e.key) && tag !== 'INPUT') {
        var i = +e.key - 1;
        if (optBtns[i]) { e.preventDefault(); optBtns[i].click(); }
      } else if (phase === 'revealed' && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') && tag !== 'INPUT' && tag !== 'A') {
        var nb = document.getElementById('q-next');
        if (nb && document.activeElement !== nb) { e.preventDefault(); nb.click(); }
      }
    }
    document.addEventListener('keydown', onKey);

    /* =================== AÇILIŞ =================== */
    var launch = app.launch; app.launch = null;
    if (launch && launch.preset) {
      var pr = B.PRESETS.filter(function (p) { return p.id === launch.preset; })[0];
      if (pr) { showSetup(true); start(Object.assign({}, DEFAULT, pr.cfg, { fams: (pr.cfg.fams || []).slice() })); } else showSetup();
    } else if (launch && launch.keys) {
      showSetup(true);
      start(Object.assign({}, DEFAULT, { keys: launch.keys, count: 0 }, launch.mapmode ? { mapmode: launch.mapmode } : {}));
    } else {
      showSetup();
    }

    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.exploreAs = { mount: mountExploreAs };
  g.Views.guideAs = { mount: mountGuideAs };
  g.Views.practiceAs = { mount: mountPracticeAs };
  g.Views.alfabe = { mount: mountGuideAs };
  g.AlfabeUI = { loadFonts: loadFonts, scriptCard: scriptCard, placeCard: placeCard, sp: sp, signEl: signEl, swatch: swatch, scriptChip: scriptChip, placeChip: placeChip };
})(typeof window !== 'undefined' ? window : globalThis);

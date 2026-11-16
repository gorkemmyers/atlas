/* view-hub.js — Ana sayfa: aranabilir çok ülkeli indeks, devam bandı, günlük özet, yedek */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, Store = g.Store, SRS = g.SRS, R = g.Regions, h = U.h, s = U.s;

  function haystack(r) {
    return U.fold([r.name, r.short, r.code, r.area, r.line, r.blurb]
      .concat((r.sections || []).map(function (s) { return s.label + ' ' + (s.desc || ''); })).join(' '));
  }


  /* ---- Plaka haritası: kara noktalarla çizilen dünya; kapsanan ülkeler yol plakası gibi işaretlenir ---- */
  var PIN = {
    vietnam: [107, 15.5], guneyasya: [79, 22], brazil: [-53, -11], japan: [141.5, 36.5], indonesia: [114, -2.2],
    guneykore: [126.5, 35.5], mexico: [-102, 23.5], russia: [96, 61], turkiye: [35, 39]
  };
  var DOTS = null;
  function landDots() {
    if (DOTS) return DOTS;
    var WG = g.WORLD_GEO, STEP = 2.5, LON0 = -180, LAT_N = 76, LAT_S = -58, polys = [], out = [];
    DOTS = { step: STEP, lat: [LAT_S, LAT_N], pts: out };
    if (!WG || !WG.l) return DOTS;
    WG.l.forEach(function (q) {
      if (!q || q.length < 4) return;
      var xs = [], ys = [], x = q[0], y = q[1], mnx = 1e9, mxx = -1e9, mny = 1e9, mxy = -1e9, j;
      xs.push(x / 100); ys.push(y / 100);
      for (j = 2; j + 1 < q.length; j += 2) { x += q[j]; y += q[j + 1]; xs.push(x / 100); ys.push(y / 100); }
      xs.forEach(function (v, i) { if (v < mnx) mnx = v; if (v > mxx) mxx = v; if (ys[i] < mny) mny = ys[i]; if (ys[i] > mxy) mxy = ys[i]; });
      polys.push({ xs: xs, ys: ys, b: [mnx, mny, mxx, mxy] });
    });
    for (var lat = LAT_N - STEP / 2; lat > LAT_S; lat -= STEP) {
      for (var lon = LON0 + STEP / 2; lon < 180; lon += STEP) {
        var inside = false;
        for (var i = 0; i < polys.length; i++) {
          var P = polys[i], b = P.b;
          if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue;
          var c = false, n = P.xs.length;
          for (var a = 0, d = n - 1; a < n; d = a++) {
            if (((P.ys[a] > lat) !== (P.ys[d] > lat)) && (lon < (P.xs[d] - P.xs[a]) * (lat - P.ys[a]) / (P.ys[d] - P.ys[a]) + P.xs[a])) c = !c;
          }
          if (c) inside = !inside;
        }
        if (inside) out.push([lon, lat]);
      }
    }
    return DOTS;
  }

  function plateMap() {
    var D = landDots(), W = 1200, st = D.step, H = Math.round(W * (D.lat[1] - D.lat[0]) / 360), k = W / 360;
    function X(lon) { return (lon + 180) * k; }
    function Y(lat) { return (D.lat[1] - lat) * k; }
    var r = (st * k * 0.36).toFixed(2), d = [];
    D.pts.forEach(function (p) { d.push('M' + (X(p[0]) - r).toFixed(1) + ' ' + Y(p[1]).toFixed(1) + 'a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0'); });
    var svg = s('svg', { 'class': 'pm-svg', viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true', focusable: 'false' },
      s('path', { d: d.join(''), 'class': 'pm-dots' }));
    var wrap = h('div', { 'class': 'pm', role: 'group', 'aria-label': 'Kapsanan ülkeler haritası' }, svg);
    R.list.forEach(function (r0) {
      var at = PIN[r0.id]; if (!at) return;
      wrap.appendChild(h('a', {
        'class': 'pm-pin tone-' + r0.tone, href: '#' + r0.id, title: r0.name + ' · ' + r0.line,
        style: { left: (X(at[0]) / W * 100).toFixed(2) + '%', top: (Y(at[1]) / H * 100).toFixed(2) + '%' }
      }, h('b', {}, r0.code), h('span', { 'class': 'pm-tip' }, h('strong', {}, r0.name), h('small', {}, r0.line))));
    });
    return wrap;
  }

  function mount(root) {
    var inn = h('div', { 'class': 'page-in hub-in' });
    root.appendChild(h('div', { 'class': 'page', id: 'hub' }, inn));

    var state = { query: '', area: 'all', started: false };
    var groupsHost = null, filterBar = null;

    function quickLinks(r) {
      var want = ['kesfet', 'pratik', 'simulasyon'];
      var links = want.map(function (sid) { return R.section(r, sid); }).filter(Boolean);
      if (!links.length) return null;
      return h('div', { 'class': 'rg-quick' }, links.map(function (sx) {
        return h('a', { 'class': 'rg-q', href: '#' + R.hash(r.id, sx.id) }, UI.icon(sx.icon, 14), sx.label);
      }));
    }

    function card(r) {
      var pr = R.progress(r);
      var pct = pr.seen ? Math.round(pr.mean * 100) : 0;
      return h('article', { 'class': 'rg-card tone-' + r.tone, 'data-id': r.id },
        h('a', { 'class': 'rg-main', href: '#' + r.id },
          h('span', { 'class': 'rg-sil' }, R.silhouette(r)),
          h('span', { 'class': 'rg-txt' },
            h('span', { 'class': 'rg-head' },
              h('b', { 'class': 'rg-name' }, r.name),
              h('i', { 'class': 'rbadge tone-' + r.tone }, r.code),
              pr.seen ? h('span', { 'class': 'rg-pct' }, '%' + pct) : null),
            h('span', { 'class': 'rg-line' }, r.line),
            h('span', { 'class': 'rg-prog' },
              h('span', { 'class': 'bar' }, h('i', { style: { width: pct + '%' } })),
              h('small', {}, pr.seen ? U.fmtInt(pr.seen) + ' / ' + U.fmtInt(pr.total) + ' öğe' : U.fmtInt(pr.total) + ' öğe')))),
        quickLinks(r));
    }

    function renderGroups() {
      if (!groupsHost) return;
      U.clear(groupsHost);
      var q = U.fold(state.query.trim());
      var groups = R.groups(), shown = 0;
      groups.forEach(function (gr) {
        if (state.area !== 'all' && gr.area !== state.area) return;
        var list = gr.regions.filter(function (r) {
          if (state.started && !R.progress(r).seen) return false;
          if (q && haystack(r).indexOf(q) < 0) return false;
          return true;
        });
        if (!list.length) return;
        shown += list.length;
        groupsHost.appendChild(h('section', { 'class': 'rg-group', 'aria-label': gr.area },
          h('h2', {}, gr.area, h('small', {}, list.length + ' bölge')),
          h('div', { 'class': 'rg-grid' }, list.map(card))));
      });
      if (!shown) {
        groupsHost.appendChild(UI.empty('Eşleşen bölge yok', 'Aramayı temizleyip tüm bölgeleri görebilirsin.',
          [h('button', { type: 'button', 'class': 'btn btn-sm', onclick: function () {
            state.query = ''; state.area = 'all'; state.started = false; render();
          } }, 'Filtreleri sıfırla')]));
      }
    }

    function paintFilters() {
      if (!filterBar) return;
      U.$$('.chip', filterBar).forEach(function (b) {
        var f = b.getAttribute('data-f');
        var on = f === 'started' ? state.started : (!state.started && state.area === f);
        b.classList.toggle('on', on);
      });
    }

    function render() {
      U.clear(inn);
      var st = Store.data.stats, acc = st.answered ? st.correct / st.answered : 0;
      var kpis = st.answered ? h('div', { 'class': 'hub-kpis' },
        h('span', { 'class': 'hub-kpi' }, h('b', {}, SRS.today()), ' bugün'),
        h('span', { 'class': 'hub-kpi' }, h('b', {}, SRS.streak()), ' gün seri'),
        h('span', { 'class': 'hub-kpi' }, h('b', {}, U.fmtPct(acc)), ' doğruluk')) : null;

      inn.appendChild(h('header', { 'class': 'hub-head' },
        h('div', { 'class': 'hub-top' },
          h('div', { 'class': 'hub-title' },
            h('h1', {}, 'GeoGuessr Atlası'),
            h('p', { 'class': 'lead' }, 'Harita keşfi, konu rehberi, pratik ve simülasyon.')),
          kpis)));

      inn.appendChild(h('section', { 'class': 'pm-sec', 'aria-label': 'Dünya haritası' },
        h('div', { 'class': 'pm-scroll' }, plateMap()),
        h('p', { 'class': 'pm-note' }, R.list.length + ' bölge · plakaya dokun, ülkeye geç')));

      setTimeout(function () { var sc = inn.querySelector('.pm-scroll'); if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) * 0.85; }, 0);

      var last = R.last();
      if (last) {
        var lpr = R.progress(last.region);
        inn.appendChild(h('a', { 'class': 'cont tone-' + last.region.tone, id: 'hub-cont', href: '#' + last.canon },
          h('span', { 'class': 'cont-t' },
            h('small', {}, 'Kaldığın yerden devam et'),
            h('b', {}, last.region.short + ' · ' + last.section.label)),
          h('span', { 'class': 'cont-r' },
            lpr.seen ? h('small', { 'class': 'cont-pct' }, '%' + Math.round(lpr.mean * 100)) : null,
            UI.icon('arrow', 22))));
      }

      /* arama + kıta / durum süzgeci */
      var groups = R.groups();
      var anyStarted = R.list.some(function (r) { return R.progress(r).seen > 0; });
      var searchIn = h('input', {
        type: 'search', id: 'hub-search', 'class': 'input',
        value: state.query, placeholder: 'Ülke, kod veya konu ara…',
        autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Bölge ara'
      });
      searchIn.addEventListener('input', function () { state.query = searchIn.value; renderGroups(); });

      filterBar = h('div', { 'class': 'hub-filters', id: 'hub-filters' },
        h('button', { type: 'button', 'class': 'chip', 'data-f': 'all', onclick: function () {
          state.area = 'all'; state.started = false; paintFilters(); renderGroups();
        } }, 'Tümü ', h('small', {}, R.list.length)));
      if (groups.length > 1) {
        groups.forEach(function (gr) {
          filterBar.appendChild(h('button', { type: 'button', 'class': 'chip', 'data-f': gr.area, onclick: function () {
            state.area = gr.area; state.started = false; paintFilters(); renderGroups();
          } }, gr.area, ' ', h('small', {}, gr.regions.length)));
        });
      }
      if (anyStarted) {
        filterBar.appendChild(h('button', { type: 'button', 'class': 'chip', 'data-f': 'started', onclick: function () {
          state.started = !state.started; paintFilters(); renderGroups();
        } }, 'Çalıştıklarım'));
      }
      paintFilters();

      inn.appendChild(h('div', { 'class': 'hub-bar' },
        h('div', { 'class': 'search hub-search' }, UI.icon('search', 18), searchIn),
        filterBar));

      groupsHost = h('div', { 'class': 'hub-groups', id: 'hub-groups' });
      inn.appendChild(groupsHost);
      renderGroups();

      if (!Store.persistent) {
        inn.appendChild(h('div', { 'class': 'tipcard tipcard-warn' }, h('div', {},
          h('b', {}, 'Depolama kapalı. '), 'İlerleme bu sekmede geçici tutuluyor; aşağıdan yedek alabilirsin.')));
      }

      inn.appendChild(h('footer', { 'class': 'hub-foot' },
        h('span', {}, 'Fotoğraflar Wikimedia Commons’tan, yazar ve lisansları ile. '),
        h('a', { href: '#kaynaklar' }, 'Kaynaklar ve atıf')));

      /* veri ve yedek: ana alanı kaplamasın diye kapalı açılır bölüm */
      inn.appendChild(h('details', { 'class': 'fold hub-backup', id: 'hub-backup' },
        h('summary', {}, UI.icon('copy', 17), h('span', {}, 'Veri ve yedek'), h('small', { 'class': 'hub-bk-sub' }, 'Dışa / içe aktar · sıfırla')),
        h('div', { 'class': 'fold-body' },
          h('div', { 'class': 'row row-wrap' },
            h('button', { type: 'button', 'class': 'btn btn-sm', id: 'pg-export', onclick: function () {
              U.copy(Store.exportText()).then(function (ok) { UI.toast(ok ? 'Yedek panoya kopyalandı.' : 'Kopyalanamadı; metni elle seçmen gerekebilir.', ok ? null : 'bad'); });
            } }, UI.icon('copy', 14), 'Yedeği kopyala'),
            h('button', { type: 'button', 'class': 'btn btn-sm', id: 'pg-import', onclick: importFlow }, 'Yedeği yapıştır'),
            h('button', { type: 'button', 'class': 'btn btn-sm btn-danger-o', id: 'pg-reset', onclick: resetFlow }, UI.icon('trash', 14), 'Sıfırla')),
          h('p', { 'class': 'micro' }, 'Tüm bölgelerin ilerlemesi bu tarayıcıda saklanır.'))));
    }

    function importFlow() {
      var ta = h('textarea', { 'class': 'input', id: 'pg-import-text', rows: 6, placeholder: 'Yedek metnini buraya yapıştır…', spellcheck: 'false', 'aria-label': 'Yedek metni' });
      var holder = h('div', {}, ta);
      UI.modal({ title: 'Yedeği geri yükle', body: holder, actions: [{ label: 'Vazgeç', value: null }, { label: 'İçe aktar', primary: true, get: function () { return ta.value; } }] })
        .then(function (txt) {
          if (txt == null || !String(txt).trim()) return;
          var r = Store.importText(txt);
          if (r.ok) { UI.toast('Yedek yüklendi.'); render(); }
          else UI.toast(r.error, 'bad');
        });
    }
    function resetFlow() {
      UI.modal({ title: 'İlerleme sıfırlansın mı?', body: h('p', {}, 'Tüm bölgelerin kutuları, istatistikleri ve simülasyon skorları silinir. Bu işlem geri alınamaz.'),
        actions: [{ label: 'Vazgeç', value: false }, { label: 'Sıfırla', primary: true, danger: true, value: true }] })
        .then(function (v) { if (v) { Store.reset(); render(); UI.toast('İlerleme sıfırlandı.'); } });
    }

    render();
    return { destroy: function () { } };
  }

  g.Views = g.Views || {};
  g.Views.hub = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

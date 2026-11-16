/* view-explore.js — Keşfet: etkileşimli harita + il kartları */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.VN_DATA, B = g.Bank, Store = g.Store, Paint = g.Paint, h = U.h;

  function mount(root, app) {
    var S = Store.data.set;
    var color = Paint.MODES[S.color] ? S.color : 'region';
    var label = ['name', 'area', 'none'].indexOf(S.label) >= 0 ? S.label : 'name';
    var sel = null;
    var L = app.layout(root);

    /* ---- harita ---- */
    function meshFor() {
      return { 'in': true, rg: color === 'region', mc: color === 'macro', co: true };
    }
    var map = new g.MapView(L.stage, {
      mesh: meshFor(),
      tip: function (id) { var p = D.pById[id]; return B.shortName(p) + ' · ' + B.A0(p.area); },
      onClick: function (hit) { if (hit.id) select(hit.id, { fit: true }); else clearSel(); }
    });
    L.bind(map);

    /* ---- panel ----
       Başlık: yalnızca arama (panel kapalıyken de görünür).
       Gövde: seçili ilin kartı, kısa yollar, harita ayarları. */
    var input = h('input', { type: 'search', id: 'ex-search', 'class': 'input', placeholder: 'İl, yer, alan kodu ara', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Ara', 'aria-controls': 'ex-results', role: 'combobox', 'aria-expanded': 'false' });
    var results = h('ul', { id: 'ex-results', 'class': 'results', role: 'listbox', hidden: true });
    var searchBox = h('div', { 'class': 'search' }, UI.icon('search', 18), input, results);
    var featLink = h('a', { 'class': 'feat-link', href: app.href('iladlari'), id: 'ex-names-link' },
      UI.icon('bulb', 18), h('span', {}, h('b', {}, 'İl adından yerini tahmin et'), h('small', {}, 'Bình, Quảng, Hà-, Bắc-… ad kuralları')), UI.icon('arrow', 14));
    var detail = h('div', { 'class': 'detail' });
    var LABEL_OPTS = [{ v: 'name', label: 'Ad' }, { v: 'area', label: 'Kod', title: 'Alan kodu' }, { v: 'none', label: 'Kapalı' }];
    function setLabel(v) { label = v; S.label = v; Store.save(); applyLabels(); }
    function setColor(v) { color = v; S.color = v; Store.save(); applyAll(); }
    var colorOpts = Object.keys(Paint.MODES).filter(function (k) { return k !== 'plain'; }).map(function (k) { return { v: k, label: Paint.MODES[k].label }; });
    map.cfg.labels({ options: LABEL_OPTS, value: label, def: 'name', onChange: setLabel });
    map.cfg.colors({ options: colorOpts, value: color, def: 'region', onChange: setColor });
    map.cfg.legend(renderLegend);

    L.panel.appendChild(h('div', { 'class': 'p-top' }, h('div', { 'class': 'row' }, searchBox)));
    L.panel.appendChild(h('div', { 'class': 'p-body' }, detail, featLink));

    /* ---- davranış ---- */
    function renderLegend(box) {
      var items = Paint.legend(color);
      if (color === 'names') {
        box.appendChild(h('p', { 'class': 'micro' }, 'Renk = ad kuralı ailesi. Bir ile dokun: kartta adın hecelerini ve kuralı görürsün.'));
      }
      items.forEach(function (it) {
        var row = h('button', {
          type: 'button', 'class': 'lg-row',
          onmouseenter: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids, 'hl-ctx'); },
          onmouseleave: function () { map.clearHighlight('hl-ctx'); },
          onfocus: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids, 'hl-ctx'); },
          onblur: function () { map.clearHighlight('hl-ctx'); },
          onclick: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids, 'hl-ctx'); map.fitTo(it.ids, { pad: 30 }); }
        }, h('i', { 'class': 'sw ' + it.cls }), h('b', {}, it.label), h('span', {}, it.sub || ''));
        box.appendChild(row);
      });
      if (color === 'names') box.appendChild(h('a', { 'class': 'linkish', href: app.href('iladlari') }, 'Tüm kurallar ve istisnalar İl adları’nda'));
    }
    function applyLabels() { map.setLabels(Paint.labelFn(label)); }
    function applyAll() {
      map.setMesh(meshFor());
      map.setFill(function (id) { return Paint.cls(color, id); });
      applyLabels(); map.cfg.refresh();
      applySel();
    }
    function applySel() {
      map.clearHighlight('hl-sel');
      if (sel) map.highlight([sel], 'hl-sel');
      map.setLocatorTarget(sel);
      renderDetail();
    }
    function renderDetail() {
      U.clear(detail);
      if (!sel) {
        detail.appendChild(UI.empty('Bir il seç', 'Haritada bir ile dokun ya da yukarıdan ara.'));
        return;
      }
      detail.appendChild(UI.provCard(sel, { onSelect: function (id) { select(id, { fit: true }); } }));
    }
    function select(id, o) {
      o = o || {};
      sel = id;
      applySel();
      L.sheet.ensure('half');
      if (o.fit) map.fitTo([id], { pad: 56, maxK: 9 });
      if (o.scroll !== false) U.toPanel(detail); else U.toPanel(null);
    }
    function clearSel() { if (sel) { sel = null; applySel(); U.toPanel(null); if (L.sheet.state === 'half') L.sheet.snap('peek'); } }
    /* ---- arama ---- */
    var hits = [], active = -1;
    function closeResults() { results.hidden = true; input.setAttribute('aria-expanded', 'false'); active = -1; }
    function renderResults() {
      U.clear(results);
      if (!hits.length) {
        if (input.value.trim()) { results.appendChild(h('li', { 'class': 'res-empty' }, 'Sonuç yok')); results.hidden = false; input.setAttribute('aria-expanded', 'true'); }
        else closeResults();
        return;
      }
      hits.forEach(function (r, i) {
        results.appendChild(h('li', {
          role: 'option', id: 'ex-r' + i, 'class': 'res' + (i === active ? ' on' : ''), 'aria-selected': i === active ? 'true' : 'false',
          onmousedown: function (e) { e.preventDefault(); pickHit(r); }
        }, h('b', {}, r.label), h('span', {}, r.sub)));
      });
      results.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    function pickHit(r) {
      closeResults(); input.value = ''; input.blur();
      L.sheet.snap('half');
      select(r.id, { fit: true });
      if (r.type === 'place') UI.toast(r.label + ' → ' + B.shortName(D.pById[r.id]));
    }
    input.addEventListener('input', function () { hits = B.search(input.value); active = -1; renderResults(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (hits.length) { active = (active + 1) % hits.length; renderResults(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (hits.length) { active = (active - 1 + hits.length) % hits.length; renderResults(); } }
      else if (e.key === 'Enter') { if (hits.length) { e.preventDefault(); pickHit(hits[Math.max(0, active)]); } }
      else if (e.key === 'Escape') { closeResults(); input.blur(); }
    });
    input.addEventListener('blur', function () { setTimeout(closeResults, 120); });
    /* panel kapalıyken yazmaya başlayınca tam aç: sonuçlar rahat görünsün */
    input.addEventListener('focus', function () { L.sheet.snap('full'); });
    function onDocKey(e) {
      if (e.key === '/' && document.activeElement && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    }
    document.addEventListener('keydown', onDocKey);

    applyAll();
    var wantSel = null;
    if (app.launch && app.launch.select) { wantSel = app.launch.select; app.launch = null; }
    L.sheet.snap(wantSel && D.pById[wantSel] ? 'half' : 'peek', { instant: true });
    if (wantSel && D.pById[wantSel]) select(wantSel, { fit: true, scroll: false });

    return { destroy: function () { document.removeEventListener('keydown', onDocKey); map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.explore = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

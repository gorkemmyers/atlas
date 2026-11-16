/* paint.js — harita renklendirme kipleri, lejantlar ve etiket metinleri */
(function (g) {
  'use strict';
  var D = g.VN_DATA, B = g.Bank, SRS = g.SRS, Nm = g.Names;
  var P = D.provinces;

  var MACRO_Q = { N: 4, C: 2, S: 6 };
  var famIdx = {};
  D.families.forEach(function (f, i) { famIdx[f.k] = i; });
  function decade(codes) {
    var cnt = {}, best = null;
    codes.forEach(function (c) { var d = c.charAt(0); cnt[d] = (cnt[d] || 0) + 1; });
    Object.keys(cnt).forEach(function (d) { if (best === null || cnt[d] > cnt[best] || (cnt[d] === cnt[best] && d > best)) best = d; });
    return best;
  }
  function famOfArea(a) { return a.slice(0, 2); }

  var MODES = {
    region: { label: 'Bölge' },
    macro:  { label: 'Kuzey / Orta / Güney' },
    names:  { label: 'İl adı mantığı', feat: true },
    area:   { label: 'Alan kodu ailesi' },
    plain:  { label: 'Düz' }
  };

  /* id → sınıf */
  function cls(mode, id) {
    var o = D.pById[id];
    if (!o) return '';
    switch (mode) {
      case 'region': return 'q' + B.regIdx[o.region];
      case 'macro': return 'q' + MACRO_Q[o.macro];
      case 'names': {
        var f = Nm.famOf(id);
        return f ? f.cls : 'qn';
      }
      case 'area': return 'q' + famIdx[famOfArea(o.area)];
      case 'plain': return 'qn';
    }
    return '';
  }

  /* lejant: [{cls, label, sub, ids}] */
  function legend(mode) {
    var out = [];
    function idsOf(fn) { return P.filter(fn).map(function (o) { return o.id; }); }
    if (mode === 'region') {
      D.regions.forEach(function (r) {
        out.push({ cls: 'q' + B.regIdx[r.id], label: r.short, sub: r.vi, ids: idsOf(function (o) { return o.region === r.id; }) });
      });
    } else if (mode === 'macro') {
      D.macros.forEach(function (m) {
        out.push({ cls: 'q' + MACRO_Q[m.id], label: m.tr, sub: m.vi, ids: idsOf(function (o) { return o.macro === m.id; }) });
      });
    } else if (mode === 'names') {
      Nm.FAMS.forEach(function (f) {
        var ids = idsOf(function (o) { var ff = Nm.famOf(o.id); return !!ff && ff.id === f.id; });
        if (ids.length) out.push({ cls: f.cls, label: f.label, sub: f.sub, ids: ids, fam: f.id });
      });
    } else if (mode === 'area') {
      D.families.forEach(function (f, i) {
        var short = f.tr.split(' (')[0].split(' + ')[0];
        out.push({
          cls: 'q' + i, label: f.k + (f.k === '24' || f.k === '28' ? '' : 'x'), sub: short,
          ids: idsOf(function (o) { return famOfArea(o.area) === f.k; })
        });
      });
    }
    return out;
  }

  /* etiket metni üreticisi */
  function labelFn(mode) {
    if (mode === 'none') return null;
    return function (id) {
      var o = D.pById[id];
      if (!o) return null;
      if (mode === 'name') return B.shortName(o);
      if (mode === 'area') return B.A0(o.area);
      return null;
    };
  }

  /* ustalık sınıfı (0..5) → 'm#' ; il bazında */
  function masteryOf(pid) {
    var keys = B.provKeys(pid), vals = [];
    Object.keys(keys).forEach(function (k) { if (keys[k].length) vals.push(SRS.mean(keys[k])); });
    return vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : 0;
  }
  function masteryCls(m) {
    if (m <= 0) return 'm0';
    return 'm' + Math.max(1, Math.min(5, Math.ceil(m * 5)));
  }

  g.Paint = { MODES: MODES, cls: cls, legend: legend, labelFn: labelFn, masteryOf: masteryOf, masteryCls: masteryCls, famOfArea: famOfArea, famIdx: famIdx };
})(typeof window !== 'undefined' ? window : globalThis);

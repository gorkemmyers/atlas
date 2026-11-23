/* country-engine.js — Çoklu ülke Atlas motoru: Keşfet, Rehber, Pratik (SRS), Simülasyon ve İlerleme */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, SRS = g.SRS, Store = g.Store, Paint = g.Paint, Geom = g.Geom;
  var h = U.h;

  var Packs = g.CountryPacks = g.CountryPacks || {};

  function normStr(str) {
    return String(str || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().trim();
  }

  function packGeom(pack) {
    if (!pack._geom) {
      var geo = g[pack.geoVar];
      pack._geom = Geom.make(geo);
    }
    return pack._geom;
  }

  function simStoreFor(packId) {
    var sb = Store.data.simBy = Store.data.simBy || {};
    sb[packId] = sb[packId] || { games: 0, best: 0, history: [] };
    return sb[packId];
  }

  function prefsFor(packId, key, def) {
    var all = Store.data.set.prefs = Store.data.set.prefs || {};
    var p = all[packId] = all[packId] || {};
    if (key && !(key in p) && def !== undefined) p[key] = def;
    return key ? p[key] : p;
  }

  function savePrefs(packId, key, val) {
    var p = prefsFor(packId);
    p[key] = val;
    Store.save();
  }

  function maskText(txt, unit) {
    var out = String(txt || '');
    [unit.name, unit.cap, unit.local, unit.short && unit.short.length > 2 ? unit.short : null].forEach(function (w) {
      if (!w) return;
      var esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(esc, 'gi'), '•••');
    });
    return out;
  }

  function allUnitsOf(pack, regId) {
    return pack.units.filter(function (u) { return u.reg === regId; }).map(function (u) { return u.id; });
  }

  function safeHintIds(pack, G, unit, preferIds) {
    var ids = (preferIds || []).filter(function (id) { return !!G.p[id]; });
    if (ids.length >= 2) return ids;
    var nbs = (G.p[unit.id] && G.p[unit.id].nb) ? G.p[unit.id].nb.slice() : [];
    var comb = [unit.id].concat(nbs);
    if (comb.length >= 2) return comb;
    var regIds = allUnitsOf(pack, unit.reg);
    if (regIds.length >= 2) return regIds;
    return pack.units.slice(0, 4).map(function (u) { return u.id; });
  }

  function colorClass(val, fallbackIdx) {
    if (typeof val === 'string' && val) return val;
    if (typeof val === 'number' && !isNaN(val)) return 'q' + (val % 12);
    return 'q' + ((fallbackIdx || 0) % 12);
  }

  function makeFillFn(pack, mode) {
    var UMap = pack.uById, RMap = pack.regById;
    var gm0 = (pack.colorModes || []).filter(function (m) { return m.id === mode && m.fillMap; })[0];
    if (gm0) return function (id) { return gm0.fillMap[id] || 'qn'; };
    if (mode === 'code') {
      return function (id) {
        var u = UMap[id];
        return u ? colorClass(u.codeCls, RMap[u.reg] ? RMap[u.reg].color : 0) : 'qn';
      };
    }
    if (mode === 'mastery') {
      return function (id) {
        var kLoc = pack.srsPrefix + ':loc:' + id;
        var kCode = pack.srsPrefix + ':code:' + id;
        var kClue = pack.srsPrefix + ':clue:' + id;
        var seen = SRS.rec(kLoc) || SRS.rec(kCode) || SRS.rec(kClue);
        if (!seen) return 'm0';
        var box = Math.max(SRS.box(kLoc), SRS.box(kCode), SRS.box(kClue));
        return 'm' + Math.min(5, Math.max(1, box));
      };
    }
    return function (id) {
      var u = UMap[id], r = u && RMap[u.reg];
      return r ? 'q' + (r.color % 12) : 'qn';
    };
  }

  /* renk anlamı: haritadaki renklerin bölge karşılıkları (ortak "Harita ayarları" penceresinde) */
  function fillPackLegend(box, pack, mode, map) {
    var rows = pack.legendFor ? pack.legendFor(mode, pack) : pack.regions.map(function (r) {
      return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: allUnitsOf(pack, r.id) };
    });
    rows.forEach(function (it) {
      box.appendChild(h('button', {
        type: 'button', 'class': 'lg-row', title: it.sub || '',
        onmouseenter: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids || [], 'hl-ctx'); },
        onmouseleave: function () { map.clearHighlight('hl-ctx'); },
        onclick: function () {
          map.clearHighlight('hl-ctx'); map.highlight(it.ids || [], 'hl-ctx');
          if (it.ids && it.ids.length) map.fitTo(it.ids, { pad: 44, maxK: pack.maxFitZoom || 8 });
        }
      }, h('i', { 'class': 'sw ' + it.cls }), h('b', {}, it.label), h('span', {}, (it.ids || []).length + ' ' + pack.unitLabel)));
    });
  }
  function labelOptions(pack) {
    var o = [{ v: 'short', label: 'Ad' }];
    if (hasLocal(pack)) o.push({ v: 'local', label: pack.localLabel });
    if (hasCodes(pack)) o.push({ v: 'code', label: pack.codeLabel.length > 10 ? 'Kod' : pack.codeLabel, title: pack.codeLabel });
    o.push({ v: 'none', label: 'Kapalı' });
    return o;
  }
  function makeLabelFn(pack, mode) {
    var UMap = pack.uById;
    if (mode === 'none') return null;
    if (mode === 'code') {
      return function (id) {
        var u = UMap[id];
        return u && u.codes && u.codes[0] ? u.codes[0] : (u ? u.short : '');
      };
    }
    if (mode === 'name') return function (id) { var u = UMap[id]; return u ? u.name : ''; };
    if (mode === 'local') return function (id) { var u = UMap[id]; return u ? (u.local || u.short) : ''; };
    return function (id) { var u = UMap[id]; return u ? u.short : ''; };
  }

  /* ============================================================================
   * PAKET ŞEMASI v2 — her ülke paketi veridir (js/packs/<ülke>.js). Motor veri UYDURMAZ:
   * olmayan alan olmayan kalır (ekranda gösterilmez). Şema ve kurallar: KURALLAR.md
   * ============================================================================ */
  /* Türkçe ek yardımcıları: ünlü uyumu; "DDD", "IATA" gibi kısaltmalara ek getirilmez (cümle yeniden kurulur) */
  function lastVowel(w) { var m = w.toLowerCase().match(/[aıoueiöüâî](?=[^aıoueiöüâî]*$)/); return m ? m[0] : 'e'; }
  function isVowel(ch) { return /[aıoueiöüâî]/i.test(ch); }
  function soften(w) {         // çok heceli ve -k ile biten sözcük: prefektörlük → prefektörlüğ-
    var nv = (w.match(/[aıoueiöüâî]/gi) || []).length;
    return (w.charAt(w.length - 1) === 'k' && nv >= 2) ? w.slice(0, -1) + 'ğ' : w;
  }
  function dat(w) {            // -e / -a hali: bölge → bölgeye, eyalet → eyalete, il → ile, ada → adaya
    var back = /[aıou]/.test(lastVowel(w));
    w = soften(w);
    var end = w.charAt(w.length - 1);
    return w + (isVowel(end) ? 'y' : '') + (back ? 'a' : 'e');
  }
  function gen(w) {            // -in / -ın / -un / -ün hali: eyalet → eyaletin, bölge → bölgenin
    var v = lastVowel(w); w = soften(w);
    var end = w.charAt(w.length - 1);
    var h2 = /[aı]/.test(v) ? 'ı' : /[eiöü]/.test(v) ? (/[öü]/.test(v) ? 'ü' : 'i') : /[ou]/.test(v) ? 'u' : 'i';
    if (v === 'ö' || v === 'ü') h2 = 'ü'; else if (v === 'o' || v === 'u') h2 = 'u'; else if (v === 'a' || v === 'ı') h2 = 'ı'; else h2 = 'i';
    return w + (isVowel(end) ? 'n' : '') + h2 + 'n';
  }
  /* DDD, IATA gibi kısaltmalar küçültülmez */
  function lcl(t) { return t === t.toUpperCase() ? t : t.toLowerCase(); }
  function hasCodes(pack) {
    return pack.units.some(function (u) { return u.codes && u.codes.length; });
  }
  /* yerel yazı (kanji, hangul…): paket localLabel verirse ve her birimde local varsa harita etiketi olur */
  function hasLocal(pack) {
    return !!pack.localLabel && pack.units.every(function (u) { return !!u.local; });
  }
  function labelOk(pack, v) {
    return labelOptions(pack).some(function (o) { return o.v === v; });
  }
  function unitsSharingCode(pack, u) {
    if (!u.codes || !u.codes.length) return [];
    return pack.units.filter(function (x) {
      return x.id !== u.id && x.codes && x.codes.some(function (c) { return u.codes.indexOf(c) >= 0; });
    });
  }

  /* birim kartı: yalnızca pakette gerçekten var olan bilgi gösterilir */
  /* Bölge bilgi bölümü: bu birimi ilgilendiren çözücü girdileri ve fotoğraf kartları, konu konu */
  function unitFindsEl(pack, u) {
    var secs = [];
    (pack.topics || []).forEach(function (t) {
      var ents = ((t.decoder && t.decoder.entries) || []).filter(function (e) { return e.ids && e.ids.indexOf(u.id) >= 0 && !((u.codes || []).indexOf(String(e.key)) >= 0 && e.ids.length === 1); });
      var vis = (t.visuals || []).filter(function (v) {
        if (!v.ids || v.ids.indexOf(u.id) < 0 || !v.set || !g.Kit) return false;
        var ks = g.Kit.setKeys(v.set);
        return ks.length > 0 && !ks.some(function (k) { return g.Kit.isFig(k); });
      });
      if (!ents.length && !vis.length) return;
      var shown = ents.slice(0, 6);
      secs.push(h('div', { 'class': 'chips-sec uf-sec' },
        h('h4', {}, t.navLabel || t.title),
        shown.length ? h('ul', { 'class': 'uf-list' }, shown.map(function (e) {
          return h('li', {}, h('b', {}, e.main || e.label || e.key), e.sub && (e.main || e.label) ? h('small', {}, e.sub) : null);
        })) : null,
        ents.length > shown.length ? h('p', { 'class': 'micro' }, '+ ' + (ents.length - shown.length) + ' ipucu daha: ' + (t.navLabel || t.title) + ' sekmesinde') : null,
        vis.slice(0, 2).map(function (v) {
          return h('div', { 'class': 'uf-vis' }, h('p', { 'class': 'micro' }, v.title), g.Kit.carousel(v.set, { compact: true, label: v.title }));
        })));
    });
    return secs.length ? h('div', { 'class': 'uf' }, h('h4', { 'class': 'uf-h' }, 'Bu bölgede ne aranır'), secs) : null;
  }

  function unitCardEl(pack, u, opts) {
    opts = opts || {};
    var r = pack.regById[u.reg];
    var G = g[pack.geoVar];
    var nbs = (G.p[u.id] && G.p[u.id].nb) || [];
    var same = unitsSharingCode(pack, u);
    var codeLbl = pack.codeLabel || 'Kod';
    var card = h('div', { 'class': 'pcard' },
      h('div', { 'class': 'pc-head' },
        h('div', { 'class': 'pc-title' },
          h('h3', {}, u.name, u.local && u.local !== u.name ? h('span', { 'class': 'pc-subname' }, ' · ' + u.local) : null),
          h('div', { 'class': 'pc-subrow' },
            r ? h('span', { 'class': 'rchip rchip-sm' }, h('i', { 'class': 'sw q' + (r.color % 12) }), r.tr) : null,
            u.cap ? h('span', { 'class': 'pc-cap' }, 'Merkez: ', h('b', {}, u.cap)) : null)),
        u.codes && u.codes.length ? h('div', { 'class': 'pc-badges', title: codeLbl }, u.codes.map(function (c) { return UI.code(c, codeLbl); })) : null),
      u.cue ? h('p', { 'class': 'cue' }, u.cue) : null,
      same.length ? h('div', { 'class': 'tipcard' }, h('div', {}, h('b', {}, 'Aynı ' + codeLbl.toLowerCase() + ' paylaşan: '),
        same.slice(0, 8).map(function (x) { return x.name; }).join(', ') + (same.length > 8 ? '…' : ''))) : null,
      u.trap ? h('div', { 'class': 'tipcard tipcard-warn' }, h('div', {}, h('b', {}, 'Karıştırma: '), u.trap)) : null,
      u.set && g.Kit ? g.Kit.carousel(u.set, { compact: true }) : null,
      opts.noFinds ? null : unitFindsEl(pack, u),
      nbs.length && opts.onSelect ? h('div', { 'class': 'pc-nbs' },
        h('span', { 'class': 'micro' }, 'Komşular: '),
        h('div', { 'class': 'chips' }, nbs.map(function (nid) {
          var nu = pack.uById[nid];
          if (!nu) return null;
          return h('button', { type: 'button', 'class': 'chip', onclick: function () { opts.onSelect(nid); } },
            nu.name, nu.codes && nu.codes[0] ? h('small', {}, nu.codes[0]) : null);
        }))) : null);
    return card;
  }

  var PACK_PROBLEMS = [];
  function problem(pack, msg) { PACK_PROBLEMS.push(pack.id + ': ' + msg); if (g.console) g.console.error('[paket ' + pack.id + '] ' + msg); }

  function normalizeIncomingPack(pack) {
    if (!pack) return pack;
    var origId = String(pack.id || '');
    pack.id = origId.replace(/-/g, '');
    pack.geoVar = pack.geoVar || pack.geoName;
    var codeStr = pack.code || pack.id.slice(0, 2).toUpperCase();
    pack.srsPrefix = pack.srsPrefix || String(codeStr).toLowerCase();
    pack.themeId = pack.themeId || ('th-' + pack.id);
    pack.unitLabel = pack.unitLabel || 'bölge';
    pack.unitLabelCap = pack.unitLabelCap || (pack.unitLabel.charAt(0).toUpperCase() + pack.unitLabel.slice(1));
    pack.codeLabel = pack.codeLabel || 'Kod';
    pack.simKmScale = pack.simKmScale || 520;
    pack.maxFitZoom = pack.maxFitZoom || 7;
    pack.labelSize = pack.labelSize || 9.2;
    if (!pack.themeCfg) problem(pack, 'themeCfg yok');
    if (!g[pack.geoVar]) problem(pack, 'geometri yok: ' + pack.geoVar);

    /* kuşaklar (haritada renk grubu) */
    pack.regions = (pack.regions || []).map(function (r, idx) {
      return { id: r.id, tr: r.tr, key: r.key || '', cue: r.cue || '', color: r.color != null ? r.color : idx % 12 };
    });
    var regMap = Object.create(null);
    pack.regions.forEach(function (r) { regMap[r.id] = r; });

    /* birimler: yalnızca verilen alanlar */
    var seenId = Object.create(null);
    pack.units = (pack.units || []).map(function (u) {
      var o = {
        id: u.id, name: u.name, short: u.short || (u.name.length <= 9 ? u.name : u.name.slice(0, 8) + '.'),
        local: u.local || '', cap: u.cap || '', reg: u.reg,
        codes: Array.isArray(u.codes) ? u.codes.filter(function (c) { return c !== '' && c != null; }).map(String) : [],
        cue: u.cue || '', trap: u.trap || '', set: u.set || '', extra: u.extra || ''
      };
      if (seenId[o.id]) problem(pack, 'yinelenen birim kimliği: ' + o.id);
      seenId[o.id] = 1;
      if (!regMap[o.reg]) problem(pack, 'birimin kuşağı yok: ' + o.id + ' → ' + o.reg);
      if (g[pack.geoVar] && g[pack.geoVar].p && !g[pack.geoVar].p[o.id]) problem(pack, 'birim haritada yok: ' + o.id);
      return o;
    });

    /* kod başına renk: pack.codePrefix = n (kodun ilk n karakteri aynıysa aynı renk) */
    if (pack.codePrefix) {
      var order = [];
      pack.units.forEach(function (u) {
        var p = u.codes[0] ? u.codes[0].slice(0, pack.codePrefix) : '';
        u.codeKey = p;
        if (p && order.indexOf(p) < 0) order.push(p);
      });
      pack.units.forEach(function (u) { u.codeCls = u.codeKey ? 'q' + (order.indexOf(u.codeKey) % 12) : 'qn'; });
      pack.codeGroups = order;
    }

    /* konular */
    pack.topics = (pack.topics || []).map(function (t) {
      t.key = t.key || t.id;
      t.navLabel = t.navLabel || t.title;
      t.mapMode = t.mapMode || 'reg';
      t.labelMode = t.labelMode || (t.codeTopic ? 'code' : 'short');
      t.drillPreset = t.drillPreset || 'mix';
      if (t.bandsFromRegions) {
        t.bands = pack.regions.map(function (r) {
          return { cls: 'q' + (r.color % 12), key: r.key || r.tr.slice(0, 6), title: r.tr, sub: r.cue, ids: allUnitsOf(pack, r.id) };
        });
      }
      /* fotoğraf kartları: yalnız fotoğrafı gerçekten tanımlı olanlar kalır (boş kart gösterilmez) */
      t.visuals = (t.visuals || []).filter(function (v) {
        var okSet = !!(v.set && g.Kit && g.Kit.setKeys(v.set).length);
        if (!okSet) (g.PACK_PENDING = g.PACK_PENDING || []).push(pack.id + ':' + (v.set || v.id));
        return okSet;
      });
      t.visuals.forEach(function (v) {
        v.ids = (v.ids || []).filter(function (id) { return !!seenId[id]; });
      });
      [t.bands, t.rules, t.flows].forEach(function (arr) {
        (arr || []).forEach(function (it) {
          if (it.ids) it.ids = it.ids.filter(function (id) { return !!seenId[id]; });
        });
      });
      return t;
    });
    if (!pack.topics.length) problem(pack, 'konu yok');

    /* konu başına çözücü (decoder): { title, placeholder, hint, entries:[{key,label,sub,keys,ids}] } ya da true (birim arama) */
    pack.facts = [];
    pack.topics.forEach(function (t) {
      if (t.decoder && typeof t.decoder === 'object' && t.decoder.entries) {
        var dd = t.decoder;
        dd.entries.forEach(function (e) {
          e.ids = (e.ids || []).filter(function (id) { return !!seenId[id]; });
          if (!e.ids.length) problem(pack, 'çözücü girdisi birimsiz: ' + t.key + '/' + e.key);
          if (e.quiz !== false && e.ids.length && t.practice !== 'visual') {
            pack.facts.push({ id: t.key + ':' + e.key, topic: t.key, main: e.main || e.key, sub: e.prompt || dd.quizPrompt || 'Bu ipucu hangi bölgede?', ids: e.ids, title: e.label, note: e.sub || '' });
          }
        });
        dd.title = dd.title || 'Çözücü';
        dd.hint = dd.hint || 'Yaz: tabelada gördüğünü bul.';
        dd.resolve = function (q) {
          var raw = String(q || '').toLowerCase().trim(), nq = normStr(q);
          if (!raw) return [];
          return dd.entries.filter(function (e) {
            var hayRaw = [e.key, e.label, e.sub, (e.keys || []).join(' ')].join(' ').toLowerCase();
            if (hayRaw.indexOf(raw) >= 0) return true;
            return nq.length > 1 && normStr(hayRaw).indexOf(nq) >= 0;
          }).map(function (e) { return { code: e.key, label: e.label, sub: e.sub || '', ids: e.ids, route: e.key, set: e.set }; });
        };
      }
    });

    /* çözücü: özel girdiler ya da birim araması */
    if (pack.decoder && pack.decoder.entries) {
      var ents = pack.decoder.entries;
      pack.decoder.resolve = function (q) {
        var nq = normStr(q);
        if (!nq) return [];
        return ents.filter(function (e) {
          return normStr([e.key, e.label, e.sub, (e.keys || []).join(' ')].join(' ')).indexOf(nq) >= 0;
        }).map(function (e) { return { code: e.key, label: e.label, sub: e.sub || '', ids: (e.ids || []).filter(function (id) { return !!seenId[id]; }) }; });
      };
    } else if (pack.topics.some(function (t) { return t.decoder === true; })) {
      var dd = pack.decoder || {};
      pack.decoder = {
        title: dd.title || (pack.codeLabel + ' çözücü'),
        placeholder: dd.placeholder || (pack.codeLabel + ' ya da ' + pack.unitLabel + ' adı yaz…'),
        hint: dd.hint || 'Tabelada gördüğün kodu yaz: hangi ' + pack.unitLabel + ' olduğunu ve haritadaki yerini gösterir.',
        resolve: function (q, pk) {
          var nq = normStr(q);
          if (!nq) return [];
          var hits = [];
          pk.units.forEach(function (u) {
            var r = pk.regById[u.reg];
            var hay = normStr([u.id, u.name, u.short, u.local, u.cap, (u.codes || []).join(' ')].join(' '));
            if (hay.indexOf(nq) >= 0) hits.push({ code: (u.codes && u.codes[0]) || u.short, label: u.name + (u.cap ? ' · ' + u.cap : ''), sub: r ? r.tr : '', ids: [u.id] });
          });
          return hits;
        }
      };
    }

    /* renk kipleri */
    if (!pack.colorModes) {
      pack.colorModes = [{ id: 'reg', label: 'Bölge' }];
      if (pack.codePrefix) pack.colorModes.push({ id: 'code', label: pack.codeModeLabel || 'Kod başı' });
    }
    /* konuya özel renk kipi: {id,label,groups:[{label,sub,ids,main?}]} → her grup bir renk (main: birincil boyama) */
    pack.colorModes.forEach(function (m) {
      if (!m.groups) return;
      m.fillMap = {}; m.legend = [];
      m.groups.forEach(function (gr, i) {
        var cls = gr.cls || ('q' + (i % 12));
        (gr.main || gr.ids || []).forEach(function (id) { if (!m.fillMap[id]) m.fillMap[id] = cls; });
        (gr.ids || []).forEach(function (id) { if (!seenId[id]) problem(pack, 'renk kipi ' + m.id + ': birim yok → ' + id); });
        m.legend.push({ cls: cls, label: gr.label, sub: gr.sub || '', ids: (gr.ids || []).slice() });
      });
    });
    if (!pack.legendFor) {
      pack.legendFor = function (mode, pk) {
        var gm1 = (pk.colorModes || []).filter(function (m) { return m.id === mode && m.legend; })[0];
        if (gm1) return gm1.legend;
        if (mode === 'code' && pk.codeGroups) {
          return pk.codeGroups.map(function (cg, i) {
            return { cls: 'q' + (i % 12), label: cg + (cg.length < 3 ? '…' : ''), sub: '', ids: pk.units.filter(function (u) { return u.codeKey === cg; }).map(function (u) { return u.id; }) };
          });
        }
        return pk.regions.map(function (r) {
          return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: allUnitsOf(pk, r.id) };
        });
      };
    }

    /* alıştırma türleri: yalnızca elde veri olan türler */
    var visualOk = pack.topics.some(function (t) { return (t.visuals || []).some(visualQuizable); });
    var cueN = pack.units.filter(function (u) { return u.cue; }).length;
    var clueOk = !!pack.clueQuiz && cueN >= Math.ceil(pack.units.length / 2);
    var factOk = pack.facts.length >= 4;
    var codeOk = hasCodes(pack);
    if (!pack.presets) {
      /* Soru yalnızca görülen şeyden gelir: fotoğraf, tabela/numara ya da yol işareti → haritada bölge. İsim ezberi sorusu yok. */
      var allQ = [];
      if (visualOk) allQ.push('visual', 'visual');
      if (factOk) allQ.push('fact', 'fact');
      if (codeOk) allQ.push('codeToUnit');
      if (!allQ.length) allQ.push('loc');
      pack.presets = [{ id: 'mix', label: 'Karışık', q: allQ }];
      if (codeOk) pack.presets.push({ id: 'code', label: pack.codeLabel, q: ['codeToUnit'] });
      pack.topics.forEach(function (t) {
        var tv = (t.visuals || []).some(visualQuizable);
        if (t.practice === 'visual' && tv) pack.presets.push({ id: t.key, label: t.navLabel, q: ['visual'], topic: t.key });
        else if (pack.facts.some(function (f) { return f.topic === t.key; })) pack.presets.push({ id: t.key, label: t.navLabel, q: ['fact'], topic: t.key });
        else if (tv) pack.presets.push({ id: t.key, label: t.navLabel, q: ['visual'], topic: t.key });
      });
      if (visualOk) pack.presets.push({ id: 'visual', label: 'Fotoğraf', q: ['visual'] });
    }
    if (!pack.simTypes) {
      pack.simTypes = [];
      if (visualOk) pack.simTypes.push({ v: 'photo', label: 'Fotoğraf' });
      pack.topics.forEach(function (t) {
        if (pack.facts.some(function (f) { return f.topic === t.key; })) pack.simTypes.push({ v: 'fact:' + t.key, label: t.navLabel });
      });
      if (codeOk) pack.simTypes.push({ v: 'code', label: pack.codeLabel });
      if (!pack.simTypes.length) pack.simTypes.push({ v: 'loc', label: 'Yalnızca yer adı' });
    }
    if (!pack.makeSimClue) {
      pack.makeSimClue = function (type, u, pk, helpers) {
        var cl = pk.codeLabel;
        if (type.indexOf('fact:') === 0) {
          var tk = type.slice(5);
          var fs = (pk.facts || []).filter(function (f) { return f.topic === tk && f.ids.indexOf(u.id) >= 0; });
          if (fs.length) {
            var pf = U.pick(fs);
            return {
              meaning: pf.title, ids: pf.ids.slice(), factKey: pk.srsPrefix + ':fact:' + pf.id,
              el: h('div', { 'class': 'clue-card-sv' }, h('span', { 'class': 'sv-kicker' }, 'İpucu'),
                h('div', { 'class': 'sv-codebox' }, h('b', { 'class': 'sv-big' }, pf.main)),
                h('p', { 'class': 'cue' }, pf.sub))
            };
          }
          type = (u.codes && u.codes.length) ? 'code' : 'loc';
        }
        if ((type === 'photo' || type.indexOf('photo:') === 0) && helpers.Kit) {
          var vs = [];
          pk.topics.forEach(function (t) {
            (t.visuals || []).forEach(function (v) { if (visualQuizable(v) && v.ids.indexOf(u.id) >= 0) vs.push(v); });
          });
          if (vs.length) {
            var pv = U.pick(vs);
            return {
              meaning: pv.title,
              ids: pv.ids.length > 1 ? pv.ids.slice() : null,   /* fotoğraf birden çok birimi gösteriyorsa hepsi doğru sayılır */
              el: h('div', { 'class': 'clue-card-sv' }, h('span', { 'class': 'sv-kicker' }, 'Fotoğraf ipucu'),
                helpers.Kit.carousel(pv.set, { quiz: true, compact: true, label: 'Tur fotoğrafı' }))
            };
          }
          type = (u.codes && u.codes.length) ? 'code' : 'loc';
        }
        if (type === 'code') {
          var c0 = (u.codes && u.codes.length) ? U.pick(u.codes) : u.short;
          var same = pk.units.filter(function (x) { return x.codes && x.codes.indexOf(c0) >= 0; }).map(function (x) { return x.id; });
          if (same.indexOf(u.id) < 0) same.push(u.id);
          return {
            meaning: c0 + ' → ' + same.map(function (id) { return pk.uById[id].name; }).join(', '),
            ids: same.length > 1 ? same : null,
            el: h('div', { 'class': 'clue-card-sv' },
              h('span', { 'class': 'sv-kicker' }, cl),
              h('div', { 'class': 'sv-codebox' }, UI.code(c0, cl)),
              h('p', { 'class': 'cue' }, 'Bu ' + cl + ' hangi ' + gen(pk.unitLabel) + ' kodu?' + (same.length > 1 ? ' (Kodu paylaşan herhangi birine dokun)' : '')))
          };
        }
        if (type === 'clue' && u.cue) {
          return { meaning: helpers.maskText(u.cue, u).slice(0, 80), el: h('div', { 'class': 'clue-card-sv' }, h('span', { 'class': 'sv-kicker' }, 'İpucu'), h('p', { 'class': 'cue' }, helpers.maskText(u.cue, u))) };
        }
        return { meaning: u.name, el: h('div', { 'class': 'clue-card-sv' }, h('span', { 'class': 'sv-kicker' }, pk.unitLabelCap), h('div', { 'class': 'sv-codebox' }, h('b', {}, u.name))) };
      };
    }

    /* bölge kaydı (ana sayfa kartı, genel bakış) */
    var tones = ['blue', 'green', 'red', 'amber', 'violet', 'teal', 'indigo'];
    var toneHash = 0;
    for (var ci = 0; ci < pack.id.length; ci++) toneHash = (toneHash * 31 + pack.id.charCodeAt(ci)) & 0x7fffffff;
    var raliasList = [codeStr, pack.id.toUpperCase(), pack.name.toUpperCase()];
    if (origId && origId !== pack.id) raliasList.push(origId);
    pack.regionMeta = {
      code: codeStr, area: pack.area || 'Asya', tone: pack.tone || tones[toneHash % tones.length], ralias: raliasList,
      line: pack.line || (pack.units.length + ' ' + pack.unitLabel),
      blurb: pack.blurb || '',
      note: pack.note || null,
      exploreDesc: pack.overviewLead || 'Haritada ' + pack.unitLabel + ' seç; merkezini, komşularını ve ' + lcl(pack.codeLabel) + ' bilgisini gör.',
      plan: pack.plan || pack.topics.map(function (t) { return { title: t.navLabel, text: t.desc || t.lead || '', to: t.key }; }).concat([
        { title: 'Haritada gez', text: 'Her ' + pack.unitLabel + ' için merkez, komşular' + (codeOk ? ' ve ' + lcl(pack.codeLabel) : '') + ' tek kartta.', to: 'kesfet' },
        { title: 'Alıştır ve sına', text: 'Aralıklı tekrar ve 5 turluk simülasyon.', to: 'pratik' }
      ])
    };
    return pack;
  }

  function registerPack(pack) {
    normalizeIncomingPack(pack);
    pack.uById = Object.create(null);
    pack.regById = Object.create(null);
    (pack.regions || []).forEach(function (r) { pack.regById[r.id] = r; });
    (pack.units || []).forEach(function (u) { pack.uById[u.id] = u; });
    pack.norm = normStr;
    pack.geom = function () { return packGeom(pack); };
    pack.keys = function () {
      var ks = [];
      pack.units.forEach(function (u) {
        ks.push(pack.srsPrefix + ':loc:' + u.id);
        ks.push(pack.srsPrefix + ':code:' + u.id);
        ks.push(pack.srsPrefix + ':clue:' + u.id);
      });
      buildVisualPool(pack).forEach(function (v) {
        ks.push(pack.srsPrefix + ':vis:' + v.id);
      });
      (pack.facts || []).forEach(function (f) {
        ks.push(pack.srsPrefix + ':fact:' + f.id);
      });
      return ks;
    };
    if (g.MapView && g.MapView.addTheme && pack.themeCfg) {
      g.MapView.addTheme(pack.themeId, pack.themeCfg);
    }
    Packs[pack.id] = pack;
    if (g.Regions && g.Regions.addCountry && pack.regionMeta) {
      var m = pack.regionMeta;
      var secs = [
        { id: 'kesfet', label: 'Keşfet', icon: 'map', view: 'cExplore', group: 'discover', desc: m.exploreDesc || 'Haritada incele, kodlar ve komşular.' }
      ];
      (pack.topics || []).forEach(function (t) {
        secs.push({ id: t.key, label: t.navLabel || t.title, icon: t.icon || 'layers', view: 'cGuide', tab: t.key, drill: t.drillPreset || 'mix', group: 'learn', desc: t.desc || t.lead });
      });
      secs.push(
        { id: 'pratik', label: 'Pratik', icon: 'target', view: 'cPractice', group: 'train', desc: 'Harita, kod ve görsel ipucu tekrarı.' },
        { id: 'simulasyon', label: 'Simülasyon', icon: 'pin', view: 'cSim', group: 'train', desc: 'Saha ipucuyla haritada konum tahmin et.' },
        { id: 'ilerleme', label: 'İlerleme', icon: 'chart', view: 'cProgress', group: 'train', desc: 'Ustalık haritası ve rekorlar.' }
      );
      g.Regions.addCountry({
        id: pack.id, name: pack.name, short: pack.name, code: m.code, area: m.area, tone: m.tone,
        line: m.line, blurb: m.blurb, note: m.note, sections: secs, plan: m.plan, ralias: m.ralias,
        keys: pack.keys,
        geo: function () { return g[pack.geoVar]; }
      });
    }
    return pack;
  }

  function activePack(app) {
    return Packs[app.region.id];
  }

  /* ============================================================================
   * 1. KEŞFET (cExplore)
   * ============================================================================ */
  function mountExplore(root, app) {
    var pack = activePack(app);
    var G = g[pack.geoVar], gm = pack.geom();
    var L = app.layout(root);
    var st = prefsFor(pack.id, 'ex', { color: 'reg', label: 'short' });
    var sel = (app.launch && app.launch.select && pack.uById[app.launch.select]) ? app.launch.select : null;
    app.launch = null;

    var map = new g.MapView(L.stage, {
      geo: G, geom: gm, theme: pack.themeId,
      mesh: { 'in': true, rg: false, mc: false, co: true },
      basemapLabels: false, maxK: 18,
      tip: function (id) {
        var u = pack.uById[id];
        if (!u) return null;
        return u.name + (u.codes && u.codes[0] ? ' · ' + u.codes[0] : '');
      },
      onClick: function (hit) {
        if (!hit.id) { clearSelection(); return; }
        selectUnit(hit.id, true);
      }
    });
    L.bind(map);

    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    var inp = h('input', {
      type: 'search', 'class': 'input',
      placeholder: pack.name + ' ara: ' + pack.unitLabel + ' adı' + (hasCodes(pack) ? ' ya da ' + lcl(pack.codeLabel) : '') + '…',
      'aria-label': pack.name + ' içinde ara', autocomplete: 'off', spellcheck: 'false'
    });
    var resList = h('ul', { 'class': 'results', hidden: true });
    var searchBox = h('div', { 'class': 'search' }, UI.icon('search', 18), inp, resList);
    panelTop.appendChild(searchBox);

    if (!labelOk(pack, st.label)) st.label = 'short';
    if (!pack.colorModes.some(function (m) { return m.id === st.color; })) st.color = pack.colorModes[0].id;
    var detailEl = h('div', { 'class': 'detail' });
    panelBody.appendChild(detailEl);

    map.cfg.labels({
      options: labelOptions(pack),
      value: st.label, def: 'short',
      onChange: function (v) { st.label = v; savePrefs(pack.id, 'ex', st); applyMap(); }
    });
    map.cfg.colors({
      options: pack.colorModes.map(function (m) { return { v: m.id, label: m.label }; }),
      value: st.color, def: pack.colorModes[0].id,
      onChange: function (v) { st.color = v; savePrefs(pack.id, 'ex', st); applyMap(); map.cfg.refresh(); }
    });
    map.cfg.legend(function (box) { renderLegend(box); });

    function applyMap() {
      map.setMesh({ 'in': true, rg: st.color === 'reg', mc: false, co: true });
      map.setFill(makeFillFn(pack, st.color));
      map.setLabels(makeLabelFn(pack, st.label), { size: pack.labelSize || 9.8, fit: 1.7 });
    }

    function renderLegend(box) { fillPackLegend(box, pack, st.color, map); }

    function renderDetail() {
      U.clear(detailEl);
      if (!sel || !pack.uById[sel]) {
        detailEl.appendChild(h('div', { 'class': 'empty' },
          h('div', { 'class': 'empty-t' }, 'Haritada bir ' + pack.unitLabel + ' seç'),
          h('p', { 'class': 'cue' }, pack.exploreHint || ('Merkezini, komşularını' + (hasCodes(pack) ? ', ' + lcl(pack.codeLabel) + ' bilgisini' : '') + ' ve varsa ipuçlarını görmek için haritaya dokun ya da yukarıdan ara.'))));
        return;
      }
      var u = pack.uById[sel];
      detailEl.appendChild(unitCardEl(pack, u, { onSelect: function (nid) { selectUnit(nid, true); } }));
      detailEl.appendChild(h('div', { 'class': 'row row-end', style: { marginTop: '10px' } },
        h('button', { type: 'button', 'class': 'btn btn-sm', onclick: function () { app.launch = { filterUnit: u.id }; app.go('pratik'); } },
          UI.icon('bulb', 14), 'Pratikte sor'),
        h('button', { type: 'button', 'class': 'btn btn-ghost btn-sm', onclick: clearSelection }, 'Seçimi temizle')));
    }

    function selectUnit(id, fit) {
      sel = id;
      map.clearHighlight();
      map.highlight([id], 'hl-sel');
      map.setLocatorTarget(id);
      if (fit) map.fitTo([id], { pad: 60, maxK: pack.maxFitZoom || 8 });
      renderDetail();
      L.sheet.snap('fit', { max: 0.56 });
    }

    function clearSelection() {
      sel = null;
      map.clearHighlight();
      map.setLocatorTarget(null);
      map.fitAll(true);
      renderDetail();
    }

    function search(qRaw) {
      var q = normStr(qRaw);
      U.clear(resList);
      if (!q) { resList.hidden = true; return; }
      var matches = pack.units.filter(function (u) {
        var hay = [u.name, u.short, u.local, u.cap, (u.codes || []).join(' '), u.cue].map(normStr).join(' ');
        return hay.indexOf(q) >= 0;
      }).slice(0, 14);
      if (!matches.length) {
        resList.appendChild(h('li', { 'class': 'res-empty' }, 'Eşleşme bulunamadı'));
      } else {
        matches.forEach(function (u) {
          var r = pack.regById[u.reg];
          var li = h('li', { 'class': 'res', tabindex: 0 },
            h('b', {}, u.name + ' (' + u.short + ')'),
            h('span', {}, (u.codes && u.codes.length ? u.codes.join(', ') + ' · ' : '') + (r ? r.tr : '')));
          li.addEventListener('click', function () {
            resList.hidden = true;
            inp.value = '';
            selectUnit(u.id, true);
          });
          resList.appendChild(li);
        });
      }
      resList.hidden = false;
    }

    inp.addEventListener('input', function () { search(inp.value); });
    inp.addEventListener('focus', function () { if (inp.value.trim()) search(inp.value); });

    applyMap();
    if (sel) selectUnit(sel, false);
    else { renderDetail(); map.fitAll(false); }

    return { destroy: function () { map.destroy(); } };
  }

  /* ============================================================================
   * 2. NİŞ KONU REHBERLERİ (cGuide)
   * ============================================================================ */
  function mountGuide(root, app) {
    var pack = activePack(app);
    var G = g[pack.geoVar], gm = pack.geom();
    var topicKey = typeof app.section === 'string' ? app.section : (app.section.tab || app.section.id);
    var topic = (pack.topics || []).find(function (t) { return t.key === topicKey; }) || pack.topics[0];
    var L = app.layout(root);
    var sticky = [];

    var map = new g.MapView(L.stage, {
      geo: G, geom: gm, theme: pack.themeId,
      mesh: { 'in': true, rg: topic.mapMode === 'reg', mc: false, co: true },
      basemapLabels: false, maxK: 18,
      tip: function (id) {
        var u = pack.uById[id];
        return u ? (u.name + (u.codes && u.codes[0] ? ' · ' + u.codes[0] : '')) : null;
      },
      onClick: function (hit) {
        if (!hit.id) return;
        app.launch = { select: hit.id };
        app.go('kesfet');
      }
    });
    L.bind(map);
    var gColor = pack.colorModes.some(function (m) { return m.id === topic.mapMode; }) ? topic.mapMode : pack.colorModes[0].id;
    var gLabel = labelOk(pack, topic.labelMode) ? topic.labelMode : 'short';
    map.setFill(makeFillFn(pack, gColor));
    map.setLabels(makeLabelFn(pack, gLabel), { size: pack.labelSize || 9.6, fit: 1.7 });
    map.cfg.labels({
      options: labelOptions(pack),
      value: gLabel, def: gLabel,
      onChange: function (v) { gLabel = v; map.setLabels(makeLabelFn(pack, v), { size: pack.labelSize || 9.6, fit: 1.7 }); }
    });
    map.cfg.colors({
      options: pack.colorModes.map(function (m) { return { v: m.id, label: m.label }; }),
      value: gColor, def: gColor,
      onChange: function (v) { gColor = v; map.setFill(makeFillFn(pack, v)); map.setMesh({ 'in': true, rg: v === 'reg', mc: false, co: true }); map.cfg.refresh(); }
    });
    map.cfg.legend(function (box) { fillPackLegend(box, pack, gColor, map); });

    function previewIds(ids) {
      map.clearHighlight();
      if (ids && ids.length) map.highlight(ids, 'hl-ctx');
    }

    /* YOL ÇİZGİLERİ: konu.routesVar = pencere değişkeni adı; r[anahtar] = [[lon0,lat0,dlon,dlat,…], …] (1/u derece, ilk iki sayı mutlak, sonrası fark).
       Seçili yol kalın ve numara etiketli çizilir; "Tümü" kipinde diğer yollar ince bağlam çizgisi olur. */
    var RT = topic.routesVar && g[topic.routesVar] && g[topic.routesVar].r ? g[topic.routesVar] : null;
    var routeCache = {}, routeMode = 'all', routePrev = null, routeSel = [];
    function routePaths(key) {
      if (!RT || !RT.r[key]) return null;
      if (!routeCache[key]) {
        var u = RT.u || 1000;
        routeCache[key] = RT.r[key].map(function (a) {
          var lon = a[0], lat = a[1], p = gm.toXY(lon / u, lat / u), out = [[p.x, p.y]];
          for (var i = 2; i + 1 < a.length; i += 2) { lon += a[i]; lat += a[i + 1]; p = gm.toXY(lon / u, lat / u); out.push([p.x, p.y]); }
          return out;
        });
      }
      return routeCache[key];
    }
    function routeBox(keys) {
      var bb = null;
      (keys || []).forEach(function (k) {
        (routePaths(k) || []).forEach(function (path) {
          path.forEach(function (q) { bb = bb ? [Math.min(bb[0], q[0]), Math.min(bb[1], q[1]), Math.max(bb[2], q[0]), Math.max(bb[3], q[1])] : [q[0], q[1], q[0], q[1]]; });
        });
      });
      return bb;
    }
    function paintRoutes() {
      if (!RT) return;
      map.clearRoutes();
      if (routeMode === 'off') return;
      var cur = routePrev ? [routePrev] : routeSel;
      if (routeMode === 'all') Object.keys(RT.r).forEach(function (k) { if (cur.indexOf(k) < 0) map.addRoute(routePaths(k), 'rt-all'); });
      cur.forEach(function (k) { if (routePaths(k)) map.addRoute(routePaths(k), 'rt-sel', k); });
    }
    if (RT) {
      map.cfg.routes({
        title: 'Yol çizgileri',
        options: [{ v: 'all', label: 'Tümü' }, { v: 'sel', label: 'Seçili' }, { v: 'off', label: 'Kapalı' }],
        value: routeMode, def: 'all',
        onChange: function (v) { routeMode = v; paintRoutes(); }
      });
      paintRoutes();
    }

    function bindHighlight(el, ids, zoom, routeKey) {
      if (!ids || !ids.length) return;
      var rk = routeKey && RT && RT.r[routeKey] ? routeKey : null;
      el.addEventListener('mouseenter', function () { previewIds(ids); if (rk) { routePrev = rk; paintRoutes(); } });
      el.addEventListener('mouseleave', function () { previewIds(sticky); if (rk) { routePrev = null; paintRoutes(); } });
      el.addEventListener('click', function () {
        sticky = ids.slice();
        previewIds(sticky);
        if (rk) { routeSel = [rk]; routePrev = null; paintRoutes(); }
        var rb = rk ? routeBox([rk]) : null;
        map.fitTo(rb || ids, { pad: 46, maxK: zoom || (pack.maxFitZoom || 8) });
        if (app.mode === 'sheet') L.sheet.snap('peek');
      });
    }

    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    panelTop.appendChild(h('div', { 'class': 'topic-h' },
      h('h2', {}, topic.title),
      h('button', { type: 'button', 'class': 'btn btn-primary btn-sm', id: 'topic-drill', onclick: function () {
        app.launch = { preset: topic.drillPreset || 'mix' };
        app.go('pratik');
      } }, UI.icon('arrow', 14), 'Alıştır')));

    if (topic.lead) panelBody.appendChild(h('p', { 'class': 'lead' }, topic.lead));

    /* Çözücü: tabelada gördüğünü yaz → hangi bölge(ler) olduğunu haritada göster */
    var dec = topic.decoder && typeof topic.decoder === 'object' ? topic.decoder : (topic.decoder ? pack.decoder : null);
    if (dec && dec.resolve) {
      var decInp = h('input', { type: 'text', 'class': 'input', placeholder: dec.placeholder || 'Yaz…', autocomplete: 'off', spellcheck: 'false', 'aria-label': dec.title });
      var decOut = h('div', { 'class': 'decode-out', 'aria-live': 'polite' });
      var runDec = function () {
        U.clear(decOut);
        var q = decInp.value.trim();
        if (!q) { decOut.appendChild(h('p', { 'class': 'micro' }, dec.hint)); sticky = []; previewIds([]); routeSel = []; paintRoutes(); return; }
        var hits = dec.resolve(q, pack);
        if (!hits.length) { decOut.appendChild(h('span', { 'class': 'decode-no' }, dec.noHit || 'Kayıt bulunamadı.')); return; }
        var allHitIds = [];
        hits.slice(0, 8).forEach(function (ht) {
          (ht.ids || []).forEach(function (x) { if (allHitIds.indexOf(x) < 0) allHitIds.push(x); });
          var row = h('div', { 'class': 'dec-row', tabindex: 0 },
            UI.code(ht.code),
            h('div', { 'class': 'dec-txt' }, h('b', {}, ht.label), ht.sub ? h('small', {}, ht.sub) : null));
          bindHighlight(row, ht.ids, null, ht.route);
          decOut.appendChild(row);
          /* girdinin çizimi/fotoğrafı varsa sonucun hemen altında küçük galeri olarak gösterilir */
          if (ht.set && g.Kit && g.Kit.setKeys(ht.set).length) decOut.appendChild(h('div', { 'class': 'dec-fig' }, g.Kit.carousel(ht.set, { compact: true, label: ht.label })));
        });
        routeSel = hits.slice(0, 8).map(function (ht) { return ht.route; }).filter(function (k) { return k && RT && RT.r[k]; });
        paintRoutes();
        if (allHitIds.length) {
          sticky = allHitIds;
          previewIds(allHitIds);
          map.fitTo(routeBox(routeSel) || allHitIds, { pad: 48, maxK: pack.maxFitZoom || 8 });
        }
      };
      decInp.addEventListener('input', runDec);
      runDec();
      panelBody.appendChild(h('section', { 'class': 'decoder' },
        h('h3', { 'class': 'sec-h' }, dec.title), decInp, decOut));
    }

    /* Fotoğraflı ipuçları: her kart kaydırmalı galeri + kısa tanım */
    if (topic.visuals && topic.visuals.length && g.Kit) {
      var figOnly = topic.visuals.every(function (v) { var ks = g.Kit.setKeys(v.set || v.id); return ks.length && ks.every(function (k) { return g.Kit.isFig(k); }); });
      panelBody.appendChild(h('h3', { 'class': 'sec-h' }, topic.visualsTitle || 'Fotoğraflı ipuçları ', h('small', {}, (figOnly ? 'çizimleri kaydır' : 'fotoğrafı kaydır') + ' · karta dokun → haritada göster')));
      var vgrid = h('div', { 'class': 'vgrid' }, topic.visuals.map(function (v) {
        var card = h('section', { 'class': 'vcard', tabindex: 0 },
          h('div', { 'class': 'vc-art' }, g.Kit.carousel(v.set || v.id, { label: v.title })),
          h('div', { 'class': 'vc-body' },
            h('div', { 'class': 'vc-head' },
              v.badge ? h('span', { 'class': 'pill' }, v.badge) : null,
              h('h4', {}, v.title)),
            v.sub ? h('p', { 'class': 'cue' }, v.sub) : null,
            v.tags && v.tags.length ? h('div', { 'class': 'chips' }, v.tags.map(function (tg) {
              return h('span', { 'class': 'chip chip-static' }, tg);
            })) : null));
        bindHighlight(card, v.ids);
        return card;
      }));
      panelBody.appendChild(vgrid);
    }

    /* Bant / Kuşak Şeridi */
    if (topic.bands && topic.bands.length) {
      panelBody.appendChild(h('h3', { 'class': 'sec-h' }, topic.bandsTitle || 'Kuşaklar', topic.bandsHint ? h('small', {}, ' ' + topic.bandsHint) : null));
      var swp = h('div', { 'class': 'sweep', role: 'list' }, topic.bands.map(function (b) {
        var row = h('div', { 'class': 'sweep-row', role: 'listitem', tabindex: 0 },
          h('span', { 'class': 'famkey ' + (b.cls || 'q0') + (String(b.key).length > 4 ? ' fk-long' : '') }, b.key),
          h('div', { 'class': 'sw-t' }, h('b', {}, b.title), h('small', {}, b.sub)),
          h('span', { 'class': 'sw-n' }, (b.ids || []).length + ' ' + pack.unitLabel));
        bindHighlight(row, b.ids, null, b.key);
        return row;
      }));
      panelBody.appendChild(swp);
      if (RT && topic.routesNote) panelBody.appendChild(h('p', { 'class': 'micro' }, topic.routesNote));
    }

    /* Hızlı Karar Akışı */
    if (topic.flows && topic.flows.length) {
      panelBody.appendChild(h('h3', { 'class': 'sec-h' }, topic.flowsTitle || 'Nasıl bakılır?'));
      panelBody.appendChild(h('ol', { 'class': 'flow' }, topic.flows.map(function (f, idx) {
        var li = h('li', { 'class': 'flow-i', tabindex: 0 },
          h('span', { 'class': 'flow-n' }, idx + 1),
          h('div', { 'class': 'flow-b' }, h('b', {}, f.title), h('p', {}, f.body)));
        bindHighlight(li, f.ids);
        return li;
      })));
    }

    /* Kurallar & Tuzaklar */
    if (topic.rules && topic.rules.length) {
      panelBody.appendChild(h('h3', { 'class': 'sec-h' }, topic.rulesTitle || 'Kurallar ve tuzaklar'));
      topic.rules.forEach(function (r) {
        var card = h('section', { 'class': 'rule', tabindex: 0 },
          h('header', { 'class': 'rule-h' }, h('h4', {}, r.title),
            r.ids ? h('span', { 'class': 'pill' }, r.ids.length + ' ' + pack.unitLabel) : null),
          h('p', { 'class': 'rule-body' }, r.body),
          r.traps && r.traps.length ? h('ul', { 'class': 'traps' }, r.traps.map(function (t) {
            return h('li', {}, h('b', {}, t[0]), ' — ' + t[1]);
          })) : null);
        bindHighlight(card, r.ids);
        panelBody.appendChild(card);
      });
    }

    /* Katlanabilir Tam Referans Tablosu */
    var withCodes = hasCodes(pack);
    var tblFilter = h('input', { type: 'search', 'class': 'input', placeholder: pack.unitLabelCap + (withCodes ? ' ya da ' + lcl(pack.codeLabel) : '') + ' ara…', autocomplete: 'off', spellcheck: 'false' });
    var tblWrap = h('div', { 'class': 'tablewrap' });
    function drawTbl() {
      U.clear(tblWrap);
      var q = normStr(tblFilter.value);
      var rows = pack.units.filter(function (u) {
        if (!q) return true;
        return normStr([u.name, u.short, u.local, (u.codes || []).join(' '), u.cap, u.cue].join(' ')).indexOf(q) >= 0;
      });
      if (!rows.length) { tblWrap.appendChild(UI.empty('Eşleşme yok', 'Farklı bir terim dene.')); return; }
      tblWrap.appendChild(h('table', { 'class': 'tbl tbl-compact' },
        h('thead', {}, h('tr', {}, h('th', {}, pack.unitLabelCap), withCodes ? h('th', {}, pack.codeLabel) : null, h('th', {}, 'Merkez'), h('th', {}, 'Bölge'))),
        h('tbody', {}, rows.map(function (u) {
          var r = pack.regById[u.reg];
          var tr = h('tr', { tabindex: 0, style: { cursor: 'pointer' } },
            h('td', {}, h('b', {}, u.name), u.local && u.local !== u.name ? h('small', { 'class': 'td-sub' }, ' · ' + u.local) : null),
            withCodes ? h('td', {}, (u.codes || []).slice(0, 3).map(function (c) { return UI.code(c, pack.codeLabel); })) : null,
            h('td', {}, u.cap || '—'),
            h('td', {}, r ? r.tr : ''));
          tr.addEventListener('click', function () {
            sticky = [u.id];
            previewIds(sticky);
            map.fitTo([u.id], { pad: 64, maxK: pack.maxFitZoom || 8 });
            L.sheet.snap('peek');
          });
          return tr;
        }))));
    }
    tblFilter.addEventListener('input', drawTbl);
    drawTbl();
    panelBody.appendChild(h('details', { 'class': 'fold' },
      h('summary', {}, UI.icon('list', 16), 'Tüm ' + pack.name + ' listesi (' + pack.units.length + ')'),
      h('div', { 'class': 'fold-body' }, tblFilter, tblWrap)));

    map.fitAll(false);
    L.sheet.snap('full', { instant: true });
    return { destroy: function () { map.destroy(); } };
  }

  /* ============================================================================
   * 3. PRATİK (cPractice) — SRS + Harita + Kod + Görsel SVG MCQ
   * ============================================================================ */
  /* Pratik/Simülasyon fotoğraf sorusuna yalnız GERÇEK fotoğraf kartları girer: çizim (js/figures.js) rozetlerle cevabı gösterir,
     bu yüzden çizim içeren ya da quiz:false olan kartlar sorulmaz */
  function visualQuizable(v) {
    if (!v || !v.set || !v.ids || !v.ids.length || v.quiz === false) return false;
    var ks = g.Kit ? g.Kit.setKeys(v.set) : [];
    return ks.length > 0 && !ks.some(function (k) { return g.Kit.isFig(k); });
  }
  function buildVisualPool(pack) {
    var pool = [];
    (pack.topics || []).forEach(function (t) {
      (t.visuals || []).forEach(function (v) {
        if (visualQuizable(v)) {
          pool.push(Object.assign({ topic: t.title, topicKey: t.key }, v));
        }
      });
    });
    return pool;
  }

  /* kodun "ilk bakılacak" kısmı: 0 ile başlıyorsa ilk iki hane, değilse ilk hane */
  function codeHead(code) {
    code = String(code || '');
    return (code.charAt(0) === '0' ? code.slice(0, 2) : code.slice(0, 1)) + '…';
  }

  function makeQuestion(pack, kind, poolUnits, visualPool, lastKey, topicKey) {
    var G = g[pack.geoVar];
    var srsKind = kind === 'codeToUnit' ? 'code' : kind === 'clueToUnit' ? 'clue' : kind;
    var u = U.weighted(poolUnits, function (x) {
      var k = pack.srsPrefix + ':' + srsKind + ':' + x.id;
      return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
    });
    var reg = pack.regById[u.reg];

    /* 1) Haritada bul */
    if (kind === 'loc' || !poolUnits.length) {
      var nbNames = ((G.p[u.id] && G.p[u.id].nb) || []).map(function (id) { return pack.uById[id] ? pack.uById[id].name : ''; }).filter(Boolean);
      return {
        base: 'loc', mode: 'map', key: pack.srsPrefix + ':loc:' + u.id, unit: u,
        title: 'Haritada bul',
        prompt: { main: u.name, sub: (u.local && u.local !== u.name ? u.local + ' · ' : '') + (reg ? reg.tr : '') },
        focus: [], accept: [u.id],
        explain: u.name + (u.cap && u.cap !== u.name ? ' — merkez: ' + u.cap : '') + (u.cue ? '. ' + u.cue : ''),
        hints: [
          { k: 'Bölge', t: reg ? reg.tr + (reg.cue ? ' — ' + reg.cue : '') : '', ids: safeHintIds(pack, G, u, allUnitsOf(pack, u.reg)) },
          { k: 'Komşuları', t: nbNames.length ? nbNames.slice(0, 5).join(', ') : 'Komşu bilgisi yok', ids: safeHintIds(pack, G, u) },
          u.cue || (u.codes && u.codes.length) ? { k: 'İpucu', t: (u.cap && u.cap !== u.name ? 'Merkez: ' + u.cap + '. ' : '') + (u.cue ? maskText(u.cue, u) : pack.codeLabel + ': ' + u.codes[0]) } : null
        ].filter(Boolean)
      };
    }

    /* 1b) Olgu: çözücü girdisi (yol numarası, harf…) → haritada nerede? */
    if (kind === 'fact') {
      var fset = {};
      poolUnits.forEach(function (x) { fset[x.id] = 1; });
      var facts = (pack.facts || []).filter(function (f) {
        return (!topicKey || f.topic === topicKey) && f.ids.some(function (id) { return fset[id]; });
      });
      if (facts.length) {
        var f = U.weighted(facts, function (x) {
          var k = pack.srsPrefix + ':fact:' + x.id;
          return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
        });
        var fUnits = f.ids.map(function (id) { return pack.uById[id]; }).filter(Boolean);
        var fRegs = U.uniq(fUnits.map(function (x) { return pack.regById[x.reg] ? pack.regById[x.reg].tr : ''; }).filter(Boolean));
        return {
          base: 'fact', mode: 'map', key: pack.srsPrefix + ':fact:' + f.id, unit: fUnits[0] || u,
          title: 'Bu ipucu nerede?',
          prompt: { main: f.main, sub: f.sub },
          focus: [], accept: f.ids.slice(), focusIds: f.ids,
          explain: f.main + ' → ' + fUnits.map(function (x) { return x.name; }).join(', ') + (f.note ? '. ' + f.note : ''),
          hints: [
            fRegs.length ? { k: 'Bölge', t: fRegs.slice(0, 3).join(', '), ids: safeHintIds(pack, G, fUnits[0] || u, f.ids) } : null,
            f.note ? { k: 'Not', t: f.note } : null
          ].filter(Boolean)
        };
      }
      return makeQuestion(pack, 'loc', poolUnits, visualPool, lastKey);
    }

    /* 2) Fotoğraf → haritada nerede? (tema: "bu ipucu hangi bölgede görülür?") */
    var poolSet = {};
    poolUnits.forEach(function (x) { poolSet[x.id] = 1; });
    var scopedVisuals = visualPool.filter(function (x) {
      return (!topicKey || x.topicKey === topicKey) && (x.ids || []).some(function (id) { return poolSet[id]; });
    });
    if (kind === 'visual' && scopedVisuals.length) {
      var v = U.weighted(scopedVisuals, function (x) {
        var k = pack.srsPrefix + ':vis:' + x.id;
        return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
      });
      var vUnits = (v.ids || []).map(function (id) { return pack.uById[id]; }).filter(Boolean);
      var vRegs = U.uniq(vUnits.map(function (x) { return pack.regById[x.reg] ? pack.regById[x.reg].tr : ''; }).filter(Boolean));
      var areaHint = (vRegs.length ? vRegs.slice(0, 3).join(', ') : '');
      return {
        base: 'visual', mode: 'map', key: pack.srsPrefix + ':vis:' + v.id, unit: vUnits[0] || u,
        visualSet: v.set, focusIds: v.ids,
        title: 'Fotoğraf ipucu',
        prompt: { main: v.quizPrompt || 'Bu ipucu nerede görülür?', sub: 'Fotoğrafı kaydır, sonra haritada ilgili ' + pack.unitLabel + ' seç.' },
        focus: [], accept: v.ids.slice(),
        explain: v.title + (v.sub ? ' — ' + v.sub : ''),
        hints: [
          areaHint ? { k: 'Bölge', t: areaHint, ids: safeHintIds(pack, G, vUnits[0] || u, v.ids) } : null,
          { k: 'Ne görüyorsun?', t: v.hint || ('Konu: ' + v.topic + '. Fotoğraftaki ayırt edici ayrıntıya bak.') }
        ].filter(Boolean)
      };
    }

    /* 3) Birim → kod (çoktan seçmeli) */
    if (kind === 'code') {
      var codePool = poolUnits.filter(function (x) { return x.codes && x.codes.length; });
      var cu = codePool.length ? U.weighted(codePool, function (x) {
        var k = pack.srsPrefix + ':code:' + x.id;
        return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
      }) : u;
      if (!cu.codes || !cu.codes.length) return makeQuestion(pack, 'loc', poolUnits, visualPool, lastKey);
      var cReg = pack.regById[cu.reg];
      var corrCode = cu.codes[0];
      var wrongUnits = U.shuffle(pack.units.filter(function (x) {
        return x.id !== cu.id && x.codes && x.codes.length && x.codes.indexOf(corrCode) < 0;
      }));
      var seenC = {}; seenC[corrCode] = 1;
      var copts = [{ id: corrCode, label: corrCode, kind: 'code' }];
      wrongUnits.forEach(function (wu) {
        if (copts.length < 4 && !seenC[wu.codes[0]]) {
          seenC[wu.codes[0]] = 1;
          copts.push({ id: wu.codes[0], label: wu.codes[0], kind: 'code' });
        }
      });
      return {
        base: 'code', mode: 'mc', key: pack.srsPrefix + ':code:' + cu.id, unit: cu,
        title: pack.codeLabel + ' bul',
        prompt: { main: cu.name, sub: (cReg ? cReg.tr + ' · ' : '') + 'Hangi ' + lcl(pack.codeLabel) + '?' },
        options: U.shuffle(copts), correct: corrCode, focus: [cu.id],
        explain: cu.name + ' → ' + cu.codes.join(', '),
        hints: [
          { k: 'Bölge', t: cReg ? cReg.tr : '', ids: safeHintIds(pack, G, cu, allUnitsOf(pack, cu.reg)) },
          { k: 'Başı', t: pack.codeLabel + ' "' + codeHead(corrCode) + '" ile başlar.' }
        ]
      };
    }

    /* 4) Kod verildi → haritada tıkla */
    if (kind === 'codeToUnit') {
      var tPool = poolUnits.filter(function (x) { return x.codes && x.codes.length; });
      var tu = tPool.length ? U.weighted(tPool, function (x) {
        var k = pack.srsPrefix + ':code:' + x.id;
        return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
      }) : u;
      if (!tu.codes || !tu.codes.length) return makeQuestion(pack, 'loc', poolUnits, visualPool, lastKey);
      var codeStr = tu.codes[0];
      var acceptIds = pack.units.filter(function (x) { return x.codes && x.codes.indexOf(codeStr) >= 0; }).map(function (x) { return x.id; });
      return {
        base: 'codeToUnit', mode: 'map', key: pack.srsPrefix + ':code:' + tu.id, unit: tu,
        title: pack.codeLabel + ' → harita',
        prompt: { kind: 'code', main: codeStr, sub: pack.codePrompt || ('Bu ' + lcl(pack.codeLabel) + ' hangi ' + dat(pack.unitLabel) + ' ait?') },
        focus: [], accept: acceptIds.length ? acceptIds : [tu.id],
        explain: codeStr + ' → ' + (acceptIds.length > 1 ? acceptIds.map(function (id) { return pack.uById[id].name; }).join(', ') : tu.name),
        hints: [
          { k: 'Bölge', t: pack.regById[tu.reg] ? pack.regById[tu.reg].tr : '', ids: safeHintIds(pack, G, tu, allUnitsOf(pack, tu.reg)) },
          tu.cue ? { k: 'Çevre', t: maskText(tu.cue, tu), ids: safeHintIds(pack, G, tu) } : { k: 'Çevre', t: 'Komşularla kıyasla', ids: safeHintIds(pack, G, tu) }
        ]
      };
    }

    /* 5) Yazılı ipucu → birim (çoktan seçmeli) */
    var cuePool = poolUnits.filter(function (x) { return x.cue; });
    var cq = cuePool.length ? U.weighted(cuePool, function (x) {
      var k = pack.srsPrefix + ':clue:' + x.id;
      return (k === lastKey ? 0.1 : 1) * (1 + 2.6 * (1 - SRS.box(k) / 5));
    }) : null;
    if (!cq) return makeQuestion(pack, 'loc', poolUnits, visualPool, lastKey);
    var cqReg = pack.regById[cq.reg];
    var distU = U.shuffle(pack.units.filter(function (x) { return x.id !== cq.id; })).slice(0, 3);
    var mopts = U.shuffle([cq].concat(distU)).map(function (x) {
      var xr = pack.regById[x.reg];
      return { id: x.id, label: x.name, sub: xr ? xr.tr : '' };
    });
    return {
      base: 'clueToUnit', mode: 'mc', key: pack.srsPrefix + ':clue:' + cq.id, unit: cq,
      title: 'İpucundan tanı',
      prompt: { main: maskText(cq.cue, cq), sub: 'Hangi ' + pack.unitLabel + '?' },
      options: mopts, correct: cq.id, focus: [],
      explain: cq.name + ' — ' + cq.cue,
      hints: [
        { k: 'Bölge', t: cqReg ? cqReg.tr : '', ids: safeHintIds(pack, G, cq, allUnitsOf(pack, cq.reg)) },
        cq.codes && cq.codes[0] ? { k: pack.codeLabel, t: cq.codes[0], ids: safeHintIds(pack, G, cq) } : { k: 'Komşular', t: 'Komşularla kıyasla', ids: safeHintIds(pack, G, cq) }
      ]
    };
  }

  function mountPractice(root, app) {
    var pack = activePack(app);
    var G = g[pack.geoVar], gm = pack.geom();
    var L = app.layout(root);
    var visualPool = buildVisualPool(pack);
    var st = prefsFor(pack.id, 'pr', { preset: 'mix', count: 10, quizColors: true, scope: [] });
    if (app.launch && app.launch.preset) { st.preset = app.launch.preset; }
    var filterUnit = app.launch && app.launch.filterUnit;
    app.launch = null;

    var cfg = { preset: st.preset, count: st.count || 10, quizColors: st.quizColors !== false, scope: (st.scope || []).slice() };
    var session = null, q = null, phase = 'setup', hb = null, optBtns = [], scopeChips = null;

    var map = new g.MapView(L.stage, {
      geo: G, geom: gm, theme: pack.themeId,
      mesh: { 'in': true, rg: true, mc: false, co: true },
      basemapLabels: false, maxK: 18,
      tip: function () { return phase === 'setup' ? 'Bölgeyi filtrele' : null; },
      onClick: onMapClick
    });
    L.bind(map);
    map.cfg.lock('labels', 'Sınav sırasında kapalı');
    map.cfg.colors({
      options: [{ v: 'on', label: 'Bölge renkleri' }, { v: 'off', label: 'Sade' }],
      value: cfg.quizColors ? 'on' : 'off', def: 'on',
      onChange: function (v) { cfg.quizColors = v === 'on'; savePrefs(pack.id, 'pr', cfg); }
    });
    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    function applySetupMap() {
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      map.setMesh({ 'in': true, rg: true, mc: false, co: true });
      map.setFill(function (id) {
        var u = pack.uById[id], r = u && pack.regById[u.reg];
        if (!u || !r) return 'qn';
        if (cfg.scope.length && cfg.scope.indexOf(u.reg) < 0) return 'qd';
        return 'q' + (r.color % 12);
      });
      map.setLabels(null);
      map.fitAll(false);
    }

    function showSetup() {
      phase = 'setup'; q = null; optBtns = [];
      U.clear(panelTop); U.clear(panelBody);
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Pratik · ' + pack.name),
        h('div', { 'class': 'p-meta' }, UI.icon('bulb', 15), h('span', {}, SRS.seenCount(pack.keys()) + ' kart çalışıldı'))));

      var pres = UI.seg(pack.presets.map(function (p) { return { v: p.id, label: p.label }; }), cfg.preset, function (v) {
        cfg.preset = v; savePrefs(pack.id, 'pr', cfg);
      }, { cls: 'seg-scroll', label: 'Çalışma kipi' });
      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Ne çalışalım?'), pres));

      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Soru sayısı'),
        UI.seg([{ v: '5', label: '5 soru' }, { v: '10', label: '10 soru' }, { v: '15', label: '15 soru' }], String(cfg.count), function (v) {
          cfg.count = +v; savePrefs(pack.id, 'pr', cfg);
        }, { cls: 'seg-full', label: 'Soru sayısı' })));

      scopeChips = UI.multi(pack.regions.map(function (r) { return { v: r.id, label: r.tr }; }), cfg.scope, function (v) {
        cfg.scope = v; savePrefs(pack.id, 'pr', cfg); applySetupMap();
      }, { label: 'Bölge süzgeci' });

      panelBody.appendChild(h('details', { 'class': 'fold' },
        h('summary', {}, UI.icon('layers', 16), 'Bölge süzgeci'),
        h('div', { 'class': 'fold-body' },
          h('div', { 'class': 'field' }, h('h4', {}, 'Hangi bölgelerden sorulsun? ', h('small', {}, '(boşsa tüm ülke)')), scopeChips))));

      L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'p-start', onclick: startSession }, UI.icon('arrow', 16), 'Çalışmaya başla')]);
      L.sheet.snap('full');
      applySetupMap();
    }

    function startSession() {
      var pr = pack.presets.find(function (p) { return p.id === cfg.preset; }) || pack.presets[pack.presets.length - 1];
      session = { total: cfg.count, idx: 0, right: 0, wrong: 0, types: pr.q, topic: pr.topic || null, lastKey: null };
      if (filterUnit && pack.uById[filterUnit]) {
        cfg.scope = [pack.uById[filterUnit].reg];
        filterUnit = null;
      }
      nextQ();
    }

    function nextQ() {
      if (session.idx >= session.total) { showDone(); return; }
      var pool = pack.units.filter(function (u) { return !cfg.scope.length || cfg.scope.indexOf(u.reg) >= 0; });
      if (!pool.length) pool = pack.units;
      var kind = U.pick(session.types);
      q = makeQuestion(pack, kind, pool, visualPool, session.lastKey, session.topic);
      session.lastKey = q.key;
      renderQ();
    }

    function renderQ() {
      phase = 'asking'; optBtns = [];
      U.clear(panelTop); U.clear(panelBody);
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Ayarlara dön', onclick: showSetup }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(session.idx / session.total * 100) + '%' } })),
          h('span', {}, (session.idx + 1) + ' / ' + session.total)),
        h('div', { 'class': 'qscore' }, UI.icon('check', 15), h('b', {}, session.right))));

      var pe = h('div', { 'class': 'pr' + (q.mode === 'map' ? ' pr-sm' : '') },
        q.prompt.kind === 'code' ? UI.code(q.prompt.main) : h('div', { 'class': 'pr-main' + (String(q.prompt.main || '').length > 26 ? ' pr-main-sm' : '') }, q.prompt.main),
        q.prompt.sub ? h('div', { 'class': 'pr-sub' }, q.prompt.sub) : null);
      if (q.visualSet && g.Kit) {
        pe = h('div', { 'class': 'pr prompt-vis' },
          h('div', { 'class': 'pr-main pr-main-sm' }, q.prompt.main),
          g.Kit.carousel(q.visualSet, { quiz: true, compact: true, label: 'Soru fotoğrafı' }),
          q.prompt.sub ? h('div', { 'class': 'pr-sub' }, q.prompt.sub) : null);
      }

      var targetEl = q.mode === 'map' ? panelTop : panelBody;
      targetEl.appendChild(h('div', { 'class': 'qprompt' },
        q.mode === 'map' ? null : h('div', { 'class': 'qtitle' }, q.title), pe));

      var ans = h('div', { 'class': 'answer' });
      if (q.mode === 'mc') {
        var grid = h('div', { 'class': 'opts' });
        q.options.forEach(function (o, i) {
          var lab = o.kind === 'code' ? UI.code(o.label) : h('span', { 'class': 'opt-l' }, o.label, o.sub ? h('small', {}, o.sub) : null);
          var b = h('button', { type: 'button', 'class': 'opt', onclick: function () { finish(String(o.id) === String(q.correct) ? 'ok' : 'bad', { chosen: o.id }); } },
            h('kbd', {}, i + 1), lab);
          optBtns.push(b); grid.appendChild(b);
        });
        ans.appendChild(grid);
      } else {
        ans.appendChild(h('p', { 'class': 'micro' }, 'Haritada doğru ' + pack.unitLabel + ' üzerine dokun.'));
      }
      panelBody.appendChild(ans);

      hb = UI.hintBox(q.hints, { onStep: function (stStep) {
        if (phase !== 'asking') return;
        L.sheet.snap('fit', { max: 0.6 });
        if (stStep.ids && stStep.ids.length) {
          map.clearHighlight('hl-ctx');
          map.highlight(stStep.ids, 'hl-ctx');
          map.fitTo(stStep.ids, { pad: 52, maxK: pack.maxFitZoom || 7 });
        }
      }, note: 'İpucu kutunu sıfırlamaz ama aralığını uzatmaz.' });
      if (hb) panelBody.appendChild(hb.box);
      panelBody.appendChild(h('div', { 'class': 'feedback', hidden: true, id: 'p-fb' }));

      var skipBtn = h('button', { type: 'button', 'class': 'btn btn-ghost', id: 'q-skip', onclick: function () { finish('skip', {}); } }, UI.icon('skip', 14), 'Bilmiyorum');
      L.foot([hb ? hb.bar : null, skipBtn]);

      L.sheet.snap(q.mode === 'map' ? 'peek' : 'fit', { max: q.focus.length ? 0.58 : 0.92 });
      map.setMesh({ 'in': true, rg: cfg.quizColors, mc: false, co: true });
      map.setFill(cfg.quizColors ? makeFillFn(pack, 'reg') : function () { return 'qn'; });
      map.setLabels(null);
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      if (q.focus.length) {
        map.highlight(q.focus, 'hl-q');
        map.setLocatorTarget(q.focus[0]);
        map.fitTo(q.focus, { pad: 70, maxK: pack.maxFitZoom || 7 });
      } else map.fitAll(true);
      map.setHint(q.mode === 'map' ? 'Haritada dokun: ' + q.prompt.main : null);
    }

    function finish(outcome, info) {
      if (phase !== 'asking') return;
      phase = 'revealed';
      var ok = outcome === 'ok', hinted = hb && hb.count > 0;
      if (hb) hb.lock();
      SRS.answer(q.key, ok, ok && hinted);
      if (ok) session.right++; else session.wrong++;
      session.idx++;

      optBtns.forEach(function (b, idx) {
        b.disabled = true;
        var oid = q.options[idx].id;
        if (String(oid) === String(q.correct)) b.classList.add('ok');
        else if (info.chosen != null && String(oid) === String(info.chosen)) b.classList.add('bad');
      });

      map.setHint(null);
      var okIds = q.accept || q.focusIds || (q.unit ? [q.unit.id] : []);
      if (okIds.length) {
        map.clearHighlight();
        map.highlight(okIds, 'hl-ok');
        if (info.clicked && okIds.indexOf(info.clicked) < 0) map.highlight([info.clicked], 'hl-bad');
        map.fitTo(okIds, { pad: 64, maxK: pack.maxFitZoom || 8 });
      }

      var fb = U.$('#p-fb', panelBody);
      fb.hidden = false;
      fb.className = 'feedback fb-' + (ok ? 'ok' : (outcome === 'skip' ? 'skip' : 'bad'));
      fb.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(ok ? 'check' : 'x', 18), h('b', {}, ok ? 'Doğru' : (outcome === 'skip' ? 'Pas' : 'Yanlış'))),
        h('p', { 'class': 'fb-ans' }, q.explain)));

      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'q-next', onclick: nextQ },
        session.idx >= session.total ? 'Bitir' : 'Sonraki', UI.icon('arrow', 16));
      L.foot([nextBtn]);
      L.sheet.snap('fit', { max: 0.62 });
      nextBtn.focus({ preventScroll: true });
    }

    function showDone() {
      phase = 'done';
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      map.clearHighlight(); map.clearOverlays(); map.fitAll(true);
      var frac = session.right / Math.max(1, session.total), pct = Math.round(100 * frac);
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Oturum bitti')));
      panelBody.appendChild(h('div', { 'class': 'sum-head' },
        UI.ring(frac, 104, 'Doğruluk ' + pct + ' yüzde'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, session.right + ' / ' + session.total), h('small', {}, 'doğru')),
          session.wrong ? h('div', {}, h('b', {}, session.wrong), h('small', {}, 'yanlış')) : null)));
      panelBody.appendChild(h('p', { 'class': 'lead' }, pct >= 80 ? 'Harika! ' + pack.name + ' örüntüleri iyice oturmuş.' : 'Zayıf kalan kartlar SRS kuyruğunda öne alındı.'));
      L.foot([h('button', { type: 'button', 'class': 'btn', onclick: showSetup }, 'Ayarlar'),
        h('button', { type: 'button', 'class': 'btn btn-primary', onclick: startSession }, 'Tekrar çöz')]);
      L.sheet.snap('fit', { max: 0.62 });
    }

    function onMapClick(hit) {
      if (phase === 'setup' && hit.id && pack.uById[hit.id]) {
        var r = pack.uById[hit.id].reg;
        var i = cfg.scope.indexOf(r);
        if (i >= 0) cfg.scope.splice(i, 1); else cfg.scope.push(r);
        savePrefs(pack.id, 'pr', cfg);
        if (scopeChips) scopeChips.setAll(cfg.scope);
        applySetupMap();
        return;
      }
      if (phase === 'asking' && q && q.mode === 'map') {
        if (!hit.id) { UI.toast('Bir ' + pack.unitLabel + ' üzerine dokun.'); return; }
        var ok = q.accept.indexOf(hit.id) >= 0;
        finish(ok ? 'ok' : 'bad', { clicked: hit.id });
      }
    }

    function onKey(e) {
      if (phase === 'asking' && q && q.mode === 'mc' && e.key >= '1' && e.key <= '4') {
        var idx = (+e.key) - 1;
        if (optBtns[idx] && !optBtns[idx].disabled) optBtns[idx].click();
      } else if (phase === 'revealed' && (e.key === 'Enter' || e.key === ' ')) {
        var nb = U.$('#q-next', root);
        if (nb) { e.preventDefault(); nb.click(); }
      }
    }
    document.addEventListener('keydown', onKey);
    showSetup();
    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  /* ============================================================================
   * 4. SİMÜLASYON (cSim) — 5 000 puan iğne bırakma + bileşik SVG/Sokak sahneleri
   * ============================================================================ */
  function mountSim(root, app) {
    var pack = activePack(app);
    var G = g[pack.geoVar], gm = pack.geom();
    var L = app.layout(root);
    var simStore = simStoreFor(pack.id);
    var st = prefsFor(pack.id, 'sim', { rounds: 5, types: pack.simTypes.map(function (t) { return t.v; }), diff: 'mid', scope: [] });
    var cfg = Object.assign({ rounds: 5, types: pack.simTypes.map(function (t) { return t.v; }), diff: 'mid', scope: [] }, st);
    cfg.types = cfg.types.filter(function (t) { return pack.simTypes.some(function (x) { return x.v === t; }); });
    if (!cfg.types.length) cfg.types = pack.simTypes.map(function (t) { return t.v; });

    var game = null, phase = 'setup', pin = null, pinPt = null, round = null, hb = null;
    var map = new g.MapView(L.stage, {
      geo: G, geom: gm, theme: pack.themeId,
      mesh: { 'in': true, rg: false, mc: false, co: true },
      basemapLabels: false, maxK: 16,
      tip: function () { return null; }, onClick: onMapClick
    });
    L.bind(map);
    map.cfg.lock('labels', 'Zorluk ayarı belirler');
    map.cfg.lock('color', 'Zorluk ayarı belirler');
    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    function persist() { savePrefs(pack.id, 'sim', cfg); }
    function applyDiff() {
      var d = cfg.diff;
      map.setMesh({ 'in': d !== 'hard', rg: phase === 'setup' || d === 'easy', mc: false, co: true });
      map.setFill(phase === 'setup' || d === 'easy' ? makeFillFn(pack, 'reg') : function () { return 'qn'; });
      map.setLabels(phase === 'setup' || d === 'easy' ? makeLabelFn(pack, 'short') : null, { size: 10, fit: 1.7 });
    }

    function showSetup() {
      phase = 'setup'; hb = null;
      U.clear(panelTop); U.clear(panelBody);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Simülasyon · ' + pack.name),
        h('div', { 'class': 'p-meta' }, UI.icon('trophy', 15), h('span', {}, simStore.best ? 'En iyi: ' + U.fmtInt(simStore.best) + ' puan' : 'Henüz oyun yok'))));
      panelBody.appendChild(h('p', { 'class': 'lead' }, 'Saha ipucundan doğru yeri tahmin et, haritaya iğne bırak. Tam isabet 5 000 puan.'));
      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Tur sayısı'),
        UI.seg([{ v: '5', label: '5 tur' }, { v: '10', label: '10 tur' }], String(cfg.rounds), function (v) { cfg.rounds = +v; persist(); }, { cls: 'seg-full', label: 'Tur sayısı' })));
      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'İpucu türleri'),
        UI.multi(pack.simTypes, cfg.types, function (v) { cfg.types = v; persist(); }, { min: 1, label: 'İpucu türleri' })));
      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Zorluk'),
        UI.seg([{ v: 'easy', label: 'Kolay' }, { v: 'mid', label: 'Orta' }, { v: 'hard', label: 'Zor' }], cfg.diff, function (v) { cfg.diff = v; persist(); applyDiff(); }, { cls: 'seg-full', label: 'Zorluk' })));
      panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Bölge kapsamı ', h('small', {}, '(boşsa tüm ülke)')),
        UI.multi(pack.regions.map(function (r) { return { v: r.id, label: r.tr }; }), cfg.scope, function (v) { cfg.scope = v; persist(); }, { label: 'Bölge kapsamı' })));

      var hist = (simStore.history || []).slice(-4).reverse();
      if (hist.length) {
        panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Son oyunlar'),
          h('ul', { 'class': 'plain-list hist' }, hist.map(function (x) {
            return h('li', {}, h('b', {}, U.fmtInt(x.score)), h('span', {}, ' · ' + x.ok + '/' + x.rounds + ' isabet · ' + new Date(x.t).toLocaleDateString('tr-TR')));
          }))));
      }
      L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'sim-start', onclick: startGame }, UI.icon('arrow', 16), 'Oyunu başlat')]);
      L.sheet.snap('full');
      applyDiff();
      map.fitAll(false);
    }

    function startGame() {
      game = { rounds: [], idx: 0, score: 0, used: new Set() };
      nextRound();
    }

    function hasClue(type, u) {
      if (type === 'photo' || type.indexOf('photo:') === 0) {
        var tk = type.indexOf(':') > 0 ? type.slice(6) : null;
        return pack.topics.some(function (t) {
          return (!tk || t.key === tk) && (t.visuals || []).some(function (v) { return visualQuizable(v) && v.ids.indexOf(u.id) >= 0; });
        });
      }
      if (type.indexOf('fact:') === 0) return (pack.facts || []).some(function (f) { return f.topic === type.slice(5) && f.ids.indexOf(u.id) >= 0; });
      if (type === 'code') return !!(u.codes && u.codes.length);
      return true;
    }
    function nextRound() {
      if (game.idx >= cfg.rounds) { showFinal(); return; }
      var inScope = function (u) { return !cfg.scope.length || cfg.scope.indexOf(u.reg) >= 0; };
      var type = null, pool = [], tries = U.shuffle(cfg.types.slice());
      for (var ti = 0; ti < tries.length && !pool.length; ti++) {
        type = tries[ti];
        pool = pack.units.filter(function (u) { return !game.used.has(u.id) && inScope(u) && hasClue(type, u); });
        if (!pool.length) pool = pack.units.filter(function (u) { return inScope(u) && hasClue(type, u); });
      }
      if (!pool.length) { type = 'loc'; pool = pack.units.slice(); }
      var u = U.weighted(pool, function (x) { return 1 + 2.4 * (1 - SRS.box(pack.srsPrefix + ':loc:' + x.id) / 5); });
      game.used.add(u.id);
      var clue = pack.makeSimClue(type, u, pack, { maskText: maskText, Kit: g.Kit, UI: UI, h: h });
      round = { target: u.id, clue: clue, accept: clue.ids || null, km: 0, ok: false, score: 0, hints: 0 };
      renderRound();
    }

    function renderRound() {
      phase = 'guessing'; pin = null; pinPt = null;
      U.clear(panelTop); U.clear(panelBody);
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Çık', onclick: showSetup }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(game.idx / cfg.rounds * 100) + '%' } })),
          h('span', {}, 'Tur ' + (game.idx + 1) + ' / ' + cfg.rounds)),
        h('div', { 'class': 'qscore sim-score' }, UI.icon('trophy', 15), h('b', {}, U.fmtInt(game.score)))));
      panelTop.appendChild(h('div', { 'class': 'clue' }, round.clue.el));

      var u = pack.uById[round.target], r = pack.regById[u.reg];
      var steps = [
        { k: 'Bölge', t: r ? (r.tr + (r.cue ? ' — ' + r.cue : '')) : '', ids: safeHintIds(pack, G, u, allUnitsOf(pack, u.reg)) },
        { k: 'Komşu çevresi', t: 'Vurgulanan çevre alanın içinde kalır.', ids: safeHintIds(pack, G, u) },
        (u.codes && u.codes[0]) || u.cue ? { k: 'Yerel iz', t: (u.codes && u.codes[0] ? pack.codeLabel + ': ' + u.codes[0] + (u.cue ? ' · ' : '') : '') + (u.cue ? maskText(u.cue, u) : '') } : null
      ].filter(Boolean);
      hb = UI.hintBox(steps, {
        onStep: function (stStep) {
          if (phase !== 'guessing') return;
          L.sheet.snap('fit', { max: 0.6 });
          if (stStep.ids && stStep.ids.length) {
            map.clearHighlight('hl-ctx');
            map.highlight(stStep.ids, 'hl-ctx');
            map.fitTo(stStep.ids, { pad: 52, maxK: pack.maxFitZoom || 7 });
          }
        },
        note: 'İpucu puanı düşürmez ama bu tur SRS ustalığına yazılmaz.'
      });
      panelBody.appendChild(h('p', { 'class': 'micro', id: 'sim-hint' }, 'Haritaya dokunup iğne bırak, sonra “Tahmin et”e bas.'));
      if (hb) panelBody.appendChild(hb.box);
      panelBody.appendChild(h('div', { 'class': 'feedback', id: 'sim-fb', hidden: true }));
      L.foot([hb ? hb.bar : null, h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-guess', disabled: true, onclick: submitGuess }, UI.icon('pin', 16), 'Tahmin et')]);
      L.sheet.snap('peek');
      applyDiff();
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      map.fitAll(true);
      map.setHint('İğne bırakmak için haritaya dokun');
    }

    function onMapClick(hit) {
      if (phase !== 'guessing') return;
      pinPt = { x: hit.x, y: hit.y };
      if (pin) map.clearOverlays('guess');
      pin = map.addPin(hit.x, hit.y, 'guess');
      var b = U.$('#sim-guess', root);
      if (b) { b.disabled = false; b.focus({ preventScroll: true }); }
      var near = gm.featureAt(hit.x, hit.y);
      map.setHint(near && cfg.diff === 'easy' && pack.uById[near] ? pack.uById[near].name : 'İğne yerleşti');
    }

    function submitGuess() {
      if (phase !== 'guessing' || !pinPt) return;
      phase = 'revealed';
      var acc = (round.accept && round.accept.length) ? round.accept : [round.target];
      var best = null;
      acc.forEach(function (aid) {
        var d0 = gm.distToFeature(pinPt.x, pinPt.y, aid);
        if (!best || (d0.inside && !best.d.inside) || (!!d0.inside === !!best.d.inside && d0.km < best.d.km)) best = { id: aid, d: d0 };
      });
      var u = pack.uById[best.id];
      var d = best.d;
      var guessed = gm.featureAt(pinPt.x, pinPt.y);
      var scaleKm = pack.simKmScale || 450;
      round.km = d.km; round.ok = d.inside;
      round.score = d.inside ? 5000 : Math.round(4500 * Math.exp(-d.km / scaleKm));
      round.hints = hb ? hb.count : 0;
      if (hb) hb.lock();
      game.score += round.score; game.rounds.push(round); game.idx++;
      SRS.answer(round.clue.factKey || (pack.srsPrefix + ':loc:' + u.id), round.ok, round.ok && round.hints > 0);

      map.setHint(null);
      map.clearHighlight();
      map.highlight(acc, 'hl-ok');
      var show = acc.slice();
      if (guessed && acc.indexOf(guessed) < 0) { map.highlight([guessed], 'hl-bad'); show.push(guessed); }
      map.setLabels(function (id) { return show.indexOf(id) >= 0 && pack.uById[id] ? (acc.length > 1 ? pack.uById[id].short : pack.uById[id].name) : null; }, { size: 10.5, fit: 1.6 });
      map.forceLabels(show);
      var lp = G.p[u.id].lp;
      map.addMarker(lp[0], lp[1], 'target');
      if (!d.inside) map.addLine(pinPt, { x: d.x, y: d.y }, 'ln-miss');
      var bb = gm.bboxOf(acc);
      bb = [Math.min(bb[0], pinPt.x), Math.min(bb[1], pinPt.y), Math.max(bb[2], pinPt.x), Math.max(bb[3], pinPt.y)];

      var clueEl = U.$('.clue', panelTop); if (clueEl) clueEl.remove();
      var hintEl = U.$('#sim-hint', panelBody); if (hintEl) hintEl.hidden = true;
      var fb = U.$('#sim-fb', panelBody);
      fb.hidden = false; fb.className = 'feedback fb-' + (round.ok ? 'ok' : 'bad');
      var verdict = round.ok ? 'Tam isabet' : (guessed && pack.uById[guessed] ? 'Yanlış seçim: ' + pack.uById[guessed].name : 'Sınır dışında');
      fb.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(round.ok ? 'check' : 'x', 18), h('b', {}, verdict)),
        h('div', { 'class': 'sim-res' },
          h('div', { 'class': 'sim-pts' }, '+' + U.fmtInt(round.score)),
          h('div', { 'class': 'sim-km' }, round.ok ? 'Sınır içinde' : U.fmtKm(d.km) + ' uzakta')),
        h('p', { 'class': 'fb-ans' }, h('b', {}, acc.length > 1 ? round.clue.meaning : (u.name + ' (' + u.short + ')')), acc.length > 1 ? h('span', { 'class': 'fb-given' }, ' · ' + acc.map(function (x) { return pack.uById[x].short; }).join(', ')) : h('span', { 'class': 'fb-given' }, ' · ' + round.clue.meaning))));
      if (acc.length === 1) fb.appendChild(unitCardEl(pack, u, { noFinds: true }));

      var sc = U.$('.qscore b', panelTop); if (sc) sc.textContent = U.fmtInt(game.score);
      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-next', onclick: nextRound },
        game.idx >= cfg.rounds ? 'Sonucu gör' : 'Sonraki tur', UI.icon('arrow', 16));
      L.foot([nextBtn]);
      L.sheet.snap('fit', { max: 0.62 });
      map.fitTo(bb, { pad: 64, maxK: pack.maxFitZoom || 7 });
      nextBtn.focus({ preventScroll: true });
    }

    function showFinal() {
      phase = 'final';
      var n = game.rounds.length, ok = game.rounds.filter(function (r) { return r.ok; }).length;
      if (n) {
        simStore.games++; simStore.best = Math.max(simStore.best, game.score);
        simStore.history.push({ t: Date.now(), score: game.score, rounds: n, ok: ok });
        if (simStore.history.length > 30) simStore.history.shift();
        Store.save();
      }
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null);
      map.setMesh({ 'in': true, co: true }); map.setFill(function () { return 'qn'; }); map.setLabels(null);
      game.rounds.forEach(function (r) {
        var ids = (r.accept && r.accept.length) ? r.accept : [r.target];
        map.highlight(ids, r.ok ? 'hl-ok' : 'hl-bad');
        var lp = G.p[ids[0]].lp;
        map.addMarker(lp[0], lp[1], r.ok ? 'target' : 'target miss');
      });
      var maxScore = Math.max(1, n * 5000), tier = game.score / maxScore;
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Sonuç')));
      panelBody.appendChild(h('div', { 'class': 'sum-head' },
        UI.ring(tier, 104, 'Puan oranı ' + Math.round(tier * 100) + ' yüzde'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, U.fmtInt(game.score)), h('small', {}, '/ ' + U.fmtInt(maxScore) + ' puan')),
          h('div', {}, h('b', {}, ok + ' / ' + n), h('small', {}, 'tam isabet')),
          h('div', {}, h('b', {}, U.fmtInt(simStore.best)), h('small', {}, 'rekor')))));
      panelBody.appendChild(h('p', { 'class': 'lead' }, ok + ' / ' + n + ' tam isabet · Rekor: ' + U.fmtInt(simStore.best)));
      panelBody.appendChild(h('div', { 'class': 'rlist' }, game.rounds.map(function (r, idx) {
        var u = pack.uById[r.target];
        var rids = (r.accept && r.accept.length) ? r.accept : [r.target];
        return h('div', { 'class': 'rrow', onclick: function () { map.fitTo(rids, { pad: 64, maxK: pack.maxFitZoom || 7 }); L.sheet.snap('peek'); } },
          h('span', { 'class': 'pill ' + (r.ok ? 'pill-ok' : 'pill-bad') }, idx + 1),
          h('b', {}, rids.length > 1 ? r.clue.meaning : u.name),
          h('span', {}, '+' + U.fmtInt(r.score)));
      })));
      L.foot([h('button', { type: 'button', 'class': 'btn', onclick: showSetup }, 'Ayarlar'),
        h('button', { type: 'button', 'class': 'btn btn-primary', onclick: startGame }, 'Tekrar oyna')]);
      L.sheet.snap('fit', { max: 0.65 });
      map.fitAll(true);
    }

    showSetup();
    return { destroy: function () { map.destroy(); } };
  }

  /* ============================================================================
   * 5. İLERLEME (cProgress)
   * ============================================================================ */
  function mountProgress(root, app) {
    var pack = activePack(app);
    var G = g[pack.geoVar], gm = pack.geom();
    var L = app.layout(root);
    var simStore = simStoreFor(pack.id);
    var LEVELS = [
      { cls: 'm0', label: 'Hiç sorulmadı' }, { cls: 'm1', label: 'Zayıf' }, { cls: 'm2', label: 'Gelişiyor' },
      { cls: 'm3', label: 'İyi' }, { cls: 'm4', label: 'Çok iyi' }, { cls: 'm5', label: 'Usta' }
    ];

    var map = new g.MapView(L.stage, {
      geo: G, geom: gm, theme: pack.themeId,
      mesh: { 'in': true, rg: true, mc: false, co: true },
      basemapLabels: false, maxK: 16,
      tip: function (id) {
        var u = pack.uById[id];
        if (!u) return null;
        var b = Math.max(
          SRS.box(pack.srsPrefix + ':loc:' + id),
          SRS.box(pack.srsPrefix + ':code:' + id),
          SRS.box(pack.srsPrefix + ':clue:' + id)
        );
        return u.name + ' · Kutu ' + b + '/5';
      },
      onClick: function (hit) { if (hit.id) { app.launch = { select: hit.id }; app.go('kesfet'); } }
    });
    L.bind(map);
    var pLabel = 'short';
    map.setFill(makeFillFn(pack, 'mastery'));
    map.setLabels(makeLabelFn(pack, pLabel), { size: 9.5, fit: 1.7 });
    map.cfg.labels({
      options: labelOptions(pack),
      value: pLabel, def: 'short',
      onChange: function (v) { pLabel = v; map.setLabels(makeLabelFn(pack, v), { size: 9.5, fit: 1.7 }); }
    });
    map.cfg.lock('color', 'Renk ustalık düzeyini gösterir');
    map.cfg.legend(function (box) {
      LEVELS.forEach(function (l) { box.appendChild(h('div', { 'class': 'lg-row lg-static' }, h('i', { 'class': 'sw ' + l.cls }), h('b', {}, l.label), h('span', {}))); });
    });

    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop);
    L.panel.appendChild(panelBody);

    var keys = pack.keys();
    var seen = SRS.seenCount(keys);
    var mastered = keys.filter(function (k) { return SRS.box(k) >= 4; }).length;
    var mean = SRS.mean(keys);
    var st = Store.data.stats;
    var visById = Object.create(null);
    buildVisualPool(pack).forEach(function (v) { visById[v.id] = v; });

    panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'İlerleme · ' + pack.name),
      h('div', { 'class': 'p-meta' }, UI.icon('trophy', 15), h('span', {}, seen + ' / ' + keys.length + ' öğe görüldü'))));

    panelBody.appendChild(h('div', { 'class': 'tiles' },
      h('div', {}, h('b', {}, SRS.today()), h('small', {}, 'bugün')),
      h('div', {}, h('b', {}, SRS.streak()), h('small', {}, 'gün serisi')),
      h('div', {}, h('b', {}, U.fmtInt(seen)), h('small', {}, 'öğe görüldü')),
      h('div', {}, h('b', {}, st.answered ? U.fmtPct(st.correct / st.answered) : '—'), h('small', {}, 'doğruluk'))));

    panelBody.appendChild(h('div', { 'class': 'sum-head' },
      UI.ring(mean, 96, pack.name + ' genel ustalık'),
      h('div', { 'class': 'sum-stats' },
        h('div', {}, h('b', {}, U.fmtInt(seen)), h('small', {}, '/ ' + U.fmtInt(keys.length) + ' kart görüldü')),
        h('div', {}, h('b', {}, mastered), h('small', {}, 'kart ustalaştı')),
        h('div', {}, h('b', {}, simStore.best ? U.fmtInt(simStore.best) : '—'), h('small', {}, 'simülasyon rekoru')))));

    panelBody.appendChild(UI.sec('Bölgelere göre ustalık', h('div', { 'class': 'bars' }, pack.regions.map(function (r) {
      var us = pack.units.filter(function (u) { return u.reg === r.id; });
      var ks = [];
      us.forEach(function (u) {
        ks.push(pack.srsPrefix + ':loc:' + u.id);
        ks.push(pack.srsPrefix + ':code:' + u.id);
        ks.push(pack.srsPrefix + ':clue:' + u.id);
      });
      var rp = Math.round(SRS.mean(ks) * 100);
      var row = h('div', { 'class': 'bar-row', onclick: function () { map.fitTo(us.map(function (u) { return u.id; }), { pad: 44, maxK: pack.maxFitZoom || 8 }); L.sheet.snap('peek'); } },
        h('div', { 'class': 'br-top' }, h('b', {}, r.tr), h('span', {}, rp + '%')),
        h('div', { 'class': 'bar' }, h('i', { style: { width: rp + '%' } })));
      return row;
    }))));

    panelBody.appendChild(UI.sec('Ustalık haritası', h('div', { 'class': 'legend legend-row' }, LEVELS.map(function (l) {
      return h('span', { 'class': 'lg-row lg-static' }, h('i', { 'class': 'sw ' + l.cls }), h('span', {}, l.label));
    }))));

    var weakRe = new RegExp('^' + pack.srsPrefix + ':(loc|code|clue|vis):(.+)$');
    var weak = Object.keys(Store.data.items).map(function (k) { return { k: k, r: Store.data.items[k] }; })
      .filter(function (x) { return weakRe.test(x.k) && x.r.b <= 1; })
      .sort(function (a, b) { return a.r.b - b.r.b || b.r.t - a.r.t; }).slice(0, 8);
    if (!weak.length) {
      panelBody.appendChild(UI.sec('En zayıf noktalar', h('p', { 'class': 'micro' }, seen ? 'Şu an belirgin bir zayıf nokta yok. Harika gidiyorsun.' : 'Henüz cevap yok. Pratik oturumu başlatınca zayıf kalan kartlar burada listelenir.')));
    } else {
      panelBody.appendChild(UI.sec('En zayıf noktalar', h('ul', { 'class': 'missed' }, weak.map(function (x) {
        var m = weakRe.exec(x.k), ktype = m[1], kid = m[2];
        var qTxt = kid, aTxt = '', kTxt = '';
        if (ktype === 'vis') {
          var v = visById[kid];
          qTxt = v ? v.topic : kid; aTxt = v ? v.title : ''; kTxt = 'Görsel';
        } else {
          var u = pack.uById[kid];
          qTxt = u ? u.name : kid;
          aTxt = ktype === 'code' ? ((u && u.codes && u.codes[0]) || 'kod') : (ktype === 'loc' ? 'haritada bul' : 'saha ipucu');
          kTxt = ktype === 'code' ? 'Kod' : (ktype === 'loc' ? 'Konum' : 'İpucu');
        }
        return h('li', {}, h('span', { 'class': 'm-q' }, qTxt), UI.icon('arrow', 14), h('b', {}, aTxt), h('small', {}, kTxt));
      }))));
    }

    L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', onclick: function () { app.go('pratik'); } }, UI.icon('arrow', 16), 'Pratikle pekiştir')]);
    map.fitAll(false);
    L.sheet.snap('full', { instant: true });
    return { destroy: function () { map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.cExplore = { mount: mountExplore };
  g.Views.cGuide = { mount: mountGuide };
  g.Views.cPractice = { mount: mountPractice };
  g.Views.cSim = { mount: mountSim };
  g.Views.cProgress = { mount: mountProgress };

  g.CountryEngine = { register: registerPack, packs: Packs };
  g.registerCountryPack = registerPack;
})(typeof window !== 'undefined' ? window : globalThis);

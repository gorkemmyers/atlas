/* view-progress.js — İlerleme: ustalık haritası, kategori çubukları, zayıf noktalar.
   Vietnam: progress · Güney Asya: progressAs (aşağıda). Veri ve yedek Ana sayfadadır. */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.VN_DATA, B = g.Bank, Store = g.Store, SRS = g.SRS, Paint = g.Paint, h = U.h;

  var LEVELS = [
    { cls: 'm0', label: 'Hiç sorulmadı' }, { cls: 'm1', label: 'Zayıf' }, { cls: 'm2', label: 'Gelişiyor' },
    { cls: 'm3', label: 'İyi' }, { cls: 'm4', label: 'Çok iyi' }, { cls: 'm5', label: 'Usta' }
  ];
  function masteryLegend(box) {
    LEVELS.forEach(function (l) { box.appendChild(h('div', { 'class': 'lg-row lg-static' }, h('i', { 'class': 'sw ' + l.cls }), h('b', {}, l.label), h('span', {}))); });
  }


  function mount(root, app) {
    var L = app.layout(root);
    var sel = null;
    var map = new g.MapView(L.stage, {
      mesh: { 'in': true, rg: false, mc: false, co: true },
      tip: function (id) { var p = D.pById[id]; return B.shortName(p) + ' · ustalık ' + Math.round(Paint.masteryOf(id) * 100) + '%'; },
      onClick: function (hit) {
        sel = hit.id || null; paintSel(); renderSel();
        /* dökümün olduğu kutu panelin üstünde: panel kapalıysa aç, kutuya kaydır */
        if (sel) { sheet.ensure('half'); U.toPanel(selBox); }
      }
    });
    var panelTop = h('div', { 'class': 'p-top' }, h('div', { 'class': 'p-title' }, h('h2', {}, 'İlerleme')));
    var body = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop); L.panel.appendChild(body);
    L.bind(map);
    var sheet = L.sheet;
    var selBox = h('div', { 'class': 'sel-box' });

    var lblMode = 'name';
    function paintMap() {
      map.setFill(function (id) { return Paint.masteryCls(Paint.masteryOf(id)); });
      map.setLabels(Paint.labelFn(lblMode));
    }
    map.cfg.labels({
      options: [{ v: 'name', label: 'Ad' }, { v: 'area', label: 'Kod', title: 'Alan kodu' }, { v: 'none', label: 'Kapalı' }],
      value: lblMode, def: 'name', onChange: function (v) { lblMode = v; paintMap(); }
    });
    map.cfg.lock('color', 'Renk ustalık düzeyini gösterir');
    map.cfg.legend(masteryLegend);
    function paintSel() { map.clearHighlight('hl-sel'); if (sel) map.highlight([sel], 'hl-sel'); }

    function catKeys(cat) {
      return cat.kinds.reduce(function (a, k) { return a.concat(B.itemKeys(k, {})); }, []);
    }
    function humanize(key) {
      try {
        var q = B.build(key, {}), pm = q.prompt.t === 'hl' ? 'Vurgulanan il' : q.prompt.main;
        if (q.prompt.t !== 'hl' && String(pm) === String(q.answerText)) pm = 'Haritada bul';
        return { q: pm, a: q.answerText, kind: B.KINDS[q.kind].label };
      }
      catch (e) { return { q: key, a: '', kind: '' }; }
    }

    function renderSel() {
      U.clear(selBox);
      if (!sel) { selBox.appendChild(h('p', { 'class': 'micro' }, 'Haritada bir ile dokun: o ilin ustalık dökümünü gör.')); return; }
      var p = D.pById[sel], keys = B.provKeys(sel);
      selBox.appendChild(h('div', { 'class': 'sel-head' }, h('b', {}, B.shortName(p)), UI.area(p.area)));
      selBox.appendChild(h('div', { 'class': 'bars' }, Object.keys(keys).map(function (k) {
        var m = SRS.mean(keys[k]), seen = SRS.seenCount(keys[k]);
        return h('div', { 'class': 'barrow' }, h('span', {}, B.KINDS[k].label), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(m * 100) + '%' } })), h('b', {}, seen + '/' + keys[k].length));
      })));
      selBox.appendChild(h('div', { 'class': 'row row-wrap' },
        h('a', { 'class': 'btn btn-sm', href: app.href('kesfet'), onclick: function () { app.launch = { select: sel }; } }, 'Kartı aç'),
        h('button', { type: 'button', 'class': 'btn btn-sm', onclick: function () {
          var ks = []; Object.keys(keys).forEach(function (k) { ks = ks.concat(keys[k]); });
          app.launch = { keys: U.shuffle(ks).slice(0, 12) }; app.go('pratik');
        } }, 'Bu ili çalış')));
    }

    function render() {
      U.clear(body);
      var st = Store.data.stats, acc = st.answered ? st.correct / st.answered : 0;
      body.appendChild(h('div', { 'class': 'tiles' },
        h('div', {}, h('b', {}, SRS.today()), h('small', {}, 'bugün')),
        h('div', {}, h('b', {}, SRS.streak()), h('small', {}, 'gün serisi')),
        h('div', {}, h('b', {}, U.fmtInt(st.answered)), h('small', {}, 'toplam cevap')),
        h('div', {}, h('b', {}, st.answered ? U.fmtPct(acc) : '—'), h('small', {}, 'doğruluk'))));
      if (!Store.persistent) body.appendChild(h('div', { 'class': 'tipcard tipcard-warn' }, h('div', {}, h('b', {}, 'Depolama kapalı. '), 'Tarayıcı bu sayfa için kayıt tutmuyor; ilerlemen sekme kapanınca silinir. Ana sayfadan yedek kopyalayabilirsin.')));

      /* haritada seçilen ilin dökümü hemen üstte: dokununca gözün önünde */
      body.appendChild(selBox);
      renderSel();

      /* genel ustalık + kategori çubukları */
      var all = [];
      var rows = B.CATS.map(function (c) {
        var keys = catKeys(c); all = all.concat(keys);
        return { c: c, n: keys.length, seen: SRS.seenCount(keys), m: SRS.mean(keys) };
      });
      var overall = SRS.mean(all), seenAll = SRS.seenCount(all);
      body.appendChild(h('div', { 'class': 'sum-head' }, UI.ring(overall, 96, 'Genel ustalık'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, U.fmtInt(seenAll)), h('small', {}, '/ ' + U.fmtInt(all.length) + ' öğe görüldü')),
          h('div', {}, h('b', {}, all.filter(function (k) { return SRS.box(k) >= 4; }).length), h('small', {}, 'öğe ustalaştı')))));
      body.appendChild(UI.sec('Kategoriler', h('div', { 'class': 'bars' }, rows.map(function (r) {
        return h('div', { 'class': 'barrow' }, h('span', {}, r.c.label), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(r.m * 100) + '%' } })), h('b', {}, r.seen + '/' + r.n));
      }))));

      /* harita lejandı */
      body.appendChild(UI.sec('Ustalık haritası', h('div', { 'class': 'legend legend-row' }, LEVELS.map(function (l) { return h('span', { 'class': 'lg-row lg-static' }, h('i', { 'class': 'sw ' + l.cls }), h('span', {}, l.label)); }))));

      /* zayıf noktalar: eylem düğmesi alt şeritte sabit */
      var weak = Object.keys(Store.data.items).map(function (k) { return { k: k, r: Store.data.items[k] }; })
        .filter(function (x) { return x.r.b <= 1 && B.KINDS[x.k.split(':')[0]]; })
        .sort(function (a, b) { return a.r.b - b.r.b || b.r.t - a.r.t; }).slice(0, 8);
      if (!weak.length) {
        body.appendChild(UI.sec('En zayıf noktalar', h('p', { 'class': 'micro' }, st.answered ? 'Şu an belirgin bir zayıf nokta yok. Harika gidiyorsun.' : 'Henüz cevap yok. Bir konu sayfasından Alıştır’a basıp oturum başlat; zayıf noktaların burada listelenir.')));
        L.foot(null);
      } else {
        body.appendChild(UI.sec('En zayıf noktalar', h('ul', { 'class': 'missed' }, weak.map(function (x) {
          var t = humanize(x.k);
          return h('li', {}, h('span', { 'class': 'm-q' }, t.q), UI.icon('arrow', 14), h('b', {}, t.a), h('small', {}, t.kind));
        }))));
        L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'pg-weak', onclick: function () { app.launch = { preset: 'zayif' }; app.go('pratik'); } }, UI.icon('flame', 16), 'Zayıflarımı çalış')]);
      }

      /* simülasyon */
      var sim = Store.data.sim;
      body.appendChild(UI.sec('Simülasyon', sim.games
        ? h('p', {}, h('b', {}, U.fmtInt(sim.best)), ' en iyi puan · ' + sim.games + ' oyun')
        : h('p', { 'class': 'micro' }, 'Henüz oyun oynamadın.')));
    }

    paintMap(); render();
    sheet.snap('half');
    map.fitAll(false);
    return { destroy: function () { map.destroy(); } };
  }

  /* ================================================================================================
     Güney Asya: Alfabe ilerlemesi. Aynı düzen; harita eyalet ustalığını boyar.
     Bir yerin ustalığı = “eyaletten yazıya” ve “haritada bul” kutularının ortalaması. */
  function mountAs(root, app) {
    var AB = g.ASBank, AD = g.AS_DATA, P = AD.pById, S = AD.sById;
    var L = app.layout(root);
    var sel = null;
    function placeKeys(pid) { return { st2s: ['as:st2s:' + pid], loc: ['as:loc:' + pid] }; }
    function placeLevel(pid) { return SRS.mean(['as:st2s:' + pid, 'as:loc:' + pid]); }

    var map = new g.MapView(L.stage, {
      geo: g.AS_GEO, theme: 'as', mesh: { 'in': true, rg: true, mc: true, co: true }, maxK: 14,
      tip: function (id) { return P[id].short + ' · ustalık ' + Math.round(placeLevel(id) * 100) + '%'; },
      onClick: function (hit) {
        sel = hit.id || null; paintSel(); renderSel();
        if (sel) { sheet.ensure('half'); U.toPanel(selBox); }
      }
    });
    var panelTop = h('div', { 'class': 'p-top' }, h('div', { 'class': 'p-title' }, h('h2', {}, 'İlerleme')));
    var body = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop); L.panel.appendChild(body);
    L.bind(map);
    var sheet = L.sheet;
    var selBox = h('div', { 'class': 'sel-box' });

    var lblModeAs = 'name';
    function paintMap() {
      map.setFill(function (id) { return Paint.masteryCls(placeLevel(id)); });
      map.setLabels(lblModeAs === 'name' ? function (id) { return P[id] ? P[id].short : null; } : null, { size: 10.5, fit: 1.7 });
    }
    map.cfg.labels({
      options: [{ v: 'name', label: 'Ad' }, { v: 'none', label: 'Kapalı' }],
      value: lblModeAs, def: 'name', onChange: function (v) { lblModeAs = v; paintMap(); }
    });
    map.cfg.lock('color', 'Renk ustalık düzeyini gösterir');
    map.cfg.legend(masteryLegend);
    function paintSel() { map.clearHighlight('hl-sel'); if (sel) map.highlight([sel], 'hl-sel'); }

    /* anahtar → okunur özet (zayıf noktalar listesi için) */
    function humanize(key) {
      var m = /^as:([a-z0-9]+):(.+)$/.exec(key), id = m ? m[2] : '';
      switch (m && m[1]) {
        case 'sid': return { q: S[id] ? S[id].tr : id, a: 'eski kayıt', kind: 'Yazı' };
        case 'pair': { var ab = id.split('|'); return { q: (S[ab[0]] ? S[ab[0]].tr : ab[0]) + ' / ' + (S[ab[1]] ? S[ab[1]].tr : ab[1]), a: 'ayırt et', kind: AB.KINDS.pair.label }; }
        case 'reg': return { q: S[id] ? S[id].nat : id, a: AB.names(AD.statesOf(id, true), 3), kind: AB.KINDS.reg.label };
        case 'st2s': return { q: P[id] ? P[id].short : id, a: P[id] ? AB.scriptNames(P[id].main) : '', kind: AB.KINDS.st2s.label };
        case 'loc': return { q: P[id] ? P[id].short : id, a: 'haritada bul', kind: AB.KINDS.loc.label };
        default: return { q: key, a: '', kind: '' };
      }
    }

    function renderSel() {
      U.clear(selBox);
      if (!sel) { selBox.appendChild(h('p', { 'class': 'micro' }, 'Haritada bir yere dokun: o yerin ustalık dökümünü gör.')); return; }
      var p = P[sel], keys = placeKeys(sel);
      selBox.appendChild(h('div', { 'class': 'sel-head' }, h('b', {}, p.short), h('small', {}, AB.scriptNames(p.main))));
      selBox.appendChild(h('div', { 'class': 'bars' }, Object.keys(keys).map(function (k) {
        return h('div', { 'class': 'barrow' }, h('span', {}, AB.KINDS[k].label), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(SRS.mean(keys[k]) * 100) + '%' } })), h('b', {}, SRS.seenCount(keys[k]) + '/' + keys[k].length));
      })));
      selBox.appendChild(h('div', { 'class': 'row row-wrap' },
        h('a', { 'class': 'btn btn-sm', href: app.href('kesfet'), onclick: function () { app.launch = { select: sel }; } }, 'Kartı aç'),
        h('button', { type: 'button', 'class': 'btn btn-sm', onclick: function () {
          app.launch = { keys: ['as:st2s:' + sel, 'as:loc:' + sel] }; app.go('pratik');
        } }, 'Bu yeri çalış')));
    }

    function render() {
      U.clear(body);
      var akeys = AB.allKeys(), seen = SRS.seenCount(akeys), mastered = akeys.filter(function (k) { return SRS.box(k) >= 4; }).length;
      var st = Store.data.stats;
      body.appendChild(h('div', { 'class': 'tiles' },
        h('div', {}, h('b', {}, SRS.today()), h('small', {}, 'bugün')),
        h('div', {}, h('b', {}, SRS.streak()), h('small', {}, 'gün serisi')),
        h('div', {}, h('b', {}, U.fmtInt(seen)), h('small', {}, 'öğe görüldü')),
        h('div', {}, h('b', {}, st.answered ? U.fmtPct(st.correct / st.answered) : '—'), h('small', {}, 'doğruluk'))));
      if (!Store.persistent) body.appendChild(h('div', { 'class': 'tipcard tipcard-warn' }, h('div', {}, h('b', {}, 'Depolama kapalı. '), 'Tarayıcı bu sayfa için kayıt tutmuyor; ilerlemen sekme kapanınca silinir. Ana sayfadan yedek kopyalayabilirsin.')));

      body.appendChild(selBox); renderSel();

      var rows = AB.CATS.map(function (c) {
        var ks = c.kinds.reduce(function (a, k) { return a.concat(AB.itemKeys(k, {})); }, []);
        return { c: c, n: ks.length, seen: SRS.seenCount(ks), m: SRS.mean(ks) };
      });
      body.appendChild(h('div', { 'class': 'sum-head' }, UI.ring(SRS.mean(akeys), 96, 'Genel ustalık'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, U.fmtInt(seen)), h('small', {}, '/ ' + U.fmtInt(akeys.length) + ' öğe görüldü')),
          h('div', {}, h('b', {}, mastered), h('small', {}, 'öğe ustalaştı')))));
      body.appendChild(UI.sec('Kategoriler', h('div', { 'class': 'bars' }, rows.map(function (r) {
        return h('div', { 'class': 'barrow' }, h('span', {}, r.c.label), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(r.m * 100) + '%' } })), h('b', {}, r.seen + '/' + r.n));
      }))));
      body.appendChild(UI.sec('Ustalık haritası', h('div', { 'class': 'legend legend-row' }, LEVELS.map(function (l) { return h('span', { 'class': 'lg-row lg-static' }, h('i', { 'class': 'sw ' + l.cls }), h('span', {}, l.label)); }))));

      var weak = Object.keys(Store.data.items).filter(function (k) { return /^as:(reg|pair|st2s|loc):/.test(k) && Store.data.items[k].b <= 1; })
        .map(function (k) { return { k: k, r: Store.data.items[k] }; })
        .sort(function (a, b) { return a.r.b - b.r.b || b.r.t - a.r.t; }).slice(0, 8);
      if (!weak.length) {
        body.appendChild(UI.sec('En zayıf noktalar', h('p', { 'class': 'micro' }, seen ? 'Şu an belirgin bir zayıf nokta yok. Harika gidiyorsun.' : 'Henüz cevap yok. Bir konu sayfasından Alıştır’a basıp oturum başlat; zayıf noktaların burada listelenir.')));
        L.foot(null);
      } else {
        body.appendChild(UI.sec('En zayıf noktalar', h('ul', { 'class': 'missed' }, weak.map(function (x) {
          var t = humanize(x.k);
          return h('li', {}, h('span', { 'class': 'm-q' }, t.q), UI.icon('arrow', 14), h('b', {}, t.a), h('small', {}, t.kind));
        }))));
        L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'pg-alfabe-weak', onclick: function () { app.launch = { preset: 'zayif' }; app.go('pratik'); } }, UI.icon('flame', 16), 'Zayıflarımı çalış')]);
      }

      /* simülasyon */
      var simAs = Store.data.simAs || { games: 0, best: 0 };
      body.appendChild(UI.sec('Simülasyon', simAs.games
        ? h('p', {}, h('b', {}, U.fmtInt(simAs.best)), ' en iyi puan · ' + simAs.games + ' oyun')
        : h('p', { 'class': 'micro' }, 'Henüz oyun oynamadın.')));
    }

    paintMap(); render();
    sheet.snap('half');
    map.fitAll(false);
    return { destroy: function () { map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.progressAs = { mount: mountAs };
  g.Views.progress = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

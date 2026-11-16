/* view-guide.js — konu sayfaları: bölgeler (ipuçları ve il tablosuyla), alan kodları, il adları.
   Hangi konunun açılacağı bölge kaydındaki alanın `tab` değerinden gelir (regions.js). */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.VN_DATA, G = g.VN_GEO, B = g.Bank, Store = g.Store, Paint = g.Paint, Nm = g.Names, h = U.h;

  /* konuya göre harita: renk modu, etiket, ağ */
  var MAPCFG = {
    names:   { color: 'names',  label: 'name', mesh: { rg: false } },
    regions: { color: 'region', label: 'name', mesh: { rg: true } },
    area:    { color: 'area',   label: 'area', mesh: { rg: false } }
  };

  function mount(root, app) {
    var S = Store.data.set;
    var L = app.layout(root, { wide: true });
    var launch = app.launch || {};
    var topic = app.section || {};
    var tab = MAPCFG[topic.tab] ? topic.tab : 'names';
    var wantRule = launch.rule || null;
    app.launch = null;
    var sticky = [], selId = null, selBoxEl = null;

    var map = new g.MapView(L.stage, {
      mesh: { 'in': true, rg: true, mc: false, co: true },
      tip: function (id) { var p = D.pById[id]; return B.shortName(p) + ' · ' + B.A0(p.area); },
      onClick: function (hit) { if (hit.id) pickProv(hit.id, false); else { selId = null; sticky = []; paintCtx(); renderStrip(); } }
    });
    L.bind(map);

    /* konu başlığı: ad + her zaman erişilen “Alıştır” (alt panel kapalıyken de görünür) */
    var head = h('div', { 'class': 'topic-h' },
      h('h2', {}, topic.label || 'Rehber'),
      topic.drill ? h('a', { 'class': 'btn btn-primary btn-sm', id: 'topic-drill', href: app.href('pratik'),
        onclick: function () { app.launch = { preset: topic.drill, from: topic.id }; } }, UI.icon('target', 16), 'Alıştır') : null);
    var strip = h('div', { 'class': 'strip', hidden: true });
    var body = h('div', { 'class': 'p-body guide' });
    L.panel.appendChild(h('div', { 'class': 'p-top' }, head, strip));
    L.panel.appendChild(body);

    /* ---- harita bağlama ---- */
    function ctx(ids) { map.clearHighlight('hl-ctx'); if (ids && ids.length) map.highlight(ids, 'hl-ctx'); }
    function paintCtx() {
      map.clearHighlight('hl-ctx'); map.clearHighlight('hl-sel');
      if (sticky.length) map.highlight(sticky, 'hl-ctx');
      if (selId) map.highlight([selId], 'hl-sel');
    }
    function bindRow(el, ids) {
      el.addEventListener('mouseenter', function () { ctx(ids); });
      el.addEventListener('mouseleave', function () { ctx(sticky); });
      el.addEventListener('focusin', function () { ctx(ids); });
      el.addEventListener('focusout', function () { ctx(sticky); });
      el.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('button.chip, a, input')) return;
        sticky = ids.slice(); ctx(sticky); showMap(); map.fitTo(ids, { pad: 36, maxK: 9 });
      });
    }
    /* alt panel tamamen açıksa ya da kapalıysa haritayı görecek kadar yarıya getir */
    function showMap() { if (L.sheet.state !== 'half') L.sheet.snap('half'); }
    function pickProv(id, fit) {
      selId = id; paintCtx(); renderStrip(); showMap();
      if (fit !== false) map.fitTo([id], { pad: 56, maxK: 9 });
    }
    function renderSelBox() {
      if (!selBoxEl) return;
      U.clear(selBoxEl);
      if (selId) selBoxEl.appendChild(UI.nameBlock(selId, { onRule: focusRule }));
      else selBoxEl.appendChild(h('p', { 'class': 'micro' }, 'Haritada bir ile dokun: adının heceleri ve hangi kurala girdiği burada görünür.'));
    }
    function renderStrip() {
      renderSelBox();
      U.clear(strip);
      if (!selId) { strip.hidden = true; L.sheet.reflow(); return; }
      var p = D.pById[selId];
      strip.hidden = false;
      strip.appendChild(h('div', { 'class': 'strip-main' },
        h('b', {}, B.shortName(p)), UI.area(p.area),
        UI.regionChip(p.region, { sm: true })));
      strip.appendChild(h('a', { 'class': 'strip-link', href: app.href('kesfet'), onclick: function () { app.launch = { select: selId, from: topic.id }; } }, 'Kartı aç', UI.icon('arrow', 14)));
      L.sheet.reflow();
    }
    function chipFor(p, sub) {
      return UI.navChip(B.shortName(p), function () { pickProv(p.id, true); }, sub === undefined ? '0' + p.area : sub);
    }


    function scrollToEl(el) { U.toPanel(el); }
    function ruleById(id) { return Nm.RULES.filter(function (r) { return r.id === id; })[0] || null; }
    function ruleIds(r) {
      var out = [];
      r.groups.forEach(function (gr) { gr.ids.forEach(function (i) { if (out.indexOf(i) < 0) out.push(i); }); });
      return out;
    }
    /* bir kural kartını bul, parlat, haritada göster */
    function focusRule(ruleId) {
      var el = U.$('[data-rule="' + ruleId + '"]', body), r = ruleById(ruleId);
      if (!el || !r) return;
      showMap();
      scrollToEl(el);
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
      sticky = ruleIds(r); ctx(sticky); map.fitTo(sticky, { pad: 36, maxK: 9 });
    }
    function provChips(ids, sub) {
      return ids.map(function (id) { return chipFor(D.pById[id], sub); });
    }

    /* ---- İl adı mantığı ---- */
    var FLOW = [
      { t: 'Özel önek var mı?', b: 'Đắk · Kon · Gia → Orta Yaylalar.  Bắc- ve Hà- ile başlayan → Kuzey.', rules: ['hl', 'bac', 'ha'], go: 'hl' },
      { t: 'Bình nerede duruyor?', b: 'Adın SONUNDA → Kuzey yarı (Thái Bình, Ninh Bình, Hòa Bình).  BAŞINDA → Güney yarı (Bình Định, Bình Dương, Bình Phước).', rules: ['binh'], go: 'binh' },
      { t: 'Quảng + ikinci hece', b: 'Orta kıyıda kuzeyden güneye: Bình → Trị → (Thiên) → (Đà Nẵng) → Nam → Ngãi.  İstisna: Quảng Ninh en kuzeydoğuda.', rules: ['quang'], go: 'quang' },
      { t: 'Çince gibi okunmuyor mu?', b: 'Cà Mau · Sóc Trăng · Trà Vinh · Bạc Liêu · Bến Tre · Cần Thơ → Mekong Deltası.  -Giang: Hà/Bắc önde ise Kuzey, An/Kiên/Tiền/Hậu önde ise Mekong.', rules: ['loc', 'giang'], go: 'loc' },
      { t: 'Sözcüğü çöz', b: 'Sơn = dağ · Hải = deniz · Tây = batı · Biên = sınır · Cao = yüksek · Thuận = kurak güney kıyı.', rules: ['word', 'thuan'], go: 'word' },
      { t: 'Dilek adı mı?', b: 'An · Ninh · Yên · Phú · Hưng · Vĩnh · Thái · Hòa · Khánh · Thọ… konum vermez. Ada güvenme; alan koduna ve komşulara bak.', rules: ['wish'], go: 'wish' },
      { t: 'Tuzaklara dikkat', b: 'Lào Cai ≠ Laos · Quảng Ninh orta kıyı değil · Nam Định ve Hà Nam’daki “Nam” güney demek değil.', rules: ['trap'], go: 'trap' }
    ];

    function relBar(cn) {
      var LV = [{ s: 3, c: 'rb3' }, { s: 2, c: 'rb2' }, { s: 1, c: 'rb1' }, { s: 0, c: 'rb0' }];
      var wrap = h('div', { 'class': 'relbar-w' });
      var bar = h('div', { 'class': 'relbar', role: 'img', 'aria-label': 'Adın konum verme gücü: ' + LV.map(function (l) { return cn[l.s] + ' ' + Nm.stLabel(l.s).t; }).join(', ') });
      var leg = h('div', { 'class': 'relleg' });
      LV.forEach(function (l) {
        var ids = D.provinces.filter(function (p) { return Nm.info(p.id).s === l.s; }).map(function (p) { return p.id; });
        bar.appendChild(h('i', { 'class': l.c, style: { flex: String(cn[l.s]) + ' 1 0' } }));
        var it = h('button', { type: 'button', 'class': 'rl-i' }, h('i', { 'class': 'rl-d ' + l.c }), h('b', {}, cn[l.s]), h('span', {}, Nm.stLabel(l.s).t), h('small', {}, Nm.stLabel(l.s).long));
        it.addEventListener('mouseenter', function () { ctx(ids); });
        it.addEventListener('mouseleave', function () { ctx(sticky); });
        it.addEventListener('focus', function () { ctx(ids); });
        it.addEventListener('blur', function () { ctx(sticky); });
        it.addEventListener('click', function () { sticky = ids.slice(); ctx(sticky); showMap(); map.fitAll(true); });
        leg.appendChild(it);
      });
      wrap.appendChild(bar); wrap.appendChild(leg);
      return wrap;
    }

    function ruleCard(r) {
      var all = ruleIds(r);
      var card = h('section', { 'class': 'rule', 'data-rule': r.id, tabindex: 0 },
        h('header', { 'class': 'rule-h' },
          h('div', { 'class': 'rule-t' }, h('h4', {}, r.title), h('p', { 'class': 'rule-gist' }, r.gist)),
          h('div', { 'class': 'rule-meta' }, UI.rel(r.st), h('span', { 'class': 'rule-stat' }, r.stat))),
        r.groups.map(function (gr) {
          var row = h('div', { 'class': 'rgroup' },
            h('div', { 'class': 'rg-l' }, h('i', { 'class': 'sw ' + gr.cls }), gr.lbl),
            h('div', { 'class': 'chips' }, provChips(gr.ids, '')));
          bindRow(row, gr.ids);
          return row;
        }),
        h('p', { 'class': 'rule-body' }, r.body),
        r.traps ? h('ul', { 'class': 'traps' }, r.traps.map(function (t) { return h('li', {}, h('b', {}, t[0]), ' — ' + t[1]); })) : null,
        r.watch ? h('p', { 'class': 'rule-watch' }, UI.icon('info', 14), h('span', {}, r.watch)) : null);
      bindRow(card, all);
      return card;
    }

    function sylTable() {
      var inp = h('input', { type: 'search', 'class': 'input', placeholder: 'Hece ya da anlam ara (örn. Bình, dağ, nehir)…', 'aria-label': 'Hece sözlüğünde ara', autocomplete: 'off', spellcheck: 'false' });
      var wrap = h('div', { 'class': 'tablewrap' });
      function draw() {
        var q = D.norm(inp.value);
        var rows = Nm.SYLX.filter(function (x) { return !q || [x.s, x.m, x.ex, x.g].some(function (t) { return D.norm(t).indexOf(q) >= 0; }); });
        U.clear(wrap);
        if (!rows.length) { wrap.appendChild(UI.empty('Eşleşme yok', 'Farklı bir sözcük dene.')); return; }
        wrap.appendChild(h('table', { 'class': 'tbl tbl-compact' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Hece'), h('th', {}, 'Anlam'), h('th', {}, 'Ne söyler'), h('th', {}, 'Örnek'))),
          h('tbody', {}, rows.map(function (x) {
            return h('tr', {}, h('td', {}, h('b', {}, x.s)), h('td', {}, x.m), h('td', {}, h('div', {}, x.g), UI.rel(x.st)), h('td', { 'class': 'td-ex' }, x.ex));
          }))));
      }
      inp.addEventListener('input', draw);
      draw();
      return h('div', { 'class': 'stack' }, inp, wrap);
    }

    function glossCards() {
      var out = h('div', { 'class': 'stack' });
      out.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, h('b', {}, 'Üç kesim, eski Fransız adlarıyla. '), 'Bắc Bộ ≈ Tonkin, Trung Bộ ≈ Annam, Nam Bộ ≈ Cochinchine. Bộ = kesim, Bắc/Trung/Nam = kuzey/orta/güney: “Bắc Trung Bộ” yani “Kuzey-Orta kesim”.')));
      Nm.MACRO_GLOSS.forEach(function (m) {
        var ids = D.provinces.filter(function (p) { return p.macro === m.id; }).map(function (p) { return p.id; });
        var card = h('section', { 'class': 'rcard', tabindex: 0 },
          h('header', {}, h('div', {}, h('h4', {}, m.vi + ' — ' + m.tr), h('small', {}, m.old + ' · ' + ids.length + ' il'))));
        bindRow(card, ids);
        out.appendChild(card);
      });
      Nm.GLOSS.forEach(function (gl) {
        var ids = D.provinces.filter(function (p) { return p.region === gl.id; }).map(function (p) { return p.id; });
        var card = h('section', { 'class': 'rcard', tabindex: 0 },
          h('header', {}, h('div', {}, h('h4', {}, gl.vi), h('small', {}, gl.tr + ' · ' + D.regionById[gl.id].short + ' · ' + ids.length + ' il'))),
          h('div', { 'class': 'syls' }, gl.parts.map(function (x) { return h('span', { 'class': 'syl' }, h('b', {}, x[0]), h('i', {}, x[1])); })));
        bindRow(card, ids);
        out.appendChild(card);
      });
      return out;
    }

    function histRows() {
      var out = h('div', { 'class': 'stack' });
      out.appendChild(h('p', { 'class': 'micro' }, 'İller 1976’da birleştirilip 1989–1997 arasında yeniden ayrıldı. Birleşik adlar, bugünkü adların komşuluğunu ele verir: “Nghệ Tĩnh” demek Nghệ An ile Hà Tĩnh komşu demektir.'));
      Nm.HIST.forEach(function (x) {
        var row = h('div', { 'class': 'hist-row', tabindex: 0 }, h('div', {}, h('b', {}, x.n), h('span', {}, ' = ' + x.t)), h('div', { 'class': 'chips' }, provChips(x.ids, '')));
        bindRow(row, x.ids);
        out.appendChild(row);
      });
      return out;
    }

    function namesTab() {
      var w = h('div', { 'class': 'stack names-tab' });
      var cn = Nm.counts(), reliable = cn[2] + cn[3];
      selBoxEl = h('div', { 'class': 'selbox' });
      renderSelBox();

      w.appendChild(h('section', { 'class': 'hero' },
        h('div', { 'class': 'hero-q' }, 'İl adından yer tahmini'),
        h('div', { 'class': 'hero-a' }, reliable + ' il güvenilir ipucu verir; ' + cn[1] + ' zayıf, ' + cn[0] + ' ipucusuz.'),
        relBar(cn),
        h('p', { 'class': 'micro' }, cn[0] + ' il “dilek adı” taşır ve konum vermez; kesin ayrım için Alan kodları’na bak.')));
      w.appendChild(selBoxEl);

      /* tabelada il ve yer adı nerede yazar: özgün çizimler (js/figs-vietnam.js) */
      if (g.Kit && g.Kit.setKeys('vn-sign').length) {
        w.appendChild(h('h3', { 'class': 'sec-h' }, 'Tabelada nerede yazar? ', h('small', {}, 'çizim ve fotoğrafları kaydır')));
        w.appendChild(h('div', { 'class': 'dec-fig' }, g.Kit.carousel('vn-sign', { label: 'Vietnam tabela çizimleri ve fotoğrafları' })));
      }

      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Haritadaki renkler ', h('small', {}, '13 kural ailesi')));
      var chipsEl = h('div', { 'class': 'chips fam-chips' });
      Paint.legend('names').forEach(function (it) {
        var b = h('button', { type: 'button', 'class': 'tchip fam', 'data-fam': it.fam, title: it.sub }, h('i', { 'class': 'sw ' + it.cls }), it.label, h('small', {}, it.ids.length));
        b.addEventListener('mouseenter', function () { ctx(it.ids); });
        b.addEventListener('mouseleave', function () { ctx(sticky); });
        b.addEventListener('focus', function () { ctx(it.ids); });
        b.addEventListener('blur', function () { ctx(sticky); });
        b.addEventListener('click', function () { sticky = it.ids.slice(); ctx(sticky); map.fitTo(it.ids, { pad: 36, maxK: 9 }); focusRuleQuiet(Nm.famById[it.fam].rule); });
        chipsEl.appendChild(b);
      });
      w.appendChild(chipsEl);

      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Hızlı karar akışı ', h('small', {}, 'bir ad görünce bu sırayla düşün')));
      var flow = h('ol', { 'class': 'flow' }, FLOW.map(function (f, i) {
        var ids = [];
        f.rules.forEach(function (rid) { var r = ruleById(rid); if (r) ruleIds(r).forEach(function (x) { if (ids.indexOf(x) < 0) ids.push(x); }); });
        var li = h('li', { 'class': 'flow-i', tabindex: 0 },
          h('span', { 'class': 'flow-n' }, i + 1),
          h('div', { 'class': 'flow-b' }, h('b', {}, f.t), h('p', {}, f.b),
            h('button', { type: 'button', 'class': 'linkish', onclick: function () { focusRule(f.go); } }, 'Ayrıntı ve iller')));
        bindRow(li, ids);
        return li;
      }));
      w.appendChild(flow);

      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Kurallar ', h('small', {}, 'her kartta istisnalar da var')));
      Nm.RULES.forEach(function (r) { w.appendChild(ruleCard(r)); });

      w.appendChild(h('details', { 'class': 'fold' }, h('summary', {}, UI.icon('book', 16), 'Hece sözlüğü'), h('div', { 'class': 'fold-body' }, sylTable())));
      w.appendChild(h('details', { 'class': 'fold' }, h('summary', {}, UI.icon('layers', 16), 'Bölge adlarının çözümü'), h('div', { 'class': 'fold-body' }, glossCards())));
      w.appendChild(h('details', { 'class': 'fold' }, h('summary', {}, UI.icon('clock', 16), 'Eski birleşik il adları'), h('div', { 'class': 'fold-body' }, histRows())));

      w.appendChild(h('details', { 'class': 'fold' }, h('summary', {}, UI.icon('flag', 16), 'Tabela sözlüğü ve idari kademeler'), h('div', { 'class': 'fold-body' }, signTips())));
      return w;
    }
    /* karttaki kural rozetine basınca yalnızca kaydır (haritaya dokunma) */
    function focusRuleQuiet(ruleId) {
      var el = U.$('[data-rule="' + ruleId + '"]', body);
      if (!el) return;
      showMap();
      scrollToEl(el);
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    }

    /* ---- Alan kodu mantığı ---- */
    function ladderCard(l, warn) {
      var steps = [];
      l.ids.forEach(function (id, i) {
        if (i) steps.push(UI.icon('arrow', 13));
        steps.push(h('span', { 'class': 'rung' }, UI.area(l.codes[i]), h('small', {}, B.shortName(D.pById[id]))));
      });
      var card = h('section', { 'class': 'ladder' + (warn ? ' ladder-warn' : ''), tabindex: 0 },
        h('div', { 'class': 'ladder-h' }, h('b', {}, l.label), h('small', {}, l.note)),
        h('div', { 'class': 'rungs' }, steps));
      bindRow(card, l.ids);
      return card;
    }
    function splitLead(txt) {
      var i = txt.indexOf(': ');
      return i > 0 ? [txt.slice(0, i), txt.slice(i + 2)] : ['', txt];
    }
    function areaLogic(w) {
      var A = Nm.AREA;
      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Mantık ', h('small', {}, '“02”den sonraki hane kuzeyden güneye iner')));
      w.appendChild(h('p', { 'class': 'lead' }, A.lead));
      var sweep = h('div', { 'class': 'sweep', role: 'list' }, h('div', { 'class': 'sweep-end' }, UI.icon('arrow', 12), 'Kuzey'),
        A.sweep.map(function (x) {
          var ids = D.provinces.filter(function (p) { return Paint.famOfArea(p.area) === x.k; }).map(function (p) { return p.id; });
          var row = h('div', { 'class': 'sweep-row', role: 'listitem', tabindex: 0 },
            h('span', { 'class': 'famkey q' + Paint.famIdx[x.k] }, x.k + (x.k === '24' || x.k === '28' ? '' : 'x')),
            h('div', { 'class': 'sw-t' }, h('b', {}, x.t), h('small', {}, x.n)),
            h('span', { 'class': 'sw-n' }, ids.length + ' il'));
          bindRow(row, ids);
          return row;
        }), h('div', { 'class': 'sweep-end sweep-end-s' }, 'Güney', UI.icon('arrow', 12)));
      w.appendChild(sweep);
      w.appendChild(h('p', { 'class': 'micro' }, A.two));

      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Merdivenler ', h('small', {}, 'son hane büyür → güneye inersin')));
      A.ladders.forEach(function (l) { w.appendChild(ladderCard(l)); });
      w.appendChild(ladderCard({ label: 'Dikkat: ters çift', codes: A.swap.codes, ids: A.swap.ids, note: A.swap.note }, true));

      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Mekong: 29x kümeleri'));
      var cl = h('div', { 'class': 'clusters' }, A.clusters.map(function (c) {
        var card = h('section', { 'class': 'cluster', tabindex: 0 },
          h('div', { 'class': 'cl-codes' }, c.codes.map(function (k) { return UI.area(k); })),
          h('b', {}, c.t), h('small', {}, c.n));
        bindRow(card, c.ids);
        return card;
      }));
      w.appendChild(cl);
      [A.ring, A.delta].forEach(function (t) {
        var sp = splitLead(t);
        w.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, sp[0] ? h('b', {}, sp[0] + '. ') : null, sp[1])));
      });
      w.appendChild(h('h3', { 'class': 'sec-h' }, 'İstisnalar ', h('small', {}, 'kurala uymayanlar')));
      w.appendChild(h('ul', { 'class': 'plain-list exc' }, A.exceptions.map(function (x) { return h('li', {}, h('b', {}, x[0]), h('span', {}, x[1])); })));
    }
    /* ---- sekmeler ---- */
    function regionsTab() {
      var w = h('div', { 'class': 'stack' });
      w.appendChild(h('div', { 'class': 'tipcard tipcard-plain' },
        h('div', {}, h('b', {}, 'Bölge ipuçları. '), 'Her kart bölgeyi tanıtan görünümü anlatır: arazi, bitki örtüsü, yapılar. Bir karta ya da ile dokununca iller haritada parlar.')));
      D.macros.forEach(function (m) {
        w.appendChild(h('h3', { 'class': 'sec-h' }, m.tr + ' ', h('small', {}, m.vi)));
        D.regions.filter(function (r) { return r.macro === m.id; }).forEach(function (r) {
          var ps = D.provinces.filter(function (p) { return p.region === r.id; });
          var card = h('section', { 'class': 'rcard', tabindex: 0 },
            h('header', {}, h('i', { 'class': 'sw sw-lg q' + B.regIdx[r.id] }),
              h('div', {}, h('h4', {}, r.tr), h('small', {}, r.vi + ' · ' + ps.length + ' il'))),
            h('p', { 'class': 'cue' }, r.cue),
            h('div', { 'class': 'chips' }, ps.map(function (p) { return chipFor(p); })));
          bindRow(card, ps.map(function (p) { return p.id; }));
          w.appendChild(card);
        });
      });
      w.appendChild(h('details', { 'class': 'fold' }, h('summary', {}, UI.icon('list', 16), 'Tüm iller tablosu'), h('div', { 'class': 'fold-body' }, tableTab())));
      return w;
    }

    function decodePhone(str) {
      var d = String(str).replace(/\D/g, '');
      if (!d) return null;
      if (d.indexOf('84') === 0 && d.length >= 9) d = '0' + d.slice(2);
      if (d.charAt(0) !== '0') d = '0' + d;
      var n = d.slice(1), i;
      for (i = 0; i < D.oldCodes.length; i++) {
        var oc = D.oldCodes[i];
        if (oc[1] !== '08' && d.indexOf(oc[1]) === 0 && oc[1].length >= 2 && (oc[1].length > 2 || n.charAt(0) === '4')) {
          var pid = D.areaOwner[oc[2]];
          return { kind: 'old', pid: pid, old: oc[1], code: oc[2] };
        }
      }
      if (/^[35789]/.test(n)) return { kind: 'mobile' };
      if (n.charAt(0) !== '2') return { kind: 'unknown' };
      var a3 = n.slice(0, 3), a2 = n.slice(0, 2);
      if (D.areaOwner[a3]) return { kind: 'ok', pid: D.areaOwner[a3], code: a3 };
      if (a2 === '24' || a2 === '28') return { kind: 'ok', pid: D.areaOwner[a2], code: a2 };
      return n.length < 3 ? { kind: 'partial' } : { kind: 'nomatch' };
    }
    function decoderBox(placeholder, decode, render) {
      var out = h('div', { 'class': 'decode-out', 'aria-live': 'polite' }, h('span', { 'class': 'micro' }, 'Sonuç burada görünür.'));
      var inp = h('input', { type: 'text', 'class': 'input', placeholder: placeholder, autocomplete: 'off', spellcheck: 'false', inputmode: 'text', 'aria-label': placeholder });
      inp.addEventListener('input', function () {
        U.clear(out);
        var r = decode(inp.value);
        if (!r) { out.appendChild(h('span', { 'class': 'micro' }, 'Sonuç burada görünür.')); selId = null; paintCtx(); renderStrip(); return; }
        render(out, r);
      });
      return h('div', { 'class': 'decoder' }, inp, out);
    }
    function decodeResult(out, pid, head) {
      var p = D.pById[pid];
      out.appendChild(h('div', { 'class': 'decode-ok' }, UI.icon('check', 16), h('span', {}, head + ' '), h('b', {}, p.vi), h('span', { 'class': 'micro' }, ' · ' + D.regionById[p.region].short)));
      pickProv(pid, true);
    }

    function areaTab() {
      var w = h('div', { 'class': 'stack' });
      w.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, h('b', {}, D.tips[0].t + '. '), D.tips[0].b)));
      if (g.Kit && g.Kit.setKeys('vn-phone1').length) {
        w.appendChild(h('h3', { 'class': 'sec-h' }, 'Numara tabelada nerede? ', h('small', {}, 'alan kodu vurgulu')));
        w.appendChild(h('div', { 'class': 'dec-fig' }, g.Kit.carousel('vn-phone1', { label: 'Vietnam telefon numarası çizimi' })));
      }
      areaLogic(w);
      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Telefon çözücü'));
      w.appendChild(decoderBox('Tabeladaki numarayı yaz (örn. 0236 3822 123)', decodePhone, function (out, r) {
        if (r.kind === 'ok') decodeResult(out, r.pid, '0' + r.code + ' →');
        else if (r.kind === 'old') { decodeResult(out, r.pid, 'Eski kod ' + r.old + ' (şimdi 0' + r.code + ') →'); }
        else if (r.kind === 'mobile') out.appendChild(h('span', { 'class': 'decode-no' }, 'Cep telefonu numarası: il bilgisi vermez. Sabit hatlar 02 ile başlar.'));
        else if (r.kind === 'partial') out.appendChild(h('span', { 'class': 'micro' }, 'Devam et…'));
        else out.appendChild(h('span', { 'class': 'decode-no' }, 'Bu başlangıçla eşleşen bir alan kodu yok.'));
      }));
      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Kod aileleri'));
      D.families.forEach(function (f, i) {
        var ps = D.provinces.filter(function (p) { return Paint.famOfArea(p.area) === f.k; }).sort(function (a, b) { return a.area < b.area ? -1 : 1; });
        var card = h('section', { 'class': 'rcard', tabindex: 0 },
          h('header', {}, h('span', { 'class': 'famkey q' + i }, f.k + (f.k === '24' || f.k === '28' ? '' : 'x')),
            h('div', {}, h('h4', {}, f.tr), h('small', {}, ps.length + ' il'))),
          h('p', { 'class': 'cue' }, f.hint),
          h('div', { 'class': 'chips' }, ps.map(function (p) { return chipFor(p); })));
        bindRow(card, ps.map(function (p) { return p.id; }));
        w.appendChild(card);
      });
      w.appendChild(h('h3', { 'class': 'sec-h' }, 'Eski kodlar (2017 öncesi)'));
      w.appendChild(h('div', { 'class': 'tablewrap' }, h('table', { 'class': 'tbl tbl-compact' },
        h('thead', {}, h('tr', {}, h('th', {}, 'İl'), h('th', {}, 'Eski'), h('th', {}, 'Yeni'))),
        h('tbody', {}, D.oldCodes.map(function (r) { return h('tr', {}, h('td', {}, r[0]), h('td', {}, h('span', { 'class': 'area area-old' }, r[1])), h('td', {}, h('span', { 'class': 'area' }, r[2]))); })))));
      w.appendChild(h('p', { 'class': 'micro' }, D.tips[2].b));
      return w;
    }

    /* tabela okumaya dair genel ipuçları (telefon ve alan kodu ipuçları Alan kodları sayfasında) */
    function signTips() {
      var w = h('div', { 'class': 'stack' });
      D.tips.slice(3).forEach(function (t) {
        w.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, h('b', {}, t.t + '. '), t.b)));
      });
      return w;
    }

    var sortKey = 'name', sortDir = 1, filterTxt = '';
    function tableTab() {
      var w = h('div', { 'class': 'stack' });
      var inp = h('input', { type: 'search', 'class': 'input', placeholder: 'Tabloda filtrele…', 'aria-label': 'Tabloda filtrele', value: filterTxt });
      var wrap = h('div', { 'class': 'tablewrap' });
      var COLS = [
        { k: 'name', t: 'İl', v: function (p) { return B.shortName(p); } },
        { k: 'region', t: 'Bölge', v: function (p) { return D.regionById[p.region].short; } },
        { k: 'area', t: 'Alan', v: function (p) { return +p.area; } },
        { k: 'cap', t: 'Merkez', v: function (p) { return /şehri/i.test(p.cap) ? B.shortName(p) : p.cap; } }
      ];
      function draw() {
        var q = D.norm(filterTxt);
        var rows = D.provinces.filter(function (p) {
          if (!q) return true;
          return [p.vi, p.cap, D.regionById[p.region].short, p.area].some(function (s) { return D.norm(s).indexOf(q) >= 0; });
        });
        var col = COLS.filter(function (c) { return c.k === sortKey; })[0];
        rows.sort(function (a, b) {
          var x = col.v(a), y = col.v(b);
          if (typeof x === 'string') return sortDir * x.localeCompare(y, 'vi');
          return sortDir * (x - y);
        });
        U.clear(wrap);
        wrap.appendChild(h('table', { 'class': 'tbl' },
          h('thead', {}, h('tr', {}, COLS.map(function (c) {
            return h('th', { 'aria-sort': sortKey === c.k ? (sortDir > 0 ? 'ascending' : 'descending') : 'none' },
              h('button', { type: 'button', onclick: function () { if (sortKey === c.k) sortDir = -sortDir; else { sortKey = c.k; sortDir = 1; } draw(); } }, c.t, sortKey === c.k ? (sortDir > 0 ? ' ↑' : ' ↓') : ''));
          }))),
          h('tbody', {}, rows.map(function (p) {
            var tr = h('tr', { tabindex: 0 },
              h('td', {}, h('b', {}, B.shortName(p))),
              h('td', {}, UI.regionChip(p.region, { sm: true })),
              h('td', {}, UI.area(p.area)),
              h('td', {}, /şehri/i.test(p.cap) ? '—' : p.cap));
            tr.addEventListener('mouseenter', function () { ctx([p.id]); });
            tr.addEventListener('mouseleave', function () { ctx(sticky); });
            tr.addEventListener('click', function () { pickProv(p.id, true); });
            tr.addEventListener('keydown', function (e) { if (e.key === 'Enter') pickProv(p.id, true); });
            return tr;
          }))));
        if (!rows.length) wrap.appendChild(UI.empty('Eşleşme yok', 'Farklı bir sözcük dene.'));
      }
      inp.addEventListener('input', function () { filterTxt = inp.value; draw(); });
      w.appendChild(inp); w.appendChild(wrap);
      draw();
      return w;
    }

    var BUILD = { names: namesTab, regions: regionsTab, area: areaTab };
    function show(v) {
      tab = v;
      var cfg = MAPCFG[v];
      sticky = []; selId = null; selBoxEl = null; renderStrip();
      map.clearHighlight();
      map.setMesh({ 'in': true, rg: cfg.mesh.rg, mc: false, co: true });
      map.setFill(function (id) { return Paint.cls(cfg.color, id); });
      map.setLabels(Paint.labelFn(cfg.label));
      var cur = { color: cfg.color, label: cfg.label };
      map.cfg.labels({
        options: [{ v: 'name', label: 'Ad' }, { v: 'area', label: 'Kod', title: 'Alan kodu' }, { v: 'none', label: 'Kapalı' }],
        value: cfg.label, def: cfg.label,
        onChange: function (x) { cur.label = x; map.setLabels(Paint.labelFn(x)); }
      });
      map.cfg.colors({
        options: Object.keys(Paint.MODES).filter(function (k) { return k !== 'plain'; }).map(function (k) { return { v: k, label: Paint.MODES[k].label }; }),
        value: cfg.color, def: cfg.color,
        onChange: function (x) { cur.color = x; map.setFill(function (id) { return Paint.cls(x, id); }); map.setMesh({ 'in': true, rg: x === 'region', mc: false, co: true }); map.cfg.refresh(); }
      });
      map.cfg.legend(function (box) { g.Kit.legendRows(box, Paint.legend(cur.color), map, { pad: 30, maxK: 9 }); });
      U.clear(body);
      body.appendChild(BUILD[v]());
      body.scrollTop = 0;
      var sc = body.parentNode;
      if (sc) sc.scrollTop = 0;
    }
    show(tab);
    L.sheet.snap('full', { instant: true });
    if (wantRule) setTimeout(function () { focusRule(wantRule); }, 60);

    return { destroy: function () { map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.guide = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

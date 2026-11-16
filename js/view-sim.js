/* view-sim.js — Simülasyon: ipucunu oku, haritaya iğne bırak, puan al */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.VN_DATA, G = g.VN_GEO, B = g.Bank, Store = g.Store, SRS = g.SRS, Paint = g.Paint, Geom = g.Geom, h = U.h;

  var TYPES = [
    { v: 'phone', label: 'Telefon tabelası' }, { v: 'sign', label: 'Yol tabelası' }, { v: 'note', label: 'Manzara notu' }
  ];
  var DIFFS = [
    { v: 'easy', label: 'Kolay', title: 'Sınırlar, bölge renkleri ve il adları açık' },
    { v: 'mid', label: 'Orta', title: 'Yalnızca il sınırları' },
    { v: 'hard', label: 'Zor', title: 'Yalnızca kıyı çizgisi' }
  ];
  var SHOPS = ['Tạp hóa Minh Châu', 'Quán cơm Hương Quê', 'Sửa xe Thành Công', 'Nhà nghỉ Hoàng Anh', 'Cà phê Phúc Lộc', 'Tiệm thuốc Kim Ngân', 'Bánh mì Ngọc Lan', 'Điện máy Thanh Tâm', 'Vật liệu Tuấn Kiệt', 'Nhà hàng Bảo Anh'];

  function mount(root, app) {
    var S = Store.data.set;
    var L = app.layout(root);
    var cfg = Object.assign({ rounds: 5, types: ['phone', 'sign', 'note'], diff: 'mid', scope: [] }, S.sim || {});
    cfg.types = (cfg.types || []).filter(function (t) { return TYPES.some(function (x) { return x.v === t; }); });
    if (!cfg.types.length) cfg.types = ['phone'];
    var game = null, phase = 'setup', clue = null, pin = null, pinPt = null, round = null, hb = null;

    var map = new g.MapView(L.stage, {
      mesh: { 'in': true, rg: false, mc: false, co: true }, basemapLabels: false,
      tip: function () { return null; }, onClick: onMapClick
    });
    var panelTop = h('div', { 'class': 'p-top' }), panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop); L.panel.appendChild(panelBody);
    L.bind(map);
    var sheet = L.sheet;
    map.cfg.lock('labels', 'Zorluk ayarı belirler');
    map.cfg.lock('color', 'Zorluk ayarı belirler');

    function applyDiff() {
      var d = cfg.diff;
      map.setMesh({ 'in': d !== 'hard', rg: false, mc: false, co: true });
      map.setFill(function (id) { return (phase === 'setup' || d === 'easy') ? Paint.cls('region', id) : 'qn'; });
      map.setLabels(phase === 'setup' || d === 'easy' ? Paint.labelFn('name') : null);
    }

    /* =================== KURULUM =================== */
    function showSetup() {
      phase = 'setup'; hb = null;
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      var best = Store.data.sim.best;
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Simülasyon'),
        h('div', { 'class': 'p-meta' }, UI.icon('trophy', 16), h('span', {}, best ? 'En iyi: ' + U.fmtInt(best) + ' puan' : 'Henüz oyun yok'))));
      function field(label, note, ctl, extra) { return h('div', { 'class': 'field' }, h('h4', {}, label, note ? h('small', {}, ' ' + note) : null), ctl, extra || null); }
      panelBody.appendChild(h('p', { 'class': 'lead' }, 'İpucundan yeri tahmin et, haritaya iğne bırak. Tam konum 5 000 puan.'));
      panelBody.appendChild(field('Tur sayısı', null, UI.seg([{ v: '5', label: '5 tur' }, { v: '10', label: '10 tur' }], String(cfg.rounds), function (v) { cfg.rounds = +v; persist(); }, { cls: 'seg-full', label: 'Tur sayısı' })));
      panelBody.appendChild(field('İpucu türleri', null, UI.multi(TYPES, cfg.types, function (v) { cfg.types = v; persist(); }, { min: 1, label: 'İpucu türleri' })));
      var dseg = UI.seg(DIFFS, cfg.diff, function (v) { cfg.diff = v; persist(); applyDiff(); }, { cls: 'seg-full', label: 'Zorluk' });
      panelBody.appendChild(field('Zorluk', null, dseg, h('p', { 'class': 'micro', id: 'sim-diff-note' }, 'Zor kipte iç sınırlar da gizlenir; yalnızca kıyı çizgisi kalır.')));
      panelBody.appendChild(field('Bölge kapsamı', '(boşsa tüm Vietnam)', UI.multi(D.regions.map(function (r) { return { v: r.id, label: r.short, swatch: B.regIdx[r.id] }; }), cfg.scope, function (v) { cfg.scope = v; persist(); }, { label: 'Bölge kapsamı' })));
      var hist = Store.data.sim.history.slice(-5).reverse();
      if (hist.length) {
        panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Son oyunlar'),
          h('ul', { 'class': 'plain-list hist' }, hist.map(function (x) {
            return h('li', {}, h('b', {}, U.fmtInt(x.score)), h('span', {}, ' · ' + x.ok + '/' + x.rounds + ' doğru il · ' + new Date(x.t).toLocaleDateString('tr-TR')));
          }))));
      }
      /* uzun ayar listesinde Başlat her an erişilebilir */
      L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'sim-start', onclick: startGame }, UI.icon('arrow', 16), 'Oyunu başlat')]);
      sheet.snap('full');
      applyDiff(); map.fitAll(false);
    }
    function persist() { S.sim = { rounds: cfg.rounds, types: cfg.types, diff: cfg.diff, scope: cfg.scope }; Store.save(); }

    /* =================== İPUCU KARTLARI =================== */
    function pad(n, w) { var s = String(n); while (s.length < w) s = '0' + s; return s; }
    function rnd(n) { return U.rand(n); }
    function phoneCard(p) {
      var a = p.area, len = a.length === 2 ? 8 : 7, sub = String(3 + rnd(2) * 2) /* 3 ya da 5 */;
      while (sub.length < len) sub += rnd(10);
      var num = '0' + a + ' ' + sub.slice(0, 4) + ' ' + sub.slice(4);
      var shop = U.pick(SHOPS), red = Math.random() < 0.55;
      return h('div', { 'class': 'shop-sign ' + (red ? 'shop-red' : 'shop-blue') },
        h('div', { 'class': 'shop-name' }, shop.toUpperCase()),
        h('div', { 'class': 'shop-phone' }, h('span', {}, 'ĐT:'), ' ', num));
    }
    function signCard(p, idx) {
      var r = B.ring(p.id), nbs = r.n1.map(function (x) { return D.pById[x]; });
      var other = nbs.length ? U.pick(nbs) : null;
      var otherName = other ? (B.hasCap(other) ? other.cap : B.shortName(other)) : null;
      var rows = [[p.places[idx], 3 + rnd(40)]];
      if (otherName) rows.push([otherName, 45 + rnd(110)]);
      return h('div', { 'class': 'road-sign' }, rows.map(function (r0) {
        return h('div', { 'class': 'rs-row' }, h('span', { 'class': 'rs-name' }, r0[0]), h('span', { 'class': 'rs-km' }, r0[1] + ' km'));
      }), h('div', { 'class': 'rs-arrow' }, UI.icon('arrow', 22)));
    }
    function noteCard(p) { return h('blockquote', { 'class': 'note-card' }, p.cue); }

    function leaks(p) { var c = D.norm(p.cue); return c.indexOf(D.norm(p.vi)) >= 0 || c.indexOf(p.ascii) >= 0; }
    function makeClue(type, p) {
      switch (type) {
        case 'phone': return { type: type, key: 'a2p:' + p.id, ex: {}, el: phoneCard(p), title: 'Telefon tabelası', meaning: 'Alan kodu ' + B.A0(p.area) + ' → ' + p.vi };
        case 'sign': { var idx = rnd(p.places.length); return { type: type, key: 'plc:' + p.id + '#' + idx, ex: { place: p.places[idx] }, el: signCard(p, idx), title: 'Yol tabelası', meaning: p.places[idx] + ' → ' + p.vi }; }
        default: return { type: 'note', key: 'loc:' + p.id, ex: {}, el: noteCard(p), title: 'Manzara notu', meaning: p.vi };
      }
    }
    function validTypes(p) { return cfg.types.filter(function (t) { return t !== 'note' || !leaks(p); }); }

    /* =================== OYUN =================== */
    function startGame() {
      game = { rounds: [], idx: 0, score: 0, used: new Set(), t0: Date.now() };
      nextRound();
    }
    function pickProvince() {
      var pool = D.provinces.filter(function (p) {
        return !game.used.has(p.id) && (!cfg.scope.length || cfg.scope.indexOf(p.region) >= 0) && validTypes(p).length;
      });
      if (!pool.length) pool = D.provinces.filter(function (p) { return !game.used.has(p.id) && validTypes(p).length; });
      if (!pool.length) { game.used.clear(); pool = D.provinces.filter(function (p) { return validTypes(p).length; }); }
      return U.weighted(pool, function (p) { return 1 + 2.5 * (1 - Paint.masteryOf(p.id)); });
    }
    function nextRound() {
      if (game.idx >= cfg.rounds) { showFinal(); return; }
      var p = pickProvince();
      game.used.add(p.id);
      clue = makeClue(U.pick(validTypes(p)), p);
      round = { target: p.id, clue: clue, km: null, score: 0, ok: false, guessed: null };
      renderRound();
    }
    function renderRound() {
      phase = 'guessing'; pin = null; pinPt = null;
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      /* başlık: ilerleme + skor, hemen altında ipucu (panel kapalıyken de görünür) */
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Oyundan çık', title: 'Çık', onclick: exitGame }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(game.idx / cfg.rounds * 100) + '%' } })),
          h('span', {}, 'Tur ' + (game.idx + 1) + ' / ' + cfg.rounds)),
        h('div', { 'class': 'qscore sim-score', title: 'Toplam puan' }, UI.icon('trophy', 15), h('b', {}, U.fmtInt(game.score)))));
      panelTop.appendChild(h('div', { 'class': 'clue', role: 'group', 'aria-label': 'İpucu · ' + clue.title }, clue.el));
      var steps = g.Hints ? g.Hints.forClue(clue.type, round.target, clue.ex) : [];
      hb = steps.length ? UI.hintBox(steps, { onStep: onHintStep, note: 'İpucu puanını düşürmez; ama ipucuyla bildiğin il ustalığa sayılmaz.' }) : null;
      panelBody.appendChild(h('p', { 'class': 'micro', id: 'sim-hint' }, 'Bu ipucu hangi ile ait? Haritaya dokunarak iğne bırak, sonra “Tahmin et”.'));
      if (hb) panelBody.appendChild(hb.box);
      panelBody.appendChild(h('div', { 'class': 'feedback', id: 'sim-fb', hidden: true }));
      L.foot([hb ? hb.bar : null, h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-guess', disabled: true, onclick: submitGuess }, UI.icon('pin', 16), 'Tahmin et')]);
      /* önce panel (haritanın görünür alanı buna göre), sonra harita */
      sheet.snap('peek');
      applyDiff();
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      map.fitAll(true);
      map.setHint('İğneyi bırakmak için haritaya dokun');
    }

    /* adım açılınca: panel adım kadar büyür, bağlam illeri haritada görünür (hedefi sızdırmaz) */
    function onHintStep(st, i, replay) {
      if (phase !== 'guessing') return;
      if (!replay) sheet.snap('fit', { max: 0.6 });
      if (st.ids && st.ids.length) {
        map.clearHighlight('hl-ctx');
        map.highlight(st.ids, 'hl-ctx');
        map.fitTo(st.ids, { pad: 56, maxK: 6 });
      }
      if (!replay) setTimeout(function () { if (hb && phase === 'guessing') hb.reveal(panelBody); }, 340);
    }

    function onMapClick(hit) {
      if (phase !== 'guessing') return;
      pinPt = { x: hit.x, y: hit.y };
      if (pin) { map.clearOverlays('guess'); }
      pin = map.addPin(hit.x, hit.y, 'guess');
      var b = document.getElementById('sim-guess'); if (b) { b.disabled = false; b.focus({ preventScroll: true }); }
      var near = Geom.featureAt(hit.x, hit.y);
      map.setHint(near && cfg.diff === 'easy' ? B.shortName(D.pById[near]) : 'İğne yerleşti — dilersen başka yere dokun');
    }

    function scoreOf(km, inside) { return inside ? 5000 : Math.round(4500 * Math.exp(-km / 250)); }

    function submitGuess() {
      if (phase !== 'guessing' || !pinPt) return;
      phase = 'revealed';
      var p = D.pById[round.target];
      var d = Geom.distToFeature(pinPt.x, pinPt.y, p.id);
      var guessed = Geom.featureAt(pinPt.x, pinPt.y);
      round.km = d.km; round.ok = d.inside; round.guessed = guessed; round.score = scoreOf(d.km, d.inside);
      round.hints = hb ? hb.count : 0;
      if (hb) hb.lock();
      game.score += round.score; game.rounds.push(round); game.idx++;
      SRS.answer(round.clue.key, round.ok, round.ok && round.hints > 0);

      /* harita */
      map.setHint(null);
      map.clearHighlight();
      map.highlight([p.id], 'hl-ok');
      var show = [p.id];
      if (guessed && guessed !== p.id) { map.highlight([guessed], 'hl-bad'); show.push(guessed); }
      var lf = Paint.labelFn('name');
      map.setLabels(function (id) { return show.indexOf(id) >= 0 ? lf(id) : null; }, { size: 11.5, fit: 1.6 });
      map.forceLabels(show);
      var lp = G.p[p.id].lp;
      map.addMarker(lp[0], lp[1], 'target');
      if (!d.inside) map.addLine(pinPt, { x: d.x, y: d.y }, 'ln-miss');
      var bb = Geom.bboxOf([p.id]);
      bb = [Math.min(bb[0], pinPt.x), Math.min(bb[1], pinPt.y), Math.max(bb[2], pinPt.x), Math.max(bb[3], pinPt.y)];
      map.setLocatorTarget(p.id);

      /* panel: ipucu kartı kalkar; sonuç kutusu + il kartı gelir; Sonraki alt şeritte */
      var clueEl = U.$('.clue', panelTop); if (clueEl) clueEl.remove();
      var hintEl = U.$('#sim-hint', panelBody); if (hintEl) hintEl.hidden = true;
      var fb = U.$('#sim-fb', panelBody);
      fb.hidden = false; fb.className = 'feedback fb-' + (round.ok ? 'ok' : 'bad');
      var last = game.idx >= cfg.rounds;
      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-next', onclick: nextRound }, last ? 'Sonucu gör' : 'Sonraki tur', UI.icon('arrow', 16));
      var verdict = round.ok ? 'Doğru il!' : (guessed ? 'Yanlış il: ' + B.shortName(D.pById[guessed]) : 'Denizde / sınır dışında');
      fb.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(round.ok ? 'check' : 'x', 18), h('b', {}, verdict)),
        h('div', { 'class': 'sim-res' },
          h('div', { 'class': 'sim-pts' }, '+' + U.fmtInt(round.score)),
          h('div', { 'class': 'sim-km' }, round.ok ? 'İl sınırları içinde' : U.fmtKm(d.km) + ' uzakta')),
        h('p', { 'class': 'fb-ans' }, 'Cevap: ', h('b', {}, p.vi), h('span', { 'class': 'fb-given' }, ' · ' + clue.meaning)),
        round.hints > 0 ? h('p', { 'class': 'micro micro-hint' }, UI.icon('bulb', 13), round.hints + ' ipucu kullandın' + (round.ok ? ': bu il ustalığa sayılmadı.' : '.')) : null));
      fb.appendChild(h('div', { 'class': 'compact' }, UI.provCard(p.id, { onSelect: function (pid) { app.launch = { select: pid }; app.go('kesfet'); } })));
      var sc = U.$('.qscore b', panelTop); if (sc) sc.textContent = U.fmtInt(game.score);
      L.foot([nextBtn]);
      sheet.snap('fit', { max: 0.62 });
      map.fitTo(bb, { pad: 64, maxK: 7 });
      nextBtn.focus({ preventScroll: true });
      U.toPanel(fb, true);
    }

    function exitGame() {
      if (!game || !game.rounds.length) { showSetup(); return; }
      UI.modal({ title: 'Oyun bitsin mi?', body: h('p', {}, 'Şu ana kadar ' + U.fmtInt(game.score) + ' puan topladın. Bitirirsen skor kaydedilir.'),
        actions: [{ label: 'Devam et', value: false }, { label: 'Bitir', primary: true, value: true }] }).then(function (v) { if (v) showFinal(); });
    }

    function showFinal() {
      phase = 'final';
      var n = game.rounds.length, max = n * 5000, ok = game.rounds.filter(function (r) { return r.ok; }).length;
      var kms = game.rounds.map(function (r) { return r.km; }), avg = kms.length ? kms.reduce(function (a, b) { return a + b; }, 0) / kms.length : 0;
      var best = Store.data.sim.best, isBest = game.score > best && n > 0;
      if (n) {
        Store.data.sim.games++; Store.data.sim.best = Math.max(best, game.score);
        Store.data.sim.history.push({ t: Date.now(), score: game.score, rounds: n, ok: ok });
        if (Store.data.sim.history.length > 30) Store.data.sim.history.shift();
        Store.flush();
      }
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      U.toPanel(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      map.setMesh({ 'in': true, co: true });
      map.setFill(function () { return 'qn'; }); map.setLabels(null);
      /* her turun hedef ve tahmin noktası */
      game.rounds.forEach(function (r) {
        map.highlight([r.target], r.ok ? 'hl-ok' : 'hl-bad');
        var lp = G.p[r.target].lp;
        map.addMarker(lp[0], lp[1], r.ok ? 'target' : 'target miss');
      });
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Sonuç')));
      var tier = max ? game.score / max : 0;
      var title = tier >= 0.9 ? 'Vietnam ustası' : tier >= 0.7 ? 'Yerli gibi' : tier >= 0.45 ? 'Yoldaki gezgin' : 'Daha yeni başlıyorsun';
      panelBody.appendChild(h('div', { 'class': 'sum-head' }, UI.ring(tier, 104, 'Puan oranı'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, U.fmtInt(game.score)), h('small', {}, '/ ' + U.fmtInt(max) + ' puan')),
          h('div', {}, h('b', {}, ok + ' / ' + n), h('small', {}, 'doğru il')),
          h('div', {}, h('b', {}, U.fmtKm(avg)), h('small', {}, 'ort. mesafe')),
          game.rounds.some(function (r) { return r.hints > 0; }) ? h('div', {}, h('b', {}, game.rounds.filter(function (r) { return r.hints > 0; }).length), h('small', {}, 'turda ipucu')) : null)));
      panelBody.appendChild(h('p', { 'class': 'lead' }, title + (isBest ? ' — yeni rekor!' : '') + ' · süre ' + U.fmtTime((Date.now() - game.t0) / 1000)));
      panelBody.appendChild(UI.sec('Turlar', h('ol', { 'class': 'rounds' }, game.rounds.map(function (r) {
        var p = D.pById[r.target];
        return h('li', { 'class': r.ok ? 'ok' : 'bad' }, UI.icon(r.ok ? 'check' : 'x', 15), h('div', {}, h('b', {}, p.vi), h('small', {}, r.clue.meaning.split(' → ')[0] + (r.ok ? '' : ' · ' + U.fmtKm(r.km) + ' uzakta' + (r.guessed ? ', sen: ' + B.shortName(D.pById[r.guessed]) : '')) + (r.hints > 0 ? ' · ipucuyla' : ''))), h('span', { 'class': 'rpts' }, U.fmtInt(r.score)));
      }))));
      panelBody.appendChild(h('a', { 'class': 'btn btn-ghost', href: app.href('pratik'), style: { alignSelf: 'flex-start' } }, 'Pratiğe geç'));
      L.foot([
        h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-again', onclick: startGame }, UI.icon('refresh', 16), 'Tekrar oyna'),
        h('button', { type: 'button', 'class': 'btn', onclick: function () { showSetup(); } }, 'Ayarlar')]);
      sheet.snap('half');
      map.fitAll(true);
    }

    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if ((e.key === 'h' || e.key === 'H') && phase === 'guessing' && hb) {
        var t0 = document.activeElement ? document.activeElement.tagName : '';
        if (t0 !== 'INPUT' && t0 !== 'TEXTAREA') { e.preventDefault(); hb.press(); }
        return;
      }
      if (e.key !== 'Enter') return;
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT') return;
      if (phase === 'guessing' && pinPt) { e.preventDefault(); submitGuess(); }
      else if (phase === 'revealed') { e.preventDefault(); nextRound(); }
    }
    document.addEventListener('keydown', onKey);

    showSetup();
    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  /* ================================================================================================
   * GÜNEY ASYA SİMÜLASYONU (simAs) — yerel tabela, yol tabelası ve bölge notundan eyalet tahmini
   * ================================================================================================ */
  var AS_TYPES = [
    { v: 'script', label: 'Yerel tabela' },
    { v: 'road', label: 'Yol tabelası' },
    { v: 'note', label: 'Bölge notu' }
  ];
  var AS_DIFFS = [
    { v: 'easy', label: 'Kolay', title: 'Sınırlar, yazı renkleri ve yer adları açık' },
    { v: 'mid', label: 'Orta', title: 'Yalnızca eyalet/ülke sınırları' },
    { v: 'hard', label: 'Zor', title: 'Yalnızca kıyı çizgisi' }
  ];

  function mountAs(root, app) {
    var AUI = g.AlfabeUI;
    if (AUI && AUI.loadFonts) AUI.loadFonts();
    var AD = g.AS_DATA, AG = g.AS_GEO, AB = g.ASBank, ASGeom = Geom.make(AG);
    var S = AD.sById, P = AD.pById;
    var ST = Store.data.set;
    var simStore = Store.data.simAs = Store.data.simAs || { games: 0, best: 0, history: [] };
    var L = app.layout(root);

    var cfg = Object.assign({ rounds: 5, types: ['script', 'road', 'note'], diff: 'mid', scope: [] }, ST.asSim || {});
    cfg.types = (cfg.types || []).filter(function (t) { return AS_TYPES.some(function (x) { return x.v === t; }); });
    if (!cfg.types.length) cfg.types = ['script'];
    var game = null, phase = 'setup', clue = null, pin = null, pinPt = null, round = null, hb = null;

    var map = new g.MapView(L.stage, {
      geo: AG, theme: 'as', mesh: { 'in': true, rg: false, mc: true, co: true }, maxK: 14, basemapLabels: false,
      tip: function () { return null; }, onClick: onMapClick
    });
    var panelTop = h('div', { 'class': 'p-top' }), panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop); L.panel.appendChild(panelBody);
    L.bind(map);
    var sheet = L.sheet;
    map.cfg.lock('labels', 'Zorluk ayarı belirler');
    map.cfg.lock('color', 'Zorluk ayarı belirler');

    function applyDiff() {
      var d = cfg.diff;
      map.setMesh({ 'in': d !== 'hard', rg: phase === 'setup' || d === 'easy', mc: d !== 'hard', co: true });
      map.setFill(function (id) { return (phase === 'setup' || d === 'easy') ? AB.mainCls(id) : 'qn'; });
      map.setLabels(phase === 'setup' || d === 'easy' ? function (id) { return P[id].short; } : null, { size: 10.5, fit: 1.7 });
    }
    function persist() { ST.asSim = { rounds: cfg.rounds, types: cfg.types, diff: cfg.diff, scope: cfg.scope }; Store.save(); }

    /* =================== KURULUM =================== */
    function showSetup() {
      phase = 'setup'; hb = null;
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      var best = simStore.best;
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Simülasyon'),
        h('div', { 'class': 'p-meta' }, UI.icon('trophy', 16), h('span', {}, best ? 'En iyi: ' + U.fmtInt(best) + ' puan' : 'Henüz oyun yok'))));
      function field(label, note, ctl, extra) { return h('div', { 'class': 'field' }, h('h4', {}, label, note ? h('small', {}, ' ' + note) : null), ctl, extra || null); }
      panelBody.appendChild(h('p', { 'class': 'lead' }, 'İpucundan yeri tahmin et, haritaya iğne bırak. Tam konum 5 000 puan.'));
      panelBody.appendChild(field('Tur sayısı', null, UI.seg([{ v: '5', label: '5 tur' }, { v: '10', label: '10 tur' }], String(cfg.rounds), function (v) { cfg.rounds = +v; persist(); }, { cls: 'seg-full', label: 'Tur sayısı' })));
      panelBody.appendChild(field('İpucu türleri', null, UI.multi(AS_TYPES, cfg.types, function (v) { cfg.types = v; persist(); }, { min: 1, label: 'İpucu türleri' })));
      var dseg = UI.seg(AS_DIFFS, cfg.diff, function (v) { cfg.diff = v; persist(); applyDiff(); }, { cls: 'seg-full', label: 'Zorluk' });
      panelBody.appendChild(field('Zorluk', null, dseg, h('p', { 'class': 'micro' }, 'Zor kipte iç sınırlar gizlenir; yalnızca dış kıyı ve ana sınır kalır.')));
      panelBody.appendChild(field('Yazı ailesi kapsamı', '(boşsa tüm Güney Asya)', UI.multi(AD.FAMS.map(function (f) { return { v: f.id, label: f.label }; }), cfg.scope, function (v) { cfg.scope = v; persist(); }, { label: 'Yazı ailesi kapsamı' })));
      var hist = simStore.history.slice(-5).reverse();
      if (hist.length) {
        panelBody.appendChild(h('div', { 'class': 'field' }, h('h4', {}, 'Son oyunlar'),
          h('ul', { 'class': 'plain-list hist' }, hist.map(function (x) {
            return h('li', {}, h('b', {}, U.fmtInt(x.score)), h('span', {}, ' · ' + x.ok + '/' + x.rounds + ' doğru yer · ' + new Date(x.t).toLocaleDateString('tr-TR')));
          }))));
      }
      L.foot([h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'sim-start', onclick: startGame }, UI.icon('arrow', 16), 'Oyunu başlat')]);
      sheet.snap('full');
      applyDiff(); map.fitAll(false);
    }

    /* =================== İPUÇLARI =================== */
    function maskNote(p) {
      var txt = p.note;
      [p.short, p.en].forEach(function (nm) {
        if (!nm) return;
        var re = new RegExp(nm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        txt = txt.replace(re, '•••');
      });
      return txt;
    }
    function scriptClueCard(p) {
      var m0 = p.main[0], s0 = S[m0], w = U.pick(s0.words);
      var statesWithSame = AD.statesOf(m0, true);
      var subHint = statesWithSame.length > 1
        ? ('Başkent yönü: ' + p.cap + (p.also.length ? ' · ek yazı: ' + AB.scriptNames(p.also) : ''))
        : ('Yerel kamu tabelası · ' + AD.ZONES[p.zone]);
      return AUI.signEl(m0, w[0], subHint);
    }
    function roadClueCard(p) {
      var m0 = p.main[0], s0 = S[m0], w = U.pick(s0.words);
      var nbs = AB.nbOf(p.id);
      var other = nbs.length ? P[U.pick(nbs)] : null;
      var rows = [[p.cap, 8 + U.rand(45)]];
      if (other) rows.push([other.cap, 65 + U.rand(140)]);
      return h('div', { 'class': 'road-sign' },
        h('div', { 'class': 'rs-row' }, AUI.sp(m0, w[0], 'rs-name'), h('span', { 'class': 'rs-km' }, s0.dig ? AUI.sp(m0, s0.dig.slice(0, 2)) : 'NH')),
        rows.map(function (r0) {
          return h('div', { 'class': 'rs-row' }, h('span', { 'class': 'rs-name' }, r0[0]), h('span', { 'class': 'rs-km' }, r0[1] + ' km'));
        }),
        h('div', { 'class': 'rs-arrow' }, UI.icon('arrow', 22)));
    }
    function noteClueCard(p) {
      return h('blockquote', { 'class': 'note-card' }, maskNote(p) + ' (' + AD.ZONES[p.zone] + ' · Başkent: ' + p.cap + ')');
    }
    function makeClue(type, p) {
      var m0 = p.main[0], s0 = S[m0];
      if (type === 'script') return { type: 'script', key: 'as:st2s:' + p.id, el: scriptClueCard(p), title: 'Yerel tabela', meaning: s0.tr + ' yazısı · ' + p.cap + ' → ' + p.short };
      if (type === 'road') return { type: 'road', key: 'as:loc:' + p.id, el: roadClueCard(p), title: 'Yol tabelası', meaning: p.cap + ' (' + s0.tr + ') → ' + p.short };
      return { type: 'note', key: 'as:st2s:' + p.id, el: noteClueCard(p), title: 'Bölge notu', meaning: s0.tr + ' · ' + p.short };
    }
    function buildHints(p) {
      var m0 = p.main[0], s0 = S[m0], fam = AB.famOf(m0);
      var famIds = AD.PLACES.filter(function (x) { return S[x.main[0]].fam === fam.id; }).map(function (x) { return x.id; });
      var scIds = AD.statesOf(m0, true);
      var nbIds = [p.id].concat(AB.nbOf(p.id));
      return [
        { k: 'Yazı ailesi', t: fam.label + ' — ' + s0.gist, ids: famIds },
        { k: 'Baskın yazı ve dil', t: s0.tr + ' yazısı (' + p.lang + '). ' + (s0.tells[0] || ''), ids: scIds.length ? scIds : famIds },
        { k: 'Kuşak ve komşular', t: AD.ZONES[p.zone] + ' kuşağında; başkent ' + p.cap + '.', ids: nbIds }
      ];
    }

    /* =================== OYUN =================== */
    function startGame() {
      game = { rounds: [], idx: 0, score: 0, used: new Set(), t0: Date.now() };
      nextRound();
    }
    function pickPlace() {
      var pool = AD.PLACES.filter(function (p) {
        var fam = S[p.main[0]].fam;
        return !game.used.has(p.id) && (!cfg.scope.length || cfg.scope.indexOf(fam) >= 0);
      });
      if (!pool.length) pool = AD.PLACES.filter(function (p) { return !game.used.has(p.id); });
      if (!pool.length) { game.used.clear(); pool = AD.PLACES.slice(); }
      return U.weighted(pool, function (p) { return 1 + 2.5 * (1 - SRS.box('as:st2s:' + p.id) / 5); });
    }
    function nextRound() {
      if (game.idx >= cfg.rounds) { showFinal(); return; }
      var p = pickPlace();
      game.used.add(p.id);
      clue = makeClue(U.pick(cfg.types), p);
      round = { target: p.id, clue: clue, km: null, score: 0, ok: false, sameScript: false, guessed: null };
      renderRound();
    }
    function renderRound() {
      phase = 'guessing'; pin = null; pinPt = null;
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Oyundan çık', title: 'Çık', onclick: exitGame }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(game.idx / cfg.rounds * 100) + '%' } })),
          h('span', {}, 'Tur ' + (game.idx + 1) + ' / ' + cfg.rounds)),
        h('div', { 'class': 'qscore sim-score', title: 'Toplam puan' }, UI.icon('trophy', 15), h('b', {}, U.fmtInt(game.score)))));
      panelTop.appendChild(h('div', { 'class': 'clue', role: 'group', 'aria-label': 'İpucu · ' + clue.title }, clue.el));
      var steps = buildHints(P[round.target]);
      hb = UI.hintBox(steps, { onStep: onHintStep, note: 'İpucu puanını düşürmez; ama ipucuyla bildiğin yer ustalığa sayılmaz.' });
      panelBody.appendChild(h('p', { 'class': 'micro', id: 'sim-hint' }, 'Bu tabela veya not hangi eyalet/ülkeye ait? Haritaya dokunarak iğne bırak, sonra “Tahmin et”.'));
      if (hb) panelBody.appendChild(hb.box);
      panelBody.appendChild(h('div', { 'class': 'feedback', id: 'sim-fb', hidden: true }));
      L.foot([hb ? hb.bar : null, h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-guess', disabled: true, onclick: submitGuess }, UI.icon('pin', 16), 'Tahmin et')]);
      sheet.snap('peek');
      applyDiff();
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      map.fitAll(true);
      map.setHint('İğneyi bırakmak için haritaya dokun');
    }

    function onHintStep(st, i, replay) {
      if (phase !== 'guessing') return;
      if (!replay) sheet.snap('fit', { max: 0.6 });
      if (st.ids && st.ids.length) {
        map.clearHighlight('hl-ctx');
        map.highlight(st.ids, 'hl-ctx');
        map.fitTo(st.ids, { pad: 56, maxK: 6 });
      }
      if (!replay) setTimeout(function () { if (hb && phase === 'guessing') hb.reveal(panelBody); }, 340);
    }

    function onMapClick(hit) {
      if (phase !== 'guessing') return;
      pinPt = { x: hit.x, y: hit.y };
      if (pin) map.clearOverlays('guess');
      pin = map.addPin(hit.x, hit.y, 'guess');
      var b = document.getElementById('sim-guess'); if (b) { b.disabled = false; b.focus({ preventScroll: true }); }
      var near = ASGeom.featureAt(hit.x, hit.y);
      map.setHint(near && cfg.diff === 'easy' ? P[near].short : 'İğne yerleşti — dilersen başka yere dokun');
    }

    function scoreOfAs(km, inside) { return inside ? 5000 : Math.round(4500 * Math.exp(-km / 420)); }

    function submitGuess() {
      if (phase !== 'guessing' || !pinPt) return;
      phase = 'revealed';
      var p = P[round.target];
      var d = ASGeom.distToFeature(pinPt.x, pinPt.y, p.id);
      var guessed = ASGeom.featureAt(pinPt.x, pinPt.y) || AB.resolveTap(map, pinPt);
      var inside = d.inside || guessed === p.id;
      round.km = inside ? 0 : d.km;
      round.ok = inside;
      round.guessed = guessed;
      round.sameScript = !!(guessed && P[guessed] && P[guessed].main[0] === p.main[0]);
      round.score = scoreOfAs(round.km, inside);
      round.hints = hb ? hb.count : 0;
      if (hb) hb.lock();
      game.score += round.score; game.rounds.push(round); game.idx++;
      SRS.answer(round.clue.key, round.ok, round.ok && round.hints > 0);

      map.setHint(null);
      map.clearHighlight();
      map.highlight([p.id], 'hl-ok');
      var show = [p.id];
      if (guessed && guessed !== p.id) { map.highlight([guessed], 'hl-bad'); show.push(guessed); }
      map.setLabels(function (id) { return show.indexOf(id) >= 0 ? P[id].short : null; }, { size: 11.5, fit: 1.6 });
      map.forceLabels(show);
      var lp = AG.p[p.id].lp;
      map.addMarker(lp[0], lp[1], 'target');
      if (!inside) map.addLine(pinPt, { x: d.x, y: d.y }, 'ln-miss');
      var bb = ASGeom.bboxOf([p.id]);
      bb = [Math.min(bb[0], pinPt.x), Math.min(bb[1], pinPt.y), Math.max(bb[2], pinPt.x), Math.max(bb[3], pinPt.y)];
      map.setLocatorTarget(p.id);

      var clueEl = U.$('.clue', panelTop); if (clueEl) clueEl.remove();
      var hintEl = U.$('#sim-hint', panelBody); if (hintEl) hintEl.hidden = true;
      var fb = U.$('#sim-fb', panelBody);
      fb.hidden = false; fb.className = 'feedback fb-' + (round.ok ? 'ok' : 'bad');
      var last = game.idx >= cfg.rounds;
      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-next', onclick: nextRound }, last ? 'Sonucu gör' : 'Sonraki tur', UI.icon('arrow', 16));
      var verdict = round.ok ? 'Doğru yer!' : (guessed ? 'Yanlış yer: ' + P[guessed].short + (round.sameScript ? ' (yazı doğru: ' + S[p.main[0]].tr + ')' : '') : 'Denizde / sınır dışında');
      fb.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(round.ok ? 'check' : 'x', 18), h('b', {}, verdict)),
        h('div', { 'class': 'sim-res' },
          h('div', { 'class': 'sim-pts' }, '+' + U.fmtInt(round.score)),
          h('div', { 'class': 'sim-km' }, round.ok ? 'Sınırlar içinde' : U.fmtKm(round.km) + ' uzakta')),
        h('p', { 'class': 'fb-ans' }, 'Cevap: ', h('b', {}, p.short), h('span', { 'class': 'fb-given' }, ' · ' + clue.meaning)),
        round.hints > 0 ? h('p', { 'class': 'micro micro-hint' }, UI.icon('bulb', 13), round.hints + ' ipucu kullandın' + (round.ok ? ': bu yer ustalığa sayılmadı.' : '.')) : null));
      fb.appendChild(h('div', { 'class': 'compact' }, AUI.placeCard(p.id, {
        compact: true,
        onPlace: function (pid) { app.launch = { select: pid }; app.go('kesfet'); },
        onScript: function (sid) { app.launch = { script: sid }; app.go('alfabe'); }
      })));
      var sc = U.$('.qscore b', panelTop); if (sc) sc.textContent = U.fmtInt(game.score);
      L.foot([nextBtn]);
      sheet.snap('fit', { max: 0.62 });
      map.fitTo(bb, { pad: 64, maxK: 7 });
      nextBtn.focus({ preventScroll: true });
      U.toPanel(fb, true);
    }

    function exitGame() {
      if (!game || !game.rounds.length) { showSetup(); return; }
      UI.modal({ title: 'Oyun bitsin mi?', body: h('p', {}, 'Şu ana kadar ' + U.fmtInt(game.score) + ' puan topladın. Bitirirsen skor kaydedilir.'),
        actions: [{ label: 'Devam et', value: false }, { label: 'Bitir', primary: true, value: true }] }).then(function (v) { if (v) showFinal(); });
    }

    function showFinal() {
      phase = 'final';
      var n = game.rounds.length, max = n * 5000, ok = game.rounds.filter(function (r) { return r.ok; }).length;
      var kms = game.rounds.map(function (r) { return r.km; }), avg = kms.length ? kms.reduce(function (a, b) { return a + b; }, 0) / kms.length : 0;
      var best = simStore.best, isBest = game.score > best && n > 0;
      if (n) {
        simStore.games++; simStore.best = Math.max(best, game.score);
        simStore.history.push({ t: Date.now(), score: game.score, rounds: n, ok: ok });
        if (simStore.history.length > 30) simStore.history.shift();
        Store.flush();
      }
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      U.toPanel(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      map.setMesh({ 'in': true, mc: true, co: true });
      map.setFill(function () { return 'qn'; }); map.setLabels(null);
      game.rounds.forEach(function (r) {
        map.highlight([r.target], r.ok ? 'hl-ok' : 'hl-bad');
        var lp = AG.p[r.target].lp;
        map.addMarker(lp[0], lp[1], r.ok ? 'target' : 'target miss');
      });
      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Sonuç')));
      var tier = max ? game.score / max : 0;
      var title = tier >= 0.9 ? 'Güney Asya ustası' : tier >= 0.7 ? 'Yerli gibi' : tier >= 0.45 ? 'Yoldaki gezgin' : 'Daha yeni başlıyorsun';
      panelBody.appendChild(h('div', { 'class': 'sum-head' }, UI.ring(tier, 104, 'Puan oranı'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, U.fmtInt(game.score)), h('small', {}, '/ ' + U.fmtInt(max) + ' puan')),
          h('div', {}, h('b', {}, ok + ' / ' + n), h('small', {}, 'doğru yer')),
          h('div', {}, h('b', {}, U.fmtKm(avg)), h('small', {}, 'ort. mesafe')),
          game.rounds.some(function (r) { return r.hints > 0; }) ? h('div', {}, h('b', {}, game.rounds.filter(function (r) { return r.hints > 0; }).length), h('small', {}, 'turda ipucu')) : null)));
      panelBody.appendChild(h('p', { 'class': 'lead' }, title + (isBest ? ' — yeni rekor!' : '') + ' · süre ' + U.fmtTime((Date.now() - game.t0) / 1000)));
      panelBody.appendChild(UI.sec('Turlar', h('ol', { 'class': 'rounds' }, game.rounds.map(function (r) {
        var p = P[r.target];
        return h('li', { 'class': r.ok ? 'ok' : 'bad' }, UI.icon(r.ok ? 'check' : 'x', 15), h('div', {}, h('b', {}, p.short), h('small', {}, r.clue.meaning.split(' → ')[0] + (r.ok ? '' : ' · ' + U.fmtKm(r.km) + ' uzakta' + (r.guessed ? ', sen: ' + P[r.guessed].short : '')) + (r.hints > 0 ? ' · ipucuyla' : ''))), h('span', { 'class': 'rpts' }, U.fmtInt(r.score)));
      }))));
      panelBody.appendChild(h('a', { 'class': 'btn btn-ghost', href: app.href('pratik'), style: { alignSelf: 'flex-start' } }, 'Pratiğe geç'));
      L.foot([
        h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sim-again', onclick: startGame }, UI.icon('refresh', 16), 'Tekrar oyna'),
        h('button', { type: 'button', 'class': 'btn', onclick: function () { showSetup(); } }, 'Ayarlar')]);
      sheet.snap('half');
      map.fitAll(true);
    }

    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if ((e.key === 'h' || e.key === 'H') && phase === 'guessing' && hb) {
        var t0 = document.activeElement ? document.activeElement.tagName : '';
        if (t0 !== 'INPUT' && t0 !== 'TEXTAREA') { e.preventDefault(); hb.press(); }
        return;
      }
      if (e.key !== 'Enter') return;
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT') return;
      if (phase === 'guessing' && pinPt) { e.preventDefault(); submitGuess(); }
      else if (phase === 'revealed') { e.preventDefault(); nextRound(); }
    }
    document.addEventListener('keydown', onKey);

    showSetup();
    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.sim = { mount: mount };
  g.Views.simAs = { mount: mountAs };
})(typeof window !== 'undefined' ? window : globalThis);

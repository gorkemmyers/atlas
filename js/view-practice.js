/* view-practice.js — Pratik: aralıklı tekrar (Leitner) ile soru oturumları */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, D = g.VN_DATA, B = g.Bank, Store = g.Store, SRS = g.SRS, Paint = g.Paint, h = U.h;

  var DEFAULT = { kinds: B.ALL_KINDS, mode: 'mix', count: 20, scope: [], weakOnly: false };

  function mount(root, app) {
    var S = Store.data.set;
    var L = app.layout(root);
    var cfg = Object.assign({}, DEFAULT, S.quiz || {});
    cfg.kinds = (cfg.kinds || []).filter(function (k) { return B.KINDS[k]; });
    if (!cfg.kinds.length) cfg.kinds = B.ALL_KINDS.slice();
    var quizColors = S.quizColors !== false;
    var sess = null, q = null, phase = 'setup', lastAnswer = null, hb = null;

    var map = new g.MapView(L.stage, {
      mesh: { 'in': true, rg: false, mc: false, co: true }, basemapLabels: false,
      tip: function (id) {
        if (phase !== 'setup') return null;
        var p = D.pById[id];
        return B.shortName(p) + ' · ' + D.regionById[p.region].short;
      },
      onClick: onMapClick
    });
    map.cfg.lock('labels', 'Sınav sırasında kapalı');
    map.cfg.colors({
      options: [{ v: 'on', label: 'Bölge renkleri' }, { v: 'off', label: 'Sade' }],
      value: quizColors ? 'on' : 'off', def: 'on',
      onChange: function (v) { quizColors = v === 'on'; S.quizColors = quizColors; Store.save(); map.paint(); }
    });

    function neutral() { return phase !== 'setup' && q && (q.base === 'reg' || q.base === 'regloc'); }
    function fillFn() {
      return function (id) {
        if (phase === 'setup') return inScope(id) ? Paint.cls('region', id) : 'qd';
        if (!quizColors || neutral()) return 'qn';
        return Paint.cls('region', id);
      };
    }
    function inScope(id) {
      if (!cfg.scope.length) return true;
      return cfg.scope.indexOf(D.pById[id].region) >= 0;
    }
    function meshFor() {
      return { 'in': true, rg: false, mc: false, co: true };
    }

    /* =================== KURULUM =================== */
    var panelTop = h('div', { 'class': 'p-top' });
    var panelBody = h('div', { 'class': 'p-body' });
    L.panel.appendChild(panelTop); L.panel.appendChild(panelBody);
    L.bind(map);
    var sheet = L.sheet;

    /* quiet === true: başka ekrandan doğrudan oturum başlatılırken kurulum paneli hiç görünmesin */
    function showSetup(quiet) {
      phase = 'setup'; q = null; hb = null;
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      U.toPanel(null);
      if (quiet !== true) sheet.snap('full');
      map.setMesh(meshFor());
      map.setFill(fillFn()); map.setLabels(null);
      map.clearHighlight(); map.clearOverlays(); map.setHint(null); map.setLocatorTarget(null);
      map.fitAll(false);

      var today = SRS.today(), st = SRS.streak();
      panelTop.appendChild(h('div', { 'class': 'p-title' },
        h('h2', {}, 'Pratik'),
        h('div', { 'class': 'p-meta' }, UI.icon('flame', 16), h('span', {}, 'Bugün ' + today + ' soru · seri ' + st + ' gün'))));

      var presets = h('div', { 'class': 'presets' }, B.PRESETS.map(function (p) {
        var disabled = p.id === 'zayif' && B.ALL_KINDS.every(function (k) { return !B.itemKeys(k, Object.assign({}, cfg, { scope: cfg.scope })).length; });
        return h('button', { type: 'button', 'class': 'preset' + (p.feat ? ' preset-feat' : p.wide ? ' preset-wide' : ''), 'data-preset': p.id, disabled: disabled, onclick: function () {
          start(Object.assign({}, DEFAULT, p.cfg, { scope: cfg.scope.slice() }));
        } }, h('span', { 'class': 'pi' }, UI.icon(p.icon, 20)), h('span', { 'class': 'pt' }, h('b', {}, p.title, p.feat ? h('span', { 'class': 'pill pill-new' }, 'Yeni') : null), h('small', {}, p.sub)));
      }));

      var kindsChips = UI.multi(B.CATS.map(function (c) { return { v: c.id, label: c.label }; }),
        B.CATS.filter(function (c) { return c.kinds.some(function (k) { return cfg.kinds.indexOf(k) >= 0; }); }).map(function (c) { return c.id; }),
        function (ids) { cfg.kinds = B.CATS.filter(function (c) { return ids.indexOf(c.id) >= 0; }).reduce(function (a, c) { return a.concat(c.kinds); }, []); persist(); },
        { min: 1, label: 'Soru türleri' });
      var scopeChips = UI.multi(D.regions.map(function (r) { return { v: r.id, label: r.short, swatch: B.regIdx[r.id] }; }), cfg.scope,
        function (ids) { cfg.scope = ids; persist(); map.paint(); }, { label: 'Bölge kapsamı' });
      var modeSeg = UI.seg([{ v: 'mix', label: 'Karışık' }, { v: 'map', label: 'Harita' }, { v: 'mc', label: 'Şıklı' }, { v: 'text', label: 'Yazarak' }], cfg.mode, function (v) { cfg.mode = v; persist(); }, { cls: 'seg-full', label: 'Cevap şekli' });
      var countSeg = UI.seg([{ v: '10', label: '10' }, { v: '20', label: '20' }, { v: '50', label: '50' }, { v: '0', label: 'Sonsuz' }], String(cfg.count), function (v) { cfg.count = +v; persist(); }, { cls: 'seg-full', label: 'Soru sayısı' });
      var weakChk = h('label', { 'class': 'check' }, h('input', { type: 'checkbox', id: 'pr-weak', checked: cfg.weakOnly ? true : null, onchange: function (e) { cfg.weakOnly = e.target.checked; persist(); } }), h('span', {}, 'Sadece zayıf ve yeni öğeler (kutu 0–2)'));

      var startBtn = h('button', { type: 'button', 'class': 'btn btn-primary btn-block', id: 'pr-start', onclick: function () { start(Object.assign({}, cfg)); } }, UI.icon('arrow', 16), 'Başlat');
      function field(label, note, ctl) { return h('div', { 'class': 'field' }, h('h4', {}, label, note ? h('small', {}, ' ' + note) : null), ctl); }
      var fold = h('details', { 'class': 'fold' },
        h('summary', {}, UI.icon('list', 16), 'Özel ayarlar'),
        h('div', { 'class': 'fold-body' },
          field('Soru türleri', null, kindsChips),
          field('Bölge kapsamı', '(boşsa tüm Vietnam · haritaya dokunarak da seçebilirsin)', scopeChips),
          field('Cevap şekli', null, modeSeg),
          field('Soru sayısı', null, countSeg),
          weakChk));
      /* ayarlar açıkken Başlat düğmesi alt şeritte sabit durur: uzun listede aşağı inmek gerekmez */
      fold.addEventListener('toggle', function () { L.foot(fold.open ? [startBtn] : null); });
      panelBody.appendChild(presets);
      panelBody.appendChild(fold);
      panelBody.appendChild(h('p', { 'class': 'micro' }, 'Yanlışlar kısa süre sonra geri gelir; doğrular daha seyrek sorulur.'));
      map.setHint(null);
      function persist() { S.quiz = { kinds: cfg.kinds, mode: cfg.mode, count: cfg.count, scope: cfg.scope, weakOnly: cfg.weakOnly }; Store.save(); }
      scopeChipsRef = scopeChips;
    }
    var scopeChipsRef = null;

    /* =================== OTURUM =================== */
    function start(c) {
      cfg = Object.assign({}, DEFAULT, c);
      sess = new B.Session(cfg);
      if (sess.empty) { UI.toast('Bu ayarlarla soru bulunamadı. Kapsamı genişlet.', 'bad'); return; }
      next();
    }
    function next() {
      q = sess.next();
      if (!q) { showSummary(); return; }
      renderQuestion();
    }

    function promptEl(pr) {
      switch (pr.t) {
        case 'area':
          return h('div', { 'class': 'pr' }, h('div', { 'class': 'signboard' }, h('span', { 'class': 'sb-tag' }, 'ĐT'), h('span', { 'class': 'sb-num' }, pr.main)), h('div', { 'class': 'pr-sub' }, pr.sub));
        case 'place':
        case 'cap':
          return h('div', { 'class': 'pr' }, h('div', { 'class': 'roadsign' }, pr.main), h('div', { 'class': 'pr-sub' }, pr.sub));
        case 'hl':
          return h('div', { 'class': 'pr' }, h('div', { 'class': 'pr-main pr-main-sm' }, pr.main));
        case 'name':
          return h('div', { 'class': 'pr pr-name' }, h('div', { 'class': 'pr-main' + (String(pr.main).length > 24 ? ' pr-main-sm' : '') }, pr.main), pr.sub ? h('div', { 'class': 'pr-sub' }, pr.sub) : null);
        default:
          return h('div', { 'class': 'pr' }, h('div', { 'class': 'pr-main' }, pr.main), pr.sub ? h('div', { 'class': 'pr-sub' }, pr.sub) : null);
      }
    }

    var answerEl = null, feedbackEl = null, optBtns = [], textInput = null, revealRow = null;

    function renderQuestion() {
      phase = 'asking'; lastAnswer = null;
      var total = sess.total, isMap = q.mode === 'map', isText = q.mode === 'text';
      U.clear(panelTop); U.clear(panelBody);
      U.toPanel(null);
      optBtns = []; textInput = null; revealRow = null;

      /* üst çubuk: çıkış · ilerleme · seri */
      var pct = total ? Math.round(sess.idx / total * 100) : 0;
      panelTop.appendChild(h('div', { 'class': 'qhead' },
        h('button', { type: 'button', 'class': 'icon-btn', 'aria-label': 'Oturumdan çık', title: 'Çık', onclick: exitSession }, UI.icon('back', 18)),
        h('div', { 'class': 'qprog' },
          h('div', { 'class': 'bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': total || 100, 'aria-valuenow': sess.idx }, h('i', { style: { width: (total ? pct : 8) + '%' } })),
          h('span', {}, (total ? (sess.idx + 1) + ' / ' + total : (sess.idx + 1) + '. soru') + (isMap && q.retry ? ' · tekrar' : ''))),
        h('div', { 'class': 'qscore', title: 'Art arda doğru' }, UI.icon('flame', 15), h('b', {}, sess.run))));

      /* istem: harita sorusunda başlıkta küçük (panel kapalıyken de görünür), diğerlerinde gövdede büyük */
      var steps = g.Hints ? g.Hints.forQuestion(q) : [];
      hb = steps.length ? UI.hintBox(steps, { onStep: onHintStep }) : null;
      var pe = promptEl(q.prompt);
      if (isMap) {
        pe.classList.add('pr-sm');
        panelTop.appendChild(h('div', { 'class': 'qprompt', 'aria-live': 'polite' }, pe));
      } else {
        panelBody.appendChild(h('div', { 'class': 'qprompt', 'aria-live': 'polite' },
          h('div', { 'class': 'qtitle' }, q.title, q.retry ? h('span', { 'class': 'pill pill-retry' }, 'tekrar') : null), pe));
      }

      /* cevap + ipucu adımları + geri bildirim (gövde) · İpucu ve atla düğmeleri (alt şerit) */
      answerEl = h('div', { 'class': 'answer' });
      var skipBtn = h('button', { type: 'button', 'class': 'btn btn-ghost', id: 'q-skip', onclick: function () { finish('skip', {}); } }, UI.icon('skip', 14), 'Bilmiyorum');
      if (q.mode === 'mc') buildMC();
      else if (isText) buildText();
      else answerEl.appendChild(h('p', { 'class': 'micro' }, q.base === 'regloc' ? 'Bölgedeki herhangi bir ile dokun.' : 'Haritayı kaydır / yakınlaştır, sonra doğru ile dokun.'));
      panelBody.appendChild(answerEl);
      if (hb) panelBody.appendChild(hb.box);
      feedbackEl = h('div', { 'class': 'feedback', hidden: true });
      panelBody.appendChild(feedbackEl);
      if (isText) {
        /* yazarken klavye alt şeridi kapatır: düğmeler girdinin hemen altında durur */
        revealRow = h('div', { 'class': 'row' }, hb ? hb.bar : null, skipBtn);
        answerEl.appendChild(revealRow);
        L.foot(null);
      } else L.foot([hb ? hb.bar : null, skipBtn]);

      /* panel yüksekliği önce (harita görünür alanı buna göre), sonra harita */
      /* haritada vurgulu il varsa harita soruyu taşır: panel onu kapatmasın */
      sheet.snap(isMap ? 'peek' : 'fit', { max: q.focus.length ? 0.58 : 1 });
      map.setMesh(meshFor());
      map.setFill(fillFn());
      map.setLabels(null);
      map.clearHighlight(); map.clearOverlays(); map.setLocatorTarget(null);
      if (q.focus.length) {
        map.highlight(q.focus, 'hl-q');
        map.setLocatorTarget(q.focus[0]);
        map.focusOn(q.focus);
      } else map.fitAll(true);
      map.setHint(isMap ? (q.base === 'regloc' ? 'Bölgeyi bul: ' + q.prompt.main : 'Haritada dokun: ' + q.prompt.main) : null);

      if (isText && textInput) textInput.focus({ preventScroll: true });
    }

    /* İpucu adımı açılınca: harita bağlamını göster (cevabı sızdırmayan iller) */
    function onHintStep(st, i, replay) {
      if (phase !== 'asking' || !q) return;
      /* yeni adım açılınca panel adım kadar büyür; harita bağlamı panelin kalan üst kısmına yerleşir */
      if (!replay) sheet.snap('fit', { max: q.mode === 'map' || q.focus.length ? 0.6 : 1 });
      /* yalnızca haritası olan adımlar vurguyu değiştirir; metin adımları öncekini bozmaz */
      if (st.ids && st.ids.length) {
        map.clearHighlight('hl-ctx');
        map.highlight(st.ids, 'hl-ctx');
        map.fitTo(st.ids, { pad: 56, maxK: 6 });
      }
      if (!replay) setTimeout(function () { if (hb && phase === 'asking') hb.reveal(panelBody); }, 340);   // panel tavana dayandıysa yeni adıma kaydır
      if (!replay && textInput && !textInput.disabled) textInput.focus({ preventScroll: true });
    }

    function buildMC() {
      var grid = h('div', { 'class': 'opts' + (q.options.length > 4 ? ' opts-many' : '') });
      q.options.forEach(function (o, i) {
        var lab;
        if (o.kind === 'area') lab = h('span', { 'class': 'area' }, o.label);
        else lab = h('span', { 'class': 'opt-l' }, o.label, o.sub ? h('small', {}, o.sub) : null);
        var b = h('button', { type: 'button', 'class': 'opt', 'data-id': o.id, onclick: function () { choose(o, b); } }, h('kbd', {}, i + 1), lab);
        optBtns.push(b); grid.appendChild(b);
      });
      answerEl.appendChild(grid);
    }
    function choose(o, b) {
      if (phase !== 'asking') return;
      var ok = String(o.id) === String(q.correct);
      finish(ok ? 'ok' : 'bad', { chosen: o.id, chosenLabel: o.label });
    }
    function buildText() {
      textInput = h('input', { type: 'text', 'class': 'input input-lg', id: 'q-input', placeholder: q.text.hint, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Cevabın' });
      var form = h('form', { 'class': 'textans', onsubmit: function (e) {
        e.preventDefault();
        if (phase !== 'asking' || !textInput.value.trim()) return;
        var ok = B.checkText(q, textInput.value);
        finish(ok ? 'ok' : 'bad', { typed: textInput.value.trim() });
      } }, textInput, h('button', { type: 'submit', 'class': 'btn btn-primary' }, 'Kontrol et'));
      answerEl.appendChild(form);
    }

    function onMapClick(hit) {
      if (phase === 'setup') {
        if (!hit.id) return;
        var r = D.pById[hit.id].region;
        var i = cfg.scope.indexOf(r);
        if (i >= 0) cfg.scope.splice(i, 1); else cfg.scope.push(r);
        S.quiz = Object.assign({}, S.quiz || {}, { scope: cfg.scope }); Store.save();
        if (scopeChipsRef) scopeChipsRef.setAll(cfg.scope);
        map.paint();
        return;
      }
      if (phase !== 'asking' || !q || q.mode !== 'map') return;
      if (!hit.id) { UI.toast('Bir ilin üzerine dokun.'); return; }
      var ok = q.accept.indexOf(hit.id) >= 0;
      finish(ok ? 'ok' : 'bad', { clicked: hit.id });
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
    function nameOf(id) { return B.shortName(D.pById[id]); }

    function reveal(res, extra) {
      var R = q.reveal, isMap = q.mode === 'map';
      /* şıklar ve girdi kilitlenir */
      optBtns.forEach(function (b) {
        b.disabled = true;
        var id = b.getAttribute('data-id');
        if (String(id) === String(q.correct)) b.classList.add('ok');
        else if (extra.chosen != null && String(id) === String(extra.chosen)) b.classList.add('bad');
      });
      if (textInput) textInput.disabled = true;
      var submit = U.$('.textans button', panelBody); if (submit) submit.disabled = true;
      if (revealRow) revealRow.hidden = true;
      /* harita sorusunda istem cevap olarak haritada görünür: başlık ve talimat yer açsın */
      if (isMap) { answerEl.hidden = true; var qp = U.$('.qprompt', panelTop); if (qp) qp.remove(); }

      /* harita (kamera en sonda: panel boyu belli olunca) */
      map.setMesh(meshFor());
      map.setFill(fillFn());
      map.clearHighlight('hl-q'); map.clearHighlight('hl-ctx'); map.clearOverlays();
      map.highlight(R.ids, 'hl-ok');
      var fitIds = R.ids.slice();
      var showLbl = R.ids.length <= 7 ? R.ids.slice() : (R.primary ? [R.primary] : []);
      if (extra.clicked && res === 'bad') { map.highlight([extra.clicked], 'hl-bad'); fitIds.push(extra.clicked); showLbl.push(extra.clicked); }
      var lf = Paint.labelFn('name');
      map.setLabels(function (id) { return showLbl.indexOf(id) >= 0 ? lf(id) : null; }, { size: 11.5, fit: 1.6 });
      map.forceLabels(showLbl);
      map.setHint(null);
      map.setLocatorTarget(R.ids[0]);

      /* geri bildirim: sonuç kutusu + (yanlışsa) dokunulan il + ayrıntı kartı · Sonraki alt şeritte */
      var hinted = res === 'ok' && extra.hints > 0;
      var titleTxt = res === 'ok' ? (hinted ? 'Doğru — ipucuyla' : 'Doğru') : res === 'skip' ? 'Atlandı' : 'Yanlış';
      var given = null;
      if (res === 'bad') {
        if (extra.clicked) given = 'Dokunduğun: ' + nameOf(extra.clicked);
        else if (extra.chosenLabel != null) given = 'Seçtiğin: ' + extra.chosenLabel;
        else if (extra.typed) given = 'Yazdığın: ' + extra.typed;
      }
      var nextBtn = h('button', { type: 'button', 'class': 'btn btn-primary', id: 'q-next', onclick: next }, sess.done ? 'Sonucu gör' : 'Sonraki', UI.icon('arrow', 16));
      var card = !R.card ? null
        : R.card.k === 'region' ? UI.regionCard(R.card.id, { onSelect: function (pid) { openExplore(pid); } })
        : UI.provCard(R.card.id, { onSelect: function (pid) { openExplore(pid); } });
      var chosenInfo = null;
      if (res === 'bad' && extra.clicked && D.pById[extra.clicked]) {
        var cp = D.pById[extra.clicked];
        chosenInfo = h('div', { 'class': 'confuse' }, h('b', {}, B.shortName(cp)), UI.area(cp.area), h('small', {}, ' ← dokunduğun il'));
      }
      U.clear(feedbackEl);
      feedbackEl.hidden = false;
      feedbackEl.className = 'feedback fb-' + res;
      feedbackEl.appendChild(h('div', { 'class': 'fb-box' },
        h('div', { 'class': 'fb-title' }, UI.icon(res === 'ok' ? 'check' : 'x', 18), h('b', {}, titleTxt)),
        h('p', { 'class': 'fb-ans' }, 'Cevap: ', h('b', {}, q.answerText), given ? h('span', { 'class': 'fb-given' }, ' · ' + given) : null),
        q.note ? h('p', { 'class': 'micro' }, q.note) : null,
        hinted ? h('p', { 'class': 'micro micro-hint' }, UI.icon('bulb', 13), 'İpucu kullandın: bu soru ustalığa sayılmadı, birkaç soru sonra ipucusuz yeniden gelecek.') : null));
      if (chosenInfo) feedbackEl.appendChild(chosenInfo);
      if (card) feedbackEl.appendChild(h('div', { 'class': 'compact' }, card));
      L.foot([nextBtn]);
      sheet.snap('fit', { max: 0.62 });
      map.fitTo(fitIds, { pad: 56, maxK: 8 });
      nextBtn.focus({ preventScroll: true });
      U.toPanel(feedbackEl, true);
    }
    function openExplore(pid) { app.launch = { select: pid }; app.go('kesfet'); }

    /* =================== ÖZET =================== */
    function exitSession() {
      if (!sess || !sess.log.length) { showSetup(); return; }
      UI.modal({ title: 'Oturum bitsin mi?', body: h('p', {}, sess.log.length + ' soru cevapladın. İlerlemen kaydedildi; şimdi bitirirsen özet görürsün.'),
        actions: [{ label: 'Devam et', value: false }, { label: 'Özeti gör', primary: true, value: true }] }).then(function (v) { if (v) showSummary(); });
    }
    function showSummary() {
      phase = 'summary';
      var log = sess.log, n = log.length, ok = sess.correct, secs = (Date.now() - sess.t0) / 1000;
      if (n) {
        Store.data.sessions = Store.data.sessions || [];
        Store.data.sessions.push({ t: Date.now(), n: n, ok: sess.clean, h: sess.hinted, secs: Math.round(secs) });
        if (Store.data.sessions.length > 60) Store.data.sessions.shift();
        Store.data.stats.bestRun = Math.max(Store.data.stats.bestRun || 0, sess.bestRun);
        Store.flush();
      }
      U.clear(panelTop); U.clear(panelBody); L.foot(null);
      U.toPanel(null);
      map.setMesh(meshFor()); map.setHint(null);
      map.clearHighlight(); map.clearOverlays(); map.setLabels(null); map.setLocatorTarget(null);
      /* haritayı oturum sonucuna göre boya: doğru = yeşil, yanlış = kırmızı */
      var res = {};
      log.forEach(function (l) {
        (l.ids || []).forEach(function (id) {
          if (D.pById[id]) res[id] = (res[id] === 'bad' || l.res !== 'ok') ? 'bad' : 'ok';
        });
      });
      map.setFill(function (id) { return res[id] === 'ok' ? 'sok' : res[id] === 'bad' ? 'sbad' : 'qn'; });

      panelTop.appendChild(h('div', { 'class': 'p-title' }, h('h2', {}, 'Oturum özeti')));
      var clean = sess.clean, hinted = sess.hinted;
      var frac = n ? clean / n : 0;
      var cats = {};
      log.forEach(function (l) { var c = B.catOfKind(l.kind); var k = c ? c.label : l.kind; cats[k] = cats[k] || { n: 0, ok: 0 }; cats[k].n++; if (l.res === 'ok' && !(l.hints > 0)) cats[k].ok++; });
      var missed = log.filter(function (l) { return l.res !== 'ok' || l.hints > 0; });
      var head = h('div', { 'class': 'sum-head' }, UI.ring(frac, 104, 'Doğruluk ' + Math.round(frac * 100) + ' yüzde'),
        h('div', { 'class': 'sum-stats' },
          h('div', {}, h('b', {}, clean + ' / ' + n), h('small', {}, hinted ? 'ipucusuz doğru' : 'doğru')),
          hinted ? h('div', {}, h('b', {}, hinted), h('small', {}, 'ipucuyla doğru')) : null,
          h('div', {}, h('b', {}, U.fmtTime(secs)), h('small', {}, 'süre')),
          h('div', {}, h('b', {}, sess.bestRun), h('small', {}, 'en uzun seri'))));
      panelBody.appendChild(head);
      panelBody.appendChild(UI.sec('Kategoriler', h('div', { 'class': 'bars' }, Object.keys(cats).map(function (k) {
        var c = cats[k];
        return h('div', { 'class': 'barrow' }, h('span', {}, k), h('div', { 'class': 'bar' }, h('i', { style: { width: Math.round(c.ok / c.n * 100) + '%' } })), h('b', {}, c.ok + '/' + c.n));
      }))));
      if (missed.length) {
        panelBody.appendChild(h('section', { 'class': 'sec' },
          h('h4', {}, 'Tekrar edilecekler ', h('small', {}, '(' + missed.length + (hinted ? ' · ipucuyla bildiklerin dahil' : '') + ')')),
          h('ul', { 'class': 'missed' }, missed.map(function (l) {
            var same = l.prompt && l.prompt.t !== 'hl' && String(l.prompt.main) === String(l.label);
            return h('li', {}, h('span', { 'class': 'm-q' }, same ? 'Haritada bul' : l.prompt ? (l.prompt.t === 'hl' ? 'Vurgulanan il' : l.prompt.main) : l.key), UI.icon('arrow', 14), h('b', {}, l.label), l.res === 'ok' ? h('span', { 'class': 'pill pill-hint' }, 'ipucuyla') : null);
          }))));
      } else if (n) panelBody.appendChild(h('div', { 'class': 'tipcard tipcard-plain' }, h('div', {}, h('b', {}, 'Hatasız oturum. '), 'Aynı türleri bir süre sonra tekrar çalış; doğru bildiğin öğeler daha seyrek gelir.')));
      var retryBtn = missed.length ? h('button', { type: 'button', 'class': 'btn btn-primary', id: 'sum-retry', onclick: function () {
        start(Object.assign({}, cfg, { keys: missed.map(function (l) { return l.key; }), count: 0 }));
      } }, UI.icon('refresh', 16), 'Hataları tekrar et') : null;
      var newBtn = h('button', { type: 'button', 'class': 'btn' + (missed.length ? '' : ' btn-primary'), id: 'sum-new', onclick: function () { showSetup(); } }, 'Yeni oturum');
      panelBody.appendChild(h('a', { 'class': 'btn btn-ghost', href: app.href('ilerleme'), style: { alignSelf: 'flex-start' } }, 'İlerlemeye bak'));
      L.foot([retryBtn, newBtn]);
      sheet.snap('half');
      map.fitAll(true);
    }

    /* =================== KLAVYE =================== */
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (phase === 'asking' && hb && (e.key === 'h' || e.key === 'H') && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault(); hb.press();
      } else if (phase === 'asking' && q && q.mode === 'mc' && /^[1-9]$/.test(e.key) && tag !== 'INPUT') {
        var i = +e.key - 1;
        if (optBtns[i]) { e.preventDefault(); optBtns[i].click(); }
      } else if (phase === 'revealed' && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') && tag !== 'INPUT' && tag !== 'A') {
        var nb = document.getElementById('q-next');
        if (nb && document.activeElement !== nb) { e.preventDefault(); nb.click(); }
      }
    }
    document.addEventListener('keydown', onKey);

    /* başka ekrandan (İlerleme) başlatma isteği */
    var launch = app.launch; app.launch = null;
    if (launch && launch.preset) {
      var pr = B.PRESETS.filter(function (p) { return p.id === launch.preset; })[0];
      if (pr) { showSetup(true); start(Object.assign({}, DEFAULT, pr.cfg, { scope: [] })); }
      else showSetup();
    } else if (launch && launch.keys) {
      showSetup(true); start(Object.assign({}, DEFAULT, { mode: 'mix', keys: launch.keys, count: 0 }));
    } else showSetup();

    return { destroy: function () { document.removeEventListener('keydown', onKey); map.destroy(); } };
  }

  g.Views = g.Views || {};
  g.Views.practice = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

/* scripts-bank.js — Alfabe: soru üretimi, oturum, arama, yardımcılar.
   DOM kullanmaz; Node’da test edilir (tools/test-scripts.cjs).
   Öğe anahtarı: as:<tür>:<kimlik>  (sid, reg: yazı kimliği · pair: "a|b" · st2s, loc: yer kimliği) */
(function (g) {
  'use strict';
  var U = g.U, D = g.AS_DATA, G = g.AS_GEO, SRS = g.SRS;
  var S = D.sById, P = D.pById;

  var QUIZ_SCRIPTS = D.SCRIPTS.filter(function (s) { return !s.noquiz; }).map(function (s) { return s.id; });
  var REG_SCRIPTS = QUIZ_SCRIPTS.filter(function (id) { return D.statesOf(id, true).length > 0; });
  var PAIR_KEYS = Object.keys(D.PAIRS).filter(function (k) {
    var ab = k.split('|');
    return ab.every(function (id) { return !S[id].noquiz; }) && ab.some(function (id) { return D.statesOf(id, true).length > 0; });
  });
  /* haritada parmakla seçilmesi zor yerler: küçük alan ya da dağınık adalar */
  var SCATTERED = { 'andaman-nicobar': 1, 'lakshadweep': 1 };
  var TINY = {};
  D.PLACES.forEach(function (p) { if (SCATTERED[p.id] || (G.p[p.id] && G.p[p.id].ar < 4000)) TINY[p.id] = true; });

  var KINDS = {
    reg:  { label: 'Yazıdan yer bul', cat: 'yer' },
    pair: { label: 'Benzer yazıları ayır', cat: 'cift' },
    st2s: { label: 'Bölgenin tabelası', cat: 'esy' },
    loc:  { label: 'Haritada bul', cat: 'harita' }
  };
  var ALL_KINDS = ['reg', 'pair', 'st2s', 'loc'];
  var CATS = [
    { id: 'yer', label: 'Yazıdan yer bul', kinds: ['reg'] },
    { id: 'cift', label: 'Benzer yazıları ayır', kinds: ['pair'] },
    { id: 'esy', label: 'Bölgenin tabelası', kinds: ['st2s'] },
    { id: 'harita', label: 'Eyalet haritası', kinds: ['loc'] }
  ];
  var PRESETS = [
    { id: 'yer', title: 'Yazıdan yer bul', sub: 'Tabeladaki yazıyı gör, haritada yerini seç', icon: 'pin', feat: true, cfg: { kinds: ['reg'], count: 15, mapmode: 'mix' } },
    { id: 'cift', title: 'Benzer yazıları ayır', sub: 'İki tabeladan hangisi o bölgenin?', icon: 'layers', cfg: { kinds: ['pair'], count: 20 } },
    { id: 'esy', title: 'Bölgenin tabelası', sub: 'Verilen eyalette hangi tabelayı görürsün', icon: 'langs', cfg: { kinds: ['st2s'], count: 20 } },
    { id: 'guney', title: 'Güney dörtlüsü', sub: 'Telugu, Kannada, Malayalam, Tamil ayrımları', icon: 'compass', cfg: { kinds: ['reg', 'pair', 'st2s'], fams: ['south'], count: 20 } },
    { id: 'harita', title: 'Eyalet haritası', sub: 'Eyalet ve ülkeleri haritada bul', icon: 'target', cfg: { kinds: ['loc'], count: 20 } },
    { id: 'karisik', title: 'Karışık', sub: 'Tüm türlerden', icon: 'refresh', cfg: { kinds: ALL_KINDS, count: 20 } },
    { id: 'zayif', title: 'Zayıflarım', sub: 'Yeni ve zayıf öğeler', icon: 'flame', cfg: { kinds: ALL_KINDS, weakOnly: true, count: 20 } }
  ];

  /* ---------------- yardımcılar ---------------- */
  function kindTR(kind) { return kind === 'state' ? 'Eyalet' : kind === 'ut' ? 'Birlik bölgesi' : 'Ülke'; }
  function famOf(sid) { return D.FAMS.filter(function (f) { return f.id === S[sid].fam; })[0]; }
  function mainCls(pid) { return 's' + S[P[pid].main[0]].cls; }
  function uses(pid, sid) { return P[pid].main.indexOf(sid) >= 0; }
  function usesAny(pid, sid) { return P[pid].main.indexOf(sid) >= 0 || P[pid].also.indexOf(sid) >= 0; }
  function nbOf(pid) { return (G.p[pid] && G.p[pid].nb) || []; }
  function names(ids, n) {
    var arr = ids.map(function (i) { return P[i].short; });
    if (n && arr.length > n) return arr.slice(0, n).join(', ') + ' +' + (arr.length - n);
    return arr.join(', ');
  }
  function scriptNames(ids) { return ids.map(function (i) { return S[i].tr; }).join(' · '); }
  function inFams(fams, ids) {
    if (!fams || !fams.length) return true;
    return ids.some(function (i) { return fams.indexOf(S[i].fam) >= 0; });
  }
  function specWords(sid) {
    var ws = S[sid].words;
    if (sid === 'asm') ws = ws.filter(function (w) { return /[ৰৱ]/.test(w[0]); });   // Bengali ile karışmasın: ayırt edici harf şart
    return ws;
  }
  function pickWord(sid, avoid) {
    var ws = specWords(sid), pool = ws.filter(function (w) { return w[0] !== avoid; });
    return U.pick(pool.length ? pool : ws);
  }
  function parseKey(key) {
    var m = /^as:([a-z0-9]+):(.+)$/.exec(String(key));
    return m && KINDS[m[1]] ? { kind: m[1], id: m[2] } : null;
  }
  function catOfKind(kind) { return CATS.filter(function (c) { return c.kinds.indexOf(kind) >= 0; })[0] || null; }

  function itemKeys(kind, cfg) {
    var fams = cfg && cfg.fams, ids;
    switch (kind) {
      case 'reg': ids = REG_SCRIPTS.filter(function (i) { return inFams(fams, [i]); }); break;
      case 'pair': ids = PAIR_KEYS.filter(function (k) { return inFams(fams, k.split('|')); }); break;
      case 'st2s': case 'loc':
        ids = D.PLACES.filter(function (p) { return inFams(fams, [p.main[0]]); }).map(function (p) { return p.id; }); break;
      default: ids = [];
    }
    return ids.map(function (i) { return 'as:' + kind + ':' + i; });
  }
  function allKeys() { return ALL_KINDS.reduce(function (a, k) { return a.concat(itemKeys(k, {})); }, []); }

  /* ---------------- şık üretimi ---------------- */
  function uniqTake(list, avoid, n) {
    var out = [];
    list.forEach(function (x) { if (out.length < n && out.indexOf(x) < 0 && !avoid[x]) out.push(x); });
    return out;
  }
  function signSample(sid) {
    if (sid === 'latn') return U.pick(['Baptist Church · EN', 'Welcome · NH-2', 'District Rd · EN']);
    return pickWord(sid)[0];
  }
  function specOpt(sid, label) {
    return { id: sid, label: label || S[sid].tr, sub: S[sid].nat, subScript: sid, spec: { sid: sid, text: signSample(sid) }, kind: 'spec' };
  }

  /* "Bölgenin tabelası" için yanlış şıklar: önce komşuların yazıları, sonra karışanlar */
  function scriptChoices(pid, correct, n) {
    var p = P[pid], avoid = {};
    if (correct !== 'latn') avoid.latn = 1;
    if (correct === 'beng') avoid.asm = 1;
    if (correct === 'asm') avoid.beng = 1;
    p.main.concat(p.also).forEach(function (x) { avoid[x] = 1; });
    var nbS = U.shuffle(nbOf(pid).map(function (i) { return P[i].main[0]; }));
    var zoneS = D.PLACES.filter(function (q) { return q.zone === p.zone; }).map(function (q) { return q.main[0]; });
    return uniqTake(nbS.concat(U.shuffle(S[correct].conf), U.shuffle(zoneS), U.shuffle(QUIZ_SCRIPTS)), avoid, n);
  }
  /* "Bu yazı nerede?" için yanlış şıklar: o yazıyı hiç kullanmayan yerler */
  function placeChoices(sid, correct, n) {
    var avoid = {};
    D.PLACES.forEach(function (p) { if (usesAny(p.id, sid)) avoid[p.id] = 1; });
    var zone = P[correct].zone;
    var cand = U.shuffle(nbOf(correct)).concat(U.shuffle(D.PLACES.filter(function (p) { return p.zone === zone; }).map(function (p) { return p.id; })), U.shuffle(D.PLACES.map(function (p) { return p.id; })));
    return uniqTake(cand, avoid, n);
  }

  /* ---------------- ipuçları ---------------- */
  function regHints(s, acc) {
    var zones = U.uniq(acc.map(function (i) { return P[i].zone; })), inZones = D.PLACES.filter(function (p) { return zones.indexOf(p.zone) >= 0; }).map(function (p) { return p.id; });
    return [
      { k: 'Biçim', t: s.gist },
      { k: 'Yön', t: zones.map(function (z) { return D.ZONES[z]; }).join(' · '), ids: inZones },
      { k: 'Yerler', t: names(acc, 6), ids: acc }
    ];
  }
  function st2sHints(p) {
    var nb = nbOf(p.id), m0 = p.main[0], steps = [];
    steps.push({ k: 'Yön', t: D.ZONES[p.zone] + (nb.length ? ' · komşular: ' + names(nb, 6) : ''), ids: nb.length ? nb : null });
    steps.push({ k: 'Görünüm', t: S[m0].gist });
    steps.push({ k: 'İpucu', t: p.note });
    return steps;
  }
  function locHints(p) {
    var nb = nbOf(p.id), same = D.PLACES.filter(function (q) { return q.main[0] === p.main[0] && q.id !== p.id; }).map(function (q) { return q.id; });
    var steps = [{ k: 'Yön', t: D.ZONES[p.zone] + ' · başkent ' + p.cap }];
    if (nb.length) steps.push({ k: 'Komşular', t: names(nb, 7), ids: nb });
    if (same.length) steps.push({ k: 'Aynı yazı', t: names(same, 6) + ' ile ortak tabela', ids: same });
    return steps;
  }
  function pairHints(target, other, placeId) {
    var t = D.pairTell(target, other), st = D.statesOf(target, true), steps = [{ k: 'İşaret', t: S[target].tells[0] || S[target].gist }];
    if (t) steps.push({ k: 'Ayrım', t: t, ids: st.length ? st : [placeId] });
    return steps;
  }

  /* ---------------- soru kurucular ---------------- */
  function buildPair(key) {
    var ab = key.split('|');
    var cand = ab.filter(function (id) { return D.statesOf(id, true).length > 0; });
    var target = U.pick(cand.length ? cand : ab), other = ab[0] === target ? ab[1] : ab[0];
    var allSt = D.statesOf(target, true);
    var cleanSt = allSt.filter(function (pid) { return !usesAny(pid, other); });
    var stPool = cleanSt.length ? cleanSt : allSt;
    var placeId = U.pick(stPool);
    var otherSt = D.statesOf(other, true);
    var lblTarget = P[placeId] ? P[placeId].short : S[target].tr;
    var lblOther = otherSt.length ? names(otherSt, 2) : (S[other].tr + ' (ikincil)');
    var opts = U.shuffle([specOpt(target, lblTarget), specOpt(other, lblOther)]);
    return {
      key: 'as:pair:' + key, kind: 'pair', title: 'Benzer yazıları ayır', mode: 'mc', base: 'pair',
      prompt: { t: 'ask', main: 'Hangisi ' + P[placeId].short + ' tabelası?', sub: D.ZONES[P[placeId].zone] + ' · şekline bakarak seç.' },
      options: opts, correct: target, accept: [], focus: [placeId],
      answerText: P[placeId].short + ' (' + S[target].tr + ')',
      note: D.pairTell(ab[0], ab[1]),
      reveal: { ids: allSt.length ? allSt : [placeId], primary: placeId, card: { k: 'place', id: placeId } },
      hints: pairHints(target, other, placeId)
    };
  }
  function buildReg(sid, cfg) {
    var s = S[sid], w = pickWord(sid), acc = D.statesOf(sid, true);
    var near = D.PLACES.filter(function (p) { return p.also.indexOf(sid) >= 0 && p.main.indexOf(sid) < 0; }).map(function (p) { return p.id; });
    var mm = cfg && cfg.mapmode, mode = mm === 'mc' ? 'mc' : mm === 'map' ? 'map' : (Math.random() < 0.5 ? 'mc' : 'map');
    var q = {
      key: 'as:reg:' + sid, kind: 'reg', title: 'Bu yazı nerede baskın?', mode: mode, base: 'reg',
      prompt: { t: 'spec', sid: sid, text: w[0], sub: mode === 'map' ? 'Haritada baskın olduğu bir yere dokun.' : 'Hangi bölgenin tabelasıdır?' },
      accept: acc, near: near, focus: [],
      answerText: names(acc, 5),
      note: s.gist + ' · ' + s.tr + ' (' + w[1] + ')',
      reveal: { ids: acc, primary: acc[0], card: { k: 'script', id: sid } },
      hints: regHints(s, acc)
    };
    if (mode === 'mc') {
      var pool = acc.filter(function (i) { return !TINY[i]; });
      var correct = U.pick(pool.length ? pool : acc);
      q.options = U.shuffle([correct].concat(placeChoices(sid, correct, 3))).map(function (i) { return { id: i, label: P[i].short, sub: kindTR(P[i].kind) }; });
      q.correct = correct;
    }
    return q;
  }
  function buildSt2s(pid) {
    var p = P[pid], correct = U.pick(p.main);
    var opts = U.shuffle([correct].concat(scriptChoices(pid, correct, 3))).map(function (sid) { return specOpt(sid, S[sid].tr); });
    return {
      key: 'as:st2s:' + pid, kind: 'st2s', title: 'Bölgenin tabelası', mode: 'mc', base: 'place',
      prompt: { t: 'place', main: p.short, sub: D.ZONES[p.zone] + ' · burada hangi tabelayı görürsün?' },
      options: opts, correct: correct, accept: [], focus: [pid],
      answerText: S[correct].tr + ' (' + p.short + ')',
      note: p.note,
      reveal: { ids: [pid], primary: pid, card: { k: 'place', id: pid } },
      hints: st2sHints(p)
    };
  }
  function buildLoc(pid) {
    var p = P[pid];
    return {
      key: 'as:loc:' + pid, kind: 'loc', title: 'Haritada bul', mode: 'map', base: 'loc',
      prompt: { t: 'place', main: p.short, sub: kindTR(p.kind) + ' · başkent ' + p.cap },
      accept: [pid], focus: [],
      answerText: p.short + (p.kind === 'ut' ? ' (birlik bölgesi)' : ''),
      note: D.ZONES[p.zone] + ' · ' + scriptNames(p.main),
      reveal: { ids: [pid], primary: pid, card: { k: 'place', id: pid } },
      hints: locHints(p)
    };
  }
  function build(key, cfg) {
    var pk = parseKey(key);
    if (!pk) throw new Error('geçersiz anahtar: ' + key);
    var q;
    switch (pk.kind) {
      case 'pair': q = buildPair(pk.id); break;
      case 'reg': q = buildReg(pk.id, cfg); break;
      case 'st2s': q = buildSt2s(pk.id); break;
      default: q = buildLoc(pk.id);
    }
    q.retry = false;
    return q;
  }

  /* ---------------- oturum ---------------- */
  function Session(cfg) {
    cfg = Object.assign({}, cfg);
    var kinds = (cfg.kinds && cfg.kinds.length ? cfg.kinds : ALL_KINDS).filter(function (k) { return KINDS[k]; });
    var keys, fixed = false;
    if (cfg.keys && cfg.keys.length) { keys = U.uniq(cfg.keys.filter(parseKey)); fixed = true; }
    else {
      keys = kinds.reduce(function (a, k) { return a.concat(itemKeys(k, cfg)); }, []);
      if (cfg.weakOnly) keys = SRS.weakKeys(keys);
    }
    this.cfg = cfg; this.keys = keys; this.empty = !keys.length;
    this.queue = fixed ? U.shuffle(keys) : null;
    this.total = this.empty || fixed ? 0 : (cfg.count > 0 ? cfg.count : 0);      // sabit listede toplam yok: tekrarlar sayıyı uzatabilir
    this.idx = 0; this.log = []; this.run = 0; this.bestRun = 0; this.correct = 0; this.clean = 0; this.hinted = 0;
    this.t0 = Date.now(); this.recent = []; this.retryQ = []; this.tries = {}; this.done = false; this.cur = null;
  }
  Session.prototype.next = function () {
    if (this.empty || this.done) return null;
    var key = null, retry = false, i;
    for (i = 0; i < this.retryQ.length; i++) {
      if (this.retryQ[i].due <= this.idx) { key = this.retryQ[i].key; this.retryQ.splice(i, 1); retry = true; break; }
    }
    if (!key && this.queue && this.queue.length) key = this.queue.shift();
    if (!key && this.queue) {
      /* sabit liste bitti ama bekleyen tekrarlar var */
      if (this.retryQ.length) { key = this.retryQ.shift().key; retry = true; } else return null;
    }
    if (!key) {
      key = SRS.pick(this.keys, new Set(this.recent));
      this.recent.push(key);
      if (this.recent.length > Math.min(5, this.keys.length - 1)) this.recent.shift();
    }
    var q = build(key, this.cfg);
    q.retry = retry; this.cur = q;
    return q;
  };
  Session.prototype.record = function (q, res, extra) {
    extra = extra || {};
    var hints = extra.hints || 0, ok = res === 'ok', hinted = ok && hints > 0;
    this.idx++;
    if (ok) this.correct++;
    if (ok && !hinted) { this.clean++; this.run++; if (this.run > this.bestRun) this.bestRun = this.run; }
    else { this.run = 0; if (hinted) this.hinted++; }
    this.log.push({ key: q.key, kind: q.kind, res: res, hints: hints, label: q.answerText, prompt: q.prompt, ids: extra.ids || [], t: Date.now() });
    SRS.answer(q.key, ok, hinted);
    if (!ok || hinted) {
      var n = (this.tries[q.key] || 0) + 1;
      this.tries[q.key] = n;
      if (n <= 2) this.retryQ.push({ key: q.key, due: this.idx + 3 + U.rand(3) });
    }
    if (this.total > 0 && this.idx >= this.total) this.done = true;
    if (this.queue && !this.queue.length && !this.retryQ.length) this.done = true;
  };

  /* ---------------- arama ---------------- */
  function search(text) {
    var t = D.norm(text), out = [];
    if (!t) return out;
    function score(fields) {
      var best = 9;
      fields.forEach(function (f) {
        var n = D.norm(f);
        if (!n) return;
        if (n === t) best = Math.min(best, 0);
        else if (n.indexOf(t) === 0) best = Math.min(best, 1);
        else if (n.indexOf(t) > 0) best = Math.min(best, 2);
      });
      return best;
    }
    D.PLACES.forEach(function (p) {
      var nn = D.NATIVE[p.id], sc = score([p.en, p.short, p.cap, p.lang, nn[1], nn[2]].concat(D.ALIAS[p.id] || []));
      if (sc < 9) out.push({ type: 'place', id: p.id, label: p.short, sub: kindTR(p.kind) + ' · ' + scriptNames(p.main), sc: sc });
    });
    D.SCRIPTS.forEach(function (s) {
      var sc = score([s.tr, s.nat, s.langs, s.lang]);
      if (sc < 9) out.push({ type: 'script', id: s.id, label: s.tr + ' yazısı', sub: s.langs, sc: sc });
    });
    out.sort(function (a, b) { return a.sc - b.sc || (a.type === b.type ? 0 : a.type === 'script' ? -1 : 1); });
    return out.slice(0, 8);
  }

  /* ---------------- harita: dokunma çözümü ----------------
     Küçük ve dağınık yerler (Delhi, Chandigarh, Lakshadweep…) parmakla tutturulamaz:
     dokunma noktasına yeterince yakın küçük yer varsa o seçilir. */
  function resolveTap(map, hit) {
    var tolPx = hit && hit.id ? 9 : 18, tol = tolPx / map.cam.k, best = null, bd = Infinity;
    if (hit && hit.id && TINY[hit.id]) return hit.id;
    Object.keys(TINY).forEach(function (id) {
      var rings = map.Geom.ringsOf(id), d;
      if (map.Geom.pip(rings, hit.x, hit.y)) d = 0;
      else d = Math.sqrt(map.Geom.nearestPoint(rings, hit.x, hit.y).d2);
      if (d <= tol && d < bd) { bd = d; best = id; }
    });
    return best || (hit && hit.id) || null;
  }

  g.ASBank = {
    KINDS: KINDS, CATS: CATS, ALL_KINDS: ALL_KINDS, PRESETS: PRESETS, QUIZ_SCRIPTS: QUIZ_SCRIPTS, REG_SCRIPTS: REG_SCRIPTS, PAIR_KEYS: PAIR_KEYS, TINY: TINY,
    itemKeys: itemKeys, allKeys: allKeys, parseKey: parseKey, build: build, Session: Session, search: search, resolveTap: resolveTap,
    kindTR: kindTR, famOf: famOf, mainCls: mainCls, uses: uses, usesAny: usesAny, nbOf: nbOf, names: names, scriptNames: scriptNames,
    catOfKind: catOfKind, pickWord: pickWord, specWords: specWords
  };
})(typeof window !== 'undefined' ? window : globalThis);

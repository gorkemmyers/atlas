/* bank.js — soru bankası, metin eşleme, arama ve oturum motoru */
(function (g) {
  'use strict';
  const D = g.VN_DATA, G = g.VN_GEO, U = g.U, SRS = g.SRS, Nm = g.Names, norm = D.norm;
  const P = D.provinces;
  const regIdx = {};
  D.regions.forEach((r, i) => { regIdx[r.id] = i; });

  /* ---------- küçük yardımcılar ---------- */
  const shortName = p => p.vi.replace(/^TP\.\s*/, '');
  const typeTR = t => (t === 'city' ? 'Merkezî yönetimli şehir' : 'İl');
  const A0 = a => '0' + a;
  const pBy = id => D.pById[id];
  const hasCap = p => norm(p.cap) !== norm(p.vi) && !/şehri/i.test(p.cap);

  /* [29,30,31,32,33,40] → "29–33, 40" */
  function compress(codes) {
    const nums = codes.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    const out = [];
    let i = 0;
    while (i < nums.length) {
      let j = i;
      while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
      if (j - i >= 2) out.push(nums[i] + '–' + nums[j]);
      else if (j > i) out.push(nums[i] + ', ' + nums[j]);
      else out.push(String(nums[i]));
      i = j + 1;
    }
    return out.join(', ');
  }

  /* ---------- metin eşleme ---------- */
  function nameSet(o) {
    if (o._ns) return o._ns;
    const set = new Set();
    const add = s => { if (s) { const n = norm(s); if (n) set.add(n); } };
    add(o.vi); add(o.ascii); add(o.en); (o.alias || []).forEach(add); add(shortName(o));
    Object.defineProperty(o, '_ns', { value: set, enumerable: false });
    return set;
  }
  const stripPrefix = n => n.replace(/^(tinh|thanhpho|tp)(?=[a-z]{3})/, '');
  function matchName(o, input) {
    const n = norm(input);
    if (!n) return false;
    const set = nameSet(o);
    if (set.has(n)) return true;
    const s = stripPrefix(n);
    return s.length > 2 && set.has(s);
  }
  function capSet(p) {
    const set = new Set();
    const add = s => { const n = norm(s); if (n) set.add(n); };
    add(p.cap);
    p.cap.split(/\s*[–-]\s*/).forEach(add);
    return set;
  }
  function areaDigits(input) {
    let d = String(input).replace(/\D+/g, '');
    if (d.indexOf('84') === 0 && d.length > 3) d = d.slice(2);
    return d.replace(/^0+/, '');
  }

  /* ---------- türler, kategoriler, hazır ayarlar ---------- */
  const KINDS = {
    loc:    { label: 'Haritada bul',        modes: ['map'] },
    ident:  { label: 'İli tanı',            modes: ['mc', 'text'] },
    nb:     { label: 'Komşular',            modes: ['mc'] },
    a2p:    { label: 'Alan kodu → il',      modes: ['map', 'mc', 'text'] },
    p2a:    { label: 'İl → alan kodu',      modes: ['mc', 'text'] },
    reg:    { label: 'İl → bölge',          modes: ['mc'] },
    regloc: { label: 'Bölgeyi bul',         modes: ['map'] },
    plc:    { label: 'Yer → il',            modes: ['map', 'mc', 'text'] },
    cap:    { label: 'Merkez → il',         modes: ['map', 'mc', 'text'] },
    p2cap:  { label: 'İl → merkez',         modes: ['mc', 'text'] },
    nm2m:   { label: 'Ad → kesim',          modes: ['mc'] },
    syl:    { label: 'Hece → konum',        modes: ['mc'] }
  };
  const MACRO_SW = { N: 4, C: 2, S: 6 };            // paint.js MACRO_Q ile aynı renk dizini
  const CATS = [
    { id: 'konum',    label: 'Konum',        kinds: ['loc', 'ident', 'nb'] },
    { id: 'ad',       label: 'Ad mantığı',   kinds: ['nm2m', 'syl'] },
    { id: 'alan',     label: 'Alan kodu',    kinds: ['a2p', 'p2a'] },
    { id: 'bolge',    label: 'Bölge',        kinds: ['reg', 'regloc'] },
    { id: 'yer',      label: 'Yer & merkez', kinds: ['plc', 'cap', 'p2cap'] }
  ];
  const ALL_KINDS = CATS.reduce((a, c) => a.concat(c.kinds), []);
  const PRESETS = [
    { id: 'ad',       title: 'Adından tahmin et',  sub: 'İl adı → kesim ve bölge · hece kuralları · İpucu = kural', icon: 'bulb', cfg: { kinds: ['nm2m', 'syl', 'reg'], mode: 'mc', count: 20 }, wide: true, feat: true },
    { id: 'tur',      title: 'Harita turu',        sub: 'İlleri haritada bul',          icon: 'pin',    cfg: { kinds: ['loc'], mode: 'map', count: 20 } },
    { id: 'alan',     title: 'Alan kodları',       sub: '0236 → Đà Nẵng ve tersi',      icon: 'phone',  cfg: { kinds: ['a2p', 'p2a'], mode: 'mix', count: 20 } },
    { id: 'bolge',    title: 'Bölgeler',           sub: '8 bölge, hangi il nerede',     icon: 'layers', cfg: { kinds: ['reg', 'regloc'], mode: 'mix', count: 16 } },
    { id: 'yer',      title: 'Yerler & merkezler', sub: 'Hội An hangi ilde?',           icon: 'compass',cfg: { kinds: ['plc', 'cap', 'p2cap'], mode: 'mix', count: 20 } },
    { id: 'karma',    title: 'Karma tekrar',       sub: 'Tüm türler, aralıklı tekrar',  icon: 'target', cfg: { kinds: ALL_KINDS, mode: 'mix', count: 25 }, wide: true },
    { id: 'zayif',    title: 'Zayıf noktalarım',   sub: 'Yanlışların ve yeni öğeler',   icon: 'flame',  cfg: { kinds: ALL_KINDS, mode: 'mix', count: 20, weakOnly: true }, wide: true }
  ];
  const baseKind = k => (KINDS[k] && KINDS[k].base) || k;
  function catOfKind(k) {
    k = baseKind(k);
    for (let i = 0; i < CATS.length; i++) if (CATS[i].kinds.indexOf(k) >= 0) return CATS[i];
    return null;
  }

  /* ---------- öğe anahtarları ---------- */
  const inP = (p, cfg) => !cfg.scope || !cfg.scope.length || cfg.scope.indexOf(p.region) >= 0;

  function itemKeys(kind, cfg) {
    cfg = cfg || {};
    const ps = P.filter(p => inP(p, cfg));
    switch (kind) {
      case 'loc': case 'ident': case 'a2p': case 'p2a': case 'reg': case 'nb': case 'nm2m':
        return ps.map(p => kind + ':' + p.id);
      case 'syl':
        return Nm.SYLQ.map(x => 'syl:' + x.id);
      case 'regloc':
        return D.regions.filter(r => !cfg.scope || !cfg.scope.length || cfg.scope.indexOf(r.id) >= 0).map(r => 'regloc:' + r.id);
      case 'plc': {
        const out = [];
        ps.forEach(p => p.places.forEach((_, i) => out.push('plc:' + p.id + '#' + i)));
        return out;
      }
      case 'cap': case 'p2cap':
        return ps.filter(hasCap).map(p => kind + ':' + p.id);
    }
    return [];
  }

  /* bir ile ait tüm öğe anahtarları: kind → [keys] (ustalık haritası için) */
  function provKeys(id) {
    const p = pBy(id), out = {};
    out.loc = ['loc:' + id]; out.ident = ['ident:' + id]; out.nb = ['nb:' + id];
    out.a2p = ['a2p:' + id]; out.p2a = ['p2a:' + id];
    out.reg = ['reg:' + id]; out.nm2m = ['nm2m:' + id];
    out.plc = p.places.map((_, i) => 'plc:' + id + '#' + i);
    if (hasCap(p)) { out.cap = ['cap:' + id]; out.p2cap = ['p2cap:' + id]; }
    return out;
  }

  /* ---------- çeldirici seçimi ---------- */
  function ring(id) {
    const n1 = G.p[id].nb.slice(), s1 = new Set(n1), n2 = [];
    n1.forEach(x => G.p[x].nb.forEach(y => { if (y !== id && !s1.has(y) && n2.indexOf(y) < 0) n2.push(y); }));
    return { n1, n2, s1, s2: new Set(n2) };
  }
  /* bonus: (diğer il) → ek ağırlık */
  function distractProvs(id, n, bonus, filter) {
    const p = pBy(id), r = ring(id);
    const cand = P.filter(q => q.id !== id && (!filter || filter(q)));
    const picks = U.weightedN(cand, n, q => {
      let w = r.s1.has(q.id) ? 6 : r.s2.has(q.id) ? 3.5 : q.region === p.region ? 2.5 : 1;
      if (bonus) w += bonus(q);
      return w;
    });
    return picks;
  }
  const provOpt = p => ({ id: p.id, label: p.vi });

  /* ---------- soru üretimi ---------- */
  function chooseMode(sup, pref) {
    if (sup.length === 1) return sup[0];
    if (pref && pref !== 'mix' && sup.indexOf(pref) >= 0) return pref;
    const w = { map: 0.35, mc: 0.45, text: 0.2 };
    return U.weighted(sup, m => w[m]);
  }
  const NAME_HINT = 'İl adı yaz (örn. Da Nang)';

  function build(key, cfg) {
    cfg = cfg || {};
    const ix = key.indexOf(':');
    const kind = key.slice(0, ix), rest = key.slice(ix + 1);
    const def = KINDS[kind];
    const q = {
      key, kind, base: baseKind(kind), layer: 'old', title: '', prompt: null, focus: [], accept: [],
      options: null, correct: null, text: null, answerText: '', reveal: null, note: '', mode: null
    };
    q.mode = chooseMode(def.modes, cfg.mode);
    const mcProv = (id, arr) => {
      q.options = U.shuffle([provOpt(pBy(id))].concat(arr.map(provOpt)));
      q.correct = id;
    };
    const nameText = (o, hint) => {
      q.text = { kind: 'name', hint: hint || NAME_HINT, check: s => matchName(o, s) };
    };
    const revealProv = (id, extra) => { q.reveal = Object.assign({ layer: 'old', ids: [id], card: { k: 'prov', id } }, extra || {}); };

    switch (q.base) {
      case 'loc': {
        const p = pBy(rest);
        q.title = 'Haritada göster';
        q.prompt = { t: 'name', main: p.vi, sub: typeTR(p.type) };
        q.accept = [p.id]; q.answerText = p.vi; revealProv(p.id);
        break;
      }
      case 'ident': {
        const p = pBy(rest);
        q.title = 'Bu hangi il?';
        q.prompt = { t: 'hl', main: 'Haritada vurgulanan il' };
        q.focus = [p.id]; q.answerText = p.vi; revealProv(p.id);
        if (q.mode === 'mc') mcProv(p.id, distractProvs(p.id, 3));
        else nameText(p);
        break;
      }
      case 'nb': {
        const p = pBy(rest), r = ring(p.id);
        const right = U.pick(r.n1);
        q.title = 'Hangi il bu ile komşu?';
        q.prompt = { t: 'name', main: p.vi, sub: typeTR(p.type) };
        q.focus = [p.id];
        const pool = P.filter(x => x.id !== p.id && !r.s1.has(x.id));
        const wrong = U.weightedN(pool, 3, x => (r.s2.has(x.id) ? 5 : x.region === p.region ? 3 : 1));
        q.options = U.shuffle([provOpt(pBy(right))].concat(wrong.map(provOpt)));
        q.correct = right; q.answerText = pBy(right).vi;
        q.note = shortName(p) + ' komşuları: ' + r.n1.map(x => shortName(pBy(x))).join(', ') + '.';
        q.reveal = { layer: 'old', ids: [p.id].concat(r.n1), primary: right, card: { k: 'prov', id: right } };
        break;
      }
      case 'a2p': {
        const p = pBy(rest), fam = p.area.slice(0, 2);
        q.title = 'Bu alan kodu hangi ile ait?';
        q.prompt = { t: 'area', main: A0(p.area), sub: 'sabit hat alan kodu' };
        q.accept = [p.id]; q.answerText = p.vi; revealProv(p.id);
        if (q.mode === 'mc') mcProv(p.id, distractProvs(p.id, 3, x => (x.area.slice(0, 2) === fam ? 4 : 0)));
        else if (q.mode === 'text') nameText(p);
        break;
      }
      case 'p2a': {
        const p = pBy(rest), fam = p.area.slice(0, 2);
        q.title = 'Bu ilin alan kodu nedir?';
        q.prompt = { t: 'name', main: p.vi, sub: typeTR(p.type) };
        q.focus = [p.id]; q.answerText = A0(p.area); revealProv(p.id);
        if (q.mode === 'mc') {
          const ds = distractProvs(p.id, 3, x => (x.area.slice(0, 2) === fam ? 4 : 0));
          q.options = U.shuffle([{ id: p.area, label: A0(p.area), kind: 'area' }].concat(ds.map(x => ({ id: x.area, label: A0(x.area), kind: 'area' }))));
          q.correct = p.area;
        } else {
          q.text = { kind: 'area', hint: 'Alan kodu yaz (örn. 0236)', check: s => areaDigits(s) === p.area };
        }
        break;
      }
      case 'reg': {
        const p = pBy(rest), r = D.regionById[p.region];
        q.title = 'Bu il hangi bölgede?';
        q.prompt = { t: 'name', main: p.vi, sub: typeTR(p.type) };
        q.focus = [p.id]; q.answerText = r.tr;
        q.options = D.regions.map(x => ({ id: x.id, label: x.short, sub: x.vi, swatch: regIdx[x.id] }));
        q.correct = r.id;
        q.reveal = { layer: 'old', ids: P.filter(x => x.region === r.id).map(x => x.id), primary: p.id, card: { k: 'prov', id: p.id } };
        break;
      }
      case 'regloc': {
        const r = D.regionById[rest], ids = P.filter(x => x.region === r.id).map(x => x.id);
        q.title = 'Bölgeyi haritada bul';
        q.prompt = { t: 'region', main: r.tr, sub: r.vi + ' · ' + ids.length + ' il' };
        q.accept = ids; q.answerText = r.tr;
        q.reveal = { layer: 'old', ids, card: { k: 'region', id: r.id } };
        break;
      }
      case 'plc': {
        const m = /^(.+)#(\d+)$/.exec(rest), p = pBy(m[1]), place = p.places[+m[2]];
        q.title = 'Bu yer hangi ilde?';
        q.prompt = { t: 'place', main: place, sub: 'tanınan bir yer / yer adı' };
        q.accept = [p.id]; q.answerText = p.vi; revealProv(p.id);
        if (q.mode === 'mc') mcProv(p.id, distractProvs(p.id, 3));
        else if (q.mode === 'text') nameText(p);
        break;
      }
      case 'cap': {
        const p = pBy(rest);
        q.title = 'Bu şehir hangi ilin merkezi?';
        q.prompt = { t: 'cap', main: p.cap, sub: 'idari merkez' };
        q.accept = [p.id]; q.answerText = p.vi; revealProv(p.id);
        if (q.mode === 'mc') mcProv(p.id, distractProvs(p.id, 3));
        else if (q.mode === 'text') nameText(p);
        break;
      }
      case 'p2cap': {
        const p = pBy(rest), cs = capSet(p);
        q.title = 'Bu ilin merkezi neresi?';
        q.prompt = { t: 'name', main: p.vi, sub: typeTR(p.type) };
        q.focus = [p.id]; q.answerText = p.cap; revealProv(p.id);
        if (q.mode === 'mc') {
          const ds = distractProvs(p.id, 3, null, hasCap);
          q.options = U.shuffle([{ id: p.id, label: p.cap }].concat(ds.map(x => ({ id: x.id, label: x.cap }))));
          q.correct = p.id;
        } else {
          q.text = { kind: 'cap', hint: 'Merkez şehri yaz (örn. Nha Trang)', check: s => cs.has(norm(s)) };
        }
        break;
      }
      case 'nm2m': {
        const p = pBy(rest), inf = Nm.info(p.id), mac = D.macroById[p.macro];
        q.title = 'Yalnızca adına bak: bu il hangi kesimde?';
        q.prompt = { t: 'name', main: p.vi, sub: 'Harita yok · hece ve desenden tahmin et' };
        q.focus = []; q.answerText = mac.tr;
        q.options = D.macros.map(x => ({ id: x.id, label: x.tr, sub: x.vi, swatch: MACRO_SW[x.id] }));
        q.correct = mac.id;
        q.note = inf.tell;
        q.reveal = { layer: 'old', ids: P.filter(x => x.macro === p.macro).map(x => x.id), primary: p.id, card: { k: 'prov', id: p.id } };
        break;
      }
      case 'syl': {
        const it = Nm.sylqById[rest];
        q.title = 'Bu desen / önek neyi işaret eder?';
        q.prompt = { t: 'name', main: it.p, sub: it.ex };
        q.focus = [];
        if (it.ans.t === 'h') {
          q.options = [{ id: 'N', label: 'Kuzey yarı', sub: 'Bắc Bộ + Bắc Trung Bộ', swatch: 4 }, { id: 'S', label: 'Güney yarı', sub: 'Nam Trung Bộ · Yaylalar · Güneydoğu · Mekong', swatch: 6 }];
          q.answerText = it.ans.id === 'N' ? 'Kuzey yarı' : 'Güney yarı';
        } else if (it.ans.t === 'm') {
          q.options = D.macros.map(x => ({ id: x.id, label: x.tr, sub: x.vi, swatch: MACRO_SW[x.id] }));
          q.answerText = D.macroById[it.ans.id].tr;
        } else {
          const r = D.regionById[it.ans.id];
          const wrong = U.sample(D.regions.filter(x => x.id !== r.id), 3);
          q.options = U.shuffle([r].concat(wrong)).map(x => ({ id: x.id, label: x.short, sub: x.vi, swatch: regIdx[x.id] }));
          q.answerText = r.tr;
        }
        q.correct = it.ans.id;
        q.note = it.why;
        q.reveal = { layer: 'old', ids: it.ids.slice(), primary: it.ids[0], card: it.ans.t === 'r' ? { k: 'region', id: it.ans.id } : { k: 'prov', id: it.ids[0] } };
        break;
      }
    }
    return q;
  }

  /* metin cevabını denetle */
  function checkText(q, input) { return !!(q.text && String(input).trim() && q.text.check(input)); }

  /* ---------- oturum ---------- */
  class Session {
    constructor(cfg) {
      this.cfg = cfg;
      this.fixed = cfg.keys ? cfg.keys.slice() : null;
      this.pools = {};
      this.idx = 0; this.log = []; this.retry = []; this.recent = [];
      this.run = 0; this.bestRun = 0; this.t0 = Date.now(); this.cur = null;
      if (!this.fixed) {
        (cfg.kinds || []).forEach(k => {
          let keys = itemKeys(k, cfg);
          if (cfg.weakOnly) { const w = SRS.weakKeys(keys); if (w.length) keys = w; }
          if (keys.length) this.pools[k] = keys;
        });
      }
      this.kindList = Object.keys(this.pools);
      this.total = this.fixed ? this.fixed.length : (cfg.count || 0);
    }
    get empty() { return !this.fixed && !this.kindList.length; }
    get done() { return this.total > 0 && this.idx >= this.total; }
    next() {
      if (this.done || this.empty) return null;
      let key = null, retry = false;
      if (this.fixed) key = this.fixed[this.idx];
      else {
        const due = this.retry.findIndex(r => r.at <= this.idx && r.key !== this.recent[this.recent.length - 1]);
        if (due >= 0) { key = this.retry.splice(due, 1)[0].key; retry = true; }
        else {
          const kind = U.pick(this.kindList);
          key = SRS.pick(this.pools[kind], new Set(this.recent));
        }
      }
      this.recent.push(key);
      if (this.recent.length > 8) this.recent.shift();
      const q = build(key, this.cfg);
      q.retry = retry; q.n = this.idx + 1; q.t0 = Date.now();
      this.cur = q;
      return q;
    }
    /* res: 'ok' | 'bad' | 'skip' */
    record(q, res, extra) {
      const ok = res === 'ok', hinted = ok && !!(extra && extra.hints > 0);
      SRS.answer(q.key, ok, hinted);
      if (hinted) {
        if (!this.fixed) this.retry.push({ key: q.key, at: this.idx + 1 + 4 + U.rand(3) });
      } else if (ok) { this.run++; this.bestRun = Math.max(this.bestRun, this.run); } else {
        this.run = 0;
        if (!this.fixed) this.retry.push({ key: q.key, at: this.idx + 1 + 3 + U.rand(3) });
      }
      this.log.push(Object.assign({ key: q.key, kind: q.base, res, label: q.answerText, secs: (Date.now() - q.t0) / 1000, prompt: q.prompt, mode: q.mode }, extra || {}));
      this.idx++;
      return ok;
    }
    get correct() { return this.log.filter(l => l.res === 'ok').length; }
    get hinted() { return this.log.filter(l => l.res === 'ok' && l.hints > 0).length; }
    get clean() { return this.log.filter(l => l.res === 'ok' && !(l.hints > 0)).length; }
  }

  /* ---------- arama (Keşfet) ---------- */
  function search(query) {
    const raw = String(query || '').trim();
    const qn = norm(raw);
    if (!qn) return [];
    const digits = raw.replace(/[\s()+.\-]/g, '');
    const isNum = /^\d+$/.test(digits);
    const res = [];
    const score = (n) => (n === qn ? 3 : n.indexOf(qn) === 0 ? 2 : n.indexOf(qn) > 0 ? 1 : 0);
    if (isNum) {
      const a = areaDigits(digits);
      if (a) P.forEach(p => { if (p.area === a || (a.length >= 2 && p.area.indexOf(a) === 0 && digits.charAt(0) === '0')) res.push({ type: 'area', id: p.id, label: shortName(p), sub: 'Alan kodu ' + A0(p.area), s: p.area === a ? 4 : 1.5 }); });
    }
    P.forEach(p => {
      const sc = Math.max.apply(null, Array.from(nameSet(p)).map(score));
      if (sc > 0) res.push({ type: 'prov', id: p.id, label: shortName(p), sub: typeTR(p.type) + ' · ' + D.regionById[p.region].short, s: sc + 1 });
      if (hasCap(p)) {
        const sc2 = Math.max.apply(null, Array.from(capSet(p)).map(score));
        if (sc2 > 0) res.push({ type: 'cap', id: p.id, label: p.cap, sub: 'Merkez · ' + shortName(p), s: sc2 + 0.4 });
      }
      p.places.forEach(pl => { const s2 = score(norm(pl)); if (s2 > 0) res.push({ type: 'place', id: p.id, label: pl, sub: 'Yer · ' + shortName(p), s: s2 }); });
    });
    res.sort((a, b) => b.s - a.s);
    const seen = new Set(), out = [];
    res.forEach(r => { const k = r.type + r.id + r.label; if (!seen.has(k)) { seen.add(k); out.push(r); } });
    return out.slice(0, 10);
  }

  g.Bank = {
    KINDS, CATS, ALL_KINDS, PRESETS, baseKind, catOfKind, itemKeys, provKeys, build, checkText, Session, search,
    compress, shortName, typeTR, A0, hasCap, regIdx, matchName, areaDigits, ring
  };
})(typeof window !== 'undefined' ? window : globalThis);

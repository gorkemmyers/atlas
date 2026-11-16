/* Alfabe soru bankası birim testi (Node): her anahtar × birçok tekrar */
global.window = global;
const path = require('path');
const root = path.join(__dirname, '..');
['util', 'store', 'srs', 'scripts-data', 'geo-asia', 'scripts-bank'].forEach(f => require(path.join(root, 'js', f + '.js')));
const B = window.ASBank, D = window.AS_DATA, G = window.AS_GEO;
let n = 0, bad = [];
const fail = m => { if (bad.length < 40) bad.push(m); };
const S = D.sById, P = D.pById;
const gid = id => !!G.p[id];

const keys = B.allKeys();
console.log('öğe sayısı:', keys.length, JSON.stringify(Object.fromEntries(B.ALL_KINDS.map(k => [k, B.itemKeys(k, {}).length]))));
if (keys.length < 95) fail('öğe sayısı çok az: ' + keys.length);
if (B.ALL_KINDS.includes('sid')) fail('sid türü kaldırılmış olmalı');

for (const key of keys) {
  for (const mm of ['map', 'mc', 'mix', 'mix', 'mix', 'mix']) {
    for (let rep = 0; rep < 6; rep++) {
      let q;
      try { q = B.build(key, { mapmode: mm }); } catch (e) { fail(key + ' EXC ' + e.stack.split('\n').slice(0, 2).join(' | ')); continue; }
      n++;
      const tag = key + '/' + mm;
      if (q.key !== key || !q.kind || !q.title || !q.prompt || !q.mode || !q.reveal || !q.answerText) { fail(tag + ' eksik alan'); continue; }
      if (!Array.isArray(q.hints) || !q.hints.length || !q.hints.every(h => h.k && h.t && (!h.ids || (h.ids.length && h.ids.every(gid))))) fail(tag + ' ipucu biçimsiz');
      if (!q.reveal.ids.every(gid)) fail(tag + ' reveal.ids geçersiz');
      if (!q.reveal.card || !['script', 'place'].includes(q.reveal.card.k)) fail(tag + ' kart yok');
      if (q.focus && !q.focus.every(gid)) fail(tag + ' focus');
      const pk = B.parseKey(key);
      if (q.mode === 'map') {
        if (!q.accept.length || !q.accept.every(gid)) fail(tag + ' map accept');
        if (pk.kind === 'reg') {
          const want = D.statesOf(pk.id, true).slice().sort().join();
          if (q.accept.slice().sort().join() !== want) fail(tag + ' accept ≠ main kümesi');
          if (q.near.some(i => q.accept.includes(i))) fail(tag + ' near ile accept çakışıyor');
        }
        if (pk.kind === 'loc' && (q.accept.length !== 1 || q.accept[0] !== pk.id)) fail(tag + ' loc accept');
      } else if (q.mode === 'mc') {
        const ids = q.options.map(o => String(o.id));
        const want = pk.kind === 'pair' ? 2 : 4;
        if (q.options.length !== want) fail(tag + ' şık sayısı ' + q.options.length);
        if (new Set(ids).size !== ids.length) fail(tag + ' şıklar tekrarlı');
        if (!ids.includes(String(q.correct))) fail(tag + ' doğru şık yok');
        if (!q.options.every(o => o.label)) fail(tag + ' şık etiketi yok');
        if (pk.kind === 'pair') {
          if (!q.options.every(o => o.kind === 'spec' && o.spec && o.spec.text && o.spec.sid === o.id)) fail(tag + ' pair örnek');
          if (!q.focus || q.focus.length !== 1) fail(tag + ' pair yer odağı yok');
          if (!q.note) fail(tag + ' pair ayrım notu yok');
          const a = q.options.find(o => o.id === 'asm'); if (a && !/[ৰৱ]/.test(a.spec.text)) fail(tag + ' pair Assam örneğinde ৰ/ৱ yok');
          const b = q.options.find(o => o.id === 'beng'); if (b && /[ৰৱ]/.test(b.spec.text)) fail(tag + ' pair Bengali örneğinde ৰ/ৱ var');
        } else if (pk.kind === 'st2s') {
          if (!q.options.every(o => o.kind === 'spec' && o.spec && o.spec.text && o.spec.sid === o.id)) fail(tag + ' st2s tabela şıkkı olmalı');
          const p = P[pk.id], good = ids.filter(i => p.main.includes(i));
          if (good.length !== 1) fail(tag + ' st2s: main şık sayısı ' + good.length);
          if (ids.some(i => p.also.includes(i) && !p.main.includes(i))) fail(tag + ' st2s: also şıkta (belirsiz)');
          if (!p.main.includes(q.correct)) fail(tag + ' st2s doğru yanlış');
        } else if (pk.kind === 'reg') {
          const acc = D.statesOf(pk.id, true), near = D.PLACES.filter(p => p.also.includes(pk.id)).map(p => p.id);
          const good = ids.filter(i => acc.includes(i));
          if (good.length !== 1 || good[0] !== String(q.correct)) fail(tag + ' reg: tek doğru olmalı');
          if (ids.some(i => near.includes(i) && !acc.includes(i))) fail(tag + ' reg: also yeri şıkta (belirsiz)');
        }
      } else fail(tag + ' bilinmeyen mod ' + q.mode);
      if (pk.kind === 'loc' && q.mode !== 'map') fail(tag + ' loc yalnız harita olmalı');
      if (pk.kind !== 'reg' && pk.kind !== 'loc' && q.mode !== 'mc') fail(tag + ' yalnız şıklı olmalı');
    }
  }
}

/* ---- kapsam (aile) ---- */
const south = B.itemKeys('reg', { fams: ['south'] }).map(k => B.parseKey(k).id).sort().join();
if (south !== 'knda,mlym,taml,telu') fail('south kapsamı: ' + south);
if (B.itemKeys('st2s', { fams: ['south'] }).length < 6) fail('south st2s az');

/* ---- oturum ---- */
function play(cfg, answer, max) {
  const s = new B.Session(cfg); let c = 0; max = max || 400;
  while (true) {
    const q = s.next(); if (!q) break;
    if (++c > max) { if (max === 400) fail('oturum bitmedi'); break; }
    const res = answer(q, c); s.record(q, res, { hints: res === 'ok' && c % 7 === 0 ? 1 : 0, ids: q.reveal.ids });
    if (s.done) break;
  }
  return { s, c };
}
{
  const r = play({ kinds: B.ALL_KINDS, count: 20 }, (q, i) => (i % 3 ? 'ok' : 'bad'));
  if (r.s.idx !== 20 || !r.s.done) fail('20 soruluk oturum: idx=' + r.s.idx + ' done=' + r.s.done);
  if (r.s.log.length !== 20) fail('log uzunluğu');
  if (r.s.clean + r.s.hinted + r.s.log.filter(l => l.res !== 'ok').length !== 20) fail('sayaçlar tutmuyor');
  if (!r.s.log.some(l => l.res === 'bad')) fail('hiç yanlış yok?');
  if (!window.Store.data.items[r.s.log[0].key]) fail('SRS kaydı yok');
}
{
  const ks = ['as:reg:telu', 'as:reg:knda', 'as:st2s:kerala', 'as:loc:goa'];
  const r = play({ keys: ks, count: 0 }, (q, i) => (i === 1 ? 'bad' : 'ok'));
  if (!r.s.done) fail('sabit liste bitmedi');
  const seen = new Set(r.s.log.map(l => l.key));
  ks.forEach(k => { if (!seen.has(k)) fail('sabit listede sorulmayan: ' + k); });
  if (r.s.log.length < 5) fail('yanlış yapılan tekrar edilmedi: ' + r.s.log.length);
  if (!r.s.log.some((l, i) => i > 0 && l.key === r.s.log[0].key || l.key === 'as:reg:knda')) fail('tekrar yok');
}
{
  const r = play({ kinds: ['reg'], count: 0 }, () => 'ok', 40);   // sonsuz oturum: bitmez
  if (r.s.done || r.c < 40) fail('sonsuz oturum erken bitti');
}
{
  const e = new B.Session({ kinds: ['pair'], fams: ['nonexistent'], count: 10 });
  if (!e.empty) fail('boş kapsam empty olmalı');
  const w = new B.Session({ kinds: B.ALL_KINDS, weakOnly: true, count: 10 });
  if (w.empty || w.keys.length < 95) fail('weakOnly ilk açılışta tüm öğeleri vermeli: ' + w.keys.length);
}

/* ---- arama ---- */
const hit = (t, type, id) => B.search(t).some(r => r.type === type && r.id === id);
[['tamil', 'script', 'taml'], ['Tamil', 'place', 'tamil-nadu'], ['hyderabad', 'place', 'telangana'], ['urdu', 'script', 'arab'], ['ಕರ್ನಾಟಕ', 'place', 'karnataka'], ['kolkata', 'place', 'west-bengal'],
 ['gujarati', 'script', 'gujr'], ['dhaka', 'place', 'bangladesh'], ['ladak', 'place', 'ladakh'], ['اردو', 'script', 'arab'], ['bengal', 'script', 'beng'], ['assam', 'place', 'assam'], ['sri', 'place', 'sri-lanka']]
  .forEach(([t, ty, id]) => { if (!hit(t, ty, id)) fail('arama bulamadı: ' + t + ' → ' + ty + ':' + id); });
if (B.search('   ').length || B.search('zzzqq').length) fail('boş / anlamsız arama sonuç vermemeli');

/* ---- küçük yerler ---- */
const tiny = Object.keys(B.TINY).sort().join();
console.log('küçük/dağınık yerler:', tiny);
['chandigarh', 'delhi', 'lakshadweep', 'puducherry', 'dnhdd', 'goa', 'andaman-nicobar'].forEach(i => { if (!B.TINY[i]) fail('TINY içinde olmalı: ' + i); });
if (B.TINY.sikkim || B.TINY.kerala) fail('TINY çok geniş');

console.log(`${n} soru üretildi.`, bad.length ? bad.length + ' HATA:\n  ' + bad.join('\n  ') : 'hata yok');
process.exit(bad.length ? 1 : 0);

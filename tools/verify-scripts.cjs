// Alfabe verisi tutarlılık denetimi: yazılar, yerler, çiftler, geometri eşleşmesi
global.window = global;
const path = require('path');
const root = path.join(__dirname, '..');
['scripts-data', 'geo-asia'].forEach(f => require(path.join(root, 'js', f + '.js')));
const D = window.AS_DATA, G = window.AS_GEO;
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('  ✗', m); } };

/* ---- yazılar ---- */
ok(D.SCRIPTS.length === 17, 'yazı sayısı 17 değil: ' + D.SCRIPTS.length);
const sIds = new Set(D.SCRIPTS.map(s => s.id));
ok(sIds.size === D.SCRIPTS.length, 'yazı kimlikleri tekrarlı');
const cls = D.SCRIPTS.map(s => s.cls).sort((a, b) => a - b);
ok(cls.every((c, i) => c === i), 'cls değerleri 0…16 olmalı: ' + cls);
const famIds = new Set(D.FAMS.map(f => f.id));
D.SCRIPTS.forEach(s => {
  ['id', 'tr', 'nat', 'lang', 'fam', 'langs', 'gist', 'dig', 'hint'].forEach(k => ok(typeof s[k] === 'string' && s[k], s.id + ' alan eksik: ' + k));
  ok(famIds.has(s.fam), s.id + ' aile yok: ' + s.fam);
  ok(Array.isArray(s.tells) && s.tells.length >= 3, s.id + ' en az 3 ayırt edici özellik olmalı');
  ok(Array.isArray(s.words) && s.words.length >= 3 && s.words.every(w => w.length === 3 && w.every(x => typeof x === 'string' && x)), s.id + ' sözcükler biçimsiz');
  ok(Array.isArray(s.conf), s.id + ' conf yok');
  s.conf.forEach(c => { ok(sIds.has(c) && c !== s.id, s.id + ' conf geçersiz: ' + c); ok(D.pairTell(s.id, c), s.id + ' ↔ ' + c + ' için PAIRS ayrımı yok'); });
  ok(new Set(s.conf).size === s.conf.length, s.id + ' conf tekrarlı');
  ok(Array.from(s.dig).length === 10, s.id + ' rakam dizisi 10 karakter olmalı: ' + Array.from(s.dig).length);
  if (!s.noquiz) ok(s.conf.length >= 2, s.id + ' en az 2 karışan yazı olmalı (şık üretimi)');
});
const asm = D.sById.asm;
ok(asm.words.filter(w => /[ৰৱ]/.test(w[0])).length >= 2, 'Assam için ৰ/ৱ içeren en az 2 sözcük gerekli');
D.sById.beng.words.forEach(w => ok(!/[ৰৱ]/.test(w[0]), 'Bengali sözcükte Assam harfi var: ' + w[0]));
Object.keys(D.PAIRS).forEach(k => { const [a, b] = k.split('|'); ok(sIds.has(a) && sIds.has(b) && a < b, 'PAIRS anahtarı geçersiz: ' + k); });

/* ---- yerler ---- */
ok(D.PLACES.length === 42, 'yer sayısı 42 değil: ' + D.PLACES.length);
const pIds = new Set(D.PLACES.map(p => p.id));
ok(pIds.size === D.PLACES.length, 'yer kimlikleri tekrarlı');
const kinds = { state: 0, ut: 0, nation: 0 };
D.PLACES.forEach(p => {
  kinds[p.kind]++;
  ok(['state', 'ut', 'nation'].includes(p.kind), p.id + ' tür geçersiz');
  ok(p.main.length >= 1 && p.main.every(s => sIds.has(s)), p.id + ' main geçersiz');
  ok(p.also.every(s => sIds.has(s) && !p.main.includes(s)), p.id + ' also geçersiz ya da main ile çakışıyor');
  ok(D.ZONES[p.zone], p.id + ' bölge yok: ' + p.zone);
  ['en', 'short', 'cap', 'lang', 'note'].forEach(k => ok(p[k], p.id + ' alan eksik: ' + k));
  const n = D.NATIVE[p.id];
  ok(n && n.length === 3 && n.every(Boolean), p.id + ' yerel ad yok');
  if (n) ok(n[0] === p.main[0], p.id + ' yerel ad yazısı (' + n[0] + ') main[0] (' + p.main[0] + ') ile aynı olmalı');
});
ok(kinds.state === 28 && kinds.ut === 8 && kinds.nation === 6, 'tür dağılımı 28/8/6 olmalı: ' + JSON.stringify(kinds));
D.SCRIPTS.forEach(s => {
  const n = D.statesOf(s.id, true).length;
  if (!s.noquiz && s.id !== 'olck') ok(n >= 1, s.id + ' için baskın olduğu yer yok');
});

/* ---- geometri eşleşmesi ---- */
const gIds = Object.keys(G.p);
ok(gIds.length === 42, 'geometri sayısı 42 değil');
gIds.forEach(i => ok(pIds.has(i), 'geometride bilinmeyen yer: ' + i));
D.PLACES.forEach(p => {
  const f = G.p[p.id];
  ok(f && f.d && f.lp && f.lp.length === 3 && f.bb && f.bb.length === 4 && typeof f.ar === 'number', p.id + ' geometri eksik');
  ok(f && Array.isArray(f.nb), p.id + ' komşu listesi yok');
  if (f) f.nb.forEach(x => ok(pIds.has(x) && G.p[x].nb.includes(p.id), p.id + ' komşuluğu simetrik değil: ' + x));
});
['in', 'rg', 'mc', 'co'].forEach(k => ok(G.m[k] && G.m[k].length > 500, 'mesh eksik: ' + k));
ok(G.fit && G.fit.length === 4 && G.fit[0] >= G.bbox[0] && G.fit[2] <= G.bbox[2], 'fit kutusu geçersiz');
const mainBorders = [['karnataka', 'telangana'], ['karnataka', 'tamil-nadu'], ['west-bengal', 'bangladesh'], ['odisha', 'andhra-pradesh'], ['punjab', 'pakistan']];
mainBorders.forEach(([a, b]) => ok(G.p[a].nb.includes(b), a + ' ↔ ' + b + ' komşu olmalı'));

/* ---- Rosetta ---- */
D.ROSETTA.cols.forEach(c => ok(sIds.has(c), 'Rosetta sütunu geçersiz: ' + c));
D.ROSETTA.rows.forEach(r => ok(r.length === D.ROSETTA.cols.length + 1 && r.every(Boolean), 'Rosetta satırı eksik: ' + r[0]));
/* ---- karar akışı ---- */
D.FLOW.forEach(f => ok(f.t && f.b && f.go.every(x => sIds.has(x)), 'FLOW adımı geçersiz: ' + f.t));
D.TIPS.forEach(t => ok(t.t && t.b, 'TIPS satırı eksik'));

/* ---- Hindistan yazı özeti ---- */
const byScript = {};
D.PLACES.forEach(p => { byScript[p.main[0]] = (byScript[p.main[0]] || 0) + 1; });
console.log('main[0] dağılımı:', JSON.stringify(byScript));
console.log(fails ? `${fails} HATA` : `tamam: ${D.SCRIPTS.length} yazı, ${D.PLACES.length} yer, ${Object.keys(D.PAIRS).length} çift, ${gIds.length} şekil`);
process.exit(fails ? 1 : 0);

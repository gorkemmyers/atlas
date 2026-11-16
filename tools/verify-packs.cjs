/* verify-packs.cjs — js/packs/*.js ülke paketlerini denetler (şema v2).
   Çalıştır:  node tools/verify-packs.cjs
   Motor, geçersiz kimlikleri sessizce atar; bu betik atmak yerine HATA verir ki yazım hatası görünür olsun.
   Çıkış kodu 0 = temiz, 1 = hata var. Kurallar: KURALLAR.md */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const sandbox = { console };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const captured = [];
sandbox.registerCountryPack = (p) => captured.push(p);
vm.createContext(sandbox);

function run(rel) { vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel }); }

/* yalnızca index.html'in yüklediği geo ve paket dosyaları */
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="(js\/[^"]+)"><\/script>/g)].map((m) => m[1]);
scripts.filter((s) => /^js\/geo-/.test(s)).forEach(run);
run('js/photos.js');
scripts.filter((s) => /^js\/(figures\.js|figs-[^/]+\.js)$/.test(s)).forEach(run);   /* özgün çizimler: js/figures.js + js/figs-<ülke>.js (photos.js'ten sonra) */
const packFiles = scripts.filter((s) => /^js\/packs\//.test(s));
packFiles.forEach(run);

let errors = 0, warns = 0;
const err = (p, m) => { errors++; console.log('HATA  [' + p + '] ' + m); };
const warn = (p, m) => { warns++; console.log('uyarı [' + p + '] ' + m); };

const REQ = ['id', 'name', 'code', 'area', 'geoVar', 'themeId', 'srsPrefix', 'regions', 'units', 'topics', 'unitLabel', 'codeLabel', 'line', 'blurb'];
const BAD_TEXT = /\bundefined\b|\bNaN\b|\[object |\bTODO\b|\bFIXME\b|lorem ipsum|\bnull\b/;

captured.forEach((pk) => {
  const P = pk.id || '?';
  REQ.forEach((k) => { if (pk[k] == null || pk[k] === '' || (Array.isArray(pk[k]) && !pk[k].length)) err(P, 'zorunlu alan eksik: ' + k); });
  const geo = sandbox[pk.geoVar];
  if (!geo || !geo.p) { err(P, 'geo yok: ' + pk.geoVar); return; }

  const regIds = new Set(), unitIds = new Set();
  (pk.regions || []).forEach((r) => {
    if (regIds.has(r.id)) err(P, 'tekrarlı bölge: ' + r.id);
    regIds.add(r.id);
    if (!r.tr || !r.key) err(P, 'bölgede tr/key boş: ' + r.id);
    if (!(r.color >= 0 && r.color < 12)) err(P, 'bölge rengi 0-11 olmalı: ' + r.id);
  });
  (pk.units || []).forEach((u) => {
    if (unitIds.has(u.id)) err(P, 'tekrarlı birim: ' + u.id);
    unitIds.add(u.id);
    if (!regIds.has(u.reg)) err(P, 'birimin bölgesi yok: ' + u.id + ' → ' + u.reg);
    if (!geo.p[u.id]) err(P, 'birim geo’da yok: ' + u.id);
    ['name', 'short', 'cap'].forEach((k) => { if (!u[k]) err(P, 'birimde ' + k + ' boş: ' + u.id); });
    if (u.codes && !(Array.isArray(u.codes) && u.codes.every((c) => typeof c === 'string' && c))) err(P, 'codes dizisi bozuk: ' + u.id);
  });
  Object.keys(geo.p).forEach((id) => { if (!unitIds.has(id)) warn(P, 'geo’da olup pakette olmayan birim: ' + id); });

  /* her yerde ids/main dizileri gerçek birim kimliği olmalı */
  const seen = new Set();
  (function walk(o, trail) {
    if (o == null || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach((x, i) => walk(x, trail + '[' + i + ']')); return; }
    for (const k of Object.keys(o)) {
      const v = o[k];
      if ((k === 'ids' || k === 'main') && Array.isArray(v)) {
        v.forEach((id) => { if (typeof id !== 'string' || !unitIds.has(id)) err(P, trail + '.' + k + ' içinde geçersiz kimlik: ' + id); else seen.add(id); });
        if (!v.length && k === 'ids') warn(P, trail + '.ids boş');
      } else if (typeof v === 'string') {
        if (BAD_TEXT.test(v)) err(P, trail + '.' + k + ' şüpheli metin: ' + v.slice(0, 60));
        if (/\s{2,}/.test(v.replace(/\n/g, ' '))) warn(P, trail + '.' + k + ' çift boşluk');
      } else walk(v, trail + '.' + k);
    }
  })(pk, 'pk');
  unitIds.forEach((id) => { if (!seen.has(id)) warn(P, 'hiçbir konuda/kartta geçmeyen birim: ' + id); });

  /* konular */
  const keys = new Set();
  if ((pk.topics || []).length > (pk.id === 'turkiye' ? 4 : 3)) warn(P, 'en fazla 3 konu olmalı (KURALLAR.md §1 kural 1; Türkiye istisna: 4): ' + pk.topics.length + ' konu var');
  (pk.topics || []).forEach((t) => {
    if (keys.has(t.key)) err(P, 'tekrarlı konu: ' + t.key);
    keys.add(t.key);
    ['key', 'navLabel', 'title', 'lead', 'desc'].forEach((k) => { if (!t[k]) err(P, 'konu ' + t.key + ': ' + k + ' boş'); });
    const d = t.decoder;
    if (d) {
      if (!d.entries || !d.entries.length) err(P, 'konu ' + t.key + ': çözücü girdisi yok');
      const ek = new Set();
      (d.entries || []).forEach((e) => {
        if (!e.key || !e.label) err(P, 'konu ' + t.key + ': girdi key/label boş');
        if (!e.ids || !e.ids.length) err(P, 'konu ' + t.key + ': girdi ' + e.key + ' için ids boş');
        if (ek.has(e.key)) warn(P, 'konu ' + t.key + ': tekrarlı girdi anahtarı ' + e.key);
        ek.add(e.key);
      });
    }
    (t.rules || []).forEach((r) => (r.traps || []).forEach((tr) => {
      if (!Array.isArray(tr) || tr.length !== 2 || !tr[0] || !tr[1]) err(P, 'konu ' + t.key + ': tuzak [sol,sağ] biçiminde değil');
    }));
    /* fotoğraflar */
    (t.visuals || []).forEach((v) => {
      const set = sandbox.PHOTO_SETS[v.set];
      if (!set || !set.length) { err(P, 'konu ' + t.key + ': fotoğraf kümesi yok: ' + v.set); return; }
      set.forEach((k) => { if (!sandbox.PHOTOS[k]) err(P, 'küme ' + v.set + ': fotoğraf tanımsız: ' + k); });
      if (!v.ids || !v.ids.length) err(P, 'kart ' + v.id + ': ids boş (fotoğraf sorusunun cevabı)');
      if (!v.title) err(P, 'kart ' + v.id + ': title boş');
      /* çizim kartları soru olmaz: cevabı olan bir fotoğraf değil, öğretici şemadır (KURALLAR.md §9b) */
      if (set.every((k) => sandbox.PHOTOS[k] && sandbox.PHOTOS[k].svg) && v.quiz !== false) warn(P, 'kart ' + v.id + ': çizim kümesi; quiz:false yaz (KURALLAR.md §9b)');
    });
  });
});

/* fotoğraf defteri */
/* özgün çizim (svg) girdisi: biçim, rozet–açıklama eşleşmesi */
function checkFig(k, p) {
  const svg = String(p.svg);
  if (!/^<svg [^>]*viewBox="0 0 \d+ \d+"/.test(svg) || !/<\/svg>$/.test(svg)) err('photos', k + ': svg biçimi bozuk');
  if (/undefined|NaN|\[object/.test(svg)) err('photos', k + ': svg içinde undefined/NaN/[object var');
  if (!Array.isArray(p.d) || p.d.length !== 2 || !(p.d[0] > 0 && p.d[1] > 0)) err('photos', k + ': çizimde d=[genişlik,yükseklik] şart');
  else if (!new RegExp('viewBox="0 0 ' + p.d[0] + ' ' + p.d[1] + '"').test(svg)) err('photos', k + ': d ile svg viewBox aynı değil');
  if (!p.cap) err('photos', k + ': açıklama (cap) boş');
  const nums = [...svg.matchAll(/font-size="15" font-weight="800" text-anchor="middle" fill="#111"[^>]*>(\d+)<\/text>/g)].map((m) => +m[1]);
  const lg = p.legend || [];
  if (nums.length !== lg.length) err('photos', k + ': ' + nums.length + ' rozet var, legend ' + lg.length + ' madde');
  else if (nums.some((n, i) => n !== nums.slice().sort((a, b) => a - b)[i] || nums.indexOf(i + 1) < 0)) err('photos', k + ': rozet numaraları 1…n değil');
  lg.forEach((t, i) => { if (typeof t !== 'string' || t.length < 12) err('photos', k + ': legend[' + i + '] çok kısa'); if (BAD_TEXT.test(t)) err('photos', k + ': legend[' + i + '] kötü metin'); });
  if (!p.by || !p.lic) err('photos', k + ': çizimde by/lic boş');
}
Object.keys(sandbox.PHOTOS || {}).forEach((k) => {
  const p = sandbox.PHOTOS[k];
  if (p.svg) { checkFig(k, p); return; }
  if (!p.f || !/\.(jpe?g|png|webp|gif|svg)$/i.test(p.f)) err('photos', k + ': dosya adı bozuk');
  if (!p.cap) err('photos', k + ': açıklama (cap) boş');
  if (!['goz', 'aciklama', 'bekliyor'].includes(p.v)) err('photos', k + ': v değeri geçersiz: ' + p.v);
});
Object.keys(sandbox.PHOTO_SETS || {}).forEach((s) => (sandbox.PHOTO_SETS[s] || []).forEach((k) => { if (!sandbox.PHOTOS[k]) err('photos', 'küme ' + s + ' tanımsız fotoğraf içeriyor: ' + k); }));

/* yazar/lisans yedek değerde mi, gözle doğrulandı mı, her fotoğraf bir kümede mi? */
const inSet = new Set();
Object.keys(sandbox.PHOTO_SETS || {}).forEach((s) => (sandbox.PHOTO_SETS[s] || []).forEach((k) => inSet.add(k)));
Object.keys(sandbox.PHOTOS || {}).forEach((k) => {
  const p = sandbox.PHOTOS[k];
  if (p.svg) { if (!inSet.has(k)) warn('photos', k + ': hiçbir kümede yok'); return; }
  if (!p.by || p.by === 'Wikimedia Commons katkıcısı') warn('photos', k + ': yazar bilinmiyor (Commons dosya sayfasından okuyup yaz)');
  if (!p.lic || /^Serbest lisans/.test(p.lic)) warn('photos', k + ': lisans bilinmiyor (Commons dosya sayfasından okuyup yaz)');
  if (p.v !== 'goz') warn('photos', k + ': gözle doğrulanmadı (v=' + p.v + ')');
  /* görünüm alanları: d / crop / marks */
  const okFrac = (n) => typeof n === 'number' && n >= 0 && n <= 1;
  if ((p.crop || (p.marks && p.marks.length)) && !(Array.isArray(p.d) && p.d.length === 2 && p.d[0] > 0 && p.d[1] > 0)) err('photos', k + ': crop/marks için d=[genişlik,yükseklik] şart');
  if (p.crop) {
    if (!Array.isArray(p.crop) || p.crop.length !== 4 || !p.crop.every(okFrac) || p.crop[2] <= 0 || p.crop[3] <= 0 || p.crop[0] + p.crop[2] > 1.0001 || p.crop[1] + p.crop[3] > 1.0001) err('photos', k + ': crop [x,y,w,h] 0–1 aralığında ve görüntü içinde olmalı');
  }
  (p.marks || []).forEach((m, i) => {
    if (!Array.isArray(m) || m.length < 4 || !m.slice(0, 4).every(okFrac)) { err('photos', k + ': marks[' + i + '] 0–1 oranlarında [x,y,w,h,açıklama] olmalı'); return; }
    if (!m[4] || String(m[4]).length < 8) err('photos', k + ': marks[' + i + '] açıklaması (5. eleman) boş: kutu neyi gösteriyor?');
    const c = p.crop || [0, 0, 1, 1];
    if (m[0] < c[0] - 1e-6 || m[1] < c[1] - 1e-6 || m[0] + m[2] > c[0] + c[2] + 1e-6 || m[1] + m[3] > c[1] + c[3] + 1e-6) err('photos', k + ': marks[' + i + '] kırpma alanının dışına taşıyor (görünmez olur)');
    /* sol kenara <%8 yakın kutularda kit.js rozeti kutunun içine koyar (pc-mark-in); uyarı gerekmez */
  });
  if (!inSet.has(k)) warn('photos', k + ': hiçbir kümede yok');
});

/* Güney Asya: 'as-<yazı>' kümesinin yazısı AS_DATA'da olmalı */
try {
  run('js/scripts-data.js');
  const ids = new Set(((sandbox.AS_DATA || {}).SCRIPTS || []).map((x) => x.id));
  Object.keys(sandbox.PHOTO_SETS || {}).filter((s) => /^as-/.test(s)).forEach((s) => {
    if (!ids.has(s.slice(3))) err('photos', 'küme ' + s + ': AS_DATA.SCRIPTS içinde ' + s.slice(3) + ' yok');
  });
} catch (e) { warn('photos', 'scripts-data.js yüklenemedi, as- kümeleri denetlenmedi: ' + e.message); }

console.log('\n' + captured.length + ' paket denetlendi: ' + captured.map((p) => p.id).join(', '));
console.log(errors ? errors + ' HATA, ' + warns + ' uyarı ✘' : 'Hata yok (' + warns + ' uyarı) ✔');
process.exit(errors ? 1 : 0);

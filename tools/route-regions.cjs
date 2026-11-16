/* route-regions.cjs — yol çizgilerinin hangi bölgelerden geçtiğini bulur ve paket verisindeki `ids` ile karşılaştırır.
   Kullanım: node tools/route-regions.cjs [paket=russia] [rotaDosyası=js/routes-russia.js]
   Çıktı: her yol için geçilen bölgeler (≈km) ve pakette olup geçilmeyen / geçilip pakette olmayan bölgeler.
   Uyarılar: yol bir bölgeden ≥ 12 km geçiyor ama pakette yok → "FAZLA GEÇİŞ (pakette yok)"; pakette olan bölgeden < 3 km geçiyor → "EKSİK (pakette var, yol geçmiyor)";
   bant ve çözücü girdisinin `ids` listeleri farklıysa → "BANT ≠ ÇÖZÜCÜ". Fark varsa çıkış kodu 1. Gerekçeli sapmalar aşağıdaki KNOWN listesinde durur. */
global.window = global;
const path = require('path'); const root = path.join(__dirname, '..');
const pack = process.argv[2] || 'russia';
const routeFile = process.argv[3] || 'js/routes-' + pack + '.js';
['data', 'geo', 'util', 'store', 'geom'].forEach(f => require(path.join(root, 'js', f + '.js')));
const GEO = { russia: ['geo-russia.js', 'RU_GEO'], turkiye: ['geo-turkiye.js', 'TR_GEO'] }[pack];
require(path.join(root, 'js', GEO[0]));
let PK; global.registerCountryPack = p => { PK = p; };
require(path.join(root, 'js', 'packs', pack + '.js'));
require(path.join(root, routeFile));
const RT = window[PK.topics.find(t => t.routesVar).routesVar];
const Gm = window.Geom.make(window[GEO[1]]);
const topic = PK.topics.find(t => t.routesVar);
const U = RT.u || 1000;
const names = Object.fromEntries(PK.units.map(u => [u.id, u.name]));
let bad = 0;
/* Bilinen ve gerekçesi belli sapmalar: poligon çözünürlüğü ya da veri boşluğunda düz çizilen kesit. Yeni bir ek yapmadan önce kaynakla doğrula. */
const KNOWN = {
  'D100': { '22': 'Edirne kesiti OSM’de eksik; Kınalı Kavşağı levhasında «D-100 … Edirne, Kapıkule» yazar (Commons fotoğrafı)' },
  'O-5': { '41': 'O-5 Gebze’den (Kocaeli) başlar; OSM çizgisi Kocaeli’ye çok az giriyor' },
  'М-12': { 'ru-me': 'Çuvaşistan–Mari El sınırı sadeleştirilmiş poligonda yolun kenarına denk gelir; resmî kaynaklar yalnız Çuvaşistan der' },
  'М-10': { 'ru-spe': 'Yol Sankt-Peterburg şehir sınırında biter; çizgi poligona yalnız birkaç km girer' },
  'А-181': { 'ru-spe': 'Yol şehir sınırının hemen dışından başlar (Vıborg yönü)' },
  'Р-254': { 'ru-tyu': 'Kurgan–Omsk arasındaki Kazakistan kesiti düz çizilir; çizgi Tümen Oblastı köşesine değer' }
};
function* pts(path) { let x = path[0] / U, y = path[1] / U; yield [x, y]; for (let i = 2; i < path.length; i += 2) { x += path[i] / U; y += path[i + 1] / U; yield [x, y]; } }
for (const [key, paths] of Object.entries(RT.r)) {
  const km = {}, where = {}; let total = 0, off = 0;
  paths.forEach(p => {
    let prev = null;
    for (const q of pts(p)) {
      if (prev) {
        const d = Gm.hav({ lon: prev[0], lat: prev[1] }, { lon: q[0], lat: q[1] });
        const n = Math.max(1, Math.ceil(d / 3));
        for (let s = 0; s < n; s++) {
          const lon = prev[0] + (q[0] - prev[0]) * (s + 0.5) / n, lat = prev[1] + (q[1] - prev[1]) * (s + 0.5) / n;
          const xy = Gm.toXY(lon, lat); const id = Gm.featureAt(xy.x, xy.y);
          const L = d / n; total += L;
          if (id) { km[id] = (km[id] || 0) + L; (where[id] = where[id] || []).push([lon, lat]); } else off += L;
        }
      }
      prev = q;
    }
  });
  if (process.env.SHOW) { const [rk, rid] = process.env.SHOW.split(':'); if (rk === key && where[rid]) { const w = where[rid]; console.log('   ' + rid + ' örnek: ilk', w[0].map(v => v.toFixed(2)), 'son', w[w.length - 1].map(v => v.toFixed(2)), 'adet', w.length); } }
  const entry = topic.decoder.entries.find(e => e.key === key);
  const want = new Set(entry ? entry.ids : []);
  const got = Object.entries(km).sort((a, b) => b[1] - a[1]);
  const known = KNOWN[key] || {};
  const extra = got.filter(([id, v]) => !want.has(id) && v >= 12 && !known[id]).map(([id, v]) => id + ' ' + names[id] + ' ' + Math.round(v));
  const bandRow = topic.bands && topic.bands.find(b => b.key === key);
  if (bandRow && [...bandRow.ids].sort().join() !== [...want].sort().join()) { bad++; console.log('   BANT ≠ ÇÖZÜCÜ: bant', bandRow.ids.join(','), '| çözücü', [...want].join(',')); }
  const missing = [...want].filter(id => (km[id] || 0) < 3 && !known[id]).map(id => id + ' ' + names[id] + ' ' + Math.round(km[id] || 0));
  console.log(key.padEnd(5), String(Math.round(total)).padStart(5) + ' km', '· dışarıda', Math.round(off), 'km ·', got.map(([id, v]) => id.replace('ru-', '') + ':' + Math.round(v)).join(' '));
  if (extra.length) { bad++; console.log('   FAZLA GEÇİŞ (pakette yok):', extra.join(' | ')); }
  if (missing.length) { bad++; console.log('   EKSİK (pakette var, yol geçmiyor):', missing.join(' | ')); }
}
console.log(bad ? bad + ' yolda fark var' : 'tüm yollar paketle uyumlu');
if (bad) process.exitCode = 1;

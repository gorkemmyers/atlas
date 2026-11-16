global.window = global;
const path = require('path'); const root = path.join(__dirname, '..');
['data','geo','util','store','geom'].forEach(f => require(path.join(root,'js',f+'.js')));
const Gm = window.Geom; let bad = 0;
const T = [
  ['Hà Nội', 105.85, 21.03, 'ha-noi'], ['TP.HCM', 106.70, 10.78, 'ho-chi-minh'], ['Đà Nẵng', 108.22, 16.06, 'da-nang'],
  ['Phú Quốc', 103.96, 10.22, 'kien-giang'], ['Huế', 107.59, 16.46, 'thua-thien-hue'], ['Đà Lạt', 108.44, 11.94, 'lam-dong'],
  ['Cần Thơ', 105.78, 10.03, 'can-tho'], ['Sa Pa', 103.84, 22.34, 'lao-cai'], ['Hạ Long', 107.08, 20.95, 'quang-ninh'],
  ['Nha Trang', 109.19, 12.24, 'khanh-hoa'], ['Hội An', 108.33, 15.88, 'quang-nam'], ['Buôn Ma Thuột', 108.04, 12.67, 'dak-lak'],
  ['Cà Mau', 105.15, 9.18, 'ca-mau'], ['Điện Biên Phủ', 103.02, 21.39, 'dien-bien'], ['Vinh', 105.69, 18.68, 'nghe-an'],
  ['Biển (Doğu Denizi)', 110.5, 15, null], ['Laos', 103.0, 18.0, null]
];
for (const [n, lon, lat, exp] of T) {
  const p = Gm.toXY(lon, lat); const got = Gm.featureAt(p.x, p.y);
  const ok = got === exp; if (!ok) bad++;
  console.log((ok ? '✔' : '✘'), n, '→', got, ok ? '' : '(beklenen ' + exp + ')');
}
// mesafe
const a = Gm.toLL(...Object.values(Gm.toXY(105.85, 21.03))), b = Gm.toLL(...Object.values(Gm.toXY(106.70, 10.78)));
console.log('HN–HCM km', Gm.hav(a, b).toFixed(0), '(beklenen ≈1140)');
const sea = Gm.toXY(109.0, 16.2); const d = Gm.distToFeature(sea.x, sea.y, 'da-nang'); console.log('deniz→Đà Nẵng km', d.km.toFixed(1), d.inside);
const inside = Gm.toXY(108.22, 16.06); console.log('içeride', Gm.distToFeature(inside.x, inside.y, 'da-nang'));
console.log('roundtrip', JSON.stringify(Gm.toLL(...Object.values(Gm.toXY(105.85, 21.03)))));
process.exit(bad ? 1 : 0);

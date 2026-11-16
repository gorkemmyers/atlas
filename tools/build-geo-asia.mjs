// Güney Asya sınır geometrisi (Alfabe bölümü): Natural Earth admin-1 → topoloji → sadeleştirme → Mercator → SVG yolları
//   Hindistan: 36 eyalet/birlik bölgesi ayrı ayrı. Komşular (Bangladeş, Nepal, Butan, Sri Lanka, Pakistan, Myanmar): tek parça.
//   Kullanım (topojson paketlerinin bulunduğu klasörden):
//     node build-geo-asia.mjs --admin1=<admin1.geojson> --root=<proje klasörü> --out=<geo-asia.js> [--tol=1.0] [--island=1.5]
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { topology } from 'topojson-server';
import { presimplify, simplify } from 'topojson-simplify';
import { feature, merge, mesh, neighbors } from 'topojson-client';
import { polylabel, polyArea } from './lib.mjs';

const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const ROOT = args.root || path.resolve(new URL('..', import.meta.url).pathname);
const SRC = args.admin1;
const OUT = args.out || path.join(ROOT, 'js/geo-asia.js');
const TOL_KM2 = parseFloat(args.tol || '1.0');          // Visvalingam üçgen alanı eşiği (km²)
const MIN_ISLAND = parseFloat(args.island || '1.5');    // genel küçük ada eşiği (km²)
const MIN_ISLAND_NBR = parseFloat(args.nisland || '4'); // komşu ülkeler için daha iri eşik

const require = createRequire(import.meta.url);
require(path.join(ROOT, 'js/scripts-data.js'));
const D = globalThis.AS_DATA;

/* ---------- 1) oku + eşle ---------- */
const NBR = { BGD: 'bangladesh', NPL: 'nepal', BTN: 'bhutan', LKA: 'sri-lanka', PAK: 'pakistan', MMR: 'myanmar' };
const IND_NAME = {
  'Dadra and Nagar Haveli and Daman and Diu': 'dnhdd',
  'Andaman and Nicobar': 'andaman-nicobar',
  'Jammu and Kashmir': 'jammu-kashmir'
};
const slug = n => n.toLowerCase().replace(/\s+/g, '-');
const gj = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const SCATTERED = { 'lakshadweep': 0.25, 'andaman-nicobar': 0.8, 'dnhdd': 0.3, 'puducherry': 0.2 }; // küçük parçaları korunacak yerler

const KMX = 111.32, KMY = 110.57;
function ringKm2(r) {
  let a = 0, lat = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) { a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); lat += r[i][1]; }
  return Math.abs(a / 2) * KMX * Math.cos((lat / r.length) * Math.PI / 180) * KMY;
}
function polyKm2(poly) { let a = ringKm2(poly[0]); for (let k = 1; k < poly.length; k++) a -= ringKm2(poly[k]); return a; }

let droppedIslands = 0, droppedHoles = 0;
const feats = [];
for (const f of gj.features) {
  const a3 = f.properties.adm0_a3;
  let id, cid;
  if (a3 === 'IND') { id = IND_NAME[f.properties.name] || slug(f.properties.name); cid = 'india'; }
  else if (NBR[a3]) { id = NBR[a3] + '/' + slug(f.properties.name); cid = NBR[a3]; }
  else continue;
  const polysRaw = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const polys = polysRaw.map(poly => poly.map(r => r.map(p => [p[0], p[1]])));
  const withArea = polys.map(p => ({ p, a: polyKm2(p) })).sort((x, y) => y.a - x.a);
  const thr = cid === 'india' ? (SCATTERED[id] ?? MIN_ISLAND) : MIN_ISLAND_NBR;
  const keep = withArea.filter((x, i) => i === 0 || x.a >= thr);
  droppedIslands += withArea.length - keep.length;
  const out = keep.map(x => {
    const rings = [x.p[0]];
    for (let k = 1; k < x.p.length; k++) { if (ringKm2(x.p[k]) >= thr) rings.push(x.p[k]); else droppedHoles++; }
    return rings;
  });
  feats.push({ type: 'Feature', id, properties: { id, cid, km2: out.reduce((s, p) => s + polyKm2(p), 0) }, geometry: { type: 'MultiPolygon', coordinates: out } });
}
const indIds = feats.filter(f => f.properties.cid === 'india').map(f => f.id);
const missing = D.PLACES.filter(p => p.kind !== 'nation' && !indIds.includes(p.id)).map(p => p.id);
const extra = indIds.filter(i => !D.pById[i]);
if (missing.length || extra.length) throw new Error('Hindistan kimlik uyuşmazlığı: eksik=' + missing + ' fazla=' + extra);
console.log(`okundu: Hindistan ${indIds.length}, komşu admin-1 ${feats.length - indIds.length}; ${droppedIslands} küçük ada, ${droppedHoles} küçük delik atıldı`);

/* ---------- 2) topoloji + sadeleştirme + komşu ülkeleri birleştir ---------- */
const Q = 1e6;
let topo = topology({ a: { type: 'FeatureCollection', features: feats } }, Q);
const countPts = t => t.arcs.reduce((s, x) => s + x.length, 0);
console.log(`topoloji: ${topo.arcs.length} yay, ${countPts(topo)} nokta (sadeleştirme öncesi)`);
topo = presimplify(topo);
const latMid = 22;
topo = simplify(topo, TOL_KM2 / (KMX * Math.cos(latMid * Math.PI / 180) * KMY));
topo.arcs = topo.arcs.map(a => a.map(p => [p[0], p[1]]));
console.log(`sadeleştirme (${TOL_KM2} km²): ${topo.arcs.length} yay, ${countPts(topo)} nokta`);

const obj = topo.objects.a, geoms = obj.geometries;
const final = []; // {id, cid, type:'MultiPolygon', coordinates (lon/lat), km2}
const km2By = {};
feats.forEach(f => { km2By[f.id] = f.properties.km2; });
for (const g of geoms) {
  if (g.properties.cid !== 'india') continue;
  const f = feature(topo, g);
  const mp = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  final.push({ id: g.id, cid: 'india', coordinates: mp, km2: km2By[g.id] });
}
for (const cid of Object.values(NBR)) {
  const gs = geoms.filter(g => g.properties.cid === cid);
  const mp = merge(topo, gs);
  const km2 = gs.reduce((s, g) => s + km2By[g.id], 0);
  final.push({ id: cid, cid, coordinates: mp.coordinates, km2 });
}
console.log('birleşik özellik sayısı', final.length, '(beklenen ' + D.PLACES.length + ')');
if (final.length !== D.PLACES.length) throw new Error('yer sayısı uyuşmuyor');
final.forEach(f => { if (!D.pById[f.id]) throw new Error('bilinmeyen kimlik ' + f.id); });

/* ---------- 3) ikinci topoloji (ağlar ve komşuluk için) ---------- */
const cleaned = final.map(f => ({ type: 'Feature', id: f.id, properties: { id: f.id, cid: f.cid, km2: f.km2 }, geometry: { type: 'MultiPolygon', coordinates: f.coordinates } }));
const topo2 = topology({ a: { type: 'FeatureCollection', features: cleaned } }, Q);
const obj2 = topo2.objects.a, geoms2 = obj2.geometries;
const feat2 = feature(topo2, obj2);
const idx = {}; geoms2.forEach((g, i) => { idx[g.id] = i; });

/* ---------- 4) projeksiyon ve yol dizeleri ---------- */
const K = 100, LON0 = 60.0;
const mercDeg = lat => (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const YTOP = mercDeg(37.4);
const proj = (lon, lat) => [(lon - LON0) * K, (YTOP - mercDeg(lat)) * K];
const q1 = v => Math.round(v * 10);
function fmtI(n) {
  const neg = n < 0; n = Math.abs(n);
  const ip = Math.floor(n / 10), fp = n % 10;
  return (neg ? '-' : '') + ip + (fp ? '.' + fp : '');
}
function ringD(ring, closed) {
  const pts = [];
  for (const p of ring) {
    const [x, y] = proj(p[0], p[1]);
    const xi = q1(x), yi = q1(y);
    const l = pts[pts.length - 1];
    if (!l || l[0] !== xi || l[1] !== yi) pts.push([xi, yi]);
  }
  if (closed && pts.length > 1 && pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) pts.pop();
  if (pts.length < (closed ? 3 : 2)) return '';
  let s = 'M' + fmtI(pts[0][0]) + ' ' + fmtI(pts[0][1]) + 'l';
  let px = pts[0][0], py = pts[0][1], first = true;
  for (let i = 1; i < pts.length; i++) {
    const dx = fmtI(pts[i][0] - px), dy = fmtI(pts[i][1] - py);
    px = pts[i][0]; py = pts[i][1];
    s += (first || dx[0] === '-' ? '' : ' ') + dx + (dy[0] === '-' ? '' : ' ') + dy;
    first = false;
  }
  return s + (closed ? 'z' : '');
}
const multiPolyD = coords => coords.map(poly => poly.map(r => ringD(r, true)).join('')).join('');
const multiLineD = lines => lines.map(l => ringD(l, false)).join('');

const projPoly = poly => poly.map(r => r.map(p => proj(p[0], p[1])));
function geomInfo(coords) {
  const pp = coords.map(projPoly);
  let best = null, bestA = -1;
  pp.forEach(poly => { const a = polyArea(poly); if (a > bestA) { bestA = a; best = poly; } });
  const lp = polylabel(best, 0.15);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, cx = 0, cy = 0, ca = 0;
  pp.forEach(poly => {
    poly[0].forEach(p => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    const r = poly[0]; let a = 0, gx = 0, gy = 0;
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const f = r[j][0] * r[i][1] - r[i][0] * r[j][1]; a += f; gx += (r[j][0] + r[i][0]) * f; gy += (r[j][1] + r[i][1]) * f; }
    if (a) { const A = a / 2; cx += (gx / (6 * A)) * Math.abs(A); cy += (gy / (6 * A)) * Math.abs(A); ca += Math.abs(A); }
  });
  const r1 = v => Math.round(v * 10) / 10;
  return { bb: [x0, y0, x1, y1].map(r1), lp: [r1(lp.x), r1(lp.y), r1(lp.d)], c: [r1(cx / ca), r1(cy / ca)] };
}

const P = {};
feat2.features.forEach(f => {
  const coords = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const info = geomInfo(coords);
  P[f.id] = { d: multiPolyD(coords), bb: info.bb, lp: info.lp, c: info.c, ar: Math.round(cleaned[idx[f.id]].properties.km2) };
});
const nbIdx = neighbors(geoms2);
nbIdx.forEach((arr, i) => { P[geoms2[i].id].nb = arr.map(j => geoms2[j].id).sort(); });

/* ---------- 5) sınır ağları ---------- */
const cidOf = id => cleaned[idx[id]].properties.cid;
const scriptOf = id => D.pById[id].main[0];
const M = {
  in: multiLineD(mesh(topo2, obj2, (a, b) => a !== b).coordinates),                                     // tüm iç sınırlar
  rg: multiLineD(mesh(topo2, obj2, (a, b) => a !== b && scriptOf(a.id) !== scriptOf(b.id)).coordinates), // yazı değişen sınırlar
  mc: multiLineD(mesh(topo2, obj2, (a, b) => a !== b && cidOf(a.id) !== cidOf(b.id)).coordinates),       // ülke sınırları
  co: multiLineD(mesh(topo2, obj2, (a, b) => a === b).coordinates)                                      // kıyı / dış çizgi
};

/* ---------- 6) genel sınırlar ve varsayılan kadraj ---------- */
const bboxOf = ids => {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  ids.forEach(i => { const b = P[i].bb; x0 = Math.min(x0, b[0]); y0 = Math.min(y0, b[1]); x1 = Math.max(x1, b[2]); y1 = Math.max(y1, b[3]); });
  return [x0, y0, x1, y1].map(v => Math.round(v * 10) / 10);
};
const allIds = Object.keys(P);
const FIT_IDS = [...indIds, 'bangladesh', 'nepal', 'bhutan', 'sri-lanka'].filter(i => i !== 'ladakh' && i !== 'jammu-kashmir');
// Ladakh ve Keşmir kuzeye çok uzandığı için kadrajı onlara göre değil, ana kütleye göre kur; uçları yine de görünür kalsın
const fit = bboxOf(FIT_IDS);
const lk = bboxOf(['ladakh', 'jammu-kashmir']);
fit[1] = Math.min(fit[1], lk[1] + (lk[3] - lk[1]) * 0.15);
const GEO = { v: 1, K, lon0: LON0, yTop: YTOP, bbox: bboxOf(allIds), fit, p: P, m: M };
const js = '/* Otomatik üretildi (tools/build-geo-asia.mjs) — sınır verisi: Natural Earth (kamu malı), sadeleştirilmiş. */\nwindow.AS_GEO=' + JSON.stringify(GEO) + ';\n';
fs.writeFileSync(OUT, js);

/* ---------- 7) rapor ---------- */
const sizes = { p: Object.values(P).reduce((a, p) => a + p.d.length, 0), m: Object.fromEntries(Object.entries(M).map(([k, v]) => [k, v.length])) };
console.log('çıktı', OUT, (js.length / 1024).toFixed(0) + ' KB', 'yol uzunlukları', JSON.stringify(sizes), 'bbox', GEO.bbox, 'fit', GEO.fit);
const checks = [
  ['west-bengal', 'bangladesh'], ['assam', 'bangladesh'], ['meghalaya', 'bangladesh'], ['tripura', 'bangladesh'], ['mizoram', 'bangladesh'],
  ['sikkim', 'nepal'], ['uttar-pradesh', 'nepal'], ['bihar', 'nepal'], ['west-bengal', 'bhutan'], ['assam', 'bhutan'], ['arunachal-pradesh', 'bhutan'],
  ['punjab', 'pakistan'], ['rajasthan', 'pakistan'], ['gujarat', 'pakistan'], ['jammu-kashmir', 'pakistan'], ['mizoram', 'myanmar'], ['manipur', 'myanmar'],
  ['nagaland', 'myanmar'], ['arunachal-pradesh', 'myanmar'], ['delhi', 'haryana'], ['chandigarh', 'punjab'], ['chandigarh', 'haryana'], ['goa', 'karnataka'],
  ['telangana', 'andhra-pradesh'], ['puducherry', 'tamil-nadu'], ['ladakh', 'jammu-kashmir'], ['ladakh', 'himachal-pradesh']
];
const bad = checks.filter(([a, b]) => !P[a].nb.includes(b));
console.log('komşuluk kontrolü:', bad.length ? 'EKSİK ' + JSON.stringify(bad) : 'tamam (' + checks.length + ')');
const isolated = allIds.filter(i => !P[i].nb.length);
console.log('komşusuz yerler:', isolated.join(', ') || '—');
const ptsOf = id => (P[id].d.match(/[-\d.]+/g) || []).length / 2;
const top = allIds.map(i => [i, Math.round(ptsOf(i)), P[i].ar]).sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log('en ağır şekiller (id, nokta, km²):', JSON.stringify(top));
console.log('küçük alanlar:', allIds.filter(i => P[i].ar < 7000).map(i => `${i}=${P[i].ar}`).join(' '));

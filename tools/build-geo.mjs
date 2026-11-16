// Sınır geometrisi üretimi: GeoJSON → topoloji → sadeleştirme → Mercator → SVG yol dizeleri
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { topology } from 'topojson-server';
import { presimplify, simplify } from 'topojson-simplify';
import { feature, mesh, neighbors } from 'topojson-client';
import { polylabel, polyArea, slug } from './lib.mjs';

const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const S = args.scratch;
const TOL_KM2 = parseFloat(args.tol || '0.12');       // Visvalingam üçgen alanı eşiği (km²)
const MIN_ISLAND_KM2 = parseFloat(args.island || '1.2');
const OUT = args.out || `${S}/out/geo.js`;

const require = createRequire(import.meta.url);
require(fileURLToPath(new URL('../js/data.js', import.meta.url)));
const D = globalThis.VN_DATA;

/* ---------- 1) oku + temizle ---------- */
const gj = JSON.parse(fs.readFileSync(`${S}/data/pre2025_combine.geojson`, 'utf8'));
const feats = gj.features.filter(f => !f.properties.Note);
const KMX = 111.32, KMY = 110.57;
function ringKm2(r) { // lon/lat halka alanı (km²), işaretsiz
  let a = 0, lat = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) { a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); lat += r[i][1]; }
  const cos = Math.cos((lat / r.length) * Math.PI / 180);
  return Math.abs(a / 2) * KMX * cos * KMY;
}
function polyKm2(poly) { let a = ringKm2(poly[0]); for (let k = 1; k < poly.length; k++) a -= ringKm2(poly[k]); return a; }

let droppedIslands = 0, droppedHoles = 0;
const cleaned = feats.map(f => {
  const id = slug(f.properties.Name);
  const polys = f.geometry.coordinates.map(poly => poly.map(r => r.map(p => [p[0], p[1]])));
  const withArea = polys.map(p => ({ p, a: polyKm2(p) })).sort((x, y) => y.a - x.a);
  const keep = withArea.filter((x, i) => i === 0 || x.a >= MIN_ISLAND_KM2);
  droppedIslands += withArea.length - keep.length;
  const out = keep.map(x => {
    const rings = [x.p[0]];
    for (let k = 1; k < x.p.length; k++) { if (ringKm2(x.p[k]) >= MIN_ISLAND_KM2) rings.push(x.p[k]); else droppedHoles++; }
    return rings;
  });
  const total = out.reduce((a, p) => a + polyKm2(p), 0);
  return { type: 'Feature', id, properties: { id, km2: total }, geometry: { type: 'MultiPolygon', coordinates: out } };
});
console.log(`temizlik: ${feats.length} il, ${droppedIslands} küçük ada ve ${droppedHoles} küçük delik atıldı`);
const ids = cleaned.map(f => f.id);
if (new Set(ids).size !== 63 || ids.some(i => !D.pById[i])) throw new Error('kimlik uyuşmazlığı');

/* ---------- 2) topoloji + sadeleştirme ---------- */
const Q = 1e6;
let topo = topology({ provs: { type: 'FeatureCollection', features: cleaned } }, Q);
const [sx, sy] = topo.transform.scale;
const kmPerUnit2 = sx * sy * KMX * Math.cos(16 * Math.PI / 180) * KMY;
const countPts = t => t.arcs.reduce((a, x) => a + x.length, 0);
console.log(`topoloji: ${topo.arcs.length} yay, ${countPts(topo)} nokta (sadeleştirme öncesi)`);
topo = presimplify(topo);
topo = simplify(topo, TOL_KM2 / (KMX * Math.cos(16 * Math.PI / 180) * KMY)); // presimplify ağırlıkları derece² cinsindendir
// presimplify üçüncü bileşen ekler; temizle
topo.arcs = topo.arcs.map(a => a.map(p => [p[0], p[1]]));
console.log(`sadeleştirme (${TOL_KM2} km²): ${topo.arcs.length} yay, ${countPts(topo)} nokta`);

const provObj = topo.objects.provs;
const geoms = provObj.geometries;
const idx = {}; geoms.forEach((g, i) => idx[g.id] = i);

/* ---------- 3) projeksiyon ---------- */
const K = 100, LON0 = 102.0;
const mercDeg = lat => (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const YTOP = mercDeg(23.5);
const proj = (lon, lat) => [(lon - LON0) * K, (YTOP - mercDeg(lat)) * K];
const q1 = v => Math.round(v * 10); // 0.1 birim hassasiyet (tamsayı onda biri)

function fmtI(n) { // n: onda-bir birim tamsayı
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
function multiPolyD(coords) { return coords.map(poly => poly.map(r => ringD(r, true)).join('')).join(''); }
function multiLineD(lines) { return lines.map(l => ringD(l, false)).join(''); }

/* ---------- 4) il başına çıktı ---------- */
const feat = feature(topo, provObj);
const projPoly = poly => poly.map(r => r.map(p => proj(p[0], p[1])));
function geomInfo(multi) {
  const polys = multi.coordinates;
  let best = null, bestA = -1;
  const pp = polys.map(projPoly);
  pp.forEach(poly => { const a = polyArea(poly); if (a > bestA) { bestA = a; best = poly; } });
  const lp = polylabel(best, 0.15);
  // bbox + ağırlık merkezi
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
feat.features.forEach(f => {
  const id = f.id;
  const g = f.geometry.type === 'Polygon' ? { type: 'MultiPolygon', coordinates: [f.geometry.coordinates] } : f.geometry;
  const info = geomInfo(g);
  P[id] = { d: multiPolyD(g.coordinates), bb: info.bb, lp: info.lp, c: info.c, ar: Math.round(cleaned[idx[id]].properties.km2) };
});
const nbIdx = neighbors(geoms);
nbIdx.forEach((arr, i) => { P[geoms[i].id].nb = arr.map(j => geoms[j].id).sort(); });

/* ---------- 5) sınır ağları ---------- */
const regionOf = id => D.pById[id].region, macroOf = id => D.pById[id].macro;
const M = {
  in: multiLineD(mesh(topo, provObj, (a, b) => a !== b).coordinates),
  rg: multiLineD(mesh(topo, provObj, (a, b) => a !== b && regionOf(a.id) !== regionOf(b.id)).coordinates),
  mc: multiLineD(mesh(topo, provObj, (a, b) => a !== b && macroOf(a.id) !== macroOf(b.id)).coordinates),
  co: multiLineD(mesh(topo, provObj, (a, b) => a === b).coordinates)
};

/* ---------- 6) genel sınırlar ---------- */
let bx0 = 1e9, by0 = 1e9, bx1 = -1e9, by1 = -1e9;
Object.values(P).forEach(p => { bx0 = Math.min(bx0, p.bb[0]); by0 = Math.min(by0, p.bb[1]); bx1 = Math.max(bx1, p.bb[2]); by1 = Math.max(by1, p.bb[3]); });
const GEO = { v: 1, K, lon0: LON0, yTop: YTOP, bbox: [bx0, by0, bx1, by1].map(v => Math.round(v * 10) / 10), p: P, m: M };
const js = '/* Otomatik üretildi (tools/build-geo.mjs) — sınır verisi: Free-GIS-Data (nguyenduy1133), sadeleştirilmiş. */\nwindow.VN_GEO=' + JSON.stringify(GEO) + ';\n';
fs.writeFileSync(OUT, js);
const sizes = { p: Object.values(P).reduce((a, p) => a + p.d.length, 0), m: Object.values(M).reduce((a, s) => a + s.length, 0) };
console.log('çıktı', OUT, (js.length / 1024).toFixed(0) + ' KB', 'yol uzunlukları', sizes, 'bbox', GEO.bbox);

// QA: lon/lat sadeleştirilmiş geometriyi kaydet
fs.writeFileSync(`${S}/out/qa_old.json`, JSON.stringify({ features: feat.features.map(f => ({ id: f.id, g: f.geometry })) }));

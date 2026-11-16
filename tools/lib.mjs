// Ortak yardımcılar: projeksiyon, nokta-poligon testi, alan, polylabel
export const K = 54000; // dünya genişliği (birim); 1 birim = 360/54000 = 0.00667° boylam

export function toWorld(lon, lat) {
  const x = (lon + 180) / 360;
  const s = Math.sin((lat * Math.PI) / 180);
  const y = 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
  return [x, y];
}

export function pipRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function pipPoly(x, y, poly) {
  if (!pipRing(x, y, poly[0])) return false;
  for (let k = 1; k < poly.length; k++) if (pipRing(x, y, poly[k])) return false;
  return true;
}

export function pipMulti(x, y, mp) {
  for (const p of mp) if (pipPoly(x, y, p)) return true;
  return false;
}

export function ringArea(ring) {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    a += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return a / 2; // işaret: yönelime bağlı
}

export function polyArea(poly) {
  let a = Math.abs(ringArea(poly[0]));
  for (let k = 1; k < poly.length; k++) a -= Math.abs(ringArea(poly[k]));
  return a;
}

function segDistSq(px, py, a, b) {
  let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) { x = b[0]; y = b[1]; } else if (t > 0) { x += dx * t; y += dy * t; }
  }
  dx = px - x; dy = py - y;
  return dx * dx + dy * dy;
}

export function distToMulti(x, y, mp) {
  let best = Infinity;
  for (const poly of mp) for (const ring of poly) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const d = segDistSq(x, y, ring[i], ring[j]);
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best);
}

function signedDist(x, y, poly) {
  let inside = false, min = Infinity;
  for (const ring of poly) {
    for (let i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
      const a = ring[i], b = ring[j];
      if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) inside = !inside;
      const d = segDistSq(x, y, a, b);
      if (d < min) min = d;
    }
  }
  return (inside ? 1 : -1) * Math.sqrt(min);
}

// Mapbox polylabel (basit sürüm: öncelik kuyruğu yerine sıralı dizi)
export function polylabel(poly, precision = 0.5) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of poly[0]) {
    if (p[0] < minX) minX = p[0]; if (p[1] < minY) minY = p[1];
    if (p[0] > maxX) maxX = p[0]; if (p[1] > maxY) maxY = p[1];
  }
  const w = maxX - minX, h = maxY - minY;
  const cell = Math.min(w, h);
  let half = cell / 2;
  if (cell === 0) return { x: minX, y: minY, d: 0 };
  const mk = (x, y, hh) => { const d = signedDist(x, y, poly); return { x, y, h: hh, d, max: d + hh * Math.SQRT2 }; };
  const q = [];
  for (let x = minX; x < maxX; x += cell) for (let y = minY; y < maxY; y += cell) q.push(mk(x + half, y + half, half));
  // ağırlık merkezi ile başla
  let best = mk(minX + w / 2, minY + h / 2, 0);
  {
    let cx = 0, cy = 0, ar = 0; const r = poly[0];
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const f = r[i][0] * r[j][1] - r[j][0] * r[i][1];
      cx += (r[i][0] + r[j][0]) * f; cy += (r[i][1] + r[j][1]) * f; ar += f * 3;
    }
    if (ar !== 0) { const c = mk(cx / ar, cy / ar, 0); if (c.d > best.d) best = c; }
  }
  while (q.length) {
    let bi = 0;
    for (let i = 1; i < q.length; i++) if (q[i].max > q[bi].max) bi = i;
    const c = q.splice(bi, 1)[0];
    if (c.d > best.d) best = c;
    if (c.max - best.d <= precision) continue;
    half = c.h / 2;
    q.push(mk(c.x - half, c.y - half, half), mk(c.x + half, c.y - half, half),
           mk(c.x - half, c.y + half, half), mk(c.x + half, c.y + half, half));
  }
  return { x: best.x, y: best.y, d: best.d };
}

export const slug = (n) => n
  .replace(/ city$/i, '')
  .replace(/\s+-\s+/g, '-')
  .trim().toLowerCase().replace(/\s+/g, '-');

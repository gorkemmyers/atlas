/* geom.js — izdüşüm, çokgen testleri ve mesafe (km) */
(function (g) {
  'use strict';
  var RAD = Math.PI / 180;

  function merc(lat) { return Math.log(Math.tan(Math.PI / 4 + lat * RAD / 2)) / RAD; }
  function unmerc(m) { return (2 * Math.atan(Math.exp(m * RAD)) - Math.PI / 2) / RAD; }
  function hav(a, b) {
    var R = 6371.0088, dLat = (b.lat - a.lat) * RAD, dLon = (b.lon - a.lon) * RAD;
    var x = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * Math.pow(Math.sin(dLon / 2), 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)));
  }

  /* 'M x y l dx dy … z' biçimini halkalara ayır */
  function parse(d) {
    var rings = [], cur = null, x = 0, y = 0, m;
    var re = /([Mlz])([^Mlz]*)/g;
    while ((m = re.exec(d))) {
      var c = m[1];
      if (c === 'z') { if (cur && cur.length) rings.push(Float64Array.from(cur)); cur = null; continue; }
      var nums = (m[2].match(/-?(?:\d+\.?\d*|\.\d+)/g) || []).map(Number);
      if (c === 'M') {
        if (cur && cur.length) rings.push(Float64Array.from(cur));
        x = nums[0]; y = nums[1]; cur = [x, y];
      } else {
        if (!cur) cur = [x, y];
        for (var i = 0; i + 1 < nums.length; i += 2) { x += nums[i]; y += nums[i + 1]; cur.push(x, y); }
      }
    }
    if (cur && cur.length) rings.push(Float64Array.from(cur));
    return rings;
  }

  /* çift-tek kuralı */
  function pip(rings, x, y) {
    var inside = false;
    for (var r = 0; r < rings.length; r++) {
      var a = rings[r], n = a.length / 2;
      for (var i = 0, j = n - 1; i < n; j = i++) {
        var xi = a[2 * i], yi = a[2 * i + 1], xj = a[2 * j], yj = a[2 * j + 1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
      }
    }
    return inside;
  }
  function inBox(bb, x, y) { return x >= bb[0] && x <= bb[2] && y >= bb[1] && y <= bb[3]; }
  /* (x,y) noktasına en yakın sınır noktası (harita birimi) */
  function nearestPoint(rings, x, y) {
    var best = Infinity, bx = 0, by = 0;
    for (var r = 0; r < rings.length; r++) {
      var a = rings[r], n = a.length / 2;
      for (var i = 0, j = n - 1; i < n; j = i++) {
        var x1 = a[2 * j], y1 = a[2 * j + 1], x2 = a[2 * i], y2 = a[2 * i + 1];
        var dx = x2 - x1, dy = y2 - y1, L = dx * dx + dy * dy, t = 0;
        if (L > 0) t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / L));
        var px = x1 + t * dx, py = y1 + t * dy, d2 = (px - x) * (px - x) + (py - y) * (py - y);
        if (d2 < best) { best = d2; bx = px; by = py; }
      }
    }
    return { x: bx, y: by, d2: best };
  }

  /* Bir sınır verisine (VN_GEO / AS_GEO) bağlı izdüşüm + sorgu yardımcıları üretir */
  function make(G) {
    var K = G.K, LON0 = G.lon0, YTOP = G.yTop, cache = {};
    function toLL(x, y) { return { lon: LON0 + x / K, lat: unmerc(YTOP - y / K) }; }
    function toXY(lon, lat) { return { x: (lon - LON0) * K, y: (YTOP - merc(lat)) * K }; }
    function table() { return G.p; }
    function ringsOf(id) {
      if (!cache[id]) cache[id] = parse(G.p[id].d);
      return cache[id];
    }
    function featureAt(x, y) {
      var ids = Object.keys(G.p);
      for (var i = 0; i < ids.length; i++) {
        var f = G.p[ids[i]];
        if (inBox(f.bb, x, y) && pip(ringsOf(ids[i]), x, y)) return ids[i];
      }
      return null;
    }
    /* tahmin noktasından il çokgenine km cinsinden uzaklık (içerideyse 0) */
    function distToFeature(x, y, id) {
      var rings = ringsOf(id);
      if (pip(rings, x, y)) return { km: 0, inside: true, x: x, y: y };
      var np = nearestPoint(rings, x, y);
      return { km: hav(toLL(x, y), toLL(np.x, np.y)), inside: false, x: np.x, y: np.y };
    }
    function bboxOf(ids) {
      var b = null;
      ids.forEach(function (id) {
        var f = G.p[id]; if (!f) return;
        b = b ? [Math.min(b[0], f.bb[0]), Math.min(b[1], f.bb[1]), Math.max(b[2], f.bb[2]), Math.max(b[3], f.bb[3])] : f.bb.slice();
      });
      return b;
    }
    return {
      G: G, K: K, merc: merc, unmerc: unmerc, toLL: toLL, toXY: toXY, hav: hav, parse: parse,
      ringsOf: ringsOf, pip: pip, featureAt: featureAt, nearestPoint: nearestPoint,
      distToFeature: distToFeature, bboxOf: bboxOf, table: table
    };
  }

  g.Geom = make(g.VN_GEO);
  g.Geom.make = make;
})(typeof window !== 'undefined' ? window : globalThis);

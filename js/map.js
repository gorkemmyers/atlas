/* map.js — SVG harita motoru: kaydır/yakınlaştır, boyama, etiket, vurgu, iğne */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI;
  var h = U.h, s = U.s;
  /* Yerleşik vektör atlas zemini (Natural Earth kamu malı); ticari kullanımda harici Esri karosu çağrılmaz. */

  /* Haritaya özgü temalar: ızgara aralığı, arka plan etiketleri ([boylam, enlem, metin, sınıf]), dünya etiketi hariç tutma */
  var THEMES = {
    vn: {
      aria: 'Vietnam haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.', fit: 'Tüm Vietnam’ı göster',
      grid: { lat: [6, 26, 2], lon: [96, 116, 2], txt: [8, 24, 2], refLon: 102, refLat: 16 },
      excludeWorld: ['Vietnam', 'China', 'Laos', 'Cambodia'],
      bg: [
        [103.55, 23.5, 'ÇİN', 'c'], [102.55, 19.4, 'LAOS', 'c'], [105.15, 12.8, 'KAMBOÇYA', 'c'],
        [110.9, 15.4, 'Doğu Denizi', 's bg-e'], [108.3, 20.15, 'Tonkin Körfezi', 's'], [102.5, 9.1, 'Tayland Körfezi', 's']
      ]
    },
    as: {
      aria: 'Güney Asya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.', fit: 'Tüm bölgeyi göster',
      grid: { lat: [4, 40, 4], lon: [60, 104, 4], txt: [8, 36, 4], refLon: 82, refLat: 22 },
      excludeWorld: ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Bhutan', 'Sri Lanka', 'China', 'Afghanistan', 'Thailand'],
      bg: [
        [86.5, 32.6, 'ÇİN · TİBET', 'c'], [66.4, 33.6, 'AFGANİSTAN', 'c'], [99.6, 24.9, 'ÇİN', 'c'], [99.6, 18.4, 'TAYLAND', 'c'],
        [68.4, 15.2, 'Umman Denizi', 's'], [87.6, 14.6, 'Bengal Körfezi', 's'], [80.6, 3.6, 'Hint Okyanusu', 's']
      ]
    }
  };

  function MapView(host, opts) {
    var o = this.o = Object.assign({
      geo: null, geom: null, theme: 'vn',
      mesh: { 'in': true, rg: false, mc: false, co: true },
      controls: true, locator: true, scale: true, basemap: true, basemapLabels: true,
      tip: null, onClick: null, onHover: null,
      maxK: 36, padding: 16
    }, opts || {});
    this.host = host;
    this.G = o.geo || g.VN_GEO;
    this.Geom = o.geom || (this.G === g.VN_GEO ? g.Geom : g.Geom.make(this.G));
    this.T = o.themeCfg || THEMES[o.theme] || THEMES.vn;
    this.BB = this.G.bbox;                           // [x0, y0, x1, y1] (harita birimi): kaydırma sınırı, mini harita
    this.FIT = this.G.fit || this.BB;                // varsayılan kadraj (yoksa tüm harita)
    this.K = this.G.K;
    this.W = 300; this.H = 300;
    this.cam = { cx: (this.BB[0] + this.BB[2]) / 2, cy: (this.BB[1] + this.BB[3]) / 2, k: 0.4 };
    this.fitK = 0.4;
    this.touched = false;
    this.ins = { t: 0, r: 0, b: 0, l: 0 };          // üstte kalan panelin kapattığı kenar boşlukları (px)
    this.nodes = {};
    this.fillFn = null;
    this.ptrs = new Map();
    this.drag = null; this.pinch = null; this.hoverId = null;
    this.labelFn = null; this.labels = []; this.labelOpt = { size: 10.5, fit: 1.6 };
    this.pins = [];
    this.meshEls = {};
    this._raf = 0;
    this._tilesOk = false;
    this._tileCache = new Map();
    this._tileVariant = '';
    this._zLayers = {};
    this._curZ = -1;
    this._baseZ = -1;
    this.basemap = 'atlas';
    this.cfg = null;
    if (o.controls && g.Kit) g.Kit.cfg(this);   // her haritada aynı "Harita ayarları" (js/kit.js)
    this._build();
    this._bind();
    this._measure(true);
  }

  MapView.prototype = {
    /* ---------------- kurulum ---------------- */
    _build: function () {
      var host = this.host, self = this;
      var Geom = this.Geom, G = this.G, BB = this.BB, T = this.T;
      host.classList.add('map', 'map-' + this.o.theme);
      if (this.o.basemapLabels === false) host.classList.add('map-nolbl');
      host.setAttribute('tabindex', '0');
      host.setAttribute('role', 'application');
      host.setAttribute('aria-label', T.aria);
      this.tileEl = h('div', { 'class': 'map-tiles', 'aria-hidden': 'true' });
      host.appendChild(this.tileEl);
      var svg = this.svg = s('svg', { 'class': 'map-svg', preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true' });
      svg.style.setProperty('--fs', this.labelOpt.size);
      svg.style.setProperty('--u', 1);

      /* silik dünya kara + sınır katmanı (çevrimdışı ve sade atlas görünümü için) */
      this.gWorld = s('g', { 'class': 'g-world' });
      this._ensureWorld();
      svg.appendChild(this.gWorld);

      /* ızgara + arka plan etiketleri */
      var gg = this.gGrid = s('g', { 'class': 'g-grid' });
      var d = '', lat, lon, p;
      var gr = T.grid;
      for (lat = gr.lat[0]; lat <= gr.lat[1]; lat += gr.lat[2]) { p = Geom.toXY(gr.refLon, lat); d += 'M-40000 ' + p.y.toFixed(1) + 'H40000'; }
      for (lon = gr.lon[0]; lon <= gr.lon[1]; lon += gr.lon[2]) { p = Geom.toXY(lon, gr.refLat); d += 'M' + p.x.toFixed(1) + ' -40000V40000'; }
      gg.appendChild(s('path', { 'class': 'grid-line', d: d }));
      var txtX = BB[0] - Math.max(45, (BB[2] - BB[0]) * 0.032);
      for (lat = gr.txt[0]; lat <= gr.txt[1]; lat += gr.txt[2]) {
        p = Geom.toXY(gr.refLon, lat);
        var latStr = lat === 0 ? '0°' : (lat < 0 ? (-lat) + '°G' : lat + '°K');
        gg.appendChild(s('text', { 'class': 'grid-txt', x: txtX.toFixed(1), y: p.y.toFixed(1) }, latStr));
      }
      T.bg.forEach(function (b) {
        var q = Geom.toXY(b[0], b[1]);
        gg.appendChild(s('text', { 'class': 'bg-lbl bg-' + b[3], x: q.x.toFixed(1), y: q.y.toFixed(1) }, b[2]));
      });
      svg.appendChild(gg);

      this.gLand = s('g', { 'class': 'g-lands' });
      this.gMesh = s('g', { 'class': 'g-mesh' });
      this.gHL = s('g', { 'class': 'g-hl' });
      this.gRt = s('g', { 'class': 'g-rt' });      /* yol çizgileri: vurgunun üstünde, etiketlerin altında */
      this.gLbl = s('g', { 'class': 'g-lbl' });
      this.gOv = s('g', { 'class': 'g-ov' });
      svg.appendChild(this.gLand); svg.appendChild(this.gMesh); svg.appendChild(this.gHL); svg.appendChild(this.gRt);
      svg.appendChild(this.gLbl); svg.appendChild(this.gOv);
      host.appendChild(svg);

      this._ensureLand();
      this.setMesh(this.o.mesh);

      /* kontroller */
      this.tipEl = h('div', { 'class': 'map-tip', hidden: true, 'data-ui': '1' });
      host.appendChild(this.tipEl);
      this.hintEl = h('div', { 'class': 'map-hint', hidden: true, 'data-ui': '1' });
      host.appendChild(this.hintEl);
      this.attribEl = h('div', { 'class': 'map-attrib', hidden: true, 'data-ui': '1' }, 'Natural Earth · OSM');
      host.appendChild(this.attribEl);
      if (this.o.controls) {
        this.ctrl = h('div', { 'class': 'map-ctrl', 'data-ui': '1' },
          this._btn('plus', 'Yakınlaştır', function () { self.zoomBy(1.6); }),
          this._btn('minus', 'Uzaklaştır', function () { self.zoomBy(1 / 1.6); }),
          this._btn('fit', T.fit, function () { self.fitAll(true); }));
        if (this.cfg) g.Kit.cfgMount(this);
        host.appendChild(this.ctrl);
      }
      if (this.o.scale) {
        this.scaleEl = h('div', { 'class': 'map-scale', 'data-ui': '1' }, h('i'), h('span'));
        host.appendChild(this.scaleEl);
      }
      if (this.o.locator) {
        var bw = BB[2] - BB[0], bh = BB[3] - BB[1];
        this.locSvg = s('svg', { viewBox: (BB[0] - 20) + ' ' + (BB[1] - 20) + ' ' + (bw + 40) + ' ' + (bh + 40), 'aria-hidden': 'true' },
          s('path', { 'class': 'loc-co', d: G.m.co }));
        this.locRect = s('rect', { 'class': 'loc-vp' });
        this.locDot = s('circle', { 'class': 'loc-dot', r: 22, cx: -500, cy: -500 });
        this.locSvg.appendChild(this.locRect); this.locSvg.appendChild(this.locDot);
        this.locEl = h('div', { 'class': 'map-loc', hidden: true, 'data-ui': '1', 'aria-hidden': 'true' }, this.locSvg);
        host.appendChild(this.locEl);
      }
    },
    _btn: function (icon, label, fn) {
      var b = h('button', { type: 'button', 'class': 'map-btn', title: label, 'aria-label': label, onclick: fn }, UI.icon(icon, 18));
      return b;
    },
    addControl: function (el) { if (this.ctrl) this.ctrl.appendChild(el); },

    _ensureWorld: function () {
      var WG = g.WORLD_GEO;
      if (!WG || !this.gWorld) return;
      var Geom = this.Geom, ex = new Set(this.T.excludeWorld || []), wrap360 = !!this.T.wrap360;
      function decPath(arr, closed) {
        var out = [], i, q, ix, iy, p, shift;
        for (i = 0; i < arr.length; i++) {
          q = arr[i];
          if (!q || q.length < 4) continue;
          var pass, passes = (wrap360 && q[0] / 100 < -120) ? 2 : 1;
          for (pass = 0; pass < passes; pass++) {
            shift = pass === 1 ? 360 : 0;
            ix = q[0]; iy = q[1];
            p = Geom.toXY(ix / 100 + shift, iy / 100);
            out.push('M', p.x.toFixed(1), ' ', p.y.toFixed(1));
            for (var j = 2; j + 1 < q.length; j += 2) {
              ix += q[j]; iy += q[j + 1];
              p = Geom.toXY(ix / 100 + shift, iy / 100);
              out.push('L', p.x.toFixed(1), ' ', p.y.toFixed(1));
            }
            if (closed) out.push('Z');
          }
        }
        return out.join('');
      }
      if (WG.l && WG.l.length) this.gWorld.appendChild(s('path', { 'class': 'world-land', 'fill-rule': 'evenodd', d: decPath(WG.l, true) }));
      if (WG.b && WG.b.length) this.gWorld.appendChild(s('path', { 'class': 'world-border', d: decPath(WG.b, false) }));
      if (WG.c && WG.c.length && this.o.basemapLabels !== false) {
        var lg = s('g', { 'class': 'g-world-lbl' });
        WG.c.forEach(function (c) {
          if (ex.has(c[3])) return;
          var q = Geom.toXY(c[0], c[1]);
          lg.appendChild(s('text', { 'class': 'world-lbl', x: q.x.toFixed(1), y: q.y.toFixed(1) }, c[2]));
        });
        this.gWorld.appendChild(lg);
      }
    },
    setBasemap: function () {
      this.basemap = 'atlas';
      if (g.Store && g.Store.data && g.Store.data.set) { g.Store.data.set.basemap = 'atlas'; g.Store.save(); }
      this._syncTiles();
    },
    _syncTiles: function () {
      if (!this.tileEl) return;
      this._tilesOk = false;
      this.host.classList.remove('has-tiles');
      if (this.attribEl) this.attribEl.hidden = true;
      this.tileEl.hidden = true;
    },

    _ensureLand: function () {
      var tbl = this.Geom.table(), nodes = this.nodes, grp = s('g', { 'class': 'g-land' });
      Object.keys(tbl).forEach(function (id) {
        var n = s('path', { 'class': 'f', d: tbl[id].d, 'data-id': id });
        grp.appendChild(n); nodes[id] = n;
      });
      this.gLand.appendChild(grp);
    },

    /* ---------------- boya, ağ ---------------- */
    setFill: function (fn) { this.fillFn = fn; this.paint(); },
    paint: function () {
      var nodes = this.nodes, fn = this.fillFn;
      Object.keys(nodes).forEach(function (id) {
        var c = fn ? fn(id) : '';
        nodes[id].setAttribute('class', c ? 'f ' + c : 'f');
      });
    },
    setMesh: function (m) {
      var self = this, GM = this.G.m;
      this.o.mesh = Object.assign({}, this.o.mesh, m || {});
      ['in', 'rg', 'mc', 'co'].forEach(function (k) {
        var on = !!self.o.mesh[k] && !!GM[k];
        if (on && !self.meshEls[k]) {
          self.meshEls[k] = s('path', { 'class': 'mesh m-' + k, d: GM[k] });
          /* sıra: ince → kalın */
          self.gMesh.appendChild(self.meshEls[k]);
          ['in', 'rg', 'mc', 'co'].forEach(function (kk) { if (self.meshEls[kk]) self.gMesh.appendChild(self.meshEls[kk]); });
        }
        if (self.meshEls[k]) self.meshEls[k].style.display = on ? '' : 'none';
      });
    },

    /* ---------------- kamera ----------------
       Alttan açılan panel haritanın bir kısmını kapatır: görünür alan = host − insets.
       Odaklama ve sığdırma hep görünür alanın ortasına yapılır. */
    _vis: function () {
      var n = this.ins, x0 = n.l, y0 = n.t, x1 = Math.max(x0 + 60, this.W - n.r), y1 = Math.max(y0 + 60, this.H - n.b);
      return { x0: x0, y0: y0, x1: x1, y1: y1, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
    },
    _fitMetrics: function () {
      var v = this._vis(), BB = this.FIT, bw = BB[2] - BB[0], bh = BB[3] - BB[1], pad = this.o.padding;
      this.fitK = Math.min((v.w - 2 * pad) / bw, (v.h - 2 * pad) / bh);
    },
    /* harita noktası (mx,my) görünür alanın ortasına gelsin: kamera merkezi */
    _centerFor: function (mx, my, k) {
      var v = this._vis();
      return { cx: mx - (v.cx - this.W / 2) / k, cy: my - (v.cy - this.H / 2) / k };
    },
    setInsets: function (i, refit) {
      var n = this.ins;
      n.t = Math.max(0, i.t || 0); n.r = Math.max(0, i.r || 0); n.b = Math.max(0, i.b || 0); n.l = Math.max(0, i.l || 0);
      this._fitMetrics();
      if (refit && !this.touched) this.fitAll(false); else this._apply(false);
    },
    _clampK: function (k) { return Math.min(this.o.maxK, Math.max(this.fitK * 0.42, k)); },
    _set: function (cx, cy, k) {
      k = this._clampK(k);
      var v = this._vis(), ox = (v.cx - this.W / 2) / k, oy = (v.cy - this.H / 2) / k, BB = this.BB;
      var padX = Math.max(420, (BB[2] - BB[0]) * 0.48), padY = Math.max(420, (BB[3] - BB[1]) * 0.48);
      cx = U.clamp(cx + ox, BB[0] - padX, BB[2] + padX) - ox;
      cy = U.clamp(cy + oy, BB[1] - padY, BB[3] + padY) - oy;
      var kch = k !== this.cam.k;
      this.cam.cx = cx; this.cam.cy = cy; this.cam.k = k;
      this._apply(kch);
    },
    _apply: function (kChanged) {
      var c = this.cam, w = this.W / c.k, hh = this.H / c.k;
      this.svg.setAttribute('viewBox', (c.cx - w / 2).toFixed(2) + ' ' + (c.cy - hh / 2).toFixed(2) + ' ' + w.toFixed(2) + ' ' + hh.toFixed(2));
      if (kChanged) {
        this.svg.style.setProperty('--u', (1 / c.k).toFixed(5));
        this._labels(); this._pinXf();
      }
      this._scale(); this._locator(); this._syncTiles();
    },
    _measure: function (initial) {
      var r = this.host.getBoundingClientRect();
      var W = Math.max(60, r.width), H = Math.max(60, r.height);
      if (!initial && Math.abs(W - this.W) < 0.5 && Math.abs(H - this.H) < 0.5) return;
      this.W = W; this.H = H;
      this._fitMetrics();
      if (!this.touched || initial) {
        var BB = this.FIT, c = this._centerFor((BB[0] + BB[2]) / 2, (BB[1] + BB[3]) / 2, this.fitK);
        this.cam.cx = c.cx; this.cam.cy = c.cy; this.cam.k = this.fitK;
      } else this.cam.k = this._clampK(this.cam.k);
      this._apply(true);
    },
    _cancelAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } },
    animateTo: function (cx, cy, k, ms) {
      var self = this;
      this._cancelAnim();
      if (ms == null) ms = 450;
      if (!ms || U.reducedMotion()) { this._set(cx, cy, k); return; }
      var c0 = { cx: this.cam.cx, cy: this.cam.cy, k: this.cam.k }, t0 = performance.now();
      var lk0 = Math.log(c0.k), lk1 = Math.log(this._clampK(k));
      function step(now) {
        var t = Math.min(1, (now - t0) / ms), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        self._set(U.lerp(c0.cx, cx, e), U.lerp(c0.cy, cy, e), Math.exp(U.lerp(lk0, lk1, e)));
        self._raf = t < 1 ? requestAnimationFrame(step) : 0;
      }
      this._raf = requestAnimationFrame(step);
    },
    fitAll: function (anim) {
      this.touched = false;
      var BB = this.FIT, c = this._centerFor((BB[0] + BB[2]) / 2, (BB[1] + BB[3]) / 2, this.fitK);
      this.animateTo(c.cx, c.cy, this.fitK, anim ? 450 : 0);
    },
    /* hedef: id dizisi veya [x0,y0,x1,y1] */
    fitTo: function (t, o) {
      o = o || {};
      var bb = (t && typeof t[0] === 'number') ? t : this.Geom.bboxOf(t || []);
      if (!bb) return;
      var pad = o.pad == null ? 40 : o.pad, v = this._vis();
      var bw = Math.max(8, bb[2] - bb[0]), bh = Math.max(8, bb[3] - bb[1]);
      var k = Math.min((v.w - 2 * pad) / bw, (v.h - 2 * pad) / bh);
      k = U.clamp(k, this.fitK, o.maxK || 14);
      this.touched = true;
      var c = this._centerFor((bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2, k);
      this.animateTo(c.cx, c.cy, k, o.anim === false ? 0 : 480);
    },
    /* küçük çokgenleri bağlamıyla göster: en az minPx kadar büyüt */
    focusOn: function (ids, o) {
      o = o || {};
      var bb = this.Geom.bboxOf(ids);
      if (!bb) return;
      var big = Math.max(bb[2] - bb[0], bb[3] - bb[1]) * this.fitK;
      if (big >= (o.minPx || 90)) { this.fitAll(o.anim !== false); return; }
      var ctx = o.ctx || 2.6, cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2;
      var half = Math.max(bb[2] - bb[0], bb[3] - bb[1]) * ctx / 2;
      this.fitTo([cx - half, cy - half, cx + half, cy + half], { pad: 4, anim: o.anim });
    },
    zoomAt: function (f, sx, sy) {
      this._cancelAnim(); this.touched = true;
      var k = this._clampK(this.cam.k * f), a = this._toMap(sx, sy);
      this._set(a.x - (sx - this.W / 2) / k, a.y - (sy - this.H / 2) / k, k);
    },
    zoomBy: function (f) {
      var k = this._clampK(this.cam.k * f), v = this._vis(), a = this._toMap(v.cx, v.cy);
      this.touched = true;
      this.animateTo(a.x - (v.cx - this.W / 2) / k, a.y - (v.cy - this.H / 2) / k, k, 220);
    },
    _toMap: function (sx, sy) { return { x: this.cam.cx + (sx - this.W / 2) / this.cam.k, y: this.cam.cy + (sy - this.H / 2) / this.cam.k }; },
    clientToMap: function (cx, cy) { var r = this.host.getBoundingClientRect(); return this._toMap(cx - r.left, cy - r.top); },
    mapToClient: function (x, y) {
      var r = this.host.getBoundingClientRect();
      return { x: r.left + this.W / 2 + (x - this.cam.cx) * this.cam.k, y: r.top + this.H / 2 + (y - this.cam.cy) * this.cam.k };
    },

    /* ---------------- etiketler ---------------- */
    setLabels: function (fn, o) {
      this.labelFn = fn;
      this.labelOpt = Object.assign({ size: 10.5, fit: 1.6 }, o || {});
      this.svg.style.setProperty('--fs', this.labelOpt.size);
      this._buildLabels(); this._labels();
    },
    _buildLabels: function () {
      var self = this;
      U.clear(this.gLbl); this.labels = [];
      if (!this.labelFn) return;
      var tbl = this.Geom.table();
      Object.keys(tbl).forEach(function (id) {
        var txt = self.labelFn(id);
        if (!txt) return;
        var f = tbl[id], el = s('text', { 'class': 'lbl', x: f.lp[0], y: f.lp[1], 'data-for': id }, txt);
        el.style.display = 'none';
        self.gLbl.appendChild(el);
        self.labels.push({ id: id, el: el, x: f.lp[0], y: f.lp[1], r: f.lp[2], ar: f.ar, w: txt.length * 0.6, on: false, force: false });
      });
      this.labels.sort(function (a, b) { return b.ar - a.ar; });
    },
    /* belirli id’lerin etiketini koşulsuz göster (cevap açıklandığında) */
    forceLabels: function (ids) {
      var set = new Set(ids || []);
      this.labels.forEach(function (L) { L.force = set.has(L.id); });
      this._labels();
    },
    _labels: function () {
      if (!this.labels.length) return;
      var k = this.cam.k, fs = this.labelOpt.size, fit = this.labelOpt.fit, hgt = fs * 1.2, placed = [], i, L, b, show, w, sx, sy, box, j;
      /* önce zorunlular */
      for (i = 0; i < this.labels.length; i++) {
        L = this.labels[i];
        if (!L.force) continue;
        w = L.w * fs; sx = L.x * k; sy = L.y * k;
        placed.push([sx - w / 2 - 2, sy - hgt / 2, sx + w / 2 + 2, sy + hgt / 2]);
      }
      for (i = 0; i < this.labels.length; i++) {
        L = this.labels[i];
        show = L.force;
        if (!show) {
          w = L.w * fs;
          show = (w / 2) <= L.r * k * fit + 3;
          if (show) {
            sx = L.x * k; sy = L.y * k;
            box = [sx - w / 2 - 2, sy - hgt / 2, sx + w / 2 + 2, sy + hgt / 2];
            for (j = 0; j < placed.length; j++) {
              b = placed[j];
              if (box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]) { show = false; break; }
            }
            if (show) placed.push(box);
          }
        }
        if (show !== L.on) { L.on = show; L.el.style.display = show ? '' : 'none'; }
      }
    },

    /* ---------------- vurgu, iğne, çizgi ---------------- */
    highlight: function (ids, cls) {
      var self = this, tbl = this.Geom.table();
      (ids || []).forEach(function (id) {
        if (!tbl[id]) return;
        self.gHL.appendChild(s('path', { 'class': 'hl ' + cls, d: tbl[id].d }));
      });
    },
    clearHighlight: function (cls) {
      U.$$(cls ? '.hl.' + cls : '.hl', this.gHL).forEach(function (n) { n.parentNode.removeChild(n); });
    },
    addPin: function (x, y, cls) {
      var el = s('g', { 'class': 'pin ' + (cls || '') },
        s('path', { d: 'M0 0C-3.5-8-11-13.5-11-21a11 11 0 1 1 22 0C11-13.5 3.5-8 0 0z' }),
        s('circle', { cx: 0, cy: -21, r: 4 }));
      var P = { el: el, x: x, y: y, cls: cls || '' };
      this.pins.push(P);
      this.gOv.appendChild(el);
      this._pinXf();
      return P;
    },
    addMarker: function (x, y, cls) {
      var el = s('g', { 'class': 'mk ' + (cls || '') }, s('circle', { r: 8 }), s('circle', { r: 2.6, 'class': 'mk-dot' }));
      var P = { el: el, x: x, y: y, cls: cls || '', marker: true };
      this.pins.push(P);
      this.gOv.appendChild(el);
      this._pinXf();
      return P;
    },
    addLine: function (a, b, cls) {
      var el = s('line', { 'class': 'ln ' + (cls || ''), x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      this.gOv.insertBefore(el, this.gOv.firstChild);
      return el;
    },
    /* ---------------- yol çizgileri ----------------
       paths: [[[x,y],…],…] harita birimi (Geom.toXY çıktısı), cls: 'rt-sel' (seçili, kalın) | 'rt-all' (ince, bağlam),
       label: yol numarası (yalnız seçiliye): çizginin ortasında küçük etiket, yakınlaşmadan bağımsız boyutta. */
    addRoute: function (paths, cls, label) {
      var d = paths.map(function (p) { return 'M' + p.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('L'); }).join('');
      var el = s('g', { 'class': 'rt ' + (cls || '') }, s('path', { 'class': 'rt-halo', d: d }), s('path', { 'class': 'rt-line', d: d }));
      this.gRt.appendChild(el);
      if (label) {
        /* en uzun parçanın yarı uzunluğundaki nokta */
        var best = paths[0], bl = -1;
        paths.forEach(function (p) { var L = 0; for (var i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); if (L > bl) { bl = L; best = p; } });
        var half = bl / 2, acc = 0, mx = best[0][0], my = best[0][1];
        for (var i = 1; i < best.length; i++) {
          var seg = Math.hypot(best[i][0] - best[i - 1][0], best[i][1] - best[i - 1][1]);
          if (acc + seg >= half) { var t = seg ? (half - acc) / seg : 0; mx = best[i - 1][0] + t * (best[i][0] - best[i - 1][0]); my = best[i - 1][1] + t * (best[i][1] - best[i - 1][1]); break; }
          acc += seg;
        }
        var w = Math.max(30, String(label).length * 7.6 + 14);
        var pill = s('g', { 'class': 'rt-pill ' + (cls || '') },
          s('rect', { x: -w / 2, y: -9, width: w, height: 18, rx: 9 }),
          s('text', { x: 0, y: 0 }, String(label)));
        this.gRt.appendChild(pill);
        this.pins.push({ el: pill, x: mx, y: my, cls: 'rt-pin ' + (cls || '') });
        this._pinXf();
      }
      return el;
    },
    clearRoutes: function (cls) {
      var match = function (n) { return !cls || (n.getAttribute('class') || '').split(' ').indexOf(cls) >= 0; };
      Array.prototype.slice.call(this.gRt.childNodes).forEach(function (n) { if (match(n)) n.parentNode.removeChild(n); });
      this.pins = this.pins.filter(function (P) { return !(P.cls.indexOf('rt-pin') === 0 && (!cls || P.cls.split(' ').indexOf(cls) >= 0)); });
    },
    _pinXf: function () {
      var u = 1 / this.cam.k;
      this.pins.forEach(function (P) {
        P.el.setAttribute('transform', 'translate(' + P.x.toFixed(2) + ' ' + P.y.toFixed(2) + ') scale(' + u.toFixed(5) + ')');
      });
    },
    clearOverlays: function (cls) {
      var keep = [];
      this.pins.forEach(function (P) {
        if (!cls || P.cls.split(' ').indexOf(cls) >= 0) { if (P.el.parentNode) P.el.parentNode.removeChild(P.el); } else keep.push(P);
      });
      this.pins = keep;
      U.$$(cls ? '.ln.' + cls : '.ln', this.gOv).forEach(function (n) { n.parentNode.removeChild(n); });
    },

    /* ---------------- küçük arayüz parçaları ---------------- */
    setHint: function (text) {
      if (!text) { this.hintEl.hidden = true; return; }
      this.hintEl.textContent = text; this.hintEl.hidden = false;
    },
    setLocatorTarget: function (id) {
      if (!this.locDot) return;
      if (!id) { this.locDot.setAttribute('cx', -500); this.locDot.setAttribute('cy', -500); return; }
      var f = this.Geom.table()[id];
      if (!f) return;
      this.locDot.setAttribute('cx', f.c ? f.c[0] : f.lp[0]); this.locDot.setAttribute('cy', f.c ? f.c[1] : f.lp[1]);
    },
    _locator: function () {
      if (!this.locEl) return;
      var show = this.cam.k > this.fitK * 1.7;
      this.locEl.hidden = !show;
      if (!show) return;
      var v = this._vis(), m = this._toMap(v.cx, v.cy), w = v.w / this.cam.k, hh = v.h / this.cam.k;
      this.locRect.setAttribute('x', (m.x - w / 2).toFixed(1)); this.locRect.setAttribute('y', (m.y - hh / 2).toFixed(1));
      this.locRect.setAttribute('width', w.toFixed(1)); this.locRect.setAttribute('height', hh.toFixed(1));
    },
    _scale: function () {
      if (!this.scaleEl) return;
      var lat = this.Geom.toLL(0, this.cam.cy).lat;
      var pxPerKm = this.cam.k * this.K / (111.32 * Math.cos(lat * Math.PI / 180));
      var opts = [5, 10, 20, 25, 50, 100, 200, 250, 500], km = 500, i;
      for (i = 0; i < opts.length; i++) if (opts[i] * pxPerKm >= 48) { km = opts[i]; break; }
      this.scaleEl.firstChild.style.width = Math.round(km * pxPerKm) + 'px';
      this.scaleEl.lastChild.textContent = km + ' km';
    },

    /* ---------------- olaylar ---------------- */
    _bind: function () {
      var self = this, el = this.host;
      this._on = [];
      function on(t, type, fn, opt) { t.addEventListener(type, fn, opt); self._on.push([t, type, fn, opt]); }
      on(el, 'pointerdown', function (e) { self._down(e); });
      on(el, 'pointermove', function (e) { self._move(e); });
      on(el, 'pointerup', function (e) { self._up(e, false); });
      on(el, 'pointercancel', function (e) { self._up(e, true); });
      on(el, 'pointerleave', function (e) { if (e.pointerType === 'mouse') self._hover(null, e); });
      on(el, 'wheel', function (e) { self._wheel(e); }, { passive: false });
      on(el, 'dblclick', function (e) {
        if (e.target.closest('[data-ui]')) return;
        var r = el.getBoundingClientRect(), sx = e.clientX - r.left, sy = e.clientY - r.top;
        var k = self._clampK(self.cam.k * 2), a = self._toMap(sx, sy);
        self.touched = true;
        self.animateTo(a.x - (sx - self.W / 2) / k, a.y - (sy - self.H / 2) / k, k, 260);
      });
      on(el, 'keydown', function (e) { self._key(e); });
      if (g.ResizeObserver) {
        this.ro = new ResizeObserver(function () { self._measure(false); });
        this.ro.observe(el);
      } else on(g, 'resize', function () { self._measure(false); });
    },
    _down: function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest && e.target.closest('[data-ui]')) return;
      this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      this._cancelAnim();
      if (this.ptrs.size === 1) {
        var t = e.target.closest ? e.target.closest('[data-id]') : null;
        this.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, cx: this.cam.cx, cy: this.cam.cy, moved: false, hit: t ? t.getAttribute('data-id') : null };
      } else if (this.ptrs.size === 2) {
        var v = Array.from(this.ptrs.values()), r = this.host.getBoundingClientRect();
        var mx = (v[0].x + v[1].x) / 2 - r.left, my = (v[0].y + v[1].y) / 2 - r.top;
        this.pinch = { d0: Math.max(10, Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y)), k0: this.cam.k, a: this._toMap(mx, my) };
        if (this.drag) this.drag.moved = true;
      }
    },
    _move: function (e) {
      var p = this.ptrs.get(e.pointerId);
      if (!p) { if (e.pointerType === 'mouse') this._hoverEvent(e); return; }
      p.x = e.clientX; p.y = e.clientY;
      if (this.ptrs.size === 1 && this.drag) {
        var dx = e.clientX - this.drag.x0, dy = e.clientY - this.drag.y0;
        if (!this.drag.moved && Math.hypot(dx, dy) > 5) {
          this.drag.moved = true;
          this.host.classList.add('is-drag');
          try { this.host.setPointerCapture(e.pointerId); } catch (_) { /* yok say */ }
        }
        if (this.drag.moved) {
          this.touched = true;
          this._hover(null, e);
          this._set(this.drag.cx - dx / this.cam.k, this.drag.cy - dy / this.cam.k, this.cam.k);
        }
      } else if (this.ptrs.size === 2 && this.pinch) {
        var v = Array.from(this.ptrs.values()), r = this.host.getBoundingClientRect();
        var mx = (v[0].x + v[1].x) / 2 - r.left, my = (v[0].y + v[1].y) / 2 - r.top;
        var k = this._clampK(this.pinch.k0 * Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y) / this.pinch.d0);
        this.touched = true;
        this._set(this.pinch.a.x - (mx - this.W / 2) / k, this.pinch.a.y - (my - this.H / 2) / k, k);
      }
    },
    _up: function (e, cancelled) {
      if (!this.ptrs.delete(e.pointerId)) return;
      if (this.drag && this.drag.id === e.pointerId) {
        var d = this.drag; this.drag = null;
        this.host.classList.remove('is-drag');
        try { this.host.releasePointerCapture(e.pointerId); } catch (_) { /* yok say */ }
        if (!d.moved && !cancelled) this._click(d.hit, e);
      }
      if (this.ptrs.size < 2) this.pinch = null;
      if (this.ptrs.size === 1) {
        var en = Array.from(this.ptrs.entries())[0];
        this.drag = { id: en[0], x0: en[1].x, y0: en[1].y, cx: this.cam.cx, cy: this.cam.cy, moved: true, hit: null };
      }
    },
    _click: function (id, e) {
      var pt = this.clientToMap(e.clientX, e.clientY);
      if (this.o.onClick) this.o.onClick({ id: id, x: pt.x, y: pt.y, ev: e });
    },
    _wheel: function (e) {
      if (e.target.closest && e.target.closest('[data-ui]')) return;
      e.preventDefault();
      var r = this.host.getBoundingClientRect();
      var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1);
      this.zoomAt(Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top);
    },
    _hoverEvent: function (e) {
      var t = e.target.closest ? e.target.closest('[data-id]') : null;
      this._hover(t ? t.getAttribute('data-id') : null, e);
    },
    _hover: function (id, e) {
      var changed = id !== this.hoverId;
      this.hoverId = id;
      if (changed && this.o.onHover) this.o.onHover(id);
      var txt = (id && this.o.tip) ? this.o.tip(id) : null;
      if (!txt || !e) { this.tipEl.hidden = true; return; }
      var r = this.host.getBoundingClientRect();
      if (this.tipEl.textContent !== txt) this.tipEl.textContent = txt;
      this.tipEl.hidden = false;
      var tw = this.tipEl.offsetWidth, th = this.tipEl.offsetHeight;
      var x = e.clientX - r.left + 14, y = e.clientY - r.top + 16;
      if (x + tw > this.W - 6) x = e.clientX - r.left - tw - 12;
      if (y + th > this.H - 6) y = e.clientY - r.top - th - 12;
      this.tipEl.style.transform = 'translate(' + Math.max(4, x) + 'px,' + Math.max(4, y) + 'px)';
    },
    _key: function (e) {
      if (e.target !== this.host) return;
      var step = 0.18, c = this.cam, w = this.W / c.k, hh = this.H / c.k, handled = true;
      this._cancelAnim();
      switch (e.key) {
        case '+': case '=': this.zoomBy(1.5); break;
        case '-': case '_': this.zoomBy(1 / 1.5); break;
        case '0': this.fitAll(true); break;
        case 'ArrowLeft': this.touched = true; this._set(c.cx - w * step, c.cy, c.k); break;
        case 'ArrowRight': this.touched = true; this._set(c.cx + w * step, c.cy, c.k); break;
        case 'ArrowUp': this.touched = true; this._set(c.cx, c.cy - hh * step, c.k); break;
        case 'ArrowDown': this.touched = true; this._set(c.cx, c.cy + hh * step, c.k); break;
        default: handled = false;
      }
      if (handled) e.preventDefault();
    },
    destroy: function () {
      this._disposed = true;
      if (this.cfg) this.cfg.destroy();
      this._cancelAnim();
      if (this.ro) this.ro.disconnect();
      this._tileCache.clear();
      this._zLayers = {};
      this._on.forEach(function (a) { a[0].removeEventListener(a[1], a[2], a[3]); });
      this._on = [];
      U.clear(this.host);
      this.host.classList.remove('map', 'is-drag', 'has-tiles', 'map-nolbl', 'map-' + this.o.theme);
    }
  };

  MapView.addTheme = function (id, cfg) { THEMES[id] = cfg; };
  g.MapView = MapView;
})(typeof window !== 'undefined' ? window : globalThis);

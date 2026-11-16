/* sheet.js — alttan açılan panel (bottom sheet).
   Yalnızca dar dikey ekranda ("sheet" kipi) etkindir: panel haritanın üstünde üç yüksekliğe oturur
   (peek: yalnızca başlık · half: yarım · full: tam) ve tutamaçtan ya da başlıktan sürüklenir.
   Diğer kiplerde panel yan sütundur; bu sınıf yalnızca kaydırma gölgesini yönetir.
   Harita panelin kapattığı kısmı bilir (MapView.setInsets), odaklama görünür alana yapılır. */
(function (g) {
  'use strict';
  var U = g.U, h = U.h;
  var GAP = 36;                                   // tam açıkken üstte görünen harita şeridi (px)

  function Sheet(lay, panel) {
    var self = this;
    this.lay = lay; this.panel = panel; this.map = null;
    this.enabled = document.documentElement.getAttribute('data-mode') === 'sheet';
    this.state = null; this.last = 'half'; this.h = 0; this.fitOpts = {};
    this.first = true; this.drag = null; this.swallow = false; this.dead = false;
    this.watched = []; this.ro = null; this.mo = null; this._edgeRaf = 0;

    this.grip = h('button', { type: 'button', 'class': 'grip', 'aria-label': 'Paneli büyüt veya küçült', 'aria-expanded': 'true' }, h('i'));
    panel.insertBefore(this.grip, panel.firstChild);
    this.grip.addEventListener('click', function () { self.toggle(); });
    this.grip.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); self.step(1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); self.step(-1); }
    });

    this._down = function (e) {
      if (!self.enabled || self.dead) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      var t = e.target;
      if (!t.closest || !t.closest('.grip, .p-top') || t.closest('input, textarea, select')) return;
      self.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, h0: self.h, moved: false, pts: [{ t: e.timeStamp, y: e.clientY }] };
      /* hızlı fare hareketi panelin dışına çıksa da sürükleme izlensin */
      document.addEventListener('pointermove', self._move);
      document.addEventListener('pointerup', self._up);
      document.addEventListener('pointercancel', self._up);
    };
    this._move = function (e) {
      var d = self.drag;
      if (!d || e.pointerId !== d.id) return;
      var dy = d.y0 - e.clientY;
      if (!d.moved) {
        if (Math.abs(dy) < 8 || Math.abs(dy) < Math.abs(e.clientX - d.x0)) return;
        d.moved = true;
        try { panel.setPointerCapture(e.pointerId); } catch (err) { /* yok say */ }
        self.lay.classList.add('is-dragging');
      }
      e.preventDefault();
      d.pts.push({ t: e.timeStamp, y: e.clientY });
      if (d.pts.length > 6) d.pts.shift();
      self.set(U.clamp(d.h0 + dy, self.target('peek') - 14, self.target('full')));
    };
    this._up = function (e) {
      var d = self.drag;
      if (!d || e.pointerId !== d.id) return;
      self.drag = null;
      document.removeEventListener('pointermove', self._move);
      document.removeEventListener('pointerup', self._up);
      document.removeEventListener('pointercancel', self._up);
      if (!d.moved) return;
      self.lay.classList.remove('is-dragging');
      try { panel.releasePointerCapture(e.pointerId); } catch (err) { /* yok say */ }
      var a = d.pts[0], b = d.pts[d.pts.length - 1], v = d.pts.length > 1 ? (a.y - b.y) / Math.max(1, b.t - a.t) : 0;   // px/ms, yukarı +
      self.swallow = true; setTimeout(function () { self.swallow = false; }, 80);
      self.snapNearest(self.h + v * 180);
    };
    this._clk = function (e) { if (self.swallow) { e.stopPropagation(); e.preventDefault(); } };
    this._scroll = function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('p-body')) { panel.classList.toggle('is-scrolled', t.scrollTop > 2); self.edge(); }
    };
    this._resize = U.frame(function () { if (!self.dead) self.reflow(); });
    this._mode = function () { self.refresh(); };

    panel.addEventListener('pointerdown', this._down);
    panel.addEventListener('click', this._clk, true);
    panel.addEventListener('scroll', this._scroll, true);
    g.addEventListener('resize', this._resize);
    g.addEventListener('vnmode', this._mode);
    if (g.document && g.document.fonts && g.document.fonts.ready) g.document.fonts.ready.then(function () { if (!self.dead) self.reflow(); });
    /* görünüm kendi anlık durumunu vermediyse varsayılan: yarım */
    requestAnimationFrame(function () { if (!self.dead && self.first && self.enabled) self.snap('half'); });
  }

  var P = Sheet.prototype;

  P.H = function () { return this.lay.clientHeight || 0; };
  P.q = function (sel) { return this.panel.querySelector(sel); };
  P.peekH = function () {
    var t = this.q('.p-top'), f = this.q('.p-foot');
    return Math.round(this.grip.offsetHeight + (t ? t.offsetHeight : 0) + (f ? f.offsetHeight : 0) + 1);
  };
  /* gövdenin gerçek içerik yüksekliği (panel yüksekliğinden bağımsız) */
  P.contentH = function () {
    var b = this.q('.p-body');
    if (!b) return 0;
    var kids = b.children, i, last = null;
    for (i = kids.length - 1; i >= 0; i--) if (kids[i].offsetParent !== null) { last = kids[i]; break; }
    if (!last) return 0;
    /* gövde dolgusu "peek"te sıfırlanır; ölçü her durumda aynı çıksın diye değerleri CSS değişkenlerinden al */
    var cs = g.getComputedStyle(b), ps = g.getComputedStyle(this.panel);
    var pt = parseFloat(ps.getPropertyValue('--bp-t')) || 0, pb = parseFloat(ps.getPropertyValue('--bp-b')) || 0;
    return last.offsetTop - (parseFloat(cs.paddingTop) || 0) + pt + last.offsetHeight + pb;
  };
  /* ad → piksel */
  P.target = function (name, o) {
    var Hh = this.H(), pk = this.peekH(), fl = Math.max(pk, Hh - GAP);
    if (name === 'peek') return pk;
    if (name === 'full') return fl;
    var half = U.clamp(Math.round(Hh * 0.46), Math.min(pk + 120, fl), fl);
    if (name === 'half') return half;
    var t = this.q('.p-top'), f = this.q('.p-foot');
    var nat = this.grip.offsetHeight + (t ? t.offsetHeight : 0) + this.contentH() + (f ? f.offsetHeight : 0) + 2;
    var cap = Math.min(fl, Math.round(Hh * ((o && o.max) || 1)));
    return U.clamp(nat, pk, Math.max(pk, cap));
  };
  P.set = function (px) {
    px = Math.round(px);
    this.h = px;
    this.panel.style.height = px + 'px';
    this.lay.style.setProperty('--sheet-h', px + 'px');
    var fl = this.target('full'), pk = this.target('peek');
    this.lay.setAttribute('data-snap', px >= fl - 6 ? 'full' : px <= pk + 6 ? 'peek' : 'mid');
    this.panel.classList.toggle('is-peek', px <= pk + 6);
    var room = this.H() - px;   // haritanın açıkta kalan yüksekliği
    this.lay.setAttribute('data-room', room < 120 ? 'none' : room < 340 ? 'tight' : 'ok');
    this.grip.setAttribute('aria-expanded', px > pk + 6 ? 'true' : 'false');
  };
  /* name: 'peek' | 'half' | 'full' | 'fit' · o: { max (fit tavanı, ekran oranı), instant } */
  P.snap = function (name, o) {
    o = o || {};
    this.state = name; this.fitOpts = o;
    this.watch();
    if (!this.enabled || this.dead) return;
    if (name === 'half' || name === 'full') this.last = name;
    var px = this.target(name, o), inst = o.instant || this.first, lay = this.lay;
    this.first = false;
    if (inst) {
      lay.classList.add('no-anim');
      requestAnimationFrame(function () { requestAnimationFrame(function () { lay.classList.remove('no-anim'); }); });
    }
    this.set(px);
    if (this.map) this.map.setInsets({ b: this.insetFor(px) });
  };
  /* yalnızca kapalıysa aç (seçim yapılınca) */
  P.ensure = function (name, o) { if (this.enabled && (this.state === 'peek' || this.h <= this.target('peek') + 6)) this.snap(name || 'half', o); };
  P.reflow = function () { if (this.enabled && this.state) this.snap(this.state, Object.assign({}, this.fitOpts, { instant: true })); };
  P.snapNearest = function (px) {
    var c = [['peek', this.target('peek')], ['half', this.target('half')], ['full', this.target('full')]], best = c[0], bd = 1e9;
    c.forEach(function (x) { var d = Math.abs(x[1] - px); if (d < bd) { bd = d; best = x; } });
    this.snap(best[0]);
  };
  P.step = function (dir) {
    var c = [this.target('peek'), this.target('half'), this.target('full')], names = ['peek', 'half', 'full'], i, cur = 0;
    for (i = 0; i < c.length; i++) if (this.h >= c[i] - 6) cur = i;
    var to = U.clamp(cur + dir, 0, 2);
    this.snap(names[to]);
  };
  P.toggle = function () {
    if (!this.enabled) return;
    if (this.state === 'peek') this.snap(this.last || 'half'); else this.snap('peek');
  };
  P.bind = function (map) {
    this.map = map;
    if (map.cfg) map.cfg.sheet = this;
    if (this.enabled && this.h) map.setInsets({ b: this.insetFor(this.h) });
  };
  /* harita kamerası panelin en çok %62'sini kapalı sayar: tam açıkken görünür alan sıfırlanıp harita minicik kalmasın */
  P.insetFor = function (px) { return Math.min(px, Math.round(this.H() * 0.62)); };
  /* başlık / alt çubuk boyu değişince "peek" yüksekliği de değişir; gövde boyu / içeriği değişince alt kenar ipucu yenilenir */
  P.watch = function () {
    var self = this;
    if (this.dead) return;
    if (g.ResizeObserver) {
      if (!this.ro) this.ro = new g.ResizeObserver(function (entries) {
        if (self.dead) return;
        /* peek yüksekliği yalnızca başlık / alt şerit boyuna bağlı; gövde panelle birlikte esnediği için sayılmaz */
        if (self.state === 'peek' && !self.drag) {
          var body = self.q('.p-body');
          for (var i = 0; i < entries.length; i++) if (entries[i].target !== body) { self.reflow(); break; }
        }
        self.edge();
      });
      ['.p-top', '.p-foot', '.p-body'].forEach(function (s) {
        var el = self.q(s);
        if (el && self.watched.indexOf(el) < 0) { self.watched.push(el); self.ro.observe(el); }
      });
    }
    var body = this.q('.p-body');
    if (g.MutationObserver && body && !this.mo) {
      this.mo = new g.MutationObserver(function () { self.edge(); });
      this.mo.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
    }
    this.edge();
  };
  /* gövdede altta okunmamış içerik var mı (kaydırma ipucu) */
  P.edge = function () {
    var self = this;
    if (this._edgeRaf || this.dead) return;
    this._edgeRaf = requestAnimationFrame(function () {
      self._edgeRaf = 0;
      var b = self.q('.p-body');
      if (!b || self.dead) return;
      self.panel.classList.toggle('has-more', b.clientHeight > 48 && b.scrollHeight - b.scrollTop - b.clientHeight > 8);
    });
  };
  P.refresh = function () {
    var on = document.documentElement.getAttribute('data-mode') === 'sheet';
    if (on === this.enabled) { if (on) this.reflow(); return; }
    this.enabled = on;
    if (on) { this.first = true; this.snap(this.state && this.state !== 'fit' ? this.state : 'half', { instant: true }); }
    else {
      this.panel.style.height = ''; this.lay.style.removeProperty('--sheet-h'); this.lay.removeAttribute('data-snap'); this.lay.removeAttribute('data-room'); this.panel.classList.remove('is-peek');
      if (this.map) this.map.setInsets({}, false);
    }
  };
  P.destroy = function () {
    this.dead = true;
    g.removeEventListener('resize', this._resize);
    g.removeEventListener('vnmode', this._mode);
    document.removeEventListener('pointermove', this._move);
    document.removeEventListener('pointerup', this._up);
    document.removeEventListener('pointercancel', this._up);
    if (this.ro) { try { this.ro.disconnect(); } catch (e) { /* yok say */ } this.ro = null; }
    if (this.mo) { try { this.mo.disconnect(); } catch (e) { /* yok say */ } this.mo = null; }
  };

  g.Sheet = Sheet;
})(typeof window !== 'undefined' ? window : globalThis);

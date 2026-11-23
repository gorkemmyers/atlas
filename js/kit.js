/* kit.js — ORTAK BİLEŞENLER (tek çatı).
   Uygulamadaki her harita ve her fotoğraf buradan geçer; sekmeler bunları yeniden icat etmez.

   1) Kit.cfg(map)       Harita ayarları: her MapView kurulurken OTOMATİK eklenir (map.js).
                         Aynı düğme, aynı yer, aynı pencere: Zemin · Etiketler · Renk · Renklerin anlamı.
                         Görünümler yalnızca satırları doldurur: map.cfg.labels({...}), map.cfg.colors({...}),
                         map.cfg.legend(fn), map.cfg.lock('labels', 'neden').
   2) Kit.carousel(set)  Kaydırmalı fotoğraf galerisi (parmakla kaydır, dokununca büyüt, yazar/lisans satırı).
   3) Kit.photo(key)     Fotoğraf kayıt defteri (js/photos.js) üzerinden adres ve künye.
   Çizimler (js/figures.js): kayıt defterindeki girdi {svg, d, legend, cap, by, lic} ise aynı galeri onu da gösterir (Kit.isFig). */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, h = U.h;
  var Kit = {};

  /* =====================================================================
   * 1. HARİTA AYARLARI
   * ===================================================================== */
  var LOCK_NOTE = 'Bu ekranda sabit';

  function MapCfg(map) {
    var self = this;
    this.map = map;
    this.rows = { labels: null, color: null, routes: null };
    this.locks = {};
    this.legendFn = null;
    this.sheet = null;
    this.isOpen = false;
    this.badge = h('i', { 'class': 'btn-dot', hidden: true });
    this.btn = h('button', {
      type: 'button', 'class': 'map-btn map-cfg-btn', id: 'map-settings-btn', title: 'Harita ayarları',
      'aria-label': 'Harita ayarları', 'aria-expanded': 'false', 'aria-haspopup': 'dialog', 'aria-controls': 'map-settings-pop',
      onclick: function () { self.toggle(); }
    }, UI.icon('layers', 18), this.badge);
    this.body = h('div', { 'class': 'mc-body' });
    this.pop = h('div', { 'class': 'map-cfg', id: 'map-settings-pop', role: 'dialog', 'aria-label': 'Harita ayarları', hidden: true, 'data-ui': '1' },
      h('div', { 'class': 'mc-head' }, h('b', {}, 'Harita ayarları'),
        h('button', { type: 'button', 'class': 'icon-btn mc-x', 'aria-label': 'Ayarları kapat', onclick: function () { self.close(); } }, UI.icon('x', 16))),
      this.body);
    this.pop.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.lg-row')) setTimeout(function () { self.close(); }, 0);
    });
    this._key = function (e) { if (e.key === 'Escape' && self.isOpen) { e.stopPropagation(); self.close(); self.btn.focus(); } };
    this._away = function (e) {
      if (!self.isOpen) return;
      var t = e.target;
      if (t && t.closest && (t.closest('.map-cfg') || t.closest('.map-cfg-btn'))) return;
      self.close();
    };
  }
  MapCfg.prototype = {
    /* satır tanımı: { options:[{v,label,title}], value, onChange(v), def } */
    labels: function (d) { this.rows.labels = d; this.locks.labels = null; this._dirty(); return this; },
    colors: function (d) { this.rows.color = d; this.locks.color = null; this._dirty(); return this; },
    /* isteğe bağlı satır: yol çizgileri olan sayfalar (Rusya/Yollar) doldurur; boşsa satır hiç görünmez */
    routes: function (d) { this.rows.routes = d; this._dirty(); return this; },
    lock: function (id, why) { this.locks[id] = why || LOCK_NOTE; if (this.isOpen) this.render(); return this; },
    unlock: function (id) { this.locks[id] = null; if (this.isOpen) this.render(); return this; },
    legend: function (fn) { this.legendFn = fn; if (this.isOpen) this.render(); return this; },
    /* satırın görünür değeri değişti (başka yerden): yeniden çiz */
    refresh: function () { this._dirty(); if (this.isOpen) this.render(); },
    /* varsayılandan farklı bir ayar varsa düğmede nokta */
    _dirty: function () {
      var d = false;
      ['labels', 'color', 'routes'].forEach(function (k) {
        var r = this.rows[k];
        if (r && r.def != null && String(r.value) !== String(r.def)) d = true;
      }, this);
      this.badge.hidden = !d;
    },
    toggle: function () { if (this.isOpen) this.close(); else this.open(); },
    open: function () {
      if (this.isOpen) return;
      this.isOpen = true;
      this.render();
      this.pop.hidden = false;
      this.btn.classList.add('on');
      this.btn.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', this._key, true);
      document.addEventListener('pointerdown', this._away, true);
      /* dar ekranda alt panel haritayı kapatır: ayarlar görünsün diye paneli küçült */
      var sh = this.sheet;
      if (sh && sh.enabled && sh.state && sh.state !== 'peek') this._reopen = sh.state, sh.snap('peek');
    },
    close: function () {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.pop.hidden = true;
      this.btn.classList.remove('on');
      this.btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', this._key, true);
      document.removeEventListener('pointerdown', this._away, true);
      this._reopen = null;
    },
    _field: function (title, node) { return h('div', { 'class': 'field' }, h('h4', {}, title), node); },
    _static: function (text, why) {
      return h('p', { 'class': 'mc-static' }, UI.icon('info', 14), h('span', {}, text + (why ? ' · ' + why : '')));
    },
    _rowFor: function (id, title, row) {
      var self = this, lock = this.locks[id];
      if (lock) return this._field(title, this._static(lock));
      if (!row) return this._field(title, this._static(LOCK_NOTE));
      function changed(v) {
        row.value = v;
        if (row.onChange) row.onChange(v);
        self._dirty();
        if (self.legendFn) self._renderLegend();
      }
      var total = row.options.reduce(function (n, o) { return n + String(o.label).length; }, 0);
      /* kısa seçenekler yan yana segment; uzun etiketler alt satıra sarılan çipler (taşma/üst üste binme olmasın) */
      if (row.options.length <= 3 && total <= 26) {
        return this._field(title, UI.seg(row.options, row.value, changed, { label: title }));
      }
      var wrap = h('div', { 'class': 'chips mc-chips', role: 'radiogroup', 'aria-label': title });
      function paint() {
        U.$$('.tchip', wrap).forEach(function (b) { var on = b.getAttribute('data-v') === String(row.value); b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
      }
      row.options.forEach(function (o) {
        wrap.appendChild(h('button', { type: 'button', 'class': 'tchip', role: 'radio', 'data-v': o.v, title: o.title || null, onclick: function () { if (String(row.value) !== String(o.v)) { changed(o.v); paint(); } } }, o.label));
      });
      paint();
      return this._field(title, wrap);
    },
    render: function () {
      var self = this, map = this.map;
      U.clear(this.body);
      /* Zemin: yerleşik vektör atlas (Natural Earth kamu malı) */
      var base = this._static('Sade atlas · yerleşik vektör harita');
      this.body.appendChild(this._field('Zemin', base));
      this.body.appendChild(this._rowFor('labels', 'Etiketler', this.rows.labels));
      this.body.appendChild(this._rowFor('color', 'Renk', this.rows.color));
      if (this.rows.routes) this.body.appendChild(this._rowFor('routes', this.rows.routes.title || 'Yollar', this.rows.routes));
      this.legendWrap = h('div', { 'class': 'field mc-legend' });
      this.body.appendChild(this.legendWrap);
      this._renderLegend();
    },
    _renderLegend: function () {
      if (!this.legendWrap) return;
      U.clear(this.legendWrap);
      if (!this.legendFn) { this.legendWrap.hidden = true; return; }
      var box = h('div', { 'class': 'legend' });
      this.legendFn(box);
      this.legendWrap.hidden = !box.childNodes.length;
      if (box.childNodes.length) { this.legendWrap.appendChild(h('h4', {}, 'Renklerin anlamı')); this.legendWrap.appendChild(box); }
    },
    destroy: function () { this.close(); }
  };

  /* renk anlamı satırları: items = [{cls,label,sub,ids}] — vurgula, dokununca yakınlaş */
  Kit.legendRows = function (box, items, map, o) {
    o = o || {};
    items.forEach(function (it) {
      box.appendChild(h('button', {
        type: 'button', 'class': 'lg-row', title: it.sub || '',
        onmouseenter: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids || [], 'hl-ctx'); },
        onmouseleave: function () { map.clearHighlight('hl-ctx'); },
        onclick: function () { map.clearHighlight('hl-ctx'); map.highlight(it.ids || [], 'hl-ctx'); if (it.ids && it.ids.length) map.fitTo(it.ids, { pad: o.pad || 40, maxK: o.maxK || 8 }); }
      }, h('i', { 'class': 'sw ' + it.cls }), h('b', {}, it.label), h('span', {}, it.sub || '')));
    });
  };

  /* MapView kurulurken çağrılır: düğmeyi ve pencereyi haritaya ekler */
  Kit.cfg = function (map) {
    var c = new MapCfg(map);
    map.cfg = c;
    return c;
  };
  Kit.cfgMount = function (map) {
    if (!map.cfg) return;
    if (map.ctrl) map.ctrl.appendChild(map.cfg.btn);
    map.host.appendChild(map.cfg.pop);
  };

  /* =====================================================================
   * 2. FOTOĞRAF KAYIT DEFTERİ
   * ===================================================================== */
  /* js/photos.js: window.PHOTOS = { anahtar: { f:'Dosya adı.jpg', by:'Yazar', lic:'CC BY-SA 4.0', cap:'ne / nerede' } }
     window.PHOTO_SETS = { kümeId: [anahtar, …] }
     js/photos-local.js: window.PHOTO_LOCAL = { anahtar: 'assets/photos/anahtar.jpg' }  (tools/fetch_photos.py doldurur) */
  function commonsFile(f, w) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f.replace(/ /g, '_')).replace(/%2F/g, '/') + '?width=' + (w || 960);
  }
  Kit.photo = function (key) { return (g.PHOTOS || {})[key] || null; };
  /* Özgün çizim (şekil): PHOTOS[k].svg dolu ise görüntü Commons'tan değil, satır içi SVG'den gelir (js/figures.js) */
  Kit.isFig = function (key) { var p = Kit.photo(key); return !!(p && p.svg); };
  Kit.photoSrc = function (key, w) {
    var p = Kit.photo(key);
    if (!p) return '';
    if (p.svg) { if (!p._u) p._u = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(p.svg); return p._u; }
    var loc = g.PHOTO_LOCAL && g.PHOTO_LOCAL[key];
    if (loc) return loc;
    return commonsFile(p.f, w);
  };
  Kit.photoPage = function (key) {
    var p = Kit.photo(key);
    return p && !p.svg ? 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(p.f.replace(/ /g, '_')) : '';
  };
  Kit.setKeys = function (setId) {
    var s = (g.PHOTO_SETS || {})[setId];
    return s ? s.filter(function (k) { return !!Kit.photo(k); }) : [];
  };
  var LIC_URLS = {
    'CC0': 'https://creativecommons.org/publicdomain/zero/1.0/',
    'Public domain': 'https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain',
    'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
    'CC BY 2.5': 'https://creativecommons.org/licenses/by/2.5/',
    'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
    'CC BY 3.0 br': 'https://creativecommons.org/licenses/by/3.0/br/',
    'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
    'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
    'CC BY-SA 2.5': 'https://creativecommons.org/licenses/by-sa/2.5/',
    'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
    'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/'
  };
  Kit.licenseUrl = function (lic) { return LIC_URLS[lic] || ''; };
  Kit.creditLine = function (key) {
    var p = Kit.photo(key);
    if (!p) return '';
    if (p.svg) return 'Çizim: ' + (p.by || 'Atlas') + ' · özgün şematik çizim (örnektir; renk ve oran yaklaşıktır)';
    var mod = (p.crop || (p.marks && p.marks.length)) ? ' (kırpıldı/işaretlendi)' : '';
    return 'Fotoğraf: ' + (p.by || 'bilinmiyor') + ' · ' + (p.lic || '') + mod + ' · Wikimedia Commons';
  };
  /* CC BY / CC BY-SA atıf düğümü: yazar, tıklanabilir lisans bağlantısı, uyarlama notu ve kaynak sayfa */
  Kit.fillCredit = function (el, key, opts) {
    opts = opts || {};
    U.clear(el);
    var p = Kit.photo(key);
    if (!p) return;
    if (p.svg) { el.textContent = Kit.creditLine(key); return; }
    el.appendChild(document.createTextNode('Fotoğraf: ' + (p.by || 'bilinmiyor') + ' · '));
    var lurl = Kit.licenseUrl(p.lic);
    if (lurl && !opts.quiz) {
      el.appendChild(h('a', { href: lurl, target: '_blank', rel: 'noopener noreferrer' }, p.lic || 'Lisans'));
    } else {
      el.appendChild(document.createTextNode(p.lic || ''));
    }
    if (!opts.quiz && (p.crop || (p.marks && p.marks.length))) {
      el.appendChild(document.createTextNode(' (kırpıldı/işaretlendi)'));
    }
    el.appendChild(document.createTextNode(' · Wikimedia Commons'));
    if (!opts.quiz && Kit.photoPage(key)) {
      el.appendChild(document.createTextNode(' · '));
      el.appendChild(h('a', { href: Kit.photoPage(key), target: '_blank', rel: 'noopener noreferrer' }, opts.longLink ? 'Kaynak sayfa' : 'Kaynak'));
    }
  };

  /* =====================================================================
   * 3. KAYDIRMALI FOTOĞRAF GALERİSİ
   * ===================================================================== */
  /* Görüntü HER ZAMAN kutuya sığar (dikey fotoğraf kırpılmaz). İsteğe bağlı iki özellik (kayıt defterinde, js/photos.js):
       p.d     = [genişlik, yükseklik]            özgün piksel boyutu (crop ve marks için ZORUNLU)
       p.crop  = [x, y, w, h]                     0–1: kartta yalnızca bu bölge büyütülmüş gösterilir (tam fotoğraf dokununca açılır)
       p.marks = [[x, y, w, h, 'etiket'], …]      0–1 (özgün görüntüye göre): "nereye bak" kutuları; numaralı, etiketler altta listelenir */
  function cropOf(p) { var c = p.crop || [0, 0, 1, 1]; return { x: c[0], y: c[1], w: c[2], h: c[3] }; }
  function markEls(p, c) {
    return (p.marks || []).map(function (m, i) {
      /* kutu çerçevenin sol kenarına çok yakınsa numara rozeti kutunun İÇİNE (sol üst köşe) konur; yoksa dışarıda kırpılırdı */
      var inside = (m[0] - c.x) / c.w < 0.08;
      return h('span', { 'class': 'pc-mark' + (inside ? ' pc-mark-in' : ''), 'aria-hidden': 'true',
        style: 'left:' + ((m[0] - c.x) / c.w * 100) + '%;top:' + ((m[1] - c.y) / c.h * 100) + '%;width:' + (m[2] / c.w * 100) + '%;height:' + (m[3] / c.h * 100) + '%' },
        h('b', {}, String(i + 1)));
    });
  }
  function legendEl(p) {
    if (p.legend && p.legend.length) {   /* çizimler: numaralı rozetler SVG'nin içinde, açıklamalar burada */
      return h('ol', { 'class': 'pc-legend' }, p.legend.map(function (t, i) { return h('li', {}, h('b', {}, String(i + 1)), ' ' + t); }));
    }
    var items = (p.marks || []).filter(function (m) { return !!m[4]; });
    if (!items.length) return null;
    return h('ol', { 'class': 'pc-legend' }, (p.marks || []).map(function (m, i) { return m[4] ? h('li', {}, h('b', {}, String(i + 1)), ' ' + m[4]) : null; }));
  }
  /* Commons küçük resim genişlikleri standart basamaklara yuvarlanır (330, 500, 960, 1280, 1920, 3840) */
  function stdWidth(w, max) {
    var steps = [500, 960, 1280, 1920], s = steps[steps.length - 1];
    for (var i = 0; i < steps.length; i++) { if (steps[i] >= w) { s = steps[i]; break; } }
    return max ? Math.min(s, Math.max(500, max)) : s;
  }

  var lightbox = null;
  function openLightbox(keys, start, lo) {
    lo = lo || {};
    if (lightbox) lightbox.close();
    var i = start || 0, prev = document.activeElement;
    var img = h('img', { 'class': 'lb-img', alt: '', decoding: 'async' });
    var frame = h('div', { 'class': 'lb-frame' }, img);
    var center = h('div', { 'class': 'lb-center' }, frame);
    var cap = h('p', { 'class': 'lb-cap' }), cr = h('p', { 'class': 'lb-credit' });
    var legend = h('div', { 'class': 'lb-legend-wrap' });
    var count = h('span', { 'class': 'lb-count' });
    function fit() {
      var p = Kit.photo(keys[i]), box = center.getBoundingClientRect();
      if (p && p.d && box.width > 0 && box.height > 0) {
        var r = p.d[0] / p.d[1], w = Math.min(box.width, box.height * r);
        frame.style.width = Math.round(w) + 'px'; frame.style.height = Math.round(w / r) + 'px';
        img.classList.add('lb-img-f');
      } else { frame.style.width = ''; frame.style.height = ''; img.classList.remove('lb-img-f'); }
    }
    function show(n) {
      i = (n + keys.length) % keys.length;
      var p = Kit.photo(keys[i]);
      img.src = Kit.photoSrc(keys[i], p && p.crop ? 1920 : 1280);
      img.alt = lo.quiz ? 'Fotoğraf' : (p ? (p.cap || '') : '');
      cap.textContent = lo.quiz ? '' : (p ? (p.cap || '') : '');
      cap.hidden = !!lo.quiz || !cap.textContent;
      Array.prototype.slice.call(frame.querySelectorAll('.pc-mark')).forEach(function (m) { frame.removeChild(m); });
      U.clear(legend);
      if (p && p.d && !lo.quiz) {
        markEls(p, { x: 0, y: 0, w: 1, h: 1 }).forEach(function (m) { frame.appendChild(m); });
        var lg = legendEl(p); if (lg) legend.appendChild(lg);
      }
      Kit.fillCredit(cr, keys[i], { quiz: !!lo.quiz, longLink: true });
      count.textContent = (i + 1) + ' / ' + keys.length;
      fit();
    }
    var back = h('div', { 'class': 'lb', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Fotoğraf', onclick: function (e) { if (e.target === back || e.target.classList.contains('lb-stage') || e.target === center) close(); } },
      h('div', { 'class': 'lb-top' }, count,
        h('button', { type: 'button', 'class': 'icon-btn lb-x', 'aria-label': 'Kapat', onclick: function () { close(); } }, UI.icon('x', 20))),
      h('div', { 'class': 'lb-stage' },
        keys.length > 1 ? h('button', { type: 'button', 'class': 'icon-btn lb-nav lb-prev', 'aria-label': 'Önceki fotoğraf', onclick: function (e) { e.stopPropagation(); show(i - 1); } }, UI.icon('back', 20)) : null,
        center,
        keys.length > 1 ? h('button', { type: 'button', 'class': 'icon-btn lb-nav lb-next', 'aria-label': 'Sonraki fotoğraf', onclick: function (e) { e.stopPropagation(); show(i + 1); } }, UI.icon('arrow', 20)) : null),
      h('div', { 'class': 'lb-info' }, cap, legend, cr));
    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
      else if (e.key === 'ArrowLeft') show(i - 1);
      else if (e.key === 'ArrowRight') show(i + 1);
    }
    var x0 = null;
    back.addEventListener('touchstart', function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    back.addEventListener('touchend', function (e) {
      if (x0 == null || !e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? i + 1 : i - 1);
    }, { passive: true });
    function close() {
      document.removeEventListener('keydown', onKey, true);
      g.removeEventListener('resize', fit);
      if (back.parentNode) back.parentNode.removeChild(back);
      document.documentElement.classList.remove('lb-open');
      lightbox = null;
      if (prev && prev.focus) { try { prev.focus({ preventScroll: true }); } catch (e) { /* yok say */ } }
    }
    document.body.appendChild(back);
    document.documentElement.classList.add('lb-open');
    document.addEventListener('keydown', onKey, true);
    g.addEventListener('resize', fit);
    show(i);
    var cb = back.querySelector('.lb-x'); if (cb) cb.focus();
    lightbox = { close: close };
  }
  Kit.lightbox = openLightbox;

  /* set: kümeId (PHOTO_SETS) ya da anahtar dizisi.
     opts: { compact, label, quiz }  — quiz:true → açıklama/işaretler gizlenir (cevabı sızdırmasın) */
  Kit.carousel = function (set, opts) {
    opts = opts || {};
    var keys = Array.isArray(set) ? set.filter(function (k) { return !!Kit.photo(k); }) : Kit.setKeys(set);
    var fig = h('figure', { 'class': 'pc' + (opts.compact ? ' pc-compact' : ''), 'data-set': Array.isArray(set) ? keys.join(',') : set, 'data-n': String(keys.length) });
    if (!keys.length) {
      fig.classList.add('pc-empty');
      fig.appendChild(h('div', { 'class': 'pc-ph' }, 'Fotoğraf eklenmedi'));
      return fig;
    }
    var track = h('div', { 'class': 'pc-track', tabindex: keys.length > 1 ? '0' : null, role: 'group', 'aria-roledescription': 'galeri', 'aria-label': opts.label || 'Fotoğraflar' });
    var credit = h('p', { 'class': 'pc-credit' });
    var count = h('span', { 'class': 'pc-count', 'aria-live': 'polite' });
    var capEl = h('p', { 'class': 'pc-cap' });
    var legendBox = h('div', { 'class': 'pc-legend-wrap' });
    var cur = 0;
    var slides = keys.map(function (k, idx) {
      var p = Kit.photo(k);
      var c = cropOf(p), w = p.crop ? stdWidth(380 / c.w * 1.4, p.d ? p.d[0] : 0) : 960;
      var im = h('img', { 'class': 'pc-img', alt: opts.quiz ? 'Fotoğraf' : (p.cap || ''), loading: idx === 0 ? 'eager' : 'lazy', decoding: 'async', draggable: 'false', src: Kit.photoSrc(k, w) });
      var art = im;
      if (p.d) {     // çerçeveli gösterim (kırpma / işaretler): çerçeve, kırpılmış bölgenin en-boy oranında ve kutuya sığar
        var ar = (c.w * p.d[0]) / (c.h * p.d[1]), sa = opts.compact ? 1.6 : 4 / 3;
        art = h('div', { 'class': 'pc-frame', style: 'width:' + (Math.min(1, ar / sa) * 100) + '%;height:' + (Math.min(1, sa / ar) * 100) + '%' }, im);
        im.className = 'pc-img pc-img-f';
        im.style.cssText = 'width:' + (100 / c.w) + '%;height:' + (100 / c.h) + '%;left:' + (-c.x / c.w * 100) + '%;top:' + (-c.y / c.h * 100) + '%';
        if (!opts.quiz) markEls(p, c).forEach(function (m) { art.appendChild(m); });
      }
      var btn = h('button', { type: 'button', 'class': 'pc-open', 'aria-label': 'Fotoğrafı büyüt', onclick: function (e) { e.stopPropagation(); openLightbox(keys, idx, { quiz: !!opts.quiz }); } }, art);
      im.addEventListener('error', function () {
        var ph = h('div', { 'class': 'pc-ph' }, (p.svg ? 'Çizim yüklenemedi' : 'Fotoğraf yüklenemedi '), p.svg ? null : h('a', { href: Kit.photoPage(k), target: '_blank', rel: 'noopener' }, 'Kaynağı aç'));
        if (art.parentNode) art.parentNode.replaceChild(ph, art);
      });
      var s = h('div', { 'class': 'pc-slide' + (p.svg ? ' pc-slide-fig' : ''), 'data-k': k, role: 'group', 'aria-roledescription': 'fotoğraf', 'aria-label': (idx + 1) + ' / ' + keys.length }, btn);
      track.appendChild(s);
      return s;
    });
    function paint(n) {
      cur = Math.max(0, Math.min(keys.length - 1, n));
      var p = Kit.photo(keys[cur]);
      capEl.textContent = opts.quiz ? '' : (p.cap || '');
      capEl.hidden = opts.quiz || !p.cap;
      U.clear(legendBox);
      if (!opts.quiz && p.d) { var lg = legendEl(p); if (lg) legendBox.appendChild(lg); }
      Kit.fillCredit(credit, keys[cur], { quiz: !!opts.quiz });
      count.textContent = (cur + 1) + ' / ' + keys.length;
      fig.setAttribute('data-cur', String(cur));
    }
    function go(n) {
      n = Math.max(0, Math.min(keys.length - 1, n));
      var s = slides[n];
      if (track.scrollTo) track.scrollTo({ left: s.offsetLeft - track.offsetLeft, behavior: U.reducedMotion() ? 'auto' : 'smooth' });
      else track.scrollLeft = s.offsetLeft - track.offsetLeft;
      paint(n);
    }
    var tick = 0;
    track.addEventListener('scroll', function () {
      if (tick) return;
      tick = requestAnimationFrame(function () {
        tick = 0;
        var w = track.clientWidth || 1;
        var n = Math.round(track.scrollLeft / w);
        if (n !== cur) paint(n);
      });
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    fig.appendChild(track);
    if (keys.length > 1) {
      fig.appendChild(h('div', { 'class': 'pc-bar' },
        h('button', { type: 'button', 'class': 'icon-btn pc-btn', 'aria-label': 'Önceki fotoğraf', onclick: function () { go(cur - 1); } }, UI.icon('back', 16)),
        count,
        h('button', { type: 'button', 'class': 'icon-btn pc-btn', 'aria-label': 'Sonraki fotoğraf', onclick: function () { go(cur + 1); } }, UI.icon('arrow', 16))));
    }
    fig.appendChild(capEl);
    fig.appendChild(legendBox);
    fig.appendChild(credit);
    paint(0);
    return fig;
  };

  /* Sözleşme: testler ve kurallar dosyası bu listeye bakar */
  Kit.CONTRACT = {
    mapSettingsButton: '#map-settings-btn',
    mapSettingsPopover: '#map-settings-pop',
    photoCarousel: 'figure.pc'
  };

  g.Kit = Kit;
})(typeof window !== 'undefined' ? window : globalThis);

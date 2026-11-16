/* util.js — küçük yardımcılar (DOM, rastgele, biçim) */
(function (g) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function applyAttrs(el, a) {
    if (!a) return el;
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v == null || v === false) return;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    return el;
  }
  function append(el, kids) {
    for (var i = 0; i < kids.length; i++) {
      var c = kids[i];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) append(el, c);
      else el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return el;
  }
  function h(tag, a) {
    return append(applyAttrs(document.createElement(tag), a), Array.prototype.slice.call(arguments, 2));
  }
  function s(tag, a) {
    return append(applyAttrs(document.createElementNS(NS, tag), a), Array.prototype.slice.call(arguments, 2));
  }

  var U = {
    h: h,
    s: s,
    $: function (sel, root) { return (root || document).querySelector(sel); },
    $$: function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); },
    clear: function (el) { while (el.firstChild) el.removeChild(el.firstChild); return el; },
    esc: function (str) {
      return String(str).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    fold: function (str) {
      return String(str == null ? '' : str)
        .replace(/İ/g, 'i').replace(/ı/g, 'i')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd').toLowerCase();
    },
    clamp: function (v, a, b) { return Math.min(b, Math.max(a, v)); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    rand: function (n) { return Math.floor(Math.random() * n); },
    pick: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    sample: function (arr, n) { return U.shuffle(arr).slice(0, n); },
    /* ağırlıklı seçim: wfn(item) -> sayı */
    weighted: function (arr, wfn) {
      var tot = 0, ws = arr.map(function (x) { var w = Math.max(0, wfn(x)); tot += w; return w; });
      if (!arr.length) return null;
      if (tot <= 0) return arr[Math.floor(Math.random() * arr.length)];
      var r = Math.random() * tot;
      for (var i = 0; i < arr.length; i++) { r -= ws[i]; if (r <= 0) return arr[i]; }
      return arr[arr.length - 1];
    },
    /* ağırlıklı, tekrarsız n eleman */
    weightedN: function (arr, n, wfn) {
      var pool = arr.slice(), out = [];
      while (out.length < n && pool.length) {
        var it = U.weighted(pool, wfn);
        out.push(it);
        pool.splice(pool.indexOf(it), 1);
      }
      return out;
    },
    uniq: function (arr) { return Array.from(new Set(arr)); },
    debounce: function (fn, ms) {
      var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); };
    },
    /* rAF ile birleştirilmiş çağrı */
    frame: function (fn) {
      var q = false;
      return function () { if (q) return; q = true; requestAnimationFrame(function () { q = false; fn(); }); };
    },
    fmtInt: function (n) { return Math.round(n).toLocaleString('tr-TR'); },
    fmtKm: function (km) { return km < 10 ? km.toFixed(1).replace('.', ',') + ' km' : Math.round(km).toLocaleString('tr-TR') + ' km'; },
    fmtPct: function (x) { return Math.round(x * 100) + '%'; },
    fmtTime: function (sec) { sec = Math.round(sec); var m = Math.floor(sec / 60), r = sec % 60; return m + ':' + (r < 10 ? '0' : '') + r; },
    today: function () {
      var d = new Date();
      return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    },
    reducedMotion: function () {
      try { return g.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    },
    /* panel gövdesini en üste al ya da verilen öğeyi başlığın altına getir.
       Alt panel kapalıysa (peek) önce yarıya açar. */
    toPanel: function (el, instant) {
      var body = document.querySelector('#view .p-body');
      if (!body) return;
      if (!el) { body.scrollTop = 0; return; }
      var a = g.VNApp, sh = a && a.sheet;
      if (sh && sh.enabled) sh.ensure('half');
      var top = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 6;
      /* instant: soru akışında hızlı geçişte yarım kalan yumuşak kaydırma bir sonraki ekrana taşmasın */
      try { body.scrollTo({ top: Math.max(0, top), behavior: instant || U.reducedMotion() ? 'auto' : 'smooth' }); } catch (e) { body.scrollTop = Math.max(0, top); }
    },
    copy: function (text) {
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        return ok;
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(); });
        }
      } catch (e) { /* düş */ }
      return Promise.resolve(fallback());
    }
  };
  g.U = U;
})(typeof window !== 'undefined' ? window : globalThis);

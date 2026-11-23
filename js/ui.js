/* ui.js — simgeler, çipler, kartlar, kip penceresi, bildirim */
(function (g) {
  'use strict';
  var U = g.U, D = g.VN_DATA, h = U.h, s = U.s;

  /* 24×24, çizgi tabanlı simgeler */
  var ICONS = {
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    fit: 'M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4',
    map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
    book: 'M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z',
    target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
    chart: 'M5 20V10M12 20V4M19 20v-7',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    x: 'M6 6l12 12M18 6L6 18',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    back: 'M19 12H5M11 6l-6 6 6 6',
    refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6',
    layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5',
    phone: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2',
    langs: 'M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6',
    flame: 'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1.2 2 2 2 0-3-1-5 1-8z',
    trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a3 3 0 0 0 3 3M16 6h4v1a3 3 0 0 1-3 3M12 13v4M8 21h8M10 17h4',
    palette: 'M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.5-1.8-.4-1.2.4-2.2 1.6-2.2H17a4 4 0 0 0 4-4c0-5-4-10-9-10zM7.5 11h.01M10 7h.01M15 7.5h.01',
    tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
    copy: 'M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15V5a1 1 0 0 1 1-1h10',
    info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01',
    trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
    list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
    flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
    skip: 'M5 5l8 7-8 7zM17 5v14',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
    home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-6h4v6',
    chevd: 'M6 9l6 6 6-6',
    chev: 'M9 6l6 6-6 6',
    road: 'M8 3 4 21M16 3l4 18M12 5v3M12 11v3M12 17v3',
    sign: 'M12 2v20M5 5h11l3 3-3 3H5zM19 13H8l-3 3 3 3h11z',
    bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
    camera: 'M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
    globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'
  };
  function icon(name, size) {
    size = size || 18;
    return s('svg', { 'class': 'ic', width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' },
      s('path', { d: ICONS[name] || ICONS.info }));
  }

  var UI = { icon: icon };
  var Bank = function () { return g.Bank; };

  /* ---------- çipler ---------- */
  UI.area = function (area) { return h('span', { 'class': 'area', title: 'Alan kodu 0' + area }, '0' + area); };
  UI.code = function (code, label) {
    var text = String(code);
    return h('span', { 'class': 'area', title: (label || 'Kod') + ': ' + text }, text);
  };
  UI.regionChip = function (rid, o) {
    var r = D.regionById[rid];
    return h('span', { 'class': 'rchip' + (o && o.sm ? ' rchip-sm' : '') }, h('i', { 'class': 'sw q' + Bank().regIdx[rid] }), r.short);
  };
  UI.swatch = function (idx) { return h('i', { 'class': 'sw q' + idx }); };
  UI.pill = function (text, cls) { return h('span', { 'class': 'pill' + (cls ? ' ' + cls : '') }, text); };
  UI.navChip = function (label, onclick, sub) {
    return h('button', { type: 'button', 'class': 'chip', onclick: onclick }, label, sub ? h('small', {}, sub) : null);
  };
  UI.empty = function (title, text, actions) {
    return h('div', { 'class': 'empty' }, h('div', { 'class': 'empty-t' }, title), text ? h('p', {}, text) : null, actions ? h('div', { 'class': 'row' }, actions) : null);
  };

  /* ---------- seçici denetimler ---------- */
  UI.seg = function (opts, value, onChange, cfg) {
    cfg = cfg || {};
    var el = h('div', { 'class': 'seg' + (cfg.cls ? ' ' + cfg.cls : ''), role: 'radiogroup', 'aria-label': cfg.label || null });
    var btns = opts.map(function (o) {
      return h('button', {
        type: 'button', 'class': 'seg-b', role: 'radio', 'data-v': o.v, title: o.title || null,
        onclick: function () { if (String(value) !== String(o.v)) { set(o.v); onChange(o.v); } }
      }, o.icon ? icon(o.icon, 16) : null, h('span', {}, o.label));
    });
    var scroller = /(^|\s)seg-scroll(\s|$)/.test(cfg.cls || ''), activeBtn = null;
    /* kaydırılabilir şerit: kırpılan kenarda solma ipucu + etkin sekmeyi görünür tut */
    function fade() {
      var max = el.scrollWidth - el.clientWidth, x = el.scrollLeft, l = x > 4, r = x < max - 4;
      el.setAttribute('data-fade', max <= 1 ? '' : (l && r ? 'lr' : l ? 'l' : r ? 'r' : ''));
    }
    function reveal() {
      if (!activeBtn) return;
      var er = el.getBoundingClientRect(), br = activeBtn.getBoundingClientRect();
      if (!er.width) return;
      var pad = 30, dl = br.left - pad - er.left, dr = br.right + pad - er.right, dx = dl < 0 ? dl : (dr > 0 ? dr : 0);
      if (!dx) return;
      var to = Math.max(0, el.scrollLeft + dx);
      if (el.scrollTo) el.scrollTo({ left: to, behavior: U.reducedMotion() ? 'auto' : 'smooth' }); else el.scrollLeft = to;
    }
    function set(v) {
      value = v;
      btns.forEach(function (b) {
        var on = b.getAttribute('data-v') === String(v);
        b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
        if (on) activeBtn = b;
      });
      if (scroller) reveal();
    }
    btns.forEach(function (b) { el.appendChild(b); });
    el.set = set; set(value);
    if (scroller) {
      el.addEventListener('scroll', fade, { passive: true });
      if (g.ResizeObserver) new g.ResizeObserver(function () { fade(); reveal(); }).observe(el);
      else g.requestAnimationFrame(function () { fade(); reveal(); });
    }
    return el;
  };
  /* çoklu seçim çipleri; sel: dizi */
  UI.multi = function (opts, sel, onChange, cfg) {
    cfg = cfg || {};
    var set = new Set(sel);
    var el = h('div', { 'class': 'chips' + (cfg.cls ? ' ' + cfg.cls : ''), role: 'group', 'aria-label': cfg.label || null });
    var btns = opts.map(function (o) {
      var b = h('button', {
        type: 'button', 'class': 'tchip', 'aria-pressed': 'false', 'data-v': o.v,
        onclick: function () {
          if (set.has(o.v)) { if (set.size > (cfg.min || 0)) set.delete(o.v); } else set.add(o.v);
          paint(); onChange(Array.from(set));
        }
      }, o.swatch != null ? h('i', { 'class': 'sw q' + o.swatch }) : null, o.label);
      el.appendChild(b); return b;
    });
    function paint() {
      btns.forEach(function (b) { var on = set.has(b.getAttribute('data-v')); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    }
    el.get = function () { return Array.from(set); };
    el.setAll = function (arr) { set = new Set(arr); paint(); };
    paint();
    return el;
  };

  /* ---------- bildirim ve kip penceresi ---------- */
  UI.toast = function (msg, kind) {
    var host = document.getElementById('toasts');
    if (!host) { host = h('div', { id: 'toasts', 'aria-live': 'polite' }); document.body.appendChild(host); }
    var t = h('div', { 'class': 'toast' + (kind ? ' toast-' + kind : ''), role: 'status' }, msg);
    host.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 250); }, 2400);
  };
  UI.modal = function (o) {
    return new Promise(function (resolve) {
      var prev = document.activeElement;
      var done = function (v) {
        document.removeEventListener('keydown', onKey, true);
        if (back.parentNode) back.parentNode.removeChild(back);
        if (prev && prev.focus) { try { prev.focus({ preventScroll: true }); } catch (e) { /* yok say */ } }
        resolve(v);
      };
      var onKey = function (e) {
        if (e.key === 'Escape') { e.stopPropagation(); done(null); }
        else if (e.key === 'Tab') {
          var f = U.$$('button, input, textarea, [href]', dlg).filter(function (x) { return !x.disabled; });
          if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      var actions = (o.actions || [{ label: 'Tamam', primary: true, value: true }]).map(function (a) {
        return h('button', { type: 'button', 'class': 'btn' + (a.primary ? ' btn-primary' : '') + (a.danger ? ' btn-danger' : ''), onclick: function () { done(typeof a.get === 'function' ? a.get() : a.value); } }, a.label);
      });
      var dlg = h('div', { 'class': 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': o.title },
        h('h3', {}, o.title), o.body ? h('div', { 'class': 'modal-body' }, o.body) : null,
        h('div', { 'class': 'modal-actions' }, actions));
      var back = h('div', { 'class': 'modal-back', onmousedown: function (e) { if (e.target === back) done(null); } }, dlg);
      document.body.appendChild(back);
      document.addEventListener('keydown', onKey, true);
      var first = U.$('textarea, input, .btn-primary, .btn', dlg);
      if (first) first.focus();
    });
  };

  /* ---------- kartlar ---------- */
  function fact(label, val) {
    return h('div', { 'class': 'fact' }, h('dt', {}, label), h('dd', {}, val));
  }
  UI.fact = fact;

  /* il kartı. o: {onSelect(id), onRule(ruleId)} */
  UI.provCard = function (id, o) {
    o = o || {};
    var B = Bank(), p = D.pById[id];
    var nb = (g.VN_GEO.p[id].nb || []).map(function (x) { return B.shortName(D.pById[x]); });
    var el = h('article', { 'class': 'pcard' },
      h('header', { 'class': 'pc-head' },
        h('div', { 'class': 'pc-title' },
          h('h3', {}, p.vi),
          h('div', { 'class': 'pc-sub' }, B.typeTR(p.type) + (p.en ? ' · ' + p.en : ''))),
        UI.regionChip(p.region)),
      h('dl', { 'class': 'facts' },
        fact('Alan kodu', UI.area(p.area)),
        fact('Merkez', hasCapTxt(p))),
      h('p', { 'class': 'cue' }, p.cue),
      UI.nameBlock(id, { onRule: o.onRule }),
      h('div', { 'class': 'chips-sec' },
        h('h4', {}, 'Tanınan yerler'),
        h('div', { 'class': 'chips' }, p.places.map(function (x) { return h('span', { 'class': 'chip chip-static' }, x); }))),
      h('div', { 'class': 'chips-sec' },
        h('h4', {}, 'Komşu iller'),
        h('div', { 'class': 'chips' }, (g.VN_GEO.p[id].nb || []).map(function (x) {
          return o.onSelect ? UI.navChip(B.shortName(D.pById[x]), function () { o.onSelect(x); }) : h('span', { 'class': 'chip chip-static' }, B.shortName(D.pById[x]));
        }))));
    el.setAttribute('data-nb', nb.length);
    return el;
  };
  function hasCapTxt(p) { return /şehri/i.test(p.cap) ? p.vi.replace(/^TP\.\s*/, '') : p.cap; }

  /* bölge kartı */
  UI.regionCard = function (rid, o) {
    o = o || {};
    var B = Bank(), r = D.regionById[rid], ps = D.provinces.filter(function (p) { return p.region === rid; });
    return h('article', { 'class': 'pcard' },
      h('header', { 'class': 'pc-head' },
        h('div', { 'class': 'pc-title' }, h('h3', {}, r.tr), h('div', { 'class': 'pc-sub' }, r.vi + ' · ' + D.macroById[r.macro].tr + ' (' + D.macroById[r.macro].vi + ')')),
        h('span', { 'class': 'rchip' }, h('i', { 'class': 'sw q' + B.regIdx[rid] }), ps.length + ' il')),
      h('p', { 'class': 'cue' }, r.cue),
      h('div', { 'class': 'chips-sec' }, h('h4', {}, 'İller'),
        h('div', { 'class': 'chips' }, ps.map(function (p) {
          return o.onSelect ? UI.navChip(B.shortName(p), function () { o.onSelect(p.id); }, '0' + p.area) : h('span', { 'class': 'chip chip-static' }, B.shortName(p));
        }))));
  };

  /* ---------- il adı mantığı ---------- */
  /* güvenilirlik göstergesi: 0 Yok · 1 Zayıf · 2 İyi · 3 Güçlü */
  UI.rel = function (st) {
    var N = g.Names, l = N.stLabel(st);
    return h('span', { 'class': 'rel', 'data-s': st, title: 'Adın konum verme gücü: ' + l.t + ' — ' + l.long },
      h('span', { 'class': 'rel-dots', 'aria-hidden': 'true' }, [0, 1, 2].map(function (i) { return h('i', { 'class': i < st ? 'on' : '' }); })),
      h('b', {}, l.t));
  };
  UI.famChip = function (fam) {
    return h('span', { 'class': 'famchip' }, h('i', { 'class': 'sw ' + fam.cls }), fam.label);
  };
  function goRule(ruleId) {
    var a = g.VNApp;
    if (!a) return;
    a.launch = { rule: ruleId };
    a.go('iladlari', 'vietnam');
  }
  UI.goRule = goRule;
  /* il adı bloğu. pid: il kimliği. o: { onRule(ruleId) } */
  UI.nameBlock = function (pid, o) {
    o = o || {};
    var N = g.Names, inf = N.info(pid);
    if (!inf) return null;
    var fam = N.famById[inf.fam];
    return h('section', { 'class': 'nameblk ' + fam.cls, 'data-fam': fam.id, 'aria-label': 'Adın mantığı' },
      h('div', { 'class': 'nb-head' }, h('h4', {}, icon('tag', 14), 'Adın mantığı'), UI.rel(inf.s)),
      h('div', { 'class': 'syls' }, inf.syl.map(function (x) { return h('span', { 'class': 'syl' }, h('b', {}, x[0]), h('i', {}, x[1])); })),
      h('p', { 'class': 'nb-mean' }, inf.mean),
      h('p', { 'class': 'nb-tell' }, inf.tell + (inf.dis ? ' (köken tartışmalı)' : '')),
      h('div', { 'class': 'nb-foot' }, UI.famChip(fam),
        h('button', { type: 'button', 'class': 'linkish', onclick: function () { (o.onRule || goRule)(fam.rule); } }, 'Kurala git')));
  };

  /* ---------- İpucu kutusu ----------
     steps: [{k, t, ids?, layer?}] · o: { onStep(step, index, replay), note, id }
     Her basışta bir adım daha açılır; adım kutusuna basınca haritadaki vurgu yenilenir. */
  UI.hintBox = function (steps, o) {
    o = o || {};
    steps = steps || [];
    var shown = 0, locked = false;
    var list = h('ol', { 'class': 'hint-list', 'aria-live': 'polite' });
    var lbl = h('span', { 'class': 'hint-lbl' });
    var cnt = h('span', { 'class': 'hint-cnt' });
    var btn = h('button', { type: 'button', 'class': 'hint-btn', id: o.id || 'q-hint', onclick: function () { api.press(); } },
      icon('bulb', 17), lbl, cnt);
    var note = h('p', { 'class': 'micro hint-note' }, o.note || 'İpucu açılan soru ustalığa sayılmaz.');
    /* çubuk (düğme) ve kutu (not + adımlar) ayrı taşınabilir: ekran düzeni çubuğu alt şeride, adımları gövdeye koyar */
    var barEl = h('div', { 'class': 'hint-bar' }, btn, h('kbd', { 'class': 'hint-key', title: 'Klavye kısayolu', 'aria-hidden': 'true' }, 'H'));
    var box = h('div', { 'class': 'hint-panel' }, note, list);
    var el = h('div', { 'class': 'hintbox' + (steps.length ? '' : ' is-empty') }, barEl, box);
    function paintBtn() {
      var done = shown >= steps.length;
      btn.disabled = locked || done || !steps.length;
      btn.classList.toggle('used', shown > 0);
      lbl.textContent = !steps.length ? 'Bu soruda ipucu yok' : locked && shown === 0 ? 'İpucu kapandı' : done && shown > 0 ? 'Tüm ipuçları açıldı' : shown ? 'Sonraki ipucu' : 'İpucu göster';
      cnt.textContent = steps.length && shown ? shown + ' / ' + steps.length : '';
      note.hidden = shown > 0 || locked;
    }
    function stepEl(st, i) {
      var has = !!(st.ids && st.ids.length);
      var li = h('li', { 'class': 'hint-step' + (has ? ' has-map' : ''), tabindex: has ? '0' : null, role: has ? 'button' : null, title: has ? 'Haritada göster' : null },
        h('span', { 'class': 'hk' }, st.k), h('span', { 'class': 'ht' }, st.t));
      if (has && o.onStep) {
        var again = function () { o.onStep(st, i, true); };
        li.addEventListener('click', again);
        li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); again(); } });
      }
      return li;
    }
    var api = {
      el: el, bar: barEl, box: box,
      steps: steps,
      get count() { return shown; },
      get total() { return steps.length; },
      press: function () {
        if (locked || shown >= steps.length) return false;
        var st = steps[shown], li = stepEl(st, shown);
        shown++;
        list.appendChild(li);
        paintBtn();
        if (o.onStep) o.onStep(st, shown - 1, false);
        /* yeni adım görünsün (yalnızca gövdeyi kaydır: scrollIntoView gizli panelleri de oynatır) */
        var sc = li.closest ? li.closest('.p-body') : null;
        if (sc) { var lr = li.getBoundingClientRect(), br = sc.getBoundingClientRect(); if (lr.bottom > br.bottom) sc.scrollTop += lr.bottom - br.bottom + 10; }
        return true;
      },
      lock: function () { locked = true; paintBtn(); },
      /* panel boyu oturunca: son adım kaydırılan gövdede görünsün */
      reveal: function (sc) {
        var li = list.lastElementChild;
        if (!li || !sc) return;
        var lr = li.getBoundingClientRect(), br = sc.getBoundingClientRect();
        if (lr.bottom > br.bottom) sc.scrollTop += lr.bottom - br.bottom + 10;
      }
    };
    paintBtn();
    return api;
  };

  /* bölüm: küçük başlık + içerik (panelin ana akışında bölümler arası boşluk geniş, başlık-içerik arası dar) */
  UI.sec = function (title) {
    return h('section', { 'class': 'sec' }, title ? h('h4', {}, title) : null, Array.prototype.slice.call(arguments, 1));
  };

  /* halka (yüzde) göstergesi */
  UI.ring = function (frac, size, label) {
    size = size || 96;
    var r = size / 2 - 7, c = 2 * Math.PI * r;
    return s('svg', { 'class': 'ring', width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, role: 'img', 'aria-label': label || '' },
      s('circle', { 'class': 'ring-bg', cx: size / 2, cy: size / 2, r: r, fill: 'none', 'stroke-width': 8 }),
      s('circle', { 'class': 'ring-fg', cx: size / 2, cy: size / 2, r: r, fill: 'none', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-dasharray': (c * U.clamp(frac, 0, 1)).toFixed(1) + ' ' + c.toFixed(1), 'stroke-opacity': frac > 0.004 ? 1 : 0, transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')' }),
      s('text', { 'class': 'ring-t', x: size / 2, y: size / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, Math.round(frac * 100) + '%'));
  };

  /* ortak alt bilgi (tüm sayfalarda tek çatı: yasal bağlantılar, marka feragatnamesi, çerez tercihleri) */
  UI.siteFooter = function (opts) {
    opts = opts || {};
    var cfg = g.ATLAS_CONFIG || {};
    var isFile = false;
    try { isFile = g.location && g.location.protocol === 'file:'; } catch (e) { isFile = false; }
    function hrefFor(slug, hash) { return isFile ? '#' + hash : slug; }
    var links = [
      { label: 'Hakkımızda', href: hrefFor('hakkimizda.html', 'hakkimizda') },
      { label: 'Gizlilik ve Çerezler', href: hrefFor('gizlilik.html', 'gizlilik') },
      { label: 'Kullanım Koşulları', href: hrefFor('kullanim-kosullari.html', 'kullanim-kosullari') },
      { label: 'Kaynaklar ve Atıf', href: hrefFor('kaynaklar.html', 'kaynaklar') },
      { label: 'İletişim', href: hrefFor('iletisim.html', 'iletisim') }
    ];
    var nav = h('nav', { 'class': 'sf-links', 'aria-label': 'Site bilgileri ve yasal sayfalar' },
      links.map(function (it) { return h('a', { href: it.href }, it.label); }).concat([
        h('button', {
          type: 'button', 'class': 'sf-btn',
          onclick: function () { if (g.Ads && g.Ads.openConsent) g.Ads.openConsent(); }
        }, 'Çerez tercihleri')
      ]));
    return h('footer', { 'class': 'site-foot' + (opts.compact ? ' site-foot-sm' : '') },
      nav,
      h('p', { 'class': 'sf-note' },
        cfg.disclaimer || 'Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile bağlantısı yoktur.'),
      h('p', { 'class': 'sf-meta' },
        'Fotoğraflar Wikimedia Commons’tan serbest lisanslarıyla, yol çizgileri © OpenStreetMap katkıcılarından (ODbL) alınmıştır.'));
  };

  g.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);

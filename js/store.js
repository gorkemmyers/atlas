/* store.js — ilerleme ve ayarlar (localStorage, bellek yedeği) */
(function (g) {
  'use strict';
  var KEY = 'vietatlas.v1';

  function blank() {
    return {
      v: 1,
      items: {},                                   // anahtar -> {b: kutu 0-5, n: deneme, ok: doğru, t: son zaman}
      stats: { answered: 0, correct: 0, hinted: 0, days: {}, bestRun: 0 },
      set: {
        theme: null, basemap: 'atlas',
        color: 'region', label: 'name', quizColors: true, quiz: null, sim: null,
        asColor: 'script', asLabel: 'name', asQuizColors: true, asQuiz: null, asSim: null,
        prefs: {},
        seenHelp: false, seenNames: false, last: null, recent: []
      },
      sim: { games: 0, best: 0, history: [] },
      simAs: { games: 0, best: 0, history: [] },
      simBy: {},
      sessions: []
    };
  }
  function merge(base, o) {
    if (!o || typeof o !== 'object') return base;
    var out = blank();
    out.items = (o.items && typeof o.items === 'object') ? o.items : {};
    if (o.stats && typeof o.stats === 'object') {
      out.stats.answered = +o.stats.answered || 0;
      out.stats.correct = +o.stats.correct || 0;
      out.stats.bestRun = +o.stats.bestRun || 0;
      out.stats.hinted = +o.stats.hinted || 0;
      out.stats.days = (o.stats.days && typeof o.stats.days === 'object') ? o.stats.days : {};
    }
    if (o.set && typeof o.set === 'object') {
      Object.assign(out.set, o.set);
      if (!out.set.prefs || typeof out.set.prefs !== 'object' || Array.isArray(out.set.prefs)) out.set.prefs = {};
    }
    if (o.sim && typeof o.sim === 'object') {
      out.sim.games = +o.sim.games || 0;
      out.sim.best = +o.sim.best || 0;
      out.sim.history = Array.isArray(o.sim.history) ? o.sim.history.slice(-30) : [];
    }
    if (o.simAs && typeof o.simAs === 'object') {
      out.simAs.games = +o.simAs.games || 0;
      out.simAs.best = +o.simAs.best || 0;
      out.simAs.history = Array.isArray(o.simAs.history) ? o.simAs.history.slice(-30) : [];
    }
    if (o.simBy && typeof o.simBy === 'object' && !Array.isArray(o.simBy)) {
      Object.keys(o.simBy).forEach(function (k) {
        var s = o.simBy[k];
        if (!s || typeof s !== 'object') return;
        out.simBy[k] = {
          games: +s.games || 0,
          best: +s.best || 0,
          history: Array.isArray(s.history) ? s.history.slice(-30) : []
        };
      });
    }
    out.sessions = Array.isArray(o.sessions) ? o.sessions.slice(-60) : [];
    return out;
  }

  var persistent = true;
  function load() {
    try {
      var raw = g.localStorage.getItem(KEY);
      if (raw) return merge(blank(), JSON.parse(raw));
    } catch (e) { persistent = false; }
    return blank();
  }

  var timer = null;
  var Store = {
    data: load(),
    get persistent() { return persistent; },
    save: function () {
      clearTimeout(timer);
      timer = setTimeout(Store.flush, 250);
    },
    flush: function () {
      clearTimeout(timer);
      try {
        g.localStorage.setItem(KEY, JSON.stringify(Store.data));
        persistent = true;
      } catch (e) { persistent = false; }
    },
    reset: function () {
      Store.data = blank();
      Store.flush();
    },
    exportText: function () {
      return JSON.stringify({ app: 'viet-atlas', exported: new Date().toISOString(), data: Store.data });
    },
    importText: function (text) {
      var o;
      try { o = JSON.parse(text); } catch (e) { return { ok: false, error: 'Metin geçerli bir JSON değil.' }; }
      var d = o && o.app === 'viet-atlas' ? o.data : o;
      if (!d || d.v !== 1 || typeof d.items !== 'object') return { ok: false, error: 'Bu metin Atlas yedeği gibi görünmüyor.' };
      Store.data = merge(blank(), d);
      Store.flush();
      return { ok: true };
    }
  };
  g.Store = Store;
})(typeof window !== 'undefined' ? window : globalThis);

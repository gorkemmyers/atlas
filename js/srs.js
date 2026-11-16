/* srs.js — Leitner kutuları: 0 (zayıf) … 5 (usta). Yanlış → 2 kutu geri. */
(function (g) {
  'use strict';
  var S = g.Store;
  var W = [9, 5.5, 3.5, 2.2, 1.3, 0.6];                       // kutuya göre çekilme ağırlığı
  var UNSEEN = 7;                                              // hiç sorulmamış öğe
  var SPAN = [0, 2 * 60e3, 20 * 60e3, 6 * 36e5, 24 * 36e5, 96 * 36e5]; // “vakti geldi” aralıkları

  function rec(key) { return S.data.items[key]; }
  /* -1: hiç sorulmadı */
  function box(key) { var r = rec(key); return r ? r.b : -1; }
  function weight(key, now) {
    var r = rec(key);
    if (!r) return UNSEEN;
    var w = W[r.b] || 1;
    return w * ((now || Date.now()) - r.t >= SPAN[r.b] ? 1.6 : 0.55);
  }
  /* 0 … 1 arası öğe ustalığı */
  function level(key) { var r = rec(key); return r ? (r.b + 1) / 6 : 0; }

  /* hinted: doğru cevap İpucu ile geldiyse kutu yükselmez ve “doğru” sayılmaz (öğe tekrar önüne çıkar) */
  function answer(key, ok, hinted) {
    var d = S.data, now = Date.now(), r = d.items[key];
    var fresh = !r;
    if (!r) r = d.items[key] = { b: 0, n: 0, ok: 0, t: now };
    r.n++;
    if (ok && hinted) {
      r.h = (r.h || 0) + 1;
      if (fresh) r.t = now;
      d.stats.hinted = (d.stats.hinted || 0) + 1;
    } else {
      r.t = now;
      if (ok) { r.ok++; r.b = Math.min(5, r.b + 1); } else { r.b = Math.max(0, r.b - 2); }
      if (ok) d.stats.correct++;
    }
    d.stats.answered++;
    var day = g.U.today();
    d.stats.days[day] = (d.stats.days[day] || 0) + 1;
    S.save();
    return r.b;
  }
  /* art arda gün serisi (bugün henüz çalışılmadıysa dünden sayılır) */
  function streak() {
    var days = S.data.stats.days, n = 0, d = new Date();
    function key(dt) { return dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2); }
    if (!days[key(d)]) d.setDate(d.getDate() - 1);
    while (days[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function today() { return S.data.stats.days[g.U.today()] || 0; }

  /* ağırlıklı seçim; exclude: Set */
  function pick(keys, exclude) {
    var pool = keys.filter(function (k) { return !exclude || !exclude.has(k); });
    if (!pool.length) pool = keys;
    return g.U.weighted(pool, function (k) { return weight(k); });
  }
  /* bir anahtar kümesinin ortalama ustalığı */
  function mean(keys) {
    if (!keys.length) return 0;
    var t = 0; keys.forEach(function (k) { t += level(k); });
    return t / keys.length;
  }
  function seenCount(keys) { var n = 0; keys.forEach(function (k) { if (rec(k)) n++; }); return n; }
  function weakKeys(keys) { return keys.filter(function (k) { var r = rec(k); return !r || r.b <= 2; }); }

  g.SRS = { rec: rec, box: box, weight: weight, level: level, answer: answer, streak: streak, today: today, pick: pick, mean: mean, seenCount: seenCount, weakKeys: weakKeys };
})(typeof window !== 'undefined' ? window : globalThis);

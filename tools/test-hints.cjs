/* İpucu motoru testi: her soru anahtarı × her mod için ≥2 adım, cevap sızıntısı yok */
global.window = global;
const path = require('path');
const root = path.join(__dirname, '..');
['data','geo','names','util','store','geom','srs','bank','hints'].forEach(f => require(path.join(root,'js',f+'.js')));
const B = window.Bank, D = window.VN_DATA, Nm = window.Names, H = window.Hints;
let n = 0, bad = [];
const fail = m => bad.push(m);
const leaks = (text, objs) => objs.some(o => Nm.maskText(text, Nm.variantsOf(o)) !== text);
const digit = (text, code) => new RegExp('(^|[^0-9])' + code + '([^0-9]|$)').test(text);
const kinds = Object.keys(B.KINDS);
const stat = {};
for (const kind of kinds) {
  const keys = B.itemKeys(kind, {});
  for (const key of keys) {
    for (const pref of ['map','mc','text','mix','mix']) {
      const q = B.build(key, { mode: pref });
      const steps = H.forQuestion(q);
      n++;
      stat[q.base] = stat[q.base] || { n: 0, min: 99, max: 0 };
      stat[q.base].n++; stat[q.base].min = Math.min(stat[q.base].min, steps.length); stat[q.base].max = Math.max(stat[q.base].max, steps.length);
      if (steps.length < 2) { fail(key + ' ' + q.mode + ' yalnızca ' + steps.length + ' adım'); continue; }
      steps.forEach((s, i) => {
        if (!s.k || !s.t) fail(key + ' adım ' + i + ' eksik');
        if (/undefined|NaN|\[object/.test(s.t)) fail(key + ' adım ' + i + ' bozuk: ' + s.t);
        if (s.ids) s.ids.forEach(id => { const ok = D.pById[id]; if (!ok) fail(key + ' vurgu id yok: ' + id); });
      });
      const txt = steps.map(s => s.t);
      /* cevap sızıntısı */
      let hide = [], codeHide = null;
      const base = q.base;
      if (base === 'ident') hide = [D.pById[q.focus[0]]];
      else if (['a2p','plc','cap'].includes(base)) hide = [D.pById[q.accept[0]]];
      else if (base === 'nb' || base === 'n2o') hide = [D.pById[q.correct]];
      else if (base === 'p2cap') { const p = D.pById[key.split(':')[1]]; hide = [{ vi: p.cap, ascii: D.norm(p.cap), alias: p.cap.split(/\s*[–-]\s*/) }]; }
      if (base === 'p2a') codeHide = D.pById[key.split(':')[1]].area;
      txt.forEach((t, i) => {
        if (hide.length && leaks(t, hide)) fail(`${key} [${q.mode}] adım ${i} cevabı sızdırıyor: ${t}`);
        if (codeHide) [].concat(codeHide).forEach(code => { if (digit(t, code) || digit(t, '0' + code)) fail(`${key} adım ${i} kodu sızdırıyor (${code}): ${t}`); });
      });
    }
  }
}
/* Simülasyon ipuçları */
for (const p of D.provinces) {
  [['phone', { code: p.area }], ['sign', { place: p.places[0] }], ['note', {}]].forEach(([type, ex]) => {
    const st = H.forClue(type, p.id, ex);
    n++;
    if (st.length < 2) fail('clue ' + type + ' ' + p.id + ' yalnızca ' + st.length);
    st.forEach(s => { if (Nm.maskText(s.t, Nm.variantsOf(p)) !== s.t) fail(`clue ${type} ${p.id} sızıntı: ${s.t}`); });
  });
}
console.log(Object.keys(stat).map(k => `${k}:${stat[k].n}(${stat[k].min}-${stat[k].max})`).join('  '));
console.log(`${n} ipucu seti denendi, ${bad.length} sorun`);
bad.slice(0, 30).forEach(m => console.log('  ✗', m));
process.exit(bad.length ? 1 : 0);

/* Soru bankası birim testi (Node) — her anahtar × her mod */
global.window = global;
const path = require('path');
const root = path.join(__dirname, '..');
['data','geo','names','util','store','geom','srs','bank','hints'].forEach(f => require(path.join(root,'js',f+'.js')));
const B = window.Bank, D = window.VN_DATA, G = window.VN_GEO;
let n = 0, bad = [];
const fail = (m) => { bad.push(m); };
const modes = ['map','mc','text'];
for (const kind of Object.keys(B.KINDS)) {
  const keys = B.itemKeys(kind, {});
  if (!keys.length) { fail('boş kind ' + kind); continue; }
  for (const key of keys) {
    for (const pref of modes.concat(['mix','mix','mix'])) {
      let q;
      try { q = B.build(key, { mode: pref }); } catch (e) { fail(key + ' ' + pref + ' EXC ' + e.message); continue; }
      n++;
      if (!q.title || !q.prompt || !q.mode || !q.reveal) fail(key + ' eksik alan');
      const tbl = G.p;
      if (q.mode === 'map') {
        if (!q.accept.length || !q.accept.every(id => tbl[id])) fail(key + ' map accept');
      }
      if (q.mode === 'mc') {
        if (!q.options || q.options.length < 2) fail(key + ' mc yok');
        else {
          const ids = q.options.map(o => String(o.id));
          if (new Set(ids).size !== ids.length) fail(key + ' mc yinelenen id ' + ids);
          if (ids.filter(i => i === String(q.correct)).length !== 1) fail(key + ' mc doğru sayısı ' + ids + ' / ' + q.correct);
          if (new Set(q.options.map(o => o.label)).size !== q.options.length) fail(key + ' mc yinelenen etiket');
        }
      }
      if (q.mode === 'text') {
        if (!q.text) fail(key + ' text yok');
        else {
          // beklenen cevap kabul edilmeli
          let probe = null;
          if (q.text.kind === 'name') probe = q.answerText;
          else if (q.text.kind === 'area') probe = q.answerText;           // 0236
          else if (q.text.kind === 'cap') probe = q.answerText;
          if (!B.checkText(q, probe)) fail(key + ' text beklenen reddedildi: ' + probe + ' (' + q.text.kind + ')');
          if (B.checkText(q, 'zzzz qqq')) fail(key + ' text saçma kabul edildi');
        }
      }
      if (q.focus && q.focus.some(id => !G.p[id])) fail(key + ' focus id');
      if (q.reveal.ids.some(id => !G.p[id])) fail(key + ' reveal id ' + q.reveal.ids);
    }
  }
}
// ek: yazım denemeleri
const q = B.build('p2a:da-nang', { mode: 'text' });
['0236','236','(0236)','+84 236','84236'].forEach(s => { if (!B.checkText(q, s)) fail('alan biçimi ' + s); });
if (B.checkText(q, '0237')) fail('alan yanlış kabul');
const qh = B.build('p2a:ha-noi', { mode: 'text' });
['024','24','+84 24','(024)'].forEach(s => { if (!B.checkText(qh, s)) fail('HN alan biçimi ' + s); });
const qi = B.build('ident:ho-chi-minh', { mode: 'text' });
['TP. Hồ Chí Minh','Ho Chi Minh','saigon','Sài Gòn','TPHCM','thành phố hồ chí minh','Tp Hồ Chí Minh'].forEach(s => { if (!B.checkText(qi, s)) fail('HCM ad ' + s); });
const qd = B.build('ident:thua-thien-hue', { mode: 'text' });
['Huế','hue','Thua Thien Hue','tỉnh Thừa Thiên Huế'].forEach(s => { if (!B.checkText(qd, s)) fail('Huế ad ' + s); });
const qc = B.build('p2cap:ninh-thuan', { mode: 'text' });
['Phan Rang–Tháp Chàm','phan rang','thap cham','Phan Rang - Thap Cham'].forEach(s => { if (!B.checkText(qc, s)) fail('cap ' + s); });

// arama
const s1 = B.search('hoi an'); if (!s1.length || s1[0].id !== 'quang-nam') fail('arama hoi an: ' + JSON.stringify(s1[0]));
const s2 = B.search('0236'); if (!s2.length || s2[0].id !== 'da-nang') fail('arama 0236: ' + JSON.stringify(s2[0]));
const s4 = B.search('nha trang'); if (!s4.length || s4[0].id !== 'khanh-hoa') fail('arama nha trang: ' + JSON.stringify(s4[0]));
const s5 = B.search('saigon'); if (!s5.length || s5[0].id !== 'ho-chi-minh') fail('arama saigon: ' + JSON.stringify(s5[0]));
const s6 = B.search('lao cai'); if (!s6.length || s6[0].id !== 'lao-cai') fail('arama lao cai: ' + JSON.stringify(s6.slice(0,3)));

// oturum
const S = window.Store; S.data.items = {};
const sess = new B.Session({ kinds: B.ALL_KINDS, mode: 'mix', count: 40 });
let c = 0, qq;
while ((qq = sess.next())) { sess.record(qq, Math.random() < 0.7 ? 'ok' : 'bad'); c++; if (c > 100) break; }
if (c !== 40) fail('oturum soru sayısı ' + c);
const wk = new B.Session({ kinds: ['loc'], mode: 'map', count: 5, weakOnly: true });
if (!wk.next()) fail('weak oturum');
// scope
const sc = B.itemKeys('loc', { scope: ['md'] }); if (sc.length !== 13) fail('scope md ' + sc.length);
console.log('toplam soru üretimi', n, 'hata', bad.length);
if (bad.length) { console.log(bad.slice(0, 40).join('\n')); process.exit(1); }
console.log('✔ bank testleri geçti');

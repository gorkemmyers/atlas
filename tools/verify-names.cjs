/* Ad / kod mantığı denetimi: js/names.js içindeki her iddiayı gerçek veriye karşı sınar.
   Kullanım: node tools/verify-names.cjs */
global.window = global;
const path = require('path');
['data', 'geo', 'names'].forEach(f => require(path.join(__dirname, '..', 'js', f + '.js')));
const D = global.VN_DATA, G = global.VN_GEO, Nm = global.Names, norm = D.norm;
let fails = 0, checks = 0;
const ok = (c, m) => { checks++; if (!c) { fails++; console.log('  ✗', m); } };
const P = D.provinces, pBy = id => D.pById[id];
const C = id => G.p[id].c;                 // [x (doğu), y (güney)]
const half = id => (Nm.NORTH.indexOf(pBy(id).region) >= 0 ? 'N' : 'S');
const words = p => p.vi.replace(/^TP\.\s*/, '').split(/\s+/);
/* aksanlı karşılaştırma: Bắc ≠ Bạc, Hà ≠ Hạ */
const nfc = s => String(s).normalize('NFC');
const startsWith = (w) => P.filter(p => nfc(words(p)[0]) === nfc(w)).map(p => p.id);
const endsWith = (w) => P.filter(p => { const a = words(p); return a.length > 1 && nfc(a[a.length - 1]) === nfc(w); }).map(p => p.id);
const sameSet = (a, b) => a.length === b.length && a.every(x => b.indexOf(x) >= 0);
const increasingY = (ids) => ids.every((id, i) => i === 0 || C(ids[i - 1])[1] < C(id)[1]);

/* 1 — kapsama */
ok(Object.keys(Nm.INFO).length === 63, 'INFO 63 il değil: ' + Object.keys(Nm.INFO).length);
P.forEach(p => {
  const i = Nm.INFO[p.id];
  ok(!!i, 'INFO yok: ' + p.id); if (!i) return;
  ok(!!Nm.famById[i.fam], 'bilinmeyen aile: ' + p.id + ' ' + i.fam);
  ok(i.s >= 0 && i.s <= 3, 'güç aralığı: ' + p.id);
  ok(i.syl.length >= 1 && i.mean && i.tell, 'eksik alan: ' + p.id);
});
const famCount = {}; P.forEach(p => { famCount[Nm.INFO[p.id].fam] = (famCount[Nm.INFO[p.id].fam] || 0) + 1; });
const expect = { binhN: 3, binhS: 4, quang: 6, ha: 3, bac: 3, trio: 3, hl: 5, loc: 6, giang: 4, word: 7, solo: 6, trap: 3, wish: 10 };
Object.keys(expect).forEach(k => ok(famCount[k] === expect[k], 'aile sayısı ' + k + ': ' + famCount[k] + ' ≠ ' + expect[k]));
ok(new Set(Nm.FAMS.map(f => f.id)).size === 13 && Nm.FAMS.length === 13, '13 aile');
ok(new Set(Nm.FAMS.map(f => f.cls)).size === 13, 'aile renkleri benzersiz');
Nm.FAMS.forEach(f => ok(Nm.RULES.some(r => r.id === f.rule), 'aile kuralı bulunamadı: ' + f.id));
Nm.RULES.forEach(r => r.groups.forEach(gp => gp.ids.forEach(id => ok(!!pBy(id), 'kural il yok: ' + r.id + ' ' + id))));

/* 2 — Bình kuralı */
const bEnd = endsWith('Bình'), bStart = startsWith('Bình');
ok(sameSet(bEnd, ['thai-binh', 'ninh-binh', 'hoa-binh', 'quang-binh']), 'Bình sonda kümesi: ' + bEnd);
ok(sameSet(bStart, ['binh-dinh', 'binh-thuan', 'binh-duong', 'binh-phuoc']), 'Bình başta kümesi: ' + bStart);
bEnd.forEach(id => ok(half(id) === 'N', 'Bình sonda Kuzey değil: ' + id));
bStart.forEach(id => ok(half(id) === 'S', 'Bình başta Güney değil: ' + id));

/* 3 — Quảng zinciri */
const quang = startsWith('Quảng');
ok(sameSet(quang, ['quang-binh', 'quang-tri', 'quang-nam', 'quang-ngai', 'quang-ninh']), 'Quảng kümesi: ' + quang);
ok(pBy('quang-ninh').region === 'ne', 'Quảng Ninh KD değil');
['quang-binh', 'quang-tri', 'quang-nam', 'quang-ngai'].forEach(id => ok(pBy(id).macro === 'C', 'Quảng orta değil: ' + id));
ok(increasingY(['quang-binh', 'quang-tri', 'thua-thien-hue', 'da-nang', 'quang-nam', 'quang-ngai']), 'Quảng zinciri kuzeyden güneye sıralı değil');
ok(pBy('quang-binh').area === '232' && pBy('quang-tri').area === '233' && pBy('thua-thien-hue').area === '234', 'Bình-Trị-Thiên alan 232-233-234');
const rq = Nm.RULES.find(r => r.id === 'quang');
ok(sameSet(rq.groups[0].ids, ['quang-binh', 'quang-tri', 'thua-thien-hue', 'da-nang', 'quang-nam', 'quang-ngai']), 'quang kuralı kümesi');

/* 4 — Hà- / Bắc- */
const ha = startsWith('Hà');
ok(sameSet(ha, ['ha-noi', 'ha-giang', 'ha-nam', 'ha-tinh']), 'Hà- kümesi: ' + ha);
ha.forEach(id => ok(half(id) === 'N', 'Hà- Kuzey değil: ' + id));
ok(ha.every(id => id === 'ha-tinh' || C(id)[1] < C('ha-tinh')[1]), 'Hà Tĩnh en güney değil');
const bac = startsWith('Bắc');
ok(sameSet(bac, ['bac-giang', 'bac-ninh', 'bac-kan']), 'Bắc- kümesi: ' + bac);
bac.forEach(id => ok(['ne', 'rrd'].indexOf(pBy(id).region) >= 0, 'Bắc- KD/delta değil: ' + id));

/* 5 — Thanh · Nghệ · Tĩnh */
const trio = ['thanh-hoa', 'nghe-an', 'ha-tinh'];
ok(trio.map(id => pBy(id).area).join() === '237,238,239', 'trio alan kodları');
ok(increasingY(trio), 'trio kuzeyden güneye değil');
trio.forEach(id => ok(pBy(id).region === 'ncc', 'trio KOK değil: ' + id));

/* 6 — Yayla önekleri */
const hl = P.filter(p => ['dak', 'kon', 'gia'].indexOf(norm(words(p)[0])) >= 0 || norm(p.vi) === 'lamdong').map(p => p.id);
ok(sameSet(hl, P.filter(p => p.region === 'ch').map(p => p.id)), 'Yayla önekleri = ch bölgesi: ' + hl);
ok(sameSet(Nm.famIds('hl'), hl), 'hl ailesi kümesi');

/* 7 — Yerel adlar */
const loc = ['ca-mau', 'soc-trang', 'tra-vinh', 'bac-lieu', 'ben-tre', 'can-tho'];
loc.forEach(id => ok(pBy(id).region === 'md', 'yerel ad Mekong değil: ' + id));
ok(sameSet(Nm.famIds('loc'), loc), 'loc ailesi kümesi');

/* 8 — Giang */
const giang = endsWith('Giang');
ok(sameSet(giang, ['ha-giang', 'bac-giang', 'an-giang', 'kien-giang', 'tien-giang', 'hau-giang']), 'Giang kümesi: ' + giang);
['ha-giang', 'bac-giang'].forEach(id => ok(half(id) === 'N', 'Hà/Bắc Giang Kuzey değil'));
['an-giang', 'kien-giang', 'tien-giang', 'hau-giang'].forEach(id => ok(pBy(id).region === 'md', 'Giang Mekong değil: ' + id));
ok(sameSet(Nm.famIds('giang'), ['an-giang', 'kien-giang', 'tien-giang', 'hau-giang']), 'giang ailesi');

/* 9 — anlamlı sözcükler */
ok(sameSet(P.filter(p => norm(p.vi).indexOf('son') >= 0 && words(p).some(w => norm(w) === 'son')).map(p => p.id), ['lang-son', 'son-la']), 'Sơn kümesi');
['lang-son', 'son-la'].forEach(id => ok(half(id) === 'N', 'Sơn Kuzey değil'));
ok(sameSet(startsWith('Hải'), ['hai-phong', 'hai-duong']), 'Hải kümesi');
['hai-phong', 'hai-duong'].forEach(id => ok(pBy(id).region === 'rrd', 'Hải delta değil'));
ok(startsWith('Tây').join() === 'tay-ninh' && pBy('tay-ninh').region === 'se', 'Tây Ninh GD');
ok(pBy('tay-ninh').area === '276' && C('tay-ninh')[0] < C('ho-chi-minh')[0], 'Tây Ninh Saygon’un batısında');
ok(pBy('dien-bien').region === 'nw' && pBy('cao-bang').region === 'ne', 'Điện Biên KB / Cao Bằng KD');
ok(sameSet(Nm.famIds('word'), ['lang-son', 'son-la', 'hai-phong', 'hai-duong', 'tay-ninh', 'dien-bien', 'cao-bang']), 'word ailesi');

/* 10 — Thuận, Phúc/Phước, tuzaklar */
const thuan = endsWith('Thuận');
ok(sameSet(thuan, ['ninh-thuan', 'binh-thuan']) && thuan.every(id => pBy(id).region === 'scc'), 'Thuận kümesi');
ok(pBy('vinh-phuc').region === 'rrd' && pBy('binh-phuoc').region === 'se', 'Phúc/Phước');
ok(pBy('ha-nam').region === 'rrd' && pBy('nam-dinh').region === 'rrd' && pBy('quang-nam').macro === 'C', 'Nam tuzağı');
ok(pBy('lao-cai').region === 'nw', 'Lào Cai KB');
ok(!P.some(p => /Đông/.test(p.vi)), 'adında Đông geçen il var');
ok(startsWith('Đồng').sort().join() === 'dong-nai,dong-thap', 'Đồng ile başlayan iller');
ok(P.filter(p => /Đồng/.test(p.vi)).map(p => p.id).sort().join() === 'dong-nai,dong-thap,lam-dong', 'Đồng geçen iller');
ok(norm('Bạc') === norm('Bắc') && P.filter(p => norm(words(p)[0]) === 'bac').length === 4, 'Bắc/Bạc aksan karışması uyarısı gerekçesi');
ok(sameSet(Nm.famIds('trap'), ['quang-ninh', 'lao-cai', 'nam-dinh']), 'trap ailesi');

/* 11 — Alan kodu */
const fams = D.families.map(f => f.k);
ok(Nm.AREA.sweep.map(s => s.k).join() === fams.join(), 'süpürme = D.families sırası');
Nm.AREA.sweep.forEach((s, i) => ok(s.d === s.k.charAt(1), 'süpürme hanesi ' + s.k));
Nm.AREA.ladders.forEach(l => {
  ok(l.codes.length === l.ids.length, 'merdiven uzunluğu ' + l.id);
  l.ids.forEach((id, i) => ok(pBy(id).area === l.codes[i], `merdiven ${l.id}: ${id} ${pBy(id).area} ≠ ${l.codes[i]}`));
  ok(increasingY(l.ids), 'merdiven kuzeyden güneye değil: ' + l.id);
});
ok(pBy('quang-nam').area === '235' && pBy('da-nang').area === '236' && C('da-nang')[1] < C('quang-nam')[1], '235/236 ters sıra');
ok(pBy('binh-thuan').area === '252' && C('binh-thuan')[1] > C('ninh-thuan')[1], '252 Bình Thuận en güneyde');
Nm.AREA.clusters.forEach(cl => cl.ids.forEach((id, i) => ok(pBy(id).area === cl.codes[i], 'küme kodu ' + id)));
const cm = ['ca-mau', 'bac-lieu'], mid = ['can-tho', 'hau-giang'], east = ['tra-vinh', 'soc-trang'], west = ['an-giang', 'kien-giang'];
const minY = ids => Math.min.apply(null, ids.map(i => C(i)[1])), maxX = ids => Math.max.apply(null, ids.map(i => C(i)[0])), minX = ids => Math.min.apply(null, ids.map(i => C(i)[0]));
ok(minY(cm) > Math.max.apply(null, mid.concat(east, west).map(i => C(i)[1])) - 40, 'Cà Mau/Bạc Liêu en güney (±40)');
ok(maxX(west) < minX(mid) && maxX(mid) < minX(east), '29x: batı < orta < doğu');
['hai-duong', 'hung-yen', 'bac-ninh', 'hai-phong'].forEach(id => ok(C(id)[0] > C('ha-noi')[0], '22x doğu: ' + id));
['ha-nam', 'thai-binh', 'nam-dinh', 'ninh-binh'].forEach(id => ok(C(id)[1] > Math.max(C('hung-yen')[1], C('hai-phong')[1], C('hai-duong')[1], C('bac-ninh')[1]), '22x güney yarı: ' + id));
['binh-phuoc', 'binh-duong', 'tay-ninh'].forEach(id => ok(C(id)[1] < C('ho-chi-minh')[1], '27x Saygon’un kuzeyi: ' + id));
['vinh-long', 'tien-giang', 'ben-tre'].forEach(id => ok(C(id)[1] > C('ho-chi-minh')[1], '27x Saygon’un güneyi: ' + id));
['long-an', 'dong-thap'].forEach(id => ok(C(id)[0] < C('ho-chi-minh')[0], '27x Saygon’un batısı: ' + id));
ok(pBy('ha-noi').area === '24' && pBy('ho-chi-minh').area === '28', 'iki haneli kodlar');
D.oldCodes.forEach(o => { if (o[0] === 'Hà Nội') ok(o[1] === '04' && o[2] === '24', 'Hà Nội eski kod'); if (o[0] === 'TP. Hồ Chí Minh') ok(o[1] === '08' && o[2] === '28', 'HCM eski kod'); });
ok(['ha-giang', 'hoa-binh', 'phu-tho', 'vinh-phuc'].every(id => pBy(id).area.slice(0, 2) === '21'), '21x istisnaları');
ok(pBy('dong-nai').area === '251' && pBy('ba-ria-vung-tau').area === '254', '25x konukları');
ok(pBy('gia-lai').area === '269', 'Gia Lai 269');

/* 13 — yer adı önekleri */
const places = [];
P.forEach(p => { p.places.concat([p.cap]).forEach(pl => places.push([pl, p])); });
Nm.PLACE_CUES.forEach(cue => {
  const hits = places.filter(([pl]) => cue.re.test(norm(pl.split(/[\s–-]+/)[0])));
  ok(hits.length > 0, 'yer adı ipucu eşleşmiyor: ' + cue.re);
  hits.forEach(([pl, p]) => {
    if (cue.regions) ok(cue.regions.indexOf(p.region) >= 0, `yer adı ipucu ${cue.re}: ${pl} → ${p.region}`);
    if (cue.half) ok(half(p.id) === cue.half, `yer adı ipucu ${cue.re}: ${pl} → ${half(p.id)}`);
  });
});

/* 14 — SYLQ */
const seen = new Set();
Nm.SYLQ.forEach(x => {
  ok(!seen.has(x.id), 'SYLQ yinelenen id ' + x.id); seen.add(x.id);
  ok(x.ids.length >= 1 && x.ids.every(id => pBy(id)), 'SYLQ il yok: ' + x.id);
  x.ids.forEach(id => {
    if (x.ans.t === 'h') ok(half(id) === x.ans.id, `SYLQ ${x.id}: ${id} yarı ${half(id)} ≠ ${x.ans.id}`);
    if (x.ans.t === 'm') ok(pBy(id).macro === x.ans.id, `SYLQ ${x.id}: ${id} kesim`);
    if (x.ans.t === 'r') ok(pBy(id).region === x.ans.id, `SYLQ ${x.id}: ${id} bölge ${pBy(id).region} ≠ ${x.ans.id}`);
  });
});

/* 15 — tarihî birleşik adlar: grup içi komşuluk */
Nm.HIST.forEach(h => {
  h.ids.forEach(id => ok(!!pBy(id), 'HIST il yok: ' + id));
  const set = new Set(h.ids), stack = [h.ids[0]], vis = new Set([h.ids[0]]);
  while (stack.length) { const a = stack.pop(); G.p[a].nb.forEach(b => { if (set.has(b) && !vis.has(b)) { vis.add(b); stack.push(b); } }); }
  ok(vis.size === set.size, 'HIST bitişik değil: ' + h.n);
});

/* 16 — bölge adı çözücü */
ok(sameSet(Nm.GLOSS.map(g2 => g2.id), D.regions.map(r => r.id)), 'GLOSS bölgeleri');
Nm.GLOSS.forEach(g2 => ok(g2.vi === D.regionById[g2.id].vi, 'GLOSS adı: ' + g2.id));
ok(sameSet(Nm.MACRO_GLOSS.map(m => m.vi), D.macros.map(m => m.vi)), 'MACRO_GLOSS');

/* 17 — maskeleme */
const lk = (t, id) => Nm.mask(t, pBy(id));
ok(lk('Vietnam’ın en kuzeyi: “Hà Giang Loop” rotası', 'ha-giang') === 'Vietnam’ın en kuzeyi: “??? Loop” rotası', 'maske Hà Giang: ' + lk('Vietnam’ın en kuzeyi: “Hà Giang Loop” rotası', 'ha-giang'));
ok(lk('Hà Nội ve Hà Giang', 'ha-giang') === 'Hà Nội ve ???', 'maske yalnızca ilgili ad');
ok(lk('Huế Kalesi ve Hue', 'thua-thien-hue') === '??? Kalesi ve ???', 'maske Huế/Hue: ' + lk('Huế Kalesi ve Hue', 'thua-thien-hue'));
ok(lk('Vũng Tàu plajı', 'ba-ria-vung-tau') === '??? plajı', 'maske Vũng Tàu: ' + lk('Vũng Tàu plajı', 'ba-ria-vung-tau'));
ok(lk('Bình Định’in komşusu', 'binh-dinh').indexOf('???') === 0, 'maske ek: ' + lk('Bình Định’in komşusu', 'binh-dinh'));
ok(Nm.letters('Hà Giang') === 'H_ G____' && Nm.letters('Đà Nẵng') === 'Đ_ N___', 'harf maskesi: ' + Nm.letters('Hà Giang') + '/' + Nm.letters('Đà Nẵng'));

console.log(`${checks} denetim, ${fails} hata · güç dağılımı [yok, zayıf, iyi, güçlü] =`, JSON.stringify(Nm.counts()));
process.exit(fails ? 1 : 0);

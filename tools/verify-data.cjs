// Veri tutarlılık denetimi: kaynak tabloyla (Wikipedia alan kodları) karşılaştırır.
require('../js/data.js');
const D = globalThis.VN_DATA;
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('  ✗', m); } };

console.log('yükleme sorunları:', D.problems.length ? D.problems : 'yok');
ok(D.problems.length === 0, 'data.js içi denetim hatası');

// --- alan kodları (Wikipedia: Telephone numbers in Vietnam) ---
const AREA = {
 'quang-ninh':'203','bac-giang':'204','lang-son':'205','cao-bang':'206','tuyen-quang':'207','thai-nguyen':'208','bac-kan':'209','phu-tho':'210',
 'vinh-phuc':'211','son-la':'212','lai-chau':'213','lao-cai':'214','dien-bien':'215','yen-bai':'216','hoa-binh':'218','ha-giang':'219','hai-duong':'220',
 'hung-yen':'221','bac-ninh':'222','hai-phong':'225','ha-nam':'226','thai-binh':'227','nam-dinh':'228','ninh-binh':'229','quang-binh':'232','quang-tri':'233',
 'thua-thien-hue':'234','quang-nam':'235','da-nang':'236','thanh-hoa':'237','nghe-an':'238','ha-tinh':'239','ha-noi':'24','dong-nai':'251','binh-thuan':'252',
 'ba-ria-vung-tau':'254','quang-ngai':'255','binh-dinh':'256','phu-yen':'257','khanh-hoa':'258','ninh-thuan':'259','kon-tum':'260','dak-nong':'261','dak-lak':'262',
 'lam-dong':'263','gia-lai':'269','vinh-long':'270','binh-phuoc':'271','long-an':'272','tien-giang':'273','binh-duong':'274','ben-tre':'275','tay-ninh':'276',
 'dong-thap':'277','ho-chi-minh':'28','ca-mau':'290','bac-lieu':'291','can-tho':'292','hau-giang':'293','tra-vinh':'294','an-giang':'296','kien-giang':'297','soc-trang':'299'};
ok(Object.keys(AREA).length === 63, 'beklenen alan kodu tablosu 63 değil');
D.provinces.forEach(p => ok(AREA[p.id] === p.area, `alan kodu ${p.id}: ${p.area} ≠ ${AREA[p.id]}`));

// --- bölge sayıları ---
const cnt = {}; D.provinces.forEach(p => cnt[p.region] = (cnt[p.region] || 0) + 1);
const want = { ne:9, nw:6, rrd:10, ncc:6, scc:8, ch:5, se:6, md:13 };
Object.keys(want).forEach(k => ok(cnt[k] === want[k], `bölge ${k}: ${cnt[k]} ≠ ${want[k]}`));
const macro = {}; D.provinces.forEach(p => macro[p.macro] = (macro[p.macro] || 0) + 1);
console.log('bölge sayıları', cnt, 'makro', macro);

const c = {}; D.provinces.forEach(p => { c[p.cap] = (c[p.cap] || 0) + 1; });
console.log('tekrarlayan merkezler:', Object.keys(c).filter(k => c[k] > 1));
const capDiff = D.provinces.filter(p => p.type === 'prov' && D.norm(p.cap) !== D.norm(p.vi));
console.log('merkezi il adından farklı olan il sayısı:', capDiff.length, '→', capDiff.map(p => p.cap).join(', '));
console.log(fails ? `\n${fails} HATA` : '\nTüm veri denetimleri geçti ✔');
process.exit(fails ? 1 : 0);

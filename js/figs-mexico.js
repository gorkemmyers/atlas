/* figs-mexico.js — Meksika: bölgeyi gösteren bitki ve yapı çizimleri, LADA telefon numarası (özgün şematik çizimler).
   Doğrulanan olgular (kaynak):
   · Cardón (Pachycereus pringlei): dünyanın en uzun kaktüsü (kayıtlı en yüksek 19,2 m); gövde 1 m'ye kadar kalın, birkaç dik dal taşır; yan dallar gövde kadar
     iri olabilir; dallar yerden alçakta ayrılır ve daha dik yükselir — Wikipedia, San Diego Zoo Wildlife Alliance (Baja bahçesi yazısı).
     Yayılış: Baja California yarımadası, Körfez adaları ve Sonora kıyısı (Guaymas'a kadar) — San Diego Natural History Museum (Ocean Oasis saha rehberi).
   · Saguaro (Carnegiea gigantea): kollar genellikle yukarı bükülür, bazı bitkilerde hiç kol olmaz, bazılarında 25'ten fazla olur — Arizona-Sonora Desert Museum
     (AZ Eğitim Bakanlığı özeti); Meksika'da yalnızca batı Sonora'da; Baja California'ya doğal değildir ve Sonora tarafında cardón ile karışık büyür — SDNHM.
   · Mavi agave (Agave tequilana Weber 'azul'): tekila yalnızca bundan yapılır; olgunlaşma kabaca 6–8 yıl (Decanter, The Mixer); geniş aralıklı sıralar, mavi-turkuaz
     yapraklar ve koyu kırmızı toprak (VinePair); Los Altos'ta demirli kırmızı kil, Tequila Vadisi'nde (El Valle) koyu volkanik toprak; üretimin merkezi Jalisco
     (Decanter); menşe adı (DO) Jalisco'nun tamamı + Guanajuato, Michoacán, Nayarit, Tamaulipas'ın bazı belediyeleri (Matador Network, Consejo Regulador özetleri).
   · Maya evi (na): tek oda, dikdörtgen gövde ve yuvarlak (apsis) uçlar, ön duvarın ortasında kapı; duvar dikey sırık ve çubuk, yerel (çoğunlukla kırmızı) kil sıva,
     altta kireç harçlı taş kaide; çatı huano (xa'an) palmiyesi örgüsü, saçak duvarın dışına taşar — Reed College Uxmal/Labná fotoğraf sayfaları, Yucatán Today.
   · Yucatán Yarımadası kuzeybatısı: neredeyse düz kireçtaşı (karst) ova, yüzeyde akarsu yok; alçak yaprak döken ormanda ağaçlar çoğunlukla 8–15 m — bplant.org,
     Wikipedia (Yucatán dry forests).
   · LADA: 10 hane (Ağustos 2019'dan beri); Mexico City 55, Guadalajara 33, Monterrey 81 iki haneli, diğer yerler üç haneli; 01/044/045 önekleri kalktı.
   Bilerek ÇİZİLMEYENLER: kaktüs ve agavada tek tek diken/yaprak ayrıntısı, Maya evinde bölgeye göre değişen ayrıntılar. Çizimdeki sayı ve adlar ÖRNEKTİR.
   Hiçbir logo ya da gerçek firma adı yoktur. */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, L = F.L, Ci = F.Ci, Po = F.Po, Pa = F.Pa, B = F.B, C = F.C;
  var NB = ' ';
  var HL = '#ffe680';
  function f(n) { return +n.toFixed(1); }
  function ell(cx, cy, rx, ry, fill, op) { return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + fill + '"' + (op != null ? ' opacity="' + op + '"' : '') + '/>'; }
  /* sivri yaprak: (x,y) kökü, ang derece (0 sağ, -90 yukarı), len uzunluk, w yarım genişlik */
  function blade(x, y, ang, len, w, fill) {
    var a = ang * Math.PI / 180, ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
    var mx = x + Math.cos(a) * len * .45, my = y + Math.sin(a) * len * .45;
    var nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
    return '<path d="M' + f(x - nx * .5) + ',' + f(y - ny * .5) + ' Q' + f(mx + nx) + ',' + f(my + ny) + ' ' + f(ex) + ',' + f(ey) + ' Q' + f(mx - nx) + ',' + f(my - ny) + ' ' + f(x + nx * .5) + ',' + f(y + ny * .5) + 'Z" fill="' + fill + '"/>';
  }

  /* ---------- 1) Cardón ve saguaro ---------- */
  (function () {
    var G = '#4b8c5a', G2 = '#58a06a', GD = '#2c6a44';
    var b = R(0, 0, 480, 300, '#eaf1f6') + Pa('M0,262 L60,224 L112,246 L170,208 L236,250 L300,218 L372,244 L430,212 L480,236 L480,300 L0,300 Z', '#d3bf9a');
    b += R(0, 300, 480, 60, '#e1cd9d') + L(0, 300, 480, 300, '#bfa974', 2);
    /* cardón: kalın gövde + gövde kadar kalın yan dallar */
    var cx = 146;
    [['M146,248 Q84,246 74,218 L72,170', 22], ['M146,236 Q106,232 104,196 L104,110', 28], ['M146,222 Q190,218 192,180 L192,96', 28], ['M146,254 Q214,250 224,222 L226,154', 22]].forEach(function (c) { b += Pa(c[0], 'none', { s: G, sw: c[1] }); });
    b += Po((cx - 24) + ',304 ' + (cx + 24) + ',304 ' + (cx + 19) + ',230 ' + (cx - 19) + ',230', G) + Pa('M146,304 L146,66', 'none', { s: G2, sw: 34 });
    [[-6, 300, 80], [7, 300, 80]].forEach(function (r) { b += L(cx + r[0], r[1], cx + r[0], r[2], GD, 1.6, { o: .5 }); });
    [[98, 190, 120], [110, 190, 120], [186, 170, 106], [198, 170, 106], [66, 214, 176], [78, 214, 176], [220, 214, 160], [232, 214, 160]].forEach(function (r) { b += L(r[0], r[1], r[0], r[2], GD, 1.4, { o: .45 }); });
    /* saguaro: daha ince düz sütun, dirsek yapıp yukarı dönen kollar */
    var sx = 372;
    [['M372,214 Q326,214 324,178 L324,138', 17], ['M372,176 Q416,176 418,142 L418,104', 17]].forEach(function (c) { b += Pa(c[0], 'none', { s: G, sw: c[1] }); });
    b += Pa('M372,304 L372,82', 'none', { s: G2, sw: 28 });
    [367, 377].forEach(function (x) { b += L(x, 300, x, 90, GD, 1.5, { o: .5 }); });
    [319, 329].forEach(function (x) { b += L(x, 200, x, 146, GD, 1.3, { o: .45 }); });
    [413, 423].forEach(function (x) { b += L(x, 164, x, 112, GD, 1.3, { o: .45 }); });
    /* alçak çalılar */
    [[250, 304], [30, 306], [452, 306]].forEach(function (p) { b += Pa('M' + p[0] + ',' + p[1] + ' L' + (p[0] - 10) + ',' + (p[1] - 18) + ' M' + p[0] + ',' + p[1] + ' L' + p[0] + ',' + (p[1] - 24) + ' M' + p[0] + ',' + p[1] + ' L' + (p[0] + 11) + ',' + (p[1] - 16), 'none', { s: '#9a8d62', sw: 2.4 }); });
    b += B(44, 272, 1, 125, 272) + B(44, 128, 2, 98, 150) + B(272, 108, 3, 322, 146) + B(240, 334, 4, 240, 306);
    F.add('mx-cardon', {
      body: b,
      cap: 'Cardón (solda) ve saguaro (sağda): iki dev sütun kaktüs (şematik)',
      legend: [
        'Cardón: kalın bir gövde (çapı 1 m’ye kadar) ve ondan çıkan birkaç dik dal. Dünyanın en uzun kaktüsüdür (kayıtlı en yüksek boy 19,2 m).',
        'Cardón’un yan dalları gövde kadar iri olabilir; yerden alçakta ayrılır ve daha dik yükselir.',
        'Saguaro: daha ince, düz bir sütun; kollar dirsek yapıp yukarı döner (bazı bitkilerde hiç kol olmaz, bazılarında 25’ten fazla olur).',
        'Yer: cardón Baja California yarımadasında ve Sonora kıyısında yetişir. Saguaro Meksika’da yalnızca batı Sonora’dadır, Baja California’ya doğal değildir. Sonora tarafında ikisi karışık görülür.'
      ]
    });
  })();

  /* ---------- 2) Mavi agave tarlası ---------- */
  (function () {
    var b = R(0, 0, 480, 148, '#dfeaf3') + Pa('M0,150 L0,128 Q60,108 120,126 Q190,142 250,118 Q330,96 400,124 Q450,136 480,122 L480,150 Z', '#9db8a6');
    b += R(0, 148, 480, 212, '#c9683f');
    var Vx = 240, Vy = 148;
    for (var i = -3; i <= 3; i++) b += L(Vx, Vy, Vx + i * 150, 360, '#a24f2e', 2, { o: .55 });
    var pts = [];
    for (i = -3; i <= 3; i++) [0.1, 0.16, 0.24, 0.34, 0.46, 0.61, 0.8].forEach(function (t) {
      var x = Vx + i * 150 * t, y = Vy + (360 - Vy) * t;
      if (x > -50 && x < 530) pts.push({ x: x, y: y, s: 6 + 46 * t, i: i, t: t });
    });
    pts.sort(function (a, c) { return a.y - c.y; });
    var ORD = [-168, -10, -150, -24, -132, -42, -114, -60, -96, -78];
    pts.forEach(function (p) {
      b += ell(p.x, p.y + p.s * .06, p.s * .55, p.s * .12, '#a24f2e', .55);
      ORD.forEach(function (a, k) { b += blade(p.x, p.y, a, p.s * (.76 + .22 * Math.abs(Math.sin(k * 1.9))), p.s * .12, k % 2 ? '#5f8ca6' : '#6f9db4'); });
    });
    b += B(44, 232, 1, 111, 318) + B(444, 246, 2, 346, 244) + B(444, 330, 3, 392, 340);
    F.add('mx-agave', {
      body: b,
      cap: 'Mavi agave tarlası: düzgün sıralar, kırmızı-turuncu toprak (şematik)',
      legend: [
        'Mavi agave (Agave tequilana, “azul”): kalın, kılıç biçimli, mavi-turkuaz yapraklar bir rozet oluşturur; uçlar sivridir. Tekila yalnızca bu agavadan yapılır; olgunlaşması kabaca 6–8 yıl sürer.',
        'Tarlada agavalar geniş aralıklı, düzgün sıralar halinde dikilir; sıralar görüş sonuna kadar uzanır.',
        'Toprak: Jalisco yaylalarında (Los Altos) demirli, koyu kırmızı kildir ve mavi yapraklarla tezat yapar; Tequila Vadisi’nde toprak daha koyu, volkaniktir. Tekilanın menşe adı Jalisco’nun tamamını, ayrıca Guanajuato, Michoacán, Nayarit ve Tamaulipas’ın bazı belediyelerini kapsar; üretimin merkezi Jalisco’dur.'
      ]
    });
  })();

  /* ---------- 3) Maya evi ve düz, alçak orman ---------- */
  (function () {
    var b = R(0, 0, 480, 214, '#e4eef4');
    /* alçak, düz tepeli orman şeridi */
    b += R(0, 192, 480, 44, '#5c8f5f');
    for (var x = 0; x < 480; x += 26) b += ell(x + 13, 194, 15, 9, '#69a06c');
    b += R(0, 236, 480, 124, '#dccfae') + L(0, 236, 480, 236, '#bfae86', 2);
    /* kaide, duvar, kapı */
    b += R(112, 288, 256, 14, '#d4cdbd', { s: '#a79f8c', sw: 1.2, r: 3 });
    b += R(124, 236, 232, 54, '#f4efe4', { s: '#b9b09a', sw: 1.4, r: 22 });
    b += Pa('M124,262 Q124,236 146,236 L146,290 Q124,290 124,262Z', '#ded6c4') + Pa('M356,262 Q356,236 334,236 L334,290 Q356,290 356,262Z', '#ded6c4');
    b += R(222, 246, 36, 44, '#3d322b', { r: 3 });
    /* sazlı çatı: dik eğimli, uçları yuvarlak */
    b += Pa('M100,240 Q96,196 146,150 Q190,116 240,112 Q290,116 334,150 Q384,196 380,240 Z', '#c9a463', { s: '#8f7035', sw: 2 });
    for (var k = 0; k < 15; k++) b += L(f(190 + k * 7.1), 124, f(112 + k * 18.2), 236, '#a2803f', 1.4, { o: .7 });
    b += L(188, 118, 292, 118, '#7d5f2c', 5, { c: 'round' });
    /* plan (oval) */
    b += R(366, 296, 104, 58, '#fff', { s: '#b9c2cc', sw: 1.6, r: 8 }) + ell(418, 325, 38, 15, '#f4efe4') + '<ellipse cx="418" cy="325" rx="38" ry="15" fill="none" stroke="#4f5a66" stroke-width="3"/>' + R(409, 337, 18, 6, '#fff');
    b += B(44, 150, 1, 156, 176) + B(44, 270, 2, 132, 266) + B(424, 270, 3, 420, 312) + B(448, 160, 4, 420, 204);
    F.add('mx-maya', {
      body: b,
      cap: 'Maya evi: sazlı çatı, oval plan, düz alçak orman (şematik)',
      legend: [
        'Çatı: huano palmiyesi yapraklarından örülmüş saz; saçak duvarın dışına taşar ve iki uç yuvarlaktır.',
        'Duvar: dikey sırık ve çubuklardan yapılır, yerel kille sıvanır (kil çoğu zaman kırmızıdır); altta nemden korumak için kireç harçlı taş bir kaide bulunur.',
        'Plan: tek oda; uzun bir gövdenin iki ucu yarım daire (apsis) biçimindedir. Kapı ön duvarın ortasındadır.',
        'Arka plan: Yucatán Yarımadası’nın kuzeybatısı düz bir kireçtaşı ovadır; alçak yaprak döken ormanda ağaçların çoğu 8–15 m boydadır.'
      ]
    });
  })();

  /* ---------- 4) LADA: tabelada telefon numarası ---------- */
  (function () {
    var b = R(18, 22, 444, 276, '#fff', { s: '#b9c2cc', sw: 2, r: 12 }) + R(18, 22, 444, 50, '#1f6f78', { r: 12 }) + R(18, 50, 444, 22, '#1f6f78') + T(240, 58, 'TIENDA', 28, '#fff', { a: 'middle', w: 800, ls: 4 });
    /* satır 1: üç haneli kod */
    b += R(84, 98, 88, 40, HL, { r: 5 }) + T(89, 127, '(999)', 28, '#111', { w: 800 }) + T(180, 127, '925-1234', 28, '#111', { w: 600 }) + T(454, 126, '3 hane', 15, C.mut, { a: 'end', w: 600 });
    /* satır 2: iki haneli kod */
    b += R(84, 166, 68, 40, HL, { r: 5 }) + T(89, 195, '(55)', 28, '#111', { w: 800 }) + T(160, 195, '1234-5678', 28, '#111', { w: 600 }) + T(454, 194, '2 hane', 15, C.mut, { a: 'end', w: 600 });
    /* satır 3: eski önek */
    b += R(84, 234, 42, 40, '#e8ebef', { r: 5 }) + T(89, 263, '01', 28, C.mut, { w: 700 }) + L(84, 274, 126, 234, C.red, 3, { c: 'round' }) + R(134, 234, 88, 40, HL, { r: 5 }) + T(139, 263, '(999)', 28, '#111', { w: 800 }) + T(230, 263, '925-1234', 28, '#111', { w: 600 }) + T(454, 262, 'eski önek', 15, C.mut, { a: 'end', w: 600 });
    b += B(40, 118, 1, 84, 118) + B(40, 186, 2, 84, 186) + B(40, 254, 3, 84, 254);
    F.add('mx-lada', {
      body: b,
      cap: 'Meksika’da tabelada telefon numarası: bölge kodu (LADA) nerede? (şematik)',
      legend: [
        '3 haneli bölge kodu: Mexico City, Guadalajara ve Monterrey dışındaki her yerde ilk üç hane koddur (örnekte 999 = Mérida, Yucatán). Numara toplam 10 hanedir.',
        '2 haneli kod yalnızca üç büyük şehirde: 55 Mexico City, 33 Guadalajara, 81 Monterrey. Kalan 8 hane numaranın kendisidir.',
        'Başta 01, 044 ya da 045 görürsen bunlar Ağustos 2019’da kalkan eski öneklerdir: sayma, bölge kodu bundan sonra gelir.'
      ]
    });
  })();

  /* ---------- kümeler ---------- */
  F.set('mx-cardon1', ['mx-cardon', 'mx-cardon-1', 'mx-cardon-2', 'mx-saguaro-1']);
  F.set('mx-agave1', ['mx-agave', 'mx-agave-1', 'mx-agave-2', 'mx-agave-3']);
  F.set('mx-maya1', ['mx-maya', 'mx-maya-1', 'mx-maya-2']);
  F.set('mx-lada1', ['mx-lada', 'mx-tel-1', 'mx-tel-2']);
})(typeof window !== 'undefined' ? window : globalThis);

/* figs-brazil.js — Brezilya: bölgeyi gösteren bitki ve direk çizimleri, DDD telefon numarası (özgün şematik çizimler).
   Doğrulanan olgular (kaynak):
   · Araucária (Araucaria angustifolia): düz gövde, yatay dallar, yaşlıda yassı "kandil" taç; 500–1500 m; Paraná, Santa Catarina, Rio Grande do Sul
     (yerel olarak São Paulo, Minas Gerais, Rio de Janeiro) — Gymnosperm Database, Wikipedia.
   · Beton direk kesiti: dairesel (R/C) ya da çift T (DT) — Neoenergia DIS-ETE-013, Energisa ETU-114.1, NBR 8451. "Merdiven" görünümü: altta uzun yatay
     yuvalar, tepeye doğru küçük delikler — geometas.com/brazil ve bir GeoGuessr direk rehberi.
   · Şehir oranları (merdiven/yuvarlak) ve "kurşun kalem ucu" (en sık Rio; Manaus ve Distrito Federal'de de) — tek bir topluluk sunumu
     (Google Slides "Brazil pole metas"); resmî veri değildir, legend'da bu şekilde belirtildi. Kalem ucunun tam biçimi şematiktir.
   · Açaí (Euterpe oleracea): çok gövdeli küme (kümede 25 gövdeye kadar), 3–20 m, Amazon nehir ağzının taşkın ormanları, Pará — FAO, Embrapa/Horticulturae 2024;
     Amazonas'ta açaı çoğunlukla tek gövdeli E. precatoria'dan gelir (aynı makale).
   · Babaçu (Attalea speciosa): tek gövde, 15–30 m, gövdede yaprak izi halkaları, 15–20 dev yaprak (9 m'ye kadar), yoğun yuvarlak taç — Feedipedia (FAO);
     Maranhão ve Piauí'de babaçu ormanları; Pará, Tocantins, Ceará'da da görülür (Wikipedia, UFMA).
   · Caatinga kaktüsleri: mandacaru (Cereus jamacaru), xique-xique (Xiquexique gounellei; 0,5–4 m çalı, dallar yaşlandıkça eğilir/yatar; kumlu-taşlı toprak, kaya
     çıkıntıları; Ceará, Rio Grande do Norte, Bahia) — Wikipedia, Genetics and Molecular Research 14(4) 2015, UFV Semiárido kaynakları.
   · DDD: parantez içinde iki hane bölge kodu; sabit hat 8 hane (2–5 ile başlar), cep 9 hane (9 ile başlar); 0800 ücretsiz hat.
   Çizimdeki sayı ve adlar ÖRNEKTİR. Hiçbir logo ya da gerçek firma adı yoktur. */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, L = F.L, Ci = F.Ci, Po = F.Po, Pa = F.Pa, B = F.B, C = F.C;
  var SKY = '#dcebf5', HILL = '#b8d3a6', LEAF = '#2f6a3d', LEAF2 = '#43914f', WOOD = '#6e4f35', HL = '#ffe680';
  function f(n) { return +n.toFixed(1); }
  function ell(cx, cy, rx, ry, fill, op) { return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + fill + '"' + (op != null ? ' opacity="' + op + '"' : '') + '/>'; }
  function tuft(cx, cy, rx, ry) { return ell(cx, cy, rx, ry, LEAF) + ell(cx, cy - ry * .32, rx * .78, ry * .56, LEAF2, .95); }
  /* hilal biçimli yaprak: (x,y) kökü, ang derece (0 sağ, -90 yukarı), len uzunluk, droop uçta aşağı sarkma, w kalınlık */
  function frond(x, y, ang, len, droop, w, fill) {
    var a = ang * Math.PI / 180, ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len + droop;
    var mx = x + Math.cos(a) * len * .5, my = y + Math.sin(a) * len * .5 - droop * .35;
    var nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
    return '<path d="M' + f(x) + ',' + f(y) + ' Q' + f(mx + nx) + ',' + f(my + ny) + ' ' + f(ex) + ',' + f(ey) + ' Q' + f(mx - nx) + ',' + f(my - ny) + ' ' + f(x) + ',' + f(y) + 'Z" fill="' + fill + '"/>';
  }
  var sky = function () { return R(0, 0, 480, 300, SKY); };

  /* ---------- 1) Araucária ---------- */
  (function () {
    var b = sky() + Pa('M0,300 L0,262 Q70,236 140,258 Q210,276 280,248 Q360,222 480,252 L480,300 Z', HILL) + F.ground(300);
    var cx = 296;
    b += Po((cx - 7) + ',304 ' + (cx + 7) + ',304 ' + (cx + 4) + ',132 ' + (cx - 4) + ',132', WOOD);
    var tufts = [[-92, 130, 34, 12, 170], [92, 130, 34, 12, 170], [-60, 112, 34, 12, 152], [60, 112, 34, 12, 152], [-30, 98, 32, 12, 140], [30, 98, 32, 12, 140], [0, 88, 26, 11, 132]];
    tufts.forEach(function (t) { b += Pa('M' + cx + ',' + t[4] + ' Q' + f(cx + t[0] * .5) + ',' + (t[4] - 6) + ' ' + f(cx + t[0] * .85) + ',' + (t[1] + 8), 'none', { s: WOOD, sw: 4 }); });
    b += ell(cx, 112, 86, 20, LEAF);
    tufts.forEach(function (t) { b += tuft(cx + t[0], t[1], t[2], t[3]); });
    /* genç ağaç: yatay katlar */
    var yx = 100;
    b += L(yx, 304, yx, 186, WOOD, 4, { c: 'round' });
    [[286, 46], [266, 40], [246, 34], [228, 27], [210, 20], [194, 13]].forEach(function (t) { b += tuft(yx, t[0], t[1], 8); });
    b += tuft(yx, 184, 7, 6);
    b += B(448, 100, 1, 404, 128) + B(448, 190, 2, 301, 190) + B(36, 150, 3, 70, 246) + B(448, 268, 4, 420, 246);
    F.add('br-arauc', {
      body: b,
      cap: 'Araucária (kandil ağacı): Brezilya’nın güney yaylalarının ağacı (şematik)',
      legend: [
        'Yaşlı ağaçta tepe yassı bir şemsiye ya da kandil gibidir: yatay dallar uçlarında sert, sivri iğne yapraklı demetler taşır ve uçlara doğru yukarı kıvrılır.',
        'Gövde düz ve uzundur; alttaki dallar zamanla dökülür, bu yüzden gövde çıplak görünür. Uzaktan siluet olarak bile tanınır.',
        'Genç ağaçta dallar gövdenin etrafında kat kat dizilir ve siluet koniye benzer. Çam değildir; halk arasında pinheiro-do-Paraná denir.',
        'Yer: 500–1500 m yükseklikteki serin yaylalar. Esas olarak Paraná, Santa Catarina ve Rio Grande do Sul; São Paulo, Minas Gerais ve Rio de Janeiro’nun yüksek yerlerinde de küçük topluluklar vardır.'
      ]
    });
  })();

  /* ---------- 4) Açaí ve babaçu palmiyeleri ---------- */
  (function () {
    var b = sky() + F.ground(300) + R(0, 300, 236, 60, '#a9cbe0') + L(0, 300, 236, 300, '#7fa9c4', 2) + L(20, 322, 80, 322, '#cfe4f0', 3, { c: 'round' }) + L(130, 340, 210, 340, '#cfe4f0', 3, { c: 'round' });
    /* açaí: aynı kökten çıkan üç ince gövde */
    var G1 = '#3d7f4b', G2 = '#5aa05f';
    ['M112,302 Q108,206 96,126', 'M122,302 Q124,186 128,94', 'M134,302 Q146,214 160,134'].forEach(function (d) { b += Pa(d, 'none', { s: '#8a7a5c', sw: 7 }); });
    [[96, 126], [128, 94], [160, 134]].forEach(function (t) {
      [-170, -140, -110, -70, -40, -10].forEach(function (a, k) { b += frond(t[0], t[1], a, 52 + (k % 2) * 10, 22 + (k % 3) * 6, 5, k % 2 ? G1 : G2); });
    });
    /* babaçu: tek kalın gövde, halka izleri, uçları kavisli dev yapraklar */
    var cx = 360;
    b += Po('350,302 370,302 366,150 354,150', '#8a7a5c');
    [170, 196, 222, 248, 274].forEach(function (y) { b += L(352, y, 368, y, '#6f6148', 1.6); });
    [-156, -134, -114, -98, -82, -66, -46, -24].forEach(function (a, k) { b += frond(cx, 148, a, 96 + (k % 3) * 8, 18 + (k % 2) * 8, 7, k % 2 ? '#2f7a46' : '#4b9a5a'); });
    b += B(40, 220, 1, 102, 220) + B(40, 334, 2, 82, 322) + B(448, 238, 3, 369, 238) + B(448, 70, 4, 410, 86);
    F.add('br-palm', {
      body: b,
      cap: 'Açaí (solda) ve babaçu (sağda) palmiyeleri (şematik)',
      legend: [
        'Açaí (Euterpe oleracea): aynı kökten çıkan çok gövdeli küme; bir kümede 25’e kadar gövde, boy 3–20 m. Yani tek direk gibi değil, demet gibi görünür.',
        'Yer: Amazon nehir ağzının taşkın ormanları; Pará en büyük üretici eyalettir. Amazonas eyaletinde açaı çoğunlukla tek gövdeli akrabasından (Euterpe precatoria) gelir.',
        'Babaçu (Attalea speciosa): tek, kalın gövde; 15–30 m, gövdede yaprak izi halkaları.',
        'Taç: 15–20 dev yaprak (9 m’ye kadar), yoğun ve yuvarlak. Babaçu ormanları Maranhão ve Piauí’de; Pará, Tocantins ve Ceará’da da görülür.'
      ]
    });
  })();

  /* ---------- 5) Caatinga kaktüsleri ---------- */
  (function () {
    var b = R(0, 0, 480, 300, '#e8eef4') + Pa('M0,300 L0,268 Q90,246 170,262 Q260,278 340,254 Q420,238 480,258 L480,300 Z', '#d5c7a4') + R(0, 300, 480, 60, '#dccaa0') + L(0, 300, 480, 300, '#bda97b', 2);
    var G = '#4a8a58', GD = '#2f6b45', G3 = '#7aa597';
    /* mandacaru: kalın gövde ve yukarı dönen kollar */
    b += Pa('M150,304 L150,118', 'none', { s: G, sw: 26 }) + Pa('M144,238 Q108,238 108,186 L108,148', 'none', { s: G, sw: 18 }) + Pa('M156,214 Q196,214 196,164 L196,128', 'none', { s: G, sw: 18 });
    [[145, 124, 304], [155, 124, 304], [104, 154, 190], [112, 154, 190], [192, 134, 168], [200, 134, 168]].forEach(function (t) { b += L(t[0], t[1], t[0], t[2], GD, 1.4, { o: .55 }); });
    /* xique-xique: alçak çalı, dallar eğilip yere paralel uzanır */
    ['M340,304 Q322,262 292,244', 'M340,304 Q340,256 338,222', 'M340,304 Q362,258 394,238', 'M336,304 Q298,292 262,284', 'M344,304 Q384,296 420,288'].forEach(function (d) { b += Pa(d, 'none', { s: G3, sw: 13 }); });
    /* kuru dikenli çalılar */
    [[236, 300], [440, 300]].forEach(function (p) {
      var x = p[0], y = p[1];
      b += Pa('M' + x + ',' + y + ' L' + x + ',' + (y - 34) + ' M' + x + ',' + (y - 18) + ' L' + (x - 14) + ',' + (y - 38) + ' M' + x + ',' + (y - 22) + ' L' + (x + 14) + ',' + (y - 42) + ' M' + x + ',' + (y - 34) + ' L' + (x - 8) + ',' + (y - 52), 'none', { s: '#8b8678', sw: 2.6 });
    });
    b += B(44, 104, 1, 108, 150) + B(448, 190, 2, 394, 238) + B(236, 190, 3, 236, 264);
    F.add('br-cactus', {
      body: b,
      cap: 'Caatinga: sütun kaktüs (mandacaru) ve çalı kaktüs (xique-xique) (şematik)',
      legend: [
        'Mandacaru (Cereus jamacaru): Caatinga manzarasını tanımlayan sütun kaktüslerden biri; kalın gövdeden yukarı kalkan kollar.',
        'Xique-xique: 0,5–4 m boyunda çalı biçimli kaktüs; dikey filizler yaşlandıkça eğrilir, hatta yere paralel uzanır. Kumlu-taşlı toprakta ve kaya çıkıntılarında yetişir; Ceará, Rio Grande do Norte ve Bahia’da yoğundur.',
        'Kuru mevsimde yaprağını döken seyrek, dikenli çalılık: Caatinga’nın görünümü. Piauí’den Bahia’ya kuzeydoğunun kurak iç kesimini (ayrıca Minas Gerais’in kuzeyini) kaplar; kıyı şeridi nemlidir ve bu görünümü vermez.'
      ]
    });
  })();

  /* ---------- 6) DDD: tabelada telefon numarası ---------- */
  (function () {
    var NB = ' ';
    var b = R(18, 22, 444, 276, '#fff', { s: '#b9c2cc', sw: 2, r: 12 }) + R(18, 22, 444, 50, '#1b6e3f', { r: 12 }) + R(18, 50, 444, 22, '#1b6e3f') + T(240, 58, 'LOJA', 28, '#ffe14d', { a: 'middle', w: 800, ls: 4 });
    /* satır 1: sabit hat */
    b += R(84, 98, 70, 40, HL, { r: 5 }) + T(89, 128, '(11)', 31, '#111', { w: 800 }) + T(162, 128, '3123-4567', 31, '#111', { w: 600 }) + T(450, 126, 'sabit hat', 16, C.mut, { a: 'end', w: 600 });
    /* satır 2: cep (9 hane) */
    b += R(84, 166, 70, 40, HL, { r: 5 }) + T(89, 196, '(85)', 31, '#111', { w: 800 }) + R(160, 166, 28, 40, '#ffd0a0', { r: 5 }) + T(165, 196, '9', 31, '#111', { w: 800 }) + T(192, 196, '9123-4567', 31, '#111', { w: 600 }) + T(450, 194, 'cep', 16, C.mut, { a: 'end', w: 600 });
    /* satır 3: ücretsiz hat */
    b += T(84, 270, '0800' + NB + '123' + NB + '4567', 31, C.mut, { w: 600 }) + T(450, 268, 'ücretsiz', 16, C.mut, { a: 'end', w: 600 });
    b += B(40, 118, 1, 84, 118) + B(40, 186, 2, 84, 186) + B(174, 224, 3, 174, 206) + B(40, 258, 4, 82, 258);
    F.add('br-ddd', {
      body: b,
      cap: 'Brezilya’da tabelada telefon numarası: DDD nerede? (şematik)',
      legend: [
        'DDD: numaranın başında parantez içindeki iki rakam bölge kodudur (örnekte 11 = São Paulo metropol bölgesi). Sabit hatlarda kalan 8 hane 2 ile 5 arasında bir rakamla başlar.',
        'Cep numarasında da kod aynı yerdedir: (85) = Fortaleza bölgesi (Ceará).',
        'Cep numarası 9 hanedir ve 9 ile başlar; o ilk 9 koda ait değildir, yer söylemez.',
        '0800 ile başlayan numara ücretsiz hattır ve yer söylemez; atla. DDD parantezsiz yazılsa da (11 91234-5678) baştaki iki rakam koddur.'
      ]
    });
  })();

  /* ---------- kümeler ---------- */
  F.set('br-arauc1', ['br-arauc', 'br-arauc-1', 'br-arauc-2']);
  F.set('br-palm1', ['br-palm', 'br-acai-1', 'br-babacu-1', 'br-babacu-2']);
  F.set('br-cactus1', ['br-cactus', 'br-cactus-1', 'br-cactus-2']);
  F.set('br-ddd1', ['br-ddd', 'br-tel-3', 'br-tel-4', 'br-tel-5', 'br-tel-2']);
})(typeof window !== 'undefined' ? window : globalThis);

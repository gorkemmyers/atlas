/* figs-india.js — Hindistan: tabelada yer adı nerede, hangi yazılarla yazılır; mil taşı renkleri (özgün şematik çizimler).
   Doğrulanan olgular: Wikipedia "Road signs in India" (şehir içi yollar ve eyalet yolları çoğunlukla eyalet dili + İngilizce; ulusal
   yollar eyalet dili + Hindi + İngilizce); NHAI genelgesi (2025, advance direction signs: A bölgesi Hindi + İngilizce, B ve C bölgesi
   eyaletlerinde sıra bölge dili → Hindi → İngilizce); IRC 67 (ulusal ve eyalet yollarında yön levhası yeşil zemin beyaz yazı);
   mil taşı renkleri (sarı = ulusal yol, yeşil = eyalet yolu, mavi / siyah / beyaz = şehir ya da ilçe yolu, turuncu = köy yolu; çok sayıda
   kaynakta tutarlı: Udayavani, OrissaPost, Kalinga TV, Odisha TV, civil4m). Çizimdeki yer adları ve sayılar ÖRNEKTİR. */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, Po = F.Po, B = F.B, C = F.C;
  var GRN = '#0d6b3d';
  var FN = F.FONT;
  FN.kn = "'Noto Sans Kannada','Nirmala UI','Kannada Sangam MN','Tunga',sans-serif";
  FN.ta = "'Noto Sans Tamil','Nirmala UI','Tamil Sangam MN','Latha',sans-serif";
  FN.te = "'Noto Sans Telugu','Nirmala UI','Telugu Sangam MN','Gautami',sans-serif";
  FN.ml = "'Noto Sans Malayalam','Nirmala UI','Malayalam Sangam MN','Kartika',sans-serif";
  FN.bn = "'Noto Sans Bengali','Nirmala UI','Bangla Sangam MN','Vrinda',sans-serif";
  FN.gu = "'Noto Sans Gujarati','Nirmala UI','Gujarati Sangam MN','Shruti',sans-serif";
  FN.pa = "'Noto Sans Gurmukhi','Nirmala UI','Gurmukhi Sangam MN','Raavi',sans-serif";
  FN.or = "'Noto Sans Oriya','Nirmala UI','Oriya Sangam MN','Kalinga',sans-serif";

  function board(x, y, w, h, fill) {
    return R(x, y, w, h, fill, { s: '#e9eef3', sw: 3, r: 10 }) + R(x + 6, y + 6, w - 12, h - 12, 'none', { s: '#fff', sw: 2, r: 7, o: .9 });
  }
  function arrowL(x, y) {
    var pts = [[x - 15, y], [x, y - 14], [x, y - 5], [x + 15, y - 5], [x + 15, y + 5], [x, y + 5], [x, y + 14]];
    return Po(pts.map(function (p) { return p.join(','); }).join(' '), '#fff');
  }

  /* ---------- 1) Üç dilli yön levhası ---------- */
  var DIR = [
    { id: 'in-dir-hi', hind: true, st: 'Hindi bölgesi', name: 'Hindi', hi: 'जयपुर', en: 'Jaipur', tip: '' },
    { id: 'in-dir-kn', f: 'kn', st: 'Karnataka', name: 'Kannada', reg: 'ಬೆಂಗಳೂರು', hi: 'बेंगलुरु', en: 'Bengaluru',
      tip: 'Kannada: yuvarlak, üst çizgisiz harfler; Telugu ile en çok karışan yazıdır.' },
    { id: 'in-dir-ta', f: 'ta', st: 'Tamil Nadu', name: 'Tamil', reg: 'சென்னை', hi: 'चेन्नई', en: 'Chennai',
      tip: 'Tamil: sade, yuvarlak-köşeli harfler; üstten çizgi geçmez, harflerde az kıvrım olur.' },
    { id: 'in-dir-te', f: 'te', st: 'Telangana ve Andhra Pradesh', name: 'Telugu', reg: 'హైదరాబాద్', hi: 'हैदराबाद', en: 'Hyderabad',
      tip: 'Telugu: yuvarlak harflerin çoğunun tepesinde küçük, “v” benzeri bir işaret bulunur.' },
    { id: 'in-dir-ml', f: 'ml', st: 'Kerala', name: 'Malayalam', reg: 'കൊച്ചി', hi: 'कोच्चि', en: 'Kochi',
      tip: 'Malayalam: çok yuvarlak, halkalı harfler; diğer güney yazılardan kolay ayrılır.' },
    { id: 'in-dir-bn', f: 'bn', st: 'Batı Bengal', name: 'Bengal', reg: 'কলকাতা', hi: 'कोलकाता', en: 'Kolkata',
      tip: 'Bengal yazısı Hindi gibi üst çizgilidir; ayrım harf biçimleridir (ক, ল, ত…).' },
    { id: 'in-dir-gu', f: 'gu', st: 'Gujarat', name: 'Gujarati', reg: 'અમદાવાદ', hi: 'अहमदाबाद', en: 'Ahmedabad',
      tip: 'Gujarati: Hindi’ye benzer ama üst çizgisi YOKTUR; bu çizgi eksikliği en kolay ayrımdır.' },
    { id: 'in-dir-pa', f: 'pa', st: 'Pencap', name: 'Gurmukhi (Pencapça)', reg: 'ਅੰਮ੍ਰਿਤਸਰ', hi: 'अमृतसर', en: 'Amritsar',
      tip: 'Gurmukhi: Hindi gibi üst çizgilidir ama ਅ ੲ ੳ gibi kendine özgü harfleri vardır.' },
    { id: 'in-dir-or', f: 'or', st: 'Odisha', name: 'Odia', reg: 'ଭୁବନେଶ୍ୱର', hi: 'भुवनेश्वर', en: 'Bhubaneswar',
      tip: 'Odia: harflerin tepesinde eğri bir “şapka” bulunur.' }
  ];
  DIR.forEach(function (d) {
    var lines = d.hind ? [[d.hi, 'hi', 42], [d.en, 'ui', 40]] : [[d.reg, d.f, 38], [d.hi, 'hi', 36], [d.en, 'ui', 34]];
    var base = d.hind ? [96, 160] : [78, 126, 172];
    var b = board(20, 20, 440, 206, GRN) + arrowL(54, 112);
    lines.forEach(function (ln, i) {
      b += T(92, base[i], ln[0], ln[2], '#fff', { f: ln[1], w: 700 }) + B(430, base[i] - 12, i + 1);
    });
    b += T(92, 210, '62 km', 20, '#fff', { w: 600 }) + B(40, 40, lines.length + 1);
    b += T(240, 262, d.hind ? 'Sıra: Hindi → İngilizce' : 'Sıra: bölge yazısı → Hindi → İngilizce', 18, C.ink, { w: 700, a: 'middle' });
    b += T(240, 292, 'İngilizce satır anahtardır: adı oradan oku', 17, C.ink, { a: 'middle' });
    b += T(240, 322, d.hind ? 'Hindi bölgesinde levhada iki satır olur' : d.st + ' · ' + d.name, 15, C.mut, { a: 'middle' });
    var leg = d.hind ? [
      'Hindi (Devanagari) satırı: harflerin tepesinden geçen kesintisiz yatay çizgiyle tanınır. Hindi bölgesindeki (NHAI’nin “A bölgesi”) ulusal yol levhalarında Hindi ve İngilizce olmak üzere iki satır bulunur.',
      'İngilizce satır yer adını Latin harfle verir. Hindi satırıyla eşleştirerek Devanagari harflerini öğrenirsin.',
      'Yeşil zemin, beyaz yazı: ulusal ve eyalet yollarındaki yön levhası. Şehir içindeki yerel hedefler beyaz zemin, siyah yazıyla da yazılabilir.'
    ] : [
      d.tip + ' İlk satır eyalet dilindeki yer adıdır (' + d.st + ').',
      'Hindi (Devanagari) satırı: harflerin tepesinden geçen kesintisiz yatay çizgiyle tanınır. Ulusal yol levhalarında hemen hemen her eyalette bulunur.',
      'İngilizce satır yer adını Latin harfle verir. Bölge yazısını bu adı kullanarak eşleştir: yazıları çiftler halinde böyle öğrenirsin.',
      'Yeşil zemin, beyaz yazı: ulusal ve eyalet yollarındaki yön levhası. NHAI’nin 2025 genelgesine göre B ve C bölgesi eyaletlerinde sıra bölge dili → Hindi → İngilizce. Wikipedia’ya göre şehir içi yollarda ve eyalet yollarında çoğu zaman yalnız eyalet dili + İngilizce, ulusal yollarda eyalet dili + Hindi + İngilizce görülür.'
    ];
    F.add(d.id, { body: b, cap: 'Hindistan yön levhası: ' + d.st + (d.hind ? '' : ' (' + d.name + ')') + ' (şematik)', legend: leg });
  });

  /* ---------- 2) Mil taşı renkleri ---------- */
  (function () {
    function stone(cx, topc, tc, lab, num) {
      var x = cx - 40;
      return R(x, 96, 80, 196, '#fff', { s: '#9aa3ad', sw: 2, r: 12 }) + R(x, 96, 80, 62, topc, { s: '#9aa3ad', sw: 2, r: 12 }) + R(x, 146, 80, 12, topc) +
        T(cx, 135, lab, 24, tc, { w: 800, a: 'middle' }) + T(cx, 202, 'Agra', 20, '#111', { w: 700, a: 'middle' }) + T(cx, 244, num, 34, '#111', { w: 800, a: 'middle' }) + T(cx, 272, 'km', 16, C.mut, { a: 'middle' });
    }
    var b = F.ground(292) +
      stone(66, '#f2c200', '#111', 'NH 44', '45') + stone(182, '#1f9a50', '#fff', 'SH 5', '12') + stone(298, '#2a5db0', '#fff', '', '8') + stone(414, '#f08a1c', '#111', '', '3');
    b += T(66, 326, 'ulusal yol', 16, C.ink, { w: 700, a: 'middle' }) + T(182, 326, 'eyalet yolu', 16, C.ink, { w: 700, a: 'middle' }) + T(298, 326, 'şehir / ilçe', 16, C.ink, { w: 700, a: 'middle' }) + T(414, 326, 'köy yolu', 16, C.ink, { w: 700, a: 'middle' });
    b += B(66, 62, 1, 66, 96) + B(182, 62, 2, 182, 96) + B(298, 62, 3, 298, 96) + B(414, 62, 4, 414, 96) + B(16, 244, 5, 26, 244);
    F.add('in-mile', {
      body: b,
      cap: 'Hindistan mil taşları: üst renk yolun türünü söyler (şematik)',
      legend: [
        'Sarı üst bant: ulusal yol (NH). NHAI işletir; birden çok eyaleti birbirine bağlar.',
        'Yeşil üst bant: eyalet yolu (SH). Eyalet hükümeti yapar ve işletir.',
        'Mavi, siyah (ya da beyaz) üst bant: şehir yolu ya da ana ilçe (district) yolu. Şehir ya da ilçe yönetimi işletir. Kaynaklarda mavi ve siyah birlikte anılır.',
        'Turuncu üst bant: köy yolu. Turuncu şerit, kırsal yol programı PMGSY (Pradhan Mantri Gram Sadak Yojana) ile ilişkilendirilir.',
        'Alt kısım beyazdır; üzerinde yer adı ve o yere uzaklık (km) yazar. Yazı düzeni (bölge yazısı, Hindi, İngilizce) eyalete göre değişir. Mil taşı yer adını verir ama il (eyalet) adını vermez: eyaleti yazıdan çıkar.'
      ]
    });
  })();

  F.set('in-mile1', ['in-mile', 'in-mile-1', 'in-mile-2', 'in-mile-3']);
  /* gerçek fotoğraflar önce, şematik çizimler sonra */
  F.set('in-dir-all', ['in-dir-kn-1', 'in-dir-ml-1', 'in-dir-ml-2', 'in-dir-bn-1', 'in-dir-gu-1', 'in-dir-pa-1', 'in-dir-or-1', 'in-dir-mr-1', 'in-dir-mr-2', 'in-dir-te-1', 'in-dir-ta-1'].concat(DIR.map(function (d) { return d.id; })));
})(window);

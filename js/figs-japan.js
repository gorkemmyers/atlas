/* figs-japan.js — Japonya: elektrik direği çizimleri (üst bant, levha biçimleri, gövde şeritleri).
   Kaynaklar (topluluk rehberleri, hepsi çapraz karşılaştırıldı; ayrıntı KURALLAR.md > "Japonya direk kaynakları"):
   Geoguessr Japan Wiki (wikiwiki.jp/geoguessr), sloor.hatenablog.com (şirket başına yazılar), note.com/91rp0jno, note.com/atago_note,
   mititt.jp, Learnable Meta "Japan" haritası. Levha içindeki yazılar ÖRNEKTİR (gerçek bir direğin kopyası değildir). */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, TV = F.TV, L = F.L, Ci = F.Ci, Po = F.Po, Pa = F.Pa, B = F.B, C = F.C;

  /* sol taraftaki küçük direk: nerede durduğunu gösterir. hl = 'plate' | 'wrap' | 'band' | 'all'; plates = elektrik levhası sayısı */
  function mini(hl, o) {
    o = o || {};
    var s = F.R(0, 338, 128, 22, C.grass) + L(0, 338, 128, 338, '#8aa37a', 2) + F.pole(46, 8, 38, 332);
    if (o.arrow) s += R(31, 196, 15, 15, C.y, { s: '#111', sw: 1.5 }) + Po('34,208 38.5,199 43,208', '#111');   /* yan tarafta sarı ok levhası */
    /* üst bant */
    s += R(46, 66, 38, 16, C.yel, { s: '#111', sw: 1.4 }) + R(51, 71, 28, 2.5, '#111') + R(51, 76, 20, 2.5, '#111');
    /* elektrik levhaları (1 ya da 3) ve NTT levhası */
    var n = o.plates || 1, py = 96;
    for (var i = 0; i < n; i++) { s += R(51, py, 28, n > 1 ? 24 : 40, '#fff', { s: '#333', sw: 1.3 }); py += n > 1 ? 28 : 46; }
    s += R(53, py, 24, 22, '#fff', { s: '#333', sw: 1.3 }) + R(53, py, 24, 22, 'none', { s: '#777', sw: 0, d: '2 2' });
    /* gövde şeridi */
    s += F.tiger(46, 226, 38, 84, 4, 3);
    var ring = function (x, y, w, h) { return R(x, y, w, h, 'none', { s: C.y, sw: 4, r: 3 }) + R(x, y, w, h, 'none', { s: '#111', sw: 1, r: 3 }); };
    if (hl === 'plate') s += ring(47, 91, 36, n > 1 ? 90 : 50);
    if (hl === 'wrap') s += ring(41, 221, 48, 94);
    if (hl === 'band') s += ring(41, 61, 48, 26);
    return s;
  }
  /* küçük direkten büyütülmüş levhaya kesik çizgili "yakınlaştırma" çizgileri */
  function zoom(x1, y1a, y1b, x2, y2a, y2b) {
    return L(x1, y1a, x2, y2a, C.line, 1.2, { d: '4 3' }) + L(x1, y1b, x2, y2b, C.line, 1.2, { d: '4 3' });
  }
  function plate(x, y, w, h, fill, r) { return R(x, y, w, h, fill || '#fff', { s: '#2a2f36', sw: 2.4, r: r || 5 }); }
  function logoBox(x, y, r) { return Ci(x, y, r, '#fff', { s: C.mut, sw: 1.6, d: '3 3' }) + T(x, y + 4, 'logo', 10, C.mut, { a: 'middle' }); }
  function ntt(x, y, w, h, fill) { return R(x, y, w, h, fill || '#fff', { s: '#2a2f36', sw: 2, r: 3 }) + R(x + 5, y + 8, w - 10, 3, '#9aa3ad') + R(x + 5, y + 16, (w - 10) * .7, 3, '#9aa3ad'); }

  /* ---------- 1) Direğin üç parçası ---------- */
  (function () {
    var b = F.ground(318) + F.pole(150, 8, 84, 312);
    /* üst bant */
    b += R(150, 54, 84, 26, C.yel, { s: '#111', sw: 2 }) + R(150, 54, 84, 4, '#111') + R(150, 76, 84, 4, '#111') + T(192, 73, '自家発連系有', 12.5, '#111', { a: 'middle', f: 'jp', w: 700 });
    /* levhalar */
    b += plate(160, 100, 64, 60, '#fff', 3) + T(192, 128, '12', 24, C.ink, { a: 'middle', w: 700 }) + R(166, 106, 14, 8, '#fff', { s: C.mut, sw: 1, d: '2 2' }) +
      ntt(165, 170, 54, 36);
    /* gövde şeridi */
    b += F.tiger(150, 226, 84, 80, 6, 5);
    /* etiketler */
    b += B(288, 67, 1, 238, 67) + T(308, 73, 'Üst bant', 17, C.ink, { w: 700 });
    b += B(288, 150, 2, 228, 150) + T(308, 156, 'Levhalar', 17, C.ink, { w: 700 }) + T(308, 176, 'elektrik + NTT', 14, C.mut);
    b += B(288, 266, 3, 238, 266) + T(308, 272, 'Gövde şeridi', 17, C.ink, { w: 700 }) + T(308, 292, '電柱標識板', 14, C.mut, { f: 'jp' });
    F.add('jp-pole-anatomy', {
      body: b,
      cap: 'Japon elektrik direğinin üç parçası (şematik)',
      legend: [
        'Üst bant (siyah-sarı): yakında güneş paneli gibi kendi elektriğini üreten bir yapı olduğunu bildirir. Yazı şirkete göre değişir; kaynaklarda yalnız Shikoku’daki yazı belgeli (自家発連系有 / 自家発逆潮有).',
        'Levhalar: üstteki elektrik şirketinin, alttaki NTT’nin (telefon) levhasıdır. Bölgeyi söyleyen, elektrik şirketinin levhasının biçimi ve yazı yönüdür.',
        'Gövde şeridi (電柱標識板): çarpışmayı önlemek için sarılan siyah zeminli, sarı yansıtıcı şeritli sargı. Türü bölgeye göre değişir (sarmal, kenarlıksız, turuncu-siyah…).'
      ]
    });
  })();

  /* ---------- 2) Üst bant ---------- */
  (function () {
    var b = mini('band') + T(160, 36, 'Levhaların ÜSTÜNDEKİ bant', 17, C.ink, { w: 700 }) + zoom(88, 62, 86, 168, 82, 156);
    function strip(y, txt) {
      return R(168, y, 290, 74, C.yel, { s: '#111', sw: 3, r: 4 }) + R(168, y, 290, 9, '#111') + R(168, y + 65, 290, 9, '#111') +
        T(313, y + 52, txt, 38, '#111', { a: 'middle', f: 'jp', w: 800, ls: 2 });
    }
    b += strip(82, '自家発連系有') + strip(172, '自家発逆潮有');
    b += B(172, 70, 1, 190, 90) + B(172, 262, 2, 200, 244) + T(168, 318, 'Shikoku Elektrik’te belgelenmiş örnekler', 14, C.mut);
    F.add('jp-band', {
      body: b,
      cap: 'Levhaların üstündeki siyah-sarı bant ve yazısı (şematik)',
      legend: [
        '自家発連系有 = «kendi üretimi şebekeye bağlı», 自家発逆潮有 = «kendi üretimi şebekeye elektrik geri veriyor» (ters akış).',
        'Bant yalnız yakında güneş enerjisi gibi kendi üretimi olan bir yapı varsa takılır; bu yüzden her direkte yoktur. Kaynaklarda yazının yalnız Shikoku örneği belgeli, diğer şirketlerin yazısı farklı olabilir: tek başına bölge kanıtı sayma.'
      ]
    });
  })();

  /* ---------- 3) Şirket başına levha çizimleri ---------- */
  var KEYS = [];
  function scene(co, name, o) {
    var b = mini('plate', { plates: o.plates, arrow: o.arrow }) + zoom(80, 96, o.plates > 1 ? 176 : 138, o.zx, o.zy1, o.zy2) + o.body +
      T(150, 30, name, 18, C.ink, { w: 700 }) + T(150, 50, 'şematik örnek', 13, C.mut);
    F.add('jp-pl-' + co, { body: b, cap: name + ' levhası (şematik)', legend: o.legend });
    KEYS.push('jp-pl-' + co);
  }

  /* Hokkaido: dikey levha, satır satır iki haneli sayılar */
  (function () {
    var x = 232, y = 70, w = 128, h = 252, cx = x + w / 2, b = plate(x, y, w, h, '#fff', 6);
    ['21', '05', '33'].forEach(function (t, i) { b += T(cx, y + 42 + i * 32, t, 26, C.ink, { a: 'middle', w: 600 }); });
    b += L(x + 10, y + 124, x + w - 10, y + 124, '#9aa3ad', 1.4);
    ['47', '12'].forEach(function (t, i) { b += T(cx, y + 176 + i * 60, t, 52, C.ink, { a: 'middle', w: 800 }); });
    b += ntt(386, 190, 56, 70, C.yel);
    b += B(206, y + 70, 1, x, y + 70) + B(206, y + 208, 2, x, y + 208) + B(414, 166, 3, 414, 190);
    scene('hkd', 'Hokkaido Elektrik (北海道電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Üstte 2–3 satır küçük, iki haneli sayı: Hokkaido’yu ızgaraya bölen konum kodu. Bir topluluk rehberine göre ilk iki hane yaklaşık şehri verir.',
        'Altta daha büyük direk numaraları. Alt alta dizilmiş çok sayıda sayı = Hokkaido.',
        'Yanındaki NTT levhası Hokkaido’da çoğunlukla sarıdır. Hokkaido Elektrik levhası da ara sıra sarı olabilir; Sapporo’daki sarı sokak lambası levhasıyla karıştırma.'
      ]
    });
  })();

  /* Tohoku: yatay levha, solda logo, altta büyük sayı */
  (function () {
    var x = 178, y = 110, w = 268, h = 150, b = plate(x, y, w, h, '#e9ecef', 6);
    b += logoBox(x + 30, y + 30, 16) + T(x + 58, y + 36, '大町線', 18, C.ink, { f: 'jp' }) + T(x + w / 2, y + 124, '12', 70, C.ink, { a: 'middle', w: 800 });
    b += ntt(186, 276, 34, 54);
    b += B(x + 96 + 18, y - 22, 1, x + 40, y + 24) + B(x + w - 28, y - 22, 2, x + w - 90, y + 98) + B(246, 304, 3, 220, 304);
    scene('toh', 'Tohoku Elektrik (東北電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Sol üstte şirket logosu; yanında küçük harflerle hat adı (kanji).',
        'Altta büyük sayı, harf ya da yön yazısı. Yatay levhada kanji görüyorsan Tohoku’dur.',
        'Yatay biçim; aynı direkteki NTT levhası genellikle dikeydir. Niigata da Tohoku Elektrik bölgesinde olduğu için orada da bu biçim çıkar.'
      ]
    });
  })();

  /* TEPCO: dikey beyaz levha, yatay kanji; koyu mavi ve el yazılı gri varyantlar */
  (function () {
    var x = 190, y = 76, w = 132, h = 220, cx = x + w / 2, b = plate(x, y, w, h, '#fff', 6);
    b += T(cx, y + 92, '中央', 44, C.ink, { a: 'middle', f: 'jp', w: 700 }) + L(x + 14, y + 114, x + w - 14, y + 114, '#9aa3ad', 1.4) + T(cx, y + 176, '3-12', 36, C.ink, { a: 'middle', w: 700 });
    b += plate(352, 100, 84, 104, '#2c4a73', 5) + T(394, 140, '中央', 24, '#fff', { a: 'middle', f: 'jp', w: 700 }) + T(394, 180, '3-12', 20, '#fff', { a: 'middle' });
    b += plate(352, 226, 84, 104, '#cfd3d8', 5) + T(394, 268, 'ﾅｶ', 28, '#333', { a: 'middle', f: 'jp', i: 1 }) + Pa('M362 296 q10 -10 20 0 t20 0 t20 0', 'none', { s: '#333', sw: 2 });
    b += B(166, y + 70, 1, x, y + 70) + B(466, 150, 2, 436, 150) + B(466, 276, 3, 436, 276);
    scene('tep', 'Tokyo Elektrik / TEPCO (東京電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Çoğunlukla dikey beyaz levha; yazı YATAY kanjidir (yer adı). Kansai’deki gibi alt alta değildir.',
        'Koyu mavi (açık maviyi koyulaştırmış gibi) levha da TEPCO’dur.',
        'El yazısıyla yazılmış gri teneke levha yalnızca TEPCO’da görülür. Yamanashi ve Shizuoka’nın doğusu da TEPCO bölgesidir.'
      ]
    });
  })();

  /* Hokuriku: yatay levha, sol üstte dört haneli sayı */
  (function () {
    var x = 178, y = 126, w = 268, h = 118, b = plate(x, y, w, h, '#fff', 6);
    b += T(x + 16, y + 34, '4321', 26, C.ink, { w: 800 }) + T(x + w / 2, y + 96, 'I\u00a02500', 52, C.ink, { a: 'middle', w: 800 }) +
      Ci(x + w - 32, y + 32, 17, '#fff', { s: C.mut, sw: 1.6, d: '3 3' }) + Pa('M' + (x + w - 29) + ' ' + (y + 20) + ' l-8 14 h7 l-3 12 l10 -16 h-7 z', C.ink);
    b += B(x + 38, y - 22, 1, x + 40, y + 20) + B(x + w - 32, y - 22, 2, x + w - 32, y + 14) + B(x + w / 2, y + h + 26, 3, x + w / 2, y + h - 8);
    scene('hrk', 'Hokuriku Elektrik (北陸電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Sol üstteki 4 haneli sayı bölgeyi söyler: 0000–3999 Toyama, 4000–7999 Ishikawa, 8000–9999 Fukui. İlk hane şehri verir (0 Toyama, 4 Kanazawa, 8 Fukui).',
        'Dairenin içinde yıldırım işareti (logo, yaklaşık çizim).',
        'Ortada harf/katakana + sayı yazar (örnek: I 2500). Levha yataydır (Tohoku’dakinden biraz alçak); aynı direkteki NTT levhası da yataydır.'
      ]
    });
  })();

  /* Chubu: köşeleri yuvarlak levha */
  (function () {
    var x = 214, y = 74, w = 138, h = 224, b = plate(x, y, w, h, '#f6d9a0', 56);
    b += logoBox(x + w / 2, y + 52, 17) + T(x + w / 2, y + 150, '45', 62, C.ink, { a: 'middle', w: 800 }) + T(x + w / 2, y + 190, 'A-8', 26, C.ink, { a: 'middle', w: 700 });
    b += plate(372, 130, 76, 120, '#fff', 30) + T(410, 204, '45', 34, C.ink, { a: 'middle', w: 800 });
    b += B(190, y + 30, 1, x + 8, y + 30) + B(284, y - 16, 2, x + w / 2, y + 40) + B(410, 112, 3, 410, 134);
    scene('chu', 'Chubu Elektrik (中部電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Köşeleri yuvarlak (oval gibi) levha: başka hiçbir şirkette yoktur, uzaktan bile seçilir.',
        'Eski levha açık turuncu/sarımsı; üstünde şirket logosu (yaklaşık çizim).',
        'Yeni takılanlarda beyaz levha da yaygındır. Bölge: Aichi, Nagano, Gifu, Mie ve Shizuoka’nın büyük kısmı.'
      ]
    });
  })();

  /* Kansai: dikey beyaz levha, yazı alt alta */
  (function () {
    var x = 222, y = 62, w = 118, h = 262, cx = x + w / 2, b = plate(x, y, w, h, '#fff', 6);
    b += TV(cx, y + 62, 'ミナト', 54, C.ink, 62, { f: 'jp', w: 700 }) + L(x + 14, y + 218, x + w - 14, y + 218, '#9aa3ad', 1.4) + T(cx, y + 250, '8', 30, C.ink, { a: 'middle', w: 700 });
    b += ntt(372, 160, 80, 38);
    b += B(190, y + 110, 1, x, y + 110) + B(412, 134, 2, 412, 160);
    scene('kan', 'Kansai Elektrik (関西電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Dikey beyaz levha; yer adı katakana ya da kanji ile ALT ALTA yazılır (TEPCO’da yazı yataydır). Çoğu levha sadedir; ayırt eden yazı yönüdür. Chugoku’nun bazı yerlerinde de benzer dikey yazı görülür, dikkat.',
        'Güney Fukui’de Kansai levhasının yanında YATAY bir NTT levhası varsa konum Mihama’nın batısıdır.'
      ]
    });
  })();

  /* Chugoku: yatay, sağa yaslı katakana; EnerGia; çok levha */
  (function () {
    var x = 176, y = 78, w = 272, h = 96, b = plate(x, y, w, h, '#fff', 6);
    b += T(x + w - 16, y + 62, 'ニシマチ', 40, C.ink, { a: 'end', f: 'jp', w: 700 });
    var y2 = 206, b2 = plate(x, y2, w, h, '#fff', 6) + T(x + w / 2, y2 + 28, 'EnerGia', 20, '#8a939e', { a: 'middle', w: 600, o: 0.75 }) + T(x + 16, y2 + 76, '西町 12', 34, C.ink, { f: 'jp', w: 700 });
    b += b2;
    b += B(x + w - 150, y - 22, 1, x + w - 150, y + 24) + B(x + w - 36, y2 + 126, 2, x + w - 100, y2 + 22);
    b += B(18, 206, 3, 31, 204) + B(18, 130, 4, 46, 130);
    scene('chg', 'Chugoku Elektrik (中国電力)', {
      zx: x, zy1: y, zy2: y2 + h, body: b, plates: 3, arrow: 1,
      legend: [
        'En çok biçimin bir arada olduğu bölge, bu yüzden levhaya güvenmek zor. Ayırt edici olan: YATAY katakana, SAĞA yaslı.',
        'Bazı levhaların üstünde silik «EnerGia» yazısı/logosu olur (yeni tipte C biçimli logo).',
        'Direğin yan tarafındaki sarı ok levhası (昇降表示札) bu şirketin direklerinde görülür.',
        'Hiroshima’da aynı direkte çoğu kez 3 ya da daha çok levha bulunur.'
      ]
    });
  })();

  /* Shikoku: yatay, sola yaslı katakana, üstte logo */
  (function () {
    var x = 176, y = 108, w = 272, h = 150, b = plate(x, y, w, h, '#fff', 6);
    b += Po((x + 18) + ',' + (y + 14) + ' ' + (x + 44) + ',' + (y + 14) + ' ' + (x + 44) + ',' + (y + 40) + ' ' + (x + 18) + ',' + (y + 40), '#fff', { s: C.mut, sw: 1.6 }) +
      L(x + 31, y + 14, x + 31, y + 40, C.mut, 1.4) + L(x + 18, y + 27, x + 44, y + 27, C.mut, 1.4) +
      T(x + 18, y + 94, 'ニシマチ', 42, C.ink, { f: 'jp', w: 700 }) + T(x + 18, y + 130, '四国電力', 17, '#9aa3ad', { f: 'jp', o: 0.9 });
    b += B(x + 150, y + h + 28, 1, x + 150, y + 104) + B(x + 31, y - 24, 2, x + 31, y + 14) + B(x + 80, y + h + 28, 3, x + 70, y + 126);
    scene('shk', 'Shikoku Elektrik (四国電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Yatay katakana, SOLA yaslı (Chugoku’daki gibi sağa yaslı değil). Levhalar küçüktür. Chugoku’nun bazı yerlerinde de sola yaslı katakana görülür; emin değilsen tabela ve diğer ipuçlarına bak.',
        'Üstte dört parçalı logo (yaklaşık çizim).',
        'Altta şirket adı (四国電力); yazı çoğunlukla silik olur, logo daha kolay seçilir.'
      ]
    });
  })();

  /* Kyushu: tek katakana + sayı */
  (function () {
    var x = 214, y = 66, w = 138, h = 248, cx = x + w / 2, b = plate(x, y, w, h, '#fff', 6);
    b += T(cx, y + 104, 'カ', 92, C.ink, { a: 'middle', f: 'jp', w: 800 }) + T(cx, y + 206, '113', 66, C.ink, { a: 'middle', w: 800 });
    b += Ci(x + 10, y + 150, 11, '#3a3a3a', { o: 0.28 }) + Ci(x + w - 10, y + 176, 9, '#3a3a3a', { o: 0.28 });
    b += B(184, y + 60, 1, x, y + 60) + B(184, y + 180, 2, x, y + 180) + B(396, y + 150, 3, x + w - 6, y + 176);
    scene('kyu', 'Kyushu Elektrik (九州電力)', {
      zx: x, zy1: y, zy2: y + h, body: b,
      legend: [
        'Tek bir katakana harfi (örnek: カ) ile başlar.',
        'Harfin altında birkaç haneli sayı (örnek: 113). «Tek harf + çok sayı» Kyushu’nun en kolay tanınan levhasıdır.',
        'Levhanın kenarlarında bazen kararmış (yanık gibi) lekeler görülür; Hokkaido’da da olur.'
      ]
    });
  })();

  /* Okinawa: çizgili levha + üç levha */
  (function () {
    var x = 190, y = 72, w = 186, h = 232, b = plate(x, y, w, h, '#fff', 6);
    [0, 1, 2, 3].forEach(function (i) {
      var yy = y + 20 + i * 52;
      if (i) b += L(x, yy - 8, x + w, yy - 8, C.ink, 1.6);
      b += T(x + 14, yy + 28, 'No.', 22, C.ink, { w: 600 }) + T(x + w - 14, yy + 32, ['12', '07', '48', '9'][i], 34, C.ink, { a: 'end', w: 800 });
    });
    b += B(160, y + 92, 1, x, y + 92) + B(18, 134, 2, 46, 134);
    scene('oki', 'Okinawa Elektrik (沖縄電力)', {
      zx: x, zy1: y, zy2: y + h, body: b, plates: 3,
      legend: [
        'Çizgili levha: satırlar yatay çizgilerle ayrılmıştır (罫線) ve numara işaretleri vardır.',
        'Direkte genellikle üç levha olur; en alttaki direk tipini gösterir. Okinawa dışında bu biçim yoktur.'
      ]
    });
  })();

  F.set('jp-anat', ['jp-pole-anatomy', 'jp-band', 'jp-wrap-1', 'jp-wrap-2']);
  F.set('jp-plates', KEYS);
  ['hkd', 'toh', 'tep', 'hrk', 'chu', 'kan', 'chg', 'shk', 'kyu', 'oki'].forEach(function (c) { F.set('jp-pl-' + c, c === 'toh' ? ['jp-pl-toh', 'jp-toh-1'] : ['jp-pl-' + c]); });

  /* ---------- 4) Gövde şeritleri (電柱標識板) ---------- */
  function wrapScene(key, title, body, cap, legend) {
    var b = F.ground(330) + F.pole(170, 74, 84, 256) + body + T(24, 34, title, 18, C.ink, { w: 700 }) + T(24, 54, 'şematik örnek', 13, C.mut);
    F.add(key, { body: b, cap: cap, legend: legend });
  }
  /* standart dikey şerit: gerçek fotoğraf (jp-wrap-1, jp-wrap-2 → js/photos.js); çizimi kaldırıldı (kullanıcı kararı, 16 Kasım 2026) */
  /* Kansai (kenarlıksız), Hokuriku (sarmal) ve Shikoku (turuncu-siyah) şerit çizimleri kaldırıldı: şerit için yalnız gerçek fotoğraf (kullanıcı kararı, 16 Kasım 2026); bu türler yalnız metinle anlatılır. */
  F.set('jp-wraps', ['jp-wrap-1', 'jp-wrap-2']);
  F.set('jp-band1', ['jp-band']);
})(window);

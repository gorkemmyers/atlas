/* figs-korea.js — Güney Kore: tabelada il ve şehir adı nerede, nasıl yazılır (özgün şematik çizimler).
   Doğrulanan olgular (Kore Karayolu Tabela Yönetmeliği 도로표지규칙 Madde 3, 7, 8; Wikipedia "Road signs in South Korea";
   Seul Büyükşehir Belediyesi'nin yol tabelası İngilizce yazım kılavuzu özeti):
   · Yön ve mesafe levhasında zemin varsayılan olarak yeşil, yazı beyazdır; otoyol, ulusal yol ve motorlu taşıt yolu olmayan,
     şehir içindeki sıradan yollarda sınır, mesafe, yön ve güzergâh levhaları mavidir.
   · Tabela yazısı ilke olarak Hangul + İngilizce (Latin) birliktedir; gerekirse İngilizce atlanabilir.
   · Latin büyük harf yüksekliği Hangul yüksekliğinin %60'ıdır (Latin satırı küçüktür).
   · Sınır levhası (경계표지) il ve şehir, ilçe, kasaba, bucak sınırlarını gösterir; tasarımı yerel yönetimlere göre değişir → ÇİZİLMEDİ.
   Çizimdeki ad ve kurum örnekleri ÖRNEKTİR (gerçek bir tabelanın kopyası değildir). */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, L = F.L, Po = F.Po, B = F.B, C = F.C;
  var GRN = '#0d6b3d', BLU = '#1c4f9b', HL = '#ffe680';

  /* levha gövdesi: renkli zemin, açık kenar, iç beyaz çerçeve */
  function board(x, y, w, h, fill) {
    return R(x, y, w, h, fill, { s: '#e9eef3', sw: 3, r: 10 }) + R(x + 6, y + 6, w - 12, h - 12, 'none', { s: '#fff', sw: 2, r: 7, o: .9 });
  }
  /* beyaz ok (dir: 'l' | 'r'), (x,y) = okun ortası */
  function arrow(x, y, dir) {
    var d = dir === 'l' ? -1 : 1, x0 = x - 15 * d;
    var pts = [[x0 + 30 * d, y], [x0 + 14 * d, y - 13], [x0 + 14 * d, y - 5], [x0, y - 5], [x0, y + 5], [x0 + 14 * d, y + 5], [x0 + 14 * d, y + 13]];
    return Po(pts.map(function (p) { return p.join(','); }).join(' '), '#fff');
  }
  /* bir satır: ok + büyük Hangul + altında küçük Latin (y = satırın üstü) */
  function row(x, y, hangul, latin, dir) {
    return arrow(x + 30, y + 27, dir) + T(x + 62, y + 40, hangul, 34, '#fff', { f: 'kr', w: 700 }) + T(x + 64, y + 62, latin, 22, '#fff', { w: 600 });
  }

  /* ---------- 1) Yön levhası: ad nerede? ---------- */
  (function () {
    var b = '';
    b += board(18, 14, 380, 158, GRN) + row(18, 22, '수원', 'Suwon', 'l') + row(18, 88, '평택', 'Pyeongtaek', 'r');
    b += board(18, 188, 380, 158, BLU) + row(18, 196, '대구', 'Daegu', 'l') + row(18, 262, '경산', 'Gyeongsan', 'r');
    b += B(438, 52, 1, 160, 52) + B(438, 82, 2, 168, 80);
    b += B(438, 130, 3, 398, 130) + B(438, 268, 4, 398, 268);
    F.add('kr-dir', {
      body: b,
      cap: 'Kore yön levhası: ad nerede yazar? (şematik)',
      legend: [
        'Büyük yazı Hangul’dur: il ya da şehrin adı budur. Levhada önce bu satırı ara; Hangul’u çözemiyorsan sıradaki küçük satır sana cevabı verir.',
        'Altındaki küçük satır aynı adın Latin harfli yazımıdır (Revised Romanization). Kurala göre Latin harf yüksekliği Hangul’un yaklaşık %60’ıdır, yani hep küçüktür. Bu satırı Hangul ile eşleştirerek ezberle. Gerektiğinde İngilizce yazı hiç konmayabilir; o zaman yalnız Hangul vardır.',
        'Yeşil zemin: varsayılan renk. Otoyol, ulusal yol ve şehir dışındaki yollarda yön, mesafe ve sınır levhaları yeşil, yazı beyazdır.',
        'Mavi zemin: şehir içindeki sıradan yollarda (otoyol, ulusal yol ve motorlu taşıt yolu dışında) sınır, mesafe, yön ve güzergâh levhaları mavidir. Mavi levha “şehir içindeyim” ipucudur.'
      ]
    });
  })();

  /* ---------- 2) Kurum tabelası: ad + tür ---------- */
  (function () {
    var rows = [
      ['양평', '군청', 'ilçe yönetimi (군)'],
      ['용문', '면사무소', 'bucak dairesi (면)'],
      ['옥천', '초등학교', 'ilkokul'],
      ['양평', '농협', 'tarım kooperatifi'],
      ['양평', '우체국', 'postane'],
      ['용문', '파출소', 'karakol']
    ];
    var b = '';
    rows.forEach(function (r, i) {
      var y = 44 + i * 52, sx = 28, sw = r[0].length * 30, tw = r[1].length * 30;
      b += R(18, y, 300, 44, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + R(sx - 2, y + 5, sw + 4, 34, HL, { r: 4 });
      b += T(sx, y + 33, r[0], 30, '#111', { f: 'kr', w: 800 }) + T(sx + sw, y + 33, r[1], 30, BLU, { f: 'kr', w: 700 });
      b += T(328, y + 28, r[2], 16, C.mut);
      void tw;
    });
    b += B(58, 22, 1, 58, 52) + B(118, 22, 2, 118, 52);
    F.add('kr-office', {
      body: b,
      cap: 'Kurum tabelalarında yer adı: ad + tür kalıbı (şematik)',
      legend: [
        'Sarı vurgulu kısım yer adıdır (burada 양평, 용문, 옥천). Çoğu yer adı 2–3 hecedir ve tabelada hep kurum türünden ÖNCE gelir. Önce bu kısmı ayır; il ve şehir tahmini bu adla yapılır.',
        'Mavi kısım kurumun türüdür; ad değişse de kalıp aynı kalır: 군청 ilçe yönetimi, 면사무소 bucak dairesi, 초등학교 ilkokul, 농협 tarım kooperatifi, 우체국 postane, 파출소 karakol. Bu birkaç türü ezberlersen geriye yer adı kalır. Bu tabelalar yol kenarında çok görülür.'
      ]
    });
  })();

  /* ---------- 3) Ad ekleri (idari kademe) ---------- */
  (function () {
    var left = [['특별시', 'özel şehir'], ['광역시', 'büyükşehir'], ['특별자치시', 'özel özerk şehir'], ['도', 'il'], ['특별자치도', 'özel özerk il']];
    var right = [['시', 'şehir'], ['군', 'ilçe (kırsal)'], ['구', 'şehir ilçesi'], ['읍', 'kasaba'], ['면', 'bucak'], ['동', 'mahalle'], ['리', 'köy']];
    var b = B(28, 22, 1) + T(46, 28, 'İL DÜZEYİ', 14, C.mut, { w: 700, ls: 1 }) + B(260, 22, 2) + T(278, 28, 'ALT DÜZEY', 14, C.mut, { w: 700, ls: 1 });
    left.forEach(function (r, i) {
      var y = 42 + i * 62;
      b += R(16, y, 216, 54, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + T(28, y + 29, r[0], 26, BLU, { f: 'kr', w: 800 }) + T(28, y + 47, r[1], 15, C.mut);
    });
    right.forEach(function (r, i) {
      var y = 42 + i * 44;
      b += R(248, y, 216, 38, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + T(262, y + 28, r[0], 26, BLU, { f: 'kr', w: 800 }) + T(306, y + 25, r[1], 16, C.ink);
    });
    F.add('kr-suffix', {
      body: b,
      cap: 'Kore’de ad ekleri: ad hangi büyüklükte bir yer? (şematik)',
      legend: [
        'İl düzeyi: 특별시 (özel şehir: Seul), 광역시 (büyükşehir: Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan), 특별자치시 (Sejong), 도 (il) ve 특별자치도 (özel özerk il: Jeju, Gangwon, Jeonbuk). Tabelalarda çoğu zaman kısa ad yazar (서울, 부산); ek resmî adda görünür (서울특별시).',
        'Alt düzey ekleri adın SONUNDADIR: 시 şehir, 군 kırsal ilçe, 구 büyük şehrin ilçesi, 읍 kasaba, 면 bucak, 동 mahalle, 리 köy. Ek, adı taşıyan yerin büyüklüğünü verir (수원시 bir şehir, 용문면 bir bucak). Örnek adlar kurum tabelası çiziminde.'
      ]
    });
  })();

  /* ---------- 4) 북 / 남 çiftleri ---------- */
  (function () {
    var cols = [[160, '충', 'Chungcheong', '충북', '충남', 'Chungbuk', 'Chungnam'], [280, '전', 'Jeolla', '전북', '전남', 'Jeonbuk', 'Jeonnam'], [400, '경', 'Gyeongsang', '경북', '경남', 'Gyeongbuk', 'Gyeongnam']];
    var b = '';
    cols.forEach(function (c) {
      b += T(c[0], 56, c[1], 38, C.ink, { f: 'kr', w: 800, a: 'middle' }) + T(c[0], 78, c[2], 14, C.mut, { a: 'middle' });
      b += R(c[0] - 54, 90, 108, 64, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + T(c[0], 124, c[3], 34, BLU, { f: 'kr', w: 800, a: 'middle' }) + T(c[0], 146, c[5], 13, C.mut, { a: 'middle' });
      b += R(c[0] - 54, 164, 108, 64, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + T(c[0], 198, c[4], 34, '#a3341f', { f: 'kr', w: 800, a: 'middle' }) + T(c[0], 220, c[6], 13, C.mut, { a: 'middle' });
    });
    b += T(62, 122, '북', 30, BLU, { f: 'kr', w: 800, a: 'middle' }) + T(62, 145, 'kuzey', 14, C.mut, { a: 'middle' });
    b += T(62, 196, '남', 30, '#a3341f', { f: 'kr', w: 800, a: 'middle' }) + T(62, 219, 'güney', 14, C.mut, { a: 'middle' });
    b += B(24, 160, 1) + B(112, 44, 2);
    /* tuzak: 경 ile başlayan üç ad */
    b += R(16, 252, 448, 94, '#fff7e0', { s: '#e0b84a', sw: 1.5, r: 10 }) + T(30, 278, 'Dikkat: 경 ile başlayan üç ad', 16, C.ink, { w: 700 }) + B(444, 270, 3);
    [[96, '경기', 'Gyeonggi'], [240, '경북', 'Gyeongbuk'], [384, '경남', 'Gyeongnam']].forEach(function (p) {
      b += T(p[0], 320, p[1], 34, C.ink, { f: 'kr', w: 800, a: 'middle' }) + T(p[0], 338, p[2], 13, C.mut, { a: 'middle' });
    });
    F.add('kr-short', {
      body: b,
      cap: 'Kore il kısaltmaları: 북 / 남 çiftleri (şematik)',
      legend: [
        'Son hece yönü söyler: 북 (buk) = kuzey, 남 (nam) = güney. Üç bölge ikiye bölünmüştür: Chungcheong (충북 / 충남), Jeolla (전북 / 전남), Gyeongsang (경북 / 경남).',
        'İlk hece bölgenin adının kısaltmasıdır: 충 Chungcheong, 전 Jeolla, 경 Gyeongsang. Önce bu heceyle bölgeyi, sonra 북 / 남 ile kuzey ya da güney ili seç.',
        '경 ile başlayan üç ad vardır ve en çok karışan ikilidir: 경기 (Gyeonggi, Seul çevresi) ile 경북 / 경남 (Gyeongsang, güneydoğu) birbirinden uzaktır. İkinci heceye bak: 기 ise Seul çevresi, 북 / 남 ise güneydoğu.'
      ]
    });
  })();

  /* ---------- 5) Telefon numarası ---------- */
  (function () {
    var rows = [['02', '-123-4567', 'Seul'], ['051', '-123-4567', 'Busan'], ['010', '-1234-5678', 'cep telefonu']];
    var b = R(18, 24, 444, 232, '#fff', { s: '#b9c2cc', sw: 2, r: 12 }) + R(18, 24, 444, 44, BLU, { r: 12 }) + R(18, 50, 444, 18, BLU) + T(240, 55, '전화', 28, '#fff', { f: 'kr', w: 700, a: 'middle' });
    rows.forEach(function (r, i) {
      var y = 102 + i * 56, cw = r[0].length * 22, nx = 70;
      b += R(nx - 6, y - 28, cw + 8, 40, HL, { r: 5 }) + T(nx, y, r[0], 36, '#111', { w: 800 }) + T(nx + cw + 2, y, r[1], 36, '#111', { w: 600 });
      b += T(352, y - 2, r[2], 16, C.mut) + B(38, y - 9, i + 1);
    });
    b += T(240, 296, 'Tireden önceki parça = alan kodu', 16, C.mut, { a: 'middle' });
    F.add('kr-phone', {
      body: b,
      cap: 'Kore’de tabelada telefon numarası: alan kodu nerede? (şematik)',
      legend: [
        'Seul’ün alan kodu 02’dir ve iki hanelidir. Numara 02-123-4567 ya da 02-1234-5678 biçiminde yazılır. Gwacheon, Gwangmyeong, Goyang gibi Seul’e bitişik bazı yerler de 02 kullanır.',
        'Diğer bölgelerde alan kodu 0 ile başlayan üç hanedir: 031 Gyeonggi, 032 Incheon, 051 Busan, 064 Jeju… Numaranın ilk tireden önceki parçası ilin kodudur. Vurgulu kısmı ara.',
        '010 ile başlayan numara cep telefonudur ve yer bilgisi vermez. Dükkân tabelasında 010 görürsen atla, yanındaki sabit hatta bak.'
      ]
    });
  })();

  /* ---------- kümeler ---------- */
  F.set('kr-dir1', ['kr-dir', 'kr-dir-1']);
  F.set('kr-office1', ['kr-office']);
  F.set('kr-suffix1', ['kr-suffix']);
  F.set('kr-short1', ['kr-short']);
  F.set('kr-phone1', ['kr-phone', 'kr-tel-1']);
  F.set('kr-names', ['kr-dir', 'kr-office', 'kr-suffix', 'kr-short']);
})(window);

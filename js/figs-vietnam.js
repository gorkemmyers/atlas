/* figs-vietnam.js — Vietnam: tabelada il ve yer adı nerede, nasıl yazılır (özgün şematik çizimler).
   Doğrulanan olgular: QCVN 41:2019 ve 41:2024/BGTVT (otoyol dışı yönlendirme levhaları mavi zemin beyaz yazı; otoyolda yeşil;
   "Chỉ dẫn địa giới" I.419a/b levhaları il sınırlarında durur, I.419b dış bağlantılı yollar içindir); Wikivoyage "Driving in Vietnam"
   (km direkleri: ulusal yol beyaz gövde + kırmızı tepe, il yolu beyaz gövde + mavi ya da yeşil tepe; yön levhasındaki yol kutusu 2015'ten
   beri ulusal ve il yollarında beyaz zeminli siyah yazı, otoyolda sarı zeminli siyah yazı); alan kodu düzeni uygulamanın Vietnam verisinden.
   Sınır levhasının tam yazı düzeni kaynaklarda anlatılmadığı için ÇİZİLMEDİ.
   2025'te il sayısı ve ilçe kademesi değişti; eski görüntülerde eski adlar görünür (legend'de belirtildi).
   Çizimdeki ad ve sayılar ÖRNEKTİR. */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, L = F.L, Po = F.Po, B = F.B, C = F.C;
  var BLU = '#1b5db0', GRN = '#0d7a45', HL = '#ffe680';

  function board(x, y, w, h, fill) {
    return R(x, y, w, h, fill, { s: '#e9eef3', sw: 3, r: 10 }) + R(x + 6, y + 6, w - 12, h - 12, 'none', { s: '#fff', sw: 2, r: 7, o: .9 });
  }
  function arrow(x, y, dir) {
    var d = dir === 'l' ? -1 : 1, x0 = x - 15 * d;
    var pts = [[x0 + 30 * d, y], [x0 + 14 * d, y - 13], [x0 + 14 * d, y - 5], [x0, y - 5], [x0, y + 5], [x0 + 14 * d, y + 5], [x0 + 14 * d, y + 13]];
    return Po(pts.map(function (p) { return p.join(','); }).join(' '), '#fff');
  }
  var V = { f: 'vi' };
  function o(extra) { return Object.assign({}, V, extra || {}); }

  /* ---------- 1) Yön levhası ---------- */
  (function () {
    function one(y, fill, mfill, marker, rows) {
      var s = board(18, y, 380, 162, fill) + R(34, y + 16, 82, 32, mfill, { s: '#111', sw: 2, r: 4 }) + T(75, y + 40, marker, 21, '#111', o({ w: 800, a: 'middle' }));
      rows.forEach(function (r, i) {
        var base = y + 94 + i * 48;
        s += arrow(52, base - 10, r[3]) + T(84, base, r[0], 30, '#fff', o({ w: 700 })) + T(374, base, r[1], 24, '#fff', o({ w: 600, a: 'end' }));
      });
      return s;
    }
    var b = one(14, BLU, '#fff', 'QL.1', [['Hà Tĩnh', '96 km', 0, 'l'], ['Nghệ An', '38 km', 0, 'r']]) +
            one(190, GRN, C.yel, 'CT.01', [['Hà Nội', '32 km', 0, 'l'], ['Ninh Bình', '76 km', 0, 'r']]);
    b += B(438, 30, 1, 118, 32) + B(438, 62, 2, 208, 94) + B(438, 106, 3, 380, 90) + B(438, 150, 4, 398, 150) + B(438, 226, 5, 398, 226);
    F.add('vn-dir', {
      body: b,
      cap: 'Vietnam yön levhası: yer adı nerede yazar? (şematik)',
      legend: [
        'Yol işareti kutusu: QL (quốc lộ = ulusal yol), ĐT ya da TL (il yolu), CT (cao tốc = otoyol). Kutu 2015’ten beri ulusal ve il yollarında beyaz zeminli siyah yazıdır; otoyolda sarı zeminli siyah yazıdır.',
        'Yer adı Vietnamcadır. Latin harflerle ama ek işaretlerle yazılır (ĩ, ệ, ơ, đ…). Çoğu levha yalnız Vietnamcadır; bazılarına İngilizce satır eklenir. İşaretleri atlama: Nghệ An ile Nghe An aynı görünmez, il adlarını işaretleriyle öğren.',
        'Adın yanındaki sayı, o yere kalan uzaklıktır (km).',
        'Mavi zemin, beyaz yazı: otoyol dışındaki yollar. Bu levhada okuduğun ad, il merkezi ya da yakın bir şehirdir; il adı için levhadaki en büyük şehre bak.',
        'Yeşil zemin: otoyol. Sarı kutu + CT harfleri otoyol işaretidir. Not: 2025’te il sayısı ve ilçe kademesi değişti; eski görüntülerde eski il ve ilçe adları görünür.'
      ]
    });
  })();

  /* ---------- 2) Kurum tabelası: tür + ad ---------- */
  (function () {
    var rows = [['UBND xã', 'Phú Mỹ', 'komün yönetimi'], ['UBND phường', 'Tân Hưng', 'kent mahallesi'], ['Trạm y tế xã', 'Phú Mỹ', 'sağlık ocağı'], ['Công an xã', 'Phú Mỹ', 'komün polisi'], ['Trường Tiểu học', 'Tân Hưng', 'ilkokul'], ['Chợ', 'Long Điền', 'pazar yeri']];
    var b = B(100, 22, 1, 100, 52) + B(252, 22, 2, 252, 52);
    rows.forEach(function (r, i) {
      var y = 44 + i * 52, nw = Math.round(r[1].length * 14.5) + 12;
      b += R(18, y, 444, 44, '#fff', { s: '#b9c2cc', sw: 1.5, r: 8 }) + T(30, y + 29, r[0], 20, BLU, o({ w: 700 })) +
        R(204, y + 5, nw, 34, HL, { r: 4 }) + T(210, y + 31, r[1], 26, '#111', o({ w: 800 })) + T(454, y + 28, r[2], 15, C.mut, o({ a: 'end' }));
    });
    F.add('vn-office', {
      body: b,
      cap: 'Vietnam’da kurum tabelalarında yer adı: tür + ad kalıbı (şematik)',
      legend: [
        'Mavi kısım kurumun türüdür ve Vietnamca’da ADDAN ÖNCE gelir: UBND (Ủy ban nhân dân = halk komitesi) xã (komün) ya da phường (kent mahallesi), Trạm y tế (sağlık ocağı), Công an (polis), Trường Tiểu học (ilkokul), Chợ (pazar). Önce türü ayır.',
        'Sarı vurgulu kısım yer adıdır (Phú Mỹ, Tân Hưng, Long Điền). Bu ad komün, mahalle ya da ilçe adıdır; ilin adı çoğu zaman levhada geçmez. Adı ille eşleştirmek için İl adları ve Alan kodları konularını kullan.'
      ]
    });
  })();

  /* ---------- 3) Km direkleri ---------- */
  (function () {
    function post(cx, topc, label, kmn, dest, dist, tc) {
      var x = cx - 46;
      return R(x, 120, 92, 190, '#fff', { s: '#9aa3ad', sw: 2, r: 8 }) + R(x, 120, 92, 62, topc, { s: '#9aa3ad', sw: 2, r: 8 }) + R(x, 170, 92, 12, topc) +
        T(cx, 146, label, 17, tc, o({ w: 800, a: 'middle' })) + T(cx, 171, 'Km ' + kmn, 17, tc, o({ w: 800, a: 'middle' })) +
        T(cx, 224, dest, 17, '#111', o({ w: 800, a: 'middle' })) + T(cx, 262, dist + ' Km', 24, '#111', o({ w: 800, a: 'middle' }));
    }
    var b = F.ground(310) + post(70, '#d6342a', 'QL.1', '119', 'L.SƠN', '103', '#fff') + post(190, BLU, 'ĐT.741', '36', 'PHÚ GIÁO', '12', '#fff') + post(310, '#1d9a52', 'ĐT.12', '52', 'BẢO YÊN', '25', '#fff');
    b += T(70, 338, 'ulusal yol', 16, C.ink, o({ w: 700, a: 'middle' })) + T(190, 338, 'il yolu', 16, C.ink, o({ w: 700, a: 'middle' })) + T(310, 338, 'il yolu', 16, C.ink, o({ w: 700, a: 'middle' }));
    b += B(70, 90, 1, 70, 120) + B(190, 90, 2, 190, 120) + B(310, 90, 3, 310, 120) + B(436, 235, 4, 356, 235);
    F.add('vn-km', {
      body: b,
      cap: 'Vietnam km direkleri: tepede yol numarası ve Km, gövdede gidilecek yer ve uzaklık (şematik)',
      legend: [
        'Kırmızı tepe: ulusal yol (QL = quốc lộ). Tepede yol numarası (QL.1) ve yolun başından itibaren kilometre (Km 119) yazar.',
        'Mavi tepe: il yolu (ĐT ya da TL = đường tỉnh / tỉnh lộ). Beyaz gövdeli, mavi tepeli direk il yolundadır.',
        'Yeşil tepe: il yolunda görülen diğer renktir (kaynaklara göre il yolu direkleri mavi ya da yeşil tepelidir).',
        'Beyaz gövde: gidilecek bir yerin adı ve oraya kalan uzaklık (L.SƠN 103 Km = Lạng Sơn’a 103 km); ad kısaltılmış olabilir. Bu yer direğin bulunduğu ilden farklı bir ilde olabilir (gerçek örnek: Bắc Giang’da L.SƠN), ili levhalardan oku. Yazılar örnektir.'
      ]
    });
  })();

  /* ---------- 4) Telefon numarası ---------- */
  (function () {
    var NB = '\u00a0';
    var rows = [['ĐT:' + NB, '0236', NB + '3822' + NB + '123', 1], ['ĐT:' + NB, '024', NB + '3825' + NB + '1234', 1], ['Hotline:' + NB, '0905', NB + '123' + NB + '456', 0]];
    var b = R(18, 24, 444, 252, '#fff', { s: '#b9c2cc', sw: 2, r: 12 }) + R(18, 24, 444, 48, '#c2262e', { r: 12 }) + R(18, 52, 444, 20, '#c2262e') + T(240, 58, 'CỬA HÀNG', 26, '#ffd60a', o({ w: 800, a: 'middle', ls: 2 }));
    rows.forEach(function (r, i) {
      var y = 120 + i * 58, lw = Math.round(r[0].length * 15), cw = Math.round(r[1].length * 19.5);
      b += T(70, y, r[0], 27, '#111', o({ w: 600 }));
      if (r[3]) b += R(70 + lw - 4, y - 28, cw + 8, 38, HL, { r: 5 });
      b += T(70 + lw, y, r[1], 32, r[3] ? '#111' : C.mut, o({ w: r[3] ? 800 : 600 })) + T(70 + lw + cw, y, r[2], 32, r[3] ? '#111' : C.mut, o({ w: 600 })) + B(38, y - 9, i + 1);
    });
    b += T(240, 308, 'Alan kodu: 0 ile başlar, numaranın başındadır', 16, C.mut, o({ a: 'middle' }));
    F.add('vn-phone', {
      body: b,
      cap: 'Vietnam’da tabelada telefon numarası: alan kodu nerede? (şematik)',
      legend: [
        'Sabit hat: ĐT (điện thoại = telefon) yazısından sonra 0 + 3 haneli alan kodu gelir (0236 = Đà Nẵng), sonra abone numarası. Vurgulu kısım ilin kodudur.',
        'Hanoi (024) ve Ho Chi Minh Şehri (028) iki haneli koda sahiptir: 0 + 24 ya da 0 + 28.',
        'Hotline ve cep telefonu (03, 05, 07, 08, 09 ile başlar) il bilgisi vermez. Tabelada hem hotline hem sabit hat varsa sabit hattaki alan koduna bak.'
      ]
    });
  })();

  F.set('vn-dir1', ['vn-dir']);
  F.set('vn-office1', ['vn-office']);
  F.set('vn-km1', ['vn-km', 'vn-km-1', 'vn-km-2', 'vn-km-3']);
  F.set('vn-phone1', ['vn-phone']);
  F.set('vn-sign', ['vn-dir', 'vn-office', 'vn-km', 'vn-km-1', 'vn-km-2', 'vn-km-3']);
})(window);

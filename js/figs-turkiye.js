/* figs-turkiye.js — Türkiye: tabelada telefon numarası ve alan kodu (özgün şematik çizim).
   Doğrulanan olgular (kaynak):
   · Ulusal Numaralandırma Planı: numaranın (başındaki 0 hariç) ilk hanesi 2-3-4 ise coğrafi, 5 ise mobil, 8-9 ise coğrafi olmayan numaradır;
     850 alan kodlu numaralar konumdan bağımsızdır, 800 alan kodlu numaralar ücretsiz aranır — TELKODER (BTK mevzuat özeti, 24.12.2020).
   · 444'lü çağrı merkezi numaraları 7 hanedir (444 XX XX), Türkiye'nin her yerinden aynı rakamlarla aranır, alan koduyla çevrilmez — Wikipedia (Telephone numbers in Turkey).
   · Alan kodu baştaki 0'dan sonraki 3 hanedir; 212 İstanbul (Avrupa yakası), 216 İstanbul (Anadolu yakası), 232 İzmir — Wikipedia kod listesi ve paketin `alan` konusu.
   Bilerek ÇİZİLMEYENLER: operatör ayrımı (0532 vb. hangi operatör), tabelada hangi yazım biçiminin (0232, (0232), 0 232) daha yaygın olduğu.
   Çizimdeki numaralar ve "MARKET" yazısı ÖRNEKTİR; hiçbir gerçek firma ya da numara değildir. */
(function (g) {
  'use strict';
  var F = g.FIG;
  if (!F) return;
  var R = F.R, T = F.T, L = F.L, B = F.B, C = F.C;
  var NB = ' ';
  var HL = '#ffe680';

  (function () {
    var b = R(18, 12, 444, 336, '#fff', { s: '#b9c2cc', sw: 2, r: 12 }) + R(18, 12, 444, 46, C.red, { r: 12 }) + R(18, 40, 444, 18, C.red) + T(240, 45, 'MARKET', 26, '#fff', { a: 'middle', w: 800, ls: 4 });
    /* satır 1-2: sabit hat, alan kodu vurgulu */
    function geo(y, code, cap) {
      return T(92, y + 29, '0', 28, C.mut, { w: 600 }) + R(114, y, 60, 40, HL, { r: 5 }) + T(119, y + 29, code, 28, '#111', { w: 800 }) +
        T(184, y + 29, '123' + NB + '45' + NB + '67', 28, '#111', { w: 600 }) + T(454, y + 28, cap, 15, C.mut, { a: 'end', w: 600 });
    }
    /* satır 3-5: yer söylemeyen numaralar (soluk, kesik çerçeve) */
    function none(y, txt, cap, w) {
      return R(84, y, w, 40, 'none', { s: '#c5ccd5', sw: 1.5, r: 5, d: '5 4' }) + T(92, y + 29, txt, 28, C.mut, { w: 600 }) + T(454, y + 28, cap, 15, C.mut, { a: 'end', w: 600 });
    }
    b += geo(74, '232', 'İzmir');
    b += geo(128, '212', 'İstanbul');
    b += none(182, '0' + NB + '532' + NB + '123' + NB + '45' + NB + '67', 'cep · yer yok', 244);
    b += none(236, '444' + NB + '12' + NB + '34', 'yer yok', 160);
    b += none(290, '0' + NB + '850' + NB + '123' + NB + '45' + NB + '67', 'yer yok', 244);
    b += B(40, 94, 1, 84, 94) + B(40, 148, 2, 84, 148) + B(40, 202, 3, 84, 202) + B(40, 256, 4, 84, 256) + B(40, 310, 5, 84, 310);
    F.add('tr-alan', {
      body: b,
      cap: 'Türkiye’de tabelada telefon numarası: alan kodu nerede, hangi numara yer söylemez? (şematik)',
      legend: [
        'Alan kodu: baştaki 0’dan sonra gelen 3 hane (örnekte 232 = İzmir). 0 çıkış rakamıdır, kodun parçası değildir; 0232 ya da (0232) yazılsa da kod aynı üç hanedir.',
        'İstanbul’un iki kodu vardır: 212 Avrupa yakası, 216 Anadolu yakası.',
        'İlk iki hanesi 05 olan numara cep telefonudur ve bir ili göstermez: atla.',
        '444’lü numaralar çağrı merkezi numaralarıdır; Türkiye’nin her yerinden aynı 7 hane çevrilerek aranır, alan koduyla aranmaz ve bir ili göstermez.',
        '0850 numaraları konumdan bağımsızdır: sabit hat gibi görünür ama bir ili göstermez. 0800 ile başlayan ücretsiz hatlar da bir ili göstermez.'
      ]
    });
  })();

  F.set('tr-alan1', ['tr-alan', 'tr-tel-1', 'tr-tel-2']);
})(typeof window !== 'undefined' ? window : globalThis);

/* figures.js — ÖZGÜN ÇİZİM (şematik şekil) KÜTÜPHANESİ
   Tabela, levha ve direk gibi "nereye bakacağını" göstermek için, fotoğraf bulunamadığında ya da fotoğraf yetmediğinde kullanılır.
   Çizimler fotoğraf kayıt defterine girer (PHOTOS[anahtar] = { svg, d, legend, cap, by, lic, v:'cizim' }) ve fotoğraflarla
   AYNI galeriden (Kit.carousel) görünür; bu yüzden kümeler (PHOTO_SETS) ve paketlerdeki `visuals` kartları değişmez.
   Ülkelerin çizimleri js/figs-<ülke>.js dosyalarındadır; bu dosya yalnızca çizim aletlerini ve kayıt işlevlerini verir.

   KURALLAR (ayrıntı: KURALLAR.md > "Çizimler"):
   · Her çizim ŞEMATİKTİR: gerçek bir tabelanın ya da levhanın kopyası değildir; "nerede, hangi biçimde" bilgisini taşır.
     Logoları çizme (yaklaşık, kesik çizgili daire ya da "logo" yazısı koy); gerçek bir marka işaretini taklit etme.
   · Çizimde yalnızca doğrulanmış olgular vardır. Tek kaynaklı ya da belirsiz bilgi, çizime değil `legend` metnine
     "bir topluluk rehberine göre…" diye yazılır.
   · Çizimin içine UZUN metin yazma (telefonda küçülür): içerde yalnızca örnek yazılar (kanji, Hangul, sayı) ve numaralı sarı
     rozetler olur; açıklamalar `legend` dizisindedir (rozet numarası = dizi sırası + 1).
   · Çizim cevabı sızdırabilir: çizim kartlarına `quiz:false` konur (Pratik / Simülasyon soruları fotoğraf kullanır, çizim değil).
   · Boyut: 480 × 360 (4:3), yazı en az 14 birim; açık zeminli (koyu temada da okunur).
   API:  FIG.add(anahtar, { w,h, bg, body, cap, legend })   FIG.set(kümeId, [anahtarlar])   ve aşağıdaki çizim yardımcıları (FIG.R, FIG.T …) */
(function (g) {
  'use strict';
  var P = g.PHOTOS = g.PHOTOS || {};
  var S = g.PHOTO_SETS = g.PHOTO_SETS || {};
  var FIG = g.FIG = {};

  var FONT = FIG.FONT = {
    ui: "system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
    jp: "'Noto Sans JP','Noto Sans CJK JP','Hiragino Kaku Gothic ProN','Hiragino Sans','Yu Gothic','Meiryo',sans-serif",
    kr: "'Noto Sans KR','Noto Sans CJK KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif",
    hi: "'Noto Sans Devanagari','Nirmala UI','Mangal','Kohinoor Devanagari',sans-serif",
    vi: "'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
  };
  var C = FIG.C = {
    bg: '#eef1f5', ink: '#1b2430', mut: '#5d6877', line: '#7b8794', pole: '#c3c9d0', poleD: '#8f98a4',
    white: '#ffffff', paper: '#f7f7f4', y: '#ffd60a', yel: '#f5c400', blk: '#14171c', red: '#d6342a', orange: '#f08a1c',
    blue: '#1f5fa8', green: '#0f7a4d', sky: '#cfe3f3', grass: '#cfe0c2', road: '#59616c'
  };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function at(o, k, d) { return o && o[k] != null ? o[k] : d; }

  /* ---- temel şekiller (hepsi SVG metni döndürür) ---- */
  /* dikdörtgen: o = { s: çizgi rengi, sw: çizgi kalınlığı, r: köşe yarıçapı, o: saydamlık, d: kesik çizgi, t: dönüşüm } */
  FIG.R = function (x, y, w, h, fill, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (fill || 'none') + '"' +
      (o.s ? ' stroke="' + o.s + '" stroke-width="' + at(o, 'sw', 1.5) + '"' : '') + (o.r ? ' rx="' + o.r + '"' : '') +
      (o.o != null ? ' opacity="' + o.o + '"' : '') + (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o.t ? ' transform="' + o.t + '"' : '') + '/>';
  };
  /* metin: o = { f: yazı tipi anahtarı (ui, jp, kr, hi), a: start|middle|end, w: kalınlık, ls: harf aralığı, o: saydamlık, t: dönüşüm, i: italik } */
  FIG.T = function (x, y, s, size, fill, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + (fill || C.ink) + '" font-family="' + FONT[o.f || 'ui'] + '" text-anchor="' + (o.a || 'start') + '"' +
      (o.w ? ' font-weight="' + o.w + '"' : '') + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') +
      (o.i ? ' font-style="italic"' : '') + (o.t ? ' transform="' + o.t + '"' : '') + '>' + esc(s) + '</text>';
  };
  /* alt alta (dikey dizilmiş, dönmeden) karakterler */
  FIG.TV = function (x, y, chars, size, fill, gap, o) {
    var out = '';
    Array.prototype.slice.call(chars).forEach(function (ch, i) { out += FIG.T(x, y + i * gap, ch, size, fill, Object.assign({ a: 'middle' }, o || {})); });
    return out;
  };
  FIG.L = function (x1, y1, x2, y2, stroke, sw, o) {
    o = o || {};
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (stroke || C.ink) + '" stroke-width="' + (sw || 1.5) + '"' +
      (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') + (o.c ? ' stroke-linecap="' + o.c + '"' : '') + '/>';
  };
  FIG.Ci = function (cx, cy, r, fill, o) {
    o = o || {};
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || 'none') + '"' +
      (o.s ? ' stroke="' + o.s + '" stroke-width="' + at(o, 'sw', 1.5) + '"' : '') + (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') + '/>';
  };
  /* çokgen / yol: pts = 'x,y x,y …' ya da path d */
  FIG.Po = function (pts, fill, o) {
    o = o || {};
    return '<polygon points="' + pts + '" fill="' + (fill || 'none') + '"' + (o.s ? ' stroke="' + o.s + '" stroke-width="' + at(o, 'sw', 1.5) + '" stroke-linejoin="round"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') + '/>';
  };
  FIG.Pa = function (d, fill, o) {
    o = o || {};
    return '<path d="' + d + '" fill="' + (fill || 'none') + '"' + (o.s ? ' stroke="' + o.s + '" stroke-width="' + at(o, 'sw', 1.5) + '" stroke-linecap="round" stroke-linejoin="round"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') + '/>';
  };
  FIG.Gr = function (inner, o) {
    o = o || {};
    return '<g' + (o.t ? ' transform="' + o.t + '"' : '') + (o.clip ? ' clip-path="url(#' + o.clip + ')"' : '') + (o.o != null ? ' opacity="' + o.o + '"' : '') + '>' + inner + '</g>';
  };
  FIG.Clip = function (id, x, y, w, h) { return '<clipPath id="' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/></clipPath>'; };

  /* numaralı sarı rozet (legend sırası ile eşleşir); (tx,ty) verilirse rozetten hedef noktaya ince çizgi + nokta */
  FIG.B = function (x, y, n, tx, ty) {
    var out = '';
    if (tx != null) out += FIG.L(x, y, tx, ty, C.ink, 1.6) + FIG.Ci(tx, ty, 3.2, C.ink);
    out += '<circle cx="' + x + '" cy="' + y + '" r="12" fill="#ffd60a" stroke="#111" stroke-width="1.6"/>' +
      '<text x="' + x + '" y="' + (y + 5) + '" font-size="15" font-weight="800" text-anchor="middle" fill="#111" font-family="' + FONT.ui + '">' + n + '</text>';
    return out;
  };

  /* ---- ortak parçalar ---- */
  /* dikey siyah-sarı çizgili sargı (Japon 電柱標識板 gibi): n sarı çizgi, bd = yan kenarlık */
  FIG.tiger = function (x, y, w, h, n, bd) {
    n = n || 5; bd = bd == null ? 6 : bd;
    var iw = w - 2 * bd, sw = iw / (2 * n - 1), out = FIG.R(x, y, w, h, C.blk);
    for (var i = 0; i < n; i++) out += FIG.R(+(x + bd + i * 2 * sw).toFixed(1), y, +sw.toFixed(1), h, C.yel);
    return out + FIG.R(x, y, w, h, 'url(#cyl)');
  };
  /* silindirik direk gövdesi (beton) */
  FIG.pole = function (x, y, w, h) { return FIG.R(x, y, w, h, 'url(#pg)', { s: C.poleD, sw: 1 }); };
  /* zemin çizgisi + çimen şeridi */
  FIG.ground = function (y, w) { return FIG.R(0, y, w || 480, 360 - y, C.grass) + FIG.L(0, y, w || 480, y, '#8aa37a', 2); };

  var DEFS = '<defs>' +
    '<linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#97a0ab"/><stop offset=".42" stop-color="#d3d8de"/><stop offset="1" stop-color="#8a939e"/></linearGradient>' +
    '<linearGradient id="cyl" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".35" stop-color="#fff" stop-opacity=".16"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></linearGradient>' +
    '</defs>';

  FIG.wrap = function (w, h, body, bg) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">' + DEFS +
      '<rect width="' + w + '" height="' + h + '" fill="' + (bg || C.bg) + '"/>' + body + '</svg>';
  };

  /* kayıt: o = { w, h, bg, body (SVG metni), cap (alt yazı), legend: [rozet açıklamaları], by } */
  FIG.add = function (key, o) {
    if (P[key]) throw new Error('figures.js: anahtar zaten var: ' + key);
    var w = o.w || 480, h = o.h || 360;
    P[key] = { svg: FIG.wrap(w, h, o.body, o.bg), d: [w, h], by: o.by || 'Atlas', lic: 'Özgün çizim', cap: o.cap, legend: o.legend || null, v: 'cizim' };
  };
  FIG.set = function (id, keys) {
    if (S[id]) throw new Error('figures.js: küme zaten var: ' + id);
    keys.forEach(function (k) { if (!P[k]) throw new Error('figures.js: küme ' + id + ' tanımsız çizim içeriyor: ' + k); });
    S[id] = keys.slice();
  };
})(window);

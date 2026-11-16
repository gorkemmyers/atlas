/* view-sources.js — #kaynaklar: fotoğraf yazar ve lisans listesi (atıf). Veri js/photos.js'ten gelir. */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, h = U.h;
  var NAMES = { br: 'Brezilya', kr: 'Güney Kore', mx: 'Meksika', tr: 'Türkiye', jp: 'Japonya', ru: 'Rusya', id: 'Endonezya', vn: 'Vietnam', in: 'Güney Asya', as: 'Güney Asya' };
  function commonsPage(f) { return 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(String(f).replace(/ /g, '_')).replace(/%2F/g, '/'); }

  function mount(root) {
    var P = g.PHOTOS || {}, groups = {}, total = 0;
    Object.keys(P).forEach(function (k) {
      var p = P[k]; if (!p || p.v === 'bekliyor') return;
      var pre = k.split('-')[0], name = NAMES[pre] || 'Diğer';
      (groups[name] = groups[name] || []).push({ k: k, p: p }); total++;
    });
    var inn = h('div', { 'class': 'page-in src-in' });
    root.appendChild(h('div', { 'class': 'page', id: 'sources' }, inn));
    inn.appendChild(h('a', { 'class': 'btn btn-sm', href: '#ana' }, '← Ana sayfa'));
    inn.appendChild(h('h1', { 'class': 'src-h' }, 'Kaynaklar ve atıf'));
    inn.appendChild(h('p', {}, 'Atlas’taki fotoğraflar Wikimedia Commons’tan alınmıştır ve her biri kendi yazarının serbest lisansı (çoğunlukla Creative Commons) altındadır. Yazarlara teşekkürler. Aşağıda ' + total + ' fotoğrafın yazarı, lisansı ve kaynak sayfası var.'));
    inn.appendChild(h('p', { 'class': 'micro' }, 'Haritalar, çizimler ve metinler Atlas’a aittir; elektrik direği, tabela ve alan kodu bilgileri GeoGuessr topluluk rehberlerinden (Plonk It ve toplulukça hazırlanan belgeler) derlenmiştir. Bir hata ya da telif sorunu görürsen fotoğrafın kaynak sayfasındaki bağlantıdan yazara ulaşabilirsin.'));
    Object.keys(groups).sort().forEach(function (name) {
      var rows = groups[name].map(function (x) {
        return h('tr', {},
          h('td', {}, h('a', { href: commonsPage(x.p.f), target: '_blank', rel: 'noopener' }, x.p.f)),
          h('td', {}, x.p.by), h('td', {}, x.p.lic));
      });
      inn.appendChild(h('details', { 'class': 'fold src-fold' },
        h('summary', {}, h('span', {}, name), h('small', { 'class': 'hub-bk-sub' }, groups[name].length + ' fotoğraf')),
        h('div', { 'class': 'fold-body src-body' }, h('table', { 'class': 'src-tbl' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Dosya (Commons)'), h('th', {}, 'Yazar'), h('th', {}, 'Lisans'))),
          h('tbody', {}, rows)))));
    });
    return { destroy: function () { } };
  }
  g.Views = g.Views || {};
  g.Views.sources = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

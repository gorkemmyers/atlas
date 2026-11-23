/* view-sources.js — #kaynaklar: fotoğraf yazar ve lisans listesi, harita/yol verileri ve atıf. Veri js/photos.js'ten gelir. */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, Kit = g.Kit, h = U.h;
  var NAMES = { br: 'Brezilya', kr: 'Güney Kore', mx: 'Meksika', tr: 'Türkiye', jp: 'Japonya', ru: 'Rusya', id: 'Endonezya', vn: 'Vietnam', in: 'Güney Asya', as: 'Güney Asya' };
  function commonsPage(f) { return 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(String(f).replace(/ /g, '_')).replace(/%2F/g, '/'); }
  function isFile() { try { return g.location && g.location.protocol === 'file:'; } catch (e) { return false; } }

  function mount(root) {
    var cfg = g.ATLAS_CONFIG || {};
    var mail = cfg.contactEmail || 'gorkemugurguler@gmail.com';
    var P = g.PHOTOS || {}, groups = {}, total = 0, figs = 0;
    Object.keys(P).forEach(function (k) {
      var p = P[k]; if (!p || p.v === 'bekliyor') return;
      if (p.svg) { figs++; return; }
      var pre = k.split('-')[0], name = NAMES[pre] || 'Diğer';
      (groups[name] = groups[name] || []).push({ k: k, p: p }); total++;
    });
    var inn = h('div', { 'class': 'page-in src-in' });
    root.appendChild(h('div', { 'class': 'page', id: 'sources' }, inn));
    inn.appendChild(h('a', { 'class': 'btn btn-sm', href: '#ana' }, '← Ana sayfa'));
    inn.appendChild(h('h1', { 'class': 'src-h' }, 'Kaynaklar ve atıf'));
    inn.appendChild(h('p', {}, 'Atlas’taki ' + total + ' gerçek fotoğraf Wikimedia Commons’tan alınmıştır ve her biri kendi yazarının ticari kullanıma da açık serbest lisansı (CC BY, CC BY-SA, CC0 veya Kamu Malı) altındadır. Tüm yazarlara teşekkür ederiz.'));

    inn.appendChild(h('section', { 'class': 'legal-sec' },
      h('h2', {}, 'Harita, sınır ve yol verileri'),
      h('ul', { 'class': 'legal-ul' },
        h('li', {}, h('strong', {}, 'Dünya ve ülke sınırları: '), h('a', { href: 'https://www.naturalearthdata.com/', target: '_blank', rel: 'noopener noreferrer' }, 'Natural Earth'), ' (Kamu Malı) 1. düzey idari sınırlarından sadeleştirilmiştir. Haritalar yalnızca eğitim/tahmin amaçlıdır.'),
        h('li', {}, h('strong', {}, 'Rusya ve Türkiye yol çizgileri: '), '© ', h('a', { href: 'https://www.openstreetmap.org/copyright', target: '_blank', rel: 'noopener noreferrer' }, 'OpenStreetMap katkıcıları'), ' — ', h('a', { href: 'https://opendatacommons.org/licenses/odbl/', target: '_blank', rel: 'noopener noreferrer' }, 'ODbL'), ' lisansı ile, sadeleştirilmiş güzergâh çizgileri.'),
        h('li', {}, h('strong', {}, 'Vietnam 63 il sınırı: '), 'Free-GIS-Data (nguyenduy1133) 2025 öncesi il sınırlarından sadeleştirilmiştir.'),
        h('li', {}, h('strong', {}, 'Özgün şematik çizimler (' + figs + ' adet): '), 'Tabelada ve direkte nereye bakılacağını gösteren şematik çizimler Atlas tarafından resmî yönetmelikler ve çapraz doğrulanmış kaynaklara göre özgün olarak üretilmiştir.'))));

    inn.appendChild(h('section', { 'class': 'legal-sec' },
      h('h2', {}, 'Telif ve düzeltme bildirimi'),
      h('p', {}, 'Metinler Atlas tarafından Türkçe olarak özgün biçimde yazılmıştır; telefon kodları, idari sınırlar ve tabela kuralları resmî kurum duyuruları, Vikipedi listeleri ve kamuya açık coğrafya kaynaklarından doğrulanmıştır. Bir atıf eksikliği veya telif sorunu görürsen ',
        h('a', { href: 'mailto:' + mail }, mail), ' adresinden veya ',
        h('a', { href: isFile() ? '#iletisim' : 'iletisim.html' }, 'İletişim'), ' sayfasından bize ulaşabilirsin.')));

    inn.appendChild(h('h2', { 'class': 'src-sub' }, 'Wikimedia Commons fotoğraf listesi (' + total + ' fotoğraf)'));
    Object.keys(groups).sort().forEach(function (name) {
      var rows = groups[name].map(function (x) {
        var lurl = Kit && Kit.licenseUrl ? Kit.licenseUrl(x.p.lic) : '';
        var licEl = lurl ? h('a', { href: lurl, target: '_blank', rel: 'noopener noreferrer' }, x.p.lic) : x.p.lic;
        var mod = (x.p.crop || (x.p.marks && x.p.marks.length)) ? 'Kırpıldı / işaretlendi' : 'Özgün';
        return h('tr', {},
          h('td', {}, h('a', { href: commonsPage(x.p.f), target: '_blank', rel: 'noopener noreferrer' }, x.p.f)),
          h('td', {}, x.p.by),
          h('td', {}, licEl),
          h('td', {}, mod));
      });
      inn.appendChild(h('details', { 'class': 'fold src-fold' },
        h('summary', {}, h('span', {}, name), h('small', { 'class': 'hub-bk-sub' }, groups[name].length + ' fotoğraf')),
        h('div', { 'class': 'fold-body src-body' }, h('table', { 'class': 'src-tbl' },
          h('thead', {}, h('tr', {}, h('th', {}, 'Dosya (Commons)'), h('th', {}, 'Yazar'), h('th', {}, 'Lisans'), h('th', {}, 'Biçim'))),
          h('tbody', {}, rows)))));
    });
    inn.appendChild(UI.siteFooter());
    return { destroy: function () { } };
  }
  g.Views = g.Views || {};
  g.Views.sources = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

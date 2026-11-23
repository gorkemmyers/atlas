/* site-config.js — Atlas genel site, iletişim ve reklam yapılandırması.
   Özel alan adını ve Google AdSense yayıncı kimliğini (ca-pub-...) aldığında
   elle düzenleyebilir ya da şu komutu çalıştırabilirsin:
     python3 tools/set_domain.py --domain https://ornek.com --adsense ca-pub-XXXXXXXXXXXXXXXX
*/
(function (g) {
  'use strict';
  g.ATLAS_CONFIG = {
    siteName: 'Atlas',
    tagline: 'GeoGuessr bölge tahmin rehberi',
    siteUrl: 'https://atlas.gorkemugurguler.workers.dev',
    customDomainReady: false,
    contactEmail: 'gorkemugurguler@gmail.com',
    lastUpdated: '23 Kasım 2026',
    disclaimer: 'Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile herhangi bir bağlantısı veya ortaklığı yoktur.',
    ads: {
      enabled: false,       // AdSense onayı gelince true yap
      provider: 'adsense',
      client: '',           // Ör. 'ca-pub-1234567890123456'
      autoAds: false,
      slots: {
        hubMid: '',         // Ana sayfa: bölge listesi altı yatay reklam yuvası
        overviewEnd: '',    // Ülke Genel bakış sayfası altı yatay reklam yuvası
        guideEnd: ''        // Konu rehberi metin altı (harita ve butonlardan uzak)
      }
    },
    guideSlugs: {
      vietnam: 'rehber/vietnam.html',
      guneyasya: 'rehber/guney-asya.html',
      turkiye: 'rehber/turkiye.html',
      russia: 'rehber/rusya.html',
      japan: 'rehber/japonya.html',
      indonesia: 'rehber/endonezya.html',
      brazil: 'rehber/brezilya.html',
      mexico: 'rehber/meksika.html',
      guneykore: 'rehber/guney-kore.html'
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);

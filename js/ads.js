/* ads.js — Politika uyumlu Google AdSense yuva yöneticisi ve çerez/onay arayüzü.
   Kurallar:
   - Reklam onayı/kimliği yoksa (ATLAS_CONFIG.ads.enabled !== true) boş yer tutucu kutu ÇİZİLMEZ.
   - SPA geçişlerinde zamanlayıcıyla otomatik yenileme YAPILMAZ; her görünümde yeni <ins> kurulur.
   - Harita, pratik ve simülasyon etkileşim kontrollerine yakın yere reklam KONMAZ.
   - Avrupa (AEA/UK/İsviçre) trafiğinde Google AdSense'in sertifikalı IAB TCF v2.2 CMP aracı
     (Privacy & Messaging) yüklüyse "Çerez tercihleri" doğrudan resmî onay penceresini açar. */
(function (g) {
  'use strict';
  var U = g.U, h = U.h;
  var scriptRequested = false;

  function cfg() { return g.ATLAS_CONFIG || {}; }
  function adsCfg() { return (cfg().ads) || {}; }

  function isLiveWeb() {
    try {
      var p = g.location && g.location.protocol;
      var host = g.location && g.location.hostname;
      return (p === 'https:' || p === 'http:') && host && host !== 'localhost' && host !== '127.0.0.1';
    } catch (e) { return false; }
  }

  function ensureScript() {
    var a = adsCfg();
    if (scriptRequested || !a.enabled || !a.client || !isLiveWeb()) return false;
    scriptRequested = true;
    try {
      var existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
      if (existing) return true;
      var sc = document.createElement('script');
      sc.async = true;
      sc.crossOrigin = 'anonymous';
      sc.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(a.client);
      document.head.appendChild(sc);
      return true;
    } catch (e) { return false; }
  }

  /* Güvenli reklam yuvası: yalnızca yapılandırılmış ve canlı ortamda görünür */
  function slot(name, opts) {
    opts = opts || {};
    var a = adsCfg();
    var slotId = a.slots && a.slots[name];
    if (!a.enabled || !a.client || !slotId || !isLiveWeb()) return null;
    ensureScript();
    var fmt = opts.format || 'auto';
    var ins = h('ins', {
      'class': 'adsbygoogle',
      style: 'display:block',
      'data-ad-client': a.client,
      'data-ad-slot': String(slotId),
      'data-ad-format': fmt,
      'data-full-width-responsive': 'true'
    });
    var wrap = h('aside', {
      'class': 'ad-slot' + (opts.compact ? ' ad-slot-sm' : ''),
      'aria-label': 'Reklam',
      'data-slot': name
    },
      h('span', { 'class': 'ad-lbl', 'aria-hidden': 'true' }, 'Reklam'),
      ins);
    var push = function () {
      try {
        (g.adsbygoogle = g.adsbygoogle || []).push({});
      } catch (e) { /* reklam engelleyici veya yükleme hatası */ }
    };
    if (g.requestAnimationFrame) g.requestAnimationFrame(push); else setTimeout(push, 0);
    return wrap;
  }

  /* Çerez ve depolama tercihleri penceresi (Google CMP varsa önce onu açar) */
  function openConsent() {
    try {
      if (g.googlefc && typeof g.googlefc.showRevocationMessage === 'function') {
        g.googlefc.showRevocationMessage();
        return;
      }
      if (g.googlefc && Array.isArray(g.googlefc.callbackQueue)) {
        g.googlefc.callbackQueue.push({
          CONSENT_DATA_READY: function () {
            if (typeof g.googlefc.showRevocationMessage === 'function') g.googlefc.showRevocationMessage();
          }
        });
      }
    } catch (e) { /* yerel bilgilendirmeye düş */ }

    var UI = g.UI;
    if (!UI || !UI.modal) return;
    var a = adsCfg();
    var isFile = !isLiveWeb() && g.location && g.location.protocol === 'file:';
    var body = h('div', { 'class': 'legal-modal' },
      h('p', {}, 'Atlas, çalışma ilerlemeni ve tema/harita ayarlarını yalnızca kendi tarayıcında saklar (localStorage · anahtar: vietatlas.v1). Bu veriler herhangi bir sunucuya gönderilmez.'),
      h('p', {}, a.enabled
        ? 'Bu sitede Google AdSense aracılığıyla reklam gösterilmektedir. Google ve iş ortakları, önceki ziyaretlerine göre reklam sunmak ve ölçüm yapmak için çerez kullanabilir.'
        : 'Şu an sitede reklam çerezi etkin değildir. Google AdSense reklamları açıldığında, kişiselleştirilmiş reklam çerezleri yalnızca yasal onay kurallarına uygun olarak kullanılır.'),
      h('ul', { 'class': 'legal-ul' },
        h('li', {}, h('a', { href: 'https://adssettings.google.com/', target: '_blank', rel: 'noopener noreferrer' }, 'Google Reklam Ayarları'), ' üzerinden kişiselleştirilmiş reklamları kapatabilirsin.'),
        h('li', {}, h('a', { href: 'https://policies.google.com/technologies/partner-sites', target: '_blank', rel: 'noopener noreferrer' }, 'Google iş ortağı siteler politikasını'), ' inceleyebilirsin.'),
        h('li', {}, 'Ayrıntılar için ', h('a', { href: isFile ? '#gizlilik' : 'gizlilik.html' }, 'Gizlilik ve Çerez Politikası'), ' sayfasına bak.')));
    UI.modal({
      title: 'Çerez ve gizlilik tercihleri',
      body: body,
      actions: [{ label: 'Kapat', primary: true, value: true }]
    });
  }

  function boot() {
    var a = adsCfg();
    if (a.enabled && a.client && a.autoAds) ensureScript();
  }

  g.Ads = { slot: slot, openConsent: openConsent, ensureScript: ensureScript, boot: boot };
})(typeof window !== 'undefined' ? window : globalThis);

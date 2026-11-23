/* view-legal.js — Yasal ve kurumsal görünümler (#hakkimizda, #gizlilik, #kullanim-kosullari, #iletisim).
   Çevrimiçi statik HTML sayfaları (hakkimizda.html, gizlilik.html vb.) ile aynı metinleri taşır;
   böylece hem tek dosyalık çevrimdışı sürümde hem SPA içinde tutarlı çalışır. */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, h = U.h;

  function cfg() { return g.ATLAS_CONFIG || {}; }
  function email() { return cfg().contactEmail || 'gorkemugurguler@gmail.com'; }
  function updated() { return cfg().lastUpdated || '23 Kasım 2026'; }
  function isFile() { try { return g.location && g.location.protocol === 'file:'; } catch (e) { return false; } }
  function link(slug, hash, label) { return h('a', { href: isFile() ? '#' + hash : slug }, label); }

  function shell(root, id, title, lead, sections) {
    var inn = h('div', { 'class': 'page-in legal-in' });
    root.appendChild(h('div', { 'class': 'page', id: id }, inn));
    inn.appendChild(h('div', { 'class': 'legal-top' },
      h('a', { 'class': 'btn btn-sm', href: '#ana' }, '← Ana sayfa'),
      h('span', { 'class': 'micro' }, 'Son güncelleme: ' + updated())));
    inn.appendChild(h('header', { 'class': 'legal-head' },
      h('h1', { 'class': 'src-h' }, title),
      lead ? h('p', { 'class': 'lead' }, lead) : null));
    sections.forEach(function (sec) {
      inn.appendChild(h('section', { 'class': 'legal-sec' },
        h('h2', {}, sec.h),
        sec.body));
    });
    inn.appendChild(UI.siteFooter());
    return { destroy: function () { } };
  }

  function mountAbout(root) {
    return shell(root, 'legal-about', 'Hakkımızda',
      'Atlas, GeoGuessr oyuncularının bölge ve il tahminini hızlandırmak için hazırlanmış ücretsiz, bağımsız bir Türkçe çalışma rehberidir.',
      [
        {
          h: 'Ne öğretir?',
          body: [
            h('p', {}, 'Her ülkenin tüm ansiklopedik bilgilerini yığmak yerine, Street View ekranında gerçekten görünen ve bölgeyi belirgin biçimde daraltan 1–3 ana konuya odaklanırız: Vietnam’da telefon alan kodları ve il adı mantığı; Güney Asya’da 17 yerel yazı sistemi; Türkiye’de alan kodları, D/O yolları, belediye levhaları ve bölgesel manzaralar; Rusya’da federal yol çizgileri ve cumhuriyet harfleri; Japonya’da kanji prefektörlük adları ve elektrik direkleri; Endonezya’da yerel yazılar ve geleneksel çatılar; Brezilya, Meksika ve Güney Kore’de alan kodları, levhalar ve coğrafi ipuçları.'),
            h('p', {}, 'Her bölge; etkileşimli vektör harita, çözücü (decoder), doğrulanmış görsel kartlar, aralıklı tekrar (Leitner kutuları) ve haritada iğne bırakma simülasyonu ile çalışılır.')
          ]
        },
        {
          h: 'İçerik ve doğruluk ilkelerimiz',
          body: h('ul', { 'class': 'legal-ul' },
            h('li', {}, h('strong', {}, 'Doğrulanmış bilgi: '), 'Alan kodları, idari sınırlar ve yol numaraları resmî telekom/bakanlık listeleri ve güncel kaynaklarla doğrulanır. Yakın tarihli idari değişiklikler (ör. Vietnam’ın 2025 il birleşmesi) tarih belirtilerek açıklanır.'),
            h('li', {}, h('strong', {}, 'Gerçek fotoğraf ve etiketli çizim ayrımı: '), 'Fotoğraflar yalnızca serbest lisanslı Wikimedia Commons kayıtlarından yazar ve lisans bilgisiyle alınır. Şematik çizimler açıkça "özgün şematik çizim" olarak etiketlenir.'),
            h('li', {}, h('strong', {}, 'Hesapsız ve gizlilik dostu: '), 'Üyelik gerekmez; çalışma ilerlemesi yalnızca kullanıcının kendi tarayıcısında saklanır.'))
        },
        {
          h: 'Bağımsızlık bildirimi',
          body: h('p', {}, cfg().disclaimer || 'Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile bağlantısı yoktur.')
        },
        {
          h: 'İletişim',
          body: h('p', {}, 'Öneri, hata bildirimi veya telif soruları için ', link('iletisim.html', 'iletisim', 'İletişim'), ' sayfasından ya da doğrudan ',
            h('a', { href: 'mailto:' + email() }, email()), ' adresinden ulaşabilirsin.')
        }
      ]);
  }

  function mountPrivacy(root) {
    return shell(root, 'legal-privacy', 'Gizlilik ve Çerez Politikası',
      'Atlas’ı kullanırken hangi verilerin cihazında kaldığını, reklam ve çerezlerin nasıl işlendiğini ve KVKK / GDPR kapsamındaki haklarını burada açıkça paylaşıyoruz.',
      [
        {
          h: '1. Veri sorumlusu ve iletişim',
          body: h('p', {}, 'Bu internet sitesi ', h('strong', {}, cfg().siteName || 'Atlas'), ' tarafından işletilmektedir. Gizlilik ve kişisel verilerle ilgili tüm taleplerin için ',
            h('a', { href: 'mailto:' + email() }, email()), ' adresine yazabilirsin.')
        },
        {
          h: '2. Çalışma ilerlemesi ve yerel depolama (localStorage)',
          body: [
            h('p', {}, 'Atlas üyelik veya giriş gerektirmez. Alıştırma kutuların (Leitner tekrar geçmişi), doğruluk istatistiklerin, simülasyon rekorların ve açık/koyu tema seçimin yalnızca kendi tarayıcındaki yerel depolamada (', h('code', {}, 'localStorage · vietatlas.v1'), ') tutulur.'),
            h('p', {}, 'Bu veriler bizim sunucularımıza gönderilmez. İstediğin zaman Ana sayfadaki "Veri ve yedek" bölümünden verini dışa aktarabilir veya tek tıkla sıfırlayabilirsin.')
          ]
        },
        {
          h: '3. Reklamlar ve çerezler (Google AdSense)',
          body: [
            h('p', {}, 'Atlas, ücretsiz hizmetini sürdürebilmek için Google AdSense reklamlarını kullanabilir. Google dâhil üçüncü taraf satıcılar, kullanıcıların bu siteye veya internetteki diğer sitelere yaptığı önceki ziyaretlere dayalı olarak reklam sunmak için çerez (cookie) ve benzeri teknolojiler kullanır.'),
            h('p', {}, 'Google’ın reklam çerezlerini kullanması, Google’ın ve iş ortaklarının kullanıcılara Atlas’ı ve/veya internetteki diğer siteleri ziyaretlerine dayalı reklamlar göstermesini sağlar.'),
            h('ul', { 'class': 'legal-ul' },
              h('li', {}, 'Kişiselleştirilmiş reklamcılığı devre dışı bırakmak için ', h('a', { href: 'https://adssettings.google.com/', target: '_blank', rel: 'noopener noreferrer' }, 'Google Reklam Ayarları'), ' sayfasını ziyaret edebilirsin.'),
              h('li', {}, 'Üçüncü taraf satıcıların kişiselleştirilmiş reklam çerezlerini kapatmak için ', h('a', { href: 'https://www.aboutads.info/choices/', target: '_blank', rel: 'noopener noreferrer' }, 'www.aboutads.info'), ' adresini kullanabilirsin.'),
              h('li', {}, 'Google’ın iş ortağı sitelerdeki verileri nasıl kullandığını ', h('a', { href: 'https://policies.google.com/technologies/partner-sites', target: '_blank', rel: 'noopener noreferrer' }, 'Google Gizlilik ve Şartlar'), ' sayfasından inceleyebilirsin.')),
            h('p', {}, 'Avrupa Ekonomik Alanı (AEA), Birleşik Krallık ve İsviçre’den bağlanan ziyaretçiler için Google sertifikalı IAB TCF v2.2 onay yönetim platformu (CMP) uygulanır. Tercihlerini alt bilgideki ',
              h('button', { type: 'button', 'class': 'link-btn', onclick: function () { if (g.Ads && g.Ads.openConsent) g.Ads.openConsent(); } }, 'Çerez tercihleri'), ' bağlantısından yönetebilirsin.')
          ]
        },
        {
          h: '4. Üçüncü taraf teknik servisler',
          body: h('ul', { 'class': 'legal-ul' },
            h('li', {}, h('strong', {}, 'Cloudflare: '), 'Site barındırma, içerik dağıtımı (CDN) ve güvenlik (DDoS koruması) için standart erişim bilgileri (IP adresi, tarayıcı bilgisi) işlenebilir.'),
            h('li', {}, h('strong', {}, 'Google Fonts: '), 'Arayüz ve Güney Asya yerel yazılarının doğru görünmesi için yazı tipi dosyaları Google Fonts üzerinden çağrılır.'),
            h('li', {}, h('strong', {}, 'Wikimedia Commons: '), 'Rehber ve pratik ekranlarındaki gerçek tabela/yapı fotoğrafları Wikimedia Commons sunucularından yüklenir.'))
        },
        {
          h: '5. KVKK (6698 sayılı Kanun) ve GDPR hakların',
          body: h('p', {}, '6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 11. maddesi ve GDPR uyarınca; kişisel verilerinin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme/silme isteme ve itiraz etme haklarına sahipsin. Atlas tarafında ad, soyad, şifre veya profil verisi toplanmamaktadır; e-posta ile ilettiğin mesajlar yalnızca talebini yanıtlamak amacıyla işlenir. Başvuruların için ',
            h('a', { href: 'mailto:' + email() }, email()), ' adresine yazabilirsin.')
        },
        {
          h: '6. Çocukların gizliliği ve değişiklikler',
          body: h('p', {}, 'Atlas, 13 yaşından küçük çocuklardan bilerek kişisel veri toplamaz. Bu politika gerektiğinde güncellenebilir; değişiklikler bu sayfada güncel tarihle yayınlanır.')
        }
      ]);
  }

  function mountTerms(root) {
    return shell(root, 'legal-terms', 'Kullanım Koşulları ve Feragatname',
      'Atlas’ı kullanarak aşağıdaki koşul ve bilgilendirmeleri kabul etmiş sayılırsın.',
      [
        {
          h: '1. Hizmetin kapsamı',
          body: h('p', {}, 'Atlas, coğrafya ve bölge tanıma becerilerini geliştirmeye yönelik ücretsiz bir eğitim ve pratik aracıdır. İçerikler özenle doğrulanarak hazırlanır ancak "olduğu gibi" sunulur; bilgilerin eksiksizliği veya kesintisiz erişim konusunda garanti verilmez.')
        },
        {
          h: '2. Marka feragatnamesi (GeoGuessr)',
          body: h('p', {}, 'GeoGuessr, GeoGuessr AB’nin tescilli ticari markasıdır. ', cfg().disclaimer || 'Atlas bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB tarafından desteklenmez, sponsor edilmez veya onaylanmaz.')
        },
        {
          h: '3. Haritalar ve sınırlar hakkında not',
          body: h('p', {}, 'Uygulamadaki haritalar Natural Earth (kamu malı) ve OpenStreetMap (ODbL) verilerinden sadeleştirilerek üretilmiştir. Yalnızca bölge tanıma alıştırması içindir; resmî siyasi sınır, kadastro veya navigasyon kaynağı olarak kullanılamaz.')
        },
        {
          h: '4. Fikri mülkiyet ve lisanslar',
          body: h('ul', { 'class': 'legal-ul' },
            h('li', {}, 'Site yazılımı, Türkçe rehber metinleri ve özgün şematik çizimler Atlas’a aittir; kaynak gösterilmeden ticari amaçla kopyalanamaz.'),
            h('li', {}, 'Rehberdeki gerçek fotoğraflar Wikimedia Commons’tan ilgili yazarların Creative Commons / Kamu Malı lisanslarıyla kullanılmaktadır. Tüm yazar ve lisans listesi ', link('kaynaklar.html', 'kaynaklar', 'Kaynaklar ve Atıf'), ' sayfasındadır.'),
            h('li', {}, 'Rusya ve Türkiye yol çizgileri © OpenStreetMap katkıcıları (ODbL) verisine dayanır.'))
        },
        {
          h: '5. Kabul edilebilir kullanım',
          body: h('p', {}, 'Siteyi aşırı otomatik isteklerle zorlamak, reklamlar üzerinde geçersiz tıklama/sahte trafik oluşturmak veya içeriği izinsiz toplu kopyalamak yasaktır.')
        },
        {
          h: '6. İletişim ve telif bildirimi',
          body: h('p', {}, 'Herhangi bir içeriğin telif hakkını ihlal ettiğini veya hatalı olduğunu düşünüyorsan ', link('iletisim.html', 'iletisim', 'İletişim'), ' sayfasından ya da ',
            h('a', { href: 'mailto:' + email() }, email()), ' adresinden bize ulaşabilirsin; bildirimler incelenip en kısa sürede gereği yapılır.')
        }
      ]);
  }

  function mountContact(root) {
    var mail = email();
    var copyBtn = h('button', {
      type: 'button', 'class': 'btn btn-sm',
      onclick: function () {
        U.copy(mail).then(function (ok) {
          UI.toast(ok ? 'E-posta adresi kopyalandı.' : 'Kopyalanamadı: ' + mail, ok ? null : 'bad');
        });
      }
    }, UI.icon('copy', 14), 'E-postayı kopyala');

    return shell(root, 'legal-contact', 'İletişim',
      'Hata bildirimi, öneri, gizlilik talepleri ve telif/atıf bildirimleri için doğrudan e-posta ile ulaşabilirsin.',
      [
        {
          h: 'E-posta',
          body: h('div', { 'class': 'contact-box' },
            h('p', { 'class': 'contact-mail' }, h('strong', {}, 'Atlas İletişim: '), h('a', { href: 'mailto:' + mail }, mail)),
            h('div', { 'class': 'row row-wrap' },
              h('a', { 'class': 'btn btn-sm btn-primary', href: 'mailto:' + mail + '?subject=Atlas%20%C4%B0leti%C5%9Fim' }, 'E-posta gönder'),
              copyBtn))
        },
        {
          h: 'Hangi konularda yazabilirsin?',
          body: h('ul', { 'class': 'legal-ul' },
            h('li', {}, h('strong', {}, 'Bilgi düzeltme: '), 'Alan kodu, yol numarası, tabela açıklaması veya idari değişikliklerde bir hata fark edersen kaynak bağlantısıyla iletebilirsin.'),
            h('li', {}, h('strong', {}, 'Telif ve atıf bildirimi: '), 'Bir fotoğraf, metin veya harita bileşeniyle ilgili telif/lisans bildirimi yapıyorsan sayfa adresini ve ilgili dosya adını yazman yeterli; hızlıca inceleyip düzeltir veya kaldırırız.'),
            h('li', {}, h('strong', {}, 'Gizlilik ve KVKK: '), 'Kişisel veriler veya çerez tercihleriyle ilgili tüm soruların için yazabilirsin.'))
        },
        {
          h: 'Faydalı bağlantılar',
          body: h('p', {},
            link('hakkimizda.html', 'hakkimizda', 'Hakkımızda'), ' · ',
            link('gizlilik.html', 'gizlilik', 'Gizlilik ve Çerezler'), ' · ',
            link('kullanim-kosullari.html', 'kullanim-kosullari', 'Kullanım Koşulları'), ' · ',
            link('kaynaklar.html', 'kaynaklar', 'Kaynaklar ve Atıf'))
        }
      ]);
  }

  g.Views = g.Views || {};
  g.Views.about = { mount: mountAbout };
  g.Views.privacy = { mount: mountPrivacy };
  g.Views.terms = { mount: mountTerms };
  g.Views.contact = { mount: mountContact };
})(typeof window !== 'undefined' ? window : globalThis);

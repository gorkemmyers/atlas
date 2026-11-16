/* pack-turkey.js — Türkiye: 81 İl, 7 Coğrafi Bölge, 02xx/03xx/04xx Alan Kodları, 01–81 Posta Önekleri ve D-Yolu Izgarası */
(function (g) {
  'use strict';
  if (!g.CountryEngine) return;
  var h = g.U.h;

  var GROUPS = [
    {
      id: 'marmara', name: 'Marmara Bölgesi', short: 'Marmara', color: '#1c5fa6',
      codeRange: '0212/0216 · 022x · 026x · 028x',
      desc: 'Trakya ayçiçeği ovaları, İstanbul Boğazı ve Güney Marmara sanayi-zeytin kuşağı. Sabit hat kodları 021x (İstanbul), 028x (Trakya), 022x (Bursa-Çanakkale-Bilecik) ve 026x (Kocaeli-Sakarya-Balıkesir-Yalova) ile başlar.',
      keyCues: ['D-100 ve O-1..O-7 otoyol ağı', 'Trakya 0282/0284/0286/0288 alan kodları', 'Güney Marmara zeytinlikleri ve ağır sanayi OSB tabelaları']
    },
    {
      id: 'ege', name: 'Ege Bölgesi', short: 'Ege', color: '#0e7a80',
      codeRange: '0232 · 025x · 027x',
      desc: 'Kıyı Ege graben ovaları (zeytin, incir, üzüm bağları ve beyaz yazlık siteler) ile İç Batı Anadolu platoları. Tüm sabit telefon kodları 0232 (İzmir), 0236 (Manisa), 025x (Aydın-Muğla-Denizli) ve 027x (Afyon-Kütahya-Uşak) kuşağındadır.',
      keyCues: ['Kıyı Ege 0232/0236/0252/0256/0258 kodları', 'İç Ege 0272/0274/0276 platoları', 'D-550 kıyı aksı ve D-300 İzmir-Afyon koridoru']
    },
    {
      id: 'akdeniz', name: 'Akdeniz Bölgesi', short: 'Akdeniz', color: '#c0262c',
      codeRange: '024x · 032x · 0344',
      desc: 'Toros Dağları, kızılçam ormanları, sera/narenciye örtüsü ve Çukurova pamuk-mısır düzlüğü. Batı Akdeniz 024x (Antalya 0242, Isparta 0246, Burdur 0248), Doğu Akdeniz ise 032x (Adana 0322, Mersin 0324, Hatay 0326, Osmaniye 0328) ve 0344 (Kahramanmaraş) kodlarını kullanır.',
      keyCues: ['Kızılçam + maki + plastik/cam sera örtüsü', 'D-400 sahil karayolu', 'Batıda 024x, Çukurova ve doğuda 032x alan kodu ayrımı']
    },
    {
      id: 'ic-anadolu', name: 'İç Anadolu Bölgesi', short: 'İç Anadolu', color: '#a86a00',
      codeRange: '031x · 033x · 034x · 035x · 038x',
      desc: 'Geniş sarı buğday bozkırları, kavak ağaçlı dere boyları ve Kapadokya volkanik tüf platosu. Tüm sabit telefon kodları 03xx ile başlar: Ankara 0312, Eskişehir 0222 (istisna), Konya 0332, Kayseri 0352, Sivas 0346 ve Kapadokya illeri 038x.',
      keyCues: ['Ağaçsız sarı step ufku ve tahıl siloları', 'D-200, D-260, D-300 ve D-750 ana bozkır aksları', '0312 (Ankara), 0332 (Konya) ve 038x (Kapadokya/Orta Kızılırmak) kodları']
    },
    {
      id: 'karadeniz', name: 'Karadeniz Bölgesi', short: 'Karadeniz', color: '#0b6b3a',
      codeRange: '036x · 037x · 045x · 046x',
      desc: 'Kuzey Anadolu kıyı dağları: Batı Karadeniz çam/köknar ormanı (037x), Orta Karadeniz fındık/çeltik deltaları (036x, 035x) ve Doğu Karadeniz dik çay/fındık yamaçları (045x, 046x). Sahil boyunca D-010 karayolu uzanır.',
      keyCues: ['D-010 Karadeniz Sahil Yolu', 'Batıda 037x, Ortada 036x, Doğuda 045x–046x telefon kuşağı', 'Doğu Karadeniz dik çay bahçeleri ve sıvasız tuğla/beton yamaç evleri']
    },
    {
      id: 'dogu-anadolu', name: 'Doğu Anadolu Bölgesi', short: 'Doğu Anadolu', color: '#5b3fa0',
      codeRange: '042x · 043x · 044x · 047x',
      desc: 'Yüksek rakımlı (1500–2200 m) dağlık platolar, bazalt kayalıkları, uzun kışlık kar direkleri ve çinko/sac çatılı taş-beton köyler. Tüm sabit telefon kodları 04xx kuşağındadır (Erzurum 0442, Malatya 0422, Elazığ 0424, Van 0432, Kars 0474).',
      keyCues: ['Yüksek ağaçsız yaylalar ve bazalt/volkanik taş doku', 'D-100, D-280 ve D-300 doğu uzantıları', '042x (Yukarı Fırat), 043x (Van Gölü) ve 044x/047x (Erzurum-Kars) kodları']
    },
    {
      id: 'guneydogu', name: 'Güneydoğu Anadolu Bölgesi', short: 'Güneydoğu', color: '#3949ab',
      codeRange: '0342 · 041x · 048x',
      desc: 'Mezopotamya kuzey düzlükleri, kırmızı mercimek/pamuk tarlaları, Antep fıstığı bahçeleri ve sarı kalker kesme taş mimari. Gaziantep/Kilis 0342/0348, Fırat havzası 041x (Şanlıurfa 0414, Adıyaman 0416, Diyarbakır 0412) ve Dicle havzası 048x (Mardin 0482, Siirt 0484, Şırnak 0486, Batman 0488) kodlarını taşır.',
      keyCues: ['D-400 İpek Yolu koridoru', 'Sarı kalker taş cepheler ve düz damlı köy dokusu', 'Fıstık/zeytin bahçeleri (Batı) vs düz kızıl pamuk-tahıl ovaları (Doğu)']
    }
  ];

  /* [id, name, cap, reg, phone, traitId, road, cueExtra, trapExtra] */
  var RAW = [
    ['01', 'Adana', 'Adana', 'akdeniz', '0322', 'tr-d-highway', 'D-400 / O-51', 'Çukurova düz alüvyon ovası, okaliptüs/narenciye sıraları ve Seyhan-Ceyhan sulama kanalları', 'Mersin (0324) kıyı şeridi daha dar ve muz/limon seralıdır; Adana (0322) geniş açık tarım ovasıdır'],
    ['02', 'Adıyaman', 'Adıyaman', 'guneydogu', '0416', 'tr-mardin-stone', 'D-360 / D-875', 'Atatürk Barajı göl kıyısı, Nemrut etekleri ve açık renkli kireçtaşı tepelerde fıstık/tütün tarlaları', 'Şanlıurfa (0414) çok daha düz ovadır; Adıyaman (0416) Toros eteklerine doğru engebelenir'],
    ['03', 'Afyonkarahisar', 'Afyonkarahisar', 'ege', '0272', 'tr-d-highway', 'D-300 / D-650', 'İç Ege kavşak platosu, mermer ocakları, haşhaş/buğday tarlaları ve volkanik kaya kaleleri', 'Kütahya (0274) daha çam ormanlıdır; Afyon (0272) açık bozkır platosu ve D-300/D-650 ana kavşağıdır'],
    ['04', 'Ağrı', 'Ağrı', 'dogu-anadolu', '0472', 'tr-tedas-pole', 'D-100 / D-965', 'İran sınırına uzanan D-100 yüksek bazalt platosu, Ağrı Dağı silüeti ve sac çatılı taş köyler', 'Iğdır (0476) alçak ve ılıman mikro-klima ovasıdır; Ağrı (0472) yüksek ve soğuk yayladır'],
    ['05', 'Amasya', 'Amasya', 'karadeniz', '0358', 'tr-tedas-pole', 'D-100 / D-795', 'Yeşilırmak derin kaya vadisi, elma bahçeleri ve D-100 Orta Karadeniz iç geçidi', 'Tokat (0356) daha geniş Kazova düzlüğüne açılır; Amasya (0358) sarp kalker kanyonlarıyla ayrılır'],
    ['06', 'Ankara', 'Ankara', 'ic-anadolu', '0312', 'tr-d-highway', 'D-200 / D-750', 'Başkent çevre yolu, D-200/D-750 merkez kavşağı, sarı bozkır tepeleri ve mavi ABB kent tabelaları', 'Kırıkkale (0318) ve Çankırı (0376) küçük il ölçeğindedir; Ankara (0312) 06xxx posta ve geniş bulvarlarıyla seçilir'],
    ['07', 'Antalya', 'Antalya', 'akdeniz', '0242', 'tr-d-highway', 'D-400 / D-650', 'Beydağları ve Toros duvarı önünde yoğun cam/plastik seralar, palmiyeli turizm bulvarları ve kızılçam', 'Muğla (0252) seradan çok beyaz taş/bodrum mimarisi ve koylarla öne çıkar; Antalya (0242) yoğun sera kuşağıdır'],
    ['08', 'Artvin', 'Artvin', 'karadeniz', '0466', 'tr-karadeniz-tea', 'D-010 / D-950', 'Hopa-Borçka çay ve yağmur ormanı yamaçları ile Çoruh Vadisi derin baraj tünelleri', 'Rize (0464) kesintisiz kıyı çay kuşağıdır; Artvin (0466) iç kesimde sarp Çoruh kanyonuna dönüşür'],
    ['09', 'Aydın', 'Aydın', 'ege', '0256', 'tr-d-highway', 'D-550 / D-320', 'Büyük Menderes graben ovası, dağ yamaçlarında kesintisiz incir ve zeytin bahçeleri', 'Manisa (0236) Gediz ovasında çekirdeksiz üzüm bağlarıyla; Aydın (0256) incir ve Kuşadası/Didim kıyı hattıyla ayrılır'],
    ['10', 'Balıkesir', 'Balıkesir', 'marmara', '0266', 'tr-tedas-pole', 'D-565 / D-230', 'Edremit Körfezi yoğun zeytinlikleri ile Güney Marmara (Bandırma/Manyas) tarım-sanayi ovaları', 'Çanakkale (0286) Boğaz ve Gelibolu hattıdır; Balıkesir (0266) hem Marmara hem Ege kıyısına sahip 10xxx kodlu ildir'],
    ['11', 'Bilecik', 'Bilecik', 'marmara', '0228', 'tr-tedas-pole', 'D-650 / D-160', 'Sakarya Irmağı derin vadisi, mermer/seramik tesisleri ve D-650 Bozüyük-Adapazarı koridoru', 'Eskişehir (0222) düz bozkıra çıkar; Bilecik (0228) ormanlık ve sarp geçiş vadilerindedir'],
    ['12', 'Bingöl', 'Bingöl', 'dogu-anadolu', '0426', 'tr-tedas-pole', 'D-300 / D-950', 'Meşe kaplı yüksek dağ geçitleri, yüzen ada/yayla meraları ve D-300 Elazığ-Muş koridoru', 'Muş (0436) geniş düz ovaya iner; Bingöl (0426) çok daha engebeli ve meşe çalılıklıdır'],
    ['13', 'Bitlis', 'Bitlis', 'dogu-anadolu', '0434', 'tr-mardin-stone', 'D-300 / D-965', 'Van Gölü batı kıyısı (Tatvan/Ahlat), Nemrut kalderası ve koyu kahverengi Ahlat kesme taş mimarisi', 'Van (0432) gölün doğu kıyısındadır; Bitlis (0434) Tatvan feribot/demiryolu ucu ve dar Bitlis درesiyle bilinir'],
    ['14', 'Bolu', 'Bolu', 'karadeniz', '0374', 'tr-tedas-pole', 'D-100 / O-4', 'Köroğlu ve Abant yoğun köknar/çam ormanları, yayla ahşap evleri ve D-100 Bolu Dağı geçişi', 'Düzce (0380) alçak ve nemli fındık ovasıdır; Bolu (0374) yüksek rakımlı çam ormanı platosudur'],
    ['15', 'Burdur', 'Burdur', 'akdeniz', '0248', 'tr-tedas-pole', 'D-650 / D-330', 'Göller Yöresi kireçtaşı havzası (Burdur ve Salda gölleri), bej mermer ocakları ve anason/tahıl tarlaları', 'Isparta (0246) elma ve gül bahçeleriyle daha yeşildir; Burdur (0248) daha açık kireçtaşı ve mermer dokusuna sahiptir'],
    ['16', 'Bursa', 'Bursa', 'marmara', '0224', 'tr-d-highway', 'D-200 / O-5', 'Uludağ silüeti önünde yeşil şeftali/zeytin ovaları, dev otomotiv/tekstil OSB tabelaları ve 0224 kodu', 'Yalova (0226) dar kıyı şerididir; Bursa (0224) geniş İnegöl-Karacabey ovası ve 16xxx posta koduyla ayrılır'],
    ['17', 'Çanakkale', 'Çanakkale', 'marmara', '0286', 'tr-d-highway', 'D-550 / D-200', 'Çanakkale Boğazı, 1915 Köprüsü, Gelibolu şehitlik yarımadası ve Kazdağları çam/zeytin etekleri', 'Tekirdağ (0282) kuzeyde düz Trakya ovasıdır; Çanakkale (0286) boğaz kıyısı ve rüzgar türbinli tepelerdir'],
    ['18', 'Çankırı', 'Çankırı', 'ic-anadolu', '0376', 'tr-tedas-pole', 'D-765 / D-100', 'Ilgaz Dağı güney eteklerinden İç Anadolu tuzlu/jipsli bozkır tepelerine geçiş kuşağı', 'Kastamonu (0366) Ilgaz kuzeyinde sık ormandır; Çankırı (0376) güney yamaçta kurak bozkıra döner'],
    ['19', 'Çorum', 'Çorum', 'karadeniz', '0364', 'tr-tedas-pole', 'D-795 / D-180', 'İç Karadeniz-Orta Anadolu geçişinde geniş tahıl ovaları, kiremit/tuğla fabrikaları ve leblebi/Hitit tabelaları', 'Amasya (0358) dar ırmak vadisidir; Çorum (0364) açık plato ve Samsun-Ankara D-795 ana koridorudur'],
    ['20', 'Denizli', 'Denizli', 'ege', '0258', 'tr-d-highway', 'D-320 / D-585', 'Pamukkale beyaz traverten terasları, Çürüksu/Menderes bağları ve tekstil-mermer sanayi kuşağı', 'Aydın (0256) daha alçak incir-zeytin grabenidir; Denizli (0258) Honaz Dağı ve iç plato geçişindedir'],
    ['21', 'Diyarbakır', 'Diyarbakır', 'guneydogu', '0412', 'tr-mardin-stone', 'D-360 / D-950', 'Dicle Vadisi, siyah bazalt sur/bina dokusu ve geniş kırmızı topraklı Bismil-Silvan tahıl ovaları', 'Mardin (0482) sarı kalker tepe mimarisidir; Diyarbakır (0412) koyu bazalt taş ve geniş Dicle düzlüğüdür'],
    ['22', 'Edirne', 'Edirne', 'marmara', '0284', 'tr-d-highway', 'D-100 / D-550', 'Meriç ve Tunca nehir köprüleri, çeltik ve ayçiçeği tarlaları, Kapıkule/İpsala sınır koridorları', 'Kırklareli (0288) Yıldız Dağları ormanına yaslanır; Edirne (0284) Meriç taşkın ovası ve 22xxx koduyla seçilir'],
    ['23', 'Elazığ', 'Elazığ', 'dogu-anadolu', '0424', 'tr-tedas-pole', 'D-300 / D-885', 'Keban ve Karakaya baraj gölleriyle çevrili yarımada platosu, bağlar ve vişne/bordo mermer işletmeleri', 'Malatya (0422) Fırat batısında yoğun kayısı bahçeleridir; Elazığ (0424) doğu yakada baraj gölleri arasındadır'],
    ['24', 'Erzincan', 'Erzincan', 'dogu-anadolu', '0446', 'tr-tedas-pole', 'D-100 / D-885', 'Karasu (Fırat) boyunca uzanan geniş düz alüvyon ovası ve iki yanında 3000 metrelik Munzur-Keşiş dağ duvarı', 'Erzurum (0442) daha yüksek ve soğuk platodur; Erzincan (0446) dağ çemberi içindeki düzenli ızgara şehir planıyla tanınır'],
    ['25', 'Erzurum', 'Erzurum', 'dogu-anadolu', '0442', 'tr-tedas-pole', 'D-100 / D-950', '1900 m Palandöken platosu, ağaçsız geniş çayırlar, uzun kar direkleri ve koyu bazalt taş mimari', 'Kars (0474) daha düz bazalt yaylası ve Rus dönemi taş binalarıyla; Erzurum (0442) D-100/D-950 ana kavşağıyla ayrılır'],
    ['26', 'Eskişehir', 'Eskişehir', 'ic-anadolu', '0222', 'tr-d-highway', 'D-200 / D-665', 'Porsuk Çayı, düz uçak/lokomotif sanayi ovası ve İç Anadolu’da 02xx (0222) alan kodu kullanan tek il', 'Bilecik (0228) dağlık ve ormanlıktır; Eskişehir (0222) açık bozkır ovası ve 26xxx posta koduyla hemen ayrılır'],
    ['27', 'Gaziantep', 'Gaziantep', 'guneydogu', '0342', 'tr-mardin-stone', 'D-400 / O-52', 'Kırmızı topraklı bakımlı Antep fıstığı ve zeytin bahçeleri, dev organize sanayi bölgeleri ve 0342 kodu', 'Şanlıurfa (0414) Fırat doğusunda ağaçsız tahıl/pamuk ovasıdır; Gaziantep (0342) fıstık ağaçları ve sanayi dokusuyla seçilir'],
    ['28', 'Giresun', 'Giresun', 'karadeniz', '0454', 'tr-karadeniz-tea', 'D-010 / D-865', 'Deniz kıyısından dik yükselen kesintisiz fındık bahçeleri, Giresun Adası ve Eğribel geçidi', 'Rize (0464) çay tarlalarıyla kaplıdır; Giresun (0454) neredeyse tamamen fındık ağacı örtüsündedir'],
    ['29', 'Gümüşhane', 'Gümüşhane', 'karadeniz', '0456', 'tr-tedas-pole', 'D-885 / D-050', 'Harşit Çayı dar kayalık vadisi, Zigana Tüneli güney çıkışı ve pestil/köme dükkan tabelaları', 'Trabzon (0462) kuzey yamaçta nemli ve yeşildir; Gümüşhane (0456) tünelin hemen güneyinde kurak-kayalık vadiye döner'],
    ['30', 'Hakkari', 'Hakkâri', 'dogu-anadolu', '0438', 'tr-mardin-stone', 'D-400 / D-975', 'Zap Suyu derin sarp kanyonu, Cilo-Sat buzul dağları ve Yüksekova düz sınır havzası', 'Van (0432) geniş göl havzasıdır; Hakkâri (0438) Türkiye’nin en sarp kaya vadileri ve 0438 koduyla ayrılır'],
    ['31', 'Hatay', 'Antakya', 'akdeniz', '0326', 'tr-d-highway', 'D-817 / D-825', 'Amanos (Nur) Dağları, İskenderun Körfezi demir-çelik/liman sanayisi ve Amik Ovası zeytin-pamuk kuşağı', 'Adana (0322) düz Çukurova’dır; Hatay (0326) Amanos duvarı ve Asi Nehri vadisiyle kolayca ayrılır'],
    ['32', 'Isparta', 'Isparta', 'akdeniz', '0246', 'tr-tedas-pole', 'D-685 / D-330', 'Eğirdir Gölü, Davraz Dağı, düzenli elma/kiraz bahçeleri ve gül ürünleri tabelaları', 'Burdur (0248) daha kurak kireçtaşı havzasıdır; Isparta (0246) yoğun meyve bahçeleri ve Eğirdir kıyısıyla seçilir'],
    ['33', 'Mersin', 'Mersin', 'akdeniz', '0324', 'tr-d-highway', 'D-400 / O-51', 'D-400 boyunca muz ve limon seraları, Toros kireçtaşı yamaçları ve uluslararası konteyner limanı', 'Antalya (0242) Batı Akdeniz’dedir; Mersin (0324) 33xxx posta kodu ve muz seralarıyla Doğu Akdeniz kıyısını tutar'],
    ['34', 'İstanbul', 'İstanbul', 'marmara', '0212 / 0216', 'tr-d-highway', 'D-100 / O-1..O-7', 'Avrupa yakasında 0212, Anadolu yakasında 0216 alan kodu; Boğaz köprüleri, yeşil İBB sokak tabelaları ve 34xxx posta kodu', 'Kocaeli (0262) körfez sanayi hattıdır; İstanbul (0212/0216) iki ayrı alan kodu kullanan tek ildir'],
    ['35', 'İzmir', 'İzmir', 'ege', '0232', 'tr-d-highway', 'D-550 / D-300 / O-30', 'İzmir Körfezi, kırmızı kireçtaşı burunlar, palmiyeli kordon, Çeşme/Urla rüzgar gülleri ve 0232 kodu', 'Aydın (0256) ve Manisa (0236) iç graben ovalarıdır; İzmir (0232) körfez topoğrafyası ve 35xxx posta koduyla ayrılır'],
    ['36', 'Kars', 'Kars', 'dogu-anadolu', '0474', 'tr-tedas-pole', 'D-965 / D-080', 'Yüksek bazalt yaylası, Sarıkamış sarıçam ormanları, Çıldır Gölü ve siyah kesme taş Baltık mimarisi', 'Ardahan (0478) daha küçük ve engebelidir; Kars (0474) geniş kaşar/mera yaylaları ve 36xxx koduyla seçilir'],
    ['37', 'Kastamonu', 'Kastamonu', 'karadeniz', '0366', 'tr-tedas-pole', 'D-765 / D-010', 'Küre ve Ilgaz gür köknar/kayın ormanları, kanyonlar, sarımsak/ahşap konak dokusu ve dik Karadeniz kıyısı', 'Sinop (0368) ince burun yarımadasıdır; Kastamonu (0366) geniş iç orman havzası ve 37xxx posta kodudur'],
    ['38', 'Kayseri', 'Kayseri', 'ic-anadolu', '0352', 'tr-mardin-stone', 'D-300 / D-805', 'Erciyes volkanik konisi, koyu gri bazalt/andezit kesme taş cepheler ve geniş planlı sanayi bulvarları', 'Nevşehir (0384) açık sarı/beyaz yumuşak tüf kayalarıdır; Kayseri (0352) koyu gri volkanik taş ve Erciyes silüetiyle ayrılır'],
    ['39', 'Kırklareli', 'Kırklareli', 'marmara', '0288', 'tr-tedas-pole', 'D-020 / D-555', 'Yıldız (Istranca) meşe-kayın ormanları ile Lüleburgaz ayçiçeği/buğday ovaları ve 0288 kodu', 'Edirne (0284) Meriç nehir düzlüğüdür; Kırklareli (0288) kuzeydoğuda Istranca orman kuşağına yaslanır'],
    ['40', 'Kırşehir', 'Kırşehir', 'ic-anadolu', '0386', 'tr-tedas-pole', 'D-260 / D-757', 'Orta Kızılırmak ve Seyfe Gölü hafif dalgalı tahıl bozkırı, ceviz ağaçlı vadiler ve 0386 kodu', 'Yozgat (0354) daha yüksek platodur; Kırşehir (0386) Ankara-Kayseri D-260 aksı üzerinde 40xxx posta koduyla bilinir'],
    ['41', 'Kocaeli', 'İzmit', 'marmara', '0262', 'tr-d-highway', 'D-100 / O-4', 'İzmit Körfezi kıyısında yoğun rafineri, liman ve otomotiv fabrikaları ile Kartepe orman sırtı', 'Sakarya (0264) düz Adapazarı ovasına açılır; Kocaeli (0262) körfez kıyısı ve ağır sanayi dokusuyla seçilir'],
    ['42', 'Konya', 'Konya', 'ic-anadolu', '0332', 'tr-d-highway', 'D-300 / D-715', 'Türkiye’nin en geniş ve dümdüz tahıl/şekerpancarı ovası, dev sulama tamburları, silolar ve 0332 kodu', 'Aksaray (0382) Hasan Dağı konisiyle; Konya (0332) göz alabildiğine düz ufuk çizgisi ve 42xxx koduyla ayrılır'],
    ['43', 'Kütahya', 'Kütahya', 'ege', '0274', 'tr-tedas-pole', 'D-650 / D-240', 'Çيني/porselen motifli kent girişleri, bor/linyit madenleri ve İç Batı Anadolu çamlı dağ eşiği', 'Afyon (0272) daha düz ve ağaçsızdır; Kütahya (0274) ormanlık tepeler ve çini süslemeli kavşaklarıyla tanınır'],
    ['44', 'Malatya', 'Malatya', 'dogu-anadolu', '0422', 'tr-tedas-pole', 'D-300 / D-850', 'Beydağları önünde uçsuz bucaksız kayısı bahçeleri, Karakaya Barajı ve 0422 alan kodu', 'Elazığ (0424) Fırat doğusundadır; Malatya (0422) her köy ve yol kenarında görülen kayısı ağaçlarıyla seçilir'],
    ['45', 'Manisa', 'Manisa', 'ege', '0236', 'tr-d-highway', 'D-565 / D-250', 'Spil Dağı dik duvarı, Gediz Ovası boyunca kesintisiz çekirdeksiz üzüm bağları ve zeytinlikler', 'İzmir (0232) kıyı metropolüdür; Manisa (0236) Gediz bağları, Soma/Akhisar/Turgutlu ovaları ve 45xxx koduyla ayrılır'],
    ['46', 'Kahramanmaraş', 'Kahramanmaraş', 'akdeniz', '0344', 'tr-d-highway', 'D-825 / D-835', 'Ahır Dağı etekleri, Ceyhan baraj vadileri, kırmızı biber/pamuk ovaları ve Elbistan yüksek havzası', 'Gaziantep (0342) fıstık platosudur; Kahramanmaraş (0344) yüksek Toros vadileri ve 0344 koduyla ayrılır'],
    ['47', 'Mardin', 'Mardin', 'guneydogu', '0482', 'tr-mardin-stone', 'D-400 / D-955', 'Mezopotamya Ovası’na bakan sarı kalker tepe yamacı, taş işçiliği ve D-400 Kızıltepe-Nusaybin düzlüğü', 'Diyarbakır (0412) siyah bazalt kullanır; Mardin (0482) bal sarısı kalker taş mimarisiyle hemen tanınır'],
    ['48', 'Muğla', 'Muğla', 'ege', '0252', 'tr-d-highway', 'D-550 / D-400', 'Girintili çam kaplı koylar, beyaz kübik Bodrum/Datça/Marmaris evleri ve sığla/zeytin ormanları', 'Antalya (0242) yoğun sera ovasıdır; Muğla (0252) beyaz taş/sıvalı mimari ve koy topoğrafyasıyla ayrılır'],
    ['49', 'Muş', 'Muş', 'dogu-anadolu', '0436', 'tr-tedas-pole', 'D-300 / D-955', 'Murat Nehri’nin suladığı çok geniş ve düz Muş Ovası, şekerpancarı/tahıl tarlaları ve 0436 kodu', 'Bitlis (0434) dar dağ boğazıdır; Muş (0436) Doğu Anadolu’nun en düz ve geniş çöküntü ovasıdır'],
    ['50', 'Nevşehir', 'Nevşehir', 'ic-anadolu', '0384', 'tr-mardin-stone', 'D-300 / D-765', 'Kapadokya peribacaları, beyaz-sarı volkanik tüf vadileri, kaya oteller ve bağ/patates tarlaları', 'Aksaray (0382) düz tuz gölü bozkırıdır; Nevşehir (0384) aşınmış tüf kayalıkları ve 50xxx koduyla benzersizdir'],
    ['51', 'Niğde', 'Niğde', 'ic-anadolu', '0388', 'tr-tedas-pole', 'D-750 / D-805', 'Aladağlar ve Bolkar Dağları önünde patates, elma ve lahana tarlaları ile Gülek Boğazı kuzey girişi', 'Konya (0332) düz ovadır; Niğde (0388) güneyde yükselen sarp Aladağlar duvarı ve elma bahçeleriyle ayrılır'],
    ['52', 'Ordu', 'Ordu', 'karadeniz', '0452', 'tr-karadeniz-tea', 'D-010 / D-855', 'Boztepe yamacı, fındık bahçeleri ve D-010 üzerinde uzun Bolaman-Nefise Akçelik sahil tünelleri', 'Samsun (0362) düz çarşamba-bafra deltasıdır; Ordu (0452) fındık kaplı dik yamaçlar ve 045x kodunun başlangıcıdır'],
    ['53', 'Rize', 'Rize', 'karadeniz', '0464', 'tr-karadeniz-tea', 'D-010 / D-925', 'Denizden yaylalara kadar her yamacı kaplayan teraslı çay bahçeleri, çay fabrikası tabelaları ve Fırtına Vadisi', 'Trabzon (0462) fındık ve kentsel kıyı dokusuyla; Rize (0464) kesintisiz koyu yeşil çay çalısı örtüsüyle ayrılır'],
    ['54', 'Sakarya', 'Adapazarı', 'marmara', '0264', 'tr-d-highway', 'D-100 / D-650', 'Akova (Adapazarı) nemli düzlüğü, mısır/fındık/süs bitkisi tarlaları ve D-100/D-650 kavşağı', 'Kocaeli (0262) körfez kıyısıdır; Sakarya (0264) geniş yeşil ova ve 54xxx posta koduyla seçilir'],
    ['55', 'Samsun', 'Samsun', 'karadeniz', '0362', 'tr-d-highway', 'D-010 / D-795', 'Kızılırmak (Bafra) ve Yeşilırmak (Çarşamba) geniş verimli deltaları, Karadeniz’in en büyük liman metropolü', 'Ordu (0452) ve Sinop (0368) dağlık kıyıdır; Samsun (0362) Karadeniz’de geniş düz deltaya yayılan tek büyük ildir'],
    ['56', 'Siirt', 'Siirt', 'guneydogu', '0484', 'tr-mardin-stone', 'D-370 / D-965', 'Botan Çayı derin uçurum vadisi, Siirt fıstığı bahçeleri ve beyaz/sarı cas harçlı taş mimari', 'Batman (0488) düz petrol ovasıdır; Siirt (0484) Doğu Anadolu dağlarına yükselen sarp yamaçlarda kuruludur'],
    ['57', 'Sinop', 'Sinop', 'karadeniz', '0368', 'tr-tedas-pole', 'D-010 / D-785', 'Karadeniz’in en kuzey ince burun yarımadası, Boyabat çeltik vadisi ve sık kıyı çam/meşe ormanları', 'Samsun (0362) geniş deltadır; Sinop (0368) dar Boztepe yarımadası ve 57xxx posta koduyla ayrılır'],
    ['58', 'Sivas', 'Sivas', 'ic-anadolu', '0346', 'tr-tedas-pole', 'D-200 / D-850', 'Yukarı Kızılırmak geniş yüksek bozkır havzası, jipsli beyaz-boz tepeler ve Selçuklu taş dokusu', 'Kayseri (0352) Erciyes volkanik ovasıdır; Sivas (0346) çok geniş dalgalı bozkır ve 0346 alan koduyla tanınır'],
    ['59', 'Tekirdağ', 'Tekirdağ', 'marmara', '0282', 'tr-d-highway', 'D-110 / D-100', 'Marmara kuzey kıyısı, sarı ayçiçeği/kanola tepeleri, Çorlu-Çerkezköy sanayi kuşağı ve 0282 kodu', 'Edirne (0284) iç sınır ovasıdır; Tekirdağ (0282) Marmara Denizi kıyısı ve 59xxx posta koduyla ayrılır'],
    ['60', 'Tokat', 'Tokat', 'karadeniz', '0356', 'tr-tedas-pole', 'D-850 / D-180', 'Yeşilırmak’ın suladığı verimli Kazova, Niksar ve Erbaa meyve-sebze/bağ ovaları ve 0356 kodu', 'Sivas (0346) güneyde kurak bozkırdır; Tokat (0356) Çamlıbel geçidinin kuzeyinde yemyeşil çukur ovalara iner'],
    ['61', 'Trabzon', 'Trabzon', 'karadeniz', '0462', 'tr-karadeniz-tea', 'D-010 / D-885', 'Doğu Karadeniz merkez kenti, fındık/çay yamaçları, Zigana/Maçka vadisi ve 0462 alan kodu', 'Rize (0464) saf çay monokültürüdür; Trabzon (0462) yoğun kentsel kıyı bandı ve 61xxx koduyla seçilir'],
    ['62', 'Tunceli', 'Tunceli', 'dogu-anadolu', '0428', 'tr-tedas-pole', 'D-885', 'Munzur Vadisi sarp kalker dağları, meşe ormanları, berrak akarsu kanyonları ve Keban kuzey kolları', 'Elazığ (0424) güneyde düz platodur; Tunceli (0428) derin Munzur kanyonları ve 0428 koduyla ayrılır'],
    ['63', 'Şanlıurfa', 'Şanlıurfa', 'guneydogu', '0414', 'tr-mardin-stone', 'D-400 / D-885', 'Harran ve Ceylanpınar uçsuz bucaksız düz kızıl pamuk/buğday ovaları, sarı Urfa taşı ve fıstık bahçeleri', 'Gaziantep (0342) daha engebeli ve sanayileşmiştir; Şanlıurfa (0414) geniş Harran düzlüğü ve 63xxx koduyla seçilir'],
    ['64', 'Uşak', 'Uşak', 'ege', '0276', 'tr-tedas-pole', 'D-300 / D-595', 'İç Batı Anadolu dalgalı meşe/tahıl platosu, kanyonlar, battaniye/deri OSB ve D-300 koridoru', 'Manisa (0236) alçak bağ ovasıdır; Uşak (0276) Kula volkanik tepelerinden sonra yükselen 0276 kodlu platodur'],
    ['65', 'Van', 'Van', 'dogu-anadolu', '0432', 'tr-mardin-stone', 'D-300 / D-975', 'Van Gölü sodalı mavi kıyıları, Süphan/Erek dağları, kurak yüksek yayla ve 0432 alan kodu', 'Bitlis (0434) gölün batı ucudur; Van (0432) doğu kıyısı, Erciş-Gevaş hattı ve 65xxx posta koduyla ayrılır'],
    ['66', 'Yozgat', 'Yozgat', 'ic-anadolu', '0354', 'tr-tedas-pole', 'D-200 / D-795', 'Bozok Platosu dalgalı buğday/mercimek tepeleri, Çamlık tepesi ve Ankara-Sivas D-200 koridoru', 'Çorum (0364) kuzeyde daha alçak ovalara iner; Yozgat (0354) yüksek Bozok bozkırı ve 66xxx kodudur'],
    ['67', 'Zonguldak', 'Zonguldak', 'karadeniz', '0372', 'tr-tedas-pole', 'D-010 / D-750', 'Taşkömürü maden ocakları, Ereğli demir-çelik kıyısı ve dik ormanlık Batı Karadeniz vadileri', 'Bartın (0378) daha sakin tarım/kıyı dokusudur; Zonguldak (0372) kömür/çelik sanayisi ve 67xxx koduyla ayrılır'],
    ['68', 'Aksaray', 'Aksaray', 'ic-anadolu', '0382', 'tr-mardin-stone', 'D-750 / D-300', 'Tuz Gölü güneydoğu düzlüğü, ufukta tek başına yükselen Hasan Dağı volkan konisi ve Ihlara Vadisi', 'Nevşehir (0384) peribacalı vadilerdir; Aksaray (0382) düz ova ortasında Hasan Dağı silüeti ve D-750/D-300 kavşağıdır'],
    ['69', 'Bayburt', 'Bayburt', 'karadeniz', '0458', 'tr-tedas-pole', 'D-915 / D-052', 'Çoruh Nehri yukarı havzası, sarı Bayburt taşı mimarisi ve Kop Dağı ağaçsız yüksek geçidi', 'Rize/Trabzon kıyı şeridi yemyeşildir; Bayburt (0458) kıyı dağlarının arkasında Doğu Anadolu tipi kurak yayladır'],
    ['70', 'Karaman', 'Karaman', 'ic-anadolu', '0338', 'tr-tedas-pole', 'D-715 / D-350', 'Konya Ovası güney ucu, yoğun elma bahçeleri, bisküvi/gıda sanayisi ve Sertavul Geçidi girişi', 'Konya (0332) kuzeyde açık tahıl ovasıdır; Karaman (0338) Toros eteklerine yaslanan elma bahçeleri ve 0338 kodudur'],
    ['71', 'Kırıkkale', 'Kırıkkale', 'ic-anadolu', '0318', 'tr-d-highway', 'D-200 / D-765', 'Kızılırmak vadisi, MKE/rafineri sanayi tesisleri ve 43 ilin bağlantı noktası olan D-200/D-765 kavşağı', 'Ankara (0312) batıda metropoldür; Kırıkkale (0318) Kızılırmak köprüsü ve 71xxx posta koduyla ayrılır'],
    ['72', 'Batman', 'Batman', 'guneydogu', '0488', 'tr-mardin-stone', 'D-370 / D-955', 'Raman Dağı atbaşı petrol kuyuları, Dicle/Batman çayı ovası, Hasankeyf kireçtaşı kanyonu ve 0488 kodu', 'Diyarbakır (0412) bazalt dokuludur; Batman (0488) petrol pompaları, rafineri ve 72xxx koduyla seçilir'],
    ['73', 'Şırnak', 'Şırnak', 'guneydogu', '0486', 'tr-mardin-stone', 'D-400 / D-380', 'Cudi ve Gabar dağları ile Cizre-Silopi Habur sınır tır koridoru ve 0486 alan kodu', 'Mardin (0482) batıda kalker tepedir; Şırnak (0486) Dicle kıyısı Cizre düzlüğü ve sarp Cudi dağ duvarıdır'],
    ['74', 'Bartın', 'Bartın', 'karadeniz', '0378', 'tr-tedas-pole', 'D-010 / D-755', 'Bartın Çayı, Amasra tarihi yarımadası, yeşil fındık/mısır vadileri ve ahşap kırsal evler', 'Zonguldak (0372) ağır maden/çelik kentidir; Bartın (0378) yeşil kıyı kanyonları ve 74xxx posta kodudur'],
    ['75', 'Ardahan', 'Ardahan', 'dogu-anadolu', '0478', 'tr-tedas-pole', 'D-955 / D-010', 'Kura Nehri yüksek çayır platosu, Çıldır Gölü kuzeyi, Posof orman geçişi ve 0478 alan kodu', 'Artvin (0466) derin Çoruh vadisidir; Ardahan (0478) 1800 m üzerinde açık mera yaylasıdır'],
    ['76', 'Iğdır', 'Iğdır', 'dogu-anadolu', '0476', 'tr-tedas-pole', 'D-080', 'Ağrı Dağı’nın hemen kuzey eteğinde 850 m rakımlı düz mikro-klima ovası, kayısı/pamuk ve leylek yuvaları', 'Ağrı (0472) ve Kars (0474) soğuk yüksek yayladır; Iğdır (0476) kavak ağaçlı alçak ve sıcak Aras ovasıdır'],
    ['77', 'Yalova', 'Yalova', 'marmara', '0226', 'tr-d-highway', 'D-575 / O-5', 'Osmangazi Köprüsü güney çıkışı, dar yeşil Marmara kıyı şeridi, termal/süs bitkisi seraları ve 0226 kodu', 'Bursa (0224) ve Kocaeli (0262) dev sanayi illeridir; Yalova (0226) küçük kıyı ili ve 77xxx posta kodudur'],
    ['78', 'Karabük', 'Karabük', 'karadeniz', '0370', 'tr-tedas-pole', 'D-755 / D-030', 'Kardemir demir-çelik vadisi, Yenice sık orman kanyonu ve Safranbolu beyaz cumbalı Osmanlı konakları', 'Kastamonu (0366) doğuda geniş platodur; Karabük (0370) Safranbolu mimarisi ve 78xxx koduyla ayrılır'],
    ['79', 'Kilis', 'Kilis', 'guneydogu', '0348', 'tr-mardin-stone', 'D-850 / D-410', 'Suriye sınırında kırmızı topraklı yoğun zeytinlik ve üzüm bağları, sarı kesme taş evler ve 0348 kodu', 'Gaziantep (0342) kuzeyde büyük sanayi kentidir; Kilis (0348) küçük sınır ili ve yoğun zeytin dokusudur'],
    ['80', 'Osmaniye', 'Osmaniye', 'akdeniz', '0328', 'tr-d-highway', 'D-400 / O-52', 'Doğu Çukurova yerfıstığı/mısır ovası ile Amanos Dağları batı etekleri ve 0328 alan kodu', 'Adana (0322) batıda açık ovadır; Osmaniye (0328) Amanos dağ duvarının başladığı doğu cephedir'],
    ['81', 'Düzce', 'Düzce', 'karadeniz', '0380', 'tr-tedas-pole', 'D-100 / D-655', 'Bolu Dağı batısında nemli yeşil Düzce Ovası, fındık bahçeleri, Akçakoca kıyısı ve 0380 alan kodu', 'Bolu (0374) yüksek çam yaylasıdır; Düzce (0380) alçak ova, fındık örtüsü ve 81xxx posta koduyla ayrılır']
  ];

  var UNITS = RAW.map(function (r) {
    return {
      id: r[0],
      name: r[1],
      vn: r[1],
      cap: r[2],
      reg: r[3],
      code: r[4] + ' · ' + r[0] + 'xxx',
      traitId: r[5],
      traitTitle: r[6],
      cue: 'Nereye bakılır: Dükkan, eczane ve emlak tabelalarında ' + r[4] + ' sabit alan kodunu; PTT/kargo şubelerinde ' + r[0] + 'xxx posta kodunu ve ' + r[6] + ' karayolu levhasını arayın. ' + r[7] + '.',
      trap: r[8] + '.'
    };
  });

  var TOPICS = [
    {
      id: 'alan', label: 'Alan ve Posta', icon: 'phone',
      desc: '02xx / 03xx / 04xx sabit alan kodları ve 01–81 posta önekleri',
      title: 'Türkiye Sabit Telefon Alan Kodları (02xx–04xx) ve 01–81 Posta Önekleri',
      lead: 'Türkiye’de plaka blurlu olsa bile her esnaf tabelasında, emlak afişinde, belediye ve kargo panosunda 4 haneli sabit telefon alan kodu (02xx, 03xx, 04xx) ile 5 haneli posta kodunun ilk iki rakamı (01xxx–81xxx il kodu) açıkça yazar.',
      drill: 'codes',
      showCodeGroupTable: true,
      cards: [
        {
          badge: '02xx Kuşağı', title: 'Batı Türkiye: Marmara, Ege ve Batı Akdeniz',
          body: 'Nereye bakılır: Cadde üstü esnaf, doktor, avukat ve kiralık/satılık afişlerindeki 02xx sabit numaralara bakın. 0212 (İstanbul Avrupa) ve 0216 (İstanbul Anadolu) yalnız İstanbul’a aittir. 022x Güney Marmara ve Eskişehir (Bursa 0224, Eskişehir 0222, Çanakkale 0286); 0232/0236 İzmir-Manisa; 024x Batı Akdeniz (Antalya 0242, Isparta 0246, Burdur 0248); 025x Güney Ege (Muğla 0252, Aydın 0256, Denizli 0258); 026x Doğu Marmara ve Balıkesir (Kocaeli 0262, Sakarya 0264, Balıkesir 0266); 027x İç Ege (Afyon 0272, Kütahya 0274, Uşak 0276); 028x Trakya ve Çanakkale (Tekirdağ 0282, Edirne 0284, Kırklareli 0288) kuşağını gösterir.'
        },
        {
          badge: '03xx Kuşağı', title: 'Merkez Türkiye: İç Anadolu, Batı/Orta Karadeniz ve Çukurova',
          body: 'Nereye bakılır: Belediye, tarım kredi ve dükkan tabelalarındaki 03xx kodlarına bakın. 0312 Ankara (0318 Kırıkkale); 032x Doğu Akdeniz / Çukurova (Adana 0322, Mersin 0324, Hatay 0326, Osmaniye 0328); 0332 Konya (0338 Karaman); 034x Gaziantep (0342), Kahramanmaraş (0344), Sivas (0346), Kilis (0348); 035x Kayseri (0352), Yozgat (0354), Tokat (0356), Amasya (0358); 036x Orta Karadeniz (Samsun 0362, Çorum 0364, Kastamonu 0366, Sinop 0368); 037x Batı Karadeniz (Zonguldak 0372, Bolu 0374, Çankırı 0376, Bartın 0378, Karabük 0370); 038x Kapadokya ve Düzce (Düzce 0380, Aksaray 0382, Nevşehir 0384, Kırşehir 0386, Niğde 0388) illerini verir.'
        },
        {
          badge: '04xx Kuşağı', title: 'Doğu Türkiye: Doğu Karadeniz, Doğu ve Güneydoğu Anadolu',
          body: 'Nereye bakılır: 04xx ile başlayan her sabit numara sizi Sivas-Gaziantep hattının doğusuna taşır. 041x Fırat ve Diyarbakır havzası (Diyarbakır 0412, Şanlıurfa 0414, Adıyaman 0416); 042x Yukarı Fırat (Malatya 0422, Elazığ 0424, Bingöl 0426, Tunceli 0428); 043x Van Gölü ve Hakkâri havzası (Van 0432, Bitlis 0434, Muş 0436, Hakkâri 0438); 044x Erzurum (0442) ve Erzincan (0446); 045x–046x Doğu Karadeniz (Ordu 0452, Giresun 0454, Gümüşhane 0456, Bayburt 0458, Trabzon 0462, Rize 0464, Artvin 0466); 047x Kuzeydoğu sınır hattı (Ağrı 0472, Kars 0474, Iğdır 0476, Ardahan 0478); 048x Dicle havzası (Mardin 0482, Siirt 0484, Şırnak 0486, Batman 0488) illerine aittir.'
        },
        {
          badge: '01xxx–81xxx', title: 'Posta Kodu İlk İki Hanesi = Doğrudan İl Kodu',
          body: 'Nereye bakılır: PTT şubeleri, kargo acenteleri, kurumsal mağaza adres bantları, okul/sağlık ocağı tabelaları ve kırmızı sokak/mahalle plakalarındaki 5 haneli posta koduna bakın. İlk iki rakam doğrudan 01 (Adana) ile 81 (Düzce) arasındaki resmi il kodudur: örneğin 06xxx Ankara, 16xxx Bursa, 34xxx İstanbul, 35xxx İzmir, 07xxx Antalya, 42xxx Konya, 61xxx Trabzon.'
        }
      ]
    },
    {
      id: 'saha', label: 'Saha ve Direk', icon: 'bulb',
      desc: 'TEDAŞ direkleri, D-yolu ızgarası, çay yamaçları ve taş mimari',
      title: 'Türkiye Saha İpuçları: Direk, Karayolu ve Bölgesel Doku',
      lead: 'Türkiye’yi önce çevre ülkelerden (Yunanistan, Bulgaristan, Gürcistan), ardından kendi içinde 7 coğrafi bölgeye ayıran dört temel görsel örüntü vardır.',
      drill: 'visual',
      visuals: [
        {
          id: 'tr-tedas-pole', title: 'TEDAŞ Delikli Beton Direk', sub: 'Tüm Türkiye · Kırsal ve Kentsel Dağıtım',
          badge: 'TEDAŞ / EDAŞ Direği',
          body: 'Nereye bakılır: Yol ve sokak kenarındaki elektrik direklerine bakın. Türkiye’de gövdesi boydan boya dikdörtgen/yamuk boşluklu gri beton direkler ile göz hizasında sarı-siyah metal trafo/direk numara plakaları standarttır.',
          regions: ['14', '19', '37', '43', '58', '66']
        },
        {
          id: 'tr-d-highway', title: 'Mavi D-Yolu Levhası ve Yol Babası', sub: 'Ana Devlet Yolları (D-010..D-975)',
          badge: 'D-Yolu Izgarası',
          body: 'Nereye bakılır: Kavşaklardaki mavi dikdörtgen D-xxx levhalarına bakın. D-010 (Karadeniz), D-100 (Edirne-Gürbulak), D-200 (Çanakkale-Erzurum), D-300 (İzmir-Van) ve D-400 (Datça-Hakkâri) kuzeyden güneye inen 5 batı-doğu aksıdır; D-550’den D-975’e kadar olan numaralar ise batıdan doğuya doğru sıralanan kuzey-güney yollarıdır.',
          regions: ['01', '06', '07', '16', '34', '35', '42']
        },
        {
          id: 'tr-karadeniz-tea', title: 'Doğu Karadeniz Çay ve Fındık Yamaçları', sub: 'Rize (0464), Trabzon (0462), Artvin (0466), Ordu-Giresun',
          badge: 'Doğu Karadeniz',
          body: 'Nereye bakılır: Yamaçlardaki bitki örtüsüne ve ev tiplerine bakın. Koyu yeşil budanmış çay tarlaları, teleferik telleri (ilkel yük hattı) ve dik yamaçlara serpiştirilmiş dış cephesi sıvasız kırmızı tuğla/beton evler doğrudan Doğu Karadeniz kıyı kuşağını verir.',
          regions: ['08', '28', '52', '53', '61']
        },
        {
          id: 'tr-mardin-stone', title: 'Güneydoğu ve Kapadokya Sarı Kesme Taş Mimari', sub: 'Mardin (0482), Şanlıurfa (0414), Nevşehir (0384), Kayseri (0352)',
          badge: 'Kesme Taş & Bozkır',
          body: 'Nereye bakılır: Bina cephe taşlarına ve ufuk çizgisine bakın. Sarı kalker taş işçiliği, düz damlar ve kızıl-kahve düz ovalar Güneydoğu Anadolu’yu (Mardin, Urfa, Gaziantep); açık sarı/beyaz tüf kayaları ve peribacaları ise Kapadokya’yı (Nevşehir, Aksaray, Kayseri) işaret eder.',
          regions: ['21', '27', '38', '47', '50', '63']
        }
      ],
      cards: [
        {
          badge: 'D-010..D-400', title: 'Batı-Doğu Devlet Yolları: Kuzeyden Güneye 5 Katman',
          body: 'Nereye bakılır: Mavi D-xxx tabelasının ilk rakamına bakın. İlk üç rakamı çift yüzlük/onluk olan ana arterler kuzeyden güneye sırayla dizilir: D-010 Karadeniz sahili, D-100 Marmara-Karadeniz iç-Doğu Anadolu hattı, D-200 Güney Marmara-Eskişehir-Ankara-Sivas-Erzincan hattı, D-300 İzmir-Afyon-Konya-Kayseri-Malatya-Elazığ-Van hattı, D-400 ise Muğla-Antalya-Mersin-Adana-Gaziantep-Şanlıurfa-Mardin-Hakkâri güney hattıdır.'
        },
        {
          badge: 'D-550..D-975', title: 'Kuzey-Güney Devlet Yolları: Batıdan Doğuya Artan Numaralar',
          body: 'Nereye bakılır: D-5xx ile D-9xx arasındaki yollar kuzey-güney doğrultuludur ve batıdan doğuya doğru büyür: D-550 Edirne-Çanakkale-İzmir-Muğla (en batı), D-650 Sakarya-Kütahya-Afyon-Burdur-Antalya, D-750 Zonguldak-Ankara-Aksaray-Tarsus, D-850 Ünye-Tokat-Sivas-Malatya-Gaziantep-Kilis, D-950 Artvin-Erzurum-Bingöl-Diyarbakır-Mardin, D-975 Igdır-Van-Hakkâri (en doğu).'
        }
      ]
    },
    {
      id: 'bolge', label: '7 Bölge', icon: 'layers',
      desc: '7 coğrafi bölgenin iklim, bitki örtüsü ve mimari ayrımı',
      title: 'Türkiye’nin 7 Coğrafi Bölgesi: Biyom ve Yerleşim Dokusu',
      lead: 'Tabela görülmediğinde bile bitki örtüsü, toprak rengi, çatı eğimi ve dağ uzanışı Türkiye’de doğru coğrafi bölgeyi saniyeler içinde verir.',
      drill: 'groups',
      showRegionGrid: true,
      cards: [
        {
          badge: 'Kıyı Kuşakları', title: 'Karadeniz vs Akdeniz vs Ege Ayrımı',
          body: 'Nereye bakılır: Ağaç türüne ve dağ-deniz mesafesine bakın. Karadeniz’de dağlar denize çok dik iner, nemli geniş yapraklı orman, fındık ve çay vardır, yazın bile bulutludur. Akdeniz ve Ege’de kızılçam, zeytin, zakkum, maki, beyaz/krem sıvalı güneş enerjili (günısı) düz veya kiremit çatılar ve plastik seralar hakimdir.'
        },
        {
          badge: 'İç ve Doğu', title: 'İç Anadolu vs Doğu Anadolu vs Güneydoğu Anadolu',
          body: 'Nereye bakılır: Rakıma, çatı tipine ve taş rengine bakın. İç Anadolu düz/hafif dalgalı sarı buğday bozkırı ve kiremit çatılı köylerden oluşur. Doğu Anadolu çok daha yüksek, dağlık, volkanik bazalt taşlı ve kışın kar tutmayan parlak galvaniz/çinko sac çatılıdır. Güneydoğu Anadolu ise alçak kızıl topraklı düzlükler, fıstık bahçeleri ve sıcak iklim tipi düz damlı sarı kalker evlerle ayrılır.'
        }
      ]
    }
  ];

  g.CountryEngine.register({
    id: 'turkiye',
    name: 'Türkiye',
    short: 'Türkiye',
    code: 'TR',
    area: 'Avrupa ve Avrasya',
    tone: 'red',
    unitLabel: 'il',
    groupLabel: 'coğrafi bölge',
    codeLabel: 'alan ve posta kodu',
    line: '81 il: 02xx–04xx alan kodları, 01–81 posta önekleri ve D-yolu ızgarası',
    blurb: 'Tabelalardaki 02xx/03xx/04xx sabit alan kodları, 01xxx–81xxx posta önekleri ve D-010..D-975 karayolu ızgarasıyla 81 ili nokta atışı bulma rehberi.',
    overviewLead: 'Türkiye’de esnaf tabelalarındaki 02xx/03xx/04xx sabit telefon alan kodları, adres satırındaki 01xxx–81xxx posta önekleri ve mavi D-xxx karayolu numaraları 81 ili doğrudan ele verir.',
    quickTips: [
      'Sabit telefon alan kodları batıdan doğuya büyür: 02xx Batı (Marmara, Ege, Antalya), 03xx Merkez (İç Anadolu, Batı/Orta Karadeniz, Çukurova), 04xx Doğu (Doğu Karadeniz, Doğu ve Güneydoğu Anadolu).',
      '5 haneli posta kodunun ilk iki rakamı (01xxx Adana .. 81xxx Düzce) doğrudan ilin resmi plaka/il sırasıdır.',
      'Mavi D-yollarında D-010..D-400 kuzeyden güneye inen batı-doğu akslarını; D-550..D-975 batıdan doğuya dizilen kuzey-güney akslarını gösterir.'
    ],
    plan: [
      { title: '7 Coğrafi Bölge ve Alan Kodu Kuşakları', text: 'Önce 02xx (Batı), 03xx (Merkez) ve 04xx (Doğu) telefon kuşakları ile 7 bölgeyi incele.', to: 'alan' },
      { title: 'D-Yolu Izgarası ve Saha İpuçları', text: 'D-010..D-975 karayolu mantığını, TEDAŞ direklerini ve çay/taş/sera biyomlarını öğren.', to: 'saha' },
      { title: 'Haritada 81 İli Keşfet', text: 'Harita üzerinde 81 ilin alan kodunu, posta önekini ve komşu ayrımlarını gez.', to: 'kesfet' },
      { title: 'Alan Kodu ve Harita Pratiği', text: 'Alan/posta kodundan il bulma ve harita üzerinde işaretleme alıştırması yap.', to: 'pratik', launch: { preset: 'codes' } },
      { title: 'Tam Saha Simülasyonu', text: 'Maskelenmiş tabela, alan kodu ve yol ipuçlarıyla 5 turluk simülasyonu tamamla.', to: 'simulasyon' }
    ],
    geoName: 'TR_GEO',
    themeCfg: {
      aria: 'Türkiye 81 il haritası',
      fit: 'Tüm Türkiye’yi göster',
      grid: { lat: [35, 43, 2], lon: [25, 46, 3], txt: [36, 42, 2], refLon: 35, refLat: 39 },
      excludeWorld: ['Turkey', 'Greece', 'Bulgaria', 'Georgia', 'Syria', 'Iraq', 'Iran', 'Armenia'],
      bg: [
        [34.0, 43.0, 'Karadeniz', 's'],
        [25.2, 38.8, 'Ege Denizi', 's'],
        [31.5, 35.4, 'Akdeniz', 's'],
        [23.2, 41.2, 'YUNANİSTAN', 'c'],
        [25.5, 42.3, 'BULGARİSTAN', 'c'],
        [43.5, 42.1, 'GÜRCİSTAN', 'c'],
        [38.5, 35.8, 'SURİYE', 'c'],
        [43.2, 36.6, 'IRAK', 'c'],
        [45.4, 38.2, 'İRAN', 'c']
      ]
    },
    groups: GROUPS,
    units: UNITS,
    topics: TOPICS,
    practiceCats: [
      { id: 'codes', label: 'Alan / Posta Kodu', icon: 'phone', desc: '02xx–04xx alan kodu ve 01–81 posta önekinden ili bul', kinds: ['code_to_unit', 'unit_to_code'] },
      { id: 'map', label: 'Haritada İl Bul', icon: 'pin', desc: 'Adı veya kodu verilen ili harita üzerinde işaretle', kinds: ['name_to_map', 'code_to_map'] },
      { id: 'groups', label: '7 Coğrafi Bölge', icon: 'layers', desc: 'İlin hangi coğrafi bölgede yer aldığını seç', kinds: ['unit_to_group'] },
      { id: 'visual', label: 'Saha ve Yol İpucu', icon: 'bulb', desc: 'Görsel ipucundan bölgeyi veya ili tanı', kinds: ['visual_to_group'] }
    ],
    makeSimClue: function (u, helpers) {
      var gObj = helpers.groupById[u.reg];
      return h('div', { 'class': 'sim-clue' },
        h('div', { 'class': 'sim-clue-row' },
          h('span', { 'class': 'sim-k' }, 'Tabela Alan / Posta Kodu'),
          h('span', { 'class': 'area' }, u.code)),
        h('div', { 'class': 'sim-clue-row' },
          h('span', { 'class': 'sim-k' }, 'Ana Karayolu Aksı'),
          h('b', {}, helpers.maskText(u.traitTitle, u))),
        h('p', { 'class': 'sim-cue' }, helpers.maskText(u.cue, u)),
        gObj ? h('p', { 'class': 'sim-trap micro' }, 'Bölge kuşağı ipucu: ' + gObj.codeRange) : null
      );
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);

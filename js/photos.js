/* photos.js — FOTOĞRAF KAYIT DEFTERİ (tek doğru kaynak).
   Her fotoğraf Wikimedia Commons'tan gelir; uygulama dosyayı Special:FilePath ile çağırır (çevrimiçi),
   yazar ve lisans satırı her fotoğrafın altında görünür. Kurallar: KURALLAR.md > "Fotoğraflar".
   Şema:  PHOTOS[anahtar] = { f:'Commons dosya adı.jpg', by:'yazar', lic:'CC BY-SA 4.0', cap:'Türkçe: ne / nerede', v:'doğrulama' }
          v = 'goz' (fotoğraf gözle görüldü ve alt yazıdaki her iddia fotoğrafta doğrulandı)
              · 'aciklama' (yalnızca Commons dosya açıklamasıyla doğrulandı, görüntü görülmedi)
              · 'bekliyor' (doğrulanmadı: yayında gösterilmez)
   İsteğe bağlı görünüm alanları (view() ile eklenir, kit.js çizer):
          d    = [genişlik, yükseklik] özgün piksel boyutu (kırpma ve işaret için ZORUNLU; verify-photos.mjs Commons ile karşılaştırır)
          crop = [x, y, w, h] kırpma, özgün görüntünün 0–1 oranları (levhayı büyütüp yazıyı okunur yapar)
          marks= [[x, y, w, h, 'Türkçe açıklama'], …] 0–1 oranları, TÜM özgün görüntüye göre; sarı kutu + numara, açıklamalar fotoğrafın altında listelenir
   Kümeler: PHOTO_SETS[kümeId] = [anahtar, …]; paketlerdeki `visuals` kartları kümeyi adıyla çağırır.
   ÖNEMLİ: Bir kümedeki tüm fotoğraflar AYNI yeri (aynı birim kimliklerini) göstermelidir; Pratik ve Simülasyon fotoğraf sorusu
   kümeyi cevap anahtarı olarak kullanır. Alt yazı ve kartın "badge" alanı YALNIZCA fotoğrafta gerçekten okunan harf/kodu söyler.
   Yazar ve lisans: Commons dosya sayfasındaki değerler (API: extmetadata Artist / LicenseShortName) aynen yazılır.
   Yazarı ya da lisansı okunamayan dosya yayına girmez (by/lic boş bırakılırsa LIC_SAYFA yedeği görünür, bu bir eksiktir). */
(function (g) {
  'use strict';
  var LIC_SAYFA = 'Serbest lisans (ayrıntı kaynak sayfasında)';
  var P = g.PHOTOS = g.PHOTOS || {};
  var S = g.PHOTO_SETS = g.PHOTO_SETS || {};
  /* add(anahtar, dosya, yazar, lisans, altYazı, doğrulama='goz') */
  function add(k, f, by, lic, cap, v) {
    P[k] = { f: f, by: by || 'Wikimedia Commons katkıcısı', lic: lic || LIC_SAYFA, cap: cap, v: v || 'goz' };
  }

  /* ---- Endonezya: yerel yazılı tabelalar ve geleneksel yapılar (hepsi gözle doğrulandı) ---- */
  /* Java yazısı: Yogyakarta ve Surakarta */
  add('id-jawa-1', 'Yogyakarta Indonesia Jalan-Abu-Bakar-Ali-01.jpg', 'CEphoto, Uwe Aranas', 'CC BY-SA 3.0',
    'Yogyakarta: «Jl. Abu Bakar Ali» sokak levhası. Latin adın altında Java yazısıyla yazılmış ikinci bir satır var.');
  add('id-jawa-2', 'Javanesiska i yogya.jpg', 'Rotsee2', 'CC BY 3.0',
    'Yogyakarta: «Jl. Siliran Lor» levhası, altında Java yazısı satırı.');
  add('id-jawa-3', 'Jalan Slamet Riyadi (Road sign in Surakarta).jpg', 'Meursault2004', 'CC BY-SA 3.0',
    'Surakarta (Solo): «Jl. Brigjend. Slamet Riyadi» levhası, altında Java yazısı satırı.');
  S['id-jawa'] = ['id-jawa-1', 'id-jawa-2', 'id-jawa-3'];

  /* Sunda yazısı: Bandung ve Bogor */
  add('id-sunda-1', 'Jl Braga Street Sign in Bandung.jpg', 'J-lorentz', 'CC BY-SA 4.0',
    'Bandung: «Jl. Braga» levhası. Latin adın altında küçük bir Sunda yazısı satırı var.');
  add('id-sunda-2', 'Street name sign in Bogor uses Roman and Sundanese script.jpg', 'RXerself', 'CC BY-SA 3.0',
    'Bogor: «Jl. Saleh Danasasmita» levhası, altında Sunda yazısı satırı.');
  S['id-sunda'] = ['id-sunda-1', 'id-sunda-2'];

  /* Bali yazısı ve tapınak kapısı */
  add('id-bali-1', 'Sign of Klungkung Regent\'s Office.JPG', 'Alteaven', 'CC BY-SA 3.0',
    'Klungkung (Bali): ilçe başkanlığı tabelası. Latin satırların altında üç ayrı Bali yazısı satırı var.');
  add('id-bali-2', 'A school code in Bali.jpg', 'Mx. Granger', 'CC0',
    'Bali: okul tabelası. Bali yazısı satırı, altındaki Latin «NPSN» kodunun ÜSTÜNDE duruyor.');
  S['id-bali'] = ['id-bali-1', 'id-bali-2'];
  add('id-pura-1', 'Balinese Traditional Temple 1454.jpg', 'Michael Gunther', 'CC BY-SA 4.0',
    'Bali: tapınak girişi. Ortadan ikiye bölünmüş, süslü taş kule çifti (candi bentar); iki yanında heykeller ve şemsiyeler.');
  S['id-pura'] = ['id-pura-1'];

  /* Lontara: Güney Sulawesi */
  add('id-lontara-1', 'Lontara-Makassar.JPG', 'Lord Mountbatten', 'CC BY-SA 4.0',
    'Makassar: kamu kurumu tabelası. Latin başlığın altında Lontara yazısı satırı var.');
  S['id-lontara'] = ['id-lontara-1'];

  /* Minangkabau evi: Batı Sumatra */
  add('id-gadang-1', 'Rumah Gadang.jpg', 'MichaelJLowe', 'CC BY-SA 2.5',
    'Batı Sumatra: Minangkabau evi (rumah gadang). Çatının uçları boynuz gibi yukarı sivrilir (gonjong).');
  add('id-gadang-2', 'Komplek Rumah Gadang Balimbiang Di Minangkabau.jpg', 'Deni Dahniel', 'CC BY-SA 4.0',
    'Minangkabau bölgesi (Balimbiang): yan yana rumah gadang evleri; hepsinde boynuz biçimli çatı uçları görünür.');
  S['id-gadang'] = ['id-gadang-1', 'id-gadang-2'];

  /* Toba Batak evi: Kuzey Sumatra */
  add('id-bolon-1', 'Rumah Bolon (Batak Traditional House).jpg', 'Roberto Marpaung', 'CC BY-SA 4.0',
    'Kuzey Sumatra: Toba Batak evi (rumah bolon). Kazıklar üzerinde yükselir; çatı eyer gibi ortası çökük, iki ucu yukarı kalkıktır.');
  add('id-bolon-2', 'Ruma Bolon, traditional Batak Toba house (2).jpg', 'Sam Hidayat', 'CC BY-SA 4.0',
    'Toba Batak evi: öne çıkan üçgen alınlık ve onu örten dev çatı.');
  S['id-bolon'] = ['id-bolon-1', 'id-bolon-2'];

  /* Tongkonan: Toraja, Güney Sulawesi */
  add('id-tongkonan-1', 'Tongkonan Toraja.jpg', 'Idris prasetiawan', 'CC BY-SA 4.0',
    'Toraja (Güney Sulawesi): tongkonan evleri. Tekne biçimli çatılar iki uçta yukarı kalkar.');
  add('id-tongkonan-2', 'Tongkonan, Toraja houses.jpg', 'RianHS', 'CC BY-SA 4.0',
    'Toraja: iki yanda sıralanmış tongkonan evleri; hepsinin çatısı tekne biçimli.');
  S['id-tongkonan'] = ['id-tongkonan-1', 'id-tongkonan-2'];

  /* Endonezya bölgesel görünüm: Papua, Kalimantan, Sulawesi, Sumatra, Nusa Tenggara, Bali (hepsi gözle doğrulandı) */
  add('id-honai-1', 'Honai.jpg', 'Irsam24', 'CC BY-SA 4.0',
    'Honai: Papua dağ bölgesinin yuvarlak planlı, saz kubbe çatılı evi. Önünde çit ve arkada dağlar var.');
  add('id-honai-2', 'Honai House Papua.jpg', 'Irfantraveller', 'CC BY-SA 4.0',
    'Papua dağ köyünde sıralı honai evleri: duvarlar tahta, çatılar kalın saz. Fotoğraf Yali halkının yaşadığı Papua yaylalarından.');
  add('id-honai-3', 'Vallée de Baliem en Papouasie (Indonésie) Village le matin.JPG', 'Philomène Martinelli Globe-Trotting.com', 'CC BY-SA 4.0',
    'Baliem Vadisi (Papua): kubbe biçimli saz çatılı honai evleri, arkada yamaçlar.');
  add('id-betang-1', 'Rumah Betang Manggatang Utus Sei Pasah.jpg', 'Martini Rahman', 'CC BY-SA 4.0',
    'Betang: Dayak uzun evi. Bu örnek Sei Pasah (Kapuas, Orta Kalimantan) köyünde; kazıklar üstünde, tek uzun çatı altında, önünde merdivenli giriş.');
  add('id-betang-2', 'Rumah Betang di Tumbang Gagu.jpg', 'Hellandac', 'CC BY-SA 4.0',
    'Orta Kalimantan\'da Dayak betang evi: uzun, kazıklar üzerinde yükseltilmiş yapı.');
  add('id-banjar-1', 'Rumah Adat Banjar Bubungan Tinggi di Martapura.jpg', 'Khafi Muzakkir', 'CC BY-SA 4.0',
    'Banjar evi (bubungan tinggi), Martapura, Güney Kalimantan: ahşap, geniş eğimli çatı ve ortasında yükselen dik çatı bölümü. Ev 1875\'te yapılmış.');
  add('id-banjar-2', 'Rumah Banjar Bubungan Tinggi Habirau.jpg', 'Tim WikiBanua 2.0', 'CC BY-SA 4.0',
    'Habirau, Hulu Sungai Selatan (Güney Kalimantan): ahşap Banjar evi, ortada yükselen sivri çatı.');
  add('id-bugis-1', 'Rumah tradisional Bugis-Makassar.JPG', 'Midori', 'CC BY 3.0',
    'Bulukumba (Güney Sulawesi): Bugis-Makassar evi. Kazıklar üstünde yükselmiş ahşap ev; ön cephede üst üste katlı üçgen alınlık.');
  add('id-sawit-1', 'Oil palm plantation in Indonesia.jpg', 'Rasyid Ridha', 'CC BY-SA 4.0',
    'Yağ palmiyesi plantasyonu: yol kenarında yan yana palmiyeler, arkada dağ.');
  add('id-sawit-2', 'Oil Palm plantation in Rupit, North Musi Rawas, South Sumatra.jpg', 'Firzafp', 'CC BY-SA 4.0',
    'Rupit (Kuzey Musi Rawas, Güney Sumatra): Trans-Sumatra yolu kenarındaki yağ palmiyesi plantasyonu.');
  add('id-savan-1', 'Savana at the foot of Mount Tambora.jpg', 'Budi Wasisto', 'CC BY-SA 4.0',
    'Tambora Dağı eteğinde (Dompu, Sumbawa) savan: yeşil otlak, dağınık ağaç ve çalı, sığırlar.');
  add('id-savan-2', 'Savana, kempo, dompu regency, west nusa tenggara.jpg', 'Reza al fachrusi', 'CC BY-SA 4.0',
    'Kempo (Dompu, Sumbawa): düz otlak, seyrek ağaçlar ve 1815 Tambora patlamasından kalma kara taşlar.');
  add('id-teras-1', 'Tegalalang Rice Terraces.jpg', 'Freddy eduardo', 'CC BY-SA 4.0',
    'Tegalalang (Ubud, Bali): su dolu pirinç terasları, hindistan cevizi palmiyeleri.');
  S['id-honai'] = ['id-honai-1', 'id-honai-2', 'id-honai-3'];
  S['id-betang'] = ['id-betang-1', 'id-betang-2'];
  S['id-banjar'] = ['id-banjar-1', 'id-banjar-2'];
  S['id-bugis'] = ['id-bugis-1'];
  S['id-sawit'] = ['id-sawit-1', 'id-sawit-2'];
  S['id-savan'] = ['id-savan-1', 'id-savan-2'];
  S['id-teras'] = ['id-teras-1'];

  /* ---- Türkiye: belediye ve ilçe adı (sokak levhası + rögar kapağı); hepsi gözle doğrulandı ---- */
  add('tr-sign-ist', 'Ahmet Refik St., Kadıköy.jpg', 'Adem', 'CC BY 4.0',
    'İstanbul, Kadıköy: «Ahmet Refik Sokağı» levhası. Kırmızı levhanın altında turkuaz bir şerit var; şeritte ilçe adı (KADIKÖY), üstündeki ince satırda mahalle adı (GÖZTEPE MAHALLESİ) yazıyor.');
  add('tr-iski', 'Manhole Cover in Istanbul 21.11.2025.jpg', 'Wiki leylek', 'CC BY 4.0',
    'İstanbul: kanalizasyon kapağı. Ortada İSKİ logosu ve yazısı, kenar halkasında «KANALİZASYON» yazıyor.');
  add('tr-ibb', 'A manhole cover 22.09 24 in Istanbul 04.jpg', 'Anastasiya Lvova', 'CC BY-SA 4.0',
    'İstanbul: beton kapak. Ortada İBB (İstanbul Büyükşehir Belediyesi) logosu, altında «İBB F/O» yazısı.');
  add('tr-kadikoy', 'A manhole cover 22.09 24 in Istanbul 08.jpg', 'Anastasiya Lvova', 'CC BY-SA 4.0',
    'İstanbul, Kadıköy: kapağın ortasında «KADIKÖY BELEDİYESİ» yazıyor. Bu, büyükşehir değil ilçe belediyesinin kapağıdır.');
  S['tr-istanbul'] = ['tr-sign-ist', 'tr-iski', 'tr-ibb', 'tr-kadikoy'];

  add('tr-sign-ank', '"109. Sokak" tabelası, Göksu, Ankara.jpg', 'Kayra', 'CC BY 4.0',
    'Ankara, Etimesgut (Göksu): «109. Sokak» levhası. Koyu kırmızı levhanın siyah alt şeridinde mahalle ve ilçe adı yazıyor: «GÖKSU MAHALLESİ - ETİMESGUT».');
  S['tr-ankara'] = ['tr-sign-ank'];

  add('tr-sign-izm', 'Açelya Sokağı.jpg', 'Satirdan kahraman', 'CC BY-SA 4.0',
    'İzmir: «Açelya Sokağı» levhası. Lacivert levhanın üstünde İzmir Büyükşehir Belediyesi logosu, altında mahalle adı (HUZUR MAHALLESİ) yazıyor.');
  add('tr-izmirbb', 'İBB Kanal kapağı.jpg', 'Satirdan kahraman', 'CC BY-SA 4.0',
    'İzmir: kanal kapağının ortasında yana yatık yazı var: «İZMİR BÜYÜKŞEHİR BLD. KANAL KAPAĞI».');
  S['tr-izmir'] = ['tr-sign-izm', 'tr-izmirbb'];

  add('tr-sign-brs', 'Fışkırık caddesi bursa ahsap evleri - panoramio (4).jpg', 'Mustafa DUMAN', 'CC BY 3.0',
    'Bursa: «Fışkırık Caddesi» levhası. Yeşil levha, beyaz çerçeve ve beyaz harfler.');
  S['tr-bursa'] = ['tr-sign-brs'];

  add('tr-konya', 'Koski kanalizasyon kapağı 2.jpg', 'Satirdan kahraman', 'CC BY-SA 4.0',
    'Konya: kapağın ortadaki halkasında «KOSKİ GENEL MÜDÜRLÜĞÜ» ve «KANALİZASYON» yazıyor; ortada KOSKİ logosu var.');
  S['tr-konya'] = ['tr-konya'];

  add('tr-sakarya', 'SASKİ Rögar Kapakları 01.jpg', 'Satirdan kahraman', 'CC BY-SA 4.0',
    'Sakarya (Adapazarı): kapağın ortasında SASKİ logosu ve yazısı var. Sol tutamaçta «PAYZA KAYSERİ» yazıyor: bu dökümcü firmanın adıdır, kapağın bulunduğu yer değil.');
  S['tr-sakarya'] = ['tr-sakarya'];

  add('tr-kocaeli', 'Manhole Cover in Izmit, Kocaeli 26.07.2025 01.jpg', 'Wiki leylek', 'CC BY 4.0',
    'Kocaeli (İzmit): ızgaralı kapağın ortasında «İSU İÇMESUYU» yazıyor; İSU, Kocaeli’nin su idaresidir.');
  S['tr-kocaeli'] = ['tr-kocaeli'];

  add('tr-canakkale', 'Manhole Cover in Çanakkale 05.06.2025 01.jpg', 'Wiki leylek', 'CC BY 4.0',
    'Çanakkale: kapağın ortasındaki üçgen işaretin altında «ÇANAKKALE BELEDİYESİ», kenarda «KANALİZASYON» yazıyor.');
  S['tr-canakkale'] = ['tr-canakkale'];

  /* ---- Türkiye: bölgesel görünümler (peyzaj ve yapı; hepsi görselle kontrol edildi) ---- */
  add('tr-cay-1', '53270 Buzlupınar-Çayeli-Rize, Turkey - panoramio.jpg', 'Koliva', 'CC BY 3.0',
    'Rize (Çayeli): kısa budanmış, yuvarlak çay çalıları ev bahçesinin hemen yanında yamaca yayılıyor.');
  add('tr-cay-2', 'Aşıklar, Çayeli Günelitepe mevkii.jpg', 'Edmund Cambrai', 'CC BY-SA 4.0',
    'Rize (Çayeli, Aşıklar): yamaçlar çay bahçesiyle kaplı, arkada koyu yeşil ormanlı sırtlar var; evler bahçelerin arasında.');
  add('tr-cay-3', 'TeaFields@Espiye-Giresun-Turkey.JPG', 'Dr. Zeynel Cebeci', 'CC BY-SA 3.0',
    'Giresun (Espiye): ağaçların arasında düz teraslı bir çay bahçesi.');
  S['tr-cay'] = ['tr-cay-1', 'tr-cay-2', 'tr-cay-3'];

  add('tr-findik-1', 'Hazelnut orchard, Giresun 01.jpg', 'Zeynel Cebeci', 'CC BY-SA 4.0',
    'Giresun (Espiye): dik yamaçta sık ve alçak fındık çalıları, aralarında toprak yol.');
  add('tr-findik-2', 'Bahçecik, Espiye 2018-08-18 1.jpg', 'Zeynel Cebeci', 'CC BY-SA 4.0',
    'Giresun (Espiye, Bahçecik): fındık bahçeleri tepeleri kaplıyor, köy evleri bahçelerin arasına dağılmış.');
  S['tr-findik'] = ['tr-findik-1', 'tr-findik-2'];

  add('tr-serander-1', 'Serender Arhavi.jpg', 'Onerhoca', 'CC BY 4.0',
    'Artvin (Arhavi): serender, yani direkler üstüne kurulmuş ahşap tahıl ambarı; çatısı oluklu saç.');
  add('tr-serander-2', 'Serander.jpg', 'Macukali', 'CC BY 2.5',
    'Trabzon (Sürmene): serender; altı açık direkler, üstünde balkonlu ahşap kutu.');
  add('tr-serander-3', 'Serender in Ünye.jpg', 'E4024', 'CC BY-SA 3.0',
    'Ordu (Ünye): kırdan şehre getirilmiş bir serender; ahşap ambar yine direkler üstünde duruyor.');
  S['tr-serander'] = ['tr-serander-1', 'tr-serander-2', 'tr-serander-3'];

  add('tr-orman-1', 'Pokut Yayalası.jpg', 'Engin Tavlı', 'CC BY-SA 4.0',
    'Rize (Çamlıhemşin, Pokut Yaylası): yamaçlarda sık iğne yapraklı orman, vadilerde sis.');
  add('tr-orman-2', 'Efeler ormanları.jpg', 'Enverkaranfil', 'CC BY-SA 4.0',
    'Artvin (Camili, Efeler): ıslak ve sık orman, yeşil yamaçta patika.');
  add('tr-orman-3', 'Aksu Valley, Dereli - Giresun 2016 01-1.jpg', 'Zeynel Cebeci', 'CC BY-SA 4.0',
    'Giresun (Dereli, Aksu Vadisi): dik vadi tepeye kadar ormanla kaplı; huş ve iğne yapraklı ağaçlar karışık.');
  S['tr-orman'] = ['tr-orman-1', 'tr-orman-2', 'tr-orman-3'];

  add('tr-aycicegi-1', 'Cavuslu tarla.jpg', 'Zakir (c)2004 Alper Yenilmez', 'CC BY-SA 3.0',
    'Edirne (Uzunköprü, Çavuşlu): ayçiçeği tarlası; arazi düz ve açık, ufukta ağaç sıraları.');
  S['tr-aycicegi'] = ['tr-aycicegi-1'];

  add('tr-sera-1', 'Antalya (provincia) 1998 11.jpg', 'LBM1948', 'CC BY-SA 4.0',
    'Antalya (Kumluca ovası): vadi tabanı beyaz sera örtüleriyle kaplı, arkada dağlar.');
  add('tr-sera-2', 'Domates serası.JPG', 'Garasullu', 'Public domain',
    'Antalya (Kaş, Yeşilköy): domates serasının içi; bitkiler tavana kadar yükseliyor.');
  S['tr-sera'] = ['tr-sera-1', 'tr-sera-2'];

  add('tr-harran-1', 'Beehive houses in Harran - panoramio.jpg', 'Alen Ištoković', 'CC BY 3.0',
    'Şanlıurfa (Harran): toprak renkli, koni biçimli kubbeli evler düz ve kurak arazide.');
  add('tr-harran-2', 'EX02 - Harran.jpg', 'Misa.stefanovic.07', 'CC BY-SA 4.0',
    'Harran: düz duvarlı evin üstünde iki koni kubbe.');
  add('tr-harran-3', 'EX04 - Harran.jpg', 'Misa.stefanovic.07', 'CC BY-SA 4.0',
    'Harran: koni kubbeler yan yana sıralanmış.');
  S['tr-harran'] = ['tr-harran-1', 'tr-harran-2', 'tr-harran-3'];

  add('tr-mardin-1', 'Eski Mardin 2.jpg', 'Hamdigumus', 'CC0',
    'Mardin: bal rengi taş evler tepeye basamak basamak diziliyor.');
  add('tr-mardin-2', 'Eski Mardin 8.jpg', 'Hamdigumus', 'CC0',
    'Mardin: kemerli pencereli, düzgün kesme taş cephe.');
  add('tr-mardin-3', 'Eski Mardin 7.jpg', 'Hamdigumus', 'CC0',
    'Mardin: iri kemerli pencere ve kesme taş duvarlar.');
  S['tr-mardin'] = ['tr-mardin-1', 'tr-mardin-2', 'tr-mardin-3'];

  add('tr-kapadokya-1', 'AvcilarValley.jpg', 'Noumenon', 'CC BY-SA 3.0',
    'Nevşehir (Avcılar Vadisi, Kapadokya): yumuşak, açık renkli kayadan oyulmuş külah biçimli kayalar.');
  add('tr-kapadokya-2', 'Cave hotels in Goreme.jpg', 'Codas', 'CC BY-SA 4.0',
    'Nevşehir (Göreme): kayanın içine oyulmuş evler ve oteller; ön cepheler taşla örülmüş.');
  S['tr-kapadokya'] = ['tr-kapadokya-1', 'tr-kapadokya-2'];

  add('tr-agri-1', 'Ağrı Dağı (Mt. Ararat).jpg', 'ender gürel', 'CC BY-SA 4.0',
    'Doğubayazıt (Ağrı): çıplak, kurak düzlüğün üstünde karlı Ağrı Dağı.');
  add('tr-agri-2', 'Doğubayazıt ve Ağrı Dağı.jpg', 'ender gürel', 'CC BY-SA 4.0',
    'Doğubayazıt: şehrin binalarının üstünde tek başına yükselen karlı Ağrı Dağı.');
  S['tr-agri'] = ['tr-agri-1', 'tr-agri-2'];

  add('tr-van-1', 'Ahtamara Kilisesi.jpg', 'Varilci', 'CC0',
    'Van Gölü, Akdamar Adası: adada Ahtamar Kilisesi; gölün ardında karlı dağlar.');
  add('tr-van-2', 'Akdamar Island on Lake Van with the Armenian Church of the Holy Cross and Mount Artos in the background.jpg', 'Bryce Edwards', 'CC BY 2.0',
    'Akdamar Adası: kilise, mavi göl ve arkada Artos Dağı.');
  S['tr-van'] = ['tr-van-1', 'tr-van-2'];

  add('tr-bodrum-1', 'Bodrum - panoramio (28).jpg', 'Tanya Dedyukhina', 'CC BY 3.0',
    'Muğla (Bodrum): beyaz badanalı, küp biçimli evler yamaca yayılmış.');
  add('tr-bodrum-2', 'Bodrum - 46216644144.jpg', 'Shadowgate', 'CC BY 2.0',
    'Bodrum: düz çatılı beyaz küp evler, aralarında çiçekli bahçeler.');
  S['tr-bodrum'] = ['tr-bodrum-1', 'tr-bodrum-2'];

  /* ---- Rusya: cumhuriyetlerde Rusça + yerel dil levhaları (hepsi gözle doğrulandı) ---- */
  /* Tatarstan: Kazan */
  add('ru-tat-1', 'Germanetto Kazan.jpg', 'OsteGuido', 'CC BY-SA 4.0',
    'Kazan: Giovanni Germanetto anma levhası, Rusça + Tatarca. Tatarca bölümde Ө, Ә ve Ү görünür («төбәк», «дәүләт»).');
  add('ru-tat-2', 'Kazan — City of Labour Valour stele (2023-05-12) 04.jpg', 'Vyacheslav Kirillin', 'CC BY-SA 4.0',
    'Kazan: «Emek Kahramanlığı Şehri» anıtı. Tatarca satırda «Хезмәт батырлыгы шәһәре»: Ә ve Һ harfleri.');
  add('ru-tat-3', 'Улица Академика Завойского (название на татарском и русском).jpg', 'MarSaf', 'CC0',
    'Kazan: sokak levhası iki satırlı (üstte Tatarca, altta Rusça). Bu levhada ayırt edici harf yok, yalnızca çift dilli düzeni gösterir.');
  S['ru-tat'] = ['ru-tat-1', 'ru-tat-2', 'ru-tat-3'];

  /* Başkurdistan */
  add('ru-ba-1', 'LEROY MERLIN\'daki Başkurtça ve rusça tabelayı.jpg', 'Ayratayrat', 'CC BY-SA 4.0',
    'Başkurdistan: mağaza tabelasında Başkurtça (üstte) ve Rusça (altta). «һәм» sözünde Һ ve Ә, «биреү» sözünde Ү.');
  add('ru-ba-2', 'Бөрйән районы сиге.jpg', 'Рәшиҙә Ғизәтуллина', 'CC BY-SA 4.0',
    'Başkurdistan, Burzyan ilçesinin sınırı: «Бөрйән районы» yazısında Ө ve Ә. Altında Rusça «Бурзянский район».');
  S['ru-ba'] = ['ru-ba-1', 'ru-ba-2'];

  /* Çuvaşistan */
  add('ru-cu-1', 'Приветственный знак при въезде в Новую Шемуршу.jpg', 'Ленгесов Антон', 'CC BY-SA 4.0',
    'Çuvaşistan, Novaya Şemurşa girişi: üstte Çuvaşça «Ҫӗнӗ Шӑмӑрша» (Ҫ, Ӗ, Ӑ), altta Rusça «Добро пожаловать!».');
  add('ru-cu-2', 'При въезде в Марпосад - panoramio.jpg', 'Даниил Прокопьев', 'CC BY 3.0',
    'Çuvaşistan, Mariinskiy Posad girişi: kemerin üstünde Çuvaşça «Сӗнтӗрвӑрри» (Ӗ, Ӑ).');
  S['ru-cu'] = ['ru-cu-1', 'ru-cu-2'];

  /* Komi */
  add('ru-ko-1', 'Архивный отдел в Коми.jpg', 'Апатинаити', 'CC BY-SA 3.0',
    'Komi Cumhuriyeti, Uhta: arşiv dairesi levhası. Üstte Komi dilinde «Архив юкӧн» (noktalı Ӧ), altta Rusça «Архивный отдел».');
  S['ru-ko'] = ['ru-ko-1'];

  /* Kalmukya */
  add('ru-kl-1', 'Bilingual sign in Elista.jpg', 'Dor Shabashewitz', 'CC BY-SA 4.0',
    'Kalmukya, Elista: devlet kurumu levhası, solda Rusça, sağda Kalmukça. Kalmukça yazıda Ң, Һ ve Ө harfleri görünür.');
  S['ru-kl'] = ['ru-kl-1'];

  /* Udmurtya */
  add('ru-ud-1', 'Otiskom.jpg', 'Ds02006', 'CC BY-SA 3.0',
    'Udmurtya: mağaza girişinde üstte Rusça «Добро пожаловать», altta Udmurtça «Гажаса ӧтиськом» (noktalı Ӧ).');
  S['ru-ud'] = ['ru-ud-1'];

  /* ---- Güney Asya: gerçek tabelalarda yazı sistemleri (hepsi gözle doğrulandı) ----
     Küme adı: 'as-' + yazı kimliği (AS_DATA.SCRIPTS[].id). view-alfabe.js > scriptCard, kümeyi "Gerçek tabelalar" olarak gösterir. */
  add('as-deva-1', 'Trilingual signboard of Phursungi Railway Station.jpg', 'DesiBoy101', 'CC BY 4.0',
    'Phursungi (Maharashtra) istasyon tabelası: Devanagari «फुरसुंगी». Harflerin tepesinden geçen yatay çizgiye bak.');
  add('as-deva-2', 'Habibganj signboard.jpg', 'Aman Gupta', 'CC BY-SA 3.0',
    'Habibganj (Bhopal) istasyon tabelası: Devanagari «हबीबगंज», altında Latin yazı. Üst çizgi harfleri birbirine bağlar.');
  add('as-deva-3', 'Signboard Samalka.jpg', 'Zuck', 'CC0',
    'Yol tabelası: Devanagari «समालखा गाँव», altında Latin «Samalka Village».');
  S['as-deva'] = ['as-deva-1', 'as-deva-2', 'as-deva-3'];

  add('as-beng-1', 'Central Nursery signboard at Sitakunda Botanical Garden and Eco Park, Chattogram.jpg', 'Sultan Sunnny', 'CC BY-SA 4.0',
    'Bangladeş, Sitakunda: Bengalce «কেন্দ্রীয় নার্সারী» (Merkez Fidanlık) levhası. Harflerin tepesinde yatay çizgi var.');
  add('as-beng-2', 'Ashoknagar Road railway station.jpg', 'Anup Sadi', 'CC BY-SA 4.0',
    'Batı Bengal, Ashoknagar Road istasyon levhası: Bengalce «অশোক নগর রোড», altında Latin yazı.');
  S['as-beng'] = ['as-beng-1', 'as-beng-2'];

  add('as-guru-1', 'Doraha Railway satation - panoramio (Cropped).jpg', 'rupinder - panoramio', 'CC BY-SA 4.0',
    'Pencap, Doraha istasyonu: üstte Gurmukhi «ਦੋਰਾਹਾ», altında Devanagari «दोराहा» ve Latin «DORAHA».');
  S['as-guru'] = ['as-guru-1'];

  add('as-gujr-1', 'Ahichchhatra sanskaar kendra pustakalay board.jpg', 'Aniket', 'CC BY-SA 4.0',
    'Gujarati yazı: «પ્રજ્ઞા પુસ્તકાલય» (kütüphane). Devanagari’deki gibi üst çizgi yok, harfler yuvarlak.');
  add('as-gujr-2', 'Sabarmati Junction - Signboard.jpg', 'Kool Nerd 123', 'CC BY-SA 4.0',
    'Sabarmati istasyonu: üstte Gujarati «સાબરમતી» (üst çizgi yok), ortada Devanagari «साबरमती» (üst çizgi var), altta Latin.');
  S['as-gujr'] = ['as-gujr-1', 'as-gujr-2'];

  add('as-orya-1', 'Trilingual Signboard leading to Reservation Office.jpg', 'କଳିଙ୍ଗପୁତ୍ର', 'CC BY-SA 4.0',
    'Bhubaneswar: üç dilli levha. Üstte Odia «ଆରକ୍ଷଣ କାର୍ଯ୍ୟାଳୟ», ortada İngilizce, altta Hintçe (Devanagari). Odia’da düz üst çizgi yok; harflerin tepesi yay gibi yuvarlak.');
  add('as-orya-2', 'Trilingual Signboard at Bhubaneswar Railway Station Ticket Counter.jpg', 'କଳିଙ୍ଗପୁତ୍ର', 'CC BY-SA 4.0',
    'Bhubaneswar istasyonu rezervasyonsuz bilet gişesi: Odia, Hintçe ve İngilizce üç dilli levhalar.');
  S['as-orya'] = ['as-orya-1', 'as-orya-2'];

  add('as-telu-1', 'Vejendla railway station signboard.jpg', 'Vin09', 'CC BY-SA 4.0',
    'Andhra Pradesh, Vejendla istasyon tabelası: Telugu «వేజెండ్ల», altında Latin «VEJENDLA».');
  add('as-telu-2', 'Srinivasa Nagar Bank Colony board in Road No-1.jpg', 'Anil 666', 'CC BY-SA 4.0',
    'Mahalle yönlendirme levhası: Telugu harflerle Srinivasa Nagar Bank Colony. Harfler yuvarlak, düz üst çizgi yok.');
  S['as-telu'] = ['as-telu-1', 'as-telu-2'];

  add('as-knda-1', 'Signboard Bengaluru Street.JPG', 'ସୁଭ ପା/Subha Pa', 'CC BY-SA 3.0',
    'Bengaluru: elle boyanmış tabela. Üstte Kannada «ಅಮೆರಿಕನ್ ಮೆನ್ಸ್ ಬ್ಯೂಟಿ ಪಾರ್ಲರ್», altında aynı ad Latin harflerle.');
  add('as-knda-2', 'Indiranagar Metro Station Signage.jpg', 'Blu Adi', 'CC BY-SA 4.0',
    'Bengaluru, Indiranagar metro istasyonu: Kannada «ಇಂದಿರಾನಗರ» ve Latin «Indiranagar».');
  S['as-knda'] = ['as-knda-1', 'as-knda-2'];

  add('as-mlym-1', 'Malkassignboard.JPG', 'ARUNKUMAR P.R', 'CC BY-SA 3.0',
    'Kerala yol tabelası: iki yön de Malayalam ve Latin yazılı («കാസർഗോഡ് ടൗൺ» = Kasaragod Town, diğer yön Mangalore). Malayalam harfleri yuvarlak ve halkalıdır.');
  add('as-mlym-2', 'Environmental awareness signboard at Kozhikode beach by Haritha Keralam Mission.jpg', 'Shem.iz', 'CC0',
    'Kozhikode plajı: Malayalam çevre bilinci levhası (Haritha Keralam Mission).');
  S['as-mlym'] = ['as-mlym-1', 'as-mlym-2'];

  add('as-taml-1', '"Panchayat Union Primary School Chinna Salem".jpg', 'Thamizhpparithi Maari', 'CC BY-SA 3.0',
    'Tamil Nadu, Chinna Salem: ilkokul kapısındaki Tamilce levha «ஊராட்சி ஒன்றிய தொடக்கப்பள்ளி».');
  add('as-taml-2', 'An announcement by Police.JPG', 'Thamizhpparithi Maari', 'CC BY-SA 3.0',
    'Tamil Nadu, Hokenakal: polis duyuru levhası, Tamilce yazılı.');
  S['as-taml'] = ['as-taml-1', 'as-taml-2'];
  /* ---- Meksika: bölgesel görünümler (bitki, yapı, volkan; çekim yeri açıklama/koordinatla doğrulandı, hepsi gözle görüldü) ---- */
  add('mx-cardon-1', 'Pachycereus pringlei 1702p2.jpg', 'Carlos Valenzuela', 'CC BY-SA 4.0',
    'Baja California Sur, La Paz: cardón (Pachycereus pringlei). Kısa kalın bir gövdeden alçakta ayrılan çok sayıda dik dal.');
  add('mx-cardon-2', 'Pachycereus pringlei (5782057703).jpg', 'Amante Darmanin from Malta', 'CC BY 2.0',
    'Baja California Sur, Vizcaíno bölgesi: cardón; dik dallar gövdenin alt kısmından çıkıyor, çevresi alçak çöl çalılığı.');
  add('mx-saguaro-1', 'Sonoran desert sunset.jpg', 'Tomas Castelazo', 'CC BY-SA 3.0',
    'Sonora Çölü, Meksika: gün batımında saguaro (Carnegiea gigantea) silüeti; kollar dirsek yapıp yukarı dönüyor.');
  add('mx-agave-1', 'Agave field in Jalisco, Mexico.jpg', 'Tomascastelazo', 'CC BY-SA 4.0',
    'Jalisco: havadan görünüş. Kırmızı toprakta çapraz uzanan düzgün mavi agave sıraları.');
  add('mx-agave-2', 'Campos de Agave, Tequila, Jalisco y su ancestral bebida tradicional.jpg', 'Javier Salazar Villagomez', 'CC BY-SA 4.0',
    'Tequila (Jalisco): geniş aralıklı agave sıraları, açık renkli toprak, ufukta dağ.');
  add('mx-agave-3', 'Paisaje agavero en Paraíso Azul, Tequila, Jalisco.jpg', 'Pequeño mar', 'CC BY-SA 4.0',
    'Tequila yakınları, Jalisco: sıra sıra mavi-gri agave, arkada alçak tepeler.');
  add('mx-maya-1', 'Maya house Yucatan, Mar 2022.jpg', 'Pavel Kirillov', 'CC BY-SA 2.0',
    'Yucatán: sazla örtülü geleneksel Maya evi, çevresinde palmiyeler; arazi düz.');
  add('mx-maya-2', 'YucMex Casa de Paja Maya 1973.jpg', 'Infrogmation of New Orleans', 'CC BY-SA 3.0',
    'Mérida çevresi, Yucatán (1973, eski renkli fotoğraf): taş duvarlı, sazla örtülü Maya evi.');
  add('mx-volcan-1', 'Popocatépetl e Iztaccíhuatl nevado desde la azotea de una casa (Puebla, 2010).jpg', 'Luis Alvaz', 'CC BY-SA 4.0',
    'Popocatépetl ve Iztaccíhuatl: bir çatıdan uzakta görünen karlı iki volkan.');
  add('mx-volcan-2', 'Ambos nevados.jpg', 'Rubelillo', 'CC BY-SA 4.0',
    'Popocatépetl ve Iztaccíhuatl (“Ambos nevados”): yeşil yamaçların üstünde karlı zirveler.');
  add('mx-volcan-3', 'Pico de Orizaba 1.jpg', 'pacomexico', 'CC BY 2.0',
    'Pico de Orizaba (Puebla–Veracruz sınırı, Meksika’nın en yüksek noktası): Cofre de Perote’den görünen kar örtülü koni.');
  S['mx-volcan'] = ['mx-volcan-1', 'mx-volcan-2', 'mx-volcan-3'];
  add('mx-plato-1', 'Chihuahuan Desert 01.jpg', 'Ricraider', 'CC BY-SA 3.0',
    'Chihuahua, Coyame kuzeyi: Chihuahua Çölü. Çıplak kumlu zeminde alçak seyrek çalılar; dev sütun kaktüs yok.');
  add('mx-plato-2', 'Chihuahua Desert SW of Tula, Municipality of Tula, Tamaulipas, Mexico (24 September 2003).jpg', 'William L. Farr', 'CC BY-SA 4.0',
    'Tula (Tamaulipas) güneybatısı: Chihuahua Çölü çalı düzlüğü. Seyrek çalılar arasında uzun yucca\'lar yükselir.');
  S['mx-plato'] = ['mx-plato-1', 'mx-plato-2'];
  /* Meksika bölgesel görünüm (ek): Cataviña, Cuatro Ciénegas, Istmo, Yucatán, Tabasco, Barrancas (gözle doğrulandı) */
  add('mx-cirio-1', 'Cirio columnaris, boojum tree.jpg', 'Tomas Castelazo', 'CC BY 3.0',
    'Cirio (boojum, Fouquieria columnaris), Baja California Yarımadası, Cataviña çevresi: ince, sivrilen, dikenli tek gövde.');
  add('mx-yeso-1', 'Dunas de Yeso - Cuatro Ciénegas, Coahuila, México.jpg', 'Juan Carlos Fonseca Mata', 'CC BY-SA 4.0',
    'Cuatro Ciénegas (Coahuila): beyaz alçı kumulları ve arkada kuru dağlar.');
  add('mx-viento-1', 'HighwayWindTurbinesLaVentosa.jpg', 'Thelmadatter', 'CC BY-SA 3.0',
    'La Ventosa (Oaxaca) yakınında karayolu ve rüzgâr türbinleri.');
  add('mx-viento-2', 'WindTurbinesLaVentosa.jpg', 'Thelmadatter', 'CC BY-SA 3.0',
    'La Ventosa (Oaxaca) yakınında düz ovada sıralı rüzgâr türbinleri.');
  add('mx-viento-3', 'La Ventosa.JPG', 'Laloixx', 'CC BY-SA 3.0',
    'La Ventosa (Oaxaca): güçlü rüzgârın yan yatırdığı ağaçlar; yol kenarında elektrik direkleri.');
  add('mx-henequen-1', 'HennequinTelchac01.JPG', 'AlejandroLinaresGarcia', 'CC BY-SA 4.0',
    'Telchac Puerto (Yucatán): henequén (sisal agavesi) tarlası; uzun, kılıç gibi sivri yapraklar kaya zeminde.');
  add('mx-henequen-2', 'HennequinTelchac03.JPG', 'AlejandroLinaresGarcia', 'CC BY-SA 4.0',
    'Telchac Puerto (Yucatán): henequén bitkileri, taşlı kuru zemin.');
  add('mx-henequen-3', 'HennequinTelchac05.JPG', 'AlejandroLinaresGarcia', 'CC BY-SA 4.0',
    'Telchac Puerto (Yucatán): henequén tarlası, önde taş duvar ve arkada alçak orman.');
  add('mx-centla-1', 'Pantanos de Centla 2.JPG', 'Alfonsobouchot', 'Public domain',
    'Pantanos de Centla Biyosfer Rezervi (Tabasco): geniş nehir, yeşil sulak alan ve saz çatılı gözlem kulübeleri.');
  add('mx-canon-1', 'Barrancas de Cobre.jpg', 'Arzam879', 'CC BY-SA 4.0',
    'Barrancas del Cobre (Chihuahua): derin kanyon, dik duvarlar ve ağaçlı yamaçlar.');
  S['mx-cirio'] = ['mx-cirio-1'];
  S['mx-yeso'] = ['mx-yeso-1'];
  S['mx-viento'] = ['mx-viento-1', 'mx-viento-2', 'mx-viento-3'];
  S['mx-henequen'] = ['mx-henequen-1', 'mx-henequen-2', 'mx-henequen-3'];
  S['mx-centla'] = ['mx-centla-1'];
  S['mx-canon'] = ['mx-canon-1'];

  /* ---- Brezilya: bölgesel görünümler (ağaç, palmiye, kaktüs, biyom; çekim yeri açıklama/koordinatla doğrulandı, hepsi gözle görüldü) ---- */
  add('br-arauc-1', 'AraucariasPiraquara.jpg', 'SamirNosteb', 'CC BY 3.0',
    'Paraná, Piraquara (Curitiba çevresi): araucária; tepesi yassı, şemsiye gibi geniş taçlar.');
  add('br-arauc-2', 'Vale de Araucarias em São Joaquim.jpg', 'Miguel Santos', 'CC BY-SA 3.0',
    'Santa Catarina, São Joaquim Ulusal Parkı: vadide araucária ağaçları.');
  add('br-acai-1', 'Açaizeiro no palácio.JPG', 'User:Arouck', 'Public domain',
    'Pará, Belém: açaí palmiyesi (Euterpe oleracea); birkaç ince gövde bir arada, tepede dağılan yapraklar.');
  add('br-babacu-1', 'Babacu.jpg', 'Nando cunha', 'CC BY-SA 3.0',
    'Maranhão, Governador Edison Lobão: babaçu palmiyesi; tek uzun gövde, tepede geniş yay gibi kıvrılan yapraklar.');
  add('br-babacu-2', 'Morros (2007) 09.jpg', 'LBM1948', 'CC BY-SA 4.0',
    'Maranhão, Morros: babaçu palmiyeleri; ince, uzun gövdeler ve yoğun yaprak tacı.');
  add('br-cactus-1', 'Mandacaru Florando.jpg', 'Lia b magalhaes', 'CC BY-SA 4.0',
    'Bahia iç kesimi (Chapada Diamantina çevresi): mandacaru kaktüsü; çok kollu dik gövde, çevresi alçak bitki örtüsü.');
  add('br-cactus-2', 'Casa x Xique-Xique.JPG', 'Acilondioliveira', 'CC BY-SA 3.0',
    'Bahia sertão’u: kaktüsler ve yaprağını dökmüş seyrek ağaçlar, ortada küçük bir ev.');
  add('br-cerrado-1', 'Cerrado - Parque Nacional Chapada dos veadeiros.jpg', 'Eliane de Castro', 'CC BY-SA 4.0',
    'Goiás, Chapada dos Veadeiros Ulusal Parkı: cerrado; otlar arasında tek, bükük gövdeli ağaç, uzakta dağlar.');
  add('br-cerrado-2', 'Cerrado - Parque Nacional Chapada dos veadeiros 2.jpg', 'Eliane de Castro', 'CC BY-SA 4.0',
    'Goiás, Chapada dos Veadeiros Ulusal Parkı: cerrado; boylu otlar arasında dağınık ağaçlar ve palmiyeler.');
  S['br-cerrado'] = ['br-cerrado-1', 'br-cerrado-2'];
  add('br-pampa-1', 'Área de Proteção Ambiental Ibirapuitã por Roberta Farenzena (07).jpg', 'Roberta Farenzena', 'CC BY-SA 4.0',
    'Rio Grande do Sul, Ibirapuitã Koruma Alanı (Alegrete çevresi): pampa; otlarla kaplı dalgalı geniş ova, ağaçlar seyrek ve dağınık.');
  add('br-pampa-2', 'Área de Proteção Ambiental Ibirapuitã por Roberta Farenzena (03).jpg', 'Roberta Farenzena', 'CC BY-SA 4.0',
    'Rio Grande do Sul, Ibirapuitã Koruma Alanı: pampa; otlak, aralarında alçak ağaç öbekleri.');
  S['br-pampa'] = ['br-pampa-1', 'br-pampa-2'];
  add('br-pantanal-1', 'Pantanal Wetland (28743841172).jpg', 'Bernard DUPONT from FRANCE', 'CC BY-SA 2.0',
    'Mato Grosso, Poconé (Transpantaneira): Pantanal; su dolu alçak alan, ufka kadar düz.');
  S['br-pantanal'] = ['br-pantanal-1'];
  add('br-amazon-1', 'Amazon rainforest manaus APA Margem Esquerda do Rio Negro - panoramio.jpg', 'James Martins', 'CC BY 3.0',
    'Amazonas, Manaus çevresi (Rio Negro sol kıyısı): havadan görünüş; ufka kadar sürekli, sık orman.');
  add('br-amazon-2', 'AMAZON RAINFOREST RIVER AND JUNGLE - panoramio.jpg', 'James Martins', 'CC BY 3.0',
    'Amazonas, Manaus çevresi: havadan görünüş; geniş nehir ve iki yanda sık yağmur ormanı.');
  S['br-amazon'] = ['br-amazon-1', 'br-amazon-2'];

  /* ---- Japonya: elektrik direği levhası (Commons'ta etiketli levha fotoğrafı çok az; yalnızca gözle doğrulananlar) ---- */
  add('jp-toh-1', 'Tohoku-Epco Bakagawa River Branch 180318.jpg', 'Yauchi', 'CC BY-SA 4.0',
    'Aomori, Nakadomari: Tohoku Elektrik direğinde sarı yatay levha. Solda şirket logosu, yanında hat adı 馬鹿川枝線; altında kalın dikey bir çizgi (1 rakamına benziyor).');
  /* ---- Rusya: yol numarası levhaları (Commons'taki resmî levha çizimleri, GOST R 52290-2004; fotoğraf değil, hepsi gözle görüldü) ---- */
  add('ru-route-1', 'RU road sign 6.14.1 A.svg', 'Nikolaev_ec06ffa5', 'Public domain',
    'Yol numarası levhası (6.14.1, GOST R 52290-2004 çizimi): mavi kare, beyaz harf ve sayı. Örnek: M5.');
  add('ru-route-2', 'RU road sign 6.14.2 B.svg', 'Nikolaev_ec06ffa5', 'Public domain',
    'Yol numarası levhasının oklu biçimi (6.14.2): numara solda, sağda yön oku. Örnek: M10.');
  add('ru-route-3', 'A331-RUS.svg', 'Nima Farid', 'Public domain',
    'Federal yol levhası çizimi: mavi zemin, beyaz çerçeve, A harfli numara (A331).');
  add('ru-route-4', 'M11-Green-RUS.svg', 'Miko101', 'Public domain',
    'M11 levhası çizimi: bu yolda zemin mavi değil yeşil (eski levha maviydi).');
  S['ru-route'] = ['ru-route-1', 'ru-route-2', 'ru-route-3', 'ru-route-4'];

  /* ---- Güney Kore: levhalarda Hangul ad + Latin satır (hepsi gözle görüldü; yazı küçük olduğundan crop + marks) ---- */
  add('kr-border-1', 'Gyeonggi-Gangwon Border sign in Seoul-Yangyang Expwy Magok TN(Yangyyang Dir).jpg', 'Jhcbs1019', 'CC BY-SA 4.0',
    'Seul–Yangyang Otoyolu, Gyeonggi–Gangwon sınırı: yeşil levhada üstte büyük il adı (강원도 / Gangwon-do), altta ilçe adı (홍천군 / Hongcheon).');
  add('kr-border-2', 'Route1 Anyang, Gyeonggi-do-Geumcheon-gu Seoul border.JPG', 'hyolee2', 'CC BY-SA 3.0',
    'Anyang (Gyeonggi) – Seul sınırı, 1 numaralı ulusal yol: üstte il düzeyi ad (서울특별시 / Seoul), altta ilçe adı (금천구 / Geumcheon).');
  S['kr-border'] = ['kr-border-1', 'kr-border-2'];

  /* Güney Kore bölgesel görünüm: Jeju, Gangwon yaylası, Namhae, Boseong (hepsi gözle doğrulandı) */
  add('kr-batdam-1', '13 사진 지질마을이야기 만장굴 둘러보기 밭담1.JPG', 'JEJUGEO', 'CC BY-SA 4.0',
    'Gimnyeong (Jeju): tarla kenarında kaba, siyah bazalt taşlardan örülmüş alçak duvar (batdam). Duvarın iki yanı yeşil ekin.');
  add('kr-gam-1', 'KOCIS Trip to Jeju Island and Seoul (6278662099).jpg', 'Korea.net / Korean Culture and Information Service', 'CC BY-SA 2.0',
    'Jeju\'da mandalina (Citrus reticulata) dalında: Jeju adasının başlıca tarım ürünü.');
  add('kr-oreum-1', '따라비오름 04.jpg', 'KIMJUNGWOOK', 'CC BY-SA 4.0',
    'Jeju\'da Tarabi Oreum çevresi: otla kaplı yumuşak yamaçlar ve uzakta ova. Oreum, ada üzerindeki küçük volkan konileridir.');
  add('kr-daegwal-1', 'Samyang Farm, Pyeongchang.jpg', 'Choi2451', 'CC BY-SA 3.0',
    'Daegwallyeong Samyang Çiftliği (Pyeongchang, Gangwon), Ekim 2018: ağaçsız yüksek otlak sırtlar ve rüzgâr türbinleri.');
  add('kr-daegwal-2', 'Daegwallyeong sheep farm1.jpg', 'Taehoon Kang from SAN FRANCISCO, USA', 'CC BY 2.0',
    'Daegwallyeong\'de koyun otlayan yeşil, ağaçsız yamaç.');
  add('kr-daegwal-3', '대관령.jpg', 'Taehoon Kang from SAN FRANCISCO, USA', 'CC BY 2.0',
    'Daegwallyeong: çit boyunca otlak, arkada sıralı rüzgâr türbinleri.');
  add('kr-namhae-1', 'Rice Terrace in Namhae, South Korea.jpg', 'Choi2451', 'CC0',
    'Namhae (Güney Gyeongsang), Ağustos 2019: denize bakan yamaçta taş duvarlı basamaklı çeltik tarlaları (darangi).');
  add('kr-namhae-2', 'Gacheon Daraengi Village, Namhae on September 1st, 2019.jpg', 'Choi2451', 'CC0',
    'Gacheon köyü, Namhae (Eylül 2019): denize inen yamaçta basamaklı çeltik tarlaları ve köy evleri.');
  add('kr-boseong-1', 'Boseong Green Tea Field in summer 2017.jpg', 'S Shamima Nasrin', 'CC BY-SA 4.0',
    'Boseong (Güney Jeolla), yaz 2017: yamaçta kıvrımlı sıralar hâlinde çay çalıları.');
  add('kr-boseong-2', 'Korea-Boseong-Green.tea-06.jpg', 'by ~Mers', 'CC BY-SA 2.0',
    'Boseong çay tarlası (Daehan Dawon, Güney Jeolla): yamaç boyunca düzenli çay sıraları.');
  add('kr-boseong-3', 'Boseong Green Tea Field.jpg', 'Jakob Reichmann', 'CC BY-SA 3.0',
    'Boseong çay tarlası, hasat mevsimi (Mayıs 2017): teraslı yamaç.');
  S['kr-batdam'] = ['kr-batdam-1'];
  S['kr-gam'] = ['kr-gam-1'];
  S['kr-oreum'] = ['kr-oreum-1'];
  S['kr-daegwal'] = ['kr-daegwal-1', 'kr-daegwal-2', 'kr-daegwal-3'];
  S['kr-namhae'] = ['kr-namhae-1', 'kr-namhae-2'];
  S['kr-boseong'] = ['kr-boseong-1', 'kr-boseong-2', 'kr-boseong-3'];
  add('kr-dir-1', 'Sanin JCT 2.jpg', 'User:Jytim', 'CC BY-SA 3.0',
    'Sanin Kavşağı: yeşil üst geçit levhası. Her adın altında küçük Latin satırı var; solda Busan ile Daegu–Gimcheon, sağda Busan ile Changwon.');

  /* ---- Vietnam: km direkleri (hepsi gözle görüldü; yazı küçük olduğundan crop + marks) ---- */
  add('vn-km-1', 'Bắc Giang6.jpg', 'Dongson.vmvn', 'CC BY-SA 4.0',
    'Bắc Giang yakını, QL1: kırmızı tepede «QL1 · Km 119», beyaz gövdede gidilecek yer ve uzaklık (L.SƠN 103Km = Lạng Sơn’a 103 km).');
  add('vn-km-2', 'QL4E - Lao Cai to Pho Lu - P1380570.JPG', 'User:Vmenkov', 'CC BY-SA 3.0',
    'Lào Cai – Phố Lu, QL4E: kırmızı tepede «QL 4E · Km 21», beyaz gövdede gidilecek yer ve uzaklık (PHỐ LU 12 Km); yan yüzde «QL 4E».');
  add('vn-km-3', 'Quốc lộ 1A.JPG', 'Hoangvantoanajc', 'CC BY-SA 3.0',
    'QL1A’nın son kilometresi (Năm Căn, Cà Mau): kırmızı tepede yol numarası ve «Km 2301», beyaz gövdede gidilecek yer ve uzaklık (CẢNG MỚI 1 Km).');

  /* ---- Hindistan: çok dilli yön levhası ve mil taşları (hepsi gözle görüldü; crop + marks) ---- */
  add('in-dir-te-1', 'Andhra Pradesh NH 5 Highway India.jpg', 'Ramakrishna Reddy Y', 'CC BY-SA 2.0',
    'Andhra Pradesh, NH 5: her sütunda üstte Telugu yazılı ad, ortada uzaklık sayısı, altta İngilizce ad (KAVALI 46, VIJAYAWADA 265, BALASORE 1284, KOLKATTA 1516).');
  add('in-dir-ta-1', 'NH-Coimbatore-Road-Sign.JPG', 'Rsrikanth05', 'CC BY-SA 3.0',
    'Coimbatore çevresi (Tamil Nadu): her levhada üstte Tamil, ortada Hindi (Devanagari), altta İngilizce ad (Coimbatore, Erode, Salem).');
  add('in-mile-1', 'Milestone Balamuri Coorg Karnataka India Feb24 A7C 09388.jpg', 'Timothy A. Gonsalves', 'CC BY-SA 4.0',
    'Balamuri (Kodagu, Karnataka): turuncu üst bant, beyaz gövdede Kannada yazısıyla yer adı ve altında uzaklık (3.31).');
  add('in-mile-2', 'Penamaluru Mile stone.jpg', 'Usmanzaffer786', 'CC BY-SA 3.0',
    'Penamaluru (Andhra Pradesh) mil taşı: yer adı Telugu yazısıyla, altında uzaklık sayısı (1).');
  add('in-mile-3', 'Purana Kangra milestone.JPG', 'Vssun', 'CC BY-SA 3.0',
    'Purana Kangra (Himachal Pradesh) mil taşı: Devanagari yazısıyla yer adı (पुराना कांगड़ा), altında sıfır noktası (0); üstte kırmızıyla yükseklik (710 metre).');

  /* ---- Japonya: direk gövde şeridi ve levhalar (gerçek fotoğraf; hepsi gözle görüldü) ---- */
  add('jp-wrap-1', 'Sento by Takanori Ishikawa in Kyoto.jpg', 'Takanori Ishikawa', 'CC BY 2.0',
    'Kyoto: direğin alt kısmında kalın sarı-siyah dikey şerit; üstte iki küçük beyaz levha, yazı dikey akar.');
  add('jp-wrap-2', 'Boekhandel Tomoda te Higashiyama 3-chōme, Kanazawa, -28 augustus 2009.jpg', 'Takeshi Kuboki', 'CC BY 2.0',
    'Kanazawa (Ishikawa): kısa sarı-siyah şerit ve üstünde dikey yazılı sarı-beyaz levhalar; bu direkte şerit düz dikey tür.');

  /* ---- Rusya: gerçek yol numarası ve kilometre levhaları (gözle görüldü; crop + marks) ---- */
  add('ru-route-5', 'Ludoni village, R23 route.jpg', 'Alandislands', 'CC BY-SA 4.0',
    'Р-23 yolunda (Ludoni köyü) mavi yön levhası: üst panelde kırmızı kutuda Р-23, altında yeşil kutuda Avrupa yolu numarası E95; yanında ЛУГА / LUGA ve С.-ПЕТЕРБУРГ / St. PETERSBURG.');
  add('ru-route-6', 'M52 highway in Novosibirsk.jpg', 'Obakeneko', 'CC BY 3.0',
    'Novosibirsk yakınında mavi yol numarası levhası: solda yukarı ok, sağda М 52.');
  add('ru-km-1', 'А-147, 16 км. Километровый знак (1).jpg', 'WWBM', 'CC BY-SA 4.0',
    'А-147 yolu, 16. kilometre: mavi plakada kilometre sayısı (16), altında РОСАВТОДОР (federal yol kurumu).');
  add('ru-km-2', 'Р-256 highway (Russia) 544km (Altai Republic).jpg', 'А. В. Кузичкин', 'CC BY-SA 4.0',
    'Р-256 yolu (Altay Cumhuriyeti), 544. kilometre: yol kenarındaki direkte mavi kilometre plakası (544).');
  S['ru-route-real'] = ['ru-route-5', 'ru-route-6'];
  S['ru-km'] = ['ru-km-1', 'ru-km-2'];

  /* ---- Rusya: bölgesel görünümler (ahşap ev, gaz ve ısıtma borusu, sağdan direksiyon, cami, stupa, volkan; çekim yeri Commons açıklaması/kategorisiyle doğrulandı) ---- */
  add('ru-yer-ev-1', 'Leunovo.jpg', 'Shum96', 'CC BY-SA 3.0',
    'Leunovo köyü, Holmogorı bölgesi, Arkhangelsk Oblastı: iki katlı, düzenli pencere sıralı kuzey kütük evi.');
  add('ru-yer-ev-2', 'Wodden houses, Kimzha village.jpg', 'Engine9', 'CC BY-SA 4.0',
    'Kimzha köyü, Arkhangelsk Oblastı: iki katlı kuzey kütük evleri (kaynakta “северная изба”); bakımsız, kararmış kütükler.');
  add('ru-yer-ev-3', 'KargopolskyDistrict Fominskaya 008 3641.jpg', 'Ludvig14', 'CC BY-SA 4.0',
    'Fominskaya köyü, Kargopol bölgesi, Arkhangelsk Oblastı: eğimli tahta çatılı ahşap kütük ev.');
  add('ru-yer-ev-4', 'Деревея Усть-Мехреньга Холмогорский район.jpg', 'Kargopolis', 'CC BY-SA 4.0',
    'Ust-Mehrenga köyü, Holmogorı bölgesi, Arkhangelsk Oblastı: toprak yol boyunca kütük evler.');
  add('ru-yer-gaz-1', 'Vyselki-8295.JPG', 'ShinePhantom', 'CC BY-SA 3.0',
    'Vıselki köyü, Samara Oblastı (Stavropol bölgesi): evlerin önünden geçen ve yol üstünde dirsek yapan sarı yer üstü gaz borusu.');
  add('ru-yer-gaz-2', 'Yagodnoe 8593.JPG', 'ShinePhantom', 'CC BY-SA 4.0',
    'Yagodnoye köyü, Samara Oblastı: sokağın üstünden geçen sarı gaz borusu.');
  add('ru-yer-gaz-3', 'Казань, посёлок Отары. Улица Молдавская.JPG', 'MarSaf', 'CC BY-SA 4.0',
    'Kazan (Tataristan), Otarı mahallesi, Moldavskaya Sokağı: çitin üstünden uzanan sarı gaz borusu.');
  add('ru-yer-isi-1', 'Walkways across the heating pipe at Gubkina Street in Salekhard (1).jpg', 'Vasyatka1', 'CC BY-SA 4.0',
    'Salehard (Yamalo-Nenets), Gubkina Sokağı: merkezi ısıtma borusu yerde, üstünden geçmek için merdivenli geçitler yapılmış.');
  add('ru-yer-isi-2', 'Raised pipes in permafrost.jpg', 'Stacy from Minneapolis', 'CC BY 2.0',
    'Yakutsk (Saha): don toprakta boru gömülemediği için yalıtımlı borular yerden yükseltilmiş; kaynağın açıklamasına göre.');
  add('ru-yer-isi-3', 'Якутск - panoramio (3).jpg', 'Николай Максимович', 'CC BY 3.0',
    'Yakutsk (Saha): kent içinde yerde uzanan yalıtımlı boru hattı.');
  add('ru-yer-rhd-1', 'Vladivostok Toyota car 2019-03.jpg', 'Svetlov Artem', 'CC BY-SA 4.0',
    'Vladivostok (Primorsky Krayı): Japonya şartnamesinde Toyota Crown (S130) station wagon; direksiyon sağda.');
  add('ru-yer-rhd-2', 'Vladivostok Toyota car 2019-03 2.jpg', 'Svetlov Artem', 'CC BY-SA 4.0',
    'Vladivostok: aynı Toyota Crown; sağdan direksiyonlu Japon arabalar Uzak Doğu sokaklarında sıradandır.');
  add('ru-yer-rhd-3', 'Vladivostok Toyota car 2019-03 3.jpg', 'Svetlov Artem', 'CC BY-SA 4.0',
    'Vladivostok: çatı bagajlı sağdan direksiyonlu Japon station wagon.');
  add('ru-yer-cami-1', 'Главная улица и мечеть (Юрт-Аух.jpg', 'Дагиров Умар', 'CC BY 3.0',
    'Kalininaul (Yurt-Auh) köyü, Dağıstan: ana cadde ve cami minaresi.');
  add('ru-yer-cami-2', 'Мечеть в селе Калининаул.jpg', 'Дагиров Умар', 'CC BY-SA 3.0',
    'Kalininaul köyü, Dağıstan: kırmızı tuğlalı köy camisi ve minaresi.');
  add('ru-yer-cami-3', 'Кизлярская мечеть.jpg', 'Tamdikatamdikabalebale', 'CC BY-SA 4.0',
    'Kızlar şehir camisi, Dağıstan; 2015 yangınından sonra yeniden inşa edilmiş.');
  add('ru-yer-cami-4', 'Мечеть в Буйнакске - Дагестан.jpg', 'АбуУбайда', 'CC BY-SA 3.0',
    'Buynaksk, Dağıstan: kubbeli, kemerli cami avlusu ve minare.');
  add('ru-yer-bud-1', 'Самая большая ступа в России - Джарун Хашор в Кижингинском районе Бурятии, копия непальской Бодхнатх.jpg', 'Bayartuya', 'CC0',
    'Cerün Haşor stupası, Kijinga bölgesi, Buryatya: Rusya’nın en büyük stupası, Nepal’deki Boudhanath’ın küçük bir kopyası (kaynağın açıklamasına göre).');
  add('ru-yer-bud-2', 'Санагинский дацан. Ступы.jpg', 'Аркадий Зарубин', 'CC BY 4.0',
    'Sanaga köyü, Zakamensk bölgesi, Buryatya: datsanın önünde sıralı beyaz stupalar.');
  add('ru-yer-bud-3', 'Dugan in Zakamensk.jpg', 'УмныйПёс', 'CC0',
    'Zakamensk, Buryatya: Sanaga duganı; çok katlı çatılı, kırmızı ahşap Budist tapınak yapısı (dugan).');
  add('ru-yer-vol-1', 'Kamchatka Petropavlovsk-Kamchatsky and its Volcanoes (25022593335).jpg', 'kuhnmi', 'CC BY 2.0',
    'Petropavlovsk-Kamçatski’den Koryaksky, Avaçinsky ve Kozelsky volkanları; kent volkan konilerinin eteğinde.');
  add('ru-yer-vol-2', 'Petropavlovsk-Kamchatsky, Mutnovsky and Vilyuchinsky volcano, a view from the summit of Avachinsky volcano.jpg', '-= Nikita Zhuravlev =-', 'CC BY-SA 4.0',
    'Avaçinsky Volkanı’nın zirvesinden Petropavlovsk-Kamçatski, Mutnovsky ve Vilyuçinsky volkanları.');
  S['ru-yer-ev'] = ['ru-yer-ev-1', 'ru-yer-ev-2', 'ru-yer-ev-3', 'ru-yer-ev-4'];
  S['ru-yer-gaz'] = ['ru-yer-gaz-1', 'ru-yer-gaz-2', 'ru-yer-gaz-3'];
  S['ru-yer-isi'] = ['ru-yer-isi-1', 'ru-yer-isi-2', 'ru-yer-isi-3'];
  S['ru-yer-rhd'] = ['ru-yer-rhd-1', 'ru-yer-rhd-2', 'ru-yer-rhd-3'];
  S['ru-yer-cami'] = ['ru-yer-cami-1', 'ru-yer-cami-2', 'ru-yer-cami-3', 'ru-yer-cami-4'];
  S['ru-yer-bud'] = ['ru-yer-bud-1', 'ru-yer-bud-2', 'ru-yer-bud-3'];
  S['ru-yer-volkan'] = ['ru-yer-vol-1', 'ru-yer-vol-2'];

  /* ---- Türkiye: çöp kovası ve konteyner (belediye adı ve amblemi okunan örnekler; Commons'ta okunaklı örnek az) ---- */
  add('tr-bin-1', 'Trabzon Apr 2020.jpeg', 'Robot8A', 'CC BY-SA 4.0',
    'Trabzon: gri metal çöp konteynerinin ön yüzüne boyayla «ORTAHİSAR BELEDİYESİ» ve 444 61 44 numarası yazılmış (Ortahisar, Trabzon’un merkez ilçesidir).');
  add('tr-bin-2', 'Amasra 158.JPG', 'Vikiçizer', 'CC BY-SA 4.0',
    'Amasra (Bartın): mavi çöp kovasında belediyenin amblemi ve «AMASRA BELEDİYESİ» yazısı.');
  add('tr-bin-3', 'Kullanılmış Giysi ve Ayakkabı Atık Kumbarası 01.jpg', 'Satirdan kahraman', 'CC BY-SA 4.0',
    'Konya: kullanılmış giysi kumbarası; üstte «SELÇUKLU BELEDİYESİ» yazısı ve «KONYA · 1989» mührü, altta 444 numaraları.');
  S['tr-bin'] = ['tr-bin-1', 'tr-bin-2', 'tr-bin-3'];

  /* ---- Türkiye: bölgesel görünümler (Ege, İç Anadolu, Güneydoğu; çekim yeri Commons açıklaması/kategorisiyle doğrulandı) ---- */
  add('tr-zeytin-1', 'Olives Of Cunda.jpg', 'Ahmet Ali Arslan', 'CC BY-SA 4.0',
    'Cunda (Alibey) Adası, Ayvalık (Balıkesir): iki zeytin ağacı ve arkada devam eden zeytinlikler (Ayvalık Adaları Tabiat Parkı).');
  add('tr-pamuk-1', 'Cotton field Turkey.jpg', 'Gerhard Pils', 'CC BY-SA 3.0',
    'Belek (Antalya): kozaları açmış pamuk tarlası, arkada dağlar. Pamuk Çukurova, Ege ve Güneydoğu’da asıl ekim alanlarındadır.');
  add('tr-pamukkale-1', 'The Travertine terraces of Pamukkale.jpg', 'Slyronit', 'CC BY-SA 4.0',
    'Pamukkale (Denizli): beyaz travertenler ve içlerinde turkuaz-yeşil sığ havuzlar.');
  add('tr-pamukkale-2', 'Lake of Pamukkale seen from the travertines.jpg', 'Slyronit', 'CC BY-SA 4.0',
    'Pamukkale (Denizli): travertenlerin üstünden yamaçtaki göl ve aşağıdaki köy görünümü.');
  add('tr-nemrut-1', 'Nemrut Dağı 01.jpg', 'Bernard Gagnon', 'CC BY-SA 3.0',
    'Nemrut Dağı (Adıyaman), doğu teras: kartal tanrı başı; çevresinde taş yığını ve heykel parçaları.');
  add('tr-nemrut-2', 'Nemrut Dağı 06.jpg', 'Bernard Gagnon', 'CC BY-SA 3.0',
    'Nemrut Dağı (Adıyaman), batı teras: Kommagene Kralı I. Antiochos’un başı.');
  add('tr-nemrut-3', 'Nemrut Dağı Günbatımı.jpg', 'Sayonlinecy', 'CC BY-SA 4.0',
    'Nemrut Dağı doğu terası (Adıyaman): oturan heykellerin önünde batan güneşi izleyen ziyaretçiler; yamaçta kar.');
  add('tr-tuz-1', 'Tuz Gölü, Lake Tuz, Salt Lake (52397353264).jpg', 'Sonse', 'CC BY 2.0',
    'Tuz Gölü: düz, ağaçsız kıyı, alçak tuz bitkileri ve ufuka uzanan tuzlu göl (kaynağın açıklamasına göre dünyanın en büyük hipersalin göllerinden).');
  add('tr-tuz-2', 'Tuz Gölü, Lake Tuz, Salt Lake (52397494360).jpg', 'Sonse', 'CC BY 2.0',
    'Tuz Gölü: tuz kabuğu ve alçak çalılar; çevrede ağaç yok.');
  add('tr-tuz-3', 'Salt lake, Tuz golu.jpg', 'Lethiciasouza', 'CC BY-SA 4.0',
    'Tuz Gölü: sığ, açık pembe renkli tuzlu su.');
  S['tr-zeytin'] = ['tr-zeytin-1'];
  S['tr-pamuk'] = ['tr-pamuk-1'];
  S['tr-pamukkale'] = ['tr-pamukkale-1', 'tr-pamukkale-2'];
  S['tr-nemrut'] = ['tr-nemrut-1', 'tr-nemrut-2', 'tr-nemrut-3'];
  S['tr-tuz'] = ['tr-tuz-1', 'tr-tuz-2', 'tr-tuz-3'];

  /* ---- Türkiye: yol numarası levhaları (D ve O numaraları gerçek levhada; Commons açıklaması/kategorisiyle doğrulandı) ---- */
  add('tr-yol-1', 'KınalıJunction.JPG', 'CeeGee', 'CC BY-SA 4.0',
    'Kınalı Kavşağı, Silivri (İstanbul): mavi yön levhasında yol numaraları çerçeveli kutuda yazıyor: D-110 (Marmara Ereğlisi, Tekirdağ, İpsala yönü) ve D-100 (Çerkezköy, Çorlu, Edirne, Kapıkule).');
  add('tr-yol-2', 'O3ExitSelimpaşa.JPG', 'CeeGee', 'CC BY-SA 4.0',
    'O-3 otoyolu Selimpaşa çıkışı (Silivri, İstanbul): yeşil levhada turuncu kutuda O-3 ve çerçeveli E-80; mavi çıkış panelinde çerçeveli D-100 (Selimpaşa).');
  add('tr-yol-3', 'D 400 Antalya - 23.6.15.JPG', 'Onur', 'CC BY-SA 4.0',
    'Antalya, Dumlupınar Bulvarı: mavi yön levhasında (Otogar, Havalimanı, Burdur, Isparta) altta çerçeveli D.400 yazıyor.');
  S['tr-yol'] = ['tr-yol-2', 'tr-yol-1', 'tr-yol-3'];

  /* Telefon numarası fotoğrafları (gerçek tabelalar; çoğunda alan kodu yazılmaz, yalnız yerel numara) */
  add('br-tel-2', 'Mister Pizza - Cabo Frio.jpg', 'Eduardo P', 'CC BY-SA 3.0',
    'Cabo Frio (Rio de Janeiro eyaleti): pizzacı tabelasında yalnızca yerel numara (2643.1983). DDD yazılı değil.');
  add('br-tel-3', 'China in Box - Laranjeiras.jpg', 'Eduardo P', 'CC BY-SA 3.0',
    'Rio de Janeiro, Laranjeiras: restoran tabelasında yalnız yerel numara (2556 2600), DDD yok. Dört hane + dört hane.');
  add('br-tel-4', 'Mister Pizza - Botafogo.JPG', 'Eduardo P', 'CC BY-SA 3.0',
    'Rio de Janeiro, Botafogo: pizzacı tabelasında yerel numara (2535·3333), DDD yok. Solda ayrı bir numara daha var (4002·3000).');
  add('br-tel-5', 'Grande China.jpg', 'Eduardo P', 'CC BY-SA 3.0',
    'Rio de Janeiro, Vila Isabel: restoran tabelasında iki yerel numara (2576-5149 ve 2578-3944), DDD yok.');
  /* ---- Brezilya: direk (gerçek fotoğraf) ---- */
  add('br-pole-1', 'Padre Cícero.jpg', 'Joelkaula', 'CC BY-SA 4.0',
    'Fortaleza (Ceará): dikdörtgen kesitli beton direk, gövdede dikey sıra küçük delikler, tepede çapraz kollar. Kuzeydoğu şehirlerinde görülen «merdiven» (çift T) tür; alt kısımdaki yuvalar teller yüzünden görünmüyor.');
  add('br-pole-2', 'Avbrasil.jpg', 'Andrevruas', 'CC BY-SA 4.0',
    'Belo Horizonte (Minas Gerais): kalın, yuvarlak, düz yüzeyli beton direk; tepede trafo ve sokak lambası kolu. Güneydoğu şehirlerinde yaygın tür.');
  S['br-direk-foto'] = ['br-pole-1', 'br-pole-2'];

  add('mx-tel-1', 'Puerto Vallarta dentist office.jpg', 'Stan Shebs', 'CC BY-SA 3.0',
    'Puerto Vallarta (Jalisco): tabelada cep numarası «044 322…» ile yazılmış. 044 eski önektir, 322 Puerto Vallarta\'nın bölge kodudur (LADA).');
  add('mx-tel-2', "Esquina de El X'cau, Mérida, Yucatán (01).JPG", 'Inri', 'CC0',
    'Mérida (Yucatán): «SE RENTA» afişinde yalnızca yerel numaralar (9 28 61 30…). LADA (999) yazılı değil.');
  add('tr-tel-1', "Urfalı Bedir'in Yeri kafe, İzmir'in Konak, Türkiye, 26 Mayıs 2005.jpg", 'akalan68', 'CC BY 3.0',
    'İzmir, Konak: lokanta tabelasında «Tel: 489 48 61 - 441 24 75», yalnızca yerel numara. Alan kodu (0 232) yazılı değil.');
  add('tr-tel-2', 'PonPon Çocuk Kulübü - panoramio.jpg', 'Aziz Akbiyik', 'CC BY-SA 3.0',
    'Feneryolu Sokağı levhasında yerel numaralar (414 17 87 - 418 33 77). Alan kodu yok.');
  add('kr-tel-1', '2012-05-11 shop signs in Insadong.jpg', 'Mario Sánchez Prada', 'CC BY-SA 2.0',
    'Seul, Insadong: dükkân tabelasında yalnızca yerel numara (T.734-6622). Seul kodu 02 yazılı değil.');

  /* Brezilya: kilometre levhası ve ek bölgesel görünüm (gözle doğrulandı) */
  add('br-km-1', 'Rodovia BR-485 km 7.jpg', 'Py4nf', 'CC BY 4.0',
    'BR-485, Itatiaia Milli Parkı (Rio de Janeiro): mavi kilometre levhası. Üstte yol kodu (BR-485), altta km 7.');
  add('br-km-2', 'Rodovia br460 carmo de minas1.jpg', 'Py4nf', 'Public domain',
    'BR-460, Carmo de Minas (Minas Gerais): yol kenarında küçük mavi levha; üstte yol kodu, altta km 63.');
  add('br-soja-1', 'SojaBrasnorte.jpg', 'Marcelo Camargo/Agência Brasil', 'CC BY 3.0 br',
    'Brasnorte (Mato Grosso): uçsuz bucaksız düz soya tarlası, ağaçsız ufuk.');
  add('br-soja-2', 'Ronodonópolis colheita soja (Roosevelt Pinheiro) 28mar09.jpg', 'Roosevelt Pinheiro/ABr', 'CC BY 3.0 br',
    'Rondonópolis (Mato Grosso): soya hasadı, düz geniş tarla ve biçerdöver.');
  add('br-soja-3', 'Plantação de soja.jpg', 'Coloradogoias', 'CC BY-SA 3.0',
    'Montividiu (Goiás): yumuşak dalgalı arazide soya tarlası.');
  add('br-soja-4', 'PlantacaodeSoja.JPG', 'Tiago Fioreze', 'CC BY-SA 3.0',
    'Rio Grande do Sul: soya tarlası ve kırmızı toprak yol.');
  add('br-carn-1', 'Carnaúbas no Ceará.jpg', 'Otávio Nogueira', 'CC BY 2.0',
    'Ceará: sulak zeminde yelpaze yapraklı carnaúba palmiyeleri.');
  add('br-carn-2', 'Carnaubal - panoramio.jpg', 'Claudio Oliveira Lima', 'CC BY-SA 3.0',
    'Cruz (Ceará): carnaúba palmiyesi koruluğu, kurak çalılık zemin.');
  add('br-cafe-1', 'Município de Três Pontas (setembro de 2013).JPG', 'WOtP', 'CC BY-SA 3.0',
    'Três Pontas (Minas Gerais): yumuşak dalgalı arazide kahve sıraları ve uzakta şehir.');
  add('br-cafe-2', 'Café conilon Timbuí.JPG', 'Denis Rizzoli', 'CC BY-SA 3.0',
    'Timbuí (Espírito Santo), BR-101 kenarı: yamaçta sık kahve (conilon) sıraları.');
  S['br-km'] = ['br-km-1', 'br-km-2'];
  S['br-soja'] = ['br-soja-1', 'br-soja-2', 'br-soja-3', 'br-soja-4'];
  S['br-carn'] = ['br-carn-1', 'br-carn-2'];
  S['br-cafe'] = ['br-cafe-1', 'br-cafe-2'];

  /* Hindistan: bölge yazılı yön levhaları, gerçek fotoğraf (hepsi gözle okundu) */
  add('in-dir-kn-1', 'Shaamanur.jpg', 'Irrigator', 'CC BY-SA 3.0',
    'Shamanur (Davanagere, Karnataka): yeşil yön levhası. Her panelde üstte Kannada yazısıyla ad, altında İngilizce: ಶಾಮನೂರು / SHAMANUR (sol ok), ದಾವಣಗೆರೆ ಟೌನ್ / DAVANAGERE TOWN (sağ ok).');
  add('in-dir-gu-1', 'Mehsana 02.jpg', 'Bernard Gagnon', 'CC BY-SA 3.0',
    'Mehsana (Gujarat): kavşak levhası. Her ad önce Gujarati, altında İngilizce yazılı: મોટેરા / MODHERA 25, મહેસાણા / MEHSANA 00; en üstte પાલનપુર / PALANPUR 68; altta S.H.41 (eyalet yolu).');
  add('in-dir-bn-1', 'Basanti Highway - SH 3 - Catholic Church Area - Basanti - South 24 Parganas 2016-07-10 4698.JPG', 'Biswarup Ganguly', 'CC BY 3.0',
    'Basanti (South 24 Parganas, Batı Bengal), SH 3: yön levhası. Her panelde üstte İngilizce ad ve uzaklık (GODHKHALI 10 K.M., GOSABA 12 K.M.), altında aynı bilgi Bengal yazısı ve Bengal rakamlarıyla.');
  add('in-dir-pa-1', 'Sign board (Fazilka).jpg', 'Stalinjeet', 'CC BY-SA 4.0',
    'Fazilka (Pencap), NH 07: yön levhası. Her satırda üstte Gurmukhi (Pencapça), altında İngilizce ad: SULEMANKI BORDER 12.500 KM, AASFWALA WAR MEMORIAL 5.500 KM; altta P.W.D. B&R PUNJAB.');
  add('in-dir-mr-1', 'Sant Tukaram Maharaj Square, National Highway 6 - panoramio.jpg', 'Ganesh Dhamodkar', 'CC BY 3.0',
    'Maharashtra, Sant Tukaram Maharaj Meydanı (NH 6): levhalar yalnız Marathi (Devanagari) yazılı: संत तुकाराम महाराज चौक, राष्ट्रीय महामार्ग क्र. ६, इतवारी, छत्रपती नगर, कृषी उत्पन्न बाजार समिती, भंडारा. İngilizce satır yok.');
  add('in-dir-mr-2', 'Sion Panvel Highway Sign.jpeg', 'Abhijitsathe', 'CC BY-SA 3.0',
    'Sion–Panvel Otoyolu (Maharashtra): yön levhaları. Üstte Devanagari, altında İngilizce: औद्योगिक क्षेत्र / M.I.D.C., ज.ने.प.न्यास/उरण / J.N.P.T. / URAN, पनवेल / PANVEL.');
  add('in-dir-ml-1', 'A sign board in NH 208.jpg', 'Akhilan', 'CC BY-SA 2.5',
    'NH 208 üzerindeki levha (Kerala kategorisinde): her satırda üstte İngilizce ad ve uzaklık (THIRUMANGALAM 188 Km, KUTTALAM 49 Km, KOTTAVASAL 31 Km), altında Malayalam yazısı (തിരുമംഗലം, കുറ്റാലം, കോട്ടവാസൽ).');
  add('in-dir-ml-2', 'Vyttila junction NHAI sign board.jpg', 'Casianjoseph', 'Public domain',
    'Vyttila kavşağı (Kochi): NHAI levhası, üç satır: Malayalam വൈറ്റില, Hindi (Devanagari) वैटिला, İngilizce VYTTILA.');
  add('in-dir-or-1', 'Route Confirmation Sign - NH 16 - Gopalpur - Cuttack 2018-01-26 0210.JPG', 'Biswarup Ganguly', 'CC BY-SA 4.0',
    'Odisha, NH 16: yön levhası. Her panelde üç satır: İngilizce (KOLKATA 416 KM), Hindi (कोलकाता ४१६ कि.मी.), Odia (କୋଲକାତା ୪୧୬ କି.ମି.); rakamlar da yazıya göre değişir.');
  S['as-knda'].push('in-dir-kn-1');
  S['as-gujr'].push('in-dir-gu-1');
  S['as-beng'].push('in-dir-bn-1');
  S['as-guru'].push('in-dir-pa-1');
  S['as-deva'].push('in-dir-mr-1', 'in-dir-mr-2');
  S['as-mlym'].push('in-dir-ml-1', 'in-dir-ml-2');
  S['as-orya'].push('in-dir-or-1');

  /* ---- Japonya: bölgesel gövde şeridi (gerçek fotoğraf; gözle görüldü) ---- */
  add('jp-str-kyu-1', 'The Birthplace of the Prime minister HIROTA Kohki.jpg', 'Hot cake syrup', 'CC BY-SA 3.0',
    'Fukuoka (Kyushu): sarı-siyah şerit, siyah bölümlerde kabartma noktalar (yansıtıcı bantta tanecik doku) görünüyor. Kyushu’da şeridin ortasındaki koyu yansıtıcılar için verilen ipucuyla uyumlu.');
  add('jp-str-kan-1', 'Hana Hostel (14176139664).jpg', 'tenz1225', 'CC BY-SA 2.0',
    'Kyoto (Kansai): koyu direkte dört geniş sarı-turuncu dikey çubuk, aralarında siyah. Şerit düz dikey tür; bu fotoğraf renk solmasını göstermez, yalnız düz dikey biçimi.');
  S['jp-str-kyu'] = ['jp-str-kyu-1'];
  S['jp-str-kan'] = ['jp-str-kan-1'];
  S['jp-str'] = ['jp-str-kyu-1', 'jp-str-kan-1'];

  /* ---- Görünüm: özgün boyut (d), kırpma (crop) ve işaretler (marks). Kırpma levhayı büyütür; işaretler yazının NEREDE olduğunu gösterir. ---- */
  function view(k, d, crop, marks) {
    var p = P[k]; if (!p) return;
    p.d = d; if (crop) p.crop = crop; if (marks) p.marks = marks;
  }
  view('jp-toh-1', [1600, 1200], [0.33, 0.4, 0.38, 0.28], [
    [0.45, 0.455, 0.14, 0.165, 'Sarı levha: solda şirket logosu, yanında hat adı 馬鹿川枝線 (Bakagawa kolu); altında kalın dikey çizgi.']]);
  view('kr-border-1', [4608, 3456], [0.63, 0.32, 0.24, 0.24], [
    [0.667, 0.376, 0.173, 0.094, 'Üst panel: büyük Hangul il adı 강원도 ve altında Latin yazılışı Gangwon-do.'],
    [0.667, 0.481, 0.173, 0.035, 'Alt panel: ilçe adı 홍천군 (Hongcheon).']]);
  view('kr-border-2', [3264, 2448], [0.2, 0.25, 0.57, 0.48], [
    [0.277, 0.338, 0.43, 0.172, 'Üst panel: Hangul 서울특별시 (Seul Özel Şehri) ve Latin «Seoul».'],
    [0.259, 0.518, 0.452, 0.119, 'Alt panel: ilçe adı 금천구 (Geumcheon).']]);
  view('kr-dir-1', [3264, 2448], [0.22, 0.15, 0.55, 0.37], [
    [0.286, 0.232, 0.13, 0.113, 'Büyük Hangul ad (부산) ve altında küçük Latin yazılışı (Busan).'],
    [0.286, 0.363, 0.178, 0.095, 'İkinci yön: 대구, 김천 = Daegu, Gimcheon.'],
    [0.603, 0.248, 0.093, 0.192, 'Sağdaki yön: 부산 Busan ve 창원 Changwon.']]);
  view('vn-km-1', [1024, 768], [0.1, 0.33, 0.32, 0.45], [
    [0.211, 0.419, 0.061, 0.05, 'Kırmızı tepe: yol numarası (QL1) ve yolun başından itibaren kilometre (Km 119).'],
    [0.211, 0.464, 0.061, 0.105, 'Beyaz gövde: gidilecek yer ve uzaklık (L.SƠN 103Km = Lạng Sơn’a 103 km).']]);
  view('vn-km-2', [2560, 1920], [0.22, 0.35, 0.42, 0.45], [
    [0.363, 0.452, 0.124, 0.084, 'Kırmızı tepe: yol numarası (QL 4E) ve «Km 21».'],
    [0.363, 0.536, 0.128, 0.16, 'Beyaz gövde: gidilecek yer ve uzaklık (PHỐ LU 12 Km); yan yüzde yol numarası.']]);
  view('vn-km-3', [4592, 3056], [0.55, 0.25, 0.42, 0.55], [
    [0.718, 0.347, 0.178, 0.123, 'Kırmızı tepe: yol numarası ve «Km 2301».'],
    [0.712, 0.47, 0.19, 0.236, 'Beyaz gövde: gidilecek yer ve uzaklık (CẢNG MỚI 1 Km).']]);
  view('in-dir-te-1', [3456, 2304], [0.17, 0.36, 0.66, 0.26], [
    [0.215, 0.425, 0.58, 0.05, 'Üst satır: yer adları Telugu yazısıyla (కావలి, విజయవాడ, బాలాసోర్, కోల్కతా).'],
    [0.215, 0.51, 0.58, 0.05, 'Alt satır: aynı adlar İngilizce (KAVALI, VIJAYAWADA, BALASORE, KOLKATTA); ortadaki sayı uzaklıktır.']]);
  view('in-dir-ta-1', [2304, 1728], [0.02, 0.29, 0.62, 0.24], [
    [0.054, 0.328, 0.17, 0.048, 'Üst satır: Tamil yazısı (கோயமுத்தூர்).'],
    [0.054, 0.378, 0.17, 0.045, 'Orta satır: Hindi, Devanagari yazısı (कोयम्बटोर).'],
    [0.054, 0.428, 0.17, 0.048, 'Alt satır: İngilizce (Coimbatore).']]);
  view('in-mile-1', [3959, 5938], [0.22, 0.3, 0.58, 0.62], [
    [0.3, 0.36, 0.42, 0.105, 'Turuncu üst bant: köy yolu rengi.'],
    [0.305, 0.51, 0.41, 0.08, 'Yer adı Kannada yazısıyla.'],
    [0.31, 0.63, 0.39, 0.13, 'Uzaklık: 3.31.']]);
  view('in-mile-2', [540, 484], null, [
    [0.28, 0.27, 0.46, 0.2, 'Yer adı Telugu yazısıyla (పెనమలూరు).'],
    [0.46, 0.51, 0.15, 0.2, 'Uzaklık sayısı: 1.']]);
  view('in-mile-3', [3072, 2304], [0.2, 0.0, 0.55, 0.85], [
    [0.34, 0.215, 0.31, 0.08, 'Kırmızı yazı: yükseklik, 710 metre.'],
    [0.36, 0.31, 0.27, 0.28, 'Yer adı Devanagari yazısıyla: पुराना कांगड़ा (Purana Kangra).'],
    [0.44, 0.6, 0.1, 0.17, 'Sıfır: bu taş mesafe sayımının başlangıcıdır.']]);
  view('jp-wrap-1', [1280, 960], [0.0, 0.0, 0.5, 0.95], [
    [0.088, 0.05, 0.04, 0.26, 'Levhalar: küçük beyaz, yazı dikey akıyor (üstteki levhada numara).'],
    [0.052, 0.525, 0.105, 0.37, 'Gövde şeridi: kalın sarı-siyah dikey şerit, direğin alt kısmında.']]);
  view('jp-wrap-2', [4256, 2832], [0.03, 0.0, 0.3, 0.92], [
    [0.12, 0.31, 0.055, 0.3, 'Levhalar: sarı-beyaz, dikey yazılı.'],
    [0.115, 0.69, 0.065, 0.115, 'Gövde şeridi: sarı-siyah dikey şerit.']]);
  view('jp-str-kyu-1', [2012, 1403], [0.52, 0.66, 0.2, 0.3], [
    [0.606, 0.747, 0.064, 0.138, 'Gövde şeridi: sarı-siyah dikey; siyah bölümlerde kabartma noktalı yansıtıcı doku.']]);
  view('jp-str-kan-1', [2584, 4592], [0.7, 0.76, 0.2, 0.18], [
    [0.772, 0.801, 0.082, 0.108, 'Gövde şeridi: dört geniş sarı-turuncu dikey çubuk, aralarında siyah.']]);
  view('br-tel-3', [2570, 1869], [0.0, 0.3, 0.55, 0.4], [
    [0.05, 0.465, 0.235, 0.09, 'Yerel numara: 2556 2600. Parantez içinde DDD yok.']]);
  view('br-tel-4', [1024, 768], [0.0, 0.0, 1, 0.6], [
    [0.765, 0.37, 0.19, 0.05, 'Yerel numara: 2535·3333. DDD yazılı değil.'],
    [0.245, 0.2, 0.14, 0.07, 'Soldaki ayrı numara: 4002·3000.']]);
  view('br-tel-5', [3240, 4320], [0.0, 0.15, 0.8, 0.3], [
    [0.088, 0.233, 0.208, 0.042, 'İki yerel numara: 2576-5149 ve 2578-3944. DDD yok.']]);
  view('br-pole-1', [3264, 2448], [0.15, 0.0, 0.3, 0.7], [
    [0.28, 0.01, 0.034, 0.65, 'Beton direk gövdesi: dikdörtgen kesit, dikey sıra küçük delikler; tepede çapraz kollar.']]);
  view('br-pole-2', [3072, 4080], [0.0, 0.0, 0.5, 1], [
    [0.0, 0.03, 0.11, 0.93, 'Yuvarlak beton direk: kalın, düz yüzeyli; tepede trafo ve lamba kolu.']]);
  view('ru-route-5', [3480, 2357], [0.612, 0.475, 0.105, 0.13], [
    [0.6326, 0.4943, 0.0156, 0.0108, 'Kırmızı kutu: yol numarası Р-23.'],
    [0.6339, 0.5078, 0.0138, 0.0104, 'Yeşil kutu: Avrupa yolu numarası E95.'],
    [0.6522, 0.4932, 0.0495, 0.032, 'Yer adları önce Kiril, sonra Latin: ЛУГА / LUGA, С.-ПЕТЕРБУРГ / St. PETERSBURG.']]);
  view('ru-route-6', [1712, 2288], [0.48, 0.29, 0.32, 0.12], [
    [0.525, 0.3218, 0.0767, 0.0588, 'Yön oku: yol bu yönde devam ediyor.'],
    [0.6064, 0.3218, 0.159, 0.0588, 'Harf + sayı: М 52. Harf yol sınıfını (М, Р, А), sayı yolun numarasını söyler.']]);
  view('ru-km-1', [5760, 4312], [0.25, 0.25, 0.65, 0.62], [
    [0.38, 0.378, 0.444, 0.294, 'Mavi plaka: kilometre sayısı (16) ve РОСАВТОДОР.']]);
  view('ru-km-2', [5053, 3369], [0.5, 0.1, 0.5, 0.7], [
    [0.73, 0.41, 0.055, 0.055, 'Mavi kilometre plakası: 544.']]);
  view('tr-bin-1', [4032, 3024], [0.0, 0.1, 0.6, 0.7], [
    [0.23, 0.435, 0.22, 0.185, 'Konteynerin ön yüzüne boyayla belediye adı (ORTAHİSAR BELEDİYESİ) ve telefon (444 61 44) yazılmış.']]);
  view('tr-bin-2', [2592, 3872], [0.2, 0.05, 0.6, 0.6], [
    [0.41, 0.375, 0.25, 0.235, 'Kovanın ön yüzünde belediyenin amblemi ve adı (AMASRA BELEDİYESİ).']]);
  view('tr-bin-3', [3000, 4000], [0.25, 0.14, 0.5, 0.55], [
    [0.43, 0.14, 0.19, 0.19, 'Belediye adı (SELÇUKLU BELEDİYESİ) ve «KONYA · 1989» mührü.'],
    [0.44, 0.575, 0.17, 0.075, '444 ile başlayan numaralar yer söylemez (alan kodu değildir).']]);
  view('tr-yol-1', [3686, 2432], [0.5, 0.05, 0.42, 0.7], [
    [0.798, 0.226, 0.08, 0.036, 'D-110: Marmara Ereğlisi, Tekirdağ, İpsala yönü.'],
    [0.633, 0.335, 0.108, 0.044, 'D-100: Çerkezköy, Çorlu, Edirne, Kapıkule yönü.']]);
  view('tr-yol-2', [3636, 2352], [0.55, 0.05, 0.4, 0.62], [
    [0.629, 0.162, 0.077, 0.058, 'O-3: otoyol numarası, turuncu kutuda.'],
    [0.716, 0.162, 0.085, 0.058, 'E-80: Avrupa yolu numarası, çerçeveli.'],
    [0.723, 0.458, 0.1, 0.045, 'D-100: çıkıştaki devlet yolu numarası (Selimpaşa).']]);
  view('tr-yol-3', [2592, 1728], [0.4, 0.1, 0.32, 0.28], [
    [0.502, 0.275, 0.082, 0.04, 'D.400: devlet yolu numarası, levhanın altında çerçeveli.']]);
  view('br-tel-2', [4320, 3240], [0.05, 0.07, 0.7, 0.35], [[0.14, 0.2, 0.44, 0.1, 'Yerel numara: 2643.1983. DDD yazılı değil.']]);
  view('mx-tel-1', [1800, 1403], [0.08, 0.3, 0.34, 0.55], [[0.243, 0.535, 0.07, 0.032, 'Cep numarası: 044 322… Burada 322 bölge kodudur (Puerto Vallarta).'], [0.126, 0.73, 0.108, 0.026, 'Yan dükkân: Cel. 044 322-111-… aynı kod.']]);
  view('mx-tel-2', [4000, 3000], [0.15, 0.55, 0.7, 0.45], [[0.22, 0.86, 0.58, 0.14, 'Yalnızca yerel numaralar; LADA yazılı değil.']]);
  view('tr-tel-1', [3264, 2448], [0.08, 0.2, 0.86, 0.3], [[0.28, 0.37, 0.42, 0.065, 'Yalnızca yerel numara; alan kodu yazılı değil.']]);
  view('tr-tel-2', [1680, 2800], [0.18, 0.22, 0.68, 0.22], [[0.27, 0.325, 0.45, 0.04, 'Yalnızca yerel numaralar; alan kodu yazılı değil.']]);
  view('kr-tel-1', [3595, 2397], [0, 0.68, 0.85, 0.32], [[0.62, 0.9, 0.14, 0.085, 'Yerel numara: 734-6622. Seul kodu 02 yazılı değil.']]);
  view('br-km-1', [4608, 3456], [0.35, 0.05, 0.65, 0.9], [[0.665, 0.23, 0.29, 0.15, 'Üstte yol kodu: BR-485.'], [0.67, 0.5, 0.28, 0.35, 'Altta kilometre: km 7.']]);
  view('br-km-2', [2048, 1536], [0.3, 0.15, 0.65, 0.7], [[0.645, 0.44, 0.09, 0.16, 'Küçük mavi levha: BR-460, km 63.']]);
  view('in-dir-kn-1', [1728, 2538], [0.1, 0.04, 0.85, 0.2], [[0.204, 0.075, 0.335, 0.128, 'Sol panel: Kannada ಶಾಮನೂರು, altında SHAMANUR; ok sola.'], [0.542, 0.075, 0.35, 0.128, 'Sağ panel: Kannada ದಾವಣಗೆರೆ ಟೌನ್, altında DAVANAGERE TOWN; ok sağa.']]);
  view('in-dir-gu-1', [1788, 2562], [0.1, 0.24, 0.8, 0.32], [[0.19, 0.345, 0.65, 0.055, 'Üst satır: Gujarati yer adları (મોટેરા, મહેસાણા).'], [0.19, 0.456, 0.65, 0.048, 'Alt satır: aynı adlar İngilizce (MODHERA, MEHSANA).']]);
  view('in-dir-bn-1', [6016, 4000], [0.06, 0.15, 0.78, 0.2], [[0.285, 0.205, 0.185, 0.095, 'GOSABA paneli: üstte İngilizce ad ve 12 K.M., altında Bengal yazısıyla aynı bilgi.']]);
  view('in-dir-pa-1', [5456, 3632], [0.15, 0.4, 0.62, 0.23], [[0.18, 0.452, 0.25, 0.03, 'Gurmukhi satırı (Pencapça ad).'], [0.18, 0.485, 0.3, 0.026, 'Altında İngilizce ad: SULEMANKI BORDER.']]);
  view('in-dir-mr-1', [1733, 1298], [0.36, 0.22, 0.3, 0.5], [[0.39, 0.25, 0.245, 0.115, 'Sarı levha: संत तुकाराम महाराज चौक (Marathi).'], [0.39, 0.365, 0.245, 0.335, 'Yeşil levhalar: राष्ट्रीय महामार्ग क्र. ६, इतवारी, छत्रपती नगर … भंडारा; hepsi yalnız Devanagari.']]);
  view('in-dir-mr-2', [2268, 1701], [0.02, 0.24, 0.9, 0.22], [[0.045, 0.296, 0.225, 0.12, 'Üstte Devanagari औद्योगिक क्षेत्र, altında M.I.D.C.'], [0.32, 0.296, 0.227, 0.12, 'ज.ने.प.न्यास/उरण ve altında J.N.P.T. / URAN.'], [0.6, 0.296, 0.226, 0.109, 'पनवेल ve altında PANVEL.']]);
  view('in-dir-ml-1', [1944, 2592], [0.25, 0.13, 0.6, 0.65], [[0.285, 0.175, 0.5, 0.09, 'Üstte İngilizce THIRUMANGALAM 188 Km, altında Malayalam തിരുമംഗലം.'], [0.285, 0.495, 0.5, 0.115, 'KOTTAVASAL 31 Km ve altında Malayalam കോട്ടവാസൽ.']]);
  view('in-dir-ml-2', [700, 525], [0.25, 0.3, 0.45, 0.4], [[0.34, 0.39, 0.27, 0.22, 'Üstte Malayalam വൈറ്റില, ortada Hindi वैटिला, altta İngilizce VYTTILA.']]);
  view('in-dir-or-1', [6016, 4000], [0.04, 0.3, 0.58, 0.22], [[0.09, 0.355, 0.22, 0.03, 'Üstte İngilizce: KOLKATA 416 KM.'], [0.09, 0.40, 0.22, 0.033, 'Ortada Hindi: कोलकाता ४१६ कि.मी.'], [0.09, 0.44, 0.22, 0.035, 'Altta Odia: କୋଲକାତା ୪୧୬ କି.ମି.']]);
  view("ru-tat-1", [586, 692], [0.12, 0.44, 0.76, 0.42],
    [[0.25, 0.472, 0.5, 0.078, "Tatarca satırlar: Ә, Ө ve Һ harfleri (ТӨБӘК, МӘДӘНИ, ӘҺӘМИЯТКӘ)."]]);
  view("ru-tat-2", [5152, 3864], [0.02, 0.2, 0.96, 0.5],
    [[0.17, 0.33, 0.76, 0.07, "Tatarca satır: Ә ve Һ harfleri (ХЕЗМӘТ, ШӘҺӘРЕ)."]]);
  view("ru-tat-3", [2108, 1462]);
  view("ru-ba-1", [3264, 1836], [0.55, 0.36, 0.45, 0.42],
    [[0.645, 0.395, 0.355, 0.165, "Başkurtça iki satır: Һ, Ә, Ҙ ve Ү harfleri (ҺӘМ, ЗАКАЗДАРҘЫ, БИРЕҮ). Altındaki Rusça satırda bu harfler yok."]]);
  view("ru-ba-2", [3120, 4160], [0.15, 0.47, 0.55, 0.2],
    [[0.2, 0.505, 0.42, 0.075, "Başkurtça «Бөрйән районы»: Ө ve Ә harfleri. Altındaki Rusça satırda yok."]]);
  view("ru-cu-1", [3000, 4000], [0.08, 0.52, 0.84, 0.34],
    [[0.18, 0.606, 0.66, 0.045, "Çuvaşça ad «Ҫӗнӗ Шӑмӑрша»: Ҫ, Ӗ ve Ӑ harfleri."], [0.17, 0.754, 0.68, 0.045, "Çuvaşça karşılama cümlesi: Ӑ ve Ӗ harfleri."]]);
  view("ru-cu-2", [2592, 1944], [0.02, 0.0, 0.78, 0.26],
    [[0.36, 0.07, 0.38, 0.13, "Çuvaşça «Сӗнтӗрвӑрри» (Mariinskiy Posad): Ӗ ve Ӑ harfleri."]]);
  view("ru-ko-1", [1964, 2883], [0.0, 0.07, 1.0, 0.36],
    [[0.07, 0.312, 0.86, 0.088, "Komi dilinde «АРХИВ ЮКӦН»: noktalı Ӧ harfi."]]);
  view("ru-kl-1", [2795, 1996], [0.48, 0.22, 0.5, 0.55],
    [[0.58, 0.278, 0.26, 0.06, "Kalmukça başlık «ХАЛЬМГ ТАҢҺЧ»: Ң ve Һ harfleri."], [0.53, 0.598, 0.38, 0.1, "Kalmukça okul adı: Ә, Ү ve Ө harfleri."]]);
  view("ru-ud-1", [1675, 1134], [0.44, 0.28, 0.56, 0.34],
    [[0.5, 0.412, 0.47, 0.07, "Udmurtça «ГАЖАСА ӦТИСЬКОМ»: noktalı Ӧ harfi. Üstteki Rusça «Добро пожаловать» ile karşılaştırın."]]);
  view("as-deva-1", [3000, 4000]);
  view("as-deva-2", [3264, 2448]);
  view("as-deva-3", [3024, 4032]);
  view("as-beng-1", [2268, 4032]);
  view("as-beng-2", [552, 664]);
  view("as-guru-1", [1080, 459]);
  view("as-gujr-1", [2926, 2272]);
  view("as-gujr-2", [3687, 2074]);
  view("as-orya-1", [2898, 3391]);
  view("as-orya-2", [3024, 2419]);
  view("as-telu-1", [3092, 1740]);
  view("as-telu-2", [2592, 1944]);
  view("as-knda-1", [672, 1042]);
  view("as-knda-2", [4080, 3072]);
  view("as-mlym-1", [2048, 1536]);
  view("as-mlym-2", [987, 1280]);
  view("as-taml-1", [4000, 3000]);
  view("as-taml-2", [3648, 2736]);

  /* Endonezya: boyutlar, kırpma ve "nereye bak" kutuları */
  view('id-jawa-1', [3814, 5721], [0.1, 0.11, 0.88, 0.24], [[0.29, 0.232, 0.58, 0.06, 'Latin adın hemen altındaki ikinci satır Java yazısıdır (aksara Jawa).']]);
  view('id-jawa-2', [1023, 999], [0.05, 0.15, 0.9, 0.32], [[0.33, 0.3, 0.42, 0.075, 'Latin «JL SILIRAN LOR» adının altında Java yazısı satırı.']]);
  view('id-jawa-3', [1024, 768], [0.1, 0.36, 0.72, 0.3], [[0.23, 0.52, 0.48, 0.09, 'Latin adın altında uzun Java yazısı satırı.']]);
  view('id-sunda-1', [2322, 1790], [0.15, 0.5, 0.5, 0.34], [[0.3, 0.705, 0.14, 0.05, 'Latin «JL. BRAGA» adının altında küçük Sunda yazısı.']]);
  view('id-sunda-2', [577, 418], [0.1, 0.38, 0.8, 0.32], [[0.3, 0.565, 0.4, 0.075, 'Latin adın altında Sunda yazısı satırı.']]);
  view('id-bali-1', [3888, 2592], [0.05, 0.15, 0.9, 0.56], [
    [0.4, 0.295, 0.31, 0.075, 'Başlık satırının altında Bali yazısı.'],
    [0.15, 0.44, 0.79, 0.09, 'Adres ve telefon satırının altında Bali yazısı.'],
    [0.34, 0.59, 0.35, 0.08, 'Posta kodu satırının altında Bali yazısı.']]);
  view('id-bali-2', [1933, 1024], [0, 0, 1, 1], [[0.32, 0.24, 0.6, 0.14, 'Bali yazısı satırı; Latin «NPSN» kodunun üstünde.']]);
  view('id-pura-1', [3072, 2304], [0, 0, 1, 1], [[0.31, 0.04, 0.34, 0.62, 'Ortadan ikiye bölünmüş kule çifti: candi bentar, Bali tapınak kapısı.']]);
  view('id-lontara-1', [2736, 1824], [0, 0.42, 1, 0.4], [[0.1, 0.615, 0.88, 0.07, 'Lontara yazısı: Latin başlığın altında sivri, birbirinden kopuk işaretler.']]);
  view('id-gadang-1', [1600, 1200], [0, 0, 1, 1], [[0.2, 0.13, 0.62, 0.34, 'Gonjong: boynuz gibi yukarı sivrilen çatı uçları.']]);
  view('id-gadang-2', [4928, 3264], [0, 0, 1, 1], [
    [0.58, 0.1, 0.32, 0.34, 'Boynuz biçimli çatı uçları.'],
    [0.05, 0.0, 0.3, 0.35, 'Soldaki evlerde de aynı çatı uçları.']]);
  view('id-bolon-1', [6000, 3368], [0, 0, 1, 1], [
    [0.25, 0.02, 0.62, 0.6, 'Eyer gibi ortası çökük, uçları yukarı kalkık dev çatı.'],
    [0.36, 0.68, 0.42, 0.11, 'Gövdede kırmızı-beyaz süs şeridi.']]);
  view('id-bolon-2', [1280, 720], [0, 0, 1, 1], [[0.32, 0.0, 0.58, 0.74, 'Üçgen alınlık ve dev çatı.']]);
  view('id-tongkonan-1', [3000, 2000], [0, 0, 1, 1], [
    [0.02, 0.12, 0.43, 0.46, 'Tekne biçimli, iki ucu yukarı kalkık çatı.'],
    [0.46, 0.02, 0.5, 0.46, 'Karşıdaki evlerde de aynı çatı.']]);
  view('id-tongkonan-2', [4011, 3008], [0, 0, 1, 1], [
    [0.02, 0.02, 0.4, 0.36, 'Soldaki tongkonan çatıları.'],
    [0.58, 0.0, 0.4, 0.36, 'Sağdaki tongkonan çatıları.']]);

  /* Türkiye: boyutlar, kırpma ve "nereye bak" kutuları */
  view('tr-sign-ist', [4032, 3024], [0.1, 0.15, 0.8, 0.62], [
    [0.16, 0.585, 0.69, 0.12, 'Alt şerit: üstte küçük mahalle adı (GÖZTEPE MAHALLESİ), turkuaz şeritte ilçe adı (KADIKÖY).']]);
  view('tr-iski', [3456, 4608], [0.12, 0.17, 0.88, 0.66], [
    [0.39, 0.38, 0.26, 0.1, 'Ortada İSKİ logosu ve yazısı (İstanbul Su ve Kanalizasyon İdaresi).'],
    [0.32, 0.63, 0.3, 0.065, 'Kenar halkasında KANALİZASYON yazısı.']]);
  view('tr-ibb', [2939, 2960], [0, 0, 1, 1], [
    [0.42, 0.3, 0.18, 0.15, 'İBB logosu (İstanbul Büyükşehir Belediyesi).'],
    [0.43, 0.57, 0.16, 0.1, '«İBB F/O» yazısı.']]);
  view('tr-kadikoy', [2874, 3223], [0, 0.04, 1, 0.9], [
    [0.35, 0.2, 0.56, 0.4, 'Ortada «KADIKÖY BELEDİYESİ» yazısı: ilçe belediyesi.']]);
  view('tr-sign-ank', [3872, 2592], [0.1, 0.2, 0.84, 0.62], [
    [0.17, 0.665, 0.7, 0.115, 'Alt şerit: mahalle ve ilçe adı. «GÖKSU MAHALLESİ - ETİMESGUT» = Ankara’nın Etimesgut ilçesi.']]);
  view('tr-sign-izm', [11840, 5328], [0.25, 0.05, 0.5, 0.8], [
    [0.44, 0.1, 0.1, 0.14, 'Üstte İzmir Büyükşehir Belediyesi logosu (saat kulesi).'],
    [0.32, 0.61, 0.38, 0.1, 'Alt satır: mahalle adı (HUZUR MAHALLESİ).']]);
  view('tr-izmirbb', [5328, 11840], [0.12, 0.27, 0.76, 0.34], [
    [0.375, 0.38, 0.25, 0.16, 'Ortada yana yatık yazı: İZMİR BÜYÜKŞEHİR BLD. KANAL KAPAĞI.']]);
  view('tr-sign-brs', [3648, 2736], [0.03, 0.05, 0.94, 0.68], [
    [0.07, 0.1, 0.86, 0.58, 'Yeşil levha: beyaz çerçeve, beyaz harfler.']]);
  view('tr-konya', [4000, 2992], [0.2, 0, 0.8, 1], [
    [0.4, 0.07, 0.36, 0.52, 'Ortadaki halka: KOSKİ GENEL MÜDÜRLÜĞÜ · KANALİZASYON; ortada KOSKİ logosu.']]);
  view('tr-sakarya', [5328, 11840], [0.1, 0.25, 0.88, 0.4], [
    [0.44, 0.4, 0.24, 0.14, 'Ortada SASKİ logosu ve yazısı (Sakarya Su ve Kanalizasyon İdaresi).'],
    [0.105, 0.445, 0.09, 0.075, '«PAYZA KAYSERİ»: dökümcü firma adı, yer değil.']]);
  view('tr-kocaeli', [2106, 1863], [0.03, 0.12, 0.97, 0.84], [
    [0.28, 0.44, 0.48, 0.12, '«İSU İÇMESUYU»: İSU, Kocaeli Su ve Kanalizasyon İdaresi.']]);
  view('tr-canakkale', [2743, 3658], [0, 0.1, 0.96, 0.76], [
    [0.31, 0.37, 0.34, 0.09, 'Üçgenin altında «ÇANAKKALE BELEDİYESİ» yazısı.'],
    [0.16, 0.28, 0.28, 0.12, 'Kenarda KANALİZASYON yazısı.']]);
})(typeof window !== 'undefined' ? window : globalThis);

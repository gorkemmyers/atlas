# Atlas — GeoGuessr çalışma rehberi

Haritalı, çok bölgeli bir çalışma ve oyun aracı. Açılışta **Ana sayfa** gelir; üstteki sekmelerden bölgeni seçersin, seçtiğin bölgenin
kendi çalışma alanları açılır. Her bölgede **bölge tahminine en çok yarayan bir iki konu** çalışılır; "her şeyin olduğu" bir site değildir.

| Bölge | Çalışılan konu(lar) |
|---|---|
| **Vietnam** | Telefon alan kodları (tabelalarda hep var) ve 63 ilin yeri; il adı mantığı. |
| **Güney Asya** | Alfabeyi tanıyıp eyaleti tahmin etmek (17 yazı, 36 eyalet/birlik bölgesi). |
| **Rusya** | Federal yol numaraları (М-7 gibi; yol haritada çizgi olarak da görünür) ve cumhuriyetlerdeki ek harfler (Ә, Ө, Ү, Ҕ, Ӏ…). |
| **Türkiye** | Telefon alan kodları (numarada nerede durur, hangi numara yer söylemez); sokak levhası ve rögar kapağındaki belediye adı; bölgeyi gösteren manzara ve yapılar (çay, sera, Mardin taşı…); 81 il. |
| **Japonya** | Prefektörlük adlarını kanjiden okumak; elektrik direğinin levhası, bandı ve gövde şeridinden elektrik şirketini (bölgeyi) bulmak. |
| **Endonezya** | Tabelalardaki yerel yazılar (Java, Sunda, Bali, Lontara) ve geleneksel ev/çatı biçimleri. Plaka yok: oyunda bulanık. |
| **Brezilya** | Eyalet karayolu önekleri (SP-, MG-…) ve kilometre levhası, duvardaki DDD alan kodları, bölgeyi gösteren direk ile manzara (araucária, soya, kahve, carnaúba, caatinga kaktüsü…). |
| **Meksika** | Telefon alan kodları (LADA): ilk hane bölgeyi, eyalet kodları eyaleti verir; bölgeyi gösteren bitki ve manzara (cardón, agave, Maya evi, volkan). |
| **Güney Kore** | Hangul şehir/il adlarını (tabelada nerede ve nasıl yazıldığıyla) okumak ve telefon alan kodları. |

Her konunun kartları **gerçek fotoğraf** (Wikimedia Commons; altında yazar ve lisans) ya da **özgün çizimdir** ("Çizim: Atlas · özgün şematik çizim" satırıyla etiketli; tabelada ya da direkte nereye bakılacağını gösterir).
Çizimlerdeki yazı ve sayılar örnektir; çizimler çevrimdışı da görünür. Rusya yolları ayrıca haritada çizgi olarak çizilir (ayar penceresinde Yol çizgileri: Tümü · Seçili · Kapalı).

Ülke paketleri veri dosyalarıdır (`js/packs/*.js`); ortak motor (`js/country-engine.js`) hepsi için aynı ekranları kurar. Yeni ülke eklemek
ve mevcut olanı değiştirmek için **KURALLAR.md** dosyasını oku: şema, kalite kuralları ve yapılmaması gerekenler orada.
Arayüz Türkçe, yer adları orijinal yazımıyla.

## Nasıl açılır

- **En kolay yol:** `dist/vietnam-atlas.html` dosyasına çift tıkla. Tek dosyadır, sunucu gerekmez.
- Ya da klasördeki `index.html` dosyasını aç (aynı uygulama, ayrı CSS/JS dosyalarıyla).
- İnternet şart değil, ama bazı şeyler çevrimiçi gelir: gerçek tabela fotoğrafları Wikimedia Commons'tan çağrılır (çevrimdışıyken "Fotoğraf yüklenemedi" yazar; harita, kartlar, çizimler ve alıştırmalar yine çalışır). Hint yazıları (Devanagari, Tamil, Telugu…) çevrimiçiyken Google Fonts'tan Noto ailesiyle yüklenir; çevrimdışıyken cihazın kendi yazı tipleri kullanılır (telefonlarda çoğunlukla vardır). Fotoğrafları çevrimdışı kullanmak istersen `python3 tools/fetch_photos.py` (ayrıntı: KURALLAR.md > Fotoğraflar).
- Chrome/Edge (Chromium) üzerinde masaüstü ve telefon boyutlarında test edildi. Firefox ve Safari'nin güncel sürümlerinde de çalışması beklenir.

## Yapı: bölgeler ve çalışma alanları

Üç katman vardır:

1. **Ana sayfa** (açılış ekranı): nokta dokulu dünya haritası (kapsanan ülkeler yol plakası gibi işaretli), bölge karoları (alanlara göre gruplu), "Kaldığın yerden devam et" şeridi, günlük özet ve **Veri ve yedek**.
2. **Bölge sekmeleri** (en üstte, her bölge kendi renginde). Soldaki ev simgesi (geniş ekranda marka) Ana sayfaya döner.
3. **Çalışma alanları** (bölgeye göre değişir; telefonda altta, geniş ekranda ikinci sırada): her bölgenin ilk alanı **Genel**'dir. Genel, o bölgenin
   çalışma alanlarını ve önerilen çalışma sırasını gösterir; sıradaki adıma dokunursan doğru ekranı doğru kalıpla açar.

Adresler (bağlantı verirken ya da yer imi eklerken): `#ana`, `#vietnam`, `#vietnam-alankodlari`, `#guneyasya-alfabe` gibi. Eski adresler çalışmaya devam eder ve
yenisine taşınır: `#kesfet`, `#pratik`, `#simulasyon`, `#ilerleme`, `#alfabe`, `#rehber` ve `#vietnam-rehber` (İl adları'na), `#hindistan…` (Güney Asya'ya). Tanınmayan adres Ana sayfaya gider.

### Vietnam

Alt çubukta konu konu altı alan vardır. Her konu sayfasında üstte **Alıştır** düğmesi durur; ona basınca o konunun soruları açılır.

| Alan | Ne işe yarar |
|---|---|
| **Genel** | Alanlar ve önerilen sıra (5 adım). |
| **Bölgeler** | 8 bölge ve 3 kesim (Kuzey-Orta-Güney): harita bölgeye göre boyalı, her kartta bölgeyi tanıtan **ipuçları** (arazi, bitki örtüsü, yapılar) ve il çipleri. Altta **tüm illerin tablosu** (süzülür, sıralanır). **Alıştır → Bölgeler.** |
| **Alan kodları** | `02` + ikinci hane mantığı, kod aileleri, merdivenler, Mekong kümeleri, istisnalar, **telefon çözücü** (numarayı yaz, ili bul) ve 2017 öncesi eski kodlar. **Alıştır → Alan kodları.** |
| **İl adları** | Adın mantığı: güvenilirlik dağılımı, 13 kural ailesi, hızlı karar akışı, kural kartları, hece sözlüğü, bölge adlarının çözümü, eski birleşik adlar, tabela sözlüğü ve idari kademeler. **Alıştır → Adından tahmin et.** |
| **Simülasyon** | GeoGuessr gibi: bir ipucu görürsün (telefon tabelası, yol tabelası, manzara notu), haritaya iğne bırakırsın. Doğru ildeysen 5 000 puan, değilse mesafeye göre azalır. Kolay / Orta / Zor. 5 veya 10 tur, bölge kapsamı seçilebilir. Her turda **İpucu** düğmesi, puandan kesilmez. |
| **İlerleme** | Ustalık haritası, kategori çubukları, en zayıf noktalar, gün serisi, simülasyon rekoru. |

Üç konu sayfasında da haritaya dokunduğunda il özeti çıkar; **Kartı aç** tam il kartını getirir. Alt çubukta görünmeyen iki alan daha vardır (Genel'deki listeden ya da bağlantılardan açılır):

- **Pratik:** aralıklı tekrar (Leitner kutuları) ile soru oturumları. Hazır kalıplar: Adından tahmin et, Harita turu, Alan kodları, Bölgeler, Yerler ve merkezler, **Karma tekrar**, **Zayıf noktalarım**. Cevap şekli: haritaya dokunarak, şıklı veya yazarak. **Her soruda İpucu düğmesi** (`H`). Yanlışlar birkaç soru sonra geri gelir; oturum sonunda özet ve "hataları tekrar et". Bir konu sayfasından gelirsen alt çubukta o konu parlar.
- **Keşfet:** haritada ile dokun: ad, alan kodu, merkez, tanınan yerler, komşular, hatırlatıcı not ve adın mantığı. İl / alan kodu / yer adıyla ara (`/` tuşu). Renk kipleri: bölge, Kuzey-Orta-Güney, il adı ailesi, alan kodu ailesi.

### Güney Asya

| Alan | Ne işe yarar |
|---|---|
| **Genel** | Alanlar ve önerilen sıra (4 adım). |
| **Alfabe** | Hindistan, Bangladeş, Nepal, Butan, Sri Lanka ve çevresi için **yazı sistemi çalışması** (aşağıda). |
| **İlerleme** | Eyalet ustalık haritası (eyaletten yazıya ve haritada bul ortalaması), kategori çubukları, en zayıf yazılar. |

## Alfabe: yazıdan bölgeyi tahmin et

Hindistan'da bir tabelaya bakınca **hangi yazı** olduğunu görürsen eyaleti büyük ölçüde bilirsin. Bu ekran bunu öğretir.
Üç bölümü vardır:

- **Harita:** her eyalet, tabelalarında baskın olan yazıya göre boyanır (17 yazı). Eyalete ya da listeden bir yazıya dokun; kart
  yerel tabelayı (örnek yazı), baskın ve ikincil yazıları, karıştırabileceğin yazıları ve komşuların yazısını gösterir. Eyalet, kent, dil ya da yazı adıyla
  (hatta yerel yazıyla) arayabilirsin. Etiketler ad / yazı adı / kapalı.
- **Yazılar:** *Hızlı tanı* (sırayla sorulan sorularla yazıyı daralt: sağdan sola mı, üstte kesintisiz çizgi var mı…), her yazı için açılır kart
  (ayırt edici işaretler, en çok karıştığı yazılarla farkı, rakamlar, nerede görülür), *Aynı harf, farklı yazı* karşılaştırma tablosu (ka, ga, ma… on iki yazıda yan yana) ve tabela ipuçları (sınır geçişleri, dil politikası).
  Assam yazısıyla Bengali'yi ayıran ৰ / ৱ gibi dikkat noktaları ayrıca vurgulanır.
- **Alıştırma:** aynı aralıklı tekrar sistemi, beş soru türü: **yazıyı tanı** (tabela örneği → hangi yazı), **iki yazıdan hangisi** (benzer çiftler),
  **yazıdan bölgeye** (haritada dokun ya da şıklı), **eyaletten yazıya**, **eyalet haritası**. Her soruda İpucu (`H`) vardır; yanlışta ya da ipucuyla bildiğinde soru birkaç soru sonra yeniden gelir.
  Tabela sorusunda şıklardaki yerel yazı adları cevaptan sonra açılır, böylece eşleştirme yerine hatırlama çalışırsın.

Ayrıntılar ve sınırlar:

- Baskın yazı eyalet düzeyinde, **tabelalarda en çok gördüğün** yazıdır; ikinci yazılar ("ayrıca") karta ve soru açıklamasına yazılır. Üçlü dil
  tabelalarında (yerel yazı + Hintçe + İngilizce) yerel yazıya bakılır.
- Pakistan ve Myanmar haritada bağlam olarak vardır (Urdu / Birman yazısı); Bangladeş, Nepal, Butan ve Sri Lanka tam yer olarak sorulur.
- Küçük yerler (Delhi, Chandigarh, Goa, Lakshadweep…) parmakla tutturulamayacağı için dokunma tolerans alanı vardır.

## Telefonda kullanım

- **Dikey telefon:** üstte bölge sekmeleri (ev simgesi = Ana sayfa), altta o bölgenin çalışma alanları. Harita ekranı kaplar, panel altta durur. Panelin üstündeki tutamacı sürükleyerek ya da dokunarak **küçült / yarım / tam** boyuta getirirsin. Panel her ekranda kendiliğinden uygun boyuta gelir.
- **İpucu, Sonraki, Başlat** gibi her an gereken düğmeler panelin altında sabit durur.
- **Yan yatmış telefon:** solda dar bir şerit: en üstte bölge düğmesi (dokununca bölge seçici açılır: Ana sayfa ve tüm bölgeler), altında o bölgenin çalışma alanları; ortada harita, sağda panel.
- **Geniş ekran:** üst satırda marka ve bölge sekmeleri, altında çalışma alanları; solda harita, sağda panel.
- Bölge sayısı arttıkça üstteki bölge şeridi yana kayar (kenarlarda solma ipucu çıkar); telefonda her zaman ev simgesiyle Ana sayfaya dönebilirsin.

**Görünüm:** İsviçre (Swiss) tarzı bir kabuk: Inter yazı tipi, beyaz/siyah zemin, kalın siyah çizgiler, kırmızı vurgu. Üstüne gerçek tabela renkleri:
Vietnam'da alan kodu tabelaları tabela mavisi; Hindistan örnek tabelaları karayolu yeşili. Aynı iki renk bölge sekmelerinin, karoların ve genel bakışın rengidir (her bölgenin kendi tonu vardır). Kırmızı = hedef/yanlış, yeşil = doğru, mavi = tabela/bilgi, sarı = ipucu.
Açık ve koyu tema vardır; güneş/ay düğmesiyle değişir. Renkler ve yazı tipleri `css/style.css` başındaki değişkenlerden ayarlanır.

## Neden 63 il? (34 il yok)

Vietnam 1 Temmuz 2025'te 63 ili 34 idari birime indirdi. GeoGuessr'daki Street View görüntüleri, tabelalar ve telefon alan kodları ise
bu tarihten **öncesine** aittir; oyunda da 63 il mantığıyla karşılaşırsın. Bu yüzden uygulama yalnızca **63 ili** kullanır, 34'lü düzen kaldırıldı.
Plaka bilgisi de kaldırıldı: Street View'da plakalar bulanıktır, işe yaramaz.

## İl adından yer tahmini: ne kadar işe yarar?

Kısa cevap: **kısmen.** 63 ilin 44'ünün adı güvenilir bir ipucu taşır (30 güçlü, 14 iyi), 7'si zayıf ima eder,
12'si hiçbir şey söylemez. Adlar çoğunlukla Çince kökenli "iyi dilek" sözcükleridir (huzur, bolluk, uzun ömür);
asıl sağlam kuzey-güney sistemi **alan kodunda** yaşar. Uygulama bu dürüst ayrımı her yerde gösterir
(İl adları sayfasının başında güvenilirlik dağılımı, her il kartında "Güçlü / İyi / Zayıf / Yok" göstergesi).

Öğrettiği başlıca kurallar (hepsi `tools/verify-names.cjs` ile veriye karşı sınanır):

- **Bình kuralı (8/8):** adın *sonunda* Bình → Kuzey yarı (Thái Bình, Ninh Bình, Hòa Bình, Quảng Bình); *başında* Bình → Güney yarı (Bình Định, Bình Thuận, Bình Dương, Bình Phước).
- **Quảng zinciri:** Bình → Trị → Thiên → (Đà Nẵng) → Nam → Ngãi, kuzeyden güneye. Tuzak: Quảng Ninh en kuzeydoğuda.
- **Hà-** (4/4) ve **Bắc-** (3/3) ile başlayan iller Kuzey'dedir. `-Giang`'da öndeki sözcük yönü verir (Hà/Bắc → Kuzey; An/Kiên/Tiền/Hậu → Mekong).
- **Thanh · Nghệ · Tĩnh:** Thanh Hóa → Nghệ An → Hà Tĩnh, kuzeyden güneye.
- **Đắk · Kon · Gia (+ Lâm Đồng)** → Orta Yaylalar.
- **Çince gibi okunmayan yerel adlar** (Cà Mau, Sóc Trăng, Trà Vinh, Bạc Liêu, Bến Tre, Cần Thơ) → Mekong Deltası.
- **Anlamlı sözcükler:** Sơn dağ, Hải deniz, Tây batı, Biên sınır, Cao yüksek.
- **Dilek adları** (An, Ninh, Yên, Phú, Hưng, Vĩnh, Thái, Hòa, Khánh, Thọ…) hiçbir şey söylemez; bu 10 il için alan koduna güven.
- **Alan kodu:** `02` + ikinci hane kuzeyden güneye iner (20x kuzeydoğu … 29x Mekong).

Nerede: **İl adları** sayfası, **Keşfet → "İl adı mantığı" renk kipi** ve il kartındaki "Adın mantığı" bloğu,
**İl adları → Alıştır** ("Adından tahmin et" kalıbı).

## İpucu sistemi

- Pratik'te her soruda, Simülasyon'da her turda ve Alfabe alıştırmasında **İpucu göster** düğmesi (veya `H`) vardır. Her basışta bir adım açılır; adımlar yavaş yavaş ilerler.
- İpuçları sorunun cevabını **gizler** (maskelenir). Adımlar kademelidir, bu yüzden son adımlar daha geniş bir cevabı (bölge, yazı ailesi) ele verebilir. Bu bilerek böyledir: ipucu bir öğretme aracıdır.
- Haritası olan adımlara tıklayınca ilgili yerler yeniden vurgulanır.
- **İpucuyla bildiğin soru ustalığa sayılmaz:** Leitner kutusu yükselmez, doğru sayısına eklenmez, oturum özetinde "ipucuyla doğru" olarak ayrı görünür ve birkaç soru sonra yeniden sorulur. Simülasyon'da puan kesintisi yoktur.

## Önerilen çalışma sırası

Aynı sıra her bölgenin **Genel** ekranında da vardır; adıma dokunursan doğru ekran doğru kalıpla açılır.

**Vietnam**

1. **Bölgeler:** 8 bölgeyi ve ülkeyi Kuzey-Orta-Güney diye üçe bölmeyi oturt; kartlardaki bölge ipuçlarını oku.
2. **Alan kodları:** `02` + **ikinci hane** bölgeyi söyler (20x kuzeydoğu, 21x kuzeybatı, 22x Kızıl Nehir, 23x kuzey orta kıyı, 25x güney orta kıyı, 26x yaylalar, 27x güneydoğu, 29x Mekong; 24 Hà Nội, 28 Sài Gòn). Çözücüyle birkaç numara dene.
3. **İl adları:** Bình, Quảng, Hà-, Bắc- kurallarını oku; sonra **Alıştır** ile "Adından tahmin et".
4. **Pratik:** her konunun **Alıştır** düğmesi o konuyu açar; Genel'den "Harita turu" ve her gün birkaç dakika "Karma tekrar". Takıldığında İpucu'na bas, ama önce kendin dene.
5. **Simülasyon:** öğrendiklerini hızla sına. **İlerleme:** kırmızı kalan illere "Bu ili çalış" ile dön.

**Güney Asya**

1. **Alfabe → Harita:** renkleri tanı; Hindi kuşağının (Devanagari) ne kadar büyük olduğunu gör.
2. **Alfabe → Yazılar:** önce *Hızlı tanı*, sonra güney dört yazı (Telugu, Kannada, Malayalam, Tamil) ve Bengali / Assam çiftini ayrıntılı oku.
3. **Alfabe → Alıştırma:** "Yazıyı tanı" ve "İki yazıdan hangisi", ardından "Yazıdan bölgeye" ve "Eyalet haritası".
4. Zayıf kalanlar için "Zayıflarım" kalıbı; **İlerleme**'de eyalet ustalık haritasına bak.

## Klavye kısayolları

- **Genel:** harita odaktayken `+` / `-` yakınlaştır, ok tuşları kaydır, `0` tümünü göster. Çift tık / tekerlek / iki parmakla çimdikleme de çalışır.
- **Keşfet / Alfabe:** `/` (Keşfet) arama kutusuna gider.
- **Soru ekranları (Pratik, Alfabe):** `1`–`4` şık seç, `Enter` / `→` sonraki soru, **`H`** sıradaki ipucunu açar (yazı kutusundayken `H` normal harf olarak yazılır).
- **Simülasyon:** tahmin etmeden önce **`H`** ipucu açar; iğne bıraktıktan sonra `Enter` tahmin eder, sonra `Enter` sonraki tur.

## İlerlemen nerede saklanır?

Yalnızca bu tarayıcıda (`localStorage`, anahtar `vietatlas.v1`). Sunucuya hiçbir şey gönderilmez.
Alfabe sorularının kayıtları da aynı yerdedir (`as:` önekli anahtarlar).
Tüm bölgelerin ilerlemesi tek kayıttadır; **Ana sayfa → Veri ve yedek** bölümünden yedeği kopyalayıp başka cihazda **Yedeği yapıştır** ile yüklersin, istersen sıfırlarsın.
"Kaldığın yerden devam et" şeridi için son çalışma alanı da aynı kayıtta tutulur.
Tarayıcı verisini temizlersen ilerleme de gider; yedek almayı unutma.

## Klasör yapısı

```
index.html                  uygulama kabuğu (betik sırası önemlidir)
KURALLAR.md                 ÇALIŞMA KURALLARI: yeni bir şey eklemeden önce oku
GEMINI.md  AGENTS.md        yapay zekâ ajanları için kısa özet (Antigravity bunları kendiliğinden okur; ikisi de KURALLAR.md'ye yönlendirir)
css/style.css               tüm stiller (açık/koyu tema, bölge tonları)
js/regions.js               Vietnam ve Güney Asya kaydı + bölge kayıt defteri (ülke paketleri addCountry ile kendini ekler)
js/app.js                   kabuk: bölge sekmeleri, çalışma alanı çubuğu, bölge seçici, adres yönlendirme
js/view-hub.js              Ana sayfa;  js/view-overview.js  bölgenin Genel ekranı (kayıttan kurulur)
js/kit.js                   ORTAK BİLEŞENLER: harita ayarları (her haritada aynı), fotoğraf defteri, kaydırmalı galeri
js/map.js                   harita motoru (MapView)  ·  js/paint.js boyama  ·  js/sheet.js telefondaki alt panel
js/country-engine.js        ülke paketi motoru: Keşfet, konu rehberi, Pratik, Simülasyon, İlerleme (hepsi veriden kurulur)
js/packs/<ülke>.js          ülke paketleri (VERİ) ·  js/geo-<ülke>.js sadeleştirilmiş sınırlar (üretilmiş)
js/photos.js                fotoğraf kayıt defteri (Wikimedia Commons)  ·  js/photos-local.js yerel önbellek listesi
js/figures.js  js/figs-<ülke>.js   özgün çizimler: ortak çizim kütüphanesi (FIG) ve ülke çizimleri (46 çizim; kayıt defterine fotoğraflarla aynı galeriye girer)
js/routes-russia.js         Rusya federal yol çizgileri (OpenStreetMap, ODbL; sadeleştirilmiş)
js/routes-turkiye.js        Türkiye D ve O yol çizgileri (OpenStreetMap, ODbL; sadeleştirilmiş)
js/data.js names.js hints.js bank.js geo.js   Vietnam verisi ve ipucu motoru
js/scripts-data.js scripts-bank.js view-alfabe.js geo-asia.js   Güney Asya (alfabe çalışması)
js/_arsiv/                  kaldırılan ülkeler ve eski paketler (geri getirme: js/_arsiv/README.md)
dist/vietnam-atlas.html     tek dosyalık sürüm (python3 tools/bundle.py ile üretilir)
tools/                      paketleyici, doğrulayıcılar (verify-packs.cjs, qa_contract.py, route-regions.cjs…), fotoğraf araçları, çizim ve ekran görüntüsü araçları (figs_qa.py, shot.py)
```

Yeniden paketlemek için: `python3 tools/bundle.py`.

## Yeni ülke eklemek veya değiştirmek

Ülke paketi tek bir veri dosyasıdır; ekranları, haritası, pratiği ve simülasyonu motor kurar:

1. `js/geo-<ülke>.js` (sadeleştirilmiş sınırlar, `window.XX_GEO`) ve `js/packs/<ülke>.js` (`registerCountryPack({...})`) dosyalarını yaz.
2. İkisini `index.html` içinde `country-engine.js`ten sonra, `app.js`ten önce ekle.
3. `node tools/verify-packs.cjs` ve `python3 tools/qa_contract.py` temiz çıkana kadar düzelt.

Şema, "hangi konu eklenir / eklenmez" ölçütü, fotoğraf ve dil kuralları: **KURALLAR.md**. Vietnam ve Güney Asya (özel ekranlı bölgeler) için de
aynı dosyadaki §13'e bak.
Testler (Node 18+): `verify-packs.cjs` (tüm ülke paketleri), `verify-data.cjs`, `verify-names.cjs`, `test-bank.cjs`, `test-hints.cjs`, `test-geom.cjs`,
`verify-scripts.cjs` ve `test-scripts.cjs` (Alfabe). Fotoğraflar için `node tools/verify-photos.mjs` (internet gerekir): kayıt defterini Wikimedia Commons'a karşı sınar.
Çizimler için `python3 tools/figs_qa.py` (ızgara), Rusya yol çizgileri için `node tools/route-regions.cjs`, ekran görüntüsü için `python3 tools/shot.py` (Playwright ve Chrome gerekir).

## Veri kaynakları ve notlar

- **Ülke paketleri (Rusya, Türkiye, Japonya, Endonezya, Brezilya, Meksika, Güney Kore):** telefon alan kodları, il adları ve idari değişiklikler
  Wikipedia'nın ilgili sayfalarından (ör. "Area codes in Mexico by code", "Telephone numbers in South Korea", "Provinces of Turkey") ve
  resmî duyurulardan doğrulandı. Doğrulanmayan bilgi pakete **konmadı**; "bilmiyorum" boş kalır. Dünya değişikliklerine dikkat: Vietnam 2025'te 63 ili 34'e indirdi,
  Gwangju ile Güney Jeolla 1 Temmuz 2026'da birleşti, Güney Kore'de Gangwon (2023) ve Jeonbuk (2024) özel özerk il oldu; ilgili bölgelerin Genel sayfasında "bilgi kutusu" bunu açıklar.
- **Fotoğraflar:** Wikimedia Commons (serbest lisans). Her fotoğrafın altında yazar ve lisans görünür. Durum ve denetim: `tools/photo-review.html`.
- **Özgün çizimler:** her `js/figs-<ülke>.js` dosyasının başında çizimin dayandığı kaynaklar ve bilerek çizilmeyenler yazılıdır. Başlıca kaynaklar: Japonya direkleri için topluluk rehberleri (wikiwiki.jp/geoguessr,
  sloor.hatenablog.com, note.com yazarları, mititt.jp; ayrıntı KURALLAR.md §9d); Güney Kore için Karayolu Tabela Yönetmeliği (도로표지규칙) ve Wikipedia "Road signs in South Korea"; Vietnam için QCVN 41:2019 ve 41:2024/BGTVT ile
  Wikivoyage "Driving in Vietnam"; Hindistan için Wikipedia "Road signs in India", NHAI genelgesi ve IRC 67; Brezilya ve Meksika bitkileri ve manzaraları için Wikipedia ile kurumsal/bilimsel sayfalar (Gymnosperm Database, FAO, Embrapa,
  Feedipedia, San Diego Natural History Museum, Arizona-Sonora Desert Museum…); Türkiye alan kodu numarası için TELKODER/BTK numaralandırma özeti. Çizimler fotoğraf değildir; renk ve oran yaklaşıktır.
- **Rusya yol çizgileri:** © OpenStreetMap katkıcıları (ODbL, openstreetmap.org/copyright); ham veri sadeleştirildi, konum birkaç km sapabilir (`js/routes-russia.js`, `js/routes-turkiye.js`; KURALLAR.md §9c).

- **Alan kodları:** Vietnam Bilim ve Teknoloji Bakanlığı numaralandırma planı ve Wikipedia "Telephone numbers in Vietnam".
- **Vietnam sınırları:** Free-GIS-Data (nguyenduy1133) 2025 öncesi il sınırları; uygulama için sadeleştirildi.
- **Hindistan çevresi sınırları:** Natural Earth (kamu malı) 1. düzey idari sınırlar, sadeleştirilip birleştirildi (`tools/build-geo-asia.mjs`). Ülke sınırları ve
  tartışmalı bölgeler Natural Earth'ün çizimine göredir; bu uygulama siyasi sınırlar için bir kaynak değildir, yalnızca yazı çalışması için bir haritadır.
- **Yazı verisi (Alfabe):** yazıların ayırt edici özellikleri, karışan çiftler, rakamlar ve eyaletlerin baskın yazıları elle derlendi; her eyalet için "baskın yazı"
  tabelalardaki en yaygın yazıdır. Gerçekte karışık bölgeler vardır (ör. Mizoram'da Latin, Karnataka-Maharashtra sınırında Kannada/Marathi). Sonuçları GeoGuessr deneyiminle karşılaştır, gerekirse `js/scripts-data.js` içinde düzelt.
- **İl adı anlamları:** Sino-Vietnamca (Hán-Việt) sözcük anlamlarına dayanır; "kural" olarak sunulanlar veriye karşı sayılıp doğrulanmıştır,
  yine de adlar dilek ve gelenek sözcükleridir; bu yüzden güvenilirlik göstergesi (Güçlü / İyi / Zayıf / Yok) ayrıca verilir.
- Açık deniz adaları (Hoàng Sa, Trường Sa) haritaya dahil değildir; kıyıya yakın adalar (Phú Quốc, Côn Đảo, Cát Bà …) vardır.
- Yer adı ve "hatırlatıcı" notlar GeoGuessr'da işe yarayan ayırt edici özelliklere odaklanır; tam bir ansiklopedi değildir.

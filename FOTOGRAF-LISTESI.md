# Fotoğraf avı listesi (bilgisayarda, Chrome bağlıyken)

Amaç: şu an yalnızca **çizimle** desteklenen kartlara gerçek Commons fotoğrafı eklemek. Çizimler kalır; fotoğraf aynı karta (aynı `set` kümesine) ya da yeni kümeye eklenir.
Yöntem ve kurallar: `KURALLAR.md` §9.1–§9.3b (yalnızca Wikimedia Commons; CC0/PD/CC BY/CC BY-SA; yazar ve lisans Commons API'sinden; alt yazı yalnızca fotoğrafta okunanı söyler; yazı küçükse `view(...)` ile `crop` + `marks`).
Önce `tools/photo-review.html` ve `js/photos.js` sonundaki örnek `view(...)` satırlarına bak; bitince `node tools/verify-photos.mjs`, `node tools/verify-packs.cjs`, `python3 tools/qa_contract.py`, 390 px ekran görüntüsü.

> Aşağıdaki Commons kategori/arama adları **tahminidir**: bulunamayanı değiştir, bulunanı API ile doğrula (§9.3b). "Fotoğraf bulunamazsa kart eklenmez" kuralı geçerlidir; çizim zaten durur.

## Durum
- 16 Kasım 2026: Meksika `yerel` tamam (cardón, saguaro, agave, Maya evi, karlı volkan, kurak plato). Çam–meşe dağı için uygun fotoğraf bulunamadı.
- 16 Kasım 2026: Brezilya `yerel` tamam (araucária, açaí, babaçu, caatinga, cerrado, pampa, Pantanal, Amazon). Direk türleri için net fotoğraf bulunamadı.
- 16 Kasım 2026: Japonya `elektrik`: Commons'ta etiketli levha yok denecek kadar az; yalnızca Tohoku levhası eklendi (`jp-toh-1`). Kalan 9 şirket, şeritler ve Shikoku bandı fotoğraf bekliyor; başka bir kaynak (kendi çekimin ya da lisanslı fotoğraf) gerekir.
- 16 Kasım 2026: Rusya `yollar`: resmî levha çizimleri eklendi (`ru-route`). Yol üstünde çekilmiş, rota işareti okunan gerçek fotoğraf bulunamadı.
- 16 Kasım 2026: Güney Kore: il sınırı levhası (2) ve Hangul+Latin yön levhası (1) eklendi; kurum tabelası (면사무소 vb.) ve telefon numarası fotoğrafı bulunamadı.
- 16 Kasım 2026: Vietnam: km direği fotoğrafı (3) eklendi (tepede yol no + Km, gövdede gidilecek yer ve uzaklık); çizimdeki "direkte yer adı yoktur" notu bu fotoğraflara göre düzeltildi. Yön/kurum/telefon ve il sınırı fotoğrafları sırada.
- 16 Kasım 2026: Hindistan: Telugu ve Tamil yön levhası (2) ile Kannada, Telugu, Devanagari mil taşı (3) eklendi; Bengal/Odia ve Malayalam levha adayları okunaklı olmadığı için alınmadı.

## Öncelik sırası
1. Meksika `yerel` (cardón/saguaro, agave, Maya evi, karlı volkan, kurak plato, çam-meşe dağı): doğa fotoğrafı bulmak kolay, etkisi yüksek.
2. Brezilya `yerel` (direk üç tür, araucária, açaí, babaçu, caatinga; ek: cerrado, pampa, Pantanal, Amazon): direk fotoğrafı zor, bitkiler kolay.
3. Japonya `elektrik` (10 şirketin levhası, 4 şerit türü, üst bant): en çok işe yarar ama en zor bulunur; yazısı okunan, yakın çekim levha gerekir.
4. Rusya karayolu levhası / rota işareti (çizilemedi, §9b): M/Р/А harfli yön levhası ve kilometre taşı fotoğrafı bulunursa `yollar` konusuna fotoğraf kartı olur.
5. Güney Kore / Vietnam / Hindistan: il adının levhada yazıldığı gerçek yön ve kurum tabelaları (çizimin yanına).
6. Kore ve Vietnam il sınırı levhaları, Brezilya karayolu kalkanı (çizilemedi): okunaklı, il adı görünen fotoğraflar.

## Kart kart hedef

| Ülke / konu | Kart (`id`, mevcut çizim kümesi) | Aranacak fotoğraf (hepsi o ülkede çekilmiş) | Örnek Commons aramaları | Fotoğrafta mutlaka görünmeli |
|---|---|---|---|---|
| Meksika `yerel` | `mx-cardon` (`mx-cardon1`) | Cardón: kalın gövde, alçaktan dik dallar; Saguaro: ince sütun, dirsekli kollar; mümkünse ikisi ayrı fotoğraf | `Pachycereus pringlei`, `Carnegiea gigantea`, `cardón Baja California`, `saguaro Sonora` | Alt yazıdaki tür gerçekten o türse (kolların biçimi); çekim yeri Baja California/Sonora |
| | `mx-agave` (`mx-agave1`) | Sıralı mavi agave tarlası, kırmızı toprak (Tequila çevresi, Jalisco) | `Agave tequilana Jalisco`, `Tequila Jalisco agave fields`, `Paisaje agavero` | Sıra düzeni ve renk; yer Jalisco/Nayarit/Michoacán/Guanajuato |
| | `mx-maya` (`mx-maya1`) | Sazla örtülü, oval planlı, beyaz duvarlı Maya evi; düz alçak orman | `Maya house Yucatán`, `casa maya Yucatán`, `Yucatán dry forest` | Oval/yuvarlak uçlar, saz çatı; yer Yucatán Yarımadası |
| | giriş: Karlı volkan, Kurak iç plato, Çam–meşe dağları (şu an görselsiz) | Popocatépetl/Iztaccíhuatl/Pico de Orizaba uzaktan; Chihuahua çölü gobernadora-yucca düzlüğü; Sierra Madre Occidental çam-meşe | `Iztaccíhuatl Puebla`, `Chihuahuan Desert Coahuila`, `Sierra Madre Occidental pine oak` | Yeni `visuals` kartı + yeni küme (`mx-volcan1` vb.), kartta `ids` giriş `ids`'iyle aynı |
| Brezilya `yerel` | `br-direk` (`br-direk`) | Merdiven (yuvarlak dişli) direk — Kuzeydoğu; yuvarlak direk — Güneydoğu/Güney; kalem ucu — Rio de Janeiro | `poste de concreto Brasil`, `poste duplo T`, `utility pole Rio de Janeiro`, `utility pole Fortaleza` | Direğin tamamı ve tepesi; yer (şehir) açık yazılı; **tek topluluk kaynağı olduğu için alt yazıda çekince** |
| | `br-arauc` | Araucária ormanı (Paraná/Santa Catarina/RS yaylaları) | `Araucaria angustifolia Paraná`, `pinheiro-do-paraná`, `araucária Santa Catarina` | Kandil biçimli tepe; yer Güney Brezilya |
| | `br-palm` | Açaí (Pará, küme gövdeli) ve babaçu (Maranhão, dev yapraklı) ayrı fotoğraf | `Euterpe oleracea Pará`, `Attalea speciosa Maranhão babaçu` | Hangi palmiye olduğu alt yazıyla uyumlu |
| | `br-cactus` | Caatinga'da xiquexique/mandacaru | `Caatinga Ceará cactus`, `mandacaru Pernambuco`, `xique-xique Bahia` | Kaktüs + seyrek çalılık; yer Kuzeydoğu iç kesim |
| | giriş: Cerrado, Pampa, Pantanal, Amazon (görselsiz) | Peyzaj fotoğrafları | `Cerrado Goiás`, `Pampa Rio Grande do Sul`, `Pantanal Mato Grosso do Sul`, `Amazon rainforest Amazonas` | Yeni kart/küme; ayırt edici özellik (ağaçsız çayır, mevsimlik sular vb.) |
| Japonya `elektrik` | `jp-levhalar` (10 şirket) | Her şirket için direk levhası yakın çekim (yazı okunur): 北海道電力, 東北電力, 東京電力, 北陸電力, 中部電力, 関西電力, 中国電力, 四国電力, 九州電力, 沖縄電力 | `電柱 札`, `電柱 看板 <電力名>`, `utility pole Japan <şehir>`, `Category:Utility poles in Japan` | Levha biçimi ve yazı yönü; şirketin hizmet bölgesi (ilçe/şehir) açık; `crop`+`marks` ile levhayı büyüt |
| | `jp-seritler` | Sarmal şerit (Hokuriku), turuncu-siyah bant (Shikoku), kenarlıksız kaplan şeridi (Kansai) | `電柱 トラ柄`, `電柱 縞模様`, `utility pole stripe Japan` | Şerit biçimi + çekim yeri |
| | `jp-direk-anatomi` / `自家発連系有` | Shikoku'da levha üstü bandı | `自家発連系有 電柱`, `Shikoku utility pole sign` | Bantta yazının okunması; çekim yeri Shikoku (**diğer şirketlerde bant yazısı belgesiz**) |
| Rusya `yollar` | (yeni kart) | M/Р/А harfli federal yol yön levhası ve rota işareti, km taşı | `М-4 Дон знак`, `Автодорога М-7 Волга указатель`, `Russian highway sign`, `Федеральная автомобильная дорога указатель` | Rota numarası harfi ve zemin rengi; yer ve yol açık. Sonra §9b "çizilmeyenler" listesinden Rusya levhasını çıkar |
| Güney Kore `hangul`/`alan` | `kr-dir`, `kr-office`, `kr-phone` | Hangul + Latin satırlı yön levhası; ilçe/bucak kurum tabelası; dükkân telefon numarası | `Road signs in South Korea`, `Korean road sign Hangul`, `면사무소`, `농협` | Hangul adı ve Latin satırı birlikte; il açık yazılı |
| | (çizilemedi) il sınırı levhası | `경기도 경계` gibi sınır levhası | `경계 표지 도로`, `Provincial border sign South Korea` | Levhadaki iki yönetim adı okunmalı |
| Vietnam (`vn-*`, `view-guide.js`) | `vn-dir`, `vn-km`, `vn-phone` | Mavi/yeşil yön levhası, kırmızı/mavi tepeli km direği, `ĐT` + alan kodlu tabela | `Biển chỉ dẫn Việt Nam`, `cột Km quốc lộ`, `Road signs in Vietnam`, `biển hiệu Đà Nẵng` | Ek işaretli ad (ĩ, ệ…); yıl: 2025 il birleşmesi öncesi/sonrası notu |
| Hindistan (`in-*`, `view-alfabe.js`) | `in-dir-all`, `in-mile1` | Çok dilli yön levhası, mil taşı (sarı/yeşil/mavi/turuncu) | `Milestone India`, `NH signboard Karnataka`, `Hindi English Kannada road sign` | Hangi yazıların bulunduğu ve eyalet |
| Brezilya (çizilemedi) | karayolu kalkanı | BR-/eyalet kalkanlı tabela | `BR-116 placa`, `shield BR-101`, `placa SP-270` | Kalkan biçimi, yer açık (altlıkta kalkan çiziminin kaynağı olur) |

## Güncel durum (16 Kasım 2026)
- **Karar:** yapay görsel yalnızca gerekirse; Japonya direk altı sarı-siyah şerit için çizim yok, yalnızca gerçek fotoğraf (beyaz bant: çizim + fotoğraf birlikte).
- Rusya: `ru-route-*`, `ru-km-*` ve 22 `ru-yer-*` (Bölgesel görünüm) gerçek fotoğraf. Japonya: `jp-wrap-1/2` (standart şerit); spiral/Kansai kenarlıksız/Shikoku şeridi için Commons'ta okunaklı fotoğraf bulunamadı, çizim de yapılmadı.
- Türkiye: `tr-bin-1..3` (çöp kovası; Commons kanıtı üç fotoğrafla sınırlı, kartta belirtildi), `tr-yol-1..3` (D/O levhaları), `tr-zeytin`, `tr-pamuk`, `tr-pamukkale`, `tr-nemrut`, `tr-tuz`. `tr-orman-*` kullanılmıyor.

- Hindistan: `in-dir-kn-1`, `in-dir-ml-1/2`, `in-dir-bn-1`, `in-dir-gu-1`, `in-dir-pa-1`, `in-dir-or-1`, `in-dir-mr-1/2` (yön levhaları; her biri okunup `marks` ile işaretlendi).
- Brezilya: `br-km-1/2` (kilometre levhası), `br-soja-1..4`, `br-carn-1/2`, `br-cafe-1/2`, `br-tel-2..5` (Rio tabelaları, yalnız yerel numara; DDD'li tabela Commons'ta bulunamadı), `br-pole-1/2` (Fortaleza merdiven direk, Belo Horizonte yuvarlak direk). Meksika: `mx-tel-1/2`, `mx-plato-2` ve diğer `yerel` fotoğrafları. Türkiye: `tr-tel-1/2`. Kore: `kr-tel-1` ve `yerel` fotoğrafları. Endonezya: `yazi` ve `yerel` fotoğrafları.

## Kayıt adı ve küme düzeni (hatırlatma)
- Anahtar: `<ülke önek>-<kısa ad>-<n>` (`mx-cardon-1`); küme: `S['mx-cardon1'] = ['mx-cardon', 'mx-cardon-1', …]` gibi çizimle **birlikte** (galeri ikisini de gösterir) ya da yeni kümeyle.
- Kümede **tek bir çizim bile varsa** motor o kümeyi Pratik/Simülasyon fotoğraf sorusundan çıkarır (`visualQuizable`). Fotoğrafın soru olmasını istiyorsan fotoğrafları çizimlerden **ayrı bir kümeye ve ayrı karta** koy (kartta `quiz:false` yazma, `ids` doğru birimleri listelesin); çizimli kart `quiz:false` kalır.
- Sıra: fotoğrafı 700–900 px çekip **gör** (`goz`), alt yazıdaki her iddiayı doğrula, sonra kayda ekle.


## Japonya direk şeridi (üçüncü tur)
- `jp-str-kyu-1` (Fukuoka, kabartmalı yansıtıcı şerit; Hot cake syrup, CC BY-SA 3.0) ve `jp-str-kan-1` (Kyoto, geniş dikey çubuklar; tenz1225, CC BY-SA 2.0).
- Tohoku, Hokuriku, Chugoku, Shikoku ve Chubu şeritleri için Commons'ta ~550 direk fotoğrafı taranıp (siyah-sarı dönüşüm skoru + gözle) bölgesel varyantı gösteren kare bulunamadı. Bu şeritler yalnız metinle anlatılır (Plonkit topluluk özeti; kullanıcının verdiği bilgi grafiği); çizim yok. Levha fotoğrafı: yalnız `jp-toh-1`.

## Kore şehir ipuçları (üçüncü tur)
- Kaynak: «Korean Street Sign Meta» (schaderdth) ve Plonkit Güney Kore sayfası. Fotoğraf yok; `hangul` konusunda 10 yeni karar kartı (Busan martı levhası, Seul Namsan yazı tipi, Daegu yön eki, Seul ga-na-da-gil, Mokpo, Suwon, Jeonju, Daejeon, Yeongdeok/Uljin, Jeju üç yazı). Her kartta kaynak ve «mutlak değil» uyarısı var. Soru sorulanlar: Busan, Daegu, Seul harfli yol; kalanı `quiz:false`.

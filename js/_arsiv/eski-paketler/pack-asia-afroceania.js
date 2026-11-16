/* Asya-Pasifik, Afrika ve Okyanusya Ülke Paketleri (10 Ülke):
   Güney Kore (17), Tayland (77), Filipinler (17), Malezya (16), Tayvan (21),
   Güney Afrika (9), Nijerya (37), Kenya (8), Avustralya (8), Yeni Zelanda (16). */
(function(){
  if (!window.registerCountryPack) return;

  // ===========================================================================
  // 1. GÜNEY KORE (17 İL VE BÜYÜKŞEHİR)
  // ===========================================================================
  window.registerCountryPack({
    id: 'guney-kore',
    name: 'Güney Kore',
    sub: '02–064 Alan Kodları · KEPCO Direk Plakası · Yeni Yol Adres Levhası',
    Continent: 'Asya',
    flag: 'KR',
    unitLabel: 'il / büyükşehir',
    groupLabel: 'bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu Başı',
    codeDesc: 'Güney Kore telefon alan kodları (02 Seul, 031-033 Kuzey, 041-044 Merkez, 051-055 Güneydoğu, 061-064 Güneybatı/Jeju) her sokak afişinde ve dükkân tabelasında büyük puntolarla yazar.',
    geoVar: 'KR_GEO',
    bounds: [[33.0, 125.8], [38.65, 129.65]],
    groups: {
      'sudogwon': { name: 'Sudogwon (Seul / Gyeonggi / İncheon)', color: '#c85a3a',
        desc: 'Başkent Seul (02), İncheon (032) ve Gyeonggi (031): yoğun apartman blokları, Han Nehri otoyol ağları ve 02/031/032 telefon kodları.' },
      'gangwon': { name: 'Gangwon (Kuzeydoğu Dağlık)', color: '#4a8a5a',
        desc: 'Taebaek sıradağları, kayak merkezleri, dik çam ormanları ve 033 alan kodu.' },
      'hoseo': { name: 'Hoseo (Chungcheong / Daejeon / Sejong)', color: '#c4962c',
        desc: 'Merkez Kore ovaları: Chungnam (041), Daejeon (042), Chungbuk (043) ve yeni idari başkent Sejong (044).' },
      'honam': { name: 'Honam (Jeolla / Gwangju)', color: '#3d7ab8',
        desc: 'Güneybatı pirinç havzaları, girintili rias kıyıları, kırmızı biber tarlaları; 061 (Jeonnam), 062 (Gwangju) ve 063 (Jeonbuk) kodları.' },
      'yeongnam': { name: 'Yeongnam (Gyeongsang / Busan / Daegu / Ulsan)', color: '#7b5ea7',
        desc: 'Güneydoğu sanayi ve liman kuşağı: Busan (051), Ulsan (052), Daegu (053), Gyeongbuk (054) ve Gyeongnam (055).' },
      'jeju': { name: 'Jeju Adası (Volkanik Güney)', color: '#2a9d8f',
        desc: 'Siyah bazalt taş duvarlar (돌담), Hallasan volkanı, mandalina bahçeleri, palmiyeler ve 064 alan kodu.' }
    },
    visuals: [
      { id: 'kr-kepco-pole', cat: 'Elektrik Direği', title: 'KEPCO Gümüş Direk Plakası & Sarı-Siyah Uyarı Bandı',
        region: 'Tüm Güney Kore (8 haneli koordinat ızgarası)',
        svgId: 'kr-kepco-pole',
        desc: 'Nereye bakılır: Yuvarlak beton elektrik direklerinin göz hizasındaki dikey gümüş metal plakaya ve altındaki diyagonal sarı-siyah şeride. Üstteki 4 karakter yerel trafo/bölge kodunu, alttaki 4 karakter direk numarasını verir.' },
      { id: 'kr-blue-road-sign', cat: 'Yol & Kapı Plakası', title: 'Mavi Beşgen Yeni Yol Adresi Levhası (도로명주소)',
        region: 'Tüm Güney Kore (Hangul + Latin cadde adı)',
        svgId: 'kr-blue-road-sign',
        desc: 'Nereye bakılır: Bina girişlerindeki lacivert-mavi beşgen kapı plakasına ve kavşaklardaki ok şeklindeki mavi sokak tabelalarına. Üzerinde Hangul ve İngilizce cadde adı (-daero, -ro, -gil) ile bina numarası yazar.' },
      { id: 'kr-hangul-phone', cat: 'Alan Kodu', title: 'Dükkân Tabelalarında 02 / 03x / 04x / 05x / 06x Alan Kodları',
        region: '02 Seul · 03x Kuzey · 04x Merkez · 05x Yeongnam · 06x Honam/Jeju',
        svgId: 'kr-hangul-phone',
        desc: 'Nereye bakılır: Kore’de neredeyse her restoran, emlakçı ve eczane tabelasının alt köşesine. 010 cep telefonudur; 02 (Seul) veya 031–064 arasındaki 3 haneli sabit hat alan kodu ili saniyesinde ele verir.' },
      { id: 'kr-jeju-basalt', cat: 'Biyom & Duvar', title: 'Jeju Siyah Gözenekli Bazalt Taş Duvarlar (돌담)',
        region: 'Jeju Adası (064)',
        svgId: 'kr-jeju-basalt',
        desc: 'Nereye bakılır: Yol ve tarla kenarlarındaki harçsız örülmüş kömür siyahı volkanik bazalt taş duvarlara. Koyu gri bazalt kaldırımlar ve palmiye ağaçlarıyla birleştiğinde %100 Jeju Adası’dır.' }
    ],
    rules: [
      { title: '02–064 Telefon Alan Kodu Izgarası',
        desc: '02 Seul; 031 Gyeonggi, 032 İncheon, 033 Gangwon; 041 Chungnam, 042 Daejeon, 043 Chungbuk, 044 Sejong; 051 Busan, 052 Ulsan, 053 Daegu, 054 Gyeongbuk, 055 Gyeongnam; 061 Jeonnam, 062 Gwangju, 063 Jeonbuk, 064 Jeju.' },
      { title: '5 Haneli Yeni Posta Kodları (우편번호)',
        desc: 'İlk iki hane bölgeyi verir: 01–09 Seul, 10–20 Gyeonggi, 21–23 İncheon, 24–26 Gangwon, 27–29 Chungbuk, 30 Sejong, 31–33 Chungnam, 34–35 Daejeon, 36–40 Gyeongbuk, 41–43 Daegu, 44–45 Ulsan, 46–49 Busan, 50–53 Gyeongnam, 54–56 Jeonbuk, 57–60 Jeonnam, 61–62 Gwangju, 63 Jeju.' },
      { title: 'Kamera & Sokak Görünümü İpucu',
        desc: 'Güney Kore’de Google kapsaması ağırlıkla Seul/Busan metropolleri ve eski nesil kamerayla sınırlıdır; ancak mavi beşgen bina plakaları ve yoğun Hangul tabelalarındaki 0xx alan kodu her karede okunur.' }
    ],
    units: [
      { id: '11', name: 'Seul (서울)', group: 'sudogwon', code: '02', code2: '01xxx–09xxx', capital: 'Seul',
        cue: 'Nereye bakılır: Dükkân tabelalarındaki 2 haneli 02 alan koduna ve kahverengi/yeşil ilçe sokak tabelalarındaki -gu (구, örn. Gangnam-gu, Mapo-gu) ekine. Han Nehri köprüleri ve yoğun yüksek katlı doku.' },
      { id: '28', name: 'İncheon (인천)', group: 'sudogwon', code: '032', code2: '21xxx–23xxx', capital: 'İncheon',
        cue: 'Nereye bakılır: 032 alan koduna, Sarı Deniz liman vinçlerine, Songdo modern cam kulelerine ve Ganghwa/Yeongjong ada köprülerine.' },
      { id: '41', name: 'Gyeonggi-do (경기)', group: 'sudogwon', code: '031', code2: '10xxx–20xxx', capital: 'Suwon',
        cue: 'Nereye bakılır: 031 alan koduna. Seul’ü çevreleyen uydu kentler (Suwon, Seongnam, Goyang, Yongin); yüksek apartman siteleri (단지) ile yeşil tepelerin iç içe geçtiği peyzaj.' },
      { id: '42', name: 'Gangwon-do (강원)', group: 'gangwon', code: '033', code2: '24xxx–26xxx', capital: 'Chuncheon',
        cue: 'Nereye bakılır: 033 alan koduna, dik çam kaplı Taebaek dağ geçitlerine, tünel girişlerine ve Doğu Denizi (Japon Denizi) sahil yoluna (7 numaralı ulusal otoyol).' },
      { id: '30', name: 'Daejeon (대전)', group: 'hoseo', code: '042', code2: '34xxx–35xxx', capital: 'Daejeon',
        cue: 'Nereye bakılır: 042 alan koduna, Daedeok bilim/teknoloji kampüsü tabelalarına ve geniş düz bulvarlara.' },
      { id: '50', name: 'Sejong (세종)', group: 'hoseo', code: '044', code2: '30xxx', capital: 'Sejong',
        cue: 'Nereye bakılır: 044 alan koduna. Yepyeni bakanlık kompleksleri, geniş bisiklet yolları ve Hangul isimli modern caddeler (Hanul-ro vb.).' },
      { id: '43', name: 'Chungcheongbuk-do (충북)', group: 'hoseo', code: '043', code2: '27xxx–29xxx', capital: 'Cheongju',
        cue: 'Nereye bakılır: 043 alan koduna. Güney Kore’nin denize kıyısı olmayan tek ili; Sobaek dağ etekleri, Chungju Gölü ve Cheongju sanayi havzası.' },
      { id: '44', name: 'Chungcheongnam-do (충남)', group: 'hoseo', code: '041', code2: '31xxx–33xxx', capital: 'Hongseong (Cheonan)',
        cue: 'Nereye bakılır: 041 alan koduna, Sarı Deniz gelgit düzlüklerine, Cheonan/Asan sanayi koridoruna ve alçak tepeli çeltik ovalarına.' },
      { id: '29', name: 'Gwangju (광주)', group: 'honam', code: '062', code2: '61xxx–62xxx', capital: 'Gwangju',
        cue: 'Nereye bakılır: 062 alan koduna ve doğu ufuktaki Mudeungsan Dağı silüetine. Güneybatı Honam bölgesinin ana metropolü.' },
      { id: '45', name: 'Jeollabuk-do (전북)', group: 'honam', code: '063', code2: '54xxx–56xxx', capital: 'Jeonju',
        cue: 'Nereye bakılır: 063 alan koduna, Jeonju Hanok (geleneksel kiremit çatılı ev) mimarisine ve Honam Ovası’nın uçsuz bucaksız düz çeltik tarlalarına.' },
      { id: '46', name: 'Jeollanam-do (전남)', group: 'honam', code: '061', code2: '57xxx–60xxx', capital: 'Muan (Yeosu / Suncheon)',
        cue: 'Nereye bakılır: 061 alan koduna, kırmızımsı topraklı tarlalara, yüzlerce adayı birbirine bağlayan asma köprülere ve güney kıyı balıkçı kasabalarına.' },
      { id: '26', name: 'Busan (부산)', group: 'yeongnam', code: '051', code2: '46xxx–49xxx', capital: 'Busan',
        cue: 'Nereye bakılır: 051 alan koduna, dik yamaçlara tırmanan renkli mahallelere, dev konteyner limanlarına ve Gwangan/Busan항 köprülerine.' },
      { id: '27', name: 'Daegu (대구)', group: 'yeongnam', code: '053', code2: '41xxx–43xxx', capital: 'Daegu',
        cue: 'Nereye bakılır: 053 alan koduna. Etrafı Palgongsan ve Biseulsan dağlarıyla çevrili sıcak iç havza metropolü.' },
      { id: '31', name: 'Ulsan (울산)', group: 'yeongnam', code: '052', code2: '44xxx–45xxx', capital: 'Ulsan',
        cue: 'Nereye bakılır: 052 alan koduna, Hyundai ağır sanayi/tersane tesislerine ve doğu kıyı endüstriyel bulvarlarına.' },
      { id: '47', name: 'Gyeongsangbuk-do (경북)', group: 'yeongnam', code: '054', code2: '36xxx–40xxx', capital: 'Andong (Pohang / Gyeongju)',
        cue: 'Nereye bakılır: 054 alan koduna, elma bahçelerine, Gyeongju tümülüs/tapınak mimarisine ve Pohang çelik limanına.' },
      { id: '48', name: 'Gyeongsangnam-do (경남)', group: 'yeongnam', code: '055', code2: '50xxx–53xxx', capital: 'Changwon',
        cue: 'Nereye bakılır: 055 alan koduna, Changwon/Gimhae sanayi bulvarlarına ve Geoje/Namhae adalı güney kıyısına.' },
      { id: '49', name: 'Jeju-do (제주)', group: 'jeju', code: '064', code2: '63xxx', capital: 'Jeju',
        cue: 'Nereye bakılır: 064 alan koduna, yol kenarındaki siyah gözenekli bazalt taş duvarlara (doldam), palmiyelere, turuncu mandalina seralarına ve ortada yükselen Hallasan volkanına.' }
    ]
  });

  // ===========================================================================
  // 2. TAYLAND (77 İL / CHANGWAT)
  // ===========================================================================
  var TH_INFO = {
    '10': ['Bangkok (Krung Thep)', 'central', '02', '10xxx', 'Bangkok', 'Pembe/sarı-yeşil taksiler, BTS/MRT viyadükleri, Bangkok Metropolitan (กรุงเทพมหานคร) sokak tabelaları ve 02 alan kodu.'],
    '11': ['Samut Prakan', 'central', '02', '10270', 'Samut Prakan', 'Bangkok’un güney kıyı uzantısı; Suvarnabhumi Havalimanı çevresi, Chao Phraya ağzı ve 02 alan kodu.'],
    '12': ['Nonthaburi', 'central', '02', '11xxx', 'Nonthaburi', 'Bangkok’un kuzeybatı banliyösü; yoğun konut kuleleri, Chao Phraya köprüleri ve 02 alan kodu.'],
    '13': ['Pathum Thani', 'central', '02', '12xxx', 'Pathum Thani', 'Bangkok’un kuzey çıkışı (Otoyol 1 Phahonyothin); üniversite kampüsleri, kanallar ve 02 alan kodu.'],
    '14': ['Phra Nakhon Si Ayutthaya', 'central', '035', '13xxx', 'Ayutthaya', 'Kırmızı tuğla antik tapınak (chedi) kalıntıları, düz taşkın ovası ve Otoyol 1/32 kavşağı.'],
    '15': ['Ang Thong', 'central', '035', '14xxx', 'Ang Thong', 'Chao Phraya deltasında yemyeşil düz pirinç tarlaları ve altın Buda heykelli tapınaklar (035).'],
    '16': ['Lop Buri', 'central', '036', '15xxx', 'Lop Buri', 'Orta ova doğusunda kireçtaşı tepeleri, ayçiçeği tarlaları ve Khmer dönemi prang kuleleri (036).'],
    '17': ['Sing Buri', 'central', '036', '16xxx', 'Sing Buri', 'Chao Phraya kıyısında küçük, tamamen düz pirinç ovası ili (036, 16xxx posta kodu).'],
    '18': ['Chai Nat', 'central', '056', '17xxx', 'Chai Nat', 'Chao Phraya Barajı, sulama kanalları ve orta-kuzey geçiş ovası (056, 17xxx).'],
    '19': ['Saraburi', 'central', '036', '18xxx', 'Saraburi', 'Otoyol 1 ile Isan kapısı Otoyol 2 (Mittraphap) ayrımı; kireçtaşı kayalıkları ve çimento fabrikaları (036).'],
    '20': ['Chon Buri', 'eastern', '038', '20xxx', 'Chon Buri (Pattaya)', 'Otoyol 3 (Sukhumvit) ve 7; Laem Chabang limanı, Pattaya sahil kuleleri ve 038 alan kodu.'],
    '21': ['Rayong', 'eastern', '038', '21xxx', 'Rayong', 'Map Ta Phut petrokimya tesisleri, kauçuk/durian bahçeleri ve Tayland Körfezi plajları (038).'],
    '22': ['Chanthaburi', 'eastern', '039', '22xxx', 'Chanthaburi', 'Yoğun tropikal meyve (durian, rambutan) bahçeleri, kırmızı toprak ve yemyeşil kıyı dağları (039).'],
    '23': ['Trat', 'eastern', '039', '23xxx', 'Trat', 'Kamboçya sınırındaki dar kıyı şeridi, Koh Chang feribot iskeleleri ve yoğun yağmur ormanı (039).'],
    '24': ['Chachoengsao', 'eastern', '038', '24xxx', 'Chachoengsao', 'Bang Pakong Nehri ovası, balık/karides havuzları ve Bangkok doğu sanayi koridoru (038).'],
    '25': ['Prachin Buri', 'eastern', '037', '25xxx', 'Prachin Buri', 'Khao Yai Milli Parkı güney etekleri, endüstri parkları ve Otoyol 33 (037).'],
    '26': ['Nakhon Nayok', 'central', '037', '26xxx', 'Nakhon Nayok', 'Bangkok kuzeydoğusunda Khao Yai dağ duvarına dayanan şelale ve meyve bahçesi ili (037).'],
    '27': ['Sa Kaeo', 'eastern', '037', '27xxx', 'Sa Kaeo', 'Kamboçya (Poipet) sınır koridoru; Otoyol 33, şekerkamışı/manyok tarlaları ve sınır ticaret tabelaları (037).'],
    '30': ['Nakhon Ratchasima (Korat)', 'northeastern', '044', '30xxx', 'Nakhon Ratchasima', 'Isan platosunun giriş kapısı; Otoyol 2 (Mittraphap), kırmızımsı toprak ve 3xx numaralı karayolları (044).'],
    '31': ['Buri Ram', 'northeastern', '044', '31xxx', 'Buri Ram', 'Güney Isan düzlüğü; sönmüş volkan tepelerindeki Khmer taş tapınakları (Phanom Rung) ve okaliptüs dizileri (044).'],
    '32': ['Surin', 'northeastern', '044', '32xxx', 'Surin', 'Kamboçya sınırında düz Isan çeltik ovası, fil figürlü belediye kemerleri ve Otoyol 24 (044).'],
    '33': ['Si Sa Ket', 'northeastern', '045', '33xxx', 'Si Sa Ket', 'Kamboçya sınırındaki Dangrek dağ sırtı ve kızıl topraklı güney Isan tarlaları (045).'],
    '34': ['Ubon Ratchathani', 'northeastern', '045', '34xxx', 'Ubon Ratchathani', 'Doğu Isan ucu; Mun ve Mekong nehirlerinin birleşimi, kırmızı laterit yol omuzları ve 045 alan kodu.'],
    '35': ['Yasothon', 'northeastern', '045', '35xxx', 'Yasothon', 'Chi Nehri havzasında kurak mevsimde sararan düz pirinç tarlaları ve roket festivali anıtları (045).'],
    '36': ['Chaiyaphum', 'northeastern', '044', '36xxx', 'Chaiyaphum', 'Phetchabun dağları ile Khorat platosu sınırı; rüzgâr türbinleri ve 201 numaralı karayolu (044).'],
    '37': ['Amnat Charoen', 'northeastern', '045', '37xxx', 'Amnat Charoen', 'Otoyol 212 üzerinde Mekong’a yakın küçük, düz ve kırmızı topraklı Isan ili (045).'],
    '38': ['Bueng Kan', 'northeastern', '042', '38xxx', 'Bueng Kan', 'Kuzeydoğu Mekong kıyısında Tayland’ın 77. (en yeni) ili; kauçuk ağaçları ve kumtaşı kayalıkları (042).'],
    '39': ['Nong Bua Lam Phu', 'northeastern', '042', '39xxx', 'Nong Bua Lam Phu', 'Udon Thani batısında Phu Phan sırtları ve şekerkamışı tarlaları (042).'],
    '40': ['Khon Kaen', 'northeastern', '043', '40xxx', 'Khon Kaen', 'Merkez Isan’ın büyük üniversite ve ticaret metropolü; Otoyol 2 ve 12 kesişimi, 043 alan kodu.'],
    '41': ['Udon Thani', 'northeastern', '042', '41xxx', 'Udon Thani', 'Kuzey Isan merkezi; Otoyol 2 üzerinde geniş bulvarlar, kırmızı toprak ve Laos sınır yolu (042).'],
    '42': ['Loei', 'northeastern', '042', '42xxx', 'Loei', 'Isan’ın tek dağlık ili; Phu Kradueng masa dağları, sisli tepeler ve Mekong kıyısı (042).'],
    '43': ['Nong Khai', 'northeastern', '042', '43xxx', 'Nong Khai', 'Laos (Vientiane) Dostluk Köprüsü, Mekong sahil kordonu ve Otoyol 2’nin bitiş noktası (042).'],
    '44': ['Maha Sarakham', 'northeastern', '043', '44xxx', 'Maha Sarakham', 'Khorat platosunun tam kalbi; dümdüz manyok/pirinç arazisi ve üniversite kampüsleri (043).'],
    '45': ['Roi Et', 'northeastern', '043', '45xxx', 'Roi Et', 'Thung Kula Ronghai düzlüğü; 101 metrelik dev ayakta duran Buda heykeli ve 2xx karayolları (043).'],
    '46': ['Kalasin', 'northeastern', '043', '46xxx', 'Kalasin', 'Lam Pao Baraj Gölü, dinozor fosil heykelli kavşaklar ve Phu Phan tepeleri (043).'],
    '47': ['Sakon Nakhon', 'northeastern', '042', '47xxx', 'Sakon Nakhon', 'Nong Han Gölü, Phu Phan dağ ormanları ve kuzeydoğu Isan kırmızı laterit yolları (042).'],
    '48': ['Nakhon Phanom', 'northeastern', '042', '48xxx', 'Nakhon Phanom', 'Mekong Nehri karşısında Laos’un keskin kalker dağlarının (Thakhek) göründüğü sahil ili (042).'],
    '49': ['Mukdahan', 'northeastern', '042', '49xxx', 'Mukdahan', '2. Tayland-Laos Dostluk Köprüsü, cam gözlem kulesi ve Mekong ticaret koridoru (042).'],
    '50': ['Chiang Mai', 'northern', '053', '50xxx', 'Chiang Mai', 'Kuzeyin başkenti; 1xx numaralı dağ yolları, Lanna tarzı çapraz ahşap (kalae) tapınak çatıları ve 053 kodu.'],
    '51': ['Lamphun', 'northern', '053', '51xxx', 'Lamphun', 'Chiang Mai güneyindeki Ping Nehri vadisi; longan (ejder gözü) meyve bahçeleri ve antik Lanna stupaları (053).'],
    '52': ['Lampang', 'northern', '054', '52xxx', 'Lampang', 'Beyaz horoz sembollü sokak lambaları, at arabaları ve Otoyol 1’in kuzey dağ geçitleri (054).'],
    '53': ['Uttaradit', 'northern', '055', '53xxx', 'Uttaradit', 'Merkez ova ile kuzey dağları arasındaki geçiş vadisi; Sirikit Barajı ve Otoyol 11 (055).'],
    '54': ['Phrae', 'northern', '054', '54xxx', 'Phrae', 'Yom Nehri vadisi, tik ağacı konaklar ve Otoyol 101/103 dağ yolları (054).'],
    '55': ['Nan', 'northern', '054', '55xxx', 'Nan', 'Laos sınırında yüksek yeşil sırt yolları, mısır/kahve yamaçları ve Lanna tapınakları (054).'],
    '56': ['Phayao', 'northern', '054', '56xxx', 'Phayao', 'Kwan Phayao Gölü kıyısı ve Chiang Rai’ye çıkan Otoyol 1 koridoru (054).'],
    '57': ['Chiang Rai', 'northern', '053', '57xxx', 'Chiang Rai', 'En kuzey uç (Altın Üçgen); çay tarlaları, Beyaz Tapınak (Wat Rong Khun) ve Otoyol 1’in Mae Sai sınırı (053).'],
    '58': ['Mae Hong Son', 'northern', '053', '58xxx', 'Mae Hong Son', 'Myanmar sınırında 108 ve 1095 numaralı aşırı virajlı, sisli çam ve tik ormanı dağ yolları (053).'],
    '60': ['Nakhon Sawan', 'central', '056', '60xxx', 'Nakhon Sawan', 'Ping ve Nan nehirlerinin birleşip Chao Phraya’yı oluşturduğu kavşak kenti; Otoyol 1 ve 117 (056).'],
    '61': ['Uthai Thani', 'central', '056', '61xxx', 'Uthai Thani', 'Batı dağ eteklerinden Chao Phraya ovasına uzanan sakin tarım ili (056).'],
    '62': ['Kamphaeng Phet', 'central', '055', '62xxx', 'Kamphaeng Phet', 'Otoyol 1 üzerinde muz/şekerkamışı tarlaları ve laterit taşlı antik sur kalıntıları (055).'],
    '63': ['Tak', 'western', '055', '63xxx', 'Tak (Mae Sot)', 'Myanmar (Mae Sot) sınır kapısı, Bhumibol Barajı ve Otoyol 12’nin dik batı dağ geçitleri (055).'],
    '64': ['Sukhothai', 'central', '055', '64xxx', 'Sukhothai', 'İlk Tay krallığının lotus tomurcuklu stupa kalıntıları ve Yom Nehri ovası (055).'],
    '65': ['Phitsanulok', 'central', '055', '65xxx', 'Phitsanulok', 'Yukarı merkez ovanın ana ulaşım düğümü (Otoyol 11 ve 12 kesişimi); Nan Nehri kıyısı (055).'],
    '66': ['Phichit', 'central', '056', '66xxx', 'Phichit', 'Timsah heykelli kavşaklar ve dümdüz sulak çeltik ovaları (056).'],
    '67': ['Phetchabun', 'central', '056', '67xxx', 'Phetchabun', 'Otoyol 21 boyunca iki yanı dik yeşil Phetchabun sıradağlarıyla çevrili uzun vadi ve Khao Kho sisli tepeleri (056).'],
    '70': ['Ratchaburi', 'western', '032', '70xxx', 'Ratchaburi', 'Otoyol 4 (Phetkasem) üzerinde kireçtaşı kayalıkları, yüzen pazar kanalları ve sırlı küp atölyeleri (032).'],
    '71': ['Kanchanaburi', 'western', '034', '71xxx', 'Kanchanaburi', 'Kwai Nehri vadisi, şekerkamışı tarlaları, baraj gölleri ve Myanmar sınır dağları (034).'],
    '72': ['Suphan Buri', 'central', '035', '72xxx', 'Suphan Buri', 'Otoyol 340 üzerinde geniş pirinç ovaları ve ejderha müzesi kulesi (035).'],
    '73': ['Nakhon Pathom', 'central', '034', '73xxx', 'Nakhon Pathom', 'Bangkok batısında dev turuncu çan şekilli Phra Pathom Chedi stupası ve Otoyol 4 koridoru (034).'],
    '74': ['Samut Sakhon', 'central', '034', '74xxx', 'Samut Sakhon', 'Otoyol 35 (Rama II) üzerinde tuz tavaları, deniz ürünleri fabrikaları ve kıyı kanalları (034).'],
    '75': ['Samut Songkhram', 'central', '034', '75xxx', 'Samut Songkhram', 'Tayland’ın en küçük ili; Mae Klong demiryolu pazarı, hindistancevizi kanalları ve tuz tarlaları (034).'],
    '76': ['Phetchaburi', 'western', '032', '76xxx', 'Phetchaburi (Cha-am)', 'Palmiye şekeri ağaçları (toddy palm), tepedeki beyaz saray (Khao Wang) ve Cha-am plajı (032).'],
    '77': ['Prachuap Khiri Khan', 'western', '032', '77xxx', 'Prachuap (Hua Hin)', 'Malay yarımadasının en dar kıstağı; Otoyol 4, ananas tarlaları ve Hua Hin sahil kenti (032).'],
    '80': ['Nakhon Si Thammarat', 'southern', '075', '80xxx', 'Nakhon Si Thammarat', 'Güneyin en kalabalık ili; Khao Luang dağları, yoğun palmiye/kauçuk plantasyonları ve Otoyol 41 (075).'],
    '81': ['Krabi', 'southern', '075', '81xxx', 'Krabi', 'Yolların hemen kenarında dikey yükselen devasa kireçtaşı karst kuleleri ve yağ palmiyesi bahçeleri (075).'],
    '82': ['Phangnga', 'southern', '076', '82xxx', 'Phangnga', 'Andaman kıyısı, Phang Nga Körfezi karst kayalıkları ve Phuket’e bağlanan Sarasin Köprüsü (076).'],
    '83': ['Phuket', 'southern', '076', '83xxx', 'Phuket', 'Turistik ada ili; 402 numaralı ana cadde, çok dilli otel tabelaları ve tepelik kıyı virajları (076).'],
    '84': ['Surat Thani', 'southern', '077', '84xxx', 'Surat Thani', 'Otoyol 41 ve 44; uçsuz bucaksız yağ palmiyesi/kauçuk plantasyonları ve Samui feribot limanları (077).'],
    '85': ['Ranong', 'southern', '077', '85xxx', 'Ranong', 'Myanmar’ın en güney ucuyla sınır oluşturan Kra Kıstağı; yoğun yağışlı dik kıyı ormanları (077).'],
    '86': ['Chumphon', 'southern', '077', '86xxx', 'Chumphon', 'Güney Tayland’ın kapısı; Otoyol 4’ün güney yarımadaya indiği palmiyeli ve kauçuklu geçit (077).'],
    '90': ['Songkhla', 'southern', '074', '90xxx', 'Songkhla (Hat Yai)', 'Malezya sınırındaki büyük ticaret merkezi Hat Yai, Songkhla Gölü ve Otoyol 4/43 kavşağı (074).'],
    '91': ['Satun', 'southern', '074', '91xxx', 'Satun', 'Andaman Denizi’nde Malezya (Perlis/Langkawi) sınır ili; karst tepeleri ve cami kubbeleri (074).'],
    '92': ['Trang', 'southern', '075', '92xxx', 'Trang', 'Güneydoğu Andaman kıyısı; düzenli kauçuk ağacı sıraları ve kurbağa başlı tuk-tuklar (075).'],
    '93': ['Phatthalung', 'southern', '074', '93xxx', 'Phatthalung', 'Songkhla Gölü batı kıyısı, delikli kalker kayası Khao Ok Thalu ve Otoyol 41 (074).'],
    '94': ['Pattani', 'southern', '073', '94xxx', 'Pattani', 'Derin güney; cami minareleri, Tayca-Malayca (Jawi) çift dilli tabelalar ve kıyı balıkçı köyleri (073).'],
    '95': ['Yala', 'southern', '073', '95xxx', 'Yala (Betong)', 'Güneyin denize kıyısı olmayan tek ili; Malezya sınırında dağlık kauçuk ormanları ve 410 numaralı yol (073).'],
    '96': ['Narathiwat', 'southern', '073', '96xxx', 'Narathiwat', 'Malezya (Kelantan) sınırındaki en güneydoğu uç; palmiye kıyıları, camiler ve 073 alan kodu.']
  };

  var thUnits = Object.keys(TH_INFO).sort().map(function(id) {
    var r = TH_INFO[id];
    return {
      id: id, name: r[0], group: r[1], code: r[2], code2: r[3], capital: r[4],
      cue: 'Nereye bakılır: ' + r[5]
    };
  });

  window.registerCountryPack({
    id: 'tayland',
    name: 'Tayland',
    sub: '1/2/3/4 Karayolu Bölgeleri · Beyaz Km Taşları · Isan Kızıl Toprağı',
    Continent: 'Asya',
    flag: 'TH',
    unitLabel: 'il (changwat)',
    groupLabel: 'bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu Başı',
    codeDesc: 'Tayland’da hem karayolu numaralarının hem de 5 haneli posta kodlarının ilk rakamı bölgeyi doğrudan verir: 1 Kuzey/Merkez, 2 Doğu, 3–4 Kuzeydoğu (Isan), 5 Kuzey, 6–7 Batı/Merkez, 8–9 Güney.',
    geoVar: 'TH_GEO',
    bounds: [[5.6, 97.3], [20.5, 105.7]],
    groups: {
      'central': { name: 'Merkez Ova & Bangkok (ภาคกลาง)', color: '#c85a3a',
        desc: 'Chao Phraya sulak pirinç deltası, Bangkok metropolü (02), kanallar ve 1xx / 3xx başlangıçlı ova yolları.' },
      'eastern': { name: 'Doğu Kıyısı (ภาคตะวันออก)', color: '#2a9d8f',
        desc: 'Otoyol 3 (Sukhumvit) koridoru, Pattaya/Rayong sanayi-liman kuşağı ve Chanthaburi/Trat tropikal meyve bahçeleri (2xx yollar, 037–039).' },
      'northeastern': { name: 'Kuzeydoğu / Isan Platosu (ภาคอีสาน)', color: '#c4962c',
        desc: 'Otoyol 2 (Mittraphap) ve 2xx numaralı yollar: kırmızı laterit toprak omuzları, kurak-düz okaliptüs/manyok tarlaları (042–045).' },
      'northern': { name: 'Kuzey Dağlık Lanna (ภาคเหนือ)', color: '#4a8a5a',
        desc: 'Otoyol 1 (Phahonyothin) ve 1xx numaralı yollar: çam/tik kaplı yüksek dağ sırtları, Lanna tapınakları ve 053–055 alan kodları.' },
      'western': { name: 'Batı & Kra Kıstağı (ภาคตะวันตก)', color: '#7b5ea7',
        desc: 'Myanmar sınırındaki Tenasserim dağları, şekerkamışı/ananas tarlaları ve Otoyol 4’ün üst kesimi (032, 034, 055).' },
      'southern': { name: 'Güney Yarımadası (ภาคใต้)', color: '#3d7ab8',
        desc: 'Otoyol 4 (Phetkasem) ve 4xx numaralı yollar: keskin kireçtaşı (karst) kuleleri, yoğun yağ palmiyesi/kauçuk plantasyonları ve 073–077 alan kodları.' }
    },
    visuals: [
      { id: 'th-km-milestone', cat: 'Kilometre Taşı', title: 'Beyaz Beton Kilometre Taşı & Garuda Yol Arması',
        region: '1xx Kuzey · 2xx Isan · 3xx Merkez/Doğu · 4xx Güney',
        svgId: 'th-km-milestone',
        desc: 'Nereye bakılır: Yolun sol kenarındaki (Tayland’da trafik soldan akar) yuvarlak tepeli beyaz beton kilometre taşlarına. En üstteki Garuda kuşu armasının altında yol numarası (1xx, 2xx, 3xx, 4xx), ortada ise bir sonraki ilçeye kalan km yazar.' },
      { id: 'th-highway-garuda', cat: 'Yol Levhası', title: 'Kare Beyaz Ulusal Karayolu Kalkanı (ทางหลวงแผ่นดิน)',
        region: 'Ana Otoyollar: 1 Kuzey · 2 Isan · 3 Doğu · 4 Güney',
        svgId: 'th-highway-garuda',
        desc: 'Nereye bakılır: Kavşaklardaki yeşil yön tabelalarının içindeki siyah çerçeveli beyaz kare yol kalkanlarına. İlk rakam 1 ise Kuzey, 2 ise Kuzeydoğu (Isan), 3 ise Merkez/Doğu, 4 ise Güney’desiniz.' },
      { id: 'th-isan-red-soil', cat: 'Toprak & Biyom', title: 'Isan Platosu Kızıl Laterit Toprak & Okaliptüs Dizileri',
        region: 'Kuzeydoğu Tayland (Isan - 2xx yollar)',
        svgId: 'th-isan-red-soil',
        desc: 'Nereye bakılır: Asfalt yolun hemen yanındaki pas kırmızısı/turuncu toprak bankete ve dümdüz ufuk çizgisine. Yol kenarında ince gövdeli okaliptüs ağaçları ve manyok/şekerkamışı tarlaları varsa %100 Isan’dır.' },
      { id: 'th-south-palm', cat: 'Karst & Bitki', title: 'Güney Yarımadası Yağ Palmiyesi, Kauçuk ve Karst Kayalıkları',
        region: 'Güney Tayland (4xx yollar - Chumphon’dan Malezya sınırına)',
        svgId: 'th-south-palm',
        desc: 'Nereye bakılır: Yolun iki yanını tamamen kaplayan koyu yeşil yağ palmiyesi veya düzenli sıralı kauçuk ağaçlarına ve arka planda dikey yükselen kireçtaşı (karst) kulelerine (Krabi, Phangnga, Surat Thani).' }
    ],
    rules: [
      { title: '1 / 2 / 3 / 4 Karayolu İlk Rakam Kuralı',
        desc: 'Tayland ulusal karayolları Bangkok’tan çıkan 4 ana arter etrafında numaralandırılır: 1 ve 1xx Kuzey (Chiang Mai yönü), 2 ve 2xx Kuzeydoğu/Isan (Korat/Nong Khai yönü), 3 ve 3xx Merkez/Doğu (Pattaya/Trat yönü), 4 ve 4xx Batı/Güney (Phuket/Hat Yai yönü).' },
      { title: 'Soldan Trafik + Sarı-Siyah Bordür Taşları',
        desc: 'Tayland’da trafik soldan akar, elektrik direkleri kare kesitli ve deliklidir, kavşak refüj bordürleri ise siyah-beyaz veya kırmızı-beyaz şeritlerle boyanır.' },
      { title: 'Telefon Alan Kodları (02–077)',
        desc: '02 Bangkok ve çevresi; 032–039 Merkez, Batı ve Doğu; 042–045 Kuzeydoğu (Isan); 053–056 Kuzey; 073–077 Güney yarımadası.' }
    ],
    units: thUnits
  });

  // ===========================================================================
  // 3. FİLİPİNLER (17 İDARİ BÖLGE)
  // ===========================================================================
  window.registerCountryPack({
    id: 'filipinler',
    name: 'Filipinler',
    sub: 'Sarı Oval Km Taşları · Barangay Kemerleri · Tagalog / Cebuano Dili',
    Continent: 'Asya',
    flag: 'PH',
    unitLabel: 'idari bölge',
    groupLabel: 'ada grubu',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu Başı',
    codeDesc: 'Filipinler’de 17 idari bölge 3 ana takımadaya (Luzon, Visayas, Mindanao) ayrılır; sarı-siyah kilometre taşları, DPWH beton yol plakaları ve yerel dil (Tagalog/Ilocano vs Cebuano/Bisaya) bölgeyi ele verir.',
    geoVar: 'PH_GEO',
    bounds: [[4.6, 116.9], [20.9, 126.6]],
    groups: {
      'luzon': { name: 'Luzon Takımadaları (Kuzey & Merkez)', color: '#c85a3a',
        desc: 'Metro Manila (02), Cordillera dağları ve Luzon ovaları: Tagalog/Ilocano/Bikolano dilleri, 02 ve 04x/07x alan kodları, 1xxx–4xxx posta kodları.' },
      'visayas': { name: 'Visayas Takımadaları (Merkez Adalar)', color: '#3d7ab8',
        desc: 'Panay, Negros, Cebu, Bohol, Samar ve Leyte adaları: Cebuano/Hiligaynon/Waray dilleri, 03x ve 05x alan kodları, 5xxx–6xxx posta kodları.' },
      'mindanao': { name: 'Mindanao (Güney Ada Grubu)', color: '#2a9d8f',
        desc: 'Davao, Cagayan de Oro, Zamboanga ve BARMM: geniş muz/ananas plantasyonları, Cebuano/Chavacano/Maranao dilleri, 06x ve 08x alan kodları, 7xxx–9xxx posta kodları.' }
    },
    visuals: [
      { id: 'ph-yellow-km', cat: 'Kilometre Taşı', title: 'Sarı-Siyah Oval DPWH Kilometre Taşı',
        region: 'Tüm Filipinler (Üstte ana merkeze, altta sonraki kasabaya mesafe)',
        svgId: 'ph-yellow-km',
        desc: 'Nereye bakılır: Yol kenarındaki sarı boyalı, yuvarlak tepeli beton kilometre taşlarına. Üstteki KM sayısı adanın sıfır noktasına (Luzon’da Manila Luneta Parkı), alttaki harf ve sayı ise bir sonraki kasabaya kalan mesafeyi gösterir.' },
      { id: 'ph-barangay-arch', cat: 'Giriş Kemeri', title: 'Barangay & Belediye Hoş Geldiniz Kemerleri',
        region: 'Tüm Filipinler (Üzerinde Barangay, Municipality ve Province yazar)',
        svgId: 'ph-barangay-arch',
        desc: 'Nereye bakılır: Neredeyse her mahalle (Brgy.) ve ilçe sınırında yolu boydan boya geçen renkli metal veya beton kemerlere. İngilizce olduğu için "Brgy. ..., Municipality of ..., Province of ..." yazısı doğrudan ili verir.' },
      { id: 'ph-luzon-rice', cat: 'Biyom & Yol', title: 'Luzon Beton Plaka Yollar (Concrete Pavement) ve Çeltik Ovaları',
        region: 'Luzon (Region I, II, III, CALABARZON, CAR)',
        svgId: 'ph-luzon-rice',
        desc: 'Nereye bakılır: Filipinler’e özgü kare derzli açık gri beton yol kaplamasına (concrete blocks), tricycle (sepetli motosiklet) taksilere ve Cordillera/Merkez Luzon pirinç teraslarına.' },
      { id: 'ph-visayas-cebuano', cat: 'Dil & Tabela', title: 'Cebuano / Bisaya Tabelalar ("Ginadili" / "Maayong Pag-abot")',
        region: 'Merkez/Doğu Visayas ve Mindanao (Region VII, VIII, IX, X, XI, XII, XIII)',
        svgId: 'ph-visayas-cebuano',
        desc: 'Nereye bakılır: Sokak uyarı levhalarındaki dile. Luzon’da "Bawal..." (Yasaktır) ve "Maligayang Pagdating" (Hoş geldiniz) yazarken, Cebu ve Mindanao’da "Ginadili..." ve "Maayong Pag-abot" yazar.' }
    ],
    rules: [
      { title: 'Tagalog ("Bawal") vs Cebuano ("Ginadili") Ayrımı',
        desc: 'Duvar ve direklerdeki "Çöp atmak / park etmek yasaktır" uyarılarında "BAWAL..." görüyorsanız Luzon (veya Batı Visayas/Palawan); "GINADILI..." veya "ayaw..." görüyorsanız Merkez Visayas (Cebu/Bohol) ya da Mindanao’dasınız.' },
      { title: 'Posta Kodu ve Alan Kodu Kuşakları',
        desc: '4 haneli posta kodlarında 1xxx Metro Manila, 2xxx Kuzey/Merkez Luzon, 3xxx–4xxx Güney Luzon, 5xxx Batı Visayas, 6xxx Merkez/Doğu Visayas, 7xxx–9xxx Mindanao’dur.' },
      { title: 'NHN (Ulusal Otoyol Numaraları)',
        desc: '1–299 arası yollar Kuzey/Merkez Luzon, 400–499 Güney Luzon (CALABARZON/Bicol), 500–599 Mindoro/Palawan, 600–699 Panay/Negros, 700–899 Cebu/Bohol/Samar/Leyte, 900–999 Mindanao.' }
    ],
    units: [
      { id: 'ncr', name: 'Metro Manila (NCR)', group: 'luzon', code: '02', code2: '10xx–18xx', capital: 'Manila / Quezon City',
        cue: 'Nereye bakılır: 02 alan koduna, MMDA pembe/mavi yaya üstgeçitlerine, yoğun jeepney trafiğine ve Quezon City / Makati / Pasig / Manila belediye tabelalarına.' },
      { id: 'car', name: 'Cordillera (CAR)', group: 'luzon', code: '074', code2: '26xx–38xx', capital: 'Baguio',
        cue: 'Nereye bakılır: 074 alan koduna, Baguio çam ağaçlarına, Halsema Otoyolu’nun uçurum kenarı dik dağ virajlarına ve Benguet/Ifugao teraslı yamaçlarına.' },
      { id: 'reg-1', name: 'Ilocos Bölgesi (Region I)', group: 'luzon', code: '072 / 075 / 077', code2: '24xx–29xx', capital: 'San Fernando (La Union)',
        cue: 'Nereye bakılır: Güney Çin Denizi kıyısı boyunca uzanan Manila North Road (R-2), Bangui rüzgâr türbinleri, İspanyol dönemi tuğla kiliseleri ve Ilocano ("Naimbag nga...") tabelaları.' },
      { id: 'reg-2', name: 'Cagayan Vadisi (Region II)', group: 'luzon', code: '078', code2: '35xx–39xx', capital: 'Tuguegarao',
        cue: 'Nereye bakılır: 078 alan koduna. Sierra Madre ile Cordillera arasındaki geniş düz mısır/çeltik vadisi (Isabela, Cagayan, Nueva Vizcaya) ve AH26 (Maharlika Highway).' },
      { id: 'reg-3', name: 'Merkez Luzon (Region III)', group: 'luzon', code: '044 / 045 / 047', code2: '20xx–31xx', capital: 'San Fernando (Pampanga)',
        cue: 'Nereye bakılır: Filipinler’in en geniş dümdüz pirinç ovasına (Bulacan, Pampanga, Nueva Ecija, Tarlac), NLEX/SCTEX otoyollarına ve ufukta tek başına yükselen Arayat Dağı konisine.' },
      { id: 'reg-4a', name: 'CALABARZON (Region IV-A)', group: 'luzon', code: '042 / 043 / 046 / 049', code2: '40xx–43xx', capital: 'Calamba',
        cue: 'Nereye bakılır: Cavite, Laguna, Batangas, Rizal, Quezon illerine; Taal Gölü/volkanı, yoğun banliyö altbölümleri (subdivisions) ve hindistancevizi korularına.' },
      { id: 'reg-4b', name: 'MIMAROPA (Region IV-B)', group: 'luzon', code: '042 / 043 / 048', code2: '50xx–53xx', capital: 'Calapan (Puerto Princesa)',
        cue: 'Nereye bakılır: Mindoro, Marinduque, Romblon ve Palawan (048) adalarına; Palawan’da yoğun tropikal orman, karst kayalıkları ve kırmızımsı topraklı kıyı yolu.' },
      { id: 'reg-5', name: 'Bicol Bölgesi (Region V)', group: 'luzon', code: '052 / 054 / 056', code2: '44xx–48xx', capital: 'Legazpi',
        cue: 'Nereye bakılır: Albay’da kusursuz simetrik konisiyle yükselen Mayon Volkanı’na, AH26 karayoluna ve yoğun abaka/hindistancevizi bahçelerine (052/054).' },
      { id: 'reg-6', name: 'Batı Visayas (Region VI)', group: 'visayas', code: '033 / 034 / 036', code2: '50xx–61xx', capital: 'Iloilo City (Bacolod)',
        cue: 'Nereye bakılır: Panay (Iloilo 033, Capiz, Aklan) ve Batı Negros (Bacolod 034) adalarına; Negros’ta uçsuz bucaksız şekerkamışı tarlaları ve Hiligaynon/Ilonggo dili.' },
      { id: 'reg-7', name: 'Merkez Visayas (Region VII)', group: 'visayas', code: '032 / 035 / 038', code2: '60xx–63xx', capital: 'Cebu City',
        cue: 'Nereye bakılır: Cebu (032), Bohol (038) ve Doğu Negros (035) adalarına; "Ginadili" yazılı Cebuano tabelalara, Bohol’ün yuvarlak kireçtaşı tepelerine (Chocolate Hills) ve dar kıyı yollarına.' },
      { id: 'reg-8', name: 'Doğu Visayas (Region VIII)', group: 'visayas', code: '053 / 055', code2: '65xx–68xx', capital: 'Tacloban',
        cue: 'Nereye bakılır: Samar ve Leyte adalarına, San Juanico Köprüsü’ne, AH26 (Maharlika) beton otoyoluna ve Waray dilindeki tabelalara (053/055).' },
      { id: 'reg-9', name: 'Zamboanga Yarımadası (Region IX)', group: 'mindanao', code: '062 / 065', code2: '70xx–71xx', capital: 'Pagadian (Zamboanga City)',
        cue: 'Nereye bakılır: Zamboanga City’de İspanyol kreolü Chavacano tabelalara ("Bienvenidos"), kırmızı kiremitli belediye binalarına ve yarımada kıyı kauçuk bahçelerine (062).' },
      { id: 'reg-10', name: 'Kuzey Mindanao (Region X)', group: 'mindanao', code: '088', code2: '90xx–92xx', capital: 'Cagayan de Oro',
        cue: 'Nereye bakılır: 088 alan koduna, Bukidnon’un yüksek serin platolarındaki devasa Del Monte ananas tarlalarına ve Cagayan de Oro kıyı otoyoluna.' },
      { id: 'reg-11', name: 'Davao Bölgesi (Region XI)', group: 'mindanao', code: '082 / 084 / 087', code2: '80xx–82xx', capital: 'Davao City',
        cue: 'Nereye bakılır: 082 alan koduna, sarı plastik torbalarla sarılmış dev ihracat muzu plantasyonlarına (Davao del Norte) ve Apo Dağı eteklerine.' },
      { id: 'reg-12', name: 'SOCCSKSARGEN (Region XII)', group: 'mindanao', code: '064 / 083', code2: '94xx–98xx', capital: 'Koronadal (General Santos)',
        cue: 'Nereye bakılır: Güney Cotabato, Sultan Kudarat ve General Santos (083) düz ovalarına; ananas, mısır ve yağ palmiyesi tarlaları ile geniş düz karayollarına.' },
      { id: 'reg-13', name: 'Caraga (Region XIII)', group: 'mindanao', code: '085 / 086', code2: '85xx–88xx', capital: 'Butuan',
        cue: 'Nereye bakılır: Kuzeydoğu Mindanao’da (Agusan, Surigao) kereste/palmiye kamyonlarına, Agusan Nehri havzasına ve kırmızı nikel maden topraklarına (085/086).' },
      { id: 'barmm', name: 'Bangsamoro (BARMM)', group: 'mindanao', code: '063 / 064 / 068', code2: '73xx–97xx', capital: 'Cotabato City (Marawi)',
        cue: 'Nereye bakılır: Maguindanao, Lanao del Sur ve Sulu takımadalarında altın/yeşil kubbeli camilere, hilalli BARMM devlet logolarına ve Lanao Gölü havzasına.' }
    ]
  });

  // ===========================================================================
  // 4. MALEZYA (16 EYALET VE FEDERAL TOPRAK)
  // ===========================================================================
  window.registerCountryPack({
    id: 'malezya',
    name: 'Malezya',
    sub: 'Siyah Bantlı TNB Direkleri · Sarı Altıgen Yol Kalkanı · Yarımada vs Borneo',
    Continent: 'Asya',
    flag: 'MY',
    unitLabel: 'eyalet / federal bölge',
    groupLabel: 'bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu Başı',
    codeDesc: 'Malezya’da siyah dikey TNB direk etiketi Yarımada’yı, etiketsiz SEB/SESB direkleri ve harfli (A/Q/S) yol kodları ise Borneo’yu (Sabah/Sarawak) anında ayırır.',
    geoVar: 'MY_GEO',
    bounds: [[0.85, 99.6], [7.4, 119.3]],
    groups: {
      'kuzey-yarimada': { name: 'Kuzey Yarımada (Perlis / Kedah / Penang / Perak)', color: '#c85a3a',
        desc: '04 ve 05 alan kodları; Kedah’ın düz çeltik tarlaları, Penang köprüleri ve Perak kalker mağara tepeleri.' },
      'merkez-guney': { name: 'Merkez & Güney Yarımada (KL / Selangor / Melaka / Johor)', color: '#3d7ab8',
        desc: 'Klang Vadisi metropolü (03), E1/E2 (PLUS) otoyolu, Negeri Sembilan/Melaka (06) ve Singapur sınırındaki Johor (07).' },
      'dogu-kiyisi': { name: 'Doğu Kıyısı (Kelantan / Terengganu / Pahang)', color: '#c4962c',
        desc: '09 alan kodu; Güney Çin Denizi kıyıları, Jawi (Arap harfli Malayca) yazılı tabelalar ve Titiwangsa yağmur ormanları.' },
      'borneo': { name: 'Doğu Malezya / Borneo (Sarawak / Sabah / Labuan)', color: '#2a9d8f',
        desc: '082–089 alan kodları; Pan-Borneo Otoyolu (AH150), siyah TNB bandı OLMAYAN direkler ve Kinabalu dağ silüeti.' }
    },
    visuals: [
      { id: 'my-tnb-black-band', cat: 'Elektrik Direği', title: 'Siyah Boyalı TNB Direk Bandı (Sadece Yarımada Malezya)',
        region: 'Yarımada Malezya (Perlis’ten Johor’a 13 eyalet)',
        svgId: 'my-tnb-black-band',
        desc: 'Nereye bakılır: Beton elektrik direklerinin gövdesine boyanmış dikey siyah dikdörtgen kutuya ve içindeki beyaz/sarı TNB (Tenaga Nasional Berhad) kodlarına. Bu siyah bant varsa %100 Yarımada Malezya’dasınız (Borneo’da bulunmaz).' },
      { id: 'my-hex-highway', cat: 'Yol Kalkanı', title: 'Sarı Altıgen JKR Karayolu Kalkanı & Eyalet Harf Önekleri',
        region: 'Tüm Malezya (Eyalet yollarında baş harf doğrudan eyaleti verir)',
        svgId: 'my-hex-highway',
        desc: 'Nereye bakılır: Yeşil veya mavi yön tabelalarındaki siyah çerçeveli sarı altıgen kalkanlara. Tek başına sayı varsa federal yoldur; başında harf varsa doğrudan eyalettir (J=Johor, K=Kedah, A=Perak, B=Selangor, C=Pahang, D=Kelantan, M=Melaka, N=N.Sembilan, P=Penang, R=Perlis, T=Terengganu, Q=Sarawak, SA=Sabah).' },
      { id: 'my-borneo-pole', cat: 'Borneo Ayrımı', title: 'Borneo (Sabah & Sarawak) Etiketsiz Direkler ve Pan-Borneo 1 Numaralı Yol',
        region: 'Sarawak (082–086) & Sabah (087–089)',
        svgId: 'my-borneo-pole',
        desc: 'Nereye bakılır: Elektrik direklerinde siyah TNB bandının olmamasına (Sarawak’ta SEB, Sabah’ta SESB işletir), çift şeritli Pan-Borneo (1 numaralı) otoyoluna ve "Tamparuli / Tuaran / Bintulu / Miri" gibi yerli Borneo yer adlarına.' },
      { id: 'my-east-coast-jawi', cat: 'Dil & Tabela', title: 'Doğu Kıyısı Çift Yazılı (Latin + Jawi Arap Harfli) Tabelalar',
        region: 'Kelantan & Terengganu (ve kısmen Pahang/Kedah)',
        svgId: 'my-east-coast-jawi',
        desc: 'Nereye bakılır: Belediye, dükkan ve sokak tabelalarında Latin harfli Malayca (Rumi) yazının hemen üstünde veya altında yer alan Jawi (Arap alfabesi) satırına. Kelantan ve Terengganu’da tüm ticari tabelalarda Jawi zorunludur.' }
    ],
    rules: [
      { title: 'Yarımada vs Borneo Saniyelik Test',
        desc: '1) Direkte siyah boyalı TNB kutusu varsa = Yarımada. 2) Telefon kodu 03–09 ise Yarımada, 082–089 ise Borneo. 3) Posta kodu 0xxxx–8xxxx ise Yarımada, 87xxx–98xxx ise Borneo.' },
      { title: 'Eyalet Yol Harfi = Plaka Harfi Kuralı',
        desc: 'Sarı altıgen içindeki eyalet yolu öneki (örn. B14, J32, A8, D11, C5) Malezya eyalet kodlarıyla birebir aynıdır: A Perak, B Selangor, C Pahang, D Kelantan, J Johor, K Kedah, M Melaka, N Negeri Sembilan, P Penang, R Perlis, T Terengganu.' }
    ],
    units: [
      { id: '09', name: 'Perlis', group: 'kuzey-yarimada', code: '04', code2: '01xxx–02xxx', capital: 'Kangar',
        cue: 'Nereye bakılır: R harfli sarı altıgen eyalet yollarına (R1, R15), Tayland sınırındaki münzevi kalker tepelerine (bukit) ve düz çeltik tarlalarına.' },
      { id: '02', name: 'Kedah', group: 'kuzey-yarimada', code: '04', code2: '05xxx–09xxx', capital: 'Alor Setar',
        cue: 'Nereye bakılır: K harfli yol kalkanlarına (K1 vb.), Malezya’nın "pirinç kâsesi" olan uçsuz bucaksız düz çeltik ovalarına ve Langkawi Adası’na.' },
      { id: '07', name: 'Pulau Pinang (Penang)', group: 'kuzey-yarimada', code: '04', code2: '10xxx–14xxx', capital: 'George Town',
        cue: 'Nereye bakılır: P harfli yol kalkanlarına, Penang Adası’nı anakaraya (Seberang Perai) bağlayan iki dev deniz köprüsüne ve kolonyal Çin/İngiliz shophouse mimarisine.' },
      { id: '08', name: 'Perak', group: 'kuzey-yarimada', code: '05', code2: '30xxx–36xxx', capital: 'Ipoh',
        cue: 'Nereye bakılır: 05 alan koduna, A harfli yol kalkanlarına (A1 vb.), Ipoh çevresindeki dikey kalker kayalıklarına ve eski kalay madeni göletlerine.' },
      { id: '10', name: 'Selangor', group: 'merkez-guney', code: '03', code2: '40xxx–48xxx / 63xxx–68xxx', capital: 'Shah Alam',
        cue: 'Nereye bakılır: 03 alan koduna, B harfli yol kalkanlarına, çok şeritli paralı otoyollara (LDP, KESAS, NKVE) ve Port Klang / Petaling Jaya / Subang sanayi-konut kuşaklarına.' },
      { id: '14', name: 'Kuala Lumpur (Federal Toprak)', group: 'merkez-guney', code: '03', code2: '50xxx–60xxx', capital: 'Kuala Lumpur',
        cue: 'Nereye bakılır: DBKL (Dewan Bandaraya Kuala Lumpur) logolu mavi/beyaz sokak tabelalarına, Petronas İkiz Kuleleri / KL Tower silüetine ve yoğun monoray/MRT viyadüklerine.' },
      { id: '16', name: 'Putrajaya (Federal Toprak)', group: 'merkez-guney', code: '03', code2: '62xxx', capital: 'Putrajaya',
        cue: 'Nereye bakılır: "Presint 1–20" yazılı tabelalara, anıtsal kubbeli bakanlık saraylarına, yapay göl köprülerine ve direklerdeki süslü sokak lambalarına.' },
      { id: '05', name: 'Negeri Sembilan', group: 'merkez-guney', code: '06', code2: '70xxx–73xxx', capital: 'Seremban',
        cue: 'Nereye bakılır: N harfli yol kalkanlarına, uçları manda boynuzu gibi yukarı kıvrık geleneksel Minangkabau çatılarına ve 06 alan koduna.' },
      { id: '04', name: 'Melaka', group: 'merkez-guney', code: '06', code2: '75xxx–78xxx', capital: 'Melaka',
        cue: 'Nereye bakılır: M harfli yol kalkanlarına, kırmızı Hollanda/Portekiz tarihi meydanına, süslü taş merdivenli geleneksel Malay evlerine ve 06 alan koduna.' },
      { id: '01', name: 'Johor', group: 'merkez-guney', code: '07', code2: '79xxx–86xxx', capital: 'Johor Bahru',
        cue: 'Nereye bakılır: 07 alan koduna, J harfli yol kalkanlarına, Yarımada’nın en geniş yağ palmiyesi plantasyonlarına ve Singapur sınırındaki Johor Bahru/Iskandar Puteri kulelerine.' },
      { id: '06', name: 'Pahang', group: 'dogu-kiyisi', code: '09 (Batı 03/05)', code2: '25xxx–28xxx / 39xxx', capital: 'Kuantan',
        cue: 'Nereye bakılır: C harfli yol kalkanlarına. Yarımada’nın en büyük eyaleti; Cameron/Genting yaylaları, E8 Karak-Doğu Kıyısı Otoyolu ve Kuantan limanı.' },
      { id: '11', name: 'Terengganu', group: 'dogu-kiyisi', code: '09', code2: '20xxx–24xxx', capital: 'Kuala Terengganu',
        cue: 'Nereye bakılır: T harfli yol kalkanlarına, Jawi yazılı tabelalara, Güney Çin Denizi boyunca uzanan 3 numaralı sahil yoluna ve Kuala Terengganu açılır köprüsüne (09).' },
      { id: '03', name: 'Kelantan', group: 'dogu-kiyisi', code: '09', code2: '15xxx–19xxx', capital: 'Kota Bharu',
        cue: 'Nereye bakılır: D harfli yol kalkanlarına, her dükkân tabelasında büyük Jawi (Arap harfli) yazılara ve Tayland sınırındaki Kelantan Nehri deltasına (09).' },
      { id: '13', name: 'Sarawak', group: 'borneo', code: '082–086', code2: '93xxx–98xxx', capital: 'Kuching',
        cue: 'Nereye bakılır: 082–086 alan kodlarına, Q harfli yol kalkanlarına, siyah TNB bandı OLMAYAN direklere ve Kuching (kedi heykelleri) / Sibu / Bintulu / Miri tabelalarına.' },
      { id: '12', name: 'Sabah', group: 'borneo', code: '087–089', code2: '88xxx–91xxx', capital: 'Kota Kinabalu',
        cue: 'Nereye bakılır: 088/089 alan kodlarına, SA harfli yol kalkanlarına, kuzeybatıda 4.095 metrelik testere dişli Kinabalu Dağı silüetine ve doğuda (Sandakan/Tawau) dev palmiye denizine.' },
      { id: '15', name: 'Labuan (Federal Toprak)', group: 'borneo', code: '087', code2: '87xxx', capital: 'Victoria (Bandar Labuan)',
        cue: 'Nereye bakılır: Sabah kıyısı açıklarındaki gümrüksüz finans ve açık deniz petrol adası; "Perbadanan Labuan" tabelaları, 087 alan kodu ve 87000 posta kodu.' }
    ]
  });

  // ===========================================================================
  // 5. TAYVAN (21 İL VE ÖZEL BELEDİYE)
  // ===========================================================================
  var TW_INFO = {
    'tpe': ['Taipei (臺北市)', 'kuzey', '02', '100–116', 'Taipei', 'Yeşil zeminli iki renkli sokak tabelaları, yoğun MRT istasyonları, Taipei 101 silüeti ve 02 alan kodu.'],
    'tpq': ['Yeni Taipei (新北市)', 'kuzey', '02', '207–253', 'Banqiao', 'Taipei’yi çevreleyen dev metropol halkası; Danshui Nehri köprüleri, kuzey kıyı kayalıkları ve 02 alan kodu.'],
    'kee': ['Keelung (基隆市)', 'kuzey', '02', '200–206', 'Keelung', 'Yağmurlu kuzey liman kenti; konteyner vinçleri, dar dağ tünelleri ve 200–206 posta kodları (02).'],
    'tao': ['Taoyuan (桃園市)', 'kuzey', '03', '320–338', 'Taoyuan', '03 alan kodu, uluslararası havalimanı lojistik parkları, göletli kızıl toprak platosu ve 110–118 ilçe yolları.'],
    'hsq': ['Hsinchu İli (新竹縣)', 'kuzey', '03', '302–315', 'Zhubei', '03 alan kodu, Zhubei yüksek hızlı tren (THSR) kuleleri, Hakka köyleri ve 118/120/122 numaralı dağ yolları.'],
    'hsz': ['Hsinchu Kenti (新竹市)', 'kuzey', '03', '300', 'Hsinchu', 'Tayvan’ın Silikon Vadisi (Hsinchu Bilim Parkı), 03 alan kodu ve 300 posta kodu.'],
    'ila': ['Yilan (宜蘭縣)', 'kuzey', '03', '260–272', 'Yilan', 'Doğu kıyısında üç yanı dik yeşil dağlarla çevrili üçgen Lanyang çeltik ovası, Guishan Adası silüeti ve 03 alan kodu.'],
    'mia': ['Miaoli (苗栗縣)', 'merkez', '037', '350–369', 'Miaoli', '037 alan kodu, kıyı rüzgâr türbinleri, tepelik çay/çilek bahçeleri ve 119–130 numaralı ilçe yolları.'],
    'txg': ['Taichung (臺中市)', 'merkez', '04', '400–439', 'Taichung', '04 alan kodu, geniş bulvarlar, Dajia/Wu nehir köprüleri ve 125–136 numaralı ilçe yolları.'],
    'cha': ['Changhua (彰化縣)', 'merkez', '04', '500–530', 'Changhua', '04 alan kodu, Baguashan Buda tepesi, yoğun sera/çiçek tarlaları ve 137–152 numaralı ilçe yolları.'],
    'nan': ['Nantou (南投縣)', 'merkez', '049', '540–558', 'Nantou', '049 alan kodu; Tayvan’ın denize kıyısı olmayan tek ili, Sun Moon Gölü, yüksek çay bahçeleri ve 14/16/21 numaralı dağ yolları.'],
    'yun': ['Yunlin (雲林縣)', 'merkez', '05', '630–655', 'Douliu', '05 alan kodu, Choshui Nehri güneyindeki dümdüz tarım ovası, Mailiao petrokimya bacaları ve 154–165 numaralı yollar.'],
    'cyq': ['Chiayi İli (嘉義縣)', 'guney', '05', '602–625', 'Taibao', '05 alan kodu, Yengeç Dönencesi anıtı, batıda istiridye çiftlikleri, doğuda Alishan dağ yolu (Otoyol 18) ve 157–172 numaralı yollar.'],
    'cyi': ['Chiayi Kenti (嘉義市)', 'guney', '05', '600', 'Chiayi', '05 alan kodu ve 600 posta kodu; Alishan orman demiryolunun başlangıç kenti.'],
    'tnn': ['Tainan (臺南市)', 'guney', '06', '700–745', 'Tainan', '06 alan kodu, kırmızı tuğlalı tarihi tapınaklar, tuz tavaları/balık havuzları ve 171–182 numaralı ilçe yolları.'],
    'khh': ['Kaohsiung (高雄市)', 'guney', '07', '800–852', 'Kaohsiung', '07 alan kodu, dev konteyner limanı, geniş palmiyeli bulvarlar ve 181–188 numaralı ilçe yolları.'],
    'pif': ['Pingtung (屏東縣)', 'guney', '08', '900–947', 'Pingtung', '08 alan kodu, betel cevizi palmiyeleri, Otoyol 1 ve 26’nın Kenting tropikal yarımadasına uzanan en güney ucu (185–200 yollar).'],
    'hua': ['Hualien (花蓮縣)', 'dogu-adalar', '03', '970–983', 'Hualien', '03 alan kodu, Otoyol 9 (Doğu Rift Vadisi) ve Otoyol 11 (Pasifik kıyısı); Taroko mermer kanyonları ve dik dağ duvarı.'],
    'ttt': ['Taitung (臺東縣)', 'dogu-adalar', '089', '950–966', 'Taitung', '089 alan kodu, Pasifik kıyısı boyunca uzanan Otoyol 9 ve 11, şeker elması bahçeleri ve 193/197 numaralı vadi yolları.'],
    'pen': ['Penghu Takımadaları (澎湖縣)', 'dogu-adalar', '06', '880–885', 'Magong', 'Tayvan Boğazı’nda düz bazalt adalar; mercan taşı duvarlar, rüzgâr türbinleri ve 201–204 numaralı ada yolları (06).'],
    'kin': ['Kinmen Adası (金門縣)', 'dogu-adalar', '082', '890–896', 'Jincheng', 'Çin anakarası (Xiamen) hemen karşısında; kızıl granit, sorgum tarlaları, rüzgâr aslanı (Wind Lion) heykelleri ve 082 alan kodu.']
  };

  var twUnits = Object.keys(TW_INFO).sort().map(function(id) {
    var r = TW_INFO[id];
    return {
      id: id, name: r[0], group: r[1], code: r[2], code2: r[3], capital: r[4],
      cue: 'Nereye bakılır: ' + r[5]
    };
  });

  window.registerCountryPack({
    id: 'tayvan',
    name: 'Tayvan',
    sub: 'Sarı-Siyah Direkler · Mavi Taipower Koordinat Plakası · Kuzeyden Güneye Yol Numaraları',
    Continent: 'Asya',
    flag: 'TW',
    unitLabel: 'il / özel belediye',
    groupLabel: 'bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu',
    codeDesc: 'Tayvan’da ilçe yolları (101–204) kuzeyden güneye tam sırayla artar; telefon alan kodları da saat yönünün tersine 02 (Taipei) → 03 → 037 → 04 → 049 → 05 → 06 → 07 → 08 → 089 şeklinde dizilir.',
    geoVar: 'TW_GEO',
    bounds: [[21.85, 119.3], [25.35, 122.05]],
    groups: {
      'kuzey': { name: 'Kuzey (Taipei / Yeni Taipei / Keelung / Taoyuan / Hsinchu / Yilan)', color: '#c85a3a',
        desc: '02 ve 03 alan kodları; 101–122 arası ilçe yolları, nemli subtropikal tepeler ve yoğun metropol dokusu.' },
      'merkez': { name: 'Merkez (Miaoli / Taichung / Changhua / Nantou / Yunlin)', color: '#c4962c',
        desc: '037, 04, 049 ve 05 alan kodları; 124–165 arası ilçe yolları, batı sanayi-tarım ovaları ve Merkez Sıradağlar.' },
      'guney': { name: 'Güney (Chiayi / Tainan / Kaohsiung / Pingtung)', color: '#3d7ab8',
        desc: '05, 06, 07 ve 08 alan kodları; 166–200 arası ilçe yolları, güneşli tropikal ovalar, balık havuzları ve betel palmiyeleri.' },
      'dogu-adalar': { name: 'Doğu Rift Vadisi & Adalar (Hualien / Taitung / Penghu / Kinmen)', color: '#2a9d8f',
        desc: 'Otoyol 9 ve 11 boyunca uzanan dik Pasifik kıyı dağları (Hualien 03, Taitung 089) ve boğaz adaları (Penghu 06, Kinmen 082).' }
    },
    visuals: [
      { id: 'tw-diag-pole', cat: 'Elektrik Direği', title: 'Tabana Kadar İnen Diyagonal Sarı-Siyah Şeritli Tayvan Direği',
        region: 'Tüm Tayvan (Japonya’dan farkı: şeritler diyagonaldir ve en alta kadar iner)',
        svgId: 'tw-diag-pole',
        desc: 'Nereye bakılır: Beton elektrik direklerinin alt kısmına. Japonya’da sarı-siyah şeritler dikeydir ve yerden biraz yukarıda biter; Tayvan’da ise 45 derece eğik (diyagonal) boyanır ve doğrudan kaldırıma/zemine kadar iner.' },
      { id: 'tw-blue-grid-plate', cat: 'Direk Plakası', title: 'Mavi Metal Taipower Koordinat Plakası (Harf = Kuzeyden Güneye Kuşak)',
        region: 'A–B Kuzey · C–F Kuzey-Merkez · G–K Merkez · L–Q Güney · R–W En Güney',
        svgId: 'tw-blue-grid-plate',
        desc: 'Nereye bakılır: Direğin üzerindeki mavi dikdörtgen metal plakada yazılı alfanümerik koda (örn. G1234...). İlk harf Tayvan enerji ızgarasının enlem kuşağını verir: A/B/C Taipei-Taoyuan, G/H/J/K Taichung-Yunlin, M/N/P/Q Tainan-Kaohsiung, R/S/T Pingtung.' },
      { id: 'tw-prov-shield', cat: 'Yol Kalkanı', title: 'Mavi Üçgen İl Otoyolu (省道) & Kare Beyaz İlçe Yolu (101–204)',
        region: 'Tek sayılar Kuzey-Güney · Çift sayılar Doğu-Batı · 101–204 Kuzeyden Güneye',
        svgId: 'tw-prov-shield',
        desc: 'Nereye bakılır: Mavi ters üçgen kalkanlara (İl otoyolu: 1, 3, 9, 11, 17, 19, 21 Kuzey-Güney; 2, 7, 8, 14, 18, 20, 24 Doğu-Batı) ve beyaz kare ilçe kalkanlarına (101 Yeni Taipei’den başlar, 200 Pingtung’da biter).' },
      { id: 'tw-east-rift', cat: 'Biyom & Vadi', title: 'Hualien & Taitung Doğu Rift Vadisi (Huadong) ve Pasifik Uçurumları',
        region: 'Doğu Tayvan (Hualien & Taitung - Otoyol 9 ve 11)',
        svgId: 'tw-east-rift',
        desc: 'Nereye bakılır: Yolun hemen iki yanında duvar gibi yükselen 3.000 metrelik bulutlu yeşil sıradağlara (Otoyol 9) veya bir yanında Pasifik Okyanusu, diğer yanında dik kıyı dağları olan sahil yoluna (Otoyol 11).' }
    ],
    rules: [
      { title: '101–204 İlçe Yolu (縣道 / 市道) Kuzey-Güney Cetveli',
        desc: 'Beyaz kare içindeki 3 haneli yol numarası haritadaki enlemi doğrudan verir: 101–116 Taipei/Yeni Taipei, 110–118 Taoyuan, 118–122 Hsinchu, 124–130 Miaoli, 132–136 Taichung, 137–152 Changhua, 154–165 Yunlin, 166–172 Chiayi, 171–182 Tainan, 181–188 Kaohsiung, 185–200 Pingtung, 201–204 Penghu.' },
      { title: 'Geleneksel Çince Karakterler + Sağdan Trafik',
        desc: 'Tayvan’da trafik sağdan akar ve tabelalarda Geleneksel Çince (繁體字, örn. 臺, 縣, 鄉, 鎮) kullanılır.' }
    ],
    units: twUnits
  });

  // ===========================================================================
  // 6. GÜNEY AFRİKA (9 EYALET)
  // ===========================================================================
  window.registerCountryPack({
    id: 'guney-afrika',
    name: 'Güney Afrika',
    sub: 'Sarı Omuz Çizgili Yeşil R-Tabelaları · 01x–05x Alan Kodları · Kap & Highveld Biyomları',
    Continent: 'Afrika',
    flag: 'ZA',
    unitLabel: 'eyalet',
    groupLabel: 'bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'R-Yolu Kuşağı',
    codeDesc: 'Güney Afrika’da koyu yeşil yön tabelalarındaki sarı R-yolu numaraları (R3xx/R4xx Kap, R5xx Gauteng/Kuzey, R6xx/R7xx Doğu/Özgür Devlet) ve 01x–05x alan kodları eyaleti verir.',
    geoVar: 'ZA_GEO',
    bounds: [[-34.85, 16.45], [-22.1, 32.9]],
    groups: {
      'kap': { name: 'Kap Eyaletleri (Batı / Doğu / Kuzey Kap)', color: '#c85a3a',
        desc: 'Masa Dağı ve fynbos çalılıkları (Batı Kap 021/02x), yarı-çöl Karoo/Kalahari (Kuzey Kap 053/054) ve Hint Okyanusu kıyısı (Doğu Kap 04x).' },
      'plato': { name: 'İç Plato / Highveld (Gauteng / Özgür Devlet / Kuzeybatı)', color: '#c4962c',
        desc: 'Johannesburg-Pretoria metropolü (Gauteng 011/012), altın sarısı yüksek çayırlar (Free State 051/05x) ve platin/mısır kuşağı (North West 014/018).' },
      'dogu-kuzey': { name: 'Doğu & Bushveld (KwaZulu-Natal / Mpumalanga / Limpopo)', color: '#2a9d8f',
        desc: 'Drakensberg dağları ve subtropikal şekerkamışı kıyısı (KZN 03x), kömür/okaliptüs yaylaları (Mpumalanga 013) ve baobablı savan (Limpopo 015).' }
    },
    visuals: [
      { id: 'za-green-r-sign', cat: 'Yol & Tabela', title: 'Sarı Dış Çizgili Asfalt ve Koyu Yeşil N / R Yön Tabelaları',
        region: 'R3xx/R4xx Kap · R5xx Gauteng/Limpopo/NW · R6x KZN · R7xx Free State',
        svgId: 'za-green-r-sign',
        desc: 'Nereye bakılır: Soldan akan trafiğe, yolun dış kenarındaki sarı boyalı omuz çizgilerine ve koyu yeşil zemin üzerine sarı rota kodlu (N1–N18, R21–R82, R300–R799) büyük yön tabelalarına.' },
      { id: 'za-cape-fynbos', cat: 'Biyom & Mimari', title: 'Batı Kap Fynbos Çalılıkları, Bağlar ve Cape Dutch Beyaz Alınlıklar',
        region: 'Batı Kap (Western Cape - 021, 023, 028, 044)',
        svgId: 'za-cape-fynbos',
        desc: 'Nereye bakılır: Yol kenarında kısa boylu, sık yapraklı fynbos/protea bitki örtüsüne, keskin kıvrımlı kumtaşı sıradağlara (Masa Dağı / Hottentots Holland) ve kıvrımlı beyaz kalkan duvarlı Cape Dutch çiftlik evlerine.' },
      { id: 'za-kzn-rondavel', cat: 'Kırsal Yerleşim', title: 'KwaZulu-Natal & Doğu Kap Tepelerinde Yuvarlak Kulübeler (Rondavel)',
        region: 'KwaZulu-Natal (03x) & Doğu Kap (Transkei - 047)',
        svgId: 'za-kzn-rondavel',
        desc: 'Nereye bakılır: Yeşil yuvarlanan tepelerin yamaçlarına geniş aralıklarla dağılmış dairesel planlı, konik saz veya sac çatılı geleneksel kulübelere (rondavel). Doğu Kap’ta turkuaz/pembe boyalı, KZN’de beyaz/toprak tonludur.' },
      { id: 'za-highveld-karoo', cat: 'Plato & Yarı-Çöl', title: 'Free State Altın Highveld Çayırları vs Kuzey Kap Karoo Yarı-Çölü',
        region: 'Free State (051) & Northern Cape (053/054)',
        svgId: 'za-highveld-karoo',
        desc: 'Nereye bakılır: Ufka kadar dümdüz uzanan sarı kuru otlaklar, mısır siloları ve masa üstü tepeler (koppies) Free State’i; kızıl kum, seyrek bodur çalılar ve rüzgâr değirmenli su pompaları ise Kuzey Kap (Karoo/Kalahari) bölgesini gösterir.' }
    ],
    rules: [
      { title: '3 Haneli R-Yolu (Regional Route) Kuşakları',
        desc: 'Yeşil tabelalardaki 3 haneli R kodları eyalet bölgelerine göre ayrılır: R3xx Batı/Kuzey/Doğu Kap, R4xx Güney Doğu Kap, R5xx Gauteng/Kuzeybatı/Limpopo/Mpumalanga, R6xx KwaZulu-Natal, R7xx Free State.' },
      { title: '01x–05x Telefon Alan Kodları',
        desc: '011/012/010 Gauteng (Joburg/Pretoria), 013 Mpumalanga, 014/018 North West, 015 Limpopo, 021/023/028 Batı Kap, 031–039 KwaZulu-Natal, 041–049 Doğu Kap (ve 044 Garden Route), 051/056–058 Free State, 053/054 Kuzey Kap.' }
    ],
    units: [
      { id: 'wc', name: 'Western Cape (Batı Kap)', group: 'kap', code: '021 / 023 / 028 / 044', code2: 'R43–R45 / R60–R62 / R3xx', capital: 'Cape Town',
        cue: 'Nereye bakılır: 021 (Cape Town) alan koduna, Masa Dağı ve keskin kıvrımlı kumtaşı dağlarına, fynbos çalılıklarına, üzüm bağlarına ve R300–R328 / R43–R45 yol tabelalarına.' },
      { id: 'nc', name: 'Northern Cape (Kuzey Kap)', group: 'kap', code: '053 / 054', code2: 'R27 / R31 / R355–R389', capital: 'Kimberley',
        cue: 'Nereye bakılır: 053 (Kimberley) ve 054 (Upington) kodlarına; Güney Afrika’nın en seyrek nüfuslu yarı-çölü (Karoo ve Kalahari kızıl kumulları), ok kılıfı ağaçları (quiver tree) ve sosyal dokumacı kuşların elektrik direklerindeki dev saman yuvalarına.' },
      { id: 'ec', name: 'Eastern Cape (Doğu Kap)', group: 'kap', code: '041–043 / 045–049', code2: 'R61 / R63 / R67 / R72 / R335–R410', capital: 'Bhisho (Gqeberha / East London)',
        cue: 'Nereye bakılır: 041 (Gqeberha) ve 043 (East London) kodlarına; batıda kaktüs/aloe çalılıkları, doğuda (eski Transkei, N2) yeşil tepeler üzerinde turkuaz/pembe boyalı rondavel kulübeleri ve Xhosa yer adları (eNgcobo, uMthatha).' },
      { id: 'fs', name: 'Free State (Özgür Devlet)', group: 'plato', code: '051 / 056–058', code2: 'R26–R30 / R700–R730', capital: 'Bloemfontein',
        cue: 'Nereye bakılır: 051 alan koduna, R7xx numaralı yollara, dümdüz altın sarısı mısır/ayçiçeği çayırlarına, tahıl silolarına ve doğuda Lesotho sınırındaki kızıl-sarı kumtaşı kayalıklarına (Clarens/Golden Gate).' },
      { id: 'nw', name: 'North West (Kuzeybatı)', group: 'plato', code: '014 / 018', code2: 'R49–R54 / R500–R509', capital: 'Mahikeng (Rustenburg)',
        cue: 'Nereye bakılır: 014 ve 018 alan kodlarına, N4 (Platinum Highway) ve N12 otoyollarına, Rustenburg platin maden kulelerine ve düz dikenli akasya çalılıklarına.' },
      { id: 'gt', name: 'Gauteng', group: 'plato', code: '011 / 012 / 010 / 016', code2: 'R21 / R24 / R55 / R59 / M1–M2', capital: 'Johannesburg (Pretoria)',
        cue: 'Nereye bakılır: 011 (Joburg) ve 012 (Pretoria) kodlarına, mavi e-toll (elektronik geçiş) otoyol taklarına, yüksek güvenlikli duvarlı banliyölere, sarı maden atık tepelerine ve mor jakaranda ağaçlarına.' },
      { id: 'nl', name: 'KwaZulu-Natal', group: 'dogu-kuzey', code: '031–039', code2: 'R33–R34 / R66 / R74 / R102 / R6xx', capital: 'Pietermaritzburg (Durban)',
        cue: 'Nereye bakılır: 031 (Durban) ve 033–039 kodlarına, R6xx yollarına, kıyı boyunca yoğun şekerkamışı tarlalarına, iç kesimde kereste (çam/okaliptüs) plantasyonlarına, Drakensberg duvarına ve Kwa-/uM-/e- ile başlayan Zulu yer adlarına.' },
      { id: 'mp', name: 'Mpumalanga', group: 'dogu-kuzey', code: '013 / 017', code2: 'R35–R40 / R532–R546', capital: 'Mbombela (Nelspruit)',
        cue: 'Nereye bakılır: 013 alan koduna, N4 otoyoluna; batıda (Highveld: Witbank/Secunda) dev kömür termik santral bacalarına, doğuda (Lowveld: Sabie/Graskop/Nelspruit) Blyde Kanyonu uçurumlarına, çam/okaliptüs ormanlarına ve narenciye/makadamya bahçelerine.' },
      { id: 'lp', name: 'Limpopo', group: 'dogu-kuzey', code: '015 / 014', code2: 'R36–R37 / R71 / R81 / R510–R531', capital: 'Polokwane',
        cue: 'Nereye bakılır: 015 alan koduna, N1’in Zimbabve (Beitbridge) sınırına uzanan kuzey ucuna, kırmızı topraklı sıcak Bushveld savanına, dev gövdeli baobab ve marula ağaçlarına (Musina/Tzaneen).' }
    ]
  });

  // ===========================================================================
  // 7. NİJERYA (36 EYALET + FCT ABUJA)
  // ===========================================================================
  var NG_INFO = {
    'la': ['Lagos', 'south-west', '01', '100xxx–106xxx', 'Ikeja (Lagos)', 'Sarı-siyah çizgili Danfo minibüsler, üçüncü anakara köprüsü, yoğun lagün kıyısı ve her dükkân tabelasında ", Lagos" adresi.'],
    'og': ['Ogun', 'south-west', '039', '110xxx–121xxx', 'Abeokuta', 'Lagos-İbadan Otoyolu (E1), Abeokuta granit kayalıkları (Olumo Rock), sanayi fabrikaları ve Yoruba tabelalar.'],
    'oy': ['Oyo', 'south-west', '02', '200xxx–212xxx', 'İbadan', 'İbadan’ın uçsuz bucaksız paslı kahverengi oluklu sac çatı denizi, kırmızı toprak ve Ogbomoso/Oyo tabelaları.'],
    'os': ['Osun', 'south-west', '035', '220xxx–233xxx', 'Osogbo', 'Yoruba kültür merkezi (Osogbo, Ile-Ife); kakao/palmiye koruları ve kızıl topraklı tepeler.'],
    'on': ['Ondo', 'south-west', '034', '340xxx–352xxx', 'Akure', 'Akure ve Idanre çevresinde orman içinden yükselen dev çıplak granit kubbeler (inselberg) ve kakao bahçeleri.'],
    'ek': ['Ekiti', 'south-west', '030', '360xxx–372xxx', 'Ado-Ekiti', 'Tepelik yeşil orman ve dik kuvarsit/granit sırtlar arasında kurulu Ado-Ekiti vadisi.'],
    'ed': ['Edo', 'south-south', '052', '300xxx–312xxx', 'Benin City', 'Batı ile Doğu’yu bağlayan Benin City kavşağı; koyu kırmızı laterit toprak (Benin red earth) ve kauçuk/palmiye ormanları.'],
    'de': ['Delta', 'south-south', '053 / 056', '320xxx–334xxx', 'Asaba (Warri)', 'Nijer Nehri üzerindeki çelik Asaba-Onitsha köprüsü, Warri petrol tesisleri ve mangrov bataklık kanalları.'],
    'by': ['Bayelsa', 'south-south', '089', '560xxx–569xxx', 'Yenagoa', 'Nijer Deltası’nın en sulak kıyı eyaleti; Yenagoa bataklık otoyolları, kazıklı evler ve petrol boru hatları.'],
    'ri': ['Rivers', 'south-south', '084', '500xxx–512xxx', 'Port Harcourt', 'Port Harcourt rafineri/petrol başkenti; yoğun yağışlı tropikal kıyı, üstgeçitler ve RSU/PHC tabelaları.'],
    'ak': ['Akwa Ibom', 'south-south', '085', '520xxx–534xxx', 'Uyo', 'Uyo’nun bakımlı geniş çift şeritli bulvarları, Godswill Akpabio stadyumu ve yoğun rafya/yağ palmiyesi koruları.'],
    'cr': ['Cross River', 'south-south', '087', '540xxx–552xxx', 'Calabar', 'Calabar’ın temiz yeşil caddeleri, Kamerun sınırındaki Oban/Obudu yağmur ormanı dağları ve 54xxxx posta kodları.'],
    'an': ['Anambra', 'south-east', '046 / 048', '420xxx–435xxx', 'Awka (Onitsha / Nnewi)', 'Onitsha dev ticaret pazarı, Awka-Enugu otoyolu, derin kırmızı toprak erozyon yarıkları (gully) ve Igbo tabelalar.'],
    'en': ['Enugu', 'south-east', '042', '400xxx–413xxx', 'Enugu', 'Kömür kenti Enugu; Udi/Nsukka kızıl kumtaşı tepeleri, çam ağaçları ve 9th Mile kavşağı.'],
    'eb': ['Ebonyi', 'south-east', '043', '480xxx–491xxx', 'Abakaliki', 'Abakaliki pirinç değirmenleri, beton kaplamalı yeni bulvarlar ve gösterişli döner kavşak kemerleri.'],
    'im': ['Imo', 'south-east', '083', '460xxx–474xxx', 'Owerri', 'Doğu kalbi Owerri; yoğun otel/kilise tabelaları, kırmızı toprak ve sık yağ palmiyesi ormanları.'],
    'ab': ['Abia', 'south-east', '082 / 088', '440xxx–453xxx', 'Umuahia (Aba)', 'Aba ticaret ve üretim kenti, Enugu-Port Harcourt Otoyolu (A3) ve Umuahia kızıl tepeleri.'],
    'fc': ['FCT Abuja', 'north-central', '09', '900xxx–905xxx', 'Abuja', '8–10 şeritli kusursuz asfalt otoyollar, Aso Rock ve Zuma Rock dev granit monolitleri, modern bakanlık binaları.'],
    'ni': ['Niger', 'north-central', '066', '910xxx–923xxx', 'Minna (Suleja)', 'Nijerya’nın yüzölçümü en büyük eyaleti; Abuja sınırındaki Suleja/Zuma Rock, Minna savanı ve Kainji/Jebba barajları.'],
    'kw': ['Kwara', 'north-central', '031', '240xxx–252xxx', 'Ilorin', 'Güneybatı ormanı ile kuzey savanı arasındaki geçiş kuşağı; Ilorin camileri, kaju/shea ağaçları ve Jebba Nijer köprüsü.'],
    'ko': ['Kogi', 'north-central', '058', '260xxx–272xxx', 'Lokoja', 'Nijer ve Benue nehirlerinin birleştiği Lokoja kavşağı (A2 otoyolu), Obajana dev çimento fabrikası ve masa tepeler.'],
    'be': ['Benue', 'north-central', '044', '970xxx–982xxx', 'Makurdi', 'Nijerya’nın "gıda sepeti"; Makurdi Benue Nehri köprüleri, yam/mango bahçeleri ve saz çatılı yuvarlak Tiv ambarları.'],
    'pl': ['Plateau', 'north-central', '073', '930xxx–942xxx', 'Jos', '1.200 m rakımlı serin Jos Platosu; üst üste yığılmış dev granit kaya blokları (kopjes), kaktüs çitler ve okaliptüsler.'],
    'na': ['Nassarawa', 'north-central', '047', '950xxx–962xxx', 'Lafia', 'Abuja’nın hemen doğu çıkışı (Mararaba/Keffi/Lafia koridoru); dalgalı savan tepeleri ve granit kubbeler.'],
    'kd': ['Kaduna', 'north-west', '062', '800xxx–811xxx', 'Kaduna (Zaria)', 'Abuja-Kaduna-Kano (A2) ana otoyolu; Zaria üniversite kenti, açık savan ve Hausa/İngilizce tabelalar.'],
    'kn': ['Kano', 'north-west', '064', '700xxx–713xxx', 'Kano', 'Kuzeyin en büyük ticaret metropolü; sarı-turuncu üç tekerlekli Keke Napep triportörler, kerpiç sur kapıları ve düz Sahel ovası.'],
    'kt': ['Katsina', 'north-west', '065', '820xxx–832xxx', 'Katsina', 'Nijer sınırında kurak Sahel savanı; neem ve baobab ağaçları, kırmızımsı kumlu toprak ve geleneksel Hausa mimarisi.'],
    'so': ['Sokoto', 'north-west', '060', '840xxx–852xxx', 'Sokoto', 'En kuzeybatı uç; Sokoto Sultanlığı kemerleri, yarı-çöl kumlu düz arazi ve kavurucu güneşli açık ufuk.'],
    'ke': ['Kebbi', 'north-west', '068', '860xxx–872xxx', 'Birnin Kebbi', 'Sokoto/Nijer nehir taşkın ovalarında soğan ve çeltik tarlaları, düz savan ve Birnin Kebbi beyaz bordürlü bulvarları.'],
    'za': ['Zamfara', 'north-west', '063', '880xxx–891xxx', 'Gusau', 'A126 yolu üzerinde Gusau; kuru dikenli çalı savanı ve tekil granit kaya sırtları.'],
    'ji': ['Jigawa', 'north-west', '064', '720xxx–732xxx', 'Dutse', 'Dutse’de palmiye heykelli kavşaklar, dev granit kaya tepeleri ve düz kumlu Sahel tarlaları.'],
    'ba': ['Bauchi', 'north-east', '077', '740xxx–752xxx', 'Bauchi', 'Jos Platosu’ndan kuzeydoğu savanına iniş; Yankari doğa koruma alanı tabelaları ve baobablı açık arazi.'],
    'go': ['Gombe', 'north-east', '072', '760xxx–771xxx', 'Gombe', 'Kuzeydoğunun merkez kavşağı; kızıl kumtaşı sırtları, Bima Tepesi ve geniş yeni şehir içi yolları.'],
    'yo': ['Yobe', 'north-east', '074', '620xxx–632xxx', 'Damaturu', 'Yarı-kurak Sahel kumulları, akasya/neem ağaçları ve Damaturu-Potiskum A3 karayolu.'],
    'bo': ['Borno', 'north-east', '076', '600xxx–612xxx', 'Maiduguri', 'Çad Gölü havzası; Maiduguri’de yol boyunca sık dikilmiş gölgelik neem ağaçları ve dümdüz kumlu Sahel ovası.'],
    'ad': ['Adamawa', 'north-east', '075', '640xxx–652xxx', 'Yola', 'Benue Nehri vadisi (Yola/Jimeta) ve Kamerun sınırında yükselen Mandara/Shebshi dağ sıraları.'],
    'ta': ['Taraba', 'north-east', '079', '660xxx–672xxx', 'Jalingo', 'Jalingo savanından güneydoğudaki 2.400 metrelik yemyeşil Mambilla Platosu çay/otlak yaylasına uzanan dağlık eyalet.']
  };

  var ngUnits = Object.keys(NG_INFO).sort().map(function(id) {
    var r = NG_INFO[id];
    return {
      id: id, name: r[0], group: r[1], code: r[2], code2: r[3], capital: r[4],
      cue: 'Nereye bakılır: ' + r[5]
    };
  });

  window.registerCountryPack({
    id: 'nijerya',
    name: 'Nijerya',
    sub: 'Tam Adresli Tabelalar · Lagos Sarı Danfo · Güney Yağmur Ormanı vs Kuzey Sahel',
    Continent: 'Afrika',
    flag: 'NG',
    unitLabel: 'eyalet',
    groupLabel: 'jeopolitik bölge',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu',
    codeDesc: 'Nijerya’da neredeyse her dükkân, okul, kilise ve cami tabelasının en alt satırında tam açık adres ve eyalet adı ("..., Ikeja, Lagos State" veya "..., Kano State") İngilizce olarak açıkça yazar.',
    geoVar: 'NG_GEO',
    bounds: [[4.25, 2.65], [13.9, 14.7]],
    groups: {
      'south-west': { name: 'Güneybatı / Yoruba Kuşağı (Lagos / Oyo / Ogun / Ondo / Osun / Ekiti)', color: '#c85a3a',
        desc: 'Lagos sarı-siyah Danfo minibüsleri, İbadan paslı kahverengi çatıları, granit inselberg kubbeleri ve Yoruba yer adları (Abeokuta, Akure, Osogbo).' },
      'south-south': { name: 'Güney-Güney / Nijer Deltası (Rivers / Edo / Delta / Akwa Ibom / Cross River / Bayelsa)', color: '#2a9d8f',
        desc: 'Benin City koyu kızıl toprağı, Port Harcourt/Warri petrol deltası, yoğun yağmur ormanı ve mangrov kanalları.' },
      'south-east': { name: 'Güneydoğu / Igbo Kuşağı (Anambra / Enugu / Imo / Abia / Ebonyi)', color: '#7b5ea7',
        desc: 'Sık yağ palmiyesi ormanları, derin kızıl laterit erozyon yarıkları ve Igbo yer/işletme adları (Onitsha, Enugu, Owerri, Aba).' },
      'north-central': { name: 'Kuzey-Merkez / Middle Belt (FCT Abuja / Niger / Kogi / Benue / Plateau / Kwara / Nassarawa)', color: '#c4962c',
        desc: 'Abuja’nın geniş modern otoyolları ve Aso/Zuma Rock monolitleri, Jos Platosu’nun serin granit kayalıkları ve Nijer-Benue nehir kavşağı.' },
      'north-west': { name: 'Kuzeybatı / Hausa Kuşağı (Kano / Kaduna / Katsina / Sokoto / Kebbi / Zamfara / Jigawa)', color: '#3d7ab8',
        desc: 'Kuru ve düz Sahel savanı, baobab/neem ağaçları, kerpiç Hausa mimarisi ve sarı Keke Napep triportörleri.' },
      'north-east': { name: 'Kuzeydoğu / Çad & Benue Havzası (Borno / Bauchi / Gombe / Yobe / Adamawa / Taraba)', color: '#4a8a5a',
        desc: 'Kuzeyde (Borno/Yobe) kumlu Sahel düzlüğü, güneyde (Adamawa/Taraba) Kamerun sınır dağları ve Mambilla yaylası.' }
    },
    visuals: [
      { id: 'ng-state-signboard', cat: 'Adres Tabelası', title: 'Dükkân ve Kurum Tabelalarının Alt Satırında Açık Eyalet Adı',
        region: 'Tüm Nijerya (En hızlı ve %100 kesin bölge bulma yöntemi)',
        svgId: 'ng-state-signboard',
        desc: 'Nereye bakılır: Yol kenarındaki herhangi bir dükkân, eczane, kilise, okul veya benzin istasyonu tabelasının en alt satırına. Nijerya’da adresler kısaltılmaz; "No. 14 ..., Abeokuta, Ogun State" şeklinde eyalet adı doğrudan yazar.' },
      { id: 'ng-lagos-danfo', cat: 'Şehir İçi Ulaşım', title: 'Lagos Sarı-Siyah Çizgili "Danfo" Minibüsleri',
        region: 'Lagos Eyaleti (ve kısmen Ogun sınırı)',
        svgId: 'ng-lagos-danfo',
        desc: 'Nereye bakılır: Trafikteki parlak sarı gövdeli, yanlarında iki siyah şerit bulunan Volkswagen/Toyota "Danfo" minibüslerine. Sokakta bunlardan birkaç tane görüyorsanız %99 Lagos metropolündesiniz.' },
      { id: 'ng-southeast-red', cat: 'Toprak & Orman', title: 'Güney Nijerya Koyu Kızıl Toprak, Yağ Palmiyesi ve Paslı Sac Çatılar',
        region: 'Güneybatı (Oyo/Edo) ve Güneydoğu (Enugu/Anambra/Imo)',
        svgId: 'ng-southeast-red',
        desc: 'Nereye bakılır: Yol kenarındaki koyu pas kırmızısı laterit toprağa, sık yağ palmiyesi/muz ağaçlarına ve kasabalardaki kahverengi paslı oluklu sac çatılara.' },
      { id: 'ng-north-sahel', cat: 'Biyom & İklim', title: 'Kuzey Nijerya Kuru Sahel Savanı, Baobab Ağaçları ve Hausa Tabelaları',
        region: 'Kuzeybatı & Kuzeydoğu (Kano, Katsina, Sokoto, Kaduna, Bauchi, Borno)',
        svgId: 'ng-north-sahel',
        desc: 'Nereye bakılır: Açık sarı-kırmızımsı kumlu toprağa, seyrek dikenli akasya/neem/baobab ağaçlarına, güneşli puslu (Harmattan) gökyüzüne ve uzun beyaz cübbeli (Babban Riga) yayalar ile Hausa dilindeki tabelalara.' }
    ],
    rules: [
      { title: 'Polis Eskort Aracı + Tabela Alt Satırı',
        desc: 'Nijerya Google Street View çekimlerinde kamera aracının önünde veya arkasında sıkça polis eskort pikabı görülür; ülke Nijerya olduğunda ilk iş en yakın dükkân tabelasının en alt satırındaki "... State" yazısını okumaktır.' },
      { title: 'Kuzeyden Güneye 3 Biyom Kuşağı',
        desc: '1) Güney kıyısı ve doğu: gür yeşil yağmur ormanı + koyu kırmızı toprak. 2) Orta Kuşak (Abuja/Jos/Lokoja): uzun otlu savan + dev granit kaya kubbeleri. 3) Kuzey (Kano/Sokoto/Maiduguri): düz, kurak, kumlu Sahel ve baobab ağaçları.' }
    ],
    units: ngUnits
  });

  // ===========================================================================
  // 8. KENYA (8 TARİHİ BÖLGE / PROVINCE)
  // ===========================================================================
  window.registerCountryPack({
    id: 'kenya',
    name: 'Kenya',
    sub: 'A/B/C Yol Kodları · Merkez Çay Yaylaları · Rift Vadisi vs Hint Okyanusu Kıyısı',
    Continent: 'Afrika',
    flag: 'KE',
    unitLabel: 'bölge (province)',
    groupLabel: 'coğrafi kuşak',
    codeLabel: 'Alan Kodu',
    code2Label: 'Ana Karayolu',
    codeDesc: 'Kenya’da 8 ana bölge biyom ve yükseklik farkıyla keskin biçimde ayrılır: 2.000 m rakımlı yeşil çay/kahve yaylaları (Merkez), şemsiye akasyalı Rift Vadisi, kurak kızıl topraklı Doğu/Kuzeydoğu ve beyaz kumlu Swahili Sahili.',
    geoVar: 'KE_GEO',
    bounds: [[-4.7, 33.9], [5.05, 41.9]],
    groups: {
      'merkez-rift': { name: 'Merkez Yaylalar, Nairobi & Rift Vadisi', color: '#c85a3a',
        desc: 'Başkent Nairobi (020), koyu kırmızı topraklı ve çay/kahve kaplı Central yaylası (06x) ile göller ve sönmüş volkanlarla dolu Büyük Rift Vadisi (05x).' },
      'bati-golu': { name: 'Batı & Victoria Gölü Havzası (Nyanza / Western)', color: '#2a9d8f',
        desc: 'Kisumu ve Kakamega (056/057/059): yoğun nüfuslu küçük mısır/şekerkamışı tarlaları, okaliptüs koruları ve Victoria Gölü kıyısı.' },
      'dogu-sahil': { name: 'Doğu, Kuzeydoğu & Swahili Sahili (Coast / Eastern / North-Eastern)', color: '#3d7ab8',
        desc: 'Mombasa-Malindi hindistancevizi sahili (041/042), Machakos/Isiolo yarı-kurak kızıl akasya kuşağı (044/064) ve Somali sınırındaki kurak Garissa/Wajir düzlüğü (046).' }
    },
    visuals: [
      { id: 'ke-road-sign', cat: 'Yol & Araç', title: 'A / B / C Karayolu Levhaları, Soldan Trafik ve Şnorkelli Kamera Aracı',
        region: 'A104 Mombasa–Nairobi–Eldoret · A2 Nairobi–Moyale · A3 Nairobi–Garissa · A1 Kisumu–Lodwar',
        svgId: 'ke-road-sign',
        desc: 'Nereye bakılır: Soldan akan trafiğe, sarı-siyah kilometre direklerine ve yeşil/beyaz yön tabelalarındaki A, B, C, D sınıfı yol kodlarına. Ayrıca Kenya’daki birçok dükkân cephesi Safaricom (parlak yeşil) veya Airtel (kırmızı) renklerine boyalıdır.' },
      { id: 'ke-central-tea', cat: 'Yayla & Toprak', title: 'Merkez Yaylalar (Central & Kericho) Parlak Yeşil Çay Bahçeleri ve Kızıl Toprak',
        region: 'Central (Nyeri, Murang’a, Kiambu) & Güney Rift (Kericho, Bomet)',
        svgId: 'ke-central-tea',
        desc: 'Nereye bakılır: Yuvarlanan dik tepeleri halı gibi kaplayan zümrüt yeşili budanmış çay çalılarına ve çikolata/kiremit kırmızısı volkanik toprağa. Kikuyu yer adları (Nyeri, Thika, Karatina, Kiambu) Central bölgesini kesinleştirir.' },
      { id: 'ke-rift-acacia', cat: 'Rift Vadisi', title: 'Büyük Rift Vadisi Düz Tepeli Şemsiye Akasyalar ve Volkanik Uçurumlar',
        region: 'Rift Valley (Naivasha, Nakuru, Narok, Baringo, Kajiado, Turkana)',
        svgId: 'ke-rift-acacia',
        desc: 'Nereye bakılır: Düz vadi tabanındaki sarı-yeşil şemsiye akasya (Acacia tortilis) ağaçlarına, ufukta duvar gibi yükselen Rift yamaçlarına (escarpment) ve Longonot/Suswa/Kilimanjaro volkan konilerine.' },
      { id: 'ke-coast-swahili', cat: 'Sahil & Mimari', title: 'Coast Bölgesi Beyaz Kum, Hindistancevizi Palmiyeleri ve Makuti Saz Çatılar',
        region: 'Coast (Mombasa, Kilifi, Kwale, Malindi, Lamu - B8 yolu)',
        svgId: 'ke-coast-swahili',
        desc: 'Nereye bakılır: Yol kenarındaki beyaz mercan kumu/kireçtaşı toprağa, uzun hindistancevizi ve kaju ağaçlarına, üçgen dokuma palmiye yaprağı (makuti) çatılara ve Swahili/İslami kemerli beyaz binalara.' }
    ],
    rules: [
      { title: 'Tabelalardaki "P.O. Box ... - [Kasaba]" ve County Adları',
        desc: 'Kenya’daki her okul, kilise ve dükkân tabelasında posta kutusu numarasıyla birlikte kasaba ve ilçe (County) adı İngilizce yazar (örn. "P.O. Box 124 - Nakuru" veya "Kiambu County Government").' },
      { title: 'Yer Adı Önekleriyle Bölge Bulma',
        desc: 'Kikuyu adları (Nyahururu, Nyeri, Murang’a, Thika, Kiambu, Kirinyaga) = Central; Kalenjin/Maasai adları (Eldoret, Kapsabet, Kericho, Narok, Kajiado,Kapenguria) = Rift Valley; Luo/Luhya adları (Kisumu, Homa Bay, Siaya, Kakamega, Bungoma) = Nyanza & Western; Kamba/Meru adları (Machakos, Kitui, Makueni, Embu, Meru) = Eastern.' }
    ],
    units: [
      { id: '110', name: 'Nairobi', group: 'merkez-rift', code: '020', code2: 'A104 / A2 / C58–C65', capital: 'Nairobi',
        cue: 'Nereye bakılır: 020 alan koduna, "Nairobi City County" tabelalarına, siyah volkanik toprağa (black cotton soil), çok katlı taştan apartmanlara, Thika Superhighway (A2) ve Mombasa Road (A104) üstgeçitlerine.' },
      { id: '200', name: 'Central (Merkez Yaylalar)', group: 'merkez-rift', code: '060 / 061 / 066 / 067', code2: 'A2 / B5 / C70–C77', capital: 'Nyeri (Thika / Kiambu)',
        cue: 'Nereye bakılır: A2 otoyolu boyunca uzanan dik, koyu kırmızı topraklı tepelere, çay ve kahve bahçelerine, Kenya Dağı ile Aberdare sırtlarına ve Kiambu, Murang’a, Nyeri, Kirinyaga, Nyandarua tabelalarına.' },
      { id: '700', name: 'Rift Valley (Büyük Rift Vadisi)', group: 'merkez-rift', code: '050–055', code2: 'A104 / A1 / B1 / B4', capital: 'Nakuru (Eldoret)',
        cue: 'Nereye bakılır: Kuzeyden güneye tüm ülkeyi kesen dev çöküntü vadisine; A104 üzerinde Naivasha/Nakuru gölleri ve çiçek seraları, batı platoda Eldoret mısır/buğday tarlaları ve Kericho çay tepeleri, güneyde Narok/Kajiado akasya savanı, kuzeyde Turkana yarı-çölü.' },
      { id: '600', name: 'Nyanza (Victoria Gölü Güneyi)', group: 'bati-golu', code: '057 / 058 / 059', code2: 'A1 / B1 / C19–C29', capital: 'Kisumu (Kisii)',
        cue: 'Nereye bakılır: Victoria Gölü kıyısındaki Kisumu ve Homa Bay düzlüklerine (büyük kaya blokları / kopjes) veya güneydeki aşırı yoğun nüfuslu, muz ve çay kaplı dik Kisii/Nyamira tepelerine.' },
      { id: '800', name: 'Western (Batı / Luhya Kuşağı)', group: 'bati-golu', code: '055 / 056', code2: 'A1 / A104 / C30–C42', capital: 'Kakamega (Bungoma)',
        cue: 'Nereye bakılır: Uganda sınırında Elgon Dağı eteklerine, Kakamega yağmur ormanına, yoğun şekerkamışı ve mısır tarlalarına, okaliptüs ağaç dizilerine ve Kakamega, Bungoma, Busia, Vihiga tabelalarına.' },
      { id: '400', name: 'Eastern (Doğu)', group: 'dogu-sahil', code: '044 / 045 / 064 / 068', code2: 'A2 / A3 / A109 / B6 / B7', capital: 'Embu (Machakos / Meru)',
        cue: 'Nereye bakılır: Kenya Dağı’nın doğu eteklerinde (Embu, Meru) yeşil miraa/kahve tepelerine; güneyde (Machakos, Kitui, Makueni - A109 Mombasa yolu) kızıl topraklı kurak tepelere ve baobab/akasya ağaçlarına; kuzeyde (Isiolo, Marsabit - A2 yolu) bazalt taşlı çöle.' },
      { id: '300', name: 'Coast (Hint Okyanusu Sahili)', group: 'dogu-sahil', code: '040–043', code2: 'A109 / B8 / C103–C115', capital: 'Mombasa (Malindi / Voi)',
        cue: 'Nereye bakılır: B8 kıyı yolu boyunca beyaz mercan kumuna, sık hindistancevizi/sisal plantasyonlarına, makuti saz çatılara ve Mombasa’nın mavi-beyaz boyalı bina cephelerine; iç kesimde (Voi/Tsavo) A109 boyunca dümdüz kızıl savan ve Taita tepelerine.' },
      { id: '500', name: 'North-Eastern (Kuzeydoğu / Somali Sınırı)', group: 'dogu-sahil', code: '046', code2: 'A3 / B9', capital: 'Garissa (Wajir / Mandera)',
        cue: 'Nereye bakılır: A3 (Garissa yolu) ve B9 üzerinde göz alabildiğine düz, kurak kumlu-çakıllı çalı arazisine, deve sürülerine, beyaz cami minarelerine ve Garissa / Wajir / Mandera tabelalarına.' }
    ]
  });

  // ===========================================================================
  // 9. AVUSTRALYA (8 EYALET VE ANA BÖLGE)
  // ===========================================================================
  window.registerCountryPack({
    id: 'avustralya',
    name: 'Avustralya',
    sub: 'Stobie Direkleri · Eyalet Reflektör Babaları · 02/03/07/08 Alan Kodları',
    Continent: 'Okyanusya',
    flag: 'AU',
    unitLabel: 'eyalet / bölge',
    groupLabel: 'kuşak',
    codeLabel: 'Alan Kodu',
    code2Label: 'Posta Kodu Başı',
    codeDesc: 'Avustralya’da elektrik direği yapısı (Güney Avustralya’nın çelik-beton Stobie direği, Kuzey Toprakları’nın delikli çelik direği), yol kenarı babaları (bollards) ve A/B/C/M yol numaralandırması eyaleti tek bakışta verir.',
    geoVar: 'AU_GEO',
    bounds: [[-43.65, 112.9], [-10.5, 153.65]],
    groups: {
      'dogu': { name: 'Doğu (Yeni Güney Galler & ACT)', color: '#c85a3a',
        desc: '02 alan kodu ve 2xxx posta kodları: sarı-siyah direk plakaları, Mavi Dağlar okaliptüs ormanları ve Sidney/Canberra.' },
      'guneydogu': { name: 'Güneydoğu (Victoria & Tazmanya)', color: '#3d7ab8',
        desc: '03 alan kodu (3xxx VIC, 7xxx TAS): Cxxx numaralı tali yollar, sarı sokak tabelaları (VIC) ve eğreltiotlu ılıman yağmur ormanları (TAS).' },
      'kuzeydogu': { name: 'Kuzeydoğu (Queensland)', color: '#c4962c',
        desc: '07 alan kodu ve 4xxx posta kodları: kazıklı ahşap evler (Queenslander), şekerkamışı tarlaları ve sarı metal direk bandı.' },
      'merkez-bati': { name: 'Merkez & Batı (Güney Avustralya / Batı Avustralya / Kuzey Toprakları)', color: '#2a9d8f',
        desc: '08 alan kodu: SA’da (5xxx) çelik-beton Stobie direkleri, WA’da (6xxx) kızıl çakıl omuzlu yollar, NT’de (08xx) kırmızı termit kuleleri.' }
    },
    visuals: [
      { id: 'au-stobie-pole', cat: 'Elektrik Direği', title: 'Güney Avustralya "Stobie" Direği (İki Çelik I-Profil Arasında Beton)',
        region: 'Güney Avustralya (South Australia - %100 kesin gösterge)',
        svgId: 'au-stobie-pole',
        desc: 'Nereye bakılır: Elektrik direğinin gövdesine. Dışta iki paslı/gri çelik I-kiriş ve aralarının betonla doldurulduğu yassı sandviç yapılı "Stobie pole" dünyada yalnızca Güney Avustralya’da (Adelaide ve çevresi) kullanılır.' },
      { id: 'au-state-bollard', cat: 'Yol & Direk', title: 'Eyalete Özel Direk Etiketleri ve Yol Kenarı Reflektör Babaları',
        region: 'NSW siyah-sarı plaka · QLD sarı metal bant · TAS üstü eğik baba · NT çelik direk',
        svgId: 'au-state-bollard',
        desc: 'Nereye bakılır: Direklerdeki metal etiketlere ve beyaz yol babalarına (bollards). NSW’de direkte dikey sarı-siyah numara plakası; QLD’de direkte yatay sarı/gümüş metal bant; Tazmanya’da tepesi eğik kesilmiş kırmızı reflektörlü baba; NT’de ise termitlere dayanıklı gümüş galvanizli çelik direkler bulunur.' },
      { id: 'au-wa-red-shoulder', cat: 'Asfalt & Toprak', title: 'Batı Avustralya Kırmızımsı Laterit/Çakıl Yol Omuzları ve Sarı Yaya Tabelası',
        region: 'Batı Avustralya (Western Australia - Perth, Wheatbelt, Pilbara)',
        svgId: 'au-wa-red-shoulder',
        desc: 'Nereye bakılır: Gri asfaltın hemen dışındaki kızıl-kahverengi boksit/laterit çakıl omuza (red gravel shoulder), ince yeşil-gri okaliptüs/mallee çalılarına ve Perth’te koyu kırmızı-kahverengi tuğla kaldırımlara.' },
      { id: 'au-nt-termite', cat: 'Biyom & Outback', title: 'Kuzey Toprakları (NT) Kızıl Toprak, Dev Termit Kuleleri ve Okaliptüs Savanı',
        region: 'Northern Territory (Stuart Highway - Darwin, Katherine, Alice Springs)',
        svgId: 'au-nt-termite',
        desc: 'Nereye bakılır: Stuart Highway (National Highway 1 / 87) boyunca uzanan parlak turuncu-kırmızı toprağa, yol kenarında 2–4 metre boyundaki kızıl termit yuvalarına ve galvanizli çelik elektrik direklerine.' }
    ],
    rules: [
      { title: 'Posta Kodu İlk Rakamı ve Alan Kodu Kuralı',
        desc: '02 alan kodu = NSW & ACT (2xxx); 03 alan kodu = Victoria (3xxx) & Tazmanya (7xxx); 07 alan kodu = Queensland (4xxx); 08 alan kodu = Güney Avustralya (5xxx), Batı Avustralya (6xxx) ve Kuzey Toprakları (08xx).' },
      { title: 'C-Yolları ve Eyalet Rota Kalkanları',
        desc: 'Yeşil tabelalarda sarı harfli M/A/B/C alfanümerik sistem Victoria, Tazmanya, Güney Avustralya ve NSW’de yaygındır; WA ve QLD’de ise hâlâ mavi/kahverengi kalkanlı düz sayılar (State Route) sıkça görülür.' }
    ],
    units: [
      { id: 'nsw', name: 'New South Wales (Yeni Güney Galler)', group: 'dogu', code: '02', code2: '2xxx', capital: 'Sidney',
        cue: 'Nereye bakılır: 02 alan koduna, ahşap/beton direklerdeki siyah-sarı dikey numara plakalarına, sarı zeminli kanguru/hız uyarı levhalarına ve beyaz plaka üzerinde siyah yazılı sokak tabelalarına.' },
      { id: 'act', name: 'Australian Capital Territory (ACT)', group: 'dogu', code: '02', code2: '26xx', capital: 'Canberra',
        cue: 'Nereye bakılır: Canberra’nın dairesel planlı geniş yeşil bulvarlarına, mavi bordürlü beyaz sokak tabelalarına, sonbaharda kızaran meşe/çınar ağaçlarına ve pürüzsüz yuvarlak beton direklere.' },
      { id: 'vic', name: 'Victoria', group: 'guneydogu', code: '03', code2: '3xxx', capital: 'Melbourne',
        cue: 'Nereye bakılır: 03 alan koduna, Melbourne tramvay tellerine ve kanca dönüşü (hook turn) tabelalarına, yuvarlak beton direklerdeki damgalı plakalara ve kırsalda sarı Cxxx yol kodlarına.' },
      { id: 'tas', name: 'Tasmania (Tazmanya)', group: 'guneydogu', code: '03 (03 6xxx)', code2: '7xxx', capital: 'Hobart',
        cue: 'Nereye bakılır: Tepesi eğik kesilmiş beyaz yol babalarındaki uzun dikey kırmızı reflektöre, gür yeşil eğreltiotlu dağ ormanlarına ve A1–A10 / Bxx / Cxxx sarı rota kodlarına.' },
      { id: 'qld', name: 'Queensland', group: 'kuzeydogu', code: '07', code2: '4xxx', capital: 'Brisbane',
        cue: 'Nereye bakılır: 07 alan koduna, ahşap direklerin ortasına sarılmış sarı/gümüş metal banda, taşkına karşı direkler üzerine yükseltilmiş ahşap evlere (Queenslander), sarı elmas şekilli sokak tabelalarına ve kıyı şekerkamışı tarlalarına.' },
      { id: 'sa', name: 'South Australia (Güney Avustralya)', group: 'merkez-bati', code: '08 (08 8xxx)', code2: '5xxx', capital: 'Adelaide',
        cue: 'Nereye bakılır: İki çelik kiriş arası beton dolgulu "Stobie" elektrik direklerine! Bu direği gördüğünüz her yer %100 Güney Avustralya’dır (Adelaide, Barossa bağları, Eyre/Flinders).' },
      { id: 'wa', name: 'Western Australia (Batı Avustralya)', group: 'merkez-bati', code: '08 (08 9xxx)', code2: '6xxx', capital: 'Perth',
        cue: 'Nereye bakılır: 08 9xxx telefon koduna, asfalt kenarındaki kızıl boksit çakıl omuza, sarı zeminli yaya geçidi tabelalarına, Perth’in tuğla kaldırımlarına ve Wheatbelt’in düz altın buğday tarlalarına.' },
      { id: 'nt', name: 'Northern Territory (Kuzey Toprakları)', group: 'merkez-bati', code: '08 (08 89xx)', code2: '08xx', capital: 'Darwin (Alice Springs)',
        cue: 'Nereye bakılır: Galvanizli delikli çelik elektrik direklerine, pas kırmızısı toprağa, yol kenarındaki dev kırmızı termit kulelerine ve Stuart Highway (87 / 1) tabelalarına.' }
    ]
  });

  // ===========================================================================
  // 10. YENİ ZELANDA (16 BÖLGE / REGION)
  // ===========================================================================
  var NZ_INFO = {
    'ntl': ['Northland', 'north-island', '09', 'SH 1 / SH 10 / SH 12 / SH 14', 'Whangārei', 'En kuzey subtropikal yarımada; SH 1/10/12 yolları, kauri/punga ağaç eğreltiotları, mangrov koyları ve 09 alan kodu.'],
    'auk': ['Auckland', 'north-island', '09', 'SH 1 / SH 16 / SH 18 / SH 20', 'Auckland', '09 alan kodu, mavi sokak tabelaları, sönmüş volkan tepeleri (One Tree Hill, Rangitoto), Sky Tower ve çok şeritli SH 1/16/20 otoyolları.'],
    'wko': ['Waikato', 'north-island', '07', 'SH 1 / SH 2 / SH 3 / SH 23–32', 'Hamilton (Taupō)', '07 alan kodu, yemyeşil yuvarlanan süt çiftliği tepeleri, sık çit sıraları, güneyde Taupō Gölü ve jeotermal buhar bacaları.'],
    'bop': ['Bay of Plenty', 'north-island', '07', 'SH 2 / SH 5 / SH 29 / SH 30 / SH 33–36', 'Tauranga (Rotorua)', '07 alan kodu, yüksek rüzgâr perdesi çitlerle çevrili kivi meyvesi bahçeleri (Tauranga/Te Puke), Rotorua kükürtlü gayzerleri ve çam ormanları.'],
    'gis': ['Gisborne (Tairāwhiti)', 'north-island', '06', 'SH 2 / SH 35', 'Gisborne', 'Kuzey Adası’nın en doğu ucu; Pasifik kıyısını dolaşan SH 35 yolu, kereste tomruk kamyonları ve dik yeşil tepeler (06).'],
    'hkb': ['Hawke’s Bay', 'north-island', '06', 'SH 2 / SH 5 / SH 50', 'Napier (Hastings)', '06 alan kodu, Napier’in Art Deco binaları, güneşli düz üzüm bağları/elma bahçeleri ve doğuda çıplak altın sarısı koyun otlakları.'],
    'tki': ['Taranaki', 'north-island', '06', 'SH 3 / SH 43 / SH 45', 'New Plymouth', 'Ufukta tek başına yükselen karlı simetrik Taranaki (Egmont) Volkanı konisi, SH 3/45 halka yolu ve radyal süt meraları (06).'],
    'mwt': ['Manawatū-Whanganui', 'north-island', '06', 'SH 1 / SH 3 / SH 4 / SH 54 / SH 56–57', 'Palmerston North (Whanganui)', 'Merkez Kuzey Adası; kuzeyde Ruapehu/Tongariro volkan platosu (Desert Road SH 1), güneyde Tararua rüzgâr türbinleri ve geniş nehir ovaları (06).'],
    'wgn': ['Wellington', 'north-island', '04', 'SH 1 / SH 2 / SH 53 / SH 58', 'Wellington', '04 alan kodu, Cook Boğazı’na bakan aşırı dik yamaçlara tırmanan ahşap evler, SH 1/2 kıyı otoyolları ve Wairarapa bağları.'],
    'tas': ['Tasman', 'south-island', '03', 'SH 6 / SH 60', 'Richmond (Motueka)', 'Güney Adası kuzeybatısı; Golden Bay/Abel Tasman kıyıları, şerbetçiotu ve elma bahçeleri, SH 60 yolu (03).'],
    'nsn': ['Nelson', 'south-island', '03', 'SH 6', 'Nelson', 'Tasman Körfezi kıyısında güneşli kıyı kenti; SH 6 sahil bulvarı, çam kaplı tepeler ve 03 alan kodu.'],
    'mbh': ['Marlborough', 'south-island', '03', 'SH 1 / SH 6 / SH 62 / SH 63', 'Blenheim (Picton)', 'Wairau Vadisi’ni uçtan uca kaplayan dümdüz Sauvignon Blanc üzüm bağları, kuru sarı tepeler ve Picton feribot limanı (SH 1).'],
    'wtc': ['West Coast (Batı Kıyısı)', 'south-island', '03', 'SH 6 / SH 7 / SH 65 / SH 67', 'Greymouth (Hokitika / Westport)', 'Tasman Denizi ile Güney Alpleri arasındaki dar, aşırı yağışlı şerit; SH 6 boyunca sık punga eğreltiotu ormanları ve tek şeritli (one-lane) demiryolu/nehir köprüleri.'],
    'can': ['Canterbury', 'south-island', '03', 'SH 1 / SH 73–79', 'Christchurch (Timaru)', 'Güney Alpleri’nin önünde jilet gibi dümdüz uzanan Canterbury Ovası, uzun çam rüzgâr perdeleri, dev pivot sulama makineleri ve turkuaz buzul gölleri (Tekapo/Pukaki).'],
    'ota': ['Otago', 'south-island', '03', 'SH 1 / SH 6 / SH 8 / SH 83–90', 'Dunedin (Queenstown)', 'İç kesimde (Central Otago / Queenstown / Cromwell - SH 6/8) şist kayalıklı kuru kahverengi dağlar ve fiyort gölleri; kıyıda İskoç taş mimarili Dunedin.'],
    'stl': ['Southland', 'south-island', '03', 'SH 1 / SH 6 / SH 93–99', 'Invercargill (Te Anau)', 'En güney uç; SH 1’in Bluff’ta bitişi, SH 94 Milford Sound yolu, düz yemyeşil koyun/süt meraları ve serin rüzgârlı gökyüzü (03).']
  };

  var nzUnits = Object.keys(NZ_INFO).sort().map(function(id) {
    var r = NZ_INFO[id];
    return {
      id: id, name: r[0], group: r[1], code: r[2], code2: r[3], capital: r[4],
      cue: 'Nereye bakılır: ' + r[5]
    };
  });

  window.registerCountryPack({
    id: 'yeni-zelanda',
    name: 'Yeni Zelanda',
    sub: 'Kırmızı SH Otoyol Kalkanı · Possum Direk Metal Bandı · Kuzey vs Güney Adası',
    Continent: 'Okyanusya',
    flag: 'NZ',
    unitLabel: 'bölge (region)',
    groupLabel: 'ada',
    codeLabel: 'Alan Kodu',
    code2Label: 'State Highway (SH)',
    codeDesc: 'Yeni Zelanda’da kırmızı kalkanlı State Highway (SH) numaraları 1’den 99’a kadar kuzeyden güneye artar: SH 10–58 Kuzey Adası’nda (09, 07, 06, 04), SH 60–99 ise Güney Adası’ndadır (tamamı 03 alan kodu).',
    geoVar: 'NZ_GEO',
    bounds: [[-47.3, 166.4], [-34.35, 178.6]],
    groups: {
      'north-island': { name: 'Kuzey Adası / Te Ika-a-Māui (9 Bölge)', color: '#c85a3a',
        desc: 'SH 1–5 ve SH 10–58 karayolları; 09 (Auckland/Northland), 07 (Waikato/Bay of Plenty), 06 (Merkez) ve 04 (Wellington) alan kodları; yemyeşil volkanik süt tepeleri ve Māori yer adları.' },
      'south-island': { name: 'Güney Adası / Te Waipounamu (7 Bölge)', color: '#3d7ab8',
        desc: 'SH 1, SH 6–8 ve SH 60–99 karayolları; tamamı 03 alan kodlu; karlı Güney Alpleri, dümdüz Canterbury Ovası, Marlborough bağları ve Central Otago bozkır dağları.' }
    },
    visuals: [
      { id: 'nz-red-sh-shield', cat: 'Yol Kalkanı', title: 'Kırmızı State Highway (SH) Kalkanı & Kırmızı Üstlü Beyaz Yol Babası',
        region: 'SH 10–58 Kuzey Adası · SH 60–99 Güney Adası',
        svgId: 'nz-red-sh-shield',
        desc: 'Nereye bakılır: Yeşil yön tabelalarındaki yuvarlak tabanlı parlak kırmızı kalkanlara ve yol kenarında üst kısmı kırmızı şeritli beyaz plastik babalara. Kalkan içindeki sayı 10–58 arasındaysa Kuzey Adası, 60–99 arasındaysa Güney Adası’ndasınız.' },
      { id: 'nz-possum-guard', cat: 'Elektrik Direği', title: 'Elektrik Direklerinde Parlak Metal "Possum" Koruma Bandı',
        region: 'Tüm Yeni Zelanda (Avustralya’dan ayıran en net direk detayı)',
        svgId: 'nz-possum-guard',
        desc: 'Nereye bakılır: Ahşap veya beton elektrik direklerinin orta kısmına sarılmış ~60 cm genişliğindeki parlak teneke/alüminyum metal kuşağa (possum guard). Keseli sıçanların tellere tırmanmasını önleyen bu metal bant Yeni Zelanda’nın imzasıdır.' },
      { id: 'nz-north-punga', cat: 'Kuzey Adası Biyomu', title: 'Kuzey Adası Yemyeşil Volkanik Tepeler, Punga Eğreltiotları ve Lahana Ağaçları',
        region: 'Kuzey Adası (Northland, Waikato, Bay of Plenty, Taranaki, Manawatū)',
        svgId: 'nz-north-punga',
        desc: 'Nereye bakılır: Yuvarlak hatlı zümrüt yeşili otlak tepelere, yol yamaçlarındaki şemsiye yapraklı ağaç eğreltiotlarına (punga / silver fern), palmiyeyi andıran lahana ağaçlarına (cabbage tree / tī kōuka) ve sık Māori yer adlarına (Whangārei, Taupō, Rotorua).' },
      { id: 'nz-south-alps', cat: 'Güney Adası Biyomu', title: 'Güney Adası Karlı Güney Alpleri, Tek Şeritli Köprüler ve Sarı Tussock Dağları',
        region: 'Güney Adası (Canterbury, Otago, Marlborough, West Coast, Southland)',
        svgId: 'nz-south-alps',
        desc: 'Nereye bakılır: Ufukta yükselen keskin, karlı Güney Alpleri duvarına, geniş çakıl yataklı örgülü (braided) nehirlere, "ONE LANE BRIDGE" uyarı tabelalı köprülere ve Otago/Canterbury’nin altın sarısı tussock otlaklarına.' }
    ],
    rules: [
      { title: 'SH 10–58 (Kuzey) vs SH 60–99 (Güney) Numaralandırması',
        desc: 'SH 1 her iki adayı da boydan boya geçer; SH 2–5 Kuzey Adası’nda, SH 6–8 Güney Adası’ndadır. İki haneli yollarda ilk rakam bölgeyi verir: 1x Northland/Auckland, 2x–3x Waikato/Bay of Plenty/Gisborne, 4x–5x Taranaki/Manawatū/Hawke’s Bay/Wellington, 6x Nelson/Marlborough/West Coast, 7x Canterbury, 8x Otago, 9x Southland.' },
      { title: '03 / 04 / 06 / 07 / 09 Telefon Alan Kodları',
        desc: '09 Auckland & Northland; 07 Waikato & Bay of Plenty; 06 Taranaki, Manawatū, Hawke’s Bay & Gisborne; 04 Wellington; 03 Güney Adası’nın tamamı!' }
    ],
    units: nzUnits
  });

})();

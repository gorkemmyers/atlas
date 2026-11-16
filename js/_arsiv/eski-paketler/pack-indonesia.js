/* pack-indonesia.js — Endonezya çalışma paketi (33 il, 02–09 alan kodları, çatı/direk SVG, toponimi) */
(function (g) {
  'use strict';

  var REGIONS = [
    { id: 'sumatra', tr: 'Sumatra & Bangka-Kepri', cue: '06x kuzey · 07x güney · Atap Seng metal çatı, Gonjong boynuz & palmiye tarlaları', color: 0 },
    { id: 'jawa', tr: 'Cava (Jawa)', cue: '02x batı/orta · 03x doğu · Genteng kil kiremit, Trident direk, çok yoğun tabelalar', color: 2 },
    { id: 'balint', tr: 'Bali & Nusa Tenggara', cue: '036–038 · Candi Bentar Bali kapısı · doğuda kurak tepe savanları', color: 5 },
    { id: 'kalimantan', tr: 'Kalimantan (Borneo)', cue: '05x · Dümdüz kırmızı/kumlu yollar, ahşap kazıklı evler, oluklu sac çatı', color: 4 },
    { id: 'sulawesi', tr: 'Sulawesi', cue: '04x · Sarp yeşil tepeler, kazıklı renkli evler, kırmızı kiremit yerine sac çatı', color: 1 },
    { id: 'malpap', tr: 'Maluku & Papua', cue: '09x · Uzak doğu adaları, sınırlı kapsam (Ambon, Ternate, Sorong, Jayapura)', color: 7 }
  ];

  var UNITS = [
    {
      id: 'aceh', name: 'Aceh', short: 'Aceh', cap: 'Banda Aceh', reg: 'sumatra',
      codes: ['065', '064'], postal: '23–24',
      codeCls: 5, traitId: 'id-seng-outer', traitTitle: 'Gampong Panosu & Sac Çatı', traitCls: 4,
      cue: '0651 Banda Aceh, 064x Lhokseumawe/Langsa. Tabelalarda köy için “Gampong” (Gp.) kelimesi yalnızca Aceh’e özgüdür! Parlak yeşil/beyaz İslami tabelalar ve metal sac çatılar.',
      trap: '06x kuzey Sumatra bloğundadır; Sumut (061–063) aksine köy adları Gampong ile başlar.'
    },
    {
      id: 'sumatera-utara', name: 'Kuzey Sumatra (Sumut)', short: 'Sumut', cap: 'Medan', reg: 'sumatra',
      codes: ['061', '062', '063'], postal: '20–22',
      codeCls: 5, traitId: 'id-sumatra-n', traitTitle: 'Kuzey Sumatra Çatallı Direk & Medan 061', traitCls: 0,
      cue: '061 Medan, 062 Pematangsiantar/Kisaran, 063 Padangsidimpuan. Palmiye yağı plantasyonları, Batak kiliseleri/mezarlıkları ve Kuzey Sumatra çatallı/tepe traversli direkleri.',
      trap: 'Hıristiyan Batak bölgelerinde (Toba Gölü çevresi) cami kadar sık kilise ve ikonik kavisli Batak mezar anıtları görülür.'
    },
    {
      id: 'sumatera-barat', name: 'Batı Sumatra (Sumbar)', short: 'Sumbar', cap: 'Padang', reg: 'sumatra',
      codes: ['075'], postal: '25–27',
      codeCls: 6, traitId: 'id-minang', traitTitle: 'Rumah Gadang / Gonjong Boynuz Çatı!', traitCls: 5,
      cue: '0751 Padang, 0752 Bukittinggi. Resmi binalardan küçük dükkânlara kadar gümüş boynuz uçlu “Rumah Gadang / Gonjong” çatı ve “Nagari” köy tabelası = %100 Sumbar!',
      trap: 'Dünya çapında başka hiçbir ilde büfeler ve benzinlikler bile bu sivri ikili/dörtlü boynuz çatıyı kullanmaz.'
    },
    {
      id: 'riau', name: 'Riau', short: 'Riau', cap: 'Pekanbaru', reg: 'sumatra',
      codes: ['076'], postal: '28–29',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Palmiye Ovası & 076 Kodu', traitCls: 4,
      cue: '0761 Pekanbaru, 0765 Dumai. Ufka uzanan dümdüz palmiye yağı ve okaliptüs tarlaları, kırmızı topraklı omuzlar ve gümüş sac çatılar.',
      trap: 'Malaka Boğazı kıyısındaki adacıklar ayrı il olan Kepulauan Riau (077) grubundadır.'
    },
    {
      id: 'kepulauan-riau', name: 'Kepulauan Riau (Kepri)', short: 'Kepri', cap: 'Tanjungpinang', reg: 'sumatra',
      codes: ['077'], postal: '29',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Batam & Bintan 077 Kodu', traitCls: 4,
      cue: '0778 Batam, 0771 Tanjungpinang. Singapur güneyindeki modern sanayi ve turizm adaları (çoğunlukla Batam, Bintan, Karimun).',
      trap: '077 ile başlayan telefon ve “Batam / Kepri” yazıları adaları anakara Riau’dan (076) hemen ayırır.'
    },
    {
      id: 'jambi', name: 'Jambi', short: 'Jambi', cap: 'Jambi', reg: 'sumatra',
      codes: ['074'], postal: '36–37',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Orta Sumatra Kauçuk/Palmiye & 074', traitCls: 4,
      cue: '0741 Jambi, 0748 Kerinci. Doğu ovasında düz palmiye/kauçuk, batı Kerinci çevresinde volkanik çay yaylası; nehir adlarında “Sungai / Muara” sık geçer.',
      trap: '074 tek başına Jambi’yi verir.'
    },
    {
      id: 'bengkulu', name: 'Bengkulu', short: 'Bengkulu', cap: 'Bengkulu', reg: 'sumatra',
      codes: ['073'], postal: '38–39',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Hint Okyanusu Kıyısı & 073', traitCls: 4,
      cue: '0736 Bengkulu. Dar Hint Okyanusu kıyısı ile dik Barisan Dağları arasında sıkışmış uzun kıyı ili; kırmızıya çalan toprak ve sac çatılar.',
      trap: '073 güney iç Sumatra (Lahat/Lubuklinggau) ile ortaktır ama Bengkulu okyanus sahilidir.'
    },
    {
      id: 'sumatera-selatan', name: 'Güney Sumatra (Sumsel)', short: 'Sumsel', cap: 'Palembang', reg: 'sumatra',
      codes: ['071', '073'], postal: '30–33',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Musi Nehri & Palembang 0711', traitCls: 4,
      cue: '0711 Palembang, 0733/0735 batı Sumsel. Geniş düz palmiye/bataklık ovaları, akarsu üstü ahşap evler ve klasik yeşil Palembang tabelaları.',
      trap: '071 kodu doğudaki Bangka Belitung adaları (0717/0719) ile paylaşılır.'
    },
    {
      id: 'bangka-belitung', name: 'Bangka Belitung', short: 'Babel', cap: 'Pangkalpinang', reg: 'sumatra',
      codes: ['071'], postal: '33',
      codeCls: 6, traitId: 'id-seng-outer', traitTitle: 'Kalay Kumu, Dev Granit & 0717/0719', traitCls: 4,
      cue: '0717 Bangka (Pangkalpinang), 0719 Belitung. Beyaz kuvars kumlu yol omuzları, turkuaz kalay göletleri ve dev yuvarlak granit kayalar.',
      trap: 'Biber bahçeleri ve beyazımsı toprak iki adayı anakara Sumsel bataklığından ayırır.'
    },
    {
      id: 'lampung', name: 'Lampung', short: 'Lampung', cap: 'Bandar Lampung', reg: 'sumatra',
      codes: ['072'], postal: '34–35',
      codeCls: 6, traitId: 'id-java-clay', traitTitle: 'Cava Benzeri Kiremit + “Pekon” Geçişi', traitCls: 2,
      cue: '0721 Bandar Lampung, 0725 Metro. Cava göçü nedeniyle Sumatra içinde ilk kez sık kırmızı kil kiremit çatı görülür! Ayrıca yerel tabelalarda “Pekon” köy terimi geçer.',
      trap: 'Kil kiremit + 072 kodu veya “Pekon” kelimesi gördüğünde Cava’ya değil Sumatra güney ucu Lampung’a tıkla!'
    },
    {
      id: 'banten', name: 'Banten', short: 'Banten', cap: 'Serang', reg: 'jawa',
      codes: ['025', '021'], postal: '15, 42',
      codeCls: 0, traitId: 'id-java-clay', traitTitle: 'Cava Kiremit · Ci- İsimleri & Tangerang', traitCls: 2,
      cue: '0254 Serang/Cilegon, 0252 Lebak, doğu Tangerang 021 (Jakarta ile ortak!). Sundaca “Ci-” yer adları (Cilegon, Cikande) ve kırmızı Genteng kil kiremit çatılar.',
      trap: 'Tangerang adresinde 021 görüp Jakarta içinde kalma; batı otoyollar Banten içindedir.'
    },
    {
      id: 'jakarta-raya', name: 'DKI Jakarta', short: 'Jakarta', cap: 'Jakarta', reg: 'jawa',
      codes: ['021'], postal: '10–14',
      codeCls: 0, traitId: 'id-java-clay', traitTitle: 'Dev Metropol · TransJakarta & 021', traitCls: 2,
      cue: '021 alan kodu, Jl. Jenderal Sudirman / Thamrin tarzı dev bulvarlar, TransJakarta mavi otobüs koridorları ve “DKI Jakarta / Jakpus / Jaksel / Jaktim / Jakbar / Jakut” tabelaları.',
      trap: '021 ayrıca komşu Tangerang (Banten), Bekasi ve Depok (Jawa Barat) banliyölerinde de geçer.'
    },
    {
      id: 'jawa-barat', name: 'Batı Cava (Jabar)', short: 'Jabar', cap: 'Bandung', reg: 'jawa',
      codes: ['022', '023', '025', '026'], postal: '16–17, 40–46',
      codeCls: 0, traitId: 'id-java-clay', traitTitle: 'Sunda “Ci-” Kuşağı & Kiremit Çatı', traitCls: 2,
      cue: '022 Bandung, 023x Cirebon/Garut, 0251 Bogor, 026x Karawang/Purwakarta. Sokak/mahalle adlarının yarısı Ci- (Cikarang, Cianjur, Cibinong, Ciamis) ile başlar!',
      trap: '022/023/025/026 (ve 024/027–029 olmayan tüm 02x kodlar) Batı Cava + Banten kuşağıdır.'
    },
    {
      id: 'jawa-tengah', name: 'Orta Cava (Jateng)', short: 'Jateng', cap: 'Semarang', reg: 'jawa',
      codes: ['024', '027', '028', '029'], postal: '50–59',
      codeCls: 1, traitId: 'id-java-trident', traitTitle: 'Orta Cava Trident Direk & Wono-/Purwo-', traitCls: 3,
      cue: '024 Semarang, 0271 Solo, 028x Purwokerto/Tegal/Cilacap, 029x Magelang/Kudus. Wono-, Purwo-, Banyu-, Karang- köy adları yanında Orta Cava’nın imzası olan Ψ üçlü trident direk tepesi ve kiremit çatılar.',
      trap: '024, 027, 028, 029 numaraları Jabar (022/23/25/26) değil kesin Orta Cava (+0274 DIY) bloğudur!'
    },
    {
      id: 'yogyakarta', name: 'DI Yogyakarta', short: 'DIY', cap: 'Yogyakarta', reg: 'jawa',
      codes: ['027'], postal: '55',
      codeCls: 1, traitId: 'id-java-trident', traitTitle: '0274 + Cava Aksara Yazısı & Trident Direk', traitCls: 3,
      cue: '0274 alan kodu! Jogja içindeki resmi sokak tabelalarının altında süslü geleneksel Cava (Aksara Jawa) yazısı yer alır ve sokak direklerinde Orta Cava Ψ trident tepe sık görülür.',
      trap: 'Sokak levhasında Latin harflerin altında kıvrımlı Cava alfabesi + 0274 = %100 Yogyakarta/Solo kuşağı!'
    },
    {
      id: 'jawa-timur', name: 'Doğu Cava (Jatim)', short: 'Jatim', cap: 'Surabaya', reg: 'jawa',
      codes: ['031', '032', '033', '034', '035'], postal: '60–69',
      codeCls: 2, traitId: 'id-java-clay', traitTitle: '031–035 Kodu · Mojo-/Sido- & Kiremit Çatı', traitCls: 2,
      cue: '031 Surabaya, 0341 Malang, 0331 Jember, 0351 Madiun, 0333 Banyuwangi. Mojo-, Sido-, Probo-, Bondo- yer adları ve yoğun kırmızı kil kiremit çatılı geniş ovalar.',
      trap: '03x burada başlar! 031–035 Doğu Cava’dır, 036 Bali’ye atlar.'
    },
    {
      id: 'bali', name: 'Bali', short: 'Bali', cap: 'Denpasar', reg: 'balint',
      codes: ['036'], postal: '80–82',
      codeCls: 2, traitId: 'id-bali-gate', traitTitle: 'Candi Bentar Tapınak Kapısı & 036x!', traitCls: 5,
      cue: '0361 Denpasar/Ubud/Kuta, 0362 Singaraja, 0363/0365/0366 Bali kırsal. Evlerin önünde süslü kızıl-siyah bölünmüş Hindu taş kapılar (Candi Bentar), küçük sokak sunakları (Pelinggih) ve Aksara Bali tabelalar.',
      trap: 'Her sokakta tapınak kapıları ve Hindu sunakları görmen Bali’yi Lombok (NTB) dışından %100 ayırır!'
    },
    {
      id: 'nusa-tenggara-barat', name: 'Batı Nusa Tenggara (NTB)', short: 'NTB', cap: 'Mataram', reg: 'balint',
      codes: ['037', '036'], postal: '83–84',
      codeCls: 2, traitId: 'id-java-clay', traitTitle: 'Lombok & Sumbawa · 037x + Camiler', traitCls: 2,
      cue: '0370 Mataram (Lombok), 0371 Sumbawa Besar, 0374 Bima. Bali’nin hemen doğusu ama Bali Hindu kapıları kaybolur ve yoğun cami kubbeleri + tütün tarlaları başlar; kiremit çatılar hâlâ görülür.',
      trap: 'Bali gibi ada + 037x alan kodu varsa ve Hindu taş kapı değil cami minaresi görüyorsan Lombok/Sumbawa (NTB) içindesin!'
    },
    {
      id: 'nusa-tenggara-timur', name: 'Doğu Nusa Tenggara (NTT)', short: 'NTT', cap: 'Kupang', reg: 'balint',
      codes: ['038'], postal: '85–87',
      codeCls: 2, traitId: 'id-seng-outer', traitTitle: 'Kurak Savan Tepeleri & 038x', traitCls: 4,
      cue: '0380 Kupang (Batı Timor), 0381–0386 Flores, 0387 Sumba. Endonezya’nın en kurak adaları: soluk kahverengi-sarı tepe otlakları, palmiye ve ağırlıklı kilise + sac çatı.',
      trap: 'Endonezya içinde yarı kurak Akdeniz/Avustralya benzeri sarı tepeler + 038x = NTT!'
    },
    {
      id: 'kalimantan-barat', name: 'Batı Kalimantan (Kalbar)', short: 'Kalbar', cap: 'Pontianak', reg: 'kalimantan',
      codes: ['056', '053'], postal: '78–79',
      codeCls: 4, traitId: 'id-seng-outer', traitTitle: 'Ekvator Ormanı & Pontianak 0561', traitCls: 4,
      cue: '0561 Pontianak, 0562 Singkawang, 0563/0564 iç kesim, 0534 Ketapang. Dev Çin-Endonezya nüfuslu Singkawang tabelaları, düz kırmızı/kahve yollar ve oluklu sac çatılar.',
      trap: 'Kalbar telefonları çoğunlukla 056x’tir ama güneydeki Ketapang 0534 kullanır.'
    },
    {
      id: 'kalimantan-tengah', name: 'Orta Kalimantan (Kalteng)', short: 'Kalteng', cap: 'Palangka Raya', reg: 'kalimantan',
      codes: ['053'], postal: '73–74',
      codeCls: 4, traitId: 'id-seng-outer', traitTitle: 'Kırmızı Kum + Turba Bataklığı & 053x', traitCls: 4,
      cue: '0536 Palangka Raya, 0531 Sampit, 0532 Pangkalan Bun. Dümdüz sonsuz bataklık orman yolları, kahverengi turba kanalları ve yol kenarı ahşap kazıklı evler.',
      trap: '053 kodu Kalteng merkezidir (Pangkalan Bun/Sampit/Palangka Raya).'
    },
    {
      id: 'kalimantan-selatan', name: 'Güney Kalimantan (Kalsel)', short: 'Kalsel', cap: 'Banjarbaru / Banjarmasin', reg: 'kalimantan',
      codes: ['051', '052'], postal: '70–72',
      codeCls: 4, traitId: 'id-seng-outer', traitTitle: 'Banjarmasin 0511 & Sarp Çatı Evleri', traitCls: 4,
      cue: '0511 Banjarmasin/Banjarbaru, 0517 Kandangan, 0526 Tanjung. Su üstü Banjarese yüksek üçgen çatılı ahşap evler (Rumah Banjar) ve doğuda kömür madeni tepeleri.',
      trap: 'Kalimantan’daki en eski en büyük nehir/bataklık yerleşim yoğunluğu buradadır; 051/052!'
    },
    {
      id: 'kalimantan-timur', name: 'Doğu Kalimantan (Kaltim)', short: 'Kaltim', cap: 'Samarinda', reg: 'kalimantan',
      codes: ['054', '055'], postal: '75–77',
      codeCls: 4, traitId: 'id-seng-outer', traitTitle: 'Samarinda 0541 · Balikpapan 0542 · 055x Kuzey', traitCls: 4,
      cue: '0541 Samarinda, 0542 Balikpapan, 0548 Bontang, 055x Tarakan/Kuzey Kaltim. Petrol-kömür yolları, engebeli açık tepeler ve büyük kent bulvarları.',
      trap: '054 & 055 neredeyse kesin Borneo doğusudur (Kaltim / Tarakan).'
    },
    {
      id: 'sulawesi-utara', name: 'Kuzey Sulawesi (Sulut)', short: 'Sulut', cap: 'Manado', reg: 'sulawesi',
      codes: ['043'], postal: '95',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Minahasa Kiliseleri & Manado 0431', traitCls: 4,
      cue: '0431 Manado/Tomohon, 0438 Bitung. Sokak başına birkaç Hıristiyan kilisesi düşer! Volkanik yeşil yarımada ve sac/çinko çatılı boyalı ahşap evler.',
      trap: 'Cami yerine her yerde beyaz/renkli kiliseler + Endonezya bayraklı direk + 0431 = Kuzey Sulawesi!'
    },
    {
      id: 'gorontalo', name: 'Gorontalo', short: 'Gorontalo', cap: 'Gorontalo', reg: 'sulawesi',
      codes: ['043'], postal: '96',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Bentor Motorlu Çekçek & 0435', traitCls: 4,
      cue: '0435 Gorontalo, 0443 Marisa. Kuzey Sulawesi’ye komşudur ama halkı çoğunlukla Müslümandır ve ikonik tente-motosiklet karışımı “Bentor”lar sokakları doldurur.',
      trap: '0435 kodu + kırmızı-yeşil Bentor taksiler Sulut ile Gorontalo’yu ayırır.'
    },
    {
      id: 'sulawesi-tengah', name: 'Orta Sulawesi (Sulteng)', short: 'Sulteng', cap: 'Palu', reg: 'sulawesi',
      codes: ['045', '046'], postal: '94',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Palu Körfezi & Dağ Kuşağı (045/046)', traitCls: 4,
      cue: '0451 Palu, 0461 Luwuk, 0450 Parigi. Kuru yarı-savan Palu vadisinden doğuda dik yağmur ormanlı yarımadaya uzanır.',
      trap: '045 & 046 Sulawesi’nin orta bacakları ve Banggai koludur.'
    },
    {
      id: 'sulawesi-barat', name: 'Batı Sulawesi (Sulbar)', short: 'Sulbar', cap: 'Mamuju', reg: 'sulawesi',
      codes: ['042'], postal: '91',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Makassar Boğazı Kıyısı & 042x', traitCls: 4,
      cue: '0426 Mamuju, 0422 Majene, 0428 Polewali. Denizle dik dağ arasına sıkışmış tek kıyı karayolu, kazıklı Bugis/Mandar ahşap evleri.',
      trap: '042 kodu Mamuju ve Sulsel’in Parepare sınırıyla paylaşılır.'
    },
    {
      id: 'sulawesi-selatan', name: 'Güney Sulawesi (Sulsel)', short: 'Sulsel', cap: 'Makassar', reg: 'sulawesi',
      codes: ['041', '047', '048'], postal: '90–92',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Bugis Kazıklı Evler & Makassar 0411', traitCls: 4,
      cue: '0411 Makassar, 0471 Palopo, 0481 Bone. Yüksek kazıklı (panggung) ahşap Bugis evleri, kuzey Tana Toraja’da tekne biçimli Toraja çatıları ve düz çeltik ovaları.',
      trap: '041/047/048 ve yüksek ayaklı panggung ahşap evlerin en yoğun olduğu ildir!'
    },
    {
      id: 'sulawesi-tenggara', name: 'Güneydoğu Sulawesi (Sultra)', short: 'Sultra', cap: 'Kendari', reg: 'sulawesi',
      codes: ['040'], postal: '93',
      codeCls: 3, traitId: 'id-seng-outer', traitTitle: 'Kendari / Buton & 040x', traitCls: 4,
      cue: '0401 Kendari, 0402 Bau-Bau (Buton), 0405 Kolaka. Nikel madenli kırmızı yamaçlar, Muna-Buton kıyı kasabaları ve 040x telefon kodu.',
      trap: '040 neredeyse yalnızca Sulawesi’nin güneydoğu kolundadır.'
    },
    {
      id: 'maluku', name: 'Maluku', short: 'Maluku', cap: 'Ambon', reg: 'malpap',
      codes: ['091', '093'], postal: '97',
      codeCls: 7, traitId: 'id-seng-outer', traitTitle: 'Ambon 0911 · Baharat Adaları', traitCls: 4,
      cue: '0911 Ambon, 0924 Masohi. Kapsam çoğunlukla Ambon Adası ve Seram güneyindedir; sarp tropikal koylar ve 091x kodu.',
      trap: '09x gördün mü Maluku ya da Papua’dasın; batıdaki 7 büyük adada hiç 09x yoktur!'
    },
    {
      id: 'maluku-utara', name: 'Kuzey Maluku (Malut)', short: 'Malut', cap: 'Sofifi / Ternate', reg: 'malpap',
      codes: ['092'], postal: '97',
      codeCls: 7, traitId: 'id-seng-outer', traitTitle: 'Ternate & Halmahera (0921)', traitCls: 4,
      cue: '0921 Ternate/Sofifi, 0924 Tobelo. Konik Gamalama yanardağının çevrelediği Ternate Adası’nda sık Street View ve 092x numaraları.',
      trap: 'Deniz kenarında mükemmel koni volkan silüeti + 0921 = Ternate (Malut).'
    },
    {
      id: 'papua-barat', name: 'Batı Papua', short: 'Papua B.', cap: 'Manokwari', reg: 'malpap',
      codes: ['095', '098'], postal: '98',
      codeCls: 7, traitId: 'id-seng-outer', traitTitle: 'Sorong (0951) & Manokwari (0986)', traitCls: 4,
      cue: '0951 Sorong, 0986 Manokwari. Kapsam Kuşbaşı Yarımadası kıyı şehirleriyle (Sorong & Manokwari) sınırlıdır.',
      trap: 'Papua kıyı şehirlerinde Endonezya’nın kalanından farklı olarak uzun ahşap/beton direklerde geniş yağmur ormanı manzarası olur.'
    },
    {
      id: 'papua', name: 'Papua', short: 'Papua', cap: 'Jayapura', reg: 'malpap',
      codes: ['096', '097', '098'], postal: '98–99',
      codeCls: 7, traitId: 'id-seng-outer', traitTitle: 'Jayapura (0967) & Merauke (0971)', traitCls: 4,
      cue: '0967 Jayapura, 0901 Timika, 0971 Merauke, 0981 Biak. Kapsam kuzeyde Jayapura–Sentani çevresi ve güneyde düz Merauke ile sınırlıdır.',
      trap: '096–098 kodları doğu ucunu (Jayapura / Timika / Merauke) kesinleştirir.'
    }
  ];

  function resolveDecoder(raw, pack) {
    var q = pack.norm(raw);
    if (!q) return [];
    var out = [], seen = Object.create(null);
    function pushRes(code, label, sub, ids) {
      var k = code + '|' + label;
      if (seen[k]) return;
      seen[k] = 1;
      out.push({ code: code, label: label, sub: sub, ids: ids });
    }
    var digits = q.replace(/[^0-9]/g, '');
    if (digits.length >= 2) {
      if (digits.indexOf('08') === 0) {
        pushRes('08xx', 'GSM Cep Telefonu (KONUM VERMEZ)', 'Tabelaların %80’inde 0812/0852/0878 yazar. Sabit hat için 02–07 veya 09 ara!', []);
      } else {
        var p3 = digits.slice(0, 3);
        var exact = pack.units.filter(function (u) { return u.codes.indexOf(p3) >= 0; });
        if (exact.length) {
          pushRes(p3, exact.map(function (u) { return u.short; }).join(' / '),
            exact.map(function (u) { return u.cap + ' (' + u.postal + ')'; }).join(' · '),
            exact.map(function (u) { return u.id; }));
        }
        var p2 = digits.slice(0, 2);
        var b2 = {
          '02': ['Batı & Orta Cava (+ Jakarta/DIY)', '021–026 Batı/Jakarta · 024/027–029 Orta Cava/DIY', ['jakarta-raya', 'banten', 'jawa-barat', 'jawa-tengah', 'yogyakarta']],
          '03': ['Doğu Cava, Bali & Nusa Tenggara', '031–035 Jatim · 036 Bali · 037 NTB · 038 NTT', ['jawa-timur', 'bali', 'nusa-tenggara-barat', 'nusa-tenggara-timur']],
          '04': ['Tüm Sulawesi', '040 Sultra · 041/047/048 Sulsel · 042 Sulbar · 043 Sulut/Gorontalo · 045/046 Sulteng', ['sulawesi-selatan', 'sulawesi-barat', 'sulawesi-tengah', 'sulawesi-utara', 'gorontalo', 'sulawesi-tenggara']],
          '05': ['Tüm Kalimantan', '051/052 Kalsel · 053 Kalteng · 054/055 Kaltim · 056 Kalbar', ['kalimantan-selatan', 'kalimantan-tengah', 'kalimantan-timur', 'kalimantan-barat']],
          '06': ['Kuzey Sumatra & Aceh', '061–063 Sumut · 064–065 Aceh', ['aceh', 'sumatera-utara']],
          '07': ['Orta & Güney Sumatra (+ Babel/Kepri)', '071 Sumsel/Babel · 072 Lampung · 073 Bengkulu · 074 Jambi · 075 Sumbar · 076 Riau · 077 Kepri', ['sumatera-barat', 'riau', 'kepulauan-riau', 'jambi', 'bengkulu', 'sumatera-selatan', 'bangka-belitung', 'lampung']],
          '09': ['Maluku & Papua', '091/093 Maluku · 092 Malut · 095–098 Papua', ['maluku', 'maluku-utara', 'papua-barat', 'papua']]
        };
        if (b2[p2] && !exact.length) pushRes(p2 + 'x', b2[p2][0], b2[p2][1], b2[p2][2]);
      }
    }
    /* Köy/yer toponimi kestirmeleri */
    if (/gampong|\bgp\b/.test(q)) pushRes('Gampong', 'Aceh', 'Endonezya’da “Gampong” köy kelimesi yalnızca Aceh’tedir.', ['aceh']);
    if (/nagari/.test(q)) pushRes('Nagari', 'Batı Sumatra (Sumbar)', '“Nagari” köy birimi yalnızca Sumbar’da bulunur.', ['sumatera-barat']);
    if (/pekon/.test(q)) pushRes('Pekon', 'Lampung', '“Pekon” yerel köy birimi yalnızca Lampung’dadır.', ['lampung']);
    if (/^ci[a-z]+/.test(q)) pushRes('Ci-...', 'Batı Cava / Banten', 'Sunda dilinde “su/dere” (Cirebon, Cianjur, Cilegon).', ['jawa-barat', 'banten']);
    if (/^(wono|purwo|banyu|mojo|sido)/.test(q)) pushRes('Wono-/Purwo-...', 'Orta / Doğu Cava', 'Cavaca yerleşim adları (ayrıca göçmen Lampung).', ['jawa-tengah', 'yogyakarta', 'jawa-timur']);

    pack.units.forEach(function (u) {
      if (pack.norm(u.name).indexOf(q) >= 0 || pack.norm(u.short) === q || pack.norm(u.cap).indexOf(q) >= 0) {
        pushRes(u.codes[0], u.name, u.cap + ' · ' + u.codes.join(', '), [u.id]);
      }
    });
    return out.slice(0, 8);
  }

  function makeSimClue(type, u, pack, helpers) {
    var h = helpers.h, maskText = helpers.maskText;
    var r = pack.regById[u.reg];
    var code = u.codes[0];
    if (type === 'tel') {
      var full = code + '1-' + (400000 + ((u.name.length * 419) % 499999));
      if (code === '021') full = '021-5' + (400000 + ((u.name.length * 331) % 599999));
      return {
        meaning: 'Kod ' + code + ' · ' + (r ? r.tr : ''),
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Toko / Ruko tabelası · Sabit hat'),
          h('div', { 'class': 'sv-plate' }, h('span', { 'class': 'area' }, code), h('span', {}, 'Telp. (' + code + ') ' + full.slice(code.length + 1))),
          h('p', { 'class': 'micro' }, 'Bölge izi: ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    if (type === 'visual' && u.traitId && helpers.SVG) {
      return {
        meaning: (u.traitTitle || '') + ' · ' + code,
        el: h('div', { 'class': 'sc-inline' },
          helpers.SVG.render(u.traitId, { compact: true }),
          h('div', { 'class': 'sc-inline-txt' },
            h('span', { 'class': 'sv-kicker' }, 'Çatı / direk fotoğrafı'),
            h('b', {}, maskText(u.traitTitle || '', u)),
            h('p', { 'class': 'cue' }, maskText(u.cue, u))))
      };
    }
    if (type === 'topo') {
      var adm = u.id === 'aceh' ? 'Gampong Seutui, Kec. Baiturrahman'
        : u.id === 'sumatera-barat' ? 'Nagari Sungai Jambu, Kab. Tanah Datar'
          : u.id === 'lampung' ? 'Pekon Way Kerap, Kec. Semaka'
            : 'Kec. ' + (u.reg === 'jawa' ? (u.id === 'jawa-barat' || u.id === 'banten' ? 'Cikijing' : 'Wonokromo') : 'Sukamaju') + ', Telp (' + code + ')';
      return {
        meaning: 'İdari & dil ipucu · ' + code,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Okul / Masjid tabelası'),
          h('div', { 'class': 'sv-plate' }, h('span', {}, adm)),
          h('p', { 'class': 'micro' }, 'Saha notu: ' + maskText(u.cue, u)))
      };
    }
    return {
      meaning: maskText(u.cue, u).slice(0, 68),
      el: h('div', { 'class': 'clue-card-sv' },
        h('span', { 'class': 'sv-kicker' }, 'Adalar & saha tarifi'),
        h('p', { 'class': 'cue' }, maskText(u.cue, u)),
        u.trap ? h('p', { 'class': 'micro' }, 'Tuzak: ' + maskText(u.trap, u)) : null)
    };
  }

  g.CountryEngine.register({
    id: 'indonesia',
    name: 'Endonezya',
    unitLabel: 'il',
    unitLabelCap: 'İl (Provinsi)',
    postalLabel: 'Posta',
    geoVar: 'ID_GEO',
    themeId: 'id',
    themeCfg: {
      aria: 'Endonezya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.',
      fit: 'Tüm Endonezya’yı göster',
      grid: { lat: [-12, 8, 4], lon: [94, 144, 6], txt: [-10, 6, 4], refLon: 118, refLat: -2 },
      excludeWorld: ['Indonesia', 'Malaysia', 'Philippines', 'Australia'],
      bg: [
        [102.0, 3.8, 'MALEZYA', 'c'], [114.5, 2.8, 'BORNEO (MY)', 'c'],
        [143.5, -5.8, 'PAPUA YENİ GİNE', 'c'], [125.9, -8.8, 'DOĞU TİMOR', 'c'],
        [132.0, -14.0, 'AVUSTRALYA', 'c'], [109.5, 2.0, 'Natuna Denizi', 's'],
        [111.0, -5.6, 'Cava Denizi', 's'], [126.5, -5.2, 'Banda Denizi', 's']
      ]
    },
    srsPrefix: 'id',
    simKmScale: 620,
    maxFitZoom: 7,
    labelSize: 9.0,
    regionMeta: {
      code: 'ID',
      area: 'Asya',
      tone: 'teal',
      ralias: ['ID', 'IDN', 'ENDONEZYA', 'INDONESIA'],
      line: '33 il: 02–09 ada kodları, kiremit/sac çatı ve Kab./Kec. isimleri',
      blurb: 'Cava–Sumatra–Bali–Sulawesi ayrımı için iki kısa yol: 02–09 sabit telefon kodları ve kil kiremit, Atap Seng sac, Gonjong/Candi Bentar yapıları.',
      exploreDesc: '33 il, 02–09 alan kodları, çatı/direk mimarisi ve Kab./Kec./Nagari ad kuralları.',
      plan: [
        { title: '02–09 Ada Kodları (ve 08 tuzağı)', text: '02 Cava B/O · 03 Jatim/Bali · 04 Sulawesi · 05 Kalimantan · 06/07 Sumatra · 09 Papua.', to: 'telefon' },
        { title: 'Çatı, Kapı & Direk Kuşakları', text: 'Genteng kil kiremit, Atap Seng sac, Gonjong boynuzu ve Candi Bentar kapısını tanı.', to: 'mimari' },
        { title: 'Kab./Kec./Nagari & Ci-/Wono- ekleri', text: 'Gampong, Nagari, Pekon ve Ci-/Wono- kelimeleriyle sokak levhasından il yakala.', to: 'toponimi' },
        { title: 'Simülasyonla ada tuttur', text: 'Levha ve çatı ipuçlarıyla 5.000 puan pratik yap.', to: 'simulasyon', launch: { preset: 'mix' } }
      ]
    },
    regions: REGIONS,
    colorModes: [
      { id: 'reg', label: 'Ada grubu' },
      { id: 'code', label: 'Alan kodu (02–09)' },
      { id: 'trait', label: 'Çatı / mimari' }
    ],
    legendFor: function (mode, pack) {
      if (mode === 'code') {
        return [
          { cls: 'q0', label: '021–026 · Batı Cava & Jakarta/Banten', sub: '021 JKT/TNG, 022 Bandung, 025 Serang/Bogor', ids: ['jakarta-raya', 'banten', 'jawa-barat'] },
          { cls: 'q1', label: '024 / 027–029 · Orta Cava & DIY', sub: '024 Semarang, 0274 Jogja, 028/029', ids: ['jawa-tengah', 'yogyakarta'] },
          { cls: 'q2', label: '03x · Doğu Cava, Bali & Nusa Tenggara', sub: '031–035 Jatim, 036 Bali, 037 NTB, 038 NTT', ids: ['jawa-timur', 'bali', 'nusa-tenggara-barat', 'nusa-tenggara-timur'] },
          { cls: 'q4', label: '05x · Tüm Kalimantan', sub: '051/052 Kalsel, 053 Kalteng, 054/055 Kaltim, 056 Kalbar', ids: ['kalimantan-barat', 'kalimantan-tengah', 'kalimantan-selatan', 'kalimantan-timur'] },
          { cls: 'q5', label: '06x · Kuzey Sumatra & Aceh', sub: '061–063 Sumut, 064–065 Aceh', ids: ['aceh', 'sumatera-utara'] },
          { cls: 'q6', label: '07x · Orta/Güney Sumatra + Adalar', sub: '071 Sumsel/Babel, 072 Lampung, 073–077 Sumbar/Riau', ids: ['sumatera-barat', 'riau', 'kepulauan-riau', 'jambi', 'bengkulu', 'sumatera-selatan', 'bangka-belitung', 'lampung'] },
          { cls: 'q3', label: '04x · Tüm Sulawesi', sub: '040–048 ada geneli', ids: ['sulawesi-utara', 'gorontalo', 'sulawesi-tengah', 'sulawesi-barat', 'sulawesi-selatan', 'sulawesi-tenggara'] },
          { cls: 'q7', label: '09x · Maluku & Papua', sub: '091–098 doğu ucun tamamı', ids: ['maluku', 'maluku-utara', 'papua-barat', 'papua'] }
        ];
      }
      if (mode === 'trait') {
        return [
          { cls: 'q2', label: 'Kil Kiremit (Batı/Doğu Cava, NTB & Lampung)', sub: 'Kırmızı Genteng kil kiremit çatılar', ids: ['banten', 'jakarta-raya', 'jawa-barat', 'jawa-timur', 'nusa-tenggara-barat', 'lampung'] },
          { cls: 'q3', label: 'Orta Cava Ψ Trident Direk + Kiremit', sub: 'Jateng & DIY üçlü üst izolatör', ids: ['jawa-tengah', 'yogyakarta'] },
          { cls: 'q5', label: 'Özgün Tapınak / Boynuz Çatı', sub: 'Candi Bentar (Bali) · Gonjong (Sumbar)', ids: ['bali', 'sumatera-barat'] },
          { cls: 'q0', label: 'Kuzey Sumatra Çatallı Direk', sub: 'Sumut üst traversli direkler', ids: ['sumatera-utara'] },
          { cls: 'q4', label: 'Atap Seng Gümüş Sac Kuşağı', sub: 'Sumatra, Kalimantan, Sulawesi, Doğu', ids: ['aceh', 'riau', 'kepulauan-riau', 'jambi', 'bengkulu', 'sumatera-selatan', 'bangka-belitung', 'nusa-tenggara-timur', 'kalimantan-barat', 'kalimantan-tengah', 'kalimantan-selatan', 'kalimantan-timur', 'sulawesi-utara', 'gorontalo', 'sulawesi-tengah', 'sulawesi-barat', 'sulawesi-selatan', 'sulawesi-tenggara', 'maluku', 'maluku-utara', 'papua-barat', 'papua'] }
        ];
      }
      return pack.regions.map(function (r) {
        return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: pack.units.filter(function (u) { return u.reg === r.id; }).map(function (u) { return u.id; }) };
      });
    },
    units: UNITS,
    decoder: {
      title: '02–09 telefon & Gampong/Nagari/Ci- çözücü',
      placeholder: 'Kod (075, 041, 027) veya Gampong, Nagari, Cikarang…',
      hint: '0812/0852/0878 GSM cep numarasıdır, KONUM VERMEZ! Sabit hatlarda ilk 3 haneye (0xx) bak.',
      resolve: resolveDecoder
    },
    topics: [
      {
        key: 'telefon',
        navLabel: '02–09 Kod',
        icon: 'phone',
        drillPreset: 'code',
        mapMode: 'code',
        labelMode: 'code',
        title: '02–09 sabit alan kodları (08 GSM tuzağı hariç!)',
        lead: 'Nereye bakılır: Dükkan (Ruko) vitrinleri, okul/klinik duvarları ve afişlerde “Telp.” yanında telefon numarası yazar. Endonezya’nın tamamı yalnızca 7 sabit ön eke (02–07 ve 09) bölünmüştür; 0811–0899 arası numaralar cep telefonudur, doğrudan ele!',
        desc: '02 Cava’dan 09 Papua’ya tam ada rehberi ve 08 cep telefonu elemesi.',
        decoder: true,
        bands: [
          { cls: 'q0', key: '021–26', title: 'Batı Cava, Jakarta (021) & Banten (025)', sub: '021 Jakarta/Tangerang/Bekasi · 022 Bandung · 023 Cirebon · 025/026 Bogor/Serang.', ids: ['jakarta-raya', 'banten', 'jawa-barat'] },
          { cls: 'q1', key: '024/27–29', title: 'Orta Cava & Yogyakarta (0274)', sub: '024 Semarang · 0271 Solo · 0274 Jogja · 028/029 iç Orta Cava.', ids: ['jawa-tengah', 'yogyakarta'] },
          { cls: 'q2', key: '03x', title: 'Doğu Cava (031–035), Bali (036), NTB (037), NTT (038)', sub: '031 Surabaya · 034 Malang · 0361 Denpasar · 0370 Lombok · 0380 Kupang.', ids: ['jawa-timur', 'bali', 'nusa-tenggara-barat', 'nusa-tenggara-timur'] },
          { cls: 'q3', key: '04x', title: 'Sulawesi’nin tamamı', sub: '040 Sultra · 041/047/048 Sulsel (Makassar) · 042 Sulbar · 043 Sulut/Gorontalo · 045/046 Sulteng.', ids: ['sulawesi-utara', 'gorontalo', 'sulawesi-tengah', 'sulawesi-barat', 'sulawesi-selatan', 'sulawesi-tenggara'] },
          { cls: 'q4', key: '05x', title: 'Kalimantan’ın tamamı', sub: '051/052 Kalsel · 053 Kalteng · 054/055 Kaltim · 056 Kalbar (Pontianak).', ids: ['kalimantan-barat', 'kalimantan-tengah', 'kalimantan-selatan', 'kalimantan-timur'] },
          { cls: 'q5', key: '06x', title: 'Kuzey Sumatra (061 Medan) & Aceh (064–065)', sub: '061–063 Sumut · 064–065 Aceh (Banda Aceh 0651).', ids: ['aceh', 'sumatera-utara'] },
          { cls: 'q6', key: '07x', title: 'Orta/Güney Sumatra + Bangka/Kepri', sub: '071 Palembang/Babel · 072 Lampung · 073 Bengkulu · 074 Jambi · 075 Padang · 076 Riau · 077 Batam.', ids: ['sumatera-barat', 'riau', 'kepulauan-riau', 'jambi', 'bengkulu', 'sumatera-selatan', 'bangka-belitung', 'lampung'] },
          { cls: 'q7', key: '09x', title: 'Maluku (091–093) & Papua (095–098)', sub: '0911 Ambon · 0921 Ternate · 0951 Sorong · 0967 Jayapura.', ids: ['maluku', 'maluku-utara', 'papua-barat', 'papua'] }
        ],
        rules: [
          {
            title: '08xx Tuzağı + Cava içi 024/027–029 Sıçraması',
            body: 'Endonezya’da sokak tabelalarında numara okurken iki kural hayat kurtarır:',
            traps: [
              ['0812 / 0813 / 0852 / 0878…', 'Hepsi GSM cep telefonudur; konum vermez! “Telp” yanında 02/03/04/05/06/07/09 ara.'],
              ['021/22/23/25/26 vs 024/27/28/29', '022, 023, 025, 026 Batı Cava iken 024, 027, 028, 029 Orta Cava + Jogja’dır!']
            ],
            ids: ['jakarta-raya', 'jawa-barat', 'jawa-tengah', 'yogyakarta']
          }
        ]
      },
      {
        key: 'mimari',
        navLabel: 'Çatı & Direk',
        icon: 'bulb',
        drillPreset: 'visual',
        mapMode: 'trait',
        labelMode: 'short',
        title: 'Kiremit vs sac çatı, Minang boynuzları, Bali kapısı ve direkler',
        lead: 'Nereye bakılır: Sokaktaki ilk evin çatısına (terakota kil kiremit mi yoksa oluklu metal sac mı?), bahçe kapısına ve başının üzerindeki PLN elektrik direğinin tepesine bak. Tek başına bu üçlü Endonezya’yı adalara böler.',
        desc: '6 gerçek Sokak Görünümü fotoğrafı: Cava kiremit, dış adalar sac çatı, Gonjong, Candi Bentar ve direkler.',
        visuals: [
          { id: 'id-java-clay', badge: 'Çatı · Cava', title: 'Kil Kiremit Çatı (Genteng Tanah Liat)', sub: 'Kırmızı-kahverengi pişmiş kil kiremitler neredeyse tüm Cava, Bali (+ NTB) ve Güney Lampung evlerinin imzasıdır.', tags: ['Cava + Lampung', 'Kırmızı kiremit'], ids: ['banten', 'jakarta-raya', 'jawa-barat', 'jawa-tengah', 'yogyakarta', 'jawa-timur', 'lampung', 'nusa-tenggara-barat'] },
          { id: 'id-seng-outer', badge: 'Çatı · Dış Adalar', title: 'Oluklu Gümüş Sac Çatı (Atap Seng)', sub: 'Sumatra, Kalimantan, Sulawesi, Maluku ve Papua’da parlak/paslı oluklu çinko sac çatılar egemendir; kil kiremit yok denecek kadar azdır.', tags: ['Sumatra / Borneo / Sulawesi', 'Oluklu metal çatı'], ids: ['aceh', 'riau', 'jambi', 'bengkulu', 'sumatera-selatan', 'kalimantan-barat', 'kalimantan-tengah', 'kalimantan-selatan', 'kalimantan-timur', 'sulawesi-selatan', 'sulawesi-utara', 'papua'] },
          { id: 'id-minang', badge: 'İkon · Sumbar', title: 'Gonjong / Rumah Gadang Boynuz Çatı', sub: 'Manda boynuzu gibi göğe kıvrılan sivri uçlu gümüş çatılar kamu binası ve dükkanlarda bile varsa kesin Batı Sumatra (Sumatera Barat).', tags: ['%100 Sumbar (075)', 'Boynuz silüet'], ids: ['sumatera-barat'] },
          { id: 'id-bali-gate', badge: 'İkon · Bali', title: 'Candi Bentar & Hindu Taş Kapıları', sub: 'Sokaktaki her ev girişinde siyah volkanik/kızıl taş bölünmüş Hindu tapınak kapısı varsa %100 Bali (0361).', tags: ['%100 Bali', 'Bölünmüş tapınak kapı'], ids: ['bali'] },
          { id: 'id-java-trident', badge: 'Direk · Orta Cava', title: 'Orta Cava Trident (Ψ Üçlü Direk Tepesi)', sub: 'Direk tepesinde V biçimli çapraz kol ile ortadaki dikmeden oluşan üç kahverengi izolatörlü trident hardware Orta Cava (Jateng) ve Yogyakarta’nın güçlü imzasıdır.', tags: ['Orta Cava + Jogja', 'Ψ Üçlü trident'], ids: ['jawa-tengah', 'yogyakarta'] },
          { id: 'id-sumatra-n', badge: 'Direk · K. Sumatra', title: 'Kuzey Sumatra Çatallı Çelik/Beton Direk', sub: 'Üstteki geniş traversi alttan iki uzun çapraz payandayla desteklenen direk tepeleri Kuzey Sumatra (Sumut) yollarında sık görülür.', tags: ['Sumut (061–063)', 'Çapraz çatal kiriş'], ids: ['sumatera-utara'] }
        ],
        rules: [
          {
            title: '3 Saniyelik Endonezya Akışı',
            body: 'Hiç şehir ismi okumadan haritayı daraltmak için sırayla sor:',
            traps: [
              ['1. Evler kırmızı kil kiremit mi?', 'EVET -> Cava, Bali/NTB ya da Lampung. HAYIR (parlak gümüş sac + ahşap kazık) -> Sumatra, Kalimantan, Sulawesi veya Doğu!'],
              ['2. Siyam/boynuz çatı veya Hindu kapı var mı?', 'Boynuzlu Gonjong -> Sumbar · Bölünmüş taş kapı -> Bali.'],
              ['3. Dinî doku nasıl?', 'Her kavşakta kilise + ahşap ev -> Kuzey Sulawesi (Manado) veya NTT/Papua/Batak (Toba).']
            ],
            ids: ['jawa-tengah', 'bali', 'sumatera-barat', 'sulawesi-utara', 'kalimantan-tengah', 'lampung']
          }
        ]
      },
      {
        key: 'toponimi',
        navLabel: 'İdari İsimler',
        icon: 'list',
        drillPreset: 'clue',
        mapMode: 'reg',
        labelMode: 'short',
        title: 'Kabupaten / Kecamatan kısaltmaları ve dil ailesi önekleri',
        lead: 'Nereye bakılır: Sokak girişlerindeki kemerlerde (Gapura), okul/belediye önü tabelalarında ve cami panolarında adres şu sırayla yazar: Köy (Desa / Gp. / Nagari) · Bucak (Kec.) · İlçe (Kab.) · Posta (Kode Pos). İlk kelimeler bile bölgeyi ele verir!',
        desc: 'Gampong (Aceh), Nagari (Sumbar), Pekon (Lampung) ve Sunda (Ci-) vs Cava (Wono-/Purwo-) ayrımı.',
        rules: [
          {
            title: 'Yerel Köy Adı İpuçları & Sunda / Cava Ayrımı',
            body: 'Endonezya’da farklı bölgeler köy karşılığı için başka kelimeler ve önekler kullanır:',
            traps: [
              ['Gampong (Gp.) = Aceh', 'Tabelada “Gp.” veya “Gampong” yazıyorsa kuzey ucundaki Aceh ilindesin.'],
              ['Nagari = Sumatera Barat', '“Wali Nagari” veya “Nagari …” yalnızca Batı Sumatra’nın köy/yönetim adıdır.'],
              ['Pekon = Lampung', 'Kil kiremit çatı + “Pekon …” = güney Sumatra (Lampung)!'],
              ['Ci-... (Cibadak, Cirebon, Cianjur)', 'Sundaca “su” anlamına gelir -> Batı Cava veya Banten.'],
              ['Wono-, Purwo-, Banyu-, Mojo-, Sido-', 'Cavaca köken -> Orta & Doğu Cava (+ Yogyakarta; Doğu’da Mojo-/Sido- daha sık).']
            ],
            ids: ['aceh', 'sumatera-barat', 'lampung', 'jawa-barat', 'banten', 'jawa-tengah', 'jawa-timur']
          }
        ]
      }
    ],
    presets: [
      { id: 'mix', label: 'Karışık', q: ['loc', 'visual', 'code', 'codeToUnit', 'clueToUnit'] },
      { id: 'code', label: '02–09 Kod', q: ['code', 'codeToUnit'] },
      { id: 'visual', label: 'Çatı & İkon', q: ['visual', 'clueToUnit'] },
      { id: 'loc', label: '33 İl Yeri', q: ['loc'] }
    ],
    simTypes: [
      { v: 'tel', label: 'Tabelada kod' },
      { v: 'visual', label: 'Çatı / direk fotoğrafı' },
      { v: 'topo', label: 'İdari / önek' },
      { v: 'clue', label: 'Ada tarifi' }
    ],
    makeSimClue: makeSimClue
  });
})(typeof window !== 'undefined' ? window : globalThis);

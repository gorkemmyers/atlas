/* packs/indonesia.js — Endonezya: yerel yazı ve bölgesel görünüm (plaka YOK: oyunda bulanık)
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "indonesia",
   "name": "Endonezya",
   "code": "ID",
   "area": "Asya",
   "tone": "teal",
   "geoVar": "ID_GEO",
   "themeId": "id",
   "themeCfg": {
    "aria": "Endonezya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.",
    "fit": "Tüm Endonezya’yı göster",
    "grid": {
     "lat": [
      -12,
      8,
      4
     ],
     "lon": [
      94,
      144,
      6
     ],
     "txt": [
      -10,
      6,
      4
     ],
     "refLon": 118,
     "refLat": -2
    },
    "excludeWorld": [
     "Indonesia",
     "Malaysia",
     "Philippines",
     "Australia"
    ],
    "bg": [
     [
      102,
      3.8,
      "MALEZYA",
      "c"
     ],
     [
      114.5,
      2.8,
      "BORNEO (MY)",
      "c"
     ],
     [
      143.5,
      -5.8,
      "PAPUA YENİ GİNE",
      "c"
     ],
     [
      125.9,
      -8.8,
      "DOĞU TİMOR",
      "c"
     ],
     [
      132,
      -14,
      "AVUSTRALYA",
      "c"
     ],
     [
      109.5,
      2,
      "Natuna Denizi",
      "s"
     ],
     [
      111,
      -5.6,
      "Cava Denizi",
      "s"
     ],
     [
      126.5,
      -5.2,
      "Banda Denizi",
      "s"
     ]
    ]
   },
   "srsPrefix": "id",
   "simKmScale": 620,
   "maxFitZoom": 7,
   "labelSize": 8.8,
   "unitLabel": "il",
   "unitLabelCap": "İl",
   "codeLabel": "Kod",
   "line": "33 il · yerel yazı ve bölgesel görünüm",
   "blurb": "Plaka yok: oyunda plakalar bulanık. Bölgeyi söyleyen iki şey var: tabelalardaki yerel yazılar (Java, Sunda, Bali, Lontara) ve bölgesel görünüm (çatılar, kazık evler, palmiye plantasyonları, savan, teras). Telefon kodları pratikte işe yaramaz, o yüzden yok.",
   "overviewLead": "33 ili haritada öğren; kartta o ilde görülen yerel ipucu yazar. Haritada Kuzey Kalimantan (2012) Doğu Kalimantan içinde, 2022'de ayrılan yeni Papua illeri de Papua içinde gösterilir.",
   "regions": [
    {
     "id": "sumatra",
     "tr": "Sumatra",
     "key": "SUM",
     "color": 0,
     "cue": "Batı Sumatra'da boynuz çatılı Minangkabau evleri, Kuzey Sumatra'da eyer çatılı Toba Batak evleri, doğu kesimde yağ palmiyesi plantasyonları."
    },
    {
     "id": "jawa",
     "tr": "Cava (Java)",
     "key": "JAV",
     "color": 2,
     "cue": "Tabelalarda Latin adın altında Java yazısı (Yogyakarta, Solo) ya da Sunda yazısı (Bandung, Bogor)."
    },
    {
     "id": "balint",
     "tr": "Bali ve Nusa Tenggara",
     "key": "BNT",
     "color": 5,
     "cue": "Bali: Bali yazılı tabelalar, tapınak kapıları, pirinç terasları. Doğuda (Sumbawa, Sumba, Timor): kuru savan."
    },
    {
     "id": "kalimantan",
     "tr": "Kalimantan (Borneo)",
     "key": "KAL",
     "color": 4,
     "cue": "Kalimantan: kazıklar üstünde uzun Dayak ve Banjar evleri, yağ palmiyesi plantasyonları."
    },
    {
     "id": "sulawesi",
     "tr": "Sulawesi",
     "key": "SLW",
     "color": 1,
     "cue": "Güney Sulawesi: Makassar'da Lontara yazılı tabelalar, Toraja'da tekne çatılı tongkonan evleri."
    },
    {
     "id": "malpap",
     "tr": "Maluku ve Papua",
     "key": "MPP",
     "color": 7,
     "cue": "Papua dağ bölgesinde saz kubbe çatılı honai evleri."
    }
   ],
   "units": [
    {
     "id": "aceh",
     "name": "Aceh",
     "short": "Aceh",
     "local": "",
     "cap": "Banda Aceh",
     "reg": "sumatra",
     "cue": ""
    },
    {
     "id": "sumatera-utara",
     "name": "Kuzey Sumatra (Sumut)",
     "short": "Sumut",
     "local": "",
     "cap": "Medan",
     "reg": "sumatra",
     "cue": "Toba Batak evleri (rumah bolon): eyer gibi ortası çökük dev çatı."
    },
    {
     "id": "sumatera-barat",
     "name": "Batı Sumatra (Sumbar)",
     "short": "Sumbar",
     "local": "",
     "cap": "Padang",
     "reg": "sumatra",
     "cue": "Boynuz gibi yukarı kalkık çatılı Minangkabau evleri (rumah gadang); Padang'da kamu binalarında da bu çatı sık görülür."
    },
    {
     "id": "riau",
     "name": "Riau",
     "short": "Riau",
     "local": "",
     "cap": "Pekanbaru",
     "reg": "sumatra",
     "cue": "Yağ palmiyesi plantasyonları yol kenarında kilometrelerce sürer."
    },
    {
     "id": "kepulauan-riau",
     "name": "Kepulauan Riau (Kepri)",
     "short": "Kepri",
     "local": "",
     "cap": "Tanjungpinang",
     "reg": "sumatra",
     "cue": ""
    },
    {
     "id": "jambi",
     "name": "Jambi",
     "short": "Jambi",
     "local": "",
     "cap": "Jambi",
     "reg": "sumatra",
     "cue": "Yağ palmiyesi plantasyonları yol kenarında kilometrelerce sürer."
    },
    {
     "id": "bengkulu",
     "name": "Bengkulu",
     "short": "Bengkulu",
     "local": "",
     "cap": "Bengkulu",
     "reg": "sumatra",
     "cue": ""
    },
    {
     "id": "sumatera-selatan",
     "name": "Güney Sumatra (Sumsel)",
     "short": "Sumsel",
     "local": "",
     "cap": "Palembang",
     "reg": "sumatra",
     "cue": "Yol kenarlarında kilometrelerce yağ palmiyesi plantasyonu."
    },
    {
     "id": "bangka-belitung",
     "name": "Bangka Belitung",
     "short": "Babel",
     "local": "",
     "cap": "Pangkalpinang",
     "reg": "sumatra",
     "cue": ""
    },
    {
     "id": "lampung",
     "name": "Lampung",
     "short": "Lampung",
     "local": "",
     "cap": "Bandar Lampung",
     "reg": "sumatra",
     "cue": ""
    },
    {
     "id": "banten",
     "name": "Banten",
     "short": "Banten",
     "local": "",
     "cap": "Serang",
     "reg": "jawa",
     "cue": ""
    },
    {
     "id": "jakarta-raya",
     "name": "DKI Jakarta",
     "short": "Jakarta",
     "local": "",
     "cap": "Jakarta",
     "reg": "jawa",
     "cue": ""
    },
    {
     "id": "jawa-barat",
     "name": "Batı Cava (Jabar)",
     "short": "Jabar",
     "local": "",
     "cap": "Bandung",
     "reg": "jawa",
     "cue": "Bandung ve Bogor tabelalarında Latin adın altında Sunda yazısı."
    },
    {
     "id": "jawa-tengah",
     "name": "Orta Cava (Jateng)",
     "short": "Jateng",
     "local": "",
     "cap": "Semarang",
     "reg": "jawa",
     "cue": "Solo (Surakarta) tabelalarında Latin adın altında Java yazısı."
    },
    {
     "id": "yogyakarta",
     "name": "DI Yogyakarta",
     "short": "DIY",
     "local": "",
     "cap": "Yogyakarta",
     "reg": "jawa",
     "cue": "Tabelalarda Latin adın altında Java yazısı; Malioboro ve saray çevresinde belirgin."
    },
    {
     "id": "jawa-timur",
     "name": "Doğu Cava (Jatim)",
     "short": "Jatim",
     "local": "",
     "cap": "Surabaya",
     "reg": "jawa",
     "cue": ""
    },
    {
     "id": "bali",
     "name": "Bali",
     "short": "Bali",
     "local": "",
     "cap": "Denpasar",
     "reg": "balint",
     "cue": "Bali yazılı tabelalar, ortadan bölünmüş tapınak kapıları (candi bentar) ve basamaklı pirinç terasları."
    },
    {
     "id": "nusa-tenggara-barat",
     "name": "Batı Nusa Tenggara (NTB)",
     "short": "NTB",
     "local": "",
     "cap": "Mataram",
     "reg": "balint",
     "cue": "Sumbawa'da kuru savan: otlak, seyrek ağaç, sığır ve uzakta Tambora."
    },
    {
     "id": "nusa-tenggara-timur",
     "name": "Doğu Nusa Tenggara (NTT)",
     "short": "NTT",
     "local": "",
     "cap": "Kupang",
     "reg": "balint",
     "cue": "Kuru savan ve seyrek ağaçlı otlaklar (Sumba, Timor, Flores)."
    },
    {
     "id": "kalimantan-barat",
     "name": "Batı Kalimantan (Kalbar)",
     "short": "Kalbar",
     "local": "",
     "cap": "Pontianak",
     "reg": "kalimantan",
     "cue": "Dayak uzun evleri (betang) ve yağ palmiyesi plantasyonları."
    },
    {
     "id": "kalimantan-tengah",
     "name": "Orta Kalimantan (Kalteng)",
     "short": "Kalteng",
     "local": "",
     "cap": "Palangka Raya",
     "reg": "kalimantan",
     "cue": "Kazıklar üstünde çok uzun tek çatılı Dayak evleri (betang) ve geniş yağ palmiyesi plantasyonları."
    },
    {
     "id": "kalimantan-selatan",
     "name": "Güney Kalimantan (Kalsel)",
     "short": "Kalsel",
     "local": "",
     "cap": "Banjarbaru / Banjarmasin",
     "reg": "kalimantan",
     "cue": "Ortasında yükselen dik çatı bölümü olan ahşap Banjar evleri (bubungan tinggi)."
    },
    {
     "id": "kalimantan-timur",
     "name": "Doğu Kalimantan (Kaltim)",
     "short": "Kaltim",
     "local": "",
     "cap": "Samarinda",
     "reg": "kalimantan",
     "cue": "Geniş yağ palmiyesi plantasyonları ve nehir boyu yerleşimler."
    },
    {
     "id": "sulawesi-utara",
     "name": "Kuzey Sulawesi (Sulut)",
     "short": "Sulut",
     "local": "",
     "cap": "Manado",
     "reg": "sulawesi",
     "cue": ""
    },
    {
     "id": "gorontalo",
     "name": "Gorontalo",
     "short": "Gorontalo",
     "local": "",
     "cap": "Gorontalo",
     "reg": "sulawesi",
     "cue": ""
    },
    {
     "id": "sulawesi-tengah",
     "name": "Orta Sulawesi (Sulteng)",
     "short": "Sulteng",
     "local": "",
     "cap": "Palu",
     "reg": "sulawesi",
     "cue": ""
    },
    {
     "id": "sulawesi-barat",
     "name": "Batı Sulawesi (Sulbar)",
     "short": "Sulbar",
     "local": "",
     "cap": "Mamuju",
     "reg": "sulawesi",
     "cue": ""
    },
    {
     "id": "sulawesi-selatan",
     "name": "Güney Sulawesi (Sulsel)",
     "short": "Sulsel",
     "local": "",
     "cap": "Makassar",
     "reg": "sulawesi",
     "cue": "Makassar'da Lontara yazılı tabelalar; Toraja'da tekne çatılı tongkonan, kıyıda katlı alınlıklı Bugis evleri."
    },
    {
     "id": "sulawesi-tenggara",
     "name": "Güneydoğu Sulawesi (Sultra)",
     "short": "Sultra",
     "local": "",
     "cap": "Kendari",
     "reg": "sulawesi",
     "cue": ""
    },
    {
     "id": "maluku",
     "name": "Maluku",
     "short": "Maluku",
     "local": "",
     "cap": "Ambon",
     "reg": "malpap",
     "cue": ""
    },
    {
     "id": "maluku-utara",
     "name": "Kuzey Maluku (Malut)",
     "short": "Malut",
     "local": "",
     "cap": "Sofifi / Ternate",
     "reg": "malpap",
     "cue": ""
    },
    {
     "id": "papua-barat",
     "name": "Batı Papua",
     "short": "Papua B.",
     "local": "",
     "cap": "Manokwari",
     "reg": "malpap",
     "cue": ""
    },
    {
     "id": "papua",
     "name": "Papua",
     "short": "Papua",
     "local": "",
     "cap": "Jayapura",
     "reg": "malpap",
     "cue": "Dağ bölgesinde yuvarlak, saz kubbe çatılı honai evleri."
    }
   ],
   "topics": [
    {
     "key": "yazi",
     "navLabel": "Yazılar",
     "icon": "langs",
     "drillPreset": "visual",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Tabeladaki yerel yazı",
     "lead": "Endonezya'da bazı bölgelerde Latin sokak adının yanında yerel yazı da bulunur: Java, Sunda, Bali ve Lontara. Her tabelada olmaz ama görürsen bölgeyi doğrudan söyler. Fotoğraflardaki sarı kutu satırın tam yerini gösterir.",
     "desc": "Latin adın yanındaki yerel yazıdan bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. Java yazısı, Sunda yazısı, Lontara…",
      "hint": "Gördüğün yazıyı yaz: hangi bölge olduğu haritada boyanır.",
      "quizPrompt": "Bu ipucu hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Java yazısı",
        "label": "Java yazısı (aksara Jawa) → Yogyakarta ve Orta Cava",
        "sub": "Latin sokak adının altında ikinci satır. Yogyakarta'da Malioboro ve saray çevresinde, Orta Cava'da Solo (Surakarta) gibi şehirlerde.",
        "keys": [
         "java",
         "jawa",
         "aksara jawa",
         "javanese",
         "hanacaraka",
         "yogyakarta",
         "solo",
         "surakarta"
        ],
        "ids": [
         "yogyakarta",
         "jawa-tengah"
        ],
        "main": "Java yazısı",
        "prompt": "Latin adın altında Java yazısı hangi bölgede görülür?"
       },
       {
        "key": "Sunda yazısı",
        "label": "Sunda yazısı (aksara Sunda) → Batı Cava",
        "sub": "Bandung ve Bogor sokak tabelalarında Latin adın altında.",
        "keys": [
         "sunda",
         "aksara sunda",
         "sundanese",
         "bandung",
         "bogor",
         "braga"
        ],
        "ids": [
         "jawa-barat"
        ],
        "main": "Sunda yazısı",
        "prompt": "Latin adın altında Sunda yazısı hangi bölgede görülür?"
       },
       {
        "key": "Bali yazısı",
        "label": "Bali yazısı (aksara Bali) → Bali",
        "sub": "Latin yazının yanında Bali yazısı. Resmî düzene göre Latin yazının üstüne konur (2018 tarihli Bali yönetmeliği); eski tabelalarda altta da görülür.",
        "keys": [
         "bali",
         "aksara bali",
         "balinese"
        ],
        "ids": [
         "bali"
        ],
        "main": "Bali yazısı",
        "prompt": "Latin adın yanında Bali yazısı hangi bölgede görülür?"
       },
       {
        "key": "Lontara",
        "label": "Lontara yazısı → Güney Sulawesi",
        "sub": "Latin başlığın altında sivri, birbirinden kopuk işaretler. Makassar çevresinde.",
        "keys": [
         "lontara",
         "aksara lontara",
         "makassar"
        ],
        "ids": [
         "sulawesi-selatan"
        ],
        "main": "Lontara",
        "prompt": "Lontara yazısı hangi bölgede görülür?"
       }
      ]
     },
     "flows": [
      {
       "title": "Latin adın altına ya da üstüne bak",
       "body": "Sokak adının (Jl. …) altında ya da üstünde ikinci bir yazı satırı var mı? Varsa bu yerel yazıdır ve en güçlü ipucudur. Java yazısı Yogyakarta ve Solo, Sunda yazısı Bandung ve Bogor, Bali yazısı Bali, Lontara Makassar çevresi."
      },
      {
       "title": "Harfleri değil yeri ayırt et",
       "body": "Java, Sunda ve Bali yazıları ilk bakışta yakın görünür. Harfe takılmadan tabelanın bulunduğu bölgeye bak; Lontara sivri ve kopuk işaretleriyle daha kolay ayrılır."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Yerel yazılar birbirine benzer görünür",
       "ids": [
        "yogyakarta",
        "jawa-tengah",
        "jawa-barat",
        "bali",
        "sulawesi-selatan"
       ],
       "body": "Java, Sunda ve Bali yazıları ilk bakışta yakın görünebilir. Harfe güvenmeden önce tabelanın yerine bak: bölgeyi esas belirleyen odur. Lontara ise sivri ve kopuk işaretleriyle daha kolay ayrılır.",
       "traps": [
        [
         "Java yazısı",
         "Yogyakarta, Solo"
        ],
        [
         "Sunda yazısı",
         "Bandung, Bogor"
        ],
        [
         "Bali yazısı",
         "Bali"
        ],
        [
         "Lontara",
         "Makassar"
        ]
       ]
      }
     ],
     "visualsTitle": "Fotoğraflı ipuçları ",
     "visuals": [
      {
       "id": "v-jawa",
       "title": "Yogyakarta ve Solo: Java yazısı",
       "badge": "Java",
       "set": "id-jawa",
       "ids": [
        "yogyakarta",
        "jawa-tengah"
       ],
       "sub": "Latin sokak adının altında ikinci satır olarak Java yazısı. Sarı kutu o satırı gösterir.",
       "tags": [
        "Jl. + Java yazısı"
       ]
      },
      {
       "id": "v-sunda",
       "title": "Bandung ve Bogor: Sunda yazısı",
       "badge": "Sunda",
       "set": "id-sunda",
       "ids": [
        "jawa-barat"
       ],
       "sub": "Batı Cava'da da Latin adın altında yerel yazı var; harfler Java yazısından farklıdır.",
       "tags": [
        "Jl. + Sunda yazısı"
       ]
      },
      {
       "id": "v-bali",
       "title": "Bali: Bali yazısı",
       "badge": "Bali",
       "set": "id-bali",
       "ids": [
        "bali"
       ],
       "sub": "Bali yazısı bazı tabelalarda Latin satırın altında (ilk fotoğraf), bazılarında üstünde (ikinci fotoğraf) durur.",
       "tags": [
        "Bali yazısı"
       ]
      },
      {
       "id": "v-lontara",
       "title": "Makassar: Lontara yazısı",
       "badge": "Lontara",
       "set": "id-lontara",
       "ids": [
        "sulawesi-selatan"
       ],
       "sub": "Güney Sulawesi'nin yerel yazısı: Latin başlığın altında sivri, birbirinden kopuk işaretler.",
       "tags": [
        "Lontara"
       ]
      }
     ],
     "practice": "visual"
    },
    {
     "key": "yerel",
     "navLabel": "Bölgesel görünüm",
     "icon": "camera",
     "drillPreset": "visual",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Bölgeyi gösteren ev ve doğa",
     "lead": "Endonezya'da yazı yoksa bölgeyi çoğu zaman ev biçimi ve doğa söyler. Sumatra'da boynuz ve eyer çatılar, Kalimantan'da kazıklar üstünde uzun Dayak ve Banjar evleri ile bitmeyen yağ palmiyesi, Sulawesi'de Bugis ve Toraja evleri, Bali'de teraslar ve tapınak kapıları, Papua'da saz kubbe honai, doğu adalarda kuru savan. Önce doğaya (palmiye, savan, teras), sonra yapıya bak.",
     "desc": "Ev biçiminden ve doğadan bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. gonjong, betang, yağ palmiyesi, honai, savan…",
      "hint": "Gördüğün ipucunu yaz: hangi bölge olduğu haritada boyanır.",
      "quizPrompt": "Bu ipucu hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Boynuz çatı",
        "label": "Boynuz gibi sivri çatı (gonjong) → Batı Sumatra",
        "sub": "Rumah gadang: çatı uçları ayrı ayrı yukarı sivrilir. Padang'da kamu binalarının çoğunda da bu çatı görülür.",
        "keys": [
         "gonjong",
         "bagonjong",
         "rumah gadang",
         "minangkabau",
         "boynuz",
         "padang"
        ],
        "ids": [
         "sumatera-barat"
        ],
        "main": "Boynuz çatı",
        "prompt": "Boynuz gibi sivri çatılı evler hangi bölgede?"
       },
       {
        "key": "Eyer çatı",
        "label": "Eyer gibi çökük dev çatı (rumah bolon) → Kuzey Sumatra",
        "sub": "Toba Batak evi: ortası çökük, iki ucu yukarı kalkık büyük çatı; ev kazıklar üzerindedir.",
        "keys": [
         "rumah bolon",
         "bolon",
         "batak",
         "toba",
         "eyer"
        ],
        "ids": [
         "sumatera-utara"
        ],
        "main": "Eyer çatı",
        "prompt": "Eyer gibi çökük dev çatılı evler hangi bölgede?"
       },
       {
        "key": "Tekne çatı",
        "label": "Tekne biçimli çatı (tongkonan) → Toraja, Güney Sulawesi",
        "sub": "Tek parça, tekne gibi iki ucu yukarı kalkık çatı.",
        "keys": [
         "tongkonan",
         "toraja",
         "tekne"
        ],
        "ids": [
         "sulawesi-selatan"
        ],
        "main": "Tekne çatı",
        "prompt": "Tekne biçimli çatılı evler hangi bölgede?"
       },
       {
        "key": "Bölünmüş kapı",
        "label": "Ortadan bölünmüş taş kapı (candi bentar) → Bali",
        "sub": "İki yarım kule, arası açık: Bali Hindu tapınaklarının girişi.",
        "keys": [
         "candi bentar",
         "pura",
         "tapınak",
         "kapı",
         "kule"
        ],
        "ids": [
         "bali"
        ],
        "main": "Bölünmüş kapı",
        "prompt": "Ortadan ikiye bölünmüş taş kapı hangi bölgenin işaretidir?"
       },
       {
        "key": "Saz kubbe ev",
        "label": "Yuvarlak, saz kubbe çatılı ev (honai) → Papua dağ bölgesi",
        "sub": "Honai: yuvarlak plan, tahta ya da örme duvar ve yere kadar inen kalın saz çatı. Papua yaylalarında (Baliem Vadisi, Wamena çevresi) köylerde görülür; kıyı Papua'sında ve ada genelinde yoktur.",
        "keys": [
         "honai",
         "kubbe ev",
         "saz ev",
         "papua",
         "baliem",
         "wamena",
         "yuvarlak ev"
        ],
        "ids": [
         "papua"
        ],
        "main": "Saz kubbe ev",
        "prompt": "Yuvarlak plan, saz kubbe çatılı honai evleri hangi bölgenin işaretidir?"
       },
       {
        "key": "Betang",
        "label": "Kazıklar üstünde çok uzun tek çatılı ev (betang) → Orta Kalimantan ve Dayak bölgesi",
        "sub": "Dayak halkının uzun evi: kazıklar üstünde yükseltilmiş, onlarca metre uzun, tek çatı altında birçok aile. Fotoğraflar Orta Kalimantan'dan; Batı Kalimantan'da da betang vardır.",
        "keys": [
         "betang",
         "dayak",
         "uzun ev",
         "longhouse",
         "kalimantan",
         "borneo"
        ],
        "ids": [
         "kalimantan-tengah",
         "kalimantan-barat"
        ],
        "main": "Betang",
        "prompt": "Kazıklar üstünde çok uzun tek çatılı Dayak evi (betang) hangi bölgelerde görülür?"
       },
       {
        "key": "Banjar evi",
        "label": "Dik, yükselen orta çatılı ahşap ev (bubungan tinggi) → Güney Kalimantan",
        "sub": "Banjar halkının geleneksel evi: ahşap, kazıklar üstünde, ortada yukarı yükselen sivri çatı bölümü. Güney Kalimantan'da Martapura ve Hulu Sungai çevresi.",
        "keys": [
         "banjar",
         "bubungan tinggi",
         "banjarmasin",
         "martapura",
         "kalsel"
        ],
        "ids": [
         "kalimantan-selatan"
        ],
        "main": "Banjar evi",
        "prompt": "Ortasında yükselen sivri çatılı Banjar evi hangi bölgenin işaretidir?"
       },
       {
        "key": "Bugis evi",
        "label": "Kazıklar üstünde yükseltilmiş, katlı alınlıklı ahşap ev → Güney Sulawesi kıyısı",
        "sub": "Bugis-Makassar evi (rumah panggung): ahşap, kazıklar üstünde, ön cephede katlı üçgen alınlık. Güney Sulawesi'de Bulukumba, Bone, Makassar çevresinde.",
        "keys": [
         "bugis",
         "bugis-makassar",
         "rumah panggung",
         "panggung",
         "bulukumba",
         "makassar",
         "bone"
        ],
        "ids": [
         "sulawesi-selatan"
        ],
        "main": "Bugis evi",
        "prompt": "Kazıklar üstünde yükseltilmiş, katlı alınlıklı Bugis evi hangi bölgenin işaretidir?"
       },
       {
        "key": "Yağ palmiyesi",
        "label": "Yol boyunca uzayan yağ palmiyesi plantasyonları → Sumatra ve Kalimantan",
        "sub": "Sıralı yağ palmiyeleri (kelapa sawit) Endonezya'nın en yaygın tarım görüntülerinden biridir; Sumatra (Riau, Jambi, Sumatra Selatan, Kuzey Sumatra) ve Kalimantan'da kilometrelerce sürer. Java'da ve doğuda seyrektir.",
        "keys": [
         "sawit",
         "yağ palmiyesi",
         "palmiye",
         "plantasyon",
         "palm oil",
         "kelapa sawit"
        ],
        "ids": [
         "riau",
         "jambi",
         "sumatera-selatan",
         "sumatera-utara",
         "kalimantan-tengah",
         "kalimantan-barat",
         "kalimantan-timur"
        ],
        "main": "Yağ palmiyesi",
        "prompt": "Kilometrelerce süren yağ palmiyesi plantasyonları en çok hangi bölgelerde görülür?"
       },
       {
        "key": "Kurak savan",
        "label": "Kuru otlak ve seyrek ağaçlı savan → Nusa Tenggara (Sumbawa, Sumba, Timor)",
        "sub": "Doğuya gittikçe yağış azalır: yeşil orman yerine otlak, dağınık ağaç ve sığır sürüleri görülür. Fotoğraflar Dompu (Sumbawa); Sumba ve Timor'da da benzer savan vardır. Sumatra ve Kalimantan'ın bitişik yağmur ormanından belirgin biçimde ayrılır.",
        "keys": [
         "savan",
         "savana",
         "otlak",
         "kurak",
         "sumbawa",
         "dompu",
         "nusa tenggara",
         "sumba",
         "timor"
        ],
        "ids": [
         "nusa-tenggara-barat",
         "nusa-tenggara-timur"
        ],
        "main": "Kurak savan",
        "prompt": "Kuru otlak ve seyrek ağaçlı savan görüntüsü hangi bölgenin işaretidir?"
       },
       {
        "key": "Pirinç terası",
        "label": "Basamaklı su dolu pirinç terasları → Bali (ve Java dağlık kesimleri)",
        "sub": "Yamaca basamak basamak oyulmuş, su dolu çeltik tarlaları. Fotoğraf Ubud çevresinden (Bali); Java'nın dağlık kesimlerinde de teras görülür, ama Bali'de hindistan cevizi palmiyeleriyle birlikte tipiktir.",
        "keys": [
         "teras",
         "pirinç",
         "sawah",
         "tegalalang",
         "ubud",
         "ceviz palmiyesi"
        ],
        "ids": [
         "bali"
        ],
        "main": "Pirinç terası",
        "prompt": "Basamaklı su dolu pirinç terasları hangi bölgenin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce doğaya bak",
       "body": "Kilometrelerce yağ palmiyesi: Sumatra ya da Kalimantan. Basamaklı su dolu teras: Bali (Java dağlarında da olur). Kuru otlak ve seyrek ağaç: Nusa Tenggara. Yoğun yağmur ormanı ve nehir kıyısı yerleşimi: Kalimantan, Papua kıyısı."
      },
      {
       "title": "Sonra yapıya bak",
       "body": "Boynuz çatı: Batı Sumatra. Eyer çatı: Kuzey Sumatra. Tekne çatı: Toraja. Katlı alınlıklı kazık ev: Bugis, Güney Sulawesi kıyısı. Çok uzun tek çatılı kazık ev: Dayak betang (Kalimantan). Ortada yükselen dik çatı: Banjar. Yuvarlak saz kubbe: Papua dağ bölgesi. Bölünmüş taş kapı: Bali."
      },
      {
       "title": "Kalimantan ve Sulawesi evlerini ayır",
       "body": "İkisi de kazıklar üstünde ahşap evdir. Çok uzun tek çatı ve Dayak süsleri: Kalimantan. Katlı üçgen alınlıklı ev: Bugis. Ortada yükselen sivri çatı: Banjar (Güney Kalimantan)."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Üç çatı, üç farklı bölge",
       "ids": [
        "sumatera-barat",
        "sumatera-utara",
        "sulawesi-selatan"
       ],
       "body": "Üçü de yukarı kalkan çatıdır ama biçimleri farklıdır; fotoğraflara bakıp ayırt et.",
       "traps": [
        [
         "Birkaç ayrı sivri boynuz",
         "Batı Sumatra (gonjong)"
        ],
        [
         "Ortası çökük tek dev eyer çatı",
         "Kuzey Sumatra (Toba Batak)"
        ],
        [
         "Tek parça tekne gibi çatı",
         "Toraja, Güney Sulawesi (tongkonan)"
        ]
       ]
      },
      {
       "title": "Kazık üstünde ahşap ev: Kalimantan mı Sulawesi mi?",
       "ids": [
        "kalimantan-tengah",
        "kalimantan-selatan",
        "sulawesi-selatan"
       ],
       "body": "Üçü de kazıklar üstünde yükseltilmiş ahşap evdir. Çatı biçimine bak.",
       "traps": [
        [
         "Çok uzun, tek çatılı ev",
         "Dayak betang: Orta Kalimantan"
        ],
        [
         "Ortada yükselen dik çatı bölümü",
         "Banjar evi: Güney Kalimantan"
        ],
        [
         "Ön cephede katlı üçgen alınlık",
         "Bugis evi: Güney Sulawesi"
        ]
       ]
      },
      {
       "title": "Palmiye mi, savan mı?",
       "ids": [
        "riau",
        "jambi",
        "kalimantan-tengah",
        "nusa-tenggara-barat",
        "nusa-tenggara-timur"
       ],
       "body": "Batıdaki ve Kalimantan'daki yeşil, nemli plantasyon ile doğudaki kuru otlak karıştırılmaz: yağmur doğuya doğru azalır.",
       "traps": [
        [
         "Sıra sıra yağ palmiyesi",
         "Sumatra ya da Kalimantan"
        ],
        [
         "Kuru otlak, seyrek ağaç, sığır",
         "Nusa Tenggara (Sumbawa, Sumba, Timor)"
        ]
       ]
      }
     ],
     "visualsTitle": "Nasıl görünür? ",
     "visuals": [
      {
       "id": "v-gadang",
       "title": "Batı Sumatra: boynuz çatılı ev",
       "badge": "Gonjong",
       "set": "id-gadang",
       "ids": [
        "sumatera-barat"
       ],
       "sub": "Rumah gadang: çatı uçları boynuz gibi yukarı sivrilir. Padang'da kamu binalarında da görülür.",
       "tags": [
        "gonjong"
       ]
      },
      {
       "id": "v-bolon",
       "title": "Kuzey Sumatra: Toba Batak evi",
       "badge": "Bolon",
       "set": "id-bolon",
       "ids": [
        "sumatera-utara"
       ],
       "sub": "Rumah bolon: kazıklar üzerinde, eyer gibi çökük dev çatı.",
       "tags": [
        "rumah bolon"
       ]
      },
      {
       "id": "v-tongkonan",
       "title": "Toraja: tekne çatılı ev",
       "badge": "Tongkonan",
       "set": "id-tongkonan",
       "ids": [
        "sulawesi-selatan"
       ],
       "sub": "Tongkonan: iki ucu yukarı kalkık, tekne biçimli çatı.",
       "tags": [
        "tongkonan"
       ]
      },
      {
       "id": "v-pura",
       "title": "Bali: bölünmüş tapınak kapısı",
       "badge": "Pura",
       "set": "id-pura",
       "ids": [
        "bali"
       ],
       "sub": "Candi bentar: ortadan ikiye ayrılmış kule çifti, Bali Hindu tapınaklarının girişi.",
       "tags": [
        "candi bentar"
       ]
      },
      {
       "id": "v-honai",
       "title": "Papua dağ köyü: honai",
       "badge": "Honai",
       "set": "id-honai",
       "ids": [
        "papua"
       ],
       "sub": "Yuvarlak plan, kalın saz kubbe çatı. Fotoğraflar Papua yaylalarından (Baliem Vadisi ve Yali bölgesi).",
       "tags": [
        "honai",
        "Papua"
       ],
       "quiz": false
      },
      {
       "id": "v-betang",
       "title": "Orta Kalimantan: Dayak betang evi",
       "badge": "Betang",
       "set": "id-betang",
       "ids": [
        "kalimantan-tengah",
        "kalimantan-barat"
       ],
       "sub": "Kazıklar üstünde, tek çatı altında çok uzun ahşap ev. Her iki fotoğraf Orta Kalimantan'dan.",
       "tags": [
        "betang",
        "Dayak"
       ],
       "quiz": false
      },
      {
       "id": "v-banjar",
       "title": "Güney Kalimantan: Banjar evi",
       "badge": "Banjar",
       "set": "id-banjar",
       "ids": [
        "kalimantan-selatan"
       ],
       "sub": "Ortasında yükselen dik çatı bölümü olan ahşap ev (bubungan tinggi).",
       "tags": [
        "Banjar",
        "bubungan tinggi"
       ],
       "quiz": false
      },
      {
       "id": "v-bugis",
       "title": "Güney Sulawesi: Bugis evi",
       "badge": "Bugis",
       "set": "id-bugis",
       "ids": [
        "sulawesi-selatan"
       ],
       "sub": "Kazıklar üstünde yükseltilmiş ahşap ev; ön cephede katlı üçgen alınlık.",
       "tags": [
        "Bugis",
        "rumah panggung"
       ],
       "quiz": false
      },
      {
       "id": "v-sawit",
       "title": "Sumatra: yağ palmiyesi plantasyonu",
       "badge": "Sawit",
       "set": "id-sawit",
       "ids": [
        "riau",
        "jambi",
        "sumatera-selatan",
        "sumatera-utara",
        "kalimantan-tengah",
        "kalimantan-barat",
        "kalimantan-timur"
       ],
       "sub": "Yol kenarlarında kilometrelerce palmiye. Fotoğraflar Güney Sumatra'dan; aynı görüntü Kalimantan'da da vardır.",
       "tags": [
        "sawit",
        "palmiye"
       ],
       "quiz": false
      },
      {
       "id": "v-savan",
       "title": "Sumbawa: kuru savan",
       "badge": "Savan",
       "set": "id-savan",
       "ids": [
        "nusa-tenggara-barat",
        "nusa-tenggara-timur"
       ],
       "sub": "Otlak, seyrek ağaç, sığır ve uzakta volkan. Fotoğraflar Dompu'dan (Sumbawa); Nusa Tenggara'nın kurak adalarının tipik görünümü.",
       "tags": [
        "savan",
        "Nusa Tenggara"
       ],
       "quiz": false
      },
      {
       "id": "v-teras",
       "title": "Bali: pirinç terasları",
       "badge": "Teras",
       "set": "id-teras",
       "ids": [
        "bali"
       ],
       "sub": "Su dolu basamaklı çeltik tarlaları, hindistan cevizi palmiyeleri. Fotoğraf Tegalalang, Ubud.",
       "tags": [
        "teras",
        "Bali"
       ],
       "quiz": false
      }
     ],
     "practice": "visual"
    }
   ]
   });
})(typeof window !== 'undefined' ? window : globalThis);

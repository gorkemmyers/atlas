/* packs/russia.js — Rusya: federal yollar ve cumhuriyet harfleri
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "russia",
   "name": "Rusya",
   "code": "RU",
   "area": "Avrupa ve Avrasya",
   "tone": "indigo",
   "geoVar": "RU_GEO",
   "themeId": "ru",
   "themeCfg": {
    "aria": "Rusya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.",
    "fit": "Tüm Rusya’yı göster",
    "wrap360": true,
    "grid": {
     "lat": [
      40,
      80,
      10
     ],
     "lon": [
      20,
      190,
      20
     ],
     "txt": [
      44,
      76,
      8
     ],
     "refLon": 90,
     "refLat": 60
    },
    "excludeWorld": [
     "Russia"
    ],
    "bg": [
     [
      24,
      64.5,
      "FİNLANDİYA",
      "c"
     ],
     [
      31.5,
      49,
      "UKRAYNA",
      "c"
     ],
     [
      28,
      53.8,
      "BELARUS",
      "c"
     ],
     [
      67,
      48,
      "KAZAKİSTAN",
      "c"
     ],
     [
      103,
      46.5,
      "MOĞOLİSTAN",
      "c"
     ],
     [
      122,
      45,
      "ÇİN",
      "c"
     ],
     [
      19,
      55.8,
      "Baltık Denizi",
      "s"
     ],
     [
      35,
      43.2,
      "Karadeniz",
      "s"
     ],
     [
      50.5,
      42.5,
      "Hazar Denizi",
      "s"
     ],
     [
      148,
      55,
      "Ohotsk Denizi",
      "s"
     ],
     [
      168,
      56,
      "Bering Denizi",
      "s"
     ]
    ]
   },
   "srsPrefix": "ru",
   "simKmScale": 1100,
   "maxFitZoom": 8,
   "labelSize": 8.6,
   "unitLabel": "bölge",
   "unitLabelCap": "Bölge",
   "codeLabel": "Kod",
   "line": "83 bölge · federal yol numaraları ve cumhuriyetlerdeki ek harfler",
   "blurb": "İki şey işe yarar: büyük yolların numarası (М-7, Р-254…) ve cumhuriyetlerdeki Rusça'da olmayan harfler (Ә, Җ, Ӏ…). Telefon ve posta kodları pratikte işe yaramaz, o yüzden yok.",
   "overviewLead": "83 federal bölgeyi haritada öğren; her kartta o bölgeden geçen federal yollar ve yerel dil harfleri yazar.",
   "regions": [
    {
     "id": "cfo",
     "tr": "Merkez",
     "key": "MRK",
     "color": 0,
     "cue": "Moskova ve çevresi. Moskova'dan çıkan М yollarının hepsi buradan başlar."
    },
    {
     "id": "nwfo",
     "tr": "Kuzeybatı",
     "key": "KB",
     "color": 4,
     "cue": "St. Petersburg, Karelya ve Kuzey. Р-21 «Кола» Murmansk'a, А-180 ve А-181 Baltık/Finlandiya sınırlarına gider."
    },
    {
     "id": "sfo",
     "tr": "Güney ve Kuzey Kafkasya",
     "key": "GNY",
     "color": 5,
     "cue": "Kuzey Kafkasya cumhuriyetlerinde Ӏ harfi görülür; Р-217 «Кавказ» yolu Hazar kıyısına uzanır."
    },
    {
     "id": "pfo",
     "tr": "İdil (Volga) boyu",
     "key": "VLG",
     "color": 2,
     "cue": "Tatarstan, Başkurdistan, Çuvaşistan gibi cumhuriyetlerde iki dilli tabelalar. М-5, М-7 ve М-12 buradan geçer."
    },
    {
     "id": "ufo",
     "tr": "Ural ve Batı Sibirya",
     "key": "URL",
     "color": 3,
     "cue": "М-5 Çelyabinsk'te biter; Р-254 «Иртыш» buradan doğuya devam eder."
    },
    {
     "id": "sib",
     "tr": "Sibirya",
     "key": "SIB",
     "color": 7,
     "cue": "Trans-Sibirya yol hattı: Р-254 → Р-255 «Сибирь» → Р-258 «Байкал»."
    },
    {
     "id": "dfo",
     "tr": "Uzak Doğu",
     "key": "UZD",
     "color": 6,
     "cue": "Р-297 «Амур», А-360 «Лена», Р-504 «Колыма», А-370 «Уссури». Sağdan direksiyonlu Japon araçları çok yaygındır."
    }
   ],
   "units": [
    {
     "id": "ru-mow",
     "name": "Moskova Şehri",
     "short": "Moskova",
     "local": "Москва",
     "cap": "Moskova",
     "reg": "cfo",
     "cue": "Federal yollar: М-1, М-2, М-3, М-4, М-5, М-7, М-8, М-9, М-10, М-11, М-12."
    },
    {
     "id": "ru-mos",
     "name": "Moskova Oblastı",
     "short": "Moskova Obl.",
     "local": "Московская обл.",
     "cap": "Moskova / Krasnogorsk",
     "reg": "cfo",
     "cue": "Federal yollar: М-1, М-2, М-3, М-4, М-5, М-7, М-8, М-9, М-10, М-11, М-12, Р-22."
    },
    {
     "id": "ru-bel",
     "name": "Belgorod",
     "short": "Belgorod",
     "local": "Белгородская обл.",
     "cap": "Belgorod",
     "reg": "cfo",
     "cue": "Federal yollar: М-2."
    },
    {
     "id": "ru-bry",
     "name": "Bryansk",
     "short": "Bryansk",
     "local": "Брянская обл.",
     "cap": "Bryansk",
     "reg": "cfo",
     "cue": "Federal yollar: М-3."
    },
    {
     "id": "ru-vla",
     "name": "Vladimir",
     "short": "Vladimir",
     "local": "Владимирская обл.",
     "cap": "Vladimir",
     "reg": "cfo",
     "cue": "Federal yollar: М-7, М-8, М-12."
    },
    {
     "id": "ru-vor",
     "name": "Voronezh",
     "short": "Voronezh",
     "local": "Воронежская обл.",
     "cap": "Voronezh",
     "reg": "cfo",
     "cue": "Federal yollar: М-4, Р-22."
    },
    {
     "id": "ru-iva",
     "name": "Ivanovo",
     "short": "Ivanovo",
     "local": "Ивановская обл.",
     "cap": "Ivanovo",
     "reg": "cfo",
     "cue": ""
    },
    {
     "id": "ru-klu",
     "name": "Kaluga",
     "short": "Kaluga",
     "local": "Калужская обл.",
     "cap": "Kaluga",
     "reg": "cfo",
     "cue": "Federal yollar: М-3."
    },
    {
     "id": "ru-kos",
     "name": "Kostroma",
     "short": "Kostroma",
     "local": "Костромская обл.",
     "cap": "Kostroma",
     "reg": "cfo",
     "cue": ""
    },
    {
     "id": "ru-krs",
     "name": "Kursk",
     "short": "Kursk",
     "local": "Курская обл.",
     "cap": "Kursk",
     "reg": "cfo",
     "cue": "Federal yollar: М-2."
    },
    {
     "id": "ru-lip",
     "name": "Lipetsk",
     "short": "Lipetsk",
     "local": "Липецкая обл.",
     "cap": "Lipetsk",
     "reg": "cfo",
     "cue": "Federal yollar: М-4."
    },
    {
     "id": "ru-orl",
     "name": "Oryol (Orel)",
     "short": "Oryol",
     "local": "Орловская обл.",
     "cap": "Oryol",
     "reg": "cfo",
     "cue": "Federal yollar: М-2."
    },
    {
     "id": "ru-rya",
     "name": "Ryazan",
     "short": "Ryazan",
     "local": "Рязанская обл.",
     "cap": "Ryazan",
     "reg": "cfo",
     "cue": "Federal yollar: М-5, Р-22."
    },
    {
     "id": "ru-smo",
     "name": "Smolensk",
     "short": "Smolensk",
     "local": "Смоленская обл.",
     "cap": "Smolensk",
     "reg": "cfo",
     "cue": "Federal yollar: М-1."
    },
    {
     "id": "ru-tam",
     "name": "Tambov",
     "short": "Tambov",
     "local": "Тамбовская обл.",
     "cap": "Tambov",
     "reg": "cfo",
     "cue": "Federal yollar: Р-22."
    },
    {
     "id": "ru-tve",
     "name": "Tver",
     "short": "Tver",
     "local": "Тверская обл.",
     "cap": "Tver",
     "reg": "cfo",
     "cue": "Federal yollar: М-9, М-10, М-11."
    },
    {
     "id": "ru-tul",
     "name": "Tula",
     "short": "Tula",
     "local": "Тульская обл.",
     "cap": "Tula",
     "reg": "cfo",
     "cue": "Federal yollar: М-2, М-4, Р-22."
    },
    {
     "id": "ru-yar",
     "name": "Yaroslavl",
     "short": "Yaroslavl",
     "local": "Ярославская обл.",
     "cap": "Yaroslavl",
     "reg": "cfo",
     "cue": "Federal yollar: М-8."
    },
    {
     "id": "ru-spe",
     "name": "St. Petersburg",
     "short": "SPb",
     "local": "Санкт-Петербург",
     "cap": "St. Petersburg",
     "reg": "nwfo",
     "cue": "Federal yollar: М-10, М-11, Р-21, Р-23, А-180, А-181."
    },
    {
     "id": "ru-len",
     "name": "Leningrad Oblastı",
     "short": "Leningrad Obl.",
     "local": "Ленинградская обл.",
     "cap": "Gatchina / SPb",
     "reg": "nwfo",
     "cue": "Federal yollar: М-10, М-11, Р-21, Р-23, А-180, А-181."
    },
    {
     "id": "ru-ark",
     "name": "Arkhangelsk",
     "short": "Arkhangelsk",
     "local": "Архангельская обл.",
     "cap": "Arkhangelsk",
     "reg": "nwfo",
     "cue": "Federal yollar: М-8."
    },
    {
     "id": "ru-vlg",
     "name": "Vologda",
     "short": "Vologda",
     "local": "Вологодская обл.",
     "cap": "Vologda",
     "reg": "nwfo",
     "cue": "Federal yollar: М-8."
    },
    {
     "id": "ru-kgd",
     "name": "Kaliningrad",
     "short": "Kaliningrad",
     "local": "Калининградская обл.",
     "cap": "Kaliningrad",
     "reg": "nwfo",
     "cue": ""
    },
    {
     "id": "ru-kr",
     "name": "Karelya Cumhuriyeti",
     "short": "Karelya",
     "local": "Респ. Карелия",
     "cap": "Petrozavodsk",
     "reg": "nwfo",
     "cue": "Federal yollar: Р-21."
    },
    {
     "id": "ru-ko",
     "name": "Komi Cumhuriyeti",
     "short": "Komi",
     "local": "Респ. Коми",
     "cap": "Syktyvkar",
     "reg": "nwfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Komi dili): Ӧ."
    },
    {
     "id": "ru-mur",
     "name": "Murmansk",
     "short": "Murmansk",
     "local": "Мурманская обл.",
     "cap": "Murmansk",
     "reg": "nwfo",
     "cue": "Federal yollar: Р-21."
    },
    {
     "id": "ru-nen",
     "name": "Nenets Özerk Okrugu",
     "short": "Nenets",
     "local": "Ненецкий АО",
     "cap": "Naryan-Mar",
     "reg": "nwfo",
     "cue": ""
    },
    {
     "id": "ru-ngr",
     "name": "Novgorod",
     "short": "Novgorod",
     "local": "Новгородская обл.",
     "cap": "Veliky Novgorod",
     "reg": "nwfo",
     "cue": "Federal yollar: М-10, М-11."
    },
    {
     "id": "ru-psk",
     "name": "Pskov",
     "short": "Pskov",
     "local": "Псковская обл.",
     "cap": "Pskov",
     "reg": "nwfo",
     "cue": "Federal yollar: М-9, Р-23."
    },
    {
     "id": "ru-ad",
     "name": "Adıge Cumhuriyeti",
     "short": "Adıge",
     "local": "Респ. Адыгея",
     "cap": "Maykop",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Adıgece): Ӏ. Federal yollar: М-4."
    },
    {
     "id": "ru-ast",
     "name": "Astrahan",
     "short": "Astrahan",
     "local": "Астраханская обл.",
     "cap": "Astrahan",
     "reg": "sfo",
     "cue": "Federal yollar: Р-22."
    },
    {
     "id": "ru-vgg",
     "name": "Volgograd",
     "short": "Volgograd",
     "local": "Волгоградская обл.",
     "cap": "Volgograd",
     "reg": "sfo",
     "cue": "Federal yollar: Р-22."
    },
    {
     "id": "ru-kl",
     "name": "Kalmıkya Cumhuriyeti",
     "short": "Kalmıkya",
     "local": "Респ. Калмыкия",
     "cap": "Elista",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Kalmukça): Ә Ө Ү Җ Ң Һ. Federal yollar: Р-22."
    },
    {
     "id": "ru-kda",
     "name": "Krasnodar Krayı",
     "short": "Krasnodar",
     "local": "Краснодарский край",
     "cap": "Krasnodar",
     "reg": "sfo",
     "cue": "Federal yollar: М-4, Р-217."
    },
    {
     "id": "ru-ros",
     "name": "Rostov",
     "short": "Rostov",
     "local": "Ростовская обл.",
     "cap": "Rostov-na-Donu",
     "reg": "sfo",
     "cue": "Federal yollar: М-4."
    },
    {
     "id": "ru-da",
     "name": "Dağıstan",
     "short": "Dağıstan",
     "local": "Респ. Дагестан",
     "cap": "Mahaçkale",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Dağıstan dilleri (Avarca, Lezgice, Darginçe vb.)): Ӏ. Federal yollar: Р-217."
    },
    {
     "id": "ru-in",
     "name": "İnguşetya",
     "short": "İnguşetya",
     "local": "Респ. Ингушетия",
     "cap": "Magas",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (İnguşça): Ӏ. Federal yollar: Р-217."
    },
    {
     "id": "ru-kb",
     "name": "Kabardino-Balkarya",
     "short": "KBR",
     "local": "Кабардино-Балкария",
     "cap": "Nalçik",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Kabardeyce): Ӏ. Federal yollar: Р-217."
    },
    {
     "id": "ru-kc",
     "name": "Karaçay-Çerkesya",
     "short": "KÇR",
     "local": "Карачаево-Черкесия",
     "cap": "Çerkessk",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Abazaca / Çerkesçe): Ӏ."
    },
    {
     "id": "ru-se",
     "name": "Kuzey Osetya-Alanya",
     "short": "K. Osetya",
     "local": "Северная Осетия",
     "cap": "Vladikavkaz",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Osetçe): Ӕ. Federal yollar: Р-217."
    },
    {
     "id": "ru-sta",
     "name": "Stavropol Krayı",
     "short": "Stavropol",
     "local": "Ставропольский край",
     "cap": "Stavropol",
     "reg": "sfo",
     "cue": "Federal yollar: Р-217."
    },
    {
     "id": "ru-ce",
     "name": "Çeçenya",
     "short": "Çeçenya",
     "local": "Чеченская Респ.",
     "cap": "Grozni",
     "reg": "sfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Çeçence): Ӏ. Federal yollar: Р-217."
    },
    {
     "id": "ru-ba",
     "name": "Başkurdistan",
     "short": "Başkurdistan",
     "local": "Башкортостан",
     "cap": "Ufa",
     "reg": "pfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Başkurtça): Ә Ө Ү Ғ Ҡ Ҙ Ҫ Ң Һ. Federal yollar: М-5, М-12."
    },
    {
     "id": "ru-kir",
     "name": "Kirov",
     "short": "Kirov",
     "local": "Кировская обл.",
     "cap": "Kirov",
     "reg": "pfo",
     "cue": ""
    },
    {
     "id": "ru-me",
     "name": "Mari El",
     "short": "Mari El",
     "local": "Респ. Марий Эл",
     "cap": "Yoşkar-Ola",
     "reg": "pfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Mari dili): Ӧ Ӱ Ҥ."
    },
    {
     "id": "ru-mo",
     "name": "Mordovya",
     "short": "Mordovya",
     "local": "Респ. Мордовия",
     "cap": "Saransk",
     "reg": "pfo",
     "cue": "Federal yollar: М-5."
    },
    {
     "id": "ru-niz",
     "name": "Nizhny Novgorod",
     "short": "Nizhny Nov.",
     "local": "Нижегородская обл.",
     "cap": "Nizhny Novgorod",
     "reg": "pfo",
     "cue": "Federal yollar: М-7, М-12."
    },
    {
     "id": "ru-ore",
     "name": "Orenburg",
     "short": "Orenburg",
     "local": "Оренбургская обл.",
     "cap": "Orenburg",
     "reg": "pfo",
     "cue": "Federal yollar: М-5."
    },
    {
     "id": "ru-pnz",
     "name": "Penza",
     "short": "Penza",
     "local": "Пензенская обл.",
     "cap": "Penza",
     "reg": "pfo",
     "cue": "Federal yollar: М-5."
    },
    {
     "id": "ru-per",
     "name": "Perm Krayı",
     "short": "Perm",
     "local": "Пермский край",
     "cap": "Perm",
     "reg": "pfo",
     "cue": "Federal yollar: М-12."
    },
    {
     "id": "ru-sam",
     "name": "Samara",
     "short": "Samara",
     "local": "Самарская обл.",
     "cap": "Samara",
     "reg": "pfo",
     "cue": "Federal yollar: М-5."
    },
    {
     "id": "ru-sar",
     "name": "Saratov",
     "short": "Saratov",
     "local": "Саратовская обл.",
     "cap": "Saratov",
     "reg": "pfo",
     "cue": ""
    },
    {
     "id": "ru-ta",
     "name": "Tatarstan Cumhuriyeti",
     "short": "Tatarstan",
     "local": "Респ. Татарстан",
     "cap": "Kazan",
     "reg": "pfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Tatarca): Ә Ө Ү Җ Ң Һ. Federal yollar: М-5, М-7, М-12."
    },
    {
     "id": "ru-ud",
     "name": "Udmurtia Cumhuriyeti",
     "short": "Udmurtia",
     "local": "Удмуртия",
     "cap": "İjevsk",
     "reg": "pfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Udmurtça): Ӝ Ӟ Ӥ Ӧ Ӵ."
    },
    {
     "id": "ru-uly",
     "name": "Ulyanovsk",
     "short": "Ulyanovsk",
     "local": "Ульяновская обл.",
     "cap": "Ulyanovsk",
     "reg": "pfo",
     "cue": "Federal yollar: М-5."
    },
    {
     "id": "ru-cu",
     "name": "Çuvaşistan Cumhuriyeti",
     "short": "Çuvaşistan",
     "local": "Чувашия",
     "cap": "Çeboksarı",
     "reg": "pfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Çuvaşça): Ӑ Ӗ Ӳ Ҫ. Federal yollar: М-7, М-12."
    },
    {
     "id": "ru-kgn",
     "name": "Kurgan",
     "short": "Kurgan",
     "local": "Курганская обл.",
     "cap": "Kurgan",
     "reg": "ufo",
     "cue": "Federal yollar: Р-254."
    },
    {
     "id": "ru-sve",
     "name": "Sverdlovsk",
     "short": "Sverdlovsk",
     "local": "Свердловская обл.",
     "cap": "Yekaterinburg",
     "reg": "ufo",
     "cue": "Federal yollar: М-12."
    },
    {
     "id": "ru-tyu",
     "name": "Tyumen Oblastı",
     "short": "Tyumen",
     "local": "Тюменская обл.",
     "cap": "Tyumen",
     "reg": "ufo",
     "cue": ""
    },
    {
     "id": "ru-khm",
     "name": "Hantı-Mansi Özerk Okrugu (Yugra)",
     "short": "Hantı-Mansi",
     "local": "Ханты-Мансийский АО",
     "cap": "Hantı-Mansiysk",
     "reg": "ufo",
     "cue": ""
    },
    {
     "id": "ru-che",
     "name": "Çelyabinsk",
     "short": "Çelyabinsk",
     "local": "Челябинская обл.",
     "cap": "Çelyabinsk",
     "reg": "ufo",
     "cue": "Federal yollar: М-5, Р-254."
    },
    {
     "id": "ru-yan",
     "name": "Yamalo-Nenets Özerk Okrugu",
     "short": "Yamal",
     "local": "Ямало-Ненецкий АО",
     "cap": "Salehard",
     "reg": "ufo",
     "cue": ""
    },
    {
     "id": "ru-al",
     "name": "Altay Cumhuriyeti",
     "short": "Altay Cum.",
     "local": "Респ. Алтай",
     "cap": "Gorno-Altaysk",
     "reg": "sib",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Altayca): Ҥ. Federal yollar: Р-256."
    },
    {
     "id": "ru-alt",
     "name": "Altay Krayı",
     "short": "Altay Krayı",
     "local": "Алтайский край",
     "cap": "Barnaul",
     "reg": "sib",
     "cue": "Federal yollar: Р-256."
    },
    {
     "id": "ru-irk",
     "name": "İrkutsk",
     "short": "İrkutsk",
     "local": "Иркутская обл.",
     "cap": "İrkutsk",
     "reg": "sib",
     "cue": "Federal yollar: Р-255, Р-258."
    },
    {
     "id": "ru-kem",
     "name": "Kemerovo (Kuzbass)",
     "short": "Kemerovo",
     "local": "Кемеровская обл.",
     "cap": "Kemerovo",
     "reg": "sib",
     "cue": "Federal yollar: Р-255."
    },
    {
     "id": "ru-kya",
     "name": "Krasnoyarsk Krayı",
     "short": "Krasnoyarsk",
     "local": "Красноярский край",
     "cap": "Krasnoyarsk",
     "reg": "sib",
     "cue": "Federal yollar: Р-255, Р-257."
    },
    {
     "id": "ru-nvs",
     "name": "Novosibirsk",
     "short": "Novosibirsk",
     "local": "Новосибирская обл.",
     "cap": "Novosibirsk",
     "reg": "sib",
     "cue": "Federal yollar: Р-254, Р-255, Р-256."
    },
    {
     "id": "ru-oms",
     "name": "Omsk",
     "short": "Omsk",
     "local": "Омская обл.",
     "cap": "Omsk",
     "reg": "sib",
     "cue": "Federal yollar: Р-254."
    },
    {
     "id": "ru-tom",
     "name": "Tomsk",
     "short": "Tomsk",
     "local": "Томская обл.",
     "cap": "Tomsk",
     "reg": "sib",
     "cue": ""
    },
    {
     "id": "ru-ty",
     "name": "Tuva Cumhuriyeti",
     "short": "Tuva",
     "local": "Респ. Тыва",
     "cap": "Kızıl",
     "reg": "sib",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Tuvaca): Ң Ө Ү. Federal yollar: Р-257."
    },
    {
     "id": "ru-kk",
     "name": "Hakasya Cumhuriyeti",
     "short": "Hakasya",
     "local": "Респ. Хакасия",
     "cap": "Abakan",
     "reg": "sib",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Hakasça): Ң Ӧ. Federal yollar: Р-257."
    },
    {
     "id": "ru-amu",
     "name": "Amur Oblastı",
     "short": "Amur",
     "local": "Амурская обл.",
     "cap": "Blagoveşçensk",
     "reg": "dfo",
     "cue": "Federal yollar: Р-297, А-360."
    },
    {
     "id": "ru-bu",
     "name": "Buryatya Cumhuriyeti",
     "short": "Buryatya",
     "local": "Респ. Бурятия",
     "cap": "Ulan-Ude",
     "reg": "dfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Buryatça): Ө Ү Һ. Federal yollar: Р-258."
    },
    {
     "id": "ru-yev",
     "name": "Yahudi Özerk Oblastı",
     "short": "Yahudi ÖO",
     "local": "Еврейская АО",
     "cap": "Birobidjan",
     "reg": "dfo",
     "cue": "Federal yollar: Р-297."
    },
    {
     "id": "ru-zab",
     "name": "Zabaykalsky Krayı",
     "short": "Zabaykalsky",
     "local": "Забайкальский край",
     "cap": "Çita",
     "reg": "dfo",
     "cue": "Federal yollar: Р-258, Р-297."
    },
    {
     "id": "ru-kam",
     "name": "Kamçatka Krayı",
     "short": "Kamçatka",
     "local": "Камчатский край",
     "cap": "Petropavlovsk-K.",
     "reg": "dfo",
     "cue": ""
    },
    {
     "id": "ru-mag",
     "name": "Magadan",
     "short": "Magadan",
     "local": "Магаданская обл.",
     "cap": "Magadan",
     "reg": "dfo",
     "cue": "Federal yollar: Р-504."
    },
    {
     "id": "ru-pri",
     "name": "Primorsky Krayı",
     "short": "Primorsky",
     "local": "Приморский край",
     "cap": "Vladivostok",
     "reg": "dfo",
     "cue": "Federal yollar: А-370."
    },
    {
     "id": "ru-sa",
     "name": "Saha (Yakutya)",
     "short": "Yakutya",
     "local": "Респ. Саха (Якутия)",
     "cap": "Yakutsk",
     "reg": "dfo",
     "cue": "Tabelalarda Rusça yanında yerel dil de yazılır (Saha (Yakut) dili): Ҕ Ҥ Ө Ү Һ. Federal yollar: А-360, Р-504."
    },
    {
     "id": "ru-sak",
     "name": "Sahalin Oblastı",
     "short": "Sahalin",
     "local": "Сахалинская обл.",
     "cap": "Yuzhno-Sahalinsk",
     "reg": "dfo",
     "cue": ""
    },
    {
     "id": "ru-kha",
     "name": "Habarovsk Krayı",
     "short": "Habarovsk",
     "local": "Хабаровский край",
     "cap": "Habarovsk",
     "reg": "dfo",
     "cue": "Federal yollar: Р-297, А-370."
    },
    {
     "id": "ru-chu",
     "name": "Çukotka Özerk Okrugu",
     "short": "Çukotka",
     "local": "Чукотский АО",
     "cap": "Anadır",
     "reg": "dfo",
     "cue": ""
    }
   ],
   "topics": [
    {
     "key": "yollar",
     "navLabel": "Yollar",
     "icon": "road",
     "drillPreset": "yollar",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Federal yol numaraları",
     "lead": "Rusya'da büyük yolların tabelasında yolun numarası ve çoğu zaman adı yazar (örnek: М-7 «Волга»). Numarayı gördüğünde yolun hangi bölgelerden geçtiğini bilirsen konumu birkaç bölgeye daraltırsın. Telefon ve posta kodları Rusya'da pratikte işe yaramadığı için bu pakette yoktur.",
     "desc": "М-7, Р-254, А-360… Yol numarasından bölgeyi bul.",
     "decoder": {
      "title": "Yol numarası ya da adı",
      "placeholder": "Örn. М-7, M5, Volga, Kavkaz…",
      "hint": "Tabelada gördüğün yolu yaz (Latin M ya da Kiril М olur): geçtiği bölgeler haritada boyanır.",
      "quizPrompt": "Bu yol hangi bölgelerden geçer? (Herhangi birine dokun)",
      "noHit": "Bu numara listede yok. Önemli federal yollar burada; küçük bölgesel yollar yok.",
      "entries": [
       {
        "key": "М-1",
        "label": "Беларусь · Moskova → Smolensk → Belarus sınırı",
        "sub": "",
        "keys": [
         "M-1",
         "M1",
         "м1",
         "Беларусь",
         "беларусь"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-smo"
        ],
        "main": "М-1 «Беларусь»"
       },
       {
        "key": "М-2",
        "label": "Крым · Moskova → Tula → Oryol → Kursk → Belgorod → Ukrayna sınırı",
        "sub": "",
        "keys": [
         "M-2",
         "M2",
         "м2",
         "Крым",
         "крым"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-tul",
         "ru-orl",
         "ru-krs",
         "ru-bel"
        ],
        "main": "М-2 «Крым»"
       },
       {
        "key": "М-3",
        "label": "Украина · Moskova → Kaluga → Bryansk → Ukrayna sınırı",
        "sub": "",
        "keys": [
         "M-3",
         "M3",
         "м3",
         "Украина",
         "украина"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-klu",
         "ru-bry"
        ],
        "main": "М-3 «Украина»"
       },
       {
        "key": "М-4",
        "label": "Дон · Moskova → Tula → Lipetsk → Voronezh → Rostov → Krasnodar → Novorossiysk",
        "sub": "Güneye giden ana yol; ücretli bölümleri vardır. Krasnodar yakınında Adıge Cumhuriyeti’nden kısa bir kesit geçer.",
        "keys": [
         "M-4",
         "M4",
         "м4",
         "Дон",
         "дон"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-tul",
         "ru-lip",
         "ru-vor",
         "ru-ros",
         "ru-kda",
         "ru-ad"
        ],
        "main": "М-4 «Дон»"
       },
       {
        "key": "М-5",
        "label": "Урал · Moskova → Ryazan → Penza → Samara → Ufa → Çelyabinsk",
        "sub": "Toplam 11 bölgeden geçer (Mordovya, Ulyanovsk, Orenburg ve Tataristan’dan kısa kesitlerle). Kilometre direği Moskova’dan sayar: 1855. km Çelyabinsk.",
        "keys": [
         "M-5",
         "M5",
         "м5",
         "Урал",
         "урал"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-rya",
         "ru-mo",
         "ru-pnz",
         "ru-uly",
         "ru-sam",
         "ru-ore",
         "ru-ta",
         "ru-ba",
         "ru-che"
        ],
        "main": "М-5 «Урал»"
       },
       {
        "key": "М-7",
        "label": "Волга · Moskova → Vladimir → Nijni Novgorod → Çuvaşistan → Kazan (Tatarstan)",
        "sub": "Eskiden Ufa'ya kadar uzanırdı; Kazan–Ufa kesiti М-12 ve Р-240'a devredilmiştir.",
        "keys": [
         "M-7",
         "M7",
         "м7",
         "Волга",
         "волга"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-vla",
         "ru-niz",
         "ru-cu",
         "ru-ta"
        ],
        "main": "М-7 «Волга»"
       },
       {
        "key": "М-8",
        "label": "Холмогоры · Moskova → Yaroslavl → Vologda → Arkhangelsk",
        "sub": "Kuzeye giden ana yol.",
        "keys": [
         "M-8",
         "M8",
         "м8",
         "Холмогоры",
         "холмогоры"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-vla",
         "ru-yar",
         "ru-vlg",
         "ru-ark"
        ],
        "main": "М-8 «Холмогоры»"
       },
       {
        "key": "М-9",
        "label": "Балтия · Moskova → Volokolamsk → Tver → Velikiye Luki → Letonya sınırı",
        "sub": "Batıya, Baltık ülkelerine doğru gider.",
        "keys": [
         "M-9",
         "M9",
         "м9",
         "Балтия",
         "балтия"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-tve",
         "ru-psk"
        ],
        "main": "М-9 «Балтия»"
       },
       {
        "key": "М-10",
        "label": "Россия · Moskova → Tver → Veliky Novgorod → St. Petersburg",
        "sub": "Eskiden Finlandiya sınırına kadar uzanırdı; o kesit А-181 oldu.",
        "keys": [
         "M-10",
         "M10",
         "м10",
         "Россия",
         "россия"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-tve",
         "ru-ngr",
         "ru-len",
         "ru-spe"
        ],
        "main": "М-10 «Россия»"
       },
       {
        "key": "М-11",
        "label": "Нева · Moskova → Tver → Veliky Novgorod → St. Petersburg (ücretli otoyol)",
        "sub": "М-10 ile aynı iki şehri bağlar ama ayrı, ücretli bir otoyoldur.",
        "keys": [
         "M-11",
         "M11",
         "м11",
         "Нева",
         "нева"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-tve",
         "ru-ngr",
         "ru-len",
         "ru-spe"
        ],
        "main": "М-11 «Нева»"
       },
       {
        "key": "М-12",
        "label": "Восток · Moskova → Vladimir → Nijni Novgorod → Çuvaşistan → Kazan → Başkurdistan → Yekaterinburg",
        "sub": "Ücretli otoyol. Moskova–Kazan Aralık 2023’te, Kazan–Yekaterinburg 2025’te hizmete girdi; Yekaterinburg–Tyumen kesiti 2026 sonu için planlanıyor.",
        "keys": [
         "M-12",
         "M12",
         "м12",
         "Восток",
         "восток"
        ],
        "ids": [
         "ru-mow",
         "ru-mos",
         "ru-vla",
         "ru-niz",
         "ru-cu",
         "ru-ta",
         "ru-ba",
         "ru-per",
         "ru-sve"
        ],
        "main": "М-12 «Восток»"
       },
       {
        "key": "Р-21",
        "label": "Кола · St. Petersburg → Petrozavodsk → Murmansk → Norveç sınırı",
        "sub": "Eski adıyla М-18.",
        "keys": [
         "R-21",
         "R21",
         "р21",
         "Кола",
         "кола"
        ],
        "ids": [
         "ru-spe",
         "ru-len",
         "ru-kr",
         "ru-mur"
        ],
        "main": "Р-21 «Кола»"
       },
       {
        "key": "Р-22",
        "label": "Каспий · М-4’ten Kaşira yakınında ayrılır → Tula → Ryazan → Tambov → Voronezh → Volgograd → Astrahan",
        "sub": "Eski adıyla М-6. Kalmukya’dan kısa bir kesit geçer.",
        "keys": [
         "R-22",
         "R22",
         "р22",
         "Каспий",
         "каспий"
        ],
        "ids": [
         "ru-mos",
         "ru-tul",
         "ru-rya",
         "ru-tam",
         "ru-vor",
         "ru-vgg",
         "ru-kl",
         "ru-ast"
        ],
        "main": "Р-22 «Каспий»"
       },
       {
        "key": "Р-23",
        "label": "St. Petersburg → Pskov → Belarus sınırı",
        "sub": "Eski adıyla М-20.",
        "keys": [
         "R-23",
         "R23",
         "р23"
        ],
        "ids": [
         "ru-spe",
         "ru-len",
         "ru-psk"
        ],
        "main": "Р-23"
       },
       {
        "key": "А-180",
        "label": "Нарва · St. Petersburg → Estonya sınırı",
        "sub": "",
        "keys": [
         "A-180",
         "A180",
         "а180",
         "Нарва",
         "нарва"
        ],
        "ids": [
         "ru-spe",
         "ru-len"
        ],
        "main": "А-180 «Нарва»"
       },
       {
        "key": "А-181",
        "label": "Скандинавия · St. Petersburg → Vyborg → Finlandiya sınırı",
        "sub": "Eski М-10'un son kesiti.",
        "keys": [
         "A-181",
         "A181",
         "а181",
         "Скандинавия",
         "скандинавия"
        ],
        "ids": [
         "ru-spe",
         "ru-len"
        ],
        "main": "А-181 «Скандинавия»"
       },
       {
        "key": "Р-217",
        "label": "Кавказ · М-4'ten ayrılır → Stavropol → Nalçik → Vladikavkaz → Grozni → Mahaçkale → Azerbaycan sınırı",
        "sub": "Eski adıyla М-29. Kuzey Kafkasya'dan geçen ana yol.",
        "keys": [
         "R-217",
         "R217",
         "р217",
         "Кавказ",
         "кавказ"
        ],
        "ids": [
         "ru-kda",
         "ru-sta",
         "ru-kb",
         "ru-se",
         "ru-in",
         "ru-ce",
         "ru-da"
        ],
        "main": "Р-217 «Кавказ»"
       },
       {
        "key": "Р-254",
        "label": "Иртыш · Çelyabinsk → Kurgan → Omsk → Novosibirsk",
        "sub": "М-5’in doğudaki devamı. Kurgan ile Omsk arasında yol Kazakistan topraklarından (Petropavl yakını) geçer.",
        "keys": [
         "R-254",
         "R254",
         "р254",
         "Иртыш",
         "иртыш"
        ],
        "ids": [
         "ru-che",
         "ru-kgn",
         "ru-oms",
         "ru-nvs"
        ],
        "main": "Р-254 «Иртыш»"
       },
       {
        "key": "Р-255",
        "label": "Сибирь · Novosibirsk → Kemerovo → Krasnoyarsk → İrkutsk",
        "sub": "",
        "keys": [
         "R-255",
         "R255",
         "р255",
         "Сибирь",
         "сибирь"
        ],
        "ids": [
         "ru-nvs",
         "ru-kem",
         "ru-kya",
         "ru-irk"
        ],
        "main": "Р-255 «Сибирь»"
       },
       {
        "key": "Р-256",
        "label": "Чуйский тракт · Novosibirsk → Barnaul → Biysk → Moğolistan sınırı",
        "sub": "Altay Dağları'na giden yol.",
        "keys": [
         "R-256",
         "R256",
         "р256",
         "Чуйский тракт",
         "чуйский тракт"
        ],
        "ids": [
         "ru-nvs",
         "ru-alt",
         "ru-al"
        ],
        "main": "Р-256 «Чуйский тракт»"
       },
       {
        "key": "Р-257",
        "label": "Енисей · Krasnoyarsk → Abakan → Kızıl → Moğolistan sınırı",
        "sub": "Yenisey boyunca güneye iner.",
        "keys": [
         "R-257",
         "R257",
         "р257",
         "Енисей",
         "енисей"
        ],
        "ids": [
         "ru-kya",
         "ru-kk",
         "ru-ty"
        ],
        "main": "Р-257 «Енисей»"
       },
       {
        "key": "Р-258",
        "label": "Байкал · İrkutsk → Ulan-Ude → Çita",
        "sub": "Baykal Gölü'nün güneyinden geçer.",
        "keys": [
         "R-258",
         "R258",
         "р258",
         "Байкал",
         "байкал"
        ],
        "ids": [
         "ru-irk",
         "ru-bu",
         "ru-zab"
        ],
        "main": "Р-258 «Байкал»"
       },
       {
        "key": "Р-297",
        "label": "Амур · Çita → Blagoveşçensk yönü → Birobidjan → Habarovsk",
        "sub": "Trans-Sibirya karayolunun Uzak Doğu kesiti.",
        "keys": [
         "R-297",
         "R297",
         "р297",
         "Амур",
         "амур"
        ],
        "ids": [
         "ru-zab",
         "ru-amu",
         "ru-yev",
         "ru-kha"
        ],
        "main": "Р-297 «Амур»"
       },
       {
        "key": "А-360",
        "label": "Лена · Never → Tynda → Aldan → Yakutsk",
        "sub": "Yakutsk’a giden yol. Never–Aldan arası çizgi düz çizilmiştir (haritada eksik veri).",
        "keys": [
         "A-360",
         "A360",
         "а360",
         "Лена",
         "лена"
        ],
        "ids": [
         "ru-amu",
         "ru-sa"
        ],
        "main": "А-360 «Лена»"
       },
       {
        "key": "Р-504",
        "label": "Колыма · Yakutsk → Magadan",
        "sub": "А-360'ın uzantısı; Rusya'nın en ücra federal yollarından.",
        "keys": [
         "R-504",
         "R504",
         "р504",
         "Колыма",
         "колыма"
        ],
        "ids": [
         "ru-sa",
         "ru-mag"
        ],
        "main": "Р-504 «Колыма»"
       },
       {
        "key": "А-370",
        "label": "Уссури · Habarovsk → Vladivostok",
        "sub": "",
        "keys": [
         "A-370",
         "A370",
         "а370",
         "Уссури",
         "уссури"
        ],
        "ids": [
         "ru-kha",
         "ru-pri"
        ],
        "main": "А-370 «Уссури»"
       }
      ]
     },
     "flows": [
      {
       "title": "Harfe bak",
       "body": "М: Moskova'yı diğer ülkelerin başkentlerine ve bölge merkezlerine bağlayan ana yollar. Р: bölge merkezlerini birbirine bağlayan yollar. А: kalan federal yollar (çoğu kısa bağlantı yolu). Kiril harfleri Latin'e benzer: М = M, Р = R, А = A."
      },
      {
       "title": "Numarayı ve adı oku",
       "body": "Büyük yol tabelalarında numaranın yanında yolun adı da yazar. Aşağıdaki listeden yolun geçtiği bölgelere bak: örneğin М-5 «Урал» on bir bölgeden geçer, Р-504 «Колыма» yalnız Saha ile Magadan'dan."
      },
      {
       "title": "Kilometre direğine bak",
       "body": "М yollarında kilometre direği Moskova'dan uzaklığı gösterir. М-5 üzerinde 634. km Penza, 1855. km Çelyabinsk'tir. Sayıyı gördüğünde yolun hangi yarısında olduğunu tahmin edebilirsin."
      }
     ],
     "bandsTitle": "Yol listesi",
     "bandsHint": "dokun → bölgeler boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "М-1",
       "title": "Беларусь",
       "sub": "Moskova → Smolensk → Belarus sınırı",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-smo"
       ]
      },
      {
       "cls": "q1",
       "key": "М-2",
       "title": "Крым",
       "sub": "Moskova → Tula → Oryol → Kursk → Belgorod → Ukrayna sınırı",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-tul",
        "ru-orl",
        "ru-krs",
        "ru-bel"
       ]
      },
      {
       "cls": "q2",
       "key": "М-3",
       "title": "Украина",
       "sub": "Moskova → Kaluga → Bryansk → Ukrayna sınırı",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-klu",
        "ru-bry"
       ]
      },
      {
       "cls": "q3",
       "key": "М-4",
       "title": "Дон",
       "sub": "Moskova → Tula → Lipetsk → Voronezh → Rostov → Krasnodar → Novorossiysk — Güneye giden ana yol; ücretli bölümleri vardır. Krasnodar yakınında Adıge Cumhuriyeti’nden kısa bir kesit geçer.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-tul",
        "ru-lip",
        "ru-vor",
        "ru-ros",
        "ru-kda",
        "ru-ad"
       ]
      },
      {
       "cls": "q4",
       "key": "М-5",
       "title": "Урал",
       "sub": "Moskova → Ryazan → Penza → Samara → Ufa → Çelyabinsk — Toplam 11 bölgeden geçer (Mordovya, Ulyanovsk, Orenburg ve Tataristan’dan kısa kesitlerle). Kilometre direği Moskova’dan sayar: 1855. km Çelyabinsk.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-rya",
        "ru-mo",
        "ru-pnz",
        "ru-uly",
        "ru-sam",
        "ru-ore",
        "ru-ta",
        "ru-ba",
        "ru-che"
       ]
      },
      {
       "cls": "q5",
       "key": "М-7",
       "title": "Волга",
       "sub": "Moskova → Vladimir → Nijni Novgorod → Çuvaşistan → Kazan (Tatarstan) — Eskiden Ufa'ya kadar uzanırdı; Kazan–Ufa kesiti М-12 ve Р-240'a devredilmiştir.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-vla",
        "ru-niz",
        "ru-cu",
        "ru-ta"
       ]
      },
      {
       "cls": "q6",
       "key": "М-8",
       "title": "Холмогоры",
       "sub": "Moskova → Yaroslavl → Vologda → Arkhangelsk — Kuzeye giden ana yol.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-vla",
        "ru-yar",
        "ru-vlg",
        "ru-ark"
       ]
      },
      {
       "cls": "q7",
       "key": "М-9",
       "title": "Балтия",
       "sub": "Moskova → Volokolamsk → Tver → Velikiye Luki → Letonya sınırı — Batıya, Baltık ülkelerine doğru gider.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-tve",
        "ru-psk"
       ]
      },
      {
       "cls": "q8",
       "key": "М-10",
       "title": "Россия",
       "sub": "Moskova → Tver → Veliky Novgorod → St. Petersburg — Eskiden Finlandiya sınırına kadar uzanırdı; o kesit А-181 oldu.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-tve",
        "ru-ngr",
        "ru-len",
        "ru-spe"
       ]
      },
      {
       "cls": "q9",
       "key": "М-11",
       "title": "Нева",
       "sub": "Moskova → Tver → Veliky Novgorod → St. Petersburg (ücretli otoyol) — М-10 ile aynı iki şehri bağlar ama ayrı, ücretli bir otoyoldur.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-tve",
        "ru-ngr",
        "ru-len",
        "ru-spe"
       ]
      },
      {
       "cls": "q10",
       "key": "М-12",
       "title": "Восток",
       "sub": "Moskova → Vladimir → Nijni Novgorod → Çuvaşistan → Kazan → Başkurdistan → Yekaterinburg — Ücretli otoyol. Moskova–Kazan Aralık 2023’te, Kazan–Yekaterinburg 2025’te hizmete girdi; Yekaterinburg–Tyumen kesiti 2026 sonu için planlanıyor.",
       "ids": [
        "ru-mow",
        "ru-mos",
        "ru-vla",
        "ru-niz",
        "ru-cu",
        "ru-ta",
        "ru-ba",
        "ru-per",
        "ru-sve"
       ]
      },
      {
       "cls": "q11",
       "key": "Р-21",
       "title": "Кола",
       "sub": "St. Petersburg → Petrozavodsk → Murmansk → Norveç sınırı — Eski adıyla М-18.",
       "ids": [
        "ru-spe",
        "ru-len",
        "ru-kr",
        "ru-mur"
       ]
      },
      {
       "cls": "q0",
       "key": "Р-22",
       "title": "Каспий",
       "sub": "М-4’ten Kaşira yakınında ayrılır → Tula → Ryazan → Tambov → Voronezh → Volgograd → Astrahan — Eski adıyla М-6. Kalmukya’dan kısa bir kesit geçer.",
       "ids": [
        "ru-mos",
        "ru-tul",
        "ru-rya",
        "ru-tam",
        "ru-vor",
        "ru-vgg",
        "ru-kl",
        "ru-ast"
       ]
      },
      {
       "cls": "q1",
       "key": "Р-23",
       "title": "St. Petersburg – Belarus sınırı",
       "sub": "St. Petersburg → Pskov → Belarus sınırı — Eski adıyla М-20.",
       "ids": [
        "ru-spe",
        "ru-len",
        "ru-psk"
       ]
      },
      {
       "cls": "q2",
       "key": "А-180",
       "title": "Нарва",
       "sub": "St. Petersburg → Estonya sınırı",
       "ids": [
        "ru-spe",
        "ru-len"
       ]
      },
      {
       "cls": "q3",
       "key": "А-181",
       "title": "Скандинавия",
       "sub": "St. Petersburg → Vyborg → Finlandiya sınırı — Eski М-10'un son kesiti.",
       "ids": [
        "ru-spe",
        "ru-len"
       ]
      },
      {
       "cls": "q4",
       "key": "Р-217",
       "title": "Кавказ",
       "sub": "М-4'ten ayrılır → Stavropol → Nalçik → Vladikavkaz → Grozni → Mahaçkale → Azerbaycan sınırı — Eski adıyla М-29. Kuzey Kafkasya'dan geçen ana yol.",
       "ids": [
        "ru-kda",
        "ru-sta",
        "ru-kb",
        "ru-se",
        "ru-in",
        "ru-ce",
        "ru-da"
       ]
      },
      {
       "cls": "q5",
       "key": "Р-254",
       "title": "Иртыш",
       "sub": "Çelyabinsk → Kurgan → Omsk → Novosibirsk — М-5’in doğudaki devamı. Kurgan ile Omsk arasında yol Kazakistan topraklarından (Petropavl yakını) geçer.",
       "ids": [
        "ru-che",
        "ru-kgn",
        "ru-oms",
        "ru-nvs"
       ]
      },
      {
       "cls": "q6",
       "key": "Р-255",
       "title": "Сибирь",
       "sub": "Novosibirsk → Kemerovo → Krasnoyarsk → İrkutsk",
       "ids": [
        "ru-nvs",
        "ru-kem",
        "ru-kya",
        "ru-irk"
       ]
      },
      {
       "cls": "q7",
       "key": "Р-256",
       "title": "Чуйский тракт",
       "sub": "Novosibirsk → Barnaul → Biysk → Moğolistan sınırı — Altay Dağları'na giden yol.",
       "ids": [
        "ru-nvs",
        "ru-alt",
        "ru-al"
       ]
      },
      {
       "cls": "q8",
       "key": "Р-257",
       "title": "Енисей",
       "sub": "Krasnoyarsk → Abakan → Kızıl → Moğolistan sınırı — Yenisey boyunca güneye iner.",
       "ids": [
        "ru-kya",
        "ru-kk",
        "ru-ty"
       ]
      },
      {
       "cls": "q9",
       "key": "Р-258",
       "title": "Байкал",
       "sub": "İrkutsk → Ulan-Ude → Çita — Baykal Gölü'nün güneyinden geçer.",
       "ids": [
        "ru-irk",
        "ru-bu",
        "ru-zab"
       ]
      },
      {
       "cls": "q10",
       "key": "Р-297",
       "title": "Амур",
       "sub": "Çita → Blagoveşçensk yönü → Birobidjan → Habarovsk — Trans-Sibirya karayolunun Uzak Doğu kesiti.",
       "ids": [
        "ru-zab",
        "ru-amu",
        "ru-yev",
        "ru-kha"
       ]
      },
      {
       "cls": "q11",
       "key": "А-360",
       "title": "Лена",
       "sub": "Never → Tynda → Aldan → Yakutsk — Yakutsk’a giden yol. Never–Aldan arası çizgi düz çizilmiştir (haritada eksik veri).",
       "ids": [
        "ru-amu",
        "ru-sa"
       ]
      },
      {
       "cls": "q0",
       "key": "Р-504",
       "title": "Колыма",
       "sub": "Yakutsk → Magadan — А-360'ın uzantısı; Rusya'nın en ücra federal yollarından.",
       "ids": [
        "ru-sa",
        "ru-mag"
       ]
      },
      {
       "cls": "q1",
       "key": "А-370",
       "title": "Уссури",
       "sub": "Habarovsk → Vladivostok",
       "ids": [
        "ru-kha",
        "ru-pri"
       ]
      }
     ],
     "visualsTitle": "Levha nasıl görünür? ",
     "visuals": [
      {
       "id": "ru-route",
       "title": "Yol numarası levhası",
       "badge": "Levha",
       "set": "ru-route",
       "ids": [
        "ru-mow",
        "ru-mos"
       ],
       "sub": "Mavi zeminde beyaz harf ve sayı (M, Р, А + numara). Okla yön gösteren biçimi de vardır; M11'de zemin yeşildir. Numarayı oku, yolun geçtiği bölgeleri bul. Haritada Moskova gösterilir: M yolları buradan çıkar.",
       "tags": [
        "levha",
        "numara",
        "M11"
       ],
       "quiz": false
      },
      {
       "id": "ru-route-real",
       "title": "Gerçek levhada yol numarası",
       "badge": "Foto",
       "set": "ru-route-real",
       "ids": [
        "ru-len",
        "ru-psk",
        "ru-nvs"
       ],
       "sub": "Yön levhasında numara kutu içinde yazar: kırmızı kutuda Р-23, yeşil kutuda E95 (Avrupa yolu). Tek başına duran mavi plakada ok ve М 52 var. Sarı kutular nereye bakacağını gösterir.",
       "tags": [
        "Р-23",
        "E95",
        "М 52"
       ],
       "quiz": false
      },
      {
       "id": "ru-km",
       "title": "Kilometre levhası",
       "badge": "Foto",
       "set": "ru-km",
       "ids": [
        "ru-kda",
        "ru-al",
        "ru-alt"
       ],
       "sub": "Yol kenarındaki direkte kilometre sayısı yazar. Sayı yolun başından itibaren kilometredir; hangi yol olduğunu levhadan değil, çevreden ve diğer tabelalardan çıkar.",
       "tags": [
        "kilometre",
        "РОСАВТОДОР"
       ],
       "quiz": false
      }
     ],
     "routesVar": "RU_ROUTES",
     "routesNote": "Yol çizgileri OpenStreetMap verisinden (© OpenStreetMap katkıcıları, ODbL) sadeleştirilerek alındı; konum birkaç km sapabilir. Düz görünen uzun kesitler sadeleştirmedir ya da haritada eksik veridir (örneğin Р-254’ün Kazakistan’dan geçen kısmı). Р-22’nin Kaşira–Tambov kesiti elle, ana noktalardan geçirilerek çizildi."
    },
    {
     "key": "harfler",
     "navLabel": "Harfler",
     "icon": "langs",
     "drillPreset": "harfler",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Tabelalardaki ek harfler",
     "lead": "Rusya'nın birçok cumhuriyetinde tabelalar Rusça ve yerel dilde yazılır. Yerel dil Kiril harfleriyle yazılır ama Rusçada olmayan ek harfler içerir. Böyle bir harf görürsen hangi cumhuriyette olabileceğini hemen daraltırsın.",
     "desc": "Ә, Ө, Җ, Ӏ… Rusça'da olmayan harften cumhuriyeti bul.",
     "decoder": {
      "title": "Harf ya da cumhuriyet",
      "placeholder": "Tabeladaki harfi yapıştır ya da yaz: Җ, Ӏ, Ӑ… (ya da: Tatarstan)",
      "hint": "Rusçada olmayan bir harfi yaz; hangi cumhuriyetlerde kullanıldığı haritada boyanır. Cumhuriyet adı yazarsan harflerini gösterir.",
      "quizPrompt": "Bu harf hangi cumhuriyette görülür? (Herhangi birine dokun)",
      "noHit": "Bu harf listede yok. Yalnız Rusçada bulunmayan yaygın ek harfler var.",
      "entries": [
       {
        "key": "Ә",
        "label": "Şva (ä gibi) → Tatarstan Cumhuriyeti, Başkurdistan, Kalmıkya Cumhuriyeti",
        "sub": "Tatarca, Başkurtça, Kalmukça — tek başına ayırt etmez.",
        "keys": [
         "ә",
         "Şva (ä gibi)"
        ],
        "ids": [
         "ru-ta",
         "ru-ba",
         "ru-kl"
        ],
        "main": "Ә"
       },
       {
        "key": "Ө",
        "label": "Çizgili O (ö gibi) → Tatarstan Cumhuriyeti, Başkurdistan, Kalmıkya Cumhuriyeti, Buryatya Cumhuriyeti, Tuva Cumhuriyeti, Saha (Yakutya)",
        "sub": "Türki ve Moğol dilleri — tek başına ayırt etmez.",
        "keys": [
         "ө",
         "Çizgili O (ö gibi)"
        ],
        "ids": [
         "ru-ta",
         "ru-ba",
         "ru-kl",
         "ru-bu",
         "ru-ty",
         "ru-sa"
        ],
        "main": "Ө"
       },
       {
        "key": "Ү",
        "label": "Düz U (ü gibi) → Tatarstan Cumhuriyeti, Başkurdistan, Kalmıkya Cumhuriyeti, Buryatya Cumhuriyeti, Tuva Cumhuriyeti, Saha (Yakutya)",
        "sub": "Türki ve Moğol dilleri — tek başına ayırt etmez.",
        "keys": [
         "ү",
         "Düz U (ü gibi)"
        ],
        "ids": [
         "ru-ta",
         "ru-ba",
         "ru-kl",
         "ru-bu",
         "ru-ty",
         "ru-sa"
        ],
        "main": "Ү"
       },
       {
        "key": "Ң",
        "label": "Kuyruklu N (ng gibi) → Tatarstan Cumhuriyeti, Başkurdistan, Kalmıkya Cumhuriyeti, Tuva Cumhuriyeti, Hakasya Cumhuriyeti",
        "sub": "Tatar, Başkurt, Kalmık, Tuva, Hakas.",
        "keys": [
         "ң",
         "Kuyruklu N (ng gibi)"
        ],
        "ids": [
         "ru-ta",
         "ru-ba",
         "ru-kl",
         "ru-ty",
         "ru-kk"
        ],
        "main": "Ң"
       },
       {
        "key": "Һ",
        "label": "Büyük H → Tatarstan Cumhuriyeti, Başkurdistan, Kalmıkya Cumhuriyeti, Buryatya Cumhuriyeti, Saha (Yakutya)",
        "sub": "Tatar, Başkurt, Kalmık, Buryat, Saha.",
        "keys": [
         "һ",
         "Büyük H"
        ],
        "ids": [
         "ru-ta",
         "ru-ba",
         "ru-kl",
         "ru-bu",
         "ru-sa"
        ],
        "main": "Һ"
       },
       {
        "key": "Җ",
        "label": "Kuyruklu Ж → Tatarstan Cumhuriyeti, Kalmıkya Cumhuriyeti",
        "sub": "Yalnız Tatarca ve Kalmukça. Başkurtçada YOK.",
        "keys": [
         "җ",
         "Kuyruklu Ж"
        ],
        "ids": [
         "ru-ta",
         "ru-kl"
        ],
        "main": "Җ"
       },
       {
        "key": "Ғ",
        "label": "Çizgili Г → Başkurdistan",
        "sub": "Başkurtça (bu listedeki cumhuriyetler içinde yalnız Başkurdistan).",
        "keys": [
         "ғ",
         "Çizgili Г"
        ],
        "ids": [
         "ru-ba"
        ],
        "main": "Ғ"
       },
       {
        "key": "Ҡ",
        "label": "Başkurt К'si → Başkurdistan",
        "sub": "Yalnız Başkurtça.",
        "keys": [
         "ҡ",
         "Başkurt К'si"
        ],
        "ids": [
         "ru-ba"
        ],
        "main": "Ҡ"
       },
       {
        "key": "Ҙ",
        "label": "Kuyruklu З → Başkurdistan",
        "sub": "Yalnız Başkurtça.",
        "keys": [
         "ҙ",
         "Kuyruklu З"
        ],
        "ids": [
         "ru-ba"
        ],
        "main": "Ҙ"
       },
       {
        "key": "Ҫ",
        "label": "Kuyruklu С → Başkurdistan, Çuvaşistan Cumhuriyeti",
        "sub": "Başkurtça ve Çuvaşça.",
        "keys": [
         "ҫ",
         "Kuyruklu С"
        ],
        "ids": [
         "ru-ba",
         "ru-cu"
        ],
        "main": "Ҫ"
       },
       {
        "key": "Ӑ",
        "label": "Kısa A (üstünde yay) → Çuvaşistan Cumhuriyeti",
        "sub": "Yalnız Çuvaşça.",
        "keys": [
         "ӑ",
         "Kısa A (üstünde yay)"
        ],
        "ids": [
         "ru-cu"
        ],
        "main": "Ӑ"
       },
       {
        "key": "Ӗ",
        "label": "Kısa E (üstünde yay) → Çuvaşistan Cumhuriyeti",
        "sub": "Yalnız Çuvaşça.",
        "keys": [
         "ӗ",
         "Kısa E (üstünde yay)"
        ],
        "ids": [
         "ru-cu"
        ],
        "main": "Ӗ"
       },
       {
        "key": "Ӳ",
        "label": "İki tırnaklı У → Çuvaşistan Cumhuriyeti",
        "sub": "Yalnız Çuvaşça.",
        "keys": [
         "ӳ",
         "İki tırnaklı У"
        ],
        "ids": [
         "ru-cu"
        ],
        "main": "Ӳ"
       },
       {
        "key": "Ҕ",
        "label": "Çizgili Г (Saha) → Saha (Yakutya)",
        "sub": "Saha (Yakut) dilinin belirgin harfi.",
        "keys": [
         "ҕ",
         "Çizgili Г (Saha)"
        ],
        "ids": [
         "ru-sa"
        ],
        "main": "Ҕ"
       },
       {
        "key": "Ҥ",
        "label": "Н+Г bitişik → Saha (Yakutya), Mari El, Altay Cumhuriyeti",
        "sub": "Saha, Mari ve Altay dillerinde.",
        "keys": [
         "ҥ",
         "Н+Г bitişik"
        ],
        "ids": [
         "ru-sa",
         "ru-me",
         "ru-al"
        ],
        "main": "Ҥ"
       },
       {
        "key": "Ӏ",
        "label": "Palochka (dikey çubuk) → Adıge Cumhuriyeti, Kabardino-Balkarya, Karaçay-Çerkesya, Çeçenya, İnguşetya, Dağıstan",
        "sub": "Kuzey Kafkasya dillerinde (Çeçence, İnguşça, Avarca, Kabardeyce, Adıgece…) kullanılır.",
        "keys": [
         "ӏ",
         "Palochka (dikey çubuk)"
        ],
        "ids": [
         "ru-ad",
         "ru-kb",
         "ru-kc",
         "ru-ce",
         "ru-in",
         "ru-da"
        ],
        "main": "Ӏ"
       },
       {
        "key": "Ӕ",
        "label": "Æ → Kuzey Osetya-Alanya",
        "sub": "Osetçe.",
        "keys": [
         "ӕ",
         "Æ"
        ],
        "ids": [
         "ru-se"
        ],
        "main": "Ӕ"
       },
       {
        "key": "Ӝ",
        "label": "Noktalı Ж → Udmurtia Cumhuriyeti",
        "sub": "Yalnız Udmurtça.",
        "keys": [
         "ӝ",
         "Noktalı Ж"
        ],
        "ids": [
         "ru-ud"
        ],
        "main": "Ӝ"
       },
       {
        "key": "Ӟ",
        "label": "Noktalı З → Udmurtia Cumhuriyeti",
        "sub": "Yalnız Udmurtça.",
        "keys": [
         "ӟ",
         "Noktalı З"
        ],
        "ids": [
         "ru-ud"
        ],
        "main": "Ӟ"
       },
       {
        "key": "Ӥ",
        "label": "Noktalı И → Udmurtia Cumhuriyeti",
        "sub": "Udmurtça (Rusçada nadir).",
        "keys": [
         "ӥ",
         "Noktalı И"
        ],
        "ids": [
         "ru-ud"
        ],
        "main": "Ӥ"
       },
       {
        "key": "Ӵ",
        "label": "Noktalı Ч → Udmurtia Cumhuriyeti",
        "sub": "Yalnız Udmurtça.",
        "keys": [
         "ӵ",
         "Noktalı Ч"
        ],
        "ids": [
         "ru-ud"
        ],
        "main": "Ӵ"
       },
       {
        "key": "Ӧ",
        "label": "Noktalı О (ö gibi) → Udmurtia Cumhuriyeti, Mari El, Komi Cumhuriyeti, Hakasya Cumhuriyeti",
        "sub": "Udmurt, Mari, Komi, Hakas dilleri.",
        "keys": [
         "ӧ",
         "Noktalı О (ö gibi)"
        ],
        "ids": [
         "ru-ud",
         "ru-me",
         "ru-ko",
         "ru-kk"
        ],
        "main": "Ӧ"
       },
       {
        "key": "Ӱ",
        "label": "Noktalı У (ü gibi) → Mari El, Altay Cumhuriyeti, Hakasya Cumhuriyeti",
        "sub": "Mari, Altay, Hakas dilleri.",
        "keys": [
         "ӱ",
         "Noktalı У (ü gibi)"
        ],
        "ids": [
         "ru-me",
         "ru-al",
         "ru-kk"
        ],
        "main": "Ӱ"
       },
       {
        "key": "Tatarstan",
        "label": "Tatarca: Ә Ө Ү Җ Ң Һ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Tatarca",
         "Tatarstan Cum.",
         "Респ. Татарстан"
        ],
        "ids": [
         "ru-ta"
        ],
        "quiz": false,
        "main": "Tatarstan"
       },
       {
        "key": "Başkurdistan",
        "label": "Başkurtça: Ә Ө Ү Ғ Ҡ Ҙ Ҫ Ң Һ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Başkurtça",
         "Başkurdistan",
         "Башкортостан"
        ],
        "ids": [
         "ru-ba"
        ],
        "quiz": false,
        "main": "Başkurdistan"
       },
       {
        "key": "Çuvaşistan",
        "label": "Çuvaşça: Ӑ Ӗ Ӳ Ҫ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Çuvaşça",
         "Çuvaşistan Cum.",
         "Чувашия"
        ],
        "ids": [
         "ru-cu"
        ],
        "quiz": false,
        "main": "Çuvaşistan"
       },
       {
        "key": "Yakutya",
        "label": "Saha (Yakut) dili: Ҕ Ҥ Ө Ү Һ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Saha (Yakut) dili",
         "Saha (Yakutya)",
         "Респ. Саха (Якутия)"
        ],
        "ids": [
         "ru-sa"
        ],
        "quiz": false,
        "main": "Yakutya"
       },
       {
        "key": "Buryatya",
        "label": "Buryatça: Ө Ү Һ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Buryatça",
         "Buryatya Cum.",
         "Респ. Бурятия"
        ],
        "ids": [
         "ru-bu"
        ],
        "quiz": false,
        "main": "Buryatya"
       },
       {
        "key": "Tuva",
        "label": "Tuvaca: Ң Ө Ү",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Tuvaca",
         "Tuva Cum.",
         "Респ. Тыва"
        ],
        "ids": [
         "ru-ty"
        ],
        "quiz": false,
        "main": "Tuva"
       },
       {
        "key": "Kalmıkya",
        "label": "Kalmukça: Ә Ө Ү Җ Ң Һ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Kalmukça",
         "Kalmıkya Cum.",
         "Респ. Калмыкия"
        ],
        "ids": [
         "ru-kl"
        ],
        "quiz": false,
        "main": "Kalmıkya"
       },
       {
        "key": "Hakasya",
        "label": "Hakasça: Ң Ӧ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Hakasça",
         "Hakasya Cum.",
         "Респ. Хакасия"
        ],
        "ids": [
         "ru-kk"
        ],
        "quiz": false,
        "main": "Hakasya"
       },
       {
        "key": "Altay Cum.",
        "label": "Altayca: Ҥ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Altayca",
         "Altay Cumhuriyeti",
         "Респ. Алтай"
        ],
        "ids": [
         "ru-al"
        ],
        "quiz": false,
        "main": "Altay Cum."
       },
       {
        "key": "Udmurtia",
        "label": "Udmurtça: Ӝ Ӟ Ӥ Ӧ Ӵ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Udmurtça",
         "Udmurtia Cum.",
         "Удмуртия"
        ],
        "ids": [
         "ru-ud"
        ],
        "quiz": false,
        "main": "Udmurtia"
       },
       {
        "key": "Mari El",
        "label": "Mari dili: Ӧ Ӱ Ҥ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Mari dili",
         "Mari El",
         "Респ. Марий Эл"
        ],
        "ids": [
         "ru-me"
        ],
        "quiz": false,
        "main": "Mari El"
       },
       {
        "key": "Komi",
        "label": "Komi dili: Ӧ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Komi dili",
         "Komi Cum.",
         "Респ. Коми"
        ],
        "ids": [
         "ru-ko"
        ],
        "quiz": false,
        "main": "Komi"
       },
       {
        "key": "K. Osetya",
        "label": "Osetçe: Ӕ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Osetçe",
         "Kuzey Osetya-Alanya",
         "Северная Осетия"
        ],
        "ids": [
         "ru-se"
        ],
        "quiz": false,
        "main": "K. Osetya"
       },
       {
        "key": "Çeçenya",
        "label": "Çeçence: Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Çeçence",
         "Çeçenya",
         "Чеченская Респ."
        ],
        "ids": [
         "ru-ce"
        ],
        "quiz": false,
        "main": "Çeçenya"
       },
       {
        "key": "İnguşetya",
        "label": "İnguşça: Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "İnguşça",
         "İnguşetya",
         "Респ. Ингушетия"
        ],
        "ids": [
         "ru-in"
        ],
        "quiz": false,
        "main": "İnguşetya"
       },
       {
        "key": "Dağıstan",
        "label": "Dağıstan dilleri (Avarca, Lezgice, Darginçe vb.): Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Dağıstan dilleri (Avarca, Lezgice, Darginçe vb.)",
         "Dağıstan",
         "Респ. Дагестан"
        ],
        "ids": [
         "ru-da"
        ],
        "quiz": false,
        "main": "Dağıstan"
       },
       {
        "key": "KBR",
        "label": "Kabardeyce: Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Kabardeyce",
         "Kabardino-Balkarya",
         "Кабардино-Балкария"
        ],
        "ids": [
         "ru-kb"
        ],
        "quiz": false,
        "main": "KBR"
       },
       {
        "key": "KÇR",
        "label": "Abazaca / Çerkesçe: Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Abazaca / Çerkesçe",
         "Karaçay-Çerkesya",
         "Карачаево-Черкесия"
        ],
        "ids": [
         "ru-kc"
        ],
        "quiz": false,
        "main": "KÇR"
       },
       {
        "key": "Adıge",
        "label": "Adıgece: Ӏ",
        "sub": "Tabelada rusçadan farklı bu harfleri ara.",
        "keys": [
         "Adıgece",
         "Adıge Cum.",
         "Респ. Адыгея"
        ],
        "ids": [
         "ru-ad"
        ],
        "quiz": false,
        "main": "Adıge"
       }
      ]
     },
     "flows": [
      {
       "title": "Tabelanın ikinci satırına bak",
       "body": "Cumhuriyetlerde sokak ve yer adları iki dilde yazılır: üstte ya da altta Rusça, yanında yerel dil. Rusça olmayan satırdaki garip harfleri ara."
      },
      {
       "title": "Ortak harfler tek başına yetmez",
       "body": "Ә Ө Ү Ң Һ harfleri Tatarstan, Başkurdistan ve Kalmıkya'da ortak. Ayırt eden harfe bak: Җ → Tatar ya da Kalmık; Ғ Ҡ Ҙ → Başkurt; Ӑ Ӗ Ӳ → Çuvaş; Ҕ → Saha."
      },
      {
       "title": "Kafkasya'da Ӏ",
       "body": "Dikey çubuğa benzeyen Ӏ (palochka) Kuzey Kafkasya dillerinde görülür. Gördüğün anda 6 cumhuriyete daraltırsın: Çeçenya, İnguşetya, Dağıstan, Kabardino-Balkarya, Karaçay-Çerkesya, Adıge."
      }
     ],
     "bandsTitle": "Cumhuriyete göre ayırt edici harfler",
     "bandsHint": "dokun → haritada göster",
     "bands": [
      {
       "cls": "q0",
       "key": "Җ",
       "title": "Tatarstan · Kalmıkya",
       "sub": "Ә Ө Ү Җ Ң Һ — iki dilde de aynı altı harf",
       "ids": [
        "ru-ta",
        "ru-kl"
       ]
      },
      {
       "cls": "q1",
       "key": "Ғ Ҡ Ҙ",
       "title": "Başkurdistan",
       "sub": "Ә Ө Ү Ғ Ҡ Ҙ Ҫ Ң Һ",
       "ids": [
        "ru-ba"
       ]
      },
      {
       "cls": "q2",
       "key": "Ӑ Ӗ Ӳ",
       "title": "Çuvaşistan",
       "sub": "Ӑ Ӗ Ӳ Ҫ",
       "ids": [
        "ru-cu"
       ]
      },
      {
       "cls": "q3",
       "key": "Ҕ",
       "title": "Saha (Yakutya)",
       "sub": "Ҕ Ҥ Ө Ү Һ",
       "ids": [
        "ru-sa"
       ]
      },
      {
       "cls": "q4",
       "key": "Ө Ү Һ",
       "title": "Buryatya",
       "sub": "Ө Ү Һ",
       "ids": [
        "ru-bu"
       ]
      },
      {
       "cls": "q5",
       "key": "Ң Ө Ү",
       "title": "Tuva",
       "sub": "Ң Ө Ү",
       "ids": [
        "ru-ty"
       ]
      },
      {
       "cls": "q6",
       "key": "Ң Ӧ",
       "title": "Hakasya",
       "sub": "Ң Ӧ",
       "ids": [
        "ru-kk"
       ]
      },
      {
       "cls": "q7",
       "key": "Ҥ",
       "title": "Altay Cumhuriyeti",
       "sub": "Ҥ",
       "ids": [
        "ru-al"
       ]
      },
      {
       "cls": "q8",
       "key": "Ӏ",
       "title": "Kuzey Kafkasya (6 cumhuriyet)",
       "sub": "Çeçenya, İnguşetya, Dağıstan, Kabardino-Balkarya, Karaçay-Çerkesya, Adıge",
       "ids": [
        "ru-ce",
        "ru-in",
        "ru-da",
        "ru-kb",
        "ru-kc",
        "ru-ad"
       ]
      },
      {
       "cls": "q9",
       "key": "Ӕ",
       "title": "Kuzey Osetya-Alanya",
       "sub": "Ӕ",
       "ids": [
        "ru-se"
       ]
      },
      {
       "cls": "q10",
       "key": "Ӝ Ӟ Ӵ",
       "title": "Udmurtya",
       "sub": "Ӝ Ӟ Ӥ Ӧ Ӵ",
       "ids": [
        "ru-ud"
       ]
      },
      {
       "cls": "q11",
       "key": "Ӧ Ӱ Ҥ",
       "title": "Mari El",
       "sub": "Ӧ Ӱ Ҥ",
       "ids": [
        "ru-me"
       ]
      },
      {
       "cls": "q0",
       "key": "Ӧ",
       "title": "Komi",
       "sub": "Ӧ",
       "ids": [
        "ru-ko"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "Tatar mı, Başkurt mu, Kalmık mı?",
       "ids": [
        "ru-ta",
        "ru-ba",
        "ru-kl"
       ],
       "body": "Ә Ө Ү Ң Һ üçünde de var; bunlar yalnız 'bu üçünden biri' der. Җ varsa Tatar ya da Kalmık; Ғ Ҡ Ҙ varsa Başkurt. Tatarla Kalmığı harf ayırmaz, coğrafya ayırır: Kalmıkya Hazar kıyısına yakın kuru bozkırdır, Tatarstan İdil–Kama bölgesidir.",
       "traps": [
        [
         "Ә Ө Ү Ң Һ",
         "Tatarstan, Başkurdistan, Kalmıkya (hepsinde ortak)"
        ],
        [
         "Җ",
         "Tatarstan ve Kalmıkya — Başkurtçada yok"
        ],
        [
         "Ғ Ҡ Ҙ",
         "Yalnız Başkurdistan"
        ],
        [
         "Ӑ Ӗ Ӳ",
         "Yalnız Çuvaşistan (Ҫ Başkurtçada da var)"
        ]
       ]
      },
      {
       "title": "Kafkasya: Ӏ var mı, Ӕ mı?",
       "ids": [
        "ru-ce",
        "ru-in",
        "ru-da",
        "ru-kb",
        "ru-kc",
        "ru-ad",
        "ru-se"
       ],
       "body": "Ӏ (dikey çubuk) Çeçen, İnguş, Dağıstan, Kabardey, Adıge ve Abaza dillerinde kullanılır. Kuzey Osetya'da Osetçe yazılır ve ona özgü harf Ӕ'dir; orada Ӏ beklenmez.",
       "traps": [
        [
         "Ӏ",
         "Çeçenya, İnguşetya, Dağıstan, Kabardino-Balkarya, Karaçay-Çerkesya, Adıge"
        ],
        [
         "Ӕ",
         "Kuzey Osetya-Alanya"
        ]
       ]
      },
      {
       "title": "Udmurt, Mari ve Komi: noktalı harfler",
       "ids": [
        "ru-ud",
        "ru-me",
        "ru-ko"
       ],
       "body": "Bu üç Fin-Ugor cumhuriyetinde harflerin üstünde nokta (iki nokta) bulunur. Ӝ Ӟ Ӵ yalnız Udmurtya'yı gösterir; Ӱ ve Ҥ Mari El'i; yalnız Ӧ görürsen Udmurt, Mari ya da Komi olabilir.",
       "traps": [
        [
         "Ӝ Ӟ Ӵ",
         "Udmurtya"
        ],
        [
         "Ӱ Ҥ",
         "Mari El (Ҥ Saha ve Altay'da da var)"
        ],
        [
         "Ӧ",
         "Udmurtya, Mari El, Komi (ve Hakasya)"
        ]
       ]
      },
      {
       "title": "Sibirya ve Uzak Doğu: Saha, Buryat, Tuva",
       "ids": [
        "ru-sa",
        "ru-bu",
        "ru-ty"
       ],
       "body": "Ө ve Ү üçünde de var, bunlar ayırt etmez. Ҕ görürsen Saha'dır. Ң görürsen Tuva'dır (Buryatçada Ң yok). Һ varsa Buryat ya da Saha olabilir.",
       "traps": [
        [
         "Ҕ",
         "Saha (Yakutya)"
        ],
        [
         "Ө Ү Һ",
         "Buryatya (Saha'da da var)"
        ],
        [
         "Ң Ө Ү",
         "Tuva"
        ]
       ]
      }
     ],
     "visualsTitle": "Gerçek levhalar ",
     "visuals": [
      {
       "id": "v-tat",
       "title": "Kazan: Tatarca + Rusça levhalar",
       "badge": "Ә Ө Ү Һ",
       "set": "ru-tat",
       "ids": [
        "ru-ta"
       ],
       "sub": "Tatarstan'da resmî levhalar iki dillidir. Anma levhasında «төбәк», «дәүләт» (Ө, Ә, Ү), anıtta «шәһәре» (Ә, Һ) gibi sözler Rusçada olmayan harfleri gösterir. Sıradan sokak levhalarında bu harfler her zaman çıkmaz.",
       "tags": [
        "Tatarca",
        "Rusça"
       ]
      },
      {
       "id": "v-ba",
       "title": "Başkurdistan: Başkurtça + Rusça levhalar",
       "badge": "Ә Ө Ү Һ",
       "set": "ru-ba",
       "ids": [
        "ru-ba"
       ],
       "sub": "Başkurtça Tatarcaya çok benzer: Ә Ө Ү Һ iki dilde de var. Yalnızca Başkurtçada olan Ғ Ҡ Ҙ harflerinden birini görürsen cevap Başkurdistan'dır.",
       "tags": [
        "Başkurtça",
        "Rusça"
       ]
      },
      {
       "id": "v-cu",
       "title": "Çuvaşistan: Çuvaşça + Rusça levhalar",
       "badge": "Ӑ Ӗ Ҫ",
       "set": "ru-cu",
       "ids": [
        "ru-cu"
       ],
       "sub": "Çuvaşça yazıda üstü yaylı Ӑ ve Ӗ ile kuyruklu Ҫ hemen göze çarpar. Ӑ Ӗ Ӳ yalnızca Çuvaşça'dadır; Ҫ ayrıca Başkurtçada da var.",
       "tags": [
        "Çuvaşça",
        "Rusça"
       ]
      },
      {
       "id": "v-ko",
       "title": "Komi: Komi dili + Rusça resmî levha",
       "badge": "Ӧ",
       "set": "ru-ko",
       "ids": [
        "ru-ko"
       ],
       "sub": "Noktalı Ӧ Komi dilinde çok sık geçer; Udmurtça, Mari ve Hakasça da kullanır. Yanında Ӝ Ӟ Ӥ Ӵ (Udmurtça) ya da Ӱ yoksa ve yer kuzeybatı Rusya'ysa Komi'yi düşün.",
       "tags": [
        "Komi",
        "Rusça"
       ]
      },
      {
       "id": "v-kl",
       "title": "Kalmukya: Kalmukça + Rusça levha",
       "badge": "Ң Һ Ө",
       "set": "ru-kl",
       "ids": [
        "ru-kl"
       ],
       "sub": "Kalmukça, Tatarca ve Başkurtçayla aynı harflerin çoğunu paylaşır; ayırmak için harfe konumu da ekle: Kalmukya Hazar'ın kuzeybatısındaki bozkırdadır.",
       "tags": [
        "Kalmukça",
        "Rusça"
       ]
      },
      {
       "id": "v-ud",
       "title": "Udmurtya: Udmurtça + Rusça tabela",
       "badge": "Ӧ",
       "set": "ru-ud",
       "ids": [
        "ru-ud"
       ],
       "sub": "Udmurtçanın kendine özgü harfleri Ӝ Ӟ Ӥ Ӵ'dir; noktalı Ӧ Komi, Mari ve Hakasça ile ortaktır. Bu tabelada yalnızca Ӧ görünür.",
       "tags": [
        "Udmurtça",
        "Rusça"
       ]
      }
     ]
    },
    {
     "key": "yerel",
     "navLabel": "Bölgesel görünüm",
     "icon": "camera",
     "drillPreset": "yerel",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Bölgeyi gösteren ev, boru ve yapı",
     "lead": "Rusya’da tabela her yerde benzer; bölgeyi çoğu zaman sokak görünümü söyler. Kuzeyde kütük evler, Volga ve güneyde evlerin üstünden geçen sarı gaz borusu, permafrostta yerden yükselen yalıtımlı borular, Uzak Doğu’da sağdan direksiyonlu Japon arabalar, Kafkasya’da minareler, Buryatya’da stupalar, Kamçatka’da volkanlar. Önce yere (boru), sonra yapıya (ev, cami, stupa) bak.",
     "desc": "Ahşap evden, borudan ve arabadan bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. kütük ev, sarı boru, sağdan direksiyon, minare, stupa…",
      "hint": "Gördüğün ipucunu yaz: hangi bölgelerde görüldüğü haritada boyanır.",
      "quizPrompt": "Bu görünüm hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Kuzey kütük evi",
        "label": "Büyük, iki katlı, grileşmiş kütük ev → Rusya Kuzeyi: Arkhangelsk, Vologda, Karelya, Komi",
        "sub": "Geleneksel “kuzey izbası”: kalın kütük duvar, yüksek taban, eğimli tahta çatı. Çoğu zaman ev ile ahır bitişiktir. Kütük ev Volga boyunda ve Sibirya’da da vardır; Kuzey’de ise çok daha iri ve yaygındır, çevre ormandır ve toprak yol görülür. Tek başına kesin değildir; ortamdaki köknar ve ladin ormanı, düz ova ve yol kenarındaki çitle birlikte düşün.",
        "keys": [
         "kütük ev",
         "kuzey evi",
         "ahşap ev",
         "izba",
         "kuzey izbası",
         "tahta ev",
         "kütük",
         "ahşap kütük"
        ],
        "ids": [
         "ru-ark",
         "ru-vlg",
         "ru-kr",
         "ru-ko"
        ],
        "main": "Kuzey kütük evi",
        "prompt": "İri, iki katlı, grileşmiş kütük evler (kuzey izbası) en çok hangi bölgenin işaretidir?"
       },
       {
        "key": "Sarı gaz borusu",
        "label": "Evlerin ve kapıların üstünden geçen sarı yer üstü boru → Volga boyu ve güney köyleri",
        "sub": "Rusya’da köy gazı çoğu yerde yer üstündeki sarı borularla dağıtılır; boru evin önünde yol üstünde dirsek yapıp geçer. Gazlaştırma İdil (Volga) boyunda, Çernozyom kuşağında ve güneyde çok yüksektir (Stavropol, Tataristan, Volgograd, Kaliningrad ve benzeri bölgelerde %90 civarı). Doğu Sibirya ve Uzak Doğu köylerinde ağ neredeyse yoktur: İrkutsk, Hakasya, Tuva’da bağlantı çok düşüktür. Yani sarı boru gördüysen Avrupa Rusya’sının güneyi ve Volga bölgesidir; Sibirya’nın doğusu değil.",
        "keys": [
         "sarı boru",
         "gaz borusu",
         "gaz",
         "yer üstü boru",
         "sarı gaz borusu",
         "boru",
         "gazlaştırma"
        ],
        "ids": [
         "ru-sam",
         "ru-ta",
         "ru-ba",
         "ru-sar",
         "ru-uly",
         "ru-pnz",
         "ru-vgg",
         "ru-sta",
         "ru-kda",
         "ru-ros",
         "ru-ore",
         "ru-lip",
         "ru-vor",
         "ru-tam",
         "ru-bel",
         "ru-krs"
        ],
        "main": "Sarı gaz borusu",
        "prompt": "Evlerin önünden geçen sarı yer üstü gaz borusu en çok hangi bölgelerin işaretidir?"
       },
       {
        "key": "Isıtma borusu (permafrost)",
        "label": "Yerde veya yerden yükselen kalın yalıtımlı boru, üstünde yaya geçidi → permafrost bölgesi: Yamal, Saha, Çukotka, Magadan, Nenets",
        "sub": "Donmuş toprağa boru gömülemez; sıcak su ve ısıtma boruları yerden yükseltilir ya da yerde yalıtımlı gider, sokaklarda yaya merdivenleri ve köprüleri bunun üstünden geçer. Salehard (Yamalo-Nenets), Yakutsk (Saha), Norilsk gibi kuzey kentlerinde görülür. Sarı gaz borusuyla karıştırma: o ince ve sarıdır, bu kalın ve yalıtımlıdır.",
        "keys": [
         "kalın boru",
         "yalıtımlı boru",
         "ısıtma borusu",
         "permafrost",
         "donmuş toprak",
         "boru hattı",
         "utilidor",
         "boru köprüsü",
         "kuzey borusu"
        ],
        "ids": [
         "ru-yan",
         "ru-sa",
         "ru-chu",
         "ru-mag",
         "ru-nen"
        ],
        "main": "Isıtma borusu (permafrost)",
        "prompt": "Yerden yükselen ya da yerde uzanan kalın yalıtımlı ısıtma boruları (permafrost) hangi bölgelerin işaretidir?"
       },
       {
        "key": "Sağdan direksiyon",
        "label": "Sağdan direksiyonlu Japon arabalar (Toyota Crown, Mark II…) → Uzak Doğu: Primorsky, Habarovsk, Sahalin, Kamçatka, Magadan, Amur",
        "sub": "Japonya’dan ithal edilen ikinci el arabalar Vladivostok limanından Rusya’ya girer; Uzak Doğu’da direksiyon sağdadır ve sokaktaki arabaların çoğu bu tipten olabilir. Batıya gittikçe seyrekleşir. Sağdan direksiyonlu araç gördüysen Uzak Doğu’da olma ihtimalin çok yüksektir.",
        "keys": [
         "sağdan direksiyon",
         "sağ direksiyon",
         "japon araba",
         "japon arabası",
         "toyota",
         "ikinci el",
         "rhd",
         "direksiyon"
        ],
        "ids": [
         "ru-pri",
         "ru-kha",
         "ru-sak",
         "ru-kam",
         "ru-mag",
         "ru-amu"
        ],
        "main": "Sağdan direksiyon",
        "prompt": "Sağdan direksiyonlu Japon arabalarının çok yaygın olduğu bölge hangisidir?"
       },
       {
        "key": "Cami ve minare",
        "label": "Köy sokağında ince minare, yeşil kubbe → Müslüman cumhuriyetler: Dağıstan, Çeçenya, İnguşetya, Kabardino-Balkarya, Karaçay-Çerkesya, Tataristan, Başkurdistan",
        "sub": "Rusya’nın geri kalanında kilise (soğan kubbe) görülür; ince minareli cami ise Müslüman çoğunluklu cumhuriyetlerin işaretidir. Kafkasya’da köy camisi genelde tek ince minareli ve çevresi taş duvarlıdır. Tek başına camiyle cumhuriyeti bulamazsın; tabelayı (Ӏ harfi, Tatarca/Başkurtça ek harfler) birlikte kullan.",
        "keys": [
         "cami",
         "minare",
         "mescit",
         "kubbe",
         "islam",
         "müslüman",
         "dağıstan",
         "kafkasya camisi"
        ],
        "ids": [
         "ru-da",
         "ru-ce",
         "ru-in",
         "ru-kb",
         "ru-kc",
         "ru-ta",
         "ru-ba"
        ],
        "main": "Cami ve minare",
        "prompt": "Köy sokağında ince minareli bir cami en çok hangi bölgelerin işaretidir?"
       },
       {
        "key": "Stupa ve datsan",
        "label": "Beyaz stupa sırası, çok katlı çatılı ahşap tapınak → Budist bölgeler: Buryatya, Tuva, Kalmıkya, Zabaykalsky",
        "sub": "Buryatlar, Tuvalılar ve Kalmuklar Budisttir. Datsan (Buryatça “dugan”) çok katlı kıvrık çatılı, renkli ahşap bir tapınaktır; önünde sıralanmış beyaz sivri stupalar durur. Rusya’nın başka yerinde bu görünüm yoktur.",
        "keys": [
         "stupa",
         "datsan",
         "dugan",
         "budist",
         "budizm",
         "tapınak",
         "khurul",
         "buryat",
         "kalmık"
        ],
        "ids": [
         "ru-bu",
         "ru-ty",
         "ru-kl",
         "ru-zab"
        ],
        "main": "Stupa ve datsan",
        "prompt": "Beyaz stupalar ve çok katlı çatılı Budist tapınak (datsan) hangi bölgelerin işaretidir?"
       },
       {
        "key": "Volkan konisi",
        "label": "Kent ya da köyün arkasında karlı volkan konisi → Kamçatka",
        "sub": "Petropavlovsk-Kamçatski’nin hemen arkasında Avaçinsky, Koryaksky ve Kozelsky volkanları yükselir. Karlı konik tepe gördüysen ve ortam kent ya da kıyıysa Kamçatka’dır. Kuril Adaları’nda da volkan vardır (Sahalin Oblastı) ama orada kent görünümü yoktur.",
        "keys": [
         "volkan",
         "karlı volkan",
         "koni",
         "kamçatka",
         "avaçinsky",
         "kozelsky",
         "koryaksky"
        ],
        "ids": [
         "ru-kam"
        ],
        "main": "Volkan konisi",
        "prompt": "Kent ya da köyün arkasında yükselen karlı volkan konisi hangi bölgenin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce sokağa bak: boru var mı?",
       "body": "Evlerin üstünden geçen ince sarı boru: Volga boyu ve güney (Samara, Tataristan, Stavropol, Krasnodar…). Kalın, yalıtımlı ve yerde uzanan boru: permafrost (Yamal, Saha, Çukotka, Magadan). Hiçbiri yoksa ve köy bakımsızsa Sibirya’nın doğusu ya da Kuzey olabilir."
      },
      {
       "title": "Sonra yapıya bak",
       "body": "Büyük kütük ev ve çevrede orman: Arkhangelsk, Vologda, Karelya, Komi. İnce minare: Kafkasya, Tataristan ya da Başkurdistan. Beyaz stupa ve çok katlı çatılı tapınak: Buryatya, Tuva, Kalmıkya, Zabaykalsky. Karlı volkan: Kamçatka."
      },
      {
       "title": "Arabaya bak",
       "body": "Sağdan direksiyonlu Japon arabalar sıradansa Uzak Doğu’dasın (Primorsky, Habarovsk, Sahalin, Kamçatka, Magadan). Batıya gittikçe azalır; Moskova ve St. Petersburg’da neredeyse hiç yoktur."
      }
     ],
     "rulesTitle": "Karışan ipuçları",
     "rules": [
      {
       "title": "Sarı boru mu, kalın yalıtımlı boru mu?",
       "ids": [
        "ru-sam",
        "ru-ta",
        "ru-sta",
        "ru-yan",
        "ru-sa",
        "ru-chu"
       ],
       "body": "İkisi de sokakta yer üstünden geçen boru gibi görünür ama bambaşka bölgeleri söyler. Sarı, ince boru köy gazıdır: gazlaştırılmış güney ve Volga boyu. Kalın, gri ya da yalıtımlı, yerde ya da yerden yükseltilmiş boru ısıtma hattıdır: permafrost kuzeyi.",
       "traps": [
        [
         "İnce sarı boru, evin önünde dirsek",
         "Volga boyu ve güney (Samara, Tataristan, Stavropol…)"
        ],
        [
         "Kalın yalıtımlı boru, üstünde yaya merdiveni",
         "Permafrost: Yamal, Saha, Çukotka, Magadan"
        ],
        [
         "Boru yok, köy gazsız",
         "Sibirya’nın doğusu ve Uzak Doğu köyleri çoğunlukla gazsızdır"
        ]
       ]
      },
      {
       "title": "Minare mi stupa mı?",
       "ids": [
        "ru-da",
        "ru-ce",
        "ru-ta",
        "ru-ba",
        "ru-bu",
        "ru-ty",
        "ru-kl",
        "ru-zab"
       ],
       "body": "Din yapısı bölgeyi daraltır ama tek başına yetmez. İnce minare: Müslüman cumhuriyetler (Kafkasya, Tataristan, Başkurdistan). Beyaz stupa ve datsan: Budist cumhuriyetler (Buryatya, Tuva, Kalmıkya). Tabeladaki harfle birlikte kullan.",
       "traps": [
        [
         "İnce minare, taş çit",
         "Kafkasya cumhuriyetleri"
        ],
        [
         "İnce minare, düz bozkır ya da orman",
         "Tataristan ya da Başkurdistan"
        ],
        [
         "Beyaz stupa sırası, kıvrık çatılı tapınak",
         "Buryatya, Tuva, Kalmıkya, Zabaykalsky"
        ]
       ]
      }
     ],
     "visualsTitle": "Nasıl görünür? ",
     "visuals": [
      {
       "id": "ru-yer-ev",
       "title": "Kuzey kütük evi",
       "badge": "Ev",
       "set": "ru-yer-ev",
       "ids": [
        "ru-ark",
        "ru-vlg",
        "ru-kr",
        "ru-ko"
       ],
       "sub": "Grileşmiş kalın kütük duvar, iki kat, eğimli tahta çatı, çevrede orman ve toprak yol. Fotoğraflar Arkhangelsk Oblastı’ndan: Holmogorı, Mezen, Kargopol.",
       "tags": [
        "kütük ev",
        "izba",
        "Arkhangelsk"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-gaz",
       "title": "Sarı gaz borusu",
       "badge": "Boru",
       "set": "ru-yer-gaz",
       "ids": [
        "ru-sam",
        "ru-ta",
        "ru-sta",
        "ru-kda"
       ],
       "sub": "Evlerin önünde ve sokağın üstünde yer üstü sarı boru. Fotoğraflar Samara Oblastı’ndan (iki köy) ve Kazan’dan (Tataristan). Boru Volga boyunun ve güneyin işaretidir.",
       "tags": [
        "gaz",
        "sarı boru",
        "Samara"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-isi",
       "title": "Yalıtımlı ısıtma borusu",
       "badge": "Boru",
       "set": "ru-yer-isi",
       "ids": [
        "ru-yan",
        "ru-sa",
        "ru-chu",
        "ru-mag"
       ],
       "sub": "Donmuş toprakta boru gömülmez: ısıtma hattı yerde ya da yerden yüksek durur, üstünden yaya geçitleri yapılır. Fotoğraflar Salehard (Yamal) ve Yakutsk’tan.",
       "tags": [
        "permafrost",
        "Yamal",
        "Yakutsk"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-rhd",
       "title": "Sağdan direksiyonlu Japon araba",
       "badge": "Araba",
       "set": "ru-yer-rhd",
       "ids": [
        "ru-pri",
        "ru-kha",
        "ru-sak",
        "ru-kam"
       ],
       "sub": "Toyota Crown station wagon, direksiyon sağda. Vladivostok’tan üç fotoğraf; Uzak Doğu’da bu tip arabalar sıradandır.",
       "tags": [
        "sağdan direksiyon",
        "Toyota",
        "Vladivostok"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-cami",
       "title": "Dağıstan camileri",
       "badge": "Cami",
       "set": "ru-yer-cami",
       "ids": [
        "ru-da",
        "ru-ce",
        "ru-in",
        "ru-kb"
       ],
       "sub": "Köy camisi ya da şehir camisi, ince minare. Fotoğraflar Dağıstan’dan: Kalininaul, Kızlar, Buynaksk.",
       "tags": [
        "cami",
        "minare",
        "Dağıstan"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-bud",
       "title": "Stupa ve datsan",
       "badge": "Tapınak",
       "set": "ru-yer-bud",
       "ids": [
        "ru-bu",
        "ru-ty",
        "ru-kl",
        "ru-zab"
       ],
       "sub": "Beyaz sivri stupalar ve çok katlı çatılı ahşap tapınak. Fotoğraflar Buryatya’dan: Kijinga, Sanaga, Zakamensk.",
       "tags": [
        "stupa",
        "datsan",
        "Buryatya"
       ],
       "quiz": false
      },
      {
       "id": "ru-yer-volkan",
       "title": "Kamçatka volkanları",
       "badge": "Manzara",
       "set": "ru-yer-volkan",
       "ids": [
        "ru-kam"
       ],
       "sub": "Petropavlovsk-Kamçatski’nin üstünde Avaçinsky, Koryaksky, Kozelsky ve Vilyuçinsky volkanları.",
       "tags": [
        "volkan",
        "Kamçatka"
       ],
       "quiz": false
      }
     ],
     "practice": "visual"
    }
   ]
   });
})(typeof window !== 'undefined' ? window : globalThis);

/* packs/mexico.js — Meksika: telefon bölge kodları (LADA) ve bölgeyi gösteren bitki ile manzara
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "mexico",
   "name": "Meksika",
   "code": "MX",
   "area": "Kuzey Amerika",
   "tone": "violet",
   "geoVar": "MX_GEO",
   "themeId": "mx",
   "themeCfg": {
    "aria": "Meksika haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.",
    "fit": "Tüm Meksika’yı göster",
    "grid": {
     "lat": [
      14,
      34,
      4
     ],
     "lon": [
      -120,
      -84,
      4
     ],
     "txt": [
      16,
      32,
      4
     ],
     "refLon": -102,
     "refLat": 24
    },
    "excludeWorld": [
     "Mexico"
    ],
    "bg": [
     [
      -102,
      35.8,
      "ABD",
      "c"
     ],
     [
      -90.4,
      15.6,
      "GUATEMALA",
      "c"
     ],
     [
      -88.6,
      17.2,
      "BELİZE",
      "c"
     ],
     [
      -91.5,
      25,
      "Meksika Körfezi",
      "s"
     ],
     [
      -111,
      17.5,
      "Pasifik Okyanusu",
      "s"
     ],
     [
      -110.5,
      25.5,
      "Kaliforniya Körfezi",
      "s"
     ],
     [
      -85.5,
      20,
      "Karayip Denizi",
      "s"
     ]
    ]
   },
   "srsPrefix": "mx",
   "simKmScale": 520,
   "maxFitZoom": 8,
   "labelSize": 8.8,
   "unitLabel": "eyalet",
   "unitLabelCap": "Eyalet",
   "codeLabel": "Telefon kodu",
   "codePrefix": 1,
   "codeModeLabel": "Kodun ilk rakamı",
   "line": "31 eyalet + Mexico City · telefon bölge kodu (LADA), bölgeyi gösteren bitki ve manzara",
   "blurb": "İki şey işe yarar: duvardaki telefon numarasının bölge kodu (LADA) ve bölgeyi gösteren bitki ile manzara (dev sütun kaktüs, sıralı agave tarlası, sazlı Maya evi, uzaktaki karlı volkan). İlk rakam büyük bölgeyi, tam kod eyaleti verir.",
   "overviewLead": "32 eyaleti haritada öğren; kartta eyaletin başlıca telefon kodları yazar. Bölgesel görünüm konusunda bitkiyi ve manzarayı eyaletle eşleştirirsin.",
   "regions": [
    {
     "id": "noroeste",
     "tr": "Kuzeybatı",
     "key": "KB",
     "color": 2,
     "cue": "Baja California, Baja California Sur, Sonora, Sinaloa, Chihuahua, Durango. Kodlar 6 ile başlar."
    },
    {
     "id": "noreste",
     "tr": "Kuzeydoğu",
     "key": "KD",
     "color": 5,
     "cue": "Nuevo León, Coahuila, Tamaulipas. Kodlar 8 ile başlar."
    },
    {
     "id": "occidente",
     "tr": "Batı ve Bajío",
     "key": "BAT",
     "color": 0,
     "cue": "Jalisco, Colima, Nayarit, Michoacán ve iç kesimdeki Bajío eyaletleri. Kodlar 3 ve 4 ile başlar."
    },
    {
     "id": "centro",
     "tr": "Merkez",
     "key": "MRK",
     "color": 1,
     "cue": "Mexico City, Edomex, Puebla, Hidalgo, Morelos, Tlaxcala. Kodlar 2, 5 ve 7 ile başlar."
    },
    {
     "id": "sur",
     "tr": "Güney ve Körfez",
     "key": "GUN",
     "color": 4,
     "cue": "Guerrero, Oaxaca, Chiapas, Tabasco, Veracruz."
    },
    {
     "id": "yucatan",
     "tr": "Yucatán Yarımadası",
     "key": "YUC",
     "color": 7,
     "cue": "Yucatán, Quintana Roo, Campeche. Kodlar 9 ile başlar."
    }
   ],
   "units": [
    {
     "id": "dif",
     "name": "Ciudad de México (CDMX)",
     "short": "CDMX",
     "local": "",
     "cap": "Ciudad de México",
     "reg": "centro",
     "codes": [
      "55",
      "56"
     ],
     "cue": "Başlıca kodlar: 55 Ciudad de México ve çevresi."
    },
    {
     "id": "agu",
     "name": "Aguascalientes",
     "short": "Aguasc.",
     "local": "",
     "cap": "Aguascalientes",
     "reg": "occidente",
     "codes": [
      "449"
     ],
     "cue": "Başlıca kodlar: 449 Aguascalientes."
    },
    {
     "id": "bcn",
     "name": "Baja California",
     "short": "Baja Cal.",
     "local": "",
     "cap": "Mexicali",
     "reg": "noroeste",
     "codes": [
      "664",
      "686",
      "646"
     ],
     "cue": "Başlıca kodlar: 664 Tijuana, 686 Mexicali, 646 Ensenada. Manzara: cirio (ince, sivrilen tek gövde) ve cardón çölü."
    },
    {
     "id": "bcs",
     "name": "Baja California Sur",
     "short": "BCS",
     "local": "",
     "cap": "La Paz",
     "reg": "noroeste",
     "codes": [
      "612",
      "624"
     ],
     "cue": "Başlıca kodlar: 612 La Paz, 624 Los Cabos."
    },
    {
     "id": "cam",
     "name": "Campeche",
     "short": "Campeche",
     "local": "",
     "cap": "San Francisco de Campeche",
     "reg": "yucatan",
     "codes": [
      "981",
      "938"
     ],
     "cue": "Başlıca kodlar: 981 Campeche şehri, 938 Ciudad del Carmen."
    },
    {
     "id": "chp",
     "name": "Chiapas",
     "short": "Chiapas",
     "local": "",
     "cap": "Tuxtla Gutiérrez",
     "reg": "sur",
     "codes": [
      "961",
      "967",
      "962"
     ],
     "cue": "Başlıca kodlar: 961 Tuxtla Gutiérrez, 967 San Cristóbal de las Casas, 962 Tapachula."
    },
    {
     "id": "chh",
     "name": "Chihuahua",
     "short": "Chihuahua",
     "local": "",
     "cap": "Chihuahua",
     "reg": "noroeste",
     "codes": [
      "614",
      "656"
     ],
     "cue": "Başlıca kodlar: 614 Chihuahua şehri, 656 Ciudad Juárez. Manzara: Barrancas del Cobre'nin derin kanyonları."
    },
    {
     "id": "coa",
     "name": "Coahuila",
     "short": "Coahuila",
     "local": "",
     "cap": "Saltillo",
     "reg": "noreste",
     "codes": [
      "844",
      "871",
      "866"
     ],
     "cue": "Başlıca kodlar: 844 Saltillo, 871 Torreón, 866 Monclova. Manzara: Cuatro Ciénegas'ta beyaz alçı kumulları."
    },
    {
     "id": "col",
     "name": "Colima",
     "short": "Colima",
     "local": "",
     "cap": "Colima",
     "reg": "occidente",
     "codes": [
      "312",
      "314"
     ],
     "cue": "Başlıca kodlar: 312 Colima, 314 Manzanillo."
    },
    {
     "id": "dur",
     "name": "Durango",
     "short": "Durango",
     "local": "",
     "cap": "Victoria de Durango",
     "reg": "noroeste",
     "codes": [
      "618",
      "871"
     ],
     "cue": "Başlıca kodlar: 618 Durango şehri, 871 Torreón."
    },
    {
     "id": "mex",
     "name": "Estado de México (Edomex)",
     "short": "Edomex",
     "local": "",
     "cap": "Toluca",
     "reg": "centro",
     "codes": [
      "55",
      "56",
      "722"
     ],
     "cue": "Başlıca kodlar: 55 Ciudad de México ve çevresi, 722 Toluca."
    },
    {
     "id": "gua",
     "name": "Guanajuato",
     "short": "Guanajuato",
     "local": "",
     "cap": "Guanajuato",
     "reg": "occidente",
     "codes": [
      "477",
      "473",
      "462",
      "461"
     ],
     "cue": "Başlıca kodlar: 477 León, 473 Guanajuato şehri, 462 Irapuato, 461 Celaya."
    },
    {
     "id": "gro",
     "name": "Guerrero",
     "short": "Guerrero",
     "local": "",
     "cap": "Chilpancingo",
     "reg": "sur",
     "codes": [
      "744",
      "747",
      "755"
     ],
     "cue": "Başlıca kodlar: 744 Acapulco, 747 Chilpancingo, 755 Zihuatanejo."
    },
    {
     "id": "hid",
     "name": "Hidalgo",
     "short": "Hidalgo",
     "local": "",
     "cap": "Pachuca",
     "reg": "centro",
     "codes": [
      "771"
     ],
     "cue": "Başlıca kodlar: 771 Pachuca."
    },
    {
     "id": "jal",
     "name": "Jalisco",
     "short": "Jalisco",
     "local": "",
     "cap": "Guadalajara",
     "reg": "occidente",
     "codes": [
      "33",
      "322",
      "341"
     ],
     "cue": "Başlıca kodlar: 33 Guadalajara, 322 Puerto Vallarta, 341 Ciudad Guzmán."
    },
    {
     "id": "mic",
     "name": "Michoacán",
     "short": "Michoacán",
     "local": "",
     "cap": "Morelia",
     "reg": "occidente",
     "codes": [
      "443",
      "452",
      "351"
     ],
     "cue": "Başlıca kodlar: 443 Morelia, 452 Uruapan, 351 Zamora."
    },
    {
     "id": "mor",
     "name": "Morelos",
     "short": "Morelos",
     "local": "",
     "cap": "Cuernavaca",
     "reg": "centro",
     "codes": [
      "777",
      "735"
     ],
     "cue": "Başlıca kodlar: 777 Cuernavaca, 735 Cuautla."
    },
    {
     "id": "nay",
     "name": "Nayarit",
     "short": "Nayarit",
     "local": "",
     "cap": "Tepic",
     "reg": "occidente",
     "codes": [
      "311",
      "322"
     ],
     "cue": "Başlıca kodlar: 311 Tepic, 322 Puerto Vallarta."
    },
    {
     "id": "nle",
     "name": "Nuevo León",
     "short": "Nuevo León",
     "local": "",
     "cap": "Monterrey",
     "reg": "noreste",
     "codes": [
      "81"
     ],
     "cue": "Başlıca kodlar: 81 Monterrey."
    },
    {
     "id": "oax",
     "name": "Oaxaca",
     "short": "Oaxaca",
     "local": "",
     "cap": "Oaxaca de Juárez",
     "reg": "sur",
     "codes": [
      "951",
      "958"
     ],
     "cue": "Başlıca kodlar: 951 Oaxaca şehri, 958 Huatulco. Manzara: Tehuantepec Kıstağı'nda rüzgâr türbinleri ve rüzgârla yan yatmış ağaçlar."
    },
    {
     "id": "pue",
     "name": "Puebla",
     "short": "Puebla",
     "local": "",
     "cap": "Puebla",
     "reg": "centro",
     "codes": [
      "222",
      "221",
      "220"
     ],
     "cue": "Başlıca kodlar: 222 Puebla."
    },
    {
     "id": "que",
     "name": "Querétaro",
     "short": "Querétaro",
     "local": "",
     "cap": "Santiago de Querétaro",
     "reg": "occidente",
     "codes": [
      "442"
     ],
     "cue": "Başlıca kodlar: 442 Querétaro."
    },
    {
     "id": "roo",
     "name": "Quintana Roo",
     "short": "Q. Roo",
     "local": "",
     "cap": "Chetumal",
     "reg": "yucatan",
     "codes": [
      "998",
      "984",
      "983",
      "987"
     ],
     "cue": "Başlıca kodlar: 998 Cancún, 984 Playa del Carmen, 983 Chetumal, 987 Cozumel."
    },
    {
     "id": "slp",
     "name": "San Luis Potosí",
     "short": "SLP",
     "local": "",
     "cap": "San Luis Potosí",
     "reg": "occidente",
     "codes": [
      "444",
      "481"
     ],
     "cue": "Başlıca kodlar: 444 San Luis Potosí, 481 Ciudad Valles."
    },
    {
     "id": "sin",
     "name": "Sinaloa",
     "short": "Sinaloa",
     "local": "",
     "cap": "Culiacán",
     "reg": "noroeste",
     "codes": [
      "667",
      "669",
      "668"
     ],
     "cue": "Başlıca kodlar: 667 Culiacán, 669 Mazatlán, 668 Los Mochis."
    },
    {
     "id": "son",
     "name": "Sonora",
     "short": "Sonora",
     "local": "",
     "cap": "Hermosillo",
     "reg": "noroeste",
     "codes": [
      "662",
      "644",
      "631"
     ],
     "cue": "Başlıca kodlar: 662 Hermosillo, 644 Ciudad Obregón, 631 Nogales."
    },
    {
     "id": "tab",
     "name": "Tabasco",
     "short": "Tabasco",
     "local": "",
     "cap": "Villahermosa",
     "reg": "sur",
     "codes": [
      "993"
     ],
     "cue": "Başlıca kodlar: 993 Villahermosa. Manzara: geniş nehirler ve yeşil sulak alan (Pantanos de Centla)."
    },
    {
     "id": "tam",
     "name": "Tamaulipas",
     "short": "Tamaulipas",
     "local": "",
     "cap": "Ciudad Victoria",
     "reg": "noreste",
     "codes": [
      "833",
      "899",
      "868",
      "867",
      "834"
     ],
     "cue": "Başlıca kodlar: 833 Tampico, 899 Reynosa, 868 Matamoros, 867 Nuevo Laredo, 834 Ciudad Victoria."
    },
    {
     "id": "tla",
     "name": "Tlaxcala",
     "short": "Tlaxcala",
     "local": "",
     "cap": "Tlaxcala",
     "reg": "centro",
     "codes": [
      "246",
      "241"
     ],
     "cue": "Başlıca kodlar: 246 Tlaxcala."
    },
    {
     "id": "ver",
     "name": "Veracruz",
     "short": "Veracruz",
     "local": "",
     "cap": "Xalapa",
     "reg": "sur",
     "codes": [
      "229",
      "228",
      "921",
      "922"
     ],
     "cue": "Başlıca kodlar: 229 Veracruz şehri, 228 Xalapa, 921 Coatzacoalcos, 922 Minatitlán."
    },
    {
     "id": "yuc",
     "name": "Yucatán",
     "short": "Yucatán",
     "local": "",
     "cap": "Mérida",
     "reg": "yucatan",
     "codes": [
      "999",
      "985"
     ],
     "cue": "Başlıca kodlar: 999 Mérida, 985 Valladolid. Manzara: taşlı zeminde henequén (kılıç yapraklı agave) tarlaları."
    },
    {
     "id": "zac",
     "name": "Zacatecas",
     "short": "Zacatecas",
     "local": "",
     "cap": "Zacatecas",
     "reg": "occidente",
     "codes": [
      "492",
      "493"
     ],
     "cue": "Başlıca kodlar: 492 Zacatecas."
    }
   ],
   "topics": [
    {
     "key": "lada",
     "navLabel": "Telefon kodu",
     "icon": "phone",
     "drillPreset": "code",
     "mapMode": "code",
     "labelMode": "code",
     "title": "Duvardaki telefon numarası (LADA)",
     "lead": "Meksika'da dükkân duvarlarında, kamyon kasalarında ve tabelalarda telefon numarası çok görülür: (999) 925-1234. Ağustos 2019'dan beri numaralar 10 hanelidir. Mexico City, Guadalajara ve Monterrey'in bölge kodu 2 haneli, geri kalan yerlerde 3 hanelidir. Kodun ilk rakamı ülkeyi sekiz büyük bölgeye böler; tam kodu bilirsen eyalet netleşir.",
     "desc": "(999) Mérida, (33) Guadalajara… Telefon kodundan eyaleti bul.",
     "decoder": {
      "title": "Bölge kodu",
      "placeholder": "Örn. 999, 33, 664 ya da şehir adı…",
      "hint": "Numaranın başındaki 2 ya da 3 haneyi yaz (başta 01, 044, 045 varsa onları sayma); eyalet haritada boyanır.",
      "quizPrompt": "Bu bölge kodu hangi eyalette?",
      "noHit": "Bu kod listede yok. Burada yalnız başlıca şehir kodları var; ilk rakama göre bölgeyi daralt.",
      "entries": [
       {
        "key": "55",
        "label": "55 → Ciudad de México ve çevresi (55 ve 56)",
        "sub": "Eyalet: Ciudad de México (CDMX), Estado de México (Edomex).",
        "keys": [
         "(55)",
         "56",
         "ciudad de méxico ve çevresi (55 ve 56)"
        ],
        "ids": [
         "dif",
         "mex"
        ],
        "main": "55"
       },
       {
        "key": "33",
        "label": "33 → Guadalajara",
        "sub": "Eyalet: Jalisco.",
        "keys": [
         "(33)",
         "guadalajara"
        ],
        "ids": [
         "jal"
        ],
        "main": "33"
       },
       {
        "key": "81",
        "label": "81 → Monterrey",
        "sub": "Eyalet: Nuevo León.",
        "keys": [
         "(81)",
         "monterrey"
        ],
        "ids": [
         "nle"
        ],
        "main": "81"
       },
       {
        "key": "222",
        "label": "222 → Puebla (220, 221, 222)",
        "sub": "Eyalet: Puebla.",
        "keys": [
         "(222)",
         "221",
         "220",
         "puebla (220, 221, 222)"
        ],
        "ids": [
         "pue"
        ],
        "main": "222"
       },
       {
        "key": "229",
        "label": "229 → Veracruz şehri",
        "sub": "Eyalet: Veracruz.",
        "keys": [
         "(229)",
         "veracruz şehri"
        ],
        "ids": [
         "ver"
        ],
        "main": "229"
       },
       {
        "key": "228",
        "label": "228 → Xalapa",
        "sub": "Eyalet: Veracruz.",
        "keys": [
         "(228)",
         "xalapa"
        ],
        "ids": [
         "ver"
        ],
        "main": "228"
       },
       {
        "key": "921",
        "label": "921 → Coatzacoalcos",
        "sub": "Eyalet: Veracruz.",
        "keys": [
         "(921)",
         "coatzacoalcos"
        ],
        "ids": [
         "ver"
        ],
        "main": "921",
        "quiz": false
       },
       {
        "key": "922",
        "label": "922 → Minatitlán",
        "sub": "Eyalet: Veracruz.",
        "keys": [
         "(922)",
         "minatitlán"
        ],
        "ids": [
         "ver"
        ],
        "main": "922",
        "quiz": false
       },
       {
        "key": "246",
        "label": "246 → Tlaxcala",
        "sub": "Eyalet: Tlaxcala.",
        "keys": [
         "(246)",
         "tlaxcala"
        ],
        "ids": [
         "tla"
        ],
        "main": "246"
       },
       {
        "key": "722",
        "label": "722 → Toluca",
        "sub": "Eyalet: Estado de México (Edomex).",
        "keys": [
         "(722)",
         "toluca"
        ],
        "ids": [
         "mex"
        ],
        "main": "722"
       },
       {
        "key": "777",
        "label": "777 → Cuernavaca",
        "sub": "Eyalet: Morelos.",
        "keys": [
         "(777)",
         "cuernavaca"
        ],
        "ids": [
         "mor"
        ],
        "main": "777"
       },
       {
        "key": "735",
        "label": "735 → Cuautla",
        "sub": "Eyalet: Morelos.",
        "keys": [
         "(735)",
         "cuautla"
        ],
        "ids": [
         "mor"
        ],
        "main": "735",
        "quiz": false
       },
       {
        "key": "771",
        "label": "771 → Pachuca",
        "sub": "Eyalet: Hidalgo.",
        "keys": [
         "(771)",
         "pachuca"
        ],
        "ids": [
         "hid"
        ],
        "main": "771"
       },
       {
        "key": "744",
        "label": "744 → Acapulco",
        "sub": "Eyalet: Guerrero.",
        "keys": [
         "(744)",
         "acapulco"
        ],
        "ids": [
         "gro"
        ],
        "main": "744"
       },
       {
        "key": "747",
        "label": "747 → Chilpancingo",
        "sub": "Eyalet: Guerrero.",
        "keys": [
         "(747)",
         "chilpancingo"
        ],
        "ids": [
         "gro"
        ],
        "main": "747",
        "quiz": false
       },
       {
        "key": "755",
        "label": "755 → Zihuatanejo (Ixtapa)",
        "sub": "Eyalet: Guerrero.",
        "keys": [
         "(755)",
         "zihuatanejo (ixtapa)"
        ],
        "ids": [
         "gro"
        ],
        "main": "755",
        "quiz": false
       },
       {
        "key": "442",
        "label": "442 → Querétaro",
        "sub": "Eyalet: Querétaro.",
        "keys": [
         "(442)",
         "querétaro"
        ],
        "ids": [
         "que"
        ],
        "main": "442"
       },
       {
        "key": "443",
        "label": "443 → Morelia",
        "sub": "Eyalet: Michoacán.",
        "keys": [
         "(443)",
         "morelia"
        ],
        "ids": [
         "mic"
        ],
        "main": "443"
       },
       {
        "key": "444",
        "label": "444 → San Luis Potosí",
        "sub": "Eyalet: San Luis Potosí.",
        "keys": [
         "(444)",
         "san luis potosí"
        ],
        "ids": [
         "slp"
        ],
        "main": "444"
       },
       {
        "key": "449",
        "label": "449 → Aguascalientes",
        "sub": "Eyalet: Aguascalientes.",
        "keys": [
         "(449)",
         "aguascalientes"
        ],
        "ids": [
         "agu"
        ],
        "main": "449"
       },
       {
        "key": "477",
        "label": "477 → León",
        "sub": "Eyalet: Guanajuato.",
        "keys": [
         "(477)",
         "león"
        ],
        "ids": [
         "gua"
        ],
        "main": "477"
       },
       {
        "key": "473",
        "label": "473 → Guanajuato şehri",
        "sub": "Eyalet: Guanajuato.",
        "keys": [
         "(473)",
         "guanajuato şehri"
        ],
        "ids": [
         "gua"
        ],
        "main": "473"
       },
       {
        "key": "462",
        "label": "462 → Irapuato",
        "sub": "Eyalet: Guanajuato.",
        "keys": [
         "(462)",
         "irapuato"
        ],
        "ids": [
         "gua"
        ],
        "main": "462",
        "quiz": false
       },
       {
        "key": "461",
        "label": "461 → Celaya",
        "sub": "Eyalet: Guanajuato.",
        "keys": [
         "(461)",
         "celaya"
        ],
        "ids": [
         "gua"
        ],
        "main": "461",
        "quiz": false
       },
       {
        "key": "415",
        "label": "415 → San Miguel de Allende",
        "sub": "Eyalet: Guanajuato.",
        "keys": [
         "(415)",
         "san miguel de allende"
        ],
        "ids": [
         "gua"
        ],
        "main": "415",
        "quiz": false
       },
       {
        "key": "492",
        "label": "492 → Zacatecas",
        "sub": "Eyalet: Zacatecas.",
        "keys": [
         "(492)",
         "zacatecas"
        ],
        "ids": [
         "zac"
        ],
        "main": "492"
       },
       {
        "key": "452",
        "label": "452 → Uruapan",
        "sub": "Eyalet: Michoacán.",
        "keys": [
         "(452)",
         "uruapan"
        ],
        "ids": [
         "mic"
        ],
        "main": "452",
        "quiz": false
       },
       {
        "key": "351",
        "label": "351 → Zamora",
        "sub": "Eyalet: Michoacán.",
        "keys": [
         "(351)",
         "zamora"
        ],
        "ids": [
         "mic"
        ],
        "main": "351",
        "quiz": false
       },
       {
        "key": "481",
        "label": "481 → Ciudad Valles",
        "sub": "Eyalet: San Luis Potosí.",
        "keys": [
         "(481)",
         "ciudad valles"
        ],
        "ids": [
         "slp"
        ],
        "main": "481",
        "quiz": false
       },
       {
        "key": "312",
        "label": "312 → Colima",
        "sub": "Eyalet: Colima.",
        "keys": [
         "(312)",
         "colima"
        ],
        "ids": [
         "col"
        ],
        "main": "312"
       },
       {
        "key": "314",
        "label": "314 → Manzanillo",
        "sub": "Eyalet: Colima.",
        "keys": [
         "(314)",
         "manzanillo"
        ],
        "ids": [
         "col"
        ],
        "main": "314",
        "quiz": false
       },
       {
        "key": "311",
        "label": "311 → Tepic",
        "sub": "Eyalet: Nayarit.",
        "keys": [
         "(311)",
         "tepic"
        ],
        "ids": [
         "nay"
        ],
        "main": "311"
       },
       {
        "key": "322",
        "label": "322 → Puerto Vallarta (Jalisco) ve Bahía de Banderas (Nayarit)",
        "sub": "Eyalet: Jalisco, Nayarit.",
        "keys": [
         "(322)",
         "puerto vallarta (jalisco) ve bahía de banderas (nayarit)"
        ],
        "ids": [
         "jal",
         "nay"
        ],
        "main": "322"
       },
       {
        "key": "341",
        "label": "341 → Ciudad Guzmán",
        "sub": "Eyalet: Jalisco.",
        "keys": [
         "(341)",
         "ciudad guzmán"
        ],
        "ids": [
         "jal"
        ],
        "main": "341",
        "quiz": false
       },
       {
        "key": "664",
        "label": "664 → Tijuana",
        "sub": "Eyalet: Baja California.",
        "keys": [
         "(664)",
         "tijuana"
        ],
        "ids": [
         "bcn"
        ],
        "main": "664"
       },
       {
        "key": "686",
        "label": "686 → Mexicali",
        "sub": "Eyalet: Baja California.",
        "keys": [
         "(686)",
         "mexicali"
        ],
        "ids": [
         "bcn"
        ],
        "main": "686"
       },
       {
        "key": "646",
        "label": "646 → Ensenada",
        "sub": "Eyalet: Baja California.",
        "keys": [
         "(646)",
         "ensenada"
        ],
        "ids": [
         "bcn"
        ],
        "main": "646",
        "quiz": false
       },
       {
        "key": "612",
        "label": "612 → La Paz",
        "sub": "Eyalet: Baja California Sur.",
        "keys": [
         "(612)",
         "la paz"
        ],
        "ids": [
         "bcs"
        ],
        "main": "612"
       },
       {
        "key": "624",
        "label": "624 → Los Cabos",
        "sub": "Eyalet: Baja California Sur.",
        "keys": [
         "(624)",
         "los cabos"
        ],
        "ids": [
         "bcs"
        ],
        "main": "624"
       },
       {
        "key": "662",
        "label": "662 → Hermosillo",
        "sub": "Eyalet: Sonora.",
        "keys": [
         "(662)",
         "hermosillo"
        ],
        "ids": [
         "son"
        ],
        "main": "662"
       },
       {
        "key": "644",
        "label": "644 → Ciudad Obregón",
        "sub": "Eyalet: Sonora.",
        "keys": [
         "(644)",
         "ciudad obregón"
        ],
        "ids": [
         "son"
        ],
        "main": "644",
        "quiz": false
       },
       {
        "key": "631",
        "label": "631 → Nogales",
        "sub": "Eyalet: Sonora.",
        "keys": [
         "(631)",
         "nogales"
        ],
        "ids": [
         "son"
        ],
        "main": "631",
        "quiz": false
       },
       {
        "key": "614",
        "label": "614 → Chihuahua şehri",
        "sub": "Eyalet: Chihuahua.",
        "keys": [
         "(614)",
         "chihuahua şehri"
        ],
        "ids": [
         "chh"
        ],
        "main": "614"
       },
       {
        "key": "656",
        "label": "656 → Ciudad Juárez",
        "sub": "Eyalet: Chihuahua.",
        "keys": [
         "(656)",
         "ciudad juárez"
        ],
        "ids": [
         "chh"
        ],
        "main": "656"
       },
       {
        "key": "667",
        "label": "667 → Culiacán",
        "sub": "Eyalet: Sinaloa.",
        "keys": [
         "(667)",
         "culiacán"
        ],
        "ids": [
         "sin"
        ],
        "main": "667"
       },
       {
        "key": "669",
        "label": "669 → Mazatlán",
        "sub": "Eyalet: Sinaloa.",
        "keys": [
         "(669)",
         "mazatlán"
        ],
        "ids": [
         "sin"
        ],
        "main": "669"
       },
       {
        "key": "668",
        "label": "668 → Los Mochis",
        "sub": "Eyalet: Sinaloa.",
        "keys": [
         "(668)",
         "los mochis"
        ],
        "ids": [
         "sin"
        ],
        "main": "668",
        "quiz": false
       },
       {
        "key": "618",
        "label": "618 → Durango şehri",
        "sub": "Eyalet: Durango.",
        "keys": [
         "(618)",
         "durango şehri"
        ],
        "ids": [
         "dur"
        ],
        "main": "618"
       },
       {
        "key": "844",
        "label": "844 → Saltillo",
        "sub": "Eyalet: Coahuila.",
        "keys": [
         "(844)",
         "saltillo"
        ],
        "ids": [
         "coa"
        ],
        "main": "844"
       },
       {
        "key": "871",
        "label": "871 → Torreón (Coahuila) ve Gómez Palacio (Durango)",
        "sub": "Eyalet: Coahuila, Durango.",
        "keys": [
         "(871)",
         "torreón (coahuila) ve gómez palacio (durango)"
        ],
        "ids": [
         "coa",
         "dur"
        ],
        "main": "871"
       },
       {
        "key": "866",
        "label": "866 → Monclova",
        "sub": "Eyalet: Coahuila.",
        "keys": [
         "(866)",
         "monclova"
        ],
        "ids": [
         "coa"
        ],
        "main": "866",
        "quiz": false
       },
       {
        "key": "867",
        "label": "867 → Nuevo Laredo",
        "sub": "Eyalet: Tamaulipas.",
        "keys": [
         "(867)",
         "nuevo laredo"
        ],
        "ids": [
         "tam"
        ],
        "main": "867"
       },
       {
        "key": "868",
        "label": "868 → Matamoros",
        "sub": "Eyalet: Tamaulipas.",
        "keys": [
         "(868)",
         "matamoros"
        ],
        "ids": [
         "tam"
        ],
        "main": "868",
        "quiz": false
       },
       {
        "key": "899",
        "label": "899 → Reynosa",
        "sub": "Eyalet: Tamaulipas.",
        "keys": [
         "(899)",
         "reynosa"
        ],
        "ids": [
         "tam"
        ],
        "main": "899"
       },
       {
        "key": "833",
        "label": "833 → Tampico",
        "sub": "Eyalet: Tamaulipas.",
        "keys": [
         "(833)",
         "tampico"
        ],
        "ids": [
         "tam"
        ],
        "main": "833"
       },
       {
        "key": "834",
        "label": "834 → Ciudad Victoria",
        "sub": "Eyalet: Tamaulipas.",
        "keys": [
         "(834)",
         "ciudad victoria"
        ],
        "ids": [
         "tam"
        ],
        "main": "834",
        "quiz": false
       },
       {
        "key": "951",
        "label": "951 → Oaxaca şehri",
        "sub": "Eyalet: Oaxaca.",
        "keys": [
         "(951)",
         "oaxaca şehri"
        ],
        "ids": [
         "oax"
        ],
        "main": "951"
       },
       {
        "key": "958",
        "label": "958 → Huatulco",
        "sub": "Eyalet: Oaxaca.",
        "keys": [
         "(958)",
         "huatulco"
        ],
        "ids": [
         "oax"
        ],
        "main": "958",
        "quiz": false
       },
       {
        "key": "961",
        "label": "961 → Tuxtla Gutiérrez",
        "sub": "Eyalet: Chiapas.",
        "keys": [
         "(961)",
         "tuxtla gutiérrez"
        ],
        "ids": [
         "chp"
        ],
        "main": "961"
       },
       {
        "key": "967",
        "label": "967 → San Cristóbal de las Casas",
        "sub": "Eyalet: Chiapas.",
        "keys": [
         "(967)",
         "san cristóbal de las casas"
        ],
        "ids": [
         "chp"
        ],
        "main": "967"
       },
       {
        "key": "962",
        "label": "962 → Tapachula",
        "sub": "Eyalet: Chiapas.",
        "keys": [
         "(962)",
         "tapachula"
        ],
        "ids": [
         "chp"
        ],
        "main": "962",
        "quiz": false
       },
       {
        "key": "993",
        "label": "993 → Villahermosa",
        "sub": "Eyalet: Tabasco.",
        "keys": [
         "(993)",
         "villahermosa"
        ],
        "ids": [
         "tab"
        ],
        "main": "993"
       },
       {
        "key": "981",
        "label": "981 → Campeche şehri",
        "sub": "Eyalet: Campeche.",
        "keys": [
         "(981)",
         "campeche şehri"
        ],
        "ids": [
         "cam"
        ],
        "main": "981"
       },
       {
        "key": "938",
        "label": "938 → Ciudad del Carmen",
        "sub": "Eyalet: Campeche.",
        "keys": [
         "(938)",
         "ciudad del carmen"
        ],
        "ids": [
         "cam"
        ],
        "main": "938",
        "quiz": false
       },
       {
        "key": "999",
        "label": "999 → Mérida",
        "sub": "Eyalet: Yucatán.",
        "keys": [
         "(999)",
         "mérida"
        ],
        "ids": [
         "yuc"
        ],
        "main": "999"
       },
       {
        "key": "985",
        "label": "985 → Valladolid",
        "sub": "Eyalet: Yucatán.",
        "keys": [
         "(985)",
         "valladolid"
        ],
        "ids": [
         "yuc"
        ],
        "main": "985",
        "quiz": false
       },
       {
        "key": "998",
        "label": "998 → Cancún",
        "sub": "Eyalet: Quintana Roo.",
        "keys": [
         "(998)",
         "cancún"
        ],
        "ids": [
         "roo"
        ],
        "main": "998"
       },
       {
        "key": "984",
        "label": "984 → Playa del Carmen",
        "sub": "Eyalet: Quintana Roo.",
        "keys": [
         "(984)",
         "playa del carmen"
        ],
        "ids": [
         "roo"
        ],
        "main": "984"
       },
       {
        "key": "983",
        "label": "983 → Chetumal",
        "sub": "Eyalet: Quintana Roo.",
        "keys": [
         "(983)",
         "chetumal"
        ],
        "ids": [
         "roo"
        ],
        "main": "983"
       },
       {
        "key": "987",
        "label": "987 → Cozumel",
        "sub": "Eyalet: Quintana Roo.",
        "keys": [
         "(987)",
         "cozumel"
        ],
        "ids": [
         "roo"
        ],
        "main": "987",
        "quiz": false
       }
      ]
     },
     "flows": [
      {
       "title": "Önce kodu ayır",
       "body": "Numara 10 hanelidir. Başındaki +52 ya da 52'yi atla. Mexico City'de ilk 2 hane (55 ya da 56), Guadalajara'da 33, Monterrey'de 81 koddur; diğer yerlerde ilk 3 hane koddur. 2019'dan önce yazılmış numaralarda başta 01, 044 ya da 045 olabilir; bunları sayma."
      },
      {
       "title": "İlk rakam bölgeyi verir",
       "body": "2 doğu (Puebla, Veracruz). 3 batı (Jalisco, Colima, Nayarit). 4 Bajío ve kuzey-merkez. 5 Mexico City. 6 kuzeybatı. 7 güney-merkez (Guerrero, Morelos, Hidalgo). 8 kuzeydoğu. 9 güneydoğu (Yucatán, Chiapas, Tabasco, Oaxaca). Bölgeler sınırlarda taşar: bazı eyaletlerin kodları birden çok rakamla başlar."
      },
      {
       "title": "Tam kodu eyalete çevir",
       "body": "Büyük şehir kodlarını (aşağıdaki liste ve Pratik) ezberle. Bilmediğin bir kodda ilk rakamla bölgeyi bul, gördüğün manzaraya ve plakaya bakarak eyaleti seç."
      }
     ],
     "bandsTitle": "İlk rakama göre",
     "bandsHint": "dokun → eyaletler boyanır",
     "bands": [
      {
       "cls": "q7",
       "key": "2x",
       "title": "Doğu",
       "sub": "Puebla 222 · Veracruz şehri 229 · Xalapa 228 · Tlaxcala 246. Oaxaca'nın kuzeyindeki bazı kodlar da 2 ile başlar.",
       "ids": [
        "pue",
        "tla",
        "ver"
       ]
      },
      {
       "cls": "q5",
       "key": "3x",
       "title": "Batı",
       "sub": "Guadalajara 33 · Colima 312 · Tepic 311 · Puerto Vallarta 322. Michoacán ve Zacatecas'ın bazı kodları da 3 ile başlar.",
       "ids": [
        "jal",
        "col",
        "nay"
       ]
      },
      {
       "cls": "q1",
       "key": "4x",
       "title": "Bajío ve kuzey-merkez",
       "sub": "Querétaro 442 · Morelia 443 · San Luis Potosí 444 · Aguascalientes 449 · León 477 · Zacatecas 492.",
       "ids": [
        "que",
        "mic",
        "slp",
        "agu",
        "gua",
        "zac"
       ]
      },
      {
       "cls": "q0",
       "key": "5x",
       "title": "Merkez",
       "sub": "Yalnız Mexico City ve çevresi: 55 ve 56. Edomex'in metropol kısmı da bu kodu kullanır.",
       "ids": [
        "dif",
        "mex"
       ]
      },
      {
       "cls": "q2",
       "key": "6x",
       "title": "Kuzeybatı",
       "sub": "La Paz 612 · Chihuahua 614 · Durango 618 · Hermosillo 662 · Tijuana 664 · Culiacán 667 · Mexicali 686.",
       "ids": [
        "bcn",
        "bcs",
        "son",
        "chh",
        "sin",
        "dur"
       ]
      },
      {
       "cls": "q6",
       "key": "7x",
       "title": "Güney-merkez",
       "sub": "Toluca 722 · Acapulco 744 · Pachuca 771 · Cuernavaca 777. Puebla, Oaxaca ve Veracruz'ın bazı kodları da 7 ile başlar.",
       "ids": [
        "gro",
        "mor",
        "hid"
       ]
      },
      {
       "cls": "q4",
       "key": "8x",
       "title": "Kuzeydoğu",
       "sub": "Monterrey 81 · Tampico 833 · Saltillo 844 · Nuevo Laredo 867 · Torreón 871.",
       "ids": [
        "nle",
        "coa",
        "tam"
       ]
      },
      {
       "cls": "q3",
       "key": "9x",
       "title": "Güneydoğu",
       "sub": "Oaxaca 951 · Tuxtla 961 · Campeche 981 · Villahermosa 993 · Cancún 998 · Mérida 999.",
       "ids": [
        "oax",
        "chp",
        "tab",
        "cam",
        "roo",
        "yuc"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "Bir kod iki eyaletin olabilir",
       "ids": [
        "dif",
        "mex",
        "jal",
        "nay",
        "coa",
        "dur"
       ],
       "body": "55 ve 56 yalnız CDMX'in değil, Edomex'in metropol ilçelerinin de kodudur. 322 hem Puerto Vallarta'yı (Jalisco) hem Bahía de Banderas'ı (Nayarit) kapsar. 871 hem Torreón'u (Coahuila) hem Gómez Palacio'yu (Durango) kapsar.",
       "traps": [
        [
         "55 / 56",
         "CDMX ve Edomex"
        ],
        [
         "322",
         "Jalisco ve Nayarit"
        ],
        [
         "871",
         "Coahuila ve Durango"
        ]
       ]
      },
      {
       "title": "4x: Bajío'nun beş büyük kodu",
       "ids": [
        "que",
        "mic",
        "slp",
        "agu",
        "gua",
        "zac"
       ],
       "body": "442 Querétaro, 443 Morelia (Michoacán), 444 San Luis Potosí, 449 Aguascalientes, 477 León (Guanajuato), 492 Zacatecas. 44x tek eyalet değildir: 443 Michoacán'dır.",
       "traps": [
        [
         "442",
         "Querétaro"
        ],
        [
         "443",
         "Morelia (Michoacán)"
        ],
        [
         "444",
         "San Luis Potosí"
        ],
        [
         "449",
         "Aguascalientes"
        ]
       ]
      },
      {
       "title": "7x: güney-merkezin üç başkenti",
       "ids": [
        "mex",
        "hid",
        "mor",
        "gro"
       ],
       "body": "722 Toluca (Edomex), 771 Pachuca (Hidalgo), 777 Cuernavaca (Morelos). Guerrero'da 744 Acapulco ve 747 Chilpancingo. Üçü de 7 ile başlar, ama aynı eyalet değil.",
       "traps": [
        [
         "722",
         "Toluca (Edomex)"
        ],
        [
         "771",
         "Pachuca (Hidalgo)"
        ],
        [
         "777",
         "Cuernavaca (Morelos)"
        ],
        [
         "744",
         "Acapulco (Guerrero)"
        ]
       ]
      },
      {
       "title": "9x: Yucatán Yarımadası",
       "ids": [
        "yuc",
        "roo",
        "cam",
        "tab"
       ],
       "body": "999 Mérida (Yucatán). 998 Cancún, 984 Playa del Carmen ve 983 Chetumal (Quintana Roo). 981 Campeche. 993 Villahermosa (Tabasco). Rakamları sırayla karıştırma: 998 Cancún, 999 Mérida.",
       "traps": [
        [
         "999",
         "Mérida (Yucatán)"
        ],
        [
         "998",
         "Cancún (Q. Roo)"
        ],
        [
         "981",
         "Campeche"
        ],
        [
         "993",
         "Villahermosa (Tabasco)"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "mx-lada",
       "title": "Telefon numarası: bölge kodu nerede?",
       "badge": "Çizim ve fotoğraf",
       "set": "mx-lada1",
       "ids": [
        "dif",
        "agu",
        "bcn",
        "bcs",
        "cam",
        "chp",
        "chh",
        "coa",
        "col",
        "dur",
        "mex",
        "gua",
        "gro",
        "hid",
        "jal",
        "mic",
        "mor",
        "nay",
        "nle",
        "oax",
        "pue",
        "que",
        "roo",
        "slp",
        "sin",
        "son",
        "tab",
        "tam",
        "tla",
        "ver",
        "yuc",
        "zac"
       ],
       "sub": "Parantez içindeki 2 ya da 3 hane bölge kodudur: Mexico City, Guadalajara ve Monterrey dışında üç hane. Başındaki 01, 044 ve 045 eski öneklerdir ve sayılmaz. Gerçek tabelalarda çoğu zaman yalnız yerel numara bulunur; cep numarasında 044 sonrasındaki üç hane (322 gibi) bölge kodudur.",
       "tags": [
        "(999)",
        "(55)",
        "01"
       ],
       "quiz": false
      }
     ],
     "visualsTitle": "Numara tabelada nerede? "
    },
    {
     "key": "yerel",
     "navLabel": "Bölgesel görünüm",
     "icon": "camera",
     "drillPreset": "yerel",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Bölgeyi gösteren bitki ve manzara",
     "lead": "Meksika’da direk ve tabela bölgeyi pek ayırmaz; bölgeyi çoğu zaman bitki ve manzara söyler. Kuzeybatıda dev sütun kaktüsler, Jalisco’da sıralı mavi agave tarlaları, Yucatán Yarımadası’nda tepesiz düz ova ve sazlı Maya evleri, merkezde uzaktaki karlı volkanlar. Kurak kuzeyde cirio, alçı kumulları ve derin kanyonlar; güneydoğuda henequén tarlaları, Tabasco sulak alanları ve Oaxaca’nın rüzgâr türbinleri ayırt edicidir. Önce kaktüse, sonra arazinin biçimine bak.",
     "desc": "Kaktüsten, agavadan ve arazinin biçiminden bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. cardón, agave, Maya evi, karlı volkan…",
      "hint": "Gördüğün ipucunu yaz: hangi eyaletlerde görüldüğü haritada boyanır.",
      "quizPrompt": "Bu görünüm hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Cardón",
        "label": "Kalın gövde, yerden alçakta ayrılan dik dallar (cardón kaktüsü) → Baja California yarımadası ve Sonora kıyısı",
        "sub": "Dünyanın en uzun kaktüsüdür (kayıtlı en yüksek boy 19,2 m). Gövde 1 m’ye kadar kalınlaşır, yan dallar gövde kadar iri olabilir. Baja California ve Baja California Sur’da yaygındır; Sonora’da kıyıda (Guaymas’a kadar) ve Körfez adalarında bulunur.",
        "keys": [
         "cardón",
         "cardon",
         "kardon",
         "pachycereus",
         "dev kaktüs",
         "sütun kaktüs",
         "dallı kaktüs"
        ],
        "ids": [
         "bcs",
         "bcn",
         "son"
        ],
        "main": "Cardón",
        "prompt": "Yerden alçakta ayrılan kalın dik dallı dev cardón kaktüsü hangi bölgenin işaretidir?"
       },
       {
        "key": "Saguaro",
        "label": "İnce düz sütun, dirsek yapıp yukarı dönen kollar (saguaro) → yalnızca Sonora",
        "sub": "Meksika’da yalnızca batı Sonora’da yetişir (Arizona’da da). Baja California yarımadasında doğal olarak yoktur; orada gördüğün dev kaktüs cardón’dur. Sonora tarafında ikisi karışık büyür. Kollar dirsek yapıp yukarı bükülür; bazı bitkilerde hiç kol olmaz.",
        "keys": [
         "saguaro",
         "sahuaro",
         "carnegiea",
         "kollu kaktüs",
         "dirsekli kaktüs"
        ],
        "ids": [
         "son"
        ],
        "main": "Saguaro",
        "prompt": "Kolları dirsek yapıp yukarı dönen ince sütun kaktüs (saguaro) hangi eyaletin işaretidir?"
       },
       {
        "key": "Agave tarlası",
        "label": "Düzgün sıralı mavi agave tarlaları, kırmızı toprak → Jalisco (Tequila çevresi)",
        "sub": "Mavi agave (Agave tequilana) tekilanın tek hammaddesidir; tarlada geniş aralıklı sıralar halinde durur ve kabaca 6–8 yılda olgunlaşır. Üretimin merkezi Jalisco’dur; tekilanın menşe adı Jalisco’nun tamamını, ayrıca Guanajuato, Michoacán, Nayarit ve Tamaulipas’ın bazı belediyelerini kapsar. Jalisco yaylalarında toprak demirli kırmızıdır; Tequila Vadisi’nde daha koyudur.",
        "keys": [
         "agave",
         "agave tarlası",
         "mavi agave",
         "tekila",
         "tequila",
         "azul",
         "weber",
         "tequila vadisi"
        ],
        "ids": [
         "jal",
         "nay",
         "mic",
         "gua"
        ],
        "main": "Agave tarlası",
        "prompt": "Düzgün sıralı mavi agave tarlaları (tekilanın hammaddesi) en çok hangi eyaletin işaretidir?"
       },
       {
        "key": "Maya evi",
        "label": "Sazla örtülü, uçları yuvarlak, kil sıvalı tek odalı ev → Yucatán Yarımadası (Yucatán, Campeche, Quintana Roo)",
        "sub": "Çatı örülmüş huano palmiyesidir ve saçak duvarın dışına taşar. Duvar dikey sırık ve çubuktan yapılır, yerel kille (çoğu zaman kırmızı) sıvanır; altta kireç harçlı taş bir kaide vardır. Kapı ön duvarın ortasındadır. Bu evler Yucatán Yarımadası’nın kırsalında görülür. Çizim şematiktir.",
        "keys": [
         "maya evi",
         "maya",
         "sazlı ev",
         "saz çatı",
         "huano",
         "palapa",
         "casa maya",
         "oval ev"
        ],
        "ids": [
         "yuc",
         "cam",
         "roo"
        ],
        "main": "Maya evi",
        "prompt": "Sazla örtülü, uçları yuvarlak, kil sıvalı tek odalı ev (Maya evi) hangi bölgenin işaretidir?"
       },
       {
        "key": "Düz, alçak orman",
        "label": "Tepesiz düz ova, alçak yaprak döken orman → Yucatán Yarımadası (Yucatán, Campeche, Quintana Roo)",
        "sub": "Yarımadanın kuzeybatısı çok alçak, neredeyse düz bir kireçtaşı ovadır; yüzeyde neredeyse hiç akarsu yoktur, su yeraltından ve cenote denen çöküntülerden gelir. Alçak yaprak döken ormanda ağaçların çoğu 8–15 m boydadır ve uzun kuru mevsimde yapraklarını döker.",
        "keys": [
         "düz",
         "düz ova",
         "alçak orman",
         "yaprak döken",
         "kireçtaşı",
         "karst",
         "cenote",
         "yucatán ovası"
        ],
        "ids": [
         "yuc",
         "cam",
         "roo"
        ],
        "main": "Düz, alçak orman",
        "prompt": "Hiç tepesi olmayan düz ova ve alçak yaprak döken orman hangi bölgenin işaretidir?"
       },
       {
        "key": "Karlı volkan",
        "label": "Uzakta karla kaplı konik volkan → Merkez (Puebla, Veracruz, Edomex, Morelos, Tlaxcala)",
        "sub": "Meksika’nın en yüksek zirveleri merkezdeki volkanlardır: Pico de Orizaba (Puebla–Veracruz sınırı, ülkenin en yüksek noktası), Popocatépetl (Edomex–Morelos–Puebla sınırı) ve Iztaccíhuatl (Edomex–Puebla sınırı; Nahuatlca “beyaz kadın”, dört karlı tepesi uyuyan bir kadını andırır). Mexico City’den açık havada görülürler. La Malinche (Tlaxcala) ve Nevado de Toluca (Edomex) de aynı volkan kuşağındadır.",
        "keys": [
         "volkan",
         "karlı volkan",
         "kar",
         "popocatépetl",
         "popocatepetl",
         "iztaccíhuatl",
         "iztaccihuatl",
         "orizaba",
         "pico de orizaba",
         "citlaltépetl",
         "la malinche",
         "nevado de toluca"
        ],
        "ids": [
         "pue",
         "ver",
         "mex",
         "mor",
         "tla",
         "dif"
        ],
        "main": "Karlı volkan",
        "prompt": "Karla kaplı, konik yüksek volkanlar en çok hangi bölgenin işaretidir?"
       },
       {
        "key": "Kurak iç plato",
        "label": "Düz havza, alçak seyrek çalı (gobernadora), yucca ve agave → Kuzey iç kesim (Chihuahua, Coahuila, Durango, Zacatecas, Nuevo León, San Luis Potosí, Tamaulipas’ın iç yaylası)",
        "sub": "Chihuahua Çölü’nün baskın bitkisi gobernadora denen kreozot çalısıdır; lechuguilla agavesi kılavuz bitkilerinden biridir. Merkez platoda izote ve chocha gibi yucca’lar da bulunur. Dev sütun kaktüsler yoksa ve çalılık alçaksa Sonora Çölü’nü değil, bu iç kesimi düşün.",
        "keys": [
         "çöl",
         "chihuahua çölü",
         "gobernadora",
         "kreozot",
         "lechuguilla",
         "yucca",
         "izote",
         "kurak",
         "plato",
         "çalılık"
        ],
        "ids": [
         "chh",
         "coa",
         "dur",
         "zac",
         "nle",
         "slp",
         "tam"
        ],
        "main": "Kurak iç plato",
        "prompt": "Alçak seyrek çalı, yucca ve agavelerle kaplı kurak düz havza hangi bölgenin işaretidir?"
       },
       {
        "key": "Çam–meşe dağları",
        "label": "Çam ve meşe ormanlı yüksek, az asfalt yollu dağlar → Sierra Madre Occidental (Sonora, Chihuahua, Sinaloa, Durango, Zacatecas, Nayarit, Jalisco, Aguascalientes)",
        "sub": "Çam–meşe ormanı bu sıradağlarda en yaygın bitki örtüsüdür (yaklaşık 1.250–3.200 m); dağları az sayıda asfalt yol keser. Benzer ormanlar Meksika’nın başka dağlarında da bulunur; bu yüzden çam tek başına eyalet vermez, yalnızca bölgeyi daraltır.",
        "keys": [
         "çam",
         "meşe",
         "çam ormanı",
         "sierra madre",
         "sierra madre occidental",
         "dağ ormanı"
        ],
        "ids": [
         "son",
         "chh",
         "sin",
         "dur",
         "zac",
         "nay",
         "jal",
         "agu"
        ],
        "main": "Çam–meşe dağları",
        "prompt": "Çam ve meşe ormanlı yüksek sıradağlar en çok hangi bölgede geniş yer tutar?",
        "quiz": false
       },
       {
        "key": "Cirio",
        "label": "İnce, sivrilen, dikenli tek gövdeli bitki (cirio) → Baja California (Cataviña çevresi)",
        "sub": "Cirio (boojum, Fouquieria columnaris) ters çevrilmiş havuca benzeyen ince, tepeye doğru incelen, dikenli tek gövdesiyle tanınır. Fotoğraf Baja California Yarımadası'nda Cataviña çevresinden. Cardón'dan farkı: dalsız ya da çok az dallı, çok ince.",
        "keys": [
         "cirio",
         "boojum",
         "cataviña",
         "cataviña",
         "baja",
         "fouquieria",
         "havuç"
        ],
        "ids": [
         "bcn"
        ],
        "main": "Cirio",
        "prompt": "İnce, sivrilen, dikenli tek gövdeli cirio bitkisi hangi eyaletin işaretidir?"
       },
       {
        "key": "Alçı kumulu",
        "label": "Beyaz alçı kumulları ve kuru dağlar → Coahuila (Cuatro Ciénegas)",
        "sub": "Cuatro Ciénegas havzasında kum kuvars değil alçıdır; kumullar ve yer parlak beyazdır. Çevre kuru dağlarla çevrilidir.",
        "keys": [
         "alçı",
         "beyaz kum",
         "gypsum",
         "cuatro ciénegas",
         "cuatrocienegas",
         "kumul",
         "coahuila"
        ],
        "ids": [
         "coa"
        ],
        "main": "Alçı kumulu",
        "prompt": "Beyaz alçı kumulları hangi eyaletin işaretidir?"
       },
       {
        "key": "Rüzgâr türbinleri",
        "label": "Düz ovada sıralı rüzgâr türbinleri ve rüzgârla yan yatmış ağaçlar → Oaxaca (Tehuantepec Kıstağı)",
        "sub": "Tehuantepec Kıstağı'nda (La Ventosa, La Venta) rüzgâr çok güçlüdür: ovada dizi dizi türbin ve rüzgârın yönüne eğilmiş ağaçlar görülür. Fotoğraflar La Ventosa'dan.",
        "keys": [
         "rüzgar",
         "rüzgâr",
         "türbin",
         "la ventosa",
         "la venta",
         "tehuantepec",
         "eolik",
         "kıstak",
         "istmo"
        ],
        "ids": [
         "oax"
        ],
        "main": "Rüzgâr türbinleri",
        "prompt": "Düz ovada sıralı rüzgâr türbinleri ve yan yatmış ağaçlar hangi eyaletin işaretidir?"
       },
       {
        "key": "Henequén tarlası",
        "label": "Taşlı zeminde kılıç yapraklı agave (henequén) tarlası → Yucatán",
        "sub": "Henequén (sisal agavesi) uzun, sivri, kılıç gibi yapraklı bir agavedir; Yucatán'da kayalık zeminde tarlalar halinde yetişir. Fotoğraflar Telchac Puerto'dan.",
        "keys": [
         "henequén",
         "henequen",
         "sisal",
         "agave",
         "kılıç",
         "yucatán",
         "telchac"
        ],
        "ids": [
         "yuc"
        ],
        "main": "Henequén tarlası",
        "prompt": "Taşlı zeminde kılıç yapraklı henequén tarlaları hangi eyaletin işaretidir?"
       },
       {
        "key": "Sulak alan",
        "label": "Geniş nehir ve yeşil sulak alan, saz çatılı kulübeler → Tabasco (Pantanos de Centla)",
        "sub": "Tabasco'nun kıyı ovası geniş nehirler ve alçak sulak alanlarla kaplıdır. Fotoğraf Pantanos de Centla Biyosfer Rezervi'nden (Tres Brazos).",
        "keys": [
         "bataklık",
         "sulak alan",
         "nehir",
         "centla",
         "pantanos",
         "tabasco",
         "mangrov"
        ],
        "ids": [
         "tab"
        ],
        "main": "Sulak alan",
        "prompt": "Geniş nehir ve yeşil sulak alan (Pantanos de Centla) hangi eyaletin işaretidir?"
       },
       {
        "key": "Derin kanyon",
        "label": "Derin, ağaçlı yamaçlı kanyon (Barrancas del Cobre) → Chihuahua",
        "sub": "Sierra Madre Occidental'in Chihuahua kesiminde dik duvarlı, derin kanyonlar. Kuzey Meksika'da çam–meşe dağlarının yanında bu derin yarıklar ayırt edicidir.",
        "keys": [
         "kanyon",
         "barrancas",
         "cobre",
         "copper canyon",
         "chihuahua",
         "urique"
        ],
        "ids": [
         "chh"
        ],
        "main": "Derin kanyon",
        "prompt": "Derin, dik duvarlı Barrancas del Cobre kanyonu hangi eyaletin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce kaktüse ve toprağa bak",
       "body": "Dev sütun kaktüs görüyorsan Baja California ya da Sonora’dasın. Dallar alçaktan ayrılıp dik yükseliyorsa cardón (Baja California, Baja California Sur, Sonora kıyısı); kollar dirsek yapıp yukarı dönüyorsa saguaro (yalnızca Sonora). Düzgün sıralı mavi agave tarlası: Jalisco."
      },
      {
       "title": "Düz mü, karlı mı, çamlı mı?",
       "body": "Hiç tepe yoksa ve orman alçaksa Yucatán Yarımadası. Uzakta karlı koni: Puebla, Veracruz, Edomex, Morelos ve Tlaxcala çevresindeki volkanlar. Çamlı yüksek dağlar: Sierra Madre Occidental (kuzeybatı ve batı), ama çam tek başına yetmez."
      },
      {
       "title": "Kurak kuzey iç kesim",
       "body": "Dev kaktüs yok; alçak seyrek çalı, yucca ve agave var: Chihuahua, Coahuila, Durango, Zacatecas, Nuevo León ve San Luis Potosí’nin kurak iç kesimi."
      },
      {
       "title": "Güneydoğuyu ayır",
       "body": "Tepesiz düz ova ve alçak orman, taşlı zeminde henequén: Yucatán Yarımadası. Geniş nehirler ve alçak sulak alan: Tabasco. Düz ovada sıralı rüzgâr türbinleri ve eğik ağaçlar: Oaxaca'nın Tehuantepec Kıstağı. Üçü de ova gibi görünür; bitkiye ve türbine bak."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Cardón mu saguaro mu?",
       "ids": [
        "bcn",
        "bcs",
        "son"
       ],
       "body": "İkisi de dev sütun kaktüstür. Cardón kalın gövdeli, ağaca benzer; dalları yerden alçakta ayrılır ve dik yükselir. Saguaro daha ince bir sütundur ve kolları dirsek yapıp yukarı döner. Saguaro Baja California’da doğal olarak yoktur; oradaki dev kaktüs cardón’dur.",
       "traps": [
        [
         "Kalın gövde, alçaktan ayrılan dik dallar",
         "cardón (Baja California, Baja California Sur, Sonora kıyısı)"
        ],
        [
         "İnce sütun, dirsek yapıp yukarı dönen kollar",
         "saguaro (yalnızca Sonora)"
        ],
        [
         "İkisi aynı yerde",
         "Sonora (kıyı ve batısı)"
        ]
       ]
      },
      {
       "title": "Hangi çöl?",
       "ids": [
        "bcn",
        "bcs",
        "son",
        "chh",
        "coa",
        "dur",
        "zac",
        "nle",
        "slp"
       ],
       "body": "Kuzeyde iki ayrı kurak bölge vardır. Dev sütun kaktüsler (cardón, saguaro) Sonora Çölü’nün işaretidir: Baja California, Baja California Sur ve Sonora. Alçak seyrek çalı (gobernadora), yucca ve agave iç kesimdeki Chihuahua Çölü’nün ve merkez platonun işaretidir.",
       "traps": [
        [
         "Dev sütun kaktüs",
         "Sonora Çölü: Baja California, Baja California Sur, Sonora"
        ],
        [
         "Alçak çalı, yucca, agave",
         "Chihuahua Çölü ve merkez plato: Chihuahua, Coahuila, Durango, Zacatecas, Nuevo León, San Luis Potosí"
        ]
       ]
      },
      {
       "title": "Güneydoğuda hangi ova?",
       "ids": [
        "yuc",
        "cam",
        "roo",
        "tab",
        "oax"
       ],
       "body": "Güneydoğu kıyı ovaları ilk bakışta benzer. Kayalık zemin, alçak orman ve agave Yucatán'dır; geniş nehir ve sulak alan Tabasco'dur; sıralı türbinler Oaxaca'dır.",
       "traps": [
        [
         "Taşlı zeminde kılıç yapraklı agave, alçak orman",
         "Yucatán"
        ],
        [
         "Geniş nehir, yeşil sulak alan",
         "Tabasco"
        ],
        [
         "Sıralı rüzgâr türbini, yan yatmış ağaçlar",
         "Oaxaca (Tehuantepec Kıstağı)"
        ]
       ]
      },
      {
       "title": "Kuzey: sütun kaktüs, cirio ya da alçı",
       "ids": [
        "bcn",
        "bcs",
        "son",
        "coa",
        "chh"
       ],
       "body": "Kurak kuzeyde de ipuçları ayrıdır: kalın sütun kaktüs (cardón, saguaro) Sonora Çölü'ne; çok ince tek gövde (cirio) Baja California'ya; beyaz alçı kumulları Coahuila'ya; derin kanyon Chihuahua'ya işaret eder.",
       "traps": [
        [
         "Kalın sütun kaktüs",
         "Baja California, Baja California Sur, Sonora"
        ],
        [
         "İnce, sivrilen tek gövde (cirio)",
         "Baja California (Cataviña)"
        ],
        [
         "Beyaz alçı kumulları",
         "Coahuila (Cuatro Ciénegas)"
        ],
        [
         "Dik duvarlı derin kanyon",
         "Chihuahua (Barrancas del Cobre)"
        ]
       ]
      }
     ],
     "visualsTitle": "Nasıl görünür? ",
     "visuals": [
      {
       "id": "mx-cardon",
       "title": "Cardón ve saguaro",
       "badge": "Kaktüs",
       "set": "mx-cardon1",
       "ids": [
        "bcn",
        "bcs",
        "son"
       ],
       "sub": "Cardón: kalın gövde, alçaktan ayrılan dik dallar (Baja California, Sonora kıyısı). Saguaro: ince sütun, dirsek yapıp yukarı dönen kollar (yalnızca Sonora).",
       "tags": [
        "cardón",
        "saguaro",
        "kaktüs"
       ],
       "quiz": false
      },
      {
       "id": "mx-agave",
       "title": "Mavi agave tarlası",
       "badge": "Agave",
       "set": "mx-agave1",
       "ids": [
        "jal",
        "nay",
        "mic",
        "gua"
       ],
       "sub": "Geniş aralıklı düzgün sıralar, mavi-turkuaz yapraklar, kırmızı toprak. Üretimin merkezi Jalisco.",
       "tags": [
        "agave",
        "tekila",
        "Jalisco"
       ],
       "quiz": false
      },
      {
       "id": "mx-maya",
       "title": "Maya evi ve düz ova",
       "badge": "Yapı",
       "set": "mx-maya1",
       "ids": [
        "yuc",
        "cam",
        "roo"
       ],
       "sub": "Sazlı çatı, yuvarlak uçlar, kil sıvalı duvar; arkada tepesiz, alçak orman (Yucatán Yarımadası).",
       "tags": [
        "maya",
        "saz",
        "Yucatán"
       ],
       "quiz": false
      },
      {
       "id": "mx-volkan",
       "title": "Karlı volkan",
       "badge": "Volkan",
       "set": "mx-volcan",
       "ids": [
        "pue",
        "ver",
        "mex",
        "mor",
        "tla",
        "dif"
       ],
       "sub": "Uzakta kar örtülü, simetrik koni: Pico de Orizaba, Popocatépetl, Iztaccíhuatl. Merkezdeki volkan kuşağının işareti.",
       "tags": [
        "volkan",
        "kar",
        "Orizaba"
       ]
      },
      {
       "id": "mx-plato",
       "title": "Kurak iç plato",
       "badge": "Çöl",
       "set": "mx-plato",
       "ids": [
        "chh",
        "coa",
        "dur",
        "zac",
        "nle",
        "slp",
        "tam"
       ],
       "sub": "Alçak, seyrek çalılık ve çıplak zemin; dev sütun kaktüs yok. Chihuahua Çölü ve kuzey iç plato. Yeni fotoğraf Tamaulipas’ın iç kesiminden (Tula).",
       "tags": [
        "çöl",
        "çalılık",
        "Chihuahua"
       ]
      },
      {
       "id": "mx-cirio",
       "title": "Baja California: cirio",
       "badge": "Cirio",
       "set": "mx-cirio",
       "ids": [
        "bcn"
       ],
       "sub": "Ters havuç gibi ince, dikenli tek gövde. Fotoğraf Cataviña çevresinden.",
       "tags": [
        "cirio",
        "Baja California"
       ]
      },
      {
       "id": "mx-yeso",
       "title": "Coahuila: alçı kumulları",
       "badge": "Alçı",
       "set": "mx-yeso",
       "ids": [
        "coa"
       ],
       "sub": "Cuatro Ciénegas'ta beyaz alçı kumulları.",
       "tags": [
        "alçı",
        "Coahuila"
       ]
      },
      {
       "id": "mx-viento",
       "title": "Oaxaca: rüzgâr türbinleri (La Ventosa)",
       "badge": "Rüzgâr",
       "set": "mx-viento",
       "ids": [
        "oax"
       ],
       "sub": "Düz ovada sıralı türbinler; rüzgârla yan yatmış ağaçlar.",
       "tags": [
        "rüzgâr",
        "Oaxaca"
       ]
      },
      {
       "id": "mx-henequen",
       "title": "Yucatán: henequén tarlası",
       "badge": "Henequén",
       "set": "mx-henequen",
       "ids": [
        "yuc"
       ],
       "sub": "Kılıç yapraklı agave, taşlı zemin, taş duvar ve alçak orman. Telchac Puerto.",
       "tags": [
        "henequén",
        "Yucatán"
       ]
      },
      {
       "id": "mx-centla",
       "title": "Tabasco: Pantanos de Centla",
       "badge": "Sulak alan",
       "set": "mx-centla",
       "ids": [
        "tab"
       ],
       "sub": "Geniş nehir ve yeşil sulak alan.",
       "tags": [
        "sulak alan",
        "Tabasco"
       ]
      },
      {
       "id": "mx-canon",
       "title": "Chihuahua: Barrancas del Cobre",
       "badge": "Kanyon",
       "set": "mx-canon",
       "ids": [
        "chh"
       ],
       "sub": "Derin kanyon, dik duvarlar ve ağaçlı yamaçlar.",
       "tags": [
        "kanyon",
        "Chihuahua"
       ]
      }
     ],
     "practice": "visual"
    }
   ]
  });
})(typeof window !== 'undefined' ? window : globalThis);

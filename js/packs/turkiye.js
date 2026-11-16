/* packs/turkiye.js — Türkiye: telefon alan kodu, belediye adı (levha ve rögar kapağı), bölgesel görünüm
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "turkiye",
   "name": "Türkiye",
   "code": "TR",
   "area": "Avrupa ve Avrasya",
   "tone": "red",
   "geoVar": "TR_GEO",
   "themeId": "th-turkiye",
   "themeCfg": {
    "aria": "Türkiye 81 il haritası",
    "fit": "Tüm Türkiye’yi göster",
    "grid": {
     "lat": [
      35,
      43,
      2
     ],
     "lon": [
      25,
      46,
      3
     ],
     "txt": [
      36,
      42,
      2
     ],
     "refLon": 35,
     "refLat": 39
    },
    "excludeWorld": [
     "Turkey",
     "Greece",
     "Bulgaria",
     "Georgia",
     "Syria",
     "Iraq",
     "Iran",
     "Armenia"
    ],
    "bg": [
     [
      34,
      43,
      "Karadeniz",
      "s"
     ],
     [
      25.2,
      38.8,
      "Ege Denizi",
      "s"
     ],
     [
      31.5,
      35.4,
      "Akdeniz",
      "s"
     ],
     [
      23.2,
      41.2,
      "YUNANİSTAN",
      "c"
     ],
     [
      25.5,
      42.3,
      "BULGARİSTAN",
      "c"
     ],
     [
      43.5,
      42.1,
      "GÜRCİSTAN",
      "c"
     ],
     [
      38.5,
      35.8,
      "SURİYE",
      "c"
     ],
     [
      43.2,
      36.6,
      "IRAK",
      "c"
     ],
     [
      45.4,
      38.2,
      "İRAN",
      "c"
     ]
    ]
   },
   "srsPrefix": "tr",
   "simKmScale": 520,
   "maxFitZoom": 7,
   "labelSize": 8.6,
   "unitLabel": "il",
   "unitLabelCap": "İl",
   "codeLabel": "Telefon kodu",
   "codePrefix": 1,
   "codeModeLabel": "Kodun ilk rakamı",
   "line": "81 il · alan kodu, belediye adı, bölgesel görünüm",
   "blurb": "Üç konu: tabeladaki telefon alan kodu; sokak levhası ve rögar kapağındaki belediye adı; çay, sera, taş yapı gibi bölgeyi gösteren görünümler.",
   "overviewLead": "81 ili haritada öğren; kartta ilin plaka numarası ve telefon alan kodu yazar.",
   "regions": [
    {
     "id": "marmara",
     "tr": "Marmara",
     "key": "MRM",
     "color": 0,
     "cue": "Kuzeybatı: İstanbul, Bursa, Trakya. Alan kodları 2 ile başlar."
    },
    {
     "id": "ege",
     "tr": "Ege",
     "key": "EGE",
     "color": 1,
     "cue": "Batı kıyısı ve iç Ege. Alan kodları 2 ile başlar."
    },
    {
     "id": "akdeniz",
     "tr": "Akdeniz",
     "key": "AKD",
     "color": 2,
     "cue": "Güney kıyısı: Antalya 2, Adana, Mersin, Hatay 3 ile başlar."
    },
    {
     "id": "icanadolu",
     "tr": "İç Anadolu",
     "key": "İÇA",
     "color": 3,
     "cue": "Ankara, Konya, Kayseri. Eskişehir 2, geri kalanı 3 ile başlar."
    },
    {
     "id": "karadeniz",
     "tr": "Karadeniz",
     "key": "KRD",
     "color": 4,
     "cue": "Kuzey kıyısı: Samsun'a kadar kodlar 3, Ordu'dan doğuya 4 ile başlar."
    },
    {
     "id": "doguanadolu",
     "tr": "Doğu Anadolu",
     "key": "DOĞ",
     "color": 5,
     "cue": "Erzurum, Van, Malatya. Kodlar 4 ile başlar."
    },
    {
     "id": "guneydogu",
     "tr": "Güneydoğu Anadolu",
     "key": "GDA",
     "color": 7,
     "cue": "Gaziantep, Diyarbakır, Mardin. Gaziantep ve Kilis 3, geri kalanı 4 ile başlar."
    }
   ],
   "units": [
    {
     "id": "01",
     "name": "Adana",
     "short": "Adana",
     "local": "",
     "cap": "Adana",
     "reg": "akdeniz",
     "codes": [
      "322"
     ],
     "cue": "Plaka 1. Alan kodu 322."
    },
    {
     "id": "02",
     "name": "Adıyaman",
     "short": "Adıyaman",
     "local": "",
     "cap": "Adıyaman",
     "reg": "guneydogu",
     "codes": [
      "416"
     ],
     "cue": "Plaka 2. Alan kodu 416."
    },
    {
     "id": "03",
     "name": "Afyonkarahisar",
     "short": "Afyon",
     "local": "",
     "cap": "Afyonkarahisar",
     "reg": "ege",
     "codes": [
      "272"
     ],
     "cue": "Plaka 3. Alan kodu 272."
    },
    {
     "id": "04",
     "name": "Ağrı",
     "short": "Ağrı",
     "local": "",
     "cap": "Ağrı",
     "reg": "doguanadolu",
     "codes": [
      "472"
     ],
     "cue": "Plaka 4. Alan kodu 472."
    },
    {
     "id": "05",
     "name": "Amasya",
     "short": "Amasya",
     "local": "",
     "cap": "Amasya",
     "reg": "karadeniz",
     "codes": [
      "358"
     ],
     "cue": "Plaka 5. Alan kodu 358."
    },
    {
     "id": "06",
     "name": "Ankara",
     "short": "Ankara",
     "local": "",
     "cap": "Ankara",
     "reg": "icanadolu",
     "codes": [
      "312"
     ],
     "cue": "Plaka 6. Alan kodu 312."
    },
    {
     "id": "07",
     "name": "Antalya",
     "short": "Antalya",
     "local": "",
     "cap": "Antalya",
     "reg": "akdeniz",
     "codes": [
      "242"
     ],
     "cue": "Plaka 7. Alan kodu 242."
    },
    {
     "id": "08",
     "name": "Artvin",
     "short": "Artvin",
     "local": "",
     "cap": "Artvin",
     "reg": "karadeniz",
     "codes": [
      "466"
     ],
     "cue": "Plaka 8. Alan kodu 466."
    },
    {
     "id": "09",
     "name": "Aydın",
     "short": "Aydın",
     "local": "",
     "cap": "Aydın",
     "reg": "ege",
     "codes": [
      "256"
     ],
     "cue": "Plaka 9. Alan kodu 256."
    },
    {
     "id": "10",
     "name": "Balıkesir",
     "short": "Balıkesir",
     "local": "",
     "cap": "Balıkesir",
     "reg": "marmara",
     "codes": [
      "266"
     ],
     "cue": "Plaka 10. Alan kodu 266."
    },
    {
     "id": "11",
     "name": "Bilecik",
     "short": "Bilecik",
     "local": "",
     "cap": "Bilecik",
     "reg": "marmara",
     "codes": [
      "228"
     ],
     "cue": "Plaka 11. Alan kodu 228."
    },
    {
     "id": "12",
     "name": "Bingöl",
     "short": "Bingöl",
     "local": "",
     "cap": "Bingöl",
     "reg": "doguanadolu",
     "codes": [
      "426"
     ],
     "cue": "Plaka 12. Alan kodu 426."
    },
    {
     "id": "13",
     "name": "Bitlis",
     "short": "Bitlis",
     "local": "",
     "cap": "Bitlis",
     "reg": "doguanadolu",
     "codes": [
      "434"
     ],
     "cue": "Plaka 13. Alan kodu 434."
    },
    {
     "id": "14",
     "name": "Bolu",
     "short": "Bolu",
     "local": "",
     "cap": "Bolu",
     "reg": "karadeniz",
     "codes": [
      "374"
     ],
     "cue": "Plaka 14. Alan kodu 374."
    },
    {
     "id": "15",
     "name": "Burdur",
     "short": "Burdur",
     "local": "",
     "cap": "Burdur",
     "reg": "akdeniz",
     "codes": [
      "248"
     ],
     "cue": "Plaka 15. Alan kodu 248."
    },
    {
     "id": "16",
     "name": "Bursa",
     "short": "Bursa",
     "local": "",
     "cap": "Bursa",
     "reg": "marmara",
     "codes": [
      "224"
     ],
     "cue": "Plaka 16. Alan kodu 224."
    },
    {
     "id": "17",
     "name": "Çanakkale",
     "short": "Çanakkale",
     "local": "",
     "cap": "Çanakkale",
     "reg": "marmara",
     "codes": [
      "286"
     ],
     "cue": "Plaka 17. Alan kodu 286."
    },
    {
     "id": "18",
     "name": "Çankırı",
     "short": "Çankırı",
     "local": "",
     "cap": "Çankırı",
     "reg": "icanadolu",
     "codes": [
      "376"
     ],
     "cue": "Plaka 18. Alan kodu 376."
    },
    {
     "id": "19",
     "name": "Çorum",
     "short": "Çorum",
     "local": "",
     "cap": "Çorum",
     "reg": "karadeniz",
     "codes": [
      "364"
     ],
     "cue": "Plaka 19. Alan kodu 364."
    },
    {
     "id": "20",
     "name": "Denizli",
     "short": "Denizli",
     "local": "",
     "cap": "Denizli",
     "reg": "ege",
     "codes": [
      "258"
     ],
     "cue": "Plaka 20. Alan kodu 258."
    },
    {
     "id": "21",
     "name": "Diyarbakır",
     "short": "Diyarbakır",
     "local": "",
     "cap": "Diyarbakır",
     "reg": "guneydogu",
     "codes": [
      "412"
     ],
     "cue": "Plaka 21. Alan kodu 412."
    },
    {
     "id": "22",
     "name": "Edirne",
     "short": "Edirne",
     "local": "",
     "cap": "Edirne",
     "reg": "marmara",
     "codes": [
      "284"
     ],
     "cue": "Plaka 22. Alan kodu 284."
    },
    {
     "id": "23",
     "name": "Elazığ",
     "short": "Elazığ",
     "local": "",
     "cap": "Elazığ",
     "reg": "doguanadolu",
     "codes": [
      "424"
     ],
     "cue": "Plaka 23. Alan kodu 424."
    },
    {
     "id": "24",
     "name": "Erzincan",
     "short": "Erzincan",
     "local": "",
     "cap": "Erzincan",
     "reg": "doguanadolu",
     "codes": [
      "446"
     ],
     "cue": "Plaka 24. Alan kodu 446."
    },
    {
     "id": "25",
     "name": "Erzurum",
     "short": "Erzurum",
     "local": "",
     "cap": "Erzurum",
     "reg": "doguanadolu",
     "codes": [
      "442"
     ],
     "cue": "Plaka 25. Alan kodu 442."
    },
    {
     "id": "26",
     "name": "Eskişehir",
     "short": "Eskişehir",
     "local": "",
     "cap": "Eskişehir",
     "reg": "icanadolu",
     "codes": [
      "222"
     ],
     "cue": "Plaka 26. Alan kodu 222."
    },
    {
     "id": "27",
     "name": "Gaziantep",
     "short": "Gaziantep",
     "local": "",
     "cap": "Gaziantep",
     "reg": "guneydogu",
     "codes": [
      "342"
     ],
     "cue": "Plaka 27. Alan kodu 342."
    },
    {
     "id": "28",
     "name": "Giresun",
     "short": "Giresun",
     "local": "",
     "cap": "Giresun",
     "reg": "karadeniz",
     "codes": [
      "454"
     ],
     "cue": "Plaka 28. Alan kodu 454."
    },
    {
     "id": "29",
     "name": "Gümüşhane",
     "short": "Gümüşhane",
     "local": "",
     "cap": "Gümüşhane",
     "reg": "karadeniz",
     "codes": [
      "456"
     ],
     "cue": "Plaka 29. Alan kodu 456."
    },
    {
     "id": "30",
     "name": "Hakkâri",
     "short": "Hakkâri",
     "local": "",
     "cap": "Hakkâri",
     "reg": "doguanadolu",
     "codes": [
      "438"
     ],
     "cue": "Plaka 30. Alan kodu 438."
    },
    {
     "id": "31",
     "name": "Hatay",
     "short": "Hatay",
     "local": "",
     "cap": "Hatay",
     "reg": "akdeniz",
     "codes": [
      "326"
     ],
     "cue": "Plaka 31. Alan kodu 326."
    },
    {
     "id": "32",
     "name": "Isparta",
     "short": "Isparta",
     "local": "",
     "cap": "Isparta",
     "reg": "akdeniz",
     "codes": [
      "246"
     ],
     "cue": "Plaka 32. Alan kodu 246."
    },
    {
     "id": "33",
     "name": "Mersin",
     "short": "Mersin",
     "local": "",
     "cap": "Mersin",
     "reg": "akdeniz",
     "codes": [
      "324"
     ],
     "cue": "Plaka 33. Alan kodu 324."
    },
    {
     "id": "34",
     "name": "İstanbul",
     "short": "İstanbul",
     "local": "",
     "cap": "İstanbul",
     "reg": "marmara",
     "codes": [
      "212",
      "216"
     ],
     "cue": "Plaka 34. Alan kodu 212 (Avrupa yakası) ve 216 (Anadolu yakası)."
    },
    {
     "id": "35",
     "name": "İzmir",
     "short": "İzmir",
     "local": "",
     "cap": "İzmir",
     "reg": "ege",
     "codes": [
      "232"
     ],
     "cue": "Plaka 35. Alan kodu 232."
    },
    {
     "id": "36",
     "name": "Kars",
     "short": "Kars",
     "local": "",
     "cap": "Kars",
     "reg": "doguanadolu",
     "codes": [
      "474"
     ],
     "cue": "Plaka 36. Alan kodu 474."
    },
    {
     "id": "37",
     "name": "Kastamonu",
     "short": "Kastamonu",
     "local": "",
     "cap": "Kastamonu",
     "reg": "karadeniz",
     "codes": [
      "366"
     ],
     "cue": "Plaka 37. Alan kodu 366."
    },
    {
     "id": "38",
     "name": "Kayseri",
     "short": "Kayseri",
     "local": "",
     "cap": "Kayseri",
     "reg": "icanadolu",
     "codes": [
      "352"
     ],
     "cue": "Plaka 38. Alan kodu 352."
    },
    {
     "id": "39",
     "name": "Kırklareli",
     "short": "Kırklareli",
     "local": "",
     "cap": "Kırklareli",
     "reg": "marmara",
     "codes": [
      "288"
     ],
     "cue": "Plaka 39. Alan kodu 288."
    },
    {
     "id": "40",
     "name": "Kırşehir",
     "short": "Kırşehir",
     "local": "",
     "cap": "Kırşehir",
     "reg": "icanadolu",
     "codes": [
      "386"
     ],
     "cue": "Plaka 40. Alan kodu 386."
    },
    {
     "id": "41",
     "name": "Kocaeli",
     "short": "Kocaeli",
     "local": "",
     "cap": "Kocaeli",
     "reg": "marmara",
     "codes": [
      "262"
     ],
     "cue": "Plaka 41. Alan kodu 262."
    },
    {
     "id": "42",
     "name": "Konya",
     "short": "Konya",
     "local": "",
     "cap": "Konya",
     "reg": "icanadolu",
     "codes": [
      "332"
     ],
     "cue": "Plaka 42. Alan kodu 332."
    },
    {
     "id": "43",
     "name": "Kütahya",
     "short": "Kütahya",
     "local": "",
     "cap": "Kütahya",
     "reg": "ege",
     "codes": [
      "274"
     ],
     "cue": "Plaka 43. Alan kodu 274."
    },
    {
     "id": "44",
     "name": "Malatya",
     "short": "Malatya",
     "local": "",
     "cap": "Malatya",
     "reg": "doguanadolu",
     "codes": [
      "422"
     ],
     "cue": "Plaka 44. Alan kodu 422."
    },
    {
     "id": "45",
     "name": "Manisa",
     "short": "Manisa",
     "local": "",
     "cap": "Manisa",
     "reg": "ege",
     "codes": [
      "236"
     ],
     "cue": "Plaka 45. Alan kodu 236."
    },
    {
     "id": "46",
     "name": "Kahramanmaraş",
     "short": "K.Maraş",
     "local": "",
     "cap": "Kahramanmaraş",
     "reg": "akdeniz",
     "codes": [
      "344"
     ],
     "cue": "Plaka 46. Alan kodu 344."
    },
    {
     "id": "47",
     "name": "Mardin",
     "short": "Mardin",
     "local": "",
     "cap": "Mardin",
     "reg": "guneydogu",
     "codes": [
      "482"
     ],
     "cue": "Plaka 47. Alan kodu 482."
    },
    {
     "id": "48",
     "name": "Muğla",
     "short": "Muğla",
     "local": "",
     "cap": "Muğla",
     "reg": "ege",
     "codes": [
      "252"
     ],
     "cue": "Plaka 48. Alan kodu 252."
    },
    {
     "id": "49",
     "name": "Muş",
     "short": "Muş",
     "local": "",
     "cap": "Muş",
     "reg": "doguanadolu",
     "codes": [
      "436"
     ],
     "cue": "Plaka 49. Alan kodu 436."
    },
    {
     "id": "50",
     "name": "Nevşehir",
     "short": "Nevşehir",
     "local": "",
     "cap": "Nevşehir",
     "reg": "icanadolu",
     "codes": [
      "384"
     ],
     "cue": "Plaka 50. Alan kodu 384."
    },
    {
     "id": "51",
     "name": "Niğde",
     "short": "Niğde",
     "local": "",
     "cap": "Niğde",
     "reg": "icanadolu",
     "codes": [
      "388"
     ],
     "cue": "Plaka 51. Alan kodu 388."
    },
    {
     "id": "52",
     "name": "Ordu",
     "short": "Ordu",
     "local": "",
     "cap": "Ordu",
     "reg": "karadeniz",
     "codes": [
      "452"
     ],
     "cue": "Plaka 52. Alan kodu 452."
    },
    {
     "id": "53",
     "name": "Rize",
     "short": "Rize",
     "local": "",
     "cap": "Rize",
     "reg": "karadeniz",
     "codes": [
      "464"
     ],
     "cue": "Plaka 53. Alan kodu 464."
    },
    {
     "id": "54",
     "name": "Sakarya",
     "short": "Sakarya",
     "local": "",
     "cap": "Sakarya",
     "reg": "marmara",
     "codes": [
      "264"
     ],
     "cue": "Plaka 54. Alan kodu 264."
    },
    {
     "id": "55",
     "name": "Samsun",
     "short": "Samsun",
     "local": "",
     "cap": "Samsun",
     "reg": "karadeniz",
     "codes": [
      "362"
     ],
     "cue": "Plaka 55. Alan kodu 362."
    },
    {
     "id": "56",
     "name": "Siirt",
     "short": "Siirt",
     "local": "",
     "cap": "Siirt",
     "reg": "guneydogu",
     "codes": [
      "484"
     ],
     "cue": "Plaka 56. Alan kodu 484."
    },
    {
     "id": "57",
     "name": "Sinop",
     "short": "Sinop",
     "local": "",
     "cap": "Sinop",
     "reg": "karadeniz",
     "codes": [
      "368"
     ],
     "cue": "Plaka 57. Alan kodu 368."
    },
    {
     "id": "58",
     "name": "Sivas",
     "short": "Sivas",
     "local": "",
     "cap": "Sivas",
     "reg": "icanadolu",
     "codes": [
      "346"
     ],
     "cue": "Plaka 58. Alan kodu 346."
    },
    {
     "id": "59",
     "name": "Tekirdağ",
     "short": "Tekirdağ",
     "local": "",
     "cap": "Tekirdağ",
     "reg": "marmara",
     "codes": [
      "282"
     ],
     "cue": "Plaka 59. Alan kodu 282."
    },
    {
     "id": "60",
     "name": "Tokat",
     "short": "Tokat",
     "local": "",
     "cap": "Tokat",
     "reg": "karadeniz",
     "codes": [
      "356"
     ],
     "cue": "Plaka 60. Alan kodu 356."
    },
    {
     "id": "61",
     "name": "Trabzon",
     "short": "Trabzon",
     "local": "",
     "cap": "Trabzon",
     "reg": "karadeniz",
     "codes": [
      "462"
     ],
     "cue": "Plaka 61. Alan kodu 462."
    },
    {
     "id": "62",
     "name": "Tunceli",
     "short": "Tunceli",
     "local": "",
     "cap": "Tunceli",
     "reg": "doguanadolu",
     "codes": [
      "428"
     ],
     "cue": "Plaka 62. Alan kodu 428."
    },
    {
     "id": "63",
     "name": "Şanlıurfa",
     "short": "Şanlıurfa",
     "local": "",
     "cap": "Şanlıurfa",
     "reg": "guneydogu",
     "codes": [
      "414"
     ],
     "cue": "Plaka 63. Alan kodu 414."
    },
    {
     "id": "64",
     "name": "Uşak",
     "short": "Uşak",
     "local": "",
     "cap": "Uşak",
     "reg": "ege",
     "codes": [
      "276"
     ],
     "cue": "Plaka 64. Alan kodu 276."
    },
    {
     "id": "65",
     "name": "Van",
     "short": "Van",
     "local": "",
     "cap": "Van",
     "reg": "doguanadolu",
     "codes": [
      "432"
     ],
     "cue": "Plaka 65. Alan kodu 432."
    },
    {
     "id": "66",
     "name": "Yozgat",
     "short": "Yozgat",
     "local": "",
     "cap": "Yozgat",
     "reg": "icanadolu",
     "codes": [
      "354"
     ],
     "cue": "Plaka 66. Alan kodu 354."
    },
    {
     "id": "67",
     "name": "Zonguldak",
     "short": "Zonguldak",
     "local": "",
     "cap": "Zonguldak",
     "reg": "karadeniz",
     "codes": [
      "372"
     ],
     "cue": "Plaka 67. Alan kodu 372."
    },
    {
     "id": "68",
     "name": "Aksaray",
     "short": "Aksaray",
     "local": "",
     "cap": "Aksaray",
     "reg": "icanadolu",
     "codes": [
      "382"
     ],
     "cue": "Plaka 68. Alan kodu 382."
    },
    {
     "id": "69",
     "name": "Bayburt",
     "short": "Bayburt",
     "local": "",
     "cap": "Bayburt",
     "reg": "karadeniz",
     "codes": [
      "458"
     ],
     "cue": "Plaka 69. Alan kodu 458."
    },
    {
     "id": "70",
     "name": "Karaman",
     "short": "Karaman",
     "local": "",
     "cap": "Karaman",
     "reg": "icanadolu",
     "codes": [
      "338"
     ],
     "cue": "Plaka 70. Alan kodu 338."
    },
    {
     "id": "71",
     "name": "Kırıkkale",
     "short": "Kırıkkale",
     "local": "",
     "cap": "Kırıkkale",
     "reg": "icanadolu",
     "codes": [
      "318"
     ],
     "cue": "Plaka 71. Alan kodu 318."
    },
    {
     "id": "72",
     "name": "Batman",
     "short": "Batman",
     "local": "",
     "cap": "Batman",
     "reg": "guneydogu",
     "codes": [
      "488"
     ],
     "cue": "Plaka 72. Alan kodu 488."
    },
    {
     "id": "73",
     "name": "Şırnak",
     "short": "Şırnak",
     "local": "",
     "cap": "Şırnak",
     "reg": "guneydogu",
     "codes": [
      "486"
     ],
     "cue": "Plaka 73. Alan kodu 486."
    },
    {
     "id": "74",
     "name": "Bartın",
     "short": "Bartın",
     "local": "",
     "cap": "Bartın",
     "reg": "karadeniz",
     "codes": [
      "378"
     ],
     "cue": "Plaka 74. Alan kodu 378."
    },
    {
     "id": "75",
     "name": "Ardahan",
     "short": "Ardahan",
     "local": "",
     "cap": "Ardahan",
     "reg": "doguanadolu",
     "codes": [
      "478"
     ],
     "cue": "Plaka 75. Alan kodu 478."
    },
    {
     "id": "76",
     "name": "Iğdır",
     "short": "Iğdır",
     "local": "",
     "cap": "Iğdır",
     "reg": "doguanadolu",
     "codes": [
      "476"
     ],
     "cue": "Plaka 76. Alan kodu 476."
    },
    {
     "id": "77",
     "name": "Yalova",
     "short": "Yalova",
     "local": "",
     "cap": "Yalova",
     "reg": "marmara",
     "codes": [
      "226"
     ],
     "cue": "Plaka 77. Alan kodu 226."
    },
    {
     "id": "78",
     "name": "Karabük",
     "short": "Karabük",
     "local": "",
     "cap": "Karabük",
     "reg": "karadeniz",
     "codes": [
      "370"
     ],
     "cue": "Plaka 78. Alan kodu 370."
    },
    {
     "id": "79",
     "name": "Kilis",
     "short": "Kilis",
     "local": "",
     "cap": "Kilis",
     "reg": "guneydogu",
     "codes": [
      "348"
     ],
     "cue": "Plaka 79. Alan kodu 348."
    },
    {
     "id": "80",
     "name": "Osmaniye",
     "short": "Osmaniye",
     "local": "",
     "cap": "Osmaniye",
     "reg": "akdeniz",
     "codes": [
      "328"
     ],
     "cue": "Plaka 80. Alan kodu 328."
    },
    {
     "id": "81",
     "name": "Düzce",
     "short": "Düzce",
     "local": "",
     "cap": "Düzce",
     "reg": "karadeniz",
     "codes": [
      "380"
     ],
     "cue": "Plaka 81. Alan kodu 380."
    }
   ],
   "topics": [
    {
     "key": "alan",
     "navLabel": "Telefon kodu",
     "icon": "phone",
     "drillPreset": "code",
     "mapMode": "code",
     "labelMode": "code",
     "title": "Tabeladaki telefon numarası (alan kodu)",
     "lead": "Türkiye'de dükkân tabelalarında, araç kasalarında ve duvar yazılarında telefon numarası alan koduyla yazılır: 0 222 123 45 67. Baştaki 0 çıkış rakamıdır; ardından gelen 3 hane ilin kodudur. İlk rakam ülkeyi üçe böler: 2 batı, 3 orta ve güney, 4 doğu. 05 ile başlayan numaralar cep telefonudur; 444, 0850 ve 0800 numaraları da yer söylemez.",
     "desc": "0 222 Eskişehir, 0 212 İstanbul… Telefon kodundan ili bul.",
     "decoder": {
      "title": "Alan kodu",
      "placeholder": "Örn. 222, 312, 462 ya da il adı…",
      "hint": "0'dan sonraki 3 haneyi yaz (cep telefonu 05 hariç); il haritada boyanır.",
      "quizPrompt": "Bu alan kodu hangi ilin?",
      "noHit": "Bu kod listede yok. 81 ilin tüm alan kodları burada; 05 ile başlayanlar cep telefonudur.",
      "entries": [
       {
        "key": "212",
        "label": "212 → İstanbul (Avrupa yakası)",
        "sub": "Plaka 34.",
        "keys": [
         "0212",
         "(0212)",
         "i̇stanbul"
        ],
        "ids": [
         "34"
        ],
        "main": "0 212",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "216",
        "label": "216 → İstanbul (Anadolu yakası)",
        "sub": "Plaka 34.",
        "keys": [
         "0216",
         "(0216)",
         "i̇stanbul"
        ],
        "ids": [
         "34"
        ],
        "main": "0 216",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "222",
        "label": "222 → Eskişehir",
        "sub": "Plaka 26.",
        "keys": [
         "0222",
         "(0222)",
         "eskişehir"
        ],
        "ids": [
         "26"
        ],
        "main": "0 222",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "224",
        "label": "224 → Bursa",
        "sub": "Plaka 16.",
        "keys": [
         "0224",
         "(0224)",
         "bursa"
        ],
        "ids": [
         "16"
        ],
        "main": "0 224",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "226",
        "label": "226 → Yalova",
        "sub": "Plaka 77.",
        "keys": [
         "0226",
         "(0226)",
         "yalova"
        ],
        "ids": [
         "77"
        ],
        "main": "0 226",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "228",
        "label": "228 → Bilecik",
        "sub": "Plaka 11.",
        "keys": [
         "0228",
         "(0228)",
         "bilecik"
        ],
        "ids": [
         "11"
        ],
        "main": "0 228",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "232",
        "label": "232 → İzmir",
        "sub": "Plaka 35.",
        "keys": [
         "0232",
         "(0232)",
         "i̇zmir"
        ],
        "ids": [
         "35"
        ],
        "main": "0 232",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "236",
        "label": "236 → Manisa",
        "sub": "Plaka 45.",
        "keys": [
         "0236",
         "(0236)",
         "manisa"
        ],
        "ids": [
         "45"
        ],
        "main": "0 236",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "242",
        "label": "242 → Antalya",
        "sub": "Plaka 7.",
        "keys": [
         "0242",
         "(0242)",
         "antalya"
        ],
        "ids": [
         "07"
        ],
        "main": "0 242",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "246",
        "label": "246 → Isparta",
        "sub": "Plaka 32.",
        "keys": [
         "0246",
         "(0246)",
         "isparta"
        ],
        "ids": [
         "32"
        ],
        "main": "0 246",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "248",
        "label": "248 → Burdur",
        "sub": "Plaka 15.",
        "keys": [
         "0248",
         "(0248)",
         "burdur"
        ],
        "ids": [
         "15"
        ],
        "main": "0 248",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "252",
        "label": "252 → Muğla",
        "sub": "Plaka 48.",
        "keys": [
         "0252",
         "(0252)",
         "muğla"
        ],
        "ids": [
         "48"
        ],
        "main": "0 252",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "256",
        "label": "256 → Aydın",
        "sub": "Plaka 9.",
        "keys": [
         "0256",
         "(0256)",
         "aydın"
        ],
        "ids": [
         "09"
        ],
        "main": "0 256",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "258",
        "label": "258 → Denizli",
        "sub": "Plaka 20.",
        "keys": [
         "0258",
         "(0258)",
         "denizli"
        ],
        "ids": [
         "20"
        ],
        "main": "0 258",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "262",
        "label": "262 → Kocaeli",
        "sub": "Plaka 41.",
        "keys": [
         "0262",
         "(0262)",
         "kocaeli"
        ],
        "ids": [
         "41"
        ],
        "main": "0 262",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "264",
        "label": "264 → Sakarya",
        "sub": "Plaka 54.",
        "keys": [
         "0264",
         "(0264)",
         "sakarya"
        ],
        "ids": [
         "54"
        ],
        "main": "0 264",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "266",
        "label": "266 → Balıkesir",
        "sub": "Plaka 10.",
        "keys": [
         "0266",
         "(0266)",
         "balıkesir"
        ],
        "ids": [
         "10"
        ],
        "main": "0 266",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "272",
        "label": "272 → Afyonkarahisar",
        "sub": "Plaka 3.",
        "keys": [
         "0272",
         "(0272)",
         "afyonkarahisar"
        ],
        "ids": [
         "03"
        ],
        "main": "0 272",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "274",
        "label": "274 → Kütahya",
        "sub": "Plaka 43.",
        "keys": [
         "0274",
         "(0274)",
         "kütahya"
        ],
        "ids": [
         "43"
        ],
        "main": "0 274",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "276",
        "label": "276 → Uşak",
        "sub": "Plaka 64.",
        "keys": [
         "0276",
         "(0276)",
         "uşak"
        ],
        "ids": [
         "64"
        ],
        "main": "0 276",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "282",
        "label": "282 → Tekirdağ",
        "sub": "Plaka 59.",
        "keys": [
         "0282",
         "(0282)",
         "tekirdağ"
        ],
        "ids": [
         "59"
        ],
        "main": "0 282",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "284",
        "label": "284 → Edirne",
        "sub": "Plaka 22.",
        "keys": [
         "0284",
         "(0284)",
         "edirne"
        ],
        "ids": [
         "22"
        ],
        "main": "0 284",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "286",
        "label": "286 → Çanakkale",
        "sub": "Plaka 17.",
        "keys": [
         "0286",
         "(0286)",
         "çanakkale"
        ],
        "ids": [
         "17"
        ],
        "main": "0 286",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "288",
        "label": "288 → Kırklareli",
        "sub": "Plaka 39.",
        "keys": [
         "0288",
         "(0288)",
         "kırklareli"
        ],
        "ids": [
         "39"
        ],
        "main": "0 288",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "312",
        "label": "312 → Ankara",
        "sub": "Plaka 6.",
        "keys": [
         "0312",
         "(0312)",
         "ankara"
        ],
        "ids": [
         "06"
        ],
        "main": "0 312",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "318",
        "label": "318 → Kırıkkale",
        "sub": "Plaka 71.",
        "keys": [
         "0318",
         "(0318)",
         "kırıkkale"
        ],
        "ids": [
         "71"
        ],
        "main": "0 318",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "322",
        "label": "322 → Adana",
        "sub": "Plaka 1.",
        "keys": [
         "0322",
         "(0322)",
         "adana"
        ],
        "ids": [
         "01"
        ],
        "main": "0 322",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "324",
        "label": "324 → Mersin",
        "sub": "Plaka 33.",
        "keys": [
         "0324",
         "(0324)",
         "mersin"
        ],
        "ids": [
         "33"
        ],
        "main": "0 324",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "326",
        "label": "326 → Hatay",
        "sub": "Plaka 31.",
        "keys": [
         "0326",
         "(0326)",
         "hatay"
        ],
        "ids": [
         "31"
        ],
        "main": "0 326",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "328",
        "label": "328 → Osmaniye",
        "sub": "Plaka 80.",
        "keys": [
         "0328",
         "(0328)",
         "osmaniye"
        ],
        "ids": [
         "80"
        ],
        "main": "0 328",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "332",
        "label": "332 → Konya",
        "sub": "Plaka 42.",
        "keys": [
         "0332",
         "(0332)",
         "konya"
        ],
        "ids": [
         "42"
        ],
        "main": "0 332",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "338",
        "label": "338 → Karaman",
        "sub": "Plaka 70.",
        "keys": [
         "0338",
         "(0338)",
         "karaman"
        ],
        "ids": [
         "70"
        ],
        "main": "0 338",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "342",
        "label": "342 → Gaziantep",
        "sub": "Plaka 27.",
        "keys": [
         "0342",
         "(0342)",
         "gaziantep"
        ],
        "ids": [
         "27"
        ],
        "main": "0 342",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "344",
        "label": "344 → Kahramanmaraş",
        "sub": "Plaka 46.",
        "keys": [
         "0344",
         "(0344)",
         "kahramanmaraş"
        ],
        "ids": [
         "46"
        ],
        "main": "0 344",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "346",
        "label": "346 → Sivas",
        "sub": "Plaka 58.",
        "keys": [
         "0346",
         "(0346)",
         "sivas"
        ],
        "ids": [
         "58"
        ],
        "main": "0 346",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "348",
        "label": "348 → Kilis",
        "sub": "Plaka 79.",
        "keys": [
         "0348",
         "(0348)",
         "kilis"
        ],
        "ids": [
         "79"
        ],
        "main": "0 348",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "352",
        "label": "352 → Kayseri",
        "sub": "Plaka 38.",
        "keys": [
         "0352",
         "(0352)",
         "kayseri"
        ],
        "ids": [
         "38"
        ],
        "main": "0 352",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "354",
        "label": "354 → Yozgat",
        "sub": "Plaka 66.",
        "keys": [
         "0354",
         "(0354)",
         "yozgat"
        ],
        "ids": [
         "66"
        ],
        "main": "0 354",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "356",
        "label": "356 → Tokat",
        "sub": "Plaka 60.",
        "keys": [
         "0356",
         "(0356)",
         "tokat"
        ],
        "ids": [
         "60"
        ],
        "main": "0 356",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "358",
        "label": "358 → Amasya",
        "sub": "Plaka 5.",
        "keys": [
         "0358",
         "(0358)",
         "amasya"
        ],
        "ids": [
         "05"
        ],
        "main": "0 358",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "362",
        "label": "362 → Samsun",
        "sub": "Plaka 55.",
        "keys": [
         "0362",
         "(0362)",
         "samsun"
        ],
        "ids": [
         "55"
        ],
        "main": "0 362",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "364",
        "label": "364 → Çorum",
        "sub": "Plaka 19.",
        "keys": [
         "0364",
         "(0364)",
         "çorum"
        ],
        "ids": [
         "19"
        ],
        "main": "0 364",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "366",
        "label": "366 → Kastamonu",
        "sub": "Plaka 37.",
        "keys": [
         "0366",
         "(0366)",
         "kastamonu"
        ],
        "ids": [
         "37"
        ],
        "main": "0 366",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "368",
        "label": "368 → Sinop",
        "sub": "Plaka 57.",
        "keys": [
         "0368",
         "(0368)",
         "sinop"
        ],
        "ids": [
         "57"
        ],
        "main": "0 368",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "370",
        "label": "370 → Karabük",
        "sub": "Plaka 78.",
        "keys": [
         "0370",
         "(0370)",
         "karabük"
        ],
        "ids": [
         "78"
        ],
        "main": "0 370",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "372",
        "label": "372 → Zonguldak",
        "sub": "Plaka 67.",
        "keys": [
         "0372",
         "(0372)",
         "zonguldak"
        ],
        "ids": [
         "67"
        ],
        "main": "0 372",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "374",
        "label": "374 → Bolu",
        "sub": "Plaka 14.",
        "keys": [
         "0374",
         "(0374)",
         "bolu"
        ],
        "ids": [
         "14"
        ],
        "main": "0 374",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "376",
        "label": "376 → Çankırı",
        "sub": "Plaka 18.",
        "keys": [
         "0376",
         "(0376)",
         "çankırı"
        ],
        "ids": [
         "18"
        ],
        "main": "0 376",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "378",
        "label": "378 → Bartın",
        "sub": "Plaka 74.",
        "keys": [
         "0378",
         "(0378)",
         "bartın"
        ],
        "ids": [
         "74"
        ],
        "main": "0 378",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "380",
        "label": "380 → Düzce",
        "sub": "Plaka 81.",
        "keys": [
         "0380",
         "(0380)",
         "düzce"
        ],
        "ids": [
         "81"
        ],
        "main": "0 380",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "382",
        "label": "382 → Aksaray",
        "sub": "Plaka 68.",
        "keys": [
         "0382",
         "(0382)",
         "aksaray"
        ],
        "ids": [
         "68"
        ],
        "main": "0 382",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "384",
        "label": "384 → Nevşehir",
        "sub": "Plaka 50.",
        "keys": [
         "0384",
         "(0384)",
         "nevşehir"
        ],
        "ids": [
         "50"
        ],
        "main": "0 384",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "386",
        "label": "386 → Kırşehir",
        "sub": "Plaka 40.",
        "keys": [
         "0386",
         "(0386)",
         "kırşehir"
        ],
        "ids": [
         "40"
        ],
        "main": "0 386",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "388",
        "label": "388 → Niğde",
        "sub": "Plaka 51.",
        "keys": [
         "0388",
         "(0388)",
         "niğde"
        ],
        "ids": [
         "51"
        ],
        "main": "0 388",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "412",
        "label": "412 → Diyarbakır",
        "sub": "Plaka 21.",
        "keys": [
         "0412",
         "(0412)",
         "diyarbakır"
        ],
        "ids": [
         "21"
        ],
        "main": "0 412",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "414",
        "label": "414 → Şanlıurfa",
        "sub": "Plaka 63.",
        "keys": [
         "0414",
         "(0414)",
         "şanlıurfa"
        ],
        "ids": [
         "63"
        ],
        "main": "0 414",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "416",
        "label": "416 → Adıyaman",
        "sub": "Plaka 2.",
        "keys": [
         "0416",
         "(0416)",
         "adıyaman"
        ],
        "ids": [
         "02"
        ],
        "main": "0 416",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "422",
        "label": "422 → Malatya",
        "sub": "Plaka 44.",
        "keys": [
         "0422",
         "(0422)",
         "malatya"
        ],
        "ids": [
         "44"
        ],
        "main": "0 422",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "424",
        "label": "424 → Elazığ",
        "sub": "Plaka 23.",
        "keys": [
         "0424",
         "(0424)",
         "elazığ"
        ],
        "ids": [
         "23"
        ],
        "main": "0 424",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "426",
        "label": "426 → Bingöl",
        "sub": "Plaka 12.",
        "keys": [
         "0426",
         "(0426)",
         "bingöl"
        ],
        "ids": [
         "12"
        ],
        "main": "0 426",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "428",
        "label": "428 → Tunceli",
        "sub": "Plaka 62.",
        "keys": [
         "0428",
         "(0428)",
         "tunceli"
        ],
        "ids": [
         "62"
        ],
        "main": "0 428",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "432",
        "label": "432 → Van",
        "sub": "Plaka 65.",
        "keys": [
         "0432",
         "(0432)",
         "van"
        ],
        "ids": [
         "65"
        ],
        "main": "0 432",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "434",
        "label": "434 → Bitlis",
        "sub": "Plaka 13.",
        "keys": [
         "0434",
         "(0434)",
         "bitlis"
        ],
        "ids": [
         "13"
        ],
        "main": "0 434",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "436",
        "label": "436 → Muş",
        "sub": "Plaka 49.",
        "keys": [
         "0436",
         "(0436)",
         "muş"
        ],
        "ids": [
         "49"
        ],
        "main": "0 436",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "438",
        "label": "438 → Hakkâri",
        "sub": "Plaka 30.",
        "keys": [
         "0438",
         "(0438)",
         "hakkâri"
        ],
        "ids": [
         "30"
        ],
        "main": "0 438",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "442",
        "label": "442 → Erzurum",
        "sub": "Plaka 25.",
        "keys": [
         "0442",
         "(0442)",
         "erzurum"
        ],
        "ids": [
         "25"
        ],
        "main": "0 442",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "446",
        "label": "446 → Erzincan",
        "sub": "Plaka 24.",
        "keys": [
         "0446",
         "(0446)",
         "erzincan"
        ],
        "ids": [
         "24"
        ],
        "main": "0 446",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "452",
        "label": "452 → Ordu",
        "sub": "Plaka 52.",
        "keys": [
         "0452",
         "(0452)",
         "ordu"
        ],
        "ids": [
         "52"
        ],
        "main": "0 452",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "454",
        "label": "454 → Giresun",
        "sub": "Plaka 28.",
        "keys": [
         "0454",
         "(0454)",
         "giresun"
        ],
        "ids": [
         "28"
        ],
        "main": "0 454",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "456",
        "label": "456 → Gümüşhane",
        "sub": "Plaka 29.",
        "keys": [
         "0456",
         "(0456)",
         "gümüşhane"
        ],
        "ids": [
         "29"
        ],
        "main": "0 456",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "458",
        "label": "458 → Bayburt",
        "sub": "Plaka 69.",
        "keys": [
         "0458",
         "(0458)",
         "bayburt"
        ],
        "ids": [
         "69"
        ],
        "main": "0 458",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "462",
        "label": "462 → Trabzon",
        "sub": "Plaka 61.",
        "keys": [
         "0462",
         "(0462)",
         "trabzon"
        ],
        "ids": [
         "61"
        ],
        "main": "0 462",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "464",
        "label": "464 → Rize",
        "sub": "Plaka 53.",
        "keys": [
         "0464",
         "(0464)",
         "rize"
        ],
        "ids": [
         "53"
        ],
        "main": "0 464",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "466",
        "label": "466 → Artvin",
        "sub": "Plaka 8.",
        "keys": [
         "0466",
         "(0466)",
         "artvin"
        ],
        "ids": [
         "08"
        ],
        "main": "0 466",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "472",
        "label": "472 → Ağrı",
        "sub": "Plaka 4.",
        "keys": [
         "0472",
         "(0472)",
         "ağrı"
        ],
        "ids": [
         "04"
        ],
        "main": "0 472",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "474",
        "label": "474 → Kars",
        "sub": "Plaka 36.",
        "keys": [
         "0474",
         "(0474)",
         "kars"
        ],
        "ids": [
         "36"
        ],
        "main": "0 474",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "476",
        "label": "476 → Iğdır",
        "sub": "Plaka 76.",
        "keys": [
         "0476",
         "(0476)",
         "iğdır"
        ],
        "ids": [
         "76"
        ],
        "main": "0 476",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "478",
        "label": "478 → Ardahan",
        "sub": "Plaka 75.",
        "keys": [
         "0478",
         "(0478)",
         "ardahan"
        ],
        "ids": [
         "75"
        ],
        "main": "0 478",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "482",
        "label": "482 → Mardin",
        "sub": "Plaka 47.",
        "keys": [
         "0482",
         "(0482)",
         "mardin"
        ],
        "ids": [
         "47"
        ],
        "main": "0 482",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "484",
        "label": "484 → Siirt",
        "sub": "Plaka 56.",
        "keys": [
         "0484",
         "(0484)",
         "siirt"
        ],
        "ids": [
         "56"
        ],
        "main": "0 484",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "486",
        "label": "486 → Şırnak",
        "sub": "Plaka 73.",
        "keys": [
         "0486",
         "(0486)",
         "şırnak"
        ],
        "ids": [
         "73"
        ],
        "main": "0 486",
        "prompt": "Bu alan kodu hangi ilin?"
       },
       {
        "key": "488",
        "label": "488 → Batman",
        "sub": "Plaka 72.",
        "keys": [
         "0488",
         "(0488)",
         "batman"
        ],
        "ids": [
         "72"
        ],
        "main": "0 488",
        "prompt": "Bu alan kodu hangi ilin?"
       }
      ]
     },
     "flows": [
      {
       "title": "Yer söylemeyenleri ele, 0’ı at",
       "body": "05 (cep), 444 (çağrı merkezi), 0850 ve 0800 ile başlayan numaralar yer söylemez: atla. Sabit hatta baştaki 0’ı geç, sonraki 3 hane alan kodudur: 0 232 → 232 İzmir."
      },
      {
       "title": "İlk rakam ülkeyi üçe böler",
       "body": "2: batı (Marmara, Ege, Antalya, Eskişehir). 3: orta ve güney (Ankara, Konya, Adana, Mersin, Hatay, Gaziantep) ve Karadeniz'in batısı (Samsun'a kadar). 4: doğu (Doğu ve Güneydoğu Anadolu) ve Karadeniz'in doğusu (Ordu'dan Artvin'e)."
      },
      {
       "title": "İkinci rakam bölgeyi daraltır",
       "body": "21 İstanbul, 22–23 Eskişehir–Bursa–İzmir, 24–25 Antalya ve Güney Ege, 26–27 Kocaeli ve iç Ege, 28 Trakya. 31–33 Ankara, Adana, Konya. 34–35 Gaziantep ve Kayseri. 36–38 Batı Karadeniz ve iç kesim. 41–42 Diyarbakır, Malatya. 43 Van. 44–47 Erzurum ve Doğu Karadeniz. 48 Mardin."
      }
     ],
     "bandsTitle": "İlk iki haneye göre",
     "bandsHint": "dokun → iller boyanır",
     "bands": [
      {
       "cls": "q2",
       "key": "21x",
       "title": "İstanbul",
       "sub": "212 Avrupa yakası, 216 Anadolu yakası. Tek ilin iki kodu var.",
       "ids": [
        "34"
       ]
      },
      {
       "cls": "q2",
       "key": "22x–23x",
       "title": "Eskişehir, Bursa, İzmir hattı",
       "sub": "222 Eskişehir · 224 Bursa · 226 Yalova · 228 Bilecik · 232 İzmir · 236 Manisa.",
       "ids": [
        "26",
        "16",
        "77",
        "11",
        "35",
        "45"
       ]
      },
      {
       "cls": "q2",
       "key": "24x–25x",
       "title": "Güneybatı: Antalya ve Güney Ege",
       "sub": "242 Antalya · 246 Isparta · 248 Burdur · 252 Muğla · 256 Aydın · 258 Denizli.",
       "ids": [
        "07",
        "32",
        "15",
        "48",
        "09",
        "20"
       ]
      },
      {
       "cls": "q2",
       "key": "26x–27x",
       "title": "Doğu Marmara ve iç Ege",
       "sub": "262 Kocaeli · 264 Sakarya · 266 Balıkesir · 272 Afyonkarahisar · 274 Kütahya · 276 Uşak.",
       "ids": [
        "41",
        "54",
        "10",
        "03",
        "43",
        "64"
       ]
      },
      {
       "cls": "q2",
       "key": "28x",
       "title": "Trakya ve Çanakkale",
       "sub": "282 Tekirdağ · 284 Edirne · 286 Çanakkale · 288 Kırklareli.",
       "ids": [
        "59",
        "22",
        "17",
        "39"
       ]
      },
      {
       "cls": "q0",
       "key": "31x–33x",
       "title": "Ankara, Çukurova, Konya",
       "sub": "312 Ankara · 318 Kırıkkale · 322 Adana · 324 Mersin · 326 Hatay · 328 Osmaniye · 332 Konya · 338 Karaman.",
       "ids": [
        "06",
        "71",
        "01",
        "33",
        "31",
        "80",
        "42",
        "70"
       ]
      },
      {
       "cls": "q0",
       "key": "34x–35x",
       "title": "Gaziantep hattı ve Kayseri",
       "sub": "342 Gaziantep · 344 Kahramanmaraş · 346 Sivas · 348 Kilis · 352 Kayseri · 354 Yozgat · 356 Tokat · 358 Amasya.",
       "ids": [
        "27",
        "46",
        "58",
        "79",
        "38",
        "66",
        "60",
        "05"
       ]
      },
      {
       "cls": "q0",
       "key": "36x–38x",
       "title": "Batı Karadeniz ve iç kesim",
       "sub": "362 Samsun · 364 Çorum · 366 Kastamonu · 368 Sinop · 370 Karabük · 372 Zonguldak · 374 Bolu · 376 Çankırı · 378 Bartın · 380 Düzce · 382 Aksaray · 384 Nevşehir · 386 Kırşehir · 388 Niğde.",
       "ids": [
        "55",
        "19",
        "37",
        "57",
        "78",
        "67",
        "14",
        "18",
        "74",
        "81",
        "68",
        "50",
        "40",
        "51"
       ]
      },
      {
       "cls": "q1",
       "key": "41x–42x",
       "title": "Güneydoğu ve Fırat çevresi",
       "sub": "412 Diyarbakır · 414 Şanlıurfa · 416 Adıyaman · 422 Malatya · 424 Elazığ · 426 Bingöl · 428 Tunceli.",
       "ids": [
        "21",
        "63",
        "02",
        "44",
        "23",
        "12",
        "62"
       ]
      },
      {
       "cls": "q1",
       "key": "43x",
       "title": "Van Gölü çevresi",
       "sub": "432 Van · 434 Bitlis · 436 Muş · 438 Hakkâri.",
       "ids": [
        "65",
        "13",
        "49",
        "30"
       ]
      },
      {
       "cls": "q1",
       "key": "44x–47x",
       "title": "Erzurum ve Doğu Karadeniz",
       "sub": "442 Erzurum · 446 Erzincan · 452 Ordu · 454 Giresun · 456 Gümüşhane · 458 Bayburt · 462 Trabzon · 464 Rize · 466 Artvin · 472 Ağrı · 474 Kars · 476 Iğdır · 478 Ardahan.",
       "ids": [
        "25",
        "24",
        "52",
        "28",
        "29",
        "69",
        "61",
        "53",
        "08",
        "04",
        "36",
        "76",
        "75"
       ]
      },
      {
       "cls": "q1",
       "key": "48x",
       "title": "Mardin ve Siirt çevresi",
       "sub": "482 Mardin · 484 Siirt · 486 Şırnak · 488 Batman.",
       "ids": [
        "47",
        "56",
        "73",
        "72"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "İlk rakamın değiştiği sınırlar",
       "ids": [
        "26",
        "06",
        "03",
        "42",
        "07",
        "33",
        "55",
        "52",
        "27",
        "63",
        "02"
       ],
       "body": "Eskişehir 222 (2) ama komşusu Ankara 312 (3). Afyonkarahisar 272 (2) ama Konya 332 (3). Antalya 242 (2) ama Mersin 324 (3). Samsun 362 (3) ama Ordu 452 (4). Gaziantep 342 (3) ama Şanlıurfa 414 (4). Bu sınırlar harita üzerinde ilk rakamın değiştiği yerlerdir.",
       "traps": [
        [
         "222 / 312",
         "Eskişehir / Ankara"
        ],
        [
         "242 / 324",
         "Antalya / Mersin"
        ],
        [
         "362 / 452",
         "Samsun / Ordu"
        ],
        [
         "342 / 414",
         "Gaziantep / Şanlıurfa"
        ]
       ]
      },
      {
       "title": "İstanbul'un iki kodu",
       "ids": [
        "34"
       ],
       "body": "212 İstanbul'un Avrupa yakasıdır (Trakya'ya bağlı kısım), 216 Anadolu yakasıdır. Tek il, iki kod. Başka hiçbir ilin iki kodu yoktur.",
       "traps": [
        [
         "212",
         "İstanbul (Avrupa yakası)"
        ],
        [
         "216",
         "İstanbul (Anadolu yakası)"
        ]
       ]
      },
      {
       "title": "Karadeniz iki kodla bölünür",
       "ids": [
        "55",
        "19",
        "37",
        "57",
        "52",
        "28",
        "61",
        "53",
        "08"
       ],
       "body": "Samsun, Çorum, Kastamonu, Sinop, Zonguldak, Bolu 3 ile başlar. Ordu, Giresun, Trabzon, Rize, Artvin 4 ile başlar. Karadeniz kıyısında kodun ilk rakamı 3'ten 4'e Samsun ile Ordu arasında geçer.",
       "traps": [
        [
         "362",
         "Samsun"
        ],
        [
         "452",
         "Ordu"
        ],
        [
         "462",
         "Trabzon"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "tr-alan",
       "title": "Telefon numarası: alan kodu nerede?",
       "badge": "Çizim ve fotoğraf",
       "set": "tr-alan1",
       "ids": [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81"
       ],
       "sub": "Baştaki 0’dan sonraki 3 hane alan kodudur. 05 (cep), 444, 0850 ve 0800 ile başlayan numaralar bir ili göstermez. Gerçek tabelalarda genellikle yalnız yerel numara yazılır; alan kodu çoğu zaman yoktur, o yüzden kodu yazılı görmen şans işidir.",
       "tags": [
        "0 232",
        "212",
        "444",
        "05"
       ],
       "quiz": false
      }
     ],
     "visualsTitle": "Numara tabelada nerede? "
    },
    {
     "key": "yollar",
     "navLabel": "Yollar",
     "icon": "road",
     "drillPreset": "yollar",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Devlet yolu ve otoyol numaraları",
     "lead": "Türkiye’de büyük yolların levhasında yolun numarası çerçeveli kutuda yazar: mavi levhalarda D-100, D.400 gibi devlet yolu (D) numaraları, yeşil levhalarda turuncu kutuda O-3, O-4 gibi otoyol (O) numaraları, yanında çoğu zaman E-80 gibi Avrupa yolu numarası. Numarayı gördüğünde yolun hangi illerden geçtiğini bilirsen konumu birkaç ile daraltırsın. Haritada yolların çizgisi de görünür. Burada yalnızca büyük koridorlar var; küçük bağlantı yolları yok.",
     "desc": "D-100, D.400, O-4… Yol numarasından ili bul.",
     "decoder": {
      "title": "Yol numarası ya da adı",
      "placeholder": "Örn. D100, D-400, O-4, Anadolu Otoyolu…",
      "hint": "Levhada gördüğün numarayı yaz (D-100, D.400, O-4 olur): geçtiği iller haritada boyanır.",
      "quizPrompt": "Bu yol hangi illerden geçer? (Herhangi birine dokun)",
      "noHit": "Bu numara listede yok. Büyük devlet yolları ve otoyollar burada; küçük yollar yok.",
      "entries": [
       {
        "key": "D010",
        "label": "Karadeniz kıyı yolu · Sakarya → Düzce → Zonguldak → Bartın → Kastamonu → Sinop → Samsun → Ordu → Giresun → Trabzon → Rize → Artvin → Ardahan → Kars",
        "sub": "Sakarya’dan Kars’a Karadeniz kıyısını izleyen devlet yolu.",
        "keys": [
         "D010",
         "d010",
         "D-010",
         "D.010",
         "D 010",
         "D10",
         "D-10",
         "D.10",
         "D 10",
         "d-010",
         "d10",
         "karadeniz kıyı yolu"
        ],
        "ids": [
         "54",
         "81",
         "67",
         "74",
         "37",
         "57",
         "55",
         "52",
         "28",
         "61",
         "53",
         "08",
         "75",
         "36"
        ],
        "main": "D010 Karadeniz kıyı yolu"
       },
       {
        "key": "D020",
        "label": "Trakya–Kocaeli · Edirne → Kırklareli → Tekirdağ → İstanbul → Kocaeli → Sakarya",
        "sub": "Trakya’dan İstanbul’a, oradan Sakarya’ya uzanan devlet yolu.",
        "keys": [
         "D020",
         "d020",
         "D-020",
         "D.020",
         "D 020",
         "D20",
         "D-20",
         "D.20",
         "D 20",
         "d-020",
         "d20",
         "trakya–kocaeli"
        ],
        "ids": [
         "22",
         "39",
         "59",
         "34",
         "41",
         "54"
        ],
        "main": "D020 Trakya–Kocaeli"
       },
       {
        "key": "D100",
        "label": "E-80 · Edirne – Ağrı · Edirne → Kırklareli → Tekirdağ → İstanbul → Kocaeli → Sakarya → Düzce → Bolu → Karabük → Çankırı → Kastamonu → Çorum → Amasya → Tokat → Sivas → Erzincan → Erzurum → Ağrı",
        "sub": "Türkiye’nin en uzun doğu–batı devlet yollarından biri; Avrupa yolu E-80 ile birlikte anılır (levhada O-3 ile E-80 ve D-100 yan yana görülür). Edirne kesiti OSM’de eksiktir; Kınalı Kavşağı levhasında «D-100 … Edirne, Kapıkule» yazar.",
        "keys": [
         "D100",
         "d100",
         "D-100",
         "D.100",
         "D 100",
         "d-100",
         "e-80 · edirne – ağrı"
        ],
        "ids": [
         "22",
         "39",
         "59",
         "34",
         "41",
         "54",
         "81",
         "14",
         "78",
         "18",
         "37",
         "19",
         "05",
         "60",
         "58",
         "24",
         "25",
         "04"
        ],
        "main": "D100 E-80 · Edirne – Ağrı"
       },
       {
        "key": "D200",
        "label": "Çanakkale – Erzincan · Çanakkale → Balıkesir → Bursa → Bilecik → Eskişehir → Ankara → Kırıkkale → Yozgat → Sivas → Erzincan",
        "sub": "Batıda Çanakkale’den Bursa, Eskişehir, Ankara ve Sivas üzerinden Erzincan’a uzanan devlet yolu.",
        "keys": [
         "D200",
         "d200",
         "D-200",
         "D.200",
         "D 200",
         "d-200",
         "çanakkale – erzincan"
        ],
        "ids": [
         "17",
         "10",
         "16",
         "11",
         "26",
         "06",
         "71",
         "66",
         "58",
         "24"
        ],
        "main": "D200 Çanakkale – Erzincan"
       },
       {
        "key": "D300",
        "label": "İzmir – Van · İzmir → Manisa → Uşak → Kütahya → Afyonkarahisar → Konya → Aksaray → Nevşehir → Kayseri → Sivas → Kahramanmaraş → Malatya → Elazığ → Bingöl → Muş → Bitlis → Van",
        "sub": "Ege’den Doğu Anadolu’ya geçen en uzun devlet yolu; İç Anadolu’da Konya, Kayseri ve Sivas’tan geçer.",
        "keys": [
         "D300",
         "d300",
         "D-300",
         "D.300",
         "D 300",
         "d-300",
         "i̇zmir – van"
        ],
        "ids": [
         "35",
         "45",
         "64",
         "43",
         "03",
         "42",
         "68",
         "50",
         "38",
         "58",
         "46",
         "44",
         "23",
         "12",
         "49",
         "13",
         "65"
        ],
        "main": "D300 İzmir – Van"
       },
       {
        "key": "D400",
        "label": "Akdeniz kıyı yolu · Muğla → Antalya → Mersin → Adana → Osmaniye → Gaziantep → Şanlıurfa → Mardin → Şırnak → Hakkâri",
        "sub": "Muğla’dan Antalya ve Mersin üzerinden Güneydoğu’ya, Hakkâri’ye uzanan devlet yolu; Antalya’da Dumlupınar Bulvarı’nda D.400 levhası görülür.",
        "keys": [
         "D400",
         "d400",
         "D-400",
         "D.400",
         "D 400",
         "d-400",
         "akdeniz kıyı yolu"
        ],
        "ids": [
         "48",
         "07",
         "33",
         "01",
         "80",
         "27",
         "63",
         "47",
         "73",
         "30"
        ],
        "main": "D400 Akdeniz kıyı yolu"
       },
       {
        "key": "D750",
        "label": "Zonguldak – Mersin · Mersin → Adana → Niğde → Konya → Aksaray → Ankara → Bolu → Zonguldak",
        "sub": "Karadeniz’i Akdeniz’e bağlayan kuzey–güney devlet yolu; Ankara’dan geçer.",
        "keys": [
         "D750",
         "d750",
         "D-750",
         "D.750",
         "D 750",
         "d-750",
         "zonguldak – mersin"
        ],
        "ids": [
         "33",
         "01",
         "51",
         "42",
         "68",
         "06",
         "14",
         "67"
        ],
        "main": "D750 Zonguldak – Mersin"
       },
       {
        "key": "D850",
        "label": "Ordu – Kilis · Kilis → Gaziantep → Adıyaman → Malatya → Sivas → Tokat → Ordu",
        "sub": "Karadeniz’den Güneydoğu’ya inen kuzey–güney devlet yolu; Sivas ve Malatya’dan geçer.",
        "keys": [
         "D850",
         "d850",
         "D-850",
         "D.850",
         "D 850",
         "d-850",
         "ordu – kilis"
        ],
        "ids": [
         "79",
         "27",
         "02",
         "44",
         "58",
         "60",
         "52"
        ],
        "main": "D850 Ordu – Kilis"
       },
       {
        "key": "D950",
        "label": "Artvin – Mardin · Mardin → Diyarbakır → Bingöl → Erzurum → Artvin",
        "sub": "Doğu Anadolu’yu kuzey–güney geçen devlet yolu; Erzurum ve Bingöl’den geçer.",
        "keys": [
         "D950",
         "d950",
         "D-950",
         "D.950",
         "D 950",
         "d-950",
         "artvin – mardin"
        ],
        "ids": [
         "47",
         "21",
         "12",
         "25",
         "08"
        ],
        "main": "D950 Artvin – Mardin"
       },
       {
        "key": "O-3",
        "label": "Avrupa Otoyolu · Edirne → Kırklareli → Tekirdağ → İstanbul",
        "sub": "Edirne’den İstanbul’a; yeşil levhada turuncu kutuda O-3, yanında E-80.",
        "keys": [
         "O-3",
         "o-3",
         "O3",
         "O 3",
         "o3",
         "otoyol 3",
         "avrupa otoyolu"
        ],
        "ids": [
         "22",
         "39",
         "59",
         "34"
        ],
        "main": "O-3 Avrupa Otoyolu"
       },
       {
        "key": "O-4",
        "label": "Anadolu Otoyolu · İstanbul → Kocaeli → Sakarya → Düzce → Bolu → Ankara",
        "sub": "İstanbul’dan Ankara’ya; Bolu Dağı geçişi bu otoyoldadır. D100 ile aynı koridordadır.",
        "keys": [
         "O-4",
         "o-4",
         "O4",
         "O 4",
         "o4",
         "otoyol 4",
         "anadolu otoyolu"
        ],
        "ids": [
         "34",
         "41",
         "54",
         "81",
         "14",
         "06"
        ],
        "main": "O-4 Anadolu Otoyolu"
       },
       {
        "key": "O-5",
        "label": "İstanbul–Bursa–İzmir Otoyolu · Kocaeli → Yalova → Bursa → Balıkesir → Manisa → İzmir",
        "sub": "Gebze’den Osmangazi Köprüsü ile Yalova ve Bursa’ya, oradan İzmir’e inen otoyol.",
        "keys": [
         "O-5",
         "o-5",
         "O5",
         "O 5",
         "o5",
         "otoyol 5",
         "i̇stanbul–bursa–i̇zmir otoyolu"
        ],
        "ids": [
         "41",
         "77",
         "16",
         "10",
         "45",
         "35"
        ],
        "main": "O-5 İstanbul–Bursa–İzmir Otoyolu"
       },
       {
        "key": "O-6",
        "label": "Kınalı–Tekirdağ–Çanakkale–Balıkesir Otoyolu · Tekirdağ → Çanakkale → Balıkesir",
        "sub": "Marmara’nın güneyinde Tekirdağ’dan Çanakkale üzerinden Balıkesir’e uzanan otoyol.",
        "keys": [
         "O-6",
         "o-6",
         "O6",
         "O 6",
         "o6",
         "otoyol 6",
         "kınalı–tekirdağ–çanakkale–balıkesir otoyolu"
        ],
        "ids": [
         "59",
         "17",
         "10"
        ],
        "main": "O-6 Kınalı–Tekirdağ–Çanakkale–Balıkesir Otoyolu"
       },
       {
        "key": "O-7",
        "label": "Kuzey Marmara Otoyolu · Sakarya → Kocaeli → İstanbul",
        "sub": "Sakarya’dan Kocaeli ve İstanbul’un kuzeyinden geçen çevre otoyol.",
        "keys": [
         "O-7",
         "o-7",
         "O7",
         "O 7",
         "o7",
         "otoyol 7",
         "kuzey marmara otoyolu"
        ],
        "ids": [
         "54",
         "41",
         "34"
        ],
        "main": "O-7 Kuzey Marmara Otoyolu"
       },
       {
        "key": "O-21",
        "label": "Tarsus–Ankara Otoyolu · Mersin → Adana → Niğde → Nevşehir → Aksaray → Ankara",
        "sub": "Mersin’den Adana ve Niğde üzerinden Ankara’ya uzanan otoyol.",
        "keys": [
         "O-21",
         "o-21",
         "O21",
         "O 21",
         "o21",
         "otoyol 21",
         "tarsus–ankara otoyolu"
        ],
        "ids": [
         "33",
         "01",
         "51",
         "50",
         "68",
         "06"
        ],
        "main": "O-21 Tarsus–Ankara Otoyolu"
       },
       {
        "key": "O-31",
        "label": "İzmir–Denizli–Burdur–Antalya Otoyolu · İzmir → Aydın → Denizli",
        "sub": "İzmir’den Aydın üzerinden Denizli’ye (OSM verisi burada biter).",
        "keys": [
         "O-31",
         "o-31",
         "O31",
         "O 31",
         "o31",
         "otoyol 31",
         "i̇zmir–denizli–burdur–antalya otoyolu"
        ],
        "ids": [
         "35",
         "09",
         "20"
        ],
        "main": "O-31 İzmir–Denizli–Burdur–Antalya Otoyolu"
       },
       {
        "key": "O-51",
        "label": "Adana–Mersin Otoyolu · Mersin → Adana",
        "sub": "Adana ile Mersin arasında kısa Akdeniz otoyolu.",
        "keys": [
         "O-51",
         "o-51",
         "O51",
         "O 51",
         "o51",
         "otoyol 51",
         "adana–mersin otoyolu"
        ],
        "ids": [
         "33",
         "01"
        ],
        "main": "O-51 Adana–Mersin Otoyolu"
       },
       {
        "key": "O-52",
        "label": "Adana–Şanlıurfa Otoyolu · Adana → Osmaniye → Gaziantep → Şanlıurfa",
        "sub": "Adana’dan Osmaniye ve Gaziantep üzerinden Şanlıurfa’ya uzanan otoyol.",
        "keys": [
         "O-52",
         "o-52",
         "O52",
         "O 52",
         "o52",
         "otoyol 52",
         "adana–şanlıurfa otoyolu"
        ],
        "ids": [
         "01",
         "80",
         "27",
         "63"
        ],
        "main": "O-52 Adana–Şanlıurfa Otoyolu"
       }
      ]
     },
     "flows": [
      {
       "title": "Harfe ve levhaya bak",
       "body": "D: devlet yolu; mavi levhada numara çerçeveli kutuda (D-100, D.400). O: otoyol; yeşil levhada turuncu kutuda (O-3, O-4). E: Avrupa yolu numarası; D100 ve O-3 yanında E-80 görülür. Aynı koridorda otoyol ve eski devlet yolu yan yana gider."
      },
      {
       "title": "Numaranın ilk rakamı yönü söyler",
       "body": "Üç basamaklı D numaralarında ilk rakam 4 ya da küçükse yol genellikle doğu–batı gider (D010 Karadeniz kıyısı, D100, D200, D300 iç kesim, D400 Akdeniz kıyısı); 5 ya da büyükse genellikle kuzey–güney (D750, D850, D950). Haritada çizgi bunu doğrular."
      },
      {
       "title": "Otoyol önce İstanbul, Ankara, İzmir ve Adana çevresinde",
       "body": "O-3, O-4, O-7 İstanbul’dan çıkar; O-5 Gebze’den Bursa ve İzmir’e iner; O-6 Tekirdağ’dan Çanakkale ve Balıkesir’e; O-21 Mersin’den Ankara’ya; O-31 İzmir’den Denizli’ye; O-51 ve O-52 Adana çevresinde. Otoyol numarası görürsen il sayısı az olur."
      }
     ],
     "bandsTitle": "Yol listesi",
     "bandsHint": "dokun → iller boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "D010",
       "title": "Karadeniz kıyı yolu",
       "sub": "Sakarya → Düzce → Zonguldak → Bartın → Kastamonu → Sinop → Samsun → Ordu → Giresun → Trabzon → Rize → Artvin → Ardahan → Kars",
       "ids": [
        "54",
        "81",
        "67",
        "74",
        "37",
        "57",
        "55",
        "52",
        "28",
        "61",
        "53",
        "08",
        "75",
        "36"
       ]
      },
      {
       "cls": "q1",
       "key": "D020",
       "title": "Trakya–Kocaeli",
       "sub": "Edirne → Kırklareli → Tekirdağ → İstanbul → Kocaeli → Sakarya",
       "ids": [
        "22",
        "39",
        "59",
        "34",
        "41",
        "54"
       ]
      },
      {
       "cls": "q2",
       "key": "D100",
       "title": "E-80 · Edirne – Ağrı",
       "sub": "Edirne → Kırklareli → Tekirdağ → İstanbul → Kocaeli → Sakarya → Düzce → Bolu → Karabük → Çankırı → Kastamonu → Çorum → Amasya → Tokat → Sivas → Erzincan → Erzurum → Ağrı",
       "ids": [
        "22",
        "39",
        "59",
        "34",
        "41",
        "54",
        "81",
        "14",
        "78",
        "18",
        "37",
        "19",
        "05",
        "60",
        "58",
        "24",
        "25",
        "04"
       ]
      },
      {
       "cls": "q3",
       "key": "D200",
       "title": "Çanakkale – Erzincan",
       "sub": "Çanakkale → Balıkesir → Bursa → Bilecik → Eskişehir → Ankara → Kırıkkale → Yozgat → Sivas → Erzincan",
       "ids": [
        "17",
        "10",
        "16",
        "11",
        "26",
        "06",
        "71",
        "66",
        "58",
        "24"
       ]
      },
      {
       "cls": "q4",
       "key": "D300",
       "title": "İzmir – Van",
       "sub": "İzmir → Manisa → Uşak → Kütahya → Afyonkarahisar → Konya → Aksaray → Nevşehir → Kayseri → Sivas → Kahramanmaraş → Malatya → Elazığ → Bingöl → Muş → Bitlis → Van",
       "ids": [
        "35",
        "45",
        "64",
        "43",
        "03",
        "42",
        "68",
        "50",
        "38",
        "58",
        "46",
        "44",
        "23",
        "12",
        "49",
        "13",
        "65"
       ]
      },
      {
       "cls": "q5",
       "key": "D400",
       "title": "Akdeniz kıyı yolu",
       "sub": "Muğla → Antalya → Mersin → Adana → Osmaniye → Gaziantep → Şanlıurfa → Mardin → Şırnak → Hakkâri",
       "ids": [
        "48",
        "07",
        "33",
        "01",
        "80",
        "27",
        "63",
        "47",
        "73",
        "30"
       ]
      },
      {
       "cls": "q6",
       "key": "D750",
       "title": "Zonguldak – Mersin",
       "sub": "Mersin → Adana → Niğde → Konya → Aksaray → Ankara → Bolu → Zonguldak",
       "ids": [
        "33",
        "01",
        "51",
        "42",
        "68",
        "06",
        "14",
        "67"
       ]
      },
      {
       "cls": "q7",
       "key": "D850",
       "title": "Ordu – Kilis",
       "sub": "Kilis → Gaziantep → Adıyaman → Malatya → Sivas → Tokat → Ordu",
       "ids": [
        "79",
        "27",
        "02",
        "44",
        "58",
        "60",
        "52"
       ]
      },
      {
       "cls": "q8",
       "key": "D950",
       "title": "Artvin – Mardin",
       "sub": "Mardin → Diyarbakır → Bingöl → Erzurum → Artvin",
       "ids": [
        "47",
        "21",
        "12",
        "25",
        "08"
       ]
      },
      {
       "cls": "q9",
       "key": "O-3",
       "title": "Avrupa Otoyolu",
       "sub": "Edirne → Kırklareli → Tekirdağ → İstanbul",
       "ids": [
        "22",
        "39",
        "59",
        "34"
       ]
      },
      {
       "cls": "q10",
       "key": "O-4",
       "title": "Anadolu Otoyolu",
       "sub": "İstanbul → Kocaeli → Sakarya → Düzce → Bolu → Ankara",
       "ids": [
        "34",
        "41",
        "54",
        "81",
        "14",
        "06"
       ]
      },
      {
       "cls": "q11",
       "key": "O-5",
       "title": "İstanbul–Bursa–İzmir Otoyolu",
       "sub": "Kocaeli → Yalova → Bursa → Balıkesir → Manisa → İzmir",
       "ids": [
        "41",
        "77",
        "16",
        "10",
        "45",
        "35"
       ]
      },
      {
       "cls": "q0",
       "key": "O-6",
       "title": "Kınalı–Tekirdağ–Çanakkale–Balıkesir Otoyolu",
       "sub": "Tekirdağ → Çanakkale → Balıkesir",
       "ids": [
        "59",
        "17",
        "10"
       ]
      },
      {
       "cls": "q1",
       "key": "O-7",
       "title": "Kuzey Marmara Otoyolu",
       "sub": "Sakarya → Kocaeli → İstanbul",
       "ids": [
        "54",
        "41",
        "34"
       ]
      },
      {
       "cls": "q2",
       "key": "O-21",
       "title": "Tarsus–Ankara Otoyolu",
       "sub": "Mersin → Adana → Niğde → Nevşehir → Aksaray → Ankara",
       "ids": [
        "33",
        "01",
        "51",
        "50",
        "68",
        "06"
       ]
      },
      {
       "cls": "q3",
       "key": "O-31",
       "title": "İzmir–Denizli–Burdur–Antalya Otoyolu",
       "sub": "İzmir → Aydın → Denizli",
       "ids": [
        "35",
        "09",
        "20"
       ]
      },
      {
       "cls": "q4",
       "key": "O-51",
       "title": "Adana–Mersin Otoyolu",
       "sub": "Mersin → Adana",
       "ids": [
        "33",
        "01"
       ]
      },
      {
       "cls": "q5",
       "key": "O-52",
       "title": "Adana–Şanlıurfa Otoyolu",
       "sub": "Adana → Osmaniye → Gaziantep → Şanlıurfa",
       "ids": [
        "01",
        "80",
        "27",
        "63"
       ]
      }
     ],
     "rulesTitle": "Karışan yollar",
     "rules": [
      {
       "title": "Aynı koridor: otoyol mu devlet yolu mu?",
       "ids": [
        "34",
        "41",
        "54",
        "81",
        "14",
        "06"
       ],
       "body": "İstanbul–Ankara arasında iki yol yan yana gider: O-4 otoyoldur (yeşil levha, turuncu kutu), D100 ise eski devlet yoludur (mavi levha). İkisi de Kocaeli, Sakarya, Düzce ve Bolu’dan geçer. Levhada hangi harf yazıyorsa onu oku.",
       "traps": [
        [
         "O-4 (yeşil levha, turuncu kutu)",
         "Anadolu Otoyolu: İstanbul – Kocaeli – Sakarya – Düzce – Bolu – Ankara"
        ],
        [
         "D100 (mavi levha)",
         "İstanbul’dan Bolu’ya kadar O-4 ile yan yana gider, sonra Ankara’ya değil Karabük–Çankırı yönüne ilerler"
        ]
       ]
      },
      {
       "title": "O-3 ve D100 batıda aynı koridorda",
       "ids": [
        "22",
        "39",
        "59",
        "34"
       ],
       "body": "Edirne–İstanbul arasında O-3 otoyolu ile D100 yan yana gider. Selimpaşa çıkış levhasında yeşil zeminde O-3 ve E-80 otoyolu, mavi çıkış panelinde ise çıkılan yol olan D-100 yazar.",
       "traps": [
        [
         "Yeşil levha, turuncu O-3",
         "otoyol: Edirne – Kırklareli – Tekirdağ – İstanbul"
        ],
        [
         "Mavi panel, çerçeveli D-100",
         "çıkılan devlet yolu (Selimpaşa çıkışı D100’e bağlanır)"
        ]
       ]
      }
     ],
     "visualsTitle": "Levhada numara nerede? ",
     "visuals": [
      {
       "id": "tr-yol",
       "title": "Yol numarası levhaları",
       "set": "tr-yol",
       "ids": [
        "34",
        "22",
        "39",
        "07"
       ],
       "sub": "Numara çerçeveli kutuda yazar: Selimpaşa çıkış levhasında turuncu kutuda O-3, E-80 ve mavi panelde D-100; Kınalı Kavşağı’nda D-110 ve D-100; Antalya’da D.400. Sarı kutular numaranın yerini gösterir.",
       "tags": [
        "D-100",
        "O-3",
        "D.400",
        "levha"
       ],
       "quiz": false
      }
     ],
     "routesVar": "TR_ROUTES",
     "routesNote": "Yol çizgileri OpenStreetMap verisinden (© OpenStreetMap katkıcıları, ODbL) sadeleştirilerek alındı; konum birkaç km sapabilir. Düz görünen kesitler sadeleştirmedir ya da haritada eksik veridir (örneğin D100’ün Edirne kesiti)."
    },
    {
     "key": "belediye",
     "navLabel": "Belediye adı",
     "icon": "sign",
     "drillPreset": "belediye",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Belediye ve ilçe adı: levha, rögar kapağı ve çöp kovası",
     "lead": "Sokakta yerel yönetimin adını en çok iki şey taşır: sokak levhası ve rögar kapağı. Levhanın alt satırında çoğu zaman «MAHALLE - İLÇE» yazar; bu doğrudan ilçeyi söyler. Büyükşehirlerin levha tasarımı da farklıdır. Kapakta ise idarenin adı ya da kısaltması (İSKİ, KOSKİ, SASKİ…) döküm olarak durur. Çöp kovasında ve konteynerde de belediyenin adı ya da amblemi durur, çoğu zaman yanında 444 ile başlayan bir telefon numarası da yazar: adı okuduğunda ilçeyi ya da ili bulursun. Fotoğraflardaki sarı kutular adın tam yerini gösterir.",
     "desc": "Levha rengi, alt satırdaki ilçe adı, kapaktaki idare adı ve çöp kovasındaki belediye adından ili bul.",
     "decoder": {
      "title": "Ne yazıyor?",
      "placeholder": "Örn. İSKİ, KOSKİ, Etimesgut, Ortahisar Belediyesi, yeşil levha…",
      "hint": "Levhada ya da kapakta gördüğünü yaz; ilin yeri haritada boyanır.",
      "quizPrompt": "Bu işaret hangi ile ait?",
      "noHit": "Bu ad listede yok. Kapakta «… BELEDİYESİ» yazıyorsa belediyenin adı yeri söyler.",
      "entries": [
       {
        "key": "Kırmızı levha, turkuaz şerit",
        "label": "Kırmızı levha + turkuaz alt şerit → İstanbul (Kadıköy)",
        "sub": "Şeritte ilçe adı, üstündeki ince satırda mahalle adı yazar. Fotoğraf Kadıköy'den; İstanbul'un başka ilçelerinde farklı tasarımlar da görülür.",
        "keys": [
         "kırmızı levha",
         "turkuaz",
         "kadıköy",
         "sokak levhası",
         "istanbul levha"
        ],
        "ids": [
         "34"
        ],
        "main": "Kırmızı levha + turkuaz şerit",
        "prompt": "Kırmızı levha ve turkuaz alt şerit (Kadıköy örneği) hangi ilde?"
       },
       {
        "key": "Bordo levha, siyah şerit",
        "label": "Koyu kırmızı levha + siyah alt şerit «MAHALLE - İLÇE» → Ankara",
        "sub": "Alt şeritte mahalle ve ilçe adı birlikte yazar (Etimesgut örneği: «GÖKSU MAHALLESİ - ETİMESGUT»). Ankara'da başka renkte levhalar da var.",
        "keys": [
         "bordo levha",
         "koyu kırmızı",
         "siyah şerit",
         "etimesgut",
         "göksu",
         "sokak levhası",
         "ankara levha"
        ],
        "ids": [
         "06"
        ],
        "main": "Koyu kırmızı levha + siyah şerit",
        "prompt": "Koyu kırmızı levha ve siyah alt şeritte «MAHALLE - İLÇE» hangi ilde (Etimesgut örneği)?"
       },
       {
        "key": "Lacivert levha, İzmir logosu",
        "label": "Lacivert levha + üstte İzmir Büyükşehir logosu → İzmir",
        "sub": "Logo saat kulesini gösterir; alt satırda mahalle adı ve (TN: …) kodu var.",
        "keys": [
         "lacivert levha",
         "mavi levha",
         "logo",
         "saat kulesi",
         "sokak levhası",
         "izmir levha",
         "huzur mahallesi"
        ],
        "ids": [
         "35"
        ],
        "main": "Lacivert levha + logo",
        "prompt": "Lacivert levhanın üstündeki saat kulesi logosu hangi ilin belediyesi?"
       },
       {
        "key": "Yeşil levha",
        "label": "Yeşil levha, beyaz çerçeve → Bursa",
        "sub": "Fotoğraf Bursa'nın tarihî sokağından (Fışkırık Caddesi). Learnable Meta'da «Bursa Green Signs» diye ayrı bir ipucu olarak geçer.",
        "keys": [
         "yeşil levha",
         "yeşil tabela",
         "sokak levhası",
         "bursa levha",
         "fışkırık"
        ],
        "ids": [
         "16"
        ],
        "main": "Yeşil levha",
        "prompt": "Beyaz çerçeveli yeşil sokak levhası hangi ilde (Bursa örneği)?"
       },
       {
        "key": "İSKİ",
        "label": "İSKİ → İstanbul",
        "sub": "İstanbul Su ve Kanalizasyon İdaresi. Kapağın ortasında logo ve yazı, kenar halkasında KANALİZASYON.",
        "keys": [
         "iski",
         "istanbul su",
         "rögar"
        ],
        "ids": [
         "34"
        ],
        "main": "İSKİ",
        "prompt": "İSKİ yazan kapak hangi ilde?"
       },
       {
        "key": "İBB logosu",
        "label": "İBB logosu → İstanbul",
        "sub": "İstanbul Büyükşehir Belediyesi. Beton kapakta logo ve «İBB F/O» yazısı.",
        "keys": [
         "ibb",
         "istanbul büyükşehir",
         "beton kapak",
         "f/o"
        ],
        "ids": [
         "34"
        ],
        "main": "İBB",
        "prompt": "İBB logolu kapak hangi ilde?"
       },
       {
        "key": "Kadıköy Belediyesi",
        "label": "İlçe belediyesi adı (Kadıköy Belediyesi) → İstanbul",
        "sub": "Kapakta ilçe belediyesinin adı yazabilir. İlçeyi okuyunca ili bilirsin.",
        "keys": [
         "kadıköy belediyesi",
         "ilçe belediyesi",
         "belediyesi"
        ],
        "ids": [
         "34"
        ],
        "main": "Kadıköy Belediyesi",
        "prompt": "«KADIKÖY BELEDİYESİ» yazan kapak hangi ilde?"
       },
       {
        "key": "İzmir Büyükşehir / İZSU",
        "label": "«İZMİR BÜYÜKŞEHİR BLD.» / İZSU → İzmir",
        "sub": "Kapağın ortasında yana yatık yazı. İZSU, İzmir Su ve Kanalizasyon İdaresi.",
        "keys": [
         "izsu",
         "izmir büyükşehir",
         "bld",
         "kanal kapağı"
        ],
        "ids": [
         "35"
        ],
        "main": "İZSU",
        "prompt": "«İZMİR BÜYÜKŞEHİR BLD.» ya da İZSU yazan kapak hangi ilde?"
       },
       {
        "key": "KOSKİ",
        "label": "KOSKİ → Konya",
        "sub": "Konya Su ve Kanalizasyon İdaresi. Halkada «KOSKİ GENEL MÜDÜRLÜĞÜ · KANALİZASYON», ortada logo.",
        "keys": [
         "koski",
         "konya su"
        ],
        "ids": [
         "42"
        ],
        "main": "KOSKİ",
        "prompt": "KOSKİ yazan kapak hangi ilde?"
       },
       {
        "key": "İSU",
        "label": "İSU → Kocaeli",
        "sub": "Kocaeli Su ve Kanalizasyon İdaresi. Izgaralı kapakta «İSU İÇMESUYU».",
        "keys": [
         "isu",
         "kocaeli su",
         "izmit",
         "içmesuyu"
        ],
        "ids": [
         "41"
        ],
        "main": "İSU",
        "prompt": "İSU yazan kapak hangi ilde?"
       },
       {
        "key": "Çanakkale Belediyesi",
        "label": "«ÇANAKKALE BELEDİYESİ» → Çanakkale",
        "sub": "Kapakta doğrudan belediyenin adı yazıyor; ortada üçgen işaret, kenarda KANALİZASYON.",
        "keys": [
         "çanakkale belediyesi",
         "çanakkale",
         "belediyesi"
        ],
        "ids": [
         "17"
        ],
        "main": "Çanakkale Belediyesi",
        "prompt": "«ÇANAKKALE BELEDİYESİ» yazan kapak hangi ilde?"
       },
       {
        "key": "SASKİ",
        "label": "SASKİ → Sakarya ya da Samsun",
        "sub": "Hem Sakarya hem Samsun Su ve Kanalizasyon İdaresi kısaltması SASKİ'dir. Fotoğraftaki kapak Sakarya'dan.",
        "keys": [
         "saski",
         "sakarya su",
         "samsun su",
         "adapazarı"
        ],
        "ids": [
         "54",
         "55"
        ],
        "main": "SASKİ",
        "prompt": "SASKİ hangi il?",
        "quiz": false
       },
       {
        "key": "ASKİ",
        "label": "ASKİ → Ankara ya da Aydın",
        "sub": "Ankara ve Aydın idarelerinin kısaltması aynıdır: ASKİ.",
        "keys": [
         "aski",
         "ankara su",
         "aydın su"
        ],
        "ids": [
         "06",
         "09"
        ],
        "main": "ASKİ",
        "prompt": "ASKİ hangi il?",
        "quiz": false
       },
       {
        "key": "KASKİ",
        "label": "KASKİ → Kayseri ya da Kahramanmaraş",
        "sub": "Kayseri ve Kahramanmaraş idarelerinin kısaltması aynıdır: KASKİ.",
        "keys": [
         "kaski",
         "kayseri su",
         "kahramanmaraş su"
        ],
        "ids": [
         "38",
         "46"
        ],
        "main": "KASKİ",
        "prompt": "KASKİ hangi il?",
        "quiz": false
       },
       {
        "key": "BUSKİ",
        "label": "BUSKİ → Bursa",
        "sub": "Bursa Su ve Kanalizasyon İdaresi.",
        "keys": [
         "buski",
         "bursa su"
        ],
        "ids": [
         "16"
        ],
        "main": "BUSKİ",
        "prompt": "BUSKİ hangi ilin su idaresi?"
       },
       {
        "key": "ASAT",
        "label": "ASAT → Antalya",
        "sub": "Antalya Su ve Atıksu İdaresi.",
        "keys": [
         "asat",
         "antalya su"
        ],
        "ids": [
         "07"
        ],
        "main": "ASAT",
        "prompt": "ASAT hangi ilin su idaresi?"
       },
       {
        "key": "MESKİ",
        "label": "MESKİ → Mersin",
        "sub": "Mersin Su ve Kanalizasyon İdaresi.",
        "keys": [
         "meski",
         "mersin su"
        ],
        "ids": [
         "33"
        ],
        "main": "MESKİ",
        "prompt": "MESKİ hangi ilin su idaresi?"
       },
       {
        "key": "GASKİ",
        "label": "GASKİ → Gaziantep",
        "sub": "Gaziantep Su ve Kanalizasyon İdaresi.",
        "keys": [
         "gaski",
         "gaziantep su"
        ],
        "ids": [
         "27"
        ],
        "main": "GASKİ",
        "prompt": "GASKİ hangi ilin su idaresi?"
       },
       {
        "key": "DİSKİ",
        "label": "DİSKİ → Diyarbakır",
        "sub": "Diyarbakır Su ve Kanalizasyon İdaresi.",
        "keys": [
         "diski",
         "diyarbakır su"
        ],
        "ids": [
         "21"
        ],
        "main": "DİSKİ",
        "prompt": "DİSKİ hangi ilin su idaresi?"
       },
       {
        "key": "DESKİ",
        "label": "DESKİ → Denizli",
        "sub": "Denizli Su ve Kanalizasyon İdaresi.",
        "keys": [
         "deski",
         "denizli su"
        ],
        "ids": [
         "20"
        ],
        "main": "DESKİ",
        "prompt": "DESKİ hangi ilin su idaresi?"
       },
       {
        "key": "MASKİ",
        "label": "MASKİ → Malatya",
        "sub": "Malatya Su ve Kanalizasyon İdaresi.",
        "keys": [
         "maski",
         "malatya su"
        ],
        "ids": [
         "44"
        ],
        "main": "MASKİ",
        "prompt": "MASKİ hangi ilin su idaresi?"
       },
       {
        "key": "MUSKİ",
        "label": "MUSKİ → Muğla",
        "sub": "Muğla Su ve Kanalizasyon İdaresi.",
        "keys": [
         "muski",
         "muğla su"
        ],
        "ids": [
         "48"
        ],
        "main": "MUSKİ",
        "prompt": "MUSKİ hangi ilin su idaresi?"
       },
       {
        "key": "OSKİ",
        "label": "OSKİ → Ordu",
        "sub": "Ordu Su ve Kanalizasyon İdaresi.",
        "keys": [
         "oski",
         "ordu su"
        ],
        "ids": [
         "52"
        ],
        "main": "OSKİ",
        "prompt": "OSKİ hangi ilin su idaresi?"
       },
       {
        "key": "ŞUSKİ",
        "label": "ŞUSKİ → Şanlıurfa",
        "sub": "Şanlıurfa Su ve Kanalizasyon İdaresi.",
        "keys": [
         "suski",
         "şanlıurfa su",
         "urfa su"
        ],
        "ids": [
         "63"
        ],
        "main": "ŞUSKİ",
        "prompt": "ŞUSKİ hangi ilin su idaresi?"
       },
       {
        "key": "TESKİ",
        "label": "TESKİ → Tekirdağ",
        "sub": "Tekirdağ Su ve Kanalizasyon İdaresi.",
        "keys": [
         "teski",
         "tekirdağ su"
        ],
        "ids": [
         "59"
        ],
        "main": "TESKİ",
        "prompt": "TESKİ hangi ilin su idaresi?"
       },
       {
        "key": "TİSKİ",
        "label": "TİSKİ → Trabzon",
        "sub": "Trabzon İçmesuyu ve Kanalizasyon İdaresi.",
        "keys": [
         "tiski",
         "trabzon su"
        ],
        "ids": [
         "61"
        ],
        "main": "TİSKİ",
        "prompt": "TİSKİ hangi ilin su idaresi?"
       },
       {
        "key": "HATSU",
        "label": "HATSU → Hatay",
        "sub": "Hatay Su ve Kanalizasyon İdaresi.",
        "keys": [
         "hatsu",
         "hatay su"
        ],
        "ids": [
         "31"
        ],
        "main": "HATSU",
        "prompt": "HATSU hangi ilin su idaresi?"
       },
       {
        "key": "BASKİ",
        "label": "BASKİ → Balıkesir",
        "sub": "Balıkesir Su ve Kanalizasyon İdaresi.",
        "keys": [
         "baski",
         "balıkesir su",
         "marmara adası"
        ],
        "ids": [
         "10"
        ],
        "main": "BASKİ",
        "prompt": "BASKİ hangi ilin su idaresi?"
       },
       {
        "key": "Çöp konteyneri: belediye adı",
        "label": "Gri metal konteynerde boyayla «… BELEDİYESİ» ve 444 numarası → o belediyenin ili (Ortahisar Belediyesi → Trabzon)",
        "sub": "Konteynerin ön yüzüne belediyenin adı ve çoğu zaman 444 ile başlayan bir numara boyanır. Fotoğrafta «ORTAHİSAR BELEDİYESİ 444 61 44» yazıyor: Ortahisar Trabzon’un merkez ilçesidir. İlçe belediyesi adını okursan ili bulursun; büyükşehirlerde ise büyükşehir belediyesi adı yazar.",
        "keys": [
         "konteyner",
         "çöp konteyneri",
         "çöp konteynerı",
         "ortahisar",
         "ortahisar belediyesi",
         "444 61 44",
         "belediye konteyneri",
         "boyalı yazı"
        ],
        "ids": [
         "61"
        ],
        "main": "Çöp konteyneri: belediye adı",
        "prompt": "Konteynerde «ORTAHİSAR BELEDİYESİ» yazıyorsa hangi ildesin?"
       },
       {
        "key": "Çöp kovası: belediye amblemi",
        "label": "Mavi çöp kovasında belediye amblemi ve adı → o belediyenin ili (Amasra Belediyesi → Bartın)",
        "sub": "Kasaba ve ilçelerde çöp kovası belediyenin renginde boyanır; üzerinde amblem ve ad bulunur. Fotoğrafta mavi kovada kalkan biçimli amblem ve «AMASRA BELEDİYESİ» yazıyor: Amasra Bartın’ın ilçesidir. Aynı renk başka belediyede de çıkabilir, adı oku.",
        "keys": [
         "çöp kovası",
         "çöp kutusu",
         "kova",
         "amasra",
         "amasra belediyesi",
         "amblem",
         "belediye amblemi",
         "mavi kova"
        ],
        "ids": [
         "74"
        ],
        "main": "Çöp kovası: belediye amblemi",
        "prompt": "Mavi çöp kovasında «AMASRA BELEDİYESİ» ve kalkan amblem hangi ilin işaretidir?"
       },
       {
        "key": "Giysi kumbarası: ilçe mührü",
        "label": "Giysi kumbarasında ilçe belediyesinin adı ve «KONYA» mührü → Konya (Selçuklu)",
        "sub": "Sokaklardaki kullanılmış giysi kumbaraları belediyeye aittir; üstte adı ve mührü durur. Fotoğrafta «SELÇUKLU BELEDİYESİ» yazısı ve içinde «KONYA · 1989» yazan mühür var: Selçuklu Konya’nın bir ilçesidir. Alttaki 444 numaraları yer söylemez.",
        "keys": [
         "kumbara",
         "giysi kumbarası",
         "selçuklu",
         "selçuklu belediyesi",
         "konya mührü",
         "sıfır atık",
         "444 8 394",
         "444 9 919"
        ],
        "ids": [
         "42"
        ],
        "main": "Giysi kumbarası: ilçe mührü",
        "prompt": "Giysi kumbarasında «SELÇUKLU BELEDİYESİ» ve «KONYA» mührü hangi ilin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Levhanın alt satırını oku",
       "body": "Sokak levhasının altında çoğu zaman mahalle ve ilçe adı yazar: «GÖKSU MAHALLESİ - ETİMESGUT». İlçeyi okuduysan ili bilirsin. Yalnızca mahalle yazan levhalarda (İzmir örneği) levhanın rengi ve logosu büyükşehri söyler."
      },
      {
       "title": "Levha tasarımı büyükşehri söyler",
       "body": "İstanbul'un Kadıköy ilçesinde kırmızı levha ve turkuaz şerit, Ankara'da koyu kırmızı levha ve siyah alt şerit, İzmir'de lacivert levha ve üstte logo, Bursa'da yeşil levha görülür. Bunlar fotoğraflardaki örneklerdir; aynı şehirde başka tasarımlar da çıkabilir."
      },
      {
       "title": "Kapakta idarenin adı yazar",
       "body": "Rögar kapağının ortasında ya da kenar halkasında idarenin adı veya kısaltması durur: İSKİ İstanbul, KOSKİ Konya, İSU Kocaeli, SASKİ Sakarya. «… BELEDİYESİ» yazıyorsa belediyenin adı yeri söyler. Kenardaki Erkon, Payza ve İstikamet gibi adlar dökümcü firmadır: yer değil."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Aynı kısaltmayı paylaşan iller",
       "ids": [
        "06",
        "09",
        "38",
        "46",
        "54",
        "55"
       ],
       "body": "Üç kısaltma iki ilde birden kullanılır. Kapaktaki tam adı, çevreyi ve alan kodunu birlikte değerlendir.",
       "traps": [
        [
         "ASKİ",
         "Ankara ya da Aydın"
        ],
        [
         "KASKİ",
         "Kayseri ya da Kahramanmaraş"
        ],
        [
         "SASKİ",
         "Sakarya ya da Samsun"
        ]
       ]
      },
      {
       "title": "Dökümcü firma yer değildir",
       "ids": [
        "54",
        "41"
       ],
       "body": "Sakarya kapağının tutamacında «PAYZA KAYSERİ», Kocaeli kapağında «ERKON» yazar. İkisi de üreticidir. İdarenin adı kapağın ortasında ya da kenar halkasındadır.",
       "traps": [
        [
         "PAYZA KAYSERİ",
         "dökümcü firma, Kayseri değil"
        ],
        [
         "ERKON",
         "dökümcü firma, yer adı değil"
        ]
       ]
      },
      {
       "title": "444’lü numara yer söylemez",
       "ids": [
        "61",
        "42"
       ],
       "body": "Konteynerde ve kumbarada yazan 444 ile başlayan numaralar belediyenin ya da firmanın çağrı merkezidir; alan kodu değildir ve yeri söylemez. Yeri belediyenin adı ve amblemi söyler.",
       "traps": [
        [
         "444 61 44 (konteyner)",
         "Ortahisar Belediyesi’nin çağrı numarası; yer söylemeyen numara, yeri «ORTAHİSAR» yazısı söyler"
        ],
        [
         "444 8 394 / 444 9 919 (kumbara)",
         "firma ve belediye çağrı numarası; yeri «SELÇUKLU · KONYA» söyler"
        ]
       ]
      }
     ],
     "visualsTitle": "Fotoğraflı örnekler ",
     "visuals": [
      {
       "id": "v-istanbul",
       "title": "İstanbul: levha, İSKİ, İBB, Kadıköy",
       "badge": "İSKİ · İBB",
       "set": "tr-istanbul",
       "ids": [
        "34"
       ],
       "sub": "Kadıköy'de kırmızı levha ve turkuaz şerit; kapaklarda İSKİ, İBB logosu ve ilçe belediyesinin adı.",
       "tags": [
        "İSKİ",
        "İBB",
        "Kadıköy"
       ]
      },
      {
       "id": "v-ankara",
       "title": "Ankara: levhanın alt şeridi",
       "badge": "MAHALLE - İLÇE",
       "set": "tr-ankara",
       "ids": [
        "06"
       ],
       "sub": "Koyu kırmızı levhanın siyah alt şeridinde mahalle ve ilçe adı birlikte yazıyor.",
       "tags": [
        "Etimesgut"
       ]
      },
      {
       "id": "v-izmir",
       "title": "İzmir: lacivert levha ve kapak",
       "badge": "İzmir BB",
       "set": "tr-izmir",
       "ids": [
        "35"
       ],
       "sub": "Levhada üstte logo, altta mahalle adı; kapakta yana yatık «İZMİR BÜYÜKŞEHİR BLD.» yazısı.",
       "tags": [
        "İZSU",
        "saat kulesi"
       ]
      },
      {
       "id": "v-bursa",
       "title": "Bursa: yeşil levha",
       "badge": "Yeşil",
       "set": "tr-bursa",
       "ids": [
        "16"
       ],
       "sub": "Beyaz çerçeveli, beyaz harfli yeşil levha.",
       "tags": [
        "yeşil levha"
       ]
      },
      {
       "id": "v-konya",
       "title": "Konya: KOSKİ kapağı",
       "badge": "KOSKİ",
       "set": "tr-konya",
       "ids": [
        "42"
       ],
       "sub": "Ortada KOSKİ logosu; halkada «KOSKİ GENEL MÜDÜRLÜĞÜ · KANALİZASYON».",
       "tags": [
        "KOSKİ"
       ]
      },
      {
       "id": "v-sakarya",
       "title": "Sakarya: SASKİ kapağı",
       "badge": "SASKİ",
       "set": "tr-sakarya",
       "ids": [
        "54"
       ],
       "sub": "Ortada SASKİ. Tutamaktaki «PAYZA KAYSERİ» dökümcü firmadır, yer değil.",
       "tags": [
        "SASKİ",
        "Payza"
       ]
      },
      {
       "id": "v-kocaeli",
       "title": "Kocaeli: İSU kapağı",
       "badge": "İSU",
       "set": "tr-kocaeli",
       "ids": [
        "41"
       ],
       "sub": "Izgaralı kapakta «İSU İÇMESUYU»: içme suyu hattının kapağı.",
       "tags": [
        "İSU"
       ]
      },
      {
       "id": "v-canakkale",
       "title": "Çanakkale: belediye adı",
       "badge": "Belediye",
       "set": "tr-canakkale",
       "ids": [
        "17"
       ],
       "sub": "Kapakta doğrudan «ÇANAKKALE BELEDİYESİ» yazıyor.",
       "tags": [
        "belediye adı"
       ]
      },
      {
       "id": "v-cop",
       "title": "Çöp kovası, konteyner ve kumbara",
       "set": "tr-bin",
       "ids": [
        "61",
        "74",
        "42"
       ],
       "sub": "Belediyenin adı ve amblemi kovanın, konteynerin ve giysi kumbarasının üstünde durur: Ortahisar (Trabzon), Amasra (Bartın), Selçuklu (Konya). Sarı kutular adın yerini gösterir. Commons’ta okunaklı örnek az, o yüzden üç fotoğraf var.",
       "tags": [
        "çöp kovası",
        "konteyner",
        "kumbara",
        "belediye adı"
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
     "title": "Bölgeyi gösteren manzara ve yapılar",
     "lead": "Türkiye’de tabela ve yazı bölgeyi her zaman söylemez, ama manzara söyler. Doğu Karadeniz’de çay ve fındık; Trakya’da düz ayçiçeği tarlaları; Ege’de zeytinlik, Pamukkale; Akdeniz’de sera ve Çukurova’da pamuk; İç Anadolu’da Tuz Gölü ve Kapadokya; güneydoğuda Nemrut ve bal rengi taş evler; doğuda Ağrı Dağı ve Van Gölü. Burada yalnızca sık karşına çıkan, kolay görülen ipuçları var.",
     "desc": "Çay terasından, seradan, taş evden ve dağdan bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. çay, sera, serender, kümbet, Ağrı Dağı…",
      "hint": "Gördüğün ipucunu yaz: hangi bölge olduğu haritada boyanır.",
      "quizPrompt": "Bu görünüm hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Çay terasları",
        "label": "Dik yamaçta çay terasları → Doğu Karadeniz (Rize ağırlıklı)",
        "sub": "Kısa budanmış, yuvarlak çay çalıları sıra sıra dizilir. Türkiye'de çay Doğu Karadeniz kıyısına özgüdür; üretimin büyük kısmı Rize'de, Trabzon, Artvin ve Giresun'un payı daha küçüktür.",
        "keys": [
         "çay",
         "çay bahçesi",
         "çay terası",
         "rize",
         "çaykur",
         "teras"
        ],
        "ids": [
         "53",
         "61",
         "08",
         "28"
        ],
        "main": "Çay terasları",
        "prompt": "Dik yamaçta çay terasları hangi bölgede görülür?"
       },
       {
        "key": "Fındık bahçeleri",
        "label": "Dik yamaçta sık, alçak fındık çalıları → Karadeniz kıyısı (Ordu, Giresun, Samsun, Sakarya, Düzce, Trabzon)",
        "sub": "Fındığın çoğu bu altı ilde yetişir; Ordu en büyük üreticidir. Çay gibi sıralı değil, sık ve düzensiz çalı toplulukları halinde görünür.",
        "keys": [
         "fındık",
         "fındık bahçesi",
         "fındık ocağı",
         "ordu",
         "giresun",
         "sakarya",
         "düzce",
         "samsun"
        ],
        "ids": [
         "52",
         "55",
         "28",
         "54",
         "81",
         "61"
        ],
        "main": "Fındık bahçeleri",
        "prompt": "Dik yamaçları kaplayan sık fındık bahçeleri en çok hangi bölgede görülür?"
       },
       {
        "key": "Serender",
        "label": "Direkler üstünde ahşap ambar (serender) → Karadeniz köyleri",
        "sub": "Tahıl saklamak için direkler üstüne kurulmuş küçük ahşap yapı. Fotoğraflarda Artvin, Trabzon ve Ordu'dan örnekler var; batıda Samsun ve Sakarya köylerinde de bulunur.",
        "keys": [
         "serender",
         "serander",
         "ambar",
         "tahıl ambarı",
         "direkler",
         "ahşap ambar"
        ],
        "ids": [
         "08",
         "53",
         "61",
         "28",
         "52"
        ],
        "main": "Serender",
        "prompt": "Direkler üstünde küçük ahşap tahıl ambarı hangi bölgenin işaretidir?"
       },
       {
        "key": "Ayçiçeği",
        "label": "Geniş, düz ayçiçeği tarlaları → Trakya",
        "sub": "Ayçiçeğinin yarısına yakını Tekirdağ, Edirne ve Kırklareli'nde yetişir; arazi düz ve açıktır. Konya ve Adana'da da ekilir, bu yüzden tek başına kesin ipucu değil, güçlü bir ilk tahmindir.",
        "keys": [
         "ayçiçeği",
         "trakya",
         "tekirdağ",
         "edirne",
         "kırklareli",
         "düz tarla"
        ],
        "ids": [
         "59",
         "22",
         "39"
        ],
        "main": "Ayçiçeği",
        "prompt": "Uçsuz bucaksız ayçiçeği tarlaları en çok hangi bölgede görülür?"
       },
       {
        "key": "Sera",
        "label": "Ovayı kaplayan sera örtüleri → Akdeniz kıyısı (Antalya, Mersin, Muğla, Adana)",
        "sub": "Seraların yarısına yakını Antalya'dadır; Kumluca ovası öne çıkar. Mersin, Muğla ve Adana da önde gelir. Vadi tabanı ya da ova beyaz ve şeffaf örtülerle kaplanır.",
        "keys": [
         "sera",
         "plastik örtü",
         "domates",
         "kumluca",
         "antalya",
         "mersin",
         "seralar"
        ],
        "ids": [
         "07",
         "33",
         "48",
         "01"
        ],
        "main": "Sera",
        "prompt": "Ovayı kaplayan sera örtüleri en çok hangi kıyıda görülür?"
       },
       {
        "key": "Kümbet evler",
        "label": "Koni kubbeli toprak evler → Harran (Şanlıurfa)",
        "sub": "Harran Ovası'nda toprak renkli, koni biçimli kubbeli evler. Düz ve kurak arazide durur. Seyrek görülür ama görürsen yer bellidir.",
        "keys": [
         "kümbet",
         "harran",
         "koni",
         "kubbe",
         "arı kovanı",
         "beehive"
        ],
        "ids": [
         "63"
        ],
        "main": "Kümbet evler",
        "prompt": "Koni biçimli kubbeli toprak evler hangi ilin işaretidir?"
       },
       {
        "key": "Mardin taşı",
        "label": "Bal rengi kesme taş, kemerli pencere → Mardin (Midyat dahil)",
        "sub": "Evler bal rengi kesme taştandır, pencereler kemerli, şehir tepeye basamak basamak dizilir. Diyarbakır'ın eski kenti ise siyah bazalt taşla yapılmıştır; rengi ayırt et.",
        "keys": [
         "mardin",
         "midyat",
         "taş ev",
         "bal rengi",
         "kesme taş",
         "kemer",
         "savur"
        ],
        "ids": [
         "47"
        ],
        "main": "Mardin taşı",
        "prompt": "Bal rengi kesme taş evler ve kemerli pencereler hangi ilin işaretidir?"
       },
       {
        "key": "Peri bacaları",
        "label": "Külah biçimli kayalar, kayaya oyulmuş evler → Kapadokya (Nevşehir)",
        "sub": "Kapadokya Nevşehir merkezlidir (Göreme, Ürgüp, Avanos, Uçhisar); Kayseri, Niğde ve Aksaray'a da uzanır.",
        "keys": [
         "kapadokya",
         "peri bacası",
         "göreme",
         "nevşehir",
         "kaya ev",
         "ürgüp",
         "avanos",
         "uçhisar"
        ],
        "ids": [
         "50",
         "38",
         "51",
         "68"
        ],
        "main": "Peri bacaları",
        "prompt": "Külah biçimli kayalar ve kayaya oyulmuş evler hangi bölgede?"
       },
       {
        "key": "Ağrı Dağı",
        "label": "Ufukta tek başına yükselen karlı dev koni → Ağrı Dağı (Ağrı, Iğdır)",
        "sub": "Türkiye'nin en yüksek dağıdır (5137 m). Doğubayazıt (Ağrı) ve Iğdır çevresinden görünür; çevresi ağaçsız ve kurak düzlüktür.",
        "keys": [
         "ağrı dağı",
         "ararat",
         "doğubayazıt",
         "iğdır",
         "karlı dağ"
        ],
        "ids": [
         "04",
         "76"
        ],
        "main": "Ağrı Dağı",
        "prompt": "Ufukta tek başına yükselen karlı dev koni hangi bölgenin işaretidir?"
       },
       {
        "key": "Van Gölü",
        "label": "Geniş mavi göl, adada kilise → Van Gölü (Van, Bitlis)",
        "sub": "Van Gölü Türkiye'nin en büyük gölüdür; kıyısında Van ve Bitlis (Tatvan, Ahlat) var. Akdamar Adası'ndaki Ahtamar Kilisesi göl manzarasının en tanınmış simgesidir.",
        "keys": [
         "van gölü",
         "akdamar",
         "ahtamar",
         "tatvan",
         "ahlat",
         "göl"
        ],
        "ids": [
         "65",
         "13"
        ],
        "main": "Van Gölü",
        "prompt": "Geniş mavi göl ve adadaki kilise hangi bölgenin işaretidir?"
       },
       {
        "key": "Beyaz küp evler",
        "label": "Beyaz badanalı küp evler → Bodrum (Muğla)",
        "sub": "Bodrum yarımadasında yamaçlara beyaz badanalı, düz çatılı küp evler yayılır. Ege ve Akdeniz tatil beldelerinde benzerleri olabilir; destekleyici ipucu say.",
        "keys": [
         "bodrum",
         "beyaz ev",
         "küp ev",
         "badana",
         "muğla"
        ],
        "ids": [
         "48"
        ],
        "main": "Beyaz küp evler",
        "prompt": "Beyaz badanalı küp evler hangi ilin işaretidir?",
        "quiz": false
       },
       {
        "key": "Zeytinlik",
        "label": "Gri-yeşil, kısa gövdeli zeytin ağaçları, taşlı toprak → Ege ve Marmara’nın güneyi (Balıkesir, İzmir, Aydın, Manisa, Muğla, Çanakkale)",
        "sub": "Zeytin Ege kıyısında ve Marmara’nın güneyinde, Akdeniz iklimi olan yerlerde yetişir; dar gri-yeşil yapraklı, kıvrık gövdeli ağaçlar çoğu zaman yamaçlarda sıra sıra durur. Karadeniz’de zeytin yoktur: oradaki ağaç görünümü fındık ya da çaydır. Fotoğraf Ayvalık Cunda Adası’ndan.",
        "keys": [
         "zeytin",
         "zeytinlik",
         "zeytin ağacı",
         "zeytin bahçesi",
         "ayvalık",
         "ege"
        ],
        "ids": [
         "10",
         "35",
         "09",
         "45",
         "48",
         "17"
        ],
        "main": "Zeytinlik",
        "prompt": "Taşlı toprakta gri-yeşil kıvrık gövdeli zeytinlikler en çok hangi bölgenin işaretidir?"
       },
       {
        "key": "Pamuk tarlası",
        "label": "Beyaz kozaları açmış alçak pamuk tarlaları → Çukurova, Ege ve Güneydoğu (Adana, Hatay, Aydın, Şanlıurfa, Diyarbakır, Mardin)",
        "sub": "Pamuk sıcak ve sulanan ovalarda yetişir: Çukurova, Menderes (Ege) ve Güneydoğu’nun sulanan ovaları. Ekim sonunda kozalar açar, tarla beyaz noktalı görünür. Fotoğraf Antalya Belek’ten; pamuk orada da ekilir ama asıl ekim bölgeleri yukarıdaki illerdir.",
        "keys": [
         "pamuk",
         "pamuk tarlası",
         "koza",
         "çukurova",
         "gap"
        ],
        "ids": [
         "01",
         "31",
         "09",
         "63",
         "21",
         "47"
        ],
        "main": "Pamuk tarlası",
        "prompt": "Beyaz kozalı alçak pamuk tarlaları en çok hangi bölgelerin işaretidir?"
       },
       {
        "key": "Pamukkale",
        "label": "Beyaz travertenler ve turkuaz havuzlar → Pamukkale (Denizli)",
        "sub": "Pamukkale’de kaynak suyundaki kireç yamaca beyaz basamaklar halinde çökelir; basamakların arasında sığ turkuaz havuzlar kalır. Dünyada benzeri çok azdır; gördüysen Denizli’desin.",
        "keys": [
         "pamukkale",
         "traverten",
         "beyaz teras",
         "kalsiyum",
         "hierapolis",
         "denizli"
        ],
        "ids": [
         "20"
        ],
        "main": "Pamukkale",
        "prompt": "Yamaçta beyaz traverten basamakları ve turkuaz havuzlar hangi ilin işaretidir?"
       },
       {
        "key": "Nemrut Dağı",
        "label": "Dağ tepesinde dev taş heykel başları, yığın taşlar → Nemrut Dağı (Adıyaman)",
        "sub": "Kommagene Kralı I. Antiochos’un yaptırdığı tümülüsün doğu ve batı terasında oturan dev heykeller (tanrılar, aslan ve kartal) bulunur; başlar yere düşmüştür. Heykel başlarını dağ tepesinde görüyorsan Adıyaman’dasın.",
        "keys": [
         "nemrut",
         "nemrut dağı",
         "heykel başları",
         "kommagene",
         "antiochos",
         "adıyaman",
         "tümülüs"
        ],
        "ids": [
         "02"
        ],
        "main": "Nemrut Dağı",
        "prompt": "Dağ tepesinde dev taş heykel başları hangi ilin işaretidir?"
       },
       {
        "key": "Tuz Gölü",
        "label": "Ufka uzanan düz tuz yüzeyi, ağaçsız kıyı → Tuz Gölü çevresi (Aksaray, Konya, Ankara)",
        "sub": "İç Anadolu’nun ortasındaki Tuz Gölü yaza doğru kuruyup beyaz tuz kabuğu bırakır; kıyı düz ve ağaçsızdır, bitki yalnızca alçak tuz çalılarıdır. Üç ilin sınırı gölde buluşur: Aksaray, Konya ve Ankara.",
        "keys": [
         "tuz gölü",
         "tuz",
         "tuz kabuğu",
         "tuzlu göl",
         "beyaz göl",
         "aksaray",
         "şereflikoçhisar"
        ],
        "ids": [
         "68",
         "42",
         "06"
        ],
        "main": "Tuz Gölü",
        "prompt": "Ufka uzanan düz beyaz tuz yüzeyi ve ağaçsız kıyı hangi illerin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce bitkiye bak",
       "body": "Çay ve fındık yalnızca Karadeniz kıyısında yetişir; zeytin Ege’de ve Marmara’nın güneyinde; sera örtüsü Akdeniz kıyısında; pamuk Çukurova, Ege ve Güneydoğu’da; ayçiçeği en çok Trakya’da. Bitki tek başına bölgeyi söyler."
      },
      {
       "title": "Sonra yapıya bak",
       "body": "Karadeniz köylerinde direkler üstünde ahşap serender, Mardin çevresinde bal rengi kesme taş, Harran'da koni kubbeler, Kapadokya'da kayaya oyulmuş evler var."
      },
      {
       "title": "Ufukta dağ ya da göl var mı?",
       "body": "Tek başına yükselen karlı dev koni Ağrı Dağı'dır, doğuda Doğubayazıt çevresindedir. Geniş mavi göl Van Gölü'dür; kıyıda Van ve Bitlis var."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Çay mı fındık mı?",
       "ids": [
        "53",
        "61",
        "08",
        "28",
        "52",
        "55",
        "54",
        "81"
       ],
       "body": "İkisi de Karadeniz yamaçlarındadır. Çay kısa budanmış, sıralı ve yuvarlak çalılardır; fındık daha sık ve düzensiz çalı toplulukları halinde durur. Çay doğuda yoğundur (Rize, Trabzon, Artvin); fındık Ordu'dan Sakarya ve Düzce'ye kadar uzanır.",
       "traps": [
        [
         "Sıra sıra, kısa ve yuvarlak çalılar",
         "çay (Rize ve çevresi)"
        ],
        [
         "Sık, uzun ve düzensiz çalılar",
         "fındık (Ordu, Giresun, Samsun, Sakarya, Düzce)"
        ]
       ]
      },
      {
       "title": "Taş mı, kaya mı?",
       "ids": [
        "47",
        "50"
       ],
       "body": "İkisi de açık renklidir ama farklıdır. Mardin'de bina taştan örülmüştür: kesme taş duvar, kemerli pencere. Kapadokya'da oda kayanın içine oyulmuştur: külah biçimli kayalar.",
       "traps": [
        [
         "Bal rengi kesme taş cephe, kemerli pencere",
         "Mardin"
        ],
        [
         "Kayaya oyulmuş oda, külah biçimli kaya",
         "Kapadokya (Nevşehir)"
        ]
       ]
      }
     ],
     "visualsTitle": "Fotoğraflı örnekler ",
     "visuals": [
      {
       "id": "v-cay",
       "title": "Çay terasları",
       "badge": "Çay",
       "set": "tr-cay",
       "ids": [
        "53",
        "61",
        "08",
        "28"
       ],
       "sub": "Dik yamaçta sıra sıra, kısa budanmış çay çalıları. Rize, Trabzon, Artvin ve Giresun.",
       "tags": [
        "çay",
        "teras"
       ]
      },
      {
       "id": "v-findik",
       "title": "Fındık bahçeleri",
       "badge": "Fındık",
       "set": "tr-findik",
       "ids": [
        "52",
        "55",
        "28",
        "54",
        "81",
        "61"
       ],
       "sub": "Dik yamaçlarda sık, alçak çalılar. Ordu, Samsun, Giresun, Sakarya, Düzce ve Trabzon.",
       "tags": [
        "fındık"
       ]
      },
      {
       "id": "v-serander",
       "title": "Serender: direkler üstünde ahşap ambar",
       "badge": "Serender",
       "set": "tr-serander",
       "ids": [
        "08",
        "53",
        "61",
        "28",
        "52"
       ],
       "sub": "Karadeniz köylerinde tahıl için kurulmuş küçük ahşap yapı; fotoğraflarda Artvin, Trabzon ve Ordu.",
       "tags": [
        "serender",
        "ahşap"
       ]
      },
      {
       "id": "v-aycicegi",
       "title": "Ayçiçeği tarlası",
       "badge": "Ayçiçeği",
       "set": "tr-aycicegi",
       "ids": [
        "59",
        "22",
        "39"
       ],
       "sub": "Düz, açık arazide geniş ayçiçeği tarlaları: Trakya.",
       "tags": [
        "ayçiçeği",
        "Trakya"
       ]
      },
      {
       "id": "v-sera",
       "title": "Sera örtüleri",
       "badge": "Sera",
       "set": "tr-sera",
       "ids": [
        "07",
        "33",
        "48",
        "01"
       ],
       "sub": "Ova ve vadi tabanı beyaz örtülerle kaplı: Akdeniz kıyısı, en çok Antalya.",
       "tags": [
        "sera",
        "Kumluca"
       ]
      },
      {
       "id": "v-harran",
       "title": "Harran: koni kubbeli evler",
       "badge": "Kümbet",
       "set": "tr-harran",
       "ids": [
        "63"
       ],
       "sub": "Düz, kurak ovada toprak renkli koni kubbeler: Harran, Şanlıurfa.",
       "tags": [
        "kümbet",
        "Harran"
       ]
      },
      {
       "id": "v-mardin",
       "title": "Mardin: bal rengi taş evler",
       "badge": "Mardin taşı",
       "set": "tr-mardin",
       "ids": [
        "47"
       ],
       "sub": "Kesme taş cephe ve kemerli pencere; şehir tepeye basamak basamak dizilir.",
       "tags": [
        "taş",
        "kemer"
       ]
      },
      {
       "id": "v-kapadokya",
       "title": "Kapadokya: külah kayalar ve kaya evler",
       "badge": "Peri bacası",
       "set": "tr-kapadokya",
       "ids": [
        "50",
        "38",
        "51",
        "68"
       ],
       "sub": "Yumuşak kayadan oyulmuş külahlar ve odalar: Nevşehir merkezli.",
       "tags": [
        "Göreme",
        "kaya ev"
       ]
      },
      {
       "id": "v-agri",
       "title": "Ağrı Dağı",
       "badge": "Ağrı Dağı",
       "set": "tr-agri",
       "ids": [
        "04",
        "76"
       ],
       "sub": "Doğubayazıt çevresinde ufukta tek başına yükselen karlı koni.",
       "tags": [
        "Ağrı Dağı",
        "Doğubayazıt"
       ]
      },
      {
       "id": "v-van",
       "title": "Van Gölü ve Akdamar",
       "badge": "Van Gölü",
       "set": "tr-van",
       "ids": [
        "65",
        "13"
       ],
       "sub": "Geniş mavi göl, adada kilise, arkada karlı dağlar.",
       "tags": [
        "Akdamar",
        "göl"
       ]
      },
      {
       "id": "v-bodrum",
       "title": "Bodrum: beyaz küp evler",
       "badge": "Bodrum",
       "set": "tr-bodrum",
       "ids": [
        "48"
       ],
       "sub": "Yamaçlara yayılan beyaz badanalı, düz çatılı evler.",
       "tags": [
        "Bodrum",
        "beyaz ev"
       ]
      },
      {
       "id": "v-zeytin",
       "title": "Zeytinlik (Ege)",
       "set": "tr-zeytin",
       "ids": [
        "10",
        "35",
        "09",
        "45",
        "48",
        "17"
       ],
       "sub": "Gri-yeşil ince yapraklı, kıvrık gövdeli zeytinler; fotoğraf Ayvalık Cunda’dan.",
       "tags": [
        "zeytin",
        "Ayvalık",
        "Ege"
       ]
      },
      {
       "id": "v-pamuk",
       "title": "Pamuk tarlası",
       "set": "tr-pamuk",
       "ids": [
        "01",
        "31",
        "09",
        "63",
        "21",
        "47"
       ],
       "sub": "Alçak çalılarda beyaz koza; fotoğraf Antalya Belek’ten, asıl ekim yeri Çukurova, Ege ve Güneydoğu.",
       "tags": [
        "pamuk",
        "koza"
       ]
      },
      {
       "id": "v-pamukkale",
       "title": "Pamukkale travertenleri",
       "set": "tr-pamukkale",
       "ids": [
        "20"
       ],
       "sub": "Yamaçta beyaz kireç basamakları ve turkuaz havuzlar.",
       "tags": [
        "Pamukkale",
        "traverten",
        "Denizli"
       ]
      },
      {
       "id": "v-nemrut",
       "title": "Nemrut Dağı heykelleri",
       "set": "tr-nemrut",
       "ids": [
        "02"
       ],
       "sub": "Tepedeki teraslarda dev tanrı ve kral başları; doğu ve batı terasından üç fotoğraf.",
       "tags": [
        "Nemrut",
        "Adıyaman"
       ]
      },
      {
       "id": "v-tuz",
       "title": "Tuz Gölü",
       "set": "tr-tuz",
       "ids": [
        "68",
        "42",
        "06"
       ],
       "sub": "Düz, ağaçsız kıyı ve ufka uzanan tuzlu su ya da tuz kabuğu.",
       "tags": [
        "Tuz Gölü",
        "Aksaray"
       ]
      }
     ],
     "practice": "visual"
    }
   ]
  });
})(typeof window !== 'undefined' ? window : globalThis);

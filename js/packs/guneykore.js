/* packs/guneykore.js — Güney Kore: Hangul adlar ve telefon alan kodları
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "guneykore",
   "name": "Güney Kore",
   "code": "KR",
   "area": "Asya",
   "tone": "green",
   "geoVar": "KR_GEO",
   "themeId": "th-guneykore",
   "themeCfg": {
    "aria": "Güney Kore haritası",
    "fit": "Tüm Güney Kore haritasını göster",
    "grid": {
     "lat": [
      33,
      39,
      2
     ],
     "lon": [
      125,
      130,
      2
     ],
     "txt": [
      34,
      38,
      2
     ],
     "refLon": 128,
     "refLat": 36
    },
    "excludeWorld": [
     "South Korea",
     "Korea"
    ],
    "bg": []
   },
   "srsPrefix": "kr",
   "simKmScale": 520,
   "maxFitZoom": 7,
   "labelSize": 9,
   "unitLabel": "il",
   "unitLabelCap": "İl",
   "codeLabel": "Telefon kodu",
   "codePrefix": 2,
   "codeModeLabel": "Kodun ilk iki hanesi",
   "localLabel": "Hangul",
   "line": "17 il ve büyükşehir · Hangul adlar ve telefon alan kodu",
   "blurb": "Üç şey işe yarar: tabelada okuduğun Hangul şehir adından ili bulmak ve numaradaki alan kodundan bölgeyi bulmak. Üçüncüsü bölgeyi gösteren manzara: Jeju, Gangwon yaylası, Namhae, Boseong.",
   "overviewLead": "17 ili haritada öğren; kartta Hangul adı, şehirleri ve telefon kodu yazar.",
   "note": {
    "title": "Gwangju ve Güney Jeolla birleşti",
    "text": "1 Temmuz 2026'dan beri Gwangju büyükşehri ile Güney Jeolla (Jeonnam) tek idari birim: Jeonnam–Gwangju Özel Büyükşehri (전남광주통합특별시). Eski Street View görüntüleri ve tabelalar ayrı adları taşıdığı için haritada ikisi ayrı gösterilir."
   },
   "regions": [
    {
     "id": "sudogwon",
     "tr": "Sudogwon (Seul çevresi)",
     "key": "SDG",
     "color": 0,
     "cue": "Seul, İncheon ve Gyeonggi. Telefon kodları 02, 031, 032."
    },
    {
     "id": "gangwon",
     "tr": "Gangwon",
     "key": "GNG",
     "color": 1,
     "cue": "Doğuda dağlık ve kıyı bölgesi. Telefon kodu 033."
    },
    {
     "id": "hoseo",
     "tr": "Hoseo (Chungcheong)",
     "key": "HSO",
     "color": 2,
     "cue": "Orta batı: Chungcheong illeri, Daejeon, Sejong. Telefon kodları 04x."
    },
    {
     "id": "honam",
     "tr": "Honam (Jeolla)",
     "key": "HNM",
     "color": 3,
     "cue": "Güneybatı: Jeolla illeri ve Gwangju. Telefon kodları 06x."
    },
    {
     "id": "yeongnam",
     "tr": "Yeongnam (Gyeongsang)",
     "key": "YNM",
     "color": 4,
     "cue": "Güneydoğu: Gyeongsang illeri, Busan, Daegu, Ulsan. Telefon kodları 05x."
    },
    {
     "id": "jeju",
     "tr": "Jeju",
     "key": "JEJ",
     "color": 5,
     "cue": "Güneydeki ada. Telefon kodu 064."
    }
   ],
   "units": [
    {
     "id": "11",
     "name": "Seul",
     "short": "Seul",
     "local": "서울",
     "cap": "Seul",
     "reg": "sudogwon",
     "codes": [
      "02"
     ],
     "cue": "Tam adı: 서울특별시. Telefon kodu: 02."
    },
    {
     "id": "28",
     "name": "İncheon",
     "short": "İncheon",
     "local": "인천",
     "cap": "İncheon",
     "reg": "sudogwon",
     "codes": [
      "032"
     ],
     "cue": "Tam adı: 인천광역시. Telefon kodu: 032."
    },
    {
     "id": "41",
     "name": "Gyeonggi",
     "short": "Gyeonggi",
     "local": "경기",
     "cap": "Suwon",
     "reg": "sudogwon",
     "codes": [
      "031"
     ],
     "cue": "Tam adı: 경기도. Şehirler: Suwon (수원), Seongnam (성남), Goyang (고양), Yongin (용인), Bucheon (부천), Ansan (안산). Telefon kodu: 031."
    },
    {
     "id": "42",
     "name": "Gangwon",
     "short": "Gangwon",
     "local": "강원",
     "cap": "Chuncheon",
     "reg": "gangwon",
     "codes": [
      "033"
     ],
     "cue": "Tam adı: 강원특별자치도. Şehirler: Chuncheon (춘천), Wonju (원주), Gangneung (강릉), Sokcho (속초), Donghae (동해), Pyeongchang (평창). Telefon kodu: 033. Manzara: Daegwallyeong'de ağaçsız yüksek otlak ve rüzgâr türbinleri."
    },
    {
     "id": "30",
     "name": "Daejeon",
     "short": "Daejeon",
     "local": "대전",
     "cap": "Daejeon",
     "reg": "hoseo",
     "codes": [
      "042"
     ],
     "cue": "Tam adı: 대전광역시. Telefon kodu: 042."
    },
    {
     "id": "50",
     "name": "Sejong",
     "short": "Sejong",
     "local": "세종",
     "cap": "Sejong",
     "reg": "hoseo",
     "codes": [
      "044"
     ],
     "cue": "Tam adı: 세종특별자치시. Telefon kodu: 044."
    },
    {
     "id": "43",
     "name": "Kuzey Chungcheong",
     "short": "Chungbuk",
     "local": "충북",
     "cap": "Cheongju",
     "reg": "hoseo",
     "codes": [
      "043"
     ],
     "cue": "Tam adı: 충청북도. Şehirler: Cheongju (청주), Chungju (충주), Jecheon (제천). Telefon kodu: 043."
    },
    {
     "id": "44",
     "name": "Güney Chungcheong",
     "short": "Chungnam",
     "local": "충남",
     "cap": "Hongseong",
     "reg": "hoseo",
     "codes": [
      "041"
     ],
     "cue": "Tam adı: 충청남도. Şehirler: Cheonan (천안), Asan (아산), Gongju (공주), Seosan (서산), Dangjin (당진). Telefon kodu: 041."
    },
    {
     "id": "29",
     "name": "Gwangju",
     "short": "Gwangju",
     "local": "광주",
     "cap": "Gwangju",
     "reg": "honam",
     "codes": [
      "062"
     ],
     "cue": "Tam adı: 광주광역시. Telefon kodu: 062. 1 Temmuz 2026'dan beri Gwangju ve Güney Jeolla tek idari birim: Jeonnam–Gwangju Özel Büyükşehri (전남광주통합특별시). Haritada ayrı gösterilir; tabelalarda eski adlar sürer."
    },
    {
     "id": "45",
     "name": "Kuzey Jeolla (Jeonbuk)",
     "short": "Jeonbuk",
     "local": "전북",
     "cap": "Jeonju",
     "reg": "honam",
     "codes": [
      "063"
     ],
     "cue": "Tam adı: 전북특별자치도. Şehirler: Jeonju (전주), Iksan (익산), Gunsan (군산), Namwon (남원). Telefon kodu: 063."
    },
    {
     "id": "46",
     "name": "Güney Jeolla (Jeonnam)",
     "short": "Jeonnam",
     "local": "전남",
     "cap": "Muan",
     "reg": "honam",
     "codes": [
      "061"
     ],
     "cue": "Tam adı: 전라남도. Şehirler: Mokpo (목포), Yeosu (여수), Suncheon (순천), Naju (나주), Gwangyang (광양), Muan (무안). Telefon kodu: 061. 1 Temmuz 2026'dan beri Gwangju ve Güney Jeolla tek idari birim: Jeonnam–Gwangju Özel Büyükşehri (전남광주통합특별시). Haritada ayrı gösterilir; tabelalarda eski adlar sürer. Manzara: Boseong'da yamaç boyunca çay sıraları."
    },
    {
     "id": "26",
     "name": "Busan",
     "short": "Busan",
     "local": "부산",
     "cap": "Busan",
     "reg": "yeongnam",
     "codes": [
      "051"
     ],
     "cue": "Tam adı: 부산광역시. Telefon kodu: 051."
    },
    {
     "id": "27",
     "name": "Daegu",
     "short": "Daegu",
     "local": "대구",
     "cap": "Daegu",
     "reg": "yeongnam",
     "codes": [
      "053"
     ],
     "cue": "Tam adı: 대구광역시. Telefon kodu: 053."
    },
    {
     "id": "31",
     "name": "Ulsan",
     "short": "Ulsan",
     "local": "울산",
     "cap": "Ulsan",
     "reg": "yeongnam",
     "codes": [
      "052"
     ],
     "cue": "Tam adı: 울산광역시. Telefon kodu: 052."
    },
    {
     "id": "47",
     "name": "Kuzey Gyeongsang",
     "short": "Gyeongbuk",
     "local": "경북",
     "cap": "Andong",
     "reg": "yeongnam",
     "codes": [
      "054"
     ],
     "cue": "Tam adı: 경상북도. Şehirler: Pohang (포항), Gumi (구미), Gyeongju (경주), Andong (안동), Gyeongsan (경산). Telefon kodu: 054."
    },
    {
     "id": "48",
     "name": "Güney Gyeongsang",
     "short": "Gyeongnam",
     "local": "경남",
     "cap": "Changwon",
     "reg": "yeongnam",
     "codes": [
      "055"
     ],
     "cue": "Tam adı: 경상남도. Şehirler: Changwon (창원), Gimhae (김해), Jinju (진주), Yangsan (양산), Geoje (거제), Tongyeong (통영). Telefon kodu: 055. Manzara: Namhae'de denize inen basamaklı çeltik."
    },
    {
     "id": "49",
     "name": "Jeju",
     "short": "Jeju",
     "local": "제주",
     "cap": "Jeju",
     "reg": "jeju",
     "codes": [
      "064"
     ],
     "cue": "Tam adı: 제주특별자치도. Şehirler: Seogwipo (서귀포). Telefon kodu: 064. Manzara: siyah bazalt tarla duvarı, mandalina bahçesi, otlu oreum konileri."
    }
   ],
   "topics": [
    {
     "key": "hangul",
     "navLabel": "Hangul",
     "icon": "langs",
     "drillPreset": "hangul",
     "mapMode": "reg",
     "labelMode": "local",
     "title": "Tabeladaki Hangul: il ve şehir adı",
     "lead": "Güney Kore'de yol tabelalarında şehir adları Hangul ve Latin harfiyle birlikte yazılır, ama dükkân tabelaları, afişler ve duvar yazıları çoğunlukla yalnız Hangul'dur. 17 ilin kısa adı 2 hecedir (경기, 충북, 전남…). Tabelada gördüğün şehir adının hangi ilde olduğunu bilmek en hızlı yol: aşağıda 17 il ve başlıca şehirler var.",
     "desc": "경기, 충북, 전남, 수원… Hangul adından ili bul.",
     "decoder": {
      "title": "Hangul ya da Latin ad",
      "placeholder": "Örn. 수원, 충북, Jeonju…",
      "hint": "Tabeladaki Hangul'u yapıştır ya da Latin adı yaz; il haritada boyanır.",
      "quizPrompt": "Bu yazı hangi ilde?",
      "noHit": "Bu ad listede yok. 17 il ve başlıca şehirler burada; küçük kasabalar yok.",
      "entries": [
       {
        "key": "서울",
        "label": "서울특별시 · Seul",
        "sub": "Tam adı: 서울특별시. Merkez: Seul.",
        "keys": [
         "서울특별시",
         "Seul",
         "seul",
         "seul"
        ],
        "ids": [
         "11"
        ],
        "main": "서울",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "인천",
        "label": "인천광역시 · İncheon",
        "sub": "Tam adı: 인천광역시. Merkez: İncheon.",
        "keys": [
         "인천광역시",
         "İncheon",
         "i̇ncheon",
         "i̇ncheon"
        ],
        "ids": [
         "28"
        ],
        "main": "인천",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "경기",
        "label": "경기도 · Gyeonggi",
        "sub": "Tam adı: 경기도. Merkez: Suwon.",
        "keys": [
         "경기도",
         "Gyeonggi",
         "gyeonggi",
         "gyeonggi"
        ],
        "ids": [
         "41"
        ],
        "main": "경기",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "강원",
        "label": "강원특별자치도 · Gangwon",
        "sub": "Tam adı: 강원특별자치도. Merkez: Chuncheon.",
        "keys": [
         "강원특별자치도",
         "Gangwon",
         "gangwon",
         "gangwon"
        ],
        "ids": [
         "42"
        ],
        "main": "강원",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "대전",
        "label": "대전광역시 · Daejeon",
        "sub": "Tam adı: 대전광역시. Merkez: Daejeon.",
        "keys": [
         "대전광역시",
         "Daejeon",
         "daejeon",
         "daejeon"
        ],
        "ids": [
         "30"
        ],
        "main": "대전",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "세종",
        "label": "세종특별자치시 · Sejong",
        "sub": "Tam adı: 세종특별자치시. Merkez: Sejong.",
        "keys": [
         "세종특별자치시",
         "Sejong",
         "sejong",
         "sejong"
        ],
        "ids": [
         "50"
        ],
        "main": "세종",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "충북",
        "label": "충청북도 · Kuzey Chungcheong",
        "sub": "Tam adı: 충청북도. Merkez: Cheongju.",
        "keys": [
         "충청북도",
         "Chungbuk",
         "chungbuk",
         "kuzey chungcheong"
        ],
        "ids": [
         "43"
        ],
        "main": "충북",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "충남",
        "label": "충청남도 · Güney Chungcheong",
        "sub": "Tam adı: 충청남도. Merkez: Hongseong.",
        "keys": [
         "충청남도",
         "Chungnam",
         "chungnam",
         "güney chungcheong"
        ],
        "ids": [
         "44"
        ],
        "main": "충남",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "광주",
        "label": "광주광역시 · Gwangju",
        "sub": "Tam adı: 광주광역시. Merkez: Gwangju.",
        "keys": [
         "광주광역시",
         "Gwangju",
         "gwangju",
         "gwangju"
        ],
        "ids": [
         "29"
        ],
        "main": "광주",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "전북",
        "label": "전북특별자치도 · Kuzey Jeolla (Jeonbuk)",
        "sub": "Tam adı: 전북특별자치도. Merkez: Jeonju.",
        "keys": [
         "전북특별자치도",
         "Jeonbuk",
         "jeonbuk",
         "kuzey jeolla (jeonbuk)"
        ],
        "ids": [
         "45"
        ],
        "main": "전북",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "전남",
        "label": "전라남도 · Güney Jeolla (Jeonnam)",
        "sub": "Tam adı: 전라남도. Merkez: Muan.",
        "keys": [
         "전라남도",
         "Jeonnam",
         "jeonnam",
         "güney jeolla (jeonnam)"
        ],
        "ids": [
         "46"
        ],
        "main": "전남",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "부산",
        "label": "부산광역시 · Busan",
        "sub": "Tam adı: 부산광역시. Merkez: Busan.",
        "keys": [
         "부산광역시",
         "Busan",
         "busan",
         "busan"
        ],
        "ids": [
         "26"
        ],
        "main": "부산",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "대구",
        "label": "대구광역시 · Daegu",
        "sub": "Tam adı: 대구광역시. Merkez: Daegu.",
        "keys": [
         "대구광역시",
         "Daegu",
         "daegu",
         "daegu"
        ],
        "ids": [
         "27"
        ],
        "main": "대구",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "울산",
        "label": "울산광역시 · Ulsan",
        "sub": "Tam adı: 울산광역시. Merkez: Ulsan.",
        "keys": [
         "울산광역시",
         "Ulsan",
         "ulsan",
         "ulsan"
        ],
        "ids": [
         "31"
        ],
        "main": "울산",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "경북",
        "label": "경상북도 · Kuzey Gyeongsang",
        "sub": "Tam adı: 경상북도. Merkez: Andong.",
        "keys": [
         "경상북도",
         "Gyeongbuk",
         "gyeongbuk",
         "kuzey gyeongsang"
        ],
        "ids": [
         "47"
        ],
        "main": "경북",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "경남",
        "label": "경상남도 · Güney Gyeongsang",
        "sub": "Tam adı: 경상남도. Merkez: Changwon.",
        "keys": [
         "경상남도",
         "Gyeongnam",
         "gyeongnam",
         "güney gyeongsang"
        ],
        "ids": [
         "48"
        ],
        "main": "경남",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "제주",
        "label": "제주특별자치도 · Jeju",
        "sub": "Tam adı: 제주특별자치도. Merkez: Jeju.",
        "keys": [
         "제주특별자치도",
         "Jeju",
         "jeju",
         "jeju"
        ],
        "ids": [
         "49"
        ],
        "main": "제주",
        "prompt": "Bu yazı hangi ilin (büyükşehrin) adı?"
       },
       {
        "key": "수원",
        "label": "수원 · Suwon",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Suwon",
         "suwon"
        ],
        "ids": [
         "41"
        ],
        "main": "수원",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "성남",
        "label": "성남 · Seongnam",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Seongnam",
         "seongnam"
        ],
        "ids": [
         "41"
        ],
        "main": "성남",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "고양",
        "label": "고양 · Goyang",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Goyang",
         "goyang"
        ],
        "ids": [
         "41"
        ],
        "main": "고양",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "용인",
        "label": "용인 · Yongin",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Yongin",
         "yongin"
        ],
        "ids": [
         "41"
        ],
        "main": "용인",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "부천",
        "label": "부천 · Bucheon",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Bucheon",
         "bucheon"
        ],
        "ids": [
         "41"
        ],
        "main": "부천",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "안산",
        "label": "안산 · Ansan",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Ansan",
         "ansan"
        ],
        "ids": [
         "41"
        ],
        "main": "안산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "안양",
        "label": "안양 · Anyang",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Anyang",
         "anyang"
        ],
        "ids": [
         "41"
        ],
        "main": "안양",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "화성",
        "label": "화성 · Hwaseong",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Hwaseong",
         "hwaseong"
        ],
        "ids": [
         "41"
        ],
        "main": "화성",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "평택",
        "label": "평택 · Pyeongtaek",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Pyeongtaek",
         "pyeongtaek"
        ],
        "ids": [
         "41"
        ],
        "main": "평택",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "의정부",
        "label": "의정부 · Uijeongbu",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Uijeongbu",
         "uijeongbu"
        ],
        "ids": [
         "41"
        ],
        "main": "의정부",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "파주",
        "label": "파주 · Paju",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Paju",
         "paju"
        ],
        "ids": [
         "41"
        ],
        "main": "파주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "김포",
        "label": "김포 · Gimpo",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Gimpo",
         "gimpo"
        ],
        "ids": [
         "41"
        ],
        "main": "김포",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "남양주",
        "label": "남양주 · Namyangju",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Namyangju",
         "namyangju"
        ],
        "ids": [
         "41"
        ],
        "main": "남양주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "광주시",
        "label": "광주시 · Gwangju (Gyeonggi)",
        "sub": "İl: Gyeonggi (경기도).",
        "keys": [
         "Gwangju (Gyeonggi)",
         "gwangju (gyeonggi)"
        ],
        "ids": [
         "41"
        ],
        "main": "광주시",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "춘천",
        "label": "춘천 · Chuncheon",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Chuncheon",
         "chuncheon"
        ],
        "ids": [
         "42"
        ],
        "main": "춘천",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "원주",
        "label": "원주 · Wonju",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Wonju",
         "wonju"
        ],
        "ids": [
         "42"
        ],
        "main": "원주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "강릉",
        "label": "강릉 · Gangneung",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Gangneung",
         "gangneung"
        ],
        "ids": [
         "42"
        ],
        "main": "강릉",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "속초",
        "label": "속초 · Sokcho",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Sokcho",
         "sokcho"
        ],
        "ids": [
         "42"
        ],
        "main": "속초",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "동해",
        "label": "동해 · Donghae",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Donghae",
         "donghae"
        ],
        "ids": [
         "42"
        ],
        "main": "동해",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "평창",
        "label": "평창 · Pyeongchang",
        "sub": "İl: Gangwon (강원특별자치도).",
        "keys": [
         "Pyeongchang",
         "pyeongchang"
        ],
        "ids": [
         "42"
        ],
        "main": "평창",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "청주",
        "label": "청주 · Cheongju",
        "sub": "İl: Kuzey Chungcheong (충청북도).",
        "keys": [
         "Cheongju",
         "cheongju"
        ],
        "ids": [
         "43"
        ],
        "main": "청주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "충주",
        "label": "충주 · Chungju",
        "sub": "İl: Kuzey Chungcheong (충청북도).",
        "keys": [
         "Chungju",
         "chungju"
        ],
        "ids": [
         "43"
        ],
        "main": "충주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "제천",
        "label": "제천 · Jecheon",
        "sub": "İl: Kuzey Chungcheong (충청북도).",
        "keys": [
         "Jecheon",
         "jecheon"
        ],
        "ids": [
         "43"
        ],
        "main": "제천",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "천안",
        "label": "천안 · Cheonan",
        "sub": "İl: Güney Chungcheong (충청남도).",
        "keys": [
         "Cheonan",
         "cheonan"
        ],
        "ids": [
         "44"
        ],
        "main": "천안",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "아산",
        "label": "아산 · Asan",
        "sub": "İl: Güney Chungcheong (충청남도).",
        "keys": [
         "Asan",
         "asan"
        ],
        "ids": [
         "44"
        ],
        "main": "아산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "공주",
        "label": "공주 · Gongju",
        "sub": "İl: Güney Chungcheong (충청남도).",
        "keys": [
         "Gongju",
         "gongju"
        ],
        "ids": [
         "44"
        ],
        "main": "공주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "서산",
        "label": "서산 · Seosan",
        "sub": "İl: Güney Chungcheong (충청남도).",
        "keys": [
         "Seosan",
         "seosan"
        ],
        "ids": [
         "44"
        ],
        "main": "서산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "당진",
        "label": "당진 · Dangjin",
        "sub": "İl: Güney Chungcheong (충청남도).",
        "keys": [
         "Dangjin",
         "dangjin"
        ],
        "ids": [
         "44"
        ],
        "main": "당진",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "전주",
        "label": "전주 · Jeonju",
        "sub": "İl: Kuzey Jeolla (Jeonbuk) (전북특별자치도).",
        "keys": [
         "Jeonju",
         "jeonju"
        ],
        "ids": [
         "45"
        ],
        "main": "전주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "익산",
        "label": "익산 · Iksan",
        "sub": "İl: Kuzey Jeolla (Jeonbuk) (전북특별자치도).",
        "keys": [
         "Iksan",
         "iksan"
        ],
        "ids": [
         "45"
        ],
        "main": "익산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "군산",
        "label": "군산 · Gunsan",
        "sub": "İl: Kuzey Jeolla (Jeonbuk) (전북특별자치도).",
        "keys": [
         "Gunsan",
         "gunsan"
        ],
        "ids": [
         "45"
        ],
        "main": "군산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "남원",
        "label": "남원 · Namwon",
        "sub": "İl: Kuzey Jeolla (Jeonbuk) (전북특별자치도).",
        "keys": [
         "Namwon",
         "namwon"
        ],
        "ids": [
         "45"
        ],
        "main": "남원",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "목포",
        "label": "목포 · Mokpo",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Mokpo",
         "mokpo"
        ],
        "ids": [
         "46"
        ],
        "main": "목포",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "여수",
        "label": "여수 · Yeosu",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Yeosu",
         "yeosu"
        ],
        "ids": [
         "46"
        ],
        "main": "여수",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "순천",
        "label": "순천 · Suncheon",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Suncheon",
         "suncheon"
        ],
        "ids": [
         "46"
        ],
        "main": "순천",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "나주",
        "label": "나주 · Naju",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Naju",
         "naju"
        ],
        "ids": [
         "46"
        ],
        "main": "나주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "광양",
        "label": "광양 · Gwangyang",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Gwangyang",
         "gwangyang"
        ],
        "ids": [
         "46"
        ],
        "main": "광양",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "무안",
        "label": "무안 · Muan",
        "sub": "İl: Güney Jeolla (Jeonnam) (전라남도).",
        "keys": [
         "Muan",
         "muan"
        ],
        "ids": [
         "46"
        ],
        "main": "무안",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "포항",
        "label": "포항 · Pohang",
        "sub": "İl: Kuzey Gyeongsang (경상북도).",
        "keys": [
         "Pohang",
         "pohang"
        ],
        "ids": [
         "47"
        ],
        "main": "포항",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "구미",
        "label": "구미 · Gumi",
        "sub": "İl: Kuzey Gyeongsang (경상북도).",
        "keys": [
         "Gumi",
         "gumi"
        ],
        "ids": [
         "47"
        ],
        "main": "구미",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "경주",
        "label": "경주 · Gyeongju",
        "sub": "İl: Kuzey Gyeongsang (경상북도).",
        "keys": [
         "Gyeongju",
         "gyeongju"
        ],
        "ids": [
         "47"
        ],
        "main": "경주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "안동",
        "label": "안동 · Andong",
        "sub": "İl: Kuzey Gyeongsang (경상북도).",
        "keys": [
         "Andong",
         "andong"
        ],
        "ids": [
         "47"
        ],
        "main": "안동",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "경산",
        "label": "경산 · Gyeongsan",
        "sub": "İl: Kuzey Gyeongsang (경상북도).",
        "keys": [
         "Gyeongsan",
         "gyeongsan"
        ],
        "ids": [
         "47"
        ],
        "main": "경산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "창원",
        "label": "창원 · Changwon",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Changwon",
         "changwon"
        ],
        "ids": [
         "48"
        ],
        "main": "창원",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "김해",
        "label": "김해 · Gimhae",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Gimhae",
         "gimhae"
        ],
        "ids": [
         "48"
        ],
        "main": "김해",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "진주",
        "label": "진주 · Jinju",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Jinju",
         "jinju"
        ],
        "ids": [
         "48"
        ],
        "main": "진주",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "양산",
        "label": "양산 · Yangsan",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Yangsan",
         "yangsan"
        ],
        "ids": [
         "48"
        ],
        "main": "양산",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "거제",
        "label": "거제 · Geoje",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Geoje",
         "geoje"
        ],
        "ids": [
         "48"
        ],
        "main": "거제",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "통영",
        "label": "통영 · Tongyeong",
        "sub": "İl: Güney Gyeongsang (경상남도).",
        "keys": [
         "Tongyeong",
         "tongyeong"
        ],
        "ids": [
         "48"
        ],
        "main": "통영",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "서귀포",
        "label": "서귀포 · Seogwipo",
        "sub": "İl: Jeju (제주특별자치도).",
        "keys": [
         "Seogwipo",
         "seogwipo"
        ],
        "ids": [
         "49"
        ],
        "main": "서귀포",
        "prompt": "Bu şehir hangi ilde?"
       },
       {
        "key": "Busan martı levhası",
        "label": "Sokak levhasında martı (Seagull) işareti → Busan",
        "sub": "Martı işaretli numara levhası yalnız Busan büyükşehir sınırlarında bulunur (yalnız merkezde değil). Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "martı",
         "seagull",
         "busan martısı",
         "부산",
         "busan"
        ],
        "ids": [
         "26"
        ],
        "main": "Martı işaretli sokak levhası",
        "prompt": "Martı işaretli sokak/numara levhası hangi ilde?"
       },
       {
        "key": "Seul yazı tipi (Namsan)",
        "label": "Sokak adı yuvarlak, kaligrafik harflerle (Namsan) → Seul",
        "sub": "Seul sokak levhaları Namsan yazı tipini kullanır: harfler yuvarlak ve süslü. Ülkenin geri kalanında Hangil tipi var: düz, geometrik çizgiler. İstisna: Gangnam ve Guro. Zor ve açıdan etkilenir. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "namsan",
         "hangil",
         "yazı tipi",
         "font",
         "yuvarlak harf",
         "seoul",
         "seul",
         "sokak levhası"
        ],
        "ids": [
         "11"
        ],
        "main": "Namsan yazı tipi",
        "prompt": "Yuvarlak, kaligrafik Namsan harfli sokak levhası hangi şehirde?",
        "quiz": false
       },
       {
        "key": "Daegu: yön harfli yan sokak",
        "label": "Sokak adında 북·동·남·서 eki → Daegu",
        "sub": "Alt sokaklar numara yerine yön sözcüğüyle ayrılır (북, 동, 남, 서). Kapsanan alanda yalnız Daegu’da görülür. Ayrıca Daegu ve Seul, kırsal olmayan yerde yeşil ve asılı tek parça kavşak levhası kullanan nadir şehirlerdir; Daegu’da çoğu levha tel halatla tutulur. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "daegu",
         "대구",
         "북",
         "동",
         "남",
         "서",
         "yön eki",
         "yan sokak",
         "kavşak levhası"
        ],
        "ids": [
         "27"
        ],
        "main": "Yön harfli yan sokak (북·동·남·서)",
        "prompt": "Alt sokağı numara yerine 북, 동, 남, 서 ile ayıran şehir hangisi?"
       },
       {
        "key": "Seul: ga-na-da-gil yan sokak",
        "label": "Sokak adında 가·나·다·라 harfli ek (-ga/-na/-da-gil) → Seul",
        "sub": "Numaralı yan sokağın altındaki yol harfle ayrılır: ga, na, da, ra, ma, ba, sa, a, ja, cha, ka, ta. Neredeyse yalnız Seul’da görülür (küçük bir kısmı Yangju’da). Seul’daki «-an-gil» ise Mapo, Seocho ve Seodaemun’un küçük iki parçasına özgü. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "ga",
         "na",
         "da",
         "ra",
         "ma",
         "ba",
         "sa",
         "cha",
         "ka",
         "ta",
         "an-gil",
         "안길",
         "mapo",
         "seocho",
         "seodaemun",
         "seul",
         "seoul"
        ],
        "ids": [
         "11"
        ],
        "main": "Harfli alt sokak: ga, na, da…",
        "prompt": "Sokak adında ga, na, da, ra… harfli alt-yol eki hangi şehre işaret eder?"
       },
       {
        "key": "Mokpo: 미항 목포",
        "label": "Levha arkasında Mokpo maskotu ve 미항 목포 → Mokpo",
        "sub": "Mokpo’da kavşak levhasının arkasında şehir maskotu ve «Mihang Mokpo» (Güzel Liman Mokpo) yazısı olabilir. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "mokpo",
         "목포",
         "미항",
         "mihang",
         "maskot",
         "jeonnam"
        ],
        "ids": [
         "46"
        ],
        "main": "Levha arkası: 미항 목포",
        "prompt": "Levha arkasında 미항 목포 ve maskot hangi şehirde?",
        "quiz": false
       },
       {
        "key": "Suwon: levha arkasında kale",
        "label": "Kavşak levhasının arkası Hwaseong kalesi resimli → Suwon",
        "sub": "Suwon’da kavşak levhalarının arkasında kale (Hwaseong) ve başka simgelerin resmi bulunur. Askılı sokak levhası da Suwon, Seongnam ve Gimje’de görülür. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "suwon",
         "수원",
         "hwaseong",
         "kale",
         "levha arkası",
         "askılı sokak levhası"
        ],
        "ids": [
         "41"
        ],
        "main": "Levha arkası: kale resmi",
        "prompt": "Kavşak levhasının arkası kale resimli şehir hangisi?",
        "quiz": false
       },
       {
        "key": "Jeonju: 3. nesil levha direği",
        "label": "Levha, lamba ve trafik ışığıyla tek direkte → Jeonju",
        "sub": "Jeonju büyük şehirler arasında yalnız 3. nesil (2013 sonrası) levha kullanan şehirdir; kavşak levhası çoğunlukla lamba ve trafik ışığıyla aynı direğe birleşik, destek kirişsizdir. Yeni mahallelerde başka yerlerde de çıkar. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "jeonju",
         "전주",
         "3. nesil",
         "gen-3",
         "birleşik direk",
         "lamba direği"
        ],
        "ids": [
         "45"
        ],
        "main": "Levha+lamba+ışık tek direkte",
        "prompt": "Kavşak levhası, lamba ve trafik ışığı tek direkte olan şehir hangisi?",
        "quiz": false
       },
       {
        "key": "Daejeon: eğri destek kirişi",
        "label": "Kavşak levhasını tutan kiriş eğri kavisli → Daejeon",
        "sub": "Eğri (kavisli) üçgen destek kirişi yalnız Daejeon’da görülür; şehrin kuzey-orta kısmında yoğun. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "daejeon",
         "대전",
         "eğri kiriş",
         "kavisli",
         "destek kirişi"
        ],
        "ids": [
         "30"
        ],
        "main": "Eğri destek kirişi",
        "prompt": "Kavisli destek kirişli kavşak levhası hangi şehirde?",
        "quiz": false
       },
       {
        "key": "Yeongdeok/Uljin: ıstakoz",
        "label": "Durak ve lamba direklerinde ıstakoz (kıskaç) motifi → Yeongdeok/Uljin",
        "sub": "Kuzey Gyeongsang kıyısında Yeongdeok ve kuzeyindeki Uljin’de otobüs durağı tasarımında ıstakoz kıskaçları, lamba direklerinde küçük süsler bulunur. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "yeongdeok",
         "uljin",
         "ıstakoz",
         "kıskaç",
         "durak",
         "gyeongbuk"
        ],
        "ids": [
         "47"
        ],
        "main": "Istakoz motifli durak",
        "prompt": "Otobüs durağında ıstakoz kıskacı motifi hangi ilde görülür?",
        "quiz": false
       },
       {
        "key": "Jeju: üç yazılı yer adı",
        "label": "Yer adı Hangul + Çince (Hanja) + Latin → Jeju (ve Seul’un turistik yerleri)",
        "sub": "Jeju levhalarında yer adı Korece, Çince ve Latin harfle birlikte yazılır. Hanja Seul’un turistik semtlerinde de çıkar. Jeju’da çoğu yön levhası yeşildir. Kaynak: topluluk belgesi «Korean Street Sign Meta» (schaderdth, 6600+ etiketli konum; mutlak değil).",
        "keys": [
         "jeju",
         "제주",
         "hanja",
         "çince",
         "üç dil",
         "yeşil yön levhası"
        ],
        "ids": [
         "49"
        ],
        "main": "Hangul+Hanja+Latin üç yazılı levha",
        "prompt": "Yer adı Korece, Çince ve Latin harfle yazılı levha hangi ilde?",
        "quiz": false
       }
      ]
     },
     "flows": [
      {
       "title": "Şehir merkezinde sokak levhasına bak",
       "body": "Mavi ya da yeşil sokak levhasında harflerin biçimi, yan sokak ekleri (ga-na-da ya da 북-동-남-서), levhanın arkası ve montaj tarzı şehri söyleyebilir. Seul: yuvarlak Namsan harfleri, çoğunlukla yeşil, asılı tek parça. Busan: martı levhası. Daegu: yön harfli yan sokak. Jeonju: levha+lamba+ışık tek direkte. Bunlar topluluk verisidir; mutlak değil, diğer ipuçlarıyla birlikte kullan."
      },
      {
       "title": "Sondaki heceye bak",
       "body": "도 (do) = eyalet. 특별시 / 광역시 = Seul ve büyükşehirler. 시 (si) = şehir. 군 = kırsal ilçe. 구 = şehir içi bölge. 읍, 면, 동 = kasaba, köy, mahalle. Sonek çoğu zaman yazılmaz: 수원시 yerine 수원 görürsün."
      },
      {
       "title": "북 kuzey, 남 güney",
       "body": "북 (buk) = kuzey, 남 (nam) = güney. 충북 Kuzey Chungcheong, 충남 Güney Chungcheong. 경북 Kuzey Gyeongsang, 경남 Güney Gyeongsang. 전북 Kuzey Jeolla, 전남 Güney Jeolla. Her çiftte 'kuzey' olan haritada kuzeydedir."
      },
      {
       "title": "Şehirden ile çık",
       "body": "Tabelada il adı değil şehir adı görürsün. Şehirleri ilin içine yerleştir: 수원, 성남 → Gyeonggi; 포항, 경주 → Kuzey Gyeongsang; 창원, 진주 → Güney Gyeongsang; 전주 → Kuzey Jeolla; 여수, 목포 → Güney Jeolla. Büyükşehirler (부산, 대구, 대전, 광주, 울산, 인천) kendi ilinden ayrıdır."
      }
     ],
     "bandsTitle": "Bölgeye göre il adları",
     "bandsHint": "dokun → bölge haritada boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "수도권",
       "title": "Sudogwon (Seul çevresi)",
       "sub": "서울 인천 경기",
       "ids": [
        "11",
        "28",
        "41"
       ]
      },
      {
       "cls": "q1",
       "key": "강원",
       "title": "Gangwon",
       "sub": "강원",
       "ids": [
        "42"
       ]
      },
      {
       "cls": "q2",
       "key": "충청",
       "title": "Hoseo (Chungcheong)",
       "sub": "대전 세종 충북 충남",
       "ids": [
        "30",
        "50",
        "43",
        "44"
       ]
      },
      {
       "cls": "q3",
       "key": "호남",
       "title": "Honam (Jeolla)",
       "sub": "광주 전북 전남",
       "ids": [
        "29",
        "45",
        "46"
       ]
      },
      {
       "cls": "q4",
       "key": "영남",
       "title": "Yeongnam (Gyeongsang)",
       "sub": "부산 대구 울산 경북 경남",
       "ids": [
        "26",
        "27",
        "31",
        "47",
        "48"
       ]
      },
      {
       "cls": "q5",
       "key": "제주",
       "title": "Jeju",
       "sub": "제주",
       "ids": [
        "49"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "Daegu ve Daejeon",
       "ids": [
        "27",
        "30"
       ],
       "body": "İkisi de 대 ile başlar. 대구 (Daegu) güneydoğudadır: Yeongnam, telefon kodu 053. 대전 (Daejeon) ülkenin ortasındadır: Hoseo, telefon kodu 042.",
       "traps": [
        [
         "대구",
         "Daegu (güneydoğu)"
        ],
        [
         "대전",
         "Daejeon (orta)"
        ]
       ]
      },
      {
       "title": "İki Gwangju",
       "ids": [
        "29",
        "41"
       ],
       "body": "광주 (Gwangju) güneybatıdaki büyükşehirdir; Jeolla bölgesinin merkezidir. 광주시 ise Gyeonggi'de, Seul'ün güneydoğusunda küçük bir şehirdir. Tabelada 광주 görürsen çevredeki şehirlere ve yol numarasına bak.",
       "traps": [
        [
         "광주",
         "Gwangju büyükşehri (Jeolla)"
        ],
        [
         "광주시",
         "Gwangju şehri (Gyeonggi)"
        ]
       ]
      },
      {
       "title": "Aynı hece, farklı il",
       "ids": [
        "41",
        "47",
        "48",
        "43",
        "44",
        "45",
        "46"
       ],
       "body": "경기 (Gyeonggi) Seul'ü çevreler; 경북 ve 경남 (Gyeongsang) güneydoğudadır. 충북 ve 충남 ortada, 전북 ve 전남 güneybatıdadır. Şehir adları da aynı heceyle başlar ama bağımsız düşün: 충주 (Chungju) Kuzey Chungcheong'dadır, 전주 (Jeonju) Kuzey Jeolla'dadır, 경주 (Gyeongju) Kuzey Gyeongsang'dadır.",
       "traps": [
        [
         "경기",
         "Seul çevresi"
        ],
        [
         "경북 / 경남",
         "Gyeongsang (güneydoğu)"
        ],
        [
         "충북 / 충남",
         "Chungcheong (orta)"
        ],
        [
         "전북 / 전남",
         "Jeolla (güneybatı)"
        ],
        [
         "충주",
         "Kuzey Chungcheong"
        ],
        [
         "전주",
         "Kuzey Jeolla"
        ],
        [
         "경주",
         "Kuzey Gyeongsang"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "kr-dir",
       "title": "Yön levhası: ad nerede?",
       "badge": "Çizim",
       "set": "kr-dir1",
       "ids": [
        "11",
        "28",
        "41",
        "42",
        "30",
        "50",
        "43",
        "44",
        "29",
        "45",
        "46",
        "26",
        "27",
        "31",
        "47",
        "48",
        "49"
       ],
       "sub": "Büyük Hangul satırı ad, altındaki küçük Latin satırı cevap anahtarı. Yeşil: otoyol ve şehir dışı, mavi: şehir içi sıradan yollar.",
       "tags": [
        "Hangul",
        "Latin satır",
        "yeşil / mavi"
       ],
       "quiz": false
      },
      {
       "id": "kr-office",
       "title": "Kurum tabelası: ad + tür",
       "badge": "Çizim",
       "set": "kr-office1",
       "ids": [
        "11",
        "28",
        "41",
        "42",
        "30",
        "50",
        "43",
        "44",
        "29",
        "45",
        "46",
        "26",
        "27",
        "31",
        "47",
        "48",
        "49"
       ],
       "sub": "Okul, postane, karakol, ilçe ve bucak dairesi tabelalarında yer adı önde, kurum türü sonda: türü ayır, adı oku.",
       "tags": [
        "군청",
        "면사무소",
        "초등학교",
        "농협"
       ],
       "quiz": false
      },
      {
       "id": "kr-suffix",
       "title": "Ad ekleri: şehir, ilçe, bucak, köy",
       "badge": "Çizim",
       "set": "kr-suffix1",
       "ids": [
        "11",
        "28",
        "41",
        "42",
        "30",
        "50",
        "43",
        "44",
        "29",
        "45",
        "46",
        "26",
        "27",
        "31",
        "47",
        "48",
        "49"
       ],
       "sub": "특별시 · 광역시 · 도 il düzeyini, 시 · 군 · 구 · 읍 · 면 · 동 · 리 adı taşıyan yerin büyüklüğünü söyler.",
       "tags": [
        "시",
        "군",
        "구",
        "읍",
        "면"
       ],
       "quiz": false
      },
      {
       "id": "kr-short",
       "title": "북 / 남 çiftleri",
       "badge": "Çizim",
       "set": "kr-short1",
       "ids": [
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "41"
       ],
       "sub": "충 · 전 · 경 bölgeyi, 북 kuzeyi, 남 güneyi söyler. 경기 ile 경북 / 경남 karışmasın.",
       "tags": [
        "충북",
        "전남",
        "경북",
        "경기"
       ],
       "quiz": false
      },
      {
       "id": "kr-sinir",
       "title": "İl sınırı levhası",
       "badge": "Levha",
       "set": "kr-border",
       "ids": [
        "11",
        "41",
        "42"
       ],
       "sub": "Yol il ya da şehir sınırını geçerken yeşil levhada yeni yerin adı büyük Hangul ve altında Latin yazılışıyla çıkar; alttaki küçük panel ilçeyi söyler. Örnek: Seul, Gyeonggi, Gangwon.",
       "tags": [
        "sınır",
        "il adı",
        "Latin satır"
       ],
       "quiz": false
      }
     ],
     "visualsTitle": "Tabelada nerede yazar? "
    },
    {
     "key": "alan",
     "navLabel": "Telefon kodu",
     "icon": "phone",
     "drillPreset": "code",
     "mapMode": "code",
     "labelMode": "code",
     "title": "Tabeladaki telefon numarası (alan kodu)",
     "lead": "Güney Kore'de dükkân tabelalarında, vitrin yazılarında ve sokak afişlerinde telefon numarası alan koduyla yazılır: 051-123-4567. Alan kodu 0 ile başlar: Seul'de 02, başka yerlerde 3 hane (0XX). 010 ile başlayan numaralar cep telefonudur ve yer söylemez. İlk iki hane bölgeyi verir; tam kod ili verir.",
     "desc": "02 Seul, 051 Busan, 064 Jeju… Telefon kodundan ili bul.",
     "decoder": {
      "title": "Alan kodu",
      "placeholder": "Örn. 02, 051, 064 ya da il adı…",
      "hint": "Numaranın başındaki 0'lı kodu yaz (cep telefonu 010 hariç); bölge haritada boyanır.",
      "quizPrompt": "Bu telefon kodu hangi bölgenin?",
      "noHit": "Bu kod listede yok. 17 alan kodunun hepsi burada; 010 cep telefonudur.",
      "entries": [
       {
        "key": "02",
        "label": "02 → Seul",
        "sub": "Seul; ayrıca Gyeonggi'deki Gwacheon, Gwangmyeong ve Goyang ile Hanam'ın bir kısmı.",
        "keys": [
         "(02)",
         "seul"
        ],
        "ids": [
         "11"
        ],
        "main": "02",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "031",
        "label": "031 → Gyeonggi",
        "sub": "Gyeonggi (İncheon, Bucheon, Gwacheon ve Gwangmyeong hariç).",
        "keys": [
         "(031)",
         "gyeonggi"
        ],
        "ids": [
         "41"
        ],
        "main": "031",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "032",
        "label": "032 → İncheon",
        "sub": "İncheon; Gyeonggi'deki Bucheon da 032 kullanır.",
        "keys": [
         "(032)",
         "i̇ncheon"
        ],
        "ids": [
         "28",
         "41"
        ],
        "main": "032",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "033",
        "label": "033 → Gangwon",
        "sub": "Gangwon'un tamamı.",
        "keys": [
         "(033)",
         "gangwon"
        ],
        "ids": [
         "42"
        ],
        "main": "033",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "041",
        "label": "041 → Güney Chungcheong",
        "sub": "Güney Chungcheong (Daejeon ve Sejong hariç).",
        "keys": [
         "(041)",
         "güney chungcheong"
        ],
        "ids": [
         "44"
        ],
        "main": "041",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "042",
        "label": "042 → Daejeon",
        "sub": "Daejeon (ve Gyeryong).",
        "keys": [
         "(042)",
         "daejeon"
        ],
        "ids": [
         "30"
        ],
        "main": "042",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "043",
        "label": "043 → Kuzey Chungcheong",
        "sub": "Kuzey Chungcheong'un tamamı.",
        "keys": [
         "(043)",
         "kuzey chungcheong"
        ],
        "ids": [
         "43"
        ],
        "main": "043",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "044",
        "label": "044 → Sejong",
        "sub": "Sejong.",
        "keys": [
         "(044)",
         "sejong"
        ],
        "ids": [
         "50"
        ],
        "main": "044",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "051",
        "label": "051 → Busan",
        "sub": "Busan.",
        "keys": [
         "(051)",
         "busan"
        ],
        "ids": [
         "26"
        ],
        "main": "051",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "052",
        "label": "052 → Ulsan",
        "sub": "Ulsan.",
        "keys": [
         "(052)",
         "ulsan"
        ],
        "ids": [
         "31"
        ],
        "main": "052",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "053",
        "label": "053 → Daegu",
        "sub": "Daegu; Kuzey Gyeongsang'daki Gyeongsan da 053 kullanır.",
        "keys": [
         "(053)",
         "daegu"
        ],
        "ids": [
         "27",
         "47"
        ],
        "main": "053",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "054",
        "label": "054 → Kuzey Gyeongsang",
        "sub": "Kuzey Gyeongsang (Gyeongsan hariç).",
        "keys": [
         "(054)",
         "kuzey gyeongsang"
        ],
        "ids": [
         "47"
        ],
        "main": "054",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "055",
        "label": "055 → Güney Gyeongsang",
        "sub": "Güney Gyeongsang (Busan ve Ulsan hariç).",
        "keys": [
         "(055)",
         "güney gyeongsang"
        ],
        "ids": [
         "48"
        ],
        "main": "055",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "061",
        "label": "061 → Güney Jeolla",
        "sub": "Güney Jeolla (Gwangju hariç).",
        "keys": [
         "(061)",
         "güney jeolla"
        ],
        "ids": [
         "46"
        ],
        "main": "061",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "062",
        "label": "062 → Gwangju",
        "sub": "Gwangju.",
        "keys": [
         "(062)",
         "gwangju"
        ],
        "ids": [
         "29"
        ],
        "main": "062",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "063",
        "label": "063 → Kuzey Jeolla",
        "sub": "Kuzey Jeolla'nın tamamı.",
        "keys": [
         "(063)",
         "kuzey jeolla"
        ],
        "ids": [
         "45"
        ],
        "main": "063",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       },
       {
        "key": "064",
        "label": "064 → Jeju",
        "sub": "Jeju Adası.",
        "keys": [
         "(064)",
         "jeju"
        ],
        "ids": [
         "49"
        ],
        "main": "064",
        "prompt": "Bu telefon kodu hangi bölgenin?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce 010'u ele",
       "body": "010 ile başlayan numara cep telefonudur ve yer söylemez; onu atla. Sabit hat numarası 02 ile ya da 03, 04, 05, 06 ile başlar."
      },
      {
       "title": "İlk iki hane bölgeyi verir",
       "body": "02 Seul. 03x kuzey (Gyeonggi, İncheon, Gangwon). 04x orta (Chungcheong, Daejeon, Sejong). 05x güneydoğu (Gyeongsang, Busan, Daegu, Ulsan). 06x güneybatı (Jeolla, Gwangju) ve Jeju."
      },
      {
       "title": "Üçüncü haneyi ile çevir",
       "body": "Büyükşehirler kendi ilinden ayrı kod alır: Busan 051, Ulsan 052, Daegu 053, Daejeon 042, Gwangju 062, İncheon 032, Sejong 044. İl kodları ise Gyeonggi 031, Gangwon 033, Güney Chungcheong 041, Kuzey Chungcheong 043, Kuzey Gyeongsang 054, Güney Gyeongsang 055, Güney Jeolla 061, Kuzey Jeolla 063, Jeju 064."
      }
     ],
     "bandsTitle": "İlk iki haneye göre",
     "bandsHint": "dokun → iller boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "02",
       "title": "Seul",
       "sub": "Tek iki haneli kod. Seul'ün yanındaki Gwacheon ve Gwangmyeong da 02 kullanır.",
       "ids": [
        "11"
       ]
      },
      {
       "cls": "q1",
       "key": "03x",
       "title": "Kuzey: Gyeonggi, İncheon, Gangwon",
       "sub": "031 Gyeonggi · 032 İncheon (ve Bucheon) · 033 Gangwon.",
       "ids": [
        "41",
        "28",
        "42"
       ]
      },
      {
       "cls": "q2",
       "key": "04x",
       "title": "Orta: Chungcheong, Daejeon, Sejong",
       "sub": "041 Güney Chungcheong · 042 Daejeon · 043 Kuzey Chungcheong · 044 Sejong.",
       "ids": [
        "44",
        "30",
        "43",
        "50"
       ]
      },
      {
       "cls": "q4",
       "key": "05x",
       "title": "Güneydoğu: Gyeongsang ve büyükşehirleri",
       "sub": "051 Busan · 052 Ulsan · 053 Daegu · 054 Kuzey Gyeongsang · 055 Güney Gyeongsang.",
       "ids": [
        "26",
        "31",
        "27",
        "47",
        "48"
       ]
      },
      {
       "cls": "q3",
       "key": "06x",
       "title": "Güneybatı: Jeolla ve Jeju",
       "sub": "061 Güney Jeolla · 062 Gwangju · 063 Kuzey Jeolla · 064 Jeju.",
       "ids": [
        "46",
        "29",
        "45",
        "49"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "Büyükşehir ile ilin kodu farklıdır",
       "ids": [
        "26",
        "31",
        "27",
        "30",
        "29",
        "28"
       ],
       "body": "Busan 051, ama çevresindeki Güney Gyeongsang 055. Daegu 053, ama Kuzey Gyeongsang 054. Daejeon 042, ama Güney Chungcheong 041. Gwangju 062, ama Güney Jeolla 061. İncheon 032, ama Gyeonggi 031. Büyükşehir kodunu görünce çevre ili yazma.",
       "traps": [
        [
         "051 / 055",
         "Busan / Güney Gyeongsang"
        ],
        [
         "053 / 054",
         "Daegu / Kuzey Gyeongsang"
        ],
        [
         "042 / 041",
         "Daejeon / Güney Chungcheong"
        ],
        [
         "062 / 061",
         "Gwangju / Güney Jeolla"
        ],
        [
         "032 / 031",
         "İncheon / Gyeonggi"
        ]
       ]
      },
      {
       "title": "Sınırdaki üç istisna",
       "ids": [
        "41",
        "28",
        "47",
        "27"
       ],
       "body": "Gyeonggi'deki Bucheon 032 kullanır (İncheon kodu). Gyeonggi'deki Gwacheon ve Gwangmyeong 02 kullanır (Seul kodu). Kuzey Gyeongsang'daki Gyeongsan 053 kullanır (Daegu kodu).",
       "traps": [
        [
         "Bucheon",
         "032 (Gyeonggi'de ama İncheon kodu)"
        ],
        [
         "Gwacheon, Gwangmyeong",
         "02 (Gyeonggi'de ama Seul kodu)"
        ],
        [
         "Gyeongsan",
         "053 (Gyeongbuk'ta ama Daegu kodu)"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "kr-phone",
       "title": "Telefon numarası: alan kodu",
       "badge": "Çizim ve fotoğraf",
       "set": "kr-phone1",
       "ids": [
        "11",
        "28",
        "41",
        "42",
        "30",
        "50",
        "43",
        "44",
        "29",
        "45",
        "46",
        "26",
        "27",
        "31",
        "47",
        "48",
        "49"
       ],
       "sub": "Tireden önceki parça ilin kodudur. 02 Seul, 051 Busan. 010 ile başlayan cep telefonudur: yer vermez. Gerçek tabelada yerel numara çoğu zaman kodsuz yazılır (ör. 734-6622, Seul); kodu görürsen ilini söyler.",
       "tags": [
        "02",
        "051",
        "010"
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
     "drillPreset": "visual",
     "mapMode": "reg",
     "labelMode": "short",
     "title": "Bölgeyi gösteren manzara",
     "lead": "Kore'de tabela Hangul ve alan kodu ilin adını çoğu zaman söyler; tabela yoksa manzara yardım eder. Jeju'da siyah bazalt duvar, mandalina ve oreum; Gangwon yaylasında ağaçsız otlak ve rüzgâr türbini; Namhae'de denize inen basamaklı çeltik; Boseong'da çay sıraları. Kore'nin çoğu yeri benzer görünür (çeltik, apartman, sera), bunlar yalnızca ayırt edici istisnalardır.",
     "desc": "Jeju, Gangwon yaylası, Namhae ve Boseong manzarasından ili bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. bazalt duvar, mandalina, oreum, çay tarlası…",
      "hint": "Gördüğün ipucunu yaz: hangi il olduğu haritada boyanır.",
      "quizPrompt": "Bu görünüm hangi ilde?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Bazalt taş duvar",
        "label": "Tarla kenarında siyah, delikli bazalt taş duvar → Jeju",
        "sub": "Jeju'da tarlaları ve bahçeleri çeviren alçak duvar (batdam), harçsız, kaba siyah volkan taşından örülür.",
        "keys": [
         "bazalt",
         "taş duvar",
         "batdam",
         "siyah taş",
         "jeju",
         "dol hareubang"
        ],
        "ids": [
         "49"
        ],
        "main": "Bazalt taş duvar",
        "prompt": "Tarla kenarında kaba siyah bazalt taş duvar hangi ilin işaretidir?"
       },
       {
        "key": "Mandalina bahçesi",
        "label": "Mandalina ağaçları ve seralar → Jeju",
        "sub": "Jeju adasının başlıca ürünü mandalinadır (gyul); yol kenarlarında ağaçlar ve plastik örtülü seralar görülür.",
        "keys": [
         "mandalina",
         "gyul",
         "portakal",
         "citrus",
         "jeju"
        ],
        "ids": [
         "49"
        ],
        "main": "Mandalina bahçesi",
        "prompt": "Yol kenarında mandalina bahçeleri en çok hangi ilde görülür?"
       },
       {
        "key": "Oreum",
        "label": "Otla kaplı yumuşak volkan konileri (oreum) → Jeju",
        "sub": "Jeju'da düzlüğün üstünde tek tek yükselen yumuşak, ağaçsız, otlu tepeler. Küçük yan volkanlardır.",
        "keys": [
         "oreum",
         "volkan",
         "koni",
         "çimen tepesi",
         "jeju",
         "tarabi"
        ],
        "ids": [
         "49"
        ],
        "main": "Oreum",
        "prompt": "Düzlükten tek tek yükselen otla kaplı küçük volkan konileri (oreum) hangi ildedir?"
       },
       {
        "key": "Rüzgâr türbinli yayla",
        "label": "Ağaçsız yüksek otlak ve sıralı rüzgâr türbinleri → Gangwon (Daegwallyeong, Pyeongchang)",
        "sub": "Gangwon dağlarında yüksek, ağaçsız otlak sırtlar; koyun ve sığır, çitler ve sırtta dizili rüzgâr türbinleri.",
        "keys": [
         "yayla",
         "rüzgar türbini",
         "rüzgâr türbini",
         "daegwallyeong",
         "pyeongchang",
         "otlak",
         "samyang",
         "koyun"
        ],
        "ids": [
         "42"
        ],
        "main": "Rüzgâr türbinli yayla",
        "prompt": "Ağaçsız yüksek otlak ve sırtta rüzgâr türbinleri hangi ilin işaretidir?"
       },
       {
        "key": "Basamaklı çeltik",
        "label": "Denize bakan yamaçta taş duvarlı basamaklı çeltik → Güney Gyeongsang (Namhae)",
        "sub": "Namhae adasının güneyinde, deniz kıyısında yamaca oyulmuş küçük çeltik tarlaları (darangi). Köy evleri tarlaların arasındadır.",
        "keys": [
         "teras",
         "basamaklı",
         "darangi",
         "namhae",
         "çeltik",
         "gacheon"
        ],
        "ids": [
         "48"
        ],
        "main": "Basamaklı çeltik",
        "prompt": "Denize inen yamaçta basamaklı çeltik tarlaları (Namhae) hangi ilde?"
       },
       {
        "key": "Çay tarlası",
        "label": "Yamaç boyunca kıvrılan çay sıraları → Güney Jeolla (Boseong)",
        "sub": "Boseong, Kore'nin ana çay bölgesidir; yamaçlar baştan başa düzenli yeşil çay sıralarıyla kaplıdır.",
        "keys": [
         "çay",
         "boseong",
         "çay tarlası",
         "green tea",
         "çay bahçesi"
        ],
        "ids": [
         "46"
        ],
        "main": "Çay tarlası",
        "prompt": "Yamaçta düzenli çay sıraları hangi ilin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce ada mı, kıta mı?",
       "body": "Siyah bazalt duvar, mandalina ve çimenli volkan konileri: Jeju. Bunlar yoksa kıta Kore'sindesin."
      },
      {
       "title": "Yayla ve teras",
       "body": "Ağaçsız yüksek otlak, rüzgâr türbinleri, koyun: Gangwon (Daegwallyeong). Denize inen basamaklı küçük çeltikler: güney kıyı, Namhae. Yamaçta tarak gibi çay sıraları: Boseong, Güney Jeolla."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Basamaklı tarla her yerde Namhae değildir",
       "ids": [
        "48",
        "46",
        "42"
       ],
       "body": "Kore dağlarında küçük basamaklı çeltikler başka yerlerde de olur. Denize bakan, taş duvarlı ve köyle iç içe olanı Namhae'dir; yamaçta düzenli yeşil sıralar çaysa Boseong'dur.",
       "traps": [
        [
         "Denize inen taş duvarlı teras çeltik",
         "Namhae (Güney Gyeongsang)"
        ],
        [
         "Yamaçta tarak gibi koyu yeşil sıralar",
         "Boseong çay tarlası (Güney Jeolla)"
        ],
        [
         "Yüksekte ağaçsız otlak, türbin",
         "Daegwallyeong (Gangwon)"
        ]
       ]
      }
     ],
     "visualsTitle": "Nasıl görünür? ",
     "visuals": [
      {
       "id": "kr-batdam",
       "title": "Jeju: bazalt taş duvar",
       "badge": "Duvar",
       "set": "kr-batdam",
       "ids": [
        "49"
       ],
       "sub": "Harçsız, kaba, siyah volkan taşı duvar; tarlayı çevirir. Fotoğraf Gimnyeong (Jeju).",
       "tags": [
        "batdam",
        "Jeju"
       ]
      },
      {
       "id": "kr-gam",
       "title": "Jeju: mandalina",
       "badge": "Mandalina",
       "set": "kr-gam",
       "ids": [
        "49"
       ],
       "sub": "Jeju adasının başlıca ürünü; dalında mandalina.",
       "tags": [
        "mandalina",
        "Jeju"
       ]
      },
      {
       "id": "kr-oreum",
       "title": "Jeju: oreum",
       "badge": "Oreum",
       "set": "kr-oreum",
       "ids": [
        "49"
       ],
       "sub": "Düzlükten yükselen otla kaplı küçük volkan konileri. Fotoğraf Tarabi Oreum çevresinden.",
       "tags": [
        "oreum",
        "Jeju"
       ]
      },
      {
       "id": "kr-daegwal",
       "title": "Gangwon: Daegwallyeong yaylası",
       "badge": "Yayla",
       "set": "kr-daegwal",
       "ids": [
        "42"
       ],
       "sub": "Ağaçsız yüksek otlak, çit, koyun ve sırtta rüzgâr türbinleri (Samyang Çiftliği, Pyeongchang).",
       "tags": [
        "yayla",
        "Gangwon"
       ]
      },
      {
       "id": "kr-namhae",
       "title": "Namhae: basamaklı çeltik",
       "badge": "Teras",
       "set": "kr-namhae",
       "ids": [
        "48"
       ],
       "sub": "Denize bakan yamaçta küçük taş duvarlı çeltik terasları (Gacheon köyü).",
       "tags": [
        "teras",
        "Namhae"
       ]
      },
      {
       "id": "kr-boseong",
       "title": "Boseong: çay tarlası",
       "badge": "Çay",
       "set": "kr-boseong",
       "ids": [
        "46"
       ],
       "sub": "Yamaç boyunca düzenli çay sıraları, Güney Jeolla.",
       "tags": [
        "çay",
        "Boseong"
       ]
      }
     ],
     "practice": "visual"
    }
   ]
  });
})(typeof window !== 'undefined' ? window : globalThis);

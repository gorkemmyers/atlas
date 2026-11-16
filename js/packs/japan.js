/* packs/japan.js — Japonya: kanji il adları ve elektrik şirketleri
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "japan",
   "name": "Japonya",
   "code": "JP",
   "area": "Asya",
   "tone": "red",
   "geoVar": "JP_GEO",
   "themeId": "jp",
   "themeCfg": {
    "aria": "Japonya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.",
    "fit": "Tüm Japonya’yı göster",
    "grid": {
     "lat": [
      24,
      48,
      4
     ],
     "lon": [
      122,
      148,
      4
     ],
     "txt": [
      26,
      46,
      4
     ],
     "refLon": 136,
     "refLat": 36
    },
    "excludeWorld": [
     "Japan"
    ],
    "bg": [
     [
      127.8,
      36.6,
      "G. KORE",
      "c"
     ],
     [
      127.2,
      39.8,
      "K. KORE",
      "c"
     ],
     [
      140.5,
      45.8,
      "RUSYA · SAHALİN",
      "c"
     ],
     [
      121,
      24.4,
      "TAYVAN",
      "c"
     ],
     [
      133.5,
      39.8,
      "Japonya Denizi",
      "s"
     ],
     [
      143,
      32,
      "Pasifik Okyanusu",
      "s"
     ],
     [
      125,
      29,
      "Doğu Çin Denizi",
      "s"
     ]
    ]
   },
   "srsPrefix": "jp",
   "simKmScale": 340,
   "maxFitZoom": 8,
   "labelSize": 9,
   "unitLabel": "il",
   "unitLabelCap": "İl",
   "codeLabel": "Kod",
   "localLabel": "Kanji",
   "line": "47 il (prefektörlük) · kanji il adları ve elektrik şirketi",
   "blurb": "İki şey işe yarar: tabelalardaki il adını kanjiden okumak ve elektrik direğindeki şirket adından bölgeyi bulmak. Telefon kodları pratikte işe yaramaz, o yüzden yok.",
   "overviewLead": "47 ili haritada öğren; kartta ilin kanji adı, merkezi ve elektrik şirketi yazar.",
   "colorModes": [
    {
     "id": "reg",
     "label": "Bölge"
    },
    {
     "id": "util",
     "label": "Elektrik şirketi",
     "groups": [
      {
       "label": "Hokkaido Elektrik",
       "sub": "Yalnız Hokkaido.",
       "ids": [
        "hokkaido"
       ],
       "main": [
        "hokkaido"
       ],
       "cls": "q0"
      },
      {
       "label": "Tohoku Elektrik",
       "sub": "Altı Tohoku ili ve Niigata.",
       "ids": [
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima",
        "niigata"
       ],
       "main": [
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima",
        "niigata"
       ],
       "cls": "q2"
      },
      {
       "label": "Tokyo Elektrik (TEPCO)",
       "sub": "Kanto'nun yedi ili, Yamanashi ve Shizuoka'nın doğusu.",
       "ids": [
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa",
        "yamanashi",
        "shizuoka"
       ],
       "main": [
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa",
        "yamanashi"
       ],
       "cls": "q3"
      },
      {
       "label": "Chubu Elektrik",
       "sub": "Aichi, Nagano; Gifu, Mie ve Shizuoka'nın büyük bölümü.",
       "ids": [
        "aichi",
        "nagano",
        "gifu",
        "mie",
        "shizuoka"
       ],
       "main": [
        "aichi",
        "nagano",
        "gifu",
        "mie",
        "shizuoka"
       ],
       "cls": "q1"
      },
      {
       "label": "Hokuriku Elektrik",
       "sub": "Toyama, Ishikawa; Fukui'nin kuzeyi, Gifu'nun kuzeybatısı.",
       "ids": [
        "toyama",
        "ishikawa",
        "fukui",
        "gifu"
       ],
       "main": [
        "toyama",
        "ishikawa",
        "fukui"
       ],
       "cls": "q5"
      },
      {
       "label": "Kansai Elektrik",
       "sub": "Shiga, Kyoto, Osaka, Hyogo, Nara, Wakayama; ayrıca Fukui'nin batısı ve Mie'nin güneyi.",
       "ids": [
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama",
        "fukui",
        "mie",
        "gifu"
       ],
       "main": [
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama"
       ],
       "cls": "q7"
      },
      {
       "label": "Chugoku Elektrik",
       "sub": "Tottori, Shimane, Okayama, Hiroshima, Yamaguchi.",
       "ids": [
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi"
       ],
       "main": [
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi"
       ],
       "cls": "q4"
      },
      {
       "label": "Shikoku Elektrik",
       "sub": "Dört Shikoku ili.",
       "ids": [
        "tokushima",
        "kagawa",
        "ehime",
        "kochi"
       ],
       "main": [
        "tokushima",
        "kagawa",
        "ehime",
        "kochi"
       ],
       "cls": "q8"
      },
      {
       "label": "Kyushu Elektrik",
       "sub": "Yedi Kyushu ili; Okinawa değil.",
       "ids": [
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima"
       ],
       "main": [
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima"
       ],
       "cls": "q6"
      },
      {
       "label": "Okinawa Elektrik",
       "sub": "Yalnız Okinawa.",
       "ids": [
        "okinawa"
       ],
       "main": [
        "okinawa"
       ],
       "cls": "q9"
      }
     ]
    }
   ],
   "regions": [
    {
     "id": "hokkaido",
     "tr": "Hokkaido",
     "key": "HOK",
     "color": 0,
     "cue": "Tek il; adı 道 ile biter."
    },
    {
     "id": "tohoku",
     "tr": "Tohoku",
     "key": "TOH",
     "color": 2,
     "cue": "Altı il, hepsi 県."
    },
    {
     "id": "kanto",
     "tr": "Kanto",
     "key": "KAN",
     "color": 1,
     "cue": "Yedi il; Tokyo 都 ile biter."
    },
    {
     "id": "chubu",
     "tr": "Chubu",
     "key": "CHU",
     "color": 3,
     "cue": "Dokuz il; Honshu'nun ortası, Niigata'dan Aichi'ye."
    },
    {
     "id": "kansai",
     "tr": "Kansai (Kinki)",
     "key": "KSI",
     "color": 7,
     "cue": "Yedi il; Kyoto ve Osaka 府 ile biter."
    },
    {
     "id": "chugoku",
     "tr": "Chugoku",
     "key": "CGK",
     "color": 5,
     "cue": "Beş il, Honshu'nun batı ucu."
    },
    {
     "id": "shikoku",
     "tr": "Shikoku",
     "key": "SHK",
     "color": 4,
     "cue": "Dört il; Shikoku adasında."
    },
    {
     "id": "kyushu",
     "tr": "Kyushu ve Okinawa",
     "key": "KYU",
     "color": 6,
     "cue": "Yedi Kyushu ili ve Okinawa."
    }
   ],
   "units": [
    {
     "id": "hokkaido",
     "name": "Hokkaido",
     "short": "Hokkaido",
     "local": "北海道",
     "cap": "Sapporo",
     "reg": "hokkaido",
     "cue": "Merkez: Sapporo (札幌). Adı 道 ile biter. Elektrik: Hokkaido Elektrik."
    },
    {
     "id": "aomori",
     "name": "Aomori",
     "short": "Aomori",
     "local": "青森県",
     "cap": "Aomori",
     "reg": "tohoku",
     "cue": "Merkez: Aomori (青森). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "iwate",
     "name": "Iwate",
     "short": "Iwate",
     "local": "岩手県",
     "cap": "Morioka",
     "reg": "tohoku",
     "cue": "Merkez: Morioka (盛岡). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "miyagi",
     "name": "Miyagi",
     "short": "Miyagi",
     "local": "宮城県",
     "cap": "Sendai",
     "reg": "tohoku",
     "cue": "Merkez: Sendai (仙台). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "akita",
     "name": "Akita",
     "short": "Akita",
     "local": "秋田県",
     "cap": "Akita",
     "reg": "tohoku",
     "cue": "Merkez: Akita (秋田). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "yamagata",
     "name": "Yamagata",
     "short": "Yamagata",
     "local": "山形県",
     "cap": "Yamagata",
     "reg": "tohoku",
     "cue": "Merkez: Yamagata (山形). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "fukushima",
     "name": "Fukushima",
     "short": "Fukushima",
     "local": "福島県",
     "cap": "Fukushima",
     "reg": "tohoku",
     "cue": "Merkez: Fukushima (福島). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "ibaraki",
     "name": "Ibaraki",
     "short": "Ibaraki",
     "local": "茨城県",
     "cap": "Mito",
     "reg": "kanto",
     "cue": "Merkez: Mito (水戸). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "tochigi",
     "name": "Tochigi",
     "short": "Tochigi",
     "local": "栃木県",
     "cap": "Utsunomiya",
     "reg": "kanto",
     "cue": "Merkez: Utsunomiya (宇都宮). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "gunma",
     "name": "Gunma",
     "short": "Gunma",
     "local": "群馬県",
     "cap": "Maebashi",
     "reg": "kanto",
     "cue": "Merkez: Maebashi (前橋). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "saitama",
     "name": "Saitama",
     "short": "Saitama",
     "local": "埼玉県",
     "cap": "Saitama",
     "reg": "kanto",
     "cue": "Merkez: Saitama (さいたま). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "chiba",
     "name": "Chiba",
     "short": "Chiba",
     "local": "千葉県",
     "cap": "Chiba",
     "reg": "kanto",
     "cue": "Merkez: Chiba (千葉). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "tokyo",
     "name": "Tokyo",
     "short": "Tokyo",
     "local": "東京都",
     "cap": "Tokyo",
     "reg": "kanto",
     "cue": "Merkez: Tokyo (新宿). Adı 都 ile biter. Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "kanagawa",
     "name": "Kanagawa",
     "short": "Kanagawa",
     "local": "神奈川県",
     "cap": "Yokohama",
     "reg": "kanto",
     "cue": "Merkez: Yokohama (横浜). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "niigata",
     "name": "Niigata",
     "short": "Niigata",
     "local": "新潟県",
     "cap": "Niigata",
     "reg": "chubu",
     "cue": "Merkez: Niigata (新潟). Elektrik: Tohoku Elektrik."
    },
    {
     "id": "toyama",
     "name": "Toyama",
     "short": "Toyama",
     "local": "富山県",
     "cap": "Toyama",
     "reg": "chubu",
     "cue": "Merkez: Toyama (富山). Elektrik: Hokuriku Elektrik."
    },
    {
     "id": "ishikawa",
     "name": "Ishikawa",
     "short": "Ishikawa",
     "local": "石川県",
     "cap": "Kanazawa",
     "reg": "chubu",
     "cue": "Merkez: Kanazawa (金沢). Elektrik: Hokuriku Elektrik."
    },
    {
     "id": "fukui",
     "name": "Fukui",
     "short": "Fukui",
     "local": "福井県",
     "cap": "Fukui",
     "reg": "chubu",
     "cue": "Merkez: Fukui (福井). Elektrik: Hokuriku Elektrik, Kansai Elektrik."
    },
    {
     "id": "yamanashi",
     "name": "Yamanashi",
     "short": "Yamanashi",
     "local": "山梨県",
     "cap": "Kofu",
     "reg": "chubu",
     "cue": "Merkez: Kofu (甲府). Elektrik: Tokyo Elektrik (TEPCO)."
    },
    {
     "id": "nagano",
     "name": "Nagano",
     "short": "Nagano",
     "local": "長野県",
     "cap": "Nagano",
     "reg": "chubu",
     "cue": "Merkez: Nagano (長野). Elektrik: Chubu Elektrik."
    },
    {
     "id": "gifu",
     "name": "Gifu",
     "short": "Gifu",
     "local": "岐阜県",
     "cap": "Gifu",
     "reg": "chubu",
     "cue": "Merkez: Gifu (岐阜). Elektrik: Chubu Elektrik, Hokuriku Elektrik, Kansai Elektrik."
    },
    {
     "id": "shizuoka",
     "name": "Shizuoka",
     "short": "Shizuoka",
     "local": "静岡県",
     "cap": "Shizuoka",
     "reg": "chubu",
     "cue": "Merkez: Shizuoka (静岡). Elektrik: Tokyo Elektrik (TEPCO), Chubu Elektrik."
    },
    {
     "id": "aichi",
     "name": "Aichi",
     "short": "Aichi",
     "local": "愛知県",
     "cap": "Nagoya",
     "reg": "chubu",
     "cue": "Merkez: Nagoya (名古屋). Elektrik: Chubu Elektrik."
    },
    {
     "id": "mie",
     "name": "Mie",
     "short": "Mie",
     "local": "三重県",
     "cap": "Tsu",
     "reg": "kansai",
     "cue": "Merkez: Tsu (津). Elektrik: Chubu Elektrik, Kansai Elektrik."
    },
    {
     "id": "shiga",
     "name": "Shiga",
     "short": "Shiga",
     "local": "滋賀県",
     "cap": "Otsu",
     "reg": "kansai",
     "cue": "Merkez: Otsu (大津). Elektrik: Kansai Elektrik."
    },
    {
     "id": "kyoto",
     "name": "Kyoto",
     "short": "Kyoto",
     "local": "京都府",
     "cap": "Kyoto",
     "reg": "kansai",
     "cue": "Merkez: Kyoto (京都). Adı 府 ile biter (Japonya'da yalnız Kyoto ve Osaka). Elektrik: Kansai Elektrik."
    },
    {
     "id": "osaka",
     "name": "Osaka",
     "short": "Osaka",
     "local": "大阪府",
     "cap": "Osaka",
     "reg": "kansai",
     "cue": "Merkez: Osaka (大阪). Adı 府 ile biter (Japonya'da yalnız Kyoto ve Osaka). Elektrik: Kansai Elektrik."
    },
    {
     "id": "hyogo",
     "name": "Hyogo",
     "short": "Hyogo",
     "local": "兵庫県",
     "cap": "Kobe",
     "reg": "kansai",
     "cue": "Merkez: Kobe (神戸). Elektrik: Kansai Elektrik."
    },
    {
     "id": "nara",
     "name": "Nara",
     "short": "Nara",
     "local": "奈良県",
     "cap": "Nara",
     "reg": "kansai",
     "cue": "Merkez: Nara (奈良). Elektrik: Kansai Elektrik."
    },
    {
     "id": "wakayama",
     "name": "Wakayama",
     "short": "Wakayama",
     "local": "和歌山県",
     "cap": "Wakayama",
     "reg": "kansai",
     "cue": "Merkez: Wakayama (和歌山). Elektrik: Kansai Elektrik."
    },
    {
     "id": "tottori",
     "name": "Tottori",
     "short": "Tottori",
     "local": "鳥取県",
     "cap": "Tottori",
     "reg": "chugoku",
     "cue": "Merkez: Tottori (鳥取). Elektrik: Chugoku Elektrik."
    },
    {
     "id": "shimane",
     "name": "Shimane",
     "short": "Shimane",
     "local": "島根県",
     "cap": "Matsue",
     "reg": "chugoku",
     "cue": "Merkez: Matsue (松江). Elektrik: Chugoku Elektrik."
    },
    {
     "id": "okayama",
     "name": "Okayama",
     "short": "Okayama",
     "local": "岡山県",
     "cap": "Okayama",
     "reg": "chugoku",
     "cue": "Merkez: Okayama (岡山). Elektrik: Chugoku Elektrik."
    },
    {
     "id": "hiroshima",
     "name": "Hiroshima",
     "short": "Hiroshima",
     "local": "広島県",
     "cap": "Hiroshima",
     "reg": "chugoku",
     "cue": "Merkez: Hiroshima (広島). Elektrik: Chugoku Elektrik."
    },
    {
     "id": "yamaguchi",
     "name": "Yamaguchi",
     "short": "Yamaguchi",
     "local": "山口県",
     "cap": "Yamaguchi",
     "reg": "chugoku",
     "cue": "Merkez: Yamaguchi (山口). Elektrik: Chugoku Elektrik."
    },
    {
     "id": "tokushima",
     "name": "Tokushima",
     "short": "Tokushima",
     "local": "徳島県",
     "cap": "Tokushima",
     "reg": "shikoku",
     "cue": "Merkez: Tokushima (徳島). Elektrik: Shikoku Elektrik."
    },
    {
     "id": "kagawa",
     "name": "Kagawa",
     "short": "Kagawa",
     "local": "香川県",
     "cap": "Takamatsu",
     "reg": "shikoku",
     "cue": "Merkez: Takamatsu (高松). Elektrik: Shikoku Elektrik."
    },
    {
     "id": "ehime",
     "name": "Ehime",
     "short": "Ehime",
     "local": "愛媛県",
     "cap": "Matsuyama",
     "reg": "shikoku",
     "cue": "Merkez: Matsuyama (松山). Elektrik: Shikoku Elektrik."
    },
    {
     "id": "kochi",
     "name": "Kochi",
     "short": "Kochi",
     "local": "高知県",
     "cap": "Kochi",
     "reg": "shikoku",
     "cue": "Merkez: Kochi (高知). Elektrik: Shikoku Elektrik."
    },
    {
     "id": "fukuoka",
     "name": "Fukuoka",
     "short": "Fukuoka",
     "local": "福岡県",
     "cap": "Fukuoka",
     "reg": "kyushu",
     "cue": "Merkez: Fukuoka (福岡). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "saga",
     "name": "Saga",
     "short": "Saga",
     "local": "佐賀県",
     "cap": "Saga",
     "reg": "kyushu",
     "cue": "Merkez: Saga (佐賀). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "nagasaki",
     "name": "Nagasaki",
     "short": "Nagasaki",
     "local": "長崎県",
     "cap": "Nagasaki",
     "reg": "kyushu",
     "cue": "Merkez: Nagasaki (長崎). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "kumamoto",
     "name": "Kumamoto",
     "short": "Kumamoto",
     "local": "熊本県",
     "cap": "Kumamoto",
     "reg": "kyushu",
     "cue": "Merkez: Kumamoto (熊本). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "oita",
     "name": "Oita",
     "short": "Oita",
     "local": "大分県",
     "cap": "Oita",
     "reg": "kyushu",
     "cue": "Merkez: Oita (大分). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "miyazaki",
     "name": "Miyazaki",
     "short": "Miyazaki",
     "local": "宮崎県",
     "cap": "Miyazaki",
     "reg": "kyushu",
     "cue": "Merkez: Miyazaki (宮崎). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "kagoshima",
     "name": "Kagoshima",
     "short": "Kagoshima",
     "local": "鹿児島県",
     "cap": "Kagoshima",
     "reg": "kyushu",
     "cue": "Merkez: Kagoshima (鹿児島). Elektrik: Kyushu Elektrik."
    },
    {
     "id": "okinawa",
     "name": "Okinawa",
     "short": "Okinawa",
     "local": "沖縄県",
     "cap": "Naha",
     "reg": "kyushu",
     "cue": "Merkez: Naha (那覇). Elektrik: Okinawa Elektrik."
    }
   ],
   "topics": [
    {
     "key": "kanji",
     "navLabel": "Kanji",
     "icon": "langs",
     "drillPreset": "kanji",
     "mapMode": "reg",
     "labelMode": "local",
     "title": "Tabelalardaki il adı (kanji)",
     "lead": "Japonya'da yol tabelalarında yer adları kanjiyle yazılır. Bir tabelada il adını (ya da ilin merkez şehrini) okuyabilirsen konumu doğrudan bulursun. 47 ilin adı 2–3 kanjiden oluşur ve çoğu zaman sonunda 県 (il), 府, 都 ya da 道 gelir. Tabelalarda sonek çoğu zaman yazılmaz.",
     "desc": "愛知, 福岡, 山口… Kanji il adını oku, konumu bul.",
     "decoder": {
      "title": "Kanji ya da il adı",
      "placeholder": "Kanjiyi yapıştır ya da il adını yaz: 愛知, Aichi…",
      "hint": "Tabeladaki kanjiyi yaz (sonek olmadan da olur); il haritada boyanır. Il adı yazarsan kanjisini gösterir.",
      "quizPrompt": "Bu kanji hangi ilin adı?",
      "noHit": "Bu yazı listede yok. 47 ilin adı burada; küçük şehir adları yok.",
      "entries": [
       {
        "key": "北海道",
        "label": "北海道 · Hokkaido",
        "sub": "Merkez: Sapporo (札幌).",
        "keys": [
         "北海",
         "Hokkaido",
         "hokkaido",
         "札幌"
        ],
        "ids": [
         "hokkaido"
        ],
        "main": "北海道",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "青森県",
        "label": "青森県 · Aomori",
        "sub": "Merkez: Aomori (青森).",
        "keys": [
         "青森",
         "Aomori",
         "aomori",
         "青森"
        ],
        "ids": [
         "aomori"
        ],
        "main": "青森県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "岩手県",
        "label": "岩手県 · Iwate",
        "sub": "Merkez: Morioka (盛岡).",
        "keys": [
         "岩手",
         "Iwate",
         "iwate",
         "盛岡"
        ],
        "ids": [
         "iwate"
        ],
        "main": "岩手県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "宮城県",
        "label": "宮城県 · Miyagi",
        "sub": "Merkez: Sendai (仙台).",
        "keys": [
         "宮城",
         "Miyagi",
         "miyagi",
         "仙台"
        ],
        "ids": [
         "miyagi"
        ],
        "main": "宮城県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "秋田県",
        "label": "秋田県 · Akita",
        "sub": "Merkez: Akita (秋田).",
        "keys": [
         "秋田",
         "Akita",
         "akita",
         "秋田"
        ],
        "ids": [
         "akita"
        ],
        "main": "秋田県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "山形県",
        "label": "山形県 · Yamagata",
        "sub": "Merkez: Yamagata (山形).",
        "keys": [
         "山形",
         "Yamagata",
         "yamagata",
         "山形"
        ],
        "ids": [
         "yamagata"
        ],
        "main": "山形県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "福島県",
        "label": "福島県 · Fukushima",
        "sub": "Merkez: Fukushima (福島).",
        "keys": [
         "福島",
         "Fukushima",
         "fukushima",
         "福島"
        ],
        "ids": [
         "fukushima"
        ],
        "main": "福島県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "茨城県",
        "label": "茨城県 · Ibaraki",
        "sub": "Merkez: Mito (水戸).",
        "keys": [
         "茨城",
         "Ibaraki",
         "ibaraki",
         "水戸"
        ],
        "ids": [
         "ibaraki"
        ],
        "main": "茨城県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "栃木県",
        "label": "栃木県 · Tochigi",
        "sub": "Merkez: Utsunomiya (宇都宮).",
        "keys": [
         "栃木",
         "Tochigi",
         "tochigi",
         "宇都宮"
        ],
        "ids": [
         "tochigi"
        ],
        "main": "栃木県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "群馬県",
        "label": "群馬県 · Gunma",
        "sub": "Merkez: Maebashi (前橋).",
        "keys": [
         "群馬",
         "Gunma",
         "gunma",
         "前橋"
        ],
        "ids": [
         "gunma"
        ],
        "main": "群馬県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "埼玉県",
        "label": "埼玉県 · Saitama",
        "sub": "Merkez: Saitama (さいたま).",
        "keys": [
         "埼玉",
         "Saitama",
         "saitama",
         "さいたま"
        ],
        "ids": [
         "saitama"
        ],
        "main": "埼玉県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "千葉県",
        "label": "千葉県 · Chiba",
        "sub": "Merkez: Chiba (千葉).",
        "keys": [
         "千葉",
         "Chiba",
         "chiba",
         "千葉"
        ],
        "ids": [
         "chiba"
        ],
        "main": "千葉県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "東京都",
        "label": "東京都 · Tokyo",
        "sub": "Merkez: Tokyo (新宿).",
        "keys": [
         "東京",
         "Tokyo",
         "tokyo",
         "新宿"
        ],
        "ids": [
         "tokyo"
        ],
        "main": "東京都",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "神奈川県",
        "label": "神奈川県 · Kanagawa",
        "sub": "Merkez: Yokohama (横浜).",
        "keys": [
         "神奈川",
         "Kanagawa",
         "kanagawa",
         "横浜"
        ],
        "ids": [
         "kanagawa"
        ],
        "main": "神奈川県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "新潟県",
        "label": "新潟県 · Niigata",
        "sub": "Merkez: Niigata (新潟).",
        "keys": [
         "新潟",
         "Niigata",
         "niigata",
         "新潟"
        ],
        "ids": [
         "niigata"
        ],
        "main": "新潟県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "富山県",
        "label": "富山県 · Toyama",
        "sub": "Merkez: Toyama (富山).",
        "keys": [
         "富山",
         "Toyama",
         "toyama",
         "富山"
        ],
        "ids": [
         "toyama"
        ],
        "main": "富山県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "石川県",
        "label": "石川県 · Ishikawa",
        "sub": "Merkez: Kanazawa (金沢).",
        "keys": [
         "石川",
         "Ishikawa",
         "ishikawa",
         "金沢"
        ],
        "ids": [
         "ishikawa"
        ],
        "main": "石川県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "福井県",
        "label": "福井県 · Fukui",
        "sub": "Merkez: Fukui (福井).",
        "keys": [
         "福井",
         "Fukui",
         "fukui",
         "福井"
        ],
        "ids": [
         "fukui"
        ],
        "main": "福井県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "山梨県",
        "label": "山梨県 · Yamanashi",
        "sub": "Merkez: Kofu (甲府).",
        "keys": [
         "山梨",
         "Yamanashi",
         "yamanashi",
         "甲府"
        ],
        "ids": [
         "yamanashi"
        ],
        "main": "山梨県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "長野県",
        "label": "長野県 · Nagano",
        "sub": "Merkez: Nagano (長野).",
        "keys": [
         "長野",
         "Nagano",
         "nagano",
         "長野"
        ],
        "ids": [
         "nagano"
        ],
        "main": "長野県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "岐阜県",
        "label": "岐阜県 · Gifu",
        "sub": "Merkez: Gifu (岐阜).",
        "keys": [
         "岐阜",
         "Gifu",
         "gifu",
         "岐阜"
        ],
        "ids": [
         "gifu"
        ],
        "main": "岐阜県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "静岡県",
        "label": "静岡県 · Shizuoka",
        "sub": "Merkez: Shizuoka (静岡).",
        "keys": [
         "静岡",
         "Shizuoka",
         "shizuoka",
         "静岡"
        ],
        "ids": [
         "shizuoka"
        ],
        "main": "静岡県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "愛知県",
        "label": "愛知県 · Aichi",
        "sub": "Merkez: Nagoya (名古屋).",
        "keys": [
         "愛知",
         "Aichi",
         "aichi",
         "名古屋"
        ],
        "ids": [
         "aichi"
        ],
        "main": "愛知県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "三重県",
        "label": "三重県 · Mie",
        "sub": "Merkez: Tsu (津).",
        "keys": [
         "三重",
         "Mie",
         "mie",
         "津"
        ],
        "ids": [
         "mie"
        ],
        "main": "三重県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "滋賀県",
        "label": "滋賀県 · Shiga",
        "sub": "Merkez: Otsu (大津).",
        "keys": [
         "滋賀",
         "Shiga",
         "shiga",
         "大津"
        ],
        "ids": [
         "shiga"
        ],
        "main": "滋賀県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "京都府",
        "label": "京都府 · Kyoto",
        "sub": "Merkez: Kyoto (京都).",
        "keys": [
         "京都",
         "Kyoto",
         "kyoto",
         "京都"
        ],
        "ids": [
         "kyoto"
        ],
        "main": "京都府",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "大阪府",
        "label": "大阪府 · Osaka",
        "sub": "Merkez: Osaka (大阪).",
        "keys": [
         "大阪",
         "Osaka",
         "osaka",
         "大阪"
        ],
        "ids": [
         "osaka"
        ],
        "main": "大阪府",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "兵庫県",
        "label": "兵庫県 · Hyogo",
        "sub": "Merkez: Kobe (神戸).",
        "keys": [
         "兵庫",
         "Hyogo",
         "hyogo",
         "神戸"
        ],
        "ids": [
         "hyogo"
        ],
        "main": "兵庫県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "奈良県",
        "label": "奈良県 · Nara",
        "sub": "Merkez: Nara (奈良).",
        "keys": [
         "奈良",
         "Nara",
         "nara",
         "奈良"
        ],
        "ids": [
         "nara"
        ],
        "main": "奈良県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "和歌山県",
        "label": "和歌山県 · Wakayama",
        "sub": "Merkez: Wakayama (和歌山).",
        "keys": [
         "和歌山",
         "Wakayama",
         "wakayama",
         "和歌山"
        ],
        "ids": [
         "wakayama"
        ],
        "main": "和歌山県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "鳥取県",
        "label": "鳥取県 · Tottori",
        "sub": "Merkez: Tottori (鳥取).",
        "keys": [
         "鳥取",
         "Tottori",
         "tottori",
         "鳥取"
        ],
        "ids": [
         "tottori"
        ],
        "main": "鳥取県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "島根県",
        "label": "島根県 · Shimane",
        "sub": "Merkez: Matsue (松江).",
        "keys": [
         "島根",
         "Shimane",
         "shimane",
         "松江"
        ],
        "ids": [
         "shimane"
        ],
        "main": "島根県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "岡山県",
        "label": "岡山県 · Okayama",
        "sub": "Merkez: Okayama (岡山).",
        "keys": [
         "岡山",
         "Okayama",
         "okayama",
         "岡山"
        ],
        "ids": [
         "okayama"
        ],
        "main": "岡山県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "広島県",
        "label": "広島県 · Hiroshima",
        "sub": "Merkez: Hiroshima (広島).",
        "keys": [
         "広島",
         "Hiroshima",
         "hiroshima",
         "広島"
        ],
        "ids": [
         "hiroshima"
        ],
        "main": "広島県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "山口県",
        "label": "山口県 · Yamaguchi",
        "sub": "Merkez: Yamaguchi (山口).",
        "keys": [
         "山口",
         "Yamaguchi",
         "yamaguchi",
         "山口"
        ],
        "ids": [
         "yamaguchi"
        ],
        "main": "山口県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "徳島県",
        "label": "徳島県 · Tokushima",
        "sub": "Merkez: Tokushima (徳島).",
        "keys": [
         "徳島",
         "Tokushima",
         "tokushima",
         "徳島"
        ],
        "ids": [
         "tokushima"
        ],
        "main": "徳島県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "香川県",
        "label": "香川県 · Kagawa",
        "sub": "Merkez: Takamatsu (高松).",
        "keys": [
         "香川",
         "Kagawa",
         "kagawa",
         "高松"
        ],
        "ids": [
         "kagawa"
        ],
        "main": "香川県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "愛媛県",
        "label": "愛媛県 · Ehime",
        "sub": "Merkez: Matsuyama (松山).",
        "keys": [
         "愛媛",
         "Ehime",
         "ehime",
         "松山"
        ],
        "ids": [
         "ehime"
        ],
        "main": "愛媛県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "高知県",
        "label": "高知県 · Kochi",
        "sub": "Merkez: Kochi (高知).",
        "keys": [
         "高知",
         "Kochi",
         "kochi",
         "高知"
        ],
        "ids": [
         "kochi"
        ],
        "main": "高知県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "福岡県",
        "label": "福岡県 · Fukuoka",
        "sub": "Merkez: Fukuoka (福岡).",
        "keys": [
         "福岡",
         "Fukuoka",
         "fukuoka",
         "福岡"
        ],
        "ids": [
         "fukuoka"
        ],
        "main": "福岡県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "佐賀県",
        "label": "佐賀県 · Saga",
        "sub": "Merkez: Saga (佐賀).",
        "keys": [
         "佐賀",
         "Saga",
         "saga",
         "佐賀"
        ],
        "ids": [
         "saga"
        ],
        "main": "佐賀県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "長崎県",
        "label": "長崎県 · Nagasaki",
        "sub": "Merkez: Nagasaki (長崎).",
        "keys": [
         "長崎",
         "Nagasaki",
         "nagasaki",
         "長崎"
        ],
        "ids": [
         "nagasaki"
        ],
        "main": "長崎県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "熊本県",
        "label": "熊本県 · Kumamoto",
        "sub": "Merkez: Kumamoto (熊本).",
        "keys": [
         "熊本",
         "Kumamoto",
         "kumamoto",
         "熊本"
        ],
        "ids": [
         "kumamoto"
        ],
        "main": "熊本県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "大分県",
        "label": "大分県 · Oita",
        "sub": "Merkez: Oita (大分).",
        "keys": [
         "大分",
         "Oita",
         "oita",
         "大分"
        ],
        "ids": [
         "oita"
        ],
        "main": "大分県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "宮崎県",
        "label": "宮崎県 · Miyazaki",
        "sub": "Merkez: Miyazaki (宮崎).",
        "keys": [
         "宮崎",
         "Miyazaki",
         "miyazaki",
         "宮崎"
        ],
        "ids": [
         "miyazaki"
        ],
        "main": "宮崎県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "鹿児島県",
        "label": "鹿児島県 · Kagoshima",
        "sub": "Merkez: Kagoshima (鹿児島).",
        "keys": [
         "鹿児島",
         "Kagoshima",
         "kagoshima",
         "鹿児島"
        ],
        "ids": [
         "kagoshima"
        ],
        "main": "鹿児島県",
        "prompt": "Bu kanji hangi ilin adı?"
       },
       {
        "key": "沖縄県",
        "label": "沖縄県 · Okinawa",
        "sub": "Merkez: Naha (那覇).",
        "keys": [
         "沖縄",
         "Okinawa",
         "okinawa",
         "那覇"
        ],
        "ids": [
         "okinawa"
        ],
        "main": "沖縄県",
        "prompt": "Bu kanji hangi ilin adı?"
       }
      ]
     },
     "flows": [
      {
       "title": "Sonekle başla",
       "body": "Sondaki kanji yönetim türünü söyler: 都 yalnız Tokyo, 道 yalnız Hokkaido, 府 yalnız Kyoto ve Osaka, 県 geri kalan 43 il. Sonek olmadan kalan kısım ilin adıdır."
      },
      {
       "title": "Ortak kanjileri ayıkla",
       "body": "山, 島, 福, 岡, 川 birden çok ilde geçer. Bu kanjileri görünce hemen karar verme: yanındaki kanji ilin asıl adını verir. Aşağıdaki 'Karışanlar' bölümüne bak."
      },
      {
       "title": "Merkez şehir ile il adı farklı olabilir",
       "body": "Aichi'nin merkezi Nagoya (名古屋), Hyogo'nun merkezi Kobe (神戸), Kanagawa'nın merkezi Yokohama (横浜). Tabelada şehir adı görürsen önce hangi ile ait olduğunu düşün; il kartlarında merkezin kanjisi yazıyor."
      }
     ],
     "bandsTitle": "Bölgeye göre il adları",
     "bandsHint": "dokun → bölge haritada boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "北海道",
       "title": "Hokkaido",
       "sub": "北海道",
       "ids": [
        "hokkaido"
       ]
      },
      {
       "cls": "q2",
       "key": "東北",
       "title": "Tohoku",
       "sub": "青森 岩手 宮城 秋田 山形 福島",
       "ids": [
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima"
       ]
      },
      {
       "cls": "q1",
       "key": "関東",
       "title": "Kanto",
       "sub": "茨城 栃木 群馬 埼玉 千葉 東京 神奈川",
       "ids": [
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa"
       ]
      },
      {
       "cls": "q3",
       "key": "中部",
       "title": "Chubu",
       "sub": "新潟 富山 石川 福井 山梨 長野 岐阜 静岡 愛知",
       "ids": [
        "niigata",
        "toyama",
        "ishikawa",
        "fukui",
        "yamanashi",
        "nagano",
        "gifu",
        "shizuoka",
        "aichi"
       ]
      },
      {
       "cls": "q7",
       "key": "近畿",
       "title": "Kansai (Kinki)",
       "sub": "三重 滋賀 京都 大阪 兵庫 奈良 和歌山",
       "ids": [
        "mie",
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama"
       ]
      },
      {
       "cls": "q5",
       "key": "中国",
       "title": "Chugoku",
       "sub": "鳥取 島根 岡山 広島 山口",
       "ids": [
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi"
       ]
      },
      {
       "cls": "q4",
       "key": "四国",
       "title": "Shikoku",
       "sub": "徳島 香川 愛媛 高知",
       "ids": [
        "tokushima",
        "kagawa",
        "ehime",
        "kochi"
       ]
      },
      {
       "cls": "q6",
       "key": "九州",
       "title": "Kyushu ve Okinawa",
       "sub": "福岡 佐賀 長崎 熊本 大分 宮崎 鹿児島 沖縄",
       "ids": [
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima",
        "okinawa"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "山 (dağ) kaç ilde var?",
       "ids": [
        "yamagata",
        "toyama",
        "yamanashi",
        "wakayama",
        "okayama",
        "yamaguchi"
       ],
       "body": "山 kanjisi 6 ilin adında geçer. Tek başına işe yaramaz; ayırt eden öbür kanjiye bak.",
       "traps": [
        [
         "山形",
         "Yamagata"
        ],
        [
         "富山",
         "Toyama"
        ],
        [
         "山梨",
         "Yamanashi"
        ],
        [
         "和歌山",
         "Wakayama"
        ],
        [
         "岡山",
         "Okayama"
        ],
        [
         "山口",
         "Yamaguchi"
        ]
       ]
      },
      {
       "title": "島 (ada) kaç ilde var?",
       "ids": [
        "fukushima",
        "shimane",
        "hiroshima",
        "tokushima",
        "kagoshima"
       ],
       "body": "島 kanjisi 5 ilin adında geçer. Tek başına işe yaramaz; ayırt eden öbür kanjiye bak.",
       "traps": [
        [
         "福島",
         "Fukushima"
        ],
        [
         "島根",
         "Shimane"
        ],
        [
         "広島",
         "Hiroshima"
        ],
        [
         "徳島",
         "Tokushima"
        ],
        [
         "鹿児島",
         "Kagoshima"
        ]
       ]
      },
      {
       "title": "福 (mutluluk, şans) kaç ilde var?",
       "ids": [
        "fukushima",
        "fukui",
        "fukuoka"
       ],
       "body": "福 kanjisi 3 ilin adında geçer. Tek başına işe yaramaz; ayırt eden öbür kanjiye bak.",
       "traps": [
        [
         "福島",
         "Fukushima"
        ],
        [
         "福井",
         "Fukui"
        ],
        [
         "福岡",
         "Fukuoka"
        ]
       ]
      },
      {
       "title": "岡 (tepe) kaç ilde var?",
       "ids": [
        "shizuoka",
        "okayama",
        "fukuoka"
       ],
       "body": "岡 kanjisi 3 ilin adında geçer. Tek başına işe yaramaz; ayırt eden öbür kanjiye bak.",
       "traps": [
        [
         "静岡",
         "Shizuoka"
        ],
        [
         "岡山",
         "Okayama"
        ],
        [
         "福岡",
         "Fukuoka"
        ]
       ]
      },
      {
       "title": "川 (nehir) kaç ilde var?",
       "ids": [
        "kanagawa",
        "ishikawa",
        "kagawa"
       ],
       "body": "川 kanjisi 3 ilin adında geçer. Tek başına işe yaramaz; ayırt eden öbür kanjiye bak.",
       "traps": [
        [
         "神奈川",
         "Kanagawa"
        ],
        [
         "石川",
         "Ishikawa"
        ],
        [
         "香川",
         "Kagawa"
        ]
       ]
      },
      {
       "title": "İkili benzerler",
       "ids": [
        "aichi",
        "ehime",
        "ibaraki",
        "kanagawa",
        "kochi",
        "kyoto",
        "miyagi",
        "miyazaki",
        "nagano",
        "nagasaki",
        "nara",
        "oita",
        "osaka",
        "saga",
        "shiga",
        "tokyo"
       ],
       "body": "Bu çiftlerde bir kanji ortaktır, öbürü değişir: 宮城 ile 宮崎, 長野 ile 長崎, 愛知 ile 愛媛, 滋賀 ile 佐賀, 茨城 ile 宮城, 大阪 ile 大分, 東京 ile 京都. Hepsinde ayıran kanji hangisiyse onu ezberle.",
       "traps": [
        [
         "宮城 / 宮崎",
         "Miyagi / Miyazaki"
        ],
        [
         "長野 / 長崎",
         "Nagano / Nagasaki"
        ],
        [
         "愛知 / 愛媛",
         "Aichi / Ehime"
        ],
        [
         "滋賀 / 佐賀",
         "Shiga / Saga"
        ],
        [
         "茨城 / 宮城",
         "Ibaraki / Miyagi"
        ],
        [
         "大阪 / 大分",
         "Osaka / Oita"
        ]
       ]
      }
     ],
     "visuals": []
    },
    {
     "key": "elektrik",
     "navLabel": "Direk levhası",
     "icon": "bolt",
     "drillPreset": "elektrik",
     "mapMode": "util",
     "labelMode": "short",
     "title": "Elektrik direği: levha, bant ve şerit",
     "lead": "Japonya’da elektriği 10 bölgesel şirket dağıtır ve her biri yalnız kendi bölgesine hizmet verir. Direkte bakacağın üç şey var: levhaların ÜSTÜNDEKİ siyah-sarı bant, levhaların kendisi ve gövdedeki sarı-siyah şerit. Levhada şirketin adı değil direğin numarası ve yer adı yazar; şirketi levhanın biçiminden (köşe, yazı yönü, harf türü, yaslanma) tanırsın. Şirketi bulunca bölgeyi birkaç ile daraltırsın.",
     "desc": "Levhanın biçimine ve gövdedeki şeride bakarak elektrik şirketini, oradan bölgeyi bul.",
     "decoder": {
      "title": "Ne görüyorsun?",
      "placeholder": "Örn. yuvarlak köşe, sola yaslı katakana, çapraz şerit, 四国…",
      "hint": "Levhanın ya da şeridin özelliğini yaz: şirketin bölgesi haritada boyanır, çizimi altta çıkar.",
      "quizPrompt": "Bu levha ya da şerit hangi bölgenin?",
      "noHit": "Bu ipucu listede yok. Levhanın köşesine, yazı yönüne ve harf türüne bak.",
      "entries": [
       {
        "key": "北海道電力",
        "label": "北海道電力 · Hokkaido Elektrik: dikey levhada alt alta çok sayı",
        "sub": "Üstte 2–3 satır küçük iki haneli konum kodu, altta büyük numaralar. Yalnız Hokkaido; NTT levhası çoğunlukla sarı.",
        "keys": [
         "hokkaido",
         "北海道",
         "çok sayı",
         "iki haneli",
         "ızgara",
         "konum kodu",
         "sarı levha",
         "sarı ntt",
         "dikey levha"
        ],
        "ids": [
         "hokkaido"
        ],
        "main": "Dikey levha, alt alta çok sayı",
        "prompt": "Alt alta dizilmiş çok sayılı dikey levha hangi bölgenin?",
        "set": "jp-pl-hkd"
       },
       {
        "key": "東北電力",
        "label": "東北電力 · Tohoku Elektrik: yatay levha, solda logo, altta büyük sayı",
        "sub": "Yatay levhada kanji hat adı, altında büyük sayı ya da harf. Altı Tohoku ili ve Niigata; aynı direkteki NTT levhası genellikle dikey.",
        "keys": [
         "tohoku",
         "東北",
         "yatay levha",
         "logo",
         "niigata",
         "yatay kanji",
         "büyük sayı"
        ],
        "ids": [
         "aomori",
         "iwate",
         "miyagi",
         "akita",
         "yamagata",
         "fukushima",
         "niigata"
        ],
        "main": "Yatay levha, solda logo, altta büyük sayı",
        "prompt": "Solda logolu, altta büyük sayılı yatay levha hangi bölgenin?",
        "set": "jp-pl-toh"
       },
       {
        "key": "東京電力",
        "label": "東京電力 · Tokyo Elektrik (TEPCO): dikey beyaz levha, yatay kanji",
        "sub": "Koyu mavi levha ve el yazılı gri teneke levha yalnız bunda görülür. Kanto’nun yedi ili, Yamanashi ve Shizuoka’nın doğusu.",
        "keys": [
         "tepco",
         "tokyo",
         "東京",
         "kanto",
         "koyu mavi",
         "el yazısı",
         "gri teneke",
         "yatay kanji",
         "yamanashi",
         "izu"
        ],
        "ids": [
         "ibaraki",
         "tochigi",
         "gunma",
         "saitama",
         "chiba",
         "tokyo",
         "kanagawa",
         "yamanashi",
         "shizuoka"
        ],
        "main": "Dikey beyaz levha, YATAY kanji",
        "prompt": "Dikey beyaz levhada yatay yazılmış kanji hangi bölgenin?",
        "set": "jp-pl-tep"
       },
       {
        "key": "北陸電力",
        "label": "北陸電力 · Hokuriku Elektrik: yatay levha, sol üstte 4 haneli sayı",
        "sub": "Sayı bölgeyi söyler: 0000–3999 Toyama, 4000–7999 Ishikawa, 8000–9999 Fukui. Yıldırımlı daire logosu; gövde şeridi eğri çapraz.",
        "keys": [
         "hokuriku",
         "北陸",
         "4 haneli",
         "dört haneli",
         "yıldırım",
         "toyama",
         "ishikawa",
         "fukui",
         "kanazawa"
        ],
        "ids": [
         "toyama",
         "ishikawa",
         "fukui",
         "gifu"
        ],
        "main": "Yatay levha, sol üstte 4 haneli sayı",
        "prompt": "Sol üstte 4 haneli sayı yazan yatay levha hangi bölgenin?",
        "set": "jp-pl-hrk"
       },
       {
        "key": "中部電力",
        "label": "中部電力 · Chubu Elektrik: köşeleri yuvarlak levha",
        "sub": "Başka şirkette yuvarlak köşe yoktur. Eski levha açık turuncu, yenilerde beyaz da yaygın. Aichi, Nagano; Gifu, Mie ve Shizuoka’nın büyük kısmı.",
        "keys": [
         "chubu",
         "中部",
         "yuvarlak",
         "oval",
         "köşe",
         "turuncu",
         "nagano",
         "aichi",
         "yuvarlak köşe"
        ],
        "ids": [
         "aichi",
         "nagano",
         "gifu",
         "mie",
         "shizuoka"
        ],
        "main": "Köşeleri yuvarlak levha",
        "prompt": "Köşeleri yuvarlak levha hangi bölgenin?",
        "set": "jp-pl-chu"
       },
       {
        "key": "関西電力",
        "label": "関西電力 · Kansai Elektrik: dikey levhada alt alta yazı",
        "sub": "Yer adı katakana ya da kanji ile alt alta yazılır. Güney Fukui’de yanında yatay NTT levhası varsa Mihama’nın batısı. Chugoku’nun bazı yerlerinde de benzeri var.",
        "keys": [
         "kansai",
         "関西",
         "dikey yazı",
         "alt alta",
         "dikey katakana",
         "dikey levha",
         "osaka",
         "kyoto"
        ],
        "ids": [
         "shiga",
         "kyoto",
         "osaka",
         "hyogo",
         "nara",
         "wakayama",
         "fukui",
         "mie",
         "gifu"
        ],
        "main": "Dikey levha, yazı alt alta (katakana ya da kanji)",
        "prompt": "Yazısı alt alta dizilmiş dikey levha hangi bölgenin?",
        "set": "jp-pl-kan"
       },
       {
        "key": "中国電力",
        "label": "中国電力 · Chugoku Elektrik: yatay katakana, sağa yaslı",
        "sub": "Birçok biçim bir arada (en zor bölge). Silik «EnerGia» logosu, direğin yanında sarı ok levhası, Hiroshima’da çoğu kez 3+ levha.",
        "keys": [
         "chugoku",
         "中国",
         "sağa yaslı",
         "energia",
         "sarı ok",
         "hiroshima",
         "üç levha",
         "karışık"
        ],
        "ids": [
         "tottori",
         "shimane",
         "okayama",
         "hiroshima",
         "yamaguchi"
        ],
        "main": "Yatay katakana, sağa yaslı",
        "prompt": "Yatay yazılmış, sağa yaslı katakana levha hangi bölgenin?",
        "set": "jp-pl-chg"
       },
       {
        "key": "四国電力",
        "label": "四国電力 · Shikoku Elektrik: yatay katakana, sola yaslı, üstte logo",
        "sub": "Küçük levhalar; levhaların üstünde siyah-sarı «自家発連系有» bandı sık. Chugoku’nun bazı yerlerinde de sola yaslı katakana görülür.",
        "keys": [
         "shikoku",
         "四国",
         "sola yaslı",
         "yatay katakana",
         "küçük levha"
        ],
        "ids": [
         "tokushima",
         "kagawa",
         "ehime",
         "kochi"
        ],
        "main": "Yatay katakana, sola yaslı",
        "prompt": "Yatay yazılmış, sola yaslı katakana levha hangi bölgenin?",
        "set": "jp-pl-shk"
       },
       {
        "key": "九州電力",
        "label": "九州電力 · Kyushu Elektrik: tek katakana + sayı (カ113)",
        "sub": "Levha kalın ve dikey; kenarlarında bazen kararmış lekeler olur. Yedi Kyushu ili.",
        "keys": [
         "kyushu",
         "九州",
         "tek katakana",
         "katakana sayı",
         "kalın levha",
         "fukuoka"
        ],
        "ids": [
         "fukuoka",
         "saga",
         "nagasaki",
         "kumamoto",
         "oita",
         "miyazaki",
         "kagoshima"
        ],
        "main": "Tek katakana + sayı (カ113)",
        "prompt": "Tek katakana harfi ve sayıdan oluşan levha hangi bölgenin?",
        "set": "jp-pl-kyu"
       },
       {
        "key": "沖縄電力",
        "label": "沖縄電力 · Okinawa Elektrik: çizgili levha, üç levha",
        "sub": "Satırları ayıran yatay çizgiler ve numara işaretleri; direkte üç levha. Yalnız Okinawa.",
        "keys": [
         "okinawa",
         "沖縄",
         "çizgili",
         "çizgi",
         "üç levha",
         "cetvel"
        ],
        "ids": [
         "okinawa"
        ],
        "main": "Çizgili levha, direkte üç levha",
        "prompt": "Çizgili levha ve direkte üç levha hangi bölgenin?",
        "set": "jp-pl-oki"
       },
       {
        "key": "Tohoku şeridi",
        "label": "Gri-beyaz yansıtıcılı şerit (bazen gri-sarı) → Tohoku",
        "sub": "Şeritte gri ve beyaz yansıtıcılar; bazen gri ve sarı. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.)",
        "keys": [
         "tohoku",
         "gri",
         "beyaz yansıtıcı",
         "gri beyaz",
         "gri sarı",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "aomori",
         "iwate",
         "miyagi",
         "akita",
         "yamagata",
         "fukushima"
        ],
        "main": "Gri-beyaz yansıtıcılı şerit",
        "prompt": "Gri ve beyaz yansıtıcılı şerit hangi bölgenin?",
        "quiz": false
       },
       {
        "key": "Hokuriku şeridi",
        "label": "Eğri, çapraz sarı bantlar (koyu zeminde) → Hokuriku",
        "sub": "Koyu zeminde eğri, çapraz sarı bantlar; düz dikey değil, direğe çapraz biner. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.)",
        "keys": [
         "hokuriku",
         "eğri",
         "çapraz",
         "çapraz bant",
         "sarmal",
         "spiral",
         "スパイラル",
         "eğik şerit",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "toyama",
         "ishikawa",
         "fukui"
        ],
        "main": "Eğri, çapraz sarı bantlar",
        "prompt": "Koyu zeminde eğri, çapraz sarı bantlı şerit hangi bölgenin?"
       },
       {
        "key": "Kansai şeridi",
        "label": "Uzun, solgun, dikey çizgili şerit → Kansai",
        "sub": "Şerit uzun, rengi solgun ve çizgiler dikey. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.) Düz dikey biçim başka bölgelerde de çıkar, bu yüzden soru olarak sorulmaz.",
        "keys": [
         "kansai",
         "uzun",
         "solgun",
         "dikey çizgi",
         "kenarlıksız",
         "kaplan",
         "トラ柄",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "shiga",
         "kyoto",
         "osaka",
         "hyogo",
         "nara",
         "wakayama"
        ],
        "main": "Uzun, solgun, dikey çizgili şerit",
        "prompt": "Uzun, solgun, dikey çizgili şerit hangi bölgenin?",
        "set": "jp-str-kan",
        "quiz": false
       },
       {
        "key": "Chubu şeridi",
        "label": "Çapraz çizgili, renkleri sırayla değişen şerit; üstte ve altta sarı yazı → Chubu",
        "sub": "Şerit çapraz çizgili ve renkler sırayla değişir; üstte ve altta sarı yazı bulunur. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.)",
        "keys": [
         "chubu",
         "çapraz",
         "çapraz çizgi",
         "renkler sırayla",
         "alternatif",
         "sarı yazı",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "aichi",
         "shizuoka",
         "nagano",
         "gifu",
         "mie"
        ],
        "main": "Çapraz çizgili, renkleri sırayla değişen şerit",
        "prompt": "Çapraz çizgili, renkleri sırayla değişen, üstte ve altta sarı yazılı şerit hangi bölgenin?"
       },
       {
        "key": "Chugoku şeridi",
        "label": "4 yansıtıcı, üstte sarı yazı, küçük şerit → Chugoku",
        "sub": "Dört yansıtıcı var, yazı üstte ve sarı; şerit görece küçük. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.)",
        "keys": [
         "chugoku",
         "4 yansıtıcı",
         "dört yansıtıcı",
         "küçük şerit",
         "sarı yazı",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "tottori",
         "shimane",
         "okayama",
         "hiroshima",
         "yamaguchi"
        ],
        "main": "4 yansıtıcılı, üstte sarı yazılı küçük şerit",
        "prompt": "Dört yansıtıcılı, üstte sarı yazılı küçük şerit hangi bölgenin?"
       },
       {
        "key": "Shikoku şeridi",
        "label": "6 yansıtıcılı, oldukça küçük şerit → Shikoku",
        "sub": "Altı yansıtıcı var ve şerit oldukça küçük. Shikoku’da turuncu-siyah bant da sık görülür. (Plonkit topluluk özeti; bu bölge için Commons’ta fotoğraf bulamadık.)",
        "keys": [
         "shikoku",
         "6 yansıtıcı",
         "altı yansıtıcı",
         "küçük şerit",
         "turuncu",
         "turuncu siyah",
         "bant",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "tokushima",
         "kagawa",
         "ehime",
         "kochi"
        ],
        "main": "6 yansıtıcılı küçük şerit",
        "prompt": "Altı yansıtıcılı, oldukça küçük şerit hangi bölgenin?"
       },
       {
        "key": "Kyushu-Okinawa şeridi",
        "label": "Ortada koyu, kabartmalı yansıtıcılar → Kyushu / Okinawa",
        "sub": "Yansıtıcılar koyu ve şeridin ortasında; üzerlerinde çıkıntı (kabartma) var. Fotoğraf: Fukuoka.",
        "keys": [
         "kyushu",
         "okinawa",
         "koyu yansıtıcı",
         "kabartma",
         "çıkıntı",
         "tanecik",
         "bump",
         "gövde şeridi",
         "şerit"
        ],
        "ids": [
         "fukuoka",
         "saga",
         "nagasaki",
         "kumamoto",
         "oita",
         "miyazaki",
         "kagoshima",
         "okinawa"
        ],
        "main": "Ortada koyu, kabartmalı yansıtıcılar",
        "prompt": "Ortada koyu, kabartmalı yansıtıcılı şerit hangi bölgenin?",
        "set": "jp-str-kyu"
       },
       {
        "key": "自家発連系有",
        "label": "Levhaların üstünde «自家発連系有» bandı → Shikoku’da belgeli",
        "sub": "Yakında güneş enerjisi gibi kendi üretimi olan yapı varsa takılır. Kaynaklarda yazının yalnız Shikoku örneği belgeli; diğer şirketlerde farklı olabilir, bu yüzden soru olarak sorulmaz.",
        "keys": [
         "自家発",
         "連系",
         "逆潮",
         "bant",
         "üst bant",
         "güneş",
         "siyah sarı bant",
         "shikoku"
        ],
        "ids": [
         "tokushima",
         "kagawa",
         "ehime",
         "kochi"
        ],
        "main": "Levhaların üstünde «自家発連系有» bandı",
        "prompt": "Levhaların üstündeki «自家発連系有» bandı hangi bölgede belgelenmiş?",
        "set": "jp-band1",
        "quiz": false
       }
      ]
     },
     "flows": [
      {
       "title": "Önce levhaları bul",
       "body": "Direkte iki levha bulunur: üstte elektrik şirketinin, altta NTT’nin (telefon). Bölgeyi söyleyen elektrik şirketinin levhasıdır. NTT levhası da ipucu verir: Hokkaido’da çoğunlukla sarı, Hokuriku’da ve kuzey Nagano’da yatay."
      },
      {
       "title": "Levhanın biçimine bak",
       "body": "Köşeler yuvarlak mı (Chubu)? Yazı yatay mı dikey mi? Katakana mı kanji mi? Sola mı sağa mı yaslı? Tek katakana + sayı mı (Kyushu)? Çizgili ve üç levha mı (Okinawa)? Alt alta çok sayı mı (Hokkaido)?"
      },
      {
       "title": "Gövdedeki şeride bak",
       "body": "Her bölgenin şeridi biraz farklıdır. Tohoku: gri-beyaz yansıtıcı. Hokuriku: eğri, çapraz sarı bant. Kansai: uzun, solgun, dikey. Chugoku: 4 yansıtıcı, üstte sarı yazı. Shikoku: 6 yansıtıcı, küçük. Kyushu-Okinawa: ortada koyu, kabartmalı. Chubu: çapraz, renkler sırayla, üstte ve altta sarı yazı. Düz sarı-siyah dikey şerit tek başına bir şey söylemez."
      },
      {
       "title": "Levhaların üstünde bant var mı?",
       "body": "Yakında güneş enerjisi gibi kendi üretimi olan bir yapı varsa levhaların üstüne siyah-sarı bir bant takılır. Yazısı şirkete göre değişir (Shikoku örneği: 自家発連系有). Tek başına bölge kanıtı değildir."
      },
      {
       "title": "Üç tuzak",
       "body": "Yamanashi ve Shizuoka’nın doğusu TEPCO, Niigata Tohoku Elektrik; Nagano Chubu Elektrik bölgesindedir. Bölge adı ile şirket örtüşmez."
      }
     ],
     "bandsTitle": "Şirketler",
     "bandsHint": "dokun → iller boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "北海道",
       "title": "Hokkaido Elektrik",
       "sub": "Yalnız Hokkaido · alt alta çok sayı",
       "ids": [
        "hokkaido"
       ]
      },
      {
       "cls": "q2",
       "key": "東北",
       "title": "Tohoku Elektrik",
       "sub": "Altı Tohoku ili ve Niigata · yatay levha, solda logo",
       "ids": [
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima",
        "niigata"
       ]
      },
      {
       "cls": "q3",
       "key": "東京",
       "title": "Tokyo Elektrik (TEPCO)",
       "sub": "Kanto’nun 7 ili, Yamanashi, Shizuoka doğusu · dikey beyaz, yatay kanji",
       "ids": [
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa",
        "yamanashi",
        "shizuoka"
       ]
      },
      {
       "cls": "q1",
       "key": "中部",
       "title": "Chubu Elektrik",
       "sub": "Aichi, Nagano; Gifu, Mie, Shizuoka büyük kısmı · köşeler yuvarlak",
       "ids": [
        "aichi",
        "nagano",
        "gifu",
        "mie",
        "shizuoka"
       ]
      },
      {
       "cls": "q5",
       "key": "北陸",
       "title": "Hokuriku Elektrik",
       "sub": "Toyama, Ishikawa; Fukui kuzeyi, Gifu kuzeybatısı · sol üstte 4 haneli sayı",
       "ids": [
        "toyama",
        "ishikawa",
        "fukui",
        "gifu"
       ]
      },
      {
       "cls": "q7",
       "key": "関西",
       "title": "Kansai Elektrik",
       "sub": "Kansai’nin 6 ili; Fukui batısı, Mie güneyi · yazı alt alta",
       "ids": [
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama",
        "fukui",
        "mie",
        "gifu"
       ]
      },
      {
       "cls": "q4",
       "key": "中国",
       "title": "Chugoku Elektrik",
       "sub": "Chugoku’nun 5 ili · sağa yaslı yatay katakana",
       "ids": [
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi"
       ]
      },
      {
       "cls": "q8",
       "key": "四国",
       "title": "Shikoku Elektrik",
       "sub": "Dört Shikoku ili · sola yaslı yatay katakana",
       "ids": [
        "tokushima",
        "kagawa",
        "ehime",
        "kochi"
       ]
      },
      {
       "cls": "q6",
       "key": "九州",
       "title": "Kyushu Elektrik",
       "sub": "Yedi Kyushu ili · tek katakana + sayı",
       "ids": [
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima"
       ]
      },
      {
       "cls": "q9",
       "key": "沖縄",
       "title": "Okinawa Elektrik",
       "sub": "Yalnız Okinawa · çizgili levha, üç levha",
       "ids": [
        "okinawa"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "Benzeyen levhalar",
       "ids": [
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi",
        "tokushima",
        "kagawa",
        "ehime",
        "kochi",
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama"
       ],
       "body": "Sola yaslı yatay katakana Shikoku’dur ama Chugoku’nun bazı yerlerinde de görülür; sağa yaslı olanı Chugoku’dur. Alt alta yazı Kansai’dir ama Chugoku’nun bazı yerlerinde de çıkar. Yatay levhada kanji varsa Tohoku, harf + 4 haneli sayı varsa Hokuriku. Emin olamazsan başka ipuçlarına (tabela, bitki) bak.",
       "traps": [
        [
         "Sola yaslı katakana",
         "Shikoku (Chugoku’da da görülür)"
        ],
        [
         "Sağa yaslı katakana",
         "Chugoku"
        ],
        [
         "Alt alta yazı",
         "Kansai (Chugoku’da da görülür)"
        ],
        [
         "Yatay levha + kanji",
         "Tohoku"
        ],
        [
         "Yatay levha + 4 haneli sayı",
         "Hokuriku"
        ]
       ]
      },
      {
       "title": "Tek şirketin olmadığı dört il",
       "ids": [
        "gifu",
        "mie",
        "shizuoka",
        "fukui"
       ],
       "body": "Bu dört ilde iki ya da üç şirket hizmet verir. Shizuoka: doğusu TEPCO, geri kalanı Chubu. Gifu: büyük bölümü Chubu, kuzeybatısı Hokuriku, Sekigahara çevresi Kansai. Mie: büyük bölümü Chubu, güneyi Kansai. Fukui: kuzeyi Hokuriku, Mihama'nın batısı Kansai.",
       "traps": [
        [
         "Shizuoka",
         "TEPCO (doğu) ve Chubu"
        ],
        [
         "Gifu",
         "Chubu, Hokuriku, Kansai"
        ],
        [
         "Mie",
         "Chubu ve Kansai"
        ],
        [
         "Fukui",
         "Hokuriku ve Kansai"
        ]
       ]
      },
      {
       "title": "Bölge adı ile şirket örtüşmez",
       "ids": [
        "niigata",
        "yamanashi",
        "nagano"
       ],
       "body": "Niigata Chubu bölgesinde sayılır ama Tohoku Elektrik hizmet verir. Yamanashi Chubu bölgesinde sayılır ama TEPCO hizmet verir. Nagano Chubu Elektrik'in bölgesidir.",
       "traps": [
        [
         "Niigata",
         "Tohoku Elektrik"
        ],
        [
         "Yamanashi",
         "Tokyo Elektrik (TEPCO)"
        ],
        [
         "Nagano",
         "Chubu Elektrik"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "jp-direk-anatomi",
       "title": "Direğin parçaları ve üst bant",
       "badge": "Genel",
       "set": "jp-anat",
       "ids": [
        "hokkaido",
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima",
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa",
        "niigata",
        "toyama",
        "ishikawa",
        "fukui",
        "yamanashi",
        "nagano",
        "gifu",
        "shizuoka",
        "aichi",
        "mie",
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama",
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi",
        "tokushima",
        "kagawa",
        "ehime",
        "kochi",
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima",
        "okinawa"
       ],
       "sub": "Üstte siyah-sarı bant, ortada levhalar, aşağıda gövde şeridi. Bant ve levha yazıları şirkete göre değişir.",
       "tags": [
        "bant",
        "levha",
        "şerit"
       ],
       "quiz": false
      },
      {
       "id": "jp-levhalar",
       "title": "Levha biçimleri (10 şirket)",
       "badge": "10 çizim",
       "set": "jp-plates",
       "ids": [
        "hokkaido",
        "aomori",
        "iwate",
        "miyagi",
        "akita",
        "yamagata",
        "fukushima",
        "ibaraki",
        "tochigi",
        "gunma",
        "saitama",
        "chiba",
        "tokyo",
        "kanagawa",
        "niigata",
        "toyama",
        "ishikawa",
        "fukui",
        "yamanashi",
        "nagano",
        "gifu",
        "shizuoka",
        "aichi",
        "mie",
        "shiga",
        "kyoto",
        "osaka",
        "hyogo",
        "nara",
        "wakayama",
        "tottori",
        "shimane",
        "okayama",
        "hiroshima",
        "yamaguchi",
        "tokushima",
        "kagawa",
        "ehime",
        "kochi",
        "fukuoka",
        "saga",
        "nagasaki",
        "kumamoto",
        "oita",
        "miyazaki",
        "kagoshima",
        "okinawa"
       ],
       "sub": "Her şirketin levhası ayrı: köşe, yazı yönü, harf türü, yaslanma. Kaydırarak hepsine bak.",
       "tags": [
        "yatay",
        "dikey",
        "katakana",
        "kanji"
       ],
       "quiz": false
      },
      {
       "id": "jp-seritler",
       "title": "Gövde şeridi: düz dikey örnekler",
       "badge": "2 foto",
       "set": "jp-wraps",
       "ids": [
        "ishikawa",
        "kyoto"
       ],
       "sub": "Kyoto ve Kanazawa: levhalarla birlikte standart dikey şerit. Bu tür tek başına bölge söylemez.",
       "tags": [
        "düz",
        "dikey"
       ],
       "quiz": false
      },
      {
       "id": "jp-seritler-bolge",
       "title": "Gövde şeridi: bölgesel ayrıntı",
       "badge": "2 foto",
       "set": "jp-str",
       "ids": [
        "fukuoka",
        "kyoto"
       ],
       "sub": "Fukuoka (Kyushu): siyah bölümlerde kabartma doku. Kyoto (Kansai): geniş dikey çubuklar. Tohoku, Hokuriku, Chugoku, Shikoku ve Chubu şeritleri için Commons’ta okunaklı fotoğraf bulamadık; bunları çizmedik, yukarıdaki listede yalnız metinle anlatıyoruz.",
       "tags": [
        "kabartma",
        "kyushu",
        "kansai"
       ],
       "quiz": false
      }
     ],
     "visualsTitle": "Direk çizimleri "
    }
   ]
   });
})(typeof window !== 'undefined' ? window : globalThis);

/* packs/brazil.js — Brezilya: eyalet yol öneki, BR numaraları, DDD ve bölgeyi gösteren direk ile manzara
   Şema ve kurallar: KURALLAR.md  ·  Bu dosya VERİDİR: uydurma alan yok, olmayan bilgi boş kalır. */
(function (g) {
  'use strict';
  g.registerCountryPack({
   "id": "brazil",
   "name": "Brezilya",
   "code": "BR",
   "area": "Güney Amerika",
   "tone": "amber",
   "geoVar": "BR_GEO",
   "themeId": "br",
   "themeCfg": {
    "aria": "Brezilya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.",
    "fit": "Tüm Brezilya’yı göster",
    "grid": {
     "lat": [
      -36,
      8,
      4
     ],
     "lon": [
      -76,
      -32,
      4
     ],
     "txt": [
      -32,
      4,
      4
     ],
     "refLon": -54,
     "refLat": -14
    },
    "excludeWorld": [
     "Brazil",
     "Argentina"
    ],
    "bg": [
     [
      -65,
      -35.2,
      "ARJANTİN",
      "c"
     ],
     [
      -64.8,
      -17,
      "BOLİVYA",
      "c"
     ],
     [
      -75,
      -9.8,
      "PERU",
      "c"
     ],
     [
      -73.2,
      3.6,
      "KOLOMBİYA",
      "c"
     ],
     [
      -66.5,
      7.2,
      "VENEZUELA",
      "c"
     ],
     [
      -58.4,
      -23.4,
      "PARAGUAY",
      "c"
     ],
     [
      -56,
      -32.8,
      "URUGUAY",
      "c"
     ],
     [
      -37,
      -14,
      "Atlas Okyanusu",
      "s"
     ],
     [
      -41.5,
      -28,
      "Güney Atlantik",
      "s"
     ]
    ]
   },
   "srsPrefix": "br",
   "simKmScale": 680,
   "maxFitZoom": 7,
   "labelSize": 9.6,
   "unitLabel": "eyalet",
   "unitLabelCap": "Eyalet",
   "codeLabel": "DDD",
   "codePrefix": 1,
   "codeModeLabel": "DDD ilk rakamı",
   "line": "27 eyalet · yol levhası, DDD ve bölgeyi gösteren direk ile manzara",
   "blurb": "Üç şey işe yarar: yol levhasındaki eyalet kısaltması (SP-310, MG-050…), duvarlara boyanmış telefon numarasındaki DDD ve bölgeyi gösteren elektrik direği ile manzara (kuzeydoğuda merdiven direk, güney yaylalarında araucária, kuzeydoğunun kurak içinde kaktüs).",
   "overviewLead": "27 eyaleti haritada öğren; kartta her eyaletin yol öneki, geçen federal yollar ve DDD kodları yazar. Bölgesel görünüm konusunda direk türünü ve manzarayı eyaletle eşleştirirsin.",
   "regions": [
    {
     "id": "sudeste",
     "tr": "Güneydoğu",
     "key": "SDE",
     "color": 0,
     "cue": "São Paulo, Rio de Janeiro, Minas Gerais, Espírito Santo. DDD 11–19, 21–28 ve 31–38."
    },
    {
     "id": "sul",
     "tr": "Güney",
     "key": "SUL",
     "color": 2,
     "cue": "Paraná, Santa Catarina, Rio Grande do Sul. DDD 41–49 ve 51–55."
    },
    {
     "id": "co",
     "tr": "Orta-Batı",
     "key": "ORB",
     "color": 7,
     "cue": "Brasília ve geniş tarım ovaları. DDD 61, 62, 64, 65, 66, 67."
    },
    {
     "id": "nordeste",
     "tr": "Kuzeydoğu",
     "key": "KDE",
     "color": 5,
     "cue": "Dokuz eyalet. DDD 71–89, Maranhão için 98 ve 99."
    },
    {
     "id": "norte",
     "tr": "Kuzey",
     "key": "KZY",
     "color": 4,
     "cue": "Amazon havzası. DDD 63, 68, 69 ve 91–97."
    }
   ],
   "units": [
    {
     "id": "sp",
     "name": "São Paulo",
     "short": "SP",
     "local": "",
     "cap": "São Paulo",
     "reg": "sudeste",
     "codes": [
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19"
     ],
     "cue": "Eyalet yolları SP-xxx diye yazılır (örnek: SP-310). Federal yollar: BR-101, BR-116, BR-153, BR-364, BR-050, BR-381. DDD: 11 Grande São Paulo · 12 Vale do Paraíba, kuzey kıyı (São José dos Campos) · 13 Baixada Santista (Santos) · 14 Bauru, Marília · 15 Sorocaba · 16 Ribeirão Preto, Araraquara · 17 São José do Rio Preto · 18 Presidente Prudente, Araçatuba · 19 Campinas."
    },
    {
     "id": "rj",
     "name": "Rio de Janeiro",
     "short": "RJ",
     "local": "",
     "cap": "Rio de Janeiro",
     "reg": "sudeste",
     "codes": [
      "21",
      "22",
      "24"
     ],
     "cue": "Eyalet yolları RJ-xxx diye yazılır (örnek: RJ-116). Federal yollar: BR-101, BR-116, BR-040. DDD: 21 Rio de Janeiro şehri ve çevresi · 22 Campos dos Goytacazes, Cabo Frio · 24 Volta Redonda, Petrópolis."
    },
    {
     "id": "es",
     "name": "Espírito Santo",
     "short": "ES",
     "local": "",
     "cap": "Vitória",
     "reg": "sudeste",
     "codes": [
      "27",
      "28"
     ],
     "cue": "Eyalet yolları ES-xxx diye yazılır. Federal yollar: BR-101, BR-381. DDD: 27 Vitória · 28 Cachoeiro de Itapemirim (güney ES). Manzara: yamaçlarda kahve (conilon)."
    },
    {
     "id": "mg",
     "name": "Minas Gerais",
     "short": "MG",
     "local": "",
     "cap": "Belo Horizonte",
     "reg": "sudeste",
     "codes": [
      "31",
      "32",
      "33",
      "34",
      "35",
      "37",
      "38"
     ],
     "cue": "Eyalet yolları MG-xxx diye yazılır (örnek: MG-050). Federal yollar: BR-116, BR-153, BR-364, BR-040, BR-050, BR-381. DDD: 31 Belo Horizonte · 32 Juiz de Fora · 33 Governador Valadares (doğu MG) · 34 Uberlândia (Triângulo Mineiro) · 35 Poços de Caldas, Varginha (güney MG) · 37 Divinópolis · 38 Montes Claros (kuzey MG). Manzara: yumuşak tepelerde kahve sıraları."
    },
    {
     "id": "pr",
     "name": "Paraná",
     "short": "PR",
     "local": "",
     "cap": "Curitiba",
     "reg": "sul",
     "codes": [
      "41",
      "42",
      "43",
      "44",
      "45",
      "46"
     ],
     "cue": "Eyalet yolları PR-xxx diye yazılır (örnek: PR-277). Federal yollar: BR-101, BR-116, BR-153, BR-163. DDD: 41 Curitiba · 42 Ponta Grossa · 43 Londrina · 44 Maringá · 45 Cascavel, Foz do Iguaçu · 46 Francisco Beltrão, Pato Branco."
    },
    {
     "id": "sc",
     "name": "Santa Catarina",
     "short": "SC",
     "local": "",
     "cap": "Florianópolis",
     "reg": "sul",
     "codes": [
      "47",
      "48",
      "49"
     ],
     "cue": "Eyalet yolları SC-xxx diye yazılır. Federal yollar: BR-101, BR-116, BR-153, BR-163. DDD: 47 Joinville, Blumenau · 48 Florianópolis · 49 Chapecó, Lages."
    },
    {
     "id": "rs",
     "name": "Rio Grande do Sul",
     "short": "RS",
     "local": "",
     "cap": "Porto Alegre",
     "reg": "sul",
     "codes": [
      "51",
      "53",
      "54",
      "55"
     ],
     "cue": "Eyalet yolları RS-xxx diye yazılır. Federal yollar: BR-101, BR-116, BR-153, BR-163. DDD: 51 Porto Alegre · 53 Pelotas · 54 Caxias do Sul, Passo Fundo · 55 Santa Maria."
    },
    {
     "id": "df",
     "name": "Distrito Federal",
     "short": "DF",
     "local": "",
     "cap": "Brasília",
     "reg": "co",
     "codes": [
      "61"
     ],
     "cue": "Eyalet yolları DF-xxx diye yazılır (örnek: DF-001). Federal yollar: BR-040, BR-050. DDD: 61 Brasília; Goiás'ın Brasília çevresi de 61 kullanır."
    },
    {
     "id": "go",
     "name": "Goiás",
     "short": "GO",
     "local": "",
     "cap": "Goiânia",
     "reg": "co",
     "codes": [
      "62",
      "64",
      "61"
     ],
     "cue": "Eyalet yolları GO-xxx diye yazılır. Federal yollar: BR-153, BR-364, BR-040, BR-050. DDD: 61 Brasília; Goiás'ın Brasília çevresi de 61 kullanır · 62 Goiânia · 64 Rio Verde, güney Goiás. Manzara: dalgalı arazide soya tarlaları."
    },
    {
     "id": "to",
     "name": "Tocantins",
     "short": "TO",
     "local": "",
     "cap": "Palmas",
     "reg": "norte",
     "codes": [
      "63"
     ],
     "cue": "Eyalet yolları TO-xxx diye yazılır. Federal yollar: BR-153. DDD: 63 Tocantins (Palmas)."
    },
    {
     "id": "mt",
     "name": "Mato Grosso",
     "short": "MT",
     "local": "",
     "cap": "Cuiabá",
     "reg": "co",
     "codes": [
      "65",
      "66"
     ],
     "cue": "Eyalet yolları MT-xxx diye yazılır. Federal yollar: BR-163, BR-364. DDD: 65 Cuiabá · 66 Rondonópolis, Sinop. Manzara: ufka kadar düz soya tarlaları."
    },
    {
     "id": "ms",
     "name": "Mato Grosso do Sul",
     "short": "MS",
     "local": "",
     "cap": "Campo Grande",
     "reg": "co",
     "codes": [
      "67"
     ],
     "cue": "Eyalet yolları MS-xxx diye yazılır. Federal yollar: BR-163. DDD: 67 Campo Grande."
    },
    {
     "id": "ac",
     "name": "Acre",
     "short": "AC",
     "local": "",
     "cap": "Rio Branco",
     "reg": "norte",
     "codes": [
      "68"
     ],
     "cue": "Eyalet yolları AC-xxx diye yazılır. Federal yollar: BR-364. DDD: 68 Acre (Rio Branco)."
    },
    {
     "id": "ro",
     "name": "Rondônia",
     "short": "RO",
     "local": "",
     "cap": "Porto Velho",
     "reg": "norte",
     "codes": [
      "69"
     ],
     "cue": "Eyalet yolları RO-xxx diye yazılır. Federal yollar: BR-364. DDD: 69 Rondônia (Porto Velho)."
    },
    {
     "id": "ba",
     "name": "Bahia",
     "short": "BA",
     "local": "",
     "cap": "Salvador",
     "reg": "nordeste",
     "codes": [
      "71",
      "73",
      "74",
      "75",
      "77"
     ],
     "cue": "Eyalet yolları BA-xxx diye yazılır. Federal yollar: BR-101, BR-116. DDD: 71 Salvador · 73 Ilhéus, Porto Seguro (güney Bahia) · 74 Juazeiro (kuzey Bahia) · 75 Feira de Santana · 77 Vitória da Conquista, Barreiras (güneybatı ve batı)."
    },
    {
     "id": "se",
     "name": "Sergipe",
     "short": "SE",
     "local": "",
     "cap": "Aracaju",
     "reg": "nordeste",
     "codes": [
      "79"
     ],
     "cue": "Eyalet yolları SE-xxx diye yazılır. Federal yollar: BR-101. DDD: 79 Sergipe (Aracaju)."
    },
    {
     "id": "pe",
     "name": "Pernambuco",
     "short": "PE",
     "local": "",
     "cap": "Recife",
     "reg": "nordeste",
     "codes": [
      "81",
      "87"
     ],
     "cue": "Eyalet yolları PE-xxx diye yazılır. Federal yollar: BR-101, BR-116. DDD: 81 Recife · 87 Petrolina, Garanhuns (iç Pernambuco)."
    },
    {
     "id": "al",
     "name": "Alagoas",
     "short": "AL",
     "local": "",
     "cap": "Maceió",
     "reg": "nordeste",
     "codes": [
      "82"
     ],
     "cue": "Eyalet yolları AL-xxx diye yazılır. Federal yollar: BR-101. DDD: 82 Alagoas (Maceió)."
    },
    {
     "id": "pb",
     "name": "Paraíba",
     "short": "PB",
     "local": "",
     "cap": "João Pessoa",
     "reg": "nordeste",
     "codes": [
      "83"
     ],
     "cue": "Eyalet yolları PB-xxx diye yazılır. Federal yollar: BR-101. DDD: 83 Paraíba (João Pessoa)."
    },
    {
     "id": "rn",
     "name": "Rio Grande do Norte",
     "short": "RN",
     "local": "",
     "cap": "Natal",
     "reg": "nordeste",
     "codes": [
      "84"
     ],
     "cue": "Eyalet yolları RN-xxx diye yazılır. Federal yollar: BR-101. DDD: 84 Rio Grande do Norte (Natal)."
    },
    {
     "id": "ce",
     "name": "Ceará",
     "short": "CE",
     "local": "",
     "cap": "Fortaleza",
     "reg": "nordeste",
     "codes": [
      "85",
      "88"
     ],
     "cue": "Eyalet yolları CE-xxx diye yazılır. Federal yollar: BR-116. DDD: 85 Fortaleza · 88 Juazeiro do Norte, Sobral (iç Ceará). Manzara: yelpaze yapraklı carnaúba palmiyeleri."
    },
    {
     "id": "pi",
     "name": "Piauí",
     "short": "PI",
     "local": "",
     "cap": "Teresina",
     "reg": "nordeste",
     "codes": [
      "86",
      "89"
     ],
     "cue": "Eyalet yolları PI-xxx diye yazılır. DDD: 86 Teresina · 89 Picos (güney Piauí)."
    },
    {
     "id": "ma",
     "name": "Maranhão",
     "short": "MA",
     "local": "",
     "cap": "São Luís",
     "reg": "nordeste",
     "codes": [
      "98",
      "99"
     ],
     "cue": "Eyalet yolları MA-xxx diye yazılır. DDD: 98 São Luís · 99 Imperatriz, iç Maranhão."
    },
    {
     "id": "pa",
     "name": "Pará",
     "short": "PA",
     "local": "",
     "cap": "Belém",
     "reg": "norte",
     "codes": [
      "91",
      "93",
      "94"
     ],
     "cue": "Eyalet yolları PA-xxx diye yazılır. Federal yollar: BR-153, BR-163. DDD: 91 Belém · 93 Santarém (batı Pará) · 94 Marabá (güneydoğu Pará)."
    },
    {
     "id": "ap",
     "name": "Amapá",
     "short": "AP",
     "local": "",
     "cap": "Macapá",
     "reg": "norte",
     "codes": [
      "96"
     ],
     "cue": "Eyalet yolları AP-xxx diye yazılır. DDD: 96 Amapá (Macapá)."
    },
    {
     "id": "am",
     "name": "Amazonas",
     "short": "AM",
     "local": "",
     "cap": "Manaus",
     "reg": "norte",
     "codes": [
      "92",
      "97"
     ],
     "cue": "Eyalet yolları AM-xxx diye yazılır. Federal yollar: BR-174. DDD: 92 Manaus · 97 Tefé, Coari (iç Amazonas)."
    },
    {
     "id": "rr",
     "name": "Roraima",
     "short": "RR",
     "local": "",
     "cap": "Boa Vista",
     "reg": "norte",
     "codes": [
      "95"
     ],
     "cue": "Eyalet yolları RR-xxx diye yazılır. Federal yollar: BR-174. DDD: 95 Roraima (Boa Vista)."
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
     "title": "Yol levhası: eyalet öneki ve BR numarası",
     "lead": "Brezilya'da yol numarası levhası iki türdür. Eyalet yolu iki harfle başlar ve harfler eyaletin kısaltmasıdır (SP-310 → São Paulo). BR ile başlayan yollar federal yollardır, birden çok eyaletten geçer; ama numarası da yön ve konum verir.",
     "desc": "SP-310, MG-050, BR-116… Levhadaki önekten eyaleti bul.",
     "decoder": {
      "title": "Yol öneki ya da numarası",
      "placeholder": "Örn. SP, MG, BR-101, 116…",
      "hint": "Levhada gördüğün iki harfi (SP, MG…) ya da BR numarasını yaz; eyalet ya da geçtiği eyaletler boyanır.",
      "quizPrompt": "Bu yol hangi eyalette?",
      "noHit": "Bu yol listede yok. Eyalet kısaltmalarının hepsi var; federal yollardan yalnız büyükler.",
      "entries": [
       {
        "key": "SP",
        "label": "SP-xxx · São Paulo eyalet yolu",
        "sub": "",
        "keys": [
         "sp",
         "SP-",
         "São Paulo"
        ],
        "ids": [
         "sp"
        ],
        "main": "SP-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "RJ",
        "label": "RJ-xxx · Rio de Janeiro eyalet yolu",
        "sub": "",
        "keys": [
         "rj",
         "RJ-",
         "Rio de Janeiro"
        ],
        "ids": [
         "rj"
        ],
        "main": "RJ-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "ES",
        "label": "ES-xxx · Espírito Santo eyalet yolu",
        "sub": "",
        "keys": [
         "es",
         "ES-",
         "Espírito Santo"
        ],
        "ids": [
         "es"
        ],
        "main": "ES-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "MG",
        "label": "MG-xxx · Minas Gerais eyalet yolu",
        "sub": "",
        "keys": [
         "mg",
         "MG-",
         "Minas Gerais"
        ],
        "ids": [
         "mg"
        ],
        "main": "MG-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "PR",
        "label": "PR-xxx · Paraná eyalet yolu",
        "sub": "",
        "keys": [
         "pr",
         "PR-",
         "Paraná"
        ],
        "ids": [
         "pr"
        ],
        "main": "PR-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "SC",
        "label": "SC-xxx · Santa Catarina eyalet yolu",
        "sub": "",
        "keys": [
         "sc",
         "SC-",
         "Santa Catarina"
        ],
        "ids": [
         "sc"
        ],
        "main": "SC-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "RS",
        "label": "RS-xxx · Rio Grande do Sul eyalet yolu",
        "sub": "",
        "keys": [
         "rs",
         "RS-",
         "Rio Grande do Sul"
        ],
        "ids": [
         "rs"
        ],
        "main": "RS-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "DF",
        "label": "DF-xxx · Distrito Federal eyalet yolu",
        "sub": "",
        "keys": [
         "df",
         "DF-",
         "Distrito Federal"
        ],
        "ids": [
         "df"
        ],
        "main": "DF-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "GO",
        "label": "GO-xxx · Goiás eyalet yolu",
        "sub": "",
        "keys": [
         "go",
         "GO-",
         "Goiás"
        ],
        "ids": [
         "go"
        ],
        "main": "GO-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "TO",
        "label": "TO-xxx · Tocantins eyalet yolu",
        "sub": "",
        "keys": [
         "to",
         "TO-",
         "Tocantins"
        ],
        "ids": [
         "to"
        ],
        "main": "TO-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "MT",
        "label": "MT-xxx · Mato Grosso eyalet yolu",
        "sub": "",
        "keys": [
         "mt",
         "MT-",
         "Mato Grosso"
        ],
        "ids": [
         "mt"
        ],
        "main": "MT-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "MS",
        "label": "MS-xxx · Mato Grosso do Sul eyalet yolu",
        "sub": "",
        "keys": [
         "ms",
         "MS-",
         "Mato Grosso do Sul"
        ],
        "ids": [
         "ms"
        ],
        "main": "MS-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "AC",
        "label": "AC-xxx · Acre eyalet yolu",
        "sub": "",
        "keys": [
         "ac",
         "AC-",
         "Acre"
        ],
        "ids": [
         "ac"
        ],
        "main": "AC-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "RO",
        "label": "RO-xxx · Rondônia eyalet yolu",
        "sub": "",
        "keys": [
         "ro",
         "RO-",
         "Rondônia"
        ],
        "ids": [
         "ro"
        ],
        "main": "RO-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "BA",
        "label": "BA-xxx · Bahia eyalet yolu",
        "sub": "",
        "keys": [
         "ba",
         "BA-",
         "Bahia"
        ],
        "ids": [
         "ba"
        ],
        "main": "BA-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "SE",
        "label": "SE-xxx · Sergipe eyalet yolu",
        "sub": "",
        "keys": [
         "se",
         "SE-",
         "Sergipe"
        ],
        "ids": [
         "se"
        ],
        "main": "SE-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "PE",
        "label": "PE-xxx · Pernambuco eyalet yolu",
        "sub": "",
        "keys": [
         "pe",
         "PE-",
         "Pernambuco"
        ],
        "ids": [
         "pe"
        ],
        "main": "PE-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "AL",
        "label": "AL-xxx · Alagoas eyalet yolu",
        "sub": "",
        "keys": [
         "al",
         "AL-",
         "Alagoas"
        ],
        "ids": [
         "al"
        ],
        "main": "AL-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "PB",
        "label": "PB-xxx · Paraíba eyalet yolu",
        "sub": "",
        "keys": [
         "pb",
         "PB-",
         "Paraíba"
        ],
        "ids": [
         "pb"
        ],
        "main": "PB-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "RN",
        "label": "RN-xxx · Rio Grande do Norte eyalet yolu",
        "sub": "",
        "keys": [
         "rn",
         "RN-",
         "Rio Grande do Norte"
        ],
        "ids": [
         "rn"
        ],
        "main": "RN-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "CE",
        "label": "CE-xxx · Ceará eyalet yolu",
        "sub": "",
        "keys": [
         "ce",
         "CE-",
         "Ceará"
        ],
        "ids": [
         "ce"
        ],
        "main": "CE-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "PI",
        "label": "PI-xxx · Piauí eyalet yolu",
        "sub": "",
        "keys": [
         "pi",
         "PI-",
         "Piauí"
        ],
        "ids": [
         "pi"
        ],
        "main": "PI-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "MA",
        "label": "MA-xxx · Maranhão eyalet yolu",
        "sub": "",
        "keys": [
         "ma",
         "MA-",
         "Maranhão"
        ],
        "ids": [
         "ma"
        ],
        "main": "MA-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "PA",
        "label": "PA-xxx · Pará eyalet yolu",
        "sub": "",
        "keys": [
         "pa",
         "PA-",
         "Pará"
        ],
        "ids": [
         "pa"
        ],
        "main": "PA-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "AP",
        "label": "AP-xxx · Amapá eyalet yolu",
        "sub": "",
        "keys": [
         "ap",
         "AP-",
         "Amapá"
        ],
        "ids": [
         "ap"
        ],
        "main": "AP-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "AM",
        "label": "AM-xxx · Amazonas eyalet yolu",
        "sub": "",
        "keys": [
         "am",
         "AM-",
         "Amazonas"
        ],
        "ids": [
         "am"
        ],
        "main": "AM-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "RR",
        "label": "RR-xxx · Roraima eyalet yolu",
        "sub": "",
        "keys": [
         "rr",
         "RR-",
         "Roraima"
        ],
        "ids": [
         "rr"
        ],
        "main": "RR-xxx",
        "prompt": "Bu yol önekli eyalet yolu hangi eyalete ait?"
       },
       {
        "key": "BR-101",
        "label": "BR-101 · Kıyı yolu: Touros (RN) → São José do Norte (RS)",
        "sub": "12 eyaletten geçer; neredeyse tüm doğu kıyısını izler.",
        "keys": [
         "BR101",
         "br-101",
         "101"
        ],
        "ids": [
         "rn",
         "pb",
         "pe",
         "al",
         "se",
         "ba",
         "es",
         "rj",
         "sp",
         "pr",
         "sc",
         "rs"
        ],
        "main": "BR-101",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-116",
        "label": "BR-116 · Fortaleza (CE) → Jaguarão (RS)",
        "sub": "São Paulo–Rio arasında «Via Dutra», São Paulo–Curitiba arasında «Régis Bittencourt» adını alır.",
        "keys": [
         "BR116",
         "br-116",
         "116"
        ],
        "ids": [
         "ce",
         "pe",
         "ba",
         "mg",
         "rj",
         "sp",
         "pr",
         "sc",
         "rs"
        ],
        "main": "BR-116",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-153",
        "label": "BR-153 · Marabá (PA) → Aceguá (RS)",
        "sub": "Transbrasiliana: Belém–Brasília yolunun güneyde devamı.",
        "keys": [
         "BR153",
         "br-153",
         "153"
        ],
        "ids": [
         "pa",
         "to",
         "go",
         "mg",
         "sp",
         "pr",
         "sc",
         "rs"
        ],
        "main": "BR-153",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-163",
        "label": "BR-163 · Santarém (PA) → Tenente Portela (RS)",
        "sub": "Cuiabá–Santarém yolu bu yoldur.",
        "keys": [
         "BR163",
         "br-163",
         "163"
        ],
        "ids": [
         "pa",
         "mt",
         "ms",
         "pr",
         "sc",
         "rs"
        ],
        "main": "BR-163",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-364",
        "label": "BR-364 · Limeira (SP) → Acre",
        "sub": "Batıya, Rondônia ve Acre'ye giden ana yol.",
        "keys": [
         "BR364",
         "br-364",
         "364"
        ],
        "ids": [
         "sp",
         "mg",
         "go",
         "mt",
         "ro",
         "ac"
        ],
        "main": "BR-364",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-174",
        "label": "BR-174 · Manaus (AM) → Boa Vista (RR)",
        "sub": "Amazonas'ı Roraima'ya ve Venezuela sınırına bağlar.",
        "keys": [
         "BR174",
         "br-174",
         "174"
        ],
        "ids": [
         "am",
         "rr"
        ],
        "main": "BR-174",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-040",
        "label": "BR-040 · Brasília → Rio de Janeiro",
        "sub": "Brasília'dan çıkan «radyal» yollardan biri.",
        "keys": [
         "BR040",
         "br-040",
         "040"
        ],
        "ids": [
         "df",
         "go",
         "mg",
         "rj"
        ],
        "main": "BR-040",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-050",
        "label": "BR-050 · Brasília → Santos",
        "sub": "Brasília'dan São Paulo yönüne giden radyal yol.",
        "keys": [
         "BR050",
         "br-050",
         "050"
        ],
        "ids": [
         "df",
         "go",
         "mg",
         "sp"
        ],
        "main": "BR-050",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       },
       {
        "key": "BR-381",
        "label": "BR-381 · São Mateus (ES) → São Paulo",
        "sub": "Çapraz (diyagonal) yol; Minas Gerais'te kalabalık bir bölümü vardır.",
        "keys": [
         "BR381",
         "br-381",
         "381"
        ],
        "ids": [
         "es",
         "mg",
         "sp"
        ],
        "main": "BR-381",
        "prompt": "Bu federal yol hangi eyaletlerden geçer? (Herhangi birine dokun)"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce harfe bak",
       "body": "İki harf (SP-310, MG-050, PR-445…) = eyalet yolu; harfler doğrudan o eyaletin kısaltmasıdır. BR = federal yol; birden çok eyaletten geçer ve numarası bir şey söyler."
      },
      {
       "title": "BR numarasının ilk rakamı yönü verir",
       "body": "0xx: Brasília'dan çıkan yollar. 1xx: kuzey–güney yönünde giden yollar. 2xx: doğu–batı yönünde giden yollar. 3xx: çapraz yollar. 4xx: bağlantı yolları."
      },
      {
       "title": "Son iki rakam konumu verir",
       "body": "1xx yollarda sayı doğudan batıya büyür: 100 ülkenin en doğusu, 150 Brasília'nın boylamı, 199 en batı. Yani BR-101 kıyıda, BR-116 hemen içeride, BR-153 Brasília civarında, BR-163 daha batıda, BR-174 Amazonas'ta. 2xx yollarda sayı kuzeyden güneye büyür: 200 en kuzey, 250 Brasília'nın enlemi, 299 en güney."
      },
      {
       "title": "Kilometre levhasına bak",
       "body": "Brezilya'da yol numarasını en sık küçük mavi kilometre levhasından okursun: üstte yol kodu (BR-485 ya da MG-184 gibi), altta km sayısı. Yol kodunu görünce yukarıdaki listeden hangi eyaletlerden geçtiğine bak."
      }
     ],
     "bandsTitle": "Eyalet kısaltmaları",
     "bandsHint": "dokun → eyaletler boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "SDE",
       "title": "Güneydoğu",
       "sub": "SP-, RJ-, MG-, ES- öneki.",
       "ids": [
        "sp",
        "rj",
        "mg",
        "es"
       ]
      },
      {
       "cls": "q2",
       "key": "SUL",
       "title": "Güney",
       "sub": "PR-, SC-, RS- öneki.",
       "ids": [
        "pr",
        "sc",
        "rs"
       ]
      },
      {
       "cls": "q7",
       "key": "ORB",
       "title": "Orta-Batı",
       "sub": "DF-, GO-, MT-, MS- öneki.",
       "ids": [
        "df",
        "go",
        "mt",
        "ms"
       ]
      },
      {
       "cls": "q5",
       "key": "KDE",
       "title": "Kuzeydoğu",
       "sub": "BA-, SE-, AL-, PE-, PB-, RN-, CE-, PI-, MA- öneki.",
       "ids": [
        "ba",
        "se",
        "al",
        "pe",
        "pb",
        "rn",
        "ce",
        "pi",
        "ma"
       ]
      },
      {
       "cls": "q4",
       "key": "KZY",
       "title": "Kuzey",
       "sub": "AM-, RR-, AP-, PA-, TO-, RO-, AC- öneki.",
       "ids": [
        "am",
        "rr",
        "ap",
        "pa",
        "to",
        "ro",
        "ac"
       ]
      }
     ],
     "rulesTitle": "Karışanlar",
     "rules": [
      {
       "title": "BR-101 mi, BR-116 mı?",
       "ids": [
        "rn",
        "pb",
        "pe",
        "al",
        "se",
        "ba",
        "es",
        "rj",
        "sp",
        "pr",
        "sc",
        "rs",
        "ce",
        "mg"
       ],
       "body": "İkisi de güneyde Rio Grande do Sul'a iner. BR-101 kıyıyı izler ve Rio Grande do Norte'den başlar. BR-116 Ceará'dan başlar ve iç kesimden, Minas Gerais'ten geçer. Minas Gerais'te 116 var, 101 yok; Rio Grande do Norte, Paraíba, Alagoas, Sergipe ve Espírito Santo'da ise 101 var, 116 yok.",
       "traps": [
        [
         "RN, PB, AL, SE, ES",
         "yalnız BR-101"
        ],
        [
         "CE, MG",
         "yalnız BR-116"
        ],
        [
         "PE, BA, RJ, SP, PR, SC, RS",
         "ikisi de"
        ]
       ]
      }
     ],
     "visuals": [
      {
       "id": "br-km",
       "title": "Kilometre levhası: yol kodu ve km",
       "badge": "Fotoğraf",
       "set": "br-km",
       "ids": [
        "rj",
        "mg"
       ],
       "sub": "Mavi levha: üstte yol kodu, altta kilometre. Fotoğraflar BR-485 (Itatiaia, Rio de Janeiro) ve BR-460 (Carmo de Minas, Minas Gerais).",
       "tags": [
        "BR-485",
        "km",
        "mavi levha"
       ],
       "quiz": false
      }
     ],
     "visualsTitle": "Kilometre levhası "
    },
    {
     "key": "ddd",
     "navLabel": "DDD",
     "icon": "phone",
     "drillPreset": "code",
     "mapMode": "code",
     "labelMode": "code",
     "title": "DDD: duvardaki telefon numarası",
     "lead": "Brezilya'da duvar yazıları, kamyon arkaları ve dükkân tabelalarında telefon numarası çok yaygındır: (19) 98765-4321. Parantez içindeki iki rakam DDD, yani bölge kodudur ve eyaleti (çoğu zaman şehri) söyler. İlk rakam bölgeyi verdiği için kodu ezberlemeden de daraltabilirsin.",
     "desc": "(11), (31), (85)… Telefon kodundan eyaleti bul.",
     "decoder": {
      "title": "DDD (bölge kodu)",
      "placeholder": "Örn. 11, 31, 85…",
      "hint": "Numaradaki parantez içi kodu yaz: kod hangi eyalete aitse boyanır, yanında hangi şehirlerin olduğu yazar.",
      "quizPrompt": "Bu kod hangi eyalete ait?",
      "noHit": "Bu kod listede yok. Brezilya'da 67 DDD var; hepsi bu listede.",
      "entries": [
       {
        "key": "11",
        "label": "11 → São Paulo · Grande São Paulo",
        "sub": "",
        "keys": [
         "(11)",
         "011"
        ],
        "ids": [
         "sp"
        ],
        "main": "(11)",
        "quiz": false
       },
       {
        "key": "12",
        "label": "12 → São Paulo · Vale do Paraíba, kuzey kıyı (São José dos Campos)",
        "sub": "",
        "keys": [
         "(12)",
         "012"
        ],
        "ids": [
         "sp"
        ],
        "main": "(12)",
        "quiz": false
       },
       {
        "key": "13",
        "label": "13 → São Paulo · Baixada Santista (Santos)",
        "sub": "",
        "keys": [
         "(13)",
         "013"
        ],
        "ids": [
         "sp"
        ],
        "main": "(13)",
        "quiz": false
       },
       {
        "key": "14",
        "label": "14 → São Paulo · Bauru, Marília",
        "sub": "",
        "keys": [
         "(14)",
         "014"
        ],
        "ids": [
         "sp"
        ],
        "main": "(14)",
        "quiz": false
       },
       {
        "key": "15",
        "label": "15 → São Paulo · Sorocaba",
        "sub": "",
        "keys": [
         "(15)",
         "015"
        ],
        "ids": [
         "sp"
        ],
        "main": "(15)",
        "quiz": false
       },
       {
        "key": "16",
        "label": "16 → São Paulo · Ribeirão Preto, Araraquara",
        "sub": "",
        "keys": [
         "(16)",
         "016"
        ],
        "ids": [
         "sp"
        ],
        "main": "(16)",
        "quiz": false
       },
       {
        "key": "17",
        "label": "17 → São Paulo · São José do Rio Preto",
        "sub": "",
        "keys": [
         "(17)",
         "017"
        ],
        "ids": [
         "sp"
        ],
        "main": "(17)",
        "quiz": false
       },
       {
        "key": "18",
        "label": "18 → São Paulo · Presidente Prudente, Araçatuba",
        "sub": "",
        "keys": [
         "(18)",
         "018"
        ],
        "ids": [
         "sp"
        ],
        "main": "(18)",
        "quiz": false
       },
       {
        "key": "19",
        "label": "19 → São Paulo · Campinas",
        "sub": "",
        "keys": [
         "(19)",
         "019"
        ],
        "ids": [
         "sp"
        ],
        "main": "(19)",
        "quiz": false
       },
       {
        "key": "21",
        "label": "21 → Rio de Janeiro · Rio de Janeiro şehri ve çevresi",
        "sub": "",
        "keys": [
         "(21)",
         "021"
        ],
        "ids": [
         "rj"
        ],
        "main": "(21)",
        "quiz": false
       },
       {
        "key": "22",
        "label": "22 → Rio de Janeiro · Campos dos Goytacazes, Cabo Frio",
        "sub": "",
        "keys": [
         "(22)",
         "022"
        ],
        "ids": [
         "rj"
        ],
        "main": "(22)",
        "quiz": false
       },
       {
        "key": "24",
        "label": "24 → Rio de Janeiro · Volta Redonda, Petrópolis",
        "sub": "",
        "keys": [
         "(24)",
         "024"
        ],
        "ids": [
         "rj"
        ],
        "main": "(24)",
        "quiz": false
       },
       {
        "key": "27",
        "label": "27 → Espírito Santo · Vitória",
        "sub": "",
        "keys": [
         "(27)",
         "027"
        ],
        "ids": [
         "es"
        ],
        "main": "(27)",
        "quiz": false
       },
       {
        "key": "28",
        "label": "28 → Espírito Santo · Cachoeiro de Itapemirim (güney ES)",
        "sub": "",
        "keys": [
         "(28)",
         "028"
        ],
        "ids": [
         "es"
        ],
        "main": "(28)",
        "quiz": false
       },
       {
        "key": "31",
        "label": "31 → Minas Gerais · Belo Horizonte",
        "sub": "",
        "keys": [
         "(31)",
         "031"
        ],
        "ids": [
         "mg"
        ],
        "main": "(31)",
        "quiz": false
       },
       {
        "key": "32",
        "label": "32 → Minas Gerais · Juiz de Fora",
        "sub": "",
        "keys": [
         "(32)",
         "032"
        ],
        "ids": [
         "mg"
        ],
        "main": "(32)",
        "quiz": false
       },
       {
        "key": "33",
        "label": "33 → Minas Gerais · Governador Valadares (doğu MG)",
        "sub": "",
        "keys": [
         "(33)",
         "033"
        ],
        "ids": [
         "mg"
        ],
        "main": "(33)",
        "quiz": false
       },
       {
        "key": "34",
        "label": "34 → Minas Gerais · Uberlândia (Triângulo Mineiro)",
        "sub": "",
        "keys": [
         "(34)",
         "034"
        ],
        "ids": [
         "mg"
        ],
        "main": "(34)",
        "quiz": false
       },
       {
        "key": "35",
        "label": "35 → Minas Gerais · Poços de Caldas, Varginha (güney MG)",
        "sub": "",
        "keys": [
         "(35)",
         "035"
        ],
        "ids": [
         "mg"
        ],
        "main": "(35)",
        "quiz": false
       },
       {
        "key": "37",
        "label": "37 → Minas Gerais · Divinópolis",
        "sub": "",
        "keys": [
         "(37)",
         "037"
        ],
        "ids": [
         "mg"
        ],
        "main": "(37)",
        "quiz": false
       },
       {
        "key": "38",
        "label": "38 → Minas Gerais · Montes Claros (kuzey MG)",
        "sub": "",
        "keys": [
         "(38)",
         "038"
        ],
        "ids": [
         "mg"
        ],
        "main": "(38)",
        "quiz": false
       },
       {
        "key": "41",
        "label": "41 → Paraná · Curitiba",
        "sub": "",
        "keys": [
         "(41)",
         "041"
        ],
        "ids": [
         "pr"
        ],
        "main": "(41)",
        "quiz": false
       },
       {
        "key": "42",
        "label": "42 → Paraná · Ponta Grossa",
        "sub": "",
        "keys": [
         "(42)",
         "042"
        ],
        "ids": [
         "pr"
        ],
        "main": "(42)",
        "quiz": false
       },
       {
        "key": "43",
        "label": "43 → Paraná · Londrina",
        "sub": "",
        "keys": [
         "(43)",
         "043"
        ],
        "ids": [
         "pr"
        ],
        "main": "(43)",
        "quiz": false
       },
       {
        "key": "44",
        "label": "44 → Paraná · Maringá",
        "sub": "",
        "keys": [
         "(44)",
         "044"
        ],
        "ids": [
         "pr"
        ],
        "main": "(44)",
        "quiz": false
       },
       {
        "key": "45",
        "label": "45 → Paraná · Cascavel, Foz do Iguaçu",
        "sub": "",
        "keys": [
         "(45)",
         "045"
        ],
        "ids": [
         "pr"
        ],
        "main": "(45)",
        "quiz": false
       },
       {
        "key": "46",
        "label": "46 → Paraná · Francisco Beltrão, Pato Branco",
        "sub": "",
        "keys": [
         "(46)",
         "046"
        ],
        "ids": [
         "pr"
        ],
        "main": "(46)",
        "quiz": false
       },
       {
        "key": "47",
        "label": "47 → Santa Catarina · Joinville, Blumenau",
        "sub": "",
        "keys": [
         "(47)",
         "047"
        ],
        "ids": [
         "sc"
        ],
        "main": "(47)",
        "quiz": false
       },
       {
        "key": "48",
        "label": "48 → Santa Catarina · Florianópolis",
        "sub": "",
        "keys": [
         "(48)",
         "048"
        ],
        "ids": [
         "sc"
        ],
        "main": "(48)",
        "quiz": false
       },
       {
        "key": "49",
        "label": "49 → Santa Catarina · Chapecó, Lages",
        "sub": "",
        "keys": [
         "(49)",
         "049"
        ],
        "ids": [
         "sc"
        ],
        "main": "(49)",
        "quiz": false
       },
       {
        "key": "51",
        "label": "51 → Rio Grande do Sul · Porto Alegre",
        "sub": "",
        "keys": [
         "(51)",
         "051"
        ],
        "ids": [
         "rs"
        ],
        "main": "(51)",
        "quiz": false
       },
       {
        "key": "53",
        "label": "53 → Rio Grande do Sul · Pelotas",
        "sub": "",
        "keys": [
         "(53)",
         "053"
        ],
        "ids": [
         "rs"
        ],
        "main": "(53)",
        "quiz": false
       },
       {
        "key": "54",
        "label": "54 → Rio Grande do Sul · Caxias do Sul, Passo Fundo",
        "sub": "",
        "keys": [
         "(54)",
         "054"
        ],
        "ids": [
         "rs"
        ],
        "main": "(54)",
        "quiz": false
       },
       {
        "key": "55",
        "label": "55 → Rio Grande do Sul · Santa Maria",
        "sub": "",
        "keys": [
         "(55)",
         "055"
        ],
        "ids": [
         "rs"
        ],
        "main": "(55)",
        "quiz": false
       },
       {
        "key": "61",
        "label": "61 → Distrito Federal, Goiás · Brasília; Goiás'ın Brasília çevresi de 61 kullanır",
        "sub": "",
        "keys": [
         "(61)",
         "061"
        ],
        "ids": [
         "df",
         "go"
        ],
        "main": "(61)",
        "quiz": false
       },
       {
        "key": "62",
        "label": "62 → Goiás · Goiânia",
        "sub": "",
        "keys": [
         "(62)",
         "062"
        ],
        "ids": [
         "go"
        ],
        "main": "(62)",
        "quiz": false
       },
       {
        "key": "63",
        "label": "63 → Tocantins · Tocantins (Palmas)",
        "sub": "",
        "keys": [
         "(63)",
         "063"
        ],
        "ids": [
         "to"
        ],
        "main": "(63)",
        "quiz": false
       },
       {
        "key": "64",
        "label": "64 → Goiás · Rio Verde, güney Goiás",
        "sub": "",
        "keys": [
         "(64)",
         "064"
        ],
        "ids": [
         "go"
        ],
        "main": "(64)",
        "quiz": false
       },
       {
        "key": "65",
        "label": "65 → Mato Grosso · Cuiabá",
        "sub": "",
        "keys": [
         "(65)",
         "065"
        ],
        "ids": [
         "mt"
        ],
        "main": "(65)",
        "quiz": false
       },
       {
        "key": "66",
        "label": "66 → Mato Grosso · Rondonópolis, Sinop",
        "sub": "",
        "keys": [
         "(66)",
         "066"
        ],
        "ids": [
         "mt"
        ],
        "main": "(66)",
        "quiz": false
       },
       {
        "key": "67",
        "label": "67 → Mato Grosso do Sul · Campo Grande",
        "sub": "",
        "keys": [
         "(67)",
         "067"
        ],
        "ids": [
         "ms"
        ],
        "main": "(67)",
        "quiz": false
       },
       {
        "key": "68",
        "label": "68 → Acre · Acre (Rio Branco)",
        "sub": "",
        "keys": [
         "(68)",
         "068"
        ],
        "ids": [
         "ac"
        ],
        "main": "(68)",
        "quiz": false
       },
       {
        "key": "69",
        "label": "69 → Rondônia · Rondônia (Porto Velho)",
        "sub": "",
        "keys": [
         "(69)",
         "069"
        ],
        "ids": [
         "ro"
        ],
        "main": "(69)",
        "quiz": false
       },
       {
        "key": "71",
        "label": "71 → Bahia · Salvador",
        "sub": "",
        "keys": [
         "(71)",
         "071"
        ],
        "ids": [
         "ba"
        ],
        "main": "(71)",
        "quiz": false
       },
       {
        "key": "73",
        "label": "73 → Bahia · Ilhéus, Porto Seguro (güney Bahia)",
        "sub": "",
        "keys": [
         "(73)",
         "073"
        ],
        "ids": [
         "ba"
        ],
        "main": "(73)",
        "quiz": false
       },
       {
        "key": "74",
        "label": "74 → Bahia · Juazeiro (kuzey Bahia)",
        "sub": "",
        "keys": [
         "(74)",
         "074"
        ],
        "ids": [
         "ba"
        ],
        "main": "(74)",
        "quiz": false
       },
       {
        "key": "75",
        "label": "75 → Bahia · Feira de Santana",
        "sub": "",
        "keys": [
         "(75)",
         "075"
        ],
        "ids": [
         "ba"
        ],
        "main": "(75)",
        "quiz": false
       },
       {
        "key": "77",
        "label": "77 → Bahia · Vitória da Conquista, Barreiras (güneybatı ve batı)",
        "sub": "",
        "keys": [
         "(77)",
         "077"
        ],
        "ids": [
         "ba"
        ],
        "main": "(77)",
        "quiz": false
       },
       {
        "key": "79",
        "label": "79 → Sergipe · Sergipe (Aracaju)",
        "sub": "",
        "keys": [
         "(79)",
         "079"
        ],
        "ids": [
         "se"
        ],
        "main": "(79)",
        "quiz": false
       },
       {
        "key": "81",
        "label": "81 → Pernambuco · Recife",
        "sub": "",
        "keys": [
         "(81)",
         "081"
        ],
        "ids": [
         "pe"
        ],
        "main": "(81)",
        "quiz": false
       },
       {
        "key": "82",
        "label": "82 → Alagoas · Alagoas (Maceió)",
        "sub": "",
        "keys": [
         "(82)",
         "082"
        ],
        "ids": [
         "al"
        ],
        "main": "(82)",
        "quiz": false
       },
       {
        "key": "83",
        "label": "83 → Paraíba · Paraíba (João Pessoa)",
        "sub": "",
        "keys": [
         "(83)",
         "083"
        ],
        "ids": [
         "pb"
        ],
        "main": "(83)",
        "quiz": false
       },
       {
        "key": "84",
        "label": "84 → Rio Grande do Norte · Rio Grande do Norte (Natal)",
        "sub": "",
        "keys": [
         "(84)",
         "084"
        ],
        "ids": [
         "rn"
        ],
        "main": "(84)",
        "quiz": false
       },
       {
        "key": "85",
        "label": "85 → Ceará · Fortaleza",
        "sub": "",
        "keys": [
         "(85)",
         "085"
        ],
        "ids": [
         "ce"
        ],
        "main": "(85)",
        "quiz": false
       },
       {
        "key": "86",
        "label": "86 → Piauí · Teresina",
        "sub": "",
        "keys": [
         "(86)",
         "086"
        ],
        "ids": [
         "pi"
        ],
        "main": "(86)",
        "quiz": false
       },
       {
        "key": "87",
        "label": "87 → Pernambuco · Petrolina, Garanhuns (iç Pernambuco)",
        "sub": "",
        "keys": [
         "(87)",
         "087"
        ],
        "ids": [
         "pe"
        ],
        "main": "(87)",
        "quiz": false
       },
       {
        "key": "88",
        "label": "88 → Ceará · Juazeiro do Norte, Sobral (iç Ceará)",
        "sub": "",
        "keys": [
         "(88)",
         "088"
        ],
        "ids": [
         "ce"
        ],
        "main": "(88)",
        "quiz": false
       },
       {
        "key": "89",
        "label": "89 → Piauí · Picos (güney Piauí)",
        "sub": "",
        "keys": [
         "(89)",
         "089"
        ],
        "ids": [
         "pi"
        ],
        "main": "(89)",
        "quiz": false
       },
       {
        "key": "91",
        "label": "91 → Pará · Belém",
        "sub": "",
        "keys": [
         "(91)",
         "091"
        ],
        "ids": [
         "pa"
        ],
        "main": "(91)",
        "quiz": false
       },
       {
        "key": "92",
        "label": "92 → Amazonas · Manaus",
        "sub": "",
        "keys": [
         "(92)",
         "092"
        ],
        "ids": [
         "am"
        ],
        "main": "(92)",
        "quiz": false
       },
       {
        "key": "93",
        "label": "93 → Pará · Santarém (batı Pará)",
        "sub": "",
        "keys": [
         "(93)",
         "093"
        ],
        "ids": [
         "pa"
        ],
        "main": "(93)",
        "quiz": false
       },
       {
        "key": "94",
        "label": "94 → Pará · Marabá (güneydoğu Pará)",
        "sub": "",
        "keys": [
         "(94)",
         "094"
        ],
        "ids": [
         "pa"
        ],
        "main": "(94)",
        "quiz": false
       },
       {
        "key": "95",
        "label": "95 → Roraima · Roraima (Boa Vista)",
        "sub": "",
        "keys": [
         "(95)",
         "095"
        ],
        "ids": [
         "rr"
        ],
        "main": "(95)",
        "quiz": false
       },
       {
        "key": "96",
        "label": "96 → Amapá · Amapá (Macapá)",
        "sub": "",
        "keys": [
         "(96)",
         "096"
        ],
        "ids": [
         "ap"
        ],
        "main": "(96)",
        "quiz": false
       },
       {
        "key": "97",
        "label": "97 → Amazonas · Tefé, Coari (iç Amazonas)",
        "sub": "",
        "keys": [
         "(97)",
         "097"
        ],
        "ids": [
         "am"
        ],
        "main": "(97)",
        "quiz": false
       },
       {
        "key": "98",
        "label": "98 → Maranhão · São Luís",
        "sub": "",
        "keys": [
         "(98)",
         "098"
        ],
        "ids": [
         "ma"
        ],
        "main": "(98)",
        "quiz": false
       },
       {
        "key": "99",
        "label": "99 → Maranhão · Imperatriz, iç Maranhão",
        "sub": "",
        "keys": [
         "(99)",
         "099"
        ],
        "ids": [
         "ma"
        ],
        "main": "(99)",
        "quiz": false
       }
      ]
     },
     "flows": [
      {
       "title": "Parantezi bul",
       "body": "Numara (19) 98765-4321 gibi yazılır. Parantez içindeki iki rakam DDD'dir. Dükkân sabit hat numaralarında 8 hane, cep numaralarında 9 hane vardır; cep numarası her zaman 9 ile başlar. O 9 kodun parçası değildir."
      },
      {
       "title": "İlk rakam bölgeyi verir",
       "body": "1 → São Paulo. 2 → Rio ve Espírito Santo. 3 → Minas Gerais. 4 → Paraná ve Santa Catarina. 5 → Rio Grande do Sul. 6 → Orta-Batı ve batı. 7 → Bahia ve Sergipe. 8 → Kuzeydoğu. 9 → Kuzey ve Maranhão."
      },
      {
       "title": "Aşağıdaki listeyi kullan",
       "body": "Her kodun yanında hangi şehirleri kapsadığı yazar. São Paulo eyaletinde 11 dışındaki kodlar iç kesim ve kıyı şehirleridir."
      }
     ],
     "bandsTitle": "İlk rakama göre",
     "bandsHint": "dokun → eyaletler boyanır",
     "bands": [
      {
       "cls": "q0",
       "key": "1x",
       "title": "São Paulo eyaleti",
       "sub": "11 başkent bölgesi; 12–19 iç kesim ve kıyı.",
       "ids": [
        "sp"
       ]
      },
      {
       "cls": "q1",
       "key": "2x",
       "title": "Rio de Janeiro ve Espírito Santo",
       "sub": "21, 22, 24 → RJ; 27, 28 → ES.",
       "ids": [
        "rj",
        "es"
       ]
      },
      {
       "cls": "q2",
       "key": "3x",
       "title": "Minas Gerais",
       "sub": "31–35, 37, 38.",
       "ids": [
        "mg"
       ]
      },
      {
       "cls": "q3",
       "key": "4x",
       "title": "Paraná ve Santa Catarina",
       "sub": "41–46 → PR; 47–49 → SC.",
       "ids": [
        "pr",
        "sc"
       ]
      },
      {
       "cls": "q4",
       "key": "5x",
       "title": "Rio Grande do Sul",
       "sub": "51, 53, 54, 55.",
       "ids": [
        "rs"
       ]
      },
      {
       "cls": "q5",
       "key": "6x",
       "title": "Orta-Batı + Tocantins, Acre, Rondônia",
       "sub": "61 DF · 62, 64 GO · 63 TO · 65, 66 MT · 67 MS · 68 AC · 69 RO.",
       "ids": [
        "df",
        "go",
        "to",
        "mt",
        "ms",
        "ac",
        "ro"
       ]
      },
      {
       "cls": "q6",
       "key": "7x",
       "title": "Bahia ve Sergipe",
       "sub": "71, 73, 74, 75, 77 → BA; 79 → SE.",
       "ids": [
        "ba",
        "se"
       ]
      },
      {
       "cls": "q7",
       "key": "8x",
       "title": "Kuzeydoğu (geri kalanı)",
       "sub": "81, 87 PE · 82 AL · 83 PB · 84 RN · 85, 88 CE · 86, 89 PI.",
       "ids": [
        "pe",
        "al",
        "pb",
        "rn",
        "ce",
        "pi"
       ]
      },
      {
       "cls": "q8",
       "key": "9x",
       "title": "Kuzey + Maranhão",
       "sub": "91, 93, 94 PA · 92, 97 AM · 95 RR · 96 AP · 98, 99 MA.",
       "ids": [
        "pa",
        "am",
        "rr",
        "ap",
        "ma"
       ]
      }
     ],
     "visuals": [
      {
       "id": "br-ddd",
       "title": "Telefon numarası: DDD nerede?",
       "badge": "Çizim ve fotoğraf",
       "set": "br-ddd1",
       "ids": [
        "sp",
        "rj",
        "es",
        "mg",
        "pr",
        "sc",
        "rs",
        "df",
        "go",
        "to",
        "mt",
        "ms",
        "ac",
        "ro",
        "ba",
        "se",
        "pe",
        "al",
        "pb",
        "rn",
        "ce",
        "pi",
        "ma",
        "pa",
        "ap",
        "am",
        "rr"
       ],
       "sub": "Parantez içindeki iki rakam DDD’dir ve bölgeyi söyler. Cep numarasının ilk 9’u koda ait değildir. 0800 ücretsiz hattır ve yer söylemez. Gerçek tabelaların çoğunda yalnız yerel numara vardır (2556-7646 gibi); DDD yazılıysa parantez içindedir.",
       "tags": [
        "(11)",
        "(85)",
        "9",
        "0800"
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
     "title": "Bölgeyi gösteren direk ve manzara",
     "lead": "Brezilya’da levha dili her yerde Portekizcedir; bölgeyi çoğu zaman elektrik direği ve manzara söyler. Kuzeydoğunun büyük şehirlerinde merdiven biçimli beton direk, güneydoğuda kalın yuvarlak direk, Rio’da sivri uçlu direk; güney yaylalarında kandil gibi araucária, kuzeydoğunun kurak içinde kaktüsler, Amazon ağzında açaí kümeleri. Burada yalnızca sık karşına çıkan ipuçları var.",
     "desc": "Direk türünden, kaktüsten ve palmiyeden bölgeyi bul.",
     "decoder": {
      "title": "Ne gördün?",
      "placeholder": "Örn. merdiven direk, araucária, kaktüs, açaí, babaçu…",
      "hint": "Gördüğün ipucunu yaz: hangi eyaletlerde görüldüğü haritada boyanır.",
      "quizPrompt": "Bu görünüm hangi bölgede?",
      "noHit": "Bu ipucu listede yok.",
      "entries": [
       {
        "key": "Merdiven direk",
        "label": "Alt yarısı merdiven gibi yuvalı beton direk → Kuzeydoğu ve Kuzey’in büyük şehirleri",
        "sub": "Bir topluluk sunumunun başkent sayımlarına göre São Luís, Fortaleza, Natal, Recife, Teresina, Palmas ve João Pessoa’da direklerin tamamı merdivendir; Aracaju %99, Maceió %95; Manaus, Porto Velho, Rio Branco ve Boa Vista yaklaşık %90 (merkezde yuvarlak vardır). Resmî adı çift T (duplo T) kesitli beton direktir. Kırsalda oranlar değişebilir.",
        "keys": [
         "merdiven",
         "merdiven direk",
         "ladder",
         "çift t",
         "duplo t",
         "poste duplo t"
        ],
        "ids": [
         "ma",
         "ce",
         "rn",
         "pe",
         "pi",
         "to",
         "pb",
         "se",
         "al",
         "am",
         "ro",
         "ac",
         "rr"
        ],
        "main": "Merdiven direk",
        "prompt": "Alt yarısı merdiven gibi yuvalı beton direkler hangi bölgede ağır basar?"
       },
       {
        "key": "Yuvarlak direk",
        "label": "Kalın, düz yüzeyli yuvarlak beton direk → Güneydoğu ve Güney (São Paulo, Minas Gerais, Espírito Santo, Rio, Santa Catarina, Paraná)",
        "sub": "Aynı sunumun sayımlarına göre São Paulo, Belo Horizonte, Vitória ve Florianópolis’te direklerin tamamı yuvarlaktır; Rio’da %99, Curitiba’da %90. Salvador, Goiânia, Cuiabá, Campo Grande ve Porto Alegre’de yaklaşık %80 yuvarlak, kalanı merdiven ya da ahşaptır.",
        "keys": [
         "yuvarlak",
         "yuvarlak direk",
         "round",
         "daire kesit"
        ],
        "ids": [
         "sp",
         "mg",
         "es",
         "rj",
         "sc",
         "pr"
        ],
        "main": "Yuvarlak direk",
        "prompt": "Kalın yuvarlak beton direkler hangi bölgede neredeyse tamamdır?"
       },
       {
        "key": "Kalem uçlu direk",
        "label": "Tepesi kurşun kalem ucu gibi sivri direk → Rio de Janeiro (ayrıca Manaus ve Brasília)",
        "sub": "Aynı sunuma göre bu uç en sık Rio de Janeiro’da görülür; Manaus’ta ve Distrito Federal’de de bulunabilir. Çizim şematiktir; gerçek biçim direğe göre değişir.",
        "keys": [
         "kurşun kalem",
         "kalem ucu",
         "kalem uçlu",
         "pencil",
         "sivri uç",
         "sivri direk"
        ],
        "ids": [
         "rj",
         "am",
         "df"
        ],
        "main": "Kalem uçlu direk",
        "prompt": "Tepesi kurşun kalem gibi sivri direk en çok hangi eyalette görülür?"
       },
       {
        "key": "Araucária",
        "label": "Düz gövdeli, tepesi kandil gibi yassı ağaç (araucária) → Güney yaylaları (Paraná, Santa Catarina, Rio Grande do Sul)",
        "sub": "Serin yaylaların ağacıdır (yaklaşık 500–1500 m). Genç ağaçta dallar kat kat dizilir, yaşlıda tepe yassılaşır. São Paulo, Minas Gerais ve Rio de Janeiro’nun yüksek yerlerinde de küçük topluluklar vardır, ama esas olarak güneydedir.",
        "keys": [
         "araucária",
         "araucaria",
         "pinheiro",
         "pinheiro-do-paraná",
         "kandil ağacı",
         "çam",
         "çam ağacı"
        ],
        "ids": [
         "pr",
         "sc",
         "rs"
        ],
        "main": "Araucária",
        "prompt": "Düz gövdeli, tepesi kandil gibi yassı ağaç (araucária) hangi bölgenin işaretidir?"
       },
       {
        "key": "Açaí",
        "label": "Aynı kökten çıkan ince gövdeli palmiye kümeleri, nehir kıyısı (açaí) → Amazon nehir ağzı (Pará, Amapá)",
        "sub": "Bir kümede 25’e kadar gövde bulunur. Amazon nehir ağzının taşkın ormanlarında en yoğunudur; Pará en büyük üretici eyalettir. Amazonas eyaletinde açaı çoğunlukla tek gövdeli akrabasından (Euterpe precatoria) gelir.",
        "keys": [
         "açaí",
         "açai",
         "acai",
         "asai",
         "palmiye",
         "nehir kıyısı"
        ],
        "ids": [
         "pa",
         "ap"
        ],
        "main": "Açaí",
        "prompt": "Aynı kökten çıkan ince gövdeli açaí palmiye kümeleri en çok hangi bölgede görülür?"
       },
       {
        "key": "Babaçu",
        "label": "Tek kalın gövde, dev yapraklı yoğun palmiye ormanı (babaçu) → Maranhão ve Piauí (ayrıca Tocantins)",
        "sub": "Babaçu ormanları Maranhão ve Piauí’de yoğundur; Pará, Tocantins ve Ceará’da da görülür. 15–30 m boylanır, yaprakları 9 m’ye varır.",
        "keys": [
         "babaçu",
         "babacu",
         "babassu",
         "dev yaprak"
        ],
        "ids": [
         "ma",
         "pi",
         "to"
        ],
        "main": "Babaçu",
        "prompt": "Dev yapraklı, yoğun babaçu palmiye ormanları en çok hangi bölgede görülür?"
       },
       {
        "key": "Caatinga kaktüsleri",
        "label": "Kaktüslü, seyrek dikenli çalılık (caatinga) → Kuzeydoğu’nun kurak iç kesimi (Ceará, Rio Grande do Norte, Paraíba, Pernambuco, Alagoas, Sergipe, Bahia, Piauí)",
        "sub": "Mandacaru ve xique-xique en tanınmış kaktüsleridir. Caatinga kurak mevsimde yaprağını döker; kuzeydoğunun iç kesimini ve Minas Gerais’in kuzeyini kaplar, nemli kıyı şeridi bu görünümü vermez.",
        "keys": [
         "caatinga",
         "kaktüs",
         "mandacaru",
         "xique-xique",
         "xiquexique",
         "facheiro",
         "dikenli çalılık"
        ],
        "ids": [
         "ce",
         "rn",
         "pb",
         "pe",
         "al",
         "se",
         "ba",
         "pi"
        ],
        "main": "Caatinga",
        "prompt": "Kaktüslü, seyrek dikenli çalılık manzarası hangi bölgenin işaretidir?"
       },
       {
        "key": "Cerrado",
        "label": "Otlar arasında dağınık, bükük gövdeli alçak ağaçlar (cerrado savanı) → Orta Brezilya (Goiás, Distrito Federal, Tocantins, Mato Grosso, Mato Grosso do Sul, Minas Gerais)",
        "sub": "Orta Brezilya’nın savanıdır. Kaktüslü dikenli çalılık değil, otlar arasında dağınık bükük ağaçlar görürsen cerrado olabilir.",
        "keys": [
         "cerrado",
         "savan",
         "savana",
         "bükük ağaç"
        ],
        "ids": [
         "go",
         "df",
         "to",
         "mt",
         "ms",
         "mg"
        ],
        "main": "Cerrado",
        "prompt": "Otlar arasında dağınık, bükük gövdeli alçak ağaçlar hangi bölgede yaygındır?"
       },
       {
        "key": "Pampa",
        "label": "Ağaçsız, hafif dalgalı geniş çayırlar (pampa) → Rio Grande do Sul",
        "sub": "Brezilya’da pampa biyomu yalnızca Rio Grande do Sul’dadır.",
        "keys": [
         "pampa",
         "çayır",
         "otlak",
         "gaúcho",
         "gaucho"
        ],
        "ids": [
         "rs"
        ],
        "main": "Pampa",
        "prompt": "Ağaçsız, hafif dalgalı geniş çayırlar (pampa) hangi eyaletin işaretidir?"
       },
       {
        "key": "Pantanal",
        "label": "Mevsimlik sular altında kalan geniş düz ova (Pantanal) → Mato Grosso do Sul ve Mato Grosso",
        "sub": "Dünyanın en büyük tropik sulak alanıdır; Mato Grosso ve Mato Grosso do Sul eyaletlerinde yer alır.",
        "keys": [
         "pantanal",
         "sulak alan",
         "bataklık",
         "taşkın ova"
        ],
        "ids": [
         "ms",
         "mt"
        ],
        "main": "Pantanal",
        "prompt": "Mevsimlik sular altında kalan geniş düz ova (Pantanal) hangi bölgenin işaretidir?"
       },
       {
        "key": "Amazon ormanı",
        "label": "Sık yağmur ormanı, geniş nehirler → Kuzey (Amazonas, Pará, Acre, Rondônia, Roraima, Amapá)",
        "sub": "Amazon ormanı Kuzey’in büyük kısmını kaplar; Mato Grosso, Tocantins ve Maranhão’nun kuzeyine de uzanır.",
        "keys": [
         "amazon",
         "amazon ormanı",
         "yağmur ormanı",
         "orman",
         "nehir"
        ],
        "ids": [
         "am",
         "pa",
         "ac",
         "ro",
         "rr",
         "ap"
        ],
        "main": "Amazon ormanı",
        "prompt": "Sık yağmur ormanı ve geniş nehirler hangi bölgenin işaretidir?"
       },
       {
        "key": "Soya tarlası",
        "label": "Uçsuz bucaksız düz soya tarlaları ve kırmızı toprak yol → Orta-Batı (Mato Grosso, Goiás) ve Rio Grande do Sul",
        "sub": "Soya (soja) Brezilya'nın en yaygın tarla ürünlerinden biridir; Mato Grosso'da ufka kadar uzanan düz tarlalar, Goiás'ta dalgalı tarlalar, Rio Grande do Sul'da kırmızı toprak yollar görülür. Fotoğraflar bu üç eyaletten.",
        "keys": [
         "soya",
         "soja",
         "soy",
         "tarla",
         "plantasyon",
         "mato grosso",
         "goiás"
        ],
        "ids": [
         "mt",
         "go",
         "rs"
        ],
        "main": "Soya tarlası",
        "prompt": "Ufka kadar uzanan düz soya tarlaları en çok hangi bölgelerin işaretidir?"
       },
       {
        "key": "Carnaúba",
        "label": "Yelpaze yapraklı, ince gövdeli palmiye koruluğu (carnaúba) → Ceará ve Kuzeydoğu içi",
        "sub": "Carnaúba palmiyesi (Copernicia prunifera) Kuzeydoğu'nun, özellikle Ceará'nın simgesidir: ince uzun gövde, tepede yelpaze yaprak; mevsimlik sulak zeminde gruplar halinde durur. Fotoğraflar Ceará'dan.",
        "keys": [
         "carnaúba",
         "carnauba",
         "palmiye",
         "yelpaze",
         "ceará",
         "copernicia"
        ],
        "ids": [
         "ce"
        ],
        "main": "Carnaúba",
        "prompt": "Yelpaze yapraklı carnaúba palmiyesi koruluğu hangi eyaletin işaretidir?"
       },
       {
        "key": "Kahve tepeleri",
        "label": "Yumuşak tepelerde sıra sıra kahve → Minas Gerais ve Espírito Santo",
        "sub": "Kahve (café) Minas Gerais'in güneyinde yumuşak dalgalı arazide, Espírito Santo'da (conilon) yamaçlarda sık sıralarla yetişir. Fotoğraflar Três Pontas (MG) ve Timbuí (ES, BR-101).",
        "keys": [
         "kahve",
         "café",
         "cafe",
         "conilon",
         "três pontas",
         "minas"
        ],
        "ids": [
         "mg",
         "es"
        ],
        "main": "Kahve tepeleri",
        "prompt": "Yumuşak tepelerde sıra sıra kahve tarlaları hangi eyaletlerin işaretidir?"
       }
      ]
     },
     "flows": [
      {
       "title": "Önce direğe bak",
       "body": "Direk Brezilya’nın her yerinde çıkar. Alt yarısı yuvalı merdiven direk çoğunlukla Kuzeydoğu ve Kuzey’in büyük şehirlerinde, kalın düz yuvarlak direk Güneydoğu ve Güney’de ağır basar. Tepesi kurşun kalem gibi sivriyse önce Rio’yu düşün; Manaus ve Brasília de olabilir. Oranlar bir topluluk sunumunun başkent sayımlarıdır: tek direğe değil çevrendeki birkaç direğe bak."
      },
      {
       "title": "Sonra bitkiye bak",
       "body": "Kaktüs ve seyrek dikenli çalı: Kuzeydoğu’nun kurak içi (caatinga). Kandil gibi araucária: Güney yaylaları. Nehir kıyısında çok gövdeli açaí: Amazon nehir ağzı. Dev yapraklı babaçu ormanı: Maranhão ve Piauí."
      },
      {
       "title": "Ova mı, savan mı, orman mı?",
       "body": "Ağaçsız dalgalı çayır: Rio Grande do Sul’un pampası. Mevsimlik sular altında kalan geniş ova: Pantanal (Mato Grosso do Sul ve Mato Grosso). Otlar arasında dağınık bükük ağaçlar: Orta Brezilya’nın cerrado’su. Sık yağmur ormanı: Amazon, Kuzey."
      }
     ],
     "rulesTitle": "Karışabilecekler",
     "rules": [
      {
       "title": "Merdiven mi yuvarlak mı?",
       "ids": [
        "ma",
        "ce",
        "rn",
        "pe",
        "pi",
        "to",
        "pb",
        "se",
        "al",
        "am",
        "ro",
        "ac",
        "rr",
        "sp",
        "mg",
        "es",
        "rj",
        "sc",
        "pr",
        "ba",
        "go",
        "mt",
        "ms",
        "rs",
        "df"
       ],
       "body": "İkisi de Brezilya’nın her yerinde bulunabilir; fark oranda. Kuzeydoğu ve Kuzey’in büyük şehirlerinde merdiven, Güneydoğu ve Güney’de yuvarlak ağır basar. Salvador, Goiânia, Cuiabá, Campo Grande ve Porto Alegre’de yaklaşık %80 yuvarlak vardır; Brasília’da %60. Sayılar bir topluluk sunumundan alınmıştır ve başkentler içindir.",
       "traps": [
        [
         "Hepsi merdiven: São Luís, Fortaleza, Natal, Recife, Teresina, Palmas, João Pessoa",
         "Kuzeydoğu ve Tocantins"
        ],
        [
         "Hepsi yuvarlak: São Paulo, Belo Horizonte, Vitória, Florianópolis",
         "Güneydoğu ve Santa Catarina"
        ],
        [
         "Çoğu yuvarlak, bir kısmı merdiven (yaklaşık %80)",
         "Salvador, Goiânia, Cuiabá, Campo Grande"
        ]
       ]
      },
      {
       "title": "Açaí mı babaçu mu?",
       "ids": [
        "pa",
        "ap",
        "am",
        "ma",
        "pi",
        "to"
       ],
       "body": "İkisi de palmiyedir ve Kuzey’e yakındır. Açaí aynı kökten çıkan ince gövdelerin kümesidir ve Amazon nehir ağzının taşkın ormanlarında durur. Babaçu tek, kalın gövdeli bir palmiyedir; dev yapraklı yoğun ormanları Maranhão ve Piauí’dedir.",
       "traps": [
        [
         "Aynı kökten çıkan ince gövdeler, nehir kıyısı",
         "açaí (Pará, Amapá)"
        ],
        [
         "Tek kalın gövde, dev yapraklı yoğun palmiye ormanı",
         "babaçu (Maranhão, Piauí, Tocantins)"
        ]
       ]
      },
      {
       "title": "Caatinga mı cerrado mu?",
       "ids": [
        "ce",
        "rn",
        "pb",
        "pe",
        "al",
        "se",
        "ba",
        "pi",
        "go",
        "df",
        "to",
        "mt",
        "ms",
        "mg"
       ],
       "body": "İkisi de kuru iç kesimdir. Caatinga seyrek, dikenli bir çalılıktır ve kaktüsleri vardır; kuzeydoğudadır. Cerrado ise otlar arasında dağınık bükük ağaçlardan oluşan bir savandır; Orta Brezilya’dadır.",
       "traps": [
        [
         "Kaktüsler, seyrek dikenli çalılık",
         "caatinga (Kuzeydoğu’nun iç kesimi)"
        ],
        [
         "Otlar arasında dağınık bükük ağaçlar",
         "cerrado (Goiás, Distrito Federal, Tocantins…)"
        ]
       ]
      }
     ],
     "visualsTitle": "Nasıl görünür? ",
     "visuals": [
      {
       "id": "br-direk",
       "title": "Direk: merdiven (Fortaleza) ve yuvarlak (Belo Horizonte)",
       "badge": "2 foto",
       "set": "br-direk-foto",
       "ids": [
        "ma",
        "ce",
        "rn",
        "pe",
        "pi",
        "to",
        "pb",
        "se",
        "al",
        "am",
        "ro",
        "ac",
        "rr",
        "sp",
        "mg",
        "es",
        "rj",
        "sc",
        "pr",
        "df"
       ],
       "sub": "Gerçek fotoğraflar: dikdörtgen kesitli «merdiven» (çift T) direk Kuzeydoğu şehirlerinde, kalın yuvarlak direk Güneydoğu ve Güney’de ağır basar. Rio’daki kalem uçlu direk için Commons’ta okunaklı fotoğraf bulamadık; çizmedik, yalnız metinle anlatıyoruz.",
       "tags": [
        "merdiven",
        "yuvarlak",
        "kurşun kalem"
       ],
       "quiz": false
      },
      {
       "id": "br-arauc",
       "title": "Araucária (kandil ağacı)",
       "badge": "Ağaç",
       "set": "br-arauc1",
       "ids": [
        "pr",
        "sc",
        "rs"
       ],
       "sub": "Düz gövde, yassı kandil taç. Güney yaylalarında: Paraná, Santa Catarina ve Rio Grande do Sul.",
       "tags": [
        "araucária",
        "kandil"
       ],
       "quiz": false
      },
      {
       "id": "br-palm",
       "title": "Açaí ve babaçu palmiyeleri",
       "badge": "Palmiye",
       "set": "br-palm1",
       "ids": [
        "pa",
        "ap",
        "ma",
        "pi",
        "to"
       ],
       "sub": "Açaí: nehir kıyısında çok gövdeli küme (Pará, Amapá). Babaçu: tek kalın gövde, dev yapraklı yoğun orman (Maranhão, Piauí).",
       "tags": [
        "açaí",
        "babaçu"
       ],
       "quiz": false
      },
      {
       "id": "br-cactus",
       "title": "Caatinga kaktüsleri",
       "badge": "Kaktüs",
       "set": "br-cactus1",
       "ids": [
        "ce",
        "rn",
        "pb",
        "pe",
        "al",
        "se",
        "ba",
        "pi"
       ],
       "sub": "Mandacaru ve xique-xique: kuzeydoğunun kurak iç kesiminde, seyrek dikenli çalılığın içinde.",
       "tags": [
        "mandacaru",
        "xique-xique",
        "caatinga"
       ],
       "quiz": false
      },
      {
       "id": "br-cerrado",
       "title": "Cerrado savanı",
       "badge": "Biyom",
       "set": "br-cerrado",
       "ids": [
        "go",
        "df",
        "to",
        "mt",
        "ms",
        "mg"
       ],
       "sub": "Boylu otlar arasında dağınık, bükük gövdeli alçak ağaçlar. Orta Brezilya’nın savanı.",
       "tags": [
        "cerrado",
        "savan"
       ]
      },
      {
       "id": "br-pampa",
       "title": "Pampa çayırı",
       "badge": "Biyom",
       "set": "br-pampa",
       "ids": [
        "rs"
       ],
       "sub": "Otlarla kaplı dalgalı geniş ova, ağaçlar seyrek. Brezilya’da yalnızca Rio Grande do Sul’da.",
       "tags": [
        "pampa",
        "çayır"
       ]
      },
      {
       "id": "br-pantanal",
       "title": "Pantanal",
       "badge": "Biyom",
       "set": "br-pantanal",
       "ids": [
        "ms",
        "mt"
       ],
       "sub": "Mevsimlik sular altında kalan, ufka kadar düz geniş ova (Mato Grosso ve Mato Grosso do Sul).",
       "tags": [
        "pantanal",
        "sulak alan"
       ]
      },
      {
       "id": "br-amazon",
       "title": "Amazon ormanı",
       "badge": "Biyom",
       "set": "br-amazon",
       "ids": [
        "am",
        "pa",
        "ac",
        "ro",
        "rr",
        "ap"
       ],
       "sub": "Ufka kadar sürekli sık orman ve geniş nehirler. Kuzey bölgesi.",
       "tags": [
        "amazon",
        "yağmur ormanı"
       ]
      },
      {
       "id": "br-soja",
       "title": "Orta-Batı: soya tarlası",
       "badge": "Soya",
       "set": "br-soja",
       "ids": [
        "mt",
        "go",
        "rs"
       ],
       "sub": "Düz ya da yumuşak dalgalı, ağaçsız tarla; yol çoğu zaman kırmızı toprak. Fotoğraflar Mato Grosso, Goiás ve Rio Grande do Sul'dan.",
       "tags": [
        "soya",
        "Mato Grosso"
       ]
      },
      {
       "id": "br-carn",
       "title": "Ceará: carnaúba palmiyesi",
       "badge": "Carnaúba",
       "set": "br-carn",
       "ids": [
        "ce"
       ],
       "sub": "Yelpaze yapraklı, ince gövdeli palmiyeler, sulak ya da kurak zeminde.",
       "tags": [
        "carnaúba",
        "Ceará"
       ]
      },
      {
       "id": "br-cafe",
       "title": "Minas Gerais ve Espírito Santo: kahve",
       "badge": "Kahve",
       "set": "br-cafe",
       "ids": [
        "mg",
        "es"
       ],
       "sub": "Dalgalı arazide düzenli kahve sıraları (Três Pontas, MG) ve yamaçta conilon (Timbuí, ES).",
       "tags": [
        "kahve",
        "Minas Gerais"
       ]
      }
     ],
     "practice": "visual"
    }
   ]
  });
})(typeof window !== 'undefined' ? window : globalThis);

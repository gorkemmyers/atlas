/* pack-europe-east.js — Kuzey ve Doğu Avrupa: Polonya (PL), İsveç (SE), Norveç (NO), Romanya (RO), Ukrayna (UA) */
(function (g) {
  'use strict';
  if (!g.CountryEngine) return;
  var h = g.U.h;

  function buildPack(spec) {
    var units = spec.rawUnits.map(function (r) {
      return {
        id: r[0],
        name: r[1],
        vn: r[2],
        cap: r[3],
        reg: r[4],
        code: r[5],
        traitId: r[6],
        traitTitle: r[7],
        cue: 'Nereye bakılır: ' + r[8] + '.',
        trap: r[9] + '.'
      };
    });

    g.CountryEngine.register({
      id: spec.id,
      name: spec.name,
      short: spec.short || spec.name,
      code: spec.code,
      area: spec.area,
      tone: spec.tone,
      unitLabel: spec.unitLabel,
      groupLabel: spec.groupLabel,
      codeLabel: spec.codeLabel,
      line: spec.line,
      blurb: spec.blurb,
      overviewLead: spec.overviewLead,
      quickTips: spec.quickTips,
      plan: [
        { title: 'Alan ve Posta Kodu Kuşakları', text: spec.plan1, to: 'alan' },
        { title: 'Direk, Tabela ve Mimari İpuçları', text: spec.plan2, to: 'saha' },
        { title: 'Haritada Tüm Birimleri Keşfet', text: 'Harita üzerinde her birimin kodunu, başkentini ve saha ipuçlarını incele.', to: 'kesfet' },
        { title: 'Kod ve Harita Pratiği', text: 'Alan/posta kodlarından bölge bulma ve harita üzerinde işaretleme alıştırması yap.', to: 'pratik', launch: { preset: 'codes' } },
        { title: 'Saha Simülasyonu', text: 'Maskelenmiş tabela, alan kodu ve mimari ipuçlarıyla 5 turluk simülasyonu tamamla.', to: 'simulasyon' }
      ],
      geoName: spec.geoName,
      themeCfg: spec.themeCfg,
      groups: spec.groups,
      units: units,
      topics: spec.topics,
      practiceCats: [
        { id: 'codes', label: spec.codeLabel, icon: 'phone', desc: 'Alan ve posta kodlarından doğru birimi seç', kinds: ['code_to_unit', 'unit_to_code'] },
        { id: 'map', label: 'Haritada Bul', icon: 'pin', desc: 'Adı veya kodu verilen birimi haritada işaretle', kinds: ['name_to_map', 'code_to_map'] },
        { id: 'groups', label: 'Ana Kuşaklar', icon: 'layers', desc: 'Birimin hangi coğrafi/kod kuşağında olduğunu bil', kinds: ['unit_to_group'] },
        { id: 'visual', label: 'Saha İpuçları', icon: 'bulb', desc: 'Görsel ipucundan hangi bölge kuşağında olduğunu bul', kinds: ['visual_to_group'] }
      ],
      makeSimClue: function (u, helpers) {
        var gObj = helpers.groupById[u.reg];
        return h('div', { 'class': 'sim-clue' },
          h('div', { 'class': 'sim-clue-row' },
            h('span', { 'class': 'sim-k' }, 'Tabela / Direk Kodu'),
            h('span', { 'class': 'area' }, u.code)),
          h('div', { 'class': 'sim-clue-row' },
            h('span', { 'class': 'sim-k' }, 'Bölgesel Saha İpucu'),
            h('b', {}, helpers.maskText(u.traitTitle, u))),
          h('p', { 'class': 'sim-cue' }, helpers.maskText(u.cue, u)),
          gObj ? h('p', { 'class': 'sim-trap micro' }, 'Kuşak aralığı: ' + gObj.codeRange) : null
        );
      }
    });
  }

  /* =======================================================================
   * 1. POLONYA (16 Voyvodalık - Województwa)
   * ======================================================================= */
  buildPack({
    id: 'polonya', name: 'Polonya', code: 'PL', area: 'Avrupa ve Avrasya', tone: 'red',
    unitLabel: 'voyvodalık', groupLabel: 'coğrafi kuşak', codeLabel: 'alan ve XX-xxx posta kodu',
    line: '16 voyvodalık: 12–94 sabit alan kodları, XX-xxx posta kodu ve ŻN delikli direkler',
    blurb: 'XX-xxx posta kodları, 2 haneli sabit telefon alan kodları (12–94), kafes boşluklu ŻN beton direkler ve Prusya tuğlası vs Karpat ahşap mimarisiyle 16 Polonya voyvodalığı.',
    overviewLead: 'Polonya’da her dükkan, kargo noktası ve belediye panosunda XX-XXX biçiminde tireli 5 haneli posta kodu (Kod Pocztowy) ile 2 haneli sabit telefon alan kodu (ör. 22 Varşova, 12 Kraków, 71 Wrocław, 61 Poznań, 58 Gdańsk) yer alır.',
    quickTips: [
      'Tireli posta kodunun (XX-xxx) ilk rakamı: 0x = Varşova/Mazovya, 1x = Olsztyn ve Białystok, 2x = Lublin ve Kielce, 3x = Kraków ve Rzeszów, 4x = Katowice ve Opole, 5x = Wrocław, 6x = Poznań ve Zielona Góra, 7x = Szczecin, 8x = Gdańsk/Bydgoszcz/Toruń, 9x = Łódź!',
      'Polonya’yı çevre ülkelerden saniyesinde ayıran ipucu: gövdesi boydan boya üçgen/trapez boşluklu çift dikmeli ŻN beton elektrik direği ve içi kırmızı-beyaz şeritli ince yaya geçidi tabelası.',
      'Kuzey ve Batı (eski Prusya kuşağı) kırmızı tuğla binalar ve ağaç tünelli yollarla; Güney ve Doğu ise renkli ahşap kepenkli köy evleri ve dik Karpat çatılarıyla ayrılır.'
    ],
    plan1: '0x–9x tireli posta kodlarını ve 12–94 sabit telefon alan kodlarını öğren.',
    plan2: 'Üçgen boşluklu ŻN beton direkleri, yeşil köy tabelalarını ve Prusya kırmızı tuğla vs Doğu ahşap mimarisini incele.',
    geoName: 'PL_GEO',
    themeCfg: {
      aria: 'Polonya 16 voyvodalık haritası', fit: 'Tüm Polonya’yı göster',
      grid: { lat: [49, 55, 2], lon: [14, 24, 2], txt: [50, 54, 2], refLon: 19, refLat: 52 },
      excludeWorld: ['Poland', 'Germany', 'Czechia', 'Slovakia', 'Ukraine', 'Belarus', 'Lithuania'],
      bg: [[18.5, 55.2, 'Baltık Denizi', 's'], [12.8, 52.2, 'ALMANYA', 'c'], [15.5, 49.8, 'ÇEKYA', 'c'], [19.5, 48.8, 'SLOVAKYA', 'c'], [24.8, 50.5, 'UKRAYNA', 'c'], [25.2, 53.2, 'BELARUS', 'c']]
    },
    groups: [
      { id: 'kuzey', name: 'Kuzey ve Baltık (Pomeranya, Mazurya, Kuyavya)', short: 'Kuzey', color: '#1c5fa6', codeRange: '52/55/56/58/59 · 89 · 91/94 · Posta 7x–8x & 10–14', desc: 'Baltık kıyısı ve Mazurya Gölleri. Kırmızı tuğla Gotik kiliseler, ağaçlıklı yollar ve Kaşub çift dilli tabelaları.', keyCues: ['Gdańsk 58 (80–84), Szczecin 91 (70–74), Bydgoszcz/Toruń 52/56 (85–87), Olsztyn 89 (10–14)', 'Kırmızı tuğla Alman/Prusya dönemi köy dokusu', 'Pomeranya’da Lehçe-Kaşubca çift dilli köy tabelaları'] },
      { id: 'bati', name: 'Batı Polonya (Büyük Polonya, Lubusz, Aşağı Silezya, Opole)', short: 'Batı', color: '#0e7a80', codeRange: '61–68 · 71–77 · Posta 45–69', desc: 'Oder ve Warta havzası. Poznań (61), Wrocław (71), Zielona Góra (68), Opole (77).', keyCues: ['Poznań 61 (60–64), Lubusz 68/95 (65–69), Wrocław 71 (50–59), Opole 77 (45–49)', 'Opole kuşağında Lehçe-Almanca çift dilli köy tabelaları', 'Sudet Dağları taş/ahşap evleri ve düzenli batı çiftlikleri'] },
      { id: 'merkez-dogu', name: 'Merkez ve Doğu (Mazovya, Łódź, Podlaskie, Lublin)', short: 'Merkez & Doğu', color: '#a86a00', codeRange: '22–25/29 · 42–46 · 81–87 · Posta 0x, 15–24, 9x', desc: 'Varşova (22, 00–09), Łódź (42, 90–99), Lublin (81, 20–24) ve Białystok (85, 15–19).', keyCues: ['Varşova 22 (00–09), Łódź 42 (90–99), Lublin 81 (20–24), Białystok 85 (15–19)', 'Podlaskie renkli ahşap kepenkli evler ve Ortodoks haçları', 'Geniş düz Vistül ve Bug nehir ovaları'] },
      { id: 'guney', name: 'Güney ve Karpatlar (Silezya, Küçük Polonya, Alt Karpat, Świętokrzyskie)', short: 'Güney', color: '#c0262c', codeRange: '12–18 · 32–34 · 41 · Posta 25–44', desc: 'Katowice kömür/sanayi havzası (32), Kraków ve Tatra Dağları (12/18), Rzeszów (17) ve Kielce (41).', keyCues: ['Kraków 12 (30–34), Katowice 32 (40–44), Rzeszów 17 (35–39), Kielce 41 (25–29)', 'Dik çatılı Zakopane/Karpat dağ evleri ve şerit tarlalar', 'Silezya yoğun sanayi ve kırmızı tuğla işçi blokları (familoki)'] }
    ],
    rawUnits: [
      ['zp', 'Batı Pomeranya', 'Zachodniopomorskie', 'Szczecin', 'kuzey', '91 / 94 · 70-xxx..78-xxx', 'pl-prussian-brick', '91/94 alan kodu & 70–78 posta', 'Tabelalarda 91 (Szczecin) veya 94 (Koszalin) sabit alan kodunu, 70-xxx..78-xxx posta kodunu ve ağaç tünelli yollarda kırmızı tuğla Prusya köylerini arayın', 'Pomeranya (Gdańsk) doğuda 58/59 ve 80–84 posta kodunu kullanır'],
      ['pm', 'Pomeranya', 'Pomorskie', 'Gdańsk', 'kuzey', '58 / 59 · 80-xxx..84-xxx', 'pl-prussian-brick', '58 Gdańsk, 80–84 posta & Kaşubca tabelalar', '58 (Gdańsk/Gdynia) veya 59 (Słupsk) alan kodunu, 80-xxx..84-xxx posta kodunu ve iç kesimlerde Lehçe-Kaşubca (Kaszëbë) çift dilli yeşil köy tabelalarını arayın', 'Warmia-Mazurya doğuda 89 ve 10–14 posta koduna geçer'],
      ['wn', 'Warmia-Mazurya', 'Warmińsko-Mazurskie', 'Olsztyn', 'kuzey', '89 / 55 · 10-xxx..14-xxx', 'pl-prussian-brick', '89 Olsztyn, 10–14 posta & Mazurya gölleri', '89 (Olsztyn/Ełk) ve batıda 55 (Elbląg) alan kodunu, 10-xxx..14-xxx posta kodunu, yüzlerce buzul gölünü ve kırmızı tuğla Gotik köy kiliselerini arayın', 'Podlaskie güneydoğuda 85/86/87 ve ahşap Ortodoks köy mimarisine geçer'],
      ['kp', 'Kuyavya-Pomeranya', 'Kujawsko-Pomorskie', 'Bydgoszcz / Toruń', 'kuzey', '52 / 56 / 54 · 85-xxx..89-xxx', 'pl-green-town', '52 Bydgoszcz, 56 Toruń & 85–89 posta', 'Bydgoszcz (52), Toruń (56), Włocławek (54) alan kodlarını, 85-xxx..89-xxx posta kodunu ve Vistül Nehri boyunca uzanan düz şekerpancarı/tahıl ovalarını arayın', 'Büyük Polonya güneybatıda 61–67 ve 60–64 posta kodunu kullanır'],
      ['lb', 'Lubusz', 'Lubuskie', 'Zielona Góra / Gorzów', 'bati', '68 / 95 · 65-xxx..69-xxx', 'pl-prussian-brick', '68 Zielona Góra, 95 Gorzów & sık çam ormanı', 'Güneyde 68 (Zielona Góra), kuzeyde 95 (Gorzów Wielkopolski) alan kodunu, 65-xxx..69-xxx posta kodunu ve Polonya’nın en yoğun çam ormanı örtüsünü arayın', 'Büyük Polonya doğuda daha açık tarım ovasıdır ve 61–67 kodunu taşır'],
      ['wp', 'Büyük Polonya', 'Wielkopolskie', 'Poznań', 'bati', '61 / 62 / 63 / 65 / 67 · 60-xxx..64-xxx', 'pl-zn-pole', '61 Poznań, 60–64 posta & büyük çiftlikler', 'Poznań (61), Kalisz (62), Konin (63), Leszno (65), Piła (67) alan kodlarını, 60-xxx..64-xxx posta kodunu ve bakımlı geniş tarım işletmelerini arayın', 'Łódź doğuda 42/43 ve 90–99 posta kodunu kullanır'],
      ['ds', 'Aşağı Silezya', 'Dolnośląskie', 'Wrocław', 'bati', '71 / 74 / 75 / 76 · 50-xxx..59-xxx', 'pl-prussian-brick', '71 Wrocław, 50–59 posta & Sudet dağ mimarisi', 'Wrocław (71), Wałbrzych (74), Jelenia Góra (75), Legnica (76) alan kodlarını, 50-xxx..59-xxx posta kodunu ve Çekya sınırında Sudet dağları ile sarı/gri Alman dönemi taş konaklarını arayın', 'Opole doğuda 77 ve 45–49 posta koduna geçer'],
      ['op', 'Opole', 'Opolskie', 'Opole', 'bati', '77 · 45-xxx..49-xxx', 'pl-green-town', '77 alan kodu, 45–49 posta & Lehçe-Almanca tabela', 'Tüm voyvodalıkta tek tip 77 sabit alan kodunu, 45-xxx..49-xxx posta kodunu ve doğu ilçelerinde Lehçe-Almanca çift dilli yeşil köy tabelalarını arayın', '77 alan kodu yalnızca Opole voyvodalığında kullanılır'],
      ['mz', 'Mazovya', 'Mazowieckie', 'Varşova', 'merkez-dogu', '22 / 23 / 24 / 25 / 29 / 48 · 00-xxx..09-xxx', 'pl-zn-pole', '22 Varşova, 00–09 posta & elma bahçeleri', 'Varşova (22), Płock (24), Siedlce (25), Ostrołęka (29), Radom (48, 26-xxx) alan kodlarını, 00-xxx..09-xxx posta kodunu ve güneyde Grójec elma bahçelerini arayın', '00–09 ile başlayan tüm posta kodları Varşova ve Mazovya’dadır'],
      ['ld', 'Łódź', 'Łódzkie', 'Łódź', 'merkez-dogu', '42 / 43 / 44 / 46 · 90-xxx..99-xxx', 'pl-zn-pole', '42 Łódź, 90–99 posta & merkez kavşağı', 'Łódź (42), Sieradz (43), Piotrków (44), Skierniewice (46) alan kodlarını, 90-xxx..99-xxx posta kodunu ve A1/A2 otoyollarının kesiştiği düz orta Polonya dokusunu arayın', '90–99 ile başlayan tüm posta kodları Łódź voyvodalığına aittir'],
      ['pd', 'Podlaskie', 'Podlaskie', 'Białystok', 'merkez-dogu', '85 / 86 / 87 · 15-xxx..19-xxx', 'pl-podlasie-wood', '85 Białystok, 15–19 posta & ahşap kepenkli evler', 'Białystok (85), Łomża (86), Suwałki (87) alan kodlarını, 15-xxx..19-xxx posta kodunu, renkli oymalı ahşap köy evlerini ve Ortodoks/Belarus sınır kültürünü arayın', 'Lublin güneyde 81–84 ve 20–24 posta kodunu kullanır'],
      ['lu', 'Lublin', 'Lubelskie', 'Lublin', 'merkez-dogu', '81 / 82 / 83 / 84 · 20-xxx..24-xxx', 'pl-podlasie-wood', '81–84 kodu, 20–24 posta & lös vadileri', 'Lublin (81), Chełm (82), Biała Podlaska (83), Zamość (84) alan kodlarını, 20-xxx..24-xxx posta kodunu ve dalgalı sarı lös toprağı üzerinde şerit tarlaları arayın', 'Alt Karpat güneyde 17/16 ve 35–39 posta koduna geçer'],
      ['sl', 'Silezya', 'Śląskie', 'Katowice', 'guney', '32 / 33 / 34 · 40-xxx..44-xxx', 'pl-zn-pole', '32 Katowice, 40–44 posta & yoğun maden/sanayi', 'Katowice/Gliwice (32), Bielsko-Biała (33), Częstochowa (34) alan kodlarını, 40-xxx..44-xxx posta kodunu ve birbirine bitişik sanayi şehirleriyle kırmızı tuğla familoki bloklarını arayın', 'Küçük Polonya doğuda 12/14/18 ve 30–34 posta kodunu kullanır'],
      ['ma', 'Küçük Polonya', 'Małopolskie', 'Kraków', 'guney', '12 / 14 / 18 · 30-xxx..34-xxx', 'pl-podlasie-wood', '12 Kraków, 18 Zakopane & 30–34 posta', 'Kraków (12), Tarnów (14), Nowy Sącz/Zakopane (18) alan kodlarını, 30-xxx..34-xxx posta kodunu ve çok dik çatılı ahşap Karpat/Tatra dağ evlerini arayın', 'Silezya batıda 32/33, Alt Karpat doğuda 17/16 alan kodunu kullanır'],
      ['pk', 'Alt Karpat', 'Podkarpackie', 'Rzeszów', 'guney', '17 / 16 / 13 / 15 · 35-xxx..39-xxx', 'pl-podlasie-wood', '17 Rzeszów, 13 Krosno & 35–39 posta', 'Rzeszów (17), Przemyśl (16), Krosno/Bieszczady (13), Tarnobrzeg (15) alan kodlarını, 35-xxx..39-xxx posta kodunu ve yeşil Bieszczady dağ yamaçlarını arayın', 'Küçük Polonya batıda 12/14/18 ve 30–34 posta kodundadır'],
      ['sk', 'Świętokrzyskie', 'Świętokrzyskie', 'Kielce', 'guney', '41 / 15 · 25-xxx..29-xxx', 'pl-green-town', '41 Kielce, 25–29 posta & dar şerit tarlalar', 'Tüm bölgede 41 (Kielce) alan kodunu, 25-xxx..29-xxx posta kodunu ve alçak Kutsal Haç Dağları (Góry Świętokrzyskie) boyunca uzanan ince şerit tarlaları arayın', '41 alan kodu ve 25–29 posta kodu Świętokrzyskie’yi komşularından net ayırır']
    ],
    topics: [
      {
        id: 'alan', label: 'Posta ve Alan Kodu', icon: 'phone',
        desc: 'XX-xxx tireli posta kodu ve 12–94 sabit telefon alan kodları',
        title: 'Polonya XX-xxx Posta Kodları ve 12–94 Telefon Alan Kodları',
        lead: 'Polonya’da 2 rakam + tire + 3 rakam biçimindeki posta kodu (ör. 30-001 Kraków, 80-001 Gdańsk) her tabelada göze çarpar ve ilk rakamıyla bölgeyi doğrudan verir.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '0x..9x', title: 'Tireli Posta Kodu (Kod Pocztowy) İlk Rakam Haritası', body: 'Nereye bakılır: XX-XXX biçimindeki posta kodunun ilk rakamına bakın: 0x = Varşova ve Mazovya; 10–14 = Warmia-Mazurya (Olsztyn); 15–19 = Podlaskie (Białystok); 20–24 = Lublin; 25–29 = Świętokrzyskie (Kielce) ve Radom; 30–34 = Küçük Polonya (Kraków); 35–39 = Alt Karpat (Rzeszów); 40–44 = Silezya (Katowice); 45–49 = Opole; 50–59 = Aşağı Silezya (Wrocław); 60–64 = Büyük Polonya (Poznań); 65–69 = Lubusz; 70–78 = Batı Pomeranya (Szczecin); 80–84 = Pomeranya (Gdańsk); 85–89 = Kuyavya-Pomeranya; 90–99 = Łódź!' },
          { badge: '12..94', title: '2 Haneli Sabit Telefon Alan Kodları', body: 'Nereye bakılır: +48’den sonra veya parantez içinde gelen 2 haneli koda bakın: 12–18 Güneydoğu (Kraków 12, Rzeszów 17); 22–29 Mazovya (Varşova 22); 32–34 Silezya (Katowice 32); 41 Kielce, 42–46 Łódź; 52–59 Kuzey (Gdańsk 58, Bydgoszcz 52, Toruń 56); 61–68 Batı (Poznań 61, Zielona Góra 68); 71–77 Güneybatı (Wrocław 71, Opole 77); 81–89 Doğu ve Kuzeydoğu (Lublin 81, Białystok 85, Olsztyn 89); 91/94/95 Kuzeybatı (Szczecin 91).' }
        ]
      },
      {
        id: 'saha', label: 'ŻN Direk ve Mimari', icon: 'bulb',
        desc: 'Kafes boşluklu ŻN direkler, kırmızı tuğla Prusya ve ahşap Doğu mimarisi',
        title: 'Polonya Saha İpuçları: ŻN Direkleri ve Eski Sınır İzi',
        lead: 'Polonya’da eski Prusya/Alman sınırı (Kuzey ve Batı) ile eski Rus/Avusturya sınırı (Doğu ve Güney) bugün bile tuğla ve ahşap mimaride net biçimde okunur.',
        drill: 'visual',
        visuals: [
          { id: 'pl-zn-pole', title: 'Üçgen Boşluklu Polonya ŻN Beton Direk', sub: 'Merkez, Batı ve Silezya · Mazovya, Łódź, Wielkopolska, Śląskie', badge: 'ŻN Beton Direk', body: 'Nereye bakılır: İki beton dikme arasında boydan boya üçgen/trapez boşluklar bulunan A-biçimli ŻN elektrik direklerine bakın.', regions: ['mz', 'ld', 'wp', 'sl'] },
          { id: 'pl-green-town', title: 'Yeşil Yerleşim Tabelası ve Çift Dilli Köyler', sub: 'Opole (Lehçe-Almanca), Kuyavya ve Świętokrzyskie', badge: 'Köy Tabelası', body: 'Nereye bakılır: Yeşil E-17a köy giriş tabelalarına ve kırmızı-beyaz yol babalarına bakın; Opole’de ikinci satırda Almanca köy adı yer alır.', regions: ['op', 'kp', 'sk'] },
          { id: 'pl-prussian-brick', title: 'Kuzey ve Batı Kırmızı Tuğla Mimari', sub: 'Warmia-Mazurya, Pomeranya, Batı Pomeranya, Aşağı Silezya, Lubusz', badge: 'Prusya Kuşağı', body: 'Nereye bakılır: Kırmızı tuğla cepheli evlere, Gotik tuğla kiliselere ve iki yanı sık ağaç dizili (aleja) karayollarına bakın.', regions: ['wn', 'pm', 'zp', 'ds', 'lb'] },
          { id: 'pl-podlasie-wood', title: 'Doğu ve Güney Ahşap Köy ve Karpat Çatıları', sub: 'Podlaskie, Lublin, Küçük Polonya ve Alt Karpat', badge: 'Doğu & Karpat', body: 'Nereye bakılır: Doğu’da (Podlaskie/Lublin) renkli kepenkli ahşap evlere; Güney’de (Małopolskie/Podkarpackie) dik çatılı dağ köylerine ve ince şerit tarlalara bakın.', regions: ['pd', 'lu', 'ma', 'pk'] }
        ],
        cards: [
          { badge: 'Çift Dil', title: 'Polonya’da Çift Dilli Köy Tabelaları Nerede Görülür?', body: 'Nereye bakılır: Yeşil köy giriş tabelasında Lehçenin altında ikinci bir dil varsa: Almanca (örn. Chronstau) = Opole (ve Doğu Silezya); Kaşubca (örn. Chmielno / Chmielno, ë/ò/ã harfleri) = Pomeranya (Gdańsk batısı); Belarusça/Litvanca = Podlaskie doğu sınırı.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 2. İSVEÇ (21 İl - Län)
   * ======================================================================= */
  buildPack({
    id: 'isvec', name: 'İsveç', code: 'SE', area: 'Avrupa ve Avrasya', tone: 'blue',
    unitLabel: 'län (il)', groupLabel: 'tarihi ana kuşak', codeLabel: '01x–09x alan, 1xx–9xx posta ve Rv yolu',
    line: '21 län: güneyden kuzeye artan Riksväg 10–99 yolları, 01x–09x telefon ve 1xx–9xx posta kodu',
    blurb: 'Güneyden kuzeye düzenli büyüyen Riksväg 10–99 ulusal yolları, 1xx–9xx posta kodları, 01x–09x Riktnummer alan kodları ve yer ekleriyle 21 İsveç ili.',
    overviewLead: 'İsveç, GeoGuessr’da sayısal sistemi en düzenli ülkelerden biridir: mavi tabelalardaki Riksväg (ulusal yol) numaraları 11’den (en güney Skåne) 99’a (en kuzey Norrbotten) doğru güneyden kuzeye sırayla büyür; 5 haneli posta kodları (1xx xx–9xx xx) ve 01x–09x telefon kodları da aynı coğrafi sırayı izler.',
    quickTips: [
      'Mavi yol tabelasında 2 veya 3 haneli yol numarası: 10–29 (ve 100–199) = Güney (Skåne/Småland), 30–49 = Batı/Götaland, 50–79 = Orta İsveç (Svealand), 80–89 = Orta-Kuzey (Gävleborg/Jämtland/Västernorrland), 90–99 (ve 300–399) = Uzak Kuzey (Västerbotten/Norrbotten)!',
      '5 haneli posta kodu (XXX XX): 1xx Stockholm, 2xx Skåne/Blekinge, 3xx Halland/Småland, 4xx Göteborg/Bohuslän, 5xx Jönköping/Östergötland/Västergötland, 6xx Södermanland/Värmland/Gotland, 7xx Uppsala/Västmanland/Örebro/Dalarna, 8xx Gävleborg/Jämtland/Västernorrland, 9xx Västerbotten/Norrbotten.',
      'Telefon alan kodları (Riktnummer): 08 Stockholm, 031 Göteborg ve 03x Batı, 040 Malmö ve 04x Güney, 01x–02x Orta İsveç, 05x Värmland/Dalsland, 06x Orta-Kuzey, 09x Uzak Kuzey.'
    ],
    plan1: 'Riksväg 10–99 yol numaralarını, 1xx–9xx posta kodlarını ve 01x–09x telefon kuşaklarını öğren.',
    plan2: 'Falu kırmızısı evleri, Skåne kanola/tuğla ovalarını ve Kuzey Norrland huş/tayga biyomunu incele.',
    geoName: 'SE_GEO',
    themeCfg: {
      aria: 'İsveç 21 il haritası', fit: 'Tüm İsveç’i göster',
      grid: { lat: [55, 69, 2], lon: [11, 24, 3], txt: [56, 68, 2], refLon: 16, refLat: 62 },
      excludeWorld: ['Sweden', 'Norway', 'Finland', 'Denmark'],
      bg: [[19.5, 58.0, 'Baltık Denizi', 's'], [20.5, 63.0, 'Botni Körfezi', 's'], [9.5, 61.5, 'NORVEÇ', 'c'], [26.0, 64.0, 'FİNLANDİYA', 'c'], [10.0, 56.0, 'DANİMARKA', 'c']]
    },
    groups: [
      { id: 'gotaland', name: 'Götaland (Güney ve Batı İsveç)', short: 'Götaland (Güney)', color: '#1c5fa6', codeRange: '03x · 04x · 01x/05x · Posta 2xx–62x · Rv 11–47', desc: 'Skåne tarım ovaları, Göteborg batı kıyısı, Småland gölleri ve Gotland adası. Yol numaraları 11–47 ve 100–200 arasındadır.', keyCues: ['04x Güney (2xx–3xx), 03x Batı (3xx–5xx), 0498 Gotland (62x)', 'Riksväg 11–47 ve Länsväg 100–209 numaraları', 'Skåne beyaz/tuğla çiftlikler ve Småland -måla/-ryd/-hult yer ekleri'] },
      { id: 'svealand', name: 'Svealand (Stockholm ve Orta İsveç)', short: 'Svealand (Orta)', color: '#a86a00', codeRange: '08 · 01x–02x · 05x · Posta 1xx & 63x–79x · Rv 50–76', desc: 'Başkent Stockholm (08), Mälaren Gölü, Uppsala, Värmland ve Dalarna. Yol numaraları 50–76 ve 210–299 arasındadır.', keyCues: ['08 Stockholm (1xx), 018 Uppsala, 019 Örebro, 021 Västerås, 023 Falun, 054 Karlstad', 'Riksväg 50–76 ve Länsväg 210–299', 'Falu kırmızısı ahşap evler ve -bo/-ora/-torp yer ekleri'] },
      { id: 'norrland', name: 'Norrland (Kuzey İsveç ve Laponya)', short: 'Norrland (Kuzey)', color: '#0b6b3a', codeRange: '06x · 09x · 026 · Posta 8xx–9xx · Rv 83–99', desc: 'Ülkenin kuzeydeki %60’lık tayga, nehir ve tundra kuşağı. 06x Orta-Kuzey (8xx), 09x Uzak Kuzey (9xx). Yol numaraları 83–99 ve 300–400.', keyCues: ['060 Sundsvall, 063 Östersund, 090 Umeå, 0920 Luleå, 0980 Kiruna', 'Riksväg 83–99 ve Länsväg 300–399 numaraları', '-träsk, -sele, -fors, -järvi, -vaara yer ekleri ve ren geyiği levhaları'] }
    ],
    rawUnits: [
      ['m', 'Skåne', 'Skåne län', 'Malmö', 'gotaland', '040–046 · 21x xx–29x xx · Rv 11–24', 'se-skane-brick', '040 Malmö, Rv 11–24 & düz kanola/tuğla ovası', 'Malmö (040), Lund (046), Helsingborg (042), Kristianstad (044) kodlarını; 2xx xx posta kodunu, Rv 11–24 veya 100–119 yol numaralarını ve ağaçsız düz kanola tarlalarındaki beyaz/tuğla Danimarka tipi çiftlikleri arayın', 'Kuzeyindeki Småland (Kronoberg/Jönköping) çam ormanına ve kırmızı ahşap evlere geçer'],
      ['k', 'Blekinge', 'Blekinge län', 'Karlskrona', 'gotaland', '0454–0457 · 37x xx · E22 / Rv 27–29', 'se-falu-red', '0455 Karlskrona, 37x xx posta & E22 kıyısı', 'Karlskrona (0455), Ronneby (0457), Karlshamn (0454) kodlarını, 37x xx posta kodunu, Rv 27–29 yollarını ve meşe ağaçlı kayalık Baltık kıyı koylarını arayın', 'Skåne batıda 2xx xx posta kodunu kullanır'],
      ['g', 'Kronoberg', 'Kronobergs län', 'Växjö', 'gotaland', '0470–0479 / 0372 · 34x xx–36x xx · Rv 23/25/27/30', 'se-falu-red', '0470 Växjö, Rv 23–30 & -måla/-ryd ekleri', 'Växjö (0470), Ljungby (0372) kodlarını, 34x–36x posta kodunu, Rv 23/25/27/30 yollarını ve göl-çam ormanı içinde -måla, -ryd, -hult bitimli yer adlarını arayın', 'Kalmar doğuda Baltık kıyısındadır ve 0480/0490 kodlarını kullanır'],
      ['h', 'Kalmar', 'Kalmar län', 'Kalmar', 'gotaland', '0480–0499 · 38x xx–39x xx & 57x–59x · E22 / Rv 34/37', 'se-falu-red', '0480 Kalmar, Öland adası & E22/Rv 34', 'Kalmar (0480), Oskarshamn (0491), Västervik (0490), Öland (0485) kodlarını; E22 sahil yolunu ve Öland adasının taş duvarlı düz bozkır (Alvar) dokusunu arayın', 'Gotland (0498) açık denizdeki büyük kireçtaşı adasıdır'],
      ['i', 'Gotland', 'Gotlands län', 'Visby', 'gotaland', '0498 · 62x xx · Lv 140–149', 'se-skane-brick', '0498 alan kodu, 62x xx posta & beyaz kireçtaşı', 'Tüm adada tek tip 0498 sabit alan kodunu, 62x xx posta kodunu, 140–149 numaralı ada yollarını, beyaz kireçtaşı zemini ve bodur çamlarla taş yel değirmenlerini arayın', '0498 telefon kodu ve 62x xx posta kodu yalnızca Gotland adasına aittir'],
      ['n', 'Halland', 'Hallands län', 'Halmstad', 'gotaland', '035 / 0340 / 0346 / 0300 · 30x xx–31x xx / 43x · E6 / Rv 25–26', 'se-skane-brick', '035 Halmstad, 0340 Varberg & E6 batı kıyısı', 'Halmstad (035), Varberg (0340), Falkenberg (0346), Kungsbacka (0300) kodlarını, E6 otoyolunu ve Kattegat kıyısı kumlu plajlarla açık tarım kuşağını arayın', 'Jönköping doğuda iç orman platosudur ve 036/037x/038x kullanır'],
      ['f', 'Jönköping', 'Jönköpings län', 'Jönköping', 'gotaland', '036 / 0370 / 0380–0383 · 55x xx–57x xx · E4 / Rv 26–32/40', 'se-falu-red', '036 Jönköping, Vättern güney ucu & Rv 26–40', 'Jönköping (036), Värnamo (0370), Nässjö/Vetlanda (0380/0383) kodlarını, 55x–57x posta kodunu, Vättern Gölü güney kıyı otoyolunu (E4) ve Rv 26/27/30/31/32/40 kavşağını arayın', 'Östergötland kuzeydoğuda 013/011 telefon kuşağına geçer'],
      ['e', 'Östergötland', 'Östergötlands län', 'Linköping', 'gotaland', '013 / 011 / 014x · 58x xx–61x xx · E4 / Rv 32–35/50', 'se-falu-red', '013 Linköping, 011 Norrköping & düz tarım ovası', 'Linköping (013), Norrköping (011), Motala (0141) gibi 01x ile başlayan alan kodlarını, 58x–61x posta kodunu ve E4/Rv 34/35/50 üzerindeki geniş düz buğday ovalarını arayın', 'Västergötland Vättern Gölü’nün batısında 03x ve 05x telefon kodlarını kullanır'],
      ['o', 'Västra Götaland', 'Västra Götalands län', 'Göteborg', 'gotaland', '031 / 032x / 033 / 050x–052x · 40x xx–54x xx · E6/E20 / Rv 40–47', 'se-gul-chevron', '031 Göteborg, 05x Skaraborg & Rv 40–47', 'Göteborg (031, posta 40x–44x), Borås (033, 50x), Trollhättan/Uddevalla (0520/0522, 45x–46x), Skövde (0500, 54x) kodlarını; Rv 40–47 yollarını ve Bohuslän pembe çıplak granit kıyı kayalıklarını arayın', 'Halland güneyde 035/034x, Värmland kuzeyde 054/056x ve Rv 61–63 kullanır'],
      ['ab', 'Stockholm', 'Stockholms län', 'Stockholm', 'svealand', '08 · 10x xx–19x xx · E4/E18 / Rv 73/75/76', 'se-gul-chevron', '08 alan kodu, 1xx xx posta & mavi SL otobüsleri', 'Tüm ilde 08 sabit alan kodunu (kuzey/güney uçlarda 0176/08-5xx), 10x xx–19x xx posta kodunu, Rv 73/75/76 veya Lv 222–280 yollarını ve takımada/başkent mimarisini arayın', '08 alan kodu ve 1xx xx posta kodu yalnızca Stockholm iline aittir'],
      ['c', 'Uppsala', 'Uppsala län', 'Uppsala', 'svealand', '018 / 0171 / 029x · 74x xx–75x xx / 81x · E4 / Rv 55/70/72', 'se-falu-red', '018 Uppsala, 74x–75x posta & Rv 55/72', 'Uppsala (018), Enköping (0171), Tierp/Östhammar (0293/0173) kodlarını, 74x–75x posta kodunu ve Rv 55/72 ile Lv 272–292 yollarını arayın', 'Stockholm güneyde 08 ve 1xx xx posta kodunu kullanır'],
      ['d', 'Södermanland', 'Södermanlands län', 'Nyköping', 'svealand', '016 / 0155 / 0150 · 61x xx / 63x xx–64x xx · E4/E20 / Rv 52–57', 'se-falu-red', '016 Eskilstuna, 0155 Nyköping & Rv 52–57', 'Eskilstuna (016, 63x xx), Nyköping (0155, 611 xx), Katrineholm (0150, 641 xx) kodlarını; Rv 52, 53, 55, 56, 57 yollarını ve Mälaren-Hjälmaren göl malikanelerini arayın', 'Östergötland güneyde 011/013 ve Rv 32–35 kullanır'],
      ['u', 'Västmanland', 'Västmanlands län', 'Västerås', 'svealand', '021 / 022x · 72x xx–73x xx · E18 / Rv 56/66/68/70', 'se-falu-red', '021 Västerås, 72x–73x posta & Rv 56/66/68', 'Västerås (021), Köping/Sala/Fagersta (0221/0224/0223) kodlarını, 72x–73x posta kodunu ve Mälaren kuzey kıyısı sanayi-tarım kuşağını arayın', 'Örebro batıda 019/058x, Dalarna kuzeyde 023/024x/025x kullanır'],
      ['t', 'Örebro', 'Örebro län', 'Örebro', 'svealand', '019 / 058x · 69x xx–71x xx · E18/E20 / Rv 50–52/68', 'se-falu-red', '019 Örebro, 058x Bergslagen & Rv 50/51/68', 'Örebro (019, 70x xx), Karlskoga (0586), Lindesberg (0581), Askersund (0583) kodlarını; E18/E20 kavşağını ve Rv 50/51/68 yollarını arayın', 'Värmland batıda 054/056x ve 65x–68x posta koduna geçer'],
      ['s', 'Värmland', 'Värmlands län', 'Karlstad', 'svealand', '054 / 056x / 0570 / 0550 · 65x xx–68x xx · E18 / Rv 61–63', 'se-falu-red', '054 Karlstad, 65x–68x posta & Rv 61–63', 'Karlstad (054), Kristinehamn (0550), Arvika (0570), Torsby/Hagfors (0560/0563) kodlarını; 65x–68x posta kodunu, Rv 61/62/63 yollarını ve Vänern Gölü kuzey ormanlarını arayın', 'Rv 61, 62 ve 63 ulusal yolları yalnızca Värmland ilindedir'],
      ['w', 'Dalarna', 'Dalarnas län', 'Falun', 'svealand', '023 / 024x / 025x · 77x xx–79x xx · Rv 66/68/70', 'se-falu-red', '023 Falun, 024x/025x Siljan & Rv 66/70', 'Falun (023), Borlänge (0243), Mora (0250), Ludvika (0240) kodlarını; 77x–79x posta kodunu, Rv 66/68/70 yollarını ve Siljan Gölü çevresindeki klasik Falu kırmızısı ahşap köyleri arayın', 'Gävleborg doğuda 026/027x/065x ve 80x–82x posta kodunu kullanır'],
      ['x', 'Gävleborg', 'Gävleborgs län', 'Gävle', 'norrland', '026 / 027x / 065x · 80x xx–82x xx · E4 / Rv 50/68/83/84', 'se-falu-red', '026 Gävle, 065x Hälsingland & Rv 83/84', 'Güneyde Gävle/Sandviken (026, 80x–81x), kuzeyde Hudiksvall/Bollnäs/Ljusdal (0650/0278/0651, 82x xx) kodlarını; Rv 83 ve Rv 84 yollarını ve büyük ahşap Hälsingegårdar çiftlik evlerini arayın', 'Västernorrland kuzeyde 060/061x/062x ve 85x–89x posta koduna geçer'],
      ['y', 'Västernorrland', 'Västernorrlands län', 'Härnösand / Sundsvall', 'norrland', '060 / 061x / 0620 / 0660 · 85x xx–89x xx · E4 / Rv 86/87/90', 'se-norrland-birch', '060 Sundsvall, 0660 Örnsköldsvik & Rv 86/87/90', 'Sundsvall (060), Härnösand (0611), Sollefteå (0620), Örnsköldsvik (0660) kodlarını; 85x–89x posta kodunu, Rv 86/87/90 yollarını ve sarp Yüksek Kıyı (Höga Kusten) fiyortlarını arayın', 'Jämtland batıda iç dağ kuşağındadır ve 063/064x/068x ile 83x–84x posta kodunu kullanır'],
      ['z', 'Jämtland', 'Jämtlands län', 'Östersund', 'norrland', '063 / 064x / 067x / 068x · 83x xx–84x xx · E14 / E45 / Rv 84/87', 'se-norrland-birch', '063 Östersund, 83x–84x posta & E14/E45 dağları', 'Östersund (063), Åre (0647), Sveg (0680), Strömsund (0670) kodlarını; 83x–84x posta kodunu, Storsjön Gölü’nü ve Norveç sınırına yükselen Åre/Härjedalen dağlarını arayın', 'Västerbotten kuzeyde 090/091x/094x/095x (09x kuşağı) ve 90x–93x posta koduna geçer'],
      ['ac', 'Västerbotten', 'Västerbottens län', 'Umeå', 'norrland', '090 / 091x / 093x / 094x / 095x · 90x xx–93x xx · E4/E12/E45 / Rv 90/92/95', 'se-norrland-birch', '090 Umeå, 0910 Skellefteå & Rv 90/92/95', 'Umeå (090), Skellefteå (0910), Lycksele (0950), Vilhelmina (0940) kodlarını; 90x–93x posta kodunu, Rv 90/92/95 veya Lv 360–365 yollarını ve -träsk/-sele/-fors bitimli yer adlarını arayın', 'Norrbotten kuzeyde 092x/096x/097x/098x ve 94x–98x posta kodunu kullanır'],
      ['bd', 'Norrbotten', 'Norrbottens län', 'Luleå', 'norrland', '092x / 096x / 097x / 098x · 94x xx–98x xx · E4/E10/E45 / Rv 94/97/98/99', 'se-norrland-birch', '0920 Luleå, 0980 Kiruna, Rv 94–99 & -järvi/-vaara', 'Luleå (0920), Piteå (0911), Boden (0921), Gällivare (0970), Kiruna (0980) kodlarını; 94x–98x posta kodunu, Rv 94/97/98/99 yollarını ve Fince/Sámi kökenli -järvi, -vaara, -lompolo, -jokkmokk yer adlarını arayın', 'Rv 97, 98 ve 99 yol numaraları ile 94x–98x posta kodları yalnızca Norrbotten’dedir']
    ],
    topics: [
      {
        id: 'alan', label: 'Riksväg, Posta ve Kod', icon: 'phone',
        desc: 'Güneyden kuzeye Riksväg 10–99 yolları, 1xx–9xx posta ve 01x–09x telefon kodları',
        title: 'İsveç Sayısal Izgarası: Riksväg (10–99), Postnummer (1xx–9xx) ve Riktnummer',
        lead: 'İsveç’te yol numarası, posta kodu ve telefon alan kodu güneyden kuzeye aynı mantıkla büyür; tek bir mavi yol tabelası veya dükkan numarası sizi doğrudan doğru län üzerine bırakır.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: 'Rv 10..99', title: 'Riksväg (10–99) ve Länsväg (100–400) Güneyden Kuzeye Sırası', body: 'Nereye bakılır: Mavi tabeladaki 2 veya 3 haneli yol numarasına bakın: Rv 11–24 ve Lv 100–119 = Skåne; Rv 25–37 ve Lv 120–139 = Blekinge, Kronoberg, Kalmar, Halland, Jönköping; Lv 140–149 = Gotland; Rv 40–47 ve Lv 150–209 = Västra Götaland; Rv 50–76 ve Lv 210–299 = Svealand (Stockholm, Uppsala, Södermanland, Örebro, Västmanland, Värmland, Dalarna); Rv 83–90 ve Lv 300–359 = Gävleborg, Västernorrland, Jämtland; Rv 92–99 ve Lv 360–400 = Västerbotten ve Norrbotten!' },
          { badge: '01x..09x', title: 'Riktnummer (Telefon) ve Postnummer (1xx–9xx)', body: 'Nereye bakılır: Telefon kodunda 08 = Stockholm (posta 1xx), 04x = Güney (posta 2xx–3xx), 03x = Göteborg ve Batı (posta 3xx–5xx), 05x = Värmland ve Kuzey VG (posta 45x–68x), 01x–02x = Doğu/Orta İsveç (posta 58x–81x), 06x = Orta Norrland (posta 82x–89x), 09x = Uzak Kuzey Västerbotten ve Norrbotten (posta 90x–98x).' }
        ]
      },
      {
        id: 'saha', label: 'Mimari ve Yer Ekleri', icon: 'bulb',
        desc: 'Falu kırmızısı, mavi-sarı şevron, Skåne ovaları ve Norrland taygası',
        title: 'İsveç Saha İpuçları: Biyom ve Yer Adı Ekleri',
        lead: 'İsveç’in kırmızı-sarı çerçeveli uyarı levhaları ve mavi-sarı viraj şevronları ülkeyi anında verirken, yer adı ekleri güneyden kuzeye bölgeyi söyler.',
        drill: 'visual',
        visuals: [
          { id: 'se-falu-red', title: 'Falu Kırmızısı Ahşap Ev ve Mavi Yol Levhası', sub: 'Svealand ve İç Götaland · Dalarna, Värmland, Småland, Östergötland', badge: 'Orta & İç Kuşak', body: 'Nereye bakılır: Beyaz köşe tahtalı koyu kırmızı (Faluröd) ahşap evlere ve koyu mavi zeminli yön tabelalarına bakın.', regions: ['w', 's', 't', 'u', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'x'] },
          { id: 'se-gul-chevron', title: 'Mavi-Sarı Şevron ve Geniş Kesikli Kenar Çizgisi', sub: 'Stockholm (08) ve Västra Götaland (031)', badge: 'Ana Otoyol & Kent', body: 'Nereye bakılır: Virajlardaki mavi-sarı şevronlara, sarı-kırmızı uyarı üçgenlerine ve kesikli geniş beyaz banket çizgisine bakın.', regions: ['ab', 'o'] },
          { id: 'se-skane-brick', title: 'Güney İsveç (Skåne & Gotland) Açık Tarım ve Taş/Tuğla', sub: 'Skåne (04x), Halland (035) ve Gotland (0498)', badge: 'Güney (Rv 11–26)', body: 'Nereye bakılır: Çam ormanı yerine dümdüz sarı kanola/buğday tarlalarına ve beyaz sıvalı/tuğla çiftliklere bakın.', regions: ['m', 'n', 'i'] },
          { id: 'se-norrland-birch', title: 'Kuzey İsveç (Norrland) Tayga ve Turuncu Kar Çubuğu', sub: 'Norrbotten, Västerbotten, Jämtland, Västernorrland (06x / 09x)', badge: 'Kuzey (Rv 83–99)', body: 'Nereye bakılır: İnce huş-ladin taygasına, uzun turuncu kar çubuklarına, ren geyiği levhalarına ve -träsk/-sele/-järvi yer adlarına bakın.', regions: ['bd', 'ac', 'z', 'y'] }
        ],
        cards: [
          { badge: 'Toponimi', title: 'Yer Tabelalarında Güney-Orta-Kuzey Sonekleri', body: 'Nereye bakılır: Mavi yer tabelasının sonuna bakın: -arp, -rup, -löv, -tofta = Skåne; -måla, -ryd, -hult = Småland (Kronoberg/Kalmar/Jönköping); -bo, -ora, -hyttan = Dalarna ve Bergslagen; -träsk, -sele, -fors, -mark = Västerbotten; -järvi, -vaara, -jokk = Norrbotten.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 3. NORVEÇ (19 Fylke - Geleneksel İl Kuşağı)
   * ======================================================================= */
  buildPack({
    id: 'norvec', name: 'Norveç', code: 'NO', area: 'Avrupa ve Avrasya', tone: 'teal',
    unitLabel: 'fylke (il)', groupLabel: 'ana bölge (Landsdel)', codeLabel: '00xx–99xx posta ve Fv/Rv yolu',
    line: '19 fylke: 00xx–99xx posta kodları, sarı orta çizgi, Fv/Rv yolları ve fiyort/tundra dokusu',
    blurb: 'Oslo’dan (0xxx) Finnmark’a (9xxx) büyüyen 4 haneli posta kodları, sabit telefon kuşakları, sarı orta çizgi ve fiyort/tundra mimarisiyle 19 Norveç ili.',
    overviewLead: 'Norveç’te 4 haneli posta kodu (0001–9999) Oslo’dan başlayıp güney ve batı kıyılarını dolaşarak en kuzeydeki Finnmark’a (95xx–99xx) kadar düzenli artar; 8 haneli telefon numaralarının ilk iki rakamı (2x, 3x, 5x, 6x, 7x) ve Fylkesvei (Fv) yol numaraları da bölgeyi doğrudan verir.',
    quickTips: [
      '4 haneli posta kodu: 0xxx Oslo, 1xxx–2xxx Doğu Norveç (Østfold, Akershus, Hedmark, Oppland), 3xxx Buskerud/Vestfold/Telemark, 4xxx Agder ve Güney Rogaland (Stavanger), 5xxx Hordaland (Bergen), 6xxx Sogn og Fjordane ve Møre og Romsdal, 7xxx Trøndelag, 8xxx Nordland, 9xxx Troms ve Finnmark!',
      'Sabit telefon ilk rakamı: 2x Oslo/Akershus, 3x Güneydoğu (Buskerud/Vestfold/Telemark/Agder), 5x Batı Fiyortları (Rogaland/Hordaland/Sogn og Fjordane), 6x İç Doğu ve Østfold, 7x Møre og Romsdal, Trøndelag ve tüm Kuzey Norveç (75 Nordland, 77 Troms, 78 Finnmark).',
      'Norveç karayollarında iki yönü ayıran orta çizgi SARI renklidir; hız sınırı ve uyarı levhaları beyaz zeminli, yön levhaları sarı (tali) veya yeşil (E-yolu) zeminlidir.'
    ],
    plan1: '0xxx–9xxx 4 haneli posta kodlarını ve 2x/3x/5x/6x/7x telefon kuşaklarını öğren.',
    plan2: 'Sørlandet beyaz evlerini, Vestlandet derin fiyort tünellerini ve Finnmark tundra/Sámi tabelalarını incele.',
    geoName: 'NO_GEO',
    themeCfg: {
      aria: 'Norveç 19 fylke haritası', fit: 'Tüm Norveç’i göster',
      grid: { lat: [58, 71, 2], lon: [5, 31, 4], txt: [58, 70, 2], refLon: 12, refLat: 64 },
      excludeWorld: ['Norway', 'Sweden', 'Finland', 'Russia'],
      bg: [[2.5, 64.0, 'Norveç Denizi', 's'], [3.0, 58.5, 'Kuzey Denizi', 's'], [16.5, 63.0, 'İSVEÇ', 'c'], [26.5, 68.0, 'FİNLANDİYA', 'c']]
    },
    groups: [
      { id: 'ostlandet', name: 'Østlandet (Doğu Norveç ve Oslo)', short: 'Østlandet (Doğu)', color: '#1c5fa6', codeRange: 'Tel 2x / 31–35 / 6x · Posta 0xxx–39xx', desc: 'Oslo fiyordu, geniş orman ve tahıl vadileri (Gudbrandsdalen, Østerdalen) ve Telemark.', keyCues: ['Oslo 0xxx (Tel 2x), Akershus/Østfold 1xxx (Tel 6x)', 'Hedmark/Oppland 2xxx (Tel 61/62), Buskerud/Vestfold/Telemark 3xxx (Tel 31–35)', 'Geniş sarıçam/ladin ormanları ve açık sarı buğday tarlaları'] },
      { id: 'sorlandet', name: 'Sørlandet (Güney Kıyısı · Agder)', short: 'Sørlandet (Güney)', color: '#a86a00', codeRange: 'Tel 37 / 38 · Posta 44xx–49xx · E18 / E39', desc: 'Aust-Agder ve Vest-Agder. Güneşli kayalık koylar ve bembeyaz boyalı ahşap kıyı kasabaları.', keyCues: ['Posta kodu 44xx–49xx ve telefon 37 (Aust-Agder) / 38 (Vest-Agder)', 'E18 ve E39 sahil koridoru, Rv 9 Setesdal vadisi', 'Bembeyaz boyalı ahşap evler (Sørlandshus) ve meşe koruları'] },
      { id: 'vestlandet', name: 'Vestlandet (Batı Fiyortları)', short: 'Vestlandet (Batı)', color: '#0e7a80', codeRange: 'Tel 51–57 / 70–71 · Posta 40xx–43xx & 5xxx–65xx', desc: 'Rogaland, Hordaland, Sogn og Fjordane ve Møre og Romsdal. Derin fiyortlar, şelaleler, feribot iskeleleri ve kaya tünelleri.', keyCues: ['Stavanger 40xx–43xx (Tel 51/52), Bergen/Hordaland 5xxx (Tel 53–56)', 'Sogn og Fjordane 67xx–69xx (Tel 57), Møre og Romsdal 60xx–66xx (Tel 70/71)', 'Sarp fiyort duvarları, E39 feribotları ve kaba kaya tünelleri'] },
      { id: 'trondelag', name: 'Trøndelag (Orta Norveç)', short: 'Trøndelag (Orta)', color: '#5b3fa0', codeRange: 'Tel 72–74 · Posta 70xx–79xx · E6 / E14', desc: 'Sør-Trøndelag (Trondheim) ve Nord-Trøndelag. Trondheimsfjord çevresinde verimli tarım arazileri ve uzun kırmızı ambarlar.', keyCues: ['Tüm bölgede 7xxx posta kodu ve 72/73 (Güney) veya 74 (Kuzey) telefon kodu', 'E6 kuzey-güney omurgası ve Fv 17 sahil yolu', 'Uzun kırmızı ahşap çiftlik binaları (Trønderlån)'] },
      { id: 'nord-norge', name: 'Nord-Norge (Kuzey Norveç ve Arktik)', short: 'Nord-Norge (Kuzey)', color: '#0b6b3a', codeRange: 'Tel 75–78 · Posta 80xx–99xx · E6 / E10 / E69', desc: 'Nordland (8xxx, Tel 75/76), Troms (90xx–94xx, Tel 77) ve Finnmark (95xx–99xx, Tel 78). Sivri granit adalar ve arktik tundra.', keyCues: ['8xxx Nordland (Tel 75/76), 90xx–94xx Troms (Tel 77), 95xx–99xx Finnmark (Tel 78)', 'Lofoten dik granit zirveleri, kırmızı balıkçı kulübeleri (rorbu)', 'Finnmark ağaçsız tundra platosu ve Norveççe-Sámi-Kven çift/üç dilli tabelalar'] }
    ],
    rawUnits: [
      ['01', 'Østfold', 'Østfold', 'Sarpsborg / Fredrikstad', 'ostlandet', 'Tel 69 · Posta 15xx–18xx · E6 / Rv 22', 'no-white-sorlandet', 'Tel 69, Posta 15xx–18xx & düz İsveç sınırı', 'Tabelalarda 69 ile başlayan 8 haneli sabit telefonları, 15xx–18xx posta kodunu ve Oslo Fiyordu doğusundaki düz tarım arazilerini arayın', 'Akershus kuzeyde 63/64/66/67 telefon ve 13xx–14xx / 19xx–20xx posta kodunu kullanır'],
      ['02', 'Akershus', 'Akershus', 'Lillestrøm / Bærum', 'ostlandet', 'Tel 63–67 · Posta 13xx–14xx & 19xx–20xx · E6 / E18', 'no-fylkesvei', 'Tel 63–67, Posta 13xx–20xx & Oslo banliyöleri', 'Oslo’yu çevreleyen banliyö ve tarım kuşağında 63, 64, 66, 67 telefon öneklerini ve 13xx–14xx veya 19xx–20xx posta kodunu arayın', 'Oslo merkez 2x telefon ve 0xxx posta kodunu kullanır'],
      ['03', 'Oslo', 'Oslo', 'Oslo', 'ostlandet', 'Tel 21–24 · Posta 00xx–12xx · Ring 1–3', 'no-fylkesvei', 'Tel 2x, Posta 0xxx & Ring 1/2/3 tabelaları', 'Her dükkan ve ofiste 21/22/23/24 ile başlayan sabit numaraları, 00xx–12xx posta kodunu, kırmızı Ruter otobüs/tramvaylarını ve Ring 1–3 çevre yolu tabelalarını arayın', '0xxx ile başlayan posta kodu yalnızca Oslo’ya aittir'],
      ['04', 'Hedmark', 'Hedmark (Innlandet Doğu)', 'Hamar', 'ostlandet', 'Tel 62 · Posta 21xx–25xx · Rv 3 / E6', 'no-fylkesvei', 'Tel 62, Posta 21xx–25xx & Rv 3 Østerdalen ormanı', '62 ile başlayan sabit numaraları, 21xx–25xx posta kodunu, Mjøsa Gölü doğu tarım kıyılarını ve Rv 3 boyunca uzanan uçsuz bucaksız Østerdalen çam ormanlarını arayın', 'Oppland batıda 61 telefon ve 26xx–29xx posta kodunu kullanır'],
      ['05', 'Oppland', 'Oppland (Innlandet Batı)', 'Lillehammer', 'ostlandet', 'Tel 61 · Posta 26xx–29xx · E6 / Rv 4 / Fv 51', 'no-fylkesvei', 'Tel 61, Posta 26xx–29xx & Gudbrandsdalen/Jotunheimen', '61 ile başlayan sabit telefonları, 26xx–29xx posta kodunu, E6 Gudbrandsdalen vadisini ve Jotunheimen yüksek dağ platolarını arayın', 'Hedmark doğuda daha alçak ormanlıktır ve Tel 62 / Posta 21xx–25xx taşır'],
      ['06', 'Buskerud', 'Buskerud', 'Drammen', 'ostlandet', 'Tel 32 (31) · Posta 30xx / 33xx–36xx · E134 / Rv 7', 'no-fylkesvei', 'Tel 32, Posta 30xx/35xx & Rv 7 Hallingdal', 'Drammen, Kongsberg, Hønefoss ve Geilo/Hallingdal kuşağında 32 ile başlayan telefonları, 30xx veya 33xx–36xx posta kodunu ve Rv 7 / E134 dağ geçişlerini arayın', 'Vestfold güneyde kıyıdadır ve Tel 33 / Posta 31xx–32xx kullanır'],
      ['07', 'Vestfold', 'Vestfold', 'Tønsberg', 'ostlandet', 'Tel 33 · Posta 31xx–32xx · E18', 'no-white-sorlandet', 'Tel 33, Posta 31xx–32xx & Oslo Fiyordu batı kıyısı', 'Tønsberg, Sandefjord, Larvik ve Horten kuşağında 33 ile başlayan sabit telefonları, 31xx–32xx posta kodunu ve E18 boyunca yumuşak tarım/kıyı dokusunu arayın', 'Telemark batıda dağlıktır ve Tel 35 / Posta 36xx–39xx kullanır'],
      ['08', 'Telemark', 'Telemark', 'Skien', 'ostlandet', 'Tel 35 · Posta 36xx–39xx · E134 / Rv 36', 'no-fylkesvei', 'Tel 35, Posta 36xx–39xx & sarp iç vadiler', 'Skien/Porsgrunn, Notodden ve Rjukan’da 35 ile başlayan sabit telefonları, 36xx–39xx posta kodunu, ahşap stavkirke/ambar mimarisini ve E134 dağ yolunu arayın', 'Aust-Agder güneybatıda Tel 37 ve Posta 48xx–49xx kuşağına geçer'],
      ['09', 'Aust-Agder', 'Aust-Agder', 'Arendal', 'sorlandet', 'Tel 37 · Posta 47xx–49xx · E18 / Rv 9', 'no-white-sorlandet', 'Tel 37, Posta 47xx–49xx, beyaz kıyı evleri & Rv 9', 'Arendal, Grimstad, Risør ve Setesdal vadisinde 37 ile başlayan sabit telefonları, 47xx–49xx posta kodunu, bembeyaz ahşap sahil kasabalarını ve Rv 9 vadisini arayın', 'Vest-Agder batıda Tel 38 ve Posta 44xx–46xx kullanır'],
      ['10', 'Vest-Agder', 'Vest-Agder', 'Kristiansand', 'sorlandet', 'Tel 38 · Posta 44xx–46xx · E39 / Rv 9', 'no-white-sorlandet', 'Tel 38, Posta 44xx–46xx & Kristiansand/Mandal', 'Kristiansand, Mandal, Flekkefjord ve Farsund’da 38 ile başlayan sabit telefonları, 44xx–46xx posta kodunu ve E39 güney sahil virajlarını arayın', 'Rogaland kuzeybatıda Tel 51/52 ve Posta 40xx–43xx kuşağına geçer'],
      ['11', 'Rogaland', 'Rogaland', 'Stavanger', 'vestlandet', 'Tel 51 / 52 · Posta 40xx–43xx / 55xx · E39 / Rv 13', 'no-fjord-tunnel', 'Tel 51/52, Posta 40xx–43xx & Jæren düz kıyı meraları', 'Stavanger/Sandnes (Tel 51, Posta 40xx–43xx) ve Haugesund (Tel 52, Posta 55xx) kodlarını; güneyde taş duvarlı düz yeşil Jæren otlaklarını, doğuda Lysefjord/Ryfylke sarp fiyortlarını arayın', 'Hordaland kuzeyde 50xx–54xx/56xx–59xx posta ve Tel 53–56 kullanır'],
      ['12', 'Hordaland', 'Hordaland (Vestland Güney)', 'Bergen', 'vestlandet', 'Tel 55 / 53 / 56 · Posta 50xx–54xx & 56xx–59xx · E16 / E39 / Rv 7', 'no-fjord-tunnel', 'Tel 55 Bergen, Posta 5xxx & Hardanger fiyort/tünelleri', 'Bergen (Tel 55, Posta 50xx–53xx), Voss/Hardanger/Stord (Tel 53/56, Posta 54xx/56xx–59xx) kodlarını; dik fiyort kıyılarını, elma bahçelerini ve Hardangervidda çıplak yaylasını arayın', 'Sogn og Fjordane kuzeyde Tel 57 ve Posta 67xx–69xx kullanır'],
      ['14', 'Sogn og Fjordane', 'Sogn og Fjordane (Vestland Kuzey)', 'Hermansverk / Førde', 'vestlandet', 'Tel 57 · Posta 67xx–69xx · E39 / Rv 5 / Rv 15', 'no-fjord-tunnel', 'Tel 57, Posta 67xx–69xx & Sognefjord/Nordfjord', 'Tüm ilde tek tip 57 telefon önekini, 67xx–69xx posta kodunu, Rv 5 / Rv 15 / E39 tünellerini ve turkuaz buzul gölleriyle Norveç’in en derin fiyort duvarlarını arayın', 'Møre og Romsdal kuzeyde Tel 70/71 ve Posta 60xx–66xx kuşağına geçer'],
      ['15', 'Møre og Romsdal', 'Møre og Romsdal', 'Molde / Ålesund', 'vestlandet', 'Tel 70 / 71 · Posta 60xx–66xx · E39 / E136', 'no-fjord-tunnel', 'Tel 70/71, Posta 60xx–66xx & sivri Sunnmøre Alpleri', 'Ålesund/Sunnmøre (Tel 70, Posta 60xx–62xx) ve Molde/Kristiansund (Tel 71, Posta 63xx–66xx) kodlarını, Atlantik Yolu ada köprülerini ve sarp Romsdalen/Sunnmøre zirvelerini arayın', 'Sør-Trøndelag doğuda 70xx–75xx posta ve Tel 72/73 kullanır'],
      ['16', 'Sør-Trøndelag', 'Sør-Trøndelag', 'Trondheim', 'trondelag', 'Tel 72 / 73 · Posta 70xx–75xx · E6 / Rv 3', 'no-fylkesvei', 'Tel 72/73 Trondheim, Posta 70xx–75xx & kırmızı ambarlar', 'Trondheim (Tel 73, Posta 70xx) ve Røros/Orkdal/Oppdal (Tel 72, Posta 72xx–75xx) kodlarını; geniş Trondheimsfjord tarım kıyılarını ve uzun kırmızı çiftlik evlerini arayın', 'Nord-Trøndelag kuzeyde Tel 74 ve Posta 76xx–79xx kullanır'],
      ['17', 'Nord-Trøndelag', 'Nord-Trøndelag', 'Steinkjer', 'trondelag', 'Tel 74 · Posta 76xx–79xx · E6 / E14 / Fv 17', 'no-fylkesvei', 'Tel 74, Posta 76xx–79xx & E6/Fv 17 orman-fiyort', 'Stjørdal, Levanger, Steinkjer ve Namsos’ta 74 ile başlayan sabit telefonları, 76xx–79xx posta kodunu ve E6 boyunca uzanan ladin ormanlarıyla iç fiyort tarlalarını arayın', 'Nordland kuzey sınırında "Nord-Norge" kapısıyla 8xxx posta ve Tel 75/76 kuşağına geçer'],
      ['18', 'Nordland', 'Nordland', 'Bodø', 'nord-norge', 'Tel 75 / 76 · Posta 80xx–89xx · E6 / E10 / Fv 17', 'no-finnmark-tundra', 'Tel 75/76, Posta 8xxx & Lofoten/Helgeland sivri zirveleri', 'Bodø/Mo i Rana/Narvik (Tel 75/76) kodlarını, 80xx–89xx posta kodunu, E10 Lofoten okyanus köprülerini, kırmızı balıkçı kulübelerini (rorbu) ve denizden bıçak gibi yükselen granit dağları arayın', '8xxx ile başlayan tüm posta kodları yalnızca Nordland iline aittir'],
      ['19', 'Troms', 'Troms / Romsa', 'Tromsø', 'nord-norge', 'Tel 77 · Posta 90xx–94xx · E6 / E8', 'no-finnmark-tundra', 'Tel 77, Posta 90xx–94xx & Lyngen Alpleri / bodur huş', 'Tromsø, Harstad ve Finnsnes’te 77 ile başlayan sabit telefonları, 90xx–94xx posta kodunu, bodur huş ağaçlı karlı fiyortları ve Norveççe-Sámi çift dilli yer tabelalarını arayın', 'Finnmark doğuda Tel 78, Posta 95xx–99xx ve tamamen ağaçsız tundra platosuna geçer'],
      ['20', 'Finnmark', 'Finnmark / Finnmárku', 'Vadsø / Alta', 'nord-norge', 'Tel 78 · Posta 95xx–99xx · E6 / E69 / E75', 'no-finnmark-tundra', 'Tel 78, Posta 95xx–99xx, ağaçsız tundra & Sámi tabela', 'Alta, Hammerfest, Honningsvåg (Nordkapp), Kirkenes ve Karasjok’ta 78 ile başlayan sabit telefonları, 95xx–99xx posta kodunu, tek bir ağaç bile olmayan düz arktik tundra/kayalık kıyıyı ve Sámi çift/üç dilli tabelaları arayın', 'Tel 78 ve 95xx–99xx posta kodu yalnızca en kuzeydeki Finnmark ilinde kullanılır']
    ],
    topics: [
      {
        id: 'alan', label: 'Posta, Telefon ve Yol', icon: 'phone',
        desc: '00xx–99xx 4 haneli posta kodu, 2x–7x sabit telefon ve E/Rv/Fv yolları',
        title: 'Norveç 4 Haneli Posta Kodu (00xx–99xx) ve Telefon Kuşakları',
        lead: 'Norveç’te posta kodları 4 hanelidir ve saat yönünün tersine ülkeyi dolaşarak 0xxx’ten (Oslo) 9xxx’e (Troms ve Finnmark) kadar kusursuz yükselir.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '0xxx..9xxx', title: '4 Haneli Posta Kodu İlk Rakamı = Doğrudan Fylke', body: 'Nereye bakılır: Dükkan, kargo ve resmi tabelalardaki 4 haneli posta koduna bakın: 0xxx = Oslo; 1xxx = Akershus ve Østfold; 2xxx = Hedmark ve Oppland (Innlandet); 3xxx = Buskerud, Vestfold ve Telemark; 40xx–43xx = Rogaland (Stavanger); 44xx–49xx = Vest-Agder ve Aust-Agder; 5xxx = Hordaland (Bergen); 60xx–66xx = Møre og Romsdal; 67xx–69xx = Sogn og Fjordane; 7xxx = Sør- ve Nord-Trøndelag; 8xxx = Nordland; 90xx–94xx = Troms; 95xx–99xx = Finnmark!' },
          { badge: 'Tel 2x..78', title: '8 Haneli Sabit Telefon Numarası İlk 2 Rakamı', body: 'Nereye bakılır: Telefon numarasının ilk iki rakamına bakın: 21–24 Oslo; 31–32 Buskerud, 33 Vestfold, 35 Telemark, 37 Aust-Agder, 38 Vest-Agder; 51–52 Rogaland, 53/55/56 Hordaland, 57 Sogn og Fjordane; 61 Oppland, 62 Hedmark, 63–67 Akershus, 69 Østfold; 70–71 Møre og Romsdal, 72–73 Sør-Trøndelag, 74 Nord-Trøndelag, 75–76 Nordland, 77 Troms, 78 Finnmark.' }
        ]
      },
      {
        id: 'saha', label: 'Fiyort, Çizgi ve Mimari', icon: 'bulb',
        desc: 'Sarı orta çizgi, beyaz Sørlandet evleri, Batı fiyort tünelleri ve Finnmark tundrası',
        title: 'Norveç Saha İpuçları: Fiyort, Tundra ve Bölgesel Mimari',
        lead: 'Norveç’te asfalt üzerindeki sarı orta çizgi ülkeyi İsveç ve Finlandiya’dan ayırırken; ağaç sınırı, kaya tipi ve ev rengi 5 ana bölgeyi (Landsdel) netleştirir.',
        drill: 'visual',
        visuals: [
          { id: 'no-fylkesvei', title: 'Sarı Orta Çizgi ve Fv/Rv Yol Levhası', sub: 'Østlandet ve Trøndelag · Oslo, Innlandet, Trøndelag', badge: 'Sarı Orta Çizgi', body: 'Nereye bakılır: Asfaltın ortasındaki uzun kesikli sarı şerit çizgisine, beyaz Fv/Rv yol kutularına ve ladin/tarım vadilerine bakın.', regions: ['02', '03', '04', '05', '06', '08', '16', '17'] },
          { id: 'no-white-sorlandet', title: 'Güney Kıyısı (Sørlandet) Bembeyaz Ahşap Evler', sub: 'Aust-Agder (Tel 37), Vest-Agder (Tel 38), Vestfold, Østfold', badge: 'Güney Kıyısı', body: 'Nereye bakılır: Güney sahil koylarında kümeleşmiş bembeyaz ahşap evlere, meşe ağaçlarına ve alçak granit adacıklara bakın.', regions: ['09', '10', '07', '01'] },
          { id: 'no-fjord-tunnel', title: 'Batı Norveç (Vestlandet) Sarp Fiyort ve Kaya Tüneli', sub: 'Rogaland, Hordaland, Sogn og Fjordane, Møre og Romsdal', badge: 'Batı Fiyortları', body: 'Nereye bakılır: Denize dimdik inen 1000 metrelik dağ duvarlarına, sıvasız karanlık kaya tünel girişlerine ve E39 feribot iskelelerine bakın.', regions: ['11', '12', '14', '15'] },
          { id: 'no-finnmark-tundra', title: 'Kuzey Norveç (Nord-Norge) Arktik Tundra ve Lofoten', sub: 'Nordland (8xxx), Troms (90xx–94xx), Finnmark (95xx–99xx)', badge: 'Arktik Kuzey', body: 'Nereye bakılır: Sivri arktik kıyı zirvelerine, bodur huş veya tamamen ağaçsız tundra platosuna, kar siperlerine ve Sámi çift dilli tabelalara bakın.', regions: ['18', '19', '20'] }
        ],
        cards: [
          { badge: 'Ağaç Sınırı', title: 'Ladin Ormanı vs Bodur Huş vs Çıplak Tundra', body: 'Nereye bakılır: Uzun sık ladin ve sarıçam ormanları Østlandet, Trøndelag ve Güney Nordland’da biter. Troms ve Lofoten’de yalnızca alçak bodur huş ağaçları görülür. Finnmark kıyısı ve yaylasında ise ağaç tamamen kaybolur; yerini yosunlu çıplak tundra ve yatay katmanlı arktik kayalar alır.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 4. ROMANYA (42 İl - Județe)
   * ======================================================================= */
  var RO_RAW = [
    ['b', 'Bükreş', 'Municipiul București', 'Bükreş', 'muntenia-dobruca', '021 / 031 · 01xxxx–06xxxx', 'ro-muntenia-plain', '021/031 kodu & 01xxxx–06xxxx posta', 'Tabelalarda 021/031 alan kodunu, Sector 1–6 yazan sokak plakalarını ve geniş sosyalist bulvarlarla sarı-gri blokları arayın', 'Çevresindeki Ilfov ili 07xxxx posta kodunu kullanır'],
    ['if', 'Ilfov', 'Județul Ilfov', 'Buftea / Bükreş', 'muntenia-dobruca', '021 / 031 · 07xxxx · DN1–DN7', 'ro-muntenia-plain', '021 kodu, 07xxxx posta & Bükreş çevre kuşağı', 'Bükreş’i saran lojistik depolarda ve banliyölerde 021 alan kodunu, 07xxxx posta kodunu ve IF il kısaltmasını arayın', 'Bükreş merkez Sector 1–6 ve 01xxxx–06xxxx posta koduyla ayrılır'],
    ['ph', 'Prahova', 'Județul Prahova', 'Ploiești', 'muntenia-dobruca', '0244 / 0344 · 10xxxx · DN1 / A3', 'ro-km-stone', '0244 Ploiești, 10xxxx posta & Prahova Vadisi', '0244 alan kodunu, 10xxxx posta kodunu, Ploiești petrol rafinerilerini ve Sinaia/Bușteni Karpat dağ geçidini (DN1) arayın', 'Brașov kuzeyde geçidin ardında 0268 ve Transilvanya mimarisine geçer'],
    ['ag', 'Argeș', 'Județul Argeș', 'Pitești', 'muntenia-dobruca', '0248 / 0348 · 11xxxx · A1 / DN7C', 'ro-km-stone', '0248 Pitești, 11xxxx posta & Transfăgărășan', '0248 alan kodunu, 11xxxx posta kodunu, Dacia otomotiv yan sanayi tabelalarını ve Güney Karpat erik/meyve vadilerini arayın', 'Vâlcea batıda Olt Vadisi ve 0250 alan kodunu kullanır'],
    ['bz', 'Buzău', 'Județul Buzău', 'Buzău', 'muntenia-dobruca', '0238 / 0338 · 12xxxx · DN2 (E85)', 'ro-whitewash-tree', '0238 kodu, 12xxxx posta & DN2/E85 aksı', '0238 alan kodunu (Muntenia’da 023x kullanan istisna il), 12xxxx posta kodunu ve Karpat eteklerinden Bărăgan ovasına inen geçişi arayın', 'Vrancea kuzeyde 0237 ve 62xxxx posta kodunu kullanır'],
    ['db', 'Dâmbovița', 'Județul Dâmbovița', 'Târgoviște', 'muntenia-dobruca', '0245 / 0345 · 13xxxx · DN71 / DN72', 'ro-whitewash-tree', '0245 Târgoviște & 13xxxx posta kodu', '0245 alan kodunu, 13xxxx posta kodunu ve yoğun kireç boyalı meyve ağaçlarıyla Bükreş kuzeybatı eteklerini arayın', 'Prahova doğuda 0244 ve 10xxxx posta kodundadır'],
    ['tr', 'Teleorman', 'Județul Teleorman', 'Alexandria', 'muntenia-dobruca', '0247 / 0347 · 14xxxx · DN6', 'ro-muntenia-plain', '0247 Alexandria, 14xxxx posta & düz Tuna ovası', '0247 alan kodunu, 14xxxx posta kodunu ve Tuna’ya kadar uzanan dümdüz ayçiçeği/buğday tarlalarını arayın', 'Giurgiu doğuda 0246 ve 08xxxx posta kodunu kullanır'],
    ['gr', 'Giurgiu', 'Județul Giurgiu', 'Giurgiu', 'muntenia-dobruca', '0246 / 0346 · 08xxxx · DN5 (E70/E85)', 'ro-muntenia-plain', '0246 Giurgiu, 08xxxx posta & DN5 Bulgaristan yolu', '0246 alan kodunu, 08xxxx posta kodunu ve Bükreş’ten Rusçuk sınır köprüsüne inen düz DN5 tır koridorunu arayın', 'Călărași doğuda 0242 ve 91xxxx posta kodundadır'],
    ['br', 'Brăila', 'Județul Brăila', 'Brăila', 'muntenia-dobruca', '0239 / 0339 · 81xxxx · DN2B / DN21', 'ro-muntenia-plain', '0239 Brăila, 81xxxx posta & Bărăgan/Tuna düzlüğü', '0239 alan kodunu, 81xxxx posta kodunu ve Tuna batısında cetvelle çizilmiş dümdüz Bărăgan bozkır tarlalarını arayın', 'Galați hemen kuzeyde 0236 ve 80xxxx posta kodunu kullanır'],
    ['il', 'Ialomița', 'Județul Ialomița', 'Slobozia', 'muntenia-dobruca', '0243 / 0343 · 92xxxx · A2 / DN2A', 'ro-muntenia-plain', '0243 Slobozia, 92xxxx posta & Bărăgan tahıl ovası', '0243 alan kodunu, 92xxxx posta kodunu ve A2/DN2A boyunca uzanan ağaçsız sarı Bărăgan mısır/ayçiçeği ovasını arayın', 'Călărași güneyde 0242 ve 91xxxx posta kodundadır'],
    ['cl', 'Călărași', 'Județul Călărași', 'Călărași', 'muntenia-dobruca', '0242 / 0342 · 91xxxx · A2 / DN3', 'ro-muntenia-plain', '0242 Călărași, 91xxxx posta & A2 Güneş Otoyolu', '0242 alan kodunu, 91xxxx posta kodunu ve Tuna kolları ile A2 otoyolu arasındaki düz tarım kuşağını arayın', 'Constanța Tuna’nın doğusunda 0241 ve 90xxxx posta koduna geçer'],
    ['ct', 'Constanța', 'Județul Constanța', 'Köstence', 'muntenia-dobruca', '0241 / 0341 · 90xxxx · A2 / DN39', 'ro-muntenia-plain', '0241 Köstence, 90xxxx posta, Karadeniz & rüzgar türbinleri', '0241 alan kodunu, 90xxxx posta kodunu, Tuna-Karadeniz Kanalı köprülerini, yoğun rüzgar türbinlerini ve kurak Dobruca kireçtaşı bozkırını arayın', 'Tulcea kuzeyde 0240 ve 82xxxx posta kodunu kullanır'],
    ['tl', 'Tulcea', 'Județul Tulcea', 'Tulcea', 'muntenia-dobruca', '0240 / 0340 · 82xxxx · DN22', 'ro-muntenia-plain', '0240 Tulcea, 82xxxx posta & Tuna Deltası/Măcin', '0240 alan kodunu, 82xxxx posta kodunu, aşınmış Măcin granit tepelerini, sazlık kanalları ve mavi-beyaz Lipovan balıkçı evlerini arayın', '0240 alan kodu yalnızca Tulcea iline aittir'],
    ['dj', 'Dolj', 'Județul Dolj', 'Craiova', 'oltenia', '0251 / 0351 · 20xxxx · DN6 / DN55', 'ro-whitewash-tree', '0251 Craiova, 20xxxx posta & Oltenia ovası', '0251 alan kodunu, 20xxxx posta kodunu ve Güney Oltenia’nın düz kumlu tarım ovalarıyla süslü tuğla köy evlerini arayın', 'Olt doğuda 0249, Mehedinți batıda 0252 alan kodunu kullanır'],
    ['gj', 'Gorj', 'Județul Gorj', 'Târgu Jiu', 'oltenia', '0253 / 0353 · 21xxxx · DN66 / DN67', 'ro-whitewash-tree', '0253 Târgu Jiu, 21xxxx posta & Jiu maden vadisi', '0253 alan kodunu, 21xxxx posta kodunu, açık ocak linyit madenlerini ve Karpat eteklerinde ahşap sundurmalı Oltenia evlerini arayın', 'Hunedoara kuzeyde Jiu geçidinin ardında 0254 ve Transilvanya dokusuna geçer'],
    ['mh', 'Mehedinți', 'Județul Mehedinți', 'Drobeta-Turnu Severin', 'oltenia', '0252 / 0352 · 22xxxx · DN6 (Demir Kapı)', 'ro-km-stone', '0252 Drobeta, 22xxxx posta & Tuna Demir Kapı boğazı', '0252 alan kodunu, 22xxxx posta kodunu ve Sırbistan karşısında Tuna Nehri Demir Kapı (Porțile de Fier) baraj/boğaz kıyısını arayın', 'Caraș-Severin kuzeybatıda 0255 ve 32xxxx posta kodunu kullanır'],
    ['ot', 'Olt', 'Județul Olt', 'Slatina', 'oltenia', '0249 / 0349 · 23xxxx · DN65 / DN6', 'ro-muntenia-plain', '0249 Slatina, 23xxxx posta & Aşağı Olt ovası', '0249 alan kodunu, 23xxxx posta kodunu ve Olt Nehri baraj gölleri boyunca uzanan düz tarım köylerini arayın', 'Dolj batıda 0251, Teleorman doğuda 0247 alan kodunu kullanır'],
    ['vl', 'Vâlcea', 'Județul Vâlcea', 'Râmnicu Vâlcea', 'oltenia', '0250 / 0350 · 24xxxx · DN7 (Olt Vadisi)', 'ro-km-stone', '0250 Râmnicu Vâlcea, 24xxxx posta & DN7 Olt kanyonu', '0250 alan kodunu, 24xxxx posta kodunu ve Karpatları yaran dar DN7 Olt Nehri vadisiyle kaplıca kasabalarını arayın', 'Sibiu kuzeyde kanyon çıkışında 0269 ve kapalı avlulu Sakson evlerine geçer'],
    ['tm', 'Timiș', 'Județul Timiș', 'Timișoara', 'bati-banat', '0256 / 0356 · 30xxxx · A1 / DN6 / DN59', 'ro-transylvania-gate', '0256 Timișoara, 30xxxx posta & düz Banat/Habsburg evleri', '0256 alan kodunu, 30xxxx posta kodunu, dümdüz Banat ovasını ve sokağa bitişik yüksek alınlıklı pastel sarı/yeşil Svabya-Habsburg köy evlerini arayın', 'Arad kuzeyde Mureș Nehri boyunca 0257 ve 31xxxx posta kodunu kullanır'],
    ['ar', 'Arad', 'Județul Arad', 'Arad', 'bati-banat', '0257 / 0357 · 31xxxx · A1 / DN7 / DN79', 'ro-transylvania-gate', '0257 Arad, 31xxxx posta & Batı sınır ovası', '0257 alan kodunu, 31xxxx posta kodunu ve Macaristan sınırından Apuseni eteklerine uzanan Mureș koridorunu arayın', 'Bihor kuzeyde 0259 ve 41xxxx posta kodunu kullanır'],
    ['cs', 'Caraș-Severin', 'Județul Caraș-Severin', 'Reșița', 'bati-banat', '0255 / 0355 · 32xxxx · DN6 (E70)', 'ro-km-stone', '0255 Reșița/Caransebeș, 32xxxx posta & Banat Dağları', '0255 alan kodunu, 32xxxx posta kodunu ve ormanlık Banat Dağları ile Tuna kanyonu arasındaki vadileri arayın', 'Timiș kuzeybatıda dümdüz ovadır ve 0256 kullanır'],
    ['bh', 'Bihor', 'Județul Bihor', 'Oradea', 'bati-banat', '0259 / 0359 · 41xxxx · DN1 (E60) / DN79', 'ro-transylvania-gate', '0259 Oradea, 41xxxx posta & Macarca çift dilli köyler', '0259 alan kodunu, 41xxxx posta kodunu, Art Nouveau/Habsburg mimarisini ve Macaristan sınır kuşağında Rumence-Macarca çift dilli köy tabelalarını arayın', 'Cluj doğuda Piatra Craiului dağ geçidinin ardında 0264 ve 40xxxx posta koduna geçer'],
    ['hd', 'Hunedoara', 'Județul Hunedoara', 'Deva', 'transilvanya', '0254 / 0354 · 33xxxx · A1 / DN7 / DN66', 'ro-km-stone', '0254 Deva, 33xxxx posta & Mureș/Jiu maden kaleleri', '0254 alan kodunu (Transilvanya güneybatısında 025x kullanan il), 33xxxx posta kodunu, Deva/Hunedoara kalelerini ve Petroșani kömür vadisini arayın', 'Alba kuzeydoğuda 0258 ve 51xxxx posta kodunu kullanır'],
    ['ab', 'Alba', 'Județul Alba', 'Alba Iulia', 'transilvanya', '0258 / 0358 · 51xxxx · A1 / A10 / DN1', 'ro-transylvania-gate', '0258 Alba Iulia, 51xxxx posta & Apuseni/Târnava', '0258 alan kodunu, 51xxxx posta kodunu, Mureș-Târnava bağlarını ve batıda Apuseni dağ köylerini arayın', 'Sibiu doğuda 0269 ve 55xxxx posta kodunu kullanır'],
    ['cj', 'Cluj', 'Județul Cluj', 'Cluj-Napoca', 'transilvanya', '0264 / 0364 · 40xxxx · A3 / DN1 (E60)', 'ro-transylvania-gate', '0264 Cluj, 40xxxx posta & Transilvanya platosu', '0264 alan kodunu, 40xxxx posta kodunu, Someșul Mic vadisini ve Rumence-Macarca çift dilli tabelalarla yüksek Transilvanya tepelerini arayın', 'Mureș güneydoğuda 0265 ve 54xxxx posta kodunu kullanır'],
    ['sj', 'Sălaj', 'Județul Sălaj', 'Zalău', 'transilvanya', '0260 / 0360 · 45xxxx · DN1F / DN1H', 'ro-transylvania-gate', '0260 Zalău, 45xxxx posta & Meseș tepeleri', '0260 alan kodunu, 45xxxx posta kodunu ve Cluj ile Satu Mare arasındaki yeşil meyve/meşe tepelerini arayın', 'Satu Mare kuzeybatıda 0261 ve 44xxxx posta kodundadır'],
    ['sm', 'Satu Mare', 'Județul Satu Mare', 'Satu Mare', 'transilvanya', '0261 / 0361 · 44xxxx · DN19', 'ro-transylvania-gate', '0261 Satu Mare, 44xxxx posta & Oaș/Someș ovası', '0261 alan kodunu, 44xxxx posta kodunu, Macaristan-Ukrayna sınır düzlüğünü ve Oaș bölgesinin çok katlı gösterişli köy villalarını arayın', 'Maramureș doğuda 0262 ve ahşap kapılı dağ vadilerine geçer'],
    ['mm', 'Maramureș', 'Județul Maramureș', 'Baia Mare', 'transilvanya', '0262 / 0362 · 43xxxx · DN18 / DN1C', 'ro-transylvania-gate', '0262 Baia Mare, 43xxxx posta & dev oymalı ahşap kapılar', '0262 alan kodunu, 43xxxx posta kodunu, iğne kuleli ahşap kiliseleri ve her evin önünde yükselen devasa oymalı ahşap Maramureș kapılarını (poartă maramureșeană) arayın', 'Bistrița-Năsăud güneyde 0263 ve 42xxxx posta kodunu kullanır'],
    ['bn', 'Bistrița-Năsăud', 'Județul Bistrița-Năsăud', 'Bistrița', 'transilvanya', '0263 / 0363 · 42xxxx · DN17 (E58)', 'ro-transylvania-gate', '0263 Bistrița, 42xxxx posta & Tihuța Karpat geçidi', '0263 alan kodunu, 42xxxx posta kodunu ve Transilvanya’yı Bukovina’ya bağlayan DN17 dağ geçidini arayın', 'Suceava doğuda 0230 ve Moldova mimarisine geçer'],
    ['ms', 'Mureș', 'Județul Mureș', 'Târgu Mureș', 'transilvanya', '0265 / 0365 · 54xxxx · DN13 / DN15', 'ro-transylvania-gate', '0265 Târgu Mureș, 54xxxx posta & çift dilli Sekel geçişi', '0265 alan kodunu, 54xxxx posta kodunu, Rumence-Macarca çift dilli tabelaları ve orta Transilvanya gaz/tarım tepelerini arayın', 'Harghita doğuda 0266 ve neredeyse tamamen Macarca/Sekel dağ köylerine geçer'],
    ['hr', 'Harghita', 'Județul Harghita / Hargita', 'Miercurea Ciuc', 'transilvanya', '0266 / 0366 · 53xxxx · DN12 / DN13A', 'ro-transylvania-gate', '0266 kodu, 53xxxx posta & Macarca Sekel kapıları', '0266 alan kodunu, 53xxxx posta kodunu, her yerde baskın Macarca tabelaları (Csíkszereda, Székelyudvarhely), oymalı Sekel kapılarını (székelykapu) ve yüksek çam vadilerini arayın', 'Covasna güneyde 0267 ve 52xxxx posta kodunu kullanır'],
    ['cv', 'Covasna', 'Județul Covasna / Kovászna', 'Sfântu Gheorghe', 'transilvanya', '0267 / 0367 · 52xxxx · DN11 / DN12', 'ro-transylvania-gate', '0267 Sfântu Gheorghe, 52xxxx posta & Sekel havzası', '0267 alan kodunu, 52xxxx posta kodunu ve patates/tahıl tarlalarıyla çevrili Macarca çift dilli Sekel köylerini arayın', 'Brașov güneybatıda 0268 ve Almanca/Sakson mirası taşıyan 50xxxx kuşağıdır'],
    ['bv', 'Brașov', 'Județul Brașov', 'Brașov', 'transilvanya', '0268 / 0368 · 50xxxx · DN1 / DN13 / DN73', 'ro-transylvania-gate', '0268 Brașov, 50xxxx posta, Sakson sur kiliseler & Karpatlar', '0268 alan kodunu, 50xxxx posta kodunu, sarp Bucegi/Piatra Craiului dağ duvarını ve yüksek duvarlı kapalı avlulu renkli Transilvanya Sakson köylerini arayın', 'Sibiu batıda 0269 ve 55xxxx posta kodunu kullanır'],
    ['sb', 'Sibiu', 'Județul Sibiu', 'Sibiu', 'transilvanya', '0269 / 0369 · 55xxxx · A1 / DN1 / DN14', 'ro-transylvania-gate', '0269 Sibiu, 55xxxx posta & göz pencereli Sakson çatılar', '0269 alan kodunu, 55xxxx posta kodunu, çatılarında "göz" şeklinde çatı pencereleri bulunan kapalı avlulu Sakson evlerini ve Făgăraș Dağları kuzey duvarını arayın', 'Alba batıda 0258, Brașov doğuda 0268 alan kodunu kullanır'],
    ['sv', 'Suceava', 'Județul Suceava', 'Suceava', 'moldova', '0230 / 0330 · 72xxxx · DN2 (E85) / DN17', 'ro-whitewash-tree', '0230 Suceava, 72xxxx posta & Bukovina boyalı/ahşap evleri', '0230 alan kodunu, 72xxxx posta kodunu, süslü metal/ahşap saçaklı Bukovina evlerini, yol kenarı kapalı süslü kuyuları ve Doğu Karpat ladin ormanlarını arayın', 'Botoșani doğuda ağaçsız dalgalı bozkırdır ve 0231 kullanır'],
    ['bt', 'Botoșani', 'Județul Botoșani', 'Botoșani', 'moldova', '0231 / 0331 · 71xxxx · DN29', 'ro-whitewash-tree', '0231 Botoșani, 71xxxx posta & kuzeydoğu sınır tepeleri', '0231 alan kodunu, 71xxxx posta kodunu ve Prut Nehri boyunca uzanan dalgalı mısır/ayçiçeği tepelerini arayın', 'Iași güneyde 0232 ve 70xxxx posta kodunu kullanır'],
    ['is', 'Iași', 'Județul Iași', 'Yaş (Iași)', 'moldova', '0232 / 0332 · 70xxxx · DN28 / DN24', 'ro-whitewash-tree', '0232 Iași, 70xxxx posta & Moldova merkez platosu', '0232 alan kodunu, 70xxxx posta kodunu, kireç boyalı ceviz ağaçlarıyla çevrili DN28 koridorunu ve büyük üniversite/kültür kenti Yaş dokusunu arayın', 'Vaslui güneyde 0235 ve 73xxxx posta koduna geçer'],
    ['nt', 'Neamț', 'Județul Neamț', 'Piatra Neamț', 'moldova', '0233 / 0333 · 61xxxx · DN15 / DN15C', 'ro-whitewash-tree', '0233 Piatra Neamț, 61xxxx posta & Bicaz/Bistrița vadisi', '0233 alan kodunu, 61xxxx posta kodunu ve Ceahlău Dağı etekleriyle Siret/Bistrița vadilerini arayın', 'Bacău güneyde 0234 ve 60xxxx posta kodunu kullanır'],
    ['bc', 'Bacău', 'Județul Bacău', 'Bacău', 'moldova', '0234 / 0334 · 60xxxx · DN2 (E85) / DN11', 'ro-km-stone', '0234 Bacău, 60xxxx posta & Siret sanayi koridoru', '0234 alan kodunu, 60xxxx posta kodunu ve geniş emniyet şeritli DN2 (E85) Siret Vadisi omurgasını arayın', 'Vrancea güneyde 0237 ve 62xxxx posta koduna geçer'],
    ['vs', 'Vaslui', 'Județul Vaslui', 'Vaslui', 'moldova', '0235 / 0335 · 73xxxx · DN24 (E581)', 'ro-whitewash-tree', '0235 Vaslui, 73xxxx posta & Bârlad kırsal tepeleri', '0235 alan kodunu, 73xxxx posta kodunu ve kurak kil tepeleri arasındaki kireç boyalı kırsal Moldova köylerini arayın', 'Galați güneyde 0236 ve 80xxxx posta kodunu kullanır'],
    ['gl', 'Galați', 'Județul Galați', 'Galați', 'moldova', '0236 / 0336 · 80xxxx · DN25 / DN26', 'ro-muntenia-plain', '0236 Galați, 80xxxx posta & Tuna-Siret çelik limanı', '0236 alan kodunu, 80xxxx posta kodunu ve dev demir-çelik/tersane vinçleriyle Güney Moldova ovalarını arayın', 'Brăila hemen güneyde Tuna kıyısında 0239 ve 81xxxx posta kodundadır'],
    ['vn', 'Vrancea', 'Județul Vrancea', 'Focșani', 'moldova', '0237 / 0337 · 62xxxx · DN2 (E85) / DN2D', 'ro-whitewash-tree', '0237 Focșani, 62xxxx posta & Vrancea üzüm bağları', '0237 alan kodunu, 62xxxx posta kodunu ve Karpat dirseği eteklerinde kilometrelerce uzanan üzüm bağlarını (Panciu, Odobești, Cotești) arayın', 'Buzău güneyde 0238 ve 12xxxx posta koduna geçer']
  ];

  buildPack({
    id: 'romanya', name: 'Romanya', code: 'RO', area: 'Avrupa ve Avrasya', tone: 'amber',
    unitLabel: 'județ (il)', groupLabel: 'tarihi bölge', codeLabel: '02xx alan, posta ve il kodu',
    line: '42 județ: 021/023x–026x telefon kodları, kırmızı-beyaz km taşları ve Transilvanya/Moldova mimarisi',
    blurb: '021 ve 023x–026x sabit telefon alan kodları, kırmızı başlıklı DN/DJ kilometre taşları, kireç boyalı ağaçlar ve tarihi bölge mimarisiyle 42 Romanya ili.',
    overviewLead: 'Romanya’da sabit telefon alan kodunun 3. rakamı doğrudan tarihi bölgeyi verir: 021 Bükreş, 023x Moldova, 024x Muntenia ve Dobruca, 025x Oltenia ve Banat, 026x Transilvanya ve Maramureş! Yol kenarındaki kırmızı-beyaz beton kilometre taşları ise doğrudan yolu ve şehri yazar.',
    quickTips: [
      'Sabit telefon (Romtelecom 02xx / RDS 03xx): 021/031 = Bükreş ve Ilfov; 0230–0239 = Moldova (ve Kuzey Muntenia Buzău/Brăila); 0240–0249 = Muntenia ve Dobruca; 0250–0259 = Oltenia, Banat, Crișana ve Güneybatı Transilvanya (Alba/Hunedoara); 0260–0269 = Transilvanya ve Maramureş!',
      '6 haneli posta kodunun ilk rakamı: 0xxxxx Bükreş/Ilfov/Giurgiu, 1xxxxx Muntenia, 2xxxxx Oltenia, 3xxxxx Banat ve Hunedoara, 4xxxxx Kuzeybatı Transilvanya/Crișana/Maramureş, 5xxxxx Merkez ve Güney Transilvanya, 6xxxxx–7xxxxx Moldova, 8xxxxx–9xxxxx Dobruca ve Bărăgan.',
      'Transilvanya’da bitişik nizam kapalı avlulu Sakson/Habsburg evleri ve Macarca çift dilli tabelalar; Karpatların güney ve doğusunda ise müstakil bahçeli, kireç boyalı ağaçlı ve süslü kuyulu köyler hakimdir.'
    ],
    plan1: '021 ve 023x–026x sabit telefon kuşakları ile 0xxxxx–9xxxxx posta kodlarını öğren.',
    plan2: 'Kırmızı-beyaz DN/DJ kilometre taşlarını, kireç boyalı ağaçları ve Transilvanya vs Muntenia/Moldova mimarisini incele.',
    geoName: 'RO_GEO',
    themeCfg: {
      aria: 'Romanya 42 il haritası', fit: 'Tüm Romanya’yı göster',
      grid: { lat: [43, 49, 2], lon: [20, 30, 2], txt: [44, 48, 2], refLon: 25, refLat: 46 },
      excludeWorld: ['Romania', 'Moldova', 'Ukraine', 'Hungary', 'Serbia', 'Bulgaria'],
      bg: [[29.6, 44.2, 'Karadeniz', 's'], [28.5, 47.2, 'MOLDOVA', 'c'], [25.5, 48.6, 'UKRAYNA', 'c'], [20.0, 47.0, 'MACARİSTAN', 'c'], [20.5, 44.5, 'SIRBİSTAN', 'c'], [25.5, 43.2, 'BULGARİSTAN', 'c']]
    },
    groups: [
      { id: 'muntenia-dobruca', name: 'Muntenia ve Dobruca (Güney & Karadeniz)', short: 'Muntenia & Dobruca', color: '#1c5fa6', codeRange: '021 · 0240–0248 (0238/0239) · Posta 0x, 1x, 8x, 9x', desc: 'Bükreş (021), Bărăgan düz tahıl ovası ve Karadeniz/Tuna Deltası (0240/0241).', keyCues: ['021 Bükreş/Ilfov, 0240 Tulcea, 0241 Köstence, 0244 Prahova, 0248 Argeș', 'Bărăgan dümdüz ayçiçeği/mısır ovaları ve Dobruca rüzgar türbinleri', 'Kireç boyalı yol ağaçları ve müstakil teneke çatılı köy evleri'] },
      { id: 'oltenia', name: 'Oltenia (Güneybatı)', short: 'Oltenia (0250–0253)', color: '#0e7a80', codeRange: '0249–0253 · Posta 20xxxx–24xxxx', desc: 'Olt Nehri ile Tuna Demir Kapı arasındaki güneybatı bölgesi: Craiova (0251), Râmnicu Vâlcea (0250), Târgu Jiu (0253).', keyCues: ['0249 Olt, 0250 Vâlcea, 0251 Dolj, 0252 Mehedinți, 0253 Gorj', 'Posta kodu her zaman 20xxxx–24xxxx ile başlar', 'Süslü ahşap sundurmalı (prispă) ve kiremit/sac çatılı evler'] },
      { id: 'bati-banat', name: 'Banat ve Crișana (Batı Sınırı)', short: 'Banat & Batı (0255–0259)', color: '#a86a00', codeRange: '0255–0259 · Posta 30xxxx–32xxxx & 41xxxx', desc: 'Timișoara (0256), Arad (0257), Oradea (0259) ve Reșița (0255). Orta Avrupa / Habsburg köy düzeni.', keyCues: ['0255 Caraș-Severin, 0256 Timiș, 0257 Arad, 0259 Bihor', 'Sokağa dik üçgen alınlıklı, yüksek kapılı pastel Habsburg/Svabya evleri', 'Macaristan sınırında düz ova ve çift dilli tabelalar'] },
      { id: 'transilvanya', name: 'Transilvanya ve Maramureş', short: 'Transilvanya (026x)', color: '#5b3fa0', codeRange: '0260–0269 (0254/0258) · Posta 33xx, 40xx–45xx, 50xx–55xx', desc: 'Karpat yayının içi: Cluj (0264), Brașov (0268), Sibiu (0269), Târgu Mureș (0265) ve Maramureş (0262).', keyCues: ['0260–0269 sabit telefon kuşağı (Alba 0258 ve Hunedoara 0254 dahil)', 'Kapalı avlulu kiremit çatılı Sakson evleri ve Macarca Sekel tabelaları', 'Maramureş dev oymalı ahşap kapıları ve iğne kuleli ahşap kiliseleri'] },
      { id: 'moldova', name: 'Moldova ve Bukovina (Kuzeydoğu)', short: 'Moldova (0230–0237)', color: '#c0262c', codeRange: '0230–0237 · Posta 60xxxx–73xxxx & 80xxxx', desc: 'Doğu Karpatlar ile Prut Nehri arası: Suceava (0230) Bukovina’dan Galați’ye (0236) kadar saat yönünde 0230–0237 sırası!', keyCues: ['Kuzeyden güneye kusursuz 0230 (Suceava) .. 0237 (Vrancea) sırası', 'Yol kenarında süslü kapalı su kuyuları (fântână) ve kireç boyalı ağaçlar', 'Bukovina işlemeli saçaklar ve DN2 (E85) geniş omuzlu karayolu'] }
    ],
    rawUnits: RO_RAW,
    topics: [
      {
        id: 'alan', label: '02xx Telefon ve Posta', icon: 'phone',
        desc: '021 ve 023x–026x sabit telefon kodları ile 0xxxxx–9xxxxx posta kodları',
        title: 'Romanya 02xx/03xx Telefon Kodları ve Posta Kodu Haritası',
        lead: 'Romanya’da sabit telefon kodunun 3. rakamı (023x, 024x, 025x, 026x) ve 6 haneli posta kodunun ilk rakamı ülkeyi saat yönünde dolaşır.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '023x..026x', title: 'Sabit Telefon Alan Kodları: 4 Ana Kuşak', body: 'Nereye bakılır: 02xx (veya 03xx) alan kodunun ilk üç rakamına bakın: 021/031 = Bükreş ve Ilfov; 0230–0239 = Moldova (0230 Suceava, 0231 Botoșani, 0232 Iași, 0233 Neamț, 0234 Bacău, 0235 Vaslui, 0236 Galați, 0237 Vrancea + 0238 Buzău, 0239 Brăila); 0240–0249 = Dobruca ve Muntenia (0240 Tulcea, 0241 Köstence, 0244 Prahova, 0248 Argeș); 0250–0259 = Oltenia, Banat, Bihor ve Hunedoara/Alba (0251 Craiova, 0256 Timișoara, 0257 Arad, 0259 Oradea); 0260–0269 = Transilvanya ve Maramureş (0262 Baia Mare, 0264 Cluj, 0265 Mureș, 0266 Harghita, 0268 Brașov, 0269 Sibiu)!' },
          { badge: 'KM Taşları', title: 'Kırmızı-Beyaz/Mavi Beton Kilometre Taşları ve 2 Harfli İl Kodu', body: 'Nereye bakılır: Romanya’da her 1 kilometrede bir bulunan büyük beton kilometre taşlarının üst kısmında yol numarası (DN1..DN79 veya DJ xxx), gövdesinde ise en yakın büyük şehir/köy adı ve mesafesi yazar. Belediye ve proje tabelalarında "Județul ..." satırı doğrudan ili söyler.' }
        ]
      },
      {
        id: 'saha', label: 'Taş, Ağaç ve Mimari', icon: 'bulb',
        desc: 'Kırmızı-beyaz km taşları, kireç boyalı ağaçlar, Sakson avluları ve ahşap kapılar',
        title: 'Romanya Saha İpuçları: Karpatların İçi ve Dışı',
        lead: 'Romanya’da Karpat yayının içi (Transilvanya ve Banat) Orta Avrupa/Habsburg mimarisi taşırken; yayın dışı (Muntenia, Oltenia, Moldova, Dobruca) Balkan/Doğu Avrupa kırsal dokusuna sahiptir.',
        drill: 'visual',
        visuals: [
          { id: 'ro-km-stone', title: 'Kırmızı Başlıklı Beton Kilometre Taşı', sub: 'Ana DN/DJ Karayolları · Prahova, Argeș, Vâlcea, Hunedoara, Bacău', badge: 'DN / DJ Taşı', body: 'Nereye bakılır: Yol kenarında üstü kırmızı (DN) veya mavi (DJ), gövdesi beyaz boyalı yuvarlak tepeli beton kilometre taşlarına bakın.', regions: ['ph', 'ag', 'vl', 'mh', 'cs', 'hd', 'bc'] },
          { id: 'ro-whitewash-tree', title: 'Kireç Boyalı Ağaçlar ve Delikli Beton Direk', sub: 'Moldova, Oltenia ve İç Muntenia (023x / 025x)', badge: 'Kireçli Ağaç & Kuyu', body: 'Nereye bakılır: Gövdesinin alt 1 metresi beyaz kireçle boyanmış ceviz/meyve ağaçlarına, delikli beton direklere ve yol kenarı kapalı kuyulara bakın.', regions: ['sv', 'bt', 'is', 'nt', 'vs', 'vn', 'bz', 'db', 'dj', 'gj'] },
          { id: 'ro-transylvania-gate', title: 'Transilvanya Sakson Cepheleri ve Maramureş Ahşap Kapısı', sub: 'Transilvanya, Maramureş ve Banat (026x / 0256–0259)', badge: 'Karpat İçi & Batı', body: 'Nereye bakılır: Bitişik nizam yüksek duvarlı Sakson/Habsburg evlerine, oymalı ahşap kapılara ve Macarca çift dilli tabelalara bakın.', regions: ['cj', 'bv', 'sb', 'ms', 'hr', 'cv', 'mm', 'sm', 'sj', 'bn', 'ab', 'tm', 'ar', 'bh'] },
          { id: 'ro-muntenia-plain', title: 'Güney Romanya (Bărăgan & Dobruca) Ayçiçeği Ovası', sub: 'Bükreş, Köstence, Brăila, Ialomița, Teleorman, Galați', badge: 'Güney Ovası', body: 'Nereye bakılır: Göz alabildiğine düz ayçiçeği/mısır tarlalarına, rüzgar türbinlerine ve alçak metal çatılı ova köylerine bakın.', regions: ['b', 'if', 'ct', 'tl', 'cl', 'il', 'br', 'gr', 'tr', 'ot', 'gl'] }
        ],
        cards: [
          { badge: 'Macarca Tabela', title: 'Çift Dilli Rumence-Macarca Tabelalar Hangi İllerdedir?', body: 'Nereye bakılır: Köy girişinde mavi tabelanın altında ikinci bir Macarca isim varsa yalnızca Transilvanya ve Crișana’dasınız: en yoğun olarak Harghita (0266), Covasna (0267), Mureș (0265), Cluj (0264), Bihor (0259), Satu Mare (0261) ve Sălaj (0260).' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 5. UKRAYNA (25 Oblast ve Bölge)
   * ======================================================================= */
  var UA_RAW = [
    ['46', 'Lviv', 'Львівська область', 'Lviv', 'bati', '032 · 79xxx–82xxx', 'ua-carpathian-wood', '032 Lviv, 79xxx–82xxx posta & Avusturya-Galiçya mimarisi', 'Tabelalarda 032 alan kodunu, 79xxx–82xxx posta indeksini, Galiçya taş konaklarını ve güneyde Karpat dağ köylerini arayın', 'Ternopil doğuda 035 ve 46xxx–48xxx posta kodunu kullanır'],
    ['26', 'Ivano-Frankivsk', 'Івано-Франківська область', 'Ivano-Frankivsk', 'bati', '034 · 76xxx–78xxx', 'ua-carpathian-wood', '034 kodu, 76xxx–78xxx posta & dik parlak teneke çatılar', '034 alan kodunu, 76xxx–78xxx posta kodunu, parlak gümüş/renkli sac kaplı yüksek Karpat evlerini ve bahçe içi küçük şapelleri (kaplychka) arayın', 'Zakarpattia dağ sırtının güneybatısında 031 ve 88xxx–90xxx posta kodundadır'],
    ['61', 'Ternopil', 'Тернопільська область', 'Ternopil', 'bati', '035 · 46xxx–48xxx', 'ua-carpathian-wood', '035 Ternopil, 46xxx–48xxx posta & Podolya kanyonları', '035 alan kodunu, 46xxx–48xxx posta kodunu, Katolik/Yunan Katolik köy kiliselerini ve Dinyester kanyon tepelerini arayın', 'Hmelnitski doğuda 038 ve 29xxx–32xxx posta koduna geçer'],
    ['07', 'Volın', 'Волинська область', 'Lutsk', 'bati', '033 · 43xxx–45xxx', 'ua-whitewash-curb', '033 Lutsk, 43xxx–45xxx posta & Polesiye çam/bataklık', '033 alan kodunu, 43xxx–45xxx posta kodunu ve kuzeyde düz kumlu Polesiye çam-huş ormanlarıyla mavi/yeşil ahşap köy evlerini arayın', 'Rivne doğuda 036 ve 33xxx–35xxx posta kodunu kullanır'],
    ['56', 'Rivne', 'Рівненська область', 'Rivne', 'bati', '036 · 33xxx–35xxx · M06', 'ua-whitewash-curb', '036 Rivne, 33xxx–35xxx posta & M06 Kiev-Lviv otoyolu', '036 alan kodunu, 33xxx–35xxx posta kodunu ve güneyde tarım tepeleri, kuzeyde Polesiye orman kuşağını arayın', 'Jitomir doğuda 041 telefon kuşağına (04x Merkez) geçer'],
    ['21', 'Zakarpattia', 'Закарпатська область', 'Ujhorod', 'bati', '031 · 88xxx–90xxx · M06', 'ua-carpathian-wood', '031 Ujhorod, 88xxx–90xxx posta & Orta Avrupa/Macar dokusu', '031 alan kodunu, 88xxx–90xxx posta kodunu, Karpat geçitlerini ve güney düzlüğünde kiremit çatılı Orta Avrupa/Macarca çift dilli köyleri arayın', '031 alan kodu yalnızca Karpatların batı yamacındaki Zakarpattia’ya aittir'],
    ['77', 'Çernivtsi', 'Чернівецька область', 'Çernivtsi', 'bati', '037 · 58xxx–60xxx', 'ua-carpathian-wood', '037 Çernivtsi, 58xxx–60xxx posta & süslü Bukovina evleri', '037 alan kodunu, 58xxx–60xxx posta kodunu, süslü kapı/kuyuları ve Romanya sınırında Rumence çift dilli köy tabelalarını arayın', 'Ivano-Frankivsk kuzeybatıda 034, Vinnytsia doğuda 043 kullanır'],
    ['68', 'Hmelnitski', 'Хмельницька область', 'Hmelnitski', 'bati', '038 · 29xxx–32xxx · M12', 'ua-whitewash-curb', '038 Hmelnitski, 29xxx–32xxx posta & Podolya tepeleri', '038 alan kodunu (03x Batı kuşağının en doğu ucu), 29xxx–32xxx posta kodunu ve Kamianets-Podilskyi kireçtaşı vadilerini arayın', 'Vinnytsia doğuda 043 ve 21xxx–24xxx posta koduna geçer'],
    ['30', 'Kiev Şehri', 'Місто Київ', 'Kiev', 'merkez-kuzey', '044 · 01xxx–04xxx', 'ua-cyrillic-i', '044 alan kodu, 01xxx–04xxx posta & Dinyeper köprüleri', 'Her dükkan ve ilanda 044 sabit alan kodunu, 01xxx–04xxx posta kodunu, mavi-beyaz вул. (sokak) plakalarını ve geniş Dinyeper bulvarlarını arayın', 'Çevresindeki Kiev Oblastı 045 alan kodunu ve 07xxx–09xxx posta kodunu kullanır'],
    ['32', 'Kiev Oblastı', 'Київська область', 'Kiev / Bila Tserkva', 'merkez-kuzey', '045 · 07xxx–09xxx · M01/M05/M06', 'ua-cyrillic-i', '045 alan kodu, 07xxx–09xxx posta & Kiev çevre yolları', '045 sabit alan kodunu (ör. 04563 Bila Tserkva, 04597 İrpin/Buça), 07xxx–09xxx posta kodunu ve kuzeyde çam ormanı, güneyde kara toprak ovasını arayın', 'Kiev merkez 044 ve 01xxx–04xxx kullanır'],
    ['18', 'Jitomir', 'Житомирська область', 'Jitomir', 'merkez-kuzey', '041 · 10xxx–13xxx · M06', 'ua-whitewash-curb', '041 Jitomir, 10xxx–13xxx posta & granit/çam kuşağı', '041 alan kodunu, 10xxx–13xxx posta kodunu, M06 otoyolunu ve Korosten/Jitomir pembe-gri granit ocaklarıyla çam ormanlarını arayın', 'Rivne batıda 036, Kiev doğuda 045 kullanır'],
    ['05', 'Vinnytsia', 'Вінницька область', 'Vinnytsia', 'merkez-kuzey', '043 · 21xxx–24xxx · M12', 'ua-whitewash-curb', '043 Vinnytsia, 21xxx–24xxx posta & Güney Bug bahçeleri', '043 alan kodunu, 21xxx–24xxx posta kodunu, kireç boyalı meyve ağaçlarını ve Güney Bug Nehri boyunca uzanan şekerpancarı/elma köylerini arayın', 'Çerkası doğuda 047 ve 18xxx–20xxx posta kodunu kullanır'],
    ['71', 'Çerkası', 'Черкаська область', 'Çerkası', 'merkez-kuzey', '047 · 18xxx–20xxx · M05', 'ua-steppe-chernozem', '047 Çerkası, 18xxx–20xxx posta & Orta Dinyeper barajı', '047 alan kodunu, 18xxx–20xxx posta kodunu, Kremenchuk baraj gölü köprülerini ve zengin kara toprak (çernozem) tarlalarını arayın', 'Kirovohrad güneyde 052 ve 25xxx–28xxx posta koduna geçer'],
    ['74', 'Çernihiv', 'Чернігівська область', 'Çernihiv', 'merkez-kuzey', '046 · 14xxx–17xxx · M01', 'ua-whitewash-curb', '046 Çernihiv, 14xxx–17xxx posta & Desna ahşap evleri', '046 alan kodunu, 14xxx–17xxx posta kodunu, düz Desna çayırlarını ve oymalı ahşap pencere pervazlı kuzey köy evlerini arayın', 'Sumi doğuda 054 ve 40xxx–42xxx posta kodunu kullanır'],
    ['53', 'Poltava', 'Полтавська область', 'Poltava', 'dinyeper-kuzeydogu', '053 · 36xxx–39xxx · M03', 'ua-steppe-chernozem', '053 Poltava, 36xxx–39xxx posta & M03 Kiev-Harkiv yolu', '053 alan kodunu, 36xxx–39xxx posta kodunu, M03 otoyolunu ve kavak rüzgar perdeleriyle bölünmüş dev mısır/ayçiçeği tarlalarını arayın', 'Harkiv doğuda 057 ve 61xxx–64xxx posta koduna geçer'],
    ['59', 'Sumi', 'Сумська область', 'Sumi', 'dinyeper-kuzeydogu', '054 · 40xxx–42xxx', 'ua-whitewash-curb', '054 Sumi, 40xxx–42xxx posta & kuzeydoğu orman-step', '054 alan kodunu, 40xxx–42xxx posta kodunu ve kuzeyde huş-çam ormanından güneyde açık tarım ovasına geçişi arayın', 'Çernihiv batıda 046 ve 14xxx–17xxx posta kodundadır'],
    ['63', 'Harkiv', 'Харківська область', 'Harkiv', 'dinyeper-kuzeydogu', '057 · 61xxx–64xxx · M03', 'ua-steppe-chernozem', '057 Harkiv, 61xxx–64xxx posta & Doğu metropolü', '057 alan kodunu, 61xxx–64xxx posta kodunu, büyük sanayi/üniversite bulvarlarını ve Siverskyi Donets vadisini arayın', 'Dnipropetrovsk güneybatıda 056 ve 49xxx–53xxx posta kodunu kullanır'],
    ['35', 'Kirovohrad', 'Кіровоградська область', 'Kropıvnıtski', 'dinyeper-kuzeydogu', '052 · 25xxx–28xxx · M12/M04', 'ua-steppe-chernozem', '052 Kropıvnıtski, 25xxx–28xxx posta & merkez step', '052 alan kodunu, 25xxx–28xxx posta kodunu ve Ukrayna’nın tam ortasındaki ağaçsız ayçiçeği bozkırlarını arayın', 'Mykolaiv güneyde 051 ve 54xxx–57xxx posta kodunu kullanır'],
    ['12', 'Dnipropetrovsk', 'Дніпропетровська область', 'Dnipro', 'dinyeper-kuzeydogu', '056 · 49xxx–53xxx · M04', 'ua-steppe-chernozem', '056 Dnipro/Kryvyi Rih, 49xxx–53xxx posta & demir/çelik', '056 alan kodunu (0562 Dnipro, 0564 Kryvyi Rih), 49xxx–53xxx posta kodunu, geniş Dinyeper bükümünü ve Kryvyi Rih kızıl demir cevheri toprağını arayın', 'Zaporijya güneyde 061 ve 69xxx–72xxx posta koduna geçer'],
    ['51', 'Odesa', 'Одеська область', 'Odesa', 'guney-dogu', '048 · 65xxx–68xxx · M05/M15', 'ua-steppe-chernozem', '048 Odesa, 65xxx–68xxx posta, sarı kalker & Karadeniz', '048 alan kodunu (Güneyde 04x kullanan tek il), 65xxx–68xxx posta kodunu, sarı deniz kabuklu kireçtaşı (rakushnyak) duvarları ve Bucak/Karadeniz liman dokusunu arayın', 'Mykolaiv doğuda 051 ve 54xxx–57xxx posta kodunu kullanır'],
    ['48', 'Mykolaiv', 'Миколаївська область', 'Mykolaiv', 'guney-dogu', '051 · 54xxx–57xxx · M14', 'ua-steppe-chernozem', '051 Mykolaiv, 54xxx–57xxx posta & Güney Bug haliç ovası', '051 alan kodunu, 54xxx–57xxx posta kodunu ve Güney Bug haliç köprüleriyle düz kuru step tarlalarını arayın', 'Herson doğuda 055 ve 73xxx–75xxx posta kodundadır'],
    ['65', 'Herson', 'Херсонська область', 'Herson', 'guney-dogu', '055 · 73xxx–75xxx · M14', 'ua-steppe-chernozem', '055 Herson, 73xxx–75xxx posta & Aşağı Dinyeper sulama kanalları', '055 alan kodunu, 73xxx–75xxx posta kodunu ve Aşağı Dinyeper/Karadeniz-Azak arasındaki dümdüz karpuz/tahıl bozkırlarını arayın', 'Zaporijya kuzeydoğuda 061 ve 69xxx–72xxx posta koduna geçer'],
    ['23', 'Zaporijya', 'Запорізька область', 'Zaporijya', 'guney-dogu', '061 · 69xxx–72xxx · M18', 'ua-steppe-chernozem', '061 Zaporijya, 69xxx–72xxx posta & Azak/Dinyeper stepi', '061 alan kodunu (Berdyansk 06153, Melitopol 0619), 69xxx–72xxx posta kodunu, DniproHES barajını ve Azak Denizi’ne inen düz M18 koridorunu arayın', 'Dnipropetrovsk kuzeyde 056, Donetsk doğuda 062 kullanır'],
    ['14', 'Donetsk', 'Донецька область', 'Donetsk / Kramatorsk', 'guney-dogu', '062 · 83xxx–87xxx · M03/M14', 'ua-steppe-chernozem', '062 Donetsk/Mariupol, 83xxx–87xxx posta & Donbas maden konileri', '062 alan kodunu (Mariupol 0629, Kramatorsk 06264), 83xxx–87xxx posta kodunu ve düz step ufku üzerinde yükselen konik kömür cüruf tepelerini (terikon) arayın', 'Luhansk kuzeydoğuda 064 ve 91xxx–94xxx posta kodunu kullanır'],
    ['09', 'Luhansk', 'Луганська область', 'Luhansk / Sievierodonetsk', 'guney-dogu', '064 · 91xxx–94xxx', 'ua-steppe-chernozem', '064 Luhansk, 91xxx–94xxx posta & doğu Donets bozkırı', '064 alan kodunu, 91xxx–94xxx posta kodunu ve Siverskyi Donets kireçtaşı yamaçlarıyla doğu sanayi/maden kasabalarını arayın', 'Harkiv batıda 057, Donetsk güneybatıda 062 alan kodunu kullanır']
  ];

  buildPack({
    id: 'ukrayna', name: 'Ukrayna', code: 'UA', area: 'Avrupa ve Avrasya', tone: 'blue',
    unitLabel: 'oblast', groupLabel: 'coğrafi ve kod kuşağı', codeLabel: '03x–06x alan ve 5 haneli posta kodu',
    line: '25 oblast: batıdan doğuya 03x–06x alan kodları, 01xxx–94xxx posta indeksi ve Kiril і/ї/є ipuçları',
    blurb: 'Batıdan doğuya 03x, 04x, 05x, 06x olarak dizilen sabit telefon alan kodları, 5 haneli posta indeksleri ve Karpatlardan Donbas’a uzanan mimari/biyom kuşaklarıyla 25 Ukrayna birimi.',
    overviewLead: 'Ukrayna’da sabit telefon alan kodunun ikinci rakamı (03x, 04x, 05x, 06x) ülkeyi batıdan doğuya 4 dikey şeride böler: 03x Batı Ukrayna, 04x Merkez-Kuzey (ve Odesa), 05x Dinyeper-Güney-Kuzeydoğu, 06x Güneydoğu! Sokak tabelalarındaki noktalı "і / ї" harfleri ve "вул." kısaltması ise Ukrayna’yı Rusya’dan anında ayırır.',
    quickTips: [
      'Sabit telefon alan kodu: 031–038 = Batı Ukrayna (031 Zakarpattia, 032 Lviv, 033 Volın, 034 Ivano-Frankivsk, 035 Ternopil, 036 Rivne, 037 Çernivtsi, 038 Hmelnitski); 041–048 = Merkez, Kuzey ve Odesa (041 Jitomir, 043 Vinnytsia, 044 Kiev Şehri, 045 Kiev Oblastı, 046 Çernihiv, 047 Çerkası, 048 Odesa); 051–057 = Güney, Dinyeper ve Kuzeydoğu (051 Mykolaiv, 052 Kirovohrad, 053 Poltava, 054 Sumi, 055 Herson, 056 Dnipro, 057 Harkiv); 061–064 = Güneydoğu (061 Zaporijya, 062 Donetsk, 064 Luhansk)!',
      'Ukrayna Kiril alfabesinde Rusçada bulunmayan 4 harf vardır: І і, Ї ї, Є є, Ґ ґ. Sokak tabelaları her zaman "вул." (вулиця = sokak) yazar (Rusçada "ул.").',
      'Batı Ukrayna’da (Karpatlar ve Galiçya) parlak sac/ahşap dik çatılar ve bahçe şapelleri; Merkez ve Güneyde ise kara toprak (çernozem), ayçiçeği tarlaları ve kavak rüzgar perdeleri hakimdir.'
    ],
    plan1: 'Batıdan doğuya ilerleyen 03x, 04x, 05x ve 06x sabit telefon alan kodlarını öğren.',
    plan2: 'Ukrayna Kiril harflerini (і, ї, є), kireç boyalı bordürleri ve Karpat vs Step dokusunu incele.',
    geoName: 'UA_GEO',
    themeCfg: {
      aria: 'Ukrayna 25 oblast haritası', fit: 'Tüm Ukrayna’yı göster',
      grid: { lat: [45, 52, 2], lon: [22, 40, 3], txt: [46, 52, 2], refLon: 31, refLat: 49 },
      excludeWorld: ['Ukraine', 'Poland', 'Slovakia', 'Hungary', 'Romania', 'Moldova', 'Belarus', 'Russia'],
      bg: [[32.0, 44.5, 'Karadeniz', 's'], [36.8, 46.2, 'Azak Denizi', 's'], [21.5, 51.0, 'POLONYA', 'c'], [28.0, 53.0, 'BELARUS', 'c'], [25.5, 46.8, 'ROMANYA', 'c'], [28.6, 47.2, 'MOLDOVA', 'c'], [38.5, 51.5, 'RUSYA', 'c']]
    },
    groups: [
      { id: 'bati', name: '03x · Batı Ukrayna (Galiçya, Volinya, Karpatlar, Bukovina)', short: 'Batı (031–038)', color: '#5b3fa0', codeRange: '031–038 · Posta 29xxx–35xxx, 43xxx–48xxx, 58xxx–60xxx, 76xxx–90xxx', desc: 'Polonya, Slovakya, Macaristan ve Romanya sınır kuşağı. Tüm sabit alan kodları 031 ile 038 arasındadır.', keyCues: ['031 Ujhorod, 032 Lviv, 033 Lutsk, 034 Ivano-Frankivsk, 035 Ternopil, 036 Rivne, 037 Çernivtsi, 038 Hmelnitski', 'Parlak teneke/kiremit dik çatılar, bahçe içi şapeller ve Karpat dağları', 'Lviv ve Çernivtsi’de Avusturya-Macaristan dönemi taş kent mimarisi'] },
      { id: 'merkez-kuzey', name: '04x · Merkez ve Kuzey Ukrayna (Kiev, Podolya, Polesiye)', short: 'Merkez & Kuzey (041–047)', color: '#1c5fa6', codeRange: '041 · 043–047 · Posta 01xxx–24xxx', desc: 'Kiev (044/045), Jitomir (041), Vinnytsia (043), Çernihiv (046) ve Çerkası (047). Posta kodları 01xxx ile 24xxx arasındadır.', keyCues: ['044 Kiev Şehri (01xxx–04xxx), 045 Kiev Oblastı (07xxx–09xxx)', '041 Jitomir, 043 Vinnytsia, 046 Çernihiv, 047 Çerkası', 'Kuzeyde çam/huş ormanı, güneyde elma bahçeleri ve kara toprak'] },
      { id: 'dinyeper-kuzeydogu', name: '05x · Dinyeper ve Kuzeydoğu (Poltava, Harkiv, Dnipro)', short: 'Dinyeper & KD (052–057)', color: '#a86a00', codeRange: '052–054 · 056–057 · Posta 25xxx–28xxx, 36xxx–42xxx, 49xxx–53xxx, 61xxx–64xxx', desc: 'Sol Yaka Ukrayna ve Orta Dinyeper sanayi-tarım kuşağı: Kropıvnıtski (052), Poltava (053), Sumi (054), Dnipro (056), Harkiv (057).', keyCues: ['052 Kirovohrad, 053 Poltava, 054 Sumi, 056 Dnipropetrovsk, 057 Harkiv', 'Uçsuz bucaksız siyah çernozem toprağı ve kavak rüzgar perdeleri', 'Dnipro ve Kryvyi Rih ağır metalürji/maden dokusu'] },
      { id: 'guney-dogu', name: '048 / 051 / 055 / 06x · Güney ve Doğu (Karadeniz, Azak, Donbas)', short: 'Güney & Doğu (048–064)', color: '#0e7a80', codeRange: '048 · 051 · 055 · 061–064 · Posta 54xxx–57xxx, 65xxx–75xxx, 83xxx–94xxx', desc: 'Karadeniz ve Azak kıyı bozkırları ile Donbas havzası: Odesa (048), Mykolaiv (051), Herson (055), Zaporijya (061), Donetsk (062), Luhansk (064).', keyCues: ['048 Odesa, 051 Mykolaiv, 055 Herson, 061 Zaporijya, 062 Donetsk, 064 Luhansk', 'Kuru step, sulama kanalları ve Odesa sarı kireçtaşı duvarları', 'Donbas (062/064) konik kömür cüruf tepeleri (terikon)'] }
    ],
    rawUnits: UA_RAW,
    topics: [
      {
        id: 'alan', label: '03x–06x Alan ve Posta', icon: 'phone',
        desc: 'Batıdan doğuya 03x, 04x, 05x, 06x telefon kuşakları ve 5 haneli posta kodu',
        title: 'Ukrayna 03x–06x Sabit Telefon Kodları ve Posta İndeksi',
        lead: 'Ukrayna’da mağaza tabelalarında, otobüs duraklarında ve reklam panolarında yazan 03x–06x alan kodu batıdan doğuya mükemmel bir sıra izler.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '03x..06x', title: 'Batıdan Doğuya 4 Telefon Şeridi', body: 'Nereye bakılır: 0 ile başlayan 3 haneli (küçük ilçelerde 4–5 haneli) alan kodunun İKİNCİ RAKAMINA bakın: 3 (031–038) = Batı Ukrayna (Zakarpattia, Lviv, Volın, Ivano-Frankivsk, Ternopil, Rivne, Çernivtsi, Hmelnitski); 4 (041–048) = Merkez-Kuzey ve Odesa (Jitomir 041, Vinnytsia 043, Kiev 044/045, Çernihiv 046, Çerkası 047, Odesa 048); 5 (051–057) = Güney, Orta Dinyeper ve Kuzeydoğu (Mykolaiv 051, Kirovohrad 052, Poltava 053, Sumi 054, Herson 055, Dnipro 056, Harkiv 057); 6 (061–064) = Güneydoğu ve Donbas (Zaporijya 061, Donetsk 062, Luhansk 064)!' },
          { badge: '01xxx..94xxx', title: '5 Haneli Ukrposhta Posta Kodu (Поштовий Індекс)', body: 'Nereye bakılır: Sokak ve kurum tabelalarındaki 5 haneli sayıya bakın: 01xxx–09xxx Kiev, 10xxx–24xxx Kuzey ve Merkez (Jitomir, Çernihiv, Çerkası, Vinnytsia), 25xxx–42xxx Kirovohrad, Hmelnitski, Rivne, Poltava, Sumi; 43xxx–48xxx Volın ve Ternopil; 49xxx–57xxx Dnipro ve Mykolaiv; 58xxx–60xxx Çernivtsi; 61xxx–64xxx Harkiv; 65xxx–75xxx Odesa, Zaporijya, Herson; 76xxx–90xxx Karpatlar, Lviv ve Donetsk; 91xxx–94xxx Luhansk.' }
        ]
      },
      {
        id: 'saha', label: 'Kiril, Kireç ve Biyom', icon: 'bulb',
        desc: 'Ukrayna Kiril harfleri (і, ї, є), kireçli bordürler, Karpat evleri ve kara toprak',
        title: 'Ukrayna Saha İpuçları: Dil, Mimari ve Step Kuşakları',
        lead: 'Ukrayna’da tek bir sokak tabelası ("вул." ve noktalı "і") ülkeyi kesinleştirirken, çatı tipi ve toprak rengi batı ile doğuyu ayırır.',
        drill: 'visual',
        visuals: [
          { id: 'ua-cyrillic-i', title: 'Ukrayna Kiril Tabelası (і, ї, є) ve вул. Kısaltması', sub: 'Kiev (044/045) ve Tüm Ukrayna Kentleri', badge: 'і / ї / є & вул.', body: 'Nereye bakılır: Tabelalarda Rusçada bulunmayan noktalı І/і, iki noktalı Ї/ї, Є/є harflerine ve sokak anlamındaki "вул." kısaltmasına bakın.', regions: ['30', '32'] },
          { id: 'ua-whitewash-curb', title: 'Kireç Boyalı Bordür, Ağaç ve Direk Dipleri', sub: 'Kuzey ve İç Batı · Volın, Rivne, Jitomir, Vinnytsia, Çernihiv, Sumi', badge: 'Kireçli Bordür', body: 'Nereye bakılır: Yol kenarındaki ağaç gövdelerinin, beton elektrik direklerinin ve kaldırım bordür taşlarının beyaz kireçle boyanmış olmasına bakın.', regions: ['07', '56', '68', '18', '05', '74', '59'] },
          { id: 'ua-carpathian-wood', title: 'Batı Ukrayna (Karpatlar & Galiçya) Dik Sac/Ahşap Çatılar', sub: 'Lviv (032), Ivano-Frankivsk (034), Zakarpattia (031), Ternopil (035), Çernivtsi (037)', badge: '03x Batı & Karpat', body: 'Nereye bakılır: Parlak gümüş/boyalı sac kaplı kırma çatılara, bahçe içi küçük camlı şapellere ve Karpat ladin yamaçlarına bakın.', regions: ['46', '26', '61', '21', '77'] },
          { id: 'ua-steppe-chernozem', title: 'Merkez, Güney ve Doğu Kara Toprak (Çernozem) ve Ayçiçeği', sub: 'Poltava, Çerkası, Dnipro, Harkiv, Odesa, Zaporijya, Donetsk (048 / 05x / 06x)', badge: '05x / 06x Step', body: 'Nereye bakılır: Simsiyah verimli çernozem toprağına, tarlaları bölen düz kavak rüzgar şeritlerine ve uçsuz bucaksız ayçiçeği/buğday ovalarına bakın.', regions: ['71', '53', '63', '35', '12', '51', '48', '65', '23', '14', '09'] }
        ],
        cards: [
          { badge: 'Bölge İzi', title: 'Galiçya Şapelleri vs Polesiye Ahşabı vs Güney Kalkeri', body: 'Nereye bakılır: Batı Ukrayna’da (Lviv, Ivano-Frankivsk, Ternopil) her köy evinin bahçesinde küçük bir Meryem Ana şapeli/heykeli vardır. Kuzeyde (Volın, Rivne, Jitomir, Çernihiv) mavi/yeşil boyalı tek katlı ahşap evler görülür. Güneyde (Odesa, Mykolaiv, Herson) ise sarı gözenekli kireçtaşı (rakushnyak) bahçe duvarları standarttır.' }
        ]
      }
    ]
  });

})(typeof window !== 'undefined' ? window : globalThis);

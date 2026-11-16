/* pack-europe-west.js — Batı ve Güney Avrupa: Almanya (DE), Fransa (FR), İspanya (ES), İtalya (IT), Birleşik Krallık (GB) */
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
   * 1. ALMANYA (16 Bundesländer)
   * ======================================================================= */
  buildPack({
    id: 'almanya', name: 'Almanya', code: 'DE', area: 'Avrupa ve Avrasya', tone: 'amber',
    unitLabel: 'eyalet', groupLabel: 'bölge kuşağı', codeLabel: 'Vorwahl ve PLZ kodu',
    line: '16 eyalet: 02x–09x telefon, 0–9 PLZ posta kodları ve bölgesel yer ekleri',
    blurb: '5 haneli PLZ posta kodları, 02x–09x Vorwahl alan kodları, köy sonekleri (-ing, -ingen, -ow) ve Klinker/soğan kubbe mimarisiyle 16 Alman eyaleti.',
    overviewLead: 'Almanya’da ticari araçlarda, dükkan camlarında ve inşaat panolarında 5 haneli PLZ posta kodu (0xxxx–9xxxx) ve 02x–09x Vorwahl sabit telefon kodu her zaman yazar; sarı köy giriş tabelalarındaki sonekler (-ing, -ingen, -ow, -büttel) ise bölgeyi anında söyler.',
    quickTips: [
      '5 haneli PLZ posta kodunun ilk rakamı saat yönünde döner: 0 ve 1 Doğu Almanya, 2 Kuzey, 3 Orta-Kuzey, 4–5 Batı (NRW), 6 Hessen/Güneybatı, 7 Baden-Württemberg, 8–9 Bavyera.',
      'Vorwahl sabit hat kodları: 030 Berlin ve 03x Doğu, 040 Hamburg ve 04x Kuzey, 02x NRW/Rheinland, 05x Aşağı Saksonya, 06x Hessen/Saarland, 07x Baden-Württemberg, 08x–09x Bavyera.',
      'Sarı yerleşim tabelalarında -ow/-itz Doğu (Slav kökenli), -büttel/-husen Kuzey, -ingen/-weiler Güneybatı (Svabya), -ing/-wang/-reuth Bavyera göstergesidir.'
    ],
    plan1: '0–9 PLZ posta kodu ilk rakamını ve 02x–09x Vorwahl telefon kuşaklarını incele.',
    plan2: 'Leitpfosten yol babalarını, Klinker tuğla, Plattenbau ve Bavyera soğan kubbe mimarisini öğren.',
    geoName: 'DE_GEO',
    themeCfg: {
      aria: 'Almanya 16 eyalet haritası', fit: 'Tüm Almanya’yı göster',
      grid: { lat: [47, 55, 2], lon: [6, 15, 2], txt: [48, 54, 2], refLon: 10, refLat: 51 },
      excludeWorld: ['Germany', 'Poland', 'Czechia', 'Austria', 'Switzerland', 'France', 'Netherlands', 'Denmark'],
      bg: [[4.8, 52.3, 'HOLLANDA', 'c'], [9.2, 56.0, 'DANİMARKA', 'c'], [16.8, 52.0, 'POLONYA', 'c'], [14.5, 49.8, 'ÇEKYA', 'c'], [13.5, 47.6, 'AVUSTURYA', 'c'], [4.5, 48.8, 'FRANSA', 'c']]
    },
    groups: [
      { id: 'kuzey', name: 'Kuzey Almanya (Nord)', short: 'Kuzey', color: '#1c5fa6', codeRange: '04x · 05x · PLZ 2xxxx–3xxxx', desc: 'Kuzey Denizi ve Baltık ovaları. Koyu kırmızı Klinker tuğla evler, rüzgar türbinleri ve 04x/05x telefon kodları.', keyCues: ['Kırmızı Klinker tuğla cepheler', 'PLZ 2xxxx ve 040/04x–05x Vorwahl', '-büttel, -husen, -stedt, -warden yer ekleri'] },
      { id: 'dogu', name: 'Doğu Almanya (Ost / eski DDR)', short: 'Doğu', color: '#a86a00', codeRange: '030 · 033x–039x · PLZ 0xxxx–1xxxx', desc: 'Berlin ve eski DDR eyaletleri. Tüm sabit alan kodları 03x ile, posta kodları 0xxxx veya 1xxxx ile başlar.', keyCues: ['03x Vorwahl ve 0xxxx/1xxxx PLZ', 'Prefabrik Plattenbau bloklar ve Arnavut kaldırımlı köy yolları', '-ow, -itz, -in Slav kökenli yer adları'] },
      { id: 'bati', name: 'Batı ve Orta Almanya (West)', short: 'Batı', color: '#0e7a80', codeRange: '02x · 06x · PLZ 4xxxx–6xxxx', desc: 'Ren-Ruhr sanayi kuşağı, Eifel/Mosel bağları ve Frankfurt finans merkezi. 02x (NRW/RP) ve 06x (Hessen/Saarland) kodları.', keyCues: ['02x (NRW) ve 06x (Hessen/Saar) Vorwahl', 'PLZ 4xxxx, 5xxxx ve 6xxxx', 'Gri arduvaz kaplı cepheler ve yarı ahşap (Fachwerk) kasabalar'] },
      { id: 'guney', name: 'Güney Almanya (Süd)', short: 'Güney', color: '#0b6b3a', codeRange: '07x · 08x–09x · PLZ 7xxxx–9xxxx', desc: 'Kara Orman, Svabya ve Bavyera Alpleri. Baden-Württemberg 07x / PLZ 7xxxx; Bavyera 08x–09x / PLZ 8xxxx–9xxxx.', keyCues: ['Baden-Württemberg: 07x / PLZ 7xxxx / -ingen', 'Bavyera: 08x–09x / PLZ 8xxxx–9xxxx / -ing', 'Soğan kubbeli kiliseler ve ahşap balkonlu Alp evleri'] }
    ],
    rawUnits: [
      ['sh', 'Schleswig-Holstein', 'Schleswig-Holstein', 'Kiel', 'kuzey', '043x–048x · 24xxx–25xxx', 'de-klinker-north', 'Klinker tuğla & -by/-büll ekleri', 'Dükkanlarda 0431 (Kiel), 0451 (Lübeck) veya 046x/048x kodunu ve 24xxx–25xxx posta kodunu arayın; Danimarka sınırında -by/-lund/-büll bitimli sarı tabelalar ve toprak/çit setler (Knick) tipiktir', 'Aşağı Saksonya (041x/044x/05x) daha güneydedir; Schleswig-Holstein iki deniz arasında rüzgar türbinli düz kıstaktır'],
      ['hh', 'Hamburg', 'Freie und Hansestadt Hamburg', 'Hamburg', 'kuzey', '040 · 20xxx–22xxx', 'de-klinker-north', '040 alan kodu & liman kanalları', 'Her tabelada tek tip 040 sabit alan kodunu, 20xxx–22xxx PLZ kodunu, HVV duraklarını ve kırmızı tuğla Kontorhaus/kanal mimarisini arayın', 'Bremen (0421) daha küçük Weser limanıdır; Hamburg 040 koduyla tek başına ayrılır'],
      ['ni', 'Aşağı Saksonya', 'Niedersachsen', 'Hannover', 'kuzey', '051x–059x / 044x · 26xxx–38xxx', 'de-klinker-north', '05x/044x kodu & kırmızı tuğla çiftlikler', 'Hannover (0511), Braunschweig (0531), Osnabrück (0541) ve Oldenburg (0441) alan kodlarını; dümdüz turbalık/tarım arazilerini ve kırmızı Klinker çiftlik evlerini arayın', 'NRW (02x) daha yoğun sanayi ve maden kuşağıdır; Aşağı Saksonya 05x/044x kodları ve düz tuğla köyleriyle seçilir'],
      ['hb', 'Bremen', 'Freie Hansestadt Bremen', 'Bremen', 'kuzey', '0421 / 0471 · 28xxx / 275xx', 'de-klinker-north', '0421 Bremen & 0471 Bremerhaven', 'Tabelalarda 0421 (Bremen) veya 0471 (Bremerhaven) alan kodunu, 28xxx posta kodunu ve Weser kıyısı bitişik nizam Bremer Haus sıra evlerini arayın', 'Aşağı Saksonya ile çevrilidir ancak 0421 ve 28xxx kentsel kodlarıyla ayrılır'],
      ['mv', 'Mecklenburg-Vorpommern', 'Mecklenburg-Vorpommern', 'Schwerin', 'dogu', '038x–039x · 17xxx–19xxx', 'de-plattenbau-east', '038x/039x kodu & Baltık göller/tuğla', 'Rostock (0381), Schwerin (0385), Greifswald (03834) kodlarını, 17xxx–19xxx PLZ numarasını ve ağaç tünelli yollarda -ow/-hagen bitimli köy tabelalarını arayın', 'Brandenburg (033x/035x) iç karadadır; Mecklenburg-Vorpommern 038x/039x kodu ve Baltık/göl dokusuyla seçilir'],
      ['be', 'Berlin', 'Berlin', 'Berlin', 'dogu', '030 · 10xxx–14xxx', 'de-plattenbau-east', '030 alan kodu & 10xxx–14xxx PLZ', 'Tüm dükkan ve afişlerde tek tip 030 alan kodunu, 10xxx–14xxx posta kodunu, sarı BVG otobüs/tramvaylarını ve geniş Gründerzeit/Plattenbau bulvarlarını arayın', 'Çevresindeki Brandenburg 033x kodunu ve 144xx–16xxx PLZ aralığını kullanır'],
      ['bb', 'Brandenburg', 'Brandenburg', 'Potsdam', 'dogu', '033x / 035x · 14xxx–16xxx / 03xxx', 'de-plattenbau-east', '033x kodu, çam ormanı & Sorbca', 'Potsdam (0331), Frankfurt/Oder (0335) ve Cottbus (0355) kodlarını; düz kumlu sarıçam ormanlarını ve güneydoğuda (Spreewald) Almanca-Sorbca çift dilli tabelaları arayın', 'Berlin (030) kentsel merkezdir; Brandenburg 033x kırsal kodu ve taş parke köy yollarıyla ayrılır'],
      ['st', 'Saksonya-Anhalt', 'Sachsen-Anhalt', 'Magdeburg', 'dogu', '034x / 039x · 06xxx / 39xxx', 'de-plattenbau-east', '039x Magdeburg & 0345 Halle', 'Kuzeyde Magdeburg (0391, PLZ 39xxx), güneyde Halle/Dessau (0345/0340, PLZ 06xxx) kodlarını, Harz Dağları eteklerini ve geniş açık tarım ovalarını arayın', 'Aşağı Saksonya 05x kullanır; Saksonya-Anhalt 039x/034x Doğu Almanya kodlarıyla hemen ayrılır'],
      ['sn', 'Saksonya', 'Freistaat Sachsen', 'Dresden', 'dogu', '0341 / 035x / 037x · 01xxx–09xxx', 'de-plattenbau-east', '01xxx–09xxx sıfırla başlayan PLZ', 'Başında 0 bulunan 5 haneli PLZ posta kodlarını (01xxx Dresden, 04xxx Leipzig, 09xxx Chemnitz), 0351/0341/0371 alan kodlarını ve sarı-krem sıvalı Erzgebirge kasabalarını arayın', 'Bavyera 8xxxx/9xxxx kullanır; Saksonya sıfırla başlayan (01xxx–09xxx) PLZ kuşağının kalbidir'],
      ['th', 'Thüringen', 'Freistaat Thüringen', 'Erfurt', 'dogu', '036x · 07xxx / 98xxx–99xxx', 'de-plattenbau-east', '036x alan kodu & arduvaz cepheler', 'Erfurt (0361), Jena (03641), Weimar (03643) ve Gera (0365) gibi 036x sabit alan kodlarını; Thüringen Ormanı’nda gri arduvaz kaplı evleri ve -roda/-leben köy eklerini arayın', 'Hessen (066x/056x) batı komşusudur; Thüringen tüm eyalette 036x telefon kuşağını kullanır'],
      ['nw', 'Kuzey Ren-Vestfalya', 'Nordrhein-Westfalen', 'Düsseldorf', 'bati', '020x–029x (052x) · 40xxx–59xxx', 'de-leitpfosten', '02x telefon & 4xxxx–5xxxx PLZ', 'Köln (0221), Düsseldorf (0211), Dortmund (0231), Essen (0201), Münster (0251) gibi 02x sabit alan kodlarını (Doğu Vestfalya Bielefeld 0521 hariç) ve 40xxx–59xxx PLZ kodlarını arayın', 'Aşağı Saksonya 05x/2xxxx–3xxxx kullanır; NRW Almanya’da 02x alan kodunun ana merkezidir'],
      ['he', 'Hessen', 'Hessen', 'Wiesbaden', 'bati', '069 / 061x–066x / 056x · 34xxx–36xxx / 60xxx–65xxx', 'de-leitpfosten', '069 Frankfurt & Fachwerk kasabalar', 'Frankfurt/Offenbach (069), Wiesbaden/Darmstadt (061x, PLZ 60xxx–65xxx) ve kuzeyde Kassel/Fulda (0561/0661, PLZ 34xxx–36xxx) kodlarını ve zengin yarı ahşap (Fachwerk) köy merkezlerini arayın', 'Rheinland-Pfalz Ren’in batısında 026x/065x/063x kullanır; Hessen 069/061x–064x ve 60xxx–65xxx kuşağıdır'],
      ['rp', 'Rheinland-Pfalz', 'Rheinland-Pfalz', 'Mainz', 'bati', '026x / 063x / 065x / 067x · 54xxx–56xxx / 67xxx', 'de-leitpfosten', 'Ren-Mosel dik bağ yamaçları', 'Mainz (06131), Koblenz (0261), Trier (0651) ve Kaiserslautern/Ludwigshafen (0631/0621) kodlarını; Mosel ve Ren vadilerindeki çok dik teraslı üzüm bağlarını ve -scheid/-bach eklerini arayın', 'Baden-Württemberg Ren’in doğusunda 07x/7xxxx kullanır; Rheinland-Pfalz batı yakada 54xxx–56xxx ve 67xxx PLZ taşır'],
      ['sl', 'Saarland', 'Saarland', 'Saarbrücken', 'bati', '068x · 66xxx', 'de-leitpfosten', '068x telefon & 66xxx PLZ kodu', 'Tüm eyalette tek tip 068x sabit alan kodunu (Saarbrücken 0681, Saarlouis 06831) ve 66xxx ile başlayan PLZ posta kodunu arayın; Fransa sınırına yakın bitişik nizam maden kasabaları tipiktir', 'Rheinland-Pfalz 063x/065x kullanır; 068x ve 66xxx yalnızca Saarland’a aittir'],
      ['bw', 'Baden-Württemberg', 'Baden-Württemberg', 'Stuttgart', 'guney', '071x–079x (0621) · 70xxx–79xxx', 'de-onion-bavaria', '07x telefon, 7xxxx PLZ & -ingen eki', 'Stuttgart (0711), Karlsruhe (0721), Freiburg (0761), Ulm (0731) gibi 07x alan kodlarını, 70xxx–79xxx PLZ numarasını ve sarı köy tabelalarında çok sık geçen -ingen / -weiler / -bach soneklerini arayın', 'Bavyera’da köy adları -ing (tek harf) ile biter ve PLZ 8xxxx/9xxxx’tir; Baden-Württemberg’de -ingen (iki hece) ve 7xxxx PLZ görülür'],
      ['by', 'Bavyera', 'Freistaat Bayern', 'Münih', 'guney', '080x–099x · 80xxx–97xxx', 'de-onion-bavaria', '08x–09x telefon, 8xxxx–9xxxx PLZ & -ing', 'Güney Bavyera’da 08x / PLZ 8xxxx (Münih 089, Augsburg 0821), Kuzey Bavyera/Frankonya’da 09x / PLZ 9xxxx (Nürnberg 0911, Würzburg 0931, Regensburg 0941) kodlarını, soğan kubbeli köy kiliselerini ve -ing/-reuth/-zell eklerini arayın', 'Baden-Württemberg 07x/7xxxx kullanır; 08x–09x telefon kuşağı bütünüyle Bavyera’ya aittir']
    ],
    topics: [
      {
        id: 'alan', label: 'Vorwahl ve PLZ', icon: 'phone',
        desc: '02x–09x Vorwahl alan kodları ve 0–9 PLZ posta kodu kuşakları',
        title: 'Almanya Vorwahl (02x–09x) ve PLZ (0xxxx–9xxxx) Rehberi',
        lead: 'Almanya’da esnaf kamyonetlerinde, mağaza tabelalarında ve yol kenarı firma panolarında hem 02x–09x telefon alan kodu hem de 5 haneli PLZ posta kodu birlikte yazar.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: 'PLZ 0–9', title: '5 Haneli Posta Kodu (Postleitzahl) İlk Rakam Haritası', body: 'Nereye bakılır: Adres satırında şehir adından hemen önce gelen 5 haneli sayıya bakın (ör. 80331 München). İlk rakam: 0 = Saksonya ve Güney Brandenburg; 1 = Berlin ve Mecklenburg-Vorpommern/Brandenburg; 2 = Hamburg, Schleswig-Holstein, Bremen ve Kuzey Aşağı Saksonya; 3 = Hannover/Doğu Vestfalya/Kuzey Hessen; 4–5 = NRW ve Rheinland-Pfalz; 6 = Frankfurt/Güney Hessen, Saarland (66xxx) ve Mannheim; 7 = Baden-Württemberg; 8 = Güney Bavyera (Münih); 9 = Kuzey Bavyera (Frankonya) ve Thüringen.' },
          { badge: '02x–09x', title: 'Sabit Telefon Alan Kodları (Vorwahl)', body: 'Nereye bakılır: Tel. / Fon satırındaki 0 ile başlayan koda bakın. 02x Kuzey Ren-Vestfalya ve Kuzey Rheinland-Pfalz; 030 Berlin ve 033x–039x tüm eski Doğu Almanya eyaletleri (036x Thüringen, 038x–039x MV); 040 Hamburg ve 04x Schleswig-Holstein/Bremen/Kuzey NI; 05x Aşağı Saksonya ve Kuzey Hessen; 06x Frankfurt/Hessen, Saarland (068x) ve Pfalz; 07x Baden-Württemberg; 08x Güney Bavyera; 09x Kuzey Bavyera.' }
        ]
      },
      {
        id: 'saha', label: 'Mimari ve Tabela', icon: 'bulb',
        desc: 'Leitpfosten, Klinker tuğla, Plattenbau, soğan kubbe ve köy ekleri',
        title: 'Almanya Saha İpuçları: Mimari ve Yer Adı Sonekleri',
        lead: 'Sarı köy giriş tabelalarındaki (Ortsschild) yer adı ekleri ve evlerin dış cephesi Almanya’da kuzey, doğu, batı ve güneyi saniyesinde ayırır.',
        drill: 'visual',
        visuals: [
          { id: 'de-leitpfosten', title: 'Alman Yol Babası (Leitpfosten) & Sarı Levha', sub: 'Batı ve Merkez Almanya · NRW, Hessen, RP, Saarland', badge: 'Batı Kuşağı', body: 'Nereye bakılır: Yol kenarındaki siyah çapraz bantlı beyaz babalara (dikdörtgen beyaz/turuncu reflektör) ve sarı zeminli Bundesstraße yön tabelalarına bakın.', regions: ['nw', 'he', 'rp', 'sl'] },
          { id: 'de-klinker-north', title: 'Kuzey Almanya Kırmızı Klinker Tuğla', sub: 'Schleswig-Holstein, Hamburg, Bremen, Aşağı Saksonya', badge: 'Kuzey (PLZ 2–3)', body: 'Nereye bakılır: Evlerin dış cephesine bakın. Kuzey Almanya’da sıvasız koyu kırmızı Klinker tuğla evler, dümdüz çayırlar ve rüzgar türbinleri hakimdir.', regions: ['sh', 'hh', 'ni', 'hb'] },
          { id: 'de-onion-bavaria', title: 'Güney Almanya Soğan Kubbe & Alp Mimarisi', sub: 'Bavyera (PLZ 8–9) ve Baden-Württemberg (PLZ 7)', badge: 'Güney (PLZ 7–9)', body: 'Nereye bakılır: Köy merkezindeki kilise kulesine ve çatılara bakın. Soğan kubbeli (Zwiebelturm) kiliseler, çiçekli ahşap balkonlar ve -ing/-ingen bitimli sarı tabelalar Güney Almanya’yı verir.', regions: ['bw', 'by'] },
          { id: 'de-plattenbau-east', title: 'Doğu Almanya Plattenbau ve Taş Köy Yolu', sub: 'Berlin, Brandenburg, Saksonya, Thüringen, MV, Saksonya-Anhalt', badge: 'Doğu (03x / PLZ 0–1)', body: 'Nereye bakılır: Kasaba girişlerindeki 5–11 katlı prefabrik Plattenbau bloklara, Arnavut kaldırımlı köy yollarına ve -ow/-itz/-in ile biten yer adlarına bakın.', regions: ['be', 'bb', 'mv', 'sn', 'st', 'th'] }
        ],
        cards: [
          { badge: '-ing vs -ingen', title: 'Sarı Köy Tabelalarında Sonek Şifresi', body: 'Nereye bakılır: Köy girişindeki sarı tabelanın son hecesine bakın: -ing (Erding, Freising) = Bavyera; -ingen (Tübingen, Göppingen, Singen) = Baden-Württemberg; -ow, -itz, -in (Teltow, Chemnitz, Schwerin) = Doğu Almanya; -büttel, -husen, -stedt, -by = Kuzey Almanya; -scheid, -rath, -hoven = Kuzey Ren-Vestfalya / Rheinland.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 2. FRANSA (13 Metropolitan Bölge)
   * ======================================================================= */
  buildPack({
    id: 'fransa', name: 'Fransa', code: 'FR', area: 'Avrupa ve Avrasya', tone: 'blue',
    unitLabel: 'bölge', groupLabel: 'telefon kuşağı', codeLabel: 'telefon ve departman kodu',
    line: '13 bölge: 01–05 telefon kuşakları, 2 haneli CP posta kodu ve çatı/dil ipuçları',
    blurb: '01–05 sabit telefon bölgeleri, mavi Enedis direk plakaları, 2 haneli departman/posta önekleri ve arduvaz/kiremit çatı sınırıyla 13 Fransa bölgesi.',
    overviewLead: 'Fransa’da her sabit telefon numarası 01 ile 05 arasında başlar ve ülkeyi 5 dev kadran dilimine böler; 5 haneli posta kodunun (Code Postal) ilk iki rakamı ise doğrudan 01–95 departman numarasıdır.',
    quickTips: [
      '10 haneli sabit telefonun ilk iki rakamı: 01 = Île-de-France (Paris), 02 = Kuzeybatı, 03 = Kuzeydoğu, 04 = Güneydoğu (ve Korsika), 05 = Güneybatı.',
      'Kuzey Fransa’da koyu gri dik arduvaz (ardoise) veya düz kiremit çatılar; Güney Fransa’da (Nouvelle-Aquitaine, Occitanie, PACA, Korsika) açık pembe/sarı oluklu Roma kiremidi (tuile canal) kullanılır.',
      'Kavşaklardaki sarı şapkalı D-yolu ve mavi Enedis direk etiketleri yerel departman ve komün kodunu taşır.'
    ],
    plan1: '01 (Paris), 02 (Kuzeybatı), 03 (Kuzeydoğu), 04 (Güneydoğu) ve 05 (Güneybatı) telefon kadranlarını öğren.',
    plan2: 'Mavi Enedis direk etiketlerini, Michelin/D-yolu levhalarını ve Kuzey arduvaz vs Güney oluklu kiremit sınırını incele.',
    geoName: 'FR_GEO',
    themeCfg: {
      aria: 'Fransa 13 bölge haritası', fit: 'Tüm Fransa’yı göster',
      grid: { lat: [41, 51, 2], lon: [-5, 10, 3], txt: [42, 50, 2], refLon: 2, refLat: 46 },
      excludeWorld: ['France', 'Spain', 'Italy', 'Switzerland', 'Germany', 'Belgium', 'United Kingdom'],
      bg: [[-2.5, 46.0, 'Biskay Körfezi', 's'], [5.0, 42.2, 'Akdeniz', 's'], [-1.5, 50.2, 'Manş Denizi', 's'], [-2.5, 42.0, 'İSPANYA', 'c'], [8.5, 45.0, 'İTALYA', 'c'], [7.8, 46.8, 'İSVİÇRE', 'c'], [4.5, 50.7, 'BELÇİKA', 'c']]
    },
    groups: [
      { id: '01-idf', name: '01 · Île-de-France (Paris Havzası)', short: '01 Paris', color: '#3949ab', codeRange: '01 xx · CP 75, 77, 78, 91–95', desc: 'Paris ve çevresindeki 7 departman. Tüm sabit telefon numaraları 01 ile başlar.', keyCues: ['01 xx xx xx xx telefon numarası', '75, 77, 78, 91–95 posta önekleri', 'Haussmann kesme taş binalar ve RATP durakları'] },
      { id: '02-nw', name: '02 · Kuzeybatı (Grand Ouest)', short: '02 Kuzeybatı', color: '#1c5fa6', codeRange: '02 xx · Bretagne, Normandie, Loire', desc: 'Atlantik ve Manş kıyısı. Tüm sabit hatlar 02 ile başlar; koyu gri arduvaz çatılar ve granit/tüf taş mimari hakimdir.', keyCues: ['02 xx xx xx xx telefon numarası', 'Koyu gri arduvaz (ardoise) dik çatılar', 'Bretagne Ker-/Plou- yer adları ve çift dilli tabelalar'] },
      { id: '03-ne', name: '03 · Kuzeydoğu (Nord & Est)', short: '03 Kuzeydoğu', color: ' #a86a00', codeRange: '03 xx · Hauts-de-France, Grand Est, BFC', desc: 'Belçika ve Almanya sınır kuşağı. Tüm sabit hatlar 03 ile başlar; kuzeyde kırmızı tuğla, Alsace’ta yarı ahşap ve -heim/-willer ekleri görülür.', keyCues: ['03 xx xx xx xx telefon numarası', 'Hauts-de-France kırmızı tuğla sıra evler', 'Grand Est (Alsace) -heim/-bach/-willer yer adları'] },
      { id: '04-se', name: '04 · Güneydoğu (Sud-Est & Corse)', short: '04 Güneydoğu', color: '#c0262c', codeRange: '04 xx · Rhône-Alpes, PACA, Corse', desc: 'Alpler, Rhône Vadisi, Akdeniz kıyısı ve Korsika. Tüm sabit hatlar 04 ile başlar.', keyCues: ['04 xx xx xx xx telefon numarası', 'PACA/Korsika oluklu kiremit, servi ve mavi/yeşil panjur', 'Auvergne-Rhône-Alpes Alp şaleleri ve volkanik taş'] },
      { id: '05-sw', name: '05 · Güneybatı (Sud-Ouest)', short: '05 Güneybatı', color: '#0b6b3a', codeRange: '05 xx · Nouvelle-Aquitaine & Occitanie', desc: 'Biskay kıyısından Pireneler ve Toulouse’a uzanan güneybatı kuşağı. Tüm sabit hatlar 05 ile başlar (Doğu Occitanie 04 istisnası hariç).', keyCues: ['05 xx xx xx xx telefon numarası', 'Soluk pembe/sarı oluklu kiremit ve kırmızı tuğla (Toulouse)', '-ac, -ignac, -ens ile biten Oksitan/Gaskon yer adları'] }
    ],
    rawUnits: [
      ['ile-de-france', 'Île-de-France', 'Île-de-France', 'Paris', '01-idf', '01 · CP 75/77/78/91–95', 'fr-michelin-sign', '01 telefon & 75/91–95 posta', 'Her dükkan ve emlak tabelasında 01 ile başlayan 10 haneli telefon numarasını ve 75, 77, 78, 91, 92, 93, 94, 95 ile başlayan posta kodunu arayın', '01 alan kodu Fransa’da başka hiçbir bölgede kullanılmaz'],
      ['bretagne', 'Bretagne', 'Breizh / Bretagne', 'Rennes', '02-nw', '02 96–99 · CP 22/29/35/56', 'fr-breizh-slate', 'Çift dilli Bretonca & Ker-/Plou-', 'Tabelalarda 02 96/97/98/99 alan kodunu, CP 22/29/35/56 posta kodunu, beyaz granit duvarlı arduvaz çatılı evleri ve Ker-, Plou-, Tre-, Loc- ile başlayan çift dilli Bretonca yer tabelalarını arayın', 'Normandie (02 31–35) tek dilli Fransızcadır ve yarı ahşap/tuğla mimari kullanır'],
      ['normandie', 'Normandie', 'Normandie', 'Rouen', '02-nw', '02 31–35 · CP 14/27/50/61/76', 'fr-breizh-slate', '02 31–35 kodu, elma bahçeleri & -ville', '02 31–35 sabit telefon kodunu, CP 14/27/50/61/76 posta öneklerini, elma bahçeleri içindeki yarı ahşap (colombage) evleri ve -ville / -tot / -bec ile biten yer adlarını arayın', 'Bretagne batıda granit ve çift dilli Bretoncadır; Normandie -ville ekleri ve çakmaktaşı/ahşap dokusuyla ayrılır'],
      ['pays-de-la-loire', 'Pays de la Loire', 'Pays de la Loire', 'Nantes', '02-nw', '02 40–53 · CP 44/49/53/72/85', 'fr-enedis-pole', '02 4x kodu & beyaz tüf taşı', 'Nantes (02 40, CP 44), Angers (02 41, CP 49), Le Mans (02 43, CP 72) ve Vendée (02 51, CP 85) kodlarını; Loire vadisinde beyaz kireçtaşı (tuffeau) duvarları ve Vendée kıyısında kiremit çatıları arayın', 'Güneyindeki Nouvelle-Aquitaine 05 telefon kuşağına geçer; Pays de la Loire 02 kuşağındadır'],
      ['centre-val-de-loire', 'Centre-Val de Loire', 'Centre-Val de Loire', 'Orléans', '02-nw', '02 34–48 · CP 18/28/36/37/41/45', 'fr-michelin-sign', '02 38/47 kodu & düz Beauce tahıl ovası', 'Orléans (02 38, CP 45), Tours (02 47, CP 37), Chartres (02 37, CP 28) ve Bourges (02 48, CP 18) kodlarını; uçsuz bucaksız düz Beauce buğday ovalarını ve krem rengi taş köy evlerini arayın', 'Île-de-France kuzeyde 01 kullanır; Centre-Val de Loire 02 telefon kuşağının iç kara uzantısıdır'],
      ['hauts-de-france', 'Hauts-de-France', 'Hauts-de-France', 'Lille', '03-ne', '03 20–28 / 03 44 · CP 02/59/60/62/80', 'fr-enedis-pole', '03 2x kodu & kırmızı tuğla sıra evler', 'Lille (03 20, CP 59), Pas-de-Calais (03 21, CP 62), Amiens (03 22, CP 80) kodlarını ve Belçika tipi kırmızı tuğla sıra evleri (corons), pancar tarlalarını ve maden tepelerini arayın', 'Normandie (02) batıdadır; Hauts-de-France 03 2x kodu ve kırmızı tuğla sokaklarıyla hemen tanınır'],
      ['grand-est', 'Grand Est', 'Grand Est', 'Strasbourg', '03-ne', '03 24–29 / 03 87–89 · CP 08/10/51–57/67/68/88', 'fr-michelin-sign', '03 8x kodu, yarı ahşap & -heim/-willer', 'Strasbourg/Alsace (03 88/89, CP 67/68), Metz/Nancy (03 87/83, CP 54/57) ve Reims (03 26, CP 51) kodlarını; Alsace’ta renkli yarı ahşap evleri ve Almanca kökenli -heim, -bach, -willer köy adlarını arayın', 'Almanya tarafında sarı tabelalar vardır; Grand Est beyaz-kırmızı Fransız tabelalarında Almanca kökenli adlar taşır'],
      ['bourgogne-franche-comte', 'Bourgogne-Franche-Comté', 'Bourgogne-Franche-Comté', 'Dijon', '03-ne', '03 80–86 · CP 21/25/39/58/70/71/89/90', 'fr-enedis-pole', '03 80–86 kodu, bağlar & Jura çamları', 'Dijon (03 80, CP 21), Besançon (03 81, CP 25), Mâcon (03 85, CP 71) ve Auxerre (03 86, CP 89) kodlarını; Burgonya taş bağ köylerini ve İsviçre sınırında Jura köknar ormanlarını arayın', 'Güneyindeki Auvergne-Rhône-Alpes 04 telefon kuşağına geçer; Bourgogne-Franche-Comté 03 80–86 kuşağıdır'],
      ['auvergne-rhone-alpes', 'Auvergne-Rhône-Alpes', 'Auvergne-Rhône-Alpes', 'Lyon', '04-se', '04 70–79 · CP 01/03/07/15/26/38/42/43/63/69/73/74', 'fr-enedis-pole', '04 7x kodu, Alp şaleleri & koyu bazalt', 'Lyon (04 72/78, CP 69), Grenoble (04 76, CP 38), Savoie/Haute-Savoie (04 79/50, CP 73/74) ve Clermont-Ferrand (04 73, CP 63) kodlarını; doğuda Alp dağ şalelerini, batıda (Auvergne) koyu gri volkanik taş evleri arayın', 'PACA (04 9x) güneyde Akdeniz iklimindedir; Auvergne-Rhône-Alpes 04 7x kodu ve Alp/Masif Central dokusuyla ayrılır'],
      ['provence-alpes-cote-d-azur', 'Provence-Alpes-Côte d’Azur', 'PACA', 'Marsilya', '04-se', '04 90–94 / 04 42 · CP 04/05/06/13/83/84', 'fr-provence-tile', '04 9x kodu, oluklu kiremit & servi/zeytin', 'Marsilya/Aix (04 91/42, CP 13), Nice (04 93, CP 06), Toulon (04 94, CP 83) ve Avignon (04 90, CP 84) kodlarını; soluk pembe oluklu kiremit çatıları, mavi/yeşil panjurları, servi ağaçlarını ve beyaz kalker tepeleri arayın', 'Occitanie batıda 04 6x veya 05 6x kullanır; PACA 04 90–94 ve CP 04/05/06/13/83/84 kodlarıyla seçilir'],
      ['corse', 'Korsika', 'Corse / Corsica', 'Ajaccio', '04-se', '04 95 · CP 20xxx (2A / 2B)', 'fr-provence-tile', '04 95 kodu, CP 20xxx & Korsikaca tabelalar', 'Tüm adada tek tip 04 95 sabit alan kodunu, 20xxx ile başlayan posta kodunu, sarp makilik dağ yollarını ve Fransızca-Korsikaca çift dilli (-u/-a bitimli) tabelaları arayın', '04 95 telefon kodu ve 20xxx posta kodu yalnızca Korsika adasına aittir'],
      ['nouvelle-aquitaine', 'Nouvelle-Aquitaine', 'Nouvelle-Aquitaine', 'Bordeaux', '05-sw', '05 45–59 · CP 16/17/19/23/24/33/40/47/64/79/86/87', 'fr-provence-tile', '05 5x/4x kodu, Landes çamları & -ac eki', 'Bordeaux (05 56, CP 33), Pyrénées-Atlantiques (05 59, CP 64), Limoges (05 55, CP 87) ve Poitiers/La Rochelle (05 49/46) kodlarını; Landes düz sahil çamlarını, üzüm şatolarını ve -ac/-ignac yer eklerini arayın', 'Occitanie güneydoğuda 05 6x (Toulouse) ve 04 6x (Montpellier) kullanır; Nouvelle-Aquitaine 05 45–59 kuşağıdır'],
      ['occitanie', 'Occitanie', 'Occitanie', 'Toulouse', '05-sw', '05 61–65 & 04 66–68 · CP 09/11/12/30–32/34/46/48/65/66/81/82', 'fr-provence-tile', '05 6x Toulouse pembe tuğla & 04 6x Languedoc', 'Batıda Toulouse (05 61/62, CP 31) pembe tuğla mimarisini, doğuda Montpellier/Nîmes/Perpignan (04 66/67/68, CP 30/34/66) Akdeniz bağlarını ve Pirene dağ vadilerini arayın', 'Batı yarısı (Midi-Pyrénées) 05 6x, doğu Akdeniz yarısı (Languedoc-Roussillon) 04 66–68 alan kodunu taşır']
    ],
    topics: [
      {
        id: 'alan', label: '01–05 Telefon ve CP', icon: 'phone',
        desc: '01–05 sabit telefon kadranları ve 01–95 departman posta kodları',
        title: 'Fransa 01–05 Telefon Bölgeleri ve Code Postal (CP) Sistemi',
        lead: 'Fransa’da her dükkan tentasında, ticari minibüste ve reklam panosunda 01, 02, 03, 04 veya 05 ile başlayan 10 haneli telefon numarası ile 5 haneli posta kodu (ilk 2 hanesi departman numarası) yer alır.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '01..05', title: '5 Sabit Telefon Kuşağı (Indicatifs Téléphoniques)', body: 'Nereye bakılır: 0X XX XX XX XX biçimindeki 10 haneli numaraların ilk iki rakamına bakın: 01 = Île-de-France (Paris ve çevresi); 02 = Kuzeybatı (Bretagne, Normandie, Pays de la Loire, Centre-Val de Loire); 03 = Kuzeydoğu (Hauts-de-France, Grand Est, Bourgogne-Franche-Comté); 04 = Güneydoğu (Auvergne-Rhône-Alpes, PACA, Korsika 04 95 ve Doğu Occitanie 04 66–68); 05 = Güneybatı (Nouvelle-Aquitaine ve Batı Occitanie 05 61–65).' },
          { badge: 'CP 01–95', title: '5 Haneli Posta Kodu ve Mavi Enedis Direk Plakaları', body: 'Nereye bakılır: Adreslerdeki 5 haneli sayıya (ör. 33000 Bordeaux, 69000 Lyon, 13000 Marseille, 59000 Lille, 67000 Strasbourg) ve elektrik direklerindeki mavi Enedis metal plakasına bakın. İlk iki rakam doğrudan 01–95 departman numarasıdır.' }
        ]
      },
      {
        id: 'saha', label: 'Direk, Çatı ve Dil', icon: 'bulb',
        desc: 'Enedis mavi plaka, D/N yol kartuşları, arduvaz vs kiremit sınırı',
        title: 'Fransa Saha İpuçları: Direk, Çatı ve Yer Adları',
        lead: 'Fransa’da çatı malzemesi (arduvaz vs oluklu kiremit) kuzey ile güneyi bıçak gibi keser; yer adı ekleri ise sınır bölgelerini ele verir.',
        drill: 'visual',
        visuals: [
          { id: 'fr-enedis-pole', title: 'Mavi Enedis Plakalı Beton Direk', sub: 'Kuzeydoğu, Merkez ve Loire Kuşağı', badge: 'Enedis Direği', body: 'Nereye bakılır: Gövdesi dikdörtgen girintili beton direklerin göz hizasındaki yatay mavi metal etikete (Enedis / EDF) bakın.', regions: ['hauts-de-france', 'bourgogne-franche-comte', 'pays-de-la-loire', 'auvergne-rhone-alpes'] },
          { id: 'fr-michelin-sign', title: 'Sarı/Kırmızı Şapkalı D ve N Yön Levhaları', sub: 'Île-de-France, Grand Est, Centre-Val de Loire', badge: 'D / N Karayolu', body: 'Nereye bakılır: Kavşak levhalarının tepesindeki küçük sarı (D = Départementale) veya kırmızı (N = Nationale) kutucuğa bakın.', regions: ['ile-de-france', 'centre-val-de-loire', 'grand-est'] },
          { id: 'fr-breizh-slate', title: 'Kuzeybatı Arduvaz Çatı ve Granit Duvar', sub: 'Bretagne (02 9x) ve Normandie (02 3x)', badge: '02 Kuzeybatı', body: 'Nereye bakılır: Dik eğimli koyu gri-siyah arduvaz (ardoise) çatılara, granit taş cephelere ve Ker-/Plou- veya -ville yer adlarına bakın.', regions: ['bretagne', 'normandie'] },
          { id: 'fr-provence-tile', title: 'Güney Fransa Oluklu Kiremit ve Panjur', sub: 'PACA, Occitanie, Nouvelle-Aquitaine, Korsika', badge: '04 / 05 Güney', body: 'Nereye bakılır: Az eğimli soluk pembe-sarı oluklu kiremit çatılara (tuile canal), renkli ahşap panjurlara ve -ac/-argues yer adlarına bakın.', regions: ['provence-alpes-cote-d-azur', 'occitanie', 'nouvelle-aquitaine', 'corse'] }
        ],
        cards: [
          { badge: 'Toponimi', title: 'Bölgesel Yer Adı Önek ve Sonekleri', body: 'Nereye bakılır: Köy giriş tabelalarına bakın: Ker-, Plou-, Lann-, Tre- = Bretagne; -ville, -tot, -bec = Normandie; -heim, -willer, -bach, -house = Grand Est (Alsace); -ac, -ignac, -ens = Güneybatı (Nouvelle-Aquitaine & Occitanie); -argues, -osc = Provence/Languedoc.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 3. İSPANYA (19 Özerk Bölge ve Şehir)
   * ======================================================================= */
  buildPack({
    id: 'ispanya', name: 'İspanya', code: 'ES', area: 'Avrupa ve Avrasya', tone: 'red',
    unitLabel: 'özerk bölge', groupLabel: 'coğrafi kuşak', codeLabel: '91–98 alan ve 01–52 posta kodu',
    line: '19 özerk bölge: 91–98 telefon, 01–52 posta kodu ve Katalanca/Galiçyaca/Baskça levhalar',
    blurb: '91–98 sabit telefon kodları, 01–52 posta önekleri, bölgesel otoyol harfleri ve 4 resmi dilin sokak tabelalarıyla 19 İspanya özerk bölgesi.',
    overviewLead: 'İspanya’da sabit telefon numaraları 91–98 (veya 81–88) ile başlar; sokak tabelalarındaki "sokak" kelimesi (Calle, Carrer, Rúa, Kalea) ve otoyol kodu harfleri (C-, AG-, A-, EX-, CM-, CL-) doğrudan özerk bölgeyi söyler.',
    quickTips: [
      'Sokak tabelasında: Calle = İspanyolca (Merkez/Güney), Carrer = Katalanca (Katalonya, Valensiya, Balear), Rúa = Galiçyaca (Galiçya), Kalea = Baskça (Bask Bölgesi ve Navarra).',
      'Sabit telefon alan kodları: 91 Madrid, 93 Barcelona/Katalonya, 94 Bask/Cantabria/La Rioja/Navarra, 95 Endülüs, 96 Valensiya/Murcia, 97 Aragon/Katalonya/Balear, 98 Galiçya/Asturias/Castilla y León, 92x Merkez ve Kanarya Adaları.',
      'Kuzey kıyısı (Galiçya, Asturias, Cantabria, Bask) yağışlı ve yemyeşil okaliptüs/çayır kuşağıdır; İç ve Güney İspanya kuru sarı plato ve zeytinliktir.'
    ],
    plan1: '91–98 sabit telefon kodlarını ve Calle / Carrer / Rúa / Kalea dil ayrımını öğren.',
    plan2: 'Bölgesel otoyol harflerini (C-, AG-, EX-, CL-, A-), Galiçya hórreo ambarlarını ve Endülüs beyaz köylerini incele.',
    geoName: 'ES_GEO',
    themeCfg: {
      aria: 'İspanya 19 özerk bölge haritası', fit: 'Anakara İspanya’yı göster',
      grid: { lat: [28, 44, 2], lon: [-18, 4, 2], txt: [36, 42, 2], refLon: -4, refLat: 40 },
      excludeWorld: ['Spain', 'Portugal', 'France', 'Morocco', 'Andorra'],
      bg: [[-8.2, 39.6, 'PORTEKİZ', 'c'], [0.5, 43.4, 'FRANSA', 'c'], [-5.0, 34.5, 'FAS', 'c'], [1.8, 40.0, 'Akdeniz', 's'], [-5.5, 44.2, 'Biskay Körfezi', 's']]
    },
    groups: [
      { id: 'kuzeybati', name: 'Yeşil Kuzeybatı (Galicia & Asturias)', short: 'Kuzeybatı', color: '#0b6b3a', codeRange: '98x · CP 15, 27, 32, 33, 36', desc: 'Atlantik yağış kuşağı: okaliptüs ormanları, granit hórreo ambarları ve Galiçyaca/Asturyasca tabelalar.', keyCues: ['Galiçya: Rúa, Concello, AG-/OU-/LU- yolları, 981–988', 'Asturias: AS- yolları, 985/984 kodu, elma şarabı vadileri', 'Granit taş mimari ve yeşil yamaçlar'] },
      { id: 'kuzey', name: 'Kuzey ve Ebro (Bask, Navarra, Cantabria, Rioja)', short: 'Kuzey', color: '#0e7a80', codeRange: '94x · CP 01, 20, 26, 31, 39, 48', desc: '94x telefon kuşağı. Baskça Kalea/Udala tabelaları, dağ geçitleri ve Rioja bağları.', keyCues: ['941–948 sabit telefon kuşağı', 'Baskça Kalea, Udala, -eta/-egi/-zabal ekleri', 'CA- (Cantabria), NA- (Navarra), LR- (Rioja) yolları'] },
      { id: 'dogu', name: 'Doğu ve Akdeniz (Cataluña, Valencia, Aragón, Baleares)', short: 'Doğu', color: '#1c5fa6', codeRange: '93 / 96 / 97 · CP 03, 07, 08, 12, 17, 22, 25, 43, 44, 46, 50', desc: 'Katalanca/Valensiyaca Carrer tabelaları, C- ve CV- otoyolları, sarı-kırmızı Senyera bayrakları.', keyCues: ['Carrer (sokak) ve Ajuntament (belediye) tabelaları', '93/97 (Katalonya), 96 (Valensiya), 971 (Balear), 974–978 (Aragon)', 'C- (Katalonya), CV- (Valensiya), A- (Aragon), Ma-/Me-/PM- (Balear) yolları'] },
      { id: 'merkez', name: 'Merkez Plato (Madrid, Castilla, Extremadura)', short: 'Merkez', color: '#a86a00', codeRange: '91 / 92x / 94x / 98x · Meseta Platosu', desc: 'İç Meseta platosu: Madrid metropolü (91), Castilla-La Mancha yel değirmenleri (CM-), Castilla y León kaleleri (CL-) ve Extremadura meşe savanları (EX-).', keyCues: ['Madrid: 91 kodu, CP 28xxx, M- otoyolları', 'CL- (Castilla y León), CM- (Castilla-La Mancha), EX- (Extremadura) yolları', 'Geniş sarı-kızıl tahıl ovaları ve seyrek meşe (dehesa) otlakları'] },
      { id: 'guney', name: 'Güney (Andalucía, Murcia, Ceuta, Melilla)', short: 'Güney', color: '#c0262c', codeRange: '95x / 968 · CP 04, 11, 14, 18, 21, 23, 29, 30, 41, 51, 52', desc: 'Endülüs beyaz kasabaları, uçsuz bucaksız zeytinlikler, Murcia seraları ve Kuzey Afrika özerk şehirleri.', keyCues: ['950–959 Endülüs ve 968 Murcia telefon kodu', 'Bembeyaz badanalı evler ve zeytinlik tepeler', 'Yeşil/turuncu A- (Andalucía) ve RM- (Región de Murcia) yolları'] },
      { id: 'kanarya', name: 'Kanarya Adaları (Islas Canarias)', short: 'Kanarya', color: '#5b3fa0', codeRange: '922 / 928 · CP 35xxx & 38xxx', desc: 'Atlantik volkanik takımadaları: siyah lav toprağı, palmiyeler ve GC-/TF-/LZ-/FV- ada yolları.', keyCues: ['928 (Doğu: Gran Canaria/Lanzarote/Fuerteventura, CP 35xxx)', '922 (Batı: Tenerife/La Palma/Gomera/Hierro, CP 38xxx)', 'Siyah volkanik bazalt toprak ve GC-/TF- yol levhaları'] }
    ],
    rawUnits: [
      ['galicia', 'Galiçya', 'Galicia / Galiza', 'Santiago de Compostela', 'kuzeybati', '981 / 982 / 986 / 988 · CP 15/27/32/36', 'es-galicia-horreo', 'Rúa tabelası, granit hórreo & AG-/LU-/OU-/PO-', 'Sokak tabelalarında Rúa / Concello kelimelerini, 981/982/986/988 telefon kodlarını, bahçelerde taş ayaklı tahıl ambarlarını (hórreo) ve okaliptüs ormanlarını arayın', 'Asturias (985) tek dilli İspanyolca/Asturyasca AS- yollarını kullanır; Galiçya Rúa ve AG-/LU-/OU-/PO- kodlarıyla ayrılır'],
      ['asturias', 'Asturias', 'Principado de Asturias', 'Oviedo', 'kuzeybati', '985 / 984 · CP 33xxx', 'es-galicia-horreo', '985 kodu, AS- yolları & kare hórreo', 'Tabelalarda 985/984 alan kodunu, 33xxx posta kodunu, AS-xx bölge yolu levhalarını ve Galiçya’dakinden farklı olarak kare planlı ahşap hórreo ambarlarını arayın', 'Cantabria doğuda 942 ve CA- yollarını kullanır'],
      ['cantabria', 'Cantabria', 'Cantabria', 'Santander', 'kuzey', '942 · CP 39xxx', 'es-hito-bollard', '942 kodu, CA-xxx yolları & yeşil mera', '942 sabit alan kodunu, 39xxx posta kodunu ve CA-xxx il yolu levhalarını arayın; Picos de Europa dağları önünde taş duvarlı yemyeşil süt çiftlikleri tipiktir', 'Bask Bölgesi doğuda çift dilli Baskça tabelalara geçer; Cantabria tek dilli İspanyolcadır'],
      ['pais-vasco', 'Bask Bölgesi', 'País Vasco / Euskadi', 'Vitoria-Gasteiz', 'kuzey', '94 / 943 / 945 · CP 01/20/48', 'es-hito-bollard', 'Baskça Kalea/Udala & BI-/GI-/A- yolları', 'Özel kalın harfli Baskça tabelaları (Kalea, Udala, Hiribidea, -eta/-egi), 94 (Bilbao, CP 48), 943 (San Sebastián, CP 20), 945 (Vitoria, CP 01) kodlarını ve BI-/GI- yollarını arayın', 'Navarra güneydoğuda NA- yollarını ve 948 kodunu kullanır'],
      ['foral-de-navarra', 'Navarra', 'Comunidad Foral de Navarra', 'Pamplona', 'kuzey', '948 · CP 31xxx', 'es-hito-bollard', '948 kodu & NA-xxx karayolları', 'Tüm bölgede 948 alan kodunu, 31xxx posta kodunu ve kırmızı-beyaz NA-xxx karayolu levhalarını arayın; kuzeyi yeşil Pirene/Baskça, güneyi kurak Ebro vadisidir', 'La Rioja güneybatıda 941 ve LR- yollarıyla ayrılır'],
      ['la-rioja', 'La Rioja', 'La Rioja', 'Logroño', 'kuzey', '941 · CP 26xxx', 'es-hito-bollard', '941 kodu, LR-xxx yolları & üzüm bağları', '941 alan kodunu, 26xxx posta kodunu, LR-xxx yol levhalarını ve Ebro vadisi boyunca uzanan bakımlı şarap bağlarını (Bodegas) arayın', 'Navarra (948) ve Burgos/Castilla y León (947) komşularından LR- yol koduyla ayrılır'],
      ['aragon', 'Aragon', 'Aragón', 'Zaragoza', 'dogu', '976 / 974 / 978 · CP 22/44/50', 'es-hito-bollard', '974/976/978 kodu & A-xxx turuncu/sarı yol', 'Zaragoza (976, CP 50), Huesca (974, CP 22) ve Teruel (978, CP 44) kodlarını; boz-sarı kurak Ebro bozkırlarını ve Pirene dağ eteklerini arayın', 'Katalonya doğuda Katalanca Carrer ve C- yollarına geçer; Aragon İspanyolca konuşur'],
      ['cataluna', 'Katalonya', 'Catalunya / Cataluña', 'Barselona', 'dogu', '93 / 972 / 973 / 977 · CP 08/17/25/43', 'es-catalan-sign', 'Katalanca Carrer, C- yolları & 93/97x', 'Tek dilli Katalanca tabelaları (Carrer, Passeig, Ajuntament), mavi/kırmızı C-xx otoyol levhalarını, sarı-kırmızı çizgili Senyera bayraklarını ve 93 (Barcelona), 972 (Girona), 973 (Lleida), 977 (Tarragona) kodlarını arayın', 'Valensiya güneyde CV- yollarını ve 96x telefon kodunu kullanır'],
      ['valenciana', 'Valensiya', 'Comunitat Valenciana', 'Valensiya', 'dogu', '96 / 964 / 965 / 966 · CP 03/12/46', 'es-catalan-sign', '96x kodu, CV-xxx yolları & narenciye', 'Valensiya (96, CP 46), Alicante (965/966, CP 03) ve Castellón (964, CP 12) kodlarını; CV-xxx (Comunitat Valenciana) yol levhalarını ve portakal bahçelerini arayın', 'Katalonya C- yollarını ve 93/97x kodunu kullanır; Valensiya CV- ve 96x ile net ayrılır'],
      ['islas-baleares', 'Balear Adaları', 'Illes Balears', 'Palma', 'dogu', '971 · CP 07xxx', 'es-catalan-sign', '971 kodu, CP 07xxx & Ma-/Me-/PM- yolları', 'Tüm takımadada 971 alan kodunu, 07xxx posta kodunu, kuru taş duvarlı Akdeniz ada yollarını ve Ma- (Mallorca), Me- (Menorca), E- (Ibiza) yol kodlarını arayın', '971 ve 07xxx kodları yalnızca Balear Adaları’na aittir'],
      ['madrid', 'Madrid', 'Comunidad de Madrid', 'Madrid', 'merkez', '91 · CP 28xxx', 'es-hito-bollard', '91 telefon, 28xxx posta & M-xx çevre yolları', 'Her afiş ve tabelada 91 sabit telefon kodunu, 28xxx posta kodunu, M-30/M-40/M-50/M-xxx otoyol levhalarını ve yeşil-kırmızı Madrid bölgesel otobüs/metro dokusunu arayın', 'Çevresindeki Castilla-La Mancha ve Castilla y León 92x/94x kodlarını ve CM-/CL- yollarını kullanır'],
      ['castilla-y-leon', 'Castilla y León', 'Castilla y León', 'Valladolid', 'merkez', '983 / 987 / 947 / 921 / 923 · CP 05/09/24/34/37/40/42/47/49', 'es-hito-bollard', 'CL-xxx yolları & Kuzey Meseta tahıl ovası', 'Valladolid (983), León (987), Burgos (947), Salamanca (923), Segovia (921) kodlarını; CL-xxx veya il harfli (BU-/LE-/SA-/VA-) yol levhalarını ve yüksek sarı buğday platolarını arayın', 'Güneydeki Castilla-La Mancha CM- yollarını ve zeytin/bağ düzlüklerini kullanır'],
      ['castilla-la-mancha', 'Castilla-La Mancha', 'Castilla-La Mancha', 'Toledo', 'merkez', '925 / 926 / 949 / 967 / 969 · CP 02/13/16/19/45', 'es-andalucia-white', 'CM-xxx yolları, kızıl toprak & bağ/değirmen', 'Toledo (925, CP 45), Ciudad Real (926, CP 13), Albacete (967, CP 02), Guadalajara (949, CP 19), Cuenca (969, CP 16) kodlarını ve CM-xxx (Castilla-La Mancha) levhalarını arayın; kızıl topraklı dümdüz bağ ve zeytin ovaları tipiktir', 'Endülüs güneyde 95x kodunu ve A-xxx yollarını kullanır; Castilla-La Mancha CM-xxx levhasıyla ayrılır'],
      ['extremadura', 'Extremadura', 'Extremadura', 'Mérida', 'merkez', '924 / 927 · CP 06xxx & 10xxx', 'es-andalucia-white', '924/927 kodu, EX-xxx yolları & Dehesa meşeleri', 'Badajoz (924, CP 06xxx) ve Cáceres (927, CP 10xxx) kodlarını, EX-xxx otoyol/bölge yolu levhalarını ve seyrek mantar meşeli (dehesa) kuru otlakları arayın', 'Portekiz sınırındadır; EX- yol kodu ve 924/927 telefon kodları yalnızca Extremadura’da görülür'],
      ['andalucia', 'Endülüs', 'Andalucía', 'Sevilla', 'guney', '950–959 · CP 04/11/14/18/21/23/29/41', 'es-andalucia-white', '95x telefon, A-xxx yolları & beyaz köyler', 'Sevilla (954/955), Málaga (952/951), Granada (958), Córdoba (957), Cádiz (956), Jaén (953), Almería (950), Huelva (959) gibi 95x sabit alan kodlarını, bembeyaz badanalı köyleri ve sonsuz zeytinlik tepeleri arayın', 'Murcia doğuda 968 ve RM- yollarını kullanır; 95x telefon kuşağı bütünüyle Endülüs’e aittir'],
      ['murcia', 'Murcia', 'Región de Murcia', 'Murcia', 'guney', '968 · CP 30xxx', 'es-andalucia-white', '968 kodu, CP 30xxx & RM-xxx yolları', 'Tüm bölgede 968 sabit telefon kodunu, 30xxx posta kodunu, RM-xxx (Región de Murcia) karayolu levhalarını ve kurak dağlar arasındaki yoğun sebze-meyve tarım havzasını arayın', 'Alicante/Valensiya kuzeyde 965/966 ve CV- yollarını kullanır; Murcia 968 ve RM- ile kesin ayrılır'],
      ['ceuta', 'Ceuta', 'Ciudad Autónoma de Ceuta', 'Ceuta', 'guney', '956 / 856 · CP 5100x', 'es-andalucia-white', 'CP 5100x & Cebelitarık karşı kıyısı', 'Tabelalarda 51001–51005 posta kodunu, 956 alan kodunu ve dar dağlık yarımada liman dokusunu arayın', 'Melilla doğuda 952 ve 5200x posta kodunu kullanır'],
      ['melilla', 'Melilla', 'Ciudad Autónoma de Melilla', 'Melilla', 'guney', '952 / 852 · CP 5200x', 'es-andalucia-white', 'CP 5200x, palmiyeli bulvar & Fas sınırı', 'Tabelalarda 52001–52006 posta kodunu, 952 alan kodunu, ML-xxx yollarını ve Art Deco/modernist sahil mimarisini arayın', 'Ceuta batıda 5100x posta kodunu kullanır'],
      ['canary-is', 'Kanarya Adaları', 'Islas Canarias', 'Las Palmas / Santa Cruz', 'kanarya', '922 / 928 · CP 35xxx & 38xxx', 'es-andalucia-white', '922/928 kodu, siyah lav & GC-/TF- yolları', 'Las Palmas/Gran Canaria/Lanzarote/Fuerteventura için 928 (CP 35xxx, GC-/LZ-/FV- yolları), Tenerife/La Palma için 922 (CP 38xxx, TF-/LP- yolları) kodlarını ve siyah volkanik bazalt kayaları arayın', 'Balear Adaları Akdeniz’de 971 ve 07xxx kullanır; Kanarya Adaları 922/928 ve siyah volkanik dokusuyla benzersizdir']
    ],
    topics: [
      {
        id: 'alan', label: 'Telefon, Posta ve Dil', icon: 'phone',
        desc: '91–98 telefon kodları, 01–52 posta önekleri ve 4 resmi dil',
        title: 'İspanya 91–98 Telefon Kodları ve Bölgesel Diller',
        lead: 'İspanya’da sokak tabelası dili ve 91–98 telefon alan kodu kombinasyonu 19 özerk bölgeyi doğrudan verir.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '91–98', title: 'Sabit Telefon Alan Kodları (Prefijos Telefónicos)', body: 'Nereye bakılır: Dükkan ve emlak panolarındaki 9 haneli sabit numaraların ilk 2–3 rakamına bakın: 91 = Madrid; 92x = Castilla, Extremadura (924/927) ve Kanarya Adaları (922/928); 93 = Barcelona; 94x = Bask Bölgesi, Cantabria (942), La Rioja (941), Navarra (948); 95x = Tüm Endülüs ve Ceuta/Melilla; 96x = Valensiya (96/964/965/966) ve Murcia (968); 97x = Balear (971), Katalonya (972/973/977) ve Aragon (974/976/978); 98x = Galiçya (981/982/986/988), Asturias (985) ve Kuzey Castilla y León (983/987).' },
          { badge: '4 Dil', title: 'Sokak Tabelasında Calle vs Carrer vs Rúa vs Kalea', body: 'Nereye bakılır: Bina köşelerindeki sokak plakalarına bakın: Carrer / Plaça / Avinguda = Katalonya, Valensiya ve Balear Adaları; Rúa / Praza / Concello = Galiçya; Kalea / Plaza / Udala (ve bol x, k, z, tx harfi) = Bask Bölgesi ve Kuzey Navarra; Calle / Ayuntamiento = Diğer tüm İspanyolca bölgeler.' }
        ]
      },
      {
        id: 'saha', label: 'Yol Kodu ve Mimari', icon: 'bulb',
        desc: 'Otoyol bölge harfleri (C-, CV-, EX-, CL-, CM-, A-), hórreo ve beyaz köyler',
        title: 'İspanya Saha İpuçları: Bölgesel Yol Harfleri ve Mimari',
        lead: 'İspanya’da özerk bölge karayolları doğrudan bölgenin baş harflerini taşır.',
        drill: 'visual',
        visuals: [
          { id: 'es-hito-bollard', title: 'İspanyol Yol Babası ve Bölge Yolu Levhası', sub: 'Merkez ve Kuzey · Madrid (M-), Bask (BI-/GI-), Navarra (NA-)', badge: 'Bölge Yolu Kodu', body: 'Nereye bakılır: Üstü eğimli, turuncu-sarı reflektörlü yol babalarına ve M-, NA-, CA-, CL-, LR- önekli kilometre levhalarına bakın.', regions: ['madrid', 'castilla-y-leon', 'pais-vasco', 'foral-de-navarra', 'cantabria', 'la-rioja', 'aragon'] },
          { id: 'es-catalan-sign', title: 'Doğu İspanya Carrer ve C- / CV- Yolu Levhası', sub: 'Katalonya (C-), Valensiya (CV-), Balear (Ma-/Me-)', badge: 'Katalanca & Doğu', body: 'Nereye bakılır: Carrer sokak plakalarına ve C- (Catalunya) veya CV- (Comunitat Valenciana) otoyol kodlarına bakın.', regions: ['cataluna', 'valenciana', 'islas-baleares'] },
          { id: 'es-galicia-horreo', title: 'Kuzeybatı Granit Hórreo ve Okaliptüs Ormanı', sub: 'Galiçya (981–988) ve Asturias (985)', badge: 'Yeşil İspanya', body: 'Nereye bakılır: Taş ayaklar üzerinde yükseltilmiş tahıl ambarlarına (hórreo), yağışlı yeşil tepelere ve Rúa tabelalarına bakın.', regions: ['galicia', 'asturias'] },
          { id: 'es-andalucia-white', title: 'Güney Beyaz Kasaba (Pueblo Blanco) ve Zeytinlik', sub: 'Endülüs (95x), Castilla-La Mancha, Extremadura, Murcia, Kanarya', badge: 'Güney & Zeytin', body: 'Nereye bakılır: Bembeyaz kireç badanalı sokaklara, kırmızı/sarı kurak toprağa ve ufka kadar uzanan zeytinliklere bakın.', regions: ['andalucia', 'castilla-la-mancha', 'extremadura', 'murcia', 'canary-is'] }
        ],
        cards: [
          { badge: 'Yol Harfleri', title: 'Karayolu Kalkanlarındaki Bölge Kısaltmaları', body: 'Nereye bakılır: Turuncu, yeşil veya sarı yol tabelalarındaki harf önekine bakın: A- = Endülüs (veya ulusal Autovía), AG-/LU-/OU-/PO-/AC- = Galiçya, AS- = Asturias, CA- = Cantabria, BI-/GI- = Bask, NA- = Navarra, LR- = La Rioja, C- = Katalonya, CV- = Valensiya, M- = Madrid, CL- = Castilla y León, CM- = Castilla-La Mancha, EX- = Extremadura, RM- = Murcia, GC-/TF- = Kanarya.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 4. İTALYA (20 Bölge - Regioni)
   * ======================================================================= */
  buildPack({
    id: 'italya', name: 'İtalya', code: 'IT', area: 'Avrupa ve Avrasya', tone: 'green',
    unitLabel: 'bölge', groupLabel: 'coğrafi kuşak', codeLabel: '01–09 telefon ve CAP posta kodu',
    line: '20 bölge: 01–09 telefon, 00–98 CAP posta kodu ve SP taşlarındaki 2 harfli il kodları',
    blurb: '01–09 sabit telefon alan kodları, 5 haneli CAP posta kodları, SP kilometre taşlarındaki 2 harfli il kısaltmaları ve Kuzey-Güney mimarisiyle 20 İtalya bölgesi.',
    overviewLead: 'İtalya’da her sabit telefon numarası 01 ile 09 arasında başlar ve kuzeybatıdan güneye doğru düzenli iner; yol kenarındaki mavi-beyaz SP (Strada Provinciale) kilometre taşlarının üstünde ise 2 harfli il kısaltması (MI, TO, VE, FI, RM, NA, BA, PA) açıkça yazar.',
    quickTips: [
      'Sabit telefon ilk iki rakamı: 01 Kuzeybatı (Piemonte/Liguria), 02 Milano, 03 Lombardiya, 04 Kuzeydoğu (Veneto/Trentino/Friuli), 05 Emilia-Romagna ve Toskana, 06 Roma/Lazio, 07 Umbria/Marche/Sardinya, 08 Abruzzo/Campania/Puglia, 09 Calabria/Sicilya.',
      'Yol kenarındaki küçük beyaz/mavi SP kilometre tabelalarında Roma rakamının veya SP numarasının hemen yanında 2 harfli il kodu (ör. Prov. di FI = Firenze/Toskana) bulunur.',
      'Trentino-Alto Adige’de Almanca-İtalyanca, Valle d’Aosta’da Fransızca-İtalyanca, Friuli’de İtalyanca-Slovence/Friulce çift dilli tabelalar görülür.'
    ],
    plan1: '01’den 09’a kuzeyden güneye inen sabit telefon ve 00xxx–98xxx CAP posta kuşaklarını öğren.',
    plan2: 'SP kilometre taşlarındaki 2 harfli il kodlarını, Enel direk etiketlerini ve Alp/Toskana/Puglia mimarisini incele.',
    geoName: 'IT_GEO',
    themeCfg: {
      aria: 'İtalya 20 bölge haritası', fit: 'Tüm İtalya’yı göster',
      grid: { lat: [36, 47, 2], lon: [6, 19, 2], txt: [38, 46, 2], refLon: 12, refLat: 42 },
      excludeWorld: ['Italy', 'France', 'Switzerland', 'Austria', 'Slovenia', 'Croatia', 'Tunisia'],
      bg: [[15.5, 43.2, 'Adriyatik Denizi', 's'], [11.5, 40.0, 'Tiren Denizi', 's'], [17.0, 38.0, 'İyon Denizi', 's'], [8.2, 46.8, 'İSVİÇRE', 'c'], [13.5, 47.2, 'AVUSTURYA', 'c'], [14.8, 45.8, 'SLOVENYA', 'c']]
    },
    groups: [
      { id: 'kuzeybati', name: 'Kuzeybatı (01x / 02 / 03x · Piemonte, Lombardia, Liguria, Aosta)', short: 'Kuzeybatı (01–03)', color: '#1c5fa6', codeRange: '01x · 02 · 03x · CAP 10xxx–29xxx', desc: 'Po Ovası batısı, Milano sanayi havzası ve Batı Alpler. Sabit telefonlar 01, 02 veya 03 ile başlar.', keyCues: ['01x Piemonte/Liguria/Aosta, 02 Milano, 03x Lombardiya', 'CAP 1xxxx (Piemonte/Liguria) ve 2xxxx (Lombardiya)', 'TO, CN, AL, GE, MI, BG, BS il kısaltmaları'] },
      { id: 'kuzeydogu', name: 'Kuzeydoğu (04x / 05x · Veneto, Trentino, Friuli, Emilia-Romagna)', short: 'Kuzeydoğu (04–05)', color: '#0e7a80', codeRange: '04x · 051–054 · CAP 30xxx–48xxx', desc: 'Dolomitler, Venedik lagünü ve Doğu Po Ovası. Veneto/Trentino/Friuli 04x (CAP 3xxxx), Emilia-Romagna 051–054/052x (CAP 4xxxx).', keyCues: ['04x Veneto/Trentino/Friuli (CAP 3xxxx)', '051–054 Emilia-Romagna (CAP 4xxxx)', 'Güney Tirol (BZ) Almanca-İtalyanca çift dilli tabelalar'] },
      { id: 'merkez', name: 'Merkez İtalya (055–058 / 06 / 07x · Toscana, Lazio, Umbria, Marche)', short: 'Merkez (05–07)', color: '#a86a00', codeRange: '055–058 · 06 · 071–077 · CAP 00xxx–06xxx / 50xxx–63xxx', desc: 'Toskana servi tepeleri, Roma (06) ve Apeninler. CAP 5xxxx Toskana, 00xxx–04xxx Lazio, 05xxx–06xxx Umbria, 60xxx–63xxx Marche.', keyCues: ['055–058 Toskana (CAP 5xxxx), 06 Roma ve 076x/077x Lazio', '071–073 Marche, 074x–075 Umbria', 'Sarı-kırmızımsı taş çiftlikler (casali) ve servi dizileri'] },
      { id: 'guney', name: 'Güney İtalya / Mezzogiorno (08x / 09x · Campania, Puglia, Calabria, Abruzzo)', short: 'Güney (08–09)', color: '#c0262c', codeRange: '08x · 096x–098x · CAP 64xxx–89xxx', desc: 'Napoli, Adriyatik zeytinlikleri ve Calabria yarımadası. 08x Abruzzo/Molise/Campania/Puglia; 096x–098x Calabria ve Basilicata.', keyCues: ['081 Napoli, 080 Bari, 085 Pescara, 089 Salerno', '096x–098x Calabria ve 097x Basilicata', 'Puglia kuru taş duvarlar ve beyaz badanalı düz damlı evler'] },
      { id: 'adalar', name: 'Büyük Adalar (09x / 07x · Sicilya ve Sardinya)', short: 'Adalar (09x / 07x)', color: '#5b3fa0', codeRange: '090–095 Sicilya (90xxx–98xxx) · 070/078x/079 Sardinya (07xxx–09xxx)', desc: 'Sicilya (090–095, CAP 90xxx–98xxx) ve Sardinya (070/078x/079, CAP 07xxx–09xxx).', keyCues: ['Sicilya: 090–095 telefon ve 90xxx–98xxx CAP, PA/CT/ME/SR kodları', 'Sardinya: 070/078x/079 telefon ve 07xxx–09xxx CAP, CA/SS/NU/OR', 'Frenkinciri kaktüsleri, kurak makilik ve ada taş duvarları'] }
    ],
    rawUnits: [
      ['piemonte', 'Piemonte', 'Piemonte', 'Torino', 'kuzeybati', '011–017x · CAP 10xxx–15xxx / 28xxx', 'it-enel-pole', '011–017x kodu & TO/CN/AL/AT taşları', 'Tabelalarda 011 (Torino), 0171 (Cuneo), 0131 (Alessandria), 0141 (Asti) alan kodlarını; SP taşlarında TO, CN, AL, NO, VC kısaltmalarını ve Langhe bağ tepeleriyle Po çeltik tarlalarını arayın', 'Lombardiya doğuda 02 ve 03x telefon kodlarına geçer; 011–017x Piemonte’ye özgüdür'],
      ['valle-d-aosta', 'Valle d’Aosta', 'Valle d’Aosta / Vallée d’Aoste', 'Aosta', 'kuzeybati', '0165 / 0166 · CAP 11xxx', 'it-sudtirol-biling', '0165 kodu, AO kısaltması & Fransızca-İtalyanca', 'İtalyanca ve Fransızca çift dilli yol tabelalarını (Rue / Via), 0165/0166 telefon kodunu, 11xxx CAP kodunu ve kalın taş levha çatılı (lose) derin Alp vadisini arayın', 'Trentino-Alto Adige Almanca çift dillidir; Valle d’Aosta Fransızca çift dilli tek İtalyan bölgesidir'],
      ['liguria', 'Liguria', 'Liguria', 'Cenova', 'kuzeybati', '010 / 018x · CAP 16xxx–19xxx', 'it-sp-km-sign', '010/018x kodu, GE/SV/IM/SP & pastel sahil', 'Cenova (010, CAP 16xxx), Imperia (0183), La Spezia (0187), Savona (019) kodlarını; denize çok dik inen otoyol viyadüklerini ve yeşil panjurlu pastel pembe/sarı apartmanları arayın', 'Toskana güneyde düz kıyı çamlıklarına açılır; Liguria dağların doğrudan denize indiği dar viyadük kuşağıdır'],
      ['lombardia', 'Lombardiya', 'Lombardia', 'Milano', 'kuzeybati', '02 / 03x · CAP 20xxx–27xxx', 'it-enel-pole', '02 Milano, 03x Lombardiya & 20xxx–27xxx CAP', 'Milano (02) veya Bergamo (035), Brescia (030), Como (031), Varese (0332), Pavia (0382), Mantova (0376) gibi tümü 03x ile başlayan kodları ve 20xxx–27xxx CAP numaralarını arayın', '02 ve 03x sabit telefon kodları İtalya’da yalnızca Lombardiya bölgesinde kullanılır'],
      ['trentino-alto-adige', 'Trentino-Alto Adige', 'Trentino-Alto Adige / Südtirol', 'Trento / Bolzano', 'kuzeydogu', '046x / 047x · CAP 38xxx–39xxx', 'it-sudtirol-biling', '047x Almanca-İtalyanca (BZ) & 046x Trento (TN)', 'Kuzeyde (Bolzano / Südtirol, 0471–0474, CAP 39xxx) zorunlu Almanca-İtalyanca çift dilli tabelaları ve Avusturya tipi ahşap şaleleri; güneyde (Trento, 0461–0465, CAP 38xxx) Dolomit vadilerini ve elma/üzüm teraslarını arayın', 'Veneto güneyde tek dilli İtalyanca ve 041–045/049 kodlarını kullanır'],
      ['veneto', 'Veneto', 'Veneto', 'Venedik', 'kuzeydogu', '041–045 / 049 · CAP 30xxx–37xxx', 'it-sp-km-sign', '041/045/049 kodu & VE/VR/PD/TV/VI taşları', 'Venedik (041), Padova (049), Verona (045), Vicenza (0444), Treviso (0422), Belluno (0437) kodlarını, 30xxx–37xxx CAP numarasını ve düz ovada yükselen ince tuğla çan kulelerini (campanili) arayın', 'Emilia-Romagna Po Nehri’nin güneyinde 051–054 ve 40xxx–48xxx CAP kodlarına geçer'],
      ['friuli-venezia-giulia', 'Friuli-Venezia Giulia', 'Friuli-Venezia Giulia', 'Trieste', 'kuzeydogu', '040 / 0432 / 0434 / 0481 · CAP 33xxx–34xxx', 'it-sudtirol-biling', '040 Trieste, 0432 Udine & Slovence/Friulce', 'Trieste (040, CAP 34xxx), Udine (0432, CAP 33xxx), Pordenone (0434), Gorizia (0481) kodlarını; doğu sınırında İtalyanca-Slovence, iç kesimde İtalyanca-Friulce çift dilli tabelaları ve beyaz çakıllı Tagliamento yataklarını arayın', 'Veneto batıda tek dilli İtalyancadır; 040 ve 0432/0481 kodları Friuli-Venezia Giulia’yı verir'],
      ['emilia-romagna', 'Emilia-Romagna', 'Emilia-Romagna', 'Bologna', 'kuzeydogu', '051–054 / 052x / 059 · CAP 40xxx–48xxx', 'it-enel-pole', '051–054/059 kodu & 40xxx–48xxx CAP', 'Bologna (051), Parma (0521), Reggio (0522), Piacenza (0523), Ferrara (0532), Rimini/Ravenna (0541/0544), Modena (059) kodlarını, 40xxx–48xxx CAP numarasını ve cetvelle çizilmiş dümdüz Via Emilia tarım ovasını arayın', 'Lombardiya Po’nun kuzeyinde 02/03x, Toskana Apeninlerin güneyinde 055–058 ve 5xxxx CAP kullanır'],
      ['toscana', 'Toskana', 'Toscana', 'Floransa', 'merkez', '055–058x · CAP 50xxx–59xxx', 'it-sp-km-sign', '055–058x kodu, 5xxxx CAP & servi tepeleri', 'Floransa (055), Pisa (050), Siena (0577), Arezzo (0575), Lucca (0583), Grosseto (0564) kodlarını, 50xxx–59xxx CAP numarasını, FI/SI/PI/AR/GR il taşlarını ve tepe üstü taş çiftliklere giden servi ağacı dizilerini arayın', 'Umbria doğuda 074x/075 ve 06xxx CAP kullanır; 5xxxx CAP kuşağı yalnızca Toskana’ya aittir'],
      ['umbria', 'Umbria', 'Umbria', 'Perugia', 'merkez', '075 / 074x · CAP 05xxx–06xxx', 'it-sp-km-sign', '075 Perugia, 0744 Terni & PG/TR taşları', 'Perugia (075, CAP 06xxx) ve Terni/Orvieto (0744/0763, CAP 05xxx) kodlarını, SP taşlarında PG veya TR kısaltmasını ve denize kıyısı olmayan yeşil Apenin tepe kasabalarını arayın', 'Marche doğuda 071–073 ve 60xxx–63xxx CAP kullanır'],
      ['marche', 'Marche', 'Marche', 'Ancona', 'merkez', '071 / 072x / 073x · CAP 60xxx–63xxx', 'it-sp-km-sign', '071–073x kodu, 60xxx–63xxx CAP & AN/PU/MC', 'Ancona (071, CAP 60xxx), Pesaro-Urbino (0721/0722, PU), Macerata/Ascoli (0733/0736, MC/AP/FM) kodlarını ve Adriyatik’e inen yumuşak ayçiçeği/buğday tepelerini arayın', 'Abruzzo güneyde 085/086x ve 64xxx–67xxx CAP kuşağına geçer'],
      ['lazio', 'Lazio', 'Lazio', 'Roma', 'merkez', '06 / 076x / 077x · CAP 00xxx–04xxx', 'it-sp-km-sign', '06 Roma, 00xxx CAP & fıstık çamları', 'Roma (06, CAP 00xxx), Viterbo/Rieti (0761/0746), Latina/Frosinone (0773/0775) kodlarını; RM/VT/LT/FR il taşlarını, şemsiye tepeli fıstık çamlarını (pino marittimo) ve kırmızımsı tüf taş duvarları arayın', '00xxx ile başlayan CAP posta kodu ve 06 alan kodu yalnızca Roma ve Lazio’da bulunur'],
      ['abruzzo', 'Abruzzo', 'Abruzzo', 'L’Aquila', 'guney', '085 / 086x / 087x · CAP 64xxx–67xxx', 'it-enel-pole', '085/086x kodu & AQ/PE/CH/TE taşları', 'Pescara (085), L’Aquila (0862), Teramo (0861), Chieti (0871) kodlarını; 64xxx–67xxx CAP numarasını ve Adriyatik kıyısı ile sarp Gran Sasso dağları arasındaki vadileri arayın', 'Marche kuzeyde 071–073 kullanır; Abruzzo 08x Güney İtalya telefon kuşağının başladığı yerdir'],
      ['molise', 'Molise', 'Molise', 'Campobasso', 'guney', '0874 / 0875 / 0865 · CAP 86xxx', 'it-enel-pole', '0874/0865 kodu, CAP 86xxx & CB/IS taşları', 'Campobasso (0874), Termoli (0875) ve Isernia (0865) kodlarını, 86xxx CAP numarasını ve SP taşlarında CB veya IS kısaltmasını arayın', 'Puglia güneydoğuda FG (Foggia, 088x, CAP 71xxx) koduna geçer'],
      ['campania', 'Campania', 'Campania', 'Napoli', 'guney', '081 / 089 / 082x · CAP 80xxx–84xxx', 'it-puglia-trulli', '081 Napoli, 089 Salerno & NA/SA/CE/AV/BN', 'Napoli/Caserta (081/0823, CAP 80xxx–81xxx), Salerno (089, CAP 84xxx), Avellino/Benevento (0825/0824) kodlarını, Vezüv/Amalfi volkanik kıyı dokusunu ve yoğun limon/fındık bahçelerini arayın', 'Lazio kuzeyde 06/077x, Puglia doğuda 080/088x ve 70xxx–76xxx CAP kullanır'],
      ['apulia', 'Puglia', 'Puglia', 'Bari', 'guney', '080 / 083x / 088x · CAP 70xxx–76xxx', 'it-puglia-trulli', '080/083x/088x, 7xxxx CAP & kuru taş duvar/trulli', 'Bari (080, BA), Lecce/Brindisi/Taranto (0832/0831/099, LE/BR/TA) ve Foggia (0881, FG) kodlarını; 70xxx–76xxx CAP numarasını, dümdüz kızıl toprakta kuru taş duvarlı asırlık zeytinlikleri ve konik taş trulli/pajara yapılarını arayın', 'Calabria güneybatıda dağlıktır ve 096x/098x kullanır; Puglia İtalya’nın en düz, beyaz taşlı ve zeytinlik yarımadasıdır'],
      ['basilicata', 'Basilicata', 'Basilicata', 'Potenza', 'guney', '0971–0976 / 0835 · CAP 75xxx & 85xxx', 'it-puglia-trulli', '097x Potenza, 0835 Matera & PZ/MT taşları', 'Potenza (0971–0976, CAP 85xxx, PZ) ve Matera (0835, CAP 75xxx, MT) kodlarını; aşınmış beyaz kil tepeleri (calanchi) ve kurak iç dağ sırtlarını arayın', 'Puglia doğuda düz zeytin ovasıdır; Basilicata engebeli iç dağlar ve PZ/MT il taşlarıyla ayrılır'],
      ['calabria', 'Calabria', 'Calabria', 'Catanzaro', 'guney', '0961–0968 / 0981–0985 · CAP 87xxx–89xxx', 'it-puglia-trulli', '096x/098x kodu, 87xxx–89xxx CAP & CS/CZ/RC', 'Catanzaro (0961, CZ), Reggio Calabria (0965, RC), Cosenza (0984, CS), Crotone/Vibo (0962/0963) kodlarını; 87xxx–89xxx CAP numarasını, A2 otoyol viyadüklerini ve bergamot/zeytin yamaçlarını arayın', 'Sicilya karşı kıyıda 090–095 ve 90xxx–98xxx CAP kullanır; 096x ve 098x yalnızca Calabria’ya aittir'],
      ['sicily', 'Sicilya', 'Sicilia', 'Palermo', 'adalar', '090–095 · CAP 90xxx–98xxx', 'it-puglia-trulli', '090–095 telefon, 90xxx–98xxx CAP & PA/CT/ME', 'Palermo (091, CAP 90xxx), Catania (095, CAP 95xxx), Messina (090, CAP 98xxx), Siracusa/Ragusa (0931/0932), Agrigento/Trapani (0922/0923) kodlarını; siyah Etna lav taşını, sarı barok kasabaları ve frenkinciri kaktüslerini arayın', 'Sardinya 070/078x/079 ve 07xxx–09xxx CAP kullanır; 090–095 telefon ve 90xxx–98xxx CAP yalnızca Sicilya’dadır'],
      ['sardegna', 'Sardinya', 'Sardegna / Sardigna', 'Cagliari', 'adalar', '070 / 078x / 079 · CAP 07xxx–09xxx', 'it-puglia-trulli', '070/078x/079 kodu, CAP 07xxx–09xxx & granit/mantar meşesi', 'Cagliari (070, CAP 09xxx), Sassari/Olbia (079/0789, CAP 07xxx), Nuoro/Oristano (0784/0783, CAP 08xxx–09xxx) kodlarını; pembe granit kayalıkları, mantar meşelerini ve -u/-i bitimli Sarduca yer adlarını (Gennargentu, Quartu, Tortolì) arayın', 'Sicilya 090–095 kullanır; Sardinya Merkez İtalya ile aynı 07x (070/078x/079) telefon kuşağındadır']
    ],
    topics: [
      {
        id: 'alan', label: '01–09 Telefon ve CAP', icon: 'phone',
        desc: '01–09 sabit telefon alan kodları, 00–98 CAP posta kodu ve 2 harfli il kodları',
        title: 'İtalya 01–09 Telefon Kodları, CAP Posta Sistemi ve İl Kısaltmaları',
        lead: 'İtalya’da her sabit telefon numarası 01–09 ile başlar; yol kenarındaki SP kilometre taşlarında ve resmi adreslerde ise 2 harfli il kodu (TO, MI, VE, BO, FI, RM, NA, BA, PA, CA) yer alır.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: '01..09', title: 'Kuzeyden Güneye 01–09 Sabit Telefon Merdiveni', body: 'Nereye bakılır: Tabelalardaki 0 ile başlayan alan koduna bakın: 01x = Piemonte, Liguria ve Valle d’Aosta; 02 = Milano; 03x = Lombardiya; 04x = Veneto, Trentino-Alto Adige ve Friuli-Venezia Giulia; 051–054/059 = Emilia-Romagna; 055–058 = Toskana; 06 = Roma; 070/078/079 = Sardinya; 071–073 = Marche; 074–075 = Umbria; 076–077 = Lazio; 08x = Abruzzo, Molise, Campania ve Puglia; 090–095 = Sicilya; 096–098 = Calabria ve Basilicata.' },
          { badge: '2 Harf + CAP', title: 'SP Kilometre Taşlarındaki 2 Harfli İl Kodu ve 5 Haneli CAP', body: 'Nereye bakılır: Yol kenarındaki beyaz-mavi kilometre taşlarının üst şeridine ve adreslerdeki parantez içi 2 harfe bakın: ör. 50122 Firenze (FI), 70121 Bari (BA), 90133 Palermo (PA). Bu 2 harf doğrudan ili ve bölgeyi verir.' }
        ]
      },
      {
        id: 'saha', label: 'Direk, Taş ve Mimari', icon: 'bulb',
        desc: 'Enel direk etiketleri, SP taşları, Güney Tirol çift dilli levhalar ve trulli',
        title: 'İtalya Saha İpuçları: Enel Direkleri, Kilometre Taşları ve Mimari',
        lead: 'İtalya’da yuvarlak beton direklerdeki dikey Enel etiketi ülkeyi doğrularken, çift dilli tabelalar ve taş/kiremit dokusu kuzeyden güneye bölgeyi daraltır.',
        drill: 'visual',
        visuals: [
          { id: 'it-enel-pole', title: 'Dikey Enel Etiketli Gri Beton Direk', sub: 'Po Ovası ve Merkez · Lombardiya, Piemonte, Emilia-Romagna, Abruzzo', badge: 'Enel Direği', body: 'Nereye bakılır: Yuvarlak gri beton direklerde göz hizasına yapıştırılmış dikey siyah-beyaz/sarı Enel numara şeridine bakın.', regions: ['lombardia', 'piemonte', 'emilia-romagna', 'abruzzo', 'molise'] },
          { id: 'it-sp-km-sign', title: '2 Harfli İl Kodlu SP/SS Kilometre Taşı', sub: 'Veneto, Toskana, Lazio, Liguria, Umbria, Marche', badge: 'SP İl Kısaltması', body: 'Nereye bakılır: Kırmızı tepeli beyaz yol babalarının yanındaki mavi-beyaz SP/SS taşlarına bakın; üstte ilin 2 harfli kodu (FI, RM, VE, GE, PG, AN) yazar.', regions: ['veneto', 'toscana', 'lazio', 'liguria', 'umbria', 'marche'] },
          { id: 'it-sudtirol-biling', title: 'Kuzey Sınır Çift Dilli Tabelalar ve Alp Şalesi', sub: 'Trentino-Alto Adige (Almanca), Valle d’Aosta (Fransızca), Friuli (Slovence)', badge: 'Alpler & Çift Dil', body: 'Nereye bakılır: Çift dilli yer tabelalarına (Bozen/Bolzano, Aoste/Aosta, Trst/Trieste) ve dik çatılı ahşap/taş Alp mimarisine bakın.', regions: ['trentino-alto-adige', 'valle-d-aosta', 'friuli-venezia-giulia'] },
          { id: 'it-puglia-trulli', title: 'Güney İtalya Kuru Taş Duvar, Zeytinlik ve Beyaz Mimari', sub: 'Puglia, Sicilya, Sardinya, Campania, Calabria, Basilicata', badge: 'Mezzogiorno & Adalar', body: 'Nereye bakılır: Yol boyu harçsız kuru taş duvarlara, kireç beyazı düz damlı/konik çatılı (trulli) evlere, frenkinciri kaktüslerine ve yaşlı zeytin ağaçlarına bakın.', regions: ['apulia', 'sicily', 'sardegna', 'campania', 'calabria', 'basilicata'] }
        ],
        cards: [
          { badge: 'Biyom', title: 'Po Ovası vs Toskana Tepeleri vs Mezzogiorno', body: 'Nereye bakılır: Po Ovası (Piemonte, Lombardiya, Emilia-Romagna, Veneto) dümdüz sulama kanalları ve mısır/çeltik tarlalarıdır. Merkez (Toskana, Umbria, Marche) dalgalı kil tepeleri ve servi ağaçlarıdır. Güney ve Adalar ise kurak makilik, zeytin, kaktüs ve düz damlı beyaz/sarı taş kasabalardır.' }
        ]
      }
    ]
  });

  /* =======================================================================
   * 5. BİRLEŞİK KRALLIK (16 ITL Bölgesi)
   * ======================================================================= */
  buildPack({
    id: 'birlesik-krallik', name: 'Birleşik Krallık', short: 'B. Krallık', code: 'GB', area: 'Avrupa ve Avrasya', tone: 'indigo',
    unitLabel: 'bölge', groupLabel: 'ülke / ana kuşak', codeLabel: '01x/02x alan ve A-yolu kodu',
    line: '16 bölge: 01x/02x alan kodları, A1–A9 saat yönü yol konisi ve Galce/İskoçya ipuçları',
    blurb: 'Londra merkezli A1–A9 saat yönü karayolu konisi, 020/028/029/01xx sabit alan kodları, Galce/Galik tabelalar ve taş/tuğla mimariyle 16 Birleşik Krallık bölgesi.',
    overviewLead: 'Birleşik Krallık’ta yeşil yön tabelalarındaki A-yolu veya M-otoyolu numarasının İLK RAKAMI (1’den 9’a) Londra ve Edinburgh merkezli saat yönü konilerini verir; dükkanlardaki 01xx/02x sabit telefon kodları ise doğrudan şehri açıklar.',
    quickTips: [
      'A-yolları ilk rakamı (Londra’dan saat yönünde): A1 Kuzeydoğu/Doğu, A2 Güneydoğu (Kent), A3 Güney (Hampshire/Surrey) ve Güneybatı (A30/A38), A4 Batı/Midlands ve Galler (A40/A470), A5 Kuzeybatı/Kuzey Galler, A6 Doğu Midlands/Kuzeybatı, A7–A9 İskoçya!',
      '02x büyük alan kodları: 020 Londra, 023 Southampton/Portsmouth, 024 Coventry, 028 tüm Kuzey İrlanda, 029 Cardiff. Büyük şehirler: 0113–0118 (Leeds, Sheffield, Nottingham, Leicester, Bristol, Reading) ve 0121–0191 (Birmingham, Edinburgh, Glasgow, Liverpool, Manchester, Tyneside).',
      'Galler’de tüm yol tabelaları ve yer boyamaları Galce-İngilizce çift dillidir (ARAF / SLOW); İskoçya’da pütürlü çakıl sıvalı (harled) taş evler ve A7/A8/A9 yolları hakimdir.'
    ],
    plan1: 'A1–A9 saat yönü karayolu konisini ve 020/028/029/01xx sabit telefon kodlarını öğren.',
    plan2: 'Galler çift dilli levhalarını, İskoçya harled taş evlerini ve İngiltere tuğla/taş sınırını incele.',
    geoName: 'GB_GEO',
    themeCfg: {
      aria: 'Birleşik Krallık 16 bölge haritası', fit: 'Tüm Birleşik Krallık’ı göster',
      grid: { lat: [50, 60, 2], lon: [-8, 2, 2], txt: [50, 58, 2], refLon: -2, refLat: 54 },
      excludeWorld: ['United Kingdom', 'Ireland', 'France'],
      bg: [[-8.2, 53.2, 'İRLANDA', 'c'], [1.5, 55.0, 'Kuzey Denizi', 's'], [-4.5, 53.8, 'İrlanda Denizi', 's'], [-1.5, 50.0, 'Manş Denizi', 's']]
    },
    groups: [
      { id: 'guney-ingiltere', name: 'Londra, Güney ve Doğu İngiltere', short: 'Güney & Doğu', color: '#1c5fa6', codeRange: '020 · 012x–018x · A1, A2, A3, A4', desc: 'Greater London (020), South East, South West ve East of England. A1, A2, A3 ve A30/A38 birincil yolları.', keyCues: ['020 Londra, 023 Güney kıyısı, 0117 Bristol, 0118 Reading', 'A1/A11/A12 (Doğu), A2/M20 (Güneydoğu), A30/A38 (Güneybatı)', 'Kırmızı tuğla, çakmaktaşı (flint) ve Güneybatı sık çitli dar yollar'] },
      { id: 'midlands', name: 'Doğu ve Batı Midlands', short: 'Midlands', color: '#a86a00', codeRange: '0121 · 024 · 0115/0116 · A4, A5, A6, M1/M6', desc: 'İngiltere’nin merkezi: Birmingham (0121), Coventry (024), Nottingham (0115), Leicester (0116). A4, A5 ve A6 yollarının kesişim kuşağı.', keyCues: ['0121 Birmingham, 024 Coventry, 0115 Nottingham, 0116 Leicester', 'A4x, A5x ve A6x yol numaraları', 'Viktorya dönemi kırmızı tuğla sıra evler ve Cotswold taşı (güney)'] },
      { id: 'kuzey-ingiltere', name: 'Kuzey İngiltere (North West, Yorkshire, North East)', short: 'Kuzey İngiltere', color: '#0e7a80', codeRange: '0161 · 0151 · 0113/0114 · 0191 · A1, A6', desc: 'Manchester (0161), Liverpool (0151), Leeds (0113), Sheffield (0114), Newcastle (0191). Pennine dağları ve kuru taş duvarlar.', keyCues: ['0161 Manchester, 0151 Liverpool, 0113 Leeds, 0114 Sheffield, 0191 Newcastle', 'A59, A6x ve A1(M) kuzey koridorları', 'Koyu kumtaşı (gritstone) sıra evler ve Pennine kuru taş duvarları'] },
      { id: 'galler', name: 'Galler (Wales / Cymru)', short: 'Galler', color: '#c0262c', codeRange: '029 · 01633 · 01792 · 012x–015x · A4x / A5x', desc: 'Doğu ve Batı Galler. Tüm yol tabelaları Galce ve İngilizce çift dillidir (Araf / Slow, Heddlu).', keyCues: ['Zorunlu Galce-İngilizce çift dilli tabelalar (Llan-, Aber-, Caer-)', '029 Cardiff, 01792 Swansea, 01248 Bangor, 01970 Aberystwyth', 'A40, A470, A483, A487 (Güney/Orta) ve A5/A55 (Kuzey Galler)'] },
      { id: 'iskocya', name: 'İskoçya (Scotland / Alba)', short: 'İskoçya', color: '#5b3fa0', codeRange: '0131 · 0141 · 01224 · 01463 · A7, A8, A9', desc: 'Edinburgh (0131), Glasgow (0141), Aberdeen (01224) ve Highlands (01463). Tüm A7, A8 ve A9 yolları İskoçya’dadır.', keyCues: ['A7, A8 ve A9 ile başlayan tüm yol numaraları', '0131 Edinburgh, 0141 Glasgow, 01224 Aberdeen, 01463 Inverness', 'Pütürlü çakıl sıvalı (harled) taş evler ve Passing Place dar yolları'] },
      { id: 'kuzey-irlanda', name: 'Kuzey İrlanda (Northern Ireland)', short: 'Kuzey İrlanda', color: '#0b6b3a', codeRange: '028 · BT Posta Kodu · A1–A509 (NI)', desc: 'Belfast ve 6 kontluk. Tüm sabit telefon numaraları 028 ile, tüm posta kodları BT ile başlar.', keyCues: ['Tüm bölgede tek tip 028 sabit alan kodu', 'BT1–BT94 posta kodu', 'Beyaz sıvalı kırsal evler ve İrlanda Cumhuriyeti sınırında hız birimi (mph vs km/h) geçişi'] }
    ],
    rawUnits: [
      ['eng-greater-london', 'Büyük Londra', 'Greater London', 'Londra', 'guney-ingiltere', '020 · A1–A4 / M25', 'gb-a-road-sign', '020 alan kodu, kırmızı otobüs & semt plakaları', 'Tüm dükkanlarda 020 (020 7 / 020 8 / 020 3) alan kodunu, alt satırında Borough adı yazan sokak tabelalarını, kırmızı TfL otobüs duraklarını ve sarı tuğla (London stock brick) sıra evleri arayın', '020 alan kodu Birleşik Krallık’ta yalnızca Büyük Londra’da kullanılır'],
      ['eng-south-east', 'Güneydoğu İngiltere', 'South East England', 'Guildford / Oxford', 'guney-ingiltere', '023 / 0118 / 01273 / 01865 · A2, A3, A2x, A3x', 'gb-a-road-sign', 'A2/A3/A2x/A3x yolları & çakmaktaşı/kireçtaşı', 'Southampton/Portsmouth (023), Reading (0118), Brighton (01273), Oxford (01865), Canterbury (01227) kodlarını; yeşil tabelalarda A2x veya A30–A35 yol numaralarını ve beyaz tebeşir tepelerini (Downs) arayın', 'East of England Thames kuzeyinde A10–A14 yollarını kullanır; South East A2x ve A3x kuşağıdır'],
      ['eng-south-west', 'Güneybatı İngiltere', 'South West England', 'Bristol / Exeter', 'guney-ingiltere', '0117 / 01392 / 01752 · A30, A38, A3xx', 'gb-cotswold-stone', 'A30/A38/A3xx yolları, yüksek çitler & taş evler', 'Bristol (0117), Bournemouth (01202), Exeter (01392), Plymouth (01752), Truro (01872) kodlarını; A30, A38 veya A3xx yol levhalarını, kuzeyde bal rengi Cotswold taşını, Cornwall/Devon’da yüksek toprak-çit duvarlı (hedgerow) dar yolları arayın', 'A30, A38 ve A350–A399 yol numaraları doğrudan Güneybatı İngiltere’yi verir'],
      ['eng-east', 'Doğu İngiltere', 'East of England', 'Cambridge / Norwich', 'guney-ingiltere', '01223 / 01603 / 01473 · A10–A14, A1xx', 'gb-a-road-sign', 'A10–A14 / A1xx yolları & düz Fenland ovası', 'Cambridge (01223), Norwich (01603), Ipswich (01473), Chelmsford (01245) kodlarını; A10–A14 veya A120–A149 yol numaralarını, çok düz tarım arazilerini ve çakmaktaşı/pembe-krem sıvalı köy evlerini arayın', 'East Midlands kuzeybatıda A15–A17 ve A5x/A6x yollarına geçer'],
      ['eng-east-midlands', 'Doğu Midlands', 'East Midlands', 'Nottingham / Leicester', 'midlands', '0115 / 0116 / 01332 / 01522 · A6, A15–A17, A46, A52', 'gb-cotswold-stone', '0115 Nottingham, 0116 Leicester & A46/A52/A6', 'Nottingham (0115), Leicester (0116), Derby (01332), Lincoln (01522), Northampton (01604) kodlarını; M1 otoyolunu, A46/A52/A6/A15–A17 yollarını ve kırmızı tuğla kasabalarla Peak District güney kireçtaşı duvarlarını arayın', 'West Midlands batıda 0121/024 ve M5/M6/A4x/A5x yollarını kullanır'],
      ['eng-west-midlands', 'Batı Midlands', 'West Midlands', 'Birmingham', 'midlands', '0121 / 024 / 01782 / 01902 · M6, A4x, A5', 'gb-cotswold-stone', '0121 Birmingham, 024 Coventry & A41/A44/A5', 'Birmingham (0121), Coventry (024), Stoke-on-Trent (01782), Wolverhampton (01902), Worcester (01905) kodlarını; M5/M6/M42 kavşağını ve kırmızı tuğla sanayi/kanal dokusunu arayın', 'Doğu Galler batıda çift dilli Galce tabelalara geçer; West Midlands tek dilli İngilizcedir'],
      ['eng-yorkshire-and-the-humber', 'Yorkshire ve Humber', 'Yorkshire and the Humber', 'Leeds / York', 'kuzey-ingiltere', '0113 / 0114 / 01482 / 01904 · A1, A61–A65', 'gb-cotswold-stone', '0113 Leeds, 0114 Sheffield & kuru taş duvarlar', 'Leeds (0113), Sheffield (0114), Hull (01482), York (01904), Bradford (01274) kodlarını; A61–A65 ve A16x–A17x yollarını, isli bal-gri kumtaşı evleri ve Yorkshire Dales kuru taş duvarlı meralarını arayın', 'North West Pennine sırtının batısında 0161/0151 ve M6 koridorundadır'],
      ['eng-north-west', 'Kuzeybatı İngiltere', 'North West England', 'Manchester / Liverpool', 'kuzey-ingiltere', '0161 / 0151 / 01772 / 01228 · M6, A6, A59, A5xx', 'gb-cotswold-stone', '0161 Manchester, 0151 Liverpool & Lake District', 'Manchester (0161), Liverpool (0151), Preston (01772), Carlisle (01228) kodlarını; M6/M60/M62 otoyollarını, A580/A59/A6 yollarını, kırmızı tuğla sıra evleri ve kuzeyde (Cumbria) arduvaz taşlı Lake District dağlarını arayın', 'İskoçya sınırında (Gretna) yol numaraları A7/A74(M) olarak değişir'],
      ['eng-north-east', 'Kuzeydoğu İngiltere', 'North East England', 'Newcastle upon Tyne', 'kuzey-ingiltere', '0191 / 01642 / 01325 · A1, A19, A68, A69', 'gb-a-road-sign', '0191 Tyneside, 01642 Teesside & A1/A19/A68', 'Newcastle/Sunderland/Durham (0191), Middlesbrough (01642), Darlington (01325) kodlarını; A1, A19, A68 ve A69 karayollarını ve Northumberland taş kıyı/kır dokusunu arayın', 'İskoçya sınırının kuzeyinde A1 devam eder ancak A68/A1 yan kolları A6xx/A7xx/B6xxx İskoç tabelalarına döner'],
      ['wls-east-wales', 'Doğu Galler', 'East Wales / Dwyrain Cymru', 'Cardiff', 'galler', '029 / 01633 / 01978 / 01686 · M4, A470, A483', 'gb-wales-biling', '029 Cardiff, çift dilli Galce & A470/A483', 'Galce-İngilizce çift dilli tabelaları (Caerdydd / Cardiff, Casnewydd / Newport), 029 (Cardiff), 01633 (Newport), 01978 (Wrexham), 01686 (Powys) kodlarını ve A470/A483 omurga yollarını arayın', 'Batı Galler (01792 Swansea, 01248 Bangor) A40/A487/A55 kıyı ve batı koridorlarını tutar'],
      ['wls-west-wales-and-the-valleys', 'Batı Galler ve Vadiler', 'West Wales and the Valleys', 'Swansea / Caernarfon', 'galler', '01792 / 01443 / 01267 / 01248 · A40, A487, A55', 'gb-wales-biling', 'Üstte Galce yazan tabelalar, Llan-/Aber- & arduvaz', 'Tabelalarda Galce metnin İngilizcenin ÜSTÜNDE yer aldığı batı ve kuzey kuşağını; Swansea (01792), Carmarthen (01267), Aberystwyth (01970), Bangor (01248) kodlarını, Snowdonia arduvaz dağlarını ve eski kömür vadisi sıra evlerini arayın', 'İngiltere tarafında Galce tabela yoktur; Doğu Galler’de ise 029/01633/01686 kodları görülür'],
      ['sct-eastern', 'Doğu İskoçya', 'Eastern Scotland', 'Edinburgh', 'iskocya', '0131 / 01382 / 01738 / 01786 · A1, A7, A9, A90, M90', 'gb-scotland-harl', '0131 Edinburgh, 01382 Dundee & A90/A7/A1', 'Edinburgh (0131), Dundee (01382), Perth (01738), Stirling (01786), Fife (01592) kodlarını; A90/M90/A7/A68 yollarını ve gri-krem kumtaşı apartmanlarla doğu kıyı tarım arazilerini arayın', 'Batı İskoçya (Glasgow) 0141 alan kodunu ve M8/M74/A77/A82 yollarını kullanır'],
      ['sct-south-western', 'Güneybatı İskoçya', 'South Western Scotland', 'Glasgow', 'iskocya', '0141 / 01292 / 01387 / 01698 · M74, M8, A75, A77', 'gb-scotland-harl', '0141 Glasgow, A74(M)/A75/A77 & harled taş evler', 'Glasgow (0141), Lanarkshire (01698), Ayr (01292), Dumfries (01387) kodlarını; A74(M), A75, A76, A77, A78 gibi tümü A7x ile başlayan yolları ve beyaz/gri pütürlü sıvalı (harled) taş evleri arayın', 'A7x yol kuşağı neredeyse tamamen Güney ve Güneybatı İskoçya’dadır'],
      ['sct-north-eastern', 'Kuzeydoğu İskoçya', 'North Eastern Scotland', 'Aberdeen', 'iskocya', '01224 / 01779 · A90, A96, A93', 'gb-scotland-harl', '01224 Aberdeen, gümüş granit & A90/A96', 'Aberdeen ve Aberdeenshire için 01224 / 01358 / 01467 / 01779 alan kodlarını, A90, A93, A96, A98 yollarını ve güneşte parlayan gri granit taşından yapılmış şehir/köy binalarını arayın', 'Highlands batıda dağlıktır ve 01463 (Inverness) ile A9/A82/A835 tek şeritli yollarına geçer'],
      ['sct-highlands-and-islands', 'Highlands ve Adalar', 'Highlands and Islands', 'Inverness', 'iskocya', '01463 / 01397 / 01851 / 01595 · A9, A82–A89', 'gb-scotland-harl', 'Passing Place tabelası, İskoç Galcesi & A8x/A9', 'Beyaz eşkenar dörtgen "Passing Place" tabelalı tek şeritli yolları, sarı-yeşil İskoç Galcesi çift dilli tabelaları (Inbhir Nis / Inverness, Fàilte), 01463/01397/01851 kodlarını ve A82–A89 / A9 yollarını arayın', 'Galler çift dilli tabelalarında Kırmızı Ejderha veya Araf/Llan- vardır; Highlands’de Galik (bh, mh, dh, Beinn, Loch, Glen) görülür'],
      ['nir', 'Kuzey İrlanda', 'Northern Ireland', 'Belfast', 'kuzey-irlanda', '028 · BT1–BT94 · M1/M2 & A1–A6 (NI)', 'gb-cotswold-stone', '028 telefon, BT posta kodu & beyaz kırsal evler', 'Tüm dükkanlarda 028 sabit alan kodunu (028 90xx Belfast, 028 71xx Derry), BT ile başlayan posta kodlarını ve Birleşik Krallık tipi mph/üçgen levhalarla İrlanda adası kırsal dokusunun birleşimini arayın', 'İrlanda Cumhuriyeti’nde hız levhaları km/h ve uyarı levhaları sarı elmas biçimindedir; Kuzey İrlanda beyaz/kırmızı üçgen UK levhalarını ve 028 kodunu kullanır']
    ],
    topics: [
      {
        id: 'alan', label: 'A1–A9 ve Alan Kodu', icon: 'phone',
        desc: 'A1–A9 saat yönü karayolu konisi ve 01x/02x telefon alan kodları',
        title: 'Birleşik Krallık A1–A9 Yol Konisi ve 01x/02x Telefon Kodları',
        lead: 'Birleşik Krallık’ta yeşil ve beyaz yön tabelalarında her zaman A- veya B- yolu numarası yazar; numaranın İLK RAKAMI doğrudan hangi bölgede olduğunuzu söyler.',
        drill: 'codes', showCodeGroupTable: true,
        cards: [
          { badge: 'A1..A9', title: 'Karayolu Numarası İlk Rakamı = Saat Yönü Bölge Konisi', body: 'Nereye bakılır: Yeşil veya beyaz tabeladaki A-xxx / B-xxx numarasının İLK RAKAMINA bakın: 1 (A1, A10–A19, A1xx) = Doğu İngiltere, Yorkshire ve Kuzeydoğu; 2 (A2, A20–A29, A2xx) = Güneydoğu İngiltere (Kent, Sussex, Surrey); 3 (A3, A30–A39, A3xx) = Güney ve Güneybatı İngiltere (Hampshire, Dorset, Devon, Cornwall, Bristol); 4 (A4, A40–A49, A4xx) = Batı, Güney/Orta Midlands ve Güney/Orta Galler; 5 (A5, A50–A59, A5xx) = Kuzey Galler, Kuzey Midlands ve Kuzeybatı İngiltere; 6 (A6, A60–A69, A6xx) = Doğu Midlands, Manchester, Yorkshire ve Kuzey; 7 (A7, A7x, A7xx) = Güneybatı İskoçya ve Borders; 8 (A8, A8x, A8xx) = Batı İskoçya ve Highlands; 9 (A9, A9x, A9xx) = Doğu ve Kuzey İskoçya!' },
          { badge: '02x & 01xx', title: 'Sabit Telefon Alan Kodları', body: 'Nereye bakılır: Dükkan alınlıklarındaki ve ticari minibüslerdeki 02x / 01xx kodlarına bakın: 020 Londra, 023 Southampton/Portsmouth, 024 Coventry, 028 Kuzey İrlanda, 029 Cardiff; 0113 Leeds, 0114 Sheffield, 0115 Nottingham, 0116 Leicester, 0117 Bristol, 0118 Reading; 0121 Birmingham, 0131 Edinburgh, 0141 Glasgow, 0151 Liverpool, 0161 Manchester, 0191 Newcastle/Durham.' }
        ]
      },
      {
        id: 'saha', label: 'Dil, Taş ve Yol', icon: 'bulb',
        desc: 'Galce/Galik tabelalar, Passing Place, harled taş ve tuğla mimarisi',
        title: 'Birleşik Krallık Saha İpuçları: Ülke ve Bölge Ayrımı',
        lead: 'İngiltere, Galler, İskoçya ve Kuzey İrlanda sokak seviyesinde tabela dili, ev sıvası ve taş rengiyle hemen ayrılır.',
        drill: 'visual',
        visuals: [
          { id: 'gb-a-road-sign', title: 'Sarı A-Yolu Kodlu Yeşil UK Yön Tabelası', sub: 'Londra, Güneydoğu, Doğu ve Kuzeydoğu İngiltere', badge: 'A1 / A2 / A3 Konisi', body: 'Nereye bakılır: Koyu yeşil zemin üzerinde sarı dikdörtgen kutu içinde yazan A-yolu numarasına (A1x, A2x, A3x) bakın.', regions: ['eng-greater-london', 'eng-south-east', 'eng-east', 'eng-north-east'] },
          { id: 'gb-wales-biling', title: 'Galler Çift Dilli Galce-İngilizce Yol Levhası', sub: 'Doğu ve Batı Galler (029, 01792, 01248 · A4x/A5x)', badge: 'Galler (Cymru)', body: 'Nereye bakılır: Her tabelada ve asfalt yazısında iki dil (ARAF / SLOW, Heddlu / Police, Llan-, Aber-, Pont-) olmasına bakın.', regions: ['wls-east-wales', 'wls-west-wales-and-the-valleys'] },
          { id: 'gb-scotland-harl', title: 'İskoçya Passing Place Yolu ve Harled Taş Ev', sub: 'Highlands, Doğu, Güneybatı ve Kuzeydoğu İskoçya (A7/A8/A9)', badge: 'İskoçya (Alba)', body: 'Nereye bakılır: Beyaz elmas "Passing Place" tabelalarına, kaba çakıl sıvalı (harled) taş evlere ve A7x/A8x/A9x yol numaralarına bakın.', regions: ['sct-highlands-and-islands', 'sct-eastern', 'sct-south-western', 'sct-north-eastern'] },
          { id: 'gb-cotswold-stone', title: 'İngiltere Tuğla/Taş Sıra Evler ve Çitli Yollar', sub: 'Güneybatı, Midlands, Kuzeybatı, Yorkshire ve Kuzey İrlanda', badge: 'Tuğla & Kuru Taş', body: 'Nereye bakılır: Midlands ve Kuzey’de kırmızı tuğla veya koyu kumtaşı sıra evlere; Güneybatı’da sık çitli yollara; Kuzey İrlanda’da 028/BT tabelalı beyaz kırsal evlere bakın.', regions: ['eng-south-west', 'eng-east-midlands', 'eng-west-midlands', 'eng-yorkshire-and-the-humber', 'eng-north-west', 'nir'] }
        ],
        cards: [
          { badge: 'Galce vs Galik', title: 'Galler Çift Dilli Tabelası ile İskoç Highlands Ayrımı', body: 'Nereye bakılır: Galler’de tüm trafik levhaları baştan sona çift dillidir ve Galce kelimelerde w, y, ll, dd, ff harfleri çok sıktır (Llanfair, Aberystwyth, Araf). İskoçya Highlands’de ise yalnızca yer adı ve turizm tabelaları çift dillidir; İskoç Galcesi (Gàidhlig) bol bh, mh, dh, ch ve sola yatık aksan (à, è, ò) içerir (Inbhir Nis, An Gearasdan).' }
        ]
      }
    ]
  });

})(typeof window !== 'undefined' ? window : globalThis);

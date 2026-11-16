/* pack-mexico.js — Meksika çalışma paketi (32 eyalet, alfabetik C.P., LADA telefon, direk ve kaktüs/plato biyomları) */
(function (g) {
  'use strict';

  var REGIONS = [
    { id: 'noroeste', tr: 'Kuzeybatı (Noroeste)', cue: 'C.P. 21–23, 31–35, 80–85 · LADA 6xx · Saguaro çölü & Büyük Sierra Madre', color: 2 },
    { id: 'noreste', tr: 'Kuzeydoğu (Noreste)', cue: 'C.P. 25–27, 64–67, 87–89 · LADA 81 / 8xx · Yarı kurak çalı ovası & Monterrey', color: 5 },
    { id: 'occidente', tr: 'Batı & Bajío', cue: 'C.P. 20, 28, 36–38, 44–49, 58–63, 76, 78–79, 98–99 · LADA 33 / 4xx · Meksika yaylası', color: 0 },
    { id: 'centro', tr: 'Merkez Havza (CDMX kuşağı)', cue: 'C.P. 01–16, 42–43, 50–57, 62, 72–75, 90 · LADA 55/56 / 222 / 7xx · Tinaco su tanklı düz çatılar', color: 1 },
    { id: 'sur', tr: 'Güney & Körfez (Sur–Golfo)', cue: 'C.P. 29–30, 39–41, 68–71, 86, 91–96 · LADA 744 / 9xx · Şamdan kaktüsü (Oaxaca) ve yemyeşil tropik dağ', color: 4 },
    { id: 'yucatan', tr: 'Yucatán Yarımadası', cue: 'C.P. 24, 77, 97 · LADA 981 / 983 / 998 / 999 · Dümdüz kireçtaşı düzlüğü, sıfır dağ', color: 7 }
  ];

  var UNITS = [
    { id: 'dif', name: 'Ciudad de México (CDMX)', short: 'CDMX', cap: 'Ciudad de México', reg: 'centro', codes: ['55', '56'], postal: '01–16', codeCls: 0, traitId: 'mx-mural-tin', traitTitle: '01–16 C.P. · 55/56 · Pembe Taksiler & Tinaco', traitCls: 0, cue: 'Posta kodu 01–16 yalnızca CDMX’tir! İki haneli 55 / 56 alan kodu, pembe-beyaz taksiler, sarı-mavi metrobus ve yeşil “CDMX / Alcaldía” sokak levhaları.', trap: '00 ve 17–19 C.P. kullanılmaz; 55/56 LADA çevre Edomex ilçelerine de taşar!' },
    { id: 'agu', name: 'Aguascalientes', short: 'AGU', cap: 'Aguascalientes', reg: 'occidente', codes: ['449'], postal: '20', codeCls: 1, traitId: 'mx-candelabra', traitTitle: 'C.P. 20xxx (Alfabetik İlk Eyalet!) · LADA 449', traitCls: 2, cue: 'Alfabetik C.P. listesi 20 ile Aguascalientes’ten başlar! LADA 449. Açık yarı kurak Bajío yaylası, mesquite ağaçları ve temiz sanayi çevresi.' },
    { id: 'bcn', name: 'Baja California', short: 'BC', cap: 'Mexicali', reg: 'noroeste', codes: ['664', '686', '646'], postal: '21–22', codeCls: 1, traitId: 'mx-sonora', traitTitle: 'C.P. 21–22 · ABD Sınırı & Saguaro/Agave Çölü', traitCls: 3, cue: 'C.P. 21 Mexicali, 22 Tijuana/Tecate/Ensenada; LADA 664 Tijuana, 686 Mexicali, 646 Ensenada. Kumlu çöl tepeleri, Kaliforniya tarzı yol şeritleri ve ABD plakalı araçlar.' },
    { id: 'bcs', name: 'Baja California Sur', short: 'BCS', cap: 'La Paz', reg: 'noroeste', codes: ['612', '624'], postal: '23', codeCls: 1, traitId: 'mx-sonora', traitTitle: 'C.P. 23 · Dev Cardón Kaktüsleri & 612/624', traitCls: 3, cue: 'C.P. 23, LADA 612 (La Paz), 624 (Los Cabos). Dev kalın kollu Cardón kaktüsleri, beyaz kumlu kuru dere yatakları ve uzakta mavi Cortez Denizi.' },
    { id: 'cam', name: 'Campeche', short: 'CAM', cap: 'San Francisco de Campeche', reg: 'yucatan', codes: ['981', '938'], postal: '24', codeCls: 1, traitId: 'mx-yucatan', traitTitle: 'C.P. 24 · Dümdüz Kireçtaşı & Alçak Orman', traitCls: 7, cue: 'C.P. 24, LADA 981 (Campeche), 938 (Ciudad del Carmen). Dümdüz yeşil çalı ormanı ve beyaz-kireçtaşı yol omuzları.' },
    { id: 'coa', name: 'Coahuila', short: 'COA', cap: 'Saltillo', reg: 'noreste', codes: ['844', '871', '866', '878'], postal: '25–27', codeCls: 1, traitId: 'mx-sonora', traitTitle: 'C.P. 25–27 (“Co” → “Ch” Öncesi!) · 844/871', traitCls: 3, cue: 'ESKİ İSPANYOL ALFABESİ TUZAĞI: Coahuila (25–27) ve Colima (28), Chiapas (29–30) ile Chihuahua (31–33)’dan önce gelir! LADA 844 Saltillo, 871 Torreón.' },
    { id: 'col', name: 'Colima', short: 'COL', cap: 'Colima', reg: 'occidente', codes: ['312', '314'], postal: '28', codeCls: 1, traitId: 'mx-oct-pole', traitTitle: 'C.P. 28 · Colima Volkanı & LADA 312/314', traitCls: 0, cue: 'C.P. 28, LADA 312 (Colima), 314 (Manzanillo). Kuzeyde Colima volkan konisi, güneyde hindistan cevizi bahçeli tropik kıyı.' },
    { id: 'chp', name: 'Chiapas', short: 'CHIS', cap: 'Tuxtla Gutiérrez', reg: 'sur', codes: ['961', '962', '967'], postal: '29–30', codeCls: 2, traitId: 'mx-mural-tin', traitTitle: 'C.P. 29–30 · Yeşil Dağ Sisleri & 96x', traitCls: 4, cue: 'C.P. 29–30, LADA 961 Tuxtla, 967 San Cristóbal, 962 Tapachula. Sarp yeşil tropik dağlar, taş/saman/kiremit çatılar ve renkli tuk-tuk/kolektif minibüsler.' },
    { id: 'chh', name: 'Chihuahua', short: 'CHIH', cap: 'Chihuahua', reg: 'noroeste', codes: ['614', '656', '639'], postal: '31–33', codeCls: 2, traitId: 'mx-sonora', traitTitle: 'C.P. 31–33 · Dev Chihuahuan Bozkırı & 614/656', traitCls: 3, cue: 'C.P. 31 Chihuahua, 32 Cd. Juárez, 33 Delicias/Parral; LADA 614, 656. Ufukta çıplak blok dağlar, sarı çöl otu ve düz uzun otoyollar.' },
    { id: 'dur', name: 'Durango', short: 'DGO', cap: 'Victoria de Durango', reg: 'noroeste', codes: ['618', '871'], postal: '34–35', codeCls: 2, traitId: 'mx-candelabra', traitTitle: 'C.P. 34–35 · LADA 618 (35x Gómez Palacio)', traitCls: 2, cue: 'C.P. 34 (LADA 618) ve C.P. 35 (Gómez Palacio — Coahuila Torreón ile 871 paylaşır!). Kırmızı kaya platoları ve batıda Sierra çam ormanları.' },
    { id: 'gua', name: 'Guanajuato', short: 'GTO', cap: 'Guanajuato', reg: 'occidente', codes: ['477', '461', '462', '473'], postal: '36–38', codeCls: 2, traitId: 'mx-candelabra', traitTitle: 'C.P. 36–38 · Yoğun Bajío & LADA 477/46x', traitCls: 2, cue: 'C.P. 36 Irapuato/Gto, 37 León (477), 38 Celaya (461). Agave/dikenli incir (nopal) tarlaları ve yoğun boyalı Bajío kasaba duvarları.' },
    { id: 'gro', name: 'Guerrero', short: 'GRO', cap: 'Chilpancingo', reg: 'sur', codes: ['744', '747', '762'], postal: '39–41', codeCls: 3, traitId: 'mx-candelabra', traitTitle: 'C.P. 39–41 · Acapulco 744 & Sarp Yeşil Vadiler', traitCls: 4, cue: 'C.P. 39–41, LADA 744 Acapulco, 747 Chilpancingo. Sıcak kıyı palmiyeleri ve iç kesimde dik kıvrımlı tropik dağ yolları.' },
    { id: 'hid', name: 'Hidalgo', short: 'HGO', cap: 'Pachuca', reg: 'centro', codes: ['771', '775', '773'], postal: '42–43', codeCls: 4, traitId: 'mx-candelabra', traitTitle: 'C.P. 42–43 · Pachuca 771 & Nopal Yaylaları', traitCls: 2, cue: 'C.P. 42–43, LADA 771 Pachuca. Kuzey CDMX yayla tepeleri, rüzgârlı okaliptüs & agav/maguay sıraları.' },
    { id: 'jal', name: 'Jalisco', short: 'JAL', cap: 'Guadalajara', reg: 'occidente', codes: ['33', '322', '341'], postal: '44–49', codeCls: 4, traitId: 'mx-mural-tin', traitTitle: 'C.P. 44–49 · İki Haneli 33 Guadalajara!', traitCls: 0, cue: 'C.P. 44–49 (Meksika’nın ikinci en geniş C.P. bandı) ve iki haneli 33 alan kodu! Mavi agav tarlaları (Tequila) ve 322 Puerto Vallarta.' },
    { id: 'mex', name: 'Estado de México (Edomex)', short: 'EDOMEX', cap: 'Toluca', reg: 'centro', codes: ['722', '55', '56'], postal: '50–57', codeCls: 5, traitId: 'mx-mural-tin', traitTitle: 'C.P. 50–57 (En Geniş Aralık!) · Boyalı Tuğla Tepeler', traitCls: 0, cue: 'C.P. 50–57! LADA 722 (Toluca) ve başkent halkasında 55/56. Sıvasız kırmızı tuğla yamaç evleri, çatıda Tinaco su tankları ve duvar reklamları!' },
    { id: 'mic', name: 'Michoacán', short: 'MICH', cap: 'Morelia', reg: 'occidente', codes: ['443', '351', '452'], postal: '58–61', codeCls: 5, traitId: 'mx-candelabra', traitTitle: 'C.P. 58–61 · Avokado Çam Tepeleri & 443', traitCls: 2, cue: 'C.P. 58 Morelia (443), 59 Zamora (351), 60 Uruapan (452). Yüksek çam-köknar ormanı ile kırmızı topraklı avokado bahçeleri.' },
    { id: 'mor', name: 'Morelos', short: 'MOR', cap: 'Cuernavaca', reg: 'centro', codes: ['777', '735'], postal: '62', codeCls: 6, traitId: 'mx-mural-tin', traitTitle: 'C.P. 62 · Cuernavaca 777 & Kiremit Çatı', traitCls: 0, cue: 'C.P. 62, LADA 777 Cuernavaca. CDMX hemen güneyinde daha sıcak çiçekli bahçeler ve terakota duvarlar.' },
    { id: 'nay', name: 'Nayarit', short: 'NAY', cap: 'Tepic', reg: 'occidente', codes: ['311', '329'], postal: '63', codeCls: 6, traitId: 'mx-oct-pole', traitTitle: 'C.P. 63 · Tepic 311 · Nemli Pasifik Kıyısı', traitCls: 4, cue: 'C.P. 63, LADA 311 Tepic. Palmiye, şeker kamışı ve mango ağaçlarıyla yemyeşil tropik kıyı ovası.' },
    { id: 'nle', name: 'Nuevo León', short: 'NL', cap: 'Monterrey', reg: 'noreste', codes: ['81', '821', '826'], postal: '64–67', codeCls: 6, traitId: 'mx-oct-pole', traitTitle: 'C.P. 64–67 · İki Haneli 81 Monterrey!', traitCls: 3, cue: 'C.P. 64–67 ve iki haneli 81 alan kodu! Monterrey çevresinde devasa testere dişli kireçtaşı Cerro de la Silla dağ duvarları.' },
    { id: 'oax', name: 'Oaxaca', short: 'OAX', cap: 'Oaxaca de Juárez', reg: 'sur', codes: ['951', '958', '971'], postal: '68–71', codeCls: 6, traitId: 'mx-candelabra', traitTitle: 'C.P. 68–71 · Şamdan Kaktüsü & Gri-Kızıl Vadi (951)', traitCls: 2, cue: 'C.P. 68–71, LADA 951 Oaxaca. Yayla vadilerinde dev kollu şamdan/organ kaktüsleri ve kırmızı-kahverengi topraklı dağ yolları!' },
    { id: 'pue', name: 'Puebla', short: 'PUE', cap: 'Puebla', reg: 'centro', codes: ['222', '221', '238'], postal: '72–75', codeCls: 7, traitId: 'mx-mural-tin', traitTitle: 'C.P. 72–75 · LADA 221/222 · Volkanik Kül Toprak', traitCls: 2, cue: 'C.P. 72–75, LADA 221/222. Batıda karlı Popocatépetl volkanı, güney Tehuacán’da dev koloni kaktüs vadisi.' },
    { id: 'que', name: 'Querétaro', short: 'QRO', cap: 'Santiago de Querétaro', reg: 'occidente', codes: ['442', '427'], postal: '76', codeCls: 7, traitId: 'mx-candelabra', traitTitle: 'C.P. 76 · 442 · Pembe Cantera Taşı', traitCls: 2, cue: 'C.P. 76, LADA 442. Geniş kuru yüksek vadi ve kuzey Sierra Gorda dağ ormanları.' },
    { id: 'roo', name: 'Quintana Roo', short: 'Q.ROO', cap: 'Chetumal', reg: 'yucatan', codes: ['998', '984', '983'], postal: '77', codeCls: 7, traitId: 'mx-yucatan', traitTitle: 'C.P. 77 · Cancún 998 · Dümdüz Kireçtaşı', traitCls: 7, cue: 'C.P. 77, LADA 998 Cancún, 984 Playa del Carmen, 983 Chetumal. Sıfır tepe; dümdüz beyaz kireçtaşı yollar ve sık alçak Karayip ormanı.' },
    { id: 'slp', name: 'San Luis Potosí', short: 'SLP', cap: 'San Luis Potosí', reg: 'occidente', codes: ['444', '481'], postal: '78–79', codeCls: 7, traitId: 'mx-candelabra', traitTitle: 'C.P. 78–79 · 444 · Kuru Altiplano ↔ Huasteca Ormanı', traitCls: 2, cue: 'C.P. 78 kuru Altiplano (Yucca & kaktüs), C.P. 79 yemyeşil yağışlı Huasteca! LADA 444 merkez, 481 Ciudad Valles.' },
    { id: 'sin', name: 'Sinaloa', short: 'SIN', cap: 'Culiacán', reg: 'noroeste', codes: ['667', '669', '668'], postal: '80–82', codeCls: 8, traitId: 'mx-sonora', traitTitle: 'C.P. 80–82 · 667/669/668 · Yeşil Kıyı Tarımı', traitCls: 3, cue: 'C.P. 80 Culiacán (667), 81 Los Mochis (668), 82 Mazatlán (669). Dümdüz yeşil sulama kanallı tarım ovası.' },
    { id: 'son', name: 'Sonora', short: 'SON', cap: 'Hermosillo', reg: 'noroeste', codes: ['662', '644', '631'], postal: '83–85', codeCls: 8, traitId: 'mx-sonora', traitTitle: 'C.P. 83–85 · DEV SAGUARO ÇÖLÜ! · 662', traitCls: 3, cue: 'C.P. 83–85, LADA 662 Hermosillo, 644 Obregón. Meksika’nın ikonik dev kol-kollu Saguaro (Carnegiea) & Organ Pipe çöl kaktüsü!', trap: 'Saguaro kaktüsü + kırmızımsı çöl ovası = %90 Sonora!' },
    { id: 'tab', name: 'Tabasco', short: 'TAB', cap: 'Villahermosa', reg: 'sur', codes: ['993', '937'], postal: '86', codeCls: 8, traitId: 'mx-yucatan', traitTitle: 'C.P. 86 · Villahermosa 993 · Nemli Bataklık & Palmiye', traitCls: 4, cue: 'C.P. 86, LADA 993. Dümdüz yemyeşil nemli mera, lagün kanalları ve yağ palmiyeleri (Yucatán kireci yok!).' },
    { id: 'tam', name: 'Tamaulipas', short: 'TAMPS', cap: 'Ciudad Victoria', reg: 'noreste', codes: ['834', '833', '867', '899'], postal: '87–89', codeCls: 8, traitId: 'mx-oct-pole', traitTitle: 'C.P. 87–89 · LADA 83x/867/899 · Körfez Bozkırı', traitCls: 3, cue: 'C.P. 87 Cd. Victoria (834), 88 Reynosa/Matamoros/Laredo (899/868/867), 89 Tampico (833). Düz dikenli çalı ve sıcak Körfez sahili.' },
    { id: 'tla', name: 'Tlaxcala', short: 'TLAX', cap: 'Tlaxcala', reg: 'centro', codes: ['246', '241'], postal: '90', codeCls: 9, traitId: 'mx-mural-tin', traitTitle: 'C.P. 90 · En Küçük Anakara Eyaleti · LADA 246', traitCls: 0, cue: 'C.P. 90, LADA 246! Arka planda La Malinche volkanı, Meksika platosunun klasik boyalı/tuğla köy yolları.' },
    { id: 'ver', name: 'Veracruz', short: 'VER', cap: 'Xalapa', reg: 'sur', codes: ['229', '228', '271', '921'], postal: '91–96', codeCls: 9, traitId: 'mx-oct-pole', traitTitle: 'C.P. 91–96 · Uzun Körfez Şeridi · LADA 22x / 921', traitCls: 4, cue: 'C.P. 91 Xalapa/Veracruz, 92–93 Poza Rica/Tuxpan, 94 Orizaba/Córdoba, 95–96 Coatzacoalcos! Çok uzun, sıcak yemyeşil nemli kıyı ovası.' },
    { id: 'yuc', name: 'Yucatán', short: 'YUC', cap: 'Mérida', reg: 'yucatan', codes: ['999', '986'], postal: '97', codeCls: 9, traitId: 'mx-yucatan', traitTitle: 'C.P. 97 · Mérida 999 · Düz Beyaz Taş Yol', traitCls: 7, cue: 'C.P. 97, LADA 999 Mérida! Tamamen dağsız düz ufuk, gri-beyaz albarrada kuru taş bahçe duvarları ve yoğun Maya soyadları (Pech, Canul, Ku).' },
    { id: 'zac', name: 'Zacatecas', short: 'ZAC', cap: 'Zacatecas', reg: 'occidente', codes: ['492', '493'], postal: '98–99', codeCls: 9, traitId: 'mx-candelabra', traitTitle: 'C.P. 98–99 (Son Sıra!) · LADA 492/493', traitCls: 2, cue: 'C.P. 98–99 (alfabenin en sonu!) ve LADA 492/493. Kuru yarı-çöl yayla düzlüğü, dev çöl yuka ağaçları ve taş tepecikler.' }
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
    /* 1) Alfabetik C.P. çözücü (5 hane veya 2 hane C.P. sorgusu) */
    if (digits.length >= 2 && (q.indexOf('cp') >= 0 || digits.length === 5 || digits.length === 2)) {
      var p2 = +digits.slice(0, 2);
      if (p2 === 0 || (p2 >= 17 && p2 <= 19)) {
        pushRes('C.P. ' + digits.slice(0, 2) + 'xxx', 'Kullanılmayan aralık', 'Meksika posta kodları 01–16 (CDMX) ardından 20–99 (alfabetik) gider; 17–19 boştur.', []);
      } else {
        var cpHits = pack.units.filter(function (u) {
          var m = u.postal.match(/^(\d+)(?:–(\d+))?$/);
          if (!m) return false;
          var a = +m[1], b = m[2] ? +m[2] : a;
          return p2 >= a && p2 <= b;
        });
        if (cpHits.length) {
          pushRes('C.P. ' + digits.slice(0, 2) + 'xxx', cpHits[0].name + ' (' + cpHits[0].short + ')',
            'Aralık: ' + cpHits[0].postal + ' · LADA ' + cpHits[0].codes.join(', '), [cpHits[0].id]);
        }
      }
    }
    /* 2) LADA telefon kodu (55/56, 33, 81 veya 3-hane; 800/900 tuzak!) */
    if (digits.length >= 2 && digits.length !== 5) {
      if (digits.indexOf('800') === 0 || digits.indexOf('900') === 0) {
        pushRes(digits.slice(0, 3), 'Ücretsiz / Servis Hattı (KONUM VERMEZ)', 'LADA 800 ve 900 ülke genelidir.', []);
      } else {
        var d2 = digits.slice(0, 2), d3 = digits.slice(0, 3);
        var lHits = pack.units.filter(function (u) { return u.codes.indexOf(d2) >= 0 || u.codes.indexOf(d3) >= 0; });
        if (lHits.length) {
          pushRes('LADA ' + (lHits[0].codes.indexOf(d2) >= 0 ? d2 : d3), lHits.map(function (u) { return u.name; }).join(' / '),
            lHits.map(function (u) { return 'C.P. ' + u.postal; }).join(' · '), lHits.map(function (u) { return u.id; }));
        }
      }
    }
    pack.units.forEach(function (u) {
      if (pack.norm(u.name).indexOf(q) >= 0 || pack.norm(u.short) === q || pack.norm(u.cap).indexOf(q) >= 0) {
        pushRes('C.P. ' + u.postal, u.name + ' (' + u.short + ')', 'LADA ' + u.codes.join(', ') + ' · ' + u.cap, [u.id]);
      }
    });
    return out.slice(0, 8);
  }

  function makeSimClue(type, u, pack, helpers) {
    var h = helpers.h, maskText = helpers.maskText;
    var r = pack.regById[u.reg];
    var cp = u.postal.split('–')[0];
    var lada = u.codes[0];
    if (type === 'cp') {
      return {
        meaning: 'C.P. ' + u.postal + ' (Alfabetik sıra!) · LADA ' + lada,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Mağaza / Fiş · Alfabetik C.P.'),
          h('div', { 'class': 'sv-plate' }, h('span', {}, 'Av. Juárez #120 · C.P. ' + cp + '400'), h('span', { 'class': 'pill' }, 'LADA ' + lada)),
          h('p', { 'class': 'micro' }, 'Saha izi: ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    if (type === 'lada') {
      var rest = lada.length === 2 ? '51' + ((u.name.length * 17) % 89 + 10) + '-2400' : '2' + ((u.name.length * 13) % 8 + 1) + '4-1980';
      return {
        meaning: 'LADA ' + lada + ' · C.P. ' + u.postal,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Duvar reklamı (Rótulo) · Telefon'),
          h('div', { 'class': 'sv-plate' }, h('span', { 'class': 'area' }, lada), h('span', {}, 'Tel. (' + lada + ') ' + rest)),
          h('p', { 'class': 'micro' }, 'Bölge ipucu: ' + (r ? r.tr : '') + ' · ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    if (type === 'visual' && u.traitId && helpers.SVG) {
      return {
        meaning: (u.traitTitle || '') + ' · C.P. ' + u.postal,
        el: h('div', { 'class': 'sc-inline' },
          helpers.SVG.render(u.traitId, { compact: true }),
          h('div', { 'class': 'sc-inline-txt' },
            h('span', { 'class': 'sv-kicker' }, 'Kaktüs / direk fotoğrafı'),
            h('b', {}, maskText(u.traitTitle || '', u)),
            h('p', { 'class': 'cue' }, maskText(u.cue, u))))
      };
    }
    return {
      meaning: maskText(u.cue, u).slice(0, 68),
      el: h('div', { 'class': 'clue-card-sv' },
        h('span', { 'class': 'sv-kicker' }, 'Saha & biyom notu'),
        h('p', { 'class': 'cue' }, maskText(u.cue, u)),
        u.trap ? h('p', { 'class': 'micro' }, 'Dikkat: ' + maskText(u.trap, u)) : null)
    };
  }

  g.CountryEngine.register({
    id: 'mexico',
    name: 'Meksika',
    unitLabel: 'eyalet',
    unitLabelCap: 'Eyalet',
    postalLabel: 'C.P.',
    geoVar: 'MX_GEO',
    themeId: 'mx',
    themeCfg: {
      aria: 'Meksika haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.',
      fit: 'Tüm Meksika’yı göster',
      grid: { lat: [14, 34, 4], lon: [-120, -84, 4], txt: [16, 32, 4], refLon: -102, refLat: 24 },
      excludeWorld: ['Mexico'],
      bg: [
        [-102.0, 35.8, 'ABD', 'c'], [-90.4, 15.6, 'GUATEMALA', 'c'],
        [-88.6, 17.2, 'BELİZE', 'c'], [-91.5, 25.0, 'Meksika Körfezi', 's'],
        [-111.0, 17.5, 'Pasifik Okyanusu', 's'], [-110.5, 25.5, 'Kaliforniya Körfezi', 's'],
        [-85.5, 20.0, 'Karayip Denizi', 's']
      ]
    },
    srsPrefix: 'mx',
    simKmScale: 520,
    maxFitZoom: 8,
    labelSize: 9.2,
    regionMeta: {
      code: 'MX',
      area: 'Kuzey Amerika',
      tone: 'violet',
      ralias: ['MX', 'MEX', 'MEKSİKA', 'MEXICO'],
      line: '32 eyalet: alfabetik C.P. (20–99), LADA ve Saguaro/Yucatán biyomları',
      blurb: 'Başkent CDMX (01–16) dışındaki 31 eyalette posta kodu (C.P.) 20 Aguascalientes’ten 99 Zacatecas’a alfabetik akar; LADA ve kaktüs biyomlarıyla doğrulanır.',
      exploreDesc: '32 eyalet, alfabetik C.P. kodları, LADA telefonlar, direk/kaktüs biyomları.',
      plan: [
        { title: 'Alfabetik C.P. Sırasını Çöz (20 → 99)', text: 'CDMX 01–16 sonra A→Z (Coahuila 25–27 · Chiapas 29–30 istisnası ile!).', to: 'posta' },
        { title: 'CFE Sekizgen Direk & Kaktüs Kuşağı', text: 'Sonora Saguaro, Oaxaca Şamdan kaktüsü, Yucatán düz kireçtaşı ve Tinaco su tankları.', to: 'cografya' },
        { title: 'LADA (55/33/81) & Duvar Reklamları', text: 'Rótulo dükkan duvarlarındaki 2 ve 3 haneli LADA telefonlarla eyaleti mühürle.', to: 'lada' },
        { title: 'Simülasyonla eyalet vur', text: 'C.P. levhası ve saha ipuçlarıyla 5.000 puan hedefle.', to: 'simulasyon', launch: { preset: 'mix' } }
      ]
    },
    regions: REGIONS,
    colorModes: [
      { id: 'reg', label: 'Bölge' },
      { id: 'code', label: 'Alfabetik C.P.' },
      { id: 'trait', label: 'Kaktüs / arazi' }
    ],
    legendFor: function (mode, pack) {
      if (mode === 'code') {
        return [
          { cls: 'q0', label: '01–16 · CDMX', sub: 'Yalnızca Ciudad de México (17–19 boş)', ids: ['dif'] },
          { cls: 'q1', label: '20–28 · A–Co (AGU, BC, BCS, CAM, COA, COL)', sub: '20 AGU · 21–22 BC · 23 BCS · 24 CAM · 25–27 COA · 28 COL', ids: ['agu', 'bcn', 'bcs', 'cam', 'coa', 'col'] },
          { cls: 'q2', label: '29–41 · Ch–Gu (CHP, CHH, DUR, GUA, GRO)', sub: '29–30 CHP · 31–33 CHH · 34–35 DUR · 36–38 GUA · 39–41 GRO', ids: ['chp', 'chh', 'dur', 'gua', 'gro'] },
          { cls: 'q4', label: '42–49 · H–J (HID, JAL)', sub: '42–43 HID · 44–49 JAL', ids: ['hid', 'jal'] },
          { cls: 'q5', label: '50–61 · M (MEX, MIC)', sub: '50–57 Edomex · 58–61 Michoacán', ids: ['mex', 'mic'] },
          { cls: 'q6', label: '62–71 · Mo–Oa (MOR, NAY, NLE, OAX)', sub: '62 MOR · 63 NAY · 64–67 NLE · 68–71 OAX', ids: ['mor', 'nay', 'nle', 'oax'] },
          { cls: 'q7', label: '72–79 · Pu–Sa (PUE, QUE, ROO, SLP)', sub: '72–75 PUE · 76 QRO · 77 Q.ROO · 78–79 SLP', ids: ['pue', 'que', 'roo', 'slp'] },
          { cls: 'q8', label: '80–89 · Si–Ta (SIN, SON, TAB, TAM)', sub: '80–82 SIN · 83–85 SON · 86 TAB · 87–89 TAM', ids: ['sin', 'son', 'tab', 'tam'] },
          { cls: 'q9', label: '90–99 · Tl–Za (TLA, VER, YUC, ZAC)', sub: '90 TLA · 91–96 VER · 97 YUC · 98–99 ZAC', ids: ['tla', 'ver', 'yuc', 'zac'] }
        ];
      }
      if (mode === 'trait') {
        return [
          { cls: 'q3', label: 'Saguaro / Cardón / Çöl Ovası', sub: 'Sonora, Baja California / BCS, Chihuahua, Nuevo León, Sinaloa, Tamaulipas', ids: ['bcn', 'bcs', 'chh', 'son', 'sin', 'coa', 'nle', 'tam'] },
          { cls: 'q2', label: 'Şamdan Kaktüsü & Kuru Yüksek Yayla', sub: 'Oaxaca, Puebla, Guanajuato, Querétaro, Hidalgo, Michoacán, Durango, SLP, Zacatecas, AGU', ids: ['agu', 'dur', 'gua', 'hid', 'mic', 'oax', 'pue', 'que', 'slp', 'zac'] },
          { cls: 'q0', label: 'Merkez Kent, Duvar Yazısı & Tinaco', sub: 'CDMX, Edomex, Morelos, Tlaxcala, Jalisco, Colima', ids: ['dif', 'mex', 'mor', 'tla', 'jal', 'col'] },
          { cls: 'q4', label: 'Tropikal Dağ & Körfez Yeşili', sub: 'Chiapas, Guerrero, Nayarit, Tabasco, Veracruz', ids: ['chp', 'gro', 'nay', 'tab', 'ver'] },
          { cls: 'q7', label: 'Dümdüz Yucatán Kireçtaşı (Sıfır Tepe)', sub: 'Campeche, Yucatán, Quintana Roo', ids: ['cam', 'yuc', 'roo'] }
        ];
      }
      return pack.regions.map(function (r) {
        return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: pack.units.filter(function (u) { return u.reg === r.id; }).map(function (u) { return u.id; }) };
      });
    },
    units: UNITS,
    decoder: {
      title: 'Alfabetik C.P. (01–99) & LADA çözücü',
      placeholder: 'C.P. (27xxx, 76000, 97) ya da LADA (33, 662, 999)…',
      hint: 'Coahuila (25–27) ve Colima (28), Chiapas (29–30) ile Chihuahua (31–33)’dan ÖNCE gelir!',
      resolve: resolveDecoder
    },
    topics: [
      {
        key: 'posta',
        navLabel: 'C.P. (01–99)',
        icon: 'layers',
        drillPreset: 'code',
        mapMode: 'code',
        labelMode: 'code',
        title: '01–99 Alfabetik Código Postal (C.P.) sırası',
        lead: 'Nereye bakılır: Sokak köşelerindeki mavi/beyaz cadde tabelalarında, dükkan tentelerinde ve duvar ilanı altlarında “C.P. XXXXX” yazar. Sadece başkent CDMX 01–16’yı alır; geri kalan 31 eyaletin tamamı 20 Aguascalientes’ten 99 Zacatecas’a ALFABETİK akar!',
        desc: 'CDMX 01–16, boşluk 17–19, Aguascalientes 20 → Zacatecas 98–99 tam alfabetik dizilim.',
        decoder: true,
        bands: [
          { cls: 'q0', key: '01–16', title: 'Ciudad de México (CDMX)', sub: '17, 18, 19 kesinlikle boş bırakılmıştır.', ids: ['dif'] },
          { cls: 'q1', key: '20–28', title: '20 AGU · 21–22 BC · 23 BCS · 24 CAM · 25–27 COA · 28 COL', sub: 'Dikkat: Coahuila/Colima (Co) eski İspanyol alfabesinde Ch’den önce gelir!', ids: ['agu', 'bcn', 'bcs', 'cam', 'coa', 'col'] },
          { cls: 'q2', key: '29–41', title: '29–30 CHP · 31–33 CHH · 34–35 DUR · 36–38 GUA · 39–41 GRO', sub: 'Chiapas, Chihuahua, Durango, Guanajuato, Guerrero.', ids: ['chp', 'chh', 'dur', 'gua', 'gro'] },
          { cls: 'q4', key: '42–49', title: '42–43 HID · 44–49 JAL', sub: 'Hidalgo (42–43) ardından 6 tam rakamıyla Jalisco (44–49)!', ids: ['hid', 'jal'] },
          { cls: 'q5', key: '50–61', title: '50–57 Edomex (MEX) · 58–61 Michoacán (MIC)', sub: '5x kuşağı yalnızca Edomex ve Michoacán’ı taşır.', ids: ['mex', 'mic'] },
          { cls: 'q6', key: '62–71', title: '62 MOR · 63 NAY · 64–67 NLE · 68–71 OAX', sub: 'Morelos, Nayarit, Nuevo León, Oaxaca.', ids: ['mor', 'nay', 'nle', 'oax'] },
          { cls: 'q7', key: '72–79', title: '72–75 PUE · 76 QRO · 77 Q.ROO · 78–79 SLP', sub: 'Puebla, Querétaro, Quintana Roo, San Luis Potosí.', ids: ['pue', 'que', 'roo', 'slp'] },
          { cls: 'q8', key: '80–89', title: '80–82 SIN · 83–85 SON · 86 TAB · 87–89 TAM', sub: 'Sinaloa, Sonora, Tabasco, Tamaulipas.', ids: ['sin', 'son', 'tab', 'tam'] },
          { cls: 'q9', key: '90–99', title: '90 TLA · 91–96 VER · 97 YUC · 98–99 ZAC', sub: 'Tlaxcala, Veracruz (6 tam rakam!), Yucatán (97), Zacatecas (98–99).', ids: ['tla', 'ver', 'yuc', 'zac'] }
        ],
        rules: [
          {
            title: '2 Altın Meksika Posta Tuzağı',
            body: 'Alfabetik dizilimi ezberlerken yalnızca şu iki noktada takılmamaya dikkat et:',
            traps: [
              ['Co- (25–28) → Ch- (29–33) ÖNCESİNDEDİR!', 'İspanyolcada eskiden “CH” harfi C’den sonra ayrı bir harf sayılırdı; o yüzden Coahuila (25–27) ve Colima (28), Chiapas (29–30) ve Chihuahua’dan (31–33) önce dizilmiştir!'],
              ['Estado de México = “México” (50–57)', 'İsminde “Estado” değil “M” harfi baz alındığından Jalisco (49) ile Michoacán (58) arasına (50–57) girer.']
            ],
            ids: ['coa', 'col', 'chp', 'chh', 'mex']
          }
        ]
      },
      {
        key: 'cografya',
        navLabel: 'Direk & Kaktüs',
        icon: 'bulb',
        drillPreset: 'visual',
        mapMode: 'trait',
        labelMode: 'short',
        title: 'CFE Sekizgen Direk, Fantasmita Dikmesi ve Kaktüs Kuşakları',
        lead: 'Nereye bakılır: Sokaktaki yuvarlak cam sayaçlı sekizgen beton direğe (CFE), siyah tabanlı kırmızı şeritli yol babalarına (Fantasmita), düz damdaki siyah su tanklarına (Tinaco), badanalı duvara boyanmış Rótulo ilanlarına ve ufuktaki kaktüs türüne bak.',
        desc: '6 gerçek Sokak Görünümü fotoğrafı: CFE sekizgen direk, Fantasmita dikmesi, Tinaco/Rótulo, Saguaro, Şamdan kaktüs, Yucatán Albarrada.',
        visuals: [
          { id: 'mx-oct-pole', badge: 'Direk · CFE', title: 'Sekizgen Delikli CFE Direği & Yuvarlak Sayaç', sub: 'Tırmanma delikli sekizgen gri CFE beton direği, altta sarı-siyah şerit ve gövdeye kelepçeli yuvarlak cam elektrik sayacı Meksika sokaklarının %90’ında görülür.', tags: ['Tüm Meksika', 'Sekizgen + sayaç'], ids: ['dif', 'jal', 'nle', 'ver', 'col', 'nay'] },
          { id: 'mx-bollard', badge: 'Yol · Fantasmita', title: 'Siyah Tabanlı Beyaz Yol Babası (Fantasmita)', sub: 'Alt %40 kısmı mat siyah boyalı, üstü kırmızı reflektör bantlı beyaz Meksika karayolu babaları (Fantasmita) ve MEX- kalkan tabelaları.', tags: ['Otoyol MEX-', 'Siyah alt %40'], ids: ['mex', 'pue', 'gua', 'slp', 'chh', 'tam'] },
          { id: 'mx-mural-tin', badge: 'Sokak · Rótulo', title: 'Duvar Reklamı (Rótulo) & Çatıda Siyah Tinaco', sub: 'Merkez ve güney mahallelerde düz çatılardaki siyah Rotoplas/Tinaco su depoları ile doğrudan badanalı duvara elle boyanmış bakkal/LADA telefon ilanları (Rótulo) hemen ayırt edilir.', tags: ['Tinaco su tankı', 'Merkez & Güney'], ids: ['dif', 'mex', 'pue', 'mor', 'tla', 'chp'] },
          { id: 'mx-sonora', badge: 'Biyom · K.Batı', title: 'Dev Saguaro & Cardón Çöl Kaktüsleri', sub: 'İnsan boyunun katlarca üstüne çıkan kol-kollu dev Saguaro ve Cardón kaktüsleri Sonora, Baja California ve BCS çölünün şaşmaz imzasıdır!', tags: ['Sonora / Baja / BCS', 'Dev Saguaro çölü'], ids: ['son', 'bcn', 'bcs', 'sin', 'chh'] },
          { id: 'mx-candelabra', badge: 'Biyom · Yayla', title: 'Şamdan / Organ Kaktüsü & Kuru Yayla', sub: 'Tepelik kırmızı-gri yüksek platoda sık paralel gövdeli şamdan kaktüsleri ve taş duvarlar Oaxaca, Puebla güneyi, Hidalgo, Bajío & Zacatecas’ı gösterir.', tags: ['Oaxaca / Puebla / Bajío', 'Kollu dik kaktüs'], ids: ['oax', 'pue', 'hid', 'que', 'gua', 'mic', 'slp', 'zac', 'agu', 'dur'] },
          { id: 'mx-yucatan', badge: 'Biyom · Yucatán', title: 'Dümdüz Yucatán Kireçtaşı & Albarrada Duvarları', sub: 'Ufukta tek bir tepe bile yoktur! Beyazımsı taş yol kenarı, harçsız beyaz taş avlu duvarları ve alçak yeşil maya çalısı.', tags: ['Sıfır dağ · YUC/CAM/ROO', 'Beyaz taş omuz'], ids: ['yuc', 'cam', 'roo'] }
        ],
        rules: [
          {
            title: '2 Dev Meksika Saha Kuralı',
            body: 'Meksika’da güneşi, kaktüsü ve UF bilgisini birleştirmek:',
            traps: [
              ['Güneş her zaman GÜNEYDEDİR (+ tropikte neredeyse tepededir!)', 'Arjantin/Şili/Brezilya ile asla karıştırma: Meksika ekvatorun tamamen kuzeyindedir!'],
              ['Kaktüs Çölde İSE Sonora/Baja · Kuru Yüksek Dağ/Tepede İSE Oaxaca/Bajío', 'Yemyeşil dağsız düz beyaz kireçtaşı ise tereddütsüz Yucatán Yarımadası!']
            ],
            ids: ['son', 'bcs', 'oax', 'yuc', 'roo']
          }
        ]
      },
      {
        key: 'lada',
        navLabel: 'LADA & Yol',
        icon: 'phone',
        drillPreset: 'clue',
        mapMode: 'reg',
        labelMode: 'short',
        title: 'LADA Telefonlar (55/33/81) ve MEX Karayolu Yönleri',
        lead: 'Nereye bakılır: Meksika’da badanalı bina duvarlarına elle boyanmış bakkal/nalbur reklamlarının (Rótulo) ve elektrik kutularının üstünde büyük puntolu telefon numarası yazar. İlk 2 veya 3 rakam (LADA) seni doğrudan eyalete indirir!',
        desc: '55/56 CDMX, 33 Guadalajara, 81 Monterrey, 2xx–9xx LADA bölgeleri ve MEX-1..180 yolları.',
        rules: [
          {
            title: 'LADA Ön Ek Haritası & 800/900 Tuzağı',
            body: '10 haneli Meksika telefonları üç büyük metropolde 2+8, kalan tüm ülkede 3+7 hane yazılır:',
            traps: [
              ['55 / 56 = CDMX + Edomex', '33 = Guadalajara (Jalisco) · 81 = Monterrey (Nuevo León).'],
              ['6xx = Kuzeybatı & Baja · 8xx = Kuzeydoğu Coahuila/Tamaulipas', '800 ve 900 ücretsiz/özel servis hattıdır, şehir vermez!'],
              ['9xx = Güney & Yucatán + Tabasco/Oaxaca/Chiapas', '951 Oaxaca, 961 Chiapas, 981 Campeche, 993 Tabasco, 998 Cancún, 999 Mérida!'],
              ['MEX-15D / 45D / 57D / 85D / 180', '“D” = Cuota (paralı/bölünmüş otoyol): 15 Batı Pasifik kıyısı · 45 Orta Chihuahua–Gto · 57 Piedras Negras–CDMX · 85 Laredo–CDMX · 180 Doğu Körfez!']
            ],
            ids: ['dif', 'jal', 'nle', 'son', 'oax', 'yuc', 'ver']
          }
        ]
      }
    ],
    presets: [
      { id: 'mix', label: 'Karışık', q: ['loc', 'visual', 'code', 'codeToUnit', 'clueToUnit'] },
      { id: 'code', label: 'C.P. & LADA', q: ['code', 'codeToUnit'] },
      { id: 'visual', label: 'Direk & Kaktüs', q: ['visual', 'clueToUnit'] },
      { id: 'loc', label: '32 Eyalet Yeri', q: ['loc'] }
    ],
    simTypes: [
      { v: 'cp', label: 'Alfabetik C.P.' },
      { v: 'lada', label: 'Duvar LADA' },
      { v: 'visual', label: 'Kaktüs / direk' },
      { v: 'clue', label: 'Biyom tarifi' }
    ],
    makeSimClue: makeSimClue
  });
})(typeof window !== 'undefined' ? window : globalThis);

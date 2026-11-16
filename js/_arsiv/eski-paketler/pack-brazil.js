/* pack-brazil.js — Brezilya çalışma paketi (27 eyalet/DF, DDD, CEP, direkler ve biyomlar) */
(function (g) {
  'use strict';

  var REGIONS = [
    { id: 'sudeste', tr: 'Güneydoğu (Sudeste)', cue: 'DDD 1x–3x · Çift-T direk, yoğun kentler ve kahve yaylası', color: 0 },
    { id: 'sul', tr: 'Güney (Sul)', cue: 'DDD 4x–5x · Araucária çamı, Terra Roxa toprağı, Avrupai çatılar', color: 2 },
    { id: 'co', tr: 'Orta-Batı (Centro-Oeste)', cue: 'DDD 6x · Cerrado düzlüğü, soya ovaları, kırmızı toprak', color: 7 },
    { id: 'nordeste', tr: 'Kuzeydoğu (Nordeste)', cue: 'DDD 7x–8x (MA 98/99) · Caatinga kaktüs, soluk kuru toprak, palmiye sahili', color: 5 },
    { id: 'norte', tr: 'Kuzey (Norte)', cue: 'DDD 9x (AC 68, RO 69, TO 63) · Amazon havzası, gür orman', color: 4 }
  ];

  var UNITS = [
    {
      id: 'sp', name: 'São Paulo', short: 'SP', cap: 'São Paulo', reg: 'sudeste',
      codes: ['11', '12', '13', '14', '15', '16', '17', '18', '19'], postal: '01–19',
      codeCls: 'q0', traitId: 'br-duplo-t', traitTitle: 'Çift-T Direk & Terra Roxa', traitCls: 'q0',
      cue: '1x DDD bloğunun tamamı burada (11 metropol, 19 Campinas, 16 Ribeirão Preto). Çift-T delikli beton direkler standart; batı/kuzey iç kesimde koyu kırmızı Terra Roxa toprağı başlar.',
      trap: '11–19 arası dokuz alan kodunun dokuzu da yalnızca São Paulo eyaletine aittir; güney sınırında PR (4x) ve kuzeyde MG (3x) ile ayrılır.'
    },
    {
      id: 'rj', name: 'Rio de Janeiro', short: 'RJ', cap: 'Rio de Janeiro', reg: 'sudeste',
      codes: ['21', '22', '24'], postal: '20–28',
      codeCls: 'q1', traitId: 'br-round', traitTitle: 'Yuvarlak Direk & Granit Tepeler', traitCls: 'q1',
      cue: '21 metropol, 22 kuzeydoğu sahili (Campos/Cabo Frio), 24 dağlık Serrana hattı (Petrópolis). Düz yuvarlak beton direkler ve kubbeli granit tepeler sık görülür.',
      trap: '27 ve 28 kodu RJ’de değil komşu Espírito Santo (ES) eyaletindedir.'
    },
    {
      id: 'es', name: 'Espírito Santo', short: 'ES', cap: 'Vitória', reg: 'sudeste',
      codes: ['27', '28'], postal: '29',
      codeCls: 'q1', traitId: 'br-round', traitTitle: 'Kıyı & Yuvarlak Beton Direk', traitCls: 'q1',
      cue: '27 kuzey ve Vitória kıyı şeridi, 28 güney dağ/kahve vadileri; CEP 29xxx. RJ gibi 2x bloğunda yer alır ve BR-101 kıyı koridorunu izler.',
      trap: 'Kıyı palmiyeleri ve 2x DDD yüzünden Bahia güneyi (73) veya RJ (22) ile karıştırılabilir.'
    },
    {
      id: 'mg', name: 'Minas Gerais', short: 'MG', cap: 'Belo Horizonte', reg: 'sudeste',
      codes: ['31', '32', '33', '34', '35', '37', '38'], postal: '30–39',
      codeCls: 'q2', traitId: 'br-duplo-t', traitTitle: 'Çift-T Direk & Kırmızı/Okra Tepeler', traitCls: 'q0',
      cue: 'Tüm 3x DDD kodları ve 3xxxx CEP aralığı yalnızca Minas Gerais’tir (36 hariç yok). Engebeli Cerrado/Mata Atlântica tepeleri, kırmızı-turuncu toprak kesitleri ve kırsalda eski ahşap direkler.',
      trap: 'Denize kıyısı yoktur; kuzeyi (38) Sertão’ya yaklaşarak Bahia (77) benzeri kuru çalılığa döner.'
    },
    {
      id: 'pr', name: 'Paraná', short: 'PR', cap: 'Curitiba', reg: 'sul',
      codes: ['41', '42', '43', '44', '45', '46'], postal: '80–87',
      codeCls: 'q3', traitId: 'br-araucaria', traitTitle: 'Araucária Çamı & Terra Roxa', traitCls: 'q3',
      cue: '41 Curitiba, 42 orta plato, 43/44 kuzey (Londrina/Maringá), 45 batı (Foz do Iguaçu). Doğu platosunda şemsiye tepeli Araucária çamları, kuzey/batıda koyu kırmızı Terra Roxa toprağı.',
      trap: '47, 48, 49 artık Paraná değil Santa Catarina (SC) kodudur. UF kısaltmasında PA (Pará) ile karıştırma!'
    },
    {
      id: 'sc', name: 'Santa Catarina', short: 'SC', cap: 'Florianópolis', reg: 'sul',
      codes: ['47', '48', '49'], postal: '88–89',
      codeCls: 'q3', traitId: 'br-araucaria', traitTitle: 'Araucária Yaylası & Alman Çatılar', traitCls: 'q3',
      cue: '47 Joinville/Blumenau kuzeyi, 48 Florianópolis sahili, 49 batı Chapecó. Dik eğimli kiremit çatılar, yeşil otlak tepeler ve iç kesimde sık Araucária ormanları.',
      trap: 'CEP 88–89 aralığındadır; UF kodu SE (Sergipe) veya SP (São Paulo) ile karıştırılmamalıdır.'
    },
    {
      id: 'rs', name: 'Rio Grande do Sul', short: 'RS', cap: 'Porto Alegre', reg: 'sul',
      codes: ['51', '53', '54', '55'], postal: '90–99',
      codeCls: 'q4', traitId: 'br-araucaria', traitTitle: 'Pampas Çayırı & Serra Araucária', traitCls: 'q3',
      cue: 'Tüm 5x DDD kodları (51 Porto Alegre, 53 güney/Pelotas, 54 Serra Gaúcha, 55 batı Pampas) ve CEP 9xxxx. Açık yeşil bozkır-çayır (Pampa) ve kuzeyde Araucária tepeleri.',
      trap: 'Uruguay ve Arjantin sınırına indikçe ağaçlar seyrekleşir; çitlerde taş/ahşap direkler artar.'
    },
    {
      id: 'df', name: 'Distrito Federal', short: 'DF', cap: 'Brasília', reg: 'co',
      codes: ['61'], postal: '70–73',
      codeCls: 'q7', traitId: 'br-round', traitTitle: 'Yuvarlak Planlı Direk & Kırmızı Cerrado', traitCls: 'q1',
      cue: 'DDD 61 ve CEP 70–73 (Eixo Monumental, Asa Sul/Norte, Taguatinga). Geniş bölünmüş bulvarlar, tek tip yuvarlak direkler ve parlak tuğla-kırmızı toprak.',
      trap: '61 kodu Goiás’ın Brasília çevresi (“Entorno”: Águas Lindas, Luziânia) belediyelerinde de görülür.'
    },
    {
      id: 'go', name: 'Goiás', short: 'GO', cap: 'Goiânia', reg: 'co',
      codes: ['62', '64', '61'], postal: '728–767',
      codeCls: 'q7', traitId: 'br-terra-roxa', traitTitle: 'Kırmızı Cerrado & Yuvarlak/H Direk', traitCls: 'q7',
      cue: '62 Goiânia/Anápolis/kuzey, 64 güneybatı tarım kuşağı (Rio Verde). Düz-ondüle Cerrado savanı, bükülmüş kısa ağaçlar ve parlak kırmızı toprak.',
      trap: 'Kuzeydeki 63 kodu artık Tocantins (TO) içindir; CEP 77 Tocantins’e aittir.'
    },
    {
      id: 'to', name: 'Tocantins', short: 'TO', cap: 'Palmas', reg: 'norte',
      codes: ['63'], postal: '77',
      codeCls: 'q7', traitId: 'br-terra-roxa', traitTitle: 'Cerrado Geçişi & Palmas Izgarası', traitCls: 'q7',
      cue: 'Tek DDD 63 ve CEP 77. Coğrafi olarak Norte sayılır ama bitki örtüsü Goiás gibi açık Cerrado savanı + babaçu palmiyesidir.',
      trap: 'DDD 6x ve Cerrado görünümü Orta-Batı hissi verir; özellikle Palmas çok yeni, geniş ızgara bulvarlara sahiptir.'
    },
    {
      id: 'mt', name: 'Mato Grosso', short: 'MT', cap: 'Cuiabá', reg: 'co',
      codes: ['65', '66'], postal: '780–788',
      codeCls: 'q7', traitId: 'br-terra-roxa', traitTitle: 'Dev Soya Tarlaları & Kırmızı Yol Omuzu', traitCls: 'q7',
      cue: '65 Cuiabá ve batı, 66 doğu/kuzey BR-163 koridoru (Rondonópolis, Sinop). Ufka uzanan düz soya/mısır tarlaları, kırmızı-kahve toprak ve ahşap+beton karma direkler.',
      trap: 'MT (Mato Grosso, 65/66) ile MS (Mato Grosso do Sul, 67) sık karıştırılır; CEP 78 MT, 79 MS.'
    },
    {
      id: 'ms', name: 'Mato Grosso do Sul', short: 'MS', cap: 'Campo Grande', reg: 'co',
      codes: ['67'], postal: '79',
      codeCls: 'q7', traitId: 'br-terra-roxa', traitTitle: 'Terra Roxa Ovaları & Cerrado', traitCls: 'q7',
      cue: 'Tek DDD 67 ve CEP 79. Dourados/Campo Grande hattında Paraná’dan sarkan koyu kırmızı Terra Roxa toprağı ve geniş sığır meraları.',
      trap: 'UF kısaltması MS (67) vs MT (65/66) — güneye, Paraguay ve SP/PR sınırına açılan MS 79xxx taşır.'
    },
    {
      id: 'ac', name: 'Acre', short: 'AC', cap: 'Rio Branco', reg: 'norte',
      codes: ['68'], postal: '699',
      codeCls: 'q7', traitId: 'br-wood', traitTitle: 'Batı Amazon Ormanı & Ahşap Direk', traitCls: 'q4',
      cue: 'Tek DDD 68 ve Brezilya’nın en yüksek CEP aralığı (699xx). Yoğun yeşil yağmur ormanı duvarları, kesilmiş palmiye koridorları ve BR-364 yolu.',
      trap: 'En büyük tuzak: CEP 6xxxx (Norte) olduğu halde DDD 68 taşır (9x değildir!).'
    },
    {
      id: 'ro', name: 'Rondônia', short: 'RO', cap: 'Porto Velho', reg: 'norte',
      codes: ['69'], postal: '768–769',
      codeCls: 'q7', traitId: 'br-wood', traitTitle: 'BR-364 Koridoru & Sığır Meraları', traitCls: 'q4',
      cue: 'Tek DDD 69 ve istisnai CEP 768–769. Kesilmiş orman açmalarında sığır otlakları, palmiye kümeleri ve kırmızımsı topraklı uzun BR-364 düzlüğü.',
      trap: 'RO (Rondônia, 69) güneybatıda; RR (Roraima, 95) en kuzeyde Venezuela sınırındadır!'
    },
    {
      id: 'ba', name: 'Bahia', short: 'BA', cap: 'Salvador', reg: 'nordeste',
      codes: ['71', '73', '74', '75', '77'], postal: '40–48',
      codeCls: 'q5', traitId: 'br-caatinga', traitTitle: 'Caatinga Sertão & Kıyı Palmiyeleri', traitCls: 'q5',
      cue: '71 Salvador, 73 güney sahil (Ilhéus/Porto Seguro), 74 kuzey (Juazeiro), 75 Feira de Santana, 77 batı/Conquista. İç kesimde gri-bej Sertão çalısı ve kaktüsler, sahilde hindistan cevizi.',
      trap: 'CEP 40–48 Bahia’dır (7x DDD’ye karşılık 4x CEP!); güneyde MG (38) ve ES (27) ile birleşir.'
    },
    {
      id: 'se', name: 'Sergipe', short: 'SE', cap: 'Aracaju', reg: 'nordeste',
      codes: ['79'], postal: '49',
      codeCls: 'q5', traitId: 'br-caatinga', traitTitle: 'Küçük Kıyı Eyaleti & Caatinga', traitCls: 'q5',
      cue: 'Brezilya’nın en küçük eyaleti; tek DDD 79 ve CEP 49xxx. İç kesimi kuru Caatinga, doğu şeridi kumsallı tropikal kıyıdır.',
      trap: 'UF kodu SE = Sergipe (79); Santa Catarina = SC (47–49) ile karıştırma!'
    },
    {
      id: 'pe', name: 'Pernambuco', short: 'PE', cap: 'Recife', reg: 'nordeste',
      codes: ['81', '87'], postal: '50–56',
      codeCls: 'q6', traitId: 'br-caatinga', traitTitle: 'Sertão Kaktüsleri & Recife Metropolü', traitCls: 'q5',
      cue: '81 doğu kıyı (Recife/Caruaru), 87 geniş batı Sertão (Petrolina). BR-232 boyunca doğuda yeşil şeker kamışı, batıda beyaz-gri taşlı Caatinga kaktüsleri görülür.',
      trap: 'PA (Pará), PB (Paraíba), PI (Piauí), PR (Paraná) arasında PE = Pernambuco (81/87).'
    },
    {
      id: 'al', name: 'Alagoas', short: 'AL', cap: 'Maceió', reg: 'nordeste',
      codes: ['82'], postal: '57',
      codeCls: 'q6', traitId: 'br-round', traitTitle: 'Şeker Kamışı Kıyısı & Yuvarlak Direk', traitCls: 'q1',
      cue: 'Tek DDD 82 ve CEP 57. Recife ile Aracaju arasında yoğun şeker kamışı tepeleri, lagünler ve beyaz kumlu plaj şeridi.',
      trap: '81 PE, 82 AL, 83 PB, 84 RN — Atlantik kıyısı boyunca güneyden kuzeye ardışık gider.'
    },
    {
      id: 'pb', name: 'Paraíba', short: 'PB', cap: 'João Pessoa', reg: 'nordeste',
      codes: ['83'], postal: '58',
      codeCls: 'q6', traitId: 'br-caatinga', traitTitle: 'Borborema Platosu & Soluk Caatinga', traitCls: 'q5',
      cue: 'Tek DDD 83 ve CEP 58. Doğu kıyı dışında neredeyse tüm iç kesimi kayalık, kaktüslü Sertão ve bodur dikenli çalılıktır.',
      trap: 'AL (82) kuzeyinde, RN (84) güneyindedir; Campina Grande iç platodaki dev merkezdir.'
    },
    {
      id: 'rn', name: 'Rio Grande do Norte', short: 'RN', cap: 'Natal', reg: 'nordeste',
      codes: ['84'], postal: '59',
      codeCls: 'q6', traitId: 'br-caatinga', traitTitle: 'Kumullar, Carnaúba & Açık Caatinga', traitCls: 'q5',
      cue: 'Tek DDD 84 ve CEP 59. Brezilya’nın “dirsek” köşesi: açık renkli kumlu yol omuzları, rüzgâr türbinleri, tuzlalar ve seyrek kaktüslü çalı.',
      trap: 'Carnaúba ve kumul manzarası batıdaki komşusu Ceará (85/88) ile devam eder.'
    },
    {
      id: 'ce', name: 'Ceará', short: 'CE', cap: 'Fortaleza', reg: 'nordeste',
      codes: ['85', '88'], postal: '60–63',
      codeCls: 'q6', traitId: 'br-caatinga', traitTitle: 'Kaktüs-Carnaúba Sertão & Fortaleza', traitCls: 'q5',
      cue: '85 Grande Fortaleza, 88 tüm iç kesim ve Sobral/Juazeiro do Norte. Beyaz kumlu yol kenarları, uzun gövdeli carnaúba palmiyeleri ve kurak Caatinga.',
      trap: 'CEP burada 6xxxx’e sıçrar (60–63) ama DDD hâlâ 8x’tir (85/88)!'
    },
    {
      id: 'pi', name: 'Piauí', short: 'PI', cap: 'Teresina', reg: 'nordeste',
      codes: ['86', '89'], postal: '64',
      codeCls: 'q6', traitId: 'br-caatinga', traitTitle: 'Teresina Geçişi & Kurak Masa Tepeleri', traitCls: 'q5',
      cue: '86 kuzey/Teresina (Maranhão sınırındaki nehirde yer alır), 89 güney Sertão/Cerrado. Dar kıyı şeridi dışında iç kesimde kırmızımsı kil ve Caatinga görülür.',
      trap: '8x DDD kuşağının son eyaletidir; batıya Maranhão’ya geçer geçmez DDD 98/99’a sıçrar!'
    },
    {
      id: 'ma', name: 'Maranhão', short: 'MA', cap: 'São Luís', reg: 'nordeste',
      codes: ['98', '99'], postal: '65',
      codeCls: 'q4', traitId: 'br-wood', traitTitle: 'Babaçu Palmiyesi & Ahşap/Beton Direk', traitCls: 'q4',
      cue: '98 São Luís/kuzey, 99 Imperatriz/güneybatı; CEP 65. Çok karakteristik yoğun babaçu palmiye ormanları ve doğuda beyaz kumullar.',
      trap: 'KLASİK TUZAK: Coğrafi olarak Nordeste’dedir ama DDD kodu 98/99 (9x!) kullanır!'
    },
    {
      id: 'pa', name: 'Pará', short: 'PA', cap: 'Belém', reg: 'norte',
      codes: ['91', '93', '94'], postal: '66–688',
      codeCls: 'q4', traitId: 'br-wood', traitTitle: 'Amazon Otoyolları & Ahşap Direkler', traitCls: 'q4',
      cue: '91 Belém/doğu, 93 Santarém/BR-163/Transamazônica batı, 94 Marabá/Carajás güneydoğu. Kırmızı topraklı BR-230/BR-163 yolları, yoğun Amazon ormanı ve dev kerestecilik meraları.',
      trap: 'PA (Pará) = 91/93/94; güneydeki PR (Paraná) = 41–46 ile karıştırılmamalı.'
    },
    {
      id: 'ap', name: 'Amapá', short: 'AP', cap: 'Macapá', reg: 'norte',
      codes: ['96'], postal: '689',
      codeCls: 'q4', traitId: 'br-round', traitTitle: 'Ekvator Sahili & Macapá', traitCls: 'q1',
      cue: 'Tek DDD 96 ve CEP 689. Anakara karayolu bağlantısı zayıf; neredeyse yalnızca Macapá–Santana şehir çevresi ile Oiapoque (BR-156) hattı kapsanır.',
      trap: 'AL (Alagoas), AM (Amazonas), AP (Amapá) ve AC (Acre) kısaltmalarını ayırt et.'
    },
    {
      id: 'am', name: 'Amazonas', short: 'AM', cap: 'Manaus', reg: 'norte',
      codes: ['92', '97'], postal: '690–698',
      codeCls: 'q4', traitId: 'br-wood', traitTitle: 'Manaus, AM-010 & Koyu Yeşil Orman', traitCls: 'q4',
      cue: '92 Manaus ve doğu belediyeleri, 97 iç nehir havzası. Çok nemli koyu yeşil yağmur ormanı, beyazımsı/kumlu veya turuncu yan yollar ve Manaus kentsel direkleri.',
      trap: 'Street View çoğunlukla Manaus çevresi, Itacoatiara (AM-010), Manacapuru ve Humaitá’da yoğunlaşır.'
    },
    {
      id: 'rr', name: 'Roraima', short: 'RR', cap: 'Boa Vista', reg: 'norte',
      codes: ['95'], postal: '693',
      codeCls: 'q4', traitId: 'br-terra-roxa', traitTitle: 'Lavrado Savanı & Boa Vista Işınları', traitCls: 'q7',
      cue: 'Tek DDD 95 ve CEP 693. Amazon’un şaşırtıcı biçimde kuzeyindeki açık çimenlik “Lavrado” savanı, düz ufukta tepeler ve ışın planlı Boa Vista caddeleri.',
      trap: 'RR = Roraima (95, kuzey Venezuela sınırı) vs RO = Rondônia (69, güneybatı Bolivya sınırı).'
    }
  ];

  /* Posta aralığı (CEP) ilk 2-3 haneye göre çözümleme */
  var CEP_RANGES = [
    [0, 19, ['sp'], 'São Paulo (0xxxx = Grande SP, 1xxxx = İç/Sahil SP)'],
    [20, 28, ['rj'], 'Rio de Janeiro (20–28xxx)'],
    [29, 29, ['es'], 'Espírito Santo (29xxx)'],
    [30, 39, ['mg'], 'Minas Gerais (30–39xxx)'],
    [40, 48, ['ba'], 'Bahia (40–48xxx)'],
    [49, 49, ['se'], 'Sergipe (49xxx)'],
    [50, 56, ['pe'], 'Pernambuco (50–56xxx)'],
    [57, 57, ['al'], 'Alagoas (57xxx)'],
    [58, 58, ['pb'], 'Paraíba (58xxx)'],
    [59, 59, ['rn'], 'Rio Grande do Norte (59xxx)'],
    [60, 63, ['ce'], 'Ceará (60–63xxx)'],
    [64, 64, ['pi'], 'Piauí (64xxx)'],
    [65, 65, ['ma'], 'Maranhão (65xxx)'],
    [70, 73, ['df', 'go'], 'Distrito Federal (70–73xxx · 728–729 GO Entorno)'],
    [74, 76, ['go', 'ro'], 'Goiás (74–767) · Rondônia istisna (768–769)'],
    [77, 77, ['to'], 'Tocantins (77xxx)'],
    [78, 78, ['mt'], 'Mato Grosso (780–788xxx)'],
    [79, 79, ['ms'], 'Mato Grosso do Sul (79xxx)'],
    [80, 87, ['pr'], 'Paraná (80–87xxx)'],
    [88, 89, ['sc'], 'Santa Catarina (88–89xxx)'],
    [90, 99, ['rs'], 'Rio Grande do Sul (90–99xxx)']
  ];

  function resolveDecoder(raw, pack) {
    var q = pack.norm(raw);
    if (!q) return [];
    var out = [];
    var seen = Object.create(null);
    function pushRes(code, label, sub, ids) {
      var k = code + '|' + label;
      if (seen[k]) return;
      seen[k] = 1;
      out.push({ code: code, label: label, sub: sub, ids: ids });
    }

    /* 1) CEP sorgusu: "cep 65..." veya 5-8 rakam */
    var digits = q.replace(/[^0-9]/g, '');
    if (q.indexOf('cep') >= 0 || digits.length >= 5) {
      if (digits.length >= 3) {
        var p3 = +digits.slice(0, 3);
        if (p3 >= 660 && p3 <= 688) pushRes('CEP ' + digits.slice(0, 5), 'Pará', '66–688xx aralığı · DDD 91/93/94', ['pa']);
        else if (p3 === 689) pushRes('CEP ' + digits.slice(0, 5), 'Amapá', '689xx aralığı · DDD 96', ['ap']);
        else if (p3 === 693) pushRes('CEP ' + digits.slice(0, 5), 'Roraima', '693xx aralığı · DDD 95', ['rr']);
        else if (p3 === 699) pushRes('CEP ' + digits.slice(0, 5), 'Acre', '699xx aralığı · DDD 68', ['ac']);
        else if (p3 >= 690 && p3 <= 698) pushRes('CEP ' + digits.slice(0, 5), 'Amazonas', '690–698 (693/699 hariç) · DDD 92/97', ['am']);
        else if (p3 === 768 || p3 === 769) pushRes('CEP ' + digits.slice(0, 5), 'Rondônia', '768–769xx istisnası · DDD 69', ['ro']);
      }
      if (digits.length >= 2) {
        var p2 = +digits.slice(0, 2);
        CEP_RANGES.forEach(function (r) {
          if (p2 >= r[0] && p2 <= r[1]) {
            pushRes('CEP ' + digits.slice(0, 2) + 'xxx', r[1] === r[0] ? r[3].split(' (')[0] : 'Posta Bölgesi', r[3], r[2]);
          }
        });
      } else if (digits.length === 1) {
        var d1 = digits;
        var map1 = {
          '0': [['sp'], 'São Paulo Metropol (0xxxx)'],
          '1': [['sp'], 'São Paulo İç/Sahil (1xxxx)'],
          '2': [['rj', 'es'], 'Rio de Janeiro (20–28) · Espírito Santo (29)'],
          '3': [['mg'], 'Minas Gerais (3xxxx)'],
          '4': [['ba', 'se'], 'Bahia (40–48) · Sergipe (49)'],
          '5': [['pe', 'al', 'pb', 'rn'], 'PE (50–56) · AL (57) · PB (58) · RN (59)'],
          '6': [['ce', 'pi', 'ma', 'pa', 'ap', 'am', 'rr', 'ac'], 'CE/PI/MA ve Kuzey (Norte)'],
          '7': [['df', 'go', 'ro', 'to', 'mt', 'ms'], 'DF/GO/TO/MT/MS + Rondônia (768–769)'],
          '8': [['pr', 'sc'], 'Paraná (80–87) · Santa Catarina (88–89)'],
          '9': [['rs'], 'Rio Grande do Sul (9xxxx)']
        };
        if (map1[d1]) pushRes('CEP ' + d1 + 'xxxx', 'İlk hane ' + d1, map1[d1][1], map1[d1][0]);
      }
    }

    /* 2) DDD 2-haneli alan kodu veya onluk arama */
    if (digits.length >= 1 && digits.length <= 4 && q.indexOf('cep') < 0) {
      var d2 = digits.slice(0, 2);
      var exact = pack.units.filter(function (u) { return u.codes.indexOf(d2) >= 0; });
      if (exact.length) {
        pushRes('DDD ' + d2, exact.map(function (u) { return u.name + ' (' + u.short + ')'; }).join(' / '),
          exact.map(function (u) { return 'Başkent: ' + u.cap + ' · CEP ' + u.postal; }).join(' · '),
          exact.map(function (u) { return u.id; }));
      } else if (digits.length === 1) {
        var dddHits = pack.units.filter(function (u) { return u.codes.some(function (c) { return c.charAt(0) === digits; }); });
        if (dddHits.length) {
          pushRes('DDD ' + digits + 'x', dddHits.map(function (u) { return u.short; }).join(', '),
            digits + ' ile başlayan tüm eyaletler (' + dddHits.length + ' eyalet)',
            dddHits.map(function (u) { return u.id; }));
        }
      }
    }

    /* 3) UF kısaltması veya şehir/eyalet adı */
    pack.units.forEach(function (u) {
      if (pack.norm(u.short) === q || pack.norm(u.name).indexOf(q) >= 0 || pack.norm(u.cap).indexOf(q) >= 0) {
        pushRes(u.short, u.name, 'DDD ' + u.codes.join(', ') + ' · CEP ' + u.postal + ' · Merkez: ' + u.cap, [u.id]);
      }
    });
    return out.slice(0, 8);
  }

  function makeSimClue(type, u, pack, helpers) {
    var h = helpers.h, maskText = helpers.maskText;
    var r = pack.regById[u.reg];
    var ddd = u.codes[0];
    if (type === 'ddd') {
      var fakeNum = '(0' + ddd + ') 3' + ((ddd * 17) % 89 + 10) + '-' + (1000 + (ddd * 73) % 8999);
      return {
        meaning: 'DDD ' + ddd + (u.codes.length > 1 ? ' (' + u.codes.slice(0, 4).join(', ') + ')' : ''),
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Dükkan tabelası · Telefon'),
          h('div', { 'class': 'sv-plate' }, h('span', { 'class': 'area' }, ddd), h('span', {}, fakeNum)),
          h('p', { 'class': 'micro' }, 'Saha notu: ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    if (type === 'cep') {
      return {
        meaning: 'CEP ' + u.postal + ' · DDD ' + ddd,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Mağaza adresi · Posta & Kod'),
          h('div', { 'class': 'sv-plate' }, h('span', {}, 'Av. Brasil, 420 · CEP ' + u.postal + 'xxx-000')),
          h('p', { 'class': 'micro' }, 'Bölge izi: ' + (r ? r.tr : '') + ' · İki harfli UF gizlendi.'))
      };
    }
    if (type === 'visual' && u.traitId && helpers.SVG) {
      return {
        meaning: (u.traitTitle || 'Görsel saha') + ' · DDD ' + ddd,
        el: h('div', { 'class': 'sc-inline' },
          helpers.SVG.render(u.traitId, { compact: true }),
          h('div', { 'class': 'sc-inline-txt' },
            h('span', { 'class': 'sv-kicker' }, 'Saha fotoğrafı'),
            h('b', {}, maskText(u.traitTitle || '', u)),
            h('p', { 'class': 'cue' }, maskText(u.cue, u))))
      };
    }
    return {
      meaning: maskText(u.cue, u).slice(0, 70),
      el: h('div', { 'class': 'clue-card-sv' },
        h('span', { 'class': 'sv-kicker' }, 'Bölgesel saha notu'),
        h('p', { 'class': 'cue' }, maskText(u.cue, u)),
        u.trap ? h('p', { 'class': 'micro' }, 'Dikkat: ' + maskText(u.trap, u)) : null)
    };
  }

  g.CountryEngine.register({
    id: 'brazil',
    name: 'Brezilya',
    unitLabel: 'eyalet',
    unitLabelCap: 'Eyalet',
    postalLabel: 'CEP',
    geoVar: 'BR_GEO',
    themeId: 'br',
    themeCfg: {
      aria: 'Brezilya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.',
      fit: 'Tüm Brezilya’yı göster',
      grid: { lat: [-36, 8, 4], lon: [-76, -32, 4], txt: [-32, 4, 4], refLon: -54, refLat: -14 },
      excludeWorld: ['Brazil', 'Argentina'],
      bg: [
        [-65.0, -35.2, 'ARJANTİN', 'c'], [-64.8, -17.0, 'BOLİVYA', 'c'],
        [-75.0, -9.8, 'PERU', 'c'], [-73.2, 3.6, 'KOLOMBİYA', 'c'],
        [-66.5, 7.2, 'VENEZUELA', 'c'], [-58.4, -23.4, 'PARAGUAY', 'c'],
        [-56.0, -32.8, 'URUGUAY', 'c'], [-37.0, -14.0, 'Atlas Okyanusu', 's'],
        [-41.5, -28.0, 'Güney Atlantik', 's']
      ]
    },
    srsPrefix: 'br',
    simKmScale: 680,
    maxFitZoom: 7,
    labelSize: 9.5,
    regionMeta: {
      code: 'BR',
      area: 'Güney Amerika',
      tone: 'amber',
      ralias: ['BR', 'BRA', 'BRE', 'BREZİLYA', 'BRAZIL'],
      line: '27 eyalet: saat yönü DDD kodları, CEP, direkler ve biyomlar',
      blurb: 'Dört temel ipucu: saat yönlü 1x–9x DDD alan kodları, CEP posta hanesi, Çift-T/yuvarlak direk ve Araucária/Caatinga biyomları.',
      exploreDesc: '27 eyalet/DF, DDD telefon kodları, CEP başlangıçları ve saha ipuçları.',
      plan: [
        { title: 'DDD + CEP saatini ezberle', text: '1x SP → 2x RJ/ES → 3x MG → 4x PR/SC → 5x RS → 6x Orta-Batı → 7x BA/SE → 8x NE → 9x Kuzey.', to: 'alan' },
        { title: 'Direkler & Biyom kuşağı', text: 'Çift-T direk, Araucária çamı, Sertão Caatinga kaktüsü ve Terra Roxa toprağını ayırt et.', to: 'direkler' },
        { title: '2 harfli UF kısaltmaları', text: 'MS/MT, RO/RR, SE/SC ve PA/PR/PB/PE/PI ikililerini karıştırmayı bırak.', to: 'eyaletler' },
        { title: 'Simülasyonla test et', text: 'Dükkan tabelası ve saha ipuçlarından eyalet merkezine 5.000 puan hedefle.', to: 'simulasyon', launch: { preset: 'mix' } }
      ]
    },
    regions: REGIONS,
    colorModes: [
      { id: 'reg', label: 'Bölge' },
      { id: 'code', label: 'DDD onluğu' },
      { id: 'trait', label: 'Biyom / direk' }
    ],
    legendFor: function (mode, pack) {
      if (mode === 'code') {
        return [
          { cls: 'q0', label: '1x · São Paulo', sub: '11–19 (tüm SP)', ids: ['sp'] },
          { cls: 'q1', label: '2x · RJ & ES', sub: '21/22/24 RJ · 27/28 ES', ids: ['rj', 'es'] },
          { cls: 'q2', label: '3x · Minas Gerais', sub: '31–38 (36 hariç)', ids: ['mg'] },
          { cls: 'q3', label: '4x · PR & SC', sub: '41–46 PR · 47–49 SC', ids: ['pr', 'sc'] },
          { cls: 'q4', label: '5x · Rio Grande do Sul', sub: '51/53/54/55', ids: ['rs'] },
          { cls: 'q7', label: '6x · Orta-Batı + AC/RO/TO', sub: '61–69 (tüm iç & batı)', ids: ['df', 'go', 'to', 'mt', 'ms', 'ac', 'ro'] },
          { cls: 'q5', label: '7x · Bahia & Sergipe', sub: '71–77 BA · 79 SE', ids: ['ba', 'se'] },
          { cls: 'q6', label: '8x · Kuzeydoğu Kıyısı', sub: '81–89 PE/AL/PB/RN/CE/PI', ids: ['pe', 'al', 'pb', 'rn', 'ce', 'pi'] },
          { cls: 'q4', label: '9x · Amazon + Maranhão', sub: '91–97 PA/AM/RR/AP · 98/99 MA', ids: ['pa', 'ap', 'am', 'rr', 'ma'] }
        ];
      }
      if (mode === 'trait') {
        return [
          { cls: 'q0', label: 'Çift-T Direk kuşağı', sub: 'SP, MG ağırlıklı standart', ids: ['sp', 'mg'] },
          { cls: 'q1', label: 'Yuvarlak direk sahili', sub: 'RJ, ES, DF, AL, AP', ids: ['rj', 'es', 'df', 'al', 'ap'] },
          { cls: 'q3', label: 'Araucária & Güney', sub: 'PR, SC, RS yaylaları', ids: ['pr', 'sc', 'rs'] },
          { cls: 'q5', label: 'Caatinga Sertão kaktüsü', sub: 'BA, SE, PE, PB, RN, CE, PI', ids: ['ba', 'se', 'pe', 'pb', 'rn', 'ce', 'pi'] },
          { cls: 'q7', label: 'Cerrado & Terra Roxa', sub: 'GO, TO, MT, MS, RR', ids: ['go', 'to', 'mt', 'ms', 'rr'] },
          { cls: 'q4', label: 'Amazon & Babaçu ahşap hat', sub: 'PA, AM, AC, RO, MA', ids: ['pa', 'am', 'ac', 'ro', 'ma'] }
        ];
      }
      return pack.regions.map(function (r) {
        return {
          cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue,
          ids: pack.units.filter(function (u) { return u.reg === r.id; }).map(function (u) { return u.id; })
        };
      });
    },
    units: UNITS,
    decoder: {
      title: 'DDD, CEP veya UF çözücü',
      placeholder: 'DDD (örn. 98, 41), CEP (699xx) ya da UF (MS)…',
      hint: 'İpucu: Reklamdaki (XX) 9xxxx… numarasında baştaki 2 rakam DDD’dir; sonraki 9 sadece cep telefonu önekidir.',
      resolve: resolveDecoder
    },
    topics: [
      {
        key: 'alan',
        navLabel: 'DDD & CEP',
        icon: 'phone',
        drillPreset: 'code',
        mapMode: 'code',
        labelMode: 'code',
        title: 'DDD telefon ve CEP posta saat döngüsü',
        lead: 'Nereye bakılır: Dükkan tabelaları, kamyon kapıları, elektrik direğine asılı el ilanları ve emlak afişlerindeki “(XX) 9xxxx-xxxx” numarasının ilk 2 rakamı doğrudan eyalet/bölge DDD kodudur (arkadaki 9 yalnızca cep numarası önekidir). Alt köşede CEP XXXXX-XXX görürsen ilk 2 rakamla eyaleti kilitle.',
        desc: '1x–9x DDD spiral haritası, 0–9 CEP saat döngüsü ve MA 98 / AC 68 tuzakları.',
        decoder: true,
        bands: [
          { cls: 'q0', key: '1x', title: '11–19 · São Paulo (9 kodun tamamı)', sub: '11 metropol, 12 Paraíba vadisi, 13 Santos sahili, 19 Campinas. CEP: 0–1.', ids: ['sp'] },
          { cls: 'q1', key: '2x', title: '21–28 · Rio de Janeiro & Espírito Santo', sub: '21/22/24 RJ · 27/28 ES. CEP: 20–28 RJ, 29 ES.', ids: ['rj', 'es'] },
          { cls: 'q2', key: '3x', title: '31–38 · Minas Gerais', sub: '31 BH, 32 Juiz de Fora, 34 Triângulo, 38 kuzey Sertão. CEP: 3.', ids: ['mg'] },
          { cls: 'q3', key: '4x', title: '41–49 · Paraná (41–46) & Santa Catarina (47–49)', sub: '41 Curitiba, 45 Foz · 47 Joinville, 48 Floripa. CEP: 8.', ids: ['pr', 'sc'] },
          { cls: 'q4', key: '5x', title: '51–55 · Rio Grande do Sul', sub: '51 Porto Alegre, 53 güney, 54 Serra, 55 batı. CEP: 9.', ids: ['rs'] },
          { cls: 'q7', key: '6x', title: '61–69 · Orta-Batı + TO (63), AC (68), RO (69)', sub: '61 DF, 62/64 GO, 65/66 MT, 67 MS, 68 AC, 69 RO.', ids: ['df', 'go', 'to', 'mt', 'ms', 'ac', 'ro'] },
          { cls: 'q5', key: '7x', title: '71–79 · Bahia (71–77) & Sergipe (79)', sub: '71 Salvador, 73 güney sahil, 77 batı BA · 79 SE. CEP: 4.', ids: ['ba', 'se'] },
          { cls: 'q6', key: '8x', title: '81–89 · Kuzeydoğu Kıyısı (PE–PI)', sub: '81/87 PE, 82 AL, 83 PB, 84 RN, 85/88 CE, 86/89 PI.', ids: ['pe', 'al', 'pb', 'rn', 'ce', 'pi'] },
          { cls: 'q4', key: '9x', title: '91–99 · Kuzey (PA/AP/AM/RR) + Maranhão (98/99)', sub: '91/93/94 PA, 92/97 AM, 95 RR, 96 AP, 98/99 MA!', ids: ['pa', 'ap', 'am', 'rr', 'ma'] }
        ],
        flows: [
          { title: 'Tabelada parantez içini oku', body: 'Kameralarda en sık veri dükkan camı ve emlakçı afişidir: (67) -> tek hamlede Mato Grosso do Sul!', ids: ['ms'] },
          { title: 'Cep vs sabit hat tuzağına düşme', body: 'Brezilya’da tüm cep telefonları 9XXXX-XXXX şeklindedir. Örnek: (31) 99123-4567 -> kod 99 değil 31 (MG)!', ids: ['mg'] },
          { title: 'CEP varsa son basamak yerine ilk 2 rakama bak', body: 'CEP 0/1 SP, 2 RJ/ES, 3 MG, 4 BA/SE, 5 PE–RN, 8 PR/SC, 9 RS’dir; DDD ile çarpıştırınca sıfır hata verir.', ids: ['sp', 'ba', 'rs'] }
        ],
        rules: [
          {
            title: 'En büyük 3 DDD istisnası',
            body: 'Saat döngüsü mantığında herkesin şaşırdığı üç bölge geçişi vardır:',
            traps: [
              ['MA = 98 / 99', 'Maranhão coğrafi olarak Nordeste olsa da Kuzey 9x grubuna atlanmıştır.'],
              ['AC = 68, RO = 69, TO = 63', 'Üçü de Kuzey (Norte) eyaletidir ama 6x kodunu kullanır; CEP 699 AC, 768–769 RO, 77 TO.'],
              ['CEP sıçramaları', 'Bahia/Sergipe DDD’de 7x iken CEP’te 4x alır; Paraná/SC/RS DDD’de 4x–5x iken CEP’te 8x–9x alır!']
            ],
            ids: ['ma', 'ac', 'ro', 'to', 'ba', 'pr']
          }
        ]
      },
      {
        key: 'direkler',
        navLabel: 'Direk & Biyom',
        icon: 'bulb',
        drillPreset: 'visual',
        mapMode: 'trait',
        labelMode: 'short',
        title: 'Elektrik direkleri, toprak rengi ve bitki kuşağı',
        lead: 'Nereye bakılır: Yazısız kır ve kasaba yollarında hemen kenardaki beton direğin gövdesine (ortası delikli Duplo-T mi, pürüzsüz yuvarlak mı, ahşap mı?), dur işaretlerinin mat siyah arka yüzüne, beyaz boyalı kaldırım taşlarına ve toprak/ağaç silüetine bak.',
        desc: '6 gerçek Sokak Görünümü fotoğrafı: Çift-T, yuvarlak, ahşap direk + Araucária, Caatinga, Terra Roxa.',
        visuals: [
          { id: 'br-duplo-t', badge: 'Direk · A', title: 'Delikli Çift-T beton direk (Duplo-T)', sub: 'En tipik Brezilya direği: merdiven gibi gövde boyunca dikdörtgen pencereler vardır. Güneydoğu & Güney’de (SP, MG, PR, SC, RS) çok yoğundur.', tags: ['En yaygın: SP/MG/Sul', 'Basamak delikli'], ids: ['sp', 'mg', 'pr', 'sc', 'rs'] },
          { id: 'br-round', badge: 'Direk · B', title: 'Yuvarlak konik direk · Siyah Tabela Arkası & Beyaz Kaldırım', sub: 'Deliksiz pürüzsüz yuvarlak beton direkler (özellikle RJ, ES, Brasília/DF ve sahil şehirleri) + tabela arka yüzlerinin siyah boyalı ve kaldırım taşlarının beyaz boyalı olması saf Brezilya imzasıdır.', tags: ['RJ/ES/DF & şehirler', 'Siyah tabela arkası'], ids: ['rj', 'es', 'df', 'al', 'pe'] },
          { id: 'br-wood', badge: 'Direk · C', title: 'Ahşap kırsal direk (Madeira)', sub: 'Eski Minas Gerais tepeleri, Kuzeydoğu iç kesimleri (MA/PI) ve Amazon kırsal yollarında görülen yalın koyu ahşap direkler.', tags: ['Amazon kırsal', 'Eski MG / MA'], ids: ['pa', 'am', 'ac', 'ro', 'ma', 'mg'] },
          { id: 'br-araucaria', badge: 'Biyom · 1', title: 'Araucária (Paraná Çamı)', sub: 'Ters şemsiye/kadeh tepesi tartışmasızdır: yalnızca Paraná (PR), Santa Catarina (SC) ve kuzey RS yaylalarında yetişir.', tags: ['%100 Güney (Sul)', 'Serin plato'], ids: ['pr', 'sc', 'rs'] },
          { id: 'br-caatinga', badge: 'Biyom · 2', title: 'Caatinga & Xiquexique kaktüsü', sub: 'Açık gri taşlı zemin, dikenli alçak çalı ve sütun kaktüsler. Kuzeydoğu’nun kuru iç bölgesi olan Sertão’yu gösterir.', tags: ['Nordeste içi', 'Soluk taşlı toprak'], ids: ['ba', 'se', 'pe', 'pb', 'rn', 'ce', 'pi'] },
          { id: 'br-terra-roxa', badge: 'Biyom · 3', title: 'Terra Roxa & kırmızı Cerrado yol omuzu', sub: 'Tuğla-kiremit kırmızısı ağır toprak. Güney-Orta tarım şeridi (PR kuzey/batı, SP batı, MS, GO, MT, TO).', tags: ['Tarım kuşağı', 'Parlak kırmızı yol'], ids: ['pr', 'sp', 'ms', 'go', 'mt', 'to'] }
        ],
        rules: [
          {
            title: 'Bölgeyi saniyede ayıran saha kuralları',
            body: 'Araucária gördüysen kuzey Brezilya’yı anında sil; Caatinga gördüysen Sul ve Amazon’u anında sil.',
            traps: [
              ['Kaktüs varsa', 'Güney veya Amazon değildir → Bahia, Pernambuco batı, Paraíba, RN, Ceará veya Piauí (Sertão).'],
              ['Çok koyu kırmızı toz + dümdüz soya', 'Batı Paraná, MS, Goiás veya Mato Grosso ovaları.'],
              ['Beyaz-kırmızı korkuluk + sarı-dikme taş', 'Brezilya karayolu (BR-xxx) işaretidir; arka planda palmiye/çimle kombinle.']
            ],
            ids: ['pr', 'ms', 'go', 'mt', 'ba', 'ce']
          }
        ]
      },
      {
        key: 'eyaletler',
        navLabel: 'UF & Bölgeler',
        icon: 'list',
        drillPreset: 'loc',
        mapMode: 'reg',
        labelMode: 'short',
        title: '2 harfli UF kodları, IBGE bölgeleri ve BR-XXX otoyolları',
        lead: 'Nereye bakılır: Kamyon kapılarındaki adreslerde, dükkan tabelalarının sağ köşesinde ve şehir giriş/çıkış yön levhalarında eyalet uzun adı yerine 2 harfli UF kısaltması yazar (“Campinas - SP”, “Palmas - TO”).',
        desc: '5 IBGE bölgesi, karıştırılan UF kodları (MS/MT, RO/RR, SE/SC) ve BR otoyol numaraları.',
        bands: [
          { cls: 'q0', key: 'SE', title: 'Sudeste (Güneydoğu) · 4 eyalet', sub: 'SP, RJ, ES, MG — ülkenin en kalabalık, çift-T direkli kalbi.', ids: ['sp', 'rj', 'es', 'mg'] },
          { cls: 'q2', key: 'SUL', title: 'Sul (Güney) · 3 eyalet', sub: 'PR, SC, RS — Araucária, ılıman çayır ve 4x/5x kodlar.', ids: ['pr', 'sc', 'rs'] },
          { cls: 'q7', key: 'CO', title: 'Centro-Oeste · 3 eyalet + DF', sub: 'MT, MS, GO, DF — düz Cerrado ve dev tarım koridoru.', ids: ['mt', 'ms', 'go', 'df'] },
          { cls: 'q5', key: 'NE', title: 'Nordeste · 9 eyalet', sub: 'BA, SE, AL, PE, PB, RN, CE, PI, MA — Sertão + tropikal sahil.', ids: ['ba', 'se', 'al', 'pe', 'pb', 'rn', 'ce', 'pi', 'ma'] },
          { cls: 'q4', key: 'N', title: 'Norte · 7 eyalet', sub: 'PA, AP, AM, RR, RO, AC, TO — Amazon yağmur ormanı & nehirler.', ids: ['pa', 'ap', 'am', 'rr', 'ro', 'ac', 'to'] }
        ],
        rules: [
          {
            title: 'Karıştırılan 5 UF kısaltma çifti',
            body: 'Haritada tıklamadan önce aşağıdaki beş çifti mutlaka kontrol et:',
            traps: [
              ['RO vs RR', 'RO = Rondônia (güneybatı, 69) · RR = Roraima (en kuzey, 95).'],
              ['MS vs MT', 'MT = Mato Grosso (kuzey, 65/66) · MS = Mato Grosso do Sul (güney, 67).'],
              ['SE vs SC vs SP', 'SE = Sergipe (kuzeydoğu, 79) · SC = Santa Catarina (güney, 47–49).'],
              ['PA vs PR vs PB vs PE vs PI', 'PA = Pará (Norte), PR = Paraná (Sul), PB/PE/PI = Nordeste.'],
              ['BR-1xx vs BR-2xx yolları', 'BR-1xx KUZEY-GÜNEY (101 doğu kıyı, 116 iç doğu, 163 Cuiabá–Santarém); BR-2xx DOĞU-BATI (230 Transamazônica, 277 PR).']
            ],
            ids: ['ro', 'rr', 'ms', 'mt', 'se', 'sc', 'pa', 'pr']
          }
        ]
      }
    ],
    presets: [
      { id: 'mix', label: 'Karışık', q: ['loc', 'visual', 'code', 'codeToUnit', 'clueToUnit'] },
      { id: 'loc', label: 'Eyalet yeri', q: ['loc'] },
      { id: 'code', label: 'DDD & CEP', q: ['code', 'codeToUnit'] },
      { id: 'visual', label: 'Direk & Biyom', q: ['visual', 'clueToUnit'] }
    ],
    simTypes: [
      { v: 'ddd', label: 'Tabelada DDD' },
      { v: 'cep', label: 'CEP + adres' },
      { v: 'visual', label: 'Saha fotoğrafı' },
      { v: 'clue', label: 'Coğrafya tarifi' }
    ],
    makeSimClue: makeSimClue
  });
})(typeof window !== 'undefined' ? window : globalThis);

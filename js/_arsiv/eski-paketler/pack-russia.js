/* pack-russia.js — Rusya çalışma paketi (83 federal birim, +7 / 8 telefon, 1–6 Индекс, saha direkleri ve çift alfabe) */
(function (g) {
  'use strict';

  var REGIONS = [
    { id: 'cfo', tr: 'Merkez (Moskova çevresi)', cue: 'Индекс 10–17, 21/24, 30/39 · +7 47x–49x · Yoğun huş ormanı & Pasynok payandalı ahşap direk', color: 0 },
    { id: 'nwfo', tr: 'Kuzeybatı (SPb & Kuzey)', cue: 'Индекс 16–19, 23 Kaliningrad · +7 81x–82x · Kızıl çam taygası, göller, Kaliningrad ağaç tünelleri', color: 4 },
    { id: 'sfo', tr: 'Güney & Kuzey Kafkasya', cue: 'Индекс 34–38 · +7 86x–87x · Açık tarım bozkırı, kavak dizileri, Kafkas etekleri', color: 5 },
    { id: 'pfo', tr: 'İdil–Volga Havzası', cue: 'Индекс 42–46 (Kirov/Nizhny 60–61) · +7 83x–84x · Tatar/Başkurt/Çuvaş çift dilli tabelalar', color: 2 },
    { id: 'ufo', tr: 'Ural Bölgesi', cue: 'Индекс 45/62/64 · +7 34x–35x · Sanayi kentleri, bataklık-orman petrol kuşağı', color: 3 },
    { id: 'sib', tr: 'Sibirya', cue: 'Индекс 63–66 · +7 38x–39x · Düz huş bozkırı, ince turuncu kar çubukları & dağ cumhuriyetleri', color: 7 },
    { id: 'dfo', tr: 'Uzak Doğu', cue: 'Индекс 67–69 · +7 41x–42x · Sağdan direksiyonlu Japon araçları, Yakutya & Pasifik', color: 6 }
  ];

  var UNITS = [
    { id: 'ru-mow', name: 'Moskova Şehri', short: 'Moskova', local: 'Москва', cap: 'Moskova', reg: 'cfo', codes: ['495', '499'], postal: '101–139', codeCls: 0, traitId: 'ru-crosswalk', traitTitle: '+7 495/499 & Metropol Tabelaları', traitCls: 0, cue: 'Dükkan/emlak levhalarında +7 (495) veya (499), bina plakalarında Индекс 101–139! Koyu yeşil/mavi sokak tabelaları, sarı neon yaya geçidi ve MKAD çevre otoyolları.', trap: '496 ve 498 şehir merkezini değil dış halkadaki Moskova Oblastı’nı (ru-mos) verir.' },
    { id: 'ru-mos', name: 'Moskova Oblastı', short: 'Moskova Obl.', local: 'Московская обл.', cap: 'Moskova / Krasnogorsk', reg: 'cfo', codes: ['496', '498'], postal: '140–144', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 496/498 & Çevre Huş Kuşağı', traitCls: 0, cue: '496/498 sabit hattı ve 140–144 posta kodu! Yüksek toplu konut siteleri, huş ormanları arası M-1..M-11 otoyolları ve sarı çerçeveli yaya geçitleri.', trap: 'Haritada ortadaki küçük daire Moskova Şehri (ru-mow), etrafını saran halka Moskova Oblastı’dır!' },
    { id: 'ru-bel', name: 'Belgorod', short: 'Belgorod', local: 'Белгородская обл.', cap: 'Belgorod', reg: 'cfo', codes: ['472'], postal: '308–309', codeCls: 2, traitId: 'ru-birch', traitTitle: 'Kara Toprak Ovası (308–309)', traitCls: 2, cue: '+7 472, posta 308–309. Siyah çernozem topraklı dalgalı açık tarlalar, beyaz kireçtaşı tepecikler ve temiz köy evleri.' },
    { id: 'ru-bry', name: 'Bryansk', short: 'Bryansk', local: 'Брянская обл.', cap: 'Bryansk', reg: 'cfo', codes: ['483'], postal: '241–243', codeCls: 1, traitId: 'ru-pasynok', traitTitle: 'Batı Ormanı & Pasynok (241–243)', traitCls: 1, cue: '+7 483, posta 241–243. Sık karışık ormanlar, kısa beton ayağa kelepçeli ahşap Pasynok direkler ve 24x posta kodu.' },
    { id: 'ru-vla', name: 'Vladimir', short: 'Vladimir', local: 'Владимирская обл.', cap: 'Vladimir', reg: 'cfo', codes: ['492'], postal: '600–602', codeCls: 6, traitId: 'ru-birch', traitTitle: 'İstisna Posta 600–602! · +7 492', traitCls: 0, cue: '+7 492 ve BÜYÜK İSTİSNA: Moskova doğusunda olmasına rağmen posta kodu 600–602 ile başlar! Altın Halka çam-huş ormanları.', trap: '600–602 görüp Ural/Sibirya sanma: 600–607 batıdaki Vladimir & Nizhny Novgorod istisnasıdır!' },
    { id: 'ru-vor', name: 'Voronezh', short: 'Voronezh', local: 'Воронежская обл.', cap: 'Voronezh', reg: 'cfo', codes: ['473'], postal: '394–397', codeCls: 2, traitId: 'ru-birch', traitTitle: 'Don Çernozem Bozkırı (394–397)', traitCls: 2, cue: '+7 473, posta 394–397. Geniş güney Kara Toprak tarlaları, Don Nehri tepeleri ve M-4 otoyolu.' },
    { id: 'ru-iva', name: 'Ivanovo', short: 'Ivanovo', local: 'Ивановская обл.', cap: 'Ivanovo', reg: 'cfo', codes: ['493'], postal: '153–155', codeCls: 0, traitId: 'ru-pasynok', traitTitle: 'Altın Halka & Pasynok (153–155)', traitCls: 1, cue: '+7 493, posta 153–155. Huş ormanları arası klasik boyalı ahşap izba evleri ve Pasynok direkler.' },
    { id: 'ru-klu', name: 'Kaluga', short: 'Kaluga', local: 'Калужская обл.', cap: 'Kaluga', reg: 'cfo', codes: ['484'], postal: '248–249', codeCls: 1, traitId: 'ru-birch', traitTitle: '+7 484 & Batı Koridoru (248–249)', traitCls: 0, cue: '+7 484, posta 248–249. Moskova’nın güneybatısında yoğun karışık ormanlar ve M-3 otoyolu.' },
    { id: 'ru-kos', name: 'Kostroma', short: 'Kostroma', local: 'Костромская обл.', cap: 'Kostroma', reg: 'cfo', codes: ['494'], postal: '156–157', codeCls: 0, traitId: 'ru-pasynok', traitTitle: 'Yukarı Volga Taygası (156–157)', traitCls: 1, cue: '+7 494, posta 156–157. Sık koyu ladin/huş ormanları, Pasynok beton payandalı direkler ve ahşap kırsal yapılar.' },
    { id: 'ru-krs', name: 'Kursk', short: 'Kursk', local: 'Курская обл.', cap: 'Kursk', reg: 'cfo', codes: ['471'], postal: '305–307', codeCls: 2, traitId: 'ru-birch', traitTitle: 'Kara Toprak Ovaları (305–307)', traitCls: 2, cue: '+7 471, posta 305–307. Zengin koyu siyah toprak tarlaları ve seyrek kavak rüzgâr şeritleri.' },
    { id: 'ru-lip', name: 'Lipetsk', short: 'Lipetsk', local: 'Липецкая обл.', cap: 'Lipetsk', reg: 'cfo', codes: ['474'], postal: '398–399', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 474 & Çernozem (398–399)', traitCls: 2, cue: '+7 474, posta 398–399. M-4 otoyol kuşağında düz tarım ovaları.' },
    { id: 'ru-orl', name: 'Oryol (Orel)', short: 'Oryol', local: 'Орловская обл.', cap: 'Oryol', reg: 'cfo', codes: ['486'], postal: '302–303', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 486 · Posta 302–303', traitCls: 2, cue: '+7 486, posta 302–303. Çernozem kuzey ucu, hafif tepelik kır yolları.' },
    { id: 'ru-rya', name: 'Ryazan', short: 'Ryazan', local: 'Рязанская обл.', cap: 'Ryazan', reg: 'cfo', codes: ['491'], postal: '390–391', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 491 · Oka Nehri & 390–391', traitCls: 2, cue: '+7 491, posta 390–391. Oka taşkın çayırları, geniş M-5 yolu ve açık tarım.' },
    { id: 'ru-smo', name: 'Smolensk', short: 'Smolensk', local: 'Смоленская обл.', cap: 'Smolensk', reg: 'cfo', codes: ['481'], postal: '214–216', codeCls: 1, traitId: 'ru-birch', traitTitle: '+7 481 & M-1 Batı Yolu (214–216)', traitCls: 1, cue: '+7 481, posta 214–216. 21x posta öneği ile Belarus yönündeki M-1 batı otoyol kapısı.' },
    { id: 'ru-tam', name: 'Tambov', short: 'Tambov', local: 'Тамбовская обл.', cap: 'Tambov', reg: 'cfo', codes: ['475'], postal: '392–393', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 475 · Kara Toprak (392–393)', traitCls: 2, cue: '+7 475, posta 392–393. Dümdüz siyah topraklı ayçiçeği ve tahıl ovaları.' },
    { id: 'ru-tve', name: 'Tver', short: 'Tver', local: 'Тверская обл.', cap: 'Tver', reg: 'cfo', codes: ['482'], postal: '170–172', codeCls: 0, traitId: 'ru-pasynok', traitTitle: '+7 482 · Moskova–SPb Koridoru', traitCls: 1, cue: '+7 482, posta 170–172. Moskova–SPb yolu boyunca çam ormanı, ahşap evler ve beton ayağa bağlı Pasynok direkler.' },
    { id: 'ru-tul', name: 'Tula', short: 'Tula', local: 'Тульская обл.', cap: 'Tula', reg: 'cfo', codes: ['487'], postal: '300–301', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 487 · 300–301 Başlangıcı', traitCls: 2, cue: '+7 487, posta 300–301. Moskova hemen güneyindeki engebeli huş-çayır geçişi.' },
    { id: 'ru-yar', name: 'Yaroslavl', short: 'Yaroslavl', local: 'Ярославская обл.', cap: 'Yaroslavl', reg: 'cfo', codes: ['485'], postal: '150–152', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 485 · Yukarı Volga (150–152)', traitCls: 0, cue: '+7 485, posta 150–152. Altın Halka kilise kubbeleri, Volga nehri ve 150–152 posta kodu.' },

    { id: 'ru-spe', name: 'St. Petersburg', short: 'SPb', local: 'Санкт-Петербург', cap: 'St. Petersburg', reg: 'nwfo', codes: ['812'], postal: '190–199', codeCls: 0, traitId: 'ru-pole-bw', traitTitle: '+7 812 & İmparatorluk Mimarisi (19x)', traitCls: 0, cue: '+7 (812) / 8 (812) ve posta 190–199! Pastel sarı/yeşil klasik cepheler, köprülü kanallar ve alt kısmı siyah boyalı beyaz halkalı (“siyah çorap”) şehir direkleri.', trap: 'Yalnızca şehir içi 812’dir; banliyö ve kırsal 813 Leningrad Oblastı’na geçer.' },
    { id: 'ru-len', name: 'Leningrad Oblastı', short: 'Leningrad Obl.', local: 'Ленинградская обл.', cap: 'Gatchina / SPb', reg: 'nwfo', codes: ['813'], postal: '187–188', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 813 · Ladoga Çam Ormanı (187–188)', traitCls: 0, cue: '+7 813, posta 187–188. Kızıl çam ormanları, granit kayalık toprak ve SPb çevre otoyolları.' },
    { id: 'ru-ark', name: 'Arkhangelsk', short: 'Arkhangelsk', local: 'Архангельская обл.', cap: 'Arkhangelsk', reg: 'nwfo', codes: ['818'], postal: '163–165', codeCls: 0, traitId: 'ru-pasynok', traitTitle: '+7 818 · Kuzey Tayga & Ahşap Evler', traitCls: 1, cue: '+7 818, posta 163–165. Eski kuzey ahşap binalar, geniş Dvina nehri ve yüksek enlem gökyüzü.' },
    { id: 'ru-vlg', name: 'Vologda', short: 'Vologda', local: 'Вологодская обл.', cap: 'Vologda', reg: 'nwfo', codes: ['817', '820'], postal: '160–162', codeCls: 0, traitId: 'ru-pasynok', traitTitle: '+7 817/820 · Kuzey Orman & İzbeler', traitCls: 1, cue: '+7 817 (Vologda), 820 (Cherepovets); posta 160–162. Yoğun tayga ve Pasynok direkli ahşap köyler.' },
    { id: 'ru-kgd', name: 'Kaliningrad', short: 'Kaliningrad', local: 'Калининградская обл.', cap: 'Kaliningrad', reg: 'nwfo', codes: ['401'], postal: '236–238', codeCls: 1, traitId: 'ru-pole-bw', traitTitle: '+7 401 · Eksklav · Ağaç Tünelli Alman Yolları!', traitCls: 8, cue: '+7 401, posta 236–238! Polonya–Litvanya arasındaki Rus eksklavı: otoyollar iki yanında sık ağaç şeridiyle sarılı (Allee), eski Doğu Prusya kırmızı tuğla/kiremit evler ve siyah tabanlı direkler!', trap: 'Kiril Rusya tabelası + Alman tuğla çiftlikleri ve sık ağaç tüneli = %100 Kaliningrad!' },
    { id: 'ru-kr', name: 'Karelya Cum.', short: 'Karelya', local: 'Респ. Карелия', cap: 'Petrozavodsk', reg: 'nwfo', codes: ['814'], postal: '185–186', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 814 · Fin Tarzı Kaya & Göller', traitCls: 0, cue: '+7 814, posta 185–186. Finlandiya sınırı boyunca granit kayalıklar, göller ve Kızıl Çam ormanı; yer yer Karelce/Fince yer adları.' },
    { id: 'ru-ko', name: 'Komi Cum.', short: 'Komi', local: 'Респ. Коми', cap: 'Syktyvkar', reg: 'nwfo', codes: ['821'], postal: '167–169', codeCls: 0, traitId: 'ru-pasynok', traitTitle: '+7 821 · Derin Kuzey Tayga & Ö/І', traitCls: 1, cue: '+7 821, posta 167–169. Çok geniş kuzey taygası, yer yer beton levha yollar ve Ӧ, І harfli çift dilli Komice tabelalar.' },
    { id: 'ru-mur', name: 'Murmansk', short: 'Murmansk', local: 'Мурманская обл.', cap: 'Murmansk', reg: 'nwfo', codes: ['815'], postal: '183–184', codeCls: 0, traitId: 'ru-snow-stick', traitTitle: '+7 815 · Arktik Tundra & Kaya Tepeleri', traitCls: 8, cue: '+7 815, posta 183–184. Kola Yarımadası: alçak bodur huş/tundra, çıplak kayalık tepecikler, düşük Arktik güneş açısı ve kar çubukları.' },
    { id: 'ru-nen', name: 'Nenets ÖB', short: 'Nenets', local: 'Ненецкий АО', cap: 'Naryan-Mar', reg: 'nwfo', codes: ['818'], postal: '166', codeCls: 0, traitId: 'ru-snow-stick', traitTitle: 'Arktik Naryan-Mar (166)', traitCls: 8, cue: 'Posta 166, +7 81853. Arktik Naryan-Mar çevresi ve turuncu tepeli kar çubuklarıyla işaretli kış yolları kapsanır.' },
    { id: 'ru-ngr', name: 'Novgorod', short: 'Novgorod', local: 'Новгородская обл.', cap: 'Veliky Novgorod', reg: 'nwfo', codes: ['816'], postal: '173–175', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 816 · İlmen Havzası (173–175)', traitCls: 0, cue: '+7 816, posta 173–175. Düz huş-kavak bataklık ormanı.' },
    { id: 'ru-psk', name: 'Pskov', short: 'Pskov', local: 'Псковская обл.', cap: 'Pskov', reg: 'nwfo', codes: ['811'], postal: '180–182', codeCls: 0, traitId: 'ru-birch', traitTitle: '+7 811 · Baltık Sınırı (180–182)', traitCls: 0, cue: '+7 811, posta 180–182. Estonya/Letonya sınırı boyunca yumuşak tepeli çam-huş arazisi.' },

    { id: 'ru-ad', name: 'Adıge Cum.', short: 'Adıge', local: 'Респ. Адыгея', cap: 'Maykop', reg: 'sfo', codes: ['877'], postal: '385', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 877 · Krasnodar İçinde Enklav (385)', traitCls: 5, cue: '+7 877, posta 385! Krasnodar Krayı ortasına gömülü küçük cumhuriyet: kuzeyde düz tarım, güneyde Kafkas dağ etekleri.', trap: 'Haritada doğrudan Krasnodar’ın (ru-kda) ortasında küçük bir ada (enklav) olarak yer alır!' },
    { id: 'ru-ast', name: 'Astrahan', short: 'Astrahan', local: 'Астраханская обл.', cap: 'Astrahan', reg: 'sfo', codes: ['851'], postal: '414–416', codeCls: 3, traitId: 'ru-pole-bw', traitTitle: '+7 851 · Volga Deltası Yarı Çöl (414–416)', traitCls: 5, cue: '+7 851, posta 414–416. Çok düz yarı çöl bozkırı, sarı kumlu yol omuzları, kamış kanalları ve deve silüetleri!' },
    { id: 'ru-vgg', name: 'Volgograd', short: 'Volgograd', local: 'Волгоградская обл.', cap: 'Volgograd', reg: 'sfo', codes: ['844'], postal: '400–404', codeCls: 3, traitId: 'ru-pole-bw', traitTitle: '+7 844 · Aşağı Volga Bozkırı (400–404)', traitCls: 5, cue: '+7 844, posta 400–404. Sıcak kurak bozkır, kavak dizileri ve siyah tabanlı direkler.' },
    { id: 'ru-kl', name: 'Kalmıkya Cum.', short: 'Kalmıkya', local: 'Респ. Калмыкия', cap: 'Elista', reg: 'sfo', codes: ['847'], postal: '358–359', codeCls: 2, traitId: 'ru-pole-bw', traitTitle: '+7 847 · Budist Pagoda & Yarı Çöl (358–359)', traitCls: 5, cue: '+7 847, posta 358–359. Dümdüz ağaçsız kuru step, develer ve Elista merkezinde altın Budist tapınak/pagodaları!' },
    { id: 'ru-kda', name: 'Krasnodar Krayı', short: 'Krasnodar', local: 'Краснодарский край', cap: 'Krasnodar', reg: 'sfo', codes: ['861', '862'], postal: '350–354', codeCls: 2, traitId: 'ru-crosswalk', traitTitle: '+7 861/862 (Soçi) · Kavak & Karadeniz', traitCls: 5, cue: '+7 861 (Krasnodar), +7 862 (Soçi); posta 350–354. Kuban düzlüğünde upuzun dik kavak şeritleri; Karadeniz/Soçi kıyısında palmiye ve dik yeşil dağlar!' },
    { id: 'ru-ros', name: 'Rostov', short: 'Rostov', local: 'Ростовская обл.', cap: 'Rostov-na-Donu', reg: 'sfo', codes: ['863'], postal: '344–347', codeCls: 2, traitId: 'ru-crosswalk', traitTitle: '+7 863 · Aşağı Don Bozkırı (344–347)', traitCls: 5, cue: '+7 863, posta 344–347. Sıcak düz bozkır tarım ovaları, kömür cüruf tepecikleri ve beyaz badanalı güney evleri.' },
    { id: 'ru-da', name: 'Dağıstan', short: 'Dağıstan', local: 'Респ. Дагестан', cap: 'Mahaçkale', reg: 'sfo', codes: ['872'], postal: '367–368', codeCls: 2, traitId: 'ru-pole-bw', traitTitle: '+7 872 · Doğu Kafkas & Hazar Kıyısı', traitCls: 5, cue: '+7 872, posta 367–368. Sarı-gri kayalık kurak Kafkas vadileri, yol kenarı sarı gaz boruları, camiler ve siyah tabanlı direkler.' },
    { id: 'ru-in', name: 'İnguşetya', short: 'İnguşetya', local: 'Респ. Ингушетия', cap: 'Magas', reg: 'sfo', codes: ['873'], postal: '386', codeCls: 2, traitId: 'ru-pole-bw', traitTitle: '+7 873 · Küçük Kuzey Kafkas (386)', traitCls: 5, cue: '+7 873, posta 386. Kuzey Osetya ile Çeçenya arasına sıkışmış dar Kafkas cumhuriyeti.' },
    { id: 'ru-kb', name: 'Kabardino-Balkarya', short: 'KBR', local: 'Кабардино-Балкария', cap: 'Nalçik', reg: 'sfo', codes: ['866'], postal: '360–361', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 866 · Elbruz Dağı Eteği (360–361)', traitCls: 5, cue: '+7 866, posta 360–361. Güney ufukta karlı Elbruz/Kafkas duvarı ve yeşil tarım vadileri.' },
    { id: 'ru-kc', name: 'Karaçay-Çerkesya', short: 'KÇR', local: 'Карачаево-Черкесия', cap: 'Çerkessk', reg: 'sfo', codes: ['878'], postal: '369', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 878 · Batı Kafkas (369)', traitCls: 5, cue: '+7 878, posta 369. Krasnodar ve Stavropol sınırında yeşil yüksek dağ otlakları.' },
    { id: 'ru-se', name: 'Kuzey Osetya-Alanya', short: 'K. Osetya', local: 'Северная Осетия', cap: 'Vladikavkaz', reg: 'sfo', codes: ['867'], postal: '362–363', codeCls: 2, traitId: 'ru-pole-bw', traitTitle: '+7 867 · Daryal Geçidi Kapısı', traitCls: 5, cue: '+7 867, posta 362–363. Güneyde Gürcistan sınır duvarına yaslanan Vladikavkaz ovası ve siyah tabanlı şehir direkleri.' },
    { id: 'ru-sta', name: 'Stavropol Krayı', short: 'Stavropol', local: 'Ставропольский край', cap: 'Stavropol', reg: 'sfo', codes: ['865', '879'], postal: '355–357', codeCls: 2, traitId: 'ru-birch', traitTitle: '+7 865/879 · Kafkas Kaplıcaları', traitCls: 5, cue: '+7 865 (Stavropol), 879 (Pyatigorsk/Mineralnye Vody); posta 355–357. Açık tepe tarlaları ve ufukta tekil volkanik tepe konileri (Beştau).' },
    { id: 'ru-ce', name: 'Çeçenya', short: 'Çeçenya', local: 'Чеченская Респ.', cap: 'Grozni', reg: 'sfo', codes: ['871'], postal: '364–366', codeCls: 2, traitId: 'ru-pole-bw', traitTitle: '+7 871 · Grozni & Dağ Geçitleri', traitCls: 5, cue: '+7 871, posta 364–366. Modern Grozni bulvarları, camiler ve siyah tabanlı direkler.' },

    { id: 'ru-ba', name: 'Başkurdistan', short: 'Başkurdistan', local: 'Башкортостан', cap: 'Ufa', reg: 'pfo', codes: ['347'], postal: '450–453', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 347 · Çift Dil: Başkurt (Ғ Ҙ Ҡ Ҫ)', traitCls: 7, cue: '+7 347, posta 450–453! Mağaza ve sokak levhalarında Rusça yanında Ғ Ҙ Ҡ Ҫ Ө Ү Һ harfli Başkurtça (“Урам / Өфө”) ve güney Ural huş tepeleri bulunur!', trap: 'Tatarstan gibi çift dilli ama Ҙ ve Ҡ harfleri (+ posta 450–453) Başkurdistan’a özeldir!' },
    { id: 'ru-kir', name: 'Kirov', short: 'Kirov', local: 'Кировская обл.', cap: 'Kirov', reg: 'pfo', codes: ['833'], postal: '610–613', codeCls: 6, traitId: 'ru-pasynok', traitTitle: '+7 833 · Posta 610–613 · Tayga', traitCls: 1, cue: '+7 833, posta 610–613. Sık çam-huş ormanları, Pasynok direkler ve ahşap kuzey köyleri.' },
    { id: 'ru-me', name: 'Mari El', short: 'Mari El', local: 'Респ. Марий Эл', cap: 'Yoşkar-Ola', reg: 'pfo', codes: ['836'], postal: '424–425', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 836 · Yoşkar-Ola & 424–425', traitCls: 7, cue: '+7 836, posta 424–425. Volga kuzey yakası düz ormanları ve Marice Ҥ, Ӧ, Ӱ ekli tabelalar.' },
    { id: 'ru-mo', name: 'Mordovya', short: 'Mordovya', local: 'Респ. Мордовия', cap: 'Saransk', reg: 'pfo', codes: ['834'], postal: '430–431', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 834 · Saransk (430–431)', traitCls: 7, cue: '+7 834, posta 430–431. Hafif dalgalı açık tarım ve yapraklı orman.' },
    { id: 'ru-niz', name: 'Nizhny Novgorod', short: 'Nizhny Nov.', local: 'Нижегородская обл.', cap: 'Nizhny Novgorod', reg: 'pfo', codes: ['831'], postal: '603–607', codeCls: 6, traitId: 'ru-crosswalk', traitTitle: '+7 831 · İstisna Posta 603–607!', traitCls: 0, cue: '+7 831 ve posta 603–607 (Vladimir 600–602 hemen batısında!). Volga ve Oka nehirlerinin büyük birleşim kenti.', trap: 'Posta kodu 60x ile başlasa da Sibirya değildir! 600–607 Avrupa Rusya’sındaki Vladimir & Nizhny istisnasıdır.' },
    { id: 'ru-ore', name: 'Orenburg', short: 'Orenburg', local: 'Оренбургская обл.', cap: 'Orenburg', reg: 'pfo', codes: ['353'], postal: '460–462', codeCls: 3, traitId: 'ru-pole-bw', traitTitle: '+7 353 · Kazakistan Bozkır Sınırı (46x)', traitCls: 5, cue: '+7 353, posta 460–462! Sıcak ağaçsız Ural–Kazakistan bozkırı, petrol pompaları ve düz ufuk.' },
    { id: 'ru-pnz', name: 'Penza', short: 'Penza', local: 'Пензенская обл.', cap: 'Penza', reg: 'pfo', codes: ['841'], postal: '440–442', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 841 · Orta Tarım Tepeleri (440–442)', traitCls: 2, cue: '+7 841, posta 440–442. Açık sarı-kahve tarlalar ve M-5 otoyolu.' },
    { id: 'ru-per', name: 'Perm Krayı', short: 'Perm', local: 'Пермский край', cap: 'Perm', reg: 'pfo', codes: ['342'], postal: '614–619', codeCls: 6, traitId: 'ru-pasynok', traitTitle: '+7 342 · Batı Ural & Posta 614–619', traitCls: 1, cue: '+7 342, posta 614–619. Kama Nehri çevresi yoğun koyu Ural taygası ve Pasynok direkler.' },
    { id: 'ru-sam', name: 'Samara', short: 'Samara', local: 'Самарская обл.', cap: 'Samara', reg: 'pfo', codes: ['846', '848'], postal: '443–446', codeCls: 3, traitId: 'ru-crosswalk', traitTitle: '+7 846/848 (Tolyatti) · 443–446', traitCls: 2, cue: '+7 846 Samara, 848 Tolyatti; posta 443–446. Geniş Volga dirseği ve sanayi kentleri.' },
    { id: 'ru-sar', name: 'Saratov', short: 'Saratov', local: 'Саратовская обл.', cap: 'Saratov', reg: 'pfo', codes: ['845'], postal: '410–413', codeCls: 3, traitId: 'ru-pole-bw', traitTitle: '+7 845 · Volga Step Geçişi (410–413)', traitCls: 5, cue: '+7 845, posta 410–413. Doğuya Kazakistan sınırına uzanan kurak bozkır.' },
    { id: 'ru-ta', name: 'Tatarstan Cum.', short: 'Tatarstan', local: 'Респ. Татарстан', cap: 'Kazan', reg: 'pfo', codes: ['843', '855'], postal: '420–423', codeCls: 3, traitId: 'ru-pole-bw', traitTitle: '+7 843/855 · Çift Dil: Tatarca (Ә Ө Ү Җ Ң Һ)!', traitCls: 7, cue: '+7 843 (Kazan), 855 (Nab. Chelny); posta 420–423. Sokak, okul ve benzinlik levhaları iki satırdır: “Казан / Казань · урам / ул.” ve Tatar harfleri Ә, Ө, Ү, Җ, Ң, Һ!', trap: '843/855 + Җ harfi + yeşil-beyaz sokak bordürü = %100 Tatarstan!' },
    { id: 'ru-ud', name: 'Udmurtia Cum.', short: 'Udmurtia', local: 'Удмуртия', cap: 'İjevsk', reg: 'pfo', codes: ['341'], postal: '426–427', codeCls: 3, traitId: 'ru-pasynok', traitTitle: '+7 341 · İjevsk & 426–427', traitCls: 1, cue: '+7 341, posta 426–427. Kama–Vyatka tepelik ormanları ve yer yer Udmurtça tabelalar.' },
    { id: 'ru-uly', name: 'Ulyanovsk', short: 'Ulyanovsk', local: 'Ульяновская обл.', cap: 'Ulyanovsk', reg: 'pfo', codes: ['842'], postal: '432–433', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 842 · Orta Volga (432–433)', traitCls: 2, cue: '+7 842, posta 432–433. Geniş Volga sırtları ve tarım.' },
    { id: 'ru-cu', name: 'Çuvaşistan Cum.', short: 'Çuvaşistan', local: 'Чувашия', cap: 'Çeboksarı', reg: 'pfo', codes: ['835'], postal: '428–429', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 835 · Çuvaş Harfleri (Ӑ Ӗ Ҫ Ӳ)!', traitCls: 7, cue: '+7 835, posta 428–429. Mağaza ve kurum tabelalarında üstü yaylı Kiril harfleri (Ӑ, Ӗ, Ӳ) ile Ҫ yalnızca Çuvaşistan’a özgüdür!' },

    { id: 'ru-kgn', name: 'Kurgan', short: 'Kurgan', local: 'Курганская обл.', cap: 'Kurgan', reg: 'ufo', codes: ['352'], postal: '640–641', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 352 · Huş Gölet Bozkırı (640–641)', traitCls: 0, cue: '+7 352, posta 640–641. Dümdüz bozkır ortasında beyaz gövdeli huş ağaç adacıkları.' },
    { id: 'ru-sve', name: 'Sverdlovsk', short: 'Sverdlovsk', local: 'Свердловская обл.', cap: 'Yekaterinburg', reg: 'ufo', codes: ['343'], postal: '620–624', codeCls: 6, traitId: 'ru-birch', traitTitle: '+7 343 · Yekaterinburg & Ural (620–624)', traitCls: 0, cue: '+7 343, posta 620–624. Orta Ural’ın çam-huş ormanlı alçak tepeleri ve büyük sanayi kentleri.' },
    { id: 'ru-tyu', name: 'Tyumen Oblastı', short: 'Tyumen', local: 'Тюменская обл.', cap: 'Tyumen', reg: 'ufo', codes: ['345'], postal: '625–627', codeCls: 6, traitId: 'ru-birch', traitTitle: '+7 345 · Batı Sibirya Kapısı (625–627)', traitCls: 0, cue: '+7 345, posta 625–627. Çok düz huş korulu bataklık-ova geçişi.' },
    { id: 'ru-khm', name: 'Hantı-Mansi ÖB (Yugra)', short: 'Hantı-Mansi', local: 'Ханты-Мансийский АО', cap: 'Hantı-Mansiysk', reg: 'ufo', codes: ['346'], postal: '628', codeCls: 6, traitId: 'ru-snow-stick', traitTitle: '+7 346 · Petrol Taygası & Kar Çubukları', traitCls: 8, cue: '+7 346, posta 628. Ob Nehri çevresi dümdüz bataklık taygası, petrol boruları, renkli yeni bloklar (Surgut/Nijnevartovsk) ve kış yolu kar çubukları.' },
    { id: 'ru-che', name: 'Çelyabinsk', short: 'Çelyabinsk', local: 'Челябинская обл.', cap: 'Çelyabinsk', reg: 'ufo', codes: ['351'], postal: '454–457', codeCls: 3, traitId: 'ru-birch', traitTitle: '+7 351 · Güney Ural Gölleri (454–457)', traitCls: 0, cue: '+7 351, posta 454–457. Batıda yeşil Ural dağ ormanı, doğuda Kazakistan bozkır sınırı.' },
    { id: 'ru-yan', name: 'Yamalo-Nenets ÖB', short: 'Yamal', local: 'Ямало-Ненецкий АО', cap: 'Salehard', reg: 'ufo', codes: ['349'], postal: '629', codeCls: 6, traitId: 'ru-snow-stick', traitTitle: '+7 349 · Arktik Kar Çubukları & 629xxx', traitCls: 8, cue: '+7 349, posta 629. Novıy Urengoy ve Salehard’da renkli Arktik apartman blokları, donmuş tundra ve yol kenarı turuncu-beyaz kar çubukları.' },

    { id: 'ru-al', name: 'Altay Cumhuriyeti', short: 'Altay Cum.', local: 'Респ. Алтай', cap: 'Gorno-Altaysk', reg: 'sib', codes: ['388'], postal: '649', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 388 · Çuy Yolu & Altay Dağları', traitCls: 5, cue: '+7 388, posta 649. Dramatik dağ vadileri, Katun turkuaz nehri, karaçamlar ve çift dilli Altayça tabelalar!', trap: 'Düz bozkırlı Altay Krayı (Barnaul, +7 385) ile güneydeki dağlık Altay Cumhuriyeti (+7 388) farklı birimlerdir!' },
    { id: 'ru-alt', name: 'Altay Krayı', short: 'Altay Krayı', local: 'Алтайский край', cap: 'Barnaul', reg: 'sib', codes: ['385'], postal: '656–659', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 385 · Geniş Kulunda Bozkırı (656–659)', traitCls: 2, cue: '+7 385, posta 656–659. Çok düz tahıl/ayçiçeği bozkırı, ince rüzgâr ağaç şeritleri ve Barnaul.' },
    { id: 'ru-irk', name: 'İrkutsk', short: 'İrkutsk', local: 'Иркутская обл.', cap: 'İrkutsk', reg: 'sib', codes: ['395'], postal: '664–669', codeCls: 7, traitId: 'ru-pasynok', traitTitle: '+7 395 · Baykal Batısı & Ahşap İzbeler', traitCls: 1, cue: '+7 395, posta 664–669. Sibirya oymalı pencereli koyu ahşap evler, Pasynok direkler, Baykal batısı ve kırmızı toprak.' },
    { id: 'ru-kem', name: 'Kemerovo (Kuzbass)', short: 'Kemerovo', local: 'Кемеровская обл.', cap: 'Kemerovo', reg: 'sib', codes: ['384'], postal: '650–654', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 384 · Kuzbass Kömür & 650–654', traitCls: 0, cue: '+7 384, posta 650–654. Kömür havzası (Novokuznetsk/Kemerovo) ve tepelik huş-köknar geçişi.' },
    { id: 'ru-kya', name: 'Krasnoyarsk Krayı', short: 'Krasnoyarsk', local: 'Красноярский край', cap: 'Krasnoyarsk', reg: 'sib', codes: ['391'], postal: '660–663', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 391 · Yenisey & Norilsk Kuzeyi (660–663)', traitCls: 0, cue: '+7 391, posta 660–663 (Norilsk kuzeyi 647/648/663). Yenisey kıyısı tepeleri ve orta tayga.' },
    { id: 'ru-nvs', name: 'Novosibirsk', short: 'Novosibirsk', local: 'Новосибирская обл.', cap: 'Novosibirsk', reg: 'sib', codes: ['383'], postal: '630–633', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 383 · Sibirya Merkezi & Huş Bozkırı (630–633)', traitCls: 0, cue: '+7 383, posta 630–633. Ob kıyısındaki Sibirya’nın en büyük kenti ve batıda klasik düz huş ormanlı ova.' },
    { id: 'ru-oms', name: 'Omsk', short: 'Omsk', local: 'Омская обл.', cap: 'Omsk', reg: 'sib', codes: ['381'], postal: '644–646', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 381 · Dümdüz Huş Bozkırı (644–646)', traitCls: 0, cue: '+7 381, posta 644–646. İrtiş kıyısında ufka uzanan düzlük, tuz gölleri ve beyaz gövdeli huş koruları.' },
    { id: 'ru-tom', name: 'Tomsk', short: 'Tomsk', local: 'Томская обл.', cap: 'Tomsk', reg: 'sib', codes: ['382'], postal: '634–636', codeCls: 7, traitId: 'ru-pasynok', traitTitle: '+7 382 · Oyma Ahşap & Bataklık Taygası (634–636)', traitCls: 1, cue: '+7 382, posta 634–636. Tomsk merkezinde süslü ahşap evler, kırsalda Pasynok direkler ve tayga.' },
    { id: 'ru-ty', name: 'Tuva Cum.', short: 'Tuva', local: 'Респ. Тыва', cap: 'Kızıl', reg: 'sib', codes: ['394'], postal: '667–668', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 394 · Moğolistan Benzeri Step (Ө Ң Ү)', traitCls: 5, cue: '+7 394, posta 667–668. Ağaçsız sarı dağ bozkırı ve Kiril tabelalarda Ң, Ө, Ү harfleri (Кызыл)!' },
    { id: 'ru-kk', name: 'Hakasya Cum.', short: 'Hakasya', local: 'Респ. Хакасия', cap: 'Abakan', reg: 'sib', codes: ['390'], postal: '655', codeCls: 7, traitId: 'ru-birch', traitTitle: '+7 390 · Abakan Step Çanağı (655)', traitCls: 5, cue: '+7 390, posta 655. Sayan dağlarıyla çevrili sarı-kızıl step çanağı ve düz vadi tarlaları.' },

    { id: 'ru-amu', name: 'Amur Oblastı', short: 'Amur', local: 'Амурская обл.', cap: 'Blagoveşçensk', reg: 'dfo', codes: ['416'], postal: '675–676', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 416 · Amur Yolu & Sağ Direksiyon (675–676)', traitCls: 0, cue: '+7 416, posta 675–676. Çin sınırında P-297 otoyolu, kış kar çubukları ve çok sayıda Japon ikinci el sağ-direksiyon araç.' },
    { id: 'ru-bu', name: 'Buryatya Cum.', short: 'Buryatya', local: 'Респ. Бурятия', cap: 'Ulan-Ude', reg: 'dfo', codes: ['301'], postal: '670–671', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 301 · Baykal Doğusu & Buryat (Ө Ү Һ)', traitCls: 5, cue: '+7 301, posta 670–671. Moğol-Budist dua bayrakları (khii morin), kumlu tepeler, ahşap Ulan-Ude evleri ve Ө, Ү, Һ harfleri!' },
    { id: 'ru-yev', name: 'Yahudi ÖO', short: 'Yahudi ÖO', local: 'Еврейская АО', cap: 'Birobidjan', reg: 'dfo', codes: ['426'], postal: '679', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 426 · Birobidjan · Kiril + İbranice Tabela!', traitCls: 8, cue: '+7 426, posta 679. Birobidjan istasyon ve belediye binalarında Rusça yanında İbranice/Yidiş harfler bulunur!', trap: 'Uzak Doğu’da Amur kenarında küçük birim: +7 426.' },
    { id: 'ru-zab', name: 'Zabaykalsky Krayı', short: 'Zabaykalsky', local: 'Забайкальский край', cap: 'Çita', reg: 'dfo', codes: ['302'], postal: '672–674', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 302 · Kuru Sarı Bozkır & Kar Çubuğu', traitCls: 5, cue: '+7 302, posta 672–674. Dağlık sarı Moğolistan bozkırı + karaçam ormanı; kar çubukları ve sağ-direksiyon Japon araçları başlar!' },
    { id: 'ru-kam', name: 'Kamçatka Krayı', short: 'Kamçatka', local: 'Камчатский край', cap: 'Petropavlovsk-K.', reg: 'dfo', codes: ['415'], postal: '683–684', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 415 · Konik Volkanlar & Sağ Direksiyon', traitCls: 8, cue: '+7 415, posta 683–684. Arka planda karlı koni yanardağlar, yeşil oluklu beton duvarlar, kar çubukları ve %90 Japon sağ-direksiyon araç!' },
    { id: 'ru-mag', name: 'Magadan', short: 'Magadan', local: 'Магаданская обл.', cap: 'Magadan', reg: 'dfo', codes: ['413'], postal: '685', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 413 · Kolıma Yolu & Kar Çubukları', traitCls: 8, cue: '+7 413, posta 685. Çıplak mor-kahve dağlar, çakıllı R-504 Kolıma yolu ve kenarında turuncu tepeli ince kar çubukları.' },
    { id: 'ru-pri', name: 'Primorsky Krayı', short: 'Primorsky', local: 'Приморский край', cap: 'Vladivostok', reg: 'dfo', codes: ['423'], postal: '690–692', codeCls: 8, traitId: 'ru-crosswalk', traitTitle: '+7 423 · Vladivostok & Japon Arabaları (690–692)', traitCls: 8, cue: '+7 423, posta 690–692! Trafikteki araçların çoğu Japon sağdan direksiyonludur! Dik tepeli liman kenti Vladivostok ve yeşil meşe ormanları.' },
    { id: 'ru-sa', name: 'Saha (Yakutya)', short: 'Yakutya', local: 'Респ. Саха (Якутия)', cap: 'Yakutsk', reg: 'dfo', codes: ['411'], postal: '677–678', codeCls: 8, traitId: 'ru-pasynok', traitTitle: '+7 411 · Permafrost Boruları & Ҕ Ҥ Ө Ү Һ', traitCls: 8, cue: '+7 411, posta 677–678. Donmuş toprak (permafrost) yüzünden kazıklar üzerinde duran binalar, sokakta yer üstü ısı boruları ve Yakutça Ҕ, Ҥ, Ө, Ү, Һ!' },
    { id: 'ru-sak', name: 'Sahalin Oblastı', short: 'Sahalin', local: 'Сахалинская обл.', cap: 'Yuzhno-Sahalinsk', reg: 'dfo', codes: ['424'], postal: '693–694', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 424 · Bambu Otu (Sasa) & Kar Çubuğu', traitCls: 8, cue: '+7 424, posta 693–694. Sahalin adasına özgü yol kenarı cüce yeşil bambu (Sasa) örtüsü, ince kar çubukları ve sağ-direksiyon araçlar!' },
    { id: 'ru-kha', name: 'Habarovsk Krayı', short: 'Habarovsk', local: 'Хабаровский край', cap: 'Habarovsk', reg: 'dfo', codes: ['421'], postal: '680–682', codeCls: 8, traitId: 'ru-birch', traitTitle: '+7 421 · Amur Kenarı & Habarovsk (680–682)', traitCls: 0, cue: '+7 421, posta 680–682. Geniş Amur Nehri, meşe-huş koridoru ve yoğun sağ-direksiyon Japon araçları.' },
    { id: 'ru-chu', name: 'Çukotka ÖB', short: 'Çukotka', local: 'Чукотский АО', cap: 'Anadır', reg: 'dfo', codes: ['427'], postal: '689', codeCls: 8, traitId: 'ru-snow-stick', traitTitle: '+7 427 · Anadır Renkli Bloklar (689)', traitCls: 8, cue: '+7 427, posta 689. Tamamen ağaçsız Bering boğazı tundrası, kar çubukları ve soğuğa karşı parlak boyalı Anadır binaları.' }
  ];

  /* +7 veya 8 telefon & 6-haneli Индекс çözücü */
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
    /* 1) 6-haneli Rus posta kodu (Индекс): +7 ile başlamıyorsa ve 5'le başlıyorsa uyar! */
    if (digits.length >= 6 && digits.charAt(0) !== '7' && digits.charAt(0) !== '8') {
      if (digits.charAt(0) === '5') {
        pushRes('5xxxxx', 'KULLANILMAZ! (Rusya’da 5 ile başlayan posta yok)', 'Rus posta kodları (Индекс) yalnızca 1, 2, 3, 4 ve 6 ile başlar.', []);
      } else {
        var idx3 = +digits.slice(0, 3);
        var hits = pack.units.filter(function (u) {
          return u.postal.split(',').some(function (part) {
            var m = part.trim().match(/^(\d+)(?:–(\d+))?$/);
            if (!m) return false;
            var a = +m[1], b = m[2] ? +m[2] : a;
            if (m[1].length === 3 && idx3 >= a && idx3 <= b) return true;
            return false;
          });
        });
        if (hits.length) {
          pushRes(digits.slice(0, 6), hits.map(function (u) { return u.name; }).join(' / '), 'Индекс aralığı: ' + hits.map(function (u) { return u.postal; }).join(', '), hits.map(function (u) { return u.id; }));
        }
      }
    }
    /* 2) +7 veya yurt içi 8 telefon (8-800 & 9xx cep telefonu dahil) */
    var tel = digits;
    if ((tel.charAt(0) === '7' || tel.charAt(0) === '8') && tel.length >= 4) tel = tel.slice(1);
    if (tel.length >= 3) {
      if (tel.indexOf('800') === 0) {
        pushRes('8-800', 'Ücretsiz şirket hattı (KONUM VERMEZ)', 'Rusya geneli müşteri hattıdır; başka bir tabela ara!', []);
      } else if (tel.charAt(0) === '9') {
        pushRes('+7 / 8 (9xx)', 'Cep telefonu (KONUM VERMEZ)', '900–999 mobil numaradır; sabit 3xx, 4xx veya 8xx ara!', []);
      } else {
        var c3 = tel.slice(0, 3);
        var thits = pack.units.filter(function (u) { return u.codes.indexOf(c3) >= 0; });
        if (thits.length) {
          pushRes('+7 / 8 (' + c3 + ')', thits.map(function (u) { return u.name; }).join(' / '), 'Başkent: ' + thits[0].cap + ' · Индекс: ' + thits[0].postal, thits.map(function (u) { return u.id; }));
        }
      }
    }
    /* 3) Kiril Cumhuriyet harfleri & şehir/il araması */
    if (/ә|ө|җ|ң/.test(raw.toLowerCase()) && q.indexOf('kazan') < 0) pushRes('Ә Ө Ү Җ Ң', 'Tatarstan (veya Çevre Türk Cum.)', 'Özellikle Җ harfi Tatarcanın imzasıdır (+7 843/855).', ['ru-ta']);
    if (/ғ|ҙ|ҡ|ҫ/.test(raw.toLowerCase())) pushRes('Ғ Ҙ Ҡ Ҫ', 'Başkurdistan', 'Ҙ ve Ҡ yalnızca Başkurtçada birlikte görülür (+7 347).', ['ru-ba']);
    if (/ӑ|ӗ|ӳ/.test(raw.toLowerCase())) pushRes('Ӑ Ӗ Ӳ Ҫ', 'Çuvaşistan', 'Üst yaylı Kiril harfleri yalnızca Çuvaşçadır (+7 835).', ['ru-cu']);
    if (/ҕ|ҥ/.test(raw.toLowerCase())) pushRes('Ҕ Ҥ Ө Ү Һ', 'Saha (Yakutya)', 'Ҕ + Ҥ birleşimi Yakutçayı verir (+7 411).', ['ru-sa']);

    pack.units.forEach(function (u) {
      if (pack.norm(u.name).indexOf(q) >= 0 || pack.norm(u.cap).indexOf(q) >= 0 || (u.local && u.local.toLowerCase().indexOf(raw.trim().toLowerCase()) >= 0)) {
        pushRes('+7 ' + u.codes[0], u.name + ' (' + u.local + ')', 'Индекс ' + u.postal + 'xxx · ' + u.cap, [u.id]);
      }
    });
    return out.slice(0, 8);
  }

  function makeSimClue(type, u, pack, helpers) {
    var h = helpers.h, maskText = helpers.maskText;
    var r = pack.regById[u.reg];
    var code = u.codes[0];
    var pBase = u.postal.split('–')[0].split(',')[0].trim();
    if (type === 'tel') {
      return {
        meaning: 'Sabit hat +7 / 8 (' + code + ') · Индекс ' + u.postal,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Mağaza vitrini / Emlak afişi · 8 = Yurt içi ön ek'),
          h('div', { 'class': 'sv-plate' }, h('span', { 'class': 'area' }, code), h('span', {}, 'Тел.: 8 (' + code + ') 2' + ((u.name.length * 19) % 89 + 10) + '-45-10')),
          h('p', { 'class': 'micro' }, 'Saha: ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    if (type === 'index') {
      return {
        meaning: 'Индекс ' + pBase + '010 · +7 ' + code,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Почта России / Resmi bina levhası · 6 haneli Индекс'),
          h('div', { 'class': 'sv-plate' }, h('span', {}, pBase + '010, ул. Ленина, 14'), h('span', { 'class': 'pill' }, r ? r.tr.split(' (')[0] : '')),
          h('p', { 'class': 'micro' }, 'Saha izi: ' + maskText(u.cue, u)))
      };
    }
    if (type === 'visual' && u.traitId && helpers.SVG) {
      return {
        meaning: (u.traitTitle || '') + ' · +7 ' + code,
        el: h('div', { 'class': 'sc-inline' },
          helpers.SVG.render(u.traitId, { compact: true }),
          h('div', { 'class': 'sc-inline-txt' },
            h('span', { 'class': 'sv-kicker' }, 'Sokak görünümü fotoğrafı'),
            h('b', {}, maskText(u.traitTitle || '', u)),
            h('p', { 'class': 'cue' }, maskText(u.cue, u))))
      };
    }
    return {
      meaning: maskText(u.cue, u).slice(0, 68),
      el: h('div', { 'class': 'clue-card-sv' },
        h('span', { 'class': 'sv-kicker' }, 'Saha & alfabe notu'),
        h('p', { 'class': 'cue' }, maskText(u.cue, u)),
        u.trap ? h('p', { 'class': 'micro' }, 'Tuzak: ' + maskText(u.trap, u)) : null)
    };
  }

  g.CountryEngine.register({
    id: 'russia',
    name: 'Rusya',
    unitLabel: 'birim',
    unitLabelCap: 'Federal Birim',
    postalLabel: 'Индекс',
    geoVar: 'RU_GEO',
    themeId: 'ru',
    themeCfg: {
      aria: 'Rusya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.',
      fit: 'Tüm Rusya’yı göster',
      wrap360: true,
      grid: { lat: [40, 80, 10], lon: [20, 190, 20], txt: [44, 76, 8], refLon: 90, refLat: 60 },
      excludeWorld: ['Russia'],
      bg: [
        [24.0, 64.5, 'FİNLANDİYA', 'c'], [31.5, 49.0, 'UKRAYNA', 'c'],
        [28.0, 53.8, 'BELARUS', 'c'], [67.0, 48.0, 'KAZAKİSTAN', 'c'],
        [103.0, 46.5, 'MOĞOLİSTAN', 'c'], [122.0, 45.0, 'ÇİN', 'c'],
        [19.0, 55.8, 'Baltık Denizi', 's'], [35.0, 43.2, 'Karadeniz', 's'],
        [50.5, 42.5, 'Hazar Denizi', 's'], [148.0, 55.0, 'Ohotsk Denizi', 's'],
        [168.0, 56.0, 'Bering Denizi', 's']
      ]
    },
    srsPrefix: 'ru',
    simKmScale: 1100,
    maxFitZoom: 8,
    labelSize: 8.6,
    regionMeta: {
      code: 'RU',
      area: 'Avrupa ve Avrasya',
      tone: 'indigo',
      ralias: ['RU', 'RUS', 'RUSYA', 'RUSSIA'],
      line: '83 birim: Почта 6 haneli Индекс (1–6, 5 yok!), +7 / 8 kod, direkler ve çift alfabe',
      blurb: 'Bina girişlerindeki 6 haneli posta kodu (Индекс) ile batıdan doğuya dilimi bul; dükkanlardaki +7 / 8(XXX) sabit hatlarla şehri daralt, yazısız yollarda direk ayağı ve kar çubuğuna bak.',
      exploreDesc: '83 federal birim, dükkan tabelası +7 / 8 sabit hatları, 6 haneli posta (Индекс) ve saha direkleri.',
      plan: [
        { title: '6 haneli Индекс & 8(XXX) Kodu', text: 'Posta kodu ve dükkan telefonunun sokakta nerede çıktığını, 5xxxx & 9xx/800 tuzaklarını gör.', to: 'alankodu' },
        { title: 'Pasynok Direk, Kar Çubuğu & Doğu', text: 'Beton ayak, siyah tabanlı direk, Sibirya kar çubuğu ve sağ direksiyonlu doğu geçişini ayırt et.', to: 'saha' },
        { title: 'Çift Dilli Cumhuriyet Alfabeleri', text: 'Tatar (Ә Ө Җ), Başkurt (Ғ Ҙ Ҡ), Çuvaş (Ӑ Ӗ) ve Sibirya özel harflerini bir bakışta tanı.', to: 'alfabe' },
        { title: 'Simülasyonla Avrasya vur', text: 'Tabela ve saha ipuçlarından 5.000 puan pratik yap.', to: 'simulasyon', launch: { preset: 'mix' } }
      ]
    },
    regions: REGIONS,
    colorModes: [
      { id: 'reg', label: 'Federal bölge (7)' },
      { id: 'code', label: 'Индекс dalgası (1–6)' },
      { id: 'trait', label: 'Dil & biyom' }
    ],
    legendFor: function (mode, pack) {
      if (mode === 'code') {
        return [
          { cls: 'q0', label: '1xxxxx · Moskova & Kuzey/Kuzeybatı', sub: '10–14 MSK · 15–19 Yaroslavl, Arkhangelsk, Karelya, SPb', ids: pack.units.filter(function (u) { return u.codeCls === 0; }).map(function (u) { return u.id; }) },
          { cls: 'q1', label: '2xxxxx · Batı Sınırı & Kaliningrad', sub: '21 Smolensk · 23 Kaliningrad · 24 Bryansk/Kaluga', ids: pack.units.filter(function (u) { return u.codeCls === 1; }).map(function (u) { return u.id; }) },
          { cls: 'q2', label: '3xxxxx · Güney, Çernozem & Kafkasya', sub: '30 Tula/Oryol/Belgorod · 34–38 Rostov/Krasnodar/Kafkas', ids: pack.units.filter(function (u) { return u.codeCls === 2; }).map(function (u) { return u.id; }) },
          { cls: 'q3', label: '4xxxxx · İdil–Volga & G. Ural', sub: '40–46 Volgograd, Tatarstan, Başkurdistan, Samara, Orenburg, Çelyabinsk', ids: pack.units.filter(function (u) { return u.codeCls === 3; }).map(function (u) { return u.id; }) },
          { cls: 'q6', label: '60–62xxxx · Volga Doğu & Orta Ural', sub: '60 Vladimir/Nizhny · 61 Kirov/Perm · 62 Yekaterinburg/Tyumen/Yugra/Yamal', ids: pack.units.filter(function (u) { return u.codeCls === 6; }).map(function (u) { return u.id; }) },
          { cls: 'q7', label: '63–66xxxx · Orta & Batı Sibirya', sub: '63 Novosibirsk/Tomsk · 64 Omsk/Kurgan · 65 Altay/Kuzbass · 66 Krasnoyarsk/İrkutsk', ids: pack.units.filter(function (u) { return u.codeCls === 7; }).map(function (u) { return u.id; }) },
          { cls: 'q8', label: '67–69xxxx · Uzak Doğu & Baykal Doğusu', sub: '67 Buryatya/Yakutya · 68 Habarovsk/Kamçatka/Magadan · 69 Primorsky/Sahalin', ids: pack.units.filter(function (u) { return u.codeCls === 8; }).map(function (u) { return u.id; }) }
        ];
      }
      if (mode === 'trait') {
        return [
          { cls: 'q0', label: 'Merkez Huş & Şehirler', sub: 'Moskova çevresi & SPb/Orta', ids: pack.units.filter(function (u) { return u.traitCls === 0; }).map(function (u) { return u.id; }) },
          { cls: 'q1', label: 'Tayga Ormanı & Pasynok Kuşağı', sub: 'Kuzey ormanı & Perm/Tomsk', ids: pack.units.filter(function (u) { return u.traitCls === 1; }).map(function (u) { return u.id; }) },
          { cls: 'q2', label: 'Çernozem Kara Toprak Tarımı', sub: 'Güney merkez & Orta Volga/Altay Krayı', ids: pack.units.filter(function (u) { return u.traitCls === 2; }).map(function (u) { return u.id; }) },
          { cls: 'q5', label: 'Sıcak Bozkır & Kafkas Dağları', sub: 'Kuban, Astrahan, Kalmıkya, Kafkas, Hakasya/Tuva', ids: pack.units.filter(function (u) { return u.traitCls === 5; }).map(function (u) { return u.id; }) },
          { cls: 'q7', label: 'Çift Alfabeli Volga Cumhuriyetleri', sub: 'Tatarstan, Başkurdistan, Çuvaşistan, Mari El, Mordovya', ids: pack.units.filter(function (u) { return u.traitCls === 7; }).map(function (u) { return u.id; }) },
          { cls: 'q8', label: 'Ekstrem Kuzey / Kaliningrad / Sağ Direksiyon', sub: 'Kaliningrad, Arktik & Uzak Doğu Pasifik', ids: pack.units.filter(function (u) { return u.traitCls === 8; }).map(function (u) { return u.id; }) }
        ];
      }
      return pack.regions.map(function (r) {
        return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: pack.units.filter(function (u) { return u.reg === r.id; }).map(function (u) { return u.id; }) };
      });
    },
    units: UNITS,
    decoder: {
      title: '6 haneli Индекс (posta), +7 / 8 telefon veya Kiril özel harf çözücü',
      placeholder: 'Kod (495, 843, 383), Индекс (620000) ya da harf (Ә, Ҙ, Ӑ)…',
      hint: 'Dükkan/emlak levhasında +7 yerine genelde 8 (XXX) yazar; 8 (9xx) cep telefonu, 8 (800) ücretsiz çağrı merkezidir (konum vermez). 5 ile başlayan Rus posta kodu yoktur!',
      resolve: resolveDecoder
    },
    topics: [
      {
        key: 'alankodu',
        navLabel: 'Индекс & +7',
        icon: 'phone',
        drillPreset: 'code',
        mapMode: 'code',
        labelMode: 'short',
        title: 'Rusya’da 6 haneli posta (Индекс) ve +7 / 8 telefon kodu nasıl okunur?',
        lead: 'Nereye bakılır: (1) Mavi-beyaz Почта России postane levhaları, okul/belediye kapı tabelaları ve emlak afişlerinin adres satırında 6 rakamlı posta kodu (ör. 620014) yazar: ilk 2–3 hane batıdan doğuya bölgeyi verir (1–4 Avrupa, 5 YOKTUR, 60–69 doğu). (2) Market vitrini, reklam panosu ve tır brandalarındaki telefon +7 yerine çoğunlukla 8 (843) ... biçiminde 8 ile başlar; parantezdeki 3 haneli kodu al — 9xx veya 800 görürsen ele!',
        desc: '1–4 Avrupa Rusya’sı, 5 boşluk, 60–69 Ural–Sibirya–Pasifik posta kodu ve +7 / 8 sabit hatları.',
        decoder: true,
        bands: [
          { cls: 'q0', key: '1xxxxx', title: 'Moskova, K. Halka & Kuzeybatı (+7 49x / 81x–82x)', sub: '10–14 Moskova · 15–17 Yaroslavl/Arkhangelsk/Tver · 18–19 Karelya/Murmansk/SPb.', ids: packUnitsByCls(0) },
          { cls: 'q1', key: '2xxxxx', title: 'Batı Sınırı & Kaliningrad (+7 401 / 48x)', sub: '21 Smolensk · 23 Kaliningrad · 24 Bryansk & Kaluga.', ids: packUnitsByCls(1) },
          { cls: 'q2', key: '3xxxxx', title: 'Güney, Kara Toprak & Kuzey Kafkas (+7 47x / 86x–87x)', sub: '30–39 Tula/Kursk/Voronezh · 34–38 Rostov/Krasnodar/Kafkasya.', ids: packUnitsByCls(2) },
          { cls: 'q3', key: '4xxxxx', title: 'Volga & Güney Ural (+7 83x–84x / 34x–35x)', sub: '40–46 Volgograd, Tatarstan, Başkurdistan, Samara, Orenburg, Çelyabinsk.', ids: packUnitsByCls(3) },
          { cls: 'q6', key: '60–62x', title: '60 Vladimir/Nizhny İstisnası → 61 Perm/Kirov → 62 Orta Ural', sub: 'DİKKAT: 600–607 batıdadır (Vladimir/Nizhny); 620–629 Ural & Petrol!', ids: packUnitsByCls(6) },
          { cls: 'q7', key: '63–66x', title: 'Sibirya (+7 38x / 39x)', sub: '63 Novosibirsk/Tomsk · 64 Omsk/Kurgan · 65 Altay/Kuzbass · 66 Krasnoyarsk/İrkutsk.', ids: packUnitsByCls(7) },
          { cls: 'q8', key: '67–69x', title: 'Uzak Doğu & Pasifik (+7 41x / 42x)', sub: '67 Buryatya/Yakutya · 68 Habarovsk/Kamçatka/Magadan · 69 Primorsky/Sahalin.', ids: packUnitsByCls(8) }
        ],
        rules: [
          {
            title: '3 Altın Rusya Numara Tuzağı',
            body: 'Tabela veya kamyon okurken vaktini boşa harcamamak için şu üç tuzağa düşme:',
            traps: [
              ['8 (9xx) ve 8 (800) KONUM VERMEZ!', 'Kamyon brandası ve reklam panolarında sık görülen 900–999 numaraları ülke geneli cep telefonu, 8-800 ise ücretsiz çağrı merkezidir. Parantezi 3xx, 4xx veya 8xx (81x–87x) olan sabit hattı ara!'],
              ['5xxxxx diye bir Rus posta kodu YOKTUR', 'Sovyet döneminden kalan 5xxxx eski Baltık/Ukrayna/Orta Asya dilimiydi; bugün Rusya yalnızca 1, 2, 3, 4 ve 6 kullanır.'],
              ['600–607 görünce Sibirya’ya atlama!', '6xxxx grubunun en başı olan 600–602 Vladimir ve 603–607 Nizhny Novgorod (+7 831) hâlâ batıda, Moskova–Volga arasındadır!']
            ],
            ids: ['ru-vla', 'ru-niz', 'ru-mow', 'ru-pri']
          }
        ]
      },
      {
        key: 'saha',
        navLabel: 'Direk & Saha',
        icon: 'bulb',
        drillPreset: 'visual',
        mapMode: 'trait',
        labelMode: 'short',
        title: 'Pasynok direkler, siyah tabanlı gövde, kar çubukları ve doğu izleri',
        lead: 'Nereye bakılır: Kırsal yolda tabelaya rastlayamadığında elektrik direğinin dibine (Pasynok beton kaidesi veya siyah taban boyası), kavşak yaya levhalarına, yol kenarındaki ince kış kar çubuklarına ve trafikteki arabaların direksiyon tarafına bak.',
        desc: 'Rusya için 5 gerçek Sokak Görünümü referans fotoğrafı.',
        visuals: [
          { id: 'ru-pasynok', badge: 'Direk · A', title: 'Pasynok (Пасынок): Beton Ayağa Bağlı Ahşap Direk', sub: 'Üst gövdesi yuvarlak kahverengi ahşap direk, dibinde toprağa saplı kısa kare beton ayağa metal tellerle bağlanır. Özellikle Orta, Kuzey Rusya ve Sibirya köylerinde yaygındır.', tags: ['Kırsal Rusya klasiği', 'Beton kaide + ahşap'], ids: ['ru-ark', 'ru-vlg', 'ru-tve', 'ru-per', 'ru-tom', 'ru-irk', 'ru-sa'] },
          { id: 'ru-pole-bw', badge: 'Direk · B', title: 'Siyah Tabanlı Beyaz Şeritli Direk (“Black Socks”)', sub: 'Kasaba girişlerinde ve ana cadde kavşaklarında beton direğin alt ~1 metresi mat siyaha boyanır, üstünde beyaz bant devam eder.', tags: ['Şehir / kavşak girişi', 'Siyah alt taban'], ids: ['ru-spe', 'ru-kgd', 'ru-da', 'ru-ta', 'ru-ce'] },
          { id: 'ru-crosswalk', badge: 'İşaret · C', title: 'Neon Sarı Çerçeveli 3 Şeritli Yaya Geçidi', sub: 'Yaya geçitlerinde fosforlu sarı-yeşil dış çerçeveli mavi üçgen tabela ve yaya çizgisi klasik Rus sokak standardıdır.', tags: ['Tüm ana yollar', 'Sarı fosforlu çerçeve'], ids: ['ru-mow', 'ru-spe', 'ru-niz', 'ru-sam', 'ru-kda', 'ru-pri'] },
          { id: 'ru-birch', badge: 'Biyom · 1', title: 'Beyaz Gövdeli Huş Koruları (Batı Sibirya & Merkez)', sub: 'Siyah benekli beyaz kabuklu huş ağaçları özellikle Omsk, Novosibirsk, Kurgan ve Moskova çevresindeki düzlüklerde düzenli öbekler oluşturur.', tags: ['Orta & Batı Sibirya', 'Beyaz gövde'], ids: ['ru-mos', 'ru-oms', 'ru-nvs', 'ru-kgn', 'ru-sve', 'ru-tyu'] },
          { id: 'ru-snow-stick', badge: 'Yol · 2', title: 'Turuncu Tepeli İnce Sibirya Kar Çubukları', sub: 'Kar küreme araçlarının yol omzunu görebilmesi için Sibirya, Uzak Doğu ve kutup bölgelerinde yol kenarına sıra sıra dikilen ince beyaz-turuncu çubuklar.', tags: ['Sibirya & Uzak Doğu', 'Kış yolu kenarı'], ids: ['ru-khm', 'ru-yan', 'ru-mur', 'ru-amu', 'ru-bu', 'ru-zab', 'ru-kam', 'ru-mag', 'ru-sak', 'ru-chu'] }
        ],
        rules: [
          {
            title: 'Uzak Doğu, Sahalin ve Kaliningrad’ı Saniyede Ayıran 3 İpucu',
            body: 'Büyük Rusya haritasında kilometrelerce yanılmamak için şu üç somut izi yakala:',
            traps: [
              ['Araçların çoğu sağdan direksiyonlu Japon ithalse', 'Baykal doğusuna geçtin! Özellikle Amur, Habarovsk, Primorsky (Vladivostok), Sahalin ve Kamçatka’da arabaların yarısından fazlası sağ direksiyonludur.'],
              ['İkili ağaç tüneli (Allee) + eski kırmızı tuğla çatılar', 'Rusya tabelası yanında Doğu Prusya tarzı kırmızı tuğla binalar varsa ana karada değil Kaliningrad Eksklavı’ndasın (+7 401)!'],
              ['Yol kenarında sık cüce yeşil bambu (Sasa)', 'Dik yeşil tepeler + yol kenarı alçak bambu örtüsü = Japonya Denizi’ndeki Sahalin Adası (+7 424)!']
            ],
            ids: ['ru-pri', 'ru-kha', 'ru-kam', 'ru-sak', 'ru-kgd']
          }
        ]
      },
      {
        key: 'alfabe',
        navLabel: 'Çift Alfabe',
        icon: 'list',
        drillPreset: 'clue',
        mapMode: 'trait',
        labelMode: 'short',
        title: 'Özel Kiril harfleriyle Cumhuriyet tanıma',
        lead: 'Nereye bakılır: Özerk cumhuriyetlerde mağaza vitrini, belediye binası, otobüs durağı ve sokak adı tabelaları çift dilli yazılır (ör. “Казан / Казань”). Rusçada bulunmayan şu 4 özel Kiril harf grubundan birini gördüğün an nokta atışı yapabilirsin:',
        desc: 'Tatar (Ә Ө Ү Җ), Başkurt (Ғ Ҙ Ҡ), Çuvaş (Ӑ Ӗ Ӳ) ve Yakut/Sibirya harfleri.',
        rules: [
          {
            title: 'Özel Kiril Harf İmzaları',
            body: 'Tabeladaki ikinci satırda şu karakterleri ara:',
            traps: [
              ['Ә, Ө, Ү, Җ, Ң, Һ (“Урам / Казан”)', 'Tatarstan Cum. (+7 843/855 · Kuyruklu “Җ” Tatarca için çok keskindir!)'],
              ['Ғ, Ҙ, Ҡ, Ҫ (“Өфө / урам”)', 'Başkurdistan Cum. (+7 347 · Özellikle “Ҙ” ve “Ҡ” ikilisi + posta 450–453!)'],
              ['Ӑ, Ӗ, Ӳ, Ҫ (“Шупашкар / Чӑваш”)', 'Çuvaşistan Cum. (+7 835 · Üstü ters yaylı “Ӑ/Ӗ” yalnızca buradadır!)'],
              ['Ҕ, Ҥ, Ө, Ү, Һ (“Саха Сирэ”)', 'Saha / Yakutya (+7 411 · Yer üstü kalorifer boruları + kazıklı evler + Ҕ/Ҥ!)'],
              ['Ө, Ү, Ң (+ dua bayrakları / kuru bozkır)', 'Buryatya (Һ var, 301), Tuva (Ң var, 394) veya Kalmıkya (Elista Budist tapınağı, 847)!']
            ],
            ids: ['ru-ta', 'ru-ba', 'ru-cu', 'ru-sa', 'ru-bu', 'ru-ty', 'ru-kl']
          }
        ]
      }
    ],
    presets: [
      { id: 'mix', label: 'Karışık', q: ['loc', 'visual', 'code', 'codeToUnit', 'clueToUnit'] },
      { id: 'code', label: '+7 & Индекс', q: ['code', 'codeToUnit'] },
      { id: 'visual', label: 'Direk & Biyom', q: ['visual', 'clueToUnit'] },
      { id: 'loc', label: '83 Birim Yeri', q: ['loc'] }
    ],
    simTypes: [
      { v: 'tel', label: '+7 / 8 sabit telefon' },
      { v: 'index', label: 'Индекс posta' },
      { v: 'visual', label: 'Saha fotoğrafı' },
      { v: 'clue', label: 'Alfabe & coğrafya' }
    ],
    makeSimClue: makeSimClue
  });

  function packUnitsByCls(cls) {
    return UNITS.filter(function (u) { return u.codeCls === cls; }).map(function (u) { return u.id; });
  }
})(typeof window !== 'undefined' ? window : globalThis);

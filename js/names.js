/* names.js — il adı mantığı ve alan kodu desenleri (yalnızca veri + küçük sorgu yardımcıları).
   Her iddia tools/verify-names.cjs ile gerçek veriye (bölge, merkez noktası, kodlar) karşı denetlenir. */
(function (g) {
  'use strict';
  var D = g.VN_DATA, P = D.provinces, norm = D.norm;

  /* Kuzey yarı = Kuzeydoğu, Kuzeybatı, Kızıl Nehir, Kuzey Orta Kıyı · Güney yarı = geri kalan dört bölge */
  var NORTH = ['ne', 'nw', 'rrd', 'ncc'], SOUTH = ['scc', 'ch', 'se', 'md'];
  function half(regionId) { return NORTH.indexOf(regionId) >= 0 ? 'N' : 'S'; }

  /* ---------- 13 özel ad ailesi (her il tam olarak birinde) ---------- */
  var FAMS = [
    { id: 'binhN', cls: 'q4',  label: '…Bình',            sub: 'sonda → Kuzey yarı',        rule: 'binh' },
    { id: 'binhS', cls: 'q6',  label: 'Bình…',            sub: 'başta → Güney yarı',        rule: 'binh' },
    { id: 'quang', cls: 'q2',  label: 'Quảng zinciri',    sub: 'Bình·Trị·Thiên·Nam·Ngãi',   rule: 'quang' },
    { id: 'ha',    cls: 'q1',  label: 'Hà-',              sub: 'nehir → Kuzey',             rule: 'ha' },
    { id: 'bac',   cls: 'q11', label: 'Bắc-',             sub: 'kuzey → Kuzey',             rule: 'bac' },
    { id: 'trio',  cls: 'q7',  label: 'Thanh·Nghệ·Tĩnh',  sub: 'Kuzey Orta Kıyı üçlüsü',    rule: 'trio' },
    { id: 'hl',    cls: 'q5',  label: 'Đắk·Kon·Gia·Lâm',  sub: 'Orta Yaylalar',             rule: 'hl' },
    { id: 'loc',   cls: 'q0',  label: 'Yerel adlar',      sub: 'Çince çözülmez → Mekong',   rule: 'loc' },
    { id: 'giang', cls: 'q8',  label: 'An·Kiên·Tiền·Hậu Giang', sub: 'güney nehirleri → Mekong', rule: 'giang' },
    { id: 'word',  cls: 'q9',  label: 'Sơn·Hải·Tây·Biên·Cao', sub: 'anlamlı sözcük',      rule: 'word' },
    { id: 'solo',  cls: 'q10', label: 'Tekil ipuçları',   sub: 'her biri ayrı',             rule: 'solo' },
    { id: 'trap',  cls: 'q3',  label: 'Tuzaklar',         sub: 'ad yanıltır',               rule: 'trap' },
    { id: 'wish',  cls: 'qn',  label: 'Dilek adları',     sub: 'konum vermez',              rule: 'wish' }
  ];
  var famById = {};
  FAMS.forEach(function (f) { famById[f.id] = f; });

  var ST = [
    { n: 0, t: 'Yok',    long: 'Ad konum vermez' },
    { n: 1, t: 'Zayıf',  long: 'Yalnızca ima eder' },
    { n: 2, t: 'İyi',    long: 'Güvenilir ipucu' },
    { n: 3, t: 'Güçlü',  long: 'Neredeyse kesin kural' }
  ];

  var WISH = 'Dilek adı: adından konum çıkmaz → alan koduna ve komşulara dayan.';

  /* ---------- 63 il: [id, aile, güç(0-3), [[hece, anlam]…], anlam, ipucu, tartışmalı?] ---------- */
  var ROWS = [
    // Kuzeydoğu
    ['ha-giang', 'ha', 3, [['Hà', 'nehir'], ['Giang', 'nehir']], '“Nehir–ırmak” (河江)', 'Hà- ile başlar → Kuzey (4/4). Ülkenin en kuzey ucu.', 0],
    ['cao-bang', 'word', 1, [['Cao', 'yüksek'], ['Bằng', 'düz']], '“Yüksek düzlük” (高平)', 'Cao = yüksek → Kuzey’in yüksek platoları (Çin sınırı).', 0],
    ['bac-kan', 'bac', 3, [['Bắc', 'kuzey'], ['Kạn', 'yerel (Tày) sözcük']], '“Bắc” = kuzey; “Kạn” Tày kökenli sayılır', 'Bắc- ile başlar → Kuzey (3/3).', 1],
    ['tuyen-quang', 'wish', 0, [['Tuyên', 'ilan etmek'], ['Quang', 'ışık']], '“Işığı ilan eden” (宣光)', WISH, 0],
    ['lang-son', 'word', 2, [['Lạng', 'dürüst'], ['Sơn', 'dağ']], '“Dürüst dağ” (諒山)', 'Sơn = dağ → dağlık Kuzey (Çin sınırı).', 0],
    ['thai-nguyen', 'wish', 0, [['Thái', 'büyük'], ['Nguyên', 'ova']], '“Büyük ova” (太原)', WISH, 0],
    ['phu-tho', 'wish', 0, [['Phú', 'zengin'], ['Thọ', 'uzun ömür']], '“Zenginlik ve uzun ömür” (富壽)', WISH, 0],
    ['bac-giang', 'bac', 3, [['Bắc', 'kuzey'], ['Giang', 'nehir']], '“Kuzey nehri” (北江)', 'Bắc- ile başlar → Kuzey (3/3).', 0],
    ['quang-ninh', 'trap', 0, [['Quảng', 'geniş'], ['Ninh', 'huzur']], '“Geniş huzur” (廣寧)', 'TUZAK: Quảng ile başlar ama orta kıyıda DEĞİL — en kuzeydoğu uç (Hạ Long, Çin sınırı).', 0],
    // Kuzeybatı
    ['lai-chau', 'solo', 1, [['Lai', 'Thái “Mường Lay”'], ['Châu', 'eyalet']], 'Thái “Mường Lay” adından; Châu = eyalet', 'Thái/Mường tarzı yerel ad → Kuzeybatı dağları.', 1],
    ['dien-bien', 'word', 1, [['Điện', 'sağlamlaştırmak'], ['Biên', 'sınır']], '“Sınırı sağlamlaştıran” (奠邊)', 'Biên = sınır → Laos sınırı, Kuzeybatı.', 0],
    ['son-la', 'word', 2, [['Sơn', 'dağ'], ['La', 'köken tartışmalı']], '“Dağ” + La (山羅)', 'Sơn = dağ → dağlık Kuzeybatı (Laos sınırı).', 1],
    ['hoa-binh', 'binhN', 3, [['Hòa', 'uyum'], ['Bình', 'barış']], '“Uyum ve barış” (和平)', '…Bình sonda → Kuzey yarı.', 0],
    ['lao-cai', 'trap', 0, [['Lào', '← Lão: eski'], ['Cai', '← Nhai: sokak']], '老街 “Lão Nhai” = eski sokak', 'TUZAK: Lào ≠ Laos. Çin sınırında (Sa Pa, Fansipan).', 0],
    ['yen-bai', 'wish', 0, [['Yên', 'huzur'], ['Bái', 'bolluk']], '“Huzur ve bolluk” (安沛)', WISH, 0],
    // Kızıl Nehir Deltası
    ['ha-noi', 'ha', 3, [['Hà', 'nehir'], ['Nội', 'iç']], '“Nehirlerin içi” (河內)', 'Hà- → Kuzey (4/4). Başkent.', 0],
    ['hai-phong', 'word', 2, [['Hải', 'deniz'], ['Phòng', 'savunma']], '“Deniz savunması” (海防)', 'Hải = deniz → doğu delta kıyısı.', 0],
    ['vinh-phuc', 'wish', 1, [['Vĩnh', 'ebedî'], ['Phúc', 'bereket']], '“Ebedî bereket” (永福)', 'Phúc (Kuzey okunuşu) → Kuzey. Güney aynı karakteri “Phước” okur.', 0],
    ['bac-ninh', 'bac', 3, [['Bắc', 'kuzey'], ['Ninh', 'huzur']], '“Kuzey huzuru” (北寧)', 'Bắc- ile başlar → Kuzey (3/3).', 0],
    ['hai-duong', 'word', 2, [['Hải', 'deniz'], ['Dương', 'güneş']], '“Deniz” + “güneş” (海陽)', 'Hải = deniz → doğu delta kıyısı.', 0],
    ['hung-yen', 'wish', 0, [['Hưng', 'gelişmek'], ['Yên', 'huzur']], '“Gelişen huzur” (興安)', WISH, 0],
    ['thai-binh', 'binhN', 3, [['Thái', 'büyük'], ['Bình', 'barış']], '“Büyük barış” (太平)', '…Bình sonda → Kuzey yarı.', 0],
    ['ha-nam', 'ha', 3, [['Hà', 'nehir'], ['Nam', 'güney']], '“Nehrin güneyi” (河南)', 'Hà- → Kuzey. “Nam” ülkenin güneyi değil, Kızıl Nehir’in güneyi.', 0],
    ['nam-dinh', 'trap', 0, [['Nam', 'güney'], ['Định', 'sabit']], '“Güneyde sabitlenen” (南定)', 'TUZAK: Nam = güney der ama delta’da, KUZEY’dedir.', 0],
    ['ninh-binh', 'binhN', 3, [['Ninh', 'huzur'], ['Bình', 'barış']], '“Huzur ve barış” (寧平)', '…Bình sonda → Kuzey yarı.', 0],
    // Kuzey Orta Kıyı
    ['thanh-hoa', 'trio', 2, [['Thanh', 'berrak'], ['Hóa', 'dönüşüm']], '“Berrak dönüşüm” (清化)', 'Thanh–Nghệ–Tĩnh üçlüsünün KUZEYİ.', 0],
    ['nghe-an', 'trio', 2, [['Nghệ', 'düzen'], ['An', 'huzur']], '“Düzen ve huzur” (乂安)', 'Thanh–Nghệ–Tĩnh üçlüsünün ORTASI.', 0],
    ['ha-tinh', 'trio', 3, [['Hà', 'nehir'], ['Tĩnh', 'sakin']], '“Sakin nehir” (河靜)', 'Hà- → Kuzey. Thanh–Nghệ–Tĩnh üçlüsünün GÜNEYİ.', 0],
    ['quang-binh', 'quang', 3, [['Quảng', 'geniş'], ['Bình', 'barış']], '“Geniş barış” (廣平)', 'Quảng zincirinin 1. halkası (en kuzey). …Bình sonda → Kuzey yarı.', 0],
    ['quang-tri', 'quang', 3, [['Quảng', 'geniş'], ['Trị', 'yönetmek']], '“Geniş yönetim” (廣治)', 'Quảng zincirinin 2. halkası (Bình → Trị).', 0],
    ['thua-thien-hue', 'quang', 2, [['Thừa Thiên', 'göğün buyruğunu almak'], ['Huế', 'eski kent adı']], '“Göğün buyruğunu alan” (承天)', 'Zincirin 3. halkası: “Bình-Trị-Thiên”in sonu (adı Quảng değil).', 0],
    // Güney Orta Kıyı
    ['da-nang', 'quang', 2, [['Đà Nẵng', 'Cham kökenli ad']], 'Cham kökenli ad (“geniş nehir ağzı” denir)', 'Zincirin 4. halkası: Hải Vân Geçidi’nin güneyi, Quảng Nam’ın kuzeyi (adı Quảng değil).', 1],
    ['quang-nam', 'quang', 3, [['Quảng', 'geniş'], ['Nam', 'güney']], '“Geniş güney” (廣南)', 'Zincirin 5. halkası. “Nam” = o günün güneyi — ülkenin güneyi değil.', 0],
    ['quang-ngai', 'quang', 3, [['Quảng', 'geniş'], ['Ngãi', 'adalet']], '“Geniş adalet” (廣義)', 'Zincirin SON halkası (en güney).', 0],
    ['binh-dinh', 'binhS', 3, [['Bình', 'barış'], ['Định', 'sabit']], '“Barışa kavuşan” (平定)', 'Bình… başta → Güney yarı.', 0],
    ['phu-yen', 'wish', 0, [['Phú', 'zengin'], ['Yên', 'huzur']], '“Zengin huzur” (富安)', 'Dilek adı. Eski “Phú Khánh” = Phú Yên + Khánh Hòa → birbirinin komşusu.', 0],
    ['khanh-hoa', 'wish', 0, [['Khánh', 'kutlama'], ['Hòa', 'uyum']], '“Kutlanan uyum” (慶和)', 'Dilek adı. Eski “Phú Khánh” = Phú Yên + Khánh Hòa → birbirinin komşusu.', 0],
    ['ninh-thuan', 'solo', 2, [['Ninh', 'huzur'], ['Thuận', 'uyum']], '“Huzur ve uyum” (寧順)', 'Thuận → Vietnam’ın en kurak kıyısı (Ninh/Bình Thuận, eski Thuận Hải).', 0],
    ['binh-thuan', 'binhS', 3, [['Bình', 'barış'], ['Thuận', 'uyum']], '“Barış ve uyum” (平順)', 'Bình… başta → Güney yarı. Thuận → kurak güney kıyı.', 0],
    // Orta Yaylalar
    ['kon-tum', 'hl', 3, [['Kon', 'köy'], ['Tum', 'gölet']], 'Bahnar dili: “gölet köyü” denir', 'Kon- → Orta Yaylalar.', 1],
    ['gia-lai', 'hl', 3, [['Gia Lai', '← Jrai (Jarai halkı)']], 'Jarai halkının adından (“Jrai”)', 'Gia- → Orta Yaylalar (Jarai ülkesi).', 0],
    ['dak-lak', 'hl', 3, [['Đắk', 'su'], ['Lắk', 'göl']], '“Lắk Gölü” (Đắk = su)', 'Đắk- → Orta Yaylalar.', 0],
    ['dak-nong', 'hl', 3, [['Đắk', 'su'], ['Nông', '← M’nông halkı']], '“M’nông suyu”', 'Đắk- → Orta Yaylalar.', 0],
    ['lam-dong', 'hl', 2, [['Lâm', 'orman'], ['Đồng', 'ova (köken tartışmalı)']], '“Orman” + Đồng; kökeni tartışmalı', 'Lâm = orman → çam ormanlı yayla (Đà Lạt). Yerli sözcük değil ama Yaylalar’da.', 1],
    // Güneydoğu
    ['binh-phuoc', 'binhS', 3, [['Bình', 'barış'], ['Phước', 'bereket (Güney okunuşu)']], '“Barış ve bereket” (平福)', 'Bình… başta → Güney. Phước (Güney okunuşu) → Güney.', 0],
    ['tay-ninh', 'word', 2, [['Tây', 'batı'], ['Ninh', 'huzur']], '“Batı huzuru” (西寧)', 'Tây = batı → Saygon’un batısı (Kamboçya sınırı).', 0],
    ['binh-duong', 'binhS', 3, [['Bình', 'barış'], ['Dương', 'güneş']], '“Barış ve güneş” (平陽)', 'Bình… başta → Güney yarı.', 0],
    ['dong-nai', 'solo', 1, [['Đồng', 'ova'], ['Nai', 'köken tartışmalı']], '“Đồng” = ova; Nai’nin kökeni tartışmalı', 'Đồng = ova → Güney ovası; Saygon’un doğusu.', 1],
    ['ba-ria-vung-tau', 'solo', 1, [['Bà Rịa', 'yerel ad'], ['Vũng', 'koy'], ['Tàu', 'gemi']], '“Gemi koyu” (Vũng Tàu) + Bà Rịa', 'Vũng (koy) + Tàu (gemi) → Güney kıyısı.', 1],
    ['ho-chi-minh', 'solo', 2, [['Hồ Chí Minh', 'kişi adı (eski ad: Sài Gòn)']], 'Kişi adı (1976’dan beri); eski ad Sài Gòn', 'Eski adı Sài Gòn: Güney’in kalbi.', 0],
    // Mekong Deltası
    ['long-an', 'wish', 0, [['Long', 'gelişme'], ['An', 'huzur']], '“Gelişme ve huzur” (隆安)', WISH, 0],
    ['tien-giang', 'giang', 3, [['Tiền', 'ön'], ['Giang', 'nehir']], '“Ön nehir” (前江): Mekong’un Tiền kolu', 'Tiền/Hậu Giang çifti → Mekong.', 0],
    ['ben-tre', 'loc', 3, [['Bến', 'iskele'], ['Tre', 'bambu']], '“Bambu iskelesi” denir (köken tartışmalı)', 'Çince çözülmeyen yerel ad → Mekong.', 1],
    ['tra-vinh', 'loc', 3, [['Trà Vinh', 'Khmer “Preah Trapeang”']], 'Khmer kökenli yerel ad', 'Çince çözülmeyen yerel/Khmer ad → Mekong.', 0],
    ['vinh-long', 'wish', 0, [['Vĩnh', 'ebedî'], ['Long', 'gelişme']], '“Ebedî gelişme” (永隆)', WISH, 0],
    ['dong-thap', 'solo', 1, [['Đồng', 'ova'], ['Tháp', 'kule']], '“Kuleler ovası” (Đồng Tháp Mười)', 'Đồng = ova → Mekong’un sazlık ovası.', 0],
    ['an-giang', 'giang', 2, [['An', 'huzur'], ['Giang', 'nehir']], '“Huzurlu nehir” (安江)', 'An·Kiên·Tiền·Hậu + Giang → Mekong.', 0],
    ['kien-giang', 'giang', 2, [['Kiên', 'sağlam'], ['Giang', 'nehir']], '“Sağlam nehir” (堅江)', 'An·Kiên·Tiền·Hậu + Giang → Mekong.', 0],
    ['can-tho', 'loc', 3, [['Cần Thơ', 'yerel ad']], 'Yerel ad; kökeni tartışmalı', 'Çince çözülmeyen yerel ad → Mekong.', 1],
    ['hau-giang', 'giang', 3, [['Hậu', 'arka'], ['Giang', 'nehir']], '“Arka nehir” (後江): Mekong’un Hậu kolu', 'Tiền/Hậu Giang çifti → Mekong.', 0],
    ['soc-trang', 'loc', 3, [['Sóc Trăng', 'Khmer “Srok Khleang”']], 'Khmer kökenli yerel ad', 'Çince çözülmeyen yerel/Khmer ad → Mekong.', 0],
    ['bac-lieu', 'loc', 3, [['Bạc Liêu', 'yerel ad']], 'Teochew/Khmer kökenli yerel ad (tartışmalı)', 'Çince çözülmeyen yerel ad → Mekong.', 1],
    ['ca-mau', 'loc', 3, [['Cà Mau', 'Khmer “kara su”']], 'Khmer “kara su” (Tuk Khmau) kaynaklı denir', 'Çince çözülmeyen yerel/Khmer ad → Mekong’un ucu.', 0]
  ];
  var INFO = {};
  ROWS.forEach(function (r) {
    INFO[r[0]] = { id: r[0], fam: r[1], s: r[2], syl: r[3], mean: r[4], tell: r[5], dis: !!r[6] };
  });

  function info(pid) { return INFO[pid] || null; }
  function famOf(pid) { var i = INFO[pid]; return i ? famById[i.fam] : null; }
  function famIds(fid) { return P.filter(function (p) { return INFO[p.id] && INFO[p.id].fam === fid; }).map(function (p) { return p.id; }); }
  function stLabel(s) { return ST[Math.max(0, Math.min(3, s))]; }
  function counts() {
    var c = [0, 0, 0, 0];
    P.forEach(function (p) { c[INFO[p.id].s]++; });
    return c;
  }

  /* ---------- kural kartları (Rehber › İl adı mantığı) ---------- */
  var RULES = [
    { id: 'binh', title: 'Bình kuralı', gist: '…Bình sonda → Kuzey yarı · Bình… başta → Güney yarı', st: 3, stat: '8/8',
      groups: [
        { lbl: 'Adın SONUNDA → Kuzey yarı', cls: 'q4', ids: ['thai-binh', 'ninh-binh', 'hoa-binh', 'quang-binh'] },
        { lbl: 'Adın BAŞINDA → Güney yarı', cls: 'q6', ids: ['binh-dinh', 'binh-thuan', 'binh-duong', 'binh-phuoc'] }
      ],
      body: 'Bình “barış / sükûnet” demektir ve en sık geçen dilek sözcüğüdür. Konumu sırası verir: Bình adın SONUNDAYSA il ülkenin kuzey yarısında, BAŞINDAYSA güney yarısındadır. Sekiz ilin sekizinde de tutuyor.',
      watch: 'Bu bir dil kuralı değil, 63 ilde doğrulanmış bir gözlem. Yalnızca il adlarında geçerli; ilçe ve mahalle adlarında (Bình Thạnh vb.) güvenme.' },
    { id: 'quang', title: 'Quảng zinciri', gist: 'Bình → Trị → Thiên → (Đà Nẵng) → Nam → Ngãi, kuzeyden güneye', st: 3, stat: '4/5',
      groups: [{ lbl: 'Orta kıyı şeridi, kuzeyden güneye', cls: 'q2', ids: ['quang-binh', 'quang-tri', 'thua-thien-hue', 'da-nang', 'quang-nam', 'quang-ngai'] }],
      body: 'Orta kıyıda “Quảng” ile başlayan dört il hep aynı sırayla dizilir: Bình → Trị → (Thừa Thiên Huế) → (Đà Nẵng) → Nam → Ngãi. Ezber cümlesi: “Bình-Trị-Thiên, Nam-Ngãi”. Alan kodu 232-233-234 de aynı sırayı izler (Quảng Nam ve Đà Nẵng bu sırada değil).',
      watch: 'Quảng Ninh zincirin DIŞINDA: Çin sınırına yakın en kuzeydoğu uçta (Hạ Long). “Quảng” tek başına orta kıyı demek değildir.' },
    { id: 'ha', title: 'Hà- (nehir)', gist: 'Hà ile başlayan 4 ilin 4’ü de Kuzey', st: 3, stat: '4/4',
      groups: [{ lbl: 'Hà Nội · Hà Giang · Hà Nam · Hà Tĩnh', cls: 'q1', ids: ['ha-noi', 'ha-giang', 'ha-nam', 'ha-tinh'] }],
      body: 'Hà = nehir (河). Dördü de ülkenin kuzey yarısında: Hà Giang en kuzey uçta, Hà Tĩnh en güneyde (Thanh–Nghệ–Tĩnh üçlüsünün sonu).',
      watch: 'Hà Nam’daki “Nam” güney demek ama Kızıl Nehir’in güneyi; ülkenin güneyi değil (Nam tuzağına bak).' },
    { id: 'bac', title: 'Bắc- (kuzey)', gist: 'Bắc ile başlayan 3 ilin 3’ü de Kuzey', st: 3, stat: '3/3',
      groups: [{ lbl: 'Bắc Giang · Bắc Ninh · Bắc Kạn', cls: 'q11', ids: ['bac-giang', 'bac-ninh', 'bac-kan'] }],
      body: 'Bắc = kuzey. Üçü de Hà Nội’nin kuzey–kuzeydoğusunda.',
      watch: 'Aksana dikkat: Bắc (kuzey) ile Bạc Liêu (Mekong’un ucu) aksansız yazılınca aynı görünür (Bac). Tersi de geçerli değil: “Nam-” ile başlayan Nam Định güneyde değil, delta’da.' },
    { id: 'trio', title: 'Thanh · Nghệ · Tĩnh', gist: 'Üçü ard arda: Thanh Hóa → Nghệ An → Hà Tĩnh (kuzeyden güneye)', st: 3, stat: '3/3',
      groups: [{ lbl: 'Kuzey Orta Kıyı üçlüsü', cls: 'q7', ids: ['thanh-hoa', 'nghe-an', 'ha-tinh'] }],
      body: 'Vietnamlılar bu üçlüyü tek nefeste söyler. Aynı sıra alan kodunda da (237 · 238 · 239) kuzeyden güneye akar. Nghệ An ile Hà Tĩnh bir dönem tek ildi: “Nghệ Tĩnh”.' },
    { id: 'hl', title: 'Yayla önekleri', gist: 'Đắk · Kon · Gia (+ Lâm Đồng) → Orta Yaylalar', st: 3, stat: '5/5',
      groups: [{ lbl: 'Đắk Lắk · Đắk Nông · Kon Tum · Gia Lai · Lâm Đồng', cls: 'q5', ids: ['dak-lak', 'dak-nong', 'kon-tum', 'gia-lai', 'lam-dong'] }],
      body: 'Yaylanın yerli halklarının dilinden gelen sözcükler: Đắk (su), Kon (köy), Gia (Jarai halkının adı). Çince değil; çözümlemeye çalışma, görünce “Yaylalar” de. Aynı sözcükler yer adlarında da çıkar: Buôn / Plei (köy), Chư (dağ), Krông (nehir), Ea / Ia (su).',
      watch: 'Lâm Đồng yerli kökenli değil (Lâm = orman) ama yine Yaylalar’da.' },
    { id: 'loc', title: 'Yerel adlar → Mekong', gist: 'Çince çözülmeyen adlar neredeyse hep Mekong Deltası', st: 3, stat: '6/6',
      groups: [{ lbl: 'Cà Mau · Sóc Trăng · Trà Vinh · Bạc Liêu · Bến Tre · Cần Thơ', cls: 'q0', ids: ['ca-mau', 'soc-trang', 'tra-vinh', 'bac-lieu', 'ben-tre', 'can-tho'] }],
      body: 'İl adlarının çoğu Çince kökenli (Hán-Việt) iki hecelik dilek sözcükleridir. Bu altı ad ise Khmer, Çin (Teochew) ve yerel dillerden fonetik uyarlamalar: heceleri “huzur, barış, zengin” gibi okunmuyor. Altısı da Mekong Deltası’nda.',
      watch: 'Tek yönlü kural: yerel ad → Mekong. Ama Mekong illerinin hepsi yerel değil (Long An, Vĩnh Long, An Giang… Çince kökenli). Yayla adları da Çince değil; onları önce Đắk/Kon/Gia’dan tanı.' },
    { id: 'giang', title: '-Giang (nehir)', gist: 'Önündeki sözcük yönü verir: Hà/Bắc → Kuzey · An/Kiên/Tiền/Hậu → Mekong', st: 2, stat: '6/6',
      groups: [
        { lbl: 'Hà Giang · Bắc Giang → Kuzey', cls: 'q1', ids: ['ha-giang', 'bac-giang'] },
        { lbl: 'An · Kiên · Tiền · Hậu Giang → Mekong', cls: 'q8', ids: ['an-giang', 'kien-giang', 'tien-giang', 'hau-giang'] }
      ],
      body: 'Giang = nehir (江). Tek başına yön vermez; önündeki sözcüğe bak. Tiền Giang = “ön nehir” (Mekong’un Sông Tiền kolu), Hậu Giang = “arka nehir” (Sông Hậu kolu): ikisi de deltanın ortasında.' },
    { id: 'word', title: 'Anlamlı sözcükler', gist: 'Sơn (dağ) · Hải (deniz) · Tây (batı) · Biên (sınır) · Cao (yüksek)', st: 2, stat: '7/7',
      groups: [
        { lbl: 'Sơn = dağ: Lạng Sơn · Sơn La', cls: 'q9', ids: ['lang-son', 'son-la'] },
        { lbl: 'Hải = deniz: Hải Phòng · Hải Dương', cls: 'q9', ids: ['hai-phong', 'hai-duong'] },
        { lbl: 'Tây = batı: Tây Ninh', cls: 'q9', ids: ['tay-ninh'] },
        { lbl: 'Biên = sınır: Điện Biên', cls: 'q9', ids: ['dien-bien'] },
        { lbl: 'Cao = yüksek: Cao Bằng', cls: 'q9', ids: ['cao-bang'] }
      ],
      body: 'Sơn: ikisi de dağlık Kuzey. Hải: ikisi de doğu delta kıyısı (Hải Phòng çevresi). Tây Ninh Saygon’un batısı, Kamboçya sınırı. Điện Biên Laos sınırında. Cao Bằng yüksek bir plato, Çin sınırı.',
      watch: 'Yalnızca il adlarında: “Sơn” yer adlarında her yerde çıkar (Sơn Trà Đà Nẵng’de, Sơn Đoòng Quảng Bình’de).' },
    { id: 'thuan', title: 'Thuận', gist: 'Ninh Thuận + Bình Thuận → kurak güney orta kıyı', st: 2, stat: '2/2',
      groups: [{ lbl: 'Ninh Thuận · Bình Thuận (eski Thuận Hải)', cls: 'q10', ids: ['ninh-thuan', 'binh-thuan'] }],
      body: 'İkisi de Vietnam’ın en kurak kıyısında (kum tepeleri, Cham kuleleri, rüzgâr ve güneş çiftlikleri). Eskiden “Thuận Hải” adlı tek ilin parçalarıydılar.',
      watch: 'Thuận An adlı yerler başka yerde de var (Huế, Bình Dương); kural il adları için.' },
    { id: 'phuc', title: 'Phúc ↔ Phước', gist: 'Aynı karakter (福): Kuzey “Phúc”, Güney “Phước” okur', st: 1, stat: '2/2',
      groups: [
        { lbl: 'Phúc → Kuzey: Vĩnh Phúc', cls: 'q4', ids: ['vinh-phuc'] },
        { lbl: 'Phước → Güney: Bình Phước', cls: 'q6', ids: ['binh-phuoc'] }
      ],
      body: 'Çince 福 (bereket) karakterini Kuzey “Phúc”, Güney “Phước” okur. Yer adlarında da işe yarar: Phúc Yên (Kuzey), Phước Long (Güney). Küçük ama keskin bir ayırıcı.' },
    { id: 'solo', title: 'Tekil ipuçları', gist: 'Her biri kendi küçük ipucunu taşıyan 6 il', st: 1, stat: '6 il',
      groups: [
        { lbl: 'Lai Châu ← Thái “Mường Lay” → Kuzeybatı', cls: 'q10', ids: ['lai-chau'] },
        { lbl: 'Ninh Thuận (Thuận) → kurak güney kıyı', cls: 'q10', ids: ['ninh-thuan'] },
        { lbl: 'Đồng Nai · Đồng Tháp (Đồng = ova) → Güney', cls: 'q10', ids: ['dong-nai', 'dong-thap'] },
        { lbl: 'Bà Rịa–Vũng Tàu (Vũng = koy, Tàu = gemi) → Güney kıyısı', cls: 'q10', ids: ['ba-ria-vung-tau'] },
        { lbl: 'TP. Hồ Chí Minh (eski Sài Gòn) → Güney’in kalbi', cls: 'q10', ids: ['ho-chi-minh'] }
      ],
      body: 'Bu altı ilin adı kendi içinde küçük bir ipucu taşır ama ortak bir desen oluşturmaz. Her birini ayrı not et; ilin kartında “Adın mantığı” bölümünde yazıyor.' },
    { id: 'wish', title: 'Dilek adları', gist: 'An · Ninh · Yên · Phú · Hưng · Vĩnh · Thái · Hòa · Khánh · Thọ… hiçbir şey söylemez', st: 0, stat: '10 il',
      groups: [{ lbl: 'Konum vermeyen iyi dilek adları', cls: 'qn', ids: ['tuyen-quang', 'thai-nguyen', 'phu-tho', 'yen-bai', 'vinh-phuc', 'hung-yen', 'phu-yen', 'khanh-hoa', 'long-an', 'vinh-long'] }],
      body: 'Kalan adların büyük kısmı “huzur, bolluk, uzun ömür, gelişme” gibi iyi dilek sözcüklerinin Çince birleşimleridir. Bunlar konumu ele vermez: burada alan koduna ve komşu illere dayan. Çoğu zaman en iyi yol, adı hiç yorumlamayıp “kodlarla” yerini bulmaktır.' },
    { id: 'trap', title: 'Tuzaklar', gist: 'Adın yanıltıcı olduğu yerler', st: 0, stat: '4 uyarı',
      groups: [{ lbl: 'Quảng Ninh · Lào Cai · Nam Định', cls: 'q3', ids: ['quang-ninh', 'lao-cai', 'nam-dinh'] }],
      traps: [
        ['Lào Cai', 'Laos değil: 老街 “Lão Nhai” (eski sokak). Çin sınırında.'],
        ['Quảng Ninh', 'Quảng ama orta kıyı DEĞİL: en kuzeydoğu uç.'],
        ['Nam Định · Hà Nam', '“Nam” = güney der, ikisi de delta’da, KUZEY’de. Quảng Nam da “güney” demez: orta kıyı. Nam hep “o günün başkentine göre güney”.'],
        ['Đồng ≠ Đông', 'Hiçbir ilin adı “Đông” (doğu) değil; Đồng = ova/tarla (Đồng Nai, Đồng Tháp).']
      ],
      body: 'Bu dört uyarıyı bir kez öğrenirsen en sık yapılan hatalardan kurtulursun.' }
  ];

  /* ---------- hece sözlüğü (el ile seçilmiş önemli heceler) ---------- */
  var SYLX = [
    { s: 'Bắc', m: 'kuzey', ex: 'Bắc Giang, Bắc Ninh, Bắc Kạn', st: 3, g: 'Kuzey' },
    { s: 'Nam', m: 'güney (o günün başkentine göre)', ex: 'Hà Nam, Nam Định, Quảng Nam', st: 0, g: 'TUZAK — ülkenin güneyi değil' },
    { s: 'Tây', m: 'batı', ex: 'Tây Ninh, Tây Nguyên, Tây Bắc', st: 2, g: 'Batıdaki bölge' },
    { s: 'Bình', m: 'barış / düz', ex: 'Thái Bình … Bình Dương', st: 3, g: 'Sonda Kuzey · başta Güney' },
    { s: 'Quảng', m: 'geniş', ex: 'Quảng Bình, Quảng Trị, Quảng Nam, Quảng Ngãi', st: 3, g: 'Orta kıyı (Quảng Ninh hariç)' },
    { s: 'Hà', m: 'nehir', ex: 'Hà Nội, Hà Giang, Hà Nam, Hà Tĩnh', st: 3, g: 'Kuzey' },
    { s: 'Giang', m: 'nehir', ex: 'Hà/Bắc Giang · An/Kiên/Tiền/Hậu Giang', st: 2, g: 'Önündeki sözcüğe bak' },
    { s: 'Tiền / Hậu', m: 'ön / arka', ex: 'Tiền Giang, Hậu Giang', st: 3, g: 'Mekong’un iki kolu' },
    { s: 'Sơn', m: 'dağ', ex: 'Lạng Sơn, Sơn La', st: 2, g: 'Dağlık Kuzey (yalnızca il adında)' },
    { s: 'Hải', m: 'deniz', ex: 'Hải Phòng, Hải Dương', st: 2, g: 'Doğu delta kıyısı' },
    { s: 'Biên', m: 'sınır', ex: 'Điện Biên', st: 1, g: 'Laos sınırı' },
    { s: 'Cao', m: 'yüksek', ex: 'Cao Bằng', st: 1, g: 'Yüksek plato' },
    { s: 'Lâm', m: 'orman', ex: 'Lâm Đồng', st: 2, g: 'Yayla ormanı' },
    { s: 'Đồng', m: 'ova / tarla', ex: 'Đồng Nai, Đồng Tháp', st: 1, g: 'Güney ovaları (Đồng ≠ Đông)' },
    { s: 'Thuận', m: 'uyum', ex: 'Ninh Thuận, Bình Thuận', st: 2, g: 'Kurak güney orta kıyı' },
    { s: 'Phúc / Phước', m: 'bereket (福)', ex: 'Vĩnh Phúc · Bình Phước', st: 1, g: 'Kuzey / Güney okunuşu' },
    { s: 'Đắk', m: 'su', ex: 'Đắk Lắk, Đắk Nông', st: 3, g: 'Orta Yaylalar' },
    { s: 'Kon', m: 'köy', ex: 'Kon Tum', st: 3, g: 'Orta Yaylalar' },
    { s: 'Gia', m: 'Jarai halkı', ex: 'Gia Lai', st: 3, g: 'Orta Yaylalar' },
    { s: 'Buôn / Plei', m: 'köy', ex: 'Buôn Ma Thuột, Pleiku', st: 3, g: 'Orta Yaylalar' },
    { s: 'Chư', m: 'dağ', ex: 'Chư Đăng Ya', st: 3, g: 'Orta Yaylalar' },
    { s: 'Krông', m: 'nehir', ex: 'Krông Nô', st: 3, g: 'Orta Yaylalar' },
    { s: 'Ea / Ia', m: 'su', ex: 'Ea Súp, Ia Grai', st: 3, g: 'Orta Yaylalar' },
    { s: 'Mường', m: 'vadi / Tai köyü', ex: 'Mường Phăng, Mường Lay', st: 2, g: 'Kuzey dağları' },
    { s: 'Bản', m: 'köy (Tai)', ex: 'Bản Giốc', st: 2, g: 'Kuzey dağları' },
    { s: 'Pù', m: 'dağ (Thái)', ex: 'Pù Luông, Pù Mát', st: 2, g: 'Kuzey dağları' },
    { s: 'Pác / Na', m: 'ağız / tarla (Tày)', ex: 'Pác Bó, Na Hang, Na Rì', st: 2, g: 'Kuzeydoğu' },
    { s: 'Vàm', m: 'nehir ağzı', ex: 'Vàm Cỏ', st: 2, g: 'Mekong' },
    { s: 'Rạch / Xẻo', m: 'küçük kanal', ex: 'Rạch Giá, Xẻo Quít', st: 2, g: 'Mekong' },
    { s: 'Sóc', m: 'diyar (Khmer)', ex: 'Sóc Trăng', st: 2, g: 'Mekong' },
    { s: 'Phan', m: 'Cham kökenli', ex: 'Phan Rang, Phan Thiết', st: 2, g: 'Güney orta kıyı' },
    { s: 'Thủ', m: 'karakol (守)', ex: 'Thủ Dầu Một, Thủ Đức', st: 1, g: 'Saygon çevresi' },
    { s: 'Long', m: 'gelişme / ejder', ex: 'Long Xuyên, Long Thành', st: 1, g: 'Çoğunlukla Güney' }
  ];

  /* ---------- yer adı önekleri (Pratik ipuçları ve Rehber) ---------- */
  var PLACE_CUES = [
    { re: /^(buon|plei|pleiku|chu|krong|ea|ia|dak|kon)$/, regions: ['ch'], t: 'Buôn / Plei / Chư / Krông / Ea / Ia / Đắk / Kon ile başlayan yer adları Orta Yaylalar’a işaret eder (köy, dağ, nehir, su).' },
    { re: /^(muong|ban|pu)$/, half: 'N', t: 'Mường / Bản / Pù: Tai dilli dağ halklarının sözcükleri → Kuzey’in dağlık kesimi.' },
    { re: /^(pac|na)$/, regions: ['ne'], t: 'Pác / Na (Tày–Nùng dili: ağız, tarla) → Kuzeydoğu sınır dağları.' },
    { re: /^(vam|rach|xeo|soc)$/, regions: ['md'], t: 'Vàm / Rạch / Xẻo / Sóc: kanal, nehir ağzı ve Khmer sözcükleri → Mekong Deltası.' },
    { re: /^phan$/, regions: ['scc'], t: 'Phan… (Phan Rang, Phan Thiết): Cham kökenli ad → güney orta kıyı.' },
    { re: /^thu$/, regions: ['se'], t: 'Thủ… (Thủ Dầu Một, Thủ Đức): eski karakol adları → Saygon çevresi (zayıf ipucu).' },
    { re: /^long$/, half: 'S', t: 'Long… (Long Xuyên, Long Thành): çoğunlukla Güney (zayıf ipucu).' }
  ];

  /* ---------- Quiz maddeleri: "hece / önek → nerede?" ---------- */
  /* ans.t: 'h' = Kuzey/Güney yarı · 'm' = Kuzey/Orta/Güney · 'r' = 8 bölgeden biri */
  var SYLQ = [
    { id: 'binh-end', p: '…Bình (adın SONUNDA)', ex: 'Thái Bình · Ninh Bình · Hòa Bình · Quảng Bình', ans: { t: 'h', id: 'N' }, why: 'Bình adın sonundaysa il Kuzey yarıdadır (4/4).', ids: ['thai-binh', 'ninh-binh', 'hoa-binh', 'quang-binh'] },
    { id: 'binh-start', p: 'Bình… (adın BAŞINDA)', ex: 'Bình Định · Bình Thuận · Bình Dương · Bình Phước', ans: { t: 'h', id: 'S' }, why: 'Bình adın başındaysa il Güney yarıdadır (4/4).', ids: ['binh-dinh', 'binh-thuan', 'binh-duong', 'binh-phuoc'] },
    { id: 'quang', p: 'Quảng Bình · Quảng Trị · Quảng Nam · Quảng Ngãi', ex: 'Bình-Trị-Thiên, Nam-Ngãi', ans: { t: 'm', id: 'C' }, why: 'Quảng zinciri orta kıyıdadır (Trung Bộ). İstisna: Quảng Ninh en kuzeydoğuda.', ids: ['quang-binh', 'quang-tri', 'quang-nam', 'quang-ngai'] },
    { id: 'ha-bac', p: 'Hà- ya da Bắc- ile başlayan iller', ex: 'Hà Nội · Hà Giang · Bắc Ninh · Bắc Giang', ans: { t: 'h', id: 'N' }, why: 'Hà (nehir) ve Bắc (kuzey) ile başlayan 7 ilin 7’si Kuzey yarıdadır.', ids: ['ha-noi', 'ha-giang', 'ha-nam', 'ha-tinh', 'bac-giang', 'bac-ninh', 'bac-kan'] },
    { id: 'nam-trap', p: 'Hà Nam · Nam Định (“Nam” = güney?)', ex: 'Nam = o günün başkentine göre güney', ans: { t: 'h', id: 'N' }, why: 'Nam tuzağı: ikisi de Kızıl Nehir Deltası’nda, yani KUZEY’de.', ids: ['ha-nam', 'nam-dinh'] },
    { id: 'tnt', p: 'Thanh Hóa · Nghệ An · Hà Tĩnh', ex: 'Thanh–Nghệ–Tĩnh', ans: { t: 'r', id: 'ncc' }, why: 'Üçlü Kuzey Orta Kıyı’dadır; kuzeyden güneye Thanh → Nghệ → Tĩnh.', ids: ['thanh-hoa', 'nghe-an', 'ha-tinh'] },
    { id: 'dak', p: 'Đắk · Kon · Gia (il adı öneki)', ex: 'Đắk Lắk · Kon Tum · Gia Lai', ans: { t: 'r', id: 'ch' }, why: 'Đắk (su), Kon (köy), Gia (Jarai) yayla halklarının sözcükleridir → Orta Yaylalar.', ids: ['dak-lak', 'dak-nong', 'kon-tum', 'gia-lai'] },
    { id: 'buon', p: 'Buôn · Plei · Chư · Krông · Ea (yer adı öneki)', ex: 'Buôn Ma Thuột · Pleiku · Krông Nô', ans: { t: 'r', id: 'ch' }, why: 'Yer adlarında da aynı yayla sözcükleri çıkar → Orta Yaylalar.', ids: ['dak-lak', 'gia-lai', 'dak-nong'] },
    { id: 'loc', p: 'Cà Mau · Sóc Trăng · Trà Vinh · Bạc Liêu · Bến Tre · Cần Thơ', ex: 'Çince çözülmeyen yerel adlar', ans: { t: 'r', id: 'md' }, why: 'Heceleri Çince okunamayan yerel/Khmer adların 6’sı da Mekong Deltası’ndadır.', ids: ['ca-mau', 'soc-trang', 'tra-vinh', 'bac-lieu', 'ben-tre', 'can-tho'] },
    { id: 'vam', p: 'Vàm · Rạch · Xẻo · Sóc (yer adı öneki)', ex: 'Vàm Cỏ · Rạch Giá · Xẻo Quít · Sóc Trăng', ans: { t: 'r', id: 'md' }, why: 'Kanal ve nehir ağzı sözcükleri Mekong Deltası’na özgüdür.', ids: ['long-an', 'kien-giang', 'dong-thap', 'soc-trang'] },
    { id: 'tien-hau', p: 'Tiền Giang · Hậu Giang', ex: 'Tiền = ön, Hậu = arka', ans: { t: 'r', id: 'md' }, why: 'Mekong’un ön (Tiền) ve arka (Hậu) kolu: ikisi de delta’nın ortasında.', ids: ['tien-giang', 'hau-giang'] },
    { id: 'muong', p: 'Mường · Bản · Pù (yer adı öneki)', ex: 'Mường Phăng · Bản Giốc · Pù Luông', ans: { t: 'h', id: 'N' }, why: 'Tai dilli dağ halklarının sözcükleri → Kuzey’in dağlık kesimi.', ids: ['dien-bien', 'cao-bang', 'thanh-hoa'] },
    { id: 'thuan', p: '…Thuận (Ninh Thuận · Bình Thuận)', ex: 'Eski Thuận Hải', ans: { t: 'r', id: 'scc' }, why: 'Thuận, Vietnam’ın en kurak kıyısı olan güney orta kıyıyı işaret eder.', ids: ['ninh-thuan', 'binh-thuan'] },
    { id: 'phan', p: 'Phan… (Phan Rang · Phan Thiết)', ex: 'Cham kökenli adlar', ans: { t: 'r', id: 'scc' }, why: 'Phan… Cham kıyısını (Ninh Thuận, Bình Thuận) gösterir.', ids: ['ninh-thuan', 'binh-thuan'] },
    { id: 'son', p: 'Sơn (dağ): Lạng Sơn · Sơn La', ex: 'dağlık iller', ans: { t: 'h', id: 'N' }, why: 'İl adında Sơn gören dağlık Kuzey’i düşünsün (2/2).', ids: ['lang-son', 'son-la'] },
    { id: 'hai', p: 'Hải (deniz): Hải Phòng · Hải Dương', ex: 'doğu delta kıyısı', ans: { t: 'r', id: 'rrd' }, why: 'İkisi de Kızıl Nehir Deltası’nın doğusunda, denize yakın.', ids: ['hai-phong', 'hai-duong'] },
    { id: 'tay', p: 'Tây Ninh (Tây = batı)', ex: 'Saygon’un batısı', ans: { t: 'r', id: 'se' }, why: 'Tây Ninh Güneydoğu’da, Saygon’un batısında, Kamboçya sınırında.', ids: ['tay-ninh'] },
    { id: 'phuoc', p: 'Phước (福’nin Güney okunuşu)', ex: 'Bình Phước · Phước Long', ans: { t: 'h', id: 'S' }, why: 'Aynı karakteri Kuzey “Phúc”, Güney “Phước” okur: Phước → Güney.', ids: ['binh-phuoc'] },
    { id: 'phuc', p: 'Phúc (福’nin Kuzey okunuşu)', ex: 'Vĩnh Phúc · Phúc Yên', ans: { t: 'h', id: 'N' }, why: 'Phúc → Kuzey; Güney aynı karakteri “Phước” okur.', ids: ['vinh-phuc'] }
  ];
  var sylqById = {};
  SYLQ.forEach(function (x) { sylqById[x.id] = x; });

  /* ---------- eski birleşik adlar (1975-76 → 1989-97) ---------- */
  var HIST = [
    { n: 'Nghệ Tĩnh', t: 'Nghệ An + Hà Tĩnh', ids: ['nghe-an', 'ha-tinh'] },
    { n: 'Bình Trị Thiên', t: 'Quảng Bình + Quảng Trị + Thừa Thiên', ids: ['quang-binh', 'quang-tri', 'thua-thien-hue'] },
    { n: 'Nghĩa Bình', t: 'Quảng Ngãi + Bình Định', ids: ['quang-ngai', 'binh-dinh'] },
    { n: 'Phú Khánh', t: 'Phú Yên + Khánh Hòa', ids: ['phu-yen', 'khanh-hoa'] },
    { n: 'Thuận Hải', t: 'Ninh Thuận + Bình Thuận', ids: ['ninh-thuan', 'binh-thuan'] },
    { n: 'Hà Nam Ninh', t: 'Hà Nam + Nam Định + Ninh Bình', ids: ['ha-nam', 'nam-dinh', 'ninh-binh'] },
    { n: 'Vĩnh Phú', t: 'Vĩnh Phúc + Phú Thọ', ids: ['vinh-phuc', 'phu-tho'] },
    { n: 'Hải Hưng', t: 'Hải Dương + Hưng Yên', ids: ['hai-duong', 'hung-yen'] },
    { n: 'Bắc Thái', t: 'Bắc Kạn + Thái Nguyên', ids: ['bac-kan', 'thai-nguyen'] },
    { n: 'Hà Tuyên', t: 'Hà Giang + Tuyên Quang', ids: ['ha-giang', 'tuyen-quang'] }
  ];

  /* ---------- bölge adı çözücü ---------- */
  var GLOSS = [
    { id: 'ne', vi: 'Đông Bắc Bộ', parts: [['Đông', 'doğu'], ['Bắc', 'kuzey'], ['Bộ', 'kesim']], tr: 'Doğu-kuzey kesim' },
    { id: 'nw', vi: 'Tây Bắc Bộ', parts: [['Tây', 'batı'], ['Bắc', 'kuzey'], ['Bộ', 'kesim']], tr: 'Batı-kuzey kesim' },
    { id: 'rrd', vi: 'Đồng bằng sông Hồng', parts: [['Đồng bằng', 'ova'], ['sông', 'nehir'], ['Hồng', 'kızıl']], tr: 'Kızıl Nehir ovası' },
    { id: 'ncc', vi: 'Bắc Trung Bộ', parts: [['Bắc', 'kuzey'], ['Trung', 'orta'], ['Bộ', 'kesim']], tr: 'Kuzey-orta kesim' },
    { id: 'scc', vi: 'Duyên hải Nam Trung Bộ', parts: [['Duyên hải', 'kıyı şeridi'], ['Nam', 'güney'], ['Trung Bộ', 'orta kesim']], tr: 'Orta kesimin güney kıyı şeridi' },
    { id: 'ch', vi: 'Tây Nguyên', parts: [['Tây', 'batı'], ['Nguyên', 'plato']], tr: 'Batı platosu' },
    { id: 'se', vi: 'Đông Nam Bộ', parts: [['Đông', 'doğu'], ['Nam', 'güney'], ['Bộ', 'kesim']], tr: 'Doğu-güney kesim' },
    { id: 'md', vi: 'Đồng bằng sông Cửu Long', parts: [['Đồng bằng', 'ova'], ['sông', 'nehir'], ['Cửu Long', 'dokuz ejder']], tr: 'Dokuz Ejder Nehri (Mekong) ovası' }
  ];
  var MACRO_GLOSS = [
    { id: 'N', vi: 'Bắc Bộ', tr: 'Kuzey kesim', old: 'Tonkin (eski Fransız adı: Bắc Kỳ)' },
    { id: 'C', vi: 'Trung Bộ', tr: 'Orta kesim', old: 'Annam (eski ad: Trung Kỳ)' },
    { id: 'S', vi: 'Nam Bộ', tr: 'Güney kesim', old: 'Cochinchine (eski ad: Nam Kỳ)' }
  ];

  /* ---------- ALAN KODU mantığı ---------- */
  var AREA = {
    /* ikinci hane süpürmesi (0 2 ·x· ·): kuzeyden güneye */
    sweep: [
      { k: '20', d: '0', t: 'Kuzeydoğu', n: 'Çin sınırı dağları, Hạ Long' },
      { k: '21', d: '1', t: 'Kuzeybatı', n: 'Yüksek dağlar, Laos sınırı' },
      { k: '22', d: '2', t: 'Kızıl Nehir Deltası', n: 'Hà Nội’nin doğusu ve güneyi' },
      { k: '23', d: '3', t: 'Kuzey Orta Kıyı', n: 'Thanh Hóa’dan Đà Nẵng’e' },
      { k: '24', d: '4', t: 'Hà Nội', n: 'iki haneli: eski 04 → 24' },
      { k: '25', d: '5', t: 'Güney Orta Kıyı', n: 'Quảng Ngãi’den Ninh Thuận’a' },
      { k: '26', d: '6', t: 'Orta Yaylalar', n: 'Kon Tum’dan Lâm Đồng’a' },
      { k: '27', d: '7', t: 'Saygon halkası', n: 'Güneydoğu + yukarı Mekong' },
      { k: '28', d: '8', t: 'TP. Hồ Chí Minh', n: 'iki haneli: eski 08 → 28' },
      { k: '29', d: '9', t: 'Aşağı Mekong', n: 'Cà Mau’ya kadar' }
    ],
    lead: 'Sabit hat numarası 02 ile başlar; “2”den sonraki hane bölgeyi seçer ve değer büyüdükçe kuzeyden güneye inersin (tek istisna: Hà Nội’in 4’ü). 20·21·22 kuzey, 23 kuzey orta kıyı, 24 Hà Nội, 25 güney orta kıyı, 26 yaylalar, 27 Saygon halkası, 28 Saygon, 29 Mekong.',
    two: 'İki büyük şehir iki haneli kod alır ve eski kodlarının başına “2” eklenmiştir: Hà Nội 04 → 24, TP.HCM 08 → 28. Diğer 61 il üç haneli koddur.',
    /* kuzeyden güneye giden alan kodu merdivenleri (verify-names.cjs merkez noktalarıyla denetler) */
    ladders: [
      { id: 'tnt', label: 'Thanh · Nghệ · Tĩnh', codes: ['237', '238', '239'], ids: ['thanh-hoa', 'nghe-an', 'ha-tinh'], note: 'Son hane büyüdükçe güneye iner.' },
      { id: 'qbh', label: 'Quảng Bình → Huế', codes: ['232', '233', '234'], ids: ['quang-binh', 'quang-tri', 'thua-thien-hue'], note: 'Bình · Trị · Huế sırası.' },
      { id: 'sc', label: 'Güney orta kıyı', codes: ['255', '256', '257', '258', '259'], ids: ['quang-ngai', 'binh-dinh', 'phu-yen', 'khanh-hoa', 'ninh-thuan'], note: 'Quảng Ngãi’den Ninh Thuận’a, ardından 252 Bình Thuận en güneyde.' }
    ],
    swap: { codes: ['235', '236'], ids: ['quang-nam', 'da-nang'], note: '235 = Quảng Nam, 236 = Đà Nẵng: ters sıra. Đà Nẵng aslında Quảng Nam’ın kuzeyinde.' },
    /* 29x kümeleri */
    clusters: [
      { codes: ['290', '291'], ids: ['ca-mau', 'bac-lieu'], t: 'En güney uç', n: 'Cà Mau · Bạc Liêu' },
      { codes: ['292', '293'], ids: ['can-tho', 'hau-giang'], t: 'Delta’nın ortası', n: 'Cần Thơ · Hậu Giang' },
      { codes: ['294', '299'], ids: ['tra-vinh', 'soc-trang'], t: 'Doğu kıyı', n: 'Trà Vinh · Sóc Trăng' },
      { codes: ['296', '297'], ids: ['an-giang', 'kien-giang'], t: 'Batı (Kamboçya + Körfez)', n: 'An Giang · Kiên Giang' }
    ],
    ring: 'Saygon halkası (27x): 271 Bình Phước, 274 Bình Dương, 276 Tây Ninh Saygon’un kuzeyi–kuzeybatısı; 270 Vĩnh Long, 272 Long An, 273 Tiền Giang, 275 Bến Tre, 277 Đồng Tháp Saygon’un batısı–güneyi (yukarı Mekong). Sıra yok; yalnızca “halka” olarak bil.',
    delta: 'Kızıl Nehir (22x): 220–225 Hà Nội’nin doğusu (Hải Dương, Hưng Yên, Bắc Ninh, Hải Phòng); 226–229 deltanın güney yarısı (Hà Nam, Thái Bình, Nam Định, Ninh Bình).',
    exceptions: [
      ['Hà Giang 219, Hòa Bình 218, Phú Thọ 210, Vĩnh Phúc 211', 'Kuzey iller ama 21x ailesinde (Kuzeybatı bloğuna eklenmişler).'],
      ['Đồng Nai 251, Bà Rịa–Vũng Tàu 254', 'Güneydoğu iller ama 25x (güney orta kıyı) bloğunda “konuk”.'],
      ['Gia Lai 269', 'Yayla ailesinde (26x) ama son haneden dolayı sıra dışı.'],
      ['Quảng Nam 235 · Đà Nẵng 236', 'Kuzeyden güneye sıra ters (yukarıdaki not).'],
      ['Hà Nội 24 · TP.HCM 28', 'İki haneli kod, iki şehrin eski kodlarının başına “2” eklenmiş hali.']
    ]
  };

  /* ---------- küçük yardımcılar ---------- */
  /* "sol→sağ" harf maskesi: "Hà Giang" → "H_ G____" */
  function letters(name) {
    return String(name).split(/(\s+|–|-)/).map(function (w) {
      if (!w || /^(\s+|–|-)$/.test(w)) return w;
      return w.charAt(0) + new Array(Math.max(1, w.length)).join('_');
    }).join('');
  }

  /* Metindeki verilen adların geçtiği yerleri (aksan/harf büyüklüğü fark etmez, sözcük sınırıyla) ??? yap */
  function maskText(text, variants) {
    var src = String(text), vs = (variants || []).map(function (v) { return norm(v); }).filter(function (v) { return v.length >= 2; });
    if (!vs.length) return src;
    vs.sort(function (a, b) { return b.length - a.length; });
    var nstr = '', map = [], i, c, nc, j;
    for (i = 0; i < src.length; i++) {
      c = src.charAt(i); nc = norm(c);
      for (j = 0; j < nc.length; j++) { nstr += nc.charAt(j); map.push(i); }
    }
    var isL = function (ch) { return /[A-Za-z0-9À-ỹ]/.test(ch || ''); };
    var spans = [], pos, v, k, idx, s0, e0;
    for (k = 0; k < vs.length; k++) {
      v = vs[k]; pos = 0;
      while ((idx = nstr.indexOf(v, pos)) >= 0) {
        s0 = map[idx]; e0 = map[idx + v.length - 1];
        pos = idx + v.length;
        if (isL(src.charAt(s0 - 1))) continue;
        if (isL(src.charAt(e0 + 1))) {
          /* sözcük ortasında bitiyorsa (ör. "Huế" → "Huế’nin") yalnızca ek bir tırnak veya boşluksa kabul */
          continue;
        }
        spans.push([s0, e0]);
      }
    }
    if (!spans.length) return src;
    spans.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    var out = '', last = 0;
    spans.forEach(function (sp) {
      if (sp[0] < last) return;
      out += src.slice(last, sp[0]) + '???';
      last = sp[1] + 1;
    });
    return out + src.slice(last);
  }
  /* il için maske varyantları */
  function variantsOf(o) {
    var out = [o.vi, o.vi.replace(/^TP\.\s*/, ''), o.ascii, o.en].concat(o.alias || []);
    if (o.cap) out.push(o.cap);
    return out.filter(Boolean);
  }
  function mask(text, o) { return maskText(text, variantsOf(o)); }

  g.Names = {
    FAMS: FAMS, famById: famById, ST: ST, INFO: INFO, RULES: RULES, SYLX: SYLX, SYLQ: SYLQ, sylqById: sylqById, HIST: HIST,
    GLOSS: GLOSS, MACRO_GLOSS: MACRO_GLOSS, AREA: AREA, PLACE_CUES: PLACE_CUES, WISH: WISH,
    NORTH: NORTH, SOUTH: SOUTH, half: half,
    info: info, famOf: famOf, famIds: famIds, stLabel: stLabel, counts: counts,
    letters: letters, maskText: maskText, mask: mask, variantsOf: variantsOf
  };
})(typeof window !== 'undefined' ? window : globalThis);

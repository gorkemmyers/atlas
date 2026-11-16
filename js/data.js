/* Việt Atlas — ana veri seti (63 il, bölgeler, alan kodları).
   Kaynaklar: Telefon alan kodları (Wikipedia "Telephone numbers in Vietnam", Bakanlık yazısı 2784/BKHCN-CVT). */
(function (root) {
  'use strict';

  function norm(s) {
    return String(s == null ? '' : s)
      .replace(/İ/g, 'i').replace(/ı/g, 'i')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[đĐ]/g, 'd').toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  /* ---------- Bölgeler ---------- */
  var MACROS = [
    { id: 'N', vi: 'Bắc Bộ', tr: 'Kuzey' },
    { id: 'C', vi: 'Trung Bộ', tr: 'Orta' },
    { id: 'S', vi: 'Nam Bộ', tr: 'Güney' }
  ];

  var REGIONS = [
    { id: 'ne', vi: 'Đông Bắc Bộ', tr: 'Kuzeydoğu', short: 'Kuzeydoğu', macro: 'N',
      cue: "Çin sınırı boyunca karstik kayalıklar ve dağlar (Hà Giang, Cao Bằng), çay tepeleri (Thái Nguyên), Hạ Long Körfezi kıyısı ve kömür havzası (Quảng Ninh). Tày, Nùng, Dao halkları. Alan kodları 20x ailesidir." },
    { id: 'nw', vi: 'Tây Bắc Bộ', tr: 'Kuzeybatı', short: 'Kuzeybatı', macro: 'N',
      cue: "Ülkenin en yüksek dağları (Hoàng Liên Sơn, Fansipan 3.143 m), teraslı pirinç tarlaları (Sa Pa, Mù Cang Chải), derin vadiler, Laos sınırı. Hmong, Thái, Dao kıyafetleri. Alan kodları çoğunlukla 21x ailesidir." },
    { id: 'rrd', vi: 'Đồng bằng sông Hồng', tr: 'Kızıl Nehir Deltası', short: 'Kızıl Nehir', macro: 'N',
      cue: "Çok yoğun nüfus, dümdüz pirinç tarlaları, dar ve yüksek “tüp evler”, nehir setleri, sanayi parkları. Karstik tepeler yalnızca Ninh Bình–Hà Nam çevresinde. Alan kodları 22x ailesi (+ Hà Nội 24)." },
    { id: 'ncc', vi: 'Bắc Trung Bộ', tr: 'Kuzey Orta Kıyı', short: 'K. Orta Kıyı', macro: 'C',
      cue: "Dar kıyı şeridi, uzun köy şeritleri boyunca Quốc lộ 1A, kıyıda kum tepeleri ve rüzgâr perdesi ağaçları, batıda Trường Sơn dağları ve Laos sınırı. Alan kodları 23x ailesi." },
    { id: 'scc', vi: 'Duyên hải Nam Trung Bộ', tr: 'Güney Orta Kıyı', short: 'G. Orta Kıyı', macro: 'C',
      cue: "Çok dar kıyı, uzun plajlar, balıkçı tekneleri, Cham kuleleri, kum tepeleri ve kurak iklim (Ninh Thuận–Bình Thuận), tuz tarlaları, rüzgâr/güneş çiftlikleri. Alan kodları 25x ailesi." },
    { id: 'ch', vi: 'Tây Nguyên', tr: 'Orta Yaylalar', short: 'Yaylalar', macro: 'C',
      cue: "Kırmızı bazalt toprak, kahve–karabiber–kauçuk tarlaları, çam ormanları (Đà Lạt), dalgalı platolar, Ede/Jarai/Bahnar köyleri ve “nhà rông” ortak evleri. Alan kodları 26x ailesi." },
    { id: 'se', vi: 'Đông Nam Bộ', tr: 'Güneydoğu', short: 'Güneydoğu', macro: 'S',
      cue: "Saygon çevresinde yoğun trafik ve sanayi parkları, kauçuk ve kaju (kaşu) plantasyonları, geniş otoyollar, Kamboçya sınırı. Alan kodları 27x ailesi + 28 (TP.HCM) + 251/254." },
    { id: 'md', vi: 'Đồng bằng sông Cửu Long', tr: 'Mekong Deltası', short: 'Mekong', macro: 'S',
      cue: "Dümdüz arazi, kanallar ve köprüler, hindistan cevizi palmiyeleri, kanal kenarında dizili evler, yüzen pazarlar, karides havuzları, Khmer pagodaları (Trà Vinh, Sóc Trăng, An Giang). Alan kodları 27x (kuzey) ve 29x (güney)." }
  ];

  /* ---------- 63 il ----------
     [id, vi, tip(c=şehir,p=il), bölge, merkez, alan kodu, ipucu, yerler] */
  var P = [
    // — Kuzeydoğu —
    ['ha-giang', 'Hà Giang', 'p', 'ne', 'Hà Giang', '219', "Vietnam’ın en kuzeyi: Đồng Văn karst platosu, Mã Pì Lèng geçidi ve ünlü “Hà Giang Loop” motosiklet rotası.", 'Đồng Văn|Mã Pì Lèng|Mèo Vạc|Quản Bạ|Hoàng Su Phì'],
    ['cao-bang', 'Cao Bằng', 'p', 'ne', 'Cao Bằng', '206', "Çin sınırında; Bản Giốc şelalesi, Pác Bó mağarası ve karstik vadiler.", 'Bản Giốc|Pác Bó|Trùng Khánh|Nguom Ngao Mağarası'],
    ['bac-kan', 'Bắc Kạn', 'p', 'ne', 'Bắc Kạn', '209', "Ba Bể Gölü’nün ili; dağlık, seyrek nüfuslu ve ormanlık.", 'Ba Bể Gölü|Chợ Đồn|Na Rì'],
    ['tuyen-quang', 'Tuyên Quang', 'p', 'ne', 'Tuyên Quang', '207', "Tân Trào direniş üssü ile Na Hang–Lâm Bình göl ve orman bölgesi.", 'Tân Trào|Na Hang|Lâm Bình|Chiêm Hóa|Sơn Dương'],
    ['lang-son', 'Lạng Sơn', 'p', 'ne', 'Lạng Sơn', '205', "Çin’e açılan ana kara kapısı: Hữu Nghị (Đồng Đăng) sınır kapısı ve Tam Thanh mağarası.", 'Đồng Đăng|Hữu Nghị Kapısı|Tam Thanh Mağarası|Mẫu Sơn'],
    ['thai-nguyen', 'Thái Nguyên', 'p', 'ne', 'Thái Nguyên', '208', "Vietnam’ın çay başkenti (Tân Cương) ve önemli üniversite–sanayi merkezi.", 'Tân Cương|Hồ Núi Cốc|Đại Từ|Phổ Yên'],
    ['phu-tho', 'Phú Thọ', 'p', 'ne', 'Việt Trì', '210', "Hùng Kralları’nın (Đền Hùng) bölgesi: Vietnam’ın efsanevi kuruluş yeri; Việt Trì’de nehirler buluşur.", 'Đền Hùng|Việt Trì|Xuân Sơn|Thanh Thủy'],
    ['bac-giang', 'Bắc Giang', 'p', 'ne', 'Bắc Giang', '204', "Lục Ngạn lychee (vải) bahçeleri ve Tây Yên Tử dağlık alanı.", 'Lục Ngạn|Yên Thế|Sơn Động|Lạng Giang'],
    ['quang-ninh', 'Quảng Ninh', 'p', 'ne', 'Hạ Long', '203', "Hạ Long Körfezi, kömür madenleri, Móng Cái sınır kapısı; Vân Đồn–Cô Tô adaları.", 'Hạ Long|Móng Cái|Cẩm Phả|Uông Bí|Vân Đồn|Cô Tô|Yên Tử'],
    // — Kuzeybatı —
    ['lai-chau', 'Lai Châu', 'p', 'nw', 'Lai Châu', '213', "Çin sınırında yüksek platolar; Sìn Hồ, Phong Thổ ve Pu Sam Cap dağı.", 'Sìn Hồ|Phong Thổ|Tam Đường|Than Uyên'],
    ['dien-bien', 'Điện Biên', 'p', 'nw', 'Điện Biên Phủ', '215', "1954 Điện Biên Phủ muharebesi (Fransız sömürge yönetiminin sonu); Laos sınırı.", 'Điện Biên Phủ|Mường Phăng|Mường Lay|Tủa Chùa'],
    ['son-la', 'Sơn La', 'p', 'nw', 'Sơn La', '212', "Mộc Châu çay ve süt platosu; Sơn La hidroelektrik barajı ve Laos sınırı.", 'Mộc Châu|Sơn La Barajı|Mai Sơn|Yên Châu'],
    ['hoa-binh', 'Hòa Bình', 'p', 'nw', 'Hòa Bình', '218', "Hanoi’nin batısındaki kapı; Mường halkı, Hòa Bình barajı gölü ve Mai Châu vadisi.", 'Mai Châu|Hòa Bình Barajı|Kim Bôi|Lương Sơn'],
    ['lao-cai', 'Lào Cai', 'p', 'nw', 'Lào Cai', '214', "Sa Pa ve Fansipan (3.143 m): Hint Çini’nin çatısı; Çin sınır kapısı.", 'Sa Pa|Fansipan|Bắc Hà|Bát Xát|Y Tý'],
    ['yen-bai', 'Yên Bái', 'p', 'nw', 'Yên Bái', '216', "Mù Cang Chải teraslı pirinç tarlaları ve Thác Bà gölü.", 'Mù Cang Chải|Nghĩa Lộ|Thác Bà Gölü|Văn Chấn'],
    // — Kızıl Nehir Deltası —
    ['ha-noi', 'Hà Nội', 'c', 'rrd', 'Hà Nội', '24', "Başkent: Hoàn Kiếm Gölü, Eski Mahalle, Batı Gölü; batıda Ba Vì ve Hương Sơn.", 'Hoàn Kiếm|Eski Mahalle|Hồ Tây|Ba Vì|Sơn Tây|Hương Sơn|Mỹ Đức'],
    ['hai-phong', 'Hải Phòng', 'c', 'rrd', 'Hải Phòng', '225', "Kuzeyin büyük limanı; Cát Bà adası, Đồ Sơn plajı ve Bạch Long Vĩ adası.", 'Cát Bà|Đồ Sơn|Bạch Long Vĩ|Thủy Nguyên'],
    ['vinh-phuc', 'Vĩnh Phúc', 'p', 'rrd', 'Vĩnh Yên', '211', "Hanoi’nin kuzeyi: Tam Đảo dağ tatil beldesi ve sanayi parkları.", 'Tam Đảo|Vĩnh Yên|Phúc Yên|Tây Thiên|Đại Lải Gölü'],
    ['bac-ninh', 'Bắc Ninh', 'p', 'rrd', 'Bắc Ninh', '222', "Yüzölçümüyle Vietnam’ın en küçük ili; Quan họ halk müziği ve yoğun sanayi.", 'Từ Sơn|Đền Đô|Chùa Dâu|Yên Phong'],
    ['hai-duong', 'Hải Dương', 'p', 'rrd', 'Hải Dương', '220', "Hanoi–Hải Phòng arasında; Côn Sơn–Kiếp Bạc tapınak kompleksi.", 'Chí Linh|Côn Sơn – Kiếp Bạc|Thanh Hà|Nam Sách'],
    ['hung-yen', 'Hưng Yên', 'p', 'rrd', 'Hưng Yên', '221', "Longan (nhãn) meyvesi ve eski ticaret limanı Phố Hiến.", 'Phố Hiến|Văn Giang|Mỹ Hào|Khoái Châu'],
    ['thai-binh', 'Thái Bình', 'p', 'rrd', 'Thái Bình', '227', "Kızıl Nehir deltasının pirinç ambarı; Tiền Hải kıyısı.", 'Tiền Hải|Đồng Châu|Cồn Vành|Kiến Xương'],
    ['ha-nam', 'Hà Nam', 'p', 'rrd', 'Phủ Lý', '226', "Hanoi’nin hemen güneyi; Tam Chúc pagodası ve Kim Bảng karstları.", 'Phủ Lý|Tam Chúc|Kim Bảng|Duy Tiên'],
    ['nam-dinh', 'Nam Định', 'p', 'rrd', 'Nam Định', '228', "Trần hanedanı ile bağlı; Xuân Thủy kuş cenneti (Ramsar) ve Phủ Dầy.", 'Xuân Thủy|Phủ Dầy|Hải Hậu|Giao Thủy'],
    ['ninh-binh', 'Ninh Bình', 'p', 'rrd', 'Ninh Bình', '229', "“Karada Hạ Long”: Tràng An, Tam Cốc, eski başkent Hoa Lư ve Phát Diệm kilisesi.", 'Tràng An|Tam Cốc|Hoa Lư|Phát Diệm|Cúc Phương'],
    // — Kuzey Orta Kıyı —
    ['thanh-hoa', 'Thanh Hóa', 'p', 'ncc', 'Thanh Hóa', '237', "Kuzeyin en kalabalık illerinden; Sầm Sơn plajı, Hồ Hanedanı Kalesi (UNESCO) ve Pù Luông.", 'Sầm Sơn|Hồ Kalesi|Pù Luông|Bến En|Lam Kinh'],
    ['nghe-an', 'Nghệ An', 'p', 'ncc', 'Vinh', '238', "Vietnam’ın en geniş ili; Hồ Chí Minh’in memleketi (Kim Liên), Cửa Lò plajı, Pù Mát.", 'Vinh|Cửa Lò|Kim Liên|Pù Mát|Quỳ Châu'],
    ['ha-tinh', 'Hà Tĩnh', 'p', 'ncc', 'Hà Tĩnh', '239', "Dar kıyı şeridi; Thiên Cầm plajı, Hồng Lĩnh dağı ve Vũ Quang ormanı.", 'Thiên Cầm|Ngã ba Đồng Lộc|Kỳ Anh|Vũ Quang'],
    ['quang-binh', 'Quảng Bình', 'p', 'ncc', 'Đồng Hới', '232', "Phong Nha–Kẻ Bàng mağaraları (UNESCO) ve dünyanın en büyük mağarası Sơn Đoòng.", 'Phong Nha|Sơn Đoòng|Đồng Hới|Bàu Trắng|Nhật Lệ'],
    ['quang-tri', 'Quảng Trị', 'p', 'ncc', 'Đông Hà', '233', "Eski DMZ (17. paralel, Bến Hải Nehri); Khe Sanh, Vĩnh Mốc tünelleri ve Cồn Cỏ adası.", 'Đông Hà|Khe Sanh|Vĩnh Mốc|Cồn Cỏ|Quảng Trị Kalesi'],
    ['thua-thien-hue', 'Thừa Thiên Huế', 'p', 'ncc', 'Huế', '234', "Eski imparatorluk başkenti: Huế Kalesi, Parfüm Nehri, Lăng Cô ve Bạch Mã.", 'Huế Kalesi|Thiên Mụ Pagodası|Lăng Cô|Bạch Mã|Thuận An'],
    // — Güney Orta Kıyı —
    ['da-nang', 'Đà Nẵng', 'c', 'scc', 'Đà Nẵng', '236', "Orta Vietnam’ın en büyük şehri: Mỹ Khê plajı, Bà Nà Hills, Ngũ Hành Sơn ve Hải Vân Geçidi.", 'Mỹ Khê|Bà Nà Hills|Sơn Trà|Ngũ Hành Sơn|Hải Vân Geçidi'],
    ['quang-nam', 'Quảng Nam', 'p', 'scc', 'Tam Kỳ', '235', "Hội An (UNESCO), Mỹ Sơn (Cham tapınakları) ve Cù Lao Chàm adaları.", 'Hội An|Mỹ Sơn|Cù Lao Chàm|Tam Kỳ|Ngọc Linh'],
    ['quang-ngai', 'Quảng Ngãi', 'p', 'scc', 'Quảng Ngãi', '255', "Lý Sơn volkanik adası (sarımsak), Dung Quất rafinerisi ve Sa Huỳnh.", 'Lý Sơn|Dung Quất|Sa Huỳnh|Ba Tơ'],
    ['binh-dinh', 'Bình Định', 'p', 'scc', 'Quy Nhơn', '256', "Quy Nhơn sahili, Kỳ Co–Eo Gió, Cham kuleleri ve geleneksel Võ Bình Định dövüş sanatı.", 'Quy Nhơn|Kỳ Co|Eo Gió|Tháp Đôi|Phương Mai'],
    ['phu-yen', 'Phú Yên', 'p', 'scc', 'Tuy Hòa', '257', "Gành Đá Đĩa bazalt sütunları, Mũi Điện (Đại Lãnh) burnu ve Vũng Rô koyu.", 'Gành Đá Đĩa|Mũi Điện|Tuy Hòa|Vũng Rô'],
    ['khanh-hoa', 'Khánh Hòa', 'p', 'scc', 'Nha Trang', '258', "Nha Trang plajları ve dalış, Cam Ranh Körfezi ve Hòn Mun deniz parkı.", 'Nha Trang|Cam Ranh|Vạn Ninh|Ninh Hòa|Hòn Mun'],
    ['ninh-thuan', 'Ninh Thuận', 'p', 'scc', 'Phan Rang–Tháp Chàm', '259', "Vietnam’ın en kurak bölgesi: Cham kuleleri (Po Klong Garai), üzüm bağları ve rüzgâr/güneş çiftlikleri.", 'Phan Rang–Tháp Chàm|Po Klong Garai|Vĩnh Hy|Cà Ná|Núi Chúa'],
    ['binh-thuan', 'Bình Thuận', 'p', 'scc', 'Phan Thiết', '252', "Mũi Né kum tepeleri, ejder meyvesi (thanh long) ve Phú Quý adası.", 'Mũi Né|Phan Thiết|Phú Quý|Kê Gà|La Gi'],
    // — Orta Yaylalar —
    ['kon-tum', 'Kon Tum', 'p', 'ch', 'Kon Tum', '260', "Laos–Kamboçya sınırına yakın; Ngọc Linh ginsengi, ahşap kilise ve Măng Đen.", 'Kon Tum|Măng Đen|Ngọc Linh|Đắk Glei'],
    ['gia-lai', 'Gia Lai', 'p', 'ch', 'Pleiku', '269', "Biển Hồ (T’Nưng Gölü), kahve ve karabiber, Jarai–Bahnar köyleri.", 'Pleiku|Biển Hồ|Chư Đăng Ya|Kon Ka Kinh|An Khê'],
    ['dak-lak', 'Đắk Lắk', 'p', 'ch', 'Buôn Ma Thuột', '262', "Kahve başkenti Buôn Ma Thuột; Buôn Đôn fil bölgesi, Lắk Gölü ve Dray Nur şelalesi.", 'Buôn Ma Thuột|Buôn Đôn|Lắk Gölü|Dray Nur|Yok Đôn'],
    ['dak-nong', 'Đắk Nông', 'p', 'ch', 'Gia Nghĩa', '261', "Volkanik mağaralarıyla UNESCO Küresel Jeoparkı; Tà Đùng gölü ve boksit.", 'Gia Nghĩa|Tà Đùng|Krông Nô|Nâm Nung'],
    ['lam-dong', 'Lâm Đồng', 'p', 'ch', 'Đà Lạt', '263', "Đà Lạt: çam ormanları, serin iklim, çiçek serası; Bảo Lộc çay–kahve ve Langbiang.", 'Đà Lạt|Bảo Lộc|Langbiang|Tuyền Lâm Gölü|Di Linh'],
    // — Güneydoğu —
    ['binh-phuoc', 'Bình Phước', 'p', 'se', 'Đồng Xoài', '271', "Kauçuk ve kaju (kaşu) tarlaları, Kamboçya sınırı; Bà Rá dağı ve Bù Gia Mập ulusal parkı.", 'Đồng Xoài|Phước Long|Bù Gia Mập|Lộc Ninh|Bà Rá'],
    ['tay-ninh', 'Tây Ninh', 'p', 'se', 'Tây Ninh', '276', "Núi Bà Đen (Güney’in en yüksek dağı, 986 m), Cao Đài Kutsal Mabedi ve Kamboçya sınırı.", 'Núi Bà Đen|Cao Đài Tapınağı|Dầu Tiếng Gölü|Mộc Bài'],
    ['binh-duong', 'Bình Dương', 'p', 'se', 'Thủ Dầu Một', '274', "Saygon’un kuzey komşusu; sanayi parkları (VSIP), mobilya ve seramik.", 'Thủ Dầu Một|Dĩ An|Thuận An|Bến Cát|Tân Uyên'],
    ['dong-nai', 'Đồng Nai', 'p', 'se', 'Biên Hòa', '251', "Biên Hòa sanayi bölgeleri, Trị An hidroelektrik gölü ve Long Thành.", 'Biên Hòa|Long Thành|Trị An Gölü|Long Khánh'],
    ['ba-ria-vung-tau', 'Bà Rịa – Vũng Tàu', 'p', 'se', 'Bà Rịa', '254', "Vũng Tàu plajı ve İsa heykeli; Côn Đảo adaları (eski hapishane), Hồ Tràm ve petrol.", 'Vũng Tàu|Bà Rịa|Côn Đảo|Long Hải|Hồ Tràm'],
    ['ho-chi-minh', 'TP. Hồ Chí Minh', 'c', 'se', 'Hồ Chí Minh Şehri', '28', "Vietnam’ın en büyük şehri (Saygon): Bến Thành pazarı, Củ Chi tünelleri ve Cần Giờ mangrovları.", 'Bến Thành|Củ Chi|Cần Giờ|Thủ Đức|Nhà Bè'],
    // — Mekong Deltası —
    ['long-an', 'Long An', 'p', 'md', 'Tân An', '272', "Saygon’un güney kapısı; Đồng Tháp Mười sazlıkları ve Vàm Cỏ nehri.", 'Tân An|Bến Lức|Cần Giuộc|Đồng Tháp Mười|Vàm Cỏ'],
    ['tien-giang', 'Tiền Giang', 'p', 'md', 'Mỹ Tho', '273', "Mekong’un kapısı: Mỹ Tho, Thới Sơn adası ve Cái Bè yüzen pazarı.", 'Mỹ Tho|Thới Sơn|Cái Bè|Gò Công'],
    ['ben-tre', 'Bến Tre', 'p', 'md', 'Bến Tre', '275', "Hindistan cevizi diyarı; Mekong kolları arasındaki adalar.", 'Bến Tre|Ba Tri|Chợ Lách|Mỏ Cày|Thạnh Phú'],
    ['tra-vinh', 'Trà Vinh', 'p', 'md', 'Trà Vinh', '294', "Khmer kültürü ve pagodaları; Ba Động plajı ve Ao Bà Om.", 'Trà Vinh|Chùa Âng|Ao Bà Om|Ba Động|Duyên Hải'],
    ['vinh-long', 'Vĩnh Long', 'p', 'md', 'Vĩnh Long', '270', "Mekong meyve bahçeleri ve nehir adaları; Cù Lao An Bình.", 'Vĩnh Long|Cù Lao An Bình|Long Hồ|Bình Minh'],
    ['dong-thap', 'Đồng Tháp', 'p', 'md', 'Cao Lãnh', '277', "Sa Đéc çiçek köyleri, Tràm Chim ulusal parkı (turnalar) ve lotus alanları.", 'Sa Đéc|Cao Lãnh|Tràm Chim|Xẻo Quít|Hồng Ngự'],
    ['an-giang', 'An Giang', 'p', 'md', 'Long Xuyên', '296', "Châu Đốc, Yedi Dağ (Thất Sơn), Trà Sư ormanı ve Kamboçya sınırı; Cham–Müslüman köyleri.", 'Châu Đốc|Long Xuyên|Núi Sam|Núi Cấm|Trà Sư'],
    ['kien-giang', 'Kiên Giang', 'p', 'md', 'Rạch Giá', '297', "Phú Quốc adası, Hà Tiên, Nam Du ve Thổ Chu adaları; U Minh Thượng ormanı.", 'Phú Quốc|Hà Tiên|Rạch Giá|Nam Du|U Minh Thượng'],
    ['can-tho', 'Cần Thơ', 'c', 'md', 'Ninh Kiều', '292', "Mekong Deltası’nın başkenti; Cái Răng yüzen pazarı ve Ninh Kiều rıhtımı.", 'Ninh Kiều|Cái Răng|Phong Điền|Ô Môn|Thốt Nốt'],
    ['hau-giang', 'Hậu Giang', 'p', 'md', 'Vị Thanh', '293', "2004’te kurulan genç il; Ngã Bảy yüzen pazarı ve Vị Thanh.", 'Vị Thanh|Ngã Bảy|Long Mỹ|Châu Thành'],
    ['soc-trang', 'Sóc Trăng', 'p', 'md', 'Sóc Trăng', '299', "Khmer ve Hoa (Çinli) toplulukları; Chùa Dơi (Yarasa Pagodası) ve Kh’leang pagodası.", 'Sóc Trăng|Chùa Dơi|Kh’leang|Vĩnh Châu|Long Phú'],
    ['bac-lieu', 'Bạc Liêu', 'p', 'md', 'Bạc Liêu', '291', "Rüzgâr türbinli kıyı şeridi, tuz tarlaları ve “Công tử Bạc Liêu” efsanesi.", 'Bạc Liêu|Nhà Mát|Gành Hào|Hộ Phòng'],
    ['ca-mau', 'Cà Mau', 'p', 'md', 'Cà Mau', '290', "Anakara Vietnam’ın en güney ucu (Đất Mũi): mangrovlar, U Minh ormanı ve karides.", 'Cà Mau|Đất Mũi|Năm Căn|U Minh|Hòn Khoai']
  ];

  /* Yazarak cevaplarda kabul edilen ek yazımlar */
  var ALIAS = {
    'ha-noi': ['Hanoi', 'Ha Noi', 'Hà Nội'],
    'ho-chi-minh': ['Ho Chi Minh', 'Ho Chi Minh City', 'HCM', 'HCMC', 'TPHCM', 'TP HCM', 'Saigon', 'Sai Gon', 'Sài Gòn', 'Saygon', 'Ho Si Min'],
    'hai-phong': ['Haiphong', 'Hai Phong'],
    'da-nang': ['Danang', 'Da Nang'],
    'thua-thien-hue': ['Hue', 'Huế', 'Thua Thien Hue', 'TT Hue'],
    'ba-ria-vung-tau': ['Vung Tau', 'Ba Ria', 'BRVT', 'BR-VT', 'Ba Ria Vung Tau', 'Vũng Tàu', 'Bà Rịa'],
    'can-tho': ['Cantho'],
    'dak-lak': ['Daklak', 'Dac Lac', 'Dak Lac', 'Đắk Lắk'],
    'dak-nong': ['Daknong', 'Dac Nong', 'Đắk Nông'],
    'bac-kan': ['Bac Can', 'Backan'],
    'phu-tho': ['Phu Tho'],
    'quang-ninh': ['Ha Long', 'Halong'],
    'kien-giang': ['Phu Quoc'],
    'lam-dong': ['Da Lat', 'Dalat']
  };

  /* Türkçe/İngilizce yaygın ek adlar (arayüzde gösterilir) */
  var EN = {
    'ha-noi': 'Hanoi', 'ho-chi-minh': 'Ho Chi Minh Şehri (Saygon)', 'da-nang': 'Da Nang',
    'thua-thien-hue': 'Huế', 'hai-phong': 'Haiphong'
  };

  var FAMILIES = [
    { k: '20', tr: 'Kuzeydoğu (Đông Bắc)', hint: '203–209 → Quảng Ninh, Bắc Giang, Lạng Sơn, Cao Bằng, Tuyên Quang, Thái Nguyên, Bắc Kạn: hepsi Kuzeydoğu.' },
    { k: '21', tr: 'Kuzeybatı (Tây Bắc) + Phú Thọ/Vĩnh Phúc/Hà Giang', hint: '210–219 → Sơn La, Lai Châu, Lào Cai, Điện Biên, Yên Bái, Hòa Bình… ve Phú Thọ, Vĩnh Phúc, Hà Giang.' },
    { k: '22', tr: 'Kızıl Nehir Deltası', hint: '220–229 → Hải Dương, Hưng Yên, Bắc Ninh, Hải Phòng, Hà Nam, Thái Bình, Nam Định, Ninh Bình.' },
    { k: '23', tr: 'Kuzey Orta Kıyı + Đà Nẵng/Quảng Nam', hint: '232–239 → Quảng Bình’den Hà Tĩnh’e kuzeyden güneye sırayla: 232 Quảng Bình, 233 Quảng Trị, 234 Huế, 235 Quảng Nam, 236 Đà Nẵng, 237 Thanh Hóa, 238 Nghệ An, 239 Hà Tĩnh.' },
    { k: '24', tr: 'Hà Nội', hint: '24 → başkent. İki haneli.' },
    { k: '25', tr: 'Güney Orta Kıyı (+ Đồng Nai, BR-VT)', hint: '255 Quảng Ngãi, 256 Bình Định, 257 Phú Yên, 258 Khánh Hòa, 259 Ninh Thuận kuzeyden güneye; 252 Bình Thuận; 251 Đồng Nai, 254 Bà Rịa–Vũng Tàu.' },
    { k: '26', tr: 'Orta Yaylalar (Tây Nguyên)', hint: '260 Kon Tum, 261 Đắk Nông, 262 Đắk Lắk, 263 Lâm Đồng, 269 Gia Lai.' },
    { k: '27', tr: 'Güneydoğu + Yukarı Mekong', hint: '270 Vĩnh Long, 271 Bình Phước, 272 Long An, 273 Tiền Giang, 274 Bình Dương, 275 Bến Tre, 276 Tây Ninh, 277 Đồng Tháp.' },
    { k: '28', tr: 'TP. Hồ Chí Minh', hint: '28 → Saygon. İki haneli.' },
    { k: '29', tr: 'Aşağı Mekong', hint: '290 Cà Mau, 291 Bạc Liêu, 292 Cần Thơ, 293 Hậu Giang, 294 Trà Vinh, 296 An Giang, 297 Kiên Giang, 299 Sóc Trăng.' }
  ];

  var OLD_CODES = [
    ['Hà Nội', '04', '24'], ['TP. Hồ Chí Minh', '08', '28'], ['Hải Phòng', '031', '225'],
    ['Đà Nẵng', '0511', '236'], ['Cần Thơ', '0710', '292']
  ];

  var TIPS = [
    { t: 'Telefon numarasından il bulma', b: "Tabelalardaki sabit hat numaraları alan kodunu verir: 0236 3xxx xxx → 236 = Đà Nẵng. Uluslararası yazımda baştaki 0 düşer (+84 236 …). Hà Nội = 24 ve TP.HCM = 28 (iki haneli). Sabit hatlar 02 ile başlar; 03/05/07/08/09 ile başlayanlar cep telefonudur ve il göstermez." },
    { t: 'Alan kodu hafıza kuralı', b: "Üç haneli kodun ikinci hanesi kabaca coğrafyayı izler: 20x Kuzeydoğu, 21x Kuzeybatı, 22x Kızıl Nehir Deltası, 23x Kuzey Orta Kıyı, 24 Hà Nội, 25x Güney Orta Kıyı, 26x Yaylalar, 27x Güneydoğu ve yukarı Mekong, 28 Saygon, 29x aşağı Mekong." },
    { t: 'Eski (2017 öncesi) kodlar', b: "2017 içinde alan kodları kademeli olarak yeni 02xx düzenine geçti. Eski imajlarda 04 (Hà Nội), 08 (TP.HCM), 031 (Hải Phòng), 0511 (Đà Nẵng) veya 0710 (Cần Thơ) gibi eski kodlar görebilirsin." },
    { t: 'Tabela sözlüğü', b: "Quốc lộ (QL) = ulusal karayolu · Đường tỉnh (ĐT) / Tỉnh lộ = il yolu · Cao tốc = otoyol · Đường = cadde/yol · Cầu = köprü · Chợ = pazar · Bệnh viện = hastane · Công an = polis · UBND = halk komitesi (belediye/valilik) · Nhà nghỉ = pansiyon · Khách sạn = otel · Quán cơm = yemek lokantası · Sửa xe = motor tamiri · ĐT = telefon." },
    { t: 'İdari kademeler', b: "Tỉnh = il · Thành phố = şehir · Quận/Huyện = ilçe · Phường = mahalle · Xã = köy/komün · Thị trấn = kasaba." },
    { t: 'Yön tabelaları', b: "Ulusal yollarda yön tabelaları genelde mavi, otoyollarda (cao tốc) yeşil zeminli ve beyaz yazılıdır. Trafik sağdan akar; Latin alfabesi ton işaretleriyle yazılır (ă â ê ô ơ ư đ)." }
  ];

  /* ---------- Türetilmiş yapılar ---------- */
  var regionById = {}, i;
  REGIONS.forEach(function (r) { regionById[r.id] = r; });
  var macroById = {};
  MACROS.forEach(function (m) { macroById[m.id] = m; });

  var provinces = P.map(function (r) {
    var reg = regionById[r[3]];
    var p = {
      id: r[0], vi: r[1], type: r[2] === 'c' ? 'city' : 'prov', region: r[3], macro: reg.macro,
      cap: r[4], area: r[5], cue: r[6], places: r[7].split('|'),
      en: EN[r[0]] || null, alias: ALIAS[r[0]] || []
    };
    p.ascii = norm(p.vi);
    return p;
  });
  var pById = {};
  provinces.forEach(function (p) { pById[p.id] = p; });

  var areaOwner = {};
  provinces.forEach(function (p) { areaOwner[p.area] = p.id; });

  // Basit tutarlılık denetimi (yükleme sırasında)
  var problems = [];
  if (provinces.length !== 63) problems.push('63 il bekleniyordu: ' + provinces.length);
  if (Object.keys(areaOwner).length !== 63) problems.push('Alan kodları benzersiz değil');

  root.VN_DATA = {
    norm: norm,
    macros: MACROS, macroById: macroById,
    regions: REGIONS, regionById: regionById,
    provinces: provinces, pById: pById,
    areaOwner: areaOwner,
    families: FAMILIES, oldCodes: OLD_CODES, tips: TIPS,
    problems: problems
  };
})(typeof window !== 'undefined' ? window : globalThis);

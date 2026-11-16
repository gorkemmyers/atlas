/* pack-japan.js — Japonya çalışma paketi (47 prefektörlük, 10 elektrik şirketi, 01–09 telefon kodu, kanji) */
(function (g) {
  'use strict';

  var REGIONS = [
    { id: 'hokkaido', tr: 'Hokkaido', cue: '011–016 · Direkte 4x4 ızgara plaka, yol kenarında Yabane kar okları, düz geniş tarım yolları', color: 0 },
    { id: 'tohoku', tr: 'Tohoku', cue: '017–024 (+ Niigata 025) · İçi beyaz gri oval reflektör, altta yazı/T plaka, dikey ışıklar', color: 1 },
    { id: 'kanto', tr: 'Kanto', cue: '03 / 04x / 027–029 · TEPCO gümüş plakası NTT altında, dikey sarı-siyah reflektör', color: 2 },
    { id: 'chubu', tr: 'Chubu & Hokuriku', cue: '025–026 / 05x / 076 · Chubu oval kapsül plaka · Hokuriku yatay plaka + siyah kiremit', color: 3 },
    { id: 'kansai', tr: 'Kansai (Kinki)', cue: '06 / 072–079 · Yalın dikey kanji plaka, ~120° eğimli tek basamak kolu, Osaka & Kyoto (府)', color: 4 },
    { id: 'chugoku', tr: 'Chugoku', cue: '082–086 · Plaka üstünde turuncu yukarı ok (Energia) + batıda kızıl Sekishu kiremit', color: 5 },
    { id: 'shikoku', tr: 'Shikoku', cue: '087–089 · Gövdede turuncu + siyah yatay şeritler, 4 noktalı baklava logo, dar dağ kıyıları', color: 6 },
    { id: 'kyushu', tr: 'Kyushu & Okinawa', cue: '09x · Kyushu 3+kana+3 plaka & küt izolatör · Okinawa plakada iri 1–6 rakamı (5 yok)', color: 7 }
  ];

  var UNITS = [
    {
      id: 'hokkaido', name: 'Hokkaido', short: 'Hokkaido', local: '北海道', cap: 'Sapporo', reg: 'hokkaido',
      codes: ['011', '012', '013', '014', '015', '016'], postal: '00–09',
      codeCls: 'q0', traitId: 'hokkaido', traitTitle: 'Hokuden · 4x4 Izgara Plaka & Yabane Okları', traitCls: 'q0',
      cue: 'Adres sonunda tek başına “道” (Do) karakteri yalnızca buradadır. Elektrik direğinde en üstte 4x4 sıkışık 区/画/図 ızgara tablo, tepede simetrik + kol ve yol kenarında kırmızı-beyaz aşağı Yabane kar okları görülür.',
      trap: '017 koduyla denizi geçip Aomori’ye girildiğinde Yabane okları neredeyse biter ve Tohoku direği başlar.'
    },
    {
      id: 'aomori', name: 'Aomori', short: 'Aomori', local: '青森県', cap: 'Aomori', reg: 'tohoku',
      codes: ['017'], postal: '03',
      codeCls: 'q0', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · İçi Beyaz Gri Oval Reflektör', traitCls: 'q1',
      cue: '017 telefon kodu ve elma bahçeleriyle Honshu’nun en kuzey ucudur. Direklerde göz hizasında içi beyaz çerçeveli gri oval (“hap”) reflektör ve yazıları alta itilmiş / T harfli Tohoku plakası bulunur.',
      trap: 'Hokkaido ile karlar ortak ama 017 kodu + içi beyaz gri oval reflektör Aomori’yi ele verir.'
    },
    {
      id: 'iwate', name: 'Iwate', short: 'Iwate', local: '岩手県', cap: 'Morioka', reg: 'tohoku',
      codes: ['019'], postal: '02',
      codeCls: 'q0', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · Uzun Kuzey-Güney Vadileri', traitCls: 'q1',
      cue: '019 telefon kodu (Morioka); Honshu’nun yüzölçümü en büyük ili. İçi beyaz gri oval reflektörlü Tohoku direkleri, uzun kuzey-güney vadi tarlaları ve doğuda ria koyları.',
      trap: '018 batıda Akita, 019 doğuda Iwate, 017 kuzeyde Aomori’dir.'
    },
    {
      id: 'miyagi', name: 'Miyagi', short: 'Miyagi', local: '宮城県', cap: 'Sendai', reg: 'tohoku',
      codes: ['022'], postal: '98',
      codeCls: 'q1', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · Sendai Düzlüğü', traitCls: 'q1',
      cue: '022 Sendai metropolü ve çevresindeki geniş düz çeltik ovası. Direk gövdesinde Tohoku sarmal logolu alt yazılı plaka ve içi beyaz gri oval reflektör görülür.',
      trap: 'Güney Tohoku akışı: 022 Miyagi → 023 Yamagata → 024 Fukushima.'
    },
    {
      id: 'akita', name: 'Akita', short: 'Akita', local: '秋田県', cap: 'Akita', reg: 'tohoku',
      codes: ['018'], postal: '01',
      codeCls: 'q0', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · Dikey Işıklar & Oval Reflektör', traitCls: 'q1',
      cue: '018 kodu ve Japonya Denizi kıyısında dümdüz Akita pirinç tarlaları. Kar tutmaması için kavşaklarda dikey trafik lambaları + Tohoku gri oval reflektörlü direkler bulunur.',
      trap: 'Dikey trafik lambası Hokkaido, kıyı Tohoku ve Hokuriku’da da vardır; direk plakasına bakmadan ayırma.'
    },
    {
      id: 'yamagata', name: 'Yamagata', short: 'Yamagata', local: '山形県', cap: 'Yamagata', reg: 'tohoku',
      codes: ['023'], postal: '99',
      codeCls: 'q1', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · Meyve Havzası & T Plaka', traitCls: 'q1',
      cue: '023 telefon kodu ve 〒99 posta koduyla dağlarla çevrili Yamagata/Shonai havzaları. Tohoku direklerinde tepede kare+çubuk veya daire+zikzak trafo tutucusu sık görülür.',
      trap: '〒99 posta aralığı Japonya’daki en yüksek ön eklerden biridir (98 Miyagi, 99 Yamagata).'
    },
    {
      id: 'fukushima', name: 'Fukushima', short: 'Fukushima', local: '福島県', cap: 'Fukushima', reg: 'tohoku',
      codes: ['024'], postal: '96–97',
      codeCls: 'q1', traitId: 'tohoku', traitTitle: 'Tohoku Elektrik · Güney Sınırı (024)', traitCls: 'q1',
      cue: '024 telefon kodu; merkezde Koriyama havzası, batıda karlı Aizu dağları, doğuda Pasifik kıyısı. Elektrik direkleri hâlâ içi beyaz gri oval reflektörlü Tohoku tipidir.',
      trap: 'Güney sınırını geçip 028/029’a (Tochigi/Ibaraki) girince direkler TEPCO’ya döner.'
    },
    {
      id: 'ibaraki', name: 'Ibaraki', short: 'Ibaraki', local: '茨城県', cap: 'Mito', reg: 'kanto',
      codes: ['029'], postal: '30–31',
      codeCls: 'q1', traitId: 'tepco', traitTitle: 'TEPCO · NTT Altında Gümüş Plaka', traitCls: 'q2',
      cue: '029 telefon kodu; Tokyo’nun kuzeydoğusundaki en düz büyük tarım ovası (Mito, Tsukuba). Elektrik direklerinde TEPCO’nun gümüş/dikey plakası küçük NTT etiketinin ALTINDADIR + dikey sarı-siyah reflektör.',
      trap: 'Telefon kodu 02x ile başlasa bile şebeke Tohoku değil, %100 TEPCO’dur!'
    },
    {
      id: 'tochigi', name: 'Tochigi', short: 'Tochigi', local: '栃木県', cap: 'Utsunomiya', reg: 'kanto',
      codes: ['028'], postal: '32',
      codeCls: 'q1', traitId: 'tepco', traitTitle: 'TEPCO · Kuzey Kanto Ovası & Nikko', traitCls: 'q2',
      cue: '028 telefon kodu (Utsunomiya). Güneyde düz pirinç tarlaları, kuzeybatıda Nikko sedir dağları; direklerde NTT plakası altında metalik TEPCO plakası ve tepede geniş akort çatalı görünür.',
      trap: 'Kuzey Kanto dizilimi batıdan doğuya: 027 Gunma · 028 Tochigi · 029 Ibaraki.'
    },
    {
      id: 'gunma', name: 'Gunma', short: 'Gunma', local: '群馬県', cap: 'Maebashi', reg: 'kanto',
      codes: ['027'], postal: '37',
      codeCls: 'q1', traitId: 'tepco', traitTitle: 'TEPCO · Volkanik Dağ Çanağı', traitCls: 'q2',
      cue: '027 kodu (Takasaki, Maebashi). Üç tarafı volkanik dağlarla çevrili düz ova köşesinde NTT altı TEPCO plakaları ve dikey sarı-siyah reflektörler yer alır.',
      trap: 'Batı geçidini aşınca 026 Nagano’ya ve bir anda Chubu’nun oval kapsül plakasına geçilir.'
    },
    {
      id: 'saitama', name: 'Saitama', short: 'Saitama', local: '埼玉県', cap: 'Saitama', reg: 'kanto',
      codes: ['048', '049'], postal: '33–36',
      codeCls: 'q2', traitId: 'tepco', traitTitle: 'TEPCO · Kuzey Tokyo Banliyö Ağı', traitCls: 'q2',
      cue: '048 (Saitama/Omiya) ve 049 (Kawagoe); Tokyo’nun kuzeyinde kesintisiz düz yerleşim. Her sokakta NTT plakasının altında metalik TEPCO plakası ve dikey sarı-siyah reflektör görülür.',
      trap: '04x çevrelemesi: 042 Tama, 043/047 Chiba, 044–046 Kanagawa, 048/049 Saitama.'
    },
    {
      id: 'chiba', name: 'Chiba', short: 'Chiba', local: '千葉県', cap: 'Chiba', reg: 'kanto',
      codes: ['043', '047'], postal: '26–29',
      codeCls: 'q2', traitId: 'tepco', traitTitle: 'TEPCO · Boso Yarımadası', traitCls: 'q2',
      cue: '043 (Chiba), 047 (Funabashi/Narita), 0470 (güney yarımada). Kıyı kumulları ve alçak tepeli Boso Yarımadası boyunca dikey sarı-siyah TEPCO reflektörleri.',
      trap: 'Deniz batı tarafındaysa Tokyo Körfezi doğu kıyısı (Chiba), doğu tarafındaysa açık Pasifik kıyısıdır.'
    },
    {
      id: 'tokyo', name: 'Tokyo', short: 'Tokyo', local: '東京都', cap: 'Tokyo', reg: 'kanto',
      codes: ['03', '042'], postal: '10–20',
      codeCls: 'q2', traitId: 'tepco', traitTitle: 'TEPCO · “都” Eki & İki Haneli 03 Kodu', traitCls: 'q2',
      cue: 'Adreslerdeki tek “都” (To) eki buraya özeldir. Merkez 23 semt 2 basamaklı 03 kodu, batı Tama şehirleri 042 kullanır. Direklerde TEPCO gümüş/dikey plakası ve ahşap plaka arkası trafolar yaygındır.',
      trap: 'Japonya’da yalnızca Tokyo (03) ve Osaka (06) 2 haneli alan koduna sahiptir!'
    },
    {
      id: 'kanagawa', name: 'Kanagawa', short: 'Kanagawa', local: '神奈川県', cap: 'Yokohama', reg: 'kanto',
      codes: ['045', '044', '046'], postal: '21–25',
      codeCls: 'q2', traitId: 'tepco', traitTitle: 'TEPCO · Yokohama / Shonan Kıyısı', traitCls: 'q2',
      cue: '045 Yokohama, 044 Kawasaki, 046 Kamakura/Odawara. Tepelik yoğun mahalleler, sık TEPCO direkleri (NTT altında gümüş plaka + geniş akort çatalı tepesi).',
      trap: '045 Yokohama ile 048 Saitama karışabilir: Yokohama sık yokuşlu ve limanlıdır.'
    },
    {
      id: 'niigata', name: 'Niigata', short: 'Niigata', local: '新潟県', cap: 'Niigata', reg: 'chubu',
      codes: ['025'], postal: '94–95',
      codeCls: 'q1', traitId: 'tohoku', traitTitle: 'BÜYÜK TUZAK · Chubu Haritasında Tohoku Direği!', traitCls: 'q1',
      cue: '025 kodu; Japonya Denizi boyunca düz çeltik ovaları, kar koruma tünelleri ve gri kar ağları. Şebeke Hokuriku/Chubu DEĞİL, içi beyaz gri oval reflektörlü Tohoku Elektriktir!',
      trap: 'En ünlü Japonya tuzağı: Coğrafi Chubu sayılmasına rağmen 025 + Tohoku Elektrik = kesin Niigata!'
    },
    {
      id: 'toyama', name: 'Toyama', short: 'Toyama', local: '富山県', cap: 'Toyama', reg: 'chubu',
      codes: ['076'], postal: '93',
      codeCls: 'q3', traitId: 'hokuriku', traitTitle: 'Hokuriku · Yatay Plaka (イ 0–3xxx) & Shosetsu', traitCls: 'q8',
      cue: '076 (0764 Toyama, 0766 Takaoka). Tüm Japonya’nın aksine direklerde hem NTT hem elektrik plakası YATAYDIR (Toyama numarası İ katakanalı 0–3999); yolda Shosetsu kar eritme su fıskiyeleri vardır.',
      trap: '076 kodu yalnızca Toyama ve Ishikawa arasındadır; doğuda dev Tateyama Alpleri yükselir.'
    },
    {
      id: 'ishikawa', name: 'Ishikawa', short: 'Ishikawa', local: '石川県', cap: 'Kanazawa', reg: 'chubu',
      codes: ['076'], postal: '92',
      codeCls: 'q3', traitId: 'hokuriku', traitTitle: 'Hokuriku · Yatay Plaka (4–7xxx) & Siyah Kiremit', traitCls: 'q8',
      cue: '076 (Kanazawa/Noto). Yatay Hokuriku elektrik plakaları (genelde 4–7xxx), tepesi ▲ çadır biçimli direk başı, dikey trafik lambaları ve parlak siyah sırlı kiremit çatılar.',
      trap: 'Toyama düz iç ova iken Ishikawa dar Noto Yarımadası boyunca uzanır.'
    },
    {
      id: 'fukui', name: 'Fukui', short: 'Fukui', local: '福井県', cap: 'Fukui', reg: 'chubu',
      codes: ['077'], postal: '91',
      codeCls: 'q3', traitId: 'hokuriku', traitTitle: 'Hokuriku Güneyi · Yatay Plaka (8–9xxx)', traitCls: 'q8',
      cue: '0776 Fukui, 0778 Echizen, 0770 Tsuruga/Obama. Kuzey ve merkezde yatay Hokuriku plakaları (8–9xxx) ve dikey ışıklar görülür; en güneybatı kıyıda Kansai direklerine geçer.',
      trap: '077 kodu Shiga (Biwa Gölü) ile paylaşılır; Fukui’de yatay Hokuriku plakası ve Japonya Denizi kıyısı ayrımı verir.'
    },
    {
      id: 'yamanashi', name: 'Yamanashi', short: 'Yamanashi', local: '山梨県', cap: 'Kofu', reg: 'chubu',
      codes: ['055'], postal: '40',
      codeCls: 'q3', traitId: 'tepco', traitTitle: 'TEPCO Batı Ucu (50 Hz) · Fuji Kuzeyi', traitCls: 'q2',
      cue: '055 (Kofu, Fujiyoshida). Coğrafi Chubu bölgesinde olmasına rağmen direkler 50 Hz TEPCO’dur (NTT altında plaka + dikey sarı-siyah reflektör). Meyve bağları arkasında Fuji Dağı görünür.',
      trap: 'Chubu bölgesinde olup Chubu oval plakası YERİNE TEPCO gümüş plakası varsa Yamanashi veya Doğu Shizuoka’dasın!'
    },
    {
      id: 'nagano', name: 'Nagano', short: 'Nagano', local: '長野県', cap: 'Nagano', reg: 'chubu',
      codes: ['026'], postal: '38–39',
      codeCls: 'q1', traitId: 'chubu', traitTitle: 'Chubu Elektrik · Oval (Kapsül) Plaka & 026', traitCls: 'q3',
      cue: '026 kodu (026 Nagano, 0263 Matsumoto, 0266 Suwa). Japonya Alpleri arası yüksek havzalarda hemen tanınan iki ucu yuvarlak oval “kapsül” Chubu plakası ve çapraz siyah-sarı reflektör vardır.',
      trap: 'Kod 02x (026) ama elektrik şirketi Tohoku değil oval plakalı Chubu’dur!'
    },
    {
      id: 'gifu', name: 'Gifu', short: 'Gifu', local: '岐阜県', cap: 'Gifu', reg: 'chubu',
      codes: ['058', '057'], postal: '50',
      codeCls: 'q3', traitId: 'chubu', traitTitle: 'Chubu Elektrik · Oval Plaka & Hida Vadileri', traitCls: 'q3',
      cue: '058 güney Gifu ovası, 057 Hida dağlık bölgesi (Takayama 0577). Nehir vadilerindeki dik yamaçlı kasabalarda oval kapsül Chubu plakaları + tepede 4 kalın çapraz kol görülür.',
      trap: 'En kuzeybatıdaki Shirakawa-go sınırı dışında eyaletin tamamı Chubu kapsül plakası kullanır.'
    },
    {
      id: 'shizuoka', name: 'Shizuoka', short: 'Shizuoka', local: '静岡県', cap: 'Shizuoka', reg: 'chubu',
      codes: ['054', '053', '055'], postal: '41–43',
      codeCls: 'q3', traitId: 'chubu', traitTitle: 'Fuji Nehri Sınırı: Batı Oval Chubu · Doğu TEPCO', traitCls: 'q3',
      cue: '054 Shizuoka, 053 batı Hamamatsu, 055 doğu Numazu/Izu. Çay teraslı yamaçlarıyla ünlüdür. Fuji Nehri ülkenin 50/60 Hz sınırıdır: nehrin doğusunda TEPCO, batısında oval plakalı Chubu vardır.',
      trap: 'Doğu Izu/Numazu (055) TEPCO kullanır; orta ve batı Shizuoka (054/053) Chubu oval plakası kullanır!'
    },
    {
      id: 'aichi', name: 'Aichi', short: 'Aichi', local: '愛知県', cap: 'Nagoya', reg: 'chubu',
      codes: ['052', '056'], postal: '44–49',
      codeCls: 'q3', traitId: 'chubu', traitTitle: 'Chubu Kalbi · Nagoya (052) & Oval Plaka', traitCls: 'q3',
      cue: '052 Nagoya metropolü, 056 (Toyota, Okazaki), 0532 Toyohashi. Geniş sanayi caddelerinde direklerdeki oval kapsül Chubu Elektrik plakaları ve çapraz siyah-sarı reflektörler çok nettir.',
      trap: 'Büyük şehir alan kodları: Tokyo 03, Osaka 06, Nagoya 052 (3 haneli başlar).'
    },
    {
      id: 'mie', name: 'Mie', short: 'Mie', local: '三重県', cap: 'Tsu', reg: 'chubu',
      codes: ['059'], postal: '51',
      codeCls: 'q3', traitId: 'chubu', traitTitle: 'Chubu Elektrik · Kapsül Plaka & Ise Körfezi', traitCls: 'q3',
      cue: '059 kodu (Tsu, Yokkaichi, Ise, Matsusaka). Ise Körfezi kıyısında çay tarlaları ve neredeyse eyaletin tamamında Chubu Elektrik’in oval kapsül plakaları görülür.',
      trap: 'Coğrafyada Kinki/Kansai grubunda listelense bile elektrik direkleri Kansai değil Chubu’dur (059)!'
    },
    {
      id: 'shiga', name: 'Shiga', short: 'Shiga', local: '滋賀県', cap: 'Otsu', reg: 'kansai',
      codes: ['077', '074'], postal: '52',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai · Yalın Dikey Plaka & ~120° Kol', traitCls: 'q4',
      cue: '0775 Otsu, 0748 Hikone/Omihachiman. Ortadaki dev Biwa Gölü çevresi; direklerde sade tek sütun dikey Kansai kanji plakası, soluk reflektör ve ~120° eğimli tek basamak kolu yer alır.',
      trap: '074 kodu Nara ile ortaktır; Biwa Gölü çevresindeki 0775 ve 0748/0749 Shiga’dır.'
    },
    {
      id: 'kyoto', name: 'Kyoto', short: 'Kyoto', local: '京都府', cap: 'Kyoto', reg: 'kansai',
      codes: ['075', '077'], postal: '60–62',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai · “府” (Fu) Eki & Eğik Basamak Kolu', traitCls: 'q4',
      cue: 'Adres sonunda “府” (Fu) eki taşıyan iki ilden biridir. 075 Kyoto ızgara kenti, 0772/0773 kuzey kırsalı (Maizuru). Yalın dikey Kansai plakası, soluk yıpranmış reflektör ve ~120° yatık braket.',
      trap: 'Kyoto kuzeyde Japonya Denizi kıyısına kadar uzanır; her yer şehir merkezi değildir.'
    },
    {
      id: 'osaka', name: 'Osaka', short: 'Osaka', local: '大阪府', cap: 'Osaka', reg: 'kansai',
      codes: ['06', '072'], postal: '53–59',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai Kalbi · 06 Alan Kodu & “府” (Fu)', traitCls: 'q4',
      cue: 'Tokyo (03) dışındaki tek iki basamaklı şehir kodu (06) + “府” (Fu) il ekine sahiptir. Banliyöler 072 kodludur; direklerde sade dikey Kansai plakası, soluk reflektör ve ince tel çatal tepe bulunur.',
      trap: 'Otomat veya tabelada 06 alan kodu görürsen neredeyse kesin Osaka içindesin!'
    },
    {
      id: 'hyogo', name: 'Hyogo', short: 'Hyogo', local: '兵庫県', cap: 'Kobe', reg: 'kansai',
      codes: ['078', '079'], postal: '65–67',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai · Kobe (078) & Himeji (079)', traitCls: 'q4',
      cue: '078 Kobe/Akashi, 079 Himeji/Toyooka/Awaji. Güneyde Seto İç Denizi’ne, kuzeyde Japonya Denizi’ne açılır; tamamı sade dikey plakalı ve ~120° açılı kollu Kansai direkleridir.',
      trap: '078 Kobe tepelik-limanlıdır; 079 eyaletin çok büyük kırsal ve kuzey kısmını kapsar.'
    },
    {
      id: 'nara', name: 'Nara', short: 'Nara', local: '奈良県', cap: 'Nara', reg: 'kansai',
      codes: ['074'], postal: '63',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai · Denize Kıyısız Havza & Yoshino', traitCls: 'q4',
      cue: '0742 Nara, 0744 Kashihara, 0747 güney Yoshino dağları. Denize kıyısı olmayan tarihi iç havzada soluk reflektörlü ve ~120° açılı tek kollu Kansai direkleri görülür.',
      trap: '074 eki Shiga (0748/0749) ve Nara (0742–0747) arasında bölüşülür.'
    },
    {
      id: 'wakayama', name: 'Wakayama', short: 'Wakayama', local: '和歌山県', cap: 'Wakayama', reg: 'kansai',
      codes: ['073'], postal: '64',
      codeCls: 'q4', traitId: 'kansai', traitTitle: 'Kansai Güneyi · Kii Yarımadası', traitCls: 'q4',
      cue: '073 kodu (Wakayama, Tanabe, Shingu). Sarp ormanlı Kii Yarımadası, mandalina bahçeleri ve okyanus kıyısında sade dikey Kansai plakaları.',
      trap: '073 = Wakayama (Kansai), 078 = Hyogo/Kobe.'
    },
    {
      id: 'tottori', name: 'Tottori', short: 'Tottori', local: '鳥取県', cap: 'Tottori', reg: 'chugoku',
      codes: ['085'], postal: '68',
      codeCls: 'q5', traitId: 'chugoku', traitTitle: 'Chugoku · Üst Plakada Turuncu Ok & Sekishu', traitCls: 'q5',
      cue: '0857–0859 kodlarıyla Japonya’nın en az nüfuslu ili. Elektrik direğinde beyaz Energia plakasının tam tepesindeki parlak turuncu yukarı ok (ve 4 ince üst kol) hemen bölgeyi ele verir.',
      trap: '085 ön eki Tottori (0857–0859) ve Shimane (0852–0856) illerine aittir.'
    },
    {
      id: 'shimane', name: 'Shimane', short: 'Shimane', local: '島根県', cap: 'Matsue', reg: 'chugoku',
      codes: ['085'], postal: '69',
      codeCls: 'q5', traitId: 'chugoku', traitTitle: 'Chugoku · Sekishu Kızıl Çatılar & Turuncu Ok', traitCls: 'q5',
      cue: '0852–0856 kodları; Japonya’nın en ikonik pas-kırmızı parlak seramik Sekishu kiremit çatıları burada yoğunlaşır. Direkteki Energia plakası tepesinde parlak turuncu ok ve orta yükseklikte + artı trafo braketi vardır.',
      trap: 'Parlak kızıl Sekishu kiremit + üstü turuncu oklu Chugoku direği = neredeyse kesin Shimane veya batı Chugoku!'
    },
    {
      id: 'okayama', name: 'Okayama', short: 'Okayama', local: '岡山県', cap: 'Okayama', reg: 'chugoku',
      codes: ['086'], postal: '70–71',
      codeCls: 'q5', traitId: 'chugoku', traitTitle: 'Chugoku · Güneşli Seto Ovası & Turuncu Ok', traitCls: 'q5',
      cue: '086 kodu (Okayama, Kurashiki). Kansai’den çıkınca ~120° tek kollu direkler biter; plaka tepesinde turuncu yukarı ok bulunan Chugoku Energia direkleri başlar.',
      trap: 'Güney Chugoku kodları doğudan batıya: 086 Okayama · 082/084 Hiroshima · 083 Yamaguchi.'
    },
    {
      id: 'hiroshima', name: 'Hiroshima', short: 'Hiroshima', local: '広島県', cap: 'Hiroshima', reg: 'chugoku',
      codes: ['082', '084'], postal: '72–73',
      codeCls: 'q5', traitId: 'chugoku', traitTitle: 'Chugoku · 082/084 & Turuncu Ok Plakası', traitCls: 'q5',
      cue: '082 batı Hiroshima/Kure, 084 doğu Fukuyama/Onomichi. İç tepelerde pas-kırmızı Sekishu çatılar, direklerde üstü turuncu oklu Energia plakaları ve Seto İç Denizi köprüleri.',
      trap: 'Fukuyama doğusu 084 ile Okayama’ya komşudur; 082 yalnızca batı Hiroshima’dadır.'
    },
    {
      id: 'yamaguchi', name: 'Yamaguchi', short: 'Yamaguchi', local: '山口県', cap: 'Yamaguchi', reg: 'chugoku',
      codes: ['083'], postal: '74–75',
      codeCls: 'q5', traitId: 'chugoku', traitTitle: 'Chugoku Batı Ucu · Turuncu Korkuluk Kuralı!', traitCls: 'q5',
      cue: '083 kodu; Honshu’nun en batı ucu! Prefektörlük yollarında (kendō) parlak mandalina turuncusu/sarı korkuluklar ve plaka tepesinde turuncu ok bulunan Chugoku direkleri birliktedir.',
      trap: 'Turuncu korkuluk gördüğünde Kyushu adasına geçmedin, Yamaguchi içindesin!'
    },
    {
      id: 'tokushima', name: 'Tokushima', short: 'Tokushima', local: '徳島県', cap: 'Tokushima', reg: 'shikoku',
      codes: ['088'], postal: '77',
      codeCls: 'q6', traitId: 'shikoku', traitTitle: 'Shikoku (Yonden) · Turuncu-Siyah Şeritler', traitCls: 'q6',
      cue: '0883–0886 kodları; Shikoku’nun doğu kapısı ve Yoshino Nehri vadisi. Direk gövdesinde parlak turuncu + siyah yatay ikaz halkaları ve 4 noktalı baklava logolu Yonden plakası net seçilir.',
      trap: '088 kodu Tokushima (0884–0886) ile Kochi (0880/0888–0889) arasında paylaşılır.'
    },
    {
      id: 'kagawa', name: 'Kagawa', short: 'Kagawa', local: '香川県', cap: 'Takamatsu', reg: 'shikoku',
      codes: ['087'], postal: '76',
      codeCls: 'q6', traitId: 'shikoku', traitTitle: 'Shikoku (Yonden) · Koni Tepecikler & 087', traitCls: 'q6',
      cue: '087 kodu (Takamatsu). Japonya’nın en küçük ili: düz pirinç tarlaları arasından fırlayan sivri kubbe tepecikler, çok sayıda küçük sulama göleti ve turuncu-siyah bantlı Shikoku direkleri.',
      trap: 'Okayama’dan Seto-Ohashi Köprüsü ile bağlanır; 087 gördün mü kesin Kagawa.'
    },
    {
      id: 'ehime', name: 'Ehime', short: 'Ehime', local: '愛媛県', cap: 'Matsuyama', reg: 'shikoku',
      codes: ['089'], postal: '79',
      codeCls: 'q6', traitId: 'shikoku', traitTitle: 'Shikoku (Yonden) · Narenciye Yamaçları & 089', traitCls: 'q6',
      cue: '089 kodu (Matsuyama, Imabari). Seto İç Denizi kıyısında teraslı mikan mandalina yamaçları, turuncu-siyah yatay şeritli direkler ve tepede 90° kompakt kısa braket.',
      trap: 'Shikoku üçlüsü: 087 Kagawa · 088 Tokushima/Kochi · 089 Ehime.'
    },
    {
      id: 'kochi', name: 'Kochi', short: 'Kochi', local: '高知県', cap: 'Kochi', reg: 'shikoku',
      codes: ['088'], postal: '78',
      codeCls: 'q6', traitId: 'shikoku', traitTitle: 'Shikoku Güneyi · Pasifik Körfezi & Sera Ovası', traitCls: 'q6',
      cue: '0880/0887–0889 kodları. Kochi kıyısında beyaz plastik sebze seraları, açık Pasifik’e bakan falezler ve direklerde turuncu-siyah yatay Yonden halkaları.',
      trap: 'Shikoku adası + 088 + beyaz seralar/güney Pasifik = Kochi.'
    },
    {
      id: 'fukuoka', name: 'Fukuoka', short: 'Fukuoka', local: '福岡県', cap: 'Fukuoka', reg: 'kyushu',
      codes: ['092', '093', '094'], postal: '80–83',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu · 3 Rakam + Kana + 3 Rakam Plaka', traitCls: 'q7',
      cue: '092 Fukuoka, 093 Kitakyushu, 094 Kurume. Direklerde imzası olan 3 rakam + katakana + 3 rakam (ör. 247エ714) dikey plaka ve tepede düz kısa yan kol üzerinde 3 küt izolatör bulunur.',
      trap: '092/093/094 gördüğün anda kesin kuzey Kyushu (Fukuoka) içindesin!'
    },
    {
      id: 'saga', name: 'Saga', short: 'Saga', local: '佐賀県', cap: 'Saga', reg: 'kyushu',
      codes: ['095'], postal: '84',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu · Geniş Pirinç Ovası & 0952', traitCls: 'q7',
      cue: '0952/0954/0955 kodları (Nagasaki ile 095’i paylaşır). Geniş düz Saga çeltik tarlaları; Kyushu’nun 3+kana+3 plakaları ve düz kısa 3 izolatörlü yan kolları.',
      trap: '095 iki ildedir: doğu düz tarım ovası Saga (0952), batı girintili yarımadalar Nagasaki (0956–0959).'
    },
    {
      id: 'nagasaki', name: 'Nagasaki', short: 'Nagasaki', local: '長崎県', cap: 'Nagasaki', reg: 'kyushu',
      codes: ['095'], postal: '85',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu · Girintili Koylar & Adalar', traitCls: 'q7',
      cue: '0956–0958 Sasebo/Nagasaki/Goto. Denize inen dik yamaçlı koylar, köprülerle bağlı adalar, Kyushu 3+kana+3 plakaları ve ayrı iki turuncu bantlı yassı beyaz yol babaları.',
      trap: 'Her dönemeçte koy ve ada manzarası çıkıyorsa 095 Nagasaki’dir.'
    },
    {
      id: 'kumamoto', name: 'Kumamoto', short: 'Kumamoto', local: '熊本県', cap: 'Kumamoto', reg: 'kyushu',
      codes: ['096'], postal: '86',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu · Aso Krateri & 096 Kodu', traitCls: 'q7',
      cue: '096 kodu (Kumamoto, Aso, Amakusa). Siyah bazalt kaya duvarlar, Aso kaldera çimenlikleri ve Kyushu 3+kana+3 plakalı, düz kısa kollu elektrik direkleri.',
      trap: 'Güney Kyushu sırası: 096 Kumamoto · 097 Oita · 098 Miyazaki/Okinawa · 099 Kagoshima.'
    },
    {
      id: 'oita', name: 'Oita', short: 'Oita', local: '大分県', cap: 'Oita', reg: 'kyushu',
      codes: ['097'], postal: '87',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu Doğu Kıyısı · Kaplıca Vadileri & 097', traitCls: 'q7',
      cue: '097 kodu (Oita, Beppu, Kunisaki). Yükselen jeotermal kaplıca buharları ve Kunisaki Yarımadası boyunca Kyushu 3+kana+3 plakalı direkler.',
      trap: 'Shikoku’nun tam karşısındaki Kunisaki kıyısı hâlâ Kyushu Elektriktir (097).'
    },
    {
      id: 'miyazaki', name: 'Miyazaki', short: 'Miyazaki', local: '宮崎県', cap: 'Miyazaki', reg: 'kyushu',
      codes: ['098'], postal: '88',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu · Tropik Palmiyeler + 3+Kana+3 Plaka', traitCls: 'q7',
      cue: '0982/0985–0987 kodları! Palmiyeli sahil bulvarları Okinawa’yı andırsa da direkler hâlâ 3+kana+3 plakalı anakara Kyushu Elektriktir.',
      trap: '098 Okinawa ile paylaşılır! Plakada iri tek bölge rakamı (1–6) yoksa ve küt izolatörlü Kyushu kolu varsa Miyazaki’desin!'
    },
    {
      id: 'kagoshima', name: 'Kagoshima', short: 'Kagoshima', local: '鹿児島県', cap: 'Kagoshima', reg: 'kyushu',
      codes: ['099'], postal: '89',
      codeCls: 'q7', traitId: 'kyushu', traitTitle: 'Kyushu Güneyi · 099 & Siyah Volkan Külü', traitCls: 'q7',
      cue: '099 kodu (Sakurajima yanardağı + güney Amami adaları). Koyu volkanik Shirasu toprağı, çay/tatlı patates tarlaları ve Kyushu 3+kana+3 direk plakaları.',
      trap: '099 yalnızca Kagoshima’dır; güney Amami adaları bile Okinawa’nın 098’ini değil 0997 kodunu taşır!'
    },
    {
      id: 'okinawa', name: 'Okinawa', short: 'Okinawa', local: '沖縄県', cap: 'Naha', reg: 'kyushu',
      codes: ['098'], postal: '90',
      codeCls: 'q7', traitId: 'okinawa', traitTitle: 'Okiden · Plaka Tepesinde 1–6 Rakamı (5 Yok!)', traitCls: 'q9',
      cue: '0980/0988/0989 kodu. Dikey 沖縄電力 plakasının en tepesinde kalın bölge rakamı (1 dış adalar, 2 güney/Naha, 3 orta-güney, 4 orta-kuzey, 6 kuzey — 5 yoktur!) + T-şekilli yan trafo kolu ve kutu betonarme tayfun evleri.',
      trap: 'Hem 098 kodu hem tropik ağaçlar Miyazaki’ye benzer; plaka tepesindeki iri 1–6 rakamı ve beyaz beton evler %100 Okinawa der.'
    }
  ];

  var POWER_BANDS = [
    { cls: 'q0', key: 'HOK', title: 'Hokkaido (Hokuden)', sub: 'Üstte 4x4 区/画/図 ızgara tablo · + trafo askısı · Yabane kar okları.', ids: ['hokkaido'] },
    { cls: 'q1', key: 'THK', title: 'Tohoku (7 il · Niigata dahil!)', sub: 'İçi beyaz gri oval reflektör · yazıları altta/T plaka · Aomori–Fukushima + Niigata!', ids: ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima', 'niigata'] },
    { cls: 'q2', key: 'TEP', title: 'TEPCO (Kanto + Yamanashi & D. Shizuoka)', sub: 'Gümüş plaka NTT altında · dikey sarı-siyah reflektör · geniş akort çatalı.', ids: ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa', 'yamanashi'] },
    { cls: 'q3', key: 'CHB', title: 'Chubu (5 il · B. Shizuoka)', sub: 'Oval kapsül (“sosis”) plaka + çapraz siyah-sarı reflektör · 4 kalın üst kol.', ids: ['nagano', 'gifu', 'shizuoka', 'aichi', 'mie'] },
    { cls: 'q8', key: 'HKR', title: 'Hokuriku (3 il: Toyama, Ishikawa, Fukui)', sub: 'YATAY plaka (イ + numara) & yatay NTT · çadır tepeli direk + siyah kiremit.', ids: ['toyama', 'ishikawa', 'fukui'] },
    { cls: 'q4', key: 'KNS', title: 'Kansai / KEPCO (6 il)', sub: 'Yalın dikey kanji plaka · soluk yıpranmış reflektör · ~120° eğimli tek basamak kolu.', ids: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'] },
    { cls: 'q5', key: 'CHG', title: 'Chugoku (5 il)', sub: 'Plaka tepesinde parlak TURUNCU YUKARI OK (Energia) · batıda kızıl Sekishu kiremit.', ids: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi'] },
    { cls: 'q6', key: 'SHK', title: 'Shikoku / Yonden (4 il)', sub: 'Gövdede TURUNCU + SİYAH yatay şeritler · 4 noktalı baklava logo · 90° kısa kol.', ids: ['tokushima', 'kagawa', 'ehime', 'kochi'] },
    { cls: 'q7', key: 'KYU', title: 'Kyushu (7 il)', sub: '3 rakam + katakana + 3 rakam dikey plaka (247エ714) · düz yan kol + küt izolatör.', ids: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima'] },
    { cls: 'q9', key: 'OKN', title: 'Okinawa (Okiden)', sub: 'Plaka başında iri 1–6 bölge rakamı (5 yok!) · T-askı · kutu beton evler.', ids: ['okinawa'] }
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
    if (digits.length >= 2) {
      if (digits.indexOf('0120') === 0 || digits.indexOf('0800') === 0) {
        pushRes(digits.slice(0, 4), 'Ücretsiz danışma hattı (Freedial)', 'Konum VERMEZ — ülke geneli şirket hattıdır.', []);
      } else if (/^0[789]0/.test(digits) || digits.indexOf('050') === 0) {
        pushRes(digits.slice(0, 3), 'Cep telefonu / IP hat', 'Konum VERMEZ — 10 haneli sabit 01–09 hattı ara.', []);
      } else if (digits.indexOf('03') === 0) {
        pushRes('03', 'Tokyo (23 Semt)', 'İki basamaklı sabit alan kodu · 〒10–19', ['tokyo']);
      } else if (digits.indexOf('06') === 0) {
        pushRes('06', 'Osaka Şehri (+ yakın doğu Hyogo sınırı)', 'İki basamaklı sabit alan kodu · Kansai Elektrik', ['osaka', 'hyogo']);
      } else {
        var p3 = digits.slice(0, 3);
        var exact = pack.units.filter(function (u) { return u.codes.indexOf(p3) >= 0; });
        if (exact.length) {
          pushRes(p3, exact.map(function (u) { return u.name; }).join(' / '),
            exact.map(function (u) { return u.local + ' · ' + u.traitTitle.split('·')[0].trim(); }).join(' · '),
            exact.map(function (u) { return u.id; }));
        }
        var p2 = digits.slice(0, 2);
        var g2 = pack.units.filter(function (u) { return u.codes.some(function (c) { return c.indexOf(p2) === 0; }); });
        if (g2.length && !exact.length) {
          pushRes(p2 + 'x', g2.map(function (u) { return u.name; }).slice(0, 5).join(', '), 'Bu iki haneli sabit alan kodu grubu', g2.map(function (u) { return u.id; }));
        }
      }
    }
    pack.units.forEach(function (u) {
      if (pack.norm(u.name).indexOf(q) >= 0 || pack.norm(u.cap).indexOf(q) >= 0 || (u.local && u.local.indexOf(raw.trim()) >= 0)) {
        pushRes(u.codes[0], u.name + ' (' + u.local + ')', u.traitTitle + ' · 〒' + u.postal, [u.id]);
      }
    });
    return out.slice(0, 8);
  }

  function makeSimClue(type, u, pack, helpers) {
    var h = helpers.h, maskText = helpers.maskText;
    var r = pack.regById[u.reg];
    var code = u.codes[0];
    if (type === 'pole' && u.traitId && helpers.SVG) {
      return {
        meaning: (u.traitTitle || '') + ' · Tel ' + code,
        el: h('div', { 'class': 'sc-inline' },
          helpers.SVG.render(u.traitId, { compact: true }),
          h('div', { 'class': 'sc-inline-txt' },
            h('span', { 'class': 'sv-kicker' }, 'Sokaktaki elektrik direği'),
            h('b', {}, maskText(u.traitTitle || '', u)),
            h('p', { 'class': 'cue' }, maskText(u.cue, u))))
      };
    }
    if (type === 'tel') {
      var bodyDigits = code.length === 2 ? '5' + ((u.name.length * 13) % 89 + 10) + '-' + (1200 + (code * 73) % 8000)
        : '2' + ((u.name.length * 11) % 8 + 1) + '-' + (2100 + ((+code) * 37) % 7800);
      return {
        meaning: 'Alan kodu ' + code + ' · ' + u.local,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Otomat / Mağaza tabelası · Sabit hat'),
          h('div', { 'class': 'sv-plate' }, h('span', { 'class': 'area' }, code), h('span', {}, 'TEL (' + code + ') ' + bodyDigits)),
          h('p', { 'class': 'micro' }, 'Bölge & posta ön eki: ' + (r ? r.tr : '') + ' · 〒' + u.postal))
      };
    }
    if (type === 'postal') {
      var p2 = u.postal.split('–')[0];
      return {
        meaning: '〒' + p2 + 'x-xxxx · Tel ' + code,
        el: h('div', { 'class': 'clue-card-sv' },
          h('span', { 'class': 'sv-kicker' }, 'Otomat alt köşesi / Adres etiketi'),
          h('div', { 'class': 'sv-plate' }, h('span', {}, '〒' + p2 + '1-0024'), h('span', { 'class': 'pill' }, u.codes[0] + '-xxxx')),
          h('p', { 'class': 'micro' }, 'Saha notu: ' + maskText(u.cue, u).split('.')[0] + '.'))
      };
    }
    return {
      meaning: maskText(u.cue, u).slice(0, 68),
      el: h('div', { 'class': 'clue-card-sv' },
        h('span', { 'class': 'sv-kicker' }, 'Sokak görünümü notu'),
        h('p', { 'class': 'cue' }, maskText(u.cue, u)),
        u.trap ? h('p', { 'class': 'micro' }, 'Tuzak: ' + maskText(u.trap, u)) : null)
    };
  }

  g.CountryEngine.register({
    id: 'japan',
    name: 'Japonya',
    unitLabel: 'prefektörlük',
    unitLabelCap: 'Prefektörlük',
    postalLabel: 'Posta 〒',
    geoVar: 'JP_GEO',
    themeId: 'jp',
    themeCfg: {
      aria: 'Japonya haritası. Yakınlaştırmak için + ve - tuşları, kaydırmak için ok tuşları.',
      fit: 'Tüm Japonya’yı göster',
      grid: { lat: [24, 48, 4], lon: [122, 148, 4], txt: [26, 46, 4], refLon: 136, refLat: 36 },
      excludeWorld: ['Japan'],
      bg: [
        [127.8, 36.6, 'G. KORE', 'c'], [127.2, 39.8, 'K. KORE', 'c'],
        [140.5, 45.8, 'RUSYA · SAHALİN', 'c'], [121.0, 24.4, 'TAYVAN', 'c'],
        [133.5, 39.8, 'Japonya Denizi', 's'], [143.0, 32.0, 'Pasifik Okyanusu', 's'],
        [125.0, 29.0, 'Doğu Çin Denizi', 's']
      ]
    },
    srsPrefix: 'jp',
    simKmScale: 340,
    maxFitZoom: 8,
    labelSize: 9.2,
    regionMeta: {
      code: 'JP',
      area: 'Asya',
      tone: 'red',
      ralias: ['JP', 'JPN', 'JAPONYA', 'JAPAN'],
      line: '47 prefektörlük: 10 elektrik şirketi direği, 01–09 kod ve Kanji ekleri',
      blurb: 'Sokaktaki beton direğin plaka şekline ve reflektörüne bakarak 10 elektrik şirketinden birini seç; otomat altından 01–09 telefon kodunu okuyup ili sabitle.',
      exploreDesc: '47 prefektörlük, 10 elektrik şirketi fotoğraf rehberi, 01–09 telefon kodu, 〒 posta ve kanji ipuçları.',
      plan: [
        { title: '10 Elektrik Direğini tanı', text: 'Plaka şekli (oval kapsül, yatay plaka, 3+kana+3, turuncu ok), reflektör rengi ve üst braketi ezberle.', to: 'elektrik' },
        { title: '01–09 telefon + 〒 posta oku', text: 'İçecek otomatlarının altındaki 01 → 09 sabit alan kodlarını çöz.', to: 'telefon' },
        { title: '47 Prefektörlük & Kanji eki', text: '都 (Tokyo), 道 (Hokkaido), 府 (Osaka/Kyoto) ve Yamaguchi turuncu korkuluk kuralını öğren.', to: 'prefektor' },
        { title: 'Simülasyonla konum vur', text: 'Direk fotoğrafı ve tabeladan 5.000 puan hedefle.', to: 'simulasyon', launch: { preset: 'mix' } }
      ]
    },
    regions: REGIONS,
    colorModes: [
      { id: 'reg', label: 'Bölge (8)' },
      { id: 'trait', label: 'Elektrik şirketi (10)' },
      { id: 'code', label: 'Alan kodu (01–09)' }
    ],
    legendFor: function (mode, pack) {
      if (mode === 'trait') return POWER_BANDS;
      if (mode === 'code') {
        return [
          { cls: 'q0', label: '01x · Hokkaido & K. Tohoku', sub: '011–016 HK · 017–019 Aomori/Akita/Iwate', ids: ['hokkaido', 'aomori', 'akita', 'iwate'] },
          { cls: 'q1', label: '02x · G. Tohoku, Niigata, K. Kanto, Nagano', sub: '022–029 düzenli güney iniş', ids: ['miyagi', 'yamagata', 'fukushima', 'niigata', 'nagano', 'gunma', 'tochigi', 'ibaraki'] },
          { cls: 'q2', label: '03 / 04x · Tokyo & Çevresi', sub: '03 Tokyo · 04x Saitama/Chiba/Kanagawa', ids: ['tokyo', 'saitama', 'chiba', 'kanagawa'] },
          { cls: 'q3', label: '05x · Chubu & Tokai (+ Yamanashi)', sub: '052 Aichi · 053–059', ids: ['yamanashi', 'shizuoka', 'aichi', 'gifu', 'mie'] },
          { cls: 'q4', label: '06 / 07x · Kansai + Hokuriku (076)', sub: '06 Osaka · 072–079 Kansai & Toyama/Ishikawa/Fukui', ids: ['toyama', 'ishikawa', 'fukui', 'shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'] },
          { cls: 'q5', label: '08x · Chugoku & Shikoku', sub: '082–086 Chugoku · 087–089 Shikoku', ids: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi', 'tokushima', 'kagawa', 'ehime', 'kochi'] },
          { cls: 'q7', label: '09x · Kyushu & Okinawa', sub: '092–099 Kyushu · 098 Naha', ids: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa'] }
        ];
      }
      return pack.regions.map(function (r) {
        return { cls: 'q' + (r.color % 12), label: r.tr, sub: r.cue, ids: pack.units.filter(function (u) { return u.reg === r.id; }).map(function (u) { return u.id; }) };
      });
    },
    units: UNITS,
    decoder: {
      title: '01–09 telefon veya şehir çözücü',
      placeholder: 'Kod (örn. 076, 052, 098) ya da prefektörlük / kanji…',
      hint: '0120/0800 (ücretsiz), 050 (IP) ve 070/080/090 (cep) konum vermez; içecek otomatının alt köşesindeki 10 haneli sabit numarayı oku!',
      resolve: resolveDecoder
    },
    topics: [
      {
        key: 'elektrik',
        navLabel: 'Direkler',
        icon: 'bulb',
        drillPreset: 'visual',
        mapMode: 'trait',
        labelMode: 'short',
        title: '10 elektrik şirketi: direk plakası, reflektör ve üst braket',
        lead: 'Nereye bakılır: Japonya’da neredeyse her sokakta göz hizasındaki beton elektrik direğinin üstündeki metal plakanın biçimi, altındaki reflektör bandı ve en tepedeki metal kol şekli 10 şirketten birini doğrudan söyler.',
        desc: 'Hokkaido’dan Okinawa’ya 10 şirketin tamamı için birebir gerçek saha donanım detayları.',
        visuals: [
          { id: 'hokkaido', badge: '1 · HOK', title: 'Hokkaido (北海道電力 · Hokuden)', sub: 'En üstte 4x4 sıkışık 区/画/図 ızgara tablo plakası + tepede simetrik + artı trafo askısı; yol kenarında kırmızı-beyaz aşağı Yabane kar okları eşlik eder.', tags: ['4x4 ızgara plaka', 'Yabane kar oku'], ids: ['hokkaido'] },
          { id: 'tohoku', badge: '2 · THK', title: 'Tohoku (東北電力 · Niigata dahil!)', sub: 'Göz hizasında içi beyaz çerçeveli GRİ OVAL (“hap”) reflektör ve yazıları alta itilmiş / T harfli plaka. Coğrafi Chubu sayılan Niigata da buraya bağlıdır!', tags: ['Gri oval reflektör', 'Niigata TUZAK!'], ids: ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima', 'niigata'] },
          { id: 'tepco', badge: '3 · TEP', title: 'TEPCO (東京電力 · Kanto + Yamanashi)', sub: 'Gümüş/dikey elektrik plakası küçük beyaz NTT etiketinin ALTINDADIR + dikey sarı-siyah reflektör ve geniş “U” akort çatalı. Yamanashi ve Doğu Shizuoka da 50 Hz TEPCO’dur.', tags: ['Plaka NTT altında', 'Doğu Shizuoka 50 Hz'], ids: ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa', 'yamanashi'] },
          { id: 'chubu', badge: '4 · CHB', title: 'Chubu (中部電力 · Orta Japonya)', sub: 'Tüm ülkedeki en net işaret: iki ucu yarım daire OVAL KAPSÜL (“sosis”) elektrik plakası + gövdede çapraz siyah-sarı reflektör ve tepede 4 kalın yatay kol.', tags: ['Oval kapsül plaka', 'Çapraz reflektör'], ids: ['nagano', 'gifu', 'shizuoka', 'aichi', 'mie'] },
          { id: 'hokuriku', badge: '5 · HKR', title: 'Hokuriku (北陸電力 · Yalnızca 3 il)', sub: 'Yalnızca burada hem elektrik plakası (イ + 4 rakam) hem NTT plakası YATAY dikdörtgendir; tepesi ▲ çadır biçimli direk, dikey ışıklar ve parlak siyah kiremit görülür.', tags: ['Yatay plaka (sadece 3 il)', 'Siyah kiremit'], ids: ['toyama', 'ishikawa', 'fukui'] },
          { id: 'kansai', badge: '6 · KNS', title: 'Kansai / KEPCO (関西電力)', sub: 'Gösterişsiz sade tek sütun dikey kanji plaka + soluk/yıpranmış beyaz-sarı reflektör. Asıl imza: üst kabloya ~120° yatık inen tek basamak kolu ve trafo karesinin alt kenarındaki yatay çubuk.', tags: ['Yalın dikey plaka', '~120° eğik kol'], ids: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'] },
          { id: 'chugoku', badge: '7 · CHG', title: 'Chugoku (中国電力 · Energia)', sub: 'Beyaz plakanın en tepesinde parlak TURUNCU YUKARI OK işareti uzaktan bile seçilir + orta yükseklikte + artı trafo braketi ve batıda kızıl Sekishu kiremit çatılar.', tags: ['Plaka üstü turuncu ok', 'Sekishu kızıl çatı'], ids: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi'] },
          { id: 'shikoku', badge: '8 · SHK', title: 'Shikoku (四国電力 · Yonden)', sub: 'Gövde üzerinde parlak TURUNCU ve SİYAH yatay halkalar + plakada 4 mavi noktalı baklava (diamond) logo. Tepede 90° kısa dik destek bulunur.', tags: ['Turuncu-siyah şeritler', '4 noktalı logo'], ids: ['tokushima', 'kagawa', 'ehime', 'kochi'] },
          { id: 'kyushu', badge: '9 · KYU', title: 'Kyushu (九州電力 · Kyuden)', sub: 'İmza numara biçimi: 3 rakam + katakana + 3 rakam dikey plaka (ör. 247エ714), soluk reflektör ve yana düz uzanan kısa kol üzerinde 3 küt topaç izolatör.', tags: ['3+kana+3 plaka', 'Düz kol + küt izolatör'], ids: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima'] },
          { id: 'okinawa', badge: '10 · OKN', title: 'Okinawa (沖縄電力 · Okiden)', sub: 'Dikey plakanın başında iri BÖLGE RAKAMI 1–6 (5 yoktur: 2 güney, 3/4 orta, 6 kuzey, 1 adalar) + T-askı ve etrafta kutu betonarme tayfun evleri.', tags: ['İri 1–6 rakamı (5 yok)', 'Tayfun betonu'], ids: ['okinawa'] }
        ],
        rules: [
          {
            title: 'Elektrik şirketi çalışırken en büyük 2 sınır tuzağı',
            body: 'Bölge adıyla elektrik şirketi sınırı iki kritik yerde örtüşmez:',
            traps: [
              ['Niigata = Tohoku (Hokuriku değil!)', 'Haritada Chubu/Hokuriku sanılan Niigata’da direkler içi beyaz gri oval reflektörlü Tohoku Elektriktir ve telefon kodu 025’tir.'],
              ['Doğu Shizuoka + Yamanashi = TEPCO (50 Hz!)', 'Japonya 50/60 Hz sınırı Fuji Nehri’nden geçer: Yamanashi ve doğu Shizuoka 50 Hz TEPCO kullanırken orta/batı Shizuoka oval kapsül plakalı Chubu’dur.'],
              ['Fukui’nin güneybatı ucu = Kansai geçişi', 'Toyama ve Ishikawa %100 yatay Hokuriku plakası taşırken Fukui’nin batı Wakasa kıyısı Kansai’ye döner.']
            ],
            ids: ['niigata', 'yamanashi', 'shizuoka', 'fukui']
          }
        ]
      },
      {
        key: 'telefon',
        navLabel: '01–09 Kod',
        icon: 'phone',
        drillPreset: 'code',
        mapMode: 'code',
        labelMode: 'code',
        title: '01–09 telefon alan kodları ve 〒 posta ön ekleri',
        lead: 'Nereye bakılır: Japonya’da hemen her sokaktaki içecek otomatının (Vending Machine) alt sağ/sol köşesindeki bakım şirketi etiketinde, mağaza tentelerinde ve okul/klinik tabelalarında 10 haneli telefon + 〒 posta kodu yazılıdır. Kodlar kuzeyden güneye 01 → 09 sırasıyla akar.',
        desc: '011’den 099’a tüm sabit kodlar, 03/06 ikili şehir kodları ve sahte 0120/090 tuzakları.',
        decoder: true,
        bands: [
          { cls: 'q0', key: '01', title: '011–016 Hokkaido · 017 Aomori · 018 Akita · 019 Iwate', sub: 'En kuzey 011 Sapporo ile açılır, Iwate 019 ile biter.', ids: ['hokkaido', 'aomori', 'akita', 'iwate'] },
          { cls: 'q1', key: '02', title: '022–029 · G. Tohoku → Niigata → Nagano → K. Kanto', sub: '22 Miyagi, 23 Yamagata, 24 Fukushima, 25 Niigata, 26 Nagano, 27 Gunma, 28 Tochigi, 29 Ibaraki.', ids: ['miyagi', 'yamagata', 'fukushima', 'niigata', 'nagano', 'gunma', 'tochigi', 'ibaraki'] },
          { cls: 'q2', key: '03/04', title: '03 Tokyo · 04x Greater Kanto (042–049)', sub: '042 batı Tokyo, 043/047 Chiba, 044–046 Kanagawa, 048/049 Saitama.', ids: ['tokyo', 'saitama', 'chiba', 'kanagawa'] },
          { cls: 'q3', key: '05', title: '052 Nagoya · 053–059 Chubu/Tokai (+ 055 Yamanashi)', sub: '052 Aichi, 053–055 Shizuoka/Yamanashi, 057–058 Gifu, 059 Mie.', ids: ['aichi', 'shizuoka', 'yamanashi', 'gifu', 'mie'] },
          { cls: 'q4', key: '06/07', title: '06 Osaka · 07x Kansai + 076 Hokuriku', sub: '072 Osaka b., 073 Wakayama, 074 Nara/Shiga, 075 Kyoto, 076 Toyama/Ishikawa, 077 Shiga/Fukui, 078–079 Hyogo.', ids: ['osaka', 'kyoto', 'hyogo', 'nara', 'wakayama', 'shiga', 'toyama', 'ishikawa', 'fukui'] },
          { cls: 'q5', key: '08', title: '082–086 Chugoku · 087–089 Shikoku', sub: '082/084 Hiroshima, 083 Yamaguchi, 085 Shimane/Tottori, 086 Okayama · 087 Kagawa, 088 Tokushima/Kochi, 089 Ehime.', ids: ['hiroshima', 'yamaguchi', 'tottori', 'shimane', 'okayama', 'tokushima', 'kagawa', 'ehime', 'kochi'] },
          { cls: 'q7', key: '09', title: '092–099 Kyushu & Okinawa (098)', sub: '092–094 Fukuoka, 095 Saga/Nagasaki, 096 Kumamoto, 097 Oita, 098 Miyazaki/Okinawa, 099 Kagoshima.', ids: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa'] }
        ],
        rules: [
          {
            title: 'Konum vermeyen telefon tuzakları',
            body: 'Her sıfırla başlayan numara şehir vermez; otomat veya tır üzerinde şunları ele:',
            traps: [
              ['0120-xxx-xxx / 0800', 'Ücretsiz müşteri hizmetleri (Freedial) — ülke geneli aynıdır, yok say!'],
              ['070 / 080 / 090 (11 hane)', 'Cep telefonu numarasıdır; başında 10 değil 11 rakam varsa konum vermez.'],
              ['098 = Okinawa vs Miyazaki', 'Direkte 3+kana+3 Kyushu plakası varsa 098 Miyazaki’dir; plaka başında iri bölge rakamı (1–6) + tayfun beton evleri varsa Okinawa!']
            ],
            ids: ['okinawa', 'miyazaki', 'tokyo', 'osaka']
          }
        ]
      },
      {
        key: 'prefektor',
        navLabel: 'Kanji & İz',
        icon: 'list',
        drillPreset: 'loc',
        mapMode: 'reg',
        labelMode: 'name',
        title: 'Kanji il ekleri (都道府県) ve bölge ayıran yol işaretleri',
        lead: 'Nereye bakılır: Sokak direğindeki adres etiketinin ve kavşak tabelalarındaki yer adının son karakterine bak (都 / 道 / 府 / 県). Yanına çatı kiremidi rengi, trafik ışığı yönü ve yol korkuluk rengini eklediğinde ili hemen kapatırsın.',
        desc: '都/道/府/県 kanji kuralı, dikey trafik lambaları, kızıl Sekishu kiremit ve Yamaguchi korkulukları.',
        rules: [
          {
            title: 'Tek karakterle coğrafya okuma & 4 ikonik saha kuralı',
            body: 'Adres sonunda yazan bu ekleri ve yalnızca belirli illerde görülen donanımları eşleştir:',
            traps: [
              ['都 (To) / 道 (Do) / 府 (Fu) / 県 (Ken)', '東京都 = sadece Tokyo · 北海道 = sadece Hokkaido · 大阪府 / 京都府 = sadece Osaka & Kyoto · diğer 43 il = 県!'],
              ['Turuncu / altın korkuluklar', 'Yalnızca Yamaguchi ilindeki prefektörlük yollarında (kendō) korkuluklar parlak mandalina turuncusudur!'],
              ['Parlak pas-kırmızı Sekishu çatı + siyah kiremit', 'Batıda kızıl Sekishu kiremit = Shimane/Batı Chugoku (Energia turuncu ok ile); kuzey Japonya Denizi’nde parlak siyah sırlı kiremit = Ishikawa/Toyama (yatay Hokuriku plaka).'],
              ['Dikey trafik lambası + Yabane okları', 'Dikey trafik ışıkları = karlı kuzey/Japonya Denizi (Hokkaido, Tohoku, Hokuriku); kırmızı-beyaz aşağı Yabane kar oku = neredeyse her zaman Hokkaido!']
            ],
            ids: ['tokyo', 'hokkaido', 'osaka', 'kyoto', 'yamaguchi', 'shimane', 'toyama', 'ishikawa']
          }
        ]
      }
    ],
    presets: [
      { id: 'mix', label: 'Karışık', q: ['loc', 'visual', 'code', 'codeToUnit', 'clueToUnit'] },
      { id: 'visual', label: 'Direkler', q: ['visual', 'clueToUnit'] },
      { id: 'code', label: '01–09 Kod', q: ['code', 'codeToUnit'] },
      { id: 'loc', label: '47 İl Yeri', q: ['loc'] }
    ],
    simTypes: [
      { v: 'pole', label: 'Direk fotoğrafı' },
      { v: 'tel', label: 'Otomat telefonu' },
      { v: 'postal', label: 'Posta 〒 + kod' },
      { v: 'clue', label: 'Saha tarifi' }
    ],
    makeSimClue: makeSimClue
  });
})(typeof window !== 'undefined' ? window : globalThis);

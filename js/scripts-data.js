/* scripts-data.js — Hindistan çevresi: yazı sistemleri (alfabeler) ve hangi yerde hangi yazının görüldüğü.
   Kaynaklar: Hindistan Anayasası 8. Çizelge ve eyaletlerin resmî dil mevzuatı, Unicode betik tabloları,
   Street View’da en sık görülen tabela dili örüntüleri. Metinler Türkçe, örnek sözcükler özgün yazıda. */
(function (g) {
  'use strict';

  /* aile: karıştırılan yazılar aynı ailede toplanır (alıştırmada kapsam ve şık seçimi için) */
  var FAMS = [
    { id: 'north', label: 'Kuzey ve batı', sub: 'Devanagari · Gurmukhi · Gujarati' },
    { id: 'east',  label: 'Doğu ve kuzeydoğu', sub: 'Bengali · Assam · Odia · Meitei · Ol Chiki' },
    { id: 'south', label: 'Güney', sub: 'Telugu · Kannada · Malayalam · Tamil' },
    { id: 'round', label: 'Yuvarlak komşular', sub: 'Sinhala · Burmese' },
    { id: 'hima',  label: 'Diğer yazılar', sub: 'Tibet · Urdu · Latin' }
  ];

  /* ---------------------------------------------------------------------------------------------
     YAZILAR. cls = haritadaki renk sırası (s0…s16). conf = karıştırılanlar (en çok → en az).
     words: [özgün yazı, okunuş, Türkçesi]. gist: tek cümlelik ayırt edici özellik.
     --------------------------------------------------------------------------------------------- */
  var SCRIPTS = [
    { id: 'deva', tr: 'Devanagari', nat: 'देवनागरी', lang: 'hi', fam: 'north', cls: 0,
      langs: 'Hintçe · Marathi · Nepalce · Konkani · Bodo · Dogri',
      gist: 'Harflerin üstünden kesintisiz geçen yatay çizgi ve uzun dik çubuklar.',
      tells: [
        'Kelimenin tepesinde baştan sona uzanan düz bir çizgi (shirorekha) var; harfler bu çizgiden “asılı” görünür.',
        'Harf sonlarında uzun dik çubuk (ा ी) sık görülür; şekiller dar, yüksek ve köşelidir.',
        'Hintçe mi Marathi mi? Marathi’de “आहे” ve “ळ” harfi görürsün; Hintçe’de “है”, “का/की/के”. Nepalce’de “छ”, “को”, “मा”.'
      ],
      words: [['भारत', 'Bhārat', 'Hindistan'], ['स्वागत', 'svāgat', 'hoş geldiniz'], ['पुलिस', 'pulis', 'polis'], ['अस्पताल', 'aspatāl', 'hastane'], ['राजस्थान', 'Rājasthān', 'Rajasthan']],
      conf: ['guru', 'beng', 'gujr', 'tibt'], dig: '०१२३४५६७८९', hint: 'Harfleri tek bir çizgi birbirine bağlıyor.' },
    { id: 'beng', tr: 'Bengali', nat: 'বাংলা', lang: 'bn', fam: 'east', cls: 1,
      langs: 'Bengalce (Batı Bengal, Tripura, Bangladeş)',
      gist: 'Üst çizgili ama harfler eğik, dalgalı ve yuvarlak; sol-sağ işaretler harfi sarar.',
      tells: [
        'Devanagari gibi üst çizgi var; ama harfler daha yumuşak, eğri ve “akıcı” görünür.',
        'ে ো ৈ gibi ünlü işaretleri harfin SOLUNA geçer ya da iki yandan sarar.',
        'Rakamlar: Bangladeş’te tabelalarda Bengal rakamları (০১২৩৪৫) sık görülür; Batı Bengal’de çoğunlukla 0-9.'
      ],
      words: [['বাংলা', 'Bānlā', 'Bengalce'], ['কলকাতা', 'Kolkātā', 'Kalküta'], ['স্বাগতম', 'swāgatam', 'hoş geldiniz'], ['ঢাকা', 'Ḍhākā', 'Dakka'], ['বাংলাদেশ', 'Bānlādesh', 'Bangladeş']],
      conf: ['asm', 'deva', 'orya', 'guru'], dig: '০১২৩৪৫৬৭৮৯', hint: 'Üst çizgi var ve harfler eğik, dalgalı.' },
    { id: 'asm', tr: 'Assam', nat: 'অসমীয়া', lang: 'as', fam: 'east', cls: 2,
      langs: 'Assamca (Assam)',
      gist: 'Bengali ile aynı yazı; ayrım: ৰ (kancalı ra) ve ৱ (wa) harfleri.',
      tells: [
        'Bengali yazısını kullanır; fark iki harftedir: ৰ (altı kancalı “ra”) ve ৱ (“wa”). Bengali’de bunların yerine র ve ব var.',
        'Assam’ın adı kendi yazısıyla “অসম” (Oxom). Bengali’de “আসাম”.',
        'Assam’ın güneyindeki Barak Vadisi’nde (Silchar) tabelalar düz Bengali olur.'
      ],
      words: [['অসম', 'Oxom', 'Assam'], ['গুৱাহাটী', 'Guwāhāṭī', 'Guvahati'], ['ব্ৰহ্মপুত্ৰ', 'Brahmaputra', 'Brahmaputra Nehri'], ['স্বাগতম', 'swāgatam', 'hoş geldiniz']],
      conf: ['beng', 'orya', 'deva'], dig: '০১২৩৪৫৬৭৮৯', hint: 'Bengali gibi ama ৰ ve ৱ harfleri var.' },
    { id: 'guru', tr: 'Gurmukhi', nat: 'ਗੁਰਮੁਖੀ', lang: 'pa', fam: 'north', cls: 3,
      langs: 'Pencapça (Punjab)',
      gist: 'Üst çizgili, küçük ve yuvarlak harfler; kısa ünlü işaretleri bol.',
      tells: [
        'Üst çizgi var ama harfler Devanagari’den belirgin biçimde daha kısa ve “kıvrık bacaklı”dır.',
        'Gurdwara (Sih tapınağı) tabelalarında ੴ (Ik Onkar) simgesini ve “ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ” yazısını görürsün.',
        'ਸ ਹ ਕ ਪ ਨ ਮ harfleri çok sık; harf sonlarında uzun çubuk yerine kısa ਾ ੀ ੁ işaretleri çıkar.'
      ],
      words: [['ਪੰਜਾਬ', 'Pañjāb', 'Pencap'], ['ਅੰਮ੍ਰਿਤਸਰ', 'Amritsar', 'Amritsar'], ['ਚੰਡੀਗੜ੍ਹ', 'Chaṇḍīgaṛh', 'Chandigarh'], ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'sat srī akāl', 'Sih selamı'], ['ਜੀ ਆਇਆਂ ਨੂੰ', 'jī āiāṃ nūṃ', 'hoş geldiniz']],
      conf: ['deva', 'beng', 'gujr'], dig: '੦੧੨੩੪੫੬੭੮੯', hint: 'Çizgili, kısa ve yuvarlak harfler; Sih tapınağı simgesi.' },
    { id: 'gujr', tr: 'Gujarati', nat: 'ગુજરાતી', lang: 'gu', fam: 'north', cls: 4,
      langs: 'Gujarati (Gujarat, Daman, Diu, Dadra-Nagar Haveli)',
      gist: 'Devanagari’nin üst çizgisiz, daha yuvarlak kuzeni.',
      tells: [
        'Şekiller Devanagari’ye çok benzer ama ÜST ÇİZGİ YOK ve harfler daha yuvarlak, altta kıvrık.',
        'Mumbai’de tabelalarda bile sık çıkar (Gujaratî tüccar çevresi).',
        'Hızlı kural: Devanagari’yi hatırlıyorsun ama çizgi yoksa büyük ihtimalle Gujarati.'
      ],
      words: [['ગુજરાત', 'Gujarāt', 'Gujarat'], ['અમદાવાદ', 'Amdāvād', 'Ahmedabad'], ['સુરત', 'Surat', 'Surat'], ['સ્વાગત', 'svāgat', 'hoş geldiniz']],
      conf: ['deva', 'guru', 'orya'], dig: '૦૧૨૩૪૫૬૭૮૯', hint: 'Devanagari gibi ama üst çizgi yok.' },
    { id: 'orya', tr: 'Odia', nat: 'ଓଡ଼ିଆ', lang: 'or', fam: 'east', cls: 5,
      langs: 'Odia (Odisha)',
      gist: 'Üst çizgi yok; her harfin üstünde yuvarlak bir yay (kubbe) var.',
      tells: [
        'Harflerin tepesinde “kubbe” ya da kıvrık yay şeklinde bir çıkıntı vardır; çizgi yoktur.',
        'Harfler yuvarlak ve kapalıdır; Bengali’den farkı üst çizginin olmaması.',
        'Telugu/Kannada’dan farkı: onlarda küçük “v” işaretleri çok, Odia’da büyük yuvarlak kubbeler baskın.'
      ],
      words: [['ଓଡ଼ିଶା', 'Oḍiśā', 'Odisha'], ['ଭୁବନେଶ୍ୱର', 'Bhubaneswar', 'Bhubaneswar'], ['କଟକ', 'Kaṭaka', 'Cuttack'], ['ସ୍ୱାଗତ', 'svāgata', 'hoş geldiniz']],
      conf: ['beng', 'telu', 'knda', 'gujr'], dig: '୦୧୨୩୪୫୬୭୮୯', hint: 'Harflerin üstünde yuvarlak “kubbe” var, çizgi yok.' },
    { id: 'telu', tr: 'Telugu', nat: 'తెలుగు', lang: 'te', fam: 'south', cls: 6,
      langs: 'Telugu (Telangana, Andhra Pradesh, Yanam)',
      gist: 'Yuvarlak gövdeler; üstlerinde küçük “v” ve yay işaretleri.',
      tells: [
        'Harfler yuvarlak ve “yumurta” biçimli; tepelerinde küçük v ya da yay şeklinde işaretler (ి ీ ె ే) çok görülür.',
        'Kannada’ya çok benzer: Telugu daha yuvarlak ve işaretler daha “v” gibi; Kannada’da harflerin sağında kalın bir kıvrık kuyruk daha sık.',
        'Hyderabad’da Telugu’nun yanında Urdu da (ikinci resmî dil) görülür.'
      ],
      words: [['తెలంగాణ', 'Telangāṇa', 'Telangana'], ['ఆంధ్రప్రదేశ్', 'Āndhra Pradeś', 'Andhra Pradesh'], ['హైదరాబాద్', 'Haidarābād', 'Haydarabad'], ['విజయవాడ', 'Vijayawāḍa', 'Vijayawada'], ['స్వాగతం', 'svāgatam', 'hoş geldiniz']],
      conf: ['knda', 'orya', 'mlym', 'taml'], dig: '౦౧౨౩౪౫౬౭౮౯', hint: 'Yuvarlak harfler, üstlerinde küçük “v” işaretleri.' },
    { id: 'knda', tr: 'Kannada', nat: 'ಕನ್ನಡ', lang: 'kn', fam: 'south', cls: 7,
      langs: 'Kannada (Karnataka)',
      gist: 'Telugu’nun kardeşi; harflerin sağında kalın kıvrık kuyruklar.',
      tells: [
        'Telugu ile aynı kökten gelir; gövdeler yuvarlak ama harflerin sağ üstünde ve altında kalın, kıvrık “kuyruk”lar öne çıkar.',
        'Üst işaretler Telugu’daki gibi sivri “v” değil, yumuşak kıvrımdır.',
        'Karnataka tabelalarında genelde Kannada üstte, İngilizce altta; Hintçe ulusal yollarda eklenir.'
      ],
      words: [['ಕರ್ನಾಟಕ', 'Karnāṭaka', 'Karnataka'], ['ಬೆಂಗಳೂರು', 'Beṅgaḷūru', 'Bengaluru'], ['ಮೈಸೂರು', 'Maisūru', 'Mysuru'], ['ಸ್ವಾಗತ', 'svāgata', 'hoş geldiniz']],
      conf: ['telu', 'mlym', 'orya', 'sinh'], dig: '೦೧೨೩೪೫೬೭೮೯', hint: 'Telugu gibi yuvarlak ama kalın kıvrık kuyruklar var.' },
    { id: 'mlym', tr: 'Malayalam', nat: 'മലയാളം', lang: 'ml', fam: 'south', cls: 8,
      langs: 'Malayalam (Kerala, Lakshadweep, Mahé)',
      gist: 'Bol halka ve ilmek; neredeyse tüm harfler döngülü ve yuvarlak.',
      tells: [
        'Çok yuvarlak: iç içe halkalar, ilmekler ve ഠ gibi tam daireler görürsün.',
        'Üst çizgi yok; yazı “yuvarlanıp giden” bir sicime benzer.',
        'Sinhala ve Burmese ile karışır: Malayalam’da halkalar daha büyük ve harf başına birden çok ilmek bulunur.'
      ],
      words: [['കേരളം', 'Kēraḷaṃ', 'Kerala'], ['തിരുവനന്തപുരം', 'Tiruvananthapuram', 'Thiruvananthapuram'], ['കൊച്ചി', 'Koccī', 'Kochi'], ['കോഴിക്കോട്', 'Kōzhikkōṭ', 'Kozhikode'], ['സ്വാഗതം', 'svāgataṃ', 'hoş geldiniz']],
      conf: ['sinh', 'mymr', 'taml', 'knda'], dig: '൦൧൨൩൪൫൬൭൮൯', hint: 'Çok yuvarlak, döngülü, halkalı.' },
    { id: 'taml', tr: 'Tamil', nat: 'தமிழ்', lang: 'ta', fam: 'south', cls: 9,
      langs: 'Tamilce (Tamil Nadu, Puducherry, Sri Lanka kuzeyi)',
      gist: 'Sade, ince çizgili, açık yapılı harfler; ilmek az.',
      tells: [
        'Harf sayısı az ve şekiller sade: çubuk, kısa kıvrım ve yuvarlak karışımı. Ağır süs ve yoğun işaret yok.',
        'Malayalam kadar halkalı değil; Telugu/Kannada kadar “şapkalı” da değil.',
        'Tamil Nadu’da devlet tabelalarında çoğu kez Hintçe YOK: Tamil + İngilizce görürsen büyük ihtimalle Tamil Nadu.'
      ],
      words: [['தமிழ்நாடு', 'Tamiḻnāṭu', 'Tamil Nadu'], ['சென்னை', 'Ceṉṉai', 'Chennai'], ['மதுரை', 'Maturai', 'Madurai'], ['வணக்கம்', 'vaṇakkam', 'merhaba'], ['கோயம்புத்தூர்', 'Kōyamputtūr', 'Coimbatore']],
      conf: ['mlym', 'sinh', 'knda', 'telu'], dig: '௦௧௨௩௪௫௬௭௮௯', hint: 'Sade, ince, az ilmekli harfler.' },
    { id: 'sinh', tr: 'Sinhala', nat: 'සිංහල', lang: 'si', fam: 'round', cls: 10,
      langs: 'Sinhala (Sri Lanka)',
      gist: 'Dalgalı, çengelli, yuvarlak harfler; çoğu harfte açık halka.',
      tells: [
        'Harfler yuvarlak, dalgalı ve çengelli; üst çizgi yok. Birçok harf “açık halka” gibi.',
        'Malayalam’a benzer ama Sinhala daha “yumuşak dalgalı”, ණ ඩ ම gibi geniş harfleri var.',
        'Sri Lanka’da Sinhala, Tamil ve İngilizce yan yana yazılır (üç dilli tabela).'
      ],
      words: [['ශ්‍රී ලංකාව', 'Śrī Laṅkāva', 'Sri Lanka'], ['කොළඹ', 'Koḷamba', 'Kolombo'], ['ආයුබෝවන්', 'āyubōvan', 'merhaba'], ['මහනුවර', 'Mahanuvara', 'Kandy'], ['ගාල්ල', 'Gālla', 'Galle']],
      conf: ['mlym', 'mymr', 'knda', 'taml'], dig: '෦෧෨෩෪෫෬෭෮෯', hint: 'Dalgalı, çengelli, açık halkalı harfler.' },
    { id: 'tibt', tr: 'Tibet', nat: 'བོད་ཡིག', lang: 'bo', fam: 'hima', cls: 11,
      langs: 'Tibetçe · Dzongkha (Butan) · Ladakhi',
      gist: 'İnce üst çizgi + hece araları nokta (་) ile ayrılır.',
      tells: [
        'Harfler ince bir üst çizgiden sarkar; kelimeler boşlukla değil, hece sonundaki küçük noktayla (་ tsek) ayrılır.',
        'Harfler altlı üstlü yığılır (üst üste iki üç şekil).',
        'Gördüğün yer: Ladakh, Sikkim, Arunachal’in batısı (Tawang) ve Butan. Butan’da Dzongkha da bu yazıyla yazılır.'
      ],
      words: [['བོད', 'Bod', 'Tibet'], ['ལ་དྭགས', 'La dwags', 'Ladakh'], ['འབྲུག', 'Druk', 'Butan'], ['ཐིམ་ཕུག', 'Thim phug', 'Thimphu'], ['བཀྲ་ཤིས་བདེ་ལེགས', 'bkra shis bde legs', 'Tashi Delek (selam)']],
      conf: ['deva', 'mymr', 'mtei'], dig: '༠༡༢༣༤༥༦༧༨༩', hint: 'İnce üst çizgi ve hece araları nokta.' },
    { id: 'arab', tr: 'Urdu (Arap-Fars)', nat: 'اردو', lang: 'ur', fam: 'hima', cls: 12, rtl: true,
      langs: 'Urduca · Keşmirce · Sindhice',
      gist: 'Sağdan sola akar; bitişik, eğik ve noktalı harfler.',
      tells: [
        'Yazı SAĞDAN SOLA ilerler; harfler bitişiktir ve çok sayıda nokta taşır.',
        'Urdu’ya özgü ٹ ڈ ڑ ں ے gibi harfler Arapça’dan ayırır; Nastaliq stilinde satır merdiven gibi aşağı eğilir.',
        'Gördüğün yer: Cammu-Keşmir’in vadisi, Hyderabad, Lucknow ve Delhi’nin eski mahalleleri, Kerala’da cami tabelaları, tabii ki Pakistan.'
      ],
      words: [['اردو', 'Urdū', 'Urduca'], ['کشمیر', 'Kashmīr', 'Keşmir'], ['پاکستان', 'Pākistān', 'Pakistan'], ['خوش آمدید', 'xush āmadīd', 'hoş geldiniz'], ['حیدرآباد', 'Haidarābād', 'Haydarabad']],
      conf: ['tibt', 'mtei', 'olck'], dig: '۰۱۲۳۴۵۶۷۸۹', hint: 'Sağdan sola, bitişik, noktalı.' },
    { id: 'olck', tr: 'Ol Chiki', nat: 'ᱚᱞ ᱪᱤᱠᱤ', lang: 'sat', fam: 'east', cls: 13,
      langs: 'Santali (Jharkhand, Odisha, Batı Bengal, Assam)',
      gist: 'Daire, yarım daire ve çubuktan oluşan geometrik, “oyuncak” gibi harfler.',
      tells: [
        'Hiçbir Hint yazısına benzemez: daire ve çubuk kombinasyonları, yan yatmış U’lar ve oklar.',
        'Santal (Adivasi) topluluğunun yazısı; okul, kasaba ve yerel tabelalarda Devanagari/Latin ile birlikte yazılır.',
        'Gördüğün yer: Jharkhand’ın Santhal Pargana’sı, Mayurbhanj (Odisha), Batı Bengal’in batısı.'
      ],
      words: [['ᱥᱟᱱᱛᱟᱲᱤ', 'Santāṛi', 'Santali'], ['ᱡᱚᱦᱟᱨ', 'Johār', 'selam'], ['ᱚᱞ ᱪᱤᱠᱤ', 'Ol Chiki', 'Ol Chiki']],
      conf: ['mtei', 'tibt', 'mymr'], dig: '᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙', hint: 'Daire ve çubuk geometrisi.' },
    { id: 'mtei', tr: 'Meetei Mayek', nat: 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ', lang: 'mni', fam: 'east', cls: 14,
      langs: 'Meitei / Manipuri (Manipur)',
      gist: 'Kanca, çubuk ve halka karışımı; rün gibi köşeli, üst çizgi yok.',
      tells: [
        'Her harf bir beden uzvunun adını taşır; şekiller kanca, çubuk ve küçük halkaların birleşimidir.',
        'Bengali yazısıyla yan yana görülür: Manipur’da eskiden Bengali kullanılırdı, şimdi Meetei Mayek resmî.',
        'Manipur’un dışında neredeyse hiç görülmez: görürsen eyalet büyük ölçüde belli.'
      ],
      words: [['ꯃꯅꯤꯄꯨꯔ', 'Manipur', 'Manipur'], ['ꯏꯝꯐꯥꯜ', 'Imphal', 'Imphal'], ['ꯃꯤꯇꯩ', 'Meitei', 'Meitei halkı']],
      conf: ['olck', 'tibt', 'mymr'], dig: '꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹', hint: 'Rün gibi kanca ve halka, çizgisiz.' },
    { id: 'mymr', tr: 'Burmese', nat: 'မြန်မာ', lang: 'my', fam: 'round', cls: 15,
      langs: 'Burmaca (Myanmar)',
      gist: 'Neredeyse tamamen daire biçimli, eşit boy “baloncuk” harfler.',
      tells: [
        'Harflerin çoğu kapalı daire ya da dairenin bir parçasıdır (ဝ ပ ၀); boyları eşit görünür.',
        'Sinhala ve Malayalam’la karışır; Burmese’de çok daha az dalga, daha çok daire var.',
        'Gördüğün yer: Myanmar ve Hindistan’ın doğu sınırındaki küçük topluluklar.'
      ],
      words: [['မြန်မာ', 'Myanma', 'Myanmar'], ['ရန်ကုန်', 'Yangon', 'Yangon'], ['မန္တလေး', 'Mandalay', 'Mandalay'], ['မင်္ဂလာပါ', 'mingalaba', 'merhaba']],
      conf: ['sinh', 'mlym', 'tibt', 'mtei'], dig: '၀၁၂၃၄၅၆၇၈၉', hint: 'Baloncuk gibi daireler.' },
    { id: 'latn', tr: 'Latin', nat: 'Latin', lang: 'en', fam: 'hima', cls: 16, noquiz: true,
      langs: 'İngilizce · Mizo · Khasi · Garo · Naga dilleri',
      gist: 'Yalnızca Latin harfi: Kuzeydoğu’nun üç “İngilizce” eyaleti.',
      tells: [
        'Nagaland, Mizoram ve Meghalaya’da yerel diller Latin harfiyle yazılır; tabelalarda başka yazı neredeyse yok.',
        'Arunachal Pradesh’te de resmî dil İngilizce; Hintçe (Devanagari) yardımcı.',
        'Başka her yerde Latin, eyalet yazısının ALTINDA ikinci satır olarak görülür; tek başına eyalet ipucu değildir.'
      ],
      words: [['Mizoram', 'Mizoram', 'Mizoram'], ['Aizawl', 'Aizawl', 'Aizawl'], ['Shillong', 'Shillong', 'Shillong'], ['Kohima', 'Kohima', 'Kohima']],
      conf: [], dig: '0123456789', hint: 'Yalnızca Latin harfi.' }
  ];

  /* ---------------------------------------------------------------------------------------------
     YERLER (36 eyalet/birlik bölgesi + 6 komşu). main = tabelaya HAKİM yazılar (ilki haritada renk verir);
     also = düzenli ama ikincil. Tabela notları Street View çalışmasına göredir.
     [id, ad, kısa ad, tür, merkez, main, also, dil, not, bölge]
     --------------------------------------------------------------------------------------------- */
  var ROWS = [
    ['andhra-pradesh', 'Andhra Pradesh', 'Andhra', 'state', 'Amaravati', ['telu'], ['latn', 'deva', 'arab'], 'Telugu', 'Telugu üstte, İngilizce altta. Telangana ile aynı yazı: sınırda yazıyla ayıramazsın, başka ipuçlarına bak.', 'south'],
    ['arunachal-pradesh', 'Arunachal Pradesh', 'Arunachal', 'state', 'Itanagar', ['latn'], ['deva', 'tibt'], 'İngilizce (resmî) · Hintçe lingua franca', 'Çoğunlukla yalnız Latin; batıda Tawang çevresinde Tibet yazısı.', 'ne'],
    ['assam', 'Assam', 'Assam', 'state', 'Dispur', ['asm'], ['beng', 'deva', 'latn'], 'Assamca', 'ৰ ve ৱ harflerini ara. Barak Vadisi (Silchar) düz Bengali; Bodo bölgesinde Devanagari de çıkar.', 'ne'],
    ['bihar', 'Bihar', 'Bihar', 'state', 'Patna', ['deva'], ['arab', 'latn'], 'Hintçe', 'Hintçe (Devanagari) + İngilizce; kasabalarda Urdu tabelalar da var.', 'north'],
    ['chhattisgarh', 'Chhattisgarh', 'Chhattisgarh', 'state', 'Raipur', ['deva'], ['latn'], 'Hintçe · Chhattisgarhi', 'Hintçe kuşağı: Devanagari + İngilizce.', 'central'],
    ['goa', 'Goa', 'Goa', 'state', 'Panaji', ['deva'], ['latn'], 'Konkani · Marathi', 'Konkani Devanagari ile, ama İngilizce/Romi Konkani (Latin) tabelalar çok yaygın: Goa’da Latin ağırlığı yüksek.', 'west'],
    ['gujarat', 'Gujarat', 'Gujarat', 'state', 'Gandhinagar', ['gujr'], ['deva', 'latn'], 'Gujarati', 'Gujarati üstte; ulusal yollarda Hintçe ve İngilizce eklenir.', 'west'],
    ['haryana', 'Haryana', 'Haryana', 'state', 'Chandigarh', ['deva'], ['guru', 'latn'], 'Hintçe', 'Hintçe + İngilizce; Pencap sınırında Gurmukhi sık.', 'north'],
    ['himachal-pradesh', 'Himachal Pradesh', 'Himachal', 'state', 'Shimla', ['deva'], ['tibt', 'guru', 'latn'], 'Hintçe', 'Hintçe + İngilizce; Spiti ve Lahaul’da manastır tabelalarında Tibet yazısı.', 'north'],
    ['jharkhand', 'Jharkhand', 'Jharkhand', 'state', 'Ranchi', ['deva'], ['olck', 'arab', 'beng', 'latn'], 'Hintçe', 'Hintçe + İngilizce; Santhal Pargana’da Ol Chiki, doğuda Bengali dokunuşu.', 'east'],
    ['karnataka', 'Karnataka', 'Karnataka', 'state', 'Bengaluru', ['knda'], ['latn', 'deva', 'arab'], 'Kannada', 'Kannada üstte, İngilizce altta; ulusal yollarda Hintçe de var. Maharashtra sınırında Marathi’ye dönüşür.', 'south'],
    ['kerala', 'Kerala', 'Kerala', 'state', 'Thiruvananthapuram', ['mlym'], ['latn', 'arab'], 'Malayalam', 'Malayalam + İngilizce; Hintçe nadir. Camilerde Arapça/Urdu.', 'south'],
    ['madhya-pradesh', 'Madhya Pradesh', 'Madhya Pr.', 'state', 'Bhopal', ['deva'], ['arab', 'latn'], 'Hintçe', 'Hintçe + İngilizce; Bhopal’in eski kentinde Urdu.', 'central'],
    ['maharashtra', 'Maharashtra', 'Maharashtra', 'state', 'Mumbai', ['deva'], ['latn', 'gujr', 'arab'], 'Marathi', 'Devanagari ama MARATHİ: “आहे” ve “ळ”. Mumbai’de Gujarati ve İngilizce de çok.', 'west'],
    ['manipur', 'Manipur', 'Manipur', 'state', 'Imphal', ['mtei'], ['beng', 'latn', 'deva'], 'Meitei', 'Meetei Mayek tabelaları artıyor; eski tabelalarda Bengali yazı da çıkar.', 'ne'],
    ['meghalaya', 'Meghalaya', 'Meghalaya', 'state', 'Shillong', ['latn'], ['beng', 'deva'], 'İngilizce · Khasi · Garo', 'Khasi ve Garo dilleri Latin harfiyle yazılır; tabelalar yalnız Latin.', 'ne'],
    ['mizoram', 'Mizoram', 'Mizoram', 'state', 'Aizawl', ['latn'], ['deva'], 'Mizo · İngilizce', 'Latin harfi; kiliseler ve “Baptist” tabelaları çok.', 'ne'],
    ['nagaland', 'Nagaland', 'Nagaland', 'state', 'Kohima', ['latn'], ['deva'], 'İngilizce · Nagamese', 'Yalnız Latin; kilise ve “Baptist” tabelaları baskın.', 'ne'],
    ['odisha', 'Odisha', 'Odisha', 'state', 'Bhubaneswar', ['orya'], ['deva', 'latn', 'olck'], 'Odia', 'Odia üstte, İngilizce altta; kuzeyde Santali (Ol Chiki) görülebilir.', 'east'],
    ['punjab', 'Punjab', 'Punjab', 'state', 'Chandigarh', ['guru'], ['deva', 'latn'], 'Pencapça', 'Gurmukhi üstte; Hintçe ve İngilizce altta. Sih tapınağı tabelaları.', 'north'],
    ['rajasthan', 'Rajasthan', 'Rajasthan', 'state', 'Jaipur', ['deva'], ['latn', 'arab', 'gujr'], 'Hintçe · Rajasthani', 'Hintçe + İngilizce; çöl bölgesinde Latin ağırlığı artar.', 'north'],
    ['sikkim', 'Sikkim', 'Sikkim', 'state', 'Gangtok', ['deva', 'latn'], ['tibt'], 'Nepalce · İngilizce', 'Nepalce (Devanagari) ve İngilizce; manastırlarda Tibet yazısı.', 'hima'],
    ['tamil-nadu', 'Tamil Nadu', 'Tamil Nadu', 'state', 'Chennai', ['taml'], ['latn'], 'Tamilce', 'Tamil + İngilizce; devlet tabelalarında Hintçe YOK. Ulusal yol tabelalarında Hintçe eklenmiş olabilir.', 'south'],
    ['telangana', 'Telangana', 'Telangana', 'state', 'Hyderabad', ['telu'], ['arab', 'latn', 'deva'], 'Telugu · Urdu', 'Telugu üstte; Hyderabad’da Urdu (ikinci resmî dil) sıkça görülür.', 'south'],
    ['tripura', 'Tripura', 'Tripura', 'state', 'Agartala', ['beng'], ['latn'], 'Bengalce · Kokborok', 'Bengali tabelalar; Hintçe neredeyse yok. Kokborok’ta Latin de var.', 'ne'],
    ['uttar-pradesh', 'Uttar Pradesh', 'Uttar Pr.', 'state', 'Lucknow', ['deva'], ['arab', 'latn'], 'Hintçe · Urdu', 'Hintçe (Devanagari) + İngilizce; şehirlerde Urdu da (ikinci resmî dil).', 'north'],
    ['uttarakhand', 'Uttarakhand', 'Uttarakhand', 'state', 'Dehradun', ['deva'], ['latn'], 'Hintçe', 'Hintçe + İngilizce.', 'north'],
    ['west-bengal', 'West Bengal', 'W. Bengal', 'state', 'Kolkata', ['beng'], ['latn', 'deva', 'olck', 'arab'], 'Bengalce', 'Bengali üstte; Hintçe ve İngilizce eşlik eder. Darjeeling’de Nepalce (Devanagari).', 'east'],
    ['andaman-nicobar', 'Andaman ve Nicobar', 'A&N', 'ut', 'Port Blair', ['latn'], ['deva', 'beng'], 'Hintçe · İngilizce', 'İngilizce ve Hintçe; Bengalli yerleşimciler yüzünden Bengali de çıkar.', 'islands'],
    ['chandigarh', 'Chandigarh', 'Chandigarh', 'ut', 'Chandigarh', ['deva', 'latn'], ['guru'], 'İngilizce · Hintçe · Pencapça', 'Üç yazı yan yana: Latin + Devanagari + Gurmukhi.', 'north'],
    ['dnhdd', 'Dadra, Nagar Haveli, Daman ve Diu', 'DNH·DD', 'ut', 'Daman', ['gujr'], ['deva', 'latn'], 'Gujarati · Hintçe · Marathi', 'Gujarati ağırlıklı; Silvassa’da Marathi etkisi, Daman/Diu’da Portekiz mirası olarak Latin.', 'west'],
    ['delhi', 'Delhi', 'Delhi', 'ut', 'Yeni Delhi', ['deva', 'latn'], ['guru', 'arab'], 'Hintçe · İngilizce', 'Hintçe + İngilizce; Pencapça ve Urdu ikinci resmî diller (nadiren tabelada).', 'north'],
    ['jammu-kashmir', 'Jammu ve Keşmir', 'J&K', 'ut', 'Srinagar / Jammu', ['arab', 'deva'], ['latn'], 'Urdu · Keşmirce · Dogri · Hintçe', 'Vadide Urdu (Arap-Fars) ağırlıklı; Jammu’da Devanagari.', 'hima'],
    ['ladakh', 'Ladakh', 'Ladakh', 'ut', 'Leh', ['tibt', 'latn'], ['arab', 'deva'], 'Ladakhi · İngilizce · Urdu', 'İngilizce + Tibet yazısı (Leh, manastırlar); Kargil çevresinde Urdu.', 'hima'],
    ['lakshadweep', 'Lakshadweep', 'Lakshadweep', 'ut', 'Kavaratti', ['mlym'], ['latn', 'arab'], 'Malayalam · Mahl', 'Malayalam + İngilizce; Minicoy’de Divehi (Thaana) yazısı.', 'islands'],
    ['puducherry', 'Puducherry', 'Puducherry', 'ut', 'Puducherry', ['taml'], ['latn', 'telu', 'mlym'], 'Tamilce · Fransızca mirası', 'Tamil + İngilizce/Fransızca Latin; Yanam’da Telugu, Mahé’de Malayalam parçaları.', 'south'],
    ['bangladesh', 'Bangladeş', 'Bangladeş', 'nation', 'Dakka', ['beng'], ['latn', 'arab'], 'Bengalce', 'Bengali + İngilizce, Hintçe YOK. Bengal rakamları (০১২৩) tabelalarda yaygın.', 'nbr'],
    ['bhutan', 'Butan', 'Butan', 'nation', 'Thimphu', ['tibt'], ['latn'], 'Dzongkha · İngilizce', 'Dzongkha (Tibet yazısı) + İngilizce; ulusal tarz zorunlu mimari.', 'nbr'],
    ['myanmar', 'Myanmar', 'Myanmar', 'nation', 'Naypyidaw', ['mymr'], ['latn'], 'Burmaca', 'Burmese + bazen İngilizce.', 'nbr'],
    ['nepal', 'Nepal', 'Nepal', 'nation', 'Katmandu', ['deva'], ['latn', 'tibt'], 'Nepalce', 'Devanagari (Nepalce) + İngilizce; rakamlar çoğu kez Devanagari (०१२३).', 'nbr'],
    ['pakistan', 'Pakistan', 'Pakistan', 'nation', 'İslamabad', ['arab'], ['latn'], 'Urduca · Pencapça · Sindhice', 'Urdu (Nastaliq) + İngilizce.', 'nbr'],
    ['sri-lanka', 'Sri Lanka', 'Sri Lanka', 'nation', 'Kolombo (Sri Jayawardenepura)', ['sinh', 'taml'], ['latn'], 'Sinhala · Tamilce · İngilizce', 'Üç yazı yan yana: Sinhala + Tamil + Latin.', 'nbr']
  ];
  var PLACES = ROWS.map(function (r) {
    return { id: r[0], en: r[1], short: r[2], kind: r[3], cap: r[4], main: r[5], also: r[6], lang: r[7], note: r[8], zone: r[9] };
  });

  var ZONES = {
    north: 'Kuzey', west: 'Batı', central: 'Orta', east: 'Doğu', ne: 'Kuzeydoğu', south: 'Güney', hima: 'Himalaya', islands: 'Adalar', nbr: 'Komşu ülke'
  };

  /* ---------------------------------------------------------------------------------------------
     KARIŞANLAR: ayırt etmenin tek cümlelik yolu (anahtar: id|id, alfabetik sıra)
     --------------------------------------------------------------------------------------------- */
  var PAIRS = {
    'deva|guru': 'İkisi de üst çizgili. Gurmukhi daha kısa, “kıvrık bacaklı” harflerle ve ਾ ੀ ੁ gibi küçük işaretlerle dolu; Devanagari’de uzun dik çubuklar (ा ी) baskın.',
    'beng|deva': 'Bengali daha eğri ve yumuşak, üst çizgi daha alçak; Devanagari dik, dar ve köşeli.',
    'deva|gujr': 'Gujarati = Devanagari’nin üst çizgisiz, daha yuvarlak hali. Çizgi yoksa Gujarati.',
    'gujr|guru': 'Gurmukhi üst çizgili ve kısa; Gujarati çizgisiz ve daha yuvarlak.',
    'asm|beng': 'Aynı yazı. Assam’ın tek ipucu ৰ (altı kancalı ra) ve ৱ (wa); Bengali’de র ve ব.',
    'beng|orya': 'Bengali’nin üst çizgisi var; Odia’da yok, onun yerine her harfte yuvarlak bir kubbe var.',
    'asm|orya': 'Assam: çizgili, eğik; Odia: çizgisiz, her harfin üstünde kubbe.',
    'knda|telu': 'Çok benzer: Telugu daha yuvarlak ve üstünde küçük “v” işaretleri var; Kannada’da harflerin sağında kalın kıvrık kuyruklar öne çıkar.',
    'orya|telu': 'Odia’da yuvarlak büyük kubbe; Telugu’da küçük “v” ve yay işaretleri, harfler daha dar.',
    'knda|orya': 'Odia’da yuvarlak kubbeler baskın; Kannada’da kalın kuyruklar ve karmaşık alt şekiller var.',
    'mlym|taml': 'Malayalam bol halka ve ilmekli; Tamil sade, ince çizgili, açık yapılı.',
    'mlym|sinh': 'Malayalam’da halkalar büyük ve ഠ gibi daireler çok; Sinhala dalgalı, çengelli.',
    'mlym|mymr': 'Burmese neredeyse düz daireler; Malayalam’da ilmek ve döngüler karışık.',
    'mymr|sinh': 'Burmese daire, daire, daire; Sinhala dalgalı çengeller ve açık halkalar.',
    'knda|mlym': 'Kannada’da kalın kuyruklar ve köşeli kıvrımlar; Malayalam’da yuvarlak ilmekler.',
    'sinh|taml': 'Tamil sade ve ince; Sinhala yuvarlak, dalgalı ve daha “doldurulmuş”.',
    'knda|taml': 'Tamil sade; Kannada’nın harfleri kalın kıvrımlarla dolu.',
    'taml|telu': 'Tamil sade ve açık; Telugu yuvarlak ve üstünde “v” işaretleri çok.',
    'deva|tibt': 'Devanagari’de çizgi sürekli, sözcükler boşlukla ayrılır; Tibet’te ince çizgi ve hece araları nokta (་).',
    'mtei|olck': 'Ol Chiki daire/çubuk geometrisi, Meetei Mayek kanca-halka karışımı ve rün gibi.',
    'mtei|tibt': 'Tibet’te ince üst çizgi ve ayırıcı noktalar var; Meetei Mayek’te çizgi yok.',
    'olck|tibt': 'Ol Chiki: büyük daire ve çubuklar; Tibet: ince üst çizgi ve noktalı hece araları.',
    'mymr|tibt': 'Burmese yuvarlak halkalar; Tibet ince çizgili ve alt üste yığılı.',
    'mtei|mymr': 'Burmese yuvarlak daireler; Meetei Mayek köşeli kanca ve çubuk.',
    'mymr|olck': 'Burmese yuvarlak ve eşit boy; Ol Chiki daha geometrik, daire + çubuk.',
    'arab|tibt': 'Urdu sağdan sola ve bitişik; Tibet soldan sağa, ince çizgili ve noktalı.',
    'arab|mtei': 'Urdu sağdan sola, noktalı ve bitişik; Meetei Mayek soldan sağa, ayrı harfler.',
    'arab|olck': 'Urdu bitişik, sağdan sola; Ol Chiki ayrı ayrı geometrik şekiller.',
    'beng|guru': 'İkisinde de üst çizgi var; Bengali daha eğik ve yuvarlak, Gurmukhi daha kısa, köşeli ve sade. Sih tapınağı simgesi ੴ ya da “ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ” görürsen Gurmukhi.',
    'asm|deva': 'Assam yazısı Bengali tarzı: eğri, yumuşak, alçak üst çizgili; Devanagari dik ve köşeli. ৰ (altı kancalı ra) görürsen Assam.',
    'knda|sinh': 'Kannada’da kalın kıvrık kuyruklar ve köşeli kıvrımlar; Sinhala daha yuvarlak, dalgalı ve açık halkalı (Sri Lanka).',
    'mlym|telu': 'Malayalam bol halkalı ve ilmekli; Telugu yuvarlak ama harflerin üstünde küçük “v” işaretleri var.',
    'gujr|orya': 'Gujarati’de harfler Devanagari gibi dik ve çizgisiz; Odia’da her harfin üstünde yuvarlak bir kubbe var.'
  };
  function pairKey(a, b) { return a < b ? a + '|' + b : b + '|' + a; }

  /* aynı harf, farklı yazılar (ka ga ma ra la pa ta na sa ha) */
  var ROSETTA = {
    cols: ['deva', 'beng', 'guru', 'gujr', 'orya', 'telu', 'knda', 'mlym', 'taml', 'sinh', 'tibt', 'mymr'],
    rows: [
      ['ka', 'क', 'ক', 'ਕ', 'ક', 'କ', 'క', 'ಕ', 'ക', 'க', 'ක', 'ཀ', 'က'],
      ['ga', 'ग', 'গ', 'ਗ', 'ગ', 'ଗ', 'గ', 'ಗ', 'ഗ', '—', 'ග', 'ག', 'ဂ'],
      ['ma', 'म', 'ম', 'ਮ', 'મ', 'ମ', 'మ', 'ಮ', 'മ', 'ம', 'ම', 'མ', 'မ'],
      ['ra', 'र', 'র', 'ਰ', 'ર', 'ର', 'ర', 'ರ', 'ര', 'ர', 'ර', 'ར', 'ရ'],
      ['la', 'ल', 'ল', 'ਲ', 'લ', 'ଲ', 'ల', 'ಲ', 'ല', 'ல', 'ල', 'ལ', 'လ'],
      ['pa', 'प', 'প', 'ਪ', 'પ', 'ପ', 'ప', 'ಪ', 'പ', 'ப', 'ප', 'པ', 'ပ'],
      ['ta', 'त', 'ত', 'ਤ', 'ત', 'ତ', 'త', 'ತ', 'ത', 'த', 'ත', 'ཏ', 'တ'],
      ['na', 'न', 'ন', 'ਨ', 'ન', 'ନ', 'న', 'ನ', 'ന', 'ந', 'න', 'ན', 'န'],
      ['ha', 'ह', 'হ', 'ਹ', 'હ', 'ହ', 'హ', 'ಹ', 'ഹ', 'ஹ', 'හ', 'ཧ', 'ဟ']
    ]
  };

  /* karar akışı: bir tabelaya bakınca bu sırayla sor */
  var FLOW = [
    { t: 'Yazı sağdan sola mı akıyor?', b: 'Evet → Urdu (Arap-Fars). Cammu-Keşmir vadisi, Hyderabad, Uttar Pradesh şehirleri, Pakistan.', go: ['arab'] },
    { t: 'Harflerin üstünde kesintisiz yatay çizgi var mı?', b: 'Evet → Devanagari, Bengali / Assam ya da Gurmukhi (hece araları noktalıysa Tibet). Hayır → ikinci adıma geç.', go: ['deva', 'beng', 'guru', 'tibt'] },
    { t: 'Çizgili ise: hangisi?', b: 'Uzun dik çubuklar, dar köşeli harfler → Devanagari. Eğri, yumuşak, işaretler harfi sarar → Bengali (ৰ ৱ görürsen Assam). Küçük kıvrık bacaklı harfler ve ੴ → Gurmukhi.', go: ['deva', 'beng', 'asm', 'guru'] },
    { t: 'Çizgisiz ve Devanagari’ye benziyorsa', b: 'Daha yuvarlak, çizgi yok → Gujarati. Her harfin üstünde yuvarlak kubbe → Odia.', go: ['gujr', 'orya'] },
    { t: 'Yuvarlak “güney” harfleri: küçük v ve yaylar mı, kalın kuyruklar mı?', b: 'Küçük v ve yaylar, yuvarlak → Telugu. Sağda kalın kıvrık kuyruk → Kannada. İkisini yan yana ezberle.', go: ['telu', 'knda'] },
    { t: 'Halka halka dönüyor mu?', b: 'Büyük, bol ilmek → Malayalam (Kerala). Dalgalı çengeller → Sinhala (Sri Lanka). Eşit daireler → Burmese (Myanmar).', go: ['mlym', 'sinh', 'mymr'] },
    { t: 'Sade, ince, açık yapılı mı?', b: 'Çok az süs, çubuk + küçük kıvrımlar → Tamil (Tamil Nadu).', go: ['taml'] },
    { t: 'Hiçbirine benzemiyor mu?', b: 'Daire + çubuk geometrisi → Ol Chiki (Santali). Kanca, çubuk, halka rün gibi → Meetei Mayek (Manipur). Sadece Latin → Kuzeydoğu’nun İngilizce eyaletleri.', go: ['olck', 'mtei', 'latn'] }
  ];

  /* tabela işaretleri: Hindistan çalışması için genel ipuçları */
  var TIPS = [
    { t: 'Üç dilli tabela düzeni', b: 'Hindistan yol tabelaları genelde üç satır: eyalet dili, Hintçe, İngilizce. Tamil Nadu bunun istisnası (Hintçe çoğu yerde yok). Bu yüzden Devanagari görmek tek başına “Hindi kuşağı” demek değildir: eyaletin kendi yazısını ARA.' },
    { t: 'Sınır geçişlerinde yazı değişir', b: 'Karnataka ↔ Telangana/AP: Kannada → Telugu. Karnataka ↔ Maharashtra: Kannada → Marathi (Devanagari). Odisha ↔ Batı Bengal: Odia → Bengali. Gujarat ↔ Rajasthan: Gujarati → Devanagari. Sınır şehirlerinde iki yazı yan yana çıkar.' },
    { t: 'Hindi mi, Marathi mi, Nepalce mi?', b: 'Üçü de Devanagari. Marathi: “आहे”, “ळ”, “ऱ्य”. Hintçe: “है”, “का/की/के”, “और”. Nepalce: “छ”, “को”, “मा”. Maharashtra ve Goa’da Marathi/Konkani, Darjeeling/Sikkim/Nepal’de Nepalce.' },
    { t: 'Batı Bengal mi, Bangladeş mi?', b: 'İkisi de Bengali. Hindistan’da Hintçe ve İngilizce eşlik eder; Bangladeş’te Hintçe yoktur. Bangladeş’te Bengal rakamları (০১২৩) daha sık, Hindistan’da 0-9.' },
    { t: 'Assam mı, Bengal mi?', b: 'ৰ (altı kancalı ra) ve ৱ (wa) görürsen Assam. Barak Vadisi’nde (Silchar) Assam yerine düz Bengali yazılır.' },
    { t: 'Yalnız Latin = Kuzeydoğu', b: 'Nagaland, Mizoram, Meghalaya: yerel diller Latin harfiyle yazılır. Kiliseler, “Baptist”, “Church” tabelaları çok. Arunachal’de İngilizce resmî.' },
    { t: 'Urdu = nüfus ve tarih', b: 'Keşmir vadisi, Hyderabad, Lucknow, Bhopal, Delhi eski mahalleleri ve camiler. Urdu hem Pakistan’ı hem de Hindistan’daki Müslüman çoğunluklu mahalleleri işaret eder.' }
  ];

  /* Yer adı kendi yazısında: [yazı, metin, okunuş]. Yazı her zaman yerin main[0] değeridir (Bangladeş, Myanmar vb. dahil). */
  var NATIVE = {
    'andhra-pradesh': ['telu', 'ఆంధ్రప్రదేశ్', 'Āndhra Pradēś'],
    'arunachal-pradesh': ['latn', 'Arunachal Pradesh', 'Arunachal Pradesh'],
    'assam': ['asm', 'অসম', 'Oxom'],
    'bihar': ['deva', 'बिहार', 'Bihār'],
    'chhattisgarh': ['deva', 'छत्तीसगढ़', 'Chhattīsgaṛh'],
    'goa': ['deva', 'गोवा', 'Gōvā'],
    'gujarat': ['gujr', 'ગુજરાત', 'Gujarāt'],
    'haryana': ['deva', 'हरियाणा', 'Hariyāṇā'],
    'himachal-pradesh': ['deva', 'हिमाचल प्रदेश', 'Himāchal Pradēś'],
    'jharkhand': ['deva', 'झारखंड', 'Jhārkhaṇḍ'],
    'karnataka': ['knda', 'ಕರ್ನಾಟಕ', 'Karnāṭaka'],
    'kerala': ['mlym', 'കേരളം', 'Kēraḷaṃ'],
    'madhya-pradesh': ['deva', 'मध्य प्रदेश', 'Madhya Pradēś'],
    'maharashtra': ['deva', 'महाराष्ट्र', 'Mahārāṣṭra'],
    'manipur': ['mtei', 'ꯃꯅꯤꯄꯨꯔ', 'Manipur'],
    'meghalaya': ['latn', 'Meghalaya', 'Meghalaya'],
    'mizoram': ['latn', 'Mizoram', 'Mizoram'],
    'nagaland': ['latn', 'Nagaland', 'Nagaland'],
    'odisha': ['orya', 'ଓଡ଼ିଶା', 'Oḍiśā'],
    'punjab': ['guru', 'ਪੰਜਾਬ', 'Pañjāb'],
    'rajasthan': ['deva', 'राजस्थान', 'Rājasthān'],
    'sikkim': ['deva', 'सिक्किम', 'Sikkim'],
    'tamil-nadu': ['taml', 'தமிழ்நாடு', 'Tamiḻnāṭu'],
    'telangana': ['telu', 'తెలంగాణ', 'Telaṅgāṇa'],
    'tripura': ['beng', 'ত্রিপুরা', 'Tripurā'],
    'uttar-pradesh': ['deva', 'उत्तर प्रदेश', 'Uttar Pradēś'],
    'uttarakhand': ['deva', 'उत्तराखंड', 'Uttarākhaṇḍ'],
    'west-bengal': ['beng', 'পশ্চিমবঙ্গ', 'Paścimbaṅga'],
    'andaman-nicobar': ['latn', 'Andaman & Nicobar', 'Andaman & Nicobar'],
    'chandigarh': ['deva', 'चंडीगढ़', 'Chaṇḍīgaṛh'],
    'dnhdd': ['gujr', 'દમણ અને દીવ', 'Damaṇ anē Dīv'],
    'delhi': ['deva', 'दिल्ली', 'Dillī'],
    'jammu-kashmir': ['arab', 'جموں و کشمیر', 'Jammūṇ o Kashmīr'],
    'ladakh': ['tibt', 'ལ་དྭགས', 'La dwags'],
    'lakshadweep': ['mlym', 'ലക്ഷദ്വീപ്', 'Lakṣadvīp'],
    'puducherry': ['taml', 'புதுச்சேரி', 'Putuccēri'],
    'bangladesh': ['beng', 'বাংলাদেশ', 'Bānlādesh'],
    'bhutan': ['tibt', 'འབྲུག་ཡུལ', 'Druk Yul'],
    'myanmar': ['mymr', 'မြန်မာ', 'Myanma'],
    'nepal': ['deva', 'नेपाल', 'Nēpāl'],
    'pakistan': ['arab', 'پاکستان', 'Pākistān'],
    'sri-lanka': ['sinh', 'ශ්‍රී ලංකාව', 'Śrī Laṅkāva']
  };

  /* arama için ek yazılışlar: İngilizce kent adları ve eski adlar */
  var ALIAS = {
    'andhra-pradesh': ['Amaravati', 'Vijayawada', 'Visakhapatnam'], 'arunachal-pradesh': ['Itanagar'], 'assam': ['Dispur', 'Guwahati'], 'bihar': ['Patna'],
    'chhattisgarh': ['Raipur', 'Chattisgarh'], 'goa': ['Panaji', 'Panjim'], 'gujarat': ['Gandhinagar', 'Ahmedabad', 'Surat'], 'haryana': ['Gurgaon', 'Gurugram'],
    'himachal-pradesh': ['Shimla'], 'jharkhand': ['Ranchi'], 'karnataka': ['Bengaluru', 'Bangalore', 'Mysuru', 'Mysore'], 'kerala': ['Thiruvananthapuram', 'Trivandrum', 'Kochi', 'Cochin'],
    'madhya-pradesh': ['Bhopal', 'Indore'], 'maharashtra': ['Mumbai', 'Bombay', 'Pune'], 'manipur': ['Imphal'], 'meghalaya': ['Shillong'], 'mizoram': ['Aizawl'], 'nagaland': ['Kohima'],
    'odisha': ['Orissa', 'Bhubaneswar'], 'punjab': ['Amritsar', 'Ludhiana'], 'rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'], 'sikkim': ['Gangtok'],
    'tamil-nadu': ['Chennai', 'Madras', 'Madurai', 'Coimbatore'], 'telangana': ['Hyderabad'], 'tripura': ['Agartala'], 'uttar-pradesh': ['Lucknow', 'Varanasi', 'Agra'],
    'uttarakhand': ['Dehradun'], 'west-bengal': ['Kolkata', 'Calcutta', 'Darjeeling'], 'andaman-nicobar': ['Port Blair', 'Andaman', 'Nicobar'], 'chandigarh': [],
    'dnhdd': ['Daman', 'Diu', 'Silvassa', 'Dadra', 'Nagar Haveli'], 'delhi': ['New Delhi', 'Yeni Delhi'], 'jammu-kashmir': ['Srinagar', 'Jammu', 'Kashmir', 'Keşmir'],
    'ladakh': ['Leh', 'Kargil'], 'lakshadweep': ['Kavaratti'], 'puducherry': ['Pondicherry'], 'bangladesh': ['Dhaka', 'Bangladesh'], 'bhutan': ['Thimphu', 'Bhutan'],
    'myanmar': ['Burma', 'Naypyidaw', 'Yangon', 'Rangoon'], 'nepal': ['Kathmandu'], 'pakistan': ['Islamabad', 'Karachi', 'Lahore'], 'sri-lanka': ['Colombo', 'Ceylon', 'Kandy']
  };

  var byId = {}, pById = {};
  SCRIPTS.forEach(function (s, i) { s.idx = i; byId[s.id] = s; });
  PLACES.forEach(function (p) { pById[p.id] = p; });

  function norm(str) {
    return String(str).toLowerCase().replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9؀-ۿऀ-῿ꀀ-﷿]+/g, '');
  }
  function statesOf(sid, onlyMain) {
    return PLACES.filter(function (p) { return p.main.indexOf(sid) >= 0 || (!onlyMain && p.also.indexOf(sid) >= 0); }).map(function (p) { return p.id; });
  }
  function pairTell(a, b) { return PAIRS[pairKey(a, b)] || null; }

  g.AS_DATA = {
    FAMS: FAMS, SCRIPTS: SCRIPTS, PLACES: PLACES, ZONES: ZONES, PAIRS: PAIRS, ROSETTA: ROSETTA, FLOW: FLOW, TIPS: TIPS, NATIVE: NATIVE, ALIAS: ALIAS,
    sById: byId, pById: pById, norm: norm, statesOf: statesOf, pairTell: pairTell, pairKey: pairKey
  };
})(typeof window !== 'undefined' ? window : globalThis);

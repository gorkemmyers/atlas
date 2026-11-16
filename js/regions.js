/* regions.js — bölge kayıt defteri.
   Yeni bölge eklemek: verisini ve ekranlarını yaz, sonra aşağıdaki LIST'e BİR kayıt ekle.
   Üst bölge sekmeleri, ana sayfa, genel bakış ve alt çalışma alanı çubuğu bu kayıttan kurulur.

   Kayıt alanları
     id        kısa ASCII kimlik, tire içermez (adres: #<id> ya da #<id>-<alan>)
     name      tam ad · short: sekmede görünen kısa ad · code: iki harfli kısaltma
     area      ana sayfada grup başlığı (AREAS içinden)
     tone      renk kimliği: blue · green · red · amber · violet · teal (css: --tone-*)
     blurb     genel bakışta bir iki cümle · line: ana sayfada tek satır
     sections  çalışma alanları; ilki her zaman 'genel' (view: 'overview'). { id, label, icon, view, desc }
               alt çubukta bu sırayla görünür (telefonda en çok 6). İsteğe bağlı alanlar:
                 tab     view: 'guide' için konu: 'regions' | 'area' | 'names'
                 drill   konu sayfasındaki “Alıştır” düğmesinin açtığı Pratik ön ayarı (Bank.PRESETS kimliği)
                 hidden  alt çubukta görünmez, adresi ve bağlantıları çalışır (Pratik, Keşfet gibi)
                 ov      gizli olsa da genel bakıştaki listede görünür
     plan      önerilen çalışma sırası: { title, text, to: alan kimliği, launch: ekrana verilen ön ayar }
     keys()    bölgenin tüm tekrar öğesi anahtarları (ilerleme için)
     geo()     silüet için harita verisi ({ bbox, m: { co, in } }); haritası yoksa null döndür, bölge kodu plakası gösterilir */
(function (g) {
  'use strict';
  var U = g.U, SRS = g.SRS, s = U.s, h = U.h;

  /* ana sayfada bu sırayla gruplanır */
  var AREAS = ['Avrupa ve Avrasya', 'Asya', 'Kuzey Amerika', 'Güney Amerika', 'Afrika', 'Okyanusya'];

  var GENEL = { id: 'genel', label: 'Genel', icon: 'home', view: 'overview', group: 'overview' };

  function vnKeys() {
    var B = g.Bank, all = [];
    B.CATS.forEach(function (c) { c.kinds.forEach(function (k) { all = all.concat(B.itemKeys(k, {})); }); });
    return all;
  }
  function asKeys() { return g.ASBank ? g.ASBank.allKeys() : []; }

  var LIST = [
    {
      id: 'vietnam', name: 'Vietnam', short: 'Vietnam', code: 'VN', area: 'Asya', tone: 'blue',
      line: '63 il: bölgeler, alan kodları ve il adı mantığı',
      blurb: 'Tabelalardaki üç ana ipucu: il adı, alan kodu ve bölge.',
      note: { title: 'Neden 63 il, 34 değil?', text: 'Vietnam 1 Temmuz 2025’te 63 ili 34 idari birime indirdi. Street View görüntüleri, tabelalar ve telefon alan kodları bu tarihten öncesine ait olduğu için uygulama eski 63 ili kullanır.' },
      sections: [
        GENEL,
        { id: 'kesfet', label: 'Keşfet', icon: 'map', view: 'explore', group: 'discover', desc: 'İl kartı, alan kodu, komşular ve ad kökü.' },
        { id: 'bolgeler', label: 'Bölgeler', icon: 'layers', view: 'guide', tab: 'regions', drill: 'bolge', group: 'learn', desc: '8 bölge ve il tablosu.' },
        { id: 'alankodlari', label: 'Alan kodları', icon: 'phone', view: 'guide', tab: 'area', drill: 'alan', group: 'learn', desc: '“02”den sonraki hane ve kod aileleri.' },
        { id: 'iladlari', label: 'İl adları', icon: 'tag', view: 'guide', tab: 'names', drill: 'ad', group: 'learn', desc: 'Bình, Quảng, Hà-… ad kuralları.' },
        { id: 'pratik', label: 'Pratik', icon: 'target', view: 'practice', group: 'train', desc: 'Harita, şıklı ve yazılı tekrar.' },
        { id: 'simulasyon', label: 'Simülasyon', icon: 'pin', view: 'sim', group: 'train', desc: 'Tabela ve telefon ipucuyla haritada konum bul.' },
        { id: 'ilerleme', label: 'İlerleme', icon: 'chart', view: 'progress', group: 'train', desc: 'Ustalık haritası ve zayıf noktalar.' }
      ],
      plan: [
        { title: 'Haritayı keşfet', text: '63 ili bölgelere, alan kodlarına veya ad köklerine göre boya; illeri incele.', to: 'kesfet' },
        { title: 'Bölgeleri oturt', text: 'Kuzey, Orta, Güney ve 8 bölgenin ana ipuçlarını öğren.', to: 'bolgeler' },
        { title: 'Alan kodunu çöz', text: '02 + sonraki hane bölgeyi verir: 20x kuzeydoğu, 25x güney orta kıyı, 29x Mekong.', to: 'alankodlari' },
        { title: 'İl adının mantığı', text: 'Bình, Quảng, Hà-, Bắc- kurallarıyla adı yerle eşleştir.', to: 'iladlari' },
        { title: 'Pratikte pekiştir', text: 'Harita turu, alan kodları ve karma tekrarla hızlan.', to: 'pratik' },
        { title: 'Simülasyonda sına', text: 'İpucundan ili tahmin et ve haritaya iğneyi bırak.', to: 'simulasyon' }
      ],
      keys: vnKeys, geo: function () { return g.VN_GEO; }
    },
    {
      id: 'guneyasya', name: 'Güney Asya', short: 'Güney Asya', code: 'GA', area: 'Asya', tone: 'green',
      line: '17 yazı, 42 yer: tabeladaki yazıdan eyaleti tahmin et',
      blurb: 'Yazı şeklinden eyaleti ve ülkeyi ayırt et: Hindistan, Bangladeş, Nepal, Butan, Sri Lanka ve Myanmar.',
      sections: [
        GENEL,
        { id: 'kesfet', label: 'Keşfet', icon: 'map', view: 'exploreAs', group: 'discover', desc: 'Baskın yazı, tabela örnekleri ve komşular.' },
        { id: 'alfabe', label: 'Alfabeler', icon: 'langs', view: 'guideAs', tab: 'scripts', drill: 'yer', group: 'learn', desc: '17 yazı, 5 aile ve hızlı karar akışı.' },
        { id: 'tabelalar', label: 'Tabelalar', icon: 'book', view: 'guideAs', tab: 'pairs', drill: 'cift', group: 'learn', desc: 'Karışan yazı çiftleri ve sınır ayrımları.' },
        { id: 'bolgeler', label: 'Eyaletler', icon: 'layers', view: 'guideAs', tab: 'places', drill: 'esy', group: 'learn', desc: '9 coğrafi kuşak ve 42 yer tablosu.' },
        { id: 'pratik', label: 'Pratik', icon: 'target', view: 'practiceAs', group: 'train', desc: 'Yazıdan yer bul, çiftleri ayır ve harita.' },
        { id: 'simulasyon', label: 'Simülasyon', icon: 'pin', view: 'simAs', group: 'train', desc: 'Yerel tabela ipucuyla haritada konum bul.' },
        { id: 'ilerleme', label: 'İlerleme', icon: 'chart', view: 'progressAs', group: 'train', desc: 'Ustalık haritası ve zayıf noktalar.' }
      ],
      plan: [
        { title: 'Haritayı keşfet', text: 'Baskın yazıya göre boyalı haritada dolaş; Hindi kuşağını ve güney dörtlüsünü gör.', to: 'kesfet' },
        { title: 'Yazı şekillerini tanı', text: 'Üst çizgi, yuvarlaklık ve ayırt edici harflerle karar akışını öğren.', to: 'alfabe' },
        { title: 'Benzer yazıları ayır', text: 'Bengal–Assam, Telugu–Kannada, Malayalam–Sinhala farklarını gör.', to: 'tabelalar' },
        { title: 'Eyaletleri oturt', text: '9 kuşak ve 42 yer tablosuyla yazıları haritaya bağla.', to: 'bolgeler' },
        { title: 'Pratikte pekiştir', text: 'Önce “Yazıdan yer bul” ve “Benzer yazıları ayır” ile yazıları haritaya bağla.', to: 'pratik', launch: { preset: 'yer' } },
        { title: 'Simülasyonda sına', text: 'Yerel veya yol tabelasına bakıp haritaya iğneyi bırak.', to: 'simulasyon' }
      ],
      keys: asKeys, geo: function () { return g.AS_GEO; }
    }
  ];

  var byId = {};
  LIST.forEach(function (r) { byId[r.id] = r; });

  /* eski adresler: bölge eklenmeden önceki (#kesfet) ve konulara bölünmeden önceki (#vietnam-rehber) */
  var ALIAS = {
    kesfet: 'vietnam-kesfet', rehber: 'vietnam-iladlari', pratik: 'vietnam-pratik',
    simulasyon: 'vietnam-simulasyon', ilerleme: 'vietnam-ilerleme', alfabe: 'guneyasya-alfabe',
    'vietnam-rehber': 'vietnam-iladlari',
    'guneyasya-yazilar': 'guneyasya-alfabe',
    'guneyasya-alistirma': 'guneyasya-pratik',
    'guneyasya-harita': 'guneyasya-kesfet',
    'guneyasya-eyaletler': 'guneyasya-bolgeler'
  };
  /* adı değişen bölgeler: #hindistan-alfabe → #guneyasya-alfabe */
  var RALIAS = { hindistan: 'guneyasya' };

  function hash(rid, sid) { return !sid || sid === 'genel' ? rid : rid + '-' + sid; }
  /* alt çubukta görünen alanlar (gizli olanlar hariç) */
  function tabs(r) { return r.sections.filter(function (x) { return !x.hidden; }); }
  function section(r, sid) {
    for (var i = 0; i < r.sections.length; i++) if (r.sections[i].id === sid) return r.sections[i];
    return null;
  }
  /* adres → { region, section, canon } · ana sayfa → { hub: true } · tanınmayan → null */
  function parse(raw) {
    var id = String(raw == null ? '' : raw).replace(/^#/, '');
    if (!id || id === 'ana') return { hub: true, canon: 'ana' };
    if (ALIAS[id]) id = ALIAS[id];
    var rid, sid;
    if (byId[id] || RALIAS[id]) {
      rid = id; sid = 'genel';
    } else {
      var li = id.lastIndexOf('-'), pfx = li > 0 ? id.slice(0, li) : '';
      if (pfx && (byId[pfx] || RALIAS[pfx])) {
        rid = pfx; sid = id.slice(li + 1);
      } else {
        var i = id.indexOf('-');
        rid = i < 0 ? id : id.slice(0, i);
        sid = i < 0 ? 'genel' : id.slice(i + 1);
      }
    }
    if (RALIAS[rid]) rid = RALIAS[rid];
    var r = byId[rid];
    var sec = r ? section(r, sid) : null;
    return r && sec ? { region: r, section: sec, canon: hash(r.id, sec.id) } : null;
  }

  /* ana sayfa grupları: AREAS sırasıyla, listede olup AREAS'ta olmayanlar sona */
  function groups() {
    var out = [], seen = {};
    AREAS.concat(LIST.map(function (r) { return r.area; })).forEach(function (a) {
      if (seen[a]) return; seen[a] = 1;
      var rs = LIST.filter(function (r) { return r.area === a; });
      if (rs.length) out.push({ area: a, regions: rs });
    });
    return out;
  }

  function progress(r) {
    var keys = r.keys(), mastered = 0;
    keys.forEach(function (k) { if (SRS.box(k) >= 4) mastered++; });
    return { total: keys.length, seen: SRS.seenCount(keys), mastered: mastered, mean: SRS.mean(keys) };
  }

  /* son çalışılan yer (Genel hariç) */
  function last() {
    var L = g.Store && g.Store.data.set.last;
    var p = L && typeof L === 'object' ? parse(hash(L.r, L.s)) : null;
    return p && !p.hub ? p : null;
  }

  /* bölge silüeti: kıyı çizgisi dolgusu + ince iç sınırlar. Renk: --rg-c (ton sınıfından) */
  function silhouette(r, cls) {
    var G = r.geo && r.geo();
    /* haritası henüz yoksa: bölge kodu, yol tabelası plakası gibi */
    if (!G || !G.bbox || !G.m) return h('span', { 'class': 'sil sil-code' + (cls ? ' ' + cls : ''), 'aria-hidden': 'true' }, h('b', {}, r.code));
    var bb = G.bbox, w = bb[2] - bb[0], hh = bb[3] - bb[1], pad = Math.max(w, hh) * 0.03;
    return s('svg', {
      'class': 'sil' + (cls ? ' ' + cls : ''), viewBox: (bb[0] - pad) + ' ' + (bb[1] - pad) + ' ' + (w + 2 * pad) + ' ' + (hh + 2 * pad),
      preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true', focusable: 'false'
    }, s('path', { d: G.m.co, 'class': 'sil-f' }), s('path', { d: G.m['in'], 'class': 'sil-l' }));
  }

  g.Regions = {
    list: LIST, byId: byId, areas: AREAS, alias: ALIAS, hash: hash, section: section, tabs: tabs, parse: parse, groups: groups, progress: progress, last: last, silhouette: silhouette,
    genelSection: GENEL,
    addCountry: function (spec) {
      if (!spec || byId[spec.id]) return;
      if (AREAS.indexOf(spec.area) < 0) AREAS.push(spec.area);
      if (spec.sections && spec.sections[0] && spec.sections[0].id !== 'genel') spec.sections.unshift(GENEL);
      LIST.push(spec);
      byId[spec.id] = spec;
      if (spec.ralias) spec.ralias.forEach(function (a) { RALIAS[a] = spec.id; });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);

# KURALLAR.md — Atlas çalışma kuralları

Bu dosya Atlas üzerinde çalışan **herkes** içindir: insan, Claude, Gemini/Antigravity, başka bir yapay zekâ.
Değişiklik yapmadan önce baştan sona oku. Kısa özet `GEMINI.md` ve `AGENTS.md` içindedir; **asıl kurallar burada**.

Bu dosya ucu açıktır. Burada olmayan bir durumla karşılaşırsan §14'teki öncelik sırasıyla karar ver, kararı §15'e yaz.
Bir kural projeye zarar veriyorsa kuralı değiştir ve nedenini §15'e yaz; sessizce çiğneme.

---

## 0. Proje tek paragrafta

Atlas, GeoGuessr'da **bölge tahmini** için bir çalışma rehberidir: haritalı, çok bölgeli, tarayıcıda çalışan, sunucusuz bir site
(vanilla JS, derleme yok). Her bölgede **en çok işe yarayan birkaç konu** çalışılır (Vietnam: tabeladaki telefon alan kodları ve 63 ilin yeri;
Güney Asya: yazıyı tanıyıp eyaleti bulmak; Rusya: federal yol numaraları (haritada çizgi olarak da) ve cumhuriyetlerdeki ek harfler; Japonya: kanji il adları ve
elektrik direği levhası/bandı/şeridi; Türkiye, Brezilya, Meksika: tabeladaki telefon kodu ve bölgeyi gösteren manzara …). Tabelada okunan her şeyin **nerede ve nasıl
yazıldığı** küçük çizimlerle ya da gerçek fotoğrafla gösterilir (§9, §9b). Amaç "her şeyin olduğu bir site" (Plonk It gibi) değil, **az ve keskin**dir.
Kullanıcı Görkem'dir (Türkçe konuşur), site ileride çevrimiçi yayınlanacak.

## 1. Altın kurallar (hepsini oku, hepsine uy)

1. **Az ve keskin.** Bir ülkede 1–2 ana konu, **en fazla 3**. Üçüncü konu yalnızca *bölgeyi gösteren görünüm* (`yerel`: bitki, yapı, direk, manzara) ya da tabelada okunan *ad* çalışması olabilir
   (ör. Türkiye: alan kodu + belediye adı + bölgesel görünüm).
   **İstisna:** Türkiye 4 konu taşır (alan kodu, yollar, belediye adı, bölgesel görünüm; kullanıcı kararı 16 Kasım 2026); başka ülkeye bu istisna verilmez. Her konu "bu bilgi GeoGuessr'da ekranda görünür ve bölgeyi daraltır" testini geçmeli (§2.1). `verify-packs` 3'ten fazla konuda uyarır.
2. **Telefon/alan/posta kodunu her ülkeye kopyalama.** Bu hata zaten yapıldı (22 ülke arşive alındı). Kod, ancak tabelada sık görünen ve bölgeyi gerçekten ayıran ülkede konudur
   (Vietnam, Türkiye, Meksika, Brezilya, Kore). Rusya'da şehir kodu işe yaramaz; orada yol numarası ve harf vardır.
3. **Tek çatı.** Her sekme aynı iskeleti ve aynı ortak bileşenleri (`MapView`, `Kit`, `app.layout`) kullanır. Bir sekmede olan harita ayarı hepsinde olur (§4).
4. **Uydurma yok.** Doğrulayamadığın bilgiyi, fotoğrafı, kodu yazma; alanı boş bırak (§8). "Hatırladığım" bilgi doğrulanmış bilgi değildir.
5. **Fotoğraf = gerçek, doğrulanmış, tek yerli.** Yalnızca Wikimedia Commons; yazar ve lisans Commons'tan aynen; alt yazı yalnızca fotoğrafta **gerçekten okunanı** söyler (§9).
   Fotoğraf yoksa ya da yetmiyorsa **etiketli özgün çizim** kullanılır; çizim asla fotoğraf diye sunulmaz (§9b).
6. **Türkçe açık olmalı.** Jargonu (alan kodu, plaka, DDD, LADA, kanji, palochka…) ilk geçtiği yerde tanımla; "bu nedir / nerede görünür / ne söyler" sırasıyla yaz (§7).
7. **Bitti demeden test et.** `node tools/verify-packs.cjs`, `python3 tools/qa_contract.py`, masaüstü + telefon ekran görüntüsü (§11). Çalıştırmadığın testi "geçti" diye yazma.
8. **Veriyi koddan ayır.** Ülke içeriği `js/packs/<ülke>.js` içindedir (yalnızca veri). Ülkeye özel `if` yazarak motoru bozma; eksik bir şey varsa motora ortak özellik olarak ekle.
9. **Kullanıcının ilerlemesini koru.** localStorage anahtarlarını (`Store`, SRS `srsPrefix:tür:id`) değiştirme/yeniden adlandırma.
10. **İzin isteme, ama kararı yaz.** Kullanıcı yetkiyi verdi; kararlarını ve varsayımlarını §15'e ve son raporuna yaz. Geri döndürülemez bir şey (silme, yayınlama) hariç.
11. **Plaka yok.** GeoGuessr'da plakalar bulanıktır; hiçbir ülkede plaka konusu, plaka fotoğrafı ya da plaka çizimi yapma (kullanıcı kararı, 15 Kasım 2026: "plaka olmaz").
    Vietnam'da da plaka bilgisi önceden kaldırılmıştı. Türkiye kartlarındaki "Plaka 34" gibi il numarası yalnızca ilin kimlik numarasıdır (künye); plaka okuma çalışması değildir.
12. **Çizim = etiketli, belgelenmiş şema.** Yalnızca en az iki kaynakla doğrulanmış olguyu çiz; belgelenmemiş yerleşimi/rengi tahminle çizme (§9b). Bir şeyi çizmemeyi seçtiysen dosyanın başına yaz.

## 2. İçerik ölçütü: ne eklenir, ne eklenmez

### 2.1 Karar testi (konu, ülke ya da bilgi eklemeden önce üç soru)

1. **Görünür mü?** GeoGuessr'da (Street View, tabela, yol, plaka, direk, yazı) bu bilgi ekranda *gerçekten* karşıma çıkar mı? ("Nüfus", "başkent", "bayrak" çıkmaz.)
2. **Daraltır mı?** Bu bilgiyi görünce bölgeyi/ili/eyaleti belirgin biçimde daraltabilir miyim? ("Ülkenin tamamında aynı" bilgi daraltmaz.)
3. **Başka ipucu zaten çözüyor mu?** Evet ise (ör. dil veya araç yönü her şeyi söylüyorsa) ayrı konu yapma; tek cümlelik `cue` yeter.

Üçüne de "evet, evet, hayır" diyemiyorsan **ekleme**.

### 2.2 Eklenmeyenler (örnekler)

- Genel telefon kodu / posta kodu / ISD listeleri, tabelada görünmeyenler.
- Her ülkeye aynı şablonun kopyası ("alan kodu + başkent + nüfus").
- Bayrak, arma, başkent, para birimi, ünlü yemek vb. coğrafya ansiklopedisi.
- Rusya'da şehir alan kodu/telefon (tabelada nadir; kullanıcı açıkça "işe yaramaz" dedi).
- Uydurma "ipucu fotoğrafı" (yapay üretim, başka ülkenin fotoğrafı, çizimi fotoğraf gibi sunmak). Etiketli ve belgelenmiş özgün çizim (§9b) bunun dışındadır.
- Plaka (numara plakası): konu, fotoğraf ya da çizim olarak (§1 kural 11).
- Kaynaklarda anlatılmayan ya da kaynaklar arasında tutarsız bir levha düzenini tahminle çizmek (Rusya karayolu levhası, Kore ve Vietnam il sınırı levhası, Brezilya karayolu kalkanı gibi; bkz. §9b "çizilmeyenler").
- Doğrulanamayan sayılar ("%80 hâkim", "genelde mavi tabela") — kaynak yoksa yazma.

### 2.3 Ülke seçimi

- Şu an yüklü: Vietnam, Güney Asya (özel görünümlü), Rusya, Türkiye, Japonya, Endonezya, Brezilya, Meksika, Güney Kore.
- Arşivde (yüklenmiyor, geri getirilebilir): Almanya, Fransa, İspanya, İtalya, Polonya, İsveç, Norveç, Romanya, Ukrayna, Şili, Kolombiya, Peru, Filipinler, Malezya, Tayvan,
  Güney Afrika, Nijerya, Kenya, Yeni Zelanda, Birleşik Krallık, ABD, Kanada. Nasıl geri getirileceği: `js/_arsiv/README.md`.
- Yeni ülke için önce §2.1'i uygula ve gerekçeyi 3 cümleyle §15'e yaz. Aynı anda 1–2 ülkeden fazla ekleme; her biri tam doğrulanmış olsun.
- Aday ülke fikirleri bu dosyaya karar gibi yazılmaz; öneri olarak §15'e yazılır ve §2.1'den geçerse eklenir.

### 2.4 Bir konu sayfasının içeriği

Her konu (`topics[]`) şu sırayla okunur ve hepsi **kısa**dır:

1. `lead`: ≤ 4 cümle. Bu nedir? Tabelada/yolda nasıl görünür? Bölge hakkında ne söyler, ne söylemez?
2. `decoder` ("çözücü"): kullanıcı gördüğünü yazar (kod, harf), haritada ilgili yer boyanır.
3. `flows`: 2–4 adımlı "hızlı karar akışı".
4. `bands`: gruplar (kod ailesi, yol numarası bandı, harf grubu); dokununca haritada boyanır.
5. `rules`: "Karışanlar" — en sık karıştırılan çiftler ve istisnalar (`traps`).
6. `visuals`: gerçek fotoğraf kartları (§9) ve/ya da özgün çizim kartları (§9b). Başlığı `visualsTitle` verir.

Konu uzadıkça iyi olmaz. Bir kart bir şey öğretir. Tekrar eden satırları birleştir.

**Üç konu türü** (bir ülke bunların en çok üçünü birden taşıyabilir, §1 kural 1):
- *Kod / numara / yazı konusu:* alan kodu, yol numarası, ek harf, kanji. `decoder` ile çözülür (Türkiye `alan`, Rusya `yollar`+`harfler`, Japonya `kanji`).
- *Tabelada okunan ad konusu:* levhada ya da rögar kapağında yazan ad (Türkiye `belediye`, Güney Kore `hangul`).
- *Bölgeyi gösteren görünüm (`yerel`):* bitki, yapı, direk, manzara (Türkiye, Brezilya, Meksika, Endonezya `yerel`). Buraya yalnızca **nadir olmayan ve bir bölgeyi ayıran** ipucu girir
  (cardón / saguaro, araucária, Mardin taş yapıları…). Ülke genelinde aynı olan ya da bölgeyi ayırmayan şey (ör. Meksika'da elektrik direği) girmez. Kart `visuals`'ta çizim ya da fotoğrafla gelir;
  çözücü girdisi gördüğünü tarif eder ve bir birimde değil, görüldüğü **tüm** birimlerde `ids` olarak listelenir (Pratik'te listedeki herhangi biri doğru sayılır).

## 3. Mimari harita

```
index.html              Tüm script'ler tek tek buradan yüklenir; SIRA önemlidir (aşağıda).
css/style.css           Tek stil dosyası (CSS değişkenleri, koyu mod).
js/
  util.js store.js srs.js ui.js kit.js        Temel: U.h (DOM), Store (localStorage), SRS (Leitner), UI.icon/sec/fact/code, Kit (ortak bileşenler)
  photos.js photos-local.js                   Fotoğraf kayıt defteri (tek doğru kaynak) ve isteğe bağlı yerel önbellek eşlemesi
  figures.js figs-<ülke>.js                   Özgün çizimler: ortak kütüphane (FIG) ve ülke çizimleri; kayıt defterine girer (§9b)
  paint.js map.js sheet.js geom.js            Harita motoru (MapView, SVG), alt çekmece, geometri yardımcıları
  regions.js                                  Bölge kaydı (Vietnam, Güney Asya elle; paketler registerCountryPack ile kendini ekler)
  view-*.js                                   Görünümler: explore/guide/practice/sim/progress (Vietnam), alfabe (Güney Asya), hub, overview
  country-engine.js                           Paket ülkeler için ortak Keşfet/Rehber/Pratik/Simülasyon/İlerleme
  geo-<ülke>.js  packs/<ülke>.js              Her ülke: geometri + veri paketi (çift olarak, motordan SONRA yüklenir)
  routes-<ülke>.js                            Haritada yol çizgisi verisi (Rusya, Türkiye; OSM, ODbL): geo'dan sonra, paketten önce (§9c)
  data.js names.js bank.js hints.js geo.js    Vietnam verisi ve soru bankası
  scripts-data.js scripts-bank.js geo-asia.js Güney Asya verisi
  app.js                                      Yönlendirici (hash), bölge sekmeleri, başlatma
  _arsiv/                                     Yüklenmeyen arşiv (README.md orada)
tools/                  Doğrulayıcılar, testler, geometri üreticileri, paketleyici (§11)
dist/                   `python3 tools/bundle.py` çıktısı: tek dosyalık sürüm
```

- **Adresler:** `#<bölge>-<bölüm>`, ör. `#russia-harfler`, `#guneyasya-alfabe`, `#vietnam-alankodlari`; `#ana` ana sayfa.
- **Görünüm kaydı:** `g.Views.<ad> = { mount(root, app) }`. Bölüm → görünüm eşlemesi `regions.js` (ya da paket için motor) içindedir.
- **Yükleme sırası:** util/store/srs/ui → kit → photos → photos-local → `figures.js` → `figs-*.js` → harita → view'lar → `country-engine.js` → (`geo-X.js`, varsa `routes-X.js`, sonra `packs/X.js`) → `app.js`.
  Yeni ülke eklerken satırları `country-engine.js`'ten sonra, `app.js`'ten önce ekle; yeni çizim dosyasını `figs-*.js` grubuna (`figures.js`'ten sonra) ekle.
- **Üç tür bölge:** (a) Vietnam (özel görünümler), (b) Güney Asya (özel görünümler), (c) **paket ülkeler** (motorla, yalnızca veriyle). Yeni ülke her zaman (c)'dir.

## 4. Tek çatı sözleşmesi (en çok bozulan kısım)

Kullanıcının asıl şikâyeti: "bir sekmede harita ayarı var, diğerinde yok". Sözleşme:

### 4.1 Harita ayarları
- Her harita `new g.MapView(L.stage, {...})` ile kurulur. `map.js` **otomatik** olarak `Kit.cfg(map)` ekler: tek bir `#map-settings-btn` düğmesi,
  tek bir pencere, satırlar **Zemin · Etiketler · Renk · Renklerin anlamı**.
- Görünüm yalnızca satırları doldurur: `map.cfg.labels({options, value, def, onChange})`, `map.cfg.colors({...})`, `map.cfg.legend(fn)`,
  `map.cfg.lock('color', 'neden sabit')`. **Kendi harita ayar düğmeni, açılır menünü, ikinci bir katman düğmeni yapma.**
- Bir ekranda renk ya da etiket değiştirilemiyorsa satırı gizleme; `lock` ile "bu ekranda sabit" göster (kullanıcı neden olmadığını görsün).

### 4.2 Sekme iskeleti
Her bölgenin sekmeleri aynı sırayı izler: **Genel · Keşfet · [konu sekmeleri] · Pratik · Simülasyon · İlerleme**.
Vietnam konu sekmeleri: Bölgeler, Alan kodları, İl adları. Güney Asya: Alfabeler, Tabelalar, Eyaletler. Paket ülkeler: `topics[]` (1–3; §1 kural 1).

### 4.3 Sayfa iskeleti
- `var L = app.layout(root)` → `L.stage` (harita), `L.panel` (yan/alt panel), `L.sheet` (telefonda alt çekmece), `L.bind(map)`.
- Panelin üstü `.p-top` (başlık + **Alıştır** düğmesi), gövdesi `.p-body`. Konu sekmelerinde başlığın sağında hep "Alıştır" vardır; tıklanınca o konunun Pratik kalıbı açılır (`drillPreset`).
- Telefonda panel alt çekmecedir; yeni içerik bu çekmecenin içinde kaydırılır. Sayfada yatay taşma **olamaz** (390 px'te kontrol et).
- Haritaya dokunma → seçili birimin özet şeridi; "Kartı aç" tam kartı açar. Yeni ekranlar bu kalıbı izler.

### 4.4 Ortak bileşenler (yeniden yazma)
`U.h` (DOM kurucu), `UI.icon/sec/fact/code`, `Kit.carousel/photo/lightbox`, `SRS`, `Store`. Aynı işi yapan ikinci bir sürüm yazmak "senkron bozulması"nın kaynağıdır.
Gerekli bir şey eksikse **ortak bileşene** ekle ki hepsi yararlansın.

### 4.5 Stil
- Tek dosya: `css/style.css`. Renk için CSS değişkeni kullan (`var(--ink)`, `--surface-2`, bölge rengi `--rg-c`); sabit renk kodu yazma. Koyu mod bozulmamalı.
- Mevcut sınıf adlarını kullan: `pcard`, `chips-sec`, `cue`, `sec-h`, `vgrid/vcard`, `ov-note`. Yeni sınıf gerekiyorsa mevcut adlandırmayı izle.
- Dokunma hedefi ≥ 40 px; düğmelerde `aria-label`; klavye (Enter/Boşluk) ve odak halkası çalışmalı.

### 4.5b Bir şey eklerken kontrol listesi
- [ ] Bütün bölgelerde (9) ve her iki ekran genişliğinde çalışıyor mu? (`qa_contract.py`)
- [ ] Harita ayarları tek düğmeden mi geliyor?
- [ ] Yeni özellik ortak bileşene mi yazıldı, yoksa tek ekrana mı gömüldü?
- [ ] Çevrimdışıyken (fotoğraf/yazı tipi yok) sayfa kırılmadan çalışıyor mu?
- [ ] `README.md` ve bu dosya güncel mi?

### 4.6 Kalıcı veri
`Store.data` (localStorage) ve SRS anahtarları `srsPrefix:loc|code|clue|vis|fact:<id>` biçimindedir. Birim kimliğini ya da `srsPrefix`'i değiştirirsen kullanıcının tekrar kutuları sıfırlanır.
Yeni paket: **benzersiz** `srsPrefix`. Kimlik değişikliği gerekiyorsa göç kodu yaz.

## 5. Ülke paketi şeması (v2)

Dosya: `js/packs/<ülke>.js`. Yalnızca veri; `g.registerCountryPack({...})` çağırır. Alan adlarını `tools/verify-packs.cjs` denetler.
Motor geçersiz kimlikleri sessizce atar, `verify-packs` ise **HATA verir** (yazım hatası görünsün diye) — o yüzden her zaman çalıştır.

### 5.1 Paket düzeyi

| Alan | Zorunlu | Anlamı |
|---|---|---|
| `id` | evet | Küçük harf, tiresiz (`turkiye`). Adreste kullanılır: `#turkiye-alan`. |
| `name`, `code` | evet | Görünen ad; 2 harfli kod (ana sayfada rozet). |
| `area` | evet | Ana sayfadaki grup: `"Asya"`, `"Avrupa ve Avrasya"`, `"Amerika"`… |
| `geoVar` | evet | `window` üzerindeki geometri değişkeni (`TR_GEO`). |
| `themeId`, `themeCfg` | evet | Harita teması: `aria`, `fit`, `grid`, `excludeWorld`, `bg` (deniz/komşu adları). Mevcut bir paketten kopyala. |
| `srsPrefix` | evet | Benzersiz kısa önek (`tr`). Tekrar anahtarlarında kullanılır. |
| `unitLabel`, `unitLabelCap` | evet | Birimin adı, **küçük harf tek sözcük**: `il`, `eyalet`, `prefektörlük`, `bölge`. Türkçe ekler motorda `dat/gen/lcl/soften` yardımcılarıyla gelir. |
| `codeLabel` | evet | Konunun "kodu" ne diye anılır: `Telefon kodu`, `Plaka harfi`, `Yol numarası`. Her yerde bu ad. |
| `line`, `blurb` | evet | Ana sayfa karosunda tek satır (`81 il · telefon alan kodu`) ve 1–2 cümle: **hangi konu çalışılır ve neden**. |
| `regions`, `units`, `topics` | evet | Aşağıda. |
| `note` | hayır | `{title, text}`: Genel sayfasında bilgi kutusu. Dünya değiştiyse (idari reform) buraya yaz (§8). |
| `overviewLead`, `exploreHint`, `tone` | hayır | Genel/Keşfet metinleri; rozet rengi. |
| `simKmScale`, `maxFitZoom`, `labelSize` | hayır | Simülasyon mesafe ölçeği, en fazla yakınlaşma, harita etiketi boyutu. |
| `codePrefix` | hayır | `n`: kodun ilk `n` karakteri aynıysa aynı renk (alan kodlarında ilk hane). `codeModeLabel` ile birlikte "Kodun ilk rakamı" renk kipi oluşur. |
| `colorModes` | hayır | Ek renk kipleri: `{id,label,groups:[{label,sub,ids,main?,cls?}]}`. Verilmezse: Bölge (+ `codePrefix` varsa kod). |
| `presets`, `simTypes`, `makeSimClue`, `legendFor` | hayır | **Verme.** Motor veriden kurar; yalnızca gerçekten ülkeye özel bir şey varsa. |
| `clueQuiz` | hayır | `true` ise ve birimlerin yarısından fazlasında `cue` varsa "yazılı ipucundan birim" sorusu açılır. |

### 5.2 `regions[]` (haritadaki renkli kuşaklar/bölgeler)
`{ id, tr, key, color (0–11), cue }` — `tr` görünen ad, `key` haritada kısa rozet (≤ 4 harf), `cue` bölgeyi tanıtan tek cümle.

### 5.3 `units[]` (haritadaki tıklanabilir birimler)
`{ id, name, short, local, cap, reg, codes[], cue, trap?, set?, extra? }`
- `id` **geometri dosyasındaki `p` anahtarıdır** (aynen). `reg` bir `regions[].id` olmalı.
- `short`: haritada etiket (≤ 9 karakter). `local`: yerel yazım (Hangul, Kiril, kanji). `cap`: merkez.
- `codes`: dizi (string). Yoksa boş bırak; **kod uydurma**. Konu kod değilse hiç doldurma.
- `cue`: tek cümlelik, doğrulanmış ipucu. Yoksa boş. Yer adını `cue` içinde yazma (motor `•••` ile maskeler ama yine de yazma).
- Hiçbir konuda/kartta geçmeyen birim `verify-packs` uyarısı verir; o birim yalnızca yer olarak çalışılır (sorun değil), ama konu **tüm ülkeyi** kapsamalıysa eksiği kapat.

### 5.4 `topics[]` (1–3 konu)

```js
{ key: 'alan', navLabel: 'Telefon kodu', icon: 'phone', drillPreset: 'code', mapMode: 'code', labelMode: 'code',
  title: '…', lead: '…', desc: '…(tek cümle, sekme açıklaması)…',
  decoder: { title, placeholder, hint, quizPrompt, noHit,
             entries: [ { key:'212', label:'212 → İstanbul (Avrupa yakası)', sub:'Plaka 34.', keys:['0212','istanbul'],
                          ids:['34'], main:'0 212', prompt:'Bu alan kodu hangi ilin?' /*, quiz:false */ } ] },
  flows:  [ { title, body } ],
  bandsTitle, bandsHint, bands: [ { cls:'q2', key:'21x', title, sub, ids:[…] } ],
  rulesTitle, rules: [ { title, ids:[…], body, traps: [ ['222 / 312','Eskişehir / Ankara'] ] } ],
  visualsTitle, visuals: [ { id, title, badge, sub, tags:[…], set:'ru-tat', ids:['ru-ta'] /*, quiz:false */ } ],
  routesVar, routesNote /* yalnızca haritada yol çizgisi olan konu: §9c */ }
```
- `key`: kısa ASCII, adreste kullanılır. `icon`: `UI.icon` adı (`phone`, `map`, `layers`, `langs`, `book`, `tag`, `target`…).
- `drillPreset`: konunun "Alıştır" düğmesi hangi Pratik kalıbını açar (`code`, `mix` ya da konu `key`'i). `mapMode`/`labelMode`: harita renk/etiket varsayılanı (`reg`, `code`, `colorModes[].id` / `short`, `code`).
- `decoder.entries[]`: her giriş bir "gördüğün şey". `keys` arama eş anlamlılarıdır (küçük harf). `ids` doğru birimler; `main` soru kartında büyük gösterilen ipucu;
  `quiz:false` değilse bu giriş Pratik/Simülasyon'da **soru** olur (≥ 4 giriş olmalı). **Her giriş bir soru olacağı için, cevabı olmayan ya da belirsiz girişi `quiz:false` yap.**
- `bands[].cls`: renk sınıfı `q0…q11`. `rules[].traps`: `[sol, sağ]` çiftleri.
- `visuals`: §9 (fotoğraf) ve §9b (çizim). `visualsTitle` kısa bir başlıktır ve **sonunda boşluk** olur (`'Nasıl görünür? '`, `'Numara tabelada nerede? '`); motor arkasına
  «çizimleri kaydır · karta dokun → haritada göster» gibi yönlendirmeyi kendisi ekler. `quiz:false` kartı Pratik/Simülasyon fotoğraf sorusundan çıkarır; **çizim kartlarında her zaman yaz**
  (çizim soru olmaz; `verify-packs` unutulursa uyarır). Kartın `ids` listesi, kartın doğru saydığı **tüm** birimlerdir.
- `routesVar`, `routesNote`: konunun haritada çizgi katmanı varsa (Rusya `yollar`); §9c.
- Zorunlu olmayan her şey **yoksa görünmez**; boş kart gösterilmez. Doldurmak için doldurma.

### 5.5 Motorun veriden otomatik açtığı alıştırma türleri
`loc` (yer) her zaman; `code`/`codeToUnit` birimlerde `codes` varsa; `visual` (fotoğraf) en az bir `visuals` kartı varsa; `fact` (çözücü girişleri) ≥ 4 giriş varsa;
`clueToUnit` `clueQuiz` ve yeterli `cue` varsa. Pratik kalıpları ve Simülasyon türleri buradan türetilir; elle yazmaya gerek yoktur.

### 5.6 Küçük ama önemli
- `unitLabel` yazarken ek mantığı düşün: `il → ile`, `eyalet → eyalete`, `prefektörlük → prefektörlüğe`. Motor halledemiyorsa `soften/dat/gen` yardımcılarına bak (`country-engine.js` ~145–165).
- `toLowerCase()` Türkçe büyük `İ`/`I` için güvenilmezdir (`'İ'.toLowerCase()` → birleşik noktalı `i̇`). Arama anahtarlarına hem `i̇stanbul` hem `istanbul` yaz ya da kodu sadeleştir.
- Paketi yazdıktan sonra `window.PACK_PENDING` (tarayıcı konsolu) dolu ise bir `visuals` kartı fotoğrafsız demektir; `python3 /…/pending.py` benzeri bir betikle ya da konsolda kontrol et.

## 6. Yeni ülke eklemek (adım adım)

1. **Karar** (§2.1, §2.3) → ülke, 1–2 konu, 3 cümle gerekçe; §15'e yaz.
2. **Veriyi kaynaktan topla** (§8). Kaynakları not et (`README.md` "Kaynaklar").
3. **Geometri:** Natural Earth admin-1 → `tools/build_countries_geo.py` ya da `tools/build-geo.mjs` / `tools/generate_all_geo.py` → `js/geo-<ülke>.js`
   (`window.<KOD>_GEO = { v, K, lon0, yTop, bbox, fit, p:{ id:{ d, bb, lp, c, ar, nb:[…] } }, m }`). `p` anahtarları = birim kimlikleri. **Bu dosyaları `grep` ile açma:** tek satırlık dev JSON'dur;
   `node -e` ile oku. Geometriyi bölge adlarıyla eşleştir ve ekranda gözle kontrol et (yanlış eşleşme sessiz kalır).
4. **Paket:** `js/packs/<ülke>.js` — §5.
5. `index.html`: `geo-<ülke>.js` ve `packs/<ülke>.js` satırlarını `country-engine.js`'ten sonra, `app.js`'ten önce ekle.
6. **Doğrula:** `node tools/verify-packs.cjs` → `python3 tools/qa_contract.py <ülke>` → masaüstü + telefon ekran görüntüsü (her sekme) → konsolda `PACK_PENDING`.
7. **Fotoğraf** (varsa): §9. Fotoğrafsız da yayınlanabilir; **yanlış fotoğraftan fotoğrafsızlık iyidir.**
8. `README.md` tablosu ve §15 karar günlüğü; `python3 tools/bundle.py`.

Hızlı iskelet için `js/packs/turkiye.js` (alan kodu konusu) ve `js/packs/russia.js` (yol + harf konusu, fotoğraf kartları) en iyi örneklerdir; kopyala, sonra **her bilgiyi yeniden doğrula**.

## 7. Dil ve anlaşılırlık

Kullanıcı Rusya'daki "alan kodu mu, telefon mu, ne" sayfasını anlamadı ve "çoğu şey gereksiz" dedi. Bu bir **yazı hatası** sayılır, "kullanıcı bilir" varsayımı yoktur.

- Arayüz Türkçe. Yer adları orijinal yazımıyla (Việt, Москва, 서울); gerekirse yanında Türkçe okunuş. Türkçe gerçek karakterler (ı İ ğ ş ç ö ü) doğru olmalı; "I/İ" karışmasın.
- **Jargonu ilk geçtiği yerde tanımla.** Örn.: "Alan kodu: telefon numarasının başındaki şehir/bölge öneki (Eskişehir için 0 **222**). Tabelalarda numaranın ilk üç hanesidir."
  Aynı şeyi her seferinde aynı adla çağır (`codeLabel`): bir yerde "alan kodu", başka yerde "telefon kodu", bir başkasında "numara öneki" yazma.
- Her `lead`: **(1) nedir (2) nerede görünür (3) bölge hakkında ne söyler/söylemez.** İlk cümle bir tanım, ikinci cümle bir görsel örnek olsun.
- Kısa cümleler; paragraf ≤ 4 cümle. "Eğer X'i görürsen Y'dir" biçiminde karar cümleleri. Madde işaretini çoklu bilgi için kullan.
- Kesin olmayanı kesin yazma: "çoğunlukla", "genellikle", "bazı belediyelerde". İstisna varsa **yaz**.
- Gösterilen etiket (`badge`) yalnızca fotoğrafta/levhada gerçekten okunanı söyler (§9).
- Başlık ve düğme dili: eylem fiili ("Alıştır", "Kartı aç"). Teknik kısaltma (DDD, SRS, ID) kullanıcıya gösterme.
- Metni yazdıktan sonra **bir yabancıya okut**: bir cümlede takıldıysa yeniden yaz.

## 8. Doğruluk ve kaynak

- Kaynak sırası: resmî kurum/telekom ve devlet siteleri > Vikipedi'nin güncel listeleri > diğer. Kritik iddiayı **iki kaynakla** çapraz kontrol et. Hatırladığını doğrulanmış sanma.
- Doğrulanamayan şey yazılmaz: alan boş kalır, kart eklenmez. `cue`, `trap`, `rules.body` uydurma içeriğin en sık girdiği yerlerdir.
- Sayılarla (il sayısı, kod sayısı) toplamları kontrol et: 81 il, 63 il, 47 prefektörlük… Betik yaz ya da `verify-*.cjs` çalıştır.
- **Dünya değişir.** İdari reform, kod değişikliği, ad değişikliği olduysa: tarihiyle yaz, hangi sürümün kullanıldığını söyle ve `note` kutusuna koy.
  Örnekler (doğrulanmış):
  - **Vietnam:** 1 Temmuz 2025'te 63 il 34 idari birime indi. Uygulama **63 ili** kullanır (Street View, tabelalar, telefon kodları o tarihten önceki düzene ait); Genel sayfasındaki `note` bunu açıklar. Bu karar kasıtlıdır; "düzeltme" diye 34'e çevirme.
  - **Güney Kore:** Jeonnam ile Gwangju 1 Temmuz 2026'dan itibaren "Jeonnam–Gwangju Special Metropolitan City" (paketteki `note`); Gangwon (2023) ve Jeonbuk (2024) özel özerk il oldu.
- Her kaynak `README.md` içindeki "Kaynaklar" listesine girer (sayfa adı + ne için kullanıldığı).

## 9. Fotoğraflar

Fotoğraf sistemi tek yerden yönetilir: **`js/photos.js`** (kayıt defteri) → `Kit.carousel(set)` (kaydırmalı galeri) → paket `visuals` kartları / Güney Asya alfabe kartları.

### 9.1 Kaynak ve lisans
- **Fotoğraf yalnızca Wikimedia Commons'tan.** Google Görseller, Pinterest, rastgele site, yapay üretim yok; çizim de "fotoğraf" diye sunulmaz (özgün çizimler ayrı bir türdür: §9b).
- Kabul edilen lisanslar: **CC0, kamu malı, CC BY, CC BY-SA** (3.0/4.0). **NC, ND, GFDL-yalnız, belirsiz** olanlar alınmaz.
- Yazar ve lisans **Commons API'den aynen** yazılır (`extmetadata`: `Artist`, `LicenseShortName`). Tahmin etme; `LIC_SAYFA` yedeği bir eksiktir ve `verify-packs` uyarır.
- Uygulama her fotoğrafın altına "Fotoğraf: yazar · lisans · Wikimedia Commons · Kaynak" yazar (atıf yükümlülüğü). Bu satırı **kaldırma**.

### 9.2 Kayıt biçimi (`js/photos.js`)
```js
add('ru-ko-1', 'Архивный отдел в Коми.jpg', 'Апатинаити', 'CC BY-SA 3.0',
    'Komi, Uhta: arşiv dairesi levhası. Üstte Komi dilinde «Архив юкӧн» (noktalı Ӧ), altta Rusça «Архивный отдел».');   // v='goz' varsayılan
S['ru-ko'] = ['ru-ko-1'];                                  // küme: kartın `set` alanı bu adı çağırır
```
`v` (doğrulama seviyesi): **`goz`** = fotoğrafı gerçekten görüntüleyip alt yazıdaki her iddiayı doğruladım; **`aciklama`** = yalnızca Commons açıklamasına güvendim (yayına çıkmadan önce `goz`'e yükselt); **`bekliyor`** = doğrulanmadı, gösterilmez.
Kümelerde `as-<yazı kimliği>` (Güney Asya, alfabe kartında "Gerçek tabelalar") ve `<ülke>-<kod>` (paket kartları) adlandırması kullanılır.

**Görünüm alanları (kırpma ve işaret).** Yazı küçükse ya da fotoğrafta ayırt edici şey kenardaysa kayıt defterine `view(anahtar, [genişlik, yükseklik], crop, marks)` satırı eklenir
(`js/photos.js` sonunda; 36 fotoğraf kullanıyor):
- `d = [genişlik, yükseklik]`: özgün piksel boyutu (Commons'tan, `iiprop=size`). Kırpma ve işaret için **zorunlu**; `verify-photos.mjs` Commons ile karşılaştırır.
- `crop = [x, y, w, h]`: özgün görüntünün 0–1 oranlarıyla kırpma. Kartta yalnızca bu bölge büyütülmüş gösterilir (levhayı büyütüp yazıyı okunur yapar); fotoğrafa dokununca tamamı açılır.
- `marks = [[x, y, w, h, 'Türkçe açıklama'], …]`: "nereye bak" kutuları (0–1, **tüm özgün görüntüye** göre). Sarı kutu + numara olarak çizilir, açıklamalar fotoğrafın altında listelenir.
  Açıklama ≥ 8 karakter olmalı ve kutunun neyi gösterdiğini söylemeli (ör. "Tatarca satır: Ә ve Һ harfleri"). Rusya `harfler` kartlarındaki "harf görünmüyor / ekrana sığmıyor" şikâyeti bu yolla çözüldü.
- Kenara <%8 yakın kutularda rozet kutunun içine konur (`pc-mark-in`). Kırpma ve işaretleri yaptıktan sonra bir 390 px ekran görüntüsüyle yazının gerçekten okunduğunu doğrula (§11).

### 9.3 Fotoğraf kuralları
1. **Alt yazı yalnızca fotoğrafta okunanı söyler.** Badge (`Ә Ө Ү`) levhada görünmeyen harfi iddia etmez. (Gerçek örnek: Kazan'da iki levha "Tatarca harflerini gösteriyor" sanıldı, oysa harf yoktu; yenisiyle değiştirildi.)
2. **Küme = aynı yer.** Pratik/Simülasyon fotoğraf sorusu kümeyi cevap anahtarı yapar. Bir fotoğraf birden çok birim için doğruysa kartın `ids` listesine hepsini yaz (ikisi de doğru sayılır);
   ama bir kümeye başka yerin fotoğrafını koyma.
3. **Okunabilirlik:** yazıyı öğreten fotoğrafta yazı 960 px genişlikte okunabilmeli (ya da `crop` ile okunur hâle gelmeli). Uzaktan, küçük, yazısı bulanık fotoğrafı alma.
   Plaka içeren fotoğraf alınmaz (§1 kural 11).
4. **Gerçek ve temsilî:** o ülkede/bölgede çekilmiş gerçek bir levha/direk/tabela. Başka ülkenin benzeri, stok görsel, ekran görüntüsü yok.
5. **Konu başına birden çok fotoğraf:** kaydırmalı galeri için aynı birimden 2–4 farklı fotoğraf (farklı açı/levha) ekle; tek bir fotoğrafı çoğaltma.
6. **Önce doğrula, sonra yaz.** Fotoğrafı görmeden (`goz`) kayda ekleme. Fotoğrafı Commons'tan 700–900 px olarak çekip gör; alt yazıdaki her harfi/sözü görüntüde bul. Gördüğünle alt yazı uyuşmuyorsa alt yazıyı düzelt (ya da fotoğrafı at).
7. Fotoğraf **bulunamazsa kart eklenmez**; motor setsiz kartı gizler (`window.PACK_PENDING` listesi bunu gösterir).

### 9.3b Commons'ta fotoğraf bulmak
- `WebFetch` ve `curl` Commons'a ulaşamaz (bu çalışma ortamında engelliydi). **Tarayıcıda** (Antigravity'nin tarayıcı aracı ya da kendi Chrome'un) Commons sayfasını aç ve **aynı kaynaktan** API'yi çağır:
  `/w/api.php?format=json&origin=*&action=query&generator=search&gsrsearch=<arama>&gsrnamespace=6&prop=imageinfo&iiprop=extmetadata|size|url&iiurlwidth=240&iiextmetadatafilter=Artist|LicenseShortName|ImageDescription`
  (`generator=categorymembers&gcmtitle=Category:…&gcmtype=file` ile kategori de taranır; `list=search&srnamespace=14` ile kategori adı bulunur.)
- Etkili sorgular: `"<dil> signboard"`, `"Bilingual <dil>-Russian signs"`, `"<şehir> railway station signboard"`. Kategori adları: `Bilingual <A>-<B> signs`, `<Dil>-language signs`.
- **Temas tablosu (contact sheet) yöntemi:** sonuçları bir sayfaya küçük resim olarak diz, ekran görüntüsüyle gözden geçir, seçtiklerini 700–900 px'te tekrar bak. Metaverileri (yazar, lisans, boyut) aynı sorgudan al.
- Yazı kontrolü yaparken Wikipedia'da **o dilin harflerini** doğrula (ör. Çuvaşça Ӑ Ӗ Ҫ Ӳ; Başkurtça Ғ Ҡ Ҙ).
- Tüm fotoğrafları bir arada görmek için `tools/photo-review.html` dosyasını aç (yazar, lisans, doğrulama düzeyi, genel/eksik alanlar işaretlenir).
- **Kayıt defterini Commons'a karşı sına:** `node tools/verify-photos.mjs` (internet gerekir). Dosya var mı, yeniden adlandırılmış mı, lisans/yazar kayıtla aynı mı, kabul edilen lisans mı ve uygulamanın kullandığı `Special:FilePath` adresi yükleniyor mu denetler. Fotoğraf eklediğinde ya da bir süre sonra (dosyalar Commons'ta yeniden adlandırılabilir/silinebilir) çalıştır. Alt yazının görüntüyle uyuşmasını denetlemez; o hâlâ gözle yapılır.

### 9.4 Çevrimdışı / kendi sunucun
Fotoğraflar çevrimiçi çağrılır (`Special:FilePath`). Sitenin kendi sunucusundan servis etmek istersen: `python3 tools/fetch_photos.py` (`--dry-run` önce) → `assets/photos/` + `js/photos-local.js` + `CREDITS.txt`.
Çevrimdışıyken sayfa kırılmaz: "Fotoğraf yüklenemedi · Kaynağı aç" yazar.

## 9b. Çizimler (özgün şematik şekiller)

Fotoğraf bulunamayan ya da doğrulanamayan yerde, tabelada/direkte/doğada **neye nereden bakılacağını** gösteren küçük şematik çizimler kullanılır
(kullanıcı isteği, 15 Kasım 2026: "tabela, alan kodu, yol tabelası dahil tüm ülkelerde görselle destekle; büyük olmak zorunda değil").
Çizim bir fotoğraf **değildir**: galerinin altında "Çizim: Atlas · özgün şematik çizim (örnektir; renk ve oran yaklaşıktır)" kaynak satırı görünür (fotoğrafta yazar·lisans·Commons satırı yerine); kayıt düzeyi `v:'cizim'`dir.
Kart rozeti (`badge`) çizilen şeyi söyler ("Kaktüs", "Direk", "Çizim"…).
Çizim ile fotoğraf **aynı galeriden** (`Kit.carousel`) gösterilir; bir küme ikisini de içerebilir.

**Dosyalar.**
- `js/figures.js`: ortak çizim kütüphanesi `window.FIG`. Şekiller SVG metni döndürür: `R` dikdörtgen, `T` metin, `TV` dikey dizili harfler, `L` çizgi, `Ci` daire, `Po` çokgen, `Pa` yol (path), `Gr` grup,
  `Clip` kırpma; `B(x, y, n, hedefX, hedefY)` **numaralı sarı rozet** (hedef verilirse ince kılavuz çizgisi + nokta); direk parçaları `tiger` (siyah-sarı şerit), `pole`, `ground`, `wrap`; palet `FIG.C`; yazı tipleri `FIG.FONT`.
  Kayıt: `FIG.add(anahtar, { w, h, bg, body, cap, legend:[…], by })` (anahtar daha önce varsa hata verir) ve `FIG.set(kümeId, [anahtarlar])`.
- `js/figs-<ülke>.js`: o ülkenin çizimleri (şu an: japan, korea, vietnam, india, brazil, mexico, turkiye). Çizimler `PHOTOS[anahtar] = { svg, d:[480,360], by:'Atlas', lic:'Özgün çizim', cap, legend, v:'cizim' }` olarak kaydolur;
  küme adı `<önek>-<ad>1` (`mx-cardon1`, `tr-alan1`). Paket `visuals` kartı kümeyi `set` ile çağırır; Vietnam ve Güney Asya özel görünümleri `Kit.carousel('vn-sign')` gibi çağırır (§13).
- `index.html` sırası: `kit.js` → `photos.js` → `photos-local.js` → `figures.js` → `figs-*.js` → harita ve görünümler → … → `packs/*.js` (çizimler paketlerden ÖNCE yüklenir). Yeni `figs-<ülke>.js` dosyasını `index.html`'e eklemeyi unutma;
  `verify-packs` yalnızca `index.html`'in yüklediklerini görür.

**Kurallar** (çoğunu `verify-packs` `checkFig` denetler, gerisini sen gözle):
1. **Yalnızca doğrulanmış olguyu çiz.** Her çizim dosyasının başındaki yorum şunları yazar: hangi olgu, hangi kaynakla (kritik olgu için en az iki bağımsız kaynak ya da resmî belge) ve **ne ÇİZİLMEDİ**.
   Belgelenmemiş yerleşimi, rengi, oranı tahminle çizme.
2. **Tek kaynaklı ya da topluluk kaynaklı iddia çizime girmez**; yalnızca `legend` metninde çekinceyle yazılır ("bir topluluk sunumuna göre…", "kaynaklar … diye anlatıyor", "yaklaşık çizim").
   Oran ve yüzdeler (Brezilya'da merdiven/yuvarlak direk payı gibi) bu türdendir.
3. **Örnek yazı örnektir.** Çizimdeki ad, sayı, kurum adı ÖRNEKTİR (gerçek bir tabelanın kopyası değil); `cap`/`legend` bunu söyler. Gerçek logo, marka, firma adı ya da bir fotoğrafın kopyası olmaz (logo yerine kesik çizgili daire / "logo" yazısı).
4. **Biçim:** viewBox 480×360 (4:3), açık zemin (koyu temada da okunur), yazı ≥ 14 birim (rozet rakamı 15, kalın), çizimin içinde **uzun metin yok** (açıklama `legend`'de), SVG metninde boşluk için `\u00a0` (NBSP),
   kılavuz çizgisi yazının üstünden geçmez. Çizim telefonda ~350 px'e küçüldüğü için 390 px ekran görüntüsünde de oku.
5. **Rozet = açıklama.** `FIG.B` rozetleri 1…n sırayla **artan sırada** üretilir; rozet sayısı = `legend` madde sayısı; her madde ≥ 12 karakter; `undefined`/`NaN` olmaz (`verify-packs`).
6. **Çizim kartı soru olmaz:** karta `quiz:false` yaz (cevap sızar, çizim soru kaynağı değildir; motor çizim kümelerini zaten soru dışı bırakır ama `verify-packs` kartta da ister). `visualsTitle` kısa bir etikettir (sonunda boşluk):
   çizimde `'Nasıl görünür? '`, `'Numara tabelada nerede? '`, `'Tabelada nerede yazar? '`, `'Direk çizimleri '`; fotoğrafta `'Gerçek levhalar '`, `'Fotoğraflı örnekler '`.
7. **Bir çizim bir şey öğretir** (ör. "numaranın hangi hanesi alan kodu", "ad hangi satırda"). Süsleme yok; bölgeyi ayırmayan ayrıntıyı çizme.
8. **Dünya değişir:** eski görüntülerde eski adlar görünebilir (Vietnam 2025); `legend`'a yaz.

**Bakmak için:** `python3 tools/figs_qa.py /tmp/cizim.png 3 mx-,tr-` (çizim ızgarası; "broken images: 0" ve boş hata listesi şart) ve `python3 tools/shot.py 390x844 /tmp/kart.png "#mexico-yerel"` (uygulamadaki kart). İkisinin görüntüsünü **gözle oku**: taşan yazı, çakışan çizgi, kesik rozet.

**Hangi ülkede ne var (15 Kasım 2026, 46 çizim):** Japonya 16 (direk üç parçası, üst bant, 10 elektrik şirketi levhası, 4 gövde şeridi; §9d) · Güney Kore 5, Vietnam 4, Hindistan 10 (il/şehir/yer adı tabelada nerede ve hangi yazıyla yazılır;
Hindistan'da mil taşı renkleri) · Brezilya 6 (araucária, açaí, babaçu, caatinga kaktüsleri, direk kesiti, DDD numarası) · Meksika 4 (cardón ve saguaro, agave tarlası, Maya evi, LADA numarası) · Türkiye 1 (alan kodu numarada nerede).

**Bilerek ÇİZİLMEYENLER** (kaynaklarda düzen anlatılmıyor ya da tutarsız; tahminle çizmek yanlış bilgi olurdu; belge ya da Commons fotoğrafı bulunursa eklenebilir): Rusya karayolu levhası/rota işareti (16 Kasım 2026'da Commons'taki resmî levha çizimleri bulundu ve `yollar` konusuna `ru-route` kartı olarak eklendi; zemin renginin anlamı hâlâ belgesiz, kartta yalnızca görülen söylenir),
Güney Kore ve Vietnam il sınırı levhaları (tasarım yerel yönetimlere göre değişiyor / yazı düzeni anlatılmıyor), Brezilya karayolu kalkanları, Endonezya tabela düzeni (yazılı tabelalar ve yapılar için fotoğraf var),
Japonya'da Shikoku dışındaki şirketlerin üst bant yazısı.

## 9c. Yol çizgileri (harita katmanı; Rusya ve Türkiye `yollar`)

Rusya'da bir federal yol (М-4, Р-22…) hangi bölgelerden geçiyorsa **haritada çizgi olarak da** gösterilir (kullanıcı isteği, 15 Kasım 2026). Katman ortaktır ve başka ülkeye de verilebilir:
konuya `routesVar: 'RU_ROUTES'` (pencere değişkeninin adı) ve isteğe bağlı `routesNote` (panelin altında küçük not) yazılır. Motor (`country-engine.js`, "YOL ÇİZGİLERİ") çizgileri `MapView`'e ekler ve
ayar penceresine **Yol çizgileri: Tümü · Seçili · Kapalı** satırını `map.cfg.routes` ile kendisi koyar (tek çatı: kendi düğmeni yapma). Çözücüde ya da bantta bir yola dokununca o yol kalın ve numara etiketli çizilir,
yolun geçtiği bölgeler boyanır ve harita yolun sınır kutusuna yaklaşır; "Tümü" kipinde diğer yollar ince bağlam çizgisi olarak durur.

**Veri.** `js/routes-russia.js` → `window.RU_ROUTES = { v:1, u:1000, src, r:{ 'М-1': [[lon0, lat0, dlon, dlat, …]], … } }`. Sayılar `1/u` derecedir; ilk iki sayı mutlak konum, sonrakiler bir önceki noktaya göre farktır (26 yol).
Kaynak: © OpenStreetMap katkıcıları (ODbL, https://www.openstreetmap.org/copyright). Ham veri Overpass API ile çekilip yaklaşık 1–3 km toleransla sadeleştirildi. **Dosya başlığındaki ve `routesNote`'taki OSM atfı (ODbL) kaldırılmaz.**
Düz görünen uzun kesitler sadeleştirmedir ya da OSM'de eksik veridir (ör. Р-254 Kurgan–Omsk arası Kazakistan'dan geçer). Elle düzeltilenler: Р-22 batı kesiti (ana noktalardan elle yazıldı), М-10 ve М-11 (Chudovo–Lyuban–Tosno–Sankt-Peterburg),
Р-254 (Petropavl üzerinden), А-360 (Çin'e düşen yanlış başlangıç atıldı). Konum birkaç km sapabilir; bu bir bölge tahmin aracıdır, navigasyon verisi değildir.

**Yeniden üretmek ya da yeni yol/ülke eklemek:**
1. Tarayıcıdan (§9.3b gibi; `curl` bu ortamda çalışmayabilir) Overpass'a sor. Örnek (etiketleri kontrol et, OSM etiketleri bölgeye göre değişir): `[out:json][timeout:120]; relation["route"="road"]["ref"="М-4"]; out geom;`.
   Çıkan noktaları yolun tek hattı olacak biçimde birleştir ve ~1–3 km toleransla sadeleştir (Douglas–Peucker).
2. `[[lon, lat], …]` noktalarını şu iki küçük işlevle kodla/çöz (kodlama→çözme gidiş-dönüşünü kendin dene):
   ```js
   const U = 1000;
   const enc = pts => { const o = []; let px = Math.round(pts[0][0] * U), py = Math.round(pts[0][1] * U); o.push(px, py);
     for (let i = 1; i < pts.length; i++) { const x = Math.round(pts[i][0] * U), y = Math.round(pts[i][1] * U); o.push(x - px, y - py); px = x; py = y; } return o; };
   const dec = a => { let x = a[0], y = a[1]; const p = [[x / U, y / U]]; for (let i = 2; i + 1 < a.length; i += 2) { x += a[i]; y += a[i + 1]; p.push([x / U, y / U]); } return p; };
   ```
3. Dosya `js/routes-<ülke>.js` olur; `index.html`'de `geo-<ülke>.js`'ten sonra, `packs/<ülke>.js`'ten ÖNCE yüklenir. Yol anahtarı (`'М-4'`) çözücü girdisinin `key`'iyle **birebir aynı** olmalı: Rusya'da M/Р/А harfleri **Kiril**dir, Latin M/P/A ile karıştırma (görünüşte aynı, eşleşmez).
4. `node tools/route-regions.cjs [paket] [rota dosyası]` çalıştır: her yolun hangi bölgelerden kaç km geçtiğini hesaplar, paketteki `ids` ile ve bant satırıyla karşılaştırır.
   "FAZLA GEÇİŞ (pakette yok)" (≥ 12 km), "EKSİK (pakette var, yol geçmiyor)" (< 3 km) ve "BANT ≠ ÇÖZÜCÜ" satırlarını **kaynakla** doğrula: haklıysa aracın içindeki `KNOWN` listesine gerekçesiyle ekle,
   haksızsa pakette `ids`'i düzelt. Fark varsa çıkış kodu 1'dir; temiz çıktı "tüm yollar paketle uyumlu". Betiğin geometri eşlemesi şimdilik yalnızca `russia` içindir; yeni ülkede `GEO` tablosuna ekle.
5. Haritada çizginin doğru yerden geçtiğine bak: `python3 tools/shot.py 1280x800 /tmp/yol.png "#russia-yollar"`.

## 9d. Japonya direk kaynakları

Japonya `elektrik` konusu (levha, bant, şerit) ve 16 çizimi, **topluluk rehberlerinden** derlendi; "hangi direk nerede" için resmî bir tablo yoktur. Bir olgu en az iki rehberde tutarlıysa yazıldı;
tek kaynaklı olanlar çizime değil `legend` metnine çekinceyle girdi. Kullanılan kaynaklar:
- Geoguessr Japan Wiki (wikiwiki.jp/geoguessr): bölge bölge direk levhası, bant ve şerit.
- sloor.hatenablog.com: elektrik şirketi başına yazılar (levha biçimi, yazı yönü, yerleşim).
- note.com yazarları (note.com/91rp0jno, note.com/atago_note): bölge ve şirket rehberleri.
- mititt.jp: direk levhası açıklamaları.
- Learnable Meta "Japan" haritası (topluluk meta listesi).
- Şerit/sargı ürünleri hakkında ayrıca üretici ve haber sayfalarına (Daito, kuruma-news) bakıldı.

Bilinen sınırlar: levhaların üstündeki siyah-sarı bandın yazısı (自家発連系有 / 自家発逆潮有) kaynaklarda yalnızca **Shikoku** için belgeli, diğer şirketlerinki farklı olabilir; çizimde bu yüzden tek örnek vardır ve
"tek başına bölge kanıtı sayma" uyarısı taşır. Chugoku'da biçimler karışıktır (levhaya tek başına güvenilmez); Shikoku'nun sola yaslı ve Chugoku'nun sağa yaslı katakanası bazı yerlerde karışır (`legend`'larda uyarı var).
Levhalardaki yazılar örnektir. Yeni bir şirket/şerit eklerken aynı ölçüt: en az iki bağımsız rehber, değilse `legend`'da çekince.

## 10. Geometri (harita) notları
- Geometri dosyası: `window.<KOD>_GEO = { v, K, lon0, yTop, bbox, fit, p, m }`. `p[id]` bir birimdir: `d` (SVG yolu), `bb` (sınır kutusu), `lp` (etiket noktası), `c` (merkez), `ar` (alan), `nb` (komşu kimlikleri). `m` ağ çizgisi katmanlarıdır (`in` iç sınır, `rg` bölge, `mc`, `co` dış kıyı).
  Sınır verisi Natural Earth admin-1'dir; Mercator'a çevrilip sadeleştirilir.
- Araçlar: `tools/build_countries_geo.py` (Natural Earth 10m admin-1 → ortak topolojili sadeleştirilmiş SVG; çıktı biçimi `geom.js`/`map.js` ile uyumlu), Vietnam için `tools/build-geo.mjs`, Güney Asya için `tools/build-geo-asia.mjs`.
  `generate_all_geo.py` ve `generate_world_27_geo.py` arşivdeki ülkeleri üretmişti.
- Komşu ülkeler/deniz arka planı `themeCfg.bg` ve `excludeWorld` ile verilir (dünya haritası `world-geo.js`).
- Birim sayısı kaynakla tutmalı (81 il, 63 il…). Küçük adalar/enklavlar görünmez olabilir; gerekirse sadeleştirme eşiğini düşürüp yeniden üret.
- Çok büyük/çok parçalı ülkelerde (Rusya: Çukotka, Kaliningrad) `fit` ve `maxFitZoom` ayarını elle kontrol et.

## 11. Sınama ve teslim

Çalıştır (proje kökünden):

```
node tools/verify-packs.cjs                 # 7 paketi denetler (şema, kimlikler, fotoğraf ve çizim kaydının iç tutarlılığı, konu sayısı ≤ 3, çizim kartında quiz:false); HATA = çıkış kodu 1
python3 tools/qa_contract.py [bölge…]       # her bölge × her sekme × 2 boyut: sayfa hatası, tek ayar düğmesi, yatay taşma, kırık foto
node tools/verify-photos.mjs                # (internet gerekir) fotoğraf kayıt defteri ↔ Commons: var mı, yazar/lisans, adres yükleniyor mu
node tools/verify-data.cjs                  # Vietnam alan kodları kaynak tablosuna karşı
node tools/verify-names.cjs                 # Vietnam il adı mantığı iddiaları
node tools/verify-scripts.cjs               # Güney Asya yazı/yer/çift verisi tutarlılığı
node tools/test-bank.cjs   node tools/test-hints.cjs   node tools/test-scripts.cjs   node tools/test-geom.cjs
node tools/route-regions.cjs                # Rusya yol çizgileri hangi bölgelerden geçiyor ↔ paketteki ids (§9c); fark = çıkış kodu 1
python3 tools/figs_qa.py cikti.png 3 mx-    # çizimleri ızgarada çizer (§9b): hata listesi boş, "broken images: 0" olmalı; görüntüyü gözle oku
python3 tools/shot.py 390x844 cikti.png "#mexico-yerel"   # uygulamadan masaüstü/telefon ekran görüntüsü (Commons isteklerini yer tutucuyla yanıtlar)
python3 tools/bundle.py                     # dist/vietnam-atlas.html (tek dosya) üretir
```

- `qa_contract.py` Playwright ve Chromium/Chrome ister. Yoksa elle: `index.html`'i tarayıcıda aç, geliştirici araçlarında 390 px genişlik seç, **her bölgeyi ve her sekmeyi** gez, konsolda hata ve yatay kaydırma ara.
- **Ekran görüntüsü kuralı:** masaüstü (≥ 1280) ve telefon (390×844) görüntüsü al; metin taşması, kesik başlık, boş kart, kırık harf (□) ara. Çıktıyı gözle oku.
- **Fotoğraf yer tutucusu:** ağ yoksa "Fotoğraf yüklenemedi" görmek beklenendir; düzeni görmek için istekleri yer tutucu görselle yanıtla: `tools/shot.py` bunu kendisi yapar (Playwright `route`).
  Kırpma/işaret (§9.2) ve çizim kartlarının düzeni yer tutucuyla da görülür; fotoğrafın **içeriğini** (yazı okunuyor mu) ancak gerçek görüntüyle doğrularsın.
- **"Bitti" demeden:** yukarıdaki betikleri çalıştır, çıktıyı oku, hata/uyarıları düzelt ya da gerekçeyle bırak. Çalıştırmadığını yazma.
- Büyük değişiklikten önce klasörün yedeğini al (`_yedek/`).

## 12. Gemini/Antigravity'nin sık düştüğü tuzaklar (kendini kontrol et)

Bu liste kullanıcının şikâyetlerinden ve bu projedeki gerçek hatalardan çıkarıldı.

| Tuzak | Doğrusu |
|---|---|
| Her ülkeye alan/telefon kodu eklemek | §2.1 testi; Rusya'da bile şehir kodu işe yaramaz |
| Sekmeler arası tutarsızlık (birinde harita ayarı var, diğerinde yok) | §4: ortak `MapView`/`Kit`; kendi ayar düğmesi yok |
| Bir ülkeyi "yüzeysel ama çok" eklemek | Az ülke, tam doğrulanmış |
| Uydurma içerik/fotoğraf (çizim ya da başka yerin fotoğrafı "ipucu" diye) | §8, §9: yalnızca doğrulanmış |
| Alt yazının görüntüyle uyuşmaması (ör. levhada olmayan harfi iddia etmek) | §9.3-1: görüntüyü **gör**, sonra yaz |
| Anlaşılmaz Türkçe, jargonlu başlık ("alan kodu mu telefon mu?") | §7 |
| "Hatırladığım" bilgiyi doğrulanmış saymak (özellikle yeni reformlar) | §8: kaynakla doğrula, tarih yaz, `note` ekle |
| Kendi işini doğrulamadan "tamam" demek | §11: betikler + ekran görüntüsü + gözle oku |
| Veriyi koda göm, motoru ülkeye göre dallandır | Veri `packs/` içinde, motor ortak |
| Dev geometri dosyasını `grep`/`cat` ile açıp bağlamı doldurmak | `node -e` ile oku, `cut -c1-200` kullan |
| localStorage anahtarlarını/birim kimliklerini yeniden adlandırmak | Kullanıcının ilerlemesi silinir (§4.6) |
| Fotoğraf yazarı/lisansını tahmin etmek | API'den aynen (§9.1) |
| Aynı bilgiyi birden çok yerde farklı yazmak | Tek kaynak: paket verisi (`units`, `decoder`), sayfalar ondan türer |
| Eski adresleri kırmak | `#kesfet`, `#alfabe` gibi eski adresler taşınır; yeni bölüm eklerken eski bağlantıyı bozma |
| Yeni özelliği yalnızca bir bölgede denemek | 9 bölge × 2 boyut (`qa_contract.py`) |
| Çizimi fotoğraf diye sunmak ya da belgelenmemiş levha/renk düzenini tahminle çizmek | §9b: yalnızca doğrulanmış olgu; çizim etiketli; çizilmeyeni dosya başında yaz |
| Çizim kartında `quiz:false` unutmak, rozet sayısı ile `legend` sayısını tutturmamak | §5.4, §9b; `verify-packs` uyarır/hata verir |
| `figs-<ülke>.js` dosyasını `index.html`'e eklememek ya da `packs/`'ten sonraya koymak | §9b: `figures.js` → `figs-*.js` (paketlerden önce) |
| Plaka konusu, plaka fotoğrafı ya da plaka çizimi eklemek (Endonezya dahil) | §1 kural 11: Street View'da plakalar bulanık |
| Bir ülkeye 4. konu eklemek; her yeni fikri "kod" konusu yapmak | §1 kural 1: en fazla 3; üçüncü konu yalnızca bölgeyi gösteren görünüm ya da tabelada okunan ad |
| Küçük yazılı fotoğrafı olduğu gibi koymak ("harf görünmüyor / ekrana sığmıyor") | §9.2: `view(...)` ile `crop` ve `marks`; 390 px'te oku |
| Yol anahtarında Latin harf kullanmak (Kiril М-4 yerine Latin M-4), OSM atfını silmek | §9c: anahtar çözücü `key`'iyle birebir; ODbL atfı kalır; `route-regions.cjs` çalıştır |

## 13. Vietnam ve Güney Asya (özel görünümler)

Bu iki bölge pakete dönüştürülmedi; kendi görünümleri vardır. Değişiklik yaparken **aynı tek çatı kuralları** geçerlidir.

- **Vietnam:** `view-explore/guide/practice/sim/progress.js`, `data.js` (63 il, alan kodları), `names.js` (il adı mantığı), `bank.js` (soru bankası), `hints.js` (kademeli ipucu).
  63 il kararı §8'de. Konular: Bölgeler, Alan kodları, İl adları. Alan kodu çözücü, 2017 öncesi kodlar ve istisnalar `data.js`/`view-guide.js`'tedir.
- **Güney Asya:** `view-alfabe.js` (Keşfet/Alfabeler/Tabelalar/Eyaletler/Pratik), `scripts-data.js` (17 yazı, 36 eyalet/birlik bölgesi), `scripts-bank.js`, `geo-asia.js`.
  Yazı kartı `scriptCard(...)`: örnek tabela + özet + **"Gerçek tabelalar" kaydırmalı foto galerisi** (küme adı `as-<yazı kimliği>`) + nasıl tanırsın + karışanlar + rakamlar + nerede görülür.
  Yeni bir yazı için kayıt `scripts-data.js`'e, geometri eşlemesi ve soru bankası otomatik; `node tools/verify-scripts.cjs` ve `node tools/test-scripts.cjs` çalıştır.
- **Foto ve çizim desteği:** Güney Asya alfabe kartında gerçek tabela galerisi var. Vietnam (`vn-sign`, `vn-phone1`: tabelada il/yer adı nerede, telefon numarası) ve Hindistan (`in-dir-all`, `in-mile1`: yön levhası
  yazıları, mil taşı renkleri) ekranlarında **çizim** galerileri var (§9b); çağrı `view-guide.js` ve `view-alfabe.js` içinde `Kit.carousel(küme)` ile yapılır. Vietnam'da gerçek fotoğraf yok.

## 14. Karar önceliği (kural bulunmayan durumlar)

Çatışma olursa şu sırayla karar ver:

1. **Kullanıcının amacı:** bölge tahminine en çok yarayan az konu; anlaşılır Türkçe.
2. **Doğruluk:** yanlış bilgi, eksik bilgiden kötüdür.
3. **Tek çatı:** ortak bileşen, ortak düzen, ortak ayarlar.
4. **Kullanıcı verisi:** ilerleme anahtarlarını koru.
5. **Sadelik:** daha az ekran, daha az kart, daha kısa metin.
6. **Kapsam:** ancak yukarıdakiler sağlanınca yeni ülke/konu/fotoğraf ekle.

Emin değilsen: ekleme; §15'e "öneri" olarak yaz.

## 15. Karar günlüğü ve durum

### Kararlar (15 Kasım 2026, Claude ile yapılan genel gözden geçirme)
- **Tek çatı:** `Kit.cfg` ile her harita aynı ayar penceresini alır; `qa_contract.py` bunu bölge×sekme×boyut denetler.
- **Ülke listesi sadeleştirildi:** Vietnam, Güney Asya, Rusya, Türkiye, Japonya, Endonezya, Brezilya, Meksika, Güney Kore kaldı; 22 ülke `js/_arsiv/`'e alındı (§2.3). Tayland önceden kaldırılmıştı.
- **Rusya** yeniden kuruldu: telefon/şehir kodu çıkarıldı; **yol numaraları** (М-1…А-370, 26 federal yol) ve **cumhuriyet harfleri** (Ә Ө Ү Ҕ Ӏ …) kondu; 6 cumhuriyetin gerçek tabelası eklendi.
- **Uydurma içerik temizlendi:** 141 sahte "ipucu fotoğrafı" (`assets/clues`, `svg-clues.js`) silindi; yerine yalnızca doğrulanmış Commons fotoğrafları.
- **Vietnam 63 il** kaldı (§8). Kore'de Jeonnam–Gwangju notu eklendi.
- **Güney Asya**'ya 9 yazı için gerçek tabela galerisi eklendi (Devanagari, Bengalce, Gurmukhi, Gujarati, Odia, Telugu, Kannada, Malayalam, Tamil).
- Fotoğraf yönetimi tek dosya: `js/photos.js`; Commons yazar/lisansı API'den.

### Kararlar (15 Kasım 2026, ikinci tur: kullanıcının ülke ülke izlenimleri)
- **Rusya:** `yollar` artık federal yolları **haritada çizgi olarak** da gösterir (26 yol, OSM; §9c). `harfler` fotoğraflarında "harf görünmüyor / ekrana sığmıyor" şikâyeti için 10 fotoğrafın 9'una `crop` ve `marks` eklendi (§9.2; registry genelinde 36 fotoğraf bu alanları kullanıyor: Endonezya 15, Rusya 9, Türkiye 12).
- **Türkiye:** `belediye` (levha ve rögar kapağındaki belediye/ilçe adı; 28 giriş) ve `yerel` (bölgeyi gösteren manzara ve yapı: Karadeniz çayı, fındığı ve serenderi, Mardin taşı, Kapadokya, Ağrı Dağı, Van Gölü…; 12 giriş) konuları eklendi; `alan` konusuna
  numaranın tabelada nerede durduğunu ve hangi numaranın yer söylemediğini (05, 444, 0850, 0800) gösteren çizim geldi. Türkiye 3 konulu oldu: **konu üst sınırı 2'den 3'e çıkarıldı** (§1 kural 1; her konu §2.1'i geçiyor, kullanıcı bu çalışmaları açıkça istedi).
- **Japonya:** `elektrik` konusu "levha, bant, şerit" olarak yeniden kuruldu: 16 çizim (§9b; kaynaklar ve sınırlar §9d).
- **Endonezya:** plaka konusu **kaldırıldı** (Street View'da bulanık; §1 kural 11). Yerine `yerel` ("Yazı ve yapı"): Java, Sunda, Bali, Lontara yazılı tabelalar; Minangkabau, Batak, Toraja evleri; Bali tapınak kapısı (gerçek fotoğraflar).
- **Güney Kore, Vietnam, Hindistan:** il/şehir/yer adının **tabelada nerede ve nasıl yazıldığı** çizimle gösterildi (5 + 4 + 10 çizim); doğrulanmış tabela renk ve yazı kuralları `legend`'larda.
- **Brezilya:** `yerel` konusu (direk kesiti ve Rio'nun "kurşun kalem" direği [tek bir topluluk kaynağından, çekinceyle]; araucária, açaí, babaçu, caatinga kaktüsleri) ve DDD numarası çizimi.
- **Meksika:** `yerel` konusu (cardón ve saguaro, agave tarlası, Maya evi, karlı volkan, kurak iç plato, çam-meşe dağları) ve LADA numarası çizimi. Elektrik direği (sekizgen vb.) **bilerek konu yapılmadı**: kullanıcının da belirttiği gibi bölge tahmini vermiyor.
- **"Tüm ülkelerde görselle destek":** çizim sistemi kuruldu (`figures.js`, `figs-<ülke>.js`; §9b). Tabela ve alan kodu çizimleri, belgelenebildiği her yerde yapıldı. **Belgelenemeyenler bilerek çizilmedi** (Rusya karayolu levhası, Vietnam il sınırı levhası (Kore il sınırı levhası 16 Kasım 2026'da Commons fotoğraflarıyla `kr-sinir` kartı oldu),
  Brezilya karayolu kalkanları; §9b): tahminle çizmek yanlış bilgi olurdu, fotoğraf ya da resmî belge bulununca eklenir.

### Doğrulama durumu (dürüst not)
- 83 fotoğrafın (Endonezya 15, Türkiye 40, Rusya 10, Güney Asya 18) hepsi `v:'goz'`: Commons'tan çekilen görüntüden gözle kontrol edildi; yazar ve lisans Commons API'sinden alındı. İlk 39 dosya için 15 Kasım 2026'da tarayıcıdan çevrimiçi sınama yapıldı
  (dosya Commons'ta var mı, yeniden adlandırılmış mı, yazar/lisans kayıtla aynı mı, `Special:FilePath?width=960` adresi yükleniyor mu; araç `tools/verify-photos.mjs`). Sonradan eklenen fotoğraflar için bu sınamayı internetli bir ortamda yeniden çalıştır.
  Bazı fotoğraflarda alt yazı, ilk bakışta görünenle uyuşmadığı için düzeltilmişti (Kazan levhaları değiştirildi, Doraha satır düzeni düzeltildi).
- 46 özgün çizim (`v:'cizim'`): olgular web kaynaklarından doğrulandı (her `figs-*.js` dosyasının başında kaynaklar ve çizilmeyenler yazılı); çizimlerin kendisi `figs_qa.py` ve 390 px ekran görüntüsüyle gözle denetlendi.
  Çizimler fotoğraf değildir; renk ve oran yaklaşıktır, yazılar örnektir.
- Meksika `yerel`: 16 Kasım 2026'da 12 gerçek Commons fotoğrafı eklendi (cardón 2, saguaro 1, agave 3, Maya evi 2, karlı volkan 3, kurak plato 1); çizim kartlarının galerisine (`figs-mexico.js` kümeleri) karıştı, volkan ve plato yeni fotoğraf kartları. Çam–meşe dağı için iyi fotoğraf bulunamadı (kart yok). Güney Kore `hangul`: 3 fotoğraf eklendi (`kr-border-1/2` il sınırı levhası → yeni `kr-sinir` kartı; `kr-dir-1` yön levhası → `kr-dir1` galerisine); hepsi `crop`+`marks` ile. Rusya `yollar`: Commons'taki resmî yol numarası levhası çizimleri (M5, M10, A331, M11) `ru-route` kartı olarak eklendi (fotoğraf değil, GOST R 52290-2004 çizimi). Brezilya `yerel`: 14 fotoğraf eklendi (araucária 2, açaí 1, babaçu 2, caatinga kaktüsü 2 → çizim galerilerine karıştı; cerrado 2, pampa 2, Pantanal 1, Amazon 2 → yeni fotoğraf kartları). Direk (merdiven/yuvarlak/kalem ucu) için net fotoğraf bulunamadı; `br-direk` yalnızca çizimdir (§9.3b). Japonya `elektrik`: Commons'ta etiketli direk levhası fotoğrafı neredeyse yok (47 prefektürün 484 direk dosyası tarandı); yalnızca Tohoku Elektrik levhası (`jp-toh-1`, Aomori) eklendi, diğer şirketler ve şeritler çizimdir. Japonya ve Güney Kore'de yalnızca çizim var.
- Rusya `yollar`'da fotoğraf yok; federal yollar haritada çizgi olarak gösterilir (§9c; OSM verisi, konum birkaç km sapabilir; Р-22 batı kesiti elle yazıldı).
- Vietnam ve Hindistan ekranlarında gerçek fotoğraf yok, çizim galerisi var (§13).
- `tools/qa_contract.py` Chrome/Playwright ile çalıştırıldı; ağ erişimi olmadığından fotoğraflar yer tutucuyla sınandı (düzen), gerçek yükleme çevrimiçi test edilmedi.

### Son sınama (15 Kasım 2026, ikinci tur sonu)
- `verify-packs`: hata yok; 39 uyarı hep aynı türden: hiçbir konuda/kartta geçmeyen birim (Endonezya 26, Rusya 13). Bu birimler yalnızca yer olarak çalışılır, sorun değildir (§5.3).
- Geçti: `verify-data`, `verify-names` (674 denetim), `verify-scripts`, `test-bank` (4902 soru üretimi), `test-hints` (4274 ipucu seti), `test-scripts` (4752 soru), `test-geom`, `route-regions` ("tüm yollar paketle uyumlu").
- `qa_contract.py`: 114 ekran (bölge × sekme × 2 boyut) temiz: sayfa hatası, ikinci ayar düğmesi, yatay taşma yok.
- 1280 px ve 390 px ekran görüntüleri gözle okundu (Rusya yollar ve çizgi, Japonya elektrik, Türkiye alan, Meksika yerel ve çizim ızgaraları).
- Çalıştırılamayan: `verify-photos.mjs` (internet gerekir; bu oturumda yoktu). Gerçek Commons yüklemesi çevrimiçi ortamda ayrıca denenmeli.

### Yapılabilecek sonraki işler (öneri; hepsi §2.1'den geçmeli)
0. Fotoğraf avı için hazır liste: `FOTOGRAF-LISTESI.md` (kart kart hedef, arama önerileri, kayıt düzeni). Çizilemeyen levhalar için 15 Kasım 2026 akşamı yapılan yeni arama da düzen bulamadı (Rusya: yalnızca GOST R 52290 var, rota işareti düzeni anlatılmıyor; Kore: sınır levhası düzeni ayrıca bakanlıkça belirleniyor; Brezilya: kalkan biçimi DENATRAN'da ama anlatımı bulunamadı); bu yüzden hâlâ fotoğraf bekliyor.
1. Brezilya ve Meksika (mümkünse Japonya ve Kore) `yerel`/direk kartlarına gerçek Commons fotoğrafları (§9.3b); çizim kalır, fotoğraf aynı karta ya da yeni kümeye eklenir.
2. Rusya karayolu levhası ve rota işareti, Brezilya karayolu kalkanları, Kore/Vietnam il sınırı levhaları: gerçek Commons fotoğrafı bulunursa fotoğraf kartı; resmî standartta düzeni belgelenirse çizim (§9b "çizilmeyenler").
3. Yol çizgisi katmanını başka bir ülkeye uygulamak (ör. Brezilya `yollar`: BR ve eyalet karayolları) — yalnızca §2.1'den geçerse, §9c yöntemiyle.
4. Vietnam sekmelerine ve Güney Asya "Tabelalar"a gerçek fotoğraf galerisi (Kit.carousel).
5. Güney Asya'nın kalan yazıları (Sinhala, Urduca/Arap-Fars, Tibet, Burma, Ol Chiki, Meetei Mayek) için gerçek tabela fotoğrafları.
6. Aday ülkeler (§2.3) — ancak karar testini geçerse.

> Yeni bir karar aldığında buraya tarihle ekle. Bu bölüm projenin hafızasıdır.

**Türkiye (`js/routes-turkiye.js`, `window.TR_ROUTES`, 16 Kasım 2026).** Aynı biçim; 18 yol: D010, D020, D100, D200, D300, D400, D750, D850, D950 ve O-3, O-4, O-5, O-6, O-7, O-21, O-31, O-51, O-52.
Kaynak yine OSM (ODbL; atıf dosya başlığında ve `routesNote`'ta kalır). D550 OSM'de eksik olduğu için alınmadı. Geçtiği il listesi `tools/route-regions.cjs turkiye` ile çizgiden hesaplanır ve paketteki `ids` ile karşılaştırılır;
bilinçli farklar aynı dosyada `KNOWN` tablosunda belgelidir (D100→Edirne/Kocaeli, O-5→Bursa/Yalova gibi). Levha biçimi: devlet yolu mavi levhada `D-100`/`D.400`, otoyol yeşil levhada turuncu kutuda `O-4`, yanında `E-80`.
Brezilya'da yol çizgisi **kullanılmaz** (kullanıcı kararı: levha nadir görünür; km taşı daha işe yarar).

**16 Kasım 2026 (ikinci tur) — kararlar ve değişiklikler.**
- **Yapay görsel yalnızca gerekirse.** Japonya direk gövde şeridi: yalnız gerçek fotoğraf (`jp-wrap-1`, `jp-wrap-2`); sarmal (Hokuriku), kenarlıksız (Kansai) ve turuncu-siyah (Shikoku) şerit **çizimleri kaldırıldı**, bu türler yalnız metinle anlatılır (Commons'ta okunaklı fotoğraf bulunamadı). Levha üstündeki beyaz yazılı bant: çizim (`jp-anat`, `jp-band`) kalır.
- **Hindistan yön levhaları** (`in-dir-all`): 11 gerçek fotoğraf (Kannada, Malayalam ×2, Bengal, Gujarati, Pencap, Odia, Marathi ×2, Telugu, Tamil) önce, şematik çizimler sonra. Aynı fotoğraflar her yazının "Gerçek tabelalar" kümesine (`as-*`) da eklendi.
- **Brezilya:** `yollar`'da yol çizgisi yok; yerine kilometre levhası kartı (`br-km`: BR-485, BR-460 fotoğrafları; üstte yol kodu, altta km). `yerel`'e soya, carnaúba, kahve girişleri ve fotoğrafları eklendi.
- **Telefon numarası kartları** (Brezilya, Meksika, Türkiye, Kore): çizime gerçek tabela fotoğrafı eklendi; fotoğraflar yerel numara gösterir, kartlarda böyle yazar. Vietnam için uygun fotoğraf bulunamadı.
- **Endonezya:** `yazi` (yazı) ve `yerel` (yapı/manzara) iki ayrı konu. **Kore:** `yerel` (bölgesel görünüm). **Meksika:** `yerel` genişletildi (kurak iç plato, güneydoğu).
- **Ana sayfa:** nokta dokulu dünya haritası (Natural Earth kara verisinden çalışma anında üretilir); kapsanan ülkeler yol plakası biçiminde, kendi renginde işaretlenir. Yeni ülke eklerken `js/view-hub.js` içindeki `PIN` tablosuna `[boylam, enlem]` eklenir.
- Konu üst sınırı: ülke başına en fazla 3 konu (Türkiye istisna: 4); `tools/verify-packs.cjs` denetler.

## Pratik / Simülasyon: yalnız görsel ve işaret soruları (üçüncü tur kararı)
- Pratik ve Simülasyonda **ad sorusu yok**: "bu yapının adı ne?" gibi, GeoGuessr'da işe yaramayan sorular çıkmaz. Soru, görülen şeyin (tabela, plaka, kod, fotoğraf) **nerede** olabileceğini sorar; bölge haritadan seçilir, şık yalnız yedek.
- Konu `"practice": "visual"` ise bilgi kartları (facts) sorulmaz; konu yalnız fotoğraf sorularıyla çalışılır. Fotoğrafsız kalan yerel konular bu işaretle de bırakılmaz: önce fotoğraf bul.
- `quiz:false` kartlar ve çizim+fotoğraf karışık kümeler sorudan çıkar.
- Keşfet'te bir bölgeye tıklayınca altında o bölgenin bilgi paneli açılır (kod, kısa tarif, o bölgede görülen kartlar; tekrarlayan başlık kodları süzülür).
- Bölgesel direk şeridi/levha gibi konularda fotoğraf bulunamazsa **çizme**; Plonkit/topluluk bilgisini metin olarak yaz ve kaynağı belirt.

### Kararlar (23 Kasım 2026 — Reklam / Google AdSense ve ticari yayın hazırlığı)
- **Esri harita karoları kaldırıldı (ticari lisans uyumu):** `js/map.js` içindeki API anahtarsız Esri ArcGIS Online (`server.arcgisonline.com` / `services.arcgisonline.com`) karo çağrıları, Esri'nin reklamlı/ticari site kullanım kısıtı nedeniyle kaldırıldı. Tüm haritalar artık yerleşik **Sade atlas** vektör zeminini (Natural Earth, Kamu Malı) kullanır; `Kit.cfg` penceresindeki `Zemin` satırı sözleşmeye uygun biçimde korunur (`Sade atlas · yerleşik vektör harita`).
- **CC BY / CC BY-SA atıf uyumu:** `js/kit.js` ve `js/view-sources.js` içinde her fotoğrafın lisansı tıklanabilir Creative Commons lisans bağlantısıyla verilir; `crop`/`marks` kullanılan fotoğraflarda "(kırpıldı/işaretlendi)" uyarlama notu görünür. Kaynaklar sayfasına OpenStreetMap (ODbL), Natural Earth, Free-GIS-Data ve özgün çizim atıfları ile doğrudan telif iletişim adresi (`gorkemugurguler@gmail.com`) eklendi.
- **Yasal sayfalar ve ortak alt bilgi:** `js/site-config.js`, `js/ads.js`, `js/view-legal.js` ve `UI.siteFooter()` eklendi: Hakkımızda, Gizlilik ve Çerez Politikası (Google AdSense + KVKK + GDPR + IAB TCF v2.2 CMP uyumu), Kullanım Koşulları (GeoGuessr AB bağımsızlık/marka feragatnamesi), İletişim (`gorkemugurguler@gmail.com`) ve Kaynaklar. `localStorage` anahtarı (`vietatlas.v1`) ve SRS anahtarları değişmedi.
- **Taranabilirlik / SEO (AdSense "düşük değerli içerik" koruması):** `tools/generate_seo_pages.py` üreticisi eklendi; doğrudan gerçek veri dosyalarından 9 ülke okuma rehberi (`rehber/*.html`), 5 yasal/kaynak sayfası, `404.html`, `index.html` SSR bot içeriği, `sitemap.xml`, `robots.txt` (`/dist/` ve `/tools/` kapalı), `ads.txt` ve Cloudflare `_headers` üretir.
- **Reklam yuvaları ve alan adı geçişi:** `ATLAS_CONFIG.ads.enabled = false` iken sitede hiçbir boş reklam kutusu çizilmez. Alan adı ve `ca-pub-...` kimliği alındığında `tools/set_domain.py` tek komutla tüm siteyi günceller (ayrıntı: `REKLAM-REHBERI.md`).


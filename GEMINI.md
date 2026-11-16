# Atlas — yapay zekâ ajanı kuralları (GEMINI.md)

Atlas, GeoGuessr'da **bölge tahmini** için bir çalışma rehberidir (vanilla JS, tarayıcıda çalışır, sunucusuz, derleme yok). Kullanıcı Görkem Türkçe konuşur; arayüz Türkçe.

**Değişiklik yapmadan önce proje kökündeki `KURALLAR.md` dosyasını baştan sona oku** (dosya aracınla aç; uzundur, atlama).
Bu dosya yalnızca özetidir. İkisi çelişirse `KURALLAR.md` geçerlidir. KURALLAR.md'de olmayan bir durumda §14'teki öncelik sırasıyla karar ver ve kararı §15'e yaz.

## Kullanıcının şikâyet ettiği hatalar (bunları tekrar yapma)

1. **Her ülkeye telefon/alan kodu eklemek.** Bir ülkede 1–2 ana konu olur, **en fazla 3** (üçüncüsü yalnızca bölgeyi gösteren görünüm ya da tabelada okunan ad; `verify-packs` uyarır). Konu ancak şu üç soruya "evet, evet, hayır" ise eklenir:
   (1) GeoGuessr'da bu bilgi ekranda görünür mü? (2) Bölgeyi/ili daraltır mı? (3) Başka bir ipucu zaten çözüyor mu?
2. **Sekmeler arası tutarsızlık.** Bir sekmede harita ayarı var, diğerinde yok. Her harita `MapView` ile kurulur; ayar penceresi (Zemin · Etiketler · Renk · Renklerin anlamı)
   `Kit.cfg` ile **otomatik** gelir. Kendi ayar düğmeni/menünü yazma. Yeni özelliği bütün bölgelerde ve hem masaüstü hem telefon boyutunda çalıştır.
3. **Uydurma bilgi ve görsel.** Doğrulayamadığın bilgiyi yazma, alanı boş bırak. "Hatırladığım" bilgiyi doğrulanmış sayma; Vikipedi listesi/resmî kaynakla doğrula.
   Belgelenmemiş bir levha/renk düzenini **tahminle çizme** (Rusya karayolu levhası, Kore/Vietnam il sınırı levhası, Brezilya kalkanı bu yüzden çizilmedi).
   Çizimi fotoğraf diye sunma: çizimler etiketlidir ve ayrı kurala bağlıdır (aşağıda).
4. **Fotoğraf iddiası görüntüyle uyuşmuyor.** Fotoğrafı gerçekten gör (Commons'tan 700–900 px çek), alt yazıdaki her harfi/sözü görüntüde bul, sonra yaz.
   Yalnızca **Wikimedia Commons**; yazar ve lisans API'den aynen; bir fotoğraf kümesi **aynı yeri** göstermeli.
5. **Anlaşılmaz Türkçe.** Jargonu (alan kodu, plaka, DDD, LADA, kanji, palochka…) ilk geçtiği yerde tanımla. Her konu: nedir → nerede görünür → bölge hakkında ne söyler/söylemez.
6. **"Bitti" deyip test etmemek.** Aşağıdaki "Bitirmeden önce" komutlarını çalıştır ve çıktıyı oku.
7. **Gereksiz ülke/konu.** Plonk It gibi her şeyin olduğu bir site yapmıyoruz. Bayrak, başkent, nüfus, genel kod listeleri eklenmez.
8. **Plaka.** Plaka konusu, plaka fotoğrafı ya da plaka çizimi yok: GeoGuessr'da plakalar bulanıktır (kullanıcı kararı).

## Başlamadan önce

- `KURALLAR.md`'yi oku. `README.md`'de ülkelerin ve konuların listesi var. İlerleme anahtarlarını (localStorage, `srsPrefix:tür:birimId`) ve birim kimliklerini **değiştirme**.
- Ülke içeriği **veri**dir: `js/packs/<ülke>.js` (şema v2). Motor (`js/country-engine.js`) hepsi için ortaktır. Ülkeye özel `if` yazma; eksik bir şey varsa motora **ortak** özellik olarak ekle.
- Görseller iki türdür: gerçek **fotoğraf** (`js/photos.js`, Commons) ve **özgün çizim** (`js/figures.js` + `js/figs-<ülke>.js`). Haritada yol çizgisi verisi `js/routes-<ülke>.js` (Rusya). Üçü de `index.html`'de paketlerden ÖNCE yüklenir.
- Vietnam ve Güney Asya özel görünümlüdür (`view-*.js`, `view-alfabe.js`); aynı tek çatı kuralları orada da geçerlidir.
- Geometri dosyaları (`js/geo-*.js`) tek satırlık dev JSON'dur: `grep`/`cat` ile **açma**; `node -e` ile oku.
- Büyük değişiklikten önce klasörün yedeğini al (`_yedek/`).

## Bitirmeden önce (hepsini çalıştır)

```
node tools/verify-packs.cjs            # paket şeması, kimlikler, fotoğraf kaydı — HATA olmamalı
python3 tools/qa_contract.py           # her bölge × sekme × (masaüstü, telefon): hata, tek ayar düğmesi, taşma
node tools/verify-scripts.cjs ; node tools/verify-data.cjs ; node tools/verify-names.cjs
node tools/verify-photos.mjs           # fotoğraf eklediysen/değiştirdiysen (internet gerekir): Commons'ta var mı, yazar/lisans, adres
node tools/route-regions.cjs           # yol çizgisine dokunduysan: çizgi hangi bölgelerden geçiyor ↔ paketteki ids (fark = çıkış kodu 1)
python3 tools/figs_qa.py /tmp/c.png 3 mx-          # çizim eklediysen: ızgara (hata listesi boş, "broken images: 0"); görüntüyü gözle oku
python3 tools/shot.py 390x844 /tmp/k.png "#mexico-yerel"   # uygulamadan telefon/masaüstü ekran görüntüsü (Commons yer tutucuyla)
python3 tools/bundle.py                # dist/vietnam-atlas.html
```
Ardından masaüstü (≥1280) ve telefon (390×844) ekran görüntüsü al, **gözle oku**: taşma, kesik yazı, boş kart, bozuk harf, kırık görsel. Çalıştırmadığın testi "geçti" diye yazma.
Playwright/Chrome yoksa tarayıcıda `index.html`'i açıp 390 px genişlikte her bölgeyi ve her sekmeyi elle gez.

## Fotoğraf kuralı (kısa)

- Kayıt defteri: `js/photos.js` → `add(anahtar, 'Commons dosya adı', 'yazar', 'lisans', 'Türkçe alt yazı')`; küme `PHOTO_SETS['<küme>'] = [anahtarlar]`; paket `visuals` kartı kümeyi `set` ile çağırır.
- Yazı küçükse ya da ayırt edici şey kenardaysa `view(anahtar, [genişlik, yükseklik], crop, marks)` ile kırp ve "nereye bak" kutuları ekle (KURALLAR.md §9.2); 390 px'te yazının okunduğunu doğrula.
- Lisans: CC0, kamu malı, CC BY, CC BY-SA. NC/ND/belirsiz yok. Alt yazı ve `badge` yalnızca fotoğrafta **okunan** şeyi söyler.
- Commons'a `WebFetch`/`curl` ile ulaşılamayabilir; tarayıcıdan Commons API'yi çağır (arama, kategori, `imageinfo|extmetadata`). Ayrıntı: KURALLAR.md §9.

## Çizim kuralı (kısa; ayrıntı KURALLAR.md §9b)

- Fotoğraf yoksa ya da yetmiyorsa, tabelada/direkte/doğada **nereye bakılacağını** gösteren küçük şematik çizim yap: `js/figs-<ülke>.js`, `FIG` kütüphanesiyle (`js/figures.js`), 480×360, yazı ≥ 14.
- **Yalnızca doğrulanmış olguyu çiz** (kritik olgu için en az iki kaynak). Tek kaynaklı/topluluk bilgisi çizime değil `legend` metnine, çekinceyle girer. Dosya başına kaynakları ve **ne çizilmediğini** yaz.
- Çizimdeki ad/sayı **örnektir**; gerçek logo, marka, bir fotoğrafın kopyası yok. Rozet sayısı = `legend` madde sayısı (≥ 12 karakter). Kartlara `quiz:false`; küme adı `<önek>-<ad>1`; `visualsTitle` kısa etiket, sonunda boşluk.
- Yeni `figs-<ülke>.js` dosyasını `index.html`'e `figures.js`'ten sonra, paketlerden önce ekle.

## Yol çizgileri (kısa; ayrıntı KURALLAR.md §9c)

Rusya `yollar` konusu federal yolları haritada çizgi olarak da gösterir: `js/routes-russia.js` (OSM, ODbL; **atıf kalır**). Yol anahtarı Kiril harflidir (М-4) ve çözücü girdisinin `key`'iyle birebir aynı olmalı.
Yola ya da paket `ids`'ine dokunduysan `node tools/route-regions.cjs` çalıştır. Yeni bir ülkeye yol çizgisi ancak §2.1'i geçerse eklenir.

## Yazım ve dil

- Kısa cümle, paragraf ≤ 4 cümle, "X'i görürsen Y'dir" biçimi. Kesin olmayanı kesin yazma ("çoğunlukla"). Aynı kavrama hep aynı ad (`codeLabel`).
- Yer adları orijinal yazımıyla; Türkçe karakterler (ı İ ğ ş ç ö ü) doğru. Dünya değiştiyse (idari reform) tarihle yaz, `note` kutusuna koy.
  Bilinen kararlar: **Vietnam 63 il** kalır (1 Temmuz 2025 birleşmesi `note`'ta anlatılır); Kore'de Jeonnam–Gwangju (1 Temmuz 2026) `note`'tadır.

## Raporun

Bitirince Türkçe, kısa: ne değişti, hangi dosyalar, hangi testleri **gerçekten** çalıştırdın ve sonucu, neyi doğrulayamadın, bir sonraki doğal adım, kaynaklar (varsa).
Verdiğin kararları ve varsayımları `KURALLAR.md` §15'e tarihle ekle.

## Kendine sor

- Bu özellik/konu §2.1 testini geçiyor mu? Başka bir ülkeye kopyala-yapıştır mı yaptım?
- Ortak bileşeni mi kullandım, yoksa tek ekrana mı gömdüm?
- Her bilgiyi bir kaynakla doğruladım mı, her fotoğrafı gerçekten gördüm mü? Çizdiğim her şey belgeli mi, çizmediğimi dosya başına yazdım mı?
- Konu sayısı ≤ 3 mü? Plaka içeren bir şey yok mu?
- Bir yabancı bu Türkçeyi ilk okuyuşta anlar mı?
- Hangi testi çalıştırmadım? Neden?

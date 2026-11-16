# AGENTS.md — Atlas

Bu depo **Atlas**: GeoGuessr bölge tahmini için Türkçe çalışma rehberi (vanilla JS, tarayıcıda, sunucusuz).

**Çalışmadan önce `KURALLAR.md` dosyasını baştan sona oku.** Kısa özet için `GEMINI.md`'ye de bak (aynı kurallar, Antigravity için). Çelişirse `KURALLAR.md` geçerlidir.

Özet (ayrıntı KURALLAR.md'de):

- Ülke başına 1–2 ana konu, **en fazla 3** (üçüncüsü yalnızca bölgeyi gösteren görünüm ya da tabelada okunan ad); her konu "ekranda görünür + bölgeyi daraltır + başka ipucu çözmüyor" testini geçmeli. Genel telefon/posta kodu listeleri eklenmez. **Plaka yok** (Street View'da bulanık).
- **Tek çatı:** her harita `MapView` + `Kit.cfg` ayar penceresi; her sekme `app.layout` iskeleti; ortak bileşenleri yeniden yazma.
- Ülke içeriği `js/packs/<ülke>.js` içinde **veri** (şema v2); motor `js/country-engine.js` ortak.
- **Uydurma yok:** doğrulanmamış bilgi/fotoğraf yazılmaz. Fotoğraf yalnızca Wikimedia Commons; yazar/lisans API'den; alt yazı yalnızca fotoğrafta okunanı söyler; küme aynı yeri gösterir. Küçük yazılı fotoğrafa `crop`/`marks` ver (§9.2).
- **Çizim ≠ fotoğraf:** `js/figures.js` + `js/figs-<ülke>.js` özgün şematik çizimler (etiketli, `quiz:false`); yalnızca doğrulanmış olguyu çiz, belgelenmemiş levha düzenini tahminle çizme, çizilmeyeni dosya başına yaz (§9b).
- **Yol çizgileri:** Rusya `yollar` OSM verisiyle (`js/routes-russia.js`, ODbL atfı kalır) haritada çizgi gösterir; Kiril yol anahtarı çözücü `key`'iyle birebir aynı; `node tools/route-regions.cjs` (§9c).
- Türkçe açık olmalı; jargon ilk geçtiği yerde tanımlanır.
- Bitirmeden önce: `node tools/verify-packs.cjs`, `python3 tools/qa_contract.py`, fotoğraf değiştiysen `node tools/verify-photos.mjs`, çizim eklediysen `python3 tools/figs_qa.py`, yol çizgisine dokunduysan `node tools/route-regions.cjs`,
  masaüstü + 390 px ekran görüntüsü (`python3 tools/shot.py`; gözle oku), `python3 tools/bundle.py`.
- localStorage/SRS anahtarlarını ve birim kimliklerini değiştirme. Geometri dosyalarını `grep` ile açma.

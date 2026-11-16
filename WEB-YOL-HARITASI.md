# Atlas → Web sitesi: yol haritası

Durum (16 Kasım 2026): Atlas saf HTML/CSS/JS (derleme yok), `index.html` + `js/` + `css/`. Tek dosyalık paket `dist/vietnam-atlas.html` (~3 MB). 9 ülke paketi hazır; ilerleme `localStorage`'da (cihaza özel). Fotoğraflar Wikimedia Commons'tan `Special:FilePath` ile çağrılıyor. Testler `tools/` altında.

Kural: önce siteyi yayına al, sonra yeni bölgeleri **yayındaki siteye** ekle. Böylece her yeni bölge bir `git push` ile canlıya çıkar.

---

## Önce senin vereceğin 5 karar (5 dk, telefondan yapılır)
1. **Site adı ve alan adı.** Öneri: ücretsiz alt alan adıyla başla (`atlas.pages.dev` gibi), özel alan adı (~10–15 $/yıl) sonra.
2. **Barındırma.** Öneri: **Cloudflare Pages** (ücretsiz, hızlı, sınırsız bant, GitHub'dan otomatik yayın). Alternatif: GitHub Pages (daha basit, 1 GB sınır).
3. **Kim kullanacak?** Yalnız sen mi, herkese açık mı? Herkese açıksa: lisans/atıf sayfası zorunlu (bkz. Aşama 3) ve alan adı almak mantıklı.
4. **Dil.** Şimdilik yalnız Türkçe; İngilizce sonra mı?
5. **İlerleme kaydı.** Şimdilik cihazda (hesap yok). Telefon–PC arasında eşitleme istiyorsan Aşama 6'ya bak.

---

## Aşamalar (sırayla; her biri ayrı ayrı yayınlanabilir)

### Aşama 1 — Depoyu hazırla (PC, ~30 dk)
- `geoguessr-vietnam` klasörünü bir **GitHub deposu** yap (özel de olabilir). `_yedek/` klasörünü `.gitignore`'a ekle (zip yedekleri depoya girmesin).
- `index.html`'i yayın girişi olarak kontrol et; `dist/` içindeki iki dosya ayrı, site için gerekmez.
- Çıkış: depo GitHub'da, `main` dalında.

### Aşama 2 — İlk yayın (PC veya telefon, ~20 dk)
- Cloudflare Pages → "Connect to Git" → depoyu seç → **build komutu boş**, çıktı klasörü `/` (kök).
- Açılışta kontrol: ana sayfa haritası, her ülkenin 4 sekmesi, bir fotoğraf sorusu, 390 px telefon ekranı.
- Çıkış: çalışan bir adres. Bu noktadan sonra her `git push` siteyi günceller.

### Aşama 3 — Yayına çıkmadan zorunlu işler (PC, ~1–2 saat)
- **Atıf sayfası** (`#kaynaklar`): fotoğrafların yazar + lisans listesi. Veri zaten `js/photos.js`'te (yazar, lisans, dosya adı); bir görünüm bunları tablo olarak basar. CC BY / CC BY-SA fotoğraflar için bu gerekli.
- **Alt bilgi:** "Fotoğraflar Wikimedia Commons'tan; yazar/lisans için Kaynaklar", telif şikâyeti için iletişim adresi.
- **Fotoğraf hotlink riski:** Commons'a doğrudan bağlanmak yavaş olabilir ve ara sıra hız sınırına takılır. İlk yayında kalsın; sorun olursa fotoğrafları `img/` altına indirip kendi sitenden sun (`tools/fetch_photos.py` bunun için var).
- `<title>`, açıklama, paylaşım görseli (Open Graph), favicon, `robots.txt`.

### Aşama 4 — Hız ve telefon deneyimi (PC, ~2 saat)
- 3 MB'lık ilk yükleme: ülke paketlerini (`js/packs/*.js`) **gerektiğinde yükle**, ilk açılışta yalnız ana sayfa gelsin. Küçültme (minify) + gzip/brotli (Cloudflare otomatik yapar).
- **PWA:** `manifest.json` + service worker → telefonda "ana ekrana ekle", ağ yokken uygulama çalışır (fotoğraflar hariç, o yüzden en çok açılan fotoğraflar önbelleğe alınabilir).
- Çıkış: Lighthouse mobil ≥ 90, ilk açılış < 2 sn.

### Aşama 5 — Kalite güvencesi (otomatik)
- GitHub Actions: her `push`'ta `tools/verify-*.cjs`, `test-*.cjs`, `qa_contract.py` çalışsın; kırmızıysa yayın durur. (Testler zaten var, sadece bir `.github/workflows/qa.yml` lazım.)

### Aşama 6 — İsteğe bağlı (sonra)
- **Cihazlar arası ilerleme:** hesap gerektirmeyen yol: ilerlemeyi "dışa aktar / içe aktar" (tek bir kod/dosya). Hesaplı yol: Supabase/Firebase ücretsiz katman + giriş.
- Alan adı, ücretsiz analitik (Cloudflare Web Analytics, çerezsiz), İngilizce arayüz.

---

## Yeni bölgeler (siteyle paralel)
Her yeni ülke = 1 paket dosyası `js/packs/<ülke>.js` + `js/view-hub.js` içinde `PIN` satırı + gerekirse `js/geo/` verisi. Kurallar `KURALLAR.md`'de (ülke başı en çok 3 konu, gerçek Commons fotoğrafı, çizim yalnız belgeliyse, plaka yok). Test: `node tools/verify-packs.cjs`.
Önerilen sıra: önce ülke listesini seç (aşağıdaki "yarın ilk iş"), sonra her seferinde 3–4 ülke yap, yayınla.

---

## Telefondan mı, PC'den mi?
| İş | Telefon | PC |
|---|---|---|
| 5 karar, Cloudflare/GitHub hesabı | ✅ | ✅ |
| Depoyu GitHub'a koymak, ilk yayın | ⚠️ zor | ✅ |
| Atıf sayfası, hız, PWA, testler | ❌ | ✅ |
| Yeni ülke içeriği (fotoğraf avı dahil) | ❌ (Commons taraması tarayıcı panelinde) | ✅ |
| Yayındaki siteyi telefondan deneme | ✅ | ✅ |

**Sonuç:** karar ve hesap açma işlerini telefonda yap; kod işlerini yarın PC'de.

---

## Yarın ilk iş (30 saniyede başla)
Bu dosyayı Claude'a (ya da Antigravity'ye) ver ve de ki: *"WEB-YOL-HARITASI.md Aşama 1–3'ü yap, kararlarım: [alan adı/hosting/dil]."* Antigravity'ye uzun, tek parça iş vermek daha verimli; hazır komut aşağıda.

### Antigravity için hazır komut (yapıştır)
```
Proje: bu klasördeki Atlas (saf HTML/CSS/JS, derleme yok). Önce AGENTS.md, GEMINI.md ve KURALLAR.md'yi oku.
Görev (hepsini tek seferde yap, her adımdan sonra tools altındaki testleri çalıştır):
1) .gitignore ekle (_yedek/, node_modules, *.zip). Depoyu git'e hazırla.
2) "Kaynaklar" görünümü: js/photos.js'teki tüm fotoğrafları (anahtar, Commons dosya adı, yazar, lisans, açıklama) ülkeye göre gruplayıp tablo olarak gösteren yeni bir görünüm (#kaynaklar), ana sayfanın alt bilgisinden bağlantılı. Telefonda (390 px) taşma olmasın.
3) index.html'e title, meta description, Open Graph, favicon, robots.txt, manifest.json ekle.
4) Ülke paketlerini (js/packs/*.js) ülke sayfası açılınca yükleyen tembel yükleme yap; ilk açılışta yalnız ana sayfa için gerekenler gelsin. Hash yönlendirme (#<ülke>-<konu>) bozulmasın.
5) Basit bir service worker: uygulama dosyalarını önbelleğe alsın, çevrimdışı açılsın; fotoğraflar ağdan gelsin, açılanlar önbelleğe girsin.
6) .github/workflows/qa.yml: her push'ta tools/verify-*.cjs, tools/test-*.cjs ve python3 tools/qa_contract.py çalışsın.
7) README.md'ye yayın adımlarını (Cloudflare Pages, build komutu boş, çıktı klasörü kök) yaz.
Kurallar: mevcut Leitner anahtarlarını yeniden adlandırma; fotoğraf/atıf kurallarına uy; her şey Türkçe arayüz.
Bitince: hangi testler geçti, ne değişti, tek paragraf özet.
```

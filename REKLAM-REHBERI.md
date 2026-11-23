# Atlas — Özel Alan Adı ve Google AdSense Yayın Rehberi

Kod tarafındaki tüm reklam, SEO, yasal sayfa ve ticari lisans gereklilikleri tamamlandı. Özel alan adını aldığın gün reklamları aktif etmek için yalnızca aşağıdaki sırayı izlemen yeterli.

---

## 1. Alan adını al ve Cloudflare'a bağla
1. Tercih ettiğin bir kayıt şirketinden (Cloudflare Registrar, Porkbun, Namecheap vb.) özel alan adını al (ör. `vietatlas.com`).
2. Alan adını Cloudflare hesabına (`gorkemugurguler@gmail.com`) ekle ve DNS ad sunucularını (nameserver) Cloudflare'a yönlendir.
3. Cloudflare Dashboard → **Workers & Pages** → **`atlas`** → **Settings** → **Domains & Routes** → **Add** → **Custom Domain** bölümünden alan adını (`ornek.com` ve istersen `www.ornek.com`) bağla.

---

## 2. Siteyi yeni alan adına göre güncelle (tek komut)
Terminalde proje klasörüne girip alan adını işle:

```bash
cd /Users/sareyuksel/.gemini/antigravity/scratch/geoguessr-vietnam
python3 tools/set_domain.py --domain https://alanadin.com
git add .
git commit -m "Özel alan adı yapılandırması"
git push
```

Bu komut tek seferde şunları günceller:
- `js/site-config.js`
- `index.html` (`canonical`, `og:url`, `og:image`, JSON-LD)
- `sitemap.xml` ve `robots.txt`
- Tüm 15 statik HTML sayfası (`hakkimizda.html`, `gizlilik.html`, `kullanim-kosullari.html`, `iletisim.html`, `kaynaklar.html`, `rehber/*.html`)
- `dist/vietnam-atlas.html`

> **İsteğe bağlı ama önerilen:** Google Search Console'a yeni alan adını ekleyip `https://alanadin.com/sitemap.xml` haritasını gönder; 15 statik sayfanın hızlı indekslenmesini sağlar.

---

## 3. Google AdSense başvurusu ve site doğrulama
1. [Google AdSense](https://www.google.com/adsense) hesabı aç ve **Siteler → Yeni site ekle** kısmına özel alan adını (`alanadin.com`) yaz *(asla `workers.dev` adresini yazma)*.
2. AdSense sana bir yayıncı kimliği verecek: `ca-pub-XXXXXXXXXXXXXXXX`.
3. Tek komutla doğrulama kodunu ve `/ads.txt` dosyasını tüm siteye ekle:

```bash
python3 tools/set_domain.py --domain https://alanadin.com --adsense ca-pub-XXXXXXXXXXXXXXXX
git add .
git commit -m "Google AdSense doğrulama ve ads.txt"
git push
```

4. Tarayıcıdan `https://alanadin.com/ads.txt` adresinin açılıp `google.com, pub-..., DIRECT, f08c47fec0942fa0` satırını gösterdiğini kontrol et.
5. AdSense panelinde **Doğrula** ve **İnceleme iste** düğmelerine tıkla.

---

## 4. Avrupa çerez onayı (CMP) — Zorunlu ayar
AdSense panelinde **Gizlilik ve mesajlaşma (Privacy & Messaging)** → **Avrupa düzenlemeleri (GDPR / IAB TCF v2.2)** mesajını **tek tıkla etkinleştir**:
- Ücretsizdir ve Google sertifikalıdır.
- Gizlilik politikası adresi olarak `https://alanadin.com/gizlilik.html` yaz.
- Atlas alt bilgisindeki **Çerez tercihleri** düğmesi bu Google CMP penceresiyle otomatik uyumludur.

---

## 5. Onay sonrası reklamları açma
AdSense onayı geldikten sonra iki seçeneğin var:
- **En kolay yol (Otomatik Reklamlar):** AdSense panelinde *Otomatik Reklamlar*ı aç (harita/buton alanlarını korumak için "Alanları hariç tut" aracını kullanabilirsin) ve `--enable-ads --auto-ads` çalıştır.
- **Kontrollü sabit yuvalar (önerilen — haritayı ve test ekranlarını bozmaz):** AdSense → **Reklamlar → Reklam birimine göre → Görüntülü reklamlar** altında 3 adet *Duyarlı (Responsive)* birim oluştur (`hubMid`, `overviewEnd`, `guideEnd`) ve slot numaralarını gir:

```bash
python3 tools/set_domain.py \
  --domain https://alanadin.com \
  --adsense ca-pub-XXXXXXXXXXXXXXXX \
  --enable-ads \
  --slot-hub 1111111111 \
  --slot-overview 2222222222 \
  --slot-guide 3333333333
git add .
git commit -m "AdSense reklam yuvaları etkinleştirildi"
git push
```

---

## İleride trafik artarsa (isteğe bağlı)
- 232 Wikimedia Commons fotoğrafı şu an doğrudan Commons'tan yükleniyor. Trafik artıp hız sınırına takılırsa `python3 tools/fetch_photos.py` ile fotoğrafları kendi sunucuna (`assets/photos/`) indirebilirsin.

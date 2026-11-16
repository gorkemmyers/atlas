# js/_arsiv — Arşiv (uygulamada YÜKLENMEZ)

Bu klasördeki dosyalar `index.html` içinde çağrılmaz; uygulamayı etkilemezler. Silinmediler, çünkü içlerinde emek var
(harita geometrileri, ülke verileri). İstenirse geri getirilebilirler.

## Neden arşive alındılar?

Atlas'ın amacı: **her ülke için bölge tahminine en çok yarayan bir iki konuyu** çalıştırmak. Gemini ile eklenen 20 ülkenin
çoğunda yalnızca alan kodu / telefon kodu vardı; bu bilgi çoğu ülkede GeoGuessr'da nadiren görünür ya da zaten başka
bir ipucuyla (bayrak, plaka, dil) çözülür. Bu yüzden:

| Arşivlenen ülkeler | Gerekçe |
|---|---|
| Almanya, Fransa, İspanya, İtalya, Polonya, İsveç, Norveç, Romanya, Ukrayna | Paketler ağırlıklı olarak alan/posta kodu içeriyordu; bölge tahmini için ayırt edici bir konu çıkarılmamıştı |
| Şili, Kolombiya, Peru, Filipinler, Malezya, Tayvan, Güney Afrika, Nijerya, Kenya, Yeni Zelanda, Birleşik Krallık, ABD, Kanada | Aynı sebep; ayrıca içerikleri bu çalışmada kaynaklarla yeniden doğrulanmadı |
| Tayland | Daha önce kaldırılmıştı |

## Klasörler

- `eski-paketler/` — eski şemayla yazılmış 10 ülke paketi (`pack-*.js`). **Eski şema artık motor tarafından okunmaz.**
- `geo/` — arşivlenen ülkelerin harita geometrileri (`geo-europe.js`, `geo-americas.js`, `geo-asia-new.js`, `geo-afroceania.js`).

## Bir ülkeyi geri getirmek (adım adım)

1. **Önce sor: bu ülkede GeoGuessr'da bölgeyi gerçekten ele veren 1–2 şey ne?** (ör. Rusya: federal yol numaraları ve
   cumhuriyetlerin ek harfleri; Endonezya: yerel yazılı tabelalar ve geleneksel yapılar; plaka konusu yapılmaz, KURALLAR.md §1 kural 11). Yoksa ülkeyi geri getirme. Ayrıntı: `KURALLAR.md > "Ülke seçimi"`.
2. Geometriyi geri al: `_arsiv/geo/` içindeki ilgili dosyadan **yalnızca o ülkenin** `*_GEO` nesnesini yeni bir
   `js/geo-<ülke>.js` dosyasına taşı (tüm kıtayı yüklemek uygulamayı yavaşlatır). Dosyaları `grep` ile açma: tek satırlık dev
   JSON'dur; `node -e` ile parçala.
3. Veriyi **v2 şemasıyla yeniden yaz**: `js/packs/<ülke>.js` — `KURALLAR.md > "Ülke paketi şeması (v2)"`. Eski
   `pack-*.js` dosyasındaki birim adlarını/kodlarını kaynak olarak kullanabilirsin ama **her bilgiyi güvenilir bir kaynaktan
   yeniden doğrula** (Vikipedi listeleri, resmî siteler). Eski dosyalardaki bilgiye körü körüne güvenme.
4. `index.html` içine, `country-engine.js`'ten sonra ve `app.js`'ten önce iki satır ekle: `geo-<ülke>.js`, `packs/<ülke>.js`.
5. Doğrula: `node tools/verify-packs.cjs` → `python3 tools/qa_contract.py` → telefon ve masaüstü ekran görüntüsü.
6. `python3 tools/bundle.py` ile tek dosyalık sürümü yeniden üret.

## Silmek istersen

Bu klasör tamamen silinebilir; uygulama etkilenmez. Önce gerekirse bir yedek al.

#!/usr/bin/env python3
"""Fotoğrafları yerel önbelleğe indirir (isteğe bağlı).

Neden: Uygulama fotoğrafları çevrimiçi olarak Wikimedia Commons'tan çağırır (js/photos.js). Site yayına
alınırken fotoğrafları kendi sunucuna koymak (hız, Commons'a bağımlı olmamak) istersen bu betiği çalıştır.

Kullanım (kendi bilgisayarında; internet gerekir):
    python3 tools/fetch_photos.py             # tüm fotoğrafları assets/photos/ altına indir, js/photos-local.js yaz
    python3 tools/fetch_photos.py --dry-run   # yalnızca neyin indirileceğini listele
    python3 tools/fetch_photos.py --width 1280

Çıktı: assets/photos/<anahtar>.<uzantı>, js/photos-local.js, assets/photos/CREDITS.txt (yazar ve lisans listesi).
Kural: indirilen her dosyanın yazar/lisans bilgisi CREDITS.txt'e ve uygulamadaki fotoğraf altına yazılır; bilgi eksikse
önce js/photos.js'i Commons sayfasından okuyarak düzelt (bkz. KURALLAR.md > Fotoğraflar).
"""
import argparse
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
UA = "AtlasGeoGuessrStudy/1.0 (kisisel calisma uygulamasi; Wikimedia Commons fotograf onbellegi)"


def read_photos():
    """js/photos.js içindeki add('anahtar', 'Dosya adı', 'yazar', 'lisans', 'açıklama') çağrılarını ve
    doğrudan PHOTOS[...] = {f:'...'} tanımlarını okur."""
    src = (ROOT / "js" / "photos.js").read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r"add\(\s*'([^']+)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,\s*(null|'(?:[^'\\]|\\.)*')\s*,\s*(null|'(?:[^'\\]|\\.)*')\s*,\s*'((?:[^'\\]|\\.)*)'\s*\)", src):
        key, f, by, lic, cap = m.groups()
        out[key] = {
            "f": f.replace("\\'", "'"),
            "by": None if by == "null" else by.strip("'"),
            "lic": None if lic == "null" else lic.strip("'"),
            "cap": cap.replace("\\'", "'"),
        }
    for m in re.finditer(r"P\[\s*'([^']+)'\s*\]\s*=\s*\{\s*f\s*:\s*'((?:[^'\\]|\\.)*)'", src):
        out.setdefault(m.group(1), {"f": m.group(2).replace("\\'", "'"), "by": None, "lic": None, "cap": ""})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--width", type=int, default=1280)
    args = ap.parse_args()

    photos = read_photos()
    if not photos:
        print("js/photos.js içinde fotoğraf bulunamadı.", file=sys.stderr)
        return 1
    dest = ROOT / "assets" / "photos"
    local, credits = {}, []
    for key, p in sorted(photos.items()):
        url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(p["f"].replace(" ", "_")) + "?width=%d" % args.width
        ext = pathlib.Path(p["f"]).suffix.lower() or ".jpg"
        if ext in (".svg", ".png", ".gif"):
            ext = ".png" if ext == ".svg" else ext
        target = dest / (key + ext)
        print(("[dry] " if args.dry_run else "") + key, "←", p["f"])
        credits.append("%s — %s — %s — %s" % (key, p["f"], p["by"] or "yazar: kaynak sayfasına bak", p["lic"] or "lisans: kaynak sayfasına bak"))
        if args.dry_run:
            continue
        dest.mkdir(parents=True, exist_ok=True)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                target.write_bytes(r.read())
            local[key] = "assets/photos/" + target.name
            time.sleep(0.5)  # Commons'a nazik ol
        except Exception as e:  # noqa: BLE001
            print("  İNDİRİLEMEDİ:", e, file=sys.stderr)
    if args.dry_run:
        return 0
    (ROOT / "js" / "photos-local.js").write_text(
        "/* photos-local.js — tools/fetch_photos.py yazdı. Listede olan fotoğraf yerelden, olmayan Commons'tan yüklenir. */\n"
        "window.PHOTO_LOCAL = window.PHOTO_LOCAL || {};\n"
        "Object.assign(window.PHOTO_LOCAL, " + json.dumps(local, ensure_ascii=False, indent=1) + ");\n",
        encoding="utf-8")
    (dest / "CREDITS.txt").write_text("\n".join(credits) + "\n", encoding="utf-8")
    print("Bitti: %d fotoğraf yerelleştirildi." % len(local))
    return 0


if __name__ == "__main__":
    sys.exit(main())

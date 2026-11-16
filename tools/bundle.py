#!/usr/bin/env python3
"""Việt Atlas paketleyici.

index.html + css/style.css + js/*.js dosyalarını tek bir dosyaya gömer.

  dist/vietnam-atlas.html   Tek dosyalık sürüm. Çift tıkla aç; sunucu gerekmez.
  dist/artifact.html        Yalnızca gövde içeriği (Claude Artifact yayını için).

Kullanım:  python3 tools/bundle.py
"""
import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def inline_js(src: str) -> str:
    # </script> dizisi satır içi betiği erken bitirmesin
    return src.replace("</script", "<\\/script")


def main() -> int:
    html = read(ROOT / "index.html")
    css = read(ROOT / "css" / "style.css")

    scripts = re.findall(r'<script src="(js/[^"]+)"></script>', html)
    if not scripts:
        print("index.html içinde betik bulunamadı", file=sys.stderr)
        return 1
    js_parts = []
    for rel in scripts:
        code = read(ROOT / rel).rstrip()
        js_parts.append(f"/* ===== {rel} ===== */\n{inline_js(code)}\n")
    js = "\n".join(js_parts)

    title = re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()
    desc = re.search(r'<meta name="description" content="([^"]*)"', html).group(1)

    DIST.mkdir(exist_ok=True)

    # --- 1) tek dosyalık tam sayfa ---
    single = f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<style>
{css}
</style>
</head>
<body>
<div class="app" id="app"></div>
<noscript><p style="padding:24px;font:16px system-ui">{title} çalışmak için JavaScript gerektirir.</p></noscript>
<script>
{js}
</script>
</body>
</html>
"""
    (DIST / "vietnam-atlas.html").write_text(single, encoding="utf-8")

    # --- 2) artifact: gövde içeriği (doctype/html/head/body yok) ---
    art = f"""<title>{title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
{css}
</style>
<div class="app" id="app"></div>
<script>
{js}
</script>
"""
    (DIST / "artifact.html").write_text(art, encoding="utf-8")

    for n in ("vietnam-atlas.html", "artifact.html"):
        sz = (DIST / n).stat().st_size
        print(f"{n}: {sz / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())

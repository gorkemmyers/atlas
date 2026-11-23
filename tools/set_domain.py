#!/usr/bin/env python3
"""Alan adı ve Google AdSense kimliğini tek komutla tüm siteye işler.

Örnekler:
  1) Özel alan adını bağladığında (AdSense başvurusu öncesi):
     python3 tools/set_domain.py --domain https://vietatlas.com

  2) AdSense hesabı açıp yayıncı kimliği aldığında (doğrulama aşaması):
     python3 tools/set_domain.py --domain https://vietatlas.com --adsense ca-pub-1234567890123456

  3) AdSense onaylanınca reklam yuvalarını açmak için:
     python3 tools/set_domain.py --domain https://vietatlas.com --adsense ca-pub-1234567890123456 \\
       --enable-ads --auto-ads --slot-hub 1111111111 --slot-overview 2222222222 --slot-guide 3333333333
"""
from __future__ import annotations

import argparse
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CFG_PATH = ROOT / "js" / "site-config.js"


def replace_prop(src: str, key: str, value_js: str) -> str:
    pat = re.compile(rf"(\b{re.escape(key)}\s*:\s*)([^,\n]+)")
    if not pat.search(src):
        raise RuntimeError(f"site-config.js içinde '{key}' bulunamadı")
    return pat.sub(lambda m: m.group(1) + value_js, src, count=1)


def main() -> int:
    ap = argparse.ArgumentParser(description="Atlas alan adı ve Google AdSense ayarlayıcı")
    ap.add_argument("--domain", help="Özel alan adı (ör. https://vietatlas.com)")
    ap.add_argument("--adsense", help="Google AdSense yayıncı kimliği (ör. ca-pub-1234567890123456)")
    ap.add_argument("--enable-ads", action="store_true", help="AdSense onaylandıktan sonra reklam yuvalarını etkinleştir")
    ap.add_argument("--disable-ads", action="store_true", help="Reklam yuvalarını kapat")
    ap.add_argument("--auto-ads", action="store_true", help="Google Otomatik Reklamlar (Auto Ads) açık")
    ap.add_argument("--slot-hub", help="Ana sayfa reklam birimi slot ID")
    ap.add_argument("--slot-overview", help="Ülke Genel bakış reklam birimi slot ID")
    ap.add_argument("--slot-guide", help="Ülke rehber sayfası reklam birimi slot ID")
    args = ap.parse_args()

    src = CFG_PATH.read_text(encoding="utf-8")

    if args.domain:
        dom = args.domain.strip().rstrip("/")
        if not dom.startswith("https://") and not dom.startswith("http://"):
            dom = "https://" + dom
        src = replace_prop(src, "siteUrl", f"'{dom}'")
        src = replace_prop(src, "customDomainReady", "true")

    if args.adsense is not None:
        cid = args.adsense.strip()
        if cid and not cid.startswith("ca-pub-"):
            if cid.startswith("pub-"):
                cid = "ca-" + cid
            else:
                print("HATA: --adsense değeri 'ca-pub-...' biçiminde olmalı.", file=sys.stderr)
                return 1
        src = replace_prop(src, "client", f"'{cid}'")

    if args.enable_ads:
        src = replace_prop(src, "enabled", "true")
    elif args.disable_ads:
        src = replace_prop(src, "enabled", "false")

    if args.auto_ads:
        src = replace_prop(src, "autoAds", "true")

    if args.slot_hub is not None:
        src = replace_prop(src, "hubMid", f"'{args.slot_hub.strip()}'")
    if args.slot_overview is not None:
        src = replace_prop(src, "overviewEnd", f"'{args.slot_overview.strip()}'")
    if args.slot_guide is not None:
        src = replace_prop(src, "guideEnd", f"'{args.slot_guide.strip()}'")

    CFG_PATH.write_text(src, encoding="utf-8")
    print("Güncellendi: js/site-config.js")

    subprocess.run([sys.executable, str(ROOT / "tools" / "generate_seo_pages.py")], check=True)
    subprocess.run([sys.executable, str(ROOT / "tools" / "bundle.py")], check=True)
    print("Tamamlandı. Şimdi 'git add . && git commit && git push' ile canlıya alabilirsin.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

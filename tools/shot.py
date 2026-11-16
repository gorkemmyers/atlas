#!/usr/bin/env python3
"""Uygulamanın ekran görüntüsünü alır (masaüstü ya da telefon boyutunda), Commons isteklerini yer tutucuyla yanıtlar.
Kullanım:  python3 tools/shot.py GxY cikti.png "#adres" ["js ifadesi"]
  ör.      python3 tools/shot.py 390x844 /tmp/mx.png "#mexico-yerel"           (telefon, Meksika › Bölgesel görünüm)
           python3 tools/shot.py 1280x800 /tmp/tr.png "#turkiye-alan"           (masaüstü)
           python3 tools/shot.py 390x1800 /tmp/tall.png "#brazil-yerel"          (yüksek pencere: panelin tamamı tek karede)
Üçüncü argüman sayfa adresidir (hash). İsteğe bağlı dördüncü argüman sayfada çalıştırılır (ör. bir karta tıklamak) ve sonucu yazdırılır.
Çıktı: sayfa hataları listesi (boş olmalı). Görüntüyü GÖZLE oku: taşma, kesik yazı, boş kart, kırık harf, kırık görsel (§11).
Fotoğraflar (Commons) ağ yoksa yüklenemez; bu betik onları gri yer tutucuyla değiştirir ki yalnızca DÜZENİ görebilesin.
Playwright ve Chrome/Chromium ister (CHROME_PATH ile yol verilebilir)."""
import json, os, re, sys
from urllib.parse import unquote
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if len(sys.argv) < 4:
    sys.exit(__doc__)
w, h = (int(x) for x in sys.argv[1].lower().split('x'))
out, hash_ = sys.argv[2], sys.argv[3]
js = sys.argv[4] if len(sys.argv) > 4 else ''
exe = os.environ.get('CHROME_PATH') or next((x for x in ('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser') if os.path.exists(x)), None)

def placeholder(route):
    m = re.search(r'Special:FilePath/(.+?)\?width=(\d+)', unquote(route.request.url))
    if not m: return route.abort()
    name = m.group(1).replace('&', '&amp;').replace('<', '&lt;')[:48]
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#cdd9e5"/>'
           '<path d="M0 0L800 600M800 0L0 600" stroke="#8a8a8a" stroke-width="3"/><rect x="3" y="3" width="794" height="594" fill="none" stroke="#c81e1e" stroke-width="6"/>'
           '<text x="400" y="300" font-size="26" text-anchor="middle" font-family="sans-serif">' + name + '</text></svg>')
    route.fulfill(body=svg, content_type='image/svg+xml')

with sync_playwright() as p:
    kw = {'args': ['--no-sandbox', '--allow-file-access-from-files']}
    if exe: kw['executable_path'] = exe
    b = p.chromium.launch(**kw)
    pg = b.new_page(viewport={'width': w, 'height': h})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
    pg.route('**/commons.wikimedia.org/**', placeholder)
    pg.goto('file://' + os.path.join(ROOT, 'index.html')); pg.wait_for_timeout(1200)
    pg.evaluate('h => { location.hash = h }', hash_); pg.wait_for_timeout(1800)
    if js:
        res = pg.evaluate(js); pg.wait_for_timeout(1200)
        if res is not None: print('js ->', json.dumps(res, ensure_ascii=False)[:600])
    pg.screenshot(path=out)
    print(json.dumps({'errs': errs}, ensure_ascii=False))
    b.close()

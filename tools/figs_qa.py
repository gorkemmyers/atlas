#!/usr/bin/env python3
"""Çizim (figür) kontrol sayfası: js/figures.js + js/figs-*.js yüklenir, anahtarı verilen önekle başlayan tüm çizimler bir ızgarada çizilir.
Kullanım:  python3 tools/figs_qa.py cikti.png [sütun=3] [önek[,önek…]=hepsi] [ölçek=1.0]
  ör.      python3 tools/figs_qa.py /tmp/mx.png 2 mx-            (Meksika çizimleri, 2 sütun)
           python3 tools/figs_qa.py /tmp/hepsi.png 4 jp-,kr-,vn- 0.8
Çıktı: kaç çizim çizildi, sayfa hatası, kırık görsel sayısı (ikisi de 0 olmalı) + ekran görüntüsü. Görüntüyü GÖZLE oku (taşan yazı, üst üste binen çizgi, kesik rozet).
Playwright ve Chrome/Chromium ister (CHROME_PATH ile yol verilebilir). Kurallar: KURALLAR.md §9b."""
import json, os, sys
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
JS = os.path.join(ROOT, 'js') + os.sep
if len(sys.argv) < 2:
    sys.exit(__doc__)
out = sys.argv[1]
cols = int(sys.argv[2]) if len(sys.argv) > 2 else 3
pref = sys.argv[3].split(',') if len(sys.argv) > 3 else ['']
scale = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
files = ['figures.js'] + sorted(f for f in os.listdir(JS) if f.startswith('figs-') and f.endswith('.js'))
tags = ''.join('<script src="file://%s%s"></script>' % (JS, f) for f in files)
html = '''<!doctype html><meta charset="utf-8"><body style="margin:0;background:#cfd4da"><div id="g" style="display:grid;grid-template-columns:repeat(%d,auto);gap:10px;padding:10px;justify-content:start"></div>%s
<script>
var pref = %s;
var keys = Object.keys(PHOTOS).filter(function (k) { return PHOTOS[k].svg && pref.some(function (p) { return k.indexOf(p) === 0; }); });
var g = document.getElementById('g');
keys.forEach(function (k) {
  var p = PHOTOS[k], d = document.createElement('div'); d.style.cssText = 'background:#fff;padding:4px;font:12px sans-serif';
  var im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(p.svg); im.style.width = (p.d[0] * %s) + 'px'; im.style.display = 'block';
  d.appendChild(im); var t = document.createElement('div'); t.textContent = k + ' — ' + p.cap; d.appendChild(t); g.appendChild(d);
});
window.__n = keys.length;
</script>''' % (cols, tags, json.dumps(pref), scale)
tmp = os.path.join(os.environ.get('TMPDIR', '/tmp'), 'atlas_figs_qa.html')
open(tmp, 'w', encoding='utf-8').write(html)
exe = os.environ.get('CHROME_PATH') or next((x for x in ('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser') if os.path.exists(x)), None)
with sync_playwright() as p:
    kw = {'args': ['--no-sandbox', '--allow-file-access-from-files']}
    if exe: kw['executable_path'] = exe
    b = p.chromium.launch(**kw)
    pg = b.new_page(viewport={'width': int(cols * 490 * scale + 40), 'height': 800})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
    pg.on('console', lambda m: errs.append(m.text[:200]) if m.type == 'error' else None)
    pg.goto('file://' + tmp); pg.wait_for_timeout(900)
    print('n =', pg.evaluate('window.__n'), 'errs:', errs)
    print('broken images:', pg.evaluate("Array.from(document.images).filter(i=>!i.naturalWidth).length"))
    pg.screenshot(path=out, full_page=True)
    b.close()

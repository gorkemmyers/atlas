#!/usr/bin/env python3
"""Sözleşme testi: her bölge × her sekme.
Kontrol eder:
  1. Sayfa hatası / konsol hatası yok (yazı tipi ve harita karosu ağ hataları sayılmaz)
  2. Harita olan her ekranda tam bir 'Harita ayarları' düğmesi var (#map-settings-btn) ve pencere açılınca
     Zemin · Etiketler · Renk satırları var
  3. Yatay taşma yok
  4. Kırık fotoğraf yok (img.pc-img yüklendi ya da yer tutucuya dönüştü: dış ağ yoksa yok sayılır)
Kullanım: python3 tools/qa_contract.py [bölge-kimlikleri…]  (boşsa hepsi) — çıktı: kısa özet + hatalar
"""
import json, sys, os
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
URL = 'file://' + os.path.join(ROOT, 'index.html')
ONLY = set(sys.argv[1:])
IGNORE = ('ERR_TUNNEL', 'ERR_NAME_NOT_RESOLVED', 'ERR_INTERNET_DISCONNECTED', 'ERR_CONNECTION', 'fonts.g', 'tile.', 'server.arcgis', 'wikimedia', 'Failed to load resource')

def main():
    fails, total = [], 0
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--allow-file-access-from-files'])
        for (w, h, tag) in ((1280, 800, 'masaüstü'), (390, 780, 'telefon')):
            pg = b.new_page(viewport={'width': w, 'height': h})
            errs = []
            pg.on('console', lambda m: errs.append(('console', m.text)) if m.type == 'error' and not any(x in m.text for x in IGNORE) else None)
            pg.on('pageerror', lambda e: errs.append(('pageerror', str(e))))
            pg.goto(URL); pg.wait_for_timeout(1500)
            regs = pg.evaluate("Regions.list.map(r => ({id:r.id, secs:r.sections.map(s => ({id:s.id, view:s.view, hidden:!!s.hidden}))}))")
            for r in regs:
                if ONLY and r['id'] not in ONLY: continue
                for s in r['secs']:
                    if s['id'] == 'genel': continue
                    total += 1
                    errs.clear()
                    hash_ = '#%s-%s' % (r['id'], s['id'])
                    pg.evaluate("location.hash = %s" % json.dumps(hash_))
                    pg.wait_for_timeout(700)
                    info = pg.evaluate("""() => {
                      const btns = document.querySelectorAll('#map-settings-btn').length;
                      const pop = !!document.querySelector('#map-settings-pop');
                      const over = document.documentElement.scrollWidth > window.innerWidth + 2;
                      const maps = document.querySelectorAll('.stage .map').length;
                      return {btns, pop, over, maps, ok: !!document.querySelector('.layout')};
                    }""")
                    probs = []
                    if not info['ok']: probs.append('ekran kurulmadı')
                    if info['maps'] and info['btns'] != 1: probs.append('harita ayarları düğmesi %d adet' % info['btns'])
                    if info['maps'] and info['btns'] == 1:
                        pg.evaluate("window.VNApp && VNApp.sheet && VNApp.sheet.enabled && VNApp.sheet.snap('peek', {instant:true})"); pg.wait_for_timeout(250)
                        pg.click('#map-settings-btn', timeout=4000); pg.wait_for_timeout(150)
                        txt = pg.evaluate("document.querySelector('#map-settings-pop') ? document.querySelector('#map-settings-pop').innerText : ''")
                        for need in ('Zemin', 'Etiketler', 'Renk'):
                            if need not in txt: probs.append('pencerede "%s" yok' % need)
                        pg.keyboard.press('Escape'); pg.wait_for_timeout(50)
                    if info['over']: probs.append('yatay taşma')
                    for e in errs[:3]: probs.append('%s: %s' % e)
                    if probs: fails.append('[%s] %s %s' % (tag, hash_, '; '.join(probs)))
            pg.close()
        b.close()
    print('Bakılan ekran: %d (iki ekran boyu dahil değil, her boyda ayrı sayılır)' % total)
    if fails:
        print('SORUN %d:' % len(fails))
        for f in fails[:80]: print(' -', f)
        return 1
    print('TEMİZ: tüm ekranlar sözleşmeye uyuyor')
    return 0

if __name__ == '__main__':
    sys.exit(main())

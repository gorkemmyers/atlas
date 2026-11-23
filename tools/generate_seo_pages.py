#!/usr/bin/env python3
"""Atlas statik SEO, okuma rehberi, yasal sayfa ve yayın dosyası üreticisi.

Neden:
  Atlas tarayıcıda çalışan bir SPA'dır (#vietnam, #turkiye-alan…). Arama motorları ve
  Google AdSense inceleme botu hash URL'lerini ayrı sayfa olarak indekslemez. Bu betik,
  doğrudan uygulamanın gerçek veri dosyalarından (js/data.js, js/names.js, js/scripts-data.js,
  js/packs/*.js, js/photos.js, js/site-config.js) taranabilir statik HTML sayfaları,
  yasal sayfalar, sitemap.xml, robots.txt, ads.txt ve _headers üretir; index.html içine
  botlar için anında okunabilir statik içerik ve yapısal veri (JSON-LD) yazar.

Kullanım:
  python3 tools/generate_seo_pages.py
"""
from __future__ import annotations

import datetime
import html
import json
import pathlib
import re
import shutil
import subprocess
import sys
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
JSC_PATH = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"

LIC_URLS = {
    "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
    "Public domain": "https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain",
    "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
    "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
    "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
    "CC BY 3.0 br": "https://creativecommons.org/licenses/by/3.0/br/",
    "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
    "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
    "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
    "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
    "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
}

PHOTO_GROUP_NAMES = {
    "br": "Brezilya",
    "kr": "Güney Kore",
    "mx": "Meksika",
    "tr": "Türkiye",
    "jp": "Japonya",
    "ru": "Rusya",
    "id": "Endonezya",
    "vn": "Vietnam",
    "in": "Güney Asya",
    "as": "Güney Asya",
}

GUIDE_ORDER = [
    ("vietnam", "Vietnam", "VN", "blue", "Asya", "rehber/vietnam.html"),
    ("guneyasya", "Güney Asya", "GA", "green", "Asya", "rehber/guney-asya.html"),
    ("turkiye", "Türkiye", "TR", "red", "Avrupa ve Avrasya", "rehber/turkiye.html"),
    ("russia", "Rusya", "RU", "indigo", "Avrupa ve Avrasya", "rehber/rusya.html"),
    ("japan", "Japonya", "JP", "amber", "Asya", "rehber/japonya.html"),
    ("indonesia", "Endonezya", "ID", "teal", "Asya", "rehber/endonezya.html"),
    ("brazil", "Brezilya", "BR", "green", "Güney Amerika", "rehber/brezilya.html"),
    ("mexico", "Meksika", "MX", "violet", "Kuzey Amerika", "rehber/meksika.html"),
    ("guneykore", "Güney Kore", "KR", "blue", "Asya", "rehber/guney-kore.html"),
]


def esc(s: object) -> str:
    return html.escape("" if s is None else str(s), quote=True)


def commons_page(filename: str) -> str:
    return "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(
        str(filename).replace(" ", "_"), safe="/"
    )


def extract_app_data() -> dict:
    """JavaScriptCore (veya Node) ile proje veri dosyalarını çalıştırıp JSON olarak çeker."""
    pack_files = sorted((ROOT / "js" / "packs").glob("*.js"))
    fig_files = sorted((ROOT / "js").glob("figs-*.js"))
    files = [
        "js/site-config.js",
        "js/data.js",
        "js/names.js",
        "js/scripts-data.js",
        "js/photos.js",
        "js/figures.js",
    ] + [str(p.relative_to(ROOT)) for p in fig_files] + [
        str(p.relative_to(ROOT)) for p in pack_files
    ]

    node_bin = shutil.which("node")
    if pathlib.Path(JSC_PATH).exists():
        js_runner = f"""
var window = globalThis;
var capturedPacks = [];
window.registerCountryPack = function(p) {{ capturedPacks.push(p); }};
var files = {json.dumps(files)};
for (var i = 0; i < files.length; i++) {{
  var src = readFile({json.dumps(str(ROOT))} + '/' + files[i]);
  (0, eval)(src);
}}
var photos = {{}};
var figsCount = 0;
Object.keys(window.PHOTOS || {{}}).forEach(function(k) {{
  var p = window.PHOTOS[k];
  if (!p || p.v === 'bekliyor') return;
  if (p.svg) {{ figsCount++; return; }}
  photos[k] = {{
    f: p.f, by: p.by, lic: p.lic, cap: p.cap,
    mod: !!(p.crop || (p.marks && p.marks.length))
  }};
}});
var out = {{
  config: window.ATLAS_CONFIG || {{}},
  vn: {{
    regions: window.VN_DATA.regions,
    provinces: window.VN_DATA.provinces.map(function(p) {{
      return {{ id: p.id, vi: p.vi, region: p.region, cap: p.cap, area: p.area, cue: p.cue }};
    }}),
    families: window.VN_DATA.families,
    tips: window.VN_DATA.tips,
    rules: window.Names.RULES,
    fams: window.Names.FAMS
  }},
  asia: {{
    fams: window.AS_DATA.FAMS,
    scripts: window.AS_DATA.SCRIPTS,
    places: window.AS_DATA.PLACES,
    zones: window.AS_DATA.ZONES,
    pairs: window.AS_DATA.PAIRS,
    tips: window.AS_DATA.TIPS
  }},
  packs: capturedPacks.map(function(pk) {{
    return {{
      id: pk.id, name: pk.name, code: pk.code, area: pk.area, tone: pk.tone || 'blue',
      line: pk.line, blurb: pk.blurb, note: pk.note || null,
      unitLabel: pk.unitLabel, codeLabel: pk.codeLabel,
      regions: pk.regions || [],
      units: (pk.units || []).map(function(u) {{
        return {{ id: u.id, name: u.name, cap: u.cap, reg: u.reg, codes: u.codes || [], local: u.local || '', cue: u.cue || '' }};
      }}),
      topics: (pk.topics || []).map(function(t) {{
        return {{
          key: t.key, navLabel: t.navLabel, title: t.title, lead: t.lead, desc: t.desc,
          flows: t.flows || [],
          bandsTitle: t.bandsTitle || '',
          bands: t.bands || [],
          rulesTitle: t.rulesTitle || '',
          rules: t.rules || [],
          decoder: t.decoder ? {{
            title: t.decoder.title || '',
            entries: (t.decoder.entries || []).map(function(e) {{
              return {{ key: e.key, label: e.label, sub: e.sub || '' }};
            }})
          }} : null
        }};
      }})
    }};
  }}),
  photos: photos,
  figsCount: figsCount
}};
print(JSON.stringify(out));
"""
        proc = subprocess.run([JSC_PATH, "-e", js_runner], capture_output=True, text=True, check=True)
        return json.loads(proc.stdout)
    elif node_bin:
        js_runner = f"""
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = {json.dumps(str(ROOT))};
const sb = {{ console }}; sb.window = sb; sb.globalThis = sb;
const capturedPacks = [];
sb.registerCountryPack = (p) => capturedPacks.push(p);
vm.createContext(sb);
for (const rel of {json.dumps(files)}) {{
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), sb, {{ filename: rel }});
}}
const photos = {{}}; let figsCount = 0;
for (const [k, p] of Object.entries(sb.PHOTOS || {{}})) {{
  if (!p || p.v === 'bekliyor') continue;
  if (p.svg) {{ figsCount++; continue; }}
  photos[k] = {{ f: p.f, by: p.by, lic: p.lic, cap: p.cap, mod: !!(p.crop || (p.marks && p.marks.length)) }};
}}
console.log(JSON.stringify({{
  config: sb.ATLAS_CONFIG || {{}},
  vn: {{ regions: sb.VN_DATA.regions, provinces: sb.VN_DATA.provinces.map(p => ({{ id:p.id, vi:p.vi, region:p.region, cap:p.cap, area:p.area, cue:p.cue }})), families: sb.VN_DATA.families, tips: sb.VN_DATA.tips, rules: sb.Names.RULES, fams: sb.Names.FAMS }},
  asia: {{ fams: sb.AS_DATA.FAMS, scripts: sb.AS_DATA.SCRIPTS, places: sb.AS_DATA.PLACES, zones: sb.AS_DATA.ZONES, pairs: sb.AS_DATA.PAIRS, tips: sb.AS_DATA.TIPS }},
  packs: capturedPacks,
  photos, figsCount
}}));
"""
        proc = subprocess.run([node_bin, "-e", js_runner], capture_output=True, text=True, check=True)
        return json.loads(proc.stdout)
    else:
        raise RuntimeError("Neither macOS jsc nor node was found.")


def adsense_head_snippet(cfg: dict) -> str:
    ads = cfg.get("ads") or {}
    client = (ads.get("client") or "").strip()
    if not client:
        return ""
    return (
        f'<meta name="google-adsense-account" content="{esc(client)}">\n'
        f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={urllib.parse.quote(client)}" crossorigin="anonymous"></script>'
    )


def static_ad_slot(cfg: dict, slot_key: str) -> str:
    ads = cfg.get("ads") or {}
    client = (ads.get("client") or "").strip()
    slot_id = ((ads.get("slots") or {}).get(slot_key) or "").strip()
    if not ads.get("enabled") or not client or not slot_id:
        return ""
    return f"""<aside class="ad-slot" aria-label="Reklam">
  <span class="ad-lbl" aria-hidden="true">Reklam</span>
  <ins class="adsbygoogle" style="display:block" data-ad-client="{esc(client)}" data-ad-slot="{esc(slot_id)}" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
</aside>"""


def page_shell(
    cfg: dict,
    *,
    rel_path: str,
    title: str,
    description: str,
    body_html: str,
    active_nav: str = "",
    schema_json: dict | None = None,
    noindex: bool = False,
) -> str:
    depth = rel_path.count("/")
    prefix = "../" * depth
    base_url = (cfg.get("siteUrl") or "").rstrip("/")
    canonical = f"{base_url}/{rel_path}" if base_url else ""
    og_img = f"{base_url}/og-image.svg" if base_url else f"{prefix}og-image.svg"
    disclaimer = cfg.get(
        "disclaimer",
        "Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile bağlantısı yoktur.",
    )
    ad_head = adsense_head_snippet(cfg)
    robots_meta = '<meta name="robots" content="noindex, follow">' if noindex else ""
    canon_tag = f'<link rel="canonical" href="{esc(canonical)}">' if canonical and not noindex else ""
    og_url_tag = f'<meta property="og:url" content="{esc(canonical)}">' if canonical and not noindex else ""
    ld_tag = (
        f'<script type="application/ld+json">{json.dumps(schema_json, ensure_ascii=False)}</script>'
        if schema_json
        else ""
    )

    def nav_cur(name: str) -> str:
        return ' aria-current="page"' if active_nav == name else ""

    return f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
{robots_meta}
{canon_tag}
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="article">
<meta property="og:site_name" content="{esc(cfg.get('siteName', 'Atlas'))}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:locale" content="tr_TR">
{og_url_tag}
<meta property="og:image" content="{esc(og_img)}">
<meta name="twitter:card" content="summary_large_image">
{ad_head}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Barlow+Condensed:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="icon" href="{prefix}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="{prefix}css/pages.css">
{ld_tag}
</head>
<body>
<header class="topbar">
  <div class="topbar-in">
    <a class="brand" href="{prefix}index.html" aria-label="Atlas — ana sayfa">
      <svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" class="mark-ring"/><circle cx="16" cy="16" r="6.5" class="mark-dot"/></svg>
      <span><b>Atlas</b><small>GeoGuessr rehberi</small></span>
    </a>
    <nav class="topnav" aria-label="Üst menü">
      <a href="{prefix}hakkimizda.html"{nav_cur('about')}>Hakkımızda</a>
      <a href="{prefix}kaynaklar.html"{nav_cur('sources')}>Kaynaklar</a>
      <a href="{prefix}gizlilik.html"{nav_cur('privacy')}>Gizlilik</a>
      <a href="{prefix}iletisim.html"{nav_cur('contact')}>İletişim</a>
      <a class="cta" href="{prefix}index.html#ana">Uygulamayı aç →</a>
    </nav>
  </div>
</header>
<main class="wrap">
{body_html}
</main>
<footer class="site-foot">
  <div class="foot-in">
    <nav class="foot-links" aria-label="Yasal sayfalar">
      <a href="{prefix}index.html">Ana sayfa</a>
      <a href="{prefix}hakkimizda.html">Hakkımızda</a>
      <a href="{prefix}gizlilik.html">Gizlilik ve Çerezler</a>
      <a href="{prefix}kullanim-kosullari.html">Kullanım Koşulları</a>
      <a href="{prefix}kaynaklar.html">Kaynaklar ve Atıf</a>
      <a href="{prefix}iletisim.html">İletişim</a>
    </nav>
    <p>{esc(disclaimer)}</p>
    <p>Fotoğraflar Wikimedia Commons’tan serbest lisanslarıyla, yol çizgileri © OpenStreetMap katkıcılarından (ODbL) alınmıştır.</p>
  </div>
</footer>
</body>
</html>
"""


def other_guides_nav(current_id: str, prefix: str) -> str:
    links = []
    for rid, name, code, _tone, _area, slug in GUIDE_ORDER:
        if rid == current_id:
            continue
        links.append(f'<a href="{prefix}{slug}">{esc(name)} ({esc(code)})</a>')
    return (
        '<section class="sec">'
        '<h2>Diğer ülke rehberleri</h2>'
        '<p>Atlas’taki diğer bölge tahmin rehberlerini incele veya etkileşimli haritada pratik yap:</p>'
        f'<nav class="guide-links" aria-label="Diğer ülke rehberleri">{"".join(links)}</nav>'
        '</section>'
    )


def build_legal_pages(data: dict) -> list[tuple[str, str]]:
    cfg = data["config"]
    mail = cfg.get("contactEmail", "gorkemugurguler@gmail.com")
    updated = cfg.get("lastUpdated", "23 Kasım 2026")
    disclaimer = cfg.get(
        "disclaimer",
        "Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile bağlantısı yoktur.",
    )
    pages = []

    # 1. Hakkımızda
    guide_list = "".join(
        f'<li><a href="{slug}"><strong>{esc(name)}</strong></a> — etkileşimli harita ve bölge tahmin rehberi</li>'
        for _rid, name, _code, _tone, _area, slug in GUIDE_ORDER
    )
    about_body = f"""
<nav class="crumb" aria-label="Konum"><a href="index.html">Ana sayfa</a><span>/</span><span>Hakkımızda</span></nav>
<header class="hero">
  <h1>Hakkımızda</h1>
  <p class="lead">Atlas, GeoGuessr oyuncularının bölge, il ve eyalet tahminini hızlandırmak için hazırlanmış ücretsiz ve bağımsız bir Türkçe çalışma rehberidir.</p>
  <p class="meta">Son güncelleme: {esc(updated)}</p>
</header>
<section class="sec">
  <h2>Neden Atlas?</h2>
  <p>Çoğu coğrafya rehberi ülke başına onlarca dağınık bilgi yığar. Atlas farklı bir yaklaşım izler: <strong>az ve keskin</strong>. Her ülke için yalnızca Street View ekranında gerçekten görünen ve bölgeyi belirgin biçimde daraltan 1–3 ana konuya odaklanırız. Plakalar Street View’da bulanık olduğu için özellikle dışarıda bırakılır.</p>
  <p>Her bölge; etkileşimli vektör harita, çözücü (alan kodu, yol numarası veya yerel harf), doğrulanmış görsel kartlar, aralıklı tekrar (Leitner kutuları) ve haritada iğne bırakma simülasyonu ile çalışılır.</p>
</section>
<section class="sec">
  <h2>Kapsanan 9 bölge</h2>
  <ul>{guide_list}</ul>
</section>
<section class="sec">
  <h2>Doğruluk ve kaynak ilkelerimiz</h2>
  <ul>
    <li><strong>Doğrulanmış bilgi:</strong> Telefon alan kodları, yol numaraları ve idari sınırlar resmî telekom/bakanlık listeleri ve güncel kaynaklarla doğrulanır. İdari değişiklikler (ör. Vietnam’ın 1 Temmuz 2025 il birleşmesi) tarih belirtilerek açıklanır.</li>
    <li><strong>Gerçek fotoğraf ve etiketli çizim ayrımı:</strong> Gerçek tabela ve manzara fotoğrafları yalnızca serbest lisanslı Wikimedia Commons kayıtlarından yazar ve lisans bilgisiyle alınır. Şematik çizimler açıkça "özgün şematik çizim" olarak etiketlenir.</li>
    <li><strong>Hesapsız ve gizlilik dostu:</strong> Üyelik gerekmez; çalışma ilerlemesi yalnızca kullanıcının kendi tarayıcısında saklanır.</li>
  </ul>
</section>
<section class="sec">
  <h2>Bağımsızlık bildirimi</h2>
  <p>{esc(disclaimer)}</p>
  <p>Öneri, düzeltme veya telif bildirimleri için <a href="iletisim.html">İletişim</a> sayfasından veya doğrudan <a href="mailto:{esc(mail)}">{esc(mail)}</a> adresinden ulaşabilirsin.</p>
</section>
"""
    pages.append(("hakkimizda.html", page_shell(
        cfg, rel_path="hakkimizda.html",
        title="Hakkımızda — Atlas GeoGuessr Çalışma Rehberi",
        description="Atlas hakkında: GeoGuessr için Türkçe bölge tahmin rehberinin kapsamı, doğruluk ilkeleri ve bağımsızlık bildirimi.",
        body_html=about_body, active_nav="about",
    )))

    # 2. Gizlilik ve Çerez Politikası
    privacy_body = f"""
<nav class="crumb" aria-label="Konum"><a href="index.html">Ana sayfa</a><span>/</span><span>Gizlilik ve Çerez Politikası</span></nav>
<header class="hero">
  <h1>Gizlilik ve Çerez Politikası</h1>
  <p class="lead">Atlas’ı kullanırken hangi verilerin cihazında kaldığını, reklam çerezlerinin nasıl çalıştığını ve 6698 sayılı KVKK ile GDPR kapsamındaki haklarını burada açıkça paylaşıyoruz.</p>
  <p class="meta">Son güncelleme: {esc(updated)}</p>
</header>
<section class="sec">
  <h2>1. Veri sorumlusu ve iletişim</h2>
  <p>Bu internet sitesi <strong>Atlas</strong> tarafından işletilmektedir. Gizlilik, çerezler veya kişisel verilerle ilgili her türlü talep için <a href="mailto:{esc(mail)}">{esc(mail)}</a> adresine yazabilirsin.</p>
</section>
<section class="sec">
  <h2>2. Çalışma ilerlemesi ve yerel depolama (localStorage)</h2>
  <p>Atlas’ı kullanmak için hesap açman veya kişisel bilgi paylaşman gerekmez. Aralıklı tekrar (Leitner) kutuların, doğruluk istatistiklerin, simülasyon skorların ve açık/koyu tema seçimin yalnızca kendi tarayıcındaki yerel depolamada (<code>localStorage · vietatlas.v1</code>) saklanır.</p>
  <p>Bu veriler sunucularımıza gönderilmez. İstediğin zaman <a href="index.html#ana">Ana sayfa → Veri ve yedek</a> bölümünden yedeğini dışa aktarabilir ya da tek tıkla silebilirsin.</p>
</section>
<section class="sec">
  <h2>3. Google AdSense ve reklam çerezleri</h2>
  <p>Atlas, ücretsiz eğitim içeriğini sürdürebilmek için <strong>Google AdSense</strong> reklamlarını kullanabilir. Google dâhil üçüncü taraf satıcılar, kullanıcıların bu siteye veya internetteki diğer sitelere yaptığı önceki ziyaretlere dayalı olarak reklam sunmak için çerez (cookie) ve benzeri teknolojiler kullanır.</p>
  <p>Google’ın reklam çerezlerini kullanması, Google’ın ve iş ortaklarının kullanıcılara Atlas’ı ve/veya internetteki diğer siteleri ziyaretlerine dayalı reklamlar göstermesini sağlar.</p>
  <ul>
    <li>Kişiselleştirilmiş reklamcılığı kapatmak için <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Reklam Ayarları</a> sayfasını ziyaret edebilirsin.</li>
    <li>Üçüncü taraf satıcıların kişiselleştirilmiş reklam çerezlerini devre dışı bırakmak için <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> adresini kullanabilirsin.</li>
    <li>Google’ın iş ortağı sitelerdeki verileri nasıl işlediğini <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google Gizlilik ve Şartlar</a> sayfasından inceleyebilirsin.</li>
  </ul>
  <p>Avrupa Ekonomik Alanı (AEA), Birleşik Krallık ve İsviçre’den bağlanan ziyaretçiler için Google sertifikalı <strong>IAB TCF v2.2</strong> uyumlu onay yönetim platformu (CMP) uygulanır. Tercihlerini her zaman tarayıcı ayarlarından veya uygulama alt bilgisindeki <strong>Çerez tercihleri</strong> düğmesinden değiştirebilirsin.</p>
</section>
<section class="sec">
  <h2>4. Üçüncü taraf teknik servisler</h2>
  <ul>
    <li><strong>Cloudflare:</strong> Site barındırma, içerik dağıtım ağı (CDN) ve DDoS güvenliği amacıyla standart bağlantı bilgileri (IP adresi, istek başlıkları) işlenebilir.</li>
    <li><strong>Google Fonts:</strong> Arayüz yazı tipleri ve Güney Asya yerel yazı sistemlerinin okunaklı görünmesi için yazı tipi dosyaları Google Fonts üzerinden yüklenir.</li>
    <li><strong>Wikimedia Commons:</strong> Rehber ve alıştırma kartlarındaki gerçek tabela ve yapı fotoğrafları Wikimedia Commons sunucularından çağrılır.</li>
  </ul>
</section>
<section class="sec">
  <h2>5. 6698 sayılı KVKK ve GDPR kapsamındaki hakların</h2>
  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 11. maddesi ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) uyarınca; kişisel verilerinin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve itiraz etme haklarına sahipsin.</p>
  <p>Atlas tarafında ad, soyad, şifre veya üyelik profili tutulmaz. E-posta ile gönderdiğin iletişim mesajları yalnızca talebini yanıtlamak için kullanılır ve gerekliliği sona erdiğinde silinir. Başvuruların için <a href="mailto:{esc(mail)}">{esc(mail)}</a> adresine yazabilirsin.</p>
</section>
<section class="sec">
  <h2>6. Çocukların gizliliği ve politika değişiklikleri</h2>
  <p>Atlas, 13 yaşından küçük çocuklardan bilerek kişisel veri toplamaz. Bu politika yasal veya teknik gerekliliklere göre güncellenebilir; güncel sürüm her zaman bu sayfada yayınlanır.</p>
</section>
"""
    pages.append(("gizlilik.html", page_shell(
        cfg, rel_path="gizlilik.html",
        title="Gizlilik ve Çerez Politikası — Atlas",
        description="Atlas gizlilik politikası, Google AdSense çerez bilgilendirmesi, localStorage kullanımı ve KVKK / GDPR aydınlatma metni.",
        body_html=privacy_body, active_nav="privacy",
    )))

    # 3. Kullanım Koşulları
    terms_body = f"""
<nav class="crumb" aria-label="Konum"><a href="index.html">Ana sayfa</a><span>/</span><span>Kullanım Koşulları</span></nav>
<header class="hero">
  <h1>Kullanım Koşulları ve Feragatname</h1>
  <p class="lead">Atlas’ı ziyaret ederek ve çalışma araçlarını kullanarak aşağıdaki koşulları kabul etmiş sayılırsın.</p>
  <p class="meta">Son güncelleme: {esc(updated)}</p>
</header>
<section class="sec">
  <h2>1. Hizmetin kapsamı</h2>
  <p>Atlas, coğrafya ve bölge tanıma pratiği için sunulan ücretsiz bir çalışma sitesidir. Bilgiler özenle doğrulanır ancak "olduğu gibi" sunulur; kesintisiz erişim veya hatasızlık konusunda garanti verilmez.</p>
</section>
<section class="sec">
  <h2>2. Marka feragatnamesi (GeoGuessr)</h2>
  <p><strong>GeoGuessr</strong>, GeoGuessr AB’nin tescilli ticari markasıdır. {esc(disclaimer)} GeoGuessr AB tarafından desteklenmez, sponsor edilmez veya onaylanmaz.</p>
</section>
<section class="sec">
  <h2>3. Harita ve sınır bilgilendirmesi</h2>
  <p>Sitedeki haritalar Natural Earth (Kamu Malı) ve OpenStreetMap (ODbL) verilerinden sadeleştirilerek üretilmiştir. Yalnızca bölge tanıma çalışması içindir; resmî siyasi sınır, kadastro veya navigasyon referansı olarak kullanılamaz.</p>
</section>
<section class="sec">
  <h2>4. Fikri mülkiyet ve lisanslar</h2>
  <ul>
    <li>Türkçe rehber metinleri, uygulama kodu ve özgün şematik çizimler Atlas’a aittir; izinsiz toplu kopyalanamaz.</li>
    <li>Gerçek tabela ve manzara fotoğrafları Wikimedia Commons’tan ilgili yazarların serbest lisansları (CC BY, CC BY-SA, CC0, Kamu Malı) altında kullanılmaktadır. Ayrıntılı liste <a href="kaynaklar.html">Kaynaklar ve Atıf</a> sayfasındadır.</li>
    <li>Rusya ve Türkiye yol çizgileri © OpenStreetMap katkıcıları (<a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener noreferrer">ODbL</a>) verisine dayanır.</li>
  </ul>
</section>
<section class="sec">
  <h2>5. Kabul edilebilir kullanım</h2>
  <p>Siteye aşırı otomatik bot trafiği göndermek, reklamlar üzerinde geçersiz tıklama/sahte gösterim oluşturmak veya güvenliği aşmaya çalışmak yasaktır.</p>
</section>
<section class="sec">
  <h2>6. Telif ve kaldırma bildirimleri</h2>
  <p>Herhangi bir içeriğin telif hakkını ihlal ettiğini veya hatalı olduğunu düşünüyorsan <a href="iletisim.html">İletişim</a> sayfasından ya da <a href="mailto:{esc(mail)}">{esc(mail)}</a> adresinden bildirebilirsin; talepler incelenerek en kısa sürede gereği yapılır.</p>
</section>
"""
    pages.append(("kullanim-kosullari.html", page_shell(
        cfg, rel_path="kullanim-kosullari.html",
        title="Kullanım Koşulları ve Feragatname — Atlas",
        description="Atlas kullanım koşulları, GeoGuessr AB bağımsızlık ve marka feragatnamesi, harita ve lisans bilgileri.",
        body_html=terms_body, active_nav="terms",
    )))

    # 4. İletişim
    contact_body = f"""
<nav class="crumb" aria-label="Konum"><a href="index.html">Ana sayfa</a><span>/</span><span>İletişim</span></nav>
<header class="hero">
  <h1>İletişim</h1>
  <p class="lead">İçerik düzeltme önerileri, telif/atıf bildirimleri, gizlilik (KVKK) talepleri ve genel soruların için doğrudan e-posta ile ulaşabilirsin.</p>
  <p class="meta">Son güncelleme: {esc(updated)}</p>
</header>
<section class="sec">
  <h2>Doğrudan e-posta</h2>
  <div class="note">
    <b>Atlas İletişim Adresi</b>
    <p><a href="mailto:{esc(mail)}">{esc(mail)}</a></p>
  </div>
  <div class="cta-row">
    <a class="btn btn-primary" href="mailto:{esc(mail)}?subject=Atlas%20%C4%B0leti%C5%9Fim">E-posta gönder</a>
    <a class="btn" href="index.html#ana">Uygulamaya dön</a>
  </div>
</section>
<section class="sec">
  <h2>Hangi konularda yazabilirsin?</h2>
  <ul>
    <li><strong>Bilgi düzeltme:</strong> Alan kodu, yol numarası, idari reform veya tabela açıklamasında bir hata fark edersen ilgili sayfa adresi ve kaynak bağlantısıyla paylaşabilirsin.</li>
    <li><strong>Telif ve atıf bildirimi (5846 sayılı FSEK / DMCA):</strong> Bir fotoğraf veya metinle ilgili kaldırma ya da atıf düzeltme talebinde ilgili sayfa bağlantısını ve dosya adını belirtmen yeterlidir; en kısa sürede incelenip gereği yapılır.</li>
    <li><strong>Gizlilik ve KVKK:</strong> Çerez tercihleri veya kişisel veri taleplerin için aynı adresten yazabilirsin.</li>
  </ul>
</section>
"""
    pages.append(("iletisim.html", page_shell(
        cfg, rel_path="iletisim.html",
        title="İletişim — Atlas",
        description="Atlas iletişim sayfası: hata bildirimi, telif/atıf talepleri ve gizlilik soruları için doğrudan iletişim adresi.",
        body_html=contact_body, active_nav="contact",
    )))

    # 5. Kaynaklar ve Atıf (tüm 232 fotoğraf + OSM + Natural Earth + 46 çizim statik HTML)
    photos = data["photos"]
    groups: dict[str, list[tuple[str, dict]]] = {}
    for k, p in photos.items():
        pre = k.split("-")[0]
        gname = PHOTO_GROUP_NAMES.get(pre, "Diğer")
        groups.setdefault(gname, []).append((k, p))

    photo_blocks = []
    for gname in sorted(groups.keys()):
        rows_html = []
        for _k, p in groups[gname]:
            lic = p.get("lic") or ""
            lurl = LIC_URLS.get(lic, "")
            lic_cell = (
                f'<a href="{esc(lurl)}" target="_blank" rel="noopener noreferrer">{esc(lic)}</a>'
                if lurl
                else esc(lic)
            )
            mod = "Kırpıldı / işaretlendi" if p.get("mod") else "Özgün"
            rows_html.append(
                f'<tr><td><a href="{esc(commons_page(p["f"]))}" target="_blank" rel="noopener noreferrer">{esc(p["f"])}</a></td>'
                f'<td>{esc(p.get("by", ""))}</td><td>{lic_cell}</td><td>{mod}</td></tr>'
            )
        photo_blocks.append(
            f'<details class="fold" open><summary><span>{esc(gname)}</span><small>{len(groups[gname])} fotoğraf</small></summary>'
            f'<div class="fold-in"><table><thead><tr><th>Dosya (Wikimedia Commons)</th><th>Yazar</th><th>Lisans</th><th>Biçim</th></tr></thead>'
            f'<tbody>{"".join(rows_html)}</tbody></table></div></details>'
        )

    sources_body = f"""
<nav class="crumb" aria-label="Konum"><a href="index.html">Ana sayfa</a><span>/</span><span>Kaynaklar ve Atıf</span></nav>
<header class="hero">
  <h1>Kaynaklar ve Atıf</h1>
  <p class="lead">Atlas’taki {len(photos)} gerçek fotoğraf Wikimedia Commons’tan ticari kullanıma açık serbest lisanslarıyla alınmıştır. Aşağıda tüm harita verileri, özgün çizimler ve fotoğraf yazar/lisans listesi yer alır.</p>
  <p class="meta">Son güncelleme: {esc(updated)}</p>
</header>
<section class="sec">
  <h2>Harita, sınır ve yol verileri</h2>
  <ul>
    <li><strong>Dünya ve ülke sınırları:</strong> <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> (Kamu Malı) 1. düzey idari sınırlarından sadeleştirilmiştir.</li>
    <li><strong>Rusya ve Türkiye yol çizgileri:</strong> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap katkıcıları</a> — <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener noreferrer">ODbL</a> lisansı ile sadeleştirilmiş federal/devlet yolu ve otoyol güzergâhları.</li>
    <li><strong>Vietnam 63 il sınırları:</strong> Free-GIS-Data (nguyenduy1133) 2025 öncesi il sınır verilerinden sadeleştirilmiştir.</li>
    <li><strong>Özgün şematik çizimler ({data["figsCount"]} adet):</strong> Tabelada ve direkte nereye bakılacağını göstermek üzere Atlas tarafından resmî yönetmelikler ve çapraz doğrulanmış kaynaklara göre özgün olarak üretilmiştir.</li>
  </ul>
</section>
<section class="sec">
  <h2>Telif ve düzeltme bildirimi</h2>
  <p>Metinler Atlas tarafından Türkçe olarak özgün biçimde yazılmıştır. Bir atıf eksikliği veya telif sorunu görürsen <a href="mailto:{esc(mail)}">{esc(mail)}</a> adresinden ya da <a href="iletisim.html">İletişim</a> sayfasından bize ulaşabilirsin.</p>
</section>
<section class="sec major">
  <h2>Wikimedia Commons fotoğraf listesi ({len(photos)} fotoğraf)</h2>
  {"".join(photo_blocks)}
</section>
"""
    pages.append(("kaynaklar.html", page_shell(
        cfg, rel_path="kaynaklar.html",
        title="Kaynaklar ve Atıf — Atlas",
        description=f"Atlas kaynaklar ve atıf listesi: {len(photos)} Wikimedia Commons fotoğrafının yazar ve Creative Commons lisansları, OpenStreetMap ODbL ve Natural Earth atıfları.",
        body_html=sources_body, active_nav="sources",
    )))

    # 6. 404.html
    not_found_body = """
<header class="hero">
  <h1>Sayfa bulunamadı (404)</h1>
  <p class="lead">Aradığın adres taşınmış veya hiç var olmamış olabilir. Aşağıdan Atlas ana sayfasına veya ülke rehberlerine dönebilirsin.</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="index.html">Ana sayfaya dön</a>
    <a class="btn" href="hakkimizda.html">Hakkımızda</a>
  </div>
</header>
""" + other_guides_nav("", "")
    pages.append(("404.html", page_shell(
        cfg, rel_path="404.html",
        title="Sayfa bulunamadı — Atlas",
        description="Aradığın sayfa bulunamadı. Atlas GeoGuessr çalışma rehberine geri dön.",
        body_html=not_found_body, noindex=True,
    )))

    return pages


def build_vietnam_guide(data: dict) -> tuple[str, str]:
    cfg = data["config"]
    vn = data["vn"]
    reg_by_id = {r["id"]: r for r in vn["regions"]}

    region_cards = "".join(
        f'<article class="card"><b>{esc(r["tr"])} ({esc(r["vi"])})</b><p>{esc(r["cue"])}</p></article>'
        for r in vn["regions"]
    )
    fam_rows = "".join(
        f'<tr><td><strong>0{esc(f.get("k", ""))}x</strong></td><td>{esc(f.get("tr", ""))}</td><td>{esc(f.get("hint", ""))}</td></tr>'
        for f in (vn["families"] or [])
    )
    rule_cards = "".join(
        f'<article class="card">'
        + (f'<span class="tag">{esc(r["stat"])}</span>' if r.get("stat") else "")
        + f'<b>{esc(r.get("title", ""))}</b>'
        + (f'<p><strong>{esc(r["gist"])}</strong></p>' if r.get("gist") else "")
        + f'<p>{esc(r.get("body", ""))}</p>'
        + (f'<p><small>{esc(r["watch"])}</small></p>' if r.get("watch") else "")
        + "</article>"
        for r in (vn["rules"] or [])
    )
    prov_rows = "".join(
        f'<tr><td><strong>{esc(p["vi"])}</strong></td><td><code>0{esc(p["area"])}</code></td>'
        f'<td>{esc(reg_by_id.get(p["region"], {}).get("tr", p["region"]))}</td>'
        f'<td>{esc(p["cap"])}</td><td>{esc(p["cue"])}</td></tr>'
        for p in vn["provinces"]
    )

    body = f"""
<nav class="crumb" aria-label="Konum"><a href="../index.html">Ana sayfa</a><span>/</span><span>Vietnam rehberi</span></nav>
<header class="hero">
  <div class="eyebrow"><span class="badge tone-blue">VN</span><span>Asya · 63 il</span></div>
  <h1>Vietnam GeoGuessr Bölge Tahmin Rehberi</h1>
  <p class="lead">Vietnam’da Street View tabelalarındaki en güçlü üç ipucu: 02 ile başlayan telefon alan kodları, 8 coğrafi bölge ve il adlarının Sino-Vietnamca mantığı.</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="../index.html#vietnam">Etkileşimli haritada çalış →</a>
    <a class="btn" href="../index.html#vietnam-alankodlari">Alan kodu çözücü</a>
    <a class="btn" href="../index.html#vietnam-pratik">Pratik yap</a>
    <a class="btn" href="../index.html#vietnam-simulasyon">Simülasyon</a>
  </div>
</header>
<aside class="note">
  <b>Neden 63 il, 34 değil?</b>
  <p>Vietnam 1 Temmuz 2025’te 63 ili 34 idari birime indirdi. Ancak GeoGuessr’daki Street View görüntüleri, dükkân tabelaları ve telefon alan kodları bu tarihten önceki 63 il düzenine aittir. Bu nedenle rehber ve harita 63 il sistemini öğretir.</p>
</aside>
<section class="sec major">
  <h2>1. Vietnam’ın 8 bölgesi ve coğrafi ipuçları</h2>
  <p>Ülke kuzeyden güneye Kuzey (Bắc Bộ), Orta (Trung Bộ) ve Güney (Nam Bộ) olarak üçe, ayrıntıda 8 bölgeye ayrılır. Bitki örtüsü, arazi yapısı ve mimari ilk bakışta kesimi ele verir:</p>
  <div class="card-grid">{region_cards}</div>
</section>
<section class="sec major">
  <h2>2. Telefon alan kodları (02x sistemi)</h2>
  <p>Dükkân tabelalarında, nakliye araçlarında ve ilanlarda sabit hat numaraları çok sık görülür. 2017 reformundan sonra tüm sabit alan kodları <strong>02</strong> ile başlar ve hemen arkasından gelen hane (20x → 29x) kuzeyden güneye bölgeyi gösterir (Hà Nội <code>024</code>, TP. Hồ Chí Minh <code>028</code>).</p>
  <div class="tbl-wrap"><table><thead><tr><th>Kod ailesi</th><th>Bölge</th><th>Not</th></tr></thead><tbody>{fam_rows}</tbody></table></div>
</section>
{static_ad_slot(cfg, "guideEnd")}
<section class="sec major">
  <h2>3. İl adı mantığı (Bình, Quảng, Hà-, Bắc-)</h2>
  <p>63 ilin 44’ünün adı konum hakkında anlamlı bir ipucu taşır; dilek anlamlı adlar (An, Ninh, Yên, Phú…) ise konum vermez, bunlar için alan koduna bakılır. Başlıca doğrulanmış ad kuralları:</p>
  <div class="card-grid">{rule_cards}</div>
</section>
<section class="sec major">
  <h2>4. Tüm 63 il: alan kodu ve kısa ipucu tablosu</h2>
  <div class="tbl-wrap"><table><thead><tr><th>İl</th><th>Alan kodu</th><th>Bölge</th><th>Merkez</th><th>Ayırt edici ipucu</th></tr></thead><tbody>{prov_rows}</tbody></table></div>
</section>
{other_guides_nav("vietnam", "../")}
"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Vietnam GeoGuessr Bölge Tahmin Rehberi",
        "inLanguage": "tr",
        "author": {"@type": "Organization", "name": "Atlas"},
    }
    return ("rehber/vietnam.html", page_shell(
        cfg, rel_path="rehber/vietnam.html",
        title="Vietnam GeoGuessr Rehberi: 63 İl, Alan Kodları ve İl Adı Mantığı — Atlas",
        description="Vietnam GeoGuessr bölge tahmini: 02x telefon alan kodları, 8 coğrafi bölge, Bình/Quảng/Hà- il adı kuralları ve 63 ilin tam listesi.",
        body_html=body, schema_json=schema,
    ))


def build_south_asia_guide(data: dict) -> tuple[str, str]:
    cfg = data["config"]
    asia = data["asia"]
    s_by_id = {s["id"]: s for s in asia["scripts"]}

    script_cards = "".join(
        f'<article class="card"><span class="tag">{esc(s["nat"])}</span><b>{esc(s["tr"])}</b>'
        f'<p><strong>Diller:</strong> {esc(s["langs"])}</p>'
        f'<p>{esc(s["gist"])}</p>'
        + (f'<p><strong>Rakamlar:</strong> {esc(s["dig"])}</p>' if s.get("dig") else "")
        + "</article>"
        for s in asia["scripts"]
    )
    pair_cards = []
    for k, val in (asia.get("pairs") or {}).items():
        parts = k.split("|")
        if len(parts) == 2 and val:
            a_name = s_by_id.get(parts[0], {}).get("tr", parts[0])
            b_name = s_by_id.get(parts[1], {}).get("tr", parts[1])
            txt = val if isinstance(val, str) else (val.get("diff") or val.get("t") or "")
            if txt:
                pair_cards.append(
                    f'<article class="card"><b>{esc(a_name)} ↔ {esc(b_name)}</b><p>{esc(txt)}</p></article>'
                )

    place_rows = "".join(
        f'<tr><td><strong>{esc(p.get("en") or p.get("short") or p.get("id", ""))}</strong></td>'
        f'<td>{esc(", ".join(s_by_id.get(sid, {}).get("tr", sid) for sid in p.get("main", [])))}</td>'
        f'<td>{esc(", ".join(s_by_id.get(sid, {}).get("tr", sid) for sid in p.get("also", [])) or "—")}</td>'
        f'<td>{esc(p.get("note", ""))}</td></tr>'
        for p in asia["places"]
    )

    body = f"""
<nav class="crumb" aria-label="Konum"><a href="../index.html">Ana sayfa</a><span>/</span><span>Güney Asya rehberi</span></nav>
<header class="hero">
  <div class="eyebrow"><span class="badge tone-green">GA</span><span>Asya · 17 yazı · {len(asia["places"])} yer</span></div>
  <h1>Güney Asya ve Hindistan GeoGuessr Alfabe Rehberi</h1>
  <p class="lead">Hindistan, Bangladeş, Nepal, Butan, Sri Lanka ve çevresinde yol veya dükkân tabelasına bakıp yazı sistemini tanıdığında eyaleti ve ülkeyi büyük ölçüde doğrudan bulursun.</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="../index.html#guneyasya">Etkileşimli haritada çalış →</a>
    <a class="btn" href="../index.html#guneyasya-alfabe">17 yazı rehberi</a>
    <a class="btn" href="../index.html#guneyasya-pratik">Alfabe pratiği</a>
    <a class="btn" href="../index.html#guneyasya-simulasyon">Simülasyon</a>
  </div>
</header>
<section class="sec major">
  <h2>1. Güney Asya’daki 17 yazı sistemi</h2>
  <p>Üstten kesintisiz çizgi (Devanagari, Bengali, Gurmukhi), yuvarlak güney yazıları (Telugu, Kannada, Malayalam, Tamil, Sinhala) ve doğu/Himalaya yazıları ayırt edici görsel işaretleriyle ayrılır:</p>
  <div class="card-grid">{script_cards}</div>
</section>
{static_ad_slot(cfg, "guideEnd")}
<section class="sec major">
  <h2>2. En çok karışan yazı çiftleri</h2>
  <p>GeoGuessr’da puan kaybettiren ikilileri (Bengali–Assam, Telugu–Kannada, Devanagari–Gujarati, Malayalam–Tamil) tek bakışta ayırma ipuçları:</p>
  <div class="card-grid">{"".join(pair_cards)}</div>
</section>
<section class="sec major">
  <h2>3. Eyaletler ve baskın tabela yazıları</h2>
  <p>Üçlü dil tabelalarında (yerel yazı + Hintçe + İngilizce) belirleyici olan her zaman yerel yazıdır:</p>
  <div class="tbl-wrap"><table><thead><tr><th>Eyalet / Ülke</th><th>Baskın yazı</th><th>İkincil yazılar</th><th>Not</th></tr></thead><tbody>{place_rows}</tbody></table></div>
</section>
{other_guides_nav("guneyasya", "../")}
"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Güney Asya ve Hindistan GeoGuessr Alfabe Rehberi",
        "inLanguage": "tr",
        "author": {"@type": "Organization", "name": "Atlas"},
    }
    return ("rehber/guney-asya.html", page_shell(
        cfg, rel_path="rehber/guney-asya.html",
        title="Hindistan ve Güney Asya GeoGuessr Alfabe Rehberi: 17 Yazı — Atlas",
        description="Hindistan, Bangladeş, Nepal, Sri Lanka ve Butan için 17 yazı sistemini tanıyıp eyalet tahmin etme rehberi: Devanagari, Tamil, Telugu, Kannada, Malayalam, Bengali.",
        body_html=body, schema_json=schema,
    ))


def build_pack_guide(data: dict, pk: dict, slug: str) -> tuple[str, str]:
    cfg = data["config"]
    reg_by_id = {r["id"]: r for r in pk.get("regions", [])}

    note_html = ""
    if pk.get("note") and pk["note"].get("text"):
        note_html = f'<aside class="note"><b>{esc(pk["note"].get("title", "Bilgi"))}</b><p>{esc(pk["note"]["text"])}</p></aside>'

    topic_blocks = []
    for idx, t in enumerate(pk.get("topics", []), 1):
        flows_html = ""
        if t.get("flows"):
            items = "".join(f'<li><strong>{esc(f["title"])}:</strong> {esc(f["body"])}</li>' for f in t["flows"])
            flows_html = f"<h3>Hızlı karar akışı</h3><ol>{items}</ol>"

        bands_html = ""
        if t.get("bands"):
            cards = "".join(
                f'<article class="card"><span class="tag">{esc(b.get("key", ""))}</span><b>{esc(b.get("title", ""))}</b><p>{esc(b.get("sub", ""))}</p></article>'
                for b in t["bands"]
            )
            bands_html = f'<h3>{esc(t.get("bandsTitle") or "Gruplar ve dağılım")}</h3><div class="card-grid">{cards}</div>'

        rules_html = ""
        if t.get("rules"):
            rcards = []
            for r in t["rules"]:
                traps = ""
                if r.get("traps"):
                    tr_li = "".join(f"<li><code>{esc(a)}</code> → {esc(b)}</li>" for a, b in r["traps"])
                    traps = f"<ul>{tr_li}</ul>"
                rcards.append(f'<article class="card"><b>{esc(r.get("title", ""))}</b><p>{esc(r.get("body", ""))}</p>{traps}</article>')
            rules_html = f'<h3>{esc(t.get("rulesTitle") or "Karışanlar ve istisnalar")}</h3><div class="card-grid">{"".join(rcards)}</div>'

        dec_html = ""
        dec = t.get("decoder")
        if dec and dec.get("entries"):
            rows = "".join(
                f'<tr><td><code>{esc(e["key"])}</code></td><td>{esc(e["label"])}</td><td>{esc(e.get("sub", ""))}</td></tr>'
                for e in dec["entries"][:90]
            )
            dec_html = (
                f'<h3>{esc(dec.get("title") or "Özet referans tablosu")}</h3>'
                f'<div class="tbl-wrap"><table><thead><tr><th>İşaret / Kod</th><th>Karşılığı</th><th>Not</th></tr></thead><tbody>{rows}</tbody></table></div>'
            )

        topic_blocks.append(f"""
<section class="sec major">
  <h2>{idx}. {esc(t.get("title") or t.get("navLabel"))}</h2>
  <p>{esc(t.get("lead", ""))}</p>
  <p><a href="../index.html#{esc(pk['id'])}-{esc(t['key'])}">Bu konuyu haritada ve çözücüde aç →</a></p>
  {flows_html}
  {bands_html}
  {rules_html}
  {dec_html}
</section>""")
        if idx == 1:
            ad_mid = static_ad_slot(cfg, "guideEnd")
            if ad_mid:
                topic_blocks.append(ad_mid)

    reg_cards = "".join(
        f'<article class="card"><b>{esc(r["tr"])}</b><p>{esc(r.get("cue", ""))}</p></article>'
        for r in pk.get("regions", [])
    )
    unit_rows = "".join(
        f'<tr><td><strong>{esc(u["name"])}</strong>'
        + (f' <small>({esc(u["local"])})</small>' if u.get("local") else "")
        + f'</td><td>{esc(reg_by_id.get(u["reg"], {}).get("tr", u["reg"]))}</td>'
        + f'<td>{esc(", ".join(u.get("codes", [])) or "—")}</td>'
        + f'<td>{esc(u.get("cap", ""))}</td></tr>'
        for u in pk.get("units", [])
    )

    topic_btns = "".join(
        f'<a class="btn" href="../index.html#{esc(pk["id"])}-{esc(t["key"])}">{esc(t["navLabel"])}</a>'
        for t in pk.get("topics", [])
    )

    body = f"""
<nav class="crumb" aria-label="Konum"><a href="../index.html">Ana sayfa</a><span>/</span><span>{esc(pk["name"])} rehberi</span></nav>
<header class="hero">
  <div class="eyebrow"><span class="badge tone-{esc(pk.get('tone', 'blue'))}">{esc(pk["code"])}</span><span>{esc(pk["area"])} · {len(pk.get("units", []))} {esc(pk.get("unitLabel", "birim"))}</span></div>
  <h1>{esc(pk["name"])} GeoGuessr Bölge Tahmin Rehberi</h1>
  <p class="lead">{esc(pk["blurb"])}</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="../index.html#{esc(pk['id'])}">Etkileşimli haritada çalış →</a>
    {topic_btns}
    <a class="btn" href="../index.html#{esc(pk['id'])}-pratik">Pratik</a>
  </div>
</header>
{note_html}
{"".join(topic_blocks)}
<section class="sec major">
  <h2>Bölgeler özeti</h2>
  <div class="card-grid">{reg_cards}</div>
</section>
<section class="sec">
  <h2>Tüm {esc(pk.get("unitLabel", "birim"))} listesi ({len(pk.get("units", []))})</h2>
  <div class="tbl-wrap"><table><thead><tr><th>Ad</th><th>Bölge</th><th>{esc(pk.get("codeLabel", "Kod"))}</th><th>Merkez</th></tr></thead><tbody>{unit_rows}</tbody></table></div>
</section>
{other_guides_nav(pk["id"], "../")}
"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": f'{pk["name"]} GeoGuessr Bölge Tahmin Rehberi',
        "inLanguage": "tr",
        "author": {"@type": "Organization", "name": "Atlas"},
    }
    return (slug, page_shell(
        cfg, rel_path=slug,
        title=f'{pk["name"]} GeoGuessr Rehberi: {pk["line"]} — Atlas',
        description=f'{pk["name"]} GeoGuessr bölge tahmin rehberi: {pk["blurb"]} Etkileşimli harita, konu özeti ve aralıklı tekrar.',
        body_html=body, schema_json=schema,
    ))


def build_index_ssr_html(data: dict) -> str:
    cfg = data["config"]
    packs_by_id = {p["id"]: p for p in data["packs"]}
    items = []
    for rid, name, code, _tone, area, slug in GUIDE_ORDER:
        if rid == "vietnam":
            line = "63 il: bölgeler, 02x alan kodları ve il adı mantığı."
        elif rid == "guneyasya":
            line = "17 yazı sistemi, 42 yer: tabeladaki yazıdan eyaleti tahmin et."
        else:
            pk = packs_by_id.get(rid, {})
            line = pk.get("blurb") or pk.get("line") or ""
        items.append(
            f'<li><strong><a href="{slug}">{esc(name)} ({esc(code)})</a></strong>'
            f'<span>{esc(line)}</span> · <a href="#{esc(rid)}">Haritada aç</a></li>'
        )
    disclaimer = cfg.get(
        "disclaimer",
        "Atlas, GeoGuessr için hazırlanmış bağımsız ve resmî olmayan bir çalışma rehberidir; GeoGuessr AB ile bağlantısı yoktur.",
    )
    return f"""<div class="ssr-shell">
  <header>
    <h1>Atlas — GeoGuessr Bölge Tahmin Rehberi</h1>
    <p>Her ülke için bölge tahminine en çok yarayan 1–3 ana konu: etkileşimli harita, çözücü, doğrulanmış görsel kartlar, aralıklı tekrar (Leitner) ve simülasyon. Tamamen ücretsiz ve Türkçe.</p>
  </header>
  <main>
    <h2>Kapsanan 9 bölge ve okuma rehberleri</h2>
    <ul class="ssr-grid">{"".join(items)}</ul>
  </main>
  <footer>
    <p><a href="hakkimizda.html">Hakkımızda</a> · <a href="gizlilik.html">Gizlilik ve Çerezler</a> · <a href="kullanim-kosullari.html">Kullanım Koşulları</a> · <a href="kaynaklar.html">Kaynaklar ve Atıf</a> · <a href="iletisim.html">İletişim</a></p>
    <p>{esc(disclaimer)}</p>
  </footer>
</div>"""


def update_index_html(data: dict) -> None:
    cfg = data["config"]
    base_url = (cfg.get("siteUrl") or "").rstrip("/")
    idx_path = ROOT / "index.html"
    src = idx_path.read_text(encoding="utf-8")

    ld = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": cfg.get("siteName", "Atlas"),
        "description": "GeoGuessr için Türkçe bölge tahmin rehberi: 9 bölge, etkileşimli harita, aralıklı tekrar ve simülasyon.",
        "inLanguage": "tr",
        "url": f"{base_url}/" if base_url else "",
    }
    seo_block = "\n".join(filter(None, [
        f'<link rel="canonical" href="{esc(base_url)}/">' if base_url else "",
        f'<meta property="og:url" content="{esc(base_url)}/">' if base_url else "",
        f'<meta property="og:image" content="{esc(base_url)}/og-image.svg">' if base_url else '<meta property="og:image" content="og-image.svg">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>',
    ]))
    ad_block = adsense_head_snippet(cfg)
    ssr_block = build_index_ssr_html(data)

    def replace_marker(text: str, name: str, inner: str) -> str:
        pat = re.compile(rf"(<!-- {name}:START -->).*?(<!-- {name}:END -->)", re.S)
        if not pat.search(text):
            raise RuntimeError(f"index.html içinde <!-- {name}:START --> işaretçisi bulunamadı")
        replacement = f"\\1\n{inner}\n\\2" if inner else "\\1\n\\2"
        return pat.sub(lambda m: m.group(1) + ("\n" + inner + "\n" if inner else "\n") + m.group(2), text, count=1)

    src = replace_marker(src, "META:SEO", seo_block)
    src = replace_marker(src, "ADSENSE:HEAD", ad_block)
    src = replace_marker(src, "SSR", ssr_block)
    idx_path.write_text(src, encoding="utf-8")


def write_root_aux_files(data: dict, generated_paths: list[str]) -> None:
    cfg = data["config"]
    base_url = (cfg.get("siteUrl") or "https://atlas.gorkemugurguler.workers.dev").rstrip("/")
    today = datetime.date.today().isoformat()

    # 1. robots.txt
    robots = "\n".join([
        "User-agent: *",
        "Allow: /",
        "Disallow: /dist/",
        "Disallow: /tools/",
        "",
        "User-agent: Mediapartners-Google",
        "Allow: /",
        "",
        f"Sitemap: {base_url}/sitemap.xml",
        "",
    ])
    (ROOT / "robots.txt").write_text(robots, encoding="utf-8")

    # 2. sitemap.xml
    urls = [f"{base_url}/"] + [
        f"{base_url}/{p}" for p in generated_paths if p != "404.html"
    ]
    url_xml = "\n".join(
        f"  <url>\n    <loc>{esc(u)}</loc>\n    <lastmod>{today}</lastmod>\n  </url>"
        for u in urls
    )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{url_xml}\n"
        "</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")

    # 3. ads.txt
    ads = cfg.get("ads") or {}
    client = (ads.get("client") or "").strip()
    pub_id = client.replace("ca-", "") if client.startswith("ca-pub-") else client
    if pub_id.startswith("pub-"):
        ads_txt = (
            "# Atlas ads.txt — Google AdSense yetkili satıcı kaydı\n"
            f"google.com, {pub_id}, DIRECT, f08c47fec0942fa0\n"
        )
    else:
        ads_txt = (
            "# Atlas ads.txt\n"
            "# Google AdSense yayıncı kimliğini (ca-pub-XXXXXXXXXXXXXXXX) aldığında şu komutu çalıştır:\n"
            "#   python3 tools/set_domain.py --domain https://alanadin.com --adsense ca-pub-XXXXXXXXXXXXXXXX\n"
        )
    (ROOT / "ads.txt").write_text(ads_txt, encoding="utf-8")

    # 4. _headers (Cloudflare Workers Static Assets)
    headers = """/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/js/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/css/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/favicon.svg
  Cache-Control: public, max-age=604800

/og-image.svg
  Cache-Control: public, max-age=604800

/ads.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600

/dist/*
  X-Robots-Tag: noindex, nofollow

/tools/*
  X-Robots-Tag: noindex, nofollow
"""
    (ROOT / "_headers").write_text(headers, encoding="utf-8")


def main() -> int:
    data = extract_app_data()
    packs_by_id = {p["id"]: p for p in data["packs"]}
    out_pages: list[tuple[str, str]] = []
    out_pages.extend(build_legal_pages(data))
    out_pages.append(build_vietnam_guide(data))
    out_pages.append(build_south_asia_guide(data))

    for rid, _name, _code, _tone, _area, slug in GUIDE_ORDER:
        if rid in ("vietnam", "guneyasya"):
            continue
        pk = packs_by_id.get(rid)
        if not pk:
            print(f"UYARI: paket bulunamadı: {rid}", file=sys.stderr)
            continue
        out_pages.append(build_pack_guide(data, pk, slug))

    generated_paths = []
    for rel, content in out_pages:
        target = ROOT / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        generated_paths.append(rel)

    update_index_html(data)
    write_root_aux_files(data, generated_paths)
    print(f"Üretildi: {len(generated_paths)} HTML sayfası + index.html SSR + sitemap.xml + robots.txt + ads.txt + _headers")
    return 0


if __name__ == "__main__":
    sys.exit(main())

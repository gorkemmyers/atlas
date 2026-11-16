#!/usr/bin/env python3
"""5 yeni GeoGuessr ülkesi için js/geo-*.js dosyalarını üretir."""
import json
import os
import re
import sys
import unicodedata

sys.path.insert(0, os.path.dirname(__file__))
from build_countries_geo import build_country_geo

NE_PATH = "/Users/sareyuksel/.gemini/antigravity/brain/b017a9b2-0133-49a5-afdb-cd330e26fdd1/scratch/ne/admin1.geojson"
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "js"))


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


# Brezilya 27 eyalet -> bölgesi (IBGE: N, NE, CO, SE, S)
BR_REG = {
    "ac": "norte", "ap": "norte", "am": "norte", "pa": "norte", "ro": "norte", "rr": "norte", "to": "norte",
    "al": "nordeste", "ba": "nordeste", "ce": "nordeste", "ma": "nordeste", "pb": "nordeste",
    "pe": "nordeste", "pi": "nordeste", "rn": "nordeste", "se": "nordeste",
    "df": "centro-oeste", "go": "centro-oeste", "mt": "centro-oeste", "ms": "centro-oeste",
    "es": "sudeste", "mg": "sudeste", "rj": "sudeste", "sp": "sudeste",
    "pr": "sul", "rs": "sul", "sc": "sul",
}

# Japonya 47 il -> elektrik şirketi / coğrafi bölge
JP_UTIL = {
    "jp-01": "hokkaido",
    "jp-02": "tohoku", "jp-03": "tohoku", "jp-04": "tohoku", "jp-05": "tohoku",
    "jp-06": "tohoku", "jp-07": "tohoku", "jp-15": "tohoku",
    "jp-08": "tepco", "jp-09": "tepco", "jp-10": "tepco", "jp-11": "tepco",
    "jp-12": "tepco", "jp-13": "tepco", "jp-14": "tepco", "jp-19": "tepco",
    "jp-20": "chubu", "jp-21": "chubu", "jp-22": "chubu", "jp-23": "chubu", "jp-24": "chubu",
    "jp-16": "hokuriku", "jp-17": "hokuriku", "jp-18": "hokuriku",
    "jp-25": "kansai", "jp-26": "kansai", "jp-27": "kansai", "jp-28": "kansai",
    "jp-29": "kansai", "jp-30": "kansai",
    "jp-31": "chugoku", "jp-32": "chugoku", "jp-33": "chugoku", "jp-34": "chugoku", "jp-35": "chugoku",
    "jp-36": "shikoku", "jp-37": "shikoku", "jp-38": "shikoku", "jp-39": "shikoku",
    "jp-40": "kyushu", "jp-41": "kyushu", "jp-42": "kyushu", "jp-43": "kyushu",
    "jp-44": "kyushu", "jp-45": "kyushu", "jp-46": "kyushu",
    "jp-47": "okinawa",
}

# Endonezya -> ada makro grubu
ID_REG = {
    "ac": "sumatra", "su": "sumatra", "sb": "sumatra", "ri": "sumatra", "kr": "sumatra",
    "ja": "sumatra", "ss": "sumatra", "bb": "sumatra", "be": "sumatra", "la": "sumatra",
    "jk": "java", "bt": "java", "jb": "java", "jt": "java", "yo": "java", "ji": "java",
    "ba": "nusa", "nb": "nusa", "nt": "nusa",
    "kb": "kalimantan", "kt": "kalimantan", "ks": "kalimantan", "ki": "kalimantan",
    "sa": "sulawesi", "go": "sulawesi", "st": "sulawesi", "sr": "sulawesi", "sn": "sulawesi", "sg": "sulawesi",
    "ma": "maluku-papua", "mu": "maluku-papua", "pa": "maluku-papua", "pb": "maluku-papua",
}

# Meksika -> LADA / Coğrafi grup
MX_REG = {
    "dif": "cdmx",
    "mex": "centro", "mor": "centro", "hid": "centro", "pue": "centro", "tla": "centro",
    "ver": "golfo", "tab": "golfo",
    "oax": "sur", "gro": "sur", "chp": "sur",
    "cam": "yucatan", "yuc": "yucatan", "roo": "yucatan",
    "jal": "occidente", "col": "occidente", "mic": "occidente", "nay": "occidente",
    "gua": "bajio", "que": "bajio", "agu": "bajio", "slp": "bajio", "zac": "bajio",
    "bcn": "noroeste", "bcs": "noroeste", "son": "noroeste", "sin": "noroeste", "chh": "noroeste", "dur": "noroeste",
    "nle": "noreste", "tam": "noreste", "coa": "noreste",
}


def write_geo_js(path, var_name, data):
    txt = (
        "/* Otomatik üretildi (tools/generate_all_geo.py) — Natural Earth 10m (kamu malı), sadeleştirilmiş. */\n"
        f"window.{var_name}=" + json.dumps(data, separators=(",", ":"), ensure_ascii=False) + ";\n"
    )
    with open(path, "w", encoding="utf-8") as fp:
        fp.write(txt)
    print(f"Wrote {os.path.basename(path)}: {len(data['p'])} features, {len(txt)/1024:.1f} KB, bbox={data['bbox']}")


def main():
    with open(NE_PATH, encoding="utf-8") as fp:
        raw = json.load(fp)["features"]

    # 1. BREZİLYA
    br_feats = [f for f in raw if f["properties"].get("adm0_a3") == "BRA"]
    br_geo = build_country_geo(
        br_feats,
        id_fn=lambda pr: pr["iso_3166_2"].split("-")[1].lower(),
        meta_fn=lambda fid: {"reg": BR_REG.get(fid), "mac": BR_REG.get(fid)},
        tol_px=1.6,
        min_ring_px2=6.0,
        filter_ring_fn=lambda fid, ll: max(p[0] for p in ll) < -33.5,  # Trindade / Fernando de Noronha uzak okyanus kayalarını atla
    )
    write_geo_js(os.path.join(OUT_DIR, "geo-brazil.js"), "BR_GEO", br_geo)

    # 2. JAPONYA
    jp_feats = [f for f in raw if f["properties"].get("adm0_a3") == "JPN"]
    jp_iso_to_id = {}
    for f in jp_feats:
        pr = f["properties"]
        nm = pr["name"].lower()
        # Tutarlı ASCII ID
        sid = slug(pr["name"])
        if sid == "hyogo": sid = "hyogo"
        jp_iso_to_id[pr["iso_3166_2"].lower()] = sid
    jp_id_to_util = {jp_iso_to_id[k]: v for k, v in JP_UTIL.items() if k in jp_iso_to_id}
    jp_sea = {
        "hokkaido": ["aomori"],
        "okinawa": ["kagoshima"],
        "kagawa": ["okayama", "hyogo"],
        "ehime": ["hiroshima", "oita"],
        "tokushima": ["wakayama", "hyogo"],
        "yamaguchi": ["fukuoka", "ehime"],
        "nagasaki": ["kumamoto"],
        "chiba": ["kanagawa"],
    }
    def jp_ring_ok(fid, ll):
        # Tokyo'nun 1000+ km Pasifik adalarını (Ogasawara / Minami-Torishima) ana kadrajdan çıkar
        if fid == "tokyo":
            return max(p[0] for p in ll) < 141.0 and min(p[1] for p in ll) > 33.8
        if fid == "kagoshima":
            return min(p[1] for p in ll) > 27.0
        return True
    jp_geo = build_country_geo(
        jp_feats,
        id_fn=lambda pr: jp_iso_to_id[pr["iso_3166_2"].lower()],
        meta_fn=lambda fid: {"reg": jp_id_to_util.get(fid), "mac": jp_id_to_util.get(fid)},
        tol_px=0.55,
        min_ring_px2=2.5,
        filter_ring_fn=jp_ring_ok,
        sea_nb=jp_sea,
    )
    write_geo_js(os.path.join(OUT_DIR, "geo-japan.js"), "JP_GEO", jp_geo)

    # 3. ENDONEZYA
    id_feats = [f for f in raw if f["properties"].get("adm0_a3") == "IDN"]
    id_sea = {
        "lampung": ["banten"],
        "banten": ["lampung"],
        "bangka-belitung": ["sumatera-selatan"],
        "kepulauan-riau": ["riau", "kalimantan-barat"],
        "jawa-timur": ["bali"],
        "bali": ["jawa-timur", "nusa-tenggara-barat"],
        "nusa-tenggara-barat": ["bali", "nusa-tenggara-timur", "sulawesi-selatan"],
        "nusa-tenggara-timur": ["nusa-tenggara-barat", "maluku"],
        "sulawesi-selatan": ["kalimantan-timur", "nusa-tenggara-barat"],
        "kalimantan-timur": ["sulawesi-tengah", "sulawesi-selatan"],
        "sulawesi-tengah": ["kalimantan-timur", "maluku-utara"],
        "sulawesi-tenggara": ["maluku"],
        "maluku": ["maluku-utara", "papua-barat", "sulawesi-tenggara"],
        "maluku-utara": ["sulawesi-utara", "papua-barat", "maluku"],
        "papua-barat": ["maluku", "maluku-utara", "papua"],
    }
    id_iso_by_fid = {}
    for f in id_feats:
        pr = f["properties"]
        code = pr["iso_3166_2"].split("-")[1].lower()
        fid = slug(pr["name"])
        id_iso_by_fid[fid] = code
    # Sea neighbor dict'ini code -> code'dan fid -> fid'ye dönüştür
    id_geo = build_country_geo(
        id_feats,
        id_fn=lambda pr: slug(pr["name"]),
        meta_fn=lambda fid: {"reg": ID_REG.get(id_iso_by_fid.get(fid)), "mac": ID_REG.get(id_iso_by_fid.get(fid))},
        tol_px=0.65,
        min_ring_px2=2.8,
        sea_nb=id_sea,
    )
    write_geo_js(os.path.join(OUT_DIR, "geo-indonesia.js"), "ID_GEO", id_geo)

    # 4. RUSYA (83 federal birim, 180° boylam sarmalı, UA ve belirsiz X01~ hariç)
    ru_feats = [
        f for f in raw
        if f["properties"].get("adm0_a3") == "RUS"
        and f["properties"].get("name")
        and str(f["properties"].get("iso_3166_2", "")).startswith("RU-")
    ]
    def ru_id(pr):
        iso = pr["iso_3166_2"].split("-")[1].lower()
        # NE'deki MOS=Moskva şehir / MOW=Moskova bölgesi ayrımını net tut
        if iso == "mos": return "ru-mow"  # Moskova şehri
        if iso == "mow": return "ru-mos"  # Moskova oblastı
        return "ru-" + iso
    ru_reg = {}
    for f in ru_feats:
        pr = f["properties"]
        ru_reg[ru_id(pr)] = slug(pr.get("region") or "other")
    # Kutuplardaki ıssız takımadaları (Franz Josef / Severnaya Zemlya lat > 77) gizle
    def ru_ring_ok(fid, ll):
        return min(p[1] for p in ll) < 77.2
    ru_geo = build_country_geo(
        ru_feats,
        id_fn=ru_id,
        meta_fn=lambda fid: {"reg": ru_reg.get(fid), "mac": ru_reg.get(fid)},
        tol_px=3.6,
        min_ring_px2=24.0,
        wrap360=True,
        filter_ring_fn=ru_ring_ok,
        sea_nb={"ru-sak": ["ru-kha", "ru-pri", "ru-kam"], "ru-kgd": ["ru-spe", "ru-psk"]},
    )
    write_geo_js(os.path.join(OUT_DIR, "geo-russia.js"), "RU_GEO", ru_geo)

    # 5. MEKSİKA (32 eyalet)
    mx_feats = [
        f for f in raw
        if f["properties"].get("adm0_a3") == "MEX"
        and f["properties"].get("name")
        and str(f["properties"].get("iso_3166_2", "")).startswith("MX-")
        and "~" not in str(f["properties"].get("iso_3166_2", ""))
    ]
    def mx_id(pr):
        code = pr["iso_3166_2"].split("-")[1].lower()
        return code
    mx_geo = build_country_geo(
        mx_feats,
        id_fn=mx_id,
        meta_fn=lambda fid: {"reg": MX_REG.get(fid), "mac": MX_REG.get(fid)},
        tol_px=0.9,
        min_ring_px2=4.0,
    )
    write_geo_js(os.path.join(OUT_DIR, "geo-mexico.js"), "MX_GEO", mx_geo)


if __name__ == "__main__":
    main()

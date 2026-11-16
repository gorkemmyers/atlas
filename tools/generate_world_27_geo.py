#!/usr/bin/env python3
"""27 yeni GeoGuessr ülkesi için js/geo-europe.js, js/geo-americas.js, js/geo-asia-new.js, js/geo-afroceania.js üretir."""
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
    s = (s or "").replace("ı", "i").replace("İ", "i").replace("ß", "ss").replace("ø", "o").replace("Ø", "o").replace("å", "a").replace("Å", "a").replace("æ", "ae").replace("Æ", "ae").replace("ł", "l").replace("Ł", "l")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def iso_tail(pr):
    iso = str(pr.get("iso_3166_2") or "")
    if "-" in iso and "~" not in iso:
        return slug(iso.split("-", 1)[1])
    return None


# Türkiye 81 il -> 7 Coğrafi Bölge
TR_REG = {
    "01": "akdeniz", "07": "akdeniz", "15": "akdeniz", "31": "akdeniz", "32": "akdeniz", "33": "akdeniz", "46": "akdeniz", "80": "akdeniz",
    "03": "ege", "09": "ege", "20": "ege", "35": "ege", "43": "ege", "45": "ege", "48": "ege", "64": "ege",
    "10": "marmara", "11": "marmara", "14": "marmara", "16": "marmara", "17": "marmara", "22": "marmara", "34": "marmara", "39": "marmara", "41": "marmara", "54": "marmara", "59": "marmara", "77": "marmara",
    "06": "ic-anadolu", "18": "ic-anadolu", "26": "ic-anadolu", "38": "ic-anadolu", "40": "ic-anadolu", "42": "ic-anadolu", "50": "ic-anadolu", "51": "ic-anadolu", "58": "ic-anadolu", "66": "ic-anadolu", "68": "ic-anadolu", "70": "ic-anadolu", "71": "ic-anadolu",
    "05": "karadeniz", "08": "karadeniz", "19": "karadeniz", "28": "karadeniz", "29": "karadeniz", "37": "karadeniz", "52": "karadeniz", "53": "karadeniz", "55": "karadeniz", "57": "karadeniz", "60": "karadeniz", "61": "karadeniz", "67": "karadeniz", "69": "karadeniz", "74": "karadeniz", "78": "karadeniz", "81": "karadeniz",
    "04": "dogu-anadolu", "12": "dogu-anadolu", "13": "dogu-anadolu", "23": "dogu-anadolu", "24": "dogu-anadolu", "25": "dogu-anadolu", "30": "dogu-anadolu", "36": "dogu-anadolu", "44": "dogu-anadolu", "49": "dogu-anadolu", "62": "dogu-anadolu", "65": "dogu-anadolu", "75": "dogu-anadolu", "76": "dogu-anadolu",
    "02": "guneydogu", "21": "guneydogu", "27": "guneydogu", "47": "guneydogu", "56": "guneydogu", "63": "guneydogu", "72": "guneydogu", "73": "guneydogu", "79": "guneydogu",
}


def write_multi_geo_js(path, entries):
    lines = ["/* Otomatik üretildi (tools/generate_world_27_geo.py) — Natural Earth 10m (kamu malı), sadeleştirilmiş. */"]
    for var_name, data in entries:
        lines.append(f"window.{var_name}=" + json.dumps(data, separators=(",", ":"), ensure_ascii=False) + ";")
    txt = "\n".join(lines) + "\n"
    with open(path, "w", encoding="utf-8") as fp:
        fp.write(txt)
    print(f"==> Wrote {os.path.basename(path)} ({len(entries)} countries, {len(txt)/1024:.1f} KB)")


def main():
    with open(NE_PATH, encoding="utf-8") as fp:
        raw = json.load(fp)["features"]

    by_adm0 = {}
    for f in raw:
        c = f["properties"].get("adm0_a3")
        by_adm0.setdefault(c, []).append(f)

    # =========================================================================
    # 1. AVRUPA VE AVRASYA (11 ÜLKE)
    # =========================================================================
    eu_entries = []

    # 1.1 TÜRKİYE (81 il)
    tr_geo = build_country_geo(
        by_adm0["TUR"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": TR_REG.get(fid, "ic-anadolu"), "mac": TR_REG.get(fid, "ic-anadolu")},
        tol_px=0.85,
        min_ring_px2=3.0,
        sea_nb={"34": ["16", "77"], "17": ["10", "22", "59"]},
    )
    eu_entries.append(("TR_GEO", tr_geo))

    # 1.2 ALMANYA (16 eyalet)
    de_reg = {
        "sh": "kuzey", "hh": "kuzey", "ni": "kuzey", "hb": "kuzey", "mv": "dogu",
        "be": "dogu", "bb": "dogu", "st": "dogu", "sn": "dogu", "th": "dogu",
        "nw": "bati", "he": "bati", "rp": "bati", "sl": "bati",
        "bw": "guney", "by": "guney",
    }
    de_geo = build_country_geo(
        by_adm0["DEU"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": de_reg.get(fid, "bati"), "mac": de_reg.get(fid, "bati")},
        tol_px=0.65,
        min_ring_px2=2.5,
    )
    eu_entries.append(("DE_GEO", de_geo))

    # 1.3 FRANSA (13 metropoliten bölge)
    fr_feats = [f for f in by_adm0["FRA"] if f["properties"].get("type_en") == "Metropolitan department"]
    fr_reg_map = {
        "ile-de-france": "01-idf",
        "normandie": "02-nw", "bretagne": "02-nw", "pays-de-la-loire": "02-nw", "centre-val-de-loire": "02-nw",
        "hauts-de-france": "03-ne", "grand-est": "03-ne", "bourgogne-franche-comte": "03-ne",
        "auvergne-rhone-alpes": "04-se", "provence-alpes-cote-d-azur": "04-se", "corse": "04-se",
        "nouvelle-aquitaine": "05-sw", "occitanie": "05-sw",
    }
    fr_geo = build_country_geo(
        fr_feats,
        id_fn=lambda pr: slug(pr.get("region")),
        meta_fn=lambda fid: {"reg": fr_reg_map.get(fid, "01-idf"), "mac": fr_reg_map.get(fid, "01-idf")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={"corse": ["provence-alpes-cote-d-azur"]},
    )
    eu_entries.append(("FR_GEO", fr_geo))

    # 1.4 İSPANYA (19 özerk bölge/şehir)
    es_zone = {
        "galicia": "kuzeybati", "asturias": "kuzeybati", "cantabria": "kuzey",
        "pais-vasco": "kuzey", "foral-de-navarra": "kuzey", "la-rioja": "kuzey",
        "aragon": "dogu", "cataluna": "dogu", "valenciana": "dogu", "islas-baleares": "dogu",
        "madrid": "merkez", "castilla-y-leon": "merkez", "castilla-la-mancha": "merkez", "extremadura": "merkez",
        "andalucia": "guney", "murcia": "guney", "ceuta": "guney", "melilla": "guney", "canary-is": "kanarya",
    }
    es_geo = build_country_geo(
        by_adm0["ESP"],
        id_fn=lambda pr: slug(pr.get("region")),
        meta_fn=lambda fid: {"reg": es_zone.get(fid, "merkez"), "mac": es_zone.get(fid, "merkez")},
        tol_px=0.65,
        min_ring_px2=2.5,
        fit_filter_fn=lambda fid, bb: fid != "canary-is",
        sea_nb={"islas-baleares": ["cataluna", "valenciana"], "ceuta": ["andalucia"], "melilla": ["andalucia"], "canary-is": ["andalucia"]},
    )
    eu_entries.append(("ES_GEO", es_geo))

    # 1.5 İTALYA (20 bölge)
    it_zone = {
        "piemonte": "kuzeybati", "valle-d-aosta": "kuzeybati", "liguria": "kuzeybati", "lombardia": "kuzeybati",
        "trentino-alto-adige": "kuzeydogu", "veneto": "kuzeydogu", "friuli-venezia-giulia": "kuzeydogu", "emilia-romagna": "kuzeydogu",
        "toscana": "merkez", "umbria": "merkez", "marche": "merkez", "lazio": "merkez",
        "abruzzo": "guney", "molise": "guney", "campania": "guney", "apulia": "guney", "basilicata": "guney", "calabria": "guney",
        "sicily": "adalar", "sardegna": "adalar",
    }
    it_geo = build_country_geo(
        by_adm0["ITA"],
        id_fn=lambda pr: slug(pr.get("region")),
        meta_fn=lambda fid: {"reg": it_zone.get(fid, "merkez"), "mac": it_zone.get(fid, "merkez")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={"sicily": ["calabria"], "sardegna": ["lazio", "toscana"]},
    )
    eu_entries.append(("IT_GEO", it_geo))

    # 1.6 BİRLEŞİK KRALLIK (16 ITL bölgesi)
    def gb_id(pr):
        gu = pr.get("gu_a3")
        reg = slug(pr.get("region"))
        if gu == "SCT":
            return "sct-" + reg
        if gu == "WLS":
            return "wls-" + reg
        if gu == "NIR":
            return "nir"
        return "eng-" + reg

    def gb_zone(fid):
        if fid.startswith("sct-"): return "iskocya"
        if fid.startswith("wls-"): return "galler"
        if fid == "nir": return "kuzey-irlanda"
        if fid in ("eng-north-east", "eng-north-west", "eng-yorkshire-and-the-humber"): return "kuzey-ingiltere"
        if fid in ("eng-east-midlands", "eng-west-midlands"): return "midlands"
        return "guney-ingiltere"

    gb_geo = build_country_geo(
        by_adm0["GBR"],
        id_fn=gb_id,
        meta_fn=lambda fid: {"reg": gb_zone(fid), "mac": gb_zone(fid)},
        tol_px=0.65,
        min_ring_px2=2.5,
        filter_ring_fn=lambda fid, ll: min(p[0] for p in ll) > -9.0,
        sea_nb={"nir": ["sct-south-western", "eng-north-west", "wls-west-wales-and-the-valleys"]},
    )
    eu_entries.append(("GB_GEO", gb_geo))

    # 1.7 POLONYA (16 voyvodalık)
    pl_zone = {
        "zp": "kuzey", "pm": "kuzey", "wn": "kuzey", "kp": "kuzey",
        "lb": "bati", "wp": "bati", "ds": "bati", "op": "bati",
        "mz": "merkez-dogu", "ld": "merkez-dogu", "pd": "merkez-dogu", "lu": "merkez-dogu",
        "sl": "guney", "ma": "guney", "pk": "guney", "sk": "guney",
    }
    pl_geo = build_country_geo(
        by_adm0["POL"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": pl_zone.get(fid, "merkez-dogu"), "mac": pl_zone.get(fid, "merkez-dogu")},
        tol_px=0.65,
        min_ring_px2=2.5,
    )
    eu_entries.append(("PL_GEO", pl_geo))

    # 1.8 İSVEÇ (21 län)
    se_zone = {
        "m": "gotaland", "k": "gotaland", "g": "gotaland", "h": "gotaland", "i": "gotaland",
        "n": "gotaland", "f": "gotaland", "e": "gotaland", "o": "gotaland",
        "ab": "svealand", "c": "svealand", "d": "svealand", "u": "svealand", "t": "svealand", "s": "svealand", "w": "svealand",
        "x": "norrland", "y": "norrland", "z": "norrland", "ac": "norrland", "bd": "norrland",
    }
    se_geo = build_country_geo(
        by_adm0["SWE"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": se_zone.get(fid, "svealand"), "mac": se_zone.get(fid, "svealand")},
        tol_px=0.75,
        min_ring_px2=3.0,
        sea_nb={"i": ["h", "ab"]},
    )
    eu_entries.append(("SE_GEO", se_geo))

    # 1.9 NORVEÇ (18 anakara fylke)
    no_feats = [f for f in by_adm0["NOR"] if iso_tail(f["properties"]) and iso_tail(f["properties"]) != "21"]
    no_zone = {
        "01": "ostlandet", "02": "ostlandet", "03": "ostlandet", "04": "ostlandet",
        "05": "ostlandet", "06": "ostlandet", "07": "ostlandet", "08": "ostlandet",
        "09": "sorlandet", "10": "sorlandet",
        "11": "vestlandet", "12": "vestlandet", "14": "vestlandet", "15": "vestlandet",
        "16": "trondelag", "17": "trondelag",
        "18": "nord-norge", "19": "nord-norge", "20": "nord-norge",
    }
    no_geo = build_country_geo(
        no_feats,
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": no_zone.get(fid, "ostlandet"), "mac": no_zone.get(fid, "ostlandet")},
        tol_px=0.85,
        min_ring_px2=4.0,
        filter_ring_fn=lambda fid, ll: min(p[0] for p in ll) > 3.5,
    )
    eu_entries.append(("NO_GEO", no_geo))

    # 1.10 ROMANYA (42 județ)
    ro_zone = {
        "ab": "transilvanya", "bv": "transilvanya", "bn": "transilvanya", "cj": "transilvanya", "cv": "transilvanya",
        "hr": "transilvanya", "hd": "transilvanya", "mm": "transilvanya", "ms": "transilvanya", "sj": "transilvanya",
        "sb": "transilvanya", "sm": "transilvanya", "bh": "bati-banat", "ar": "bati-banat", "tm": "bati-banat", "cs": "bati-banat",
        "bc": "moldova", "bt": "moldova", "gl": "moldova", "is": "moldova", "nt": "moldova", "sv": "moldova", "vs": "moldova", "vn": "moldova",
        "dj": "oltenia", "gj": "oltenia", "mh": "oltenia", "ot": "oltenia", "vl": "oltenia",
    }
    ro_geo = build_country_geo(
        by_adm0["ROU"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ro_zone.get(fid, "muntenia-dobruca"), "mac": ro_zone.get(fid, "muntenia-dobruca")},
        tol_px=0.65,
        min_ring_px2=2.5,
    )
    eu_entries.append(("RO_GEO", ro_geo))

    # 1.11 UKRAYNA (25 oblast/bölge)
    ua_zone = {
        "07": "bati", "21": "bati", "26": "bati", "46": "bati", "56": "bati", "61": "bati", "68": "bati", "77": "bati",
        "05": "merkez-kuzey", "18": "merkez-kuzey", "30": "merkez-kuzey", "32": "merkez-kuzey", "71": "merkez-kuzey", "74": "merkez-kuzey",
        "12": "dinyeper-kuzeydogu", "35": "dinyeper-kuzeydogu", "53": "dinyeper-kuzeydogu", "59": "dinyeper-kuzeydogu", "63": "dinyeper-kuzeydogu",
        "09": "guney-dogu", "14": "guney-dogu", "23": "guney-dogu", "48": "guney-dogu", "51": "guney-dogu", "65": "guney-dogu",
    }
    ua_geo = build_country_geo(
        by_adm0["UKR"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ua_zone.get(fid, "merkez-kuzey"), "mac": ua_zone.get(fid, "merkez-kuzey")},
        tol_px=0.75,
        min_ring_px2=3.0,
    )
    eu_entries.append(("UA_GEO", ua_geo))

    write_multi_geo_js(os.path.join(OUT_DIR, "geo-europe.js"), eu_entries)

    # =========================================================================
    # 2. AMERİKA KITASI (6 ÜLKE: US, CA, AR, CL, CO, PE)
    # =========================================================================
    am_entries = []

    # 2.1 ABD (51 eyalet/DC)
    us_reg = {}
    for f in by_adm0["USA"]:
        pr = f["properties"]
        us_reg[iso_tail(pr)] = slug(pr.get("region") or "west")
    us_geo = build_country_geo(
        by_adm0["USA"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": us_reg.get(fid, "west"), "mac": us_reg.get(fid, "west")},
        tol_px=1.6,
        min_ring_px2=8.0,
        filter_ring_fn=lambda fid, ll: max(p[0] for p in ll) < 0.0,  # Aleutian batı yarımküre sınırı
        fit_filter_fn=lambda fid, bb: fid not in ("ak", "hi"),
        sea_nb={"ak": ["wa"], "hi": ["ca"]},
    )
    am_entries.append(("US_GEO", us_geo))

    # 2.2 KANADA (13 eyalet/toprak)
    ca_reg = {}
    for f in by_adm0["CAN"]:
        pr = f["properties"]
        ca_reg[iso_tail(pr)] = slug(pr.get("region") or "western-canada")
    ca_geo = build_country_geo(
        by_adm0["CAN"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ca_reg.get(fid, "western-canada"), "mac": ca_reg.get(fid, "western-canada")},
        tol_px=2.2,
        min_ring_px2=16.0,
        filter_ring_fn=lambda fid, ll: min(p[1] for p in ll) < 76.0,
        fit_filter_fn=lambda fid, bb: fid not in ("nu",),
        sea_nb={"pe": ["nb", "ns"], "nl": ["qc", "ns"]},
    )
    am_entries.append(("CA_GEO", ca_geo))

    # 2.3 ARJANTİN (24 eyalet)
    ar_zone = {
        "c": "pampa", "b": "pampa", "s": "pampa", "e": "pampa", "x": "pampa", "l": "pampa",
        "n": "nea", "w": "nea", "h": "nea", "p": "nea",
        "t": "noa", "a": "noa", "y": "noa", "k": "noa", "g": "noa", "f": "noa",
        "m": "cuyo", "j": "cuyo", "d": "cuyo",
        "q": "patagonya", "r": "patagonya", "u": "patagonya", "z": "patagonya", "v": "patagonya",
    }
    ar_geo = build_country_geo(
        by_adm0["ARG"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ar_zone.get(fid, "pampa"), "mac": ar_zone.get(fid, "pampa")},
        tol_px=1.1,
        min_ring_px2=5.0,
        sea_nb={"v": ["z"]},
    )
    am_entries.append(("AR_GEO", ar_geo))

    # 2.4 ŞİLİ (16 bölge)
    cl_zone = {
        "ap": "norte-grande", "ta": "norte-grande", "an": "norte-grande",
        "at": "norte-chico", "co": "norte-chico",
        "vs": "zona-central", "rm": "zona-central", "li": "zona-central", "ml": "zona-central", "nb": "zona-central", "bi": "zona-central",
        "ar": "zona-sur", "lr": "zona-sur", "ll": "zona-sur",
        "ai": "zona-austral", "ma": "zona-austral",
    }
    cl_geo = build_country_geo(
        by_adm0["CHL"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": cl_zone.get(fid, "zona-central"), "mac": cl_zone.get(fid, "zona-central")},
        tol_px=1.0,
        min_ring_px2=4.5,
        filter_ring_fn=lambda fid, ll: min(p[0] for p in ll) > -77.0,  # Paskalya Adası / Juan Fernandez hariç
    )
    am_entries.append(("CL_GEO", cl_geo))

    # 2.5 KOLOMBİYA (33 departman/DC)
    def co_id(pr):
        if not pr.get("name") or "~" in str(pr.get("iso_3166_2") or ""):
            return None
        if pr.get("type_en") == "Federal District":
            return "dc"
        return iso_tail(pr)

    co_zone = {
        "atl": "karayip", "bol": "karayip", "ces": "karayip", "cor": "karayip", "lag": "karayip", "mag": "karayip", "suc": "karayip", "sap": "karayip",
        "ant": "and-kuzey", "san": "and-kuzey", "nsa": "and-kuzey", "boy": "and-merkez", "cun": "and-merkez", "dc": "and-merkez", "tol": "and-merkez", "hui": "and-merkez",
        "cal": "kahve-bati", "ris": "kahve-bati", "qui": "kahve-bati", "vac": "kahve-bati", "cau": "kahve-bati", "nar": "kahve-bati", "cho": "kahve-bati",
        "ara": "llanos-amazon", "cas": "llanos-amazon", "met": "llanos-amazon", "vid": "llanos-amazon", "gua": "llanos-amazon", "guv": "llanos-amazon", "vau": "llanos-amazon", "caq": "llanos-amazon", "put": "llanos-amazon", "ama": "llanos-amazon",
    }
    co_geo = build_country_geo(
        by_adm0["COL"],
        id_fn=co_id,
        meta_fn=lambda fid: {"reg": co_zone.get(fid, "and-merkez"), "mac": co_zone.get(fid, "and-merkez")},
        tol_px=0.85,
        min_ring_px2=3.5,
        fit_filter_fn=lambda fid, bb: fid != "sap",
        sea_nb={"sap": ["bol", "atl"]},
    )
    am_entries.append(("CO_GEO", co_geo))

    # 2.6 PERU (26 bölge)
    def pe_id(pr):
        if pr.get("name") == "Lima Province":
            return "lma"
        return iso_tail(pr)

    pe_zone = {
        "tum": "kuzey", "piu": "kuzey", "lam": "kuzey", "lal": "kuzey", "caj": "kuzey", "ama": "kuzey", "sam": "kuzey",
        "anc": "merkez", "lim": "merkez", "lma": "merkez", "cal": "merkez", "ica": "merkez", "huc": "merkez", "pas": "merkez", "jun": "merkez", "huv": "merkez",
        "aya": "guney", "apu": "guney", "cus": "guney", "are": "guney", "moq": "guney", "tac": "guney", "pun": "guney",
        "lor": "selva", "uca": "selva", "mdd": "selva",
    }
    pe_geo = build_country_geo(
        by_adm0["PER"],
        id_fn=pe_id,
        meta_fn=lambda fid: {"reg": pe_zone.get(fid, "merkez"), "mac": pe_zone.get(fid, "merkez")},
        tol_px=0.85,
        min_ring_px2=3.5,
    )
    am_entries.append(("PE_GEO", pe_geo))

    write_multi_geo_js(os.path.join(OUT_DIR, "geo-americas.js"), am_entries)

    # =========================================================================
    # 3. ASYA YENİ ÜLKELER (5 ÜLKE: KR, TH, PH, MY, TW)
    # =========================================================================
    as_entries = []

    # 3.1 GÜNEY KORE (17 il/büyükşehir)
    kr_zone = {
        "11": "sudogwon", "28": "sudogwon", "41": "sudogwon", "42": "gangwon",
        "30": "hoseo", "43": "hoseo", "44": "hoseo", "50": "hoseo",
        "29": "honam", "45": "honam", "46": "honam", "49": "jeju",
        "26": "yeongnam", "27": "yeongnam", "31": "yeongnam", "47": "yeongnam", "48": "yeongnam",
    }
    kr_geo = build_country_geo(
        by_adm0["KOR"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": kr_zone.get(fid, "sudogwon"), "mac": kr_zone.get(fid, "sudogwon")},
        tol_px=0.45,
        min_ring_px2=1.8,
        sea_nb={"49": ["46", "26"]},
    )
    as_entries.append(("KR_GEO", kr_geo))

    # 3.2 TAYLAND (77 il)
    th_reg = {}
    for f in by_adm0["THA"]:
        pr = f["properties"]
        th_reg[iso_tail(pr)] = slug(pr.get("region") or "central")
    th_geo = build_country_geo(
        by_adm0["THA"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": th_reg.get(fid, "central"), "mac": th_reg.get(fid, "central")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={"83": ["82", "81"]},
    )
    as_entries.append(("TH_GEO", th_geo))

    # 3.3 FİLİPİNLER (17 idari bölge)
    ph_id_map = {
        "National Capital Region": "ncr",
        "Cordillera Administrative Region (CAR)": "car",
        "Ilocos (Region I)": "reg-1",
        "Cagayan Valley (Region II)": "reg-2",
        "Central Luzon (Region III)": "reg-3",
        "CALABARZON (Region IV-A)": "reg-4a",
        "MIMAROPA (Region IV-B)": "reg-4b",
        "Bicol (Region V)": "reg-5",
        "Western Visayas (Region VI)": "reg-6",
        "Central Visayas (Region VII)": "reg-7",
        "Eastern Visayas (Region VIII)": "reg-8",
        "Zamboanga Peninsula (Region IX)": "reg-9",
        "Northern Mindanao (Region X)": "reg-10",
        "Davao (Region XI)": "reg-11",
        "SOCCSKSARGEN (Region XII)": "reg-12",
        "Dinagat Islands (Region XIII)": "reg-13",
        "Autonomous Region in Muslim Mindanao (ARMM)": "barmm",
    }
    ph_zone = {
        "ncr": "luzon", "car": "luzon", "reg-1": "luzon", "reg-2": "luzon", "reg-3": "luzon", "reg-4a": "luzon", "reg-4b": "luzon", "reg-5": "luzon",
        "reg-6": "visayas", "reg-7": "visayas", "reg-8": "visayas",
        "reg-9": "mindanao", "reg-10": "mindanao", "reg-11": "mindanao", "reg-12": "mindanao", "reg-13": "mindanao", "barmm": "mindanao",
    }
    ph_geo = build_country_geo(
        by_adm0["PHL"],
        id_fn=lambda pr: ph_id_map.get(pr.get("region")),
        meta_fn=lambda fid: {"reg": ph_zone.get(fid, "luzon"), "mac": ph_zone.get(fid, "luzon")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={
            "reg-4b": ["reg-4a", "reg-6"],
            "reg-5": ["reg-8"],
            "reg-6": ["reg-7", "reg-4b"],
            "reg-7": ["reg-6", "reg-8", "reg-10"],
            "reg-8": ["reg-5", "reg-7", "reg-13"],
            "barmm": ["reg-9", "reg-10", "reg-12"],
        },
    )
    as_entries.append(("PH_GEO", ph_geo))

    # 3.4 MALEZYA (16 eyalet/FT)
    my_zone = {
        "09": "kuzey-yarimada", "02": "kuzey-yarimada", "07": "kuzey-yarimada", "08": "kuzey-yarimada",
        "10": "merkez-guney", "14": "merkez-guney", "16": "merkez-guney", "05": "merkez-guney", "04": "merkez-guney", "01": "merkez-guney",
        "03": "dogu-kiyisi", "11": "dogu-kiyisi", "06": "dogu-kiyisi",
        "12": "borneo", "13": "borneo", "15": "borneo",
    }
    my_geo = build_country_geo(
        by_adm0["MYS"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": my_zone.get(fid, "merkez-guney"), "mac": my_zone.get(fid, "merkez-guney")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={"07": ["02"], "15": ["12", "13"], "01": ["13"]},
    )
    as_entries.append(("MY_GEO", my_geo))

    # 3.5 TAYVAN (21 il/belediye)
    tw_zone = {
        "tpe": "kuzey", "tpq": "kuzey", "kee": "kuzey", "tao": "kuzey", "hsq": "kuzey", "hsz": "kuzey", "ila": "kuzey",
        "mia": "merkez", "txg": "merkez", "cha": "merkez", "nan": "merkez", "yun": "merkez",
        "cyq": "guney", "cyi": "guney", "tnn": "guney", "khh": "guney", "pif": "guney",
        "hua": "dogu-adalar", "ttt": "dogu-adalar", "pen": "dogu-adalar", "kin": "dogu-adalar",
    }
    tw_geo = build_country_geo(
        by_adm0["TWN"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": tw_zone.get(fid, "kuzey"), "mac": tw_zone.get(fid, "kuzey")},
        tol_px=0.45,
        min_ring_px2=1.5,
        fit_filter_fn=lambda fid, bb: fid not in ("kin",),
        sea_nb={"pen": ["cyq", "tnn"], "kin": ["pen", "tpe"]},
    )
    as_entries.append(("TW_GEO", tw_geo))

    write_multi_geo_js(os.path.join(OUT_DIR, "geo-asia-new.js"), as_entries)

    # =========================================================================
    # 4. AFRİKA VE OKYANUSYA (5 ÜLKE: ZA, NG, KE, AU, NZ)
    # =========================================================================
    ao_entries = []

    # 4.1 GÜNEY AFRİKA (9 eyalet)
    za_zone = {
        "wc": "kap", "ec": "kap", "nc": "kap",
        "fs": "plato", "nw": "plato", "gt": "plato",
        "nl": "dogu-kuzey", "mp": "dogu-kuzey", "lp": "dogu-kuzey",
    }
    za_geo = build_country_geo(
        by_adm0["ZAF"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": za_zone.get(fid, "plato"), "mac": za_zone.get(fid, "plato")},
        tol_px=0.85,
        min_ring_px2=3.5,
        filter_ring_fn=lambda fid, ll: min(p[1] for p in ll) > -36.0,
    )
    ao_entries.append(("ZA_GEO", za_geo))

    # 4.2 NİJERYA (37 eyalet/FCT)
    ng_zone = {
        "la": "south-west", "og": "south-west", "oy": "south-west", "os": "south-west", "on": "south-west", "ek": "south-west",
        "ed": "south-south", "de": "south-south", "by": "south-south", "ri": "south-south", "ak": "south-south", "cr": "south-south",
        "en": "south-east", "an": "south-east", "im": "south-east", "ab": "south-east", "eb": "south-east",
        "fc": "north-central", "ni": "north-central", "kw": "north-central", "ko": "north-central", "be": "north-central", "pl": "north-central", "na": "north-central",
        "kd": "north-west", "kn": "north-west", "kt": "north-west", "kc": "north-west", "so": "north-west", "ke": "north-west", "za": "north-west", "ji": "north-west",
        "ba": "north-east", "go": "north-east", "yo": "north-east", "bo": "north-east", "ad": "north-east", "ta": "north-east",
    }
    ng_geo = build_country_geo(
        by_adm0["NGA"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ng_zone.get(fid, "north-central"), "mac": ng_zone.get(fid, "north-central")},
        tol_px=0.75,
        min_ring_px2=3.0,
    )
    ao_entries.append(("NG_GEO", ng_geo))

    # 4.3 KENYA (8 bölge)
    ke_zone = {
        "110": "merkez-rift", "200": "merkez-rift", "700": "merkez-rift",
        "600": "bati-golu", "800": "bati-golu",
        "300": "dogu-sahil", "400": "dogu-sahil", "500": "dogu-sahil",
    }
    ke_geo = build_country_geo(
        by_adm0["KEN"],
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": ke_zone.get(fid, "merkez-rift"), "mac": ke_zone.get(fid, "merkez-rift")},
        tol_px=0.75,
        min_ring_px2=3.0,
    )
    ao_entries.append(("KE_GEO", ke_geo))

    # 4.4 AVUSTRALYA (8 eyalet ve ana bölge)
    au_feats = [f for f in by_adm0["AUS"] if iso_tail(f["properties"])]
    au_zone = {
        "nsw": "dogu", "act": "dogu", "vic": "guneydogu", "tas": "guneydogu",
        "qld": "kuzeydogu", "sa": "merkez-bati", "wa": "merkez-bati", "nt": "merkez-bati",
    }
    au_geo = build_country_geo(
        au_feats,
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": au_zone.get(fid, "dogu"), "mac": au_zone.get(fid, "dogu")},
        tol_px=1.6,
        min_ring_px2=8.0,
        filter_ring_fn=lambda fid, ll: max(p[0] for p in ll) < 155.0,
        sea_nb={"tas": ["vic"]},
    )
    ao_entries.append(("AU_GEO", au_geo))

    # 4.5 YENİ ZELANDA (16 bölge)
    nz_feats = [
        f for f in by_adm0["NZL"]
        if iso_tail(f["properties"]) and f["properties"].get("region") in ("North Island", "South Island")
    ]
    nz_reg = {}
    for f in nz_feats:
        pr = f["properties"]
        nz_reg[iso_tail(pr)] = slug(pr.get("region"))
    nz_geo = build_country_geo(
        nz_feats,
        id_fn=lambda pr: iso_tail(pr),
        meta_fn=lambda fid: {"reg": nz_reg.get(fid, "north-island"), "mac": nz_reg.get(fid, "north-island")},
        tol_px=0.65,
        min_ring_px2=2.5,
        sea_nb={"wgn": ["mbh", "nsn"]},
    )
    ao_entries.append(("NZ_GEO", nz_geo))

    write_multi_geo_js(os.path.join(OUT_DIR, "geo-afroceania.js"), ao_entries)


if __name__ == "__main__":
    main()

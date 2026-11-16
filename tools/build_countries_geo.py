#!/usr/bin/env python3
"""Natural Earth 10m Admin-1 GeoJSON'dan ortak topolojili sadeleştirilmiş SVG harita üretici.
Çıktı biçimi js/geom.js ve js/map.js ile %100 uyumludur (AS_GEO şeması).
"""
import argparse
import json
import math
import heapq
import os
import sys
from collections import defaultdict, Counter

R2D = 180.0 / math.pi
D2R = math.pi / 180.0


def merc_deg(lat):
    c = max(-85.0, min(85.0, lat))
    return math.log(math.tan(math.pi / 4.0 + c * D2R / 2.0)) * R2D


def fmt(v):
    r = round(v, 1)
    if r == 0.0:
        return "0"
    s = f"{r:.1f}"
    return s[:-2] if s.endswith(".0") else s


def join_rel_steps(steps):
    out = []
    for i, val in enumerate(steps):
        s = fmt(val)
        if i > 0 and not s.startswith("-"):
            out.append(" " + s)
        else:
            out.append(s)
    return "".join(out)


def encode_ring(pts):
    if len(pts) < 3:
        return ""
    x0, y0 = round(pts[0][0], 1), round(pts[0][1], 1)
    cx, cy = x0, y0
    steps = []
    for px, py in pts[1:]:
        nx, ny = round(px, 1), round(py, 1)
        dx, dy = round(nx - cx, 1), round(ny - cy, 1)
        if dx == 0.0 and dy == 0.0:
            continue
        steps.append(dx)
        steps.append(dy)
        cx, cy = round(cx + dx, 1), round(cy + dy, 1)
    if len(steps) < 4:
        return ""
    return f"M{fmt(x0)} {fmt(y0)}l{join_rel_steps(steps)}z"


def encode_open_chain(pts):
    if len(pts) < 2:
        return ""
    x0, y0 = round(pts[0][0], 1), round(pts[0][1], 1)
    cx, cy = x0, y0
    steps = []
    for px, py in pts[1:]:
        nx, ny = round(px, 1), round(py, 1)
        dx, dy = round(nx - cx, 1), round(ny - cy, 1)
        if dx == 0.0 and dy == 0.0:
            continue
        steps.append(dx)
        steps.append(dy)
        cx, cy = round(cx + dx, 1), round(cy + dy, 1)
    if len(steps) < 2:
        return ""
    return f"M{fmt(x0)} {fmt(y0)}l{join_rel_steps(steps)}"


def poly_area_signed(pts):
    a = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        a += x1 * y2 - x2 * y1
    return 0.5 * a


def centroid_ring(pts):
    a2 = 0.0
    cx = 0.0
    cy = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        c = x1 * y2 - x2 * y1
        a2 += c
        cx += (x1 + x2) * c
        cy += (y1 + y2) * c
    if abs(a2) < 1e-9:
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        return (sum(xs) / len(xs), sum(ys) / len(ys))
    return (cx / (3.0 * a2), cy / (3.0 * a2))


def pt_seg_dist2(px, py, ax, ay, bx, by):
    dx = bx - ax
    dy = by - ay
    if dx != 0.0 or dy != 0.0:
        t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
        if t > 1.0:
            ax, ay = bx, by
        elif t > 0.0:
            ax += dx * t
            ay += dy * t
    return (px - ax) ** 2 + (py - ay) ** 2


def pip_rings(x, y, rings):
    inside = False
    for r in rings:
        n = len(r)
        j = n - 1
        for i in range(n):
            xi, yi = r[i]
            xj, yj = r[j]
            if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / ((yj - yi) or 1e-18) + xi):
                inside = not inside
            j = i
    return inside


def pt_to_poly_dist(x, y, rings):
    inside = pip_rings(x, y, rings)
    d2 = float("inf")
    for r in rings:
        n = len(r)
        j = n - 1
        for i in range(n):
            val = pt_seg_dist2(x, y, r[i][0], r[i][1], r[j][0], r[j][1])
            if val < d2:
                d2 = val
            j = i
    d = math.sqrt(d2)
    return d if inside else -d


def polylabel(rings, precision=0.5):
    outer = rings[0]
    xs = [p[0] for p in outer]
    ys = [p[1] for p in outer]
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    w = maxx - minx
    h = maxy - miny
    cell_size = min(w, h)
    if cell_size <= 0:
        return [round(minx, 1), round(miny, 1), 1.0]
    h_size = cell_size / 2.0
    sqrt2 = math.sqrt(2.0)

    def make_cell(cx, cy, ch):
        dist = pt_to_poly_dist(cx, cy, rings)
        mx = dist + ch * sqrt2
        return (-mx, cx, cy, ch, dist)

    best_cx, best_cy = centroid_ring(outer)
    best_dist = pt_to_poly_dist(best_cx, best_cy, rings)
    bb_cx, bb_cy = (minx + maxx) / 2.0, (miny + maxy) / 2.0
    bb_dist = pt_to_poly_dist(bb_cx, bb_cy, rings)
    if bb_dist > best_dist:
        best_cx, best_cy, best_dist = bb_cx, bb_cy, bb_dist

    pq = []
    x = minx
    while x < maxx:
        y = miny
        while y < maxy:
            heapq.heappush(pq, make_cell(x + h_size, y + h_size, h_size))
            y += cell_size
        x += cell_size

    while pq:
        neg_mx, cx, cy, ch, dist = heapq.heappop(pq)
        mx = -neg_mx
        if dist > best_dist:
            best_cx, best_cy, best_dist = cx, cy, dist
        if mx - best_dist <= precision:
            continue
        nh = ch / 2.0
        for dx, dy in ((-nh, -nh), (nh, -nh), (-nh, nh), (nh, nh)):
            heapq.heappush(pq, make_cell(cx + dx, cy + dy, nh))

    return [round(best_cx, 1), round(best_cy, 1), round(max(0.5, best_dist), 1)]


def dp_simplify(pts, eps):
    """Iterative Douglas-Peucker keeping endpoints exact."""
    n = len(pts)
    if n <= 2:
        return list(pts)
    eps2 = eps * eps
    keep = bytearray(n)
    keep[0] = 1
    keep[-1] = 1
    stack = [(0, n - 1)]
    while stack:
        a, b = stack.pop()
        if b - a <= 1:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        max_d2 = -1.0
        idx = -1
        for i in range(a + 1, b):
            d2 = pt_seg_dist2(pts[i][0], pts[i][1], ax, ay, bx, by)
            if d2 > max_d2:
                max_d2 = d2
                idx = i
        if max_d2 > eps2 and idx != -1:
            keep[idx] = 1
            stack.append((a, idx))
            stack.append((idx, b))
    return [pts[i] for i in range(n) if keep[i]]


def spherical_ring_km2(lonlat_ring):
    """Approximate spherical area of a lon/lat ring in km^2."""
    R = 6371.0088
    if len(lonlat_ring) < 3:
        return 0.0
    total = 0.0
    n = len(lonlat_ring)
    for i in range(n):
        lon1, lat1 = lonlat_ring[i]
        lon2, lat2 = lonlat_ring[(i + 1) % n]
        total += (lon2 - lon1) * D2R * (2.0 + math.sin(lat1 * D2R) + math.sin(lat2 * D2R))
    return abs(total * R * R / 2.0)


def build_country_geo(
    raw_features,
    id_fn,
    meta_fn,
    tol_px=0.55,
    min_ring_px2=2.0,
    wrap360=False,
    filter_ring_fn=None,
    fit_filter_fn=None,
    sea_nb=None,
):
    """
    raw_features: list of GeoJSON Feature dicts for one country/region.
    id_fn(props): returns canonical lowercase ASCII id string (or None to skip).
    meta_fn(fid): returns {"reg": ..., "mac": ...} optional grouping for rg/mc meshes.
    wrap360: if True (Russia), shifts negative longitudes < 0 by +360.
    filter_ring_fn(fid, lonlats): optional predicate to drop far offshore specks.
    fit_filter_fn(fid, bb): optional predicate to exclude tiny outer islands from initial fit bbox.
    """
    K = 100.0
    quant = 100000  # 1e-5 deg

    def qpt(lon, lat):
        if wrap360 and lon < 0:
            lon += 360.0
        return (round(lon * quant), round(lat * quant))

    def clean_ring(coords):
        out = []
        for c in coords:
            qp = qpt(c[0], c[1])
            if not out or out[-1] != qp:
                out.append(qp)
        if len(out) > 1 and out[0] == out[-1]:
            out.pop()
        return out

    # Step 1: collect cleaned rings per feature in quantized lon/lat
    feat_polys = defaultdict(list)  # fid -> list of (outer_qp, [hole_qp...])
    feat_ll_area = defaultdict(float)

    for f in raw_features:
        pr = f["properties"]
        fid = id_fn(pr)
        if not fid:
            continue
        geom = f["geometry"]
        if not geom:
            continue
        polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
        for poly in polys:
            if not poly:
                continue
            outer = clean_ring(poly[0])
            if len(outer) < 3:
                continue
            ll_outer = [(x / quant, y / quant) for x, y in outer]
            if filter_ring_fn and not filter_ring_fn(fid, ll_outer):
                continue
            holes = []
            h_area = 0.0
            for hr in poly[1:]:
                ch = clean_ring(hr)
                if len(ch) >= 3:
                    ll_h = [(x / quant, y / quant) for x, y in ch]
                    holes.append(ch)
                    h_area += spherical_ring_km2(ll_h)
            feat_ll_area[fid] += max(0.0, spherical_ring_km2(ll_outer) - h_area)
            feat_polys[fid].append((outer, holes))

    # Step 1b: Dissolve shared internal edges when multiple sub-features map to the same fid
    def dissolve_fid_polys(plist):
        if len(plist) <= 1:
            return plist
        edge_counts = Counter()
        for outer, holes in plist:
            o = list(outer)
            if poly_area_signed(o) < 0:
                o.reverse()
            for i in range(len(o)):
                u, v = o[i], o[(i + 1) % len(o)]
                if u != v:
                    edge_counts[(u, v)] += 1
            for h in holes:
                hr = list(h)
                if poly_area_signed(hr) > 0:
                    hr.reverse()
                for i in range(len(hr)):
                    u, v = hr[i], hr[(i + 1) % len(hr)]
                    if u != v:
                        edge_counts[(u, v)] += 1
        out_adj = defaultdict(list)
        for (u, v), c in list(edge_counts.items()):
            rem = c - edge_counts.get((v, u), 0)
            if rem > 0:
                for _ in range(rem):
                    out_adj[u].append(v)
        outers = []
        holes = []
        for start in list(out_adj.keys()):
            while out_adj[start]:
                curr = out_adj[start].pop()
                ring = [start, curr]
                while curr != start:
                    nxt = out_adj.get(curr)
                    if not nxt:
                        break
                    if start in nxt and len(ring) >= 3:
                        nxt.remove(start)
                        curr = start
                    else:
                        curr = nxt.pop()
                    ring.append(curr)
                if ring[-1] == start and len(ring) >= 4:
                    ring.pop()
                    sa = poly_area_signed(ring)
                    if abs(sa) > 0:
                        if sa > 0:
                            outers.append((abs(sa), ring))
                        else:
                            holes.append(ring)
        if not outers:
            return plist
        outers.sort(key=lambda x: x[0])
        out_with_holes = [[o, []] for _, o in outers]
        for h in holes:
            hx, hy = h[0]
            for o_ring, h_list in out_with_holes:
                if pip_rings(hx, hy, [o_ring]):
                    h_list.append(h)
                    break
        return [(o, h_list) for o, h_list in out_with_holes]

    for fid in list(feat_polys.keys()):
        if len(feat_polys[fid]) > 1:
            feat_polys[fid] = dissolve_fid_polys(feat_polys[fid])

    # Determine LON0 and yTop cleanly from extent
    all_lons = []
    all_lats = []
    for fid, plist in feat_polys.items():
        for outer, _ in plist:
            for qx, qy in outer:
                all_lons.append(qx / quant)
                all_lats.append(qy / quant)
    lon0 = math.floor(min(all_lons) - 1.0)
    top_lat = min(84.8, max(all_lats) + 1.0)
    y_top = merc_deg(top_lat)

    def to_xy(qx, qy):
        lon = qx / quant
        lat = qy / quant
        return ((lon - lon0) * K, (y_top - merc_deg(lat)) * K)

    # Filter micro islands AFTER seeing projected area, ALWAYS keep largest outer ring per fid
    kept_polys = {}
    for fid, plist in feat_polys.items():
        scored = []
        for outer, holes in plist:
            xy_o = [to_xy(qx, qy) for qx, qy in outer]
            area_px2 = abs(poly_area_signed(xy_o))
            scored.append((area_px2, outer, holes))
        scored.sort(key=lambda x: x[0], reverse=True)
        out_list = []
        for idx, (area_px2, outer, holes) in enumerate(scored):
            if idx == 0 or area_px2 >= min_ring_px2:
                kept_holes = []
                for h_ring in holes:
                    xy_h = [to_xy(qx, qy) for qx, qy in h_ring]
                    if abs(poly_area_signed(xy_h)) >= min_ring_px2:
                        kept_holes.append(h_ring)
                out_list.append((outer, kept_holes))
        kept_polys[fid] = out_list

    # Step 2: Junction detection across ALL kept rings for exact shared topology
    adj = defaultdict(set)
    all_rings = []  # (fid, is_hole, ring_qpts)
    for fid, plist in kept_polys.items():
        for outer, holes in plist:
            all_rings.append((fid, False, outer))
            for hr in holes:
                all_rings.append((fid, True, hr))

    for _, _, r in all_rings:
        n = len(r)
        for i in range(n):
            a = r[i]
            b = r[(i + 1) % n]
            adj[a].add(b)
            adj[b].add(a)

    junctions = {v for v, nbs in adj.items() if len(nbs) != 2}

    # Step 3: Decompose every ring into canonical arcs between junctions
    canonical_arcs = {}  # canon_key -> {"pts": list_qpts, "owners": set(fid)}
    ring_arc_refs = []   # (fid, is_hole, [(canon_key, rev_bool), ...])

    for fid, is_hole, r in all_rings:
        n = len(r)
        # Rotate ring to start at a junction, or canonical minimum vertex if isolated loop
        j_indices = [i for i, v in enumerate(r) if v in junctions]
        if j_indices:
            start_i = j_indices[0]
            rot = r[start_i:] + r[:start_i]
            breaks = [i for i, v in enumerate(rot) if v in junctions]
            breaks.append(len(rot))
            pieces = []
            for k in range(len(breaks) - 1):
                i0, i1 = breaks[k], breaks[k + 1]
                seg = rot[i0 : i1 + 1] if i1 < len(rot) else rot[i0:] + [rot[0]]
                pieces.append(seg)
        else:
            # Isolated loop (e.g. island or pure enclave without junctions): break at canonical min & max vertices
            min_i = min(range(n), key=lambda i: r[i])
            max_i = max(range(n), key=lambda i: r[i])
            if min_i == max_i:
                max_i = (min_i + 1) % n
            i0, i1 = (min_i, max_i) if min_i < max_i else (max_i, min_i)
            pieces = [r[i0 : i1 + 1], r[i1:] + r[: i0 + 1]]

        refs = []
        for seg in pieces:
            if len(seg) < 2:
                continue
            fwd = tuple(seg)
            rev = tuple(reversed(seg))
            if fwd <= rev:
                key = (fwd[0], fwd[-1], len(fwd), fwd[1], fwd[-2])
                # Handle rare hash collisions by using full tuple key
                ckey = fwd
                is_rev = False
            else:
                ckey = rev
                is_rev = True
            if ckey not in canonical_arcs:
                canonical_arcs[ckey] = {"qpts": ckey, "owners": set()}
            canonical_arcs[ckey]["owners"].add(fid)
            refs.append((ckey, is_rev))
        ring_arc_refs.append((fid, is_hole, refs))

    # Step 4: Project & simplify each canonical arc ONCE
    simp_arcs = {}
    for ckey, info in canonical_arcs.items():
        xy_pts = [to_xy(qx, qy) for qx, qy in info["qpts"]]
        if len(xy_pts) > 3:
            simp_arcs[ckey] = dp_simplify(xy_pts, tol_px)
        else:
            simp_arcs[ckey] = xy_pts

    # Step 5: Reconstruct simplified rings per feature, verify non-degeneracy, compute bb/lp/c/d
    feat_rings_xy = defaultdict(list)  # fid -> list of {"outer": xy, "holes": [xy...]}
    poly_map = defaultdict(list)  # (fid, ring_idx) -> rebuilt xy

    # Preserve grouping into (outer, holes) by scanning kept_polys order in ring_arc_refs
    ref_iter = iter(ring_arc_refs)
    for fid, plist in kept_polys.items():
        for outer, holes in plist:
            def rebuild(refs):
                pts = []
                for ckey, is_rev in refs:
                    spts = simp_arcs[ckey]
                    seq = list(reversed(spts)) if is_rev else spts
                    if not pts:
                        pts.extend(seq)
                    else:
                        pts.extend(seq[1:])
                if len(pts) > 1 and pts[0] == pts[-1]:
                    pts.pop()
                return pts

            _, _, o_refs = next(ref_iter)
            o_xy = rebuild(o_refs)
            h_xys = []
            for _ in holes:
                _, _, h_refs = next(ref_iter)
                h_xy = rebuild(h_refs)
                if len(h_xy) >= 3:
                    h_xys.append(h_xy)
            if len(o_xy) >= 3:
                feat_rings_xy[fid].append((o_xy, h_xys))

    # Build neighbor graph from shared arcs
    nb_map = defaultdict(set)
    for ckey, info in canonical_arcs.items():
        owners = list(info["owners"])
        if len(owners) >= 2:
            for a in owners:
                for b in owners:
                    if a != b:
                        nb_map[a].add(b)
    if sea_nb:
        for a, bs in sea_nb.items():
            if a in feat_rings_xy:
                for b in bs:
                    if b in feat_rings_xy and b != a:
                        nb_map[a].add(b)
                        nb_map[b].add(a)

    # Compute per-feature output object
    p_out = {}
    gx0, gy0, gx1, gy1 = float("inf"), float("inf"), float("-inf"), float("-inf")
    fx0, fy0, fx1, fy1 = float("inf"), float("inf"), float("-inf"), float("-inf")

    for fid, poly_list in sorted(feat_rings_xy.items()):
        subpaths = []
        f_minx, f_miny, f_maxx, f_maxy = float("inf"), float("inf"), float("-inf"), float("-inf")
        best_poly = None
        best_area = -1.0

        for o_xy, h_xys in poly_list:
            d_o = encode_ring(o_xy)
            if not d_o:
                continue
            subpaths.append(d_o)
            for h_xy in h_xys:
                d_h = encode_ring(h_xy)
                if d_h:
                    subpaths.append(d_h)
            for px, py in o_xy:
                if px < f_minx: f_minx = px
                if px > f_maxx: f_maxx = px
                if py < f_miny: f_miny = py
                if py > f_maxy: f_maxy = py
            a = abs(poly_area_signed(o_xy))
            if a > best_area:
                best_area = a
                best_poly = [o_xy] + h_xys

        bb = [round(f_minx, 1), round(f_miny, 1), round(f_maxx, 1), round(f_maxy, 1)]
        gx0 = min(gx0, bb[0]); gy0 = min(gy0, bb[1])
        gx1 = max(gx1, bb[2]); gy1 = max(gy1, bb[3])
        if fit_filter_fn is None or fit_filter_fn(fid, bb):
            fx0 = min(fx0, bb[0]); fy0 = min(fy0, bb[1])
            fx1 = max(fx1, bb[2]); fy1 = max(fy1, bb[3])

        lp = polylabel(best_poly, precision=0.5)
        cx, cy = centroid_ring(best_poly[0])
        p_out[fid] = {
            "d": "".join(subpaths),
            "bb": bb,
            "lp": lp,
            "c": [round(cx, 1), round(cy, 1)],
            "ar": max(1, round(feat_ll_area[fid])),
            "nb": sorted(nb_map.get(fid, ())),
        }

    if fx0 == float("inf"):
        fx0, fy0, fx1, fy1 = gx0, gy0, gx1, gy1

    # Step 6: Build topological boundary meshes (in, rg, mc, co) and merge contiguous chains
    mesh_buckets = {"in": [], "rg": [], "mc": [], "co": []}
    for ckey, info in canonical_arcs.items():
        owners = sorted(info["owners"])
        pts = simp_arcs[ckey]
        if len(pts) < 2:
            continue
        if len(owners) == 1:
            mesh_buckets["co"].append(pts)
        else:
            mesh_buckets["in"].append(pts)
            if meta_fn:
                regs = {meta_fn(fid).get("reg") for fid in owners}
                macs = {meta_fn(fid).get("mac") for fid in owners}
                if len(regs) > 1:
                    mesh_buckets["rg"].append(pts)
                if len(macs) > 1:
                    mesh_buckets["mc"].append(pts)

    def chain_paths(chains):
        # Stitch chains sharing endpoints to cut SVG 'M' count
        unused = [list(c) for c in chains if len(c) >= 2]
        by_end = defaultdict(list)
        for idx, c in enumerate(unused):
            by_end[(round(c[0][0], 1), round(c[0][1], 1))].append((idx, False))
            by_end[(round(c[-1][0], 1), round(c[-1][1], 1))].append((idx, True))
        used = [False] * len(unused)
        out_cmds = []
        for idx in range(len(unused)):
            if used[idx]:
                continue
            used[idx] = True
            cur = list(unused[idx])
            # extend forward
            while True:
                tail = (round(cur[-1][0], 1), round(cur[-1][1], 1))
                nxt = None
                for cand_i, at_end in by_end.get(tail, ()):
                    if not used[cand_i]:
                        nxt = (cand_i, at_end)
                        break
                if not nxt:
                    break
                used[nxt[0]] = True
                seg = unused[nxt[0]]
                if nxt[1]:
                    seg = list(reversed(seg))
                cur.extend(seg[1:])
            # extend backward
            while True:
                head = (round(cur[0][0], 1), round(cur[0][1], 1))
                nxt = None
                for cand_i, at_end in by_end.get(head, ()):
                    if not used[cand_i]:
                        nxt = (cand_i, at_end)
                        break
                if not nxt:
                    break
                used[nxt[0]] = True
                seg = unused[nxt[0]]
                if not nxt[1]:
                    seg = list(reversed(seg))
                cur = seg[:-1] + cur
            cmd = encode_open_chain(cur)
            if cmd:
                out_cmds.append(cmd)
        return "".join(out_cmds)

    m_out = {k: chain_paths(v) for k, v in mesh_buckets.items()}

    return {
        "v": 1,
        "K": int(K),
        "lon0": lon0,
        "yTop": y_top,
        "bbox": [round(gx0, 1), round(gy0, 1), round(gx1, 1), round(gy1, 1)],
        "fit": [round(fx0, 1), round(fy0, 1), round(fx1, 1), round(fy1, 1)],
        "p": p_out,
        "m": m_out,
    }

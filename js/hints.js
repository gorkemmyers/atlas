/* hints.js — İpucu motoru: her soru için adım adım (2–5 adım), cevabı sızdırmayan ipuçları üretir.
   Bir adım: { k: etiket, t: metin, ids?: haritada vurgulanacak iller } */
(function (g) {
  'use strict';
  var D = g.VN_DATA, G = g.VN_GEO, Nm = g.Names, B = g.Bank;
  var P = D.provinces, pBy = D.pById;

  var DIRS = ['doğu', 'kuzeydoğu', 'kuzey', 'kuzeybatı', 'batı', 'güneybatı', 'güney', 'güneydoğu'];
  var MAC = { N: 'KUZEY', C: 'ORTA', S: 'GÜNEY' };
  var MACV = { N: 'Bắc Bộ', C: 'Trung Bộ', S: 'Nam Bộ' };
  var short = function (o) { return o.vi.replace(/^TP\.\s*/, ''); };
  var A0 = function (a) { return '0' + a; };

  /* ---------- bağlam ---------- */
  function ctx(id) {
    var o = pBy[id];
    return { id: id, layer: 'old', o: o, lead: o };
  }
  function nbOf(c) { return G.p[c.id].nb.slice(); }
  function namesOf(ids) { return ids.map(function (i) { return short(pBy[i]); }); }
  function dir(aId, bId) {
    var a = G.p[aId].c, b = G.p[bId].c;
    var ang = Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180 / Math.PI;
    return DIRS[Math.round(((ang + 360) % 360) / 45) % 8];
  }
  function idsInRegion(rid) {
    return P.filter(function (x) { return x.region === rid; }).map(function (x) { return x.id; });
  }
  function idsInMacro(m) {
    return P.filter(function (x) { return x.macro === m; }).map(function (x) { return x.id; });
  }

  /* ---------- adım üreticileri ---------- */
  /* ad: hece çözümlemesi + desen, ardından kural */
  function nameSteps(c) {
    var i = Nm.info(c.id);
    if (!i) return [];
    var f = Nm.famById[i.fam];
    var sy = i.syl.map(function (s) { return s[0] + ' = ' + s[1]; }).join(' · ');
    return [
      { k: 'Ad deseni', t: 'Heceler: ' + sy + '. Desen: ' + f.label + '.' },
      { k: 'Ad mantığı', t: i.tell + (i.dis ? ' (köken tartışmalı)' : '') }
    ];
  }
  function macroStep(c) {
    var o = c.o;
    return { k: 'Kesim', t: 'Bu il ülkenin ' + MAC[o.macro] + ' kesiminde (' + MACV[o.macro] + ').', ids: idsInMacro(o.macro, c.layer), layer: c.layer };
  }
  function regionStep(c) {
    var r = D.regionById[c.o.region];
    return { k: 'Bölge', t: 'Bölge: ' + r.tr + ' (' + r.vi + ').', ids: idsInRegion(r.id, c.layer), layer: c.layer };
  }
  /* kesim + bölge tek adımda */
  function mrStep(c) {
    var o = c.o, r = D.regionById[o.region];
    return { k: 'Bölge', t: MAC[o.macro] + ' kesim (' + MACV[o.macro] + ') · ' + r.tr + ' (' + r.vi + ').', ids: idsInRegion(r.id, c.layer), layer: c.layer };
  }
  function nbStep(c, label) {
    var ids = nbOf(c);
    return { k: label || 'Komşular', t: 'Komşuları: ' + namesOf(ids, c.layer).slice(0, 5).join(', ') + (ids.length > 5 ? ' …' : '.'), ids: ids, layer: c.layer };
  }
  function cueStep(c) {
    var cue = c.lead.cue;
    return { k: 'Yer ipucu', t: cue };
  }
  function lettersStep(label, name) {
    var w = String(name).split(/\s+/).length;
    return { k: 'Harfler', t: label + Nm.letters(name) + (w > 1 ? ' (' + w + ' sözcük)' : '') };
  }
  /* alan kodu ailesi */
  function famLine(area) {
    var k = area.slice(0, 2), s = null;
    Nm.AREA.sweep.forEach(function (x) { if (x.k === k) s = x; });
    return { k: k, s: s, label: k + (k === '24' || k === '28' ? '' : 'x') };
  }
  function areaFamStep(c) {
    var f = famLine(c.o.area);
    var ids = P.filter(function (x) { return x.area.slice(0, 2) === f.k; }).map(function (x) { return x.id; });
    var t = 'Alan kodu ailesi ' + f.label + ' → ' + f.s.t + ' (' + f.s.n + ').';
    return { k: 'Alan kodu', t: t, ids: ids, layer: c.layer };
  }
  function numericOwners() {
    var rows = [];
    P.forEach(function (p) { if (p.area.length === 3) rows.push([+p.area, p.id, p.area]); });
    rows.sort(function (a, b) { return a[0] - b[0]; });
    return rows;
  }
  /* sayısal komşu kodlar: kod → [alt, üst] (hedef ilin kendi kodları hariç) */
  function nearSteps(kind, pid, code) {
    var rows = numericOwners(), v = +code, lo = null, hi = null;
    rows.forEach(function (r) {
      if (r[1] === pid) return;
      if (r[0] < v) lo = r;
      if (r[0] > v && !hi) hi = r;
    });
    var fmt = function (r) { return A0(r[2]) + ' = ' + short(pBy[r[1]]); };
    if (!lo && !hi) return [];
    var t = lo && hi ? 'Komşu kodlar: ' + fmt(lo) + ' ile ' + fmt(hi) + ' arasında.' : 'Komşu kod: ' + fmt(lo || hi) + '.';
    return [{ k: 'Alan kodu', t: t, ids: [lo, hi].filter(Boolean).map(function (r) { return r[1]; }), layer: 'old' }];
  }
  /* merdiven: hedef il maskeli */
  function ladderStep(kind, pid, code, hideCode) {
    var lads = Nm.AREA.ladders, hit = null;
    lads.forEach(function (l) { if (l.codes.indexOf(code) >= 0) hit = l; });
    if (!hit) {
      if (Nm.AREA.swap.codes.indexOf(code) >= 0) return { k: 'Merdiven', t: 'Bu kod, kıyıdaki SIRASI TERS olan bir çiftin parçası: kuzeydeki ilin kodu güneydekinden büyük.', ids: Nm.AREA.swap.ids, layer: 'old' };
      return null;
    }
    var parts = hit.codes.map(function (cd, i) {
      var id = hit.ids[i], me = id === pid, c0 = A0(cd);
      if (hideCode) return (me ? c0.replace(/\d/g, '?') : c0) + ' ' + short(pBy[id]);
      return c0 + ' ' + (me ? '???' : short(pBy[id]));
    });
    return { k: 'Merdiven', t: 'Kuzeyden güneye sıralı: ' + parts.join(' → ') + '.', ids: hit.ids, layer: 'old' };
  }
  function placeCueStep(place) {
    var w = D.norm(String(place).split(/[\s–-]+/)[0]), hit = null;
    Nm.PLACE_CUES.forEach(function (c) { if (!hit && c.re.test(w)) hit = c; });
    if (!hit) return null;
    var ids = hit.regions ? hit.regions.reduce(function (a, r) { return a.concat(idsInRegion(r, 'old')); }, []) : (hit.half === 'N' ? Nm.NORTH : Nm.SOUTH).reduce(function (a, r) { return a.concat(idsInRegion(r, 'old')); }, []);
    return { k: 'Yer adı', t: hit.t, ids: ids, layer: 'old' };
  }

  /* ---------- çıktı hazırlama: maskeleme + sadeleştirme ---------- */
  function finish(steps, hide, opt) {
    opt = opt || {};
    var out = [];
    steps.forEach(function (s) {
      if (!s || !s.t) return;
      var t = hide && hide.length ? Nm.maskText(s.t, hide) : s.t;
      var body = t.indexOf(':') >= 0 ? t.slice(t.indexOf(':') + 1) : t;
      if (!/[A-Za-z0-9\u00C0-\u1EF9]/.test(body)) return;
      var o = { k: s.k, t: t };
      if (s.ids && s.ids.length) { o.ids = s.ids; o.layer = s.layer || 'old'; }
      out.push(o);
    });
    return out;
  }
  function variantsFor(objs) {
    var v = [];
    objs.forEach(function (o) { if (o) v = v.concat(Nm.variantsOf(o)); });
    return v;
  }
  function capVariants(p) {
    var v = [p.cap];
    p.cap.split(/\s*[–-]\s*/).forEach(function (x) { v.push(x); });
    return v;
  }

  /* ---------- soru türüne göre ipuçları ---------- */
  var BUILD = {
    loc: function (q, rest) {
      var c = ctx(rest, 'old');
      return finish(nameSteps(c).concat([mrStep(c), nbStep(c)]), null);
    },
    ident: function (q, rest) {
      var c = ctx(rest, 'old');
      return finish([mrStep(c), nbStep(c), areaFamStep(c), cueStep(c), q.mode === 'text' || q.mode === 'mc' ? lettersStep('Cevabın harfleri: ', c.o.vi.replace(/^TP\.\s*/, '')) : null], variantsFor([c.o]));
    },
    nb: function (q, rest) {
      var c = ctx(rest, 'old'), right = q.correct && pBy[q.correct] ? q.correct : null;
      var steps = nameSteps(c);
      if (right) {
        var r = D.regionById[pBy[right].region];
        steps.push({ k: 'Yön', t: 'Doğru komşu, bu ilin ' + dir(c.id, right) + ' yönünde.', ids: [c.id], layer: 'old' });
        steps.push({ k: 'Bölge', t: 'Doğru komşu şu bölgede: ' + r.tr + '.', ids: idsInRegion(r.id, 'old'), layer: 'old' });
      } else steps.push(mrStep(c));
      return finish(steps, right ? variantsFor([pBy[right]]) : null);
    },
    a2p: function (q, rest) {
      var c = ctx(rest, 'old'), area = c.o.area, steps = [areaFamStep(c)];
      var lad = area.length === 3 ? ladderStep('area', c.id, area) : null;
      if (lad) steps.push(lad); else if (area.length === 3) steps = steps.concat(nearSteps('area', c.id, area));
      else steps.push({ k: 'Alan kodu', t: 'İki haneli kod: yalnızca iki büyük şehir (24 ve 28) iki hanelidir; ikisi de eski kodunun başına 2 eklenmiş hali.' });
      steps.push(mrStep(c), cueStep(c));
      if (q.mode !== 'map') steps.push(lettersStep('Cevabın harfleri: ', short(c.o)));
      return finish(steps, variantsFor([c.o]));
    },
    p2a: function (q, rest) {
      var c = ctx(rest, 'old'), area = c.o.area, steps = nameSteps(c);
      if (area.length === 2) {
        steps.push({ k: 'Alan kodu', t: 'İki haneli kod: yalnızca iki büyük şehrin kodu iki hanelidir (eski kodlarının başına 2 eklenmiş).' });
        return finish(steps, null);
      }
      steps.push(areaFamStep(c));
      var lad = ladderStep('area', c.id, area, true);
      if (lad) steps.push(lad); else steps = steps.concat(nearSteps('area', c.id, area));
      return finish(steps, null);
    },
    reg: function (q, rest) {
      var c = ctx(rest, 'old'), steps = nameSteps(c);
      steps.push(macroStep(c), nbStep(c), areaFamStep(c));
      return finish(steps, null);
    },
    regloc: function (q, rest) {
      var r = D.regionById[rest], gl = Nm.GLOSS.filter(function (x) { return x.id === r.id; })[0];
      var ids = idsInRegion(r.id, 'old'), steps = [];
      if (gl) steps.push({ k: 'Ad çözümü', t: gl.vi + ' = ' + gl.parts.map(function (x) { return x[0] + ' (' + x[1] + ')'; }).join(' + ') + ' → ' + gl.tr + '.' });
      steps.push({ k: 'Bölge', t: r.cue.split('. ')[0].replace(/\.$/, '') + '.' });
      var fam = {}; ids.forEach(function (id) { fam[pBy[id].area.slice(0, 2)] = 1; });
      steps.push({ k: 'Alan kodu', t: 'Bölgedeki illerin alan kodu aileleri: ' + Object.keys(fam).map(function (k) { return k + (k === '24' || k === '28' ? '' : 'x'); }).join(', ') + '.' });
      steps.push({ k: 'Örnek il', t: 'Bölgeden bir il: ' + short(pBy[ids[0]]) + '.', ids: [ids[0]], layer: 'old' });
      return finish(steps, null);
    },
    plc: function (q, rest) {
      var m = /^(.+)#(\d+)$/.exec(rest), c = ctx(m[1], 'old'), place = c.o.places[+m[2]];
      var steps = [placeCueStep(place), mrStep(c), nbStep(c), areaFamStep(c), cueStep(c)];
      if (q.mode !== 'map') steps.push(lettersStep('Cevabın harfleri: ', short(c.o)));
      return finish(steps, variantsFor([c.o]));
    },
    cap: function (q, rest) {
      var c = ctx(rest, 'old'), steps = [mrStep(c), nbStep(c), areaFamStep(c), cueStep(c)];
      if (q.mode !== 'map') steps.push(lettersStep('Cevabın harfleri: ', short(c.o)));
      return finish(steps, variantsFor([c.o]));
    },
    p2cap: function (q, rest) {
      var c = ctx(rest, 'old'), steps = nameSteps(c);
      steps.push(mrStep(c), { k: 'Yer ipucu', t: c.o.cue }, lettersStep('Merkezin harfleri: ', c.o.cap));
      return finish(steps, capVariants(c.o));
    },
    nm2m: function (q, rest) {
      var c = ctx(rest, 'old'), steps = nameSteps(c), fam = Nm.famOf(rest);
      var mates = Nm.famIds(fam.id).filter(function (i) { return i !== rest; });
      if (mates.length && fam.id !== 'wish') steps.push({ k: 'Aynı aile', t: 'Aynı desenden iller: ' + namesOf(mates.slice(0, 5), 'old').join(', ') + (mates.length > 5 ? ' …' : '.'), ids: mates, layer: 'old' });
      steps.push(nbStep(c));
      return finish(steps, null);
    },
    syl: function (q, rest) {
      var it = Nm.sylqById[rest];
      if (!it) return [];
      var steps = [{ k: 'Örnek il', t: 'Örneklerden birini haritada düşün: ' + short(pBy[it.ids[0]]) + '.', ids: [it.ids[0]], layer: 'old' }];
      if (it.ids.length > 1) steps.push({ k: 'Örnekler', t: 'Bu desendeki iller: ' + namesOf(it.ids.slice(0, 5), 'old').join(', ') + '.', ids: it.ids, layer: 'old' });
      steps.push({ k: 'Kural', t: it.why });
      return finish(steps, null);
    }
  };

  function forQuestion(q) {
    if (!q || !q.key) return [];
    var ix = q.key.indexOf(':'), kind = q.key.slice(0, ix), rest = q.key.slice(ix + 1);
    var fn = BUILD[kind];
    if (!fn) return [];
    var steps = [];
    try { steps = fn(q, rest); } catch (e) { steps = []; }
    return steps;
  }

  /* ---------- Simülasyon: ipucu türüne göre ---------- */
  /* type: 'phone' | 'sign' | 'note' ; ex: { place } */
  function forClue(type, pid, ex) {
    ex = ex || {};
    var c = ctx(pid, 'old'), p = c.o, steps = [];
    if (type === 'phone') {
      steps = [areaFamStep(c)];
      var ld = p.area.length === 3 ? ladderStep('area', pid, p.area) : null;
      if (ld) steps.push(ld); else if (p.area.length === 3) steps = steps.concat(nearSteps('area', pid, p.area));
      steps.push(mrStep(c), nbStep(c, 'Çevre'));
    } else if (type === 'sign') {
      steps = [placeCueStep(ex.place || ''), mrStep(c), nbStep(c, 'Çevre'), areaFamStep(c)];
    } else {
      steps = [mrStep(c), areaFamStep(c), nbStep(c, 'Çevre')];
    }
    return finish(steps, variantsFor([p]));
  }

  g.Hints = { forQuestion: forQuestion, forClue: forClue, dir: dir, BUILD: BUILD };
})(typeof window !== 'undefined' ? window : globalThis);

#!/usr/bin/env node
/* verify-photos.mjs — fotoğraf kayıt defterini (js/photos.js) Wikimedia Commons'a karşı denetler.

   İNTERNET GEREKİR (Node 18+). Kullanım:   node tools/verify-photos.mjs [--no-url]
   Kontrol eder:
     HATA   · dosya Commons'ta yok ya da yeniden adlandırılmış (yönlendirme)
     HATA   · lisans kayıttakiyle aynı değil, ya da kabul edilen lisanslardan değil (CC0, kamu malı, CC BY, CC BY-SA)
     HATA   · uygulamanın kullandığı Special:FilePath adresi yüklenmiyor (--no-url ile atlanır)
     UYARI  · yazar kayıttakiyle uyuşmuyor · görüntü 600 px'ten dar (plaka kırpıntıları için normal) · doğrulama düzeyi 'goz' değil
   Bu betik ALT YAZININ GÖRÜNTÜYLE UYUŞTUĞUNU denetleyemez; o iş gözle yapılır (KURALLAR.md §9).
   Wikimedia kullanım ilkesi gereği istekler açıklayıcı bir User-Agent taşır; istersen ATLAS_UA ortam değişkeniyle değiştir. */
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const UA = process.env.ATLAS_UA || 'AtlasPhotoCheck/1.0 (kisisel GeoGuessr calisma uygulamasi; Node fetch)';
const API = 'https://commons.wikimedia.org/w/api.php';
const OK_LIC = /^(cc0|public domain|pd[- ]|pdm|cc by(-sa)? \d(\.\d)?$)/i;

function loadRegistry() {
  globalThis.window = globalThis;                       // photos.js bir IIFE'dir ve window'a yazar
  require(path.join(here, '..', 'js', 'photos.js'));
  const P = globalThis.PHOTOS;
  if (!P || typeof P !== 'object') throw new Error('js/photos.js içinden PHOTOS okunamadı');
  return Object.keys(P).map(function (k) { return { k: k, f: P[k].f, by: P[k].by, lic: P[k].lic, v: P[k].v, d: P[k].d, crop: P[k].crop, marks: P[k].marks }; });
}
const strip = function (s) { return String(s || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, ' ').trim(); };
const norm = function (s) { return strip(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ''); };
const fileUrl = function (f, w) { return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f.replace(/ /g, '_')).replace(/%2F/g, '/') + '?width=' + (w || 960); };

export async function main(fetchImpl, opts) {
  const f = fetchImpl || globalThis.fetch;
  const checkUrl = !(opts && opts.noUrl);
  const P = loadRegistry();
  const errors = [], warns = [];
  const meta = {};

  for (let i = 0; i < P.length; i += 20) {
    const chunk = P.slice(i, i + 20);
    const titles = chunk.map(function (p) { return 'File:' + p.f.replace(/_/g, ' '); });
    const url = API + '?format=json&action=query&redirects=1&prop=imageinfo&iiprop=extmetadata|size&iiextmetadatafilter=Artist|LicenseShortName&titles=' + encodeURIComponent(titles.join('|'));
    const res = await f(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error('Commons API ' + res.status + ' döndürdü (ağ/engel?)');
    const q = (await res.json()).query || {};
    const normed = {}; (q.normalized || []).forEach(function (n) { normed[n.from] = n.to; });
    const redir = {};  (q.redirects || []).forEach(function (n) { redir[n.from] = n.to; });
    const byTitle = {}; Object.keys(q.pages || {}).forEach(function (id) { byTitle[q.pages[id].title] = q.pages[id]; });
    chunk.forEach(function (p, idx) {
      var t = titles[idx]; t = normed[t] || t;
      var renamed = !!redir[t]; t = redir[t] || t;
      var pg = byTitle[t], ii = pg && pg.imageinfo && pg.imageinfo[0], em = (ii && ii.extmetadata) || {};
      meta[p.k] = ii ? { w: ii.width, h: ii.height, by: strip(em.Artist && em.Artist.value), lic: strip(em.LicenseShortName && em.LicenseShortName.value), renamed: renamed } : null;
    });
  }

  P.forEach(function (p) {
    var m = meta[p.k];
    if (!m) { errors.push(p.k + ': Commons\'ta dosya yok → ' + p.f); return; }
    if (m.renamed) errors.push(p.k + ': dosya yeniden adlandırılmış (yönlendirme) → kayıttaki adı güncelle: ' + p.f);
    if (m.lic.toLowerCase() !== String(p.lic).toLowerCase()) errors.push(p.k + ': lisans farklı → kayıt "' + p.lic + '" · Commons "' + m.lic + '"');
    if (!OK_LIC.test(m.lic)) errors.push(p.k + ': kabul edilmeyen lisans "' + m.lic + '" (yalnız CC0, kamu malı, CC BY, CC BY-SA)');
    var a = norm(m.by), b = norm(p.by);
    if (!(a.indexOf(b) >= 0 || b.indexOf(a) >= 0)) warns.push(p.k + ': yazar farklı → kayıt "' + p.by + '" · Commons "' + m.by.slice(0, 80) + '"');
    /* kırpma/işaret için özgün boyut (d) ZORUNLU ve Commons'taki gerçek boyutla aynı olmalı; yoksa kırpma yanlış yere düşer */
    if ((p.crop || (p.marks && p.marks.length)) && !p.d) errors.push(p.k + ': crop/marks var ama d=[genişlik,yükseklik] yok');
    if (p.d && (p.d[0] !== m.w || p.d[1] !== m.h)) errors.push(p.k + ': d farklı → kayıt ' + p.d[0] + '×' + p.d[1] + ' · Commons ' + m.w + '×' + m.h);
    if (m.w < 600) warns.push(p.k + ': görüntü dar (' + m.w + '×' + m.h + ' px) — plaka/levha kırpıntısıysa ve okunuyorsa kabul');
    if (p.v && p.v !== 'goz') warns.push(p.k + ': doğrulama düzeyi "' + p.v + '" (yayından önce gözle kontrol edip "goz" yap)');
  });

  if (checkUrl) {
    for (let i = 0; i < P.length; i += 6) {
      await Promise.all(P.slice(i, i + 6).map(async function (p) {
        if (!meta[p.k]) return;
        try {
          var r = await f(fileUrl(p.f, 960), { method: 'HEAD', redirect: 'follow', headers: { 'User-Agent': UA } });
          var ct = (r.headers && r.headers.get && r.headers.get('content-type')) || '';
          if (!r.ok || ct.indexOf('image/') !== 0) errors.push(p.k + ': uygulamanın kullandığı adres yüklenmiyor (' + r.status + ' ' + ct + ')');
        } catch (e) { errors.push(p.k + ': adres hatası → ' + e.message); }
      }));
    }
  }

  warns.forEach(function (w) { console.log('uyarı  ' + w); });
  errors.forEach(function (e) { console.log('HATA   ' + e); });
  console.log('\n' + P.length + ' fotoğraf denetlendi. ' + (errors.length ? errors.length + ' HATA' : 'Hata yok') + ' (' + warns.length + ' uyarı)' + (errors.length ? ' ✘' : ' ✔'));
  return { errors: errors, warns: warns, total: P.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(undefined, { noUrl: process.argv.indexOf('--no-url') >= 0 }).then(
    function (r) { process.exit(r.errors.length ? 1 : 0); },
    function (e) { console.error('Denetim yapılamadı: ' + e.message); process.exit(2); });
}

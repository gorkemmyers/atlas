/* view-overview.js — bölgenin genel bakışı: çalışma alanları ve önerilen sıra (kayıttan kurulur) */
(function (g) {
  'use strict';
  var U = g.U, UI = g.UI, R = g.Regions, h = U.h;

  var GROUP_TAG = { discover: 'Harita', learn: 'Konu', train: 'Uygulama' };

  function mount(root, app) {
    var r = app.region, pr = R.progress(r);
    var inn = h('div', { 'class': 'page-in' });
    root.appendChild(h('div', { 'class': 'page tone-' + r.tone, id: 'overview', 'data-region': r.id }, inn));

    inn.appendChild(h('header', { 'class': 'ov-head' },
      h('div', { 'class': 'ov-t' },
        h('div', { 'class': 'ov-eyebrow' }, h('i', { 'class': 'rbadge tone-' + r.tone }, r.code), h('span', {}, r.area)),
        h('h1', {}, r.name),
        h('p', { 'class': 'lead' }, r.blurb),
        h('span', { 'class': 'rg-prog' },
          h('span', { 'class': 'bar' }, h('i', { style: { width: Math.round(pr.mean * 100) + '%' } })),
          h('small', {}, pr.seen ? U.fmtInt(pr.seen) + ' / ' + U.fmtInt(pr.total) + ' öğe görüldü · ' + U.fmtInt(pr.mastered) + ' tanesi ustalık' : 'Henüz başlamadın'))),
      h('div', { 'class': 'ov-sil' }, R.silhouette(r))));

    /* bölge notu: bölgenin verisini etkileyen güncel bir durum (örn. idari birleşme) */
    if (r.note && r.note.text) {
      inn.appendChild(h('aside', { 'class': 'ov-note', role: 'note' },
        h('b', {}, r.note.title || 'Bilgi'), h('p', {}, r.note.text)));
    }

    var secs = r.sections.filter(function (x) { return x.id !== 'genel' && (!x.hidden || x.ov); });
    var learnSecs = secs.filter(function (x) { return x.group !== 'train'; });
    var trainSecs = secs.filter(function (x) { return x.group === 'train'; });

    function rowEl(x) {
      var tag = GROUP_TAG[x.group] || '';
      return h('a', { 'class': 'ov-row', href: '#' + R.hash(r.id, x.id), 'data-id': x.id, 'data-group': x.group || '' },
        h('span', { 'class': 'ov-ic' }, UI.icon(x.icon, 22)),
        h('span', { 'class': 'ov-tx' },
          h('b', {}, x.label, tag ? h('span', { 'class': 'ov-tag ov-tag-' + x.group }, tag) : null),
          h('small', {}, x.desc)),
        UI.icon('chev', 20));
    }

    /* çalışma alanları: her iki bölgede de aynı iki aşamalı yapı (Harita & Konular + Pratik & Simülasyon) */
    inn.appendChild(UI.sec('Harita ve konu rehberleri',
      h('nav', { 'class': 'ov-list', 'aria-label': r.name + ' konu rehberleri' }, learnSecs.map(rowEl))));

    if (trainSecs.length) {
      inn.appendChild(UI.sec('Alıştırma, simülasyon ve ilerleme',
        h('nav', { 'class': 'ov-list ov-list-train', 'aria-label': r.name + ' uygulama alanları' }, trainSecs.map(rowEl))));
    }

    /* önerilen sıra: gerçek bir sıra olduğu için numaralı */
    if (r.plan && r.plan.length) {
      inn.appendChild(UI.sec('Önerilen çalışma sırası',
        h('ol', { 'class': 'flow ov-plan' }, r.plan.map(function (st, i) {
          return h('li', { 'class': 'flow-i' },
            h('span', { 'class': 'flow-n' }, String(i + 1)),
            h('a', { 'class': 'flow-b flow-link', href: '#' + R.hash(r.id, st.to), onclick: function () { if (st.launch) app.launch = st.launch; } },
              h('b', {}, st.title), h('p', {}, st.text)));
        }))));
    }

    var ovAd = g.Ads && g.Ads.slot('overviewEnd');
    if (ovAd) inn.appendChild(ovAd);

    inn.appendChild(UI.siteFooter());

    return { destroy: function () { } };
  }

  g.Views = g.Views || {};
  g.Views.overview = { mount: mount };
})(typeof window !== 'undefined' ? window : globalThis);

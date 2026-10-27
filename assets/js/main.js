/* Horus Asset Management — interactions shared by all pages */
(function () {
  'use strict';
  const D = window.HORUS_DATA || {};
  const CFG = window.HORUS_CONFIG || {};
  const I = window.HORUS_I18N || { lang: 'en', t: (k, f) => f };
  const T = (k, f) => I.t(k, f);
  const lang = () => I.lang;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onLang = fn => document.addEventListener('horus:lang', fn);

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const fmtPct = (v, d = 1) => {
    const s = (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(d);
    return (lang() === 'fr' ? s.replace('.', ',') + ' %' : s + '%');
  };
  const fmtMoney = v => {
    const n = Math.round(Math.abs(v)).toLocaleString(lang() === 'fr' ? 'fr-FR' : 'en-US');
    return lang() === 'fr' ? n + ' $' : '$' + n;
  };
  const monthName = i => T('js.months', 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec').split(',')[i];

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  if (nav) {
    const solid = !$('.hero') && !$('.page-hero');
    const onScroll = () => nav.classList.toggle('scrolled', solid || window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const mt = $('#menuToggle');
    if (mt) mt.addEventListener('click', () => nav.classList.toggle('open'));
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(x => revealer.observe(x));

  /* ---------- Counters ---------- */
  const counter = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const x = e.target, end = parseFloat(x.dataset.count), dec = +x.dataset.dec;
      counter.unobserve(x);
      const fmt = v => { const s = v.toFixed(dec); return lang() === 'fr' ? s.replace('.', ',') : s; };
      if (reduce) { x.textContent = fmt(end); return; }
      const t0 = performance.now(), dur = 1600;
      const tick = t => { const k = Math.min(1, (t - t0) / dur); x.textContent = fmt(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(x => counter.observe(x));
  onLang(() => $$('[data-count]').forEach(x => { const s = (+x.textContent.replace(',', '.')).toFixed(+x.dataset.dec); x.textContent = lang() === 'fr' ? s.replace('.', ',') : s; }));

  const N = (D.p3 || []).length;
  const dateOf = i => monthName(i % 12) + ' ' + (2007 + Math.floor(i / 12));

  /* ---------- Hero line ---------- */
  (function heroLine() {
    const p = $('#heroLine'); if (!p || !N) return;
    const s = [100].concat(D.p3), lo = Math.log(80), hi = Math.log(620);
    p.setAttribute('d', s.map((v, i) => (i ? 'L' : 'M') + (i / (s.length - 1) * 1100).toFixed(1) + ' ' + (520 - (Math.log(v) - lo) / (hi - lo) * 500).toFixed(1)).join(' '));
    if (reduce) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.getBoundingClientRect();
    p.style.transition = 'stroke-dashoffset 4s cubic-bezier(.3,.6,.2,1) .4s'; p.style.strokeDashoffset = 0;
  })();

  /* ---------- Growth chart ---------- */
  (function growth() {
    const chart = $('#growthChart'), tip = $('#tip'); if (!chart || !N) return;
    const W = 1000, H = 440, M = { l: 58, r: 70, t: 16, b: 34 };
    const state = { range: 'all', scale: 'log' };
    function draw(animate) {
      chart.innerHTML = '';
      const start = state.range === 'all' ? 0 : N - 12 * (+state.range);
      const p0 = start === 0 ? 100 : D.p3[start - 1], b0 = start === 0 ? 100 : D.bench[start - 1];
      const sp = [100], sb = [100];
      for (let i = start; i < N; i++) { sp.push(D.p3[i] / p0 * 100); sb.push(D.bench[i] / b0 * 100); }
      const n = sp.length, all = sp.concat(sb);
      const lo = Math.min.apply(null, all), hi = Math.max.apply(null, all), log = state.scale === 'log';
      const f = v => log ? Math.log(v) : v, flo = f(lo * 0.95), fhi = f(hi * 1.05);
      const x = i => M.l + i / (n - 1) * (W - M.l - M.r);
      const y = v => M.t + (1 - (f(v) - flo) / (fhi - flo)) * (H - M.t - M.b);
      const g = el('g', { class: 'grid' }, chart), ax = el('g', { class: 'axis' }, chart);
      let ticks = log ? [50, 75, 100, 150, 200, 300, 400, 500, 600, 800] : [];
      if (!log) { const step = hi > 400 ? 100 : hi > 200 ? 50 : 25; for (let v = Math.ceil(lo * 0.95 / step) * step; v <= hi * 1.05; v += step) ticks.push(v); }
      ticks.filter(v => v >= lo * 0.95 && v <= hi * 1.05).forEach(v => {
        el('line', { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v) }, g);
        el('text', { x: M.l - 10, y: y(v) + 4, 'text-anchor': 'end' }, ax).textContent = v;
      });
      const yrs = [];
      for (let i = 0; i < n; i++) { const idx = start + i - 1; if (idx >= 0 && idx % 12 === 0) yrs.push([i, 2007 + idx / 12]); }
      const every = yrs.length > 12 ? 3 : yrs.length > 6 ? 2 : 1;
      yrs.forEach(([i, yr], k) => { if (!(k % every)) el('text', { x: x(i), y: H - 8, 'text-anchor': 'middle' }, ax).textContent = yr; });
      const path = s => s.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
      const defs = el('defs', {}, chart), grad = el('linearGradient', { id: 'gGrad', x1: 0, x2: 0, y1: 0, y2: 1 }, defs);
      el('stop', { offset: '0%', 'stop-color': '#c9a46b', 'stop-opacity': 0.25 }, grad);
      el('stop', { offset: '100%', 'stop-color': '#c9a46b', 'stop-opacity': 0 }, grad);
      const area = el('path', { d: path(sp) + ` L${x(n - 1)} ${H - M.b} L${x(0)} ${H - M.b} Z`, fill: 'url(#gGrad)', opacity: 0.9 }, chart);
      const lb = el('path', { d: path(sb), fill: 'none', stroke: '#7f93b6', 'stroke-width': 2 }, chart);
      const lp = el('path', { d: path(sp), fill: 'none', stroke: '#c9a46b', 'stroke-width': 3 }, chart);
      el('text', { x: x(n - 1) + 8, y: y(sp[n - 1]) + 5, fill: '#c9a46b', 'font-size': 16, 'font-weight': 700, 'font-family': 'Cormorant Garamond, serif' }, chart).textContent = Math.round(sp[n - 1]);
      el('text', { x: x(n - 1) + 8, y: y(sb[n - 1]) + 5, fill: '#aab3c2', 'font-size': 16, 'font-weight': 700, 'font-family': 'Cormorant Garamond, serif' }, chart).textContent = Math.round(sb[n - 1]);
      if (animate && !reduce) {
        [lp, lb].forEach((p, k) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.getBoundingClientRect();
          p.style.transition = `stroke-dashoffset ${1.8 + k * 0.2}s cubic-bezier(.3,.6,.2,1)`; p.style.strokeDashoffset = 0;
        });
        area.style.opacity = 0; area.style.transition = 'opacity 1.2s ease 1.2s';
        requestAnimationFrame(() => { area.style.opacity = 0.9; });
      }
      const vline = el('line', { y1: M.t, y2: H - M.b, stroke: '#c9a46b', 'stroke-dasharray': '3 4', opacity: 0 }, chart);
      const dp = el('circle', { r: 5, fill: '#c9a46b', stroke: '#0a1a30', 'stroke-width': 2, opacity: 0 }, chart);
      const db = el('circle', { r: 4, fill: '#7f93b6', stroke: '#0a1a30', 'stroke-width': 2, opacity: 0 }, chart);
      const hit = el('rect', { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b, fill: 'transparent' }, chart);
      function move(ev) {
        const r = chart.getBoundingClientRect();
        const cx = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left;
        let i = Math.round((cx / r.width * W - M.l) / (W - M.l - M.r) * (n - 1)); i = Math.max(0, Math.min(n - 1, i));
        vline.setAttribute('x1', x(i)); vline.setAttribute('x2', x(i)); vline.setAttribute('opacity', 0.7);
        dp.setAttribute('cx', x(i)); dp.setAttribute('cy', y(sp[i])); dp.setAttribute('opacity', 1);
        db.setAttribute('cx', x(i)); db.setAttribute('cy', y(sb[i])); db.setAttribute('opacity', 1);
        const idx = start + i - 1;
        const label = idx < 0 ? monthName(11) + ' 2006' : dateOf(idx);
        tip.innerHTML = `<b>${label}</b><div class="t-row"><span>Horus</span><span>${sp[i].toFixed(0)}</span></div><div class="t-row"><span>60/40</span><span>${sb[i].toFixed(0)}</span></div>`;
        tip.style.opacity = 1;
        tip.style.left = Math.min(x(i) / W * r.width + 24, r.width - 180) + 'px';
        tip.style.top = Math.max(0, y(sp[i]) / H * r.height - 20) + 'px';
      }
      const leave = () => { [vline, dp, db].forEach(e => e.setAttribute('opacity', 0)); tip.style.opacity = 0; };
      hit.addEventListener('mousemove', move); hit.addEventListener('touchmove', move, { passive: true });
      hit.addEventListener('mouseleave', leave); hit.addEventListener('touchend', leave);
    }
    const bind = (id, key, attr) => $$('#' + id + ' button').forEach(b => b.addEventListener('click', () => {
      $$('#' + id + ' button').forEach(o => o.classList.remove('on')); b.classList.add('on');
      state[key] = b.dataset[attr]; draw(true);
    }));
    bind('rangeToggle', 'range', 'r'); bind('scaleToggle', 'scale', 's');
    draw(false);
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { draw(true); o.disconnect(); } }), { threshold: 0.35 });
    o.observe(chart);
  })();

  /* ---------- Annual bars ---------- */
  (function bars() {
    const box = $('#barChart'); if (!box || !D.annual_p3) return;
    const ap = D.annual_p3, ab = D.annual_bench, max = 30, span = 56, zero = (max / span) * 100;
    const z = document.createElement('div'); z.className = 'zero-line'; z.style.top = zero + '%'; box.appendChild(z);
    const cols = [];
    ap.forEach((v, i) => {
      const yr = 2007 + i, col = document.createElement('div'); col.className = 'bar-col';
      const p = document.createElement('div'); p.className = 'bar p';
      const b = document.createElement('div'); b.className = 'bar b';
      [p, b].forEach(bb => { bb.style.top = zero + '%'; bb.style.height = '0%'; col.appendChild(bb); });
      const lab = document.createElement('div'); lab.className = 'yr'; lab.textContent = "'" + String(yr).slice(2); col.appendChild(lab);
      box.appendChild(col); cols.push([col, p, v, b, ab[i], yr]);
    });
    const titles = () => cols.forEach(([col, , v, , w, yr]) => { col.title = `${yr}${yr === 2026 ? T('js.ytd', ' (Jan–Aug)') : ''}: Horus ${fmtPct(v)} · 60/40 ${fmtPct(w)}`; });
    titles(); onLang(titles);
    const set = (bar, v) => { const h = Math.abs(v) / span * 100; bar.style.height = h + '%'; bar.style.top = (v >= 0 ? zero - h : zero) + '%'; };
    const o = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      cols.forEach(([, p, v, b, w], k) => setTimeout(() => { set(p, v); set(b, w); }, reduce ? 0 : k * 40));
      o.disconnect();
    }), { threshold: 0.3 });
    o.observe(box);
  })();

  /* ---------- Holdings explorer ---------- */
  const INFO = {
    SPY: ['US large caps', 'Grandes cap. US', 'eq'], IJH: ['US mid caps', 'Moyennes cap. US', 'eq'], IWM: ['US small caps', 'Petites cap. US', 'eq'],
    IWD: ['US large-cap value', 'Value grandes cap. US', 'eq'], XLK: ['US technology', 'Technologie US', 'eq'], XLF: ['US financials', 'Financières US', 'eq'],
    XLV: ['US health care', 'Santé US', 'eq'], XLE: ['US energy', 'Énergie US', 'eq'], XLB: ['US materials', 'Matériaux US', 'eq'],
    EZU: ['Eurozone equities', 'Actions zone euro', 'eq'], EWU: ['UK equities', 'Actions britanniques', 'eq'], EWJ: ['Japanese equities', 'Actions japonaises', 'eq'],
    SHY: ['US Treasuries 1–3y', 'Trésor US 1–3 ans', 'bd'], IEF: ['US Treasuries 7–10y', 'Trésor US 7–10 ans', 'bd'], TLT: ['US Treasuries 20y+', 'Trésor US 20 ans+', 'bd'],
    TIP: ['US inflation-linked', 'Obligations indexées US', 'bd'], LQD: ['US IG corporates', 'Crédit IG US', 'bd'], AGG: ['US aggregate bonds', 'Obligations agrégées US', 'bd'],
    RXRGEX: ['German government bonds', 'Obligations d\'État allemandes', 'bd'], GLD: ['Gold', 'Or', 'bd']
  };
  (function explorer() {
    const slider = $('#yearSlider'), hold = $('#holdingsGrid'), yd = $('#yearDisplay'), yr = $('#yearRet'), btn = $('#playBtn');
    if (!slider || !hold || !D.sel) return;
    let timer = null;
    function show(y) {
      const s = D.sel[y]; if (!s) return;
      yd.innerHTML = String(y).slice(0, 2) + '<span>' + String(y).slice(2) + '</span>';
      const items = Object.entries(s).sort((a, b) => (INFO[a[0]][2] === 'eq' ? 0 : 1) - (INFO[b[0]][2] === 'eq' ? 0 : 1) || b[1] - a[1]);
      hold.innerHTML = items.map(([t, w]) => {
        const inf = INFO[t] || [t, t, 'eq'], k = inf[2], d = lang() === 'fr' ? inf[1] : inf[0];
        return `<div class="holding ${k} swap"><span class="k">${k === 'eq' ? T('js.equity', 'EQUITY') : T('js.bonds', 'BONDS')}</span><div class="w">${Math.round(w * 100)}%</div><div class="t">${t}</div><div class="d">${d}</div></div>`;
      }).join('');
      const i = y - 2007, a = D.annual_p3[i], b = D.annual_bench[i];
      yr.innerHTML = `${y === 2026 ? T('js.ytd2026', 'January to August 2026') : T('js.calyear', 'Calendar year') + ' ' + y}: <b>Horus ${fmtPct(a)}</b> · 60/40 ${fmtPct(b)}`;
    }
    const label = () => { btn.textContent = timer ? T('js.pause', '❚❚ Pause') : T('js.play', '▶ Play the 20 years'); };
    slider.addEventListener('input', () => show(+slider.value));
    btn.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = null; label(); return; }
      let y = 2007; slider.value = y; show(y);
      timer = setInterval(() => { y++; if (y > 2026) { clearInterval(timer); timer = null; label(); return; } slider.value = y; show(y); }, 900);
      label();
    });
    show(2026); label();
    onLang(() => { show(+slider.value); label(); });
  })();

  /* ---------- Donut ---------- */
  (function donut() {
    const svg = $('#donut'); if (!svg) return;
    const r = 80, c = 2 * Math.PI * r, parts = [[0.3, '#f4efe6'], [0.3, '#7f93b6'], [0.2, '#c9a46b'], [0.2, '#e3cfa6']];
    el('circle', { cx: 100, cy: 100, r, stroke: '#13284a', 'stroke-width': 26, fill: 'none' }, svg);
    let off = 0; const arcs = [];
    parts.forEach(([v, col]) => { arcs.push([el('circle', { cx: 100, cy: 100, r, stroke: col, 'stroke-dasharray': `0 ${c}`, 'stroke-dashoffset': -off * c }, svg), v]); off += v; });
    const o = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      arcs.forEach(([a, v], k) => setTimeout(() => a.setAttribute('stroke-dasharray', `${v * c - 2} ${c}`), reduce ? 0 : k * 250));
      o.disconnect();
    }), { threshold: 0.4 });
    o.observe(svg);
  })();

  /* ---------- Process line ---------- */
  $$('#steps').forEach(s => new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { s.classList.add('in'); o.disconnect(); } }), { threshold: 0.4 }).observe(s));

  /* ---------- Research notes ---------- */
  $$('.insight .read').forEach(b => b.addEventListener('click', () => {
    const card = b.closest('.insight'); card.classList.toggle('open');
    b.textContent = card.classList.contains('open') ? T('js.close', 'Close') : T('js.read', 'Read more');
  }));
  onLang(() => $$('.insight .read').forEach(b => { b.textContent = b.closest('.insight').classList.contains('open') ? T('js.close', 'Close') : T('js.read', 'Read more'); }));

  /* ---------- Simulator ---------- */
  (function simulator() {
    const form = $('#simForm'); if (!form || !D.r_p3) return;
    const amt = $('#simAmount'), sel = $('#simStart'), mon = $('#simMonthly'), svg = $('#simChart'), meta = $('#simMeta');
    function options() {
      const cur = sel.value || '2007';
      sel.innerHTML = '';
      for (let y = 2007; y <= 2025; y++) { const o = document.createElement('option'); o.value = y; o.textContent = monthName(0) + ' ' + y; sel.appendChild(o); }
      sel.value = cur;
    }
    function run() {
      const a = Math.max(0, +amt.value || 0), m = Math.max(0, +mon.value || 0), s0 = (+sel.value - 2007) * 12;
      let vh = a, vb = a, inv = a, peak = a, dd = 0;
      const ph = [vh], pb = [vb], pi = [inv];
      for (let i = s0; i < D.r_p3.length; i++) {
        if (i > s0) { vh += m; vb += m; inv += m; }
        vh *= 1 + D.r_p3[i]; vb *= 1 + D.r_bench[i];
        ph.push(vh); pb.push(vb); pi.push(inv);
        if (m === 0 && a > 0) { peak = Math.max(peak, vh); dd = Math.min(dd, vh / peak - 1); }
      }
      $('#simH').textContent = fmtMoney(vh);
      $('#simB').textContent = fmtMoney(vb);
      const yrs = (D.r_p3.length - s0) / 12;
      const lines = [
        [T('js.sim.invested', 'Total invested'), fmtMoney(inv)],
        [T('js.sim.diff', 'Difference vs 60/40'), (vh - vb >= 0 ? '+' : '−') + fmtMoney(vh - vb)],
      ];
      if (m === 0 && a > 0) {
        lines.push([T('js.sim.cagr', 'Annual return'), 'Horus ' + fmtPct((Math.pow(vh / a, 1 / yrs) - 1) * 100) + ' · 60/40 ' + fmtPct((Math.pow(vb / a, 1 / yrs) - 1) * 100)]);
        lines.push([T('js.sim.dd', 'Worst fall on the way'), fmtPct(dd * 100)]);
      }
      lines.push([T('js.sim.period', 'Period'), monthName(0) + ' ' + sel.value + ' – ' + monthName(7) + ' 2026']);
      meta.innerHTML = lines.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('');
      svg.innerHTML = '';
      const W = 640, H = 220, ml = 8, mr = 8, mt = 10, mb = 12, n = ph.length;
      const hi = Math.max(1, Math.max.apply(null, ph.concat(pb))) * 1.05;
      const x = i => ml + i / (n - 1) * (W - ml - mr), y = v => mt + (1 - v / hi) * (H - mt - mb);
      const path = s => s.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
      el('line', { x1: ml, x2: W - mr, y1: y(0), y2: y(0), stroke: '#e5dccb' }, svg);
      el('path', { d: path(ph) + ` L${x(n - 1)} ${y(0)} L${x(0)} ${y(0)} Z`, fill: '#c9a46b', 'fill-opacity': 0.15 }, svg);
      el('path', { d: path(pi), fill: 'none', stroke: '#616a78', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, svg);
      el('path', { d: path(pb), fill: 'none', stroke: '#7f93b6', 'stroke-width': 2 }, svg);
      el('path', { d: path(ph), fill: 'none', stroke: '#b58f55', 'stroke-width': 3 }, svg);
    }
    options(); run();
    [amt, sel, mon].forEach(i => i.addEventListener('input', run));
    form.addEventListener('submit', e => { e.preventDefault(); run(); });
    onLang(() => { options(); run(); });
  })();

  /* ---------- Factsheets ---------- */
  (function factsheets() {
    const list = window.HORUS_FACTSHEETS || [];
    const monthLabel = m => { const [y, mo] = m.split('-'); return T('js.monthsLong', 'January,February,March,April,May,June,July,August,September,October,November,December').split(',')[+mo - 1] + ' ' + y; };
    function render() {
      const L = lang();
      $$('[data-factsheet-latest]').forEach(box => {
        if (!list.length) { box.innerHTML = ''; return; }
        const f = list[0], main = L === 'fr' ? f.fr : f.en, other = L === 'fr' ? f.en : f.fr;
        box.innerHTML = `<div class="fs-card"><div class="fs-icon">PDF</div><div><span class="tag">${T('js.fs.latest', 'Latest factsheet')}</span><h3>Horus Smart Beta 60/40</h3><p>${T('js.fs.asof', 'Data as of end of')} ${monthLabel(f.month)}</p>
          <div class="fs-actions"><a class="btn solid" href="factsheets/${main}" target="_blank" rel="noopener">${T('js.fs.dl', 'Download')} (${L.toUpperCase()})</a><a class="fs-other" href="factsheets/${other}" target="_blank" rel="noopener">${L === 'fr' ? 'English version' : 'Version française'}</a></div></div></div>`;
      });
      $$('[data-factsheet-archive]').forEach(ul => {
        ul.innerHTML = list.map(f => `<li><span>${monthLabel(f.month)}</span><span><a href="factsheets/${f.en}" target="_blank" rel="noopener">EN</a> · <a href="factsheets/${f.fr}" target="_blank" rel="noopener">FR</a></span></li>`).join('');
      });
    }
    render(); onLang(render);
  })();

  /* ---------- Team ---------- */
  (function team() {
    const grid = $('#teamGrid'), list = window.HORUS_TEAM; if (!grid || !list) return;
    function render() {
      const L = lang();
      grid.innerHTML = list.map(m => `
        <div class="member">
          ${m.photo ? `<img class="photo" src="assets/img/team/${m.photo}" alt="${m.name}">` : `<div class="avatar">${m.name[0]}</div>`}
          <h3>${m.name}</h3><div class="mrole">${m.role[L] || m.role.en}</div><p>${m.bio[L] || m.bio.en}</p>
          ${m.linkedin ? `<a class="li" href="${m.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn ${m.name}">in</a>` : `<span class="li soon" title="${T('js.li.soon', 'LinkedIn coming soon')}">in</span>`}
        </div>`).join('');
    }
    render(); onLang(render);
  })();

  /* ---------- Email links ---------- */
  (function email() {
    const set = () => {
      $$('[data-email]').forEach(a => { if (CFG.email) { a.href = 'mailto:' + CFG.email; a.textContent = CFG.email; a.removeAttribute('data-i18n'); } else { a.removeAttribute('href'); } });
      $$('[data-apply]').forEach(a => { if (CFG.email) a.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent('[Horus AM] Application'); });
    };
    set(); onLang(set);
  })();

  /* ---------- Newsletter ---------- */
  $$('[data-newsletter]').forEach(form => form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('.news-msg', form), email = form.email.value.trim();
    if (!CFG.newsletterEndpoint) { msg.textContent = T('js.news.soon', 'Sign-ups open very soon. Thank you for your interest!'); return; }
    msg.textContent = T('js.sending', 'Sending…');
    try {
      const r = await fetch(CFG.newsletterEndpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ email, list: 'newsletter', lang: lang() }) });
      msg.textContent = r.ok ? T('js.news.ok', 'Thank you! You are on the list.') : T('js.err', 'Something went wrong. Please try again later.');
      if (r.ok) form.reset();
    } catch (_) { msg.textContent = T('js.err', 'Something went wrong. Please try again later.'); }
  }));

  /* ---------- Contact ---------- */
  (function contact() {
    const f = $('#contactForm'); if (!f) return;
    f.addEventListener('submit', async e => {
      e.preventDefault();
      const msg = $('.form-msg', f);
      const data = { name: f.elements.name.value, email: f.elements.email.value, subject: f.elements.subject.options[f.elements.subject.selectedIndex].text, message: f.elements.message.value };
      if (CFG.contactEndpoint) {
        msg.textContent = T('js.sending', 'Sending…');
        try {
          const r = await fetch(CFG.contactEndpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          msg.textContent = r.ok ? T('js.con.ok', 'Thank you, we will answer within a few days.') : T('js.err', 'Something went wrong. Please try again later.');
          if (r.ok) f.reset();
        } catch (_) { msg.textContent = T('js.err', 'Something went wrong. Please try again later.'); }
        return;
      }
      if (!CFG.email) { msg.textContent = T('js.con.soon', 'Our email address goes live very soon. Thank you for your patience!'); return; }
      window.location.href = `mailto:${CFG.email}?subject=${encodeURIComponent('[Horus AM] ' + data.subject)}&body=${encodeURIComponent(data.message + '\n\n' + data.name + ' · ' + data.email)}`;
    });
  })();
})();

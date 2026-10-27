/* Horus Asset Management — interactions */
(function () {
  'use strict';
  const D = window.HORUS_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#menuToggle').addEventListener('click', () => nav.classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const sections = $$('section[id]');
  const links = $$('#navLinks a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => revealer.observe(el));

  /* ---------- Counters ---------- */
  const counter = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = parseFloat(el.dataset.count), dec = +el.dataset.dec;
      counter.unobserve(el);
      if (reduce) { el.textContent = end.toFixed(dec); return; }
      const t0 = performance.now(), dur = 1600;
      const tick = t => {
        const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
        el.textContent = (end * ease).toFixed(dec);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => counter.observe(el));

  /* ---------- Date helpers ---------- */
  const N = D.p3.length; // monthly points, Jan 2007 ...
  const dateOf = i => { const m = i % 12, y = 2007 + Math.floor(i / 12); return MONTHS[m] + ' ' + y; };

  /* ---------- Hero line ---------- */
  (function heroLine() {
    const p = $('#heroLine'); if (!p) return;
    const s = [100].concat(D.p3), lo = Math.log(80), hi = Math.log(620);
    const d = s.map((v, i) => (i ? 'L' : 'M') + (i / (s.length - 1) * 1100).toFixed(1) + ' ' + (520 - (Math.log(v) - lo) / (hi - lo) * 500).toFixed(1)).join(' ');
    p.setAttribute('d', d);
    if (reduce) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
    p.getBoundingClientRect();
    p.style.transition = 'stroke-dashoffset 4s cubic-bezier(.3,.6,.2,1) .4s';
    p.style.strokeDashoffset = 0;
  })();

  /* ---------- Growth chart ---------- */
  const chart = $('#growthChart'), tip = $('#tip');
  const W = 1000, H = 440, M = { l: 58, r: 70, t: 16, b: 34 };
  let state = { range: 'all', scale: 'log' };

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function drawChart(animate) {
    chart.innerHTML = '';
    const start = state.range === 'all' ? 0 : N - 12 * (+state.range);
    // rebase both series to 100 at the start of the window
    const base = i => i < 0 ? 100 : null;
    const sp = [], sb = [];
    const p0 = start === 0 ? 100 : D.p3[start - 1], b0 = start === 0 ? 100 : D.bench[start - 1];
    sp.push(100); sb.push(100);
    for (let i = start; i < N; i++) { sp.push(D.p3[i] / p0 * 100); sb.push(D.bench[i] / b0 * 100); }
    const n = sp.length;
    const all = sp.concat(sb);
    let lo = Math.min.apply(null, all), hi = Math.max.apply(null, all);
    const log = state.scale === 'log';
    const f = v => log ? Math.log(v) : v;
    let flo = f(lo * 0.95), fhi = f(hi * 1.05);
    const x = i => M.l + i / (n - 1) * (W - M.l - M.r);
    const y = v => M.t + (1 - (f(v) - flo) / (fhi - flo)) * (H - M.t - M.b);

    // grid & y ticks
    const g = el('g', { class: 'grid' }, chart), ax = el('g', { class: 'axis' }, chart);
    let ticks = log ? [50, 75, 100, 150, 200, 300, 400, 500, 600, 800] : [];
    if (!log) { const step = hi > 400 ? 100 : hi > 200 ? 50 : 25; for (let v = Math.ceil(lo * 0.95 / step) * step; v <= hi * 1.05; v += step) ticks.push(v); }
    ticks.filter(v => v >= lo * 0.95 && v <= hi * 1.05).forEach(v => {
      el('line', { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v) }, g);
      const t = el('text', { x: M.l - 10, y: y(v) + 4, 'text-anchor': 'end' }, ax); t.textContent = v;
    });
    // x ticks: years
    const yrs = [];
    for (let i = 0; i < n; i++) { const idx = start + i - 1; if (idx >= 0 && (idx % 12) === 0) yrs.push([i, 2007 + idx / 12]); }
    const every = yrs.length > 12 ? 3 : yrs.length > 6 ? 2 : 1;
    yrs.forEach(([i, yr], k) => { if (k % every) return; const t = el('text', { x: x(i), y: H - 8, 'text-anchor': 'middle' }, ax); t.textContent = yr; });

    const path = s => s.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    // area under Horus line
    const area = el('path', { d: path(sp) + ` L${x(n - 1)} ${H - M.b} L${x(0)} ${H - M.b} Z`, fill: 'url(#gGrad)', opacity: 0.9 }, chart);
    const defs = el('defs', {}, chart);
    const grad = el('linearGradient', { id: 'gGrad', x1: 0, x2: 0, y1: 0, y2: 1 }, defs);
    el('stop', { offset: '0%', 'stop-color': '#c9a46b', 'stop-opacity': 0.25 }, grad);
    el('stop', { offset: '100%', 'stop-color': '#c9a46b', 'stop-opacity': 0 }, grad);
    const lb = el('path', { d: path(sb), fill: 'none', stroke: '#7f93b6', 'stroke-width': 2 }, chart);
    const lp = el('path', { d: path(sp), fill: 'none', stroke: '#c9a46b', 'stroke-width': 3 }, chart);

    // end labels
    const endP = el('text', { x: x(n - 1) + 8, y: y(sp[n - 1]) + 5, fill: '#c9a46b', 'font-size': 16, 'font-weight': 700, 'font-family': 'Cormorant Garamond, serif' }, chart); endP.textContent = Math.round(sp[n - 1]);
    const endB = el('text', { x: x(n - 1) + 8, y: y(sb[n - 1]) + 5, fill: '#aab3c2', 'font-size': 16, 'font-weight': 700, 'font-family': 'Cormorant Garamond, serif' }, chart); endB.textContent = Math.round(sb[n - 1]);

    if (animate && !reduce) {
      [lp, lb].forEach((p, k) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
        p.getBoundingClientRect();
        p.style.transition = `stroke-dashoffset ${1.8 + k * 0.2}s cubic-bezier(.3,.6,.2,1)`;
        p.style.strokeDashoffset = 0;
      });
      area.style.opacity = 0; area.style.transition = 'opacity 1.2s ease 1.2s';
      requestAnimationFrame(() => { area.style.opacity = 0.9; });
    }

    // hover
    const vline = el('line', { y1: M.t, y2: H - M.b, stroke: '#c9a46b', 'stroke-dasharray': '3 4', opacity: 0 }, chart);
    const dp = el('circle', { r: 5, fill: '#c9a46b', stroke: '#0a1a30', 'stroke-width': 2, opacity: 0 }, chart);
    const db = el('circle', { r: 4, fill: '#7f93b6', stroke: '#0a1a30', 'stroke-width': 2, opacity: 0 }, chart);
    const hit = el('rect', { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b, fill: 'transparent' }, chart);
    function move(ev) {
      const r = chart.getBoundingClientRect();
      const cx = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left;
      const sx = cx / r.width * W;
      let i = Math.round((sx - M.l) / (W - M.l - M.r) * (n - 1)); i = Math.max(0, Math.min(n - 1, i));
      [vline].forEach(l => { l.setAttribute('x1', x(i)); l.setAttribute('x2', x(i)); l.setAttribute('opacity', 0.7); });
      dp.setAttribute('cx', x(i)); dp.setAttribute('cy', y(sp[i])); dp.setAttribute('opacity', 1);
      db.setAttribute('cx', x(i)); db.setAttribute('cy', y(sb[i])); db.setAttribute('opacity', 1);
      const idx = start + i - 1;
      const label = idx < 0 ? 'Dec 2006' : dateOf(idx);
      tip.innerHTML = `<b>${label}</b><div class="t-row"><span>Horus</span><span>${sp[i].toFixed(0)}</span></div><div class="t-row"><span>60/40</span><span>${sb[i].toFixed(0)}</span></div>`;
      tip.style.opacity = 1;
      const px = x(i) / W * r.width, py = y(sp[i]) / H * r.height;
      tip.style.left = Math.min(px + 24, r.width - 180) + 'px';
      tip.style.top = Math.max(0, py - 20) + 'px';
    }
    function leave() { [vline, dp, db].forEach(e => e.setAttribute('opacity', 0)); tip.style.opacity = 0; }
    hit.addEventListener('mousemove', move);
    hit.addEventListener('touchmove', move, { passive: true });
    hit.addEventListener('mouseleave', leave);
    hit.addEventListener('touchend', leave);
  }

  function bindToggle(id, key) {
    $$('#' + id + ' button').forEach(b => b.addEventListener('click', () => {
      $$('#' + id + ' button').forEach(o => o.classList.remove('on'));
      b.classList.add('on');
      state[key] = b.dataset[key === 'range' ? 'r' : 's'];
      drawChart(true);
    }));
  }
  bindToggle('rangeToggle', 'range');
  bindToggle('scaleToggle', 'scale');
  drawChart(false);
  const chartObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { drawChart(true); chartObs.disconnect(); } }), { threshold: 0.35 });
  chartObs.observe(chart);

  /* ---------- Annual bars ---------- */
  (function bars() {
    const box = $('#barChart'); if (!box) return;
    const ap = D.annual_p3, ab = D.annual_bench;
    const max = 30, min = -26, span = max - min;
    const zero = (max / span) * 100;
    const z = document.createElement('div'); z.className = 'zero-line'; z.style.top = zero + '%'; box.appendChild(z);
    const cols = [];
    ap.forEach((v, i) => {
      const yr = 2007 + i;
      const col = document.createElement('div'); col.className = 'bar-col';
      col.title = `${yr}${yr === 2026 ? ' (Jan–Aug)' : ''}: Horus ${v > 0 ? '+' : ''}${v}% · 60/40 ${ab[i] > 0 ? '+' : ''}${ab[i]}%`;
      const p = document.createElement('div'); p.className = 'bar p';
      const b = document.createElement('div'); b.className = 'bar b';
      [p, b].forEach(bb => { bb.style.top = zero + '%'; bb.style.height = '0%'; col.appendChild(bb); });
      const lab = document.createElement('div'); lab.className = 'yr'; lab.textContent = "'" + String(yr).slice(2); col.appendChild(lab);
      box.appendChild(col);
      cols.push([p, v, b, ab[i]]);
    });
    const set = (bar, v) => {
      const h = Math.abs(v) / span * 100;
      bar.style.height = h + '%';
      bar.style.top = (v >= 0 ? zero - h : zero) + '%';
    };
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      cols.forEach(([p, v, b, w], k) => setTimeout(() => { set(p, v); set(b, w); }, reduce ? 0 : k * 40));
      obs.disconnect();
    }), { threshold: 0.3 });
    obs.observe(box);
  })();

  /* ---------- Holdings explorer ---------- */
  const INFO = {
    SPY: ['US large caps', 'eq'], IJH: ['US mid caps', 'eq'], IWM: ['US small caps', 'eq'], IWD: ['US large-cap value', 'eq'],
    XLK: ['US technology', 'eq'], XLF: ['US financials', 'eq'], XLV: ['US health care', 'eq'], XLE: ['US energy', 'eq'],
    XLB: ['US materials', 'eq'], EZU: ['Eurozone equities', 'eq'], EWU: ['UK equities', 'eq'], EWJ: ['Japanese equities', 'eq'],
    SHY: ['US Treasuries 1–3y', 'bd'], IEF: ['US Treasuries 7–10y', 'bd'], TLT: ['US Treasuries 20y+', 'bd'], TIP: ['US inflation-linked', 'bd'],
    LQD: ['US IG corporates', 'bd'], AGG: ['US aggregate bonds', 'bd'], RXRGEX: ['German government bonds', 'bd'], GLD: ['Gold', 'bd']
  };
  const slider = $('#yearSlider'), hold = $('#holdingsGrid'), yd = $('#yearDisplay'), yr = $('#yearRet');
  function showYear(y) {
    const s = D.sel[y]; if (!s) return;
    yd.innerHTML = String(y).slice(0, 2) + '<span>' + String(y).slice(2) + '</span>';
    const items = Object.entries(s).sort((a, b) => (INFO[a[0]][1] === 'eq' ? 0 : 1) - (INFO[b[0]][1] === 'eq' ? 0 : 1) || b[1] - a[1]);
    hold.innerHTML = items.map(([t, w]) => {
      const [d, k] = INFO[t] || [t, 'eq'];
      return `<div class="holding ${k} swap"><span class="k">${k === 'eq' ? 'EQUITY' : 'BONDS'}</span><div class="w">${Math.round(w * 100)}%</div><div class="t">${t}</div><div class="d">${d}</div></div>`;
    }).join('');
    const i = y - 2007, a = D.annual_p3[i], b = D.annual_bench[i];
    yr.innerHTML = `${y === 2026 ? 'January to August 2026' : 'Calendar year ' + y}: <b>Horus ${a > 0 ? '+' : ''}${a}%</b> · 60/40 ${b > 0 ? '+' : ''}${b}%`;
  }
  slider.addEventListener('input', () => showYear(+slider.value));
  showYear(2026);
  let timer = null;
  $('#playBtn').addEventListener('click', function () {
    if (timer) { clearInterval(timer); timer = null; this.textContent = '▶ Play the 20 years'; return; }
    let y = 2007; slider.value = y; showYear(y); this.textContent = '❚❚ Pause';
    timer = setInterval(() => {
      y++; if (y > 2026) { clearInterval(timer); timer = null; this.textContent = '▶ Play the 20 years'; return; }
      slider.value = y; showYear(y);
    }, 900);
  });

  /* ---------- Donut ---------- */
  (function donut() {
    const svg = $('#donut'); if (!svg) return;
    const r = 80, c = 2 * Math.PI * r;
    const parts = [[0.3, '#f4efe6'], [0.3, '#7f93b6'], [0.2, '#c9a46b'], [0.2, '#e3cfa6']];
    el('circle', { cx: 100, cy: 100, r, stroke: '#13284a', 'stroke-width': 26, fill: 'none' }, svg);
    let off = 0; const arcs = [];
    parts.forEach(([v, col]) => {
      const a = el('circle', { cx: 100, cy: 100, r, stroke: col, 'stroke-dasharray': `0 ${c}`, 'stroke-dashoffset': -off * c }, svg);
      arcs.push([a, v]); off += v;
    });
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      arcs.forEach(([a, v], k) => setTimeout(() => a.setAttribute('stroke-dasharray', `${v * c - 2} ${c}`), reduce ? 0 : k * 250));
      obs.disconnect();
    }), { threshold: 0.4 });
    obs.observe(svg);
  })();

  /* ---------- Process line ---------- */
  const steps = $('#steps');
  if (steps) new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { steps.classList.add('in'); o.disconnect(); } }), { threshold: 0.4 }).observe(steps);

  /* ---------- Insights ---------- */
  $$('.insight .read').forEach(b => b.addEventListener('click', () => {
    const card = b.closest('.insight'); card.classList.toggle('open');
    b.textContent = card.classList.contains('open') ? 'Close' : 'Read more';
  }));

  /* ---------- Contact (mailto) ---------- */
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, to = $('#mailLink').getAttribute('href').replace('mailto:', '');
    const body = `${f.message.value}\n\n${f.name.value} · ${f.email.value}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('[Horus AM] ' + f.subject.value)}&body=${encodeURIComponent(body)}`;
  });
})();

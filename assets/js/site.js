// highlight current nav link
(function() {
  const path = (location.pathname || '').replace(/\/+$/, '');
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const url = href.replace(/\/+$/, '');
    if (url && (path === url || (url !== '/' && path.startsWith(url)))) {
      a.classList.add('active');
    }
  });
})();

// keep the ruled-paper background perfectly synced to the real line height/baseline
(function() {
  const root = document.documentElement;
  const target = document.body;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const probe = document.createElement('span');

  if (!root || !target) return;
  // hidden inline probe for DOM baseline measurement
  probe.textContent = 'H';
  probe.style.position = 'fixed';
  probe.style.visibility = 'hidden';
  probe.style.whiteSpace = 'nowrap';
  probe.style.padding = probe.style.margin = '0';
  probe.style.left = '0';
  probe.style.top = '0';
  document.body.appendChild(probe);

  const measure = () => {
    const cs = getComputedStyle(target);
    const lineHeight = parseFloat(cs.lineHeight);
    if (!lineHeight) return null;

    let baseline = lineHeight * 0.68; // sensible default if metrics are unavailable

    if (ctx) {
      // use simplified font string so canvas metrics match our layout font
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const metrics = ctx.measureText('Hgyqp');
      const ascent = metrics.actualBoundingBoxAscent || 0;
      const descent = metrics.actualBoundingBoxDescent || 0;
      if (ascent || descent) {
        const textHeight = ascent + descent;
        const leading = Math.max(lineHeight - textHeight, 0);
        baseline = Math.min(lineHeight, (leading * 0.5) + ascent);
      }
    }

    // DOM-based adjustment: measure where the actual baseline renders
    probe.style.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    probe.style.lineHeight = `${lineHeight}px`;
    const rectProbe = probe.getBoundingClientRect();
    const domBaseline = rectProbe.bottom - rectProbe.top;
    if (domBaseline) baseline = domBaseline;

    return { lineHeight, baseline };
  };

  const apply = () => {
    const m = measure();
    if (!m) return;
    root.style.setProperty('--grid', `${m.lineHeight}px`);
    root.style.setProperty('--rule-offset', `${m.baseline}px`);

    // align repeating grid to the first content line baseline
    const main = document.querySelector('.site-main');
    const first = main ? main.firstElementChild : null;
    const mainTop = main ? (main.getBoundingClientRect().top + window.scrollY) : 0;
    const firstMargin = first ? (parseFloat(getComputedStyle(first).marginTop) || 0) : 0;
    const firstBaseline = mainTop + firstMargin + m.baseline;
    const offset = ((firstBaseline % m.lineHeight) - m.baseline + m.lineHeight * 2) % m.lineHeight;
    root.style.setProperty('--grid-offset', `${offset}px`);
  };

  const schedule = () => requestAnimationFrame(apply);

  schedule();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule);
  }
  window.addEventListener('resize', schedule, { passive: true });
})();

// home-only: lightweight matrix rain background
// motion: scroll reveal
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

// parallax effect for elements with data-parallax attribute
(function() {
  const els = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!els.length) return;
  const onScroll = () => {
    const y = window.scrollY || 0;
    for (const el of els) {
      const sp = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      el.style.setProperty('--py', (y * sp) + 'px');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// keep matrix rain only for retro theme (retro.css)
(function() {
  const hasRetro = !!document.querySelector('link[href*="retro.css"]');
  const isHome = document.body.classList.contains('is-home');
  if (!hasRetro || !isHome) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-bg';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const fontSize = 14;
  let columns = 0;
  let drops = [];
  const chars = '01░▒▓██ΣλπΩµ∑ƒψφχΞΔΓβ∫≈≠⊕⊗→←↑↓';

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    columns = Math.floor(W / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * (H / fontSize));
  };

  const tick = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ffe0';
    ctx.shadowColor = 'rgba(0,255,240,0.35)';
    ctx.shadowBlur = 8;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < columns; i++) {
      const ch = chars.charAt((Math.random() * chars.length) | 0);
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(ch, x, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();

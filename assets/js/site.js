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

// snap notebook images to the grid so following text starts on a ruled line
(function() {
  const root = document.documentElement;

  const parsePx = (value) => {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : 0;
  };

  const snap = () => {
    const grid = parsePx(getComputedStyle(root).getPropertyValue('--grid'));
    if (!grid) return;

    const images = document.querySelectorAll('.page-content img');
    images.forEach((img) => {
      if (!img.isConnected) return;

      const cs = getComputedStyle(img);
      if (cs.display === 'none') return;

      const cached = parsePx(img.dataset.baseMarginBottom || '');
      const baseMarginBottom = cached || parsePx(cs.marginBottom);
      if (!img.dataset.baseMarginBottom) {
        img.dataset.baseMarginBottom = String(baseMarginBottom);
      }

      // reset first, then compute extra spacing needed to reach next grid row
      img.style.marginBottom = `${baseMarginBottom}px`;

      const marginTop = parsePx(cs.marginTop);
      const total = marginTop + img.offsetHeight + baseMarginBottom;
      const remainder = ((total % grid) + grid) % grid;
      const adjustment = remainder === 0 ? 0 : (grid - remainder);

      img.style.marginBottom = `${baseMarginBottom + adjustment}px`;
    });
  };

  const schedule = () => requestAnimationFrame(snap);

  schedule();
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule, { once: true });

  document.querySelectorAll('.page-content img').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', schedule, { once: true });
  });
})();

// Dynamic ruled journal lines — measure every element, never trust CSS alone
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:-1;opacity:0;transition:opacity .4s ease;';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');
  const TEXT_LINE_SELECTOR = [
    'p', 'li', 'dt', 'dd', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '.hero-tag', '.hero-note', '.hero-status-label', '.hero-status-text',
    '.section-title', '.section-desc', '.card-kicker', '.card-title',
    '.card-excerpt', '.contact-link'
  ].join(', ');

  // A 0x0 inline-block at vertical-align:baseline: its bottom edge is placed
  // by the browser's own layout engine exactly on the text baseline.
  const probe = document.createElement('span');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = 'display:inline-block;width:0;height:0;overflow:hidden;vertical-align:baseline;';
  const textRange = document.createRange();

  // Cache keyed by computed style signature so we only DOM-probe once per
  // unique (font, size, weight, line-height) combination per draw call.
  const bCache = new Map();

  const baselineOff = (el) => {
    const cs  = getComputedStyle(el);
    const key = `${cs.fontFamily}|${cs.fontSize}|${cs.fontWeight}|${cs.lineHeight}`;
    if (bCache.has(key)) return bCache.get(key);
    el.insertBefore(probe, el.firstChild);
    const off = probe.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
    if (probe.parentNode === el) el.removeChild(probe);
    bCache.set(key, off);
    return off;
  };

  const collectLineTops = (el, bodyY) => {
    const tops = [];
    const seen = new Set();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue && node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    while (walker.nextNode()) {
      textRange.selectNodeContents(walker.currentNode);
      for (const rect of textRange.getClientRects()) {
        if (!rect.width || !rect.height) continue;
        const top = rect.top - bodyY;
        const key = Math.round(top * 2) / 2;
        if (seen.has(key)) continue;
        seen.add(key);
        tops.push(top);
      }
    }

    tops.sort((a, b) => a - b);
    return tops;
  };

  const draw = () => {
    bCache.clear();
    const dpr  = window.devicePixelRatio || 1;
    const W    = document.body.offsetWidth;
    const H    = document.body.offsetHeight;
    if (!W || !H) return;

    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const bodyY = document.body.getBoundingClientRect().top;
    const grid  = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--grid')) || 32;

    // Measure rendered lines from text nodes, then anchor each to its baseline.
    const rawYs = [];
    for (const el of document.querySelectorAll(TEXT_LINE_SELECTOR)) {
      if (!el.isConnected) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      const lh       = parseFloat(cs.lineHeight) || grid;
      const bOff     = baselineOff(el);
      const elTop    = rect.top - bodyY;
      const lineTops = collectLineTops(el, bodyY);

      if (lineTops.length) {
        const firstBaseline = elTop + bOff;
        const baselineDelta = firstBaseline - lineTops[0];
        for (const lineTop of lineTops) rawYs.push(lineTop + baselineDelta);
      } else {
        const numLines = Math.max(1, Math.round(rect.height / lh));
        for (let i = 0; i < numLines; i++) rawYs.push(elTop + bOff + i * lh);
      }
    }

    rawYs.sort((a, b) => a - b);

    // Build full line set: measured baselines + fill gaps + extend to page edges
    const lineSet = new Set(rawYs.map(y => Math.round(y)));

    for (let i = 1; i < rawYs.length; i++) {
      const steps = Math.round((rawYs[i] - rawYs[i - 1]) / grid);
      for (let s = 1; s < steps; s++) {
        lineSet.add(Math.round(rawYs[i - 1] + s * grid));
      }
    }

    if (rawYs.length) {
      for (let y = Math.round(rawYs[0]) - grid; y >= 0; y -= grid) lineSet.add(y);
      for (let y = Math.round(rawYs[rawYs.length - 1]) + grid; y <= H; y += grid) lineSet.add(y);
    }

    // Image exclusion zones
    const GAP   = 4;
    const zones = Array.from(document.querySelectorAll('.page-content img'))
      .filter(img => img.isConnected && getComputedStyle(img).display !== 'none')
      .map(img => {
        const r  = img.getBoundingClientRect();
        const cs = getComputedStyle(img);
        return {
          top:    r.top    - bodyY - (parseFloat(cs.marginTop)    || 0) - GAP,
          bottom: r.bottom - bodyY + (parseFloat(cs.marginBottom) || 0) + GAP,
        };
      });

    // Draw
    const MARGIN_X = 64;
    for (const rawY of Array.from(lineSet).sort((a, b) => a - b)) {
      const yr = rawY + 0.5;
      if (yr <= 0 || yr > H) continue;
      if (zones.some(z => yr >= z.top && yr <= z.bottom)) continue;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56,110,184,0.12)';
      ctx.lineWidth   = 1;
      ctx.moveTo(0,        yr);
      ctx.lineTo(MARGIN_X, yr);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56,110,184,0.38)';
      ctx.lineWidth   = 1;
      ctx.moveTo(MARGIN_X, yr);
      ctx.lineTo(W,        yr);
      ctx.stroke();
    }

    // Margin line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(206,68,68,0.55)';
    ctx.lineWidth   = 1;
    ctx.moveTo(MARGIN_X + 0.5, 0);
    ctx.lineTo(MARGIN_X + 0.5, H);
    ctx.stroke();

    canvas.style.opacity = '1';
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      queued = false;
      draw();
    }));
  };

  schedule();
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load',   schedule, { once: true });
  window.addEventListener('pageshow', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    const main = document.querySelector('.site-main');
    if (main) ro.observe(main);
  }

  if (typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', schedule, { once: true });
  });
  if (document.fonts?.ready) document.fonts.ready.then(schedule);
  if (document.fonts?.addEventListener) {
    document.fonts.addEventListener('loadingdone', schedule);
    document.fonts.addEventListener('loadingerror', schedule);
  }
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

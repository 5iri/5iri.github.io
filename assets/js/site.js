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

// highlight the current nav link
(function () {
  const path = (location.pathname || '').replace(/\/+$/, '');
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const url = href.replace(/\/+$/, '');
    if (url && (path === url || path.startsWith(url + '/'))) a.classList.add('active');
  });
})();

// scroll reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px' }
  );

  els.forEach((el) => io.observe(el));
})();

// keep the hover-peek card on screen: flip it below the trigger when there is
// no room above, and slide it sideways so it never runs off an edge.
(function () {
  const peeks = document.querySelectorAll('.hover-peek');
  if (!peeks.length) return;

  const MARGIN = 10;
  const GAP = 12;

  const place = (peek) => {
    const card = peek.querySelector('.hover-peek__card');
    if (!card) return;

    // measure from a clean slate, not from the last placement
    card.classList.remove('hover-peek__card--below');
    card.style.setProperty('--shift', '0px');

    const t = peek.getBoundingClientRect();
    const c = card.getBoundingClientRect();

    const roomAbove = t.top - GAP - MARGIN;
    const roomBelow = window.innerHeight - t.bottom - GAP - MARGIN;
    if (c.height > roomAbove && roomBelow > roomAbove) {
      card.classList.add('hover-peek__card--below');
    }

    // the card is centred on the trigger; nudge it back inside the viewport
    const left = t.left + t.width / 2 - c.width / 2;
    let shift = 0;
    if (left < MARGIN) shift = MARGIN - left;
    else if (left + c.width > window.innerWidth - MARGIN) {
      shift = window.innerWidth - MARGIN - (left + c.width);
    }
    card.style.setProperty('--shift', `${Math.round(shift)}px`);
  };

  peeks.forEach((peek) => {
    peek.addEventListener('pointerenter', () => place(peek));
    peek.addEventListener('focusin', () => place(peek));
  });

  window.addEventListener('resize', () => peeks.forEach(place), { passive: true });
})();

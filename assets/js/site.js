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


// Flag that JS is running so the CSS can switch to the collapsible mobile menu.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!btn || !nav) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (btn && nav) {
    btn.addEventListener('click', function () {
      setMenu(btn.getAttribute('aria-expanded') !== 'true');
    });
    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    // Close with Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    // Reset when resizing up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  // Resume: inline preview toggle (hidden on phones, where "View" opens the PDF directly)
  var toggle = document.getElementById('preview-toggle');
  var preview = document.getElementById('resume-preview');
  var frame = document.getElementById('resume-frame');
  if (toggle && preview && frame) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      var open = !preview.classList.contains('open');
      if (open && !frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.src);
      preview.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Hide preview' : 'Preview here';
    });
  }
});

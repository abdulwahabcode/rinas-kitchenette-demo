// Mirchi Hut — interactions
(function () {
  'use strict';

  // Sticky nav shadow
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Category carousel arrows
  var track = document.getElementById('catTrack');
  function cardStep() {
    var card = track.querySelector('.cat-card');
    if (!card) return 320;
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 18;
    return card.getBoundingClientRect().width + gap;
  }
  document.getElementById('catPrev').addEventListener('click', function () {
    track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
  document.getElementById('catNext').addEventListener('click', function () {
    track.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });

  // Menu tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function activateTab(name, scroll) {
    tabs.forEach(function (t) {
      var active = t.dataset.tab === name;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(function (p) {
      var show = p.id === 'panel-' + name;
      p.classList.toggle('active', show);
      if (show) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
    });
    if (scroll) {
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { activateTab(t.dataset.tab, false); });
  });

  // Category cards jump to the matching menu tab
  document.querySelectorAll('.cat-card').forEach(function (c) {
    c.addEventListener('click', function () { activateTab(c.dataset.tab, true); });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();

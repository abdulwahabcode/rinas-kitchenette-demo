/* Rina's Kitchenette — interactions (no build step, vanilla JS) */
(function () {
  "use strict";

  /* ── sticky nav shadow ── */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── mobile hamburger ── */
  var burger = document.getElementById("hamburger");
  var links = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ── menu category tabs ── */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".menu-tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".menu-panel"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(function (p) {
        p.classList.remove("is-active");
        p.hidden = true;
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var panel = document.querySelector('.menu-panel[data-panel="' + tab.dataset.tab + '"]');
      if (panel) {
        panel.classList.add("is-active");
        panel.hidden = false;
      }
    });
  });

  /* ── reveal on scroll ── */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── footer year ── */
  document.getElementById("year").textContent = new Date().getFullYear();
})();

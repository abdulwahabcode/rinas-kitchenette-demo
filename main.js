/* Peeru's Café — interactions: menu tabs, qawwali schedule, nav, lightbox, newsletter */
(function () {
  "use strict";

  /* ---------------- Menu data ---------------- */
  var MENU = {
    breakfast: [
      { name: "Desi Breakfast Platter", price: "Rs 550", tag: "Signature", desc: "Lacha paratha, masala omelette, suji halwa and a kulhad of doodh patti." },
      { name: "Halwa Puri Set", price: "Rs 450", desc: "Fluffy puris, chana masala, aloo tarkari and sweet suji halwa." },
      { name: "Chana Puri", price: "Rs 380", desc: "Two crisp puris with our slow-cooked Lahori chana." },
      { name: "Anda Paratha", price: "Rs 280", desc: "Golden desi-ghee paratha wrapped around a masala omelette." },
      { name: "Lacha Paratha + Omelette", price: "Rs 320", desc: "Flaky layered paratha with a two-egg omelette, served with achar." },
      { name: "Desi French Toast", price: "Rs 350", desc: "Thick bread dipped in sweetened egg and milk, griddled in desi ghee." }
    ],
    classics: [
      { name: "Sufi Platter (BBQ Mix)", price: "Rs 1,650", tag: "For Two", desc: "Seekh kabab, malai boti, chicken tikka and chapli kabab with naan and raita." },
      { name: "Chicken Paratha Roll", price: "Rs 380", desc: "Char-grilled chicken strips, onions and mint chutney in a flaky paratha." },
      { name: "Beef Chapli Kabab", price: "Rs 420", desc: "Peshawari-style chapli, two pieces, with naan, salad and raita." },
      { name: "Chicken Tikka Platter", price: "Rs 950", desc: "Two full leg tikkas, seekh kabab, fries and tandoori naan." },
      { name: "Peeru's Special Burger", price: "Rs 650", desc: "Grilled chicken fillet, chapli-style patty option, secret sauce, fries." },
      { name: "Loaded Fries", price: "Rs 480", desc: "Crispy fries topped with tikka chunks, cheese sauce and jalapeños." },
      { name: "Club Sandwich", price: "Rs 520", desc: "Triple-decker with grilled chicken, egg and fries on the side." }
    ],
    desi: [
      { name: "Chicken Biryani", price: "Rs 350", tag: "Crowd Favourite", desc: "Lahori-style with aloo, served with raita and salad." },
      { name: "Chicken Karahi (Half)", price: "Rs 850", desc: "Tomato-ginger karahi in desi ghee, with two tandoori naan." },
      { name: "Chicken White Karahi (Half)", price: "Rs 950", desc: "Creamy kali-mirch karahi, mild and rich — a Peeru's regular's pick." },
      { name: "Daal Fry + Tandoori Roti", price: "Rs 320", desc: "Chana daal tempered in desi ghee with two hot tandoori rotis." },
      { name: "Seekh Kabab (4 pc)", price: "Rs 480", desc: "Hand-minced, smoked over coals, with onion rings and chutney." },
      { name: "Malai Boti", price: "Rs 620", desc: "Cream-and-cheese marinated chicken cubes, charred at the edges." },
      { name: "Mutton Paya (Weekends)", price: "Rs 750", desc: "Slow-simmered overnight, served Friday to Sunday with kulcha naan." }
    ],
    chai: [
      { name: "Doodh Patti", price: "Rs 180", tag: "Signature", desc: "Slow-brewed in pure milk, the Peeru's way — no shortcuts." },
      { name: "Kashmiri Chai", price: "Rs 250", desc: "Pink tea with crushed pistachios and almonds." },
      { name: "Elaichi Chai", price: "Rs 200", desc: "Strong doodh patti lifted with green cardamom." },
      { name: "Gur wali Chai", price: "Rs 220", desc: "Jaggery-sweetened chai with adrak — winter in a cup." },
      { name: "Cold Coffee", price: "Rs 450", desc: "Blended thick with vanilla ice cream, cocoa dusted." },
      { name: "Cappuccino", price: "Rs 400", desc: "Double shot, velvety foam, proper Italian style." },
      { name: "Café Latte", price: "Rs 420", desc: "Mellow and milky — the quiet companion to a long adda." },
      { name: "Espresso", price: "Rs 300", desc: "Short, strong, honest." },
      { name: "Mint Margarita", price: "Rs 350", desc: "Crushed mint, lime and soda over ice." },
      { name: "Fresh Lime Soda", price: "Rs 250", desc: "Sweet, salted or mixed — your call." }
    ],
    desserts: [
      { name: "Kulfi Falooda", price: "Rs 380", tag: "Must Try", desc: "Traditional kulfi over falooda, rose syrup and basil seeds." },
      { name: "Shahi Tukra", price: "Rs 300", desc: "Saffron-soaked bread pudding with rabri and pistachios." },
      { name: "Gulab Jamun (4 pc)", price: "Rs 250", desc: "Served warm, with a whisper of cardamom syrup." },
      { name: "Kheer", price: "Rs 220", desc: "Slow-cooked rice pudding in a clay bowl, chilled." },
      { name: "Chocolate Lava Cake", price: "Rs 450", desc: "Molten-centre cake with a scoop of vanilla ice cream." }
    ]
  };

  function renderMenu(key) {
    var panel = document.getElementById("panel-" + key);
    if (!panel) return;
    panel.innerHTML = MENU[key].map(function (it) {
      var tag = it.tag ? '<span class="item-tag">' + it.tag + "</span>" : "";
      return (
        '<article class="menu-item">' +
          '<div class="item-top">' +
            '<span class="item-name">' + it.name + tag + "</span>" +
            '<span class="item-dots" aria-hidden="true"></span>' +
            '<span class="item-price">' + it.price + "</span>" +
          "</div>" +
          '<p class="item-desc">' + it.desc + "</p>" +
        "</article>"
      );
    }).join("");
  }
  Object.keys(MENU).forEach(renderMenu);

  /* Menu tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".menu-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.id === "panel-" + tab.dataset.tab);
      });
    });
  });

  /* ---------------- Qawwali schedule: next 4 Fridays ---------------- */
  (function buildSchedule() {
    var list = document.getElementById("scheduleList");
    if (!list) return;
    var d = new Date();
    var fridays = [];
    while (fridays.length < 4) {
      if (d.getDay() === 5) fridays.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    var fmt = { day: "numeric", month: "long" };
    list.innerHTML = fridays.map(function (f, i) {
      var label = i === 0 ? "This Friday" : "Friday";
      return (
        "<li>" +
          '<span class="sched-date">' + label + "<small>" +
          f.toLocaleDateString("en-GB", fmt) + " · Qawwal Party Live</small></span>" +
          '<span class="sched-time">8:00 PM</span>' +
        "</li>"
      );
    }).join("");
  })();

  /* ---------------- Nav: scroll state + mobile toggle ---------------- */
  var nav = document.getElementById("siteNav");
  var toggle = document.getElementById("navToggle");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Gallery lightbox ---------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".g-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      lightboxImg.src = btn.dataset.full;
      lightboxImg.alt = btn.querySelector("img").alt + " (enlarged)";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    });
  });
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------------- Newsletter ---------------- */
  var form = document.getElementById("newsForm");
  var email = document.getElementById("newsEmail");
  var msg = document.getElementById("newsMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var val = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "news-msg err";
      email.focus();
      return;
    }
    msg.textContent = "Shukriya! You're on the list — see you Friday. \u266A";
    msg.className = "news-msg ok";
    form.reset();
  });
})();

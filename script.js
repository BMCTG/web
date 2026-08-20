/* ═══════════════════════════════════════════
   BMCTG — Website Script
   ═══════════════════════════════════════════ */

/* ── Preloader ── */
window.addEventListener("load", function () {
  var p = document.getElementById("preloader");
  if (p) setTimeout(function () { p.classList.add("hidden"); }, 600);
});
setTimeout(function () {
  var p = document.getElementById("preloader");
  if (p) p.classList.add("hidden");
}, 4000);

/* ── Navbar scroll ── */
var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* ── Mobile nav ── */
var navToggle = document.getElementById("navToggle");
var navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { navLinks.classList.remove("open"); });
  });
}

/* ── Back to top ── */
var backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("show", window.scrollY > 500);
  });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── Scroll reveal ── */
function initReveal() {
  var reveals = document.querySelectorAll(".reveal");
  var wh = window.innerHeight;
  reveals.forEach(function (el) {
    var top = el.getBoundingClientRect().top;
    if (top < wh - 60) el.classList.add("active");
  });
}
window.addEventListener("scroll", initReveal);
window.addEventListener("load", function () { setTimeout(initReveal, 200); });

/* ── Counter animation ── */
var countersDone = false;
function animateCounters() {
  if (countersDone) return;
  var counters = document.querySelectorAll(".impact-number[data-count]");
  if (!counters.length) return;
  var rect = counters[0].getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;
  countersDone = true;
  counters.forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 2000, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + "+";
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + "+";
    }
    requestAnimationFrame(step);
  });
}
window.addEventListener("scroll", animateCounters);
window.addEventListener("load", function () { setTimeout(animateCounters, 500); });

/* ── Active nav link ── */
(function () {
  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === page) a.classList.add("active");
    else a.classList.remove("active");
  });
})();

/* ── Contact form ── */
var contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector("button[type='submit']");
    if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }
    setTimeout(function () {
      var thanks = document.getElementById("formSuccess");
      if (thanks) {
        contactForm.style.display = "none";
        thanks.style.display = "block";
      } else {
        alert("Thank you! We will get back to you soon.");
        contactForm.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Send Message"; }
      }
    }, 1200);
  });
}

/* ── Language switch (placeholder) ── */
document.querySelectorAll(".lang-switch button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".lang-switch button").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
  });
});

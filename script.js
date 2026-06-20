(function () {
  "use strict";

  const form         = document.getElementById("contact-form");
  const nameInput    = document.getElementById("name");
  const phoneInput   = document.getElementById("phone");
  const serviceInput = document.getElementById("service");
  const messageInput = document.getElementById("message");
  const successBox   = document.getElementById("form-success");
  const fallbackLink = document.getElementById("fallback-link");
  const hamburger    = document.getElementById("hamburger-btn");
  const mobileNav    = document.getElementById("mobile-nav");
  const footerYear   = document.getElementById("footer-year");

  var WHATSAPP_NUMBER = "919988861541";

  if (footerYear) footerYear.textContent = new Date().getFullYear();

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("open");
      if (isOpen) {
        mobileNav.classList.remove("open");
        setTimeout(function () { mobileNav.classList.add("hidden"); }, 350);
        hamburger.querySelector(".material-symbols-outlined").textContent = "menu";
      } else {
        mobileNav.classList.remove("hidden");
        void mobileNav.offsetHeight;
        mobileNav.classList.add("open");
        hamburger.querySelector(".material-symbols-outlined").textContent = "close";
      }
    });

    var mobileLinks = mobileNav.querySelectorAll("a");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () {
        mobileNav.classList.remove("open");
        setTimeout(function () { mobileNav.classList.add("hidden"); }, 350);
        hamburger.querySelector(".material-symbols-outlined").textContent = "menu";
      });
    }
  }

  var learnMoreLinks = document.querySelectorAll(".learn-more-link");
  for (var j = 0; j < learnMoreLinks.length; j++) {
    learnMoreLinks[j].addEventListener("click", function (e) {
      e.preventDefault();
      var serviceName = this.getAttribute("data-service");
      if (serviceName && serviceInput) {
        for (var k = 0; k < serviceInput.options.length; k++) {
          if (serviceInput.options[k].value === serviceName) {
            serviceInput.selectedIndex = k;
            serviceInput.classList.remove("text-muted");
            serviceInput.classList.add("text-navy");
            break;
          }
        }
      }
      var contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(function () { if (nameInput) nameInput.focus(); }, 600);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      var valid = true;

      if (!nameInput.value.trim()) {
        showError("name");
        valid = false;
      }
      if (!phoneInput.value.trim()) {
        showError("phone");
        valid = false;
      }
      if (!serviceInput.value) {
        showError("service");
        valid = false;
      }

      if (!valid) return;

      var msg = [
        "New Enquiry from Website",
        "Name: "    + nameInput.value.trim(),
        "Phone: "   + phoneInput.value.trim(),
        "Service: " + serviceInput.value,
        "Message: " + (messageInput.value.trim() || "N/A"),
      ].join("\n");

      var whatsappURL = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

      window.open(whatsappURL, "_blank");

      if (fallbackLink) fallbackLink.href = whatsappURL;
      if (successBox) successBox.classList.remove("hidden");

      setTimeout(function () {
        if (successBox) successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 200);
    });
  }

  function showError(fieldId) {
    var input   = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + "-error");
    if (input)   input.classList.add("input-error");
    if (errorEl) errorEl.classList.remove("hidden");
  }

  function clearErrors() {
    var inputErrors = document.querySelectorAll(".input-error");
    for (var m = 0; m < inputErrors.length; m++) inputErrors[m].classList.remove("input-error");
    var fieldErrors = document.querySelectorAll(".field-error");
    for (var n = 0; n < fieldErrors.length; n++) fieldErrors[n].classList.add("hidden");
    if (successBox) successBox.classList.add("hidden");
  }

  var fieldIds = ["name", "phone", "service"];
  for (var f = 0; f < fieldIds.length; f++) {
    (function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", function () {
          el.classList.remove("input-error");
          var err = document.getElementById(id + "-error");
          if (err) err.classList.add("hidden");
        });
        el.addEventListener("change", function () {
          el.classList.remove("input-error");
          var err = document.getElementById(id + "-error");
          if (err) err.classList.add("hidden");
          if (id === "service" && el.value) {
            el.classList.remove("text-muted");
            el.classList.add("text-navy");
          }
        });
      }
    })(fieldIds[f]);
  }

  function animateOnScroll(selector) {
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        for (var p = 0; p < entries.length; p++) {
          if (entries[p].isIntersecting) {
            (function (target, delay) {
              setTimeout(function () {
                target.classList.add("visible");
              }, delay);
            })(entries[p].target, p * 80);
            observer.unobserve(entries[p].target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    for (var q = 0; q < elements.length; q++) observer.observe(elements[q]);
  }

  animateOnScroll(".service-card");
  animateOnScroll(".trust-badge");

  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    var scrollY = window.scrollY + 120;
    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        for (var t = 0; t < navLinks.length; t++) {
          navLinks[t].classList.remove("active", "border-navy", "text-navy");
          navLinks[t].classList.add("text-muted");
          var href = navLinks[t].getAttribute("href");
          if (href === "#" + id || (id === "home" && href === "#")) {
            navLinks[t].classList.add("active", "border-navy", "text-navy");
            navLinks[t].classList.remove("text-muted");
          }
        }
      }
    }
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

})();

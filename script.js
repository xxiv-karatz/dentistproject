document.addEventListener("DOMContentLoaded", function () {
  if (window.lucide) {
    lucide.createIcons();
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var siteHeader = document.getElementById("siteHeader");
  if (siteHeader) {
    var updateHeaderState = function () {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  var menuToggle = document.getElementById("mobileToggle");
  var mobileNav = document.getElementById("mobileNav");
  var menuIcon = document.getElementById("menuIcon");
  var closeIcon = document.getElementById("closeIcon");

  var navLinks = mobileNav.querySelectorAll("a[href^='#']");
  var contactForm = document.getElementById("contactForm");
  var successMessage = document.getElementById("successMessage");
  var resetForm = document.getElementById("resetForm");

  function updateMenuButton(isOpen) {
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      menuIcon.style.display = "none";
      closeIcon.style.display = "inline-flex";
      mobileNav.style.display = "flex";
      menuToggle.classList.add("active");
    } else {
      menuIcon.style.display = "inline-flex";
      closeIcon.style.display = "none";
      mobileNav.style.display = "none";
      menuToggle.classList.remove("active");
    }
  }

  updateMenuButton(false);

  menuToggle.addEventListener("click", function () {
    var isOpen = mobileNav.style.display !== "none";
    updateMenuButton(!isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      updateMenuButton(false);
    });
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var phoneField = document.getElementById("phone");
    var dateField = document.getElementById("date");
    var messageField = document.getElementById("message");

    var subject = encodeURIComponent("Appointment Request - FriendlyDentist");
    var body = encodeURIComponent(
      "Hello FriendlyDentist team,\n\n" +
        "I would like to book an appointment.\n\n" +
        "APPOINTMENT DETAILS:\n" +
        "Full name: " + nameField.value + "\n" +
        "Email: " + emailField.value + "\n" +
        "Phone: " + phoneField.value + "\n" +
        "Preferred date: " + dateField.value + "\n" +
        "Message: " + messageField.value + "\n\n" +
        "Thank you,\nBest regards"
    );

    window.location.href = "mailto:info@friendlydentist.co.za?subject=" + subject + "&body=" + body;
  });

  resetForm.addEventListener("click", function () {
    contactForm.reset();
    successMessage.classList.add("hidden");
    contactForm.classList.remove("hidden");
  });
});
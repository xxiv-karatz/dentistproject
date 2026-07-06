document.addEventListener("DOMContentLoaded", function () {
  if (window.lucide) {
    lucide.createIcons();
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
    if (isOpen) {
      menuIcon.style.display = "none";
      closeIcon.style.display = "inline-flex";
      mobileNav.style.display = "flex";
    } else {
      menuIcon.style.display = "inline-flex";
      closeIcon.style.display = "none";
      mobileNav.style.display = "none";
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
      "Hello FriendlyDentist team,%0D%0A%0D%0AI would like to book an appointment.%0D%0A%0D%0A" +
        "Full name: " + nameField.value + "%0D%0A" +
        "Email: " + emailField.value + "%0D%0A" +
        "Phone: " + phoneField.value + "%0D%0A" +
        "Preferred date: " + dateField.value + "%0D%0A" +
        "Message: " + messageField.value + "%0D%0A%0D%0AThank you,%0D%0A"
    );

    window.location.href = "mailto:info@friendlydentist.co.za?subject=" + subject + "&body=" + body;
  });

  resetForm.addEventListener("click", function () {
    contactForm.reset();
    successMessage.classList.add("hidden");
    contactForm.classList.remove("hidden");
  });
});

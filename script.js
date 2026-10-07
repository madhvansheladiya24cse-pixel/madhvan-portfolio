// Madhvan Sheladiya Portfolio - JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const progressBars = document.querySelectorAll(".progress-bar");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Dynamic year
  year.textContent = new Date().getFullYear();

  // Navbar shadow/border on scroll
  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar);

  // Animate skill bars when visible
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          bar.style.width = `${bar.dataset.width}%`;
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById("skills");
  if (skillsSection) progressObserver.observe(skillsSection);

  // Theme toggle with localStorage
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  themeToggle.addEventListener("click", () => {
    const light = document.body.classList.toggle("light-mode");
    localStorage.setItem("portfolio-theme", light ? "light" : "dark");
    themeToggle.innerHTML = light
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';
  });

  // Front-end contact form validation.
  // On a static GitHub Pages site, this opens the user's email client.
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      formStatus.textContent = "Please fill in all fields correctly.";
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const body = `Hello Madhvan,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    const mailto = `mailto:madhvansheladiya.24.cse@iite.indusuni.ac.in?subject=${encodeURIComponent(subject)}&body=${body}`;

    formStatus.textContent = "Opening your email app...";
    window.location.href = mailto;
  });

  // Close mobile menu after navigation
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});

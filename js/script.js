const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const form = document.querySelector("#contact-form");
const feedback = document.querySelector(".form-feedback");

// Controls the mobile menu and keeps accessibility attributes in sync.
function setMenuState(isOpen) {
  menuToggle.classList.toggle("is-active", isOpen);
  navPanel.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = !navPanel.classList.contains("is-open");
  setMenuState(isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

// Adds header shadow after the first scroll.
function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// Reveals content as it enters the viewport.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Marks the active menu link based on the visible section.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// The form is sent by FormSubmit to the email configured in index.html.
form.addEventListener("submit", () => {
  if (!form.checkValidity()) return;

  feedback.textContent = "Enviando mensagem por email...";
});

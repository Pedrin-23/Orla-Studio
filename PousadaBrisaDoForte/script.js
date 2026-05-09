const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const revealElements = document.querySelectorAll(".reveal");

function setMenuState(isOpen) {
  menuToggle.classList.toggle("is-active", isOpen);
  nav.classList.toggle("is-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  setMenuState(!nav.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 16);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

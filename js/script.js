const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const form = document.querySelector("#contact-form");
const feedback = document.querySelector(".form-feedback");

const whatsappNumber = "5522999999999";

// Controla o menu mobile e mantém os atributos de acessibilidade sincronizados.
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

// Aplica sombra no header após a primeira rolagem.
function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// Revela conteúdos gradualmente quando entram na viewport.
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

// Marca o link ativo do menu conforme a seção visível.
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

// O formulário cria uma mensagem pronta e abre o WhatsApp para contato direto.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const project = formData.get("project");
  const message = formData.get("message").trim();

  const whatsappMessage = [
    "Olá, Orla Studio!",
    `Meu nome é ${name}.`,
    `Email: ${email}.`,
    `Tipo de projeto: ${project}.`,
    `Mensagem: ${message}`
  ].join("\n");

  feedback.textContent = "Mensagem pronta. Abrindo WhatsApp para envio.";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener");
  form.reset();
});

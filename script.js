const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    document.getElementById(button.dataset.tab)?.classList.add("active");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a[href^='#']")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const dashboardTabs = [...document.querySelectorAll(".dashboard-tab")];
const dashboardLinks = [...document.querySelectorAll(".dashboard-link")];
const dashboardSections = [...document.querySelectorAll(".dashboard-section")];

const tabAliases = {
  home: "overview",
  overview: "overview",
  scenarios: "scenarios",
  roadmap: "roadmap",
  lenses: "lenses",
  comparisons: "lenses",
  evidence: "lenses",
  journal: "journal",
  ai: "ai-fit",
  "model-fit": "ai-fit",
  "ai-fit": "ai-fit",
  rubrics: "rubric",
  rubric: "rubric",
  downloads: "downloads"
};

function setDashboardTab(tabName, updateHash = true) {
  const activeTab = tabAliases[tabName] || "overview";

  dashboardTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === activeTab;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  dashboardSections.forEach((section) => {
    const isActive = section.dataset.dashboardTab === activeTab;
    section.classList.toggle("active", isActive);
    section.hidden = !isActive;
  });

  if (navLinks && navToggle) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (updateHash) {
    history.replaceState(null, "", `#${activeTab}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

dashboardTabs.forEach((tab) => {
  tab.addEventListener("click", () => setDashboardTab(tab.dataset.tab));
});

dashboardLinks.forEach((link) => {
  link.addEventListener("click", () => setDashboardTab(link.dataset.tab));
});

const initialHash = window.location.hash.replace("#", "");
setDashboardTab(initialHash || "overview", false);

window.addEventListener("hashchange", () => {
  setDashboardTab(window.location.hash.replace("#", "") || "overview", false);
});

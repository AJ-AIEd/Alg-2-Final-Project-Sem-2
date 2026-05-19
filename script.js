const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const dashboardTabs = [...document.querySelectorAll(".dashboard-tab[data-tab]")];
const dashboardLinks = [...document.querySelectorAll(".dashboard-link")];
const dashboardSections = [...document.querySelectorAll(".dashboard-section")];
const navZones = [...document.querySelectorAll(".nav-zone")];
const progressStages = [...document.querySelectorAll(".investigation-progress [data-stage]")];

const tabAliases = {
  home: "overview",
  overview: "overview",
  start: "overview",
  "start-here": "overview",
  scenarios: "scenarios",
  systems: "scenarios",
  roadmap: "roadmap",
  timeline: "roadmap",
  lenses: "lenses",
  models: "lenses",
  comparisons: "lenses",
  evidence: "lenses",
  journal: "journal",
  notebook: "journal",
  ai: "ai-fit",
  "model-fit": "ai-fit",
  "ai-fit": "ai-fit",
  challenge: "ai-fit",
  "challenge-the-model": "ai-fit",
  test: "ai-fit",
  "test-your-model": "ai-fit",
  "check-the-model": "ai-fit",
  rubrics: "rubric",
  rubric: "rubric",
  progress: "progress",
  tracker: "progress",
  downloads: "downloads",
  resources: "downloads"
};

const tabZones = {
  overview: "start",
  scenarios: "start",
  roadmap: "start",
  lenses: "build",
  journal: "build",
  "ai-fit": "build",
  rubric: "synthesize",
  progress: "synthesize",
  downloads: "synthesize"
};

const tabStages = {
  overview: "observation",
  scenarios: "observation",
  roadmap: "prediction",
  lenses: "comparison",
  journal: "revision",
  "ai-fit": "revision",
  rubric: "synthesis",
  progress: "synthesis",
  downloads: "synthesis"
};

function setDashboardTab(tabName, updateHash = true) {
  const activeTab = tabAliases[tabName] || "overview";
  const activeZone = tabZones[activeTab] || "start";
  const activeStage = tabStages[activeTab] || "observation";

  dashboardTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === activeTab;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  navZones.forEach((zone) => {
    zone.classList.toggle("active-zone", zone.dataset.zone === activeZone);
  });

  progressStages.forEach((stage) => {
    stage.classList.toggle("active", stage.dataset.stage === activeStage);
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

if (dashboardSections.length) {
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
}

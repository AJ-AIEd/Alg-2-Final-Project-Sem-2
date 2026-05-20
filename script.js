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
  board: "progress",
  "investigation-board": "progress",
  "project-board": "progress",
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

const bogotaStepData = [
  {
    title: "The city and its water",
    context: "Bogotá depends heavily on the Chingaza reservoir system, a mountain water system northeast of the city. If Chingaza drops, there is no simple replacement.",
    facts: [
      ["Share of water", "70%", "From Chingaza alone"],
      ["How it flows", "Gravity", "Mountain to city"],
      ["Main reservoir", "Chuza", "254 million m3 when full"],
      ["Backup system", "Tibitoc", "Normally about 25%"]
    ],
    callout: ["warn", "The vulnerability: one main source supplies most of the city. A local reservoir graph is also a systems graph."],
    question: "What variables might matter before we even build a model?",
    note: "Think first: list possible inputs, outputs, and pressures before asking Flint for source ideas.",
    chart: "system"
  },
  {
    title: "20 years of ups and downs",
    context: "Zooming out changes what you notice. The reservoir does not simply rise or fall once. It fluctuates across years, drought periods, and recovery periods.",
    callout: ["info", "A short data window can create false certainty. A longer frame can reveal cycles, recovery, and missing variables."],
    question: "Which timeframe would be most responsible to show?",
    note: "Discuss first: which graph could create panic, and which graph could hide risk?",
    chart: "history"
  },
  {
    title: "The crisis window: April 2024",
    context: "By April 2024, the short-window graph looked alarming. This is the moment when a decision had to be made, before the future was obvious.",
    facts: [
      ["Mar. 30", "39%", "Concerning"],
      ["Apr. 11", "16.5%", "Rationing begins"],
      ["Apr. 18", "14.9%", "Still falling"],
      ["Apr. 22", "16.1%", "Small uptick"]
    ],
    callout: ["danger", "Rationing split the city into zones. Each day, one zone went without running water for 24 hours."],
    question: "From this window alone, what would you predict?",
    note: "Mathematics here: repeated change, slope, local trend, and extrapolation.",
    chart: "crisis"
  },
  {
    title: "Why the linear model made sense, and where it broke",
    context: "A linear model using April 11 and April 18 gave a clear warning. It was useful for action, but incomplete for long-term prediction.",
    callout: ["success", "Where it worked: the direction was right. The slope showed a dangerous decline and supported immediate action."],
    secondaryCallout: ["danger", "Where it broke: it assumed the decline would keep going. It could not see rationing, behavior change, or later rainfall."],
    question: "When is a useful model still an incomplete model?",
    note: "Model audit: what does the line reveal, and what does it hide?",
    chart: "linear"
  },
  {
    title: "Why exponential did not fit",
    context: "An exponential model assumes the reservoir loses a fixed percentage over equal time intervals. The April ratios did not behave that way.",
    facts: [
      ["Apr. 11 to Apr. 17", "0.923", "Large percentage drop"],
      ["Apr. 17 to Apr. 18", "0.989", "Almost flat"],
      ["Apr. 18 to Apr. 22", "1.078", "Increased"],
      ["Conclusion", "Unstable", "Not clean exponential decay"]
    ],
    callout: ["warn", "City demand does not shrink just because the reservoir is low. People still need water. That makes a constant-loss model more believable locally."],
    question: "What would have to be true for exponential decay to make sense?",
    note: "Use Flint only after your group has a first answer. Ask it to challenge your assumptions, not decide for you.",
    chart: "ratios"
  },
  {
    title: "The full picture: what models could not see",
    context: "Now the frame changes again. The full 2024-2025 arc shows crisis, rationing, slow recovery, then faster recovery when rainfall patterns shifted.",
    callout: ["success", "Rationing helped by slowing consumption. Rainfall and climate patterns helped drive the later recovery."],
    secondaryCallout: ["warn", "No local reservoir equation could fully predict the turning point. The missing variable lived outside the graph."],
    question: "What variable could completely change your model?",
    note: "Verify: compare the graph, the source, and the real-world mechanism.",
    chart: "full"
  },
  {
    title: "So which model would you defend?",
    context: "The goal is not to find one perfect equation. The goal is to decide which model was most responsible to use at that moment.",
    comparison: [
      ["Linear model", "Clear, explainable, useful for immediate danger. It overpredicted long-term collapse."],
      ["Exponential model", "Mathematically possible, but the ratios and physical mechanism did not fit the crisis well."]
    ],
    callout: ["info", "Strong math is not pretending certainty. Strong math is saying what your model supports, what it cannot see, and what evidence would change your mind."],
    question: "What would you currently defend, and what would you admit remains uncertain?",
    note: "Stop and synthesize: what do we currently believe?",
    chart: "defend"
  }
];

function stepperFactMarkup(facts = []) {
  return facts.map(([label, value, sub]) => `
    <div class="stepper-fact">
      <small>${label}</small>
      <strong>${value}</strong>
      <span>${sub}</span>
    </div>
  `).join("");
}

function stepperCalloutMarkup(callout) {
  if (!callout) return "";
  const [tone, text] = callout;
  return `<p class="stepper-callout ${tone}">${text}</p>`;
}

function stepperComparisonMarkup(comparison = []) {
  if (!comparison.length) return "";
  return `
    <div class="stepper-comparison">
      ${comparison.map(([heading, text]) => `<article><h4>${heading}</h4><p>${text}</p></article>`).join("")}
    </div>
  `;
}

function chartFrame(title, body, caption, ariaLabel) {
  return `
    <figure class="stepper-chart">
      <svg viewBox="0 0 700 430" role="img" aria-label="${ariaLabel}">
        <rect width="700" height="430" rx="22" fill="#ffffff"/>
        ${body}
        <text x="48" y="44" fill="#111827" font-size="22" font-weight="900">${title}</text>
      </svg>
      <figcaption class="stepper-caption">${caption}</figcaption>
    </figure>
  `;
}

function axesMarkup() {
  return `
    <path d="M70 72V350H650" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <g stroke="#e2e8f0" stroke-width="1">
      <path d="M70 300H650"/><path d="M70 250H650"/><path d="M70 200H650"/><path d="M70 150H650"/><path d="M70 100H650"/>
    </g>
  `;
}

function bogotaSystemSvg() {
  return chartFrame(
    "A mountain system supplies a city",
    `
      <rect x="72" y="86" width="556" height="246" rx="18" fill="#eff6ff"/>
      <path d="M110 275 L210 130 L300 245 L390 110 L520 278" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="250" cy="255" rx="92" ry="28" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/>
      <rect x="465" y="215" width="84" height="76" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
      <path d="M330 258 C380 250 408 235 458 238" fill="none" stroke="#15803d" stroke-width="5" stroke-dasharray="9 8"/>
      <text x="193" y="309" fill="#1e3a8a" font-size="15" font-weight="900">Chingaza</text>
      <text x="455" y="314" fill="#111827" font-size="15" font-weight="900">Bogota</text>
      <text x="88" y="112" fill="#475569" font-size="14" font-weight="800">rainfall</text>
      <text x="360" y="227" fill="#166534" font-size="14" font-weight="800">gravity flow</text>
      <text x="500" y="200" fill="#475569" font-size="14" font-weight="800">demand</text>
    `,
    "Before modeling, students identify variables, pressures, and possible sources.",
    "Diagram showing Chingaza mountain water system connected to Bogota by gravity flow"
  );
}

function bogotaHistorySvg() {
  const years = ["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024", "2025"];
  const levels = [76, 84, 72, 43, 88, 80, 48, 86, 78, 72, 12, 90];
  const bars = levels.map((level, index) => {
    const x = 88 + index * 45;
    const h = level * 2.45;
    const y = 350 - h;
    const drought = ["2010", "2016", "2024"].includes(years[index]);
    return `
      <rect x="${x}" y="${y}" width="26" height="${h}" rx="5" fill="${drought ? "#ef4444" : "#60a5fa"}" opacity=".82"/>
      <text x="${x + 13}" y="374" text-anchor="middle" fill="#64748b" font-size="11">${years[index]}</text>
    `;
  }).join("");
  return chartFrame(
    "Twenty years changes the story",
    `
      ${axesMarkup()}
      <path d="M70 301H650" stroke="#f59e0b" stroke-width="3" stroke-dasharray="7 7"/>
      <text x="540" y="294" fill="#92400e" font-size="13" font-weight="900">danger zone</text>
      ${bars}
      <text x="92" y="86" fill="#2563eb" font-size="13" font-weight="900">normal / wet years</text>
      <text x="410" y="122" fill="#991b1b" font-size="13" font-weight="900">El Nino drought drops</text>
    `,
    "Approximate teaching data: the point is the frame, not a perfect dataset.",
    "Bar chart of approximate Chingaza reservoir levels across 2004 to 2025 showing drought drops and recovery"
  );
}

function bogotaCrisisSvg() {
  return chartFrame(
    "April 2024 crisis window",
    `
      ${axesMarkup()}
      <text x="72" y="377" fill="#64748b" font-size="13">Apr 11</text>
      <text x="270" y="377" fill="#64748b" font-size="13">Apr 18</text>
      <text x="528" y="377" fill="#64748b" font-size="13">Apr 22</text>
      <text x="28" y="125" fill="#64748b" font-size="12">17%</text>
      <text x="28" y="265" fill="#64748b" font-size="12">15%</text>
      <path d="M105 124 L305 266 L560 188" fill="none" stroke="#7e22ce" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M105 124 L305 266 L545 360" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="9 8"/>
      <circle cx="105" cy="124" r="8" fill="#7e22ce"/><circle cx="305" cy="266" r="8" fill="#7e22ce"/><circle cx="560" cy="188" r="8" fill="#7e22ce"/>
      <text x="116" y="114" fill="#111827" font-size="14" font-weight="900">16.5%</text>
      <text x="316" y="264" fill="#111827" font-size="14" font-weight="900">14.9%</text>
      <text x="505" y="176" fill="#111827" font-size="14" font-weight="900">16.1%</text>
      <text x="350" y="338" fill="#991b1b" font-size="15" font-weight="900">local extrapolation: collapse?</text>
    `,
    "The first model should feel reasonable. That is what makes revision matter.",
    "Line chart of April 2024 crisis window with local extrapolation predicting continued collapse"
  );
}

function bogotaLinearSvg() {
  return chartFrame(
    "Linear prediction vs what happened",
    `
      ${axesMarkup()}
      <path d="M102 128 L310 218 L612 348" fill="none" stroke="#2563eb" stroke-width="5" stroke-dasharray="10 8"/>
      <path d="M102 128 C190 200 245 298 330 318 C420 328 495 270 612 230" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
      <path d="M70 318H650" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8 8"/>
      <circle cx="330" cy="318" r="8" fill="#16a34a"/>
      <text x="342" y="313" fill="#166534" font-size="13" font-weight="900">actual bottom</text>
      <text x="382" y="342" fill="#1d4ed8" font-size="14" font-weight="900">linear model keeps falling</text>
      <text x="426" y="228" fill="#166534" font-size="14" font-weight="900">reality turns</text>
      <text x="82" y="378" fill="#64748b" font-size="13">Apr</text>
      <text x="300" y="378" fill="#64748b" font-size="13">May</text>
      <text x="580" y="378" fill="#64748b" font-size="13">Sep</text>
    `,
    "The line was useful for immediate danger, but it was incomplete after the system changed.",
    "Line chart comparing a linear prediction with actual reservoir recovery after a low point"
  );
}

function bogotaRatiosSvg() {
  return chartFrame(
    "Exponential check: ratios should be stable",
    `
      <rect x="78" y="95" width="170" height="206" rx="16" fill="#fef2f2" stroke="#fecaca"/>
      <rect x="265" y="145" width="170" height="156" rx="16" fill="#fffbeb" stroke="#fde68a"/>
      <rect x="452" y="74" width="170" height="227" rx="16" fill="#f0fdf4" stroke="#bbf7d0"/>
      <text x="163" y="154" text-anchor="middle" fill="#991b1b" font-size="31" font-weight="900">0.923</text>
      <text x="350" y="204" text-anchor="middle" fill="#92400e" font-size="31" font-weight="900">0.989</text>
      <text x="537" y="134" text-anchor="middle" fill="#166534" font-size="31" font-weight="900">1.078</text>
      <text x="163" y="193" text-anchor="middle" fill="#64748b" font-size="14" font-weight="800">big drop</text>
      <text x="350" y="243" text-anchor="middle" fill="#64748b" font-size="14" font-weight="800">almost flat</text>
      <text x="537" y="173" text-anchor="middle" fill="#64748b" font-size="14" font-weight="800">increase</text>
      <path d="M115 336H585" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
      <text x="350" y="372" text-anchor="middle" fill="#111827" font-size="15" font-weight="900">Ratios swing too much for clean exponential decay.</text>
    `,
    "A model can be mathematically familiar and still not fit the mechanism.",
    "Three ratio cards showing unstable ratios 0.923, 0.989, and 1.078"
  );
}

function bogotaFullSvg() {
  return chartFrame(
    "The full 2024-2025 arc",
    `
      ${axesMarkup()}
      <path d="M110 126 C190 210 225 314 300 326 C390 330 485 258 560 115 C590 75 610 70 628 84" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>
      <path d="M160 72V350" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 8"/>
      <path d="M520 72V350" stroke="#16a34a" stroke-width="3" stroke-dasharray="8 8"/>
      <circle cx="300" cy="326" r="8" fill="#ef4444"/>
      <text x="172" y="94" fill="#991b1b" font-size="13" font-weight="900">rationing starts</text>
      <text x="532" y="94" fill="#166534" font-size="13" font-weight="900">rationing ends</text>
      <text x="312" y="323" fill="#991b1b" font-size="13" font-weight="900">10.5% low</text>
      <text x="475" y="144" fill="#1d4ed8" font-size="14" font-weight="900">rain-driven recovery</text>
      <text x="92" y="377" fill="#64748b" font-size="13">Mar 2024</text>
      <text x="308" y="377" fill="#64748b" font-size="13">May 2024</text>
      <text x="550" y="377" fill="#64748b" font-size="13">Jul 2025</text>
    `,
    "The turning point came from more than the equation. The model changed when the frame changed.",
    "Line chart showing reservoir crisis, low point, slow recovery, and rapid recovery into 2025"
  );
}

function bogotaDefendSvg() {
  return chartFrame(
    "Defend a responsible model",
    `
      <rect x="72" y="92" width="260" height="220" rx="18" fill="#eff6ff" stroke="#bfdbfe"/>
      <rect x="368" y="92" width="260" height="220" rx="18" fill="#f8fafc" stroke="#dbe2ea"/>
      <text x="202" y="137" text-anchor="middle" fill="#1d4ed8" font-size="22" font-weight="900">Useful</text>
      <text x="202" y="174" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">shows immediate danger</text>
      <text x="202" y="207" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">easy to explain</text>
      <text x="202" y="240" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">limited outside window</text>
      <text x="498" y="137" text-anchor="middle" fill="#111827" font-size="22" font-weight="900">Responsible</text>
      <text x="498" y="174" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">names assumptions</text>
      <text x="498" y="207" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">checks mechanism</text>
      <text x="498" y="240" text-anchor="middle" fill="#475569" font-size="15" font-weight="800">admits uncertainty</text>
      <path d="M330 202H370" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
      <path d="M358 190L372 202L358 214" fill="none" stroke="#111827" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="350" y="356" text-anchor="middle" fill="#111827" font-size="16" font-weight="900">What would you currently defend?</text>
    `,
    "The final move is not certainty. It is a clearer, more honest mathematical argument.",
    "Two panels showing the move from a useful model to a responsible model"
  );
}

const bogotaChartRenderers = {
  system: bogotaSystemSvg,
  history: bogotaHistorySvg,
  crisis: bogotaCrisisSvg,
  linear: bogotaLinearSvg,
  ratios: bogotaRatiosSvg,
  full: bogotaFullSvg,
  defend: bogotaDefendSvg
};

function initBogotaStepper() {
  const stepper = document.querySelector("[data-bogota-stepper]");
  if (!stepper) return;

  const content = stepper.querySelector("[data-stepper-content]");
  const pips = stepper.querySelector("[data-stepper-pips]");
  const dots = stepper.querySelector("[data-stepper-dots]");
  const prev = stepper.querySelector("[data-stepper-prev]");
  const next = stepper.querySelector("[data-stepper-next]");
  let current = 0;

  function renderControls() {
    pips.innerHTML = bogotaStepData.map((_, index) => (
      `<span class="stepper-pip${index < current ? " done" : ""}${index === current ? " active" : ""}"></span>`
    )).join("");

    dots.innerHTML = bogotaStepData.map((step, index) => (
      `<button class="stepper-dot${index === current ? " active" : ""}" type="button" data-stepper-dot="${index}" aria-label="Open step ${index + 1}: ${step.title}"></button>`
    )).join("");

    prev.disabled = current === 0;
    next.textContent = current === bogotaStepData.length - 1 ? "Restart" : "Next";
  }

  function renderStep() {
    const step = bogotaStepData[current];
    const chart = bogotaChartRenderers[step.chart]();
    content.innerHTML = `
      <div class="stepper-grid">
        <div class="stepper-copy">
          <div class="stepper-counter">Step ${current + 1} of ${bogotaStepData.length}</div>
          <h3 class="stepper-title">${step.title}</h3>
          <p class="stepper-context">${step.context}</p>
          ${step.facts ? `<div class="stepper-facts">${stepperFactMarkup(step.facts)}</div>` : ""}
          ${stepperComparisonMarkup(step.comparison)}
          ${stepperCalloutMarkup(step.callout)}
          ${stepperCalloutMarkup(step.secondaryCallout)}
          <p class="stepper-question">${step.question}<span>${step.note}</span></p>
        </div>
        ${chart}
      </div>
    `;
    renderControls();
  }

  prev.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    renderStep();
  });

  next.addEventListener("click", () => {
    current = current === bogotaStepData.length - 1 ? 0 : current + 1;
    renderStep();
  });

  dots.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-stepper-dot]");
    if (!dot) return;
    current = Number(dot.dataset.stepperDot);
    renderStep();
  });

  renderStep();
}

initBogotaStepper();

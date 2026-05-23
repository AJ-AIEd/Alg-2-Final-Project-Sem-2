export const projectArc = ["Notice", "Predict", "Model", "Interpret", "Challenge", "Revise", "Defend"];

export const navigationGroups = [
  { label: "Start", items: ["Start Here", "Systems", "Timeline"] },
  { label: "Build", items: ["Models", "Notebook", "AI Support + Test Your Model"] },
  { label: "Synthesize", items: ["Evidence", "Progress", "Resources"] },
];

export const systemConnections = [
  {
    label: "Energy",
    signal: "hydropower pressure",
    detail: "Low water can shift how a region generates and prices electricity.",
  },
  {
    label: "Food prices",
    signal: "irrigation and supply",
    detail: "Drought can change growing conditions, transport costs, and market prices.",
  },
  {
    label: "Transportation",
    signal: "rivers and routes",
    detail: "Water levels can affect shipping routes, road demand, and delivery timing.",
  },
  {
    label: "Infrastructure",
    signal: "rationing systems",
    detail: "Pipes, reservoirs, treatment plants, and neighborhoods experience stress unevenly.",
  },
  {
    label: "Markets",
    signal: "risk and scarcity",
    detail: "Scarcity can change household spending, business planning, and investment decisions.",
  },
  {
    label: "Economic pressure",
    signal: "who absorbs the cost?",
    detail: "A single reservoir graph can hide unequal impacts across communities.",
  },
];

export const modelLenses = [
  {
    label: "Interval",
    question: "Which dates are inside your model?",
    math: "A slope from Apr 11 to Apr 18 tells a different story than Apr 11 to Aug.",
  },
  {
    label: "Variables",
    question: "What is missing from the graph?",
    math: "Rainfall, demand, rationing, ENSO, and infrastructure can all change the rate.",
  },
  {
    label: "Threshold",
    question: "Where does the situation become dangerous?",
    math: "A 20% line turns a graph into a decision problem.",
  },
  {
    label: "Scale",
    question: "What does the graph make easy or hard to see?",
    math: "Axis choices can flatten a crisis or exaggerate a short-term change.",
  },
  {
    label: "Assumptions",
    question: "What must be true for the model to be trusted?",
    math: "Linear loss assumes a constant rate; exponential loss assumes stable ratios.",
  },
];

export const aiProtocol = [
  {
    label: "Think first",
    detail: "Write your claim, equation, graph choice, or stuck point before opening AI support.",
  },
  {
    label: "Flint",
    detail: "Ask for critique, hidden variables, model tests, or Desmos troubleshooting.",
  },
  {
    label: "Verify",
    detail: "Check the response against your graph, data table, equation, and source notes.",
  },
  {
    label: "Decide",
    detail: "Use, revise, or reject the suggestion in your own mathematical voice.",
  },
];

export const notebookPrompts = [
  "Calculate and interpret a slope or average rate of change.",
  "Compare explicit and recursive versions of a model.",
  "Solve for a zero, threshold, or time when action would be required.",
  "Test exponential ratios before choosing an exponential model.",
  "Use polynomial features only when the graph shape gives a reason.",
  "Defend local behavior separately from global behavior.",
];

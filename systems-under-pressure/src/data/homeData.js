export const projectArc = [
  "The Crisis",
  "Notice Patterns",
  "Build Mathematical Models",
  "Test Claims",
  "Defend Conclusions",
  "Investigation Notebook",
  "Support",
];

export const phaseSubtitles = [
  "A city faces a decision before the ending is known.",
  "The graph starts to reveal repeated pressure.",
  "Equations turn observations into testable stories.",
  "Every claim needs a stress test.",
  "A conclusion must own its limits.",
  "Keep the evidence, revisions, and questions visible.",
  "Use Flint and resources to sharpen thinking.",
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

export const phaseSupport = {
  crisis: {
    pacing: "Suggested pacing: start during Class 1 and return to it whenever the model changes.",
    homework:
      "Personalize one pressure system you care about, challenge the first explanation, and bring one counterexample.",
    group: ["Choose a shared crisis or pressure system.", "List connected systems and first data sources."],
    individual: ["Annotate the opening graph.", "Write one uncertainty before asking Flint."],
    artifacts: ["annotated graph", "initial variables", "one cited source", "first uncertainty"],
    vlog: "Vlog checkpoint: no recording yet. Save the first question your group disagrees about.",
    readiness: ["I can name the system under pressure.", "I can identify at least two connected systems.", "I can explain what the graph does not prove yet."],
  },
  patterns: {
    pacing: "Suggested pacing: complete before your group commits to a model type.",
    homework:
      "Personalize the pattern with your own topic, challenge one visible trend, and create a counterexample that would break it.",
    group: ["Build a connected-systems map.", "Evaluate whether sources measure the same thing."],
    individual: ["Mark repeated change, outliers, and thresholds.", "Write a hidden-variable note."],
    artifacts: ["systems map", "source evaluation note", "pattern annotation", "hidden variable"],
    vlog: "Vlog 1: explain what changed in your thinking after seeing the pattern.",
    readiness: ["I can distinguish pattern from cause.", "I can name one confounding variable.", "I can connect the graph to another system."],
  },
  models: {
    pacing: "Suggested pacing: start during Class 2 and complete before Class 3.",
    homework:
      "Personalize your equation, challenge its assumptions, and create one case where the model would fail.",
    group: ["Choose an interval and justify it.", "Compare at least two possible model families."],
    individual: ["Show equation work.", "Interpret slope, ratio, threshold, or zero in context."],
    artifacts: ["one model", "equation with units", "threshold interpretation", "rejected assumption"],
    vlog: "Vlog 2: show the graph and explain why your model choice changed or held up.",
    readiness: ["My graph and equation use the same interval.", "I can explain each parameter.", "I have rejected at least one weak assumption."],
  },
  claims: {
    pacing: "Suggested pacing: use during Classes 3-4 while testing thresholds and model limits.",
    homework:
      "Personalize the stress test, challenge a causation claim, and write a counterexample graph.",
    group: ["Test competing claims against the same evidence.", "Decide what evidence would change the claim."],
    individual: ["Solve or estimate a threshold.", "Check ratios, residuals, graph shape, or domain limits."],
    artifacts: ["claim test", "threshold or zero", "graph-scale note", "counterexample"],
    vlog: "Vlog 3: explain a claim your group weakened, rejected, or revised.",
    readiness: ["I can say what my model supports.", "I can say what it cannot see.", "I can explain a counterexample."],
  },
  defend: {
    pacing: "Suggested pacing: begin near the end of Class 4 and revise before final publication.",
    homework:
      "Personalize the defense, challenge your strongest claim, and prepare a counterargument.",
    group: ["Select the shared visual story evidence.", "Compare models and defend the final choice."],
    individual: ["Write mathematical interpretation.", "Explain local vs global behavior and source limits."],
    artifacts: ["model comparison", "source defense", "confounding variable", "final claim draft"],
    vlog: "Vlog 4: defend the current conclusion and name what still feels uncertain.",
    readiness: ["My conclusion uses evidence.", "I have named limitations.", "I can explain what would make me revise."],
  },
  notebook: {
    pacing: "Suggested pacing: update every class; clean enough to follow, not polished like a final product.",
    homework:
      "Personalize your notebook entry, challenge one line of reasoning, and add a counterexample or rejected model.",
    group: ["Keep shared graphs, source notes, and model comparisons visible.", "Track who owns each evidence piece."],
    individual: ["Upload graph images or sketches.", "Keep AI logs, rejected sources, and thinking changes."],
    artifacts: ["graph annotations", "equations", "polynomial construction", "AI log", "rejected model/source"],
    vlog: "Use vlog notes here: each vlog documents a change in thinking.",
    readiness: ["A reader can follow my revision trail.", "My notebook includes evidence and rejected ideas.", "My final defense has source support."],
  },
  support: {
    pacing: "Suggested pacing: use when stuck, after thinking first, and before final defense.",
    homework:
      "Personalize the Flint prompt, challenge Flint's response, and verify with a source or graph counterexample.",
    group: ["Use Flint to pressure-test shared assumptions.", "Verify every source and model suggestion."],
    individual: ["Log what Flint suggested, what you kept, and what you rejected.", "Rewrite in your own voice."],
    artifacts: ["Flint prompt", "verification note", "revised claim", "decision note"],
    vlog: "A support-based vlog should show the graph, the critique, and what changed.",
    readiness: ["I thought first.", "I verified the response.", "My work still sounds like me."],
  },
};

export const investigationCategories = [
  {
    label: "Climate + Environment",
    example: "drought -> crop stress -> food prices",
  },
  {
    label: "Energy + Infrastructure",
    example: "AI data centers -> electricity demand -> grid pressure",
  },
  {
    label: "Food + Agriculture",
    example: "rainfall shift -> yield change -> export pressure",
  },
  {
    label: "Transportation + Trade",
    example: "fuel prices -> shipping costs -> product prices",
  },
  {
    label: "Markets + Economic Pressure",
    example: "scarcity signal -> price spike -> household burden",
  },
  {
    label: "Technology + Society",
    example: "platform growth -> demand surge -> infrastructure strain",
  },
];

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const CLASSES = [
  {
    id: "c1", num: 1,
    label: "Entering the System",
    sub: "Observation & variables",
    color: "#0F6E56", light: "#E1F5EE",
    conceptualMove: "Notice relationships before choosing equations.",
    modelingQ: "Which variables seem connected, and which are hard to measure?",
    thinkingShift: "From topic choice to a measurable system relationship.",
    focus: "Observation, variables, systems thinking, uncertainty, early assumptions.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "What is the food system challenge in your scenario?",
          "What variables change over time? What relationships exist between them?",
          "What stays constant? What is uncertain?",
          "Where will you find data to investigate this system?",
          "How does understanding this system help you think mathematically?",
        ],
      },
      {
        title: "Required work",
        items: [
          "System map showing key variables and relationships",
          "Variable table: variable | units | why it matters",
          "Sketch first — predict one relationship before graphing anything digitally",
          "Initial data collection (screenshots, links, or notes)",
          "Written reflection: Why does this system matter?",
        ],
      },
      {
        title: "Vlog 1 — Observation & uncertainty",
        vlog: true,
        items: [
          "Discuss patterns you are beginning to notice",
          "Share unclear ideas and open uncertainties",
          "Name assumptions you are already making",
          "Identify the most important variables so far",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"We're investigating [scenario]. What variables might change over time in this food system?\"",
          "\"What relationships between variables are worth investigating first?\"",
          "\"Help us identify what is uncertain or hard to measure in this system.\"",
          "After: record what Flint suggested, what you kept, and what you rejected — in your journal.",
        ],
      },
    ],
  },
  {
    id: "c2", num: 2,
    label: "Modeling Change",
    sub: "Sequences & series",
    color: "#185FA5", light: "#E6F1FB",
    conceptualMove: "Represent repeated change with terms, formulas, and accumulated totals.",
    modelingQ: "Is change happening in steps, continuously, additively, or multiplicatively?",
    thinkingShift: "From noticing change to predicting and testing reliability.",
    focus: "Sequences, series, prediction, recalculation.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "Is the situation discrete or continuous? Why does that matter here?",
          "Does your data follow an arithmetic or geometric pattern?",
          "What is the common difference or common ratio?",
          "What does each term represent in context? What do the units tell you?",
          "What does the cumulative sum (series) represent in your food system?",
          "Is this a finite or infinite series? What is the practical difference?",
          "How far into the future can you reliably predict with this model?",
          "What happens to the prediction if the pattern changes?",
        ],
      },
      {
        title: "Required comparisons",
        items: [
          "Discrete vs continuous: explain which applies to your variable and why",
          "Sequence vs function: what changes when you switch representations?",
          "Arithmetic vs geometric: which fits your data — what evidence supports the choice?",
          "Recursive vs explicit formula: write both and explain each part in context",
          "Finite vs infinite series: what does the cumulative sum mean in your food system?",
          "Short-term vs long-term: compare predictions for years 0–5, 0–10, and 0–20",
        ],
      },
      {
        title: "Deliverables",
        items: [
          "Sketch before Desmos — hand-drawn prediction of expected graph shape",
          "Recursive formula with each part explained in context",
          "Explicit formula with each part explained in context",
          "Desmos graph showing the sequence alongside actual data",
          "Written explanation: why is this sequence model appropriate here?",
          "Contextual prediction with answer interpreted using units",
          "Reflection: where does the model break down or stop making sense?",
        ],
      },
      {
        title: "Vlog 2 — Model justification & comparison",
        vlog: true,
        items: [
          "Explain why your sequence model makes sense for this food system",
          "Compare your discrete sequence to a continuous function — what would change?",
          "Identify where the model begins to fail or become unrealistic",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"Here is our data: [paste data]. Does this look more arithmetic or geometric? What is your evidence?\"",
          "\"We wrote this recursive formula: [formula]. Does it match what we described about our system?\"",
          "\"Where do you think our sequence model stops being realistic?\"",
          "\"What assumptions are we making by treating this as a geometric sequence?\"",
          "After: record what Flint suggested, what you kept, and what you rejected — in your journal.",
        ],
      },
    ],
  },
  {
    id: "c3", num: 3,
    label: "Acceleration, Decay, and Thresholds",
    sub: "Exponentials & logarithms",
    color: "#854F0B", light: "#FAEEDA",
    conceptualMove: "Model compounding, decay, and threshold moments.",
    modelingQ: "What changes when growth is treated as continuous rather than sampled in steps?",
    thinkingShift: "From prediction to threshold interpretation and model breakdown.",
    focus: "Exponential models, logarithmic solving, realism.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "Is your data growing or decaying exponentially? What is the evidence?",
          "Why does exponential fit better than repeated addition (linear)?",
          "How is an exponential function different from a geometric sequence?",
          "Is your variable discrete or continuous in this model?",
          "What does the base or growth factor represent in context?",
          "At what point does the system reach a critical threshold?",
          "Why are logarithms needed to find that threshold?",
          "How long until prices double? Until production becomes unviable?",
        ],
      },
      {
        title: "Required comparisons",
        items: [
          "Exponential vs linear: show why linear fails for this data",
          "Geometric sequence (Class 2) vs exponential function (Class 3): what is different?",
          "Discrete vs continuous: which applies to your variable in this model?",
          "Rate comparison: compare thresholds at 3%, 5%, and 8% — how do they shift?",
          "Table vs graph: what does the graph reveal that the sequence table does not?",
        ],
      },
      {
        title: "Deliverables",
        items: [
          "Sketch before Desmos — hand-drawn prediction before graphing digitally",
          "Exponential model with parameters explained in context",
          "Desmos graph comparing linear, exponential, and actual data",
          "Logarithmic equation solving for a critical threshold — show and explain each step",
          "Written explanation: why exponential fits better than linear here",
          "Reflection: what does the threshold mean in your food system?",
          "Reflection: where does exponential behavior stop being realistic?",
        ],
      },
      {
        title: "Vlog 3 — Cross-class model comparison",
        vlog: true,
        items: [
          "Compare your Class 2 geometric sequence with your Class 3 exponential model",
          "Explain what the base or growth factor means in your food system",
          "Show where exponential behavior stops being realistic and why",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"We modeled this with a geometric sequence in Class 2. What is actually different about treating it as continuous exponential growth?\"",
          "\"Our exponential model is f(x) = [model]. What threshold does this predict? Use logarithms to solve.\"",
          "\"Where does our exponential model stop making sense? What hidden variables might it be missing?\"",
          "\"Our R² is [value]. What does that mean for how much we should trust this model?\"",
          "After: record what Flint suggested, what you kept, and what you rejected — in your journal.",
        ],
      },
    ],
  },
  {
    id: "c4", num: 4,
    label: "Constraints, Capacity, and Cost",
    sub: "Polynomials",
    color: "#993556", light: "#FBEAF0",
    conceptualMove: "Use structure and graph behavior to understand constraints.",
    modelingQ: "Which parts of the polynomial are physically meaningful, and which must be rejected?",
    thinkingShift: "From 'bigger is better' to tradeoffs, extrema, and restricted domains.",
    focus: "Polynomial structure, capacity, cost, physical interpretation.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "Why does multiplying dimensions create a polynomial? Why cubic?",
          "What factors combine to determine cost or capacity in your system?",
          "What does factored form reveal that standard form does not?",
          "What do degree, leading coefficient, and end behavior tell you?",
          "What do intercepts, multiplicity, and extrema mean in context?",
          "Which graph regions are physically unrealistic? Why?",
          "What is the optimal design (size, shape, price) and what tradeoffs exist?",
        ],
      },
      {
        title: "Required analysis — all must be present",
        items: [
          "Degree: identify and explain what it means for this food system",
          "Even/odd behavior and leading coefficient: what do these predict?",
          "End behavior using notation: as x → ∞ and as x → −∞",
          "Intercepts: find each one and interpret in context",
          "Multiplicity: identify at each zero and explain what it means physically",
          "Extrema: find relative max/min and interpret in the food system",
          "Realistic domain: defend which x-values make physical or economic sense",
          "Factored form vs standard form: compare what each reveals",
          "Polynomial long division: show work and interpret the result in context",
        ],
      },
      {
        title: "Deliverables",
        items: [
          "Sketch before Desmos — hand-drawn prediction with estimated intercepts",
          "Blueprint or design sketch with labeled dimensions",
          "Polynomial model combining multiple cost/capacity factors",
          "Desmos graph with polynomial and domain restrictions annotated",
          "Optimization analysis: what value maximizes or minimizes the key quantity?",
          "Written explanation: how do constraints shape your solution?",
          "Comparison: what would a linear or exponential model miss here?",
        ],
      },
      {
        title: "Vlog 4 — Polynomial reasoning",
        vlog: true,
        items: [
          "Explain what the polynomial reveals that a simpler model would miss",
          "Walk through end behavior, intercepts, and multiplicity in context",
          "Identify which graph regions are physically unrealistic and explain why",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"Our polynomial is [model]. What does the degree tell us about this food system?\"",
          "\"Where is our model physically unrealistic, and what domain restriction should we apply?\"",
          "\"Explain what multiplicity at this zero means in the context of [storage / cost / capacity].\"",
          "\"What does the relative maximum reveal about an optimal point in our system?\"",
          "After: record what Flint suggested, what you kept, and what you rejected — in your journal.",
        ],
      },
    ],
  },
  {
    id: "c5", num: 5,
    label: "Revision, Synthesis, and Communication",
    sub: "Connecting the lenses",
    color: "#534AB7", light: "#EEEDFE",
    conceptualMove: "Turn separate models into one mathematical claim.",
    modelingQ: "What did each model reveal, and where did each stop being useful?",
    thinkingShift: "From completed work to a defensible explanation of uncertainty.",
    focus: "Synthesis, revision, interpretation, communication, limitations.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "How do sequences, exponentials, and polynomials reveal different aspects of the food system?",
          "What does each lens show that the others miss?",
          "What did you learn that surprised you?",
          "Where are your models incomplete, wrong, or limited?",
          "What assumptions did you revise — why is the revision mathematically stronger?",
          "How would you investigate this system differently next time?",
        ],
      },
      {
        title: "Required work",
        items: [
          "Revised models incorporating feedback from Classes 2–4",
          "Final synthesis table: lens | what it revealed | where it failed",
          "r/R² interpretation: use as evidence of model strength and limitation",
          "One final mathematical claim with evidence, assumptions, and limitations named",
          "Revision markers: label what changed, why, and what the revised model reveals",
          "Written connection: graph ↔ algebra ↔ context ↔ assumptions ↔ limitations",
        ],
      },
      {
        title: "5 required explanation moves",
        items: [
          "Why this model? — state why the model type fits the pattern or constraint",
          "What does it mean? — translate variables, parameters, and graph features into the food system",
          "How do you know? — use calculations, graph evidence, units, and comparisons",
          "What changed? — compare model versions and explain how assumptions reshape predictions",
          "What are the limits? — name assumptions, unrealistic regions, hidden variables, and tradeoffs",
        ],
      },
      {
        title: "Before submitting",
        items: [
          "Every graph has context, units, annotations, and a realistic domain",
          "Every model has a written explanation of assumptions and limitations",
          "Every lens includes at least one comparison between related models",
          "Final format makes mathematical evidence visible — not just narrated",
          "Every group member can explain the mathematics without reading a script",
          "AI use is documented with a citation and critique in the journal",
        ],
      },
      {
        title: "Vlog 5 — Final synthesis",
        vlog: true,
        items: [
          "Discuss how your understanding of the food system evolved across all 5 classes",
          "Explain what each mathematical lens contributed and where it fell short",
          "Name the limitations that remained even in your final models",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"Here are our three models: [describe each]. What does each reveal that the others cannot?\"",
          "\"We changed our assumption from [X] to [Y]. Is the revised model mathematically stronger? Why?\"",
          "\"What blind spots might remain in our final investigation that we haven't addressed?\"",
          "\"Help us write one final mathematical claim with evidence and named limitations.\"",
          "After: record what Flint suggested, what you kept, and what you rejected — in your journal.",
        ],
      },
    ],
  },
];

const SCENARIOS = [
  { id: "A", label: "Scenario A — United States", title: "The $5 Footlong Isn't $5 Anymore", color: "#0F6E56", tags: "inflation · food pricing · shrinkflation · labor costs · transportation" },
  { id: "B", label: "Scenario B — Global", title: "When War Changes the Price of Bread", color: "#185FA5", tags: "supply chains · exports · wheat pricing · recovery patterns" },
  { id: "C", label: "Scenario C — Sub-Saharan Africa", title: "What If Food Exists — But Never Arrives?", color: "#854F0B", tags: "spoilage · transportation loss · refrigeration · infrastructure" },
  { id: "D", label: "Scenario D — Colombia", title: "Can Climate Change the Future of Coffee?", color: "#993556", tags: "rainfall · coffee yields · exports · storage · thresholds" },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────

const KEY_GROUPS = "sup_v3_groups";
const stateKey = (id) => `sup_v3_state_${id}`;

async function loadGroups() {
  try { const raw = localStorage.getItem(KEY_GROUPS); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
async function saveGroups(g) {
  try { localStorage.setItem(KEY_GROUPS, JSON.stringify(g)); } catch {}
}
async function loadGroupState(id) {
  try { const raw = localStorage.getItem(stateKey(id)); return raw ? JSON.parse(raw) : { checks: {}, notes: {}, scenario: null }; }
  catch { return { checks: {}, notes: {}, scenario: null }; }
}
async function saveGroupState(id, s) {
  try { localStorage.setItem(stateKey(id), JSON.stringify(s)); } catch {}
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function classProgress(classId, checks) {
  const cls = CLASSES.find(c => c.id === classId);
  if (!cls) return { done: 0, total: 0 };
  let total = 0, done = 0;
  cls.sections.forEach(s => {
    if (s.flint) return;
    s.items.forEach((_, i) => {
      total++;
      if (checks[`${classId}__${s.title}__${i}`]) done++;
    });
  });
  return { done, total };
}

function Ring({ done, total, color, size = 46 }) {
  const pct = total ? done / total : 0;
  const r = 17, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3.5"
        strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray 0.4s ease" }} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>
        {total ? `${done}/${total}` : "—"}
      </text>
    </svg>
  );
}

// ─── FLINT SECTION ───────────────────────────────────────────────────────────

function FlintSection({ sec }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          background: open ? "#FFF8E1" : "#FFFDE7",
          border: "1.5px solid #F9A825",
          borderRadius: open ? "8px 8px 0 0" : 8,
          padding: "9px 13px", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 15 }}>🤖</span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#E65100", flex: 1 }}>
          Consult Flint AI
        </span>
        <span style={{ fontSize: 13, color: "#9ca3af", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>
      {open && (
        <div style={{
          background: "#FFFDE7", border: "1.5px solid #F9A825", borderTop: "none",
          borderRadius: "0 0 8px 8px", padding: "10px 14px",
        }}>
          <p style={{ fontSize: 12, color: "#5D4037", margin: "0 0 10px", lineHeight: 1.6, fontStyle: "italic" }}>
            Use Flint when you are stuck, revising, or uncertain. Bring your data and specific questions — not blank prompts. Record Flint's response, what you kept, and what you rejected in your journal.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sec.items.map((item, i) => (
              <div key={i} style={{
                fontSize: 12, color: item.startsWith("After:") ? "#5D4037" : "#37474F",
                padding: "7px 10px", borderRadius: 6,
                background: item.startsWith("After:") ? "#FFF3E0" : "white",
                border: `1px solid ${item.startsWith("After:") ? "#FFCC80" : "#e5e7eb"}`,
                lineHeight: 1.6, fontStyle: item.startsWith("After:") ? "italic" : "normal",
              }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: "#8D6E63", lineHeight: 1.5, padding: "8px 10px", background: "#FFF3E0", borderRadius: 6 }}>
            <strong>CNG SAIL Level L5 — Co-Create:</strong> AI should deepen thinking, not replace it. Do not submit reasoning you do not understand or ask AI to complete the project for you.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CLASS PANEL ─────────────────────────────────────────────────────────────

function ClassPanel({ cls, checks, notes, onCheck, onNote, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const { done, total } = classProgress(cls.id, checks);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = done === total && total > 0;

  return (
    <div style={{
      border: `1.5px solid ${open ? cls.color + "60" : complete ? cls.color + "40" : "#e5e7eb"}`,
      borderRadius: 14, overflow: "hidden", marginBottom: 10,
      background: "white", transition: "border-color 0.2s",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "13px 16px",
        background: open ? cls.light : complete ? cls.light + "88" : "white",
        border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: complete ? cls.color : open ? cls.color : "#e5e7eb",
          color: complete || open ? "white" : "#9ca3af",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, flexShrink: 0, transition: "all 0.2s",
        }}>
          {complete ? "✓" : cls.num}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111", lineHeight: 1.25, fontFamily: "Georgia, serif" }}>{cls.label}</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{cls.sub}</div>
        </div>
        <Ring done={done} total={total} color={cls.color} />
        <span style={{ fontSize: 11, fontWeight: 700, color: cls.color, minWidth: 32, textAlign: "right" }}>{pct}%</span>
        <span style={{ fontSize: 16, color: "#9ca3af", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginLeft: 2 }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "4px 16px 18px" }}>
          <div style={{
            fontSize: 12, color: "#4b5563", padding: "10px 13px",
            background: cls.light, borderRadius: 8, marginBottom: 14,
            borderLeft: `3px solid ${cls.color}`,
          }}>
            <div style={{ marginBottom: 4 }}><strong style={{ color: cls.color }}>Conceptual move:</strong> {cls.conceptualMove}</div>
            <div style={{ marginBottom: 4 }}><strong style={{ color: cls.color }}>Modeling question:</strong> {cls.modelingQ}</div>
            <div><strong style={{ color: cls.color }}>Thinking shift:</strong> {cls.thinkingShift}</div>
          </div>

          {cls.sections.map(sec => {
            if (sec.flint) return <FlintSection key={sec.title} sec={sec} />;
            return (
              <div key={sec.title} style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 7,
                  color: sec.vlog ? cls.color : "#374151",
                }}>
                  {sec.vlog && (
                    <span style={{
                      background: cls.color, color: "white",
                      fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 800,
                    }}>VLOG</span>
                  )}
                  {sec.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {sec.items.map((item, i) => {
                    const key = `${cls.id}__${sec.title}__${i}`;
                    const checked = !!checks[key];
                    return (
                      <label key={key} style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        cursor: "pointer", padding: "8px 11px", borderRadius: 8,
                        background: checked ? cls.light : "#f9fafb",
                        border: `1px solid ${checked ? cls.color + "50" : "#e5e7eb"}`,
                        transition: "all 0.15s",
                      }}>
                        <input type="checkbox" checked={checked}
                          onChange={() => onCheck(key, !checked)}
                          style={{ accentColor: cls.color, width: 15, height: 15, marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#374151", marginBottom: 8 }}>
            Group notes
          </div>
          <textarea
            value={notes[cls.id] || ""}
            onChange={e => onNote(cls.id, e.target.value)}
            placeholder="Rough work, revision thoughts, data links, Flint AI interactions, decisions, or anything your group wants to remember for this class…"
            rows={3}
            style={{
              width: "100%", borderRadius: 8, border: "1.5px solid #e5e7eb",
              padding: "9px 11px", fontSize: 13, fontFamily: "Georgia, serif",
              resize: "vertical", outline: "none", color: "#374151",
              background: "#fafafa", lineHeight: 1.55, boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = cls.color}
            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
          />
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [groups, setGroups] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupState, setGroupState] = useState({ checks: {}, notes: {}, scenario: null });
  const [saveStatus, setSaveStatus] = useState("");
  const saveTimer = useRef(null);
  const pendingRef = useRef(null);

  useEffect(() => {
    loadGroups().then(g => { setGroups(g); setScreen("home"); });
  }, []);

  const scheduleAutoSave = useCallback((gId, state) => {
    if (!gId) return;
    pendingRef.current = state;
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await saveGroupState(gId, pendingRef.current);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    }, 700);
  }, []);

  const handleCheck = (key, val) => {
    const next = { ...groupState, checks: { ...groupState.checks, [key]: val } };
    setGroupState(next);
    scheduleAutoSave(selectedGroup?.id, next);
  };

  const handleNote = (classId, val) => {
    const next = { ...groupState, notes: { ...groupState.notes, [classId]: val } };
    setGroupState(next);
    scheduleAutoSave(selectedGroup?.id, next);
  };

  const handleScenario = (scenarioId) => {
    const next = { ...groupState, scenario: scenarioId };
    setGroupState(next);
    scheduleAutoSave(selectedGroup?.id, next);
  };

  const createGroup = async () => {
    const name = newName.trim();
    if (!name) return;
    const g = { id: `g_${Date.now()}`, name, created: new Date().toLocaleDateString() };
    const next = [...groups, g];
    setGroups(next);
    setNewName("");
    await saveGroups(next);
  };

  const openGroup = async (group) => {
    const state = await loadGroupState(group.id);
    setGroupState(state);
    setSelectedGroup(group);
    setScreen("tracker");
  };

  const deleteGroup = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this group and all its progress? This cannot be undone.")) return;
    const next = groups.filter(g => g.id !== id);
    setGroups(next);
    await saveGroups(next);
    try { localStorage.removeItem(stateKey(id)); } catch {}
  };

  const totalItems = CLASSES.reduce((a, cls) => a + cls.sections.reduce((b, s) => b + (s.flint ? 0 : s.items.length), 0), 0);
  const totalDone = Object.values(groupState.checks).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalItems) * 100);
  const selectedScenario = SCENARIOS.find(s => s.id === groupState.scenario);

  if (screen === "loading") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, color: "#9ca3af", fontSize: 14, fontFamily: "Georgia, serif" }}>
      Loading…
    </div>
  );

  if (screen === "tracker" && selectedGroup) return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 680, margin: "0 auto", paddingBottom: 48 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 16px", borderBottom: "1px solid #e5e7eb",
        background: "white", position: "sticky", top: 0, zIndex: 20, marginBottom: 18,
      }}>
        <button onClick={() => setScreen("home")} style={{
          background: "none", border: "1px solid #e5e7eb", borderRadius: 8,
          padding: "5px 11px", fontSize: 12, cursor: "pointer", color: "#374151", fontFamily: "Georgia, serif",
        }}>← Groups</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{selectedGroup.name}</div>
          {selectedScenario && (
            <div style={{ fontSize: 11, color: selectedScenario.color, fontWeight: 600 }}>
              {selectedScenario.label}
            </div>
          )}
          {groupState.scenario === "custom" && groupState.customTitle && (
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>
              {groupState.customTitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {saveStatus === "saving" && <span style={{ fontSize: 11, color: "#9ca3af" }}>Saving…</span>}
          {saveStatus === "saved" && <span style={{ fontSize: 11, color: "#0F6E56", fontWeight: 600 }}>✓ Saved</span>}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#534AB7", background: "#EEEDFE", padding: "4px 11px", borderRadius: 20 }}>
            {overallPct}% complete
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 20px" }}>
        <div style={{ height: 5, borderRadius: 3, background: "#e5e7eb", overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            height: "100%", width: `${overallPct}%`,
            background: "linear-gradient(90deg, #0F6E56 0%, #185FA5 40%, #993556 70%, #534AB7 100%)",
            borderRadius: 3, transition: "width 0.5s ease",
          }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {CLASSES.map(cls => {
            const { done, total } = classProgress(cls.id, groupState.checks);
            const p = total ? Math.round((done / total) * 100) : 0;
            return (
              <div key={cls.id} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: cls.color, fontWeight: 700 }}>{p}%</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>C{cls.num}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "0 16px 20px" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
          Your scenario
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {SCENARIOS.map(s => {
            const active = groupState.scenario === s.id;
            return (
              <button key={s.id} onClick={() => handleScenario(s.id)} style={{
                display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left",
                padding: "10px 13px", borderRadius: 10,
                border: `1.5px solid ${active ? s.color : "#e5e7eb"}`,
                background: active ? s.color + "12" : "white",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  border: `2px solid ${s.color}`, background: active ? s.color : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: active ? s.color : "#374151" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2, fontStyle: "italic" }}>{s.tags}</div>
                </div>
              </button>
            );
          })}
          {(() => {
            const customActive = groupState.scenario === "custom";
            return (
              <button onClick={() => handleScenario("custom")} style={{
                display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left",
                padding: "10px 13px", borderRadius: 10,
                border: `1.5px solid ${customActive ? "#6B7280" : "#e5e7eb"}`,
                background: customActive ? "#F3F4F6" : "white",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  border: `2px solid #6B7280`, background: customActive ? "#6B7280" : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {customActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: customActive ? "#374151" : "#374151" }}>Our own scenario</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>We are investigating a different food system</div>
                </div>
              </button>
            );
          })()}
        </div>

        {groupState.scenario === "custom" && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              value={groupState.customTitle || ""}
              onChange={e => {
                const next = { ...groupState, customTitle: e.target.value };
                setGroupState(next);
                scheduleAutoSave(selectedGroup?.id, next);
              }}
              placeholder="Scenario name — e.g. Water scarcity and crop yields in Peru"
              style={{
                border: "1.5px solid #e5e7eb", borderRadius: 8,
                padding: "9px 12px", fontSize: 13, fontFamily: "Georgia, serif",
                outline: "none", color: "#374151", width: "100%", boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "#6B7280"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
            <input
              value={groupState.customFocus || ""}
              onChange={e => {
                const next = { ...groupState, customFocus: e.target.value };
                setGroupState(next);
                scheduleAutoSave(selectedGroup?.id, next);
              }}
              placeholder="Key variables — e.g. rainfall · crop yield · export volume · price"
              style={{
                border: "1.5px solid #e5e7eb", borderRadius: 8,
                padding: "9px 12px", fontSize: 13, fontFamily: "Georgia, serif",
                outline: "none", color: "#374151", width: "100%", boxSizing: "border-box",
                fontStyle: "italic",
              }}
              onFocus={e => e.target.style.borderColor = "#6B7280"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>
        )}

        {!groupState.scenario && (
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, fontStyle: "italic" }}>
            Select your scenario above — it saves automatically.
          </div>
        )}
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>
          Five-class arc
        </div>
        {CLASSES.map((cls, i) => (
          <ClassPanel key={cls.id} cls={cls}
            checks={groupState.checks} notes={groupState.notes}
            onCheck={handleCheck} onNote={handleNote}
            defaultOpen={i === 0} />
        ))}
      </div>

      <div style={{
        margin: "20px 16px 0", padding: "13px 16px",
        background: "#FFFDE7", border: "1.5px solid #F9A825", borderRadius: 10,
        display: "flex", gap: 10, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>🤖</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#E65100", marginBottom: 3 }}>Remember: Consult Flint AI</div>
          <div style={{ fontSize: 12, color: "#5D4037", lineHeight: 1.65 }}>
            Use Flint when stuck, revising, or uncertain — not to complete the project. Bring data and specific questions. Save meaningful interactions in your journal and note what you accepted, modified, or rejected.
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#d1d5db" }}>
        Systems Under Pressure · Algebra 2 Cumulative Semester Final Project · Progress saves automatically and is shared across all group members
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 480, margin: "0 auto", padding: "32px 20px 48px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0F6E56", marginBottom: 10 }}>
          Algebra 2 · Cumulative Semester Final Project
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", margin: "0 0 6px", lineHeight: 1.2 }}>
          Systems Under Pressure
        </h1>
        <p style={{ fontSize: 14, color: "#374151", margin: "0 0 6px", fontWeight: 600 }}>
          The Mathematics of Food Systems
        </p>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0, fontStyle: "italic" }}>
          "All models are wrong, but some are useful." — George Box
        </p>
      </div>

      <div style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 16, fontSize: 12, color: "#374151", lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#111", marginBottom: 4 }}>A model is useful, but incomplete.</div>
        This project is about increasingly thoughtful mathematical reasoning. Revision, critique, and clearer assumptions are evidence that your understanding is becoming more sophisticated. Do not split the math — everyone reasons across every mathematical lens.
      </div>

      <div style={{ background: "#FFFDE7", border: "1.5px solid #F9A825", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 12, color: "#5D4037", lineHeight: 1.65, display: "flex", gap: 10 }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
        <div>
          <strong style={{ color: "#E65100" }}>Flint AI is part of this project.</strong> Each class phase includes suggested Flint prompts. Use them during revision, critique, and interpretation — not to replace your own reasoning. Always save interactions in your journal.
        </div>
      </div>

      <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, padding: 18, marginBottom: 24, background: "white" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 12 }}>Create a new group</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createGroup()}
            placeholder="e.g. Group 3 — Colombia"
            style={{
              flex: 1, border: "1.5px solid #e5e7eb", borderRadius: 8,
              padding: "9px 12px", fontSize: 13, fontFamily: "Georgia, serif", outline: "none", color: "#374151",
            }}
            onFocus={e => e.target.style.borderColor = "#0F6E56"}
            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
          />
          <button onClick={createGroup} disabled={!newName.trim()} style={{
            background: newName.trim() ? "#0F6E56" : "#e5e7eb",
            color: newName.trim() ? "white" : "#9ca3af",
            border: "none", borderRadius: 8, padding: "9px 18px",
            fontSize: 13, fontWeight: 700, cursor: newName.trim() ? "pointer" : "default",
            fontFamily: "Georgia, serif", transition: "all 0.15s",
          }}>Create</button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px 20px", color: "#9ca3af", fontSize: 13, border: "1.5px dashed #e5e7eb", borderRadius: 14 }}>
          No groups yet. Create one above to get started.
        </div>
      ) : (
        <>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>
            Your groups
          </div>
          {groups.map(group => (
            <div key={group.id} onClick={() => openGroup(group)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "13px 16px", border: "1.5px solid #e5e7eb",
              borderRadius: 12, marginBottom: 8, cursor: "pointer",
              background: "white", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#0F6E56"; e.currentTarget.style.background = "#f0fdf8"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "white"; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🌱</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{group.name}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>Created {group.created}</div>
              </div>
              <button onClick={e => deleteGroup(group.id, e)} style={{ background: "none", border: "none", color: "#d1d5db", fontSize: 15, cursor: "pointer", padding: "4px 6px", borderRadius: 6 }} title="Delete group">✕</button>
              <span style={{ color: "#9ca3af", fontSize: 18 }}>›</span>
            </div>
          ))}
        </>
      )}

      <div style={{ marginTop: 20, padding: "14px 16px", background: "#f9fafb", borderRadius: 10, fontSize: 12, color: "#6b7280", lineHeight: 1.65 }}>
        <strong style={{ color: "#374151" }}>How it works:</strong> Create one group per team. Any member can open it from any device — progress and notes sync automatically. Select your scenario, check off items, and consult Flint AI at each class phase when you are stuck or revising.
      </div>
    </div>
  );
}

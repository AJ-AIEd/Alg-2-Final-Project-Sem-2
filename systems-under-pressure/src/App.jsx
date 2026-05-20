import { useState, useEffect } from "react";

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
        title: "Checkpoint 1 — System Plan + Model Connection Check-In",
        items: [
          "Show your chosen system, key variables, changing relationships, data sources, and assumptions",
          "Explain which models you are planning to use and why each model makes sense",
          "Explain what each model may reveal and what each model may fail to capture",
          "Use teacher feedback to narrow, redirect, or clarify the investigation before moving deeper",
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
    label: "When the System Stops Behaving Simply",
    sub: "Polynomials",
    color: "#993556", light: "#FBEAF0",
    conceptualMove: "Use polynomial features to model turning behavior, thresholds, instability, and model failure.",
    modelingQ: "Does this polynomial explain the system, or only imitate the points?",
    thinkingShift: "From fitting a curve to defending a responsible model and interval.",
    focus: "Turning points, zeros, threshold intersections, multiplicity, end behavior, overfitting, and realistic domains.",
    sections: [
      {
        title: "Guiding questions",
        items: [
          "Where does our graph bend, turn, peak, flatten, or cross a threshold?",
          "What would a zero mean in our context?",
          "What would a y-intercept mean?",
          "What would a turning point mean?",
          "What intervals actually make sense?",
          "What would be physically or socially impossible?",
          "What kind of polynomial might match this behavior?",
        ],
      },
      {
        title: "Required polynomial tasks",
        items: [
          "One polynomial model or polynomial comparison",
          "At least one interpreted feature: zero, threshold intersection, y-intercept, turning point, multiplicity, interval, or end behavior",
          "One equation evaluated or solved in context, such as P(x)=k or P(x)=Q(x)",
          "One model limitation",
          "One rejected polynomial or rejected interval",
        ],
      },
      {
        title: "Polynomial options to explore",
        items: [
          "Quadratic: optimization, maximum/minimum, diminishing returns, and tradeoffs",
          "Cubic: reversal, recovery, instability, and crossing thresholds",
          "Quartic / higher-degree: multiple turning points, repeated instability, competing pressures, and overfitting critique",
          "Higher degree may fit better but explain less",
          "Sketch before Desmos, then test and verify the behavior",
        ],
      },
      {
        title: "Checkpoint 2 — Polynomial + Physical Constraints Check-In",
        items: [
          "Show polynomial equation/model, graph, variable definitions, data type, and source or scenario basis",
          "Interpret one feature: zero, P(x)=k threshold, y-intercept, turning point, multiplicity, interval, or end behavior",
          "Solve or estimate something meaningful, then interpret the solution in context",
          "Explain one rejected polynomial, rejected interval, or overfitting concern",
        ],
      },
      {
        title: "Vlog 4 — Polynomial reasoning",
        vlog: true,
        items: [
          "Explain when the system stopped behaving simply",
          "Interpret the polynomial feature that mattered most",
          "Explain which polynomial fit looked good but became misleading, or which interval had to be rejected",
        ],
      },
      {
        title: "Flint AI — suggested prompts",
        flint: true,
        items: [
          "\"Our system is [describe system]. Help us explore what polynomial models could represent this behavior.\"",
          "\"Suggest possible quadratic, cubic, quartic, or higher-degree models and what their features might mean physically.\"",
          "\"Explain what zeros, multiplicity, turning points, y-intercepts, intervals, and end behavior could mean in our context.\"",
          "\"Does this polynomial explain the system or only imitate the data? What happens outside the observed interval?\"",
          "After: record what Flint suggested, what you verified, what you kept, and what you rejected.",
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


// ─── SHARED DATABASE + UI ───────────────────────────────────────────────────

const CHECKPOINTS = [
  { number: 1, title: "System Plan + Model Connection Check-In", timing: "End of Class 2" },
  { number: 2, title: "Polynomial + Physical Constraints Check-In", timing: "Beginning of Class 4" },
];
const CHECKPOINT_STATUSES = ["Not started", "In progress", "Ready for feedback", "Feedback given", "Revised"];
const API = "/api/data";

const sx = {
  page: { fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1060, margin: "0 auto", padding: "26px 18px 56px", color: "#111827" },
  narrow: { fontFamily: "Inter, system-ui, sans-serif", maxWidth: 620, margin: "0 auto", padding: "38px 20px 56px", color: "#111827" },
  card: { border: "1px solid #e2e8f0", borderRadius: 18, background: "rgba(255,255,255,.94)", padding: 18, marginBottom: 14, boxShadow: "0 14px 34px rgba(15,23,42,.055)" },
  btn: { border: "none", borderRadius: 10, padding: "9px 14px", fontWeight: 800, cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" },
  input: { border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px", fontSize: 13, fontFamily: "Inter, system-ui, sans-serif", boxSizing: "border-box", outline: "none" },
  label: { fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", marginBottom: 7 },
};

async function api(action, { method = "GET", body, passcode } = {}) {
  const response = await fetch(`${API}?action=${action}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(passcode ? { "x-teacher-passcode": passcode } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function trackableItems() {
  const rows = [];
  CLASSES.forEach((cls) => {
    cls.sections.forEach((sec) => {
      if (sec.flint) return;
      sec.items.forEach((item, index) => {
        rows.push({ classId: cls.id, classNum: cls.num, classLabel: cls.label, section: sec.title, item, key: `${cls.id}__${sec.title}__${index}` });
      });
    });
  });
  return rows;
}
const ALL_ITEMS = trackableItems();

function groupToState(group) {
  const checks = {};
  const checkpoints = {};
  (group.progress_items || []).forEach((item) => { checks[item.item_key] = !!item.completed; });
  (group.checkpoints || []).forEach((checkpoint) => { checkpoints[checkpoint.checkpoint_number] = checkpoint; });
  return {
    checks,
    notes: group.group_notes || [],
    checkpoints,
    scenario: group.scenario_id || null,
    customTitle: group.custom_title || "",
    customFocus: group.custom_focus || "",
  };
}

function classProgress(classId, checks) {
  const items = ALL_ITEMS.filter((item) => item.classId === classId);
  const done = items.filter((item) => checks[item.key]).length;
  return { done, total: items.length };
}

function overallProgress(checks) {
  const done = ALL_ITEMS.filter((item) => checks[item.key]).length;
  return { done, total: ALL_ITEMS.length, pct: ALL_ITEMS.length ? Math.round((done / ALL_ITEMS.length) * 100) : 0 };
}

function Ring({ done, total, color, size = 46 }) {
  const pct = total ? done / total : 0;
  const r = 17, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  return <svg width={size} height={size} style={{ flexShrink: 0 }}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3.5" strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{total ? `${done}/${total}` : "—"}</text>
  </svg>;
}

function PhaseProgressStrip({ checks }) {
  const progress = overallProgress(checks);
  return <div style={{
    margin: "0 0 18px",
    padding: "18px 18px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    background: "rgba(255,255,255,.92)",
    boxShadow: "0 18px 46px rgba(15,23,42,.06)",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end", marginBottom: 12 }}>
      <div>
        <div style={sx.label}>Five-class arc</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>Progress by class phase</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 24, fontWeight: 950, color: "#534AB7", lineHeight: 1 }}>{progress.pct}%</div>
        <div style={{ fontSize: 11, color: "#64748b", fontWeight: 800 }}>{progress.done}/{progress.total} total</div>
      </div>
    </div>
    <div style={{ height: 8, borderRadius: 999, background: "#e5e7eb", overflow: "hidden", marginBottom: 12 }}>
      <div style={{
        height: "100%",
        width: `${progress.pct}%`,
        background: "linear-gradient(90deg, #0F6E56 0%, #185FA5 42%, #993556 72%, #534AB7 100%)",
        borderRadius: 999,
        transition: "width .35s ease",
      }} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 6 }}>
      {CLASSES.map((cls) => {
        const { done, total } = classProgress(cls.id, checks);
        const pct = total ? Math.round((done / total) * 100) : 0;
        return <div key={cls.id} style={{ textAlign: "center", padding: "8px 4px", borderRadius: 12, background: pct === 100 ? cls.light : "transparent" }}>
          <div style={{ fontSize: 12, color: cls.color, fontWeight: 950 }}>{pct}%</div>
          <div style={{ fontSize: 10, color: "#64748b", fontWeight: 900 }}>C{cls.num}</div>
          <div style={{ height: 4, borderRadius: 999, background: "#e5e7eb", overflow: "hidden", marginTop: 6 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: cls.color, borderRadius: 999 }} />
          </div>
        </div>;
      })}
    </div>
  </div>;
}

function SetupError({ error }) {
  return <div style={{ ...sx.narrow }}>
    <h1>Investigation Board setup needed</h1>
    <p style={{ color: "#475569", lineHeight: 1.6 }}>The Investigation Board is configured for shared progress, but the backend is not reachable yet.</p>
    <div style={{ ...sx.card, borderLeft: "6px solid #b45353" }}>
      <strong>Error:</strong> {error}
      <p>Set these Vercel environment variables, then redeploy:</p>
      <code>SUPABASE_URL</code><br />
      <code>SUPABASE_SERVICE_ROLE_KEY</code><br />
      <code>TEACHER_PASSCODE</code>
      <p>Run <code>systems-under-pressure/supabase/schema.sql</code> in Supabase SQL Editor first.</p>
    </div>
  </div>;
}

function CheckpointBox({ groupId, number, checkpoint, onUpdate }) {
  const meta = CHECKPOINTS.find((c) => c.number === number);
  const [status, setStatus] = useState(checkpoint?.status || "Not started");
  const [summary, setSummary] = useState(checkpoint?.student_summary || "");
  useEffect(() => {
    setStatus(checkpoint?.status || "Not started");
    setSummary(checkpoint?.student_summary || "");
  }, [checkpoint?.status, checkpoint?.student_summary]);
  const save = async () => {
    await api("checkpoint", { method: "PATCH", body: { group_id: groupId, checkpoint_number: number, status, student_summary: summary } });
    await onUpdate();
  };
  return <div style={{ ...sx.card, borderLeft: `6px solid ${number === 1 ? "#185FA5" : "#993556"}` }}>
    <div style={sx.label}>{meta.timing}</div>
    <h3 style={{ marginTop: 0 }}>{meta.title}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "170px 1fr auto", gap: 8, alignItems: "start" }}>
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={sx.input}>{CHECKPOINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      <textarea rows={2} maxLength={280} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short summary: current claim, model/graph/source status, what is missing, or next step." style={{ ...sx.input, width: "100%" }} />
      <button onClick={save} style={{ ...sx.btn, background: "#111827", color: "white" }}>Save</button>
    </div>
    {(checkpoint?.strengths || checkpoint?.next_steps || checkpoint?.concerns || checkpoint?.teacher_notes) && <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "#f8fafc", lineHeight: 1.55 }}>
      <strong>Teacher feedback</strong>
      {checkpoint.strengths && <p><strong>Strengths:</strong> {checkpoint.strengths}</p>}
      {checkpoint.next_steps && <p><strong>Next steps:</strong> {checkpoint.next_steps}</p>}
      {checkpoint.concerns && <p><strong>Concerns:</strong> {checkpoint.concerns}</p>}
      {checkpoint.teacher_notes && <p><strong>Notes:</strong> {checkpoint.teacher_notes}</p>}
    </div>}
  </div>;
}

function ClassPanel({ cls, checks, notes, noteAuthor, onCheck, onNote, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [draft, setDraft] = useState("");
  const { done, total } = classProgress(cls.id, checks);
  const classNotes = (notes || []).filter((note) => note.class_phase === cls.id);
  return <div style={{ border: `1.5px solid ${open ? cls.color + "66" : "#e5e7eb"}`, borderRadius: 18, overflow: "hidden", marginBottom: 12, background: "white", boxShadow: open ? "0 16px 38px rgba(15,23,42,.07)" : "0 8px 24px rgba(15,23,42,.035)" }}>
    <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "15px 18px", background: open ? cls.light : "white", border: 0, cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 34, height: 34, borderRadius: 12, background: cls.color, color: "white", display: "grid", placeItems: "center", fontWeight: 900 }}>C{cls.num}</div>
      <div style={{ flex: 1 }}><strong>{cls.label}</strong><div style={{ fontSize: 11, color: "#64748b" }}>{cls.sub}</div></div>
      <Ring done={done} total={total} color={cls.color} />
      <span style={{ color: cls.color, fontWeight: 900, fontSize: 18 }}>{open ? "−" : "+"}</span>
    </button>
    {open && <div style={{ padding: "12px 16px 18px" }}>
      <div style={{ fontSize: 12, color: "#475569", padding: 10, background: cls.light, borderRadius: 8, marginBottom: 14 }}>
        <strong>Modeling question:</strong> {cls.modelingQ}<br /><strong>Thinking shift:</strong> {cls.thinkingShift}
      </div>
      {cls.sections.map((sec) => sec.flint ? null : <div key={sec.title} style={{ marginBottom: 18 }}>
        <div style={sx.label}>{sec.title}</div>
        <div style={{ display: "grid", gap: 6 }}>
          {sec.items.map((item, index) => {
            const key = `${cls.id}__${sec.title}__${index}`;
            return <label key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 10, borderRadius: 10, background: checks[key] ? cls.light : "#f8fafc", border: "1px solid #e5e7eb" }}>
              <input type="checkbox" checked={!!checks[key]} onChange={(e) => onCheck(cls.id, key, e.target.checked)} style={{ marginTop: 3, accentColor: cls.color }} />
              <span style={{ fontSize: 13, lineHeight: 1.45 }}>{item}</span>
            </label>;
          })}
        </div>
      </div>)}
      <div style={sx.label}>Short board updates</div>
      <div style={{ padding: 11, borderRadius: 12, background: "#f8fafc", border: "1px solid #e5e7eb", marginBottom: 10, color: "#334155", lineHeight: 1.45, fontSize: 12 }}>
        <strong style={{ display: "block", color: "#111827", marginBottom: 4 }}>Use short updates.</strong>
        This board is for coordination: claim, models, graphs, sources, what changed, and next step. Save deeper thinking for the Notebook and Vlogs.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 10 }}>
        {[
          ["Current claim", "One short evolving statement."],
          ["Current models", "Sequence, exponential, polynomial, statistics."],
          ["Graphs", "Missing, sketched, Desmos, annotated, or revised."],
          ["Sources", "Short source list plus data type."],
          ["What changed?", "One sentence maximum."],
          ["Next step", "One clear action for the group."],
        ].map(([title, prompt]) => (
          <div key={title} style={{ padding: 10, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <strong style={{ display: "block", fontSize: 12, color: "#111827", marginBottom: 3 }}>{title}</strong>
            <span style={{ display: "block", fontSize: 11, color: "#64748b", lineHeight: 1.35 }}>{prompt}</span>
          </div>
        ))}
      </div>
      {classNotes.length > 0 && <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>
        {classNotes.map((note) => <div key={note.id || `${note.class_phase}-${note.note_author}`} style={{ padding: 10, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, color: "#64748b", fontSize: 11, marginBottom: 4 }}>
            <strong style={{ color: "#111827" }}>{note.note_author || "Unidentified student"}</strong>
            <span>{note.updated_at ? new Date(note.updated_at).toLocaleString() : ""}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{note.note_text || "—"}</div>
        </div>)}
      </div>}
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} maxLength={280} placeholder={noteAuthor ? "Short update: current claim, model/graph/source status, what changed, or next step. One or two sentences is enough." : "Enter your name near the top before saving updates."} style={{ ...sx.input, width: "100%", resize: "vertical" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        <button disabled={!noteAuthor.trim() || !draft.trim()} onClick={async () => { await onNote(cls.id, draft); setDraft(""); }} style={{ ...sx.btn, background: noteAuthor.trim() && draft.trim() ? cls.color : "#e5e7eb", color: noteAuthor.trim() && draft.trim() ? "white" : "#94a3b8" }}>Save short update</button>
        <span style={{ color: "#64748b", fontSize: 12 }}>{noteAuthor.trim() ? `Saving as ${noteAuthor.trim()}` : "Name required so your teacher can see who wrote the update."}</span>
      </div>
    </div>}
  </div>;
}

function StudentApp() {
  const [screen, setScreen] = useState("loading");
  const [groups, setGroups] = useState([]);
  const [newName, setNewName] = useState("");
  const [studentNames, setStudentNames] = useState("");
  const [currentStudentName, setCurrentStudentName] = useState(localStorage.getItem("sup_student_name") || "");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [state, setState] = useState({ checks: {}, notes: [], checkpoints: {}, scenario: null, customTitle: "", customFocus: "" });
  const [saveStatus, setSaveStatus] = useState("");
  const [error, setError] = useState("");

  const loadGroups = async () => {
    try {
      const data = await api("groups");
      setGroups(data.groups || []);
      setScreen("home");
    } catch (err) {
      setError(err.message);
      setScreen("error");
    }
  };
  useEffect(() => { loadGroups(); }, []);

  const loadGroup = async (group) => {
    const fresh = await fetch(`${API}?action=group&group_id=${group.id}`).then((r) => r.json());
    if (fresh.error) throw new Error(fresh.error);
    setSelectedGroup(fresh.group);
    setState(groupToState(fresh.group));
    setScreen("tracker");
  };

  const createGroup = async () => {
    if (!newName.trim()) return;
    const data = await api("createGroup", { method: "POST", body: { group_name: newName.trim(), student_names: studentNames.trim() } });
    setNewName(""); setStudentNames("");
    await loadGroups();
    await loadGroup(data.group);
  };

  const updateGroup = async (patch) => {
    if (!selectedGroup) return;
    const nextGroup = { ...selectedGroup, ...patch };
    setSelectedGroup(nextGroup);
    setSaveStatus("saving");
    await api("updateGroup", { method: "PATCH", body: { group_id: selectedGroup.id, ...patch } });
    setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 1200);
  };

  const handleCheck = async (classId, key, completed) => {
    setState((s) => ({ ...s, checks: { ...s.checks, [key]: completed } }));
    setSaveStatus("saving");
    await api("progress", { method: "PATCH", body: { group_id: selectedGroup.id, class_phase: classId, item_key: key, completed } });
    setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 1200);
  };

  const handleNote = async (classId, value) => {
    const noteAuthor = currentStudentName.trim();
    if (!noteAuthor) return;
    setSaveStatus("saving");
    await api("note", { method: "PATCH", body: { group_id: selectedGroup.id, class_phase: classId, note_author: noteAuthor, note_text: value } });
    await loadGroup(selectedGroup);
    setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 1200);
  };

  if (screen === "error") return <SetupError error={error} />;
  if (screen === "loading") return <div style={sx.narrow}>Loading shared Investigation Board…</div>;

  if (screen === "tracker" && selectedGroup) {
    const progress = overallProgress(state.checks);
    const selectedScenario = SCENARIOS.find((s) => s.id === selectedGroup.scenario_id);
    return <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 88% 4%, rgba(37,99,235,.08), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #ffffff 52%)" }}>
    <div style={sx.page}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap", padding: 16, border: "1px solid #e2e8f0", borderRadius: 22, background: "rgba(255,255,255,.9)", boxShadow: "0 16px 42px rgba(15,23,42,.06)" }}>
        <button onClick={() => { setScreen("home"); loadGroups(); }} style={{ ...sx.btn, background: "white", border: "1px solid #e5e7eb" }}>← Groups</button>
        <div style={{ flex: 1 }}><h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.05 }}>{selectedGroup.group_name}</h1><div style={{ color: "#64748b", marginTop: 4 }}>{selectedGroup.student_names || "No student names yet"}</div></div>
        <a href="/teacher" style={{ color: "#64748b", fontSize: 12 }}>Teacher dashboard</a>
        <div style={{ fontWeight: 800, color: "#534AB7", background: "#EEEDFE", padding: "7px 12px", borderRadius: 999 }}>{progress.pct}% complete</div>
        <div style={{ minWidth: 62, fontSize: 12, color: saveStatus === "saved" ? "#0F6E56" : "#64748b" }}>{saveStatus}</div>
      </div>

      <PhaseProgressStrip checks={state.checks} />

      <div style={{ ...sx.card, borderLeft: "6px solid #185FA5" }}>
        <div style={sx.label}>Investigation Board</div>
        <h2 style={{ marginTop: 0, marginBottom: 6 }}>Optional but recommended</h2>
        <p style={{ color: "#475569", margin: 0, lineHeight: 1.55 }}>Use this board to help your group track sources, models, graphs, revisions, and next steps. You do not need to write long reflections here. The Notebook and Vlogs are where deeper thinking and revision become visible.</p>
      </div>

      <div style={{ ...sx.card, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div><div style={sx.label}>Scenario</div><select value={selectedGroup.scenario_id || ""} onChange={(e) => updateGroup({ scenario_id: e.target.value || null })} style={{ ...sx.input, width: "100%" }}><option value="">Select scenario</option>{SCENARIOS.map((s) => <option key={s.id} value={s.id}>{s.label}: {s.title}</option>)}<option value="custom">Our own scenario</option></select>{selectedScenario && <p style={{ color: selectedScenario.color, marginBottom: 0 }}>{selectedScenario.tags}</p>}</div>
        <div><div style={sx.label}>Student names</div><input value={selectedGroup.student_names || ""} onChange={(e) => updateGroup({ student_names: e.target.value })} style={{ ...sx.input, width: "100%" }} /></div>
        {selectedGroup.scenario_id === "custom" && <><input placeholder="Custom scenario title" value={selectedGroup.custom_title || ""} onChange={(e) => updateGroup({ custom_title: e.target.value })} style={{ ...sx.input, width: "100%" }} /><input placeholder="Key variables" value={selectedGroup.custom_focus || ""} onChange={(e) => updateGroup({ custom_focus: e.target.value })} style={{ ...sx.input, width: "100%" }} /></>}
      </div>

      <div style={{ ...sx.card, borderLeft: "6px solid #0F6E56" }}>
        <div style={sx.label}>Your note identity</div>
        <p style={{ color: "#475569", marginTop: 0, lineHeight: 1.55 }}>The board belongs to the group. Short updates are saved with your name so your teacher can quickly see who added sources, model status, graph status, or next steps.</p>
        <input value={currentStudentName} onChange={(e) => { setCurrentStudentName(e.target.value); localStorage.setItem("sup_student_name", e.target.value); }} placeholder="Your name" style={{ ...sx.input, width: "100%", maxWidth: 420 }} />
      </div>

      <div style={{ ...sx.card }}>
        <div style={sx.label}>Teacher feedback checkpoints</div>
        <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.55 }}>Use these when your group is ready for quick feedback. Keep the summary short: current claim, model status, missing evidence, and next step.</p>
        {CHECKPOINTS.map((cp) => <CheckpointBox key={cp.number} groupId={selectedGroup.id} number={cp.number} checkpoint={state.checkpoints[cp.number]} onUpdate={() => loadGroup(selectedGroup)} />)}
      </div>

      {CLASSES.map((cls, index) => <ClassPanel key={cls.id} cls={cls} checks={state.checks} notes={state.notes} noteAuthor={currentStudentName} onCheck={handleCheck} onNote={handleNote} defaultOpen={index === 0} />)}
    </div>
    </div>;
  }

  return <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 86% 8%, rgba(21,128,61,.1), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)" }}><div style={sx.narrow}>
    <h1>Investigation Board</h1>
    <p style={{ color: "#475569", lineHeight: 1.6 }}><strong>Optional but recommended.</strong> Use this shared board to coordinate sources, models, graphs, next steps, and teacher feedback across devices. Use short updates.</p>
    <div style={sx.card}>
      <h3>Create a new group</h3>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Group name" style={{ ...sx.input, width: "100%", marginBottom: 8 }} />
      <input value={studentNames} onChange={(e) => setStudentNames(e.target.value)} placeholder="Student names (optional)" style={{ ...sx.input, width: "100%", marginBottom: 10 }} />
      <button onClick={createGroup} style={{ ...sx.btn, background: "#0F6E56", color: "white" }}>Create group</button>
    </div>
    <div style={sx.card}>
      <h3>Join existing group</h3>
      {groups.length === 0 ? <p>No groups yet.</p> : groups.map((group) => <button key={group.id} onClick={() => loadGroup(group)} style={{ width: "100%", textAlign: "left", ...sx.btn, background: "#f8fafc", color: "#111827", marginBottom: 8 }}><strong>{group.group_name}</strong><br /><span style={{ color: "#64748b" }}>{group.student_names || "No names listed"}</span></button>)}
    </div>
  </div></div>;
}

function groupMetrics(group) {
  const checks = {}; (group.progress_items || []).forEach((item) => { checks[item.item_key] = !!item.completed; });
  const total = overallProgress(checks);
  const byClass = CLASSES.map((cls) => ({ cls, ...classProgress(cls.id, checks) }));
  const missing = ALL_ITEMS.filter((item) => !checks[item.key]);
  const cp = Object.fromEntries((group.checkpoints || []).map((c) => [c.checkpoint_number, c]));
  const warning = total.pct < 30 || (cp[1]?.status || "Not started") === "Not started" || missing.length > ALL_ITEMS.length * 0.55;
  return { checks, total, byClass, missing, cp, warning };
}

function TeacherDashboard() {
  const [passcode, setPasscode] = useState(localStorage.getItem("sup_teacher_passcode") || "");
  const [authed, setAuthed] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const selected = groups.find((g) => g.id === selectedId) || groups[0];

  const load = async () => {
    try {
      const data = await api("teacher", { passcode });
      localStorage.setItem("sup_teacher_passcode", passcode);
      setGroups(data.groups || []); setAuthed(true); setError("");
    } catch (err) { setError(err.message); setAuthed(false); }
  };

  const saveFeedback = async (checkpointNumber, fields) => {
    await api("teacherFeedback", { method: "PATCH", passcode, body: { group_id: selected.id, checkpoint_number: checkpointNumber, ...fields } });
    await load();
  };

  const exportCsv = () => {
    const rows = [["Group", "Students", "Overall", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Checkpoint 1", "Checkpoint 2", "Last updated"]];
    groups.forEach((group) => {
      const m = groupMetrics(group);
      rows.push([group.group_name, group.student_names || "", `${m.total.pct}%`, ...m.byClass.map((p) => `${p.done}/${p.total}`), m.cp[1]?.status || "Not started", m.cp[2]?.status || "Not started", group.updated_at || ""]);
    });
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "systems-under-pressure-progress.csv"; link.click(); URL.revokeObjectURL(url);
  };

  if (!authed) return <div style={sx.narrow}><h1>Teacher Dashboard</h1><p>Enter the teacher passcode to view all group progress.</p><input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} style={{ ...sx.input, width: "100%", marginBottom: 10 }} /><button onClick={load} style={{ ...sx.btn, background: "#111827", color: "white" }}>Open dashboard</button>{error && <p style={{ color: "#b45353" }}>{error}</p>}</div>;

  const visible = groups.filter((group) => filter === "all" || (groupMetrics(group).cp[Number(filter)]?.status || "Not started") !== "Feedback given");
  const m = selected ? groupMetrics(selected) : null;
  return <div style={{ ...sx.page, maxWidth: 1280 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}><h1 style={{ flex: 1 }}>Teacher Dashboard</h1><button onClick={load} style={{ ...sx.btn, background: "#f8fafc" }}>Refresh</button><button onClick={exportCsv} style={{ ...sx.btn, background: "#111827", color: "white" }}>Export CSV</button><a href="/" style={{ color: "#64748b" }}>Student view</a></div>
    <div style={{ display: "grid", gridTemplateColumns: "minmax(520px, .95fr) minmax(360px, 1.05fr)", gap: 14 }}>
      <div style={sx.card}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><h3 style={{ flex: 1 }}>Groups</h3><select value={filter} onChange={(e) => setFilter(e.target.value)} style={sx.input}><option value="all">All</option><option value="1">Needs CP1 feedback</option><option value="2">Needs CP2 feedback</option></select></div>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}><thead><tr><th>Group</th><th>Overall</th><th>Phases</th><th>CP1</th><th>CP2</th><th>Flag</th></tr></thead><tbody>{visible.map((group) => { const gm = groupMetrics(group); return <tr key={group.id} onClick={() => setSelectedId(group.id)} style={{ cursor: "pointer", background: selected?.id === group.id ? "#f8fafc" : "white" }}><td><strong>{group.group_name}</strong><br /><span style={{ color: "#64748b" }}>{group.student_names}</span></td><td>{gm.total.pct}%</td><td>{gm.byClass.map((p) => `C${p.cls.num} ${p.done}/${p.total}`).join(" · ")}</td><td>{gm.cp[1]?.status || "Not started"}</td><td>{gm.cp[2]?.status || "Not started"}</td><td>{gm.warning ? "Review" : ""}</td></tr>; })}</tbody></table></div>
      </div>
      {selected && m && <div style={sx.card}>
        <h2>{selected.group_name}</h2><p style={{ color: "#64748b" }}>{selected.student_names || "No student names"}<br />Last update: {selected.updated_at ? new Date(selected.updated_at).toLocaleString() : "—"}</p>
        <h3>Missing items</h3><div style={{ maxHeight: 170, overflow: "auto", background: "#f8fafc", padding: 10, borderRadius: 10 }}>{m.missing.slice(0, 25).map((item) => <div key={item.key}>C{item.classNum}: {item.section} — {item.item}</div>)}{m.missing.length > 25 && <div>+ {m.missing.length - 25} more</div>}</div>
        <h3>Short board updates</h3>{(selected.group_notes || []).map((note) => <div key={note.id} style={{ padding: 10, background: "#f8fafc", borderRadius: 10, marginBottom: 8 }}>
          <strong>{note.note_author || "Unidentified student"}</strong>
          <span style={{ color: "#64748b" }}> · {note.class_phase} · {note.updated_at ? new Date(note.updated_at).toLocaleString() : ""}</span>
          <p style={{ whiteSpace: "pre-wrap" }}>{note.note_text || "—"}</p>
        </div>)}
        <h3>Checkpoint feedback</h3>{CHECKPOINTS.map((cp) => <FeedbackEditor key={cp.number} cp={cp} checkpoint={m.cp[cp.number]} onSave={saveFeedback} />)}
      </div>}
    </div>
  </div>;
}

function FeedbackEditor({ cp, checkpoint, onSave }) {
  const [fields, setFields] = useState({ status: checkpoint?.status || "Feedback given", strengths: checkpoint?.strengths || "", next_steps: checkpoint?.next_steps || "", concerns: checkpoint?.concerns || "", teacher_notes: checkpoint?.teacher_notes || "" });
  useEffect(() => setFields({ status: checkpoint?.status || "Feedback given", strengths: checkpoint?.strengths || "", next_steps: checkpoint?.next_steps || "", concerns: checkpoint?.concerns || "", teacher_notes: checkpoint?.teacher_notes || "" }), [checkpoint?.id, checkpoint?.updated_at]);
  const update = (key, value) => setFields((f) => ({ ...f, [key]: value }));
  return <div style={{ ...sx.card, borderLeft: `5px solid ${cp.number === 1 ? "#185FA5" : "#993556"}` }}><strong>{cp.title}</strong><p style={{ color: "#64748b" }}>Student status: {checkpoint?.status || "Not started"}</p><p><strong>Student summary:</strong> {checkpoint?.student_summary || "—"}</p><select value={fields.status} onChange={(e) => update("status", e.target.value)} style={{ ...sx.input, width: "100%", marginBottom: 8 }}>{CHECKPOINT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select>{["strengths", "next_steps", "concerns", "teacher_notes"].map((key) => <textarea key={key} rows={2} value={fields[key]} onChange={(e) => update(key, e.target.value)} placeholder={key.replace("_", " ")} style={{ ...sx.input, width: "100%", marginBottom: 8 }} />)}<button onClick={() => onSave(cp.number, fields)} style={{ ...sx.btn, background: "#111827", color: "white" }}>Save feedback</button></div>;
}

export default function App() {
  return window.location.pathname.startsWith("/teacher") ? <TeacherDashboard /> : <StudentApp />;
}

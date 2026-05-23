import Callout from "../components/Callout.jsx";
import PhaseSupport from "../components/PhaseSupport.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { stepMeta } from "../data/stepMeta.js";
import { investigationCategories, phaseSupport, systemConnections } from "../data/homeData.js";

export default function Step2TwentyYears() {
  return (
    <section className="space-y-6">
      <StepIntro kicker="Notice Patterns" title="The reservoir is only the first signal.">
        <p>
          Before building a model, notice where pressure might travel. A drought can begin as a
          water problem and become an energy, food, infrastructure, market, and household problem.
        </p>
      </StepIntro>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {systemConnections.map((connection) => (
          <article key={connection.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{connection.label}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{connection.signal}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-650">{connection.detail}</p>
          </article>
        ))}
      </div>

      <Callout variant="warn" prefix="Pattern check:">
        If your model only tracks reservoir percentage, name at least one pressure it cannot see.
      </Callout>

      <RevealPanel title="Reveal a hidden-variable test">
        <p>
          A strong model defense includes a sentence like: “This graph supports my claim about
          reservoir level, but it does not directly measure food prices, electricity demand, or who
          experiences rationing most severely.”
        </p>
      </RevealPanel>

      <RevealPanel title="Choose inside a broad category">
        <div className="grid gap-3 md:grid-cols-2">
          {investigationCategories.map((category) => (
            <article key={category.label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-950">{category.label}</p>
              <p className="mt-1 font-mono text-xs text-slate-600">{category.example}</p>
            </article>
          ))}
        </div>
      </RevealPanel>

      <QuestionBox
        question="Which connected system might move next, and what variable would make that visible?"
        promptText={stepMeta[1].prompt}
      />

      <PhaseSupport support={phaseSupport.patterns} />
    </section>
  );
}

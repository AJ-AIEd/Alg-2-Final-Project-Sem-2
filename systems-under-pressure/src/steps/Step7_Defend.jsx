import Callout from "../components/Callout.jsx";
import MathChip from "../components/MathChip.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { stepMeta } from "../data/stepMeta.js";

const defenseChecks = [
  "My graph and equation match the same interval.",
  "I can explain the rate of change in context.",
  "I can solve for a threshold or zero and interpret it.",
  "I can name at least one confounding variable.",
  "I can explain local behavior separately from global behavior.",
  "I can say what evidence would make me revise my model.",
];

export default function Step7Defend() {
  return (
    <section className="space-y-6">
      <StepIntro kicker="Support" title="Use support without surrendering the thinking.">
        <p>
          Flint, sources, checkpoints, and feedback are tools for pressure-testing your reasoning.
          They should sharpen your voice, not replace it.
        </p>
      </StepIntro>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-cyan-200 bg-cyan-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Defensible claim</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Linear model</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Useful for a short crisis interval because it makes the daily decline and danger
            threshold visible. Weak if used to predict long-term recovery without rainfall data.
          </p>
        </article>
        <article className="rounded-lg border border-rose-200 bg-rose-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">Harder to defend</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Simple exponential model</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The ratios were unstable, so a fixed-percent decline does not match the crisis window
            well. It may still be worth testing in a different system or interval.
          </p>
        </article>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Before asking for support</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {defenseChecks.map((check) => (
            <div key={check} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-650">
              {check}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <MathChip>source defense</MathChip>
        <MathChip>model comparison</MathChip>
        <MathChip>confounding variable</MathChip>
        <MathChip>local vs global</MathChip>
      </div>

      <Callout variant="success">
        THINK FIRST → FLINT → VERIFY → DECIDE. Student work should still sound like the student.
      </Callout>

      <QuestionBox
        question="What do you want Flint to challenge: evidence, source reliability, assumptions, graph scale, or model choice?"
        promptText={stepMeta[6].prompt}
      />

      <RevealPanel title="Reveal useful Flint moves">
        <p>
          Ask Flint to identify hidden variables, critique assumptions, compare interpretations,
          troubleshoot Desmos, or name evidence that would challenge your conclusion. Do not ask it
          to write the final defense.
        </p>
      </RevealPanel>
    </section>
  );
}

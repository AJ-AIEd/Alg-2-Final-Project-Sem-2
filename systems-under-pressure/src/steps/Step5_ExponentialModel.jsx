import Callout from "../components/Callout.jsx";
import MathChip from "../components/MathChip.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PhaseSupport from "../components/PhaseSupport.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { notebookPrompts, phaseSupport } from "../data/homeData.js";
import { stepMeta } from "../data/stepMeta.js";

export default function Step5ExponentialModel() {
  return (
    <section className="space-y-6">
      <StepIntro kicker="Defend Conclusions" title="What mathematical story survives the test?">
        <p>
          A conclusion is stronger when it admits what failed. The exponential story is tempting,
          but the ratio evidence makes it hard to defend for this crisis window.
        </p>
      </StepIntro>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Apr 11 → Apr 17" value="0.923" sub="Large drop" variant="danger" />
        <MetricCard label="Apr 17 → Apr 18" value="0.989" sub="Almost flat" variant="warn" />
        <MetricCard label="Apr 18 → Apr 22" value="1.078" sub="Went up" variant="success" />
      </div>

      <Callout variant="danger">
        These ratios are not stable. That makes a simple exponential-decay story hard to defend.
      </Callout>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Readiness criteria</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {notebookPrompts.map((prompt) => (
            <div key={prompt} className="flex gap-3 rounded-md bg-white p-3 text-sm leading-6 text-slate-650">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-600" />
              <p>{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <MathChip>f(x) = a(b)^x</MathChip>
        <MathChip>log_b(y/a) = x</MathChip>
        <MathChip>factored form</MathChip>
        <MathChip>turning point</MathChip>
        <MathChip>end behavior</MathChip>
      </div>

      <RevealPanel title="Reveal when exponential might fit">
        <p>
          Exponential decay can fit systems where the amount lost depends on how much remains. City
          water demand often behaves differently: people still need water even when the reservoir is
          low, so the rate can be driven by demand, restrictions, and rainfall.
        </p>
      </RevealPanel>

      <QuestionBox
        question="Which piece of evidence would make your current conclusion weaker?"
        promptText={stepMeta[4].prompt}
      />

      <PhaseSupport support={phaseSupport.defend} />
    </section>
  );
}

import Callout from "../components/Callout.jsx";
import MathChip from "../components/MathChip.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PhaseSupport from "../components/PhaseSupport.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { phaseSupport } from "../data/homeData.js";

export default function Step1TheSystem() {
  return (
    <section className="space-y-6">
      <StepIntro kicker="The Crisis" title="A drought does not stay inside the reservoir.">
        <p>
          Begin with one graph, one city, and one uncomfortable question. If the water level is
          falling, what else might start changing before anyone can prove the final outcome?
        </p>
      </StepIntro>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bogotá water crisis</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Bogotá, April 2024</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-650">
            A mountain reservoir system that supplies most of Bogotá's water dropped into crisis.
            The city began rotating 24-hour water restrictions while the outcome was still unknown.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <MathChip>R(t)</MathChip>
            <MathChip>slope</MathChip>
            <MathChip>threshold</MathChip>
            <MathChip>ratio</MathChip>
            <MathChip>assumption</MathChip>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <MetricCard label="Main system" value="Chingaza" sub="Bogotá's key water source" />
          <MetricCard label="Pressure signal" value="16.5%" sub="Level when rationing began" variant="danger" />
        </div>
      </div>

      <Callout variant="info" prefix="First move:">
        Do not explain the crisis yet. Notice what the graph might be hiding.
      </Callout>

      <RevealPanel title="Reveal what this crisis asks you to decide">
        <p className="text-lg font-semibold text-slate-950">
          Which mathematical story would you defend before the outcome was obvious?
        </p>
        <p className="mt-2">
          Your answer will depend on the interval you choose, the variables you include, the
          threshold you defend, the graph scale you use, and the assumptions you are willing to own.
        </p>
      </RevealPanel>

      <PhaseSupport support={phaseSupport.crisis} />
    </section>
  );
}

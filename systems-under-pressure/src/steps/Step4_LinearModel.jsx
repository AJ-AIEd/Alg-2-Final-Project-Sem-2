import { Line } from "react-chartjs-2";
import Callout from "../components/Callout.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Legend from "../components/Legend.jsx";
import MathChip from "../components/MathChip.jsx";
import PhaseSupport from "../components/PhaseSupport.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { LINEAR_ACTUAL, LINEAR_LABELS, LINEAR_MODEL, LINEAR_TRUE_BOTTOM_LINE } from "../data/chartData.js";
import { modelLenses, phaseSupport } from "../data/homeData.js";
import { sharedOptions } from "../utils/chartOptions.js";

export default function Step4LinearModel() {
  const data = {
    labels: LINEAR_LABELS,
    datasets: [
      {
        data: LINEAR_MODEL,
        borderColor: "rgba(14,116,144,1)",
        borderDash: [8, 6],
        borderWidth: 3,
        pointRadius: 3,
        spanGaps: false,
      },
      {
        data: LINEAR_ACTUAL,
        borderColor: "rgba(22,101,52,1)",
        backgroundColor: "rgba(22,101,52,1)",
        borderWidth: 3,
        pointRadius: 4,
      },
      {
        data: LINEAR_TRUE_BOTTOM_LINE,
        borderColor: "rgba(217,119,6,0.95)",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <section className="space-y-6">
      <StepIntro kicker="Test Claims" title="A model is a claim with conditions.">
        <p>
          The same data can support different stories. Test each claim by asking what it reveals,
          what it hides, and where the assumptions stop holding.
        </p>
      </StepIntro>

      <div className="flex flex-wrap gap-2">
        <MathChip>m = (14.9 - 16.5) / 7</MathChip>
        <MathChip>R(t) = 16.5 - 0.23t</MathChip>
        <MathChip>R(t) = 20</MathChip>
        <MathChip>ratio test</MathChip>
      </div>

      <ChartCard
        legend={
          <Legend
            items={[
              { color: "rgba(14,116,144,1)", label: "Linear prediction", shape: "line" },
              { color: "rgba(22,101,52,1)", label: "Actual levels", shape: "line" },
              { color: "rgba(217,119,6,0.95)", label: "True bottom (10.5%)", shape: "line" },
            ]}
          />
        }
      >
        <Line
          data={data}
          options={{ ...sharedOptions, scales: { ...sharedOptions.scales, y: { ...sharedOptions.scales.y, max: 40 } } }}
          role="img"
          aria-label="Line chart comparing a dashed linear model with actual reservoir levels from April through August 2024."
        >
          Linear model predicts continued decline, while actual reservoir levels bottom out and
          begin recovering.
        </Line>
      </ChartCard>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {modelLenses.map((lens) => (
          <article key={lens.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{lens.label}</p>
            <h2 className="mt-2 text-sm font-semibold text-slate-950">{lens.question}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-650">{lens.math}</p>
          </article>
        ))}
      </div>

      <Callout variant="success">The linear model made danger visible before recovery was obvious.</Callout>

      <RevealPanel title="Reveal the stress test">
        <p>
          The model assumes a constant daily loss. That assumption helps during a short decline, but
          it fails once rainfall, rationing, and recovery change the system behavior.
        </p>
      </RevealPanel>

      <PhaseSupport support={phaseSupport.claims} />
    </section>
  );
}

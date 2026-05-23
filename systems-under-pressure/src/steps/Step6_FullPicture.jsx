import { Line } from "react-chartjs-2";
import Callout from "../components/Callout.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Legend from "../components/Legend.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { FULL_DANGER_THRESHOLD_LINE, FULL_LABELS, FULL_LEVELS } from "../data/chartData.js";
import { aiProtocol } from "../data/homeData.js";
import { stepMeta } from "../data/stepMeta.js";
import { sharedOptions } from "../utils/chartOptions.js";

const verticalLinePlugin = {
  id: "verticalMarkers",
  afterDatasetsDraw(chart, _args, options) {
    const { ctx, chartArea, scales } = chart;
    const markerMap = {
      "Apr 11": { color: "rgba(190,86,62,0.95)", label: "Rationing starts" },
      "Apr 25": { color: "rgba(22,101,52,0.95)", label: "Rationing ends" },
    };

    Object.entries(markerMap).forEach(([label, marker]) => {
      const index = chart.data.labels.indexOf(label);
      if (index === -1) return;
      const x = scales.x.getPixelForValue(index);

      ctx.save();
      ctx.strokeStyle = marker.color;
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = marker.color;
      ctx.font = "600 11px Inter, sans-serif";
      ctx.fillText(marker.label, x + 6, chartArea.top + (options?.labelOffset ?? 14));
      ctx.restore();
    });
  },
};

export default function Step6FullPicture() {
  const data = {
    labels: FULL_LABELS,
    datasets: [
      {
        data: FULL_LEVELS,
        borderColor: "rgba(14,116,144,1)",
        backgroundColor: "rgba(14,116,144,1)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.25,
      },
      {
        data: FULL_DANGER_THRESHOLD_LINE,
        borderColor: "rgba(217,119,6,0.95)",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <section className="space-y-6">
      <StepIntro kicker="AI Support + Test Your Model · Revise" title="AI can pressure-test the model.">
        <p>
          AI is not the answer source. Use it after you have a claim, then verify every suggestion
          against the graph, the equation, and the data.
        </p>
      </StepIntro>

      <ChartCard
        legend={
          <Legend
            items={[
              { color: "rgba(14,116,144,1)", label: "Chingaza level", shape: "line" },
              { color: "rgba(217,119,6,0.95)", label: "Danger threshold", shape: "line" },
              { color: "rgba(190,86,62,0.95)", label: "Rationing starts", shape: "line" },
              { color: "rgba(22,101,52,0.95)", label: "Rationing ends", shape: "line" },
            ]}
          />
        }
      >
        <Line
          data={data}
          options={{ ...sharedOptions, scales: { ...sharedOptions.scales, y: { ...sharedOptions.scales.y, max: 100 } } }}
          plugins={[verticalLinePlugin]}
          role="img"
          aria-label="Line chart showing Chingaza reservoir levels from March 2024 through July 2025 with a danger threshold and rationing markers."
        >
          Full reservoir arc from crisis levels in April 2024 to strong recovery by July 2025.
        </Line>
      </ChartCard>

      <div className="grid gap-3 md:grid-cols-4">
        {aiProtocol.map((step, index) => (
          <article key={step.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">0{index + 1}</p>
            <h2 className="mt-2 text-base font-semibold text-slate-950">{step.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-650">{step.detail}</p>
          </article>
        ))}
      </div>

      <Callout variant="warn" prefix="Protocol:">
        THINK FIRST → FLINT → VERIFY → DECIDE
      </Callout>

      <RevealPanel title="Reveal useful Flint moves">
        <ul className="list-disc space-y-2 pl-5">
          <li>Ask what hidden variable might explain a model failure.</li>
          <li>Ask how to test whether a graph supports linear, exponential, or polynomial behavior.</li>
          <li>Ask for Desmos troubleshooting, not a finished conclusion.</li>
          <li>Ask what evidence would challenge your interpretation.</li>
        </ul>
      </RevealPanel>

      <QuestionBox
        question="What should Flint challenge in your model: the interval, variables, threshold, graph scale, or assumptions?"
        promptText={stepMeta[6].prompt}
      />
    </section>
  );
}

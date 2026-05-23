import { Line } from "react-chartjs-2";
import Callout from "../components/Callout.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Legend from "../components/Legend.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { FULL_DANGER_THRESHOLD_LINE, FULL_LABELS, FULL_LEVELS } from "../data/chartData.js";
import { stepMeta } from "../data/stepMeta.js";
import { sharedOptions } from "../utils/chartOptions.js";

const notebookTrail = [
  {
    label: "Claim",
    detail: "Write the story your model currently supports, even if you expect it to change.",
  },
  {
    label: "Evidence",
    detail: "Attach the graph, equation, source note, and interval that make the claim possible.",
  },
  {
    label: "Test",
    detail: "Check a threshold, ratio, zero, slope, turning point, or assumption.",
  },
  {
    label: "Revision",
    detail: "Record what changed and which new evidence caused the shift.",
  },
];

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
      <StepIntro kicker="Investigation Notebook" title="Keep the revision trail visible.">
        <p>
          The notebook is the record of what changed: the graph you trusted, the claim you tested,
          the variable you added, and the model you revised.
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
        {notebookTrail.map((step, index) => (
          <article key={step.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">0{index + 1}</p>
            <h2 className="mt-2 text-base font-semibold text-slate-950">{step.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-650">{step.detail}</p>
          </article>
        ))}
      </div>

      <Callout variant="warn" prefix="Notebook rhythm:">
        CLAIM → EVIDENCE → TEST → REVISION
      </Callout>

      <RevealPanel title="Reveal embedded pacing and checkpoints">
        <ul className="list-disc space-y-2 pl-5">
          <li>Pause after the first graph to write what you notice before explaining it.</li>
          <li>Checkpoint when your graph, equation, variables, and interval all match.</li>
          <li>Vlog when a model fails or your group changes its interpretation.</li>
          <li>Move on when you can name what evidence would change your mind.</li>
        </ul>
      </RevealPanel>

      <QuestionBox
        question="What changed in your thinking, and what evidence caused the revision?"
        promptText={stepMeta[6].prompt}
      />
    </section>
  );
}

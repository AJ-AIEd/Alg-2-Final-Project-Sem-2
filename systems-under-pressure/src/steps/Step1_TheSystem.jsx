import { useState } from "react";
import { Line } from "react-chartjs-2";
import Callout from "../components/Callout.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Legend from "../components/Legend.jsx";
import MathChip from "../components/MathChip.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PhaseSupport from "../components/PhaseSupport.jsx";
import RevealPanel from "../components/RevealPanel.jsx";
import {
  ENTRY_CRISIS_DANGER_LINE,
  ENTRY_CRISIS_LABELS,
  ENTRY_CRISIS_LEVELS,
  ENTRY_CRISIS_NOTES,
  ENTRY_RATIONING_START_INDEX,
} from "../data/chartData.js";
import { phaseSupport } from "../data/homeData.js";
import { sharedOptions } from "../utils/chartOptions.js";

const predictionChoices = ["It keeps falling", "It stabilizes", "It recovers", "Not enough information"];

const rationingMarkerPlugin = {
  id: "entryRationingMarker",
  afterDatasetsDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    const x = scales.x.getPixelForValue(ENTRY_RATIONING_START_INDEX);

    ctx.save();
    ctx.strokeStyle = "rgba(190,86,62,0.95)";
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(127,29,29,0.95)";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillText("Rationing starts", x + 8, chartArea.top + 18);
    ctx.restore();
  },
};

export default function Step1TheSystem() {
  const [prediction, setPrediction] = useState("");

  const data = {
    labels: ENTRY_CRISIS_LABELS,
    datasets: [
      {
        data: ENTRY_CRISIS_LEVELS,
        borderColor: "rgba(15,23,42,1)",
        backgroundColor: "rgba(15,23,42,1)",
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 6,
        tension: 0.16,
      },
      {
        data: ENTRY_CRISIS_DANGER_LINE,
        borderColor: "rgba(217,119,6,0.95)",
        borderDash: [7, 6],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <section className="space-y-6">
      <div className="grid min-h-[calc(100vh-11rem)] gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">The Crisis</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Bogotá began rationing water as reservoirs reached historic lows.
          </h1>
          <p className="text-base leading-7 text-slate-650">
            In April 2024, Bogotá introduced rotating water rationing after reservoir levels in the
            Chingaza system fell to historically low levels during El Niño-driven drought conditions.
          </p>

          <div className="space-y-2 border-l-2 border-slate-200 pl-4 text-sm leading-6 text-slate-650">
            <p>
              “Millions in Colombia's capital forced to ration water...” —{" "}
              <a className="font-semibold underline" href="https://www.cbsnews.com/news/millions-colombia-bogota-capital-forced-ration-water-reservoirs-hit-critically-low-levels/">
                CBS News
              </a>
            </p>
            <p>
              “Bogota to ration water as reservoirs dry” —{" "}
              <a className="font-semibold underline" href="https://www.yahoo.com/news/colombia-capital-bogota-ration-water-145526886.html">
                Reuters via Yahoo News
              </a>
            </p>
            <p>
              “Reservoirs hit historically low levels” —{" "}
              <a className="font-semibold underline" href="https://apnews.com/article/f4f6acfa07a31290ca0fe89eac27645c">
                AP News
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <ChartCard
            legend={
              <Legend
                items={[
                  { color: "rgba(15,23,42,1)", label: "Reported Chingaza level", shape: "line" },
                  { color: "rgba(217,119,6,0.95)", label: "Danger threshold", shape: "line" },
                  { color: "rgba(190,86,62,0.95)", label: "Rationing starts", shape: "line" },
                ]}
              />
            }
          >
            <Line
              data={data}
              options={{
                ...sharedOptions,
                scales: {
                  ...sharedOptions.scales,
                  y: { ...sharedOptions.scales.y, max: 45 },
                },
              }}
              plugins={[rationingMarkerPlugin]}
              role="img"
              aria-label="Line chart showing Chingaza reservoir levels falling from around 40 percent in January 2024 to about 15 percent by mid-April 2024, with a danger threshold and rationing start marker."
            >
              Chingaza reservoir levels fell sharply before Bogotá began water rationing.
            </Line>
          </ChartCard>

          <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-600">
            <p>
              <strong>What this graph measures:</strong> reported percent of useful storage in the
              Chingaza reservoir system, January to mid-April 2024.
            </p>
            <p className="mt-2">
              <strong>Sources:</strong>{" "}
              <a className="underline" href="https://bogota.gov.co/mi-ciudad/habitat/racionamiento-de-agua-en-bogota-asi-fue-el-consumo-en-abril-de-2024">
                Bogotá city public reports
              </a>
              ,{" "}
              <a className="underline" href="https://apnews.com/article/f4f6acfa07a31290ca0fe89eac27645c">
                AP News
              </a>
              ,{" "}
              <a className="underline" href="https://www.yahoo.com/news/colombia-capital-bogota-ration-water-145526886.html">
                Reuters via Yahoo News
              </a>
              , and{" "}
              <a className="underline" href="https://www.infobae.com/colombia/2024/04/14/sigue-bajando-el-nivel-de-los-embalses-de-chingaza-a-pesar-del-racionamiento-de-agua-en-bogota/">
                Infobae reporting from EAAB communication
              </a>
              , and{" "}
              <a className="underline" href="https://acueducto.com.co/wps/portal/EAB2/Home/general/sala-de-prensa/boletines/detalle/tibitoc%2Bracionamiento%2Bacueducto%2Bbogota">
                Acueducto de Bogotá
              </a>
              .
            </p>
            <p className="mt-2">
              <strong>Limitations:</strong> this is not a complete daily time series. Lines connect
              reported reference points. No outcomes after Apr 15 are shown.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Based only on this graph, what would you predict happens next?
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {predictionChoices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => setPrediction(choice)}
              className={`rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${
                prediction === choice
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>

        {prediction && (
          <div className="mt-5 space-y-5 border-t border-slate-200 pt-5">
            <Callout variant="info" prefix="Reveal:">
              A first mathematical model can be reasonable and still incomplete.
            </Callout>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                A drought does not stay inside the reservoir.
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-650">
                The next investigation is not direct causation. It is possible connected pressure:
                delayed effects, relationships to test, and confounding variables to rule out.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <MetricCard label="Possible pressure" value="Infrastructure" sub="pipes, zones, rationing logistics" />
              <MetricCard label="Possible pressure" value="Consumption" sub="daily demand and restrictions" />
              <MetricCard label="Possible pressure" value="Energy" sub="hydropower and grid strain" />
              <MetricCard label="Possible pressure" value="Transportation" sub="movement of people and goods" />
              <MetricCard label="Possible pressure" value="Food prices" sub="crop stress and delayed costs" />
              <MetricCard label="Possible pressure" value="Economic pressure" sub="who absorbs scarcity costs?" />
            </div>

            <div className="flex flex-wrap gap-2">
              <MathChip>R(t)</MathChip>
              <MathChip>R(t)=20</MathChip>
              <MathChip>{"m=\\frac{\\Delta R}{\\Delta t}"}</MathChip>
              <MathChip>{"\\text{claim}\\neq\\text{cause}"}</MathChip>
            </div>
          </div>
        )}
      </div>

      <RevealPanel title="Data notes for the opening graph">
        <ul className="list-disc space-y-2 pl-5">
          {ENTRY_CRISIS_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </RevealPanel>

      <PhaseSupport support={phaseSupport.crisis} />
    </section>
  );
}

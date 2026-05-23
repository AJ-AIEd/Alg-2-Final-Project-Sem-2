import { Bar } from "react-chartjs-2";
import Callout from "../components/Callout.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Legend from "../components/Legend.jsx";
import NoticeBox from "../components/NoticeBox.jsx";
import QuestionBox from "../components/QuestionBox.jsx";
import StepIntro from "../components/StepIntro.jsx";
import { HISTORY_DANGER_LINE, HISTORY_EL_NINO, HISTORY_LABELS, HISTORY_LEVELS } from "../data/chartData.js";
import { stepMeta } from "../data/stepMeta.js";
import { sharedOptions } from "../utils/chartOptions.js";

export default function Step3CrisisWindow() {
  const data = {
    labels: HISTORY_LABELS,
    datasets: [
      {
        type: "bar",
        data: HISTORY_LEVELS,
        backgroundColor: HISTORY_EL_NINO.map((isElNino) =>
          isElNino ? "rgba(190,86,62,0.72)" : "rgba(14,116,144,0.58)"
        ),
        borderRadius: 4,
      },
      {
        type: "line",
        data: HISTORY_DANGER_LINE,
        borderColor: "rgba(217,119,6,0.95)",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <section className="space-y-6">
      <StepIntro kicker="Timeline · Model" title="Zoom out before you zoom in.">
        <p>
          The April 2024 crisis was not a random dip. Look for repeated drought pressure, then
          decide which time interval deserves a model.
        </p>
      </StepIntro>

      <NoticeBox>First inspect the pattern. Explanation comes after the graph has made you curious.</NoticeBox>

      <ChartCard
        legend={
          <Legend
            items={[
              { color: "rgba(14,116,144,0.58)", label: "Normal / wet years" },
              { color: "rgba(190,86,62,0.72)", label: "El Niño drought years" },
              { color: "rgba(217,119,6,0.95)", label: "Danger threshold (~20%)", shape: "line" },
            ]}
          />
        }
      >
        <Bar
          data={data}
          options={{ ...sharedOptions, scales: { ...sharedOptions.scales, y: { ...sharedOptions.scales.y, max: 100 } } }}
          role="img"
          aria-label="Bar chart showing Chingaza reservoir levels from 2004 to 2025 with El Niño years highlighted and a danger threshold."
        >
          Chingaza levels by year, showing repeated drops during El Niño years and a historic low in
          2024.
        </Bar>
      </ChartCard>

      <Callout variant="warn">
        A model built from the crisis window can be useful, but it will miss long-term climate
        cycles unless you connect it to the wider timeline.
      </Callout>

      <QuestionBox
        question="What time interval would you model first: the 20-year pattern, the April crisis window, or the recovery?"
        promptText={stepMeta[2].prompt}
      />
    </section>
  );
}

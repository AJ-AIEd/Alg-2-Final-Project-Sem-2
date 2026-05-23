import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import StepShell from "./components/StepShell.jsx";
import { navigationGroups, projectArc } from "./data/homeData.js";
import Step1TheSystem from "./steps/Step1_TheSystem.jsx";
import Step2TwentyYears from "./steps/Step2_TwentyYears.jsx";
import Step3CrisisWindow from "./steps/Step3_CrisisWindow.jsx";
import Step4LinearModel from "./steps/Step4_LinearModel.jsx";
import Step5ExponentialModel from "./steps/Step5_ExponentialModel.jsx";
import Step6FullPicture from "./steps/Step6_FullPicture.jsx";
import Step7Defend from "./steps/Step7_Defend.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip);

const steps = [
  Step1TheSystem,
  Step2TwentyYears,
  Step3CrisisWindow,
  Step4LinearModel,
  Step5ExponentialModel,
  Step6FullPicture,
  Step7Defend,
];

function stepFromHash() {
  const match = window.location.hash.match(/step-(\d+)/);
  if (!match) return 0;
  const index = Number(match[1]) - 1;
  return Number.isInteger(index) && index >= 0 && index < steps.length ? index : 0;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(stepFromHash);
  const CurrentStep = useMemo(() => steps[currentStep], [currentStep]);

  const goToStep = (nextStep) => {
    const boundedStep = Math.min(Math.max(nextStep, 0), steps.length - 1);
    setCurrentStep(boundedStep);
    window.history.replaceState(null, "", `#step-${boundedStep + 1}`);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        if (currentStep < steps.length - 1) goToStep(currentStep + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        if (currentStep > 0) goToStep(currentStep - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep]);

  useEffect(() => {
    const onHashChange = () => setCurrentStep(stepFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Systems Under Pressure</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Mathematical Modeling in the Real World
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Bogotá's water crisis opens a larger question: what happens when pressure moves
                from one system into many others?
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Driving question</p>
              <p className="mt-1 max-w-sm font-medium text-slate-100">
                Which mathematical story would you defend before the outcome was obvious?
              </p>
            </div>
          </div>

          <nav className="grid gap-3 border-t border-slate-800 pt-4 md:grid-cols-3" aria-label="Project navigation">
            {navigationGroups.map((group) => (
              <div key={group.label} className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>

      <StepShell
        currentStep={currentStep}
        totalSteps={steps.length}
        arc={projectArc}
        onPrev={() => goToStep(currentStep - 1)}
        onNext={() => {
          if (currentStep < steps.length - 1) goToStep(currentStep + 1);
        }}
        onJump={goToStep}
      >
        <CurrentStep />
      </StepShell>
    </div>
  );
}

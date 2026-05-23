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
import { phaseSubtitles, projectArc } from "./data/homeData.js";
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
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Systems Under Pressure</p>
          <p className="hidden text-xs font-medium text-slate-500 sm:block">Bogotá water crisis entry event</p>
        </div>
      </header>

      <StepShell
        currentStep={currentStep}
        totalSteps={steps.length}
        arc={projectArc}
        phaseSubtitles={phaseSubtitles}
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

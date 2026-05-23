export default function StepShell({ currentStep, totalSteps, arc, phaseSubtitles, onPrev, onNext, onJump, children }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-5 sm:px-8 lg:px-10">
      <main className="min-h-[620px] flex-1">
        {children}
      </main>

      <div className="sticky bottom-0 mt-8 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <div className="mb-3 flex gap-2" aria-label={`Phase ${currentStep + 1} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to ${arc[index]}`}
              onClick={() => onJump(index)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index <= currentStep ? "bg-cyan-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Back
        </button>

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-950">{arc[currentStep]}</p>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{phaseSubtitles[currentStep]}</p>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {currentStep === totalSteps - 1 ? "Done" : "Next"}
        </button>
        </div>
      </div>
    </div>
  );
}

export default function StepShell({ currentStep, totalSteps, arc, onPrev, onNext, onJump, children }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-3 flex gap-2" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to step ${index + 1}`}
              onClick={() => onJump(index)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index <= currentStep ? "bg-cyan-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {arc.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => onJump(index)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                index === currentStep ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="min-h-[620px] flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
        {children}
      </main>

      <div className="sticky bottom-0 mt-6 flex items-center gap-4 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Back
        </button>

        <div className="flex flex-1 justify-center gap-2" aria-label="Step dot navigation">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to step ${index + 1}`}
              onClick={() => onJump(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === currentStep ? "bg-cyan-600" : "bg-slate-300"
              }`}
            />
          ))}
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
  );
}

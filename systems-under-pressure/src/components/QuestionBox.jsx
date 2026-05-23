import { sendPrompt } from "../utils/sendPrompt.js";

export default function QuestionBox({ question, promptText }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Think first</p>
      <p className="mb-3 text-sm italic leading-relaxed text-slate-700">{question}</p>
      <button
        type="button"
        onClick={() => sendPrompt(promptText)}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
      >
        Ask Flint ↗
      </button>
    </div>
  );
}

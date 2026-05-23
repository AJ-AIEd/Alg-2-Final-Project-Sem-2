import Latex from "./Latex.jsx";

export default function MathChip({ children }) {
  return (
    <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-800">
      <Latex>{children}</Latex>
    </span>
  );
}

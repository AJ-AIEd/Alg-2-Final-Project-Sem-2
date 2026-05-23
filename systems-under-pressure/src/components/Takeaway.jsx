export default function Takeaway({ label = "Key idea", children }) {
  return (
    <div className="border-t border-slate-200 pt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="text-sm leading-relaxed text-slate-650">{children}</div>
    </div>
  );
}

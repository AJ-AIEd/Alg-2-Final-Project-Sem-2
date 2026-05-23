const variants = {
  default: "border-slate-200 bg-slate-50",
  danger: "border-red-200 border-l-4 border-l-red-500 bg-red-50",
  warn: "border-amber-200 border-l-4 border-l-amber-500 bg-amber-50",
  success: "border-green-200 border-l-4 border-l-green-500 bg-green-50",
};

export default function MetricCard({ label, value, sub, variant = "default" }) {
  return (
    <div className={`rounded-lg border p-4 ${variants[variant] ?? variants.default}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-medium text-slate-950">{value}</p>
      {sub && <p className="mt-1 text-xs font-medium text-slate-600">{sub}</p>}
    </div>
  );
}

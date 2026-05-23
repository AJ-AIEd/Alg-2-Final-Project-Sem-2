export default function ChartCard({ legend, children }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {legend}
      <div className="relative h-72 min-h-72">{children}</div>
    </div>
  );
}

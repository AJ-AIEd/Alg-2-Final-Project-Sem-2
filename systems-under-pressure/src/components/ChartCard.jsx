export default function ChartCard({ legend, children }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {legend}
      <div className="relative h-80 min-h-80 sm:h-96">{children}</div>
    </div>
  );
}

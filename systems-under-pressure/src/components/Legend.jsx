export default function Legend({ items }) {
  return (
    <div className="mb-3 flex flex-wrap gap-4">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
          <span
            className={`inline-block ${item.shape === "line" ? "h-0.5 w-5" : "h-3 w-3 rounded-sm"}`}
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

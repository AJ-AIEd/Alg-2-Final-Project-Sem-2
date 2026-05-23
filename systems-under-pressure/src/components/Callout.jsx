const colors = {
  warn: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-red-50 text-red-800 border-red-200",
  success: "bg-green-50 text-green-800 border-green-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

const prefixes = {
  warn: "Warning:",
  danger: "Important:",
  success: "Key finding:",
  info: "Look for:",
};

export default function Callout({ variant = "info", children, prefix }) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed shadow-sm ${colors[variant]}`}>
      <strong>{prefix ?? prefixes[variant]}</strong> {children}
    </div>
  );
}

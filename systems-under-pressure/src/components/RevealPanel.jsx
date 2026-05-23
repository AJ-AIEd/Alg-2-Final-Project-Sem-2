export default function RevealPanel({ title, children, defaultOpen = false }) {
  return (
    <details className="group rounded-lg border border-slate-200 bg-white shadow-sm" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-slate-900">
        {title}
        <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-base text-slate-500 transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-slate-100 px-4 py-4 text-sm leading-6 text-slate-650">{children}</div>
    </details>
  );
}

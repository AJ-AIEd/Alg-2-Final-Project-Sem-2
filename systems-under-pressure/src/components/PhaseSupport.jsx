import RevealPanel from "./RevealPanel.jsx";

function ListBlock({ title, items }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-650">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PhaseSupport({ support }) {
  return (
    <RevealPanel title="Investigation support: pacing, artifacts, and readiness">
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested pacing</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{support.pacing}</p>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Homework</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{support.homework}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <ListBlock title="Group investigation" items={support.group} />
          <ListBlock title="Individual reasoning" items={support.individual} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <ListBlock title="Required notebook artifacts" items={support.artifacts} />
          <ListBlock title="Before moving on, make sure you have..." items={support.readiness} />
        </div>

        <div className="rounded-md border border-cyan-200 bg-cyan-50 p-3 text-sm leading-6 text-cyan-900">
          <strong>Vlog checkpoint:</strong> {support.vlog}
        </div>
      </div>
    </RevealPanel>
  );
}

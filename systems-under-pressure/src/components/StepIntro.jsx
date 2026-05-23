export default function StepIntro({ kicker, title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kicker}</p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
      {children && <div className="max-w-2xl text-base leading-7 text-slate-650">{children}</div>}
    </div>
  );
}

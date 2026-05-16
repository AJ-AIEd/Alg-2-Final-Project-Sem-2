type CitationBlockProps = {
  citation: string;
};

export function CitationBlock({ citation }: CitationBlockProps) {
  return (
    <aside className="mt-10 rounded-lg border border-teal-200 bg-teal-50 p-5">
      <h2 className="text-base font-semibold text-stone-950">Suggested citation</h2>
      <p className="mt-2 text-sm leading-7 text-stone-700">{citation}</p>
    </aside>
  );
}

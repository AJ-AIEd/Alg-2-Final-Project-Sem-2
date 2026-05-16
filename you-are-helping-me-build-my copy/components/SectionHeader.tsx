type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold leading-tight text-stone-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-stone-700">{description}</p> : null}
    </div>
  );
}

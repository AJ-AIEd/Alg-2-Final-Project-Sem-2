type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{description}</p>
      </div>
    </section>
  );
}

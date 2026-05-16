import { notFound } from "next/navigation";
import { CitationBlock } from "@/components/CitationBlock";
import { frameworks } from "@/data/frameworks";

export function generateStaticParams() {
  return frameworks.map((framework) => ({ slug: framework.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const framework = frameworks.find((item) => item.slug === params.slug);
  return { title: framework?.title ?? "Framework" };
}

export default function FrameworkPage({ params }: { params: { slug: string } }) {
  const framework = frameworks.find((item) => item.slug === params.slug);

  if (!framework) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">Framework</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-stone-950">{framework.title}</h1>
      <p className="mt-4 text-stone-600">
        Version {framework.version} · {framework.publicationDate} · {framework.author}
      </p>
      <a className="focus-ring mt-6 inline-flex rounded-md bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-950" href={framework.downloadHref}>
        Download placeholder
      </a>
      <div className="mt-10 space-y-6 text-lg leading-8 text-stone-700">
        <p>{framework.summary}</p>
        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-stone-950">Classroom use case</h2>
          <p className="mt-3">{framework.classroomUseCase}</p>
        </section>
        {framework.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <CitationBlock citation={framework.citation} />
      <p className="mt-6 text-sm text-stone-600">{framework.copyright}</p>
    </article>
  );
}

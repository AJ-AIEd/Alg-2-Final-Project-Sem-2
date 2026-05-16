import { notFound } from "next/navigation";
import { resources } from "@/data/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const resource = resources.find((item) => item.slug === params.slug);
  return {
    title: resource?.title ?? "Resource",
    description: resource?.description,
  };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = resources.find((item) => item.slug === params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
        {resource.courseCategory} · {resource.type}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-stone-950">{resource.title}</h1>
      <p className="mt-4 text-stone-600">
        Version {resource.version} · {resource.date}
      </p>
      <p className="mt-8 text-lg leading-8 text-stone-700">{resource.description}</p>
      <p className="mt-6 rounded-lg border border-stone-200 bg-white p-5 text-stone-700">{resource.useNotice}</p>
      <a className="focus-ring mt-6 inline-flex rounded-md bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-950" href={resource.downloadHref}>
        Download placeholder
      </a>
    </article>
  );
}

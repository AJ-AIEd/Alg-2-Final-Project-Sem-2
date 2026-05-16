import type { Resource } from "@/data/resources";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800">
        <span>{resource.courseCategory}</span>
        <span>{resource.type}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-stone-950">{resource.title}</h3>
      <p className="mt-2 text-sm text-stone-500">
        Version {resource.version} · {resource.date}
      </p>
      <p className="mt-4 flex-1 leading-7 text-stone-700">{resource.description}</p>
      <p className="mt-4 text-sm text-stone-600">{resource.useNotice}</p>
      <a className="focus-ring mt-5 w-fit rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-950 hover:border-teal-800 hover:text-teal-800" href={resource.downloadHref}>
        Download placeholder
      </a>
    </article>
  );
}

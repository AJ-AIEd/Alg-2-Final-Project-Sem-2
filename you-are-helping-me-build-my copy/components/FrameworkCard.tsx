import Link from "next/link";
import type { Framework } from "@/data/frameworks";

export function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-800">
        Version {framework.version} · {framework.publicationDate}
      </p>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-stone-950">
        <Link className="focus-ring rounded-sm hover:text-teal-800" href={`/frameworks/${framework.slug}`}>
          {framework.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 leading-7 text-stone-700">{framework.summary}</p>
      <p className="mt-4 text-sm text-stone-600">{framework.copyright}</p>
      <a className="focus-ring mt-5 w-fit rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-950 hover:border-teal-800 hover:text-teal-800" href={framework.downloadHref}>
        Download placeholder
      </a>
    </article>
  );
}

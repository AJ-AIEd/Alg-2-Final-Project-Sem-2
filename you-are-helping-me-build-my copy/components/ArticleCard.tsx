import Link from "next/link";
import type { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800">
        <span>{article.category}</span>
        <span>{article.status}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-stone-950">
        <Link className="focus-ring rounded-sm hover:text-teal-800" href={`/writing/${article.slug}`}>
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-stone-500">{article.date}</p>
      <p className="mt-4 flex-1 leading-7 text-stone-700">{article.description}</p>
      <p className="mt-5 text-sm font-medium text-stone-600">Suggested citation available on article page.</p>
    </article>
  );
}

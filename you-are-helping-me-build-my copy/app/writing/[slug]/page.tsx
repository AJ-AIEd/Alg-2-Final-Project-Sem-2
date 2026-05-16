import { notFound } from "next/navigation";
import { CitationBlock } from "@/components/CitationBlock";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);
  return {
    title: article?.title ?? "Article",
    description: article?.description,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">{article.category}</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-stone-950">{article.title}</h1>
      <p className="mt-4 text-stone-600">
        {article.date} · {article.status}
      </p>
      <div className="mt-10 space-y-6 text-lg leading-8 text-stone-700">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <CitationBlock citation={article.citation} />
    </article>
  );
}

import { ArticleCard } from "@/components/ArticleCard";
import { PageHeader } from "@/components/PageHeader";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Research & Writing",
  description:
    "Research notes, practitioner articles, and working papers by Andrew Cajina on AI in education and mathematics pedagogy.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research & Writing"
        title="Writing on AI, mathematics education, ethics, and classroom practice."
        description="A clean index of research notes, practitioner articles, working papers, and essays for educators and school leaders."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </section>
    </>
  );
}

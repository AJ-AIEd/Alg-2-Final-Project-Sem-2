import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { FrameworkCard } from "@/components/FrameworkCard";
import { Hero } from "@/components/Hero";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { articles } from "@/data/articles";
import { frameworks } from "@/data/frameworks";
import { resources } from "@/data/resources";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured writing"
            title="Research-informed writing for practical AI integration."
            description="Short essays and working notes for teachers, school leaders, researchers, and professional learning teams."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured frameworks"
            title="Classroom-ready tools for ethical decisions."
            description="Frameworks that help educators move from AI principles to teachable, discussable classroom practice."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {frameworks.slice(0, 2).map((framework) => (
              <FrameworkCard framework={framework} key={framework.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured teaching resources"
            title="Materials designed for classroom use and teacher reflection."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {resources.slice(0, 2).map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Planning AI professional learning for your school or department?"
        description="Reach out to discuss a workshop, coaching cycle, keynote, or collaboration."
        href="/contact"
        label="Book a Workshop"
      />
    </>
  );
}

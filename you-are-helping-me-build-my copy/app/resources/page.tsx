import { PageHeader } from "@/components/PageHeader";
import { ResourceCard } from "@/components/ResourceCard";
import { resourceCategories, resources } from "@/data/resources";

export const metadata = {
  title: "Teaching Resources",
  description:
    "Classroom-ready teaching resources by Andrew Cajina for mathematics, AI literacy, assessment design, and reflection.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Teaching Resources"
        title="A resource library for mathematics teaching, AI literacy, and reflection."
        description="Filter-style categories are shown visually for Version 1.0. Interactive filtering can come later if it becomes useful."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {resourceCategories.map((category) => (
            <span className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700" key={category}>
              {category}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </section>
    </>
  );
}

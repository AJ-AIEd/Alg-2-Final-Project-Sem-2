import { FrameworkCard } from "@/components/FrameworkCard";
import { PageHeader } from "@/components/PageHeader";
import { frameworks } from "@/data/frameworks";

export const metadata = {
  title: "Frameworks",
};

export default function FrameworksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Frameworks"
        title="A framework library for ethical AI integration and mathematics pedagogy."
        description="Versioned, citable tools for classroom planning, department conversations, and professional learning."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        {frameworks.map((framework) => (
          <FrameworkCard framework={framework} key={framework.slug} />
        ))}
      </section>
    </>
  );
}

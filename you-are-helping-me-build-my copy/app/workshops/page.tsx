import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { workshopAudiences, workshopFormats, workshopTopics } from "@/data/workshops";

export const metadata = {
  title: "Workshops / PD",
  description:
    "Professional development workshops and consultation by Andrew Cajina on ethical AI integration, mathematics pedagogy, AI-TPACK, and assessment design.",
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workshops / PD"
        title="Professional learning for ethical and meaningful AI integration."
        description="I offer professional learning experiences for schools, departments, and educators working to integrate AI ethically and meaningfully into teaching and learning."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-semibold text-stone-950">Workshop topics</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {workshopTopics.map((topic) => (
                <article className="rounded-lg border border-stone-200 bg-white p-5" key={topic}>
                  <h3 className="font-semibold text-stone-950">{topic}</h3>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-stone-950">Formats</h2>
              <ul className="mt-5 space-y-3 text-stone-700">
                {workshopFormats.map((format) => (
                  <li className="rounded-lg border border-stone-200 bg-white p-4" key={format}>{format}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-stone-950">Audience</h2>
              <ul className="mt-5 grid gap-3 text-stone-700 sm:grid-cols-2">
                {workshopAudiences.map((audience) => (
                  <li className="rounded-lg border border-stone-200 bg-white p-4" key={audience}>{audience}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
      <CTASection
        title="Reach out to discuss a workshop, coaching cycle, or collaboration."
        description="Share your context, audience, format, and goals, and we can shape a professional learning experience that fits."
        href="/contact"
        label="Start a Conversation"
      />
    </>
  );
}

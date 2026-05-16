import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An international mathematics teacher working at the intersection of AI, ethics, and pedagogy."
        description="Andrew Cajina's work connects classroom mathematics, ethical AI integration, professional development, and human-centered educational design."
      />
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-lg leading-8 text-stone-700">
          <p>
            Andrew Cajina is an international high school mathematics teacher focused on AI in
            education, mathematics pedagogy, ethical AI integration, AI-TPACK, classroom-ready
            AI frameworks, and professional development for educators.
          </p>
          <p>
            His teaching context shapes the work: practical decisions, real students, time-limited
            classrooms, and the need for tools that teachers can understand, critique, and adapt.
            He is especially interested in how AI changes planning, feedback, assessment, data
            literacy, and mathematical reasoning.
          </p>
          <p>
            Andrew's AI and education position is deliberately human-centered. AI should support
            better questions, clearer feedback, richer reflection, and more thoughtful design. It
            should not replace student reasoning, teacher judgment, or the relational work of
            teaching.
          </p>
          <p>
            In mathematics pedagogy, his emphasis is on explanation, representation, critique,
            transfer, and intellectual agency. The central question is not whether AI can produce
            an answer, but whether learners are becoming more capable mathematical thinkers.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            "AI-TPACK for department and unit planning",
            "Ethical AI norms for mathematics classrooms",
            "AI-resilient assessment and feedback design",
            "Critical data literacy and misleading graphs",
          ].map((interest) => (
            <div className="rounded-lg border border-stone-200 bg-white p-5" key={interest}>
              <h2 className="text-base font-semibold text-stone-950">{interest}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

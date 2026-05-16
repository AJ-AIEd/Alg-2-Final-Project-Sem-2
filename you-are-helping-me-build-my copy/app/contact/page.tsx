import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Contact",
  description:
    "Contact Andrew Cajina for professional development workshops, research collaboration, speaking, curriculum design, assessment design, and AI policy-to-practice support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation about mathematics, AI, professional learning, or collaboration."
        description="Use this page for workshop invitations, speaking requests, research collaboration, curriculum design, or AI policy-to-practice support."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-stone-950">Collaboration areas</h2>
          <div className="mt-5 grid gap-3">
            {[
              "PD workshops",
              "Research collaboration",
              "Speaking",
              "Curriculum/assessment design",
              "AI policy-to-practice support",
            ].map((area) => (
              <p className="rounded-lg border border-stone-200 bg-white p-4 text-stone-700" key={area}>
                {area}
              </p>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-stone-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-stone-950">Email placeholder</h2>
            <a className="focus-ring mt-3 inline-flex rounded-sm font-semibold text-teal-800 hover:text-stone-950" href="mailto:hello@example.com">
              hello@example.com
            </a>
          </div>
        </div>
        <form className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-stone-950">Contact form UI</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            This form is visual only in Version 1.0. It does not submit anywhere yet.
          </p>
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Name
              <input className="rounded-md border border-stone-300 px-3 py-3 text-stone-950" name="name" placeholder="Your name" type="text" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Email
              <input className="rounded-md border border-stone-300 px-3 py-3 text-stone-950" name="email" placeholder="you@example.com" type="email" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Area of interest
              <select className="rounded-md border border-stone-300 px-3 py-3 text-stone-950" name="interest">
                <option>PD workshops</option>
                <option>Research collaboration</option>
                <option>Speaking</option>
                <option>Curriculum/assessment design</option>
                <option>AI policy-to-practice support</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Message
              <textarea className="min-h-36 rounded-md border border-stone-300 px-3 py-3 text-stone-950" name="message" placeholder="Share your context, goals, timeline, and audience." />
            </label>
          </div>
          <button className="mt-6 rounded-md bg-stone-300 px-5 py-3 text-sm font-semibold text-stone-700" disabled type="button">
            Submit disabled for Version 1.0
          </button>
        </form>
      </section>
    </>
  );
}

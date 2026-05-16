import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
            AI in Education · Mathematics Pedagogy · Professional Learning
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl">
            Andrew Cajina helps educators integrate AI ethically and meaningfully.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-stone-700">
            Ethical AI, mathematical thinking, and classroom-ready educational design.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="focus-ring rounded-md bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-950" href="/writing">
              Read My Work
            </Link>
            <Link className="focus-ring rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-950 hover:border-teal-800 hover:text-teal-800" href="/frameworks">
              Explore Frameworks
            </Link>
            <Link className="focus-ring rounded-md bg-amber-700 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-950" href="/workshops">
              Book a Workshop
            </Link>
          </div>
        </div>
        <aside className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">Professional focus</h2>
          <div className="mt-5 grid gap-4 text-stone-700">
            <p>International high school mathematics teaching</p>
            <p>AI-TPACK and classroom-ready AI frameworks</p>
            <p>Ethical AI integration for schools and departments</p>
            <p>Professional development for educators and leaders</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

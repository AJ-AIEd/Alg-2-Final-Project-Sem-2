import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function CTASection({ title, description, href, label }: CTASectionProps) {
  return (
    <section className="bg-teal-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 text-white sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight">{title}</h2>
          <p className="mt-3 leading-7 text-teal-50">{description}</p>
        </div>
        <Link className="focus-ring w-fit rounded-md bg-white px-5 py-3 text-sm font-semibold text-teal-900 hover:bg-amber-100" href={href}>
          {label}
        </Link>
      </div>
    </section>
  );
}

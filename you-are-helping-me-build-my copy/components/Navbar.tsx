import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Research & Writing" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/resources", label: "Teaching Resources" },
  { href: "/workshops", label: "Workshops / PD" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <Link className="focus-ring w-fit rounded-sm text-lg font-semibold text-stone-950" href="/">
          Andrew Cajina
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-stone-700">
          {links.map((link) => (
            <Link className="focus-ring rounded-sm hover:text-teal-800" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

export function PortalLayout({
  title,
  description,
  navItems,
  children,
  transparentBackground
}: {
  title: string;
  description: string;
  navItems: NavItem[];
  children: ReactNode;
  transparentBackground?: boolean;
}) {
  return (
    <div className={`min-h-screen ${transparentBackground ? "bg-transparent" : "bg-brand-primary/5"}`}>
      <header
        className={`border-b border-brand-primary/10 ${transparentBackground ? "bg-white/95 backdrop-blur-sm" : "bg-white"}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="heading text-2xl">{title}</h1>
            <p className="text-sm text-brand-text/70">{description}</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-brand-primary/20 px-3 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

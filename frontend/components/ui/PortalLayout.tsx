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
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

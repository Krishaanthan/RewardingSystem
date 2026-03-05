import Link from "next/link";

type CtaLink = {
  label: string;
  href: string;
};

export function AuthLayout({
  title,
  subtitle,
  fields,
  buttonLabel,
  links
}: {
  title: string;
  subtitle: string;
  fields: string[];
  buttonLabel: string;
  links: CtaLink[];
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-tertiary px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-brand-tertiary bg-secondary p-6 shadow-soft sm:p-8">
        <h1 className="heading text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-brand-text/70">{subtitle}</p>

        <form className="mt-6 space-y-4">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="mb-2 block text-sm font-medium text-brand-text">{field}</span>
              <input
                className="w-full rounded-xl border border-brand-tertiary px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-primary/30"
                placeholder={`Enter ${field.toLowerCase()}`}
              />
            </label>
          ))}
          <button
            type="button"
            className="w-full rounded-xl bg-brand-primary px-4 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            {buttonLabel}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-brand-primary underline">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

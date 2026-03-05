import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-tertiary px-4 py-12">
      <section className="mx-auto max-w-5xl rounded-3xl border border-brand-tertiary bg-secondary p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary/70">
          Student Rewarding System
        </p>
        <h1 className="heading mt-3 text-4xl sm:text-5xl">Campus Engagement, Rewarded</h1>
        <p className="mt-4 max-w-2xl text-brand-text/80">
          AI-assisted academic point verification for extracurricular, co-curricular, and global
          activities.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link className="rounded-xl bg-brand-primary px-4 py-3 text-center font-semibold text-white" href="/student-login">
            Student Login
          </Link>
          <Link className="rounded-xl border border-brand-tertiary px-4 py-3 text-center font-semibold text-brand-primary" href="/student-register">
            Student Register
          </Link>
          <Link className="rounded-xl border border-brand-tertiary px-4 py-3 text-center font-semibold text-brand-primary" href="/faculty-login">
            Faculty Login
          </Link>
          <Link className="rounded-xl border border-brand-tertiary px-4 py-3 text-center font-semibold text-brand-primary" href="/admin-login">
            Admin Login
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function SubmitProjectPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-12">
      <section className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Submit project</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900">Coming soon</h1>
        <p className="mt-3 text-sm font-semibold text-neutral-600">
          This is a placeholder so the Leaderboard navbar links don’t 404.
        </p>
        <div className="mt-6">
          <Link href="/leaderboard" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white">
            Back to Leaderboard
          </Link>
        </div>
      </section>
    </main>
  );
}


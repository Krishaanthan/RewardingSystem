export function StatCard({
  title,
  value,
  subtitle
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <article className="card">
      <p className="text-sm text-brand-text/70">{title}</p>
      <p className="mt-2 text-2xl font-bold text-brand-primary">{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-brand-text/70">{subtitle}</p> : null}
    </article>
  );
}

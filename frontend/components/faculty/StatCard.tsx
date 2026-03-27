'use client';

type StatCardProps = {
  label: string;
  value: string;
  valueColor?: 'primary' | 'success' | 'info' | 'warning';
  subtitle?: string;
};

const valueColors = {
  primary: 'text-faculty-primary',
  success: 'text-faculty-success',
  info: 'text-faculty-info',
  warning: 'text-faculty-warning',
};

export function StatCard({
  label,
  value,
  valueColor = 'primary',
  subtitle,
}: StatCardProps) {
  return (
    <article
      className="rounded-xl border border-faculty-border bg-white p-5 shadow-faculty"
      style={{
        padding: '20px 22px',
        borderRadius: '14px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <p
        className="font-league-spartan text-[11px] font-bold uppercase tracking-wide text-faculty-text-muted"
      >
        {label}
      </p>
      <p
        className={`mt-2 font-archivo-black text-faculty-text-main ${valueColors[valueColor]}`}
        style={{ fontSize: '30px' }}
      >
        {value}
      </p>
      {subtitle ? (
        <p className="mt-1 text-[11px] text-faculty-text-muted" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {subtitle}
        </p>
      ) : null}
    </article>
  );
}

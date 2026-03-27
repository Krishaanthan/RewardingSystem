'use client';

type Status = 'ai-approved' | 'manual-review' | 'rejected';

const styles: Record<Status, { bg: string; text: string; dot: string }> = {
  'ai-approved': {
    bg: 'bg-[#f0fdf4]',
    text: 'text-faculty-success',
    dot: 'bg-faculty-success',
  },
  'manual-review': {
    bg: 'bg-[#fffbeb]',
    text: 'text-faculty-warning',
    dot: 'bg-faculty-warning',
  },
  rejected: {
    bg: 'bg-[#fef2f2]',
    text: 'text-faculty-danger',
    dot: 'bg-faculty-danger',
  },
};

export function StatusBadge({
  status,
  label,
}: {
  status: Status;
  label: string;
}) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
    >
      <span
        className={`h-[7px] w-[7px] shrink-0 rounded-full ${s.dot}`}
        style={{ borderRadius: '50%' }}
      />
      {label}
    </span>
  );
}

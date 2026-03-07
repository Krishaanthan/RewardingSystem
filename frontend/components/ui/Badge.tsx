type BadgeVariant =
  | "ai-processing"
  | "approved"
  | "manual-review"
  | "rejected"
  | "ai"
  | "manual"
  | "status-approved"
  | "status-pending"
  | "status-rejected"
  | "status-deduction"
  | "ledger-approved"
  | "ledger-pending"
  | "ledger-completed"
  | "ledger-rejected";

const variantStyles: Record<BadgeVariant, string> = {
  // Existing variants used across the app
  "ai-processing": "bg-blue-100 text-blue-700",
  approved: "bg-emerald-100 text-emerald-700",
  "manual-review": "bg-amber-100 text-amber-800",
  rejected: "bg-rose-100 text-rose-700",

  // New source badges for AI vs Manual
  ai: "bg-[#FDF1F6] text-[#8F113B]", // light brand background, primary text
  manual: "bg-slate-100 text-slate-800",

  // New status-style badges (used in some tables)
  "status-approved": "bg-emerald-50 text-emerald-700",
  "status-pending": "bg-slate-100 text-slate-600",
  "status-rejected": "bg-slate-100 text-slate-700",
  "status-deduction": "bg-rose-50 text-rose-700",

  // New ledger-specific variants matching the mockup
  "ledger-approved": "bg-emerald-100 text-emerald-600 border border-emerald-200 uppercase",
  "ledger-pending": "bg-amber-50 text-amber-600 border border-amber-200 uppercase",
  "ledger-completed": "bg-slate-100 text-slate-600 border border-slate-200 uppercase",
  "ledger-rejected": "bg-rose-100 text-rose-600 border border-rose-200 uppercase"
};

export function Badge({
  label,
  variant
}: {
  label: string;
  variant: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}

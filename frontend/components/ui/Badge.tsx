type BadgeVariant =
  | "ai-processing"
  | "approved"
  | "manual-review"
  | "rejected"
  | "pending"
  | "clarification-requested"
  | "priority-high"
  | "priority-medium"
  | "priority-low";

const variantStyles: Record<BadgeVariant, string> = {
  "ai-processing": "bg-blue-100 text-blue-700",
  approved: "bg-emerald-100 text-emerald-700",
  "manual-review": "bg-amber-100 text-amber-800",
  rejected: "bg-rose-100 text-rose-700",
  pending: "bg-amber-100 text-amber-800",
  "clarification-requested": "bg-sky-100 text-sky-700",
  "priority-high": "bg-red-100 text-red-700",
  "priority-medium": "bg-yellow-100 text-yellow-800",
  "priority-low": "bg-green-100 text-green-700"
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

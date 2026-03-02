type BadgeVariant =
  | "ai-processing"
  | "approved"
  | "manual-review"
  | "rejected";

const variantStyles: Record<BadgeVariant, string> = {
  "ai-processing": "bg-blue-100 text-blue-700",
  approved: "bg-emerald-100 text-emerald-700",
  "manual-review": "bg-amber-100 text-amber-800",
  rejected: "bg-rose-100 text-rose-700"
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

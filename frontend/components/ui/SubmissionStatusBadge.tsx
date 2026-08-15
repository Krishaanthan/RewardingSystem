import type { SubmissionStatus } from "@/lib/activity-rewards";


function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const config: Record<
  SubmissionStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  "ai-processing": {
    label: "AI Processing",
    icon: <Spinner />,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  approved: {
    label: "Approved", // dynamic override below

    icon: <CheckIcon />,
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  "manual-review": {
    label: "Under Manual Review",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  rejected: {
    label: "Rejected",
    icon: <CrossIcon />,
    className: "bg-rose-100 text-rose-700 border-rose-200",
  },
};

export function SubmissionStatusBadge({ status, reviewerName }: { status: SubmissionStatus; reviewerName?: string }) {
  const { label, icon, className } = config[status];
  
  let finalLabel = label;
  if (status === "approved") {
    finalLabel = reviewerName ? `Approved by ${reviewerName}` : "Approved by Faculty";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${className}`}
    >
      {icon}
      {finalLabel}
    </span>
  );
}

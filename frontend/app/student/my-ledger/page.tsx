import { Badge } from "@/components/ui/Badge";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { studentNav } from "@/lib/nav";

type LedgerStatus = "APPROVED" | "PENDING" | "REJECTED" | "DEDUCTION";
type LedgerSource = "AI" | "MANUAL";

type LedgerRow = {
  id: string;
  dateTime: string;
  description: string;
  credits: number;
  status: LedgerStatus;
  source: LedgerSource;
};

const ledger: LedgerRow[] = [
  {
    id: "2024-10-28-1030",
    dateTime: "OCT 28, 2024 10:30 AM",
    description: "Attendance Bonus (Perfect Week)",
    credits: 50,
    status: "APPROVED",
    source: "AI"
  },
  {
    id: "2024-10-26-1415",
    dateTime: "OCT 26, 2024 02:15 PM",
    description: "Class Participation",
    credits: 100,
    status: "PENDING",
    source: "AI"
  },
  {
    id: "2024-10-25-0900",
    dateTime: "OCT 25, 2024 09:00 AM",
    description: "Library Late Fee",
    credits: -20,
    status: "DEDUCTION",
    source: "MANUAL"
  },
  {
    id: "2024-10-24-1145",
    dateTime: "OCT 24, 2024 11:45 AM",
    description: "Club Meeting Credits",
    credits: 75,
    status: "APPROVED",
    source: "MANUAL"
  },
  {
    id: "2024-10-23-1500",
    dateTime: "OCT 23, 2024 03:00 PM",
    description: "Workshop Attendance",
    credits: 50,
    status: "REJECTED",
    source: "AI"
  }
];

function getStatusLabelAndVariant(status: LedgerStatus) {
  switch (status) {
    case "APPROVED":
      return { label: "APPROVED", variant: "status-approved" as const };
    case "PENDING":
      return { label: "PENDING", variant: "status-pending" as const };
    case "REJECTED":
      return { label: "REJECTED", variant: "status-rejected" as const };
    case "DEDUCTION":
      return { label: "DEDUCTION", variant: "status-deduction" as const };
  }
}

function formatCredits(credits: number) {
  const sign = credits > 0 ? "+" : credits < 0 ? "-" : "";
  const absolute = Math.abs(credits);
  return `${sign}${absolute} pts`;
}

export default function StudentLedgerPage() {
  const currentBalance = ledger.reduce((total, row) => {
    if (row.status === "PENDING" || row.status === "REJECTED") {
      return total;
    }
    return total + row.credits;
  }, 0);

  const pointsWaitingForApproval = ledger
    .filter((row) => row.status === "PENDING")
    .reduce((total, row) => total + row.credits, 0);

  return (
    <PortalLayout
      title="My Ledger"
      description="Chronological transaction log with AI/manual statuses."
      navItems={studentNav}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "#8F113B" }}
          >
            Student Points Ledger
          </h1>
          <p className="mt-1 text-sm text-brand-text/80">
            Student: Jane Doe · ID: 202401
          </p>
        </div>

        <div className="max-w-sm">
          <div
            className="rounded-xl p-4 text-sm text-white shadow-md"
            style={{ backgroundColor: "#8F113B" }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  Current balance points
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {currentBalance.toLocaleString()} pts
                </p>
              </div>
              <div className="h-10 w-px bg-white/25" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  Points waiting for approval
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {pointsWaitingForApproval.toLocaleString()} pts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="card overflow-x-auto">
        <div className="mb-3 flex flex-col gap-3 border-b border-brand-primary/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="heading text-lg">Points Transaction History</h2>
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <label className="flex items-center gap-2">
              <span className="text-brand-text/70">Date range</span>
              <input
                type="date"
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm"
              />
              <span className="text-brand-text/60">to</span>
              <input
                type="date"
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="text-brand-text/70">Status</span>
              <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs sm:text-sm">
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
          </div>
        </div>

        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-primary/10 text-xs font-semibold uppercase tracking-wide text-brand-text/70">
              <th className="py-3 pr-4">Date &amp; Time</th>
              <th className="py-3 pr-4">Description</th>
              <th className="py-3 pr-4 text-right">Credits</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((row) => {
              const statusMeta = getStatusLabelAndVariant(row.status);
              const isPositive = row.credits > 0;
              const creditsColor =
                row.credits < 0 ? "text-rose-600" : "text-emerald-700";

              return (
                <tr
                  key={row.id}
                  className="border-b border-brand-primary/10 last:border-none"
                >
                  <td className="py-3 pr-4 align-top text-xs font-medium text-brand-text/80">
                    {row.dateTime}
                  </td>
                  <td className="py-3 pr-4 align-top text-sm text-brand-text">
                    {row.description}
                  </td>
                  <td
                    className={`py-3 pr-4 align-top text-right text-sm font-semibold ${creditsColor}`}
                  >
                    {formatCredits(row.credits)}
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <Badge
                      label={statusMeta.label}
                      variant={statusMeta.variant}
                    />
                  </td>
                  <td className="py-3 align-top">
                    <Badge
                      label={row.source === "AI" ? "AI" : "Manual"}
                      variant={row.source === "AI" ? "ai" : "manual"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </PortalLayout>
  );
}

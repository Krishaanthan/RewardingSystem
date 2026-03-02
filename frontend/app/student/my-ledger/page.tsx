import { Badge } from "@/components/ui/Badge";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { studentNav } from "@/lib/nav";

const ledger = [
  { activity: "IEEE Workshop", points: "+30", status: "Approved by AI", variant: "approved" as const },
  { activity: "NPTEL Course", points: "+50", status: "AI Processing", variant: "ai-processing" as const },
  { activity: "Club Event", points: "+20", status: "Under Manual Review", variant: "manual-review" as const },
  { activity: "Attendance Adjustment", points: "-10", status: "Rejected", variant: "rejected" as const }
];

export default function StudentLedgerPage() {
  return (
    <PortalLayout
      title="My Ledger"
      description="Chronological transaction log with AI/manual statuses."
      navItems={studentNav}
    >
      <section className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-primary/10">
              <th className="py-3">Activity</th>
              <th className="py-3">Points</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((row) => (
              <tr key={row.activity} className="border-b border-brand-primary/10 last:border-none">
                <td className="py-3">{row.activity}</td>
                <td className="py-3 font-semibold text-brand-primary">{row.points}</td>
                <td className="py-3">
                  <Badge label={row.status} variant={row.variant} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalLayout>
  );
}

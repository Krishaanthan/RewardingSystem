import { Badge } from "@/components/ui/Badge";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { facultyNav } from "@/lib/nav";

const auditRows = [
  { id: "AI-2026-1001", student: "22CS010", action: "Workshop Certificate", score: "96%" },
  { id: "AI-2026-1002", student: "22EC089", action: "Global MOOC", score: "93%" }
];

export default function FacultyAuditLogPage() {
  return (
    <PortalLayout
      title="Audit Log"
      description="Read-only AI-approved submissions for spot checks."
      navItems={facultyNav}
    >
      <section className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-primary/10">
              <th className="py-3">Claim ID</th>
              <th className="py-3">Student</th>
              <th className="py-3">Activity</th>
              <th className="py-3">AI Confidence</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditRows.map((row) => (
              <tr key={row.id} className="border-b border-brand-primary/10 last:border-none">
                <td className="py-3">{row.id}</td>
                <td className="py-3">{row.student}</td>
                <td className="py-3">{row.action}</td>
                <td className="py-3">{row.score}</td>
                <td className="py-3">
                  <Badge label="Approved by AI" variant="approved" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalLayout>
  );
}

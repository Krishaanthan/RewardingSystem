import { Badge } from "@/components/ui/Badge";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { facultyNav } from "@/lib/nav";

const flagged = [
  {
    student: "22CS045",
    note: "Name on certificate mismatch. Confidence: 42%",
    status: "Under Manual Review"
  },
  {
    student: "23ME102",
    note: "Blurry upload and incomplete seal. Confidence: 39%",
    status: "Under Manual Review"
  }
];

export default function FacultyReviewQueuePage() {
  return (
    <PortalLayout
      title="Review Queue"
      description="AI-flagged submissions requiring manual verification."
      navItems={facultyNav}
    >
      <div className="grid gap-4">
        {flagged.map((item) => (
          <article key={item.student} className="card">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="heading text-lg">Student: {item.student}</h2>
              <Badge label={item.status} variant="manual-review" />
            </div>
            <p className="mt-3 text-sm text-brand-text/80">AI Note: {item.note}</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">
                Approve
              </button>
              <button className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white">
                Reject
              </button>
            </div>
          </article>
        ))}
      </div>
    </PortalLayout>
  );
}

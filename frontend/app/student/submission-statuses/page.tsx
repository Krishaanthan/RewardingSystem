import Link from "next/link";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { SubmissionStatusBadge } from "@/components/ui/SubmissionStatusBadge";
import { Button } from "@/components/ui/Button";
import {
  ACTIVITY_REWARDS,
  type SubmissionStatus,
} from "@/lib/activity-rewards";
import { studentNav } from "@/lib/nav";

type Submission = {
  id: string;
  activity: string;
  rewards: number;
  submittedAt: string;
  status: SubmissionStatus;
  feedback?: string;
};

// Mock submissions – will be replaced by API/state from submissions page
const submissions: Submission[] = [
  {
    id: "1",
    activity: "NPTEL 12 week course",
    rewards: 6,
    submittedAt: "2025-03-01T14:30:00",
    status: "ai-processing",
  },
  {
    id: "2",
    activity: "Hackathon Participation",
    rewards: 2,
    submittedAt: "2025-02-28T10:15:00",
    status: "approved",
  },
  {
    id: "3",
    activity: "Global Certificate",
    rewards: 6,
    submittedAt: "2025-02-27T09:00:00",
    status: "manual-review",
  },
  {
    id: "4",
    activity: "Club Activities",
    rewards: 2,
    submittedAt: "2025-02-25T16:45:00",
    status: "rejected",
    feedback:
      "Certificate image is blurry and the name does not match the registered student. Please resubmit with a clear copy.",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubmissionStatusesPage() {
  return (
    <PortalLayout
      title="Submission Statuses"
      description="Track your activity submissions and their verification status."
      navItems={studentNav}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-text/80">
            Full transparency on your submission pipeline. Submissions from the
            Claim Points page appear here automatically.
          </p>
          <Link href="/student/claim-points">
            <Button variant="primary">Submit New Proof</Button>
          </Link>
        </div>

        {/* Submissions list */}
        <section className="card overflow-hidden p-0">
          <div className="border-b border-brand-tertiary bg-gradient-to-r from-brand-tertiary/10 to-transparent px-4 py-3">
            <h2 className="heading text-lg">Your Submissions</h2>
          </div>
          <div className="divide-y divide-brand-tertiary">
            {submissions.length === 0 ? (
              <div className="px-4 py-8 text-center text-brand-text/70">
                <p>No submissions yet.</p>
                <Link
                  href="/student/claim-points"
                  className="mt-2 inline-block text-brand-primary underline"
                >
                  Submit your first proof →
                </Link>
              </div>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="px-4 py-4 transition hover:bg-brand-tertiary/5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-brand-text">
                        {sub.activity}
                      </p>
                      <p className="mt-1 text-sm text-brand-text/70">
                        Submitted {formatDate(sub.submittedAt)}
                      </p>
                      {sub.status === "rejected" && sub.feedback && (
                        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                          <span className="font-medium">Feedback: </span>
                          {sub.feedback}
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="font-semibold text-brand-primary">
                        +{sub.rewards} pts
                      </span>
                      <SubmissionStatusBadge status={sub.status} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Activity & Rewards reference table */}
        <section className="card overflow-hidden p-0">
          <div className="border-b border-brand-tertiary bg-gradient-to-r from-brand-tertiary/10 to-transparent px-4 py-3">
            <h2 className="heading text-lg">Activity & Rewards</h2>
            <p className="mt-1 text-sm text-brand-text/70">
              Points awarded per activity type
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 border-b border-brand-tertiary bg-brand-secondary">
                <tr>
                  <th className="px-4 py-3 font-semibold text-brand-primary">
                    Activity
                  </th>
                  <th className="px-4 py-3 font-semibold text-brand-primary">
                    Rewards
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ACTIVITY_REWARDS).map(([activity, rewards]) => (
                  <tr
                    key={activity}
                    className="border-b border-brand-tertiary/50 last:border-0"
                  >
                    <td className="px-4 py-2.5">{activity}</td>
                    <td className="px-4 py-2.5 font-semibold text-brand-primary">
                      {rewards} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PortalLayout>
  );
}

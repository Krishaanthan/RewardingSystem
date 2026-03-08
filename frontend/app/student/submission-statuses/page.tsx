import Link from "next/link";
import { SubmissionStatusBadge } from "@/components/ui/SubmissionStatusBadge";
import { ACTIVITY_REWARDS, type SubmissionStatus } from "@/lib/activity-rewards";

type Submission = {
  id: string;
  activity: string;
  rewards: number;
  submittedAt: string;
  status: SubmissionStatus;
  feedback?: string;
};

// Mock submissions
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
    <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
        {/* Main Content */}
        <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-6 pt-28 font-primary">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
            <div>
              <h1 className="heading text-2xl font-bold tracking-wide text-black">Submission Statuses</h1>
              <p className="text-sm text-black">Track your verification pipeline.</p>
            </div>
          </header>

          {/* Top Info Banner */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="max-w-xl text-base leading-relaxed text-black">
              Full transparency on your submission pipeline. Submissions from the
              Claim Points page appear here automatically.
            </p>
            <Link
              href="/student/claim-points"
              className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-black/20 bg-white/40 px-6 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/60 text-black"
            >
              Submit New Proof
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 opacity-70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 space-y-8">

            {/* Submissions list - Glassmorphic Card */}
            <section className="w-full rounded-[2rem] border border-black/20 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(131,18,56,0.5)] overflow-hidden">
              <div className="border-b border-black/20 bg-white/40 px-8 py-5 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-primary"></div>
                <h2 className="heading text-xl font-semibold tracking-wide text-black">Your Submissions</h2>
              </div>

              <div className="divide-y divide-black/20">
                {submissions.length === 0 ? (
                  <div className="px-8 py-12 text-center text-black">
                    <p>No submissions yet.</p>
                    <Link
                      href="/student/claim-points"
                      className="mt-4 inline-block font-semibold text-black transition hover:text-black/80"
                    >
                      Submit your first proof &rarr;
                    </Link>
                  </div>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="px-8 py-6 transition hover:bg-white/60"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-black text-lg">
                            {sub.activity}
                          </p>
                          <p className="mt-1 text-sm text-black">
                            Submitted {formatDate(sub.submittedAt)}
                          </p>
                          {sub.status === "rejected" && sub.feedback && (
                            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-black">
                              <span className="font-bold tracking-wider text-xs uppercase text-primary flex items-center gap-2 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Feedback
                              </span>
                              {sub.feedback}
                            </div>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-6 mt-4 sm:mt-0">
                          <span className="font-bold text-black text-xl tracking-tight">
                            +{sub.rewards} pts
                          </span>
                          <div className="scale-110 origin-right">
                            <SubmissionStatusBadge status={sub.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Activity & Rewards reference table - Glassmorphic Card */}
            <section className="w-full rounded-[2rem] border border-black/20 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(131,18,56,0.5)] overflow-hidden">
              <div className="border-b border-black/20 bg-white/40 px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full bg-primary"></div>
                  <h2 className="heading text-xl font-semibold tracking-wide text-black">Activity & Rewards</h2>
                </div>
                <p className="mt-2 text-sm text-black">
                  Points awarded per activity type
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-black/20 bg-white/80 backdrop-blur-md">
                    <tr>
                      <th className="px-8 py-4 font-semibold text-black uppercase tracking-widest text-xs">
                        Activity
                      </th>
                      <th className="px-8 py-4 font-semibold text-black uppercase tracking-widest text-xs">
                        Rewards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/20">
                    {Object.entries(ACTIVITY_REWARDS).map(([activity, rewards]) => (
                      <tr
                        key={activity}
                        className="transition-colors hover:bg-white/60"
                      >
                        <td className="px-8 py-4 text-black">{activity}</td>
                        <td className="px-8 py-4 font-bold text-black tracking-wide">
                          {rewards} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Footer */}
          <footer className="mt-auto py-8 text-center text-xs text-black">
            © 2024 Academic Points Portal. All submissions are processed by Neural AI.
          </footer>
        </div>
      </div>
    </div>
  );
}

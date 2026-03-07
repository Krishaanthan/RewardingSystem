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
    <div className="relative h-screen w-full overflow-hidden text-white font-primary bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
      >
        <source src="/assets/Videos/Motionbg2_loop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-black/30 bg-gradient-to-b from-black/40 via-transparent to-black/40 mix-blend-multiply pointer-events-none" />

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
        {/* Main Content */}
        <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-6 pt-28">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/20 pb-4">
            <div>
              <h1 className="heading text-2xl font-bold tracking-wide text-white">Submission Statuses</h1>
              <p className="text-sm text-white/70">Track your verification pipeline.</p>
            </div>

          </header>

          {/* Top Info Banner */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="max-w-xl text-base leading-relaxed text-white/90">
              Full transparency on your submission pipeline. Submissions from the
              Claim Points page appear here automatically.
            </p>
            <Link
              href="/student/claim-points"
              className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-[#8F113B] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(143,17,59,0.5)]"
            >
              Submit New Proof
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 space-y-8">

            {/* Submissions list - Glassmorphic Card */}
            <section className="w-full rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)] overflow-hidden">
              <div className="border-b border-white/10 bg-white/5 px-8 py-5 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full" style={{ backgroundColor: '#ff4d79' }}></div>
                <h2 className="heading text-xl font-semibold tracking-wide text-white">Your Submissions</h2>
              </div>

              <div className="divide-y divide-white/10">
                {submissions.length === 0 ? (
                  <div className="px-8 py-12 text-center text-white/50">
                    <p>No submissions yet.</p>
                    <Link
                      href="/student/claim-points"
                      className="mt-4 inline-block font-semibold text-white/80 transition hover:text-white"
                    >
                      Submit your first proof &rarr;
                    </Link>
                  </div>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="px-8 py-6 transition hover:bg-white/5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white text-lg">
                            {sub.activity}
                          </p>
                          <p className="mt-1 text-sm text-white/50">
                            Submitted {formatDate(sub.submittedAt)}
                          </p>
                          {sub.status === "rejected" && sub.feedback && (
                            <div className="mt-4 rounded-xl border border-[#ff4d79]/30 bg-[#ff4d79]/10 p-4 text-sm text-white/90">
                              <span className="font-bold tracking-wider text-xs uppercase text-[#ff4d79] flex items-center gap-2 mb-1">
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
                          <span className="font-bold text-white/90 text-xl tracking-tight">
                            +{sub.rewards} pts
                          </span>
                          {/* We wrap the existing component which defines its own badge styles based on status. 
                            (Usually relying on standard Tailwind colors like amber/green/rose) */}
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
            <section className="w-full rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)] overflow-hidden">
              <div className="border-b border-white/10 bg-white/5 px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full" style={{ backgroundColor: '#ff4d79' }}></div>
                  <h2 className="heading text-xl font-semibold tracking-wide text-white">Activity & Rewards</h2>
                </div>
                <p className="mt-2 text-sm text-white/50">
                  Points awarded per activity type
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 border-b border-white/20 bg-[#6b0a23]/95 backdrop-blur-md">
                    <tr>
                      <th className="px-8 py-4 font-semibold text-white/70 uppercase tracking-widest text-xs">
                        Activity
                      </th>
                      <th className="px-8 py-4 font-semibold text-white/70 uppercase tracking-widest text-xs">
                        Rewards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {Object.entries(ACTIVITY_REWARDS).map(([activity, rewards]) => (
                      <tr
                        key={activity}
                        className="transition-colors hover:bg-white/5"
                      >
                        <td className="px-8 py-4 text-white/90">{activity}</td>
                        <td className="px-8 py-4 font-bold text-white tracking-wide">
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
          <footer className="mt-auto py-8 text-center text-xs text-white/50">
            © 2024 Academic Points Portal. All submissions are processed by Neural AI.
          </footer>
        </div>
      </div>
    </div>
  );
}

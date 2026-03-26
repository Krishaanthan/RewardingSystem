"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SubmissionStatusBadge } from "@/components/ui/SubmissionStatusBadge";
import type { SubmissionStatus } from "@/lib/activity-rewards";

type ClaimFile = {
  id: string;
  file_path: string;
  file_type: string;
};

type Submission = {
  id: string;
  activity_title: string;
  activity_points: number;
  submitted_at: string;
  status: string;
  rejection_reason?: string;
  files: ClaimFile[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// Map backend status values to frontend badge variants
const STATUS_MAP: Record<string, SubmissionStatus> = {
  AI_PROCESSING: "ai-processing",
  APPROVED: "approved",
  MANUAL_REVIEW: "manual-review",
  REJECTED: "rejected",
};

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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to view submissions.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/student/claim-statuses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => setSubmissions(data))
      .catch(() => setError("Could not load submissions. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.5);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.56);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
          <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-6 pt-28 font-primary">

            {/* Header */}
            <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-2xl font-bold tracking-wide text-black">Submission Statuses</h1>
                <p className="text-sm text-black">Track your verification pipeline.</p>
              </div>
            </motion.header>

            {/* Top Banner */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="max-w-xl text-base leading-relaxed text-black">
                Full transparency on your submission pipeline. Submissions from the Claim Points page appear here automatically.
              </p>
              <Link
                href="/student/claim-points"
                className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-black/20 bg-white/40 px-6 py-4 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:border-opacity-100 hover:bg-white/60 hover:shadow-[0_4px_20px_0_rgba(131,18,56,0.2)] text-black"
              >
                Submit New Proof
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 opacity-70 transition-colors group-hover:text-primary group-hover:opacity-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            </motion.div>

            <div className="mt-12 space-y-8">

              {/* Submissions list */}
              <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="card w-full overflow-hidden">
                <div className="border-b border-black/20 px-8 py-5 flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full bg-primary"></div>
                  <h2 className="heading text-xl font-semibold tracking-wide text-black">Your Submissions</h2>
                </div>

                <div className="divide-y divide-black/20">
                  {loading ? (
                    <div className="px-8 py-12 text-center text-black">Loading submissions…</div>
                  ) : error ? (
                    <div className="px-8 py-12 text-center text-primary">{error}</div>
                  ) : submissions.length === 0 ? (
                    <div className="px-8 py-12 text-center text-black">
                      <p>No submissions yet.</p>
                      <Link href="/student/claim-points" className="mt-4 inline-block font-semibold text-black transition hover:text-black/80">
                        Submit your first proof &rarr;
                      </Link>
                    </div>
                  ) : (
                    submissions.map((sub, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        key={sub.id}
                        className="px-8 py-6 transition hover:bg-white/60"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-black text-lg">{sub.activity_title}</p>
                            <p className="mt-1 text-sm text-black">Submitted {formatDate(sub.submitted_at)}</p>

                            {/* Uploaded files */}
                            {sub.files.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {sub.files.map((f) => (
                                  <a
                                    key={f.id}
                                    href={`http://localhost:8000/storage/${f.file_path.replace(/\\/g, "/")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={f.file_path}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 bg-white/50 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-white/80 hover:border-primary/40"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 opacity-60">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>
                                    {f.file_type}
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Rejection feedback */}
                            {sub.status === "REJECTED" && sub.rejection_reason && (
                              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-black">
                                <span className="font-bold tracking-wider text-xs uppercase text-primary flex items-center gap-2 mb-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                  </svg>
                                  Feedback
                                </span>
                                {sub.rejection_reason}
                              </div>
                            )}
                          </div>
                          <div className="flex shrink-0 items-center gap-6 mt-4 sm:mt-0">
                            <span className="font-bold text-black text-xl tracking-tight">
                              +{sub.activity_points} pts
                            </span>
                            <div className="scale-110 origin-right">
                              <SubmissionStatusBadge status={STATUS_MAP[sub.status] ?? "ai-processing"} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.section>
            </div>

            {/* Footer */}
            <footer className="mt-auto py-8 text-center text-xs text-black">
              © 2024 Academic Points Portal. All submissions are processed by Neural AI.
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

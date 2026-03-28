"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";

type QueueStatus = "AI_PROCESSING" | "APPROVED" | "REJECTED" | "MANUAL_REVIEW";

type Submission = {
  id: string;
  status: QueueStatus;
  proof_url: string;
  student: {
    name: string;
    reg_no: string;
    department: string;
  };
  activity: {
    id: number;
    activity_name: string;
    points_awarded: number;
  };
  notes?: string;
  submitted_at: string;
};

const STATUS_LABEL: Record<string, string> = {
  AI_PROCESSING: "Pending AI",
  MANUAL_REVIEW: "Needs Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const STATUS_BADGE: Record<string, "pending" | "approved" | "rejected" | "clarification-requested"> = {
  AI_PROCESSING: "pending",
  MANUAL_REVIEW: "clarification-requested",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export default function FacultyReviewQueuePage() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [activityType, setActivityType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [confidenceRange, setConfidenceRange] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comment, setComment] = useState<Record<string, string>>({});
  const [pointsEdit, setPointsEdit] = useState<Record<string, string>>({});

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch("http://localhost:8000/api/faculty/review-queue", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((item: any) => ({
          id: item.id,
          status: item.status,
          proof_url: item.files?.length > 0 ? item.files[0].file_path : "#",
          student: {
            name: item.student_name,
            reg_no: item.student_reg_no,
            department: item.student_dept,
          },
          activity: {
            id: item.activity_id,
            activity_name: item.activity_title,
            points_awarded: item.activity_points,
          },
          submitted_at: item.submitted_at,
          notes: item.rejection_reason
        }));
        setSubmissions(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleReview = async (id: string, newStatus: string, awardedPoints: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const action = newStatus === "APPROVED" ? "approve" : newStatus === "REJECTED" ? "reject" : "manual_review";
      const payload = {
        action: action,
        reason: comment[id] || "",
      };
      const res = await fetch(`http://localhost:8000/api/faculty/claims/${id}/review`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchClaims();
        setComment((prev) => ({ ...prev, [id]: "" }));
      } else {
        alert("Failed to review claim.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = submissions.filter((s) => {
    if (department && s.student.department !== department) return false;
    if (status && s.status !== status) return false;
    return true;
  });

  const Icons = {
    Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>,
    Audit: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M10 13h4" /><path d="M12 11v4" /></svg>,
    Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
    ChevronUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>,
    Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>,
    Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 4.74.83 6.64 1.74A1 1 0 0 1 20 6z" /><path d="m9 12 2 2 4-4" /></svg>,
    Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
  };

  return (
    <>
      <style>{`
        /* Glass card */
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.125);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.14);
          transform: translateY(-2px);
        }
        .header-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px 12px;
        }
      `}</style>
      <div className="relative w-full text-black font-primary">
        <div className="mx-auto flex max-w-7xl flex-col font-primary">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-3xl font-bold tracking-wide text-black">Review Queue</h1>
                <p className="text-sm text-black flex items-center gap-1.5 mt-1 font-medium">
                  <Icons.Search />
                  AI-flagged submissions requiring manual verification. Approve, reject, or modify points.
                </p>
              </div>
            </header>

            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-8">
              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-black rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.Audit />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Flagged Submissions</p>
                  <p className="text-2xl font-bold text-black">18</p>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-red-700 hover:text-red-800 rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.AlertCircle />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">High Priority</p>
                  <p className="text-2xl font-bold text-black">3</p>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-amber-700 hover:text-amber-800 rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.Clock />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Pending Review</p>
                  <p className="text-2xl font-bold text-black">12</p>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-green-700 hover:text-green-800 rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.CheckCircle />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Resolved Today</p>
                  <p className="text-2xl font-bold text-black">6</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="card !rounded-2xl p-6 mb-8">
              <h2 className="heading mb-4 text-lg font-bold text-black">
                Filters
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">All</option>
                    <option value="B.E - Computer Science and Engineering">CSE</option>
                    <option value="B.E - Mechanical Engineering">ME</option>
                    <option value="B.Tech - Information Technology">IT</option>
                    <option value="B.E - Electronics and Communication">ECE</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    Year
                  </label>
                  <select 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)} 
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">All</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    Activity Type
                  </label>
                  <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">All</option>
                    <option value="Hackathon Participation">Hackathon</option>
                    <option value="Workshop Attendance">Workshop</option>
                    <option value="Misconduct">Misconduct</option>
                    <option value="Duplicate">Duplicate</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    Priority
                  </label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    Status
                  </label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="clarification-requested">Clarification Requested</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/80">
                    AI Confidence
                  </label>
                  <select
                    value={confidenceRange}
                    onChange={(e) => setConfidenceRange(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  >
                    <option value="">Any</option>
                    <option value="0-50">0–50%</option>
                    <option value="51-70">51–70%</option>
                    <option value="71-90">71–90%</option>
                    <option value="91-100">91–100%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission list */}
            <section className="space-y-6">
              <h2 className="heading text-lg font-bold text-black border-b border-black/20 pb-2 mb-4">
                Submissions ({filtered.length})
              </h2>
              {isLoading ? (
                 <div className="flex justify-center py-20">
                   <div className="animate-spin w-8 h-8 border-4 border-primary rounded-full border-t-transparent" />
                 </div>
              ) : filtered.length === 0 ? (
                 <div className="card !rounded-2xl p-8 text-center text-black/50 border border-black/20">
                   <div className="flex flex-col items-center justify-center gap-3">
                     <Icons.Search />
                     <p>No submissions match the current filters.</p>
                   </div>
                 </div>
              ) : filtered.map((sub) => (
                <article
                  key={sub.id}
                  className="card overflow-hidden p-6 !rounded-2xl"
                >
                  {/* Card header: priority + status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge label={STATUS_LABEL[sub.status] || sub.status} variant={STATUS_BADGE[sub.status] || "pending"} />
                      <span className="text-sm font-semibold text-black/60 capitalize mx-2 opacity-80 decoration-slate-300">Submitted at {new Date(sub.submitted_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="grid gap-6 pt-4 md:grid-cols-2">
                    {/* Left: Student + Activity */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Student
                        </h3>
                        <p className="mt-1 font-medium text-black">
                          {sub.student.name} · {sub.student.reg_no}
                        </p>
                        <p className="text-sm text-black/80">
                          {sub.student.department}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Activity
                        </h3>
                        <p className="mt-1 font-medium text-black">{sub.activity.activity_name}</p>
                        <p className="mt-1 text-sm text-black/80">Default pts: {sub.activity.points_awarded}</p>
                      </div>
                    </div>

                    {/* Right: Evidence + AI */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Evidence
                        </h3>
                        <div className="mt-2 flex gap-2">
                          <a
                            href={sub.proof_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/40 hover:bg-white/80 text-black border border-black/20 rounded-xl text-xs font-medium transition-all shadow-[0_4px_20px_0_rgba(131,18,56,0.05)]"
                          >
                            <Icons.Eye />
                            View Document
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {sub.status === "MANUAL_REVIEW" && (
                    <>
                  {/* Editable points */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-black/10 pt-4">
                    <label className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black">Award Points:</span>
                      <input
                        type="number"
                        className="w-20 rounded-xl border border-black/20 bg-white/50 px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-black/20 transition-all font-medium"
                        placeholder={String(sub.activity.points_awarded)}
                        value={pointsEdit[sub.id] !== undefined ? pointsEdit[sub.id] : String(sub.activity.points_awarded)}
                        onChange={(e) => setPointsEdit((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                      />
                    </label>
                  </div>

                  {/* Faculty actions */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleReview(sub.id, "APPROVED", pointsEdit[sub.id] !== undefined ? pointsEdit[sub.id] : String(sub.activity.points_awarded))}
                      type="button"
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 shadow-sm transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(sub.id, "REJECTED", "0")}
                      type="button"
                      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 shadow-sm transition-colors"
                    >
                      Reject
                    </button>
                  </div>

                  {/* Comment / feedback */}
                  <div className="mt-4 bg-white/30 p-3 rounded-xl border border-black/5">
                    <label className="block text-xs font-bold uppercase text-black/50 mb-1.5">Comment / feedback (stored in DB)</label>
                    <textarea
                      className="w-full rounded-xl border border-black/20 bg-white/50 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black/20 transition-all"
                      rows={2}
                      placeholder="e.g. Certificate not valid / Event already claimed / Approved after verification"
                      value={comment[sub.id] ?? ""}
                      onChange={(e) => setComment((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                    />
                  </div>
                  </>
                  )}
                </article>
              ))}
            </section>
          </div>
        </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

type Priority = "high" | "medium" | "low";
type QueueStatus = "pending" | "approved" | "rejected" | "clarification-requested";

type Submission = {
  id: string;
  priority: Priority;
  status: QueueStatus;
  student: {
    name: string;
    registrationNumber: string;
    department: string;
    year: string;
    section: string;
    totalRewardPoints: number;
    totalPenaltyPoints: number;
    previousRejections: number;
  };
  activity: {
    type: string;
    title: string;
    description: string;
    eventDate: string;
  };
  evidence: {
    type: string;
    label: string;
    url: string;
  };
  ai: {
    confidenceScore: number;
    suggestedAction: string;
    suggestedPoints: number;
    flagReason: string;
  };
  facultyComment?: string;
  resolvedAt?: string;
  resolvedBy?: string;
};

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

const STATUS_LABEL: Record<QueueStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  "clarification-requested": "Clarification Requested"
};

const STATUS_BADGE: Record<QueueStatus, "pending" | "approved" | "rejected" | "clarification-requested"> = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  "clarification-requested": "clarification-requested"
};

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "1",
    priority: "high",
    status: "pending",
    student: {
      name: "Mahashaveena Sri",
      registrationNumber: "22CS045",
      department: "B.E - Computer Science and Engineering",
      year: "Year 3",
      section: "A",
      totalRewardPoints: 85,
      totalPenaltyPoints: 0,
      previousRejections: 1
    },
    activity: {
      type: "Hackathon Participation",
      title: "National Hackathon 2025",
      description: "Participated in 24-hour hackathon and submitted project.",
      eventDate: "2025-02-15"
    },
    evidence: { type: "Certificate PDF", label: "Certificate PDF", url: "#" },
    ai: {
      confidenceScore: 62,
      suggestedAction: "Needs Manual Review",
      suggestedPoints: 15,
      flagReason: "Name on certificate does not exactly match student record."
    }
  },
  {
    id: "2",
    priority: "medium",
    status: "pending",
    student: {
      name: "Rahul Kumar",
      registrationNumber: "23ME102",
      department: "B.E - Mechanical Engineering",
      year: "Year 2",
      section: "B",
      totalRewardPoints: 45,
      totalPenaltyPoints: 5,
      previousRejections: 0
    },
    activity: {
      type: "Workshop Attendance",
      title: "IoT Workshop",
      description: "Two-day workshop on IoT basics.",
      eventDate: "2025-03-01"
    },
    evidence: { type: "Screenshot", label: "Attendance screenshot", url: "#" },
    ai: {
      confidenceScore: 58,
      suggestedAction: "Needs Manual Review",
      suggestedPoints: 5,
      flagReason: "Low OCR confidence on uploaded certificate; blurry seal."
    }
  },
  {
    id: "3",
    priority: "high",
    status: "pending",
    student: {
      name: "Priya S",
      registrationNumber: "21IT089",
      department: "B.Tech - Information Technology",
      year: "Year 4",
      section: "A",
      totalRewardPoints: 120,
      totalPenaltyPoints: 10,
      previousRejections: 2
    },
    activity: {
      type: "Misconduct",
      title: "Late Assignment",
      description: "Repeated late submission reported by course instructor.",
      eventDate: "2025-03-05"
    },
    evidence: { type: "Document", label: "Instructor report", url: "#" },
    ai: {
      confidenceScore: 88,
      suggestedAction: "Suggest negative points",
      suggestedPoints: -20,
      flagReason: "Misconduct report; student has prior similar flags."
    }
  },
  {
    id: "4",
    priority: "low",
    status: "pending",
    student: {
      name: "Arun V",
      registrationNumber: "22EC034",
      department: "B.E - Electronics and Communication",
      year: "Year 3",
      section: "C",
      totalRewardPoints: 60,
      totalPenaltyPoints: 0,
      previousRejections: 0
    },
    activity: {
      type: "Duplicate",
      title: "Same certificate resubmitted",
      description: "Certificate for same event already claimed earlier.",
      eventDate: "2024-11-20"
    },
    evidence: { type: "Certificate PDF", label: "Certificate PDF", url: "#" },
    ai: {
      confidenceScore: 95,
      suggestedAction: "Reject – duplicate",
      suggestedPoints: 0,
      flagReason: "Duplicate certificate detected; student already claimed this activity."
    }
  }
];

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

  const filtered = MOCK_SUBMISSIONS.filter((s) => {
    if (department && s.student.department !== department) return false;
    if (year && s.student.year !== year) return false;
    if (activityType && s.activity.type !== activityType) return false;
    if (priority && s.priority !== priority) return false;
    if (status && s.status !== status) return false;
    if (confidenceRange) {
      const [min, max] = confidenceRange.split("-").map(Number);
      if (max) {
        if (s.ai.confidenceScore < min || s.ai.confidenceScore > max) return false;
      } else if (s.ai.confidenceScore < min) return false;
    }
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
              {filtered.map((sub) => (
                <article
                  key={sub.id}
                  className="card overflow-hidden p-6 !rounded-2xl"
                >
                  {/* Card header: priority + status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex h-3 w-3 rounded-full shadow-sm"
                        title={`Priority: ${PRIORITY_LABEL[sub.priority]}`}
                        style={{
                          backgroundColor:
                            sub.priority === "high"
                              ? "#dc2626"
                              : sub.priority === "medium"
                                ? "#eab308"
                                : "#22c55e"
                        }}
                      />
                      <Badge
                        label={PRIORITY_LABEL[sub.priority]}
                        variant={`priority-${sub.priority}` as "priority-high" | "priority-medium" | "priority-low"}
                      />
                      <Badge label={STATUS_LABEL[sub.status]} variant={STATUS_BADGE[sub.status]} />
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-black/70 hover:text-black hover:underline transition-colors flex items-center gap-1"
                      onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                    >
                      {expandedId === sub.id ? (
                        <>Collapse <Icons.ChevronUp /></>
                      ) : (
                        <>Student history &amp; more <Icons.ChevronDown /></>
                      )}
                    </button>
                  </div>

                  <div className="grid gap-6 pt-4 md:grid-cols-2">
                    {/* Left: Student + Activity */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Student
                        </h3>
                        <p className="mt-1 font-medium text-black">
                          {sub.student.name} · {sub.student.registrationNumber}
                        </p>
                        <p className="text-sm text-black/80">
                          {sub.student.department} · {sub.student.year} &amp; Sec {sub.student.section}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Activity
                        </h3>
                        <p className="mt-1 font-medium text-black">{sub.activity.type}</p>
                        <p className="text-sm font-semibold text-black/90">{sub.activity.title}</p>
                        <p className="mt-1 text-sm text-black/80">{sub.activity.description}</p>
                        <p className="mt-1 text-xs text-black/60">Event date: {sub.activity.eventDate}</p>
                      </div>
                    </div>

                    {/* Right: Evidence + AI */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          Evidence
                        </h3>
                        <p className="mt-1 text-sm text-black">{sub.evidence.label}</p>
                        <div className="mt-2 flex gap-2">
                          <a
                            href={sub.evidence.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/40 hover:bg-white/80 text-black border border-black/20 rounded-xl text-xs font-medium transition-all shadow-[0_4px_20px_0_rgba(131,18,56,0.05)]"
                          >
                            <Icons.Eye />
                            Preview
                          </a>
                          <a
                            href={sub.evidence.url}
                            download
                            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/40 hover:bg-white/80 text-black border border-black/20 rounded-xl text-xs font-medium transition-all shadow-[0_4px_20px_0_rgba(131,18,56,0.05)]"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">
                          AI Analysis
                        </h3>
                        <p className="mt-1 text-sm">
                          <span className="font-medium text-black">Confidence: </span>
                          <span
                            className={
                              sub.ai.confidenceScore < 50
                                ? "text-red-700 font-bold"
                                : sub.ai.confidenceScore < 70
                                  ? "text-amber-700 font-bold"
                                  : "text-green-700 font-bold"
                            }
                          >
                            {sub.ai.confidenceScore}%
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-black">
                          <span className="font-medium">Suggested action: </span>
                          {sub.ai.suggestedAction}
                        </p>
                        <p className="mt-1 text-sm text-black">
                          <span className="font-medium">Suggested points: </span>
                          <span className={sub.ai.suggestedPoints >= 0 ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                            {sub.ai.suggestedPoints >= 0 ? "+" : ""}
                            {sub.ai.suggestedPoints}
                          </span>
                        </p>
                        <p className="mt-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-2 text-xs text-amber-900 leading-relaxed font-medium">
                          <span className="font-bold text-amber-800">Flag reason: </span>
                          {sub.ai.flagReason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Editable points */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-black/10 pt-4">
                    <label className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black">Modify points:</span>
                      <input
                        type="number"
                        className="w-20 rounded-xl border border-black/20 bg-white/50 px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-black/20 transition-all font-medium"
                        placeholder={String(sub.ai.suggestedPoints)}
                        value={pointsEdit[sub.id] ?? ""}
                        onChange={(e) => setPointsEdit((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                      />
                    </label>
                  </div>

                  {/* Faculty actions */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 shadow-sm transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 shadow-sm transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-amber-500/50 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      Add negative points
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-black/20 bg-white/40 px-4 py-2 text-sm font-semibold text-black hover:bg-white/80 transition-colors"
                    >
                      Add comment
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

                  {/* Expandable: Student history */}
                  {expandedId === sub.id && (
                    <div className="mt-4 rounded-xl bg-white/40 border border-black/10 p-5 backdrop-blur-sm">
                      <h3 className="heading text-sm font-bold text-black border-b border-black/10 pb-2">
                        Student history
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-sm text-black/80 font-medium tracking-wide">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Total reward points: {sub.student.totalRewardPoints}</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Total penalty points: {sub.student.totalPenaltyPoints}</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Past rejected submissions: {sub.student.previousRejections}</li>
                      </ul>
                      <p className="mt-3 text-xs text-black/50 bg-white/50 p-2 rounded-lg border border-black/5 italic">
                        Faculty actions are logged (e.g. Faculty: Dr. Kumar, Action: Rejected, Reason: Duplicate
                        certificate, Time: 05 Mar 2026 21:10).
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </section>

            {filtered.length === 0 && (
               <div className="card !rounded-2xl p-8 text-center text-black/50 border border-black/20">
                 <div className="flex flex-col items-center justify-center gap-3">
                   <Icons.Search />
                   <p>No submissions match the current filters.</p>
                 </div>
               </div>
            )}
          </div>
        </div>
    </>
  );
}

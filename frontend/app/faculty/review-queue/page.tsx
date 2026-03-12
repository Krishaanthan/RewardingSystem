"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/ui/StatCard";
import { facultyNav } from "@/lib/nav";

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

  const fontPrimary = { fontFamily: "var(--font-primary), sans-serif" };
  const fontSecondary = { fontFamily: "var(--font-secondary), sans-serif" };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/assets/images/sist-admin-block.png")' }}
    >
      <div className="min-h-screen bg-black/40">
        <PortalLayout
          title="Review Queue"
          description="AI-flagged submissions requiring manual verification. Approve, reject, or modify points."
          navItems={facultyNav}
          transparentBackground
        >
          {/* Analytics */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Flagged Submissions" value="18" subtitle="Total in queue" />
            <StatCard title="High Priority" value="3" subtitle="Require urgent review" />
            <StatCard title="Pending Review" value="12" subtitle="Awaiting faculty" />
            <StatCard title="Resolved Today" value="6" subtitle="Approved or rejected" />
          </section>

          {/* Filters */}
          <section className="card mb-8">
            <h2 className="heading mb-4 text-lg" style={fontSecondary}>
              Filters
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  Department
                </label>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full"
                >
                  <option value="">All</option>
                  <option value="B.E - Computer Science and Engineering">CSE</option>
                  <option value="B.E - Mechanical Engineering">ME</option>
                  <option value="B.Tech - Information Technology">IT</option>
                  <option value="B.E - Electronics and Communication">ECE</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  Year
                </label>
                <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-full">
                  <option value="">All</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  Activity Type
                </label>
                <Select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full"
                >
                  <option value="">All</option>
                  <option value="Hackathon Participation">Hackathon</option>
                  <option value="Workshop Attendance">Workshop</option>
                  <option value="Misconduct">Misconduct</option>
                  <option value="Duplicate">Duplicate</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  Priority
                </label>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full">
                  <option value="">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  Status
                </label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full">
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="clarification-requested">Clarification Requested</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-brand-text/80" style={fontPrimary}>
                  AI Confidence
                </label>
                <Select
                  value={confidenceRange}
                  onChange={(e) => setConfidenceRange(e.target.value)}
                  className="w-full"
                >
                  <option value="">Any</option>
                  <option value="0-50">0–50%</option>
                  <option value="51-70">51–70%</option>
                  <option value="71-90">71–90%</option>
                  <option value="91-100">91–100%</option>
                </Select>
              </div>
            </div>
          </section>

          {/* Submission list */}
          <section className="space-y-6">
            <h2 className="heading text-lg" style={fontSecondary}>
              Submissions ({filtered.length})
            </h2>
            {filtered.map((sub) => (
              <article
                key={sub.id}
                className="card overflow-hidden"
                style={fontPrimary}
              >
                {/* Card header: priority + status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-tertiary/50 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
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
                    className="text-sm font-medium text-brand-primary hover:underline"
                    style={fontSecondary}
                    onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                  >
                    {expandedId === sub.id ? "Collapse" : "Student history & more"}
                  </button>
                </div>

                <div className="grid gap-6 pt-4 md:grid-cols-2">
                  {/* Left: Student + Activity */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text/70">
                        Student
                      </h3>
                      <p className="mt-1 font-medium text-brand-text">
                        {sub.student.name} · {sub.student.registrationNumber}
                      </p>
                      <p className="text-sm text-brand-text/80">
                        {sub.student.department} · {sub.student.year} &amp; Sec {sub.student.section}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text/70">
                        Activity
                      </h3>
                      <p className="mt-1 font-medium text-brand-text">{sub.activity.type}</p>
                      <p className="text-sm font-medium text-brand-primary">{sub.activity.title}</p>
                      <p className="mt-1 text-sm text-brand-text/80">{sub.activity.description}</p>
                      <p className="mt-1 text-xs text-brand-text/70">Event date: {sub.activity.eventDate}</p>
                    </div>
                  </div>

                  {/* Right: Evidence + AI */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text/70">
                        Evidence
                      </h3>
                      <p className="mt-1 text-sm text-brand-text">{sub.evidence.label}</p>
                      <div className="mt-2 flex gap-2">
                        <a
                          href={sub.evidence.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-brand-primary/30 px-3 py-1.5 text-xs font-medium text-brand-primary hover:bg-brand-primary/10"
                        >
                          Preview
                        </a>
                        <a
                          href={sub.evidence.url}
                          download
                          className="rounded-lg border border-brand-primary/30 px-3 py-1.5 text-xs font-medium text-brand-primary hover:bg-brand-primary/10"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text/70">
                        AI Analysis
                      </h3>
                      <p className="mt-1 text-sm">
                        <span className="font-medium text-brand-text">Confidence: </span>
                        <span
                          className={
                            sub.ai.confidenceScore < 50
                              ? "text-red-600"
                              : sub.ai.confidenceScore < 70
                                ? "text-amber-600"
                                : "text-green-600"
                          }
                        >
                          {sub.ai.confidenceScore}%
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-brand-text">
                        <span className="font-medium">Suggested action: </span>
                        {sub.ai.suggestedAction}
                      </p>
                      <p className="mt-1 text-sm text-brand-text">
                        <span className="font-medium">Suggested points: </span>
                        <span className={sub.ai.suggestedPoints >= 0 ? "text-green-600" : "text-red-600"}>
                          {sub.ai.suggestedPoints >= 0 ? "+" : ""}
                          {sub.ai.suggestedPoints}
                        </span>
                      </p>
                      <p className="mt-2 rounded bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
                        <span className="font-medium">Flag reason: </span>
                        {sub.ai.flagReason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editable points */}
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-brand-tertiary/50 pt-4">
                  <label className="flex items-center gap-2">
                    <span className="text-sm font-medium text-brand-text">Modify points:</span>
                    <input
                      type="number"
                      className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      placeholder={String(sub.ai.suggestedPoints)}
                      value={pointsEdit[sub.id] ?? ""}
                      onChange={(e) => setPointsEdit((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                    />
                  </label>
                </div>

                {/* Faculty actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-amber-500 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100"
                  >
                    Add negative points
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-brand-primary bg-white px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
                  >
                    Add comment
                  </button>
                </div>

                {/* Comment / feedback */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-brand-text/80">Comment / feedback (stored in DB)</label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    rows={2}
                    placeholder="e.g. Certificate not valid / Event already claimed / Approved after verification"
                    value={comment[sub.id] ?? ""}
                    onChange={(e) => setComment((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                  />
                </div>

                {/* Expandable: Student history */}
                {expandedId === sub.id && (
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <h3 className="heading text-sm" style={fontSecondary}>
                      Student history
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-brand-text/80">
                      <li>Total reward points: {sub.student.totalRewardPoints}</li>
                      <li>Total penalty points: {sub.student.totalPenaltyPoints}</li>
                      <li>Past rejected submissions: {sub.student.previousRejections}</li>
                    </ul>
                    <p className="mt-2 text-xs text-brand-text/70">
                      Faculty actions are logged (e.g. Faculty: Dr. Kumar, Action: Rejected, Reason: Duplicate
                      certificate, Time: 05 Mar 2026 21:10).
                    </p>
                  </div>
                )}
              </article>
            ))}
          </section>

          {filtered.length === 0 && (
            <p className="card text-center text-brand-text/80" style={fontPrimary}>
              No submissions match the current filters.
            </p>
          )}
        </PortalLayout>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  type LeaderboardStudent,
  type LeaderboardResponse,
  type Trend,
  MAX_POINTS,
  fetchLeaderboard,
} from "@/lib/leaderboard";

// ---------------------------------------------------------------------------
// Department reference data (Sathyabama programmes)
// ---------------------------------------------------------------------------

const DEPARTMENTS_WITH_DURATION: Array<{ label: string; duration: number }> = [
  { label: "B.E. Computer Science and Engineering", duration: 4 },
  { label: "B.E. CSE (AI)", duration: 4 },
  { label: "B.E. CSE (Data Science)", duration: 4 },
  { label: "B.E. CSE (IoT)", duration: 4 },
  { label: "B.E. CSE (AI & Robotics)", duration: 4 },
  { label: "B.E. CSE (AI & ML)", duration: 4 },
  { label: "B.E. CSE (Cyber Security)", duration: 4 },
  { label: "B.Tech AI and Data Science", duration: 4 },
  { label: "B.E. Computer Science and Business Systems", duration: 4 },
  { label: "B.E. Electrical and Electronics", duration: 4 },
  { label: "B.E. Electronics and Communication", duration: 4 },
  { label: "B.E. ECE (Data Science)", duration: 4 },
  { label: "B.E. Mechanical Engineering", duration: 4 },
  { label: "B.E. Mechatronics", duration: 4 },
  { label: "B.E. Aeronautical Engineering", duration: 4 },
  { label: "B.E. Civil Engineering", duration: 4 },
  { label: "B.Tech Information Technology", duration: 4 },
  { label: "B.Tech Chemical Engineering", duration: 4 },
  { label: "B.Tech Biotechnology", duration: 4 },
  { label: "B.Tech Biomedical Engineering", duration: 4 },
  { label: "B.Des. Design", duration: 4 },
  { label: "B.E. Electronics and Instrumentation", duration: 4 },
  { label: "B.E. Automobile Engineering", duration: 4 },
  { label: "B.Arch.", duration: 5 },
  { label: "B.Pharm. Pharmacy", duration: 4 },
  { label: "Pharm.D Doctor of Pharmacy", duration: 6 },
  { label: "B.Sc. Nursing", duration: 4 },
  { label: "B.P.T. Physiotherapy", duration: 4 },
  { label: "B.D.S. Bachelor of Dental Surgery", duration: 5 },
  { label: "B.A. LL.B. (Hons.)", duration: 5 },
  { label: "B.B.A. LL.B. (Hons.)", duration: 5 },
  { label: "B.Com. LL.B. (Hons.)", duration: 5 },
  { label: "LL.B.", duration: 3 },
  { label: "B.B.A.", duration: 3 },
  { label: "B.Com.", duration: 3 },
  { label: "B.Com. Financial Accounting", duration: 3 },
  { label: "B.Sc. Visual Communication", duration: 3 },
  { label: "B.Sc. Physics", duration: 3 },
  { label: "B.Sc. Chemistry", duration: 3 },
  { label: "B.Sc. Computer Science", duration: 3 },
  { label: "B.Sc. Mathematics", duration: 3 },
  { label: "B.Sc. Biochemistry", duration: 3 },
  { label: "B.Sc. Fashion Design", duration: 3 },
  { label: "B.Sc. Biotechnology", duration: 3 },
  { label: "B.Sc. Microbiology", duration: 3 },
  { label: "B.Sc. Psychology", duration: 3 },
  { label: "B.A. English", duration: 3 },
  { label: "B.Sc. Bioinformatics and Data Science", duration: 3 },
  { label: "B.Sc. Clinical Nutrition and Dietetics", duration: 3 },
  { label: "B.Sc. Medical Lab Technology", duration: 3 },
  { label: "B.Sc. Computer Science (AI)", duration: 3 },
  { label: "B.Sc. Data Science", duration: 3 },
  { label: "B.Sc. Information Technology", duration: 3 },
  { label: "B.C.A.", duration: 3 },
  { label: "B.Sc. Forensic Science", duration: 3 },
  { label: "B.Sc. Aviation", duration: 3 },
  { label: "B.Sc. Radiology and Imaging Technology", duration: 3 },
  { label: "B.A. Tamil", duration: 3 },
  { label: "B.Sc. B.Ed. (ITEP)", duration: 4 },
  { label: "B.A. B.Ed. (ITEP)", duration: 4 },
];

function getYearOptionsForDepartment(departmentLabel: string): string[] {
  if (departmentLabel === "All Departments") {
    const maxDuration = Math.max(
      ...DEPARTMENTS_WITH_DURATION.map((d) => d.duration)
    );
    return [
      "All Years",
      ...Array.from({ length: maxDuration }, (_, i) => String(i + 1)),
    ];
  }
  const dept = DEPARTMENTS_WITH_DURATION.find(
    (d) => d.label === departmentLabel
  );
  if (!dept) return ["All Years", "1", "2", "3", "4"];
  return [
    "All Years",
    ...Array.from({ length: dept.duration }, (_, i) => String(i + 1)),
  ];
}

// ---------------------------------------------------------------------------
// Colour tokens
// ---------------------------------------------------------------------------

const MAROON = "#831238";
const PROGRESS_BAR_FILL = MAROON;

function clampPct(value: number) {
  return Math.max(0, Math.min(100, value));
}

// ---------------------------------------------------------------------------
// Small UI helpers
// ---------------------------------------------------------------------------

function trendBadge(trend: Trend) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <span aria-hidden>&#9650;</span>
        <span>UP</span>
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
        <span aria-hidden>&#9660;</span>
        <span>DOWN</span>
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold text-black/70">&mdash;</span>
  );
}

function StudentAvatar({
  student,
  size = "md",
}: {
  student: LeaderboardStudent;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg" ? "w-24 h-24" : size === "md" ? "w-20 h-20" : "w-10 h-10";
  const textSize =
    size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-xs";
  const border =
    size === "lg" ? "border-4" : size === "md" ? "border-4" : "border";

  if (student.avatarUrl) {
    return (
      <div
        className={`${dim} rounded-full ${border} border-white overflow-hidden bg-[#f5f5f5] shadow-sm`}
      >
        <img
          src={student.avatarUrl}
          alt={student.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const isSmall = size === "sm";
  return (
    <div
      className={`${dim} rounded-full ${border} ${isSmall ? "border-black/20 bg-white/60 text-black" : "border-white/30 bg-white/15 text-white"} grid place-items-center ${textSize} font-black tracking-wide`}
    >
      {student.initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CrownIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 9l3.2 3L12 6l4.8 6L20 9l-1.2 11H5.2L4 9Z"
        fill="#f4c542"
        stroke="#b8870a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 20h9"
        stroke="#b8870a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SilverCrownIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 9l3 3 3-6 3 6 3-3 1 11H3L4 9Z"
        fill="#e5e7eb"
        stroke="#9ca3af"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 20h9"
        stroke="#9ca3af"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BronzeCrownIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 9l3 3 3-6 3 6 3-3 1 11H3L4 9Z"
        fill="#f97316"
        stroke="#c05621"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 20h9"
        stroke="#c05621"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Filter / control components
// ---------------------------------------------------------------------------

function SegmentedTabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex rounded-md bg-white/20 backdrop-blur-sm p-1 border border-white/20">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-md px-3 py-1.5 text-xs font-semibold transition",
              active
                ? "bg-white text-black shadow-sm font-bold"
                : "text-white/80 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SelectPill({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase ml-1">
        {label}
      </span>
      <label className="relative inline-flex items-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:border-white/30 focus-within:ring-2 focus-within:ring-white/50 focus-within:border-white w-full sm:w-auto">
        <select
          className="w-full appearance-none bg-transparent text-white pl-4 pr-10 py-2.5 text-sm font-semibold outline-none cursor-pointer [&>option]:text-black"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </label>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex w-full max-w-md items-stretch overflow-hidden rounded-md bg-[#f5f5f5]">
      <div className="grid place-items-center pl-4 text-black/70" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16.5 16.5 21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search students or departments..."
        className="w-full bg-transparent px-3 py-2 text-sm text-black outline-none placeholder:text-black/50"
      />
      <button
        type="button"
        className="shrink-0 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
        style={{ backgroundColor: MAROON }}
      >
        Search
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Podium card
// ---------------------------------------------------------------------------

function PodiumCard({
  student,
  place,
}: {
  student: LeaderboardStudent;
  place: 1 | 2 | 3;
}) {
  const isGold = place === 1;
  const Crown =
    place === 1 ? CrownIcon : place === 2 ? SilverCrownIcon : BronzeCrownIcon;

  return (
    <div
      className={[
        "relative rounded-2xl podium-card",
        isGold
          ? "bg-white/15 backdrop-blur-md border border-white/25 p-4 pt-8 pb-6 shadow-2xl"
          : "bg-white/10 backdrop-blur-md border border-white/15 p-3 pt-6 pb-5",
      ].join(" ")}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${
          isGold ? "-top-5" : "-top-4"
        }`}
      >
        <Crown />
      </div>

      <div className="flex flex-col items-center">
        <StudentAvatar student={student} size={isGold ? "lg" : "md"} />

        <div
          className={`font-bold mt-2 text-center ${
            isGold ? "text-xl text-white" : "text-base text-white"
          }`}
        >
          {student.name}
        </div>

        <div
          className="text-[10px] uppercase font-bold tracking-widest text-center mt-0.5 text-white/50"
        >
          {student.department} &middot; Year {student.yearOfStudy}
        </div>

        <div
          className={`font-black text-center mt-3 ${
            isGold
              ? "text-3xl text-white tracking-tight"
              : "text-2xl text-white"
          }`}
        >
          {isGold ? (
            <span className="bg-black/20 rounded-full px-5 py-2 inline-flex items-baseline gap-1">
              {student.points.toLocaleString()}{" "}
              <span className="text-sm font-bold tracking-widest">PTS</span>
            </span>
          ) : (
            <>
              {student.points.toLocaleString()}{" "}
              <span className="text-[11px] font-bold tracking-widest text-white/40">
                PTS
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading spinner
// ---------------------------------------------------------------------------

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#831238] border-t-transparent mx-auto" />
        <p className="mt-4 text-sm font-bold text-black/50">
          Loading leaderboard...
        </p>
      </div>
    </div>
  );
}

// ===========================================================================
// Main component
// ===========================================================================

export function UniversityLeaderboard() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [timeRange, setTimeRange] = useState<"all" | "month">("all");
  const [department, setDepartment] = useState("All Departments");
  const [year, setYear] = useState("All Years");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(7);

  // Load data (re-fetch when timeRange changes)
  useEffect(() => {
    setLoading(true);
    fetchLeaderboard({ timeRange }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [timeRange]);

  const allStudents = data?.students ?? [];
  const currentUser = data?.currentUser ?? null;

  const departmentOptions = useMemo(
    () => [
      "All Departments",
      ...DEPARTMENTS_WITH_DURATION.map((d) => d.label),
    ],
    []
  );

  const yearOptions = useMemo(
    () => getYearOptionsForDepartment(department),
    [department]
  );

  const setDepartmentAndResetYear = (value: string) => {
    setDepartment(value);
    const nextYears = getYearOptionsForDepartment(value);
    setYear((prev) => (nextYears.includes(prev) ? prev : "All Years"));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allStudents.filter((s) => {
      const deptOk =
        department === "All Departments" ||
        s.departmentLabel === department;
      const yearOk =
        year === "All Years" || s.yearOfStudy === parseInt(year);
      const queryOk =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.departmentLabel.toLowerCase().includes(q);
      return deptOk && yearOk && queryOk;
    });
  }, [allStudents, department, year, query]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(7);
  }, [department, year, query]);

  const podiumStudents = filtered.slice(0, 3);
  const tableStudents = filtered.slice(3);
  const displayedRows = tableStudents.slice(0, visibleCount);
  const hasMore = visibleCount < tableStudents.length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
      <style>{`
        .podium-card {
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .podium-card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.45);
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>

      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
        <main className="mx-auto px-4 pb-8 pt-20 font-primary">
          {/* Podium */}
          <section className="mt-6 max-w-[1400px] mx-auto">
              {podiumStudents.length > 0 && (
                <div
                  className="px-5 sm:px-8 pt-7 pb-7 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "#5E0D28",
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0px, transparent 26px, rgba(0,0,0,0.22) 26px, rgba(0,0,0,0.22) 34px)",
                    boxShadow: "0 10px 44px rgba(60,8,26,0.40)",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 18% 60%, rgba(131,18,56,0.55) 0%, transparent 60%)" }} />

                  {/* Heading + Filters */}
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-1.5 font-primary">
                        University Leaderboard
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight font-secondary tracking-wide">
                        Student Innovation Challenge 2026
                      </h2>
                      {data && (
                        <p className="mt-1 text-xs text-white/40">
                          {data.totalStudents.toLocaleString()} students
                          &middot; Updated{" "}
                          {new Date(data.lastUpdated).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <SegmentedTabs
                        value={timeRange}
                        onChange={(v) =>
                          setTimeRange(v as "all" | "month")
                        }
                        options={[
                          { value: "all", label: "ALL TIME" },
                          { value: "month", label: "THIS MONTH" },
                        ]}
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <SelectPill
                          label="DEPARTMENT"
                          value={department}
                          onChange={setDepartmentAndResetYear}
                          options={departmentOptions}
                        />
                        <SelectPill
                          label="YEAR"
                          value={year}
                          onChange={setYear}
                          options={yearOptions}
                        />
                      </div>
                    </div>
                  </div>
                <div className="relative z-10 mt-4 grid gap-4 md:grid-cols-3">
                  {/* Silver - 2nd */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:order-1 md:self-end"
                  >
                    {podiumStudents[1] && (
                      <PodiumCard
                        student={podiumStudents[1]}
                        place={2}
                      />
                    )}
                  </motion.div>

                  {/* Gold - 1st */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="md:order-2"
                  >
                    {podiumStudents[0] && (
                      <PodiumCard
                        student={podiumStudents[0]}
                        place={1}
                      />
                    )}
                  </motion.div>

                  {/* Bronze - 3rd */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="md:order-3 md:self-end"
                  >
                    {podiumStudents[2] && (
                      <PodiumCard
                        student={podiumStudents[2]}
                        place={3}
                      />
                    )}
                  </motion.div>
                </div>
                </div>
              )}
          </section>

          {/* Table */}
          <section className="mt-8 pt-10 max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-black/70">
                  List view
                </div>
                <div className="mt-2 text-xl font-semibold text-black">
                  Top contributors
                </div>
              </div>
              <SearchBar value={query} onChange={setQuery} />
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-black/70">
                    <th className="py-3 pr-4">Rank</th>
                    <th className="py-3 pr-4">User</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Progress</th>
                    <th className="py-3 pr-4">Tasks Completed</th>
                    <th className="py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRows.map((s, index) => {
                    const rank = index + 4;
                    const progressPct = clampPct(
                      Math.round((s.points / MAX_POINTS) * 100)
                    );

                    return (
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.4 + 0.05 * Math.min(index, 10),
                        }}
                        key={s.id}
                        className="border-b border-black/10 last:border-none hover:bg-black/5 transition-colors"
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-black/50">
                              #{rank.toString().padStart(2, "0")}
                            </span>
                            {trendBadge(s.trend)}
                          </div>
                        </td>

                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <StudentAvatar student={s} size="sm" />
                            <div>
                              <div className="text-sm font-bold text-black">
                                {s.name}
                              </div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                                {s.department} &middot; Year{" "}
                                {s.yearOfStudy}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 pr-4">
                          <span className="text-base font-black text-[#831238]">
                            {s.points.toLocaleString()}{" "}
                            <span className="text-[10px] text-black/40 tracking-widest font-bold">
                              PTS
                            </span>
                          </span>
                        </td>

                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="h-2.5 w-40 overflow-hidden rounded-full bg-[#f5f5f5]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${progressPct}%`,
                                  }}
                                  transition={{
                                    delay: 0.8,
                                    duration: 1,
                                  }}
                                  className="h-full"
                                  style={{
                                    backgroundColor:
                                      PROGRESS_BAR_FILL,
                                  }}
                                />
                              </div>
                              <div className="text-[10px] font-bold mt-1.5 uppercase text-black">
                                {progressPct}% complete
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 pr-4">
                          <span className="text-sm font-bold text-black/80">
                            {s.tasksCompleted}/{s.totalTasks}
                          </span>
                        </td>

                        <td className="py-3 text-right">
                          <button
                            type="button"
                            className="rounded-full px-4 py-2 text-xs font-bold text-white hover:brightness-110 hover:scale-[1.05] transition-transform"
                            style={{ backgroundColor: MAROON }}
                          >
                            View
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-sm font-semibold text-black/70"
                      >
                        No matches. Try a different search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12 mb-32">
              <button
                onClick={() => setVisibleCount((c) => c + 10)}
                className="px-6 py-2.5 rounded-lg border-2 border-[#831238] text-[#831238] font-bold hover:bg-[#831238] hover:text-white transition"
              >
                Load More Rankings
              </button>
            </div>
          )}

          {!hasMore && filtered.length > 3 && (
            <div className="flex justify-center mt-12 mb-32">
              <p className="text-sm text-black/40 font-semibold">
                Showing all {filtered.length} results
              </p>
            </div>
          )}
        </main>

        {/* Footer - current user stats */}
        {currentUser && (
          <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div
              className="rounded-2xl px-6 py-4 flex justify-between items-center text-white shadow-2xl"
              style={{ backgroundColor: MAROON }}
            >
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    MY RANK
                  </span>
                  <span className="text-2xl font-black text-white">
                    #{currentUser.rank}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    SCORE
                  </span>
                  <span className="text-xl font-black text-white">
                    {currentUser.points.toLocaleString()}{" "}
                    <span className="text-xs text-white/50">
                      PTS
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    PROGRESS
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/20 rounded-full">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{
                          width: `${currentUser.progressPct}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold">
                      {currentUser.progressPct}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] tracking-widest font-bold text-white/60 uppercase">
                    ACTIVE PROFILE
                  </span>
                  <span className="font-bold">
                    {currentUser.name}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 grid place-items-center text-sm font-bold">
                  {currentUser.initials}
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Trend = "up" | "down" | "same";

type LeaderRow = {
  rank: number;
  trend: Trend;
  user: {
    name: string;
    dept: string;
    departmentLabel: string;
    year: string;
    yearOfStudy: number;
    initials: string;
  };
  active: boolean;
  scorePts: number;
  progressPct: number;
  taskcompleted: {
    tasks: number;
  };
};

/** Departments from Sathyabama programs-offered (https://www.sathyabama.ac.in/admissions/programs-offered). duration = programme length in years. */
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
  { label: "B.A. B.Ed. (ITEP)", duration: 4 }
];

/** Year dropdown next to department: 1–4 (year of study) and All Years. */
const YEAR_OPTIONS = ["All Years", "1", "2", "3", "4"];

function getYearOptionsForDepartment(_departmentLabel: string): string[] {
  return YEAR_OPTIONS;
}

const MAROON = "#81113b";
const MAROON_DARK = "#5f0e2b";
/** Primary header background (user primary #81113b) */
const HEADER_BG = "#81113b";
/** Progress bar fill colour per student points */
const PROGRESS_BAR_FILL = "#625864";
/** Max points used to compute progress % (progress = scorePts / MAX_POINTS_FOR_PROGRESS * 100) */
const MAX_POINTS_FOR_PROGRESS = 4000;

function clampPct(value: number) {
  return Math.max(0, Math.min(100, value));
}

function trendBadge(trend: Trend) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
        <span aria-hidden>▲</span>
        <span>UP</span>
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700">
        <span aria-hidden>▼</span>
        <span>DOWN</span>
      </span>
    );
  }

  return <span className="text-xs font-semibold text-neutral-500">—</span>;
}

function InitialAvatar({ initials }: { initials: string }) {
  return (
    <div className="grid size-10 place-items-center rounded-full bg-white/90 text-xs font-black tracking-wide text-neutral-800 ring-1 ring-black/5">
      {initials}
    </div>
  );
}

function MedalIcon({ tone }: { tone: "silver" | "gold" | "bronze" }) {
  const fill =
    tone === "gold" ? "#f4c542" : tone === "silver" ? "#cbd5e1" : "#d68a4a";
  const stroke = tone === "gold" ? "#b8870a" : tone === "silver" ? "#94a3b8" : "#8a4d1f";

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M9.2 2.8h3.8L14 6.6l1-3.8h3.8L16.9 10H11L9.2 2.8Z"
        fill={stroke}
        opacity="0.9"
      />
      <path
        d="M18.8 2.8h-3.8L14 6.6l-1-3.8H9.2L11 10h5.9l1.9-7.2Z"
        fill={stroke}
        opacity="0.55"
      />
      <circle cx="14" cy="18" r="7.5" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <path
        d="M14 13.8l1.2 2.5 2.8.4-2 2 0.5 2.8-2.5-1.3-2.5 1.3 0.5-2.8-2-2 2.8-.4 1.2-2.5Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9l3 3 3-6 3 6 3-3 1 11H3L4 9Z"
        fill="#e5e7eb"
        stroke="#9ca3af"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M7.5 20h9" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function BronzeCrownIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9l3 3 3-6 3 6 3-3 1 11H3L4 9Z"
        fill="#f97316"
        stroke="#c05621"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M7.5 20h9" stroke="#c05621" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function SegmentedTabs({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex rounded-full bg-neutral-100 p-1 ring-1 ring-black/5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              active ? "bg-[#81113b] text-black shadow-sm" : "text-neutral-400 hover:bg-white hover:text-neutral-500"
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
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
      <span className="tracking-wide text-neutral-500">{label}</span>
      <select
        className="bg-transparent text-neutral-900 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchButton({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex w-full max-w-md items-stretch overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid place-items-center pl-4 text-neutral-500" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search students or projects…"
        className="w-full bg-transparent px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
      />
      <button
        type="button"
        className="shrink-0 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
        style={{ backgroundColor: MAROON }}
      >
        Search students
      </button>
    </div>
  );
}

export function UniversityLeaderboard() {
  const [timeRange, setTimeRange] = useState<"all" | "month">("all");
  const [department, setDepartment] = useState("All Departments");
  const [year, setYear] = useState("All Years");
  const [query, setQuery] = useState("");

  const departmentOptions = useMemo(
    () => ["All Departments", ...DEPARTMENTS_WITH_DURATION.map((d) => d.label)],
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

  const rows: LeaderRow[] = useMemo(() => {
    const raw = [
      { rank: 4, trend: "up" as Trend, name: "Rahul Gupta", dept: "CSE", departmentLabel: "B.E. Computer Science and Engineering", year: "2024", initials: "RG", active: true, scorePts: 2650, tasks: 14 },
      { rank: 5, trend: "down" as Trend, name: "Fatima Khan", dept: "ECE", departmentLabel: "B.E. Electronics and Communication", year: "2025", initials: "FK", active: true, scorePts: 2590, tasks: 13 },
      { rank: 6, trend: "up" as Trend, name: "Karthik R", dept: "Civil", departmentLabel: "B.E. Civil Engineering", year: "2024", initials: "KR", active: true, scorePts: 2480, tasks: 12 },
      { rank: 7, trend: "down" as Trend, name: "Sneha Rao", dept: "Math", departmentLabel: "B.Sc. Mathematics", year: "2026", initials: "SR", active: true, scorePts: 2410, tasks: 11 },
      { rank: 8, trend: "up" as Trend, name: "Arjun V", dept: "Physics", departmentLabel: "B.Sc. Physics", year: "2025", initials: "AV", active: true, scorePts: 2350, tasks: 10 },
      { rank: 9, trend: "same" as Trend, name: "Meera Iyer", dept: "CSE", departmentLabel: "B.E. Computer Science and Engineering", year: "2026", initials: "MI", active: true, scorePts: 2280, tasks: 12 },
      { rank: 10, trend: "up" as Trend, name: "Varun Reddy", dept: "Mech", departmentLabel: "B.E. Mechanical Engineering", year: "2024", initials: "VR", active: true, scorePts: 2210, tasks: 11 },
      { rank: 11, trend: "down" as Trend, name: "Ananya Nair", dept: "Biotech", departmentLabel: "B.Tech Biotechnology", year: "2025", initials: "AN", active: true, scorePts: 2150, tasks: 10 },
      { rank: 12, trend: "up" as Trend, name: "Aditya Joshi", dept: "ECE", departmentLabel: "B.E. Electronics and Communication", year: "2027", initials: "AJ", active: true, scorePts: 2080, tasks: 9 },
      { rank: 13, trend: "same" as Trend, name: "Kavya Menon", dept: "B.Com", departmentLabel: "B.Com.", year: "2025", initials: "KM", active: true, scorePts: 1990, tasks: 9 },
      { rank: 14, trend: "down" as Trend, name: "Rohan Verma", dept: "IT", departmentLabel: "B.Tech Information Technology", year: "2024", initials: "RV", active: true, scorePts: 1920, tasks: 8 },
      { rank: 15, trend: "up" as Trend, name: "Divya S", dept: "BBA", departmentLabel: "B.B.A.", year: "2026", initials: "DS", active: true, scorePts: 1850, tasks: 8 },
      { rank: 16, trend: "up" as Trend, name: "Siddharth K", dept: "Chemical", departmentLabel: "B.Tech Chemical Engineering", year: "2025", initials: "SK", active: true, scorePts: 1780, tasks: 7 },
      { rank: 17, trend: "down" as Trend, name: "Neha Patel", dept: "Pharm", departmentLabel: "B.Pharm. Pharmacy", year: "2024", initials: "NP", active: true, scorePts: 1710, tasks: 7 },
      { rank: 18, trend: "same" as Trend, name: "Vikram C", dept: "Aero", departmentLabel: "B.E. Aeronautical Engineering", year: "2026", initials: "VC", active: true, scorePts: 1640, tasks: 6 },
      { rank: 19, trend: "up" as Trend, name: "Pooja R", dept: "B.Arch", departmentLabel: "B.Arch.", year: "2025", initials: "PR", active: true, scorePts: 1580, tasks: 6 },
      { rank: 20, trend: "down" as Trend, name: "Rahul M", dept: "BCA", departmentLabel: "B.C.A.", year: "2026", initials: "RM", active: true, scorePts: 1510, tasks: 5 }
    ];
    return raw.map((r) => ({
      rank: r.rank,
      trend: r.trend,
      user: {
        name: r.name,
        dept: r.dept,
        departmentLabel: r.departmentLabel,
        year: r.year,
        yearOfStudy: parseInt(r.year) || new Date().getFullYear(),
        initials: r.initials
      },
      active: r.active,
      scorePts: r.scorePts,
      progressPct: Math.round((r.scorePts / MAX_POINTS_FOR_PROGRESS) * 100),
      taskcompleted: { tasks: r.tasks }
    }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      const deptOk = department === "All Departments" ? true : r.user.departmentLabel === department;
      const yearOk = year === "All Years" ? true : r.user.year === year;
      const queryOk =
        q.length === 0 ||
        r.user.name.toLowerCase().includes(q) ||
        r.user.dept.toLowerCase().includes(q) ||
        r.user.departmentLabel.toLowerCase().includes(q) ||
        r.user.year.toLowerCase().includes(q);

      const timeOk = timeRange === "all" ? true : r.rank % 2 === 0;

      return deptOk && yearOk && queryOk && timeOk;
    });
  }, [department, query, rows, timeRange, year]);

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

      {/* Dark overlay to ensure text readability against the red video */}
      <div className="absolute inset-0 z-0 bg-black/30 bg-gradient-to-b from-black/40 via-transparent to-black/40 mix-blend-multiply pointer-events-none" />

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <a
              href="https://www.sathyabama.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
              aria-label="Sathyabama University"
            >
              <img
                src="/sathyabama-logo.png"
                alt="Sathyabama University"
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white/90">Sathyabama</div>
                <div className="text-xs font-semibold text-white/70">University</div>
              </div>
            </a>

            <div className="hidden items-center gap-6 text-sm font-semibold text-white/85 md:flex">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>
              <Link href="/leaderboard" className="text-white">
                Leaderboard
              </Link>
              <Link href="/community" className="hover:text-white">
                Community
              </Link>
              <Link href="/profile" className="hover:text-white">
                Profile
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/submit-project"
                className="rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-neutral-900 shadow-sm ring-1 ring-black/5 hover:bg-white/95"
              >
                SUBMIT PROJECT
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          <section
            className="mt-6 overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)]"
          >
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
                    University Leaderboard
                  </p>
                  <h1 className="mt-2 text-balance text-2xl font-semibold text-white sm:text-3xl">
                    Student Innovation Challenge 2026
                  </h1>
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <SegmentedTabs
                    value={timeRange}
                    onChange={(v) => setTimeRange(v as "all" | "month")}
                    options={[
                      { value: "all", label: "ALL TIME" },
                      { value: "month", label: "THIS MONTH" }
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

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="md:order-1 md:self-end">
                  <div className="relative rounded-3xl border border-white/25 bg-white/15 p-5 pt-7 backdrop-blur-md">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <SilverCrownIcon />
                    </div>
                    <div className="flex items-center justify-between">
                      <MedalIcon tone="silver" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/75">2nd place</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="grid size-12 place-items-center rounded-full bg-white/20 ring-1 ring-white/25">
                        <span className="text-sm font-black text-white">VS</span>
                      </div>
                      <div>
                        <div className="text-base font-semibold text-white">Vikram Singh</div>
                        <div className="text-xs font-semibold text-white/70">(Mechanical Eng, 2025)</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-semibold text-white">2,950 pts</div>
                      <div className="mt-1 text-xs font-semibold text-white/70">
                        16 Tasks Completed · Silver Badge
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:order-2">
                  <div className="relative rounded-3xl border border-white/30 bg-white/18 p-6 pt-8 backdrop-blur-md shadow-2xl">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <CrownIcon />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <MedalIcon tone="gold" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/75">1st place</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="grid size-14 place-items-center rounded-full bg-white/20 ring-1 ring-white/25">
                        <span className="text-sm font-black text-white">PS</span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">Priya Sharma</div>
                        <div className="text-xs font-semibold text-white/70">(Computer Science, 2024)</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-4xl font-semibold text-white">3,120 pts</div>
                      <div className="mt-1 text-xs font-semibold text-white/70">
                        18 Tasks Completed · Gold Badge
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:order-3 md:self-end">
                  <div className="relative rounded-3xl border border-white/25 bg-white/15 p-5 pt-7 backdrop-blur-md">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <BronzeCrownIcon />
                    </div>
                    <div className="flex items-center justify-between">
                      <MedalIcon tone="bronze" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/75">3rd place</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="grid size-12 place-items-center rounded-full bg-white/20 ring-1 ring-white/25">
                        <span className="text-sm font-black text-white">AP</span>
                      </div>
                      <div>
                        <div className="text-base font-semibold text-white">Aisha Patel</div>
                        <div className="text-xs font-semibold text-white/70">(Bio-Tech, 2026)</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-semibold text-white">2,880 pts</div>
                      <div className="mt-1 text-xs font-semibold text-white/70">
                        15 Tasks Completed · Bronze Badge
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-white/20 bg-white/5 p-5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)] sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">List view</div>
                <div className="mt-2 text-xl font-semibold text-neutral-900">Top contributors</div>
              </div>
              <SearchButton value={query} onChange={setQuery} />
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[920px] table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    <th className="py-3 pr-4">Rank</th>
                    <th className="py-3 pr-4">User</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Progress</th>
                    <th className="py-3 pr-4">taskcompleted</th>
                    <th className="py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.rank} className="border-b border-neutral-100 last:border-none">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900">{r.rank}</span>
                          {trendBadge(r.trend)}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <InitialAvatar initials={r.user.initials} />
                          <div>
                            <div className="font-semibold text-neutral-900">
                              {r.user.name} <span className="text-neutral-400">({r.user.dept}, {String(r.user.year).slice(-2)})</span>
                            </div>
                            <div className="text-xs font-semibold text-neutral-500">
                              {r.user.dept} · {r.user.year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="inline-flex items-center gap-2">
                          <span className={["size-2 rounded-full", r.active ? "bg-emerald-500" : "bg-neutral-300"].join(" ")} />
                          <span className="text-xs font-semibold text-neutral-600">{r.active ? "Active" : "Idle"}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-semibold text-neutral-900">{r.scorePts.toLocaleString()} pts</span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-200">
                            <div
                              className="h-full"
                              style={{
                                width: `${clampPct(r.progressPct)}%`,
                                backgroundColor: PROGRESS_BAR_FILL
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-neutral-600">{clampPct(r.progressPct)}%</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-xs font-semibold text-neutral-700">
                          {r.taskcompleted.tasks} Tasks Completed
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          className="rounded-full px-4 py-2 text-xs font-bold text-white hover:brightness-110"
                          style={{ backgroundColor: MAROON }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-sm font-semibold text-neutral-500">
                        No matches. Try a different search or filter.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <footer className="fixed bottom-5 left-1/2 z-40 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl px-4 py-3 shadow-[0_8px_32px_0_rgba(143,17,59,0.4)] border border-white/20 backdrop-blur-xl">
          <div
            className="rounded-2xl px-4 py-3 text-white"
            style={{
              background: `linear-gradient(180deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`
            }}
          >
            <div className="flex flex-col gap-2 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-bold tracking-widest">
                  MY RANK
                </span>
                <span className="text-white/85">
                  YOUR RANK: <span className="text-white">152</span>
                </span>
                <span className="text-white/85">
                  SCORE: <span className="text-white">980 pts</span>
                </span>
                <span className="text-white/85">
                  PROGRESS: <span className="text-white">54%</span>
                </span>
              </div>

              <div className="text-white/85">
                PROFILE <span className="text-white">(Aman J.)</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


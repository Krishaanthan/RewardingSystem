"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* ══════════════════════════════════════════════════════════════════════════
   COLOUR TOKENS
══════════════════════════════════════════════════════════════════════════ */
const P = "#831238";          // primary
const PD = "#5E0D28";         // primary dark
const PM = "#9B1D45";         // primary mid
const PL = "#FDF4F6";         // primary light bg
const PB = "#E8C0CC";         // primary border
const CG = "#D1D5DB";         // cement gray
const CGD = "#9CA3AF";        // cement gray dark
const TXT = "#1F2937";        // text primary
const TSUB = "#6B7280";       // text secondary
const GRN = "#15803D";        // green positive
const GRNB = "#F0FDF4";       // green bg
const GRNBR = "#BBF7D0";      // green border
const RED = "#DC2626";        // negative red
const CREAM = "#FBF6F2";      // page cream bg
const BLU = "#2563EB";        // blue info
const BLUB = "#EFF6FF";       // blue bg
const YEL = "#D97706";        // yellow warning
const YELB = "#FFFBEB";       // yellow bg

/* ══════════════════════════════════════════════════════════════════════════
   DATA TYPES
══════════════════════════════════════════════════════════════════════════ */

interface SummaryData {
  pending_reviews: number;
  manually_reviewed: number;
  ai_approved: number;
  direct_awards: number;
  recent_activity: {
    student: string;
    activity: string;
    status: string;
    time: string;
  }[];
}

const submissionsData = [
  { day: "Mon", count: 30 }, { day: "Tue", count: 55 },
  { day: "Wed", count: 40 }, { day: "Thu", count: 70 },
  { day: "Fri", count: 60 }, { day: "Sat", count: 90 },
  { day: "Sun", count: 10 },
];

/* ══════════════════════════════════════════════════════════════════════════
   PRIMITIVE COMPONENTS
══════════════════════════════════════════════════════════════════════════ */
function Card({ children, style = {}, onClick }: any) {
  return (
    <div
      className={onClick ? "card card-btn" : "card"}
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Label({ children, style = {} }: any) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 700, letterSpacing: "0.09em",
      color: CGD, textTransform: "uppercase", marginBottom: 13, ...style
    }}>{children}</div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE CONTENT
══════════════════════════════════════════════════════════════════════════ */
export default function FacultyDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;
        const res = await fetch("http://localhost:8000/api/faculty/dashboard-summary", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const queueSummary = [
    { label: "Flagged for Review", emoji: "🟡", color: YEL, bg: YELB, count: data?.pending_reviews ?? 0 },
    { label: "AI Approved", emoji: "✅", color: GRN, bg: GRNB, count: data?.ai_approved ?? 0 },
    { label: "Manually Reviewed", emoji: "🔵", color: BLU, bg: BLUB, count: data?.manually_reviewed ?? 0 },
    { label: "Direct Awards", emoji: "🏆", color: P, bg: PL, count: data?.direct_awards ?? 0 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          color: #1F2937;
          min-height: 100vh;
          background-color: #ffffff;
          background-image:
            radial-gradient(ellipse at 15% 12%, rgba(131,18,56,0.05) 0%, transparent 48%),
            radial-gradient(ellipse at 85% 85%, rgba(131,18,56,0.04) 0%, transparent 42%);
        }

        /* Glass card */
        .card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border-radius: 18px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,0.82);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 2px 4px rgba(131,18,56,0.04),
            0 8px 28px rgba(131,18,56,0.08);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 4px 8px rgba(131,18,56,0.06),
            0 16px 44px rgba(131,18,56,0.12);
          transform: translateY(-2px);
        }
        .card-btn:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 6px 12px rgba(131,18,56,0.09),
            0 20px 52px rgba(131,18,56,0.16);
          transform: translateY(-3px);
        }

        /* Page animation */
        @keyframes pageIn  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
        .page-in { animation: pageIn 0.32s cubic-bezier(0.22,1,0.36,1); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E8C0CC; border-radius: 99px; }
      `}</style>


      <main className="page-in" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 0px 72px" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: TXT, letterSpacing: -0.8, lineHeight: 1.2 }}>Faculty Dashboard</h1>
          <p style={{ fontSize: 15, color: TSUB, marginTop: 4 }}>Welcome back to the Faculty Portal</p>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "PENDING REVIEWS", value: isLoading ? "-" : data?.pending_reviews ?? 0, color: YEL, bg: YELB, br: "#FDE68A", sub: "⚠ Awaiting manual action" },
            { label: "AI APPROVED", value: isLoading ? "-" : data?.ai_approved ?? 0, color: GRN, bg: GRNB, br: GRNBR, sub: "Auto-processed by AI" },
            { label: "MANUALLY REVIEWED", value: isLoading ? "-" : data?.manually_reviewed ?? 0, color: BLU, bg: BLUB, br: "#BFDBFE", sub: "Processed by you" },
            { label: "DIRECT AWARDS", value: isLoading ? "-" : data?.direct_awards ?? 0, color: P, bg: PL, br: PB, sub: "Granted to students" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.br}`, borderRadius: 16, padding: "20px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: CGD, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: TSUB, marginTop: 4, fontWeight: 500 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
          
          {/* LEFT: Recent Activity */}
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: TXT, letterSpacing: -0.3 }}>Recent Activity</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: P, background: PL, border: `1px solid ${PB}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer" }}>View All →</div>
            </div>
            
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: `1px solid ${CG}` }}>
                  {["Student", "Activity", "Status", "Time"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 22px", color: CGD, fontWeight: 700, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.recent_activity?.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: TSUB }}>No recent activity to show</td>
                  </tr>
                ) : (
                  data?.recent_activity?.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < (data.recent_activity.length - 1) ? `1px solid #F3F4F6` : "none", transition: "background 0.2s" }} className="hover:bg-gray-50/50">
                      <td style={{ padding: "14px 22px", color: TXT, fontWeight: 600 }}>{row.student}</td>
                      <td style={{ padding: "14px 22px", color: TSUB }}>{row.activity}</td>
                      <td style={{ padding: "14px 22px" }}>
                        <span style={{ 
                          background: row.status === "APPROVED" ? GRNB : row.status === "MANUAL_REVIEW" ? YELB : "#FEF2F2", 
                          color: row.status === "APPROVED" ? GRN : row.status === "MANUAL_REVIEW" ? YEL : RED, 
                          fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, 
                          border: `1px solid ${row.status === "APPROVED" ? GRNBR : row.status === "MANUAL_REVIEW" ? "#FDE68A" : "#FECACA"}` 
                        }}>
                          {row.status === "APPROVED" ? "Approved" : row.status === "MANUAL_REVIEW" ? "Manual Review" : "Rejected"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 22px", color: CGD, fontSize: 11 }}>{new Date(row.time).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>

          {/* RIGHT COL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* Chart Widget */}
            <Card>
              <Label>Submissions This Week</Label>
              <div style={{ height: 160, marginTop: 10 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={submissionsData} margin={{ top: 10, right: 0, bottom: 0, left: -24 }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={P} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={P} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3E8EC" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: CGD }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: CGD }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div style={{ background: "#fff", border: `1px solid ${PB}`, borderRadius: 10, padding: "8px 14px", boxShadow: `0 4px 20px rgba(131,18,56,0.12)`, fontSize: 13, fontWeight: 600 }}>
                              <div style={{ color: CGD, marginBottom: 2 }}>{label}</div>
                              <div style={{ color: P }}>{payload[0].value} submissions</div>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                    <Area type="monotone" dataKey="count" stroke={P} strokeWidth={2.5} fill="url(#chartGrad)" activeDot={{ r: 5, fill: P, stroke: "#fff", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Queue Summary */}
            <Card>
              <Label>Queue Summary</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {queueSummary.map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: row.bg, borderRadius: 12, border: `1px solid ${row.color}33` }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TXT }}>
                      {row.emoji} {row.label}
                    </span>
                    <span style={{ background: row.color, color: "#fff", fontSize: 12, fontWeight: 800, padding: "2px 10px", borderRadius: 99 }}>
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => router.push('/faculty/review-queue')}
                style={{ 
                  marginTop: 18, width: "100%", background: `linear-gradient(135deg, ${P}, ${PM})`, color: "#fff", 
                  border: "none", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 700, 
                  cursor: "pointer", boxShadow: `0 4px 14px rgba(131,18,56,0.25)`, transition: "all 0.2s" 
                }}
                onMouseOver={(e: any) => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={(e: any) => e.target.style.transform = "none"}
              >
                Open Review Queue →
              </button>
            </Card>

          </div>
        </div>

      </main>
    </>
  );
}

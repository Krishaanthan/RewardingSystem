"use client";

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

/* ══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */
const pointsData = [
  { month: "Sep", points: 12 }, { month: "Oct", points: 18 },
  { month: "Nov", points: 22 }, { month: "Dec", points: 28 },
  { month: "Jan", points: 35 }, { month: "Feb", points: 42 },
  { month: "Mar", points: 47 },
];

const badges = [
  { icon: "/assets/Badges/knowledge_seeker/bronzeKS.png", name: "Knowledge Seeker", desc: "Highest marks in term", earned: true },
  { icon: "/assets/Badges/community_impact/bronzeCI.png", name: "Community Impact", desc: "7 days consecutive login", earned: true },
  { icon: "/assets/Badges/campus_engagement/bronzeCE.png", name: "Campus Star", desc: "Read 10 library books", earned: true },
  { icon: "/assets/Badges/Innovation_builder/bronzeIB.png", name: "Innovation Builder", desc: "Fastest quiz completion", earned: true },
  { icon: "/assets/Badges/Leadership Badge/bronzeLB.png", name: "Leadership Architect", desc: "Nominated by teachers", earned: false },
  { icon: "/assets/Badges/Hackathon Badge/bronzeHB.png", name: "Hackathon Hero", desc: "Perfect score on a test", earned: false },
];

const ledgerData = [
  { date: "Mar 15", activity: "Winning the hackathon", points: +5, type: "credit" },
  { date: "Mar 14", activity: "Hackathon Participation", points: +2, type: "credit" },
  { date: "Mar 12", activity: "Volunteering", points: +2, type: "credit" },
  { date: "Mar 10", activity: "Swayam NPTEL course", points: +4, type: "credit" },
  { date: "Today", activity: "Coursera Course", points: +3, type: "credit" },
];

const leaderboardData = [
  { rank: 1, name: "Alex Johnson", points: 64, initials: "AJ", dept: "Computer Science", badges: 8 },
  { rank: 2, name: "Ealca", points: 58, initials: "EA", dept: "Mathematics", badges: 6 },
  { rank: 3, name: "Ahoky", points: 52, initials: "AH", dept: "Physics", badges: 6 },
  { rank: 4, name: "Akash Smith", points: 47, initials: "AS", dept: "Computer Science", badges: 4, isUser: true },
  { rank: 5, name: "Alex", points: 42, initials: "AL", dept: "Chemistry", badges: 4, relPoints: "+5" },
  { rank: 6, name: "Lena Park", points: 38, initials: "LP", dept: "Biology", badges: 3 },
  { rank: 7, name: "Sam Rivera", points: 35, initials: "SR", dept: "History", badges: 3 },
  { rank: 8, name: "Priya Nair", points: 30, initials: "PN", dept: "Economics", badges: 2 },
];

const certificates = [
  { title: "ADVANCE CERTIFICATE", subject: "Frontend Developer", level: 3, id: "c1" },
  { title: "ADVANCE CERTIFICATE", subject: "Frontend Developer", level: 2, id: "c2" },
  { title: "ADVANCED CERTIFICATE", subject: "Backend Developer", level: 3, id: "c3" },
];

const claimableTasks = [
  { id: 1, title: "Coursera Course", pts: 3, deadline: "Today", icon: "📝", done: false },
  { id: 2, title: "Swayam NPTEL course", pts: 4, deadline: "Mar 10", icon: "🔬", done: false },
  { id: 3, title: "Volunteering", pts: 2, deadline: "Mar 12", icon: "🎯", done: true },
  { id: 4, title: "Hackathon Participation", pts: 2, deadline: "Mar 14", icon: "👥", done: false },
  { id: 5, title: "Winning the hackathon", pts: 5, deadline: "Mar 15", icon: "📚", done: true },
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

const ChartTip = (props: any) => {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${PB}`, borderRadius: 10, padding: "8px 14px", boxShadow: `0 4px 20px rgba(131,18,56,0.12)`, fontSize: 13, fontWeight: 600 }}>
      <div style={{ color: CGD, marginBottom: 2 }}>{label}</div>
      <div style={{ color: P }}>{payload[0].value} pts</div>
    </div>
  );
};

function BackBtn({ onBack }: any) {
  return (
    <button onClick={onBack} className="back-btn">
      ← Back to Dashboard
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUB-PAGES
══════════════════════════════════════════════════════════════════════════ */

/* ── BADGES PAGE ─────────────────────────────────────────────────────────── */
function BadgesPage({ onBack }: any) {
  const [hov, setHov] = useState<any>(null);
  const earned = badges.filter(b => b.earned);
  const locked = badges.filter(b => !b.earned);

  return (
    <div className="page-in">
      <BackBtn onBack={onBack} />
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.6 }}>🏅 My Badges</h1>
        <p style={{ fontSize: 14, color: TSUB, marginTop: 4 }}>All your earned achievements in one place.</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Earned", value: `${earned.length}`, color: P, bg: PL, br: PB },
          { label: "Locked", value: `${locked.length}`, color: CGD, bg: "#F9FAFB", br: CG },
          { label: "Progress", value: `${earned.length}/${badges.length}`, color: GRN, bg: GRNB, br: GRNBR },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.br}`, borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: CGD, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: -1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Earned */}
      <div style={{ fontSize: 13, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Earned Badges</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {earned.map((b, i) => (
          <div key={i} onMouseEnter={() => setHov(`e${i}`)} onMouseLeave={() => setHov(null)} style={{ position: "relative", background: hov === `e${i}` ? PL : `linear-gradient(145deg, #FFF7F9 0%, #FDF4F6 100%)`, border: `2px solid ${hov === `e${i}` ? P : PB}`, borderRadius: 16, padding: "24px 14px 18px", textAlign: "center", transform: hov === `e${i}` ? "translateY(-4px)" : "none", boxShadow: hov === `e${i}` ? `0 12px 32px rgba(131,18,56,0.18)` : `0 2px 10px rgba(131,18,56,0.07)`, transition: "all 0.22s ease" }}>
            <div style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: "50%", background: P, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 800 }}>✓</div>
            <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}><img src={b.icon} alt={b.name} style={{ width: 44, height: 44, objectFit: "contain" }} /></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: P, marginBottom: 4 }}>{b.name}</div>
            <div style={{ fontSize: 11, color: TSUB, lineHeight: 1.4 }}>{b.desc}</div>
            <div style={{ marginTop: 10, display: "inline-block", background: P, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 9px", borderRadius: 99, letterSpacing: "0.05em" }}>EARNED</div>
          </div>
        ))}
      </div>

      {/* Locked */}
      <div style={{ fontSize: 13, fontWeight: 700, color: CGD, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Locked Badges</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {locked.map((b, i) => (
          <div key={i} style={{ background: "#F9FAFB", border: `2px dashed ${CG}`, borderRadius: 16, padding: "24px 14px 18px", textAlign: "center", opacity: 0.55 }}>
            <div style={{ marginBottom: 10, display: "flex", justifyContent: "center", filter: "grayscale(1)" }}><img src={b.icon} alt={b.name} style={{ width: 44, height: 44, objectFit: "contain" }} /></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: CGD, marginBottom: 4 }}>{b.name}</div>
            <div style={{ fontSize: 11, color: CGD, lineHeight: 1.4 }}>{b.desc}</div>
            <div style={{ marginTop: 10, display: "inline-block", background: CG, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 9px", borderRadius: 99, letterSpacing: "0.05em" }}>LOCKED</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MY LEDGER PAGE ──────────────────────────────────────────────────────── */
function LedgerPage({ onBack }: any) {
  const [filter, setFilter] = useState("all");
  const rows = filter === "all" ? ledgerData : ledgerData.filter(r => r.type === filter);
  const totalIn = ledgerData.filter(r => r.points > 0).reduce((a, r) => a + r.points, 0);
  const totalOut = ledgerData.filter(r => r.points < 0).reduce((a, r) => a + r.points, 0);

  return (
    <div className="page-in">
      <BackBtn onBack={onBack} />
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.6 }}>📋 My Ledger</h1>
        <p style={{ fontSize: 14, color: TSUB, marginTop: 4 }}>Complete history of your points transactions.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
        {[
          { label: "Balance", value: "47 pts", color: P, bg: PL, br: PB },
          { label: "Total Earned", value: `+${totalIn} pts`, color: GRN, bg: GRNB, br: GRNBR },
          { label: "Total Spent", value: `${totalOut} pts`, color: RED, bg: "#FEF2F2", br: "#FECACA" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.br}`, borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: CGD, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: -0.8 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[["all", "All"], ["credit", "Earned"], ["debit", "Spent"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ padding: "7px 18px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: filter === v ? P : "rgba(255,255,255,0.85)", color: filter === v ? "#fff" : TSUB, boxShadow: filter === v ? `0 2px 12px rgba(131,18,56,0.3)` : "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.15s", fontFamily: "inherit" }}>{l}</button>
        ))}
      </div>

      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${PL}` }}>
              {["Date", "Activity", "Type", "Points"].map(h => (
                <th key={h} style={{ textAlign: h === "Points" ? "right" : "left", padding: "0 0 14px", color: CGD, fontWeight: 700, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${PL}` : "none" }}>
                <td style={{ padding: "13px 0", color: CGD, fontSize: 12, whiteSpace: "nowrap" }}>{row.date}</td>
                <td style={{ padding: "13px 16px", color: TXT, fontWeight: 500 }}>{row.activity}</td>
                <td style={{ padding: "13px 0" }}>
                  <span style={{ background: row.type === "credit" ? GRNB : PL, color: row.type === "credit" ? GRN : P, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, border: `1px solid ${row.type === "credit" ? GRNBR : PB}` }}>
                    {row.type === "credit" ? "Earned" : "Spent"}
                  </span>
                </td>
                <td style={{ padding: "13px 0", textAlign: "right", fontWeight: 800, fontSize: 15, color: row.points > 0 ? GRN : RED }}>
                  {row.points > 0 ? "+" : ""}{row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ── CLAIM POINTS PAGE ───────────────────────────────────────────────────── */
function ClaimPointsPage({ onBack }: any) {
  const [claimed, setClaimed] = useState<any[]>([]);
  const [toast, setToast] = useState<any>(null);

  const claim = (task: any) => {
    if (claimed.includes(task.id) || task.done) return;
    setClaimed(prev => [...prev, task.id]);
    setToast(task);
    setTimeout(() => setToast(null), 2600);
  };

  const pending = claimableTasks.filter(t => !t.done && !claimed.includes(t.id));
  const totalPts = pending.reduce((a, t) => a + t.pts, 0);

  return (
    <div className="page-in">
      <BackBtn onBack={onBack} />
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.6 }}>🎁 Claim Your Points</h1>
        <p style={{ fontSize: 14, color: TSUB, marginTop: 4 }}>Complete tasks and claim your earned points before they expire.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Available to Claim", value: `${totalPts} pts`, color: P, bg: PL, br: PB },
          { label: "Already Claimed", value: `${claimed.length} tasks`, color: GRN, bg: GRNB, br: GRNBR },
          { label: "Total Tasks", value: `${claimableTasks.length}`, color: TXT, bg: "rgba(255,255,255,0.85)", br: CG },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.br}`, borderRadius: 14, padding: "18px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: CGD, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: -0.8 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {claimableTasks.map(task => {
          const done = task.done || claimed.includes(task.id);
          return (
            <div key={task.id} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: done ? GRNB : "rgba(255,255,255,0.88)", border: `1px solid ${done ? GRNBR : PB}` }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: done ? "#DCFCE7" : PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{task.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{task.title}</div>
                <div style={{ fontSize: 12, color: CGD, marginTop: 2 }}>Deadline: {task.deadline}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: done ? GRN : P, marginBottom: 7 }}>+{task.pts} pts</div>
                <button onClick={() => claim(task)} disabled={done} style={{ background: done ? "#D1FAE5" : `linear-gradient(135deg, ${P}, ${PD})`, color: done ? GRN : "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: done ? "default" : "pointer", boxShadow: done ? "none" : `0 2px 10px rgba(131,18,56,0.28)`, transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "inherit" }}>
                  {done ? "✓ Claimed" : "Claim Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 32, right: 32, background: TXT, color: "#fff", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", zIndex: 400, animation: "slideUp 0.3s ease" }}>
          <div style={{ fontSize: 22 }}>🎉</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Points Claimed!</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>+{toast.pts} pts added to your balance</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── LEADERBOARD PAGE ────────────────────────────────────────────────────── */
function LeaderboardPage({ onBack }: any) {
  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);
  const podium = [top3[1], top3[0], top3[2]];
  const PC = ["#A8A8A8", "#C9A84C", "#A0714F"];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <div className="page-in">
      <BackBtn onBack={onBack} />
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.6 }}>🏆 Real-time Leaderboard</h1>
        <p style={{ fontSize: 14, color: TSUB, marginTop: 4 }}>See how you rank against your peers this term.</p>
      </div>

      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        {/* Podium header */}
        <div style={{ background: `linear-gradient(155deg, ${PD} 0%, ${P} 55%, ${PM} 100%)`, padding: "36px 24px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ textAlign: "center", fontSize: 36, marginBottom: 8, filter: "drop-shadow(0 2px 12px rgba(255,215,0,0.5))" }}>🏆</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16 }}>
            {podium.map((pl, idx) => {
              const isC = idx === 1;
              return (
                <div key={pl.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: PC[idx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: isC ? PD : "#fff", boxShadow: isC ? "0 0 14px rgba(201,168,76,0.7)" : "none" }}>{pl.rank}</div>
                  <div style={{ width: isC ? 70 : 54, height: isC ? 70 : 54, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: `3px solid ${PC[idx]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isC ? 22 : 17, fontWeight: 800, color: "#fff", boxShadow: isC ? `0 0 22px ${PC[idx]}88` : "none" }}>{pl.initials}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: isC ? 14 : 12, fontWeight: 700, color: "#fff" }}>{pl.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>{pl.dept}</div>
                    <div style={{ fontSize: isC ? 16 : 13, fontWeight: 800, color: PC[idx], marginTop: 3 }}>{pl.points.toLocaleString()}</div>
                  </div>
                  <div style={{ width: isC ? 100 : 76, height: isC ? 46 : 30, background: `rgba(255,255,255,${isC ? 0.13 : 0.07})`, borderRadius: "8px 8px 0 0", border: `1px solid rgba(255,255,255,${isC ? 0.22 : 0.1})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isC ? 17 : 13 }}>{medals[idx]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rest of rankings */}
        <div style={{ padding: "14px 20px 20px" }}>
          <Label>All Rankings</Label>
          {rest.map(s => (
            <div key={s.rank} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", borderRadius: 11, background: s.isUser ? PL : "transparent", border: `1px solid ${s.isUser ? PB : "transparent"}`, marginBottom: 5 }}>
              <div style={{ width: 28, textAlign: "center", fontSize: 13, fontWeight: 800, color: s.isUser ? P : CGD }}>{s.rank}</div>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: s.isUser ? `linear-gradient(135deg, ${P}, ${PM})` : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: s.isUser ? "#fff" : TSUB, flexShrink: 0 }}>{s.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.isUser ? P : TXT }}>
                  {s.name}
                  {s.isUser && <span style={{ fontSize: 10, background: PL, border: `1px solid ${PB}`, color: P, padding: "1px 7px", borderRadius: 99, marginLeft: 6 }}>You</span>}
                </div>
                <div style={{ fontSize: 11, color: CGD }}>{s.dept}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: TXT }}>{s.points.toLocaleString()}</div>
                {s.relPoints && <div style={{ fontSize: 11, fontWeight: 700, color: GRN }}>{s.relPoints}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DASHBOARD WIDGETS
══════════════════════════════════════════════════════════════════════════ */

/* ── Student Profile (enlarged) ──────────────────────────────────────────── */
function StudentProfileCard({ student, stats }: { student: any; stats: any }) {
  const initials = student?.name
    ? student.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "ST";

  return (
    <Card style={{ padding: "28px 26px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: `linear-gradient(135deg, ${P} 0%, ${PM} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#fff", boxShadow: `0 10px 32px rgba(131,18,56,0.35)`, letterSpacing: -1 }}>
            {initials}
          </div>
          <div style={{ position: "absolute", bottom: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: "#22C55E", border: "3px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
        </div>

        {/* Name — enlarged */}
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.7, lineHeight: 1.1 }}>{student?.name || "Loading..."}</div>
          <div style={{ fontSize: 13, color: CGD, marginTop: 5 }}>ID: {student?.registration_number || "-"}</div>
        </div>

        {/* Dept badge */}
        <div style={{ background: PL, color: P, fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20, border: `1px solid ${PB}` }}>
          {student?.department || "Dept"} · Year {student?.current_year || "-"}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, background: "#F0E8EC", borderRadius: 14, overflow: "hidden", width: "100%", marginTop: 6 }}>
          {[[`#${stats?.rank || "-"}`, "Rank"], [`${stats?.total_points || 0}`, "Points"], [`${stats?.badges_count || 0}`, "Badges"]].map(([val, lbl]) => (
            <div key={lbl} style={{ background: "#fff", padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: P, letterSpacing: -0.5 }}>{val}</div>
              <div style={{ fontSize: 11, color: CGD, marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── Points Chart ────────────────────────────────────────────────────────── */
function PointsChart() {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <Label>Points Growth</Label>
          <div style={{ fontSize: 30, fontWeight: 800, color: TXT, letterSpacing: -1, lineHeight: 1 }}>47</div>
          <div style={{ fontSize: 13, color: GRN, marginTop: 5, fontWeight: 600 }}>↑ +7 this week</div>
        </div>
        <div style={{ background: PL, color: P, fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 20, border: `1px solid ${PB}` }}>This Term</div>
      </div>
      <ResponsiveContainer width="100%" height={178}>
        <AreaChart data={pointsData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={P} stopOpacity={0.18} />
              <stop offset="100%" stopColor={P} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3E8EC" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: CGD }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CGD }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Area type="monotone" dataKey="points" stroke={P} strokeWidth={2.5} fill="url(#pGrad)" dot={false} activeDot={{ r: 5, fill: P, stroke: "#fff", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

/* ── Badges Grid (dashboard widget — clickable, goes to badges page) ──────── */
function BadgesWidget({ onNavigate }: any) {
  const [hov, setHov] = useState<any>(null);
  return (
    <Card onClick={onNavigate} style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}>
      {/* top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${P}, ${PM})`, borderRadius: "18px 18px 0 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Label style={{ marginBottom: 0 }}>Earned Badges</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: CGD }}>4 earned · 2 locked</span>
          <div style={{ background: PL, border: `1px solid ${PB}`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: P }}>View All →</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {badges.map((b, i) => (
          <div
            key={i}
            onMouseEnter={e => { e.stopPropagation(); setHov(i); }}
            onMouseLeave={() => setHov(null)}
            style={{
              position: "relative",
              background: b.earned
                ? (hov === i ? PL : `linear-gradient(145deg, #FFF7F9, #FDF4F6)`)
                : "#F9FAFB",
              border: b.earned
                ? `2px solid ${hov === i ? P : PB}`
                : `2px dashed ${CG}`,
              borderRadius: 14,
              padding: "16px 10px 13px",
              textAlign: "center",
              cursor: b.earned ? "pointer" : "default",
              opacity: b.earned ? 1 : 0.4,
              transition: "all 0.2s ease",
              transform: b.earned && hov === i ? "translateY(-3px)" : "none",
              boxShadow: b.earned && hov === i ? `0 8px 22px rgba(131,18,56,0.15)` : "none",
            }}
          >
            {b.earned && (
              <div style={{ position: "absolute", top: 7, right: 7, width: 16, height: 16, borderRadius: "50%", background: P, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 800 }}>✓</div>
            )}
            <div style={{ marginBottom: 7, display: "flex", justifyContent: "center", filter: b.earned ? "none" : "grayscale(1)" }}><img src={b.icon} alt={b.name} style={{ width: 34, height: 34, objectFit: "contain" }} /></div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: b.earned ? P : CGD, lineHeight: 1.3 }}>{b.name}</div>
            {b.earned && (
              <div style={{ marginTop: 5, display: "inline-block", background: P, color: "#fff", fontSize: 8.5, fontWeight: 700, padding: "1px 7px", borderRadius: 99, letterSpacing: "0.05em" }}>EARNED</div>
            )}
            {/* tooltip */}
            {hov === i && b.earned && (
              <div style={{ position: "absolute", bottom: "calc(100% + 7px)", left: "50%", transform: "translateX(-50%)", background: TXT, color: "#fff", fontSize: 10.5, padding: "5px 10px", borderRadius: 8, whiteSpace: "nowrap", zIndex: 30, fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.18)", pointerEvents: "none" }}>
                {b.desc}
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${TXT}` }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: CGD }}>Click to view all badges</div>
    </Card>
  );
}

/* ── Progress Card ───────────────────────────────────────────────────────── */
function ProgressCard() {
  const cur = 47, tgt = 50;
  const pct = Math.round((cur / tgt) * 100);
  return (
    <Card>
      <Label>Next Badge Progress</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ width: 54, height: 54, borderRadius: 15, background: `linear-gradient(135deg, ${PL}, #F5C6D0)`, border: `1px solid ${PB}`, display: "flex", alignItems: "center", justifyContent: "center" }}><img src="/assets/Badges/knowledge_seeker/goldKS.png" alt="Gold Achiever" style={{ width: 36, height: 36, objectFit: "contain" }} /></div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: TXT }}>Gold Achiever</div>
          <div style={{ fontSize: 12, color: CGD, marginTop: 3 }}>Complete 50 points this term</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
        <span style={{ color: CGD, fontWeight: 500 }}>{cur} / {tgt} pts</span>
        <span style={{ color: P, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 9, background: "#F0E8EC", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${P}, ${PM})`, borderRadius: 99 }} />
      </div>
      <div style={{ fontSize: 12, color: CGD, marginTop: 10 }}>
        <strong style={{ color: P }}>{tgt - cur} more points</strong> to unlock this badge.
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 9 }}>
        {[["Term GPA", 82], ["Attendance", 92], ["Participation", 67]].map(([lbl, v]) => (
          <div key={lbl}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: CGD, marginBottom: 4 }}>
              <span>{lbl}</span><span style={{ color: TXT, fontWeight: 600 }}>{v}%</span>
            </div>
            <div style={{ height: 5, background: "#F0E8EC", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${v}%`, height: "100%", background: P, borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── My Ledger Widget ────────────────────────────────────────────────────── */
function MyLedgerWidget({ onNavigate }: any) {
  const recent = ledgerData.slice(0, 3);
  return (
    <Card onClick={onNavigate} style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${P}, ${PM})`, borderRadius: "18px 18px 0 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: PL, border: `1px solid ${PB}`, display: "flex", alignItems: "center", justifyContent: "center" }}><img src="/assets/Badges/Leadership Badge/bronzeLB.png" alt="Ledger" style={{ width: 24, height: 24, objectFit: "contain" }} /></div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: TXT, letterSpacing: -0.3 }}>My Ledger</div>
            <div style={{ fontSize: 11, color: CGD }}>Transaction history</div>
          </div>
        </div>
        <div style={{ background: PL, border: `1px solid ${PB}`, borderRadius: 8, padding: "5px 11px", fontSize: 12, fontWeight: 700, color: P }}>View All →</div>
      </div>

      {recent.map((row, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < recent.length - 1 ? `1px solid ${PL}` : "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: row.points > 0 ? GRNB : PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
            {row.points > 0 ? "💰" : "💸"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TXT }}>{row.activity}</div>
            <div style={{ fontSize: 10, color: CGD }}>{row.date}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: row.points > 0 ? GRN : RED }}>
            {row.points > 0 ? "+" : ""}{row.points}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: CGD }}>Tap to view full transaction history</div>
    </Card>
  );
}

/* ── Claim Points Widget ─────────────────────────────────────────────────── */
function ClaimWidget({ onNavigate }: any) {
  const pending = claimableTasks.filter(t => !t.done);
  const pts = pending.reduce((a, t) => a + t.pts, 0);
  return (
    <Card onClick={onNavigate} style={{ background: `linear-gradient(135deg, ${P} 0%, ${PD} 100%)`, border: "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -24, left: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎁</div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700, color: "#fff" }}>{pending.length} pending</div>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Available to Claim</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: -1, lineHeight: 1, marginBottom: 4 }}>{pts} pts</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>From {pending.length} unclaimed tasks</div>
        <div style={{ background: "#fff", borderRadius: 10, padding: "11px 0", textAlign: "center", fontSize: 14, fontWeight: 800, color: P, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
          Claim Points →
        </div>
      </div>
    </Card>
  );
}

/* ── Leaderboard Widget ──────────────────────────────────────────────────── */
function LeaderboardWidget({ onNavigate, student, stats }: any) {
  const top3 = leaderboardData.slice(0, 3);
  const podium = [top3[1], top3[0], top3[2]];
  const PC = ["#A8A8A8", "#C9A84C", "#A0714F"];
  const medals = ["🥈", "🥇", "🥉"];
  const mockUser: any = leaderboardData.find(s => s.isUser);

  const userName = student?.name || mockUser?.name || "Student";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2);
  const userRank = stats?.rank || mockUser?.rank || "-";
  const userPoints = stats?.total_points || mockUser?.points || 0;

  return (
    <Card onClick={onNavigate} style={{ padding: 0, overflow: "hidden" }}>
      {/* widget header */}
      <div style={{ padding: "18px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: TXT, letterSpacing: -0.3 }}>Real-time Leaderboard</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: P, background: PL, border: `1px solid ${PB}`, borderRadius: 8, padding: "4px 10px" }}>View All →</div>
      </div>

      {/* Podium */}
      <div style={{ background: `linear-gradient(155deg, ${PD} 0%, ${P} 55%, ${PM} 100%)`, margin: "14px 0 0", padding: "20px 16px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ textAlign: "center", fontSize: 26, marginBottom: 4, filter: "drop-shadow(0 2px 8px rgba(255,215,0,0.45))" }}>🏆</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10 }}>
          {podium.map((pl, idx) => {
            const isC = idx === 1;
            return (
              <div key={pl.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: PC[idx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: isC ? PD : "#fff" }}>{pl.rank}</div>
                <div style={{ width: isC ? 60 : 46, height: isC ? 60 : 46, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: `2px solid ${PC[idx]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isC ? 20 : 15, fontWeight: 800, color: "#fff", boxShadow: isC ? `0 0 18px ${PC[idx]}77` : "none" }}>{pl.initials}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isC ? 12 : 10, fontWeight: 700, color: "#fff" }}>{pl.name}</div>
                  <div style={{ fontSize: isC ? 13 : 11, fontWeight: 800, color: PC[idx], marginTop: 2 }}>{pl.points.toLocaleString()}</div>
                </div>
                <div style={{ width: isC ? 84 : 64, height: isC ? 40 : 26, background: `rgba(255,255,255,${isC ? 0.14 : 0.07})`, borderRadius: "7px 7px 0 0", border: `1px solid rgba(255,255,255,${isC ? 0.22 : 0.1})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isC ? 15 : 12 }}>{medals[idx]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User row */}
      <div style={{ padding: "12px 16px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: PL, border: `1px solid ${PB}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: P, width: 28 }}>{userRank === "-" ? "-" : `${userRank}th`}</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${PM})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{userInitials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: P }}>{userName}</div>
            <div style={{ fontSize: 10, color: CGD }}>relative to Peers</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: TXT }}>{userPoints.toLocaleString()}</div>
        </div>
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: CGD }}>Tap to view full leaderboard</div>
      </div>
    </Card>
  );
}

/* ── Certificates ────────────────────────────────────────────────────────── */
function CertificatesPanel() {
  const [hov, setHov] = useState<any>(null);
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: TXT, letterSpacing: -0.3 }}>Recent Certificates Earned</div>
        <div style={{ fontSize: 12, color: P, fontWeight: 600, cursor: "pointer" }}>View all →</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {certificates.map((cert, i) => (
          <div key={cert.id} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ position: "relative", border: `2px solid ${hov === i ? P : PB}`, borderRadius: 13, padding: "20px 18px 30px", background: hov === i ? PL : "#fff", cursor: "pointer", transition: "all 0.2s", transform: hov === i ? "translateY(-2px)" : "none", boxShadow: hov === i ? `0 8px 24px rgba(131,18,56,0.14)` : `0 2px 8px rgba(0,0,0,0.04)` }}>
            <div style={{ textAlign: "center", marginBottom: 13 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" fill="none" stroke={P} strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: TXT, letterSpacing: "0.06em", lineHeight: 1.5 }}>{cert.title}</div>
              <div style={{ fontSize: 11, color: TSUB, marginTop: 4 }}>{cert.subject}</div>
            </div>
            <div style={{ height: 1, background: "#F0E8EC", margin: "12px 0 0" }} />
            <div style={{ position: "absolute", bottom: -14, right: 16, width: 28, height: 28, borderRadius: "50%", background: P, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, boxShadow: `0 2px 8px rgba(131,18,56,0.4)`, border: "2px solid #fff" }}>{cert.level}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}



export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [page, setPage] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await fetch("http://localhost:8000/api/student/dashboard-summary", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const goTo = (p: any) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack = () => goTo("dashboard");

  const breadcrumbs = {
    leaderboard: "🏆 Leaderboard",
    ledger: "📋 My Ledger",
    claim: "🎁 Claim Points",
    badges: "🏅 My Badges",
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const { student, stats } = dashboardData || { student: {}, stats: {} };

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

        /* Back button */
        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(131,18,56,0.18);
          border-radius: 10px;
          padding: 9px 18px;
          font-size: 13px; font-weight: 600;
          color: #831238;
          cursor: pointer;
          margin-bottom: 26px;
          box-shadow: 0 2px 8px rgba(131,18,56,0.1);
          transition: all 0.16s;
          font-family: inherit;
        }
        .back-btn:hover { background: #FDF4F6; transform: translateX(-2px); }

        /* Page animation */
        @keyframes pageIn  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
        @keyframes slideUp { from { transform:translateY(22px) scale(0.97); opacity:0 } to { transform:none; opacity:1 } }
        .page-in { animation: pageIn 0.32s cubic-bezier(0.22,1,0.36,1); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E8C0CC; border-radius: 99px; }
      `}</style>


      {/* ── MAIN ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "112px 40px 72px" }}>

        {/* ────────── DASHBOARD ────────── */}
        {page === "dashboard" && (
          <div className="page-in">
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: TXT, letterSpacing: -0.6 }}>Good morning, {student?.name || "Student"} 👋</h1>
              <p style={{ fontSize: 14, color: TSUB, marginTop: 4 }}>You're doing great this week!</p>
            </div>

            {/* Stat row — 3 cards (no Active Streak) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
              {[
                { label: "Total Points", value: `${stats?.total_points || 0}`, sub: "Earned this term", subC: GRN, icon: "⭐" },
                { label: "Current Rank", value: `#${stats?.rank || "-"}`, sub: "Across all students", subC: GRN, icon: "📈" },
                { label: "Badges Earned", value: `${stats?.badges_count || 0}`, sub: "Unlocked achievements", subC: CGD, icon: "🏅" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: CGD, fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: 20 }}>{s.icon}</div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: TXT, letterSpacing: -0.8, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: s.subC, marginTop: 7, fontWeight: 500 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Row 1: Profile (enlarged 340px) + Chart */}
            <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 18, marginBottom: 18 }}>
              <StudentProfileCard student={student} stats={stats} />
              <PointsChart />
            </div>

            {/* Row 2: Badges widget (clickable) + Progress */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <BadgesWidget onNavigate={() => goTo("badges")} />
              <ProgressCard />
            </div>

            {/* Row 3: My Ledger + Claim Points */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <MyLedgerWidget onNavigate={() => goTo("ledger")} />
              <ClaimWidget onNavigate={() => goTo("claim")} />
            </div>

            {/* Row 4: Leaderboard (full width, clickable) */}
            <div style={{ marginBottom: 18 }}>
              <LeaderboardWidget onNavigate={() => goTo("leaderboard")} student={student} stats={stats} />
            </div>

            {/* Row 5: Certificates */}
            <CertificatesPanel />
          </div>
        )}

        {/* ────────── SUB PAGES ────────── */}
        {page === "badges" && <BadgesPage onBack={goBack} />}
        {page === "leaderboard" && <LeaderboardPage onBack={goBack} />}
        {page === "ledger" && <LedgerPage onBack={goBack} />}
        {page === "claim" && <ClaimPointsPage onBack={goBack} />}

      </main>
    </>
  );
}

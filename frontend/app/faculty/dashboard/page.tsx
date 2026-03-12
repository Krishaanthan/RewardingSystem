'use client';

import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/faculty/StatCard';
import { StatusBadge } from '@/components/faculty/StatusBadge';

const recentActivity = [
  {
    student: 'Priya S. / 22CS104',
    activity: 'Global Certification – AWS Cloud Practitioner',
    status: 'manual-review' as const,
    statusLabel: 'Manual Review',
    time: '10 min ago',
  },
  {
    student: 'Arjun M. / 22CS211',
    activity: 'Co-curricular – Hackathon 1st Prize',
    status: 'ai-approved' as const,
    statusLabel: 'AI Approved',
    time: '22 min ago',
  },
  {
    student: 'Sneha K. / 22EE089',
    activity: 'Academics – CGPA Improvement',
    status: 'rejected' as const,
    statusLabel: 'Rejected',
    time: '1 hr ago',
  },
  {
    student: 'Karthik R. / 21ME056',
    activity: 'Extracurricular – NSS Camp',
    status: 'ai-approved' as const,
    statusLabel: 'AI Approved',
    time: '2 hr ago',
  },
  {
    student: 'Divya P. / 22CS318',
    activity: 'Global Cert – Google Associate Cloud',
    status: 'manual-review' as const,
    statusLabel: 'Manual Review',
    time: '3 hr ago',
  },
];

const barHeights = [30, 55, 40, 70, 60, 90, 10];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const todayIndex = 5; // Sat

const queueSummary = [
  { label: 'AI Processing', emoji: '🔵', color: 'bg-faculty-info text-white', count: '14' },
  { label: 'Flagged for Review', emoji: '🟡', color: 'bg-faculty-warning text-white', count: '7' },
  { label: 'AI Approved', emoji: '✅', color: 'bg-faculty-success text-white', count: '43' },
  { label: 'Rejected', emoji: '❌', color: 'bg-faculty-danger text-white', count: '3' },
];

export default function FacultyDashboardPage() {
  const router = useRouter();

  return (
    <>
      <header className="mb-7">
        <h1
          className="font-archivo-black text-faculty-primary"
          style={{ fontSize: '22px' }}
        >
          Faculty Dashboard
        </h1>
        <p
          className="mt-1 text-[13px] text-faculty-text-muted"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          Welcome back, Dr. Ramesh · Department of Computer Science
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" style={{ gap: '18px' }}>
        <StatCard
          label="PENDING REVIEWS"
          value="7"
          valueColor="primary"
          subtitle="⚠ Awaiting manual action"
        />
        <StatCard
          label="AI APPROVED TODAY"
          value="43"
          valueColor="success"
          subtitle="Auto-processed by AI"
        />
        <StatCard
          label="MANUALLY REVIEWED"
          value="12"
          valueColor="info"
          subtitle="This week"
        />
        <StatCard
          label="DIRECT AWARDS"
          value="5"
          valueColor="warning"
          subtitle="Granted this week"
        />
      </section>

      <section
        className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]"
      >
        <div
          className="rounded-xl border border-faculty-border bg-white p-6 shadow-faculty"
          style={{
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <h2 className="font-league-spartan text-[15px] font-bold text-faculty-text-main">
            Recent Activity
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-faculty-table-header-border bg-faculty-table-header-bg text-faculty-primary">
                  <th className="py-3 pl-0 pr-4 text-left text-[11px] font-semibold uppercase">
                    Student
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase">
                    Activity
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase">
                    Status
                  </th>
                  <th className="py-3 pr-0 pl-4 text-left text-[11px] font-semibold uppercase">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#f3f4f6] hover:bg-faculty-row-hover"
                  >
                    <td className="py-3 pl-0 pr-4 text-faculty-text-main" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {row.student}
                    </td>
                    <td className="py-3 px-4 text-faculty-text-muted" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {row.activity}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={row.status} label={row.statusLabel} />
                    </td>
                    <td className="py-3 pr-0 pl-4 text-[11px] text-faculty-text-muted" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className="rounded-xl border border-faculty-border bg-white p-6 shadow-faculty"
            style={{
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <h2 className="font-league-spartan text-[15px] font-bold text-faculty-text-main">
              Submissions This Week
            </h2>
            <div className="mt-4 flex items-end justify-between gap-1" style={{ height: '50px' }}>
              {days.map((day, i) => (
                <div key={day} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full max-w-[24px] rounded-t bg-faculty-primary transition-opacity"
                    style={{
                      height: `${barHeights[i]}%`,
                      opacity: i === todayIndex ? 1 : 0.7,
                    }}
                  />
                  <span
                    className={`text-[10px] text-faculty-text-muted ${i === todayIndex ? 'font-bold text-faculty-primary' : ''}`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-1 flex-col rounded-xl border border-faculty-border bg-white p-6 shadow-faculty"
            style={{
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <h2 className="font-league-spartan text-[15px] font-bold text-faculty-text-main">
              Queue Summary
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {queueSummary.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-faculty-text-main" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {row.emoji} {row.label}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${row.color}`}
                  >
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push('/faculty/review-queue')}
              className="mt-4 w-full rounded-lg bg-faculty-primary py-2.5 font-league-spartan text-[13px] font-bold text-white transition-colors hover:bg-faculty-primary-hover"
            >
              Open Review Queue →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

import { PortalLayout } from "@/components/ui/PortalLayout";
import { studentNav } from "@/lib/nav";

const rows = [
  { rank: 1, name: "A. Sharma", dept: "CSE", year: "III", points: 1580 },
  { rank: 2, name: "K. Nair", dept: "ECE", year: "II", points: 1490 },
  { rank: 3, name: "R. Singh", dept: "CSE", year: "III", points: 1435 }
];

export default function StudentLeaderboardPage() {
  return (
    <PortalLayout
      title="Leaderboard"
      description="Department-wise, year-wise, and overall ranking."
      navItems={studentNav}
    >
      <section className="card">
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="rounded-lg bg-brand-primary px-3 py-2 text-sm font-semibold text-white">
            Overall
          </button>
          <button className="rounded-lg border border-brand-primary/20 px-3 py-2 text-sm font-semibold text-brand-primary">
            Department
          </button>
          <button className="rounded-lg border border-brand-primary/20 px-3 py-2 text-sm font-semibold text-brand-primary">
            Year
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-primary/10">
                <th className="py-3">Rank</th>
                <th className="py-3">Student</th>
                <th className="py-3">Department</th>
                <th className="py-3">Year</th>
                <th className="py-3">Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.rank} className="border-b border-brand-primary/10 last:border-none">
                  <td className="py-3">{row.rank}</td>
                  <td className="py-3">{row.name}</td>
                  <td className="py-3">{row.dept}</td>
                  <td className="py-3">{row.year}</td>
                  <td className="py-3 font-semibold text-brand-primary">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PortalLayout>
  );
}

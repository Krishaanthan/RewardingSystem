import { PortalLayout } from "@/components/ui/PortalLayout";
import { adminNav } from "@/lib/nav";

const rules = [
  { activity: "Hackathon Participation", points: 40 },
  { activity: "Technical Workshop", points: 20 },
  { activity: "Global Certification", points: 50 }
];

export default function AdminPointRulesPage() {
  return (
    <PortalLayout
      title="Point Rules"
      description="Update point values dynamically by activity type."
      navItems={adminNav}
    >
      <section className="card overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-primary/10">
              <th className="py-3">Activity</th>
              <th className="py-3">Current Points</th>
              <th className="py-3">New Value</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.activity} className="border-b border-brand-primary/10 last:border-none">
                <td className="py-3">{rule.activity}</td>
                <td className="py-3">{rule.points}</td>
                <td className="py-3">
                  <input
                    type="number"
                    defaultValue={rule.points}
                    className="w-24 rounded-lg border border-brand-primary/20 px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PortalLayout>
  );
}

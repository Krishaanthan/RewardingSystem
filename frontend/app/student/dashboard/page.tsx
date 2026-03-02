import { PortalLayout } from "@/components/ui/PortalLayout";
import { StatCard } from "@/components/ui/StatCard";
import { studentNav } from "@/lib/nav";

export default function StudentDashboardPage() {
  return (
    <PortalLayout
      title="Student Dashboard"
      description="Overview of points, tier, and recent activity."
      navItems={studentNav}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Points" value="1,240" subtitle="Updated 2 mins ago" />
        <StatCard title="Current Tier" value="Gold" subtitle="Top 8% in your batch" />
        <StatCard title="This Month" value="+180" subtitle="12 activities approved" />
        <StatCard title="Pending Claims" value="3" subtitle="2 under AI processing" />
      </div>

      <section className="card mt-6">
        <h2 className="heading text-xl">Recent Activity</h2>
        <ul className="mt-4 space-y-3 text-sm text-brand-text/80">
          <li>+40 points: Hackathon participation approved by AI</li>
          <li>+20 points: NSS volunteering approved by faculty</li>
          <li>-10 points: Attendance deduction imported from ERP</li>
        </ul>
      </section>
    </PortalLayout>
  );
}

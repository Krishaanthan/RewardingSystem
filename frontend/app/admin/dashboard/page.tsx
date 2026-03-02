import { PortalLayout } from "@/components/ui/PortalLayout";
import { StatCard } from "@/components/ui/StatCard";
import { adminNav } from "@/lib/nav";

export default function AdminDashboardPage() {
  return (
    <PortalLayout
      title="Admin Dashboard"
      description="System health, engagement metrics, and point volume."
      navItems={adminNav}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Students" value="2,184" subtitle="+3.1% this month" />
        <StatCard title="Total Points Awarded" value="412K" subtitle="Academic year 2025-26" />
        <StatCard title="Most Active Department" value="CSE" />
        <StatCard title="AI Auto-Approval Rate" value="78%" subtitle="Last 30 days" />
      </div>
    </PortalLayout>
  );
}

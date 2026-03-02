import { PortalLayout } from "@/components/ui/PortalLayout";
import { StatCard } from "@/components/ui/StatCard";
import { facultyNav } from "@/lib/nav";

export default function FacultyDashboardPage() {
  return (
    <PortalLayout
      title="Faculty Dashboard"
      description="Manual review workload and recent processing summary."
      navItems={facultyNav}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Pending Manual Reviews" value="28" subtitle="Flagged by AI" />
        <StatCard title="Processed Today" value="14" subtitle="11 approved, 3 rejected" />
        <StatCard title="Avg Review Time" value="4m 20s" />
        <StatCard title="Audit Spot Checks" value="7" subtitle="No anomalies found" />
      </div>
    </PortalLayout>
  );
}

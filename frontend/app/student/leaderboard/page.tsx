import { PortalLayout } from "@/components/ui/PortalLayout";
import { studentNav } from "@/lib/nav";

export default function LeaderboardPage() {
  return (
    <PortalLayout
      title="Leaderboard"
      description="See where you stand among your peers."
      navItems={studentNav}
    >
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Coming Soon</h2>
        <p className="text-[#6B7280]">This page is currently under development.</p>
      </div>
    </PortalLayout>
  );
}

"use client";

import { StudentProfileCard } from "@/components/dashboard/StudentProfileCard";
import { PointsChart } from "@/components/charts/PointsChart";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import {
  StudentBadges,
  Leaderboard,
  RecentCertificates,
  MyLedger,
  ClaimPoints,
} from "@/components/DashboardWidgets";

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100/70 via-[#fdf6f9] to-indigo-50/50 font-sans">
      <main className="max-w-[1400px] mx-auto px-8 py-10">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Track your academic progress and rewards.</p>
        </div>

        <div className="grid grid-cols-12 gap-5">

          {/* Row 1 — Profile (3) + Chart (9) */}
          <div className="col-span-12 lg:col-span-3">
            <StudentProfileCard />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <PointsChart />
          </div>

          {/* Row 2 — Badges (4) + Progress (4) + Leaderboard (4) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <StudentBadges />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ProgressCard />
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-4">
            <Leaderboard />
          </div>

          {/* Row 3 — Recent Certificates (full width) */}
          <div className="col-span-12">
            <RecentCertificates />
          </div>

          {/* Row 4 — Activity Timeline (4) + My Ledger (4) + Claim Points (4) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ActivityTimeline />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <MyLedger />
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-4">
            <ClaimPoints />
          </div>

        </div>
      </main>
    </div>
  );
}

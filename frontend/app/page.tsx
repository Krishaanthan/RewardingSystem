import { Bell, Search } from "lucide-react";
import {
  PointsOverview,
  CreditProgress,
  AcademicRank,
  QuickActions,
  ActiveLedger,
  SkillPaths,
  Leaderboard,
  RecentCertificates,
  ActiveProjectTimeline,
  UpcomingDeadlines
} from "@/components/DashboardWidgets";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-maroon-800/10">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 shadow-sm">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=f3f4f6"
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Welcome back, Alex Johnson
            </h1>
            <p className="text-xs font-medium text-gray-500">B.Sc. Computer Science</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-64 rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800"
            />
          </div>

          {/* Notification */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-maroon-800 ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          <PointsOverview />
          <CreditProgress />
          <ActiveLedger />

          <SkillPaths />
          <AcademicRank />

          <RecentCertificates />
          <Leaderboard />
          <QuickActions />

          <ActiveProjectTimeline />
          <UpcomingDeadlines />
        </div>
      </main>
    </div>
  );
}

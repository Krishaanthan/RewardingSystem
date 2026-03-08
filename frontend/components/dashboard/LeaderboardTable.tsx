"use client";

import { Trophy } from "lucide-react";

const students = [
  { rank: 1, name: "Alex Johnson", points: 20000, badges: 8 },
  { rank: 2, name: "Ealca R.", points: 18500, badges: 7 },
  { rank: 3, name: "Ahoky P.", points: 16000, badges: 6 },
  { rank: 4, name: "Maria S.", points: 14800, badges: 5 },
  { rank: 5, name: "John D.", points: 14500, badges: 6 },
  { rank: 6, name: "Priya K.", points: 13200, badges: 4 },
  { rank: 7, name: "Chen W.", points: 12000, badges: 4 },
];

const rankStyle: Record<number, string> = {
  1: "bg-amber-50 border-amber-200 text-amber-700",
  2: "bg-gray-100 border-gray-300 text-gray-600",
  3: "bg-orange-50 border-orange-200 text-orange-700",
};

export function LeaderboardTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-12">Rank</th>
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Points</th>
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((s) => (
              <tr
                key={s.rank}
                className={`transition-colors ${s.rank <= 3 ? "bg-amber-50/30" : "hover:bg-gray-50/60"}`}
              >
                <td className="py-3 pr-4">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-bold ${rankStyle[s.rank] ?? "bg-gray-50 border-gray-200 text-gray-500"}`}>
                    {s.rank}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm font-semibold text-gray-800 flex items-center gap-2">
                  {s.rank === 1 && <Trophy className="h-3.5 w-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                  {s.name}
                </td>
                <td className="py-3 text-sm font-bold text-gray-700 text-right">{s.points.toLocaleString()}</td>
                <td className="py-3 text-sm font-semibold text-gray-500 text-right">{s.badges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

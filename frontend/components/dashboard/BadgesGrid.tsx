"use client";

import { CodeXml, Trophy, BookOpen, Mic, Shield, Zap } from "lucide-react";

const badges = [
  { id: 1, icon: Trophy, label: "Hackathon Champ", desc: "Won a university hackathon", color: "bg-amber-50 text-amber-500 border-amber-200" },
  { id: 2, icon: BookOpen, label: "Bookworm", desc: "12 library contributions", color: "bg-blue-50 text-blue-500 border-blue-200" },
  { id: 3, icon: Mic, label: "Speaker", desc: "Presented at 3 events", color: "bg-purple-50 text-purple-500 border-purple-200" },
  { id: 4, icon: CodeXml, label: "Code Guru", desc: "Contributed to open-source", color: "bg-green-50 text-green-600 border-green-200" },
  { id: 5, icon: Shield, label: "Defender", desc: "Top cybersecurity score", color: "bg-red-50 text-red-600 border-red-200" },
  { id: 6, icon: Zap, label: "Fast Learner", desc: "Completed 5 courses in 30 days", color: "bg-orange-50 text-orange-500 border-orange-200" },
];

export function BadgesGrid() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-6 transition-all duration-200 hover:shadow-md h-full">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-800">Earned Badges</h3>
        <p className="text-sm text-gray-500 mt-0.5">Hover a badge to see details</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <div
            key={b.id}
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl border bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className={`p-3 rounded-full border ${b.color} mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <b.icon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">{b.label}</span>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {b.desc}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

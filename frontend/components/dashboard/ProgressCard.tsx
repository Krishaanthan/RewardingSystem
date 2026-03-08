"use client";

import { Trophy } from "lucide-react";

export function ProgressCard() {
  const current = 320;
  const total = 500;
  const pct = Math.round((current / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Next Badge</h3>
            <p className="text-sm text-gray-500">Gold Achiever</p>
          </div>
        </div>

        {/* Progress numbers */}
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-3xl font-extrabold text-primary">{current}</span>
            <span className="text-lg text-gray-400 ml-1">/ {total} pts</span>
          </div>
          <span className="text-sm font-bold text-gray-500">{pct}%</span>
        </div>

        {/* Red progress bar */}
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2.5 font-medium">
          {total - current} more points to unlock <span className="text-amber-500 font-bold">Gold Achiever</span>
        </p>
      </div>

      {/* Milestone hints */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { label: "Bronze", pts: "0–200", done: true },
          { label: "Silver", pts: "200–350", done: true },
          { label: "Gold", pts: "350–500", done: false },
        ].map((m) => (
          <div
            key={m.label}
            className={`rounded-lg p-2 text-center border text-xs font-semibold ${m.done ? "bg-primary-50 border-primary-200 text-primary" : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
          >
            {m.label}
            <div className="font-normal text-[10px] mt-0.5 opacity-70">{m.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

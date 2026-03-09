"use client";

import { GraduationCap, Star, Award } from "lucide-react";

export function StudentProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5 transition-all duration-200 hover:shadow-md group h-full">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=fee2e2"
            alt="Student Avatar"
            className="w-16 h-16 rounded-full border-2 border-primary-100 object-cover"
          />
          <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 ring-2 ring-white">
            5th
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight leading-tight">Alex Johnson</h2>
          <p className="text-sm text-gray-500 font-medium">ID: STU-20240118</p>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100" />

      {/* Stats */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Department</p>
            <p className="text-sm font-semibold text-gray-700">Computer Science</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Rank</p>
            <p className="text-sm font-semibold text-gray-700">5th out of 2,366</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Total Points</p>
            <p className="text-xl font-extrabold text-primary tracking-tight">14,500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

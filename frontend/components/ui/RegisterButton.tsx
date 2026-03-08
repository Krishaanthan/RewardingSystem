"use client";

import { CalendarPlus } from "lucide-react";

interface RegisterButtonProps {
  onClick: () => void;
}

export function RegisterButton({ onClick }: RegisterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-primary-500/25 py-4 px-8 transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98] group"
    >
      <CalendarPlus className="h-5 w-5 transition-transform group-hover:rotate-6 duration-200" />
      Register for Event
    </button>
  );
}

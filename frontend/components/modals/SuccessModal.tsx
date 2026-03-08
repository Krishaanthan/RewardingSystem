"use client";

import { CheckCircle2 } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-5 animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="p-4 bg-green-50 rounded-full border border-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-500" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Registration Successful</h2>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            You have successfully registered for the event. Good luck!
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100" />

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl py-3 transition-all duration-200 shadow-sm shadow-red-500/20 active:scale-[0.98]"
        >
          OK
        </button>
      </div>
    </div>
  );
}

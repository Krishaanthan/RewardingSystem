"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCardProps } from "./BadgeCard";

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  Bronze:  { bg: "rgba(205,127,50,0.12)",  border: "rgba(205,127,50,0.5)",  text: "#CD7F32" },
  Silver:  { bg: "rgba(192,192,192,0.12)", border: "rgba(192,192,192,0.5)", text: "#A0A0A0" },
  Gold:    { bg: "rgba(255,215,0,0.12)",   border: "rgba(255,215,0,0.5)",   text: "#C8A400" },
  Diamond: { bg: "rgba(131,18,56,0.08)",   border: "rgba(131,18,56,0.4)",   text: "#831238" },
};

type Props = {
  badge: BadgeCardProps | null;
  onClose: () => void;
};

export default function BadgeDetailModal({ badge, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (badge) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [badge]);

  const headerImage =
    badge && !badge.isIndividual && badge.tiers && badge.tiers[0]?.imagePath
      ? badge.tiers[0].imagePath
      : badge?.imagePath ?? "";

  return (
    <AnimatePresence>
      {badge && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel — slides up from bottom */}
          <motion.div
            key="panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-[48px] bg-white shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-6 pb-2">
              <div className="h-1.5 w-16 rounded-full bg-black/15" />
            </div>

            <div className="px-10 pb-16 pt-4 max-w-5xl mx-auto">

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 flex items-center justify-center h-12 w-12 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6 text-black/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header image + badge info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-12">
                <div className="flex-shrink-0 flex items-center justify-center w-[202px] h-[202px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[32px] overflow-hidden">
                  {headerImage ? (
                    <img
                      src={headerImage}
                      alt={`${badge.name} badge`}
                      className="h-[157px] w-[157px] object-contain drop-shadow-md"
                      style={
                        badge.imageScale && badge.imageScale !== 1
                          ? { transform: `scale(${badge.imageScale})`, transformOrigin: "center" }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 opacity-40" />
                  )}
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span
                    className={`inline-block mb-3 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
                      badge.isIndividual
                        ? "bg-purple-100 text-purple-700"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {badge.isIndividual ? "🏅 Special" : "⬆️ Tiered"}
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">{badge.category}</p>
                  <h2 className="heading text-[34px] font-bold text-black mb-3">{badge.name}</h2>
                  <p className="text-lg text-gray-500 leading-relaxed">{badge.description}</p>
                </div>
              </div>

              {/* Activities */}
              <div className="mb-10">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Activities Included</p>
                <ul className="flex flex-wrap gap-3">
                  {badge.activities.map((act) => (
                    <li
                      key={act}
                      className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-gray-600"
                    >
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tier grid (tiered badges only) */}
              {!badge.isIndividual && badge.tiers && (
                <div className="mb-10">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Tier Requirements</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {badge.tiers.map((t) => {
                      const colors = tierColors[t.tier];
                      return (
                        <div
                          key={t.tier}
                          className="flex flex-col items-center gap-4 rounded-[32px] border p-6"
                          style={{ background: colors.bg, borderColor: colors.border }}
                        >
                          {t.imagePath ? (
                            <img
                              src={t.imagePath}
                              alt={`${t.tier} tier`}
                              className="h-[90px] w-[90px] object-contain drop-shadow-sm"
                            />
                          ) : (
                            <span className="text-4xl">{t.icon}</span>
                          )}
                          <span className="text-[17px] font-bold tracking-wide" style={{ color: colors.text }}>
                            {t.tier}
                          </span>
                          <span className="text-[15px] text-gray-500 text-center leading-tight">{t.requirement}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Badge progression chain */}
              {!badge.isIndividual && badge.progressionNames && (
                <div className="mb-10">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Badge Progression</p>
                  <div className="flex items-center flex-wrap gap-3 text-lg">
                    {badge.progressionNames.map((n, i) => (
                      <span key={n} className="flex items-center gap-3">
                        <span className="font-semibold text-black">{n}</span>
                        {i < badge.progressionNames!.length - 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special badge note */}
              {badge.isIndividual && (
                <div className="rounded-[32px] border border-purple-200 bg-purple-50 px-8 py-6">
                  <p className="text-lg text-purple-600 font-medium leading-relaxed">
                    🌟 This is a <strong>standalone special badge</strong> awarded for a single exceptional achievement. It does not have tiers.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

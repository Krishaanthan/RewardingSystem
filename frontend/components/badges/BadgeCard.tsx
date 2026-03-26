"use client";

import { motion } from "framer-motion";

export type BadgeTier = {
  tier: "Bronze" | "Silver" | "Gold" | "Diamond";
  icon: string;
  requirement: string;
  imagePath?: string; // per-tier badge image
};

export type BadgeCardProps = {
  id: string;
  name: string;
  category: string;
  description: string;
  imagePath: string; // header image (individual badges) or default/fallback (tiered badges)
  activities: string[];
  tiers?: BadgeTier[];
  isIndividual?: boolean;
  progressionNames?: string[];
  /** Override card header area height, e.g. "h-[486px]" */
  headerHeight?: string;
  /** Override main badge image size classes, e.g. "h-[325px] w-[325px]" */
  imageSize?: string;
  /** Zoom factor applied via CSS scale() to crop transparent clearspace (default 1) */
  imageScale?: number;
};

const tierColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Bronze: {
    bg: "rgba(205, 127, 50, 0.12)",
    border: "rgba(205, 127, 50, 0.5)",
    text: "#CD7F32",
    glow: "rgba(205, 127, 50, 0.3)",
  },
  Silver: {
    bg: "rgba(192, 192, 192, 0.12)",
    border: "rgba(192, 192, 192, 0.5)",
    text: "#A0A0A0",
    glow: "rgba(192, 192, 192, 0.3)",
  },
  Gold: {
    bg: "rgba(255, 215, 0, 0.12)",
    border: "rgba(255, 215, 0, 0.5)",
    text: "#C8A400",
    glow: "rgba(255, 215, 0, 0.3)",
  },
  Diamond: {
    bg: "rgba(131, 18, 56, 0.08)",
    border: "rgba(131, 18, 56, 0.4)",
    text: "#831238",
    glow: "rgba(131, 18, 56, 0.25)",
  },
};

export default function BadgeCard({
  name,
  category,
  description,
  imagePath,
  activities,
  tiers,
  isIndividual = false,
  progressionNames,
  headerHeight = "h-[374px]",
  imageSize = "h-[250px] w-[250px]",
  imageScale = 1,
}: BadgeCardProps) {
  // For tiered badges, use the Bronze-tier image as the card header; fall back to prop then placeholder.
  const headerImage =
    !isIndividual && tiers && tiers[0]?.imagePath
      ? tiers[0].imagePath
      : imagePath;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 50px 0 rgba(131,18,56,0.18)" }}
      className="badge-card flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white/60 backdrop-blur-md shadow-md transition-shadow"
    >
      {/* Badge Image Area */}
      <div className={`relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${headerHeight}`}>
        {headerImage ? (
          <img
            src={headerImage}
            alt={`${name} badge`}
            className={`${imageSize} object-contain drop-shadow-md`}
            style={imageScale !== 1 ? { transform: `scale(${imageScale})`, transformOrigin: 'center' } : undefined}
          />
        ) : (
          /* Placeholder shown when no image is provided */
          <div className="flex flex-col items-center gap-2 opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="h-16 w-16 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
              />
            </svg>
            <span className="text-xs font-medium text-gray-500">Badge Image</span>
          </div>
        )}

        {/* Individual / Tiered tag */}
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
            isIndividual
              ? "bg-purple-100 text-purple-700"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isIndividual ? "🏅 Special" : "⬆️ Tiered"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category + Name */}
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">{category}</p>
        <h3 className="heading text-xl font-bold text-black mb-2">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>

        {/* Activities */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Activities Included</p>
          <ul className="flex flex-wrap gap-2">
            {activities.map((act) => (
              <li
                key={act}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {act}
              </li>
            ))}
          </ul>
        </div>

        {/* Tier Table (for tiered badges) */}
        {!isIndividual && tiers && (
          <div className="mt-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tier Requirements</p>
            <div className="grid grid-cols-2 gap-2">
              {tiers.map((t) => {
                const colors = tierColors[t.tier];
                return (
                  <div
                    key={t.tier}
                    className="flex flex-col gap-1 rounded-2xl border px-3 py-2"
                    style={{ background: colors.bg, borderColor: colors.border }}
                  >
                    {/* Tier thumbnail */}
                    {t.imagePath ? (
                      <img
                        src={t.imagePath}
                        alt={`${t.tier} tier`}
                        className="h-[78px] w-[78px] object-contain self-center mb-1 drop-shadow-sm"
                      />
                    ) : (
                      <span className="text-base leading-none">{t.icon}</span>
                    )}
                    <span
                      className="text-[11px] font-bold tracking-wide"
                      style={{ color: colors.text }}
                    >
                      {t.tier}
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">{t.requirement}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Progression names (for tiered badges) */}
        {!isIndividual && progressionNames && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Badge Progression</p>
            <div className="flex items-center flex-wrap gap-1 text-xs text-gray-500">
              {progressionNames.map((n, i) => (
                <span key={n} className="flex items-center gap-1">
                  <span className="font-medium text-black">{n}</span>
                  {i < progressionNames.length - 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-primary">
                      <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Special badge note */}
        {isIndividual && (
          <div className="mt-auto rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3">
            <p className="text-xs text-purple-600 font-medium leading-relaxed">
              🌟 This is a <strong>standalone special badge</strong> awarded for a single exceptional achievement. It does not have tiers.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

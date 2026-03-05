"use client";

import Link from "next/link";
import Image from "next/image";
import { BADGES, BADGE_THEME } from "@/lib/badges";

// Mock: badges earned by current student (from API later)
const EARNED_BADGE_IDS = ["beginner", "participant", "learner", "active-member"];

const LOGO_SRC = "https://www.sathyabama.ac.in/sites/default/files/inline-images/NewRGB_0.jpg";

export default function BadgeAllocationPage() {
  const earnedSet = new Set(EARNED_BADGE_IDS);
  const totalBadges = BADGES.length;
  const earnedCount = EARNED_BADGE_IDS.length;
  const nextBadgeIndex = BADGES.findIndex((b) => !earnedSet.has(b.id));
  const progressToNext = nextBadgeIndex >= 0 ? 85 : 100; // Mock: 85% to next

  return (
    <div className="min-h-screen" style={{ backgroundColor: BADGE_THEME.secondary }}>
      {/* Header: red bar with SATHYABAMA, SKILL STACK, logo */}
      <header
        className="flex items-center justify-between gap-4 px-4 py-3 md:px-6"
        style={{ backgroundColor: BADGE_THEME.primary }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10 md:h-12 md:w-12">
            <Image
              src={LOGO_SRC}
              alt="Sathyabama"
              fill
              className="object-contain p-0.5"
              unoptimized
            />
          </div>
          <div>
            <h1
              className="text-lg font-bold tracking-wide md:text-xl"
              style={{ color: BADGE_THEME.secondary }}
            >
              SATHYABAMA
            </h1>
            <p
              className="text-xs font-medium tracking-wider opacity-95 md:text-sm"
              style={{ color: BADGE_THEME.secondary }}
            >
              SKILL STACK
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2">
          <Link
            href="/student/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            style={{ color: BADGE_THEME.secondary }}
          >
            Dashboard
          </Link>
          <Link
            href="/student/claim-points"
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            style={{ color: BADGE_THEME.secondary }}
          >
            Claim Points
          </Link>
          <Link
            href="/student/my-ledger"
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            style={{ color: BADGE_THEME.secondary }}
          >
            My Ledger
          </Link>
          <Link
            href="/student/leaderboard"
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            style={{ color: BADGE_THEME.secondary }}
          >
            Leaderboard
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold" style={{ color: BADGE_THEME.primary }}>
            Badge System
          </h2>
          <p className="mt-1 text-sm" style={{ color: BADGE_THEME.tertiary }}>
            Badges are awarded when you complete activities and they are verified—not by points.
          </p>
        </section>

        {/* Stats row: Total badges, % to next */}
        <div className="mb-8 flex flex-wrap gap-6">
          <div>
            <p className="text-sm font-medium" style={{ color: BADGE_THEME.tertiary }}>
              Total badges
            </p>
            <p className="text-xl font-bold" style={{ color: BADGE_THEME.primary }}>
              {earnedCount} / {totalBadges}
            </p>
          </div>
          {nextBadgeIndex >= 0 && (
            <div>
              <p className="text-sm font-medium" style={{ color: BADGE_THEME.tertiary }}>
                85% to Next badge
              </p>
              <p className="text-lg font-semibold" style={{ color: BADGE_THEME.primary }}>
                {BADGES[nextBadgeIndex]?.name}
              </p>
              <div
                className="mt-1 h-2 w-40 overflow-hidden rounded-full"
                style={{ backgroundColor: `${BADGE_THEME.primary}20` }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progressToNext}%`,
                    backgroundColor: BADGE_THEME.primary,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Badge train: horizontal connected milestones */}
        <section className="card mb-8 border-2 p-6" style={{ borderColor: `${BADGE_THEME.primary}20` }}>
          <p className="mb-4 text-sm font-medium" style={{ color: BADGE_THEME.tertiary }}>
            All badges (lowest → highest). Achieved badges are highlighted.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
            {BADGES.map((badge, index) => {
              const earned = earnedSet.has(badge.id);
              // Use design.jpeg for all until per-badge images exist under public/badges/design/
              const imgPath = "/badges/design/design.jpeg";
              return (
                <div key={badge.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center rounded-xl border-2 p-3 transition-all ${
                      earned
                        ? "ring-2 ring-offset-2"
                        : "opacity-60"
                    }`}
                    style={{
                      borderColor: earned ? BADGE_THEME.primary : BADGE_THEME.tertiary,
                      backgroundColor: earned ? `${BADGE_THEME.primary}08` : undefined,
                      ...(earned && {
                        boxShadow: `0 0 0 2px ${BADGE_THEME.secondary}, 0 0 0 4px ${BADGE_THEME.primary}`,
                      }),
                    }}
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 md:h-20 md:w-20">
                      <Image
                        src={imgPath}
                        alt={badge.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {!earned && (
                        <div
                          className="absolute inset-0 flex items-center justify-center rounded-lg"
                          style={{ backgroundColor: "rgba(128,128,128,0.4)" }}
                        >
                          <span className="text-2xl">🔒</span>
                        </div>
                      )}
                    </div>
                    <span
                      className="mt-2 max-w-[90px] truncate text-center text-xs font-medium"
                      style={{ color: earned ? BADGE_THEME.primary : BADGE_THEME.tertiary }}
                    >
                      {badge.name.replace(" Badge", "")}
                    </span>
                  </div>
                  {index < BADGES.length - 1 && (
                    <span
                      className="mx-1 hidden text-xl md:mx-2 md:inline"
                      style={{ color: BADGE_THEME.tertiary }}
                      aria-hidden
                    >
                      ➝
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievement details list */}
        <section className="card" style={{ borderColor: `${BADGE_THEME.primary}15` }}>
          <h3 className="text-lg font-semibold" style={{ color: BADGE_THEME.primary }}>
            Achievement details
          </h3>
          <p className="mt-1 text-sm" style={{ color: BADGE_THEME.tertiary }}>
            Each badge is allocated when the corresponding activity is completed and verified.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {BADGES.map((badge) => {
              const earned = earnedSet.has(badge.id);
              return (
                <li
                  key={badge.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                  style={{
                    borderColor: earned ? `${BADGE_THEME.primary}30` : BADGE_THEME.tertiary + "40",
                    backgroundColor: earned ? `${BADGE_THEME.primary}06` : undefined,
                  }}
                >
                  <span className="text-lg">{badge.emoji}</span>
                  <div>
                    <span className="font-medium" style={{ color: BADGE_THEME.primary }}>
                      {badge.name}
                    </span>
                    {earned && (
                      <span className="ml-2 text-xs font-medium" style={{ color: BADGE_THEME.tertiary }}>
                        ✓ Earned
                      </span>
                    )}
                    <p className="mt-0.5" style={{ color: BADGE_THEME.tertiary }}>
                      {badge.description} — {badge.criterion}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import BadgeCard, { BadgeCardProps } from "@/components/badges/BadgeCard";

// ────────────────────────────────────────────────────────────────
//  BADGE DATA
//  To add a badge image, update the `imagePath` field with the
//  path to your image, e.g.:  "/assets/badges/knowledge-seeker.png"
// ────────────────────────────────────────────────────────────────
const TIERED_BADGES: BadgeCardProps[] = [
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    category: "Learning & Certifications",
    description:
      "Awarded to students who actively pursue online courses and certifications to expand their academic and professional skills.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/knowledge-seeker.png"
    activities: [
      "Swayam NPTEL Course",
      "Coursera Course",
      "NPTEL 12-Week Course",
      "External Certification",
      "Global Certification",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Complete 1 course" },
      { tier: "Silver",  icon: "🥈", requirement: "Complete 3 courses" },
      { tier: "Gold",    icon: "🥇", requirement: "Complete 5 courses" },
      { tier: "Diamond", icon: "♦", requirement: "Complete 8+ courses" },
    ],
    progressionNames: ["Knowledge Seeker", "Knowledge Explorer", "Knowledge Master", "Global Scholar"],
  },
  {
    id: "community-impact",
    name: "Community Impact",
    category: "Community & Social",
    description:
      "Recognises students who contribute to society through volunteering, service organisations, and campus community activities.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/community-impact.png"
    activities: [
      "Volunteering",
      "NSS / NCC Activities",
      "Club Activities",
      "Student Chapter Activity",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Participate in 1 activity" },
      { tier: "Silver",  icon: "🥈", requirement: "Participate in 3 activities" },
      { tier: "Gold",    icon: "🥇", requirement: "Participate in 5 activities" },
      { tier: "Diamond", icon: "♦", requirement: "Lead / major involvement" },
    ],
    progressionNames: ["Community Impact", "Community Pillar", "Community Champion", "Community Legend"],
  },
  {
    id: "campus-star",
    name: "Campus Star",
    category: "Campus Engagement",
    description:
      "Celebrates active participation in inter-college events, cultural activities, and sports competitions.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/campus-star.png"
    activities: [
      "Other College Events",
      "Cultural Participation",
      "Sports & Other Activities",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "1 participation" },
      { tier: "Silver",  icon: "🥈", requirement: "3 participations" },
      { tier: "Gold",    icon: "🥇", requirement: "5 participations" },
      { tier: "Diamond", icon: "♦", requirement: "8+ participations" },
    ],
    progressionNames: ["Campus Star", "Campus Icon", "Campus Legend", "Campus Titan"],
  },
  {
    id: "innovation-builder",
    name: "Innovation Builder",
    category: "Research & Development",
    description:
      "Rewards students who push boundaries through research, project development, and student-funded innovations.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/innovation-builder.png"
    activities: [
      "Research",
      "Project",
      "Development",
      "Student Funding Project",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Complete 1 project" },
      { tier: "Silver",  icon: "🥈", requirement: "Complete 2 projects" },
      { tier: "Gold",    icon: "🥇", requirement: "3+ projects" },
      { tier: "Diamond", icon: "♦", requirement: "Funded or impactful project" },
    ],
    progressionNames: ["Innovation Builder", "Innovation Catalyst", "Innovation Pioneer", "Innovation Visionary"],
  },
  {
    id: "leadership-architect",
    name: "Leadership Architect",
    category: "Leadership",
    description:
      "Granted to students who demonstrate leadership by organising events, workshops, and coding contests.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/leadership-architect.png"
    activities: [
      "Organising Events",
      "Conducting Workshops",
      "Conducting Coding Contests",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Organise 1 event" },
      { tier: "Silver",  icon: "🥈", requirement: "Organise 2 events" },
      { tier: "Gold",    icon: "🥇", requirement: "Conduct workshop / contest" },
      { tier: "Diamond", icon: "♦", requirement: "Lead multiple events" },
    ],
    progressionNames: ["Leadership Architect", "Leadership Strategist", "Leadership Commander", "Leadership Visionary"],
  },
  {
    id: "hackathon-hero",
    name: "Hackathon Hero",
    category: "Hackathons",
    description:
      "Celebrates students who compete in hackathons and prove their ability to build under pressure.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/hackathon-hero.png"
    activities: [
      "Hackathon Participation",
      "Winning Hackathon",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Participate in 1 hackathon" },
      { tier: "Silver",  icon: "🥈", requirement: "Participate in 2 hackathons" },
      { tier: "Gold",    icon: "🥇", requirement: "Win 1 hackathon" },
      { tier: "Diamond", icon: "♦", requirement: "Win multiple hackathons" },
    ],
    progressionNames: ["Hackathon Hero", "Hackathon Warrior", "Hackathon Champion", "Hackathon Legend"],
  },
];

const INDIVIDUAL_BADGES: BadgeCardProps[] = [
  {
    id: "academic-excellence",
    name: "Academic Excellence",
    category: "Academics",
    description:
      "A prestigious standalone badge awarded to students who maintain a CGPA above 8.5, reflecting outstanding academic performance.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/academic-excellence.png"
    activities: ["> 8.5 CGPA"],
    isIndividual: true,
  },
  {
    id: "global-explorer",
    name: "Global Explorer",
    category: "Global Experience",
    description:
      "Awarded to students who participate in a study-abroad summer camp, showcasing their commitment to international learning.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/global-explorer.png"
    activities: ["Study Summer Camp Abroad"],
    isIndividual: true,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    category: "Entrepreneurship",
    description:
      "The highest entrepreneurship honour — awarded to students who have a startup that is officially funded and approved.",
    imagePath: "", // ← INSERT image path here, e.g. "/assets/badges/startup-founder.png"
    activities: ["Startup Funded & Approved"],
    isIndividual: true,
  },
];

export default function BadgesPage() {
  return (
    <>
      <style>{`
        .badge-card {
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
      `}</style>

      <div className="relative min-h-screen w-full bg-white text-black font-primary">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28">

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-black/10 pb-6 mb-12"
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
              Achievement System
            </p>
            <h1 className="heading text-3xl font-bold tracking-wide text-black mb-2">
              Badge Collection
            </h1>
            <p className="text-sm text-gray-500 max-w-2xl">
              Earn badges by participating in academic and extracurricular activities.
              Tiered badges upgrade automatically as you complete more activities — Individual badges are
              standalone honours for exceptional achievements.
            </p>
          </motion.header>

          {/* ── Legend ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-12 flex flex-wrap gap-4"
          >
            {[
              { icon: "🥉", label: "Bronze", color: "#CD7F32" },
              { icon: "🥈", label: "Silver", color: "#A0A0A0" },
              { icon: "🥇", label: "Gold",   color: "#C8A400" },
              { icon: "♦", label: "Diamond", color: "#831238" },
              { icon: "🏅", label: "Special (No Tier)", color: "#9333EA" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-black/10 bg-gray-50 px-4 py-2 text-sm"
              >
                <span>{item.icon}</span>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── Tiered Badges Section ── */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-8 w-1 rounded-full bg-primary" />
              <div>
                <h2 className="heading text-2xl font-bold text-black">Tiered Badges</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  These badges have 4 levels: Bronze → Silver → Gold → Diamond
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {TIERED_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <BadgeCard {...badge} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="mb-16 h-px w-full bg-black/10" />

          {/* ── Individual Badges Section ── */}
          <section>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-8 w-1 rounded-full bg-purple-500" />
              <div>
                <h2 className="heading text-2xl font-bold text-black">Special Badges</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Standalone honours — no tiers, just exceptional achievement
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {INDIVIDUAL_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <BadgeCard {...badge} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Footer ── */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center text-xs text-gray-400"
          >
            © 2024 Student Reward System · Badge achievements are verified by AI and faculty review.
          </motion.footer>

        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCardProps } from "@/components/badges/BadgeCard";
import BadgeWidget from "@/components/badges/BadgeWidget";
import BadgeDetailModal from "@/components/badges/BadgeDetailModal";

// All paths are relative to /public — served as static assets by Next.js
const TIERED_BADGES: BadgeCardProps[] = [
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    category: "Learning & Certifications",
    description:
      "Awarded to students who actively pursue online courses and certifications to expand their academic and professional skills.",
    imagePath: "/assets/Badges/knowledge_seeker/bronzeKS.png",
    activities: [
      "Swayam NPTEL Course",
      "Coursera Course",
      "NPTEL 12-Week Course",
      "External Certification",
      "Global Certification",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Complete 1 course",   imagePath: "/assets/Badges/knowledge_seeker/bronzeKS.png" },
      { tier: "Silver",  icon: "🥈", requirement: "Complete 3 courses",  imagePath: "/assets/Badges/knowledge_seeker/silverKS.png" },
      { tier: "Gold",    icon: "🥇", requirement: "Complete 5 courses",  imagePath: "/assets/Badges/knowledge_seeker/goldKS.png" },
      { tier: "Diamond", icon: "♦",  requirement: "Complete 8+ courses", imagePath: "/assets/Badges/knowledge_seeker/diamond KS.png" },
    ],
    progressionNames: ["Knowledge Seeker", "Knowledge Explorer", "Knowledge Master", "Global Scholar"],
  },
  {
    id: "community-impact",
    name: "Community Impact",
    category: "Community & Social",
    description:
      "Recognises students who contribute to society through volunteering, service organisations, and campus community activities.",
    imagePath: "/assets/Badges/community_impact/bronzeCI.png",
    activities: [
      "Volunteering",
      "NSS / NCC Activities",
      "Club Activities",
      "Student Chapter Activity",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Participate in 1 activity",      imagePath: "/assets/Badges/community_impact/bronzeCI.png" },
      { tier: "Silver",  icon: "🥈", requirement: "Participate in 3 activities",    imagePath: "/assets/Badges/community_impact/silverCI.png" },
      { tier: "Gold",    icon: "🥇", requirement: "Participate in 5 activities",    imagePath: "/assets/Badges/community_impact/goldCI.png" },
      { tier: "Diamond", icon: "♦",  requirement: "Lead / major involvement",       imagePath: "/assets/Badges/community_impact/diamondCI.png" },
    ],
    progressionNames: ["Community Impact", "Community Pillar", "Community Champion", "Community Legend"],
  },
  {
    id: "campus-star",
    name: "Campus Star",
    category: "Campus Engagement",
    description:
      "Celebrates active participation in inter-college events, cultural activities, and sports competitions.",
    imagePath: "/assets/Badges/campus_engagement/bronzeCE.png",
    activities: [
      "Other College Events",
      "Cultural Participation",
      "Sports & Other Activities",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "1 participation",   imagePath: "/assets/Badges/campus_engagement/bronzeCE.png" },
      { tier: "Silver",  icon: "🥈", requirement: "3 participations",  imagePath: "/assets/Badges/campus_engagement/silverCE.png" },
      { tier: "Gold",    icon: "🥇", requirement: "5 participations",  imagePath: "/assets/Badges/campus_engagement/gold CE.png" },
      { tier: "Diamond", icon: "♦",  requirement: "8+ participations", imagePath: "/assets/Badges/campus_engagement/diamondCE.png" },
    ],
    progressionNames: ["Campus Star", "Campus Icon", "Campus Legend", "Campus Titan"],
  },
  {
    id: "innovation-builder",
    name: "Innovation Builder",
    category: "Research & Development",
    description:
      "Rewards students who push boundaries through research, project development, and student-funded innovations.",
    imagePath: "/assets/Badges/Innovation_builder/bronzeIB.png",
    activities: [
      "Research",
      "Project",
      "Development",
      "Student Funding Project",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Complete 1 project",          imagePath: "/assets/Badges/Innovation_builder/bronzeIB.png" },
      { tier: "Silver",  icon: "🥈", requirement: "Complete 2 projects",          imagePath: "/assets/Badges/Innovation_builder/SiverIB.png" },
      { tier: "Gold",    icon: "🥇", requirement: "3+ projects",                  imagePath: "/assets/Badges/Innovation_builder/GoldIB.png" },
      { tier: "Diamond", icon: "♦",  requirement: "Funded or impactful project",  imagePath: "/assets/Badges/Innovation_builder/diamondIB.png" },
    ],
    progressionNames: ["Innovation Builder", "Innovation Catalyst", "Innovation Pioneer", "Innovation Visionary"],
  },
  {
    id: "leadership-architect",
    name: "Leadership Architect",
    category: "Leadership",
    description:
      "Granted to students who demonstrate leadership by organising events, workshops, and coding contests.",
    imagePath: "/assets/Badges/Leadership Badge/bronzeLB.png",
    activities: [
      "Organising Events",
      "Conducting Workshops",
      "Conducting Coding Contests",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Organise 1 event",             imagePath: "/assets/Badges/Leadership Badge/bronzeLB.png" },
      { tier: "Silver",  icon: "🥈", requirement: "Organise 2 events",             imagePath: "/assets/Badges/Leadership Badge/silverLB.png" },
      { tier: "Gold",    icon: "🥇", requirement: "Conduct workshop / contest",    imagePath: "/assets/Badges/Leadership Badge/gold LB.png" },
      { tier: "Diamond", icon: "♦",  requirement: "Lead multiple events",          imagePath: "/assets/Badges/Leadership Badge/diamondLB.png" },
    ],
    progressionNames: ["Leadership Architect", "Leadership Strategist", "Leadership Commander", "Leadership Visionary"],
  },
  {
    id: "hackathon-hero",
    name: "Hackathon Hero",
    category: "Hackathons",
    description:
      "Celebrates students who compete in hackathons and prove their ability to build under pressure.",
    imagePath: "/assets/Badges/Hackathon Badge/bronzeHB.png",
    activities: [
      "Hackathon Participation",
      "Winning Hackathon",
    ],
    tiers: [
      { tier: "Bronze",  icon: "🥉", requirement: "Participate in 1 hackathon",  imagePath: "/assets/Badges/Hackathon Badge/bronzeHB.png" },
      { tier: "Silver",  icon: "🥈", requirement: "Participate in 2 hackathons", imagePath: "/assets/Badges/Hackathon Badge/silverHB.png" },
      { tier: "Gold",    icon: "🥇", requirement: "Win 1 hackathon",             imagePath: "/assets/Badges/Hackathon Badge/gold HB.png" },
      { tier: "Diamond", icon: "♦",  requirement: "Win multiple hackathons",     imagePath: "/assets/Badges/Hackathon Badge/DiamondHB.png" },
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
    imagePath: "/assets/Badges/Academic Excellence.png",
    activities: ["> 8.5 CGPA"],
    isIndividual: true,
    imageScale: 1.6,
  },
  {
    id: "global-explorer",
    name: "Global Explorer",
    category: "Global Experience",
    description:
      "Awarded to students who participate in a study-abroad summer camp, showcasing their commitment to international learning.",
    imagePath: "/assets/Badges/Global Exploror.png",
    activities: ["Study Summer Camp Abroad"],
    isIndividual: true,
    imageScale: 1.6,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    category: "Entrepreneurship",
    description:
      "The highest entrepreneurship honour — awarded to students who have a startup that is officially funded and approved.",
    imagePath: "/assets/Badges/Startup Founder.png",
    activities: ["Startup Funded & Approved"],
    isIndividual: true,
  },
];

const ALL_BADGES = [...TIERED_BADGES, ...INDIVIDUAL_BADGES];

export default function BadgesPage() {
  const [selected, setSelected] = useState<BadgeCardProps | null>(null);

  return (
    <>
      <style>{`
        .badge-widget {
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
              Click any badge to explore its tiers, requirements, and progression path.
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
              { icon: "🥉", label: "Bronze",            color: "#CD7F32" },
              { icon: "🥈", label: "Silver",            color: "#A0A0A0" },
              { icon: "🥇", label: "Gold",              color: "#C8A400" },
              { icon: "♦",  label: "Diamond",           color: "#831238" },
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

          {/* ── Tiered Badges ── */}
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
                  These badges have 4 levels: Bronze → Silver → Gold → Diamond. Click to explore.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {TIERED_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                >
                  <BadgeWidget
                    name={badge.name}
                    category={badge.category}
                    imagePath={badge.imagePath}
                    isIndividual={badge.isIndividual}
                    imageScale={badge.imageScale}
                    onSelect={() => setSelected(badge)}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="mb-16 h-px w-full bg-black/10" />

          {/* ── Special Badges ── */}
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
                  Standalone honours — no tiers, just exceptional achievement. Click to explore.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {INDIVIDUAL_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <BadgeWidget
                    name={badge.name}
                    category={badge.category}
                    imagePath={badge.imagePath}
                    isIndividual={badge.isIndividual}
                    imageScale={badge.imageScale}
                    onSelect={() => setSelected(badge)}
                  />
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

      {/* ── Detail modal (rendered outside scroll container) ── */}
      <BadgeDetailModal badge={selected} onClose={() => setSelected(null)} />
    </>
  );
}

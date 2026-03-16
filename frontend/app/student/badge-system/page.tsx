"use client";

import BadgeCard, { type BadgeCardProps } from "@/components/badges/BadgeCard";

const badges: BadgeCardProps[] = [
  {
    id: "badge-academic",
    name: "Knowledge Seeker",
    category: "Academic",
    description: "Awarded for completing online courses and certifications.",
    imagePath: "",
    activities: ["Swayam / NPTEL Course", "Coursera Course", "Global Certificate"],
    tiers: [
      { tier: "Bronze", icon: "🥉", requirement: "1 course completed" },
      { tier: "Silver", icon: "🥈", requirement: "3 courses completed" },
      { tier: "Gold", icon: "🥇", requirement: "6 courses completed" },
      { tier: "Diamond", icon: "💎", requirement: "10+ courses completed" },
    ],
    progressionNames: ["Curious", "Learner", "Scholar", "Expert"],
  },
  {
    id: "badge-hackathon",
    name: "Innovator",
    category: "Technology",
    description: "Recognises participation and victories in hackathons.",
    imagePath: "",
    activities: ["Hackathon Participation", "Winning Hackathon"],
    tiers: [
      { tier: "Bronze", icon: "🥉", requirement: "Participated in 1 hackathon" },
      { tier: "Silver", icon: "🥈", requirement: "Participated in 3 hackathons" },
      { tier: "Gold", icon: "🥇", requirement: "Won a hackathon" },
      { tier: "Diamond", icon: "💎", requirement: "Won 3+ hackathons" },
    ],
    progressionNames: ["Tinkerer", "Builder", "Hacker", "Champion"],
  },
  {
    id: "badge-leadership",
    name: "Leader",
    category: "Leadership",
    description: "For students who organise and conduct events or workshops.",
    imagePath: "",
    activities: ["Organizing Event", "Conducting Workshop", "Conducting Coding Contest"],
    tiers: [
      { tier: "Bronze", icon: "🥉", requirement: "1 event organised" },
      { tier: "Silver", icon: "🥈", requirement: "3 events organised" },
      { tier: "Gold", icon: "🥇", requirement: "5 events organised" },
      { tier: "Diamond", icon: "💎", requirement: "10+ events organised" },
    ],
    progressionNames: ["Volunteer", "Organiser", "Leader", "Visionary"],
  },
  {
    id: "badge-community",
    name: "Community Hero",
    category: "Community",
    description: "Recognises contributions to community and social causes.",
    imagePath: "",
    activities: ["Volunteering", "NCC / NSS Activities", "Club Activities"],
    tiers: [
      { tier: "Bronze", icon: "🥉", requirement: "1 activity completed" },
      { tier: "Silver", icon: "🥈", requirement: "3 activities completed" },
      { tier: "Gold", icon: "🥇", requirement: "6 activities completed" },
      { tier: "Diamond", icon: "💎", requirement: "10+ activities completed" },
    ],
    progressionNames: ["Helper", "Contributor", "Advocate", "Hero"],
  },
  {
    id: "badge-sports",
    name: "Athlete",
    category: "Sports",
    description: "Awarded for participation and achievements in sports.",
    imagePath: "",
    activities: ["Sports Activities"],
    tiers: [
      { tier: "Bronze", icon: "🥉", requirement: "Participated in 1 sport" },
      { tier: "Silver", icon: "🥈", requirement: "Participated in 3 sports" },
      { tier: "Gold", icon: "🥇", requirement: "Won at college level" },
      { tier: "Diamond", icon: "💎", requirement: "Won at national level" },
    ],
    progressionNames: ["Participant", "Competitor", "Winner", "Champion"],
  },
  {
    id: "badge-cultural",
    name: "Creative Spirit",
    category: "Cultural",
    description: "For students who shine in cultural and artistic activities.",
    imagePath: "",
    activities: ["Cultural Participation", "Other College Event"],
    isIndividual: true,
  },
];

export default function BadgeSystemPage() {
  return (
    <div className="relative min-h-screen w-full bg-white font-primary text-black">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-12 md:pt-20">
        {/* Header */}
        <header className="mb-10 border-b border-black/20 pb-6">
          <h1 className="heading text-3xl font-bold tracking-wide text-black">Badge System</h1>
          <p className="mt-1 text-sm font-medium text-black/60">
            Earn badges by participating in activities. Each badge has multiple tiers based on your involvement.
          </p>
        </header>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} />
          ))}
        </div>
      </div>
    </div>
  );
}
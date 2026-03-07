/**
 * Badge definitions for Skill Stack (activity-based, not points).
 * Badges are allocated after verification of the corresponding activity.
 * Order: lowest to highest (train display).
 */
export const BADGE_THEME = {
  primary: "#B22222",
  secondary: "#FFFFFF",
  tertiary: "#808080",
} as const;

export type BadgeId =
  | "beginner"
  | "participant"
  | "learner"
  | "active-member"
  | "performer"
  | "achiever"
  | "rising-star"
  | "champion"
  | "elite"
  | "legend";

export interface BadgeDef {
  id: BadgeId;
  name: string;
  emoji: string;
  description: string;
  criterion: string;
  imageName: string;
  order: number;
}

export const BADGES: BadgeDef[] = [
  {
    id: "beginner" as BadgeId,
    name: "Beginner Badge",
    emoji: "🥉",
    description: "Joined the platform / First activity completed",
    criterion: "First activity completed after verification",
    imageName: "design.jpeg",
    order: 1,
  },
  {
    id: "participant" as BadgeId,
    name: "Participant Badge",
    emoji: "🎫",
    description: "Participated in 1–2 events",
    criterion: "1–2 events participation verified",
    imageName: "design.jpeg",
    order: 2,
  },
  {
    id: "learner" as BadgeId,
    name: "Learner Badge",
    emoji: "📘",
    description: "Completed a course",
    criterion: "Course completion verified",
    imageName: "design.jpeg",
    order: 3,
  },
  {
    id: "active-member" as BadgeId,
    name: "Active Member Badge",
    emoji: "🏅",
    description: "Regular participation (3–5 activities)",
    criterion: "3–5 activities verified",
    imageName: "design.jpeg",
    order: 4,
  },
  {
    id: "performer" as BadgeId,
    name: "Performer Badge",
    emoji: "🌟",
    description: "Consistent performance & submissions",
    criterion: "Consistent performance verified",
    imageName: "design.jpeg",
    order: 5,
  },
  {
    id: "achiever" as BadgeId,
    name: "Achiever Badge",
    emoji: "🥈",
    description: "Won or secured position in an event",
    criterion: "Event win/position verified",
    imageName: "design.jpeg",
    order: 6,
  },
  {
    id: "rising-star" as BadgeId,
    name: "Rising Star Badge",
    emoji: "🚀",
    description: "Multiple achievements & leadership roles",
    criterion: "Multiple achievements & leadership verified",
    imageName: "design.jpeg",
    order: 7,
  },
  {
    id: "champion" as BadgeId,
    name: "Champion Badge",
    emoji: "🏆",
    description: "Major competition winner / Top performer",
    criterion: "Major competition win verified",
    imageName: "design.jpeg",
    order: 8,
  },
  {
    id: "elite" as BadgeId,
    name: "Elite Badge",
    emoji: "💎",
    description: "Outstanding contribution across events",
    criterion: "Outstanding contribution verified",
    imageName: "design.jpeg",
    order: 9,
  },
  {
    id: "legend" as BadgeId,
    name: "Legend Badge",
    emoji: "👑",
    description: "Highest honor for exceptional overall record",
    criterion: "Exceptional overall record verified",
    imageName: "design.jpeg",
    order: 10,
  },
].sort((a, b) => a.order - b.order);

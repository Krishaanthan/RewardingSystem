/**
 * Activity types and their reward points.
 * Used for submissions and submission statuses.
 */
export const ACTIVITY_REWARDS: Record<string, number> = {
  "Swayam NPTEL course": 4,
  "Coursera Course": 3,
  "Volunteering": 2,
  "Hackathon Participation": 2,
  "Winning the hackathon": 5,
  "Conducting Workshop": 2,
  "Organizing an event": 2,
  "Participating in other college event": 3,
  "Cultural Participation": 3,
  "Sports and other activities": 3,
  "NCC/NSS activities": 3,
  "Conducting coding contest": 3,
  "Global Certificate": 6,
  "Club Activities": 2,
  "Student Chapter activity": 2,
  "Research/Project/Development": 4,
  "Study summer camp Abroad": 6,
  "NPTEL 12 week course": 6,
  "External Certification": 4,
  ">8.5 CGPA": 4,
  "Student Funding Project": 8,
  "Startup Funded and approved": 12,
} as const;

export type SubmissionStatus =
  | "ai-processing"
  | "approved"
  | "manual-review"
  | "rejected";

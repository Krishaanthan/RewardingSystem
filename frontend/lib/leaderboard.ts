/**
 * Leaderboard data layer.
 *
 * Currently serves mock data. When the backend is ready, swap the body of
 * `fetchLeaderboard` with a real API call:
 *   const res = await fetch(`/api/v1/leaderboard?${params}`);
 *   return res.json();
 */

export type Trend = "up" | "down" | "same";

export interface LeaderboardStudent {
  id: string;
  name: string;
  initials: string;
  /** Short department code, e.g. "CSE" */
  department: string;
  /** Full programme name matching DEPARTMENTS_WITH_DURATION, e.g. "B.E. Computer Science and Engineering" */
  departmentLabel: string;
  /** 1-based year of study (1, 2, 3 … up to programme duration) */
  yearOfStudy: number;
  /** Optional avatar image URL */
  avatarUrl?: string;
  points: number;
  tasksCompleted: number;
  totalTasks: number;
  trend: Trend;
  badgeCount: number;
}

export interface CurrentUserStats {
  id: string;
  name: string;
  initials: string;
  rank: number;
  points: number;
  tasksCompleted: number;
  totalTasks: number;
  progressPct: number;
}

export interface LeaderboardResponse {
  students: LeaderboardStudent[];
  currentUser: CurrentUserStats;
  totalStudents: number;
  lastUpdated: string;
}

/** Max points used to compute the progress bar percentage. */
export const MAX_POINTS = 4000;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_STUDENTS: LeaderboardStudent[] = [
  {
    id: "s1",
    name: "Priya Sharma",
    initials: "PS",
    department: "CSE",
    departmentLabel: "B.E. Computer Science and Engineering",
    yearOfStudy: 3,
    points: 3120,
    tasksCompleted: 18,
    totalTasks: 50,
    trend: "up",
    badgeCount: 7,
  },
  {
    id: "s2",
    name: "Vikram Singh",
    initials: "VS",
    department: "Mech",
    departmentLabel: "B.E. Mechanical Engineering",
    yearOfStudy: 2,
    avatarUrl: "https://i.pravatar.cc/150?u=vikram",
    points: 2950,
    tasksCompleted: 16,
    totalTasks: 50,
    trend: "up",
    badgeCount: 6,
  },
  {
    id: "s3",
    name: "Aisha Patel",
    initials: "AP",
    department: "Biotech",
    departmentLabel: "B.Tech Biotechnology",
    yearOfStudy: 1,
    avatarUrl: "https://i.pravatar.cc/150?u=aisha",
    points: 2880,
    tasksCompleted: 15,
    totalTasks: 50,
    trend: "same",
    badgeCount: 6,
  },
  {
    id: "s4",
    name: "Rahul Gupta",
    initials: "RG",
    department: "CSE",
    departmentLabel: "B.E. Computer Science and Engineering",
    yearOfStudy: 3,
    points: 2650,
    tasksCompleted: 14,
    totalTasks: 50,
    trend: "up",
    badgeCount: 5,
  },
  {
    id: "s5",
    name: "shaveena",
    initials: "FK",
    department: "ECE",
    departmentLabel: "B.E. Electronics and Communication",
    yearOfStudy: 2,
    points: 2590,
    tasksCompleted: 13,
    totalTasks: 50,
    trend: "down",
    badgeCount: 5,
  },
  {
    id: "s6",
    name: "Karthik R",
    initials: "KR",
    department: "Civil",
    departmentLabel: "B.E. Civil Engineering",
    yearOfStudy: 3,
    points: 2480,
    tasksCompleted: 12,
    totalTasks: 50,
    trend: "up",
    badgeCount: 4,
  },
  {
    id: "s7",
    name: "Sneha Rao",
    initials: "SR",
    department: "Math",
    departmentLabel: "B.Sc. Mathematics",
    yearOfStudy: 1,
    points: 2410,
    tasksCompleted: 11,
    totalTasks: 50,
    trend: "down",
    badgeCount: 4,
  },
  {
    id: "s8",
    name: "Arjun V",
    initials: "AV",
    department: "Physics",
    departmentLabel: "B.Sc. Physics",
    yearOfStudy: 2,
    points: 2350,
    tasksCompleted: 10,
    totalTasks: 50,
    trend: "up",
    badgeCount: 4,
  },
  {
    id: "s9",
    name: "Meera Iyer",
    initials: "MI",
    department: "CSE",
    departmentLabel: "B.E. Computer Science and Engineering",
    yearOfStudy: 1,
    points: 2280,
    tasksCompleted: 12,
    totalTasks: 50,
    trend: "same",
    badgeCount: 3,
  },
  {
    id: "s10",
    name: "Varun Reddy",
    initials: "VR",
    department: "Mech",
    departmentLabel: "B.E. Mechanical Engineering",
    yearOfStudy: 3,
    points: 2210,
    tasksCompleted: 11,
    totalTasks: 50,
    trend: "up",
    badgeCount: 3,
  },
  {
    id: "s11",
    name: "Ananya Nair",
    initials: "AN",
    department: "Biotech",
    departmentLabel: "B.Tech Biotechnology",
    yearOfStudy: 2,
    points: 2150,
    tasksCompleted: 10,
    totalTasks: 50,
    trend: "down",
    badgeCount: 3,
  },
  {
    id: "s12",
    name: "Aditya Joshi",
    initials: "AJ",
    department: "ECE",
    departmentLabel: "B.E. Electronics and Communication",
    yearOfStudy: 4,
    points: 2080,
    tasksCompleted: 9,
    totalTasks: 50,
    trend: "up",
    badgeCount: 3,
  },
  {
    id: "s13",
    name: "Kavya Menon",
    initials: "KM",
    department: "B.Com",
    departmentLabel: "B.Com.",
    yearOfStudy: 2,
    points: 1990,
    tasksCompleted: 9,
    totalTasks: 50,
    trend: "same",
    badgeCount: 2,
  },
  {
    id: "s14",
    name: "Rohan Verma",
    initials: "RV",
    department: "IT",
    departmentLabel: "B.Tech Information Technology",
    yearOfStudy: 3,
    points: 1920,
    tasksCompleted: 8,
    totalTasks: 50,
    trend: "down",
    badgeCount: 2,
  },
  {
    id: "s15",
    name: "Divya S",
    initials: "DS",
    department: "BBA",
    departmentLabel: "B.B.A.",
    yearOfStudy: 1,
    points: 1850,
    tasksCompleted: 8,
    totalTasks: 50,
    trend: "up",
    badgeCount: 2,
  },
  {
    id: "s16",
    name: "Siddharth K",
    initials: "SK",
    department: "Chemical",
    departmentLabel: "B.Tech Chemical Engineering",
    yearOfStudy: 2,
    points: 1780,
    tasksCompleted: 7,
    totalTasks: 50,
    trend: "up",
    badgeCount: 2,
  },
  {
    id: "s17",
    name: "Neha Patel",
    initials: "NP",
    department: "Pharm",
    departmentLabel: "B.Pharm. Pharmacy",
    yearOfStudy: 3,
    points: 1710,
    tasksCompleted: 7,
    totalTasks: 50,
    trend: "down",
    badgeCount: 1,
  },
  {
    id: "s18",
    name: "Vikram C",
    initials: "VC",
    department: "Aero",
    departmentLabel: "B.E. Aeronautical Engineering",
    yearOfStudy: 1,
    points: 1640,
    tasksCompleted: 6,
    totalTasks: 50,
    trend: "same",
    badgeCount: 1,
  },
  {
    id: "s19",
    name: "Pooja R",
    initials: "PR",
    department: "B.Arch",
    departmentLabel: "B.Arch.",
    yearOfStudy: 2,
    points: 1580,
    tasksCompleted: 6,
    totalTasks: 50,
    trend: "up",
    badgeCount: 1,
  },
  {
    id: "s20",
    name: "Rahul M",
    initials: "RM",
    department: "BCA",
    departmentLabel: "B.C.A.",
    yearOfStudy: 1,
    points: 1510,
    tasksCompleted: 5,
    totalTasks: 50,
    trend: "down",
    badgeCount: 1,
  },
  {
    id: "s21",
    name: "Sakshi Verma",
    initials: "SV",
    department: "CSE",
    departmentLabel: "B.E. Computer Science and Engineering",
    yearOfStudy: 4,
    points: 1480,
    tasksCompleted: 4,
    totalTasks: 50,
    trend: "same",
    badgeCount: 1,
  },
  {
    id: "s22",
    name: "Omar Abdullah",
    initials: "OA",
    department: "AI&DS",
    departmentLabel: "B.Tech AI and Data Science",
    yearOfStudy: 2,
    points: 1450,
    tasksCompleted: 6,
    totalTasks: 50,
    trend: "up",
    badgeCount: 1,
  },
  {
    id: "s23",
    name: "Priyanka S",
    initials: "PS",
    department: "Civil",
    departmentLabel: "B.E. Civil Engineering",
    yearOfStudy: 3,
    points: 1410,
    tasksCompleted: 5,
    totalTasks: 50,
    trend: "down",
    badgeCount: 0,
  },
  {
    id: "s24",
    name: "Karan Johar",
    initials: "KJ",
    department: "Math",
    departmentLabel: "B.Sc. Mathematics",
    yearOfStudy: 2,
    points: 1390,
    tasksCompleted: 4,
    totalTasks: 50,
    trend: "same",
    badgeCount: 0,
  },
  {
    id: "s25",
    name: "Dev Patel",
    initials: "DP",
    department: "ECE",
    departmentLabel: "B.E. Electronics and Communication",
    yearOfStudy: 1,
    points: 1360,
    tasksCompleted: 5,
    totalTasks: 50,
    trend: "up",
    badgeCount: 0,
  },
  {
    id: "s26",
    name: "Zoya Akhtar",
    initials: "ZA",
    department: "BioMed",
    departmentLabel: "B.Tech Biomedical Engineering",
    yearOfStudy: 3,
    points: 1320,
    tasksCompleted: 4,
    totalTasks: 50,
    trend: "down",
    badgeCount: 0,
  },
  {
    id: "s27",
    name: "Tanya Sharma",
    initials: "TS",
    department: "Design",
    departmentLabel: "B.Des. Design",
    yearOfStudy: 2,
    points: 1280,
    tasksCompleted: 3,
    totalTasks: 50,
    trend: "same",
    badgeCount: 0,
  },
  {
    id: "s28",
    name: "Aman Gupta",
    initials: "AG",
    department: "IT",
    departmentLabel: "B.Tech Information Technology",
    yearOfStudy: 4,
    points: 1250,
    tasksCompleted: 4,
    totalTasks: 50,
    trend: "up",
    badgeCount: 0,
  },
  {
    id: "s29",
    name: "Shreya Ghoshal",
    initials: "SG",
    department: "Psych",
    departmentLabel: "B.Sc. Psychology",
    yearOfStudy: 1,
    points: 1210,
    tasksCompleted: 3,
    totalTasks: 50,
    trend: "same",
    badgeCount: 0,
  },
  {
    id: "s30",
    name: "Ritika Singh",
    initials: "RS",
    department: "Law",
    departmentLabel: "B.A. LL.B. (Hons.)",
    yearOfStudy: 5,
    points: 1180,
    tasksCompleted: 3,
    totalTasks: 50,
    trend: "down",
    badgeCount: 0,
  },
  {
    id: "s31",
    name: "Vishal Dadlani",
    initials: "VD",
    department: "Mech",
    departmentLabel: "B.E. Mechanical Engineering",
    yearOfStudy: 4,
    points: 1150,
    tasksCompleted: 2,
    totalTasks: 50,
    trend: "up",
    badgeCount: 0,
  },
  {
    id: "s32",
    name: "Mona Singh",
    initials: "MS",
    department: "Nursing",
    departmentLabel: "B.Sc. Nursing",
    yearOfStudy: 2,
    points: 1110,
    tasksCompleted: 2,
    totalTasks: 50,
    trend: "same",
    badgeCount: 0,
  }
];

const MOCK_CURRENT_USER: CurrentUserStats = {
  id: "u1",
  name: "Aman J.",
  initials: "AJ",
  rank: 152,
  points: 980,
  tasksCompleted: 27,
  totalTasks: 50,
  progressPct: 54,
};

// ---------------------------------------------------------------------------
// Fetch function — replace body with real API call when backend is ready.
// e.g. `const res = await fetch('/api/v1/leaderboard?' + new URLSearchParams(params));`
// ---------------------------------------------------------------------------

export async function fetchLeaderboard(_params?: {
  department?: string;
  yearOfStudy?: number;
  timeRange?: "all" | "month";
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<LeaderboardResponse> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 250));

  return {
    students: MOCK_STUDENTS,
    currentUser: MOCK_CURRENT_USER,
    totalStudents: 847,
    lastUpdated: new Date().toISOString(),
  };
}

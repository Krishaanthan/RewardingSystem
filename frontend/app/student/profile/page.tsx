"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// TIER BADGES CONFIG
const TIER_BADGES_CONFIG: Record<string, { title: string; desc: string; basePath: string; unlockReq: string; images: Record<string, string> }> = {
    "knowledge_seeker": {
        title: "Knowledge Seeker",
        desc: "Learning & Certifications",
        basePath: "/assets/Badges/knowledge_seeker",
        unlockReq: "Complete 1 course",
        images: { Bronze: "bronzeKS.png", Silver: "silverKS.png", Gold: "goldKS.png", Diamond: "diamond KS.png" }
    },
    "community_impact": {
        title: "Community Impact",
        desc: "Volunteering, NSS/NCC, Clubs",
        basePath: "/assets/Badges/community_impact",
        unlockReq: "Participate in 1 activity",
        images: { Bronze: "bronzeCI.png", Silver: "silverCI.png", Gold: "goldCI.png", Diamond: "diamondCI.png" }
    },
    "campus_star": {
        title: "Campus Star",
        desc: "Cultural, Sports, College Events",
        basePath: "/assets/Badges/campus_engagement",
        unlockReq: "1 participation",
        images: { Bronze: "bronzeCE.png", Silver: "silverCE.png", Gold: "gold CE.png", Diamond: "diamondCE.png" }
    },
    "hackathon_hero": {
        title: "Hackathon Hero",
        desc: "Hackathon participation and wins",
        basePath: "/assets/Badges/Hackathon Badge",
        unlockReq: "Participate in 1 hackathon",
        images: { Bronze: "bronzeHB.png", Silver: "silverHB.png", Gold: "gold HB.png", Diamond: "DiamondHB.png" }
    },
    "innovation_builder": {
        title: "Innovation Builder",
        desc: "Research, Projects, Funding",
        basePath: "/assets/Badges/Innovation_builder",
        unlockReq: "Complete 1 project",
        images: { Bronze: "bronzeIB.png", Silver: "SiverIB.png", Gold: "GoldIB.png", Diamond: "diamondIB.png" }
    },
    "leadership_architect": {
        title: "Leadership Architect",
        desc: "Organizing events, workshops",
        basePath: "/assets/Badges/Leadership Badge",
        unlockReq: "Organise 1 event",
        images: { Bronze: "bronzeLB.png", Silver: "silverLB.png", Gold: "gold LB.png", Diamond: "diamondLB.png" }
    },
};

const INDIVIDUAL_BADGES_CONFIG = [
    {
        id: "academic_excellence",
        title: "Academic Excellence",
        desc: "> 8.5 CGPA Achieved",
        image: "/assets/Badges/Academic Excellence.png",
        imageScale: 1.6,
    },
    {
        id: "global_explorer",
        title: "Global Explorer",
        desc: "Study Summer Camp Abroad",
        image: "/assets/Badges/Global Exploror.png",
        imageScale: 1.6,
    },
    {
        id: "startup_founder",
        title: "Startup Founder",
        desc: "Startup Funded & Approved",
        image: "/assets/Badges/Startup Founder.png",
    },
];

const TIER_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    Diamond: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/40", glow: "shadow-[0_0_15px_rgba(131,18,56,0.3)]" },
    Gold: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-400", glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]" },
    Silver: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-400", glow: "shadow-[0_0_15px_rgba(156,163,175,0.3)]" },
    Bronze: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-400", glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]" },
    Locked: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", glow: "" },
};

export default function ProfileDashboard() {
    const [student, setStudent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:8000/api/student/profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();
                setStudent(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white text-black">
                <p>Unable to load profile. Please log in again.</p>
            </div>
        );
    }

    const initials = student.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

    // Dynamically calculate tier badges and special badges based on student data
    const earnedBadgesMap = new Map<string, any>((student.badges || []).map((b: any) => [b.category, b]));

    const tierBadges = Object.entries(TIER_BADGES_CONFIG).map(([id, config]) => {
        const earned = earnedBadgesMap.get(id);
        const isLocked = !earned;
        const tier = earned ? earned.tier : "Locked";
        const progress = earned && earned.next_required ? Math.round((earned.current / earned.next_required) * 100) : (earned ? 100 : 0);
        
        let nextTier = null;
        let actsToNext = 0;
        if (earned && earned.next_required) {
            actsToNext = earned.next_required - earned.current;
            const tiers = ["Bronze", "Silver", "Gold", "Diamond"];
            const curIdx = tiers.indexOf(tier);
            if (curIdx >= 0 && curIdx < tiers.length - 1) {
                nextTier = tiers[curIdx + 1];
            }
        } else if (!earned) {
            nextTier = "Bronze";
            // For bronze, we assume the first target is generally threshold count 1
            actsToNext = 1; 
        }

        const imageFile = isLocked ? config.images.Bronze : config.images[tier];
        const image = `${config.basePath}/${imageFile}`;

        return {
            id,
            title: config.title,
            desc: config.desc,
            unlockReq: config.unlockReq,
            tier,
            image,
            progress,
            nextTier,
            actsToNext
        };
    });

    const individualBadges = INDIVIDUAL_BADGES_CONFIG.map(config => {
        const earned = earnedBadgesMap.has(config.id);
        return {
            ...config,
            earned
        };
    });

    return (
        <>
            <style>{`
        /* Glass card matching the existing theme */
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.3);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.45);
          transform: translateY(-2px);
        }
        
        .badge-img {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .badge-card:hover .badge-img {
          transform: scale(1.1) rotate(3deg);
        }
      `}</style>

            <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
                {/* Scrollable Content Container */}
                <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">

                    <div className="mx-auto flex min-h-full max-w-6xl flex-col px-6 pb-12 pt-28 font-primary">

                        {/* 1. Student Profile Header */}
                        <main className="card w-full p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">

                            {/* Profile Picture (Initials) */}
                            <div className="relative shrink-0">
                                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white shadow-[0_8px_24px_rgba(131,18,56,0.35)]">
                                    {initials}
                                </div>
                                <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-white bg-green-500"></div>
                            </div>

                            {/* Profile Details & Summary */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-extrabold tracking-tight text-black flex items-center justify-center md:justify-start gap-3">
                                    {student.name}
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                                        {student.registration_number}
                                    </span>
                                </h1>
                                <p className="mt-2 text-black/70 font-medium">
                                    {student.department} &bull; {student.current_year} {student.section ? `&bull; Section ${student.section}` : ""}
                                </p>

                                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="flex flex-col items-center md:items-start rounded-2xl bg-white/60 border border-black/10 px-5 py-3 min-w-[120px]">
                                        <span className="text-xs font-bold uppercase tracking-wider text-black/50">Total Points</span>
                                        <span className="text-2xl font-black text-primary">{student.total_points.toLocaleString()}</span>
                                    </div>

                                    <div className="flex flex-col items-center md:items-start rounded-2xl bg-white/60 border border-black/10 px-5 py-3 min-w-[120px]">
                                        <span className="text-xs font-bold uppercase tracking-wider text-black/50">Top Tier</span>
                                        <span className="text-xl font-black text-primary mt-1 flex items-center gap-1">
                                            ♦ Diamond
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* 2. Badge System Logic - Tier Upgrading Badges */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-primary"></div>
                            <h2 className="heading text-2xl font-semibold tracking-wide text-black">Progression Tracks</h2>
                        </div>
                        <p className="mb-8 text-black/70 max-w-2xl">
                            Level up your tier in these core academic and extracurricular tracks.
                            Earn points in a specific category to upgrade your badge from Bronze to Diamond.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                            {tierBadges.map((badge) => {
                                const colors = TIER_COLORS[badge.tier];
                                const isLocked = badge.tier === "Locked";

                                return (
                                    <div key={badge.id} className="card badge-card relative flex flex-col p-6 overflow-hidden group cursor-pointer">
                                        {/* Tier Glow/Border Indicator */}
                                        {!isLocked && (
                                            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-40 mix-blend-multiply ${colors.bg}`}></div>
                                        )}

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className={`rounded-xl border px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${colors.bg} ${colors.text} ${colors.border}`}>
                                                {isLocked && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {badge.tier}
                                            </div>
                                            <div className="h-24 w-24 shrink-0 drop-shadow-lg flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={badge.image}
                                                    alt={badge.title}
                                                    className={`badge-img h-full w-full object-contain ${isLocked ? "opacity-30 grayscale" : ""}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex-1">
                                            <h3 className={`text-lg font-bold ${isLocked ? "text-black/50" : "text-black"}`}>
                                                {badge.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-black/60">{badge.desc}</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-6 relative z-10">
                                            {isLocked ? (
                                                <>
                                                    <div className="flex justify-between text-xs font-bold mb-2">
                                                        <span className="text-black/50">{badge.unlockReq}</span>
                                                        <span className="text-black/40">0/1</span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full bg-gray-300 transition-all duration-1000`}
                                                            style={{ width: `0%` }}
                                                        ></div>
                                                    </div>
                                                </>
                                            ) : badge.nextTier ? (
                                                <>
                                                    <div className="flex justify-between text-xs font-bold mb-2">
                                                        <span className="text-black">{badge.progress}% to {badge.nextTier}</span>
                                                        <span className="text-primary">{badge.actsToNext} acts left</span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${colors.bg.replace('50', '500').replace('100', '400')} transition-all duration-1000`}
                                                            style={{ width: `${badge.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                                    </svg>
                                                    Max Tier Reached
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 3. Individual Badges */}
                        <div className="mb-6 flex items-center gap-3 mt-8">
                            <div className="h-8 w-1 rounded-full bg-primary"></div>
                            <h2 className="heading text-2xl font-semibold tracking-wide text-black">Special Achievements</h2>
                        </div>
                        <p className="mb-8 text-black/70 max-w-2xl">
                            Standalone badges awarded for exceptional, one-time accomplishments.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {individualBadges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className={`badge-card relative flex flex-col items-center justify-center p-6 text-center transition-all duration-300 rounded-[2rem] border ${badge.earned ? 'bg-primary/5 border-primary/20 hover:border-primary/40 shadow-sm' : 'bg-black/5 border-black/10 opacity-60 grayscale'}`}
                                >
                                    <div className="h-24 w-24 mb-4 drop-shadow-md flex items-center justify-center overflow-hidden">
                                        <img
                                            src={badge.image}
                                            alt={badge.title}
                                            className={`badge-img h-full w-full object-contain`}
                                            style={badge.imageScale ? { transform: `scale(${badge.imageScale})`, transformOrigin: 'center' } : undefined}
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-black mb-1 leading-tight">
                                        {badge.title}
                                    </h3>
                                    <p className="text-xs text-black/60 hidden md:block">
                                        {badge.desc}
                                    </p>

                                    {badge.earned && (
                                        <div className="absolute top-4 right-4 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497a4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 py-8 text-center text-xs text-black/50 border-t border-black/10">
                            © 2024 Academic Points Portal. Emphasizing extracurricular achievement.
                        </footer>
                    </div>
                </div>
            </div >
        </>
    );
}

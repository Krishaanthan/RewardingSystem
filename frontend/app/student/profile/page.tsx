"use client";

import Link from "next/link";
import { useState } from "react";

// Mock Data
const STUDENT = {
    name: "Akash Smith",
    id: "STU-2024-0412",
    department: "Computer Science",
    year: "Year 2",
    totalPoints: 2310,
    avatar: "/assets/profile-placeholder.png", // Or generic gradient
};

const TIER_BADGES = [
    {
        id: "knowledge-seeker",
        title: "Knowledge Seeker",
        desc: "Learning & Certifications",
        tier: "Diamond",
        image: "/assets/Badges/knowledge_seeker/diamond KS.png",
        progress: 100, // max level
        nextTier: null,
    },
    {
        id: "community-impact",
        title: "Community Impact",
        desc: "Volunteering, NSS/NCC, Clubs",
        tier: "Silver",
        image: "/assets/Badges/community_impact/silverCI.png",
        progress: 50,
        nextTier: "Gold",
        ptsToNext: 300,
    },
    {
        id: "campus-star",
        title: "Campus Star",
        desc: "Cultural, Sports, College Events",
        tier: "Gold",
        image: "/assets/Badges/campus_engagement/gold CE.png",
        progress: 85,
        nextTier: "Diamond",
        ptsToNext: 150,
    },
    {
        id: "hackathon-hero",
        title: "Hackathon Hero",
        desc: "Hackathon participation and wins",
        tier: "Bronze",
        image: "/assets/Badges/Hackathon Badge/bronzeHB.png",
        progress: 20,
        nextTier: "Silver",
        ptsToNext: 400,
    },
    {
        id: "innovation-builder",
        title: "Innovation Builder",
        desc: "Research, Projects, Funding",
        tier: "Locked",
        image: "/assets/Badges/Innovation_builder/bronzeIB.png",
        progress: 0,
        nextTier: "Bronze",
        ptsToNext: 100,
    },
    {
        id: "leadership-architect",
        title: "Leadership Architect",
        desc: "Organizing events, workshops",
        tier: "Locked",
        image: "/assets/Badges/Leadership Badge/bronzeLB.png",
        progress: 0,
        nextTier: "Bronze",
        ptsToNext: 100,
    },
];

const INDIVIDUAL_BADGES = [
    {
        id: "academic-excellence",
        title: "Academic Excellence",
        desc: "> 8.5 CGPA Achieved",
        earned: true,
        image: "/assets/Badges/Academic Excellence.png",
        imageScale: 1.6,
    },
    {
        id: "global-explorer",
        title: "Global Explorer",
        desc: "Study Summer Camp Abroad",
        earned: false,
        image: "/assets/Badges/Global Exploror.png",
        imageScale: 1.6,
    },
    {
        id: "startup-founder",
        title: "Startup Founder",
        desc: "Startup Funded & Approved",
        earned: false,
        image: "/assets/Badges/Startup Founder.png",
    },
];

const TIER_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    Diamond: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/40", glow: "shadow-[0_0_15px_rgba(131,18,56,0.3)]" },
    Gold: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-400", glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]" },
    Silver: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-400", glow: "shadow-[0_0_15px_rgba(156,163,175,0.3)]" },
    Bronze: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-400", glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]" },
    Locked: { bg: "bg-gray-50", text: "text-gray-400", border: "border-gray-200", glow: "" },
};

export default function ProfileDashboard() {
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

                            {/* Profile Picture (Gradient Placeholder) */}
                            <div className="relative shrink-0">
                                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white shadow-[0_8px_24px_rgba(131,18,56,0.35)]">
                                    AS
                                </div>
                                {/* Status Dot */}
                                <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-white bg-green-500"></div>
                            </div>

                            {/* Profile Details & Summary */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-extrabold tracking-tight text-black flex items-center justify-center md:justify-start gap-3">
                                    {STUDENT.name}
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                                        {STUDENT.id}
                                    </span>
                                </h1>
                                <p className="mt-2 text-black/70 font-medium">
                                    {STUDENT.department} &bull; {STUDENT.year}
                                </p>

                                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="flex flex-col items-center md:items-start rounded-2xl bg-white/60 border border-black/10 px-5 py-3 min-w-[120px]">
                                        <span className="text-xs font-bold uppercase tracking-wider text-black/50">Total Points</span>
                                        <span className="text-2xl font-black text-primary">{STUDENT.totalPoints.toLocaleString()}</span>
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
                            {TIER_BADGES.map((badge) => {
                                const colors = TIER_COLORS[badge.tier];
                                const isLocked = badge.tier === "Locked";

                                return (
                                    <div key={badge.id} className="card badge-card relative flex flex-col p-6 overflow-hidden group cursor-pointer">
                                        {/* Tier Glow/Border Indicator */}
                                        {!isLocked && (
                                            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-40 mix-blend-multiply ${colors.bg}`}></div>
                                        )}

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className={`rounded-xl border px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border}`}>
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
                                                <div className="flex items-center gap-2 text-xs font-semibold text-black/40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                                    </svg>
                                                    Unlock by participating
                                                </div>
                                            ) : badge.nextTier ? (
                                                <>
                                                    <div className="flex justify-between text-xs font-bold mb-2">
                                                        <span className="text-black">{badge.progress}% to {badge.nextTier}</span>
                                                        <span className="text-primary">{badge.ptsToNext} pts left</span>
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
                            {INDIVIDUAL_BADGES.map((badge) => (
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
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
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

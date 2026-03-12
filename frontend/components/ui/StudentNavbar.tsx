"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function StudentNavbar() {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down past threshold
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const navItems = [
        { name: "Home", path: "/homepage" },
        { name: "Claim Points", path: "/student/claim-points" },
        { name: "Dashboard", path: "/student/dashboard" },
        { name: "Leaderboard", path: "/student/leaderboard" },
    ];

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between bg-white/95 backdrop-blur-md px-6 h-20 font-primary border-b border-[#831238]/10 shadow-sm transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            {/* Top Primary Color Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#831238]" />

            {/* Elegant Line Pattern Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
                style={{
                  backgroundImage: `repeating-linear-gradient(-45deg, #831238 0, #831238 1px, transparent 1px, transparent 12px)`
                }}
            />

            {/* Bottom Glowing Gradient Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#831238]/50 to-transparent pointer-events-none" />

            {/* Brand */}
            <div className="flex items-center">
                <Link href="/homepage" className="flex items-center">
                    <img src="/assets/logo.svg" alt="Logo" className="h-[60px] w-auto object-contain" />
                </Link>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.path ||
                        (item.path === "/student/claim-points" && pathname === "/student/submission-statuses");
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                ? "bg-[#831238] text-white shadow-[0_4px_14px_0_rgba(131,18,56,0.25)]"
                                : "text-gray-600 hover:bg-[#831238]/10 hover:text-[#831238]"
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center" ref={dropdownRef}>
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#831238]/20 ${
                        isProfileOpen ? "bg-[#831238]/5 border-[#831238]/20" : "bg-white hover:bg-[#831238]/5 hover:border-[#831238]/20"
                    }`}
                    aria-label="Profile menu"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#831238] text-white shadow-[0_2px_8px_rgba(131,18,56,0.3)]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-wide">Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform duration-300 ${isProfileOpen ? "text-[#831238] rotate-180" : "text-gray-400"}`}>
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                <div
                    className={`absolute right-0 top-[calc(100%+8px)] w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-200 ease-out ${isProfileOpen ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 -translate-y-2"
                        }`}
                >
                    <div className="flex flex-col text-sm text-gray-700">
                        <Link
                            href="/student/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-gray-100 hover:text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            Your Profile
                        </Link>
                        <Link
                            href="/student/badges"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-gray-100 hover:text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                                />
                            </svg>
                            Badges
                        </Link>
                        <div className="my-1 h-px w-full bg-gray-100" />
                        <Link
                            href="/student-login"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-red-600 transition-colors hover:bg-red-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

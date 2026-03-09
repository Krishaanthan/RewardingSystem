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
        { name: "Home", path: "/student/home" },
        { name: "Claim Points", path: "/student/claim-points" },
        { name: "Dashboard", path: "/student/dashboard" },
        { name: "Leaderboard", path: "/student/leaderboard" },
    ];

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between bg-white px-6 h-20 font-sans transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            {/* Brand */}
            <div className="flex items-center">
                <Link href="/student/home" className="flex items-center">
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
                            className={`relative px-1 py-1 text-[15px] transition-colors ${isActive
                                ? "font-semibold text-black"
                                : "font-medium text-gray-500 hover:text-black"
                                }`}
                        >
                            {item.name}
                            {isActive && (
                                <span className="absolute -bottom-2 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-black"></span>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center" ref={dropdownRef}>
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-label="Profile menu"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-black">Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                <div
                    className={`absolute right-0 top-full mt-2 w-48 origin-top-right rounded-2xl border border-gray-100 bg-white p-1.5 shadow-lg transition-all duration-200 ease-in-out ${isProfileOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
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
                        <div className="my-1 h-px w-full bg-gray-100" />
                        <Link
                            href="/logout"
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

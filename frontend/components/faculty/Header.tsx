'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { facultyNav } from '@/lib/nav';

export function Header() {
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
    document.addEventListener('mousedown', handleClickOutside);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between bg-white px-6 h-20 font-sans transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } border-b border-black/10`}
    >
      {/* Brand */}
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/assets/logo.svg" alt="Logo" className="h-[60px] w-auto object-contain" />
        </div>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
        {facultyNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative px-1 py-1 text-[15px] transition-colors ${
                isActive ? 'font-semibold text-black' : 'font-medium text-gray-500 hover:text-black'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-[#B22222]"></span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {/* Profile Section */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#831238]/20 ${
              isProfileOpen ? 'bg-[#831238]/5 border-[#831238]/20' : 'bg-white hover:bg-[#831238]/5 hover:border-[#831238]/20'
            }`}
            aria-label="Profile menu"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#831238] text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(131,18,56,0.3)]">
              DR
            </div>
            <span className="text-sm font-bold text-gray-800 tracking-wide">Dr. Ramesh</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform duration-300 ${
                isProfileOpen ? 'text-[#831238] rotate-180' : 'text-gray-400'
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+8px)] w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-200 ease-out ${
              isProfileOpen
                ? 'scale-100 opacity-100 translate-y-0'
                : 'pointer-events-none scale-95 opacity-0 -translate-y-2'
            }`}
          >
            <div className="flex flex-col text-sm text-gray-700">
              <Link
                href="/faculty/profile"
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
                Faculty Profile
              </Link>
              <div className="my-1 h-px w-full bg-gray-100" />
              <Link
                href="/faculty-login"
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
      </div>
    </nav>
  );
}

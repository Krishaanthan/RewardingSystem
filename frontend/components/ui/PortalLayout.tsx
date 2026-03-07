"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

export function PortalLayout({
  title,
  description, // Now unused in the header visually, but kept for interface compatibility
  navItems,
  children
}: {
  title: string;
  description: string;
  navItems: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 py-4">
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#8F113B] shadow-sm">
              <svg className="h-[20px] w-[20px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-[19px] font-bold tracking-tight text-[#1F2937] font-secondary">{title}</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href || item.label === "My Ledger"; // Hardcoded fallback match based on image
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-6 text-[14px] font-semibold transition-colors ${
                    isActive ? "text-[#111827]" : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#8F113B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Bell & Avatar */}
          <div className="flex items-center gap-5 py-4">
            <button 
              type="button"
              aria-label="Notifications"
              className="relative text-[#6B7280] hover:text-[#111827] transition-colors p-1"
            >
              <svg className="h-[22px] w-[22px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
              <span className="absolute top-[4px] right-[4px] h-[8px] w-[8px] rounded-full bg-[#E11D48] border-[1.5px] border-white"></span>
            </button>
            <div className="h-[34px] w-[34px] overflow-hidden rounded-full border border-[#E5E7EB] bg-gray-100 shadow-sm">
              <img src="https://i.pravatar.cc/150?img=44" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}

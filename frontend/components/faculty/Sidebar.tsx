'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}
function QueueIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
function AwardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      <path d="M9 11l3 3 4-4" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const navItems = [
  { label: 'Dashboard', href: '/faculty/dashboard', icon: <DashboardIcon />, badge: null },
  { label: 'Review Queue', href: '/faculty/review-queue', icon: <QueueIcon />, badge: '7' },
  { label: 'Audit Log', href: '/faculty/audit-log', icon: <AuditIcon />, badge: null },
  { label: 'Direct Award', href: '/faculty/direct-award', icon: <AwardIcon />, badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-[230px] flex-col border-r border-faculty-border bg-white"
      style={{ width: '230px', top: '64px' }}
    >
      <p
        className="mt-5 px-5 text-[10px] font-medium uppercase tracking-widest text-faculty-text-muted"
        style={{ letterSpacing: '1.5px' }}
      >
        NAVIGATION
      </p>
      <nav className="mt-3 flex flex-1 flex-col">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between border-l-[3px] py-[11px] pl-5 pr-5 font-league-spartan text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-faculty-primary bg-[#fdf2f5] text-faculty-primary'
                  : 'border-transparent text-faculty-text-main hover:border-faculty-primary hover:bg-[#fdf2f5] hover:text-faculty-primary'
              }`}
              style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '11px', paddingBottom: '11px' }}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {item.badge != null ? (
                <span className="rounded-full bg-faculty-danger px-2 py-0.5 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-faculty-border">
        <Link
          href="/faculty-login"
          className="flex items-center gap-2 border-l-[3px] border-transparent py-[11px] pl-5 pr-5 font-league-spartan text-sm font-semibold text-faculty-text-main hover:border-faculty-primary hover:bg-[#fdf2f5] hover:text-faculty-primary"
          style={{ paddingLeft: '20px', paddingRight: '20px' }}
        >
          <LogoutIcon />
          Logout
        </Link>
      </div>
    </aside>
  );
}

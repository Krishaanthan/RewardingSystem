'use client';

export function Header() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-faculty-primary px-6"
      style={{ height: '64px' }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white font-archivo-black text-faculty-primary"
          style={{ fontSize: '14px' }}
        >
          SI
        </div>
        <div>
          <p className="font-league-spartan text-base font-bold text-white">
            SATHYABAMA
          </p>
          <p
            className="text-[10px] text-white"
            style={{ opacity: 0.85 }}
          >
            Institute of Science and Technology (Deemed to be University)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="rounded-full bg-white/20 px-3 py-1 font-archivo-black text-[10px] tracking-widest text-white"
          style={{ letterSpacing: '1px' }}
        >
          FACULTY PORTAL
        </span>
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white font-archivo-black text-sm text-faculty-primary"
          style={{ width: '36px', height: '36px' }}
        >
          DR
        </div>
      </div>
    </header>
  );
}

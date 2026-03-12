export function Footer() {
  return (
    <footer className="relative z-20 bg-white border-t border-brand-primary/10 mt-20 overflow-hidden">
      {/* Elegant Red Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary/60" />

      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-brand-primary opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-primary opacity-[0.02] blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
          
          {/* Left: Branding & Copy */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                CampusCred
              </span>
              <span className="px-2.5 py-1 rounded-md bg-brand-tertiary text-brand-primary text-[10px] uppercase font-bold tracking-widest border border-brand-primary/10">
                v1.0.0-beta
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              &copy; 2026 Student Rewarding System. All rights reserved.
            </p>
          </div>

          {/* Middle: Developer Credit */}
          <div className="text-sm text-gray-400 font-medium text-center bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100">
            Designed & Developed by <span className="text-brand-primary font-bold tracking-wide">Campus Innovators</span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-8 text-sm font-semibold text-gray-500">
            <a href="#" className="relative group hover:text-brand-primary transition-colors focus:outline-none rounded-sm">
              <span>Privacy Policy</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group hover:text-brand-primary transition-colors focus:outline-none rounded-sm">
              <span>IT Helpdesk Support</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

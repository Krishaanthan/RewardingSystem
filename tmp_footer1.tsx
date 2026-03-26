export function Footer() {
  return (
    <footer className="relative z-20 mt-20 overflow-hidden font-primary border-t-4 border-[#831238]" style={{ backgroundColor: "#1c040c" }}>
      {/* Decorative inner gradient to give depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#831238]/10 to-transparent pointer-events-none" />

      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#831238] opacity-[0.05] blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#831238] opacity-[0.05] blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left: Branding & Copy */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                <img src="/assets/logo.svg" alt="CampusCred Logo" className="h-[38px] w-auto object-contain" />
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#831238]/20 text-[#ffb6c1] text-[10px] uppercase font-black tracking-widest border border-[#831238]/30">
                v1.0.0-beta
              </span>
            </div>
            <p className="text-sm text-gray-400 font-medium">
              &copy; 2026 Student Rewarding System. All rights reserved.
            </p>
          </div>

          {/* Middle: Developer Credit */}
          <div className="text-sm text-gray-300 font-medium text-center bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
            Designed & Developed by <span className="text-[#ffb6c1] font-bold tracking-wide">Coffee Compiled and Team</span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-10 text-sm font-semibold text-gray-400">
            <a href="#" className="relative group hover:text-white transition-colors focus:outline-none rounded-sm">
              <span>Privacy Policy</span>
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#831238] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group hover:text-white transition-colors focus:outline-none rounded-sm">
              <span>IT Helpdesk Support</span>
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#831238] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

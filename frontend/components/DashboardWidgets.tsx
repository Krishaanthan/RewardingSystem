import { ArrowUpRight, TrendingUp, Trophy, ChevronRight, CheckCircle2, Award, Calendar, Clock, MoreHorizontal, Star, PieChart, Briefcase, Wallet, BadgeCheck, FileText, List, Shield } from "lucide-react";

export function PointsOverview() {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden h-full">
            <div className="flex justify-between items-start z-10 relative">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Points Overview</h2>
                <div className="text-maroon-800">
                    <Star className="h-5 w-5 fill-current" />
                </div>
            </div>
            <div className="mt-2 z-10 relative">
                <div className="text-[2.5rem] leading-none font-bold text-maroon-800 tracking-tight">14,500</div>
                <div className="text-xs font-semibold text-gray-800 mt-1 uppercase tracking-widest">POINTS</div>
            </div>
            <div className="mt-4 h-24 w-full relative -mx-5 -mb-5 px-5 scale-x-110">
                <svg viewBox="0 0 400 100" className="w-full h-full preserve-aspect-ratio-none">
                    <defs>
                        <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#800000" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,100 L0,70 Q 20,50 40,65 T 80,45 T 120,60 T 160,30 T 200,50 T 240,25 T 280,40 T 320,15 T 360,30 T 400,10 L400,100 Z"
                        fill="url(#pointsGradient)"
                    />
                    <path
                        d="M0,70 Q 20,50 40,65 T 80,45 T 120,60 T 160,30 T 200,50 T 240,25 T 280,40 T 320,15 T 360,30 T 400,10"
                        fill="none"
                        stroke="#800000"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="absolute bottom-3 left-5 right-5 flex justify-between text-[10px] text-gray-500 font-medium uppercase">
                <span>30 days</span>
                <span>30 days</span>
            </div>
        </div>
    );
}

export function CreditProgress() {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (42 / 120) * circumference;

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Credit Progress</h2>
                <div className="text-maroon-800">
                    <PieChart className="h-5 w-5 fill-current" />
                </div>
            </div>
            <div className="mt-4 flex flex-row items-center gap-5">
                <div className="relative flex items-center justify-center">
                    <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                            className="text-gray-100"
                            strokeWidth="12"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="48"
                            cy="48"
                        />
                        <circle
                            className="text-maroon-800 transition-all duration-1000 ease-in-out"
                            strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="48"
                            cy="48"
                        />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">42 <span className="text-xl text-gray-800">/ 120</span></span>
                    <span className="text-sm font-semibold text-gray-600 mt-1">Credits Completed</span>
                </div>
            </div>
            <p className="mt-4 text-xs font-medium text-gray-800 pt-3 border-t border-gray-100 w-full text-center">Degree: B.Sc. Computer Science</p>
        </div>
    );
}

export function ActiveLedger() {
    return (
        <div className="bg-[#f8f5f5] rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden h-full">
            <div className="flex items-center justify-between z-10 relative">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Active Ledger</h2>
                <Wallet className="h-5 w-5 text-maroon-800" />
            </div>
            <div className="mt-1 z-10 relative">
                <span className="text-[2.5rem] leading-none font-bold text-maroon-800 tracking-tight">$350.00</span>
            </div>

            <div className="relative h-44 w-full mt-6 z-10">
                {/* Card 3 (Bottom) - Bronze */}
                <div className="absolute bottom-0 left-0 right-0 h-16 rounded-xl bg-gradient-to-r from-[#d4af37]/30 to-[#a67c00]/30 backdrop-blur-md border border-white/60 shadow-md transition-transform hover:-translate-y-1 z-10 flex items-center justify-between px-4 translate-y-3 scale-90">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#8a5a44] p-1.5 rounded text-white"><Briefcase className="h-4 w-4" /></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Student Employment</p>
                            <p className="text-xs text-gray-600">Aug 05</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$100.00</span>
                </div>
                {/* Card 2 (Middle) - Silver/White */}
                <div className="absolute bottom-6 left-0 right-0 h-16 rounded-xl bg-white border border-gray-200 shadow-lg transition-transform hover:-translate-y-1 z-20 flex items-center justify-between px-4 translate-y-1 scale-95">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-1.5 rounded border border-gray-200 text-maroon-800"><BadgeCheck className="h-4 w-4" /></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Academic Grant</p>
                            <p className="text-xs text-gray-600">Aug 20</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$100.00</span>
                </div>
                {/* Card 1 (Top) - Gold Gradient */}
                <div className="absolute bottom-12 left-0 right-0 h-16 rounded-xl bg-gradient-to-r from-[#f9f1e1] to-[#e6c17a] shadow-xl shadow-black/10 border border-[#d4af37]/40 transition-transform hover:-translate-y-1 z-30 flex items-center justify-between px-4">
                    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-maroon-800 to-transparent opacity-10 rounded-t-xl"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="bg-maroon-800 p-1.5 rounded text-white"><FileText className="h-4 w-4" /></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Sponsor Financed</p>
                            <p className="text-xs text-gray-800 font-medium">Sep 15</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 relative z-10">$150.00</span>
                </div>
            </div>
        </div>
    );
}

export function AcademicRank() {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group h-full min-h-[160px]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-maroon-800/5 rounded-full blur-2xl group-hover:bg-maroon-800/10 transition-colors"></div>
            <div className="flex justify-between items-start relative z-10">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Academic Rank</h2>
                <div className="text-maroon-800">
                    <Star className="h-5 w-5 fill-current" />
                </div>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center relative z-10 h-full pb-4">
                <span className="text-6xl font-extrabold text-maroon-800 tracking-tighter drop-shadow-sm">5th</span>
                <span className="text-base font-bold text-gray-800 mt-2">2,366+ Peers</span>
                <div className="mt-3 flex items-center gap-1 rounded bg-[#dcfce7] px-2 py-0.5 text-xs font-bold text-green-700">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+4</span>
                </div>
            </div>
        </div>
    );
}

export function QuickActions() {
    return (
        <div className="rounded-xl col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-start">
            <h2 className="text-base font-bold text-gray-900 tracking-tight mb-3">Quick Actions</h2>
            <div className="flex flex-col gap-2.5">
                <button className="flex items-center justify-center w-full rounded-lg bg-maroon-800 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md">
                    Redeem Points
                </button>
                <button className="flex items-center justify-center w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50 shadow-sm">
                    View Certificates
                </button>
                <button className="flex items-center justify-center w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50 shadow-sm">
                    Register for Events
                </button>
            </div>
        </div>
    );
}

export function SkillPaths() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 h-full">
            <div className="mb-4">
                <h2 className="text-[1.1rem] font-bold text-gray-900 tracking-tight">Comprehensive Student Journey & Skill Paths</h2>
                <p className="text-xs text-gray-600 mt-0.5">Expanded in his chosen path Cybersecurity.</p>
            </div>

            <div className="flex gap-4 items-stretch mt-6 relative">
                {/* Connection Line */}
                <div className="absolute left-[200px] top-[24px] bottom-[24px] w-8 border-y-2 border-r-2 border-maroon-800 rounded-r-xl z-0"></div>
                <div className="absolute left-[200px] top-1/2 w-8 border-t-2 border-maroon-800 z-0"></div>

                {/* Foundation Column */}
                <div className="w-[200px] flex flex-col gap-3 relative z-10">
                    <div className="bg-maroon-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-md">
                        <Star className="h-4 w-4 fill-white" />
                        Foundation
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name</span>
                            <div className="bg-maroon-800 rounded-full p-0.5"><CheckCircle2 className="h-3 w-3 text-white" /></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-maroon-800 w-full" />
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name Collection</span>
                            <div className="bg-maroon-800 rounded-full p-0.5"><CheckCircle2 className="h-3 w-3 text-white" /></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-maroon-800 w-[70%]" />
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name Tracking</span>
                            <div className="bg-maroon-800 rounded-full p-0.5"><CheckCircle2 className="h-3 w-3 text-white" /></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-maroon-800 w-[85%]" />
                        </div>
                    </div>
                </div>

                {/* Intermediate Column */}
                <div className="w-[200px] flex flex-col gap-3 relative z-10 ml-8">
                    <div className="bg-maroon-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-md">
                        <List className="h-4 w-4" />
                        Intermediate
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name Process</span>
                            <div className="bg-maroon-800 rounded-full p-0.5"><CheckCircle2 className="h-3 w-3 text-white" /></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-maroon-800 w-[90%]" />
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name Design</span>
                            <div className="border border-maroon-800 rounded-full p-0.5"><div className="h-3 w-3" /></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-maroon-800 w-[40%]" />
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-lg p-2.5 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-800">Course Name Learning</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Leaderboard() {
    const podiumStudents = [
        { rank: 2, name: "Ealca", score: "16,000", badge: "Rank 1" },
        { rank: 1, name: "Alex Johnson", score: "20,000", badge: "Rank 1", isCurrent: true },
        { rank: 3, name: "Ahoky", score: "20,000", badge: "Rank 2" },
    ];

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Real-time Leaderboard</h2>
                <Award className="h-5 w-5 text-maroon-800" />
            </div>

            {/* Mini Podium View */}
            <div className="bg-maroon-800 rounded-xl p-4 mt-2 mb-3 relative overflow-hidden h-40 flex items-end justify-center gap-2">
                {/* Subtle Stripes Background */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)' }}></div>

                {/* Rank 2 */}
                <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-md rounded-t-lg border border-white/20 p-2 pb-1 w-20 transform translate-y-4">
                    <div className="absolute -top-3 left-1 bg-[#c0c0c0] text-zinc-800 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">2</div>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${podiumStudents[0].name}&backgroundColor=cbd5e1`} alt="img" className="w-8 h-8 rounded-full border-2 border-[#c0c0c0] mb-1" />
                    <p className="text-[10px] font-bold text-white text-center leading-tight truncate w-full">{podiumStudents[0].name}</p>
                    <p className="text-[9px] text-white/80">{podiumStudents[0].badge}</p>
                    <p className="text-[10px] font-bold text-white mt-0.5">{podiumStudents[0].score}</p>
                </div>

                {/* Rank 1 */}
                <div className="relative z-10 flex flex-col items-center bg-white/20 backdrop-blur-md rounded-t-lg border border-[#ffd700] p-2 pb-1 w-24 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#ffd700] drop-shadow-md"><Trophy className="h-6 w-6 fill-current" /></div>
                    <div className="absolute -top-3 left-1 bg-[#ffd700] text-yellow-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">1</div>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=cbd5e1`} alt="img" className="w-10 h-10 rounded-full border-2 border-[#ffd700] mb-1 box-shadow" />
                    <p className="text-[11px] font-bold text-white text-center leading-tight line-clamp-1 w-full">{podiumStudents[1].name}</p>
                    <p className="text-[9px] text-white/80">{podiumStudents[1].badge}</p>
                    <p className="text-[11px] font-bold text-[#ffd700] mt-0.5">{podiumStudents[1].score}</p>
                </div>

                {/* Rank 3 */}
                <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-md rounded-t-lg border border-white/20 p-2 pb-1 w-20 transform translate-y-6">
                    <div className="absolute -top-3 right-1 bg-[#cd7f32] text-amber-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">3</div>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${podiumStudents[2].name}&backgroundColor=cbd5e1`} alt="img" className="w-8 h-8 rounded-full border-2 border-[#cd7f32] mb-1" />
                    <p className="text-[10px] font-bold text-white text-center leading-tight truncate w-full">{podiumStudents[2].name}</p>
                    <p className="text-[9px] text-white/80">{podiumStudents[2].badge}</p>
                    <p className="text-[10px] font-bold text-white mt-0.5">{podiumStudents[2].score}</p>
                </div>
            </div>

            <div className="mt-auto bg-[#f8f5f5] rounded-lg p-3 flex justify-between items-center border border-maroon-800/10">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-maroon-800">5th</span>
                    <div>
                        <p className="text-xs font-bold text-gray-900 leading-tight">Alex</p>
                        <p className="text-[10px] text-gray-500">relative to Peers</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">$2660</p>
                    <p className="text-[10px] text-green-600 font-bold">+10170</p>
                </div>
            </div>
        </div>
    );
}

export function RecentCertificates() {
    const certs = [
        { id: 1, name: "Advance Certificate", sub: "Frontend Developer", rank: 3 },
        { id: 2, name: "Advance Certificate", sub: "Frontend Developer", rank: 2 },
        { id: 3, name: "Advanced Certificate", sub: "Backend Developer", rank: 3 },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.1rem] font-bold text-gray-900 tracking-tight">Recent Certificates Earned</h2>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x hide-scrollbar">
                {certs.map((cert) => (
                    <div key={cert.id} className="min-w-[190px] h-[130px] flex-shrink-0 border-4 border-maroon-800 rounded-lg p-1 bg-white snap-start relative">
                        <div className="border border-maroon-800 w-full h-full p-3 flex flex-col items-center justify-center text-center relative">
                            <Shield className="h-4 w-4 text-maroon-800 absolute top-2 left-1/2 -translate-x-1/2 opacity-70" />
                            <h3 className="text-[11px] font-bold text-gray-900 mt-2 tracking-tight uppercase px-2">{cert.name}</h3>
                            <p className="text-[8px] text-gray-500 mt-0.5">{cert.sub}</p>
                            <div className="w-8 h-8 rounded-full bg-maroon-800 border-2 border-white shadow-sm flex items-center justify-center absolute bottom-1 right-1">
                                <span className="text-white text-xs font-bold">{cert.rank}</span>
                            </div>
                            {/* Signature line simulation */}
                            <div className="absolute bottom-3 left-3 w-12 h-px bg-gray-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ActiveProjectTimeline() {
    const milestones = [
        { title: "Define Requirements", start: "Aug 02", end: "Aug 10", phase: "Planning", color: "bg-blue-500", progress: 100 },
        { title: "Design Architecture", start: "Aug 11", end: "Aug 20", phase: "Design", color: "bg-purple-500", progress: 100 },
        { title: "Core Implementation", start: "Aug 21", end: "Sep 15", phase: "Development", color: "bg-maroon-800", progress: 65 },
        { title: "Testing & QA", start: "Sep 16", end: "Sep 30", phase: "Testing", color: "bg-orange-500", progress: 0 },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.1rem] font-bold text-gray-900 tracking-tight">Active Project: Senior Capstone</h2>
                <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">ON TRACK</span>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Milestone</th>
                            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Dates</th>
                            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">Phase</th>
                            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress/Timeline</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {milestones.map((m, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 pr-4">
                                    <p className="text-sm font-bold text-gray-900">{m.title}</p>
                                </td>
                                <td className="py-4 pr-4">
                                    <p className="text-sm text-gray-600 font-medium">{m.start} - {m.end}</p>
                                </td>
                                <td className="py-4 pr-4">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-700`}>
                                        {m.phase}
                                    </span>
                                </td>
                                <td className="py-4 w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative">
                                            {/* Gantt-like rendering: offset start visually if needed, but for simplicity we rely on progress */}
                                            <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.progress}%`, opacity: m.progress === 0 ? 0 : 1 }} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 w-8">{m.progress}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function UpcomingDeadlines() {
    const assignments = [
        { title: "Database Schema", time: "11:59 PM", date: "Tomorrow", color: "border-red-500" },
        { title: "React Test", time: "4:00 PM", date: "Fri, Aug 25", color: "border-yellow-500" },
        { title: "Midterm Paper", time: "9:00 AM", date: "Mon, Aug 28", color: "border-maroon-800" },
        { title: "Project Demo", time: "2:00 PM", date: "Thu, Aug 31", color: "border-blue-500" },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.1rem] font-bold text-gray-900 tracking-tight">Upcoming</h2>
                <button className="text-xs font-bold text-maroon-800 hover:text-maroon-900 uppercase">View Calendar</button>
            </div>

            {/* Modern Mini Calendar Header */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-900">August 2023</span>
                    <div className="flex gap-1">
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-gray-600 text-xs font-bold">&lt;</span>
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-gray-600 text-xs font-bold">&gt;</span>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-1">
                    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                    {/* Mock days */}
                    <div className="text-gray-300 py-1">30</div><div className="text-gray-300 py-1">31</div>
                    <div className="text-gray-800 py-1">1</div><div className="text-gray-800 py-1">2</div><div className="text-gray-800 py-1">3</div>
                    <div className="text-gray-800 py-1">4</div><div className="text-gray-800 py-1 relative">5<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div></div>

                    <div className="text-gray-800 py-1">6</div><div className="text-gray-800 py-1">7</div>
                    <div className="text-gray-800 py-1 relative">8<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></div></div>
                    <div className="text-gray-800 py-1">9</div>
                    <div className="bg-maroon-800 text-white font-bold rounded shadow-sm py-1">10</div>
                    <div className="text-gray-800 py-1">11</div><div className="text-gray-800 py-1">12</div>
                </div>
            </div>

            <div className="mt-2 space-y-3">
                {assignments.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-stretch p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className={`w-1 rounded-full ${item.color} bg-white border-l-4`} />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <p className="text-[10px] font-semibold text-gray-500">{item.date} • {item.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StudentBadges() {
    const badges = [
        { id: 1, name: "Top Contributor", icon: Trophy, color: "text-amber-500", bg: "bg-amber-100" },
        { id: 2, name: "Fast Learner", icon: TrendingUp, color: "text-green-500", bg: "bg-green-100" },
        { id: 3, name: "Security Expert", icon: Shield, color: "text-maroon-800", bg: "bg-maroon-800/10" },
        { id: 4, name: "Community Star", icon: Star, color: "text-blue-500", bg: "bg-blue-100" },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[1.1rem] font-bold text-gray-900 tracking-tight">Student Badges</h2>
                <BadgeCheck className="h-5 w-5 text-maroon-800" />
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all text-center group cursor-pointer">
                        <div className={`p-2 rounded-full mb-2 shadow-sm ${badge.bg} border-2 border-white group-hover:scale-110 transition-transform`}>
                            <badge.icon className={`h-5 w-5 ${badge.color} fill-current`} strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-800 leading-tight group-hover:text-maroon-800 transition-colors">{badge.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

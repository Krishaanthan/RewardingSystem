import { ArrowUpRight, TrendingUp, Trophy, ChevronRight, CheckCircle2, Award, Calendar, Clock, MoreHorizontal } from "lucide-react";

export function PointsOverview() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Points Overview</h2>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-maroon-800">14,500</span>
                        <span className="text-sm font-medium text-gray-400">POINTS</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-sm font-medium text-green-700">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12%</span>
                </div>
            </div>
            <div className="mt-6 h-24 w-full relative">
                <svg viewBox="0 0 400 100" className="w-full h-full preserve-aspect-ratio-none">
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#800000" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,100 L0,50 C50,40 100,80 150,60 C200,40 250,70 300,30 C350,-10 400,20 400,20 L400,100 Z"
                        fill="url(#gradient)"
                    />
                    <path
                        d="M0,50 C50,40 100,80 150,60 C200,40 250,70 300,30 C350,-10 400,20 400,20"
                        fill="none"
                        stroke="#800000"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Data points */}
                    <circle cx="150" cy="60" r="4" fill="#800000" stroke="white" strokeWidth="2" />
                    <circle cx="300" cy="30" r="4" fill="#800000" stroke="white" strokeWidth="2" />
                    <circle cx="400" cy="20" r="5" fill="white" stroke="#800000" strokeWidth="3" />
                </svg>
            </div>
        </div>
    );
}

export function CreditProgress() {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (42 / 120) * circumference;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center col-span-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest w-full text-left mb-4">Credit Progress</h2>
            <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                        className="text-gray-100"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                    <circle
                        className="text-maroon-800 transition-all duration-1000 ease-in-out"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-gray-900">42</span>
                    <span className="text-xs text-gray-500 border-t border-gray-200 mt-0.5 pt-0.5 w-8">120</span>
                </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600 text-center">B.Sc. Computer Science</p>
        </div>
    );
}

export function AcademicRank() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between col-span-1">
            <div className="flex justify-between items-start">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Academic Rank</h2>
                <div className="h-8 w-8 rounded-full bg-maroon-800/10 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-maroon-800" />
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900 tracking-tighter">5th</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">of 2,366+ Peers</span>
                    <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function QuickActions() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between w-full rounded-2xl bg-maroon-800 px-4 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-maroon-800/20">
                    Redeem Points
                    <ChevronRight className="h-4 w-4 opacity-70" />
                </button>
                <button className="flex items-center justify-between w-full rounded-2xl border border-maroon-800/20 bg-white px-4 py-3 text-sm font-medium text-maroon-800 transition-colors hover:bg-maroon-800/5">
                    View Certificates
                    <ChevronRight className="h-4 w-4 opacity-70" />
                </button>
                <button className="flex items-center justify-between w-full rounded-2xl border border-maroon-800/20 bg-white px-4 py-3 text-sm font-medium text-maroon-800 transition-colors hover:bg-maroon-800/5">
                    Register for Events
                    <ChevronRight className="h-4 w-4 opacity-70" />
                </button>
            </div>
        </div>
    );
}

export function ActiveLedger() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Active Ledger</h2>
                <button className="text-xs font-medium text-maroon-800 hover:underline">View All</button>
            </div>
            <div className="relative h-48 w-full perspective-1000">
                {/* Card 3 (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-28 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 border border-white/40 shadow-sm transition-transform hover:-translate-y-2 z-10 flex flex-col justify-between p-4 px-5 translate-y-2 scale-90 opacity-70">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-500">Student Employment</span>
                        <span className="text-sm font-bold text-gray-600">+$100</span>
                    </div>
                </div>
                {/* Card 2 (Middle) */}
                <div className="absolute bottom-4 left-0 right-0 h-28 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-white shadow-md transition-transform hover:-translate-y-2 z-20 flex flex-col justify-between p-4 px-5 translate-y-1 scale-95 opacity-90">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">Academic Grant</span>
                        <span className="text-sm font-bold text-gray-700">+$100</span>
                    </div>
                </div>
                {/* Card 1 (Top) */}
                <div className="absolute bottom-8 left-0 right-0 h-32 rounded-2xl bg-gradient-to-br from-maroon-800 to-rose-900 text-white shadow-xl shadow-maroon-800/20 border border-maroon-800/50 transition-transform hover:-translate-y-2 z-30 flex flex-col justify-between p-5 overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider text-shadow-sm">Sponsor Financed</span>
                        <div className="flex space-x-1">
                            <div className="w-6 h-4 rounded-sm bg-white/20 backdrop-blur-sm"></div>
                        </div>
                    </div>
                    <div className="relative z-10 mt-auto">
                        <span className="text-2xl font-bold tracking-tight">+$150<span className="text-sm text-white/60 font-medium ml-1">.00</span></span>
                        <p className="text-xs text-white/60 mt-1">Today, 09:42 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SkillPaths() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Comprehensive Skill Paths</h2>
                <span className="text-xs font-medium bg-maroon-800/10 text-maroon-800 px-2.5 py-1 rounded-full">Web Development</span>
            </div>
            <div className="relative flex items-center justify-between w-full mt-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] h-1 bg-maroon-800 rounded-full z-0"></div>

                {/* Foundation */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-maroon-800 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">Foundation</p>
                        <span className="text-xs font-medium text-maroon-800 bg-maroon-800/10 px-2 py-0.5 rounded-full mt-1 inline-block">HTML & CSS</span>
                    </div>
                </div>

                {/* Intermediate */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-maroon-800 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                        <span className="text-sm font-bold">85%</span>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">Intermediate</p>
                        <span className="text-xs font-medium text-maroon-800 bg-maroon-800/10 px-2 py-0.5 rounded-full mt-1 inline-block">React.js</span>
                    </div>
                </div>

                {/* Advanced */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center ring-4 ring-white shadow-sm">
                        <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-400">Advanced</p>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1 inline-block">Next.js</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Leaderboard() {
    const students = [
        { rank: 1, name: "Sarah J.", points: "15,200", isCurrentUser: false, avatar: "Sarah" },
        { rank: 2, name: "Michael T.", points: "14,850", isCurrentUser: false, avatar: "Michael" },
        { rank: 3, name: "Alex J.", points: "14,500", isCurrentUser: true, avatar: "Alex" },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Leaderboard</h2>
                <span className="text-xs text-gray-400">Monthly</span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
                {students.map((student) => (
                    <div
                        key={student.rank}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${student.isCurrentUser ? 'border-maroon-800 bg-maroon-800/5 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold w-4 ${student.rank === 1 ? 'text-yellow-500' : student.rank === 2 ? 'text-gray-400' : student.isCurrentUser ? 'text-maroon-800' : 'text-gray-500'}`}>
                                #{student.rank}
                            </span>
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.avatar}&backgroundColor=f3f4f6`} alt={student.name} className="h-8 w-8 rounded-full border border-gray-200 bg-white" />
                            <span className={`text-sm ${student.isCurrentUser ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{student.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${student.isCurrentUser ? 'text-maroon-800' : 'text-gray-600'}`}>{student.points}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RecentCertificates() {
    const certs = [
        { id: 1, name: "React Basics", date: "Oct 2023" },
        { id: 2, name: "UI/UX Design", date: "Sep 2023" },
        { id: 3, name: "Agile Dev", date: "Aug 2023" },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Recent Certificates</h2>
                <button className="text-xs font-medium text-maroon-800 hover:underline">View Portfolio</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x hide-scrollbar">
                {certs.map(cert => (
                    <div key={cert.id} className="min-w-[160px] flex-shrink-0 border border-maroon-800/20 rounded-2xl p-4 bg-gradient-to-b from-white to-gray-50 shadow-sm snap-start group cursor-pointer hover:border-maroon-800/40 transition-colors">
                        <Award className="h-8 w-8 text-maroon-800 mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-sm font-bold text-gray-900 truncate">{cert.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ActiveProjectTimeline() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Active Project</h2>
                <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">On Track</span>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Senior Capstone: AI Integration</h3>
                <p className="text-sm text-gray-500 mt-1">Phase 2: Model Training</p>
            </div>

            <div className="mt-auto relative w-full pt-4">
                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                    <span>Planning</span>
                    <span className="text-maroon-800 font-bold">Execution</span>
                    <span>Review</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-maroon-800 rounded-full w-[65%]" />
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <img key={i} src={`https://api.dicebear.com/7.x/notionists/svg?seed=Team${i}&backgroundColor=f3f4f6`} alt="Team member" className="w-8 h-8 rounded-full border-2 border-white bg-white" />
                        ))}
                    </div>
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 14 days left</span>
                </div>
            </div>
        </div>
    );
}

export function UpcomingDeadlines() {
    const assignments = [
        { title: "Database Schema", due: "Tomorrow, 11:59 PM", color: "bg-red-500" },
        { title: "React Component Test", due: "Fri, 4:00 PM", color: "bg-yellow-500" },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Upcoming Deadlines</h2>
                <Calendar className="h-4 w-4 text-gray-400" />
            </div>

            {/* Mini Calendar placeholder */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-4 px-2">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                {[...Array(5)].map((_, i) => <div key={`empty-${i}`}></div>)}
                <div className="text-gray-900">1</div>
                <div className="text-gray-900">2</div>
                <div className="text-white bg-maroon-800 rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-sm">3</div>
                <div className="text-gray-900">4</div>
                <div className="text-gray-900 relative">5<span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></span></div>
                <div className="text-gray-400">6</div>
                <div className="text-gray-400">7</div>
            </div>

            <div className="mt-auto space-y-3 pt-2">
                {assignments.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start group">
                        <div className={`mt-1.5 w-2 h-2 rounded-full ${item.color} shadow-sm`} />
                        <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-maroon-800 transition-colors">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.due}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { StatCard } from '@/components/ui/StatCard';

const pointsTrend = [
  { month: 'Aug', value: 12000 },
  { month: 'Sep', value: 18500 },
  { month: 'Oct', value: 16000 },
  { month: 'Nov', value: 22000 },
  { month: 'Dec', value: 21000 },
  { month: 'Jan', value: 26000 },
  { month: 'Feb', value: 29000 },
  { month: 'Mar', value: 32000 }
];

const departments = [
  { name: 'CSE', value: 8900, students: 1240 },
  { name: 'ECE', value: 6400, students: 820 },
  { name: 'MECH', value: 5100, students: 610 },
  { name: 'CIVIL', value: 4300, students: 500 },
  { name: 'IT', value: 7700, students: 1050 },
  { name: 'EEE', value: 3900, students: 480 },
  { name: 'MBA', value: 3500, students: 390 }
];

const initialActivity = [
  { id: '1', initials: 'A', name: 'Arjun Kumar', detail: 'Research Paper Published', delta: '+50', month: 'Mar', time: '2 min ago', type: 'award' },
  { id: '2', initials: 'P', name: 'Priya Menon', detail: 'Hackathon Winner', delta: '+100', month: 'Mar', time: '15 min ago', type: 'award' },
  { id: '3', initials: 'R', name: 'Ravi Shankar', detail: 'Attendance Deduction', delta: '-20', month: 'Aug', time: '1 hr ago', type: 'deduction' },
  { id: '4', initials: 'S', name: 'Sneha Iyer', detail: 'NSS Volunteer Activity', delta: '+30', month: 'Oct', time: '2 hr ago', type: 'award' },
  { id: '5', initials: 'K', name: 'Karthik Raja', detail: 'Sports Achievement', delta: '+40', month: 'Nov', time: '3 hr ago', type: 'award' }
];

const categoryRings = [
  { label: 'Research', color: '#FBD3E4', inset: 0, value: 12 },
  { label: 'Cultural', color: '#F3A1C4', inset: 3, value: 18 },
  { label: 'Sports', color: '#E04A7B', inset: 6, value: 28 },
  { label: 'Academics', color: '#8B153B', inset: 9, value: 42 }
];

const topPerformers = [
  { rank: 1, name: 'Priya Menon', dept: 'ECE', points: 2310, initials: 'PM' },
  { rank: 2, name: 'Arjun Kumar', dept: 'CSE', points: 1840, initials: 'AK' },
  { rank: 3, name: 'Neha Sharma', dept: 'IT', points: 1650, initials: 'NS' }
];

export default function AdminDashboardPage() {
  const [netPointView, setNetPointView] = useState<'awarded' | 'deducted'>('awarded');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [activities, setActivities] = useState(initialActivity);

  // Simulated Live Feed auto-refresh
  useEffect(() => {
    const timer = setInterval(() => {
      const newActivity = {
        id: Math.random().toString(),
        initials: 'N',
        name: 'New Student',
        detail: 'Live Event Points',
        delta: '+' + Math.floor(Math.random() * 50 + 10),
        month: 'Mar',
        time: 'Just now',
        type: 'award'
      };
      setActivities(prev => {
        // Only keep recent 15 activities to avoid huge lists
        const updated = [newActivity, ...prev].slice(0, 15);
        return updated;
      });
    }, 15000); // 15 seconds
    return () => clearInterval(timer);
  }, []);

  const displayActivities = useMemo(() => {
    if (!selectedMonth) return activities.slice(0, 5);
    return activities.filter(a => a.month === selectedMonth).slice(0, 5);
  }, [activities, selectedMonth]);

  const handleExport = (type: string) => {
    alert(`Exporting ${type} as CSV/PDF... (Feature simulated)`);
  };

  return (
    <>
      <style>{`
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.5);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.56);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
        {/* Scrollable Content Container */}
        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
          
          {/* Main Content */}
          <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-6 pt-28 font-primary">
            
            {/* Header */}
            <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-2xl font-bold tracking-wide text-black">Admin Dashboard</h1>
                <p className="text-sm text-black">System health, verifications & real-time analytics.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All 24 Departments Active
              </div>
            </motion.header>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-6 mt-6">
              
              {/* Top stat cards (Management Widgets) */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Students" value="12,480" subtitle="+234 this month" />
                
                {/* Net Point Activity Card with Toggle */}
                <article className="card p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-black/70 font-medium">Net Point Activity</p>
                    <div className="flex bg-black/5 rounded-lg border border-black/10 p-0.5">
                      <button 
                        onClick={() => setNetPointView('awarded')}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition ${netPointView === 'awarded' ? 'bg-primary text-white shadow' : 'text-black/60 hover:text-black'}`}
                      >Awarded</button>
                      <button 
                        onClick={() => setNetPointView('deducted')}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition ${netPointView === 'deducted' ? 'bg-white text-rose-600 shadow border border-black/5' : 'text-black/60 hover:text-black'}`}
                      >Deducted</button>
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${netPointView === 'awarded' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {netPointView === 'awarded' ? '+3,12,400' : '-18,320'}
                  </p>
                  <p className="mt-1 text-xs text-black/60 font-semibold">{netPointView === 'awarded' ? '+8.4% vs last month' : '-2.1% vs last month'}</p>
                </article>

                {/* Verification Alerts */}
                <article className="card p-5 flex flex-col justify-between bg-gradient-to-br from-white/40 to-amber-50/60 border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-amber-900 font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      Verification Alerts
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-2xl font-bold text-black">12</p>
                      <p className="mt-1 text-xs text-black/60 font-semibold">Pending Approvals</p>
                    </div>
                    <Link href="/admin-portal/user-management" className="text-xs font-bold text-amber-600 bg-amber-100/50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition">
                      Review Now &rarr;
                    </Link>
                  </div>
                </article>

                {/* Anomaly Detection */}
                <article className="card p-5 flex flex-col justify-between bg-gradient-to-br from-white/40 to-rose-50/60 border-rose-200/50">
                   <div className="flex items-center justify-between">
                    <p className="text-sm text-rose-900 font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12 9-2.25 2.25M12 9l2.25 2.25M12 9v9m3-12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      Anomaly Detection
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-2xl font-bold text-rose-600 animate-pulse">1</p>
<p className="mt-1 text-xs text-rose-900/60 font-bold tracking-tight">High Risk Alert (Gain &gt;500/hr)</p>
                    </div>
                    <button className="text-xs font-bold text-rose-600 bg-rose-100/50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition border border-rose-200 shadow-sm">
                      Investigate
                    </button>
                  </div>
                </article>
              </div>

              {/* Main grid */}
              <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1.2fr]">
                
                {/* Left column – line chart + bar chart */}
                <div className="space-y-6">
                  
                  {/* Points Awarded Over Time */}
                  <section className="card p-6">
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="heading text-xl font-semibold tracking-wide text-black">Points Awarded Over Time</h2>
                        <p className="text-xs text-black/70">
                          Click a month below to filter Recent Activity
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {selectedMonth && (
                          <button onClick={() => setSelectedMonth(null)} className="text-xs text-black/50 hover:text-black hover:underline transition">Clear Filter</button>
                        )}
                        <button onClick={() => handleExport('Points Over Time')} className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-white/60 border border-black/10 rounded-lg shadow-sm hover:bg-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Export
                        </button>
                      </div>
                    </div>

                    {/* Interactive faux line chart */}
                    <div className="mt-2 h-56 rounded-2xl bg-white/50 border border-black/10 p-4 shadow-inner">
                      <div className="flex h-full items-end justify-between gap-2 sm:gap-4 lg:gap-6">
                        {pointsTrend.map((point, index) => {
                          const isSelected = selectedMonth === point.month;
                          const isDimmed = selectedMonth && selectedMonth !== point.month;
                          
                          return (
                            <button 
                              key={point.month}
                              onClick={() => setSelectedMonth(isSelected ? null : point.month)}
                              className={`flex flex-1 flex-col items-center gap-2 transition-all duration-300 outline-none ${isDimmed ? 'opacity-40 grayscale' : 'opacity-100 hover:-translate-y-1'}`}
                            >
                              <div className="relative flex h-full w-full items-end justify-center group">
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-t transition-colors ${isSelected ? 'from-primary/20 to-primary/5' : 'from-primary/10 to-transparent group-hover:from-primary/20'}`} />
                                <div
                                  className="relative z-10 h-full w-full"
                                  style={{ alignSelf: 'flex-end' }}
                                >
                                  {/* vertical guide */}
                                  <div className={`absolute bottom-0 left-1/2 h-full w-px -translate-x-1/2 transition-colors ${isSelected ? 'bg-primary/50' : 'bg-primary/20'}`} />
                                  {/* point */}
                                  <div
                                    className={`absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow-sm transition-all ${isSelected ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-primary/80 group-hover:scale-110 group-hover:bg-primary'}`}
                                    style={{
                                      bottom: `${10 + (index / (pointsTrend.length - 1)) * 70}%`
                                    }}
                                  />
                                </div>
                              </div>
                              <span className={`text-xs font-bold transition-colors ${isSelected ? 'text-primary' : 'text-black/60'}`}>{point.month}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Most Active Departments */}
                  <section className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h2 className="heading text-xl font-semibold tracking-wide text-black">Most Active Departments</h2>
                        <p className="mt-1 text-xs text-black/70">
                          Hover over bars for detailed metrics
                        </p>
                      </div>
                      <button onClick={() => handleExport('Department Metrics')} className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-white/60 border border-black/10 rounded-lg shadow-sm hover:bg-white transition mt-2 sm:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        CSV Report
                      </button>
                    </div>

                    <div className="mt-4 flex h-64 items-end gap-3 rounded-2xl bg-white/50 border border-black/10 p-4 shadow-inner">
                      {departments.map((dep) => (
                        <div key={dep.name} className="flex flex-1 flex-col items-center gap-2 h-full justify-end relative">
                          <div 
                            onMouseEnter={() => setHoveredDept(dep.name)}
                            onMouseLeave={() => setHoveredDept(null)}
                            className="flex h-full w-full items-end justify-center group relative cursor-crosshair"
                          >
                            <div
                              className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-primary/80 to-primary/40 shadow-sm transition-all group-hover:brightness-110 group-hover:-translate-y-1 relative"
                              style={{ height: `${(dep.value / 9000) * 100}%` }}
                            />
                            
                            {/* Hover Tooltip */}
                            <AnimatePresence>
                              {hoveredDept === dep.name && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: -10, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 w-max rounded-xl bg-black/90 p-3 text-white shadow-xl z-50 pointer-events-none backdrop-blur-sm"
                                >
                                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 rotate-45"></div>
                                  <p className="font-bold text-sm tracking-wider uppercase mb-1">{dep.name}</p>
                                  <div className="flex flex-col gap-1 text-xs">
                                    <span className="flex justify-between gap-4"><span className="text-white/60">Points:</span> <span className="font-bold text-emerald-400">{dep.value.toLocaleString()}</span></span>
                                    <span className="flex justify-between gap-4"><span className="text-white/60">Students:</span> <span className="font-bold">{dep.students.toLocaleString()}</span></span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                          <span className="text-xs font-bold text-black/60 hidden sm:block w-full text-center truncate">{dep.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right column – donut, performers, recent activity */}
                <div className="space-y-6">
                  
                  {/* Top Performers Widget */}
                  <section className="card p-6">
                    <h2 className="heading text-xl font-semibold tracking-wide text-black mb-1 flex items-center gap-2">
                       <span className="text-yellow-500">🏆</span> Hall of Fame
                    </h2>
                    <p className="text-xs text-black/70 mb-5">Top point earners across all departments</p>
                    <div className="space-y-3">
                      {topPerformers.map((student) => (
                        <div key={student.rank} className="flex items-center gap-4 bg-white/50 border border-black/5 rounded-xl p-3 shadow-sm hover:bg-white/80 transition">
                           <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${student.rank === 1 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' : student.rank === 2 ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
                              #{student.rank}
                           </div>
                           <div className="flex-1">
                             <p className="text-sm font-bold text-black">{student.name}</p>
                             <p className="text-xs text-black/60">{student.dept}</p>
                           </div>
                           <div className="text-right">
                             <p className="text-sm font-bold text-primary">{student.points.toLocaleString()}</p>
                             <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider">PTS</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Points by Category (Interactive Rings) */}
                  <section className="card p-6 flex flex-col">
                    <div>
                      <h2 className="heading text-xl font-semibold tracking-wide text-black">Points by Category</h2>
                      <p className="mt-1 text-xs text-black/70">Click a ring to highlight specifics</p>
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row flex-1">
                      <div className="relative h-40 w-40 drop-shadow-md flex-shrink-0">
                        {categoryRings.map((cat) => {
                          const isSelected = selectedCategory === cat.label;
                          const isDimmed = selectedCategory && selectedCategory !== cat.label;
                          return (
                             <motion.div 
                               key={cat.label}
                               onClick={() => setSelectedCategory(isSelected ? null : cat.label)}
                               animate={{ 
                                 scale: isSelected ? 1.08 : 1, 
                                 opacity: isDimmed ? 0.3 : 1
                               }}
                               transition={{ type: "spring", stiffness: 300, damping: 20 }}
                               className={`absolute rounded-full border-[14px] cursor-pointer drop-shadow-sm hover:brightness-110 ${isSelected ? 'z-20 shadow-xl' : 'z-10'}`}
                               style={{
                                 inset: `${cat.inset * 4}px`,
                                 borderColor: cat.color,
                               }}
                             />
                          );
                        })}
                        <div className="absolute inset-12 rounded-full bg-white shadow-inner flex items-center justify-center z-0 pointer-events-none">
                           {selectedCategory ? (
                             <div className="text-center animate-in fade-in zoom-in duration-300">
                               <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">{selectedCategory}</p>
                               <p className="text-lg font-bold text-primary leading-tight">{categoryRings.find(c => c.label === selectedCategory)?.value}%</p>
                             </div>
                           ) : (
                             <span className="text-[10px] font-bold uppercase tracking-wider text-black/30">Total</span>
                           )}
                        </div>
                      </div>
                      <ul className="space-y-3 text-xs w-full">
                        {categoryRings.map((cat) => {
                          const isSelected = selectedCategory === cat.label;
                          const isDimmed = selectedCategory && !isSelected;
                          return (
                            <li 
                              key={cat.label} 
                              onClick={() => setSelectedCategory(isSelected ? null : cat.label)}
                              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-black/5 scale-105' : 'hover:bg-black/5'} ${isDimmed ? 'opacity-50' : ''}`}
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  className="h-4 w-4 rounded-full shadow-sm flex-shrink-0"
                                  style={{ backgroundColor: cat.color }}
                                />
                                <span className={`font-medium ${isSelected ? 'text-black font-bold' : 'text-black/80'}`}>{cat.label}</span>
                              </span>
                              <div className="text-right">
                                <p className={`font-bold ${isSelected ? 'text-black' : 'text-black/80'}`}>{cat.value}%</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </section>

                  {/* Live Recent Activity */}
                  <section className="card p-6 overflow-hidden flex flex-col max-h-[460px]">
                    <div className="mb-4 flex items-center justify-between shrink-0">
                      <div>
                        <h2 className="heading text-xl font-semibold tracking-wide text-black flex items-center gap-2">
                           Live Activity Feed
                           <span className="relative flex h-2 w-2">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                           </span>
                        </h2>
                        <p className="mt-1 text-xs text-black/70">
                          {selectedMonth ? `Filtering by ${selectedMonth} 2025/26` : 'Real-time reward and deduction events'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10">
                      <AnimatePresence initial={false}>
                        {displayActivities.length === 0 ? (
                           <div className="text-center text-sm text-black/50 py-8 font-medium italic">No events found for the selected filter.</div>
                        ) : (
                          displayActivities.map((item) => (
                            <motion.li
                              key={item.id}
                              initial={{ opacity: 0, height: 0, scale: 0.9, y: -20, filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }}
                              animate={{ opacity: 1, height: 'auto', scale: 1, y: 0, filter: 'drop-shadow(0 0 0px rgba(16, 185, 129, 0))' }}
                              exit={{ opacity: 0, height: 0, scale: 0.9, marginBottom: 0 }}
                              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                              className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 border border-black/10 shadow-sm transition hover:bg-white/90 overflow-hidden relative"
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent opacity-0 animate-[glowPulse_3s_ease-out_1]"></div>
                              <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${item.type === 'award' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-rose-100 border-rose-200 text-rose-600'}`}>
                                  {item.initials}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-bold text-black truncate">{item.name}</p>
                                  <p className="text-xs text-black/70 truncate">{item.detail}</p>
                                </div>
                                <div className="flex flex-col items-end shrink-0 pl-3">
                                  <span
                                    className={`text-sm font-black ${
                                      item.delta.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'
                                    }`}
                                  >
                                    {item.delta}
                                  </span>
                                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{item.time}</span>
                                </div>
                              </div>
                            </motion.li>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Add keyframes for the glow pulse effect inline */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes glowPulse {
                        0% { opacity: 1; box-shadow: inset 5px 0 15px rgba(16, 185, 129, 0.2); }
                        100% { opacity: 0; box-shadow: inset 0 0 0 rgba(16, 185, 129, 0); }
                      }
                    `}} />
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer */}
          <footer className="py-6 text-center text-xs font-semibold text-black/50 bg-white/40 border-t border-black/5">
            © 2024 Academic Points Portal — Admin Management Console
          </footer>

        </div>
      </div>
    </>
  );
}
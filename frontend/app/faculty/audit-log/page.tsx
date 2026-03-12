"use client";

import React, { useState } from "react";
import Link from "next/link";
import { facultyNav } from "@/lib/nav";
// We use inline SVGs as icons to avoid external dependencies.

export default function FacultyAuditLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActivity, setFilterActivity] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [filterBadge, setFilterBadge] = useState("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [previewProof, setPreviewProof] = useState<string | null>(null);

  // Mock data representing AI-approved submissions
  const mockSubmissions = [
    { id: "SUB-1001", studentName: "Alex Chen", activityType: "Winning Hackathon", description: "First place in National AI Hackathon with project 'EcoSort'", pointsAwarded: 4, badgeAllocated: "Gold", status: "Auto Approved", date: "2024-03-08", proofUrl: "https://images.unsplash.com/photo-1568228136371-12c820def0d1?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1002", studentName: "Sarah Jenkins", activityType: "Coursera Course", description: "Completed Advanced Machine Learning Specialization", pointsAwarded: 6, badgeAllocated: "Silver", status: "Manual Review", date: "2024-03-07", proofUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1003", studentName: "Michael Chang", activityType: "Hackathon Participation", description: "Attended Web3 Founders Workshop", pointsAwarded: 5, badgeAllocated: "None", status: "Auto Approved", date: "2024-03-07", proofUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1004", studentName: "Emily Rivera", activityType: "Global Certificate", description: "Published paper on Quantum Encryption in IEEE", pointsAwarded: 12, badgeAllocated: "Gold", status: "Auto Approved", date: "2024-03-06", proofUrl: "https://images.unsplash.com/photo-1589330694653-efa648338b6b?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1005", studentName: "David Kim", activityType: "Volunteering", description: "Organized campus clean-up drive", pointsAwarded: 6, badgeAllocated: "Bronze", status: "Auto Approved", date: "2024-03-05", proofUrl: "https://images.unsplash.com/photo-1593113565694-c6b6537ea7b2?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1006", studentName: "Jessica Wong", activityType: "Swayam / NPTEL Course", description: "Completed IoT Programming Course with 95%", pointsAwarded: 8, badgeAllocated: "Silver", status: "Manual Review", date: "2024-03-05", proofUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1007", studentName: "Rahul Sharma", activityType: "Sports Activities", description: "Runner up in Inter-college Badminton Tournament", pointsAwarded: 5, badgeAllocated: "Bronze", status: "Auto Approved", date: "2024-03-04", proofUrl: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1008", studentName: "Priya Patel", activityType: "Conducting Workshop", description: "Conducted React.js bootcamp for juniors", pointsAwarded: 10, badgeAllocated: "Gold", status: "Auto Approved", date: "2024-03-04", proofUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1009", studentName: "James Wilson", activityType: "Organizing Event", description: "Core organizing committee for TechFest 2024", pointsAwarded: 8, badgeAllocated: "Silver", status: "Manual Review", date: "2024-03-03", proofUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1010", studentName: "Anita Desai", activityType: "Cultural Participation", description: "Performed classical dance at Annual Day", pointsAwarded: 4, badgeAllocated: "None", status: "Auto Approved", date: "2024-03-03", proofUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1011", studentName: "Tom Hardy", activityType: "NCC / NSS Activities", description: "Participated in Blood Donation Camp", pointsAwarded: 6, badgeAllocated: "Bronze", status: "Auto Approved", date: "2024-03-02", proofUrl: "https://images.unsplash.com/photo-1615461715566-a6111fdb51cb?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1012", studentName: "Sophia Martinez", activityType: "Conducting Coding Contest", description: "Hosted an Algorithm Coding Challenge on HackerRank", pointsAwarded: 9, badgeAllocated: "Silver", status: "Auto Approved", date: "2024-03-02", proofUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1013", studentName: "William Clark", activityType: "Club Activities", description: "Weekly meeting coordination for Robotics Club", pointsAwarded: 3, badgeAllocated: "None", status: "Auto Approved", date: "2024-03-01", proofUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1014", studentName: "Emma Lewis", activityType: "Student Chapter Activity", description: "Organized IEEE guest lecture on Machine Learning", pointsAwarded: 7, badgeAllocated: "Silver", status: "Manual Review", date: "2024-03-01", proofUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
    { id: "SUB-1015", studentName: "Lucas Brown", activityType: "Other College Event", description: "Represented college in Inter-College Debate", pointsAwarded: 5, badgeAllocated: "Bronze", status: "Auto Approved", date: "2024-02-28", proofUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" }
  ];

  // Filtering Logic
  const filteredSubmissions = mockSubmissions.filter((sub) => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesActivity = filterActivity === "All" || sub.activityType === filterActivity;
    const matchesBadge = filterBadge === "All" || sub.badgeAllocated === filterBadge;

    // Simple date filtering for mock purposes
    let matchesDate = true;
    if (filterDate === "Last 7 Days") {
      // Mock assumes all dates are recent
      matchesDate = true;
    }

    return matchesSearch && matchesActivity && matchesBadge && matchesDate;
  });

  // SVG Icons
  const Icons = {
    Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>,
    Audit: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M10 13h4" /><path d="M12 11v4" /></svg>,
    Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
    ChevronUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>,
    Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>,
    Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 4.74.83 6.64 1.74A1 1 0 0 1 20 6z" /><path d="m9 12 2 2 4-4" /></svg>
  };

  return (
    <>
      <style>{`
        /* Glass card */
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
        .header-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px 12px;
        }
      `}</style>
      <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
          <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-6 pt-12 md:pt-20 font-primary">
            
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-3xl font-bold tracking-wide text-black">Audit-Log</h1>
                <p className="text-sm text-black flex items-center gap-1.5 mt-1 font-medium">
                  <Icons.CheckCircle />
                  Automatically approved submissions available for faculty review.
                </p>
              </div>
            </header>

            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-black rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.Audit />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Total Submissions</p>
                  <p className="text-2xl font-bold text-black">{mockSubmissions.length}</p>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-green-700 hover:text-green-800 rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.CheckCircle />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">AI Approved</p>
                  <p className="text-2xl font-bold text-black">{mockSubmissions.filter(s => s.status === 'Auto Approved').length}</p>
                </div>
              </div>

              <div className="card flex items-center gap-4 p-6 !rounded-2xl">
                <div className="w-12 h-12 bg-white/60 text-red-700 hover:text-red-800 rounded-full flex items-center justify-center shadow-inner border border-black/10">
                  <Icons.Search />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Manual Review Needed</p>
                  <p className="text-2xl font-bold text-black">{mockSubmissions.filter(s => s.status === 'Manual Review').length}</p>
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="card !rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[240px] max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black/50">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search by Student Name..."
                  className="w-full pl-10 pr-4 py-2 border border-black/20 rounded-xl bg-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors text-black text-sm placeholder:text-black/50 hover:bg-white/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  className="py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  value={filterActivity}
                  onChange={(e) => setFilterActivity(e.target.value)}
                >
                  <option value="All">All Activities</option>
                  <option value="Swayam / NPTEL Course">Swayam / NPTEL Course</option>
                  <option value="Coursera Course">Coursera Course</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Hackathon Participation">Hackathon Participation</option>
                  <option value="Winning Hackathon">Winning Hackathon</option>
                  <option value="Conducting Workshop">Conducting Workshop</option>
                  <option value="Organizing Event">Organizing Event</option>
                  <option value="Other College Event">Other College Event</option>
                  <option value="Cultural Participation">Cultural Participation</option>
                  <option value="Sports Activities">Sports Activities</option>
                  <option value="NCC / NSS Activities">NCC / NSS Activities</option>
                  <option value="Conducting Coding Contest">Conducting Coding Contest</option>
                  <option value="Global Certificate">Global Certificate</option>
                  <option value="Club Activities">Club Activities</option>
                  <option value="Student Chapter Activity">Student Chapter Activity</option>
                </select>

                <select
                  className="py-2 pl-4 pr-10 border border-black/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/50 appearance-none bg-white/40 hover:bg-white/60 text-sm text-black font-medium header-select transition-colors"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="All">All Dates</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                </select>
              </div>
            </div>

            {/* Table Card */}
            <div className="card !rounded-2xl overflow-hidden p-0 mb-8 border border-black/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/20 bg-white/30 text-xs uppercase tracking-wider text-black font-semibold">
                      <th className="p-4 w-10"></th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Activity Type</th>
                      <th className="p-4">Points</th>
                      <th className="p-4">AI Confidence %</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Proof</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub) => (
                        <React.Fragment key={sub.id}>
                          <tr className="hover:bg-white/50 transition-colors group">
                            <td className="p-4 text-center">
                              <button
                                onClick={() => setExpandedRow(expandedRow === sub.id ? null : sub.id)}
                                className="text-black/50 hover:text-black transition-colors p-1 rounded-md hover:bg-white/50"
                              >
                                {expandedRow === sub.id ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                              </button>
                            </td>
                            <td className="p-4 font-medium text-black">{sub.studentName}</td>
                            <td className="p-4 text-sm text-black/80">{sub.activityType}</td>
                            <td className="p-4 font-semibold text-black">
                              {sub.status === 'Auto Approved' ? `+${sub.pointsAwarded}` : <span className="text-black/60 text-xs font-medium px-2 py-1 bg-white/40 rounded-lg border border-black/10">Pending</span>}
                            </td>
                            <td className="p-4 font-semibold text-black">
                               {sub.status === 'Auto Approved' ? '98.5%' : '45.2%'}
                            </td>
                            <td className="p-4 text-sm text-black/60">{sub.date}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => setPreviewProof(sub.proofUrl)}
                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/40 hover:bg-white/80 text-black border border-black/20 rounded-xl text-xs font-medium transition-all shadow-[0_4px_20px_0_rgba(131,18,56,0.1)] hover:shadow-[0_4px_20px_0_rgba(131,18,56,0.3)]"
                              >
                                <Icons.Eye />
                                View
                              </button>
                            </td>
                          </tr>
                          {/* Expanded Row */}
                          {expandedRow === sub.id && (
                            <tr className="bg-white/20 border-b border-black/10">
                              <td colSpan={7} className="p-6">
                                <div className="flex gap-8 bg-white/40 p-5 rounded-2xl border border-black/10 shadow-sm backdrop-blur-md">
                                  <div className="flex-1 space-y-4">
                                    <div>
                                      <h4 className="text-xs font-bold text-black/50 uppercase tracking-wider mb-1">Submission Description</h4>
                                      <p className="text-sm text-black">{sub.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-xs font-bold text-black/50 uppercase tracking-wider mb-1">Submission ID</h4>
                                        <p className="text-sm font-mono text-black/70 bg-white/50 px-2 py-1 rounded-lg border border-black/10 w-max">{sub.id}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-black/50 uppercase tracking-wider mb-1">AI Confidence Score</h4>
                                        <p className={`text-sm font-semibold ${sub.status === 'Auto Approved' ? 'text-green-700' : 'text-red-700'}`}>
                                          {sub.status === 'Auto Approved' ? '98.5% (High)' : '45.2% (Low)'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`w-1/3 rounded-2xl border p-4 flex flex-col items-center justify-center text-center backdrop-blur-md ${sub.status === 'Auto Approved' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
                                    }`}>
                                    <div className={`${sub.status === 'Auto Approved' ? 'text-green-700' : 'text-red-700'} mb-2 scale-150`}>
                                      {sub.status === 'Auto Approved' ? <Icons.ShieldCheck /> : <Icons.Search />}
                                    </div>
                                    <h5 className="font-semibold text-black text-sm">
                                      {sub.status === 'Auto Approved' ? 'AI Verification Passed' : 'Manual Review Required'}
                                    </h5>
                                    <p className={`text-xs mt-1 ${sub.status === 'Auto Approved' ? 'text-green-800' : 'text-red-800'}`}>
                                      {sub.status === 'Auto Approved'
                                        ? 'Image composition and text extraction matched required rubrics automatically.'
                                        : 'AI could not confidently verify the document validity. Human review needed.'}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-black/50">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Icons.Search />
                            <p>No audit records found matching your filters.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Mock */}
              <div className="px-6 py-4 border-t border-black/20 flex items-center justify-between bg-white/20">
                <p className="text-sm text-black/60">
                  Showing <span className="font-semibold text-black">1</span> to <span className="font-semibold text-black">{filteredSubmissions.length}</span> of <span className="font-semibold text-black">{mockSubmissions.length}</span> entries
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-black/20 bg-white/40 rounded-xl text-sm text-black hover:bg-white/80 transition-colors disabled:opacity-50">Previous</button>
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary text-secondary text-sm font-medium shadow-[0_4px_10px_0_rgba(131,18,56,0.3)]">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/40 hover:bg-white/80 text-black border border-black/10 text-sm font-medium transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/40 hover:bg-white/80 text-black border border-black/10 text-sm font-medium transition-colors">3</button>
                  </div>
                  <button className="px-3 py-1.5 border border-black/20 bg-white/40 rounded-xl text-sm text-black hover:bg-white/80 transition-colors">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof Preview Modal */}
        {previewProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(131,18,56,0.3)] border border-white/40 max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white/50">
                <div>
                  <h3 className="text-lg font-secondary font-bold text-black">Proof Preview</h3>
                  <p className="text-sm text-black/60">Reviewing submitted document</p>
                </div>
                <button
                  onClick={() => setPreviewProof(null)}
                  className="p-2 text-black/50 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                >
                  <Icons.Close />
                </button>
              </div>
              <div className="p-6 flex-1 overflow-auto flex items-center justify-center min-h-[400px]">
                {/* Note: Using an img tag directly since next/image needs configured hostnames */}
                <img
                  src={previewProof}
                  alt="Submission Proof"
                  className="max-w-full max-h-[60vh] object-contain rounded-2xl border border-black/10 shadow-md bg-white/50"
                />
              </div>
              <div className="px-6 py-4 border-t border-black/10 bg-white/50 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewProof(null)}
                  className="px-5 py-2.5 rounded-xl border border-black/20 bg-white/60 text-black font-medium hover:bg-white/90 hover:shadow-[0_4px_15px_0_rgba(131,18,56,0.15)] transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

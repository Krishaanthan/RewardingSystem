'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

// Types
type Role = 'STUDENT' | 'VERIFIER' | 'ADMIN' | 'FACULTY';
type Status = 'ACTIVE' | 'INACTIVE';

interface User {
  id: string;
  regNo: string;
  initials: string;
  name: string;
  dept: string;
  year: number;
  section: string;
  points: number;
  role: Role;
  status: Status;
  assignedFaculty?: string;
}

interface Faculty {
  id: string;
  name: string;
  dept: string;
}

export default function AdminUserManagementPage() {
  const pathname = usePathname();
  const [users, setUsers] = useState<User[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  // Modal States
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  
  // Assignment Modal
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [facultySearch, setFacultySearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<typeof facultyList[0] | null>(null);
  const [newRole, setNewRole] = useState<Role>('STUDENT');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Memoized Sections based on selected Year (Cascading logic simulation)
  const availableSections = useMemo(() => {
    if (selectedYear === 'All') return ['All', 'A', 'B', 'C'];
    // In a real app, you might fetch specific sections for a batch. Here we just mock it.
    if (selectedYear === '4') return ['All', 'A', 'B', 'C'];
    if (selectedYear === '3') return ['All', 'A', 'B'];
    return ['All', 'A', 'B', 'C', 'D'];
  }, [selectedYear]);

  // Reset section if not available in new year
  if (selectedSection !== 'All' && !availableSections.includes(selectedSection)) {
    setSelectedSection('All');
  }

  // Load backend data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const [usersRes, facultyRes] = await Promise.all([
          fetch("http://localhost:8000/api/admin/users", {
            headers: { "Authorization": `Bearer ${token}` }
          }),
          fetch("http://localhost:8000/api/admin/faculty", {
            headers: { "Authorization": `Bearer ${token}` }
          })
        ]);

        if (usersRes.ok && facultyRes.ok) {
          const uData = await usersRes.json();
          const fData = await facultyRes.json();
          setUsers(uData);
          setFacultyList(fData);
        }
      } catch (err) {
        console.error("Error loading admin users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1. Live Search & Filtering
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.regNo.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDept === 'All' || u.dept === selectedDept;
      const matchesYear = selectedYear === 'All' || u.year.toString() === selectedYear;
      const matchesSection = selectedSection === 'All' || u.section === selectedSection;
      
      // Map dropdown roles to actual role strings
      const roleMap: Record<string, string> = {
        'Student': 'STUDENT',
        'Verifier': 'VERIFIER'
      };
      const mappedSelectedRole = selectedRole === 'All' ? 'All' : roleMap[selectedRole];
      const matchesRole = mappedSelectedRole === 'All' || u.role === mappedSelectedRole;

      return matchesSearch && matchesDept && matchesYear && matchesSection && matchesRole;
    });
  }, [users, searchQuery, selectedDept, selectedYear, selectedSection, selectedRole]);

  // Helpers
  const getRoleStyle = (role: Role) => {
    switch (role) {
      case 'VERIFIER': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-black/5 text-black/70 border-black/10';
    }
  };

  const handleSaveAssignment = async () => {
    if (!editingUser) return;
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem("access_token");
      const bodyPayload = {
        role: newRole,
        assigned_faculty_id: newRole === 'STUDENT' && selectedFaculty ? selectedFaculty.id : null
      };

      const res = await fetch(`http://localhost:8000/api/admin/users/${editingUser.id}/role`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyPayload)
      });

      if (res.ok) {
        setUsers(users.map(u => 
          u.id === editingUser.id 
            ? { 
                ...u, 
                role: newRole, 
                assignedFaculty: newRole === 'STUDENT' ? selectedFaculty?.name : undefined 
              } 
            : u
        ));
        setEditingUser(null);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error("Failed to update role");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredFaculty = facultyList.filter(f => 
    f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
    f.dept.toLowerCase().includes(facultySearch.toLowerCase())
  );

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
        .modal-overlay {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
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
                <h1 className="heading text-2xl font-bold tracking-wide text-black">User Management</h1>
                <p className="text-sm text-black">Assign verifiers and manage student roles securely.</p>
              </div>
            </motion.header>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                 <div className="animate-spin w-8 h-8 border-4 border-primary rounded-full border-t-transparent" />
              </div>
            ) : (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="card space-y-4 p-6 overflow-hidden mt-6">
              
              {/* Top bar: filters + count pill */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="grid w-full gap-3 md:w-auto md:flex items-end">
                  
                  {/* Search input */}
                  <label className="flex flex-col gap-1 text-sm md:w-56">
                    <span className="font-semibold text-black">Live Search</span>
                    <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/50 px-3 py-2 shadow-inner focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                      <span className="text-black/50">🔍</span>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none placeholder:text-black/50"
                        placeholder="Name or Reg No..."
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-black/40 hover:text-black">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                        </button>
                      )}
                    </div>
                  </label>

                  {/* Department */}
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold text-black">Department</span>
                    <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="rounded-xl border border-black/10 bg-white/50 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>All</option>
                      <option>CSE</option>
                      <option>ECE</option>
                      <option>EEE</option>
                      <option>MECH</option>
                      <option>CIVIL</option>
                      <option>IT</option>
                      <option>MBA</option>
                    </select>
                  </label>

                  {/* Cascading: Year */}
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold text-black">Year</span>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="rounded-xl border border-black/10 bg-white/50 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>All</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </label>

                  {/* Cascading: Section */}
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold text-black">Section</span>
                    <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="rounded-xl border border-black/10 bg-white/50 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-primary transition-opacity">
                      {availableSections.map(s => (
                        <option key={s} value={s}>{s === 'All' ? 'All' : s}</option>
                      ))}
                    </select>
                  </label>

                  {/* Current role */}
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold text-black">Role Filter</span>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="rounded-xl border border-black/10 bg-white/50 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>All</option>
                      <option>Student</option>
                      <option>Verifier</option>
                    </select>
                  </label>
                  
                  {/* Clear Filters */}
                  {(searchQuery || selectedDept !== 'All' || selectedYear !== 'All' || selectedSection !== 'All' || selectedRole !== 'All') && (
                     <button 
                       onClick={() => {
                         setSearchQuery(''); setSelectedDept('All'); setSelectedYear('All'); setSelectedSection('All'); setSelectedRole('All');
                       }}
                       className="text-xs font-semibold text-primary hover:underline px-2 py-2 mb-0.5"
                     >
                        Clear
                     </button>
                  )}
                </div>

                {/* Registered count */}
                <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <motion.span 
                    key={filteredUsers.length}
                    initial={{ scale: 1.1, backgroundColor: 'rgba(131, 18, 56, 0.2)' }}
                    animate={{ scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                    className="rounded-full px-4 py-2 text-xs font-bold tracking-wide text-primary border border-black/10 shadow-sm transition-colors"
                  >
                    {filteredUsers.length} STUDENT{filteredUsers.length !== 1 && 'S'} FOUND
                  </motion.span>
                </div>
              </div>

              {/* 2. Table */}
              <div className="overflow-x-auto mt-6 relative min-h-[300px]">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/20 text-xs text-black/70 bg-white/40">
                      <th className="py-4 px-4 rounded-tl-xl font-semibold uppercase tracking-wider">Reg. Number</th>
                      <th className="py-4 px-4 font-semibold uppercase tracking-wider">Student</th>
                      <th className="py-4 px-4 font-semibold uppercase tracking-wider">Academics (Yr-Sec)</th>
                      <th className="py-4 px-4 font-semibold uppercase tracking-wider">Total Points</th>
                      <th className="py-4 px-4 font-semibold uppercase tracking-wider">Assigned Role</th>
                      <th className="py-4 px-4 font-semibold uppercase tracking-wider">Status</th>
                      <th className="py-4 px-4 rounded-tr-xl font-semibold uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="relative">
                    <AnimatePresence>
                      {filteredUsers.length === 0 && (
                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <td colSpan={7} className="py-12 text-center text-sm font-medium text-black/50">
                            No students match your filter criteria.
                          </td>
                        </motion.tr>
                      )}
                      {filteredUsers.map((u) => (
                        <motion.tr 
                          key={u.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-black/10 last:border-0 hover:bg-primary/5 transition-colors group cursor-default"
                        >
                          <td className="py-4 px-4 font-bold text-black border-l-2 border-transparent group-hover:border-primary transition-colors">{u.regNo}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black border border-black/10 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                {u.initials}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-black">{u.name}</p>
                                <p className="text-xs text-black/60">
                                  {u.name.split(' ')[0].toLowerCase()}@sathyabama.ac.in
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                             <p className="text-sm font-bold text-black">{u.dept}</p>
                             <p className="text-xs text-black/60 font-medium">Year {u.year} - Sec {u.section}</p>
                          </td>
                          <td className="py-4 px-4 text-sm font-bold text-black">
                            {u.points.toLocaleString()} pts
                          </td>
                          <td className="py-4 px-4 h-full mt-2 flex flex-col justify-center items-start">
                            <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${getRoleStyle(u.role)}`}>
                              {u.role}
                            </span>
                            {u.role === 'STUDENT' && u.assignedFaculty && (
                              <span className="text-[10px] text-black/60 font-semibold mt-1">
                                {u.assignedFaculty}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {/* Read-only visual status toggle */}
                            <span
                              className={`flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase ${
                                u.status === 'ACTIVE' ? 'text-emerald-700 bg-emerald-100/50' : 'text-rose-700 bg-rose-100/50'
                              } px-2.5 py-1.5 rounded-xl border ${u.status === 'ACTIVE' ? 'border-emerald-200' : 'border-rose-200'} w-fit opacity-80`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-xs">
                            <div className="flex items-center justify-end gap-2">
                              {/* 3A. View Button */}
                              <button 
                                onClick={() => setViewedUser(u)}
                                className="rounded-xl border border-black/20 bg-white/40 px-3 py-1.5 text-xs font-semibold text-black transition hover:border-black/40 hover:bg-white"
                              >
                                View
                              </button>
                              {/* 3B. Edit Role Button */}
                              <button 
                                onClick={() => {
                                  setEditingUser(u);
                                  setNewRole(u.role);
                                  setSelectedFaculty(null); // Reset when opening
                                }}
                                className={`rounded-xl px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:scale-105 ${u.status === 'INACTIVE' ? 'bg-black/20 cursor-not-allowed text-black/50 hover:scale-100' : 'bg-primary hover:bg-primary/90'}`}
                                disabled={u.status === 'INACTIVE'}
                                title={u.status === 'INACTIVE' ? 'Cannot edit inactive user' : 'Assign Role & Verifier'}
                              >
                                {u.role === 'STUDENT' ? 'Assign Verifier' : 'Edit Role'}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.section>
            )}
          </div>
        </div>
      </div>

      {/* Modals & Overlays */}
      
      {/* View Modal (Glassmorphism Drawer) */}
      <AnimatePresence>
        {viewedUser && (
          <div className="fixed inset-0 z-[110] flex items-center justify-end p-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 modal-overlay"
              onClick={() => setViewedUser(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 w-full max-w-sm h-full max-h-screen overflow-y-auto bg-white/80 backdrop-blur-2xl border-l border-white/40 shadow-2xl p-8 flex flex-col"
            >
               <div className="flex justify-between items-start mb-8">
                 <h2 className="heading text-2xl font-bold text-black">Profile Snapshot</h2>
                 <button onClick={() => setViewedUser(null)} className="p-2 rounded-full hover:bg-black/5 transition">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                 </button>
               </div>
               
               <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-primary mb-4">
                    {viewedUser.initials}
                  </div>
                  <h3 className="text-xl font-bold text-black">{viewedUser.name}</h3>
                  <p className="text-sm font-semibold text-black/50 mb-2">{viewedUser.regNo}</p>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${getRoleStyle(viewedUser.role)}`}>
                     {viewedUser.role}
                  </span>
               </div>
               
               <div className="space-y-4 flex-1">
                 <div className="bg-white/60 rounded-2xl p-4 border border-black/5 shadow-inner">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Academic Info</p>
                   <p className="font-bold text-black text-sm">{viewedUser.dept} • Year {viewedUser.year} • Section {viewedUser.section}</p>
                 </div>
                 {viewedUser.role === 'STUDENT' && viewedUser.assignedFaculty && (
                   <div className="bg-white/60 rounded-2xl p-4 border border-black/5 shadow-inner">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Assigned Verifier</p>
                     <p className="font-bold text-black text-sm">{viewedUser.assignedFaculty}</p>
                   </div>
                 )}
                 <div className="bg-white/60 rounded-2xl p-4 border border-black/5 shadow-inner">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Total Reward Points</p>
                   <p className="font-black text-primary text-xl">{viewedUser.points.toLocaleString()}</p>
                 </div>
                 <div className="bg-white/60 rounded-2xl p-4 border border-black/5 shadow-inner">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Account Status</p>
                   <p className={`font-bold text-sm ${viewedUser.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'}`}>{viewedUser.status}</p>
                 </div>
               </div>
               
               <button onClick={() => setViewedUser(null)} className="mt-8 w-full rounded-xl border border-black/20 py-3 text-sm font-bold text-black hover:bg-black/5 transition">
                 Close Profile
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Role / Assignment Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 modal-overlay"
              onClick={() => !isSaving && setEditingUser(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-white p-7 rounded-[32px] shadow-2xl border border-black/10 flex flex-col overflow-hidden"
            >
               {/* Modal Header */}
               <div className="flex items-center gap-4 mb-6 border-b border-black/10 pb-4">
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 shrink-0">
                   {editingUser.initials}
                 </div>
                 <div>
                   <h3 className="heading text-xl font-bold text-black leading-tight">{editingUser.name}</h3>
                   <p className="text-xs font-semibold text-black/50">{editingUser.regNo} • {editingUser.dept}</p>
                 </div>
               </div>

               {/* Role Selection */}
               <div className="mb-6">
                 <label className="block text-[11px] font-bold uppercase tracking-widest text-black/60 mb-3">Assign System Role</label>
                 <div className="grid grid-cols-2 gap-3">
                   {['STUDENT', 'VERIFIER'].map((role) => (
                      <button
                        key={role}
                        onClick={() => setNewRole(role as Role)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all ${newRole === role ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-black/5 bg-black/5 text-black hover:bg-black/10'}`}
                      >
                         {role}
                      </button>
                   ))}
                 </div>
               </div>

               {/* Verifier Mapping (Important logic visual) */}
               {newRole === 'STUDENT' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-black/60 mb-3">Map to Faculty Verifier</label>
                    <div className="rounded-2xl border border-black/10 bg-white shadow-inner p-2 overflow-hidden flex flex-col max-h-48">
                      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-black/5 pb-2 mb-1">
                        <span className="text-black/40 text-xs">🔍</span>
                        <input
                          value={facultySearch}
                          onChange={(e) => setFacultySearch(e.target.value)}
                          placeholder="Search faculty by name..."
                          className="w-full text-sm outline-none bg-transparent placeholder:text-black/40"
                        />
                      </div>
                      <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10 px-1">
                         {filteredFaculty.map(f => (
                           <button 
                             key={f.id}
                             onClick={() => setSelectedFaculty(f)}
                             className={`w-full text-left flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${selectedFaculty?.id === f.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-black/5 text-black'}`}
                           >
                             <span>{f.name}</span>
                             <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded">{f.dept}</span>
                           </button>
                         ))}
                         {filteredFaculty.length === 0 && <p className="text-xs text-center text-black/40 py-4">No faculty found.</p>}
                      </div>
                    </div>
                  </motion.div>
               )}
               {newRole !== 'STUDENT' && (
                 <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
                    <span className="text-amber-500">🛡️</span>
                    <p className="text-xs font-semibold text-amber-900/80 leading-relaxed">
                      Assigning a user as {newRole} elevates their privileges. They will access review dashboards instead of standard claiming. Faculty mapping is not required for elevated roles.
                    </p>
                 </div>
               )}

               {/* Actions */}
               <div className="mt-auto flex justify-end gap-3 pt-4 border-t border-black/5">
                 <button 
                   onClick={() => setEditingUser(null)}
                   disabled={isSaving}
                   className="rounded-xl border border-black/10 px-5 py-2.5 text-sm font-bold text-black hover:bg-black/5 transition disabled:opacity-50"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleSaveAssignment}
                   disabled={isSaving || (newRole === 'STUDENT' && !selectedFaculty)}
                   className="relative flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                 >
                   {isSaving ? (
                     <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Saving...
                     </span>
                   ) : (
                     <>
                       {/* Save Pulse Effect Element */}
                       <div className="absolute inset-0 bg-white/20 scale-0 rounded-full group-active:animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1]"></div>
                       Save Assignment
                     </>
                   )}
                 </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm tracking-wide"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">✓</span>
            Assignment successfully saved!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
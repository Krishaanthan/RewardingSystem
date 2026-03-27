"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Rule = {
  id: string;
  category: string;
  color: string;
  activity: string;
  points: number;
  cap: number | null; // null for '—'
  enabled: boolean;
  effectiveDate: string;
};

const initialRules: Rule[] = [
  {
    id: '1',
    category: 'ACADEMIC',
    color: 'text-blue-700',
    activity: 'Research Paper Published (Scopus/WoS)',
    points: 50,
    cap: 200,
    enabled: true,
    effectiveDate: '2024-01-01'
  },
  {
    id: '2',
    category: 'SPORTS',
    color: 'text-emerald-700',
    activity: 'University Level - Gold Medal',
    points: 60,
    cap: null,
    enabled: true,
    effectiveDate: '2024-01-01'
  },
  {
    id: '3',
    category: 'CULTURAL',
    color: 'text-amber-700',
    activity: 'Prize Winner in Cultural Event',
    points: 20,
    cap: 80,
    enabled: false,
    effectiveDate: '2024-06-01'
  },
  {
    id: '4',
    category: 'DEDUCTION',
    color: 'text-rose-700',
    activity: 'Attendance Below 75%',
    points: -20,
    cap: null,
    enabled: true,
    effectiveDate: '2024-01-01'
  }
];

// Mock History data
const mockHistory = [
  { date: '2024-06-01', user: 'Admin (John)', action: 'Changed points from 15 to 20' },
  { date: '2023-12-15', user: 'System', action: 'Rule created initially' }
];

export default function AdminPointRulesPage() {
  const pathname = usePathname();
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [activeTab, setActiveTab] = useState('All Rules');
  
  // Search states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // ... (Modal states)
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyRuleTitle, setHistoryRuleTitle] = useState('');
  
  // Delete Confirmation State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState<Rule | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Form states for Add/Edit Rule
  const [formCategory, setFormCategory] = useState('ACADEMIC');
  const [formActivity, setFormActivity] = useState('');
  const [formPoints, setFormPoints] = useState('');
  const [formCap, setFormCap] = useState('');
  const [formEffectiveDate, setFormEffectiveDate] = useState('');
  const [formError, setFormError] = useState('');

  const dynamicSummary = useMemo(() => {
    const categories = [
      { id: 'ACADEMIC', color: 'text-blue-700' },
      { id: 'SPORTS', color: 'text-emerald-700' },
      { id: 'CULTURAL', color: 'text-amber-700' },
      { id: 'SERVICE', color: 'text-purple-700' },
      { id: 'DEDUCTION', color: 'text-rose-700' }
    ];

    return categories.map(cat => {
      const activeCount = rules.filter(r => r.category === cat.id && r.enabled).length;
      return {
        label: cat.id,
        value: activeCount, // User highlighted "updated according to active rules"
        badge: `${activeCount} ACTIVE RULE${activeCount === 1 ? '' : 'S'}`,
        color: cat.color
      };
    });
  }, [rules]);

  // Autocomplete suggestions based strictly on current input typing (dropdown only)
  const searchSuggestions = useMemo(() => {
    if (!searchInput.trim()) return [];
    const query = searchInput.toLowerCase();
    
    // Get unique activity names matching the input
    const matches = rules
      .map(r => r.activity)
      .filter(activity => activity.toLowerCase().includes(query));
      
    return Array.from(new Set(matches)).slice(0, 5); // Limit to 5 suggestions
  }, [rules, searchInput]);

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setIsSearchFocused(false);
  };

  const filteredRules = useMemo(() => {
    return rules.filter(r => {
      const matchesTab = activeTab === 'All Rules' || r.category === activeTab.toUpperCase();
      const matchesSearch = r.activity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [rules, activeTab, searchQuery]);

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredRules.length && filteredRules.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRules.map(r => r.id)));
    }
  };

  const handleBulkAction = (action: 'enable' | 'disable' | 'delete') => {
    if (action === 'delete') {
      setIsBulkDelete(true);
      setRuleToDelete(null);
      setIsDeleteDialogOpen(true);
    } else {
      setRules(rules.map(r => selectedIds.has(r.id) ? { ...r, enabled: action === 'enable' } : r));
      setSelectedIds(new Set());
    }
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      setRules(rules.filter(r => !selectedIds.has(r.id)));
      setSelectedIds(new Set());
    } else if (ruleToDelete) {
      setRules(rules.filter(r => r.id !== ruleToDelete.id));
    }
    setIsDeleteDialogOpen(false);
    setRuleToDelete(null);
    setIsBulkDelete(false);
  };

  const openAddModal = () => {
    setEditingRule(null);
    setFormCategory('ACADEMIC');
    setFormActivity('');
    setFormPoints('');
    setFormCap('');
    setFormEffectiveDate(new Date().toISOString().split('T')[0]);
    setFormError('');
    setIsRuleModalOpen(true);
  };

  const openEditModal = (rule: Rule) => {
    setEditingRule(rule);
    setFormCategory(rule.category);
    setFormActivity(rule.activity);
    setFormPoints(rule.points.toString());
    setFormCap(rule.cap !== null ? rule.cap.toString() : '');
    setFormEffectiveDate(rule.effectiveDate);
    setFormError('');
    setIsRuleModalOpen(true);
  };

  const openHistoryModal = (rule: Rule) => {
    setHistoryRuleTitle(rule.activity);
    setIsHistoryModalOpen(true);
  };

  const saveRule = () => {
    const pts = parseInt(formPoints);
    const capVal = formCap.trim() === '' ? null : parseInt(formCap);

    if (isNaN(pts) || !formActivity.trim()) {
       setFormError("Activity and Points are required.");
       return;
    }

    // Validation: Cap must not be lower than points (for positive points)
    if (pts > 0 && capVal !== null && capVal < pts) {
      setFormError("Annual Cap cannot be less than the equivalent Points per activity.");
      return;
    }

    const colorMap: Record<string, string> = {
      'ACADEMIC': 'text-blue-700',
      'SPORTS': 'text-emerald-700',
      'CULTURAL': 'text-amber-700',
      'SERVICE': 'text-purple-700',
      'DEDUCTION': 'text-rose-700',
    };

    const newRule: Rule = {
      id: editingRule ? editingRule.id : Math.random().toString(),
      category: formCategory,
      color: colorMap[formCategory] || 'text-brand-text',
      activity: formActivity.trim(),
      points: pts,
      cap: capVal,
      enabled: editingRule ? editingRule.enabled : true,
      effectiveDate: formEffectiveDate
    };

    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? newRule : r));
    } else {
      setRules([newRule, ...rules]);
    }
    setIsRuleModalOpen(false);
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
        .modal-overlay {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
        }
      `}</style>
      <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">
        
        {/* Scrollable Content Container */}
        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
          
          {/* Main Content */}
          <div className="mx-auto flex min-h-full max-w-6xl flex-col px-6 pb-6 pt-28 font-primary">
            
            {/* Header */}
            <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-2xl font-bold tracking-wide text-black">Point Rules</h1>
                <p className="text-sm text-black">Dynamic activity value management.</p>
              </div>
            </motion.header>

            {/* Top summary cards */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="mt-8 grid gap-4 md:grid-cols-5">
              {dynamicSummary.map((item) => (
                <div
                  key={item.label}
                  className="card flex h-full flex-col justify-between p-5 text-xs font-semibold"
                >
                  <div className={`font-bold tracking-widest uppercase ${item.color}`}>{item.label}</div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-black">{item.value}</span>
                    <span className="text-[10px] opacity-70 text-black uppercase">{item.badge}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Filters, Search & Add Button */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="card mt-8 p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-20">
              <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto relative z-20">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}
                  className="flex items-center gap-2 mr-2 w-full md:w-auto relative"
                >
                  <div className="relative w-full md:w-56">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search activities..." 
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => {
                        // Delay hiding dropdown to allow clicking a suggestion
                        setTimeout(() => setIsSearchFocused(false), 200);
                      }}
                      className="w-full rounded-xl border border-black/10 bg-white/50 pl-9 pr-3 py-2 text-xs text-black placeholder:text-black/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-inner"
                    />
                    
                    {/* Autocomplete Dropdown */}
                    <AnimatePresence>
                      {isSearchFocused && searchSuggestions.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full mt-1 left-0 right-0 max-h-48 overflow-y-auto rounded-xl border border-black/10 bg-white shadow-xl z-50 py-1"
                        >
                          {searchSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onMouseDown={(e) => {
                                // use onMouseDown to fire before input onBlur
                                e.preventDefault();
                                setSearchInput(suggestion);
                                setSearchQuery(suggestion);
                                setIsSearchFocused(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-black/5 text-xs text-black transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-primary/90"
                  >
                    Search
                  </button>
                  {searchQuery !== '' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setSearchQuery('');
                      }}
                      className="text-xs text-black/50 hover:text-black transition underline ml-1"
                    >
                      Clear
                    </button>
                  )}
                </form>
                {['All Rules', 'Academic', 'Sports', 'Cultural', 'Service', 'Deduction'].map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
                        activeTab === tab
                          ? 'bg-primary text-white border border-primary shadow-[0_4px_14px_0_rgba(131,18,56,0.39)] scale-105'
                          : 'bg-white/40 text-black border border-black/10 hover:bg-white/60 hover:border-black/30'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={openAddModal}
                className="group shrink-0 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/90 hover:scale-[1.03] shadow-[0_4px_14px_0_rgba(131,18,56,0.39)]"
              >
                + Add New Rule
              </button>
            </motion.section>

            {/* Bulk Actions Toolbar (Conditional) */}
            <AnimatePresence>
              {selectedIds.size > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }} 
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="card px-5 py-3 flex items-center justify-between overflow-hidden"
                >
                  <span className="text-sm font-semibold text-black">{selectedIds.size} rules selected</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleBulkAction('enable')} className="text-xs font-bold uppercase tracking-wider bg-white/50 hover:bg-white/80 border border-black/10 rounded-lg px-4 py-2 transition shadow-sm">Enable</button>
                    <button onClick={() => handleBulkAction('disable')} className="text-xs font-bold uppercase tracking-wider bg-white/50 hover:bg-white/80 border border-black/10 rounded-lg px-4 py-2 transition shadow-sm">Disable</button>
                    <button onClick={() => handleBulkAction('delete')} className="text-xs font-bold uppercase tracking-wider bg-rose-100/80 hover:bg-rose-200 text-rose-700 border border-rose-200 rounded-lg px-4 py-2 transition shadow-sm">Delete</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rules table - Glassmorphic Card */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="card mt-8 w-full overflow-hidden">
              <div className="border-b border-black/20 px-8 py-5 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-primary"></div>
                <h2 className="heading text-xl font-semibold tracking-wide text-black">Active Rules Configure</h2>
              </div>
              
              <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-black/20 bg-white/40">
                    <tr>
                      <th className="px-6 py-4 w-12 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.size === filteredRules.length && filteredRules.length > 0} 
                          onChange={toggleAll}
                          className="w-4 h-4 rounded border-black/30 text-primary focus:ring-primary cursor-pointer"
                        />
                      </th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs">Category</th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs">Activity Detail</th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs text-center">Points</th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs text-center">Annual Cap</th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs text-center">Effective Since</th>
                      <th className="px-4 py-4 font-semibold text-black uppercase tracking-widest text-xs text-center">Status</th>
                      <th className="px-6 py-4 font-semibold text-black uppercase tracking-widest text-xs text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {filteredRules.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-8 py-8 text-center text-sm font-medium text-black/60">No rules found matching your criteria.</td>
                      </tr>
                    ) : (
                      filteredRules.map((rule, index) => (
                        <motion.tr
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                          key={rule.id}
                          className={`transition-colors hover:bg-white/60 ${selectedIds.has(rule.id) ? 'bg-primary/5' : ''}`}
                        >
                          <td className="px-6 py-5 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.has(rule.id)}
                              onChange={() => toggleSelection(rule.id)}
                              className="w-4 h-4 rounded border-black/30 text-primary focus:ring-primary cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-5">
                            <span className={`font-bold tracking-wider text-xs uppercase ${rule.color}`}>{rule.category}</span>
                          </td>
                          <td className="px-4 py-5 text-black font-medium">{rule.activity}</td>
                          <td className={`px-4 py-5 text-center font-bold tracking-wide ${
                            rule.points < 0 ? 'text-rose-600' : 'text-emerald-600'
                          }`}>
                            {rule.points > 0 ? '+' : ''}{rule.points}
                          </td>
                          <td className="px-4 py-5 text-center text-black/70 font-medium">{rule.cap ? `${rule.cap} pts` : '—'}</td>
                          <td className="px-4 py-5 text-center text-black/70 text-xs font-medium">{new Date(rule.effectiveDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                          <td className="px-4 py-5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setRules(rules.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                              }}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                rule.enabled ? 'bg-primary' : 'bg-black/20'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                  rule.enabled ? 'translate-x-4' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </td>
                          <td className="px-6 py-5 text-right flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openHistoryModal(rule)}
                              className="p-1.5 rounded-lg border border-transparent text-black/50 hover:text-black hover:bg-black/5 transition"
                              title="View History"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal(rule)}
                              className="rounded-xl border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-white hover:scale-[1.05]"
                            >
                              Edit
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t border-black/20 px-8 py-4 flex items-center justify-between text-xs text-black/60 font-medium bg-white/20">
                <span>Showing {filteredRules.length} of {rules.length} total point rules</span>
              </div>
            </motion.section>

            {/* Footer */}
            <footer className="mt-auto py-8 text-center text-xs text-black font-medium">
              © 2024 Academic Points Portal. Admin Portal Rules Management.
            </footer>
          </div>
        </div>
      </div>

      {/* Add / Edit Rule Modal */}
      <AnimatePresence>
        {isRuleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 modal-overlay"
              onClick={() => setIsRuleModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card relative z-10 w-full max-w-lg bg-white/80 p-6 shadow-2xl"
            >
              <h3 className="heading text-xl font-bold text-black mb-4">{editingRule ? 'Edit Rule' : 'Add New Rule'}</h3>
              
              {formError && (
                <div className="mb-4 bg-rose-100/80 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-semibold">
                  {formError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-1">Category</label>
                  <select 
                    value={formCategory} onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                  >
                    <option value="ACADEMIC">ACADEMIC</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="CULTURAL">CULTURAL</option>
                    <option value="SERVICE">SERVICE</option>
                    <option value="DEDUCTION">DEDUCTION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-1">Activity Detail</label>
                  <input 
                    type="text" value={formActivity} onChange={(e) => setFormActivity(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    placeholder="e.g. Published Paper in Scopus"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-1">Points</label>
                    <input 
                      type="number" value={formPoints} onChange={(e) => setFormPoints(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      placeholder="e.g. 50 or -20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-1">Annual Cap (Optional)</label>
                    <input 
                      type="number" value={formCap} onChange={(e) => setFormCap(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                      placeholder="Leave empty for infinity"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-1">Effective Date</label>
                  <input 
                    type="date" value={formEffectiveDate} onChange={(e) => setFormEffectiveDate(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setIsRuleModalOpen(false)}
                  className="rounded-xl border border-black/20 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveRule}
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-md transition hover:bg-primary/90 hover:scale-[1.03]"
                >
                  {editingRule ? 'Save Changes' : 'Create Rule'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 modal-overlay"
              onClick={() => setIsHistoryModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card relative z-10 w-full max-w-md bg-white/90 p-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="heading text-xl font-bold text-black mb-1">Audit History</h3>
                  <p className="text-xs font-medium text-black/60">{historyRuleTitle}</p>
                </div>
                <button onClick={() => setIsHistoryModalOpen(false)} className="text-black/50 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {mockHistory.map((item, i) => (
                  <div key={i} className="flex gap-4 border-l-2 border-primary/20 pl-4 relative">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary/80"></div>
                    <div>
                      <p className="text-xs font-bold text-primary">{item.date}</p>
                      <p className="text-sm font-medium text-black">{item.action}</p>
                      <p className="text-xs text-black/60 font-semibold mt-0.5">by {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="w-full rounded-xl border border-black/20 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 modal-overlay"
              onClick={() => setIsDeleteDialogOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card relative z-10 w-full max-w-sm bg-white/95 p-6 shadow-2xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4 border-4 border-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
              <h3 className="heading text-xl font-bold text-black mb-2">Delete Rule{isBulkDelete ? 's' : ''}?</h3>
              <p className="text-sm font-medium text-black/60 mb-6">
                Are you sure you want to delete {isBulkDelete ? `${selectedIds.size} selected rules` : `"${ruleToDelete?.activity}"`}? This action cannot be undone.
              </p>
              
              <div className="flex w-full gap-3">
                <button 
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="flex-1 rounded-xl border border-black/20 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-rose-700 hover:scale-[1.03]"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
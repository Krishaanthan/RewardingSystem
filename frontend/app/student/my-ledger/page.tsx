"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

type LedgerStatus = "APPROVED" | "PENDING" | "COMPLETED" | "REJECTED";

type LedgerRow = {
  id: string;
  dateTime: string;
  description: string;
  credits: number;
  status: LedgerStatus;
  source: string;
};

const ledger: LedgerRow[] = [
  {
    id: "1",
    dateTime: "Oct 24, 2023 09:15 AM",
    description: "Attendance Bonus",
    credits: 50,
    status: "APPROVED",
    source: "System Auto",
  },
  {
    id: "2",
    dateTime: "Oct 22, 2023 02:45 PM",
    description: "Class Participation - Advanced UI",
    credits: 120,
    status: "APPROVED",
    source: "Instructor Smith",
  },
  {
    id: "3",
    dateTime: "Oct 20, 2023 11:30 AM",
    description: "Library Late Fee",
    credits: -25,
    status: "COMPLETED",
    source: "Library Services",
  },
  {
    id: "4",
    dateTime: "Oct 18, 2023 04:00 PM",
    description: "Event Volunteer - Workshop",
    credits: 200,
    status: "PENDING",
    source: "Student Life",
  },
  {
    id: "5",
    dateTime: "Oct 15, 2023 09:00 AM",
    description: "Quiz Milestone 1",
    credits: 75,
    status: "APPROVED",
    source: "System Auto",
  },
  {
    id: "6",
    dateTime: "Oct 12, 2023 01:20 PM",
    description: "Guest Speaker Q&A",
    credits: 30,
    status: "APPROVED",
    source: "Instructor Smith",
  },
  {
    id: "7",
    dateTime: "Oct 10, 2023 10:00 AM",
    description: "Peer Review Bonus",
    credits: 45,
    status: "APPROVED",
    source: "LMS Sync",
  },
  {
    id: "8",
    dateTime: "Oct 05, 2023 05:45 PM",
    description: "Project Submission Early Bird",
    credits: 100,
    status: "PENDING",
    source: "Instructor Doe",
  },
  {
    id: "9",
    dateTime: "Oct 01, 2023 11:00 AM",
    description: "Invalid Certificate Claim",
    credits: 0,
    status: "REJECTED",
    source: "Manual Review",
  },
];

function getStatusLabelAndVariant(status: LedgerStatus) {
  switch (status) {
    case "APPROVED":
      return { label: "APPROVED", variant: "ledger-approved" as const };
    case "PENDING":
      return { label: "PENDING", variant: "ledger-pending" as const };
    case "COMPLETED":
      return { label: "COMPLETED", variant: "ledger-completed" as const };
    case "REJECTED":
      return { label: "REJECTED", variant: "ledger-rejected" as const };
  }
}

function formatCredits(credits: number) {
  const sign = credits > 0 ? "+" : "";
  return `${sign}${credits}`;
}

export default function StudentLedgerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLedger = ledger.filter((row) => {
    const matchesSearch = row.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      row.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#1F2937] font-secondary tracking-tight">
            Points Overview
          </h1>
          <p className="mt-1 text-[15px] text-[#6B7280]">
            Track your earned rewards, pending approvals, and detailed transaction history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Balance Card */}
          <div className="relative overflow-hidden rounded-[20px] bg-[#8F113B] p-8 text-white shadow-lg shadow-brand-primary/20 transition-transform duration-300 hover:-translate-y-1">
            <div className="relative z-10">
              <h2 className="text-[13px] font-semibold tracking-widest text-white/80 uppercase">
                Current Balance Points
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[56px] font-bold leading-none tracking-tight">
                  1,250
                </span>
                <span className="text-[15px] font-medium text-white/70">PTS</span>
              </div>
            </div>
            {/* Piggy Bank SVG Watermark */}
            <svg
              className="absolute -bottom-6 -right-2 h-44 w-44 text-black/[0.12]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.84 8.71C18.6 6.55 16.63 5 14.28 5 13.9 5 13.52 5.06 13.15 5.17L12.3 4.31C11.91 3.92 11.28 3.92 10.89 4.31L10 5.2V5c0-1.1-.9-2-2-2H7C6.45 3 6 3.45 6 4s.45 1 1 1h.52l-.46 1.07c-2.43 1.05-3.8 3.67-3.13 6.31L4.85 16H3c-.55 0-1 .45-1 1s.45 1 1 1h2.24l.58 2.33C5.99 21.05 6.45 21.2 6.88 20.9l1.17-.82c1.23.47 2.58.74 4.02.77l.53 2.15c.13.52.68.84 1.19.7.53-.14.85-.69.7-1.22L14.07 20C17.3 19 19.34 16.32 19.34 13.43c0-.3-.02-.6-.05-.89l2.58.33c.54.07 1.05-.31 1.12-.85s-.31-1.05-.85-1.12l-3.3-4.19zM16 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-5.5-2h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3c.28 0 .5.22.5.5s-.22.5-.5.5z" />
            </svg>
          </div>

          {/* Pending Points Card */}
          <div className="relative overflow-hidden rounded-[20px] bg-white border border-[#E5E7EB] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <div className="relative z-10">
              <h2 className="text-[13px] font-semibold tracking-widest text-[#6B7280] uppercase">
                Points Waiting For Approval
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[56px] font-bold leading-none text-[#1F2937] tracking-tight">
                  320
                </span>
                <span className="text-[15px] font-medium text-[#6B7280]">PTS</span>
              </div>
            </div>
            {/* Clipboard & Clock SVG Watermark */}
            <svg
              className="absolute -bottom-6 -right-2 h-44 w-44 text-[#F3F4F6]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7.1c-.06-.32-.1-.65-.1-1 0-3.31 2.69-6 6-6 .35 0 .68.04 1 .1V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
              <path d="M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm1.5 8H17v-3.5h2.5V19z" />
            </svg>
          </div>
        </div>

        {/* Filters and Table Section */}
        <div className="rounded-[16px] bg-white border border-[#E5E7EB] shadow-sm mb-8">
          <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-[#E5E7EB]">
            <div className="relative w-full lg:w-96 group">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#8F113B] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border-0 rounded-lg text-sm text-[#374151] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#8F113B]/20 transition-shadow outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  STATUS:
                </span>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-[#F9FAFB] pl-3 pr-8 py-2 rounded-lg text-sm text-[#4B5563] border-0 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-[#8F113B]/20 transition-shadow"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  DATE RANGE:
                </span>
                <div className="relative">
                  <select className="appearance-none bg-[#F9FAFB] pl-3 pr-8 py-2 rounded-lg text-sm text-[#4B5563] border-0 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-[#8F113B]/20 transition-shadow">
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-[#8F113B] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7A0E32] active:scale-95 transition-all shadow-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Apply
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="py-4 px-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    Credits
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {filteredLedger.map((row) => {
                  const statusMeta = getStatusLabelAndVariant(row.status);
                  let creditsColor = "text-[#059669]"; // Emerald for positive numeric
                  if (row.credits < 0) creditsColor = "text-[#E11D48]"; // Rose for negative
                  if (row.status === "PENDING") creditsColor = "text-[#2563EB]"; // Blue for pending positive
                  if (row.status === "REJECTED") creditsColor = "text-[#9CA3AF]"; // Gray out rejected credits

                  return (
                    <tr
                      key={row.id}
                      className="group hover:bg-[#F9FAFB]/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-[14px] text-[#4B5563] whitespace-nowrap">
                        {row.dateTime}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[#111827]">
                        {row.description}
                      </td>
                      <td
                        className={`py-4 px-6 text-[15px] font-bold text-center ${creditsColor}`}
                      >
                        {formatCredits(row.credits)}
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          label={statusMeta.label}
                          variant={statusMeta.variant}
                        />
                      </td>
                      <td className="py-4 px-6 text-[13px] text-[#6B7280]">
                        {row.source}
                      </td>
                    </tr>
                  );
                })}
                {filteredLedger.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#6B7280] text-sm">
                      No transactions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-[#E5E7EB]">
            <div className="text-[13px] text-[#6B7280]">
              Showing <span className="font-semibold text-[#374151]">1</span> to{" "}
              <span className="font-semibold text-[#374151]">{filteredLedger.length}</span> of{" "}
              <span className="font-semibold text-[#374151]">42</span> entries
            </div>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 flex items-center justify-center rounded border border-[#E5E7EB] text-[#9CA3AF] hover:bg-gray-50 hover:text-[#374151] transition-colors disabled:opacity-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded bg-[#8F113B] text-white font-medium text-sm transition-transform active:scale-95">
                1
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 hover:text-[#8F113B] font-medium text-sm transition-all active:scale-95">
                2
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 hover:text-[#8F113B] font-medium text-sm transition-all active:scale-95">
                3
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 hover:text-[#374151] transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Download Statement */}
          <button className="flex items-center gap-4 p-5 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#8F113B]/30 hover:shadow-md transition-all group text-left">
            <div className="h-12 w-12 rounded-xl bg-[#FDF1F6] flex items-center justify-center text-[#8F113B] group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#111827] group-hover:text-[#8F113B] transition-colors">
                Download Statement
              </h3>
              <p className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider mt-0.5">
                PDF OR CSV EXPORT
              </p>
            </div>
          </button>

          {/* Dispute Points */}
          <button className="flex items-center gap-4 p-5 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#8F113B]/30 hover:shadow-md transition-all group text-left">
            <div className="h-12 w-12 rounded-xl bg-[#FDF1F6] flex items-center justify-center text-[#8F113B] group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#111827] group-hover:text-[#8F113B] transition-colors">
                Dispute Points
              </h3>
              <p className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider mt-0.5">
                OPEN SUPPORT CASE
              </p>
            </div>
          </button>

          {/* Points Policy */}
          <button className="flex items-center gap-4 p-5 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#8F113B]/30 hover:shadow-md transition-all group text-left">
            <div className="h-12 w-12 rounded-xl bg-[#FDF1F6] flex items-center justify-center text-[#8F113B] group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#111827] group-hover:text-[#8F113B] transition-colors">
                Points Policy
              </h3>
              <p className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider mt-0.5">
                RULES & CONDITIONS
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

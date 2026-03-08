"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ACTIVITY_REWARDS } from "@/lib/activity-rewards";
import { ACTIVITY_PROOF_RULES } from "@/lib/activity-proof-rules";

const activities = Object.keys(ACTIVITY_REWARDS);
const rulesByActivity = Object.fromEntries(
  ACTIVITY_PROOF_RULES.map((r) => [r.activity, r])
);

export default function ClaimPointsPage() {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rule = selectedActivity ? rulesByActivity[selectedActivity] : null;

  return (
    <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
        {/* Main Content */}
        <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-6 pt-28 font-primary">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
            <div>
              <h1 className="heading text-2xl font-bold tracking-wide text-black">Claim Points</h1>
              <p className="text-sm text-black">AI-Powered Submission Verification</p>
            </div>

          </header>

          {/* Top Info Banner */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="max-w-xl text-base leading-relaxed text-black">
              Upload proof files or verification links. Submissions appear in
              Submission Statuses with AI Processing, Approved, or Manual Review.
            </p>
            <Link
              href="/student/submission-statuses"
              className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-black/20 bg-white/40 px-6 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/60"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View Submission<br />Statuses
            </Link>
          </div>

          {/* Form Card */}
          <main className="mx-auto mt-12 w-full max-w-3xl rounded-[2rem] border border-black/20 bg-white/40 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(131,18,56,0.5)]">

            <div className="mb-8 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-primary"></div>
              <h2 className="heading text-2xl font-semibold tracking-wide text-black">Submit Proof</h2>
            </div>

            <form className="space-y-6">
              {/* Activity Select */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Activity
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-left text-black outline-none focus:border-black/20 focus:ring-1 focus:ring-white/50 transition-colors hover:bg-white/60"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className={`truncate ${!selectedActivity ? "text-black" : "text-black"}`}>
                      {selectedActivity ? `${selectedActivity} (${ACTIVITY_REWARDS[selectedActivity]} pts)` : "Select activity"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`h-4 w-4 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  <div className={`absolute left-0 mt-2 w-full z-50 origin-top rounded-xl border border-black/20 bg-tertiary p-1 backdrop-blur-xl shadow-2xl transition-all duration-200 ease-in-out ${isDropdownOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
                    <ul className="max-h-60 overflow-y-auto rounded-lg text-sm text-black [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
                      {activities.map((activity) => (
                        <li
                          key={activity}
                          role="option"
                          aria-selected={selectedActivity === activity}
                          onClick={() => {
                            setSelectedActivity(activity);
                            setIsDropdownOpen(false);
                          }}
                          className={`cursor-pointer rounded-md px-4 py-3 transition-colors hover:bg-white/60 ${selectedActivity === activity ? 'bg-white/80 font-semibold text-black' : ''}`}
                        >
                          {activity} ({ACTIVITY_REWARDS[activity]} pts)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {rule && (
                <>
                  {/* Verification Requirements Alert */}
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 text-sm">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-wider text-xs uppercase mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span>Verification Requirements</span>
                    </div>
                    <p className="text-black">
                      {rule.requiredProof}
                    </p>
                    <p className="mt-1 text-black italic text-xs">
                      Common challenges: {rule.fraudChallenge}
                    </p>
                  </div>

                  <h3 className="text-xs font-bold tracking-widest text-black uppercase pt-4">
                    Required Proof For Submission
                  </h3>

                  {/* Dynamic Fields */}
                  <div className="space-y-4">
                    {rule.fields.map((field) =>
                      field.type === "link" ? (
                        <div key={field.id}>
                          <label className="mb-2 block text-sm font-medium text-black">
                            {field.label} {field.required && <span className="text-primary">*</span>}
                          </label>
                          <input
                            type="url"
                            placeholder={field.placeholder ?? "https://..."}
                            required={field.required}
                            className="w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none placeholder:text-black focus:border-black/20 focus:ring-1 focus:ring-white/50"
                          />
                        </div>
                      ) : (
                        <div key={field.id}>
                          <label className="mb-2 block text-sm font-medium text-black">
                            {field.label} {field.required && <span className="text-primary">*</span>}
                          </label>
                          <div className="relative flex items-center overflow-hidden rounded-xl border border-black/20 bg-white/40 transition-colors hover:bg-white/60 focus-within:border-black/20 focus-within:ring-1 focus-within:ring-white/50">
                            <input
                              type="file"
                              accept={field.accept ?? ".pdf,image/*"}
                              required={field.required}
                              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                              onChange={(e) => {
                                const span = e.target.nextElementSibling;
                                if (span) {
                                  span.textContent = e.target.files?.[0]?.name || "No file chosen";
                                  span.classList.replace("text-black", "text-black");
                                }
                              }}
                            />
                            <span className="flex-1 truncate px-4 py-3 text-sm text-black">
                              No file chosen
                            </span>
                            <span className="m-1 flex-shrink-0 cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-secondary transition hover:bg-primary/80 peer-valid:bg-primary">
                              Choose file
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {selectedActivity && !rule && (
                <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  Proof rules for this activity are being configured. Please select
                  another activity or contact support.
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!selectedActivity || !rule}
                  className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-secondary transition-all hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Submit Claim
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </form>
          </main>

          {/* Footer */}
          <footer className="mt-auto py-8 text-center text-xs text-black">
            © 2024 Academic Points Portal. All submissions are processed by Neural AI.
          </footer>
        </div>
      </div>
    </div>
  );
}

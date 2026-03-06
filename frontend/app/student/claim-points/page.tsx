<<<<<<< Updated upstream
"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalLayout } from "@/components/ui/PortalLayout";
import { Button } from "@/components/ui/Button";
import { ACTIVITY_REWARDS } from "@/lib/activity-rewards";
import { ACTIVITY_PROOF_RULES } from "@/lib/activity-proof-rules";
import { studentNav } from "@/lib/nav";

const activities = Object.keys(ACTIVITY_REWARDS);
const rulesByActivity = Object.fromEntries(
  ACTIVITY_PROOF_RULES.map((r) => [r.activity, r])
);

export default function ClaimPointsPage() {
  const [selectedActivity, setSelectedActivity] = useState("");

  const rule = selectedActivity ? rulesByActivity[selectedActivity] : null;
=======
import Link from "next/link";
>>>>>>> Stashed changes

  return (
<<<<<<< Updated upstream
    <PortalLayout
      title="Claim Points"
      description="Submit proof for activities. AI verifies and updates Submission Statuses automatically."
      navItems={studentNav}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-text/80">
            Upload proof files or verification links. Submissions appear in
            Submission Statuses with AI Processing, Approved, or Manual Review.
          </p>
          <Link href="/student/submission-statuses">
            <Button variant="outline">View Submission Statuses</Button>
          </Link>
        </div>

        <form className="card space-y-6">
          <h2 className="heading text-xl">Submit Proof</h2>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Activity</span>
            <select
              required
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full rounded-xl border border-brand-tertiary px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-primary/30"
            >
              <option value="">Select activity</option>
              {activities.map((activity) => (
                <option key={activity} value={activity}>
                  {activity} ({ACTIVITY_REWARDS[activity]} pts)
                </option>
              ))}
            </select>
          </label>

          {rule && (
            <>
              <div className="rounded-xl border border-brand-tertiary/50 bg-brand-tertiary/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary/80">
                  Verification requirements
                </p>
                <p className="mt-2 text-sm text-brand-text/90">
                  {rule.requiredProof}
                </p>
                <p className="mt-3 text-xs text-brand-text/70">
                  <span className="font-medium">Common challenges:</span>{" "}
                  {rule.fraudChallenge}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-brand-primary">
                  Required proof for submission
                </h3>
                {rule.fields.map((field) =>
                  field.type === "link" ? (
                    <label key={field.id} className="block">
                      <span className="mb-2 block text-sm font-medium">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-rose-600">*</span>
                        )}
                      </span>
                      <input
                        type="url"
                        placeholder={field.placeholder ?? "https://..."}
                        required={field.required}
                        className="w-full rounded-xl border border-brand-tertiary px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-primary/30"
                      />
                    </label>
                  ) : (
                    <label key={field.id} className="block">
                      <span className="mb-2 block text-sm font-medium">
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-rose-600">*</span>
                        )}
                      </span>
                      <input
                        type="file"
                        accept={field.accept ?? ".pdf,image/*"}
                        required={field.required}
                        className="w-full rounded-xl border border-brand-tertiary p-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:opacity-90"
                      />
                    </label>
                  )
                )}
              </div>
            </>
          )}

          {selectedActivity && !rule && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Proof rules for this activity are being configured. Please select
              another activity or contact support.
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={!selectedActivity || !rule}
          >
            Submit Claim
          </Button>
        </form>
      </div>
    </PortalLayout>
=======
    <div className="relative min-h-screen w-full overflow-hidden text-white font-primary">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/assets/Videos/compressed red fluid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text readability against the red video */}
      <div className="absolute inset-0 z-0 bg-black/30 bg-gradient-to-b from-black/40 via-transparent to-black/40 mix-blend-multiply" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 font-primary">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/20 pb-4">
          <div>
            <h1 className="heading text-2xl font-bold tracking-wide text-white">Claim Points</h1>
            <p className="text-sm text-white/70">AI-Powered Submission Verification</p>
          </div>
          <nav className="mt-4 flex gap-4 md:mt-0 text-sm font-medium">
            <Link
              href="/student/claim-points"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2 backdrop-blur-md transition hover:bg-white/20"
            >
              Claim Points
            </Link>
            <Link
              href="/student/my-ledger"
              className="px-6 py-2 text-white/70 transition hover:text-white"
            >
              Submission Statuses
            </Link>
          </nav>
        </header>

        {/* Top Info Banner */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="max-w-xl text-base leading-relaxed text-white/90">
            Upload proof files or verification links. Submissions appear in
            Submission Statuses with AI Processing, Approved, or Manual Review.
          </p>
          <Link
            href="/student/my-ledger"
            className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View Submission<br/>Statuses
          </Link>
        </div>

        {/* Form Card */}
        <main className="mx-auto mt-12 w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/5 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)]">
          
          <div className="mb-8 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-brand-primary" style={{ backgroundColor: '#ff4d79' }}></div>
            <h2 className="heading text-2xl font-semibold tracking-wide text-white">Submit Proof</h2>
          </div>

          <form className="space-y-6">
            {/* Activity Select */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Activity
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 [&>option]:text-brand-text">
                  <option value="" disabled selected hidden>Select activity</option>
                  <option value="hackathon">Hackathon / Technical Event</option>
                  <option value="paper">Paper Presentation / Publication</option>
                  <option value="nss">NSS / NCC Volunteering</option>
                  <option value="cultural">Cultural Activities</option>
                  <option value="sports">Sports Achievements</option>
                  <option value="global">Global Certification (AWS, Azure, etc.)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Verification Requirements Alert */}
            <div className="rounded-xl border border-[#ff4d79]/30 bg-[#ff4d79]/10 p-5 text-sm">
              <div className="flex items-center gap-2 text-[#ff4d79] font-bold tracking-wider text-xs uppercase mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>Verification Requirements</span>
              </div>
              <p className="text-white/90">
                Upload participation certificate or event photo + signed faculty letter (Od letter).
              </p>
              <p className="mt-1 text-white/60 italic text-xs">
                Common challenges: Re-watermarked proof
              </p>
            </div>

            <h3 className="text-xs font-bold tracking-widest text-white/60 uppercase pt-4">
              Required Proof For Submission
            </h3>

            {/* Participation Certificate Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/90">
                Participation certificate or event photo *
              </label>
              <div className="relative flex items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 transition-colors hover:bg-white/15 focus-within:border-white/50 focus-within:ring-1 focus-within:ring-white/50">
                <input
                  type="file"
                  id="cert-upload"
                  className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <span className="flex-1 truncate px-4 py-3 text-sm text-white/50 peer-valid:text-white">
                  No file chosen
                </span>
                <span className="m-1 flex-shrink-0 cursor-pointer rounded-lg bg-[#8F113B] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#a61a49]">
                  Choose file
                </span>
              </div>
            </div>

            {/* Faculty Letter Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/90">
                Signed faculty letter (Od letter) *
              </label>
              <div className="relative flex items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 transition-colors hover:bg-white/15 focus-within:border-white/50 focus-within:ring-1 focus-within:ring-white/50">
                <input
                  type="file"
                  id="faculty-upload"
                  className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <span className="flex-1 truncate px-4 py-3 text-sm text-white/50 peer-valid:text-white">
                  No file chosen
                </span>
                <span className="m-1 flex-shrink-0 cursor-pointer rounded-lg bg-[#8F113B] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#a61a49]">
                  Choose file
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                className="group flex items-center gap-2 rounded-xl bg-[#8F113B] px-8 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(143,17,59,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-black/50"
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
        <footer className="mt-auto py-8 text-center text-xs text-white/50">
          © 2024 Academic Points Portal. All submissions are processed by Neural AI.
        </footer>
      </div>
    </div>
>>>>>>> Stashed changes
  );
}

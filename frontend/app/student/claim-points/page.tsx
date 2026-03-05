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

  return (
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
  );
}

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
    <PortalLayout
      title="Claim Points"
      description="Submit proof files and verification links by category."
      navItems={studentNav}
    >
      <section className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <form key={category} className="card space-y-4">
            <h2 className="heading text-xl">{category}</h2>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Upload Proof (PDF/Image)</span>
              <input type="file" className="w-full rounded-xl border border-brand-primary/20 p-2" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Verification URL</span>
              <input
                type="url"
                placeholder="https://..."
                className="w-full rounded-xl border border-brand-primary/20 px-4 py-2"
              />
            </label>
            <button
              type="button"
              className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white"
            >
              Submit Claim
            </button>
          </form>
        ))}
      </section>
    </PortalLayout>
  );
}

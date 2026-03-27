'use client';

import { PortalLayout } from '@/components/ui/PortalLayout';
import { adminNav } from '@/lib/nav';

export default function AdminAiSettingsPage() {
  return (
    <PortalLayout
      title="Admin Settings"
      description="Configure AI strictness, confidence thresholds, and verification behaviour."
      navItems={adminNav}
    >
      <section className="space-y-4">
        {/* AI Engine Status Banner */}
        <div className="card flex flex-col gap-4 bg-gradient-to-r from-brand-primary to-rose-500 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">AI Verification Active</h2>
              <p className="text-xs text-white/80">
                Model: v2.3-strict · Processing ~240 requests/day · Avg. confidence: 78%
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-semibold">78%</div>
              <div className="text-xs text-white/80">AVG. CONFIDENCE</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1.4fr]">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Confidence Thresholds */}
            <div className="card space-y-4">
              <div>
                <h3 className="heading text-base">Confidence Thresholds</h3>
                <p className="mt-1 text-xs text-brand-text/70">
                  Control when AI auto-approves or flags submissions.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-brand-text">
                    Minimum Confidence (Flag for Review)
                  </span>
                  <span className="font-semibold text-brand-primary">72%</span>
                </div>
                <input type="range" defaultValue={72} className="w-full accent-brand-primary" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-brand-text">
                    Auto-Approve Threshold (Approve Automatically)
                  </span>
                  <span className="font-semibold text-brand-primary">85%</span>
                </div>
                <input type="range" defaultValue={85} className="w-full accent-brand-primary" />
              </div>
            </div>

            {/* AI Strictness Level */}
            <div className="card space-y-4">
              <div>
                <h3 className="heading text-base">AI Strictness Level</h3>
                <p className="mt-1 text-xs text-brand-text/70">
                  How rigorously the AI scrutinises uploaded proofs.
                </p>
              </div>

              <div className="grid gap-3 text-xs md:grid-cols-3">
                <button
                  type="button"
                  className="rounded-2xl border border-brand-primary/10 bg-secondary px-3 py-3 text-left"
                >
                  <div className="font-semibold text-brand-text">Lenient</div>
                  <p className="mt-1 text-[11px] text-brand-text/70">
                    Approve most submissions, only flag obvious fraud.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border-2 border-brand-primary bg-secondary px-3 py-3 text-left"
                >
                  <div className="font-semibold text-brand-text">
                    Moderate <span className="text-rose-500">(Recommended)</span>
                  </div>
                  <p className="mt-1 text-[11px] text-brand-text/70">
                    Balanced approach – flag uncertain cases for review.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-brand-primary/10 bg-secondary px-3 py-3 text-left"
                >
                  <div className="font-semibold text-brand-text">Strict</div>
                  <p className="mt-1 text-[11px] text-brand-text/70">
                    High scrutiny – most submissions require verifier review.
                  </p>
                </button>
              </div>

              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-brand-text/70">AI Model Version</span>
                <select className="rounded-xl border border-brand-primary/20 bg-secondary px-3 py-1 text-xs">
                  <option>v2.3-strict</option>
                  <option>v2.2-balanced</option>
                  <option>v2.1-legacy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Verification Behaviour */}
            <div className="card space-y-3">
              <div>
                <h3 className="heading text-base">Verification Behaviour</h3>
                <p className="mt-1 text-xs text-brand-text/70">
                  Control AI decision-making and review workflows.
                </p>
              </div>

              {[
                { label: 'Require Manual Review', enabled: true },
                { label: 'Allow AI Rejection', enabled: false },
                { label: 'Duplicate Detection', enabled: true },
                { label: 'Tamper Detection', enabled: true }
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs text-brand-text"
                >
                  <span>{item.label}</span>
                  <button
                    type="button"
                    className={`relative inline-flex h-5 w-9 items-center rounded-full ${item.enabled ? 'bg-brand-primary' : 'bg-brand-primary/20'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${item.enabled ? 'translate-x-4' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Notifications & Limits */}
            <div className="card space-y-4">
              <div>
                <h3 className="heading text-base">Notifications &amp; Limits</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span>Notify Verifier on Flag</span>
                  <button
                    type="button"
                    className="relative inline-flex h-5 w-9 items-center rounded-full bg-brand-primary"
                  >
                    <span className="inline-block h-4 w-4 translate-x-4 rounded-full bg-white shadow" />
                  </button>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span>Max Document Size</span>
                    <span className="font-semibold text-brand-primary">10 MB</span>
                  </div>
                  <input type="range" defaultValue={60} className="w-full accent-brand-primary" />
                </div>

                <div className="mt-2">
                  <span className="text-xs text-brand-text/70">Review Queue Order</span>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-full bg-brand-primary px-3 py-2 text-xs font-semibold text-white"
                    >
                      FIFO (First In First Out)
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-full border border-brand-primary/20 bg-secondary px-3 py-2 text-xs font-semibold text-brand-primary"
                    >
                      Priority First
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>
    </PortalLayout>
  );
}
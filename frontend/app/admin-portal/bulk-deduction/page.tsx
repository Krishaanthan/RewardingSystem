'use client';

import { PortalLayout } from '@/components/ui/PortalLayout';
import { adminNav } from '@/lib/nav';

const history = [
  {
    id: 'BLK-001',
    date: '2026-02-14',
    type: 'Attendance Shortage',
    success: '140 / 2',
    total: '-2,800',
    status: 'COMPLETED'
  },
  {
    id: 'BLK-002',
    date: '2026-01-28',
    type: 'Malpractice',
    success: '18 / 0',
    total: '-900',
    status: 'COMPLETED'
  }
];

export default function AdminBulkDeductionsPage() {
  return (
    <PortalLayout
      title="Bulk Deductions"
      description="ERP integration portal – negative point processing."
      navItems={adminNav}
    >
      <section className="space-y-4">
        {/* Upload + CSV guide */}
        <div className="card grid gap-6 lg:grid-cols-[2fr_1.4fr]">
          {/* Left: upload + form */}
          <div className="space-y-5">
            {/* Stepper */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-brand-text/70">
              {['Upload', 'Preview', 'Confirm', 'Done'].map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      idx === 0
                        ? 'bg-brand-primary text-white'
                        : 'bg-secondary text-brand-text/60'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className={idx === 0 ? 'text-brand-primary' : ''}>{step}</span>
                  {idx < 3 && <div className="h-px w-6 bg-brand-primary/20" />}
                </div>
              ))}
            </div>

            {/* Import Deduction Batch card */}
            <div className="rounded-2xl border border-brand-primary/10 bg-secondary px-6 py-6">
              <h2 className="heading text-base">Import Deduction Batch</h2>
              <p className="mt-1 text-xs text-brand-text/70">
                Drag &amp; drop your ERP export here to apply bulk negative points.
              </p>

              <div className="mt-4 rounded-2xl border border-dashed border-brand-primary/30 bg-white px-6 py-10 text-center">
                <div className="mx-auto mb-3 h-10 w-12 rounded-md bg-brand-primary/10" />
                <p className="text-sm font-semibold text-brand-text">
                  Drag &amp; drop your CSV file here
                </p>
                <p className="mt-1 text-xs text-brand-text/60">
                  Supports .csv, .xlsx (Max 5MB)
                </p>
              </div>

              <div className="mt-5 grid gap-4 text-xs md:grid-cols-2">
                <label className="space-y-1">
                  <span className="font-medium text-brand-text">Deduction Category</span>
                  <select className="w-full rounded-xl border border-brand-primary/20 bg-white px-3 py-2">
                    <option>Attendance Shortage</option>
                    <option>Malpractice</option>
                    <option>Disciplinary Action</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="font-medium text-brand-text">Academic Period</span>
                  <select className="w-full rounded-xl border border-brand-primary/20 bg-white px-3 py-2">
                    <option>Even Semester 2025–26</option>
                    <option>Odd Semester 2025–26</option>
                  </select>
                </label>
              </div>

              <label className="mt-4 block text-xs">
                <span className="mb-1 block font-medium text-brand-text">Administrative Note</span>
                <textarea
                  className="min-h-[72px] w-full rounded-xl border border-brand-primary/20 bg-white px-3 py-2 text-sm"
                  placeholder="Reason for the batch deduction..."
                />
              </label>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white"
                >
                  Preview Data →
                </button>
              </div>
            </div>
          </div>

          {/* Right: CSV Format Guide */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="heading text-base">CSV Format Guide</h3>
                <p className="mt-1 text-xs text-brand-text/70">
                  Ensure your columns match this structure before uploading.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-brand-primary/20 bg-secondary px-4 py-2 text-xs font-semibold text-brand-primary"
              >
                Download Template CSV
              </button>
            </div>

            <div className="rounded-2xl bg-[#0b1120] p-4 text-xs text-slate-100">
              <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>deduction_v1.csv</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">
{`reg_no,reason,deduction_pts
SB2022018,Attendance < 75%,20
SB2022045,Malpractice,50
SB2022090,Attendance < 75%,20`}
              </pre>
            </div>

            <ul className="space-y-2 text-xs text-brand-text/70">
              <li>
                <span className="font-semibold text-brand-text">reg_no</span>: Unique student
                registration ID. Required for mapping.
              </li>
              <li>
                <span className="font-semibold text-brand-text">reason</span>: Public reason
                displayed in student dashboard.
              </li>
              <li>
                <span className="font-semibold text-brand-text">deduction_pts</span>: Negative
                integer. Points will be subtracted.
              </li>
            </ul>
          </div>
        </div>

        {/* Processing History */}
        <section className="card space-y-3">
          <h3 className="heading text-base">Processing History</h3>
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-brand-primary/10 text-xs text-brand-text/70">
                  <th className="py-3 pr-4">Batch ID</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Success / Errors</th>
                  <th className="py-3 pr-4">Total Pts</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id} className="border-b border-brand-primary/10 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-brand-primary">{row.id}</td>
                    <td className="py-3 pr-4 text-sm text-brand-text/80">{row.date}</td>
                    <td className="py-3 pr-4 text-sm text-brand-text/80">{row.type}</td>
                    <td className="py-3 pr-4 text-sm text-brand-text/80">{row.success}</td>
                    <td className="py-3 pr-4 text-sm font-semibold text-red-500">{row.total}</td>
                    <td className="py-3 pr-4 text-xs font-semibold text-emerald-600">
                      ● {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </PortalLayout>
  );
}
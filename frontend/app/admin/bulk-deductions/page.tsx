import { PortalLayout } from "@/components/ui/PortalLayout";
import { adminNav } from "@/lib/nav";

export default function AdminBulkDeductionsPage() {
  return (
    <PortalLayout
      title="Bulk Deductions"
      description="Secure ERP import for negative point deductions."
      navItems={adminNav}
    >
      <form className="card max-w-2xl space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Upload ERP Sheet (CSV/XLSX)</span>
          <input type="file" className="w-full rounded-xl border border-brand-primary/20 p-2" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Reason Category</span>
          <select className="w-full rounded-xl border border-brand-primary/20 px-4 py-2">
            <option>Attendance Shortage</option>
            <option>Malpractice</option>
            <option>Disciplinary Action</option>
          </select>
        </label>
        <button
          type="button"
          className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white"
        >
          Process Deductions
        </button>
      </form>
    </PortalLayout>
  );
}

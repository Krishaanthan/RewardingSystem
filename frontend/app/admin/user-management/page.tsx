import { PortalLayout } from "@/components/ui/PortalLayout";
import { adminNav } from "@/lib/nav";

export default function AdminUserManagementPage() {
  return (
    <PortalLayout
      title="User Management"
      description="Search student profiles and assign verifier roles."
      navItems={adminNav}
    >
      <section className="card space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Search Student / Faculty</span>
          <input
            placeholder="Registration number, email, or name"
            className="w-full rounded-xl border border-brand-primary/20 px-4 py-2"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white">
            View Ledger
          </button>
          <button className="rounded-xl border border-brand-primary/20 px-4 py-2 font-semibold text-brand-primary">
            Assign Verifier Role
          </button>
        </div>
      </section>
    </PortalLayout>
  );
}

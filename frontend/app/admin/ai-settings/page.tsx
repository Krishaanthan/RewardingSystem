import { PortalLayout } from "@/components/ui/PortalLayout";
import { adminNav } from "@/lib/nav";

export default function AdminAiSettingsPage() {
  return (
    <PortalLayout
      title="AI Settings"
      description="Adjust strictness and confidence thresholds for verification."
      navItems={adminNav}
    >
      <form className="card max-w-2xl space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Auto-Approval Threshold (%)</span>
          <input
            type="range"
            defaultValue={80}
            className="w-full accent-brand-primary"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Manual Review Threshold (%)</span>
          <input
            type="range"
            defaultValue={50}
            className="w-full accent-brand-primary"
          />
        </label>
        <button
          type="button"
          className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white"
        >
          Save AI Configuration
        </button>
      </form>
    </PortalLayout>
  );
}

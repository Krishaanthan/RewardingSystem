import { PortalLayout } from "@/components/ui/PortalLayout";
import { facultyNav } from "@/lib/nav";

export default function FacultyDirectAwardPage() {
  return (
    <PortalLayout
      title="Direct Award"
      description="Grant points manually for workshops or approved bulk events."
      navItems={facultyNav}
    >
      <form className="card max-w-2xl space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Student Registration Number</span>
          <input className="w-full rounded-xl border border-brand-primary/20 px-4 py-2" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Reason</span>
          <input className="w-full rounded-xl border border-brand-primary/20 px-4 py-2" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Points</span>
          <input type="number" className="w-full rounded-xl border border-brand-primary/20 px-4 py-2" />
        </label>
        <button
          type="button"
          className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white"
        >
          Award Points
        </button>
      </form>
    </PortalLayout>
  );
}

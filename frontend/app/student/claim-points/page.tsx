import { PortalLayout } from "@/components/ui/PortalLayout";
import { studentNav } from "@/lib/nav";

const categories = ["Academics", "Co-curricular", "Extracurricular", "Global Certifications"];

export default function StudentClaimPointsPage() {
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

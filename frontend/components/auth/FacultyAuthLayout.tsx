import type { ReactNode } from "react";
import Link from "next/link";

type PortalId = "student" | "faculty" | "admin";

type FacultyAuthLayoutProps = {
  title: string;
  subtitle?: string;
  activePortal: PortalId;
  children: ReactNode;
};

const PORTALS: { id: PortalId; label: string; href: string }[] = [
  { id: "student", label: "Student Portal", href: "/student-login" },
  { id: "faculty", label: "Faculty Portal", href: "/faculty-login" },
  { id: "admin", label: "Admin Portal", href: "/admin-login" }
];

const PRIMARY = "#8F113B";
const SECONDARY = "#ffffff";

export function FacultyAuthLayout({
  title,
  subtitle,
  activePortal,
  children
}: FacultyAuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-black font-primary bg-white">
      {/* Dark overlay to ensure text readability against the background */}
      <div className="absolute inset-0 z-0 bg-white/60 bg-gradient-to-b from-white/80 via-transparent to-white/80 mix-blend-screen pointer-events-none" />

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">

        <section
          className="relative min-h-screen isolate bg-cover bg-center bg-no-repeat flex flex-col justify-center"
          style={{
            backgroundImage: 'url("/assets/images/sist-admin-block.png")',
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-12 lg:items-center lg:px-6">
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-[#8F113B]/20 blur-xl opacity-60 transition-opacity" />
                <div
                  className="relative rounded-[2rem] border border-black/20 bg-white/40 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(131,18,56,0.5)]"
                >
                  <div className="mb-6 space-y-1">

                    <h2
                      className="text-2xl font-semibold text-[#8F113B] font-primary"
                    >
                      {title}
                    </h2>
                    {subtitle ? (
                      <p
                        className="text-sm text-black/70 font-primary"
                      >
                        {subtitle}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-5">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/50 backdrop-blur-md pb-12 pt-16 border-t border-black/10">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-10 px-4 sm:gap-14">
            {PORTALS.map((portal) => {
              const isActive = portal.id === activePortal;

              return (
                <Link
                  key={portal.id}
                  href={portal.href}
                  className="flex flex-col items-center gap-3 text-center transition-opacity hover:opacity-80 font-primary"
                >
                  <span
                    className={[
                      "flex h-16 w-16 items-center justify-center rounded-full border border-black/20 transition-colors backdrop-blur-sm",
                      isActive
                        ? "bg-[#8F113B] text-white shadow-[0_0_20px_rgba(131,18,56,0.5)]"
                        : "bg-white/40 text-black/50 hover:bg-white/60"
                    ].join(" ")}
                  >
                    <span
                      className={isActive ? "text-lg font-semibold" : "text-lg font-medium text-black/50"}
                    >
                      {portal.label.charAt(0)}
                    </span>
                  </span>
                  <span
                    className={isActive ? "text-xs font-semibold text-black" : "text-xs font-medium text-black/50"}
                  >
                    {portal.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

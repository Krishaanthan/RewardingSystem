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
    <div className="min-h-screen bg-[#f3f4f6]">
      <section
        className="relative isolate bg-cover bg-center bg-no-repeat min-h-[90vh]"
        style={{
          backgroundImage: 'url("/assets/images/sist-admin-block.png")',
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center gap-4 px-4 py-6 lg:px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: SECONDARY }}
            >
              <span
                className="text-xl font-bold"
                style={{ color: PRIMARY, fontFamily: '"League Spartan", system-ui, sans-serif' }}
              >
                S
              </span>
            </div>
            <div className="text-white">
              <p
                className="text-lg font-semibold leading-tight tracking-wide"
                style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
              >
                SATHYABAMA
              </p>
              <p
                className="text-xs leading-snug text-gray-100/90"
                style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
              >
                INSTITUTE OF SCIENCE AND TECHNOLOGY
                <br />
                (DEEMED TO BE UNIVERSITY)
              </p>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-4 lg:flex-row lg:items-center lg:px-6 lg:pb-28 lg:pt-2">
          <div className="max-w-xl text-white">
            <h1
              className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Faculty Reward Management Portal
            </h1>
            <p
              className="mt-4 text-sm leading-relaxed text-gray-100/80 sm:text-base"
              style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
            >
              Secure portal for faculty to manage student rewards, track achievements, and oversee academic engagement
              within Sathyabama Institute of Science and Technology.
            </p>
          </div>

          <div className="w-full max-w-md lg:ml-auto lg:self-stretch">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-black/10 blur-lg" />
              <div
                className="relative rounded-2xl p-8 shadow-[0_18px_45px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: SECONDARY }}
              >
                <div className="mb-6 space-y-1">
                  <p
                    className="text-xs font-black tracking-[0.28em]"
                    style={{ color: PRIMARY, fontFamily: '"Archivo Black", system-ui, sans-serif' }}
                  >
                    FACULTY LOGIN
                  </p>
                  <h2
                    className="text-2xl font-semibold text-gray-900"
                    style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
                  >
                    {title}
                  </h2>
                  {subtitle ? (
                    <p
                      className="text-sm text-gray-500"
                      style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
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

      <section className="-mt-10 bg-white pb-12 pt-16">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-10 px-4 sm:gap-14">
          {PORTALS.map((portal) => {
            const isActive = portal.id === activePortal;

            return (
              <Link
                key={portal.id}
                href={portal.href}
                className="flex flex-col items-center gap-3 text-center"
                style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
              >
                <span
                  className={[
                    "flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors",
                    isActive ? "ring-4 ring-[#8F113B]/20" : "border-gray-300 bg-white"
                  ].join(" ")}
                  style={
                    isActive
                      ? { borderColor: PRIMARY, backgroundColor: SECONDARY }
                      : undefined
                  }
                >
                  <span
                    className={isActive ? "text-sm font-semibold" : "text-sm font-medium text-gray-500"}
                    style={isActive ? { color: PRIMARY } : undefined}
                  >
                    {portal.label.charAt(0)}
                  </span>
                </span>
                <span
                  className={isActive ? "text-xs font-semibold" : "text-xs font-medium text-gray-500"}
                  style={isActive ? { color: PRIMARY } : undefined}
                >
                  {portal.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";

type PortalId = "student" | "faculty" | "admin";

type StudentAuthLayoutProps = {
  mode: "login" | "register";
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

export function StudentAuthLayout({
  mode,
  title,
  subtitle,
  activePortal,
  children
}: StudentAuthLayoutProps) {
  const loginLabel = mode === "login" ? "STUDENT LOGIN" : "STUDENT REGISTRATION";

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-primary bg-black">
      {/* Dark overlay to ensure text readability against the red background */}
      <div className="absolute inset-0 z-0 bg-black/60 bg-gradient-to-b from-black/80 via-transparent to-black/80 mix-blend-multiply pointer-events-none" />

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">

        <section
          className="relative min-h-screen isolate bg-cover bg-center bg-no-repeat flex flex-col justify-center"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1600")'
          }}
        >
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center lg:px-6">
            <div className="max-w-xl text-white">
              <h1
                className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
                style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
              >
                Student Reward Management System
              </h1>
              <p
                className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base"
                style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
              >
                Secure portal for students to access rewards, track achievements, and manage academic engagement within
                Sathyabama Institute of Science and Technology.
              </p>
            </div>

            <div className="w-full max-w-md lg:ml-auto lg:self-stretch">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-[#ff4d79]/10 blur-xl opacity-50 transition-opacity" />
                <div className="relative rounded-[2rem] border border-white/20 bg-white/5 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)]">
                  <div className="mb-6 space-y-1">
                    <p
                      className="text-xs font-black tracking-[0.28em] text-[#ff4d79]"
                      style={{ fontFamily: '"Archivo Black", system-ui, sans-serif' }}
                    >
                      {loginLabel}
                    </p>
                    <h2
                      className="text-2xl font-semibold text-white"
                      style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
                    >
                      {title}
                    </h2>
                    {subtitle ? (
                      <p
                        className="text-sm text-white/70"
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

        <section className="bg-black/50 backdrop-blur-md pb-12 pt-16 border-t border-white/10">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-10 px-4 sm:gap-14">
            {PORTALS.map((portal) => {
              const isActive = portal.id === activePortal;

              return (
                <Link
                  key={portal.id}
                  href={portal.href}
                  className="flex flex-col items-center gap-3 text-center transition-opacity hover:opacity-80"
                  style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
                >
                  <span
                    className={[
                      "flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors backdrop-blur-sm",
                      isActive
                        ? "bg-[#8F113B]/80 text-white shadow-[0_0_20px_rgba(143,17,59,0.5)]"
                        : "bg-white/10 text-white/50 hover:bg-white/20"
                    ].join(" ")}
                  >
                    <span
                      className={isActive ? "text-lg font-semibold" : "text-lg font-medium text-white/50"}
                    >
                      {portal.label.charAt(0)}
                    </span>
                  </span>
                  <span
                    className={isActive ? "text-xs font-semibold text-white" : "text-xs font-medium text-white/50"}
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


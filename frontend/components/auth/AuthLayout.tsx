"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type CtaLink = {
  label: string;
  href: string;
};

type PortalId = "student" | "faculty" | "admin";

const PORTALS: { id: PortalId; label: string; href: string }[] = [
  { id: "student", label: "Student Portal", href: "/student-login" },
  { id: "faculty", label: "Faculty Portal", href: "/faculty-login" },
  { id: "admin", label: "Admin Portal", href: "/admin-login" }
];

export function AuthLayout({
  title,
  subtitle,
  fields,
  buttonLabel,
  links,
  activePortal
}: {
  title: string;
  subtitle: string;
  fields: string[];
  buttonLabel: string;
  links: CtaLink[];
  activePortal?: PortalId;
}) {
  const currentPortal = activePortal || "admin";

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-black font-primary bg-white">
      <div className="absolute inset-0 z-0 bg-white/60 bg-gradient-to-b from-white/80 via-transparent to-white/80 mix-blend-screen pointer-events-none" />

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

                {/* Animated glow blob */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-[#8F113B]/20 blur-xl opacity-60"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Card entrance */}
                <motion.div
                  className="relative rounded-[2rem] border border-black/20 bg-white/40 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(131,18,56,0.5)]"
                  initial={{ opacity: 0, y: 32, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Title */}
                  <motion.div
                    className="mb-6 space-y-1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-semibold text-[#8F113B] font-primary">
                      {title}
                    </h2>
                    {subtitle ? (
                      <p className="text-sm text-black/70 font-primary">{subtitle}</p>
                    ) : null}
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    className="space-y-5"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
                  >
                    {fields.map((field, i) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                      >
                        <label className="mb-1.5 block text-sm text-black font-primary">
                          {field}
                        </label>
                        <input
                          type={field.toLowerCase().includes("password") || field.toLowerCase().includes("code") ? "password" : "text"}
                          className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50 font-primary"
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      </motion.div>
                    ))}

                    <motion.button
                      type="button"
                      className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-white/50 font-primary"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + fields.length * 0.07, duration: 0.35 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {buttonLabel}
                    </motion.button>

                    <p className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-black/60 font-primary">
                      {links.map((link) => (
                        <Link key={link.href} href={link.href} className="font-semibold text-[#8F113B] hover:underline">
                          {link.label}
                        </Link>
                      ))}
                    </p>
                  </motion.form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Portal switcher */}
        <section className="bg-white/50 backdrop-blur-md pb-12 pt-16 border-t border-black/10">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-10 px-4 sm:gap-14">
            {PORTALS.map((portal, i) => {
              const isActive = portal.id === currentPortal;
              return (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
                >
                  <Link
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
                      <span className={isActive ? "text-lg font-semibold" : "text-lg font-medium text-black/50"}>
                        {portal.label.charAt(0)}
                      </span>
                    </span>
                    <span className={isActive ? "text-xs font-semibold text-black" : "text-xs font-medium text-black/50"}>
                      {portal.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

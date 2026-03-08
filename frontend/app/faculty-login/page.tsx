/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Link from "next/link";
import { FacultyAuthLayout } from "@/components/auth/FacultyAuthLayout";


export default function FacultyLoginPage() {
  return (
    <FacultyAuthLayout
      title="Faculty Login"
      subtitle="Login to manage student rewards and academic activities."
      activePortal="faculty"
    >
      <form className="space-y-5">
        <div>
          <label
            htmlFor="faculty-id"
            className="mb-1.5 block text-sm text-white/90"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Faculty ID / Email
          </label>
          <input
            id="faculty-id"
            name="facultyId"
            type="text"
            autoComplete="username email"
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
            placeholder="Enter faculty ID or email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm text-white/90"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(143,17,59,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-black/50"
          style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
        >
          Login
        </button>

        <p
          className="text-center text-xs text-white/60"
          style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
        >
          New Faculty?{" "}
          <Link href="#" className="font-semibold text-[#ff4d79] hover:underline">
            Contact Admin
          </Link>
          {" · "}
          <Link href="#" className="font-semibold text-[#ff4d79] hover:underline">
            Forgot Password? Reset Here
          </Link>
        </p>
      </form>
    </FacultyAuthLayout>
  );
}

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
            className="mb-1.5 block text-sm text-black font-primary"
          >
            Faculty ID / Email
          </label>
          <input
            id="faculty-id"
            name="facultyId"
            type="text"
            autoComplete="username email"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter faculty ID or email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm text-black font-primary"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-white/50 font-primary"
        >
          Login
        </button>

        <p
          className="text-center text-xs text-black/60 font-primary"
        >
          New Faculty?{" "}
          <Link href="#" className="font-semibold text-[#8F113B] hover:underline">
            Contact Admin
          </Link>
          {" · "}
          <Link href="#" className="font-semibold text-[#8F113B] hover:underline">
            Forgot Password? Reset Here
          </Link>
        </p>
      </form>
    </FacultyAuthLayout>
  );
}

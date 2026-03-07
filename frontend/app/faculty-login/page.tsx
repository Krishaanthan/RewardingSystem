/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Link from "next/link";
import { FacultyAuthLayout } from "@/components/auth/FacultyAuthLayout";

const PRIMARY = "#8F113B";
const SECONDARY = "#ffffff";

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
            className="mb-1.5 block text-sm text-gray-700"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Faculty ID / Email
          </label>
          <input
            id="faculty-id"
            name="facultyId"
            type="text"
            autoComplete="username email"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#8F113B] focus:ring-2 focus:ring-[#8F113B]"
            placeholder="Enter faculty ID or email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm text-gray-700"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#8F113B] focus:ring-2 focus:ring-[#8F113B]"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="mt-2 flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{
            fontFamily: '"League Spartan", system-ui, sans-serif',
            backgroundColor: PRIMARY,
            color: SECONDARY
          }}
        >
          Login
        </button>

        <p
          className="text-center text-xs text-gray-600"
          style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
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

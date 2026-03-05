import Link from "next/link";
import { StudentAuthLayout } from "@/components/auth/StudentAuthLayout";

export default function StudentLoginPage() {
  return (
    <StudentAuthLayout
      mode="login"
      title="Student Login"
      subtitle="Login with your registration number and password."
      activePortal="student"
    >
      <form className="space-y-5">
        <div>
          <label
            htmlFor="registration"
            className="mb-1.5 block text-sm text-gray-700"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Registration Number
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            autoComplete="off"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#8F113B] focus:ring-2 focus:ring-[#8F113B]"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm text-gray-700"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-[#8F113B] hover:underline"
              style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
            >
              Forgot Password?
            </Link>
          </div>
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
          className="mt-2 flex w-full justify-center rounded-lg bg-[#8F113B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#751036]"
          style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
        >
          Login
        </button>

        <p
          className="text-center text-xs text-gray-600"
          style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
        >
          New Student?{" "}
          <Link href="/student-register" className="font-semibold text-[#8F113B] hover:underline">
            Register Here
          </Link>
        </p>
      </form>

      <div className="pt-1 text-center text-[11px] text-gray-400" style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}>
        Faculty and Admin users can continue to their dedicated portals from the navigation below.
      </div>
    </StudentAuthLayout>
  );
}


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
            className="mb-1.5 block text-sm text-white/90"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Registration Number
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            autoComplete="off"
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm text-white/90"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-[#ff4d79] hover:underline"
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
          New Student?{" "}
          <Link href="/student-register" className="font-semibold text-[#ff4d79] hover:underline">
            Register Here
          </Link>
        </p>
      </form>

      <div className="pt-1 text-center text-[11px] text-white/40" style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}>
        Faculty and Admin users can continue to their dedicated portals from the navigation below.
      </div>
    </StudentAuthLayout>
  );
}


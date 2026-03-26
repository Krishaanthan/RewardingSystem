"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StudentAuthLayout } from "@/components/auth/StudentAuthLayout";

export default function StudentLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    registration: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registration_number: formData.registration,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);

      // Redirect to student dashboard
      router.push("/student/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentAuthLayout
      mode="login"
      title="Student Login"
      subtitle="Login with your registration number and password."
      activePortal="student"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label
            htmlFor="registration"
            className="mb-1.5 block text-sm text-black font-primary"
          >
            Registration Number
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            required
            value={formData.registration}
            onChange={handleChange}
            autoComplete="off"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm text-black font-primary"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-[#8F113B] hover:underline font-primary"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter password"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-white/50 font-primary disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </motion.button>

        <p
          className="text-center text-xs text-black/60 font-primary"
        >
          New Student?{" "}
          <Link href="/student-register" className="font-semibold text-[#8F113B] hover:underline">
            Register Here
          </Link>
        </p>
      </form>

      <div className="pt-1 text-center text-[11px] text-black/40 font-primary">
        Faculty and Admin users can continue to their dedicated portals from the navigation below.
      </div>
    </StudentAuthLayout>
  );
}


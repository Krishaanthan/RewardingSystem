/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FacultyAuthLayout } from "@/components/auth/FacultyAuthLayout";


export default function FacultyLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ facultyId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration_number: formData.facultyId,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      router.push("/faculty/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FacultyAuthLayout
      title="Faculty Login"
      subtitle="Login to manage student rewards and academic activities."
      activePortal="faculty"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}
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
            required
            value={formData.facultyId}
            onChange={(e) => setFormData(prev => ({ ...prev, facultyId: e.target.value }))}
            autoComplete="username"
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
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            autoComplete="current-password"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter password"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-white/50 font-primary disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </motion.button>

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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function StudentRegisterPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/20 px-4 py-10">
      <section className="w-full max-w-lg rounded-3xl border border-brand-primary/10 bg-white p-6 shadow-soft sm:p-8">
        <h1 className="heading text-3xl">Student Registration</h1>
        <p className="mt-2 text-sm text-brand-text/70">
          Create your account to start claiming reward points.
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-6">
          {/* Section 1: Department, Class section, Year */}
          <fieldset className="rounded-2xl border border-brand-primary/10 bg-brand-primary/5 p-4">
            <legend className="px-2 text-sm font-semibold text-brand-primary">
              Academic Details
            </legend>
            <div className="mt-3 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Department
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE, ECE"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Class Section
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. A, B"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Year
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. I, II, III"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
            </div>
          </fieldset>

          {/* Section 2: Registration Number, Name, Mail, Password */}
          <fieldset className="rounded-2xl border border-brand-primary/10 bg-brand-primary/5 p-4">
            <legend className="px-2 text-sm font-semibold text-brand-primary">
              Account Details
            </legend>
            <div className="mt-3 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Registration Number
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter registration number"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Mail
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brand-text">
                  Password
                </span>
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-brand-primary/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
            </div>
          </fieldset>

          <Button type="submit" variant="primary" className="w-full">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-text/80">
          Already have an account?{" "}
          <Link href="/student-login" className="font-semibold text-brand-primary underline">
            Student Login
          </Link>
        </p>
      </section>

      {/* Success popup with blurred background */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="mx-4 max-w-sm rounded-2xl border border-brand-primary/20 bg-white p-6 shadow-soft">
            <h2 id="success-title" className="text-center text-lg font-semibold text-brand-primary">
              Registration Successful
            </h2>
            <p className="mt-2 text-center text-brand-text/80">
              The registration has been successful.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                onClick={() => setShowSuccess(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

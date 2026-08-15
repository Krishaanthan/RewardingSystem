"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FacultyDirectAwardPage() {
  const [studentRegNo, setStudentRegNo] = useState("");
  const [reason, setReason] = useState("");
  const [points, setPoints] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://localhost:8000/api/faculty/direct-award", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          registration_number: studentRegNo,
          reason,
          points: parseInt(points, 10)
        })
      });
      if (res.ok) {
        alert("Points awarded successfully!");
        setStudentRegNo(""); 
        setReason(""); 
        setPoints("");
      } else {
        alert("Failed to award points. Please check student registration number.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        /* Glass card */
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.5);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.56);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="relative h-screen w-full overflow-hidden text-black font-primary bg-white">

        {/* Scrollable Content Container */}
        <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20">
          {/* Main Content */}
          <div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-6 pt-28 font-primary">

            {/* Header */}
            <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/20 pb-4">
              <div>
                <h1 className="heading text-2xl font-bold tracking-wide text-black">Direct Award</h1>
                <p className="text-sm text-black">Grant points manually for workshops or approved bulk events.</p>
              </div>
            </motion.header>

            {/* Form Card */}
            <motion.main initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="card mx-auto mt-12 w-full max-w-3xl p-8 md:p-12">

              <div className="mb-8 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-primary"></div>
                <h2 className="heading text-2xl font-semibold tracking-wide text-black">Award Points Form</h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Student Registration Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentRegNo}
                    onChange={(e) => setStudentRegNo(e.target.value)}
                    placeholder="e.g. 21CS1052"
                    className="w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none placeholder:text-black/50 focus:border-black/20 focus:ring-1 focus:ring-white/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Reason <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Workshop participation"
                    className="w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none placeholder:text-black/50 focus:border-black/20 focus:ring-1 focus:ring-white/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Points <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="10"
                    className="w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none placeholder:text-black/50 focus:border-black/20 focus:ring-1 focus:ring-white/50"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-secondary transition-all hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-black/50 disabled:opacity-50"
                  >
                    {isSubmitting ? "Awarding..." : "Award Points"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.main>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-auto py-8 text-center text-xs text-black"
            >
              © 2024 Academic Points Portal. All submissions are processed by Neural AI.
            </motion.footer>
          </div>
        </div>
      </div>
    </>
  );
}


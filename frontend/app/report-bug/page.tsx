"use client";

import { useState } from "react";
import { ArrowLeft, BugIcon, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { WavyLine } from "@/components/landing/WavyLine";

export default function ReportBugPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for actually submitting the bug report would go here
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-gray-800 font-sans selection:bg-brand-primary/10 overflow-hidden flex flex-col">
      {/* Navbar Minimal */}
      <header className="sticky top-0 z-50 flex items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors text-sm font-semibold">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </a>
      </header>

      {/* Wavy Line flows behind everything */}
      <WavyLine />

      <main className="relative z-10 flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-3xl border border-gray-200 shadow-soft p-10 lg:p-14 rounded-3xl relative">
          
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary to-brand-primary/50" />
          
          <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
            <div className="w-14 h-14 bg-brand-tertiary rounded-2xl flex items-center justify-center shrink-0 border border-brand-primary/10">
              <BugIcon className="w-7 h-7 text-brand-primary" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="heading text-3xl font-bold text-gray-900 tracking-tight">Report a Bug</h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">Help us improve the platform by detailing your issue below.</p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="issueTitle" className="block text-sm font-bold text-gray-800 tracking-wide uppercase">Issue Title</label>
                <input 
                  type="text" 
                  id="issueTitle" 
                  required
                  placeholder="e.g., Cannot upload certificate PDF"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="registerNumber" className="block text-sm font-bold text-gray-800 tracking-wide uppercase">Register Number</label>
                <input 
                  type="text" 
                  id="registerNumber" 
                  required
                  placeholder="e.g., 2024CS0412"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-bold text-gray-800 tracking-wide uppercase">Category</label>
                <select 
                  id="category" 
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select the type of issue...</option>
                  <option value="ui">User Interface Bug (Visuals/Layout)</option>
                  <option value="logic">Application Logic (Points not awarded, Form errors)</option>
                  <option value="auth">Authentication (Login/Register issues)</option>
                  <option value="feature">Feature Request / Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-bold text-gray-800 tracking-wide uppercase">Description</label>
                <textarea 
                  id="description" 
                  rows={4} 
                  required
                  placeholder="Please describe what happened, what you expected to happen, and any error messages."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm resize-y"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 px-6 bg-brand-primary text-white font-bold tracking-wide rounded-xl shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 mt-8 disabled:opacity-50"
              >
                Submit Bug Report
              </button>

              <div className="text-center mt-4 text-xs font-semibold text-gray-400">
                For immediate assistance, please visit the IT Helpdesk.
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-soft">
                <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h3>
                <p className="text-gray-600 max-w-sm mx-auto">Thank you for letting us know. Our development team has captured your issue and will investigate it shortly.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          )}

        </div>
      </main>
      
      {/* Footer handles its own spacing */}
      <Footer />
    </div>
  );
}

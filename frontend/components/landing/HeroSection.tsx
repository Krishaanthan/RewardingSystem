"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-[#ffffff] z-10 py-20 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-tertiary/30 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

        {/* Left: Illustration — slides in from left */}
        <motion.div
          className="flex-1 w-full flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-image-box relative w-full max-w-[600px] aspect-square rounded-3xl overflow-hidden shadow-soft bg-brand-tertiary border border-brand-primary/10">
            {/* Placeholder for professional illustration showing diverse college students collaborating */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
              alt="Diverse college students collaborating"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-brand-primary mix-blend-overlay opacity-10" />
          </div>
        </motion.div>

        {/* Right: Content — slides in from right */}
        <motion.div
          className="flex-1 w-full text-center lg:text-left"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 rounded-full bg-brand-tertiary text-brand-primary text-sm font-semibold tracking-wide uppercase mb-6 border border-brand-primary/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Student Rewarding System
          </motion.div>

          <motion.h1
            className="heading text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Bridging Participation and{" "}
            <span className="text-brand-primary relative">
              Academic Success
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-primary opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
              </svg>
            </span>.
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-10 leading-relaxed max-w-[600px] mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            Earn academic credit for campus engagement, social contributions, and professional development.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <a href="/homepage#mission" className="px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl shadow-soft hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-lg w-full sm:w-auto text-center">
              Learn How
            </a>
            <a href="/homepage#engagement" className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 text-lg w-full sm:w-auto shadow-sm text-center">
              Discover Features
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

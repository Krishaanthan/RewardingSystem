"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bug, BookOpen, ShieldCheck } from "lucide-react";

export function SupportWidgets() {
  const cards = [
    {
      id: "report-bug",
      title: "Report a Bug",
      description: "Encountered an issue? Let our development team know so we can squash it immediately.",
      icon: <Bug className="w-6 h-6 text-brand-primary" strokeWidth={2} />,
      link: "/report-bug"
    },
    {
      id: "user-guides",
      title: "User Guides",
      description: "Learn how to maximize your points and navigate the platform with our comprehensive tutorials.",
      icon: <BookOpen className="w-6 h-6 text-brand-primary" strokeWidth={2} />,
      link: "#"
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "Read about how we securely manage your academic data and protect your personal information.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-primary" strokeWidth={2} />,
      link: "#"
    }
  ];

  return (
    <section className="relative w-full pb-20 pt-10 z-10 bg-white">
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="heading text-3xl font-bold text-gray-900 tracking-tight">Need Assistance?</h2>
          <p className="text-gray-500 mt-3 font-medium">Quick links to help you navigate and improve the platform.</p>
        </motion.div>

        {/* Widgets Grid — each card staggers in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.link}
              className="support-card group relative flex flex-col p-8 bg-white border border-gray-100 rounded-3xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              {/* Subtle hover gradient behind icon */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-tertiary opacity-0 group-hover:opacity-50 blur-3xl rounded-full transition-opacity duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-brand-tertiary/50 border border-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-tertiary transition-colors duration-300 relative z-10">
                {card.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Link / Arrow */}
              <div className="mt-8 flex items-center font-semibold text-sm text-brand-primary/80 group-hover:text-brand-primary transition-colors duration-300 relative z-10">
                <span>View Details</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

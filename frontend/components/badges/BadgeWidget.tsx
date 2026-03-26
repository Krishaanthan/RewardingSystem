"use client";

import { motion } from "framer-motion";
import { BadgeCardProps } from "./BadgeCard";

type BadgeWidgetProps = Pick<
  BadgeCardProps,
  "name" | "category" | "imagePath" | "isIndividual" | "imageScale"
> & {
  onSelect: () => void;
};

export default function BadgeWidget({
  name,
  category,
  imagePath,
  isIndividual = false,
  imageScale = 1,
  onSelect,
}: BadgeWidgetProps) {
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow: "0 32px 64px 0 rgba(131,18,56,0.18)",
      }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col items-center gap-6 rounded-[40px] border border-black/10 bg-white/70 backdrop-blur-md shadow-lg p-8 cursor-pointer text-left w-full transition-shadow overflow-hidden"
    >
      {/* Subtle hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-transparent" />

      {/* Badge type pill */}
      <span
        className={`absolute top-4 right-4 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
          isIndividual
            ? "bg-purple-100 text-purple-700"
            : "bg-primary/10 text-primary"
        }`}
      >
        {isIndividual ? "🏅 Special" : "⬆️ Tiered"}
      </span>

      {/* Badge image */}
      <div className="flex items-center justify-center w-full h-[202px] overflow-hidden">
        {imagePath ? (
          <img
            src={imagePath}
            alt={`${name} badge`}
            className="h-[157px] w-[157px] object-contain drop-shadow-md"
            style={
              imageScale !== 1
                ? { transform: `scale(${imageScale})`, transformOrigin: "center" }
                : undefined
            }
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="h-14 w-14 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
          {category}
        </p>
        <h3 className="heading text-[22px] font-bold text-black leading-tight">{name}</h3>
      </div>

      {/* "View details" hint */}
      <span className="flex items-center gap-2 text-[15px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View details
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </span>
    </motion.button>
  );
}

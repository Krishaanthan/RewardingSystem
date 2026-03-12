import React from "react";

interface FeatureSectionProps {
  heading: string;
  bodyText: string | React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  sectionId: string;
  isList?: boolean; // For Section D (The Process)
}

export function FeatureSection({ heading, bodyText, imageUrl, imageAlt, sectionId, isList }: FeatureSectionProps) {
  return (
    <section 
      id={sectionId} 
      className="relative w-full py-24 z-10 bg-white/40 backdrop-blur-xs"
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left: Image Box */}
        <div className="flex-1 w-full max-w-[500px]">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft bg-white border border-gray-100 group transition-transform duration-500 hover:-translate-y-2">
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Soft inner shadow overlay */}
            <div className="absolute inset-0 border border-black/5 rounded-3xl z-10 pointer-events-none" />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 w-full bg-white/90 p-10 lg:p-14 rounded-3xl shadow-sm border border-brand-primary/5 backdrop-blur-md relative overflow-hidden group hover:shadow-soft transition-all duration-500">
          {/* Decorative accent top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary to-brand-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <h2 className="heading text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-snug">
            {heading}
          </h2>
          
          {isList ? (
            <div className="text-lg text-gray-600 leading-relaxed font-primary">
              {bodyText}
            </div>
          ) : (
            <p className="text-lg text-gray-600 leading-relaxed font-primary">
              {bodyText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

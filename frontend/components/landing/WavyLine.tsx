"use client";

import { useEffect, useState } from "react";

export function WavyLine() {
  const [docHeight, setDocHeight] = useState(2000);

  useEffect(() => {
    const updateHeight = () => {
      setDocHeight(document.documentElement.scrollHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    
    // Mutation observer to detect changes in DOM that affect height
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      className="absolute top-0 left-0 w-full pointer-events-none flex justify-center overflow-hidden z-[1]"
      style={{ height: `${docHeight}px` }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="wave-pattern"
            x="0"
            y="0"
            width="300"
            height="800"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 150 0 C 400 200, -100 600, 150 800"
              stroke="#831238"
              strokeWidth="4"
              fill="none"
              strokeDasharray="12 12"
              className="opacity-30"
            />
            <path
              d="M 150 0 C 400 200, -100 600, 150 800"
              stroke="#831238"
              strokeWidth="6"
              fill="none"
              className="opacity-70"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#wave-pattern)" />
      </svg>
    </div>
  );
}

import * as React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className = "", children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#8F113B] focus:ring-2 focus:ring-[#8F113B] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});


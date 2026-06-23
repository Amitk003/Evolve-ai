"use client";

import { type InputHTMLAttributes } from "react";

interface GhostInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function GhostInput({
  label,
  className = "",
  ...props
}: GhostInputProps) {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block font-sans text-caption text-grey-brown uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-transparent text-warm-cream font-sans text-[15px] font-normal border-0 border-b border-warm-cream rounded-none py-[1px] px-[2px] pr-9 outline-none transition-all duration-300 ease placeholder:text-warm-cream/40 focus:border-burnt-sienna ${className}`}
        {...props}
      />
    </div>
  );
}

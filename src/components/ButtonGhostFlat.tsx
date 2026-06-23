"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonGhostFlatProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonGhostFlat({
  children,
  className = "",
  ...props
}: ButtonGhostFlatProps) {
  return (
    <button
      className={`bg-transparent text-warm-cream border-b border-warm-cream rounded-none p-0 font-sans text-sm font-normal transition-opacity duration-300 ease cursor-pointer hover:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

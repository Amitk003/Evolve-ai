"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "ghost" | "outlined";
  children: React.ReactNode;
}

export default function ButtonPill({
  variant = "filled",
  children,
  className = "",
  ...props
}: ButtonPillProps) {
  const base =
    "font-sans text-sm font-normal tracking-normal transition-all duration-300 ease cursor-pointer select-none";

  const variants = {
    filled:
      "bg-dark-cork text-warm-cream rounded-[36px] px-6 py-[14.4px] border border-transparent hover:opacity-90",
    ghost:
      "bg-transparent text-warm-cream rounded-[22.5px] px-4 py-[7.5px] border border-warm-cream hover:border-burnt-sienna",
    outlined:
      "bg-transparent text-burnt-sienna rounded-[9999px] px-5 py-[10px] border border-burnt-sienna hover:opacity-80",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

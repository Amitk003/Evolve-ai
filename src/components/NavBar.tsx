"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "REALITY CHECK", href: "/" },
  { label: "TIMELINE", href: "/timeline" },
  { label: "FINANCIALS", href: "/financials" },
];

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 
      border-b border-cork-shadow bg-studio-black/90 backdrop-blur-sm"
    >
      <Link
        href="/"
        className="font-sans text-[15px] font-medium text-warm-cream no-underline"
      >
        evolve<span className="text-burnt-sienna">.</span>ai
      </Link>

      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`font-sans text-[12px] font-normal no-underline tracking-[0.15em] transition-all duration-300 ease hover:opacity-80 ${
                active ? "text-warm-cream" : "text-grey-brown"
              }`}
            >
              {mounted
                ? item.label.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        animation: `fadeIn 0.3s ease ${i * 0.03}s forwards`,
                        opacity: 0,
                      }}
                    >
                      {char}
                    </span>
                  ))
                : item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

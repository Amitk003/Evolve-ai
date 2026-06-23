"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollPrompt() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 ease z-40">
      <span className="font-sans text-caption text-warm-cream tracking-wider">
        SCROLL TO CONTINUE
      </span>
      <ChevronDown size={16} className="text-warm-cream animate-bounce" />
    </div>
  );
}

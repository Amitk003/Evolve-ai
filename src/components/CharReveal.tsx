"use client";

import { useEffect, useRef, useState } from "react";

interface CharRevealProps {
  text: string;
  className?: string;
  staggerMs?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function CharReveal({
  text,
  className = "",
  staggerMs = 30,
  as: Tag = "h1",
}: CharRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const chars = text.split("");

  return (
    <div ref={ref} className={className}>
      <Tag className="inline">
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.3s ease ${i * staggerMs}ms, transform 0.3s ease ${i * staggerMs}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    </div>
  );
}

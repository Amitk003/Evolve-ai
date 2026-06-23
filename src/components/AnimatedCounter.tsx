"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const startTime = performance.now();
    const delta = to - from;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + delta * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

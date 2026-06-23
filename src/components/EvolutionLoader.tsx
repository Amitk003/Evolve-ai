"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, Brain, Search } from "lucide-react";

const messages = [
  "Scanning labor market data...",
  "Analyzing AI adoption trends in your industry...",
  "Cross-referencing salary projections...",
  "Identifying skill gap trajectories...",
  "Calculating future-proof financial roadmap...",
];

export default function EvolutionLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStep((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2;
        if (next >= 100) {
          clearInterval(msgInterval);
          clearInterval(progressInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, 400);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const icons = [Search, Brain, Sparkles, Search, Brain];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-studio-black/95 backdrop-blur-sm">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Animated icon */}
        <div className="relative w-16 h-16 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border border-burnt-sienna/30 animate-ping opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {step < messages.length && (
              (() => {
                const Icon = icons[step];
                return <Icon size={28} className="text-burnt-sienna animate-pulse" />;
              })()
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-cork-shadow rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-burnt-sienna rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Message */}
        <p className="font-sans text-body text-warm-cream mb-2 min-h-[1.5em] transition-opacity duration-300">
          {messages[step]}
        </p>
        <p className="font-sans text-caption text-grey-brown">
          {Math.round(progress)}% complete
        </p>
      </div>
    </div>
  );
}

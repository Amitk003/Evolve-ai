"use client";

import { useState } from "react";
import { TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import ButtonPill from "./ButtonPill";

interface SplitScreenProps {
  currentSalary: number;
  evolvedSalary: number;
  salaryIncreasePct: number;
  newTitle: string;
  disposable?: { label: string; amount: number }[];
}

export default function SplitScreen({
  currentSalary,
  evolvedSalary,
  salaryIncreasePct,
  newTitle,
  disposable = [],
}: SplitScreenProps) {
  const [allocated, setAllocated] = useState(false);

  const formatSalary = (n: number) =>
    "$" + n.toLocaleString("en-US") + "/yr";

  const monthlyDisposable = disposable.reduce((sum, d) => sum + d.amount, 0);
  const totalNeeded = monthlyDisposable * 12;
  const spendingLabels = disposable.map((d) => d.label).join(", ");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden">
      {/* Static Path */}
      <div className="bg-static-red/10 p-8 flex flex-col justify-between border border-static-red/20 rounded-l-xl min-h-[420px]">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <TrendingDown size={18} className="text-static-red-light shrink-0" />
            <span className="font-sans text-body font-medium text-static-red-light uppercase tracking-widest">
              Static Path
            </span>
          </div>
          <h3 className="font-sans text-body text-warm-cream/60 mb-3">
            Current Role
          </h3>
          <p className="font-sans text-display font-medium leading-display text-static-red-light">
            {formatSalary(currentSalary)}
          </p>
          <div className="mt-5 inline-block px-4 py-1.5 border border-static-red-light/30 rounded-full">
            <span className="font-sans text-caption text-static-red-light">
              Redundancy Risk: HIGH
            </span>
          </div>
        </div>
        <div className="mt-8 pb-1">
          <div className="h-2 w-full bg-static-red/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-static-red-light/50 rounded-full" />
          </div>
          <p className="font-sans text-caption text-warm-cream/40 mt-2 pl-0">
            Salary growth: 0% &middot; Career stagnation
          </p>
        </div>
      </div>

      {/* Evolved Path */}
      <div className="bg-evolved-green/10 p-8 flex flex-col justify-between border border-evolved-green/20 rounded-r-xl relative overflow-hidden min-h-[420px]">
        <div className="absolute inset-0 animate-glow pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-evolved-green-light shrink-0" />
            <span className="font-sans text-body font-medium text-evolved-green-light uppercase tracking-widest">
              Evolved Path
            </span>
          </div>
          <h3 className="font-sans text-body text-warm-cream/60 mb-3">
            {newTitle}
          </h3>
          <p className="font-sans text-display font-medium leading-display text-evolved-green-light">
            {formatSalary(evolvedSalary)}
          </p>
          <div className="mt-5 inline-block px-4 py-1.5 border border-evolved-green-light/30 rounded-full">
            <span className="font-sans text-caption text-evolved-green-light">
              +{salaryIncreasePct}% Increase
            </span>
          </div>
        </div>
        <div className="relative z-10 mt-8 pb-1">
          <div className="h-2 w-full bg-evolved-green/20 rounded-full overflow-hidden">
            <div className="h-full w-full bg-evolved-green-light/50 rounded-full" />
          </div>
          <p className="font-sans text-caption text-warm-cream/40 mt-2 pl-0">
            Salary growth: +{salaryIncreasePct}% &middot; Career evolution
          </p>
        </div>
      </div>

      {/* Budget Allocator — spans full width below */}
      <div className="col-span-1 md:col-span-2 mt-8 p-6 border border-cork-shadow rounded-xl bg-studio-black/80">
        <h4 className="font-sans text-subheading font-medium text-warm-cream mb-5">
          Micro-Budget Generator
        </h4>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Current Spending Pie */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#40372e"
                  strokeWidth="12"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke={allocated ? "#dc5000" : "#6c5f51"}
                  strokeWidth="12"
                  strokeDasharray={`${allocated ? 75 : 60} ${allocated ? 25 : 40}`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-sans text-body text-warm-cream">
                {allocated ? `$${monthlyDisposable}` : "$0"}
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-sans text-body text-warm-cream">
                {allocated
                  ? `$${monthlyDisposable}/month allocated to Evolve Fund`
                  : `$${monthlyDisposable}/month available from disposable spending`}
              </p>
              <p className="font-sans text-caption text-grey-brown mt-1">
                {allocated
                  ? `From: ${spendingLabels.toLowerCase()}`
                  : `${spendingLabels}`}
              </p>
            </div>
          </div>

          <ButtonPill
            variant={allocated ? "ghost" : "filled"}
            onClick={() => setAllocated(!allocated)}
            className="flex items-center gap-2 shrink-0"
          >
            {allocated ? (
              "Modify Allocation"
            ) : (
              <>
                Allocate to Evolve Fund
                <ArrowRight size={14} />
              </>
            )}
          </ButtonPill>
        </div>

        {allocated && (
          <div className="mt-5 p-4 border border-evolved-green/20 rounded-lg bg-evolved-green/5 animate-fade-in">
            <p className="font-sans text-body text-evolved-green-light">
              To gain these skills, you need ${totalNeeded} over 12 months.
            </p>
            <p className="font-sans text-body text-warm-cream/80 mt-1">
              We found <strong className="text-evolved-green-light">${monthlyDisposable}/month</strong> in your current spending
              to allocate to your Future-Proof Fund.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

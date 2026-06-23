"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplitScreen from "@/components/SplitScreen";
import ButtonPill from "@/components/ButtonPill";
import { getProfileById } from "@/data/profiles";
import type { JobProfile } from "@/data/profiles";
import { Loader2, ArrowLeft, Sparkles } from "lucide-react";

function FinancialsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [profile, setProfile] = useState<JobProfile | null>(null);
  const [salary, setSalary] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const jobId = searchParams.get("job");
    const sal = parseInt(searchParams.get("salary") || "0", 10);

    if (!jobId) {
      router.push("/");
      return;
    }

    const found = getProfileById(jobId);
    if (found) {
      setProfile(found);
      setSalary(sal || found.salary);
      const timer = setTimeout(() => setLoaded(true), 400);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <Loader2 size={24} className="text-warm-cream animate-spin" />
      </div>
    );
  }

  const { evolution } = profile;
  const currentSalary = salary || profile.salary;
  const increaseAmount = Math.round(
    currentSalary * (evolution.salaryIncreasePct / 100)
  );
  const evolvedSalary = currentSalary + increaseAmount;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="font-sans text-caption text-burnt-sienna uppercase tracking-[0.2em] mb-3">
          The Financial Impact
        </p>
        <h1 className="font-sans text-heading-lg font-medium leading-heading-lg text-warm-cream mb-3">
          Your Future, Split in Two
        </h1>
        <p className="font-sans text-body text-grey-brown">
          One path leads to stagnation. The other to a{" "}
          <span className="text-evolved-green-light">
            +${increaseAmount.toLocaleString()}/year
          </span>{" "}
          future.
        </p>
      </div>

      {/* Split Screen */}
      {loaded && (
        <div className="animate-split">
          <SplitScreen
            currentSalary={currentSalary}
            evolvedSalary={evolvedSalary}
            salaryIncreasePct={evolution.salaryIncreasePct}
            newTitle={evolution.newTitle}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <ButtonPill
          variant="ghost"
          onClick={() =>
            router.push(
              `/timeline?job=${encodeURIComponent(profile.id)}&salary=${salary}`
            )
          }
          className="flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Back to Timeline
        </ButtonPill>

        <ButtonPill
          variant="outlined"
          onClick={() =>
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(evolution.skills.join(" course "))}`,
              "_blank"
            )
          }
          className="flex items-center gap-2"
        >
          <Sparkles size={14} />
          Find Courses
        </ButtonPill>
      </div>
    </div>
  );
}

export default function FinancialsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <Loader2 size={24} className="text-warm-cream animate-spin" />
        </div>
      }
    >
      <FinancialsContent />
    </Suspense>
  );
}

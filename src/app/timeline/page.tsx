"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TimelineView from "@/components/TimelineView";
import ButtonPill from "@/components/ButtonPill";
import CharReveal from "@/components/CharReveal";
import { getProfileById } from "@/data/profiles";
import type { JobProfile } from "@/data/profiles";
import { ArrowRight, Loader2 } from "lucide-react";

function TimelineContent() {
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
      // Simulate loading
      const timer = setTimeout(() => setLoaded(true), 600);
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

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <p className="font-sans text-caption text-burnt-sienna uppercase tracking-[0.2em] mb-3">
          Your Evolution Timeline
        </p>
        <CharReveal
          text={`${profile.title}  →  ${evolution.newTitle}`}
          className="font-sans text-heading-lg font-medium leading-heading-lg text-warm-cream mb-3"
          as="h1"
          staggerMs={15}
        />
        <p className="font-sans text-body text-grey-brown">
          AI isn&apos;t going to fire you. But someone using AI will. Here&apos;s
          exactly how your role evolves.
        </p>
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-warm-cream animate-spin" />
        </div>
      )}

      {/* Timeline */}
      {loaded && (
        <div className="animate-fade-in">
          <TimelineView
            steps={evolution.steps}
            skills={evolution.skills}
          />

          {/* Next CTA */}
          <div className="mt-10 text-center">
            <ButtonPill
              variant="filled"
              onClick={() =>
                router.push(
                  `/financials?job=${encodeURIComponent(profile.id)}&salary=${salary}`
                )
              }
              className="flex items-center gap-2 mx-auto"
            >
              See the Financial Impact
              <ArrowRight size={14} />
            </ButtonPill>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <Loader2 size={24} className="text-warm-cream animate-spin" />
        </div>
      }
    >
      <TimelineContent />
    </Suspense>
  );
}

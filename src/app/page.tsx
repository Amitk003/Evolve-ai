"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Briefcase, DollarSign } from "lucide-react";
import GhostInput from "@/components/GhostInput";
import ButtonPill from "@/components/ButtonPill";
import CharReveal from "@/components/CharReveal";
import { searchProfiles, type JobProfile } from "@/data/profiles";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<JobProfile[]>([]);
  const [selected, setSelected] = useState<JobProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [salary, setSalary] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setSelected(null);
      if (val.trim().length > 0) {
        const matches = searchProfiles(val);
        setResults(matches);
        setShowDropdown(matches.length > 0);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    },
    []
  );

  const handleSelect = (profile: JobProfile) => {
    setQuery(profile.title);
    setSelected(profile);
    setSalary(profile.salary.toString());
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (selected && salary) {
      router.push(
        `/timeline?job=${encodeURIComponent(selected.id)}&salary=${encodeURIComponent(salary)}`
      );
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 overflow-hidden">
      <div className="relative w-full max-w-3xl mx-auto text-center animate-fade-in" style={{ zIndex: 1 }}>
        {/* Tagline */}
        <p className="font-sans text-caption text-burnt-sienna uppercase tracking-[0.2em] mb-5">
          Will AI Steal Your Future?
        </p>

        {/* Headline */}
        <div className="mb-8 mx-auto">
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-display font-medium leading-tight md:leading-display text-warm-cream">
            Don&apos;t predict the end of your career.
          </h1>
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-display font-medium leading-tight md:leading-display text-burnt-sienna mt-1">
            Finance its evolution.
          </p>
        </div>

        <p className="font-sans text-subheading text-grey-brown mb-12 max-w-md mx-auto">
          Type your job title below. Evolve.ai builds a financial roadmap to
          turn AI anxiety into AI advantage.
        </p>

        {/* Input area */}
        <div ref={inputRef} className="relative max-w-md mx-auto mt-10 mb-10">
          <div className="relative flex items-center">
            <GhostInput
              type="text"
              placeholder="e.g. Junior Accountant"
              value={query}
              onChange={handleQueryChange}
              className="pr-12"
            />
            <Search
              size={16}
              className="absolute right-2 text-warm-cream/40 pointer-events-none"
            />
          </div>

          {/* Autocomplete dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 border border-cork-shadow rounded-xl bg-studio-black overflow-hidden z-50">
              {results.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleSelect(profile)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-cork/50 transition-colors duration-200"
                >
                  <Briefcase size={14} className="text-grey-brown shrink-0" />
                  <div>
                    <p className="font-sans text-body text-warm-cream">
                      {profile.title}
                    </p>
                    <p className="font-sans text-caption text-grey-brown">
                      {profile.category} · ${profile.salary.toLocaleString()}/yr
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Salary input — shows when a job is selected */}
          {selected && (
            <div className="mt-5 animate-slide-up">
              <div className="relative flex items-center">
                <GhostInput
                  type="number"
                  placeholder="Your monthly take-home pay ($)"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="pr-12"
                />
                <DollarSign
                  size={16}
                  className="absolute right-2 text-warm-cream/40 pointer-events-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        {selected && (
          <div className="animate-slide-up">
            <ButtonPill
              variant="filled"
              onClick={handleSubmit}
              className="text-base px-10 py-3"
            >
              Run My Evolution
            </ButtonPill>
          </div>
        )}
      </div>
    </div>
  );
}

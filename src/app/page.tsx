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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6">
      <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
        {/* Tagline */}
        <p className="font-sans text-caption text-burnt-sienna uppercase tracking-[0.2em] mb-4">
          Will AI Steal Your Future?
        </p>

        {/* Headline */}
        <div className="mb-6">
          <CharReveal
            text="Don't predict the end of your career."
            className="font-sans text-display font-medium leading-display text-warm-cream"
            staggerMs={25}
          />
          <br />
          <CharReveal
            text="Finance its evolution."
            className="font-sans text-display font-medium leading-display text-burnt-sienna"
            staggerMs={25}
            as="span"
          />
        </div>

        <p className="font-sans text-subheading text-grey-brown mb-10 max-w-lg mx-auto">
          Type your job title below. Evolve.ai builds a financial roadmap to
          turn AI anxiety into AI advantage.
        </p>

        {/* Input area */}
        <div ref={inputRef} className="relative max-w-md mx-auto mb-8">
          <div className="relative">
            <GhostInput
              type="text"
              placeholder="e.g. Junior Accountant"
              value={query}
              onChange={handleQueryChange}
              className="pr-12"
            />
            <Search
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-cream/40"
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
            <div className="mt-4 animate-slide-up">
              <div className="relative">
                <GhostInput
                  type="number"
                  placeholder="Your monthly take-home pay ($)"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="pr-12"
                />
                <DollarSign
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-cream/40"
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

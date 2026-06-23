"use client";

import { motion } from "framer-motion";

interface TimelineStep {
  year: number;
  taskBreakdown: { label: string; pct: number }[];
  pctAi: number;
}

interface TimelineViewProps {
  steps: TimelineStep[];
  skills: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TimelineView({ steps, skills }: TimelineViewProps) {
  return (
    <div className="w-full">
      <motion.div
        className="relative pl-8 md:pl-12 border-l border-cork-shadow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.year}
            className="relative mb-12 last:mb-0"
            variants={stepVariants}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[calc(2rem+2px)] md:-left-[calc(3rem+2px)] top-1 w-4 h-4 rounded-full bg-warm-cream border-2 border-studio-black" />

            {/* Year badge */}
            <div className="inline-block px-3 py-1 border border-warm-cream/30 rounded-full mb-3">
              <span className="font-sans text-caption text-warm-cream tracking-wider">
                {step.year}
              </span>
            </div>

            {/* Task breakdown */}
            <div className="space-y-2">
              {step.taskBreakdown.map((task) => (
                <div key={task.label} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-sans text-body text-warm-cream">
                        {task.label}
                      </span>
                      <span className="font-sans text-caption text-grey-brown">
                        {task.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-cork-shadow rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warm-cream rounded-full transition-all duration-700 ease"
                        style={{ width: `${task.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI automation indicator */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-burnt-sienna/50 to-transparent" />
              <span className="font-sans text-caption text-burnt-sienna whitespace-nowrap">
                AI handles {step.pctAi}% of tasks
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills section */}
      {skills.length > 0 && (
        <motion.div
          className="mt-8 p-6 border border-cork-shadow rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h4 className="font-sans text-caption text-grey-brown uppercase tracking-wider mb-3">
            Required Micro-Skills
          </h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 border border-burnt-sienna/50 rounded-full font-sans text-caption text-burnt-sienna"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

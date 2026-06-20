"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RevealBlock } from "@/components/site/RevealBlock";
import type { EducationEntry, ExperienceNode } from "@/types/portfolio-v2";
import { cn } from "@/lib/utils";

type ExperiencePageProps = {
  experience: ExperienceNode[];
  education: EducationEntry[];
  achievements: string[];
};

export function ExperiencePage({ experience, education, achievements }: ExperiencePageProps) {
  const [activeId, setActiveId] = useState(experience[0]?.id ?? "");
  const active = experience.find((e) => e.id === activeId) ?? experience[0];

  return (
    <div className="space-y-14">
      <RevealBlock>
        <p className="eyebrow">Experience</p>
        <h1 className="page-title mt-2">Where I&apos;ve built</h1>
        <p className="mt-4 max-w-2xl text-sm text-text-1 sm:text-base">
          Select a chapter to explore role depth, impact, and the technologies that shaped each sprint.
        </p>
      </RevealBlock>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
        <RevealBlock className="flex flex-col gap-2">
          {experience.map((item, index) => {
            const selected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "cursor-pointer rounded-xl border px-4 py-4 text-left transition duration-200",
                  selected
                    ? "border-brand-a bg-brand-b/10 shadow-[0_0_24px_color-mix(in_srgb,var(--brand-a)_25%,transparent)]"
                    : "border-line bg-card/60 hover:border-brand-a/40"
                )}
              >
                <span className="font-mono text-[10px] text-text-2">0{index + 1}</span>
                <p className="mt-1 font-display text-sm font-semibold text-text-0">{item.organization}</p>
                <p className="text-xs text-text-2">{item.role}</p>
              </button>
            );
          })}
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.article
                key={active.id}
                initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="surface-card overflow-hidden"
              >
                <div className="border-b border-line bg-gradient-to-r from-brand-b/15 to-transparent px-6 py-8 sm:px-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-brand-a">
                    {active.start} — {active.end}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold text-text-0 sm:text-4xl">{active.role}</h2>
                  <p className="mt-1 text-lg text-text-1">{active.organization}</p>
                  <p className="mt-2 text-sm text-text-2">{active.location}</p>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div>
                    <p className="eyebrow">Growth arc</p>
                    <p className="mt-2 text-base italic text-text-1">{active.growthTheme}</p>
                  </div>

                  <div>
                    <p className="eyebrow">Impact</p>
                    <ul className="mt-3 space-y-2">
                      {active.achievements.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-text-1">
                          <span className="text-brand-a">→</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="eyebrow">Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span key={tech} className="chip border-brand-a/30 bg-brand-b/10 text-text-0">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ) : null}
          </AnimatePresence>
        </RevealBlock>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RevealBlock className="surface-card p-6">
          <p className="eyebrow">Education</p>
          {education.map((item) => (
            <div key={item.institution} className="mt-4">
              <h3 className="font-display text-lg font-semibold text-text-0">{item.institution}</h3>
              <p className="mt-1 text-sm text-text-1">{item.degree}</p>
              <p className="mt-2 font-mono text-xs text-text-2">{item.period}</p>
            </div>
          ))}
        </RevealBlock>

        <RevealBlock className="surface-card p-6" delay={0.06}>
          <p className="eyebrow">Highlights</p>
          <ul className="mt-4 space-y-3">
            {achievements.map((item) => (
              <li key={item} className="border-l-2 border-brand-a pl-3 text-sm leading-relaxed text-text-1">
                {item}
              </li>
            ))}
          </ul>
        </RevealBlock>
      </div>
    </div>
  );
}

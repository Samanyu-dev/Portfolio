"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";
import { SectionIntro } from "./SectionIntro";

const DOMAINS = [
  { id: "frontend", label: "Frontend", match: ["react", "next", "typescript", "tailwind", "three", "css", "html"] },
  { id: "backend", label: "Backend", match: ["node", "python", "php", "api", "rest", "graphql", "fastapi"] },
  { id: "ai", label: "AI", match: ["ai", "ml", "llm", "openai", "pytorch", "tensorflow", "ollama", "hugging"] },
  { id: "infra", label: "Infrastructure", match: ["docker", "aws", "vercel", "mongo", "postgres", "redis", "git"] },
  { id: "mobile", label: "Mobile", match: ["flutter", "swift", "ios", "android", "dart"] },
  { id: "cloud", label: "Cloud", match: ["vercel", "railway", "render", "netlify", "cloud", "deploy"] }
] as const;

type SkillsEcosystemProps = {
  data: PortfolioIntelligence;
};

export function SkillsEcosystem({ data }: SkillsEcosystemProps) {
  const [active, setActive] = useState<string>("frontend");

  const grouped = useMemo(() => {
    const techNames = data.techStackSummary.map((t) => t.name);
    const allTech = new Set([
      ...techNames,
      ...data.projects.flatMap((p) => p.technologies)
    ]);

    return DOMAINS.map((domain) => ({
      ...domain,
      skills: Array.from(allTech).filter((skill) =>
        domain.match.some((m) => skill.toLowerCase().includes(m))
      )
    }));
  }, [data]);

  const current = grouped.find((d) => d.id === active) ?? grouped[0];

  return (
    <section id="skills" className="scroll-mt-24 bg-bg-1 py-24 text-text-0 sm:py-32">
      <div className="site-container">
        <SectionIntro
          eyebrow="Skills"
          title="Technology ecosystem"
          description="Tools and frameworks grouped by domain — no arbitrary percentages, just what I use to build."
        />

        <div className="mt-12 flex flex-wrap gap-2">
          {grouped.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActive(domain.id)}
              className={`cursor-pointer rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
                active === domain.id
                  ? "border-brand-a bg-brand-b text-white"
                  : "border-line bg-card text-text-2 hover:border-brand-a/50 hover:text-text-0"
              }`}
            >
              {domain.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="font-display text-xl font-semibold">{current.label}</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {current.skills.length > 0 ? (
                current.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-line bg-bg-0 px-4 py-2 text-sm font-medium text-text-0 transition hover:border-brand-a/40"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-text-2">Technologies from projects in this domain.</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink, GitBranch, X } from "lucide-react";
import Link from "next/link";
import { getProjectImageUrl } from "@/lib/project-image";
import { useUniverse } from "../UniverseProvider";

const THEME: Record<string, { accent: string; mood: string }> = {
  codeforge: { accent: "#8b5cf6", mood: "Multi-agent cognition. Debate graphs. Live orchestration." },
  "oracle-agent": { accent: "#06b6d4", mood: "Cold precision. Probabilistic navigation under uncertainty." },
  aether: { accent: "#6366f1", mood: "Agent observability. Memory replay. Reasoning trees." },
  default: { accent: "#38bdf8", mood: "A recovered memory — explore through interaction." }
};

export function ProjectDream() {
  const { state, entities, exitProject } = useUniverse();
  const entity = entities.find((e) => e.id === state.selectedEntity);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exitProject]);

  if (!entity) return null;

  const project = entity.project;
  const theme = THEME[entity.slug] ?? THEME.default;

  return (
    <motion.div
      className="cu-dream fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${theme.accent}22, #000 70%)`
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.accent}08 2px, ${theme.accent}08 4px)`
        }}
      />

      <button
        type="button"
        onClick={exitProject}
        className="absolute right-6 top-6 z-10 cursor-pointer text-white/60 transition hover:text-white"
        aria-label="Exit memory"
      >
        <X className="h-8 w-8" />
      </button>

      <motion.div
        className="relative z-10 mx-6 grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center"
        initial={{ scale: 0.92, filter: "blur(20px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-square max-h-[min(70vh,480px)] overflow-hidden rounded-2xl border border-white/10">
          <img
            src={getProjectImageUrl(project)}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{ background: `linear-gradient(135deg, ${theme.accent}44, transparent)` }}
          />
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
            Memory depth · {Math.round(entity.memoryDepth * 100)}%
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-white/60">{theme.mood}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: theme.accent }}
            >
              <GitBranch className="h-4 w-4" />
              Repository
            </a>
            {project.frontend ? (
              <a
                href={project.frontend.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
            >
              Full dossier →
            </Link>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/35">
            Press escape to fold space
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

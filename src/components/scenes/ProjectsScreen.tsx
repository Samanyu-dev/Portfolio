"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useEffect } from "react";
import { ExternalLink, GitBranch, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import type { PortfolioRepo } from "@/types/portfolio";

const accentColor: Record<string, string> = {
  violet: "#9b5cff",
  cyan: "#00d4ff",
  emerald: "#10b981",
  orange: "#f97316"
};

const accentStyles: Record<string, { border: string; bg: string; text: string }> = {
  violet: { border: "border-neon-purple/30", bg: "bg-neon-purple/10", text: "text-neon-purple" },
  cyan: { border: "border-electric-blue/30", bg: "bg-electric-blue/10", text: "text-electric-blue" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-400" }
};

export function ProjectsScreen({ projects }: { projects: PortfolioRepo[] }) {
  const [centerIdx, setCenterIdx] = useState(0);
  const [focusedProject, setFocusedProject] = useState<PortfolioRepo | null>(null);
  const total = projects.length;

  const goNext = useCallback(() => {
    setCenterIdx((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCenterIdx((i) => (i - 1 + total) % total);
  }, [total]);

  // Keyboard navigation within carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (focusedProject) {
        if (e.key === "Escape") setFocusedProject(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "d") { e.stopPropagation(); goNext(); }
      if (e.key === "ArrowLeft" || e.key === "a") { e.stopPropagation(); goPrev(); }
      if (e.key === "Enter") {
        e.stopPropagation();
        setFocusedProject(projects[centerIdx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [centerIdx, focusedProject, goNext, goPrev, projects]);

  // Calculate visible cards in the carousel (show 7 at most)
  const visibleCards = useMemo(() => {
    const cards: { project: PortfolioRepo; offset: number; realIdx: number }[] = [];
    const range = 3;
    for (let i = -range; i <= range; i++) {
      const realIdx = ((centerIdx + i) % total + total) % total;
      cards.push({ project: projects[realIdx], offset: i, realIdx });
    }
    return cards;
  }, [centerIdx, projects, total]);

  return (
    <div className="relative flex flex-1 w-full flex-col">
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-10 lg:px-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-electric-blue/25 bg-electric-blue/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-electric-blue backdrop-blur-xl">
            <Layers className="h-3 w-3" /> Project explorer
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-text-primary sm:text-3xl lg:text-4xl">
            All Projects
          </h2>
          <p className="mt-2 max-w-lg text-sm text-text-muted">
            {total} projects — spin the carousel or click a card to dive deeper.
          </p>
        </div>
      </div>

      {/* Carousel + Focus */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {focusedProject ? (
            <motion.div
              key="focused"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="absolute inset-0 flex flex-col gap-4 overflow-y-auto px-6 py-4 sm:px-10 lg:flex-row lg:gap-6 lg:px-14"
            >
              <FocusedProject project={focusedProject} onBack={() => setFocusedProject(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex w-full flex-1 items-center justify-center"
            >
              {/* 3D Carousel */}
              <div className="relative h-[340px] w-full max-w-5xl" style={{ perspective: "1200px" }}>
                {visibleCards.map(({ project, offset, realIdx }) => {
                  const isCenter = offset === 0;
                  const absOffset = Math.abs(offset);
                  const z = 200 - absOffset * 80;
                  const x = offset * 220;
                  const rotateY = offset * -12;
                  const scale = isCenter ? 1 : Math.max(0.65, 1 - absOffset * 0.12);
                  const opacity = isCenter ? 1 : Math.max(0.25, 1 - absOffset * 0.25);
                  const color = accentColor[project.accent] ?? "#9b5cff";

                  return (
                    <motion.div
                      key={`${realIdx}-${project.slug}`}
                      className="absolute left-1/2 top-1/2 w-[260px] cursor-pointer"
                      style={{ zIndex: 10 - absOffset }}
                      animate={{
                        x: x - 130,
                        y: -155,
                        rotateY,
                        scale,
                        opacity,
                        z
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      onClick={() => {
                        if (isCenter) {
                          setFocusedProject(project);
                        } else {
                          setCenterIdx(realIdx);
                        }
                      }}
                      data-cursor="interactive"
                      whileHover={isCenter ? { scale: 1.04, y: -162 } : {}}
                    >
                      <div
                        className={`flex h-[310px] flex-col justify-between rounded-2xl border bg-bg-surface/70 p-5 backdrop-blur-xl transition-shadow duration-500 ${
                          isCenter
                            ? "border-white/20"
                            : "border-white/[0.06]"
                        }`}
                        style={{
                          boxShadow: isCenter
                            ? `0 20px 60px ${color}30, 0 0 0 1px ${color}20`
                            : "0 10px 30px rgba(0,0,0,0.3)"
                        }}
                      >
                        {/* Accent glow bar */}
                        <div
                          className="h-1 w-12 rounded-full mb-4"
                          style={{ background: color }}
                        />

                        <div className="flex-1">
                          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted">
                            {project.discipline}
                          </p>
                          <h3 className={`mt-2 text-base font-bold ${isCenter ? "text-white" : "text-text-secondary"}`}>
                            {project.title}
                          </h3>
                          <p className="mt-2 text-xs leading-5 text-text-muted line-clamp-3">
                            {project.summary}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                              style={{
                                background: `${color}18`,
                                color: color
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Category badge */}
                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                            style={{
                              background: `${color}15`,
                              color: color
                            }}
                          >
                            {project.category}
                          </span>
                          {isCenter && (
                            <span className="text-[10px] text-text-muted">Click to explore →</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  data-cursor="interactive"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:bg-neon-purple/15 hover:text-white hover:border-neon-purple/30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-mono text-xs text-text-muted">
                  {centerIdx + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  data-cursor="interactive"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:bg-neon-purple/15 hover:text-white hover:border-neon-purple/30"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FocusedProject({ project, onBack }: { project: PortfolioRepo; onBack: () => void }) {
  const style = accentStyles[project.accent] ?? accentStyles.violet;
  const color = accentColor[project.accent] ?? "#9b5cff";

  return (
    <>
      {/* Main detail */}
      <div className={`flex-1 rounded-2xl border ${style.border} bg-bg-surface/70 p-7 backdrop-blur-xl lg:p-9`}>
        <button
          type="button"
          onClick={onBack}
          data-cursor="interactive"
          className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-secondary transition hover:bg-white/10"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to carousel
        </button>

        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full" style={{ background: color }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">{project.discipline}</span>
        </div>

        <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-text-primary sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-text-secondary">{project.summary}</p>
        <p className="mt-2 text-xs leading-6 text-text-muted">{project.narrative.problem}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className={`rounded-full border ${style.border} ${style.bg} px-3 py-1 text-xs font-medium ${style.text}`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            data-cursor="interactive"
            className={`inline-flex items-center gap-2 rounded-full ${style.bg} px-4 py-2.5 text-sm font-semibold ${style.text} transition hover:opacity-80`}
          >
            <GitBranch className="h-4 w-4" /> Repository
          </a>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full space-y-3 lg:w-72">
        <div className="rounded-2xl border border-white/10 bg-bg-surface/60 p-5 backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">Use case</p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{project.useCase}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-surface/60 p-5 backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">Challenges</p>
          <ul className="mt-2 space-y-1.5">
            {project.narrative.challenges.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-surface/60 p-5 backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">Complexity</p>
          <p className="mt-2 text-base font-bold" style={{ color }}>{project.complexity.label}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}, #00d4ff)` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, project.complexity.score * 1.5)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

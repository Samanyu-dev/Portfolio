"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitBranch, Play, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioRepo } from "@/types/portfolio";
import { animationConfig } from "@/lib/animation-config";

type ProjectGroup = {
  id: string;
  label: string;
  description: string;
  repos: PortfolioRepo[];
};

const groupConfig = [
  {
    id: "ai",
    label: "AI Systems",
    description: "Autonomy, perception, simulation, and research-driven systems."
  },
  {
    id: "web",
    label: "Web Experiences",
    description: "Interfaces, interactions, dashboards, and immersive experiences."
  },
  {
    id: "products",
    label: "Apps & Platforms",
    description: "Mobile products, service layers, and product-shaped systems."
  },
  {
    id: "experiments",
    label: "Experiments",
    description: "Fast prototypes, concepts, and explorations."
  }
] as const;

const accentConfig = {
  cyan: {
    gradient: "from-cyan-600 via-cyan-500 to-cyan-400",
    glow: "shadow-[0_0_40px_rgba(56,189,248,0.25)]",
    surface: "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_25%),linear-gradient(135deg,rgba(8,20,40,0.8),rgba(8,15,30,0.9))]"
  },
  violet: {
    gradient: "from-violet-600 via-violet-500 to-violet-400",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.25)]",
    surface: "bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.12),transparent_25%),linear-gradient(135deg,rgba(30,20,50,0.8),rgba(20,15,40,0.9))]"
  },
  emerald: {
    gradient: "from-emerald-600 via-emerald-500 to-emerald-400",
    glow: "shadow-[0_0_40px_rgba(52,211,153,0.25)]",
    surface: "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.12),transparent_25%),linear-gradient(135deg,rgba(8,40,30,0.8),rgba(8,30,25,0.9))]"
  },
  orange: {
    gradient: "from-orange-600 via-orange-500 to-orange-400",
    glow: "shadow-[0_0_40px_rgba(251,146,60,0.25)]",
    surface: "bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.12),transparent_25%),linear-gradient(135deg,rgba(40,20,8,0.8),rgba(30,15,8,0.9))]"
  }
} as const;

export function EnhancedProjectExperience({
  repositories
}: {
  repositories: PortfolioRepo[];
}) {
  const stripRef = useRef<HTMLDivElement | null>(null);

  // Group repositories
  const groups = useMemo<ProjectGroup[]>(() => {
    const grouped = {
      ai: repositories.filter((repo) => repo.discipline === "AI Systems"),
      web: repositories.filter((repo) => repo.discipline === "Interactive Web"),
      products: repositories.filter(
        (repo) => repo.discipline === "Mobile Products" || repo.discipline === "Platforms & Data"
      ),
      experiments: repositories.filter((repo) => repo.discipline === "Product Experiments")
    };

    return groupConfig
      .map((group) => ({
        ...group,
        repos: grouped[group.id]
      }))
      .filter((group) => group.repos.length > 0);
  }, [repositories]);

  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const [selectedSlug, setSelectedSlug] = useState(groups[0]?.repos[0]?.slug ?? "");
  const [focusMode, setFocusMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0];
  const selectedRepo = activeGroup?.repos.find((r) => r.slug === selectedSlug) ?? activeGroup?.repos[0];
  const selectedIndex = activeGroup?.repos.findIndex((r) => r.slug === selectedRepo?.slug) ?? 0;

  useEffect(() => {
    if (!activeGroup) return;
    setSelectedSlug(activeGroup.repos[0]?.slug ?? "");
    setShowDetails(false);
    setFocusMode(false);
  }, [activeGroupId, activeGroup]);

  const navigateProject = (direction: -1 | 1) => {
    if (!activeGroup || activeGroup.repos.length === 0) return;
    const nextIndex = (selectedIndex + direction + activeGroup.repos.length) % activeGroup.repos.length;
    const nextRepo = activeGroup.repos[nextIndex];
    setSelectedSlug(nextRepo.slug);
    setShowDetails(false);
  };

  if (!activeGroup || !selectedRepo) return null;

  const accentStyle = accentConfig[selectedRepo.accent];

  return (
    <div className="section-shell space-y-8 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <p className="eyebrow">Project Stories</p>
        <h2 className="section-title mt-4">
          Work organized by discipline. Select a project to explore its story.
        </h2>
        <p className="section-copy mt-6 max-w-2xl">
          Each project isn&apos;t just code&mdash;it&apos;s a narrative about problem-solving, iteration, and craft. Click to explore.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {groups.map((group) => {
          const isActive = group.id === activeGroupId;
          return (
            <motion.button
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  : "border-white/12 bg-white/[0.05] text-slate-300 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {group.label}
              <span className="ml-2 opacity-60">{String(group.repos.length).padStart(2, "0")}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Project Card with Focus Mode */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={animationConfig.transitions.smooth}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setFocusMode(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={{
          scale: focusMode ? 1 : 1,
          position: focusMode ? "fixed" : "relative"
        }}
        className={`${focusMode ? "z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl" : ""}`}
      >
        <div className="story-card overflow-hidden bg-white/75 dark:bg-[#07070a]/90 border border-black/10 dark:border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl">
          {/* Close button in focus mode */}
          <AnimatePresence>
            {focusMode && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFocusMode(false)}
                className="absolute -right-12 top-0 z-10 text-[#1a1705] dark:text-white hover:text-[#a35d4e] dark:hover:text-cyan-300 transition"
              >
                <X className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className={`grid gap-8 p-8 sm:p-12 ${focusMode ? "lg:grid-cols-1" : "lg:grid-cols-[0.5fr_0.5fr]"}`}>
            {/* Left: Project Info */}
            <div className="flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRepo.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={animationConfig.transitions.smooth}
                  className="space-y-6"
                >
                  {/* Category and counter */}
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#a35d4e]">
                      {activeGroup.label}
                    </p>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[#1a1705]/50 dark:text-slate-400">
                      Project {String(selectedIndex + 1).padStart(2, "0")} of {String(activeGroup.repos.length).padStart(2, "0")}
                    </p>
                  </div>

                  {/* Title and description */}
                  <div>
                    <h3 className="text-3xl sm:text-5xl font-serif font-black tracking-tighter text-[#1a1705] dark:text-white leading-[1.05]">
                      {selectedRepo.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed font-sans font-medium text-[#1a1705]/90 dark:text-slate-200">
                      {selectedRepo.useCase}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#1a1705]/70 dark:text-slate-400">
                      {selectedRepo.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <a
                      href={selectedRepo.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-[#1a1705] dark:text-white transition hover:border-black/20 dark:hover:border-white/25 hover:bg-black/10 dark:hover:bg-white/10"
                    >
                      Repository
                      <GitBranch className="h-3.5 w-3.5" />
                    </a>
                    {selectedRepo.links.demo && (
                      <a
                        href={selectedRepo.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#a35d4e]/20 bg-[#a35d4e]/10 px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-[#a35d4e] dark:text-cyan-300 transition hover:bg-[#a35d4e]/15"
                      >
                        Live Demo
                        <Play className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <motion.button
                      onClick={() => setShowDetails(!showDetails)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-[#1a1705]/80 dark:text-slate-200 transition hover:border-black/20 dark:hover:border-white/25 hover:bg-black/10 dark:hover:bg-white/10"
                    >
                      {showDetails ? "Hide Story" : "See Story"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </motion.button>
                    <motion.button
                      onClick={() => setFocusMode(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-[#1a1705]/80 dark:text-slate-200 transition hover:border-black/20 dark:hover:border-white/25 hover:bg-black/10 dark:hover:bg-white/10"
                    >
                      Focus
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...animationConfig.transitions.smooth, delay: 0.1 }}
                className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5"
              >
                {selectedRepo.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono text-[#1a1705]/75 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {selectedRepo.stack.length > 4 && (
                  <span className="rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono text-[#1a1705]/50 dark:text-slate-400">
                    +{selectedRepo.stack.length - 4}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Right: Visual Surface (Dynamic System Console) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRepo.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={animationConfig.transitions.smooth}
                className={`relative overflow-hidden rounded-[2.2rem] border p-6 flex flex-col justify-center ${accentStyle.surface} ${accentStyle.glow}`}
              >
                {/* Decorative elements */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="absolute h-3 w-3 rounded-full bg-[#a35d4e] dark:bg-white/70 left-[15%] top-[20%] shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-[#a35d4e]/80 dark:bg-white/60 right-[20%] top-[25%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-[#a35d4e]/80 dark:bg-white/60 left-[25%] bottom-[20%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-[#a35d4e]/80 dark:bg-white/60 right-[18%] bottom-[22%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                </div>

                <div className="relative space-y-4">
                  {/* Featured reason */}
                  <div className="rounded-[1.5rem] border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/30 p-5">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#a35d4e] dark:text-slate-400">Why This Matters</p>
                    <p className="mt-2 text-base font-serif font-bold leading-normal text-[#1a1705] dark:text-white">
                      {selectedRepo.featuredReason}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div className="rounded-[1.5rem] border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/30 p-5">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#a35d4e] dark:text-slate-400">Core Challenge</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#1a1705]/80 dark:text-slate-200">
                      {selectedRepo.narrative.challenges[0] ?? "Complex problem space"}
                    </p>
                  </div>

                  {/* Tech grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.2rem] border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/20 p-4">
                      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1705]/50 dark:text-slate-500">Complexity</p>
                      <p className="mt-2 text-xs font-mono font-bold text-[#1a1705] dark:text-white">
                        {selectedRepo.complexity.label}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/20 p-4">
                      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1705]/50 dark:text-slate-500">Type</p>
                      <p className="mt-2 text-xs font-mono font-bold text-[#1a1705] dark:text-white">
                        {selectedRepo.links.demo ? "Live Mode" : "Source Node"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Expandable Details Section */}
          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={animationConfig.transitions.smooth}
                className="border-t border-black/10 dark:border-white/8 overflow-hidden"
              >
                <div className="p-8 sm:p-12 space-y-8 bg-black/[0.01] dark:bg-white/[0.01]">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#a35d4e] mb-3">Problem</p>
                      <p className="text-sm leading-relaxed text-[#1a1705]/80 dark:text-slate-300">
                        {selectedRepo.narrative.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#a35d4e] mb-3">Approach</p>
                      <p className="text-sm leading-relaxed text-[#1a1705]/80 dark:text-slate-300">
                        {selectedRepo.narrative.build}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#a35d4e] mb-3">Architecture</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.narrative.architecture.map((item) => (
                        <span
                          key={item}
                          className="rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono text-[#1a1705]/75 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Navigation */}
          <div className="border-t border-black/10 dark:border-white/8 p-8 sm:p-12">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#a35d4e]">Browse Projects</p>
                <p className="mt-2 text-xs text-[#1a1705]/60 dark:text-slate-400">
                  {activeGroup.label} • {activeGroup.repos.length} total
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => navigateProject(-1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 dark:border-white/12 bg-black/5 dark:bg-white/5 text-[#1a1705]/70 dark:text-slate-300 transition hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#1a1705] dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={() => navigateProject(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 dark:border-white/12 bg-black/5 dark:bg-white/5 text-[#1a1705]/70 dark:text-slate-300 transition hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 hover:text-[#1a1705] dark:hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Project carousel */}
            <div
              ref={stripRef}
              className="flex gap-3 overflow-x-auto pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {activeGroup.repos.map((repo, idx) => {
                const isActive = repo.slug === selectedRepo.slug;
                
                const carouselAccentMap = {
                  cyan: "border-cyan-500/30 bg-cyan-500/5 text-[#1a1705] dark:text-cyan-300 shadow-[0_4px_20px_rgba(56,189,248,0.1)]",
                  violet: "border-violet-500/30 bg-violet-500/5 text-[#1a1705] dark:text-violet-300 shadow-[0_4px_20px_rgba(168,85,247,0.1)]",
                  emerald: "border-emerald-500/30 bg-emerald-500/5 text-[#1a1705] dark:text-emerald-300 shadow-[0_4px_20px_rgba(52,211,153,0.1)]",
                  orange: "border-orange-500/30 bg-orange-500/5 text-[#1a1705] dark:text-orange-300 shadow-[0_4px_20px_rgba(251,146,60,0.1)]",
                } as const;

                return (
                  <motion.button
                    key={repo.slug}
                    onClick={() => {
                      setSelectedSlug(repo.slug);
                      setShowDetails(false);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`min-w-[15rem] snap-start rounded-[1.5rem] border p-5 text-left transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? carouselAccentMap[repo.accent]
                        : "border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/10 dark:hover:border-white/16 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#a35d4e]">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-base font-serif font-bold tracking-tight text-[#1a1705] dark:text-white line-clamp-1">
                      {repo.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs text-[#1a1705]/65 dark:text-slate-400">
                      {repo.useCase}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

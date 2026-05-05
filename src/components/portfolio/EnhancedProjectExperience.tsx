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
        <div className="story-card overflow-hidden">
          {/* Close button in focus mode */}
          <AnimatePresence>
            {focusMode && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFocusMode(false)}
                className="absolute -right-12 top-0 z-10 text-white hover:text-cyan-300 transition"
              >
                <X className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className={`grid gap-6 p-6 sm:p-8 ${focusMode ? "lg:grid-cols-1" : "lg:grid-cols-[0.45fr_0.55fr]"}`}>
            {/* Left: Project Info */}
            <div className="flex flex-col justify-between">
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
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                      {activeGroup.label}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Project {String(selectedIndex + 1).padStart(2, "0")} of {String(activeGroup.repos.length).padStart(2, "0")}
                    </p>
                  </div>

                  {/* Title and description */}
                  <div>
                    <h3 className="text-4xl sm:text-5xl font-bold tracking-[-0.06em] text-white">
                      {selectedRepo.title}
                    </h3>
                    <p className="mt-4 text-lg leading-8 text-slate-200">
                      {selectedRepo.useCase}
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-400">
                      {selectedRepo.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={selectedRepo.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                    >
                      Repository
                      <GitBranch className="h-4 w-4" />
                    </a>
                    {selectedRepo.links.demo && (
                      <a
                        href={selectedRepo.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/15"
                      >
                        Live Demo
                        <Play className="h-4 w-4" />
                      </a>
                    )}
                    <motion.button
                      onClick={() => setShowDetails(!showDetails)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/10"
                    >
                      {showDetails ? "Hide Details" : "See Full Story"}
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setFocusMode(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/10"
                    >
                      Focus Mode
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...animationConfig.transitions.smooth, delay: 0.1 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {selectedRepo.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {selectedRepo.stack.length > 4 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                    +{selectedRepo.stack.length - 4}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Right: Visual Surface */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRepo.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={animationConfig.transitions.smooth}
                className={`relative overflow-hidden rounded-[2.2rem] border border-white/10 p-6 ${accentStyle.surface} ${accentStyle.glow}`}
              >
                {/* Decorative elements */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                  <div className="absolute h-3 w-3 rounded-full bg-white/70 left-[15%] top-[20%] shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-white/60 right-[20%] top-[25%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-white/60 left-[25%] bottom-[20%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  <div className="absolute h-3 w-3 rounded-full bg-white/60 right-[18%] bottom-[22%] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                </div>

                <div className="relative space-y-4">
                  {/* Featured reason */}
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Why This Matters</p>
                    <p className="mt-3 text-lg font-semibold leading-7 text-white">
                      {selectedRepo.featuredReason}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Core Challenge</p>
                    <p className="mt-3 text-base leading-6 text-slate-200">
                      {selectedRepo.narrative.challenges[0] ?? "Complex problem space"}
                    </p>
                  </div>

                  {/* Tech grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Complexity</p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {selectedRepo.complexity.label}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Type</p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {selectedRepo.links.demo ? "Live" : "Source"}
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
                className="border-t border-white/8 overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">Problem</p>
                      <p className="text-base leading-7 text-slate-300">
                        {selectedRepo.narrative.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">Approach</p>
                      <p className="text-base leading-7 text-slate-300">
                        {selectedRepo.narrative.build}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">Architecture</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.narrative.architecture.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
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
          <div className="border-t border-white/8 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Browse Projects</p>
                <p className="mt-2 text-sm text-slate-400">
                  {activeGroup.label} • {activeGroup.repos.length} total
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => navigateProject(-1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={() => navigateProject(1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
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
                return (
                  <motion.button
                    key={repo.slug}
                    onClick={() => {
                      setSelectedSlug(repo.slug);
                      setShowDetails(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`min-w-[15rem] snap-start rounded-[1.5rem] border p-4 text-left transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? "border-cyan-300/30 bg-cyan-300/[0.1] shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.06]"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white line-clamp-2">
                      {repo.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs text-slate-400">
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

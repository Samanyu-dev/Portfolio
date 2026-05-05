"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitBranch, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioRepo } from "@/types/portfolio";

type RepoGroup = {
  id: string;
  label: string;
  description: string;
  repos: PortfolioRepo[];
};

const groupOrder = [
  {
    id: "ai",
    label: "AI Systems",
    description: "Autonomy, perception, simulation, and research-led system building."
  },
  {
    id: "web",
    label: "Web Experiences",
    description: "Interfaces, motion systems, dashboards, and browser-native storytelling."
  },
  {
    id: "products",
    label: "Apps & Platforms",
    description: "Mobile products, service layers, and product-shaped systems."
  },
  {
    id: "experiments",
    label: "Experiments",
    description: "Fast prototypes, concept builds, and utility signals that sharpen the edge."
  }
] as const;

const surfaceAccents = {
  cyan:
    "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.16),transparent_28%),linear-gradient(180deg,rgba(6,10,24,0.92),rgba(8,14,30,0.88))]",
  violet:
    "bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_28%),linear-gradient(180deg,rgba(10,8,24,0.92),rgba(12,10,30,0.88))]",
  emerald:
    "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.14),transparent_28%),linear-gradient(180deg,rgba(6,16,18,0.92),rgba(8,18,20,0.88))]",
  orange:
    "bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.16),transparent_28%),linear-gradient(180deg,rgba(18,12,8,0.92),rgba(20,14,8,0.88))]"
} as const;

export function ProjectAtlasExperience({ repositories }: { repositories: PortfolioRepo[] }) {
  const stripRef = useRef<HTMLDivElement | null>(null);

  const groups = useMemo<RepoGroup[]>(() => {
    const grouped = {
      ai: repositories.filter((repo) => repo.discipline === "AI Systems"),
      web: repositories.filter((repo) => repo.discipline === "Interactive Web"),
      products: repositories.filter(
        (repo) => repo.discipline === "Mobile Products" || repo.discipline === "Platforms & Data"
      ),
      experiments: repositories.filter((repo) => repo.discipline === "Product Experiments")
    };

    return groupOrder
      .map((group) => ({
        ...group,
        repos: grouped[group.id]
      }))
      .filter((group) => group.repos.length > 0);
  }, [repositories]);

  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  const [selectedSlug, setSelectedSlug] = useState(activeGroup?.repos[0]?.slug ?? "");
  const [showDepth, setShowDepth] = useState(false);

  useEffect(() => {
    if (!activeGroup) return;
    setSelectedSlug(activeGroup.repos[0]?.slug ?? "");
    setShowDepth(false);
  }, [activeGroupId, activeGroup]);

  const selectedRepo = activeGroup?.repos.find((repo) => repo.slug === selectedSlug) ?? activeGroup?.repos[0];
  const selectedIndex = activeGroup && selectedRepo ? activeGroup.repos.findIndex((repo) => repo.slug === selectedRepo.slug) : 0;

  const shiftSelection = (direction: -1 | 1) => {
    if (!activeGroup || activeGroup.repos.length === 0) return;
    const nextIndex = (selectedIndex + direction + activeGroup.repos.length) % activeGroup.repos.length;
    const nextRepo = activeGroup.repos[nextIndex];
    setSelectedSlug(nextRepo.slug);
    setShowDepth(false);

    const target = stripRef.current?.querySelector<HTMLButtonElement>(`[data-repo-card="${nextRepo.slug}"]`);
    target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (!activeGroup || !selectedRepo) return null;

  return (
    <div className="section-shell space-y-8 py-14 sm:py-18 lg:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title mt-4 max-w-3xl">
          Switch projects directly. No scroll trap, no fake worlds, just a cleaner interactive showcase.
        </h2>
        <p className="section-copy mt-5 max-w-2xl">
          Hover or click a project card to change the feature surface instantly. Every repository stays accessible, but the active one gets the full story space.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {groups.map((group) => {
          const isActive = group.id === activeGroup.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition duration-300 ${
                isActive
                  ? "border-cyan-300/30 bg-cyan-300/14 text-cyan-50 shadow-[0_0_30px_rgba(56,189,248,0.14)]"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/16 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {group.label}
              <span className="ml-2 text-slate-500">{String(group.repos.length).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="story-card overflow-hidden">
        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.4fr_0.6fr] lg:p-8">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200">{activeGroup.label}</p>
              <p className="mt-3 max-w-md text-base leading-7 text-slate-300">{activeGroup.description}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRepo.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="mt-8"
                >
                  <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                    Project {String(selectedIndex + 1).padStart(2, "0")} / {String(activeGroup.repos.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                    {selectedRepo.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200">{selectedRepo.useCase}</p>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">{selectedRepo.summary}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={selectedRepo.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                    >
                      Repository
                      <GitBranch className="h-4 w-4" />
                    </a>
                    {selectedRepo.links.demo ? (
                      <a
                        href={selectedRepo.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/12 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/18"
                      >
                        Live Demo
                        <Play className="h-4 w-4" />
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setShowDepth((current) => !current)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/18 hover:bg-white/[0.06]"
                    >
                      {showDepth ? "Hide depth" : "Inspect signal"}
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {selectedRepo.stack.slice(0, 5).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRepo.slug}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-[2.3rem] border border-white/10 p-6 sm:p-7 ${surfaceAccents[selectedRepo.accent]}`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.55)]" />
                <div className="absolute right-[14%] top-[24%] h-3 w-3 rounded-full bg-white/65 shadow-[0_0_24px_rgba(255,255,255,0.45)]" />
                <div className="absolute bottom-[18%] left-[20%] h-3 w-3 rounded-full bg-white/65 shadow-[0_0_24px_rgba(255,255,255,0.45)]" />
                <div className="absolute bottom-[22%] right-[22%] h-3 w-3 rounded-full bg-white/65 shadow-[0_0_24px_rgba(255,255,255,0.45)]" />
                <div className="absolute left-[26%] top-[29%] h-px w-[24%] rotate-[38deg] bg-white/30" />
                <div className="absolute left-[40%] top-[42%] h-px w-[24%] -rotate-[36deg] bg-white/30" />
                <div className="absolute left-[33%] top-[54%] h-px w-[28%] rotate-[32deg] bg-white/20" />
              </div>

              <div className="relative flex h-full min-h-[26rem] flex-col justify-between">
                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Impact line</p>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {selectedRepo.featuredReason}
                    </p>
                  </div>
                  <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Primary challenge</p>
                    <p className="mt-4 text-lg leading-8 text-slate-200">{selectedRepo.narrative.challenges[0]}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">System layer</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {selectedRepo.stack.slice(0, 6).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Status</p>
                    <div className="mt-4 grid gap-3 text-sm text-slate-200">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                        Complexity: {selectedRepo.complexity.label}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                        {selectedRepo.links.demo ? "Has live demo" : "Source-first project"}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {showDepth ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 12 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 12 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/18"
                    >
                      <div className="grid gap-5 p-5 sm:grid-cols-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Problem</p>
                          <p className="mt-3 text-base leading-7 text-slate-200">{selectedRepo.narrative.problem}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Build</p>
                          <p className="mt-3 text-base leading-7 text-slate-200">{selectedRepo.narrative.build}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t border-white/8 px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Project Rail</p>
              <p className="mt-2 text-sm text-slate-300">
                Hover or tap any card below to switch the active project instantly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => shiftSelection(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => shiftSelection(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {activeGroup.repos.map((repo, index) => {
              const isActive = repo.slug === selectedRepo.slug;

              return (
                <button
                  key={repo.slug}
                  type="button"
                  data-repo-card={repo.slug}
                  onMouseEnter={() => setSelectedSlug(repo.slug)}
                  onFocus={() => setSelectedSlug(repo.slug)}
                  onClick={() => {
                    setSelectedSlug(repo.slug);
                    setShowDepth(false);
                  }}
                  className={`min-w-[17rem] snap-start rounded-[1.7rem] border p-4 text-left transition duration-300 sm:min-w-[18.5rem] ${
                    isActive
                      ? "border-cyan-300/22 bg-cyan-300/[0.08] shadow-[0_18px_50px_rgba(12,25,52,0.3)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.06]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    {String(index + 1).padStart(2, "0")} {repo.discipline}
                  </p>
                  <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">{repo.title}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{repo.summary}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

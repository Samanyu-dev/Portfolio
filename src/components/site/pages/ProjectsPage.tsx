"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { PortfolioProject, ProjectCategory } from "@/types/portfolio-v2";
import { cn } from "@/lib/utils";

const ProjectStellarGallery = dynamic(
  () => import("@/components/ui/3d-image-gallery").then((mod) => mod.ProjectStellarGallery),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[50vh] items-center justify-center bg-[#050508]">
        <p className="font-mono text-sm text-white/50">Loading project galaxy…</p>
      </div>
    )
  }
);

type ProjectsPageProps = {
  projects: PortfolioProject[];
};

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>();
    projects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)] as const;
  }, [projects]);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col gap-3 px-4 pt-2 sm:px-6">
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Projects</p>
            <h1 className="font-display text-lg font-semibold text-white sm:text-xl">Project showcase</h1>
          </div>
          <p className="font-mono text-xs text-white/40">
            {filtered.length} / {projects.length} repos
          </p>
        </div>
        <div className="pointer-events-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition duration-200",
                filter === cat
                  ? "border-cyan-400/60 bg-cyan-500/20 text-cyan-100"
                  : "border-white/15 bg-black/40 text-white/60 hover:border-white/30 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 min-h-0">
        <ProjectStellarGallery projects={filtered} fullPage />
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/35">
        Drag · scroll to zoom · click a card
      </p>
    </div>
  );
}

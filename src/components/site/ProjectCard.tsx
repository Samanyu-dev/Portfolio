"use client";

import Link from "next/link";
import { ArrowUpRight, GitBranch, Star } from "lucide-react";
import { RevealBlock } from "@/components/site/RevealBlock";
import type { PortfolioProject } from "@/types/portfolio-v2";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: PortfolioProject;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <RevealBlock delay={index * 0.06}>
      <article className="group surface-card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-1">
          <div
            className="absolute inset-0 opacity-80 transition duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, var(--brand-a) 40%, transparent), color-mix(in srgb, var(--brand-c) 30%, transparent))`
            }}
          />
          <div className="absolute inset-0 flex items-end justify-between p-4">
            <span className="chip bg-bg-0/80">#{project.rank}</span>
            <span className="chip bg-bg-0/80">{project.category}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-semibold text-text-0">{project.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-1 line-clamp-3">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-text-2">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {project.metrics.stars}
            </span>
            <span>Score {project.qualityScore}</span>
            <span className={cn("chip", project.status === "Production" && "border-brand-a/40 text-brand-a")}>
              {project.status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex-1 py-2 text-xs sm:flex-none"
            >
              <GitBranch className="h-3.5 w-3.5" /> Repo
            </a>
            <Link href={`/projects/${project.slug}`} className="btn-primary flex-1 py-2 text-xs sm:flex-none">
              Details <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </RevealBlock>
  );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, LockKeyhole } from "lucide-react";
import { useRef, useState } from "react";
import { miniProjects, projects, projectFilters } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Filter = (typeof projectFilters)[number];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="section-shell">
      <p className="section-kicker">Projects</p>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="section-title">Five featured builds with AI depth and product polish.</h2>
          <p className="section-copy">
            Filter by domain, hover for 3D tilt, and open the verified public repositories where available.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                activeFilter === filter
                  ? "border-primary bg-primary text-white shadow-glow"
                  : "border-black/10 bg-white text-zinc-600 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>

      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-secondary">More Repos</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {miniProjects.map((project) => (
            <a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-black/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{project.title}</p>
                {project.repoStatus === "verified" ? (
                  <GitBranch className="text-secondary transition group-hover:scale-125" size={18} />
                ) : (
                  <LockKeyhole className="text-accent" size={18} />
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {project.repoStatus === "verified" ? project.language ?? "Repo" : "Not public"}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 15, y: x * 15 });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ rotateX: rotate.x, rotateY: rotate.y, transformPerspective: 800 }}
      className="tilt-preserve min-h-[25rem] rounded-[2rem] border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div
        className={cn(
          "h-36 rounded-t-[2rem] bg-gradient-to-br p-6 text-white",
          project.accent === "primary" && "from-primary to-violet-950",
          project.accent === "secondary" && "from-secondary to-emerald-950",
          project.accent === "accent" && "from-accent to-orange-950"
        )}
      >
        <div className="tilt-lift flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {project.category}
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {project.repoStatus === "verified" ? "Verified repo" : "Repo not public"}
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">{project.title}</h3>
        </div>
      </div>

      <div className="tilt-lift flex min-h-[16rem] flex-col p-6">
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-8">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.04] hover:bg-primary active:scale-[0.96] dark:bg-white dark:text-dark"
          >
            {project.repoStatus === "verified" ? <GitBranch size={16} /> : <LockKeyhole size={16} />}
            {project.repoStatus === "verified" ? "GitHub" : "Profile"}
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-primary dark:text-zinc-300"
            >
              Demo
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

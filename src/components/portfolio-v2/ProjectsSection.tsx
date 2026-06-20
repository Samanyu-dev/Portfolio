"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getProjectImageUrl } from "@/lib/project-image";
import type { PortfolioProject } from "@/types/portfolio-v2";
import { SectionIntro } from "./SectionIntro";

type ProjectsSectionProps = {
  projects: PortfolioProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.slice(0, 6);

  return (
    <section id="projects" className="scroll-mt-24 bg-bg-0 py-24 text-text-0 sm:py-32">
      <div className="site-container">
        <SectionIntro
          eyebrow="Work"
          title="Projects that ship"
          description="Production AI systems, full-stack platforms, and research builds — ranked by impact and engineering depth."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition hover:border-brand-a/40 hover:shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={getProjectImageUrl(project, "hero")}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <img
                  src={getProjectImageUrl(project, "hover")}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-2">
                  #{project.rank} · {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">{project.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-text-1">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-bg-1 px-2 py-0.5 font-mono text-[10px] text-text-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0"
                aria-label={`View ${project.name}`}
              />
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-b px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open interactive project showcase <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-sm text-text-2">
            Full 3D gallery with filters — unchanged showcase experience
          </p>
        </div>
      </div>
    </section>
  );
}

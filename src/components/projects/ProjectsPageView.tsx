"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { ProviderBadge } from "@/components/shared/ProviderBadge";
import { StatusPill } from "@/components/shared/StatusPill";
import { ProjectDetailsModal } from "@/components/projects/ProjectDetailsModal";
import type { PortfolioProject } from "@/types/portfolio-v2";

type ProjectsPageViewProps = {
  projects: PortfolioProject[];
};

export function ProjectsPageView({ projects }: ProjectsPageViewProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(projects.length);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const deck = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || projects.length === 0) return;

    const card = container.querySelector<HTMLElement>("[data-project-card='true']");
    const cardWidth = card?.offsetWidth ?? 330;
    const gap = 20;

    container.scrollTo({ left: (cardWidth + gap) * projects.length, behavior: "auto" });

    const onScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-project-card='true']"));

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((cardItem, index) => {
        const cardCenter = cardItem.offsetLeft + cardItem.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);

      if (closestIndex < projects.length * 0.5 || closestIndex > projects.length * 2.5) {
        const mapped = closestIndex % projects.length;
        const safeIndex = mapped + projects.length;
        container.scrollTo({ left: (cardWidth + gap) * safeIndex, behavior: "auto" });
        setActiveIndex(safeIndex);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollBy({ left: event.deltaY * 0.9, behavior: "smooth" });
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        container.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        container.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [projects.length]);

  const current = deck[activeIndex] ?? projects[0];

  return (
    <>
      <SectionIntro
        eyebrow="Projects"
        title="Ranked project atlas with product-level detail"
        description="Public repositories are normalized into production-grade cards with quality ranking, deployment mapping, category inference, and interaction-ready details."
        actions={
          <div className="flex items-center gap-2 text-xs text-text-2">
            <span className="metric-chip">Drag</span>
            <span className="metric-chip">Mouse Wheel</span>
            <span className="metric-chip">Arrow Keys</span>
          </div>
        }
      />

      <div className="panel p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-text-1">
            <span className="font-semibold text-text-0">Featured:</span> {current?.name ?? "-"}
          </p>
          <div className="flex items-center gap-2 text-text-2">
            <ArrowLeft className="h-4 w-4" />
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div
          ref={containerRef}
          className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-3"
          aria-label="Project carousel"
        >
          {deck.map((project, index) => {
            const isActive = index === activeIndex;

            const Card = reducedMotion ? "article" : motion.article;

            return (
              <Card
                key={`${project.slug}-${index}`}
                data-project-card="true"
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={reducedMotion ? undefined : { once: true }}
                transition={reducedMotion ? undefined : { duration: 0.28, delay: (index % projects.length) * 0.04 }}
                className={`min-h-[320px] w-[min(84vw,360px)] shrink-0 snap-center rounded-3xl border border-white/10 bg-black/20 p-5 transition duration-300 sm:min-h-[340px] ${
                  isActive ? "scale-[1.01] shadow-glow" : "opacity-85"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-text-2">Rank #{project.rank}</p>
                    <h2 className="mt-1 section-title text-xl text-text-0">{project.name}</h2>
                  </div>
                  <StatusPill status={project.status} />
                </div>

                <p className="mt-3 min-h-[3.9rem] text-sm text-text-1">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="metric-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2 rounded-2xl border border-white/10 p-3 text-xs text-text-1">
                  <div className="flex items-center justify-between">
                    <span>GitHub</span>
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-a hover:underline">
                      Repo <GitBranch className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Frontend</span>
                    {project.frontend ? (
                      <a href={project.frontend.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-a hover:underline">
                        Live <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-text-2">N/A</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Backend</span>
                    {project.backend ? (
                      <a href={project.backend.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-a hover:underline">
                        Live <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-text-2">N/A</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="metric-chip">{project.category}</span>
                  {project.frontend ? <ProviderBadge provider={project.frontend.provider} /> : null}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="mt-5 w-full cursor-pointer rounded-xl bg-brand-b px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-a focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
                >
                  Open details
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

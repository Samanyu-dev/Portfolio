"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { ProviderBadge } from "@/components/shared/ProviderBadge";
import { StatusPill } from "@/components/shared/StatusPill";
import type { PortfolioProject } from "@/types/portfolio-v2";

type ProjectDetailsModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="panel max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-text-2">Project Overview</p>
                <h3 className="section-title mt-2 text-2xl text-text-0">{project.name}</h3>
                <p className="mt-2 max-w-2xl text-sm text-text-1">{project.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-text-1 transition hover:bg-white/10 hover:text-text-0"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <StatusPill status={project.status} />
              {project.highlights.map((item) => (
                <span key={item} className="metric-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <section className="rounded-2xl border border-white/10 p-4">
                  <h4 className="font-semibold text-text-0">Tech Stack</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="metric-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 p-4">
                  <h4 className="font-semibold text-text-0">Architecture & Features</h4>
                  <ul className="mt-3 space-y-2 text-sm text-text-1">
                    <li>Ranked quality score: {project.qualityScore}</li>
                    <li>Category: {project.category}</li>
                    <li>Public repo activity tracked from GitHub API</li>
                    <li>Deployment links inferred and normalized across providers</li>
                  </ul>
                </section>
              </div>

              <div className="space-y-4">
                <section className="rounded-2xl border border-white/10 p-4">
                  <h4 className="font-semibold text-text-0">Links</h4>
                  <div className="mt-3 space-y-3">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
                    >
                      <span className="inline-flex items-center gap-2">
                        <GitBranch className="h-4 w-4" /> GitHub Repository
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    {project.frontend ? (
                      <a
                        href={project.frontend.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
                      >
                        <span className="inline-flex items-center gap-2">
                          {project.frontend.label} <ProviderBadge provider={project.frontend.provider} />
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}

                    {project.backend ? (
                      <a
                        href={project.backend.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
                      >
                        <span className="inline-flex items-center gap-2">
                          {project.backend.label} <ProviderBadge provider={project.backend.provider} />
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 p-4">
                  <h4 className="font-semibold text-text-0">Project Metrics</h4>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Stars" value={String(project.metrics.stars)} />
                    <Metric label="Forks" value={String(project.metrics.forks)} />
                    <Metric label="Watchers" value={String(project.metrics.watchers)} />
                    <Metric label="Open Issues" value={String(project.metrics.openIssues)} />
                  </dl>
                </section>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-2.5">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-text-2">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-text-0">{value}</dd>
    </div>
  );
}

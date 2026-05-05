"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatLongDate, formatRepoDate, formatRepoSize } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import type { AccentTone, PortfolioRepo } from "@/types/portfolio";

const accentClasses: Record<AccentTone, { glow: string; border: string; chip: string; text: string }> = {
  cyan: {
    glow: "from-cyan-400/30 via-sky-400/10 to-transparent",
    border: "border-cyan-300/20",
    chip: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
    text: "text-cyan-200"
  },
  emerald: {
    glow: "from-emerald-400/30 via-green-400/10 to-transparent",
    border: "border-emerald-300/20",
    chip: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
    text: "text-emerald-200"
  },
  orange: {
    glow: "from-orange-400/30 via-amber-400/10 to-transparent",
    border: "border-orange-300/20",
    chip: "border-orange-300/20 bg-orange-300/10 text-orange-50",
    text: "text-orange-200"
  },
  violet: {
    glow: "from-fuchsia-400/30 via-violet-400/10 to-transparent",
    border: "border-fuchsia-300/20",
    chip: "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-50",
    text: "text-fuchsia-200"
  }
};

export function ProjectDetailExperience({
  repo,
  allRepos
}: {
  repo: PortfolioRepo;
  allRepos: PortfolioRepo[];
}) {
  const accent = accentClasses[repo.accent];
  const relatedRepos = allRepos.filter((item) => item.slug !== repo.slug).slice(0, 3);

  return (
    <main className="relative overflow-hidden pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_22%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_22%),linear-gradient(180deg,#050816_0%,#071225_52%,#050816_100%)]" />
      <div className="noise-layer absolute inset-0 opacity-25" />

      <section className="section-shell relative z-10 pt-24">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to the portfolio journey
        </a>

        <div className="mt-8 overflow-hidden rounded-[2.4rem] border border-white/10 bg-slate-950/[0.7]">
          <div className={cn("absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-br", accent.glow)} />
          <div className="relative grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]", accent.chip)}>
                  {repo.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {repo.discipline}
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {repo.complexity.label}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl"
              >
                {repo.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
              >
                {repo.summary}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={repo.links.repo} target="_blank" rel="noreferrer">
                  Repository
                  <GitBranch className="ml-2 h-4 w-4" />
                </Button>
                {repo.links.demo && (
                  <Button href={repo.links.demo} variant="outline" target="_blank" rel="noreferrer">
                    Live demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <SignalCard label="Created" value={formatRepoDate(repo.timeline.createdAt)} />
                <SignalCard label="Updated" value={formatRepoDate(repo.timeline.updatedAt)} />
                <SignalCard label="Repo size" value={formatRepoSize(repo.metrics.size)} />
              </div>
            </div>

            <div className={cn("relative overflow-hidden rounded-[2rem] border bg-black/[0.25] p-6", accent.border)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailStat title="Use case" value={repo.useCase} tall />
                <DetailStat title="Featured reason" value={repo.featuredReason} tall />
                <DetailStat title="Stars" value={String(repo.metrics.stars).padStart(2, "0")} />
                <DetailStat title="Forks" value={String(repo.metrics.forks).padStart(2, "0")} />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Stack signatures</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.stack.map((item) => (
                    <span key={item} className={cn("rounded-full border px-3 py-1 text-xs font-medium", accent.chip)}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Timeline signals</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <p>Created on {formatLongDate(repo.timeline.createdAt)}.</p>
                  <p>Most recently updated on {formatLongDate(repo.timeline.updatedAt)}.</p>
                  <p>Repository age: {repo.metrics.repoAge} year{repo.metrics.repoAge > 1 ? "s" : ""}.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {repo.links.demo && (
        <section className="section-shell relative z-10 pt-14">
          <div className="glass-panel overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Live preview</p>
                <h2 className="text-2xl font-semibold text-white">A live surface is attached to this chapter.</h2>
              </div>
              <a
                href={repo.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
              >
                Open externally
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/[0.4]">
              <iframe
                title={`${repo.title} live preview`}
                src={repo.links.demo}
                className="hidden h-[34rem] w-full md:block"
                loading="lazy"
              />
              <div className="grid min-h-48 place-items-center px-6 py-10 text-center text-sm text-slate-300 md:hidden">
                The live preview is hidden on mobile to keep the story lighter. Open the demo in a new tab to interact with it.
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-shell relative z-10 pt-14">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel p-6">
            <p className="eyebrow">Problem frame</p>
            <p className="mt-4 text-sm leading-8 text-slate-300">{repo.narrative.problem}</p>
          </div>
          <div className="glass-panel p-6">
            <p className="eyebrow">Build narrative</p>
            <p className="mt-4 text-sm leading-8 text-slate-300">{repo.narrative.build}</p>
          </div>
          <div className="glass-panel p-6">
            <p className="eyebrow">Outcome</p>
            <p className="mt-4 text-sm leading-8 text-slate-300">{repo.narrative.outcome}</p>
          </div>
          <div className="glass-panel p-6">
            <p className="eyebrow">Architecture breakdown</p>
            <div className="mt-4 grid gap-3">
              {repo.narrative.architecture.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 pt-14">
        <div className="glass-panel p-6 sm:p-8">
          <p className="eyebrow">Key challenges</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {repo.narrative.challenges.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm leading-8 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 pt-14">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Continue exploring</p>
            <h2 className="text-2xl font-semibold text-white">More chapters from the portfolio journey.</h2>
          </div>
          <a href="/" className="hidden text-sm text-slate-300 transition hover:text-white sm:inline-flex">
            Return to home
          </a>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {relatedRepos.map((item) => (
            <a key={item.slug} href={`/projects/${item.slug}`} className="glass-panel group p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-slate-200">
                Read chapter
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function SignalCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-3 text-sm text-slate-200">{value}</p>
    </div>
  );
}

function DetailStat({ title, value, tall = false }: { title: string; value: string; tall?: boolean }) {
  return (
    <div className={cn("rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4", tall && "sm:col-span-2")}>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{title}</p>
      <p className="mt-3 text-sm leading-7 text-slate-200">{value}</p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { SkillCluster } from "@/types/portfolio";

const clusterPlacement: Record<string, string> = {
  ai: "lg:col-start-2 lg:row-start-1",
  web: "lg:col-start-1 lg:row-start-2",
  backend: "lg:col-start-3 lg:row-start-2",
  mobile: "lg:col-start-2 lg:row-start-3"
};

const accentStyles = {
  violet: "border-violet-300/20 bg-violet-400/[0.08] text-violet-100 shadow-[0_0_0_1px_rgba(196,181,253,0.08)]",
  cyan: "border-cyan-300/20 bg-cyan-400/[0.08] text-cyan-100 shadow-[0_0_0_1px_rgba(103,232,249,0.08)]",
  emerald: "border-emerald-300/20 bg-emerald-400/[0.08] text-emerald-100 shadow-[0_0_0_1px_rgba(110,231,183,0.08)]",
  orange: "border-orange-300/20 bg-orange-400/[0.08] text-orange-100 shadow-[0_0_0_1px_rgba(253,186,116,0.08)]"
} as const;

export function SkillEcosystem({ clusters }: { clusters: SkillCluster[] }) {
  const [activeKey, setActiveKey] = useState(clusters[0]?.key ?? "");

  const activeCluster = useMemo(
    () => clusters.find((cluster) => cluster.key === activeKey) ?? clusters[0],
    [activeKey, clusters]
  );

  const connectedRepos = useMemo(() => {
    if (!activeCluster) return [];

    const counts = new Map<string, number>();

    activeCluster.skills.forEach((skill) => {
      skill.repos.forEach((repo) => {
        counts.set(repo, (counts.get(repo) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 4);
  }, [activeCluster]);

  if (!activeCluster) return null;

  return (
    <div className="space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">Skill Map</p>
        <h2 className="section-title mx-auto mt-4 max-w-3xl">
          Built around the stack I actually use, without overlap or filler.
        </h2>
        <p className="section-copy mx-auto mt-5 max-w-2xl">
          AI, web, backend, and app development each get their own clean space, while still connecting back to the same product core.
        </p>
      </div>

      <div className="glass-panel overflow-hidden p-5 sm:p-7 lg:p-8">
        <div className="relative hidden min-h-[42rem] lg:block">
          <div className="pointer-events-none absolute left-1/2 top-[18%] h-[17%] w-px -translate-x-1/2 bg-white/10" />
          <div className="pointer-events-none absolute bottom-[18%] left-1/2 h-[17%] w-px -translate-x-1/2 bg-white/10" />
          <div className="pointer-events-none absolute left-[18%] top-1/2 h-px w-[17%] -translate-y-1/2 bg-white/10" />
          <div className="pointer-events-none absolute right-[18%] top-1/2 h-px w-[17%] -translate-y-1/2 bg-white/10" />

          <div className="grid h-full grid-cols-3 grid-rows-3 items-center gap-6">
            {clusters.map((cluster) => {
              const isActive = cluster.key === activeCluster.key;

              return (
                <button
                  key={cluster.key}
                  type="button"
                  onClick={() => setActiveKey(cluster.key)}
                  className={`relative rounded-[2rem] border p-6 text-left transition duration-300 ${clusterPlacement[cluster.key] ?? ""} ${
                    isActive
                      ? `${accentStyles[cluster.accent]} scale-[1.01] border-white/16`
                      : "border-white/10 bg-slate-950/55 text-white hover:border-white/16 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-semibold tracking-[-0.03em]">{cluster.title}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">
                        {cluster.skills.length} listed skills
                      </p>
                    </div>
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-current/80" />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {cluster.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm font-medium text-current/95"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}

            <motion.div
              layout
              className="relative col-start-2 row-start-2 mx-auto flex h-[16rem] w-[16rem] flex-col items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_34%),linear-gradient(180deg,rgba(8,12,28,0.96),rgba(6,10,24,0.9))] px-8 text-center shadow-[0_24px_80px_rgba(8,15,35,0.38)]"
            >
              <p className="text-[11px] uppercase tracking-[0.36em] text-slate-500">Core Signal</p>
              <h3 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">Samanyu</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                AI, web, backend, and app development connected through product thinking.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid gap-4 lg:hidden">
          <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,12,28,0.96),rgba(6,10,24,0.9))] px-6 py-7 text-center shadow-[0_20px_80px_rgba(8,15,35,0.36)]">
            <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">Core Signal</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">Samanyu</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              AI, web, backend, and app development connected through product thinking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {clusters.map((cluster) => {
              const isActive = cluster.key === activeCluster.key;

              return (
                <button
                  key={cluster.key}
                  type="button"
                  onClick={() => setActiveKey(cluster.key)}
                  className={`rounded-[1.8rem] border p-5 text-left transition duration-300 ${
                    isActive
                      ? `${accentStyles[cluster.accent]} border-white/16`
                      : "border-white/10 bg-slate-950/50 text-white hover:border-white/16 hover:bg-white/[0.045]"
                  }`}
                >
                  <p className="text-lg font-semibold tracking-[-0.03em]">{cluster.title}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => (
                      <span key={skill.name} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[1.9rem] border border-white/10 bg-black/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Focused Cluster</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{activeCluster.title}</h3>
              <p className="mt-2 text-base text-slate-300">{activeCluster.description}</p>
            </div>
            <span className={`rounded-full border px-4 py-2 text-sm font-medium ${accentStyles[activeCluster.accent]}`}>
              {activeCluster.skills.length} skills
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {activeCluster.skills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm text-slate-200"
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {connectedRepos.map(([repo, count]) => (
              <span
                key={repo}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300"
              >
                {repo}
                <span className="ml-2 text-slate-500">{count} repo{count > 1 ? "s" : ""}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

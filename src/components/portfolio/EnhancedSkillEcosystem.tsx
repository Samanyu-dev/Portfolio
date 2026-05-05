"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import type { SkillCluster } from "@/types/portfolio";
import { animationConfig } from "@/lib/animation-config";

const accentGradients = {
  violet: "from-violet-600 via-violet-500 to-violet-400",
  cyan: "from-cyan-600 via-cyan-500 to-cyan-400",
  emerald: "from-emerald-600 via-emerald-500 to-emerald-400",
  orange: "from-orange-600 via-orange-500 to-orange-400"
} as const;

const accentGlows = {
  violet: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  cyan: "shadow-[0_0_30px_rgba(56,189,248,0.3)]",
  emerald: "shadow-[0_0_30px_rgba(52,211,153,0.3)]",
  orange: "shadow-[0_0_30px_rgba(251,146,60,0.3)]"
} as const;

const clusterPositions: Record<string, { x: string; y: string }> = {
  ai: { x: "col-start-2", y: "row-start-1" },
  web: { x: "col-start-1", y: "row-start-2" },
  backend: { x: "col-start-3", y: "row-start-2" },
  mobile: { x: "col-start-2", y: "row-start-3" }
};

export function EnhancedSkillEcosystem({ clusters }: { clusters: SkillCluster[] }) {
  const [activeClusterId, setActiveClusterId] = useState(clusters[0]?.key ?? "");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const activeCluster = useMemo(
    () => clusters.find((c) => c.key === activeClusterId) ?? clusters[0],
    [activeClusterId, clusters]
  );

  // Compute connected repos for active cluster
  const connectedRepos = useMemo(() => {
    if (!activeCluster) return [];
    const counts = new Map<string, number>();
    activeCluster.skills.forEach((skill) => {
      skill.repos.forEach((repo) => {
        counts.set(repo, (counts.get(repo) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [activeCluster]);

  if (!activeCluster) return null;

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="eyebrow justify-center">Interactive System</p>
        <h2 className="section-title mx-auto mt-4">
          Stack organized by discipline, connected through product thinking.
        </h2>
        <p className="section-copy mx-auto mt-6 max-w-2xl">
          Four distinct domains—each with its own depth, but all orbiting the same core vision of building systems that feel alive.
        </p>
      </motion.div>

      {/* Desktop Grid View */}
      <div className="hidden lg:block">
        <div className="glass-panel overflow-hidden p-8">
          <div className="relative">
            {/* Guide lines for visual hierarchy */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-[15%] h-[18%] w-px -translate-x-1/2 bg-white/5" />
              <div className="absolute bottom-[15%] left-1/2 h-[18%] w-px -translate-x-1/2 bg-white/5" />
              <div className="absolute left-[15%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-white/5" />
              <div className="absolute right-[15%] top-1/2 h-px w-[18%] -translate-y-1/2 bg-white/5" />
            </div>

            {/* Grid layout */}
            <div className="relative grid h-[42rem] grid-cols-3 grid-rows-3 items-center gap-6">
              {clusters.map((cluster) => {
                const isActive = cluster.key === activeClusterId;
                const position = clusterPositions[cluster.key];

                return (
                  <motion.button
                    key={cluster.key}
                    onClick={() => setActiveClusterId(cluster.key)}
                    className={`${position?.x} ${position?.y} relative rounded-[2.2rem] border p-6 text-left transition-all duration-300 group cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <div
                      className={`absolute inset-0 rounded-[2.2rem] opacity-0 transition-opacity duration-300 ${
                        isActive
                          ? `opacity-100 bg-gradient-to-br ${accentGradients[cluster.accent]} ${accentGlows[cluster.accent]}`
                          : "group-hover:opacity-20 bg-gradient-to-br from-white to-white"
                      }`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-xl font-semibold tracking-[-0.03em] transition-colors duration-300 ${
                            isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                          }`}>
                            {cluster.title}
                          </p>
                          <p className={`mt-2 text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
                            isActive ? "text-white/70" : "text-slate-500 group-hover:text-slate-400"
                          }`}>
                            {cluster.skills.length} skills
                          </p>
                        </div>
                        <motion.span
                          animate={{ scale: isActive ? 1.2 : 1 }}
                          className={`h-3 w-3 rounded-full ${
                            isActive
                              ? `bg-gradient-to-r ${accentGradients[cluster.accent]}`
                              : "bg-white/30 group-hover:bg-white/50"
                          }`}
                        />
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ maxHeight: isActive ? 200 : 0, opacity: isActive ? 1 : 0 }}
                        transition={animationConfig.transitions.smooth}
                        className="mt-4 overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2">
                          {cluster.skills.map((skill) => (
                            <motion.span
                              key={skill.name}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${
                                isActive
                                  ? "border-white/30 text-white bg-white/10"
                                  : "border-transparent text-slate-300 bg-transparent"
                              }`}
                            >
                              {skill.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}

              {/* Center focus element */}
              <motion.div
                layout
                className="col-start-2 row-start-2 relative z-20 mx-auto flex h-[14rem] w-[14rem] flex-col items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-slate-900 via-slate-900 to-black/90 px-8 text-center shadow-[0_0_80px_rgba(56,189,248,0.2)]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeClusterId}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={animationConfig.transitions.smooth}
                  >
                    <p className="text-[10px] uppercase tracking-[0.36em] text-slate-400">Focus</p>
                    <h3 className="mt-3 text-3xl font-bold tracking-[-0.06em] bg-gradient-to-r from-cyan-200 via-purple-200 to-orange-200 bg-clip-text text-transparent">
                      {activeCluster.title}
                    </h3>
                    <p className="mt-4 text-xs leading-6 text-slate-300">
                      {activeCluster.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        <div className="glass-panel overflow-hidden p-6 space-y-6">
          {/* Center card */}
          <motion.div
            layout
            className="rounded-[2rem] border border-white/12 bg-gradient-to-br from-slate-900 via-slate-900 to-black/90 px-6 py-8 text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClusterId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={animationConfig.transitions.smooth}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Current Focus</p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  {activeCluster.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {activeCluster.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Cluster buttons */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {clusters.map((cluster) => {
              const isActive = cluster.key === activeClusterId;
              return (
                <motion.button
                  key={cluster.key}
                  onClick={() => setActiveClusterId(cluster.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden rounded-[1.5rem] border p-4 text-center transition-all duration-300 group`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                      isActive
                        ? `opacity-100 bg-gradient-to-br ${accentGradients[cluster.accent]}`
                        : "group-hover:opacity-15 bg-gradient-to-br from-white to-white"
                    }`}
                  />
                  <div className="relative z-10">
                    <p className={`text-sm font-semibold transition-colors ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {cluster.title}
                    </p>
                    <p className={`mt-1 text-xs transition-colors ${
                      isActive ? "text-white/70" : "text-slate-500"
                    }`}>
                      {cluster.skills.length} skills
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Section - Active Cluster */}
      <motion.div
        layout
        className="glass-panel overflow-hidden p-6 sm:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeClusterId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={animationConfig.transitions.smooth}
            className="space-y-6"
          >
            {/* Skills grid */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-4">Core Skills</p>
              <div className="flex flex-wrap gap-3">
                {activeCluster.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...animationConfig.transitions.fast, delay: idx * 0.04 }}
                    onHoverStart={() => setExpandedSkill(skill.name)}
                    onHoverEnd={() => setExpandedSkill(null)}
                    className="relative"
                  >
                    <button
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        expandedSkill === skill.name
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                          : "border-white/15 bg-white/5 text-slate-200 hover:border-white/25 hover:bg-white/10"
                      }`}
                    >
                      {skill.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connected repositories */}
            {connectedRepos.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-4">Active in {connectedRepos.length} repos</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {connectedRepos.map(([repo, count]) => (
                    <motion.div
                      key={repo}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300"
                    >
                      <span className="font-medium">{repo}</span>
                      <span className="ml-2 text-slate-500">({count})</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

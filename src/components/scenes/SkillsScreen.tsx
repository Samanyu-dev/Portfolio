"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { SkillCluster } from "@/types/portfolio";

const clusterColors: Record<string, { bg: string; border: string; glow: string; text: string; dot: string }> = {
  violet: {
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/30",
    glow: "shadow-[0_0_40px_rgba(155,92,255,0.3)]",
    text: "text-neon-purple",
    dot: "bg-neon-purple"
  },
  cyan: {
    bg: "bg-electric-blue/10",
    border: "border-electric-blue/30",
    glow: "shadow-[0_0_40px_rgba(0,212,255,0.3)]",
    text: "text-electric-blue",
    dot: "bg-electric-blue"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
    text: "text-emerald-400",
    dot: "bg-emerald-400"
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    text: "text-orange-400",
    dot: "bg-orange-400"
  }
};

const positions = [
  { left: "10%", top: "18%" },
  { right: "10%", top: "18%" },
  { left: "10%", bottom: "18%" },
  { right: "10%", bottom: "18%" }
];

export function SkillsScreen({ clusters }: { clusters: SkillCluster[] }) {
  const [activeKey, setActiveKey] = useState(clusters[0]?.key ?? "ai");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const active = clusters.find((c) => c.key === activeKey) ?? clusters[0];
  const colors = clusterColors[active.accent] ?? clusterColors.violet;

  return (
    <div className="relative flex flex-1 w-full flex-col">
      {/* Header */}
      <div className="relative z-10 px-6 pt-8 sm:px-10 lg:px-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-purple backdrop-blur-xl">
          Interactive system
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-text-primary sm:text-4xl lg:text-5xl">
          Skill Constellation
        </h2>
        <p className="mt-3 max-w-xl text-base text-text-muted">
          Four clusters orbit a central core. Click to zoom in — hover to feel the system respond.
        </p>
      </div>

      {/* Constellation area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Orbit rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[200, 280, 360].map((size) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Center node */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-purple/30 bg-bg-surface/90 shadow-[0_0_60px_rgba(155,92,255,0.2)] backdrop-blur-xl sm:h-32 sm:w-32"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">Core</p>
            <p className="mt-1 text-2xl font-black text-text-primary">Me</p>
          </div>
        </motion.div>

        {/* Cluster nodes */}
        {clusters.map((cluster, i) => {
          const isActive = cluster.key === activeKey;
          const isHovered = cluster.key === hoveredKey;
          const pos = positions[i] ?? positions[0];
          const c = clusterColors[cluster.accent] ?? clusterColors.violet;

          return (
            <motion.button
              key={cluster.key}
              type="button"
              onClick={() => setActiveKey(cluster.key)}
              onMouseEnter={() => setHoveredKey(cluster.key)}
              onMouseLeave={() => setHoveredKey(null)}
              data-cursor="interactive"
              className={`absolute z-10 flex flex-col items-center justify-center rounded-3xl border px-5 py-4 text-center transition-all duration-500 sm:min-h-[7rem] sm:min-w-[7rem] sm:px-6 sm:py-5 ${
                isActive
                  ? `${c.bg} ${c.border} ${c.glow}`
                  : "border-white/10 bg-bg-surface/70 hover:border-white/20 hover:bg-bg-surface/90"
              }`}
              style={pos}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${isActive ? c.dot : "bg-white/30"} mb-2 transition-all`} />
              <span className={`text-sm font-bold ${isActive ? c.text : "text-text-secondary"}`}>
                {cluster.title}
              </span>
              <span className="mt-1 text-[11px] text-text-muted">{cluster.skills.length} skills</span>

              {/* Expanded skills on hover */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex flex-wrap justify-center gap-1.5 overflow-hidden"
                  >
                    {cluster.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill.name}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${c.bg} ${c.text}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Connection lines (CSS-drawn) */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-[5]" aria-hidden="true">
          <line x1="50%" y1="50%" x2="15%" y2="22%" stroke="rgba(155,92,255,0.1)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="85%" y2="22%" stroke="rgba(0,212,255,0.08)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="15%" y2="78%" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="85%" y2="78%" stroke="rgba(249,115,22,0.08)" strokeWidth="1" />
        </svg>
      </div>

      {/* Detail panel */}
      <div className="relative z-10 px-6 pb-6 sm:px-10 lg:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-bg-surface/70 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${colors.dot}`} />
              <h3 className={`text-xl font-bold ${colors.text}`}>{active.title}</h3>
            </div>
            <p className="mt-2 text-sm text-text-muted">{active.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {active.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center gap-1.5 rounded-full border ${colors.border} ${colors.bg} px-3 py-1.5 text-xs font-medium ${colors.text}`}
                >
                  {skill.name}
                  {skill.repos.length > 0 && (
                    <span className="text-[10px] text-text-muted">· {skill.repos.length}</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ExternalLink, GitBranch, ChevronLeft, ChevronRight, Layers, Sparkles, Command, Shield, Zap, Globe, Maximize2, X, Smartphone } from "lucide-react";
import type { PortfolioRepo } from "@/types/portfolio";

const CATEGORIES = [
  { id: "all", label: "All Labs", icon: Layers, color: "violet" },
  { id: "ai", label: "AI Systems", icon: Zap, color: "violet" },
  { id: "web", label: "Interactive Web", icon: Globe, color: "cyan" },
  { id: "mobile", label: "Mobile Products", icon: Smartphone, color: "emerald" },
  { id: "backend", label: "Core Systems", icon: Shield, color: "orange" }
] as const;

const accentColor: Record<string, string> = {
  violet: "text-neon-purple",
  cyan: "text-electric-blue",
  emerald: "text-emerald-400",
  orange: "text-orange-400"
};

const accentStyles: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  violet: { border: "border-neon-purple/30", bg: "bg-neon-purple/5", text: "text-neon-purple", glow: "shadow-[0_0_40px_rgba(155,92,255,0.15)]" },
  cyan: { border: "border-electric-blue/30", bg: "bg-electric-blue/5", text: "text-electric-blue", glow: "shadow-[0_0_40px_rgba(0,212,255,0.15)]" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/5", text: "text-emerald-400", glow: "shadow-[0_0_40px_rgba(16,185,129,0.15)]" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/5", text: "text-orange-400", glow: "shadow-[0_0_40px_rgba(249,115,22,0.15)]" }
};

export function ProjectsScreen({ 
  projects,
  onHoverProject
}: { 
  projects: PortfolioRepo[];
  onHoverProject?: (tech: string | null) => void;
}) {
  const [filter, setFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusProject, setFocusProject] = useState<PortfolioRepo | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  useEffect(() => {
    const active = filtered[selectedIndex];
    if (active && active.techStack && active.techStack.length > 0) {
      onHoverProject?.(active.techStack[0]);
    } else {
      onHoverProject?.(null);
    }
  }, [selectedIndex, filtered, onHoverProject]);

  const activeProject = filtered[selectedIndex] || filtered[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  // Reset index when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  return (
    <div className="relative flex flex-1 w-full flex-col overflow-hidden">
      {/* Background Dimmer when focusing */}
      <AnimatePresence>
        {focusProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocusProject(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* Header & Categories */}
      <div className="relative z-10 px-6 pt-8 sm:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-purple backdrop-blur-xl">
              Research & Development // Phase 4
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-text-primary sm:text-4xl lg:text-5xl">
              Project Explorer
            </h2>
          </div>

          <nav className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.id;
              const styles = accentStyles[cat.color];
              return (
                <button
                  key={cat.id}
                  onClick={() => { setFilter(cat.id); setSelectedIndex(0); }}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    isActive 
                      ? `${styles.border} ${styles.bg} ${styles.glow} text-white` 
                      : "border-white/5 bg-white/2 text-text-muted hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative flex-1 perspective-[2000px]">
        <div className="absolute inset-0 flex items-center justify-center py-10">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${filter}-${selectedIndex}`}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15, z: -100 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15, z: -100 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="relative w-full max-w-4xl px-6"
              >
                <ProjectCard 
                  project={activeProject} 
                  onFocus={() => setFocusProject(activeProject)}
                />
              </motion.div>
            ) : (
              <div className="text-center">
                <p className="text-text-muted italic">No labs found in this sector...</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-4 sm:px-10 lg:px-20 pointer-events-none">
          <button
            onClick={handlePrev}
            className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all hover:scale-110 hover:border-neon-purple/50"
          >
            <ChevronLeft className="h-6 w-6 text-white transition-transform group-hover:-translate-x-1" />
          </button>
          <button
            onClick={handleNext}
            className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all hover:scale-110 hover:border-neon-purple/50"
          >
            <ChevronRight className="h-6 w-6 text-white transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Focus Experience Overlay */}
      <AnimatePresence>
        {focusProject && (
          <FocusExperience 
            project={focusProject} 
            onClose={() => setFocusProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <div className="relative z-10 px-6 pb-8 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <div className="flex gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Total Labs</p>
              <p className="text-xl font-bold text-white">{projects.length}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Sector Index</p>
              <p className="text-xl font-bold text-neon-purple">{filtered.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1 w-32 rounded-full bg-white/5 overflow-hidden">
              <motion.div 
                className="h-full bg-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: filtered.length > 0 ? `${((selectedIndex + 1) / filtered.length) * 100}%` : 0 }}
              />
            </div>
            <span className="font-mono text-xs text-text-muted">
              {selectedIndex + 1} / {filtered.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onFocus }: { project: PortfolioRepo; onFocus: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]));

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = accentStyles[project.accentColor] || accentStyles.violet;

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onFocus}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] border p-1 backdrop-blur-3xl transition-all duration-700 ${style.border} ${style.bg} ${style.glow}`}
    >
      <div className="relative z-10 flex flex-col gap-10 rounded-[2.2rem] bg-bg-surface/20 p-10 sm:p-14 md:flex-row md:items-center">
        {/* Mysterious Entry Visual */}
        <div className="relative flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-[2.2rem] bg-black/60 md:h-72 md:w-72">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30" />
          
          {/* Animated Background Pulse */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute h-40 w-40 rounded-full blur-3xl ${accentColor[project.accentColor]}`} 
          />

          <Command className={`h-24 w-24 ${accentColor[project.accentColor]} opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40`} />
          
          {/* Action Triggers */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
          >
            <div className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-transform hover:scale-105">
              <Zap className="h-4 w-4" />
              Initialize Deep Dive
            </div>
            
            {project.homepage && (
              <button 
                onClick={(e) => { e.stopPropagation(); window.open(project.homepage!, '_blank'); }}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black"
              >
                <ExternalLink className="h-3 w-3" />
                Quick Launch
              </button>
            )}
          </motion.div>
        </div>

        {/* Impact Statement Header */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className={`h-1.5 w-1.5 rounded-full ${accentColor[project.accentColor]} animate-pulse`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-muted">{project.category}</span>
            </div>
            <h3 className="text-5xl font-black text-white tracking-tighter sm:text-6xl lg:text-7xl leading-[0.9]">
              {project.title}
            </h3>
          </div>
          
          <p className="max-w-xl text-xl font-medium leading-relaxed text-text-secondary/80 tracking-tight group-hover:text-text-primary transition-colors duration-500">
            {project.summary}
          </p>

          <div className="flex items-center gap-6 pt-6">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              System Ready // Access Node
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FocusExperience({ project, onClose }: { project: PortfolioRepo; onClose: () => void }) {
  const styles = accentStyles[project.accentColor] || accentStyles.violet;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
    >
      <motion.div 
        layoutId={`project-${project.name}`}
        className="relative h-[90%] w-[95%] max-w-[1400px] overflow-hidden bg-black rounded-[3rem] border border-white/10 shadow-2xl"
      >
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(155,92,255,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          
          {/* Moving Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className={`absolute -top-1/2 -left-1/4 h-[100%] w-[100%] rounded-full blur-[120px] ${accentColor[project.accentColor]} opacity-20`}
          />
        </div>

        <button 
          onClick={onClose}
          className="absolute right-8 top-8 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-white hover:text-black"
        >
          <X className="h-4 w-4" />
          Exit Mode
        </button>

        <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
          {/* Header Section */}
          <div className="px-8 pt-32 pb-20 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className={`flex h-2 w-2 rounded-full ${accentColor[project.accentColor]} animate-pulse`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-muted">Status: Operational // Node: {project.slug}</span>
              </div>
              <h2 className="text-7xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl">
                {project.title}
              </h2>
              <p className="mt-10 text-2xl md:text-3xl font-medium leading-tight text-text-secondary max-w-3xl">
                {project.summary}
              </p>
            </motion.div>
          </div>

          {/* Grid Layout for Deep Dive */}
          <div className="px-8 pb-32 md:px-20 grid gap-20 lg:grid-cols-[1.2fr_1fr]">
            {/* Left Column: System & Architecture */}
            <div className="space-y-24">
              {/* Section 1: Problem / Build */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-4">01 // The Problem</h4>
                  <p className="text-xl leading-relaxed text-text-secondary/90 italic">
                    &ldquo;{project.narrative.problem || "Bridging the gap between conceptual complexity and intuitive user interaction."}&rdquo;
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-8">System Architecture</h4>
                  <div className="flex flex-col gap-6">
                    {project.narrative.architecture?.map((layer, i) => (
                      <div key={layer} className="flex items-center gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-mono text-xs font-bold text-white">
                          0{i + 1}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        <span className="text-lg font-bold text-white uppercase tracking-wider">{layer}</span>
                      </div>
                    ))}
                    {(!project.narrative.architecture || project.narrative.architecture.length === 0) && (
                      <div className="flex flex-wrap gap-4">
                        {project.stack?.map((tech) => (
                          <div key={tech} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-6 py-4">
                            <div className={`h-2 w-2 rounded-full ${accentColor[project.accentColor]}`} />
                            <span className="text-sm font-bold text-white tracking-wide uppercase">{tech}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Section 2: Narrative Deep Dive */}
              {project.longNarrative && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-8">02 // Engineering Narrative</h4>
                  <div className="space-y-12 text-2xl font-medium leading-relaxed text-text-secondary">
                    {project.longNarrative.split('\n\n').map((para, i) => (
                      <p key={i} className="tracking-tight">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Insights & Connections */}
            <div className="space-y-24 lg:pt-32">
              {/* Engineering Insights */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-12">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-10">Critical Challenges</h4>
                  <div className="space-y-10">
                    {project.narrative.challenges?.map((challenge, i) => (
                      <div key={i} className="group flex items-start gap-6">
                        <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${accentColor[project.accentColor]} opacity-40 group-hover:opacity-100 transition-opacity`} />
                        <p className="text-lg font-medium text-text-secondary group-hover:text-white transition-colors">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome Block */}
                <div className="px-12">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-6">The Outcome</h4>
                  <p className="text-xl font-bold text-white leading-relaxed">
                    {project.narrative.outcome || "A high-performance engineered solution delivered with technical precision and design excellence."}
                  </p>
                </div>
              </motion.div>

              {/* Action Hub */}
              <div className="flex flex-col gap-6">
                <a
                  href={project.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-20 items-center justify-between rounded-[2rem] bg-white px-10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-lg font-black uppercase tracking-widest text-black">Decrypt Source</span>
                  <GitBranch className="h-6 w-6 text-black" />
                </a>
                
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-20 items-center justify-between rounded-[2rem] border border-white/10 bg-white/5 px-10 transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-white/10"
                  >
                    <span className="text-lg font-black uppercase tracking-widest text-white">Execute Live Node</span>
                    <Globe className="h-6 w-6 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

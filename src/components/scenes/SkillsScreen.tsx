import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Zap, Target, Cpu, Layout, Smartphone, Database, ChevronLeft } from "lucide-react";
import type { SkillCluster } from "@/types/portfolio";

const clusterIcons: Record<string, any> = {
  ai: Cpu,
  web: Layout,
  mobile: Smartphone,
  backend: Database
};

const clusterColors: Record<string, { bg: string; border: string; glow: string; text: string; dot: string; path: string }> = {
  violet: {
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/30",
    glow: "shadow-[0_0_40px_rgba(155,92,255,0.3)]",
    text: "text-neon-purple",
    dot: "bg-neon-purple",
    path: "rgba(155,92,255,0.2)"
  },
  cyan: {
    bg: "bg-electric-blue/10",
    border: "border-electric-blue/30",
    glow: "shadow-[0_0_40px_rgba(0,212,255,0.3)]",
    text: "text-electric-blue",
    dot: "bg-electric-blue",
    path: "rgba(0,212,255,0.2)"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    path: "rgba(16,185,129,0.2)"
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    text: "text-orange-400",
    dot: "bg-orange-400",
    path: "rgba(249,115,22,0.2)"
  }
};

const positions = [
  { left: "12%", top: "20%" },
  { right: "12%", top: "20%" },
  { left: "12%", bottom: "20%" },
  { right: "12%", bottom: "20%" }
];

export function SkillsScreen({ 
  clusters,
  onHoverNode 
}: { 
  clusters: SkillCluster[];
  onHoverNode?: (node: string | null) => void;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    onHoverNode?.(hoveredKey);
  }, [hoveredKey, onHoverNode]);

  const [isZoomed, setIsZoomed] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transforms for floating effect
  const coreX = useTransform(springX, (v) => v * -0.05);
  const coreY = useTransform(springY, (v) => v * -0.05);

  const active = clusters.find((c) => c.key === activeKey);
  const colors = active ? (clusterColors[active.accent] ?? clusterColors.violet) : clusterColors.violet;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex flex-1 w-full flex-col overflow-hidden">
      {/* Dynamic Header */}
      <div className="relative z-30 px-6 pt-8 sm:px-10 lg:px-14">
        <motion.div
          animate={{ opacity: isZoomed ? 0 : 1, y: isZoomed ? -20 : 0 }}
          className="pointer-events-none"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-purple backdrop-blur-xl">
            Interactive system // Phase 3
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-text-primary sm:text-4xl lg:text-5xl">
            Skill Constellation
          </h2>
          <p className="mt-3 max-w-xl text-base text-text-muted">
            Click a cluster to descend into the specialized tech stack.
          </p>
        </motion.div>

        {isZoomed && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => { setIsZoomed(false); setActiveKey(null); }}
            className="group mt-4 flex items-center gap-3 text-text-muted hover:text-white transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:scale-110">
              <ChevronLeft className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest">Return to Core</span>
          </motion.button>
        )}
      </div>

      {/* Constellation Canvas */}
      <div className="relative flex-1">
        {/* Orbital Background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[240, 340, 440].map((size, idx) => (
            <motion.div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
              style={{ width: size, height: size }}
              animate={{ 
                rotate: idx % 2 === 0 ? 360 : -360,
                scale: isZoomed ? 1.5 : 1,
                opacity: isZoomed ? 0.2 : 1
              }}
              transition={{ duration: 60 + idx * 20, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Connection paths */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
          {clusters.map((cluster, i) => {
            const pos = positions[i];
            const c = clusterColors[cluster.accent] ?? clusterColors.violet;
            return (
              <motion.line
                key={`line-${cluster.key}`}
                x1="50%" y1="50%"
                x2={pos.left || (pos.right ? `calc(100% - ${pos.right})` : "50%")}
                y2={pos.top || (pos.bottom ? `calc(100% - ${pos.bottom})` : "50%")}
                stroke={c.path}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isZoomed ? 0 : (hoveredKey === cluster.key || activeKey === cluster.key ? 0.8 : 0.15) 
                }}
                transition={{ duration: 1 }}
              />
            );
          })}
        </svg>

        {/* Center Core */}
        <motion.div
          layout
          className={`absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-purple/30 bg-bg-surface/90 shadow-[0_0_80px_rgba(155,92,255,0.2)] backdrop-blur-3xl sm:h-40 sm:w-40 ${isZoomed ? 'opacity-0 scale-50' : ''}`}
          style={{ x: coreX, y: coreY }}
          animate={{ 
            scale: isZoomed ? 0 : 1
          }}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-neon-purple/20"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted">Nucleus</p>
            <p className="mt-1 text-3xl font-black text-text-primary">Me</p>
          </div>
        </motion.div>

        {/* Skill Clusters */}
        <div className="absolute inset-0 z-10">
          <AnimatePresence>
            {!isZoomed ? (
              clusters.map((cluster, i) => (
                <ClusterButton 
                  key={cluster.key} 
                  cluster={cluster} 
                  index={i} 
                  springX={springX} 
                  springY={springY} 
                  activeKey={activeKey}
                  hoveredKey={hoveredKey}
                  onFocus={() => { setActiveKey(cluster.key); setIsZoomed(true); }}
                  onHover={setHoveredKey}
                />
              ))
            ) : (
              <motion.div
                key="zoomed-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center p-6 md:p-20"
              >
                <div className="grid w-full max-w-5xl gap-12 md:grid-cols-[1fr_2fr]">
                  {/* Left: Category Info */}
                  <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col justify-center"
                  >
                    <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl ${colors.bg} ${colors.text} border ${colors.border} shadow-2xl`}>
                      {active && (clusterIcons[active.key] ? (() => {
                        const Icon = clusterIcons[active.key];
                        return <Icon className="h-10 w-10" />;
                      })() : <Zap className="h-10 w-10" />)}
                    </div>
                    <h3 className={`text-5xl font-black tracking-tighter ${colors.text}`}>
                      {active?.title}
                    </h3>
                    <p className="mt-6 text-xl text-text-muted leading-relaxed">
                      {active?.description}
                    </p>
                    
                    <div className="mt-10 flex gap-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">Ecosystem Size</span>
                        <span className="text-2xl font-bold text-white">{active?.skills.length} specialized nodes</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: Skill Nodes */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {active?.skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`group relative flex flex-col justify-between rounded-2xl border ${colors.border} ${colors.bg} p-5 backdrop-blur-2xl transition-all hover:bg-white/5`}
                      >
                        <div className="flex items-start justify-between">
                          <Target className={`h-5 w-5 ${colors.text} opacity-50`} />
                          <span className="font-mono text-[9px] text-text-muted">Node.{idx + 1}</span>
                        </div>
                        <div className="mt-8">
                          <h4 className="text-lg font-bold text-white group-hover:text-white">{skill.name}</h4>
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className={`h-full ${colors.dot}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ClusterButton({ cluster, index, springX, springY, activeKey, hoveredKey, onFocus, onHover }: any) {
  const isHovered = cluster.key === hoveredKey;
  const pos = positions[index] ?? positions[0];
  const c = clusterColors[cluster.accent] ?? clusterColors.violet;
  const Icon = clusterIcons[cluster.key] || Zap;

  const floatX = useTransform(springX, (v: number) => v * (index % 2 === 0 ? 0.05 : -0.05));
  const floatY = useTransform(springY, (v: number) => v * (index < 2 ? 0.05 : -0.05));

  return (
    <motion.button
      layoutId={`cluster-${cluster.key}`}
      onClick={onFocus}
      onMouseEnter={() => onHover(cluster.key)}
      onMouseLeave={() => onHover(null)}
      className={`absolute flex flex-col items-center justify-center rounded-3xl border p-6 text-center transition-all duration-500 backdrop-blur-xl min-w-[140px] ${
        isHovered ? `${c.bg} ${c.border} ${c.glow}` : "border-white/10 bg-bg-surface/60"
      }`}
      style={{ ...pos, x: floatX, y: floatY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${c.bg} ${c.text} border ${c.border}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-bold text-white tracking-tight">{cluster.title}</span>
      <span className="mt-1 font-mono text-[10px] text-text-muted uppercase tracking-widest">{cluster.skills.length} Nodes</span>
    </motion.button>
  );
}

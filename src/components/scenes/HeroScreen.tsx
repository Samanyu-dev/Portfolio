import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Download, Command, Globe } from "lucide-react";
import type { PortfolioProfile } from "@/types/portfolio";

export function HeroScreen({
  profile,
  roles,
  onNavigate
}: {
  profile: PortfolioProfile;
  roles: string[];
  onNavigate: (screen: string) => void;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 100);
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [roles.length]);

  return (
    <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
      {/* Cinematic Background Layer removed (now global) */}


      {/* Atmospheric Lighting */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-neon-purple/15 blur-[160px] animate-pulse-glow" />
        <div className="absolute right-[-5%] bottom-[-5%] h-[600px] w-[600px] rounded-full bg-electric-blue/10 blur-[140px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 lg:flex-row lg:text-left">
        {/* Left Content Column */}
        <div className="flex flex-1 flex-col items-center lg:items-start lg:pr-12">
          {/* System Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInitialized ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-secondary">
              System Online: {profile.name}
            </span>
          </motion.div>

          {/* Title Sequence */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInitialized ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <h1 className="text-6xl font-black tracking-[-0.07em] sm:text-7xl lg:text-9xl">
                <span className="text-white opacity-95">{profile.introName}</span>
                <span className="bg-gradient-to-tr from-neon-purple to-electric-blue bg-clip-text text-transparent">.</span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={isInitialized ? { width: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="mt-4 h-px bg-gradient-to-r from-neon-purple/50 via-white/10 to-transparent lg:max-w-md"
            />
          </div>

          {/* Dynamic Roles */}
          <div className="mt-8 h-16 overflow-hidden lg:h-20">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInitialized ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 max-w-xl"
          >
            <p className="text-xl leading-relaxed text-text-primary lg:text-2xl font-medium">
              Architecting <span className="text-neon-purple font-black italic">intelligent interfaces</span> between complex systems and human experience.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-muted">Worldview: System Intelligence & Human Polish</p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInitialized ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => onNavigate("projects")}
              data-cursor="interactive"
              className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-10 text-base font-bold text-black transition-all hover:scale-105 active:scale-95"
            >
              <Command className="h-4 w-4" />
              Explore Labs
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="/samanyu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="group flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 text-base font-bold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Resume
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Right Decorative Space (occupied by GlobeBackground via z-index) */}
        <div className="hidden lg:block lg:flex-1 h-[600px]" />
      </div>
      
      {/* Technical Meta Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInitialized ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-10 right-10 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 lg:flex-row lg:gap-0"
      >
        <div className="flex gap-12 sm:gap-20">
          {[
            { value: profile.publicRepos, label: "Engineering Labs", suffix: "+" },
            { value: profile.followers, label: "Network Node", suffix: "" },
          ].map((stat) => (
            <div key={stat.label} className="group relative flex flex-col">
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-black text-white sm:text-4xl">{stat.value}</span>
                {stat.suffix && <span className="text-sm font-bold text-neon-purple">{stat.suffix}</span>}
              </div>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.4em] text-text-muted group-hover:text-electric-blue transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-text-muted">
          <Globe className="h-4 w-4 animate-spin-slow text-neon-purple" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
            Interactive Deployment // V2.4.0
          </span>
        </div>
      </motion.div>
    </div>
  );
}

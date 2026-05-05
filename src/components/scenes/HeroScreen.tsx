"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative flex flex-1 w-full items-center justify-center">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-neon-purple/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-[-10%] bottom-[-5%] h-[400px] w-[400px] rounded-full bg-electric-blue/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-[40%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-accent-magenta/10 blur-[90px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-5 py-2.5 backdrop-blur-xl"
        >
          <Zap className="h-3.5 w-3.5 text-neon-purple" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-purple">
            Portfolio Interface
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-6xl font-black tracking-[-0.06em] sm:text-7xl lg:text-8xl"
        >
          <span className="text-text-primary">{profile.introName}</span>
          <span className="gradient-text">.</span>
        </motion.h1>

        {/* Role cycling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 h-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-semibold text-text-secondary sm:text-3xl"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-text-muted"
        >
          Building immersive experiences across AI, mobile, backend, and web — with motion, depth, and product-level craft.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            data-cursor="interactive"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-neon-purple via-electric-blue to-accent-magenta px-8 py-4 text-base font-bold text-white shadow-glow-purple transition-all duration-300 hover:shadow-[0_0_80px_rgba(155,92,255,0.4)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10">Explore Projects</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-accent-magenta to-electric-blue opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-16 flex items-center gap-8 sm:gap-12"
        >
          {[
            { value: `${profile.publicRepos}+`, label: "Repos" },
            { value: `${profile.followers}`, label: "Followers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

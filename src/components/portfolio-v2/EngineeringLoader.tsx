"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getProjectImageUrl } from "@/lib/project-image";
import type { PortfolioProject } from "@/types/portfolio-v2";

const LOADER_KEY = "portfolio-v2-loader-seen";
const DURATION_MS = 4200;

type EngineeringLoaderProps = {
  projects: PortfolioProject[];
  onComplete: () => void;
};

export function EngineeringLoader({ projects, onComplete }: EngineeringLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"thumbs" | "stack" | "done">("thumbs");

  const thumbs = projects.slice(0, 8);

  useEffect(() => {
    const seen = sessionStorage.getItem(LOADER_KEY);
    if (seen === "1") {
      onComplete();
      return;
    }

    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / DURATION_MS) * 100);
      setProgress(p);
      if (p > 35) setPhase("stack");
      if (p >= 100) {
        clearInterval(tick);
        setPhase("done");
        sessionStorage.setItem(LOADER_KEY, "1");
        setTimeout(onComplete, 400);
      }
    }, 40);

    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b] px-6"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          Loading portfolio
        </p>

        <div className="relative mt-10 flex h-28 w-full max-w-lg items-center justify-center">
          {thumbs.map((project, i) => (
            <motion.div
              key={project.slug}
              className="absolute h-20 w-16 overflow-hidden rounded-lg border border-white/15 shadow-lg"
              initial={{ opacity: 0, scale: 0.5, x: (i - 4) * 40 }}
              animate={{
                opacity: phase === "thumbs" ? 0.9 : 0.4,
                scale: phase === "stack" ? 0.85 : 1,
                x: phase === "stack" ? (i - 4) * 12 : (i - 4) * 36,
                y: phase === "stack" ? 0 : Math.sin(i) * 8
              }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <img
                src={getProjectImageUrl(project, "hover")}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 w-full max-w-xs">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[#2563eb]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-white/45">
            {phase === "thumbs" && "Assembling project artifacts…"}
            {phase === "stack" && "Activating tech stack…"}
            {phase === "done" && "Ready"}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function useEngineeringLoader() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(LOADER_KEY) === "1") {
      setShowLoader(false);
      setReady(true);
    }
  }, []);

  const complete = () => {
    setShowLoader(false);
    setReady(true);
  };

  return { ready, showLoader, complete };
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAME = "Samanyu";
const TAGLINE = "Portfolio Interface";

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.3 + NAME.length * 0.06 + 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + NAME.length * 0.06 + 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const containerExit = {
  opacity: 0,
  scale: 1.08,
  filter: "blur(12px)",
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"animate" | "done">("animate");

  useEffect(() => {
    // Total intro time: ~2s
    const timer = setTimeout(() => {
      setPhase("done");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "done") {
      // Small delay for exit animation to play
      const exitTimer = setTimeout(onComplete, 700);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase === "animate" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#07060e" }}
          exit={containerExit}
        >
          {/* Background ambient */}
          <div className="pointer-events-none absolute inset-0">
            {/* Central glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(155,92,255,0.2) 0%, transparent 70%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {/* Second glow */}
            <motion.div
              className="absolute left-[60%] top-[40%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            />
          </div>

          {/* Loading bar at bottom */}
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-40">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-purple via-electric-blue to-accent-magenta"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              />
            </div>
          </div>

          {/* Name reveal */}
          <div className="relative z-10 flex flex-col items-center" style={{ perspective: 800 }}>
            {/* Letter-by-letter name */}
            <div className="flex items-baseline">
              {NAME.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-5xl font-black tracking-[-0.04em] text-text-primary sm:text-6xl lg:text-7xl"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {letter}
                </motion.span>
              ))}
              {/* Gradient dot */}
              <motion.span
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                className="inline-block text-5xl font-black sm:text-6xl lg:text-7xl gradient-text"
              >
                .
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.35em] text-text-muted"
            >
              {TAGLINE}
            </motion.p>

            {/* Scanning line effect */}
            <motion.div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(155,92,255,0.6), transparent)",
              }}
              initial={{ top: "120%", opacity: 0 }}
              animate={{ top: "-20%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

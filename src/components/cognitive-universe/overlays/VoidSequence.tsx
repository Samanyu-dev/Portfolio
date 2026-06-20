"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUniverse } from "../UniverseProvider";

const SIGNAL_LINES = [
  { text: "UNKNOWN SIGNAL", delay: 0 },
  { text: "ORIGIN UNKNOWN", delay: 0.6 },
  { text: "SCANNING", delay: 1.2 },
  { text: "ESTABLISHING CONTEXT", delay: 1.8 }
];

export function VoidSequence() {
  const { state, dispatch, skipIntro, activateExploration } = useUniverse();
  const phase = state.introPhase;

  useEffect(() => {
    if (phase !== "void") return;
    const t1 = setTimeout(() => dispatch({ type: "SET_INTRO", payload: "signal" }), 1500);
    return () => clearTimeout(t1);
  }, [phase, dispatch]);

  useEffect(() => {
    if (phase !== "signal") return;
    const t2 = setTimeout(() => dispatch({ type: "SET_INTRO", payload: "awakening" }), 3200);
    return () => clearTimeout(t2);
  }, [phase, dispatch]);

  useEffect(() => {
    if (phase !== "awakening") return;
    const t3 = setTimeout(() => activateExploration(), 2800);
    return () => clearTimeout(t3);
  }, [phase, activateExploration]);

  useEffect(() => {
    if (phase === "ready") return;
    const onKey = () => skipIntro();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skipIntro]);

  if (phase === "ready") return null;

  return (
    <div
      className="cu-void fixed inset-0 z-[100] flex items-center justify-center bg-black"
      onClick={skipIntro}
      role="presentation"
    >
      <AnimatePresence mode="wait">
        {phase === "void" ? (
          <motion.div
            key="void"
            className="absolute inset-0 bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        ) : null}

        {phase === "signal" || phase === "awakening" ? (
          <motion.div
            key="signal"
            className="relative z-10 flex flex-col items-center gap-8 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className="cu-signal-point"
              animate={{
                scale: [1, 1.4, 1],
                boxShadow: [
                  "0 0 8px rgba(224,242,254,0.4)",
                  "0 0 40px rgba(99,102,241,0.9)",
                  "0 0 8px rgba(224,242,254,0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="flex flex-col items-center gap-3">
              {SIGNAL_LINES.map((line, i) => (
                <motion.p
                  key={line.text}
                  className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/50"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: phase === "signal" ? 1 : 0.35, y: 0 }}
                  transition={{ delay: line.delay, duration: 0.6 }}
                >
                  {line.text}
                  {phase === "signal" && i === SIGNAL_LINES.length - 1 ? (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  ) : null}
                </motion.p>
              ))}
            </div>

            {phase === "awakening" ? (
              <motion.p
                className="mt-4 max-w-sm text-center font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Memories emerging
              </motion.p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

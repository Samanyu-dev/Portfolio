"use client";

import { motion, AnimatePresence } from "motion/react";
import { ACT_LABELS } from "../types";
import { useUniverse } from "../UniverseProvider";
import { CLUSTER_LABELS } from "@/lib/cognitive-universe/build-graph";

const ACT_FRAGMENTS: Partial<Record<string, string[]>> = {
  memory: [
    "The website is building itself.",
    "Nothing was pre-made.",
    "Everything is emerging."
  ],
  knowledge: ["Each structure holds mass, gravity, and memory depth.", "Hover awakens. Click to enter."],
  autonomous: ["The universe moves without you.", "Signals propagate on their own."],
  architect: ["Recovered memory fragments detected.", "The architect remains indirect."],
  contact: ["Visitor recognized.", "Communication protocol available."]
};

export function NarrativeOverlay() {
  const { state, entities } = useUniverse();
  const act = state.act;
  const hovered = entities.find((e) => e.id === state.hoveredEntity);

  if (state.introPhase !== "ready" || state.selectedEntity) return null;

  const displayAct = act === "void" ? "knowledge" : act;
  const showAct = ["memory", "knowledge", "autonomous", "architect", "contact"].includes(displayAct);
  const fragments = ACT_FRAGMENTS[displayAct] ?? [];

  return (
    <div className="cu-narrative pointer-events-none fixed inset-0 z-20">
      <AnimatePresence mode="wait">
        {showAct ? (
          <motion.div
            key={displayAct}
            className="absolute left-6 top-24 sm:left-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
              Consciousness state
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-white/90 sm:text-2xl">
              {ACT_LABELS[displayAct]}
            </h2>
            <div className="mt-4 space-y-2">
              {fragments.map((line) => (
                <p key={line} className="max-w-xs text-sm text-white/45">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {displayAct === "memory" ? (
        <motion.div
          className="absolute bottom-32 left-6 right-6 flex flex-wrap justify-center gap-3 sm:left-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {CLUSTER_LABELS.map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/40"
            >
              {label}
            </span>
          ))}
        </motion.div>
      ) : null}

      {hovered ? (
        <motion.div
          className="absolute bottom-24 left-1/2 z-30 w-[min(90vw,380px)] -translate-x-1/2 rounded-xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
            {hovered.category}
          </p>
          <h3 className="mt-1 font-display text-lg text-white">{hovered.label}</h3>
          <p className="mt-2 line-clamp-2 text-xs text-white/55">{hovered.description}</p>
          <p className="mt-3 font-mono text-[10px] text-white/35">Click to enter memory</p>
        </motion.div>
      ) : null}

      <p className="absolute bottom-[min(42vh,320px)] left-1/2 max-w-md -translate-x-1/2 px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Drag to orbit · scroll for deeper layers · portfolio dock below
      </p>
    </div>
  );
}

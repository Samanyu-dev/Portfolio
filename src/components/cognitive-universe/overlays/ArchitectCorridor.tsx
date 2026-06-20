"use client";

import { motion } from "motion/react";
import { experienceNodes, education } from "@/data/profile";
import { useUniverse } from "../UniverseProvider";

export function ArchitectCorridor() {
  const { state } = useUniverse();

  if (state.selectedEntity) return null;
  if (state.act !== "architect" && state.scrollProgress < 0.65) return null;

  const memories = [
    ...experienceNodes.map((exp) => ({
      id: exp.id,
      type: "experience" as const,
      title: exp.role,
      org: exp.organization,
      fragment: exp.growthTheme,
      period: `${exp.start} — ${exp.end}`
    })),
    ...education.map((edu, i) => ({
      id: `edu-${i}`,
      type: "education" as const,
      title: edu.degree,
      org: edu.institution,
      fragment: edu.details,
      period: edu.period
    }))
  ];

  return (
    <section className="cu-architect relative z-30 px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-violet-400/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Act V — recovered memories
        </motion.p>
        <motion.h2
          className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The architect behind the universe
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Not an introduction. A discovery. Fragments of internships, research, and systems — assembled
          as memory corridors.
        </motion.p>

        <div className="mt-16 space-y-0">
          {memories.map((mem, i) => (
            <motion.article
              key={mem.id}
              className="cu-memory-branch relative border-l border-white/15 py-10 pl-8 sm:pl-12"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
            >
              <span className="absolute -left-[5px] top-12 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                {mem.type} · {mem.period}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">{mem.title}</h3>
              <p className="text-sm text-cyan-400/80">{mem.org}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{mem.fragment}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-12 font-display text-3xl text-white/20 sm:text-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          SAMANYU
        </motion.p>
      </div>
    </section>
  );
}

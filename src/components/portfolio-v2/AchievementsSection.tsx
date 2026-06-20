"use client";

import { motion } from "motion/react";
import { achievements } from "@/data/profile";
import { SectionIntro } from "./SectionIntro";

export function AchievementsSection() {
  return (
    <section id="research" className="scroll-mt-24 bg-bg-0 py-24 text-text-0 sm:py-32">
      <div className="site-container">
        <SectionIntro
          eyebrow="Research & recognition"
          title="Achievements"
          description="Hackathons, competitions, and milestones that shaped how I build."
        />

        <ul className="mt-12 space-y-4">
          {achievements.map((item, i) => (
            <motion.li
              key={item}
              className="flex gap-4 rounded-xl border border-line bg-card p-5 sm:p-6"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-a" />
              <p className="text-sm leading-relaxed text-text-1 sm:text-base">{item}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

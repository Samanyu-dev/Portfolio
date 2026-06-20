"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

const DarkHeroScene = dynamic(
  () => import("@/components/Hero/DarkHeroScene").then((m) => m.DarkHeroScene),
  { ssr: false }
);

type HeroSectionProps = {
  data: PortfolioIntelligence;
};

export function HeroSection({ data }: HeroSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-[#050508] text-white"
    >
      <div className="absolute inset-0 z-0 opacity-70">
        <DarkHeroScene />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050508]/30 via-transparent to-[#050508]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:px-10 lg:px-14">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-400/90"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {siteConfig.location}
        </motion.p>

        <div className="mt-6 overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-tight"
            initial={reduced ? false : { y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Samanyu Reddy Allipuram
          </motion.h1>
        </div>

        <motion.div
          className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <p className="text-lg text-white/90 sm:text-xl">AI Systems Engineer</p>
          <p className="text-lg text-white/70 sm:text-xl">Full Stack Engineer</p>
          <p className="text-lg text-white/55 sm:text-xl">Builder of Autonomous Systems</p>
        </motion.div>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {siteConfig.intro}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <Stat label="Public repos" value={data.github.publicRepos} />
          <Stat label="GitHub stars" value={data.github.totalStars} />
          <Stat label="Active builds" value={data.github.activeProjects} />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3b82f6]"
          >
            View projects <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
    </div>
  );
}

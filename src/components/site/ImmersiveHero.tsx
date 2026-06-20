"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BlurReveal } from "@/components/site/BlurReveal";
import { siteConfig } from "@/lib/site";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

type ImmersiveHeroProps = {
  data: PortfolioIntelligence;
};

export function ImmersiveHero({ data }: ImmersiveHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative -mx-4 flex min-h-[calc(100vh-5rem)] flex-col justify-end overflow-hidden px-4 pb-16 pt-24 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--brand-a) 28%, transparent), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, color-mix(in srgb, #6366f1 20%, transparent), transparent 60%), linear-gradient(180deg, color-mix(in srgb, var(--bg-0) 40%, transparent) 0%, var(--bg-0) 85%)"
        }}
      />

      {!reduced ? (
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-a), transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="relative z-10 max-w-4xl">
        <BlurReveal text="AI + FULL-STACK ENGINEER" className="eyebrow" />
        <motion.h1
          className="mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-text-0"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-logo text-[1.15em] text-text-0">Samanyu</span>
          <span className="block text-text-1 sm:inline sm:ml-2"> builds products that ship.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-1 sm:text-xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {siteConfig.intro}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-6 sm:gap-10"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Stat value={String(data.github.publicRepos)} label="Repos" />
          <Stat value={String(data.github.activeProjects)} label="Active" />
          <Stat value={`${data.github.totalStars}+`} label="Stars" />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <Link href="/projects" className="btn-primary">
            Enter project galaxy <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Connect
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#about-preview"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-text-2 transition hover:text-text-0"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to content"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-text-0 sm:text-4xl">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-2">{label}</p>
    </div>
  );
}

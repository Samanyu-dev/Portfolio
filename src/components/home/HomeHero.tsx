"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/Hero/Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-1" />
});

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function HomeHero() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <section className="panel relative min-h-[min(72vh,720px)] overflow-hidden p-6 sm:p-10">
        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-2">Portfolio</p>
          <h1 className="section-title mt-3 text-4xl font-semibold text-text-0 sm:text-5xl">{siteConfig.name}</h1>
          <p className="mt-4 text-base text-text-1">{siteConfig.headline}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel relative min-h-[min(78vh,760px)] overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70 dark:opacity-50">
        <HeroScene />
      </div>
      <div className="absolute inset-0 -z-[9] bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(99,242,212,0.14),transparent_38%)]" />
      <div className="absolute inset-0 -z-[8] bg-gradient-to-b from-bg-0/20 via-bg-0/55 to-bg-0" />

      <motion.div
        className="relative z-10 flex h-full min-h-[min(78vh,760px)] flex-col justify-end p-6 sm:p-10 lg:p-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.28em] text-text-2">
          AI + Full-Stack Engineer
        </motion.p>
        <motion.h1 variants={item} className="section-title mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] text-text-0 sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-text-1 sm:text-lg">
          {siteConfig.intro}
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-b px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-brand-a focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0"
          >
            View projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/experience"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-text-1 transition duration-200 hover:bg-white/10 hover:text-text-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a"
          >
            Experience
          </Link>
          <a
            href="/samanyu_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-text-1 transition duration-200 hover:bg-white/10 hover:text-text-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a"
          >
            Resume
            <Download className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

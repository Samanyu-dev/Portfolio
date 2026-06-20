"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site";
import { getProjectImageUrl } from "@/lib/project-image";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

type AwardLandingProps = {
  data: PortfolioIntelligence;
};

export function AwardLanding({ data }: AwardLandingProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "70%"]);

  const featured = data.projects.slice(0, 4);
  const techMarquee = [...data.techStackSummary.slice(0, 12).map((t) => t.name), "Next.js", "Three.js", "Python", "Flutter"];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div className="landing-root">
      {/* ─── HERO: full viewport ─── */}
      <section ref={ref} className="landing-hero relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-14">
        <div className="landing-grain" aria-hidden />
        {!reduced ? (
          <motion.div
            className="landing-orb pointer-events-none absolute h-[min(90vw,640px)] w-[min(90vw,640px)] rounded-full blur-[100px]"
            style={{ left: glowX, top: glowY, x: "-50%", y: "-50%" }}
          />
        ) : (
          <div className="landing-orb-static pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
        )}

        <div className="relative z-10 w-full max-w-[1400px]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="landing-pill">
              <Sparkles className="h-3.5 w-3.5" />
              Available for opportunities
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {siteConfig.location}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="landing-title font-display font-semibold tracking-[-0.04em] text-white"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <span className="block">Samanyu</span>
            </motion.h1>
            <motion.h1
              className="landing-title-outline font-display font-semibold tracking-[-0.04em]"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            >
              <span className="block">Allipuram</span>
            </motion.h1>
          </div>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
            initial={reduced ? false : { opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {siteConfig.headline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/projects" className="landing-cta-primary group">
              Enter 3D project galaxy
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/experience" className="landing-cta-ghost">
              Experience
            </Link>
            <Link href="/contact" className="landing-cta-ghost">
              Connect
            </Link>
          </motion.div>

          <motion.dl
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-lg"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">Repos</dt>
              <dd className="mt-1 font-display text-3xl text-white">{data.github.publicRepos}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">Stars</dt>
              <dd className="mt-1 font-display text-3xl text-white">{data.github.totalStars}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">Stack</dt>
              <dd className="mt-1 font-display text-3xl text-white">{data.techStackSummary.length}</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="border-y border-white/10 bg-black/40 py-5">
        <div className="landing-marquee flex gap-10 whitespace-nowrap">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span key={`${tech}-${i}`} className="font-mono text-sm uppercase tracking-[0.2em] text-white/50">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ─── FEATURED WORK ─── */}
      <section className="px-6 py-20 sm:px-10 lg:px-14">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400/80">Selected work</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Projects that ship</h2>
          </div>
          <Link href="/projects" className="landing-cta-ghost w-fit">
            View full galaxy <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={getProjectImageUrl(project)}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono text-[10px] text-cyan-400/90">#{project.rank}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{project.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-white/55">{project.description}</p>
              </div>
              <Link href={`/projects/${project.slug}`} className="absolute inset-0" aria-label={project.name} />
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className="mx-6 mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 px-8 py-16 sm:mx-10 lg:mx-14">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/50">Connect</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Let&apos;s build something award-worthy together.
        </h2>
        <Link href="/contact" className="landing-cta-primary mt-8 inline-flex">
          Start a conversation <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

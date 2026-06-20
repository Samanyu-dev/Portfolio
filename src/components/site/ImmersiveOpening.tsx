"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring
} from "motion/react";
import { siteConfig } from "@/lib/site";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

const DarkHeroScene = dynamic(
  () => import("@/components/Hero/DarkHeroScene").then((m) => m.DarkHeroScene),
  { ssr: false }
);

type ImmersiveOpeningProps = {
  data: PortfolioIntelligence;
};

const PILLARS = [
  {
    title: "AI Systems",
    body: "Autonomous agents, RAG pipelines, and production ML integrations that ship with observability."
  },
  {
    title: "Full-Stack",
    body: "Next.js platforms, APIs, and data layers engineered for scale, clarity, and speed."
  },
  {
    title: "Product Craft",
    body: "Cinematic interfaces, motion design, and tactile UX that feel premium on every device."
  }
];

export function ImmersiveOpening({ data }: ImmersiveOpeningProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.15], [0, -40]), {
    stiffness: 100,
    damping: 30
  });

  const techMarquee = [
    ...data.techStackSummary.slice(0, 14).map((t) => t.name),
    "TypeScript",
    "Python",
    "Flutter",
    "Three.js"
  ];

  return (
    <div ref={containerRef} className="opening-root">
      {/* ─── PANEL 1: Immersive hero + WebGL blob ─── */}
      <section className="opening-panel relative h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <DarkHeroScene />
        </div>
        <div className="opening-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 pt-32 sm:px-12 lg:px-16"
          style={
            reduced
              ? undefined
              : { opacity: heroOpacity, scale: heroScale, y: heroY }
          }
        >
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-400/90"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Samanyu · AI + Full-Stack Engineer
          </motion.p>

          <motion.div
            className="mt-6 overflow-hidden"
            style={reduced ? undefined : { y: titleY }}
          >
            <motion.h1
              className="opening-display font-display font-semibold text-white"
              initial={reduced ? false : { y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              Building the
            </motion.h1>
            <motion.h1
              className="opening-display-outline font-display font-semibold"
              initial={reduced ? false : { y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            >
              future of software
            </motion.h1>
          </motion.div>

          <motion.p
            className="mt-8 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
            initial={reduced ? false : { opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            {siteConfig.headline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            <Stat n={data.github.publicRepos} label="Repos" />
            <Stat n={data.github.totalStars} label="Stars" />
            <Stat n={data.techStackSummary.length} label="Technologies" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </section>

      {/* ─── PANEL 2: About (scroll reveal) ─── */}
      <section id="about" className="opening-panel relative min-h-[100dvh] px-6 py-28 sm:px-12 lg:px-16">
        <div className="opening-grain pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl">
          <ScrollReveal reduced={reduced}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/80">About</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
              Engineer with a designer&apos;s obsession for detail.
            </h2>
          </ScrollReveal>

          <ScrollReveal reduced={reduced} delay={0.1}>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl">
              {siteConfig.intro}
            </p>
          </ScrollReveal>

          <ScrollReveal reduced={reduced} delay={0.2}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/50">
              Based in {siteConfig.location}. I ship autonomous AI systems, cross-platform apps, and
              high-performance web experiences — from architecture to the last animation frame.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PANEL 3: Focus pillars ─── */}
      <section className="opening-panel relative px-6 py-24 sm:px-12 lg:px-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <ScrollReveal reduced={reduced}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">What I do</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Three lanes. One craft.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} reduced={reduced} delay={i * 0.08}>
                <article className="opening-card h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <span className="font-mono text-[10px] text-cyan-400/90">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{pillar.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal reduced={reduced} delay={0.15}>
            <div className="mt-16 flex flex-wrap gap-4">
              <Link href="/projects" className="opening-cta group">
                Explore projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/experience" className="opening-cta-ghost">
                View experience
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PANEL 4: Tech marquee (no projects / no connect block) ─── */}
      <section className="border-t border-white/10 py-8">
        <div className="opening-marquee flex gap-12 whitespace-nowrap">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-mono text-sm uppercase tracking-[0.22em] text-white/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{n}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
    </div>
  );
}

function ScrollReveal({
  children,
  reduced,
  delay = 0
}: {
  children: React.ReactNode;
  reduced: boolean | null;
  delay?: number;
}) {
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

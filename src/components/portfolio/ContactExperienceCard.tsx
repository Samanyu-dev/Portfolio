"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Copy, ExternalLink, GitBranch, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { PortfolioProfile } from "@/types/portfolio";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const emailAddress = "allipuramsamanyu@gmail.com";

export function ContactExperienceCard({ profile }: { profile: PortfolioProfile }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const socialLinks = useMemo(
    () => [
      { label: "GitHub", href: profile.githubUrl, icon: GitBranch },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/samanyu-reddy-allipuram", icon: BriefcaseBusiness },
      { label: "Email", href: `mailto:${emailAddress}`, icon: Mail }
    ],
    [profile.githubUrl]
  );

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (ripples.length === 0) return;
    const timeout = window.setTimeout(() => {
      setRipples((current) => current.slice(1));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [ripples]);

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: y * -10,
      rotateY: x * 12
    });
  };

  const addRipple = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipples((current) => [
      ...current,
      {
        id: Date.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    ]);
  };

  const handleCopyEmail = async (event: ReactMouseEvent<HTMLButtonElement>) => {
    addRipple(event);

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,32,0.82),rgba(5,8,22,0.96))] px-6 py-10 shadow-[0_30px_120px_rgba(2,6,23,0.5)] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.12),transparent_22%)]" />
      <div className="noise-layer absolute inset-0 opacity-20" />

      <div className="relative grid gap-10 xl:grid-cols-[0.44fr_0.56fr] xl:items-center">
        <div>
          <p className="eyebrow">Contact experience</p>
          <h2 className="section-title mt-4 max-w-3xl">
            The final card behaves like a product surface, not a plain contact block.
          </h2>
          <p className="section-copy mt-5 max-w-2xl">
            If you&apos;re building at the intersection of AI systems, product design, immersive interfaces, or mobile experiences,
            I&apos;m ready to talk.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">AI-first products</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Interactive frontends</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Mobile + backend systems</span>
          </div>
        </div>

        <motion.div
          onMouseMove={handlePointerMove}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: "preserve-3d"
          }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2.6rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.2),rgba(168,85,247,0.16),rgba(59,130,246,0.14))] blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.6rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_20px_100px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_28%)]" />

            <AnimatePresence>
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="pointer-events-none absolute h-3 w-3 rounded-full bg-cyan-200/60"
                  style={{ left: ripple.x, top: ripple.y }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 22, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.68, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Direct channel</p>
              <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">Samanyu</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
                Creative developer focused on AI systems, motion-led frontends, backend architecture, and app experiences that feel crafted.
              </p>
            </div>

            <div className="relative mt-8 rounded-[2rem] border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Primary email</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white sm:text-xl">{emailAddress}</p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/15"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={copied ? "copied" : "idle"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 text-sm text-slate-300"
                >
                  {copied ? "Email copied to clipboard." : "Use copy for a quick handoff, or open one of the live links below."}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel={link.label === "Email" ? undefined : "noreferrer"}
                    className="group rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-100">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500 transition group-hover:text-white" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">{link.label}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Copy, Check, Code2, Briefcase, Mail } from "lucide-react";
import type { PortfolioProfile } from "@/types/portfolio";

const EMAIL = "allipuramsamanyu@gmail.com";
const GITHUB_URL = "https://github.com/Samanyu-dev";
const LINKEDIN_URL = "https://www.linkedin.com/in/samanyu-reddy-allipuram/";

export function ContactScreen({ profile }: { profile: PortfolioProfile }) {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const socials = [
    { label: "GitHub", url: GITHUB_URL, icon: Code2, color: "text-neon-purple hover:bg-neon-purple/15", accent: "#9b5cff" },
    { label: "LinkedIn", url: LINKEDIN_URL, icon: Briefcase, color: "text-electric-blue hover:bg-electric-blue/15", accent: "#00d4ff" }
  ];

  return (
    <div className="relative flex flex-1 w-full items-center justify-center">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[20%] h-[350px] w-[350px] rounded-full bg-neon-purple/12 blur-[100px]" />
        <div className="absolute right-[20%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-electric-blue/10 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/25 bg-neon-purple/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-purple backdrop-blur-xl">
            <Mail className="h-3 w-3" /> Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-center text-3xl font-bold tracking-[-0.04em] text-text-primary sm:text-4xl"
        >
          Let&apos;s build something{" "}
          <span className="gradient-text">together</span>.
        </motion.h2>

        {/* 3D Tilt Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 w-full"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative overflow-hidden rounded-3xl border border-neon-purple/20 bg-bg-surface/80 shadow-glow-purple backdrop-blur-2xl"
          >
            {/* Glow edge */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: `radial-gradient(ellipse at ${50 + tilt.x * 3}% ${50 - tilt.y * 3}%, rgba(155,92,255,0.15), transparent 70%)`,
              }}
            />
            <div className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-40"
              style={{
                background: `linear-gradient(${135 + tilt.x * 2}deg, rgba(155,92,255,0.3), rgba(0,212,255,0.15), transparent 60%)`,
              }}
            />

            <div className="relative z-10 p-8 sm:p-10">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                {/* Left: info */}
                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                    />
                    <div>
                      <p className="text-lg font-bold text-text-primary">{profile.name}</p>
                      <p className="mt-0.5 text-sm text-neon-purple">Open to collaborate</p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-text-secondary">
                    {profile.bio} I respond fast — reach me through email or any link here.
                  </p>

                  {/* Email copy */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    data-cursor="interactive"
                    className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition-all hover:border-neon-purple/25 hover:bg-neon-purple/5"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">Email</p>
                      <p className="mt-1.5 text-sm font-semibold text-text-primary">{EMAIL}</p>
                    </div>
                    <motion.span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                        copied
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/10 text-text-muted group-hover:bg-neon-purple/15 group-hover:text-neon-purple"
                      }`}
                      animate={copied ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </button>
                </div>

                {/* Right: socials */}
                <div className="w-full sm:w-52">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-4">Connect</p>
                  <div className="space-y-2.5">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="interactive"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          className={`flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-medium transition-all ${social.color}`}
                        >
                          <Icon className="h-4 w-4" />
                          {social.label}
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { PortfolioData } from "@/types/portfolio";
import { experience } from "@/data/experience";

export function ExperienceScreen({ data }: { data: PortfolioData }) {
  return (
    <div className="relative flex flex-1 w-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="relative z-10 px-6 pt-6 sm:px-10 lg:px-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-magenta/25 bg-accent-magenta/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-magenta backdrop-blur-xl">
          About / Experience
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-text-primary sm:text-3xl lg:text-4xl">
          Journey & Impact
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4 sm:px-10 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr]">
          {/* Left: Profile */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-bg-surface/70 p-6 backdrop-blur-xl"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">Profile</p>
              <h3 className="mt-2 text-xl font-black text-text-primary">{data.profile.name}</h3>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{data.profile.bio}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: "Repos", value: `${data.profile.publicRepos}+` },
                  { label: "Followers", value: `${data.profile.followers}` },
                  { label: "Years", value: `${data.metrics.activeYears}+` },
                  { label: "Featured", value: `${data.metrics.totalFeatured}` }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center"
                  >
                    <p className="text-lg font-bold gradient-text">{stat.value}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-bg-surface/70 p-5 backdrop-blur-xl"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">Core strengths</p>
              <div className="mt-3 space-y-2">
                {[
                  { title: "Product-led engineering", desc: "Systems designed to feel like products, not prototypes." },
                  { title: "Cross-domain fluency", desc: "AI, mobile, backend, and web in one workflow." },
                  { title: "Interface-first thinking", desc: "Motion and polish are foundations, not afterthoughts." }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:bg-white/[0.04]">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-neon-purple" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-0.5 text-[11px] leading-4 text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Timeline Branch */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted mb-4">Experience timeline</p>

            <div className="relative">
              {/* Main vertical line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-purple/50 via-electric-blue/30 to-accent-magenta/20" />

              <div className="space-y-1">
                {experience.map((exp, i) => (
                  <motion.div
                    key={`${exp.company}-${exp.role}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Node on the line */}
                    <div className="absolute left-[11px] top-5 z-10">
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute -inset-1.5 rounded-full"
                        style={{ background: i === 0 ? "rgba(155,92,255,0.25)" : "rgba(155,92,255,0.1)" }}
                        animate={i === 0 ? { scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Node dot */}
                      <div
                        className="relative h-[14px] w-[14px] rounded-full border-2"
                        style={{
                          borderColor: i === 0 ? "#9b5cff" : i === 1 ? "#00d4ff" : i === 2 ? "#ff3cac" : "#6b6690",
                          background: i === 0 ? "#9b5cff" : "transparent"
                        }}
                      />
                    </div>

                    {/* Branch connector — horizontal line from the node */}
                    <div
                      className="absolute left-[25px] top-[26px] h-[2px] w-6"
                      style={{
                        background: i === 0 ? "#9b5cff" : i === 1 ? "#00d4ff" : i === 2 ? "#ff3cac" : "rgba(107,102,144,0.3)"
                      }}
                    />

                    {/* Card */}
                    <div className="group rounded-xl border border-white/10 bg-bg-surface/60 p-4 backdrop-blur-xl transition-all hover:border-neon-purple/25 hover:bg-bg-surface/80 hover:shadow-[0_0_30px_rgba(155,92,255,0.08)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-text-primary">{exp.role}</h4>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className="text-xs font-semibold"
                              style={{ color: i === 0 ? "#9b5cff" : i === 1 ? "#00d4ff" : i === 2 ? "#ff3cac" : "#a09cbf" }}
                            >
                              {exp.company}
                            </span>
                            <span className="text-text-muted">·</span>
                            <span className="text-[10px] text-text-muted">{exp.location}</span>
                          </div>
                        </div>
                        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] text-text-muted">
                          {exp.period}
                        </div>
                      </div>

                      <ul className="mt-3 space-y-1">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[11px] leading-4 text-text-secondary">
                            <span
                              className="mt-1 h-1 w-1 shrink-0 rounded-full"
                              style={{ background: i === 0 ? "#9b5cff" : i === 1 ? "#00d4ff" : i === 2 ? "#ff3cac" : "#6b6690" }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* End node */}
                <div className="relative pl-12">
                  <div className="absolute left-[14px] top-2">
                    <div className="h-2.5 w-2.5 rounded-full border-2 border-text-muted/30" />
                  </div>
                  <p className="py-2 text-[10px] text-text-muted italic">The journey continues...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

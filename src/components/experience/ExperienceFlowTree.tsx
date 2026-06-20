"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ExperienceNode } from "@/types/portfolio-v2";

type ExperienceFlowTreeProps = {
  items: ExperienceNode[];
};

export function ExperienceFlowTree({ items }: ExperienceFlowTreeProps) {
  const [activeId, setActiveId] = useState(items.at(-1)?.id ?? items[0]?.id);

  const ordered = useMemo(
    () =>
      [...items].sort((a, b) => {
        const left = new Date(`${a.start}-01`).getTime();
        const right = new Date(`${b.start}-01`).getTime();
        return left - right;
      }),
    [items]
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="panel overflow-hidden p-4 sm:p-6">
        <svg viewBox="0 0 860 1120" className="h-[680px] w-full" role="img" aria-label="Career growth network">
          <defs>
            <linearGradient id="line-gradient" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(123,223,246,0.35)" />
              <stop offset="100%" stopColor="rgba(79,140,255,0.9)" />
            </linearGradient>
          </defs>

          {ordered.map((item, index) => {
            const y = 130 + index * 200;
            const nodeX = index % 2 === 0 ? 220 : 640;
            const growthX = 430;

            const next = ordered[index + 1];
            const nextY = 130 + (index + 1) * 200;
            const nextNodeX = (index + 1) % 2 === 0 ? 220 : 640;

            return (
              <g key={item.id}>
                <motion.path
                  d={`M ${growthX} ${y + 40} C ${growthX} ${y + 90} ${growthX} ${y + 110} ${next ? growthX : growthX} ${next ? nextY - 40 : y + 40}`}
                  stroke="url(#line-gradient)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0, opacity: 0.45 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, delay: index * 0.08 }}
                />

                <motion.path
                  d={`M ${nodeX} ${y} C ${nodeX + (nodeX < growthX ? 80 : -80)} ${y} ${growthX - (nodeX < growthX ? 60 : -60)} ${y + 18} ${growthX} ${y + 18}`}
                  stroke="rgba(123,223,246,0.62)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                />

                {next ? (
                  <motion.path
                    d={`M ${growthX} ${y + 30} C ${growthX + (nextNodeX > growthX ? 80 : -80)} ${y + 60} ${nextNodeX - (nextNodeX > growthX ? 60 : -60)} ${nextY - 20} ${nextNodeX} ${nextY}`}
                    stroke="rgba(79,140,255,0.52)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.12 }}
                  />
                ) : null}

                <g>
                  <circle cx={growthX} cy={y + 18} r={16} fill="rgba(99,242,212,0.16)" stroke="rgba(99,242,212,0.8)" />
                  <text x={growthX} y={y + 22} textAnchor="middle" fontSize="9" fill="rgba(218,248,244,0.94)">
                    Growth
                  </text>
                </g>

                <g
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveId(item.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x={nodeX - 150}
                    y={y - 52}
                    rx={22}
                    ry={22}
                    width={300}
                    height={110}
                    fill={activeId === item.id ? "rgba(79,140,255,0.27)" : "rgba(10,20,34,0.62)"}
                    stroke={activeId === item.id ? "rgba(123,223,246,0.95)" : "rgba(146,167,202,0.34)"}
                  />
                  <text x={nodeX - 128} y={y - 14} fontSize="14" fontWeight={700} fill="rgba(248,251,255,0.96)">
                    {item.role}
                  </text>
                  <text x={nodeX - 128} y={y + 8} fontSize="12" fill="rgba(200,216,241,0.92)">
                    {item.organization}
                  </text>
                  <text x={nodeX - 128} y={y + 28} fontSize="11" fill="rgba(142,164,200,0.92)">
                    {formatPeriod(item.start, item.end)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <aside className="space-y-4">
        {ordered.map((item) => {
          const active = item.id === activeId;
          return (
            <section
              key={`details-${item.id}`}
              className={`rounded-2xl border p-4 transition ${
                active ? "border-brand-a/60 bg-white/10" : "border-white/10 bg-black/15"
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-2">{item.growthTheme}</p>
              <h3 className="mt-2 text-lg font-semibold text-text-0">{item.role}</h3>
              <p className="text-sm text-text-1">{item.organization} · {item.location}</p>
              <p className="mt-1 text-xs text-text-2">{formatPeriod(item.start, item.end)}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span key={tech} className="metric-chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm text-text-1">
                {item.responsibilities.slice(0, 2).map((point) => (
                  <p key={point}>• {point}</p>
                ))}
                {item.achievements.slice(0, 1).map((point) => (
                  <p key={point} className="text-text-0">• {point}</p>
                ))}
              </div>
            </section>
          );
        })}
      </aside>
    </div>
  );
}

function formatPeriod(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
  const startDate = new Date(`${start}-01`);
  const endDate = new Date(`${end}-01`);
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

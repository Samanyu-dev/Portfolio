"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { config } from "@/config-v3";
import "./styles/RadialCarousel.css";
const FloatingModel = dynamic(() => import("./FloatingModel"), { ssr: false });

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
const COLORS = ["rgba(255,255,255,.06)", "rgba(255,127,80,.3)", "rgba(255,127,80,.5)", "rgba(255,127,80,.75)", "#ff7f50"];

// Third-party read-only proxy of GitHub's contribution graph (no token needed).
const GithubHeatmap = () => {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${config.social.github}?y=last`)
      .then((r) => r.json())
      .then((d) => { setDays(d.contributions); setTotal(Object.values<number>(d.total ?? {}).reduce((a, b) => a + b, 0)); })
      .catch(() => setDays([]));
  }, []);
  if (days && days.length === 0) return null;
  const weeks: Day[][] = [];
  (days ?? []).forEach((d, i) => { if (i % 7 === 0) weeks.push([]); weeks[weeks.length - 1].push(d); });
  return (
    <section id="github" style={{ background: "#0b080c", padding: "80px 5vw", position: "relative", zIndex: 10 }}>
      <FloatingModel src="/models/3d/globe.glb" scale={0.9} />
      <h2 style={{ color: "#fff", fontSize: "clamp(30px,4vw,48px)", fontWeight: 500, textAlign: "center", marginBottom: 8 }}>
        Code <span style={{ fontFamily: "var(--font-allura)", color: "var(--primary)", fontWeight: 400 }}>Activity</span>
      </h2>
      <p style={{ color: "#9ca3af", textAlign: "center", marginBottom: 32 }}>{total ? `${total} contributions in the last year` : "Loading…"}</p>
      <div style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {w.map((d) => (
                <div key={d.date} title={`${d.count} on ${d.date}`} style={{ width: 12, height: 12, borderRadius: 3, background: COLORS[d.level] }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GithubHeatmap;

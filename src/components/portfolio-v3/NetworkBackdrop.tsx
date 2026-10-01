"use client";
import { useEffect, useRef } from "react";

// Fixed dark backdrop: a drifting node graph with data pulses (AI / backend / markets feel).
// Matches the Skills section's dark + coral glow; honours prefers-reduced-motion.
const NetworkBackdrop = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, scroll = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const N = window.innerWidth < 768 ? 28 : 60;
    type Node = { x: number; y: number; vx: number; vy: number; z: number };
    const nodes: Node[] = [];
    const pulses: { a: number; b: number; t: number }[] = [];
    const resize = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    for (let i = 0; i < N; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, z: .4 + Math.random() * .8 });
    const onScroll = () => { scroll = window.scrollY; };
    const L = 170;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * .5, h * .45, 0, w * .5, h * .45, Math.max(w, h) * .7);
      g.addColorStop(0, "rgba(255,127,80,.10)"); g.addColorStop(.6, "rgba(123,47,247,.05)"); g.addColorStop(1, "rgba(11,8,12,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const py = (n: Node) => ((n.y - scroll * .08 * n.z) % h + h) % h; // parallax with scroll
      for (const n of nodes) { if (!still) { n.x += n.vx; n.y += n.vy; } if (n.x < 0 || n.x > w) n.vx *= -1; }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, py(a) - py(b));
        if (d < L) { ctx.strokeStyle = `rgba(255,170,140,${(1 - d / L) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, py(a)); ctx.lineTo(b.x, py(b)); ctx.stroke();
          if (!still && pulses.length < 14 && Math.random() < .0008) pulses.push({ a: i, b: j, t: 0 }); }
      }
      for (const n of nodes) { ctx.fillStyle = `rgba(255,190,160,${.35 * n.z})`; ctx.beginPath(); ctx.arc(n.x, py(n), 1.6 * n.z, 0, 7); ctx.fill(); }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]; p.t += .012; const a = nodes[p.a], b = nodes[p.b];
        if (p.t >= 1 || Math.hypot(a.x - b.x, py(a) - py(b)) > L) { pulses.splice(k, 1); continue; }
        const x = a.x + (b.x - a.x) * p.t, y = py(a) + (py(b) - py(a)) * p.t;
        ctx.fillStyle = "rgba(255,230,120,.9)"; ctx.shadowColor = "#ffb15c"; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <canvas ref={ref} className="net-bg" aria-hidden />;
};
export default NetworkBackdrop;

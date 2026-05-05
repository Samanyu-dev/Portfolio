"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 160, damping: 16, mass: 0.2 });
  const ringY = useSpring(dotY, { stiffness: 160, damping: 16, mass: 0.2 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const media = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();
    media.addEventListener("change", updateEnabled);

    const move = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };

    const updateHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHoveringInteractive(
        Boolean(target?.closest("a, button, input, textarea, select, [data-cursor='interactive']"))
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateHover);
    return () => {
      media.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHover);
    };
  }, [dotX, dotY, prefersReducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor-enabled", enabled);
    return () => document.documentElement.classList.remove("custom-cursor-enabled");
  }, [enabled]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] h-2 w-2 rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          marginLeft: -4,
          marginTop: -4,
          background: "#9b5cff"
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] h-9 w-9 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          marginLeft: -18,
          marginTop: -18,
          border: "1.5px solid rgba(155, 92, 255, 0.6)"
        }}
        animate={{
          scale: hoveringInteractive ? 1.6 : 1,
          borderColor: hoveringInteractive
            ? "rgba(0, 212, 255, 0.9)"
            : "rgba(155, 92, 255, 0.6)",
          backgroundColor: hoveringInteractive
            ? "rgba(155, 92, 255, 0.08)"
            : "rgba(155, 92, 255, 0)"
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </>
  );
}

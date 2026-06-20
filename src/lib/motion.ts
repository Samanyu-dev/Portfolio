"use client";

import { useReducedMotion } from "motion/react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export function useMotionSafe() {
  const reduced = useReducedMotion();
  return {
    reduced: Boolean(reduced),
    transition: reduced ? { duration: 0 } : { duration: 0.28, ease: easeOut },
    viewport: { once: true, margin: "-80px" as const }
  };
}

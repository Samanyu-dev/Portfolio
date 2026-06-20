"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export function ImmersivePageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div id="main-content">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[120] origin-bottom bg-brand-b"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[119] bg-bg-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        />
        <motion.div
          id="main-content"
          initial={{ opacity: 0, y: 48, scale: 0.985, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, scale: 0.99, filter: "blur(8px)" }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

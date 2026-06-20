"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type PageTransitionProps = PropsWithChildren & {
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <main id="main-content" className={cn(className)}>
        {children}
      </main>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        key={pathname}
        className={cn(className)}
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

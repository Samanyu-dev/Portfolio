"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

type StaggerProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  stagger?: number;
}>;

export function StaggerContainer({ children, className, delay = 0, stagger = 0.08 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: prefersReducedMotion ? 0 : stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export const Stagger = StaggerContainer;

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

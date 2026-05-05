"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  direction?: "up" | "down";
}>;

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : direction === "up" ? 40 : -40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

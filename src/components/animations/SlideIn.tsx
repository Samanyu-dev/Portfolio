"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

type SlideInProps = PropsWithChildren<{
  className?: string;
  direction?: "left" | "right";
  delay?: number;
}>;

export function SlideIn({ children, className, direction = "left", delay = 0 }: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : direction === "left" ? -56 : 56
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }
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

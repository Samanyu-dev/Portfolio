"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { animationConfig } from "@/lib/animation-config";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrapper component that adds scroll-triggered animations to sections
 * Enters with fade and scale when scrolled into view
 */
export function ScrollSection({ children, className = "", delay = 0 }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ...animationConfig.transitions.smooth,
        delay
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Creates a staggered animation effect for child elements
 */
export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const containerVariants = animationConfig.staggerContainer.container as any; // eslint-disable-line
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item for use within StaggerContainer
 */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      transition={animationConfig.transitions.smooth}
    >
      {children}
    </motion.div>
  );
}

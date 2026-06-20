'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NodeTooltipProps {
  label: string;
  description: string;
  x: number;
  y: number;
}

export default function NodeTooltip({ label, description, x, y }: NodeTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* Text scramble effect on mount */
  useEffect(() => {
    if (!ref.current) return;
    const labelEl = ref.current.querySelector('.node-tooltip-label') as HTMLElement;
    if (!labelEl) return;

    const final = label;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_';
    let iteration = 0;

    const interval = setInterval(() => {
      labelEl.textContent = final
        .split('')
        .map((char, i) => {
          if (i < iteration) return final[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration += 1 / 2;
      if (iteration >= final.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [label]);

  return (
    <motion.div
      ref={ref}
      className="node-tooltip"
      style={{ left: x, top: y - 20 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="node-tooltip-label">{label}</div>
      <div className="node-tooltip-desc">{description}</div>
    </motion.div>
  );
}

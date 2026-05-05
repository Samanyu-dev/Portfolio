"use client";

import { useEffect, useState } from "react";

export function useCounter(target: number, active: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let animationFrame = 0;
    const startedAt = performance.now();
    const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(target * easeOut(progress)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [active, duration, target]);

  return count;
}

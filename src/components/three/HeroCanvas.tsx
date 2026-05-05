"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useIsLowPowerDevice } from "@/hooks/useIsLowPowerDevice";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />
});

export function HeroCanvas() {
  const isLowPower = useIsLowPowerDevice();
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  if (isLowPower || prefersReducedMotion) {
    return <HeroFallback />;
  }

  return (
    <div ref={ref} className="absolute inset-0">
      {inView ? <HeroScene /> : <HeroFallback />}
    </div>
  );
}

function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-10 top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-12 left-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="noise-layer absolute inset-0 opacity-30" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { actFormation, progressToAct } from "../types";
import { useUniverse } from "../UniverseProvider";

gsap.registerPlugin(ScrollTrigger);

export function useScrollConsciousness(scrollRef: React.RefObject<HTMLElement | null>) {
  const { state, dispatch } = useUniverse();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (state.introPhase !== "ready" || !scrollRef.current) return;

    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      touchMultiplier: 1.2
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    dispatch({
      type: "SET_SCROLL",
      payload: { progress: 0, act: "knowledge", formation: 1 }
    });

    const trigger = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        dispatch({
          type: "SET_SCROLL",
          payload: {
            progress,
            act: progressToAct(progress),
            formation: Math.max(1, actFormation(progress))
          }
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [state.introPhase, scrollRef, dispatch]);

  return lenisRef;
}

"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import type { UniverseExperienceProps } from "./types";
import { UniverseProvider, useUniverse } from "./UniverseProvider";
import { UniverseScene } from "./scene/UniverseScene";
import { VoidSequence } from "./overlays/VoidSequence";
import { NarrativeOverlay } from "./overlays/NarrativeOverlay";
import { PortfolioDock } from "./overlays/PortfolioDock";
import { ArchitectCorridor } from "./overlays/ArchitectCorridor";
import { ContactProtocol } from "./overlays/ContactProtocol";
import { UniverseHUD } from "./overlays/UniverseHUD";
import { UniverseAudio } from "./audio/UniverseAudio";
import { ProjectDream } from "./project-worlds/ProjectDream";
import { useScrollConsciousness } from "./hooks/useScrollConsciousness";

function UniverseInner() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state } = useUniverse();
  useScrollConsciousness(scrollRef);

  const scrollEnabled = state.introPhase === "ready" && !state.selectedEntity;

  return (
    <div className="cu-root relative min-h-screen bg-black text-white">
      <UniverseScene />
      <UniverseHUD />
      <UniverseAudio />
      <VoidSequence />

      <NarrativeOverlay />
      <PortfolioDock />

      <div
        ref={scrollRef}
        className={`cu-scroll relative z-[5] ${scrollEnabled ? "pointer-events-none" : "pointer-events-none overflow-hidden"}`}
        style={{ height: scrollEnabled ? "500vh" : "100vh" }}
        aria-hidden={!scrollEnabled}
      >
        <ArchitectCorridor />
        <ContactProtocol />
      </div>

      <AnimatePresence>{state.selectedEntity ? <ProjectDream /> : null}</AnimatePresence>
    </div>
  );
}

function UniverseInit({ data }: UniverseExperienceProps) {
  const { dispatch } = useUniverse();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    dispatch({ type: "SET_REDUCED", payload: mq.matches });
    if (mq.matches) {
      dispatch({ type: "SET_INTRO", payload: "ready" });
    }
    const handler = (e: MediaQueryListEvent) => {
      dispatch({ type: "SET_REDUCED", payload: e.matches });
      if (e.matches) dispatch({ type: "SET_INTRO", payload: "ready" });
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [dispatch]);

  return <UniverseInner />;
}

export function CognitiveUniverseExperience({ data }: UniverseExperienceProps) {
  return (
    <UniverseProvider data={data}>
      <UniverseInit data={data} />
    </UniverseProvider>
  );
}

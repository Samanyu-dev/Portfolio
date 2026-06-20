"use client";

import { Volume2, VolumeX, SkipForward } from "lucide-react";
import { useUniverse } from "../UniverseProvider";
import { ACT_LABELS } from "../types";

export function UniverseHUD() {
  const { state, dispatch, skipIntro } = useUniverse();

  return (
    <div className="cu-hud fixed right-4 top-4 z-[110] flex items-center gap-2 sm:right-6 sm:top-6">
      {state.introPhase !== "ready" ? (
        <button
          type="button"
          onClick={skipIntro}
          className="cu-hud-btn flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-md transition hover:text-white"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Enter
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
        className="cu-hud-btn flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/60 backdrop-blur-md transition hover:text-white"
        aria-label={state.soundEnabled ? "Mute universe" : "Enable ambient sound"}
      >
        {state.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>

      {state.introPhase === "ready" && !state.selectedEntity ? (
        <span className="hidden rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/40 backdrop-blur-md sm:inline">
          {ACT_LABELS[state.act]}
        </span>
      ) : null}
    </div>
  );
}

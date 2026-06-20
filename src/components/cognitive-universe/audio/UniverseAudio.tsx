"use client";

import { useEffect, useRef } from "react";
import { useUniverse } from "../UniverseProvider";

export function UniverseAudio() {
  const { state } = useUniverse();
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!state.soundEnabled) {
      oscRef.current?.stop();
      oscRef.current = null;
      ctxRef.current?.close();
      ctxRef.current = null;
      return;
    }

    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 55;
    gain.gain.value = 0.018;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;

    return () => {
      osc.stop();
      ctx.close();
    };
  }, [state.soundEnabled]);

  useEffect(() => {
    if (!gainRef.current || !ctxRef.current) return;
    const pulse =
      state.act === "autonomous" ? 0.028 : state.act === "knowledge" ? 0.022 : 0.018;
    gainRef.current.gain.setTargetAtTime(pulse, ctxRef.current.currentTime, 0.4);
  }, [state.act]);

  return null;
}

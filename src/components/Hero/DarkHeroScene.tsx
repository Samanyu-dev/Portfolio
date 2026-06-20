"use client";

import { Scene } from "./Scene";

/** WebGL blob backdrop tuned for dark portfolio hero */
export function DarkHeroScene() {
  return (
    <div className="h-full w-full bg-[#050508]">
      <Scene dark />
    </div>
  );
}

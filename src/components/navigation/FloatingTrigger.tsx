'use client';

import React from 'react';
import { useWorld } from '@/lib/WorldProvider';

export default function FloatingTrigger() {
  const { toggleCommandPalette, state } = useWorld();

  if (!state.bootComplete || state.commandPaletteOpen) return null;

  return (
    <button
      className="floating-trigger"
      onClick={toggleCommandPalette}
      aria-label="Open command palette (press / key)"
      title="Press / to navigate"
    >
      /
    </button>
  );
}

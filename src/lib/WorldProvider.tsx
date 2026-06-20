'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { WorldState, WorldAction, WorldId, PerformanceTier } from '@/types/portfolio';

const initialState: WorldState = {
  currentWorld: 'cognition',
  previousWorld: null,
  transitionState: 'idle',
  performanceTier: 'high',
  commandPaletteOpen: false,
  soundEnabled: false,
  bootComplete: false,
  reducedMotion: false,
};

function worldReducer(state: WorldState, action: WorldAction): WorldState {
  switch (action.type) {
    case 'SET_WORLD':
      return {
        ...state,
        previousWorld: state.currentWorld,
        currentWorld: action.payload,
      };
    case 'SET_TRANSITION':
      return { ...state, transitionState: action.payload };
    case 'TOGGLE_COMMAND_PALETTE':
      return { ...state, commandPaletteOpen: !state.commandPaletteOpen };
    case 'SET_COMMAND_PALETTE':
      return { ...state, commandPaletteOpen: action.payload };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'COMPLETE_BOOT':
      return { ...state, bootComplete: true };
    case 'SET_PERFORMANCE':
      return { ...state, performanceTier: action.payload };
    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.payload };
    default:
      return state;
  }
}

interface WorldContextValue {
  state: WorldState;
  dispatch: React.Dispatch<WorldAction>;
  navigateToWorld: (world: WorldId) => void;
  toggleCommandPalette: () => void;
}

const WorldContext = createContext<WorldContextValue | null>(null);

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(worldReducer, initialState);

  /* Detect reduced motion preference */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    dispatch({ type: 'SET_REDUCED_MOTION', payload: mq.matches });
    const handler = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Detect performance tier */
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const memory = (navigator as any).deviceMemory as number || 4;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    let tier: PerformanceTier = 'high';
    if (!isMobile && cores >= 8 && memory >= 8) tier = 'ultra';
    else if (cores >= 4 && memory >= 4) tier = 'high';
    else if (cores >= 2) tier = 'medium';
    else tier = 'low';

    dispatch({ type: 'SET_PERFORMANCE', payload: tier });
  }, []);

  const navigateToWorld = useCallback((world: WorldId) => {
    if (world === state.currentWorld) return;
    dispatch({ type: 'SET_TRANSITION', payload: 'exiting' });
    
    /* Allow exit animation to play */
    setTimeout(() => {
      dispatch({ type: 'SET_WORLD', payload: world });
      dispatch({ type: 'SET_TRANSITION', payload: 'entering' });
      
      setTimeout(() => {
        dispatch({ type: 'SET_TRANSITION', payload: 'idle' });
      }, 800);
    }, 600);
  }, [state.currentWorld]);

  const toggleCommandPalette = useCallback(() => {
    dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
  }, []);

  return (
    <WorldContext.Provider value={{ state, dispatch, navigateToWorld, toggleCommandPalette }}>
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used within WorldProvider');
  return ctx;
}

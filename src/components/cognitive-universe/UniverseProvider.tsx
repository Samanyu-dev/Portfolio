"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode
} from "react";
import type { ConsciousnessAct, UniverseEntity } from "./types";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";
import { buildUniverseGraph } from "@/lib/cognitive-universe/build-graph";

type IntroPhase = "void" | "signal" | "awakening" | "ready";

type UniverseState = {
  introPhase: IntroPhase;
  scrollProgress: number;
  act: ConsciousnessAct;
  formation: number;
  hoveredEntity: string | null;
  selectedEntity: string | null;
  soundEnabled: boolean;
  reducedMotion: boolean;
};

type Action =
  | { type: "SET_INTRO"; payload: IntroPhase }
  | { type: "SET_SCROLL"; payload: { progress: number; act: ConsciousnessAct; formation: number } }
  | { type: "HOVER"; payload: string | null }
  | { type: "SELECT"; payload: string | null }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_REDUCED"; payload: boolean };

const initial: UniverseState = {
  introPhase: "void",
  scrollProgress: 0,
  act: "void",
  formation: 0,
  hoveredEntity: null,
  selectedEntity: null,
  soundEnabled: false,
  reducedMotion: false
};

function reducer(state: UniverseState, action: Action): UniverseState {
  switch (action.type) {
    case "SET_INTRO":
      return { ...state, introPhase: action.payload };
    case "SET_SCROLL":
      return {
        ...state,
        scrollProgress: action.payload.progress,
        act: action.payload.act,
        formation: action.payload.formation
      };
    case "HOVER":
      return { ...state, hoveredEntity: action.payload };
    case "SELECT":
      return { ...state, selectedEntity: action.payload };
    case "TOGGLE_SOUND":
      return { ...state, soundEnabled: !state.soundEnabled };
    case "SET_REDUCED":
      return { ...state, reducedMotion: action.payload };
    default:
      return state;
  }
}

type UniverseContextValue = {
  state: UniverseState;
  entities: UniverseEntity[];
  data: PortfolioIntelligence;
  dispatch: React.Dispatch<Action>;
  enterProject: (id: string) => void;
  exitProject: () => void;
  skipIntro: () => void;
  activateExploration: () => void;
};

const UniverseContext = createContext<UniverseContextValue | null>(null);

export function UniverseProvider({
  data,
  children
}: {
  data: PortfolioIntelligence;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initial);
  const entities = useMemo(() => buildUniverseGraph(data), [data]);

  const enterProject = useCallback((id: string) => {
    dispatch({ type: "SELECT", payload: id });
  }, []);

  const exitProject = useCallback(() => {
    dispatch({ type: "SELECT", payload: null });
  }, []);

  const activateExploration = useCallback(() => {
    dispatch({ type: "SET_INTRO", payload: "ready" });
    dispatch({
      type: "SET_SCROLL",
      payload: { progress: 0, act: "knowledge", formation: 1 }
    });
  }, []);

  const skipIntro = useCallback(() => {
    activateExploration();
  }, [activateExploration]);

  const value = useMemo(
    () => ({
      state,
      entities,
      data,
      dispatch,
      enterProject,
      exitProject,
      skipIntro,
      activateExploration
    }),
    [state, entities, data, enterProject, exitProject, skipIntro, activateExploration]
  );

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error("useUniverse must be used within UniverseProvider");
  return ctx;
}

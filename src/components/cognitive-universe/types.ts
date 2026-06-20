import type { PortfolioIntelligence, PortfolioProject } from "@/types/portfolio-v2";

export type ConsciousnessAct =
  | "void"
  | "signal"
  | "awakening"
  | "memory"
  | "knowledge"
  | "autonomous"
  | "architect"
  | "contact";

export type UniverseEntity = {
  id: string;
  label: string;
  slug: string;
  category: string;
  color: string;
  position: [number, number, number];
  mass: number;
  influence: number;
  connections: string[];
  description: string;
  project: PortfolioProject;
  memoryDepth: number;
};

export type UniverseExperienceProps = {
  data: PortfolioIntelligence;
};

export type FragmentLine = {
  id: string;
  text: string;
  delay: number;
};

export const ACT_LABELS: Record<ConsciousnessAct, string> = {
  void: "THE VOID",
  signal: "FIRST SIGNAL",
  awakening: "AWAKENING",
  memory: "MEMORY FORMATION",
  knowledge: "KNOWLEDGE NETWORK",
  autonomous: "AUTONOMOUS SYSTEMS",
  architect: "THE ARCHITECT",
  contact: "CONTACT PROTOCOL"
};

export function progressToAct(progress: number): ConsciousnessAct {
  if (progress < 0.38) return "memory";
  if (progress < 0.58) return "knowledge";
  if (progress < 0.72) return "autonomous";
  if (progress < 0.88) return "architect";
  return "contact";
}

export function actFormation(progress: number): number {
  if (progress < 0.05) return 0;
  if (progress < 0.35) return (progress - 0.05) / 0.3;
  return 1;
}

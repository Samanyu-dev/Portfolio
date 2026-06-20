import type { PortfolioIntelligence } from "@/types/portfolio-v2";
import type { UniverseEntity } from "@/components/cognitive-universe/types";

const CATEGORY_COLORS: Record<string, string> = {
  "AI Systems": "#8b5cf6",
  "Full Stack": "#06b6d4",
  "Frontend Experience": "#38bdf8",
  Mobile: "#10b981",
  "Backend & Infra": "#f59e0b",
  Research: "#ec4899"
};

const FLAGSHIP_SLUGS = new Set([
  "codeforge",
  "oracle-agent",
  "aether",
  "gitinsights",
  "voice-khata",
  "crisis-communication-environment",
  "network-intelligence",
  "stepsai"
]);

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h << 5) - h + slug.charCodeAt(i);
  return Math.abs(h);
}

function spherePosition(index: number, total: number, radius: number): [number, number, number] {
  if (total <= 1) return [0, 0, 0];
  const golden = (1 + Math.sqrt(5)) / 2;
  const y = 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = (2 * Math.PI * index) / golden;
  return [Math.cos(theta) * r * radius, y * radius * 0.85, Math.sin(theta) * r * radius];
}

export function buildUniverseGraph(data: PortfolioIntelligence): UniverseEntity[] {
  const projects = data.projects.slice(0, 24);
  const byCategory = new Map<string, string[]>();

  const entities: UniverseEntity[] = projects.map((project, index) => {
    const radius = 9 + (index % 3) * 1.5;
    const position = spherePosition(index, projects.length, radius);
    const mass = Math.min(2.2, 0.6 + project.metrics.stars * 0.08 + (25 - project.rank) * 0.02);
    const influence = FLAGSHIP_SLUGS.has(project.slug) ? 1 : 0.55;
    const memoryDepth = Math.min(1, project.qualityScore / 100);

    if (!byCategory.has(project.category)) byCategory.set(project.category, []);
    byCategory.get(project.category)!.push(project.slug);

    return {
      id: project.slug,
      label: project.name.toUpperCase(),
      slug: project.slug,
      category: project.category,
      color: CATEGORY_COLORS[project.category] ?? `hsl(${hashSlug(project.slug) % 360}, 70%, 55%)`,
      position,
      mass,
      influence,
      connections: [],
      description: project.description,
      project,
      memoryDepth
    };
  });

  const slugToId = new Map(entities.map((e) => [e.slug, e.id]));

  entities.forEach((entity) => {
    const peers = byCategory.get(entity.category) ?? [];
    entity.connections = peers
      .filter((slug) => slug !== entity.slug)
      .slice(0, 4)
      .map((slug) => slugToId.get(slug)!)
      .filter(Boolean);
  });

  return entities;
}

export const CLUSTER_LABELS = [
  "AI",
  "BACKEND",
  "RESEARCH",
  "DATA",
  "NETWORKS",
  "PRODUCT DESIGN",
  "DISTRIBUTED SYSTEMS"
] as const;

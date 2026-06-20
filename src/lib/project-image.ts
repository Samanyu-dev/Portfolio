import type { PortfolioProject } from "@/types/portfolio-v2";

export type ProjectImageVariant = "hero" | "background" | "hover" | "detail";

type ProjectTheme = {
  hue: number;
  motif: "agents" | "navigation" | "network" | "voice" | "finance" | "default";
  subtitle: string;
};

const SLUG_THEMES: Record<string, Partial<ProjectTheme>> = {
  aether: { motif: "agents", subtitle: "Agent orchestration · cognition graphs" },
  codeforge: { motif: "agents", subtitle: "Multi-agent engineering workflows" },
  "oracle-agent": { motif: "navigation", subtitle: "AI reasoning · pathfinding systems" },
  "network-intelligence": { motif: "network", subtitle: "Signal analysis · telecom infra" },
  "voice-khata": { motif: "voice", subtitle: "Voice ledger · multilingual UX" },
  gitinsights: { motif: "network", subtitle: "Repository intelligence · analytics" },
  stepsai: { motif: "agents", subtitle: "Autonomous learning systems" }
};

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getInitials(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function resolveTheme(project: PortfolioProject): ProjectTheme {
  const custom = SLUG_THEMES[project.slug];
  const seed = hashString(project.slug);
  return {
    hue: custom?.hue ?? seed % 360,
    motif: custom?.motif ?? "default",
    subtitle: custom?.subtitle ?? project.category
  };
}

function motifArt(motif: ProjectTheme["motif"], accent: string): string {
  switch (motif) {
    case "agents":
      return `
        <circle cx="120" cy="100" r="28" fill="none" stroke="${accent}" stroke-width="2" opacity="0.8"/>
        <circle cx="280" cy="120" r="22" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.6"/>
        <circle cx="200" cy="200" r="36" fill="${accent}" opacity="0.2"/>
        <line x1="148" y1="118" x2="172" y2="178" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
        <line x1="258" y1="132" x2="228" y2="178" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
      `;
    case "navigation":
      return `
        <path d="M80 220 L200 80 L320 220 L200 300 Z" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7"/>
        <circle cx="200" cy="180" r="6" fill="${accent}"/>
        <path d="M200 180 L260 140" stroke="${accent}" stroke-width="2" marker-end="url(#arrow)"/>
      `;
    case "network":
      return `
        <line x1="100" y1="140" x2="300" y2="140" stroke="${accent}" stroke-width="1" opacity="0.4"/>
        <line x1="150" y1="90" x2="250" y2="230" stroke="${accent}" stroke-width="1" opacity="0.4"/>
        <line x1="250" y1="90" x2="150" y2="230" stroke="${accent}" stroke-width="1" opacity="0.4"/>
        <circle cx="100" cy="140" r="10" fill="${accent}" opacity="0.8"/>
        <circle cx="300" cy="140" r="10" fill="${accent}" opacity="0.8"/>
        <circle cx="200" cy="160" r="14" fill="${accent}" opacity="0.5"/>
      `;
    case "voice":
      return `
        <rect x="160" y="100" width="80" height="120" rx="40" fill="none" stroke="${accent}" stroke-width="2"/>
        <path d="M200 220 L200 250 M180 250 L220 250" stroke="${accent}" stroke-width="2"/>
        <path d="M120 160 Q200 120 280 160" fill="none" stroke="${accent}" stroke-width="2" opacity="0.6"/>
      `;
    case "finance":
      return `
        <rect x="110" y="110" width="180" height="100" rx="12" fill="none" stroke="${accent}" stroke-width="2"/>
        <line x1="130" y1="150" x2="270" y2="150" stroke="${accent}" stroke-width="1" opacity="0.5"/>
        <line x1="130" y1="170" x2="220" y2="170" stroke="${accent}" stroke-width="1" opacity="0.5"/>
      `;
    default:
      return `
        <circle cx="200" cy="160" r="50" fill="none" stroke="${accent}" stroke-width="2"/>
        <circle cx="200" cy="160" r="28" fill="${accent}" opacity="0.25"/>
      `;
  }
}

function buildSvg(
  project: PortfolioProject,
  variant: ProjectImageVariant,
  width: number,
  height: number
): string {
  const theme = resolveTheme(project);
  const hue = theme.hue;
  const hue2 = (hue + 80) % 360;
  const initials = getInitials(project.name);
  const accent = `hsl(${hue}, 82%, 58%)`;
  const safeName = escapeXml(project.name);
  const safeSub = escapeXml(theme.subtitle);

  const isWide = variant === "background";
  const isDetail = variant === "detail";
  const opacityOverlay = variant === "hover" ? 0.15 : 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue}, 50%, ${isDetail ? 8 : 14}%)"/>
      <stop offset="100%" stop-color="hsl(${hue2}, 45%, ${isDetail ? 4 : 8}%)"/>
    </linearGradient>
    <radialGradient id="glow" cx="${isWide ? "70%" : "50%"}" cy="30%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${motifArt(theme.motif, accent)}
  ${!isWide ? `<text x="50%" y="58%" text-anchor="middle" fill="white" font-size="${isDetail ? 72 : 56}" font-weight="700" font-family="system-ui,sans-serif">${initials}</text>` : ""}
  <text x="50%" y="${isWide ? "55%" : "78%"}" text-anchor="middle" fill="rgba(255,255,255,0.95)" font-size="${isWide ? 20 : 16}" font-weight="600" font-family="system-ui,sans-serif">${safeName}</text>
  <text x="50%" y="${isWide ? "62%" : "84%"}" text-anchor="middle" fill="${accent}" font-size="11" font-family="ui-monospace,monospace" letter-spacing="1.5">${safeSub.toUpperCase()}</text>
  ${opacityOverlay ? `<rect width="100%" height="100%" fill="white" opacity="${opacityOverlay}"/>` : ""}
</svg>`;
}

const VARIANT_SIZE: Record<ProjectImageVariant, [number, number]> = {
  hero: [640, 800],
  background: [1200, 600],
  hover: [480, 600],
  detail: [800, 1000]
};

/** Project-specific generated artwork (hero, background, hover, detail) */
export function getProjectImageUrl(
  project: PortfolioProject,
  variant: ProjectImageVariant = "hero"
): string {
  const [w, h] = VARIANT_SIZE[variant];
  return `data:image/svg+xml,${encodeURIComponent(buildSvg(project, variant, w, h))}`;
}

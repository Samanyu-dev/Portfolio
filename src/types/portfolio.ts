/* ─────────────────────────────────────────────
   AETHER // SYSTEMS EXPLORER — Type System
   ───────────────────────────────────────────── */

export type WorldId = 'cognition' | 'atlas' | 'evolution' | 'terminal' | 'aether-core';

export type PerformanceTier = 'ultra' | 'high' | 'medium' | 'low';

export type TransitionState = 'idle' | 'exiting' | 'entering';

export type NodeCategory = 'ai-systems' | 'mobile' | 'backend' | 'research' | 'education' | 'achievement';

export type ProjectCategory = 'AI/ML' | 'Mobile' | 'Backend' | 'Interactive Web' | 'Research';

/* ── Neural Node (Cognition Universe) ── */
export interface CognitionNode {
  id: string;
  label: string;
  category: NodeCategory;
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  color: string;
  position: [number, number, number];
  connections: string[];
  description: string;
  navigatesTo?: WorldId | string;
}

/* ── Project (Atlas) ── */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  build: string;
  outcome: string;
  techStack: string[];
  challenges: string[];
  architecture: string[];
  githubUrl: string;
  demoUrl?: string;
  orbitRadius: number;
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  color: string;
  glowIntensity: number;
  isFlagship?: boolean;
}

/* ── Experience (Evolution Tree) ── */
export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  growthTheme: string;
  branchOrder: number;
}

/* ── Education ── */
export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  details: string;
}

/* ── Contact Action ── */
export interface ContactAction {
  id: string;
  label: string;
  href: string;
  loadingText: string;
  icon: string;
  type: 'link' | 'download';
}

/* ── Hackathon ── */
export interface HackathonEntry {
  title: string;
  result: string;
  details: string;
  year: number;
}

/* ── Command Palette ── */
export interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: 'navigate' | 'external' | 'inline' | 'download';
  target: string;
  category: 'navigation' | 'projects' | 'links' | 'info';
  keywords: string[];
}

/* ── AI Response ── */
export interface AIResponse {
  intent: string;
  keywords: string[];
  response: string;
  action?: 'navigate' | 'display';
  target?: string;
}

/* ── World State ── */
export interface WorldState {
  currentWorld: WorldId;
  previousWorld: WorldId | null;
  transitionState: TransitionState;
  performanceTier: PerformanceTier;
  commandPaletteOpen: boolean;
  soundEnabled: boolean;
  bootComplete: boolean;
  reducedMotion: boolean;
}

export type WorldAction =
  | { type: 'SET_WORLD'; payload: WorldId }
  | { type: 'SET_TRANSITION'; payload: TransitionState }
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'SET_COMMAND_PALETTE'; payload: boolean }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'COMPLETE_BOOT' }
  | { type: 'SET_PERFORMANCE'; payload: PerformanceTier }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean };

/* ── Restored Portfolio Core Types ── */
export type RepoCategory = "featured" | "experimental" | "utilities";

export type RepoDiscipline =
  | "AI Systems"
  | "Interactive Web"
  | "Mobile Products"
  | "Platforms & Data"
  | "Product Experiments";

export type AccentTone = "cyan" | "emerald" | "orange" | "violet";

export type GitHubProfileSnapshot = {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
  updatedAt: string;
  location: string | null;
  blog: string | null;
};

export type GitHubRepoSnapshot = {
  name: string;
  description: string | null;
  language: string | null;
  languages?: string[];
  topics: string[];
  homepage?: string | null;
  htmlUrl: string;
  size: number;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  pushedAt: string;
  createdAt: string;
  defaultBranch: string;
};

export type SkillNode = {
  name: string;
  weight: number;
  repos: string[];
};

export type SkillCluster = {
  key: string;
  title: string;
  description: string;
  accent: AccentTone;
  skills: SkillNode[];
};

export type ProjectNarrative = {
  problem: string;
  build: string;
  outcome: string;
  challenges: string[];
  architecture: string[];
};

export type PortfolioRepo = {
  slug: string;
  name: string;
  displayName?: string;
  title: string;
  summary: string;
  description?: string;
  useCase: string;
  category: RepoCategory;
  discipline: RepoDiscipline;
  accent: AccentTone;
  accentColor: string;
  complexity: {
    score: number;
    label: string;
  };
  featuredBias: number;
  stack: string[];
  techStack?: string[];
  topics: string[];
  metrics: {
    stars: number;
    forks: number;
    size: number;
    repoAge: number;
  };
  links: {
    repo: string;
    demo?: string;
  };
  htmlUrl?: string;
  homepage?: string | null;
  timeline: {
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
  };
  narrative: ProjectNarrative;
  longNarrative?: string;
  featuredReason: string;
};

export type PortfolioProfile = {
  username: string;
  name: string;
  introName: string;
  bio: string;
  avatarUrl: string;
  githubUrl: string;
  followers: number;
  publicRepos: number;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioData = {
  profile: PortfolioProfile;
  repositories: PortfolioRepo[];
  featured: PortfolioRepo[];
  experimental: PortfolioRepo[];
  utilities: PortfolioRepo[];
  skillClusters: SkillCluster[];
  metrics: {
    totalRepos: number;
    totalFeatured: number;
    totalStars: number;
    demoCount: number;
    activeYears: number;
  };
  roles: string[];
};

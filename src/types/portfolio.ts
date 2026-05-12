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
  accentColor: AccentTone;
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

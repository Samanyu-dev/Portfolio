export type DeploymentProvider = "vercel" | "render" | "railway" | "netlify" | "github-pages" | "huggingface" | "other";

export type ProjectStatus = "Production" | "Active Development" | "Archived";

export type ProjectCategory =
  | "AI Systems"
  | "Full Stack"
  | "Frontend Experience"
  | "Mobile"
  | "Backend & Infra"
  | "Research";

export type ProjectHighlight = "AI-powered" | "Full Stack" | "Research Project" | "Hackathon Project" | "Product Build";

export type DeploymentLink = {
  url: string;
  provider: DeploymentProvider;
  label: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  frontend?: DeploymentLink;
  backend?: DeploymentLink;
  category: ProjectCategory;
  highlights: ProjectHighlight[];
  status: ProjectStatus;
  metrics: {
    stars: number;
    forks: number;
    watchers: number;
    sizeKb: number;
    lastPushAt: string;
    openIssues: number;
  };
  qualityScore: number;
  rank: number;
  createdAt: string;
  updatedAt: string;
};

export type GitHubSummary = {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  profileUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  activeProjects: number;
  lastUpdatedAt: string;
};

export type ExperienceNode = {
  id: string;
  role: string;
  organization: string;
  start: string;
  end: string;
  location: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  growthTheme: string;
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period: string;
  details: string;
};

export type ContactData = {
  email: string;
  linkedin: string;
  github: string;
  huggingface?: string;
  website?: string;
  phone?: string;
  resumePath: string;
};

export type PortfolioIntelligence = {
  generatedAt: string;
  github: GitHubSummary;
  projects: PortfolioProject[];
  categories: Record<ProjectCategory, number>;
  techStackSummary: Array<{ name: string; count: number }>;
};

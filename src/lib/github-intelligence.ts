import { cache } from "react";
import { githubProfileSnapshot, githubRepoSnapshots } from "@/data/github-snapshot";
import type {
  DeploymentLink,
  DeploymentProvider,
  PortfolioIntelligence,
  PortfolioProject,
  ProjectCategory,
  ProjectHighlight,
  ProjectStatus
} from "@/types/portfolio-v2";

type GitHubUserResponse = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  updated_at: string;
};

type GitHubRepoResponse = {
  name: string;
  description: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  homepage: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
};

type NormalizedRepo = {
  name: string;
  description: string | null;
  primaryLanguage: string | null;
  languages: string[];
  topics: string[];
  homepage: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  size: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  archived: boolean;
  disabled: boolean;
};

const REVALIDATE_SECONDS = 60 * 60 * 6;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Samanyu-dev";
const GITHUB_API = "https://api.github.com";

const repoLinkOverrides: Record<string, Partial<Pick<PortfolioProject, "frontend" | "backend">>> = {
  loomlane: {
    frontend: {
      url: "https://loomlane-one.vercel.app",
      provider: "vercel",
      label: "Frontend"
    }
  },
  codeforge: {
    frontend: {
      url: "https://huggingface.co/spaces/Sammy1808/codeforge",
      provider: "huggingface",
      label: "Interactive Demo"
    }
  },
  crisis_comm_env: {
    frontend: {
      url: "https://huggingface.co/spaces/Sammy1808/crisis_comm",
      provider: "huggingface",
      label: "Simulation Demo"
    }
  },
  "oracle-agent": {
    frontend: {
      url: "https://huggingface.co/spaces/Sammy1808/oracleagent",
      provider: "huggingface",
      label: "Interactive Demo"
    }
  },
  Portfolio: {
    frontend: {
      url: "https://samanyuallipuram.vercel.app",
      provider: "vercel",
      label: "Live Site"
    }
  }
};

const topicTechMap: Record<string, string> = {
  "react-three-fiber": "React Three Fiber",
  nextjs: "Next.js",
  ai: "AI",
  "machine-learning": "Machine Learning",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  mongodb: "MongoDB",
  supabase: "Supabase",
  firebase: "Firebase",
  flutter: "Flutter",
  streamlit: "Streamlit",
  fastapi: "FastAPI",
  appwrite: "Appwrite",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  dart: "Dart"
};

export const getPortfolioIntelligence = cache(async (): Promise<PortfolioIntelligence> => {
  const source = await loadGitHubSource();
  const projects = source.repos
    .filter((repo) => !isNoiseRepo(repo.name))
    .map((repo) => normalizeProject(repo))
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .map((project, index) => ({ ...project, rank: index + 1 }));

  const categories = projects.reduce(
    (acc, item) => {
      acc[item.category] += 1;
      return acc;
    },
    {
      "AI Systems": 0,
      "Full Stack": 0,
      "Frontend Experience": 0,
      Mobile: 0,
      "Backend & Infra": 0,
      Research: 0
    } as Record<ProjectCategory, number>
  );

  const techFrequency = new Map<string, number>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techFrequency.set(tech, (techFrequency.get(tech) ?? 0) + 1);
    });
  });

  const techStackSummary = Array.from(techFrequency.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const totalStars = projects.reduce((sum, project) => sum + project.metrics.stars, 0);
  const totalForks = projects.reduce((sum, project) => sum + project.metrics.forks, 0);
  const activeProjects = projects.filter((project) => project.status !== "Archived").length;

  return {
    generatedAt: new Date().toISOString(),
    github: {
      username: source.profile.login,
      displayName: source.profile.name ?? "Samanyu Reddy Allipuram",
      bio: source.profile.bio ?? "Engineer building AI-first product experiences.",
      avatarUrl: source.profile.avatar_url,
      profileUrl: source.profile.html_url,
      followers: source.profile.followers,
      following: source.profile.following,
      publicRepos: source.profile.public_repos,
      totalStars,
      totalForks,
      activeProjects,
      lastUpdatedAt: source.profile.updated_at
    },
    projects,
    categories,
    techStackSummary
  };
});

async function loadGitHubSource() {
  try {
    const [profile, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()]);
    return { profile, repos };
  } catch {
    return {
      profile: {
        login: githubProfileSnapshot.login,
        name: githubProfileSnapshot.name,
        bio: githubProfileSnapshot.bio,
        avatar_url: githubProfileSnapshot.avatarUrl,
        html_url: githubProfileSnapshot.htmlUrl,
        followers: githubProfileSnapshot.followers,
        following: githubProfileSnapshot.following,
        public_repos: githubProfileSnapshot.publicRepos,
        updated_at: githubProfileSnapshot.updatedAt
      },
      repos: githubRepoSnapshots.map((repo) => ({
        name: repo.name,
        description: repo.description,
        primaryLanguage: repo.language,
        languages: repo.languages ?? (repo.language ? [repo.language] : []),
        topics: repo.topics ?? [],
        homepage: repo.homepage ?? null,
        htmlUrl: repo.htmlUrl,
        stars: repo.stargazersCount,
        forks: repo.forksCount,
        watchers: repo.stargazersCount,
        openIssues: 0,
        size: repo.size,
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
        pushedAt: repo.pushedAt,
        archived: false,
        disabled: false
      }))
    };
  }
}

async function fetchGitHubUser() {
  return fetchGitHub<GitHubUserResponse>(`/users/${GITHUB_USERNAME}`);
}

async function fetchGitHubRepos(): Promise<NormalizedRepo[]> {
  const repos = await fetchGitHub<GitHubRepoResponse[]>(
    `/users/${GITHUB_USERNAME}/repos?type=public&per_page=100&sort=updated`
  );

  const withLanguages = await Promise.all(
    repos.map(async (repo) => {
      let languages: string[] = repo.language ? [repo.language] : [];
      try {
        const payload = await fetchGitHub<Record<string, number>>(repo.languages_url);
        languages = Object.keys(payload);
      } catch {
        // keep fallback language
      }

      return {
        name: repo.name,
        description: repo.description,
        primaryLanguage: repo.language,
        languages,
        topics: repo.topics ?? [],
        homepage: repo.homepage,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count,
        size: repo.size,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        archived: repo.archived,
        disabled: repo.disabled
      } satisfies NormalizedRepo;
    })
  );

  return withLanguages;
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const url = path.startsWith("http") ? path : `${GITHUB_API}${path}`;
  const response = await fetch(url, {
    headers: buildGitHubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}) for ${url}`);
  }

  return response.json() as Promise<T>;
}

function buildGitHubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json"
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function normalizeProject(repo: NormalizedRepo): PortfolioProject {
  const technologies = collectTechnologies(repo);
  const frontend = inferFrontendLink(repo);
  const backend = inferBackendLink(repo, frontend);
  const category = inferCategory(repo, technologies);
  const highlights = inferHighlights(repo, category, technologies);
  const status = inferStatus(repo);
  const qualityScore = scoreProject(repo, technologies, frontend, backend, status, category);

  return {
    slug: slugify(repo.name),
    name: formatName(repo.name),
    description: normalizeDescription(repo.description, repo.name, category),
    technologies,
    repoUrl: repo.htmlUrl,
    frontend: repoLinkOverrides[repo.name]?.frontend ?? frontend,
    backend: repoLinkOverrides[repo.name]?.backend ?? backend,
    category,
    highlights,
    status,
    metrics: {
      stars: repo.stars,
      forks: repo.forks,
      watchers: repo.watchers,
      sizeKb: repo.size,
      lastPushAt: repo.pushedAt,
      openIssues: repo.openIssues
    },
    qualityScore,
    rank: 0,
    createdAt: repo.createdAt,
    updatedAt: repo.updatedAt
  };
}

function collectTechnologies(repo: NormalizedRepo) {
  const set = new Set<string>();
  repo.languages.forEach((lang) => set.add(lang));
  repo.topics.forEach((topic) => set.add(topicTechMap[topic] ?? humanize(topic)));

  const hint = (repo.description ?? "").toLowerCase();
  const hints: Array<[string, string]> = [
    ["three", "Three.js"],
    ["react", "React"],
    ["next", "Next.js"],
    ["fastapi", "FastAPI"],
    ["streamlit", "Streamlit"],
    ["openai", "OpenAI"],
    ["mongo", "MongoDB"],
    ["flutter", "Flutter"],
    ["swift", "Swift"]
  ];

  hints.forEach(([needle, tech]) => {
    if (hint.includes(needle)) set.add(tech);
  });

  return Array.from(set).filter(Boolean).slice(0, 8);
}

function inferFrontendLink(repo: NormalizedRepo): DeploymentLink | undefined {
  const url = normalizeUrl(repo.homepage);
  if (!url || isGithubRelease(url)) return undefined;

  const provider = inferProvider(url);
  return {
    url,
    provider,
    label: providerLabel(provider, "frontend")
  };
}

function inferBackendLink(repo: NormalizedRepo, frontend?: DeploymentLink): DeploymentLink | undefined {
  const text = `${repo.description ?? ""} ${repo.homepage ?? ""}`.toLowerCase();

  if (text.includes("railway.app")) {
    const url = extractUrl(text, "railway.app");
    if (url) return { url, provider: "railway", label: "Backend API" };
    return undefined;
  }
  if (text.includes("onrender.com")) {
    const url = extractUrl(text, "onrender.com");
    if (url) return { url, provider: "render", label: "Backend API" };
    return undefined;
  }

  if (!frontend && /api|backend|server|fastapi|express/.test(text)) {
    return {
      url: repo.htmlUrl,
      provider: "other",
      label: "Backend (Repo)"
    };
  }

  return undefined;
}

function inferCategory(repo: NormalizedRepo, technologies: string[]): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")} ${technologies.join(" ")}`.toLowerCase();

  if (/flutter|swift|ios|android|dart/.test(haystack)) return "Mobile";
  if (/ai|agent|ml|neural|llm|reinforcement|vision|bayesian/.test(haystack)) return "AI Systems";
  if (/api|backend|database|auth|oauth|payment|infra|docker|mongodb/.test(haystack)) return "Backend & Infra";
  if (/three|portfolio|ui|animation|frontend|dashboard|visual/.test(haystack)) return "Frontend Experience";
  if (/research|paper|benchmark|simulation/.test(haystack)) return "Research";
  return "Full Stack";
}

function inferHighlights(
  repo: NormalizedRepo,
  category: ProjectCategory,
  technologies: string[]
): ProjectHighlight[] {
  const highlights = new Set<ProjectHighlight>();
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")} ${technologies.join(" ")}`.toLowerCase();

  if (/ai|agent|llm|vision|openai|learning|neural/.test(haystack)) highlights.add("AI-powered");
  if (category === "Full Stack" || /frontend|backend|api|database/.test(haystack)) highlights.add("Full Stack");
  if (/research|simulation|benchmark|paper|rl/.test(haystack)) highlights.add("Research Project");
  if (/hackathon|wchl/.test(haystack)) highlights.add("Hackathon Project");
  if (repo.homepage || repo.stars > 0 || /app|platform|dashboard/.test(haystack)) highlights.add("Product Build");

  if (highlights.size === 0) highlights.add("Product Build");
  return Array.from(highlights).slice(0, 3);
}

function inferStatus(repo: NormalizedRepo): ProjectStatus {
  if (repo.archived || repo.disabled) return "Archived";

  const now = Date.now();
  const pushedAt = new Date(repo.pushedAt).getTime();
  const days = (now - pushedAt) / (1000 * 60 * 60 * 24);

  if (days <= 120) return "Active Development";
  if (days <= 365) return "Production";
  return "Archived";
}

function scoreProject(
  repo: NormalizedRepo,
  technologies: string[],
  frontend: DeploymentLink | undefined,
  backend: DeploymentLink | undefined,
  status: ProjectStatus,
  category: ProjectCategory
) {
  let score = 40;

  score += Math.min(repo.stars * 12, 24);
  score += Math.min(repo.forks * 8, 16);
  score += Math.min(technologies.length * 2.5, 16);
  score += frontend ? 10 : 0;
  score += backend ? 8 : 0;
  score += status === "Active Development" ? 8 : status === "Production" ? 6 : 1;
  score += category === "AI Systems" ? 6 : category === "Full Stack" ? 5 : 3;

  if (repo.openIssues > 30) score -= 4;
  if (repo.size < 10) score -= 5;

  return Math.max(1, Math.round(score));
}

function normalizeDescription(description: string | null, repoName: string, category: ProjectCategory) {
  if (description && description.trim()) return sentenceCase(description.trim());
  return `${formatName(repoName)} is a ${category.toLowerCase()} project focused on practical engineering outcomes.`;
}

function sentenceCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatName(repoName: string) {
  return repoName
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .replace(/\bAi\b/g, "AI")
    .replace(/\bApi\b/g, "API")
    .replace(/\bRl\b/g, "RL")
    .trim();
}

function humanize(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeUrl(url: string | null) {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("www.")) return `https://${trimmed}`;
  return undefined;
}

function inferProvider(url: string): DeploymentProvider {
  if (url.includes("vercel.app")) return "vercel";
  if (url.includes("onrender.com")) return "render";
  if (url.includes("railway.app")) return "railway";
  if (url.includes("netlify.app")) return "netlify";
  if (url.includes("github.io")) return "github-pages";
  if (url.includes("huggingface.co")) return "huggingface";
  return "other";
}

function providerLabel(provider: DeploymentProvider, surface: "frontend" | "backend") {
  const prefix = surface === "frontend" ? "Live" : "Backend";
  switch (provider) {
    case "vercel":
      return `${prefix} (Vercel)`;
    case "render":
      return `${prefix} (Render)`;
    case "railway":
      return `${prefix} (Railway)`;
    case "netlify":
      return `${prefix} (Netlify)`;
    case "github-pages":
      return `${prefix} (GitHub Pages)`;
    case "huggingface":
      return `${prefix} (Hugging Face)`;
    default:
      return `${prefix} Demo`;
  }
}

function isGithubRelease(url: string) {
  return /github\.com\/.+\/releases\//.test(url);
}

function extractUrl(text: string, domain: string) {
  const match = text.match(new RegExp(`https?:\\/\\/[^\\s]*${domain}[^\\s]*`, "i"));
  return match?.[0];
}

function isNoiseRepo(name: string) {
  const value = name.toLowerCase();
  return value === "samanyu-dev" || value === "execubot";
}

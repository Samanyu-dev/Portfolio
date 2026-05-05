import { cache } from "react";
import { githubProfileSnapshot, githubRepoSnapshots } from "@/data/github-snapshot";
import { repoOverrides } from "@/data/repo-overrides";
import type {
  AccentTone,
  GitHubProfileSnapshot,
  GitHubRepoSnapshot,
  PortfolioData,
  PortfolioProfile,
  PortfolioRepo,
  RepoCategory,
  RepoDiscipline,
  SkillCluster,
  SkillNode
} from "@/types/portfolio";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Samanyu-dev";
const GITHUB_API = "https://api.github.com";
const FEATURED_COUNT = 6;
const REVALIDATE_SECONDS = 60 * 60 * 6;

type GitHubProfileResponse = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
  location: string | null;
  blog: string | null;
};

type GitHubRepoResponse = {
  name: string;
  description: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  homepage: string | null;
  html_url: string;
  size: number;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  default_branch: string;
};

const topicDisplayMap: Record<string, string> = {
  "agent-simulation": "Agent Simulation",
  "ai-image-generation": "Image Generation",
  android: "Android",
  api: "API Design",
  asr: "Speech Recognition",
  "artificial-intelligence": "Artificial Intelligence",
  "astar-algorithm": "A*",
  "autonomous-agents": "Autonomous Agents",
  "bayesian-inference": "Bayesian Inference",
  bilingual: "Bilingual UX",
  chartjs: "Chart.js",
  css: "CSS",
  "computer-vision": "Computer Vision",
  "cross-platform": "Cross-platform",
  dart: "Dart",
  "decision-making": "Decision Systems",
  "digital-ledger": "Digital Ledger",
  dream11: "Dream11",
  firebase: "Firebase",
  flutter: "Flutter",
  "forward-kinematics": "Forward Kinematics",
  "generative-ai": "Generative AI",
  gsap: "GSAP",
  html5: "HTML5",
  "inventory-management": "Inventory Management",
  javascript: "JavaScript",
  kinematics: "Kinematics",
  leaderboard: "Leaderboard UI",
  matplotlib: "Matplotlib",
  numpy: "NumPy",
  openai: "OpenAI",
  opencv: "OpenCV",
  "path-planning": "Path Planning",
  pathfinding: "Pathfinding",
  python: "Python",
  "q-learning": "Q-Learning",
  "reinforcement-learning": "Reinforcement Learning",
  robotics: "Robotics",
  streamlit: "Streamlit",
  supabase: "Supabase",
  "voice-to-text": "Voice-to-Text"
};

const descriptionSignals = [
  "flutter",
  "firebase",
  "openai",
  "swift",
  "python",
  "opencv",
  "streamlit",
  "supabase",
  "chart.js",
  "chartjs",
  "gsap",
  "c++",
  "jupyter",
  "deep learning",
  "reinforcement learning",
  "computer vision",
  "speech"
] as const;

const clusterDefinitions = [
  {
    key: "ai",
    title: "AI",
    description: "ML, RL, DL, NLP, Robotics and Automation",
    accent: "violet" as const,
    skills: [
      { label: "ML", matches: ["machine learning", "prediction", "model", "python", "jupyter"] },
      { label: "RL", matches: ["reinforcement", "q-learning", "agent", "policy", "autonomy", "simulation"] },
      { label: "DL", matches: ["deep learning", "neural", "cnn", "lstm", "transformer"] },
      { label: "NLP", matches: ["language", "nlp", "speech", "voice", "text"] },
      { label: "Robotics", matches: ["robot", "vision", "kinematics", "pathfinding"] },
      { label: "Automation", matches: ["automation", "agentic", "workflow", "execution"] }
    ]
  },
  {
    key: "web",
    title: "Web Development",
    description: "Reactjs, TypeScript, Node js",
    accent: "cyan" as const,
    skills: [
      { label: "Reactjs", matches: ["react", "component", "frontend", "portfolio", "ui"] },
      { label: "TypeScript", matches: ["typescript", "ts", "typed"] },
      { label: "Node js", matches: ["node", "node.js", "javascript", "api", "service"] }
    ]
  },
  {
    key: "backend",
    title: "Backend",
    description: "Python, API, Database, git, Docker, Mongodb",
    accent: "emerald" as const,
    skills: [
      { label: "Python", matches: ["python", "numpy", "opencv", "streamlit", "jupyter"] },
      { label: "API", matches: ["api", "service", "integration", "backend"] },
      { label: "Database", matches: ["database", "data", "firebase", "supabase", "ledger", "inventory"] },
      { label: "git", matches: ["git", "github", "version"] },
      { label: "Docker", matches: ["docker", "container"] },
      { label: "Mongodb", matches: ["mongodb", "mongo"] }
    ]
  },
  {
    key: "mobile",
    title: "App Development",
    description: "IOS, SwiftUI, Cross Platform, Flutter",
    accent: "orange" as const,
    skills: [
      { label: "IOS", matches: ["ios", "swift", "swiftui", "apple"] },
      { label: "SwiftUI", matches: ["swiftui", "swift", "ios"] },
      { label: "Cross Platform", matches: ["cross-platform", "flutter", "dart"] },
      { label: "Flutter", matches: ["flutter", "dart", "android", "mobile"] }
    ]
  }
];

const formatters = {
  monthYear: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }),
  longDate: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
};

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const { profile, repos } = await loadGitHubSource();
  const preparedRepos = repos
    .map((repo) => prepareRepo(repo))
    .sort((left, right) => right.featuredBias - left.featuredBias || right.baseScore - left.baseScore);

  const featuredSet = new Set(
    preparedRepos
      .filter((repo) => repo.categoryHint !== "utilities")
      .slice(0, FEATURED_COUNT)
      .map((repo) => repo.slug)
  );

  const repositories = preparedRepos
    .map((repo, index) => finalizeRepo(repo, featuredSet.has(repo.slug) ? "featured" : pickCategory(repo), index))
    .sort((left, right) => {
      const categoryOrder = { featured: 0, experimental: 1, utilities: 2 };
      return categoryOrder[left.category] - categoryOrder[right.category] || right.complexity.score - left.complexity.score;
    });

  const featured = repositories.filter((repo) => repo.category === "featured");
  const experimental = repositories.filter((repo) => repo.category === "experimental");
  const utilities = repositories.filter((repo) => repo.category === "utilities");

  return {
    profile: buildProfile(profile, repositories),
    repositories,
    featured,
    experimental,
    utilities,
    skillClusters: buildSkillClusters(repositories),
    metrics: {
      totalRepos: repositories.length,
      totalFeatured: featured.length,
      totalStars: repositories.reduce((sum, repo) => sum + repo.metrics.stars, 0),
      demoCount: repositories.filter((repo) => Boolean(repo.links.demo)).length,
      activeYears: Math.max(1, new Date().getFullYear() - new Date(profile.createdAt).getFullYear())
    },
    roles: [
      "Creative Developer",
      "AI Systems Builder",
      "Mobile Product Engineer",
      "Frontend Storyteller"
    ]
  };
});

export async function getProjectBySlug(slug: string) {
  const data = await getPortfolioData();
  return data.repositories.find((repo) => repo.slug === slug);
}

async function loadGitHubSource() {
  try {
    const [profile, repos] = await Promise.all([fetchGitHubProfile(), fetchGitHubRepos()]);
    return { profile, repos };
  } catch {
    return {
      profile: githubProfileSnapshot,
      repos: githubRepoSnapshots
    };
  }
}

async function fetchGitHubProfile(): Promise<GitHubProfileSnapshot> {
  const profile = await fetchGitHub<GitHubProfileResponse>(`/users/${GITHUB_USERNAME}`);
  return {
    login: profile.login,
    name: profile.name,
    bio: profile.bio,
    avatarUrl: profile.avatar_url,
    htmlUrl: profile.html_url,
    followers: profile.followers,
    following: profile.following,
    publicRepos: profile.public_repos,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
    location: profile.location,
    blog: profile.blog
  };
}

async function fetchGitHubRepos(): Promise<GitHubRepoSnapshot[]> {
  const repos = await fetchGitHub<GitHubRepoResponse[]>(
    `/users/${GITHUB_USERNAME}/repos?type=public&per_page=100&sort=updated`
  );

  const withLanguages = await Promise.all(
    repos.map(async (repo) => {
      try {
        const languages = await fetchGitHub<Record<string, number>>(absolutePath(repo.languages_url));
        return {
          ...repo,
          languages: Object.keys(languages).slice(0, 5)
        };
      } catch {
        return { ...repo, languages: repo.language ? [repo.language] : [] };
      }
    })
  );

  return withLanguages.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    languages: repo.languages,
    topics: repo.topics ?? [],
    homepage: repo.homepage,
    htmlUrl: repo.html_url,
    size: repo.size,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    createdAt: repo.created_at,
    defaultBranch: repo.default_branch
  }));
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const response = await fetch(path.startsWith("http") ? path : `${GITHUB_API}${path}`, {
    headers: buildGitHubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`GitHub fetch failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function absolutePath(url: string) {
  return url.startsWith("http") ? url : `${GITHUB_API}${url}`;
}

function prepareRepo(repo: GitHubRepoSnapshot) {
  const override = repoOverrides[repo.name];
  const title = override?.title ?? humanizeRepoName(repo.name);
  const slug = slugify(repo.name);
  const keywords = collectKeywords(repo, override);
  const discipline = override?.discipline ?? inferDiscipline(keywords);
  const stack = uniqueList([
    ...(override?.techStack ?? []),
    ...(repo.languages ?? []),
    ...(repo.language ? [repo.language] : []),
    ...repo.topics.map((topic) => topicDisplayMap[topic] ?? humanizeTopic(topic)),
    ...extractDescriptionTech(repo.description)
  ]).slice(0, 6);

  const summary = override?.summary ?? inferSummary(repo, title, discipline);
  const useCase = override?.useCase ?? inferUseCase(title, discipline, repo, keywords);
  const problem = override?.problem ?? inferProblem(title, discipline, keywords);
  const build = override?.build ?? inferBuild(title, stack, discipline);
  const outcome = override?.outcome ?? inferOutcome(title, discipline, repo);
  const challenges = override?.challenges ?? inferChallenges(discipline, keywords);
  const architecture = override?.architecture ?? inferArchitecture(stack, discipline);
  const baseScore = scoreRepo(repo, stack, discipline, override?.featuredBias ?? 0);

  return {
    repo,
    override,
    slug,
    title,
    keywords,
    discipline,
    stack,
    summary,
    useCase,
    narrative: {
      problem,
      build,
      outcome,
      challenges,
      architecture
    },
    baseScore,
    featuredBias: baseScore + (override?.featuredBias ?? 0),
    categoryHint: override?.categoryHint
  };
}

function finalizeRepo(
  prepared: ReturnType<typeof prepareRepo>,
  category: RepoCategory,
  index: number
): PortfolioRepo {
  const accent = pickAccent(prepared.discipline, index);
  const complexityScore = prepared.baseScore;

  return {
    slug: prepared.slug,
    name: prepared.repo.name,
    title: prepared.title,
    summary: prepared.summary,
    useCase: prepared.useCase,
    category,
    discipline: prepared.discipline,
    accent,
    complexity: {
      score: complexityScore,
      label: complexityLabel(complexityScore)
    },
    stack: prepared.stack,
    topics: prepared.repo.topics,
    metrics: {
      stars: prepared.repo.stargazersCount,
      forks: prepared.repo.forksCount,
      size: prepared.repo.size,
      repoAge: Math.max(1, new Date().getFullYear() - new Date(prepared.repo.createdAt).getFullYear())
    },
    links: {
      repo: prepared.repo.htmlUrl,
      demo: prepared.override?.demoUrl ?? normalizeDemoUrl(prepared.repo.homepage)
    },
    timeline: {
      createdAt: prepared.repo.createdAt,
      updatedAt: prepared.repo.updatedAt,
      pushedAt: prepared.repo.pushedAt
    },
    narrative: prepared.narrative,
    featuredReason:
      prepared.override?.featuredReason ??
      `${prepared.discipline} chapter with ${prepared.stack.slice(0, 2).join(" and ").toLowerCase()} at the center.`
  };
}

function buildProfile(profile: GitHubProfileSnapshot, repos: PortfolioRepo[]): PortfolioProfile {
  const dominantDisciplines = uniqueList(repos.slice(0, 6).map((repo) => repo.discipline.toLowerCase()));
  return {
    username: profile.login,
    name: "Samanyu",
    introName: "Samanyu",
    bio: `I build ${dominantDisciplines.slice(0, 3).join(", ")}, then wrap them in interfaces that feel cinematic instead of static.`,
    avatarUrl: profile.avatarUrl,
    githubUrl: profile.htmlUrl,
    followers: profile.followers,
    publicRepos: repos.length,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  };
}

function buildSkillClusters(repos: PortfolioRepo[]): SkillCluster[] {
  return clusterDefinitions.map((cluster) => {
    return {
      key: cluster.key,
      title: cluster.title,
      description: cluster.description,
      accent: cluster.accent,
      skills: cluster.skills.map((skill) => {
        const relatedRepos = repos.filter((repo) => {
          const haystack = [repo.title, repo.summary, repo.useCase, repo.discipline, ...repo.stack, ...repo.topics]
            .join(" ")
            .toLowerCase();
          return skill.matches.some((match) => haystack.includes(match));
        });

        return {
          name: skill.label,
          weight: Math.max(
            1,
            relatedRepos.reduce((sum, repo) => sum + (repo.category === "featured" ? 3 : 1), 0)
          ),
          repos: relatedRepos.map((repo) => repo.title).slice(0, 4)
        } satisfies SkillNode;
      })
    };
  });
}

function pickCategory(prepared: ReturnType<typeof prepareRepo>): RepoCategory {
  if (prepared.categoryHint) {
    return prepared.categoryHint;
  }

  return isUtilityRepo(prepared.repo.name, prepared.keywords) ? "utilities" : "experimental";
}

function humanizeRepoName(name: string) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\bApi\b/g, "API")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bMl\b/g, "ML")
    .replace(/\bRl\b/g, "RL")
    .replace(/\bCine\b/g, "Cine")
    .replace(/\bNest\b/g, "Nest")
    .replace(/\bApp\b/g, "App")
    .trim();
}

function humanizeTopic(topic: string) {
  return topic
    .replace(/-/g, " ")
    .replace(/\b\w/g, (value) => value.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function collectKeywords(repo: GitHubRepoSnapshot, override?: { techStack?: string[] }) {
  return uniqueList(
    [
      repo.name,
      repo.description ?? "",
      repo.language ?? "",
      ...(repo.languages ?? []),
      ...repo.topics,
      ...(override?.techStack ?? [])
    ]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9.+#-]+/)
      .filter(Boolean)
  );
}

function inferDiscipline(keywords: string[]): RepoDiscipline {
  const joined = keywords.join(" ");
  if (/(flutter|dart|swift|ios|android|voice|speech)/.test(joined)) {
    return "Mobile Products";
  }
  if (/(python|robotics|vision|rl|agent|learning|jupyter|bayesian|autonomous|simulation)/.test(joined)) {
    return "AI Systems";
  }
  if (/(api|firebase|supabase|backend|systems|c\+\+|data|inventory)/.test(joined)) {
    return "Platforms & Data";
  }
  if (/(html|css|javascript|gsap|leaderboard|dashboard|portfolio|web)/.test(joined)) {
    return "Interactive Web";
  }
  return "Product Experiments";
}

function inferSummary(repo: GitHubRepoSnapshot, title: string, discipline: RepoDiscipline) {
  if (repo.description?.trim()) {
    return sentenceCase(repo.description.trim());
  }

  switch (discipline) {
    case "AI Systems":
      return `${title} is an experiment in autonomous behavior, modeling, or perception-focused systems.`;
    case "Mobile Products":
      return `${title} explores how a mobile product can feel polished, useful, and expressive at the same time.`;
    case "Platforms & Data":
      return `${title} leans into service design, data movement, and the infrastructure side of product thinking.`;
    case "Interactive Web":
      return `${title} is a front-end-led build focused on motion, presentation, or browser-based interaction.`;
    default:
      return `${title} is a product concept repo used to test ideas quickly and visibly.`;
  }
}

function inferUseCase(
  title: string,
  discipline: RepoDiscipline,
  repo: GitHubRepoSnapshot,
  keywords: string[]
) {
  const joined = keywords.join(" ");
  if (joined.includes("dream11")) return "Fantasy-sports ranking and tracking experience";
  if (joined.includes("movie")) return "Cinema discovery product";
  if (joined.includes("portfolio")) return "Personal brand interface";
  if (joined.includes("tutor")) return "Decentralized education concept";
  if (joined.includes("robot")) return "Robotics and perception sandbox";
  if (joined.includes("network")) return "Systems forecasting research lab";
  if (joined.includes("agent")) return "Autonomy and decision-making experiment";
  if (joined.includes("api")) return "Backend service prototype";
  if (joined.includes("internship")) return "Execution sprint for a product brief";

  switch (discipline) {
    case "AI Systems":
      return "Research-led AI prototype";
    case "Mobile Products":
      return "Mobile-first user experience";
    case "Platforms & Data":
      return "Systems and services build";
    case "Interactive Web":
      return repo.homepage ? "Interactive browser experience" : "Web presentation layer";
    default:
      return "Product idea exploration";
  }
}

function inferProblem(title: string, discipline: RepoDiscipline, keywords: string[]) {
  const joined = keywords.join(" ");
  if (joined.includes("dream11")) {
    return "Friendly competition gets messy when rankings, momentum, and bragging rights live in spreadsheets or chat threads.";
  }
  if (joined.includes("movie")) {
    return "Movie discovery often feels transactional instead of emotionally guided or shareable.";
  }
  if (joined.includes("portfolio")) {
    return "Personal sites blur together quickly when they optimize for density instead of memory.";
  }
  if (joined.includes("api")) {
    return "Data integrations fall apart when the service layer is treated as an afterthought.";
  }

  switch (discipline) {
    case "AI Systems":
      return `${title} starts from a question about uncertainty, prediction, or intelligent behavior that benefits from experimentation.`;
    case "Mobile Products":
      return `${title} looks at how a product can be more useful and more human on small screens.`;
    case "Platforms & Data":
      return `${title} tackles the hidden systems work that supports product reliability and scale.`;
    case "Interactive Web":
      return `${title} is built around the idea that information-heavy interfaces can still feel alive.`;
    default:
      return `${title} explores an early-stage product direction with enough structure to test the signal quickly.`;
  }
}

function inferBuild(title: string, stack: string[], discipline: RepoDiscipline) {
  const stackText = stack.slice(0, 4).join(", ");
  switch (discipline) {
    case "AI Systems":
      return `${title} layers experimentation, observability, and modeling around ${stackText}.`;
    case "Mobile Products":
      return `${title} uses ${stackText} to make the experience feel tactile, direct, and production-minded.`;
    case "Platforms & Data":
      return `${title} focuses on service flow, integrations, and system boundaries using ${stackText}.`;
    case "Interactive Web":
      return `${title} is staged through motion, layout, and browser-native storytelling with ${stackText}.`;
    default:
      return `${title} is a fast-moving concept build shaped with ${stackText}.`;
  }
}

function inferOutcome(title: string, discipline: RepoDiscipline, repo: GitHubRepoSnapshot) {
  const liveSignal = normalizeDemoUrl(repo.homepage) ? "A live surface exists, which makes the experiment feel tangible." : "";

  switch (discipline) {
    case "AI Systems":
      return `${title} leaves behind a technical narrative that feels more like a lab notebook than a placeholder repo. ${liveSignal}`.trim();
    case "Mobile Products":
      return `${title} demonstrates taste, workflow thinking, and cross-functional product instincts in one chapter. ${liveSignal}`.trim();
    case "Platforms & Data":
      return `${title} shows comfort with the unseen layers that keep software useful, connected, and trustworthy.`.trim();
    case "Interactive Web":
      return `${title} proves that a simple browser surface can still carry mood, pacing, and memorable interaction. ${liveSignal}`.trim();
    default:
      return `${title} acts as a fast signal of curiosity and product range.${liveSignal ? ` ${liveSignal}` : ""}`.trim();
  }
}

function inferChallenges(discipline: RepoDiscipline, keywords: string[]) {
  const joined = keywords.join(" ");
  if (joined.includes("dream11")) {
    return [
      "Making rankings feel instantly readable",
      "Adding motion without slowing down the experience",
      "Keeping social stats playful instead of cluttered"
    ];
  }

  switch (discipline) {
    case "AI Systems":
      return [
        "Turning complex behavior into something inspectable",
        "Balancing experimentation speed with interpretability",
        "Keeping the system honest under noisy inputs"
      ];
    case "Mobile Products":
      return [
        "Designing for clarity on smaller screens",
        "Blending utility with emotional product feel",
        "Keeping interaction flows smooth under real usage"
      ];
    case "Platforms & Data":
      return [
        "Maintaining clean system boundaries",
        "Reducing complexity in data or integration flows",
        "Making hidden infrastructure decisions legible"
      ];
    case "Interactive Web":
      return [
        "Creating motion that guides instead of distracts",
        "Balancing polish with performance",
        "Building visual identity without losing clarity"
      ];
    default:
      return [
        "Validating the idea quickly",
        "Choosing the right level of scope for the prototype",
        "Leaving behind a clear next step after the first iteration"
      ];
  }
}

function inferArchitecture(stack: string[], discipline: RepoDiscipline) {
  const architecture = stack.slice(0, 3);
  if (architecture.length >= 3) {
    return architecture;
  }

  switch (discipline) {
    case "AI Systems":
      return ["Experiment loop", "Modeling layer", "Visualization surface"];
    case "Mobile Products":
      return ["Mobile client", "Data and sync layer", "Interface states"];
    case "Platforms & Data":
      return ["Service layer", "Data flow", "Integration boundary"];
    case "Interactive Web":
      return ["Presentation layer", "Interaction system", "Content rhythm"];
    default:
      return ["Concept frame", "Core interaction", "Next-step pathway"];
  }
}

function extractDescriptionTech(description: string | null) {
  if (!description) return [];
  const normalized = description.toLowerCase();

  return descriptionSignals
    .filter((signal) => normalized.includes(signal))
    .map((signal) => {
      switch (signal) {
        case "chart.js":
        case "chartjs":
          return "Chart.js";
        case "c++":
          return "C++";
        case "gsap":
          return "GSAP";
        case "deep learning":
          return "Deep Learning";
        case "reinforcement learning":
          return "Reinforcement Learning";
        case "computer vision":
          return "Computer Vision";
        case "speech":
          return "Speech Recognition";
        case "jupyter":
          return "Jupyter";
        default:
          return signal
            .split("-")
            .map((part) => sentenceCase(part))
            .join(" ");
      }
    });
}

function scoreRepo(
  repo: GitHubRepoSnapshot,
  stack: string[],
  discipline: RepoDiscipline,
  extraBias: number
) {
  const descriptionWeight = repo.description ? Math.min(repo.description.length / 20, 10) : 0;
  const topicWeight = Math.min(repo.topics.length * 1.15, 18);
  const stackWeight = Math.min(stack.length * 2.4, 14);
  const sizeWeight = Math.min(repo.size / 300, 18);
  const demoWeight = normalizeDemoUrl(repo.homepage) ? 6 : 0;
  const socialWeight = repo.stargazersCount * 5 + repo.forksCount * 4;
  const disciplineWeight =
    discipline === "AI Systems" ? 8 : discipline === "Mobile Products" ? 6 : discipline === "Interactive Web" ? 5 : 4;

  return Math.round(descriptionWeight + topicWeight + stackWeight + sizeWeight + demoWeight + socialWeight + disciplineWeight + extraBias);
}

function pickAccent(discipline: RepoDiscipline, index: number): AccentTone {
  if (discipline === "AI Systems") return index % 2 === 0 ? "violet" : "cyan";
  if (discipline === "Mobile Products") return "orange";
  if (discipline === "Platforms & Data") return "emerald";
  return index % 2 === 0 ? "cyan" : "orange";
}

function complexityLabel(score: number) {
  if (score >= 56) return "Research Depth";
  if (score >= 42) return "System Build";
  if (score >= 28) return "Product Prototype";
  return "Concept Sprint";
}

function isUtilityRepo(name: string, keywords: string[]) {
  const joined = `${name} ${keywords.join(" ")}`.toLowerCase();
  return /(dashboard|ranking|api|portfolio|readme|paper|task|tracker|solutions)/.test(joined);
}

function normalizeDemoUrl(value?: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.includes("github.com/") && !trimmed.includes("github.io")) {
    return undefined;
  }
  return trimmed;
}

function uniqueList(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatRepoDate(value: string) {
  return formatters.monthYear.format(new Date(value));
}

export function formatLongDate(value: string) {
  return formatters.longDate.format(new Date(value));
}

export function formatRepoSize(size: number) {
  if (size >= 1000) {
    return `${(size / 1000).toFixed(1)} MB`;
  }
  return `${size} KB`;
}

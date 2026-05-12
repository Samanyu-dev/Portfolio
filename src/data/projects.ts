import type { MiniProject, Project } from "@/types";

export const projects: Project[] = [
  {
    title: "CodeForge AI",
    category: "AI/ML",
    description: "Architecting a multi-agent 'AI engineering org' with a cinematic command-center.",
    techStack: ["React", "FastAPI", "WebSockets", "React Flow"],
    githubUrl: "https://github.com/Samanyu-dev/codeforge",
    accent: "primary",
    repoStatus: "verified"
  },
  {
    title: "Echo",
    category: "Mobile",
    description: "Where event invitation design meets cloud-native intelligence and cinematic mobile UX.",
    techStack: ["Flutter", "Appwrite", "Riverpod", "GoRouter"],
    githubUrl: "https://github.com/Samanyu-dev/echo",
    accent: "secondary",
    repoStatus: "verified"
  },
  {
    title: "Crisis Command",
    category: "AI/ML",
    description: "Multi-turn RL environment for training agents on high-stakes organizational communication.",
    techStack: ["Python", "RL", "FastAPI", "OpenEnv"],
    githubUrl: "https://github.com/Samanyu-dev/crisis_comm_env",
    accent: "accent",
    repoStatus: "verified"
  },
  {
    title: "Loomlane",
    category: "Backend",
    description: "Customised university merchandise system with a secure, scalable commerce backbone.",
    techStack: ["MongoDB", "JWT", "OAuth", "Razorpay"],
    githubUrl: "https://github.com/Samanyu-dev/Loomlane_sam1",
    accent: "primary",
    repoStatus: "verified"
  },
  {
    title: "Oracle Agent",
    category: "AI/ML",
    description: "In a world of noise and uncertainty, only the Oracle sees the path.",
    techStack: ["Python", "MCTS", "Bayesian", "RL"],
    githubUrl: "https://github.com/Samanyu-dev/oracle-agent",
    accent: "secondary",
    repoStatus: "verified"
  }
];

export const projectFilters = ["All", "AI/ML", "Web", "Backend", "Mobile"] as const;

export const miniProjects: MiniProject[] = [
  {
    title: "Robot Vision Lab",
    description: "Transforming robotic perception math into an interactive engineering story.",
    githubUrl: "https://github.com/Samanyu-dev/robot_vision",
    language: "Python",
    repoStatus: "verified"
  },
  {
    title: "MovieNest",
    description: "Your ultimate movie discovery companion designed for delight and mobile polish.",
    githubUrl: "https://github.com/Samanyu-dev/MovieNestApp",
    language: "Swift",
    repoStatus: "verified"
  },
  {
    title: "Dream11 Tracker",
    description: "A motion-rich leaderboard tracking performance through the lens of gamification.",
    githubUrl: "https://github.com/Samanyu-dev/dream11_ranking",
    language: "JavaScript",
    repoStatus: "verified"
  },
  {
    title: "Durga Idol Maker",
    description: "AI-powered business management for Kolkata's idol artisans.",
    githubUrl: "https://github.com/Samanyu-dev/durgapuja",
    language: "Dart",
    repoStatus: "verified"
  }
];

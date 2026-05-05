import type { MiniProject, Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Network Performance",
    category: "AI/ML",
    description:
      "A deep-learning lab for forecasting network behavior with sequence, convolutional, transformer, and generative model families.",
    techStack: ["LSTM", "CNN", "Transformers", "GANs", "Autoencoders"],
    githubUrl: "https://github.com/Samanyu-dev/Network_Performance",
    accent: "primary",
    repoStatus: "verified"
  },
  {
    title: "Crisis Communication Env",
    category: "AI/ML",
    description:
      "A multi-agent reinforcement-learning environment for testing how agents coordinate under crisis-response constraints.",
    techStack: ["RL", "Multi-agent", "OpenEnv", "NLP"],
    githubUrl: "https://github.com/Samanyu-dev/crisis_comm_env",
    accent: "secondary",
    repoStatus: "verified"
  },
  {
    title: "Self-Driving Car RL",
    category: "AI/ML",
    description:
      "Simulation project exploring behavior cloning and neural-network policies for autonomous driving decisions.",
    techStack: ["Behavior Cloning", "Neural Networks", "Simulation"],
    githubUrl: "https://github.com/Samanyu-dev",
    accent: "accent",
    repoStatus: "not-public"
  },
  {
    title: "Oracle Agent",
    category: "AI/ML",
    description:
      "Grid navigation agent trained to reason about hazards, route choices, and safe reward-seeking behavior.",
    techStack: ["RL", "Grid Navigation", "Hazard Avoidance", "PyTorch"],
    githubUrl: "https://github.com/Samanyu-dev",
    accent: "primary",
    repoStatus: "not-public"
  },
  {
    title: "MovieNestApp",
    category: "Mobile",
    description:
      "A polished movie discovery app with API-backed content flows and a mobile-first Swift interface.",
    techStack: ["Swift", "API Integration", "UI/UX"],
    githubUrl: "https://github.com/Samanyu-dev/MovieNestApp",
    accent: "secondary",
    repoStatus: "verified"
  }
];

export const projectFilters = ["All", "AI/ML", "Web", "Backend", "Mobile"] as const;

export const miniProjects: MiniProject[] = [
  {
    title: "robot_vision",
    description: "Robotics, kinematics, and computer vision demo for camera-based perception.",
    githubUrl: "https://github.com/Samanyu-dev/robot_vision",
    language: "Python",
    repoStatus: "verified"
  },
  {
    title: "ExecuBot",
    description: "Agentic AI concept that turns natural-language instructions into actions.",
    githubUrl: "https://github.com/Samanyu-dev/ExecuBot",
    repoStatus: "verified"
  },
  {
    title: "PennyWallet",
    description: "Planned finance mini tile; public repo was not found under Samanyu-dev.",
    githubUrl: "https://github.com/Samanyu-dev",
    repoStatus: "not-public"
  },
  {
    title: "tutordecentra",
    description: "Decentralized tutoring concept repository.",
    githubUrl: "https://github.com/Samanyu-dev/tutordecentra",
    repoStatus: "verified"
  },
  {
    title: "durgapuja",
    description: "Durga Puja idol makers app built with Dart.",
    githubUrl: "https://github.com/Samanyu-dev/durgapuja",
    language: "Dart",
    repoStatus: "verified"
  },
  {
    title: "trufides",
    description: "Planned trust/verification mini tile; public repo was not found under Samanyu-dev.",
    githubUrl: "https://github.com/Samanyu-dev",
    repoStatus: "not-public"
  }
];

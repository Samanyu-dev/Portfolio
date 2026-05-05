import type { RepoCategory, RepoDiscipline } from "@/types/portfolio";

export type RepoOverride = {
  title?: string;
  summary?: string;
  useCase?: string;
  discipline?: RepoDiscipline;
  techStack?: string[];
  problem?: string;
  build?: string;
  outcome?: string;
  challenges?: string[];
  architecture?: string[];
  featuredBias?: number;
  categoryHint?: RepoCategory;
  featuredReason?: string;
  demoUrl?: string;
};

export const repoOverrides: Record<string, RepoOverride> = {
  mobile: {
    title: "Indic LLM Data Collection App",
    summary: "Cross-platform mobile app for collecting multilingual, multimodal cultural data to train inclusive Indic Large Language Models.",
    useCase: "Community-driven initiative by Swecha to gather text, audio, image, and video data from native speakers.",
    discipline: "Mobile Products",
    techStack: ["Flutter", "Dart", "FastAPI", "SQLite", "Figma", "Geo-tagging"],
    problem: "Training culturally aware and inclusive Indic LLMs requires authentic, multimodal data from native speakers across India's linguistic diversity.",
    build: "A modular, accessible Flutter app backed by a FastAPI service, supporting chunked uploads, offline SQLite drafts, and end-to-end encryption for 16 cultural categories.",
    outcome: "A professional, Figma-designed cross-platform tool enabling seamless crowdsourced data collection in multiple Indic languages.",
    challenges: [
      "Handling large multimodal uploads across unstable mobile networks",
      "Building offline-first capabilities with background sync",
      "Designing an accessible interface for diverse demographics and languages"
    ],
    architecture: ["Flutter Client", "FastAPI Backend", "SQLite Local Storage", "Secure Sync Layer"],
    featuredBias: 15, // Make it very high to ensure it's prominently featured
    featuredReason: "Showcases full-stack mobile capabilities, offline-first architecture, and meaningful social impact."
  },
  durgapuja: {
    summary: "An AI-assisted operations app built for Kolkata's Durga idol artisans.",
    useCase: "Mobile workflow system for artisans, orders, ledgers, and AI-powered design support.",
    discipline: "Mobile Products",
    techStack: ["Flutter", "Dart", "Firebase", "OpenAI", "Speech-to-Text"],
    problem: "Traditional artisan workflows need digital tooling that respects language, pace, and on-the-ground realities.",
    build:
      "This chapter combines a Flutter surface, Firebase data flows, Bengali voice capture, and generative AI features into one operating layer.",
    outcome:
      "The result feels like a product, not just a prototype: one place to track orders, finances, inventory, and visual inspiration.",
    challenges: [
      "Designing around bilingual and voice-first usage patterns",
      "Blending operational tooling with AI features without overwhelming the user",
      "Keeping the experience practical for a local business workflow"
    ],
    architecture: ["Flutter client", "Firebase-backed data layer", "Voice and AI service integrations"],
    featuredBias: 14,
    featuredReason: "Shows the strongest overlap of product thinking, AI, and mobile execution."
  },
  "oracle-agent": {
    summary: "A decision-making sandbox for agents navigating uncertain environments.",
    useCase: "Simulation-driven AI experiment for planning, inference, and autonomous behavior.",
    discipline: "AI Systems",
    techStack: ["Python", "Reinforcement Learning", "A*", "Bayesian Inference", "NumPy"],
    problem: "Autonomous agents need to reason under uncertainty, not just chase deterministic rewards.",
    build:
      "The repo mixes pathfinding, probabilistic sensing, and reinforcement learning signals to test how an agent behaves when the world is only partially visible.",
    outcome:
      "It reads like a compact research lab focused on autonomy, navigation, and reasoning quality.",
    challenges: [
      "Balancing path planning with uncertain sensor inputs",
      "Designing reward logic that does not collapse into brittle behavior",
      "Making partially observable environments debuggable"
    ],
    architecture: ["Simulation loop", "Inference and planning layer", "Policy and visualization tooling"],
    featuredBias: 13,
    featuredReason: "A strong AI chapter with clear technical depth and a distinctive problem space."
  },
  robot_vision: {
    summary: "A robotics and computer-vision lab that turns perception math into something visible.",
    useCase: "Interactive robotics demo for kinematics, camera projection, and vision pipelines.",
    discipline: "AI Systems",
    techStack: ["Python", "OpenCV", "Streamlit", "NumPy", "Kinematics"],
    problem: "Perception and robotics concepts are hard to trust until the math becomes observable.",
    build:
      "The project connects forward kinematics, camera projection, and dashboard-style visualization to show how a robot interprets the world through a lens.",
    outcome:
      "It becomes both a teaching surface and a technical proof-of-work for vision-driven robotics.",
    challenges: [
      "Keeping geometric concepts visual instead of abstract",
      "Coordinating robotic transforms with camera-space projections",
      "Packaging technical depth into an interactive interface"
    ],
    architecture: ["Python computation layer", "Vision and geometry modules", "Streamlit interaction surface"],
    featuredBias: 12,
    featuredReason: "One of the clearest examples of technical depth presented through an interface."
  },
  Network_Performance: {
    summary: "A research-heavy notebook exploring network behavior prediction with deep learning.",
    useCase: "Sequence-modeling lab for forecasting throughput, latency, and other performance signals.",
    discipline: "AI Systems",
    techStack: ["Python", "Jupyter", "Deep Learning", "Time Series", "Prediction"],
    problem: "Network behavior is noisy and temporal, so static analysis misses the patterns hidden across time.",
    build:
      "The repo explores model families built for sequential prediction and uses notebooks as a fast research loop for iteration.",
    outcome:
      "It positions you as someone comfortable using ML for systems-oriented forecasting problems.",
    challenges: [
      "Capturing temporal patterns without overfitting",
      "Comparing model behavior across different forecasting strategies",
      "Turning research experiments into interpretable outputs"
    ],
    architecture: ["Notebook-based experimentation", "Model training routines", "Evaluation and comparison flows"],
    featuredBias: 10,
    featuredReason: "Strong signal for applied ML and research-style experimentation."
  },
  crisis_comm_env: {
    summary: "A multi-agent environment for stress-testing communication under crisis conditions.",
    useCase: "Simulation framework for emergent coordination and communication-aware policies.",
    discipline: "AI Systems",
    techStack: ["Python", "Simulation", "Multi-Agent Systems", "Reinforcement Learning"],
    problem: "Coordination breaks first when communication becomes constrained, delayed, or noisy.",
    build:
      "The environment creates a space to test policy behavior when agents must share information carefully during high-stakes scenarios.",
    outcome:
      "It adds a distinct systems-and-agency angle to the portfolio's AI work.",
    challenges: [
      "Modeling communication as a first-class constraint",
      "Observing group behavior rather than single-agent outcomes",
      "Designing environments that reveal coordination failure modes"
    ],
    architecture: ["Environment rules engine", "Communication-aware agent loop", "Policy evaluation tooling"],
    featuredBias: 11,
    featuredReason: "Expands the AI narrative from single-agent logic into coordination systems."
  },
  MovieNestApp: {
    summary: "A movie discovery app designed around delight, exploration, and mobile polish.",
    useCase: "Mobile-first cinema browsing and recommendation experience.",
    discipline: "Mobile Products",
    techStack: ["Swift", "iOS", "API Integration", "UI Design"],
    problem: "Content discovery products often surface data well but fail to feel memorable or personal.",
    build:
      "This project focuses on app flow, browsing ergonomics, and a polished presentation layer for movie exploration.",
    outcome:
      "It shows your range beyond AI by demonstrating taste, pacing, and native mobile craft.",
    challenges: [
      "Making content-heavy interfaces feel calm and navigable",
      "Structuring reusable mobile views around media data",
      "Creating enough polish to make exploration feel premium"
    ],
    architecture: ["Swift client", "Media API integration", "Screen and state composition"],
    featuredBias: 9,
    featuredReason: "A strong product-design counterpoint to the research-heavy AI work."
  },
  dream11_ranking: {
    summary: "A motion-rich leaderboard for tracking fantasy cricket performance with friends.",
    useCase: "Social ranking surface for a fantasy sports group.",
    discipline: "Interactive Web",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP", "Supabase", "Chart.js"],
    featuredBias: 8,
    demoUrl: "https://samanyu-dev.github.io/dream11_ranking/"
  },
  dream11_dashboard: {
    summary: "A dashboard-driven companion for visualizing Dream11 data and rankings.",
    useCase: "Analytics-focused web dashboard for leaderboard insights.",
    discipline: "Interactive Web",
    techStack: ["HTML", "CSS", "JavaScript", "Dashboard UI"],
    categoryHint: "utilities"
  },
  Portfolio: {
    title: "Portfolio V1",
    summary: "An earlier personal site exploring front-end identity and interaction.",
    useCase: "Brand and interface playground for presenting work online.",
    discipline: "Interactive Web",
    techStack: ["JavaScript", "Responsive UI", "Interaction Design"],
    categoryHint: "utilities"
  },
  ExecuBot: {
    summary: "An early concept repo for agentic automation driven by plain-language commands.",
    useCase: "AI assistant idea focused on turning instructions into executable actions.",
    discipline: "Product Experiments",
    techStack: ["Agentic AI", "Automation", "Natural Language"],
    featuredBias: 6
  },
  nosh_api: {
    summary: "A backend-leaning build exploring API and systems workflows.",
    useCase: "Service-layer experiment for integrations and data exchange.",
    discipline: "Platforms & Data",
    techStack: ["C++", "API Design", "Systems Thinking"],
    categoryHint: "utilities"
  },
  lumyst_internship_task: {
    summary: "A shipping-focused internship exercise built around delivery speed and presentation.",
    useCase: "Execution sprint for an internship brief.",
    discipline: "Interactive Web",
    techStack: ["HTML", "CSS", "Rapid Prototyping"],
    categoryHint: "utilities"
  },
  tutordecentra: {
    summary: "A decentralized tutoring concept exploring trust and educational access.",
    useCase: "Education experiment around decentralization and peer-to-peer learning.",
    discipline: "Product Experiments",
    techStack: ["Concept Design", "Education", "Decentralization"],
    featuredBias: 5
  },
  HackInToTheFuture: {
    summary: "A hackathon-era web build shaped by speed, experimentation, and fast decision-making.",
    useCase: "Rapid launch surface for a time-boxed idea.",
    discipline: "Interactive Web",
    techStack: ["HTML", "CSS", "Hackathon Build"],
    categoryHint: "experimental"
  },
  robotics: {
    summary: "A lightweight GitHub Pages drop for publishing robotics paper solutions.",
    useCase: "Knowledge log and quick-share site for robotics notes.",
    discipline: "Product Experiments",
    techStack: ["HTML", "GitHub Pages", "Robotics"],
    categoryHint: "utilities",
    demoUrl: "https://samanyu-dev.github.io/robotics/"
  },
  "Samanyu-dev": {
    title: "Profile README",
    summary: "The profile repository that shapes the public first impression on GitHub itself.",
    useCase: "Identity layer for the broader GitHub presence.",
    discipline: "Product Experiments",
    techStack: ["Markdown", "Developer Branding"],
    categoryHint: "utilities"
  }
};

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
  codeforge: {
    title: "CodeForge AI",
    summary: "Architecting a multi-agent 'AI engineering org' with a cinematic command-center.",
    useCase: "Production-grade autonomous agent orchestration and visualization.",
    discipline: "AI Systems",
    techStack: ["React", "FastAPI", "WebSockets", "React Flow", "Zustand"],
    problem: "Visualizing complex autonomous agent interactions often feels static and disconnected from underlying logic.",
    build: "A high-fidelity command center with dynamic task graphs, real-time agent debates, and a streaming event bus.",
    outcome: "A cinematic, interactive system that makes AI reasoning observable and immersive.",
    challenges: [
      "Managing complex real-time state across multiple agents",
      "Building a performant, interactive task graph visualization",
      "Ensuring seamless integration between agent logic and the frontend"
    ],
    architecture: ["FastAPI Orchestrator", "React Flow Graph Engine", "WebSockets Event Stream"],
    featuredBias: 30,
    featuredReason: "Represents the signature 'AI Engineering Org' vision.",
    demoUrl: "https://huggingface.co/spaces/Sammy1808/codeforge"
  },
  echo: {
    title: "Echo",
    summary: "Where event invitation design meets cloud-native intelligence and cinematic mobile UX.",
    useCase: "Premium event invitation and collaborative workflow platform.",
    discipline: "Mobile Products",
    techStack: ["Flutter", "Dart", "Appwrite", "Riverpod", "GoRouter"],
    problem: "Event planning tools often lack the 'Apple-grade' polish that makes an invitation feel special.",
    build: "A motion-driven Flutter experience with Appwrite cloud-native sync and a sleek dark mobile interface.",
    outcome: "A cinematic event builder that makes every invitation feel like a premium product launch.",
    challenges: [
      "Crafting high-fidelity mobile animations and transitions",
      "Implementing efficient real-time cloud synchronization",
      "Designing a scalable feature-based module architecture"
    ],
    architecture: ["Flutter Client", "Appwrite BaaS", "Riverpod State Layer"],
    featuredBias: 28,
    featuredReason: "Mastery of mobile-first cinematic UX and cloud-native integration.",
    accentColor: "violet"
  },
  loomlane: {
    title: "Loomlane",
    summary: "Customised university merchandise system with a secure, scalable commerce backbone.",
    useCase: "Scalable e-commerce platform for customized university merchandise.",
    discipline: "Platforms & Data",
    techStack: ["MongoDB", "JWT", "OAuth", "Razorpay", "Stripe"],
    problem: "University merch systems require secure, multi-tenant workflows and robust payment integrations.",
    build: "A secure backend migration from Supabase to MongoDB, implementing complex JWT refresh flows and global payment gateways.",
    outcome: "A product-grade commerce system serving thousands of university students in India.",
    challenges: [
      "Migrating legacy data to MongoDB with zero downtime",
      "Implementing secure JWT and Google OAuth flows",
      "Integrating disparate payment systems like Razorpay and Stripe"
    ],
    architecture: ["Node.js/Express Backend", "MongoDB Data Layer", "Multi-Gateway Payment Integration"],
    featuredBias: 25,
    featuredReason: "Demonstrates real-world freelance execution and commerce scaling.",
    accentColor: "orange",
    demoUrl: "https://loomlane-one.vercel.app"
  },
  crisis_comm_env: {
    title: "Crisis Command",
    summary: "Multi-turn RL environment for training agents on high-stakes organizational communication.",
    useCase: "Stress-testing agent reasoning and communication-aware policies.",
    discipline: "AI Systems",
    techStack: ["Python", "Reinforcement Learning", "FastAPI", "OpenEnv"],
    problem: "Agents often struggle with cross-audience consistency and adversarial pressure during crises.",
    build: "A multi-turn tactical environment with a deterministic grader that penalizes contradictions and missed deadlines.",
    outcome: "A research-grade benchmark for observing emergent coordination failure modes.",
    challenges: [
      "Modeling communication as a first-class constraint",
      "Building a deterministic grader for subjective communication quality",
      "Designing adversarial scenarios that reveal reasoning gaps"
    ],
    architecture: ["OpenEnv Wrapper", "Deterministic Grader Engine", "Tactical Dashboard UI"],
    featuredBias: 26,
    featuredReason: "Expands the AI narrative from single-agent logic into coordination systems.",
    demoUrl: "https://huggingface.co/spaces/Sammy1808/crisis_comm"
  },
  "oracle-agent": {
    title: "Oracle Agent",
    summary: "In a world of noise and uncertainty, only the Oracle sees the path.",
    useCase: "Research-grade navigation agent integrating A*, MCTS, and Bayesian inference.",
    discipline: "AI Systems",
    techStack: ["Python", "MCTS", "Bayesian Inference", "Q-Learning"],
    problem: "Autonomous agents need to reason under deep uncertainty, not just chase rewards.",
    build: "A unified decision architecture combining probabilistic state estimation with simulation-based action evaluation.",
    outcome: "An adaptive agent capable of surviving hazards through intelligent sensor fusion.",
    challenges: [
      "Balancing path planning with uncertain sensor inputs",
      "Implementing efficient Monte Carlo Tree Search rollouts",
      "Fusing thermal and seismic sensor data for belief updates"
    ],
    architecture: ["Belief Engine (Bayes)", "Decision Engine (MCTS)", "Navigation Core (A*)"],
    featuredBias: 24,
    featuredReason: "Deep technical dive into probabilistic reasoning and search.",
    demoUrl: "https://huggingface.co/spaces/Sammy1808/oracleagent"
  },
  robot_vision: {
    title: "Robot Vision Lab",
    summary: "Transforming robotic perception math into an interactive engineering story.",
    useCase: "Premium simulation for kinematics, camera projection, and vision pipelines.",
    discipline: "AI Systems",
    techStack: ["Python", "OpenCV", "Plotly", "Streamlit", "NumPy"],
    problem: "Robotics math is often abstract and difficult to trust without observable proof.",
    build: "A real-time simulation connecting DH kinematics with pinhole camera projections on a 3D image plane.",
    outcome: "A high-fidelity dashboard that makes perception math physically observable.",
    challenges: [
      "Coordinating complex robotic transforms with camera-space projections",
      "Building a performant 3D visualization using Plotly/WebGL",
      "Simulating real-time vertex occlusion and image status"
    ],
    architecture: ["Kinematics Engine", "Projection Module", "Plotly Visualization Layer"],
    featuredBias: 22,
    featuredReason: "Exceptional presentation of complex geometric and vision concepts.",
    demoUrl: "https://samanyu-dev.github.io/robot_vision/"
  },
  MovieNestApp: {
    title: "MovieNest",
    summary: "Your ultimate movie discovery companion designed for delight and mobile polish.",
    useCase: "Intuitive movie discovery with clean architecture and global localization.",
    discipline: "Mobile Products",
    techStack: ["Swift", "SwiftUI", "Core Data", "MVVM", "TMDb API"],
    problem: "Discovery products often surface data well but fail to feel personal or ergonomically polished.",
    build: "A native iOS experience featuring smart watchlist management and a multi-language localization engine.",
    outcome: "A polished, production-ready app demonstrating mobile taste and clean software craft.",
    challenges: [
      "Implementing efficient image caching and lazy loading",
      "Maintaining architectural integrity with MVVM and Core Data",
      "Designing a localized experience for English, Hindi, and Telugu"
    ],
    architecture: ["SwiftUI View Layer", "MVVM Coordinator Pattern", "Core Data Persistence"],
    featuredBias: 20,
    featuredReason: "Strong product-design counterpoint to research-heavy work.",
    accentColor: "cyan"
  },
  dream11_ranking: {
    title: "Dream11 Tracker",
    summary: "A motion-rich leaderboard tracking performance through the lens of gamification.",
    useCase: "Interactive ranking system with XP, levels, and real-time celebrations.",
    discipline: "Interactive Web",
    techStack: ["JavaScript", "GSAP", "Supabase", "Chart.js"],
    problem: "Static leaderboards fail to engage users or communicate the emotional momentum of competition.",
    build: "A real-time dashboard with podium visualizations, XP systems, and confetti-driven level-up animations.",
    outcome: "An engaging, gamified surface that turns fantasy sports data into a living competition.",
    challenges: [
      "Integrating GSAP for smooth animated position changes",
      "Building a weighted scoring algorithm for unified rankings",
      "Managing real-time state synchronization with Supabase"
    ],
    architecture: ["Vanilla JS Frontend", "Supabase Realtime Backend", "GSAP Animation Engine"],
    featuredBias: 18,
    featuredReason: "High engagement through motion and intelligent scoring algorithms.",
    demoUrl: "https://samanyu-dev.github.io/dream11_ranking/",
    accentColor: "emerald"
  },
  GitInsights: {
    title: "GitInsights",
    summary: "Transforming raw contribution data into a compelling technical narrative.",
    useCase: "Developer intelligence suite with AI narratives and 3D visualizations.",
    discipline: "Platforms & Data",
    techStack: ["React Three Fiber", "GitHub API", "OpenAI", "Analytics Engine"],
    featuredBias: 25,
    featuredReason: "Immersive 3D data visualization."
  }
};

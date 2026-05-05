import type { Hackathon, SkillDomain } from "@/types";

export const skillDomains: SkillDomain[] = [
  {
    title: "AI / ML",
    description: "Modeling, learning systems, automation, and applied AI workflows.",
    skills: ["ML", "RL", "DL", "NLP", "Robotics", "Automation", "Ollama", "HuggingFace", "OpenAI"],
    color: "primary"
  },
  {
    title: "Web Dev",
    description: "Modern interfaces and API-connected full-stack product surfaces.",
    skills: ["React.js", "Next.js", "TypeScript", "Node.js", "PHP", "REST APIs"],
    color: "secondary"
  },
  {
    title: "Backend",
    description: "Auth, data, integrations, payments, and deployment-minded systems.",
    skills: ["Python", "MongoDB", "Supabase", "Docker", "Git", "JWT", "OAuth", "Stripe", "Razorpay"],
    color: "accent"
  },
  {
    title: "App Dev",
    description: "Cross-platform mobile apps and native-feeling product experiences.",
    skills: ["Flutter", "SwiftUI", "iOS", "Cross-platform", "Krea API"],
    color: "blue"
  }
];

export const hackathons: Hackathon[] = [
  {
    title: "Meta OpenEnv HF Scaler",
    result: "Finals",
    details: "Built and presented an AI environment concept through the finals track."
  },
  {
    title: "IQC World Quant Brain 2025",
    result: "Top 20%",
    details: "Ranked in the top 20% through quantitative problem-solving challenges."
  }
];

import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export type ProjectCategory = "AI/ML" | "Web" | "Backend" | "Mobile";

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  accent: "primary" | "secondary" | "accent";
  repoStatus?: "verified" | "not-public";
};

export type MiniProject = {
  title: string;
  description: string;
  githubUrl: string;
  language?: string;
  repoStatus: "verified" | "not-public";
};

export type SkillDomain = {
  title: string;
  description: string;
  skills: string[];
  color: "primary" | "secondary" | "accent" | "blue";
};

export type Hackathon = {
  title: string;
  result: string;
  details: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

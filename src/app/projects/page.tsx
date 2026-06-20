import type { Metadata } from "next";
import { ProjectsPage as ProjectsPageContent } from "@/components/site/pages/ProjectsPage";
import { getPortfolioIntelligence } from "@/lib/github-intelligence";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ranked projects with architecture-level details, metrics, and deployment links."
};

export default async function ProjectsPage() {
  const data = await getPortfolioIntelligence();
  return <ProjectsPageContent projects={data.projects} />;
}

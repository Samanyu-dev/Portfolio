import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailExperience } from "@/components/portfolio/ProjectDetailExperience";
import { AppShell } from "@/components/ui/AppShell";
import { getPortfolioData, getProjectBySlug } from "@/lib/portfolio-data";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.repositories.map((repo) => ({ slug: repo.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const repo = await getProjectBySlug(params.slug);

  if (!repo) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: repo.title,
    description: repo.summary,
    openGraph: {
      title: repo.title,
      description: repo.summary,
      url: `/projects/${repo.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: repo.title,
      description: repo.summary
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const data = await getPortfolioData();
  const repo = data.repositories.find((item) => item.slug === params.slug);

  if (!repo) {
    notFound();
  }

  return (
    <AppShell>
      <ProjectDetailExperience repo={repo} allRepos={data.repositories} />
    </AppShell>
  );
}

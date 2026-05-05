import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/portfolio-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samanyu-portfolio.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();

  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...data.repositories.map((repo) => ({
      url: `${siteUrl}/projects/${repo.slug}`,
      lastModified: new Date(repo.timeline.updatedAt)
    }))
  ];
}

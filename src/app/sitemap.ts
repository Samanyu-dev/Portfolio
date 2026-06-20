import type { MetadataRoute } from "next";
import { getPortfolioIntelligence } from "@/lib/github-intelligence";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioIntelligence();

  return [
    {
      url: `${siteConfig.baseUrl}/`,
      lastModified: new Date()
    },
    {
      url: `${siteConfig.baseUrl}/projects`,
      lastModified: new Date(data.generatedAt)
    },
    {
      url: `${siteConfig.baseUrl}/experience`,
      lastModified: new Date()
    },
    {
      url: `${siteConfig.baseUrl}/contact`,
      lastModified: new Date()
    }
  ];
}

"use client";

import { PortfolioV2Home } from "@/components/portfolio-v2/PortfolioV2Home";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

type HomePageProps = {
  data: PortfolioIntelligence;
};

export function HomePage({ data }: HomePageProps) {
  return <PortfolioV2Home data={data} />;
}

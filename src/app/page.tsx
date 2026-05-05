import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";
import { AppShell } from "@/components/ui/AppShell";
import { getPortfolioData } from "@/lib/portfolio-data";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <AppShell>
      <PortfolioExperience data={data} />
    </AppShell>
  );
}

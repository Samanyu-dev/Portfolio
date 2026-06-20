import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { SkillGalaxy } from "@/components/three/SkillGalaxy";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/lib/site";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";

type HomePageViewProps = {
  data: PortfolioIntelligence;
};

export function HomePageView({ data }: HomePageViewProps) {
  const topProjects = data.projects.slice(0, 3);

  return (
    <div className="space-y-10 sm:space-y-14">
      <HomeHero />

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Public Repositories" value={String(data.github.publicRepos)} />
          <StatCard label="Active Projects" value={String(data.github.activeProjects)} />
          <StatCard label="Total Stars" value={String(data.github.totalStars)} />
          <StatCard label="Technologies" value={String(data.techStackSummary.length)} />
        </div>
      </Reveal>

      <Reveal className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]" delay={0.08}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-2">Skill Visualization</p>
          <h2 className="section-title mt-2 text-2xl text-text-0 sm:text-3xl">Interactive technology graph</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-1">
            Built from live repository signals — explore depth on the dedicated projects page.
          </p>
          <div className="mt-5">
            <SkillGalaxy skills={data.techStackSummary} />
          </div>
          <Link
            href="/projects"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-a transition duration-200 hover:text-brand-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a"
          >
            Open full project atlas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <aside className="space-y-4">
          <div className="panel p-5">
            <p className="text-sm font-semibold text-text-0">Professional Headline</p>
            <p className="mt-2 text-sm leading-relaxed text-text-1">{siteConfig.headline}</p>
          </div>
          <div className="panel p-5">
            <p className="text-sm font-semibold text-text-0">Top Ranked Projects</p>
            <ul className="mt-3 space-y-3">
              {topProjects.map((project) => (
                <li key={project.slug}>
                  <Link href="/projects" className="block cursor-pointer rounded-xl border border-white/10 p-3 transition duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a">
                    <p className="text-sm font-semibold text-text-0">#{project.rank} {project.name}</p>
                    <p className="mt-1 text-xs text-text-2">{project.category} · Score {project.qualityScore}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel flex flex-wrap gap-2 p-5">
            <QuickNavLink href="/experience" label="Experience" />
            <QuickNavLink href="/contact" label="Contact" />
          </div>
        </aside>
      </Reveal>
    </div>
  );
}

function QuickNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-text-1 transition duration-200 hover:bg-white/10 hover:text-text-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-2">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-text-0">{value}</p>
    </div>
  );
}

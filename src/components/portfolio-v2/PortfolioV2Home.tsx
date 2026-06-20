"use client";

import { AnimatePresence } from "motion/react";
import type { PortfolioIntelligence } from "@/types/portfolio-v2";
import { experienceNodes } from "@/data/profile";
import { ExperienceFlowTree } from "@/components/experience/ExperienceFlowTree";
import { EngineeringLoader, useEngineeringLoader } from "./EngineeringLoader";
import { HeroSection } from "./HeroSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsEcosystem } from "./SkillsEcosystem";
import { AchievementsSection } from "./AchievementsSection";
import { ContactSection } from "./ContactSection";
import { SectionIntro } from "./SectionIntro";

type PortfolioV2HomeProps = {
  data: PortfolioIntelligence;
};

export function PortfolioV2Home({ data }: PortfolioV2HomeProps) {
  const { ready, showLoader, complete } = useEngineeringLoader();

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <EngineeringLoader projects={data.projects} onComplete={complete} />
        ) : null}
      </AnimatePresence>

      {ready ? (
        <div className="bg-bg-0">
          <HeroSection data={data} />
          <ProjectsSection projects={data.projects} />

          <section id="experience" className="scroll-mt-24 bg-bg-1 py-24 text-text-0 sm:py-32">
            <div className="site-container">
              <SectionIntro
                eyebrow="Experience"
                title="Career journey"
                description="Interactive growth path across internships and engineering roles — click nodes to explore each chapter."
              />
              <div className="mt-12">
                <ExperienceFlowTree items={experienceNodes} />
              </div>
            </div>
          </section>

          <SkillsEcosystem data={data} />
          <AchievementsSection />
          <ContactSection />
        </div>
      ) : null}
    </>
  );
}

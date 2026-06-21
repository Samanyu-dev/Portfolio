import type { Metadata } from "next";
import { ExperiencePage as ExperiencePageContent } from "@/components/site/pages/ExperiencePage";
import { achievements, education, experienceNodes } from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career evolution flow map with roles, responsibilities, achievements, and skill growth."
};

export default function ExperiencePage() {
  return <ExperiencePageContent experience={experienceNodes} education={education} achievements={achievements} />;
}

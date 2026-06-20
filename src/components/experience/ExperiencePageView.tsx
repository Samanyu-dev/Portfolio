import { SectionIntro } from "@/components/shared/SectionIntro";
import { ExperienceFlowTree } from "@/components/experience/ExperienceFlowTree";
import type { EducationEntry, ExperienceNode } from "@/types/portfolio-v2";

type ExperiencePageViewProps = {
  experience: ExperienceNode[];
  education: EducationEntry[];
  achievements: string[];
};

export function ExperiencePageView({ experience, education, achievements }: ExperiencePageViewProps) {
  return (
    <div className="space-y-8">
      <SectionIntro
        eyebrow="Experience"
        title="Career evolution tree"
        description="A flow-map of roles, skill expansion, and execution depth across product engineering, backend systems, and applied AI work, reconciled from resume and public profile data."
      />

      <ExperienceFlowTree items={experience} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="section-title text-xl text-text-0">Education</h2>
          <ul className="mt-3 space-y-3 text-sm text-text-1">
            {education.map((item) => (
              <li key={item.institution} className="rounded-xl border border-white/10 p-3">
                <p className="font-semibold text-text-0">{item.institution}</p>
                <p>{item.degree}</p>
                <p className="text-xs text-text-2">{item.period}</p>
                <p className="mt-1">{item.details}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel p-5">
          <h2 className="section-title text-xl text-text-0">Selected Achievements</h2>
          <ul className="mt-3 space-y-2 text-sm text-text-1">
            {achievements.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 p-3">• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/Reveal";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function SectionIntro({ eyebrow, title, description, actions }: SectionIntroProps) {
  return (
    <Reveal className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-2">{eyebrow}</p>
        <h1 className="section-title text-3xl font-semibold leading-tight text-text-0 sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text-1 sm:text-base">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </Reveal>
  );
}

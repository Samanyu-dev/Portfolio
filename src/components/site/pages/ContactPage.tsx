"use client";

import { BriefcaseBusiness, FileText, GitBranch, Globe, Mail } from "lucide-react";
import { RevealBlock } from "@/components/site/RevealBlock";
import type { ContactData } from "@/types/portfolio-v2";

type ContactPageProps = {
  contact: ContactData;
};

const CHANNELS = [
  { key: "resume", label: "Resume", icon: FileText, getHref: (c: ContactData) => c.resumePath, external: true },
  { key: "github", label: "GitHub", icon: GitBranch, getHref: (c: ContactData) => c.github, external: true },
  { key: "linkedin", label: "LinkedIn", icon: BriefcaseBusiness, getHref: (c: ContactData) => c.linkedin, external: true },
  { key: "email", label: "Email", icon: Mail, getHref: (c: ContactData) => `mailto:${c.email}`, external: false },
  { key: "site", label: "Portfolio", icon: Globe, getHref: (c: ContactData) => c.website ?? "/", external: true }
] as const;

export function ContactPage({ contact }: ContactPageProps) {
  return (
    <section className="relative -mx-4 min-h-[min(85vh,720px)] overflow-hidden rounded-none sm:-mx-6 lg:-mx-8">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in srgb, #1e3a5f 80%, transparent), transparent), linear-gradient(180deg, var(--bg-0) 0%, #0a0e18 40%, #12182a 100%)"
        }}
      />

      <div className="relative flex min-h-[min(85vh,720px)] flex-col justify-center px-6 py-20 sm:px-12 lg:px-16">
        <RevealBlock>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-2">Connect</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-text-0 sm:text-5xl lg:text-6xl">
            Let&apos;s build something amazing together.
          </h1>
        </RevealBlock>

        <RevealBlock className="mt-14 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-12" delay={0.1}>
          {CHANNELS.map(({ key, label, icon: Icon, getHref, external }) => {
            const href = getHref(contact);
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/30 transition group-hover:bg-cyan-500/25 group-hover:text-cyan-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-base font-medium text-text-1 transition group-hover:text-text-0">{label}</span>
              </>
            );

            const isMail = key === "email";

            if (isMail || !external) {
              return (
                <a
                  key={key}
                  href={href}
                  className="group flex cursor-pointer items-center gap-4 transition duration-200"
                >
                  {inner}
                </a>
              );
            }

            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex cursor-pointer items-center gap-4 transition duration-200"
              >
                {inner}
              </a>
            );
          })}
        </RevealBlock>

        <RevealBlock className="mt-16 max-w-xl" delay={0.15}>
          <p className="text-sm leading-relaxed text-text-2">
            Open for internships, hackathon teams, and product-focused AI / full stack collaborations. Based in Hyderabad,
            India — happy to work remote.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

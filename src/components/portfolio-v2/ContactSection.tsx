"use client";

import { BriefcaseBusiness, FileText, GitBranch, Mail } from "lucide-react";
import { contactData } from "@/data/profile";
import { SectionIntro } from "./SectionIntro";

const LINKS = [
  { label: "Email", href: `mailto:${contactData.email}`, icon: Mail },
  { label: "LinkedIn", href: contactData.linkedin, icon: BriefcaseBusiness },
  { label: "GitHub", href: contactData.github, icon: GitBranch },
  { label: "Resume", href: contactData.resumePath, icon: FileText }
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-bg-1 py-24 text-text-0 sm:py-32">
      <div className="site-container">
        <SectionIntro
          eyebrow="Contact"
          title="Let's build something great"
          description="Open to internships, full-time roles, hackathon teams, and ambitious product collaborations."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noreferrer"}
              className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-line bg-card p-6 transition hover:border-brand-a/50 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-b/10 text-brand-a">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold group-hover:text-brand-a">{label}</span>
            </a>
          ))}
        </div>

        <p className="mt-10 text-sm text-text-2">{contactData.email}</p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { BriefcaseBusiness, Check, Copy, Download, ExternalLink, GitBranch, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SectionIntro } from "@/components/shared/SectionIntro";
import type { ContactData } from "@/types/portfolio-v2";

type ContactPageViewProps = {
  contact: ContactData;
};

export function ContactPageView({ contact }: ContactPageViewProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionIntro
        eyebrow="Contact"
        title="Let’s build the next high-leverage product"
        description="Available for internships, engineering collaborations, hackathon teams, and product-focused AI/full stack opportunities."
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-6">
          <h2 className="section-title text-xl text-text-0">Primary Contact</h2>

          <div className="mt-4 space-y-3">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> {contact.email}
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
            >
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
            >
              <span className="inline-flex items-center gap-2">
                <GitBranch className="h-4 w-4" /> GitHub
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>

            {contact.huggingface ? (
              <a
                href={contact.huggingface}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
              >
                <span className="inline-flex items-center gap-2">
                  <GitBranch className="h-4 w-4" /> Hugging Face
                </span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}

            {contact.phone ? (
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-text-1 transition hover:bg-white/5 hover:text-text-0"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {contact.phone}
                </span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-text-1 transition hover:bg-white/10 hover:text-text-0"
            >
              {copied ? <Check className="h-4 w-4 text-brand-c" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>

            <a
              href={contact.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-full bg-brand-b px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-a"
            >
              <Download className="h-4 w-4" /> Download resume
            </a>
          </div>
        </section>

        <section className="panel overflow-hidden p-6">
          <h2 className="section-title text-xl text-text-0">Resume Preview</h2>
          <p className="mt-2 text-sm text-text-1">Open the latest PDF in a new tab or download instantly.</p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-2">Samanyu Resume</p>
            <p className="mt-2 text-sm text-text-1">Two-page profile with role history, technical stack, projects, and hackathon outcomes.</p>
            <a
              href={contact.resumePath}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-text-1 transition hover:bg-white/10 hover:text-text-0"
            >
              Open in new tab <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

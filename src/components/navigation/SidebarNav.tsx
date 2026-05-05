"use client";

import { motion } from "framer-motion";
import { Blocks, FolderGit2, House, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: House },
  { id: "skills", label: "Skills", icon: Blocks },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail }
] as const;

export function SidebarNav() {
  const [activeId, setActiveId] = useState<(typeof navItems)[number]["id"]>("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id as (typeof navItems)[number]["id"]);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0.15, 0.35, 0.55, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: (typeof navItems)[number]["id"]) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4 md:bottom-auto md:top-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto rounded-full border border-white/10 bg-slate-950/72 p-2 shadow-[0_20px_80px_rgba(8,15,35,0.55)] backdrop-blur-2xl"
      >
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  title={item.label}
                  aria-label={item.label}
                  aria-pressed={isActive}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                    isActive && "text-white"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-bubble"
                      className="absolute inset-0 rounded-full border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.22),rgba(129,140,248,0.18),rgba(168,85,247,0.18))] shadow-[0_0_30px_rgba(56,189,248,0.18)]"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  ) : null}
                  <Icon className="relative z-10 h-4.5 w-4.5" />
                  <span className="sr-only">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { NavThemeToggle } from "@/components/site/NavThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", hash: "#hero" },
  { href: "/#projects", label: "Projects", hash: "#projects" },
  { href: "/#experience", label: "Experience", hash: "#experience" },
  { href: "/#skills", label: "Skills", hash: "#skills" },
  { href: "/projects", label: "Showcase", hash: null },
  { href: "/#contact", label: "Contact", hash: "#contact" }
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const isProjects = pathname === "/projects";
  const isHero = pathname === "/" || isProjects;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6",
        isProjects && "pointer-events-none [&_*]:pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 shadow-lg backdrop-blur-xl sm:px-5",
          isHero && pathname === "/"
            ? "border-white/15 bg-black/55 text-white"
            : isProjects
              ? "border-white/15 bg-black/50 text-white"
              : "border-line bg-card/90 text-text-0"
        )}
      >
        <Link href="/" className="group flex shrink-0 items-baseline gap-0.5">
          <span className="font-logo text-2xl transition group-hover:text-brand-a sm:text-[1.65rem]">Samanyu</span>
          <span className="font-mono text-sm font-medium text-brand-a">.dev</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active =
              link.href === "/projects"
                ? pathname === "/projects"
                : pathname === "/" && link.hash
                  ? false
                  : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition duration-200",
                  active ? "text-text-0" : "text-text-2 hover:text-text-0",
                  isHero && pathname === "/" && !active && "text-white/70 hover:text-white"
                )}
              >
                {active && !reduced ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <NavThemeToggle className="hidden sm:flex" />
          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-card p-3 shadow-xl md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

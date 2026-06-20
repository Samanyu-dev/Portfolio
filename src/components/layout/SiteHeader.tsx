"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
      style={{ backgroundColor: "var(--surface-strong)" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-[0.14em] text-text-0 transition duration-200 hover:text-brand-a focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a"
        >
          {siteConfig.shortName.toUpperCase()}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a",
                  active ? "text-text-0" : "text-text-2 hover:text-text-0"
                )}
                aria-current={active ? "page" : undefined}
              >
                {active && !reducedMotion ? (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : active ? (
                  <span className="absolute inset-0 rounded-full bg-white/10" />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/samanyu_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-text-1 transition duration-200 hover:bg-white/10 hover:text-text-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a sm:inline-flex"
          >
            Resume
            <Download className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="flex items-center justify-center gap-1 border-t border-white/5 px-2 py-2 md:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a",
                active ? "bg-brand-b text-white" : "text-text-2 hover:text-text-0"
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

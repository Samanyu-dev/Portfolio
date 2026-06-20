"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, House, Layers3, Mail, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: typeof House;
};

const items: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/projects", label: "Projects", icon: Layers3 },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/contact", label: "Contact", icon: Mail }
];

export function RightRailNav() {
  const pathname = usePathname();

  return (
    <aside className="pointer-events-none fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <nav aria-label="Primary" className="pointer-events-auto glass rounded-3xl p-3">
        <ul className="flex flex-col gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-2xl text-text-2 transition hover:text-text-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-a",
                    active && "text-text-0"
                  )}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                >
                  {active ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-2xl bg-[linear-gradient(140deg,rgba(79,140,255,0.28),rgba(123,223,246,0.2))]"
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    />
                  ) : null}
                  <Icon className="relative z-10 h-4 w-4" />
                </Link>
              </li>
            );
          })}
          <li className="mt-1 border-t border-white/10 pt-2">
            <a
              href="https://github.com/Samanyu-dev"
              target="_blank"
              rel="noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-2xl text-text-2 transition hover:text-text-0"
              aria-label="Open GitHub profile"
            >
              <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

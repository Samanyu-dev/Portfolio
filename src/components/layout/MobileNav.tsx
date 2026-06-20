"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BriefcaseBusiness, House, Layers3, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:hidden">
      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass mb-2 w-[min(80vw,240px)] rounded-2xl p-2"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-1 transition hover:bg-white/10 hover:text-text-0",
                        active && "bg-white/10 text-text-0"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="glass flex h-12 w-12 items-center justify-center rounded-full text-text-0 shadow-pane"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}

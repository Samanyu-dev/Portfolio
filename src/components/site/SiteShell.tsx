"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { PageTransition } from "@/components/site/PageTransition";
import { PreloaderGate } from "@/components/site/TerminalPreloader";
import { SiteNav } from "@/components/site/SiteNav";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects";

  return (
    <div className={cn("relative min-h-screen text-text-0", isProjects ? "bg-[#050508]" : "bg-bg-0")}>
      {!isHome && !isProjects ? <FluidParticlesBackground fixed particleCount={800} /> : null}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      {isProjects ? (
        <PreloaderGate>
          <div className="fixed inset-x-0 bottom-0 top-[4.5rem] z-0 flex flex-col">
            <PageTransition className="h-full min-h-0 flex-1">{children}</PageTransition>
          </div>
        </PreloaderGate>
      ) : (
        <div
          id="main-content"
          className={cn("relative z-0", !isHome && "site-container pb-16 pt-24 sm:pt-28")}
        >
          <PageTransition>{children}</PageTransition>
        </div>
      )}
    </div>
  );
}

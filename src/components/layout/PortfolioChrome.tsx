"use client";

import type { PropsWithChildren } from "react";
import { SiteShell } from "@/components/site/SiteShell";

export function PortfolioChrome({ children }: PropsWithChildren) {
  return <SiteShell>{children}</SiteShell>;
}

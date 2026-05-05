"use client";

import type { PropsWithChildren } from "react";
import { CustomCursor } from "@/components/animations/CustomCursor";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}

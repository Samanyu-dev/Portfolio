"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type NavThemeToggleProps = {
  className?: string;
};

export function NavThemeToggle({ className }: NavThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <div className={cn("flex items-center gap-2 text-xs font-medium text-text-2", className)}>
      <span className={cn(!isDark && "text-text-0")}>Light</span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className="relative h-6 w-11 cursor-pointer rounded-full bg-white/15 transition"
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
            isDark ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
      <span className={cn(isDark && "text-text-0")}>Dark</span>
    </div>
  );
}

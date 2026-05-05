"use client";

import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  return {
    theme: activeTheme,
    setTheme,
    toggleTheme: () => setTheme(activeTheme === "dark" ? "light" : "dark")
  };
}

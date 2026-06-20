import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        line: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        primary: "var(--primary)",
        "bg-0": "var(--bg-0)",
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        "text-0": "var(--text-0)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "brand-a": "var(--brand-a)",
        "brand-b": "var(--brand-b)",
        "brand-c": "var(--brand-c)"
      },
      fontFamily: {
        sans: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        display: ["var(--font-archivo)", "Archivo", "sans-serif"],
        body: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(123, 223, 246, 0.32)",
        pane: "0 20px 60px rgba(6, 8, 18, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#07060e",
        "bg-secondary": "#0c0a18",
        "bg-surface": "#110e22",
        "neon-purple": "#9b5cff",
        "electric-blue": "#00d4ff",
        "accent-magenta": "#ff3cac",
        "text-primary": "#f0eeff",
        "text-secondary": "#a09cbf",
        "text-muted": "#6b6690"
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Sora", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"]
      },
      boxShadow: {
        "glow-purple": "0 0 60px rgba(155, 92, 255, 0.25)",
        "glow-blue": "0 0 60px rgba(0, 212, 255, 0.2)",
        "glow-magenta": "0 0 60px rgba(255, 60, 172, 0.18)",
        "glow-subtle": "0 20px 80px rgba(155, 92, 255, 0.12)"
      },
      animation: {
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        shimmer: "shimmer 2s ease infinite"
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(4px) rotate(-1deg)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" }
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      backgroundSize: {
        "400": "400% 400%"
      }
    }
  },
  plugins: []
};

export default config;

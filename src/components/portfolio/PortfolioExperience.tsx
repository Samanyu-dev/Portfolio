"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Home, Sparkles, Folder, Briefcase, Mail, Settings, Volume2, VolumeX } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { HeroScreen } from "@/components/scenes/HeroScreen";
import { SkillsScreen } from "@/components/scenes/SkillsScreen";
import { ProjectsScreen } from "@/components/scenes/ProjectsScreen";
import { Scene } from "@/components/Hero/Scene";
import { SideNav } from "@/components/SideNav";
import { ExperienceScreen } from "@/components/scenes/ExperienceScreen";
import { ContactScreen } from "@/components/scenes/ContactScreen";
import { CommandPalette } from "@/components/portfolio/CommandPalette";

const screens = [
  { id: "home", label: "Home", icon: Home },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail }
] as const;

type ScreenId = (typeof screens)[number]["id"];

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function PortfolioExperience({ data }: { data: PortfolioData }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [active, setActive] = useState<ScreenId>("home");
  const [visualMode, setVisualMode] = useState<"neural" | "focus" | "system">("neural");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [focusedTech, setFocusedTech] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Synthetic Audio Engine
  const playSound = useCallback((type: "click" | "ping" | "transition") => {
    if (!audioEnabled || typeof window === "undefined") return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "ping") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  }, [audioEnabled]);

  const navigate = useCallback((id: string) => {
    setActive(id as ScreenId);
    playSound("click");
  }, [playSound]);

  // Palette & Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      
      if (!introComplete || paletteOpen) return;

      const idx = screens.findIndex((s) => s.id === active);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive(screens[(idx + 1) % screens.length].id);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive(screens[(idx - 1 + screens.length) % screens.length].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, introComplete, paletteOpen]);

  return (
    <>
      {/* Intro splash */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Command Palette */}
      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette 
            onNavigate={navigate} 
            setMode={(m: string) => setVisualMode(m as any)}
            toggleAudio={() => setAudioEnabled(prev => !prev)}
            onClose={() => setPaletteOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Main app — render underneath intro during animation */}
      <div
        className={`relative h-screen w-full overflow-hidden bg-bg-primary transition-colors duration-1000 ${
          visualMode === "focus" ? "bg-[#050505]" : 
          visualMode === "system" ? "bg-[#0a0a0f]" : "bg-bg-primary"
        }`}
        style={{ visibility: introComplete ? "visible" : "hidden" }}
      >
        {/* Global Cinematic Background */}
        {introComplete && <Scene />}

        {/* System Overlays for "System" Mode */}
        <AnimatePresence>
          {visualMode === "system" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 z-[5] grid grid-cols-12 grid-rows-12 opacity-20"
            >
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/10" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Noise overlay */}
        <div className={`pointer-events-none absolute inset-0 z-10 noise-overlay transition-opacity duration-700 ${
          visualMode === "focus" ? "opacity-5" : "opacity-20"
        }`} />

        {/* Utility Controls (Audio) */}
        <div className="fixed right-6 top-6 z-50 flex items-center gap-4">
          <button
            onClick={() => {
              setAudioEnabled(prev => !prev);
              if (!audioEnabled) playSound("ping");
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition-all ${
              audioEnabled ? "bg-neon-purple/20 text-neon-purple border-neon-purple/30 shadow-glow-purple" : "bg-bg-primary/40 text-text-muted hover:text-white"
            }`}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>        <SideNav active={active} onNavigate={navigate} />

        {/* Screen content */}
        <main className="absolute inset-0 z-10 overflow-hidden md:pl-[60px]" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="wait">
            <motion.section
              key={active}
              onPanEnd={(e, info) => {
                const threshold = 50;
                const idx = screens.findIndex((s) => s.id === active);
                if (info.offset.x < -threshold) {
                  setActive(screens[(idx + 1) % screens.length].id);
                  playSound("click");
                } else if (info.offset.x > threshold) {
                  setActive(screens[(idx - 1 + screens.length) % screens.length].id);
                  playSound("click");
                }
              }}
              className="absolute inset-0 flex flex-col pt-[72px] pb-[80px] md:pb-4"
              initial={{ opacity: 0, z: -100, rotateX: 5, scale: 0.95 }}
              animate={{ opacity: 1, z: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, z: 100, rotateX: -5, scale: 1.05 }}
              transition={{ ...transition, duration: 0.8 }}
            >
              {active === "home" && (
                <HeroScreen profile={data.profile} roles={data.roles} onNavigate={navigate} />
              )}
              {active === "skills" && (
                <SkillsScreen 
                  clusters={data.skillClusters} 
                  onHoverNode={(node) => {
                    setFocusedTech(node);
                    if (node) playSound("ping");
                  }} 
                />
              )}
              {active === "projects" && (
                <ProjectsScreen 
                  projects={data.repositories} 
                  onHoverProject={(tech) => {
                    setFocusedTech(tech);
                    if (tech) playSound("ping");
                  }}
                />
              )}
              {active === "experience" && <ExperienceScreen data={data} />}
              {active === "contact" && <ContactScreen profile={data.profile} />}
            </motion.section>
          </AnimatePresence>
        </main>

        {/* Progress indicator */}
        <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          {screens.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              data-cursor="interactive"
              className={`h-2 w-2 rounded-full transition-all duration-400 ${
                item.id === active
                  ? "h-6 bg-neon-purple shadow-[0_0_12px_rgba(155,92,255,0.5)]"
                  : "bg-white/15 hover:bg-white/30"
              }`}
              aria-label={`Go to ${item.label}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

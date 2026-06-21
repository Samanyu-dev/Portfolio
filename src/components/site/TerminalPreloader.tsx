"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site";

const MODULES = [
  { name: "experience.so", detail: "5 roles loaded" },
  { name: "projects.so", detail: "portfolio ready" },
  { name: "skills.so", detail: "AI · Full-Stack · Mobile" },
  { name: "github.so", detail: "repos synced" }
];

type TerminalPreloaderProps = {
  onComplete: () => void;
};

export function TerminalPreloader({ onComplete }: TerminalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadedModules, setLoadedModules] = useState(0);
  const [phase, setPhase] = useState<"script" | "init" | "build">("script");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("init"), 2200);
    const t2 = setTimeout(() => setPhase("build"), 3800);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2));
      setLoadedModules((m) => Math.min(MODULES.length, m + (Math.random() > 0.55 ? 1 : 0)));
    }, 55);

    const done = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoadedModules(MODULES.length);
      setTimeout(onComplete, 400);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(done);
      clearInterval(interval);
    };
  }, [onComplete]);

  const barFilled = Math.floor((progress / 100) * 24);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a0c12] p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-white/40">bash — 80×24</span>
        </div>

        <div className="space-y-3 p-5 font-mono text-sm leading-relaxed">
          <p>
            <span className="text-cyan-400">~$</span> <span className="text-white/90">cat samanyu.sh</span>
          </p>

          <pre className="overflow-x-auto text-[13px] text-white/75">
            <span className="text-violet-400">#!/bin/bash</span>
            {"\n"}
            <span className="text-white/40"># {siteConfig.name}</span>
            {"\n"}
            <span className="text-white/40"># App Developer + AI Engineer + Backend Developer + MLOps</span>
            {"\n\n"}
            <span className="text-violet-400">export</span> STACK=
            <span className="text-cyan-300">&quot;Next.js · React · Python · Flutter · AI&quot;</span>
            {"\n"}
            <span className="text-violet-400">echo</span> <span className="text-cyan-300">&quot;Welcome to samanyu.dev&quot;</span>
          </pre>

          <p>
            <span className="text-cyan-400">~$</span> <span className="text-white/90">./samanyu.sh</span>
          </p>

          {phase !== "script" ? (
            <div className="space-y-1.5 pt-1">
              <p>
                <span className="text-amber-400">[init]</span> <span className="text-white/80">Loading modules...</span>
              </p>
              {MODULES.slice(0, loadedModules).map((mod) => (
                <p key={mod.name} className="text-emerald-400">
                  ✓ {mod.name} <span className="text-white/40">({mod.detail})</span>
                </p>
              ))}
            </div>
          ) : null}

          {phase === "build" ? (
            <div className="pt-2">
              <p className="mb-2">
                <span className="text-amber-400">[build]</span> <span className="text-white/80">Compiling portfolio...</span>
              </p>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-white/50">[{progress}%]</span>
                <span className="text-emerald-400">
                  {"█".repeat(barFilled)}
                  <span className="text-white/20">{"░".repeat(Math.max(0, 24 - barFilled))}</span>
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function PreloaderGate({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const seen = sessionStorage.getItem("samanyu-preloader-seen");
    if (seen !== "1") setShow(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("samanyu-preloader-seen", "1");
    setShow(false);
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-[#050508]" />;
  }

  return (
    <>
      {children}
      <AnimatePresence>{show ? <TerminalPreloader onComplete={handleComplete} /> : null}</AnimatePresence>
    </>
  );
}

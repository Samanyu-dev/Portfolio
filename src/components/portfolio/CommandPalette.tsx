"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Terminal, 
  Home, 
  Sparkles, 
  Folder, 
  Briefcase, 
  Mail, 
  Download,
  Command,
  Cpu,
  Zap,
  Eye,
  Settings,
  Volume2
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: any;
  action: () => void;
  category: string;
  shortcut?: string;
}

export function CommandPalette({ 
  onNavigate, 
  onClose,
  setMode,
  toggleAudio
}: { 
  onNavigate: (screen: string) => void;
  onClose: () => void;
  setMode: (mode: string) => void;
  toggleAudio: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    { id: "home", label: "Navigate to Home", icon: Home, action: () => onNavigate("home"), category: "Navigation" },
    { id: "skills", label: "Navigate to Skills", icon: Sparkles, action: () => onNavigate("skills"), category: "Navigation" },
    { id: "projects", label: "Navigate to Projects", icon: Folder, action: () => onNavigate("projects"), category: "Navigation" },
    { id: "experience", label: "Navigate to Experience", icon: Briefcase, action: () => onNavigate("experience"), category: "Navigation" },
    { id: "contact", label: "Navigate to Contact", icon: Mail, action: () => onNavigate("contact"), category: "Navigation" },
    
    { id: "mode-neural", label: "Switch to Neural Mode", icon: Cpu, action: () => setMode("neural"), category: "Modes", shortcut: "N" },
    { id: "mode-focus", label: "Switch to Focus Mode", icon: Eye, action: () => setMode("focus"), category: "Modes", shortcut: "F" },
    { id: "mode-system", label: "Switch to System Mode", icon: Settings, action: () => setMode("system"), category: "Modes", shortcut: "S" },

    { id: "audio", label: "Toggle System Audio", icon: Volume2, action: () => toggleAudio(), category: "Actions", shortcut: "A" },
    { id: "resume", label: "Download Technical Resume", icon: Download, action: () => window.open("/samanyu_resume.pdf"), category: "Actions" },
    { id: "email", label: "Open Secure Comms", icon: Terminal, action: () => window.location.href = "mailto:allipuramsamanyu@gmail.com", category: "Actions" },
  ];

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((cmd: CommandItem) => {
    cmd.action();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelectedIndex(i => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered, selectedIndex, handleSelect, onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-bg-surface/90 shadow-2xl backdrop-blur-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 border-b border-white/5 px-6 py-5">
          <Search className="h-5 w-5 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-lg font-medium text-white outline-none placeholder:text-text-muted"
          />
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-text-muted">
            <span className="text-[12px]">ESC</span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-3">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((cmd, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all ${
                      isActive ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        isActive ? "bg-neon-purple/20 text-neon-purple" : "bg-white/5 text-text-muted group-hover:text-white"
                      }`}>
                        <cmd.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isActive ? "text-white" : "text-text-secondary group-hover:text-white"}`}>
                          {cmd.label}
                        </p>
                        <p className="mt-0.5 text-[10px] font-mono uppercase tracking-widest text-text-muted">
                          {cmd.category}
                        </p>
                      </div>
                    </div>
                    {cmd.shortcut && (
                      <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-text-muted">
                        {cmd.shortcut}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <Zap className="h-8 w-8 text-text-muted" />
              </div>
              <p className="text-lg font-bold text-white">No commands found</p>
              <p className="text-sm text-text-muted">Try searching for navigation, modes, or actions.</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-6 py-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] font-bold text-text-muted">↓</div>
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] font-bold text-text-muted">↑</div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted">Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[10px] font-bold text-text-muted">ENTER</div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted">Select</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Command className="h-3 w-3 text-text-muted" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">System.Palette.v1</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

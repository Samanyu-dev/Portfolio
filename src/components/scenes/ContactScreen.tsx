import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Copy, Check, Code2, Briefcase, Mail, Download, Terminal, Wifi, Shield, Cpu, ExternalLink } from "lucide-react";
import type { PortfolioProfile } from "@/types/portfolio";

const EMAIL = "allipuramsamanyu@gmail.com";
const GITHUB_URL = "https://github.com/Samanyu-dev";
const LINKEDIN_URL = "https://www.linkedin.com/in/samanyu-reddy-allipuram/";

export function ContactScreen({ profile }: { profile: PortfolioProfile }) {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isLive, setIsLive] = useState(true);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
      {/* Background Volumetric Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-neon-purple/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-electric-blue/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.4em] text-text-secondary backdrop-blur-3xl shadow-2xl">
            <Terminal className="h-3.5 w-3.5 text-neon-purple" />
            Collaboration Node // Connected
          </span>
          <h2 className="mt-8 text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Let&apos;s build the <span className="text-neon-purple">future</span>.
          </h2>
        </motion.div>

        {/* 3D Collaboration Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="w-full"
          style={{ perspective: 1500 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0f]/80 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-8 py-4">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">Live Presence</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">Secure_Link.v3</span>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              {/* Left: Terminal Input Space */}
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="h-20 w-20 rounded-[1.5rem] border border-white/10 object-cover shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[#0a0a0f] bg-emerald-500 shadow-glow-emerald" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{profile.name}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neon-purple">Lead Engineering Labs</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-text-muted leading-relaxed">
                    Available for high-impact technical roles, autonomous agent research, and immersive frontend architecture.
                  </p>

                  <div className="flex flex-col gap-4 pt-6">
                    <button
                      onClick={handleCopy}
                      data-cursor="interactive"
                      className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-neon-purple/50 hover:bg-neon-purple/5"
                    >
                      <div className="relative z-10 flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-muted mb-2">Primary Comms</span>
                        <span className="text-lg font-bold text-white tracking-tight">{EMAIL}</span>
                      </div>
                      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                        copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-text-muted group-hover:bg-neon-purple/20 group-hover:text-neon-purple'
                      }`}>
                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </div>
                      <AnimatePresence>
                        {copied && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center"
                          >
                            <span className="font-mono text-xs font-bold text-emerald-400">Copied to Clipboard</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    <a
                      href="/samanyu_resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-between rounded-2xl border border-neon-purple/30 bg-neon-purple/10 p-6 transition-all hover:bg-neon-purple/20 hover:border-neon-purple/50"
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-neon-purple mb-2">Technical Dossier</span>
                        <span className="text-lg font-bold text-white tracking-tight">Download_Resume.pdf</span>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-purple/20 text-neon-purple group-hover:scale-110 transition-transform">
                        <Download className="h-5 w-5" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Network & Socials */}
              <div className="border-l border-white/5 bg-white/[0.02] p-8 sm:p-12">
                <div className="space-y-12">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-6">Network Node Mapping</h4>
                    <div className="space-y-3">
                      {[
                        { label: "GitHub Architecture", url: GITHUB_URL, icon: Code2, color: "text-neon-purple" },
                        { label: "LinkedIn Protocol", url: LINKEDIN_URL, icon: Briefcase, color: "text-electric-blue" }
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="interactive"
                          className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${social.color}`}>
                              <social.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">{social.label}</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-6">System Metadata</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Uptime", value: "99.9%", icon: Wifi },
                        { label: "Encryption", value: "AES-256", icon: Shield },
                        { label: "Core Speed", value: "4.8 GHz", icon: Cpu },
                        { label: "Status", value: "Available", icon: Terminal }
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                          <item.icon className="h-3.5 w-3.5 text-text-muted mb-3" />
                          <p className="font-mono text-[8px] uppercase tracking-widest text-text-muted">{item.label}</p>
                          <p className="mt-1 text-sm font-bold text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

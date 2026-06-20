/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Copy, Check, Code2, Briefcase, Download, ExternalLink, MapPin, Mail, Sparkles, Terminal } from "lucide-react";
import { config } from "@/config-v3";
import "./styles/Contact.css"; // We can keep or ignore

const EMAIL = config.contact.email;
const GITHUB_URL = config.contact.github;
const LINKEDIN_URL = config.contact.linkedin;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="contact-section relative flex flex-1 w-full items-center justify-center overflow-hidden py-32" id="contact" ref={containerRef}>
      {/* Background Volumetric Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--primary)]/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 backdrop-blur-3xl shadow-2xl">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
            Let&apos;s Connect
          </span>
          <h2 className="mt-8 text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Let&apos;s build the <span className="text-[var(--primary)]">future</span>.
          </h2>
        </motion.div>

        {/* 3D Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-8 py-4">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">Available for Work</span>
                </div>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              {/* Left: Input Space */}
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img
                      src="/images/samanyu-photo.jpg"
                      alt={config.developer.fullName}
                      className="h-20 w-20 rounded-[1.5rem] border border-white/10 object-cover shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[#0a0a0f] bg-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{config.developer.name}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)]">{config.developer.title}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-gray-400 leading-relaxed">
                    Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  </p>

                  <div className="flex flex-col gap-4 pt-6">
                    <button
                      onClick={handleCopy}
                      data-cursor="interactive"
                      className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/10"
                    >
                      <div className="relative z-10 flex flex-col items-start">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-2">Email Address</span>
                        <span className="text-lg font-bold text-white tracking-tight">{EMAIL}</span>
                      </div>
                      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-[var(--primary)]/20 group-hover:text-[var(--primary)]'
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
                      className="group flex w-full items-center justify-between rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-6 transition-all hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/50"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--primary)] mb-2">Resume / CV</span>
                        <span className="text-lg font-bold text-white tracking-tight">samanyu_resume.pdf</span>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] group-hover:scale-110 transition-transform">
                        <Download className="h-5 w-5" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Socials & Quick Facts */}
              <div className="border-l border-white/5 bg-white/[0.02] p-8 sm:p-12">
                <div className="space-y-12">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">Social Profiles</h4>
                    <div className="space-y-3">
                      {[
                        { label: "GitHub", url: GITHUB_URL, icon: Code2, color: "text-white" },
                        { label: "LinkedIn", url: LINKEDIN_URL, icon: Briefcase, color: "text-[#0a66c2]" }
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
                          <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">Quick Facts</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Location", value: "Hyderabad, India", icon: MapPin },
                        { label: "Status", value: "Available", icon: Terminal },
                        { label: "Email", value: "Fast Response", icon: Mail },
                        { label: "Experience", value: "2+ Years of Internsip + Freelance", icon: Code2 }
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                          <item.icon className="h-3.5 w-3.5 text-gray-400 mb-3" />
                          <p className="font-mono text-[8px] uppercase tracking-widest text-gray-400">{item.label}</p>
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
};

export default Contact;

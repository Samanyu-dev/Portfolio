"use client";

import { motion } from "framer-motion";
import { Mail, Copy, Check, ExternalLink, Code, Briefcase } from "lucide-react";
import { useRef, useState } from "react";
import { animationConfig } from "@/lib/animation-config";
import type { PortfolioProfile } from "@/types/portfolio";

export function EnhancedContactCard({ profile }: { profile: PortfolioProfile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = (e.clientY - rect.top - centerY) / 10;
    const y = -(e.clientX - rect.left - centerX) / 10;

    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const copyEmail = async () => {
    const email = `contact@${profile.username}.dev`;
    await navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    {
      label: "GitHub",
      url: profile.githubUrl,
      icon: Code,
      color: "hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/" + profile.username,
      icon: Briefcase,
      color: "hover:text-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/" + profile.username,
      icon: ExternalLink,
      color: "hover:text-sky-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow justify-center">Let&apos;s Connect</p>
        <h2 className="section-title mt-4">
          Ready to build something extraordinary together?
        </h2>
        <p className="section-copy mt-6 max-w-lg mx-auto">
          Have a project in mind, want to collaborate, or just want to chat about systems and design? Let&apos;s talk.
        </p>
      </motion.div>

      {/* 3D Tilt Contact Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        className="mx-auto max-w-2xl"
      >
        <motion.div
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y
          }}
          transition={{ duration: 0.2, type: "tween" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Card surface */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 p-8 sm:p-10">
            {/* Background with gradient and glow */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,15,40,0.8),rgba(20,10,40,0.6))]" />
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/20 to-orange-500/15 blur-3xl" />
            </div>

            {/* Edge glow lines */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] overflow-hidden">
              <div className="absolute inset-0 rounded-[2.5rem] border border-gradient-to-b from-cyan-400/20 via-transparent to-purple-400/20 shadow-[inset_0_0_40px_rgba(56,189,248,0.1),0_0_40px_rgba(56,189,248,0.15)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Profile section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-20 w-20 rounded-2xl border-2 border-white/20 shadow-lg"
                />
                <div>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                    {profile.name}
                  </h3>
                  <p className="mt-2 text-slate-300">{profile.bio}</p>
                </div>
              </div>

              {/* Contact methods */}
              <div className="space-y-4">
                {/* Email */}
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-4 text-left transition hover:bg-cyan-300/15 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-cyan-500/20 p-2 group-hover:bg-cyan-500/30 transition">
                        <Mail className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Email</p>
                        <p className="mt-1 font-semibold text-white">
                          allipuramsamanyu@gmail.com
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: copiedEmail ? 0 : 0 }}
                      className="text-slate-400 group-hover:text-cyan-300 transition"
                    >
                      {copiedEmail ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </motion.div>
                  </div>
                </motion.button>

                {/* Social links */}
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => setHoveredLink(link.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 transition duration-300 flex flex-col items-center gap-2 ${link.color}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{link.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Quick message section */}
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">Or send a message</p>
                  <p className="text-sm leading-6 text-slate-300">
                    Interested in collaborating, discussing ideas, or exploring opportunities? Drop me a line on any of the platforms above.
                  </p>
                </div>
                <motion.a
                  href={`mailto:contact@${profile.username}.dev`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                >
                  Start Conversation
                  <Mail className="h-4 w-4" />
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                {[
                  { label: "Followers", value: String(profile.followers).padStart(2, "0") },
                  { label: "Public Repos", value: String(profile.publicRepos).padStart(2, "0") },
                  { label: "Years Active", value: "2+" },
                  { label: "Projects", value: "15+" }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={animationConfig.transitions.smooth}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-xl font-bold text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={animationConfig.transitions.smooth}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm text-slate-500">
          Based in{" "}
          <span className="font-semibold text-slate-400">building systems that matter</span>
        </p>
      </motion.div>
    </div>
  );
}

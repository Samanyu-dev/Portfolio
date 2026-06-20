'use client'
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProfile } from "@/types/portfolio";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
}

export function HeroScreen({
  profile,
  roles,
  onNavigate
}: {
  profile: PortfolioProfile;
  roles: string[];
  onNavigate: (screen: string) => void;
}) {
  return (
    <div className="relative flex flex-1 w-full items-center justify-start px-6 md:px-16 lg:px-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-[580px] text-left relative z-10"
      >
        {/* Tag */}
        <motion.div variants={item} className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-muted mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-current opacity-60 inline-block" />
          Available for new challenges
        </motion.div>

        {/* Name */}
        <motion.h1 
          variants={item} 
          className="font-serif font-bold text-5xl md:text-7xl lg:text-[100px] leading-[0.92] tracking-tighter text-[#1a1705] mb-6"
        >
          {profile.name || "Samanyu"}<br />Dev.
        </motion.h1>

        {/* Divider */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0 },
            show: { 
              scaleX: 1,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          }}
          className="h-[1px] bg-[#1a1705]/10 origin-left mb-6"
        />

        {/* Role */}
        <motion.p variants={item} className="font-mono text-xs md:text-sm text-text-muted leading-relaxed mb-10 max-w-[420px]">
          Creative Developer & AI Systems Builder<br />
          building tactile web experiences + autonomous agent infrastructures.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-6 items-center">
          <button
            onClick={() => onNavigate("projects")}
            className="font-mono text-xs tracking-[0.1em] uppercase py-3 px-8 border border-[#1a1705]/20 hover:border-[#1a1705]/50 rounded-none bg-transparent text-[#1a1705] hover:bg-[#1a1705]/5 transition-all duration-300"
          >
            Explore Labs →
          </button>
          
          <button
            onClick={() => onNavigate("contact")}
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-[#1a1705] transition-colors duration-300"
          >
            Contact
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}

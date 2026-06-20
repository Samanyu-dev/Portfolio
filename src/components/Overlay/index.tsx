'use client'
import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
}

export function Overlay() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-start md:justify-end px-6 md:px-20 lg:px-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-[580px] pointer-events-auto mt-[10vh] md:mt-0 text-left"
      >
        {/* Tag */}
        <motion.div variants={item} className="font-mono text-[11px] tracking-[0.15em] uppercase text-text-muted mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-current opacity-60 inline-block" />
          Available for new challenges
        </motion.div>

        {/* Name */}
        <motion.h1 
          variants={item} 
          className="font-serif font-bold text-5xl md:text-7xl lg:text-[100px] leading-[0.92] tracking-tighter text-[#1a1705] mb-6"
        >
          Samanyu<br />Dev
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
          <a
            href="#work"
            className="font-mono text-xs tracking-[0.1em] uppercase py-3 px-8 border border-[#1a1705]/20 hover:border-[#1a1705]/50 rounded-none bg-transparent text-[#1a1705] hover:bg-[#1a1705]/5 transition-all duration-300"
          >
            View Work →
          </a>
          
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-[#1a1705] transition-colors duration-300"
          >
            Contact
          </a>
        </motion.div>

      </motion.div>
    </div>
  )
}

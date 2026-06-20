'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Scene } from '../Hero/Scene'
import { EnhancedProjectExperience } from './EnhancedProjectExperience'
import { EnhancedSkillEcosystem } from './EnhancedSkillEcosystem'
import { SideNav } from '../SideNav'
import { ThemeToggle } from '../layout/ThemeToggle'
import { 
  ArrowUpRight, Mail, Globe, Sparkles, ChevronRight, 
  Briefcase, Calendar, Download, Trophy, GraduationCap,
  MapPin, Check, Copy, Terminal, ExternalLink, Wrench
} from 'lucide-react'
import type { PortfolioRepo, SkillCluster } from '@/types/portfolio'
import { experience } from '@/data/experience'
import { education, achievements, contactData } from '@/data/profile'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Philosophy' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

type CinematicPortfolioProps = {
  data: {
    repositories: PortfolioRepo[]
    featured: PortfolioRepo[]
    skillClusters: SkillCluster[]
    metrics: {
      totalRepos: number
      totalStars: number
      demoCount: number
    }
  }
}

// ─── 1. MATRIX BACKGROUND LAYER ───
function MatrixBackground() {
  return (
    <div className="matrix-container pointer-events-none fixed inset-0 z-[-1] opacity-30 dark:opacity-20">
      {Array.from({ length: 5 }).map((_, pIdx) => (
        <div key={pIdx} className="matrix-pattern">
          {Array.from({ length: 40 }).map((_, cIdx) => (
            <div key={cIdx} className="matrix-column" style={{ left: `${cIdx * 25}px` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CinematicPortfolio({ data }: CinematicPortfolioProps) {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [copied, setCopied] = useState(false)
  const [systemActive, setSystemActive] = useState(true)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(contactData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }, [])

  // Smooth Scroll Navigation Handler
  const handleNavigate = useCallback((id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleMailClick = useCallback(() => {
    window.location.href = `mailto:${contactData.email}?subject=Collaboration%20Query`
  }, [])

  // Scroll spy tracking
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="alien-loader-wrapper">
          <div className="loader alien-loader"></div>
          <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#00ff41]/50 mt-6">
            INITIALIZING MATRIX PROTOCOLS
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#f5f0ea] dark:bg-[#050505] text-[#1a1705] dark:text-[#f3f4f6] selection:bg-[#a35d4e]/20 selection:text-[#1a1705] dark:selection:text-[#ffffff] overflow-x-hidden font-sans">
      
      {/* Dynamic Matrix Falling Code Background */}
      <MatrixBackground />

      {/* Left Sidenav for Desktop & Mobile bar */}
      <SideNav active={activeSection} onNavigate={handleNavigate} />

      {/* Floating Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-[100] pointer-events-auto">
        <ThemeToggle />
      </div>

      {/* Organic fluid 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Foreground scroll sections */}
      <div className="relative z-10 md:pl-[60px] pb-[64px] md:pb-0">

        {/* SECTION 1: HERO VIEWPORT */}
        <section id="home" className="relative w-full min-h-screen flex items-center px-6 md:px-20 lg:px-32 py-16">
          <div className="max-w-[720px] text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5c5847] dark:text-[#9ca3af] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-current opacity-60 inline-block" />
                Intelligence & Interfaces
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-serif font-black text-5xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tighter text-[#1a1705] dark:text-white mb-8"
            >
              Samanyu<br />
              <span className="italic font-normal text-[#a35d4e]">Reddy Allipuram</span>.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-[1px] bg-[#1a1705]/10 dark:bg-white/10 origin-left mb-8 max-w-[480px]"
            />

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-mono text-xs md:text-sm text-[#5c5847] dark:text-[#b4b4b4] leading-relaxed mb-10 max-w-[500px]"
            >
              AI and Full-Stack Engineer crafting autonomous agent architectures, refined user interfaces, and mobile products. Shifting paradigms through applied cognitive systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="flex gap-6 items-center flex-wrap"
            >
              <button
                type="button"
                onClick={() => handleNavigate('projects')}
                className="cursor-pointer font-mono text-xs tracking-[0.1em] uppercase py-3.5 px-8 border border-[#1a1705] dark:border-white bg-[#1a1705] dark:bg-white text-[#f5f0ea] dark:text-[#050505] hover:bg-transparent dark:hover:bg-transparent hover:text-[#1a1705] dark:hover:text-white transition-all duration-300 shadow-sm rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Browse Projects
              </button>
              <a
                href={contactData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-mono text-[11px] tracking-[0.1em] uppercase text-[#5c5847] dark:text-[#9ca3af] hover:text-[#1a1705] dark:hover:text-white border border-[#1a1705]/10 dark:border-white/10 hover:border-[#1a1705]/50 dark:hover:border-white/50 py-3.5 px-6 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Technical Dossier
              </a>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: PHILOSOPHY / ABOUT */}
        <section id="about" className="py-32 px-6 md:px-20 lg:px-32 bg-white/70 dark:bg-black/65 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a35d4e] dark:text-[#a35d4e] mb-4 block">Philosophy</span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#1a1705] dark:text-white leading-snug tracking-tight mb-8">
                Building secure, distributed software wrapped in <span className="italic font-bold text-[#a35d4e]">interfaces that breathe</span>.
              </h2>
              <div className="space-y-6 text-[#5c5847] dark:text-[#cbd5e1] text-base md:text-lg leading-relaxed font-sans max-w-[640px]">
                <p>
                  I view dynamic software architecture as an editorial workflow—refining code modules and polishing browser layers until they offer immediate, responsive presence.
                </p>
                <p>
                  Specializing in React, Next.js, and complex AI agent architectures (including local vector indices and Bayesian decision modeling), my process focuses heavily on execution speed, accessibility compliance, and pixel-precise design integrity.
                </p>
              </div>

              {/* BITS Pilani Highlight */}
              <div className="mt-12 p-6 md:p-8 rounded-[2rem] border border-[#1a1705]/8 dark:border-white/8 bg-[#fbf9f6]/80 dark:bg-black/40 shadow-sm flex items-start gap-4">
                <GraduationCap className="w-8 h-8 text-[#a35d4e] flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#1a1705] dark:text-white">{education[0].institution}</h4>
                  <p className="font-sans text-sm text-[#a35d4e] font-semibold mt-1">{education[0].degree}</p>
                  <p className="font-sans text-xs text-[#5c5847] dark:text-[#94a3b8] mt-2">{education[0].details}</p>
                  <span className="inline-block mt-3 font-mono text-[10px] text-[#5c5847] dark:text-[#64748b] tracking-wider uppercase border border-[#1a1705]/10 dark:border-white/10 px-2 py-0.5 rounded-md">
                    {education[0].period}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Statistics Panel */}
            <div className="lg:col-span-5 border border-[#1a1705]/8 dark:border-white/8 bg-[#fbf9f6] dark:bg-black/60 p-8 md:p-12 rounded-[2.5rem] shadow-sm space-y-8">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#5c5847] dark:text-[#94a3b8] block mb-4">Engineering Meta</span>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="font-serif font-black text-4xl block text-[#1a1705] dark:text-white">{data.metrics.totalRepos}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#5c5847] dark:text-[#94a3b8]">Public Repos</span>
                  </div>
                  <div>
                    <span className="font-serif font-black text-4xl block text-[#1a1705] dark:text-white">{data.metrics.totalStars}+</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#5c5847] dark:text-[#94a3b8]">GitHub Stars</span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-[#1a1705]/8 dark:bg-white/8 w-full" />

              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#5c5847] dark:text-[#94a3b8] block">Coordinates</span>
                <div className="space-y-2.5 font-mono text-[10px] text-[#5c5847] dark:text-[#cbd5e1] uppercase tracking-widest leading-loose">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-[#a35d4e]" aria-hidden />
                    Location // India
                  </p>
                  <p className="flex items-center gap-2">
                    <Wrench className="h-3 w-3 text-[#a35d4e]" aria-hidden />
                    Focus // Next.js, R3F Shaders, Python ML
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-[#a35d4e]" aria-hidden />
                    Status // BITS Pilani & AI Research
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-[#1a1705]/8 dark:bg-white/8 w-full" />

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#5c5847] dark:text-[#94a3b8] block mb-4">Achievements</span>
                <ul className="space-y-3 font-sans text-xs text-[#5c5847] dark:text-[#cbd5e1]">
                  {achievements.slice(0, 3).map((ach, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <Trophy className="w-3.5 h-3.5 text-[#a35d4e] flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: SKILLS ECOSYSTEM */}
        <section id="skills" className="py-32 px-6 md:px-20 lg:px-32 bg-white/70 dark:bg-black/65 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto">
            <EnhancedSkillEcosystem clusters={data.skillClusters} />
          </div>
        </section>

        {/* SECTION 4: PROJECTS SHOWCASE & CATALOG */}
        <section id="projects" className="py-32 px-6 md:px-20 lg:px-32 bg-white/75 dark:bg-black/70 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto">
            
            {/* 3D Tilted Alternating Showcase Grid Specimen */}
            <div className="mb-16">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a35d4e] mb-3 block">Showcase Catalog</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1705] dark:text-white">
                3D Interactive Project Deck
              </h2>
              <p className="mt-4 font-mono text-xs text-[#5c5847] dark:text-[#cbd5e1] tracking-widest uppercase">
                Hover to un-tilt and inspect details. Click to view repositories.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mt-12 py-10">
                {data.repositories.slice(0, 6).map((project, idx) => {
                  const rotations = [
                    "translate3d(4%, -2%, 0px) scale3d(0.95, 0.9, 1) rotateX(15deg) rotateY(-9deg) rotateZ(5deg)",
                    "translate3d(-2%, 3%, 0px) scale3d(0.95, 0.9, 1) rotateX(12deg) rotateY(10deg) rotateZ(-6deg)",
                    "translate3d(3%, 4%, 0px) scale3d(0.95, 0.9, 1) rotateX(14deg) rotateY(-8deg) rotateZ(8deg)",
                    "translate3d(-3%, -2%, 0px) scale3d(0.95, 0.9, 1) rotateX(10deg) rotateY(12deg) rotateZ(-4deg)",
                    "translate3d(2%, -4%, 0px) scale3d(0.95, 0.9, 1) rotateX(13deg) rotateY(-11deg) rotateZ(6deg)",
                    "translate3d(-4%, 3%, 0px) scale3d(0.95, 0.9, 1) rotateX(11deg) rotateY(9deg) rotateZ(-7deg)"
                  ]
                  const rotation = rotations[idx % rotations.length]

                  return (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="uiverse-3d-card relative group"
                      style={{ transform: rotation }}
                    >
                      <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <div className="uiverse-3d-card-content">
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-80 text-white/90">
                            {project.discipline}
                          </p>
                          <h4 className="uiverse-3d-card-title mt-2">
                            {project.title}
                          </h4>
                          <p className="uiverse-3d-card-para line-clamp-3 mt-1">
                            {project.summary}
                          </p>
                          
                          <div className="flex gap-2.5 mt-4 flex-wrap justify-center pointer-events-none">
                            {project.stack.slice(0, 3).map(tech => (
                              <span key={tech} className="font-mono text-[8px] border border-white/20 bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-white">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="absolute bottom-4 right-4 text-white opacity-40 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="h-[1px] bg-[#1a1705]/8 dark:bg-white/8 w-full my-20" />

            {/* In-depth Projects details explorer */}
            <EnhancedProjectExperience repositories={data.repositories} />
          </div>
        </section>

        {/* SECTION 5: EXPERIENCE TIMELINE */}
        <section id="experience" className="py-32 px-6 md:px-20 lg:px-32 bg-white/70 dark:bg-black/65 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-2xl">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-20 text-center">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a35d4e] mb-3 block">Chronology</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1705] dark:text-white">
                Professional Journey
              </h2>
              <p className="mt-4 font-mono text-xs text-[#5c5847] dark:text-[#94a3b8] tracking-widest uppercase">
                System Engineering & Design Implementations
              </p>
            </div>

            {/* Dynamic experience nodes mapping from source files */}
            <div className="relative border-l border-[#1a1705]/8 dark:border-white/10 pl-6 md:pl-10 space-y-16 py-4 max-w-3xl mx-auto">
              {experience.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline bullet tracking marker */}
                  <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#a35d4e] border-4 border-[#f5f0ea] dark:border-[#050505] shadow-glow-rose" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h3 className="font-serif font-bold text-xl text-[#1a1705] dark:text-white">
                      {job.role}
                    </h3>
                    <div className="font-mono text-[9px] text-[#a35d4e] uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#5c5847] dark:text-[#94a3b8] mb-4">
                    <span className="font-bold text-[#1a1705] dark:text-white">{job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#a35d4e]" />
                      {job.location}
                    </span>
                  </div>

                  {/* Bullet description notes */}
                  <ul className="space-y-2 list-none mb-6">
                    {job.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="font-sans text-sm text-[#5c5847] dark:text-[#cbd5e1] leading-relaxed flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#a35d4e] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1a1705]/5 dark:border-white/5">
                    {job.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] text-[#a35d4e] dark:text-[#c08c78] border border-[#a35d4e]/10 dark:border-[#c08c78]/10 bg-[#a35d4e]/5 dark:bg-[#c08c78]/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SECURED CONTACT NODE */}
        <section id="contact" className="py-32 px-6 md:px-20 lg:px-32 bg-white/75 dark:bg-black/70 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-2xl">
          <div className="max-w-5xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex flex-col items-center text-center"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#1a1705]/10 dark:border-white/10 bg-[#fbf9f6]/60 dark:bg-white/5 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.4em] text-[#5c5847] dark:text-[#9ca3af] backdrop-blur-3xl shadow-2xl">
                <Terminal className="h-3.5 w-3.5 text-[#a35d4e]" />
                Collaboration Node // SECURE
              </span>
              <h2 className="mt-8 font-serif text-4xl md:text-7xl font-bold tracking-tight text-[#1a1705] dark:text-white">
                Let&apos;s build the <span className="text-[#a35d4e] italic font-normal">future</span>.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative overflow-hidden rounded-[2.5rem] border border-[#1a1705]/10 dark:border-white/10 bg-[#fbf9f6]/90 dark:bg-[#0a0a0f]/80 shadow-2xl backdrop-blur-3xl"
            >
              {/* Terminal top header */}
              <div className="flex items-center justify-between border-b border-[#1a1705]/5 dark:border-white/5 bg-[#1a1705]/5 dark:bg-white/5 px-8 py-4">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${systemActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5c5847] dark:text-[#94a3b8]">Presence Active</span>
                  </div>
                  <div className="h-4 w-px bg-[#1a1705]/10 dark:bg-white/10" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#5c5847] dark:text-[#94a3b8]">Secure_Tunnel.v4</span>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                
                {/* Left pane */}
                <div className="p-8 sm:p-12 space-y-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-[1.2rem] border border-[#1a1705]/10 dark:border-white/10 bg-[#a35d4e]/10 flex items-center justify-center text-2xl font-serif font-black text-[#a35d4e]">
                          S.
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-4 border-[#fbf9f6] dark:border-[#0a0a0f] bg-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1a1705] dark:text-white">Samanyu Reddy Allipuram</h3>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-[#a35d4e]">Applied AI & Full-Stack Systems</p>
                      </div>
                    </div>

                    <p className="text-base text-[#5c5847] dark:text-[#cbd5e1] leading-relaxed">
                      Available for high-stakes software engineering roles, complex autonomous agent research, and visual-first interaction modules.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    
                    {/* Copy email action trigger (Bilingual com spec) */}
                    <div className="uiverse-input-wrapper w-full max-w-[360px]">
                      <svg className="uiverse-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                          <g data-name="inbox">
                            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect>
                            <path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"></path>
                          </g>
                        </g>
                      </svg>
                      <input 
                        type="text" 
                        readOnly 
                        value={contactData.email} 
                        className="uiverse-input flex-1 cursor-text select-all" 
                      />
                      <button onClick={handleMailClick} className="uiverse-subscribe-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="10"
                          viewBox="0 0 38 15"
                          className="uiverse-arrow"
                        >
                          <path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z" />
                        </svg>
                        <span>email</span>
                      </button>
                    </div>

                    <div className="flex gap-6 items-center flex-wrap">
                      {/* Send dynamic email flying paper button */}
                      <button className="uiverse-send-email-btn" onClick={handleMailClick}>
                        <div className="svg-wrapper-1">
                          <div className="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                            </svg>
                          </div>
                        </div>
                        <span>SEND EMAIL</span>
                      </button>

                      {/* Neon glitch resume button */}
                      <button 
                        className="uiverse-resume-btn" 
                        data-text="&nbsp;DOWNLOAD RESUME&nbsp;" 
                        onClick={() => window.open(contactData.resumePath, '_blank')}
                      >
                        <span className="actual-text">&nbsp;DOWNLOAD RESUME&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">&nbsp;DOWNLOAD RESUME&nbsp;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right pane: secured 9-grid interactive Uiverse socials */}
                <div className="border-t lg:border-t-0 lg:border-l border-[#1a1705]/5 dark:border-white/5 bg-[#1a1705]/[0.01] dark:bg-white/[0.01] p-8 sm:p-12 flex flex-col items-center justify-center space-y-8">
                  
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#5c5847] dark:text-[#94a3b8] mb-8 text-center">
                      Secure Social Protocol Grid
                    </h4>
                    
                    <div className="uiverse-social-grid">
                      <div className="uiverse-social-back"></div>
                      
                      {/* instagram */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="instagram" fillRule="nonzero" height="30px" width="30px" viewBox="0,0,256,256" xmlns="http://www.w3.org/2000/svg">
                          <g transform="scale(8,8)">
                            <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" />
                          </g>
                        </svg>
                      </a>
                      
                      {/* twitter */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="twitter" height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" />
                        </svg>
                      </a>
                      
                      {/* dribble */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="dribble" height="30px" width="30px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z" />
                          <path d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z" fill="#ea4c89" />
                          <path d="M28.352 36.914c0 0-3.032-21.087-15.63-34.292M1.269 17.848c0 0 24.2 2.117 32.075-11.102M7.804 34.152c0 0 8.624-19.807 31.058-12.194" strokeMiterlimit="10" stroke="#ea4c89" fill="none" />
                        </svg>
                      </a>
                      
                      {/* codepen */}
                      <a href={contactData.github} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="codepen" height="30px" width="30px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <path d="M 25 4 L 4 17.34375 L 4 32.652344 L 25 46 L 46 32.65625 L 46 17.34375 Z M 25 29.183594 L 19.066406 25.070313 L 25 21.023438 L 30.933594 25.070313 Z M 27 17.605469 L 27 9.949219 L 40.429688 18.484375 L 34.410156 22.65625 Z M 23 17.605469 L 15.589844 22.65625 L 9.570313 18.484375 L 23 9.949219 Z M 12.09375 25.042969 L 8 27.832031 L 8 22.203125 Z M 15.570313 27.453125 L 23 32.605469 L 23 40.050781 L 9.589844 31.527344 Z M 27 32.605469 L 34.429688 27.453125 L 40.410156 31.527344 L 27 40.050781 Z M 37.90625 25.042969 L 42 22.203125 L 42 27.832031 Z" />
                        </svg>
                      </a>
                      
                      {/* center placeholder card uiverse */}
                      <div className="uiverse-social-card">
                        <svg className="uiverse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="23px" width="23px">
                          <path fill="url(#paint0_linear_501_142)" d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z" />
                          <path fill="url(#paint1_linear_501_142)" d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z" />
                          <path fill="url(#paint2_linear_501_142)" d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1="0" x1="0" id="paint0_linear_501_142">
                              <stop stopColor="#BF66FF" />
                              <stop stopColor="#6248FF" offset="0.510417" />
                              <stop stopColor="#00DDEB" offset="1" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1="0" x1="0" id="paint1_linear_501_142">
                              <stop stopColor="#BF66FF" />
                              <stop stopColor="#6248FF" offset="0.510417" />
                              <stop stopColor="#00DDEB" offset="1" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" y2="87.6201" x2="96.1684" y1="0" x1="0" id="paint2_linear_501_142">
                              <stop stopColor="#BF66FF" />
                              <stop stopColor="#6248FF" offset="0.510417" />
                              <stop stopColor="#00DDEB" offset="1" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      
                      {/* discord */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="discord" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px">
                          <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z" />
                        </svg>
                      </a>
                      
                      {/* github */}
                      <a href={contactData.github} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="github" height="30px" width="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                        </svg>
                      </a>
                      
                      {/* telegram */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="telegram" height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
                          <path d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" fill="#fff" />
                          <path d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" fill="#b0bec5" />
                          <path d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" fill="#cfd8dc" />
                        </svg>
                      </a>
                      
                      {/* reddit */}
                      <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="uiverse-social-card">
                        <svg className="reddit" xmlSpace="preserve" viewBox="0 0 256 256" height="30" width="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" style={{ stroke: "none", strokeWidth: 0, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1 }}>
                            <circle style={{ stroke: "none", strokeWidth: 0, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fillRule: "nonzero", opacity: 1 }} r="45" cy="45" cx="45" />
                            <path strokeLinecap="round" style={{ stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fillRule: "nonzero", opacity: 1 }} d="M 75.011 45 c -0.134 -3.624 -3.177 -6.454 -6.812 -6.331 c -1.611 0.056 -3.143 0.716 -4.306 1.823 c -5.123 -3.49 -11.141 -5.403 -17.327 -5.537 l 2.919 -14.038 l 9.631 2.025 c 0.268 2.472 2.483 4.262 4.955 3.993 c 2.472 -0.268 4.262 -2.483 3.993 -4.955 s -2.483 -4.262 -4.955 -3.993 c -1.421 0.145 -2.696 0.973 -3.4 2.204 L 48.68 17.987 c -0.749 -0.168 -1.499 0.302 -1.667 1.063 c 0 0.011 0 0.011 0 0.022 l -3.322 15.615 c -6.264 0.101 -12.36 2.025 -17.55 5.537 c -2.64 -2.483 -6.801 -2.36 -9.284 0.291 c -2.483 2.64 -2.36 6.801 0.291 9.284 c 0.515 0.481 1.107 0.895 1.767 1.186 c -0.045 0.66 -0.045 1.32 0 1.98 c 0 10.078 11.745 18.277 26.23 18.277 c 14.485 0 26.23 -8.188 26.23 -18.277 c 0.045 -0.66 0.045 -1.32 0 -1.98 C 73.635 49.855 75.056 47.528 75.011 45 z M 30.011 49.508 c 0 -2.483 2.025 -4.508 4.508 -4.508 c 2.483 0 4.508 2.025 4.508 4.508 s -2.025 4.508 -4.508 4.508 C 32.025 53.993 30.011 51.991 30.011 49.508 z M 56.152 62.058 v -0.179 c -3.199 2.405 -7.114 3.635 -11.119 3.468 c -4.005 0.168 -7.919 -1.063 -11.119 -3.468 c -0.425 -0.515 -0.347 -1.286 0.168 -1.711 c 0.447 -0.369 1.085 -0.369 1.544 0 c 2.707 1.98 6.007 2.987 9.362 2.83 c 3.356 0.179 6.667 -0.783 9.407 -2.74 c 0.492 -0.481 1.297 -0.47 1.779 0.022 C 56.655 60.772 56.644 61.577 56.152 62.058 z M 55.537 54.34 c -0.078 0 -0.145 0 -0.224 0 l 0.034 -0.168 c -2.483 0 -4.508 -2.025 -4.508 -4.508 s 2.025 -4.508 4.508 -4.508 s 4.508 2.025 4.508 4.508 C 59.955 52.148 58.02 54.239 55.537 54.34 z" />
                          </g>
                        </svg>
                      </a>
                      
                      <p className="text-social-center">HOVER<br />FOR<br />SOCIAL</p>
                    </div>
                  </div>
                  
                </div>

              </div>
            </motion.div>

            {/* Premium minimal footer */}
            <div className="mt-24 pt-8 border-t border-[#1a1705]/5 dark:border-white/5 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="font-serif italic text-2xl text-[#1a1705] dark:text-white font-black">S.</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#1a1705]/30 dark:text-white/30 text-center sm:text-right">
                © {new Date().getFullYear()} Samanyu. Built under premium visual studio guidelines.
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}

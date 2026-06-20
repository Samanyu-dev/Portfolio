'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scene } from '../Hero/Scene'
import type { PortfolioData } from '@/types/portfolio'
import { ArrowUpRight, Mail, Globe, Sparkles, ChevronRight, Briefcase, Calendar } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export function LuxuryExperience({ data }: { data: PortfolioData }) {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isNavHovered, setIsNavHovered] = useState(false)

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
      <div className="min-h-screen bg-[#f5f0ea] flex items-center justify-center">
        <div className="font-serif italic text-3xl text-[#1a1705]/30 animate-pulse">S.</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#f5f0ea] text-[#1a1705] selection:bg-[#c08c78]/20 selection:text-[#1a1705] overflow-x-hidden font-sans">
      
      {/* ─── DYNAMIC ISLAND NAVIGATION PILL ─── */}
      <div className="fixed top-6 left-0 w-full z-[100] flex justify-center px-4">
        <motion.nav
          onHoverStart={() => setIsNavHovered(true)}
          onHoverEnd={() => setIsNavHovered(false)}
          animate={{
            width: isNavHovered ? 'auto' : '340px',
            borderRadius: isNavHovered ? '24px' : '32px',
            paddingLeft: isNavHovered ? '24px' : '16px',
            paddingRight: isNavHovered ? '24px' : '16px',
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="h-[52px] flex items-center justify-between border border-[#1a1705]/8 bg-[#fbf9f6]/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(26,23,5,0.06)] overflow-hidden"
        >
          {/* Logo Mark inside Island */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif font-black text-base text-[#1a1705] cursor-pointer mr-4 hover:opacity-75 transition-opacity"
          >
            S.
          </div>

          {/* Navigation Links inside Island */}
          <div className="flex items-center gap-1 md:gap-2">
            <AnimatePresence mode="wait">
              {isNavHovered ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all duration-300 relative ${
                          isActive ? 'text-[#f5f0ea] font-semibold' : 'text-[#5c5847] hover:text-[#1a1705]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-nav"
                            className="absolute inset-0 bg-[#1a1705] rounded-full z-[-1]"
                            transition={{ type: 'spring', stiffness: 250, damping: 26 }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-text-muted"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a35d4e] animate-pulse" />
                    <span>Sector // {activeSection}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#1a1705]/20" />
                  <span className="text-[#1a1705]/50 hover:text-[#1a1705] transition-colors cursor-pointer font-bold">Menu</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>

      {/* ─── 3D BACKGROUND scene ─── */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* ─── FOREGROUND SCROLL LAYOUT ─── */}
      <div className="relative z-10">

        {/* HERO viewport */}
        <section id="hero" className="relative w-screen h-screen flex items-center px-6 md:px-20 lg:px-32">
          {/* Subtle page-load intro text overlay */}
          <div className="max-w-[620px] text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-current opacity-60 inline-block" />
                Engineering Systems & Interfaces
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-serif font-black text-5xl md:text-7xl lg:text-[96px] leading-[0.92] tracking-tighter text-[#1a1705] mb-8"
            >
              Samanyu<br /><span className="italic font-normal text-[#a35d4e]">Portfolio</span>.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-[1px] bg-[#1a1705]/10 origin-left mb-8 max-w-[480px]"
            />

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-mono text-xs md:text-sm text-text-muted leading-relaxed mb-10 max-w-[460px]"
            >
              Creative engineer building autonomous agent architectures, refined user interfaces, and mobile products. Based in India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="flex gap-6 items-center"
            >
              <a
                href="#work"
                className="font-mono text-xs tracking-[0.1em] uppercase py-3.5 px-8 border border-[#1a1705] bg-[#1a1705] text-[#f5f0ea] hover:bg-transparent hover:text-[#1a1705] transition-all duration-300 shadow-sm"
              >
                View Labs
              </a>
              <a
                href="#contact"
                className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-[#1a1705] transition-colors duration-300"
              >
                Contact
              </a>
            </motion.div>
          </div>
        </section>

        {/* SELECTED WORKS SECTION */}
        <section id="work" className="py-32 px-6 md:px-20 lg:px-32 border-t border-[#1a1705]/5 bg-[#fbf9f6]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 items-end">
              <div className="md:col-span-8">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-3 block">Selected Works</span>
                <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1705]">
                  Tactile Engineering Sandbox & AI Labs
                </h2>
              </div>
              <div className="md:col-span-4 font-mono text-xs text-text-muted leading-relaxed">
                Visualizing data structures and autonomous networks with clean design paradigms. Click links to view source repositories.
              </div>
            </div>

            {/* Asymmetrical grid design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {(data?.featured || []).map((repo, idx) => {
                const isLarge = idx % 3 === 0
                const colSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4'

                return (
                  <motion.div
                    key={repo.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`${colSpan} flex flex-col group`}
                  >
                    <div className="relative aspect-[4/3] w-full border border-[#1a1705]/8 bg-[#f5f0ea]/50 p-8 flex flex-col justify-between overflow-hidden hover:border-[#1a1705]/20 hover:bg-[#f5f0ea]/80 hover:shadow-lg transition-all duration-500 rounded-3xl">
                      {/* Top bar info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted block mb-1">
                            {repo.discipline}
                          </span>
                          <span className="font-mono text-[9px] tracking-[0.05em] px-2 py-0.5 border border-[#1a1705]/10 rounded-full text-text-muted">
                            {repo.complexity.label}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={repo.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-[#1a1705]/10 flex items-center justify-center hover:bg-[#1a1705] hover:text-[#f5f0ea] hover:border-transparent transition-all"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          </a>
                          {repo.links.demo && (
                            <a
                              href={repo.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full border border-[#1a1705]/10 flex items-center justify-center hover:bg-[#1a1705] hover:text-[#f5f0ea] hover:border-transparent transition-all"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="font-serif font-bold text-2xl md:text-3xl tracking-tight text-[#1a1705] mb-3 group-hover:text-[#a35d4e] transition-colors duration-300">
                          {repo.title}
                        </h3>
                        <p className="font-sans text-[#5c5847] text-sm leading-relaxed max-w-[480px]">
                          {repo.summary}
                        </p>
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1a1705]/5">
                        {(repo?.stack || []).slice(0, 4).map((tech) => (
                          <span key={tech} className="font-mono text-[9px] text-[#a35d4e] uppercase tracking-wider">
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ABOUT & CORE VALUES SECTION */}
        <section id="about" className="py-32 px-6 md:px-20 lg:px-32 bg-[#ebdcd0]/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Biography */}
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-4 block">Philosophy</span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#1a1705] leading-snug tracking-tight mb-8">
                Building secure, distributed software wrapped in <span className="italic font-bold text-[#a35d4e]">interfaces that breathe</span>.
              </h2>
              <div className="space-y-6 text-[#5c5847] text-base md:text-lg leading-relaxed font-sans max-w-[620px]">
                <p>
                  I view dynamic software architecture as an editorial workflow—refining code modules and polishing browser layers until they offer immediate, responsive presence.
                </p>
                <p>
                  Specializing in React, Next.js, and complex AI agent architectures (including local vector indices and Bayesian decision modeling), my process focuses heavily on execution speed, accessibility compliance, and pixel-precise design integrity.
                </p>
              </div>
            </div>

            {/* Profiles & Locations */}
            <div className="lg:col-span-5 border border-[#1a1705]/8 bg-[#fbf9f6] p-8 md:p-12 rounded-[2rem] shadow-sm space-y-8">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted block mb-4">Engineering Meta</span>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="font-serif font-black text-4xl block text-[#1a1705]">{data.metrics.totalRepos}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">Public Repos</span>
                  </div>
                  <div>
                    <span className="font-serif font-black text-4xl block text-[#1a1705]">{data.metrics.totalStars}+</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">GitHub Stars</span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-[#1a1705]/8 w-full" />

              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-text-muted block">Coordinates</span>
                <div className="space-y-2 font-mono text-[10px] text-[#5c5847] uppercase tracking-widest leading-loose">
                  <p>📍 Location // India</p>
                  <p>🛠️ Focus // Next.js, R3F Shaders, Python ML</p>
                  <p>💼 Status // Selective Consultations</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SYSTEM SKILLS & EXPERTISE */}
        <section id="skills" className="py-32 px-6 md:px-20 lg:px-32 bg-[#f5f0ea]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-20">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-3 block">Expertise</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1705]">
                System Architecture &<br />Interface Craftsmanship
              </h2>
            </div>

            {/* Visual Clusters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(data?.skillClusters || []).map((cluster) => (
                <div key={cluster?.key} className="border border-[#1a1705]/8 bg-[#fbf9f6]/70 p-8 flex flex-col justify-between hover:border-[#1a1705]/20 hover:bg-[#fbf9f6] rounded-[2rem] hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif font-bold text-xl text-[#1a1705]">{cluster?.title}</h3>
                      <Sparkles className="w-4 h-4 text-[#c08c78]" />
                    </div>
                    <p className="font-sans text-xs text-text-muted leading-relaxed mb-6">
                      {cluster?.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#1a1705]/5">
                    {(cluster?.skills || []).map((skill) => (
                      <div key={skill?.name} className="flex justify-between items-center">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1705]">
                          {skill?.name}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < Math.min(skill?.weight || 0, 4) ? 'bg-[#a35d4e]' : 'bg-[#1a1705]/10'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="py-32 px-6 md:px-20 lg:px-32 bg-[#ebdcd0]/10 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-20 text-center">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-3 block">Timeline</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1705]">
                Professional Execution
              </h2>
            </div>

            {/* Minimalist Timeline Items */}
            <div className="relative border-l border-[#1a1705]/8 pl-6 md:pl-10 space-y-16 py-4">
              <div className="relative">
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#a35d4e] border-4 border-[#f5f0ea]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif font-bold text-xl text-[#1a1705]">Senior AI Systems Developer</h3>
                  <div className="font-mono text-[9px] text-[#a35d4e] uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>2024 - Present</span>
                  </div>
                </div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">Independent Labs</h4>
                <p className="font-sans text-sm text-[#5c5847] leading-relaxed max-w-[620px]">
                  Designing and deploying secure autonomous workflow graphs with deep LLM logic and semantic indexing nodes. Highly integrated with Next.js dashboards.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#1a1705]/40 border-4 border-[#f5f0ea]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif font-bold text-xl text-[#1a1705]">Full-Stack Mobile Engineer</h3>
                  <div className="font-mono text-[9px] text-[#a35d4e] uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>2022 - 2024</span>
                  </div>
                </div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">Product Engineering Hubs</h4>
                <p className="font-sans text-sm text-[#5c5847] leading-relaxed max-w-[620px]">
                  Architected tactile iOS/Android layouts and structured robust data synchronization engines utilizing Swift, Flutter, and serverless background logic.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#1a1705]/40 border-4 border-[#f5f0ea]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif font-bold text-xl text-[#1a1705]">Open-Source Core Contributor</h3>
                  <div className="font-mono text-[9px] text-[#a35d4e] uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>2020 - 2022</span>
                  </div>
                </div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">Community Repositories</h4>
                <p className="font-sans text-sm text-[#5c5847] leading-relaxed max-w-[620px]">
                  Constructed specialized path-planning, kinematics models, and ML-inference sandboxes in Python and C++, with custom visual presentations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL CONTACT GATEWAY */}
        <section id="contact" className="py-32 px-6 md:px-20 lg:px-32 bg-[#ebdcd0]/30 border-t border-[#1a1705]/5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-muted mb-4">Start a conversation</span>
            <h2 className="font-serif text-4xl md:text-7xl font-bold tracking-tight text-[#1a1705] mb-8">
              Let&apos;s create something<br /><span className="italic font-normal text-[#a35d4e]">memorable</span>.
            </h2>
            <p className="font-mono text-xs md:text-sm text-text-muted leading-relaxed max-w-[480px] mb-12">
              If you have an architectural challenge that requires strict typographic eye, advanced 3D motion, or secure agent integration, get in touch.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-[560px]">
              <a
                href="mailto:contact@samanyu.dev"
                className="w-full sm:w-auto font-mono text-xs tracking-[0.15em] uppercase py-4.5 px-12 border border-[#1a1705] bg-[#1a1705] text-[#f5f0ea] hover:bg-transparent hover:text-[#1a1705] transition-all duration-300 shadow-sm text-center"
              >
                Send Email
              </a>
              <a
                href={data.profile.githubUrl || "https://github.com/Samanyu-dev"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto font-mono text-xs tracking-[0.15em] uppercase py-4.5 px-12 border border-[#1a1705]/20 hover:border-[#1a1705]/80 hover:bg-[#1a1705]/5 text-[#1a1705] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub Profile
              </a>
            </div>

            {/* Footer metadata */}
            <div className="mt-24 pt-8 border-t border-[#1a1705]/5 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="font-serif italic text-2xl text-[#1a1705] font-black">S.</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#1a1705]/30">
                © 2026 Samanyu. All Rights Reserved. Built under luxury studio standards.
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}

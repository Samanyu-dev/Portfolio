'use client'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function SideNav({ active, onNavigate }: { active: string, onNavigate: (id: string) => void }) {
  return (
    <>
      {/* Desktop Sidenav */}
      <nav className="fixed left-0 top-0 h-screen w-[60px] z-[100] hidden md:flex flex-col items-center justify-between py-10 border-r border-[#1a1705]/5 dark:border-white/5 backdrop-blur-[16px] bg-[#f5f0ea]/40 dark:bg-black/40">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="font-serif font-bold text-lg text-[#1a1705] dark:text-white tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
        >
          S.
        </div>

        {/* Rotated Nav items */}
        <div className="flex flex-col gap-10 items-center">
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.id
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              >
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-colors relative block py-2 ${
                    isActive 
                      ? 'text-[#a35d4e] dark:text-white font-bold' 
                      : 'text-[#1a1705]/50 dark:text-white/40 hover:text-[#1a1705] dark:hover:text-white'
                  }`}
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#a35d4e]" />
                    )}
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Year label */}
        <div className="font-mono text-[9px] tracking-widest text-[#1a1705]/30 dark:text-white/20" style={{ writingMode: 'vertical-rl' }}>
          2026
        </div>
      </nav>

      {/* Mobile Sidenav (Horizontal Bottom bar) */}
      <nav className="fixed bottom-0 left-0 w-full h-[64px] z-[100] md:hidden flex items-center justify-around px-4 border-t border-[#1a1705]/5 dark:border-white/5 backdrop-blur-[24px] bg-[#f5f0ea]/75 dark:bg-black/75 shadow-lg">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-mono text-[10px] tracking-[0.12em] uppercase py-2 transition-all ${
                isActive 
                  ? 'text-[#a35d4e] dark:text-white font-bold scale-105' 
                  : 'text-[#1a1705]/50 dark:text-white/40 hover:text-[#1a1705] dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </>
  )
}

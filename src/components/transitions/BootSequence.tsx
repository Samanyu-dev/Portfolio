'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorld } from '@/lib/WorldProvider';

const BOOT_LINES = [
  { text: 'AETHER // SYSTEMS EXPLORER', delay: 0, type: 'header' },
  { text: '─────────────────────────────', delay: 150, type: 'divider' },
  { text: 'initializing cognition engine...', delay: 400, type: 'system' },
  { text: 'loading neural topology...', delay: 700, type: 'system' },
  { text: 'mapping agent networks...', delay: 1000, type: 'system' },
  { text: 'calibrating spatial coordinates...', delay: 1300, type: 'system' },
  { text: 'rendering cognition universe...', delay: 1600, type: 'system' },
  { text: '─────────────────────────────', delay: 1900, type: 'divider' },
  { text: 'SYSTEM READY', delay: 2200, type: 'success' },
  { text: 'ENTERING COGNITION UNIVERSE', delay: 2500, type: 'active' },
];

export default function BootSequence() {
  const { state, dispatch } = useWorld();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  const completeBoot = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_BOOT' });
    }, 600);
  }, [dispatch]);

  useEffect(() => {
    if (state.bootComplete) return;

    /* Reveal lines progressively */
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => Math.max(prev, i + 1));
      }, line.delay);
    });

    /* Auto-complete after last line */
    const finalDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 600;
    const timer = setTimeout(completeBoot, finalDelay);

    return () => clearTimeout(timer);
  }, [state.bootComplete, completeBoot]);

  /* Allow skip on click or keypress */
  useEffect(() => {
    if (state.bootComplete) return;
    const handler = () => completeBoot();
    window.addEventListener('click', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [state.bootComplete, completeBoot]);

  if (state.bootComplete) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ maxWidth: '400px', width: '90%' }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                className={`boot-text ${line.type === 'active' ? 'active' : ''} ${line.type === 'success' ? 'complete' : ''}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  color: line.type === 'header' ? 'var(--violet)' :
                         line.type === 'divider' ? 'var(--void-border)' :
                         line.type === 'success' ? 'var(--green)' :
                         line.type === 'active' ? 'var(--violet)' :
                         undefined,
                  fontWeight: line.type === 'header' ? 600 : undefined,
                  fontSize: line.type === 'header' ? '0.85rem' : undefined,
                }}
              >
                {line.type !== 'header' && line.type !== 'divider' && '> '}
                {line.text}
                {i === visibleLines - 1 && line.type !== 'divider' && (
                  <span className="boot-cursor" />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '2rem',
                fontSize: '0.6rem',
                color: 'var(--text-void)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              click anywhere to skip
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { contactActions } from '@/data/portfolio';
import { useWorld } from '@/lib/WorldProvider';

/* ═══ BACKGROUND DATA STREAMS ═══ */
function DataStreams() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.015;
      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = 10;
        arr[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7c3aed"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══ TYPING EFFECT HOOK ═══ */
function useTypingEffect(text: string, speed = 40, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    let i = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return { displayed, isDone };
}

/* ═══ TERMINAL LINE ═══ */
function TerminalLine({ text, delay = 0, color }: { text: string; delay?: number; color?: string }) {
  const { displayed, isDone } = useTypingEffect(text, 30, delay);
  return (
    <div style={{ color: color || 'var(--text-secondary)', minHeight: '1.8em' }}>
      {displayed}
      {!isDone && <span className="boot-cursor" />}
    </div>
  );
}

/* ═══ ACTION BUTTON ═══ */
function ActionButton({ action }: { action: typeof contactActions[0] }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = useCallback(() => {
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      if (action.type === 'download') {
        const a = document.createElement('a');
        a.href = action.href;
        a.download = '';
        a.click();
      } else {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      }
    }, 1200);
  }, [action]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.button
      className="action-btn"
      onClick={handleClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="action-btn-icon">{action.icon}</span>
      {isLoading ? (
        <span className="action-btn-loading">{action.loadingText}</span>
      ) : (
        <span className="action-btn-label">{action.label}</span>
      )}
    </motion.button>
  );
}

/* ═══ SIGNAL BAR ═══ */
function SignalBar() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => Math.min(prev + Math.random() * 8, 100));
    }, 100);
    const timeout = setTimeout(() => clearInterval(interval), 3000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <div style={{
      marginTop: 'var(--space-xl)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <span>SIGNAL STATUS:</span>
        <div style={{
          flex: 1,
          maxWidth: '200px',
          height: '4px',
          background: 'var(--void-border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: level > 80 ? 'var(--green)' : 'var(--violet)',
              borderRadius: '2px',
            }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span style={{ color: level > 80 ? 'var(--green)' : 'var(--violet)', minWidth: '3em' }}>
          {Math.round(level)}%
        </span>
      </div>
      <div style={{ marginTop: 'var(--space-sm)', color: 'var(--text-void)' }}>
        LAST TRANSMISSION: {new Date().toISOString().split('T')[0].replace(/-/g, '.')}
      </div>
    </div>
  );
}

/* ═══ COMMUNICATION TERMINAL (EXPORTED) ═══ */
export default function CommTerminal() {
  const { state } = useWorld();

  return (
    <>
      {/* World label */}
      <div className="world-label" aria-hidden="true">
        <div>SYS.004</div>
        <div className="world-label-title">COMMUNICATION TERMINAL</div>
      </div>

      {/* Background Three.js */}
      <div className="canvas-container" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
          style={{ background: '#0a0a12' }}
        >
          <DataStreams />
        </Canvas>
      </div>

      {/* Terminal UI overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-content)' as unknown as number,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        pointerEvents: 'none',
      }}>
        <motion.div
          className="terminal-window"
          style={{
            width: 'min(600px, 90vw)',
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* CRT scanline overlay */}
          <div className="crt-overlay" />

          {/* Terminal header */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
            </div>
            <span style={{ marginLeft: 'auto' }}>samanyu // comm_terminal</span>
          </div>

          {/* Terminal body */}
          <div className="terminal-body">
            <TerminalLine
              text="> COMMUNICATION INTERFACE INITIALIZED"
              color="var(--violet)"
            />
            <TerminalLine
              text="> SECURE CHANNELS AVAILABLE"
              delay={600}
              color="var(--green)"
            />
            <div style={{ height: 'var(--space-md)' }} />
            <TerminalLine
              text="SELECT TRANSMISSION PROTOCOL:"
              delay={1200}
              color="var(--text-primary)"
            />

            {/* Action buttons */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
                marginTop: 'var(--space-lg)',
              }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 1.8 },
                },
              }}
            >
              {contactActions.map(action => (
                <motion.div
                  key={action.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ActionButton action={action} />
                </motion.div>
              ))}
            </motion.div>

            {/* Signal bar */}
            <SignalBar />
          </div>
        </motion.div>
      </div>
    </>
  );
}

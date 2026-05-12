"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function NeuralOverlay({ 
  active, 
  mode,
  focusNode = null 
}: { 
  active: string; 
  mode: string;
  focusNode?: string | null;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ((mode === "neural" || focusNode) && (active === "skills" || active === "projects")) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [active, mode, focusNode]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Floating Neural Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-20 bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 360}deg`,
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0, 0.5, 0],
                scaleX: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}

          {/* Random Intermittent Neural Pulses */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute h-[400px] w-[400px] rounded-full border border-neon-purple/10 bg-neon-purple/5 blur-[100px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Centralized animation configuration for consistency and performance
// All animations follow: opacity + transform only (no layout shifts)

export const animationConfig = {
  // Transition timing
  transitions: {
    fast: { duration: 0.2, ease: "easeOut" },
    base: { duration: 0.3, ease: "easeOut" },
    smooth: { duration: 0.4, ease: "easeOut" },
    slow: { duration: 0.6, ease: "easeOut" }
  },

  // Spring physics for natural feel
  springs: {
    tight: { stiffness: 200, damping: 30, mass: 0.5 },
    normal: { stiffness: 100, damping: 15, mass: 0.8 },
    loose: { stiffness: 60, damping: 20, mass: 1 }
  },

  // Entrance animations
  entrances: {
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    },
    fadeDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 }
    },
    fadeScale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 }
    },
    fadeSlideLeft: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 }
    },
    fadeSlideRight: {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 }
    },
    staggerFade: (delay: number) => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay }
    })
  },

  // Exit animations
  exits: {
    fadeOut: {
      exit: { opacity: 0 }
    },
    fadeUp: {
      exit: { opacity: 0, y: -20 }
    }
  },

  // Micro-interactions
  interactions: {
    hoverScale: { scale: 1.02 },
    hoverGlow: { boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" },
    activeScale: { scale: 0.98 },
    focusGlow: { boxShadow: "0 0 24px rgba(56, 189, 248, 0.4)" }
  },

  // Stagger container
  staggerContainer: {
    container: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    },
    item: {
      variants: {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      },
      transition: { duration: 0.3 }
    }
  }
} as const;

// SVG animation helpers
export const svgAnimations = {
  drawPath: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.5, ease: "easeInOut" }
  },
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

// Scroll-based animation presets
export const scrollAnimations = {
  fadeInOnScroll: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  scaleInOnScroll: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
};

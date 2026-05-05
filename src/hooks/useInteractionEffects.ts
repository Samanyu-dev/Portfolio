import { useRef, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

/**
 * Hook for creating magnetic button effect
 * Button follows cursor within a certain radius
 */
export function useMagneticButton() {
  const ref = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const magneticRadius = 50; // pixels
  const strength = 0.4; // 0 to 1, how strong the pull is

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < magneticRadius) {
        const angle = Math.atan2(distY, distX);
        const pullDistance = magneticRadius - distance;
        const x = Math.cos(angle) * pullDistance * strength;
        const y = Math.sin(angle) * pullDistance * strength;

        setPosition({ x, y });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { ref, position };
}

/**
 * Hook for parallax scroll effect
 * Element moves at different speed than scroll
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementOffset = window.innerHeight - rect.top;
      setOffset(elementOffset * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * Hook for scroll progress tracking
 * Tracks how far user has scrolled through a section
 */
export function useScrollProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementHeight = ref.current.clientHeight;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Progress from -1 (above view) to 1 (below view)
      const windowHeight = window.innerHeight;
      const scrollProgress = 1 - elementTop / (windowHeight + elementHeight);
      setProgress(Math.max(0, Math.min(1, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress };
}

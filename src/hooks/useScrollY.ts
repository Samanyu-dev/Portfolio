"use client";

import { useEffect, useState } from "react";

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateScroll = () => setScrollY(window.scrollY);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return scrollY;
}

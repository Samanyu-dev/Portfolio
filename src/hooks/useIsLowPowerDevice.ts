"use client";

import { useEffect, useState } from "react";

export function useIsLowPowerDevice() {
  const [isLowPower, setIsLowPower] = useState(true);

  useEffect(() => {
    const check = () => {
      const cores = navigator.hardwareConcurrency || 4;
      setIsLowPower(window.innerWidth < 768 || cores <= 2);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isLowPower;
}

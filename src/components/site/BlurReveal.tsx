"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BlurRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  by?: "words" | "letters";
};

export function BlurReveal({ text, className, as: Tag = "p", delay = 45, by = "words" }: BlurRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const segments = useMemo(() => (by === "words" ? text.split(" ") : text.split("")), [text, by]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={cn("inline-flex flex-wrap", className)}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className="inline-block"
          style={{
            filter: visible ? "blur(0)" : "blur(10px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: `all 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${index * delay}ms`
          }}
        >
          {segment}
          {by === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

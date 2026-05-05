"use client";

import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "outline" | "ghost";
  }
>;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.08,
      y: (event.clientY - rect.top - rect.height / 2) * 0.08
    });
  };

  return (
    <a
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      data-cursor="interactive"
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark",
        variant === "primary" &&
          "border-primary/10 bg-primary text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-cyan-300",
        variant === "outline" &&
          "border-white/[0.12] bg-white/[0.06] text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-white/10",
        variant === "ghost" && "border-transparent text-slate-300 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

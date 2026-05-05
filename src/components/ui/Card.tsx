import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition duration-300 dark:border-white/10 dark:bg-white/[0.04]",
        className
      )}
      {...props}
    />
  );
}

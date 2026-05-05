import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

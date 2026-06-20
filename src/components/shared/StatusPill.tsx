import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/portfolio-v2";

const statusStyles: Record<ProjectStatus, string> = {
  Production: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "Active Development": "border-sky-300/30 bg-sky-300/10 text-sky-100",
  Archived: "border-amber-300/30 bg-amber-300/12 text-amber-100"
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", statusStyles[status])}>
      {status}
    </span>
  );
}

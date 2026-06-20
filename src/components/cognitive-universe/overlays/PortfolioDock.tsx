"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, Briefcase, Mail, FolderGit2 } from "lucide-react";
import { getProjectImageUrl } from "@/lib/project-image";
import { useUniverse } from "../UniverseProvider";

type DockTab = "projects" | "experience" | "contact";

export function PortfolioDock() {
  const { state, entities, enterProject, dispatch } = useUniverse();
  const [expanded, setExpanded] = useState(true);
  const [tab, setTab] = useState<DockTab>("projects");

  const topProjects = useMemo(
    () => [...entities].sort((a, b) => a.project.rank - b.project.rank).slice(0, 12),
    [entities]
  );

  if (state.introPhase !== "ready" || state.selectedEntity) return null;

  const jumpToAct = (act: "architect" | "contact") => {
    dispatch({
      type: "SET_SCROLL",
      payload: {
        progress: act === "architect" ? 0.8 : 0.95,
        act,
        formation: 1
      }
    });
    window.scrollTo({
      top: act === "architect" ? document.body.scrollHeight * 0.78 : document.body.scrollHeight * 0.95,
      behavior: "smooth"
    });
  };

  return (
    <motion.div
      className="cu-dock fixed inset-x-0 bottom-0 z-40 pointer-events-auto"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-6xl px-3 pb-4 sm:px-6">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mx-auto mb-2 flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60 backdrop-blur-md transition hover:text-white"
        >
          <ChevronUp className={`h-3.5 w-3.5 transition ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide portfolio" : "Show portfolio"}
        </button>

        <AnimatePresence>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex gap-1 border-b border-white/10 p-2">
                <DockTabButton
                  active={tab === "projects"}
                  onClick={() => setTab("projects")}
                  icon={<FolderGit2 className="h-3.5 w-3.5" />}
                  label="Projects"
                  count={entities.length}
                />
                <DockTabButton
                  active={tab === "experience"}
                  onClick={() => {
                    setTab("experience");
                    jumpToAct("architect");
                  }}
                  icon={<Briefcase className="h-3.5 w-3.5" />}
                  label="Experience"
                />
                <DockTabButton
                  active={tab === "contact"}
                  onClick={() => {
                    setTab("contact");
                    jumpToAct("contact");
                  }}
                  icon={<Mail className="h-3.5 w-3.5" />}
                  label="Connect"
                />
              </div>

              {tab === "projects" ? (
                <div className="p-3">
                  <p className="mb-3 px-1 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
                    Click a memory in 3D or select below · {entities.length} projects
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {topProjects.map((entity) => (
                      <button
                        key={entity.id}
                        type="button"
                        onClick={() => enterProject(entity.id)}
                        className="cu-dock-card group flex w-[120px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition hover:border-cyan-400/50 hover:bg-white/10"
                      >
                        <div className="relative aspect-square w-full overflow-hidden">
                          <img
                            src={getProjectImageUrl(entity.project)}
                            alt={entity.project.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-2">
                          <p className="truncate font-mono text-[9px] text-white/40">#{entity.project.rank}</p>
                          <p className="truncate text-xs font-semibold text-white">{entity.project.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="p-4 text-center text-sm text-white/50">
                  Scroll down or use the tab again to open {tab === "experience" ? "memory corridors" : "contact protocol"}.
                </p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DockTabButton({
  active,
  onClick,
  icon,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition ${
        active ? "bg-white/10 text-white" : "text-white/45 hover:bg-white/5 hover:text-white/80"
      }`}
    >
      {icon}
      {label}
      {count !== undefined ? <span className="text-white/30">({count})</span> : null}
    </button>
  );
}

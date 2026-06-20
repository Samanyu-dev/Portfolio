"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { contactData } from "@/data/profile";
import { useUniverse } from "../UniverseProvider";

const CHANNELS = [
  { id: "collaborate", label: "Collaborate", message: "Let's build something ambitious together." },
  { id: "hire", label: "Hire", message: "I'm open to full-time and contract engineering roles." },
  { id: "build", label: "Build Together", message: "Co-create a product from zero to production." },
  { id: "research", label: "Research", message: "AI systems, agents, and applied ML research." },
  { id: "hackathon", label: "Hackathon", message: "Ship fast under pressure — I'm in." },
  { id: "opensource", label: "Open Source", message: "Contribute to meaningful OSS repositories." }
] as const;

export function ContactProtocol() {
  const { state } = useUniverse();
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]["id"] | null>(null);
  const [open, setOpen] = useState(false);

  if (state.selectedEntity) return null;
  if (state.act !== "contact" && state.scrollProgress < 0.82) return null;

  const selected = CHANNELS.find((c) => c.id === channel);

  return (
    <section className="cu-contact relative z-30 flex min-h-[80vh] items-center px-6 py-32 sm:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-400/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Act VI — contact protocol
        </motion.p>
        <motion.h2
          className="mt-4 font-display text-4xl font-semibold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Transmission interface
        </motion.h2>
        <motion.p
          className="mt-3 text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The system recognizes you. Select a channel to open communication.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                setChannel(ch.id);
                setOpen(false);
              }}
              className={`cu-channel cursor-pointer rounded-xl border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider transition ${
                channel === ch.id
                  ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
                  : "border-white/15 bg-white/5 text-white/55 hover:border-white/30 hover:text-white"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {selected ? (
          <motion.div
            className="mt-10 rounded-2xl border border-emerald-500/30 bg-black/50 p-6 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/70">
              Channel: {selected.label}
            </p>
            <p className="mt-3 text-white/70">{selected.message}</p>
            {!open ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="cu-open-channel mt-6 cursor-pointer rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Open communication channel
              </button>
            ) : (
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${contactData.email}?subject=${encodeURIComponent(selected.label)}`}
                  className="block rounded-lg border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
                >
                  Transmit via email
                </a>
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
                >
                  LinkedIn signal
                </a>
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
                >
                  GitHub channel
                </a>
              </div>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

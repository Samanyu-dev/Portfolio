"use client";
import { config } from "@/config-v3";
import RadialCarousel, { WheelItem } from "./RadialCarousel";

// Wheel shows a curated set; the full list lives on GitHub / detail pages.
const FEATURED = ["gomarg","amazon-ml-entity-resolution","AIgnition","palisade-scanner","m-vis","infra-incident-copilot",
  "codeforge","crisis_comm_env","Aether","oracle-agent","stepsai","durgapuja","Loomlane"];

const NAMES: Record<string, string> = {
  "amazon-ml-entity-resolution": "Amazon ML Entity Resolution", "infra-incident-copilot": "Incident Copilot",
  "palisade-scanner": "Palisade Scanner", gomarg: "GoMarg", codeforge: "CodeForge", crisis_comm_env: "Crisis Comm Env",
  "oracle-agent": "Oracle Agent", durgapuja: "Durga Puja", stepsai: "Steps AI",
};
const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Work = () => {
  const items: WheelItem[] = FEATURED
    .map((t) => config.projects.find((p) => p.title === t))
    .filter((p): p is (typeof config.projects)[number] => !!p)
    .map((p, i) => ({
      title: NAMES[p.title] ?? p.title,
      badge: p.category,
      description: `${p.description} (${p.technologies})`,
      image: p.image,
      href: `/projects/${slug(p.title)}`,
      hue: (i * 53 + 200) % 360,
    }));
  items.push({
    title: "And Many More...", badge: "GitHub", href: `https://github.com/${config.social.github}`, external: true, hue: 15,
    description: "30+ more projects across mobile, backend, ML and systems: browse them all on GitHub.",
  });
  return <RadialCarousel kind="project" id="work" heading="My" accent="Projects" model="/models/3d/rack.glb" modelScale={0.9} items={items} />;
};

export default Work;

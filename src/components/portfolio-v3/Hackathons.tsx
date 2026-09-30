"use client";
import RadialCarousel, { WheelItem } from "./RadialCarousel";

// Sources: resumes, Unstop registrations, Kaggle (live ranks, 2026-10-01), GitHub.
const G = "https://github.com/Samanyu-dev/";
const K = "https://www.kaggle.com/competitions/";
const items: WheelItem[] = [
  { title: "Meta x Scaler OpenEnv Hackathon", badge: "Finalist · Top 100", image: "/images/final_confirmation.png",
    description: "Top 100 of 800+ teams (Round 1: top 1,500 of 52,000+). Built Crisis Comm Env, a multi-turn RL environment for crisis communication.",
    github: G + "crisis_comm_env" },
  { title: "WorldQuant BRAIN IQC 2025", badge: "Round 1 · Rank 1", image: "/images/covers/wq-brain.png", hue: 265,
    description: "Rank 1 in Round 1 and Top 20% in Round 2 (Finalist), designing and backtesting alpha signals." },
  { title: "Amazon ML Challenge 2026", badge: "Rank 389 of 10,000+ teams", image: "/images/covers/amazon-ml.png", hue: 35,
    description: "Rank 389 among 10,000+ teams (89k+ individuals registered). Multilingual entity resolution: blocking, C++ features, cross-encoders.",
    study: "/case-studies/amazon-ml-challenge-2026", github: G + "amazon-ml-challenge-2026-entity-resolution" },
  { title: "Kaggle Playground S6E9", badge: "Rank 56 · Top 2%", image: "/images/covers/kaggle-s6e9.png", hue: 200,
    description: "Rank 56 of 3,578 teams. CV-validated hill-climbing and stacking over boosted-tree, linear and MLP legs.",
    href: K + "playground-series-s6e9", external: true, github: G + "playground-s6e9", study: "/case-studies/playground-series-s6e9" },
  { title: "Kaggle CASMI26 Molecule ID", badge: "Rank 246 of 1,925", image: "/images/covers/kaggle-casmi.png", hue: 150,
    description: "Enveda mass-spectra molecule identification. Own baseline plus an adapted public pipeline, with a harness to test it.",
    href: K + "enveda-CASMI26-molecule-id-mass-spectra", external: true, github: G + "casmi26", study: "/case-studies/casmi26" },
  { title: "FinNova Case Competition", badge: "Shortlisted · Winners list", image: "/images/covers/finnova.png", hue: 160,
    description: "Finance and tech case competition run by Shri Ram College of Commerce, Delhi University (2024). Shortlisted and named in the winners list." },
  { title: "Genesis Strategy Competition", badge: "Shortlisted", image: "/images/covers/genesis.png", hue: 320,
    description: "Hansraj College, Delhi University (2023). Shortlisted in round." },
  { title: "Steps AI Hackathon", badge: "Rank 9 of 31", image: "/images/stepsai.png",
    description: "AI mock-interview platform: Next.js + FastAPI, Groq Llama 3.3, SSE streaming, graded PDF scorecards.",
    github: G + "stepsai" },
  { title: "HackOn with Amazon 6.0", badge: "Team Fake Conquerors", image: "/images/covers/hackon.png", hue: 28,
    description: "Amazon's flagship hackathon (2026). Submitted as team Fake Conquerors." },
  { title: "Nomura Quant Challenge 2026", badge: "Participant", image: "/images/covers/nomura.png", hue: 350,
    description: "C++ swap-pricing engine with bootstrapped curves and sensitivities, plus an ML market-making system.",
    github: G + "nomura_quant_challenge_2026" },
  { title: "Adobe India Hackathon", badge: "Participant", image: "/images/covers/adobe.png", hue: 0,
    description: "Team FITS, 2025." },
  { title: "Flipkart GRiD 6.0", badge: "Software Dev Track", image: "/images/covers/flipkart.png", hue: 215,
    description: "Flipkart's national engineering challenge, software development track (2024)." },
  { title: "ET AI Hackathon 2.0", badge: "Participant", image: "/images/covers/et-ai.png", hue: 10,
    description: "Economic Times AI hackathon (2026)." },
  { title: "Odoo Hackathon 2025", badge: "Participant", image: "/images/covers/odoo.png", hue: 300,
    description: "Odoo's annual hackathon (2025)." },
  { title: "Algo University DP Camp", badge: "4,000 of 40,000+", image: "/images/covers/algo-uni.png", hue: 290,
    description: "Shortlisted from 40,000+ applicants; one of roughly 1,000 to complete and certify." },
  { title: "And Many More...", badge: "15+ events", image: "/images/covers/many-more.png", href: "https://linkedin.com/in/samanyu-reddy-allipuram", external: true,
    description: "Tata Imagination, AmEx Campus Challenge, D3CODE (UST), CodeClash 2.0, Hack for Impact (IIIT-D), WCHL, Simulation 3.0 (IIM Shillong), BITS Fintech, Amazon ML Summer School." },
];

const Hackathons = () => <RadialCarousel kind="hackathon" id="hackathons" heading="Hackathons &" accent="Competitions" model="/models/3d/trophy.glb" modelScale={0.8} items={items} />;
export default Hackathons;

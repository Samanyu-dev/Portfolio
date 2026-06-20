import type { ContactData, EducationEntry, ExperienceNode } from "@/types/portfolio-v2";

export const contactData: ContactData = {
  email: "allipuramsamanyu@gmail.com",
  linkedin: "https://linkedin.com/in/samanyu-reddy-allipuram",
  github: "https://github.com/Samanyu-dev",
  huggingface: "https://huggingface.co/Sammy1808",
  website: "https://samanyuallipuram.vercel.app",
  phone: "+91 9000012025",
  resumePath: "/samanyu_resume.pdf"
};

export const experienceNodes: ExperienceNode[] = [
  {
    id: "blueberry",
    role: "Full Stack Intern",
    organization: "Blueberry Digital Labs",
    start: "2024-05",
    end: "2024-08",
    location: "Hyderabad, India",
    technologies: ["React", "PHP", "REST APIs", "JavaScript"],
    responsibilities: [
      "Developed engineering calculators using React.js and PHP-backed APIs",
      "Defined API contracts and collaborated with frontend engineers on integration"
    ],
    achievements: [
      "Delivered production-facing calculators in internship sprint windows",
      "Improved integration reliability through cleaner API coordination"
    ],
    growthTheme: "Foundation in production web delivery"
  },
  {
    id: "swecha",
    role: "AI Intern",
    organization: "Swecha Foundation",
    start: "2025-05",
    end: "2025-08",
    location: "Hyderabad, India",
    technologies: ["Ollama", "Hugging Face", "Docker", "Flutter"],
    responsibilities: [
      "Built AI agents and deployed prototypes using Hugging Face and Docker",
      "Led Flutter app development for multilingual dataset collection"
    ],
    achievements: [
      "Built intern activity and GitHub monitoring tool for delivery tracking",
      "Improved local AI workflow debugging with Ollama-based iteration"
    ],
    growthTheme: "Shift from product engineering to applied AI systems"
  },
  {
    id: "bits",
    role: "Flutter App Developer",
    organization: "BITS Hyderabad",
    start: "2025-10",
    end: "2026-02",
    location: "Hyderabad, India",
    technologies: ["Flutter", "SQLite", "Firebase", "OpenAI GPT-4", "Whisper", "Krea AI"],
    responsibilities: [
      "Built a cross-platform Flutter app with offline-first architecture using SQLite and Firebase",
      "Integrated OpenAI GPT-4, Krea AI, and Whisper APIs for image generation and multilingual speech workflows"
    ],
    achievements: [
      "Designed and shipped Voice Khata, a Bengali voice-enabled financial ledger",
      "Deployed end-to-end AI-assisted idol-design workflow in a production-style app"
    ],
    growthTheme: "Mobile UX depth + AI interaction design"
  },
  {
    id: "nosh",
    role: "Backend Developer",
    organization: "NOSH Euphotic Labs",
    start: "2025-05",
    end: "2026-09",
    location: "Remote",
    technologies: ["Python", "Automation", "Instacart API", "Walmart API"],
    responsibilities: [
      "Led a team building a grocery ordering system using Instacart and Walmart workflows",
      "Integrated APIs for cart automation and backend execution reliability"
    ],
    achievements: [
      "Reduced manual order handling by automating checkout flows",
      "Stabilized multi-provider ordering orchestration"
    ],
    growthTheme: "Systems thinking under real-world integration constraints"
  },
  {
    id: "loomlane",
    role: "Backend Developer",
    organization: "Loomlane",
    start: "2025-11",
    end: "2026-02",
    location: "Remote",
    technologies: ["MongoDB", "JWT", "Google OAuth", "Razorpay", "Stripe"],
    responsibilities: [
      "Migrated backend persistence from Supabase to MongoDB",
      "Implemented secure auth, token refresh, and payment workflows"
    ],
    achievements: [
      "Delivered secure commerce-ready backend architecture",
      "Enabled multi-gateway payments with improved reliability"
    ],
    growthTheme: "Production backend ownership and platform hardening"
  }
];

export const education: EducationEntry[] = [
  {
    institution: "Birla Institute of Technology and Science, Pilani (Hyderabad Campus)",
    degree: "B.E. in Civil Engineering, Minor in Robotics and Automation",
    period: "2023 - 2027",
    details: "Core engineering foundation with specialization focus on robotics, automation, and intelligent software systems."
  }
];

export const achievements = [
  "Meta OpenEnv HF Scaler (April 2026): Top 100 finalist teams out of 800+ and top 1500 out of 52,000+ participants in Round 1",
  "Goldman Sachs India Hackathon 2026 (May 2026): Qualified and ranked participant in Computer Science track",
  "Built and maintained 25+ public repositories across AI, web, backend, and mobile domains",
  "Developed strong cross-stack capability from 3D UI and interaction design to backend infrastructure and AI systems"
];

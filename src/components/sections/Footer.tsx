import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/Samanyu-dev", icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samanyu-reddy-allipuram", icon: BriefcaseBusiness },
  { label: "Email", href: "mailto:allipuramsamanyu@gmail.com", icon: Mail }
];

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] border border-black/10 bg-white/70 p-6 text-center backdrop-blur dark:border-white/10 dark:bg-white/[0.04] md:flex-row md:text-left">
        <div>
          <p className="text-lg font-black">Samanyu Reddy Allipuram</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Building intelligent systems and beautiful interfaces.</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full bg-zinc-950 text-white transition hover:scale-110 hover:bg-primary hover:shadow-glow dark:bg-white dark:text-dark"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-500">&copy; 2026 Samanyu. All rights reserved.</p>
      </div>
    </footer>
  );
}

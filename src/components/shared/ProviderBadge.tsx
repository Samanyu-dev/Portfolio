import type { DeploymentProvider } from "@/types/portfolio-v2";

const colors: Record<DeploymentProvider, string> = {
  vercel: "bg-black/40 text-white",
  render: "bg-indigo-500/20 text-indigo-100",
  railway: "bg-violet-500/20 text-violet-100",
  netlify: "bg-teal-500/20 text-teal-100",
  "github-pages": "bg-gray-500/25 text-gray-100",
  huggingface: "bg-yellow-500/20 text-yellow-100",
  other: "bg-white/15 text-text-1"
};

export function ProviderBadge({ provider }: { provider: DeploymentProvider }) {
  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${colors[provider]}`}>
      {provider}
    </span>
  );
}

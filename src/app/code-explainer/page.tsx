import type { Metadata } from "next";
import { CodeExplainer } from "@/components/ai/CodeExplainer";
import { AppShell } from "@/components/ui/AppShell";

export const metadata: Metadata = {
  title: "AI Code Explainer",
  description: "Explain any codebase using Claude AI. Powered by Claude Opus 4.6",
};

export default function CodeExplainerPage() {
  return (
    <AppShell>
      <div className="min-h-screen py-24">
        <div className="site-container">
          <div className="mb-12 text-center">
            <h1 className="page-title mb-4">AI Code Explainer</h1>
            <p className="mx-auto max-w-xl text-text-1">
              Paste any code and let AI explain the architecture, decisions, and engineering thinking behind it.
            </p>
          </div>

          <CodeExplainer language="typescript" />
        </div>
      </div>
    </AppShell>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, RefreshCw, Code2, Lightbulb, Zap } from "lucide-react";

interface CodeExplainerProps {
  initialCode?: string;
  language?: string;
  projectName?: string;
  context?: string;
}

export function CodeExplainer({
  initialCode = "",
  language = "typescript",
  projectName,
  context,
}: CodeExplainerProps) {
  const [code, setCode] = useState(initialCode);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateExplanation = async () => {
    if (!code.trim()) {
      setError("Please enter some code to explain");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/explain-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, context: context ?? projectName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate explanation");
      }

      setExplanation(data.explanation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-bg-1 border border-line rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-bg-2/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-0">
                AI Code Explainer
              </h3>
              <p className="text-xs text-text-2">
                Powered by Claude Opus 4.6
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-[10px] uppercase tracking-wider bg-primary/10 text-primary rounded font-mono">
              {language}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text-1 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Your code
              </label>
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md hover:bg-bg-2 transition-colors text-text-2 hover:text-text-0"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Paste your ${language} code here...`}
              className="w-full h-48 p-4 bg-bg-0 border border-line rounded-lg font-mono text-sm text-text-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-text-2"
            />
          </div>

          <button
            onClick={generateExplanation}
            disabled={isLoading || !code.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Explain with AI
              </>
            )}
          </button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {explanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-text-1">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Explanation
                </div>
                <div className="p-4 bg-bg-0 border border-line rounded-lg">
                  <div className="prose prose-sm prose-invert max-w-none">
                    {explanation.split("\n").map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0 text-text-1 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
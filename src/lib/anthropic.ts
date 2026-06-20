import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

export const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

export function isClaudeConfigured(): boolean {
  return !!apiKey;
}

const CODE_EXPLANATION_SYSTEM_PROMPT = `You are an expert software engineer explaining code to potential employers, collaborators, and curious developers. Your goal is to make complex code understandable and highlight the engineering thinking behind implementations.

 Guidelines:
 - Explain the "why" not just the "what"
 - Highlight architectural decisions and trade-offs
 - Connect code to real-world problems it solves
 - Show systems thinking and engineering depth
 - Keep explanations accessible but technically accurate
 - Use analogies where helpful
 - Focus on interesting/clever parts of the implementation`;

export async function explainCode({
  code,
  language,
  context,
}: {
  code: string;
  language: string;
  context?: string;
}): Promise<string> {
  if (!anthropic) {
    throw new Error("Claude API not configured");
  }

  const userMessage = context
    ? `Explain this ${language} code:\n\n${code}\n\nContext: ${context}`
    : `Explain this ${language} code:\n\n${code}`;

  const response = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: CODE_EXPLANATION_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
    thinking: { type: "adaptive" },
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "No explanation available";
}

export async function explainProjectArchitecture({
  repoName,
  techStack,
  features,
}: {
  repoName: string;
  techStack: string[];
  features: string[];
}): Promise<string> {
  if (!anthropic) {
    throw new Error("Claude API not configured");
  }

  const userMessage = `Explain the architecture for "${repoName}" built with ${techStack.join(
    ", "
  )} that includes: ${features.join(", ")}`;

  const response = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: `You are a principal engineer explaining technical architectures. Create compelling narratives that showcase systems thinking, engineering depth, and product sense. Connect technical decisions to business value.`,
    messages: [{ role: "user", content: userMessage }],
    thinking: { type: "adaptive" },
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "No explanation available";
}
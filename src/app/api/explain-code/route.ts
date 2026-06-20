import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Claude API not configured. Add ANTHROPIC_API_KEY to environment." },
      { status: 503 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const { code, language, context } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing required fields: code and language" },
        { status: 400 }
      );
    }

    const userMessage = context
      ? `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\n\nContext: ${context}`
      : `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;

    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      system: `You are an expert software engineer explaining code to potential employers and collaborators. Your goal is to make complex code understandable and highlight the engineering thinking behind implementations.

Guidelines:
- Explain the "why" not just the "what"
- Highlight architectural decisions and trade-offs
- Connect code to real-world problems it solves
- Show systems thinking and engineering depth
- Keep explanations accessible but technically accurate
- Use analogies where helpful
- Focus on interesting/clever parts of the implementation`,
      messages: [{ role: "user", content: userMessage }],
      thinking: { type: "adaptive" },
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const explanation = textBlock?.text ?? "No explanation available";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Code explanation error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
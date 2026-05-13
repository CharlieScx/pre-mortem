import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.js";

export interface EngineOptions {
  apiKey: string;
  model?: string;
  lang: "zh" | "en";
  onText?: (text: string) => void;
}

export async function runPreMortem(
  decision: string,
  context: string | null,
  options: EngineOptions
): Promise<string> {
  const client = new Anthropic({ apiKey: options.apiKey });
  const model = options.model ?? "claude-sonnet-4-6-20250514";

  const systemPrompt = buildSystemPrompt(options.lang);
  const userPrompt = buildUserPrompt(decision, context, options.lang);

  let fullText = "";

  const stream = await client.messages.stream({
    model,
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      const text = event.delta.text;
      fullText += text;
      options.onText?.(text);
    }
  }

  return fullText;
}

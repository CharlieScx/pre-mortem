import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.js";
import { type Provider, getDefaultModel } from "./config.js";

export interface EngineOptions {
  provider: Provider;
  apiKey: string;
  baseUrl?: string;
  model?: string;
  lang: "zh" | "en";
  onText?: (text: string) => void;
}

export async function runPreMortem(
  decision: string,
  context: string | null,
  options: EngineOptions
): Promise<string> {
  const model = options.model ?? getDefaultModel(options.provider);
  const systemPrompt = buildSystemPrompt(options.lang);
  const userPrompt = buildUserPrompt(decision, context, options.lang);

  if (options.provider === "anthropic") {
    return runAnthropic(systemPrompt, userPrompt, model, options);
  }
  return runOpenAICompatible(systemPrompt, userPrompt, model, options);
}

async function runAnthropic(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  options: EngineOptions
): Promise<string> {
  const client = new Anthropic({ apiKey: options.apiKey });
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

async function runOpenAICompatible(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  options: EngineOptions
): Promise<string> {
  const config: { apiKey: string; baseURL?: string; defaultHeaders?: Record<string, string> } = {
    apiKey: options.apiKey,
  };

  if (options.provider === "openrouter") {
    config.baseURL = "https://openrouter.ai/api/v1";
    config.defaultHeaders = { "X-Title": "pre-mortem" };
  } else if (options.baseUrl) {
    config.baseURL = options.baseUrl;
  }

  const client = new OpenAI(config);
  let fullText = "";

  const stream = await client.chat.completions.create({
    model,
    max_tokens: 4096,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) {
      fullText += text;
      options.onText?.(text);
    }
  }

  return fullText;
}

export type Provider = "anthropic" | "openai" | "openrouter";

interface ProviderConfig {
  provider: Provider;
  apiKey: string;
  baseUrl?: string;
}

const PROVIDER_ENV: Record<Provider, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
};

const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: "claude-sonnet-4-6-20250514",
  openai: "gpt-4o",
  openrouter: "anthropic/claude-sonnet-4-6-20250514",
};

export function getDefaultModel(provider: Provider): string {
  return DEFAULT_MODELS[provider];
}

export function resolveProvider(
  explicitProvider?: string,
  baseUrl?: string
): ProviderConfig {
  if (explicitProvider) {
    const provider = explicitProvider as Provider;
    const envVar = PROVIDER_ENV[provider];
    if (!envVar) {
      console.error(
        `\n  Unknown provider "${provider}". Supported: anthropic, openai, openrouter\n`
      );
      process.exit(1);
    }
    const apiKey = process.env[envVar];
    if (!apiKey) {
      printMissingKeyError(provider, envVar);
      process.exit(1);
    }
    return { provider, apiKey, baseUrl };
  }

  for (const provider of ["anthropic", "openai", "openrouter"] as Provider[]) {
    const key = process.env[PROVIDER_ENV[provider]];
    if (key) {
      return { provider, apiKey: key, baseUrl };
    }
  }

  console.error(
    "\n  No API key found. Set one of:\n\n" +
      "    export ANTHROPIC_API_KEY=sk-ant-...    # Anthropic Claude\n" +
      "    export OPENAI_API_KEY=sk-...           # OpenAI / compatible\n" +
      "    export OPENROUTER_API_KEY=sk-or-...    # OpenRouter (any model)\n\n" +
      "  Get keys at:\n" +
      "    Anthropic:   https://console.anthropic.com/settings/keys\n" +
      "    OpenAI:      https://platform.openai.com/api-keys\n" +
      "    OpenRouter:  https://openrouter.ai/keys\n"
  );
  process.exit(1);
}

function printMissingKeyError(provider: Provider, envVar: string): void {
  const urls: Record<Provider, string> = {
    anthropic: "https://console.anthropic.com/settings/keys",
    openai: "https://platform.openai.com/api-keys",
    openrouter: "https://openrouter.ai/keys",
  };
  console.error(
    `\n  Missing ${envVar}. Set it with:\n\n` +
      `    export ${envVar}=your-key-here\n\n` +
      `  Get your key at: ${urls[provider]}\n`
  );
}

export function detectLanguage(text: string): "zh" | "en" {
  const chineseChars = text.match(/[一-鿿]/g);
  return chineseChars && chineseChars.length > text.length * 0.1 ? "zh" : "en";
}

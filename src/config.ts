export function getApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.error(
      "\n  Missing API key. Set it with:\n\n" +
        "    export ANTHROPIC_API_KEY=sk-ant-...\n\n" +
        "  Get your key at: https://console.anthropic.com/settings/keys\n"
    );
    process.exit(1);
  }
  return key;
}

export function detectLanguage(text: string): "zh" | "en" {
  const chineseChars = text.match(/[一-鿿]/g);
  return chineseChars && chineseChars.length > text.length * 0.1 ? "zh" : "en";
}

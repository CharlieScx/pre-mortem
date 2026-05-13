# Pre-Mortem

> Every AI helps you succeed. This one helps you rehearse failure.

**Pre-Mortem** is a CLI tool that runs an AI-powered [Pre-Mortem analysis](https://en.wikipedia.org/wiki/Pre-mortem) on your decisions. Before you commit to a major choice, it generates three first-person failure stories from your future self — each exploring a different dimension of how things could go wrong.

Based on **Gary Klein's prospective hindsight method**, which research shows increases the ability to identify reasons for future outcomes by 30%.

[中文文档](./README.zh-CN.md)

## How It Works

You describe a decision you're about to make. The tool responds with:

1. **The Executor** — "I overestimated my ability to execute..." (capacity, resources, time)
2. **The Analyst** — "I missed a critical signal..." (wrong assumptions, blind spots)
3. **The Connector** — "I never expected them to..." (others' reactions, environment shifts)

Each persona tells a vivid, first-person story of failure — not a bullet-point risk list, but a narrative designed to trigger genuine cognitive dissonance.

Finally, it distills a **Decision Checklist** from all three failure stories.

## Quick Start

```bash
# Install
npm install -g pre-mortem

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# Run it
pre-mortem "I'm going to quit my job and start a solo SaaS business"
```

Or use without installing:

```bash
npx pre-mortem "I'm about to publicly share a controversial opinion on social media"
```

## Usage

```bash
# Interactive mode — the tool will ask you questions
pre-mortem

# Direct mode — pass your decision as an argument
pre-mortem "I'm going to invest my savings in crypto"

# Switch AI provider
pre-mortem "..." --provider openai           # Use OpenAI (GPT-4o)
pre-mortem "..." --provider openrouter       # Use OpenRouter (any model)
pre-mortem "..." --provider anthropic        # Use Anthropic Claude (default)

# Use a custom OpenAI-compatible endpoint (DeepSeek, Qwen, etc.)
pre-mortem "..." --provider openai --base-url https://api.deepseek.com/v1

# Other options
pre-mortem "我要辞职创业" --lang zh          # Force Chinese output
pre-mortem "..." --format markdown           # Markdown output
pre-mortem "..." --format json               # JSON output
pre-mortem "..." --save result.md            # Save to file
pre-mortem "..." --model claude-opus-4-7     # Use a specific model
```

## Example Output

```
╭──────────────────────────────────────────────────────╮
│                                                      │
│   Pre-Mortem                                         │
│   Every AI helps you succeed.                        │
│   This one helps you rehearse failure.                │
│                                                      │
╰──────────────────────────────────────────────────────╯

┌ Decision ────────────────────────────────────────────┐
│ I'm going to quit my job and go full-time on my app  │
└──────────────────────────────────────────────────────┘

💥 The Executor

I told myself I'd ship the MVP in three months. After all, I'd been
building side projects for years...

[Full narrative continues...]

⚠ Fatal Blind Spot:
- I confused "building features on weekends" with "running a business
  full-time" — they require completely different energy management.

──────────────────────────────────────────────────────

🔍 The Analyst

I missed the signal that was right in front of me: my app had 200
users, but only 12 were paying...

──────────────────────────────────────────────────────

🔗 The Connector

I never expected my co-founder to lose interest by month four...

──────────────────────────────────────────────────────

✅ Decision Checklist:
  □ Do I have 12+ months of runway without any revenue?
  □ Have I validated willingness-to-pay, not just interest?
  □ ...
```

## Why Pre-Mortem?

Most AI tools help you plan for success. But decades of research in behavioral psychology show that **imagining failure is more powerful than imagining success** for actual decision-making:

- **Gary Klein (1989)** found that prospective hindsight — imagining an event has already occurred — increases the ability to identify reasons for future outcomes by **30%**.
- **Kahneman** recommends Pre-Mortem as one of the most effective debiasing techniques.
- Unlike pros/cons lists, first-person failure narratives create **emotional engagement** that bypasses rationalization.

## Configuration

Supports **3 providers** — the tool auto-detects which API key is set:

```bash
# Anthropic Claude (default)
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI / OpenAI-compatible (GPT-4o, DeepSeek, Qwen, etc.)
export OPENAI_API_KEY=sk-...

# OpenRouter (access any model with one key)
export OPENROUTER_API_KEY=sk-or-...
```

Get keys at:
- Anthropic: [console.anthropic.com](https://console.anthropic.com/settings/keys)
- OpenAI: [platform.openai.com](https://platform.openai.com/api-keys)
- OpenRouter: [openrouter.ai](https://openrouter.ai/keys)

## Contributing

Contributions are welcome! Feel free to:

- Open issues for bugs or feature requests
- Submit PRs for improvements
- Share your Pre-Mortem results (anonymized) as examples

## License

MIT

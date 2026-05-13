# Pre-Mortem 事前验尸

> 所有 AI 都帮你「去做」，这个帮你「预演失败」。

**Pre-Mortem** 是一个 AI 驱动的命令行工具，基于 [Gary Klein 的前瞻性反思法](https://en.wikipedia.org/wiki/Pre-mortem)，在你做出重大决策之前，生成三个来自「一年后失败的自己」的第一人称叙述——每个叙述探索不同维度的失败可能。

研究表明，前瞻性反思法能将识别未来结果原因的能力提升 **30%**。

[English](./README.md)

## 工作原理

你描述一个即将做出的决策，工具会从三个角色回应：

1. **执行崩塌者** —— 「我高估了自己的执行力...」（能力/资源/时间）
2. **判断失误者** —— 「我忽略了一个关键信号...」（错误假设、信息盲区）
3. **关系断裂者** —— 「我没想到他们会...」（他人反应、环境变化）

每个角色讲述一个生动的第一人称失败故事——不是风险清单，而是旨在引发真正「认知失调」的叙事。

最后，从三个失败故事中提炼一份**决策检查清单**。

## 快速开始

```bash
# 安装
npm install -g pre-mortem

# 设置 API 密钥（三选一）
export ANTHROPIC_API_KEY=sk-ant-...    # Anthropic Claude
export OPENAI_API_KEY=sk-...           # OpenAI / 兼容接口
export OPENROUTER_API_KEY=sk-or-...    # OpenRouter（一个 key 用所有模型）

# 运行
pre-mortem "我要辞职去做独立开发"
```

或者免安装直接使用：

```bash
npx pre-mortem "我要在朋友圈公开发表一个争议观点"
```

## 使用方式

```bash
# 交互模式——工具会引导你输入
pre-mortem

# 直接模式——把决策作为参数传入
pre-mortem "我要把积蓄投入加密货币"

# 切换 AI 供应商
pre-mortem "..." --provider openai           # 使用 OpenAI (GPT-4o)
pre-mortem "..." --provider openrouter       # 使用 OpenRouter
pre-mortem "..." --provider anthropic        # 使用 Anthropic Claude（默认）

# 使用 OpenAI 兼容接口（DeepSeek、通义千问等）
pre-mortem "..." --provider openai --base-url https://api.deepseek.com/v1

# 其他选项
pre-mortem "I want to quit my job" --lang en   # 强制英文输出
pre-mortem "..." --format markdown              # Markdown 格式输出
pre-mortem "..." --format json                  # JSON 格式输出
pre-mortem "..." --save result.md               # 保存结果到文件
pre-mortem "..." --model claude-opus-4-7        # 指定模型
```

## 为什么需要 Pre-Mortem？

大多数 AI 工具帮你规划成功。但行为心理学数十年的研究表明，**想象失败比想象成功对实际决策更有力**：

- **Gary Klein (1989)** 发现，前瞻性反思——想象事件已经发生——能将识别未来结果原因的能力提升 **30%**。
- **Kahneman** 推荐 Pre-Mortem 为最有效的「去偏见」技术之一。
- 与利弊清单不同，第一人称失败叙事能创造**情感参与**，绕过合理化防御。

## 许可证

MIT

import { Command } from "commander";
import { writeFileSync } from "node:fs";
import { getApiKey, detectLanguage } from "./config.js";
import { runPreMortem } from "./engine.js";
import { gatherInput } from "./interactive.js";
import {
  printBanner,
  printDecision,
  createSpinner,
  formatOutput,
  printSavedMessage,
} from "./formatter.js";

const program = new Command();

program
  .name("pre-mortem")
  .description(
    "AI-powered Pre-Mortem analysis — rehearse failure before you decide."
  )
  .version("0.1.0")
  .argument("[decision]", "The decision you are about to make")
  .option("--lang <lang>", "Output language: zh or en (auto-detected by default)")
  .option("--model <model>", "Claude model to use", "claude-sonnet-4-6-20250514")
  .option("--format <format>", "Output format: text, markdown, json", "text")
  .option("--save <path>", "Save results to a file")
  .option("--no-color", "Disable colored output")
  .action(async (decisionArg: string | undefined, opts) => {
    printBanner();

    const { decision, context } = await gatherInput(decisionArg);
    const lang: "zh" | "en" = opts.lang ?? detectLanguage(decision);

    printDecision(decision, lang);

    const apiKey = getApiKey();
    const spinnerText = lang === "zh" ? "正在预演你的失败..." : "Rehearsing your failure...";
    const spinner = createSpinner(spinnerText);
    spinner.start();

    let spinnerCleared = false;

    try {
      const result = await runPreMortem(decision, context, {
        apiKey,
        model: opts.model,
        lang,
        onText: (text) => {
          if (!spinnerCleared) {
            spinner.stop();
            spinnerCleared = true;
            console.log();
          }
          if (opts.format === "text") {
            process.stdout.write(text);
          }
        },
      });

      if (opts.format === "text") {
        console.log("\n");
      } else if (opts.format === "markdown") {
        console.log(result);
      } else if (opts.format === "json") {
        const output = { decision, context, lang, result, timestamp: new Date().toISOString() };
        console.log(JSON.stringify(output, null, 2));
      }

      if (opts.save) {
        const content =
          opts.format === "json"
            ? JSON.stringify({ decision, context, lang, result, timestamp: new Date().toISOString() }, null, 2)
            : `# Pre-Mortem: ${decision}\n\n${result}`;
        writeFileSync(opts.save, content, "utf-8");
        printSavedMessage(opts.save);
      }
    } catch (err: unknown) {
      spinner.stop();
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("401") || message.includes("authentication")) {
        console.error("\n  Invalid API key. Check your ANTHROPIC_API_KEY.\n");
      } else if (message.includes("429")) {
        console.error("\n  Rate limited. Please wait a moment and try again.\n");
      } else {
        console.error(`\n  Error: ${message}\n`);
      }
      process.exit(1);
    }
  });

program.parse();

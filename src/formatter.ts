import chalk from "chalk";
import boxen from "boxen";
import ora, { type Ora } from "ora";

const PERSONA_STYLES = {
  executor: { color: chalk.red, icon: "💥", label: "The Executor | 执行崩塌者" },
  analyst: { color: chalk.yellow, icon: "🔍", label: "The Analyst | 判断失误者" },
  connector: { color: chalk.blue, icon: "🔗", label: "The Connector | 关系断裂者" },
} as const;

export function printBanner(): void {
  const banner = boxen(
    chalk.bold("Pre-Mortem") +
      "\n" +
      chalk.dim("Every AI helps you succeed. This one helps you rehearse failure."),
    {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 0, right: 0 },
      borderStyle: "round",
      borderColor: "gray",
    }
  );
  console.log(banner);
}

export function createSpinner(text: string): Ora {
  return ora({ text, spinner: "dots" });
}

export function printDecision(decision: string, lang: "zh" | "en"): void {
  const label = lang === "zh" ? "决策" : "Decision";
  console.log(
    boxen(chalk.white.bold(decision), {
      title: label,
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
      borderStyle: "single",
      borderColor: "white",
      dimBorder: true,
    })
  );
  console.log();
}

export function formatOutput(text: string): string {
  return text
    .replace(
      /\*\*(The Executor[^*]*)\*\*/g,
      PERSONA_STYLES.executor.color.bold(`${PERSONA_STYLES.executor.icon} $1`)
    )
    .replace(
      /\*\*(执行崩塌者[^*]*)\*\*/g,
      PERSONA_STYLES.executor.color.bold(`${PERSONA_STYLES.executor.icon} $1`)
    )
    .replace(
      /\*\*(The Analyst[^*]*)\*\*/g,
      PERSONA_STYLES.analyst.color.bold(`${PERSONA_STYLES.analyst.icon} $1`)
    )
    .replace(
      /\*\*(判断失误者[^*]*)\*\*/g,
      PERSONA_STYLES.analyst.color.bold(`${PERSONA_STYLES.analyst.icon} $1`)
    )
    .replace(
      /\*\*(The Connector[^*]*)\*\*/g,
      PERSONA_STYLES.connector.color.bold(`${PERSONA_STYLES.connector.icon} $1`)
    )
    .replace(
      /\*\*(关系断裂者[^*]*)\*\*/g,
      PERSONA_STYLES.connector.color.bold(`${PERSONA_STYLES.connector.icon} $1`)
    )
    .replace(
      /\*\*(Fatal Blind Spot|致命盲点)[：:]\*\*/g,
      chalk.red.bold("⚠ $1:")
    )
    .replace(
      /\*\*(Decision Checklist|决策检查清单)[：:]\*\*/g,
      chalk.green.bold("✅ $1:")
    )
    .replace(/\*\*([^*]+)\*\*/g, chalk.bold("$1"))
    .replace(/^---$/gm, chalk.dim("─".repeat(50)))
    .replace(/^- \[ \]/gm, chalk.green("  □"));
}

export function printSavedMessage(path: string): void {
  console.log(chalk.dim(`\nResults saved to: ${path}`));
}

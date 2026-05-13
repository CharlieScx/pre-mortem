import { input, confirm } from "@inquirer/prompts";

export interface InteractiveResult {
  decision: string;
  context: string | null;
}

export async function gatherInput(
  initialDecision?: string
): Promise<InteractiveResult> {
  let decision = initialDecision?.trim() ?? "";

  if (!decision) {
    decision = await input({
      message: "What decision are you about to make?",
    });
  }

  if (decision.length < 10) {
    console.log(
      "\n  Your decision seems brief. More detail leads to sharper analysis.\n"
    );
    const elaborate = await confirm({
      message: "Want to add more context?",
      default: true,
    });
    if (elaborate) {
      const extra = await input({
        message: "Tell me more about this decision:",
      });
      decision = `${decision} — ${extra}`;
    }
  }

  const wantsContext = await confirm({
    message: "Add background context? (stakes, timeline, constraints)",
    default: false,
  });

  let context: string | null = null;
  if (wantsContext) {
    context = await input({
      message: "Background context:",
    });
  }

  return { decision, context };
}

import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

import { getGeminiModel } from "./ai-gateway.server";

const InputSchema = z.object({
  resume: z.string().trim().min(20).max(15000),
  mode: z.enum(["roast", "optimize"]),
});

const ResultSchema = z.object({
  summary: z.string(),
  items: z
    .array(
      z.object({
        before: z.string(),
        after: z.string(),
      }),
    )
    .min(1)
    .max(40),
});

const ROAST_SYSTEM = `You are a savage stand-up comedian roasting RESUME BULLET POINTS for entertainment.

HARD RULES — do not break:
- Attack the TEXT and the WRITING, never the person, their identity, body, family, intelligence, gender, race, religion, or mental health.
- No slurs, no profanity beyond mild PG-13, no threats, no sexual content.
- Each roast must be punchy (1-3 sentences), witty, and specifically reference what's weak about THIS bullet (vague verbs, missing metrics, buzzwords, passive voice).
- End every roast with a tiny constructive nudge implied through the joke.

OUTPUT:
- "summary": one savage but text-only overall verdict on the resume's writing (2-3 sentences).
- "items": one entry per meaningful bullet/line in the resume. "before" = the original line verbatim. "after" = the roast.`;

const OPTIMIZE_SYSTEM = `Act as a Fortune 500 recruiter and resume coach.

Rewrite each resume bullet point to:
- Lead with a strong action verb (Led, Architected, Drove, Reduced, Shipped, Negotiated, etc.).
- Imply or include measurable metrics (%, $, time saved, scale, headcount). If the original lacks numbers, insert realistic placeholder metrics in [brackets] like "[X%]" so the user can fill them [...]
- Be concise (1-2 lines), specific, and accomplishment-oriented (not duty-oriented).
- Use the XYZ formula where possible: "Accomplished X, as measured by Y, by doing Z."

OUTPUT:
- "summary": a 2-3 sentence professional assessment of the resume's strengths and biggest opportunities.
- "items": one entry per meaningful bullet/line. "before" = the original line verbatim. "after" = the polished rewrite.`;

export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const model = getGeminiModel();

    const system = data.mode === "roast" ? ROAST_SYSTEM : OPTIMIZE_SYSTEM;

    try {
      const { experimental_output } = await generateText({
        model,
        system,
        prompt: `Resume to analyze:\n\n${data.resume}`,
        experimental_output: Output.object({ schema: ResultSchema }),
      });
      return { ok: true as const, ...experimental_output };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message.includes("429")) {
        return { ok: false as const, error: "Rate limit hit. Please wait a moment and try again." };
      }
      if (message.includes("402")) {
        return { ok: false as const, error: "AI credits exhausted. Add credits to your workspace." };
      }
      return { ok: false as const, error: message };
    }
  });

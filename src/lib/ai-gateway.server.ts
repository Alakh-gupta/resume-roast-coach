import { google } from "@ai-sdk/google";

export function getGeminiModel() {
  return google("gemini-2.0-flash");
}

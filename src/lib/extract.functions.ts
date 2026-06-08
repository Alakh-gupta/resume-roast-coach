import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  filename: z.string().min(1).max(300),
  // base64-encoded file contents (without data URL prefix)
  base64: z.string().min(1).max(15_000_000), // ~11MB binary
});

function base64ToUint8Array(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function cleanup(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const extractResumeText = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const lower = data.filename.toLowerCase();
    const bytes = base64ToUint8Array(data.base64);

    try {
      if (lower.endsWith(".pdf")) {
        const { extractText, getDocumentProxy } = await import("unpdf");
        const pdf = await getDocumentProxy(bytes);
        const { text } = await extractText(pdf, { mergePages: true });
        const merged = Array.isArray(text) ? text.join("\n") : text;
        const cleaned = cleanup(merged);
        if (!cleaned) {
          return {
            ok: false as const,
            error:
              "We couldn't read any text from this PDF. It may be a scanned image — try exporting as text-based PDF or DOCX.",
          };
        }
        return { ok: true as const, text: cleaned };
      }

      if (lower.endsWith(".docx")) {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({
          buffer: Buffer.from(bytes),
        });
        const cleaned = cleanup(result.value);
        if (!cleaned) {
          return { ok: false as const, error: "We couldn't read any text from this DOCX." };
        }
        return { ok: true as const, text: cleaned };
      }

      if (lower.endsWith(".txt") || lower.endsWith(".md")) {
        const cleaned = cleanup(new TextDecoder().decode(bytes));
        return { ok: true as const, text: cleaned };
      }

      if (lower.endsWith(".doc")) {
        return {
          ok: false as const,
          error: "Legacy .doc isn't supported. Save it as .docx or .pdf and try again.",
        };
      }

      return {
        ok: false as const,
        error: "Unsupported file type. Upload a PDF, DOCX, or TXT file.",
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return { ok: false as const, error: `Couldn't parse the file: ${message}` };
    }
  });
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { analyzeResume } from "@/lib/resume.functions";
import { extractResumeText } from "@/lib/extract.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume Roaster & Optimizer — get roasted or get hired" },
      {
        name: "description",
        content:
          "Paste your resume. Pick a vibe: a savage roast for laughs, or a Fortune 500 rewrite with metrics and strong action verbs.",
      },
      { property: "og:title", content: "Resume Roaster & Optimizer" },
      {
        property: "og:description",
        content: "Roast mode for laughs. Optimize mode to land the job.",
      },
    ],
  }),
  component: Index,
});

type Mode = "roast" | "optimize";

const SAMPLE = `Experience:
- I did stuff with excel and made reports
- Helped the team with projects and stuff
- Was responsible for emails and meetings
- Made a dashboard for sales
- Talked to customers when needed`;

function Index() {
  const [mode, setMode] = useState<Mode>("roast");
  const [resume, setResume] = useState("");
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const analyze = useServerFn(analyzeResume);
  const extract = useServerFn(extractResumeText);

  const mutation = useMutation({
    mutationFn: (input: { resume: string; mode: Mode }) =>
      analyze({ data: input }),
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const buf = await file.arrayBuffer();
      // chunked base64 to avoid stack overflow on large files
      const bytes = new Uint8Array(buf);
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
      }
      const base64 = btoa(binary);
      return extract({ data: { filename: file.name, base64 } });
    },
    onSuccess: (res, file) => {
      if (res.ok) {
        setResume(res.text);
        setUploadedName(file.name);
        setUploadError(null);
      } else {
        setUploadError(res.error);
        setUploadedName(null);
      }
    },
    onError: (err) => {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
      setUploadedName(null);
    },
  });

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File is over 10MB. Please upload a smaller resume.");
      return;
    }
    setUploadError(null);
    uploadMutation.mutate(file);
  };

  const result = mutation.data && "ok" in mutation.data && mutation.data.ok ? mutation.data : null;
  const error =
    mutation.data && "ok" in mutation.data && !mutation.data.ok
      ? mutation.data.error
      : mutation.error
        ? (mutation.error as Error).message
        : null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resume.trim().length < 20) return;
    mutation.mutate({ resume, mode });
  };

  const isRoast = mode === "roast";
  const accent = isRoast ? "var(--ember)" : "var(--mint)";

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full grid place-items-center font-display text-xl"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            R
          </div>
          <span className="font-display text-xl">Resume Roaster<span style={{ color: accent }}>.</span></span>
        </div>
        <a
          href="#how"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          How it works
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="uppercase tracking-[0.22em] text-xs text-muted-foreground mb-5">
              {isRoast ? "Roast Mode — for laughs" : "Optimize Mode — for offers"}
            </p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95]">
              Your résumé,{" "}
              <span className="italic" style={{ color: accent }}>
                {isRoast ? "verbally assaulted" : "professionally polished"}
              </span>{" "}
              in 30 seconds.
            </h1>
          </div>
          <div className="lg:col-span-4" />
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border bg-card paper-grain p-6 md:p-8 shadow-[0_30px_80px_-40px_oklch(0.16_0.02_60/0.35)]"
        >
          {/* Mode toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div
              className="inline-flex rounded-full border p-1"
              style={{ background: "var(--accent-soft)" }}
            >
              <ModeButton active={isRoast} onClick={() => setMode("roast")} accent="var(--ember)">
                🔥 Roast me
              </ModeButton>
              <ModeButton active={!isRoast} onClick={() => setMode("optimize")} accent="var(--mint)">
                ✨ Optimize me
              </ModeButton>
            </div>
            <button
              type="button"
              onClick={() => setResume(SAMPLE)}
              className="text-sm underline-offset-4 hover:underline text-muted-foreground"
            >
              Load sample resume
            </button>
          </div>

          {/* Upload dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className="mb-4 rounded-xl border-2 border-dashed p-4 transition flex flex-wrap items-center justify-between gap-3"
            style={{
              borderColor: dragOver ? accent : "var(--border)",
              background: dragOver ? "var(--accent-soft)" : "transparent",
            }}
          >
            <div className="flex items-center gap-3 text-sm">
              <span
                className="grid place-items-center h-9 w-9 rounded-lg"
                style={{ background: "var(--accent-soft)", color: accent }}
              >
                {uploadMutation.isPending ? "…" : "📄"}
              </span>
              <div>
                <div className="font-medium">
                  {uploadMutation.isPending
                    ? "Reading your resume…"
                    : uploadedName
                      ? `Loaded: ${uploadedName}`
                      : "Drop a PDF or DOCX here, or"}
                </div>
                <div className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT · up to 10MB · text is extracted on the server
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadMutation.isPending}
              className="text-sm font-medium rounded-full px-4 py-2 border transition hover:bg-[var(--accent-soft)] disabled:opacity-50"
              style={{ borderColor: "var(--border)" }}
            >
              {uploadedName ? "Replace file" : "Choose file"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              className="hidden"
              onChange={(e) => {
                handleFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>

          {uploadError && (
            <div
              className="mb-4 rounded-lg border px-4 py-3 text-sm"
              style={{
                borderColor: "var(--ember)",
                background: "oklch(0.64 0.22 32 / 0.08)",
              }}
            >
              {uploadError}
            </div>
          )}

          <label className="block">
            <span className="sr-only">Paste your resume</span>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your full resume here — experience bullets, education, the works. Long context welcome."
              rows={14}
              maxLength={15000}
              className="w-full resize-y rounded-xl border bg-background p-5 font-mono text-sm leading-relaxed outline-none focus:ring-2 transition"
              style={{ borderColor: "var(--border)" }}
            />
          </label>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              {resume.length.toLocaleString()} / 15,000 characters
            </span>
            <button
              type="submit"
              disabled={mutation.isPending || resume.trim().length < 20}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: accent,
                color: isRoast ? "var(--ember-foreground)" : "var(--mint-foreground)",
              }}
            >
              {mutation.isPending
                ? isRoast
                  ? "Warming up the burn…"
                  : "Polishing your prose…"
                : isRoast
                  ? "Roast it →"
                  : "Optimize it →"}
            </button>
          </div>
        </form>

        {/* Errors */}
        {error && (
          <div
            className="mt-6 rounded-xl border p-4 text-sm"
            style={{ borderColor: "var(--ember)", background: "oklch(0.64 0.22 32 / 0.08)" }}
          >
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-12">
            <div className="mb-8 flex items-baseline justify-between gap-6 flex-wrap">
              <h2 className="font-display text-4xl md:text-5xl">
                {isRoast ? "The verdict." : "The rewrite."}
              </h2>
              <span
                className="uppercase tracking-[0.22em] text-xs px-3 py-1.5 rounded-full"
                style={{ background: accent, color: "var(--paper)" }}
              >
                {result.items.length} bullets
              </span>
            </div>

            <div
              className="rounded-2xl border-l-4 bg-card p-6 mb-10 paper-grain"
              style={{ borderColor: accent }}
            >
              <p className="font-display text-2xl italic leading-snug">{result.summary}</p>
            </div>

            <div className="space-y-5">
              {result.items.map((item, i) => (
                <article
                  key={i}
                  className="grid md:grid-cols-2 gap-0 rounded-2xl border bg-card overflow-hidden"
                >
                  <div className="p-6 border-b md:border-b-0 md:border-r bg-[var(--accent-soft)]">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--muted-foreground)" }}
                      />
                      Before
                    </div>
                    <p className="text-[15px] leading-relaxed font-mono whitespace-pre-wrap">
                      {item.before}
                    </p>
                  </div>
                  <div className="p-6">
                    <div
                      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-3"
                      style={{ color: accent }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      {isRoast ? "Roasted" : "After"}
                    </div>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{item.after}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20 border-t">
        <h2 className="font-display text-4xl mb-10">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "Paste", d: "Drop your full resume in. We handle long context — bullets, jobs, education." },
            { n: "02", t: "Pick a mode", d: "Roast for entertainment, Optimize for a Fortune-500 rewrite." },
            { n: "03", t: "Get Before / After", d: "Each bullet returned side-by-side so you can see exactly what changed." },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-5xl text-muted-foreground mb-2">{s.n}</div>
              <h3 className="font-display text-2xl mb-2">{s.t}</h3>
              <p className="text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground border-t">
        Roast mode attacks the writing, never the person. Built with Lovable AI.
      </footer>
    </main>
  );
}

function ModeButton({
  active,
  onClick,
  accent,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-medium transition"
      style={{
        background: active ? accent : "transparent",
        color: active ? "var(--paper)" : "var(--foreground)",
      }}
    >
      {children}
    </button>
  );
}

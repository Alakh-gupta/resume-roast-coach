# Resume Roast Coach

Paste your resume. Pick a vibe. Get a savage stand-up roast of your bullet points — or a Fortune-500 rewrite with strong verbs and implied metrics.

## What it does

- **Roast mode** – A witty, punchy roast of every bullet. Attacks the writing, never the person.
- **Optimize mode** – A professional rewrite leading with action verbs, metrics, and the XYZ formula.
- **File upload** – Drop a PDF, DOCX, or TXT file instead of copy-pasting.
- **Before / After** – Every bullet returned side-by-side so you can see exactly what changed.

## Tech Stack

- **TanStack Start** – Full-stack React framework with server functions
- **React 19** – UI library
- **Tailwind CSS** – Styling
- **AI SDK** – Structured generation via `generateText`
- **Lovable AI Gateway** – Routes to `google/gemini-3-flash-preview`
- **unpdf** – PDF text extraction
- **mammoth** – DOCX text extraction

## Running locally

1. **Clone & install**
   ```bash
   git clone https://github.com/Alakh-gupta/resume-roast-coach.git
   cd resume-roast-coach
   bun install
   ```

2. **Environment**
   `LOVABLE_API_KEY` is auto-provisioned in Lovable Cloud. For local development outside Lovable, set it in your environment:
   ```bash
   export LOVABLE_API_KEY=your_key_here
   ```

3. **Start the dev server**
   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run build:dev` | Development build |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

## Project Structure

```
src/
├── routes/
│   ├── index.tsx          # Home page (roast/optimize form + results)
│   └── __root.tsx         # Root layout
├── lib/
│   ├── ai-gateway.server.ts   # Lovable AI Gateway provider
│   ├── resume.functions.ts    # Server function: analyze resume
│   └── extract.functions.ts   # Server function: extract text from files
├── router.tsx             # TanStack Router setup
├── start.ts               # TanStack Start entry
└── styles.css             # Global styles & design tokens
```

## How it works

1. **Paste or upload** – Drop a PDF/DOCX or paste resume text into the form.
2. **Pick a mode** – 🔥 Roast for entertainment, ✨ Optimize for job offers.
3. **Server analysis** – The text is sent to a `createServerFn` which calls the Lovable AI Gateway with a structured-output schema.
4. **See Before / After** – Each bullet is returned side-by-side with a summary verdict.

## Notes

- Roast mode is strictly PG-13: it roasts the writing, never the person.
- Placeholder metrics appear in `[brackets]` during Optimize mode so you can fill in your real numbers.
- File text extraction runs server-side via `unpdf` (PDF) and `mammoth` (DOCX).

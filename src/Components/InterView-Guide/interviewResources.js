/**
 * interviewResources.js
 * ----------------------
 * Single source of truth for every interview-prep PDF on your portfolio.
 * The page component just iterates this array — add a new guide by adding
 * a new object here, nothing else needs to change.
 *
 * FIELD REFERENCE
 * ----------------
 * id            unique string, used as React key
 * title         card heading, e.g. "React Interview Guide"
 * description   1–2 line summary shown on the card
 * group         top-level bucket: "frontend" | "backend" | "ai" | "fullstack"
 * tech          specific stack tag: "react" | "angular" | "nodejs" |
 *               "javascript" | "typescript" | "python" | "agentic-ai" | "genai"
 * pages         page count shown as meta text (optional, number)
 * updated       "YYYY-MM-DD" last-updated date shown as meta text (optional)
 * source        "local" | "drive" — tells the card which URL shape to expect
 * pdfUrl        the URL used for the inline <iframe> PREVIEW
 * downloadUrl   the URL used for the DOWNLOAD button (falls back to pdfUrl)
 * image         OPTIONAL cover thumbnail. If omitted, the card auto-generates
 *               a colored tile with the tech icon (see techMeta.js) — you do
 *               NOT need to design a thumbnail for every file.
 *
 * ---------------------------------------------------------------------------
 * OPTION A — LOCAL FILES (files you own, redeploy with your site)
 * ---------------------------------------------------------------------------
 * 1. Put PDFs in:    public/pdfs/react-interview-guide.pdf
 * 2. Put covers in:  public/images/react-interview-guide.png   (optional)
 * 3. Reference both with root-relative paths (no "public" in the path):
 *
 *    {
 *      source: "local",
 *      pdfUrl: "/pdfs/react-interview-guide.pdf",
 *      image: "/images/react-interview-guide.png", // optional
 *    }
 *
 * ---------------------------------------------------------------------------
 * OPTION B — GOOGLE DRIVE (swap files without redeploying your site)
 * ---------------------------------------------------------------------------
 * 1. Upload the PDF to Drive.
 * 2. Right-click → Share → "Anyone with the link" → Viewer.
 * 3. Copy the FILE_ID out of the share link:
 *      https://drive.google.com/file/d/ FILE_ID /view?usp=sharing
 * 4. Build these three public URLs from that one ID:
 *
 *      Preview (embeds in an <iframe>):
 *        https://drive.google.com/file/d/FILE_ID/preview
 *
 *      Direct download:
 *        https://drive.google.com/uc?export=download&id=FILE_ID
 *
 *      Auto-generated cover thumbnail (first page as an image — you don't
 *      need to make a separate cover image for Drive files):
 *        https://drive.google.com/thumbnail?id=FILE_ID&sz=w800
 *
 *    {
 *      source: "drive",
 *      pdfUrl: "https://drive.google.com/file/d/FILE_ID/preview",
 *      downloadUrl: "https://drive.google.com/uc?export=download&id=FILE_ID",
 *      image: "https://drive.google.com/thumbnail?id=FILE_ID&sz=w800",
 *    }
 *
 * Tip: keep a spreadsheet of FILE_IDs while you upload, then paste values in
 * here — it's the only manual step, everything else is generated.
 */

export const GROUPS = [
  { id: "all", label: "All Guides" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "backend", label: "Backend Developer" },
  { id: "ai", label: "AI Developer" },
  { id: "fullstack", label: "Full Stack Developer" },
];

export const interviewResources = [
  {
    id: "react-guide",
    title: "React.js Interview Guide",
    description: "Hooks, rendering behavior, performance patterns, and 60+ real interview questions.",
    group: "frontend",
    tech: "react",
    pages: 32,
    updated: "2026-06-01",
    source: "local",
    pdfUrl: "/pdfs/react-interview-guide.pdf",
    downloadUrl: "/pdfs/react-interview-guide.pdf",
  },
  {
    id: "angular-guide",
    title: "Angular Interview Guide",
    description: "RxJS, dependency injection, change detection, and component architecture deep-dives.",
    group: "frontend",
    tech: "angular",
    pages: 28,
    updated: "2026-05-18",
    source: "local",
    pdfUrl: "https://drive.google.com/file/d/1MeFD6Rn3Dk8t6eyvEoInqnr5ghM846lZ/view?usp=sharing",
    downloadUrl: "https://drive.google.com/file/d/1MeFD6Rn3Dk8t6eyvEoInqnr5ghM846lZ/view?usp=sharing",
  },
  {
    id: "javascript-guide",
    title: "JavaScript Core Concepts",
    description: "Closures, event loop, prototypes, and the questions that trip up even senior devs.",
    group: "frontend",
    tech: "javascript",
    pages: 26,
    updated: "2026-04-22",
    source: "drive",
    pdfUrl: "https://drive.google.com/file/d/FILE_ID_JS/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=FILE_ID_JS",
    image: "https://drive.google.com/thumbnail?id=FILE_ID_JS&sz=w800",
  },
  {
    id: "typescript-guide",
    title: "TypeScript Interview Guide",
    description: "Generics, utility types, narrowing, and how to reason about types under pressure.",
    group: "frontend",
    tech: "typescript",
    pages: 20,
    updated: "2026-05-02",
    source: "local",
    pdfUrl: "/pdfs/typescript-interview-guide.pdf",
    downloadUrl: "/pdfs/typescript-interview-guide.pdf",
  },
  {
    id: "nodejs-guide",
    title: "Node.js Interview Guide",
    description: "Event loop internals, streams, clustering, and designing resilient APIs.",
    group: "backend",
    tech: "nodejs",
    pages: 30,
    updated: "2026-06-10",
    source: "local",
    pdfUrl: "/pdfs/nodejs-interview-guide.pdf",
    downloadUrl: "/pdfs/nodejs-interview-guide.pdf",
  },
  {
    id: "python-guide",
    title: "Python Interview Guide",
    description: "Data structures, decorators, async/await, and backend design questions.",
    group: "backend",
    tech: "python",
    pages: 34,
    updated: "2026-03-29",
    source: "drive",
    pdfUrl: "https://drive.google.com/file/d/FILE_ID_PY/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=FILE_ID_PY",
    image: "https://drive.google.com/thumbnail?id=FILE_ID_PY&sz=w800",
  },
  {
    id: "genai-guide",
    title: "Generative AI Interview Guide",
    description: "LLM fundamentals, prompting, RAG pipelines, fine-tuning vs. retrieval trade-offs.",
    group: "ai",
    tech: "genai",
    pages: 24,
    updated: "2026-07-03",
    source: "drive",
    pdfUrl: "https://drive.google.com/file/d/FILE_ID_GENAI/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=FILE_ID_GENAI",
    image: "https://drive.google.com/thumbnail?id=FILE_ID_GENAI&sz=w800",
  },
  {
    id: "agentic-ai-guide",
    title: "Agentic AI Interview Guide",
    description: "Tool use, planning loops, multi-agent orchestration, and evaluating agent reliability.",
    group: "ai",
    tech: "agentic-ai",
    pages: 22,
    updated: "2026-07-15",
    source: "local",
    pdfUrl: "/pdfs/agentic-ai-interview-guide.pdf",
    downloadUrl: "/pdfs/agentic-ai-interview-guide.pdf",
  },
  {
    id: "fullstack-guide",
    title: "Full Stack System Design Guide",
    description: "End-to-end system design: API layer, database choices, caching, and deployment.",
    group: "fullstack",
    tech: "javascript",
    pages: 40,
    updated: "2026-06-25",
    source: "local",
    pdfUrl: "/pdfs/fullstack-system-design-guide.pdf",
    downloadUrl: "/pdfs/fullstack-system-design-guide.pdf",
  },
];

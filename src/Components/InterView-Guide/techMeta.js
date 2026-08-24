import {
  Atom,
  Triangle,
  Server,
  Braces,
  FileType2,
  Terminal,
  Bot,
  Sparkles,
} from "lucide-react";

/**
 * One entry per `tech` value used in interviewResources.js.
 * `color` drives the auto-generated cover tile + badge when a resource
 * has no `image` field — add a new stack by adding one line here.
 */
export const techMeta = {
  react: { label: "React.js", icon: Atom, color: "#2F6FED" },
  angular: { label: "Angular", icon: Triangle, color: "#D6293E" },
  nodejs: { label: "Node.js", icon: Server, color: "#3C873A" },
  javascript: { label: "JavaScript", icon: Braces, color: "#D9A404" },
  typescript: { label: "TypeScript", icon: FileType2, color: "#2F6FED" },
  python: { label: "Python", icon: Terminal, color: "#3572A5" },
  "agentic-ai": { label: "Agentic AI", icon: Bot, color: "#6D4AFF" },
  genai: { label: "Generative AI", icon: Sparkles, color: "#8A3FFC" },
};

export const groupMeta = {
  frontend: { label: "Frontend Developer", color: "#2F6FED" },
  backend: { label: "Backend Developer", color: "#12805C" },
  ai: { label: "AI Developer", color: "#6D4AFF" },
  fullstack: { label: "Full Stack Developer", color: "#D9822B" },
};

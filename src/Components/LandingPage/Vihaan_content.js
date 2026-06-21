/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
export const TECH_GROUPS = [
  {
    label: "Frontend Frameworks", icon: "🖥️", rgb: "99,102,241",
    techs: [
      { icon: "⚛️", name: "React JS", sub: "v18+", badge: "Expert", rgb: "97,218,251", col: "#61dafb" },
      { icon: "🅰️", name: "Angular", sub: "v6 → v20", badge: "v6–v20", rgb: "221,0,49", col: "#dd0031" },
      { icon: "⚡", name: "Next.js", sub: "App Router", badge: "Full Stack", rgb: "255,255,255", col: "#eee" },
      { icon: "🎨", name: "Styled Components", sub: "CSS-in-JS", badge: "Advanced", rgb: "219,112,147", col: "#db7093" },
      { icon: "🌊", name: "Tailwind CSS", sub: "v3+", badge: "UI Toolkit", rgb: "56,189,248", col: "#38bdf8" },
      { icon: "🔀", name: "Redux / Zustand", sub: "State Mgmt", badge: "Patterns", rgb: "118,74,188", col: "#764abc" },
    ]
  },
  {
    label: "Backend & APIs", icon: "⚙️", rgb: "34,211,238",
    techs: [
      { icon: "🟢", name: "Node.js", sub: "v20 LTS", badge: "Expert", rgb: "104,160,99", col: "#68a063" },
      { icon: "🚀", name: "Express.js", sub: "REST APIs", badge: "Microservices", rgb: "255,255,255", col: "#ccc" },
      { icon: "🐍", name: "Python", sub: "v3.10+", badge: "AI / Data", rgb: "55,118,171", col: "#3776ab" },
      { icon: "🦄", name: "Django", sub: "v4 / v5", badge: "Full Stack", rgb: "9,150,106", col: "#099612" },
      { icon: "📊", name: "GraphQL", sub: "Apollo", badge: "API", rgb: "225,0,152", col: "#e1008e" },
      { icon: "🔐", name: "JWT / OAuth 2", sub: "Auth", badge: "Security", rgb: "245,158,11", col: "#f59e0b" },
    ]
  },
  {
    label: "Cloud & DevOps", icon: "☁️", rgb: "245,158,11",
    techs: [
      { icon: "☁️", name: "AWS", sub: "EC2·S3·Lambda", badge: "Certified", rgb: "255,153,0", col: "#ff9900" },
      { icon: "🐳", name: "Docker", sub: "Containers", badge: "DevOps", rgb: "41,130,201", col: "#2982c9" },
      { icon: "🔄", name: "CI/CD", sub: "GitHub Actions", badge: "Pipelines", rgb: "36,206,38", col: "#24ce26" },
      { icon: "📦", name: "Vercel / Netlify", sub: "Edge Deploy", badge: "Hosting", rgb: "255,255,255", col: "#ccc" },
    ]
  },
  {
    label: "AI & Emerging Tech", icon: "🤖", rgb: "168,85,247",
    techs: [
      { icon: "🧠", name: "Generative AI", sub: "GPT·Claude·Gemini", badge: "LLM Apps", rgb: "168,85,247", col: "#a855f7" },
      { icon: "🤖", name: "Agentic AI", sub: "LangChain·CrewAI", badge: "Agents", rgb: "168,85,247", col: "#a855f7" },
      { icon: "🔗", name: "LangChain", sub: "AI Orchestration", badge: "RAG·Tools", rgb: "32,214,150", col: "#20d696" },
      { icon: "📡", name: "OpenAI API", sub: "GPT-4o·Whisper", badge: "Integrated", rgb: "16,163,127", col: "#10a37f" },
      { icon: "🦙", name: "Ollama / HuggingFace", sub: "Local LLMs", badge: "On-Prem", rgb: "255,204,0", col: "#ffcc00" },
    ]
  },
  {
    label: "Architecture Patterns", icon: "🏗️", rgb: "244,63,94",
    techs: [
      { icon: "🔧", name: "Microservices", sub: "Event-Driven", badge: "Architecture", rgb: "99,102,241", col: "#6366f1" },
      { icon: "🧩", name: "Micro Frontend", sub: "Module Federation", badge: "Scalable", rgb: "34,211,238", col: "#22d3ee" },
      { icon: "📮", name: "Message Queues", sub: "Kafka · RabbitMQ", badge: "Async", rgb: "255,102,0", col: "#ff6600" },
      { icon: "🗃️", name: "MongoDB", sub: "v7+", badge: "NoSQL", rgb: "67,153,52", col: "#439334" },
      { icon: "🐘", name: "PostgreSQL", sub: "v15+", badge: "SQL", rgb: "51,103,145", col: "#336791" },
    ]
  },
];

export const SERVICES = [
  { icon: "🅰️", rgb: "221,0,49", title: "Angular App Development", desc: "Enterprise-grade Angular apps from v6 to v20. Migration, upgrade, standalone components & modern signal-based patterns.", tags: ["Angular", "RxJS", "NgRx", "TypeScript"], price: "₹12,000+" },
  { icon: "⚛️", rgb: "97,218,251", title: "React JS Development", desc: "SPAs, dashboards, component libraries with hooks, context, Redux & clean architecture. Pixel-perfect and performant.", tags: ["React 18", "Next.js", "Redux", "Styled-Comp"], price: "₹8,000+" },
  { icon: "🤖", rgb: "168,85,247", title: "Generative & Agentic AI", desc: "Build LLM-powered apps, AI chatbots, RAG pipelines, autonomous agents and AI-integrated web platforms.", tags: ["OpenAI", "LangChain", "CrewAI", "Python"], price: "₹20,000+" },
  { icon: "🔧", rgb: "99,102,241", title: "Microservices & Micro-FE", desc: "Design and implement microservice backends with Docker + Kafka, and micro-frontend architectures using Module Federation.", tags: ["Docker", "Kafka", "Module Fed.", "Node.js"], price: "₹25,000+" },
  { icon: "🐍", rgb: "55,118,171", title: "Python / Django Backend", desc: "REST APIs, admin portals, data pipelines and ML model serving with Django REST Framework and Celery.", tags: ["Django", "DRF", "Celery", "PostgreSQL"], price: "₹10,000+" },
  { icon: "☁️", rgb: "255,153,0", title: "AWS Cloud & DevOps", desc: "Full AWS stack — EC2, S3, Lambda, RDS, CloudFront — with Terraform IaC, GitHub Actions CI/CD and container deployment.", tags: ["AWS", "Terraform", "Docker", "CI/CD"], price: "₹15,000+" },
];

export const PORTFOLIO = [
  { emoji: "💼", label: "Live Project", bg: "linear-gradient(135deg,rgba(99,102,241,.45),rgba(34,211,238,.2))", title: "Personal Portfolio v2", desc: "React + Styled Components with wave animations, scroll reveals and fully responsive design.", link: "/user/santosh", tech: ["React", "Styled Comp"] },
  { emoji: "🤖", label: "AI Project", bg: "linear-gradient(135deg,rgba(168,85,247,.45),rgba(99,102,241,.2))", title: "AI Resume Analyzer", desc: "Agentic AI app — upload a CV, an LLM extracts key info, scores fit against a job description and suggests improvements.", tech: ["OpenAI", "LangChain", "React", "Django"] },
  { emoji: "🛍️", label: "Client Work", bg: "linear-gradient(135deg,rgba(34,211,238,.35),rgba(99,102,241,.2))", title: "Fashion E-Commerce Store", desc: "Full-stack React + Node.js store with cart, wishlist, Razorpay payments and an Angular admin panel.", tech: ["React", "Node.js", "Angular", "MongoDB"] },
  { emoji: "🏗️", label: "Architecture", bg: "linear-gradient(135deg,rgba(244,63,94,.35),rgba(168,85,247,.2))", title: "Micro-Frontend Dashboard", desc: "Module Federation shell with 4 independent micro-apps. Each team deploys independently — zero coupling.", tech: ["Webpack 5", "React", "Angular", "Node.js"] },
  { emoji: "☁️", label: "AWS Project", bg: "linear-gradient(135deg,rgba(255,153,0,.35),rgba(34,211,238,.15))", title: "Serverless SaaS Platform", desc: "Multi-tenant SaaS on AWS Lambda + API Gateway + DynamoDB with Cognito auth and CloudFront CDN.", tech: ["AWS Lambda", "Terraform", "Node.js"] },
  { emoji: "📊", label: "Freelance Work", bg: "linear-gradient(135deg,rgba(245,158,11,.3),rgba(99,102,241,.2))", title: "Sales Analytics Dashboard", desc: "Django REST + React dashboard with Chart.js, real-time WebSocket updates, CSV export and RBAC.", tech: ["Django", "React", "Chart.js", "WebSocket"] },
];

export const PROCESS = [
  { num: "01", emoji: "🤝", title: "Free Discovery Call", desc: "30-min call to discuss goals, tech stack, timeline and budget. No cost, no commitment." },
  { num: "02", emoji: "📐", title: "Proposal & Roadmap", desc: "I send a detailed scope, milestones and fixed price. You review and approve before I start." },
  { num: "03", emoji: "💻", title: "Agile Development", desc: "Weekly demo links, daily Slack/WhatsApp updates. You're always in the loop." },
  { num: "04", emoji: "🚀", title: "Deploy & Handover", desc: "I handle deployment, write documentation and provide 30 days free post-launch support." },
];

export const WHY = [
  { icon: "⚡", title: "Fast Turnaround", desc: "Most projects delivered ahead of schedule. Daily progress updates keep you informed." },
  { icon: "💬", title: "Direct Communication", desc: "No account manager. You talk straight to the developer. WhatsApp / email / call." },
  { icon: "🏗️", title: "Scalable Architecture", desc: "Code built for growth — clean, documented, tested and easy to hand off." },
  { icon: "🔒", title: "NDA & IP Protection", desc: "Sign NDAs on request. Your idea, your IP. I never share client work without permission." },
  { icon: "💰", title: "Milestone Payments", desc: "50% advance, 50% on delivery. Large projects split into milestones — no big upfront risk." },
  { icon: "🛠️", title: "30-Day Free Support", desc: "Bug fixes, tweaks and minor changes included free for 30 days after go-live." },
];

export const tickerItems = [
  "React JS", "Angular v6–20", "Node.js", "Python", "Django", "AWS", "Generative AI", "Agentic AI", "LangChain",
  "Microservices", "Micro Frontend", "Docker", "GraphQL", "PostgreSQL", "MongoDB", "TypeScript", "Next.js",
];

/* ═══════════════════════════════════════════════════════════════════
   TYPEWRITER HOOK
═══════════════════════════════════════════════════════════════════ */
export const roles = [
  "Full Stack Developer",
  "Angular Expert",
  "React JS Developer",
  "MEAN & MERN Stack Developer",
  "Generative AI Builder",
  "Microservices Architect",
  "AWS Cloud Developer",
];

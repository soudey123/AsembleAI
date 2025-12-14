import { Share2, Cpu, Database, Zap, Brain, Shield, BarChart3, Users } from "lucide-react";

export const podcasts = [
  {
    slug: "future-of-agents",
    title: "The Future of Autonomous Agents",
    guest: "Dr. Elena Vance",
    date: "Dec 12, 2025",
    description: "Exploring how autonomous agents are reshaping enterprise workflows and the ethical considerations of AI delegation.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["Agents", "Automation", "Ethics"],
    type: "video",
    duration: "45:20"
  },
  {
    slug: "generative-architecture",
    title: "Generative Architecture at Scale",
    guest: "Marcus Chen",
    date: "Nov 28, 2025",
    description: "How to build scalable infrastructure for large language models in production environments.",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["Infrastructure", "LLMs", "Scaling"],
    type: "video",
    duration: "52:15"
  },
  {
    slug: "ai-governance",
    title: "Navigating AI Governance",
    guest: "Sarah Miller",
    date: "Nov 15, 2025",
    description: "A deep dive into the regulatory landscape and how companies can prepare for upcoming AI policies.",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["Governance", "Policy", "Compliance"],
    type: "audio",
    duration: "38:45"
  },
  {
    slug: "enterprise-rag",
    title: "RAG in the Enterprise",
    guest: "David Cohen",
    date: "Nov 02, 2025",
    description: "Best practices for implementing Retrieval Augmented Generation securely.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["RAG", "Enterprise"],
    type: "audio",
    duration: "41:10"
  },
  {
    slug: "multimodal-models",
    title: "The Rise of Multimodal Models",
    guest: "Dr. Aris Thorne",
    date: "Oct 25, 2025",
    description: "Understanding the capabilities of models that can see, hear, and speak.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["Multimodal", "Vision"],
    type: "video",
    duration: "58:30"
  },
  {
    slug: "fintech-ai",
    title: "AI in Financial Services",
    guest: "Jennifer Wu",
    date: "Oct 10, 2025",
    description: "Detecting fraud and personalizing banking experiences with AI.",
    thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU?si=72ad1dc67ac04f3c",
    appleUrl: "#",
    tags: ["Fintech", "Security"],
    type: "audio",
    duration: "34:20"
  }
];

export const useCases = [
  {
    slug: "fintech-fraud-detection",
    title: "Real-time Fraud Detection",
    category: "Enterprise Automation",
    description: "Reducing false positives by 40% with hybrid AI models.",
    problem: "Traditional rule-based systems were flagging too many legitimate transactions.",
    solution: "Implemented a hybrid model combining anomaly detection with supervised learning.",
    impact: "40% reduction in false positives, saving $2M annually.",
    tools: ["Python", "PyTorch", "Kafka"],
    tags: ["Fintech", "Security"]
  },
  {
    slug: "medical-research-assistant",
    title: "Medical Research Assistant",
    category: "Research & Intelligence",
    description: "Accelerating drug discovery with semantic search agents.",
    problem: "Researchers spent 30% of their time searching through literature.",
    solution: "Built a semantic search engine using RAG to query millions of papers.",
    impact: "Reduced literature review time by 60%.",
    tools: ["LangChain", "Pinecone", "OpenAI"],
    tags: ["Healthcare", "RAG"]
  },
  {
    slug: "customer-support-agent",
    title: "Tier 1 Support Agent",
    category: "Customer Experience",
    description: "Automating 70% of support tickets with empathetic AI.",
    problem: "Support team was overwhelmed with repetitive queries.",
    solution: "Deployed a fine-tuned LLM agent to handle Tier 1 support.",
    impact: "70% automation rate, CSAT scores improved by 15%.",
    tools: ["OpenAI", "React", "Node.js"],
    tags: ["Support", "Automation"]
  },
  {
    slug: "supply-chain-optimization",
    title: "Supply Chain Optimization",
    category: "Data & Analytics",
    description: "Predicting inventory needs with 95% accuracy.",
    problem: "Overstocking and stockouts were costing millions.",
    solution: "Predictive analytics model using historical sales and external factors.",
    impact: "Inventory costs reduced by 25%.",
    tools: ["Python", "TensorFlow", "Snowflake"],
    tags: ["Supply Chain", "Predictive Analytics"]
  },
   {
    slug: "legal-contract-review",
    title: "Automated Contract Review",
    category: "Enterprise Automation",
    description: "Cutting contract review time from hours to minutes.",
    problem: "Legal team was a bottleneck for deal closings.",
    solution: "AI system to flag risks and non-standard clauses.",
    impact: "Review time reduced by 90%.",
    tools: ["NLP", "Python", "React"],
    tags: ["Legal", "Automation"]
  },
  {
    slug: "marketing-content-engine",
    title: "Personalized Marketing Engine",
    category: "Customer Experience",
    description: "Generating personalized campaigns at scale.",
    problem: "Generic marketing was seeing low engagement.",
    solution: "Generative AI to create personalized content for segments.",
    impact: "Click-through rates increased by 50%.",
    tools: ["Generative AI", "Marketing API"],
    tags: ["Marketing", "Personalization"]
  }
];

export const services = [
  {
    title: "AI Strategy & Advisory",
    description: "Navigate the complex landscape of AI with actionable roadmaps and executive guidance.",
    icon: Brain
  },
  {
    title: "AI Agent Design",
    description: "Build autonomous agents that handle complex workflows and decision-making processes.",
    icon: Cpu
  },
  {
    title: "Data Architecture",
    description: "Modernize your data stack to be AI-ready, scalable, and secure.",
    icon: Database
  },
  {
    title: "AI Enablement",
    description: "Upskill your teams and establish centers of excellence for sustained innovation.",
    icon: Zap
  }
];

export const news = [
  {
    title: "The Rise of Agentic Workflows",
    source: "MIT Tech Review",
    date: "Dec 14, 2025",
    summary: "How autonomous agents are moving beyond simple tasks to complex problem solving.",
    link: "#",
    tag: "Agents"
  },
  {
    title: "OpenAI Announces GPT-5 Preview",
    source: "The Verge",
    date: "Dec 13, 2025",
    summary: "Early look at the next generation of reasoning models.",
    link: "#",
    tag: "LLMs"
  },
  {
    title: "EU AI Act Compliance Guide",
    source: "TechCrunch",
    date: "Dec 12, 2025",
    summary: "What enterprises need to know about the new regulations coming into effect.",
    link: "#",
    tag: "Policy"
  },
  {
    title: "NVIDIA's New Chip Architecture",
    source: "AnandTech",
    date: "Dec 10, 2025",
    summary: "Revolutionizing inference speeds for edge devices.",
    link: "#",
    tag: "Hardware"
  },
  {
    title: "Generative AI in Healthcare",
    source: "Nature Digital Medicine",
    date: "Dec 09, 2025",
    summary: "New study shows 40% improvement in diagnostic accuracy.",
    link: "#",
    tag: "Enterprise AI"
  },
  {
    title: "Microsoft Copilot Enterprise Updates",
    source: "Microsoft Blog",
    date: "Dec 08, 2025",
    summary: "New features for security and data governance.",
    link: "#",
    tag: "Enterprise AI"
  }
];

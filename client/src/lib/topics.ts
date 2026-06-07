import { Brain, Briefcase, Heart, TrendingUp, Film, Scale, Atom, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PodcastTopic {
  id: string;
  name: string;
  icon: LucideIcon;
  episodeCount: number;
  description: string;
  accent: string;
  // Exact title phrases — matched case-insensitively against episode TITLE only.
  // Use multi-word phrases long enough to be unambiguous.
  titlePhrases: string[];
}

export const PODCAST_TOPICS: PodcastTopic[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: Brain,
    episodeCount: 11,
    description: "LLMs, agents, MCP & the AI ecosystem",
    accent: "cyan",
    // EP 39, 40, 17, 18 + standalone episodes + YouTube tutorials
    titlePhrases: [
      "ai chatbots",
      "hindsight to foresight",
      "model context protocol",
      "a2a multi-agent",
      "agentic revolution",
      "ai ecosystem explosion",
      "from gatsby to mastra",
      "pandasai",
      "langgraph",
      "langchain",
      "openclaw",
      "lovable vs replit",
      "ai transforms soccer",
      "ai revolutionizes basketball",
    ],
  },
  {
    id: "future-of-work",
    name: "Future of Work",
    icon: Briefcase,
    episodeCount: 7,
    description: "Job automation, reskilling & new collar jobs",
    accent: "blue",
    // EP 41–46 + standalone future-of-tech-jobs
    titlePhrases: [
      "new collar jobs",
      "reskill or perish",
      "on the chopping block",
      "safe zones - jobs",
      "ai job apocalypse",
      "future of tech jobs",
      "ai & program management",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare AI",
    icon: Heart,
    episodeCount: 6,
    description: "Medical AI, drug discovery & patient care",
    accent: "rose",
    // EP 27–30, 49 + YouTube healthcare fraud video
    titlePhrases: [
      "healthcare ai fraud",
      "healthcare data security",
      "alphafold, alphagenome",
      "patient care through synthetic data",
      "drug discovery",
    ],
  },
  {
    id: "fintech",
    name: "Fintech & Finance",
    icon: TrendingUp,
    episodeCount: 6,
    description: "Algorithmic trading, credit AI & fraud detection",
    accent: "emerald",
    // EP 31–35, 38
    titlePhrases: [
      "algorithmic trading",
      "credit and lending",
      "ai in compliance: turning regulation",
      "ai fraud detection",
      "stock prediction",
      "ai-powered advertising",
    ],
  },
  {
    id: "creative",
    name: "Creative Industries",
    icon: Film,
    episodeCount: 7,
    description: "AI in filmmaking, music, art & content creation",
    accent: "purple",
    // EP 23–26, 36–37, 44
    titlePhrases: [
      "transforming filmmaking",
      "hybrid creator",
      "visual art",
      "sora shocks hollywood",
      "ai music revolution",
      "ai content creation",
      "ai personalization",
    ],
  },
  {
    id: "policy",
    name: "AI Policy & Governance",
    icon: Scale,
    episodeCount: 4,
    description: "EU AI Act, regulation & global AI governance",
    accent: "amber",
    // EP 19–22
    titlePhrases: [
      "future of ai policy",
      "regulatory chessboard",
      "ai compliance in practice",
      "eu ai act",
    ],
  },
  {
    id: "deeptech",
    name: "DeepTech & Science",
    icon: Atom,
    episodeCount: 3,
    description: "Biological computing, robotics & frontier research",
    accent: "teal",
    // standalone episodes
    titlePhrases: [
      "building computers from human neurons",
      "ai and robotics",
      "alphafold, alphagenome",
    ],
  },
  {
    id: "business",
    name: "Business & Strategy",
    icon: Building2,
    episodeCount: 9,
    description: "Enterprise AI, leadership & transformation",
    accent: "orange",
    // standalone leadership/enterprise episodes
    titlePhrases: [
      "rewiring the enterprise",
      "growth leadership",
      "agentic leadership in ai transformation",
      "enterprise strategy to technical execution",
      "education innovation",
      "building ai communities",
      "ai-first product strategy",
      "ai in strategic viewpoint",
      "data literacy is the missing link",
      "beyond the buzzwords",
    ],
  },
];

export const ACCENT_COLORS: Record<string, {
  bg: string; border: string; hover: string; icon: string; badge: string; pill: string;
}> = {
  cyan:    { bg: "from-cyan-500/10 to-cyan-500/5",       border: "border-cyan-500/20",    hover: "hover:border-cyan-400/50 hover:from-cyan-500/15",    icon: "text-cyan-400",    badge: "bg-cyan-400/10 text-cyan-300",    pill: "bg-cyan-500 text-white" },
  blue:    { bg: "from-blue-500/10 to-blue-500/5",       border: "border-blue-500/20",    hover: "hover:border-blue-400/50 hover:from-blue-500/15",    icon: "text-blue-400",    badge: "bg-blue-400/10 text-blue-300",    pill: "bg-blue-500 text-white" },
  rose:    { bg: "from-rose-500/10 to-rose-500/5",       border: "border-rose-500/20",    hover: "hover:border-rose-400/50 hover:from-rose-500/15",    icon: "text-rose-400",    badge: "bg-rose-400/10 text-rose-300",    pill: "bg-rose-500 text-white" },
  emerald: { bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/20", hover: "hover:border-emerald-400/50 hover:from-emerald-500/15", icon: "text-emerald-400", badge: "bg-emerald-400/10 text-emerald-300", pill: "bg-emerald-500 text-white" },
  purple:  { bg: "from-purple-500/10 to-purple-500/5",   border: "border-purple-500/20",  hover: "hover:border-purple-400/50 hover:from-purple-500/15",  icon: "text-purple-400",  badge: "bg-purple-400/10 text-purple-300",  pill: "bg-purple-500 text-white" },
  amber:   { bg: "from-amber-500/10 to-amber-500/5",     border: "border-amber-500/20",   hover: "hover:border-amber-400/50 hover:from-amber-500/15",   icon: "text-amber-400",   badge: "bg-amber-400/10 text-amber-300",   pill: "bg-amber-500 text-white" },
  teal:    { bg: "from-teal-500/10 to-teal-500/5",       border: "border-teal-500/20",    hover: "hover:border-teal-400/50 hover:from-teal-500/15",    icon: "text-teal-400",    badge: "bg-teal-400/10 text-teal-300",    pill: "bg-teal-500 text-white" },
  orange:  { bg: "from-orange-500/10 to-orange-500/5",   border: "border-orange-500/20",  hover: "hover:border-orange-400/50 hover:from-orange-500/15", icon: "text-orange-400",  badge: "bg-orange-400/10 text-orange-300", pill: "bg-orange-500 text-white" },
};

/**
 * Match an episode title against a topic's phrase list.
 * Matches ONLY the title (not description) to avoid false positives.
 * Uses case-insensitive substring matching on multi-word phrases.
 */
export function matchesTopic(title: string, topicId: string): boolean {
  const topic = PODCAST_TOPICS.find(t => t.id === topicId);
  if (!topic) return true;
  const lower = title.toLowerCase();
  return topic.titlePhrases.some(phrase => lower.includes(phrase.toLowerCase()));
}

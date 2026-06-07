import { Brain, Briefcase, Heart, TrendingUp, Film, Scale, Atom, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PodcastTopic {
  id: string;
  name: string;
  icon: LucideIcon;
  episodeCount: number;
  description: string;
  accent: string;
  keywords: string[];
}

export const PODCAST_TOPICS: PodcastTopic[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: Brain,
    episodeCount: 9,
    description: "LLMs, agents, MCP & the AI ecosystem",
    accent: "cyan",
    keywords: ["chatbot","agent","llm","model","mcp","agentic","ecosystem","toolkit","framework","pandasai","langgraph","langchain","openclaw","lovable","replit","bolt"],
  },
  {
    id: "future-of-work",
    name: "Future of Work",
    icon: Briefcase,
    episodeCount: 7,
    description: "Job automation, reskilling & new collar jobs",
    accent: "blue",
    keywords: ["job","work","reskill","career","collar","automation","chopping","safe zone","apocalypse","disruption","opportunity","path forward","program management"],
  },
  {
    id: "healthcare",
    name: "Healthcare AI",
    icon: Heart,
    episodeCount: 5,
    description: "Medical AI, drug discovery & patient care",
    accent: "rose",
    keywords: ["healthcare","health","drug","patient","alpha","medical","hospital","synthetic data","data security"],
  },
  {
    id: "fintech",
    name: "Fintech & Finance",
    icon: TrendingUp,
    episodeCount: 5,
    description: "Algorithmic trading, credit AI & fraud detection",
    accent: "emerald",
    keywords: ["trading","credit","lending","finance","stock","fraud","compliance","fintech","programmatic","advertising","market maker","investment"],
  },
  {
    id: "creative",
    name: "Creative Industries",
    icon: Film,
    episodeCount: 7,
    description: "AI in filmmaking, music, art & content creation",
    accent: "purple",
    keywords: ["film","music","art","creator","hollywood","sora","content","visual","midjourney","dall-e","copyright","hybrid creator","personalization"],
  },
  {
    id: "policy",
    name: "AI Policy & Governance",
    icon: Scale,
    episodeCount: 4,
    description: "EU AI Act, regulation & global AI governance",
    accent: "amber",
    keywords: ["policy","regulation","governance","eu","act","compliance","data literacy","regulatory","chessboard"],
  },
  {
    id: "deeptech",
    name: "DeepTech & Science",
    icon: Atom,
    episodeCount: 3,
    description: "Biological computing, robotics & frontier research",
    accent: "teal",
    keywords: ["silicon","neuron","biological","robotics","deeptech","science","alphafold","genome","computing","intelligent automation"],
  },
  {
    id: "business",
    name: "Business & Strategy",
    icon: Building2,
    episodeCount: 5,
    description: "Enterprise AI, leadership & transformation",
    accent: "orange",
    keywords: ["enterprise","leadership","strategy","transformation","playbook","product","management","education","community","performance","strategic","growth","executive","viewpoint"],
  },
];

export const ACCENT_COLORS: Record<string, { bg: string; border: string; hover: string; icon: string; badge: string; pill: string }> = {
  cyan:    { bg: "from-cyan-500/10 to-cyan-500/5",       border: "border-cyan-500/20",    hover: "hover:border-cyan-400/50 hover:from-cyan-500/15",    icon: "text-cyan-400",    badge: "bg-cyan-400/10 text-cyan-300",    pill: "bg-cyan-500 text-white" },
  blue:    { bg: "from-blue-500/10 to-blue-500/5",       border: "border-blue-500/20",    hover: "hover:border-blue-400/50 hover:from-blue-500/15",    icon: "text-blue-400",    badge: "bg-blue-400/10 text-blue-300",    pill: "bg-blue-500 text-white" },
  rose:    { bg: "from-rose-500/10 to-rose-500/5",       border: "border-rose-500/20",    hover: "hover:border-rose-400/50 hover:from-rose-500/15",    icon: "text-rose-400",    badge: "bg-rose-400/10 text-rose-300",    pill: "bg-rose-500 text-white" },
  emerald: { bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/20", hover: "hover:border-emerald-400/50 hover:from-emerald-500/15", icon: "text-emerald-400", badge: "bg-emerald-400/10 text-emerald-300", pill: "bg-emerald-500 text-white" },
  purple:  { bg: "from-purple-500/10 to-purple-500/5",   border: "border-purple-500/20",   hover: "hover:border-purple-400/50 hover:from-purple-500/15",  icon: "text-purple-400",  badge: "bg-purple-400/10 text-purple-300",  pill: "bg-purple-500 text-white" },
  amber:   { bg: "from-amber-500/10 to-amber-500/5",     border: "border-amber-500/20",    hover: "hover:border-amber-400/50 hover:from-amber-500/15",    icon: "text-amber-400",   badge: "bg-amber-400/10 text-amber-300",   pill: "bg-amber-500 text-white" },
  teal:    { bg: "from-teal-500/10 to-teal-500/5",       border: "border-teal-500/20",     hover: "hover:border-teal-400/50 hover:from-teal-500/15",     icon: "text-teal-400",    badge: "bg-teal-400/10 text-teal-300",    pill: "bg-teal-500 text-white" },
  orange:  { bg: "from-orange-500/10 to-orange-500/5",   border: "border-orange-500/20",   hover: "hover:border-orange-400/50 hover:from-orange-500/15", icon: "text-orange-400",  badge: "bg-orange-400/10 text-orange-300", pill: "bg-orange-500 text-white" },
};

export function matchesTopic(text: string, topicId: string): boolean {
  const topic = PODCAST_TOPICS.find(t => t.id === topicId);
  if (!topic) return true;
  const lower = text.toLowerCase();
  return topic.keywords.some(kw => lower.includes(kw));
}

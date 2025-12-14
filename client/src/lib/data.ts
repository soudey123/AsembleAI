import { Share2, Cpu, Database, Zap, Brain, Shield, BarChart3, Users } from "lucide-react";
import biologicalComputing from "@assets/stock_images/biological_computing_60b959d6.jpg";
import techJobs from "@assets/stock_images/future_of_tech_jobs__291b924f.jpg";
import leadership from "@assets/stock_images/executive_leadership_832b6d86.jpg";

export const podcasts = [
  // Video Episodes (YouTube)
  {
    slug: "beyond-silicon",
    title: "Beyond Silicon: Building Computers from Human Neurons",
    guest: "Dr. Ewelina Kurtys",
    date: "Nov 25, 2025",
    description: "What if the future of computing isn't silicon or quantum—but living neurons? We explore the world of biological computing.",
    thumbnail: biologicalComputing,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/634coEouNNV17sXsaZBTIp",
    appleUrl: "#",
    tags: ["Biocomputing", "Neuroscience", "DeepTech"],
    type: "video",
    duration: "38:44"
  },
  {
    slug: "future-of-tech-jobs",
    title: "AI and the Future of Tech Jobs",
    guest: "Tegan Bartos",
    date: "Nov 08, 2025",
    description: "Is AI a job killer or a career catalyst? We dive deep into the seismic shifts happening in the tech employment landscape.",
    thumbnail: techJobs,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/5aY9g1TNkiBx6LG27MdqSc",
    appleUrl: "#",
    tags: ["Careers", "Future of Work", "Reskilling"],
    type: "video",
    duration: "52:07"
  },
  {
    slug: "ai-growth-leadership",
    title: "AI-Enabled Growth Leadership",
    guest: "Greg Mester",
    date: "Oct 08, 2025",
    description: "Achieving next-level performance across profit, people, and purpose without trading one off against the others.",
    thumbnail: leadership,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/6JDFeMqtugp7ItivGl7gwp",
    appleUrl: "#",
    tags: ["Leadership", "Growth", "Strategy"],
    type: "video",
    duration: "1:01:00"
  },

  // Audio Episodes (Spotify) - Using the same ones as they are the latest, but formatted for Audio section
  {
    slug: "beyond-silicon-audio",
    title: "Beyond Silicon: Building Computers from Human Neurons",
    guest: "Dr. Ewelina Kurtys",
    date: "Nov 25, 2025",
    description: "What if the future of computing isn't silicon or quantum—but living neurons? We explore the world of biological computing.",
    thumbnail: biologicalComputing,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/634coEouNNV17sXsaZBTIp",
    appleUrl: "#",
    tags: ["Biocomputing", "Neuroscience"],
    type: "audio",
    duration: "38:44"
  },
  {
    slug: "future-of-tech-jobs-audio",
    title: "AI and the Future of Tech Jobs",
    guest: "Tegan Bartos",
    date: "Nov 08, 2025",
    description: "Is AI a job killer or a career catalyst? We dive deep into the seismic shifts happening in the tech employment landscape.",
    thumbnail: techJobs,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/5aY9g1TNkiBx6LG27MdqSc",
    appleUrl: "#",
    tags: ["Careers", "Future of Work"],
    type: "audio",
    duration: "52:07"
  },
  {
    slug: "ai-growth-leadership-audio",
    title: "AI-Enabled Growth Leadership",
    guest: "Greg Mester",
    date: "Oct 08, 2025",
    description: "Achieving next-level performance across profit, people, and purpose without trading one off against the others.",
    thumbnail: leadership,
    youtubeUrl: "https://www.youtube.com/@asembleaiyt",
    spotifyUrl: "https://open.spotify.com/episode/6JDFeMqtugp7ItivGl7gwp",
    appleUrl: "#",
    tags: ["Leadership", "Strategy"],
    type: "audio",
    duration: "1:01:00"
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

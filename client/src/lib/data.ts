import { Share2, Cpu, Database, Zap, Brain, Shield, BarChart3, Users } from "lucide-react";
import biologicalComputing from "@assets/stock_images/biological_computing_60b959d6.jpg";
import techJobs from "@assets/stock_images/future_of_tech_jobs__291b924f.jpg";
import leadership from "@assets/stock_images/executive_leadership_832b6d86.jpg";
import newsDigestImage from "@assets/ai_news_digest_workflow.png";
import researchAgentImage from "@assets/ai_research_agent_workflow.png";
import dataIntelligenceImage from "@assets/generated_images/ai_data_intelligence_agent.png";
import financialAnalystImage from "@assets/generated_images/ai_financial_analyst_agent.png";
import callChatAgentImage from "@assets/Screenshot_2026-02-02_at_9.54.51_AM_1770051455113.png";

export const podcasts = [
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
    slug: "ai-news-digest",
    title: "AI News Digest",
    category: "Research & Intelligence",
    description: "Automated AI-powered news aggregation and summarization agent.",
    problem: "Keeping up with the rapidly evolving AI landscape requires hours of daily reading across multiple sources, making it impossible to stay informed while focusing on core work.",
    solution: "Built an autonomous n8n workflow agent that automatically scans, curates, and summarizes AI news from trusted sources, delivering personalized digests on schedule.",
    impact: "Saves 5+ hours weekly on news consumption while ensuring no critical AI developments are missed.",
    tools: ["n8n", "AI/LLM", "RSS", "Automation"],
    tags: ["Automation", "News", "AI Agent"],
    githubUrl: "/workflows/ai-news-digest.json",
    isN8nWorkflow: true,
    image: newsDigestImage
  },
  {
    slug: "ai-research-agent",
    title: "AI Research Agent",
    category: "Research & Intelligence",
    description: "Intelligent research assistant that autonomously gathers and synthesizes information.",
    problem: "Research tasks require extensive manual effort to search, read, and synthesize information from multiple sources, often taking days for comprehensive analysis.",
    solution: "Developed an AI research agent using n8n that autonomously queries multiple sources, cross-references findings, and generates comprehensive research reports with citations.",
    impact: "Reduces research time by 80% while improving coverage and accuracy of findings.",
    tools: ["n8n", "AI/LLM", "Web Scraping", "RAG"],
    tags: ["Research", "AI Agent", "Automation"],
    githubUrl: "/workflows/ai-research-agent.json",
    isN8nWorkflow: true,
    image: researchAgentImage
  },
  {
    slug: "ai-data-intelligence-agent",
    title: "AI Data Intelligence Agent Using Pandas AI",
    category: "Data & Analytics",
    description: "Natural language interface for data analysis powered by PandasAI.",
    problem: "Data analysis requires specialized SQL and Python skills, creating bottlenecks when business users need quick insights from complex datasets.",
    solution: "Implemented a PandasAI-powered agent that understands natural language queries and automatically generates, executes, and visualizes data analysis results.",
    impact: "Enables non-technical users to perform complex data analysis in seconds, democratizing data access across the organization.",
    tools: ["Python", "PandasAI", "Claude", "Streamlit"],
    tags: ["Data Analytics", "AI Agent", "NLP"],
    githubUrl: "https://github.com/soudey123/AIAgentLab/tree/main/Data%20Intelligence%20Application",
    image: dataIntelligenceImage
  },
  {
    slug: "ai-financial-analyst-agent",
    title: "AI Financial Analyst Agent Using Vertex AI",
    category: "Enterprise Automation",
    description: "Intelligent financial analysis agent powered by Google Vertex AI.",
    problem: "Financial analysis requires extensive manual data gathering, calculation, and report generation, with analysts spending 60% of time on repetitive tasks.",
    solution: "Built an AI financial analyst agent using Google Vertex AI that autonomously analyzes market data, generates insights, and produces investment recommendations.",
    impact: "Automates 70% of routine financial analysis work, enabling analysts to focus on strategic decision-making and client relationships.",
    tools: ["Python", "Google Vertex AI", "Financial APIs", "Streamlit"],
    tags: ["Finance", "AI Agent", "Vertex AI"],
    githubUrl: "https://github.com/soudey123/AIAgentLab/tree/main/ai-financial-analyst-VertexAI",
    image: financialAnalystImage
  },
  {
    slug: "ai-call-chat-agent",
    title: "AI Call and Chat Agent for Restaurants",
    category: "Enterprise Automation",
    description: "Voice and chat AI agent for restaurant customer service and reservations.",
    problem: "Restaurants lose revenue from missed calls and struggle to handle high volumes of reservation requests, especially during peak hours.",
    solution: "Developed an AI-powered call and chat agent using n8n that handles customer inquiries, takes reservations, answers menu questions, and provides 24/7 automated customer service.",
    impact: "Reduces missed calls by 90% and handles unlimited concurrent conversations, improving customer satisfaction and increasing reservations.",
    tools: ["n8n", "AI/LLM", "Voice AI", "Automation"],
    tags: ["Voice AI", "Customer Service", "Restaurants"],
    githubUrl: "https://github.com/asembleAI/AI-Call-Chat-Agent",
    image: callChatAgentImage
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

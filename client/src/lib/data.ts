import biologicalComputing from "@assets/stock_images/biological_computing_60b959d6.jpg";
import techJobs from "@assets/stock_images/future_of_tech_jobs__291b924f.jpg";
import leadership from "@assets/stock_images/executive_leadership_832b6d86.jpg";

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

export const partnershipTiers = [
  {
    name: "Starter",
    price: "$750",
    period: "/mo",
    popular: false,
    features: [
      "1× host-read mid-roll/mo",
      "1× YouTube integration/quarter",
      "1× newsletter mention/mo",
      "Monthly performance report"
    ]
  },
  {
    name: "Growth",
    price: "$1,500",
    period: "/mo",
    popular: true,
    features: [
      "2× host-read spots/mo",
      "1× YouTube integration/mo",
      "2× newsletter slots/mo",
      "1× LinkedIn post/mo",
      "Monthly performance report"
    ]
  },
  {
    name: "Featured",
    price: "$3,000",
    period: "/mo",
    popular: false,
    features: [
      "Everything in Growth",
      "1× dedicated guest episode/quarter",
      "Co-branded content",
      "Priority placement & exclusivity",
      "Quarterly strategy review"
    ]
  }
];

export const enterprisePackages = [
  { name: "Branded Podcast Series", price: "From $10K" },
  { name: "Sponsored Research Report", price: "From $15K" },
  { name: "Executive Dinners", price: "From $25K/city" },
  { name: "Branded YouTube Tutorials", price: "From $5K" }
];

export const audienceStats = [
  { value: 400000, label: "Podcast Downloads", display: "400K+", suffix: "", description: "Across Apple, Spotify & Podbean" },
  { value: 7000, label: "YouTube Subscribers", display: "7K+", suffix: "", description: "Growing 15%+ month-over-month" },
  { value: 50, label: "Episodes Published", display: "50+", suffix: "", description: "Weekly multi-channel publishing" },
  { value: 20, label: "Expert Guests", display: "20+", suffix: "", description: "AI pioneers, CTOs & researchers" },
  { value: 100, label: "Newsletter Subscribers", display: "100+", suffix: "", description: "Growing community of practitioners" },
  { value: 18, label: "Months to 300K", display: "18", suffix: " mo", description: "Built in 18 months — on track for 1M" }
];

export const audienceDemographics = [
  { stat: "68%", label: "Technical Decision-Makers", detail: "Engineers, founders, CTOs & architects" },
  { stat: "41%", label: "Have Budget Authority", detail: "Up to $50K purchasing power" },
  { stat: "Top Metros", label: "Audience Reach", detail: "SF · NYC · Boston · Austin · Seattle" }
];

export const testimonials = [
  {
    quote: "It was a pleasure being part of the Inside AsembleAI podcast. The conversation felt genuinely engaging and thoughtful rather than a typical interview format. I appreciated the opportunity to discuss emerging ideas around biological computing and AI in a way that balanced technical depth with accessibility. Mac and the team created a relaxed atmosphere that made for a very natural and enjoyable discussion.",
    name: "Dr. Ewelina Kurtys",
    title: "Neuroscientist & AI Expert",
    linkedinUrl: "https://www.linkedin.com/in/ACoAAA88DkUBrIakZKYd45kpYJVFGp0SNNkRfcM",
    photo: "/testimonials/ewelina.jpeg"
  },
  {
    quote: "Mac and Sam asked sharp, practical questions that pushed past the AI hype and got into what actually happens when you manage a team of agents day to day. If you're building anything AI-native right now, this episode is worth your time.",
    name: "Mohamed Faker",
    title: "Engineering Leader, Vanguard",
    linkedinUrl: "",
    photo: "/testimonials/mohamed.png"
  },
  {
    quote: "They came well-prepared, asked insightful questions, and skillfully balanced technical depth with practical industry relevance. Their passion for advancing meaningful conversations in the industry is evident. I highly recommend Sam and Mac's podcast to anyone interested in AI and emerging technologies.",
    name: "Ramya Ganesh",
    title: "Advisor & Cisco WiCS Co-Lead",
    linkedinUrl: "",
    photo: "/testimonials/ramya.jpeg"
  },
  {
    quote: "Being a guest on Mac & Sam's AsembleAI podcast was a fantastic experience. They asked thoughtful, engaging questions, made the conversation feel natural, and created a great environment to dive into practical ideas about AI, business, and leadership.",
    name: "David Catalano",
    title: "Strategy & Ops Professional, Oxford MBA",
    linkedinUrl: "",
    photo: "/testimonials/david.jpeg"
  },
  {
    quote: "I first connected with AssembleAI as a teaching assistant and later with the Gamma Tiger Team, collaborating on two community driven projects. Their passion for people, learning, and fostering curiosity is clear, and being a guest on the AssembleAI Podcast was a joy, with its engaging blend of structure and open conversation that celebrates the community.",
    name: "Sean McLaughlin",
    title: "Adobe AI Community Associate",
    linkedinUrl: "",
    photo: "/testimonials/sean.png"
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

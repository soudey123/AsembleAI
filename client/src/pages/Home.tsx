import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import {
  audienceStats,
  audienceDemographics,
  testimonials,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, Camera, ChevronLeft, ChevronRight, ExternalLink, GraduationCap, Loader2, Megaphone, Mic2, PackageSearch, Youtube } from "lucide-react";
import { PODCAST_TOPICS, ACCENT_COLORS } from "@/lib/topics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import aiImg from "@assets/stock_images/artificial_intellige_fc16285f.jpg";
import techJobsImg from "@assets/stock_images/future_of_tech_jobs__291b924f.jpg";
import biologicalComputingImg from "@assets/stock_images/biological_computing_60b959d6.jpg";
import leadershipImg from "@assets/stock_images/executive_leadership_832b6d86.jpg";
import audienceMapImg from "@assets/download_1780840409614.png";

const SERVICE_CAPABILITIES = [
  { name: "Podcast Production", description: "From executive positioning and guest strategy to production and distribution.", icon: Mic2, accent: "from-blue-500/25 to-cyan-500/5", number: "01" },
  { name: "YouTube Marketing", description: "Long-form shows, Shorts and channel systems designed for discoverability.", icon: Youtube, accent: "from-red-500/25 to-orange-500/5", number: "02" },
  { name: "Campaign Outreach", description: "Targeted guest, partner and audience outreach built around your niche.", icon: Megaphone, accent: "from-purple-500/25 to-pink-500/5", number: "03" },
  { name: "Educational Content", description: "Complex ideas turned into credible explainers, series and learning assets.", icon: GraduationCap, accent: "from-emerald-500/25 to-teal-500/5", number: "04" },
  { name: "Product Marketing", description: "Narratives and omnichannel content that connect technical products to buyers.", icon: PackageSearch, accent: "from-amber-500/25 to-orange-500/5", number: "05" },
  { name: "Conference Coverage", description: "On-site interviews, executive insights and social-ready field content from industry events.", icon: Camera, accent: "from-cyan-500/25 to-blue-500/5", number: "06" },
];

type NewsletterArticle = {
  title: string;
  date: string;
  summary: string;
  link: string;
  image: string;
};

const FEATURED_COMPANIES = [
  { name: "ActualyzeAI", guest: "Sean Lynch & Rafi Khardalian", domain: "actualyze.ai" },
  { name: "Atera", guest: "Oshri Moyal", domain: "atera.com" },
  { name: "DTEX Systems", guest: "Rajan Koo", domain: "dtexsystems.com" },
  { name: "Mind Children", guest: "Chris Kudla", domain: "mindchildren.com" },
  { name: "Sophos", guest: "Ed Martin", domain: "sophos.com" },
  { name: "SingularityNET", guest: "Ben Goertzel", domain: "singularitynet.io" },
  { name: "TrueFoundry", guest: "Nikunj Bajaj", domain: "truefoundry.com" },
  { name: "Kalk Robotics", guest: "Olle Bergstedt", domain: "kalkrobotics.com" },
  { name: "LotusPetal AI", guest: "Rohit V Anabheri", domain: "lotuspetal.ai" },
  { name: "Backblaze", guest: "Troy Liljedahl", domain: "backblaze.com" },
  { name: "WEX", guest: "Mohamed Battisha", domain: "wexinc.com" },
  { name: "Inception", guest: "Aditya Grover", domain: "inceptionlabs.ai" },
  { name: "Designverse", guest: "Andrei Manolache", domain: "designverse.ai" },
  { name: "Lineaje", guest: "Anand Revashetti", domain: "lineaje.com" },
  { name: "ARC Document Solutions", guest: "Dilo Wijesuriya", domain: "e-arc.com" },
  { name: "Insilico Medicine", guest: "Alex Zhavoronkov", domain: "insilico.com" },
  { name: "AI Ad Studio", guest: "Sam Joos", domain: "aiadstudio.com" },
  { name: "Brain Wave Collective", guest: "Daniel Ritchie", domain: "brainwavecollective.com" },
  { name: "Kognitos", guest: "Binny Gill", domain: "kognitos.com" },
  { name: "BDO USA", guest: "Fred Rica", domain: "bdo.com" },
  { name: "Concentrix", guest: "Kathryn Harrison", domain: "concentrix.com" },
];

const PODCAST_RSS_FEED_URL = "https://media.rss.com/asemble-mac-and-sam/feed.xml";


const TOPIC_IMAGES: Array<{ keywords: string[]; image: string }> = [
  { keywords: ["healthcare", "medical", "health", "hospital", "fraud", "pharma", "clinic"], image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&q=80" },
  { keywords: ["soccer", "football", "premier league", "epl", "fifa"], image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=640&q=80" },
  { keywords: ["basketball", "nba", "court", "hoops"], image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=640&q=80" },
  { keywords: ["sport", "athlete", "analytics", "performance"], image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=640&q=80" },
  { keywords: ["film", "movie", "cinema", "filmmaking", "creative", "art", "visual"], image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&q=80" },
  { keywords: ["job", "career", "work", "reskill", "collar", "employ", "workforce", "talent"], image: techJobsImg },
  { keywords: ["leadership", "strategy", "growth", "ceo", "executive", "management", "enterprise"], image: leadershipImg },
  { keywords: ["neuron", "biological", "brain", "biocomputing", "silicon", "quantum", "computing"], image: biologicalComputingImg },
  { keywords: ["robot", "automat", "agent", "llm", "gpt", "langchain", "langgraph", "streamlit", "pandas"], image: aiImg },
  { keywords: ["startup", "venture", "invest", "funding", "unicorn"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80" },
  { keywords: ["climate", "energy", "green", "sustain", "environment"], image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=640&q=80" },
  { keywords: ["cyber", "security", "hack", "privacy", "data"], image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&q=80" },
  { keywords: ["ai", "artificial", "intelligence", "deep tech", "machine learning", "deeptech", "science"], image: aiImg },
];

function getEpisodeThumbnail(title: string, rssThumbnail: string, videos: any[]): string {
  if (rssThumbnail) return rssThumbnail;

  if (videos?.length) {
    const epWords = new Set(title.toLowerCase().split(/\W+/).filter((w) => w.length > 3));
    let best = { thumbnail: "", score: 0 };
    for (const v of videos) {
      const vWords = v.title.toLowerCase().split(/\W+/).filter((w: string) => w.length > 3);
      const hits = vWords.filter((w: string) => epWords.has(w)).length;
      const score = hits / Math.max(epWords.size, vWords.length);
      if (score > 0.25 && score > best.score) best = { thumbnail: v.thumbnail, score };
    }
    if (best.thumbnail) return best.thumbnail;
  }
  return aiImg;
}

function matchYoutubeUrl(episodeTitle: string, videos: any[]): string {
  if (!videos?.length) return "https://www.youtube.com/@asembleaiyt";
  const epWords = new Set(
    episodeTitle.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
  );
  let best = { url: "https://www.youtube.com/@asembleaiyt", score: 0 };
  for (const v of videos) {
    const vWords = v.title.toLowerCase().split(/\W+/).filter((w: string) => w.length > 3);
    const hits = vWords.filter((w: string) => epWords.has(w)).length;
    const score = hits / Math.max(epWords.size, vWords.length);
    if (score > 0.3 && score > best.score) best = { url: v.youtubeUrl, score };
  }
  return best.url;
}

const SKIP_KEYWORDS = ["soccer", "football", "premier league", "fifa"];
function hasSkipKeyword(title: string) {
  const t = title.toLowerCase();
  return SKIP_KEYWORDS.some((kw) => t.includes(kw));
}

function selectFeaturedEpisodes(episodes: any[]): any[] {
  if (!episodes.length) return [];
  const first = episodes[0];
  const rest = episodes.slice(1);
  // Prefer an episode where a real guest was extracted (not "AsembleAI Team")
  const guestEp = rest.find(
    (ep) => ep.guest && ep.guest !== "AsembleAI Team" && ep.guest.length > 4
  );
  // 3rd slot: next in order, skip the guest ep and skip soccer-related episodes
  const thirdEp = rest.find(
    (ep) => ep !== guestEp && !hasSkipKeyword(ep.title)
  );
  return [first, guestEp ?? rest[0], thirdEp ?? rest[1]].filter(Boolean).slice(0, 3);
}

/* ─────────────────────────────────────────────────────────
   SHARED UTILITIES
───────────────────────────────────────────────────────── */
function AnimatedTitle({
  children,
  gradient = "from-cyan-400 via-blue-500 to-purple-500",
}: {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto]`}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

function AnimatedCounter({ value, display }: { value: number; display: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  const formatted = count >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString();
  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white font-heading">
      {formatted}{display.includes("+") ? "+" : ""}{display.includes(" mo") ? " mo" : ""}
    </div>
  );
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    if (length <= 1) return;
    const timer = setInterval(() => { setDirection(1); setCurrent((c) => (c + 1) % length); }, 7000);
    return () => clearInterval(timer);
  }, [length]);

  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + length) % length); };
  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % length); };
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0 }),
  };
  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto" data-testid="section-testimonials-carousel">
      <div className="overflow-hidden min-h-[240px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current} custom={direction} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }} className="w-full"
          >
            <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-8">
              "{t.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              {t.photo ? (
                <img src={t.photo} alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-purple-500/40 flex items-center justify-center text-white font-bold text-sm border border-white/10 shrink-0">
                  {t.name.charAt(0)}
                </div>
              )}
              <div>
                {t.linkedinUrl ? (
                  <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-primary transition-colors inline-flex items-center gap-1"
                    data-testid={`link-testimonial-linkedin-${current}`}>
                    {t.name} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-semibold text-white">{t.name}</span>
                )}
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all" data-testid="button-testimonial-prev">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-white/20 w-2"}`}
                data-testid={`button-testimonial-dot-${i}`} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all" data-testid="button-testimonial-next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus("success"); setEmail(""); } else throw new Error();
    } catch {
      window.open("https://substack.com/@asembleai", "_blank");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
        <div className="text-3xl mb-3">🎉</div>
        <p className="text-white font-semibold text-lg">You're in!</p>
        <p className="text-muted-foreground text-sm mt-1">Check your inbox for a confirmation.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="form-newsletter">
      <Input type="email" placeholder="Enter your email address" value={email}
        onChange={(e) => setEmail(e.target.value)} required
        className="h-12 bg-white/5 border-white/15 text-white placeholder:text-muted-foreground/60 focus:border-primary rounded-full px-5"
        data-testid="input-newsletter-email" />
      <Button type="submit" disabled={status === "loading"}
        className="h-12 px-7 rounded-full bg-white text-black hover:bg-white/90 font-semibold shrink-0 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        data-testid="button-newsletter-submit">
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Subscribe <ArrowRight className="ml-1 w-4 h-4" /></>}
      </Button>
    </form>
  );
}

function ProofStrip() {
  return (
    <Section className="home-proof border-y border-white/10 bg-black py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-5xl mx-auto">
        {audienceStats.slice(0, 3).map((stat) => (
          <div key={stat.label} className="px-6 py-4 md:py-2 text-center">
            <AnimatedCounter value={stat.value} display={stat.display} />
            <p className="text-sm font-semibold text-white mt-2">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FeaturedCompanies() {
  const headline = "We featured the AI leaders and executives shaping what’s next";
  const companyRows = [
    FEATURED_COMPANIES.filter((_, index) => index % 2 === 0),
    FEATURED_COMPANIES.filter((_, index) => index % 2 === 1),
  ];

  return (
    <section
      className="home-companies overflow-hidden border-y border-white/10 bg-black py-14 md:py-18"
      aria-labelledby="featured-companies-title"
    >
      <div className="container mx-auto px-6">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-primary">
          Our guest network
        </p>
        <h2
          id="featured-companies-title"
          className="mx-auto mb-10 max-w-3xl text-center text-3xl font-bold text-white md:text-5xl"
        >
          {headline.split(" ").map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.24em] inline-block"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>

      <div className="space-y-4">
        {companyRows.map((companies, rowIndex) => {
          const marqueeItems = [...companies, ...companies];
          return (
            <div
              key={rowIndex}
              className={`company-marquee company-marquee-row-${rowIndex + 1}`}
              aria-label={`Companies represented by podcast guests, row ${rowIndex + 1}`}
            >
              <div className="company-marquee-track">
                {marqueeItems.map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="company-wordmark"
                    title={`${company.name} — ${company.guest}`}
                    aria-hidden={index >= companies.length}
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain_url=https://${company.domain}&sz=64`}
                      alt={`${company.name} logo`}
                      width="32"
                      height="32"
                      loading="eager"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                        event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                      }}
                    />
                    <span className="company-logo-fallback" hidden aria-hidden="true">
                      {company.name.charAt(0)}
                    </span>
                    <div>
                      <span>{company.name}</span>
                      <small>{company.guest}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION BACKGROUNDS
───────────────────────────────────────────────────────── */

/** Episodes — audio waveform bars + floating cyan orbs */
function EpisodesBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cyan orb top-right */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)", top: "-120px", right: "-100px", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      {/* Blue orb bottom-left */}
      <motion.div className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)", bottom: "-80px", left: "-80px", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      {/* Waveform bars along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 px-8 opacity-[0.07]">
        {Array.from({ length: 80 }).map((_, i) => {
          const h = 20 + Math.sin(i * 0.45) * 30 + Math.sin(i * 0.2) * 20;
          return (
            <motion.div key={i} className="w-1 rounded-t bg-cyan-400 shrink-0"
              style={{ height: `${h}%` }}
              animate={{ scaleY: [1, 1.3 + Math.random() * 0.4, 1] }}
              transition={{ duration: 1.5 + (i % 5) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }} />
          );
        })}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} />
      ))}
    </div>
  );
}

/** Audience — animated constellation network + teal glow */
function AudienceBg() {
  const nodes = [
    { x: 12, y: 20 }, { x: 88, y: 15 }, { x: 50, y: 8 },
    { x: 25, y: 75 }, { x: 75, y: 80 }, { x: 8, y: 50 },
    { x: 92, y: 55 }, { x: 40, y: 90 }, { x: 62, y: 45 },
  ];
  const edges = [[0,2],[1,2],[2,8],[0,5],[1,6],[3,4],[3,7],[4,7],[5,3],[6,4],[8,1],[8,6]];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Central teal glow */}
      <motion.div className="absolute w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 60%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

      {/* SVG constellation */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <motion.line key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="rgb(20,184,166)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r="4" fill="rgb(20,184,166)"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
        ))}
      </svg>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
    </div>
  );
}

/** Testimonials — giant quote marks + purple bloom */
function TestimonialsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Giant faint quote mark */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[320px] leading-none font-serif font-bold text-purple-500/[0.04] select-none">
        "
      </div>

      {/* Purple orb center */}
      <motion.div className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 60%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      {/* Pink accent top-right */}
      <motion.div className="absolute w-[300px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%)", top: "-60px", right: "10%", filter: "blur(50px)" }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      {/* Sparkle dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? "3px" : "2px",
            height: i % 3 === 0 ? "3px" : "2px",
            background: i % 2 === 0 ? "rgba(168,85,247,0.5)" : "rgba(236,72,153,0.5)",
            left: `${5 + (i * 8.5) % 90}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }} />
      ))}
    </div>
  );
}

/** Services — diagonal scan streaks + orange/amber glow */
function ServicesBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Orange glow bottom-left */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,146,60,0.10) 0%, transparent 65%)", bottom: "-100px", left: "-60px", filter: "blur(70px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      {/* Red/pink glow top-right */}
      <motion.div className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 65%)", top: "-80px", right: "-40px", filter: "blur(70px)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

      {/* Diagonal scan streaks */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          className="absolute"
          style={{
            width: "2px",
            height: "180px",
            background: "linear-gradient(to bottom, transparent, rgba(251,146,60,0.25), transparent)",
            left: `${15 + i * 18}%`,
            top: "-30px",
            transform: "rotate(25deg)",
            transformOrigin: "top",
          }}
          animate={{ y: [0, "110vh"], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeIn", delay: i * 1.2 }} />
      ))}

      {/* Horizontal glow lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${25 + i * 28}%`, background: "linear-gradient(to right, transparent, rgba(251,146,60,0.12), rgba(239,68,68,0.12), transparent)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.1 }} />
      ))}
    </div>
  );
}

/** Newsletter — aurora rising + warm particles */
function NewsletterBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Aurora layer — animated warm gradient rising from bottom */}
      <motion.div className="absolute inset-x-0 bottom-0 h-full"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(251,191,36,0.14) 0%, rgba(249,115,22,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(249,115,22,0.14) 0%, rgba(239,68,68,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(251,191,36,0.14) 0%, rgba(249,115,22,0.08) 40%, transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      {/* Secondary aurora — top subtle cool haze */}
      <div className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      {/* Starburst rays from center-bottom */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + Math.cos(rad) * 80;
          const y2 = 110 + Math.sin(rad) * 80;
          return (
            <line key={i} x1="50%" y1="100%" x2={`${x2}%`} y2={`${y2}%`}
              stroke="rgb(251,191,36)" strokeWidth="1" />
          );
        })}
      </svg>

      {/* Rising warm particles */}
      {[...Array(14)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: "3px", height: "3px",
            background: i % 2 === 0 ? "rgba(251,191,36,0.6)" : "rgba(249,115,22,0.6)",
            left: `${5 + (i * 6.8) % 90}%`,
            bottom: "-10px",
          }}
          animate={{ y: [0, -(200 + (i % 5) * 60)], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.3] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeOut", delay: i * 0.45 }} />
      ))}
    </div>
  );
}

function ServicesSection() {
  return (
    <Section className="home-section home-services border-y border-white/10" id="services" bg={<ServicesBg />}>
      <div className="text-center mb-14">
        <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">What We Offer</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          One story. Every channel.{" "}
          <AnimatedTitle gradient="from-orange-400 via-red-500 to-pink-500">Built to compound.</AnimatedTitle>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We turn technical expertise into trusted media, focused outreach and campaigns that move niche audiences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto mb-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_CAPABILITIES.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className={`group relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${service.accent} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25`}
              data-testid={`card-service-${i}`}>
              <span className="absolute right-4 top-3 font-mono text-4xl font-black text-white/[0.05]">{service.number}</span>
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{service.name}</h3>
              <p className="text-sm leading-relaxed text-white/55">{service.description}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-cyan-300 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <a href="mailto:asembleaimedia@asembleai.com">
          <Button size="lg" className="h-12 rounded-lg bg-primary px-8 font-semibold hover:bg-primary/90" data-testid="button-services-contact">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────── */
export default function Home() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const scrollToHashSection = () => {
      const sectionId = window.location.hash.slice(1);
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHashSection);
    });
    const retry = window.setTimeout(scrollToHashSection, 250);
    window.addEventListener("hashchange", scrollToHashSection);
    window.addEventListener("popstate", scrollToHashSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
      window.removeEventListener("hashchange", scrollToHashSection);
      window.removeEventListener("popstate", scrollToHashSection);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const { data: episodesData, isLoading: episodesLoading } = useQuery<{ episodes: any[] }>({
    queryKey: ["/api/podcast/audio"],
    staleTime: 5 * 60 * 1000,
  });
  const { data: videosData } = useQuery<{ videos: any[] }>({
    queryKey: ["/api/podcast/videos"],
    staleTime: 5 * 60 * 1000,
  });
  const { data: newsletterData } = useQuery<{ articles: NewsletterArticle[] }>({
    queryKey: ["/api/newsletter/articles"],
    staleTime: 15 * 60 * 1000,
  });
  const featuredEpisodes = selectFeaturedEpisodes(episodesData?.episodes ?? []);
  const ai4Article = newsletterData?.articles.find((article) =>
    `${article.title} ${article.summary}`.toLowerCase().includes("ai4")
  ) ?? newsletterData?.articles[0];

  return (
    <Layout>
      <div className="home-flow">
        <div className="home-hero">
          <Hero />
        </div>

        <ServicesSection />
        <FeaturedCompanies />
        <ProofStrip />

      {/* ── TOPICS / BROWSE BY CATEGORY ── */}
      <Section id="topics" className="home-section home-topics border-y border-white/10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Browse by Podcast Topic</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our <AnimatedTitle gradient="from-cyan-400 via-blue-500 to-purple-500">Topic Areas</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            75 episodes covering the full spectrum of AI — from frontier research to practical deployment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {PODCAST_TOPICS.map((topic, i) => {
            const c = ACCENT_COLORS[topic.accent];
            const Icon = topic.icon;
            return (
              <motion.div key={topic.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} viewport={{ once: true }}
              >
                <Link href={`/podcast?topic=${topic.id}`}>
                  <div className={`group cursor-pointer rounded-2xl border bg-gradient-to-br ${c.bg} ${c.border} ${c.hover} p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                    data-testid={`card-topic-${topic.id}`}>
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                      <Icon className={`w-6 h-6 ${c.icon}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 leading-tight">{topic.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-snug hidden sm:block">{topic.description}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>
                      {topic.episodeCount} episodes
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/podcast">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-8 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
              data-testid="button-explore-all-topics">
              Explore All Episodes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── LATEST EPISODES ── */}
      <Section id="episodes" className="home-section home-episodes" bg={<EpisodesBg />}>
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Latest Episodes</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent <AnimatedTitle>Conversations</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep dives with AI pioneers, scientists, and innovators shaping the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {episodesLoading
            ? [0, 1, 2].map((i) => (
                <Card key={i} className="h-full glass-card border-white/5 overflow-hidden animate-pulse" data-testid={`card-episode-skeleton-${i}`}>
                  <div className="aspect-video bg-white/5" />
                  <CardContent className="p-5 space-y-3">
                    <div className="h-3 w-16 bg-white/10 rounded-full" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-2/3 bg-white/10 rounded" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </CardContent>
                </Card>
              ))
            : featuredEpisodes.map((ep, i) => (
                <motion.div key={ep.slug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <Card className="h-full glass-card border-white/5 hover:border-primary/30 transition-all duration-300 group overflow-hidden" data-testid={`card-episode-${i}`}>
                    <div className="aspect-video overflow-hidden">
                       <img src={getEpisodeThumbnail(ep.title, ep.thumbnail ?? "", videosData?.videos ?? [])} alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(ep.tags ?? []).slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors">{ep.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{ep.guest ? `with ${ep.guest} · ` : ""}{ep.duration}</p>
                      <div className="flex gap-2">
                        <a href={PODCAST_RSS_FEED_URL} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 border border-white/10 transition-all text-muted-foreground">RSS Feed</a>
                        <a href={matchYoutubeUrl(ep.title, videosData?.videos ?? [])} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 transition-all text-muted-foreground">YouTube</a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
          }
        </div>

        <div className="text-center">
          <Link href="/podcast">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5" data-testid="button-all-episodes">
              All Episodes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── BY THE NUMBERS / AUDIENCE ── */}
      <Section className="home-section home-audience scroll-mt-24 border-y border-white/10" id="audience" bg={<AudienceBg />}>
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">The AsembleAI Audience</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <AnimatedTitle gradient="from-teal-400 via-emerald-500 to-green-400">By the Numbers</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">600K+ downloads, 75+ episodes and 50+ featured guests — built for a focused global audience.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {audienceStats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              className="glass-card border-white/5 rounded-2xl p-6 text-center" data-testid={`card-stat-${i}`}>
              <AnimatedCounter value={stat.value} display={stat.display} />
              <p className="text-sm font-semibold text-white mt-2 mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Audience Demographics</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audienceDemographics.map((d, i) => (
              <motion.div key={d.label}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-white/10 rounded-2xl p-6 text-center"
                data-testid={`card-demographic-${i}`}>
                <div className="text-3xl font-bold text-white mb-1">{d.stat}</div>
                <div className="text-sm font-semibold text-teal-400 mb-1">{d.label}</div>
                <div className="text-xs text-muted-foreground">{d.detail}</div>
              </motion.div>
            ))}
          </div>

          {/* Global Presence box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} viewport={{ once: true }}
            className="mt-4 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">🌍 Global Presence</div>
            <div className="text-sm font-semibold text-teal-400 mb-3">International Listeners</div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { flag: "🇺🇸", name: "USA" },
                { flag: "🇨🇦", name: "Canada" },
                { flag: "🇬🇧", name: "UK" },
                { flag: "🇩🇪", name: "Germany" },
                { flag: "🇳🇴", name: "Norway" },
                { flag: "🇹🇼", name: "Taiwan" },
              ].map(({ flag, name }) => (
                <div key={name} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="text-xl leading-none">{flag}</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── GLOBAL FOOTPRINT ── */}
        <motion.div className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Global Footprint</p>
          <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-2">
            Niche influence without borders
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
            Reaching decision-makers across 50 countries and the technology centers where AI products, research and markets converge.
          </p>

          {/* World map */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black mb-8">
            <img src={audienceMapImg} alt="Listener distribution world map showing 50 countries" className="w-full h-auto" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["North America", "Europe", "Asia Pacific", "Emerging Markets"].map((region, i) => (
              <motion.div key={region}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                <div className="mb-1 text-lg">{["◎", "◈", "◇", "✦"][i]}</div>
                <span className="text-xs font-semibold text-white/75">{region}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section id="testimonials" className="home-section home-testimonials" bg={<TestimonialsBg />}>
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Guest Voices</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What <AnimatedTitle gradient="from-purple-400 via-pink-500 to-rose-500">Our Guests</AnimatedTitle> Say
          </h2>
        </div>
        <TestimonialsCarousel />
      </Section>

      {/* ── NEWSLETTER SIGNUP ── */}
      <Section id="newsletter" className="home-section home-newsletter" bg={<NewsletterBg />}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.a href={ai4Article?.link ?? "https://asembleai.substack.com"} target="_blank" rel="noopener noreferrer"
            className="group relative block min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-black"
            initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {ai4Article?.image && <img src={ai4Article.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">Latest from AI4</div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2 text-xs text-white/55"><CalendarDays className="h-4 w-4" />{ai4Article?.date ?? "Latest article"}</div>
              <h3 className="max-w-2xl text-2xl font-bold leading-tight text-white md:text-3xl">{ai4Article?.title ?? "Read the latest AsembleAI analysis"}</h3>
              <p className="mt-3 text-sm text-white/60">{ai4Article?.summary}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-300">Read the field notes <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </motion.a>
          <motion.div className="text-left" initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">The AsembleAI Brief</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Signal from the <AnimatedTitle gradient="from-yellow-400 via-orange-500 to-red-500">frontier.</AnimatedTitle>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Conference intelligence, technical conversations and practical lessons for people building what comes next.
            </p>
            <NewsletterForm />
            <p className="text-xs text-muted-foreground mt-4">
              No spam, ever. Unsubscribe in one click.{" "}
              <a href="https://substack.com/@asembleai" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-white transition-colors">
                Also on Substack →
              </a>
            </p>
          </motion.div>
        </div>
      </Section>

      </div>
    </Layout>
  );
}

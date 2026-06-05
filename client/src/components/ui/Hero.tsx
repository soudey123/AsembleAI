import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", color: "hover:bg-purple-500/20 hover:text-purple-300" },
  { label: "Spotify", href: "https://open.spotify.com/show/7m7PI5LmJfPxbQU8jzNbBO", color: "hover:bg-green-500/20 hover:text-green-400" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", color: "hover:bg-red-500/20 hover:text-red-400" },
  { label: "Podbean", href: "https://media.rss.com/inside-asembleai", color: "hover:bg-orange-500/20 hover:text-orange-400" },
];

// AsembleAI's own YouTube videos — captured from the channel feed
const BG_VIDEO_IDS = ["haI2RafE_JI", "Vib0JgDO_lY", "-2Wp2XGho6U"];

function YouTubeBackground() {
  const [videoId] = useState(BG_VIDEO_IDS[0]);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      {/* YouTube iframe — muted, autoplay, loop, no controls */}
      {/* Wrapper clips the YouTube info bar that appears at top */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          width: "177.78vh",
          height: "100vh",
          minWidth: "100%",
          minHeight: "56.25vw",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {/* Iframe pushed up to hide the YT info overlay; outer div clips it */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: 0,
            right: 0,
            bottom: "-80px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&fs=0&disablekb=1`}
            title="Background video"
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full border-0"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {/* Dark overlay gradient to maintain readability */}
      <div className="absolute inset-0 bg-[#060b18]/70" />
      {/* Extra depth at edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060b18]/80 via-transparent to-[#060b18]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/60 via-transparent to-[#060b18]" />

      {/* Animated orb accents on top of video for brand colour */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
          top: "-100px",
          left: "-80px",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
          bottom: "0px",
          right: "-60px",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400 pointer-events-none"
          style={{
            left: `${8 + (i * 7.8) % 85}%`,
            top: `${15 + (i * 11.3) % 70}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <YouTubeBackground />

      <div className="container mx-auto px-4 relative z-10 text-center pt-36 pb-24 md:pt-44 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto space-y-7"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/40 backdrop-blur-md cursor-default"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(59,130,246,0.15)",
                "0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(34,211,238,0.2)",
                "0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(59,130,246,0.15)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Media · Tech · Innovation
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-[1.08] text-white">
            The media platform for{" "}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] inline-block"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              AI, DeepTech &amp; Science
            </motion.span>{" "}
            decision-makers.
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Podcast, YouTube, newsletter and community — building and partnering at the frontier of technology and innovation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="/podcast">
              <Button
                size="lg"
                className="h-13 px-8 text-base rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all"
                data-testid="button-hero-listen"
              >
                🎙 Listen Now
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="h-13 px-8 text-base rounded-full border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all"
              onClick={() => scrollToSection("services")}
              data-testid="button-hero-partner"
            >
              Partner With Us
            </Button>
          </div>

          {/* Platform badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest mr-1">Available on</span>
            {PLATFORMS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-medium text-muted-foreground transition-colors border border-white/10 rounded-full px-4 py-1.5 bg-white/5 ${p.color}`}
                data-testid={`link-platform-${p.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {p.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", color: "hover:bg-purple-500/20 hover:text-purple-300" },
  { label: "Spotify", href: "https://open.spotify.com/show/7m7PI5LmJfPxbQU8jzNbBO", color: "hover:bg-green-500/20 hover:text-green-400" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", color: "hover:bg-red-500/20 hover:text-red-400" },
  { label: "Podbean", href: "https://media.rss.com/inside-asembleai", color: "hover:bg-orange-500/20 hover:text-orange-400" },
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#060b18]" />

      {/* Orb 1 — cyan/blue top-left */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.6) 0%, rgba(59,130,246,0.4) 40%, transparent 70%)",
          top: "-200px",
          left: "-100px",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 80, 30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — purple bottom-right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(99,102,241,0.4) 40%, transparent 70%)",
          bottom: "-150px",
          right: "-100px",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -70, -20, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Orb 3 — blue center */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: `${5 + (i * 6.2) % 90}%`,
            top: `${10 + (i * 13.7) % 80}%`,
            opacity: 0.3 + (i % 4) * 0.1,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.4) % 3,
          }}
        />
      ))}

      {/* Scan line sweep */}
      <motion.div
        className="absolute inset-x-0 h-[2px] opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)",
          top: 0,
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground />

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
            <a href="/newsletter">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base rounded-full border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all"
                data-testid="button-hero-subscribe"
              >
                Subscribe to Newsletter
              </Button>
            </a>
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

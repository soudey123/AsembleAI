import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", color: "hover:bg-purple-500/20 hover:text-purple-300" },
  { label: "Spotify", href: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU", color: "hover:bg-green-500/20 hover:text-green-400" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", color: "hover:bg-red-500/20 hover:text-red-400" },
  { label: "Podbean", href: "https://asembleaisocial.podbean.com/", color: "hover:bg-orange-500/20 hover:text-orange-400" },
];

const VIDEO_ID = "nWCP19vGxIE";
const LOOP_END = 5; // seconds

function isMobileDevice() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  );
}

function BackgroundOrbs() {
  return (
    <>
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-[#060b18]/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060b18]/70 via-transparent to-[#060b18]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/50 via-transparent to-[#060b18]" />

      {/* Brand colour orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          top: "-100px",
          left: "-80px",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          bottom: "0px",
          right: "-60px",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          top: "30%",
          right: "20%",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </>
  );
}

function MobileBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      {/* Static thumbnail from the same YouTube video — consistent look with desktop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <BackgroundOrbs />
    </div>
  );
}

function YouTubeBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || !wrapperRef.current || playerRef.current) return;

      playerRef.current = new (window as any).YT.Player(wrapperRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
          start: 0,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (event: any) => {
            if (cancelled) return;
            event.target.mute();
            event.target.playVideo();
            setVisible(true);

            // Poll every 100ms — when time >= LOOP_END, seek back to 0
            intervalRef.current = setInterval(() => {
              try {
                const t = event.target.getCurrentTime();
                if (t >= LOOP_END) {
                  event.target.seekTo(0, true);
                  event.target.playVideo();
                }
              } catch {}
            }, 100);
          },
          onStateChange: (event: any) => {
            if (cancelled) return;
            const YT = (window as any).YT;
            if (
              YT &&
              (event.data === YT.PlayerState.PAUSED ||
                event.data === YT.PlayerState.ENDED)
            ) {
              try {
                event.target.playVideo();
              } catch {}
            }
          },
        },
      });
    }

    const yt = (window as any).YT;
    if (yt && yt.Player) {
      createPlayer();
    } else {
      // Chain with any existing callback so we don't clobber it
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        createPlayer();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      {/* Outer sizing wrapper — centres the 16:9 iframe to always cover the section */}
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
        {/*
          YouTube replaces wrapperRef div with an iframe.
          Pushed up by 80 px so the YT title overlay (top-left) is clipped.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            top: "-80px",
            bottom: "-80px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <div
            ref={wrapperRef}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <BackgroundOrbs />
    </div>
  );
}

function HeroBackground() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobileDevice());
  }, []);

  return mobile ? <MobileBackground /> : <YouTubeBackground />;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

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
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest mr-1">
              Available on
            </span>
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

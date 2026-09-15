import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", icon: "🎵", color: "hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30" },
  { label: "Spotify", href: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU", icon: "♫", color: "hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30" },
  { label: "iHeartRadio", href: "https://www.iheart.com/search/?q=inside+asembleai", icon: "♥", color: "hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", icon: "▶", color: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30" },
];

const HERO_REEL = [
  { videoId: "eZtXVs1XIe8", startSeconds: 8, label: "ActualyzeAI" },
  { videoId: "hti_8AM_mBg", startSeconds: 10, label: "Atera" },
  { videoId: "rhvY5p1UkLg", startSeconds: 7, label: "DTEX" },
  { videoId: "Q0dcB15m8Ns", startSeconds: 9, label: "Mind Children" },
  { videoId: "GOBtXqJMfIU", startSeconds: 12, label: "SingularityNET" },
  { videoId: "BoLde-FY_Bg", startSeconds: 8, label: "Sophos" },
  { videoId: "U2AIQnF5dxc", startSeconds: 10, label: "TrueFoundry" },
  { videoId: "BoJuiUX-nB0", startSeconds: 7, label: "Kalk Robotics" },
  { videoId: "FoTjTTFnHlw", startSeconds: 8, label: "Douglas Swatski" },
  { videoId: "_bCV2xm3TC8", startSeconds: 10, label: "LotusPetal AI" },
  { videoId: "nWCP19vGxIE", startSeconds: 6, label: "Inside AsembleAI" },
  { videoId: "gacscV1XtUc", startSeconds: 8, label: "Backblaze" },
];
const REEL_CLIP_DURATION = 4.8;

function RevealWords({
  text,
  className = "",
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block"
          aria-hidden="true"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: startDelay + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function TechBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030916]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_82%_42%,rgba(6,182,212,0.14),transparent_28rem)]" />
      <motion.div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,22,0.1),rgba(3,9,22,0.42)_48%,rgba(3,9,22,0.12))]" />
      {[18, 42, 68].map((top, index) => (
        <motion.div
          key={top}
          className="absolute left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{ top: `${top}%` }}
          animate={{ x: ["-120%", "420%"] }}
          transition={{ duration: 7 + index * 2, repeat: Infinity, ease: "linear", delay: index * 1.4 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030916]" />
    </div>
  );
}

function PodcastReel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reelIndexRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function loadClip(index: number) {
    const nextIndex = (index + HERO_REEL.length) % HERO_REEL.length;
    const nextClip = HERO_REEL[nextIndex];
    reelIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setVisible(false);
    if (transitionRef.current) clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      try {
        playerRef.current?.loadVideoById({
          videoId: nextClip.videoId,
          startSeconds: nextClip.startSeconds,
        });
        playerRef.current?.mute();
        setVisible(true);
      } catch {}
    }, 300);
  }

  useEffect(() => {
    let cancelled = false;
    function createPlayer() {
      if (cancelled || !wrapperRef.current || playerRef.current) return;
      playerRef.current = new (window as any).YT.Player(wrapperRef.current, {
        videoId: HERO_REEL[0].videoId,
        playerVars: { autoplay: 1, mute: 1, controls: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, start: HERO_REEL[0].startSeconds, disablekb: 1, fs: 0 },
        events: {
          onReady: (event: any) => {
            if (cancelled) return;
            event.target.mute();
            event.target.playVideo();
            setVisible(true);
            intervalRef.current = setInterval(() => {
              if (!cancelled) loadClip(reelIndexRef.current + 1);
            }, REEL_CLIP_DURATION * 1000);
          },
          onStateChange: (event: any) => {
            if (cancelled) return;
            const YT = (window as any).YT;
            if (YT && (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED)) {
              try { event.target.playVideo(); } catch {}
            }
          },
        },
      });
    }
    const yt = (window as any).YT;
    if (yt && yt.Player) { createPlayer(); }
    else {
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => { if (typeof prev === "function") prev(); createPlayer(); };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(tag);
      }
    }
    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
      if (playerRef.current) { try { playerRef.current.destroy(); } catch {} playerRef.current = null; }
    };
  }, []);

  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="overflow-hidden border border-white/15 bg-[#080808] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">AsembleAI Spotlight</span>
          </div>
          <span className="text-[10px] tabular-nums text-white/45">
            {String(activeIndex + 1).padStart(2, "0")} / {HERO_REEL.length}
          </span>
        </div>

        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={`https://i.ytimg.com/vi/${HERO_REEL[activeIndex].videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1.01)" : "scale(1.04)" }}
          >
            <div ref={wrapperRef} className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
            <p className="text-xs font-semibold text-white">{HERO_REEL[activeIndex].label}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Real podcast moment</p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1.5 bg-black p-2">
          {HERO_REEL.map((clip, index) => (
            <button
              key={clip.videoId}
              type="button"
              onClick={() => loadClip(index)}
              className={`group relative aspect-video overflow-hidden border transition-all ${
                activeIndex === index ? "border-primary opacity-100" : "border-white/10 opacity-55 hover:opacity-100"
              }`}
              aria-label={`Play clip ${index + 1}: ${clip.label}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${clip.videoId}/mqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-0.5 right-1 text-[8px] font-bold text-white drop-shadow">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-right text-[10px] uppercase tracking-[0.18em] text-white/35">
        12 conversations. One growing AI community.
      </p>
    </motion.div>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#030916] md:min-h-[88vh]">
      <TechBackdrop />

      <div className="container mx-auto px-6 relative z-10 py-24 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">

          {/* ── LEFT: Text content ── */}
          <motion.div
            className="max-w-xl space-y-6 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Podcast name */}
            <motion.div
              className="inline-flex items-center gap-2 border-l-2 border-primary pl-3"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                Inside AsembleAI
              </span>
            </motion.div>

            {/* Apple Top 10 badge */}
            <motion.div
              className="inline-flex items-center gap-2 text-white/80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-base leading-none">🏆</span>
              <span className="text-xs font-bold text-white">Top 10</span>
              <span className="w-px h-3 bg-white/30" />
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider">Apple Podcasts · Technology</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl font-bold font-heading tracking-[-0.045em] leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              <RevealWords text="AI, DeepTech &" startDelay={0.15} />
              <motion.span
                className="relative mt-1 block w-fit text-primary"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                Science
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-300 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
              </motion.span>
              <span className="mt-2 block">
                <RevealWords text="conversations that matter." startDelay={0.85} />
              </span>
            </h1>

            {/* Positioning */}
            <motion.div
              className="max-w-lg border-l border-cyan-400/40 pl-4"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 1.4 }}
            >
              <p className="mb-2 text-lg font-semibold text-white">
                <RevealWords text="Where Brands Meet Their Niche" startDelay={1.45} />
              </p>
              <p className="text-sm leading-relaxed text-blue-100/65 md:text-base">
                Podcast + YouTube marketing funnels and omnichannel campaigns that turn niche audiences.
              </p>
            </motion.div>

            {/* Platform links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Listen on</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-all border border-white/10 rounded-full px-3.5 py-2 bg-white/5 backdrop-blur-sm ${p.color}`}
                    data-testid={`link-platform-${p.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span className="text-sm leading-none">{p.icon}</span>
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="/podcast">
                <Button size="lg"
                  className="h-12 rounded-lg bg-primary px-8 text-sm font-semibold hover:bg-primary/90 transition-all"
                  data-testid="button-hero-listen">
                  🎙 Listen Now
                </Button>
              </a>
              <Button size="lg" variant="outline"
                className="h-12 rounded-lg border-white/20 bg-transparent px-8 text-sm font-semibold text-white transition-all hover:bg-white/10"
                onClick={() => scrollToSection("services")}
                data-testid="button-hero-partner">
                Partner With Us
              </Button>
            </div>
          </motion.div>
          <PodcastReel />
        </div>
      </div>
    </section>
  );
}

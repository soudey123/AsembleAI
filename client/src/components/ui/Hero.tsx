import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import appleChartsProof from "@assets/apple-podcasts-chart-proof.jpg";
const ROTATING_WORDS = ["Science", "Robotics", "Biotech", "Quantum", "Space"];
const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", logo: "https://cdn.simpleicons.org/applepodcasts/9933CC", color: "hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/50" },
  { label: "Spotify", href: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU", logo: "https://cdn.simpleicons.org/spotify/1ED760", color: "hover:bg-green-500/20 hover:text-green-300 hover:border-green-400/50" },
  { label: "iHeartRadio", href: "https://www.iheart.com/search/?q=inside+asembleai", logo: "https://cdn.simpleicons.org/iheartradio/ED1C24", color: "hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/50" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", logo: "https://cdn.simpleicons.org/youtube/FF0000", color: "hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/50" },
];

const HERO_REEL = [
  { videoId: "eZtXVs1XIe8", startSeconds: 8, label: "ActualyzeAI" },
  { videoId: "TmrLDj1MpqM", startSeconds: 5, label: "AI4 · On the Ground" },
  { videoId: "hti_8AM_mBg", startSeconds: 10, label: "Atera" },
  { videoId: "rhvY5p1UkLg", startSeconds: 7, label: "DTEX" },
  { videoId: "TmrLDj1MpqM", startSeconds: 22, label: "AI4 · Field Notes" },
  { videoId: "Q0dcB15m8Ns", startSeconds: 9, label: "Mind Children" },
  { videoId: "GOBtXqJMfIU", startSeconds: 12, label: "SingularityNET" },
  { videoId: "TmrLDj1MpqM", startSeconds: 39, label: "AI4 · Conference Voices" },
  { videoId: "BoLde-FY_Bg", startSeconds: 8, label: "Sophos" },
  { videoId: "U2AIQnF5dxc", startSeconds: 10, label: "TrueFoundry" },
  { videoId: "TmrLDj1MpqM", startSeconds: 56, label: "AI4 · Live Insight" },
  { videoId: "BoJuiUX-nB0", startSeconds: 7, label: "Kalk Robotics" },
  { videoId: "FoTjTTFnHlw", startSeconds: 8, label: "Douglas Swatski" },
  { videoId: "TmrLDj1MpqM", startSeconds: 73, label: "AI4 · Industry Pulse" },
  { videoId: "_bCV2xm3TC8", startSeconds: 10, label: "LotusPetal AI" },
  { videoId: "nWCP19vGxIE", startSeconds: 6, label: "Inside AsembleAI" },
  { videoId: "TmrLDj1MpqM", startSeconds: 90, label: "AI4 · Expert Take" },
  { videoId: "gacscV1XtUc", startSeconds: 8, label: "Backblaze" },
  { videoId: "TmrLDj1MpqM", startSeconds: 107, label: "AI4 · From the Floor" },
  { videoId: "TmrLDj1MpqM", startSeconds: 124, label: "AI4 · Next Signal" },
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
        <span
          key={`${word}-${index}`}
          className="hero-word-mask mr-[0.22em]"
          aria-hidden="true"
          style={{ "--hero-word-delay": `${startDelay + index * 0.09}s` } as CSSProperties}
        >
          <span className="hero-word">{word}</span>
        </span>
      ))}
    </span>
  );
}

function TechBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030916]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_82%_42%,rgba(6,182,212,0.14),transparent_28rem)]" />
      <div
        className="hero-tech-grid absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="hero-breathing-glow absolute -right-32 -top-32 h-[42rem] w-[42rem] rounded-full bg-blue-500/15 blur-[110px]" />
      <div className="hero-top-scanline absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,22,0.1),rgba(3,9,22,0.42)_48%,rgba(3,9,22,0.12))]" />
      {[18, 42, 68].map((top, index) => (
        <div
          key={top}
          className="hero-data-line absolute left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{ top: `${top}%`, "--line-duration": `${7 + index * 2}s`, "--line-delay": `${index * 1.4}s` } as CSSProperties}
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
      initial={{ opacity: 0, x: 55, scale: 0.96, clipPath: "inset(0 0 0 100%)" }}
      animate={{ opacity: 1, x: 0, scale: 1, clipPath: "inset(0 0 0 0%)" }}
      transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="grid grid-cols-5 gap-1.5 bg-black p-2">
          {HERO_REEL.map((clip, index) => (
            <button
              key={`${clip.videoId}-${clip.startSeconds}`}
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
        {HERO_REEL.length} stories. One growing AI community.
      </p>
    </motion.div>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setRotatingIndex((current) => (current + 1) % ROTATING_WORDS.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, []);

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
              className="flex flex-wrap items-center gap-3 border-l-2 border-primary pl-3"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                Inside AsembleAI
              </span>
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-purple-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.2)]"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.45 }}
              >
                <img
                  src="https://cdn.simpleicons.org/applepodcasts/9933CC"
                  alt=""
                  className="h-3.5 w-3.5"
                />
                Top 5 Apple Podcast
              </motion.span>
            </motion.div>

            {/* Apple chart proof */}
            <motion.a
              href={appleChartsProof}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-fit max-w-full items-center gap-3 overflow-hidden rounded-xl border border-cyan-300/30 bg-gradient-to-r from-blue-600/20 via-cyan-400/10 to-transparent py-2 pl-2 pr-4 shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.92, x: -12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ["-100px", "430px"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
              />
              <img
                src={appleChartsProof}
                alt="Inside AsembleAI ranked in the Apple Podcasts Technology chart"
                className="h-12 w-12 shrink-0 rounded-lg border border-white/15 object-cover object-center"
              />
              <span className="min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">Apple Podcasts · Technology</span>
                <span className="mt-0.5 flex items-center gap-2 text-sm font-bold text-white">
                  <span className="text-base">🏆</span>
                  Ranked #4 in Technology
                </span>
                <span className="block text-[9px] text-white/45 transition-colors group-hover:text-white/70">View chart proof ↗</span>
              </span>
            </motion.a>

            {/* Headline */}
            <h1 className="text-4xl font-bold font-heading tracking-[-0.045em] leading-[1.01] text-white sm:text-5xl lg:text-6xl">
              <RevealWords text="AI, DeepTech &" startDelay={0.15} />
              <span className="relative mt-1 flex items-center gap-4 text-primary">
                <span className="inline-block min-w-[5.9em] overflow-hidden pb-[0.08em]">
                  <span key={ROTATING_WORDS[rotatingIndex]} className="hero-rotating-word inline-block">
                    {ROTATING_WORDS[rotatingIndex]}
                  </span>
                </span>
                <span className="hero-accent-rule hidden h-[3px] flex-1 bg-gradient-to-r from-blue-500 via-cyan-300 to-transparent sm:block" />
              </span>
              <span className="mt-2 block">
                <RevealWords text="conversations that" startDelay={0.78} />
                <span className="hero-matter-sheen inline-block">matter.</span>
              </span>
            </h1>

            {/* Positioning */}
            <div className="hero-subhead max-w-lg border-l border-cyan-400/40 pl-4">
              <p className="mb-2 text-lg font-semibold text-white">
                Where Brands Meet Their Niche
              </p>
              <p className="text-sm leading-relaxed text-blue-100 md:text-base">
                Podcast + YouTube marketing funnels and omnichannel campaigns that turn niche audiences.
              </p>
            </div>

            {/* Sponsorship signal */}
            <motion.a
              href="mailto:asembleaimedia@asembleai.com?subject=Partnership%20or%20Sponsorship%20Inquiry"
              className="hero-sponsor-signal group flex w-fit max-w-full items-center gap-3 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.07] px-3.5 py-2.5 transition-all duration-200 hover:border-emerald-300/55 hover:bg-emerald-400/[0.12]"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                  Sponsorships Open
                </span>
                <span className="block truncate text-xs font-medium text-white/75 transition-colors group-hover:text-white sm:text-sm">
                  Put your brand inside conversations shaping what’s next
                </span>
              </span>
              <span className="shrink-0 text-emerald-300 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </motion.a>

            {/* Platform links */}
            <div className="hero-listen-row">
              <div className="mb-3 flex items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Listen on</p>
                <span className="hero-equalizer flex h-4 items-end gap-[2px]" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, index) => (
                    <span key={index} style={{ "--bar-delay": `${index * 0.08}s` } as CSSProperties} />
                  ))}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                    className={`hero-platform-pill inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-all border border-white/10 rounded-full px-3.5 py-2 bg-white/5 backdrop-blur-sm ${p.color}`}
                    data-testid={`link-platform-${p.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <img src={p.logo} alt="" className="h-4 w-4 shrink-0" />
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta-row flex flex-col sm:flex-row gap-3 pt-1">
              <a href="/podcast">
                <Button size="lg"
                  className="hero-primary-cta relative h-12 overflow-hidden rounded-lg bg-primary px-8 text-sm font-semibold hover:bg-primary/90 transition-all"
                  data-testid="button-hero-listen">
                  🎙 Listen Now
                </Button>
              </a>
              <a href="mailto:asembleaimedia@asembleai.com?subject=Partnership%20or%20Sponsorship%20Inquiry">
                <Button size="lg" variant="outline"
                  className="h-12 rounded-lg border-white/20 bg-transparent px-8 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  data-testid="button-hero-contact">
                  Sponsor or Partner
                </Button>
              </a>
            </div>
          </motion.div>
          <div className="hero-spotlight-enter relative">
            <motion.span
              className="pointer-events-none absolute -left-8 top-1/2 z-20 hidden h-px w-16 bg-gradient-to-r from-cyan-300 to-transparent lg:block"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            />
            <PodcastReel />
          </div>
        </div>
      </div>
    </section>
  );
}

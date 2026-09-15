import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import mobileBg from "@assets/Screenshot_2026-06-05_at_7.24.12_PM_1780709086500.png";

const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", icon: "🎵", color: "hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30" },
  { label: "Spotify", href: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU", icon: "♫", color: "hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30" },
  { label: "iHeartRadio", href: "https://www.iheart.com/search/?q=inside+asembleai", icon: "♥", color: "hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", icon: "▶", color: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30" },
];

const HERO_REEL = [
  { videoId: "eZtXVs1XIe8", startSeconds: 8 },
  { videoId: "hti_8AM_mBg", startSeconds: 10 },
  { videoId: "rhvY5p1UkLg", startSeconds: 7 },
  { videoId: "Q0dcB15m8Ns", startSeconds: 9 },
  { videoId: "GOBtXqJMfIU", startSeconds: 12 },
  { videoId: "BoLde-FY_Bg", startSeconds: 8 },
  { videoId: "U2AIQnF5dxc", startSeconds: 10 },
  { videoId: "BoJuiUX-nB0", startSeconds: 7 },
];
const REEL_CLIP_DURATION = 4.8;

function BackgroundOrbs() {
  return (
    <>
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black" />
    </>
  );
}

function YouTubeBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reelIndexRef = useRef(0);
  const [visible, setVisible] = useState(false);

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
              setVisible(false);
              transitionRef.current = setTimeout(() => {
                if (cancelled) return;
                reelIndexRef.current = (reelIndexRef.current + 1) % HERO_REEL.length;
                const nextClip = HERO_REEL[reelIndexRef.current];
                try {
                  event.target.loadVideoById({
                    videoId: nextClip.videoId,
                    startSeconds: nextClip.startSeconds,
                  });
                  event.target.mute();
                  setVisible(true);
                } catch {}
              }, 450);
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
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      <img
        src={mobileBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
      />
      <div className="absolute overflow-hidden" style={{ top: "50%", left: "50%", width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw", transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, top: "-80px", bottom: "-80px", opacity: visible ? 1 : 0, transform: visible ? "scale(1.03)" : "scale(1.08)", transition: "opacity 450ms ease, transform 5s ease-out" }}>
          <div ref={wrapperRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <BackgroundOrbs />
    </div>
  );
}

function HeroBackground() {
  return <YouTubeBackground />;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-black md:min-h-[88vh]">
      <HeroBackground />

      <div className="container mx-auto px-6 relative z-10 py-24 md:py-20">
        <div className="mx-auto max-w-6xl">

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
              AI, DeepTech &amp;{" "}
              <span className="text-primary">
                Science
              </span>{" "}
              conversations that matter.
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Hosts Mac &amp; Sam sit down with AI researchers, fast-scaling founders, Fortune 500 executives, and pioneering technologists to reveal how AI is reshaping business strategy and guiding executive decisions.
            </p>

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
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-md md:flex">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">AsembleAI Reel</p>
          <p className="text-[10px] text-white/50">Real conversations · Real AI leaders</p>
        </div>
      </div>
    </section>
  );
}

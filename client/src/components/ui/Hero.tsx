import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import mobileBg from "@assets/Screenshot_2026-06-05_at_7.24.12_PM_1780709086500.png";
import macImg from "@assets/image_1780840351121.png";
import samImg from "@assets/Sam_Dey_1780840351121.jpg";

const PLATFORMS = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/search?term=inside+asembleai", icon: "🎵", color: "hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30" },
  { label: "Spotify", href: "https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU", icon: "♫", color: "hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30" },
  { label: "iHeartRadio", href: "https://www.iheart.com/search/?q=inside+asembleai", icon: "♥", color: "hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30" },
  { label: "YouTube", href: "https://www.youtube.com/@asembleaiyt", icon: "▶", color: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30" },
];

const VIDEO_ID = "nWCP19vGxIE";
const LOOP_END = 5;

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
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black" />
    </>
  );
}

function MobileBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      <img src={mobileBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#060b18]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/40 via-transparent to-[#060b18]" />
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)", top: "-10vw", left: "-20vw", filter: "blur(60px)" }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
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
        playerVars: { autoplay: 1, mute: 1, controls: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, start: 0, disablekb: 1, fs: 0 },
        events: {
          onReady: (event: any) => {
            if (cancelled) return;
            event.target.mute();
            event.target.playVideo();
            setVisible(true);
            intervalRef.current = setInterval(() => {
              try { const t = event.target.getCurrentTime(); if (t >= LOOP_END) { event.target.seekTo(0, true); event.target.playVideo(); } } catch {}
            }, 100);
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
      if (playerRef.current) { try { playerRef.current.destroy(); } catch {} playerRef.current = null; }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b18]">
      <div className="absolute overflow-hidden" style={{ top: "50%", left: "50%", width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw", transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, top: "-80px", bottom: "-80px", opacity: visible ? 1 : 0, transition: "opacity 1.2s ease" }}>
          <div ref={wrapperRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <BackgroundOrbs />
    </div>
  );
}

function HeroBackground() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(isMobileDevice()); }, []);
  return mobile ? <MobileBackground /> : <YouTubeBackground />;
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
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">

          {/* ── LEFT: Text content ── */}
          <motion.div
            className="space-y-6 text-left order-1"
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

            {/* Mobile-only headshots — shown between badge and headline */}
            <div className="flex md:hidden gap-3 pt-1 pb-2">
              <div className="relative flex-1 rounded-2xl overflow-hidden max-w-[160px]">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                  <img src={macImg} alt="Mac Goswami" className="w-full h-full object-cover object-top scale-110" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060b18]/90 via-[#060b18]/50 to-transparent px-3 pt-6 pb-3 rounded-b-2xl">
                  <p className="text-white font-bold text-xs">Mac Goswami</p>
                  <p className="text-muted-foreground text-[10px]">Co-Host &amp; Co-Founder</p>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-0.5 rounded-full">Host</span>
                </div>
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden max-w-[160px]">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                  <img src={samImg} alt="Sam Dey" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060b18]/90 via-[#060b18]/50 to-transparent px-3 pt-6 pb-3 rounded-b-2xl">
                  <p className="text-white font-bold text-xs">Sam Dey</p>
                  <p className="text-muted-foreground text-[10px]">Co-Host &amp; Co-Founder</p>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 px-1.5 py-0.5 rounded-full">Host</span>
                </div>
              </div>
            </div>

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

          {/* ── RIGHT: Host photos ── */}
          <motion.div
            className="relative hidden md:flex items-end justify-center gap-4 order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Mac — slightly lower */}
            <motion.div
              className="relative flex-1 max-w-[210px] rounded-2xl overflow-hidden"
              style={{ marginTop: "48px" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-[3/4] bg-gradient-to-b from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10">
                <img src={macImg} alt="Mac Goswami" className="w-full h-full object-cover object-top scale-110" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060b18]/90 via-[#060b18]/50 to-transparent px-4 pt-8 pb-4 rounded-b-2xl">
                <p className="text-white font-bold text-sm">Mac Goswami</p>
                <p className="text-muted-foreground text-xs">Co-Host &amp; Co-Founder</p>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">Host</span>
              </div>
            </motion.div>

            {/* Sam — slightly higher */}
            <motion.div
              className="relative flex-1 max-w-[210px] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img src={samImg} alt="Sam Dey" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060b18]/90 via-[#060b18]/50 to-transparent px-4 pt-8 pb-4 rounded-b-2xl">
                <p className="text-white font-bold text-sm">Sam Dey</p>
                <p className="text-muted-foreground text-xs">Co-Host &amp; Co-Founder</p>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded-full">Host</span>
              </div>
            </motion.div>

            {/* Decorative glow behind photos */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
              <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

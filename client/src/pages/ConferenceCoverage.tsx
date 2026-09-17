import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, Play, Youtube } from "lucide-react";

type ConferenceVideo = {
  slug?: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
};

export default function ConferenceCoverage() {
  const { data } = useQuery<{ videos: ConferenceVideo[] }>({
    queryKey: ["/api/podcast/videos"],
    staleTime: 5 * 60 * 1000,
  });

  const matchingVideos = (data?.videos ?? [])
    .filter((video) => /\bai4\b|conference|summit|expo/i.test(video.title))
    .slice(0, 4);
  const videos = matchingVideos.length
    ? matchingVideos
    : (data?.videos ?? []).slice(0, 4);

  return (
    <Layout>
      <div className="pt-20">
        <Section className="home-conference-coverage min-h-screen">
          <div className="conference-grid-bg" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  From the conference floor
                </div>
                <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                  Where emerging ideas become{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                    real conversations.
                  </span>
                </h1>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/55 md:text-right">
                On-site interviews, fast-turnaround social content and firsthand reporting from the events shaping AI and enterprise technology.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
              <motion.article
                className="conference-lead-card group relative overflow-hidden rounded-3xl border border-white/10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <video
                  className="aspect-[9/13] h-full max-h-[650px] w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/media/brainstorm-denver-poster.jpg"
                  aria-label="Brainstorm conference coverage from Denver"
                >
                  <source src="/media/brainstorm-denver.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-cyan-300" />
                    Denver
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white">Brainstorm Conference</h2>
                  <p className="mt-1 text-sm text-white/65">A recent dispatch from the floor</p>
                </div>
              </motion.article>

              <div className="grid gap-5">
                {videos.map((video, index) => (
                  <motion.a
                    key={video.youtubeUrl ?? video.slug ?? index}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="conference-video-card group relative min-h-[245px] overflow-hidden rounded-3xl border border-white/10 bg-[#07101f]"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
                    <div className="absolute inset-0 flex max-w-[72%] flex-col justify-end p-6 md:p-8">
                      <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-red-200 backdrop-blur-md">
                        <Youtube className="h-3.5 w-3.5" />
                        AI4 Coverage
                      </span>
                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-white md:text-2xl">{video.title}</h2>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-300">
                        Watch from the floor
                        <Play className="ml-2 h-4 w-4 fill-current transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
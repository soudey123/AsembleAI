import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { MapPin, Youtube } from "lucide-react";

export default function ConferenceCoverage() {
  return (
    <Layout>
      <div className="pt-20">
        <Section className="home-conference-coverage min-h-screen">
          <div className="conference-grid-bg" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <header className="mb-16 max-w-3xl">
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
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
                Firsthand reporting and conversations from the events shaping AI and enterprise technology.
              </p>
            </header>

            <div className="space-y-20">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid items-start gap-8 lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-red-200">
                    <Youtube className="h-3.5 w-3.5" />
                    AI4 Coverage
                  </span>
                  <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">AI4 Conference</h2>
                  <p className="mt-4 text-base leading-relaxed text-white/60">
                    AI4 brings together leaders from enterprise, government, startups and research to examine how artificial intelligence is being built and deployed. AsembleAI captures direct conversations with the people turning emerging technology into practical systems and business outcomes.
                  </p>
                </div>
                <div className="conference-video-card aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/TmrLDj1MpqM"
                    title="AsembleAI coverage from the AI4 Conference"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="grid items-start gap-8 border-t border-white/10 pt-20 lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-cyan-200">
                    <MapPin className="h-3.5 w-3.5" />
                    Denver
                  </span>
                  <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">Brainstorm Conference</h2>
                  <p className="mt-4 text-base leading-relaxed text-white/60">
                    Brainstorm convenes business leaders, innovators and technology experts to discuss the forces changing industries and organizations. This dispatch from Denver offers an on-the-ground look at the conversations, ideas and people shaping what comes next.
                  </p>
                </div>
                <div className="conference-lead-card overflow-hidden rounded-3xl border border-white/10">
                  <video
                    className="mx-auto max-h-[720px] w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/media/brainstorm-denver-poster.jpg"
                    aria-label="Brainstorm conference coverage from Denver"
                  >
                    <source src="/media/brainstorm-denver.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.article>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
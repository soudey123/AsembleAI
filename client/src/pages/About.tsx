import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Globe, Users, Zap, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import samDeyPhoto from "@assets/Sam_Dey_1780840351121.jpg";
import macGoswamiPhoto from "@assets/image_1780840351121.png";

export default function About() {
  const values = [
    {
      icon: Mic,
      title: "Content First",
      description: "We believe deep, substantive conversations move the industry forward more than surface-level takes."
    },
    {
      icon: Globe,
      title: "At the Frontier",
      description: "We cover AI, DeepTech and Science where it's actually happening — in labs, companies, and communities shaping tomorrow."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our audience isn't passive — they're builders, founders, researchers and executives who shape what comes next."
    },
    {
      icon: Zap,
      title: "Independent Voice",
      description: "We speak plainly and follow the signal, not the hype. Trusted because we earn it, episode by episode."
    }
  ];

  const founders = [
    {
      name: "Mac Goswami",
      role: "Co-Host & Co-Founder",
      bio: "Digital Transformation Leader, IT Consultant, and Financial Services & Payment Technology Consultant, Portfolio Management with 15+ years of enterprise experience across fintech, AI, data, cloud, and platform modernization. Co-founder of AsembleAI media platform, Podcast co-host, Tech Advisor to AI Community, Top 1% Creator on Topmate, speaker, tech writer, startup mentor & advisor at Founder Institute, and featured in NYC Times Square billboard. Graduate of the MIT Sloan AI Executive Program.",
      linkedin: "https://www.linkedin.com/in/macgos/",
      image: macGoswamiPhoto
    },
    {
      name: "Sam Dey",
      role: "Co-Host & Co-Founder",
      bio: "Data Analytics and AI leader with 15+ years of Fortune 500 experience in healthcare, digital marketing, and financial services. University of Illinois Urbana-Champaign alumnus and researcher; founder of DataScienceWithSam digital content platform and co-founder of AsembleAI media platform; former Coursera instructor and coach; Denver AI Co-Chair; Sayge Executive Coaching graduate; Brandeis Applied Data Science advisor; featured in Voyage Denver and Business Life Magazine; speaker on agentic and enterprise AI strategy.",
      linkedin: "https://www.linkedin.com/in/sam-dey-441294ab/",
      image: samDeyPhoto
    }
  ];

  return (
    <Layout>
      <div className="about-page pt-20">
        <Section
          className="about-hero pb-16"
          bg={
            <div className="about-hero-bg" aria-hidden="true">
              <div className="about-hero-ring about-hero-ring-one" />
              <div className="about-hero-ring about-hero-ring-two" />
              <div className="about-hero-line" />
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-5xl"
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">About AsembleAI</p>
            <h1 className="mb-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl" data-testid="text-about-title">
              Media for the people building what’s next.
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-blue-100/75 md:text-2xl">
              AsembleAI is a <span className="font-medium text-cyan-300">media, technology and innovation platform</span> connecting the decision-makers, builders and researchers shaping AI, DeepTech and Science.
            </p>
          </motion.div>
        </Section>

        <Section className="about-story border-y border-white/10 py-20 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Story</p>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                From a podcast to a multi-channel media platform.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-white/65">
              <p>
                Founded in 2025 by Mac Goswami and Sam Dey, AsembleAI began as a podcast exploring the real-world frontier of artificial intelligence—and grew into something much larger.
              </p>
              <p>
                We built a multi-channel platform across Apple Podcasts, Spotify, YouTube and our RSS feed. Our audience is made up of technical decision-makers, engineers, founders, CTOs and architects who turn emerging ideas into real products.
              </p>
              <p>
                We partner with organizations that want to reach this audience authentically through host-read integrations, co-branded content, sponsored research and executive events.
              </p>
              <div className="about-story-callout">
                Trusted media reaches focused audiences in ways generic channels cannot.
              </div>
            </div>
          </div>
        </Section>

        <Section className="about-hosts py-20 md:py-28">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Meet the Founders</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">The voices behind AsembleAI</h2>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.12 }}
              >
                <Card className="about-founder-card h-full border-white/10" data-testid={`card-founder-${index}`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-5">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-primary/30 to-purple-500/30 shadow-[0_12px_38px_rgba(37,99,235,0.22)]">
                        <img
                          src={founder.image}
                          alt={`${founder.name}, ${founder.role} at AsembleAI`}
                          className="h-full w-full object-cover object-top"
                        />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-cyan-300">{founder.role}</p>
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-primary"
                          aria-label={`${founder.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-white/60">{founder.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section className="about-values border-t border-white/10 py-20 md:py-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Principles</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="about-value-card border-white/10" data-testid={`card-value-${index}`}>
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

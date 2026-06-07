import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Globe, Users, Zap, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

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
      image: null
    },
    {
      name: "Soumava 'Sam' Dey",
      role: "Co-Host & Co-Founder",
      bio: "Data Analytics and AI leader with 15+ years of Fortune 500 experience across healthcare, digital marketing, and financial services. A University of Illinois Urbana-Champaign (Public Ivy) alumnus and published researcher, Soumava extends his influence across education, media, and community - as creator of DataScienceWithSam, co-host of the Inside AssembleAI podcast (featured in Apple's Top 100 Tech Podcasts in 2026), former Coursera instructor and AI coach, and Co-Chair of Denver AI. Featured in Voyage Denver and Business Life Magazine, he advises at OncoNexus AI and speaks on agentic AI and enterprise AI strategy.",
      linkedin: "https://www.linkedin.com/in/soumava-dey-441294ab/",
      image: null
    }
  ];

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-bold tracking-widest uppercase text-primary mb-4">About AsembleAI</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-about-title">
              Media, Tech<br />& Innovation.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              AsembleAI is a <span className="text-primary">media platform</span> at the intersection of AI, DeepTech and Science — reaching the decision-makers, builders, and innovators shaping what comes next.
            </p>
          </motion.div>
        </Section>

        <Section className="bg-secondary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Founded in 2025 by Mac Goswami and Sam Dey, AsembleAI began as a podcast exploring the real-world frontier of artificial intelligence — and grew into something much larger.
                </p>
                <p>
                  In 18 months, we built a multi-channel media platform reaching 300K+ listeners across Apple Podcasts, Spotify, YouTube and Podbean. Our audience isn't just curious — they're technical decision-makers, engineers, founders, CTOs, and architects who make things happen.
                </p>
                <p>
                  We partner with organizations who want to reach this audience authentically: through host-read integrations, co-branded content, sponsored research, and executive events. Trusted media converts where generic channels don't.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Hosts</h2>
              <div className="space-y-6">
                {founders.map((founder, index) => (
                  <motion.div
                    key={founder.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-card/50 border-white/10 hover:border-primary/30 transition-all" data-testid={`card-founder-${index}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold text-white">
                              {founder.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                            <p className="text-primary text-sm font-medium mb-2">{founder.role}</p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {founder.bio}
                            </p>
                            <div className="flex gap-3">
                              <a
                                href={founder.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label={`${founder.name} on LinkedIn`}
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-transparent border-white/10 hover:border-primary/50 transition-colors" data-testid={`card-value-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
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

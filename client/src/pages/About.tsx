import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Users, Zap, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: Brain,
      title: "Intelligence First",
      description: "We believe in the transformative power of applied intelligence to solve humanity's hardest problems."
    },
    {
      icon: Target,
      title: "Impact Driven",
      description: "Technology without utility is vanity. We focus on measurable outcomes and real-world value."
    },
    {
      icon: Users,
      title: "Human Centric",
      description: "AI should augment human capability, not replace it. We design for the human-in-the-loop."
    },
    {
      icon: Zap,
      title: "Velocity",
      description: "The future belongs to the fast. We iterate rapidly to deliver value in weeks, not years."
    }
  ];

  const founders = [
    {
      name: "Mac Goswami",
      role: "Co-Founder",
      bio: "Senior Technical Program Manager in Fintech with 15+ years enterprise experience. Co-host of the AsembleAI podcast, Tech Advisor to Microsoft AI Community, Top 1% Creator on Topmate, and startup mentor at Founder Institute. Graduate of the MIT Sloan AI Executive Program.",
      linkedin: "https://www.linkedin.com/in/macgos/",
      image: null
    },
    {
      name: "Soumava 'Sam' Dey",
      role: "Co-Founder",
      bio: "Data analytics leader with 15+ years in enterprise AI/ML, currently Associate Director at CMI Media Group (WPP). Public Ivy UIUC alumnus and published researcher. Creator of DataScienceWithSam, co-host of AsembleAI podcast, Top 5% Topmate and LinkedIn creator, and Voyage Denver featured entrepreneur.",
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
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-about-title">Our Mission</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We are on a mission to accelerate the transition to the <span className="text-primary">Agentic Era</span>. 
              We believe that by assembling the right intelligence, infrastructure, and strategy, enterprises can unlock unprecedented potential.
            </p>
          </motion.div>
        </Section>

        <Section className="bg-secondary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Founded in 2025 by a technologist and a data scientist, AsembleAI emerged from a simple observation: there was a widening gap between what AI could do in the lab and what it was doing in enterprise settings.
                </p>
                <p>
                  While the world was captivated by chatbots, we saw the real revolution coming in the form of autonomous agents—software that doesn't just talk, but acts. What started as podcast conversations exploring AI's potential evolved into a mission to bridge research and real-world implementation through practical agent development.
                </p>
                <p>
                  Today, we partner with forward-thinking organizations to build agentic workflow systems within their core ecosystems that accelerate technological adoption and drive business growth.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Meet the Founders</h2>
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
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
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

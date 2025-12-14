import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Users, Zap } from "lucide-react";
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

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Mission</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We are on a mission to accelerate the transition to the <span className="text-primary">Agentic Era</span>. 
              We believe that by assembling the right intelligence, infrastructure, and strategy, enterprises can unlock unprecedented potential.
            </p>
          </motion.div>
        </Section>

        <Section className="bg-secondary/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Founded in 2024 by a team of AI researchers and enterprise architects, AsembleAI emerged from a simple observation: there was a widening gap between what AI could do in the lab and what it was doing in the boardroom.
                </p>
                <p>
                  While the world was captivated by chatbots, we saw the real revolution coming in the form of autonomous agents—software that doesn't just talk, but does.
                </p>
                <p>
                  Today, we partner with forward-thinking organizations to build the neural nervous systems of the future enterprise.
                </p>
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-full" />
               <div className="relative z-10 grid grid-cols-2 gap-4">
                 <div className="bg-card border border-white/5 rounded-2xl p-6 h-40 w-full animate-pulse opacity-80"></div>
                 <div className="bg-card border border-white/5 rounded-2xl p-6 h-40 w-full mt-12"></div>
                 <div className="bg-card border border-white/5 rounded-2xl p-6 h-40 w-full -mt-12"></div>
                 <div className="bg-card border border-white/5 rounded-2xl p-6 h-40 w-full"></div>
               </div>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-transparent border-white/10 hover:border-primary/50 transition-colors">
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

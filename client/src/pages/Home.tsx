import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Zap, Brain, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

function AnimatedTitle({ children, gradient = "from-cyan-400 via-blue-500 to-purple-500" }: { children: React.ReactNode; gradient?: string }) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto]`}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

function GlowingBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
      animate={{ 
        boxShadow: [
          "0 0 10px rgba(59,130,246,0.3)",
          "0 0 20px rgba(59,130,246,0.5)",
          "0 0 10px rgba(59,130,246,0.3)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-primary">{text}</span>
    </motion.div>
  );
}

export default function Home() {
  const highlights = [
    { icon: Brain, title: "AI Strategy", desc: "Transform your business with intelligent automation" },
    { icon: Zap, title: "Fast Deployment", desc: "From concept to production in weeks, not months" },
    { icon: Rocket, title: "Scale Ready", desc: "Enterprise-grade solutions built for growth" },
  ];

  return (
    <Layout>
      <Hero />

      {/* Services Section - Streamlined */}
      <Section className="bg-background">
        <div className="text-center mb-16">
          <GlowingBadge icon={Sparkles} text="Our Expertise" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">
            <AnimatedTitle>Strategic AI Integration</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We build intelligent ecosystems that drive measurable business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quick Impact Section - Replacing verbose sections */}
      <Section className="bg-secondary/20 border-y border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <AnimatedTitle gradient="from-orange-400 via-red-500 to-pink-500">AsembleAI</AnimatedTitle>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
              data-testid={`highlight-${index}`}
            >
              <motion.div 
                className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Explore More - Clean Navigation */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <AnimatedTitle gradient="from-green-400 via-emerald-500 to-teal-500">Explore Our World</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg">Discover insights, case studies, and the latest in AI innovation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/podcast">
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-white/10 hover:border-purple-500/50 transition-all" data-testid="link-podcast-home">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🎙️</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Podcast</h3>
                  <p className="text-sm text-muted-foreground mb-4">Conversations with AI pioneers</p>
                  <span className="text-purple-400 text-sm font-medium inline-flex items-center">
                    Listen Now <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/use-cases">
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border-white/10 hover:border-orange-500/50 transition-all" data-testid="link-usecases-home">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">AI Use Cases</h3>
                  <p className="text-sm text-muted-foreground mb-4">Real-world AI applications</p>
                  <span className="text-orange-400 text-sm font-medium inline-flex items-center">
                    Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/newsletter">
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-white/10 hover:border-cyan-500/50 transition-all" data-testid="link-newsletter-home">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">AI insights delivered weekly</p>
                  <span className="text-cyan-400 text-sm font-medium inline-flex items-center">
                    Subscribe <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to <AnimatedTitle gradient="from-yellow-400 via-orange-500 to-red-500">Assemble Your Future</AnimatedTitle>?
          </motion.h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Partner with us to build intelligent systems that define your competitive edge.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all" data-testid="button-start-project">
              Start a Project
            </Button>
          </Link>
        </div>
      </Section>
    </Layout>
  );
}

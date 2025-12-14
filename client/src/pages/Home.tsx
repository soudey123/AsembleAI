import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { services, podcasts, useCases, news } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <Hero />

      {/* Services Section */}
      <Section className="bg-background">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Strategic AI Integration</h2>
            <p className="text-muted-foreground text-lg">
              We don't just implement models; we build intelligent ecosystems that drive measurable business outcomes.
            </p>
          </div>
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
              <Card className="h-full glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group">
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

      {/* Podcast Spotlight */}
      <Section className="bg-secondary/20 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">AsembleAI Podcast</h2>
            <p className="text-muted-foreground">Conversations with the architects of the future.</p>
          </div>
          <Link href="/podcast">
            <Button variant="outline" className="mt-4 md:mt-0 border-white/10 hover:bg-white/5">
              View All Episodes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcasts.slice(0, 3).map((episode, index) => (
            <Card key={index} className="bg-background border-white/5 overflow-hidden hover:border-primary/50 transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="text-xs text-primary font-medium mb-2">{episode.date}</div>
                <CardTitle className="text-lg text-white line-clamp-2 leading-tight">{episode.title}</CardTitle>
                <CardDescription className="text-sm">ft. {episode.guest}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Use Cases Preview */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
           <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Applied Intelligence</h2>
            <p className="text-muted-foreground">Real-world impact across industries.</p>
          </div>
          <Link href="/use-cases">
            <Button variant="outline" className="mt-4 md:mt-0 border-white/10 hover:bg-white/5">
              Explore Case Studies <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.slice(0, 6).map((useCase, index) => (
             <Link key={index} href={`/use-cases/${useCase.slug}`}>
              <Card className="h-full glass-card hover:bg-white/5 cursor-pointer transition-all group">
                <CardHeader>
                  <div className="text-xs font-mono text-primary mb-2 uppercase tracking-wider">{useCase.category}</div>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* News Preview */}
      <Section className="bg-secondary/10 border-t border-white/5">
         <div className="flex flex-col md:flex-row justify-between items-center mb-12">
           <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Intelligence Briefing</h2>
            <p className="text-muted-foreground">Latest updates from the frontier of AI.</p>
          </div>
          <Link href="/news">
            <Button variant="outline" className="mt-4 md:mt-0 border-white/10 hover:bg-white/5">
              Read All News <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 6).map((article, index) => (
             <a key={index} href={article.link} target="_blank" rel="noopener noreferrer">
              <Card className="h-full bg-transparent border-none shadow-none hover:bg-white/5 transition-colors p-4 rounded-xl">
                 <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{article.source}</span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary">{article.title}</h3>
                 <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to Assemble Your Future?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Partner with us to build intelligent systems that define your competitive edge.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90">
              Start a Project
            </Button>
          </Link>
        </div>
      </Section>
    </Layout>
  );
}

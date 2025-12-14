import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_ai_neural_network_background.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="AI Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary-foreground tracking-wide uppercase">New Era of Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight leading-tight text-white drop-shadow-xl">
            Asemble<span className="text-primary">AI</span> — Where Intelligence Becomes Impact.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between AI potential and enterprise reality. Specialized in AI consulting, autonomous agent development, and applied intelligence architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/use-cases">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all">
                Explore AI Solutions
              </Button>
            </Link>
            <Link href="/podcast">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white">
                Listen to Podcast
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Abstract Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-[1] pointer-events-none" />
    </section>
  );
}

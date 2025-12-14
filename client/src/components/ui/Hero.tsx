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
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/50 backdrop-blur-md mb-4 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-500 cursor-default"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(59,130,246,0.2)",
                "0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(34,211,238,0.3)",
                "0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(59,130,246,0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
              New Era of Intelligence
            </span>
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-tight text-white drop-shadow-xl">
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

import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { partnershipTiers, enterprisePackages, audienceStats, audienceDemographics, testimonials, podcasts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

function AnimatedCounter({ value, display }: { value: number; display: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  const formatted = count >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString();
  const hasPlus = display.includes("+");
  const hasMo = display.includes(" mo");

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white font-heading">
      {formatted}{hasPlus ? "+" : ""}{hasMo ? " mo" : ""}
    </div>
  );
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    if (length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % length);
    }, 7000);
    return () => clearInterval(timer);
  }, [length]);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + length) % length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto" data-testid="section-testimonials-carousel">
      <div className="overflow-hidden min-h-[260px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-8">
              "{t.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-purple-500/40 flex items-center justify-center text-white font-bold text-sm border border-white/10">
                {t.name.charAt(0)}
              </div>
              <div>
                <a
                  href={t.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-primary transition-colors inline-flex items-center gap-1"
                  data-testid={`link-testimonial-linkedin-${current}`}
                >
                  {t.name} <ExternalLink className="w-3 h-3" />
                </a>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all" data-testid="button-testimonial-prev">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-white/20"}`}
                data-testid={`button-testimonial-dot-${i}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all" data-testid="button-testimonial-next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const featuredEpisodes = podcasts.filter(p => p.type === "video").slice(0, 3);

  return (
    <Layout>
      <Hero />

      {/* Latest Episodes */}
      <Section className="bg-background" id="episodes">
        <div className="text-center mb-14">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Latest Episodes</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent <AnimatedTitle>Conversations</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep dives with AI pioneers, scientists, and innovators shaping the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featuredEpisodes.map((ep, i) => (
            <motion.div
              key={ep.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-card border-white/5 hover:border-primary/30 transition-all duration-300 group overflow-hidden" data-testid={`card-episode-${i}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                </div>
                <CardContent className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ep.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors">{ep.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">with {ep.guest} · {ep.duration}</p>
                  <div className="flex gap-2">
                    <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-green-500/20 hover:text-green-400 border border-white/10 transition-all text-muted-foreground">
                      Spotify
                    </a>
                    <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 transition-all text-muted-foreground">
                      YouTube
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/podcast">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5" data-testid="button-all-episodes">
              All Episodes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Services / Partner With Us */}
      <Section className="bg-secondary/20 border-y border-white/5" id="services">
        <div className="text-center mb-14">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Partner With Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reach AI Buyers Where They <AnimatedTitle gradient="from-orange-400 via-red-500 to-pink-500">Actually Listen</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generic channels don't convert — niche, trusted media does. Advertise where 300K+ AI decision-makers tune in.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {partnershipTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
              data-testid={`card-tier-${tier.name.toLowerCase()}`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    Most Popular
                  </span>
                </div>
              )}
              <Card className={`h-full transition-all duration-300 ${tier.popular ? "border-primary/60 bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.15)]" : "glass-card border-white/5 hover:border-white/20"}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-muted-foreground text-sm">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://calendly.com/asembleai" target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"}`} data-testid={`button-tier-cta-${tier.name.toLowerCase()}`}>
                      Book Intro Call
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-10 max-w-lg mx-auto">
          All tiers include onboarding call, ad scripting support, monthly reporting, and a 3-month minimum.
        </p>

        {/* Enterprise / Custom */}
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm font-semibold text-white mb-6">Custom & Enterprise</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {enterprisePackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass-card border-white/5 rounded-xl p-4 text-center"
                data-testid={`card-enterprise-${i}`}
              >
                <p className="text-xs text-muted-foreground mb-1 leading-tight">{pkg.name}</p>
                <p className="text-sm font-bold text-primary">{pkg.price}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="mailto:partnerships@asembleai.com">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 mr-4" data-testid="button-partnerships-email">
                partnerships@asembleai.com
              </Button>
            </a>
            <a href="https://calendly.com/asembleai" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90" data-testid="button-book-call">
                Book a 15-min Intro Call
              </Button>
            </a>
          </div>
        </div>
      </Section>

      {/* By the Numbers / Audience */}
      <Section id="audience">
        <div className="text-center mb-14">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-3">The AsembleAI Audience</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <AnimatedTitle gradient="from-green-400 via-emerald-500 to-teal-500">By the Numbers</AnimatedTitle>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built in 18 months — on track for 1M downloads.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {audienceStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass-card border-white/5 rounded-2xl p-6 text-center"
              data-testid={`card-stat-${i}`}
            >
              <AnimatedCounter value={stat.value} display={stat.display} />
              <p className="text-sm font-semibold text-white mt-2 mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Demographics */}
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm font-semibold text-white mb-6 uppercase tracking-widest text-xs">Audience Demographics</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audienceDemographics.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 text-center"
                data-testid={`card-demographic-${i}`}
              >
                <div className="text-3xl font-bold text-white mb-1">{d.stat}</div>
                <div className="text-sm font-semibold text-primary mb-1">{d.label}</div>
                <div className="text-xs text-muted-foreground">{d.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-secondary/20 border-y border-white/5" id="testimonials">
        <div className="text-center mb-14">
          <p className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Guest Voices</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What <AnimatedTitle gradient="from-purple-400 via-pink-500 to-rose-500">Our Guests</AnimatedTitle> Say
          </h2>
        </div>

        <TestimonialsCarousel />
      </Section>

      {/* Newsletter CTA */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Stay at the <AnimatedTitle gradient="from-yellow-400 via-orange-500 to-red-500">Frontier</AnimatedTitle>
          </motion.h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            AI, DeepTech & Science insights — delivered to your inbox. Join thousands of decision-makers who read AsembleAI every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newsletter">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all" data-testid="button-cta-newsletter">
                Subscribe to Newsletter
              </Button>
            </Link>
            <a href="https://calendly.com/asembleai" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/10 text-white hover:bg-white/5" data-testid="button-cta-partner">
                Partner With Us
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

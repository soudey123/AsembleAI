import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Sparkles, Brain, Zap, TrendingUp, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface SubstackArticle {
  title: string;
  date: string;
  summary: string;
  link: string;
  image: string | null;
}

export default function Newsletter() {
  const { data, isLoading, error } = useQuery<{ articles: SubstackArticle[] }>({
    queryKey: ["/api/newsletter/articles"],
    queryFn: async () => {
      const res = await fetch("/api/newsletter/articles");
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const features = [
    {
      icon: Brain,
      title: "AI Insights",
      description: "Deep dives into the latest AI breakthroughs and what they mean for your business."
    },
    {
      icon: Zap,
      title: "Quick Takes",
      description: "Concise summaries of the week's most important AI news and developments."
    },
    {
      icon: TrendingUp,
      title: "Industry Trends",
      description: "Analysis of emerging patterns and predictions for the future of AI."
    },
    {
      icon: Sparkles,
      title: "Exclusive Content",
      description: "Behind-the-scenes looks at our projects and early access to research."
    }
  ];

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-6">
              <Mail className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-page-title">
              AsembleAI Newsletter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Stay ahead of the AI curve. Get curated insights, analysis, and exclusive content delivered to your inbox.
            </p>
            
            <a 
              href="https://substack.com/@asembleai" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="link-substack"
            >
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all text-lg px-8 py-6"
              >
                Subscribe on Substack <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </Section>

        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Read our most recent newsletter posts on AI insights and industry trends.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : error || !data?.articles?.length ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {error ? "Unable to load articles right now." : "No articles available yet."}
              </p>
              <a 
                href="https://substack.com/@asembleai" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10">
                  Visit our Substack <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.articles.map((article, index) => (
                <motion.a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  data-testid={`card-article-${index}`}
                >
                  <Card className="bg-card/50 border-white/5 hover:border-orange-500/30 transition-all h-full overflow-hidden">
                    {article.image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="mt-4 flex items-center text-orange-500 text-sm font-medium">
                        Read more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          )}
        </Section>

        <Section className="bg-secondary/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What You'll Get</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of AI enthusiasts and business leaders who trust our newsletter for actionable insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-white/5 hover:border-orange-500/30 transition-all h-full" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 mb-4">
                      <feature.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-500/10 to-primary/10 rounded-2xl p-10 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to level up your AI knowledge?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join our community of forward-thinking leaders and get exclusive access to AI insights that matter.
              </p>
              <a 
                href="https://substack.com/@asembleai" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  data-testid="button-subscribe-bottom"
                >
                  Subscribe Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { news } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";

export default function News() {
  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Intelligence Briefing</h1>
              <p className="text-xl text-muted-foreground">Curated updates from the bleeding edge of AI research and policy.</p>
            </div>
            <div className="hidden md:block">
              <Button variant="outline" className="border-white/10 text-muted-foreground gap-2">
                <RefreshCw className="w-4 h-4" /> Last updated: Today
              </Button>
            </div>
          </div>
        </Section>

        <Section className="pt-0 bg-secondary/5">
          <div className="space-y-4">
            {news.map((article, index) => (
              <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="bg-card border-white/5 hover:border-primary/50 transition-all hover:bg-white/5 group">
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{article.source}</span>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                         <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                          {article.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-muted-foreground">{article.summary}</p>
                    </div>
                    <div className="shrink-0">
                      <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground group-hover:text-white group-hover:bg-white/10">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

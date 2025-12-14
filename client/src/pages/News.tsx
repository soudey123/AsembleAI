import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import newsBg from "@assets/stock_images/newspaper_technology_195b7080.jpg";

interface NewsArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  link: string;
  tag: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  cached: boolean;
  lastUpdated: string;
  stale?: boolean;
}

export default function News() {
  const { data, isLoading, error, refetch, isFetching } = useQuery<NewsResponse>({
    queryKey: ['/api/news'],
    queryFn: async () => {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Failed to fetch news');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const formatLastUpdated = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" data-testid="text-page-title">Intelligence Briefing</h1>
              <p className="text-xl text-muted-foreground">Curated updates from the bleeding edge of AI research and industry.</p>
            </div>
            <div className="flex items-center gap-3">
              {data?.lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Updated: {formatLastUpdated(data.lastUpdated)}
                  {data.cached && !data.stale && " (cached)"}
                  {data.stale && " (stale)"}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/10 text-muted-foreground gap-2"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} /> 
                {isFetching ? 'Updating...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </Section>

        <Section className="pt-0 bg-secondary/5">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading latest news...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
              <p className="text-red-400 mb-4">Failed to load news articles</p>
              <Button onClick={() => refetch()} variant="outline" className="border-white/10">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.articles.map((article, index) => (
                <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="block" data-testid={`link-article-${index}`}>
                  <Card className="bg-card border-white/5 hover:border-primary/50 transition-all hover:bg-white/5 group">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{article.source}</span>
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                            {article.tag}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{article.summary}</p>
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
              {data?.articles.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No news articles available at the moment.
                </div>
              )}
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
}

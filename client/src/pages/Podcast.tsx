import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { podcasts } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Search, Mic } from "lucide-react";
import { useState } from "react";

export default function Podcast() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPodcasts = podcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mic className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">AsembleAI Podcast</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Decoding the minds building the next generation of intelligence.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search episodes..." 
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Section>

        <Section className="bg-secondary/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPodcasts.map((episode, index) => (
              <Card key={index} className="bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-all group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Button size="icon" className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90">
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-primary font-medium">{episode.date}</span>
                    <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">{episode.tags[0]}</span>
                  </div>
                  <CardTitle className="text-xl text-white leading-tight">{episode.title}</CardTitle>
                  <CardDescription className="text-sm">ft. {episode.guest}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {episode.description}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5">Spotify</Button>
                    <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5">Apple</Button>
                    <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5">YouTube</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Search, Mic, Youtube, Headphones, Clock, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface PodcastEpisode {
  slug: string;
  title: string;
  guest: string;
  date: string;
  description: string;
  thumbnail: string;
  spotifyUrl: string;
  youtubeUrl: string;
  tags: string[];
  type: "audio" | "video";
  duration: string;
}

interface YouTubeVideo {
  slug: string;
  title: string;
  guest: string;
  date: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  tags: string[];
  type: "video";
  duration: string;
}

export default function Podcast() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: audioData, isLoading: audioLoading, error: audioError } = useQuery<{ episodes: PodcastEpisode[], feedTitle?: string, feedImage?: string }>({
    queryKey: ['/api/podcast/audio'],
    queryFn: async () => {
      const res = await fetch('/api/podcast/audio');
      if (!res.ok) throw new Error('Failed to fetch audio episodes');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: videoData, isLoading: videoLoading, error: videoError } = useQuery<{ videos: YouTubeVideo[] }>({
    queryKey: ['/api/podcast/videos'],
    queryFn: async () => {
      const res = await fetch('/api/podcast/videos');
      if (!res.ok) throw new Error('Failed to fetch video episodes');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const audioEpisodes = (audioData?.episodes || []).filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const videoEpisodes = (videoData?.videos || []).filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mic className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-page-title">AsembleAI Podcast</h1>
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
              data-testid="input-search"
            />
          </div>
        </Section>

        {/* Video Section */}
        <Section className="bg-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <Youtube className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Video Episodes</h2>
            <Badge variant="outline" className="ml-2 border-red-500/20 text-red-500">YouTube</Badge>
          </div>
          
          {videoLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              <span className="ml-3 text-muted-foreground">Loading videos...</span>
            </div>
          ) : videoError ? (
            <div className="text-center py-10 text-red-400">
              Failed to load videos. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoEpisodes.map((episode, index) => (
                <Card key={episode.slug || index} className="bg-card border-white/5 overflow-hidden hover:border-red-500/30 transition-all group" data-testid={`card-video-${index}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {episode.duration}
                    </div>
                    <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Button size="icon" className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white border-none">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </Button>
                    </a>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-primary font-medium">{episode.date}</span>
                      <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">{episode.tags[0]}</span>
                    </div>
                    <CardTitle className="text-xl text-white leading-tight line-clamp-2">{episode.title}</CardTitle>
                    <CardDescription className="text-sm">ft. {episode.guest}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {episode.description}
                    </p>
                    <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5 group-hover:border-red-500/20" data-testid={`button-watch-${index}`}>
                        <Youtube className="w-4 h-4 mr-2 text-red-500" /> Watch on YouTube
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
              {videoEpisodes.length === 0 && !videoLoading && (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No video episodes found matching your search.
                </div>
              )}
            </div>
          )}
        </Section>

        {/* Audio Section */}
        <Section>
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold text-white">Audio Episodes</h2>
            <Badge variant="outline" className="ml-2 border-green-500/20 text-green-500">Podcast</Badge>
          </div>

          {audioLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              <span className="ml-3 text-muted-foreground">Loading episodes...</span>
            </div>
          ) : audioError ? (
            <div className="text-center py-10 text-red-400">
              Failed to load audio episodes. Please try again later.
            </div>
          ) : (
            <div className="space-y-4">
              {audioEpisodes.map((episode, index) => (
                <Card key={episode.slug || index} className="bg-card/50 border-white/5 hover:border-green-500/30 transition-all group overflow-hidden" data-testid={`card-audio-${index}`}>
                  <div className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
                    <div className="relative shrink-0 w-full md:w-32 h-32 rounded-lg overflow-hidden">
                      {episode.thumbnail ? (
                        <img 
                          src={episode.thumbnail} 
                          alt={episode.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                          <Mic className="w-10 h-10 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                          <Play className="w-4 h-4 text-black ml-1 fill-current" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                        <span className="text-xs font-mono text-green-500 uppercase tracking-wider">Audio Only</span>
                        <span className="hidden md:inline text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1">
                          <Calendar className="w-3 h-3" /> {episode.date}
                        </span>
                        <span className="hidden md:inline text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1">
                          <Clock className="w-3 h-3" /> {episode.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{episode.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                        {episode.description} <span className="text-primary/70">ft. {episode.guest}</span>
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {episode.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-black font-medium" data-testid={`button-listen-${index}`}>
                          <ExternalLink className="w-4 h-4 mr-2" /> Listen Now
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
              {audioEpisodes.length === 0 && !audioLoading && (
                <div className="text-center py-10 text-muted-foreground">
                  No audio episodes found matching your search.
                </div>
              )}
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
}

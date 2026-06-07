import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Search, Mic, Youtube, Headphones, Clock, Calendar, ExternalLink, Loader2, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useLocation } from "wouter";
import { PODCAST_TOPICS, ACCENT_COLORS, matchesTopic } from "@/lib/topics";

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

const YT_CHANNEL = "https://www.youtube.com/@asembleaiyt";

// Extract the episode number from a title like "EP 22: ..." or "EP# 44EP 44: ..."
function extractEpNumber(title: string): string | null {
  const m = title.match(/\bEP\s*#?\s*(\d+)\b/i);
  return m ? m[1] : null;
}

// Find the specific YouTube watch URL for an audio episode by matching episode number,
// then falling back to keyword overlap, then the channel homepage.
function findYouTubeUrl(audioTitle: string, allVideos: YouTubeVideo[]): string {
  const epNum = extractEpNumber(audioTitle);
  if (epNum) {
    const byEp = allVideos.find(v => {
      const vNum = extractEpNumber(v.title);
      return vNum === epNum;
    });
    if (byEp) return byEp.youtubeUrl;
  }
  // Keyword fallback: check if any significant words from the audio title appear in a video title
  const words = audioTitle.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(" ").filter(w => w.length > 4);
  const byKeyword = allVideos.find(v => {
    const vl = v.title.toLowerCase();
    return words.filter(w => vl.includes(w)).length >= 3;
  });
  if (byKeyword) return byKeyword.youtubeUrl;
  return YT_CHANNEL;
}

export default function Podcast() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();
  const search = useSearch();

  const params = new URLSearchParams(search);
  const topicId = params.get("topic") || "";
  const activeTopic = PODCAST_TOPICS.find(t => t.id === topicId) || null;

  const { data: audioData, isLoading: audioLoading, error: audioError } = useQuery<{ episodes: PodcastEpisode[] }>({
    queryKey: ["/api/podcast/audio"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: videoData, isLoading: videoLoading } = useQuery<{ videos: YouTubeVideo[] }>({
    queryKey: ["/api/podcast/videos"],
    staleTime: 5 * 60 * 1000,
  });

  function matchesCurrent(title: string, guest: string) {
    const topicOk = topicId ? matchesTopic(title, topicId) : true;
    if (!searchTerm) return topicOk;
    const q = searchTerm.toLowerCase();
    return topicOk && (title.toLowerCase().includes(q) || guest.toLowerCase().includes(q));
  }

  const allAudio = audioData?.episodes || [];
  const allVideos = videoData?.videos || [];

  const audioEpisodes = allAudio.filter(ep => matchesCurrent(ep.title, ep.guest));

  // Dedicated YouTube videos that match
  const dedicatedVideos = allVideos.filter(v => matchesCurrent(v.title, v.guest));

  // Audio episodes also shown in the video section (since all episodes are on YouTube too).
  // Build a set of slugs that are already covered by a dedicated YouTube video to avoid duplication.
  const dedicatedSlugs = new Set(dedicatedVideos.map(v => v.slug));
  // When topic is active, also cross-check by partial title overlap
  const dedicatedTitlesLower = dedicatedVideos.map(v => v.title.toLowerCase());
  function isAlreadyCoveredByDedicated(audioTitle: string) {
    const lower = audioTitle.toLowerCase();
    return dedicatedTitlesLower.some(dt => dt.includes(lower.slice(0, 20)) || lower.includes(dt.slice(0, 20)));
  }

  // Audio-as-video: when topic filtered, complement the video section with matching audio episodes
  const audioAsVideo = topicId
    ? audioEpisodes.filter(ep => !isAlreadyCoveredByDedicated(ep.title))
    : [];

  // Total items shown in the video section
  const videoSectionItems = [
    ...dedicatedVideos.map(v => ({ ...v, isDedicated: true as const })),
    ...audioAsVideo.map(ep => ({ ...ep, isDedicated: false as const, youtubeUrl: findYouTubeUrl(ep.title, allVideos) })),
  ];

  function clearTopic() {
    setLocation("/podcast");
  }

  const activeColors = activeTopic ? ACCENT_COLORS[activeTopic.accent] : null;
  const ActiveIcon = activeTopic?.icon;

  return (
    <Layout>
      <div className="pt-20">
        {/* ── HEADER ── */}
        <Section className="pb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mic className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-page-title">
            AsembleAI Podcast
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Decoding the minds building the next generation of intelligence.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search episodes..."
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search"
            />
          </div>

          {/* Active filter pill */}
          {activeTopic && activeColors && ActiveIcon && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${activeColors.border} bg-gradient-to-r ${activeColors.bg} mb-4`}
              data-testid="badge-active-topic">
              <ActiveIcon className={`w-4 h-4 ${activeColors.icon}`} />
              <span className="text-sm font-semibold text-white">Filtered by: {activeTopic.name}</span>
              <button onClick={clearTopic}
                className="ml-1 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                data-testid="button-clear-topic">
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          )}

          {/* Topic chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {PODCAST_TOPICS.map(t => {
              const c = ACCENT_COLORS[t.accent];
              const Icon = t.icon;
              const isActive = topicId === t.id;
              return (
                <button key={t.id}
                  onClick={() => setLocation(isActive ? "/podcast" : `/podcast?topic=${t.id}`)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                    ${isActive
                      ? `${c.pill} border-transparent shadow-md`
                      : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white"
                    }`}
                  data-testid={`chip-topic-${t.id}`}>
                  <Icon className={`w-3 h-3 ${isActive ? "text-white" : c.icon}`} />
                  {t.name}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ── AUDIO EPISODES (first) ── */}
        <Section>
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="w-6 h-6 text-green-500" />
            <h2 className="text-3xl font-bold text-white">Audio Episodes</h2>
            <Badge variant="outline" className="ml-2 border-green-500/20 text-green-500">Podcast</Badge>
            {activeTopic && (
              <span className="text-sm text-muted-foreground ml-1">— {audioEpisodes.length} matching</span>
            )}
          </div>

          {audioLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              <span className="ml-3 text-muted-foreground">Loading episodes...</span>
            </div>
          ) : audioError ? (
            <div className="text-center py-10 text-red-400">Failed to load audio episodes. Please try again later.</div>
          ) : audioEpisodes.length === 0 ? (
            <div className="text-center py-14 text-muted-foreground">
              <Headphones className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No audio episodes found.</p>
              {activeTopic && <p className="text-sm mt-1">Try another category or <button onClick={clearTopic} className="text-primary underline">view all</button>.</p>}
            </div>
          ) : (
            <div className="space-y-4">
              {audioEpisodes.map((episode, index) => (
                <Card key={episode.slug || index} className="bg-card/50 border-white/5 hover:border-green-500/30 transition-all group overflow-hidden" data-testid={`card-audio-${index}`}>
                  <div className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
                    <div className="relative shrink-0 w-full md:w-32 h-32 rounded-lg overflow-hidden">
                      {episode.thumbnail ? (
                        <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
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
                        <span className="text-xs font-mono text-green-500 uppercase tracking-wider">Audio</span>
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
                        {episode.description}{episode.guest ? <span className="text-primary/70"> ft. {episode.guest}</span> : null}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {episode.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 w-full md:w-auto flex flex-col gap-2">
                      <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-black font-medium" data-testid={`button-listen-${index}`}>
                          <ExternalLink className="w-4 h-4 mr-2" /> Listen Now
                        </Button>
                      </a>
                      <a href={findYouTubeUrl(episode.title, allVideos)} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5 hover:border-red-500/30" data-testid={`button-yt-audio-${index}`}>
                          <Youtube className="w-3.5 h-3.5 mr-1.5 text-red-500" /> Watch on YouTube
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Section>

        {/* ── VIDEO EPISODES (second) ── */}
        <Section className="bg-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <Youtube className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Video Episodes</h2>
            <Badge variant="outline" className="ml-2 border-red-500/20 text-red-500">YouTube</Badge>
            {activeTopic && (
              <span className="text-sm text-muted-foreground ml-1">— {videoSectionItems.length} matching</span>
            )}
          </div>

          {videoLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              <span className="ml-3 text-muted-foreground">Loading videos...</span>
            </div>
          ) : videoSectionItems.length === 0 ? (
            <div className="text-center py-14 text-muted-foreground">
              <Youtube className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No video episodes found.</p>
              {activeTopic
                ? <p className="text-sm mt-1">Try another category or <button onClick={clearTopic} className="text-primary underline">view all</button>.</p>
                : <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline mt-1 block">Browse our YouTube channel</a>
              }
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoSectionItems.map((item, index) => {
                const isDedicated = (item as any).isDedicated !== false;
                return (
                  <Card key={item.slug || index} className={`bg-card border-white/5 overflow-hidden transition-all group ${isDedicated ? "hover:border-red-500/30" : "hover:border-red-400/20"}`}
                    data-testid={`card-video-${index}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {!isDedicated && (
                        <div className="absolute top-2 left-2 bg-black/80 text-xs text-red-400 px-2 py-1 rounded flex items-center gap-1">
                          <Youtube className="w-3 h-3" /> Also on YouTube
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </div>
                      <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <Button size="icon" className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white border-none">
                          <Play className="w-6 h-6 ml-1 fill-current" />
                        </Button>
                      </a>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-primary font-medium">{item.date}</span>
                        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">{item.tags?.[0]}</span>
                      </div>
                      <CardTitle className="text-xl text-white leading-tight line-clamp-2">{item.title}</CardTitle>
                      {item.guest && <CardDescription className="text-sm">ft. {item.guest}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{item.description}</p>
                      <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:bg-white/5 group-hover:border-red-500/20"
                          data-testid={`button-watch-${index}`}>
                          <Youtube className="w-4 h-4 mr-2 text-red-500" />
                          {isDedicated ? "Watch on YouTube" : "Find on YouTube"}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
}

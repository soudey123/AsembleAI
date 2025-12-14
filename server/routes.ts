import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Parser from "rss-parser";

const RSS_FEED_URL = "https://media.rss.com/inside-asembleai/feed.xml";
const YOUTUBE_CHANNEL_HANDLE = "@asembleaiyt";

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

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function extractGuestFromTitle(title: string): string {
  const patterns = [
    /(?:with|ft\.?|featuring|feat\.?|w\/)\s+(.+?)(?:\s*[-–—|]|$)/i,
    /[-–—|]\s*(.+?)$/,
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return "AsembleAI Team";
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/podcast/audio", async (req, res) => {
    try {
      const parser = new Parser({
        customFields: {
          item: [
            ['itunes:duration', 'duration'],
            ['itunes:image', 'itunesImage'],
          ]
        }
      });
      
      const feed = await parser.parseURL(RSS_FEED_URL);
      
      const episodes: PodcastEpisode[] = (feed.items || []).slice(0, 6).map((item: any) => {
        let durationStr = "00:00";
        if (item.duration) {
          if (typeof item.duration === 'string' && item.duration.includes(':')) {
            durationStr = item.duration;
          } else {
            const seconds = parseInt(item.duration, 10);
            if (!isNaN(seconds)) {
              durationStr = formatDuration(seconds);
            }
          }
        }
        
        const thumbnail = item.itunesImage?.$ ?.href || 
                         item['itunes:image']?.$ ?.href ||
                         feed.image?.url || 
                         feed.itunes?.image ||
                         '';
        
        return {
          slug: createSlug(item.title || ''),
          title: item.title || 'Untitled Episode',
          guest: extractGuestFromTitle(item.title || ''),
          date: formatDate(item.pubDate || new Date().toISOString()),
          description: (item.contentSnippet || item.content || '').slice(0, 200),
          thumbnail,
          spotifyUrl: item.link || '',
          youtubeUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
          tags: ['AI', 'Technology'],
          type: 'audio' as const,
          duration: durationStr
        };
      });
      
      res.json({ episodes, feedTitle: feed.title, feedImage: feed.image?.url || feed.itunes?.image });
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      res.status(500).json({ error: "Failed to fetch podcast episodes" });
    }
  });

  app.get("/api/podcast/videos", async (req, res) => {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "YouTube API key not configured" });
      }
      
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${YOUTUBE_CHANNEL_HANDLE}&type=channel&key=${apiKey}`
      );
      
      if (!channelResponse.ok) {
        throw new Error(`YouTube API error: ${channelResponse.status}`);
      }
      
      const channelData = await channelResponse.json();
      const channelId = channelData.items?.[0]?.id?.channelId;
      
      if (!channelId) {
        return res.status(404).json({ error: "YouTube channel not found" });
      }
      
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=6&type=video&key=${apiKey}`
      );
      
      if (!videosResponse.ok) {
        throw new Error(`YouTube API error: ${videosResponse.status}`);
      }
      
      const videosData = await videosResponse.json();
      
      const videoIds = videosData.items?.map((item: any) => item.id.videoId).join(',');
      let durationsMap: Record<string, string> = {};
      
      if (videoIds) {
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`
        );
        
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          detailsData.items?.forEach((item: any) => {
            const duration = item.contentDetails?.duration || 'PT0M0S';
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            if (match) {
              const hours = parseInt(match[1] || '0', 10);
              const minutes = parseInt(match[2] || '0', 10);
              const seconds = parseInt(match[3] || '0', 10);
              durationsMap[item.id] = formatDuration(hours * 3600 + minutes * 60 + seconds);
            }
          });
        }
      }
      
      const videos: YouTubeVideo[] = (videosData.items || []).map((item: any) => ({
        slug: createSlug(item.snippet.title || ''),
        title: item.snippet.title || 'Untitled Video',
        guest: extractGuestFromTitle(item.snippet.title || ''),
        date: formatDate(item.snippet.publishedAt || new Date().toISOString()),
        description: (item.snippet.description || '').slice(0, 200),
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
        youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        tags: ['AI', 'Technology'],
        type: 'video' as const,
        duration: durationsMap[item.id.videoId] || '0:00'
      }));
      
      res.json({ videos });
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      res.status(500).json({ error: "Failed to fetch YouTube videos" });
    }
  });

  return httpServer;
}

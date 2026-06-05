import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Parser from "rss-parser";
import { getUncachableSendGridClient } from "./sendgrid";

const RSS_FEED_URL = "https://media.rss.com/inside-asembleai/feed.xml";
const YOUTUBE_CHANNEL_HANDLE = "@asembleaiyt";

const SUBSTACK_RSS_URL = "https://asembleai.substack.com/feed";

const NEWS_RSS_FEEDS = [
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", source: "TechCrunch", tag: "AI" },
  { url: "https://www.wired.com/feed/category/artificial-intelligence/latest/rss", source: "Wired", tag: "AI" },
  { url: "https://feeds.arstechnica.com/arstechnica/technology-lab", source: "Ars Technica", tag: "Technology" },
  { url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml", source: "The Verge", tag: "AI" },
  { url: "https://venturebeat.com/category/ai/feed/", source: "VentureBeat", tag: "Enterprise AI" },
];

interface NewsArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  link: string;
  tag: string;
}

let newsCache: { articles: NewsArticle[], timestamp: number } | null = null;
const NEWS_CACHE_TTL = 15 * 60 * 1000;

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

  app.get("/api/news", async (req, res) => {
    try {
      if (newsCache && Date.now() - newsCache.timestamp < NEWS_CACHE_TTL) {
        return res.json({ articles: newsCache.articles, cached: true, lastUpdated: new Date(newsCache.timestamp).toISOString() });
      }

      const parser = new Parser({
        timeout: 10000,
        headers: {
          'User-Agent': 'AsembleAI News Aggregator/1.0'
        }
      });

      const feedPromises = NEWS_RSS_FEEDS.map(async (feedConfig) => {
        try {
          const feed = await parser.parseURL(feedConfig.url);
          return (feed.items || []).slice(0, 5).map((item: any) => ({
            title: item.title || 'Untitled',
            source: feedConfig.source,
            date: formatDate(item.pubDate || item.isoDate || new Date().toISOString()),
            summary: (item.contentSnippet || item.content || item.description || '').replace(/<[^>]*>/g, '').slice(0, 200),
            link: item.link || '',
            tag: feedConfig.tag
          }));
        } catch (err) {
          console.error(`Failed to fetch ${feedConfig.source}:`, err);
          return [];
        }
      });

      const results = await Promise.all(feedPromises);
      const allArticles = results.flat();
      
      allArticles.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      const uniqueArticles = allArticles.filter((article, index, self) =>
        index === self.findIndex((a) => a.title === article.title)
      ).slice(0, 20);

      newsCache = { articles: uniqueArticles, timestamp: Date.now() };

      res.json({ articles: uniqueArticles, cached: false, lastUpdated: new Date().toISOString() });
    } catch (error) {
      console.error("Error fetching news:", error);
      
      if (newsCache) {
        return res.json({ articles: newsCache.articles, cached: true, lastUpdated: new Date(newsCache.timestamp).toISOString(), stale: true });
      }
      
      res.status(500).json({ error: "Failed to fetch news articles" });
    }
  });

  app.get("/api/newsletter/articles", async (req, res) => {
    try {
      const parser = new Parser({
        timeout: 10000,
        headers: {
          'User-Agent': 'AsembleAI Newsletter/1.0'
        }
      });

      const feed = await parser.parseURL(SUBSTACK_RSS_URL);
      
      const articles = (feed.items || []).slice(0, 5).map((item: any) => ({
        title: item.title || 'Untitled',
        date: formatDate(item.pubDate || item.isoDate || new Date().toISOString()),
        summary: (item.contentSnippet || item.content || item.description || '').replace(/<[^>]*>/g, '').slice(0, 200),
        link: item.link || '',
        image: item.enclosure?.url || item['media:content']?.$.url || null
      }));

      res.json({ articles, feedTitle: feed.title });
    } catch (error) {
      console.error("Error fetching Substack feed:", error);
      res.status(500).json({ error: "Failed to fetch newsletter articles", articles: [] });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "A valid email address is required" });
    }

    // Step 1: Save subscriber — always succeeds regardless of email delivery
    const { subscriber } = await storage.addSubscriber(email);

    // Step 2: Best-effort welcome email — never blocks the 200 response
    (async () => {
      try {
        const { client, fromEmail } = await getUncachableSendGridClient();

        const year = new Date().getFullYear();

        const welcomeHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#131c2e;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#0f172a 0%,#1e2d4a 100%);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(34,211,238,0.2);">
            <div style="display:inline-block;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.3);border-radius:100px;padding:6px 18px;margin-bottom:20px;">
              <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#22d3ee;">Media · Tech · Innovation</span>
            </div>
            <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;">AsembleAI</h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5);">Hosted by Mac Goswami &amp; Sam Dey</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#ffffff;">You're in! 🎉</h2>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);">
              Thanks for subscribing. Every week you'll get sharp, no-fluff insights on
              <strong style="color:#22d3ee;">AI, DeepTech &amp; Science</strong> — the stories that matter to decision-makers and innovators.
            </p>
            <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);">
              While you wait for your first issue, catch up on our latest episodes:
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td align="center" style="border-radius:100px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);">
                  <a href="https://www.youtube.com/@asembleaiyt" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">🎙 Watch on YouTube →</a>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td align="center">
                  <a href="https://open.spotify.com/show/7m7PI5LmJfPxbQU8jzNbBO" style="display:inline-block;margin:4px 6px;padding:8px 18px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:100px;font-size:13px;color:rgba(255,255,255,0.7);text-decoration:none;">Spotify</a>
                  <a href="https://podcasts.apple.com/search?term=inside+asembleai" style="display:inline-block;margin:4px 6px;padding:8px 18px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:100px;font-size:13px;color:rgba(255,255,255,0.7);text-decoration:none;">Apple Podcasts</a>
                  <a href="https://substack.com/@asembleai" style="display:inline-block;margin:4px 6px;padding:8px 18px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:100px;font-size:13px;color:rgba(255,255,255,0.7);text-decoration:none;">Substack</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">
              You subscribed at asembleai.com · To unsubscribe reply "unsubscribe"<br>
              © ${year} AsembleAI · asembleai@gmail.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        await Promise.all([
          client.send({
            to: email,
            from: { name: "AsembleAI", email: fromEmail },
            subject: "Welcome to AsembleAI — You're in! 🎙",
            text: `Hey,\n\nThanks for subscribing to AsembleAI! You'll get weekly AI, DeepTech & Science insights.\n\nCatch up: https://www.youtube.com/@asembleaiyt\n\n— Mac & Sam`,
            html: welcomeHtml,
          }),
          client.send({
            to: fromEmail,
            from: { name: "AsembleAI Newsletter", email: fromEmail },
            subject: `New subscriber: ${email}`,
            text: `New newsletter subscriber: ${email}\nTime: ${new Date().toISOString()}`,
            html: `<p>New subscriber: <strong>${email}</strong></p><p>${new Date().toLocaleString()}</p>`,
          }),
        ]);

        await storage.markSubscriberEmailSent(subscriber.id);
        console.log(`[newsletter] Welcome email sent to ${email}`);
      } catch (emailErr: any) {
        console.error(`[newsletter] Email delivery failed for ${email}:`, emailErr?.response?.body || emailErr?.message);
      }
    })();

    // Always return success — subscriber is saved even if email fails
    return res.json({ success: true });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const { client, fromEmail } = await getUncachableSendGridClient();

      const msg = {
        to: 'asembleai@gmail.com',
        from: fromEmail,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      };

      await client.send(msg);
      res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  return httpServer;
}

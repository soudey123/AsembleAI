import { Link } from "wouter";
import { Linkedin, Twitter, Mail, Youtube } from "lucide-react";
import logoImage from "@assets/Logo_1_1765679359359.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <img src={logoImage} alt="AsembleAI" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              A Media, Tech &amp; Innovation company at the intersection of AI, DeepTech and Science. Podcast, YouTube, newsletter, and community.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">About</span></Link></li>
              <li><Link href="/podcast"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Podcast</span></Link></li>
              <li><Link href="/newsletter"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Newsletter</span></Link></li>
              <li><a href="/#services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Partner With Us</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Listen</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://podcasts.apple.com/search?term=inside+asembleai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Apple Podcasts
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/show/4BpXMVsNVd7MtbX2dTg7qU" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Spotify
                </a>
              </li>
              <li>
                <a href="https://www.iheart.com/search/?q=inside+asembleai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  iHeartRadio
                </a>
              </li>
              <li>
                <a href="https://asembleaisocial.podbean.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Podbean
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@asembleaiyt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a href="https://x.com/AsembleAI" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground" aria-label="X / Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/asembleai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@asembleaiyt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:asembleai@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Contact:{" "}
              <a href="mailto:asembleai@gmail.com" className="hover:text-primary transition-colors">
                asembleai@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 AsembleAI Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-xs text-muted-foreground hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "wouter";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import logoImage from "@assets/Logo_1_1765679359359.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <img src={logoImage} alt="AsembleAI" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Where Intelligence Becomes Impact. We help enterprises build, deploy, and scale autonomous AI agents.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">About Us</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Services</span></Link></li>
              <li><Link href="/podcast"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Podcast</span></Link></li>
              <li><Link href="/newsletter"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">Newsletter</span></Link></li>
              <li><Link href="/news"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">AI & Tech News</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-muted-foreground text-sm">AI Strategy</span></li>
              <li><span className="text-muted-foreground text-sm">Agent Development</span></li>
              <li><span className="text-muted-foreground text-sm">Data Infrastructure</span></li>
              <li><span className="text-muted-foreground text-sm">Corporate Training</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <a href="/contact" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@asemble.ai
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 AsembleAI Inc. All rights reserved.
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

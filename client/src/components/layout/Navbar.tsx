import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/Logo_1_1765679359359.png";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/podcast", label: "Podcast", sectionId: null },
    { href: "/#audience", label: "Audience", sectionId: "audience" },
    { href: "/#testimonials", label: "Testimonials", sectionId: "testimonials" },
    { href: "/#services", label: "Services", sectionId: "services" },
    { href: "/about", label: "About", sectionId: null },
    { href: "/newsletter", label: "Newsletter", sectionId: null },
    { href: "/conference-coverage", label: "Conference Coverage", sectionId: null },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return location === href;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof links[0]) => {
    if (link.sectionId) {
      // If already on home page, just smooth-scroll; otherwise navigate then scroll
      if (location === "/" || location === "") {
        e.preventDefault();
        window.history.pushState(null, "", `/#${link.sectionId}`);
        scrollToSection(link.sectionId);
      }
      // If on another page, let the normal href navigation happen; the hash will scroll on load
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location === "/" || location === "") {
      e.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-black/85 backdrop-blur-md border-white/10 py-4" : "bg-black/35 backdrop-blur-sm py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" onClick={handleLogoClick}>
          <div className="flex items-center gap-2 cursor-pointer group">
            <img src={logoImage} alt="AsembleAI" className="h-10 w-auto" />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link)}>
              <span
                className={cn(
                  "text-sm font-medium cursor-pointer transition-colors hover:text-white",
                  isActive(link.href) ? "text-white" : "text-muted-foreground"
                )}
              >
                {link.label}
              </span>
            </a>
          ))}
          <a href="/#services" onClick={(e) => { if (location === "/" || location === "") { e.preventDefault(); scrollToSection("services"); } }}>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
            >
              Partnerships &amp; Sponsorships
            </Button>
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95 backdrop-blur-xl border-white/10">
              <div className="flex flex-col gap-8 mt-10">
                {links.map((link) => (
                  <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link)}>
                    <span
                      className={cn(
                        "text-lg font-medium cursor-pointer transition-colors hover:text-white block",
                        isActive(link.href) ? "text-white" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                  </a>
                ))}
                <a href="/#services" onClick={(e) => { if (location === "/" || location === "") { e.preventDefault(); scrollToSection("services"); } }}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Partnerships &amp; Sponsorships</Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

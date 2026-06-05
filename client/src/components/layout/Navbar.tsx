import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/Logo_1_1765679359359.png";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/podcast", label: "Podcast" },
    { href: "/#audience", label: "Audience" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/newsletter", label: "Newsletter" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return location === href;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img src={logoImage} alt="AsembleAI" className="h-10 w-auto" />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
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
          <a href="/#services">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
            >
              Partner With Us
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
                  <a key={link.href} href={link.href}>
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
                <a href="/#services">
                  <Button className="w-full bg-primary hover:bg-primary/90">Partner With Us</Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

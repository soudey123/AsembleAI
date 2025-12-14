import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/podcast", label: "Podcast" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/news", label: "News" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all" />
              <Brain className="w-8 h-8 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-white">
              Asemble<span className="text-primary">AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium cursor-pointer transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all">
              Contact Us
            </Button>
          </Link>
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
                  <Link key={link.href} href={link.href}>
                    <span
                      className={cn(
                        "text-lg font-medium cursor-pointer transition-colors hover:text-primary block",
                        location === link.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button className="w-full bg-primary hover:bg-primary/90">Contact Us</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

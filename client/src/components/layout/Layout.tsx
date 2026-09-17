import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SponsorWidget } from "./SponsorWidget";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-0">
        {children}
      </main>
      <Footer />
      <SponsorWidget />
    </div>
  );
}

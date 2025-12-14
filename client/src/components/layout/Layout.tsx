import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import logoBg from "@assets/generated_images/abstract_blue_geometric_logo_symbol.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white relative">
      {/* Blue Gradient Base */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 58, 138, 0.5) 50%, rgba(15, 23, 42, 1) 100%)',
        }}
      />
      {/* Single Centered Logo */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <img 
          src={logoBg} 
          alt="" 
          className="w-[700px] h-auto opacity-15"
        />
      </div>
      
      <Navbar />
      <main className="flex-grow pt-24 md:pt-0 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

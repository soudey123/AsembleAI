import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: ReactNode;
}

export function Section({ children, className, id, bg }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
      {bg}
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
}

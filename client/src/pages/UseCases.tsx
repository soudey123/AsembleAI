import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { useCases } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function UseCases() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(useCases.map(u => u.category)))];

  const filteredCases = selectedCategory === "All" 
    ? useCases 
    : useCases.filter(u => u.category === selectedCategory);

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Applied Intelligence</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            See how we're solving complex enterprise challenges with custom AI agents and intelligent infrastructure.
          </p>
        </Section>

        <Section className="pt-0">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-primary text-white" : "border-white/10 text-muted-foreground hover:text-white"}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCases.map((useCase, index) => (
              <Link key={index} href={`/use-cases/${useCase.slug}`}>
                <div className="group cursor-pointer">
                  <Card className="h-full bg-card border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-mono text-primary uppercase tracking-wider">{useCase.category}</span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-primary transition-colors">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg mb-6">
                        {useCase.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Problem</div>
                          <div className="text-xs text-white line-clamp-2">{useCase.problem}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Impact</div>
                          <div className="text-xs text-white line-clamp-2">{useCase.impact}</div>
                        </div>
                        <div>
                           <div className="text-xs text-muted-foreground mb-1">Tech</div>
                           <div className="text-xs text-white line-clamp-2">{useCase.tools.join(", ")}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

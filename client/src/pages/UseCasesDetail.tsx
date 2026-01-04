import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { useCases } from "@/lib/data";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Layers, Zap, Github, ExternalLink, Download } from "lucide-react";
import NotFound from "./not-found";
import { Link } from "wouter";

export default function UseCasesDetail() {
  const [, params] = useRoute("/use-cases/:slug");
  const useCase = useCases.find(u => u.slug === params?.slug);

  if (!useCase) return <NotFound />;

  return (
    <Layout>
      <div className="pt-20">
        <Section className="pb-0">
          <Link href="/use-cases">
            <Button variant="ghost" className="mb-8 pl-0 text-muted-foreground hover:text-white">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Use Cases
            </Button>
          </Link>
          
          <div className="mb-4 text-primary font-mono uppercase tracking-wider">{useCase.category}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{useCase.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {useCase.description}
          </p>
        </Section>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-sm font-bold">1</span>
                  </div>
                  The Challenge
                </h3>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-lg text-muted-foreground leading-relaxed">
                  {useCase.problem}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-500 text-sm font-bold">2</span>
                  </div>
                  The Solution
                </h3>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-lg text-muted-foreground leading-relaxed">
                  {useCase.solution}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-500 text-sm font-bold">3</span>
                  </div>
                  The Impact
                </h3>
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 text-lg text-white font-medium leading-relaxed flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  {useCase.impact}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.tools.map(tool => (
                    <span key={tool} className="px-3 py-1 rounded-md bg-white/5 text-sm text-muted-foreground border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Key Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-sm text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {useCase.githubUrl && (
                <div className="bg-card border border-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    {(useCase as any).isN8nWorkflow ? (
                      <span className="w-4 h-4 text-primary font-bold text-xs">n8n</span>
                    ) : (
                      <Github className="w-4 h-4 text-primary" />
                    )}
                    {(useCase as any).isN8nWorkflow ? "n8n Workflow" : "Project Link"}
                  </h4>
                  <a 
                    href={useCase.githubUrl} 
                    download={(useCase as any).isN8nWorkflow ? `${useCase.slug}.json` : undefined}
                    target={(useCase as any).isN8nWorkflow ? undefined : "_blank"}
                    rel={(useCase as any).isN8nWorkflow ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm break-all"
                    data-testid="link-project"
                  >
                    {(useCase as any).isN8nWorkflow ? (
                      <Download className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    )}
                    {(useCase as any).isN8nWorkflow ? "Download Workflow JSON" : "View Project"}
                  </a>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl p-6 border border-white/10 text-center">
                <h4 className="text-white font-bold mb-2">Need similar results?</h4>
                <p className="text-sm text-muted-foreground mb-4">Let's discuss how we can implement this for your organization.</p>
                <Link href="/contact">
                  <Button className="w-full bg-white text-black hover:bg-white/90">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}

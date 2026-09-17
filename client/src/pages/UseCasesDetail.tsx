import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function UseCasesDetail() {
  return (
    <Layout>
      <Section className="pt-32">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Page Moved</h1>
          <p className="text-muted-foreground mb-8">This page has been updated. Explore our podcast or learn about partnership opportunities.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/#services">
              <Button className="bg-primary hover:bg-primary/90">Partnerships &amp; Sponsorships</Button>
            </Link>
            <Link href="/podcast">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">Listen to Podcast</Button>
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

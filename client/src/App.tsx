import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Podcast from "@/pages/Podcast";
import Newsletter from "@/pages/Newsletter";
import UseCases from "@/pages/UseCases";
import UseCasesDetail from "@/pages/UseCasesDetail";
import Contact from "@/pages/Contact";
import ConferenceCoverage from "@/pages/ConferenceCoverage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/podcast" component={Podcast} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/use-cases/:slug" component={UseCasesDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/conference-coverage" component={ConferenceCoverage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

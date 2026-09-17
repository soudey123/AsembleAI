import { ArrowRight, Mic2 } from "lucide-react";

export function SponsorWidget() {
  return (
    <a
      href="mailto:asembleaimedia@asembleai.com?subject=Sponsor%20Inside%20AsembleAI"
      className="sponsor-widget group fixed z-[60] flex h-12 w-auto items-center justify-start overflow-hidden rounded-full border border-cyan-300/30 bg-[#071225]/95 px-3 text-white backdrop-blur-xl sm:h-13 sm:px-4"
      aria-label="Sponsor Inside AsembleAI"
      data-testid="link-sponsor-widget"
    >
      <span className="sponsor-widget-inner inline-flex h-full items-center justify-center gap-2 sm:justify-start">
        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_18px_rgba(59,130,246,0.55)]">
          <span className="sponsor-live-dot absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#071225] bg-emerald-400" aria-hidden="true" />
          <Mic2 className="h-4 w-4" />
        </span>
        <span className="sponsor-widget-label relative overflow-hidden whitespace-nowrap text-xs font-bold sm:text-sm">
          Sponsor This Show
        </span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs text-cyan-200 opacity-0 transition-all duration-300 group-hover:max-w-[15rem] group-hover:opacity-100 md:block">
          Reach AI leaders &amp; decision-makers
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-cyan-300" />
      </span>
    </a>
  );
}
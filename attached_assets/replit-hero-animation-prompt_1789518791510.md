# Replit prompt — animated hero section

Paste this into Replit. Upload `Hero Animation Reference.html` alongside it as the visual/motion reference.

---

## PROMPT

Rebuild ONLY the hero section of my site (everything above the fold — headline, subhead, "Listen on" row, CTAs). Keep the existing dark navy palette, blue accent (#4b8cff), and all current copy and links. Do not touch any other section, route, or component.

Turn the hero into a **kinetic-typography motion hero** in the style of the attached reference file (`Hero Animation Reference.html`) — open it in the browser, match its timing and feel.

### Motion spec

**1. Entrance (runs once on load, total ~1.6s, staggered)**
- Small mono eyebrow label fades up first (0.1s).
- Headline animates **word by word**, each word inside an `overflow: hidden` line mask, rising from `translateY(0.9em) rotate(2deg)` with opacity 0 → 1. Stagger 80–100ms per word, `cubic-bezier(.19,1,.22,1)`, 0.85s each.
- Subhead block, "Listen on" row, then buttons fade up last at 1.0s / 1.2s / 1.35s.

**2. Rotating accent word (the loop that makes it feel alive)**
- The blue word in the headline cycles every 2.6s through: Science → Robotics → Biotech → Quantum → Space → (repeat).
- Out/in transition: new word enters from `translateY(0.55em)` + `blur(8px)` + opacity 0 → settles sharp, 0.7s.
- Reserve a fixed min-width for the word slot so the rest of the headline never reflows/jumps.

**3. Ambient background (continuous, subtle)**
- Faint blue grid (72px cells, ~9% opacity) drifting diagonally on a 14s infinite linear loop.
- One large soft blue radial glow, top-right, breathing scale 1 → 1.08 / opacity .35 → .7 on a 7s ease-in-out loop.
- A thin light "scanline" sweeping horizontally across the very top edge, 9s linear loop.
- A horizontal accent rule beside the accent word that scales in from the left (`transform-origin: left; scaleX(0 → 1)`) at 0.8s.

**4. Audio identity**
- A live 12-bar equalizer next to the "LISTEN ON" label — each bar `scaleY(0.22 → 1 → 0.22)` on a 1.1s ease-in-out infinite loop with an 80ms stagger per bar, gradient from #4b8cff to #9ccbff. This is the signal that it's a media/podcast brand.

**5. Micro-interactions**
- Platform pills and both CTAs: on hover lift `translateY(-3px)`, brighten border, and grow the blue glow shadow. 0.25s `cubic-bezier(.2,.7,.2,1)`.
- Primary "Listen Now" button: a soft white sheen sweeps across it every 5s (skewed gradient, `translateX(-120% → 320%)`).
- One sheen pass across the word "matter." every 4.5s.

### Rules
- Pure CSS `@keyframes` + transforms/opacity only — no animation libraries, no JS-driven layout animation except the rotating-word timer (`setInterval`, cleaned up on unmount).
- Animate only `transform`, `opacity`, `filter`. No animating width/height/top/left. Everything GPU-composited, target 60fps.
- Wrap all looping ambient motion in `@media (prefers-reduced-motion: reduce)` and disable it; show the final static state.
- Text must stay fully legible at every frame — no text animating under 4.5:1 contrast, no permanent opacity below 1 on body copy.
- Fully responsive: headline `clamp(40px, 7.2vw, 92px)`, word masks must not clip descenders (add `padding-bottom: .08em` inside the mask), pills wrap on mobile, no horizontal scroll.
- No layout shift (CLS 0): reserve space for the rotating word and don't animate anything that changes document flow.
- Fonts: keep my current heading font, or use Space Grotesk 700 for the headline + IBM Plex Mono for the mono labels if none is set.

### Deliverable
Update the hero component in place, keep props/content driven by whatever data source it already uses, and make the rotating word list a simple array constant at the top of the file so I can edit it.

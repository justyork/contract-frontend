# Homepage Premium Visual Design

**Date:** 2025-02-18  
**Scope:** Main landing page (`src/app/page.tsx`) — premium look via thin typography, icons, subtle decoration, light animation.

---

## 1. Typography

- **Hero H1:** `font-extralight` (200) or `font-light` (300), keep `tracking-tight`.
- **Section titles (H2):** `font-light` (300). Existing `.section-title` class in `globals.css` will be overridden or extended on the page.
- **Card/section H3:** `font-medium` (500) to keep hierarchy without heavy weight.
- **Body and captions:** No change (current Geist).
- **CTAs and buttons:** Keep `font-semibold`.

**Implementation:** Geist is a variable font (already in `layout.tsx`); Tailwind's `font-extralight`, `font-light`, `font-medium` work without adding weights. Apply utility classes on the page.

---

## 2. Icons

- **Library:** `lucide-react`, thin stroke: `strokeWidth={1.5}` (or 1 for extra thin).
- **Placement:**
  - **Features:** One icon per segment (e.g. Building2 / SMB, User / Freelancers, Scale / Legal).
  - **How it works:** One icon per step (Upload, Languages, FileCheck or similar).
  - **Proof and trust:** Optional small icon per stat (TrendingUp, Clock, Zap).
  - **Pricing:** Optional small icon per plan or only on “Most popular”.
- **Style:** Size ~24px for feature/step blocks, color `var(--foreground-muted)` or `var(--primary)` for accent; consistent `strokeWidth={1.5}`.

---

## 3. Decoration

- **Hero:** Soft radial or linear gradient behind hero content (e.g. primary blue at 3–5% opacity, large radius) so the hero feels depth without noise. No extra DOM where possible — use CSS on the hero container or a pseudo-element.
- **Sections:** No mandatory patterns; optional very subtle gradient on final CTA section (reuse same token).
- **Constraints:** CSS-only where possible; no heavy SVGs or images.

---

## 4. Animation

- **Cards:** Slight hover lift: `translateY(-2px)` and existing `hover:shadow-[var(--shadow-card)]` with `transition` (transform + box-shadow, ~200ms).
- **Scroll-in:** Sections (or key blocks) fade-in / slide-up on scroll (e.g. `opacity` + `transform`). Prefer CSS `@media (prefers-reduced-motion: reduce)` to disable or simplify.
- **Respect `prefers-reduced-motion`:** Reduce or remove motion when user prefers reduced motion.

---

## Files to Touch

- `src/app/layout.tsx` — only if extra font weights needed (Geist variable font: no change expected).
- `src/app/page.tsx` — typography classes, icons, hero gradient wrapper, card hover, scroll-in hooks/classes.
- `src/app/globals.css` — optional utility for hero gradient; `.section-title` weight override if not done on page; `prefers-reduced-motion` for transitions.
- **New dependency:** `lucide-react` (add to `package.json` via `npm install lucide-react`).

---

## Out of Scope

- Changing footer or header structure.
- New pages or routes.
- Dark theme or new color tokens (use existing CSS variables only).

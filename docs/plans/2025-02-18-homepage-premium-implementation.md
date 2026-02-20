# Homepage Premium Visuals — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the main landing page more premium and professional using thin typography, Lucide icons, subtle hero decoration, and light hover/scroll animation.

**Architecture:** Single-page changes in `page.tsx`; optional CSS in `globals.css`; one new dependency (`lucide-react`). No new components unless a small reusable icon wrapper is desired (optional). Respect `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, lucide-react.

---

## Task 1: Add lucide-react and hero gradient

**Files:**
- Modify: `contractor-frontend/package.json` (add dependency)
- Modify: `contractor-frontend/src/app/globals.css` (hero gradient utility)
- Modify: `contractor-frontend/src/app/page.tsx` (hero wrapper + gradient)

**Step 1:** Install dependency

```bash
cd contractor-frontend && npm install lucide-react
```

**Step 2:** Add hero gradient utility in `globals.css`

Append after `.section-subtitle` block:

```css
.hero-gradient {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.06), transparent);
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**Step 3:** Wrap hero content in `page.tsx` with gradient

In the first `<Section>` (hero), add `className="hero-gradient"` to the Section or add an inner wrapper div with `hero-gradient` and ensure the hero block stays centered. Prefer adding `hero-gradient` to the `<Section>` for the hero so the gradient covers the hero area only.

**Step 4:** Commit

```bash
git add package.json package-lock.json src/app/globals.css src/app/page.tsx
git commit -m "chore: add lucide-react and hero gradient for premium homepage"
```

---

## Task 2: Apply thin typography on the homepage

**Files:**
- Modify: `contractor-frontend/src/app/page.tsx`

**Step 1:** Hero H1 — add `font-light` (or `font-extralight`) to the h1.

**Step 2:** Section titles — add `font-light` to each `<h2 className="section-title">` (or extend `.section-title` in CSS with `font-weight: 300`). Prefer page-level class for consistency: `className="section-title font-light"` on all H2s.

**Step 3:** Card/section H3s — add `font-medium` to feature titles, “How it works” step titles (the number circle can stay bold), sample report title, proof/trust labels, pricing plan names, FAQ questions. Keep CTA buttons with existing semibold.

**Step 4:** Commit

```bash
git add src/app/page.tsx
git commit -m "style: apply thin typography for premium homepage"
```

---

## Task 3: Add icons to Features, How it works, Proof and trust

**Files:**
- Modify: `contractor-frontend/src/app/page.tsx`

**Step 1:** Add Lucide imports at top: `Building2`, `User`, `Scale`, `Upload`, `Languages`, `FileCheck`, `TrendingUp`, `Clock`, `Zap` (or equivalent). Use `strokeWidth={1.5}` for all.

**Step 2:** Features — in the grid that maps segments (SMB owners, Freelancers, Legal teams), add an icon above each title (e.g. Building2, User, Scale), size 24, color `var(--foreground-muted)` or primary for one.

**Step 3:** How it works — add icon per step (Upload, Languages, FileCheck), same size and stroke, next to or above the step number.

**Step 4:** Proof and trust — add small icon per stat (e.g. TrendingUp, Clock, Zap) above or beside the value.

**Step 5:** Commit

```bash
git add src/app/page.tsx
git commit -m "feat: add Lucide icons to features, steps, and proof section"
```

---

## Task 4: Card hover animation and reduced-motion

**Files:**
- Modify: `contractor-frontend/src/components/ui/Card.tsx`
- Modify: `contractor-frontend/src/app/globals.css` (if not already done in Task 1)

**Step 1:** In `Card.tsx`, add hover lift and smooth transition: `transition-all duration-200`, and on hover `-translate-y-0.5` (2px) along with existing `hover:shadow-[var(--shadow-card)]`. Use Tailwind classes: `transition-all duration-200 hover:-translate-y-0.5`.

**Step 2:** Ensure `globals.css` has the `prefers-reduced-motion` block so transitions are minimal when user prefers reduced motion (already in Task 1).

**Step 3:** Commit

```bash
git add src/components/ui/Card.tsx src/app/globals.css
git commit -m "style: card hover lift and respect prefers-reduced-motion"
```

---

## Task 5: Optional scroll-in animation for sections

**Files:**
- Modify: `contractor-frontend/src/app/page.tsx`
- Modify: `contractor-frontend/src/app/globals.css`

**Step 1:** Add CSS in `globals.css` for scroll-in: e.g. `.animate-on-scroll { opacity: 0; transform: translateY(12px); transition: opacity 0.4s ease, transform 0.4s ease; }` and `.animate-on-scroll.visible { opacity: 1; transform: translateY(0); }`. Wrap in `@media (prefers-reduced-motion: no-preference)` or add a class that gets toggled via JS.

**Step 2:** Use a small Intersection Observer in `page.tsx` to add `.visible` when section is in view, or use CSS `animation-timeline: view()` if supported (simpler, no JS). If using JS: one `useEffect` with observer, add `data-animate` to sections and refs, then add `visible` class when intersecting. Prefer minimal JS: e.g. one hook that targets `[data-animate]`.

**Step 3:** Add `data-animate` (and ref or class for animation) to main sections: hero (optional), features, how it works, sample report, proof, pricing, FAQ, final CTA.

**Step 4:** Commit

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: scroll-in animation for homepage sections"
```

---

## Verification

- Run `npm run build` in `contractor-frontend` — must succeed.
- Run `npm run lint` — no new errors.
- Manually: load homepage, check typography (thin H1/H2), icons in features/steps/proof, hero gradient, card hover, scroll-in (and reduced-motion if toggled in OS).

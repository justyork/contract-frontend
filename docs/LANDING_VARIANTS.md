# Landing variants by source

The homepage shows different content depending on where the user came from (e.g. freelancer ads, B2B campaigns). Variant is determined by the `landing` query parameter or UTM parameters; content is stored in TypeScript files under `src/content/landings/`.

## How it works

1. **Source → variant:** In `src/config/landings.ts`, `SOURCE_TO_VARIANT` maps query/UTM values to variant keys (e.g. `landing=freelancers` or `utm_campaign=freelancers_2025` → `freelancers`).
2. **Content:** Each variant has a TypeScript file in `src/content/landings/` (e.g. `default.ts`, `freelancers.ts`, `b2b.ts`) exporting content that conforms to `LandingContent`. Unknown or missing variants fall back to `default`.
3. **Merge:** Non-default variants are merged with default: only provided fields override; the rest come from `default`.
4. **Persistence (optional):** If `PERSIST_VARIANT_IN_SESSION` is true in config, the chosen variant is stored in `sessionStorage` and reused when the user returns to `/` without query params.

## Adding a new variant

1. **Map source to variant**  
   In `src/config/landings.ts`, add entries to `SOURCE_TO_VARIANT`:
   - For `?landing=myvariant`, add `myvariant: "myvariant"` (or map to an existing variant key).
   - For UTM, add e.g. `"my_campaign_2025": "myvariant"`.

2. **Add content file**  
   Create `src/content/landings/<variant>.ts` and export a `Partial<LandingContent>` (e.g. `export const myvariantContent: Partial<LandingContent> = { ... }`).  
   You can override only the sections you need (e.g. `hero`, `features`, `demoReport`); the rest come from `default`.

3. **Register the variant**  
   In `src/config/landings.ts`, import the new content and add it to `contentByVariant`:
   ```ts
   import { myvariantContent } from "@/content/landings/myvariant";
   // ...
   const contentByVariant = {
     // ...
     myvariant: myvariantContent,
   };
   ```

## Content shape

- **hero:** `badge`, `title`, `subtitle`, `ctaPrimary`, `ctaSecondary`
- **features:** `sectionTitle`, `sectionSubtitle`, `items` (array of `{ title, description }`)
- **howItWorks:** `sectionTitle`, `steps` (array of `{ step }`)
- **sampleReportHeadings:** `sectionTitle`, `sectionSubtitle`
- **proof:** `sectionTitle`, `items` (array of `{ value, label }`)
- **testimonials:** `sectionTitle`, `items` (array of `{ quote, name, role }`)
- **pricing:** `sectionTitle`, `subtitle`
- **faq:** `sectionTitle`, `items` (array of `{ q, a }`)
- **finalCta:** `title`, `subtitle`, `ctaText`
- **demoReport:** contract type, parties, score, risks, hidden clauses, compliance, perspectives, key points, termination, suggestions, negotiation (see `DemoReportContent` in `src/config/landings.ts`)

Icons and layout are fixed in the page component; content files only provide copy and data.

## Testing

- **Default:** Open `/` with no query → default content.
- **By param:** Open `/?landing=freelancers` → freelancer content (hero, features, demo report).
- **By UTM:** Open `/?utm_campaign=freelancers_2025` → same as `landing=freelancers` if mapped in `SOURCE_TO_VARIANT`.

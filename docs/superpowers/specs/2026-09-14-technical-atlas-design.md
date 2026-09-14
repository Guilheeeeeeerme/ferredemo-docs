# Technical Atlas Design

## Goal

Turn the central GitHub Pages site into a bilingual, visual-first architecture atlas that explains the Ferre ecosystem through real product flows, shared infrastructure, concepts, and explicitly audited capability status.

## Experience

The landing page is a technical atlas rather than a Markdown index. It starts with a concise explanation of the ecosystem, then offers product cards, an SVG map of the shared planes, a guided tour of each product pipeline, and a visible glossary of the vocabulary used throughout the documentation. Every visual is an inline SVG or semantic HTML/CSS component: it must remain responsive, accessible to keyboard and screen-reader users, printable, and inexpensive to load. Decorative GIFs are out of scope.

Product pages retain their evidence-backed content but gain a reusable visual hero and a "How this system works" explainer panel. The site must distinguish VERIFIED, PARTIAL, UNUSED, and NOT FOUND claims without implying that a gap is shipped functionality.

## Language behavior

The public routes remain `/pt/` and `/en/`. A small client enhancement detects the browser locale on the root route only: `pt-BR` and all `pt-*` locales route to `/pt/`; every other or unavailable locale also falls back to `/pt/`. It must never override a direct `/pt/…` or `/en/…` link. A persistent PT/EN header control stores an explicit preference in `localStorage`, uses the equivalent product/reference route when one exists, and otherwise takes the user to that locale's overview.

Both locales get the same atlas structure and visual components. Portuguese is the default/fallback; English is a first-class alternate, not an afterthought.

## Design system

Use the requested GitHub-inspired dark system: `#10131A` base, `#11122F` raised surface, `#030036` focus/action color, reduced palette, Inter, 4px spacing rhythm, accessible contrast, visible two-pixel focus states, and reduced-motion support. The VitePress light-theme toggle is disabled so visual contrast and diagrams remain consistent.

## Components

- `LocaleRedirect`: root-only browser-language redirect with an explicit-preference override.
- `LocaleSwitcher`: keyboard-accessible PT/EN links in the VitePress header, preserving the current document path.
- `AtlasHero`: product/system entry map with three real product cards and concept anchors.
- `SystemMap`: semantic inline SVG showing product stacks connected to `infra_data`, `infra_llm`, and `infra_obs`; it labels the intentional Quizzeira/Headroom exception.
- `PipelineStory`: product-specific SVG flow, a short concept explanation, and links to existing detailed evidence pages.
- `StatusLegend`: reusable accessible treatment for audited status tags.

## Content boundaries

Only `ferredemo-docs` changes. Product facts are copied only from the existing audit-backed pages and central README; no runtime claims, APIs, or capabilities are added. The product repositories and the private infra repository are not touched.

## Verification

Automated tests cover locale parsing, route equivalence, root redirect behavior, and SVG component rendering. `npm run build` proves VitePress compilation. Browser checks cover `/`, `/pt/`, `/en/`, language switching, desktop width (1920px), and mobile width (390px).

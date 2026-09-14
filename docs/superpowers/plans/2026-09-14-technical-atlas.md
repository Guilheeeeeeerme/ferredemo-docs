# Technical Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, visual-first Ferre ecosystem documentation atlas with Portuguese browser fallback and a persistent header language switcher.

**Architecture:** Extend the existing VitePress default theme with focused Vue components for locale routing and header controls. Keep architecture visuals as accessible inline SVG/semantic HTML in the Markdown source, reuse current evidence-backed facts, and share CSS tokens across all documentation pages.

**Tech Stack:** VitePress 1.6, Vue 3.5, TypeScript, Node.js built-in test runner, inline SVG, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-09-14-technical-atlas-design.md`

## Global Constraints

- Change only the `ferredemo-docs` repository.
- Use Portuguese for root-route fallback and unrecognized browser locales.
- Never redirect an explicit `/pt/` or `/en/` document route.
- Keep audit states as explicit status labels; do not invent capabilities.
- Use `#10131A` for the page base, `#11122F` for raised surfaces, `#030036` for focus/action, Inter, and a 4px spacing rhythm.
- All SVGs must carry a title/description or be marked decorative.

---

### Task 1: Test and implement locale-routing primitives

**Files:**
- Create: `docs/.vitepress/theme/locale-routing.mjs`
- Create: `tests/locale-routing.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces `preferredLocale({ storedLocale, browserLanguage }): 'pt' | 'en'`.
- Produces `localizedPath(pathname, locale): string`.
- Produces `shouldRedirectRoot(pathname): boolean`.

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { localizedPath, preferredLocale } from '../docs/.vitepress/theme/locale-routing.mjs'

test('uses Portuguese for unknown browser locales and stored preference first', () => {
  assert.equal(preferredLocale({ browserLanguage: 'en-US' }), 'pt')
  assert.equal(preferredLocale({ browserLanguage: 'pt-BR' }), 'pt')
  assert.equal(preferredLocale({ storedLocale: 'en', browserLanguage: 'pt-BR' }), 'en')
  assert.equal(localizedPath('/en/argus/architecture', 'pt'), '/pt/argus/architecture')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/locale-routing.test.mjs`

Expected: FAIL because `locale-routing.mjs` is absent.

- [ ] **Step 3: Write minimal implementation**

```js
export function preferredLocale({ storedLocale, browserLanguage } = {}) {
  if (storedLocale === 'en' || storedLocale === 'pt') return storedLocale
  return browserLanguage?.toLowerCase().startsWith('pt') ? 'pt' : 'pt'
}

export function localizedPath(pathname, locale) {
  return pathname.replace(/^\/(en|pt)(?=\/|$)/, `/${locale}`)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/locale-routing.test.mjs`

Expected: PASS with all locale-routing cases green.

- [ ] **Step 5: Add the repeatable test command and commit**

```json
"test": "node --test tests/*.test.mjs"
```

Run: `npm test`

Commit: `test: cover documentation locale routing`

### Task 2: Add VitePress locale redirect and header switcher

**Files:**
- Create: `docs/.vitepress/theme/components/LocaleRedirect.vue`
- Create: `docs/.vitepress/theme/components/LocaleSwitcher.vue`
- Create: `docs/.vitepress/theme/Layout.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `docs/index.md`

**Interfaces:**
- `LocaleRedirect` calls `router.go(preferredLocale(...))` only when the current route is `/`.
- `LocaleSwitcher` renders labelled `PT` and `EN` anchors and stores `ferre-docs-locale` on selection.
- `Layout` renders the default VitePress layout with the header switcher in the `nav-bar-content-after` slot.

- [ ] **Step 1: Write the failing test**

Add assertions for `shouldRedirectRoot('/') === true`, `shouldRedirectRoot('/en/') === false`, and preserving a document path with `localizedPath`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because `shouldRedirectRoot` is not exported.

- [ ] **Step 3: Implement the smallest theme integration**

```vue
<template><DefaultTheme.Layout><template #nav-bar-content-after><LocaleSwitcher /></template></DefaultTheme.Layout></template>
```

Use `onMounted` in `LocaleRedirect` so server-side rendering never reads `localStorage` or `navigator`.

- [ ] **Step 4: Run test and production build**

Run: `npm test && npm run build`

Expected: test command and VitePress build both exit zero.

- [ ] **Step 5: Commit**

Commit: `feat: add persistent bilingual documentation navigation`

### Task 3: Create atlas visuals and content for English and Portuguese

**Files:**
- Create: `docs/public/atlas/system-map.svg`
- Create: `docs/public/atlas/promptdesk-flow.svg`
- Create: `docs/public/atlas/quizzeira-flow.svg`
- Create: `docs/public/atlas/argus-flow.svg`
- Modify: `docs/en/index.md`
- Modify: `docs/pt/index.md`
- Modify: `docs/en/promptdesk/architecture.md`
- Modify: `docs/en/quizzeira/architecture.md`
- Modify: `docs/en/argus/architecture.md`
- Modify: `docs/pt/promptdesk/architecture.md`
- Modify: `docs/pt/quizzeira/architecture.md`
- Modify: `docs/pt/argus/architecture.md`

**Interfaces:**
- Each SVG exposes a `<title>` and `<desc>` identifying its documented system.
- Home pages use the class names `atlas-hero`, `atlas-grid`, `atlas-card`, `concept-strip`, and `flow-explainer`.
- Product architecture pages embed the corresponding SVG and link to existing detailed pages.

- [ ] **Step 1: Write the failing content contract test**

Extend `tests/locale-routing.test.mjs` to assert each atlas SVG file contains `<title>` and each locale home includes `atlas-hero` and `/atlas/system-map.svg`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because atlas assets and markup do not exist.

- [ ] **Step 3: Write the SVGs and replace index content**

Use real facts already documented: PromptDesk's support path, Quizzeira's ingestion→bank→eval→study path, Argus's stream→VLM→HITL path, and the `infra_data`/`infra_llm`/`infra_obs` planes. Portuguese and English copy must have matching information hierarchy.

- [ ] **Step 4: Add product-level visual explainers**

Add a concise "How it works"/"Como funciona" panel and the corresponding visual at the top of each product architecture page. Keep the existing evidence and status claims below it.

- [ ] **Step 5: Run test and build**

Run: `npm test && npm run build`

Expected: PASS, and the build emits both `pt` and `en` site pages.

- [ ] **Step 6: Commit**

Commit: `docs: build bilingual ecosystem technical atlas`

### Task 4: Apply the GitHub-inspired documentation theme

**Files:**
- Modify: `docs/.vitepress/theme/custom.css`
- Modify: `docs/.vitepress/config.mts`

**Interfaces:**
- CSS defines `--atlas-surface-base: #10131A`, `--atlas-surface-raised: #11122F`, and `--atlas-accent: #030036`.
- Focusable elements have a visible `2px` outline and `2px` offset.
- `@media (prefers-reduced-motion: reduce)` disables nonessential transitions.

- [ ] **Step 1: Write the failing content contract test**

Assert `custom.css` contains the three required tokens and `prefers-reduced-motion`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the atlas token names are absent.

- [ ] **Step 3: Implement the stylesheet**

Replace the teal default styling with the specified dark tokens. Style the navigation, doc typography, tables, status labels, atlas cards, SVG frames, concept strip, mobile stacking, and locale switcher. Preserve readable code blocks and Mermaid diagrams.

- [ ] **Step 4: Run test and build**

Run: `npm test && npm run build`

Expected: both commands pass.

- [ ] **Step 5: Commit**

Commit: `style: redesign docs as a dark technical atlas`

### Task 5: Browser acceptance and final verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- README documents `/pt/` as browser-language fallback and the header switcher.

- [ ] **Step 1: Start preview**

Run: `npm run dev -- --host 127.0.0.1`.

- [ ] **Step 2: Check browser flows with Playwright**

At 1920×1080 and 390×844, check `/`, `/pt/`, and `/en/`. Verify root takes a non-Portuguese browser to `/pt/`, a direct English page stays English, header switcher changes to its paired path, focus is visible, and no horizontal overflow occurs.

- [ ] **Step 3: Update README and run full verification**

Run: `npm test && npm run build && git diff --check && git status --short`

Expected: tests/build/diff check pass; status lists only intended files.

- [ ] **Step 4: Commit**

Commit: `docs: explain bilingual technical atlas navigation`

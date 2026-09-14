# ferredemo-docs

Public VitePress site for the Ferre ecosystem: **PromptDesk**, **Quizzeira**, **Argus**, and shared standards.

**Live:** https://guilheeeeeeerme.github.io/ferredemo-docs/

Product repos stay pure — this dedicated repo owns the multi-product docs site. Product-local SoTs (e.g. `docs/guardrails.md` in each app) remain in those repos.

## Local

```bash
npm ci
npm run dev
npm run build
```

Project Pages base path: `/ferredemo-docs/`.

## Deploy

GitHub Actions workflow `.github/workflows/deploy-pages.yml` builds and deploys via `actions/deploy-pages`.

## Keeping docs current

See [`prompts/update-gh-pages.md`](prompts/update-gh-pages.md). Agents should update **this** repo from diffs across `quizzeira` / `argus` / `promptdesk` / `infra`, track SHAs, and never invent capabilities.

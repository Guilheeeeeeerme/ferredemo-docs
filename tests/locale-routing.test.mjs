import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  localizedPath,
  preferredLocale,
  shouldRedirectRoot,
} from '../docs/.vitepress/theme/locale-routing.mjs'

test('uses Portuguese as the fallback locale', () => {
  assert.equal(preferredLocale({ browserLanguage: 'pt-BR' }), 'pt')
  assert.equal(preferredLocale({ browserLanguage: 'en-US' }), 'pt')
  assert.equal(preferredLocale({ browserLanguage: undefined }), 'pt')
})

test('uses an explicit persisted language preference', () => {
  assert.equal(preferredLocale({ storedLocale: 'en', browserLanguage: 'pt-BR' }), 'en')
  assert.equal(preferredLocale({ storedLocale: 'pt', browserLanguage: 'en-US' }), 'pt')
})

test('maps a documentation page to its equivalent locale', () => {
  assert.equal(localizedPath('/en/argus/architecture', 'pt'), '/pt/argus/architecture')
  assert.equal(localizedPath('/pt/quizzeira/architecture', 'en'), '/en/quizzeira/architecture')
  assert.equal(localizedPath('/en/', 'pt'), '/pt/')
  assert.equal(localizedPath('/', 'en'), '/en/')
  assert.equal(localizedPath('/argus/architecture', 'en'), '/en/argus/architecture')
  assert.equal(localizedPath('/ferredemo-docs/pt/argus/architecture', 'en'), '/en/argus/architecture')
})

test('redirects only the root route', () => {
  assert.equal(shouldRedirectRoot('/'), true)
  assert.equal(shouldRedirectRoot('/ferredemo-docs/'), true)
  assert.equal(shouldRedirectRoot('/en/'), false)
  assert.equal(shouldRedirectRoot('/pt/argus/architecture'), false)
})

test('theme exposes a persistent header locale switcher and root-only redirect', async () => {
  const [layout, redirect, switcher] = await Promise.all([
    readFile(new URL('../docs/.vitepress/theme/Layout.vue', import.meta.url), 'utf8'),
    readFile(new URL('../docs/.vitepress/theme/components/LocaleRedirect.vue', import.meta.url), 'utf8'),
    readFile(new URL('../docs/.vitepress/theme/components/LocaleSwitcher.vue', import.meta.url), 'utf8'),
  ])

  assert.match(layout, /LocaleSwitcher/)
  assert.match(redirect, /shouldRedirectRoot/)
  assert.match(redirect, /withBase/)
  assert.match(switcher, /ferre-docs-locale/)
})

test('atlas pages and diagrams expose accessible visual documentation', async () => {
  const files = [
    '../docs/public/atlas/system-map.svg',
    '../docs/public/atlas/promptdesk-flow.svg',
    '../docs/public/atlas/quizzeira-flow.svg',
    '../docs/public/atlas/argus-flow.svg',
  ]
  const diagrams = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), 'utf8')))
  const [englishHome, portugueseHome] = await Promise.all([
    readFile(new URL('../docs/en/index.md', import.meta.url), 'utf8'),
    readFile(new URL('../docs/pt/index.md', import.meta.url), 'utf8'),
  ])

  diagrams.forEach((diagram) => {
    assert.match(diagram, /<title(?:\s|>)/)
    assert.match(diagram, /<desc(?:\s|>)/)
  })
  ;[englishHome, portugueseHome].forEach((home) => {
    assert.match(home, /atlas-hero/)
    assert.match(home, /\/atlas\/system-map\.svg/)
  })
})

test('atlas stylesheet provides the dark accessible design system', async () => {
  const css = await readFile(new URL('../docs/.vitepress/theme/custom.css', import.meta.url), 'utf8')
  assert.match(css, /--atlas-surface-base:\s*#10131A/i)
  assert.match(css, /--atlas-surface-raised:\s*#11122F/i)
  assert.match(css, /--atlas-accent:\s*#030036/i)
  assert.match(css, /prefers-reduced-motion/)
})

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
})

test('redirects only the root route', () => {
  assert.equal(shouldRedirectRoot('/'), true)
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
  assert.match(switcher, /ferre-docs-locale/)
})

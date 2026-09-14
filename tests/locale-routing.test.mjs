import assert from 'node:assert/strict'
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

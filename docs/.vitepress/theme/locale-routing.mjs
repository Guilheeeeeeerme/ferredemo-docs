const supportedLocales = new Set(['pt', 'en'])

export function preferredLocale({ storedLocale, browserLanguage } = {}) {
  if (supportedLocales.has(storedLocale)) return storedLocale
  return browserLanguage?.toLowerCase().startsWith('pt') ? 'pt' : 'pt'
}

export function localizedPath(pathname, locale) {
  const target = supportedLocales.has(locale) ? locale : 'pt'
  const cleanPath = pathname.replace(/^\/ferredemo-docs(?=\/|$)/, '') || '/'
  if (!/^\/(en|pt)(?=\/|$)/.test(cleanPath)) {
    return `/${target}${cleanPath === '/' ? '/' : cleanPath}`
  }
  return cleanPath.replace(/^\/(en|pt)(?=\/|$)/, `/${target}`)
}

export function shouldRedirectRoot(pathname) {
  return pathname === '/' || pathname === '/ferredemo-docs/'
}

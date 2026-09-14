<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { localizedPath } from '../locale-routing.mjs'

const route = useRoute()
const currentLocale = computed(() => route.path.match(/^\/(pt|en)(?:\/|$)/)?.[1] ?? 'pt')

function targetPath(locale: 'pt' | 'en') {
  return localizedPath(route.path, locale)
}

function remember(locale: 'pt' | 'en') {
  window.localStorage.setItem('ferre-docs-locale', locale)
}
</script>

<template>
  <nav class="locale-switcher" aria-label="Language / Idioma">
    <a :class="{ active: currentLocale === 'pt' }" :href="targetPath('pt')" hreflang="pt-BR" @click="remember('pt')">PT</a>
    <span aria-hidden="true">/</span>
    <a :class="{ active: currentLocale === 'en' }" :href="targetPath('en')" hreflang="en" @click="remember('en')">EN</a>
  </nav>
</template>

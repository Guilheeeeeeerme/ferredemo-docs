<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { preferredLocale, shouldRedirectRoot } from '../locale-routing.mjs'

const router = useRouter()

onMounted(() => {
  if (!shouldRedirectRoot(window.location.pathname)) return
  router.go(`/${preferredLocale({
    storedLocale: window.localStorage.getItem('ferre-docs-locale'),
    browserLanguage: window.navigator.language,
  })}/`)
})
</script>

<template><span aria-hidden="true" /></template>

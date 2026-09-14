<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LocaleRedirect from './components/LocaleRedirect.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
</script>

<template>
  <LocaleRedirect />
  <DefaultTheme.Layout>
    <template #nav-bar-content-after><LocaleSwitcher /></template>
  </DefaultTheme.Layout>
</template>

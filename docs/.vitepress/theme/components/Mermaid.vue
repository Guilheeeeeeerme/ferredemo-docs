<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ chart: string }>()
const diagram = ref<HTMLElement>()
const error = ref('')

onMounted(async () => {
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#10131A',
        primaryColor: '#11122F',
        primaryTextColor: '#E3E4EA',
        primaryBorderColor: '#A3D4AD',
        lineColor: '#A3D4AD',
        textColor: '#E3E4EA',
      },
    })
    const source = decodeURIComponent(props.chart)
    const { svg } = await mermaid.render(`mermaid-${crypto.randomUUID()}`, source)
    if (diagram.value) diagram.value.innerHTML = svg
  } catch {
    error.value = 'Diagram could not be rendered.'
  }
})
</script>

<template>
  <figure class="mermaid-diagram">
    <div ref="diagram" role="img" aria-label="Architecture diagram" />
    <p v-if="error" class="mermaid-error">{{ error }}</p>
  </figure>
</template>

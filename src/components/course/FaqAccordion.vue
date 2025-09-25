<script setup>
import { ref } from 'vue'

const { items } = defineProps({
  items: { type: Array, default: () => [] }
})

const open = ref(null)
function toggle(i) { open.value = open.value === i ? null : i }
</script>

<template>
  <div style="display:grid;gap:10px">
    <div v-for="(f,i) in items" :key="i" class="faq-item">
      <div class="faq-q" @click="toggle(i)">{{ f.q }}</div>
      <div v-if="open === i" class="faq-a">{{ f.a }}</div>
    </div>
  </div>
</template>

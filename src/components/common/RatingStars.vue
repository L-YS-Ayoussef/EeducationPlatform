<script setup>
const props = defineProps({ rating: { type: Number, required: true } })
const full = Math.floor(props.rating)
const half = props.rating - full >= 0.5
</script>

<template>
  <span aria-label="التقييم">
    <span v-for="i in 5" :key="i">
      <span v-if="i <= full">★</span>
      <span v-else-if="i === full + 1 && half">☆</span>
      <span v-else>☆</span>
    </span>
    <span> {{ rating.toFixed(1) }}</span>
  </span>
</template>

<style scoped>
span { color:#f59e0b; font-weight:700 }
</style>

<script setup>
const { instructor } = defineProps({
  instructor: { type: Object, required: true }
})
</script>

<template>
  <div class="card" style="padding:12px">
    <div class="card-body" style="padding:0">
      <div class="card-title">{{ instructor.name }}</div>
      <div class="card-meta">{{ instructor.title }}</div>
    </div>
  </div>
</template>

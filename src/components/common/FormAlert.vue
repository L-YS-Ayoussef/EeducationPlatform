<script setup>
const { type, message } = defineProps({
  type: { type: String, default: 'info' },  // 'success' | 'error' | 'info'
  message: { type: String, required: true }
})
</script>

<template>
  <div class="alert" :style="type==='success' ? 'border-color:#b7e4c7;background:#ecfdf5' : type==='error' ? 'border-color:#fca5a5;background:#fef2f2' : ''">
    {{ message }}
  </div>
</template>

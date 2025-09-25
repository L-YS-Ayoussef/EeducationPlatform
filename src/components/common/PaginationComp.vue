<script setup>
import { computed } from 'vue'
const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 8 },
  total: { type: Number, required: true }
})
const emit = defineEmits(['update:page'])
const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
function go(p){ if(p>=1 && p<=totalPages.value) emit('update:page', p) }
</script>

<template>
  <div class="pagination">
    <button class="page-btn" @click="go(page-1)">‹</button>
    <button
      v-for="p in totalPages"
      :key="p"
      class="page-btn"
      :class="{ active: p === page }"
      @click="go(p)"
    >{{ p }}</button>
    <button class="page-btn" @click="go(page+1)">›</button>
  </div>
</template>

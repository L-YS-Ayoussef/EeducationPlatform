<script setup>
const { sections } = defineProps({
  sections: { type: Array, default: () => [] }
})
</script>

<template>
  <ul class="list">
    <li v-for="(sec, i) in sections" :key="i" style="margin-bottom:10px">
      <strong>{{ sec.title }}</strong>
      <ul class="list" style="margin-top:6px">
        <li v-for="(l, j) in sec.lessons" :key="j">{{ l }}</li>
      </ul>
    </li>
  </ul>
</template>

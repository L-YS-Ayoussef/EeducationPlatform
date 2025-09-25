<script setup>
import RatingStars from '@/components/common/RatingStars.vue'
const { instructor } = defineProps({
  instructor: { type: Object, required: true }
})
</script>

<template>
  <article class="card">
    <div class="card-thumb" />
    <div class="card-body">
      <RouterLink class="card-title" :to="`/instructors/${instructor.username}`">
        {{ instructor.name }}
      </RouterLink>
      <div class="card-meta">{{ instructor.title }}</div>
      <div class="card-meta" style="margin-top:6px">
        <RatingStars :rating="instructor.rating" />
        <span>•</span>
        <span>{{ instructor.students.toLocaleString('ar') }} متعلم</span>
        <span>•</span>
        <span>فئات: {{ instructor.categories.join('، ') }}</span>
      </div>
    </div>
  </article>
</template>

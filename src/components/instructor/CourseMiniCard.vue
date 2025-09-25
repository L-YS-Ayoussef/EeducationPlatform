<script setup>
import RatingStars from '@/components/common/RatingStars.vue'
const { course } = defineProps({
  course: { type: Object, required: true }
})
</script>

<template>
  <article class="card">
    <div class="card-thumb" />
    <div class="card-body">
      <RouterLink class="card-title" :to="`/courses/${course.slug}`">{{ course.title }}</RouterLink>
      <div class="card-meta">
        <span>{{ course.level }}</span>
        <span>•</span>
        <span>{{ course.durationHours }} ساعات</span>
        <span>•</span>
        <RatingStars :rating="course.rating" />
      </div>
    </div>
  </article>
</template>

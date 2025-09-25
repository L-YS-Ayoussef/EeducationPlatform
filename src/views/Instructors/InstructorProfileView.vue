<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import '../../assets/styles/catalog.css'

import { getInstructorByUsername, getCoursesForInstructor } from '@/data/instructors'
import CourseMiniCard from '@/components/instructor/CourseMiniCard.vue'
import RatingStars from '@/components/common/RatingStars.vue'

const route = useRoute()
const username = computed(() => route.params.username?.toString() || '')
const instructor = computed(() => getInstructorByUsername(username.value))
const courses = computed(() => getCoursesForInstructor(username.value))
</script>

<template>
  <div v-if="!instructor" class="catalog-container">
    <h2>لم يتم العثور على المدرّس</h2>
    <RouterLink to="/instructors" class="btn-primary" style="display:inline-flex;margin-top:10px">العودة إلى القائمة</RouterLink>
  </div>

  <div v-else>
    <!-- Header -->
    <section class="details-hero">
      <div class="catalog-container">
        <h1 class="list-title">{{ instructor.name }}</h1>
        <div class="details-meta">
          <span class="badge">{{ instructor.title }}</span>
          <span>اللغات: {{ instructor.languages.join('، ') }}</span>
          <span>•</span>
          <RatingStars :rating="instructor.rating" />
          <span>({{ instructor.reviewsCount }} مراجعة)</span>
          <span>•</span>
          <span>{{ instructor.students.toLocaleString('ar') }} متعلم</span>
        </div>
        <p style="color:var(--ink-700); margin-top:10px">{{ instructor.bio }}</p>
        <div style="margin-top:12px; display:flex; gap:10px">
          <a class="btn-primary" :href="instructor.socials.website" target="_blank">تواصل</a>
          <RouterLink to="/courses" class="btn">استعراض الدورات</RouterLink>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">مجالات الخبرة</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span v-for="c in instructor.categories" :key="c" class="badge">{{ c }}</span>
        </div>
      </div>
    </section>

    <!-- Offered courses -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">الدورات المقدَّمة</h2>
        <div class="grid">
          <CourseMiniCard v-for="c in courses" :key="c.id" :course="c" />
        </div>
      </div>
    </section>

    <!-- Availability -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">التوفّر</h2>
        <ul class="list">
          <li v-for="(s,i) in instructor.availability" :key="i">
            {{ s.day }} — {{ s.time }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

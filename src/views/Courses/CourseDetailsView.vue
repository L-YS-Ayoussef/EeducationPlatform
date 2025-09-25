<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import '../../assets/styles/catalog.css'
import { getCourseBySlug } from '@/data/courses'
import RatingStars from '@/components/common/RatingStars.vue'
import CourseSyllabus from '@/components/course/CourseSyllabus.vue'
import FaqAccordion from '@/components/course/FaqAccordion.vue'
import InstructorMiniCard from '@/components/course/InstructorMiniCard.vue'

const route = useRoute()
const course = computed(() => getCourseBySlug(route.params.slug?.toString() || ''))
</script>

<template>
  <div v-if="!course" class="catalog-container-no">
    <h2>لم يتم العثور على الدورة</h2>
    <RouterLink to="/courses" class="btn-primary" style="display:inline-flex;margin-top:10px">العودة إلى الدورات</RouterLink>
  </div>

  <div v-else>
    <!-- HERO -->
    <section class="details-hero">
      <div class="catalog-container">
        <h1 class="list-title">{{ course.title }}</h1>
        <div class="details-meta">
          <span class="badge">{{ course.category }}</span>
          <span class="badge">{{ course.level }}</span>
          <span class="badge">{{ course.language }}</span>
          <span>مدة: {{ course.durationHours }} ساعات</span>
          <span>•</span>
          <RatingStars :rating="course.rating" />
          <span>({{ course.reviewsCount }} مراجعة)</span>
        </div>
        <p style="color:var(--ink-700); margin-top:10px">{{ course.shortDesc }}</p>
        <div style="margin-top:12px; display:flex; gap:10px">
          <RouterLink to="/auth/register" class="btn-primary">الالتحاق الآن</RouterLink>
          <RouterLink to="/courses" class="btn">العودة إلى الدورات</RouterLink>
        </div>
      </div>
    </section>

    <!-- OVERVIEW -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">نظرة عامة</h2>
        <p style="color:var(--ink-700)">{{ course.shortDesc }}</p>
      </div>
    </section>

    <!-- SYLLABUS -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">المنهج</h2>
        <CourseSyllabus :sections="course.syllabus" />
      </div>
    </section>

    <!-- SCHEDULE -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">المواعيد</h2>
        <ul class="list">
          <li v-for="(s,i) in course.schedule" :key="i">
            {{ s.date }} — {{ s.time }} ({{ s.tz }})
          </li>
        </ul>
      </div>
    </section>

    <!-- INSTRUCTORS -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">المدرّسون</h2>
        <div class="grid">
          <InstructorMiniCard v-for="ins in course.instructors" :key="ins.id" :instructor="ins" />
        </div>
      </div>
    </section>

    <!-- REVIEWS (summary only for now) -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">المراجعات</h2>
        <p style="color:var(--ink-700)">
          التقييم العام:
          <RatingStars :rating="course.rating" /> ({{ course.reviewsCount }} مراجعة)
        </p>
        <p style="color:var(--ink-500)">* عرض المراجعات التفصيلية لاحقاً.</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="catalog-container">
        <h2 class="list-title" style="font-size:20px">الأسئلة الشائعة</h2>
        <FaqAccordion :items="course.faq" />
      </div>
    </section>
  </div>
</template>

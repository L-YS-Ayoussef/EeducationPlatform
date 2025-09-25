<script setup>
import '../../assets/styles/instructor.css'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCourseById, getStudentsForCourse, seedEnrollmentsIfEmpty } from '@/services/instructor.courses.service'

const route = useRoute()
const courseId = route.params.id
const course = ref(null)
const all = ref([])
const q = ref(''); const status = ref('all')

onMounted(() => {
  course.value = getCourseById(courseId)
  seedEnrollmentsIfEmpty(courseId)
  all.value = getStudentsForCourse(courseId)
})

const filtered = computed(() => {
  let list = all.value
  if(status.value !== 'all') list = list.filter(e => e.status === status.value)
  if(q.value.trim()){
    const t = q.value.trim()
    list = list.filter(e => e.name.includes(t) || e.email.includes(t))
  }
  return list
})
</script>

<template>
  <div class="instructor-wrap">
    <div class="container">
      <div class="page-title">طلاب الدورة — {{ course?.title || '...' }}</div>

      <div class="card" style="margin-bottom:12px">
        <div class="row">
          <div style="flex:1 1 260px">
            <div class="field"><label>بحث</label>
              <input class="input" v-model="q" placeholder="اسم أو بريد" />
            </div>
          </div>
          <div style="flex:0 0 220px">
            <div class="field"><label>الحالة</label>
              <select class="select" v-model="status">
                <option value="all">الكل</option>
                <option value="active">نشط</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>الطالب</th>
              <th>البريد</th>
              <th>الحالة</th>
              <th>% التقدّم</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in filtered" :key="s.studentId">
              <td>{{ s.name }}</td>
              <td>{{ s.email }}</td>
              <td>{{ s.status }}</td>
              <td>{{ s.progressPct }}%</td>
            </tr>
            <tr v-if="filtered.length===0">
              <td colspan="4" class="small">لا توجد نتائج مطابقة.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="small" style="margin-top:8px">* بيانات تجريبية من المتصفح فقط.</div>
    </div>
  </div>
</template>

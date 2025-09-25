<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '../../assets/styles/catalog.css'
import { COURSES, CATEGORIES, LEVELS, LANGUAGES } from '@/data/courses'
import CourseCard from '@/components/course/CourseCard.vue'
import CourseFilters from '@/components/course/CourseFilters.vue'
import Pagination from '@/components/common/PaginationComp.vue'

const route = useRoute()
const router = useRouter()

const sortOptions = [
  { value: 'top', label: 'الأعلى تقييماً' },
  { value: 'popular', label: 'الأكثر شيوعاً' }
]

const state = reactive({
  q: '', category: '', level: '', language: '',
  sort: '', page: 1, pageSize: 8
})

onMounted(() => {
  // init from query
  const q = route.query
  state.q = (q.q || '').toString()
  state.category = (q.category || '').toString()
  state.level = (q.level || '').toString()
  state.language = (q.language || '').toString()
  state.sort = (q.sort || '').toString()
  state.page = Number(q.page || 1)
})

function applyFilters(){
  router.replace({ query: {
    q: state.q || undefined,
    category: state.category || undefined,
    level: state.level || undefined,
    language: state.language || undefined,
    sort: state.sort || undefined,
    page: state.page !== 1 ? state.page : undefined
  }})
}
function resetFilters(){
  state.q = state.category = state.level = state.language = state.sort = ''
  state.page = 1
  applyFilters()
}

watch(() => route.query, (q) => {
  // keep state in sync if user navigates back/forward
  state.q = (q.q || '').toString()
  state.category = (q.category || '').toString()
  state.level = (q.level || '').toString()
  state.language = (q.language || '').toString()
  state.sort = (q.sort || '').toString()
  state.page = Number(q.page || 1)
})

const filtered = computed(() => {
  let list = [...COURSES]
  if (state.q) list = list.filter(c =>
    c.title.includes(state.q) || c.shortDesc?.includes(state.q)
  )
  if (state.category) list = list.filter(c => c.category === state.category)
  if (state.level) list = list.filter(c => c.level === state.level)
  if (state.language) list = list.filter(c => c.language === state.language)

  if (state.sort === 'top')    list.sort((a,b) => b.rating - a.rating)
  else if (state.sort === 'popular') list.sort((a,b) => b.students - a.students)
  else list.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return list
})

const pageItems = computed(() => {
  const start = (state.page - 1) * state.pageSize
  return filtered.value.slice(start, start + state.pageSize)
})
</script>

<template>
  <div class="catalog-container">
    <h1 class="list-title">الدورات</h1>

    <CourseFilters
      v-model="state"
      :categories="CATEGORIES"
      :levels="LEVELS"
      :languages="LANGUAGES"
      :sort-options="sortOptions"
      @apply="state.page=1; applyFilters()"
      @reset="resetFilters"
    />

    <div class="list-head">
      <div class="list-title" style="font-size:16px">
        النتائج: {{ filtered.length }}
      </div>
    </div>

    <div class="grid">
      <CourseCard v-for="c in pageItems" :key="c.id" :course="c" />
    </div>

    <Pagination
      :total="filtered.length"
      :page="state.page"
      :page-size="state.pageSize"
      @update:page="(p)=>{ state.page=p; applyFilters() }"
    />
  </div>
</template>

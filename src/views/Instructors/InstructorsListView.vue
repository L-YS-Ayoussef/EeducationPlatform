<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '../../assets/styles/catalog.css'

import { INSTRUCTORS } from '@/data/instructors'
import { CATEGORIES, LANGUAGES } from '@/data/courses'

import InstructorCard from '@/components/instructor/InstructorCard.vue'
import InstructorFilters from '@/components/instructor/InstructorFilters.vue'
import PaginationComp from '@/components/common/PaginationComp.vue'

const route = useRoute()
const router = useRouter()

const sortOptions = [
  { value: 'top', label: 'الأعلى تقييماً' },
  { value: 'popular', label: 'الأكثر طلاباً' },
  { value: 'courses', label: 'الأكثر دورات' }
]

const state = reactive({
  q: '', category: '', language: '', minRating: '', sort: '', page: 1, pageSize: 8
})

onMounted(() => {
  const q = route.query
  state.q = (q.q || '').toString()
  state.category = (q.category || '').toString()
  state.language = (q.language || '').toString()
  state.minRating = (q.minRating || '').toString()
  state.sort = (q.sort || '').toString()
  state.page = Number(q.page || 1)
})

function applyFilters(){
  router.replace({ query: {
    q: state.q || undefined,
    category: state.category || undefined,
    language: state.language || undefined,
    minRating: state.minRating || undefined,
    sort: state.sort || undefined,
    page: state.page !== 1 ? state.page : undefined
  }})
}
function resetFilters(){
  state.q = state.category = state.language = state.minRating = state.sort = ''
  state.page = 1
  applyFilters()
}

watch(() => route.query, (q) => {
  state.q = (q.q || '').toString()
  state.category = (q.category || '').toString()
  state.language = (q.language || '').toString()
  state.minRating = (q.minRating || '').toString()
  state.sort = (q.sort || '').toString()
  state.page = Number(q.page || 1)
})

const filtered = computed(() => {
  let list = [...INSTRUCTORS]
  if (state.q) list = list.filter(i =>
    i.name.includes(state.q) || i.title.includes(state.q) || i.bio.includes(state.q)
  )
  if (state.category) list = list.filter(i => i.categories.includes(state.category))
  if (state.language) list = list.filter(i => i.languages.includes(state.language))
  if (state.minRating) list = list.filter(i => i.rating >= Number(state.minRating))

  if (state.sort === 'top') list.sort((a,b) => b.rating - a.rating)
  else if (state.sort === 'popular') list.sort((a,b) => b.students - a.students)
  else if (state.sort === 'courses') list.sort((a,b) => b.courses.length - a.courses.length)

  return list
})

const pageItems = computed(() => {
  const start = (state.page - 1) * state.pageSize
  return filtered.value.slice(start, start + state.pageSize)
})
</script>

<template>
  <div class="catalog-container">
    <h1 class="list-title">المدرّسون</h1>

    <InstructorFilters
      v-model="state"
      :categories="CATEGORIES"
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
      <InstructorCard v-for="i in pageItems" :key="i.id" :instructor="i" />
    </div>

    <PaginationComp
      :total="filtered.length"
      :page="state.page"
      :page-size="state.pageSize"
      @update:page="(p)=>{ state.page=p; applyFilters() }"
    />
  </div>
</template>

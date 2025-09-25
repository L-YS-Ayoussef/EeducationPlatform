<script setup>
import '../../assets/styles/instructor.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CourseForm from '@/components/instructor/CourseForm.vue'
import { useAuthStore } from '@/stores/auth'
import { createCourse } from '@/services/instructor.courses.service'

const router = useRouter()
const auth = useAuthStore()
const saving = ref(false)
const model = ref({}) // CourseForm will manage it internally

async function handleSubmit(payload){
  try{
    saving.value = true
    const created = createCourse(auth.user.id || 'instructor-mock', payload)
    router.push(`/instructor/courses/${created.id}/edit`)
  }finally{ saving.value = false }
}
function handleCancel(){ router.back() }
</script>

<template>
  <CourseForm mode="create" v-model="model" :loading="saving"
              @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script setup>
import '../../assets/styles/instructor.css'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CourseForm from '@/components/instructor/CourseForm.vue'
import { getCourseById, updateCourse } from '@/services/instructor.courses.service'
import { seedEnrollmentsIfEmpty } from '@/services/instructor.courses.service'

const route = useRoute(); const router = useRouter()
const id = route.params.id
const course = ref(null)
const saving = ref(false)

onMounted(() => {
  course.value = getCourseById(id)
  if(!course.value){
    alert('لم يتم العثور على الدورة')
    router.replace('/instructor')
    return
  }
  // seed some mock students for the students page
  seedEnrollmentsIfEmpty(id)
})

async function handleSubmit(payload){
  saving.value = true
  try{
    updateCourse(id, payload)
    alert('تم حفظ التعديلات')
  }finally{ saving.value = false }
}
function handleCancel(){ router.back() }
</script>

<template>
  <CourseForm v-if="course" mode="edit" v-model="course" :loading="saving"
              @submit="handleSubmit" @cancel="handleCancel" />
</template>

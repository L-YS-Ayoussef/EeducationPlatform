<script setup>
import '../../assets/styles/auth.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputField from '@/components/common/InputField.vue'
import PasswordField from '@/components/common/PasswordField.vue'
import FormAlert from '@/components/common/FormAlert.vue'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  firstName:'', lastName:'', email:'', password:''
})
const error = ref(''); const loading = ref(false)

async function submit(){
  error.value = ''
  if(!form.value.email || !form.value.password){ error.value = 'الرجاء إدخال البيانات المطلوبة'; return }
  try{
    loading.value = true
    await auth.register(form.value)
    router.push('/account/settings/profile')
  }catch(e){ error.value = e.message || 'حدث خطأ' }
  finally{ loading.value = false }
}
</script>

<template>
  <div class="auth-wrap">
    <form class="auth-card" @submit.prevent="submit">
      <h1 class="auth-title">إنشاء حساب</h1>
      <p class="auth-sub">سجّل معلوماتك الأساسية للبدء.</p>

      <FormAlert v-if="error" type="error" :message="error" />

      <div class="form">
        <InputField v-model="form.firstName" label="الاسم الأول" placeholder="مثال: أحمد" required />
        <InputField v-model="form.lastName"  label="اسم العائلة" placeholder="مثال: علي" required />
        <InputField v-model="form.email" type="email" label="البريد الإلكتروني" placeholder="name@domain.com" required autocomplete="email" />
        <PasswordField v-model="form.password" label="كلمة المرور" placeholder="••••••" required autocomplete="new-password" />
        <div class="actions" style="justify-content:flex-end">
          <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'جارٍ الإنشاء…' : 'إنشاء الحساب' }}</button>
        </div>
        <div class="text">لديك حساب؟ <RouterLink to="/auth/login" class="link">تسجيل الدخول</RouterLink></div>
      </div>
    </form>
  </div>
</template>

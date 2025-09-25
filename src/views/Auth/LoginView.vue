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
const email = ref('user@example.com')
const password = ref('123456')
const error = ref('')
const loading = ref(false)

async function submit(){
  error.value = ''
  try{
    loading.value = true
    await auth.login(email.value, password.value)
    router.push('/account/settings/profile')
  }catch(e){ error.value = e.message || 'حدث خطأ' }
  finally{ loading.value = false }
}
</script>

<template>
  <div class="auth-wrap">
    <form class="auth-card" @submit.prevent="submit">
      <h1 class="auth-title">تسجيل الدخول</h1>
      <p class="auth-sub">أدخل بريدك وكلمة المرور للمتابعة.</p>

      <FormAlert v-if="error" type="error" :message="error" />

      <div class="form">
        <InputField v-model="email" type="email" label="البريد الإلكتروني" placeholder="name@domain.com" required autocomplete="email" />
        <PasswordField v-model="password" label="كلمة المرور" placeholder="••••••" required />
        <div class="actions">
          <RouterLink to="/auth/forgot" class="link">نسيت كلمة المرور؟</RouterLink>
          <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'جارٍ الدخول…' : 'دخول' }}</button>
        </div>
        <div class="text">ليس لديك حساب؟ <RouterLink to="/auth/register" class="link">أنشئ حسابًا</RouterLink></div>
      </div>
    </form>
  </div>
</template>

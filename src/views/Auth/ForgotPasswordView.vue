<script setup>
import '../../assets/styles/auth.css'
import { ref } from 'vue'
import InputField from '@/components/common/InputField.vue'
import FormAlert from '@/components/common/FormAlert.vue'
import { requestPasswordReset, verifyResetCode } from '@/services/auth.service'

const email = ref('')
const step = ref(1)
const code = ref('')
const info = ref('')
const error = ref('')
const loading = ref(false)

async function submitEmail(){
  error.value = ''; info.value = ''
  try{
    loading.value = true
    await requestPasswordReset(email.value)
    info.value = 'تم إرسال رمز التحقق إلى بريدك.'
    step.value = 2
  }catch(e){ error.value = e.message || 'حدث خطأ' }
  finally{ loading.value = false }
}

async function submitCode(){
  error.value = ''; info.value = ''
  try{
    loading.value = true
    await verifyResetCode(code.value)
    info.value = 'تم التحقق من الرمز. يمكنك الآن تعيين كلمة مرور جديدة (خارج نطاق هذه الصفحة مؤقتاً).'
  }catch(e){ error.value = e.message || 'حدث خطأ' }
  finally{ loading.value = false }
}
</script>

<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <h1 class="auth-title">استعادة كلمة المرور</h1>
      <p class="auth-sub">أدخل بريدك الإلكتروني لاستلام رمز التحقق.</p>

      <FormAlert v-if="error" type="error" :message="error" />
      <FormAlert v-if="info"  type="success" :message="info" />

      <!-- Step 1: email -->
      <form class="form" @submit.prevent="submitEmail">
        <InputField v-model="email" type="email" label="البريد الإلكتروني" placeholder="name@domain.com" required autocomplete="email" />
        <div class="actions" style="justify-content:flex-end">
          <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'جارٍ الإرسال…' : 'إرسال الرمز' }}</button>
        </div>
      </form>

      <!-- Step 2: code (shown below) -->
      <form v-if="step >= 2" class="form" style="margin-top:12px" @submit.prevent="submitCode">
        <InputField v-model="code" label="رمز التحقق" placeholder="أدخل الرمز المكوّن من 6 أرقام" required />
        <div class="actions" style="justify-content:flex-end">
          <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'جارٍ التحقق…' : 'تحقق' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

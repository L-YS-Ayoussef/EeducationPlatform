<script setup>
import '../../../assets/styles/account.css'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import InputField from '@/components/common/InputField.vue'
import FormAlert from '@/components/common/FormAlert.vue'

const auth = useAuthStore()
// dummy -> read from store if available; otherwise seed a view-model
const vm = ref({
  firstName: auth.user?.firstName || 'أحمد',
  lastName:  auth.user?.lastName  || 'علي',
  email:     auth.user?.email     || 'user@example.com',
  phone:     auth.user?.phone     || '0500000000',
  language:  auth.user?.language  || 'ar',
  timezone:  auth.user?.timezone  || 'UTC+03:00',
  avatarUrl: auth.user?.avatarUrl || ''
})

const info = ref(''); const error = ref(''); const saving = ref(false)

async function save(){
  error.value = ''; info.value = ''
  try{
    saving.value = true
    // update store (mock)
    auth.updateProfile({ ...vm.value })
    info.value = 'تم حفظ التعديلات'
  }catch(e){ error.value = e.message || 'حدث خطأ' }
  finally{ saving.value = false }
}

// keep vm synced if store changes elsewhere
watch(() => auth.user, (u) => {
  if(!u) return
  vm.value = { ...vm.value, ...u }
})
</script>

<template>
  <div class="account-container">
    <h1 class="account-title">إعدادات الحساب — الملف الشخصي</h1>

    <div class="grid">
      <div class="card">
        <FormAlert v-if="error" type="error" :message="error" />
        <FormAlert v-if="info"  type="success" :message="info" />

        <div class="form">
          <div class="row">
            <img class="avatar" :src="vm.avatarUrl || 'https://placehold.co/160x160?text=Avatar'" alt="avatar" />
            <InputField v-model="vm.avatarUrl" label="رابط الصورة الشخصية" placeholder="https://..." />
          </div>

          <div class="row" style="gap:12px">
            <div style="flex:1 1 200px"><InputField v-model="vm.firstName" label="الاسم الأول" required /></div>
            <div style="flex:1 1 200px"><InputField v-model="vm.lastName"  label="اسم العائلة" required /></div>
          </div>

          <InputField v-model="vm.email" type="email" label="البريد الإلكتروني" required />
          <InputField v-model="vm.phone" label="رقم الجوال" />

          <div class="row" style="gap:12px">
            <div style="flex:1 1 200px">
              <div class="field">
                <label>اللغة</label>
                <select class="select" v-model="vm.language">
                  <option value="ar">العربية</option>
                  <option value="en">الإنجليزية</option>
                </select>
              </div>
            </div>
            <div style="flex:1 1 200px">
              <div class="field">
                <label>المنطقة الزمنية</label>
                <select class="select" v-model="vm.timezone">
                  <option>UTC+03:00</option>
                  <option>UTC+02:00</option>
                  <option>UTC+04:00</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row" style="justify-content:flex-end">
            <button class="btn btn-primary" @click="save" :disabled="saving">{{ saving ? 'جارٍ الحفظ…' : 'حفظ' }}</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin:0 0 8px">ملاحظات</h3>
        <p class="muted">هذه صفحة تجريبية — البيانات تُحفظ محليًا في المتصفح عبر Pinia/localStorage فقط.</p>
        <p class="muted">عند ربط الـ API، استبدل `auth.updateProfile` بطلب PATCH/PUT للخادم.</p>
      </div>
    </div>
  </div>
</template>

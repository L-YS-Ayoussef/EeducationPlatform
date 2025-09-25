<script setup>
import '../../assets/styles/layout.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const mobileOpen = ref(false)

async function logout(){
  await auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="site-header">
    <div class="site-container">
      <div class="header-row">
        <!-- Brand -->
        <RouterLink to="/" class="brand" @click="mobileOpen=false">
          <div class="brand-logo">
            <!-- simple logo -->
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#2563eb" d="M4 12L12 4l8 8-8 8-8-8z"/></svg>
          </div>
        <span class="brand-name">منصّة التعلّم</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="nav" aria-label="التنقل الرئيسي">
          <RouterLink to="/">الرئيسية</RouterLink>
          <RouterLink to="/courses">الدورات</RouterLink>
          <RouterLink to="/instructors">المدرّسون</RouterLink>
          <RouterLink to="/about">حول</RouterLink>
        </nav>

        <!-- User area -->
        <div class="user-area">
          <template v-if="auth.isAuthenticated">
            <img :src="auth.user?.avatarUrl || 'https://placehold.co/72x72?text=U'" class="avatar" alt="avatar" />
            <span>{{ auth.fullName || 'حسابي' }}</span>

            <template v-if="auth.isInstructor">
              <RouterLink class="btn" to="/instructor/courses/new">إنشاء دورة</RouterLink>
            </template>
            <template v-else-if="auth.isStudent">
              <RouterLink class="btn" to="/account/settings/profile">حسابي</RouterLink>
            </template>

            <button class="btn" @click="logout">خروج</button>
          </template>

          <template v-else>
            <RouterLink class="btn" to="/auth/login">دخول</RouterLink>
            <RouterLink class="btn btn-primary" to="/auth/register">إنشاء حساب</RouterLink>
          </template>

          <!-- Mobile menu toggle -->
          <button class="btn menu-toggle" @click="mobileOpen = !mobileOpen" aria-label="قائمة">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile panel -->
      <div class="mobile-panel" v-if="mobileOpen">

        <RouterLink to="/" @click="mobileOpen=false">الرئيسية</RouterLink>
        <RouterLink to="/courses" @click="mobileOpen=false">الدورات</RouterLink>
        <RouterLink to="/instructors" @click="mobileOpen=false">المدرّسون</RouterLink>
        <RouterLink to="/about" @click="mobileOpen=false">حول</RouterLink>

        <template v-if="auth.isAuthenticated">
          <RouterLink v-if="auth.isInstructor" to="/instructor/courses/new" @click="mobileOpen=false">إنشاء دورة</RouterLink>
          <RouterLink v-else-if="auth.isStudent" to="/account/settings/profile" @click="mobileOpen=false">حسابي</RouterLink>
          <button class="btn" @click="logout">خروج</button>
        </template>
        <template v-else>
          <RouterLink to="/auth/login" @click="mobileOpen=false">دخول</RouterLink>
          <RouterLink to="/auth/register" @click="mobileOpen=false">إنشاء حساب</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

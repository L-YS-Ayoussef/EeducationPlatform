<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style scoped>
/* empty for now — your Home page has its own CSS in src/assets/styles/home.css */
</style>

import { useAuthStore } from '@/stores/auth'

export function requireAuth(to, from, next) {
  const auth = useAuthStore()
  if (auth.isAuthenticated) next()
  else next({ path: '/auth/login', query: { redirect: to.fullPath } })
}

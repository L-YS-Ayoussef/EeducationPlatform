import { useAuthStore } from '@/stores/auth'

export function requireRole(roles = []) {
  return (to, from, next) => {
    const auth = useAuthStore()
    if (!auth.isAuthenticated)
      return next({ path: '/auth/login', query: { redirect: to.fullPath } })
    if (roles.length === 0 || roles.some((r) => auth.user?.roles?.includes(r))) return next()
    return next('/404') // or a dedicated "403" page
  }
}

import { defineStore } from 'pinia'
import { login, register, logout, getCurrentUser } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: getCurrentUser(),
  }),
  getters: {
    isAuthenticated: (s) => !!s.token && !!s.user,
    fullName: (s) => (s.user ? `${s.user.firstName} ${s.user.lastName}` : ''),
    hasRole: (s) => (role) => !!s.user?.roles?.includes(role),
    isStudent: (s) => !!s.user?.roles?.includes('Student'),
    isInstructor: (s) => !!s.user?.roles?.includes('Instructor'),
  },

  actions: {
    async login(email, password) {
      const { token, user } = await login(email, password)
      this.token = token
      this.user = user
    },
    async register(payload) {
      const { token, user } = await register(payload)
      this.token = token
      this.user = user
    },
    async logout() {
      await logout()
      this.token = null
      this.user = null
    },
    updateProfile(partial) {
      if (!this.user) return
      this.user = { ...this.user, ...partial }
      localStorage.setItem('user', JSON.stringify(this.user))
    },
  },
})

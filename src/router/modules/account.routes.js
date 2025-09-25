import { requireAuth } from '@/router/guards/authGuard'

export default [
  {
    path: '/account/settings/profile',
    name: 'account-settings-profile',
    component: () => import('@/views/Account/Settings/ProfileSettingsView.vue'),
    beforeEnter: requireAuth,
  },
]

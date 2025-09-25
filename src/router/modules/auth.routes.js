export default [
  { path: '/auth/login', name: 'login', component: () => import('@/views/Auth/LoginView.vue') },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/Auth/RegisterView.vue'),
  },
  {
    path: '/auth/forgot',
    name: 'forgot',
    component: () => import('@/views/Auth/ForgotPasswordView.vue'),
  },
]

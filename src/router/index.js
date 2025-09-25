import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/Home/HomeView.vue')

import publicRoutes from './modules/public.routes'
import authRoutes from './modules/auth.routes'
import accountRoutes from './modules/account.routes'
import instructorRoutes from './modules/instructor.routes'

const routes = [
  { path: '/', name: 'home', component: Home },
  ...publicRoutes,
  ...authRoutes,
  ...accountRoutes,
  ...instructorRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-404',
    component: () => import('@/views/System/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router

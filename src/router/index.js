import { createRouter, createWebHistory } from 'vue-router'

// Home (already exists)
const Home = () => import('@/views/Home/HomeView.vue')

// Public catalog module
import publicRoutes from './modules/public.routes'

const routes = [
  { path: '/', name: 'home', component: Home },
  ...publicRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found-catch',
    component: () => import('@/views/System/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

import { requireRole } from '@/router/guards/roleGuard'

export default [
  {
    path: '/instructor/courses/new',
    name: 'inst-course-new',
    component: () => import('@/views/Instructor/CourseNewView.vue'),
    beforeEnter: requireRole(['Instructor']),
  },
  {
    path: '/instructor/courses/:id/edit',
    name: 'inst-course-edit',
    component: () => import('@/views/Instructor/CourseEditView.vue'),
    beforeEnter: requireRole(['Instructor']),
  },
  {
    path: '/instructor/courses/:id/students',
    name: 'inst-course-students',
    component: () => import('@/views/Instructor/CourseStudentsView.vue'),
    beforeEnter: requireRole(['Instructor']),
  },
]

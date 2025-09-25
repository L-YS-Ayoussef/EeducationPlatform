export default [
  // existing catalog routes...
  {
    path: '/courses',
    name: 'courses-list',
    component: () => import('@/views/Courses/CoursesListView.vue'),
  },
  {
    path: '/courses/:slug',
    name: 'course-details',
    component: () => import('@/views/Courses/CourseDetailsView.vue'),
  },
  {
    path: '/instructors',
    name: 'instructors-list',
    component: () => import('@/views/Instructors/InstructorsListView.vue'),
  },
  {
    path: '/instructors/:username',
    name: 'instructor-profile',
    component: () => import('@/views/Instructors/InstructorProfileView.vue'),
  },

  // Unified Info page (ALL static sections)
  { path: '/about', name: 'info', component: () => import('@/views/Static/InfoPageView.vue') },

  // Optional redirects from old paths to anchors on /about
  { path: '/pricing', redirect: { path: '/about', hash: '#pricing' } },
  { path: '/faq', redirect: { path: '/about', hash: '#faq' } },
  { path: '/contact', redirect: { path: '/about', hash: '#contact' } },
  { path: '/privacy', redirect: { path: '/about', hash: '#privacy' } },
  { path: '/terms', redirect: { path: '/about', hash: '#terms' } },

  // 404 page route (if you still want a dedicated one)
  { path: '/404', name: 'not-found', component: () => import('@/views/System/NotFoundView.vue') },
]

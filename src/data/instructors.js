import { COURSES } from '@/data/courses'

// Arabic dummy data for instructors
export const INSTRUCTORS = [
  {
    id: 'i1',
    username: 'ahmad-ali',
    name: 'أحمد علي',
    title: 'مهندس برمجيات',
    bio: 'مطوّر مختص ببناء الواجهات وتطبيقات الويب الحديثة باستخدام JavaScript وVue.',
    categories: ['البرمجة'],
    languages: ['العربية'],
    rating: 4.8,
    reviewsCount: 1200,
    students: 18000,
    courses: ['programming-basics', 'vue3-vite-crash-course'],
    availability: [
      { day: 'الإثنين', time: '19:00 - 21:00' },
      { day: 'الأربعاء', time: '19:00 - 21:00' },
    ],
    socials: { website: '#', twitter: '#', linkedin: '#' },
  },
  {
    id: 'i2',
    username: 'sarah-mohamed',
    name: 'سارة محمد',
    title: 'عالمة بيانات',
    bio: 'تعمل على تحليل البيانات وبناء النماذج الإحصائية لتوليد رؤى عملية.',
    categories: ['البيانات'],
    languages: ['العربية'],
    rating: 4.7,
    reviewsCount: 900,
    students: 13000,
    courses: ['intro-data-science'],
    availability: [{ day: 'الثلاثاء', time: '18:00 - 20:00' }],
    socials: { website: '#', twitter: '#', linkedin: '#' },
  },
  {
    id: 'i3',
    username: 'mahmoud-fathy',
    name: 'محمود فتحي',
    title: 'مطوّر واجهات',
    bio: 'يركّز على بناء واجهات سريعة وأنيقة باستخدام Vue وVite وأفضل الممارسات.',
    categories: ['البرمجة', 'التصميم'],
    languages: ['العربية', 'الإنجليزية'],
    rating: 4.9,
    reviewsCount: 700,
    students: 9500,
    courses: ['vue3-vite-crash-course'],
    availability: [{ day: 'الخميس', time: '20:00 - 22:00' }],
    socials: { website: '#', twitter: '#', linkedin: '#' },
  },
  {
    id: 'i4',
    username: 'layla-samir',
    name: 'ليلى سمير',
    title: 'مصممة منتجات',
    bio: 'تصمّم واجهات وتجارب استخدام عملية توازن بين الجمال والأداء.',
    categories: ['التصميم'],
    languages: ['الإنجليزية', 'العربية'],
    rating: 4.6,
    reviewsCount: 600,
    students: 8000,
    courses: ['ui-ux-for-devs'],
    availability: [{ day: 'الأحد', time: '17:30 - 19:00' }],
    socials: { website: '#', twitter: '#', linkedin: '#' },
  },
]

export function getInstructorByUsername(username) {
  return INSTRUCTORS.find((i) => i.username === username)
}

export function getCoursesForInstructor(username) {
  const inst = getInstructorByUsername(username)
  if (!inst) return []
  return COURSES.filter((c) => inst.courses.includes(c.slug))
}

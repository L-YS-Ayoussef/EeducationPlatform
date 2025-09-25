// Simple localStorage-backed service just for front-end dev.

const KEY = 'mock-courses'
const ENROLL_KEY = 'mock-enrollments' // [{ courseId, studentId, name, email, status, progressPct }]

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}
function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function listCoursesByInstructor(instructorId) {
  return readAll().filter((c) => c.instructorId === instructorId)
}
export function getCourseById(id) {
  return readAll().find((c) => c.id === id) || null
}
export function createCourse(instructorId, payload) {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const course = {
    id,
    instructorId,
    ratingAvg: 0,
    reviewsCount: 0,
    createdAt: now,
    updatedAt: now,
    ...payload,
  }
  const list = readAll()
  list.push(course)
  writeAll(list)
  return course
}
export function updateCourse(id, payload) {
  const list = readAll()
  const idx = list.findIndex((c) => c.id === id)
  if (idx === -1) throw new Error('دورة غير موجودة')
  list[idx] = { ...list[idx], ...payload, updatedAt: new Date().toISOString() }
  writeAll(list)
  return list[idx]
}

/* Students (enrollments) — mock */
function readEnroll() {
  try {
    return JSON.parse(localStorage.getItem(ENROLL_KEY) || '[]')
  } catch {
    return []
  }
}
function writeEnroll(list) {
  localStorage.setItem(ENROLL_KEY, JSON.stringify(list))
}

export function getStudentsForCourse(courseId) {
  return readEnroll().filter((e) => e.courseId === courseId)
}
export function seedEnrollmentsIfEmpty(courseId) {
  const list = readEnroll()
  if (list.some((e) => e.courseId === courseId)) return
  const demo = [
    {
      courseId,
      studentId: 's1',
      name: 'أحمد حسين',
      email: 'ahmad@example.com',
      status: 'active',
      progressPct: 35,
    },
    {
      courseId,
      studentId: 's2',
      name: 'سارة إبراهيم',
      email: 'sara@example.com',
      status: 'completed',
      progressPct: 100,
    },
    {
      courseId,
      studentId: 's3',
      name: 'مروان علي',
      email: 'marwan@example.com',
      status: 'active',
      progressPct: 10,
    },
  ]
  writeEnroll([...list, ...demo])
}

// Very simple mocks for now
const USERS = [
  {
    id: 'u1',
    email: 'user@example.com',
    password: '123456',
    firstName: 'مستخدم',
    lastName: 'تجريبي',
    phone: '0500000000',
    avatarUrl: '',
    language: 'ar',
    timezone: 'UTC+03:00',
    roles: ['Student'], // <-- here
  },
  {
    id: 'u2',
    email: 'instructor@example.com',
    password: '123456',
    firstName: 'مدرّس',
    lastName: 'تجريبي',
    roles: ['Instructor'], // <-- example instructor account
  },
]

export async function login(email, password) {
  const u = USERS.find((x) => x.email === email && x.password === password)
  if (!u) throw new Error('بيانات الدخول غير صحيحة')
  const token = 'mock-token'
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(u))
  return { token, user: u }
}

export async function register(payload) {
  if (USERS.some((u) => u.email === payload.email)) throw new Error('البريد مستخدم مسبقًا')
  const u = { id: crypto.randomUUID(), roles: ['Student'], ...payload }
  USERS.push(u)
  localStorage.setItem('token', 'mock-token')
  localStorage.setItem('user', JSON.stringify(u))
  return { token: 'mock-token', user: u }
}

export async function requestPasswordReset(email) {
  const u = USERS.find((x) => x.email === email)
  if (!u) throw new Error('لا يوجد حساب بهذا البريد')
  // Pretend we sent code "123456"
  return { code: '123456' }
}

export async function verifyResetCode(code) {
  if (code !== '123456') throw new Error('رمز التحقق غير صحيح')
  return { ok: true }
}

export async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}
